# App Intents — iOS 26 Essentials

> For deep reference: load `reference/app-intents-reference.md`

---

## Correct API Signatures (vs Common Mistakes)

| # | Topic | WRONG | RIGHT | Why |
|---|-------|-------|-------|-----|
| 1 | `suggestedInvocationPhrase` | `static var suggestedInvocationPhrase: String? = "Do the thing"` | Use `AppShortcutsProvider` with `AppShortcut` phrases | Legacy SiriKit property; causes `ssu-cli-app` crash at build time |
| 2 | Shortcut intent location | Intent defined in SPM package or framework | Intent in **main app target** | SSU training tool can only scan the main target binary |
| 3 | `applicationName` in phrases | `phrases: ["Start a timer"]` | `phrases: ["Start a timer in \(.applicationName)"]` | Every phrase **must** include the app name token |
| 4 | Widget/Live Activity buttons | `Button("Pause") { timer.pause() }` | `Button(intent: PauseTimerIntent()) { Image(systemName: "pause.fill") }` | Regular closures do nothing in widget/Live Activity views |
| 5 | `openAppWhenRun` (deprecated) | `static let openAppWhenRun: Bool = true` | `static let supportedModes: IntentModes = .foreground(.immediate)` | `openAppWhenRun` deprecated in iOS 26; use `supportedModes` |
| 6 | Non-Sendable properties | `var manager: LegacyManager` on AppIntent struct | Use `@Dependency var manager: SendableManager` or `@MainActor` helpers | AppIntent conforms to `Sendable`; all properties must be Sendable |
| 7 | Missing default init | Only providing `init(value:)` | Provide both `init() {}` and `init(value:)` | System instantiates intents with parameterless `init()` first |
| 8 | Static var isolation | `static var openAppWhenRun: Bool = true` | `nonisolated(unsafe) static var openAppWhenRun: Bool = true` | Static `var` on Sendable struct is global mutable state under Swift 6 |
| 9 | `AppShortcutsProvider` in extension | Provider in widget extension target | Provider in **main app target** only | One provider per app, must be in main target |
| 10 | Entity query SwiftData access | `func entities(for:) { context.fetch(...) }` | `@MainActor private func fetch(...) -> [Entity]` called with `await` | `ModelContext.mainContext` is main-actor-isolated |

---

## Crash Prevention Patterns

### Crash 1: ssu-cli-app — suggestedInvocationPhrase on AppIntent

```swift
// WRONG — causes "Command AppIntentsSSUTraining failed with a nonzero exit code"
struct StartTimerIntent: AppIntent {
    static var suggestedInvocationPhrase: String? = "Start timer"
    // ...
}

// RIGHT — use AppShortcutsProvider
struct MyAppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: StartTimerIntent(),
            phrases: ["Start timer in \(.applicationName)"],
            shortTitle: "Start Timer",
            systemImageName: "play.fill"
        )
    }
}
```

### Crash 2: ssu-cli-app — Intent in Framework, Not Main Target

```swift
// WRONG — SSU training can't find intents in frameworks
// MyKit/Sources/StartTimerIntent.swift
public struct StartTimerIntent: AppIntent { ... }

// RIGHT — keep in main app target
// MyApp/Intents/StartTimerIntent.swift
struct StartTimerIntent: AppIntent { ... }
```

### Crash 3: Regular Closure in Live Activity Button

```swift
// WRONG — tap does nothing, falls through to app open
Button("Pause") {
    timer.pause()
}

// RIGHT — uses intent system for cross-process communication
Button(intent: PauseTimerIntent()) {
    Image(systemName: "pause.fill")
}
.buttonStyle(.plain)
```

### Crash 4: Non-Sendable Property on AppIntent

```swift
// WRONG — NSObject subclass is not Sendable
struct MyIntent: AppIntent {
    var manager: LegacyManager  // Not Sendable!
}

// RIGHT — use @Dependency or @MainActor helpers
struct MyIntent: AppIntent {
    @Dependency var manager: SendableManager
    
    func perform() async throws -> some IntentResult {
        await MainActor.run {
            LegacyManager.shared.doThing()
        }
        return .result()
    }
}
```

### Crash 5: Entity Query Accessing SwiftData Off Main Actor

```swift
// WRONG — mainContext is main-actor-isolated
struct ItemEntityQuery: EntityQuery {
    func entities(for identifiers: [UUID]) async throws -> [ItemEntity] {
        let container = try ModelContainerBuilder.make()
        let context = container.mainContext  // Not on main actor!
        // ...
    }
}

// RIGHT — bridge to @MainActor helper
struct ItemEntityQuery: EntityQuery {
    func entities(for identifiers: [UUID]) async throws -> [ItemEntity] {
        await fetchItems(withIDs: identifiers)
    }
    
    @MainActor
    private func fetchItems(withIDs ids: [UUID]) -> [ItemEntity] {
        let container = try ModelContainerBuilder.make()
        let context = container.mainContext
        // ... fetch and map
    }
}
```

