---
name: app-intents
category: engineering
description: App Intents, Shortcuts, Siri, Spotlight, interactive Widgets, Controls (Control Center / Action button), and Live Activities / Dynamic Island. Use when exposing app actions to Siri/Shortcuts/Spotlight, building an interactive or Lock Screen widget, adding a Control Center control, or showing a Live Activity / Dynamic Island. Trigger on "App Intent", "AppShortcut", "Siri", "Shortcuts", "interactive widget", "Control Widget", "Live Activity", "Dynamic Island", or "ActivityKit".
---

# App Intents, Widgets & Live Activities

**Expose your app's actions and surface them across the system** — Siri, Shortcuts, Spotlight, widgets, Control Center, the Action button, and Live Activities. One App Intent powers all of them. Verify signatures against the **apple-docs MCP** (`get_symbol`, `list_framework AppIntents`); see `ios26-api-reference` for crash-prone API gotchas.

---

## App Intents — the foundation

An `AppIntent` is a unit of app functionality the system can run. Define it once; reuse it in Shortcuts, Siri, widgets, and controls.

```swift
import AppIntents

struct StartFocusIntent: AppIntent {
    static let title: LocalizedStringResource = "Start Focus Session"
    static let description = IntentDescription("Begins a focus session.")

    @Parameter(title: "Duration (minutes)")
    var minutes: Int

    // Bring the app to the foreground when run? Default false (runs in background).
    static let openAppWhenRun = false

    @MainActor
    func perform() async throws -> some IntentResult & ProvidesDialog {
        try await FocusEngine.shared.start(minutes: minutes)
        return .result(dialog: "Started a \(minutes)-minute session.")
    }
}
```

- `perform()` is `async throws` and returns `some IntentResult`. Compose result types: `& ProvidesDialog`, `& ReturnsValue<T>`, `& OpensIntent`, `& ShowsSnippetView`.
- `@Parameter` values can be requested interactively by Siri/Shortcuts when missing.
- Keep `perform()` fast and `@MainActor` only where it touches UI/model state (see `ios-standards`).

### Entities & queries (let intents operate on your data)

```swift
struct Project: AppEntity {
    static let typeDisplayRepresentation: TypeDisplayRepresentation = "Project"
    static let defaultQuery = ProjectQuery()
    var id: UUID
    var displayRepresentation: DisplayRepresentation { DisplayRepresentation(title: "\(name)") }
    let name: String
}

struct ProjectQuery: EntityQuery {
    func entities(for ids: [UUID]) async throws -> [Project] { /* fetch */ }
    func suggestedEntities() async throws -> [Project] { /* recents */ }
}
```

`AppEntity` + `EntityQuery` let parameters be picked from your real data and make intents work with "the project named X".

---

## App Shortcuts — zero-setup Siri & Spotlight

`AppShortcutsProvider` auto-registers phrases. No user setup; they appear in Spotlight and Siri immediately after install.

```swift
struct FocusShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: StartFocusIntent(),
            phrases: ["Start a focus session in \(.applicationName)"],
            shortTitle: "Start Focus",
            systemImageName: "timer"
        )
    }
}
```

- **Always include `\(.applicationName)`** in at least one phrase per shortcut — Siri requires it.
- App Shortcuts are limited (~10); reserve them for your highest-value actions.

---

## Interactive widgets (iOS 17+)

Widgets run intents directly from `Button(intent:)` / `Toggle(intent:)` — no app launch.

```swift
// In the widget view
Button(intent: StartFocusIntent(minutes: 25)) { Label("Focus", systemImage: "play.fill") }
Toggle(isOn: isActive, intent: ToggleFocusIntent()) { Text("Active") }
```

Use an `AppIntentTimelineProvider` so the timeline reacts to intent-driven state. Keep widget work tiny; heavy lifting belongs in the app/shared model.

---

## Controls (iOS 18+) — Control Center, Lock Screen, Action button

```swift
struct FocusControl: ControlWidget {
    var body: some ControlWidgetConfiguration {
        StaticControlConfiguration(kind: "com.app.focus") {
            ControlWidgetToggle("Focus", isOn: FocusState.isActive, action: ToggleFocusIntent()) { isOn in
                Label(isOn ? "On" : "Off", systemImage: "timer")
            }
        }
    }
}
```

`ControlWidgetButton` / `ControlWidgetToggle` are backed by App Intents. The same control can be assigned to the **Action button** by the user.

---

## Live Activities & Dynamic Island (ActivityKit)

Show real-time, glanceable state on the Lock Screen and in the Dynamic Island.

```swift
import ActivityKit

struct FocusAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable { var remaining: TimeInterval }
    var sessionName: String
}

// Start (in-app)
let activity = try Activity.request(
    attributes: FocusAttributes(sessionName: "Deep Work"),
    content: .init(state: .init(remaining: 1500), staleDate: nil)
)

// Update
await activity.update(.init(state: .init(remaining: 1200), staleDate: nil))

// End
await activity.end(nil, dismissalPolicy: .immediate)
```

UI is a `Widget` whose body is an `ActivityConfiguration` with a Lock Screen view and a `DynamicIsland { ... }` (compact/minimal/expanded regions).

**Constraints:**
- Requires `NSSupportsLiveActivities = YES` in Info.plist.
- `ContentState` must stay small (~4KB) and `Codable`.
- Remote updates use **ActivityKit push tokens** with `apns-push-type: liveactivity` — see `push-notifications`.
- Use `Text(timerInterval:)` for self-updating countdowns instead of pushing every second.

---

## Where this connects

- `push-notifications` — remote Live Activity / widget updates.
- `ios26-api-reference` — App Intents / ActivityKit crash patterns and availability.
- `ios-standards` — concurrency/isolation rules for `perform()` and shared state.
