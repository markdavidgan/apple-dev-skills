# Concurrency Standards

> For Swift 6 concurrency in iOS development.

## Critical Rules

### 1. SwiftUI Views Are Structs — No [weak self]

**CHECKLIST**: Any closure in a View body using `[weak self]`?

```swift
// ❌ WRONG — View is a struct
struct MyView: View {
    @State private var service = MyService()

    func load() {
        service.start { [weak self] result in
            self?.handle(result)  // Error: 'weak' only for class types
        }
    }
}

// ✅ CORRECT — Direct capture + MainActor dispatch
struct MyView: View {
    @State private var service = MyService()

    func load() {
        service.start { result in
            Task { @MainActor in
                handle(result)  // 'self' not needed in struct
            }
        }
    }
}
```

### 2. @Sendable Closures Cannot Touch MainActor State

**CHECKLIST**: Any `@Sendable` closure modifying `@State`, `@ObservedObject`, or calling MainActor methods?

```swift
// ❌ WRONG — @Sendable closure captures MainActor-isolated state
Delay.after(0.5) { @Sendable in
    showToast = true  // Error: Main actor-isolated property
}

// ✅ CORRECT — Bridge to MainActor via Task
Delay.after(0.5) { @Sendable in
    Task { @MainActor in
        showToast = true
    }
}
```

### 3. Non-Sendable Types in Async Contexts

**CHECKLIST**: Any SwiftData model (`@Model` class) captured in `@Sendable` closure or passed across isolation boundaries?

```swift
// ❌ WRONG — Capturing non-Sendable model
let thought = CapturedThought(text: "...")
Delay.after(0.5) { @Sendable in
    capturedThought = thought  // Error: non-Sendable type
}

// ✅ CORRECT — Capture ID, fetch in Task
let thoughtID = thought.id
Delay.after(0.5) { @Sendable in
    Task { @MainActor in
        if let thought = try? modelContext.fetch(
            FetchDescriptor<CapturedThought>(
                predicate: #Predicate { $0.id == thoughtID }
            )
        ).first {
            capturedThought = thought
        }
    }
}
```

### 4. Sendable Structs with Stored Properties (Archive Build Killer)

**CHECKLIST**: Any `Sendable` struct with stored properties accessed from `nonisolated` methods?

With `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`, ALL stored properties become implicitly `@MainActor`. If the struct's methods are `nonisolated`, the compiler will reject property access — but **only in archive/release builds**, not debug simulator builds. This is the #1 cause of CI failures.

```swift
// ❌ WRONG — embedding is implicitly @MainActor, nonisolated methods can't access it
struct SemanticMatcher: Sendable {
    private let embedding: NLEmbedding?  // Implicitly @MainActor!

    nonisolated func match(text: String) -> Bool {
        guard let embedding = self.embedding else { return false }
        // ^^^^ Error: Main actor-isolated property 'embedding' cannot be
        //      referenced from a nonisolated context
        return embedding.contains(text)
    }
}

// ✅ CORRECT — nonisolated(unsafe) opts out of MainActor isolation
struct SemanticMatcher: Sendable {
    nonisolated(unsafe) private let embedding: NLEmbedding?

    nonisolated func match(text: String) -> Bool {
        guard let embedding = self.embedding else { return false }
        return embedding.contains(text)
    }
}
```

**Rule**: On any `Sendable` struct/class where methods are `nonisolated`, stored properties that those methods access MUST be `nonisolated(unsafe)`.

**Why debug builds don't catch this**: Simulator builds use `-Onone` (no optimization), which relaxes some isolation checks. Archive builds use `-O` (optimized) with full strict concurrency enforcement. The archive/debug divergence is the **#1 cause of Xcode Cloud failures**.

### 4a. `nonisolated` vs `nonisolated(unsafe)` — Know the Difference

These two annotations solve different problems. Using the wrong one compiles in debug but fails in archive.

