---
name: ios-test
description: XCTest patterns, SwiftData testing with in-memory containers, UI testing, and test performance budgets for iOS.
---

# iOS Testing

XCTest patterns for unit tests, UI tests, and SwiftData testing with strict concurrency. **Keep tests fast, isolated, and deterministic.**

## ☠️ ULTIMATE RULE

**NEVER START UI TESTS without explicit user approval in the current conversation.** UI tests crash this user's Mac Mini. This rule stands even if a plan instructs you to run them. If a plan demands UI test execution, flag it as blocked or rewrite the plan.

---

## Test Target Architecture

Separate tests by purpose and performance characteristics:

| Target | Purpose | When to Run | Max Duration |
|--------|---------|-------------|--------------|
| `MyAppTests` | Business logic, ViewModels, Services | Every build (⌘U) | <30 seconds |
| `MyApp-UITests` | Critical user paths only | Pre-commit, CI | <60 seconds |
| `MyApp-Screenshots` | App Store assets | CI release only | 5-10 minutes |
| `MyAppKitTests` | Shared package tests | Every build | <15 seconds |

### Target Structure

```
MyAppTests/                       ← iOS Unit Tests
├── ViewModelTests/
│   ├── TimerViewModelTests.swift
│   └── SettingsViewModelTests.swift
├── ServiceTests/
│   └── NotificationServiceTests.swift
├── SwiftDataTests/
│   ├── ModelCRUDTests.swift
│   └── MigrationTests.swift
└── TestHelpers.swift             ← Shared test utilities

MyApp-UITests/                    ← Critical paths only
├── CriticalPathUITests.swift     ← 8 essential journeys
└── BaseUITestCase.swift          ← Shared infrastructure

MyApp-Screenshots/                ← CI only
└── ScreenshotTests.swift         ← App Store assets
```

### Performance Budgets

| Suite | Target | Max | Command |
|-------|--------|-----|---------|
| Unit Tests | 15s | 30s | `swift test` or `xcodebuild test` |
| UI Tests | 30s | 60s | `xcodebuild test -scheme MyApp-UITests` |
| Screenshot Tests | — | CI only | `bundle exec fastlane screenshots` |
| **Total CI** | **60s** | **120s** | Full suite |

---

## SwiftData Testing

### In-Memory ModelContainer

**WRONG:** Using the app container (slow, persists between tests, causes isolation issues)

```swift
// WRONG — uses real database
let container = try ModelContainer(for: MyModel.self)
```

**RIGHT:** In-memory container for fast, isolated tests

```swift
// TestHelpers.swift
import SwiftData

func makeTestContainer(for models: any PersistentModel.Type...) throws -> ModelContainer {
    let schema = Schema(models)
    let config = ModelConfiguration(schema: schema, isStoredInMemoryOnly: true)
    return try ModelContainer(for: schema, configurations: config)
}

// Usage in tests
@MainActor
func test_fetchSessions_returnsSorted() throws {
    let container = try makeTestContainer(for: FocusSession.self, CapturedThought.self)
    let context = ModelContext(container)
    // ... test code
}
```

### @MainActor Test Isolation

SwiftData contexts must be accessed from the main actor:

```swift
// WRONG — not MainActor isolated
func test_createSession_savesToDatabase() throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let context = ModelContext(container)  // ❌ Main actor-isolated init
}

// RIGHT — @MainActor isolated
@MainActor
func test_createSession_savesToDatabase() throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let context = ModelContext(container)  // ✓ Safe on MainActor
}
```

### Test Data Seeding

```swift
@MainActor
func seedTestSessions(in container: ModelContainer, count: Int = 5) throws {
    let context = ModelContext(container)
    
    for i in 0..<count {
        let session = FocusSession(
            startDate: Date().addingTimeInterval(-Double(i * 86400)),
            duration: 1500
        )
        context.insert(session)
    }
    
    try context.save()
}
```

### Cascade Delete Testing

