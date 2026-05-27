# App Intents Framework — iOS 26 API Reference

> **Last verified:** 2026-04-07
> **Minimum deployment:** iOS 16.0+ (framework), iOS 26.0+ (latest APIs like `supportedModes`, `@ComputedProperty`, `@DeferredProperty`, `SnippetIntent`)
> **Framework:** `import AppIntents`

---

## Table of Contents

1. [Overview](#overview)
2. [AppIntent Protocol](#appintent-protocol)
3. [Parameters (@Parameter)](#parameters-parameter)
4. [IntentDescription](#intentdescription)
5. [AppEntity Protocol](#appentity-protocol)
6. [Entity Queries](#entity-queries)
7. [AppShortcutsProvider](#appshortcutsprovider)
8. [AppShortcut](#appshortcut)
9. [LiveActivityIntent](#liveactivityintent)
10. [The ssu-cli-app Crash](#the-ssu-cli-app-crash)
11. [Thread Safety and Actor Isolation](#thread-safety-and-actor-isolation)
12. [Error Handling](#error-handling)
13. [Return Types and IntentResult](#return-types-and-intentresult)
14. [supportedModes (Replaces openAppWhenRun)](#supportedmodes-replaces-openappwhenrun)
15. [iOS 26 New APIs](#ios-26-new-apis)
16. [Testing App Intents](#testing-app-intents)
17. [Best Practices](#best-practices)
18. [Common Mistakes](#common-mistakes)
19. [Example Patterns](#example-patterns)

---

## Overview

The App Intents framework makes your app's actions and content discoverable across system experiences:

- **Siri** (voice commands, Apple Intelligence personal context)
- **Spotlight** (search, semantic indexing)
- **Shortcuts app** (actions, automations)
- **Widgets** (interactive buttons/toggles via WidgetKit)
- **Live Activities** (Dynamic Island buttons)
- **Control Center** (controls)
- **Action Button** (iPhone/Apple Watch hardware)
- **Apple Pencil Pro** (squeeze gesture)
- **Focus filters** (adjust behavior per Focus mode)

**Key architectural detail:** Swift source code is read at **build time** (not runtime). The system generates an App Intents representation stored in the app binary, allowing the system to understand capabilities without launching the app. This is why titles and descriptions must be compile-time constants.

### Platform Support

| Platform  | Minimum Version |
|-----------|----------------|
| iOS       | 16.0+          |
| iPadOS    | 16.0+          |
| macOS     | 13.0+          |
| tvOS      | 16.0+          |
| watchOS   | 9.0+           |
| visionOS  | 1.0+           |

---

## AppIntent Protocol

### Declaration

```swift
protocol AppIntent: PersistentlyIdentifiable, _SupportsAppDependencies, Sendable
```

**Key:** AppIntent conforms to `Sendable`. This means the struct itself and all its properties must be `Sendable`.

### Required Members

```swift
struct MyIntent: AppIntent {
    // REQUIRED: Compile-time constant, localized
    static let title: LocalizedStringResource = "Do Something"
    
    // REQUIRED: The action to perform
    func perform() async throws -> some IntentResult {
        return .result()
    }
}
```

| Member | Type | Required | Notes |
|--------|------|----------|-------|
| `title` | `LocalizedStringResource` | Yes | Must be a constant (`let`). Verb + noun, title case. |
| `perform()` | `async throws -> some IntentResult` | Yes | Called after parameter resolution. |
| `PerformResult` | Associated type | Yes (inferred) | Inferred from `perform()` return type. |

### Optional Members

| Member | Type | Default | Notes |
|--------|------|---------|-------|
| `description` | `IntentDescription?` | `nil` | Human-readable description for Shortcuts. |
| `isDiscoverable` | `Bool` | `true` | Whether Shortcuts/Spotlight can discover this intent. |
| `openAppWhenRun` | `Bool` | `false` | **Deprecated in iOS 26.** Use `supportedModes` instead. |
| `supportedModes` | `IntentModes` | — | **iOS 26+.** Replaces `openAppWhenRun`. |
| `authenticationPolicy` | `IntentAuthenticationPolicy` | — | Whether device unlock/auth is required. |
| `parameterSummary` | `some ParameterSummary` | — | Natural-language summary for Shortcuts editor. |
| `systemContext` | `IntentSystemContext` | — | Context info while system performs the action. |

### Lifecycle

1. **Instantiation** — System creates a parameter-less instance (`init()` required)
2. **Parameter Setting** — System populates `@Parameter` properties from user input
3. **Parameter Resolution** — Parameters resolved in declaration order
4. **Execution** — System calls `perform()` with resolved parameters
5. **Result Return** — Intent returns `IntentResult`
6. **Cleanup** — System releases the intent after invocation

### Example

```swift
struct StartTimerIntent: AppIntent {
    static let title: LocalizedStringResource = "Start Timer"
    static let description = IntentDescription(
        "Starts a new timer so you can begin deep work immediately."
    )
    static let openAppWhenRun: Bool = true

    @Parameter(title: "Duration (minutes)", default: 15)
    var minutes: Int

    @Parameter(title: "Label")
    var label: String?

    func perform() async throws -> some IntentResult & ProvidesDialog {
        SharedStateStore.captureCount = 0
        SharedStateStore.syncRunning(
            startDate: Date(),
            totalDuration: Double(minutes) * 60,
            label: label
        )
        return .result(dialog: "Started a \(minutes)-minute session")
    }
}
```

---

## Parameters (@Parameter)

### Declaration

```swift
@propertyWrapper
final class IntentParameter<Value> where Value: _IntentValue, Value: Sendable
```

### Basic Usage

```swift
@Parameter(title: "Duration (minutes)", default: 15)
var minutes: Int

@Parameter(title: "Label")
var label: String?  // Optional = not required

@Parameter(title: "Note", description: "What you want to capture")
var text: String    // Non-optional = required

@Parameter(title: "Soup", requestValueDialog: "Which soup would you like?")
var soup: SoupType
```

### Supported Types

| Category | Types |
|----------|-------|
| Primitives | `Int`, `Double`, `Bool`, `String`, `URL` |
| Date/Time | `Date`, `DateComponents` |
| Files | `IntentFile` |
| Measurements | `Measurement<UnitLength>`, `Measurement<UnitTemperature>`, etc. |
| Custom | Any `AppEntity`, any `AppEnum` |
| Collections | Arrays of supported types |

### Key Init Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `title` | `LocalizedStringResource` | Display name in Shortcuts editor |
| `description` | `LocalizedStringResource?` | Longer description |
| `default` | `Value?` | Default value if not provided |
| `requestValueDialog` | `IntentDialog?` | Prompt when asking user for value |
| `optionsProvider` | Closure | Dynamic list of selectable options |
| `inputConnectionBehavior` | `InputConnectionBehavior` | How parameter connects to other inputs |

### Requesting Values at Runtime

```swift
func perform() async throws -> some IntentResult {
    // Request a value if not provided
    if shots == nil {
        shots = try await $shots.requestValue(
            .init(stringLiteral: "How many espresso shots?")
        )
    }
    // ...
}
```

### Disambiguation

```swift
// When multiple entities match
let choice = try await $entity.requestDisambiguation(
    among: matchingEntities,
    dialog: "Which one did you mean?"
)
```

### Parameter Summary

Defines how the intent appears in the Shortcuts editor:

```swift
static var parameterSummary: some ParameterSummary {
    Summary("Order \(\.$soup)") {
        \.$quantity  // Additional parameters shown in detail
    }
}
```

**Rule:** The parameter summary must contain all required parameters that don't have a default value.

---

## IntentDescription

### Declaration

```swift
struct IntentDescription: Sendable, ExpressibleByStringLiteral
```

### Initializers

```swift
// Simple string literal
static let description = IntentDescription("Does something useful.")

// With category and search keywords
static let description = IntentDescription(
    "Starts a focus session for deep work.",
    categoryName: "Timer",
    searchKeywords: ["focus", "timer", "deep work"]
)

// With result value name
static let description = IntentDescription(
    "Gets the current session duration.",
    categoryName: "Information",
    searchKeywords: ["duration", "time"],
    resultValueName: "Duration"
)
```

### Properties

| Property | Type | Purpose |
|----------|------|---------|
| `descriptionText` | `LocalizedStringResource` | Short description, sentence case, ends with period |
| `categoryName` | `LocalizedStringResource?` | Groups intents in Shortcuts editor |
| `searchKeywords` | `[LocalizedStringResource]` | Aids discovery in Shortcuts search |
| `resultValueName` | `LocalizedStringResource?` | Name for the output variable in Shortcuts |

### ⚠️ Critical Restriction: Prohibited Words

**IntentDescription text cannot contain trademarked terms including:**
- "Apple" (e.g., "Apple Watch", "Apple Intelligence")
- "iPhone", "iPad", "iOS"
- "Siri", "SiriKit"
- "App Store"

**Error if violated:**
```
90626: Invalid Siri Support. App Intent description "..." cannot contain "apple"
```

**Fix:** Use generic alternatives:
```swift
// WRONG — will be rejected
static let description = IntentDescription("Start a timer on Apple Watch.")

// RIGHT — accepted
static let description = IntentDescription("Start a timer on your Watch.")
```

---

## AppEntity Protocol

### Declaration

```swift
protocol AppEntity: AppValue, DisplayRepresentable, Identifiable
where Self == Self.ValueType,
      Self.ID: EntityIdentifierConvertible,
      Self.ID: Sendable
```

### Required Members

```swift
struct ItemEntity: AppEntity {
    // REQUIRED: Type description for Shortcuts UI
    static let typeDisplayRepresentation: TypeDisplayRepresentation = "Item"
    
    // REQUIRED: Default query for entity resolution
    static var defaultQuery: ItemEntityQuery { ItemEntityQuery() }
    
    // REQUIRED (from Identifiable): Persistent, stable ID
    let id: UUID
    
    // REQUIRED (from DisplayRepresentable): Visual representation
    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(
            title: LocalizedStringResource(stringLiteral: title),
            subtitle: LocalizedStringResource(stringLiteral: "\(Int(totalDuration / 60)) min"),
            image: .init(systemName: "text.bubble.fill")
        )
    }
    
    // Custom properties
    let title: String
    let totalDuration: TimeInterval
}
```

### ID Requirements

- Must conform to `EntityIdentifierConvertible` and `Sendable`
- Must be **persistent** — the system saves entity IDs in shortcuts
- Must be **retrievable** — you must be able to look up entities by ID later
- Common types: `UUID`, `String`, `Int`

### Property Exposure (iOS 26+)

```swift
// Stored property (copies value)
@Property var name: String

// Computed property (defers to underlying model, no storage)
@ComputedProperty
var name: String { landmark.name }

// Deferred property (async, only fetched on demand)
@DeferredProperty
var crowdStatus: Int {
    get async throws {
        await modelData.getCrowdStatus(self)
    }
}
```

### Spotlight Integration (iOS 26+)

```swift
struct LandmarkEntity: IndexedEntity {
    @Property(indexingKey: \.displayName)
    var name: String

    @Property(indexingKey: \.contentDescription)
    var description: String
}
```

### Specialized Entity Protocols

| Protocol | Purpose |
|----------|---------|
| `IndexedEntity` | Spotlight-searchable entities |
| `TransientAppEntity` | Transient model objects not persisted |
| `UniqueAppEntity` | Single-value entities (e.g., global settings) |
| `FileEntity` | References documents/files |
| `URLRepresentableEntity` | Entities with universal link representation |

---

## Entity Queries

### EntityQuery (Base Protocol)

```swift
protocol EntityQuery: DynamicOptionsProvider, PersistentlyIdentifiable, Sendable
```

#### Required Methods

```swift
struct ItemEntityQuery: EntityQuery {
    // REQUIRED: Parameterless init
    init() {}
    
    // REQUIRED: Resolve entities by their IDs
    func entities(for identifiers: [ItemEntity.ID]) async throws -> [ItemEntity] {
        // Look up entities — check memory first, then disk/network
        // Omit any IDs where the entity no longer exists
    }
    
    // OPTIONAL: Default/suggested entities for picker UI
    func suggestedEntities() async throws -> [ItemEntity] {
        // Return frequently used or recent entities
    }
}
```

### Specialized Query Types

| Protocol | Method | Use Case |
|----------|--------|----------|
| `EntityStringQuery` | `entities(matching: String)` | Free-text search |
| `EnumerableEntityQuery` | `allEntities()` | Small, finite collections |
| `EntityPropertyQuery` | `entities(matching: [Predicate], mode:, sortedBy:, limit:)` | Complex filtering |
| `UniqueAppEntityQuery` | Returns single entity | Singleton-like values |

### SwiftData Integration Pattern

```swift
struct ItemEntityQuery: EntityQuery {
    func entities(for identifiers: [ItemEntity.ID]) async throws -> [ItemEntity] {
        await fetchItems(withIDs: identifiers)
    }
    
    func suggestedEntities() async throws -> [ItemEntity] {
        await fetchRecentItems()
    }
    
    @MainActor
    private func fetchItems(withIDs ids: [UUID]) -> [ItemEntity] {
        do {
            let container = try ModelContainerBuilder.make()
            let context = container.mainContext
            var results: [ItemEntity] = []
            for id in ids {
                let descriptor = FetchDescriptor<Item>(
                    predicate: #Predicate { $0.id == id }
                )
                if let item = try context.fetch(descriptor).first {
                    results.append(ItemEntity(from: item))
                }
            }
            return results
        } catch {
            return []
        }
    }
}
```

**Key pattern:** SwiftData queries require `@MainActor` because `ModelContext.mainContext` is main-actor-isolated. Create `@MainActor` private helpers and call them with `await` from the query methods.

### Dependency Injection in Queries

```swift
struct LandmarkEntityQuery: EntityQuery {
    @Dependency var modelData: ModelData
    
    func entities(for identifiers: [LandmarkEntity.ID]) async throws -> [LandmarkEntity] {
        modelData.landmarks(for: identifiers).map(LandmarkEntity.init)
    }
}

// Register early in app lifecycle:
@main
struct MyApp: App {
    init() {
        AppDependencyManager.shared.add { ModelData() }
    }
}
```

---

## AppShortcutsProvider

### Declaration

```swift
protocol AppShortcutsProvider: Sendable
```

### Purpose

Registers **App Shortcuts** — preconfigured intents with Siri phrases that are available immediately without user setup. These appear in:
- Siri (voice activation)
- Shortcuts app (preconfigured actions)
- Spotlight (action suggestions)
- Action Button (hardware trigger)

### Required Members

```swift
struct MyAppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: StartTimerIntent(),
            phrases: [
                "Start focusing in \(.applicationName)",
                "Focus with \(.applicationName)"
            ],
            shortTitle: "Start Focus",
            systemImageName: "play.fill"
        )
        // ... more shortcuts
    }
}
```

### Optional Members

| Member | Type | Purpose |
|--------|------|---------|
| `shortcutTileColor` | `ShortcutTileColor` | Background color in Shortcuts app |
| `negativePhrases` | `NegativeAppShortcutPhrases` | Phrases that should NOT trigger shortcuts |
| `updateAppShortcutParameters()` | Static method | Refresh dynamic parameter values |

### Key Rules

1. **One provider per app** — only one type should conform to `AppShortcutsProvider`
2. **Main app target only** — the provider and its referenced intents must be in the main app target (not frameworks or extensions)
3. **Maximum 10 App Shortcuts** per app
4. **Phrases must include `\(.applicationName)`** — every phrase needs the app name token
5. **At most one parameter per phrase** — parameterized phrases can reference one `@Parameter`
6. **Auto-discovered** — the framework finds the provider automatically at build time

### Updating Dynamic Parameters

When entity data changes, call this to refresh shortcut parameters:

```swift
MyAppShortcuts.updateAppShortcutParameters()
```

---

## AppShortcut

### Declaration

```swift
struct AppShortcut
```

### Initializers

```swift
// Standard (iOS 16.4+)
AppShortcut(
    intent: MyIntent(),
    phrases: [
        "Do something in \(.applicationName)",
        "Do \(\.$parameter) in \(.applicationName)"
    ],
    shortTitle: "Do Something",
    systemImageName: "star.fill"
)

// With parameter presentation (iOS 17+)
AppShortcut(
    intent: MyIntent(),
    phrases: [...],
    shortTitle: "Do Something",
    systemImageName: "star.fill",
    parameterPresentation: .init(for: \.$parameter) { /* ... */ }
)
```

### Phrase Rules

- Every phrase **must** include `\(.applicationName)`
- Phrases without parameters create a single shortcut
- Phrases with `\(\.$parameter)` create one shortcut per parameter value (for `AppEnum` types)
- Include multiple phrase variations for better Siri recognition
- **Do NOT use `suggestedInvocationPhrase`** — that is a legacy SiriKit property and is not part of App Intents

---

## LiveActivityIntent

### Declaration

```swift
protocol LiveActivityIntent: SystemIntent
```

### Inheritance Chain

```
LiveActivityIntent -> SystemIntent -> AppIntent -> PersistentlyIdentifiable, Sendable
```

### Purpose

Enables interactive buttons in Live Activities (Dynamic Island, lock screen banners). When a `LiveActivityIntent` runs, the system launches the app process **in the background** — it does not open the app UI.

### Available Since

iOS 17.0+, iPadOS 17.0+

### Implementation Pattern

**Important:** For buttons inside an already-running Live Activity, regular `AppIntent` conformance works because `Button(intent:)` accepts any `AppIntent`. The `LiveActivityIntent` protocol is specifically for intents that need to **start** Live Activities from outside the app (e.g., Control Center controls).

#### For buttons inside Live Activities (common pattern):

```swift
// Intent defined in shared code (both app + widget extension targets)
struct PauseTimerIntent: AppIntent {
    static let title: LocalizedStringResource = "Pause Timer"
    
    func perform() async throws -> some IntentResult {
        // Modify shared state (UserDefaults via App Group)
        SharedStateStore.syncPaused(timeRemaining: remaining)
        // Update the Live Activity
        for activity in Activity<TimerAttributes>.activities {
            await activity.update(.init(state: pausedState, staleDate: nil))
        }
        return .result()
    }
}

// In Live Activity view (widget extension):
Button(intent: PauseTimerIntent()) {
    Image(systemName: "pause.fill")
}
.buttonStyle(.plain)
```

#### For starting Live Activities from system UI:

```swift
struct StartTimerLiveActivityIntent: LiveActivityIntent {
    static let title: LocalizedStringResource = "Start Timer"
    
    func perform() async throws -> some IntentResult {
        // Start a new Live Activity in the background
        let attributes = TimerAttributes(sessionLabel: "Focus")
        let state = TimerAttributes.ContentState(...)
        try Activity.request(attributes: attributes, content: .init(state: state, staleDate: nil))
        return .result()
    }
}
```

### Critical Rules for Live Activity Buttons

1. **Use `Button(intent:)` or `Toggle(isOn:, intent:)`** — regular closures do NOT work in widget/Live Activity views
2. **Both targets need the intent** — the intent struct must be compiled into both the main app target and the widget extension target
3. **Only the main app's `perform()` executes** — even though both targets compile the intent, only the app process runs it
4. **Shared state via App Group** — use `UserDefaults(suiteName:)` or shared containers for communication
5. **No `@MainActor` in widget extension** — widget extensions run in a separate process

---

## The ssu-cli-app Crash

### What It Is

`AppIntentsSSUTraining` is a build-time tool (SSU = Siri Shortcut Understanding) that processes App Shortcuts for Siri's natural language understanding. When it fails, Xcode reports:

```
Command AppIntentsSSUTraining failed with a nonzero exit code
```

The `ssu-cli-app` is the command-line binary that crashes during this processing.

### Common Causes

#### 1. Intent Referenced in AppShortcut Doesn't Exist in Main Target

```
Error: The action TestAppIntent referenced in App Shortcut does not exist
```

**Fix:** Ensure every intent referenced in `AppShortcutsProvider.appShortcuts` is defined in the main app target, not in a framework, Swift Package, or extension.

#### 2. Intent in Framework Instead of Main App Target

App Shortcuts require the `AppShortcutsProvider` AND all referenced intents to be in the **main app target**. Moving intents to frameworks (SPM packages, xcframeworks) causes the SSU training tool to fail because it can only scan the main target.

**Fix:** Keep App Shortcut-registered intents in the main app target. Use `AppIntentsPackage` for intents in frameworks, but note that `AppShortcutsProvider` itself must remain in the main target.

#### 3. suggestedInvocationPhrase on Non-Shortcut Intents

The legacy `suggestedInvocationPhrase` property (from `NSUserActivity`) should **never** be used on `AppIntent` structs. The App Intents framework uses `AppShortcutsProvider` with phrases instead. Adding `suggestedInvocationPhrase` to an intent that isn't properly wired through `AppShortcutsProvider` can cause the SSU tool to crash.

**Fix:** Remove `suggestedInvocationPhrase` from all `AppIntent` implementations. Use `AppShortcutsProvider` with `AppShortcut` phrases instead.

#### 4. Flexible Matching Localization Issues

The SSU training tool can fail for locales that don't support flexible matching.

**Fix:** In Build Settings, search for "Enable App Shortcuts Flexible Matching" and set to "No" if encountering locale-related SSU failures.

#### 5. Incorrect iOS Deployment Target for AppShortcut Init

Using an `AppShortcut.init` that requires a newer iOS version than your deployment target.

**Fix:** Check the availability annotations on the `AppShortcut` initializer you're using.

### Prevention Checklist

- [ ] All `AppShortcutsProvider`-referenced intents are in the main app target
- [ ] No `suggestedInvocationPhrase` property on any `AppIntent` struct
- [ ] `AppShortcutsProvider` is in the main app target
- [ ] All `AppShortcut` phrases include `\(.applicationName)`
- [ ] Deployment target matches `AppShortcut.init` availability
- [ ] Clean build folder if issues persist after fixes

---

## Thread Safety and Actor Isolation

### AppIntent is Sendable

The `AppIntent` protocol inherits from `Sendable`. This means:

- The intent struct and all its properties must be `Sendable`
- `@Parameter` properties are `Sendable` by design
- If you reference non-`Sendable` types, use `nonisolated(unsafe)` on static properties

### perform() Threading

`perform()` is `async throws` and runs on a **non-main-actor context** by default. If you need main actor access:

```swift
// Option 1: Annotate perform() with @MainActor
@MainActor
func perform() async throws -> some IntentResult {
    // UI-safe code here
    Navigator.shared.navigate(to: .landmarks)
    return .result()
}

// Option 2: Use MainActor.run for specific sections
func perform() async throws -> some IntentResult {
    let result = await MainActor.run {
        // Main-actor-isolated code
        return someMainActorValue
    }
    return .result()
}

// Option 3: Call @MainActor helpers
func perform() async throws -> some IntentResult {
    await updateUI()
    return .result()
}

@MainActor
private func updateUI() { /* ... */ }
```

### nonisolated(unsafe) for Static Properties

With Swift 6 strict concurrency (`SWIFT_STRICT_CONCURRENCY: complete`), static stored properties on `AppIntent` structs may require `nonisolated(unsafe)`:

```swift
struct MyIntent: AppIntent {
    // This works because LocalizedStringResource is Sendable and it's a let:
    static let title: LocalizedStringResource = "My Intent"
    
    // For var or computed descriptions, you may need:
    nonisolated(unsafe) static var description: IntentDescription? = IntentDescription(...)
    nonisolated(unsafe) static var openAppWhenRun: Bool = true
}
```

**Why:** Static stored `var` properties are global mutable state. Under strict concurrency, this requires either `@MainActor` isolation or `nonisolated(unsafe)` (which tells the compiler "I know this is safe because it's only set once at init time").

### Entity Query Threading

Entity queries that use SwiftData must access the main context on the main actor:

```swift
struct ItemEntityQuery: EntityQuery {
    func entities(for identifiers: [UUID]) async throws -> [ItemEntity] {
        await fetchItems(withIDs: identifiers)  // Bridge to @MainActor
    }
    
    @MainActor
    private func fetchItems(withIDs ids: [UUID]) -> [ItemEntity] {
        let container = try ModelContainerBuilder.make()
        let context = container.mainContext  // Main-actor-isolated
        // ... fetch and return
    }
}
```

---

## Error Handling

### AppIntentError

```swift
struct AppIntentError: Error, Equatable, Sendable
```

Built-in error categories:

| Error Type | Purpose |
|-----------|---------|
| `AppIntentError.PermissionRequired` | App lacks required permission |
| `AppIntentError.UserActionRequired` | User needs to respond |
| `AppIntentError.Unrecoverable` | Unknown/unrecoverable error |
| `AppIntentError.restartPerform` | Retry the perform operation |

### Custom Errors (Recommended Pattern)

Define app-specific errors conforming to `CustomLocalizedStringResourceConvertible`:

```swift
enum MyIntentError: Error, CustomLocalizedStringResourceConvertible {
    case missingParameter
    case noActiveSession
    case itemNotFound
    
    var localizedStringResource: LocalizedStringResource {
        switch self {
        case .missingParameter:
            return "Missing required parameter."
        case .noActiveSession:
            return "No active session. Start one first."
        case .itemNotFound:
            return "Item not found."
        }
    }
}
```

Usage in `perform()`:

```swift
func perform() async throws -> some IntentResult {
    guard let item = item else {
        throw MyIntentError.missingParameter
    }
    guard manager.isSessionActive else {
        throw MyIntentError.noActiveSession
    }
    // ... success path
}
```

### needsValue Pattern

For required parameters that might not be provided:

```swift
func perform() async throws -> some IntentResult {
    guard let quantity = quantity, quantity < 10 else {
        throw $quantity.needsValue  // System will prompt user
    }
    // ...
}
```

---

## Return Types and IntentResult

### Protocol Composition

The `perform()` return type uses protocol composition to declare what the intent provides:

```swift
// Basic — just completes
func perform() async throws -> some IntentResult { ... }

// With Siri dialog
func perform() async throws -> some IntentResult & ProvidesDialog { ... }

// With return value (for Shortcuts chaining)
func perform() async throws -> some IntentResult & ReturnsValue<Double> { ... }

// With snippet view
func perform() async throws -> some IntentResult & ShowsSnippetView { ... }

// Full composition
func perform() async throws -> some ReturnsValue<LandmarkEntity> & ProvidesDialog & ShowsSnippetView { ... }
```

### Available Protocols

| Protocol | Purpose |
|----------|---------|
| `IntentResult` | Base — required |
| `ProvidesDialog` | Siri speaks a response |
| `ReturnsValue<T>` | Returns typed data for Shortcuts chaining |
| `ShowsSnippetView` | Displays a SwiftUI view in Siri/Spotlight |
| `ShowsSnippetIntent` | **iOS 26+** — Returns a SnippetIntent for interactive follow-up |
| `OpensIntent` | Delivers intent back to initiator |

### Result Construction

```swift
// Simple result
return .result()

// With dialog
return .result(dialog: "Started a \(minutes)-minute session")

// With value
return .result(value: true)

// With value and dialog
return .result(value: amount, dialog: "You've consumed \(amount)mg.")

// With value, dialog, and view
return .result(
    value: landmark,
    dialog: "The closest landmark is \(landmark.name)",
    view: ClosestLandmarkView(landmark: landmark)
)

// iOS 26: With snippet intent
return .result(
    value: landmark,
    dialog: IntentDialog(
        full: "The closest landmark is \(landmark.name).",
        supporting: "\(landmark.name) is in \(landmark.continent)."
    ),
    snippetIntent: LandmarkSnippetIntent(landmark: landmark)
)
```

---

## supportedModes (Replaces openAppWhenRun)

**Available:** iOS 26.0+

### Declaration

```swift
static let supportedModes: IntentModes
```

### Values

| Mode | Equivalent (Old) | Behavior |
|------|------------------|----------|
| `.background` | `openAppWhenRun = false` | Runs entirely in background |
| `.foreground(.immediate)` | `openAppWhenRun = true` | Foregrounds app before `perform()` |
| `.foreground(.dynamic)` | `ForegroundContinuableIntent` | Intent decides at runtime |
| `.foreground(.deferred)` | — | Background first, guaranteed foreground later |

### Combined Modes

```swift
// Background preferred, but can foreground dynamically
static let supportedModes: IntentModes = [.background, .foreground(.dynamic)]

func perform() async throws -> some IntentResult {
    if systemContext.currentMode.canContinueInForeground {
        try await continueInForeground(alwaysConfirm: false)
        // Now in foreground, show UI
    }
    // ... background work
}
```

### Migration

```swift
// OLD (still works but deprecated):
static let openAppWhenRun: Bool = true

// NEW (iOS 26+):
static let supportedModes: IntentModes = .foreground(.immediate)
```

---

## iOS 26 New APIs

### SnippetIntent Protocol

Interactive snippets with buttons and state in Siri/Spotlight:

```swift
struct LandmarkSnippetIntent: SnippetIntent {
    static let title: LocalizedStringResource = "Landmark Snippet"

    @Parameter var landmark: LandmarkEntity

    func perform() async throws -> some IntentResult & ShowsSnippetView {
        return .result(view: LandmarkView(landmark: landmark))
    }
}
```

**Rules for SnippetIntent:**
- Do NOT mutate app state in `perform()` — snippets may re-run for display changes
- Render views quickly to avoid unresponsiveness
- System may run the snippet multiple times (dark mode, display changes)
- Use `SnippetIntent.reload()` to trigger re-rendering

### @ComputedProperty Macro

Avoids duplicating data between entities and models:

```swift
struct LandmarkEntity: AppEntity {
    let landmark: Landmark
    
    @ComputedProperty
    var name: String { landmark.name }  // No stored copy
}
```

### @DeferredProperty Macro

Async properties fetched on demand:

```swift
@DeferredProperty
var crowdStatus: Int {
    get async throws {
        await modelData.getCrowdStatus(self)
    }
}
```

### UndoableIntent Protocol

```swift
struct DeleteCollectionIntent: UndoableIntent {
    func perform() async throws -> some IntentResult {
        await undoManager?.registerUndo(withTarget: modelData) { modelData in
            // Restore...
        }
        // Delete...
    }
}
```

### Multiple Choice API

```swift
let archive = Option(title: "Archive", style: .default)
let delete = Option(title: "Delete", style: .destructive)

let choice = try await requestChoice(
    between: [.cancel, archive, delete],
    dialog: "Archive or delete?",
    view: collectionView
)
```

### Visual Intelligence Integration

```swift
struct LandmarkIntentValueQuery: IntentValueQuery {
    func values(for input: SemanticContentDescriptor) async throws -> [LandmarkEntity] {
        guard let pixelBuffer = input.pixelBuffer else { return [] }
        return try await modelData.searchLandmarks(matching: pixelBuffer)
    }
}
```

### AppIntentsPackage for Swift Packages

Intents can now live in Swift Packages and static libraries:

```swift
// In your Swift Package:
public struct MyKitPackage: AppIntentsPackage { }

// In your app target:
struct MyAppPackage: AppIntentsPackage {
    static var includedPackages: [any AppIntentsPackage.Type] {
        [MyKitPackage.self]
    }
}
```

### onAppIntentExecution View Modifier

Handle intent-triggered navigation in views:

```swift
NavigationStack(path: $path) { /* ... */ }
    .onAppIntentExecution(OpenLandmarkIntent.self) { intent in
        path.append(intent.target.landmark)
    }
```

---

## Testing App Intents

### Direct perform() Testing

App Intents can be tested by instantiating the intent, setting parameters, calling `perform()`, and asserting side effects:

```swift
@MainActor
final class TimerIntentsTests: XCTestCase {
    
    override func setUp() async throws {
        SharedStateStore.clear()
    }
    
    func test_startTimerIntent_perform_startsTimer() async throws {
        // Given
        let intent = StartTimerIntent()
        intent.minutes = 25
        
        // When
        _ = try await intent.perform()
        
        // Then
        XCTAssertTrue(SharedStateStore.isRunning)
        XCTAssertEqual(SharedStateStore.totalDuration, 25 * 60, accuracy: 0.1)
    }
    
    func test_startTimerIntent_defaultValues() {
        let intent = StartTimerIntent()
        XCTAssertEqual(intent.minutes, 25)
        XCTAssertNil(intent.label)
    }
}
```

### Testing Patterns

| What to Test | How |
|-------------|-----|
| Default parameter values | Instantiate and assert properties |
| `perform()` side effects | Call `perform()`, assert state changes |
| Error conditions | Call `perform()` in invalid state, expect throws |
| Guard clause behavior | Call without required preconditions, assert no-op |
| Codable payloads | Encode/decode helper types round-trip |
| Static properties | Assert `openAppWhenRun`, `title`, etc. |

### Test Best Practices

1. **Always clean up state** in `setUp()` and `tearDown()`
2. **Use `@MainActor`** on test classes when testing intents that touch main-actor state
3. **Test both success and failure paths** for each intent
4. **Test parameter edge cases** — empty strings, zero values, very large values
5. **Test idempotency** — calling an intent when already in the target state should be safe
6. **Assert intermediate state** — set up preconditions, verify them before acting

### Testing Entity Queries

```swift
func test_entityQuery_returnsMatchingEntities() async throws {
    // Given: Create test data in SwiftData
    let container = try ModelContainer(for: Item.self, configurations: .init(isStoredInMemoryOnly: true))
    let context = container.mainContext
    let item = Item(title: "Test Item", ...)
    context.insert(item)
    try context.save()
    
    // When
    let query = ItemEntityQuery()
    let results = try await query.entities(for: [item.id])
    
    // Then
    XCTAssertEqual(results.count, 1)
    XCTAssertEqual(results.first?.title, "Test Item")
}
```

---

## Best Practices

### Design

1. **Start small** — add one App Shortcut first, then expand
2. **Use verb + noun** for intent titles: "Start Timer", "Capture Note"
3. **Write descriptive parameter summaries** — they appear in the Shortcuts editor
4. **Provide dialog responses** for Siri — use `ProvidesDialog` protocol
5. **Include multiple phrase variations** for better Siri recognition
6. **Use `categoryName`** to group related intents in the Shortcuts editor

### Architecture

7. **Keep intents thin** — intents should coordinate, not contain business logic
8. **Use `@Dependency`** for injecting services into intents and queries
9. **Register dependencies early** — in `App.init()` via `AppDependencyManager.shared.add`
10. **Titles and descriptions must be constants** — no computed properties or function calls (build-time extraction)
11. **Entity IDs must be persistent** — the system saves them in user shortcuts
12. **Provide both `init()` and parameterized `init`** for intents used programmatically

### Concurrency

13. **AppIntent is Sendable** — all properties must be Sendable
14. **Use `@MainActor` on `perform()`** when accessing UI or main-actor-isolated state
15. **Use `nonisolated(unsafe)`** on static `var` properties for Swift 6 strict concurrency
16. **SwiftData queries need `@MainActor`** helper methods for `mainContext` access

### Shortcuts Integration

17. **All phrases must include `\(.applicationName)`**
18. **Maximum one parameter per phrase**
19. **Maximum 10 App Shortcuts** per app
20. **`AppShortcutsProvider` must be in the main app target**
21. **Never use `suggestedInvocationPhrase`** — it's a legacy SiriKit concept

### Live Activities

22. **Use `Button(intent:)` for interactive elements** — regular closures don't work
23. **Both app and widget targets need the intent definition**
24. **Only the main app's `perform()` executes**
25. **Communicate via App Group `UserDefaults`** between app and widget extension

---

## Common Mistakes

### 1. Using suggestedInvocationPhrase

```swift
// WRONG — causes ssu-cli-app crash
struct MyIntent: AppIntent {
    static var suggestedInvocationPhrase: String? = "Do the thing"
    // ...
}

// RIGHT — use AppShortcutsProvider with phrases
struct MyAppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: MyIntent(),
            phrases: ["Do the thing with \(.applicationName)"],
            shortTitle: "Do Thing",
            systemImageName: "star"
        )
    }
}
```

### 2. Putting Shortcut Intents in a Framework

```swift
// WRONG — SSU training can't find intents in frameworks
// MyFramework/Sources/MyIntent.swift
public struct MyIntent: AppIntent { ... }

// RIGHT — App Shortcut intents must be in main app target
// MyApp/Intents/MyIntent.swift
struct MyIntent: AppIntent { ... }
```

### 3. Missing applicationName in Phrases

```swift
// WRONG
phrases: ["Start a session"]

// RIGHT
phrases: ["Start a session in \(.applicationName)"]
```

### 4. Regular Closures in Widget/Live Activity Buttons

```swift
// WRONG — does nothing, taps return to main app
Button("Pause") {
    timer.pause()
}

// RIGHT — uses intent system
Button(intent: PauseTimerIntent()) {
    Image(systemName: "pause.fill")
}
```

### 5. Non-Sendable Properties

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

### 6. Not Providing Default Initializer

```swift
// WRONG — missing required init()
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

## Example Patterns

### Timer App Intents (Example)

| Intent | Type | Opens App | Purpose |
|--------|------|-----------|---------|
| `StartTimerIntent` | AppIntent | Yes | Start timer with duration + label |
| `StopTimerIntent` | AppIntent | No | Stop timer, save pending session |
| `PauseTimerIntent` | AppIntent | No | Pause running timer |
| `ResumeTimerIntent` | AppIntent | No | Resume paused timer |
| `CaptureNoteIntent` | AppIntent | Yes | Capture text via Siri/Shortcuts |
| `StartWithContextIntent` | AppIntent | Yes | Start with task context + source app |

### Presentation App Intents (Example)

| Intent | Type | Opens App | Purpose |
|--------|------|-----------|---------|
| `StartSessionIntent` | AppIntent | Yes | Start a specific session with options |
| `EndSessionIntent` | AppIntent | No | End current session |
| `PauseSessionIntent` | AppIntent | No | Pause current session |
| `ResumeSessionIntent` | AppIntent | No | Resume paused session |
| `AdvanceSectionIntent` | AppIntent | No | Next section |
| `PreviousSectionIntent` | AppIntent | No | Previous section |
| `GoToSectionIntent` | AppIntent | No | Jump to section by number |
| `GetCurrentInfoIntent` | AppIntent | No | Get current session info |
| `ToggleStateIntent` | SetValueIntent | No | Control Center toggle |

### Communication Patterns

Intents communicate with the app via:

1. **`SharedStateStore` (UserDefaults + App Group)** — for timer state (widget <-> app)
2. **`NotificationCenter.default.post`** — for navigation intents (intent -> app UI)
3. **`UserDefaults` pending data** — for deferred actions (e.g., `pendingCapture`, `pendingStoppedSession`)
4. **`IntentDataManager.shared`** — for session management (singleton)

---

## References

- [App Intents Framework](https://developer.apple.com/documentation/appintents) — Apple Developer Documentation
- [AppIntent Protocol](https://developer.apple.com/documentation/appintents/appintent) — Protocol reference
- [AppEntity Protocol](https://developer.apple.com/documentation/appintents/appentity) — Entity reference
- [LiveActivityIntent Protocol](https://developer.apple.com/documentation/appintents/liveactivityintent) — Live Activity intents
- [AppShortcutsProvider Protocol](https://developer.apple.com/documentation/appintents/appshortcutsprovider) — Shortcuts registration
- [EntityQuery Protocol](https://developer.apple.com/documentation/appintents/entityquery) — Entity resolution
- [IntentDescription Struct](https://developer.apple.com/documentation/appintents/intentdescription) — Intent metadata
- [IntentParameter (@Parameter)](https://developer.apple.com/documentation/appintents/intentparameter) — Parameter property wrapper
- [Get to know App Intents — WWDC25](https://developer.apple.com/videos/play/wwdc2025/244/) — Comprehensive introduction
- [Explore new advances in App Intents — WWDC25](https://developer.apple.com/videos/play/wwdc2025/275/) — iOS 26 new APIs
- [Develop for Shortcuts and Spotlight with App Intents — WWDC25](https://developer.apple.com/videos/play/wwdc2025/260/) — Spotlight integration
- [What's new in App Intents — WWDC24](https://developer.apple.com/videos/play/wwdc2024/10134/) — iOS 18 additions
- [AppIntentsSSUTraining Error Fix](https://www.martinlasek.com/articles/error-app-intents-ssu-training) — SSU crash workaround
- [App Intents Field Guide — Superwall](https://superwall.com/blog/an-app-intents-field-guide-for-ios-developers/) — Practical tutorial
- [LiveActivityIntent Implementation — Ben Frearson](https://bfrearson.github.io/blog/ios-live-activties/) — Live Activity button patterns
