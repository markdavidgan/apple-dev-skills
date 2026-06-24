# Swift 6 — iOS 26 Essentials

> For deep reference: load `reference/swift6-reference.md`
> For expert guide: load `guides/expert-swift6.md`
> For community intel: load `intel/community-swift6.md`

---

## Correct Patterns (vs Common Mistakes)

| # | Topic | WRONG | RIGHT | Why |
|---|-------|-------|-------|-----|
| 1 | Default actor isolation | `@MainActor @Observable class VM { }` when `SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` | `@Observable class VM { }` (implicitly MainActor) | Explicit `@MainActor` creates nested isolation causing `SIGABRT in swift_task_deinitOnExecutorImpl` |
| 2 | Task isolation in nonisolated context | `nonisolated func cb() { Task { self.state = x } }` | `nonisolated func cb() { Task { @MainActor [weak self] in self?.state = x } }` | `Task { }` in nonisolated context does NOT inherit MainActor |
| 3 | Audio tap state access | `installTap { buffer, _ in self.powerLevel = rms(buffer) }` | `installTap { @Sendable [weak self] buffer, _ in let p = self?.rms(buffer) ?? 0; Task { @MainActor [weak self] in self?.powerLevel = p } }` | Tap closure runs on audio thread, not MainActor |
| 4 | deinit accessing MainActor props | `deinit { task?.cancel() }` on `@MainActor` class | `nonisolated(unsafe) private var _taskForDeinit: Task<..>?` + `nonisolated deinit { _taskForDeinit?.cancel() }` | deinit is ALWAYS nonisolated regardless of class isolation |
| 5 | `MainActor.assumeIsolated` | Using in SDK callbacks of unknown thread | Use `Task { @MainActor in }` instead | `assumeIsolated` crashes if not actually on main thread |
| 6 | `@preconcurrency import` thinking it fixes safety | `@preconcurrency import EventKit` then accessing `EKEventStore` from detached task | Use `import EventKit` with proper MainActor isolation; only add `@preconcurrency` if compiler demands it | `@preconcurrency` suppresses warnings only; runtime safety unchanged |
| 7 | SPM default isolation | Expecting SPM target to inherit Xcode `SWIFT_DEFAULT_ACTOR_ISOLATION` | Set `defaultIsolation: MainActor.self` in `Package.swift` target | SPM does NOT inherit Xcode build settings |
| 8 | `Task.detached` missing MainActor hop | `Task.detached { self.image = processed }` | `Task.detached { let img = await process(); await MainActor.run { self.image = img } }` | Detached tasks have NO actor inheritance |
| 9 | Strong self in long-lived Task | `Task { for await r in stream { self.process(r) } }` | `Task { [weak self] in for await r in stream { guard !Task.isCancelled else { break }; self?.process(r) } }` | Strong capture prevents deallocation; no cleanup path |
| 10 | Unbalanced `removeTap` | `audioEngine.inputNode.removeTap(onBus: 0)` without guard | Track installation with `nonisolated(unsafe) var _tapInstalled = false`; check before removing | Removing non-existent tap throws `NSInternalInconsistencyException` |
| 11 | `nonisolated(unsafe)` on mutable collections | `nonisolated(unsafe) var results: [String] = []` | Use an `actor`, `OSAllocatedUnfairLock`, or keep on MainActor | Multi-threaded access to mutable collections = data race |
| 12 | `MainActor.assumeIsolated` in deinit | `deinit { MainActor.assumeIsolated { cleanup() } }` | Use `nonisolated(unsafe)` task reference pattern | deinit may run on background thread; `assumeIsolated` will crash |
| 13 | `DispatchQueue.main.async` in deinit | `deinit { DispatchQueue.main.async { self.cleanup() } }` | Cancel tasks via `nonisolated(unsafe)` ref; no dispatch needed | self is being deallocated; dispatch extends lifetime into garbage memory |
| 14 | Swift 6.2 `nonisolated async` blocking UI | Assuming `nonisolated func x() async` runs on background | Use `@concurrent` when you need guaranteed background execution | In Swift 6.2, `nonisolated async` inherits caller's isolation |

---

## Crash Prevention Patterns

### Crash 1: MainActor Property from Audio Thread

```swift
// WRONG
inputNode.installTap(onBus: 0, ...) { buffer, time in
    self.powerLevel = calculateRMS(buffer)  // EXC_BAD_ACCESS
}

// RIGHT
inputNode.installTap(onBus: 0, ...) { @Sendable [weak self] buffer, time in
    let power = self?.calculateRMS(from: buffer) ?? 0.0
    Task { @MainActor [weak self] in
        self?.powerLevel = power
    }
}
```

### Crash 2: Nested @MainActor Deinit (SWIFT_DEFAULT_ACTOR_ISOLATION)

```swift
// WRONG — SIGABRT in swift_task_deinitOnExecutorImpl
@MainActor @Observable class MyService { }

// RIGHT — rely on build setting
@Observable class MyService { }
```

### Crash 3: MainActor.assumeIsolated from Wrong Thread

```swift
// WRONG
someSDK.callback { result in  // SDK calls on background thread
    MainActor.assumeIsolated { self.update(result) }  // CRASH
}

// RIGHT
someSDK.callback { result in
    Task { @MainActor in self.update(result) }
}
```

### Crash 4: Task in Nonisolated Context

```swift
// WRONG — Task does NOT inherit MainActor here
nonisolated func onCallback(_ data: Data) {
    Task { self.state = .loaded(data) }
}

// RIGHT
nonisolated func onCallback(_ data: Data) {
    Task { @MainActor [weak self] in self?.state = .loaded(data) }
}
```

### Crash 5: deinit Accessing MainActor Properties

