# iOS 26 Crash Prevention Cheat Sheet

> Universal crash prevention rules for all iOS 26 development.
> For framework-specific patterns, load the matching essentials file.
>
> Last verified: 2026-04-08
> Sources: Apple Developer Documentation, production crash reports

---

## The 12 Commandments of iOS 26 Development

### 1. @MainActor on ALL UI-Related Code
```swift
// RIGHT
@MainActor @Observable
class TimerViewModel {
    var timeRemaining: Int = 1500
}

// WRONG — crash on background update
class BadViewModel: ObservableObject {
    @Published var timeRemaining: Int = 1500
}
```

### 2. @preconcurrency ONLY When the Compiler Demands It

> **Reversed guidance (2026-04-03):** iOS 26 first-party frameworks ship with Sendable annotations. Prophylactic `@preconcurrency` masks real concurrency bugs. Add it ONLY where the compiler specifically warns on a single import.

```swift
// RIGHT — compiler specifically demanded it for this legacy framework
@preconcurrency import LegacyBinaryFramework

// WRONG — masks real issues; do not add prophylactically
@preconcurrency import AVFoundation
@preconcurrency import EventKit
```

### 3. Nonisolated for Audio/Speech Callbacks
```swift
// RIGHT — called on audio queue, NOT MainActor
nonisolated private func processBuffer(_ buffer: AVAudioPCMBuffer) {
    // Safe from audio queue
}

// WRONG — crash: MainActor from non-main thread
@MainActor func processBuffer(_ buffer: AVAudioPCMBuffer) { }
```

### 4. AVAudioEngine Tap Timing
```swift
// RIGHT — install BEFORE start, remove BEFORE stop
inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { ... }
engine.prepare()
try engine.start()
// ...
inputNode.removeTap(onBus: 0)
engine.stop()

// WRONG — crash both ways
engine.start()
inputNode.installTap(...)  // Crash: can't install after start
```

### 5. SwiftData Default Values
```swift
// RIGHT — all properties initialized
@Model final class Session {
    var name: String
    var duration: Int
    var createdAt: Date
    
    init(name: String) {
        self.name = name
        self.duration = 1500
        self.createdAt = Date()
    }
}

// WRONG — crash on insert
@Model final class BadSession {
    var name: String  // No default! Crash
}
```

### 6. ModelContext Thread Safety
```swift
// RIGHT — pass identifier, not model
func processOnBackground(id: PersistentIdentifier) async {
    let ctx = ModelContext(container)
    let session = ctx.model(for: id) as! Session
}

// WRONG — crash: wrong actor
Task.detached {
    modelContext.insert(session)  // Data race
}
```

### 7. @Observable Instead of ObservableObject
```swift
// RIGHT — modern pattern
@MainActor @Observable
class ViewModel {
    var count: Int = 0  // No @Published needed
}

// WRONG — legacy, causes issues with Swift 6
class ViewModel: ObservableObject {
    @Published var count: Int = 0
}
```

### 8. Task Cancellation
```swift
// RIGHT — store and cancel
private var currentTask: Task<Void, Never>?

func start() {
    currentTask?.cancel()
    currentTask = Task {
        guard !Task.isCancelled else { return }
        await doWork()
    }
}

// WRONG — orphaned task, can't cancel
func badStart() {
    Task { await doWork() }
}
```

### 9. Sheet Environment Propagation
```swift
// RIGHT — pass modelContext to sheet
.sheet(isPresented: $showSheet) {
    DetailView()
        .modelContext(modelContext)
}

// WRONG — crash: no modelContext
.sheet(isPresented: $showSheet) {
    DetailView()
}
```

### 10. Sendable Boundaries
```swift
// RIGHT — Sendable DTO
struct UserDTO: Sendable {
    let id: UUID
    let name: String
}

// WRONG — non-Sendable crossing boundary
actor BadProcessor {
    func process(users: [User]) async { }  // User not Sendable
}
```

### 11. Never Subscript Arrays Without Guards
```swift
// WRONG — crash: EXC_BREAKPOINT when empty
let item = array.last ?? array[0]  // .last is nil -> array[0] traps

// RIGHT — guard first
guard !array.isEmpty else { return }
let item = array.last!
```

**Why:** SwiftUI evaluates view bodies during NavigationStack push BEFORE `onAppear` fires. Arrays populated in `onAppear` are empty on first render.

### 12. @ObservationIgnored for nonisolated(unsafe) Properties
```swift
// WRONG — nonisolated(unsafe) has no effect on @Observable stored properties
@Observable class Service {
    nonisolated(unsafe) private var counter: Int = 0
}

// RIGHT — opt out of observation first
@Observable class Service {
    @ObservationIgnored nonisolated(unsafe) private var counter: Int = 0
}
```

---

## Error Message Decoder Ring

| Error Message | Cause | Fix |
|--------------|-------|-----|
| `Main actor-isolated property 'x' can not be mutated from non-isolated context` | Updating UI from background | `@MainActor` or `await MainActor.run` |
| `Call to main actor-isolated initializer in a synchronous nonisolated context` | Creating UI object off main | `await MainActor.run` or mark caller `@MainActor` |
| `Sendable class 'X' does not conform to 'Sendable'` | Class crossing isolation | Make `final` + `Sendable`, or use actor |
| `Reference to captured var in concurrently-executing code` | Mutable capture in concurrent closure | `let` capture or Sendable wrapper |
| `Cannot use staged migration with unknown model version` | SwiftData schema mismatch | Delete app or implement migration |
| `Failed to fulfill faulting for relationship` | Accessing unloaded relationship | Prefetch or access on same context |
| `Cannot start an audio tap when the engine is running` | Wrong AVAudioEngine timing | Install tap BEFORE `engine.start()` |

---

## Build Settings That Catch Crashes

```yaml
SWIFT_VERSION: "6.0"
SWIFT_STRICT_CONCURRENCY: complete
SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
SWIFT_TREAT_WARNINGS_AS_ERRORS: YES
```

---

## Pre-Commit Checklist

- [ ] Archive build passes (catches strict concurrency errors debug misses)
- [ ] All @MainActor annotations present on UI code
- [ ] @preconcurrency added ONLY where compiler specifically demands it (not prophylactically)
- [ ] AVAudioEngine tap timing correct (install before start, remove before stop)
- [ ] SwiftData models have default values for all non-optional properties
- [ ] Nonisolated on audio/speech callbacks
- [ ] ModelContext not passed between actors
- [ ] nonisolated deinit on all @MainActor classes

---

## Quick Fixes

### Update UI from a callback
```swift
Task { @MainActor in self.state = newState }
```

### Access non-Sendable from Task
```swift
let captured = nonSendable
Task { @MainActor [captured] in /* use captured */ }
```

### Pass SwiftData between actors
```swift
let id = session.persistentModelID
Task.detached {
    let ctx = ModelContext(container)
    let s = ctx.model(for: id) as! Session
}
```

---

### References
- https://developer.apple.com/documentation/swift/sendable
- https://developer.apple.com/documentation/observation/observable()
- https://developer.apple.com/documentation/swiftdata
- https://developer.apple.com/documentation/avfaudio/avaudioengine
- https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-26-release-notes
