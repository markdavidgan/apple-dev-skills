---
name: swift6-concurrency
category: engineering
description: Handle Swift 6 concurrency patterns. Use when encountering Sendable warnings, data race errors, MainActor isolation issues, or framework interop problems (EventKit, Speech, AVFoundation, etc.). Trigger on "Swift 6 error", "Sendable", "data race", "MainActor", "concurrency warning", or "strict concurrency".
invoke: "/swift6-fix [file] — Diagnose and fix Swift 6 strict concurrency, Sendable, or MainActor isolation errors."
---

Handle Swift 6 concurrency issues. Swift 6 enforces strict data isolation by default; most errors fall into a small number of patterns with known fixes.

> **Deep reference:** For 8 comprehensive crash scenarios with WRONG/RIGHT pairs, load `ios26-api-reference/essentials/swift6.md`.
> For expert-level patterns (actor isolation, migration strategies), load `ios26-api-reference/guides/expert-swift6.md`.
> For real-world community gotchas, load `ios26-api-reference/intel/community-swift6.md`.
> **Live API verification (Optional):** If Context7 MCP is installed, query it for the latest Swift concurrency documentation. Otherwise, use the static patterns in this skill and flag unfamiliar APIs as "unverified".

---

## Core Philosophy

### Start Single-Threaded, Profile Before Optimizing

Concurrency is a complexity tax. Apps should begin with all code on the main thread and only introduce concurrency when profiling data proves it's necessary.

- **Use Instruments first.** Run the Time Profiler to confirm that severe hangs are genuinely caused by main-thread blocking before converting code to run concurrently.
- **Optimize without concurrency first.** If code can be made faster algorithmically (better data structures, reduced work, caching), pursue that route before adding `async/await` or background tasks.
- **Latency vs. throughput.** Use `async/await` to hide latency (network, disk). Use `async let` or `TaskGroup` to exploit multiple CPU cores for parallel computation. Do not conflate the two.

### When to Use Each Concurrency Tool

| Goal | Tool | Example |
|------|------|---------|
| Hide I/O latency | `async/await` | Network request, file read |
| Parallel CPU work | `async let`, `TaskGroup` | Image processing, data parsing |
| Isolate shared mutable state | Custom `actor` | Cache, network connection manager |
| Update UI safely | `@MainActor` | ViewModel, ObservableObject |

---

## Common Error Patterns

### 1. `static property is not concurrency-safe`

App Intent metadata and similar protocol requirements often use `static var`:

```swift
// Wrong
struct MyIntent: AppIntent {
    static var title: LocalizedStringResource = "..."
}

// Correct
struct MyIntent: AppIntent {
    static let title: LocalizedStringResource = "..."
}
```

**Fix:** Change `static var` to `static let` for immutable protocol requirements.

---

### 2. `sending 'self' risks causing data races` in callbacks

```swift
// Wrong
class MyService {
    func doWork() {
        someFrameworkCallback { result in
            self.handleResult(result)  // Error
        }
    }
}

// Correct
class MyService {
    func doWork() {
        someFrameworkCallback { result in
            Task { @MainActor in
                self.handleResult(result)
            }
        }
    }
}
```

**Fix:** Dispatch to `@MainActor` inside the callback via `Task { @MainActor in ... }`.

---

### 3. Framework types not Sendable (EventKit, Speech, AVFoundation, etc.)

```swift
// Wrong — prophylactic @preconcurrency masks real concurrency issues
@preconcurrency import EventKit

func fetch() async -> [EKReminder] { ... }  // [EKReminder] is not Sendable

// Correct — start with plain import; add @preconcurrency only if compiler demands it
import EventKit

@MainActor
class RemindersService {
    func fetch() async -> [EKReminder] { ... }
}
```

**Fix:** Use `@preconcurrency import` ONLY when the compiler specifically demands it on a single import. iOS 26 first-party frameworks (AVFoundation, Vision, ActivityKit, SwiftData, etc.) ship with full Sendable annotations — do not add `@preconcurrency` prophylactically. It masks real concurrency issues that surface as archive crashes. Combine with `@MainActor` isolation where the types are used in UI-adjacent code.

---

### 4. Singleton shared state

```swift
// Wrong — mutable static is not safe
class MySingleton {
    static var shared = MySingleton()
}

// Correct — immutable init, marked nonisolated(unsafe) if truly shared
class MySingleton {
    nonisolated(unsafe) static let shared = MySingleton()
    private init() {}
}
```

**Fix:** Use `nonisolated(unsafe)` only when you can guarantee the instance itself is safe after initialization.

