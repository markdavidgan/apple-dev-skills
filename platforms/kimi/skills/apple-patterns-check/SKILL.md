---
name: apple-patterns-check
category: quality
description: Validate iOS code against Apple's best practices. Run during /ship, before commits, or when reviewing code for Apple-specific compliance. Triggers on "check patterns", "apple check", "pre-commit check", or "validate swift code".
invoke: "/apple-check [path] — Validate Apple patterns in modified files"
---

# Apple Patterns Check

Fast validation that code follows Apple's documented patterns. Uses shell commands to detect violations before they reach CI.

## When to Use

- Before committing significant Swift changes
- During `/ship` — after implement, before archive
- When reviewing code touching SwiftUI, SwiftData, or concurrency
- When unsure "is this the Apple way?"

## Quick Check

```bash
/apple-check
/apple-check src/ViewModels/
/apple-check --since-last-commit
```

## Pattern Validation

### 1. Swift 6 Concurrency Patterns

```bash
# 1.1 Task @MainActor annotation — CRITICAL: crash risk
# All Task { [weak self] must be Task { @MainActor [weak self]
git diff HEAD --name-only -- "*.swift" | xargs grep -n "Task { \[weak self\]" 2>/dev/null | grep -v "@MainActor"

# 1.2 @preconcurrency import — OBSOLETE CHECK (2026-04-03)
# iOS 26 first-party frameworks are Sendable-annotated. Prophylactic @preconcurrency
# masks real concurrency issues. Only add where compiler specifically demands it.
# This check is kept for legacy/third-party modules only.
# git diff HEAD --name-only -- "*.swift" | xargs grep -n "^import SomeLegacyModule" 2>/dev/null | grep -v "@preconcurrency"

# 1.3 Double @MainActor (crash risk if SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor)
# If the build setting is already MainActor, remove explicit @MainActor from class declarations
grep -rn "@MainActor" . --include="*.swift" | grep "class " | head -20
```

### 1.5 nonisolated deinit — CRITICAL: crash risk for @MainActor classes
# Any @MainActor class with deinit that doesn't say nonisolated will crash
grep -rn "deinit" . --include="*.swift" | grep -v "nonisolated\|Tests\|// no-cleanup"
# If the class is @MainActor (explicit or via SWIFT_DEFAULT_ACTOR_ISOLATION), deinit MUST be nonisolated

# 1.6 FoundationModels isAvailable must NOT be hardcoded — CRITICAL: crash on non-AI devices
grep -rn "isAvailable.*return true\|isAvailable.*=.*true" . --include="*.swift" | grep -iv "test\|mock\|preview"
# Expected: 0 results — must use SystemLanguageModel.default.isAvailable

# 1.7 MainActor.assumeIsolated — only safe from guaranteed main-thread code
grep -rn "MainActor.assumeIsolated" . --include="*.swift" | head -10
# Verify each usage is from a callback documented as main-thread-only (NOT delegate callbacks from background queues)

# 1.8 Sheet onDismiss + continuation double-resume risk
grep -rn "withCheckedContinuation\|withUnsafeContinuation" . --include="*.swift" | head -10
# Cross-check: if the file also has .sheet with onDismiss, verify continuation is nil'd BEFORE dismiss
```

### 2. Error Handling (Apple HIG)

```bash
# 2.1 Data-loss scenarios must use .alert(), not banners
# Saving, persisting, or deleting should show alerts on failure — not silent banners
grep -rn "showBanner\|showToast\|showNotification" . --include="*.swift" | grep -i "save\|persist\|delete\|error"

# 2.2 No silent try? on persistence operations
grep -rn "try? modelContext.save\|try? context.save" . --include="*.swift"
# Expected: 0 results — save failures must be caught and shown to the user
```

### 3. SwiftUI State Management

```bash
# 3.1 @Observable coalescing — snapshot pattern needed when clearing data + showing completion
grep -rn "showCompletion = true\|isComplete = true" . --include="*.swift" | head -10
# If setting completion state AND clearing data simultaneously, ensure a snapshot is taken first

