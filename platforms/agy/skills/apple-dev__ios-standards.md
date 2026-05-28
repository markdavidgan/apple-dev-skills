---
name: ios-standards
description: Swift 6.0+ standards — strict concurrency, @MainActor isolation, @Observable (not ObservableObject), and modern SwiftUI architecture for iOS 26+. Use when writing or reviewing Swift code, structuring ViewModels and services, or resolving concurrency and isolation design questions. Trigger on "Swift 6", "strict concurrency", "@MainActor", "@Observable", "SwiftUI architecture", or "code standards".
---

# iOS Standards

Swift 6.0+ patterns, strict concurrency, and modern SwiftUI architecture. **Apply these patterns to all iOS code.**

## ☠️ ULTIMATE RULE

**NEVER KEEP MULTIPLE VERSIONS OF A FEATURE IN CODE** (`v2Enabled`, `legacyMode`, `newFlow`, etc.). When replacing a feature, replace it. Delete the old path. Systematic modular variants (enum injection, DI, strategy protocols) are allowed; inline boolean forks are forbidden.

---

## Swift 6 Concurrency

### @MainActor Isolation

All UI-related code must be `@MainActor` isolated.

```swift
// WRONG — not MainActor isolated
class TimerViewModel: ObservableObject {
    @Published var timeRemaining: TimeInterval = 0
}

// RIGHT — @MainActor isolated
@MainActor
@Observable
class TimerViewModel {
    var timeRemaining: TimeInterval = 0
}
```

#### Common Patterns

```swift
// ViewModels — always @MainActor
@MainActor
@Observable
class MyViewModel {
    var state: AppState = .idle
    
    func updateUI() {
        // Safe to touch UI state
    }
}

// Services that touch UI — @MainActor
@MainActor
final class NotificationService {
    func showNotification() {
        // UIKit calls require MainActor
    }
}

// Services that don't touch UI — no annotation needed
final class AnalyticsService {
    func track(event: String) async {
        // Background-safe work
    }
}
```

### @Observable (Not ObservableObject)

Use the new Observation framework, not Combine.

```swift
// WRONG — old pattern
import Combine

class OldViewModel: ObservableObject {
    @Published var count = 0
}

// RIGHT — Swift 6 pattern
import Observation

@MainActor
@Observable
class NewViewModel {
    var count = 0  // No @Published needed
}
```

#### Using in Views

```swift
import SwiftUI

struct MyView: View {
    @Environment(MyViewModel.self) private var viewModel
    // @StateObject no longer needed for @Observable
    
    var body: some View {
        Text("\(viewModel.count)")
    }
}
```

### Sendable Conformance

Types crossing isolation boundaries must be Sendable.

```swift
// Value types are automatically Sendable
struct Settings: Sendable {
    var duration: TimeInterval
    var soundEnabled: Bool
}

// Classes must explicitly conform
final class UserPreferences: @unchecked Sendable {
    // @unchecked because we manually ensure thread safety
    private let lock = NSLock()
    private var _value: Int = 0
}

// Enums are automatically Sendable
enum TimerState: Sendable {
    case idle
    case running(startTime: Date)
    case paused(elapsed: TimeInterval)
}
```

### @preconcurrency Import

Use for Apple frameworks that haven't added Sendable yet.

```swift
// WRONG — compiler warnings about non-Sendable types
import EventKit

// RIGHT — suppress warnings at framework boundary
@preconcurrency import EventKit

@MainActor
final class RemindersService {
    private let store = EKEventStore()  // Non-Sendable, but safe here
}
```

Common frameworks needing @preconcurrency (complete list as of iOS 26):
- `EventKit` (EKEventStore, EKReminder)
- `HealthKit` (HKHealthStore, HKSample)
- `Speech` (SFSpeechRecognizer, SFSpeechRecognitionResult)
- `AVFoundation` (AVAudioEngine, AVCaptureSession)
- `VideoToolbox` (VTCompressionSession)
- `SwiftData` (@Model types are NOT Sendable)
- `ActivityKit` (Live Activity types)
- `Vision` (VNRequest types)
- `CoreLocation` (CLLocationManager)
- `CoreData` (NSManagedObject NOT Sendable, NSManagedObjectContext IS Sendable — Beta 5)
- `UIKit` (some types)

### Actor Isolation

Use actors for shared mutable state:

