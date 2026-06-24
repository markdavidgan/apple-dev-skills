# WidgetKit & ActivityKit Comprehensive Reference (iOS 26)

> Definitive reference for Live Activities, Dynamic Island, and WidgetKit for timer-based apps. Compiled from Apple documentation, WWDC25, developer forums, and verified codebase patterns.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [ActivityAttributes & ContentState](#activityattributes--contentstate)
3. [Live Activity Lifecycle](#live-activity-lifecycle)
4. [Update Frequency & Budget System](#update-frequency--budget-system)
5. [Dynamic Island Layouts](#dynamic-island-layouts)
6. [Timer Display Patterns](#timer-display-patterns)
7. [AlertConfiguration (Sound & Haptics)](#alertconfiguration-sound--haptics)
8. [App Groups & Shared State](#app-groups--shared-state)
9. [SwiftData Access from Widgets](#swiftdata-access-from-widgets)
10. [Concurrency & Actor Isolation](#concurrency--actor-isolation)
11. [Push Notification Updates](#push-notification-updates)
12. [iOS 26 New Features](#ios-26-new-features)
13. [Error Handling & Limits](#error-handling--limits)
14. [Widget Push Notifications (iOS 26)](#widget-push-notifications-ios-26)
15. [Previewing & Testing](#previewing--testing)
16. [Best Practices for Timer Apps](#best-practices-for-timer-apps)
17. [Example Codebase Patterns](#example-codebase-patterns)

---

## Architecture Overview

### Process Boundary

```
┌─────────────────────┐         ┌──────────────────────┐
│     Main App        │         │  Widget Extension    │
│   (Foreground)      │         │  (Separate Process)  │
│                     │         │                      │
│  Activity.request() │────────►│  ActivityConfiguration│
│  Activity.update()  │────────►│  DynamicIsland {}    │
│  Activity.end()     │────────►│  Lock Screen View    │
│                     │         │                      │
│  SwiftData ✅       │         │  SwiftData ❌        │
│  Full app context   │         │  16-24 MB memory     │
└─────────────────────┘         └──────────────────────┘
         │                                │
         └──────────┬─────────────────────┘
                    │
         ┌──────────▼──────────┐
         │   App Group         │
         │   (Shared Storage)  │
         │   UserDefaults      │
         │   JSON files        │
         └─────────────────────┘
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **ActivityAttributes** | Protocol defining static + dynamic data for a Live Activity |
| **ContentState** | Nested type within ActivityAttributes for dynamic (updatable) data |
| **ActivityContent** | Wrapper around ContentState + staleDate + relevanceScore |
| **Activity\<T\>** | The runtime object representing a running Live Activity |
| **ActivityConfiguration** | Widget configuration that defines Lock Screen + Dynamic Island views |
| **DynamicIsland** | Layout container with expanded, compact, and minimal presentations |
| **LiveActivityIntent** | AppIntent subprotocol for interactive buttons in Live Activities |

---

## ActivityAttributes & ContentState

### Protocol Requirements

```swift
public protocol ActivityAttributes: Decodable, Encodable {
    associatedtype ContentState: Codable & Hashable
}
```

**Rules:**
- `ActivityAttributes` must be `Codable` (both `Encodable` and `Decodable`)
- `ContentState` must be `Codable` and `Hashable`
- For Swift 6: `ContentState` should also be `Sendable`
- Static properties go on the outer struct (don't change during activity lifecycle)
- Dynamic properties go in `ContentState` (updated via `Activity.update()`)
- Keep `ContentState` small -- it's serialized on every update

### Example TimerAttributes Pattern

```swift
// TimerAttributes.swift — define in a shared package accessible to both app and widget
public struct TimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable, Sendable {
        public var startDate: Date                     // When timer started
        public var totalDuration: TimeInterval         // Full session length
        public var expectedEndDate: Date               // Computed end time
        public var isPaused: Bool                      // Pause state
        public var pausedTimeRemaining: TimeInterval?  // Time left when paused
        public var captureCount: Int                   // Action count
        public var isOvertime: Bool                    // Past expected end
    }

    // Static: doesn't change during the activity
    public var sessionLabel: String?
}
```

### Design Guidelines for ContentState

```swift
// ✅ CORRECT: Minimal, Sendable, all Codable
struct ContentState: Codable, Hashable, Sendable {
    var timeRemaining: TimeInterval
    var isPaused: Bool
    var captureCount: Int
}

// ❌ WRONG: Too much data, non-Sendable types
struct ContentState: Codable, Hashable {
    var fullSessionObject: Session  // Too large, likely not Sendable
    var userPreferences: Preferences     // Unnecessary for display
    var closure: () -> Void              // Not Codable or Sendable!
}
```

### Codable Strictness (iOS 26)

All types used in ActivityAttributes must be **explicitly** Codable:

```swift
// ✅ CORRECT
enum SessionStatus: String, Codable, Sendable {
    case focusing, paused, completed
}

// ❌ WRONG: Will fail at runtime
enum SessionStatus: String {  // Missing Codable!
    case focusing, paused
}
```

---

## Live Activity Lifecycle

### Overview

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│          │     │          │     │          │     │          │
│  Check   │────►│ Request  │────►│ Update   │────►│   End    │
│  Auth    │     │ (Start)  │     │ (0..N)   │     │          │
│          │     │          │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │               │                  │
                      ▼               ▼                  ▼
                 Lock Screen     Data refresh       Dismissal
                 Dynamic Island  Alert optional     Policy applied
```

### Step 1: Check Authorization

```swift
let authInfo = ActivityAuthorizationInfo()

// One-time check
guard authInfo.areActivitiesEnabled else {
    throw LiveActivityError.notEnabled
}

// Continuous monitoring
Task {
    for await isEnabled in authInfo.areActivitiesEnabledUpdates {
        // React to user toggling Live Activities in Settings
    }
}

// Check frequent push support
if authInfo.areFrequentPushesEnabled {
    // User has not disabled frequent updates in Settings
}
```

### Step 2: Request (Start) a Live Activity

```swift
// Method signature:
// static func request(
//     attributes: Attributes,
//     content: ActivityContent<Attributes.ContentState>,
//     pushType: PushType? = nil
// ) throws -> Activity<Attributes>

let attributes = TimerAttributes(sessionLabel: "Deep Work")

let contentState = TimerAttributes.ContentState(
    startDate: Date(),
    totalDuration: 1500,  // 25 minutes
    expectedEndDate: Date().addingTimeInterval(1500),
    isPaused: false,
    captureCount: 0
)

let activityContent = ActivityContent(
    state: contentState,
    staleDate: Date().addingTimeInterval(1560),  // Stale 1 min after expected end
    relevanceScore: 1.0  // Higher = more prominent when multiple activities
)

do {
    let activity = try Activity.request(
        attributes: attributes,
        content: activityContent,
        pushType: nil  // Use .token for server push updates
    )
    // Store reference for later updates
    self.currentActivity = activity
} catch {
    // Handle: notAuthorized, limit reached, system not supported
    print("Failed to start: \(error)")
}
```

**Critical Rules for `request()`:**
- Can **only** be called when the app is in the **foreground**
- `pushType: .token` enables server push updates (generates a push token)
- `pushType: nil` means local-only updates
- `staleDate` marks when the displayed data should be considered outdated
- `relevanceScore` (0.0-1.0+) determines priority when multiple Live Activities exist
- **Throws** if Live Activities are disabled or system limits are reached

### Step 3: Update a Live Activity

```swift
// Method signatures:
// func update(_ content: ActivityContent<Attributes.ContentState>) async
// func update(_ content: ActivityContent<Attributes.ContentState>,
//             alertConfiguration: AlertConfiguration?) async
// func update(using state: Attributes.ContentState) async  // Convenience

guard let activity = currentActivity else { return }

let newState = TimerAttributes.ContentState(
    startDate: activity.content.state.startDate,
    totalDuration: activity.content.state.totalDuration,
    expectedEndDate: activity.content.state.expectedEndDate,
    isPaused: true,
    pausedTimeRemaining: 900,
    captureCount: activity.content.state.captureCount + 1
)

// Standard update
await activity.update(
    ActivityContent(state: newState, staleDate: Date().addingTimeInterval(3600))
)

// Update with alert notification
await activity.update(
    ActivityContent(state: newState, staleDate: nil),
    alertConfiguration: AlertConfiguration(
        title: "Timer Session",
        body: "5 minutes remaining!",
        sound: .default
    )
)

// Convenience update (just state, no staleDate control)
await activity.update(using: newState)
```

### Step 4: End a Live Activity

```swift
// Method signature:
// func end(_ content: ActivityContent<Attributes.ContentState>?,
//          dismissalPolicy: ActivityUIDismissalPolicy) async

guard let activity = currentActivity else { return }

let finalState = TimerAttributes.ContentState(
    startDate: activity.content.state.startDate,
    totalDuration: activity.content.state.totalDuration,
    expectedEndDate: activity.content.state.expectedEndDate,
    isPaused: false,
    captureCount: activity.content.state.captureCount
)

// Always provide a final state so the UI shows correct end state
await activity.end(
    ActivityContent(state: finalState, staleDate: nil),
    dismissalPolicy: .default
)

currentActivity = nil
```

### Dismissal Policies

| Policy | Behavior |
|--------|----------|
| `.default` | System decides when to remove (up to 4 hours on Lock Screen) |
| `.immediate` | Removes instantly from Lock Screen and Dynamic Island |
| `.after(Date)` | Keeps visible until specified date (max 4 hours from end) |

```swift
// Remove immediately (best for user-initiated stop)
await activity.end(content, dismissalPolicy: .immediate)

// Keep visible for 30 minutes after ending
await activity.end(content, dismissalPolicy: .after(Date().addingTimeInterval(1800)))

// Let system decide (recommended for natural completion)
await activity.end(content, dismissalPolicy: .default)
```

### Observing Activity State Changes

```swift
// Observe all activities of a type
Task {
    for await activity in Activity<TimerAttributes>.activityUpdates {
        // New activity appeared (e.g., from push-to-start)
    }
}

// Observe a specific activity's state
Task {
    for await state in activity.activityStateUpdates {
        switch state {
        case .active:  break  // Running normally
        case .stale:   break  // Data is outdated (past staleDate)
        case .ended:   break  // Activity has been ended
        case .dismissed: break // Removed from UI
        @unknown default: break
        }
    }
}

// Observe content changes
Task {
    for await content in activity.contentUpdates {
        // ContentState changed (e.g., from push notification)
    }
}

// Observe push token changes
Task {
    for await token in activity.pushTokenUpdates {
        let tokenString = token.map { String(format: "%02x", $0) }.joined()
        // Send to server for push updates
    }
}
```

### Managing Multiple Activities

```swift
// List all active activities
let activities = Activity<TimerAttributes>.activities
// Returns [Activity<TimerAttributes>]

// End all activities (cleanup)
for activity in Activity<TimerAttributes>.activities {
    await activity.end(nil, dismissalPolicy: .immediate)
}
```

---

## Update Frequency & Budget System

### Local Updates (from App)

**No hard limit for local updates** when the app is in the foreground. The system does not throttle `activity.update()` calls made from within the app process. However:

- Updates while the app is **backgrounded** are limited
- Excessive updates waste battery and CPU
- The system may coalesce rapid updates (only the latest state is rendered)

**Practical guidance for timer apps:**
- Use `Text(timerInterval:)` for per-second countdown display (FREE, no updates needed)
- Only call `activity.update()` for **state changes** (pause, resume, capture count, overtime)
- Do NOT update every second with a new `timeRemaining` value

### Push Notification Updates (from Server)

Apple uses a **dynamic budget system** for push-driven Live Activity updates:

| Setting | Behavior |
|---------|----------|
| Default (no flag) | Conservative budget; system throttles after moderate number of pushes/hour |
| `NSSupportsLiveActivitiesFrequentUpdates = YES` | Extended budget; allows more frequent pushes (e.g., sports scores) |
| User disabled frequent updates | Falls back to default budget even with the flag |

**What Apple does NOT publish:** A specific number of updates per hour. The budget is dynamic and depends on:
- Device battery level
- User engagement with the activity
- System load
- Other apps' activity update patterns

**Info.plist Configuration:**

```xml
<!-- Required: Enable Live Activities -->
<key>NSSupportsLiveActivities</key>
<true/>

<!-- Optional: Request higher update frequency budget -->
<key>NSSupportsLiveActivitiesFrequentUpdates</key>
<true/>
```

**Push Update Priorities:**

| Priority | APNs Value | Behavior |
|----------|-----------|----------|
| High | `apns-priority: 10` | Delivered immediately, counts toward budget |
| Low | `apns-priority: 5` | May be batched, lower budget impact |

**Practical advice:**
- Mix priority 5 and 10 to stay within budget
- Use `Text(timerInterval:)` for countdown display (no server updates needed)
- Reserve push updates for actual state changes
- For local-only timer apps: `pushType: nil` is sufficient (no server needed)

### iOS 18+ Refresh Rate Change

Starting with iOS 18, Live Activities refresh content **every 5-15 seconds** (down from every second in iOS 17). This affects SwiftUI view rendering but NOT `Text(timerInterval:)` countdown, which still updates every second via the system.

### Timer Display: Zero-Cost Countdown

```swift
// This updates every second automatically with NO budget cost:
Text(timerInterval: startDate...endDate, countsDown: true)

// The system handles per-second rendering — no Activity.update() needed
```

---

## Dynamic Island Layouts

### Architecture

The Dynamic Island has four presentation modes:

```
┌────────────────────────────────────────────────────────┐
│                  EXPANDED VIEW                          │
│  (User long-presses Dynamic Island)                    │
│                                                         │
│  ┌──────────┐    ┌──────────────┐    ┌──────────┐     │
│  │ Leading  │    │   Center     │    │ Trailing │     │
│  │ ~50×50pt │    │  Flexible    │    │ ~80×40pt │     │
│  └──────────┘    └──────────────┘    └──────────┘     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                   Bottom                         │   │
│  │              Full width area                     │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                   COMPACT VIEW                          │
│  (Single activity, idle state)                         │
│                                                         │
│  ┌────┐          [TrueDepth Camera]          ┌────┐   │
│  │Lead│                                      │Trail│   │
│  │~20 │                                      │~40pt│   │
│  └────┘                                      └────┘   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                   MINIMAL VIEW                          │
│  (Multiple activities — your activity is secondary)    │
│                                                         │
│                     ┌────┐                             │
│                     │~20 │ Detached circle              │
│                     └────┘                             │
└────────────────────────────────────────────────────────┘
```

### Complete ActivityConfiguration

```swift
struct TimerLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: TimerAttributes.self) { context in
            // MARK: Lock Screen / Notification Center View
            LockScreenTimerView(context: context)

        } dynamicIsland: { context in
            DynamicIsland {
                // MARK: Expanded Regions
                DynamicIslandExpandedRegion(.leading) {
                    // Icon, progress ring, or small graphic
                    // Recommended: ~50×50 pt
                    ProgressRing(progress: fraction)
                        .frame(width: 54, height: 54)
                }

                DynamicIslandExpandedRegion(.trailing) {
                    // Timer, status text, or data
                    // Recommended: ~80×40 pt
                    VStack(alignment: .trailing) {
                        Text(context.attributes.sessionLabel ?? "Focusing")
                            .font(.headline)
                        Text(timerInterval: start...end, countsDown: true)
                            .font(.system(size: 22, weight: .light, design: .monospaced))
                    }
                }

                DynamicIslandExpandedRegion(.center) {
                    // Optional: central content (often omitted for timer apps)
                    // Sits between leading and trailing, flexible width
                }

                DynamicIslandExpandedRegion(.bottom) {
                    // Full-width area below the other regions
                    // Best for: progress bars, controls, additional info
                    HStack(spacing: 16) {
                        Button(intent: PauseTimerIntent()) {
                            Image(systemName: "pause.fill")
                        }
                        Button(intent: CaptureFromWidgetIntent()) {
                            Image(systemName: "bubble.left.fill")
                        }
                        Button(intent: StopTimerIntent()) {
                            Image(systemName: "xmark")
                        }
                    }
                }

            } compactLeading: {
                // Left side of compact pill
                // Recommended: ~20×20 pt, typically an icon
                Image(systemName: "timer")
                    .foregroundStyle(.green)

            } compactTrailing: {
                // Right side of compact pill
                // Recommended: ~40×20 pt, typically short text
                Text(timerInterval: start...end, countsDown: true)
                    .font(.caption2)
                    .monospacedDigit()
                    .frame(width: 40)

            } minimal: {
                // Smallest presentation (detached circle)
                // Recommended: ~20×20 pt, single icon or tiny indicator
                Image(systemName: "timer")
                    .foregroundStyle(.green)
            }
        }
        // iOS 26: Enable CarPlay + Watch
        .supplementalActivityFamilies([.small, .medium])
    }
}
```

### Expanded Region Priority

Use `priority` to control sizing when space is limited:

```swift
DynamicIslandExpandedRegion(.leading, priority: 1) {
    // Higher priority = gets more space
    LargeLeadingView()
}

DynamicIslandExpandedRegion(.trailing) {
    // Default priority (lower)
    SmallTrailingView()
}
```

### Vertical Placement for Wide Content

```swift
DynamicIslandExpandedRegion(.leading) {
    WideContent()
}
.dynamicIsland(verticalPlacement: .belowIfTooWide)
// Moves content below the TrueDepth camera if it's too wide
```

### Keyline Tint

```swift
// Customize the compact/minimal background tint
DynamicIsland { ... }
    .keylineTint(.white)  // Default is black
```

### Recommended Dimensions

| Region | Size | Content Guidelines |
|--------|------|-------------------|
| Leading (expanded) | ~50×50 pt | Icon, progress ring, small graphic |
| Trailing (expanded) | ~80×40 pt | Timer, status text, numeric data |
| Center (expanded) | Flexible | Title, secondary info (optional) |
| Bottom (expanded) | Full width | Progress bar, controls, buttons |
| Compact Leading | ~20×20 pt | Small icon only |
| Compact Trailing | ~40×20 pt | Short text, small timer |
| Minimal | ~20×20 pt | Single icon or tiny progress arc |

---

## Timer Display Patterns

### Pattern 1: System Timer (Zero-Cost Countdown)

The **preferred** approach for timer displays. The system updates the display every second automatically without consuming any update budget:

```swift
// Countdown timer — updates every second for FREE
Text(timerInterval: startDate...endDate, countsDown: true)
    .font(.system(size: 32, weight: .ultraLight, design: .monospaced))
    .monospacedDigit()
    .contentTransition(.numericText())

// Count-up timer (for overtime)
Text(timerInterval: startDate...endDate, countsDown: false)
    .font(.system(size: 32, weight: .ultraLight, design: .monospaced))
    .monospacedDigit()
```

**Key properties:**
- `timerInterval:` takes a `ClosedRange<Date>` (start...end)
- `countsDown: true` shows decreasing time (25:00 -> 24:59 -> ...)
- `countsDown: false` shows increasing time (0:00 -> 0:01 -> ...)
- Updates are handled by the system -- does NOT count toward budget
- `.monospacedDigit()` prevents layout shifts as digits change
- `.contentTransition(.numericText())` adds smooth digit animation

### Pattern 2: Static Time Display (for Paused State)

When paused, show a frozen time value instead of a live countdown:

```swift
if context.state.isPaused {
    // Format manually — no live ticking
    let total = Int(context.state.pausedTimeRemaining ?? 0)
    let min = total / 60
    let sec = total % 60
    Text(String(format: "%d:%02d", min, sec))
        .font(.system(size: 32, weight: .ultraLight, design: .monospaced))
        .monospacedDigit()
        .foregroundStyle(.secondary)
} else {
    // Live countdown
    Text(timerInterval: startDate...endDate, countsDown: true)
        .font(.system(size: 32, weight: .ultraLight, design: .monospaced))
        .monospacedDigit()
}
```

### Pattern 3: Relative Time

```swift
// Shows "in 3 min", "in 25 min" etc.
Text(endDate, style: .relative)

// Shows "3:45 PM" (the end time)
Text(endDate, style: .time)

// Shows specific timer format
Text(endDate, style: .timer)  // "25:00"
```

### Preventing Layout Shifts

```swift
// ✅ CORRECT: Fixed width prevents jumps
Text(timerInterval: start...end, countsDown: true)
    .monospacedDigit()
    .frame(width: 60, alignment: .trailing)

// ❌ WRONG: Width changes as digits change (e.g., 10:00 -> 9:59)
Text(timerInterval: start...end, countsDown: true)
    .monospacedDigit()
    // No fixed width — causes layout shifts!
```

### Progress Calculation

```swift
// Progress fraction (0.0 to 1.0)
private func elapsedFraction(for state: ContentState) -> Double {
    guard state.totalDuration > 0 else { return 0 }
    if state.isPaused, let remaining = state.pausedTimeRemaining {
        return 1.0 - (remaining / state.totalDuration)
    }
    let elapsed = Date().timeIntervalSince(state.startDate)
    return min(max(elapsed / state.totalDuration, 0), 1)
}
```

---

## AlertConfiguration (Sound & Haptics)

Updates can optionally alert the user with sound and a banner notification:

```swift
// AlertConfiguration structure
let alertConfig = AlertConfiguration(
    title: "Session Complete!",              // Alert title
    body: "Great job on your 25-minute session.",  // Alert body
    sound: .default                          // Alert sound
)

await activity.update(
    ActivityContent(state: finalState, staleDate: nil),
    alertConfiguration: alertConfig
)
```

### AlertSound Options

```swift
// System default sound
AlertConfiguration.AlertSound.default

// Named sound file (must be in widget extension bundle)
AlertConfiguration.AlertSound.named("chime.aiff")
```

### Push Notification with Alert

```json
{
    "aps": {
        "timestamp": 1699900000,
        "event": "update",
        "content-state": { ... },
        "alert": {
            "title": "Timer Update",
            "body": "10 minutes remaining!",
            "sound": "chime.aiff"
        }
    }
}
```

**Note:** Haptic feedback is not directly configurable through AlertConfiguration. Haptics are tied to the notification alert presentation managed by the system.

---

## App Groups & Shared State

### Why App Groups Are Needed

The widget extension runs in a **separate process** from the main app. To share data:

1. **App Group entitlement** on both app and widget extension targets
2. **Shared UserDefaults** via `UserDefaults(suiteName: "group.com....")`
3. **Shared file container** via `FileManager.containerURL(forSecurityApplicationGroupIdentifier:)`

### Setup in project.yml (XcodeGen)

```yaml
targets:
  MyApp-iOS:
    entitlements:
      path: MyApp-iOS/Supporting/Entitlements.plist
      properties:
        com.apple.security.application-groups:
          - group.com.myapp.shared

  MyApp-Widgets:
    entitlements:
      path: MyApp-Widgets/Resources/Entitlements.plist
      properties:
        com.apple.security.application-groups:
          - group.com.myapp.shared
```

### Shared UserDefaults Pattern (SharedStateStore)

Use a shared state store that writes timer state to the App Group's UserDefaults, accessible by both the app and the widget extension:

```swift
// Main app writes:
SharedStateStore.isRunning = true
SharedStateStore.startDate = Date()
SharedStateStore.totalDuration = 1500
SharedStateStore.isPaused = false
SharedStateStore.captureCount = 3

// Widget extension reads (via App Group UserDefaults):
let isRunning = SharedStateStore.isRunning
let startDate = SharedStateStore.startDate
```

### Triggering Widget Refresh

```swift
import WidgetKit

// Reload specific widget
WidgetCenter.shared.reloadTimelines(ofKind: "TimerWidget")

// Reload all widgets
WidgetCenter.shared.reloadAllTimelines()
```

**Note:** Widget timeline reloads are budgeted by the system. Don't call on every timer tick. Only call when meaningful state changes occur (session start, pause, resume, end).

---

## SwiftData Access from Widgets

### The Rule: Widget Extensions CANNOT Use SwiftData Directly

Widget extensions run in a separate process with strict memory limits (~16-24 MB). Attempting to create a `ModelContainer` or use `@Query` in a widget **will crash**.

```swift
// ❌ CRASH: Never do this in a widget extension
import SwiftData
@Query var sessions: [Session]  // CRASH!
let container = try ModelContainer(for: Session.self)  // CRASH!
```

### The Solution: Export Data via App Groups

```
Main App (SwiftData) ──serialize──► App Group (JSON) ──read──► Widget Extension
```

1. Main app reads from SwiftData
2. Converts to lightweight DTOs (Data Transfer Objects)
3. Writes JSON to App Group shared container
4. Widget extension reads the JSON file
5. Widget uses DTO data for display

### Live Activity Exception

Live Activities **can** use SwiftData in the main app to populate ActivityAttributes because the `Activity.request()` and `Activity.update()` calls happen in the main app process. The widget extension only receives the already-serialized `ContentState`.

```swift
// Main app — OK to read SwiftData here
let session = try modelContext.fetch(...)
let attributes = TimerAttributes(sessionLabel: session.task?.name)
try Activity.request(attributes: attributes, content: content)

// Widget extension — Only uses ContentState (already Codable)
// No SwiftData needed!
```

### Alternative: Shared ModelContainer with App Groups

There is a **theoretical** path using a shared `ModelContainer` pointed at the App Group container URL. However, this approach is fragile and not recommended:

```swift
// Fragile — use with caution
let url = FileManager.default
    .containerURL(forSecurityApplicationGroupIdentifier: "group.com.myapp.shared")?
    .appendingPathComponent("default.store")

let config = ModelConfiguration(url: url!)
let container = try ModelContainer(for: Session.self, configurations: config)
```

**Issues with shared ModelContainer:**
- SwiftData automatically migrates data to the App Group container, but cross-process writes can conflict
- Widget memory limits may not accommodate the full model graph
- Swift 6 `Sendable` checking fails for cross-process model access

**Recommendation:** Use JSON DTOs via App Groups for widget data. Only use SwiftData directly in the main app.

---

## Concurrency & Actor Isolation

### Widget Extension Threading

With Swift 6.2 and `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`:

- **All code defaults to `@MainActor`** unless explicitly marked `nonisolated` or `@concurrent`
- Widget views (`View` protocol) are `@MainActor`-isolated
- Timeline providers run on the system's timeline refresh queue (not necessarily MainActor)
- `ActivityConfiguration` view builders run on MainActor

### BaseLiveActivityService Pattern

```swift
// Generic base class for Live Activity lifecycle — @MainActor
@MainActor
@Observable
open class BaseLiveActivityService<Attributes: ActivityAttributes> {
    public var currentActivity: Activity<Attributes>?

    // Activity.request() — synchronous, throws
    open func startActivity(state: LiveActivityState<Attributes>) async throws {
        currentActivity = try Activity.request(
            attributes: state.attributes,
            content: .init(state: state.contentState, staleDate: state.staleDate),
            pushType: nil
        )
    }

    // Activity.update() — async, no throws
    open func updateActivity(state: LiveActivityState<Attributes>) async {
        guard let activity = currentActivity else { return }
        // nonisolated(unsafe) needed because ActivityContent init
        // is not annotated as Sendable in ActivityKit headers
        nonisolated(unsafe) let content = ActivityContent(
            state: state.contentState,
            staleDate: state.staleDate
        )
        await activity.update(content)
    }

    // Activity.end() — async, no throws
    open func endActivity(dismissalPolicy: ActivityUIDismissalPolicy = .immediate) async {
        guard let activity = currentActivity else { return }
        currentActivity = nil
        await activity.end(
            .init(state: activity.content.state, staleDate: nil),
            dismissalPolicy: dismissalPolicy
        )
    }
}
```

### @preconcurrency import ActivityKit

ActivityKit's headers are not fully annotated for Sendable. Use `@preconcurrency import` to suppress warnings:

```swift
@preconcurrency import ActivityKit
```

### nonisolated(unsafe) for ActivityContent

`ActivityContent` initializer may trigger Sendable warnings in strict concurrency mode:

```swift
// Workaround for Swift 6 strict concurrency
nonisolated(unsafe) let content = ActivityContent(
    state: state.contentState,
    staleDate: state.staleDate
)
await activity.update(content)
```

### ContentState Must Be Sendable

Since `ContentState` crosses process boundaries (app -> widget extension), it must be `Sendable`:

```swift
public struct ContentState: Codable, Hashable, Sendable {
    // All properties must themselves be Sendable
    public var startDate: Date           // ✅ Sendable
    public var totalDuration: TimeInterval  // ✅ Sendable
    public var isPaused: Bool            // ✅ Sendable
    public var captureCount: Int         // ✅ Sendable
}
```

---

## Push Notification Updates

### APNs Request Format

```http
POST /3/device/<push-token> HTTP/2
Host: api.push.apple.com
apns-topic: com.myapp.push-type.liveactivity
apns-push-type: liveactivity
apns-expiration: 0
apns-priority: 10

{
    "aps": {
        "timestamp": 1699900000,
        "event": "update",
        "content-state": {
            "startDate": 1699899000,
            "totalDuration": 1500,
            "expectedEndDate": 1699900500,
            "isPaused": false,
            "captureCount": 3,
            "isOvertime": false
        },
        "relevance-score": 75,
        "stale-date": 1699903600,
        "alert": {
            "title": "Timer Update",
            "body": "5 minutes remaining!"
        }
    }
}
```

### Push Event Types

| Event | Description |
|-------|-------------|
| `"start"` | Start a new Live Activity (push-to-start, iOS 17.2+) |
| `"update"` | Update an existing activity's ContentState |
| `"end"` | End the activity |

### Push Token Management

```swift
func observePushTokens() {
    guard let activity = currentActivity else { return }

    Task {
        for await token in activity.pushTokenUpdates {
            let tokenString = token.map { String(format: "%02x", $0) }.joined()
            await sendTokenToServer(tokenString, activityId: activity.id)
        }
    }
}
```

### Push-to-Start (iOS 17.2+)

```swift
// Register for push-to-start tokens
Task {
    for await data in Activity<TimerAttributes>.pushToStartTokenUpdates {
        await sendPushToStartToken(data.token)
    }
}
```

### Local-Only Timer Apps

For timer apps that manage state locally, use `pushType: nil` — all updates are local. No server infrastructure needed. The `Text(timerInterval:)` pattern handles per-second countdown display without any updates.

---

## iOS 26 New Features

### 1. CarPlay Support

Live Activities appear on CarPlay displays (including CarPlay Ultra):

```swift
ActivityConfiguration(for: TimerAttributes.self) { context in
    LockScreenTimerView(context: context)
} dynamicIsland: { context in
    DynamicIsland { ... }
}
// Enable CarPlay presentation
.supplementalActivityFamilies([.small])
```

Detect the activity family to adapt layout:

```swift
@Environment(\.activityFamily) var activityFamily

var body: some View {
    switch activityFamily {
    case .small:
        CarPlayCompactView(context: context)
    default:
        FullLockScreenView(context: context)
    }
}
```

### 2. macOS Tahoe Support

Live Activities from paired iPhone appear in the macOS menu bar automatically:
- Shows compact leading/trailing views
- Lock screen presentation appears when clicked
- Clicking launches the app via iPhone Mirroring
- **No code changes needed** — uses existing ActivityConfiguration
- Requires iOS 18+ on the paired iPhone

### 3. Scheduled Live Activities

Start activities at a future time:

```swift
let activity = try Activity.request(
    attributes: attributes,
    content: content,
    startDate: futureDate,  // iOS 26: Schedule for later
    pushType: .token
)
```

### 4. Widget Push Notifications (Server-Driven Widget Refresh)

New in iOS 26 — server can trigger widget timeline reloads:

```swift
struct MyWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "MyWidget", provider: Provider()) { entry in
            WidgetView(entry: entry)
        }
        .pushHandler(MyPushHandler.self)  // NEW in iOS 26
    }
}

struct MyPushHandler: WidgetPushHandler {
    func pushTokenDidChange(_ pushInfo: WidgetPushInfo, widgets: [WidgetInfo]) {
        // Send token to server
    }
}
```

### 5. Accented Rendering / Liquid Glass

Widgets adapt to Home Screen glass/tinted themes:

```swift
@Environment(\.widgetRenderingMode) var renderingMode

Image("icon")
    .widgetAccentedRenderingMode(.desaturated)    // Grayscale
    .widgetAccentedRenderingMode(.accented)        // Accent color
    .widgetAccentedRenderingMode(.fullColor)       // Original (for media)

Text("Focus")
    .widgetAccentable()  // Mark for system accent coloring
```

### 6. watchOS Relevance Widgets

Context-aware widgets that only appear when relevant:

```swift
struct RelevanceWidget: Widget {
    var body: some WidgetConfiguration {
        RelevanceConfiguration(kind: "TimerRelevance", provider: Provider()) { entry in
            RelevanceView(entry: entry)
        }
    }
}
```

### 7. visionOS Widget Support

```swift
.supportedMountingStyles([.elevated, .recessed])
.widgetTexture(.paper)  // or .glass (default)

@Environment(\.levelOfDetail) var levelOfDetail
// .default or .simplified (for distant viewing)
```

---

## Error Handling & Limits

### System Limits

| Limit | Value | Notes |
|-------|-------|-------|
| **Max concurrent activities per app** | 5 | System may end older ones if exceeded |
| **Max active duration** | 8 hours | Dynamic Island + Lock Screen |
| **Extended Lock Screen duration** | +4 hours | Lock Screen only (12 hours total) |
| **ContentState payload size** | ~4 KB | Keep ContentState small |
| **Widget extension memory** | ~16-24 MB | Varies by family |
| **Push-to-start cooldown** | ~5 rapid starts | Brief cooldown after consecutive starts |

### Error Types

```swift
do {
    let activity = try Activity.request(attributes: attrs, content: content)
} catch {
    if let activityError = error as? ActivityAuthorizationError {
        switch activityError {
        case .denied:
            // User disabled Live Activities in Settings
            break
        case .unsupported:
            // Device doesn't support Live Activities
            break
        default:
            break
        }
    }
}
```

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|---------|
| Activity not appearing | Missing entitlement | Add "Live Activities" to Info.plist |
| Activity not appearing | Wrong target | ActivityConfiguration must be in widget extension |
| Activity not appearing | Authorization denied | Check `ActivityAuthorizationInfo().areActivitiesEnabled` |
| Activity not appearing | Invalid ContentState | Verify all properties are Codable |
| Update not received (push) | Wrong push token | Observe `pushTokenUpdates` for changes |
| Update not received (push) | Invalid JSON payload | Verify `content-state` matches ContentState struct |
| Update not received (push) | Stale timestamp | `aps.timestamp` must be current epoch time |
| Update not received (push) | Activity ended | Check `activityState` before sending |
| `ssu-cli-app crashed` | suggestedInvocationPhrase on non-shortcut intent | Remove property from LiveActivityIntent |
| Widget render timeout | Complex SwiftUI hierarchy | Simplify views, reduce sub-views |
| `EXC_RESOURCE` | Widget exceeded memory | Reduce image sizes, use SF Symbols |

### Checking Activity State Before Operations

```swift
// Always verify state before updating
guard let activity = currentActivity,
      activity.activityState == .active else {
    return
}

// For cleanup on app launch
func cleanupEndedActivities() async {
    for activity in Activity<TimerAttributes>.activities {
        if activity.activityState == .ended || activity.activityState == .dismissed {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
    }
}
```

---

## Widget Push Notifications (iOS 26)

### New Capability: Server-Driven Widget Refresh

iOS 26 introduces a new way to refresh widgets via push notifications (separate from Live Activity push updates):

```swift
// 1. Create a WidgetPushHandler
struct MyAppPushHandler: WidgetPushHandler {
    func pushTokenDidChange(_ pushInfo: WidgetPushInfo, widgets: [WidgetInfo]) {
        // Send push token and widget subscription info to your server
    }
}

// 2. Attach to widget configuration
struct MyAppWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "mywidget", provider: Provider()) { entry in
            WidgetView(entry: entry)
        }
        .pushHandler(MyAppPushHandler.self)
    }
}
```

### Sending Widget Push

```http
POST /3/device/<push-token> HTTP/2
Host: api.push.apple.com
apns-push-type: widgets
apns-topic: com.myapp.push-type.widgets

{
    "aps": {
        "content-changed": true
    }
}
```

### Three Widget Refresh Strategies

| Strategy | When to Use | Budgeted? |
|----------|------------|-----------|
| `TimelineReloadPolicy` | Regular intervals (every 15 min, hourly) | Yes |
| `WidgetCenter.reloadTimelines()` | App-driven state changes | Yes |
| Widget Push Notifications | Server/external changes | Yes |

### Development Mode

During development, bypass refresh budgets:

```
Settings > Developer > WidgetKit Developer Mode > ON
```

Or via launch arguments:

```
-widgetKitDevMode YES
```

---

## Previewing & Testing

### Widget Previews

```swift
// Lock Screen / Notification Center
#Preview("Lock Screen — Active", as: .content, using: TimerAttributes(sessionLabel: "Deep Work")) {
    TimerLiveActivity()
} contentStates: {
    TimerAttributes.ContentState(
        startDate: Date().addingTimeInterval(-568),
        totalDuration: 1500,
        expectedEndDate: Date().addingTimeInterval(-568 + 1500),
        isPaused: false,
        captureCount: 3
    )
}

// Dynamic Island — Expanded
#Preview("DI Expanded", as: .dynamicIsland(.expanded), using: TimerAttributes()) {
    TimerLiveActivity()
} contentStates: {
    TimerAttributes.ContentState(startDate: Date(), totalDuration: 1500, isPaused: false)
}

// Dynamic Island — Compact
#Preview("DI Compact", as: .dynamicIsland(.compact), using: TimerAttributes()) {
    TimerLiveActivity()
} contentStates: {
    TimerAttributes.ContentState(startDate: Date(), totalDuration: 1500, isPaused: false)
}

// Dynamic Island — Minimal
#Preview("DI Minimal", as: .dynamicIsland(.minimal), using: TimerAttributes()) {
    TimerLiveActivity()
} contentStates: {
    TimerAttributes.ContentState(startDate: Date(), totalDuration: 1500, isPaused: false)
}
```

### Testing Live Activity Service

```swift
import XCTest
@testable import MyApp

final class LiveActivityServiceTests: XCTestCase {
    @MainActor
    func testStartAndEndActivity() async throws {
        let service = LiveActivityService.shared

        // Start
        service.startActivity(
            totalDuration: 1500,
            startDate: Date(),
            label: "Test Session"
        )

        // Verify activity exists
        // Note: Actual verification depends on ActivityKit availability in test env

        // End
        service.endActivity()
    }
}
```

---

## Best Practices for Timer Apps

### 1. Use Text(timerInterval:) for Countdown Display

```swift
// ✅ FREE per-second updates — no budget cost
Text(timerInterval: startDate...endDate, countsDown: true)
    .monospacedDigit()

// ❌ WASTEFUL: Updating ContentState every second
Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { _ in
    activity.update(...)  // DON'T DO THIS
}
```

### 2. Only Update for State Changes

Call `activity.update()` only for meaningful changes:
- Session started
- Session paused / resumed
- Action performed (count changed)
- Entered overtime
- Session ending soon (alert)

### 3. Handle Paused State with Frozen Display

```swift
if context.state.isPaused {
    // Show static formatted time
    Text(formattedTimeRemaining)
} else {
    // Show live ticking countdown
    Text(timerInterval: start...end, countsDown: true)
}
```

### 4. Reclaim Orphaned Activities on Launch

If the app is terminated while a Live Activity is running:

```swift
override func reclaimOrphanedActivities() async {
    for activity in Activity<TimerAttributes>.activities {
        if activity.activityState == .active,
           SharedStateStore.isRunning {
            // Timer still valid — reclaim
            self.currentActivity = activity
            await activity.update(currentState)
        } else {
            // Stale — end it
            await activity.end(nil, dismissalPolicy: .immediate)
        }
    }
}
```

### 5. Fixed Width for Timer Text

```swift
// Prevents layout jitter when digits change
Text(timerInterval: start...end, countsDown: true)
    .monospacedDigit()
    .frame(width: 60, alignment: .trailing)
```

### 6. End with Final State

Always provide a final ContentState when ending:

```swift
// ✅ CORRECT: Shows final state to user
await activity.end(
    ActivityContent(state: finalState, staleDate: nil),
    dismissalPolicy: .default
)

// ❌ WRONG: Nil content shows stale data
await activity.end(nil, dismissalPolicy: .default)
```

### 7. Interactive Buttons via LiveActivityIntent

```swift
struct PauseTimerIntent: LiveActivityIntent {
    static var title: LocalizedStringResource = "Pause Timer"

    func perform() async throws -> some IntentResult {
        await TimerManager.shared.pause()
        return .result()
    }
}

// Usage in widget view:
Button(intent: PauseTimerIntent()) {
    Image(systemName: "pause.fill")
}
```

### 8. Accessibility

```swift
Button(intent: PauseTimerIntent()) {
    Image(systemName: "pause.fill")
}
.accessibilityLabel("Pause timer")

Button(intent: CaptureFromWidgetIntent()) {
    Image(systemName: "bubble.left.fill")
}
.accessibilityLabel(
    context.state.captureCount > 0
        ? "\(context.state.captureCount) items captured. Capture another."
        : "Capture an item"
)
```

---

## Example Codebase Patterns

### Recommended File Locations

| File | Purpose |
|------|---------|
| `packages/SharedKit/.../BaseLiveActivityService.swift` | Generic base class for Live Activity lifecycle |
| `packages/SharedKit/.../TimerAttributes.swift` | App-specific ActivityAttributes |
| `apps/myapp/MyApp-iOS/Services/LiveActivityService.swift` | App's concrete Live Activity service |
| `apps/myapp/MyApp-Widgets/TimerLiveActivity.swift` | Widget extension: Lock Screen + Dynamic Island views |

### Architecture Pattern

```
SharedKit (Package)
  └─ BaseLiveActivityService<T>      Generic lifecycle management
      ├─ startActivity(state:)        Request new activity
      ├─ updateActivity(state:)       Update content state
      ├─ endActivity(dismissalPolicy:) End single activity
      └─ endAllActivities()           Cleanup all

SharedKit (Package)
  └─ TimerAttributes                 ActivityAttributes + ContentState

MyApp-iOS (App Target)
  └─ LiveActivityService             Extends BaseLiveActivityService<TimerAttributes>
      ├─ startActivity(totalDuration:startDate:label:)
      ├─ updatePaused(timeRemaining:)
      ├─ updateResumed(startDate:totalDuration:)
      ├─ updateActionCount(_:)
      ├─ updateOvertime()
      └─ endActivity()

MyApp-Widgets (Extension Target)
  └─ TimerLiveActivity               Widget with ActivityConfiguration
      ├─ LockScreenTimerView          Lock Screen banner
      ├─ ExpandedLeading              DI expanded: progress ring
      ├─ ExpandedTrailing             DI expanded: timer + label
      ├─ ExpandedBottom               DI expanded: control buttons
      ├─ CompactProgressRing          DI compact: leading
      ├─ CompactCountdown             DI compact: trailing
      └─ MinimalProgressArc           DI minimal: progress arc
```

### Key Design Decisions

1. **`pushType: nil`** — No server push updates. Timer state is managed locally.
2. **`Text(timerInterval:)`** — Used for zero-cost per-second countdown display.
3. **`SharedStateStore` (App Group UserDefaults)** — Shared state between app and widget for orphan recovery.
4. **`nonisolated(unsafe)`** — Used for `ActivityContent` creation to work around ActivityKit's incomplete Sendable annotations.
5. **`@preconcurrency import ActivityKit`** — Suppresses strict concurrency warnings from ActivityKit's non-annotated headers.
6. **Orphan recovery on launch** — `reclaimOrphanedActivities()` restores Live Activity reference if app was terminated.
7. **`.supplementalActivityFamilies([.small, .medium])`** — Enables CarPlay and Watch presentation.

---

## Sources

- [ActivityKit Documentation](https://developer.apple.com/documentation/activitykit)
- [Activity Class](https://developer.apple.com/documentation/activitykit/activity)
- [ActivityAttributes Protocol](https://developer.apple.com/documentation/activitykit/activityattributes)
- [WidgetKit Documentation](https://developer.apple.com/documentation/widgetkit)
- [Live Activities HIG](https://developer.apple.com/design/human-interface-guidelines/live-activities)
- [Displaying Live Data with Live Activities](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)
- [Starting and Updating with Push Notifications](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications)
- [NSSupportsLiveActivitiesFrequentUpdates](https://developer.apple.com/documentation/bundleresources/information-property-list/nssupportsliveactivitiesfrequentupdates)
- [DynamicIslandExpandedRegionPosition](https://developer.apple.com/documentation/WidgetKit/DynamicIslandExpandedRegionPosition)
- [AlertConfiguration](https://developer.apple.com/documentation/activitykit/alertconfiguration)
- [What's New in Widgets — WWDC25](https://developer.apple.com/videos/play/wwdc2025/278/)
- [Design Dynamic Live Activities — WWDC23](https://developer.apple.com/videos/play/wwdc2023/10194/)
- [Meet ActivityKit — WWDC23](https://developer.apple.com/videos/play/wwdc2023/10184/)
- [10 Questions with the Live Activities Team](https://developer.apple.com/news/?id=qpqf1gru)
- [Implementing Live Activities in a SwiftUI App](https://www.createwithswift.com/implementing-live-activities-in-a-swiftui-app/)
- [Mastering Dynamic Island in SwiftUI](https://swiftwithmajid.com/2022/09/28/mastering-dynamic-island-in-swiftui/)
- [Live Activities: From Architecture to Business Impact](https://dev.to/arshtechpro/mastering-live-activities-in-ios-from-architecture-to-business-impact-2c4h)
- [iOS 18 Live Activities Best Practices](https://www.pushwoosh.com/blog/ios-live-activities/)
- [How to Access SwiftData from Widgets](https://www.hackingwithswift.com/quick-start/swiftdata/how-to-access-a-swiftdata-container-from-widgets)
- [Apple Developer Forums: Rate Limits](https://developer.apple.com/forums/thread/747624)
- [Add Live Activities in 5 Steps](https://apnspush.com/how-to-add-live-activities)