# 3.2 @Bindable for two-way bindings on @Observable models
grep -rn "@Environment.*\.self.*var" . --include="*.swift" | grep -v "@Bindable\|let " | head -10

# 3.3 Canvas does not observe @Observable — needs TimelineView wrapper
grep -rn "Canvas {" . --include="*.swift" | head -10
# If the Canvas depends on animating state, it must be wrapped in a TimelineView
```

### 4. SwiftData Patterns

```bash
# 4.1 @Model objects must not cross async boundaries — extract scalars first
grep -B3 -A3 "AsyncStream" . --include="*.swift" -r | grep -B2 -A2 "@Model"

# 4.2 @Model stored properties without defaults — CRITICAL: runtime crash
# All @Model properties must have default values or be Optional
grep -A20 "@Model" . --include="*.swift" -r | grep "var " | grep -v "=" | grep -v "?" | grep -v "//" | head -10
# Expected: 0 results — every non-optional @Model property needs a default value

# 4.3 Soft-delete pattern — hard-delete + recreate breaks SwiftData identity
grep -rn "context.delete\|modelContext.delete" . --include="*.swift" | head -10
# If undo is needed on this entity, prefer soft-delete (isPendingDeletion) over hard-delete

# 4.3 CloudKit migration safety
# RULE: NEVER rename @Model classes — CloudKit creates orphaned record types (permanent data loss)
# RULE: NEVER rename stored properties — creates orphaned CKRecord fields
# RULE: NEVER change raw ID → @Relationship without .custom migration
# Safe: adding optional properties, removing properties
#
# Detect @Model files changed WITHOUT a VersionedSchema update (the dangerous case)
changed_model_files=$(git diff HEAD --name-only -- "*.swift" | xargs grep -l "@Model" 2>/dev/null || true)
migration_files=$(git diff HEAD --name-only | grep -E 'VersionedSchema|MigrationPlan|SchemaV[0-9]' || true)
if [ -n "$changed_model_files" ] && [ -z "$migration_files" ]; then
    echo "⚠️  @Model files changed without VersionedSchema update — verify no schema change"
    echo "   $changed_model_files"
fi
#
# Detect potential @Model class renames — CRITICAL: permanent silent CloudKit data loss
git diff HEAD -- "*.swift" | grep -E "^-.*@Model" | grep -E "class [A-Z]"
git diff HEAD -- "*.swift" | grep -E "^\+.*@Model" | grep -E "class [A-Z]"
# If a class name was removed AND a different class name was added → this is a rename. STOP.
```

### 5. Timer & RunLoop Patterns

```bash
# 5.1 iOS timers must use RunLoop.common — Task.sleep pauses during scroll
grep -rn "Task.sleep" . --include="*.swift" | grep -i "timer\|tick\|interval\|countdown"
# Fix: use Timer.publish(every:on:in:) with RunLoop.common mode

# 5.2 watchOS uses Task.sleep (correct — no scroll context)
# No action needed for watchOS timer code
```

### 6. Entitlements & Capabilities

```bash
# 6.1 Fake entitlement keys — CRITICAL: CI rejection during Transporter
# WidgetKit needs NO entitlement. Live Activities use NSSupportsLiveActivities in Info.plist.
grep -rn "com.apple.developer.widgetkit\|com.apple.developer.live-activities" . --include="*.entitlements"
# Expected: 0 results — these are NOT real Apple entitlement keys

# 6.2 Every declared entitlement must match a real Apple capability
# Cross-reference entitlements files against Apple's documented capability list
grep -rn "com.apple.developer\." . --include="*.entitlements" | grep -v "app-groups\|associated-domains\|healthkit\|icloud\|in-app-payments\|push-notifications\|siri\|default-data-protection\|maps\|network-extensions\|autofill\|usernotifications\|authentication-services\|coremedia\|game-center\|homekit\|nfc\|personal-vpn\|wallet\|weatherkit\|carplay\|classkit\|exposure-notification\|fileprovider\|hotspot\|multipath\|system-extension"
# Any matches may be fabricated entitlement keys — verify each against Apple documentation
```

### 7. AppIntent Configuration

```bash
# 7.1 suggestedInvocationPhrase placement — CRITICAL: crashes ssu-cli-app with SIGILL during export
# Must be on AppShortcutsProvider, NOT on plain AppIntent structs
grep -rn "suggestedInvocationPhrase" . --include="*.swift" | head -20
# Verify each match is inside an AppShortcutsProvider, not a plain AppIntent struct