```swift
@MainActor
func test_deleteSession_cascadesToCaptures() throws {
    // Given: Session with captures
    let container = try makeTestContainer(for: FocusSession.self, CapturedThought.self)
    let context = ModelContext(container)
    
    let session = FocusSession(startDate: Date(), duration: 1500)
    let capture = CapturedThought(text: "Test thought", timestamp: Date())
    capture.session = session
    
    context.insert(session)
    context.insert(capture)
    try context.save()
    
    // When: Delete session
    context.delete(session)
    try context.save()
    
    // Then: Captures are also deleted
    let captures = try context.fetch(FetchDescriptor<CapturedThought>())
    XCTAssertEqual(captures.count, 0)
}
```

### Migration Testing

Every `.custom` migration stage needs a test. `.lightweight` stages need data preservation tests.

```swift
@MainActor
func test_migrationV1toV2_preservesExistingData() throws {
    // 1. Write data using V1 schema
    let v1Config = ModelConfiguration(isStoredInMemoryOnly: true)
    let v1Container = try ModelContainer(
        for: SchemaV1.FocusSession.self,
        configurations: v1Config
    )
    let v1Context = ModelContext(v1Container)
    let session = SchemaV1.FocusSession(startDate: Date(), duration: 1500)
    v1Context.insert(session)
    try v1Context.save()
    
    // 2. Open with V2 schema + migration plan
    let v2Container = try ModelContainer(
        for: SchemaV2.FocusSession.self,
        migrationPlan: AppMigrationPlan.self,
        configurations: v1Config
    )
    let v2Context = ModelContext(v2Container)
    
    // 3. Verify old data is intact
    let sessions = try v2Context.fetch(FetchDescriptor<SchemaV2.FocusSession>())
    XCTAssertEqual(sessions.count, 1)
    XCTAssertEqual(sessions.first?.duration, 1500)
    
    // 4. Verify new field defaults correctly
    XCTAssertNil(sessions.first?.newOptionalField)
}
```

---

## XCTest Patterns

### Test Naming Convention

```swift
func test_<subject>_<condition>_<expectedResult>()

// Examples:
func test_categorize_buyKeyword_returnsTask()
func test_timerState_startFromIdle_transitionsToRunning()
func test_swiftData_deleteSession_cascadesCaptures()
func test_remindersService_requestAccess_promptsForPermission()
```

### Async/Await Test Patterns

```swift
// Async test — direct await
@MainActor
func test_refresh_updatesStats() async throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let viewModel = InsightsViewModel(container: container)
    
    await viewModel.refresh()
    
    XCTAssertGreaterThan(viewModel.totalFocusTime, 0)
}

// Async throws pattern
func test_fetchData_returnsResults() async throws {
    let service = DataService()
    
    let data = try await service.fetchData()
    
    XCTAssertFalse(data.isEmpty)
}
```

### XCTestExpectation for Callbacks

```swift
func test_speechTranscription_returnsText() {
    let expectation = expectation(description: "Transcription completed")
    let service = SpeechService()
    
    service.onTranscription = { text in
        XCTAssertEqual(text, "buy oat milk")
        expectation.fulfill()
    }
    
    service.startRecording()
    
    wait(for: [expectation], timeout: 5)
}

// Multiple expectations
func test_parallelDownloads_complete() {
    let exp1 = expectation(description: "Download 1")
    let exp2 = expectation(description: "Download 2")
    
    download(url1) { exp1.fulfill() }
    download(url2) { exp2.fulfill() }
    
    wait(for: [exp1, exp2], timeout: 10)
}
```

### setUpWithError / tearDownWithError

```swift
class TimerViewModelTests: XCTestCase {
    var container: ModelContainer!
    var viewModel: TimerViewModel!

    @MainActor
    override func setUpWithError() throws {
        try super.setUpWithError()
        container = try makeTestContainer(for: FocusSession.self)
        viewModel = TimerViewModel(container: container)
    }

    override func tearDownWithError() throws {
        viewModel = nil
        container = nil
        try super.tearDownWithError()
    }
}

### Testing @MainActor Classes

**Critical — applies to the entire test class:** When your test class is `@MainActor` (or tests a `@MainActor` subject), **every** test method must be `async` — even ones with no async work. Synchronous methods crash at deallocation with `POINTER_BEING_FREED_WAS_NOT_ALLOCATED` deep in `swift_task_deinitOnExecutorImpl`.

**Root cause:** `@MainActor` class dealloc uses `swift_task_deinitOnExecutorImpl`, which creates a `TaskLocal.StopLookupScope`. In a synchronous test there is no current Task, so the scope's heap is uninitialized — destroying it crashes.

```swift
// WRONG — crashes on dealloc even though the test body is fine
@MainActor
final class MyViewModelTests: XCTestCase {
    func test_initialState() {           // ❌ sync — crashes at deinit
        let vm = MyViewModel()
        XCTAssertFalse(vm.isActive)
    }

