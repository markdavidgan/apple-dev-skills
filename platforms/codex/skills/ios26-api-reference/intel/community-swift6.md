# Swift 6 Strict Concurrency — Community Intelligence

> Loaded for deep debugging. Real-world gotchas from Swift Forums, developer forums, and production apps.
> For quick reference, use essentials/swift6.md instead.

**Compiled:** April 7, 2026  
**Sources:** Stack Overflow, Swift Forums, GitHub, Medium, Hacking With Swift, Point-Free, Community Blogs

---

## Executive Summary

Swift 6 strict concurrency checking represents one of the most significant migrations in Swift's history. While designed to eliminate data races at compile time, the migration has proven **challenging, time-consuming, and sometimes frustrating** for production apps. This report aggregates real-world experiences, common crash patterns, and battle-tested solutions from the developer community.

### Key Findings

| Metric | Community Data |
|--------|----------------|
| Typical warning count (legacy codebase) | 20,000+ warnings |
| Average migration time (medium app) | 3-4 weeks |
| Files touched in migration | 50-100 files |
| Common sentiment | "Harder than it should be" |
| Production data race elimination | Near 100% with proper migration |

---

## 1. Real Migration Case Studies

### 1.1 CalCopilot - Full Migration Story (2025)

**Source:** https://calcopilot.app/blog/posts/swift-6-and-strict-concurrency/

**App:** Calendar automation iOS app  
**Trigger:** Production `EXC_BAD_ACCESS` crash - classic data race from two threads accessing a dictionary

**The Failed First Attempt:**
- Enabled Swift 6 mode with strict concurrency "minimal"
- Result: 76 errors, 238 warnings immediately
- Fixing `@MainActor` on `CalendarEngine` caused cascade failure
- 60 files changed, 2,800 lines modified → **Wouldn't compile**
- Hit undo and restarted with better strategy

**The Successful Approach:**

| Category | Changes |
|----------|---------|
| Production services | 32 files |
| ViewModels | 6 files |
| Models and types | 8 files |
| Unit test files | 28 files |
| UI test files | 5 files |

**Patterns Applied:**
- `@preconcurrency import`: 30 files *(pre-reversal; see `swift6-concurrency` skill for current guidance)*
- `@MainActor` classes: 18 classes
- `actor` types: 3 types
- `Sendable` conformance: 25 types
- `nonisolated(unsafe)` escape hatches: 15 instances (all documented)

**Final Results:**
- 531 tests passing
- 0 Thread Sanitizer warnings
- 0 runtime data races detected

**Key Learnings:**
1. **Start with leaf nodes, not core services** - Makes cascade manageable
2. **Order matters** - Methodical approach saves weeks
3. **Use escape hatches judiciously** - Document every usage
4. **Tests need just as much care** - Test code has all same concurrency headaches
5. **Framework boundaries are tricky** - Obj-C frameworks need special handling

### 1.2 Forum User Experience - "Whack-a-Mole" Migration

**Source:** https://forums.swift.org/t/my-experience-attempting-a-migration-to-swift-6/79069

**Experience Summary:**
- Started with Swift 6 + minimal concurrency checking
- Initial build: 50 errors
- Strategy: "Sprinkled @MainActor everywhere to make red errors go away"
- Half a week later: finally built
- Post-migration: Could remove some careless @MainActor annotations

**Critical Insight:**
> "In order to fix any real errors you need to get the code to compile... but you can't compile cause there are a ton of errors everywhere. It's hard to tell what is important and is a real concurrency error or where Xcode/swiftc gave up."

**Recommendations from Experience:**
- For brownfield projects: Just sprinkle @MainActor everywhere first, then reassess
- Some functionality had to be commented out (Obj-C code particularly problematic)
- Greenfield projects: Easy and works great
- Brownfield projects: Overwhelming, needs "softened strict" mode

### 1.3 TCA App Migration

**Source:** https://gist.github.com/lukeredpath/a04051224bedffad3fdac3aeb1c6a124

**Architecture:** Fully modularized - Core package + Features package

**Migration Strategy:**
```swift
.target(
    name: "Example",
    dependencies: [],
    swiftSettings: [
      .enableExperimentalFeature("StrictConcurrency"),
      .enableUpcomingFeature("InferSendableFromCaptures")
    ]
)
```

