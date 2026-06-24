---
name: merge-check
category: quality
description: Automatically verify code quality before merging to main. Triggers when user mentions merging, creating PRs, or asks if code is ready. Spawns parallel subagents for build, test, and lint verification. Use for quality gates before main branch integration.
invoke: "/merge-check — Pre-merge quality gate. Runs build, archive, test, and lint checks in parallel."
---

# Merge Check Skill

**Pre-merge quality gate with parallel verification.**

## Auto-Triggers

This skill activates when you say:
- "Merge this to main"
- "Is this ready to merge?"
- "Create a pull request"
- "Check if I can merge"
- "Verify this branch"

## Parallel Subagent Architecture

Instead of running checks sequentially, spawn **4 subagents in parallel**:

```
┌─────────────────────────────────────────────────────────────┐
│                      Merge Check Orchestrator                │
│                           (You)                              │
└──┬──────────────┬──────────────────┬──────────────┬─────────┘
   │              │                  │              │
┌──▼──────┐  ┌────▼─────┐  ┌────────▼───┐  ┌──────▼────────┐
│ Build   │  │ Archive  │  │ Test       │  │ Lint          │
│ • Debug │  │ • Release│  │ • Unit     │  │ • SwiftLint   │
│ • Watch │  │ • Strict │  │ • UI (fast)│  │ • Debug code  │
│ • Check │  │   concur.│  │ • Coverage │  │ • Isolation   │
└─────────┘  └──────────┘  └────────────┘  └───────────────┘
```

**CRITICAL**: The Archive subagent catches strict concurrency errors that simulator builds miss.
This is the #1 cause of Xcode Cloud failures.

> **Don't wait for merge to run archive.** For any session touching Swift concurrency, MainActor,
> or new services, run a release archive build *during* development — not just here.
> Fixing archive errors while the code is fresh is 10x faster than fixing them at merge time.

## Workflow

### Phase 1: Context Analysis (You)

1. Detect current branch
2. Check if behind main
3. Determine changed files
4. **Spawn 4 subagents in parallel**

### Phase 2: Parallel Verification (Subagents)

**Subagent 1: Build Verification**
```
Task: Verify debug builds compile
Inputs: Branch name, changed files
Outputs: Build status, error count, first 10 errors
Commands: Use your project's build commands (xcodebuild, swift build, etc.)
```

**Subagent 2: Archive Verification (catches Xcode Cloud failures)**
```
Task: Run release archive builds to catch strict concurrency errors
Inputs: Branch name, changed targets
Outputs: Archive status, concurrency/isolation errors
Note: Debug simulator builds do NOT catch MainActor isolation errors.
      Archive builds use -O optimization which enforces strict concurrency.
      This is the #1 reason Xcode Cloud archives fail.
```

**Subagent 3: Test Verification**
```
Task: Run test suite
Inputs: Branch name
Outputs: Test results, failure count, failed test names, coverage %
```

**Subagent 4: Lint & Quality**
```
Task: Run linting and code quality checks on changed files
Inputs: Changed Swift files
Outputs: Lint errors, warnings, debug code found, isolation violations
Commands:
  git diff --name-only origin/main...HEAD -- "*.swift"
  For each changed file: swiftlint lint [file]
  Check for print(), debugPrint(), NSLog
  Check for force unwraps added (!)
```

**Subagent 5: App-Extension Info.plist (only if the app embeds a `.appex`)**
```
Task: Verify every app extension carries NSExtension.NSExtensionPointIdentifier
Inputs: project.yml (source) and/or the exported .ipa (authoritative)
Outputs: Per-appex pass/fail + the point identifier
Commands:
  verify-appex-infoplist.sh --project <path/to/project.yml>   # source pre-check
  verify-appex-infoplist.sh --ipa <path/to/exported.ipa>      # authoritative, pre-upload
Note: A missing identifier builds, exports, and uploads cleanly, then fails Apple's
      ASYNC processing with error 90348 and silently drops from TestFlight. Neither the
      debug nor the archive build catches it. See ios-build → "App Extension Info.plist".
```

### Phase 3: Aggregation (You)

1. Collect results from all 4 subagents
2. Determine merge readiness:
   - **GREEN**: All checks pass → Ready to merge
   - **YELLOW**: Warnings only, tests pass → Merge with caution
   - **RED**: Build failures OR test failures → Fix before merge

**Explicit Merge Gates:**

| Check | Gate | Failure Action |
|-------|------|----------------|
| Build | BLOCKING | Fix compilation errors |
| Archive | BLOCKING | Fix strict concurrency/isolation errors |
| Unit Tests | BLOCKING | Fix failing tests or update test expectations |
| UI Tests | WARNING | Investigate, retry, document if flaky |
| Lint | WARNING | Fix reported violations, or suppress with an inline `swiftlint:disable` + reason comment |
| Coverage | INFO | No gate, informational only |

3. Present summary with specific fixes needed

## Usage Examples

### Explicit Check
```
User: /merge-check
→ Spawns 4 subagents
→ Aggregates results
→ Reports: Ready to merge
```

### Auto-trigger on Merge Intent
```
User: Merge this to main
→ Detects merge intent
→ Spawns 4 subagents
→ Reports: 2 warnings, 1 test failure
→ User fixes, retries
```

### Before PR Creation
```
User: Create PR for this branch
→ Runs merge-check first
→ Reports: Build failed
→ User fixes, then creates PR
```

## Cost Efficiency

**Parallel subagents:**
- 4 checks run simultaneously (Build, Archive, Test, Lint)
- Total time = slowest check (not sum)
- Typically 3-4 minutes vs 10-12 minutes sequential

**Early exit:**
- If build fails, other checks still report
- But merge blocked immediately
- User gets full picture of issues

## Output Format

```
═══════════════════════════════════════════════════════════════
  Merge Check Results — feature/my-branch
═══════════════════════════════════════════════════════════════

  Build (Subagent 1)
   • iOS: PASS (45s)
   • Watch: PASS (32s)

  Archive (Subagent 2)
   • App: PASS (catches strict concurrency errors)

  Tests (Subagent 3)
   • Unit tests: PASS (42 tests, 3s)
   • UI tests: 2 failures — MERGE BLOCKED
     - TimerViewModelTests.test_startSession
     - CloudSyncTests.test_syncConflict
   • Coverage: 67%

  Lint (Subagent 4)
   • SwiftLint: 0 errors, 3 warnings
   • Debug code: None found
   • Isolation: No violations

═══════════════════════════════════════════════════════════════
  Status: MERGE BLOCKED — Tests failing
═══════════════════════════════════════════════════════════════

Required fixes before merge:
  1. TimerViewModelTests.test_startSession — assertion failed

Emergency bypass (not recommended):
  git push --no-verify  # Skips pre-push hook only
```

## Integration with Other Skills

| Skill | When | Purpose |
|-------|------|---------|
| `complete-feature` | Feature done | Comprehensive validation |
| `merge-check` | Before merge | Quality gate with subagents |
| `apple-patterns-check` | Before commits | Pattern validation |
| `verify-against-spec` | Spec-driven work | Coverage vs design spec |

After merging to main, your CI/CD pipeline handles deployment.
Merge-check prevents broken code in main, which prevents broken releases.
