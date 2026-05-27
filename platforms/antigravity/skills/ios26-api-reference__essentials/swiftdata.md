# SwiftData — iOS 26 Essentials

> For deep reference: load `reference/swiftdata-reference.md`
>
> Sources: Apple Developer Documentation, WWDC 2025 Session 291, WWDC 2024 Session 10137, WWDC 2023 Sessions 10187/10195/10196, fatbobman.com concurrency deep-dive.

---

## Correct Patterns (vs Common Mistakes)

| # | Topic | Wrong | Right | Why |
|---|-------|-------|-------|-----|
| 1 | **ModelActor creation** | `Task { let actor = MyActor(modelContainer:) }` from a SwiftUI view | `Task.detached { let actor = MyActor(modelContainer:) }` | `Task` inherits MainActor isolation; `ModelContext` init checks dispatch queue and becomes a main context if on main thread |
| 2 | **Passing models between actors** | `await bgActor.process(session)` | `await bgActor.process(session.persistentModelID)` then re-fetch | `@Model` instances are NOT Sendable; pass `PersistentIdentifier` or DTOs |
| 3 | **@Query runs on MainActor** | Querying 10k+ rows with `@Query` directly | Use `fetchLimit`, `@Attribute(.indexed)`, or fetch in `@ModelActor` and publish | `@Query` blocks the main thread for every re-fetch |
| 4 | **@Model requires explicit init** | Omitting `init` and relying on synthesis | Always write an explicit `init` | The `@Model` macro cannot synthesize initializers |
| 5 | **Relationship inverse** | Declaring `@Relationship` on one side only | Add `inverse:` on BOTH sides | Missing inverse causes "Expected only Arrays for Relationships" crash or silent broken updates |
| 6 | **Context per actor** | Sharing `ModelContext` across actors | Create a new `ModelContext(container)` per actor | `ModelContext` is NOT Sendable and not thread-safe |
| 7 | **Batch delete requires save** | `context.delete(model:where:)` without `save()` | Always call `try context.save()` after batch delete | Batch deletion only applies to the database after `save()` |
| 8 | **CloudKit + .unique** | Using `@Attribute(.unique)` with CloudKit sync | Remove `.unique`; give all properties defaults; make relationships optional | CloudKit cannot enforce atomic uniqueness across devices |
| 9 | **Sheet modelContext** | Presenting a sheet and expecting it inherits the parent modelContext | Explicitly pass `.modelContainer()` or `.environment(\.modelContext)` on the sheet | Sheets may not inherit the parent's model context |
| 10 | **Historical schema mutation** | Modifying a released `VersionedSchema` | Never change released schemas; add a new version | Causes error 134504: "Cannot use staged migration with unknown model version" |
| 11 | **@Observable VM, not ObservableObject** | `class VM: ObservableObject` with `@Published` | `@Observable final class VM` with plain properties | SwiftData + iOS 26 pattern uses Swift Observation, not Combine |
| 12 | **Container lifetime** | Creating `ModelContainer` in a local scope and letting it deallocate | Store the container as a property (e.g., on the App struct) | Context crashes if its container is deallocated |
| 13 | **Codable struct filtering** | `#Predicate { $0.location.city == "NYC" }` on a Codable struct property | Store filterable values as top-level `@Model` properties | Codable struct properties are stored as JSON blobs; sorting works but filtering does NOT |
| 14 | **Enum predicates < iOS 26** | `#Predicate { $0.priority == .high }` on iOS 18 | Use raw value: `#Predicate { $0.priority.rawValue == "high" }` or wait for iOS 26 | Codable enum predicates only work in iOS 26+ |
| 15 | **Subclass predicate on parent property** | `@Query(filter: #Predicate<BusinessTrip> { $0.destination == "NYC" })` | `@Query(filter: #Predicate<Trip> { $0 is BusinessTrip && $0.destination == "NYC" })` | Querying subclass with parent-defined property filter crashes in iOS 26 |

---

## Crash Prevention Patterns