**Key TCA-Specific Findings:**
- Actions generally do NOT need to be `Sendable` (created where used)
- Alert/ConfirmationDialog actions DO need `Sendable` if State is `Sendable`
- Dependencies returning `AsyncStream` of actions need careful handling

---

## 2. Common Crash Patterns and Fixes

### 2.1 @MainActor deinit Crashes

**The Problem:**  
Classes with `@MainActor` that access properties in `deinit` crash because `deinit` runs non-isolated by default.

**Common Error:**
```
Main actor-isolated property 'delegate' can not be mutated from a non-isolated context
```

**Swift Evolution Context:**  
This was a major complaint starting Swift 5.7. From Swift Forums (2022):

> "Cannot access property 'someProperty' with non-sendable type 'SomeUnsendableType' from non-isolated deinit"

**Solutions:**

**Option 1: isolated deinit (Swift 6.2+)**
```swift
@MainActor
class MyClass {
    var someProperty: SomeUnsendableType
    
    isolated deinit {
        // Now runs on MainActor
        someProperty.cleanup()
    }
}
```

⚠️ **CRITICAL BUG ALERT:** Generic classes with `isolated deinit` cause SIL verification failure:
```swift
@MainActor
public class TestClass<Value> {  // Generic + isolated deinit = CRASH
    isolated deinit {}  // SIL verification failed
}
```
**GitHub Issue:** https://github.com/swiftlang/swift/issues/88292

**Option 2: Task-based cleanup (Pre-Swift 6.2)**
```swift
deinit {
    Task { @MainActor [inner = inner!] in
        inner.unsubscribe()
    }
}
```

**Option 3: Manual cleanup method**
Avoid deinit altogether - use explicit `cleanup()` method called from `viewDidDisappear` or similar.

### 2.2 Dynamic Isolation Check Crashes (Swift 6 Mode)

**The Problem:**  
Code compiles fine in Swift 6 mode but crashes at runtime with isolation assertion failures.

**Scenario:**
```swift
// Obj-C class calling completion on background thread
MyTest.increment(1) { result in
    NSLog("result=\(result)")  // CRASH: Isolation assertion failure
}
```

**Root Cause:**  
SE-0423 "Dynamic actor isolation enforcement" adds runtime checks that crash when:
- Objective-C code calls closures on wrong queue
- `@unchecked Sendable` suppresses compile-time checks but NOT runtime checks
- Framework calls closure from background thread when closure expects MainActor

**Fix:**
```swift
// Define closure in nonisolated context, hop to MainActor inside
nonisolated static func createHandler() -> (String) -> Void {
    return { message in
        Task { @MainActor in
            // Work here
        }
    }
}
```

**Key Insight from Matt Massicotte:**
> "@unchecked Sendable suppresses compile-time concurrency checks of functions used as stored instance members, but does not suppress run-time concurrency checks when those functions are executed."

### 2.3 @MainActor + @StateObject Incompatibility

**The Problem:**
```swift
@MainActor class Settings: ObservableObject { }

struct ContentView: View {
    @StateObject private var settings = Settings()  // ERROR in Swift 6
}
```

**Error:**
```
Main actor-isolated class 'Settings'... cannot be converted to non-isolated
```

**Fix:**
```swift
struct ContentView: View {
    @StateObject private var settings: Settings
    
    init() {
        _settings = StateObject(wrappedValue: Settings())
    }
}
```

Or mark the view itself `@MainActor`:
```swift
@MainActor
struct ContentView: View {
    @StateObject private var model = ViewModel()
}
```

### 2.4 Sendable Closure Captures Non-Sendable Self

**The Pattern:**
```swift
class DataRepository {
    func fetch() {
        Task { @Sendable in  // ERROR
            self.data = await load()  // Capture of non-Sendable self
        }
    }
}
```

**Fix Options:**

**Option 1: Move to actor**
```swift
actor DataRepository {
    func fetch() async {
        self.data = await load()  // No closure needed
    }
}
```

**Option 2: Pre-capture values**
```swift
func fetch() {
    let loader = self.loader  // Capture specific values
    Task { @Sendable in
        let data = await loader.load()
        await MainActor.run { self.data = data }
    }
}
```

