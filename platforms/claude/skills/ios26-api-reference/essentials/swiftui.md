# SwiftUI -- iOS 26 Essentials

> For deep reference: load `reference/swiftui-reference.md`

---

## Correct Patterns (vs Common Mistakes)

| # | Topic | WRONG | RIGHT | Why |
|---|-------|-------|-------|-----|
| 1 | State management class | `ObservableObject` + `@Published` | `@Observable` macro | `@Observable` gives property-level observation; `ObservableObject` re-renders ALL views on any `@Published` change |
| 2 | ViewModel ownership | `@StateObject private var vm` | `@State private var vm` (with `@Observable` class) | `@StateObject` is legacy; `@State` claims ownership of `@Observable` instances |
| 3 | Passed ViewModel | `@ObservedObject var vm` | Plain `var vm` (read-only) or `@Bindable var vm` (need bindings) | `@ObservedObject` is legacy; `@Observable` objects observed automatically |
| 4 | Environment injection | `.environmentObject(vm)` / `@EnvironmentObject` | `.environment(vm)` / `@Environment(Type.self)` | `@EnvironmentObject` is deprecated in iOS 17+ |
| 5 | Binding to @Observable | `@Binding var prop` from ViewModel | `@Bindable var vm = model` then `$vm.prop` | `@Bindable` creates bindings to `@Observable` properties; `@Binding` is for value types |
| 6 | Timer display | `Timer.publish` + `onReceive` | `TimelineView(.periodic(from:by:))` | `TimelineView` is system-managed, power-efficient, no Combine dependency |
| 7 | Timer logic in ViewModel | Raw `Timer` / `DispatchSourceTimer` | `Task.sleep(for:)` in a `Task` with cancellation | Structured concurrency; cooperative cancellation; no RunLoop dependency |
| 8 | Async work on appear | `onAppear { Task { await work() } }` | `.task { await work() }` | `.task` auto-cancels on disappear; `onAppear + Task` leaks if view disappears |
| 9 | Restart on value change | `.onAppear` + `.onChange(of:)` combo | `.task(id: value) { await work(value) }` | `.task(id:)` cancels old task and restarts -- single modifier, automatic lifecycle |
| 10 | NavigationView | `NavigationView { ... }` | `NavigationStack { ... }` | `NavigationView` is deprecated; `NavigationStack` supports programmatic navigation via `NavigationPath` |
| 11 | Multiple sheets | Two `.sheet` modifiers on one view | Enum-based `.sheet(item:)` with `Identifiable` enum | Multiple `.sheet` modifiers crash at runtime |
| 12 | Sheet environment | Assume parent environment propagates to sheet | Re-inject `.environment(obj)` on sheet content | Sheets are separate view hierarchies; `@Environment(Type.self)` crashes if not re-injected |
| 13 | Glass on content | `.glassEffect()` on list rows / cards | `.glassEffect()` only on navigation-layer controls (toolbars, floating buttons) | Glass is for the navigation layer; applying to content causes visual noise and performance cost |
| 14 | @Bindable placement | `@Bindable var x = env` inside VStack | `@Bindable var x = env` at **top of `body`** | Declaring inside nested containers causes linker errors |

---

## Property Wrapper Decision Tree

```
Does your view OWN this data?
+-- YES -> Value type (struct/enum/Int/String)?
|         +-- YES -> @State
|         +-- NO -> @Observable class? -> @State
|
+-- NO -> Passed from parent?
          +-- YES -> Value type?
          |         +-- YES -> @Binding (mutable) or let (read-only)
          |         +-- NO -> @Observable?
          |                   +-- Need bindings? -> @Bindable
          |                   +-- Read-only? -> plain var
          |
          +-- From environment?
                    +-- @Observable type -> @Environment(Type.self)
                    +-- System value -> @Environment(\.keyPath)
```

## Migration Table (iOS 16 -> iOS 17+)

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