---

### 5. `nonisolated deinit` required for @MainActor classes (Apple Known Issue)

```swift
// Wrong — @MainActor class with deinit crashes on deallocation
@MainActor
class CameraService {
    deinit {
        captureSession.stopRunning()  // CRASH: Cannot access MainActor state from deinit
    }
}

// Correct — nonisolated deinit doesn't access MainActor state
class CameraService {
    nonisolated deinit {
        // Only non-isolated cleanup (e.g., VTCompressionSessionInvalidate)
        // Do NOT access any @MainActor properties here
    }
}
```

**Fix:** All `@MainActor` classes (explicit or via `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`) must use `nonisolated deinit`. Move any MainActor-dependent cleanup to a separate `func cleanup()` called before deallocation.

---

### 6. `MainActor.assumeIsolated` from background queues — Fatal Error

```swift
// Wrong — AVCaptureOutput delegate fires on a BACKGROUND queue
nonisolated func captureOutput(_ output: AVCaptureOutput, didOutput buffer: CMSampleBuffer, from connection: AVCaptureConnection) {
    MainActor.assumeIsolated {
        self.latestBuffer = buffer  // FATAL ERROR: not on main thread
    }
}

// Correct — use Task to hop to MainActor
nonisolated func captureOutput(_ output: AVCaptureOutput, didOutput buffer: CMSampleBuffer, from connection: AVCaptureConnection) {
    Task { @MainActor in
        self.latestBuffer = buffer
    }
}
```

**Fix:** Only use `MainActor.assumeIsolated` when you have *proof* the code runs on the main thread. Framework delegate callbacks are NOT guaranteed main-thread unless the documentation explicitly says so.

---

### 7. Sheet `onDismiss` + `withCheckedContinuation` double-resume

```swift
// Wrong — async onComplete races with synchronous onDismiss
.sheet(isPresented: $showPrompt, onDismiss: {
    completion?(false)  // Fires FIRST (synchronous)
}) {
    PromptView(onComplete: { enabled in
        Task { await promptCompleted(enabled: enabled) }  // Fires SECOND (queued) → DOUBLE RESUME
    })
}

// Correct — synchronous completion, nil before dismiss
func promptCompleted(enabled: Bool) {  // NOT async
    showPrompt = false
    let cb = self.completion
    self.completion = nil       // Nil BEFORE dismiss fires onDismiss
    cb?(enabled)                // Resume exactly once
}
```

**Fix:** Never wrap a sheet's `onComplete` in `Task { await }` if `onDismiss` also resumes the same continuation.

---

### 8. CoreData Sendable Annotations (iOS 26 Beta 5)

```swift
// NSManagedObject is NOT Sendable — never pass between actors
// NSManagedObjectContext IS Sendable — use perform blocks for cross-actor access

// Wrong
func badFunction(item: NSManagedObject) async {
    Task.detached { process(item) }  // data race
}

// Correct
let context = persistentContainer.viewContext
Task.detached {
    await context.perform {
        // Safe — context manages its own queue
    }
}
```

---

### 9. Task closure captures changed from `@Sendable` to `sending`

The closure passed to `Task.init` and `Task.detached` was changed from `@Sendable` to `sending`. The compiler no longer tells you *which* captured values create the data race. Be explicit:

```swift
// Be explicit about captures
Task { [weak self, capturedValue] in
    // capturedValue must be Sendable
    // self is weak reference
}
```

### 10. Framework callback closures inherit `@MainActor` isolation and crash at runtime

Inside a `@MainActor` type or function, closures passed to framework callbacks silently inherit MainActor isolation. If the framework invokes the callback on its own queue (haptics, notifications, UIKit icon changes, audio delegates, etc.), Swift 6 isolation enforcement crashes the app rather than hopping threads.

```swift
// Wrong — closure inherits MainActor isolation, but CHHapticEngine calls it on its own queue
@MainActor
enum NearHaptics {
    static func sent() {
        let engine = try! CHHapticEngine()
        engine.notifyWhenPlayersFinished { _ in .stopEngine }  // CRASH
    }
}

// Correct — mark the closure @Sendable so it does not inherit MainActor isolation
@MainActor
enum NearHaptics {
    static func sent() {
        let engine = try! CHHapticEngine()
        engine.notifyWhenPlayersFinished { @Sendable _ in .stopEngine }
    }
}
```

Other common offenders:

```swift
// Wrong
UNUserNotificationCenter.current().setBadgeCount(1) { _ in }
UIApplication.shared.setAlternateIconName("dark") { error in
    if error != nil { /* handle */ }
}

// Correct
UNUserNotificationCenter.current().setBadgeCount(1) { @Sendable _ in }
UIApplication.shared.setAlternateIconName("dark") { @Sendable error in
    Task { @MainActor in
        if error != nil { /* handle */ }
    }
}
```

For delegate-style callbacks where you cannot mark the closure `@Sendable`, dispatch the work back explicitly:

```swift
// Correct
final class AudioEndDelegate: NSObject, AVAudioPlayerDelegate {
    private let onFinish: @MainActor () -> Void
    init(onFinish: @escaping @MainActor () -> Void) { self.onFinish = onFinish }
    nonisolated func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        Task { @MainActor in onFinish() }
    }
}
```

**Fix:** Mark framework callback closures `@Sendable` when they need no MainActor access. If they *do* need MainActor access, wrap only that work in `Task { @MainActor in ... }` rather than letting the whole closure inherit isolation.

---

## Safe Patterns

### Services that touch UI → `@MainActor`

```swift
@MainActor
@Observable
class MyService {
    var state: MyState = .idle
}
```

### ViewModels always → `@MainActor @Observable`

```swift
@MainActor
@Observable
class MyViewModel {
    var items: [Item] = []
}
```

### Protocols with async methods across actors

```swift
@MainActor
protocol MyProtocol {
    func doWork() async
}

// Implementation inherits isolation
class MyImpl: MyProtocol {
    func doWork() async { ... }
}
```

---

## Unsafe Patterns — Never Use

| Pattern | Problem | Use Instead |
|---------|---------|-------------|
| `struct Wrapper<T>: @unchecked Sendable` | Hides real safety issues | Proper isolation; `@preconcurrency` only if compiler demands it |
| `unsafeBitCast` for Sendable conformance | Undefined behavior | Proper isolation |
| Enabling strict concurrency without audit | Cascading build failures | Audit first, enable per-module |

---

## Framework-Specific Guidance

| Framework | Issue | Solution |
|-----------|-------|----------|
| EventKit | `EKReminder`, `EKCalendar` not Sendable | Only if compiler demands it; prefer `@MainActor` |
| HealthKit | `HKSample` types not Sendable | Only if compiler demands it; prefer `@MainActor` |
| Speech | `SFSpeechRecognitionResult` not Sendable | Only if compiler demands it |
| AVFoundation | `AVAudioEngine` thread safety | Do NOT add prophylactically; use `@MainActor` for UI-related audio |
| VideoToolbox | VTCompressionSession types | Only if compiler demands it |
| Vision | VNRequest types not Sendable | Only if compiler demands it |
| SwiftData | `@Model` NOT Sendable | Do NOT add prophylactically; extract scalars before async boundary |
| ActivityKit | Live Activity types | Only if compiler demands it |
| CoreData | `NSManagedObject` NOT Sendable (Beta 5) | Only if compiler demands it; use `perform` blocks |
| CoreLocation | Location types | Only if compiler demands it |
| WidgetKit | Timeline providers | Only if compiler demands it |
| UserNotifications | Completion handlers | `Task { @MainActor in ... }` in callbacks |

---

## Quick Reference

| Problem | Solution |
|---------|----------|
| `static var` in App Intent | Change to `static let` |
| Callback captures `self` across actors | `Task { @MainActor in self.method() }` |
| Framework type not Sendable | `@preconcurrency import FrameworkName` **only if compiler demands it** |
| Singleton shared state | `nonisolated(unsafe) static let shared` |
| Service needs UI updates | `@MainActor @Observable class` |
| Protocol used across actors | `@MainActor protocol` |
| @MainActor class with deinit | `nonisolated deinit { }` — never access MainActor state |
| `MainActor.assumeIsolated` crash | Only use from guaranteed main-thread code; else `Task { @MainActor in }` |
| Sheet + continuation double-resume | Synchronous completion, nil handler before dismiss |
| @Model crossing async boundary | Extract scalars before `Task` or `AsyncStream` |
| `NSManagedObject` across actors | Use `context.perform { }` — NSManagedObject is NOT Sendable |
| Task capture data race | Explicit `[weak self, value]` capture list |
| Framework callback inside `@MainActor` context crashes at runtime | Mark closure `@Sendable`; use `Task { @MainActor in }` only for UI work |

---

## Archive vs Debug Isolation

Debug builds (`-Onone`) relax strict concurrency checks. Archive builds (`-O`) enforce them fully. **This is the #1 cause of CI failures** — code compiles clean in Xcode's debug/simulator mode but fails in Xcode Cloud's archive build.