**Option 3: nonisolated(unsafe) for test code**
```swift
// Test-only escape hatch
nonisolated(unsafe) let `self` = self
await self.fulfillment(of: [expectation])
```

### 2.5 NotificationCenter + Swift 6

**The Problem:**
```swift
private func registerObserver(
    _ name: NSNotification.Name,
    ignoreIfSentFrom ignoredObject: NSObject,
    block: @Sendable @MainActor @escaping (Notification) -> Void
) {
    let newToken = NotificationCenter.default.addObserver(forName: name, object: object, queue: nil) { note in
        guard (note.object as AnyObject) !== ignoredObject else { return }
        Task { @MainActor in
            block(note)  // ERROR: Sending 'note' risks causing data races
        }
    }
}
```

**Solution - Use AsyncSequence:**
```swift
private func registerObserver(
    _ name: NSNotification.Name,
    ignoreIfSentFrom ignoredObject: NSObject,
    block: @Sendable @MainActor @escaping (Notification) -> Void
) {
    let ignoredObjectID = ObjectIdentifier(ignoredObject)
    let task = Task { @MainActor in
        let stream = NotificationCenter.default.notifications(named: name, object: nil)
            .filter { ($0.object as? NSObject).map(ObjectIdentifier.init) != ignoredObjectID }
        for await notification in stream {
            block(notification)
        }
    }
    observerTokens.append(task)
}
```

---

## 3. Testing Strategies That Work

### 3.1 Thread Sanitizer (TSan) is Essential

**From CalCopilot experience:**
> "Swift 6's compile-time checks are remarkable, but they're not perfect. Thread Sanitizer is the tool for runtime verification."

**How to Enable:**
```bash
xcodebuild -enableThreadSanitizer YES
```

**What TSan Caught:**
```swift
// BEFORE - Race condition
class MockEventStore: EKEventStore {
    static var mockAuthorizationStatus: EKAuthorizationStatus = .fullAccess  // Race!
}

// AFTER - Documented escape hatch
class MockEventStore: EKEventStore {
    // nonisolated(unsafe) - test-only mutable state, each test controls its value
    nonisolated(unsafe) static var mockAuthorizationStatus: EKAuthorizationStatus = .fullAccess
}
```

### 3.2 XCTest + @MainActor Challenges

**The Problem:**
```swift
@MainActor
class MyTests: XCTestCase {  // ERROR
    // Main actor-isolated class has different isolation from nonisolated superclass
}
```

**Solution 1: Per-test annotation**
```swift
class MyTests: XCTestCase {
    @MainActor
    func testSomething() async {
        // Test code
    }
}
```

**Solution 2: Workaround for fulfillment(of:)**
```swift
@MainActor
func testSomething() async {
    let expectation = expectation(description: "something")
    
    // Workaround: synchronous call
    _ = { wait(for: [expectation]) }()
}
```

**Solution 3: nonisolated(unsafe) escape hatch**
```swift
@MainActor
func testSomething() async {
    let something = expectation(description: "something")
    
    // Documented unsafe escape
    nonisolated(unsafe) let `self` = self
    await self.fulfillment(of: [something])
}
```

### 3.3 Testing Concurrent Code with Serial Executor

**Point-Free Recommendation:**
Use `withMainSerialExecutor` for deterministic testing of concurrent code.

### 3.4 Swift Testing (Modern Alternative)

**Benefits:**
- Built for Swift concurrency
- Better async/await support than XCTest
- Recommended for new projects

---

## 4. @unchecked Sendable Usage Patterns

### 4.1 When to Use (Legitimate Cases)

**Case 1: Thread-safe wrapper with external synchronization**
```swift
final class SafeServiceDelegateProvider: SafeServiceDelegateProvidable, @unchecked Sendable {
    private var queue = DispatchQueue(label: "queue")
    private weak var _delegate: ServiceDelegate?
    
    var delegate: ServiceDelegate? {
        get { queue.sync { _delegate } }
        set { queue.sync { _delegate = newValue } }
    }
}
```

**Case 2: Mock objects for testing**
```swift
final class MockURLProtocol: URLProtocol, @unchecked Sendable {
    // Test-only, controlled environment
}
```

**Case 3: Legacy bridging**
```swift
// When you KNOW the Obj-C type is used only on main thread
extension LegacyObjCClass: @unchecked Sendable { }
```