# 7.2 CFBundleIconName must be present in static Info.plist for App Intents
grep -rn "CFBundleIconName" . --include="*.plist" | head -10
# Expected: at least one match per target that uses App Intents

# 7.3 IntentDescription prohibited words — CRITICAL: TestFlight rejection (error 90626)
# App Intent descriptions cannot contain "Apple" or other trademarked terms
grep -rn "IntentDescription.*Apple" . --include="*.swift" | head -20
# Examples that will fail:
#   IntentDescription("Start a timer on Apple Watch")  ❌ Rejected
#   IntentDescription("Start a timer on your Watch")   ✅ Accepted
# Other prohibited terms to check: "iPhone", "iPad", "iOS", "Siri" (in descriptions)
```

### 8. Safety Checks

```bash
# 8.1 No force-try in production
grep -rn " try!" . --include="*.swift" | grep -v "Tests\|// safety:"

# 8.2 No fatalError in production
grep -rn "fatalError(" . --include="*.swift" | grep -v "Tests\|// safety:"

# 8.3 No debug print() in production
grep -rn " print(" . --include="*.swift" | grep -v "Tests\|#if DEBUG\|// safety:"

# 8.4 No force unwrap
grep -rn "[a-zA-Z0-9_]!" . --include="*.swift" | grep -v "Tests\|// safety:\|IBOutlet\|@objc\|\"" | head -20
```

## Severity Levels

| Check | Severity | Fix Before Commit? |
|-------|----------|-------------------|
| Missing `@MainActor` on Task | **CRITICAL** | Yes — memory corruption risk |
| `@Model` class rename (CloudKit) | **CRITICAL** | Yes — permanent silent data loss |
| Data-loss error uses banner not alert | **HIGH** | Yes — user data loss risk |
| `@Model` in AsyncStream | **HIGH** | Yes — data race risk |
| `@Model` property rename (CloudKit) | **HIGH** | Yes — orphaned CKRecord fields |
| `@Model` changed without VersionedSchema | **HIGH** | Yes — crashes on launch for existing users |
| Raw ID → `@Relationship` without `.custom` | **HIGH** | Yes — cross-version sync breaks |
| Silent `try?` on persistence save | **HIGH** | Yes — silent data loss |
| Missing `nonisolated deinit` on @MainActor class | **CRITICAL** | Yes — crash on deallocation |
| Hardcoded `isAvailable = true` for FoundationModels | **CRITICAL** | Yes — crash on non-AI devices |
| `MainActor.assumeIsolated` from background queue | **CRITICAL** | Yes — fatal error at runtime |
| `@Model` property without default value | **CRITICAL** | Yes — runtime crash |
| Sheet continuation double-resume | **CRITICAL** | Yes — fatal error at runtime |
| Prophylactic `@preconcurrency` on iOS 26 first-party imports | **MEDIUM** | Yes — masks real concurrency bugs |
| iOS timer uses Task.sleep | **MEDIUM** | Yes — UX bug during scroll |
| force unwrap / fatalError / try! | **MEDIUM** | Yes — crash risk |
| Fake entitlement keys (widgetkit, live-activities) | **CRITICAL** | Yes — CI rejection during Transporter |
| Entitlement not matching real Apple capability | **CRITICAL** | Yes — CI rejection during Transporter |
| `suggestedInvocationPhrase` on plain AppIntent | **CRITICAL** | Yes — crashes ssu-cli-app with SIGILL |
| Missing `CFBundleIconName` in Info.plist | **CRITICAL** | Yes — App Intents export failure |
| IntentDescription contains "Apple" or trademarked terms | **CRITICAL** | Yes — TestFlight rejection (error 90626) |
| Missing TimelineView on animated Canvas | **LOW** | If animation expected |

## Output Format

```
🔍 Apple Patterns Check

