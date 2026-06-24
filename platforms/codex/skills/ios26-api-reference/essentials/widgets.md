# WidgetKit / Live Activities — iOS 26 Essentials

> For deep reference: load `reference/widgets-reference.md`

---

## Correct API Signatures (vs Common Mistakes)

| # | Topic | WRONG | RIGHT | Why |
|---|-------|-------|-------|-----|
| 1 | Timer display update | `Timer.scheduledTimer(withTimeInterval: 1) { activity.update(...) }` | `Text(timerInterval: startDate...endDate, countsDown: true)` | System renders per-second countdown for FREE; manual updates waste budget |
| 2 | ContentState conformance | `struct ContentState: Codable, Hashable { }` | `struct ContentState: Codable, Hashable, Sendable { }` | Crosses process boundaries (app -> widget extension); must be Sendable in Swift 6 |
| 3 | SwiftData in widgets | `@Query var sessions: [Session]` in widget | Export data via App Group JSON; read in widget | Widget extensions have ~16-24 MB memory; ModelContainer will crash |
| 4 | Starting from background | Calling `Activity.request()` from a background task | Only call `Activity.request()` when app is in foreground | System enforces foreground-only for activity creation |
| 5 | Ending without final state | `await activity.end(nil, dismissalPolicy: .default)` | `await activity.end(ActivityContent(state: finalState, staleDate: nil), dismissalPolicy: .default)` | Nil content shows stale/frozen data to user |
| 6 | Missing Codable on enums | `enum SessionStatus: String { case active, paused }` in ContentState | `enum SessionStatus: String, Codable, Sendable { case active, paused }` | ActivityAttributes serialization fails at runtime |
| 7 | Widget timeline spam | `WidgetCenter.shared.reloadTimelines(ofKind:)` on every timer tick | Only reload on meaningful state changes (start, pause, resume, end) | Timeline reloads are system-budgeted |
| 8 | ActivityKit import warnings | `import ActivityKit` (strict concurrency warnings) | `import ActivityKit` with proper `@MainActor` isolation; add `@preconcurrency` ONLY if compiler specifically demands it | iOS 26: ActivityKit is Sendable-annotated; prophylactic @preconcurrency masks real issues |
| 9 | Push type for local-only apps | `pushType: .token` when no server exists | `pushType: nil` | `.token` generates push tokens and expects server infrastructure |
| 10 | Paused timer display | `Text(timerInterval:)` while paused (keeps ticking) | Static formatted `Text(String(format:))` when `isPaused` is true | Live countdown ignores pause state; must switch to frozen display |

---

## Crash Prevention Patterns

### Crash 1: SwiftData in Widget Extension

```swift
// WRONG — crashes with EXC_RESOURCE (memory)
import SwiftData
@Query var sessions: [Session]  // CRASH!
let container = try ModelContainer(for: Session.self)  // CRASH!

// RIGHT — read exported JSON from App Group
let url = FileManager.default
    .containerURL(forSecurityApplicationGroupIdentifier: "group.com.myapp.shared")?
    .appendingPathComponent("widget-data.json")
let data = try Data(contentsOf: url!)
let widgetData = try JSONDecoder().decode(WidgetDTO.self, from: data)
```

### Crash 2: ActivityContent Sendable Warning

```swift
// WRONG — strict concurrency error in Swift 6
let content = ActivityContent(state: newState, staleDate: staleDate)
await activity.update(content)

// RIGHT — workaround for incomplete ActivityKit annotations
nonisolated(unsafe) let content = ActivityContent(
    state: newState,
    staleDate: staleDate
)
await activity.update(content)
```

### Crash 3: suggestedInvocationPhrase on LiveActivityIntent

```swift
// WRONG — causes ssu-cli-app crash in Xcode Cloud
struct PauseTimerIntent: LiveActivityIntent {
    static var title: LocalizedStringResource = "Pause Timer"
    var suggestedInvocationPhrase: String? = "Pause"  // CRASH!
    ...
}

// RIGHT — remove suggestedInvocationPhrase from non-shortcut intents
struct PauseTimerIntent: LiveActivityIntent {
    static var title: LocalizedStringResource = "Pause Timer"
    func perform() async throws -> some IntentResult {
        return .result()
    }
}
```

### Crash 4: Updating Ended Activity

```swift
// WRONG — silent failure or crash
await activity.update(content)  // activity already ended

// RIGHT — always check state before updating
guard let activity = currentActivity,
      activity.activityState == .active else {
    return
}
await activity.update(content)
```

### Crash 5: Widget Extension Exceeds Memory

```swift
// WRONG — large images or complex view hierarchies
Image(uiImage: fullResPhoto)  // ~16-24 MB limit!

// RIGHT — use SF Symbols and lightweight views
Image(systemName: "timer")
    .foregroundStyle(.green)
```