| Annotation | Use For | Safety |
|------------|---------|--------|
| `nonisolated` | Immutable `let` properties, pure methods that don't touch isolated state | Fully checked by the compiler |
| `nonisolated(unsafe)` | Mutable `var` stored properties on `Sendable` types that need cross-isolation access | Unchecked — you are asserting thread safety yourself |

```swift
struct Config: Sendable {
    // ✅ nonisolated is enough — immutable let, compiler can verify safety
    nonisolated let id: String

    // ❌ WRONG — var requires nonisolated(unsafe), not plain nonisolated
    nonisolated var retryCount: Int  // Archive error: stored property must be immutable

    // ✅ CORRECT — var on Sendable type needs nonisolated(unsafe)
    nonisolated(unsafe) var retryCount: Int
}

@MainActor
@Observable
class MyService {
    // ✅ nonisolated(unsafe) for the static singleton (mutable storage)
    nonisolated(unsafe) static let shared = MyService()

    // ✅ nonisolated is fine for pure computed properties / methods
    nonisolated func computeHash() -> Int { return 42 }
}
```

**Decision guide**:
1. Is it a `let` property or a method that doesn't access isolated state? Use `nonisolated`.
2. Is it a `var` stored property on a `Sendable` type? Use `nonisolated(unsafe)`.
3. Not sure? Try `nonisolated` first — if archive builds reject it, upgrade to `nonisolated(unsafe)`.

### 5. Service Singleton Pattern

**CHECKLIST**: New services using correct singleton pattern?

```swift
@MainActor
@Observable
class MyService {
    // This is the pattern — nonisolated(unsafe) for shared instance
    nonisolated(unsafe) static let shared = MyService()

    private init() {}

    // Methods are MainActor-isolated by default
    func doWork() { }

    // Explicitly nonisolated for thread-safe operations
    nonisolated func compute() -> Int { return 42 }
}
```

### 6. Framework Imports

**CHECKLIST**: Are `@preconcurrency` imports added ONLY where the compiler specifically demands them?

> **Reversed guidance (2026-04-03):** iOS 26 first-party frameworks (AVFoundation, Speech, EventKit, Vision, SwiftData, ActivityKit, etc.) now ship with full Sendable annotations. Prophylactic `@preconcurrency` masks real concurrency issues that surface as archive crashes. Cadence removed `@preconcurrency` from 10 files and crashes stopped.

```swift
// ❌ WRONG — do not add prophylactically
@preconcurrency import Speech
@preconcurrency import EventKit
@preconcurrency import AVFoundation

// ✅ CORRECT — add only where the compiler specifically demands it
import Speech
import EventKit
import AVFoundation
@preconcurrency import SomeLegacyBinaryFramework  // Compiler demanded this
```

## Common Patterns

### Async Stream with MainActor Updates

```swift
Task {
    for try await result in asyncSequence {
        await MainActor.run {
            // Update UI state here
        }
    }
}
```

### Completion Handlers that Bridge Isolation

```swift
func fetchData(completion: @escaping @Sendable (Result<Data, Error>) -> Void) {
    // Work happens on background queue
    Task {
        let result = await performWork()
        // Completion is @Sendable, so result must be Sendable
        completion(result)
    }
}

// Usage in View:
fetchData { result in
    Task { @MainActor in
        switch result {
        case .success(let data): self.data = data
        case .failure(let error): self.error = error
        }
    }
}
```

## Quick Self-Check

Before finishing concurrency code, verify:

- [ ] No `[weak self]` in View structs
- [ ] All `@Sendable` closures that touch state use `Task { @MainActor in }`
- [ ] SwiftData models captured by ID, not by reference
- [ ] Sendable structs with `nonisolated` methods use `nonisolated(unsafe)` on stored properties
- [ ] `nonisolated` used for immutable `let` / pure methods; `nonisolated(unsafe)` used for mutable `var` stored properties
- [ ] Services use `nonisolated(unsafe) static let shared`
- [ ] Speech/EventKit imports use `@preconcurrency`