### Crash 6: Missing Parameterless init()

```swift
// WRONG — system can't instantiate
struct MyIntent: AppIntent {
    @Parameter(title: "Value")
    var value: String
    
    init(value: String) {
        self.value = value
    }
}

// RIGHT — always provide both
struct MyIntent: AppIntent {
    @Parameter(title: "Value")
    var value: String
    
    init() {}
    
    init(value: String) {
        self.value = value
    }
}
```

---

## Known Gotchas

- **ssu-cli-app crash has 5 causes:** (1) `suggestedInvocationPhrase` on non-shortcut intents, (2) intent referenced in `AppShortcutsProvider` not in main target, (3) intent in framework/SPM instead of main target, (4) flexible matching localization issues, (5) `AppShortcut.init` availability vs deployment target mismatch. Cause #1 is the most common.
- **`openAppWhenRun` still works** but is deprecated in iOS 26. Migrate to `supportedModes` which offers finer control: `.background`, `.foreground(.immediate)`, `.foreground(.dynamic)`, `.foreground(.deferred)`.
- **One `AppShortcutsProvider` per app.** Maximum 10 App Shortcuts. Provider + all referenced intents must be in the main app target.
- **Every phrase must include `\(.applicationName)`.** At most one `@Parameter` reference per phrase.
- **`LiveActivityIntent` vs `AppIntent` for Live Activity buttons:** For buttons inside an already-running Live Activity, regular `AppIntent` conformance is sufficient. `LiveActivityIntent` is specifically for starting Live Activities from outside the app (e.g., Control Center).
- **Both app and widget extension targets need the intent definition** for Live Activity buttons. Only the main app's `perform()` executes.
- **Shared state for widgets uses App Group UserDefaults** — `UserDefaults(suiteName:)` for communication between app and widget extension.
- **Titles and descriptions must be compile-time constants** — the framework extracts them at build time, not runtime. No computed properties or function calls.
- **Entity IDs must be persistent and retrievable** — the system saves them in user shortcuts. Use `UUID`, `String`, or `Int`.
- **`nonisolated(unsafe) static var`** is needed on `AppIntent` static `var` properties under Swift 6 strict concurrency.
- **Clean build folder** if SSU issues persist after fixes — stale metadata can cause ghost failures.
- **`AppIntentsPackage`** (iOS 26+) allows intents in Swift Packages, but `AppShortcutsProvider` itself must still be in the main target.

---

## Quick Checklist

Before committing App Intents code:

- [ ] **No `suggestedInvocationPhrase`** on any `AppIntent` struct (causes ssu-cli-app crash)
- [ ] **All `AppShortcutsProvider`-referenced intents** are in the main app target (not frameworks/packages)
- [ ] **Every phrase includes `\(.applicationName)`** and has at most one parameter reference
- [ ] **Widget/Live Activity buttons** use `Button(intent:)` not regular closures
- [ ] **Intent struct provides `init()`** (parameterless) even if a convenience init exists
- [ ] **All AppIntent properties are Sendable** — use `@Dependency` for services
- [ ] **Entity queries** bridge SwiftData access through `@MainActor` helper methods
- [ ] **`supportedModes`** used instead of deprecated `openAppWhenRun` for iOS 26+ targets

---

### References

- [App Intents Framework](https://developer.apple.com/documentation/appintents)
- [AppIntent Protocol](https://developer.apple.com/documentation/appintents/appintent)
- [AppEntity Protocol](https://developer.apple.com/documentation/appintents/appentity)
- [LiveActivityIntent Protocol](https://developer.apple.com/documentation/appintents/liveactivityintent)
- [AppShortcutsProvider Protocol](https://developer.apple.com/documentation/appintents/appshortcutsprovider)
- [EntityQuery Protocol](https://developer.apple.com/documentation/appintents/entityquery)
- [IntentDescription Struct](https://developer.apple.com/documentation/appintents/intentdescription)
- [IntentParameter (@Parameter)](https://developer.apple.com/documentation/appintents/intentparameter)
- [Get to know App Intents — WWDC25](https://developer.apple.com/videos/play/wwdc2025/244/)
- [Explore new advances in App Intents — WWDC25](https://developer.apple.com/videos/play/wwdc2025/275/)
- [What's new in App Intents — WWDC24](https://developer.apple.com/videos/play/wwdc2024/10134/)

---

*Applies to: iOS 16.0+ (framework), iOS 26.0+ (supportedModes, @ComputedProperty, SnippetIntent), Xcode 17+*
