# SwiftData Standards

> Patterns for models, queries, and context operations in iOS 26+.

## Critical Rules

### 1. @Model Classes Are Non-Sendable

**CHECKLIST**: Any `@Model` type being captured in closures, passed to async contexts, or stored in `@State`?

```swift
// ❌ WRONG — @Model class captured in @Sendable closure
@Model
class CapturedThought {
    // ...
}

// Elsewhere:
Delay.after(0.5) { @Sendable in
    let t = thought  // Error: non-Sendable type
}

// ✅ CORRECT — Pass by ID, fetch in destination context
let thoughtID = thought.id
Task {
    let descriptor = FetchDescriptor<CapturedThought>(
        predicate: #Predicate { $0.id == thoughtID }
    )
    if let thought = try? modelContext.fetch(descriptor).first {
        // Work with thought here
    }
}
```

### 2. ModelContext Access

**CHECKLIST**: Using `@Environment(\.modelContext)` in Views, not passing through initializers?

```swift
// ✅ CORRECT — Inject via environment
struct MyView: View {
    @Environment(\.modelContext) private var modelContext

    func save() {
        let thought = CapturedThought(text: "...")
        modelContext.insert(thought)
        try? modelContext.save()
    }
}

// ✅ CORRECT — Pass to ViewModel methods
func addCapture(_ thought: CapturedThought, modelContext: ModelContext) {
    modelContext.insert(thought)
    // ...
}
```

### 3. FetchDescriptor Patterns

**CHECKLIST**: Queries using modern `#Predicate` syntax?

```swift
// ✅ CORRECT — Modern FetchDescriptor with #Predicate
func fetchRecentCaptures() -> [CapturedThought] {
    let descriptor = FetchDescriptor<CapturedThought>(
        predicate: #Predicate { thought in
            thought.timestamp > Date().addingTimeInterval(-86400)
        },
        sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
    )
    return (try? modelContext.fetch(descriptor)) ?? []
}
```

### 4. Model Indexes

**CHECKLIST**: New `@Model` types have appropriate indexes?

```swift
@Model
@Index<CapturedThought>([\.timestamp], [\.categoryRaw, \.timestamp])
class CapturedThought {
    @Attribute(.unique) var id: UUID
    var timestamp: Date
    var categoryRaw: String
    // ...
}
```

### 5. Relationship Patterns

**CHECKLIST**: Relationships using proper inverse declarations?

```swift
@Model
class FocusSession {
    @Relationship(deleteRule: .cascade, inverse: \CapturedThought.session)
    var captures: [CapturedThought]?
}

@Model
class CapturedThought {
    var session: FocusSession?  // Inverse is declared above
}
```

## Common Operations

### Insert and Save

```swift
let thought = CapturedThought(text: text, category: category)
modelContext.insert(thought)
try? modelContext.save()
```

### Delete

```swift
modelContext.delete(thought)
try? modelContext.save()
```

### Batch Delete (for cleanup)

```swift
func deleteAll() {
    let descriptor = FetchDescriptor<CapturedThought>()
    if let thoughts = try? modelContext.fetch(descriptor) {
        for thought in thoughts {
            modelContext.delete(thought)
        }
        try? modelContext.save()
    }
}
```

## SwiftData + Concurrency

**CRITICAL**: `@Model` objects are NOT Sendable. Never pass them across isolation boundaries.

```swift
// ❌ WRONG
func processThought(_ thought: CapturedThought) async {
    // Error: non-Sendable type
}

// ✅ CORRECT — Pass ID, fetch in context
func processThought(id: UUID) async {
    let descriptor = FetchDescriptor<CapturedThought>(
        predicate: #Predicate { $0.id == id }
    )
    guard let thought = try? modelContext.fetch(descriptor).first else { return }
    // Process...
}
```

## Quick Self-Check

Before finishing SwiftData code:

- [ ] `@Model` classes never captured in `@Sendable` closures
- [ ] Using `@Environment(\.modelContext)` in Views
- [ ] Passing `ModelContext` as parameter to ViewModel methods
- [ ] Using `#Predicate` syntax in `FetchDescriptor`
- [ ] Indexes defined for frequently queried properties
- [ ] Relationships have proper `inverse` declarations
- [ ] New entities/relationships have `VersionedSchema` + `SchemaMigrationPlan`
- [ ] Test containers use full production schema + unique URLs
- [ ] `PreviewContainer` includes all `@Model` types

## Schema Migration (VersionedSchema)

**CRITICAL**: Any new `@Model` entity or new relationship on an existing entity requires a migration plan. Without one, existing users' stores will fail to open → crash on launch (`SIGABRT` in `TaskLocal::StopLookupScope`).

### When Migration Is Required

| Change | Migration Needed? | Type | CloudKit Safe? |
|--------|:-:|------|:-:|
| New `@Model` entity | **YES** | Lightweight | ✅ |
| New optional property on existing entity | **YES** | Lightweight | ✅ |
| New required property (no default) | **YES** | Custom | ✅ |
| New `@Relationship` on existing entity | **YES** | Lightweight | ✅ |
| Delete property | **YES** | Lightweight | ✅ with caveat¹ |
| Rename property | **YES** | Custom | ❌ **HIGH RISK** |
| Rename `@Model` class | **YES** | Custom | ❌ **CRITICAL RISK** |
| Change raw ID → `@Relationship` | **YES** | Custom | ❌ **HIGH RISK** |
| New computed property | No | — | ✅ |