✅ Swift 6 Concurrency: 3/3 checks passed

⚠️  Error Handling: 1 issue
   [HIGH] TimerView.swift:42 — SwiftData save uses banner instead of .alert()
   Fix: Replace with .alert("Could Not Save", isPresented: $showError)

✅ SwiftUI State: 4/4 checks passed

❌ SwiftData: 1 CRITICAL issue
   [CRITICAL] IntelligenceStack.swift:88 — @Model object crosses AsyncStream boundary
   Fix: Extract (id: UUID, text: String) scalars before AsyncStream closure

✅ Timers: 2/2 checks passed
✅ Safety: 3/3 checks passed

---
Summary: 1 CRITICAL, 1 HIGH — fix before committing
```

## Pre-Commit Hook

Add to `.git/hooks/pre-commit` to enforce safety checks automatically:

```bash
#!/usr/bin/env bash
set -euo pipefail
ERRORS=()

SWIFT_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.swift$' || true)

if [ -n "$SWIFT_FILES" ]; then
    # No force-try
    matches=$(echo "$SWIFT_FILES" | xargs grep -n ' try!' 2>/dev/null | grep -v 'Tests\|// safety:' || true)
    [ -n "$matches" ] && ERRORS+=("force try! found:\n$matches")

    # No fatalError
    matches=$(echo "$SWIFT_FILES" | xargs grep -n 'fatalError(' 2>/dev/null | grep -v 'Tests\|// safety:' || true)
    [ -n "$matches" ] && ERRORS+=("fatalError() found:\n$matches")

    # No print()
    matches=$(echo "$SWIFT_FILES" | xargs grep -n ' print(' 2>/dev/null | grep -v 'Tests\|#if DEBUG\|// safety:' || true)
    [ -n "$matches" ] && ERRORS+=("print() found:\n$matches")
fi

# @Model rename detection (CloudKit CRITICAL)
REMOVED=$(git diff --cached -- "*.swift" | grep '^-' | grep -E '@Model|: PersistentModel' | grep -E 'class [A-Z]' || true)
ADDED=$(git diff --cached -- "*.swift" | grep '^\+' | grep -E '@Model|: PersistentModel' | grep -E 'class [A-Z]' || true)
if [ -n "$REMOVED" ] && [ -n "$ADDED" ]; then
    ERRORS+=("@Model class rename detected — permanent CloudKit data loss.\n  Use a new class + .custom migration instead.\n  Removed: $REMOVED\n  Added: $ADDED")
fi

if [ ${#ERRORS[@]} -gt 0 ]; then
    echo "🚫 Pre-commit FAILED:"
    for e in "${ERRORS[@]}"; do echo -e "  ❌ $e\n"; done
    exit 1
fi
```

## Remediation Reference

When a check fails, load the corresponding essentials file for the correct pattern:

| Check Category | Load for Fix |
|---------------|--------------|
| Swift 6 Concurrency (1.x) | `ios26-api-reference/essentials/swift6.md` |
| SwiftUI Patterns (2.x) | `ios26-api-reference/essentials/swiftui.md` |
| SwiftData Safety (3.x) | `ios26-api-reference/essentials/swiftdata.md` |
| Entitlements / Widgets (4.x) | `ios26-api-reference/essentials/widgets.md` |
| App Intents (5.x) | `ios26-api-reference/essentials/app-intents.md` |
| Force unwrap / unsafe (6.x) | `ios26-api-reference/reference/crash-cheat-sheet.md` |

## Integration with /ship

Run as Phase 2 (after implement, before archive):

```
Phase 2: Local Verification
├── Run /apple-patterns-check
├── Run archive build (catches strict concurrency errors)
└── Fix any CRITICAL or HIGH issues before pushing
```
