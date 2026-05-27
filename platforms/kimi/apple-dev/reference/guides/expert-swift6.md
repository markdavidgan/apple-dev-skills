# Swift 6 Concurrency Mastery — Expert Guide

> Loaded for deep debugging sessions. For quick reference, use essentials/swift6.md instead.
> Source: Synthesized from Apple docs, WWDC sessions, and production experience.

---

## Table of Contents

1. [Core Concurrency Concepts](#1-core-concurrency-concepts)
2. [@MainActor Patterns & Anti-Patterns](#2-mainactor-patterns--anti-patterns)
3. [Sendable Conformance Strategies](#3-sendable-conformance-strategies)
4. [Actor Isolation Patterns](#4-actor-isolation-patterns)
5. [Nonisolated Deinit Safety](#5-nonisolated-deinit-safety)
6. [@unchecked Sendable: When/Why/How](#6-unchecked-sendable-whenwhyhow)
7. [Common Concurrency Bugs & Fixes](#7-common-concurrency-bugs--fixes)
8. [Migration Guide from Swift 5](#8-migration-guide-from-swift-5)

---

## 1. Core Concurrency Concepts

### 1.1 Swift 6 Strict Concurrency Overview

Swift 6 enables **complete concurrency checking by default**. This means:

- Data race safety is **mandatory**, not optional
- Compiler errors (not warnings) for violations
- No way to disable strict checking in Swift 6 mode
- Runtime crashes from data races are prevented at compile time

### 1.2 The Fundamental Rule

> **Any mutable state shared across concurrency domains MUST be protected.**

Concurrency domains include:
- Different actors
- Main actor vs background tasks
- Different Task contexts
- Closures passed between isolation domains

### 1.3 Sendability: The Core Concept

A type is **Sendable** if it can be safely passed between concurrency domains:

```swift
// These are inherently Sendable:
- Value types (structs, enums) with Sendable members
- Immutable reference types (final class with let properties)
- Actors (automatically Sendable)
- @MainActor classes (implicitly Sendable)

// These are NOT Sendable by default:
- Regular classes with mutable state
- Non-final classes
- Types with non-Sendable members
```

### 1.4 Isolation Regions (Swift 6+)

Swift 6 introduces **isolation regions** (SE-0414) that allow the compiler to prove different parts of code can run concurrently without explicit Sendable conformance:

```swift
class User {
    var name = "Anonymous"
}

struct ContentView: View {
    var body: some View {
        Text("Hello")
            .task {
                let user = User()           // Created here
                await loadData(for: user)   // Passed within same region
            }
    }
    
    func loadData(for user: User) async {
        print(user.name)  // No warning in Swift 6 - compiler proves safety
    }
}
```

**Key insight:** The compiler analyzes program flow and detects when non-Sendable types are used safely within an isolation region.

---

## 2. @MainActor Patterns & Anti-Patterns

### 2.1 What is @MainActor?

`@MainActor` is a **global actor** whose executor is the main dispatch queue. It ensures all isolated code runs on the main thread.

```swift
@MainActor
class ViewModel: ObservableObject {
    @Published var count = 0  // Always accessed on main thread
    
    func increment() {
        count += 1  // Safe - guaranteed main thread
    }
}
```

### 2.2 @MainActor Patterns

#### Pattern 1: UI-Related Classes
```swift
@MainActor
final class ProfileViewController: UIViewController {
    private var userProfile: UserProfile?
    
    func updateUI() {
        // Safe: always on main thread
        usernameLabel.text = userProfile?.name
    }
}
```

#### Pattern 2: ObservableObject ViewModels
```swift
@MainActor
final class TaskListViewModel: ObservableObject {
    @Published private(set) var tasks: [Task] = []
    
    func fetchTasks() async {
        tasks = await repository.fetchAll()
    }
}
```

#### Pattern 3: Isolated Properties in Non-Actor Classes
```swift
final class NetworkManager {
    @MainActor
    var lastError: Error?  // Only accessible on main actor
    
    nonisolated func fetchData() async throws -> Data {
        // Background work
        let data = try await URLSession.shared.data(from: url).0
        return data
    }
}
```

#### Pattern 4: Protocol Conformance with Default Isolation
```swift
protocol DataRefreshable: AnyObject {
    @MainActor
    func reloadData()
}

// In Swift 6.2+: Can use default actor isolation for entire target
// swiftSettings: [.defaultIsolation(MainActor.self)]
```

### 2.3 @MainActor Anti-Patterns

#### Anti-Pattern 1: Over-Isolation
```swift
// BAD: Everything on MainActor unnecessarily
@MainActor
final class DataProcessor {
    func heavyComputation() -> [Result] {
        // This blocks the main thread!
        return massiveDataset.map { expensiveTransform($0) }
    }
}

// GOOD: Keep heavy work off main thread
final class DataProcessor {
    func heavyComputation() async -> [Result] {
        return await Task.detached {
            massiveDataset.map { expensiveTransform($0) }
        }.value
    }
}
```

#### Anti-Pattern 2: Mixing Isolation Without Proper Transfer
```swift
// BAD: Data race risk
class BadViewModel {
    private var data: [Item] = []  // Non-isolated mutable state
    
    @MainActor
    func updateFromUI() {
        data.append(newItem)  // Race condition!
    }
    
    func backgroundUpdate() {
        data.append(otherItem)  // Race condition!
    }
}

// GOOD: Use proper actor isolation
actor GoodViewModel {
    private var data: [Item] = []
    
    func update(_ item: Item) {
        data.append(item)  // Safe: actor protects state
    }
}
```

#### Anti-Pattern 3: Assuming @MainActor Inheritance
```swift
// Swift 6: Property wrapper inference is disabled
class MyView: View {
    @StateObject var viewModel = ViewModel()  // @MainActor
    
    // In Swift 5: View inferred @MainActor
    // In Swift 6: View is NOT @MainActor - must mark explicitly
    var body: some View {
        Text("Hello")
    }
}

// FIX: Explicitly mark in Swift 6
@MainActor
class MyView: View {
    @StateObject var viewModel = ViewModel()
    
    var body: some View {
        Text("Hello")
    }
}
```

### 2.4 MainActor.assumeIsolated

Use when you **know** code runs on the main thread but the compiler can't prove it:

```swift
nonisolated func cleanup() {
    // Called from deinit, but we know we're on main thread
    MainActor.assumeIsolated {
        NotificationCenter.default.removeObserver(self)
        // Other main-thread cleanup
    }
}
```

**Warning:** Only use when you're certain about the thread. Wrong assumptions cause crashes.

---

## 3. Sendable Conformance Strategies

### 3.1 Implicit Sendable Conformance

These types automatically conform to Sendable:

```swift
// Value types with Sendable members
struct User: Sendable {  // Implicit conformance
    let id: UUID
    let name: String
}

// Frozen enums
enum Status: Sendable {  // Implicit conformance
    case pending
    case completed(Date)
}

// Internal structs/enums (not public, not @usableFromInline)
struct InternalConfig {  // Implicitly Sendable
    let timeout: TimeInterval
    let retryCount: Int
}
```

### 3.2 Explicit Sendable Conformance

```swift
// Struct with all Sendable members
public struct APIRequest: Sendable {
    public let endpoint: String
    public let method: HTTPMethod
    public let body: Data?
}

// Final class with immutable Sendable properties
public final class Configuration: Sendable {
    public let apiKey: String
    public let baseURL: URL
    
    public init(apiKey: String, baseURL: URL) {
        self.apiKey = apiKey
        self.baseURL = baseURL
    }
}
```

### 3.3 Conditional Sendable Conformance

```swift
// Generic type - Sendable when generic parameter is Sendable
struct Container<T>: Sendable where T: Sendable {
    var value: T
}

// Enum with associated values
enum Result<T>: Sendable where T: Sendable {
    case success(T)
    case failure(Error)
}

// Note: Error protocol doesn't conform to Sendable
// Use struct-based errors for Sendable conformance
struct AppError: Error, Sendable {
    let code: Int
    let message: String
}
```

### 3.4 Actor-Based Sendable

```swift
// Actors are implicitly Sendable
actor Cache<Key: Hashable & Sendable, Value: Sendable> {
    private var storage: [Key: Value] = [:]
    
    func get(_ key: Key) -> Value? {
        storage[key]
    }
    
    func set(_ key: Key, value: Value) {
        storage[key] = value
    }
}

// Usage: Cache itself is Sendable, can be passed between tasks
let cache = Cache<String, User>()
Task {
    await cache.set("user1", value: user)
}
```

### 3.5 @Sendable Closures

```swift
// Function expecting Sendable closure
func executeWork(
    _ operation: @Sendable @escaping () -> Void
) {
    Task.detached(operation: operation)
}

// Usage
executeWork { @Sendable in
    // Closure and all captures must be Sendable
    print("Running in background")
}

// Swift 6: `sending` parameter modifier (SE-0430)
func processData(
    operation: sending @escaping () -> Void
) {
    // Ownership transferred - compiler checks usage patterns
}
```

### 3.6 Sendable and Protocols

```swift
// Protocol requiring Sendable conformance
protocol Repository: Sendable {
    associatedtype Entity: Sendable
    func fetch(id: UUID) async throws -> Entity
}

// Implementation must be Sendable
actor UserRepository: Repository {
    typealias Entity = User
    
    func fetch(id: UUID) async throws -> User {
        // Implementation
    }
}
```

---

## 4. Actor Isolation Patterns

### 4.1 Basic Actor Pattern

```swift
actor BankAccount {
    private var balance: Double
    private var transactions: [Transaction] = []
    
    init(initialBalance: Double) {
        self.balance = initialBalance
    }
    
    func deposit(_ amount: Double) {
        balance += amount
        transactions.append(.deposit(amount))
    }
    
    func withdraw(_ amount: Double) throws {
        guard balance >= amount else {
            throw InsufficientFundsError()
        }
        balance -= amount
        transactions.append(.withdrawal(amount))
    }
    
    func getBalance() -> Double {
        balance
    }
}

// Usage
let account = BankAccount(initialBalance: 100)
await account.deposit(50)
let balance = await account.getBalance()
```

### 4.2 Nonisolated Members

```swift
actor DataStore {
    nonisolated let identifier: String  // Constant - safe to access directly
    private var data: [Item] = []
    
    init(identifier: String) {
        self.identifier = identifier
    }
    
    // Nonisolated method - no await needed
    nonisolated func generateReportHeader() -> String {
        return "Report for: \(identifier)"  // Can only access nonisolated state
    }
    
    // Isolated method - requires await from outside
    func addItem(_ item: Item) {
        data.append(item)
    }
}
```

### 4.3 Isolated Parameters

```swift
// External function that acts like it's inside the actor
func transfer(
    amount: Double,
    from source: isolated BankAccount,
    to destination: isolated BankAccount
) async throws {
    // Inside this function, we have synchronous access to both accounts
    // Warning: Cannot have two isolated parameters from different actors
    try await source.withdraw(amount)
    await destination.deposit(amount)
}

// Better: Isolated parameter for single actor access
func auditAccount(_ account: isolated BankAccount) -> AuditResult {
    // Synchronous access to account's isolated state
    return AuditResult(balance: account.balance)
}
```

### 4.4 Global Actor Isolation

```swift
// Custom global actor
@globalActor
struct DatabaseActor {
    static let shared = DatabaseActor()
    static let sharedContext = NSManagedObjectContext(/* ... */)
    
    static func run<T>(
        resultType: T.Type = T.self,
        body: @DatabaseActor () throws -> T
    ) rethrows -> T {
        try body()
    }
}

// Usage
@DatabaseActor
class CoreDataRepository {
    func save() throws {
        // Runs on DatabaseActor's executor
        try context.save()
    }
}
```

### 4.5 Actor Reentrancy

```swift
actor Counter {
    private var count = 0
    
    func increment() {
        count += 1
    }
    
    // Actor is reentrant: other methods can be called during suspension points
    func incrementAfterDelay() async {
        await Task.sleep(1_000_000_000)  // Suspension point
        // State might have changed during suspension!
        count += 1
    }
}
```

**Reentrancy safety pattern:**
```swift
actor SafeCounter {
    private var count = 0
    
    func incrementAfterDelay() async {
        // Capture state before suspension
        let currentCount = count
        
        await Task.sleep(1_000_000_000)
        
        // Use captured value, check if still valid
        if count == currentCount {
            count += 1
        }
    }
}
```

---

## 5. Nonisolated Deinit Safety

### 5.1 The Deinit Problem

`deinit` **cannot** be isolated to an actor because the last reference could go out of scope on any thread.

```swift
@MainActor
class ViewController {
    private var observer: NSObjectProtocol?
    
    init() {
        observer = NotificationCenter.default.addObserver(
            forName: .something,
            object: nil,
            queue: .main
        ) { _ in }
    }
    
    // Cannot mark deinit as @MainActor or isolated
    deinit {
        // Running on arbitrary thread!
        // Cannot safely access MainActor-isolated properties
    }
}
```

### 5.2 Solutions for Deinit

#### Solution 1: Nonisolated with Manual Cleanup
```swift
@MainActor
final class SafeViewController {
    private var observer: NSObjectProtocol?
    
    init() {
        observer = NotificationCenter.default.addObserver(
            forName: .something,
            object: nil,
            queue: .main
        ) { _ in }
    }
    
    nonisolated func cleanup() {
        // Safe to call from anywhere
        if let observer {
            NotificationCenter.default.removeObserver(observer)
        }
    }
    
    deinit {
        cleanup()
    }
}
```

#### Solution 2: MainActor.assumeIsolated (When Certain)
```swift
@MainActor
final class ViewModel {
    private var cancellables: Set<AnyCancellable> = []
    
    nonisolated func performCleanup() {
        // Called from deinit, but we know context
        MainActor.assumeIsolated {
            cancellables.removeAll()
        }
    }
    
    deinit {
        performCleanup()
    }
}
```

#### Solution 3: Async Deinit Pattern (Future)
```swift
// SE-XXXX: Proposed isolated deinit (not yet implemented)
@MainActor
final class FutureClass {
    private var mainThreadResource: MainThreadResource
    
    // Proposed syntax for future Swift versions
    isolated deinit {
        // Would run on MainActor
        mainThreadResource.cleanup()
    }
}

// Current workaround: Use detached task with care
deinit {
    let resource = mainThreadResource
    Task { @MainActor in
        resource.cleanup()
    }
}
```

### 5.3 Best Practices for Deinit

```swift
// DO: Store resources that need cleanup in nonisolated properties
final class ResourceManager {
    private let lock = NSLock()
    private var resources: [Resource] = []
    
    nonisolated func addResource(_ resource: Resource) {
        lock.withLock {
            resources.append(resource)
        }
    }
    
    deinit {
        // Safe: lock and resources are nonisolated
        lock.withLock {
            for resource in resources {
                resource.cleanup()
            }
        }
    }
}

// DO: Use weak references for observers
final class SafeObserver {
    weak var delegate: Delegate?
    
    deinit {
        // No cleanup needed - weak reference auto-nil
    }
}

// DON'T: Access actor-isolated state in deinit
actor BadExample {
    private var data: Data
    
    // This won't compile in Swift 6
    deinit {
        // Cannot access isolated state here
        print(data.count)  // Error
    }
}
```

---

## 6. @unchecked Sendable: When/Why/How

### 6.1 What is @unchecked Sendable?

`@unchecked Sendable` tells the compiler: **"I guarantee this type is thread-safe, don't check me."**

It disables compile-time Sendable verification. You take full responsibility for correctness.

### 6.2 Legitimate Use Cases

#### Case 1: Manual Synchronization with Locks
```swift
import Foundation

final class ThreadSafeCache<Key: Hashable, Value>: @unchecked Sendable {
    private var storage: [Key: Value] = [:]
    private let queue = DispatchQueue(
        label: "cache",
        attributes: .concurrent
    )
    
    func get(_ key: Key) -> Value? {
        queue.sync {
            storage[key]
        }
    }
    
    func set(_ key: Key, value: Value) {
        queue.async(flags: .barrier) {
            self.storage[key] = value
        }
    }
}
```

#### Case 2: System Types Known to be Thread-Safe
```swift
// CGImage is thread-safe but not marked Sendable
extension CGImage: @unchecked @retroactive Sendable {}

// System types you know are safe
extension NSMutableData: @unchecked @retroactive Sendable {}
```

#### Case 3: Immutable Wrapper Around Non-Sendable Type
```swift
final class ImmutableImageWrapper: @unchecked Sendable {
    private let image: UIImage
    
    init(image: UIImage) {
        self.image = image
    }
    
    // Only read access - safe if UIImage is only read
    func render() -> CGImage? {
        image.cgImage
    }
}
```

#### Case 4: Continuation-Based Async Patterns
```swift
private final class UploadContext: @unchecked Sendable {
    let continuation: CheckedContinuation<Data, Error>
    let resumeKey: URL
    let progressHandler: (@Sendable (Double) -> Void)?
    
    init(
        continuation: CheckedContinuation<Data, Error>,
        resumeKey: URL,
        progressHandler: (@Sendable (Double) -> Void)? = nil
    ) {
        self.continuation = continuation
        self.resumeKey = resumeKey
        self.progressHandler = progressHandler
    }
}
```

### 6.3 When NOT to Use @unchecked Sendable

```swift
// DON'T: Just to silence compiler without understanding
final class BadExample: @unchecked Sendable {
    var mutableState: Int = 0  // No synchronization!
    var array: [String] = []   // No synchronization!
}

// DON'T: When proper Sendable conformance is possible
final class UnnecessaryUnchecked: @unchecked Sendable {
    let id: UUID  // Sendable
    let name: String  // Sendable
    // Could just use regular Sendable conformance!
}

// DON'T: When actor isolation would be better
final class ShouldBeActor: @unchecked Sendable {
    private var counter = 0
    private let lock = NSLock()
    
    func increment() {
        lock.withLock { counter += 1 }
    }
}
// Better:
actor Counter {
    private var counter = 0
    func increment() { counter += 1 }
}
```

### 6.4 Modern Alternative: Mutex (iOS 18+)

```swift
import Synchronization

// With Mutex, no need for @unchecked!
final class ModernCache<Key: Hashable & Sendable, Value: Sendable>: Sendable {
    private let storage = Mutex<[Key: Value]>([:])
    
    func get(_ key: Key) -> Value? {
        storage.withLock { $0[key] }
    }
    
    func set(_ key: Key, value: Value) {
        storage.withLock { $0[key] = value }
    }
}
```

### 6.5 @retroactive Sendable

When extending types from other modules:

```swift
// Without @retroactive: Warning about retroactive conformance
extension UIImage: @unchecked Sendable {}

// With @retroactive: Explicit acknowledgment
extension UIImage: @unchecked @retroactive Sendable {}
```

---

## 7. Common Concurrency Bugs & Fixes

### 7.1 Data Race on Mutable State

```swift
// BUG: Multiple threads accessing mutable state
class Counter {
    var count = 0  // Race condition
    
    func increment() {
        count += 1
    }
}

// FIX 1: Use actor
actor SafeCounter {
    private var count = 0
    
    func increment() {
        count += 1
    }
    
    func getCount() -> Int {
        count
    }
}

// FIX 2: Use @MainActor for UI state
@MainActor
class MainCounter {
    private var count = 0
    
    func increment() {
        count += 1
    }
}

// FIX 3: Use atomic operations (for simple cases)
import Synchronization

final class AtomicCounter: Sendable {
    private let count = Atomic(0)
    
    func increment() {
        count.wrappingIncrement(ordering: .relaxed)
    }
    
    func getCount() -> Int {
        count.load(ordering: .relaxed)
    }
}
```

### 7.2 Capturing Non-Sendable Types in Closures

```swift
// BUG: Non-Sendable capture in @Sendable closure
class UserManager {
    var users: [User] = []
    
    func loadUsers() {
        Task { @Sendable in  // Error: users is not Sendable
            self.users = await fetchUsers()
        }
    }
}

// FIX 1: Capture specific values
func loadUsers() {
    Task { @Sendable in
        let users = await fetchUsers()  // Local variable
        await MainActor.run {
            self.users = users
        }
    }
}

// FIX 2: Use nonisolated with proper transfer
nonisolated func fetchAndProcess() async -> [ProcessedUser] {
    let users = await fetchUsers()
    return process(users)
}
```

### 7.3 Protocol Conformance Isolation Mismatch

```swift
// BUG: Protocol not isolated, implementation is
protocol DataSource {
    func loadData() -> [Item]
}

@MainActor
class MainDataSource: DataSource {
    func loadData() -> [Item] {  // Isolation mismatch
        // Implementation
    }
}

// FIX 1: Mark protocol with @MainActor
@MainActor
protocol DataSource {
    func loadData() -> [Item]
}

// FIX 2: Make implementation nonisolated
class MainDataSource: DataSource {
    nonisolated func loadData() -> [Item] {
        // Implementation that doesn't need main thread
    }
}

// FIX 3: Use async for cross-actor calls
protocol AsyncDataSource: Sendable {
    func loadData() async -> [Item]
}

actor ActorDataSource: AsyncDataSource {
    func loadData() async -> [Item] {
        // Implementation
    }
}
```

### 7.4 Global Mutable State

```swift
// BUG: Global mutable state
var sharedConfiguration: AppConfig = .default  // Data race

// FIX 1: Global actor isolation
@MainActor
var sharedConfiguration: AppConfig = .default

// FIX 2: Actor-protected global state
actor ConfigStore {
    private var config: AppConfig = .default
    
    func get() -> AppConfig { config }
    func set(_ newConfig: AppConfig) { config = newConfig }
}

let globalConfig = ConfigStore()

// FIX 3: Immutable global with atomic updates
let sharedConfig = Atomic<AppConfig>(.default)
```

### 7.5 Singleton Pattern Issues

```swift
// BUG: Traditional singleton with mutable state
class UserSession {
    static let shared = UserSession()  // Not Sendable
    var currentUser: User?  // Data race
}

// FIX 1: Actor-based singleton
actor UserSession {
    static let shared = UserSession()
    private var currentUser: User?
    
    func getUser() -> User? { currentUser }
    func setUser(_ user: User?) { currentUser = user }
}

// FIX 2: @MainActor singleton for UI state
@MainActor
final class UIStateManager {
    static let shared = UIStateManager()
    private(set) var isLoading = false
    
    func setLoading(_ loading: Bool) {
        isLoading = loading
    }
}
```

### 7.6 Delegate Pattern with Actors

```swift
// BUG: Non-Sendable delegate from actor
protocol DataLoaderDelegate: AnyObject {
    func didLoadData(_ data: Data)
}

actor DataLoader {
    weak var delegate: DataLoaderDelegate?  // Delegate not Sendable
    
    func load() async {
        let data = await fetchData()
        delegate?.didLoadData(data)  // May cross isolation domains
    }
}

// FIX 1: Sendable delegate with @MainActor
@MainActor
protocol DataLoaderDelegate: AnyObject, Sendable {
    func didLoadData(_ data: Data)
}

// FIX 2: Use continuation pattern
actor DataLoader {
    func load() async throws -> Data {
        try await withCheckedThrowingContinuation { continuation in
            // Handle completion and resume continuation
        }
    }
}

// FIX 3: AsyncStream for ongoing events
actor DataLoader {
    private let dataSubject = AsyncStream<Data>.makeStream()
    
    var dataStream: AsyncStream<Data> { dataSubject.stream }
}
```

---

## 8. Migration Guide from Swift 5

### 8.1 Pre-Migration Checklist

1. **Enable warnings first** (in Swift 5 mode):
   - Build Settings -> Strict Concurrency Checking -> `Minimal` or `Targeted`
   - Fix warnings before upgrading to Swift 6

2. **Audit dependencies**:
   - Check if all packages support Sendable
   - Use `@preconcurrency import` ONLY where the compiler specifically demands it (iOS 26 frameworks are Sendable-annotated; prophylactic use masks bugs)

3. **Identify shared mutable state**:
   - Global variables
   - Singletons
   - Shared caches
   - Class properties accessed from multiple contexts

### 8.2 Migration Strategy

#### Phase 1: Module-By-Module Approach

```bash
# Enable strict concurrency per module
swiftSettings: [
    .enableExperimentalFeature("StrictConcurrency")
]
```

#### Phase 2: Fix Warnings

```swift
// Before (Swift 5)
class ViewModel: ObservableObject {
    @Published var items: [Item] = []
    
    func load() {
        Task {
            items = await fetchItems()
        }
    }
}

// After (Swift 6)
@MainActor
class ViewModel: ObservableObject {
    @Published private(set) var items: [Item] = []
    
    func load() {
        Task {
            items = await fetchItems()
        }
    }
}
```

#### Phase 3: Handle @preconcurrency

> **Reversed guidance (2026-04-03):** Do NOT apply `@preconcurrency` broadly. iOS 26 first-party frameworks are Sendable-annotated. Only use `@preconcurrency` where the compiler specifically demands it on a single import.

```swift
// Only for modules that haven't migrated AND the compiler specifically demands it
@preconcurrency import OldModule

// Once OldModule updates, remove @preconcurrency
```

### 8.3 Common Migration Patterns

#### Pattern 1: ObservableObject ViewModels

```swift
// Swift 5
class ViewModel: ObservableObject {
    @Published var state = State()
}

// Swift 6
@MainActor
class ViewModel: ObservableObject {
    @Published private(set) var state = State()
}
```

#### Pattern 2: Network Managers

```swift
// Swift 5
class NetworkManager {
    static let shared = NetworkManager()
    
    func fetch() async throws -> Data {
        // Implementation
    }
}

// Swift 6
final class NetworkManager: Sendable {
    static let shared = NetworkManager()
    
    // Nonisolated by default - safe for concurrent access
    nonisolated func fetch() async throws -> Data {
        // Implementation
    }
}
```

#### Pattern 3: Delegate Protocols

```swift
// Swift 5
protocol ManagerDelegate: AnyObject {
    func didUpdate()
}

// Swift 6
@MainActor
protocol ManagerDelegate: AnyObject, Sendable {
    func didUpdate()
}
```

### 8.4 Build Settings Reference

| Setting | Swift 5 | Swift 6 |
|---------|---------|---------|
| `SWIFT_VERSION` | 5.x | 6.0 |
| `SWIFT_STRICT_CONCURRENCY` | minimal/targeted/complete | complete (forced) |

### 8.5 Incremental Adoption Flags (Swift 5.5-5.10)

Use these flags to gradually enable checks:

```swift
// In Package.swift or build settings
.strictConcurrency,  // Enable warnings
.disableOutwardActorInference,  // Disable property wrapper inference
.globalConcurrency,  // Check global variables
.inferSendableFromCaptures  // Improved closure inference
```

### 8.6 Default Actor Isolation (Swift 6.2+)

Xcode 26+ projects can use default actor isolation:

```swift
// In Package.swift
.target(
    name: "MyTarget",
    swiftSettings: [
        .defaultIsolation(MainActor.self)
    ]
)
```

This treats all code without explicit isolation as `@MainActor`, reducing annotation burden.

---

## Quick Reference Card

### Sendable Conformance Rules

| Type | Automatic | Requires Explicit | @unchecked Sendable |
|------|-----------|-------------------|---------------------|
| Struct (internal) | Yes (all members Sendable) | Yes (public) | Custom sync |
| Enum (internal) | Yes (all cases Sendable) | Yes (public) | Custom sync |
| Final Class | No | Yes (immutable + Sendable) | Custom sync |
| Non-final Class | No | Impossible | Never |
| Actor | Yes | N/A | N/A |
| @MainActor Class | Yes | N/A | N/A |

### Actor Isolation Keywords

| Keyword | Usage | Effect |
|---------|-------|--------|
| `@MainActor` | Type/method/property | Forces main thread execution |
| `actor` | Type declaration | Creates isolated type |
| `nonisolated` | Method/property | Accessible without await |
| `isolated` | Parameter only | Grants sync access to actor state |
| `@globalActor` | Type attribute | Defines custom global actor |

### Migration Priority

1. **Critical:** Fix data races in shared mutable state
2. **High:** Mark UI-related classes with `@MainActor`
3. **Medium:** Audit and mark Sendable conformances
4. **Low:** Add nonisolated where appropriate for performance

---

## Resources

- [SE-0302: Sendable and @Sendable Closures](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0302-concurrent-value-and-concurrent-closures.md)
- [SE-0336: Distributed Actor Isolation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0336-distributed-actor-isolation.md)
- [SE-0414: Region Based Isolation](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0414-region-based-isolation.md)
- [SE-0430: `sending` Parameter Modifier](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0430-transferring-parameters-and-results.md)
- [Apple Documentation: Concurrency](https://developer.apple.com/documentation/swift/swift-standard-library/concurrency)

---

**Remember:** Swift 6 concurrency checking is your safety net. Data races caught at compile time are data races that won't crash your users' apps in production.