## Crash Prevention Patterns

### 1. Multiple sheets on one view

```swift
// WRONG -- crashes
.sheet(isPresented: $show1) { Sheet1() }
.sheet(isPresented: $show2) { Sheet2() }

// RIGHT -- enum-based item
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

### 2. Environment not propagated to sheet

```swift
// WRONG -- crashes: @Environment(Settings.self) not found
.sheet(isPresented: $show) {
    SheetView()
}

// RIGHT -- re-inject environment
.sheet(isPresented: $show) {
    SheetView()
        .environment(settings)
}
```

### 3. Modifying NavigationPath during view update

```swift
// WRONG -- can crash
.onAppear {
    path.append(Route.detail)
}

// RIGHT -- defer to next run loop or use .task
.task {
    path.append(Route.detail)
}
```

### 4. Unregistered type in NavigationPath

```swift
// WRONG -- crashes: no destination registered for String
path.append("hello")

// RIGHT -- use typed Route enum
path.append(Route.detail(id: "hello"))
// with: .navigationDestination(for: Route.self) { ... }
```

### 5. Array subscript before data loads

```swift
// WRONG -- crashes when items is empty
BottomBar(lastItem: viewModel.items.last ?? viewModel.items[0])

// RIGHT -- guard on isEmpty
if !viewModel.items.isEmpty {
    BottomBar(lastItem: viewModel.items.last!)
}
```

### 6. @Observable ViewModel without @MainActor

```swift
// WRONG -- data races in Swift 6
@Observable
class ViewModel {
    var items: [Item] = []
    func load() async { items = try await fetch() }
}

// RIGHT -- MainActor isolation
@MainActor
@Observable
class ViewModel {
    var items: [Item] = []
    func load() async { items = try await fetch() }
}
```

### 7. Timer during scroll (RunLoop.default stops)

```swift
// WRONG -- timer pauses during scroll
let timer = Timer.publish(every: 1, on: .main, in: .default).autoconnect()

// RIGHT -- use .common mode
let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

// BEST -- use TimelineView (system-managed, no RunLoop concern)
TimelineView(.periodic(from: .now, by: 1.0)) { context in
    // ...
}
```

### 8. List/ForEach selection crash

```swift
// WRONG -- selection binding type mismatch causes crash
@State private var selection: String?
List(items, selection: $selection) { item in  // items.id is UUID, not String
    Text(item.name)
}

// RIGHT -- match selection type to item ID type
@State private var selection: UUID?
List(items, selection: $selection) { item in
    Text(item.name)
}
```

### 9. Glass stacked on glass

```swift
// WRONG -- glass sampling glass creates artifacts
VStack {
    Text("Hello").glassEffect()
}
.glassEffect()

// RIGHT -- use GlassEffectContainer to group glass elements
GlassEffectContainer(spacing: 20) {
    Button("A") { }.glassEffect(.regular.interactive())
    Button("B") { }.glassEffect(.regular.interactive())
}
```

### 10. .task leaking work (no auto-cancel)

```swift
// WRONG -- Task leaks if view disappears mid-flight
.onAppear {
    Task { await heavyWork() }
}

// RIGHT -- auto-cancels on disappear
.task {
    await heavyWork()
}
```

### 11. Background thread assumption in .task

```swift
// WRONG -- .task inline inherits MainActor, NOT background
.task {
    await heavyComputation()  // Runs on MainActor!
}

// RIGHT -- extract to @Sendable func for background execution
.task(doHeavyWork)

