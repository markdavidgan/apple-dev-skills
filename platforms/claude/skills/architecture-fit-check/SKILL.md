---
name: architecture-fit-check
category: quality
description: Audit a design or subsystem for primitive/problem fit — catch the wrong-primitive trap where a powerful or opaque Apple framework (CloudKit sharing/CKShare, NSPersistentCloudKitContainer mirroring, NSFileCoordinator, App Intents graphs, widget timelines) is adopted to enforce an elegant invariant instead of fitting the problem's actual shape. Use before adopting such a framework, when a subsystem keeps breaking in a new place after each fix, or when an architecture exists to make something "structurally impossible". Trigger on "is this the right primitive", "architecture review", "should we use CKShare", "why does this keep breaking", "fit check", "wrong primitive", or "over-engineered".
invoke: "/fit-check [path-or-subsystem] — Audit a design for primitive/problem fit"
---

# Architecture Fit Check

One job: catch the **wrong-primitive** mistake before it costs weeks. The most expensive Apple-platform bugs are usually not bad code — they are the *right code on the wrong primitive*, where a powerful, opaque framework is bent to a job it was never built for, and the platform answers with failures you cannot observe.

## The core principle

**Match the primitive to the problem's actual shape, not to an elegant invariant.** A property you want — privacy, safety, "it can't leak by construction" — that ordinary app logic keeps cheaply must not be bought with a heavyweight, unobservable mechanism. Prefer the simplest primitive that ships, is debuggable in production, and fails legibly. Build what Apple's own engineers would ship, not a purity machine that cannot deliver.

## When to run this

- **Before** adopting a powerful or opaque Apple framework — the high-tax, hard-to-observe ones with a background reconciler: CloudKit sharing (`CKShare`) + `NSPersistentCloudKitContainer` mirroring, `NSFileCoordinator` / `UIDocument`, `NSFileProviderExtension`, Core Data persistent history, App Intents donation graphs, WidgetKit timeline orchestration.
- When a subsystem has survived **3+ fixes and each fix surfaces a new break in a different place** (the architectural-failure signal from systematic debugging).
- When the justification for a design is *"this makes X structurally impossible"* rather than *"this does X."*
- Reviewing any new sync / sharing / persistence / app-extension subsystem.

## The five-question audit

For the framework or primitive under review, answer in writing:

1. **What is this primitive's ONE job?** State it in a sentence. (e.g. "`CKShare` = let multiple users co-edit one mutable record graph.")
2. **What is my problem's actual shape?** Append-only or mutable? One author per record or many? One-way delivery or true co-editing? Request/response or stream?
3. **Do (1) and (2) match?** If you use under ~10% of the primitive's purpose, you pay full tax for a fraction of fit. Mismatch → stop.
4. **Am I adopting this to *do* a job, or to make something *impossible*?** "Impossible by construction" is a red flag when ordinary app logic keeps the property for free.
5. **Can I observe and debug it in production, on a real device?** If the failure mode is an opaque background reconciler with no log surface (mirroring delegate, file-coordinator deadlock), that is a deferred outage. Demand observability before adoption.

If any of 3 / 4 / 5 fails: pick a simpler primitive that fits, or keep the property in app logic.

## Smell tests (any one → investigate)

- "This makes X structurally impossible." → optimizing for elegance over delivery.
- "The framework is powerful enough to guarantee the invariant." → bending, not fitting.
- "Just one more fix and the sync / mirroring / sharing path will work." → how many fixes ago did you last question the foundation?
- "It compiles / CI is green." → can you observe it on a real device? (A cloud/sim with no iCloud never exercised it — green CI proves nothing about CloudKit.)
- "It's architecturally pure." → pure for whom? Does the user get a working product?
- The design needs a feature flag to keep the old path alive "just in case." → you don't trust it; that distrust is data.

## Primitive → problem decision matrix (Apple)

| Problem shape | Over-powered (wrong) | Fits (right) |
|---|---|---|
| One user's data across their own devices | hand-rolled `CKRecord` sync | `NSPersistentCloudKitContainer` private mirroring |
| Append-only, one-way messages between two users | `CKShare` + mirroring | encrypted **public-DB mailbox** (token-addressed append-only records + `CKQuerySubscription`) |
| Two users **co-editing** one mutable graph | hand-rolled merge | `CKShare` — this is its one job (or CRDT/op-log if offline-heavy) |
| Single-author document others only *read* | `CKShare` read-only (still runs the mirroring delegate → still wedges) | publish snapshots; readers fetch |
| Cross-process / coordinated file writes | naive `FileManager` | `NSFileCoordinator` / `UIDocument` (its one job) |
| Periodic UI surface refresh | a timer living in the app | WidgetKit timeline / `BGTaskScheduler` |

The test: if the right column is *simpler and more observable* than what you reached for, you reached too high.

## Shell heuristics (fast first pass)

```bash
# Powerful/opaque frameworks present?
grep -rln "CKShare\|NSPersistentCloudKitContainer\|NSFileCoordinator\|NSFileProvider" --include=*.swift .

# Multiple live versions of one feature (distrust signal — see ios-standards ULTIMATE RULE)
grep -rln "v2Enabled\|legacyMode\|newFlow\|useNew\|FeatureFlag" --include=*.swift .

# "Structural impossibility" justifications in code/docs/ADRs
grep -rin "structurally impossible\|by construction\|cannot leak\|impossible to" --include=*.md --include=*.swift .

# Architecture thrash: same subsystem reverted / re-fixed repeatedly
git log --oneline -- PATH | grep -iE "revert|fix.*again|re-?fix|wedge|retry|workaround" | head -20
```

A subsystem that lights up on *framework-present* + *thrash* + *structural-impossibility justification* is the textbook wrong-primitive case.

## Worked example — `CKShare` for one-way messages (real)

A care-journal app put 1:1 sharing on `CKShare` + `NSPersistentCloudKitContainer` mirroring to enforce "the private journal can never, structurally, join a share." But every cross-user record was **append-only and single-author** — signals, notes, a care plan that was already one-author. Zero co-editing.

The five-question audit: (1) `CKShare` = co-edit a mutable graph; (2) the shape was one-way append-only delivery; (3) **no match**; (4) adopted to make sharing *impossible*, a property ordinary logic kept for free; (5) the failures lived in the **mirroring delegate** — unobservable. The result: three weeks of `NSCocoaError 134406` wedges, accept-side `notFound`, and a clean-install freeze. The fix was not a better share path — it was the right primitive: an encrypted **public-DB mailbox** (token-addressed, append-only, AES-GCM on-device, observable in the CloudKit Dashboard). Over 1,100 lines deleted; the wedge class became impossible.

## What a fit-check produces

1. The five answers, written down.
2. A verdict: **fits** / **mismatch** / **needs-observability**.
3. If mismatch — the fitting primitive from the matrix, and the property that app logic should keep instead of the framework.
4. The cheapest **falsifiable spike** to prove the substrate before committing the migration (prove the part that fails *silently* first, on-host or on one device).

---

**Related:** `cloudkit-sync` (the CKShare-specific warning), `ios-standards` (the engineering rule + the ULTIMATE RULE on feature versions), and the `auditor` agent (deep multi-file review).