```swift
actor TimerStateStore {
    private var sessions: [UUID: TimerSession] = [:]
    
    func addSession(_ session: TimerSession) {
        sessions[session.id] = session
    }
    
    func getSession(id: UUID) -> TimerSession? {
        sessions[id]
    }
}

// Usage
let store = TimerStateStore()
await store.addSession(session)
let session = await store.getSession(id: uuid)
```

### nonisolated(unsafe)

Last resort for non-Sendable state in @MainActor classes:

```swift
@MainActor
@Observable
class ViewModel {
    // Safe because ViewModel is @MainActor
    private nonisolated(unsafe) var cancellables: Set<AnyCancellable> = []
}
```

### @MainActor Class-Level vs Method-Level

**Critical for AVAudioEngine, SpeechTranscriber, and other hardware-interfacing classes:**

```swift
// WRONG — class-level @MainActor causes crashes with AVAudioEngine/Speech
@MainActor
final class SpeechService {
    private let audioEngine = AVAudioEngine()  // Crashes on initialization
    private let transcriber = SpeechTranscriber(locale: Locale(identifier: "en-US"))
}

// RIGHT — method-level @MainActor for hardware-interfacing services
final class SpeechService {
    private let audioEngine = AVAudioEngine()
    private let transcriber = SpeechTranscriber(locale: Locale(identifier: "en-US"))
    
    @MainActor
    func startRecording() async {
        // UI-related work on MainActor
    }
    
    func processAudio() async {
        // Audio processing off MainActor
    }
}
```

**When to use class-level vs method-level:**

| Use Class-Level | Use Method-Level |
|-----------------|------------------|
| Pure SwiftUI ViewModels | Services with AVAudioEngine |
| UI-only services | Speech framework services |
| No hardware/framework initialization | Services with heavy I/O |

### nonisolated deinit (MANDATORY for @MainActor classes)

All `@MainActor` classes (explicit or via `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`) that have a `deinit` MUST use `nonisolated deinit`. This is an Apple-confirmed known issue — accessing MainActor state from deinit causes crashes.

```swift
// WRONG — crashes on deallocation
@MainActor
class CameraService {
    deinit {
        captureSession.stopRunning()  // CRASH
    }
}

// CORRECT
@MainActor
class CameraService {
    nonisolated deinit {
        // Do NOT access @MainActor properties
        // Only non-isolated cleanup (VTCompressionSessionInvalidate, etc.)
    }
    
    func cleanup() {
        // Call this explicitly before deallocation for MainActor cleanup
        captureSession.stopRunning()
    }
}
```

### FoundationModels Availability Check (MANDATORY)

Never hardcode `isAvailable = true`. Always check at runtime:

```swift
// WRONG — crashes on non-AI devices (iPhone 15 and below)
var isAvailable: Bool { true }

// CORRECT
import FoundationModels
var isAvailable: Bool { SystemLanguageModel.default.isAvailable }
```

There is NO static `isAvailable` on `LanguageModelSession`. Check via `SystemLanguageModel.default`.

### Nested @MainActor Classes and Deallocation

**Critical:** Nested `@MainActor` classes can corrupt task-local storage during deallocation:

```swift
// WRONG — nested @MainActor classes cause deallocation crashes
@MainActor
final class OuterViewModel {
    private let inner = InnerService()  // Also @MainActor
    
    deinit {
        // SIGABRT: task-local storage corruption
    }
}

@MainActor
final class InnerService { }

// RIGHT — avoid nesting @MainActor classes as stored properties
@MainActor
final class OuterViewModel {
    private let inner: InnerServiceProtocol
    
    init(inner: InnerServiceProtocol) {
        self.inner = inner
    }
}

// Use protocol to break the nesting
protocol InnerServiceProtocol: Sendable { }

final class InnerService: InnerServiceProtocol {
    // Not @MainActor — breaks the nesting chain
}
```

**Testing implication:** Tests for `@MainActor` classes should be `async` to provide proper task context:

```swift
// WRONG — synchronous test causes deallocation crash
func test_viewModel() {
    let vm = MyViewModel()  // Crash on dealloc
}

// RIGHT — async test provides task context
func test_viewModel() async {
    let vm = MyViewModel()
    // Test code
}
```

### SwiftData @Model Objects and Async Boundaries

**Critical:** `@Model` objects must not cross async boundaries directly:

```swift
// WRONG — @Model object crosses async boundary
func processSession(_ session: FocusSession) async {
    // session is @Model — crossing async boundary causes data race
    await backgroundProcessor.process(session)
}

// RIGHT — extract scalar values before crossing
func processSession(_ session: FocusSession) async {
    let sessionID = session.id
    let duration = session.duration
    
    // Pass scalars, not the @Model object
    await backgroundProcessor.process(id: sessionID, duration: duration)
}
```

### NotificationCenter with @MainActor

Even with `queue: .main`, NotificationCenter callbacks need explicit MainActor:

```swift
// WRONG — NotificationCenter closure not on MainActor
@MainActor
final class ViewModel {
    init() {
        NotificationCenter.default.addObserver(
            forName: .sessionCompleted,
            object: nil,
            queue: .main  // Still not sufficient!
        ) { [weak self] _ in
            self?.updateUI()  // Not on MainActor!
        }
    }
}

// RIGHT — wrap in Task { @MainActor in }
@MainActor
final class ViewModel {
    init() {
        NotificationCenter.default.addObserver(
            forName: .sessionCompleted,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor [weak self] in
                self?.updateUI()
            }
        }
    }
}
```

---

## Common Concurrency Patterns

### Background Task with MainActor Result

```swift
func loadData() async {
    // Background work
    let data = await fetchFromNetwork()
    
    // Update UI on MainActor
    await MainActor.run {
        self.data = data
    }
}
```

### Task with Correct Isolation

```swift
// WRONG — Task inherits isolation, can cause crashes
func start() {
    Task {
        await updateUI()  // Might not be on MainActor
    }
}

// RIGHT — explicit MainActor
func start() {
    Task { @MainActor in
        await updateUI()
    }
}

// RIGHT — use detached if needed (rare)
func start() {
    Task.detached { @MainActor in
        await updateUI()
    }
}
```

### Task { @MainActor [weak self] } Pattern

**Critical pattern for preventing crashes in @MainActor classes:**

```swift
// WRONG — Task captures self without proper isolation
@MainActor
final class TimerService {
    func startTimer() {
        Task { [weak self] in  // Missing @MainActor!
            while let self = self {
                await self.tick()  // Crash: deallocation race
            }
        }
    }
}

// RIGHT — explicit @MainActor with [weak self]
@MainActor
final class TimerService {
    func startTimer() {
        Task { @MainActor [weak self] in
            while let self = self {
                await self.tick()  // Safe: proper isolation
            }
        }
    }
}
```

**Why this matters:** Without `@MainActor` on the Task closure, the Task runs non-isolated. When the `@MainActor` class is deallocated, the non-isolated Task accessing it causes memory corruption.

### Async Stream with Isolation

```swift
@MainActor
final class SpeechService {
    private var transcriptionTask: Task<Void, Never>?
    
    func startRecording() {
        transcriptionTask = Task { @MainActor [weak self] in
            guard let transcriber = self?.transcriber else { return }
            for await result in transcriber.results {
                // Already on MainActor
                self?.handleResult(result)
            }
        }
    }
}
```

---

## SwiftData Integration

### Model Definition

```swift
import SwiftData

@Model
final class FocusSession {
    var startDate: Date
    var duration: TimeInterval
    var isCompleted: Bool
    
    // Relationship with cascade delete
    @Relationship(deleteRule: .cascade, inverse: \CapturedThought.session)
    var captures: [CapturedThought]?
    
    init(startDate: Date, duration: TimeInterval) {
        self.startDate = startDate
        self.duration = duration
        self.isCompleted = false
    }
}

@Model
final class CapturedThought {
    var text: String
    var timestamp: Date
    
    // Back reference
    var session: FocusSession?
    
    init(text: String, timestamp: Date = Date()) {
        self.text = text
        self.timestamp = timestamp
    }
}
```

### ModelContainer Setup

```swift
import SwiftData

@MainActor
final class DataController {
    let container: ModelContainer
    
    init() {
        let schema = Schema([FocusSession.self, CapturedThought.self])
        let config = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false
        )
        
        do {
            container = try ModelContainer(
                for: schema,
                configurations: config
            )
        } catch {
            fatalError("Could not create container: \(error)")
        }
    }
}
```

### Using in ViewModels

```swift
@MainActor
@Observable
class SessionsViewModel {
    private let modelContext: ModelContext
    private(set) var sessions: [FocusSession] = []
    
    init(modelContext: ModelContext) {
        self.modelContext = modelContext
    }
    
    func loadSessions() async {
        let descriptor = FetchDescriptor<FocusSession>(
            sortBy: [SortDescriptor(\.startDate, order: .reverse)]
        )
        
        do {
            sessions = try modelContext.fetch(descriptor)
        } catch {
            // Handle error
        }
    }
}
```