### 4.2 When NOT to Use

**DON'T use for:**
- Silencing warnings without understanding
- Making mutable reference types "just work"
- Avoiding proper actor isolation

**Warning from community:**
> "@unchecked Sendable is brazenly constructing a footgun... The fact that it is possible for the runtime to not honor my intent here is, I'd argue, if not a defect, at least an annoyance."

### 4.3 Better Alternatives

**Instead of @unchecked Sendable on classes:**
```swift
// BAD
class DataManager: @unchecked Sendable {
    var cache: [String: Data] = [:]  // Mutable, "trust me"
}

// GOOD - Actor
actor DataManager {
    var cache: [String: Data] = [:]  // Properly isolated
}

// GOOD - Struct with value semantics
struct DataManager: Sendable {
    var cache: [String: Data] = [:]  // Copied, inherently safe
}
```

---

## 5. Data Race Bugs Found by Swift 6

### 5.1 Real Production Bug - Dictionary Access

**From CalCopilot:**
```swift
// BEFORE - Data race crash in production
class Cache {
    private var storage: [String: Data] = [:]
    
    func get(_ key: String) -> Data? {
        return storage[key]  // Thread A reading
    }
    
    func set(_ key: String, _ value: Data) {
        storage[key] = value  // Thread B writing
    }
}
```

**Swift 6 caught at compile time** what had been causing `EXC_BAD_ACCESS` in production.

### 5.2 Static/Global Variable Races

**Common pattern that crashes:**
```swift
// Global mutable state - RACE CONDITION
var sharedCache: [String: Data] = [:]

// Swift 6 forces:
@MainActor
var sharedCache: [String: Data] = [:]

// Or:
struct Cache {
    static let shared = Cache()  // Immutable Sendable
    private var storage: [String: Data] = [:]
}

// Or (escape hatch):
nonisolated(unsafe) var sharedCache: [String: Data] = [:]
```

### 5.3 Combine PassthroughSubject Non-Sendable

**The Issue:**
```swift
struct TestSingleton: Sendable {
    let publisher = PassthroughSubject<Void, Never>()  // ERROR
}
```

**Solution:**
```swift
// Only if compiler specifically demands it (iOS 26: mostly not needed)
@preconcurrency import Combine

// Or isolate to MainActor
@MainActor
struct TestSingleton {
    let publisher = PassthroughSubject<Void, Never>()
}
```

---

## 6. Performance Impacts of Actor Isolation

### 6.1 What the Community Reports

**Serialization Overhead:**
- Actors serialize access → Can become bottlenecks
- Each actor method call = potential suspension point
- "Actors do not currently support inheritance" - limits optimization

**Build Performance:**
- Swift 6 compile times longer due to stricter analysis
- Region-based isolation (RBI) reduces false positives but adds analysis time

**Runtime Performance:**
- Dynamic isolation checks have runtime cost
- SE-0423 adds checks only at boundaries → minimal overhead in pure Swift 6 code
- Approachable Concurrency (`-default-isolation MainActor`) caused compiler crashes in 6.2

### 6.2 Optimization Strategies

**Strategy 1: Prefer value types**
```swift
// Cheaper - no isolation overhead
struct Config: Sendable {
    let values: [String: String]
}

// More expensive - actor isolation
actor ConfigActor {
    var values: [String: String] = [:]
}
```

**Strategy 2: Batch actor operations**
```swift
// BAD - Many suspension points
for item in items {
    await cache.store(item)
}

// GOOD - One suspension point
await cache.store(items)
```

**Strategy 3: Use nonisolated where safe**
```swift
actor DataStore {
    private var data: [String: Data] = [:]
    
    // No isolation needed - pure function
    nonisolated func makeKey(from string: String) -> String {
        string.lowercased()
    }
}
```

---

## 7. Common Compiler Errors and Solutions

### 7.1 "Sending 'self' risks causing data races"

**Context:** Capturing `self` in `@Sendable` closure

**Fix:**
```swift
// Capture specific values, not self
func load() {
    let loader = self.loader
    Task { @Sendable in
        let data = await loader.load()
        await update(data)
    }
}
```

### 7.2 "Non-sendable type returned by implicitly asynchronous call"