    func test_activate() throws {        // ❌ throws but not async — also crashes
        let vm = MyViewModel()
        try vm.activate()
        XCTAssertTrue(vm.isActive)
    }
}

// RIGHT — every method is async
@MainActor
final class MyViewModelTests: XCTestCase {
    func test_initialState() async {     // ✅ async — proper task context
        let vm = MyViewModel()
        XCTAssertFalse(vm.isActive)
    }

    func test_activate() async throws {  // ✅ async throws
        let vm = MyViewModel()
        try vm.activate()
        XCTAssertTrue(vm.isActive)
    }
}
```

This rule applies to `setUp`/`tearDown` too — prefer `setUp() async throws` / `tearDown() async throws` in `@MainActor` test classes.
```

### Mock Services for Testing

```swift
protocol NotificationServiceProtocol: Sendable {
    func scheduleNotification(at date: Date, title: String) async
}

class MockNotificationService: NotificationServiceProtocol {
    var scheduledNotifications: [(date: Date, title: String)] = []
    var shouldSucceed = true
    
    func scheduleNotification(at date: Date, title: String) async {
        if shouldSucceed {
            scheduledNotifications.append((date, title))
        }
    }
}

// Usage in test
@MainActor
func test_startSession_schedulesNotification() async {
    let mockService = MockNotificationService()
    let viewModel = TimerViewModel(notificationService: mockService)

    await viewModel.startSession()

    XCTAssertEqual(mockService.scheduledNotifications.count, 1)
}

### Protocol-Based Mocking for Framework Classes

**Critical:** Some framework classes cause heap corruption when subclassed for testing:

```swift
// WRONG — subclassing EKEventStore causes heap corruption in iOS 26 simulator
class MockEventStore: EKEventStore {
    override func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        completion(true, nil)
    }
}

// RIGHT — use protocol conformance
protocol EventStoreProtocol {
    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler)
    func calendars(for entityType: EKEntityType) -> [EKCalendar]
    func save(_ reminder: EKReminder, commit: Bool) throws
}

// Real implementation wraps the framework class
final class EventStoreWrapper: EventStoreProtocol {
    private let store = EKEventStore()

    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        store.requestAccess(to: entityType, completion: completion)
    }

    func calendars(for entityType: EKEntityType) -> [EKCalendar] {
        store.calendars(for: entityType)
    }

    func save(_ reminder: EKReminder, commit: Bool) throws {
        try store.save(reminder, commit: commit)
    }
}

// Mock implementation for tests
final class MockEventStore: EventStoreProtocol {
    var shouldSucceed = true
    var calendarsResult: [EKCalendar] = []
    var savedReminders: [EKReminder] = []

    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        completion(shouldSucceed, nil)
    }

    func calendars(for entityType: EKEntityType) -> [EKCalendar] {
        return calendarsResult
    }

    func save(_ reminder: EKReminder, commit: Bool) throws {
        if shouldSucceed {
            savedReminders.append(reminder)
        } else {
            throw NSError(domain: "MockError", code: 1)
        }
    }
}
```

**Framework classes requiring protocol mocking:**
- `EKEventStore` (EventKit) — heap corruption in iOS 26 simulator
- `AVAudioEngine` — complex initialization state
- `HKHealthStore` (HealthKit) — privacy-sensitive

---
```

---

## UI Testing

### XCUIApplication Patterns

```swift
class CriticalPathUITests: XCTestCase {
    let app = XCUIApplication()
    
    override func setUpWithError() throws {
        continueAfterFailure = false
    }
    
    func test_startFocusSession() {
        app.launchArguments = ["-UITestMode", "-FastTimer"]
        app.launch()
        
        // Tap start
        app.buttons["startButton"].tap()
        
        // Verify running state
        XCTAssertTrue(app.staticTexts["timerRunning"].waitForExistence(timeout: 2))
    }
}
```