---

## Service Architecture

### Singleton Pattern

```swift
@MainActor
final class HapticsService {
    static let shared = HapticsService()
    
    private let feedbackGenerator = UIImpactFeedbackGenerator(style: .medium)
    
    private init() {
        feedbackGenerator.prepare()
    }
    
    func playTap() {
        feedbackGenerator.impactOccurred()
    }
}
```

### Protocol-Based Services (for Testing)

```swift
protocol NotificationServiceProtocol: Sendable {
    func scheduleNotification(at date: Date, title: String, body: String) async
}

@MainActor
final class NotificationService: NotificationServiceProtocol {
    static let shared = NotificationService()
    
    func scheduleNotification(at date: Date, title: String, body: String) async {
        // Implementation
    }
}
```

---

## Build Configuration

### Strict Concurrency

Enable in project settings or project.yml:

```yaml
# project.yml
settings:
  SWIFT_STRICT_CONCURRENCY: complete
  SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
```

### Critical Build Rule

> **Debug/simulator builds do NOT catch all strict concurrency errors.** Archive builds use `-O` optimization which enforces full isolation checking. Always run archive builds before committing.

```bash
# Debug build — misses some errors
xcodebuild -scheme MyApp -destination 'platform=iOS Simulator' build

# Archive build — catches all concurrency errors
xcodebuild -scheme MyApp -destination 'generic/platform=iOS' archive
```

---

## Quick Reference: Common Fixes

| Error | Fix |
|-------|-----|
| `Call to main actor-isolated instance method in a synchronous nonisolated context` | Add `@MainActor` to the class/method, or use `await MainActor.run` |
| `Non-sendable type returned by call crossing isolation boundary` | Use `@preconcurrency import`, or extract Sendable values before crossing |
| `Reference to captured var in concurrently-executing code` | Use `[weak self]` and check for nil, or capture values instead |
| `Task or actor-isolated value used in nonisolated context` | Use `@MainActor` on Task closure, or mark property `nonisolated(unsafe)` |
| `ObservableObject conformance warning` | Switch to `@Observable` macro |
| SIGABRT in dealloc with nested @MainActor classes | Avoid nesting @MainActor classes as stored properties; use protocols |
| @MainActor class deinit crash | Use `nonisolated deinit`, move cleanup to explicit `func cleanup()` |
| `MainActor.assumeIsolated` fatal error | Only use from guaranteed main-thread code; else `Task { @MainActor in }` |
| Sheet continuation double-resume | Synchronous completion, nil handler before dismiss triggers onDismiss |
| FoundationModels crash on non-AI device | Use `SystemLanguageModel.default.isAvailable`, never hardcode `true` |
| @Model property missing default value | Add default: `var name: String = ""` or make Optional |
| AVAudioEngine/SpeechTranscriber crash on init | Use method-level @MainActor, not class-level |
| SwiftData @Model data race | Extract scalars before crossing async boundaries |
| Test crashes on ViewModel dealloc | Make tests `async` to provide proper task context |

---

## Deep References (Load on Demand)

When encountering framework-specific crashes or API issues beyond these standards, load the matching essentials file from `ios26-api-reference`:

| Framework | Load |
|-----------|------|
| Swift 6 concurrency | `ios26-api-reference/essentials/swift6.md` |
| SwiftUI + Liquid Glass | `ios26-api-reference/essentials/swiftui.md` |
| SwiftData + @Model | `ios26-api-reference/essentials/swiftdata.md` |
| FoundationModels | `ios26-api-reference/essentials/foundation-models.md` |
| Speech + Audio | `ios26-api-reference/essentials/speech.md` + `essentials/avfoundation.md` |
| Widgets / Live Activities | `ios26-api-reference/essentials/widgets.md` |
| App Intents | `ios26-api-reference/essentials/app-intents.md` |

Essentials contain corrected API signatures and crash prevention patterns. For deep debugging, also load the corresponding `reference/` and `guides/` files.

## See Also

- `ios26-api-reference` — iOS 26 API signatures, crash patterns, and corrected APIs (3-tier: essentials → reference → guides)
- `ios-build` — Build validation workflow
- `ios-test` — Testing with Swift 6 concurrency