### 1. ModelActor MainActor Trap

```swift
// WRONG — Task inherits MainActor from SwiftUI view
struct MyView: View {
    func doWork() {
        Task {
            let actor = DataImporter(modelContainer: container)
            // actor.modelContext is a MAIN context — NOT background!
        }
    }
}

// RIGHT — Task.detached forces background thread
struct MyView: View {
    func doWork() {
        Task.detached {
            let actor = DataImporter(modelContainer: container)
            // actor.modelContext is truly a background context
            try await actor.importData()
        }
    }
}
```

### 2. Actor Boundary Crossing

```swift
// WRONG — sending @Model instance across actors
await backgroundActor.process(session)  // Compiler error: not Sendable

// RIGHT — send PersistentIdentifier, re-fetch on the other side
let sessionID = session.persistentModelID
await backgroundActor.process(sessionID)

// Inside the actor:
func process(_ id: PersistentIdentifier) throws {
    let session = try modelContext.model(for: id) as! Session
}
```

### 3. Missing Relationship Inverse

```swift
// WRONG — crashes with "Expected only Arrays for Relationships"
@Model final class Session {
    @Relationship(deleteRule: .cascade)
    var notes: [Note]?
}

// RIGHT — inverse on BOTH sides
@Model final class Session {
    @Relationship(deleteRule: .cascade, inverse: \Note.session)
    var notes: [Note]?
}
@Model final class Note {
    var session: Session?
}
```

### 4. Background Context from View's modelContext

```swift
// WRONG — using @Environment context in a background Task
@Environment(\.modelContext) private var context
func importData() {
    Task {
        context.insert(Item(title: "X"))  // context is MainActor-isolated!
    }
}

// RIGHT — create a new background context
func importData() {
    Task.detached {
        let bgContext = ModelContext(container)
        bgContext.insert(Item(title: "X"))
        try bgContext.save()
    }
}
```

### 5. Container Deallocation

```swift
// WRONG — container is local, gets deallocated
func bad() {
    let container = try? ModelContainer(for: Session.self)
    let context = ModelContext(container!)
    // container goes out of scope — context may crash
}

// RIGHT — keep container alive as a stored property
class DataManager {
    private let container: ModelContainer
    private let context: ModelContext
    init() throws {
        self.container = try ModelContainer(for: Session.self)
        self.context = ModelContext(container)
    }
}
```

### 6. Editing @Bindable Unique Field

```swift
// CRASH — setting a .unique field to a value that exists on another record
@Bindable var contact = existingContact
contact.email = "already-taken@example.com"  // EXC_BAD_ACCESS

// FIX — validate uniqueness before assignment
func updateEmail(_ newEmail: String) throws {
    let existing = try context.fetch(
        FetchDescriptor<Contact>(predicate: #Predicate { $0.email == newEmail })
    )
    guard existing.isEmpty else { throw DuplicateError() }
    contact.email = newEmail
}
```

---

## Known Gotchas

- **`@Model` classes only** — structs are never valid for SwiftData models
- **`#Predicate` runtime crashes** — a predicate can compile but crash at runtime if it cannot be converted to SQL. Always test predicates with real data.
- **`hasPrefix`/`hasSuffix` in predicates** — use `starts(with:)` instead; `hasPrefix` fails
- **`lowercased().contains()` in predicates** — use `localizedStandardContains()` instead
- **Custom functions in predicates** — `#Predicate { myFunc($0) }` does NOT work
- **Closures in predicates** — `$0.tags.contains(where: { ... })` does NOT work; use `$0.tags.contains("value")` for simple checks
- **Enumerate throws if context is dirty** — save before calling `context.enumerate()` or set `allowEscapingMutations: true`
- **`@ModelActor` property updates pre-iOS 26** — mutations via `@ModelActor` did not refresh `@Query` views (inserts/deletes worked, property updates did not). Fixed in iOS 26.
- **Cascade delete not always reliable** — verify cascade behavior in tests. If cascade fails, delete children manually before the parent.
- **CloudKit requires ALL properties to have defaults or be optional** — missing defaults cause sync failures
- **CloudKit: no `.deny` delete rule, no `.unique`, no custom migration** — all forbidden once CloudKit sync is enabled
- **Concurrent migration crash** — if the app and a widget extension migrate the store simultaneously, use file coordination or serial initialization
- **`@Transient` data is NOT synced by CloudKit** — do not mark important fields `@Transient` if you use sync
- **Composite unique constraints** — SwiftData does not support them natively; use a composite key string workaround (`"userId:teamId"`)
- **Set support requires iOS 26** — `Set<String>` properties only work on iOS 26+

