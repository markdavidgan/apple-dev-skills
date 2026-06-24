# SwiftData — Comprehensive Reference

> Full API reference for SwiftData on iOS 26. For quick patterns, use essentials/swiftdata.md instead.
> Sources: Apple Developer Documentation, WWDC sessions

---

## Table of Contents

1. [Framework Overview](#1-framework-overview)
2. [@Model Macro](#2-model-macro)
3. [@Attribute Options](#3-attribute-options)
4. [@Relationship and Delete Rules](#4-relationship-and-delete-rules)
5. [ModelContainer and ModelConfiguration](#5-modelcontainer-and-modelconfiguration)
6. [ModelContext](#6-modelcontext)
7. [@Query Lifecycle](#7-query-lifecycle)
8. [FetchDescriptor](#8-fetchdescriptor)
9. [#Predicate Building](#9-predicate-building)
10. [Thread Safety and Actor Isolation](#10-thread-safety-and-actor-isolation)
11. [ModelActor for Background Work](#11-modelactor-for-background-work)
12. [Cascade Delete Patterns](#12-cascade-delete-patterns)
13. [Migration: Lightweight vs Custom](#13-migration-lightweight-vs-custom)
14. [Unique Constraints and Conflict Resolution](#14-unique-constraints-and-conflict-resolution)
15. [In-Memory Containers for Testing](#15-in-memory-containers-for-testing)
16. [CloudKit Sync Considerations](#16-cloudkit-sync-considerations)
17. [Performance: Batch Operations and Prefetching](#17-performance-batch-operations-and-prefetching)
18. [iOS 26 New Features](#18-ios-26-new-features)
19. [Common Crashes and Fixes](#19-common-crashes-and-fixes)
20. [Complete Architecture Example](#20-complete-architecture-example)

---

## 1. Framework Overview

SwiftData is Apple's native persistence framework, built on top of Core Data's storage engine but with a Swift-native API surface. It provides:

- **Type-safe** data modeling via the `@Model` macro
- **Automatic** change tracking and observation
- **Swift-native** query syntax with `#Predicate`
- **Actor-aware** concurrency with `@ModelActor`
- **CloudKit** synchronization (automatic, with constraints)
- **History tracking** via persistent history tokens

**Performance hierarchy:** SQLite direct > Core Data > SwiftData. The abstraction cost is acceptable for typical mobile/desktop apps.

### Key Types

| Type | Role | Sendable? |
|------|------|-----------|
| `@Model` class | Persistent model definition | No |
| `ModelContainer` | Manages schema + storage configuration | Yes |
| `ModelContext` | Bridge between models and persistent store | No |
| `@Query` | SwiftUI property wrapper for automatic fetching | N/A (view-bound) |
| `FetchDescriptor` | Configurable fetch request | Yes |
| `#Predicate` | Type-safe query filter | Yes |
| `PersistentIdentifier` | Unique model identity token | Yes |
| `@ModelActor` | Actor with built-in context for background work | N/A (actor) |
| `VersionedSchema` | Schema version snapshot for migrations | N/A |
| `SchemaMigrationPlan` | Ordered migration stages | N/A |

### Sendability Rules (Critical)

| Type | Can Cross Actor Boundaries? |
|------|---------------------------|
| `ModelContainer` | Yes -- Sendable |
| `PersistentIdentifier` | Yes -- Sendable |
| `@Model` instances | **No** -- not Sendable, not thread-safe |
| `ModelContext` | **No** -- must stay on creating actor |
| `Predicate<T>` | Yes -- Sendable |
| `FetchDescriptor<T>` | Yes -- Sendable |

---

## 2. @Model Macro

The `@Model` macro transforms a Swift class into a SwiftData persistent model.

### Requirements

1. Must be a `final class` (or non-final `class` if using iOS 26 inheritance)
2. Must have an explicit `init` -- the macro cannot synthesize one
3. All stored properties must have default values or be set in `init`
4. Only classes are supported -- **structs are never valid**

### Basic Model

```swift
import SwiftData

@Model
final class Task {
    @Attribute(.unique) var id: UUID
    var title: String
    var isCompleted: Bool
    var createdAt: Date
    var dueDate: Date?
    var priority: Int
    var tags: [String]

    init(
        id: UUID = UUID(),
        title: String,
        isCompleted: Bool = false,
        createdAt: Date = Date(),
        dueDate: Date? = nil,
        priority: Int = 0,
        tags: [String] = []
    ) {
        self.id = id
        self.title = title
        self.isCompleted = isCompleted
        self.createdAt = createdAt
        self.dueDate = dueDate
        self.priority = priority
        self.tags = tags
    }
}
```

### Supported Property Types

| Category | Types |
|----------|-------|
| Primitives | `String`, `Int`, `Double`, `Float`, `Bool`, `Date`, `Data`, `UUID`, `URL` |
| Optionals | Any of the above as `T?` |
| Collections | `[String]`, `[Int]`, etc. (arrays of primitives) |
| Sets (iOS 26+) | `Set<String>`, `Set<Int>`, etc. |
| Codable enums | `enum Status: String, Codable` -- queryable in iOS 26 |
| Codable structs | `struct Location: Codable` -- stored as JSON blob |
| Relationships | Other `@Model` classes via `@Relationship` |

### Transient Properties

Properties excluded from persistence:

```swift
@Model
final class Task {
    var title: String
    
    @Transient
    var temporaryCache: [String: Any] = [:]
    
    init(title: String) {
        self.title = title
    }
}
```

### Computed Properties

Computed properties are never persisted. Use them freely:

```swift
@Model
final class Session {
    var startTime: Date
    var endTime: Date?
    
    var actualDuration: TimeInterval? {
        guard let endTime else { return nil }
        return endTime.timeIntervalSince(startTime)
    }
}
```

### Property Validation

Use `didSet` for validation (works with SwiftData):

```swift
@Model
final class Task {
    var priority: Int {
        didSet { priority = max(0, min(3, priority)) }
    }
    
    init(priority: Int = 0) {
        self.priority = max(0, min(3, priority))
    }
}
```

### Model Identity

Every `@Model` instance has a system-managed `persistentModelID` of type `PersistentIdentifier`. This is Sendable and can safely cross actor boundaries.

```swift
let taskID = task.persistentModelID  // PersistentIdentifier -- Sendable

// Fetch by ID on another actor
let task = try context.model(for: taskID) as! Task
```

---

## 3. @Attribute Options

The `@Attribute` macro controls how properties are stored and indexed.

### Options Reference

| Option | Effect | CloudKit Safe? |
|--------|--------|---------------|
| `.unique` | Enforces uniqueness; upserts on conflict | **No** |
| `.indexed` | Creates database index for fast queries | Yes |
| `.externalStorage` | Stores large data outside main SQLite table | Yes |
| `.preservesValueOnDeletion` | Keeps value in persistent history after delete | Yes |
| `.spotlight` | Indexes property for Spotlight search | Yes |
| `.allowsCloudEncryption` | Enables end-to-end CloudKit encryption | Yes |
| `.ephemeral` | Not persisted (similar to `@Transient`) | N/A |
| `originalName:` | Maps to a different column name (for migration renames) | Yes |

### Usage Examples

```swift
@Model
final class User {
    @Attribute(.unique)
    var email: String
    
    @Attribute(.indexed)
    var username: String
    
    @Attribute(.externalStorage)
    var profileImage: Data?
    
    @Attribute(.preservesValueOnDeletion)
    var userID: UUID
    
    @Attribute(.spotlight)
    var searchableContent: String
    
    @Attribute(originalName: "fullName")
    var displayName: String
    
    init(email: String, username: String, displayName: String, userID: UUID = UUID()) {
        self.email = email
        self.username = username
        self.displayName = displayName
        self.userID = userID
        self.searchableContent = "\(displayName) \(email)"
    }
}
```

### Unique Constraint Behavior

When inserting a model with a `.unique` property that collides with an existing record, SwiftData performs an **upsert** -- it updates the existing record's other properties rather than failing:

```swift
@Model
final class Contact {
    @Attribute(.unique) var email: String
    var name: String
    
    init(email: String, name: String) {
        self.email = email
        self.name = name
    }
}

// First insert
context.insert(Contact(email: "a@b.com", name: "Alice"))

// Second insert with same email -- UPDATES existing record
context.insert(Contact(email: "a@b.com", name: "Alice Updated"))
// Result: one record with name "Alice Updated"
```

**Warning:** Editing a `@Bindable` model and setting a `.unique` property to a value that already exists on a *different* record can crash.

### Compound Index (iOS 26)

Use the `#Index` macro for compound indexes:

```swift
@Model
final class Session {
    #Index<Session>([\.startTime], [\.isCompleted, \.startTime])
    
    @Attribute(.unique) var id: UUID
    var startTime: Date
    var isCompleted: Bool
    // ...
}
```

### Composite Uniqueness Workaround

SwiftData does not support composite unique constraints. Use a computed key:

```swift
@Model
final class Membership {
    @Attribute(.unique)
    var compositeKey: String  // "userId:teamId"
    
    var userId: UUID
    var teamId: UUID
    
    init(userId: UUID, teamId: UUID) {
        self.userId = userId
        self.teamId = teamId
        self.compositeKey = "\(userId):\(teamId)"
    }
}
```

---

## 4. @Relationship and Delete Rules

### Delete Rules

| Rule | Behavior | CloudKit Safe? |
|------|----------|---------------|
| `.cascade` | Deleting parent deletes all children | Yes |
| `.nullify` (default) | Deleting parent sets child reference to nil | Yes |
| `.deny` | Prevents deletion if children exist | **No** |
| `.noAction` | Leaves dangling references (advanced use) | Yes |

### Inverse Relationships: MANDATORY

**Critical Rule:** Always specify `inverse:` on both sides. Missing inverse relationships cause crashes ("Expected only Arrays for Relationships") or silently break bidirectional updates.

```swift
// CORRECT: Both sides specify inverse
@Model
final class Project {
    @Relationship(deleteRule: .cascade, inverse: \Task.project)
    var tasks: [Task]?
    
    init(name: String) { self.name = name }
    var name: String
}

@Model
final class Task {
    @Relationship(deleteRule: .nullify, inverse: \Project.tasks)
    var project: Project?
    
    init(title: String) { self.title = title }
    var title: String
}
```

### Relationship Types

**One-to-Many:**
```swift
@Relationship(deleteRule: .cascade, inverse: \Task.project)
var tasks: [Task]?
```

**One-to-One:**
```swift
@Relationship(deleteRule: .nullify, inverse: \Profile.user)
var profile: Profile?
```

**Many-to-Many:**
```swift
// Both sides are arrays with inverse pointing to each other
@Relationship(deleteRule: .nullify, inverse: \Tag.tasks)
var tags: [Tag]?

// On Tag:
@Relationship(deleteRule: .nullify, inverse: \Task.tags)
var tasks: [Task]?
```

**Self-Referencing (Tree):**
```swift
@Model
final class Task {
    @Relationship(deleteRule: .nullify, inverse: \Task.subtasks)
    var parent: Task?
    
    @Relationship(deleteRule: .cascade, inverse: \Task.parent)
    var subtasks: [Task]?
}
```

### Relationship Array Initialization

Always initialize relationship arrays as optional with nil default or empty array:

```swift
@Relationship(deleteRule: .cascade, inverse: \Note.session)
var notes: [Note]?  // nil by default
```

### Known Issue: Cascade Delete Not Always Working

There are reports of cascade deletes not firing in certain configurations. Verify cascade behavior in tests. If cascade fails, use manual deletion:

```swift
func deleteProjectWithChildren(_ project: Project) {
    if let tasks = project.tasks {
        for task in tasks {
            context.delete(task)
        }
    }
    context.delete(project)
    try? context.save()
}
```

---

## 5. ModelContainer and ModelConfiguration

### Basic Setup

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Task.self)
    }
}
```

### Custom Configuration

```swift
let config = ModelConfiguration(
    "MyStore",
    schema: Schema([Task.self, Project.self]),
    isStoredInMemoryOnly: false,
    allowsSave: true,
    groupContainer: .identifier("group.com.myapp.shared"),
    cloudKitDatabase: .automatic
)

let container = try ModelContainer(
    for: Task.self, Project.self,
    configurations: config
)
```

### ModelConfiguration Properties

| Property | Type | Purpose |
|----------|------|---------|
| `isStoredInMemoryOnly` | `Bool` | Ephemeral storage (for testing/previews) |
| `allowsSave` | `Bool` | Read-only mode when `false` |
| `groupContainer` | `GroupContainer` | App Group for shared storage |
| `cloudKitDatabase` | `CloudKitDatabase` | `.automatic`, `.private(String)`, or `.none` |
| `url` | `URL` | Custom file path for the store |

### Multiple Configurations

```swift
let recipeConfig = ModelConfiguration(
    "Recipes",
    schema: Schema([Recipe.self]),
    cloudKitDatabase: .automatic
)

let userConfig = ModelConfiguration(
    "UserData",
    schema: Schema([UserProfile.self]),
    cloudKitDatabase: .none  // Local only
)

let container = try ModelContainer(
    for: Recipe.self, UserProfile.self,
    configurations: recipeConfig, userConfig
)
```

### App Group Shared Container

For sharing data between app and widget extensions:

```swift
let config = ModelConfiguration(
    groupContainer: .identifier("group.com.myapp.shared")
)
let container = try ModelContainer(for: Task.self, configurations: config)
```

**Note:** When using `ModelConfiguration` without a store URL and the app has an App Group entitlement, SwiftData automatically uses the App Group container URL as the parent folder.

### Container with Migration Plan

```swift
let schema = Schema(versionedSchema: SchemaV3.self)
let config = ModelConfiguration(schema: schema)

let container = try ModelContainer(
    for: schema,
    configurations: [config],
    migrationPlan: MigrationPlan.self
)
```

### Custom Data Stores (iOS 18+)

iOS 18 introduced support for fully custom data stores, allowing you to implement your own persistence backend while using the SwiftData API surface.

---

## 6. ModelContext

### Getting a Context

```swift
// From SwiftUI Environment (MainActor)
@Environment(\.modelContext) private var context

// From container (any actor)
let context = ModelContext(container)

// From container's main context
let mainContext = container.mainContext  // MainActor-isolated
```

### Context Threading Rules

| Rule | Violation Result |
|------|------------------|
| Main context (from Environment) is MainActor-isolated | Crash: "Main actor-isolated" |
| Background context must stay on creating actor | Crash: "Sending non-Sendable" |
| Never share context between actors | Crash: data race |
| Save after mutations | Silent data loss |

### CRUD Operations

**Insert:**
```swift
let task = Task(title: "New Task")
context.insert(task)
try context.save()
```

**Update (just mutate -- observed automatically):**
```swift
task.isCompleted = true
task.completedAt = Date()
try context.save()
```

**Delete single:**
```swift
context.delete(task)
try context.save()
```

**Batch delete:**
```swift
try context.delete(
    model: Task.self,
    where: #Predicate { $0.isCompleted }
)
try context.save()
```

**Note:** Batch deletion only applies to the database after `save()`, unlike standard single-object deletion.

**Fetch:**
```swift
let allTasks = try context.fetch(FetchDescriptor<Task>())
let count = try context.fetchCount(FetchDescriptor<Task>())
```

### Autosave Behavior

By default, `ModelContext` auto-saves at opportune times. Disable for explicit control:

```swift
let context = ModelContext(container)
context.autosaveEnabled = false
// Now you MUST call context.save() manually
```

### Undo/Redo

```swift
context.undoManager = UndoManager()

context.undoManager?.beginUndoGrouping()
task.title = "Updated"
task.priority = 1
context.undoManager?.endUndoGrouping()

context.undoManager?.undo()
```

### Enumerate (Memory-Efficient Batch Processing)

For processing large datasets without loading everything into memory:

```swift
let descriptor = FetchDescriptor<Task>(
    sortBy: [SortDescriptor(\.createdAt)]
)

try context.enumerate(descriptor, batchSize: 1000) { task in
    task.processed = true
}

try context.save()
```

**Parameters:**
- `batchSize` -- Default 5000. Lower values save memory but increase I/O
- `allowEscapingMutations` -- Default `false`. When `false`, enumerate throws if the context is dirty (has unsaved mutations) to prevent memory issues during traversal. Set to `true` if you intentionally mutate during enumeration

**Warning:** If `allowEscapingMutations` is `false` (default) and the context has pending changes, enumerate throws. Save before enumerating, or set the flag to `true`.

### Merge Policies

```swift
let context = ModelContext(container)
context.mergePolicy = .mergeByPropertyObjectTrump  // Local wins (default)
context.mergePolicy = .mergeByPropertyStoreTrump   // Store/remote wins
context.mergePolicy = .error                       // Throw error on conflict
```

### Debugging Context

```swift
// Enable SQL debug logging in Xcode Scheme > Arguments:
// -com.apple.coredata.swiftdata.debug 1

func logContextInfo(_ context: ModelContext) {
    print("Has changes: \(context.hasChanges)")
    print("Inserted: \(context.insertedModelsArray.count)")
    print("Deleted: \(context.deletedModelsArray.count)")
}
```

---

## 7. @Query Lifecycle

### How @Query Works

`@Query` is a SwiftUI property wrapper (`DynamicProperty`) that:

1. Performs an initial fetch when the view appears
2. **Automatically re-fetches** when the underlying data changes (observed via ModelContext notifications)
3. Runs on the **MainActor** (it uses the view's `modelContext` from the environment)
4. Triggers view updates when results change

### API Signatures

```swift
// Sort by single key path
@Query(sort: \Task.createdAt, order: .reverse)
private var tasks: [Task]

// Filter + sort
@Query(
    filter: #Predicate<Task> { !$0.isCompleted },
    sort: [SortDescriptor(\.priority, order: .reverse), SortDescriptor(\.createdAt)]
)
private var activeTasks: [Task]

// With animation
@Query(sort: \Task.createdAt, animation: .default)
private var tasks: [Task]

// Using FetchDescriptor (most control)
@Query private var tasks: [Task]
init() {
    var descriptor = FetchDescriptor<Task>()
    descriptor.fetchLimit = 50
    descriptor.relationshipKeyPathsForPrefetching = [\.project]
    _tasks = Query(fetchDescriptor: descriptor)
}
```

### Dynamic Query (Change at Runtime)

```swift
struct TaskListView: View {
    @Query private var tasks: [Task]
    
    init(filter: TaskFilter) {
        let predicate: Predicate<Task> = switch filter {
        case .all: #Predicate { _ in true }
        case .active: #Predicate { !$0.isCompleted }
        case .completed: #Predicate { $0.isCompleted }
        }
        _tasks = Query(filter: predicate, sort: \.createdAt, order: .reverse)
    }
}
```

### Updating Query at Runtime

```swift
struct SearchableList: View {
    @State private var searchText = ""
    @Query private var tasks: [Task]
    
    var body: some View {
        List(tasks) { TaskRow(task: $0) }
            .searchable(text: $searchText)
            .onChange(of: searchText) { _, newValue in
                if newValue.isEmpty {
                    _tasks = Query(sort: \.createdAt)
                } else {
                    _tasks = Query(
                        filter: #Predicate { $0.title.localizedStandardContains(newValue) },
                        sort: \.createdAt
                    )
                }
            }
    }
}
```

### When @Query Re-Fetches

- On initial view appearance
- When the `ModelContext` saves changes (insert, update, delete)
- When the query parameters are reassigned (`_tasks = Query(...)`)
- When CloudKit sync delivers remote changes (sometimes delayed -- see CloudKit section)

### Performance Warning

`@Query` runs on the MainActor. For large datasets, this blocks the UI. Mitigations:

- Use `fetchLimit` to cap results
- Use `@Attribute(.indexed)` on filtered/sorted properties
- For very large datasets, fetch in background via `@ModelActor` and publish results

---

## 8. FetchDescriptor

### Complete API

```swift
struct FetchDescriptor<T: PersistentModel> {
    var predicate: Predicate<T>?
    var sortBy: [SortDescriptor<T>]
    var fetchLimit: Int?
    var fetchOffset: Int?
    var includePendingChanges: Bool        // Include unsaved changes in results
    var propertiesToFetch: [PartialKeyPath<T>]
    var relationshipKeyPathsForPrefetching: [PartialKeyPath<T>]
}
```

### Basic Usage

```swift
// All tasks, unsorted
let all = try context.fetch(FetchDescriptor<Task>())

// Filtered + sorted + limited
var descriptor = FetchDescriptor<Task>(
    predicate: #Predicate { !$0.isCompleted },
    sortBy: [SortDescriptor(\.priority, order: .reverse)]
)
descriptor.fetchLimit = 100
let topTasks = try context.fetch(descriptor)

// Count only (no objects loaded)
let count = try context.fetchCount(descriptor)
```

### Pagination

```swift
func loadPage(page: Int, pageSize: Int = 20) throws -> [Task] {
    var descriptor = FetchDescriptor<Task>(
        sortBy: [SortDescriptor(\.createdAt, order: .reverse)]
    )
    descriptor.fetchLimit = pageSize
    descriptor.fetchOffset = page * pageSize
    return try context.fetch(descriptor)
}
```

### Selective Property Fetching

Fetch only the properties you need (reduces memory):

```swift
var descriptor = FetchDescriptor<Task>()
descriptor.propertiesToFetch = [\.title, \.createdAt]
let tasks = try context.fetch(descriptor)
// Other properties are lazy-loaded on access
```

### Relationship Prefetching

Prevent N+1 query problems:

```swift
var descriptor = FetchDescriptor<Project>()
descriptor.relationshipKeyPathsForPrefetching = [\.tasks, \.owner]
let projects = try context.fetch(descriptor)

// Safe -- relationships already loaded
for project in projects {
    print("\(project.name): \(project.tasks?.count ?? 0) tasks")
}
```

**Without prefetching:** Each relationship access triggers a separate query. With 100 projects, that is 100+ additional queries.

---

## 9. #Predicate Building

### Supported Operations

```swift
// Equality
#Predicate<Task> { $0.priority == 1 }
#Predicate<Task> { $0.title == "Exactly This" }

// Comparison
#Predicate<Task> { $0.priority > 1 }
#Predicate<Task> { $0.priority >= 1 && $0.priority <= 3 }

// Boolean
#Predicate<Task> { !$0.isCompleted }
#Predicate<Task> { $0.isCompleted && $0.priority > 1 }
#Predicate<Task> { $0.priority == 3 || $0.isCompleted }

// String contains (case-insensitive, locale-aware)
#Predicate<Task> { $0.title.localizedStandardContains("search") }

// String prefix
#Predicate<Task> { $0.title.starts(with: "Project:") }

// Optional handling
#Predicate<Task> { $0.dueDate != nil }
#Predicate<Task> { $0.dueDate! < Date.now }  // Safe in predicate context
#Predicate<Task> { ($0.dueDate ?? Date.distantPast) > Date.now }

// Array operations
#Predicate<Task> { $0.tags.contains("urgent") }
#Predicate<Project> { $0.tasks.count > 5 }
#Predicate<Project> { !$0.tasks.isEmpty }
```

### Enum Predicates (iOS 26)

```swift
enum TaskPriority: Int, Codable { case low = 0, medium = 1, high = 2, urgent = 3 }

@Model final class Task {
    var priority: TaskPriority
}

// Works in iOS 26:
#Predicate<Task> { $0.priority == .high || $0.priority == .urgent }
```

### Type Predicates (iOS 26 -- Inheritance)

```swift
// Filter by subclass type
#Predicate<Trip> { $0 is BusinessTrip }
#Predicate<Trip> { $0 is PersonalTrip }

// Combine type + property filter
#Predicate<Trip> { $0 is BusinessTrip && $0.destination == "NYC" }
```

### Dynamic Predicate Building

```swift
func buildPredicate(
    search: String,
    showCompleted: Bool,
    minPriority: Int
) -> Predicate<Task> {
    #Predicate { task in
        let matchesSearch = search.isEmpty ||
            task.title.localizedStandardContains(search)
        let matchesCompletion = showCompleted || !task.isCompleted
        let matchesPriority = task.priority >= minPriority
        return matchesSearch && matchesCompletion && matchesPriority
    }
}
```

### What Does NOT Work in Predicates

```swift
// Custom functions
#Predicate<Task> { isImportant($0) }  // FAILS

// Closures with complex logic
#Predicate<Task> { $0.tags.contains(where: { $0 == "urgent" }) }  // FAILS

// String transformations
#Predicate<Task> { $0.title.uppercased().contains("URGENT") }  // FAILS

// hasPrefix / hasSuffix
#Predicate<Task> { $0.title.hasPrefix("A") }  // FAILS (use starts(with:))

// Arithmetic in some contexts
#Predicate<Task> { $0.priority + 1 > 2 }  // May fail at runtime

// Codable struct property filtering
// Properties within Codable types can sort but NOT filter
```

**Important:** Even if a `#Predicate` compiles, it may crash at runtime if it cannot be converted to SQL. Test predicates with real data.

### Workarounds for Limitations

```swift
// Pre-calculate filter values
let minPriority = 2
#Predicate<Task> { $0.priority > minPriority }  // OK

// Store computed values as properties
@Model final class Task {
    var priority: Int
    var isHighPriority: Bool  // Pre-computed for filtering
}

// Use localizedStandardContains instead of lowercased().contains()
#Predicate<Task> { $0.title.localizedStandardContains(search) }
```

---

## 10. Thread Safety and Actor Isolation

### The Core Rule

**SwiftData models and contexts are NOT thread-safe. They cannot cross actor boundaries.**

```
+------------------+     +-----------------------+
| MainActor        |     | Background Actor      |
|                  |     |                       |
| @Query results   |     | ModelContext(container)|
| view.modelContext|     | @ModelActor           |
| @Observable VM   |     |                       |
|                  |     |                       |
| Can share:       |     | Can share:            |
| - container  ----|---->| - container           |
| - PersistentID --|---->| - PersistentID        |
| - Sendable DTOs -|---->| - Sendable DTOs       |
+------------------+     +-----------------------+
```

### What Can Cross Actor Boundaries

| Type | Cross? | How |
|------|--------|-----|
| `ModelContainer` | Yes | Pass directly |
| `PersistentIdentifier` | Yes | Use `task.persistentModelID` |
| Sendable DTOs | Yes | Convert model to struct |
| `@Model` instances | **No** | Never send between actors |
| `ModelContext` | **No** | Create new one per actor |

### Passing Data Between Actors

```swift
// WRONG: Sending model
actor Background {
    func process(task: Task) { }  // Compiler error: Task is not Sendable
}

// RIGHT: Send PersistentIdentifier, fetch locally
actor Background {
    let container: ModelContainer
    
    func process(taskID: PersistentIdentifier) throws {
        let context = ModelContext(container)
        let task = try context.model(for: taskID) as! Task
        // Process safely
    }
}
```

### Sendable DTO Pattern

```swift
struct TaskDTO: Sendable {
    let id: UUID
    let title: String
    let isCompleted: Bool
}

extension Task {
    func toDTO() -> TaskDTO {
        TaskDTO(id: id, title: title, isCompleted: isCompleted)
    }
}

// Safe to send DTOs anywhere
let dtos = try await backgroundActor.fetchDTOs()  // Returns [TaskDTO]
```

### Swift 6 Strict Concurrency and @Model

With `SWIFT_STRICT_CONCURRENCY: complete` and `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`:

- `@Model` classes are MainActor-isolated by default
- Creating models from a background actor requires `nonisolated` annotation OR `await MainActor.run { }`
- `@ModelActor` actors cannot create `@MainActor`-isolated models without special handling

```swift
// Option 1: Make model nonisolated for cross-actor creation
@Model
nonisolated class SharedTask {
    var title: String
    init(title: String) { self.title = title }
}

// Option 2: Keep MainActor isolation, use await
@ModelActor
actor Importer {
    func importTasks() async {
        await MainActor.run {
            let task = Task(title: "New")  // Task is @MainActor
            // ...
        }
    }
}
```

---

## 11. ModelActor for Background Work

### Basic @ModelActor

```swift
@ModelActor
actor TaskRepository {
    func fetchAll() throws -> [Task] {
        try modelContext.fetch(FetchDescriptor<Task>())
    }
    
    func create(title: String) throws {
        let task = Task(title: title)
        modelContext.insert(task)
        try modelContext.save()
    }
    
    func deleteCompleted() throws {
        try modelContext.delete(model: Task.self, where: #Predicate { $0.isCompleted })
        try modelContext.save()
    }
}

// Usage
let repo = TaskRepository(modelContainer: container)
try await repo.create(title: "New Task")
```

### What @ModelActor Expands To

```swift
actor TaskRepository {
    nonisolated let modelExecutor: any ModelExecutor
    nonisolated let modelContainer: ModelContainer
    
    init(modelContainer: ModelContainer) {
        let context = ModelContext(modelContainer)
        self.modelExecutor = DefaultSerialModelExecutor(modelContext: context)
        self.modelContainer = modelContainer
    }
    
    var modelContext: ModelContext {
        modelExecutor.modelContext
    }
}

extension TaskRepository: ModelActor { }
```

The `DefaultSerialModelExecutor` uses Swift 5.9's custom actor executors to align the actor's serial queue with the `ModelContext`'s underlying queue.

### CRITICAL: The MainActor Trap

**Bug:** When you create a `@ModelActor` on the main thread, its context becomes a main-thread context. This defeats the purpose of background processing.

```swift
// WRONG: Task inherits MainActor from SwiftUI view
struct ContentView: View {
    func importData() {
        Task {
            // This runs on MainActor because Task inherits isolation!
            let importer = TaskImporter(modelContainer: container)
            // importer.modelContext is a MAIN context, not background!
        }
    }
}
```

**Why it happens:** `ModelContext`'s initializer checks if it is running on the main dispatch queue. If so, it configures itself as a main context.

**Fix:** Use `Task.detached` to force background execution:

```swift
struct ContentView: View {
    func importData() {
        Task.detached {
            // Guaranteed background thread
            let importer = TaskImporter(modelContainer: container)
            // importer.modelContext is truly a background context
            try await importer.importTasks(data)
        }
    }
}
```

### Three Ways to Retrieve Models by ID

| Method | Behavior |
|--------|----------|
| `registeredModel(for:)` | Returns nil if not in current context's registered objects |
| `model(for:)` | Returns fault placeholder; may crash if object doesn't exist in store |
| `@ModelActor` subscript | Checks context, then row cache, then persistent storage |

### Automatic Queue Switching Safety Net

SwiftData includes a safety mechanism: property setters on `BackingData` automatically queue operations to the correct serial queue, even if called from the wrong thread. This prevents *some* data race crashes but does not eliminate the need for proper actor-based patterns.

---

## 12. Cascade Delete Patterns

### Basic Cascade

```swift
@Model
final class Session {
    @Relationship(deleteRule: .cascade, inverse: \Note.session)
    var notes: [Note]?
}

// Deleting session automatically deletes all notes
context.delete(session)
try context.save()
```

### Mixed Delete Rules

```swift
@Model
final class Project {
    // Cascade: tasks are owned by project
    @Relationship(deleteRule: .cascade, inverse: \Task.project)
    var tasks: [Task]?
    
    // Nullify: owner continues to exist
    @Relationship(deleteRule: .nullify, inverse: \User.ownedProjects)
    var owner: User?
}
```

### Verify Cascade in Tests

```swift
func testCascadeDelete() throws {
    let config = ModelConfiguration(isStoredInMemoryOnly: true)
    let container = try ModelContainer(for: Session.self, Note.self, configurations: config)
    let context = container.mainContext
    
    let session = Session(plannedDuration: 900)
    let note = Note(text: "Test", session: session)
    session.notes = [note]
    context.insert(session)
    try context.save()
    
    // Delete parent
    context.delete(session)
    try context.save()
    
    // Verify child is also deleted
    let remaining = try context.fetchCount(FetchDescriptor<Note>())
    XCTAssertEqual(remaining, 0)
}
```

---

## 13. Migration: Lightweight vs Custom

### When to Use Each

**Lightweight migration** handles automatically:
- Adding new optional properties
- Adding new required properties WITH default values
- Removing properties
- Renaming properties (with `@Attribute(originalName:)`)
- Adding new models
- Changing delete rules
- Adding subclasses (iOS 26)

**Custom migration** is required for:
- Changing property types (String to Int)
- Making optional required without default
- Splitting/merging properties
- Adding unique constraints (need deduplication)
- Complex data transformations

### VersionedSchema Structure

```swift
enum SchemaV1: VersionedSchema {
    static var versionIdentifier: Schema.Version { Schema.Version(1, 0, 0) }
    static var models: [any PersistentModel.Type] { [Task.self, Project.self] }
    
    // CRITICAL: Define models INSIDE the schema enum
    @Model final class Task {
        var title: String
        init(title: String) { self.title = title }
    }
    
    @Model final class Project {
        var name: String
        init(name: String) { self.name = name }
    }
}
```

### Migration Plan

```swift
enum MigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [SchemaV1.self, SchemaV2.self, SchemaV3.self]
    }
    
    static var stages: [MigrationStage] {
        [migrateV1toV2, migrateV2toV3]
    }
    
    // Lightweight: added optional dueDate
    static let migrateV1toV2 = MigrationStage.lightweight(
        fromVersion: SchemaV1.self,
        toVersion: SchemaV2.self
    )
    
    // Custom: added unique IDs, need deduplication
    static let migrateV2toV3 = MigrationStage.custom(
        fromVersion: SchemaV2.self,
        toVersion: SchemaV3.self,
        willMigrate: { context in
            // BEFORE migration: access OLD models (SchemaV2.Task)
            let tasks = try context.fetch(FetchDescriptor<SchemaV2.Task>())
            // Deduplicate or prepare data
            try context.save()
        },
        didMigrate: { context in
            // AFTER migration: access NEW models (SchemaV3.Task)
            // Post-migration cleanup
        }
    )
}
```

### willMigrate vs didMigrate

| Closure | When Called | Model Access | Use For |
|---------|------------|-------------|---------|
| `willMigrate` | Before schema changes | Old models only | Data preparation, deduplication |
| `didMigrate` | After schema changes | New models only | Setting defaults, cleanup |

### Inheritance Migration (iOS 26)

Adding subclasses to an existing parent is a **lightweight** migration:

```swift
@available(iOS 26, *)
static let migrateV3toV4 = MigrationStage.lightweight(
    fromVersion: SchemaV3.self,
    toVersion: SchemaV4.self  // Adds BusinessTrip: Trip
)
```

### Migration Plan with iOS 26 Availability

```swift
enum MigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        var schemas: [any VersionedSchema.Type] = [SchemaV1.self, SchemaV2.self, SchemaV3.self]
        if #available(iOS 26, *) {
            schemas.append(SchemaV4.self)
        }
        return schemas
    }
    
    static var stages: [MigrationStage] {
        var stages = [migrateV1toV2, migrateV2toV3]
        if #available(iOS 26, *) {
            stages.append(migrateV3toV4)
        }
        return stages
    }
}
```

### Critical Migration Rules

1. **Never modify historical schemas** -- changing `SchemaV1` after release causes "Cannot use staged migration with unknown model version" (error 134504)
2. **Include ALL models in every version** -- missing models break the migration
3. **Test migration paths** -- use in-memory containers with test data

### Destructive Recovery

When migration fails irrecoverably:

```swift
func createContainer() -> ModelContainer {
    let schema = Schema(versionedSchema: SchemaV3.self)
    
    do {
        return try ModelContainer(for: schema, migrationPlan: MigrationPlan.self)
    } catch {
        print("Migration failed: \(error)")
        // Delete store and recreate (DATA LOSS)
        deletePersistentStore()
        return try! ModelContainer(for: schema)
    }
}

private func deletePersistentStore() {
    guard let url = FileManager.default
        .urls(for: .applicationSupportDirectory, in: .userDomainMask)
        .first?.appendingPathComponent("default.store") else { return }
    try? FileManager.default.removeItem(at: url)
}
```

---

## 14. Unique Constraints and Conflict Resolution

### @Attribute(.unique) Behavior

When inserting with a colliding unique value, SwiftData performs an **upsert**:

```swift
@Model final class Contact {
    @Attribute(.unique) var email: String
    var name: String
    var lastSeen: Date
}

// Insert "alice@example.com" with name "Alice"
// Insert again "alice@example.com" with name "Alice Smith"
// Result: ONE record with name "Alice Smith" (updated, not duplicated)
```

### Limitations

- **No composite unique constraints** -- use composite key string workaround
- **Editing crash:** Using `@Bindable` to edit a `.unique` field and setting it to an existing value on a different record crashes
- **CloudKit incompatible:** Do NOT use `.unique` with CloudKit -- CloudKit cannot enforce atomic uniqueness across devices

### Conflict Resolution

SwiftData does not expose Core Data's full `NSMergePolicy` system directly. Available via `ModelContext`:

```swift
context.mergePolicy = .mergeByPropertyObjectTrump  // In-memory wins (default)
context.mergePolicy = .mergeByPropertyStoreTrump   // Persistent store wins
context.mergePolicy = .error                       // Throw on conflict
```

---

## 15. In-Memory Containers for Testing

### Basic Test Setup

```swift
import XCTest
import SwiftData
@testable import MyApp

@MainActor
final class TaskTests: XCTestCase {
    var container: ModelContainer!
    var context: ModelContext!
    
    override func setUp() {
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        container = try! ModelContainer(
            for: Task.self, Project.self,
            configurations: config
        )
        context = container.mainContext
    }
    
    override func tearDown() {
        container = nil
        context = nil
    }
    
    func testCreateTask() throws {
        let task = Task(title: "Test Task")
        context.insert(task)
        try context.save()
        
        let fetched = try context.fetch(FetchDescriptor<Task>())
        XCTAssertEqual(fetched.count, 1)
        XCTAssertEqual(fetched.first?.title, "Test Task")
    }
    
    func testCascadeDelete() throws {
        let session = Session()
        let note = Note(text: "Test", session: session)
        session.notes = [note]
        context.insert(session)
        try context.save()
        
        context.delete(session)
        try context.save()
        
        let remaining = try context.fetchCount(FetchDescriptor<Note>())
        XCTAssertEqual(remaining, 0, "Cascade should delete children")
    }
}
```

### Key Testing Patterns

1. **Always use `@MainActor`** on test classes to access `mainContext`
2. **Always use `isStoredInMemoryOnly: true`** for clean slate each test
3. **Save explicitly** before assertions -- autosave timing is unpredictable in tests
4. **Test migration paths** with separate versioned schema containers

### UI Test Setup

```swift
// In App init:
let isTesting = CommandLine.arguments.contains("enable-testing")
let config = ModelConfiguration(isStoredInMemoryOnly: isTesting)
container = try! ModelContainer(for: Task.self, configurations: config)
```

---

## 16. CloudKit Sync Considerations

### CloudKit Model Requirements

| Requirement | Reason |
|-------------|--------|
| All properties optional OR have defaults | CloudKit records may arrive with missing fields |
| No `@Attribute(.unique)` | CloudKit cannot enforce atomic uniqueness |
| No `.deny` delete rule | Not supported by CloudKit |
| All relationships optional | Relationship targets may not sync yet |
| Lightweight migrations only | CloudKit disallows custom migrations once sync enabled |
| No `@Transient` on important data | Transient data is not synced |

### Enabling CloudKit

```swift
let config = ModelConfiguration(
    cloudKitDatabase: .automatic  // Uses default CloudKit container
)
let container = try ModelContainer(for: Task.self, configurations: config)
```

### Known CloudKit Limitations

1. **View updates delayed:** CloudKit delivers changes via silent push notifications. SwiftUI may not re-render because `@Query` doesn't see the model as "changed" at the SwiftUI observation level
2. **No conflict resolution API:** SwiftData doesn't expose merge policies for CloudKit conflicts
3. **No partial sync:** All-or-nothing sync per configuration
4. **Public database not supported:** Only private CloudKit databases work with SwiftData
5. **Custom data stores:** CloudKit sync only works with the default data store, not custom ones

### CloudKit-Safe Model Pattern

```swift
@Model
final class CloudSafeTask {
    var id: UUID = UUID()          // Has default
    var title: String = ""         // Has default
    var isCompleted: Bool = false   // Has default
    var dueDate: Date? = nil       // Optional
    
    // Relationships must be optional, no .deny
    @Relationship(deleteRule: .cascade, inverse: \Subtask.parent)
    var subtasks: [Subtask]?       // Optional
    
    // Do NOT add @Attribute(.unique)
}
```

---

## 17. Performance: Batch Operations and Prefetching

### Performance Checklist

| Technique | Impact | When to Use |
|-----------|--------|-------------|
| `@Attribute(.indexed)` | Faster queries on indexed columns | Properties used in predicates or sort |
| `fetchLimit` | Reduces memory and query time | When you don't need all results |
| `fetchOffset` + `fetchLimit` | Pagination | Lists with infinite scroll |
| `propertiesToFetch` | Reduces memory per object | When you only need a few fields |
| `relationshipKeyPathsForPrefetching` | Eliminates N+1 queries | Before iterating relationships |
| `enumerate(batchSize:)` | Constant memory for large traversals | Processing thousands of records |
| Batch `delete(model:where:)` | Faster than individual deletes | Bulk cleanup operations |
| `#Index` macro | Compound indexes | Complex query patterns |

### Relationship Prefetching

```swift
// Without prefetching: 1 query + N queries for relationships
let projects = try context.fetch(FetchDescriptor<Project>())
for project in projects {
    print(project.tasks?.count ?? 0)  // Each access = separate query
}

// With prefetching: 2 queries total
var descriptor = FetchDescriptor<Project>()
descriptor.relationshipKeyPathsForPrefetching = [\.tasks]
let projects = try context.fetch(descriptor)
// Relationships already loaded
```

### Batch Insert Pattern

For inserting thousands of records, batch saves to control memory:

```swift
@ModelActor
actor BulkImporter {
    func importItems(_ items: [ItemDTO]) throws {
        let batchSize = 500
        
        for startIndex in stride(from: 0, to: items.count, by: batchSize) {
            let endIndex = min(startIndex + batchSize, items.count)
            let batch = items[startIndex..<endIndex]
            
            for dto in batch {
                let item = Item(title: dto.title)
                modelContext.insert(item)
            }
            
            try modelContext.save()
            // Context is cleared after save, freeing memory
        }
    }
}
```

### Enumerate for Large Traversals

```swift
let descriptor = FetchDescriptor<Task>(
    sortBy: [SortDescriptor(\.createdAt)]
)

try context.enumerate(descriptor, batchSize: 1000) { task in
    // Process each task
    task.isArchived = true
}
try context.save()
```

**Batch size trade-offs:**
- Default: 5000 objects per batch
- Smaller (500-1000): Less memory, more disk I/O
- Larger (5000-10000): More memory, less disk I/O
- With images/blobs: Use 100-500

### Batch Delete

```swift
// Delete all completed tasks in one operation
try context.delete(
    model: Task.self,
    where: #Predicate { $0.isCompleted }
)
try context.save()  // Required -- batch delete only applies on save
```

### Indexing Strategy

```swift
@Model
final class Task {
    // Index properties used in predicates and sort descriptors
    @Attribute(.indexed)
    var createdAt: Date
    
    @Attribute(.indexed)
    var priority: Int
    
    @Attribute(.indexed)
    var isCompleted: Bool
    
    // Compound index for common query patterns
    #Index<Task>([\.isCompleted, \.createdAt], [\.priority, \.createdAt])
    
    var title: String  // Not indexed -- only used in contains() search
}
```

### Avoid Expensive Predicates

```swift
// SLOW: Full table scan with string transformation
#Predicate<Task> { $0.title.lowercased().contains(search.lowercased()) }

// FAST: Case-insensitive compare using built-in
#Predicate<Task> { $0.title.localizedStandardContains(search) }

// SLOW: Complex predicate on unindexed field
#Predicate<Task> { $0.notes?.contains(search) ?? false }

// FAST: Use indexed field with simple comparison
#Predicate<Task> { $0.priority > 2 }  // priority is @Attribute(.indexed)
```

---

## 18. iOS 26 New Features

### Class Inheritance

Models can now form inheritance hierarchies:

```swift
@Model
class Trip {
    var name: String
    var destination: String
    var startDate: Date
    var endDate: Date
    
    init(name: String, destination: String, startDate: Date, endDate: Date) {
        self.name = name
        self.destination = destination
        self.startDate = startDate
        self.endDate = endDate
    }
}

@available(iOS 26, *)
@Model
class BusinessTrip: Trip {
    var perDiem: Double = 0.0
    
    init(name: String, destination: String, startDate: Date, endDate: Date, perDiem: Double) {
        self.perDiem = perDiem
        super.init(name: name, destination: destination, startDate: startDate, endDate: endDate)
    }
}
```

**Requirements:**
- Both parent and subclass must have `@Model`
- Parent class must NOT be `final` (subclasses can be)
- Subclasses use `@available(iOS 26, *)` 
- All models in hierarchy must be registered in `ModelContainer`

**Query behavior:**
- `Query(for: Trip.self)` -- returns ALL trips including subclasses (deep search)
- `Query(for: BusinessTrip.self)` -- returns only business trips (shallow search)
- `#Predicate<Trip> { $0 is BusinessTrip }` -- type filtering

**When to use inheritance vs protocols:**
- Use inheritance when models share properties AND you need both deep and shallow queries
- Use protocols when models share a single trait or only need shallow queries

### Codable Enum Predicates

Enums conforming to `Codable` can now be used in predicates:

```swift
enum TripType: String, Codable { case business, personal, vacation }

#Predicate<Trip> { $0.type == .business }  // Now works in iOS 26
```

### Enhanced History API

History fetching now supports `sortBy`:

```swift
var historyDesc = HistoryDescriptor<DefaultHistoryTransaction>()
historyDesc.sortBy = [.init(\.transactionIdentifier, order: .reverse)]
historyDesc.fetchLimit = 1
let transactions = try context.fetchHistory(historyDesc)
```

### Set Support

`Set<T>` properties are now supported for primitive types:

```swift
@Model final class Task {
    var uniqueTags: Set<String> = []
}
```

### AttributedString Support

`AttributedString` is now a supported data type for model properties.

### @ModelActor Bug Fixes

Fixed view update issues when mutating data under `@ModelActor`. Prior to iOS 26, updates via `@ModelActor` did not automatically refresh `@Query` views (deletions and additions worked, but property updates did not).

---

## 19. Common Crashes and Fixes

### Quick Reference

| Crash | Error | Cause | Fix |
|-------|-------|-------|-----|
| Schema mismatch | 134504 | Changed historical schema | Never modify released schemas |
| Missing inverse | "Expected only Arrays" | No `inverse:` on relationship | Add `inverse:` on both sides |
| Actor boundary | "Main actor-isolated" | Context crossed actor boundary | Use `ModelContext(container)` per actor |
| Non-Sendable | "Sending non-Sendable" | Model or context sent between actors | Pass `PersistentIdentifier` instead |
| Fault failure | "Failed to fulfill faulting" | Relationship not prefetched | Use `relationshipKeyPathsForPrefetching` |
| Migration crash | 134100 | Incompatible model | Check migration plan completeness |
| Unique edit crash | EXC_BAD_ACCESS | Editing `@Bindable` unique field to existing value | Validate uniqueness before assignment |
| Concurrent migration | Various | App + widget migrating simultaneously | Use file coordination or serial init |
| CloudKit + custom migration | Various | Custom migration with CloudKit enabled | Disable CloudKit during migration |
| ssu-cli-app crash | Process crash | AppIntent with `suggestedInvocationPhrase` | Remove from non-shortcut intents |

### Background Task with Main Context

```swift
// CRASH
struct BadView: View {
    @Environment(\.modelContext) private var context
    func importData() {
        Task {
            context.insert(Task(title: "X"))  // context is MainActor!
        }
    }
}

// FIX
struct GoodView: View {
    @Environment(\.modelContext) private var context
    func importData() {
        Task.detached {
            let bgContext = ModelContext(context.container)
            bgContext.insert(Task(title: "X"))
            try bgContext.save()
        }
    }
}
```

### Context After Container Deallocated

```swift
// CRASH RISK
func bad() {
    let container = try? ModelContainer(for: Task.self)
    let context = ModelContext(container!)
    // container goes out of scope -- context may crash
}

// FIX: Keep container alive
class DataManager {
    private let container: ModelContainer
    private let context: ModelContext
    
    init() throws {
        self.container = try ModelContainer(for: Task.self)
        self.context = ModelContext(container)
    }
}
```

### Subclass Predicate on Parent Property

```swift
// CRASH in iOS 26
@Query(filter: #Predicate<BusinessTrip> { $0.destination == "NYC" })
var trips: [BusinessTrip]

// FIX: Query parent with type check
@Query(filter: #Predicate<Trip> { $0 is BusinessTrip && $0.destination == "NYC" })
var trips: [Trip]
```

---

## 20. Complete Architecture Example

This example shows the recommended architecture for an iOS 26 app using SwiftData with `@Observable` ViewModels.

```swift
import SwiftData
import SwiftUI

// MARK: - Models

@Model
final class Session {
    #Index<Session>([\.startTime], [\.isCompleted, \.startTime])
    
    @Attribute(.unique) var id: UUID
    var startTime: Date
    var endTime: Date?
    var plannedDuration: TimeInterval
    var isCompleted: Bool
    var label: String?
    
    @Relationship(deleteRule: .cascade, inverse: \Note.session)
    var notes: [Note]?
    
    var actualDuration: TimeInterval? {
        guard let endTime else { return nil }
        return endTime.timeIntervalSince(startTime)
    }
    
    init(
        id: UUID = UUID(),
        startTime: Date = Date(),
        endTime: Date? = nil,
        plannedDuration: TimeInterval = 15 * 60,
        isCompleted: Bool = false,
        label: String? = nil
    ) {
        self.id = id
        self.startTime = startTime
        self.endTime = endTime
        self.plannedDuration = plannedDuration
        self.isCompleted = isCompleted
        self.label = label
    }
}

@Model
final class Note {
    #Index<Note>([\.timestamp])
    
    @Attribute(.unique) var id: UUID
    var text: String
    var timestamp: Date
    var session: Session?
    
    init(id: UUID = UUID(), text: String, timestamp: Date = Date(), session: Session? = nil) {
        self.id = id
        self.text = text
        self.timestamp = timestamp
        self.session = session
    }
}

// MARK: - ViewModel (@Observable, not ObservableObject)

@MainActor
@Observable
final class SessionViewModel {
    private let container: ModelContainer
    
    var sessions: [Session] = []
    var error: Error?
    
    init(container: ModelContainer) {
        self.container = container
    }
    
    func loadSessions() {
        do {
            let context = container.mainContext
            var descriptor = FetchDescriptor<Session>(
                sortBy: [SortDescriptor(\.startTime, order: .reverse)]
            )
            descriptor.fetchLimit = 50
            descriptor.relationshipKeyPathsForPrefetching = [\.notes]
            sessions = try context.fetch(descriptor)
        } catch {
            self.error = error
        }
    }
    
    func startSession(duration: TimeInterval, label: String?) {
        let context = container.mainContext
        let session = Session(plannedDuration: duration, label: label)
        context.insert(session)
        try? context.save()
        loadSessions()
    }
    
    func captureNote(text: String, for session: Session) {
        let context = container.mainContext
        let note = Note(text: text, session: session)
        context.insert(note)
        session.notes?.append(note)
        try? context.save()
    }
    
    func deleteSession(_ session: Session) {
        let context = container.mainContext
        context.delete(session)  // Cascade deletes notes
        try? context.save()
        loadSessions()
    }
}

// MARK: - Background Actor (for heavy operations)

@ModelActor
actor SessionExporter {
    func exportAllSessions() throws -> [SessionDTO] {
        var descriptor = FetchDescriptor<Session>(
            sortBy: [SortDescriptor(\.startTime, order: .reverse)]
        )
        descriptor.relationshipKeyPathsForPrefetching = [\.notes]
        
        let sessions = try modelContext.fetch(descriptor)
        return sessions.map { session in
            SessionDTO(
                id: session.id,
                startTime: session.startTime,
                duration: session.actualDuration ?? 0,
                noteCount: session.notes?.count ?? 0
            )
        }
    }
    
    func deleteOldSessions(before date: Date) throws -> Int {
        let predicate = #Predicate<Session> { $0.startTime < date }
        let count = try modelContext.fetchCount(FetchDescriptor(predicate: predicate))
        try modelContext.delete(model: Session.self, where: predicate)
        try modelContext.save()
        return count
    }
}

struct SessionDTO: Sendable {
    let id: UUID
    let startTime: Date
    let duration: TimeInterval
    let noteCount: Int
}

// MARK: - View

struct SessionListView: View {
    @Query(sort: \Session.startTime, order: .reverse)
    private var sessions: [Session]
    
    @Environment(\.modelContext) private var context
    
    var body: some View {
        List(sessions) { session in
            SessionRow(session: session)
        }
    }
}

// MARK: - App Setup

@main
struct MyApp: App {
    let container: ModelContainer
    
    init() {
        do {
            let schema = Schema([Session.self, Note.self])
            let config = ModelConfiguration(
                schema: schema,
                groupContainer: .identifier("group.com.myapp.shared")
            )
            container = try ModelContainer(for: schema, configurations: [config])
        } catch {
            fatalError("Failed to create ModelContainer: \(error)")
        }
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(container)
    }
}

// MARK: - Testing

@MainActor
final class SessionTests: XCTestCase {
    func testCaptureNote() throws {
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try ModelContainer(
            for: Session.self, Note.self,
            configurations: config
        )
        let context = container.mainContext
        
        let session = Session(plannedDuration: 900)
        context.insert(session)
        
        let note = Note(text: "Buy milk", session: session)
        context.insert(note)
        session.notes = [note]
        try context.save()
        
        XCTAssertEqual(session.notes?.count, 1)
        XCTAssertEqual(session.notes?.first?.text, "Buy milk")
    }
}
```

---

## References

### Apple Official

- [SwiftData Documentation](https://developer.apple.com/documentation/swiftdata)
- [WWDC 2025: SwiftData Inheritance and Schema Migration (Session 291)](https://developer.apple.com/videos/play/wwdc2025/291/)
- [WWDC 2024: What's New in SwiftData (Session 10137)](https://developer.apple.com/videos/play/wwdc2024/10137/)
- [WWDC 2023: Meet SwiftData (Session 10187)](https://developer.apple.com/videos/play/wwdc2023/10187/)
- [WWDC 2023: Model Your Schema (Session 10195)](https://developer.apple.com/videos/play/wwdc2023/10195/)
- [WWDC 2023: Dive Deeper (Session 10196)](https://developer.apple.com/videos/play/wwdc2023/10196/)
- [SwiftData Updates](https://developer.apple.com/documentation/updates/swiftdata)

### Community (Verified)

- [Concurrent Programming in SwiftData (fatbobman.com)](https://fatbobman.com/en/posts/concurret-programming-in-swiftdata/)
- [Key Considerations Before Using SwiftData (fatbobman.com)](https://fatbobman.com/en/posts/key-considerations-before-using-swiftdata/)
- [Designing Models for CloudKit Sync (fatbobman.com)](https://fatbobman.com/en/snippet/rules-for-adapting-data-models-to-cloudkit/)
- [SwiftData Concurrency (polpiella.dev)](https://www.polpiella.dev/core-data-swift-data-concurrency)
- [ModelActor Pitfalls (killlilwinters.medium.com)](https://killlilwinters.medium.com/taking-swiftdata-further-modelactor-swift-concurrency-and-avoiding-mainactor-pitfalls-3692f61f2fa1)
- [SwiftData Background Tasks (useyourloaf.com)](https://useyourloaf.com/blog/swiftdata-background-tasks/)
- [SwiftData by Example (hackingwithswift.com)](https://www.hackingwithswift.com/quick-start/swiftdata/)