### Crash 6: Orphaned Activities After App Termination

```swift
// WRONG — no cleanup, orphaned activities persist on Lock Screen
// (user sees stale data forever)

// RIGHT — reclaim or end orphans on launch
func reclaimOrphanedActivities() async {
    for activity in Activity<TimerAttributes>.activities {
        if activity.activityState == .active,
           SharedStateStore.isRunning {
            self.currentActivity = activity
            await activity.update(currentState)
        } else {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
    }
}
```

---

## Known Gotchas

- **iOS 18+ refresh rate change**: Live Activities refresh content every 5-15 seconds (down from every second in iOS 17). Does NOT affect `Text(timerInterval:)` which still updates per-second via the system.
- **Max 5 concurrent activities per app**. System may end older ones if exceeded.
- **Max duration**: 8 hours active (Dynamic Island + Lock Screen), then up to 4 more hours on Lock Screen only (12 total).
- **ContentState payload limit**: ~4 KB. Keep it minimal — no full model objects.
- **`staleDate`** marks when displayed data should be considered outdated — set it slightly after expected end.
- **`relevanceScore`** (0.0-1.0+) determines priority when multiple Live Activities exist. Higher = more prominent.
- **Push update budget is dynamic** — Apple does not publish a specific number/hour. Depends on battery, engagement, system load.
- **`NSSupportsLiveActivitiesFrequentUpdates`** in Info.plist requests higher push budget, but user can disable it in Settings.
- **Widget render timeout**: Complex SwiftUI hierarchies in the widget extension can be killed by the system. Keep views simple.
- **`WidgetCenter.reloadTimelines()`** is budgeted. Don't call it in rapid succession.
- **`.supplementalActivityFamilies([.small, .medium])`** enables CarPlay and Apple Watch presentation (iOS 26).
- **macOS Tahoe**: Live Activities from paired iPhone appear in the menu bar automatically — no code changes needed.
- **Scheduled Live Activities** (iOS 26): `Activity.request(... startDate: futureDate)` to start at a future time.
- **Widget Push Notifications** (iOS 26): Server can trigger widget timeline reloads via `.pushHandler()` — separate from Live Activity push updates.
- **Layout shifts**: Always use `.monospacedDigit()` and `.frame(width:)` on timer text to prevent jitter when digits change.

---

## Quick Checklist

- [ ] `NSSupportsLiveActivities = YES` in Info.plist
- [ ] App Group entitlement on BOTH app target AND widget extension target
- [ ] `ContentState` conforms to `Codable`, `Hashable`, AND `Sendable`
- [ ] Using `Text(timerInterval:countsDown:)` for countdown display (not manual timer updates)
- [ ] Calling `activity.update()` only for state changes (pause/resume/capture/overtime), NOT every second
- [ ] Providing final `ContentState` when calling `activity.end()` (never pass nil)
- [ ] Cleaning up orphaned activities on app launch (`reclaimOrphanedActivities()`)
- [ ] `@preconcurrency import ActivityKit` ONLY if the compiler specifically demands it (iOS 26: do not add prophylactically)
- [ ] No `suggestedInvocationPhrase` on `LiveActivityIntent` structs (causes ssu-cli-app crash)
- [ ] No SwiftData imports or `@Query` in the widget extension target
- [ ] Using `nonisolated(unsafe)` for `ActivityContent` creation in strict concurrency mode
- [ ] `.monospacedDigit()` + fixed `.frame(width:)` on all timer text displays

---

### References

- [ActivityKit Documentation](https://developer.apple.com/documentation/activitykit)
- [Activity Class](https://developer.apple.com/documentation/activitykit/activity)
- [ActivityAttributes Protocol](https://developer.apple.com/documentation/activitykit/activityattributes)
- [WidgetKit Documentation](https://developer.apple.com/documentation/widgetkit)
- [Live Activities HIG](https://developer.apple.com/design/human-interface-guidelines/live-activities)
- [Displaying Live Data with Live Activities](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)
- [Starting and Updating with Push Notifications](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications)
- [AlertConfiguration](https://developer.apple.com/documentation/activitykit/alertconfiguration)
- [DynamicIslandExpandedRegionPosition](https://developer.apple.com/documentation/WidgetKit/DynamicIslandExpandedRegionPosition)
- [What's New in Widgets — WWDC25](https://developer.apple.com/videos/play/wwdc2025/278/)
- [Design Dynamic Live Activities — WWDC23](https://developer.apple.com/videos/play/wwdc2023/10194/)
- [Meet ActivityKit — WWDC23](https://developer.apple.com/videos/play/wwdc2023/10184/)
