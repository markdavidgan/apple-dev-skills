# Apple Documentation Guides — Reference

> Compiled from official Apple documentation and tutorials.
> Loaded for deep reference when essentials files aren't sufficient.

---

## Table of Contents

1. [Launching Your App from a Live Activity](#1-launching-your-app-from-a-live-activity)
2. [Observing Playback State in SwiftUI](#2-observing-playback-state-in-swiftui)
3. [Adopting Inheritance in SwiftData](#3-adopting-inheritance-in-swiftdata)
4. [Recording UI Automation for Testing (XCUIAutomation)](#4-recording-ui-automation-for-testing-xcuiautomation)
5. [Liquid Glass -- Technology Overview](#5-liquid-glass----technology-overview)
6. [Adopting Liquid Glass -- Implementation](#6-adopting-liquid-glass----implementation)
7. [Landmarks -- Building an App with Liquid Glass](#7-landmarks----building-an-app-with-liquid-glass)

---

## 1. Launching Your App from a Live Activity

**Apple Doc:** https://developer.apple.com/documentation/ActivityKit/launching-your-app-from-a-live-activity

### Overview

Live Activities display your app's most current data on the Lock Screen and Dynamic Island. When a user taps on a Live Activity, the system launches your app. You control _where_ in your app the user lands by attaching deep link URLs to the Live Activity's views using `widgetURL(_:)` and `Link`.

### Key Concepts

Live Activities have multiple presentation modes, each with different deep link capabilities:

| Presentation | Description | Deep Link Support |
|---|---|---|
| **Lock Screen** | Banner on the Lock Screen | `widgetURL` (entire view is one tap target) |
| **Compact Leading** | Left side of Dynamic Island | `widgetURL` only |
| **Compact Trailing** | Right side of Dynamic Island | `widgetURL` only |
| **Minimal** | Single pill in Dynamic Island | `widgetURL` only |
| **Expanded** | Full Dynamic Island (long-press) | `widgetURL` + `Link` for sub-regions |

### Adding Tap Targets

#### widgetURL -- Default Tap Target

The `widgetURL(_:)` modifier sets the URL that opens your app when the user taps _anywhere_ on the Live Activity. This is the primary mechanism for the Lock Screen presentation and the compact/minimal Dynamic Island presentations.

```swift
// In your Live Activity widget view
struct PizzaDeliveryLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: PizzaDeliveryAttributes.self) { context in
            // Lock Screen presentation
            VStack {
                Text("Your pizza is on the way!")
                Text(context.state.deliveryStatus)
            }
            .padding()
            .widgetURL(URL(string: "mypizza:///delivery/\(context.activityID)"))
            
        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded regions (see below for Link usage)
                DynamicIslandExpandedRegion(.leading) {
                    Label(context.state.driverName, systemImage: "person")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Label("\(context.state.eta) min", systemImage: "clock")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Order #\(context.attributes.orderNumber)")
                }
            } compactLeading: {
                Image(systemName: "box.truck")
            } compactTrailing: {
                Text("\(context.state.eta)m")
            } minimal: {
                Image(systemName: "box.truck")
            }
            // This widgetURL applies to compact and minimal presentations
            .widgetURL(URL(string: "mypizza:///delivery/\(context.activityID)"))
        }
    }
}
```

**Critical rules for `widgetURL`:**
- Only **one** `widgetURL` per presentation is honored. If you attach multiple, only the outermost one takes effect.
- For the Lock Screen view, the entire view area acts as a single tap target.
- For compact and minimal presentations, the entire area is a single tap target -- you cannot subdivide.

#### Link -- Region-Specific Tap Targets (Expanded Only)

In the **expanded** Dynamic Island presentation, you can use SwiftUI `Link` to create multiple distinct tap targets that open different URLs:

```swift
DynamicIsland {
    DynamicIslandExpandedRegion(.leading) {
        // Tapping the driver name opens the driver profile
        Link(destination: URL(string: "mypizza:///driver/\(context.state.driverID)")!) {
            Label(context.state.driverName, systemImage: "person")
        }
    }
    DynamicIslandExpandedRegion(.trailing) {
        // Tapping the ETA opens the map
        Link(destination: URL(string: "mypizza:///map/\(context.activityID)")!) {
            Label("\(context.state.eta) min", systemImage: "map")
        }
    }
    DynamicIslandExpandedRegion(.bottom) {
        // Tapping order details opens order history
        Link(destination: URL(string: "mypizza:///order/\(context.attributes.orderNumber)")!) {
            Text("Order #\(context.attributes.orderNumber)")
        }
    }
} compactLeading: {
    Image(systemName: "box.truck")
} compactTrailing: {
    Text("\(context.state.eta)m")
} minimal: {
    Image(systemName: "box.truck")
}
.widgetURL(URL(string: "mypizza:///delivery/\(context.activityID)"))
```

**Behavior with `Link` and `widgetURL` together:**
- If a `Link` is present in the expanded view, tapping that region uses the `Link`'s URL.
- Areas not covered by a `Link` fall back to the `widgetURL`.
- `Link` only works in the expanded Dynamic Island presentation -- not in compact, minimal, or Lock Screen.

### Handling the URL in Your App

When the system launches your app from a Live Activity tap, it delivers the URL. Handle it with `onOpenURL`:

```swift
@main
struct PizzaDeliveryApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onOpenURL { url in
                    handleDeepLink(url)
                }
        }
    }
    
    private func handleDeepLink(_ url: URL) {
        // Parse the URL to determine which screen to show
        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: false) else {
            return
        }
        
        let pathComponents = components.path.split(separator: "/")
        
        switch pathComponents.first {
        case "delivery":
            // Extract activity ID from path
            if let activityID = pathComponents.last.map(String.init) {
                navigateToDeliveryTracking(activityID: activityID)
            }
        case "driver":
            if let driverID = pathComponents.last.map(String.init) {
                navigateToDriverProfile(driverID: driverID)
            }
        case "map":
            if let activityID = pathComponents.last.map(String.init) {
                navigateToMap(activityID: activityID)
            }
        case "order":
            if let orderNumber = pathComponents.last.map(String.init) {
                navigateToOrderHistory(orderNumber: orderNumber)
            }
        default:
            break
        }
    }
}
```

#### Using Navigation State

A common pattern is to use an `@Observable` navigation model that `onOpenURL` updates:

```swift
@Observable
final class NavigationModel {
    var selectedTab: Tab = .home
    var deliveryPath: [DeliveryRoute] = []
    
    enum Tab { case home, orders, profile }
    enum DeliveryRoute: Hashable {
        case tracking(activityID: String)
        case driverProfile(driverID: String)
        case map(activityID: String)
    }
    
    func handleURL(_ url: URL) {
        guard url.scheme == "mypizza" else { return }
        let path = url.pathComponents.filter { $0 != "/" }
        
        switch path.first {
        case "delivery":
            selectedTab = .orders
            if let id = path.dropFirst().first {
                deliveryPath = [.tracking(activityID: id)]
            }
        case "driver":
            if let id = path.dropFirst().first {
                deliveryPath.append(.driverProfile(driverID: id))
            }
        case "map":
            if let id = path.dropFirst().first {
                deliveryPath = [.map(activityID: id)]
            }
        default:
            break
        }
    }
}
```

### URL Scheme Configuration

Register your custom URL scheme in your app's `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>mypizza</string>
        </array>
        <key>CFBundleURLName</key>
        <string>com.example.mypizza</string>
    </dict>
</array>
```

Or configure in Xcode: Target > Info > URL Types.

### Embedding the Activity ID in URLs

A best practice is embedding the `context.activityID` in your deep link URL so the app knows which specific Live Activity the user tapped:

```swift
.widgetURL(URL(string: "myapp:///activity/\(context.activityID)"))
```

Then in the app, extract it:

```swift
.onOpenURL { url in
    let activityID = url.lastPathComponent
    // Use activityID to look up the corresponding Activity<T>
}
```

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Multiple `widgetURL` modifiers | Only one per presentation; use `Link` for sub-targets |
| `Link` in compact/minimal | Does not work -- only `widgetURL` is supported |
| URL not received | Ensure URL scheme is registered in Info.plist |
| App not navigating | Verify `onOpenURL` is on a view in the active `WindowGroup` |
| Stale activity ID | Activities can end; guard against missing activities |

### References

- https://developer.apple.com/documentation/ActivityKit/launching-your-app-from-a-live-activity
- https://developer.apple.com/documentation/widgetkit/linking-to-specific-app-scenes-from-your-widget-or-live-activity
- https://developer.apple.com/documentation/widgetkit/dynamicisland/widgeturl(_:)
- https://developer.apple.com/videos/play/wwdc2023/10184/ (Meet ActivityKit -- WWDC23)
- https://sparrowcode.io/en/tutorials/live-activities
- https://www.avanderlee.com/swiftui/deeplink-url-handling/

---

## 2. Observing Playback State in SwiftUI

**Apple Doc:** https://developer.apple.com/documentation/AVFoundation/observing-playback-state-in-swiftui

### Overview

iOS 26 brings a major improvement to AVFoundation: `AVPlayer`, `AVQueuePlayer`, `AVPlayerItem`, and `AVPlayerItemTrack` now conform to the Swift Observation framework (`@Observable`). This means you can observe player state changes directly in SwiftUI views without KVO or Combine.

### Enabling Observation (CRITICAL STEP)

You **must** opt in to observation by setting `AVPlayer.isObservationEnabled = true` **before** creating any playback objects. This is a global, one-time setting.

```swift
@main
struct MyApp: App {
    init() {
        // MUST be set before creating any AVPlayer instances
        AVPlayer.isObservationEnabled = true
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

**Warning:** Setting `isObservationEnabled` _after_ initializing an `AVPlayer`, `AVQueuePlayer`, `AVPlayerItem`, or `AVPlayerItemTrack` will throw an exception.

### AVPlayer.TimeControlStatus Enum

The `timeControlStatus` property indicates whether playback is in progress:

```swift
enum AVPlayer.TimeControlStatus: Int, @unchecked Sendable {
    case paused = 0
    // Playback is paused. The rate is 0.0.
    
    case waitingToPlayAtSpecifiedRate = 1
    // Playback has been requested but the player is waiting
    // (e.g., buffering, waiting for network conditions).
    // Check waitingReason for why.
    
    case playing = 2
    // Playback is currently in progress.
}
```

### WaitingReason Constants

When `timeControlStatus == .waitingToPlayAtSpecifiedRate`, check the `reasonForWaitingToPlay` property:

| Constant | Meaning |
|---|---|
| `.toMinimizeStalls` | Player is buffering to prevent stalls |
| `.evaluatingBufferingRate` | Player is evaluating whether buffering rate is sufficient |
| `.noItemToPlay` | No current player item is set |
| `.interstitialEvent` | Waiting for an interstitial event to complete |
| `.waitingForCoordinatedPlayback` | Waiting for coordinated playback group |

### Observing State in SwiftUI Views (iOS 26+)

With observation enabled, properties update SwiftUI views automatically:

```swift
import AVFoundation
import SwiftUI

struct PlayerStatusView: View {
    let player: AVPlayer
    
    var body: some View {
        VStack(spacing: 16) {
            // These properties are now @Observable --
            // the view re-renders when they change
            Text("Status: \(player.timeControlStatus.displayString)")
            Text("Rate: \(String(format: "%.2f", player.rate))")
            Text("Volume: \(String(format: "%.0f%%", player.volume * 100))")
            
            if let currentItem = player.currentItem {
                Text("Duration: \(currentItem.duration.seconds)s")
                Text("Item Status: \(currentItem.status.displayString)")
            }
            
            // Playback controls
            HStack(spacing: 20) {
                Button("Play") { player.play() }
                Button("Pause") { player.pause() }
            }
        }
    }
}

extension AVPlayer.TimeControlStatus {
    var displayString: String {
        switch self {
        case .paused: return "Paused"
        case .playing: return "Playing"
        case .waitingToPlayAtSpecifiedRate: return "Waiting..."
        @unknown default: return "Unknown"
        }
    }
}

extension AVPlayerItem.Status {
    var displayString: String {
        switch self {
        case .unknown: return "Unknown"
        case .readyToPlay: return "Ready"
        case .failed: return "Failed"
        @unknown default: return "Unknown"
        }
    }
}
```

### Observable Properties on AVPlayer

With `isObservationEnabled = true`, the following properties trigger SwiftUI view updates:

| Property | Type | Description |
|---|---|---|
| `timeControlStatus` | `TimeControlStatus` | Playing, paused, or waiting |
| `reasonForWaitingToPlay` | `WaitingReason?` | Why the player is waiting |
| `rate` | `Float` | Current playback rate (0.0 = paused) |
| `volume` | `Float` | Output volume (0.0 to 1.0) |
| `isMuted` | `Bool` | Whether audio output is muted |
| `currentItem` | `AVPlayerItem?` | The currently playing item |
| `status` | `AVPlayer.Status` | Overall player status |
| `error` | `Error?` | The error that caused a failure |

### Observable Properties on AVPlayerItem

| Property | Type | Description |
|---|---|---|
| `status` | `AVPlayerItem.Status` | unknown / readyToPlay / failed |
| `duration` | `CMTime` | Total duration of the item |
| `isPlaybackLikelyToKeepUp` | `Bool` | Enough data buffered for smooth playback |
| `isPlaybackBufferEmpty` | `Bool` | Buffer is currently empty |
| `isPlaybackBufferFull` | `Bool` | Buffer is full |
| `error` | `Error?` | Error if status is .failed |

### Periodic Time Observation (Still Required)

Observation is for **state** properties only. For continuous time tracking (e.g., updating a progress slider), you still need `addPeriodicTimeObserver`:

```swift
struct PlayerProgressView: View {
    let player: AVPlayer
    @State private var currentTime: Double = 0
    @State private var timeObserver: Any?
    
    var body: some View {
        VStack {
            // Progress bar
            ProgressView(value: currentTime, total: player.currentItem?.duration.seconds ?? 1)
            
            Text("\(formatTime(currentTime)) / \(formatTime(player.currentItem?.duration.seconds ?? 0))")
                .font(.caption)
                .monospacedDigit()
        }
        .onAppear {
            // Add periodic observer for continuous time updates
            let interval = CMTime(seconds: 0.5, preferredTimescale: 600)
            timeObserver = player.addPeriodicTimeObserver(
                forInterval: interval,
                queue: .main
            ) { time in
                currentTime = time.seconds
            }
        }
        .onDisappear {
            // IMPORTANT: Remove the observer when the view disappears
            if let observer = timeObserver {
                player.removeTimeObserver(observer)
                timeObserver = nil
            }
        }
    }
    
    private func formatTime(_ seconds: Double) -> String {
        let mins = Int(seconds) / 60
        let secs = Int(seconds) % 60
        return String(format: "%d:%02d", mins, secs)
    }
}
```

### Boundary Time Observation

For triggering actions at specific times (e.g., chapter markers), use `addBoundaryTimeObserver`:

```swift
let times = [
    CMTime(seconds: 30, preferredTimescale: 600),
    CMTime(seconds: 60, preferredTimescale: 600),
    CMTime(seconds: 120, preferredTimescale: 600)
]

let observer = player.addBoundaryTimeObserver(
    forTimes: times.map { NSValue(time: $0) },
    queue: .main
) {
    print("Reached a chapter boundary")
}
```

### Pre-iOS 26 Approach (KVO / Combine)

If you need to support older iOS versions, use KVO or Combine:

```swift
// Combine approach (iOS 13+)
import Combine

class PlayerViewModel: ObservableObject {
    let player = AVPlayer()
    @Published var isPlaying = false
    @Published var currentTime: Double = 0
    
    private var cancellables = Set<AnyCancellable>()
    private var timeObserver: Any?
    
    init() {
        // Observe timeControlStatus via KVO publisher
        player.publisher(for: \.timeControlStatus)
            .receive(on: DispatchQueue.main)
            .map { $0 == .playing }
            .assign(to: &$isPlaying)
        
        // Periodic time observer
        let interval = CMTime(seconds: 0.5, preferredTimescale: 600)
        timeObserver = player.addPeriodicTimeObserver(
            forInterval: interval,
            queue: .main
        ) { [weak self] time in
            self?.currentTime = time.seconds
        }
    }
    
    deinit {
        if let observer = timeObserver {
            player.removeTimeObserver(observer)
        }
    }
}
```

### Complete Example: Audio Player with Observation

```swift
import AVFoundation
import SwiftUI

struct AudioPlayerView: View {
    @State private var player: AVPlayer
    @State private var currentTime: Double = 0
    @State private var timeObserver: Any?
    
    init(url: URL) {
        let item = AVPlayerItem(url: url)
        _player = State(initialValue: AVPlayer(playerItem: item))
    }
    
    var body: some View {
        VStack(spacing: 20) {
            // Status indicator (auto-updates via Observation)
            HStack {
                Circle()
                    .fill(statusColor)
                    .frame(width: 12, height: 12)
                Text(player.timeControlStatus.displayString)
            }
            
            // Volume (auto-updates via Observation)
            HStack {
                Image(systemName: player.isMuted ? "speaker.slash" : "speaker.wave.2")
                Slider(value: Binding(
                    get: { Double(player.volume) },
                    set: { player.volume = Float($0) }
                ), in: 0...1)
            }
            
            // Progress (periodic time observer)
            if let duration = player.currentItem?.duration,
               duration.isNumeric {
                ProgressView(value: currentTime, total: duration.seconds)
            }
            
            // Controls
            HStack(spacing: 30) {
                Button(action: { seekBackward() }) {
                    Image(systemName: "gobackward.15")
                        .font(.title)
                }
                
                Button(action: { togglePlayback() }) {
                    Image(systemName: player.timeControlStatus == .playing
                          ? "pause.circle.fill"
                          : "play.circle.fill")
                        .font(.system(size: 50))
                }
                
                Button(action: { seekForward() }) {
                    Image(systemName: "goforward.15")
                        .font(.title)
                }
            }
        }
        .padding()
        .onAppear { startTimeObserver() }
        .onDisappear { stopTimeObserver() }
    }
    
    private var statusColor: Color {
        switch player.timeControlStatus {
        case .playing: return .green
        case .paused: return .red
        case .waitingToPlayAtSpecifiedRate: return .orange
        @unknown default: return .gray
        }
    }
    
    private func togglePlayback() {
        if player.timeControlStatus == .playing {
            player.pause()
        } else {
            player.play()
        }
    }
    
    private func seekForward() {
        let target = CMTimeAdd(player.currentTime(), CMTime(seconds: 15, preferredTimescale: 600))
        player.seek(to: target)
    }
    
    private func seekBackward() {
        let target = CMTimeSubtract(player.currentTime(), CMTime(seconds: 15, preferredTimescale: 600))
        player.seek(to: target)
    }
    
    private func startTimeObserver() {
        let interval = CMTime(seconds: 0.5, preferredTimescale: 600)
        timeObserver = player.addPeriodicTimeObserver(
            forInterval: interval,
            queue: .main
        ) { time in
            currentTime = time.seconds
        }
    }
    
    private func stopTimeObserver() {
        if let observer = timeObserver {
            player.removeTimeObserver(observer)
            timeObserver = nil
        }
    }
}
```

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Exception on `isObservationEnabled` | Must set it **before** creating any AVPlayer/AVPlayerItem |
| View not updating for time | Use `addPeriodicTimeObserver` -- observation is for state, not time |
| Memory leak from time observer | Always call `removeTimeObserver` in `onDisappear` or `deinit` |
| `isObservationEnabled` set per-instance | It is a **type property** (global), not per-instance |
| Missing `@main` init | Set `isObservationEnabled` in the `App.init()` or `UIApplicationDelegate` |

### References

- https://developer.apple.com/documentation/AVFoundation/observing-playback-state-in-swiftui
- https://developer.apple.com/documentation/avfoundation/avplayer/1643485-timecontrolstatus
- https://developer.apple.com/documentation/avfoundation/avplayer/timecontrolstatus-swift.enum
- https://developer.apple.com/documentation/avfoundation/avplayer/isobservationenabled
- https://levelup.gitconnected.com/little-swiftui-tip-monitor-avplayer-state-in-the-era-of-26-16c425ea3f84

---

## 3. Adopting Inheritance in SwiftData

**Apple Doc:** https://developer.apple.com/documentation/SwiftData/Adopting-inheritance-in-SwiftData
**WWDC Session:** https://developer.apple.com/videos/play/wwdc2025/291/ (SwiftData: Dive into inheritance and schema migration)

### Overview

iOS 26 introduces class inheritance for SwiftData models. Before iOS 26, `@Model` classes could not subclass other `@Model` classes. Now you can define a base model and create specialized subclasses, following the "is-a" relationship principle.

This feature requires iOS 26+ and subclasses must be marked with `@available(iOS 26, *)`.

### Defining a Base Model and Subclasses

```swift
import SwiftData

// Base model -- works on all supported iOS versions
@Model
class Event {
    var title: String
    var location: String
    var scheduledDate: Date
    var duration: TimeInterval
    
    init(title: String, location: String, scheduledDate: Date, duration: TimeInterval) {
        self.title = title
        self.location = location
        self.scheduledDate = scheduledDate
        self.duration = duration
    }
}

// Subclass -- iOS 26+ ONLY
@available(iOS 26, *)
@Model
class WorkEvent: Event {
    var budget: Decimal = 0.0
    var departmentCode: String = ""
    
    init(title: String, location: String, scheduledDate: Date,
         duration: TimeInterval, budget: Decimal, departmentCode: String) {
        self.budget = budget
        self.departmentCode = departmentCode
        super.init(title: title, location: location,
                   scheduledDate: scheduledDate, duration: duration)
    }
}

// Another subclass -- iOS 26+ ONLY
@available(iOS 26, *)
@Model
class SocialEvent: Event {
    enum Category: String, CaseIterable, Codable {
        case birthday
        case wedding
        case celebration
    }
    
    var category: Category
    var guestCount: Int = 0
    
    init(title: String, location: String, scheduledDate: Date,
         duration: TimeInterval, category: Category, guestCount: Int = 0) {
        self.category = category
        self.guestCount = guestCount
        super.init(title: title, location: location,
                   scheduledDate: scheduledDate, duration: duration)
    }
}
```

### Schema Configuration

When using inheritance, you must include **all** model types (base and subclasses) in the model container:

```swift
@main
struct EventPlannerApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [
            Event.self,
            WorkEvent.self,
            SocialEvent.self
        ])
    }
}
```

Or with a custom `ModelContainer`:

```swift
let schema = Schema([
    Event.self,
    WorkEvent.self,
    SocialEvent.self
])

let configuration = ModelConfiguration(schema: schema)
let container = try ModelContainer(for: schema, configurations: [configuration])
```

### Querying for Base and Subclass Types

#### Querying All Events (Base + Subclasses)

When you query for the base class, you get **all** instances including subclasses:

```swift
struct EventListView: View {
    // Returns ALL events: Event, WorkEvent, AND SocialEvent instances
    @Query(sort: \Event.scheduledDate) var events: [Event]
    
    var body: some View {
        List(events) { event in
            VStack(alignment: .leading) {
                Text(event.title)
                Text(event.location)
                    .font(.caption)
                
                // Type-check to display subclass-specific info
                if let workEvent = event as? WorkEvent {
                    Text("Budget: \(workEvent.budget, format: .currency(code: "USD"))")
                        .foregroundStyle(.blue)
                } else if let socialEvent = event as? SocialEvent {
                    Text("Guests: \(socialEvent.guestCount)")
                        .foregroundStyle(.green)
                }
            }
        }
    }
}
```

#### Querying Specific Subclass Types with Predicates

Use the `is` keyword in `#Predicate` to filter by subclass type:

```swift
struct FilteredEventListView: View {
    @Query var events: [Event]
    
    init(filter: EventFilter) {
        let predicate: Predicate<Event>
        switch filter {
        case .all:
            predicate = #Predicate<Event> { _ in true }
        case .work:
            predicate = #Predicate<Event> { $0 is WorkEvent }
        case .social:
            predicate = #Predicate<Event> { $0 is SocialEvent }
        }
        
        _events = Query(
            filter: predicate,
            sort: \.scheduledDate
        )
    }
    
    var body: some View {
        List(events) { event in
            EventRow(event: event)
        }
    }
}

enum EventFilter: String, CaseIterable {
    case all, work, social
}
```

#### Using FetchDescriptor

```swift
// Fetch only WorkEvents
let workPredicate = #Predicate<Event> { $0 is WorkEvent }
var descriptor = FetchDescriptor<Event>(
    predicate: workPredicate,
    sortBy: [SortDescriptor(\.scheduledDate)]
)
descriptor.fetchLimit = 50

let workEvents = try modelContext.fetch(descriptor)
```

### Schema Migration with Inheritance

When introducing inheritance to an existing schema, you need a migration plan.

#### Step 1: Define Versioned Schemas

```swift
// Original schema (no inheritance)
enum EventSchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Event.self]
    }
    
    @Model
    class Event {
        var title: String
        var location: String
        var scheduledDate: Date
        var duration: TimeInterval
        // V1 had eventType as a string property
        var eventType: String
        
        init(title: String, location: String, scheduledDate: Date,
             duration: TimeInterval, eventType: String) {
            self.title = title
            self.location = location
            self.scheduledDate = scheduledDate
            self.duration = duration
            self.eventType = eventType
        }
    }
}

// New schema with inheritance (iOS 26+)
@available(iOS 26, *)
enum EventSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Event.self, WorkEvent.self, SocialEvent.self]
    }
    
    @Model
    class Event {
        var title: String
        var location: String
        var scheduledDate: Date
        var duration: TimeInterval
        
        init(title: String, location: String, scheduledDate: Date,
             duration: TimeInterval) {
            self.title = title
            self.location = location
            self.scheduledDate = scheduledDate
            self.duration = duration
        }
    }
    
    @Model
    class WorkEvent: Event {
        var budget: Decimal = 0.0
        var departmentCode: String = ""
    }
    
    @Model
    class SocialEvent: Event {
        var category: String = "celebration"
        var guestCount: Int = 0
    }
}
```

#### Step 2: Define Migration Stages

```swift
@available(iOS 26, *)
enum EventMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [EventSchemaV1.self, EventSchemaV2.self]
    }
    
    static var stages: [MigrationStage] {
        [migrateV1toV2]
    }
    
    // Lightweight migration works for adding subclasses
    static let migrateV1toV2 = MigrationStage.lightweight(
        fromVersion: EventSchemaV1.self,
        toVersion: EventSchemaV2.self
    )
}
```

#### Step 3: Apply Migration Plan

```swift
@main
struct EventPlannerApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(
            for: Event.self,
            migrationPlan: EventMigrationPlan.self
        )
    }
}
```

### Relationship Behavior with Inherited Models

Relationships work normally with inheritance. A relationship to the base class can hold any subclass:

```swift
@Model
class Calendar {
    var name: String
    // This relationship can hold Event, WorkEvent, or SocialEvent
    @Relationship(deleteRule: .cascade)
    var events: [Event] = []
    
    init(name: String) {
        self.name = name
    }
}
```

### Tracking History Changes

SwiftData's history API works with inheritance. Use `HistoryDescriptor` for targeted change detection:

```swift
@available(iOS 26, *)
func trackChanges(in context: ModelContext) throws {
    var descriptor = HistoryDescriptor<DefaultHistoryTransaction>()
    // Can filter by entity names including subclasses
    let entityNames = ["Event", "WorkEvent", "SocialEvent"]
    
    let transactions = try context.fetchHistory(descriptor)
    for transaction in transactions {
        for change in transaction.changes {
            // Process entity-level changes
            print("Changed entity: \(change.changedPersistentIdentifier)")
        }
    }
}
```

### Performance Considerations

SwiftData (like Core Data) uses **Single Table Inheritance** under the hood:

| Aspect | Detail |
|---|---|
| **Storage** | All subclasses stored in a single SQLite table |
| **Sparse columns** | Subclass-specific columns are NULL for other types |
| **Wide tables** | Many subclasses with many properties = many columns |
| **Index bloat** | All subclass data shares one set of indexes |
| **Schema changes** | Any subclass modification touches the entire table |

**Best Practices:**
- Keep inheritance trees **shallow** (1-2 levels max)
- Design inheritance based on actual query needs
- Always version schemas before structural changes
- Use selective fetching (`fetchLimit`, predicates) for large datasets
- Consider composition (separate related models) instead of deep inheritance

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Missing `@available(iOS 26, *)` on subclass | Required -- will not compile without it |
| Not including subclasses in container | Add all types to `.modelContainer(for:)` |
| Deep inheritance hierarchies | Keep to 1-2 levels; performance degrades with depth |
| Querying base returns all subclasses | This is expected behavior; use `is` predicate to filter |
| Pre-iOS 26 deployment target | Cannot use model inheritance at all; use composition |
| No migration plan | Add `SchemaMigrationPlan` when adding inheritance to existing schema |

### References

- https://developer.apple.com/documentation/swiftdata/adopting-inheritance-in-swiftdata
- https://developer.apple.com/videos/play/wwdc2025/291/
- https://dev.to/arshtechpro/wwdc-2025-swiftdata-ios-26-class-inheritance-migration-issues-30bh
- https://medium.com/@shubhamsanghavi100/swiftdata-model-class-inheritance-in-ios-26-deep-dive-from-wwdc-2025-a0a93bcebfc8
- https://wwdcnotes.com/documentation/wwdcnotes/wwdc25-291-swiftdata-dive-into-inheritance-and-schema-migration/
- https://fatbobman.com/en/snippet/is-entity-inheritance-slowing-down-your-swiftdata-coredata-app/

---

## 4. Recording UI Automation for Testing (XCUIAutomation)

**Apple Doc:** https://developer.apple.com/documentation/XCUIAutomation/recording-ui-automation-for-testing
**WWDC Session:** https://developer.apple.com/videos/play/wwdc2025/344/ (Record, replay, and review: UI automation with Xcode)

### Overview

Xcode 26 introduces XCUIAutomation, a framework for recording, replaying, and reviewing UI automation tests. Rather than writing UI test code manually, you interact with your app while Xcode records your actions and generates standard XCTest code in real-time.

XCUIAutomation is automatically included when you `import XCTest` -- no separate import is needed.

### What is XCUIAutomation?

XCUIAutomation is the underlying framework that powers UI testing in Xcode. It provides:

- **Recording**: Interact with your app; Xcode writes test code automatically
- **Replaying**: Run recorded tests across devices, locales, and orientations
- **Reviewing**: Watch video recordings with touch overlay visualization

**Key difference from manual XCUITest:** Instead of writing `app.buttons["Login"].tap()` by hand, you tap the Login button in the Simulator and Xcode writes the code for you.

### The Three-Phase Workflow

#### Phase 1: Record

1. Create a new UI Test target (File > New > Target > UI Testing Bundle)
2. Open your UI test case file (e.g., `MyAppUITests.swift`)
3. Click the **Record** button in the editor sidebar
4. Interact with your app in the Simulator -- taps, swipes, text entry, navigation
5. Xcode generates XCTest code in real-time as you interact
6. Click **Stop** when done

#### Phase 2: Replay

Run your recorded tests:
- Across multiple **devices** (iPhone, iPad)
- Across multiple **locales** and **regions**
- In different **orientations** (portrait, landscape)
- Under various **system conditions** (dark mode, accessibility)

Configure these via **Test Plans** in Xcode.

#### Phase 3: Review

Analyze test results:
- Watch **video recordings** of test runs with touch interactions shown
- **Jump to the exact step** where a failure occurred using the timeline
- See **element overlays** showing what Xcode tried to interact with
- **Compare** actual vs expected metadata
- Download **screenshots** captured at each step

### What Interactions Are Captured

| Interaction Type | Examples |
|---|---|
| **Taps** | `tap()`, `doubleTap()`, `twoFingerTap()` |
| **Swipes** | `swipeLeft()`, `swipeRight()`, `swipeUp()`, `swipeDown()` |
| **Text entry** | `typeText("Hello")`, keyboard input |
| **Long press** | `press(forDuration:)` |
| **Drag** | `press(forDuration:thenDragTo:)` |
| **Pinch** | `pinch(withScale:velocity:)` |
| **Rotation** | `rotate(_:withVelocity:)` |
| **Hardware buttons** | Action button, Camera button, Digital Crown, Apple TV remote |
| **Navigation** | Tab bar taps, back button, toolbar items |

### Generated Code Format

Here is an example of what the recorder generates:

```swift
import XCTest

class MyAppUITests: XCTestCase {
    
    func testEditTripTitle() throws {
        let app = XCUIApplication()
        app.launch()
        
        // Recorder captured: tap on "My Trip" cell
        let tripCell = app.cells["My Trip"]
        tripCell.tap()
        
        // Recorder captured: tap on the title text field
        let titleField = app.textFields["tripTitleField"]
        titleField.tap()
        
        // Recorder captured: clear existing text and type new title
        titleField.clearAndTypeText("Summer Vacation 2026")
        
        // Recorder captured: tap Save button
        app.buttons["Save"].tap()
        
        // Recorder captured: navigate back
        app.navigationBars.buttons.element(boundBy: 0).tap()
        
        // Verify the title was updated
        XCTAssertTrue(app.cells["Summer Vacation 2026"].exists)
    }
}
```

### Editing and Customizing Recorded Tests

The generated code is standard XCTest, so you can freely edit it:

```swift
func testEditTripTitle() throws {
    let app = XCUIApplication()
    app.launch()
    
    // Add setup: navigate to the right screen
    app.tabBars.buttons["Trips"].tap()
    
    // Add assertions between recorded actions
    let tripCell = app.cells["My Trip"]
    XCTAssertTrue(tripCell.waitForExistence(timeout: 5))
    tripCell.tap()
    
    // Add error handling
    let titleField = app.textFields["tripTitleField"]
    XCTAssertTrue(titleField.exists, "Title field should be visible")
    titleField.tap()
    titleField.clearAndTypeText("Summer Vacation 2026")
    
    // Add wait for async operations
    let saveButton = app.buttons["Save"]
    saveButton.tap()
    
    // Add custom verification
    let updatedCell = app.cells["Summer Vacation 2026"]
    XCTAssertTrue(
        updatedCell.waitForExistence(timeout: 3),
        "Updated trip title should appear in the list"
    )
}
```

### Accessibility: The Foundation for Reliable Automation

XCUIAutomation relies on accessibility APIs to identify and interact with UI elements. Proper accessibility setup is essential for stable tests:

```swift
// In your SwiftUI views
struct TripDetailView: View {
    var body: some View {
        VStack {
            TextField("Trip Title", text: $title)
                .accessibilityIdentifier("tripTitleField")
            
            Button("Save") { save() }
                .accessibilityIdentifier("saveButton")
            
            List(trips) { trip in
                TripRow(trip: trip)
                    .accessibilityIdentifier("tripRow_\(trip.id)")
            }
        }
    }
}
```

**Best practices for accessibility identifiers:**
- Use unique, stable identifiers (not localized text)
- Prefix with the view or feature name for clarity
- Use them consistently across your app

### Performing Accessibility Audits

XCUIAutomation includes built-in accessibility auditing:

```swift
import XCTest

class AccessibilityTests: XCTestCase {
    
    func testAccessibilityAudit() throws {
        let app = XCUIApplication()
        app.launch()
        
        // Run a full accessibility audit on the current screen
        try app.performAccessibilityAudit()
    }
    
    func testAccessibilityAuditWithOptions() throws {
        let app = XCUIApplication()
        app.launch()
        
        // Audit for specific categories
        try app.performAccessibilityAudit(for: [
            .dynamicType,
            .contrast,
            .hitRegion
        ])
    }
    
    func testAccessibilityAuditWithHandler() throws {
        let app = XCUIApplication()
        app.launch()
        
        // Audit with custom issue handling
        try app.performAccessibilityAudit(for: .all) { issue in
            // Return true to ignore specific known issues
            if issue.auditType == .contrast &&
               issue.element?.identifier == "decorativeElement" {
                return true // Ignore contrast issue for decorative element
            }
            return false // Fail on all other issues
        }
    }
}
```

### Platform Support

| Platform | Support |
|---|---|
| **iOS** | Full support (Simulator and Device) |
| **iPadOS** | Full support (Simulator and Device) |
| **macOS** | Full support |
| **watchOS** | Limited -- hardware buttons (Digital Crown) |
| **tvOS** | Supported -- includes Apple TV remote interactions |
| **visionOS** | Supported |

### Integration with Existing XCTest Targets

XCUIAutomation integrates seamlessly with your existing test infrastructure:

```swift
import XCTest

class ExistingUITests: XCTestCase {
    var app: XCUIApplication!
    
    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        
        // You can set launch arguments/environment
        app.launchArguments = ["--uitesting"]
        app.launchEnvironment = ["RESET_DATA": "true"]
        
        app.launch()
    }
    
    override func tearDownWithError() throws {
        app = nil
    }
    
    // Your manually written test
    func testExistingManualTest() throws {
        app.tabBars.buttons["Settings"].tap()
        XCTAssertTrue(app.navigationBars["Settings"].exists)
    }
    
    // Recorded test lives alongside manual tests
    func testRecordedLoginFlow() throws {
        // This code was generated by the recorder
        let usernameField = app.textFields["usernameTextField"]
        usernameField.tap()
        usernameField.typeText("testuser")
        
        let passwordField = app.secureTextFields["passwordField"]
        passwordField.tap()
        passwordField.typeText("password123")
        
        app.buttons["loginButton"].tap()
        
        // Add manual assertions after recorded steps
        XCTAssertTrue(app.staticTexts["Welcome"].waitForExistence(timeout: 5))
    }
}
```

### Test Plans for Multi-Configuration Testing

Create a Test Plan (`.xctestplan`) to run your recorded tests across configurations:

```json
{
    "configurations": [
        {
            "name": "English - Light Mode",
            "options": {
                "language": "en",
                "region": "US",
                "uiAppearance": "light"
            }
        },
        {
            "name": "Spanish - Dark Mode",
            "options": {
                "language": "es",
                "region": "ES",
                "uiAppearance": "dark"
            }
        },
        {
            "name": "Japanese - Large Text",
            "options": {
                "language": "ja",
                "region": "JP",
                "preferredContentSizeCategory": "accessibility3"
            }
        }
    ]
}
```

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Element not found at runtime | Add `accessibilityIdentifier` to the element |
| Flaky tests from timing | Use `waitForExistence(timeout:)` instead of raw `exists` |
| Localized text in selectors | Use `accessibilityIdentifier` instead of label text |
| Tests break after UI changes | Keep identifiers stable; update recorded code after redesigns |
| Recording captures irrelevant actions | Edit generated code to remove unnecessary steps |
| Tests slow on CI | Use test plans to parallelize across simulators |

### References

- https://developer.apple.com/documentation/XCUIAutomation/recording-ui-automation-for-testing
- https://developer.apple.com/documentation/xcuiautomation
- https://developer.apple.com/documentation/xcuiautomation/xcuiapplication
- https://developer.apple.com/videos/play/wwdc2025/344/
- https://dev.to/karthikpala/simplified-and-no-code-ui-automation-with-xcode-26-475j
- https://wwdcnotes.com/documentation/wwdcnotes/wwdc25-344-record-replay-and-review-ui-automation-with-xcode/

---

## 5. Liquid Glass -- Technology Overview

**Apple Doc:** https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass
**WWDC Session:** https://developer.apple.com/videos/play/wwdc2025/219/ (Meet Liquid Glass)

### Overview

Liquid Glass is Apple's new design language introduced at WWDC 2025. It unifies the visual identity across iOS 26, iPadOS 26, macOS Tahoe, watchOS 26, tvOS 26, and visionOS 26. Liquid Glass replaces opaque chrome with a translucent, dynamic material that reflects and refracts its surroundings.

### What is Liquid Glass?

Liquid Glass is a **digital meta-material** -- not a simple blur or transparency. It:

- **Bends and shapes light** dynamically, like physical glass
- **Refracts content** behind it, creating depth and dimensionality
- **Responds organically** to touch and motion, like a lightweight liquid
- **Adapts automatically** to the content underneath, adjusting its appearance

Thickness matters: thicker glass elements produce more pronounced refraction and reflection effects. The material adapts its visual weight based on the importance and type of UI element.

### Design Philosophy

Liquid Glass is built on three foundational principles:

#### 1. Content Leads

Controls **float above** content using glass layers instead of solid blocks. Content always takes priority -- glass serves as a functional layer, never stealing focus. The background and content should be visible through the glass.

#### 2. Functional Layer, Not Decoration

Glass is a **functional** element that communicates hierarchy and interactivity, not a visual effect applied for aesthetics. Every glass element serves a purpose in the UI structure.

#### 3. Organic Responsiveness

Glass elements **expand, shrink, and morph** as users interact. Tab bars minimize on scroll. Buttons scale on press. Transitions between states are fluid and continuous.

### Where Liquid Glass Appears Automatically

When you recompile your app with the iOS 26 SDK, these system elements adopt Liquid Glass automatically:

| Element | Behavior |
|---|---|
| **Navigation bars** | Translucent glass background; title floats on glass |
| **Toolbars** | Glass background; can be split into groups with ToolbarSpacer |
| **Tab bars** | Floating glass pill; minimizes on scroll; expands on scroll-up |
| **Search bars** | Glass pill appearance |
| **Sheets** | Glass material on presentation |
| **Popovers** | Glass container |
| **Menus** | Glass background for context menus |
| **Alerts** | Glass container appearance |
| **Segmented controls** | Glass selection indicator |

### Visual Hierarchy Rules

Liquid Glass creates hierarchy through **layers**, not through color intensity or borders:

```
Content Layer (bottom)
  |
  +-- Primary glass layer (navigation, toolbars)
  |     |
  |     +-- Interactive glass (buttons, controls)
  |           |
  |           +-- Prominent glass (highlighted actions)
```

**Key rules:**
- **One primary glass sheet per view** -- avoid stacking multiple glass layers
- **Content extends behind glass** -- use `.ignoresSafeArea()` or let content scroll behind the glass chrome
- **Glass cannot sample other glass** -- nearby glass elements must be in the same `GlassEffectContainer` to share their sampling region
- **Use tint sparingly** -- only to convey semantic meaning, not for decoration

### Tint Behavior

When you apply a tint to glass:

- The tint color generates a **range of tones** mapped to content brightness underneath
- On light backgrounds, the tint appears lighter; on dark backgrounds, it appears darker
- This mirrors how **physical colored glass** works -- changing hue, brightness, and saturation based on what's behind it
- The system ensures tinted glass does not deviate too far from the intended color

### When to Use Liquid Glass

**Use glass for:**
- Navigation bars and toolbars
- Tab bars and bottom accessories
- Floating action buttons
- Sheets, popovers, and menus
- Custom controls that need to float above content
- Interactive elements (buttons, toggles) in floating panels

**Do NOT use glass for:**
- Content layers (text blocks, images, cards)
- Full-screen backgrounds
- Scrollable content areas
- Decorative-only elements
- Every UI element -- restraint is key

### Accessibility Considerations

Liquid Glass automatically adapts to system accessibility settings:

| Setting | Glass Behavior |
|---|---|
| **Reduce Motion** | Simplifies transitions; reduces animation |
| **Reduce Transparency** | Adds opacity to glass; less see-through |
| **Increase Contrast** | Increases separation between glass and content; adds stronger borders |
| **Dynamic Type** | Text scales normally; glass container adapts |
| **Dark Mode** | Glass adapts refraction and tint to dark appearance |

**Contrast considerations:**
- Apple targets a minimum contrast ratio of **4.5:1** for text on glass backgrounds
- The system adjusts foreground alpha, saturation, or blur based on the background layer to maintain readability
- With complex wallpapers or backgrounds, contrast may need manual verification
- Support `@Environment(\.accessibilityReduceTransparency)` to provide solid fallbacks when needed

```swift
struct AccessibleGlassView: View {
    @Environment(\.accessibilityReduceTransparency) var reduceTransparency
    
    var body: some View {
        // Let the system handle most accessibility automatically
        // Only override if you have a specific need
        Text("Important Content")
            .padding()
            .glassEffect()
    }
}
```

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Over-customized bars from old design | Clean up custom bar backgrounds; let glass be glass |
| Glass on glass (no container) | Use `GlassEffectContainer` to group nearby glass elements |
| Decorative glass everywhere | Glass is functional, not decorative; show restraint |
| Ignoring accessibility settings | System handles most cases; test with Reduce Transparency on |
| Solid backgrounds preventing glass | Let content extend behind glass chrome |
| Too many tinted glass elements | Use tint only for semantic meaning |

### References

- https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass
- https://developer.apple.com/videos/play/wwdc2025/219/
- https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/live-activities
- https://www.atelier-socle.com/en/articles/swiftui-liquid-glass-guide
- https://designedforhumans.tech/blog/liquid-glass-smart-or-bad-for-accessibility
- https://dev.to/arshtechpro/wwdc-2025-apples-liquid-glass-design-system-52an

---

## 6. Adopting Liquid Glass -- Implementation

**Apple Doc:** https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass
**WWDC Session:** https://developer.apple.com/videos/play/wwdc2025/323/ (Build a SwiftUI app with the new design)

### Overview

This section covers the implementation details for adding Liquid Glass to your SwiftUI and UIKit views. Most system components adopt Liquid Glass automatically when you recompile with the iOS 26 SDK. For custom views, use the `glassEffect()` modifier and related APIs.

### Automatic Adoption (Zero Code Changes)

Simply recompiling your app with Xcode 26 and the iOS 26 SDK gives you:
- Glass navigation bars
- Glass toolbars
- Glass tab bars
- Glass search bars
- Glass sheets and popovers

**No code changes needed** for these standard system components.

### The Glass Struct

The `Glass` struct configures the Liquid Glass material:

```swift
struct Glass {
    // Static properties -- glass variants
    static var regular: Glass    // Standard glass material (most common)
    static var clear: Glass      // More transparent glass
    static var identity: Glass   // No-op glass (for conditional toggling)
    
    // Instance methods -- customization
    func tint(_ color: Color) -> Glass    // Add a color tint
    func interactive() -> Glass           // Enable interactive response
}
```

**Variant descriptions:**

| Variant | Appearance | Use Case |
|---|---|---|
| `.regular` | Standard translucent glass | Default for most UI elements |
| `.clear` | More transparent, subtler refraction | Secondary elements, less emphasis |
| `.identity` | No glass effect at all | Conditional toggling: `isGlassEnabled ? .regular : .identity` |

### glassEffect() Modifier -- Full API

```swift
// Full signature
func glassEffect<S: Shape>(
    _ glass: Glass = .regular,
    in shape: S = .capsule,       // DefaultGlassEffectShape
    isEnabled: Bool = true
) -> some View
```

#### Basic Usage

```swift
// Default: regular glass in a capsule shape
Text("Hello, Glass!")
    .padding()
    .glassEffect()

// Equivalent to:
Text("Hello, Glass!")
    .padding()
    .glassEffect(.regular, in: .capsule, isEnabled: true)
```

#### Glass Variants

```swift
// Regular glass (standard)
Text("Regular")
    .padding()
    .glassEffect(.regular)

// Clear glass (more transparent)
Text("Clear")
    .padding()
    .glassEffect(.clear)

// Identity (no glass -- useful for conditional toggling)
Text("No Glass")
    .padding()
    .glassEffect(.identity)

// Conditional glass
@State var showGlass = true

Text("Conditional")
    .padding()
    .glassEffect(showGlass ? .regular : .identity)

// Using isEnabled parameter
Text("Toggleable")
    .padding()
    .glassEffect(.regular, isEnabled: showGlass)
```

### Shape Customization

The glass shape can be any `Shape` conforming type:

```swift
// Capsule (default)
Text("Capsule")
    .padding()
    .glassEffect(in: .capsule)

// Circle
Image(systemName: "plus")
    .frame(width: 56, height: 56)
    .glassEffect(in: .circle)

// Rounded Rectangle
Text("Card")
    .frame(maxWidth: .infinity)
    .padding()
    .glassEffect(in: .rect(cornerRadius: 16))

// Ellipse
Text("Wide")
    .padding(.horizontal, 40)
    .padding(.vertical, 12)
    .glassEffect(in: .ellipse)

// Container-concentric (matches parent container radius)
Text("Concentric")
    .padding()
    .glassEffect(in: .containerConcentric)

// Custom shape
struct DiamondShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.midY))
        path.addLine(to: CGPoint(x: rect.midX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.midY))
        path.closeSubpath()
        return path
    }
}

Text("Diamond")
    .padding(30)
    .glassEffect(in: DiamondShape())
```

### Tint for Emphasis

Use `.tint()` to add semantic color to glass elements. This should convey **meaning**, not just aesthetics:

```swift
// Tinted glass
Button("Delete") { }
    .padding()
    .glassEffect(.regular.tint(.red))

// Tinted clear glass
Button("Info") { }
    .padding()
    .glassEffect(.clear.tint(.blue))

// System color tints
Button("Success") { }
    .padding()
    .glassEffect(.regular.tint(.green))

Button("Warning") { }
    .padding()
    .glassEffect(.regular.tint(.orange))
```

**Tint behavior:**
- The tint color generates a range of tones mapped to content brightness underneath
- On light backgrounds, tint appears lighter; on dark, darker
- The system prevents the tint from straying too far from the intended color

### Interactive Modifier for Controls

`.interactive()` makes the glass respond to user gestures with scaling, bouncing, and shimmering effects:

```swift
// Interactive button
Button("Tap Me") { }
    .padding()
    .glassEffect(.regular.interactive())

// Interactive + tinted
Button("Delete", role: .destructive) { }
    .padding()
    .glassEffect(.regular.tint(.red).interactive())

// Interactive + clear
Button("Secondary") { }
    .padding()
    .glassEffect(.clear.interactive())

// Combined: interactive, tinted, custom shape
Button {
    // action
} label: {
    Image(systemName: "plus")
        .font(.title2)
        .frame(width: 56, height: 56)
}
.glassEffect(.regular.tint(.blue).interactive(), in: .circle)
```

### GlassEffectContainer -- Grouping Glass Elements

`GlassEffectContainer` is essential when you have multiple glass elements near each other. Glass cannot sample other glass, so elements in separate containers will look incorrect when overlapping.

```swift
// Basic container
GlassEffectContainer {
    HStack(spacing: 12) {
        Button("One") { }
            .padding()
            .glassEffect()
        
        Button("Two") { }
            .padding()
            .glassEffect()
        
        Button("Three") { }
            .padding()
            .glassEffect()
    }
}

// Container with spacing (controls when glass elements merge)
GlassEffectContainer(spacing: 20) {
    VStack(spacing: 15) {
        Button("Top") { }
            .padding()
            .glassEffect()
        
        Button("Bottom") { }
            .padding()
            .glassEffect()
    }
}
```

**Spacing parameter:** Controls how close elements must be before they visually blend and morph together. Elements within this distance merge into a single glass shape during transitions.

### glassEffectID with @Namespace -- Morphing Transitions

Use `glassEffectID` with a `@Namespace` to create fluid morphing animations between glass elements across state changes:

```swift
struct MorphingGlassView: View {
    @State private var isExpanded = false
    @Namespace private var glassNamespace
    
    var body: some View {
        GlassEffectContainer(spacing: 20) {
            VStack(spacing: 15) {
                // Main button -- always visible
                Button {
                    withAnimation(.bouncy) {
                        isExpanded.toggle()
                    }
                } label: {
                    Image(systemName: isExpanded ? "xmark" : "plus")
                        .font(.title2)
                        .frame(width: 56, height: 56)
                }
                .glassEffect(.regular.interactive(), in: .circle)
                .glassEffectID("mainButton", in: glassNamespace)
                
                // Expandable actions -- appear/disappear with morphing
                if isExpanded {
                    Button {
                        // Camera action
                    } label: {
                        Label("Camera", systemImage: "camera")
                            .frame(width: 56, height: 56)
                    }
                    .glassEffect(.regular.interactive(), in: .circle)
                    .glassEffectID("cameraButton", in: glassNamespace)
                    .transition(.blurReplace)
                    
                    Button {
                        // Photo library action
                    } label: {
                        Label("Photos", systemImage: "photo")
                            .frame(width: 56, height: 56)
                    }
                    .glassEffect(.regular.interactive(), in: .circle)
                    .glassEffectID("photosButton", in: glassNamespace)
                    .transition(.blurReplace)
                }
            }
        }
    }
}
```

**How morphing works:**
- Glass elements with the same `glassEffectID` and `@Namespace` morph smoothly when they appear, disappear, or change position
- Wrap state changes in `withAnimation` for fluid transitions
- The container's spacing determines the merge/split threshold

### Tab Bar State Change Example

```swift
struct ContentView: View {
    @State private var selectedTab = 0
    @Namespace private var tabNamespace
    
    var body: some View {
        GlassEffectContainer {
            HStack(spacing: 0) {
                ForEach(0..<4, id: \.self) { index in
                    Button {
                        withAnimation(.spring(duration: 0.35)) {
                            selectedTab = index
                        }
                    } label: {
                        Image(systemName: tabIcon(for: index))
                            .frame(maxWidth: .infinity, minHeight: 44)
                    }
                    .glassEffect(
                        selectedTab == index
                            ? .regular.tint(.blue).interactive()
                            : .clear.interactive()
                    )
                    .glassEffectID("tab_\(index)", in: tabNamespace)
                }
            }
            .padding(.horizontal)
        }
    }
    
    func tabIcon(for index: Int) -> String {
        ["house", "magnifyingglass", "bell", "person"][index]
    }
}
```

### UIKit Adoption

#### Automatic Adoption

UIKit components get Liquid Glass automatically when you recompile:
- `UINavigationBar` -- glass background
- `UIToolbar` -- glass background
- `UITabBar` -- floating glass appearance
- `UISearchBar` -- glass pill

#### UIGlassEffect (Custom Views)

```swift
import UIKit

// Create a glass effect
let glassEffect = UIGlassEffect()
glassEffect.tintColor = .systemBlue
glassEffect.isInteractive = true

// Apply via UIVisualEffectView
let effectView = UIVisualEffectView(effect: glassEffect)
effectView.frame = CGRect(x: 0, y: 0, width: 200, height: 50)
effectView.layer.cornerRadius = 25
effectView.clipsToBounds = true

view.addSubview(effectView)

// Add content to the glass
let label = UILabel()
label.text = "Glass Button"
label.textAlignment = .center
effectView.contentView.addSubview(label)
```

#### UIGlassContainerEffect (Multiple Glass Elements)

```swift
// Container for multiple glass elements
let containerEffect = UIGlassContainerEffect()
let containerView = UIVisualEffectView(effect: containerEffect)
containerView.frame = view.bounds

// Create individual glass views inside the container
let glass1 = UIVisualEffectView(effect: UIGlassEffect())
glass1.frame = CGRect(x: 20, y: 20, width: 150, height: 50)

let glass2 = UIVisualEffectView(effect: UIGlassEffect())
glass2.frame = CGRect(x: 20, y: 80, width: 150, height: 50)

containerView.contentView.addSubview(glass1)
containerView.contentView.addSubview(glass2)

view.addSubview(containerView)
```

#### UINavigationBar with Glass

```swift
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Navigation bar adopts glass automatically on iOS 26
        // To customize:
        let appearance = UINavigationBarAppearance()
        appearance.configureWithDefaultBackground() // Uses glass on iOS 26
        
        navigationController?.navigationBar.standardAppearance = appearance
        navigationController?.navigationBar.scrollEdgeAppearance = appearance
    }
}
```

### Backward Compatibility Patterns

For apps supporting pre-iOS 26:

```swift
// SwiftUI: Conditional glass effect
struct CompatibleGlassView: View {
    var body: some View {
        Text("Content")
            .padding()
            .modifier(GlassBackgroundModifier())
    }
}

struct GlassBackgroundModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(iOS 26, *) {
            content.glassEffect()
        } else {
            content.background(.ultraThinMaterial, in: .capsule)
        }
    }
}
```

```swift
// UIKit: Conditional glass effect
func applyGlassEffect(to view: UIView) {
    if #available(iOS 26, *) {
        let effect = UIGlassEffect()
        let effectView = UIVisualEffectView(effect: effect)
        effectView.frame = view.bounds
        effectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.insertSubview(effectView, at: 0)
    } else {
        let blur = UIBlurEffect(style: .systemUltraThinMaterial)
        let blurView = UIVisualEffectView(effect: blur)
        blurView.frame = view.bounds
        blurView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.insertSubview(blurView, at: 0)
    }
}
```

### Configuration Requirements

| Requirement | Detail |
|---|---|
| **Minimum deployment** | iOS 26.0, macOS 26.0, watchOS 26.0, tvOS 26.0, visionOS 26.0 |
| **Xcode version** | Xcode 26+ |
| **Import** | `import SwiftUI` (for SwiftUI) or `import UIKit` (for UIKit) |
| **Automatic adoption** | Recompile with new SDK; no code changes for system components |

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Glass on glass without container | Wrap in `GlassEffectContainer` |
| Overusing tint | Use only for semantic meaning |
| Missing `@Namespace` for morphing | Declare `@Namespace` and use with `glassEffectID` |
| No animation wrapper | Use `withAnimation` when changing states that affect glass morphing |
| UIKit glass without `contentView` | Add subviews to `effectView.contentView`, not `effectView` directly |
| Hard-coded colors replacing glass | Let the system manage glass appearance; avoid overriding |
| Not testing with Reduce Transparency | Always test with accessibility settings enabled |
| Glass applied after `.background()` | Apply `.glassEffect()` **last** in the modifier chain |

### References

- https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass
- https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views
- https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:)
- https://developer.apple.com/documentation/swiftui/glass
- https://developer.apple.com/documentation/swiftui/glasseffectcontainer
- https://developer.apple.com/videos/play/wwdc2025/323/
- https://developer.apple.com/videos/play/wwdc2025/284/ (Build a UIKit app with the new design)
- https://swiftwithmajid.com/2025/07/16/glassifying-custom-swiftui-views/
- https://dev.to/arshtechpro/understanding-glasseffectcontainer-in-ios-26-2n8p
- https://github.com/conorluddy/LiquidGlassReference
- https://www.donnywals.com/designing-custom-ui-with-liquid-glass-on-ios-26/

---

## 7. Landmarks -- Building an App with Liquid Glass

**Apple Doc:** https://developer.apple.com/documentation/SwiftUI/Landmarks-Building-an-app-with-Liquid-Glass
**Related:** https://developer.apple.com/documentation/SwiftUI/Landmarks-Refining-the-system-provided-glass-effect-in-toolbars
**WWDC Session:** https://developer.apple.com/videos/play/wwdc2025/323/ (Build a SwiftUI app with the new design)

### Overview

The Landmarks tutorial is Apple's canonical example of adopting Liquid Glass in a SwiftUI app. It demonstrates:
- How system components automatically adopt Liquid Glass
- Creating custom badge views with glass effects
- Customizing glass shapes for distinctive UI elements
- Refining toolbar glass with spacing and grouping
- Navigation transitions that work with glass

### Automatic System Adoption

When you recompile the Landmarks app with Xcode 26, the following adopt Liquid Glass automatically with **no code changes**:

```swift
// NavigationStack gets glass navigation bar automatically
NavigationStack {
    List(landmarks) { landmark in
        NavigationLink(value: landmark) {
            LandmarkRow(landmark: landmark)
        }
    }
    .navigationTitle("Landmarks")
    // ^ Glass navigation bar appears automatically
}

// TabView gets floating glass tab bar automatically
TabView {
    Tab("Featured", systemImage: "star") {
        FeaturedView()
    }
    Tab("List", systemImage: "list.bullet") {
        LandmarkList()
    }
    Tab("Profile", systemImage: "person") {
        ProfileView()
    }
}
// ^ Floating glass tab bar appears automatically
```

### Badge View with Glass Effect

The Landmarks tutorial creates a custom badge view using glass:

```swift
struct BadgeView: View {
    var text: String
    var color: Color
    
    var body: some View {
        Text(text)
            .font(.caption2)
            .fontWeight(.semibold)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .glassEffect(.regular.tint(color), in: .capsule)
    }
}

// Usage
struct LandmarkDetailView: View {
    var landmark: Landmark
    
    var body: some View {
        VStack {
            // Hero image
            landmark.image
                .resizable()
                .aspectRatio(contentMode: .fill)
            
            VStack(alignment: .leading) {
                HStack {
                    Text(landmark.name)
                        .font(.title)
                    
                    if landmark.isFavorite {
                        BadgeView(text: "Favorite", color: .yellow)
                    }
                    
                    if landmark.isFeatured {
                        BadgeView(text: "Featured", color: .purple)
                    }
                }
                
                Text(landmark.park)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            .padding()
        }
    }
}
```

### Custom Glass Shapes for Badges

The tutorial demonstrates using custom shapes for distinctive badge appearances:

```swift
struct HexagonBadge: View {
    var count: Int
    
    var body: some View {
        Text("\(count)")
            .font(.title3)
            .fontWeight(.bold)
            .frame(width: 50, height: 50)
            .glassEffect(.regular.tint(.orange), in: HexagonShape())
    }
}

struct HexagonShape: Shape {
    func path(in rect: CGRect) -> Path {
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) / 2
        var path = Path()
        
        for i in 0..<6 {
            let angle = Angle(degrees: Double(i) * 60 - 90)
            let point = CGPoint(
                x: center.x + radius * cos(angle.radians),
                y: center.y + radius * sin(angle.radians)
            )
            if i == 0 {
                path.move(to: point)
            } else {
                path.addLine(to: point)
            }
        }
        path.closeSubpath()
        return path
    }
}
```

### Interactive Glass Controls

For buttons and interactive elements in the Landmarks app:

```swift
struct FavoriteButton: View {
    @Binding var isFavorite: Bool
    
    var body: some View {
        Button {
            isFavorite.toggle()
        } label: {
            Image(systemName: isFavorite ? "heart.fill" : "heart")
                .foregroundStyle(isFavorite ? .red : .primary)
                .frame(width: 44, height: 44)
        }
        .glassEffect(.regular.interactive(), in: .circle)
    }
}
```

### Toolbar Glass Refinement

The Landmarks tutorial demonstrates organizing toolbars using `ToolbarSpacer` and `ToolbarItemGroup`:

```swift
struct LandmarkDetailView: View {
    @State private var landmark: Landmark
    
    var body: some View {
        ScrollView {
            // Content
        }
        .toolbar {
            // Primary action -- gets glass prominence automatically
            ToolbarItem(placement: .confirmationAction) {
                Button("Save") {
                    saveLandmark()
                }
            }
            
            // Spacer separates action groups
            ToolbarSpacer(.flexible)
            
            // Grouped secondary actions
            ToolbarItemGroup(placement: .primaryAction) {
                Button("Share", systemImage: "square.and.arrow.up") {
                    shareLandmark()
                }
                
                Button("Favorite", systemImage: landmark.isFavorite ? "heart.fill" : "heart") {
                    landmark.isFavorite.toggle()
                }
            }
            
            // Fixed spacer for precise layout
            ToolbarSpacer(.fixed, spacing: 20)
            
            // Cancel action
            ToolbarItem(placement: .cancellationAction) {
                Button("Cancel") {
                    cancelEditing()
                }
            }
        }
    }
}
```

**ToolbarSpacer types:**

```swift
// Flexible spacer -- pushes items apart
ToolbarSpacer(.flexible)

// Fixed spacer -- specific pixel width
ToolbarSpacer(.fixed, spacing: 20)
```

**ToolbarItemPlacement effects on glass:**

| Placement | Glass Behavior |
|---|---|
| `.confirmationAction` | Glass prominent button style |
| `.cancellationAction` | Standard glass button |
| `.primaryAction` | Default glass styling |
| `.destructiveAction` | Red-tinted glass |
| `.automatic` | System-determined placement |

### Glass Button Style

The Landmarks tutorial uses the new `.glass` button style:

```swift
struct ActionButtonsView: View {
    var body: some View {
        VStack(spacing: 12) {
            // Glass button style (new in iOS 26)
            Button("Directions") {
                openDirections()
            }
            .buttonStyle(.glass)
            
            // Tinted glass button
            Button("Book Tour") {
                bookTour()
            }
            .buttonStyle(.glass)
            .tint(.green)
            
            // Bordered prominent with glass (automatic)
            Button("Reserve") {
                reserve()
            }
            .buttonStyle(.borderedProminent)
            // On iOS 26, borderedProminent automatically gets glass appearance
        }
    }
}
```

### Navigation Transitions with Glass

Glass elements participate in navigation transitions smoothly:

```swift
struct LandmarkList: View {
    @State private var landmarks: [Landmark] = []
    
    var body: some View {
        NavigationStack {
            List(landmarks) { landmark in
                NavigationLink(value: landmark) {
                    LandmarkRow(landmark: landmark)
                }
            }
            .navigationTitle("Landmarks")
            .navigationDestination(for: Landmark.self) { landmark in
                LandmarkDetailView(landmark: landmark)
            }
        }
        // Glass navigation bar transitions smoothly between list and detail
    }
}
```

### Floating Action Button with Glass

A common pattern from the Landmarks tutorial:

```swift
struct MapView: View {
    @State private var showFilters = false
    @Namespace private var mapGlass
    
    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            Map { /* annotations */ }
            
            GlassEffectContainer(spacing: 16) {
                VStack(spacing: 12) {
                    if showFilters {
                        // Filter buttons appear with morphing animation
                        ForEach(LandmarkCategory.allCases, id: \.self) { category in
                            Button {
                                filterByCategory(category)
                            } label: {
                                Image(systemName: category.iconName)
                                    .frame(width: 44, height: 44)
                            }
                            .glassEffect(.regular.tint(category.color).interactive(), in: .circle)
                            .glassEffectID("filter_\(category.rawValue)", in: mapGlass)
                            .transition(.blurReplace)
                        }
                    }
                    
                    // Main FAB button
                    Button {
                        withAnimation(.bouncy) {
                            showFilters.toggle()
                        }
                    } label: {
                        Image(systemName: showFilters ? "xmark" : "line.3.horizontal.decrease")
                            .font(.title2)
                            .frame(width: 56, height: 56)
                    }
                    .glassEffect(.regular.tint(.blue).interactive(), in: .circle)
                    .glassEffectID("mainFAB", in: mapGlass)
                }
            }
            .padding()
        }
    }
}
```

### Complete Landmarks Detail View with Glass

Bringing together all the glass concepts:

```swift
struct LandmarkDetailView: View {
    @State var landmark: Landmark
    @Namespace private var detailGlass
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Hero image with glass overlay badges
                ZStack(alignment: .bottomLeading) {
                    landmark.image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(height: 300)
                        .clipped()
                    
                    // Badge overlay using GlassEffectContainer
                    GlassEffectContainer {
                        HStack(spacing: 8) {
                            if landmark.isFeatured {
                                BadgeView(text: "Featured", color: .purple)
                            }
                            
                            BadgeView(text: landmark.category.rawValue, color: .blue)
                            
                            BadgeView(text: landmark.state, color: .green)
                        }
                    }
                    .padding()
                }
                
                // Detail content
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        Text(landmark.name)
                            .font(.title)
                        
                        Spacer()
                        
                        FavoriteButton(isFavorite: $landmark.isFavorite)
                    }
                    
                    Text(landmark.park)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                    
                    Divider()
                    
                    Text("About \(landmark.name)")
                        .font(.title2)
                    
                    Text(landmark.description)
                }
                .padding()
            }
        }
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Directions") {
                    openDirections()
                }
            }
            
            ToolbarSpacer(.flexible)
            
            ToolbarItemGroup(placement: .primaryAction) {
                ShareLink(item: landmark.url)
                
                Button("Bookmark", systemImage: "bookmark") { }
            }
        }
        // Content extends behind the glass navigation bar
        .ignoresSafeArea(edges: .top)
    }
}
```

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Badges overlapping without container | Wrap nearby badges in `GlassEffectContainer` |
| Toolbar items not splitting | Use `ToolbarSpacer(.flexible)` between groups |
| Glass FAB not morphing | Ensure `@Namespace` and `glassEffectID` are set; wrap in `withAnimation` |
| Hero image not behind glass nav bar | Use `.ignoresSafeArea(edges: .top)` |
| Glass badges unreadable on complex backgrounds | Use `.tint()` to ensure contrast; test with various backgrounds |
| Custom toolbar background overriding glass | Remove custom `toolbarBackground` modifiers; let system handle glass |

### References

- https://developer.apple.com/documentation/SwiftUI/Landmarks-Building-an-app-with-Liquid-Glass
- https://developer.apple.com/documentation/SwiftUI/Landmarks-Refining-the-system-provided-glass-effect-in-toolbars
- https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views
- https://developer.apple.com/videos/play/wwdc2025/323/
- https://swiftwithmajid.com/2025/07/01/glassifying-toolbars-in-swiftui/
- https://swiftwithmajid.com/2025/07/16/glassifying-custom-swiftui-views/
- https://swiftwithmajid.com/2025/07/23/glassifying-custom-swiftui-views-groups/
- https://swiftwithmajid.com/2025/06/24/glassifying-tabs-in-swiftui/
- https://www.createwithswift.com/adapting-toolbar-elements-to-the-liquid-glass-design-system/
- https://medium.com/@shubhamsanghavi100/swiftui-2025-glass-button-style-liquid-glass-ui-and-toolbarspacer-explained-wwdc-2025-b59e891c8849

---

## Cross-Reference: Related API Bible Entries

| Topic | Related Bible Entry |
|---|---|
| Live Activity deep links | [widgets/COMPREHENSIVE-REFERENCE.md](widgets/COMPREHENSIVE-REFERENCE.md) |
| AVFoundation audio | [avfoundation/AVAUDIOENGINE-REFERENCE.md](avfoundation/AVAUDIOENGINE-REFERENCE.md) |
| SwiftData models & queries | [swiftdata/SWIFTDATA-COMPREHENSIVE-REFERENCE.md](swiftdata/SWIFTDATA-COMPREHENSIVE-REFERENCE.md) |
| Liquid Glass in SwiftUI | [swiftui/COMPREHENSIVE-REFERENCE.md](swiftui/COMPREHENSIVE-REFERENCE.md) |
| Swift 6 concurrency | [swift6/COMPREHENSIVE-REFERENCE.md](swift6/COMPREHENSIVE-REFERENCE.md) |

---

## Change Log

| Date | Change |
|---|---|
| 2026-04-07 | Initial creation -- 7 Apple documentation topics researched and documented |
