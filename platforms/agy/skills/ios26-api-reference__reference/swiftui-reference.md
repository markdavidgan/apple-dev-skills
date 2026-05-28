# SwiftUI iOS 26 Comprehensive Reference

> **Target:** iOS 26+ | **Language:** Swift 6.0 | **Framework:** SwiftUI
> **Last Updated:** 2026-04-08
> **Purpose:** Definitive reference for complex apps with timers, speech recognition, and state management

---

## Table of Contents

1. [@Observable + @MainActor Patterns](#1-observable--mainactor-patterns)
2. [Property Wrappers Deep Dive](#2-property-wrappers-deep-dive)
3. [Timer Patterns in SwiftUI](#3-timer-patterns-in-swiftui)
4. [The .task Modifier](#4-the-task-modifier)
5. [View Lifecycle: onAppear & onDisappear](#5-view-lifecycle-onappear--ondisappear)
6. [Sheet Presentation](#6-sheet-presentation)
7. [Navigation Patterns](#7-navigation-patterns)
8. [Liquid Glass (iOS 26)](#8-liquid-glass-ios-26)
9. [iOS 26 New APIs Summary](#9-ios-26-new-apis-summary)

---

## 1. @Observable + @MainActor Patterns

### 1.1 How @Observable Works

The `@Observable` macro (iOS 17+) replaces `ObservableObject` as the standard state management pattern. It uses the Observation framework to provide **property-level observation** instead of object-level, meaning views only re-render when the specific properties they read in their `body` change.

**What the macro generates:**
- A private `ObservationRegistrar` storage
- Computed property wrappers with `access()` and `withMutation()` calls that intercept reads/writes
- Conformance to the `Observable` protocol

```swift
// What you write:
@Observable
class ViewModel {
    var count = 0
    var name = ""
}

// What the compiler generates (simplified):
class ViewModel: Observable {
    private let _$observationRegistrar = ObservationRegistrar()

    var count: Int {
        get {
            access(keyPath: \.count)
            return _count
        }
        set {
            withMutation(keyPath: \.count) {
                _count = newValue
            }
        }
    }
    private var _count = 0
    // ... same for name
}
```

**Performance advantage:** With `ObservableObject`, when ANY `@Published` property changed, ALL views observing that object would re-evaluate. With `@Observable`, only views that read the specific changed property re-evaluate.

```swift
@Observable
class User {
    var name = ""
    var age = 0
    var email = ""
}

struct NameView: View {
    var user: User

    var body: some View {
        Text(user.name)
        // Only re-renders when `name` changes
        // Changes to `age` or `email` do NOT trigger re-evaluation
    }
}
```

### 1.2 @Observable with @MainActor

**Rule:** All `@Observable` classes that drive UI should be marked `@MainActor`.

```swift
@MainActor
@Observable
class ViewModel {
    var items: [Item] = []
    var isLoading = false
    var errorMessage: String?

    func load() async {
        isLoading = true
        defer { isLoading = false }

        do {
            items = try await fetchItems()  // Safe: MainActor-isolated
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}
```

**Why @MainActor is required:**
- Without it, mutations from async contexts (background threads) cause data races
- Swift 6 strict concurrency will flag these as errors
- SwiftUI reads properties on the main thread; writes must happen there too

**Swift 6.2 note:** With `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor` enabled, all code runs on MainActor by default. The explicit `@MainActor` annotation is still recommended for documentation clarity, but becomes technically redundant when that build setting is active.

### 1.3 Which Thread Does SwiftUI Observe Changes On?

SwiftUI views observe changes on the **main thread**. The Observation framework's tracking happens during `body` evaluation, which always runs on `@MainActor`. When a tracked property changes:

1. The `ObservationRegistrar` fires a notification
2. SwiftUI schedules a view update on the main run loop
3. The view's `body` re-evaluates on `@MainActor`

This means property mutations MUST happen on `@MainActor` to avoid data races.

### 1.4 The Correct ViewModel Pattern

```swift
@MainActor
@Observable
class TimerViewModel {
    // MARK: - Published State
    var timeRemaining: TimeInterval = 0
    var isRunning = false
    var capturedItems: [String] = []

    // MARK: - Non-Observable State
    @ObservationIgnored
    private var timerTask: Task<Void, Never>?

    @ObservationIgnored
    private var internalCache: [String: Data] = [:]

    // MARK: - Actions
    func startTimer(duration: TimeInterval) {
        timeRemaining = duration
        isRunning = true

        timerTask = Task {
            while timeRemaining > 0 && !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                timeRemaining -= 1
            }
            isRunning = false
        }
    }

    func stopTimer() {
        timerTask?.cancel()
        timerTask = nil
        isRunning = false
    }

    func captureItem(_ text: String) {
        capturedItems.append(text)
    }
}
```

**Using in a view:**

```swift
struct TimerView: View {
    @State private var viewModel = TimerViewModel()

    var body: some View {
        VStack {
            Text("\(viewModel.timeRemaining, format: .number)")
                .font(.largeTitle)

            Button(viewModel.isRunning ? "Stop" : "Start") {
                if viewModel.isRunning {
                    viewModel.stopTimer()
                } else {
                    viewModel.startTimer(duration: 1500)
                }
            }
        }
        .task {
            // Inherits @MainActor context from body
            await viewModel.load()
        }
    }
}
```

### 1.5 Memory Management with @Observable

**Retain cycles can occur** when:
- An `@Observable` object holds closures that capture `self`
- The Observation framework retains closures internally

**Safe patterns:**

```swift
@MainActor
@Observable
class ViewModel {
    var items: [Item] = []

    // SAFE: No retain cycle risk with async methods
    func load() async {
        items = await fetchItems()
    }

    // CAUTION: Closures that capture self
    func setupCallback() {
        someService.onUpdate = { [weak self] newItems in
            self?.items = newItems
        }
    }
}
```

**Key memory facts:**
- When views leave the hierarchy, SwiftUI tears down observation scopes and the registrar drops dependencies, keeping memory safe in normal usage
- `@State` retains the `@Observable` instance for the view's lifetime
- Plain property references (no wrapper) do NOT create ownership -- the parent must hold the reference
- Use `[weak self]` in closures as a safe default for callback-based patterns
- Add `deinit` prints during development to verify deallocation

```swift
@Observable
class ViewModel {
    deinit {
        print("ViewModel deallocated")  // Verify during development
    }
}
```

### 1.6 Migration Quick Reference

| iOS 16 and Earlier | iOS 17+ (Current) |
|--------------------|--------------------|
| `ObservableObject` protocol | `@Observable` macro |
| `@Published var x` | `var x` (automatic) |
| `@StateObject private var vm` | `@State private var vm` |
| `@ObservedObject var vm` | `var vm` (plain property) |
| `@EnvironmentObject var vm` | `@Environment(VM.self) var vm` |
| `$object.property` binding | `@Bindable var b = object` then `$b.property` |
| `.environmentObject(vm)` | `.environment(vm)` |

---

## 2. Property Wrappers Deep Dive

### 2.1 @State

**Purpose:** Manages private, view-owned state for value types and `@Observable` reference types.

```swift
struct CounterView: View {
    @State private var count = 0                    // Value type
    @State private var viewModel = ViewModel()      // @Observable class

    var body: some View {
        VStack {
            Text("\(count)")
            Button("Increment") { count += 1 }
            TextField("Name", text: $viewModel.name) // Direct binding from @State
        }
    }
}
```

**Key characteristics:**
- Owned by the view; persists across body re-evaluations
- Instance remains stable throughout the view's lifecycle
- Thread-safe: can be modified from non-main threads (SwiftUI handles dispatch)
- Provides `$` prefix for two-way bindings
- For `@Observable` classes, use `@State` to claim ownership (replaces `@StateObject`)

**Thread safety example:**

```swift
@State var text: String = ""

Button("Update") {
    Task.detached {
        text = "Updated from background"  // Thread-safe with @State
    }
}
```

### 2.2 @Binding

**Purpose:** Two-way reference to data owned by another view. Does not hold data itself.

```swift
struct ToggleRow: View {
    @Binding var isOn: Bool        // Owned by parent
    let title: String

    var body: some View {
        Toggle(title, isOn: $isOn)
    }
}

// Parent passes binding:
struct ParentView: View {
    @State private var soundEnabled = true

    var body: some View {
        ToggleRow(isOn: $soundEnabled, title: "Sound")
    }
}
```

**Custom bindings:**

```swift
let limitedBinding = Binding<String>(
    get: { text },
    set: { text = String($0.prefix(100)) }  // Limit to 100 chars
)
```

### 2.3 @Bindable

**Purpose:** Creates bindings to properties of `@Observable` objects when the view does NOT own the object.

**When to use @Bindable vs @Binding:**
- `@Binding`: For value types passed from a parent view
- `@Bindable`: For `@Observable` class instances received from elsewhere (not owned by view)

```swift
@Observable
class FormModel {
    var name = ""
    var email = ""
}

// View receives but doesn't own the model
struct FormView: View {
    @Bindable var model: FormModel  // NOT @State (doesn't own it)

    var body: some View {
        Form {
            TextField("Name", text: $model.name)
            TextField("Email", text: $model.email)
        }
    }
}

// Parent owns the model
struct ParentView: View {
    @State private var model = FormModel()  // Owns it

    var body: some View {
        FormView(model: model)  // Passes reference
    }
}
```

**@Bindable with @Environment:**

```swift
struct SettingsView: View {
    @Environment(AppSettings.self) var settings

    var body: some View {
        // MUST create @Bindable to get bindings from environment
        @Bindable var bindableSettings = settings
        Toggle("Dark Mode", isOn: $bindableSettings.darkMode)
    }
}
```

**Critical:** Declare `@Bindable` at the **top of `body`**, not inside nested containers. Placing it inside a VStack or other container causes linker errors.

### 2.4 @Environment

**Purpose:** Reads system-provided or custom environment values.

```swift
struct MyView: View {
    // System values
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.dismiss) var dismiss
    @Environment(\.horizontalSizeClass) var sizeClass
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    @Environment(\.accessibilityReduceTransparency) var reduceTransparency
    @Environment(\.scenePhase) var scenePhase

    // Custom @Observable type (iOS 17+)
    @Environment(AppSettings.self) var settings

    var body: some View {
        Text("Hello")
            .foregroundStyle(colorScheme == .dark ? .white : .black)
    }
}
```

**Custom environment keys:**

```swift
struct ThemeKey: EnvironmentKey {
    static var defaultValue = Theme.system
}

extension EnvironmentValues {
    var theme: Theme {
        get { self[ThemeKey.self] }
        set { self[ThemeKey.self] = newValue }
    }
}

// Usage
struct ChildView: View {
    @Environment(\.theme) var theme

    var body: some View {
        Text("Themed")
            .foregroundStyle(theme.primaryColor)
    }
}
```

### 2.5 @ObservationIgnored

**Purpose:** Marks properties on `@Observable` classes that should NOT trigger view updates when changed.

```swift
@Observable
class ViewModel {
    var visibleState = "tracked"           // Changes trigger view updates

    @ObservationIgnored
    private var cache: [String: Data] = [:] // Changes do NOT trigger updates

    @ObservationIgnored
    private var cancellables = Set<AnyCancellable>()

    @ObservationIgnored
    private var timerTask: Task<Void, Never>?
}
```

### 2.6 Decision Tree: Which Wrapper?

```
Does your view OWN this data?
+-- YES -> Is it a value type (struct, enum, Int, String)?
|         +-- YES -> @State
|         +-- NO -> Is it @Observable?
|                   +-- YES -> @State
|                   +-- NO -> @StateObject (legacy)
|
+-- NO -> Is it passed from a parent?
          +-- YES -> Is it a value type?
          |         +-- YES -> @Binding (if mutable) or let (read-only)
          |         +-- NO -> Is it @Observable?
          |                   +-- YES -> Need bindings? -> @Bindable
          |                   |         Read-only? -> plain var
          |                   +-- NO -> @ObservedObject (legacy)
          |
          +-- Is it from the environment?
                    +-- @Observable type -> @Environment(Type.self)
                    +-- System value -> @Environment(\.keyPath)
                    +-- Legacy ObservableObject -> @EnvironmentObject (deprecated)
```

---

## 3. Timer Patterns in SwiftUI

### 3.1 TimelineView (Recommended for Display)

`TimelineView` is the modern, system-efficient approach for time-based UI updates. It lets the system manage scheduling, reducing power consumption.

**API:**

```swift
struct TimelineView<Schedule: TimelineSchedule, Content: View>: View {
    init(_ schedule: Schedule,
         @ViewBuilder content: @escaping (TimelineView<Schedule, Content>.Context) -> Content)
}
```

**Schedule types:**

| Schedule | Use Case | Code |
|----------|----------|------|
| `.periodic(from:by:)` | Fixed intervals (countdown) | `.periodic(from: .now, by: 1.0)` |
| `.animation(minimumInterval:paused:)` | Smooth animations | `.animation(minimumInterval: 1/60)` |
| `.everyMinute` | Clock displays | `.everyMinute` |
| `.explicit(dates)` | Specific future times | `.explicit([date1, date2])` |

**Countdown timer with TimelineView:**

```swift
struct CountdownView: View {
    let endDate: Date

    var body: some View {
        TimelineView(.periodic(from: .now, by: 1.0)) { context in
            let remaining = max(0, endDate.timeIntervalSince(context.date))
            let minutes = Int(remaining) / 60
            let seconds = Int(remaining) % 60

            Text(String(format: "%02d:%02d", minutes, seconds))
                .font(.system(size: 64, design: .monospaced))
                .monospacedDigit()
                .contentTransition(.numericText())
        }
    }
}
```

**Paused animation schedule:**

```swift
struct AnimatedTimer: View {
    @State private var isPaused = false

    var body: some View {
        TimelineView(.animation(minimumInterval: 1.0, paused: isPaused)) { context in
            Canvas { graphicsContext, size in
                // Draw timer ring based on context.date
            }
        }
    }
}
```

### 3.2 Timer.publish (Legacy but Simple)

Uses Combine's `Timer.publish` with `onReceive`. Still works but uses the RunLoop and requires manual management.

```swift
struct LegacyTimerView: View {
    @State private var timeRemaining = 300
    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    var body: some View {
        Text("\(timeRemaining)")
            .onReceive(timer) { _ in
                if timeRemaining > 0 {
                    timeRemaining -= 1
                }
            }
    }
}
```

**Limitations:**
- Requires RunLoop (main thread only)
- Manual lifecycle management
- Combine dependency
- Does not pause when app backgrounds (needs manual handling)

### 3.3 Task.sleep (For Logic, Not Display)

Best for non-display countdown logic within structured concurrency.

```swift
@MainActor
@Observable
class TimerStore {
    var secondsRemaining: Int = 0
    var isActive = false

    @ObservationIgnored
    private var timerTask: Task<Void, Never>?

    func start(seconds: Int) {
        secondsRemaining = seconds
        isActive = true

        timerTask = Task {
            while secondsRemaining > 0 && !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                guard !Task.isCancelled else { break }
                secondsRemaining -= 1
            }
            if !Task.isCancelled {
                isActive = false
                handleTimerComplete()
            }
        }
    }

    func stop() {
        timerTask?.cancel()
        timerTask = nil
        isActive = false
    }
}
```

### 3.4 Comparison: Which Timer Approach?

| Aspect | TimelineView | Timer.publish | Task.sleep |
|--------|-------------|---------------|------------|
| **Best for** | Display updates | Simple UI timers | Logic/state |
| **Thread** | System-managed | Main RunLoop | Any (structured) |
| **Cancellation** | Automatic (view lifecycle) | Manual `.cancel()` | Cooperative (`Task.isCancelled`) |
| **Background** | Pauses automatically | Pauses on RunLoop | Suspends with Task |
| **Performance** | System-optimized | Good | Good |
| **Swift 6** | Fully compatible | Requires Combine | Native async/await |
| **Recommended** | For countdown displays | Legacy compatibility | For ViewModel logic |

### 3.5 Timer + Background App State

Timers do not fire when the app is backgrounded. Handle this with `scenePhase`:

```swift
struct TimerView: View {
    @State private var store = TimerStore()
    @Environment(\.scenePhase) var scenePhase
    @State private var backgroundDate: Date?

    var body: some View {
        TimelineView(.periodic(from: .now, by: 1.0)) { context in
            TimerDisplay(remaining: store.secondsRemaining)
        }
        .onChange(of: scenePhase) { oldPhase, newPhase in
            switch newPhase {
            case .background:
                backgroundDate = Date()
            case .active:
                if let bg = backgroundDate {
                    let elapsed = Int(Date().timeIntervalSince(bg))
                    store.secondsRemaining = max(0, store.secondsRemaining - elapsed)
                    backgroundDate = nil
                }
            default:
                break
            }
        }
    }
}
```

### 3.6 Properly Invalidating Timers

```swift
// Task-based: Cancel the task
timerTask?.cancel()
timerTask = nil

// Timer.publish: Cancel the connection
let connection = timer.connect()
// Later:
connection.cancel()

// TimelineView: Use paused parameter or remove from view hierarchy
TimelineView(.animation(paused: !isRunning)) { _ in ... }
```

---

## 4. The .task Modifier

### 4.1 Core Behavior

The `.task` modifier creates an unstructured async task tied to the view's lifecycle. Two variants:

```swift
// Variant 1: Runs once when view appears
.task(priority: .userInitiated) {
    await loadData()
}

// Variant 2: Runs on appear AND restarts when id changes
.task(id: searchQuery) {
    await performSearch(searchQuery)
}
```

### 4.2 Does .task Inherit MainActor?

**Yes, by default.** The `.task` modifier uses `@_inheritActorContext`, which means it inherits the actor isolation of its declaration site. Since `View.body` is `@MainActor`, closures written inline in `body` run on the main thread.

```swift
struct MyView: View {
    var body: some View {
        Text("Hello")
            .task {
                // This runs on @MainActor because it's declared in body
                print(Thread.isMainThread)  // true
                await loadData()  // Runs on MainActor
            }
    }
}
```

**To run on a background thread,** declare the function outside `body`:

```swift
struct MyView: View {
    var body: some View {
        Text("Hello")
            .task(backgroundWork)  // Runs on background thread
    }

    // Declared outside body, with @Sendable
    @Sendable
    func backgroundWork() async {
        print(Thread.isMainThread)  // false
    }
}
```

**Warning:** Using `.task { await backgroundWork() }` forces main thread execution because the wrapping closure inherits body's MainActor context.

### 4.3 When Is It Cancelled?

The task is cancelled (cooperatively) when:
1. **The view disappears** (leaves the view hierarchy)
2. **The `id` value changes** (for `.task(id:)`) -- the old task is cancelled and a new one starts
3. **The parent task is cancelled** (structured cancellation propagation)

Cancellation is **cooperative**: SwiftUI sets `Task.isCancelled` to `true` and `Task.sleep` throws `CancellationError`, but the task body must check for and honor cancellation.

```swift
.task {
    defer { print("Task ending -- cleanup here") }

    while !Task.isCancelled {
        try? await Task.sleep(for: .seconds(1))
        await updateData()
    }
}
```

### 4.4 Multiple .task Modifiers

You can attach multiple `.task` modifiers to the same view. Each runs independently with its own lifecycle.

```swift
Text("Dashboard")
    .task {
        await loadUserProfile()
    }
    .task(id: selectedTab) {
        await loadTabContent(selectedTab)
    }
    .task(id: refreshTrigger) {
        await refreshData()
    }
```

### 4.5 .task(id:) -- When Does It Restart?

When the `id` value changes (tested via `Equatable`), SwiftUI:
1. Cancels the existing task
2. Creates and starts a new task with the updated context

This replaces the `onAppear + onChange` pattern:

```swift
// OLD PATTERN (avoid)
.onAppear { Task { await search(query) } }
.onChange(of: query) { _, newQuery in
    Task { await search(newQuery) }
}

// NEW PATTERN (preferred)
.task(id: query) {
    await search(query)
}
```

**Debouncing with .task(id:):**

```swift
.task(id: searchText) {
    do {
        try await Task.sleep(for: .milliseconds(300))
        await performSearch(searchText)
    } catch {
        // Task cancelled because searchText changed again -- no network request made
    }
}
```

### 4.6 .task vs onAppear + Task

| Aspect | `.task` | `onAppear + Task` |
|--------|---------|---------------------|
| Cancellation | Automatic on disappear | Manual management required |
| Syntax | Single modifier | Two modifiers + Task storage |
| Actor context | Inherits from declaration | Inherits from declaration |
| id-based restart | Built-in with `.task(id:)` | Must combine with `.onChange` |
| Multiple on same view | Each independent | Each independent |

### 4.7 @DynamicProperty Gotcha

If your view uses `@StateObject`, the entire view struct is inferred as `@MainActor`, preventing background execution even with external functions:

```swift
struct BadView: View {
    @StateObject var object = LegacyObject()  // Forces @MainActor inference

    var body: some View {
        Text("Hello")
            .task(backgroundWork)  // Still runs on main thread!
    }

    @Sendable
    func backgroundWork() async {
        // This runs on main thread due to @StateObject inference
    }
}
```

**Solution:** Use `@State` with `@Observable` instead of `@StateObject`.

### 4.8 Modifying State from .task

- **`@State` properties:** Safe to modify from any thread (SwiftUI handles dispatch)
- **`@Observable` properties:** Must be on `@MainActor` if the class is `@MainActor`
- **Other `@DynamicProperty` types:** Must switch to main thread explicitly

```swift
.task {
    let data = await fetchFromNetwork()  // Background-safe

    // For @MainActor @Observable ViewModel:
    await MainActor.run {
        viewModel.items = data  // Switch to main thread
    }

    // But if .task already runs on MainActor (inline in body):
    viewModel.items = data  // Already on MainActor -- safe
}
```

---

## 5. View Lifecycle: onAppear & onDisappear

### 5.1 Basic Lifecycle

```swift
struct MyView: View {
    var body: some View {
        Text("Hello")
            .onAppear {
                print("View appeared")
                // Load data, start animations, track analytics
            }
            .onDisappear {
                print("View disappeared")
                // Cleanup, cancel tasks, save state
            }
    }
}
```

### 5.2 Trigger Conditions

`onAppear` and `onDisappear` fire based on whether the view **participates in its parent's layout**, not simply whether it's visible on screen. This distinction matters.

**Normal triggers:**
- View enters/exits the view hierarchy
- NavigationStack push/pop
- Tab switches in TabView
- Sheet presentation/dismissal

### 5.3 Known Issues: Multiple Calls

**Issue 1: TabView calls onAppear on every tab switch**

```swift
TabView {
    Tab("Home", systemImage: "house") {
        HomeView()
            .onAppear { print("Home appeared") }
            // Called EVERY time this tab is selected
    }
    Tab("Settings", systemImage: "gear") {
        SettingsView()
    }
}
```

**Issue 2: NavigationStack in conditional branches**

When a `NavigationStack` is inside an `if` block and the condition changes while navigated deep, all `onAppear` closures in the root view fire abnormally.

```swift
// BUG: onAppear fires unexpectedly when isLogin toggles
if isLogin {
    NavigationStack {
        HomeView()
            .onAppear { print("This fires abnormally") }
        NavigationLink("Details") {
            DetailView()
        }
    }
} else {
    LoginView()
}
```

### 5.4 Workarounds

**OnceAppear modifier (execute only once):**

```swift
extension View {
    func onceAppear(perform action: @escaping () -> Void) -> some View {
        modifier(OnceAppearModifier(action: action))
    }
}

struct OnceAppearModifier: ViewModifier {
    @State private var hasAppeared = false
    let action: () -> Void

    func body(content: Content) -> some View {
        content.onAppear {
            guard !hasAppeared else { return }
            hasAppeared = true
            action()
        }
    }
}

// Usage
Text("Hello")
    .onceAppear {
        analytics.track("screen_viewed")  // Only fires once
    }
```

**Conditional execution with binding:**

```swift
extension View {
    func onAppear(enable: Binding<Bool>, perform action: (() -> Void)? = nil) -> some View {
        onAppear {
            if enable.wrappedValue {
                action?()
            }
        }
    }
}
```

### 5.5 onAppear vs .task

| Aspect | `onAppear` | `.task` |
|--------|-----------|---------|
| Async support | No (must wrap in Task) | Yes (native async) |
| Auto-cancellation | No | Yes (on disappear) |
| Multiple calls | Can fire multiple times | Can fire multiple times |
| id-based restart | No | Yes (`.task(id:)`) |
| Recommendation | Sync setup only | All async work |

**Prefer `.task` for any async work.** Use `onAppear` only for synchronous, immediate setup.

---

## 6. Sheet Presentation

### 6.1 API Signatures

```swift
// Boolean-based
func sheet<Content: View>(
    isPresented: Binding<Bool>,
    onDismiss: (() -> Void)? = nil,
    @ViewBuilder content: @escaping () -> Content
) -> some View

// Item-based (preferred for data-driven sheets)
func sheet<Item: Identifiable, Content: View>(
    item: Binding<Item?>,
    onDismiss: (() -> Void)? = nil,
    @ViewBuilder content: @escaping (Item) -> Content
) -> some View
```

### 6.2 iOS 26 Sheet Changes

**Liquid Glass background:** Sheets automatically get a Liquid Glass background in iOS 26. Partial-height sheets (`.medium`, custom detents) float above the interface with rounded corners that don't touch the screen edges.

**Large detent transition:** When a sheet expands to `.large`, its background transitions to opaque and attaches to screen edges.

**Avoid `presentationBackground()`:** Custom presentation backgrounds can interfere with the automatic Liquid Glass styling. Only use when specifically overriding the glass look.

**Z-order bug fix:** iOS 26 may render backgrounds above sheets with `.presentationDetents`. Fix with explicit background:

```swift
.sheet(isPresented: $show) {
    SheetContent()
        .presentationDetents([.medium])
        .presentationBackground(Color(.systemBackground))  // Required fix
}
```

### 6.3 Close Button Role (iOS 26)

iOS 26 introduces `Button(role: .close)` for dismissing informational views:

```swift
struct InfoSheet: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            InfoContent()
                .toolbar {
                    Button(role: .close) {
                        dismiss()
                    }
                    // Renders as an X mark with glass effect
                }
        }
    }
}
```

**`.close` vs `.cancel`:**
- `.close`: Dismisses informational views, no data loss implied
- `.cancel`: Abandons edits or progress, implies data loss

**Note:** `Button(role: .close)` does NOT auto-dismiss. You must call `dismiss()` explicitly.

### 6.4 Sheet Morphing Transitions (iOS 26)

Sheets can morph from their triggering toolbar button:

```swift
struct MorphingSheetView: View {
    @Namespace private var transition
    @State private var showInfo = false

    var body: some View {
        NavigationStack {
            ContentView()
                .toolbar {
                    ToolbarItem(placement: .bottomBar) {
                        Button("Info", systemImage: "info") {
                            showInfo = true
                        }
                        .matchedTransitionSource(id: "info", in: transition)
                    }
                }
                .sheet(isPresented: $showInfo) {
                    InfoSheet()
                        .presentationDetents([.medium, .large])
                        .navigationTransition(
                            .zoom(sourceID: "info", in: transition)
                        )
                }
        }
    }
}
```

**Requirements:**
- Toolbar must be inside `NavigationStack` or `NavigationSplitView`
- Use shared `@Namespace` between source and destination
- Apply `matchedTransitionSource` to the button
- Apply `navigationTransition(.zoom(...))` to the sheet content

### 6.5 Dismissing Sheets Programmatically

```swift
struct SheetView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                // Content
            }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveData()
                        dismiss()
                    }
                }
            }
        }
    }
}
```

**Prevent interactive dismissal:**

```swift
.sheet(isPresented: $showSheet) {
    EditView()
        .interactiveDismissDisabled(hasUnsavedChanges)
}
```

### 6.6 Common Sheet Crashes

**Multiple sheets on same view:**

```swift
// CRASH: Multiple .sheet modifiers
.sheet(isPresented: $show1) { Sheet1() }
.sheet(isPresented: $show2) { Sheet2() }  // Crashes!

// FIX: Use enum-based item
enum ActiveSheet: Identifiable {
    case settings, profile
    var id: Self { self }
}

@State private var activeSheet: ActiveSheet?

.sheet(item: $activeSheet) { sheet in
    switch sheet {
    case .settings: SettingsSheet()
    case .profile: ProfileSheet()
    }
}
```

**Environment not propagated to sheet:**

```swift
// CRASH: @Environment(Settings.self) not found in sheet
.sheet(isPresented: $show) {
    SheetView()  // Settings not available!
}

// FIX: Re-inject environment into sheet
.sheet(isPresented: $show) {
    SheetView()
        .environment(settings)  // Must re-inject
}
```

**Permission dialogs and sheet conflicts:** System permission dialogs (microphone, notifications) can conflict with sheet presentation. Ensure permissions are requested before presenting sheets, or handle the timing with a slight delay.

---

## 7. Navigation Patterns

### 7.1 NavigationStack (Replaces NavigationView)

`NavigationView` is deprecated. Use `NavigationStack` for all new code.

```swift
struct AppView: View {
    var body: some View {
        NavigationStack {
            List {
                NavigationLink("Settings", value: Route.settings)
                NavigationLink("Profile", value: Route.profile)
            }
            .navigationTitle("Home")
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .settings: SettingsView()
                case .profile: ProfileView()
                }
            }
        }
    }
}

enum Route: Hashable {
    case settings
    case profile
}
```

### 7.2 NavigationPath

A type-erased collection that can hold any `Hashable` values. Use it for programmatic navigation with mixed types.

```swift
@State private var path = NavigationPath()

NavigationStack(path: $path) {
    HomeView()
        .navigationDestination(for: String.self) { value in
            TextDetailView(text: value)
        }
        .navigationDestination(for: Int.self) { value in
            NumberDetailView(number: value)
        }
}

// Programmatic navigation:
path.append("Hello")       // Push String destination
path.append(42)            // Push Int destination
path.removeLast()          // Pop one level
path.removeLast(path.count) // Pop to root
```

**Codable support** for state restoration:

```swift
// Save navigation state
if let codable = path.codable {
    let data = try JSONEncoder().encode(codable)
    UserDefaults.standard.set(data, forKey: "navigationState")
}

// Restore navigation state
if let data = UserDefaults.standard.data(forKey: "navigationState"),
   let codable = try? JSONDecoder().decode(NavigationPath.CodableRepresentation.self, from: data) {
    path = NavigationPath(codable)
}
```

### 7.3 Type-Safe Router Pattern

The recommended architecture for complex apps:

```swift
// MARK: - Route Definition
enum AppRoute: Hashable {
    case itemDetail(id: UUID)
    case settings
    case capture
    case statistics(period: StatsPeriod)
}

// MARK: - Router
@MainActor
@Observable
final class AppRouter {
    var path = NavigationPath()

    func navigate(to route: AppRoute) {
        path.append(route)
    }

    func goBack() {
        guard !path.isEmpty else { return }
        path.removeLast()
    }

    func popToRoot() {
        path.removeLast(path.count)
    }
}

// MARK: - App Structure
@main
struct MyApp: App {
    @State private var router = AppRouter()

    var body: some Scene {
        WindowGroup {
            NavigationStack(path: $router.path) {
                HomeView()
                    .navigationDestination(for: AppRoute.self) { route in
                        switch route {
                        case .itemDetail(let id):
                            ItemDetailView(itemId: id)
                        case .settings:
                            SettingsView()
                        case .capture:
                            CaptureView()
                        case .statistics(let period):
                            StatisticsView(period: period)
                        }
                    }
            }
            .environment(router)
        }
    }
}

// MARK: - Using in Views
struct HomeView: View {
    @Environment(AppRouter.self) var router

    var body: some View {
        List {
            Button("Settings") { router.navigate(to: .settings) }
            Button("Statistics") { router.navigate(to: .statistics(period: .week)) }
        }
    }
}
```

### 7.4 Deep Linking

```swift
@MainActor
@Observable
final class DeepLinkHandler {
    func handle(url: URL, router: AppRouter) {
        guard url.scheme == "myapp" else { return }
        let components = url.pathComponents.filter { $0 != "/" }

        switch components.first {
        case "item":
            if let idString = components.dropFirst().first,
               let id = UUID(uuidString: idString) {
                router.navigate(to: .itemDetail(id: id))
            }
        case "settings":
            router.navigate(to: .settings)
        case "capture":
            router.navigate(to: .capture)
        default:
            break
        }
    }
}

// In App:
.onOpenURL { url in
    deepLinkHandler.handle(url: url, router: router)
}
```

### 7.5 Common Navigation Crashes

**Modifying path during view update:**

```swift
// CRASH: Modifying path in onAppear during body evaluation
.onAppear {
    path.append(Route.detail)  // Can crash
}

// FIX: Dispatch to next run loop
.onAppear {
    DispatchQueue.main.async {
        path.append(Route.detail)
    }
}
// Or better: use .task
.task {
    path.append(Route.detail)
}
```

**Unregistered type in NavigationPath:**

```swift
// CRASH: String destination not registered
path.append("hello")  // No .navigationDestination(for: String.self)

// FIX: Use a single Route enum and register only that type
path.append(Route.detail(id: "hello"))
```

**Array subscript before data loads:**

```swift
// CRASH: items is empty, body evaluates before onAppear
BottomBar(lastItem: viewModel.items.last ?? viewModel.items[0])

// FIX: Guard on isEmpty
if !viewModel.items.isEmpty {
    BottomBar(lastItem: viewModel.items.last!)
}
```

---

## 8. Liquid Glass (iOS 26)

### 8.1 Overview

Liquid Glass is Apple's most significant design evolution since iOS 7, introduced at WWDC 2025. It creates a translucent, dynamic material through four principles:
- **Lensing:** Real-time light bending and focusing
- **Specular highlights:** Reflections responding to device motion
- **Adaptive shadows:** Shadows that adjust to underlying content
- **Interactive behaviors:** Visual responses to user touch

### 8.2 Automatic Adoption

Recompiling with the iOS 26 SDK automatically applies Liquid Glass to:
- NavigationBar, TabBar, Toolbar
- Sheets, Popovers, Menus, Alerts
- Search bars, Control Center
- Toggles, Sliders, Pickers (during interaction)

No code changes needed for these.

### 8.3 glassEffect() Modifier

```swift
@available(iOS 26.0, *)
func glassEffect<S: Shape>(
    _ glass: Glass = .regular,
    in shape: S = DefaultGlassEffectShape,  // Capsule
    isEnabled: Bool = true
) -> some View
```

**Glass types:**

| Type | Use | Transparency |
|------|-----|-------------|
| `.regular` | Default UI controls | Medium |
| `.clear` | Over photos/video | High (requires bold content) |
| `.identity` | Conditional disable | None |

**Modifiers on Glass:**

```swift
// Tinting (semantic color meaning)
.glassEffect(.regular.tint(.blue))
.glassEffect(.regular.tint(.purple.opacity(0.6)))

// Interactive (touch feedback: scale, bounce, shimmer)
.glassEffect(.regular.interactive())

// Combined
.glassEffect(.regular.tint(.orange).interactive())
```

**Shapes:**

```swift
.glassEffect(.regular, in: .capsule)                          // Default
.glassEffect(.regular, in: .circle)
.glassEffect(.regular, in: RoundedRectangle(cornerRadius: 16))
.glassEffect(.regular, in: .rect(cornerRadius: .containerConcentric))
.glassEffect(.regular, in: .ellipse)
.glassEffect(.regular, in: CustomShape())
```

### 8.4 GlassEffectContainer

Groups multiple glass elements so they share rendering context, enable morphing, and avoid the "glass sampling glass" problem.

```swift
GlassEffectContainer(spacing: 20) {
    Button("Edit") { }
        .glassEffect(.regular.interactive())

    Button("Share") { }
        .glassEffect(.regular.interactive())

    Button("Delete") { }
        .glassEffect(.regular.tint(.red).interactive())
}
```

The `spacing` parameter is the **morphing threshold**: elements at this distance or closer visually merge into unified glass.

### 8.5 Morphing with glassEffectID

Requirements: same container, unique IDs within namespace, animated state changes.

```swift
struct ExpandableActions: View {
    @State private var isExpanded = false
    @Namespace private var namespace

    var body: some View {
        GlassEffectContainer(spacing: 30) {
            Button(isExpanded ? "Collapse" : "Expand") {
                withAnimation(.bouncy) {
                    isExpanded.toggle()
                }
            }
            .glassEffect()
            .glassEffectID("toggle", in: namespace)

            if isExpanded {
                Button("Camera") { }
                    .glassEffect(.regular.interactive())
                    .glassEffectID("camera", in: namespace)

                Button("Photo") { }
                    .glassEffect(.regular.interactive())
                    .glassEffectID("photo", in: namespace)
            }
        }
    }
}
```

### 8.6 Button Styles

```swift
Button("Secondary Action") { }
    .buttonStyle(.glass)           // Translucent for secondary

Button("Primary Action") { }
    .buttonStyle(.glassProminent)  // More opaque for primary
```

### 8.7 Design Rules

**DO:**
- Reserve glass for the **navigation layer** floating above content
- Use `GlassEffectContainer` for grouped elements
- Use `tint` for semantic meaning (primary actions, state indicators)
- Use bold, high-contrast foreground content on glass
- Trust system accessibility adaptations
- Test with Reduce Transparency, Reduce Motion, Increase Contrast

**DO NOT:**
- Apply glass to **content** (lists, cards, text blocks)
- Stack glass on glass without a container
- Use tint for decoration
- Apply glass to every element (performance cost)
- Override system accessibility handling unless necessary

### 8.8 Accessibility

Liquid Glass automatically adapts:

| Setting | Adaptation |
|---------|------------|
| Reduce Transparency | Increases frosting, more solid backgrounds |
| Increase Contrast | Adds stark colors and borders |
| Reduce Motion | Disables lensing animations |
| Tinted Mode (iOS 26.1+) | User-controlled opacity level |

**Manual override (discouraged):**

```swift
@Environment(\.accessibilityReduceTransparency) var reduceTransparency

.glassEffect(reduceTransparency ? .identity : .regular)
```

### 8.9 Backward Compatibility

```swift
extension View {
    @ViewBuilder
    func adaptiveGlassEffect() -> some View {
        if #available(iOS 26, *) {
            self.glassEffect(.regular)
        } else {
            self.background(.ultraThinMaterial)
        }
    }
}
```

### 8.10 Known Issues (iOS 26.0-26.1)

- **Interactive shape mismatch:** `.glassEffect(.regular.interactive(), in: RoundedRectangle())` sometimes renders as Capsule. Workaround: use `.buttonStyle(.glass)` for buttons.
- **glassProminent with Circle:** Rendering artifacts with prominent glass and circular shapes.
- **Menu in GlassEffectContainer:** iOS 26.1 can break morphing when Menu exists in containers. Apply `.glassEffect(.regular.interactive())` directly to Menu.

---

## 9. iOS 26 New APIs Summary

### 9.1 SwiftUI Additions

| Category | API | Description |
|----------|-----|-------------|
| **Glass** | `.glassEffect()` | Liquid Glass material |
| **Glass** | `GlassEffectContainer` | Group multiple glass elements |
| **Glass** | `.glassEffectID()` | Morphing transitions |
| **Buttons** | `.buttonStyle(.glass)` | Glass button appearance |
| **Buttons** | `.buttonStyle(.glassProminent)` | Prominent glass button |
| **Buttons** | `Button(role: .close)` | Dismiss button with X mark |
| **Toolbar** | `ToolbarSpacer()` | Standard toolbar spacing |
| **Toolbar** | `.toolbarItemSharedBackgroundVisibility()` | Glass background control |
| **Toolbar** | `.title`, `.subtitle` placements | Title toolbar items |
| **Navigation** | `.navigationSubtitle()` | Secondary navigation title |
| **TabView** | `.hideTabBarOnScrollDown()` | Auto-hide tab bar |
| **TabView** | `.tabViewBottomAccessory()` | Content above tabs |
| **List** | `.sectionIndexLabel()` | Section index labels |
| **ScrollView** | `.scrollEdgeEffect(.hard)` | Hard edge cutoff |
| **View** | `.backgroundExtensionEffect()` | Mirrored background copies |
| **Sheet** | Floating partial sheets | Glass-backed, inset from edges |
| **Sheet** | Morphing transitions | Sheet morphs from source button |
| **Slider** | Custom tick content | `SliderTickContentForEach` |

### 9.2 Deprecations in iOS 26

| Deprecated | Replacement |
|-----------|-------------|
| `NavigationView` | `NavigationStack` |
| `@EnvironmentObject` | `@Environment(Type.self)` |
| `ObservableObject` | `@Observable` |
| `@StateObject` | `@State` (for @Observable) |
| `@ObservedObject` | Plain property (for @Observable) |
| `@Published` | Automatic with @Observable |

---

## Appendix A: Quick Reference Card

### ViewModel Template

```swift
@MainActor
@Observable
final class FeatureViewModel {
    // MARK: - Observable State
    var items: [Item] = []
    var isLoading = false
    var errorMessage: String?

    // MARK: - Non-Observable
    @ObservationIgnored
    private var task: Task<Void, Never>?

    // MARK: - Actions
    func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            items = try await service.fetch()
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    deinit { task?.cancel() }
}
```

### View Template

```swift
struct FeatureView: View {
    @State private var viewModel = FeatureViewModel()

    var body: some View {
        NavigationStack {
            content
                .navigationTitle("Feature")
                .task { await viewModel.load() }
        }
    }

    @ViewBuilder
    private var content: some View {
        if viewModel.isLoading {
            ProgressView()
        } else if let error = viewModel.errorMessage {
            ContentUnavailableView("Error", systemImage: "exclamationmark.triangle",
                                    description: Text(error))
        } else {
            List(viewModel.items) { item in
                ItemRow(item: item)
            }
        }
    }
}
```

### Timer View Template

```swift
struct TimerView: View {
    @State private var store = TimerStore()
    @Environment(\.scenePhase) var scenePhase

    var body: some View {
        TimelineView(.periodic(from: .now, by: 1.0)) { context in
            TimerDisplay(remaining: store.secondsRemaining)
        }
        .onChange(of: scenePhase) { _, newPhase in
            store.handleScenePhase(newPhase)
        }
    }
}
```

---

## Appendix B: Sources

### References

**Apple Documentation:**
- [SwiftUI Framework](https://developer.apple.com/documentation/swiftui)
- [Applying Liquid Glass to Custom Views](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views)
- [glassEffect(_:in:)](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:))
- [Managing Model Data in Your App](https://developer.apple.com/documentation/SwiftUI/Managing-model-data-in-your-app)
- [NavigationPath](https://developer.apple.com/documentation/swiftui/navigationpath)
- [Bindable](https://developer.apple.com/documentation/swiftui/bindable)
- [TimelineView](https://developer.apple.com/documentation/swiftui/timelineview)
- [dismiss](https://developer.apple.com/documentation/swiftui/environmentvalues/dismiss)

**WWDC Sessions:**
- [Build a SwiftUI App with the New Design (WWDC25 Session 323)](https://developer.apple.com/videos/play/wwdc2025/323/)
- [Meet Liquid Glass (WWDC25 Session 219)](https://developer.apple.com/videos/play/wwdc2025/219/)

**Technical References:**
- [Mastering the SwiftUI task Modifier - Fat Bob Man](https://fatbobman.com/en/posts/mastering_swiftui_task_modifier/)
- [SwiftUI Views and @MainActor - Fat Bob Man](https://fatbobman.com/en/posts/swiftui-views-and-mainactor/)
- [Traps and Countermeasures for Abnormal onAppear - Fat Bob Man](https://fatbobman.com/en/posts/traps-and-countermeasures-for-abnormal-onappear-calls-in-swiftui/)
- [Exploring Key Property Wrappers in SwiftUI - Fat Bob Man](https://fatbobman.com/en/posts/exploring-key-property-wrappers-in-swiftui/)
- [The Power of task View Modifier - Swift with Majid](https://swiftwithmajid.com/2022/06/28/the-power-of-task-view-modifier-in-swiftui/)
- [iOS 26 Liquid Glass Reference - Conor Luddy](https://github.com/conorluddy/LiquidGlassReference)
- [SwiftUI Liquid Glass: The Complete iOS 26 Guide - Atelier Socle](https://www.atelier-socle.com/en/articles/swiftui-liquid-glass-guide)
- [GlassEffectContainer - DEV Community](https://dev.to/arshtechpro/understanding-glasseffectcontainer-in-ios-26-2n8p)
- [Presenting Liquid Glass Sheets - Nil Coalescing](https://nilcoalescing.com/blog/PresentingLiquidGlassSheetsInSwiftUI/)
- [Close Button in iOS 26 - Nil Coalescing](https://nilcoalescing.com/blog/AddACloseButtonToSwiftUIModalsOnIOS26/)
- [Using @Observable in SwiftUI - Nil Coalescing](https://nilcoalescing.com/blog/ObservableInSwiftUI/)
- [@Binding vs @Bindable - Donny Wals](https://www.donnywals.com/whats-the-difference-between-binding-and-bindable/)
- [Mastering Navigation 2025 - Medium](https://medium.com/@dinaga119/mastering-navigation-in-swiftui-the-2025-guide-to-clean-scalable-routing-bbcb6dbce929)
- [WWDC25 iOS 26 SwiftUI Features - Explore SwiftUI](https://exploreswiftui.com/wwdc25)
- [TimelineView Guide - Wesley Matlock](https://medium.com/@wesleymatlock/utilizing-timelineview-for-time-based-updates-in-swiftui-432fca93da03)
- [All SwiftUI Property Wrappers - Hacking with Swift](https://www.hackingwithswift.com/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared)
