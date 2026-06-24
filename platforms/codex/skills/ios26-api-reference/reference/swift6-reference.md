# Swift 6 Strict Concurrency: Comprehensive Reference

> **The definitive reference for Swift 6 concurrency as it applies to iOS 26 app development.**
> Compiled from Apple documentation, Swift Evolution proposals, Swift Forums, WWDC sessions,
> and battle-tested patterns from production iOS apps.
>
> **Last updated:** 2026-04-07

---

## Table of Contents

1. [Build Settings: SWIFT_STRICT_CONCURRENCY & SWIFT_DEFAULT_ACTOR_ISOLATION](#1-build-settings)
2. [@MainActor: The Foundation](#2-mainactor)
3. [Task Isolation Inheritance](#3-task-isolation-inheritance)
4. [Sendable Protocol & @Sendable Closures](#4-sendable)
5. [@MainActor Classes with Background Callbacks (AVAudioEngine)](#5-mainactor-with-background-callbacks)
6. [deinit in @MainActor Classes](#6-deinit)
7. [nonisolated(unsafe): When and Why](#7-nonisolated-unsafe)
8. [@preconcurrency Import](#8-preconcurrency)
9. [GlobalActor Protocol](#9-globalactor)
10. [Actor Declaration](#10-actors)
11. [TaskGroup](#11-taskgroup)
12. [Swift 6.2: @concurrent and nonisolated(nonsending)](#12-swift-62)
13. [Archive vs Debug: The Hidden Trap](#13-archive-vs-debug)
14. [Complete Crash Catalog](#14-crash-catalog)
15. [Quick Decision Matrix](#15-decision-matrix)

---

## 1. Build Settings

### SWIFT_STRICT_CONCURRENCY

Controls how aggressively the compiler checks for data races.

| Value | Behavior |
|-------|----------|
| `minimal` | Only checks explicitly concurrent code (Sendable conformances you wrote) |
| `targeted` | Checks code that adopts concurrency features |
| `complete` | **Full data race safety.** All code is checked. This is the Swift 6 default. |

```yaml
# project.yml
settings:
  SWIFT_STRICT_CONCURRENCY: complete
```

**Critical:** Debug builds with `-Onone` do NOT catch all strict concurrency errors. Archive builds with `-O` optimization enforce full isolation checking. Always run archive builds before pushing.

### SWIFT_DEFAULT_ACTOR_ISOLATION

**New in Swift 6.2 / Xcode 26.** Controls the default isolation for declarations that have no explicit annotation.

| Value | Behavior |
|-------|----------|
| `nonisolated` | **Legacy default.** Declarations are non-isolated unless annotated. |
| `MainActor` | **New default for new projects.** ALL declarations are `@MainActor` unless marked `nonisolated` or `@concurrent`. |

```yaml
# project.yml — per-target setting
targets:
  MyApp-iOS:
    settings:
      SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
```

#### What becomes @MainActor when set to `MainActor`:

- All class/struct/enum properties and methods
- All global variables and functions  
- All async functions in isolated types
- Closures inherit isolation from enclosing context

#### What does NOT become @MainActor:

- Functions explicitly marked `nonisolated`
- Functions explicitly marked `@concurrent`
- Types declared as `actor` (they have their own isolation)
- Code with explicit isolation to a different actor

#### Anti-Pattern: Double Annotation

```swift
// WRONG: When SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor
// Adding explicit @MainActor creates "nested MainActor" which can cause
// deinit crashes in tests (SIGABRT in swift_task_deinitOnExecutorImpl)
@MainActor  // <-- REMOVE THIS — it's redundant and causes crashes
@Observable
class MyService { }

// CORRECT: Rely on the build setting
@Observable
class MyService { }  // Implicitly @MainActor from build setting
```

#### SPM Packages

SPM packages do NOT inherit the Xcode build setting. You must explicitly set it:

```swift
// Package.swift (requires Swift tools version 6.2+)
.target(
    name: "MyTarget",
    defaultIsolation: MainActor.self
)
```

---

## 2. @MainActor: The Foundation

### What It Is

`@MainActor` is a global actor that serializes all access to the main thread. It is the single most important concurrency annotation for iOS apps because all UI updates must happen on the main thread.

```swift
@globalActor
public struct MainActor: GlobalActor {
    public static let shared: MainActor
    
    /// Execute a closure on the main actor (requires await from non-MainActor context)
    public static func run<T>(
        resultType: T.Type = T.self,
        body: @MainActor @Sendable () throws -> T
    ) async rethrows -> T
    
    /// Assert that we're already on the main actor (crashes if not)
    public static func assumeIsolated<T>(
        _ operation: @MainActor () throws -> T,
        file: StaticString = #file,
        line: UInt = #line
    ) rethrows -> T
}
```

### Applying @MainActor

```swift
// On a class — ALL members become MainActor-isolated
@MainActor
class PresentationViewModel {
    var currentSection: Int = 0      // MainActor-isolated
    func advance() { }              // MainActor-isolated
    
    // Opt out for pure computation
    nonisolated func calculateDuration(_ sections: [Section]) -> TimeInterval {
        sections.reduce(0) { $0 + $1.duration }
    }
}

// On a method — only that method is MainActor-isolated
class DataProcessor {
    func process() async -> Data { }  // Non-isolated
    
    @MainActor
    func updateUI(with data: Data) { }  // MainActor-isolated
}

// On a property
class Cache {
    @MainActor var displayItems: [Item] = []
}
```

### MainActor.run vs Task { @MainActor in }

```swift
// MainActor.run — REQUIRES an async context (you must already be in async code)
func fetchData() async {
    let data = await networkService.fetch()
    await MainActor.run {
        self.items = data  // Guaranteed main thread
    }
}

// Task { @MainActor in } — CREATES an async context (can be called from sync code)
nonisolated func didReceiveCallback(data: Data) {
    Task { @MainActor [weak self] in
        self?.items = data  // Guaranteed main thread
    }
}
```

**Rule of thumb:**
- Inside `async` functions: use `await MainActor.run { }`
- Inside sync callbacks from frameworks: use `Task { @MainActor in }`

### MainActor.assumeIsolated — When You Know Better

Use ONLY when you have documentation-backed proof that the callback runs on the main thread.

```swift
// CORRECT: Apple docs guarantee this notification fires on .main queue
NotificationCenter.default.addObserver(
    forName: AVAudioSession.interruptionNotification,
    object: nil,
    queue: .main  // <-- Guaranteed main thread
) { [weak self] notification in
    MainActor.assumeIsolated {
        self?.handleInterruption(notification)
    }
}

// WRONG: AVAudioEngine tap does NOT run on main thread
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, time in
    MainActor.assumeIsolated {  // CRASH: Not on main thread!
        self.processBuffer(buffer)
    }
}
```

---

## 3. Task Isolation Inheritance

This is one of the most misunderstood aspects of Swift 6 concurrency and a major source of crashes.

### Task { } — Inherits Caller's Isolation

`Task { }` inherits the actor isolation of the enclosing scope at **compile time** (via `@_inheritActorContext`).

```swift
@MainActor
class PresentationViewModel {
    var status: String = "idle"
    
    func startSession() {
        // This Task inherits @MainActor from PresentationViewModel
        Task {
            let data = await fetchData()
            self.status = "loaded"  // SAFE: Task is on MainActor
        }
    }
}
```

### Task { } with [weak self] — Still Inherits

The capture list does NOT change isolation inheritance. `[weak self]` prevents a retain cycle but the Task still runs on the same actor.

```swift
@MainActor
class PresentationViewModel {
    func load() {
        // Still @MainActor even with [weak self]
        Task { [weak self] in
            guard let self else { return }
            let data = await fetchData()
            self.status = "loaded"  // SAFE: Still on MainActor
        }
    }
}
```

### Task { @MainActor in } — Explicit (Redundant Inside @MainActor)

Inside a `@MainActor` context, writing `Task { @MainActor in }` is redundant but harmless. It is **essential** when called from a non-isolated context.

```swift
// From NONISOLATED context — @MainActor annotation is REQUIRED
nonisolated func audioCallback(buffer: AVAudioPCMBuffer) {
    // Without @MainActor, this Task would be non-isolated
    Task { @MainActor [weak self] in
        self?.currentPowerLevel = calculateRMS(buffer)
    }
}
```

### Task.detached { } — Does NOT Inherit

`Task.detached` creates a completely independent task with no actor inheritance, no priority inheritance, and no task-local value inheritance.

```swift
@MainActor
class ViewModel {
    func processImage() {
        // This runs on a background thread — NOT MainActor
        Task.detached(priority: .userInitiated) {
            let processed = await self.heavyImageProcessing()
            
            // Must explicitly hop back to MainActor
            await MainActor.run {
                self.image = processed
            }
        }
    }
}
```

### The Complete Comparison

```swift
@MainActor
class Example {
    func demonstrate() {
        // 1. Task { } — inherits @MainActor
        Task {
            self.update()  // SAFE: on MainActor
        }
        
        // 2. Task { [weak self] in } — still inherits @MainActor
        Task { [weak self] in
            self?.update()  // SAFE: on MainActor
        }
        
        // 3. Task { @MainActor in } — explicit MainActor (redundant here)
        Task { @MainActor in
            self.update()  // SAFE: on MainActor (explicitly)
        }
        
        // 4. Task.detached { } — NO inheritance, runs on background
        Task.detached {
            // self.update()  // ERROR: Not on MainActor
            await MainActor.run {
                self.update()  // SAFE: explicitly hopped
            }
        }
    }
}
```

### WRONG vs RIGHT: Task from nonisolated callback

```swift
// WRONG: Task in nonisolated context does NOT inherit MainActor
nonisolated func onAudioBuffer(_ buffer: AVAudioPCMBuffer) {
    Task {
        // This Task is NOT on MainActor — it inherits "nonisolated"
        self.currentPowerLevel = 0.5  // CRASH: accessing MainActor property
    }
}

// RIGHT: Explicitly annotate the Task
nonisolated func onAudioBuffer(_ buffer: AVAudioPCMBuffer) {
    Task { @MainActor [weak self] in
        self?.currentPowerLevel = 0.5  // SAFE: explicitly on MainActor
    }
}
```

---

## 4. Sendable Protocol & @Sendable Closures

### The Sendable Protocol

`Sendable` is a marker protocol indicating a type can safely cross isolation boundaries (be passed between actors/tasks without causing data races).

```swift
public protocol Sendable { }
```

### What Is Automatically Sendable

| Type | Sendable If... |
|------|----------------|
| Struct | All stored properties are Sendable |
| Enum | All associated values are Sendable |
| Actor | Always Sendable (inherently) |
| Class | `final` + all stored properties are immutable (`let`) + all properties are Sendable |
| Tuple | All elements are Sendable |
| Closure | Annotated `@Sendable` and captures only Sendable values |

```swift
// Automatically Sendable
struct ContentSection: Sendable {
    let title: String
    let duration: TimeInterval
}

enum SessionState: Sendable {
    case idle
    case running(section: Int)
    case paused
}

// NOT Sendable — mutable class
class MutableConfig {
    var apiKey: String = ""  // Mutable -> not Sendable
}
```

### @unchecked Sendable

Use when YOU guarantee thread safety but the compiler cannot verify it.

```swift
// CORRECT: Thread-safe via NSLock
final class ThreadSafeCache: @unchecked Sendable {
    private var storage: [String: Data] = [:]
    private let lock = NSLock()
    
    func get(_ key: String) -> Data? {
        lock.lock()
        defer { lock.unlock() }
        return storage[key]
    }
}

// CORRECT: Immutable after init but compiler can't prove it
final class ImmutableWrapper: @unchecked Sendable {
    let formatter: DateFormatter  // DateFormatter is NOT Sendable
    
    init() {
        self.formatter = DateFormatter()
        self.formatter.dateFormat = "yyyy-MM-dd"
        // Immutable after init — safe to share
    }
}
```

### @Sendable Closures

A `@Sendable` closure can only capture Sendable values and cannot capture mutable local variables.

```swift
// The installTap closure is @Sendable because it's called on a background thread
audioEngine.inputNode.installTap(
    onBus: 0,
    bufferSize: 1024,
    format: format
) { @Sendable [weak self] buffer, time in
    // Can only capture Sendable values
    // [weak self] is fine — optional references are Sendable
    let power = self?.calculateRMS(from: buffer) ?? 0.0
    
    // Must use Task to update MainActor state
    Task { @MainActor [weak self] in
        self?.currentPowerLevel = power
    }
}
```

### WRONG vs RIGHT: Capturing self in @Sendable

```swift
@MainActor
class SpeechService {
    var powerLevel: CGFloat = 0.0
    
    // WRONG: Directly accessing MainActor property from @Sendable closure
    func setupTap() {
        audioEngine.inputNode.installTap(
            onBus: 0, bufferSize: 1024, format: format
        ) { @Sendable buffer, time in
            self.powerLevel = 0.5  // CRASH: MainActor property from audio thread
        }
    }
    
    // RIGHT: Bridge via Task
    func setupTap() {
        audioEngine.inputNode.installTap(
            onBus: 0, bufferSize: 1024, format: format
        ) { @Sendable [weak self] buffer, time in
            let power = self?.calculateRMS(from: buffer) ?? 0.0
            Task { @MainActor [weak self] in
                self?.powerLevel = power  // SAFE
            }
        }
    }
}
```

---

## 5. @MainActor Classes with Background Callbacks (AVAudioEngine)

This is the #1 crash pattern in apps using AVAudioEngine. The `installTap` closure runs on a **realtime audio thread**, not the main thread. When a `@MainActor` class receives these callbacks, you must bridge carefully.

### The Crash Pattern

```swift
// CRASH: @MainActor class directly handles audio callback
@MainActor
@Observable
class BadSpeechService {
    var currentPowerLevel: CGFloat = 0.0
    
    func startRecording() {
        let inputNode = audioEngine.inputNode
        
        // installTap callback runs on AUDIO THREAD, not main thread
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, time in
            // CRASH: Accessing @MainActor property from audio thread
            self.currentPowerLevel = self.calculateRMS(from: buffer)
        }
    }
}
```

### The Correct Pattern (Proven in Production)

```swift
@Observable
class SpeechService {
    // MainActor-isolated state (via SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor)
    var currentPowerLevel: CGFloat = 0.0
    var listeningStatus: ListeningStatus = .inactive
    
    // Task reference for deinit cleanup
    @ObservationIgnored nonisolated(unsafe) private var _transcriptionTaskForDeinit: Task<Void, Never>?
    
    // Track tap installation to prevent unbalanced removeTap
    @ObservationIgnored nonisolated(unsafe) private var _inputTapInstalled = false
    
    nonisolated deinit {
        _transcriptionTaskForDeinit?.cancel()
    }
    
    // NONISOLATED: Audio processing runs on audio thread
    nonisolated private func calculateRMS(from buffer: AVAudioPCMBuffer) -> CGFloat {
        guard let channelData = buffer.floatChannelData?[0] else { return 0.0 }
        let frameLength = Int(buffer.frameLength)
        guard frameLength > 0 else { return 0.0 }
        
        var sum: Float = 0.0
        for i in 0..<frameLength {
            let sample = channelData[i]
            sum += sample * sample
        }
        let rms = sqrt(sum / Float(frameLength))
        let db = 20 * log10(max(rms, 0.00001))
        let normalized = (db + 60) / 54
        return CGFloat(max(0, min(1, normalized)))
    }
    
    // NONISOLATED: Install tap runs on caller's thread
    nonisolated private func installAudioTap(
        on inputNode: AVAudioInputNode,
        inputFormat: AVAudioFormat,
        outputFormat: AVAudioFormat,
        converter: AVAudioConverter,
        continuation: AsyncStream<AnalyzerInput>.Continuation,
        powerLevelHandler: @escaping @Sendable (CGFloat) -> Void
    ) {
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: inputFormat) {
            @Sendable [weak self] inputBuffer, _ in
            // 1. Calculate on audio thread (nonisolated, pure computation)
            let power = self?.calculateRMS(from: inputBuffer) ?? 0.0
            
            // 2. Report power level via Sendable handler
            powerLevelHandler(power)
            
            // 3. Convert and feed to speech analyzer (on audio thread)
            // ... conversion code ...
            continuation.yield(AnalyzerInput(buffer: convertedBuffer))
        }
    }
    
    // MAINACTOR: Setup orchestration
    @MainActor
    private func setupAndStartRecording(locale: Locale?) throws {
        // ... audio session setup ...
        
        // Install tap with a Sendable power handler that bridges to MainActor
        installAudioTap(
            on: inputNode,
            inputFormat: inputFormat,
            outputFormat: recordingFormat,
            converter: converter,
            continuation: continuation
        ) { [weak self] power in
            Task { @MainActor [weak self] in
                self?.currentPowerLevel = power
            }
        }
        _inputTapInstalled = true
        
        // ... start engine ...
    }
}
```

### Key Architecture Rules

1. **DO NOT mark the class `@MainActor` explicitly** when `SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` (causes nested deinit crashes)
2. **Mark audio processing methods `nonisolated`** — they run on the audio thread
3. **Mark the tap installer `nonisolated`** — the closure captures must be clean
4. **Use `@Sendable` on the tap closure** — it crosses isolation boundaries
5. **Bridge to MainActor via `Task { @MainActor in }`** — never directly access MainActor state from the audio thread
6. **Use a Sendable handler callback** — pass power levels through a `@Sendable (CGFloat) -> Void` closure that internally uses `Task { @MainActor in }`

---

## 6. deinit in @MainActor Classes

### The Fundamental Rule

**`deinit` is ALWAYS nonisolated.** Even if a class is `@MainActor`, `deinit` can run on ANY thread — whichever thread releases the last reference.

```swift
@MainActor
class ViewModel {
    var task: Task<Void, Never>?
    
    deinit {
        // WARNING: This runs on whatever thread releases the last reference
        // You CANNOT access MainActor-isolated properties here
        
        // task?.cancel()  // ERROR: 'task' is MainActor-isolated
    }
}
```

### Why deinit Is Not Isolated

The last reference to an object can be released on any thread. If ARC decrements the retain count to zero on a background thread, deinit runs there. The Swift runtime cannot guarantee deinit will be on any specific actor.

### The nonisolated(unsafe) Pattern for Task Cleanup

This is the proven production pattern:

```swift
@Observable
class SpeechService {
    // MainActor-isolated task reference (for normal code)
    private var transcriptionTask: Task<Void, Never>?
    
    // DUPLICATE reference for deinit access
    // nonisolated(unsafe) allows access from nonisolated deinit
    // @ObservationIgnored prevents Observation framework tracking
    @ObservationIgnored
    nonisolated(unsafe) private var _transcriptionTaskForDeinit: Task<Void, Never>?
    
    nonisolated deinit {
        // SAFE: Task.cancel() is thread-safe (Task is Sendable)
        _transcriptionTaskForDeinit?.cancel()
    }
    
    @MainActor
    func startRecording() {
        let task = Task { /* ... */ }
        transcriptionTask = task
        _transcriptionTaskForDeinit = task  // Keep duplicate reference
    }
}
```

### SE-0371: isolated deinit (Swift 6.1+)

SE-0371 introduces `isolated deinit` which inherits the class's actor isolation:

```swift
@MainActor
class ViewModel {
    var task: Task<Void, Never>?
    
    isolated deinit {
        // This deinit runs on @MainActor
        // You CAN access MainActor-isolated properties
        task?.cancel()  // SAFE with isolated deinit
    }
}
```

**Status:** Accepted and partially implemented in Swift 6.1, but compiler stability issues remain. The `nonisolated(unsafe)` pattern above is the reliable workaround until `isolated deinit` is fully stable.

### What NOT to Do in deinit

```swift
// WRONG: Using MainActor.assumeIsolated in deinit
@MainActor
class BadViewModel {
    deinit {
        MainActor.assumeIsolated {
            // CRASH if deinit runs on background thread
            self.cleanup()
        }
    }
}

// WRONG: Capturing self in Task from deinit
@MainActor
class AlsoBadViewModel {
    deinit {
        Task { @MainActor in
            self.cleanup()  // CRASH: self is being deallocated
            // self may be garbage memory by the time this Task runs
        }
    }
}

// WRONG: DispatchQueue.main.async in deinit
@MainActor
class StillBadViewModel {
    deinit {
        DispatchQueue.main.async {
            self.cleanup()  // CRASH: self extended past deallocation
        }
    }
}
```

### Correct Cleanup Patterns

```swift
// PATTERN 1: Explicit cleanup method (BEST)
@Observable
class ViewModel {
    private var task: Task<Void, Never>?
    
    /// Call this before releasing the ViewModel
    @MainActor
    func cleanup() {
        task?.cancel()
        task = nil
    }
    
    // Lightweight deinit as safety net
    @ObservationIgnored
    nonisolated(unsafe) private var _taskForDeinit: Task<Void, Never>?
    
    nonisolated deinit {
        _taskForDeinit?.cancel()
    }
}

// PATTERN 2: Cancel-only in deinit (ACCEPTABLE)
// Task.cancel() is safe from any thread because Task is Sendable
@Observable
class ViewModel {
    @ObservationIgnored
    nonisolated(unsafe) private var _task: Task<Void, Never>?
    
    nonisolated deinit {
        _task?.cancel()  // Safe: cancel() is thread-safe
    }
}
```

---

## 7. nonisolated(unsafe): When and Why

### What It Does

`nonisolated(unsafe)` removes a declaration from any actor isolation domain without compiler verification of thread safety. The developer takes full responsibility for ensuring no data races occur.

### When It Is Safe

1. **Task handles in deinit** — `Task` is `Sendable`, so accessing it from deinit is actually safe. The compiler just can't prove it because deinit is nonisolated while the property is MainActor-isolated.

2. **Thread-safe types in @MainActor classes** — `UserDefaults` is documented as thread-safe, so accessing it from any thread is fine.

3. **Write-once, read-many** — A property set once during init and never mutated.

4. **Bool flags for reentrancy tracking** — Simple atomic-like booleans that track state.

```swift
@Observable
class SpeechService {
    // SAFE: Task is Sendable, cancel() is thread-safe
    @ObservationIgnored
    nonisolated(unsafe) private var _transcriptionTaskForDeinit: Task<Void, Never>?
    
    // SAFE: Simple boolean, only read/written from controlled paths
    @ObservationIgnored
    nonisolated(unsafe) private var _inputTapInstalled = false
}

class TimerStateStore {
    // SAFE: UserDefaults is documented as thread-safe
    private nonisolated(unsafe) static let sharedDefaults: UserDefaults? = {
        UserDefaults(suiteName: "group.com.example.myapp")
    }()
}
```

### When It Is NOT Safe

```swift
// DANGEROUS: Mutable array accessed from multiple threads
@Observable
class BadService {
    nonisolated(unsafe) var results: [String] = []  // DATA RACE!
    
    func addResult(_ r: String) {
        results.append(r)  // Main thread
    }
    
    nonisolated func callback() {
        results.append("from bg")  // Background thread — CRASH
    }
}
```

### Alternatives to nonisolated(unsafe)

| Instead of... | Use... |
|---------------|--------|
| `nonisolated(unsafe) var counter = 0` | `actor Counter { var value = 0 }` |
| `nonisolated(unsafe) var cache: [String: Data]` | `OSAllocatedUnfairLock(initialState: [:])` |
| `nonisolated(unsafe) var task: Task<>?` in deinit | `isolated deinit` (Swift 6.1+) |
| `nonisolated(unsafe) static var shared = X()` | `@MainActor static let shared = X()` |

### For AppIntent Static Properties

AppIntents require static properties that the compiler flags as not concurrency-safe. Use `nonisolated(unsafe)` here because the framework manages access:

```swift
struct MyAppPresentIntent: AppIntent {
    nonisolated(unsafe) static var title: LocalizedStringResource = "Start Presentation"
    nonisolated(unsafe) static var description: IntentDescription? { ... }
    nonisolated(unsafe) static var openAppWhenRun: Bool = false
}
```

---

## 8. @preconcurrency Import

### What It Does

`@preconcurrency import` suppresses Sendable-related warnings and errors from modules that haven't adopted Swift 6 concurrency. It does NOT make the code safe — it just tells the compiler "I know this framework hasn't been updated yet."

### Which Apple Frameworks Need It (as of iOS 26)

| Framework | Needs @preconcurrency? | Why |
|-----------|----------------------|-----|
| EventKit | **Only if compiler demands** | iOS 26 ships with Sendable annotations; do not add prophylactically |
| ActivityKit | **Only if compiler demands** | iOS 26 ships with Sendable annotations |
| NaturalLanguage | **Only if compiler demands** | iOS 26 ships with Sendable annotations |
| WatchConnectivity | **Only if compiler demands** | iOS 26 ships with Sendable annotations |
| CoreData | **Only if compiler demands** | iOS 26 ships with Sendable annotations |
| Speech | **No** (iOS 26) | `SpeechTranscriber` API is fully concurrent |
| SwiftData | **No** (iOS 26) | Fully adopted for Swift 6 |
| AVFoundation | **No** (iOS 26) | Mostly adopted; use `@preconcurrency` on delegate conformances instead |
| SwiftUI | **No** | Fully adopted |
| Foundation | **No** | Fully adopted |

### Import-Level Usage

```swift
@preconcurrency import EventKit  // Suppresses EKEventStore warnings

class ReminderService {
    private let store = EKEventStore()
    // No warnings about EKEventStore not being Sendable
}
```

### Conformance-Level Usage

For delegate protocols from frameworks that haven't added Sendable:

```swift
@MainActor
final class CameraService: NSObject {
    // ...
}

// Use @preconcurrency on the conformance, not the import
extension CameraService: @preconcurrency AVCaptureVideoDataOutputSampleBufferDelegate {
    nonisolated func captureOutput(
        _ output: AVCaptureOutput,
        didOutput sampleBuffer: CMSampleBuffer,
        from connection: AVCaptureConnection
    ) {
        Task { @MainActor [weak self] in
            self?.processSample(sampleBuffer)
        }
    }
}
```

### Rules

1. **Start with NO `@preconcurrency`** on any import
2. **Add ONLY where the compiler specifically demands it** on a single import
3. **Use on conformances** ONLY if the compiler demands it for a delegate protocol
4. **Document with TODO** — plan to remove when the framework updates
5. **Remember: it doesn't make code safe** — you're just suppressing compiler checks

```swift
// TODO: Remove @preconcurrency after LegacyFramework updates to Swift 6
@preconcurrency import LegacyFramework
```

---

## 9. GlobalActor Protocol

### What It Is

`GlobalActor` is the protocol that `@MainActor` conforms to. You can create custom global actors for non-UI isolation domains.

```swift
@globalActor
public struct MainActor: GlobalActor {
    public static let shared: MainActor
    public typealias ActorType = MainActor
}
```

### Custom Global Actors

Rarely needed in app development, but useful for database or network layers:

```swift
@globalActor
actor DatabaseActor {
    static let shared = DatabaseActor()
}

// Use it like @MainActor
@DatabaseActor
class DatabaseService {
    var cache: [String: Data] = [:]
    
    func save(_ data: Data, key: String) {
        cache[key] = data
    }
}

// Crossing boundaries
@MainActor
class ViewModel {
    let db = DatabaseService()
    
    func save() async {
        let data = prepareData()
        await db.save(data, key: "user")  // Boundary crossing: MainActor -> DatabaseActor
    }
}
```

### When to Use Custom Global Actors

- When you have a subsystem that needs serialized access but is NOT UI-related
- When you want to isolate database, network, or audio processing work
- When `@MainActor` would block the UI for your workload

### When NOT to Use

- For most app code — `@MainActor` and `nonisolated` cover 99% of cases
- Don't create actors just to avoid MainActor — use `nonisolated` instead

---

## 10. Actors

### Declaration

```swift
actor AudioProcessor {
    private var buffer: [Float] = []
    private var sampleRate: Double = 44100
    
    func process(_ samples: [Float]) -> [Float] {
        buffer.append(contentsOf: samples)
        return applyFilter(buffer)
    }
    
    // nonisolated — can be called without await
    nonisolated let id: UUID = UUID()
    
    // nonisolated computed property — pure computation
    nonisolated var description: String { "AudioProcessor" }
}
```

### Key Properties

1. **Actors are always Sendable** — they can be passed across isolation boundaries
2. **All stored properties are isolated** — accessed only through `await`
3. **Actor reentrancy** — suspension points allow other calls to interleave

### Actor Reentrancy Warning

```swift
actor BankAccount {
    var balance: Int = 1000
    
    // WRONG: State can change at suspension point
    func withdraw(_ amount: Int) async -> Bool {
        guard balance >= amount else { return false }
        
        await logTransaction(amount)  // SUSPENSION POINT
        // WARNING: balance may have changed here due to reentrancy!
        
        balance -= amount  // Could go negative!
        return true
    }
    
    // RIGHT: Check state after suspension
    func safeWithdraw(_ amount: Int) async -> Bool {
        guard balance >= amount else { return false }
        
        await logTransaction(amount)
        
        // Re-check after suspension
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }
}
```

---

## 11. TaskGroup

### Basic Pattern

```swift
func downloadSections(_ urls: [URL]) async -> [SectionData] {
    await withTaskGroup(of: SectionData?.self) { group in
        for url in urls {
            group.addTask {
                do {
                    let (data, _) = try await URLSession.shared.data(from: url)
                    return try JSONDecoder().decode(SectionData.self, from: data)
                } catch {
                    return nil
                }
            }
        }
        
        var results: [SectionData] = []
        for await section in group {
            if let section {
                results.append(section)
            }
        }
        return results
    }
}
```

### Throwing TaskGroup

```swift
func downloadAllRequired(_ urls: [URL]) async throws -> [Data] {
    try await withThrowingTaskGroup(of: Data.self) { group in
        for url in urls {
            group.addTask {
                let (data, _) = try await URLSession.shared.data(from: url)
                return data
            }
        }
        
        var results: [Data] = []
        // If any task throws, remaining tasks are cancelled
        for try await data in group {
            results.append(data)
        }
        return results
    }
}
```

### Sendable Requirements

Child task results must be `Sendable`:

```swift
// WRONG: Non-Sendable result type
await withTaskGroup(of: NSMutableArray.self) { group in  // ERROR
    // ...
}

// RIGHT: Sendable result type
await withTaskGroup(of: [String].self) { group in  // OK
    // ...
}
```

---

## 12. Swift 6.2: @concurrent and nonisolated(nonsending)

### @concurrent — Guaranteed Background Execution

In Swift 6.2, `nonisolated async` functions now inherit the caller's isolation (they stay on whatever actor called them). To force background execution, use `@concurrent`:

```swift
class DataService {
    // Swift 6.2: This inherits caller's isolation
    nonisolated func fetchData() async -> Data {
        // If called from MainActor, runs ON MainActor (might block UI!)
    }
    
    // Swift 6.2: This explicitly runs on background
    @concurrent
    func decodeJSON<T: Decodable>(_ data: Data) async throws -> T {
        // Guaranteed background thread — safe for heavy computation
        let decoder = JSONDecoder()
        return try decoder.decode(T.self, from: data)
    }
}
```

### nonisolated(nonsending) — Stay on Caller's Actor

Explicitly declares that a function inherits the caller's isolation and does NOT send values to a new isolation domain:

```swift
class Service {
    // Runs on whatever actor called it
    nonisolated(nonsending) func processLocally() async {
        // If called from MainActor -> runs on MainActor
        // If called from background -> runs on background
    }
}
```

### When to Use @concurrent

Only when you have **measured** that a function blocks the main thread:

1. JSON decoding of large payloads
2. Image processing
3. File I/O
4. Cryptographic operations

Do NOT use `@concurrent` by default — it forces Sendable requirements on all captured state and adds unnecessary thread-hopping overhead.

---

## 13. Archive vs Debug: The Hidden Trap

### The Problem

Debug builds (`-Onone`) do NOT catch all strict concurrency errors. Archive builds (`-O`) enable full optimization and enforce complete isolation checking. This is the #1 cause of CI failures.

### What Debug Misses

1. **Member import visibility** — transitive imports work in debug but fail in archive
2. **Actor isolation violations** — some isolation errors only surface under optimization
3. **Sendable conformance checks** — relaxed in debug mode

### The Rule

**Always run archive builds before committing Swift changes:**

```bash
# Single app
make archive-myapp

# All apps
make archive-all

# Full validation (fast checks + archives)
make validate
```

---

## 14. Complete Crash Catalog

### Crash 1: MainActor Property from Audio Thread

**Symptom:** `EXC_BAD_ACCESS` or `swift_task_switch_impl` crash
**Cause:** Accessing `@MainActor` property from AVAudioEngine tap callback

```swift
// WRONG
inputNode.installTap(onBus: 0, ...) { buffer, time in
    self.powerLevel = calculateRMS(buffer)  // CRASH
}

// RIGHT
inputNode.installTap(onBus: 0, ...) { @Sendable [weak self] buffer, time in
    let power = self?.calculateRMS(from: buffer) ?? 0.0
    Task { @MainActor [weak self] in
        self?.powerLevel = power
    }
}
```

### Crash 2: Nested @MainActor deinit

**Symptom:** `SIGABRT in swift_task_deinitOnExecutorImpl`
**Cause:** Explicit `@MainActor` on class when build setting already provides it

```swift
// WRONG (when SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor)
@MainActor @Observable class MyService { }

// RIGHT
@Observable class MyService { }  // Implicitly MainActor
```

### Crash 3: MainActor.assumeIsolated from Wrong Thread

**Symptom:** Runtime assertion failure
**Cause:** Calling `assumeIsolated` when not actually on the main thread

```swift
// WRONG
someSDK.callback { result in  // SDK calls on background thread
    MainActor.assumeIsolated {  // CRASH
        self.label.text = result.text
    }
}

// RIGHT
someSDK.callback { result in
    Task { @MainActor in
        self.label.text = result.text
    }
}
```

### Crash 4: Task in nonisolated Context Without Explicit @MainActor

**Symptom:** Data race or incorrect state updates
**Cause:** `Task { }` in nonisolated context does NOT inherit MainActor

```swift
// WRONG
nonisolated func onCallback(_ data: Data) {
    Task {
        self.state = .loaded(data)  // NOT on MainActor!
    }
}

// RIGHT
nonisolated func onCallback(_ data: Data) {
    Task { @MainActor [weak self] in
        self?.state = .loaded(data)
    }
}
```

### Crash 5: Retain Cycle Preventing Cleanup

**Symptom:** Memory leak, audio continues after view dismissed
**Cause:** Strong capture of self in Task without cleanup

```swift
// WRONG
func startRecording() {
    transcriptionTask = Task {
        for try await result in transcriber.results {
            self.process(result)  // Strong capture — self never deallocates
        }
    }
}

// RIGHT
func startRecording() {
    transcriptionTask = Task { [weak self] in
        guard let self else { return }
        for try await result in transcriber.results {
            guard !Task.isCancelled else { break }
            self.process(result)
        }
    }
}
```

### Crash 6: Unbalanced removeTap

**Symptom:** `NSInternalInconsistencyException`
**Cause:** Calling `removeTap(onBus:)` when no tap is installed

```swift
// WRONG
func stopRecording() {
    audioEngine.inputNode.removeTap(onBus: 0)  // CRASH if no tap installed
}

// RIGHT
@ObservationIgnored nonisolated(unsafe) private var _inputTapInstalled = false

func stopRecording() {
    if _inputTapInstalled {
        audioEngine.inputNode.removeTap(onBus: 0)
        _inputTapInstalled = false
    }
}
```

### Crash 7: deinit Accessing MainActor Properties

**Symptom:** Compiler error or runtime crash
**Cause:** deinit is nonisolated but properties are MainActor-isolated

```swift
// WRONG
@MainActor
class ViewModel {
    var task: Task<Void, Never>?
    
    deinit {
        task?.cancel()  // ERROR: MainActor-isolated from nonisolated deinit
    }
}

// RIGHT
class ViewModel {
    @ObservationIgnored
    nonisolated(unsafe) private var _taskForDeinit: Task<Void, Never>?
    
    nonisolated deinit {
        _taskForDeinit?.cancel()  // SAFE
    }
}
```

### Crash 8: @preconcurrency False Safety

**Symptom:** Data race crash at runtime
**Cause:** `@preconcurrency` suppresses compile-time warnings but doesn't fix thread safety

```swift
// WRONG: Thinking @preconcurrency makes code safe
@preconcurrency import EventKit

class BadService {
    let store = EKEventStore()
    
    func fetch() {
        Task.detached {
            // No compile warning, but EKEventStore is NOT thread-safe!
            self.store.requestFullAccessToEvents { _, _ in }
        }
    }
}

// RIGHT: Proper isolation; start with plain import
import EventKit

@MainActor
class GoodService {
    let store = EKEventStore()
    
    func fetch() async {
        // Access store on MainActor
        let access = try? await store.requestFullAccessToEvents()
    }
}
```

---

## 15. Quick Decision Matrix

| Situation | Pattern | Confidence |
|-----------|---------|------------|
| ViewModel with UI state | `@Observable` class (MainActor from build setting) | High |
| Service with background callbacks | `@Observable` class + `nonisolated` callback methods + `Task { @MainActor in }` | High |
| AVAudioEngine tap closure | `nonisolated` installer + `@Sendable` closure + `Task { @MainActor in }` for state updates | High |
| Task cleanup in deinit | `nonisolated(unsafe)` duplicate reference + `nonisolated deinit` | High |
| Apple framework without Sendable | `import Framework` (add `@preconcurrency` ONLY if compiler demands it) | High |
| Delegate protocol from Apple framework | `@preconcurrency` on the conformance + `nonisolated` methods | High |
| Global variable | `@MainActor` or `let` (immutable) | High |
| Static singleton | `@MainActor static let shared = ...` or `nonisolated(unsafe)` if truly thread-safe | High |
| Heavy computation in @MainActor class | `nonisolated` method or `@concurrent` (Swift 6.2) | High |
| AppIntent static properties | `nonisolated(unsafe) static var` | High |
| Passing data between actors | Sendable struct / value type | High |
| Wrapping non-Sendable framework type | `@unchecked Sendable` with `let` properties | Medium |

---

## Swift Evolution Proposals Referenced

| Proposal | Title | Status |
|----------|-------|--------|
| SE-0302 | Sendable and @Sendable closures | Implemented (Swift 5.5+) |
| SE-0304 | Structured concurrency | Implemented (Swift 5.5+) |
| SE-0306 | Actors | Implemented (Swift 5.5+) |
| SE-0327 | On Actors and Initialization | Implemented (Swift 5.7+) |
| SE-0337 | Incremental migration with @preconcurrency | Implemented (Swift 5.7+) |
| SE-0371 | Isolated synchronous deinit | Implemented (Swift 6.1+, partial) |
| SE-0401 | Disable outward actor inference for property wrappers | Implemented (Swift 6.0) |
| SE-0411 | Isolated default value expressions | Implemented (Swift 6.0) |
| SE-0412 | Strict concurrency for global variables | Implemented (Swift 6.0) |
| SE-0420 | Inheritance of actor isolation (async functions) | Implemented (Swift 6.0) |
| SE-0423 | Dynamic actor isolation enforcement | Implemented (Swift 6.0) |
| SE-0430 | `sending` parameter modifier | Implemented (Swift 6.0) |
| SE-0434 | Usability of global actors | Implemented (Swift 6.0) |
| SE-0449 | `nonisolated` on all declarations | Implemented (Swift 6.1) |
| SE-0461 | Async function isolation (nonisolated nonsending) | Implemented (Swift 6.2) |

---

### References

- [Adopting strict concurrency in Swift 6 apps](https://developer.apple.com/documentation/swift/adoptingswift6) -- Apple Developer Documentation
- [Updating an app to use strict concurrency](https://developer.apple.com/documentation/swift/updating-an-app-to-use-strict-concurrency) -- Apple Developer Documentation
- [Concurrency](https://developer.apple.com/documentation/swift/concurrency) -- Apple Developer Documentation
- [Migrate your app to Swift 6](https://developer.apple.com/videos/play/wwdc2024/10169/) -- WWDC24
- [Embracing Swift concurrency](https://developer.apple.com/videos/play/wwdc2025/268/) -- WWDC25
- [What's new in Swift](https://developer.apple.com/videos/play/wwdc2025/245/) -- WWDC25
- [Explore concurrency in SwiftUI](https://developer.apple.com/videos/play/wwdc2025/266/) -- WWDC25
- [Default Actor Isolation in Swift 6.2](https://www.avanderlee.com/concurrency/default-actor-isolation-in-swift-6-2/) -- SwiftLee
- [Should you opt-in to Swift 6.2's Main Actor isolation?](https://www.donnywals.com/should-you-opt-in-to-swift-6-2s-main-actor-isolation/) -- Donny Wals
- [What is @concurrent in Swift 6.2?](https://www.donnywals.com/what-is-concurrent-in-swift-6-2/) -- Donny Wals
- [@preconcurrency usage in Swift explained](https://www.donnywals.com/preconcurrency-usage-in-swift-explained/) -- Donny Wals
- [Problematic Swift Concurrency Patterns](https://www.massicotte.org/problematic-patterns/) -- Matt Massicotte
- [Default Actor Isolation - New Problems from Good Intentions](https://fatbobman.com/en/posts/default-actor-isolation/) -- Fatbobman
- [Is MainActor.assumeIsolated truly necessary in deinit?](https://forums.swift.org/t/is-mainactor-assumeisolated-truly-necessary-in-deinit-for-a-mainactor-annotated-class/72921) -- Swift Forums
- [Understanding Swift 6 Concurrency: The Deinit Isolation Controversy](https://antongubarenko.substack.com/p/understanding-swift-6-concurrency) -- Substack
- [SE-0412: Strict concurrency for global variables](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0412-strict-concurrency-for-global-variables.md) -- Swift Evolution
- [SE-0420: Inheritance of actor isolation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0420-inheritance-of-actor-isolation.md) -- Swift Evolution
- [SE-0371: Isolated synchronous deinit](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0371-isolated-synchronous-deinit.md) -- Swift Evolution
- [SE-0449: nonisolated on all declarations](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0449-nonisolated-for-global-actor-cutoff.md) -- Swift Evolution
- [How to avoid concurrency error capturing MainActor-isolated closure in Sendable closure](https://forums.swift.org/t/how-to-avoid-concurrency-error-of-capturing-a-mainactor-isolated-closure-in-a-sendable-closure/74123) -- Swift Forums

---

*Applies to: Swift 6.0-6.2, iOS 26+, Xcode 17-26*