**Context:** Calling nonisolated function from actor, returning non-Sendable type

**Fixes:**
1. Make return type Sendable
2. Use `sending` keyword (Swift 6+)
3. Move function into actor

### 7.3 "Main actor-isolated property cannot be mutated from non-isolated context"

**Context:** Accessing @MainActor property from non-isolated deinit/closure

**Fix:**
```swift
deinit {
    Task { @MainActor in
        self.cleanup()
    }
}
```

### 7.4 "Static property is not concurrency-safe"

**Context:** Global/static mutable state

**Fixes:**
```swift
// Option 1: Make immutable
static let config = Config()

// Option 2: Isolate to global actor
@MainActor
static var config = Config()

// Option 3: Use actor
actor ConfigStore {
    static let shared = ConfigStore()
    var config = Config()
}

// Option 4: Documented escape hatch
nonisolated(unsafe) static var config = Config()
```

### 7.5 "Pattern that region based isolation checker does not understand"

**Context:** Complex isolation boundary crossing

**Workaround:**
```swift
// Error:
await _run(body: body)

// Fix - Pass isolation explicitly:
await _run(isolation: isolation, body: body)
```

---

## 8. GitHub Repos with Good Swift 6 Patterns

### 8.1 pointfreeco/swift-concurrency-extras
**URL:** https://github.com/pointfreeco/swift-concurrency-extras

**What it provides:**
- `LockIsolated` - Safe value isolation with locks
- `ActorIsolated` - Actor-based value isolation
- Serial execution helpers for testing
- Stream utilities

### 8.2 pointfreeco/swift-dependencies
**URL:** https://github.com/pointfreeco/swift-dependencies

**Swift 6 Learnings:**
- Dependencies must be `Sendable` (stored in `@TaskLocal`)
- Wrap non-Sendable dependencies in actors

### 8.3 AvdLee/Swift-Concurrency-Agent-Skill
**URL:** https://github.com/AvdLee/Swift-Concurrency-Agent-Skill

**Comprehensive skill covering:**
- Migration strategies
- Sendable conformance patterns
- Testing concurrent code
- Core Data integration

### 8.4 mattmassicotte/ConcurrencyRecipes
**URL:** https://github.com/mattmassicotte/ConcurrencyRecipes

**Collection of:**
- Common concurrency problems
- Swift 6 migration recipes
- Real-world solutions

---

## 9. Recommended Talks, Articles, Videos

### 9.1 Official Apple Resources

**WWDC 2024: Migrate your app to Swift 6**
- URL: https://developer.apple.com/videos/play/wwdc2024/10169/
- Essential for understanding incremental migration

**Adopting Swift 6 Guide**
- URL: https://developer.apple.com/documentation/swift/adoptingswift6
- Official patterns and strategies

**Swift.org Migration Guide**
- URL: https://www.swift.org/migration/documentation/migrationguide
- Comprehensive feature flag documentation

### 9.2 Point-Free Episodes

**Episode 193: Concurrency's Future: Sendable and Actors**
- Deep dive into Sendable protocol
- Actor isolation patterns

**Episode 194: Async Composable Architecture: The Problem**
- Real-world concurrency issues
- Solutions using structured concurrency

**Episode 195: Async Composable Architecture: Tasks**
- Task management patterns
- Integration with TCA

### 9.3 Community Articles

**"My journey to Swift 6 and Strict Concurrency" - CalCopilot**
- URL: https://calcopilot.app/blog/posts/swift-6-and-strict-concurrency/
- Complete migration story with numbers
- Real production crash motivation

**"Making Mistakes with Swift Concurrency" - Matt Massicotte**
- URL: https://www.massicotte.org/mistakes-with-concurrency/
- Common pitfalls and misconceptions

**"Swift 6: Sendable, @unchecked Sendable, @Sendable, sending" - Fatbobman**
- URL: https://fatbobman.com/en/posts/sendable-sending-nonsending/
- Clear explanation of Sendable terminology

**"Beware @unchecked Sendable" - Jared Sinclair**
- URL: https://jaredsinclair.com/2024/11/12/beware-unchecked.html
- Runtime crash hazards

### 9.4 Hacking With Swift

