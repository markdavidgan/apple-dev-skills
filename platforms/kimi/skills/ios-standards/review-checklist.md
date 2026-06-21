# Review Checklist

> Systematic validation for all iOS code changes. Load this module when asked to "review" or "check" code.

## Cross-Cutting Checks

### 1. Build Verification

**MUST PASS** before any code is considered valid:

```bash
# Simulator build (fast, catches most errors)
xcodegen generate && xcodebuild -scheme <YourScheme> \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | grep -E "error:|warning:.*concurrency|warning:.*deprecated|warning:.*never used"
```

Expected output: **Empty** (no errors, no concurrency warnings, no deprecation warnings, no unused variable warnings)

### 1b. Archive Verification (catches CI failures)

**CRITICAL**: Run archive builds to catch MainActor isolation errors that simulator builds miss:

```bash
# Archive build (slower, catches strict concurrency errors)
xcodebuild -scheme <YourScheme> -configuration Release \
  -destination 'generic/platform=iOS' archive
```

**Why**: Debug/simulator builds use `-Onone` which relaxes isolation checks. Archive builds use `-O` with full strict concurrency enforcement.

### 2. Every SwiftUI File Has Preview

**CHECK**: Does the file contain `#Preview`?

```swift
// Required pattern
#Preview("Description") {
    MyView()
}

// Or with environment setup
#Preview {
    PreviewContainer {
        MyView()
    }
}
```

### 3. No Hardcoded Design Values

**CHECK**: Any raw numbers for colors, spacing, or fonts?

| Wrong | Correct |
|-------|---------|
| `.padding(16)` | `.padding(Theme.Spacing.lg)` or `.padding(.lg)` |
| `.background(Color.blue)` | `.background(Theme.primary)` |
| `.cornerRadius(8)` | `.cornerRadius(Theme.Radius.medium)` |
| `.font(.title)` | `.font(Theme.Font.title)` |

### 4. Proper Error Handling

**CHECK**: Are errors silently ignored?

```swift
// ❌ WRONG — Silent failure
try? modelContext.save()

// ✅ CORRECT — At minimum, log the error
do {
    try modelContext.save()
} catch {
    errorMessage = error.localizedDescription
    logger.error("Failed to save: \(error)")
}
```

## Module-Specific Checks

### If File Contains SwiftUI Views

Load `swiftui.md` and verify:
- [ ] Uses `@Environment` for ViewModels
- [ ] ViewModels use `@Observable`, not `ObservableObject`
- [ ] Has `#Preview`
- [ ] Uses design system constants (Theme.*)

### If File Contains Async/Closures

Load `concurrency.md` and verify:
- [ ] No `[weak self]` in View structs
- [ ] `@Sendable` closures use `Task { @MainActor in }` for state
- [ ] SwiftData models captured by ID, not reference
- [ ] Services use `nonisolated(unsafe) static let shared`

### If File Contains SwiftData

Load `swiftdata.md` and verify:
- [ ] `@Model` types not captured in closures
- [ ] `modelContext` from `@Environment` in Views
- [ ] Proper `#Predicate` syntax
- [ ] New `@Model` entities or relationships have a `VersionedSchema` + `SchemaMigrationPlan`
- [ ] Test containers use full production schema (all `@Model` types) + unique URLs
- [ ] `PreviewContainer` includes all `@Model` types

**CloudKit migration safety** (if app uses CloudKit sync — see `swiftdata.md` CloudKit section):
- [ ] No `@Model` class was renamed — CRITICAL: permanent silent data loss cross-version
- [ ] No stored property was renamed — HIGH: orphaned CKRecord fields on old devices
- [ ] No raw ID → `@Relationship` change without `.custom` migration stage
- [ ] If `@Model` file changed, a `VersionedSchema` bump was included — HIGH: schema change without migration crashes on launch

### If File Uses System Frameworks

Load `ios26-apis.md` and verify:
- [ ] `AVAudioApplication` for permissions
- [ ] `@preconcurrency` imports where required
- [ ] No deprecated API warnings

## Review Output Format

When reviewing code, structure your response as:

```
## Summary
- Files reviewed: N
- Issues found: N critical, N warnings
- Build status: ✅ PASS / ❌ FAIL

## Critical Issues (MUST FIX)

### File: Path/To/File.swift
**Line X**: [Brief description]
**Rule**: [Which standard was violated]
**Fix**: [Specific code change]

```swift
// Current (wrong):
[code]

// Should be:
[code]
```

## Warnings (SHOULD FIX)
[...]

## Correct Patterns Found ✅
[Acknowledge what was done right]
```

## Pre-Commit Checklist

Before suggesting code is complete:

- [ ] Build passes with no errors
- [ ] Archive build passes (if applicable)
- [ ] No concurrency warnings
- [ ] No deprecated API warnings
- [ ] All SwiftUI files have previews
- [ ] No hardcoded design values
- [ ] Proper error handling (not silent `try?`)
- [ ] Accessibility identifiers on interactive elements
