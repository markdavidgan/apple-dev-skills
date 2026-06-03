---
name: cloudkit-sync
category: engineering
description: Sync SwiftData / Core Data across a user's devices with CloudKit, plus CKShare collaboration and conflict handling. Use when adding iCloud sync, "sync across devices", SwiftData + CloudKit, NSPersistentCloudKitContainer, sharing records between users, or debugging why data isn't syncing. Trigger on "CloudKit", "iCloud sync", "cloudKitDatabase", "CKShare", "sync not working", or "share data between users".
---

# CloudKit Sync (SwiftData & Core Data)

**Sync a user's data across their devices with iCloud, for free, using their private database.** This is the on-ramp to multi-device; for the local store and modeling, see `ios-standards` (SwiftData/`@Model`).

> CloudKit's private database is per-user, on the user's iCloud account. You don't run a server. The trade-off: the **schema must obey CloudKit's rules**, and sync is eventual (seconds to minutes), not instant.

---

## SwiftData + CloudKit

```swift
let config = ModelConfiguration(
    "Main",
    schema: Schema([Trip.self, Stop.self]),
    cloudKitDatabase: .automatic        // or .private("iCloud.com.you.app")
)
let container = try ModelContainer(for: Trip.self, Stop.self, configurations: config)
```

**Enable in the project:** add the **iCloud** capability → **CloudKit**, pick/create a container, and add the **Background Modes → Remote notifications** capability (CloudKit uses silent pushes to trigger sync).

### The schema rules CloudKit forces on you

These are the cause of ~90% of "it won't build / won't sync" issues:

- **Every non-optional property needs a default value**, or must be optional. CloudKit can't represent required-with-no-default.
- **No `@Attribute(.unique)`** — unique constraints aren't supported with CloudKit. Enforce uniqueness in app logic instead.
- **Relationships must be optional** and you generally need an inverse.
- **No `.deny` delete rules** that CloudKit can't model.

Violating these throws at `ModelContainer` init or silently disables sync. If a previously-local model won't sync, audit it against this list first.

---

## Core Data path

Use `NSPersistentCloudKitContainer` instead of `NSPersistentContainer`. Set the store's `cloudKitContainerOptions` and `NSPersistentStoreRemoteChangeNotificationPostOptionKey` to observe remote changes. Same schema constraints apply. Initialize the CloudKit schema during development with `initializeCloudKitSchema(options:)` (debug builds only — never ship that call).

---

## Going to production

CloudKit has **two environments: Development and Production.** Your dev schema changes do **not** reach production until you **deploy the schema** in the **CloudKit Console**.

- Deploy schema to Production **before** you ship to TestFlight/App Store, or real users get nothing.
- The schema is **additive-only in production** — you can add fields/record types, never rename or delete them. Model carefully up front.

This is the #1 launch-day CloudKit surprise: "works in Xcode, broken in the App Store build" = schema not deployed to Production.

---

## Conflicts & merging

- The default is **last-writer-wins** at the field level (CloudKit) / configurable merge policy (Core Data: set `viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy`).
- For data where lost edits matter (counters, sets), model them so concurrent edits *combine* rather than overwrite (e.g. store events and reduce, not a single mutable total).
- Sync is **eventual** — design UI to tolerate a record appearing/updating later. Never block the UI on a sync.

---

## Sharing between users (CKShare)

For collaboration (not just same-user multi-device):

- Create a `CKShare` for a record (or use SwiftData's sharing affordances) and present `UICloudSharingController` to invite participants.
- Shared records live in the **shared database**; participants need the right `CKShare.ParticipantPermission` (`.readOnly` / `.readWrite`).
- Handle the share-accept flow via the scene/app delegate `userDidAcceptCloudKitShareWith`.

---

## Debugging sync

- Add the launch argument `-com.apple.CoreData.CloudKitDebug 1` (and `-com.apple.CoreData.SQLDebug 1`) to see sync activity in the console.
- Verify the device is **signed into iCloud** and iCloud Drive is on — sync silently no-ops otherwise. Surface iCloud account status (`CKContainer.accountStatus`) in the UI.
- New devices/back-ups import in the background after first launch — give it time and a connection.
- "Works on one device, not the other" → check both are on the same iCloud account and the schema is deployed.

| Symptom | Cause | Fix |
|---------|-------|-----|
| Throws at `ModelContainer` init | Schema breaks a CloudKit rule | Make properties optional/defaulted, drop `.unique` |
| Builds, never syncs | Missing Remote notifications background mode, or signed out of iCloud | Add capability; check `accountStatus` |
| Works in Xcode, not in App Store build | Schema not deployed to Production | Deploy in CloudKit Console |
| Edits clobber each other | Last-writer-wins | Model concurrent data as combinable events |