---

## Quick Checklist

Before shipping SwiftData code, verify:

- [ ] **Every `@Model` has an explicit `init`** — the macro does not synthesize one
- [ ] **Every `@Relationship` has `inverse:` on both sides** — missing inverse = crash or silent corruption
- [ ] **`@ModelActor` is created inside `Task.detached`** (not `Task`) when called from a MainActor context
- [ ] **`PersistentIdentifier` or DTOs** are used to cross actor boundaries — never `@Model` instances
- [ ] **`context.save()` is called** after batch delete and after background mutations
- [ ] **`@Attribute(.indexed)` is set** on properties used in predicates or sort descriptors
- [ ] **Cascade delete is tested** with an in-memory container in XCTest
- [ ] **CloudKit models** have all-default or optional properties, no `.unique`, no `.deny`, no custom migration

---

## Sendability Quick Reference

| Type | Sendable? | Can Cross Actor Boundaries? |
|------|-----------|---------------------------|
| `ModelContainer` | Yes | Yes — pass directly |
| `PersistentIdentifier` | Yes | Yes — use `model.persistentModelID` |
| `Predicate<T>` | Yes | Yes |
| `FetchDescriptor<T>` | Yes | Yes |
| `@Model` instances | **No** | **No** — never send between actors |
| `ModelContext` | **No** | **No** — create new one per actor |

---

## iOS 26 New Features (Quick Summary)

| Feature | Description |
|---------|-------------|
| **Class inheritance** | `@Model class Parent` + `@Model class Child: Parent`; deep/shallow queries |
| **Codable enum predicates** | `#Predicate { $0.type == .business }` now works |
| **Set<T> support** | `Set<String>`, `Set<Int>` as model properties |
| **AttributedString** | Supported as a model property type |
| **Enhanced history API** | `HistoryDescriptor` with `sortBy` and `fetchLimit` |
| **@ModelActor bug fix** | Property updates now properly refresh `@Query` views |
| **Type predicates** | `#Predicate<Trip> { $0 is BusinessTrip }` |
| **#Index macro** | Compound indexes: `#Index<Session>([\.startTime], [\.isCompleted, \.startTime])` |

---

### References

- [SwiftData Documentation](https://developer.apple.com/documentation/swiftdata)
- [WWDC 2025: SwiftData Inheritance and Schema Migration (Session 291)](https://developer.apple.com/videos/play/wwdc2025/291/)
- [WWDC 2024: What's New in SwiftData (Session 10137)](https://developer.apple.com/videos/play/wwdc2024/10137/)
- [WWDC 2023: Meet SwiftData (Session 10187)](https://developer.apple.com/videos/play/wwdc2023/10187/)
- [WWDC 2023: Model Your Schema (Session 10195)](https://developer.apple.com/videos/play/wwdc2023/10195/)
- [WWDC 2023: Dive Deeper (Session 10196)](https://developer.apple.com/videos/play/wwdc2023/10196/)
- [SwiftData Updates](https://developer.apple.com/documentation/updates/swiftdata)
- [Concurrent Programming in SwiftData (fatbobman.com)](https://fatbobman.com/en/posts/concurret-programming-in-swiftdata/)
- [Key Considerations Before Using SwiftData (fatbobman.com)](https://fatbobman.com/en/posts/key-considerations-before-using-swiftdata/)