### Launch Arguments for Test Mode

| Argument | Purpose |
|----------|---------|
| `-UITestMode` | Disables animations, analytics, alerts |
| `-SeedScenario=<name>` | Pre-populates test data |
| `-FastTimer` | Accelerated timer for tests |
| `-DisableOnboarding` | Skips onboarding flow |
| `-ResetState` | Clears UserDefaults on launch |

```swift
// In test
app.launchArguments = [
    "-UITestMode",
    "-SeedScenario=History30Days",
    "-FastTimer"
]
app.launch()

// In app (AppDelegate/Init)
if CommandLine.arguments.contains("-UITestMode") {
    // Disable animations
    UIView.setAnimationsEnabled(false)
}
```

### Data Seeding via RuntimeSeeder

**WRONG:** Creating data through UI (slow, flaky)

```swift
// Slow: 30-50s per test
func test_capturesList() {
    app.launch()
    startTimer()           // ~5s
    addCapture("Thought 1") // ~10s
    addCapture("Thought 2") // ~10s
    // ... actual test
}
```

**RIGHT:** Pre-seed via launch arguments (fast, deterministic)

```swift
// Fast: ~5s total
func test_capturesList() {
    app.launchArguments = ["-UITestMode", "-SeedScenario=MultipleCaptures"]
    app.launch()
    // Test immediately with pre-populated data
}
```

### Available Seeding Scenarios

| Scenario | Sessions | Captures | Use Case |
|----------|----------|----------|----------|
| `FreshInstall` | 0 | 0 | First launch, onboarding |
| `SingleSession` | 1 | 2 | Basic timer flow |
| `ActiveSession` | 1 (running) | 1 | Pause/resume testing |
| `History7Days` | 7 | 15 | Weekly review screens |
| `History30Days` | 30 | 60 | Insights, trends |
| `HighCompletion` | 20 (18 done) | 40 | Success messaging |
| `LowCompletion` | 20 (5 done) | 25 | Coaching nudges |

### Accessibility Identifiers

Add identifiers to all interactive elements:

```swift
// In SwiftUI
Button("Start") {
    viewModel.start()
}
.accessibilityIdentifier("startButton")

// In UI test
app.buttons["startButton"].tap()
```

### UI Testing Gotchas

#### SwipeActions Only Work in List/Form

**Critical:** `.swipeActions` are not reliably testable via XCUITest when used within `ScrollView > LazyVStack`:

```swift
// WRONG — SwipeActions not testable
struct ContentView: View {
    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(items) { item in
                    ItemRow(item: item)
                        .swipeActions {  // ❌ Not accessible to XCUITest
                            Button("Delete", role: .destructive) { }
                        }
                }
            }
        }
    }
}

// RIGHT — Use List for testable SwipeActions
struct ContentView: View {
    var body: some View {
        List {
            ForEach(items) { item in
                ItemRow(item: item)
                    .swipeActions {  // ✓ Accessible to XCUITest
                        Button("Delete", role: .destructive) { }
                    }
            }
        }
    }
}

// UI test
func test_deleteItem() {
    app.launch()
    let cell = app.cells.firstMatch
    cell.swipeLeft()
    cell.buttons["Delete"].tap()
}
```

#### TextField(axis: .vertical) Element Type

**Critical:** `TextField(axis: .vertical)` in iOS 26 is not exposed as `app.textViews` or `app.textFields`:

```swift
// In SwiftUI
TextField("Enter text", text: $text, axis: .vertical)
    .accessibilityIdentifier("notesTextField")
```

```swift
// WRONG — element not found
func test_enterText() {
    app.launch()
    app.textFields["notesTextField"].tap()  // Not found
}

// WRONG — also not found
func test_enterText() {
    app.launch()
    app.textViews["notesTextField"].tap()  // Also not found
}

// RIGHT — use descendants with any type
func test_enterText() {
    app.launch()
    let textField = app.descendants(matching: .any)["notesTextField"]
    textField.tap()
    textField.typeText("Test notes")
}
```

#### UI Test Data Seeding Race Condition

**Critical:** Async data seeding requires synchronization:

```swift
// In app — signal when seeding completes
func seedTestData() async {
    // ... seed data
    await MainActor.run {
        NotificationCenter.default.post(name: .testDataSeeded, object: nil)
    }
}

// In UI test — wait for signal
func test_withSeededData() {
    app.launchArguments = ["-UITestMode", "-SeedScenario=MultipleCaptures"]
    app.launch()

    // Wait for seeding completion
    let seeded = expectation(forNotification: .testDataSeeded, object: nil)
    wait(for: [seeded], timeout: 5)

    // Now test with data
    XCTAssertTrue(app.cells.firstMatch.exists)
}
```

**Also:** Use `Date()` timestamps for test data to avoid time-filter hiding:

```swift
// WRONG — past dates filtered by default
let capture = CapturedThought(text: "Test", timestamp: Date().addingTimeInterval(-86400))

// RIGHT — use current date
let capture = CapturedThought(text: "Test", timestamp: Date())
```

### Waiting for State Changes

```swift
// WRONG — long sleep
sleep(5)
XCTAssertTrue(element.exists)

// RIGHT — predicate expectation
let predicate = NSPredicate(format: "label == %@", "tap to pause")
let expectation = XCTNSPredicateExpectation(predicate: predicate, object: hintLabel)
XCTWaiter.wait(for: [expectation], timeout: 5)

// RIGHT — wait for existence with short timeout
XCTAssertTrue(element.waitForExistence(timeout: 2))
```

---

## Common Pitfalls

### Date Filtering in Test Data

**Problem:** ViewModel defaults to `.today` filter, but seeded data uses past dates.

**WRONG:**
```swift
let capture = CapturedThought(text: "Test", timestamp: Date().addingTimeInterval(-86400))
// Won't appear in today's filter
```

**RIGHT:**
```swift
let capture = CapturedThought(text: "Test", timestamp: Date())
// Visible with default filter
```

### Test Isolation Violations

**WRONG:** Sharing state between tests
```swift
static var sharedContainer: ModelContainer!  // ❌ Never do this

override func setUp() {
    // Reusing container from previous test
}
```

**RIGHT:** Fresh container per test
```swift
override func setUpWithError() throws {
    container = try makeTestContainer(for: MyModel.self)
}

override func tearDownWithError() throws {
    container = nil  // Clean up
}
```

### Excessive Wait Times

**WRONG:**
```swift
XCTAssertTrue(element.waitForExistence(timeout: 30))  // Too long
sleep(5)  // Wastes time
```

**RIGHT:**
```swift
XCTAssertTrue(element.waitForExistence(timeout: 2))   // UI responds in <2s
// Or use expectations for specific state changes
```

### Creating Data Through UI vs Seeding

See UI Testing section above. Always prefer seeding for setup state.

---

## Running Tests

### Unit Tests (Package)

```bash
cd MyAppKit && swift test
```

### Unit Tests (Xcode)

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests
```

### Specific Test File

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests
```

### Specific Test

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests/test_startFromIdle_transitionsToRunning
```

### UI Tests

```bash
xcodebuild test -scheme MyApp-UITests \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max'
```

### With Coverage

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -enableCodeCoverage YES \
  -resultBundlePath TestResults.xcresult
```

---

## Testing Checklist

When adding a new feature:

- [ ] Unit tests for ViewModel logic
- [ ] Unit tests for Service layer (if applicable)
- [ ] UI test for critical user path
- [ ] Screenshot test if new screen visible in App Store
- [ ] Accessibility identifiers added to interactive elements
- [ ] Test data scenario updated (if needed)
- [ ] Async operations tested with expectations
- [ ] Error states tested (failures, permissions denied)

---

## Quick Reference

| Pattern | Code |
|---------|------|
| In-memory container | `ModelConfiguration(isStoredInMemoryOnly: true)` |
| MainActor test class | `@MainActor final class MyTests: XCTestCase` — ALL methods must also be `async` |
| Async test | `func test_...() async throws` — required for any `@MainActor` subject |
| Expectation | `let exp = expectation(description: "..."); wait(for: [exp], timeout: 5)` |
| Mock service | Protocol + class with configurable behavior |
| UI test launch | `app.launchArguments = ["-UITestMode"]; app.launch()` |
| Wait for element | `element.waitForExistence(timeout: 2)` |

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios-build` — Build validation and CI integration