¹ Removing a property is CloudKit-safe IF the old property had no semantic meaning that would cause incorrect behavior when old devices see its default value.

### CloudKit Sync Safety

When CloudKit sync is enabled, the schema rules become much stricter because the iCloud container schema is **permanent and append-only** — record types and fields are never deleted from the server. Multiple devices can run different app versions simultaneously.

#### NEVER rename an `@Model` class

CloudKit maps each `@Model` class to a CKRecord type by name. Renaming creates a new record type; the old one persists with orphaned data. Old devices write records of the old type that new devices don't import, and vice versa — **silent data loss in both directions**.

```swift
// ❌ WRONG — Renaming creates a new CloudKit record type, orphaning old data
// Before: class SubPoint → After: class OutlineLine

// ✅ CORRECT — Add a new class, migrate data in .custom stage, keep old registered for 2 versions
enum SchemaV2: VersionedSchema {
    // Keep OldModelName registered even if unused — old CloudKit records still reference it
    static var models: [any PersistentModel.Type] = [NewModelName.self, OldModelName.self]
}
static let migrateV1toV2 = MigrationStage.custom(
    fromVersion: SchemaV1.self, toVersion: SchemaV2.self,
    willMigrate: { context in
        let old = try context.fetch(FetchDescriptor<OldModelName>())
        for item in old {
            context.insert(NewModelName(from: item))
        }
    }, didMigrate: nil
)
```

#### NEVER rename a stored property

CloudKit maps stored properties to CKRecord fields. Renaming a property creates a new field; the old field persists on old records. Old devices read the old field (never updated); new devices read the new field (missing old data).

```swift
// ❌ WRONG — Renaming creates orphaned CKRecord field
// Before: var duration: Int → After: var durationSeconds: Int

// ✅ CORRECT — Add new property, copy data in .custom stage, stop writing to old
var duration: Int         // keep — old CloudKit records still have this
var durationSeconds: Int  // new
// In .custom migration: durationSeconds = duration
```

#### NEVER change a raw ID field to `@Relationship` without `.custom` migration

Raw ID (`var sessionId: UUID`) and `@Relationship` are stored differently in CloudKit (field vs CKReference). Old devices can't interpret the new format.

```swift
// ❌ WRONG — Changing storage format breaks cross-version sync
// Before: var sessionId: UUID → After: @Relationship var session: FocusSession?

// ✅ CORRECT — Keep both for at least 1 version so old devices can still link via raw ID
var sessionId: UUID?            // keep for backward compat
@Relationship var session: FocusSession?  // new
```

#### Adding and removing properties is safe

- **Adding** optional properties (defaulting to `nil`): old devices ignore unknown fields on import
- **Removing** properties: CloudKit ignores unknown fields → old records sync fine, field is dropped locally

#### Versioning convention

SwiftData uses semantic versioning: `Schema.Version(major, minor, patch)`. Increment patch for additive changes, minor for non-breaking structural changes, major for changes requiring a data transform.

```swift
enum SchemaV1: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] = [FocusSession.self]
}
enum SchemaV2: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(1, 1, 0)  // minor: additive
    static var models: [any PersistentModel.Type] = [FocusSession.self]
}
```

### Pattern: VersionedSchema + MigrationPlan

```swift
import SwiftData

// Each schema version lists which @Model types exist
enum MySchemaV1: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Item.self, Tag.self]
    }
}

enum MySchemaV2: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Item.self, Tag.self, Folder.self]  // Added Folder
    }
}

enum MyMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [MySchemaV1.self, MySchemaV2.self]
    }
    static var stages: [MigrationStage] {
        [migrateV1toV2]
    }
    static let migrateV1toV2 = MigrationStage.lightweight(
        fromVersion: MySchemaV1.self,
        toVersion: MySchemaV2.self
    )
}

// Wire into container
let schema = Schema(versionedSchema: MySchemaV2.self)
let container = try ModelContainer(
    for: schema,
    migrationPlan: MyMigrationPlan.self,
    configurations: [config]
)
```

### Test Containers

Test `ModelContainer` instances must use the **full production schema** to avoid `loadIssueModelContainer` errors. Use unique URLs to isolate each test:

```swift
// ✅ CORRECT — Full schema + unique URL per test
func makeContainer() throws -> ModelContainer {
    let schema = Schema([Item.self, Tag.self, Folder.self])  // ALL @Model types
    let url = URL(filePath: "/dev/null").appending(path: UUID().uuidString)
    let config = ModelConfiguration(url: url, cloudKitDatabase: .none)
    return try ModelContainer(for: schema, configurations: [config])
}
```

### PreviewContainer

Must also include all `@Model` types in its schema. When adding a new entity, always update `PreviewContainer`.
