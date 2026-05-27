---
name: complete-feature
description: Complete a feature implementation with full validation. Use when a feature feels 'done' to ensure nothing is missed before committing.
invoke: "/complete-feature [feature-name] — Run full validation and completion workflow"
---

# Feature Completion Workflow

Run this skill when you believe a feature is complete. It runs comprehensive checks across six areas.

## Usage

```
/complete-feature "focus-timer-widget"
/complete-feature "category-ai-classification"
```

## Parallel Dispatch

Phases 1–4 run as three parallel subagents to maximize speed. Dispatch all three simultaneously, then aggregate results before continuing to Phase 5.

```
Coordinator (you)
├─► Agent A — Build + Test          [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash]
├─► Agent B — Code Quality          [Standard tier: claude-sonnet-4-6 / gpt-4.1 / gemini-3.1-pro]
└─► Agent C — Accessibility Audit   [Standard tier: claude-sonnet-4-6 / gpt-4.1 / gemini-3.1-pro]
         │
         ▼ (all three complete)
Coordinator — Phase 5: Documentation + Phase 6: App Store Readiness
```

### Agent A — Build + Test (Fast tier)

Spawn as `build-agent` (or `explore`). Prompt:

```
Run build and test verification for the iOS feature being completed.

1. Debug build (simulator):
   xcodebuild -scheme <scheme> -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' build 2>&1 | grep -E "error:|BUILD SUCCEEDED|BUILD FAILED"

2. Archive build (CRITICAL — catches MainActor isolation errors debug misses):
   xcodebuild -scheme <scheme> -configuration Release -destination 'generic/platform=iOS' archive 2>&1 | grep -E "error:|ARCHIVE SUCCEEDED|ARCHIVE FAILED"

3. Unit tests:
   <project-test-command> 2>&1 | tail -10

Report:
- BUILD: PASS/FAIL + first 3 errors if failed
- ARCHIVE: PASS/FAIL + first 3 errors if failed
- TESTS: X passed, Y failed + failing test names
```

### Agent B — Code Quality (Standard tier)

Spawn as `code-reviewer`. Prompt:

```
Run code quality checks on the changed files for this iOS feature.

Changed files: <list from git diff --name-only HEAD>

1. Apple patterns check — apply the apple-patterns-check skill rules:
   - Force unwraps, try!, fatalError() in production code
   - print() statements not in #if DEBUG
   - Missing @preconcurrency imports for EventKit/ActivityKit/CoreData/AVFoundation/SwiftData/Speech/Vision/HealthKit
   - Task { [weak self] without @MainActor
   - Missing nonisolated deinit on @MainActor classes
   - Hardcoded isAvailable=true for FoundationModels (must use SystemLanguageModel.default.isAvailable)
   - MainActor.assumeIsolated from background queue callbacks
   - @Model properties without default values
   - Sheet onDismiss + continuation double-resume risk

2. Code cleanliness:
   - TODO:/FIXME: without issue links
   - Commented-out code blocks (>5 lines)
   - Dead code (unreachable, unused variables)

Report each issue as: [SEVERITY] File:Line — Description
Severity: CRITICAL | HIGH | MEDIUM
```

### Agent C — Accessibility Audit (Standard tier)

Spawn as `code-reviewer`. Prompt:

```
Run accessibility audit on the SwiftUI views changed in this feature.

Changed Swift files with views: <list files containing 'View' from git diff --name-only HEAD>

Apply ios-accessibility skill rules:
1. VoiceOver: .accessibilityLabel on all interactive elements (Button, Toggle, custom controls)
2. Dynamic Type: font(.body) not hardcoded sizes; no fixed frame heights on text containers
3. Reduce Motion: withAnimation guarded by accessibilityReduceMotion where used
4. Color contrast: no color-only distinction for meaning; check against WCAG AA

Report each issue as: [SEVERITY] File:Line — Description
If no views changed, report: N/A
```

---

## Completion Checklist

### 1. Build Verification
- [ ] Debug build passes (simulator)
- [ ] Archive build passes -- CRITICAL: catches MainActor isolation errors debug misses
- [ ] No Swift 6 strict concurrency warnings

### 2. Test Verification
- [ ] All unit tests pass
- [ ] New code has corresponding test coverage
- [ ] UI tests pass if views changed

### 3. Code Quality

Delegate to `apple-patterns-check` for detailed pattern validation, then verify:
- [ ] No `TODO:` or `FIXME:` without issue links
- [ ] No force unwraps, `try!`, or `fatalError()` in production code
- [ ] No `print()` statements in production code

### 4. Accessibility

Delegate to `ios-accessibility` for detailed audit, then verify:
- [ ] VoiceOver labels on all interactive elements
- [ ] Dynamic Type support verified
- [ ] Reduce Motion respected
- [ ] Color contrast meets WCAG AA

### 5. Documentation
- [ ] ADR written if architectural decision made
- [ ] Project roadmap updated with completion status
- [ ] Feature plan moved to completed folder
- [ ] Project documentation updated if patterns changed

### 6. App Store Readiness (if applicable)
- [ ] App Store Connect metadata updated
- [ ] Screenshots generated if UI changed
- [ ] What's New text drafted
- [ ] Privacy manifest updated if new data collected

**Entitlements Audit** (common App Store rejection cause):
```bash
# All targets sharing data must have the SAME App Group identifier
grep -r "group\." <app-dir> --include="*.entitlements"

# Verify PrivacyInfo.xcprivacy exists for each extension target
find <app-dir> -name "PrivacyInfo.xcprivacy" -not -path "*/build/*"

# Verify no unused entitlements
grep -r "com.apple.developer" <app-dir> --include="*.entitlements"
```

## Post-Completion Actions

After all checks pass:

1. **Stage changes**: `git add -A`
2. **Commit**: Follow conventional commits (feat:, fix:, docs:, etc.)
3. **Push**: Only after all checks pass

## Example Session

```
User: /complete-feature "spark-timer"

Claude: Running feature completion workflow for "spark-timer"...

[1/6] Build Verification
  Build passed
  No Swift 6 warnings

[2/6] Test Verification
  Unit tests passed (42 tests)
  1 iOS test failing: TimerViewModelTests.testTimerState

[3/6] Code Quality
  apple-patterns-check: all passed
  No debug prints found

[4/6] Accessibility
  VoiceOver labels verified
  Dynamic Type not tested — recommend testing on device

[5/6] Documentation
  ADR: docs/adr-timer-state-management.md
  Roadmap updated
  Feature plan not yet in completed/

[6/6] App Store Readiness
  N/A — not a user-facing feature

---
Summary:
- 2 warnings to address
- 1 test to fix
- 1 documentation item to complete
```

## Integration with Other Skills

This skill coordinates with:
- `apple-patterns-check` — code pattern validation (Phase 3)
- `ios-accessibility` — VoiceOver/contrast verification (Phase 4)
- `verify-against-spec` — if the feature was spec-driven, run this first
- `merge-check` — run after completing, before merging to main