```swift
// WRONG
@MainActor class ViewModel {
    var task: Task<Void, Never>?
    deinit { task?.cancel() }  // ERROR: MainActor-isolated from nonisolated deinit
}

// RIGHT
class ViewModel {
    @ObservationIgnored nonisolated(unsafe) private var _taskForDeinit: Task<Void, Never>?
    nonisolated deinit { _taskForDeinit?.cancel() }
}
```

### Crash 6: @preconcurrency False Safety

> **Reversed guidance (2026-04-03):** Do NOT add `@preconcurrency` prophylactically. Only use it where the compiler specifically demands it.

```swift
// WRONG — no compile warning but still a data race (and prophylactic @preconcurrency is obsolete)
@preconcurrency import EventKit
class BadService {
    let store = EKEventStore()
    func fetch() {
        Task.detached { self.store.requestFullAccessToEvents { _, _ in } }
    }
}

// RIGHT — proper isolation; start with plain import
import EventKit
@MainActor class GoodService {
    let store = EKEventStore()
    func fetch() async { let _ = try? await store.requestFullAccessToEvents() }
}
```

### Crash 7: Retain Cycle in Long-lived Task

```swift
// WRONG — self never deallocates
func startRecording() {
    transcriptionTask = Task {
        for try await result in transcriber.results { self.process(result) }
    }
}

// RIGHT
func startRecording() {
    transcriptionTask = Task { [weak self] in
        for try await result in transcriber.results {
            guard !Task.isCancelled else { break }
            self?.process(result)
        }
    }
}
```

---

## Known Gotchas

- **Debug vs Archive:** Debug builds (`-Onone`) miss strict concurrency errors that archive builds (`-O`) catch. Always run archive builds before pushing. This is the #1 cause of CI failures.
- **`SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` + explicit `@MainActor`:** Creates "nested MainActor" causing deinit crashes. Remove explicit `@MainActor` when the build setting provides it.
- **SPM packages ignore Xcode build settings:** You must set `defaultIsolation: MainActor.self` in `Package.swift` (requires Swift tools version 6.2+).
- **`Task { }` isolation inheritance is compile-time:** It inherits from the enclosing scope's static isolation, not the runtime caller. In a `nonisolated` function, `Task { }` is nonisolated.
- **`[weak self]` does NOT change Task isolation:** The capture list prevents retain cycles but does not affect which actor the Task runs on.
- **`Task.detached` strips everything:** No actor inheritance, no priority inheritance, no task-local values.
- **`nonisolated async` behavior changed in Swift 6.2:** Now inherits caller's isolation (stays on MainActor if called from MainActor). Use `@concurrent` for guaranteed background execution.
- **`isolated deinit` (SE-0371):** Accepted in Swift 6.1 but not fully stable. Use the `nonisolated(unsafe)` + `nonisolated deinit` pattern as the reliable workaround.
- **`@preconcurrency` is a compile-time annotation only:** It suppresses warnings but does NOT make code thread-safe at runtime. UIKit will still crash from background thread access.
- **AVAudioEngine `installTap` closure:** Runs on a realtime audio thread. Never access MainActor state directly. Always bridge via `Task { @MainActor in }`.
- **Actor reentrancy:** State can change at `await` suspension points inside actors. Always re-check state after suspension.
- **AppIntent static properties:** Require `nonisolated(unsafe) static var` because the framework manages access and the compiler cannot verify it.
- **`@unchecked Sendable`:** Only use for types YOU guarantee are thread-safe (e.g., immutable after init, protected by lock). The compiler trusts you completely.

---

## Quick Checklist

Before committing Swift code:

- [ ] **No explicit `@MainActor`** on classes/structs when `SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` is set
- [ ] **All `nonisolated` callbacks** that update state use `Task { @MainActor [weak self] in }`
- [ ] **Audio tap closures** marked `@Sendable`, use `[weak self]`, bridge state via `Task { @MainActor in }`
- [ ] **deinit** only accesses `nonisolated(unsafe)` properties; uses `nonisolated deinit`
- [ ] **No `MainActor.assumeIsolated`** unless you have Apple documentation proof the callback is main-thread
- [ ] **Archive build passes** (`make archive-{app}` or `make validate`) — debug builds miss concurrency errors
- [ ] **`@preconcurrency import`** ONLY where the compiler specifically demands it on a single import (iOS 26 frameworks are Sendable-annotated; do not add prophylactically)
- [ ] **Long-lived Tasks** use `[weak self]` and check `Task.isCancelled`

---

### References

- [Adopting strict concurrency in Swift 6 apps](https://developer.apple.com/documentation/swift/adoptingswift6)
- [Updating an app to use strict concurrency](https://developer.apple.com/documentation/swift/updating-an-app-to-use-strict-concurrency)
- [Concurrency — Swift](https://developer.apple.com/documentation/swift/concurrency)
- [Migrate your app to Swift 6 — WWDC24](https://developer.apple.com/videos/play/wwdc2024/10169/)
- [Embracing Swift concurrency — WWDC25](https://developer.apple.com/videos/play/wwdc2025/268/)
- [Explore concurrency in SwiftUI — WWDC25](https://developer.apple.com/videos/play/wwdc2025/266/)
- [What's new in Swift — WWDC25](https://developer.apple.com/videos/play/wwdc2025/245/)
- [SE-0371: Isolated synchronous deinit](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0371-isolated-synchronous-deinit.md)
- [SE-0420: Inheritance of actor isolation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0420-inheritance-of-actor-isolation.md)
- [SE-0461: Async function isolation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0461-async-function-isolation.md)

---

*Applies to: Swift 6.0-6.2, iOS 26+, Xcode 17-26*