@Sendable func doHeavyWork() async {
    await heavyComputation()  // Runs off MainActor
}
```

---

## Known Gotchas

- **`.task` inherits MainActor by default** when declared inline in `body`. To run on a background thread, extract to a `@Sendable func` declared outside `body` and pass as `.task(backgroundWork)`.
- **`@StateObject` forces entire view to @MainActor**, preventing background `.task` execution even with external `@Sendable` functions. Migrate to `@State` + `@Observable`.
- **`onAppear` fires on EVERY tab switch** in `TabView`. Use a `onceAppear` modifier (with `@State private var hasAppeared = false` guard) for one-time work.
- **`onAppear` fires abnormally** when `NavigationStack` is inside conditional branches (`if/else`) and the condition toggles while navigated deep.
- **Sheet Z-order bug (iOS 26)**: Backgrounds may render above sheets using `.presentationDetents`. Fix: add `.presentationBackground(Color(.systemBackground))` to the sheet.
- **`Button(role: .close)` does NOT auto-dismiss**. You must still call `dismiss()` explicitly in the action closure.
- **Sheets get Liquid Glass automatically** in iOS 26. Custom `.presentationBackground()` can fight the system glass styling -- avoid unless intentionally overriding.
- **`@Bindable` must be declared at the top of `body`**, not inside `VStack` or other containers. Nested declaration causes linker errors.
- **Timers do not fire when app is backgrounded**. Use `scenePhase` `.onChange` to compute elapsed time on return to `.active`.
- **`Task.sleep` is cooperative**: it throws `CancellationError` when cancelled, but your loop must check `Task.isCancelled` or `try` the sleep to honor cancellation.
- **NavigationPath type safety**: appending a type with no matching `.navigationDestination(for:)` crashes at runtime, not compile time.
- **`withMutation` / `access` in @Observable**: the macro generates these -- avoid naming stored properties `access` or `withMutation` to prevent conflicts.
- **iOS 26 Liquid Glass known issues**: `.interactive()` with `RoundedRectangle` sometimes renders as Capsule; `.glassProminent` has artifacts with `.circle`; `Menu` in `GlassEffectContainer` can break morphing.
- **Permission dialogs and sheets conflict**: system permission alerts (microphone, notifications) can interfere with sheet presentation timing. Request permissions before presenting sheets.

---

## Quick Checklist

Before submitting SwiftUI code, verify:

- [ ] **@Observable, not ObservableObject** -- all ViewModels use `@Observable` macro, not `ObservableObject` protocol
- [ ] **@MainActor on all ViewModels** -- every `@Observable` class driving UI has `@MainActor`
- [ ] **@State for owned ViewModels** -- views use `@State private var vm = ViewModel()`, not `@StateObject`
- [ ] **@Bindable for environment bindings** -- when creating bindings from `@Environment(Type.self)`, declare `@Bindable var x = env` at top of `body`
- [ ] **No multiple .sheet modifiers** -- use enum-based `.sheet(item:)` for multiple sheets on one view
- [ ] **Environment re-injected into sheets** -- `.environment(obj)` applied to sheet content for any custom `@Observable` types
- [ ] **NavigationStack, not NavigationView** -- all navigation uses `NavigationStack` with typed routes
- [ ] **.task for async work** -- not `onAppear { Task { } }` -- ensures auto-cancellation on disappear

---

### References

- [SwiftUI Framework](https://developer.apple.com/documentation/swiftui)
- [Applying Liquid Glass to Custom Views](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views)
- [glassEffect(_:in:)](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:))
- [Managing Model Data in Your App](https://developer.apple.com/documentation/SwiftUI/Managing-model-data-in-your-app)
- [NavigationPath](https://developer.apple.com/documentation/swiftui/navigationpath)
- [Bindable](https://developer.apple.com/documentation/swiftui/bindable)
- [TimelineView](https://developer.apple.com/documentation/swiftui/timelineview)
- [dismiss](https://developer.apple.com/documentation/swiftui/environmentvalues/dismiss)
- [Build a SwiftUI App with the New Design (WWDC25 Session 323)](https://developer.apple.com/videos/play/wwdc2025/323/)
- [Meet Liquid Glass (WWDC25 Session 219)](https://developer.apple.com/videos/play/wwdc2025/219/)