Always run an archive build before pushing Swift changes that touch concurrency or actor isolation.

### `nonisolated(unsafe)` for Mutable Stored Properties

Mutable stored properties on `Sendable` types require `nonisolated(unsafe)` in archive builds. Debug builds may not flag this.

```swift
// Wrong — compiles in debug, fails in archive
struct MyConfig: Sendable {
    static var current = MyConfig()
}

// Correct — nonisolated(unsafe) satisfies archive-mode isolation
struct MyConfig: Sendable {
    nonisolated(unsafe) static var current = MyConfig()
}
```

**Rule of thumb:** If your CI catches `MainActor`-isolation or `Sendable` errors that Xcode didn't show locally, you are building in debug mode. Switch to archive (`Product > Archive` or `xcodebuild archive`) to reproduce locally.

---

## Migration Path

When enabling `SWIFT_STRICT_CONCURRENCY: complete` on an existing codebase:

1. Enable per-module incrementally (start with leaf modules)
2. Fix errors bottom-up (models → services → viewmodels → views)
3. Remove any prophylactic `@preconcurrency` imports; keep only those the compiler specifically demands
4. Test each change with a build before proceeding

---

## Audit Checklist

Use this checklist when reviewing existing code for concurrency safety or during a Swift 6 migration.

### Before Adding Concurrency
- [ ] **Profiled with Instruments.** Confirmed the bottleneck is main-thread blocking, not algorithmic inefficiency.
- [ ] **No single-threaded optimization possible.** Cache lookups, reduced copies, or better algorithms won't solve it.

### Build Settings & Compiler
- [ ] **Swift 6 language mode enabled.** `SWIFT_STRICT_CONCURRENCY: complete` (or `SWIFT_VERSION: 6.0`).
- [ ] **Default isolation reviewed.** If using `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`, avoid explicit `@MainActor` on the same declarations (nested isolation causes deinit crashes).
- [ ] **SPM targets configured.** Packages do not inherit Xcode build settings; set `defaultIsolation: MainActor.self` in `Package.swift` if needed (Swift tools 6.2+).

### Main Actor Isolation
- [ ] **No deinit accessing MainActor state.** All `@MainActor` classes use `nonisolated deinit` and store cleanup resources in `nonisolated(unsafe)` properties when necessary.
- [ ] **Callbacks that update UI hop to MainActor.** Framework callbacks (AVCapture, audio taps, Obj-C delegates) use `Task { @MainActor [weak self] in }`, not `MainActor.assumeIsolated`.
- [ ] **Task isolation is explicit.** `Task { }` created inside `nonisolated` functions does NOT inherit MainActor; mark `@MainActor` inside the closure if UI state is touched.

### Shared Mutable State
- [ ] **No data races flagged by compiler.** If a race exists, ask: does this state truly need to be shared?
- [ ] **Reference types not arbitrarily marked Sendable.** Model classes remain on the main actor or are kept non-Sendable intentionally. Do not add `Sendable` conformance to mutable reference types without proper synchronization.
- [ ] **Value types preferred.** Structs and enums with Sendable members are the safest way to pass data across concurrency boundaries.
- [ ] **Custom actors used for subsystem state.** Network managers, caches, and connection pools that hold mutable state are isolated to dedicated actors, not the main actor.

### Framework Interop
- [ ] **`@preconcurrency import` used only on demand.** Do not add prophylactically to first-party frameworks (EventKit, HealthKit, AVFoundation, etc.). Only apply where the compiler specifically demands it on a single import.
- [ ] **Framework callbacks are not over-isolated.** Inside `@MainActor` types/functions, closures passed to framework callbacks (haptics, notifications, UIKit icon APIs, audio delegates, etc.) are marked `@Sendable` or dispatch to `@MainActor` explicitly. Do not let the closure inherit MainActor isolation if the framework invokes it on its own queue.
- [ ] **Non-Sendable framework types isolated.** Types like `EKReminder`, `NSManagedObject`, `VNRequest` are never passed between actors; access them within their isolation domain or extract scalars first.

### Build Verification
- [ ] **Archive build passes.** Debug builds (`-Onone`) may miss strict concurrency errors. Always validate with an archive build (`Product > Archive` or `xcodebuild archive`) before pushing.
- [ ] **Thread Sanitizer clean.** Run the test suite with TSan enabled to catch runtime races the compiler missed.
- [ ] **Real device tested.** Simulator can miss some timing-dependent races.