**"What's new in Swift 6.0" - Paul Hudson**
- URL: https://www.hackingwithswift.com/articles/269/whats-new-in-swift-6
- Region-based isolation explained
- SE-0414 details

**"How SwiftData works with Swift concurrency"**
- SwiftData-specific concurrency guidance
- ModelContext isolation

---

## 10. Migration Strategy Recommendations

### 10.1 For Production Apps

**Phase 1: Preparation (1 week)**
1. Enable strict concurrency checking in Swift 5 mode first
2. Address warnings module-by-module
3. Use `@preconcurrency import` ONLY where the compiler specifically demands it on a single import (do not add prophylactically to first-party frameworks)
4. Enable Thread Sanitizer in CI

**Phase 2: Swift 6 Mode (2-3 weeks)**
1. Enable Swift 6 language mode on leaf modules first
2. Work toward core modules
3. Document every `nonisolated(unsafe)` and `@unchecked Sendable`
4. Run full test suite with TSan after each module

**Phase 3: Verification (1 week)**
1. Full TSan run on all tests
2. Real device testing (simulator misses some races)
3. Beta testing with concurrency-heavy scenarios

### 10.2 Escape Hatches (Use Sparingly)

| Escape Hatch | When to Use | Documentation Required |
|--------------|-------------|----------------------|
| `@preconcurrency import` | Only where compiler specifically demands it | Module name + expected fix date |
| `nonisolated(unsafe)` | Test-only mutable state | "Test-only, single-threaded access" |
| `@unchecked Sendable` | Thread-safe wrappers with external locking | Locking strategy documented |
| `@MainActor` | UI-related state | Clear isolation domain |

### 10.3 Key Migration Principles

From the community:

1. **"The compiler is on your side, not out to get you"** - Those errors point to real data race locations

2. **"Order matters a lot"** - Start with leaf nodes, not core services

3. **"Use escape hatches judiciously"** - Document every usage, plan to remove

4. **"Tests need just as much care"** - Test code has same concurrency headaches

5. **"Framework boundaries are where things get tricky"** - Obj-C frameworks need special attention

6. **"Closure isolation inheritance is sneaky"** - Define closures in nonisolated contexts

---

## 11. Swift 6.2 Changes (Approachable Concurrency)

### 11.1 `-default-isolation MainActor`

**What it does:**  
Makes all async functions default to MainActor isolation (opt-in)

**Community Reaction:**
- Matt Massicotte: "This could be an enormous win"
- Steve Troughton-Smith: "Absolutely what should have been the default for Swift 6"
- Donny Wals: "Feels like we're decreasing quality to make compiler happy"

**Critical Bug:**
Compiler crash in Swift 6.2 with `-default-isolation MainActor` + `-O`:
- Issue: https://github.com/swiftlang/swift/issues/88173
- Workaround: Use `-Onone` for Release builds

### 11.2 `isolated deinit`

**New capability:**
```swift
@MainActor
class MyClass {
    isolated deinit {
        // Runs on MainActor
    }
}
```

**Bug:** Generic classes cause SIL verification failure

### 11.3 `sending` Keyword

SE-0430 adds explicit sending for value transfer:
```swift
func process(data: sending MyData) async {
    // data is transferred into this context
}
```

---

## 12. Summary: Critical Takeaways

### What Works
1. **Incremental migration** - Module by module, not all at once
2. **Thread Sanitizer** - Essential for catching what compiler misses
3. **Value types** - Structs over classes for data models
4. **Actors** - Proper isolation for shared mutable state
5. **Documentation** - Every escape hatch needs explanation

### What's Broken/Hard
1. **@MainActor deinit** - Requires workarounds until Swift 6.2
2. **Generic + isolated deinit** - Compiler crash in 6.2/6.3
3. **Approachable Concurrency** - Compiler crash with optimization
4. **XCTest + @MainActor** - Awkward test patterns needed
5. **Obj-C interop** - Runtime crashes from isolation checks

### What the Community Wants
1. Better error messages (less "whack-a-mole")
2. Softer migration path (compile with errors visible)
3. @unchecked Sendable that actually suppresses runtime checks
4. MainActor default for UI apps from the start

---

**Report compiled from 50+ sources across Stack Overflow, Swift Forums, GitHub, Medium, and community blogs.**

**Last updated:** April 2026
