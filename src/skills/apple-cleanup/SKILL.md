---
name: apple-cleanup
description: Exhaustive engineering hardening of an iOS app. Reviews for Swift 6 compliance, crash risks, App Store rejection risks, and tech debt; builds a surgical plan; dispatches parallel subagents to fix all P0-P2 issues; then pushes an alpha to TestFlight. Use for pre-submission cleanup and code hardening, not design polish.
invoke: "/apple-cleanup [app] — EXHAUSTIVE cleanup: review → plan → fix ALL (P0-P2) → optimize → TestFlight alpha"
---

# Apple Cleanup — EXHAUSTIVE Engineering Hardening

> **Purpose:** Transform an app from "development mode" to "production hardened" through EXHAUSTIVE engineering excellence — crash-free, App Store compliant, fully optimized. This is MISSION-CRITICAL cleanup. Lives depend on it. No shortcuts. No omissions.

## ☠️ ULTIMATE RULES (NON-NEGOTIABLE)

1. **NEVER START UI TESTS** unless the user has explicitly approved it in the current conversation. This stands even if a plan says to run them. UI tests crash this user's Mac Mini.
2. **NEVER KEEP MULTIPLE VERSIONS OF A FEATURE IN CODE** (`v2Enabled`, `legacyMode`, `newFlow`, etc.). When replacing a feature, replace it. Delete the old path. Systematic modular variants (enum injection, DI, strategy protocols) are allowed; inline boolean forks are forbidden.
> 
> **Scope:** EXHAUSTIVE — ALL priorities must be addressed:
- **P0 (Critical):** Engineering crashes, data loss, security vulnerabilities — ZERO TOLERANCE
- **P1 (High):** Compliance rejection risks, Swift 6 improvements, performance, error handling — MUST FIX
- **P2 (Medium):** Tech debt, style cleanup, optimizations, documentation — MUST FIX
- **P3 (Low):** Minor refinements — address if identified

**THIS IS NOT OPTIONAL CLEANUP.** Every identified issue from P0 to P2 MUST be fixed before completion. No exceptions.

No design reviews, no marketing narratives.

## When to Use

- **Pre-submission hardening** — "The app works, now make it bulletproof for App Review"
- **Swift 6 compliance pass** — "Fix all concurrency warnings and strict mode issues"
- **Crash prevention sweep** — "Find and fix every potential crash"
- **Post-development cleanup** — "Clean up accumulated tech debt and AI slop"
- **Before TestFlight alpha** — "Engineering validation before distributing"

**Not for:** Design reviews, feature additions, version management, or marketing copy.

---

## Command Reference

```
/apple-cleanup              # Cleanup app in current directory
/apple-cleanup [app]        # Cleanup a specific app target
```

---

## Architecture: The Engineering Pipeline

```
/apple-cleanup [app]
│
├─► [Phase 1] ENGINEERING & COMPLIANCE REVIEW ────────────────────
│   │
│   ├─► Subagent: Engineering Panel (Swift 6, SwiftData, patterns)
│   └─► Subagent: Compliance Panel (App Store rejection risks)
│   │
│   └─► Output: Correlated findings with priority matrix
│
├─► [Phase 2] SURGICAL EXECUTION PLAN ────────────────────────────
│   │
│   ├─► Analyze findings → categorize into workstreams
│   ├─► Estimate effort and dependencies
│   └─► Output: Surgical execution plan
│
├─► [Phase 3] WORKTREE SETUP ─────────────────────────────────────
│   │
│   ├─► Create isolated worktree: `cleanup-{app}-{timestamp}`
│   ├─► Verify clean build in worktree
│   └─► Output: Ready workspace for automated fixes
│
├─► [Phase 4] PARALLEL CLEANUP SWARM ─────────────────────────────
│   │
│   ├─► Bug Fix Squad (crash risks, logic errors, edge cases)
│   ├─► Swift 6 Squad (concurrency, Sendable, @MainActor)
│   ├─► SwiftData Squad (models, queries, migrations)
│   ├─► Optimization Squad (performance, memory)
│   ├─► AI Deslop Squad (cleanup, style normalization)
│   └─► Integration Squad (unwired features, previews, accessibility)
│   │
│   └─► Output: All fixes applied, verified in worktree
│
├─► [Phase 5] VERIFICATION & VALIDATION ──────────────────────────
│   │
│   ├─► Build verification (zero errors)
│   ├─► Test suite execution
│   ├─► Archive verification (production validation)
│   ├─► SwiftLint enforcement
│   └─► Output: PASS/FAIL with detailed report
│
├─► [Phase 6] DOCUMENTATION ──────────────────────────────────────
│   │
│   ├─► Generate cleanup report (what was fixed)
│   ├─► Generate future tech debt doc
│   └─► Output: Complete documentation package
│
├─► [Phase 7] TESTFLIGHT ALPHA PUSH ──────────────────────────────
│   │
│   ├─► Commit all changes to worktree
│   ├─► Merge to main
│   ├─► Push alpha to TestFlight via Fastlane
│   ├─► Poll CI until build completes
│   ├─► Verify build distributed to Internal Testing
│   └─► Output: Build #N live on TestFlight
│
└─► [Phase 8] FINAL REPORT ───────────────────────────────────────
    │
    └─► Comprehensive report with TestFlight confirmation
```

---

## Phase 1: Engineering & Compliance Review

Spawn 2 parallel subagents reading the entire app codebase.

### Subagent 1: Engineering Review

```yaml
subagent_type: code-reviewer
prompt: |
  You are conducting an ENGINEERING REVIEW of {app_name} as a senior Apple
  engineering lead. Evaluate architecture, code quality, Swift 6 compliance,
  performance, and platform best practices.
  
  App path: [app-dir]/
  Shared packages: [shared-package-dir]/ (if any)
  
  MANDATORY: Load ios26-api-reference essentials before analyzing.
  Detect frameworks via import statements and load matching files:
  - essentials/swift6.md — strict concurrency patterns
  - essentials/swiftdata.md — model design, queries, migrations
  - essentials/swiftui.md — @Observable patterns, previews
  - essentials/speech.md — if app uses speech recognition
  - essentials/avfoundation.md — if app uses audio
  - (load other essentials as needed per detected imports)
  
  RECOMMENDED: Use Context7 MCP (if installed) for live API documentation verification.
  When encountering unfamiliar APIs or verifying signatures:
  1. Query Context7 for official Apple framework documentation (optional)
  2. Cross-reference with ios26-api-reference essentials
  3. Flag any API usage that conflicts with live documentation, or mark as "unverified" if Context7 is unavailable
  4. Prioritize live docs for API signatures, local essentials for crash prevention rules
  
  Evaluate:
  1. Swift 6 & Concurrency
     - SWIFT_STRICT_CONCURRENCY: complete enabled
     - @MainActor isolation on UI classes
     - @preconcurrency imports for EventKit/HealthKit/Speech/AVFoundation
     - Nonisolated deinit for MainActor classes (Apple confirmed crash fix)
     - Task cancellation handling
     - Sendable conformance
     - No @Model objects crossing async boundaries
  
  2. SwiftData & Persistence
     - Model design: relationships, cascade rules, default values
     - Migration strategy: VersionedSchema usage
     - Query efficiency: well-scoped fetches, no N+1 queries
     - Data integrity: invariants enforced at model level
     - Threading: proper context usage
  
  3. SwiftUI Patterns
     - @Observable (iOS 17+) vs ObservableObject
     - @State for selection (Observable list selection crash workaround)
     - #Preview coverage for every view
     - Theme token usage (no hardcoded colors/fonts)
     - Sheet environment propagation (.modelContext())
  
  4. Performance & Resources
     - Memory: retain cycles, [weak self] usage
     - Launch time: deferred work
     - Timer patterns: RunLoop.common on iOS, Task.sleep on watchOS
     - Background tasks: well-behaved
  
  5. Error Handling & Resilience
     - No force unwraps (try!, as!, !)
     - No fatalError in production paths
     - Graceful error handling at all boundaries
     - State recovery from interrupted states
  
  6. Architecture & Structure
     - MVVM separation: Views contain no business logic
     - ViewModels are testable in isolation
     - Service layer properly abstracted
     - Dependencies flow correctly
  
  7. Testing
     - Critical paths have test coverage
     - Tests validate behavior, not implementation
     - No shared state between tests
  
  Provide specific file:line references for every finding.
  
  OUTPUT FORMAT (markdown):
  ## Engineering Review: {App}
  
  ### Scores (1-10)
  | Dimension | Score | Notes |
  |-----------|-------|-------|
  | Swift 6 Compliance | X | ... |
  | SwiftData Usage | X | ... |
  | SwiftUI Patterns | X | ... |
  | Performance | X | ... |
  | Error Handling | X | ... |
  | Architecture | X | ... |
  | Test Coverage | X | ... |
  | **Overall** | **X** | ... |
  
  ### Critical Issues (P0 - crash/bug risks)
  - [ID: E-01] [Description] — [file:line] — [Fix]
  
  ### Improvements (P1 - quality/maintainability)
  - [ID: E-10] [Description] — [file:line] — [Approach]
  
  ### Tech Debt (P2 - address soon)
  - [ID: E-20] [Description] — [Impact]
```

### Subagent 2: Compliance Review

```yaml
subagent_type: explore
prompt: |
  You are conducting an APP STORE COMPLIANCE REVIEW of {app_name} as an App 
  Store Review team member. Find every rejection risk, guideline violation, 
  or compliance gap.
  
  Check:
  1. App Store Review Guidelines
     - 4.0 Design: sufficient value, not a "thin" app
     - 2.1 Performance: app completeness, no placeholder content
     - 2.3 Accurate Metadata: screenshots match UI, description accurate
     - 1.3 Kids Category: COPPA compliance if applicable
     - 3.1 Payments: no external purchase links
     - 4.2 Minimum Functionality: app does enough to justify existence
  
  2. Privacy & Data
     - PrivacyInfo.xcprivacy: present and complete
     - Required reason APIs: all used APIs declared
     - Usage descriptions in Info.plist:
       * Camera, Microphone, Speech — specific and honest descriptions
       * Location, Health, Reminders — if applicable
     * Data collection matches App Privacy label
     * ATT prompt if any tracking occurs
  
  3. Entitlements & Capabilities
     - Entitlements match code usage
     - No entitlements declared but unused
     - No capabilities used but not declared
     - App Groups: consistent identifiers across targets
     - Push notifications: registered if used
  
  4. Binary & Build
     - No private API usage
     - Minimum deployment target reasonable (iOS 26+)
     - App icon: all required sizes present
     - Launch screen present and not misleading
  
  5. Content & Legal
     - Terms of Service / Privacy Policy linked
     - Copyright notices present
     - No "Lorem ipsum" placeholder content
     - No competing platform references
  
  6. In-App Purchase (if applicable)
     - Products configured correctly
     - Restore purchases implemented
     - Subscription management accessible
     - Clear pricing display before purchase
  
  Files to read:
  - Info.plist, *.entitlements, PrivacyInfo.xcprivacy
  - project.yml (capabilities)
  - All code touching protected APIs
  
  OUTPUT FORMAT (markdown):
  ## Compliance Review: {App}
  
  ### Risk Level: [LOW / MEDIUM / HIGH / REJECTION LIKELY]
  
  ### Rejection Risks (P0 - will likely cause rejection)
  - [ID: C-01] [Guideline #] [Description] — [file:line] — [Required fix]
  
  ### Warnings (P1 - may cause rejection)
  - [ID: C-10] [Guideline #] [Description] — [Recommendation]
  
  ### Best Practices (P2 - recommended)
  - [ID: C-20] [Description] — [Why it matters]
  
  ### Checklist
  - [ ] Privacy manifest complete
  - [ ] All usage descriptions present and specific
  - [ ] Entitlements match code usage
  - [ ] No placeholder content
  - [ ] App icon complete
  - [ ] Privacy policy linked
```

---

## Phase 2: Surgical Execution Plan

After both panels return, correlate findings and create the execution plan.

### Priority Matrix — ALL MUST BE FIXED

| Finding Type | Priority | Squad Assignment | Status Requirement |
|--------------|----------|------------------|-------------------|
| P0 - Engineering crashes/data loss | CRITICAL | Bug Fix Squad | MUST FIX — Zero tolerance |
| P0 - Compliance (rejection risk) | CRITICAL | Integration Squad | MUST FIX — Zero tolerance |
| P1 - Engineering (quality/concurrency) | HIGH | Swift 6 / SwiftData / Optimization Squads | MUST FIX — No exceptions |
| P1 - Error handling improvements | HIGH | Bug Fix Squad | MUST FIX — No silent failures |
| P1 - Compliance (warnings) | HIGH | Integration Squad | MUST FIX — Prevent escalation |
| P2 - Tech debt, optimizations | MEDIUM | AI Deslop / Optimization Squads | MUST FIX — Clean slate required |
| P2 - Documentation, style | MEDIUM | AI Deslop Squad | MUST FIX — Maintainability |
| P3 - Minor refinements | LOW | AI Deslop Squad | Fix if identified |

**EXHAUSTIVE CLEANUP PRINCIPLE:**
- **P0:** Engineering crashes, data loss, security vulnerabilities — ZERO TOLERANCE. All must be fixed.
- **P1:** Compliance rejection risks, engineering improvements, error handling — ALL MUST BE FIXED. No exceptions.
- **P2:** Tech debt, optimizations, style, documentation — ALL MUST BE FIXED. Clean slate required.
- **P3:** Minor refinements — address if found.

**COMPLETION CRITERIA:** The cleanup is NOT complete until ALL P0, P1, and P2 issues identified in Phase 1 are resolved, verified, and documented.

### Execution Plan Template

```markdown
# Engineering Cleanup Plan: {App}

**Date:** YYYY-MM-DD
**Worktree:** cleanup-{app}-{timestamp}
**Estimated Duration:** X hours
**Risk Level:** [LOW / MEDIUM / HIGH / CRITICAL]

---

## Summary

| Category | P0 Critical | P1 High | P2 Medium | Total |
|----------|-------------|---------|-----------|-------|
| Engineering | X | X | X | X |
| Compliance | X | X | X | X |
| **Total** | **X** | **X** | **X** | **X** |

---

## Squad Assignments

### Bug Fix Squad — [X P0 issues]
| ID | Issue | File:Line | Root Cause | Fix Strategy |
|----|-------|-----------|------------|--------------|
| B-01 | [Description] | [location] | [cause] | [approach] |

### Swift 6 Squad — [X issues]
| ID | Issue | File:Line | Current | Target |
|----|-------|-----------|---------|--------|
| S6-01 | [Description] | [location] | [current] | [target] |

### SwiftData Squad — [X issues]
| ID | Issue | File:Line | Current | Target |
|----|-------|-----------|---------|--------|
| SD-01 | [Description] | [location] | [current] | [target] |

### Optimization Squad — [X issues]
| ID | Issue | File:Line | Current | Target |
|----|-------|-----------|---------|--------|
| OPT-01 | [Description] | [location] | [current] | [target] |

### AI Deslop Squad — [X issues]
| ID | Pattern | Files | Current | Target |
|----|---------|-------|---------|--------|
| SL-01 | [Pattern] | [files] | [example] | [target] |

### Integration Squad — [X issues]
| ID | Gap | Location | Missing | Implementation |
|----|-----|----------|---------|----------------|
| INT-01 | [Description] | [location] | [what's missing] | [how to add] |

---

## Dependency Graph

```
[Which fixes must happen before others]
```

---

## Success Criteria

- [ ] All P0 issues resolved
- [ ] Build succeeds with zero errors
- [ ] All tests pass
- [ ] Archive succeeds (production-ready)
- [ ] SwiftLint clean
- [ ] No AI slop remaining
- [ ] All features wired
- [ ] TestFlight alpha pushed and verified
```

---

## Phase 3: Worktree Setup

Create an isolated workspace for automated surgery:

```bash
# Create worktree
WORKTREE_NAME="cleanup-{app}-$(date +%Y%m%d-%H%M%S)"
git worktree add "../$WORKTREE_NAME" -b "$WORKTREE_NAME"
cd "../$WORKTREE_NAME"

# Generate project
xcodegen generate

# Verify clean build
echo "=== Initial Build Verification ==="
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | tail -20
```

---

## Phase 4: Parallel Cleanup Swarm

Dispatch specialized subagents in parallel batches.

### Squad Dispatch Patterns

**Bug Fix Squad (P0 critical):**
```yaml
subagent_type: coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a BUG FIX SPECIALIST in worktree: {worktree_path}
  
  CRITICAL BUG: {bug_description}
  Location: {file:line}
  Root Cause: {analysis}
  Risk: {crash/data loss/rejection}
  
  STEPS:
  1. Read affected file(s) in worktree
  2. Understand the bug and its impact
  3. Implement minimal, safe fix
  4. Build verify: `xcodebuild -scheme {App}-iOS build`
  5. Report: Fix applied + verification result
  
  CONSTRAINTS:
  - Minimal changes — fix only the bug
  - Follow ios26-api-reference essentials patterns strictly
  - No new dependencies
  - Build must pass
  
  Return: Fix summary + build status
```

**Swift 6 Squad:**
```yaml
subagent_type: coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a SWIFT 6 COMPLIANCE SPECIALIST in worktree: {worktree_path}
  
  ISSUE: {concurrency_issue}
  Location: {file:line}
  
  REQUIRED:
  1. Load ios26-api-reference/essentials/swift6.md before fixing
  2. Use Context7 MCP to verify any unfamiliar concurrency API patterns (optional)
  3. Cross-reference live findings with local crash prevention rules
  
  Common fixes:
  - Add @preconcurrency import for Apple frameworks
  - Add @MainActor to UI-related classes
  - Use nonisolated deinit for MainActor classes
  - Fix Sendable conformance issues
  - Add proper Task cancellation
  
  Verify with build after each change.
  
  Return: Changes made + compliance improvement
```

**SwiftData Squad:**
```yaml
subagent_type: coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a SWIFTDATA SPECIALIST in worktree: {worktree_path}
  
  ISSUE: {swifdata_issue}
  Location: {file:line}
  
  REQUIRED:
  1. Load ios26-api-reference/essentials/swiftdata.md before fixing
  2. Use Context7 MCP to verify SwiftData API signatures (optional)
  3. Query Context7 for migration patterns if schema changes are needed (optional)
  
  Common fixes:
  - Add default values to model properties
  - Fix query efficiency (avoid N+1)
  - Proper context threading
  - Migration strategy if schema changed
  
  Return: Changes made + data integrity verification
```

**Optimization Squad:**
```yaml
subagent_type: coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a PERFORMANCE OPTIMIZER in worktree: {worktree_path}
  
  TARGET: {optimization_description}
  Location: {file:line}
  
  Focus areas:
  - Memory leaks and retain cycles
  - Expensive computations in body
  - Inefficient SwiftData queries
  - Timer pattern issues
  - Background task efficiency
  
  Return: Optimizations applied + estimated improvement
```

**AI Deslop Squad:**
```yaml
subagent_type: coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are an AI DESLOP SPECIALIST in worktree: {worktree_path}
  
  TARGET: {pattern_description}
  Files: {file_list}
  
  Remove these patterns:
  - Unnecessary/obvious comments
  - Defensive checks abnormal for codebase
  - Casts to `any` to bypass types
  - Deep nesting (use early returns)
  - Debug prints in production
  - Force unwraps without safety comments
  - Inconsistent style
  
  CONSTRAINTS:
  - Keep behavior identical
  - Minimal, focused edits
  - Build must pass
  
  Return: Files cleaned + specific changes
```

**Integration Squad:**
```yaml
subagent_type: coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are an INTEGRATION SPECIALIST in worktree: {worktree_path}
  
  GAP: {gap_description}
  Location: {file:line}
  
  Tasks:
  - Add missing #Preview to SwiftUI views
  - Wire up placeholder buttons/actions
  - Add missing accessibility labels
  - Replace hardcoded colors with Theme tokens
  - Fix compliance issues (privacy descriptions, etc.)
  
  Return: Integrations completed + verification
```

---

## Phase 5: Verification & Validation

After all squads complete, run comprehensive verification:

```bash
#!/bin/bash
# verification.sh — Run in worktree

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICATION PIPELINE"
echo "═══════════════════════════════════════════════════════════════"

# 1. Project Generation
echo ""
echo "📋 Phase 1: Project Generation"
xcodegen generate 2>&1 | tail -5

# 2. Build Verification
echo ""
echo "🔨 Phase 2: Build Verification"
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | grep -E "error:|warning:|Build succeeded|BUILD FAILED" | tail -10

# 3. Archive Verification (catches production issues)
echo ""
echo "📦 Phase 3: Archive Verification"
make archive-{app} 2>&1 | tail -20

# 4. Test Execution
echo ""
echo "🧪 Phase 4: Test Execution"
swift test 2>&1 | tail -30

# 5. SwiftLint
echo ""
echo "🎨 Phase 5: SwiftLint"
swiftlint lint --quiet 2>&1 | head -20 || echo "SwiftLint clean or not configured"

# 6. Slop Scan
echo ""
echo "🧹 Phase 6: Slop Scan"
echo "Force unwraps:"
grep -rn " try!\| as!\|!." --include="*.swift" . | grep -v "Tests\|Preview\|// safety" | head -5 || echo "  None found ✓"

echo "Debug prints:"
grep -rn ' print(' --include="*.swift" . | grep -v '#if DEBUG\|Tests\|// ok' | head -5 || echo "  None found ✓"

echo "fatalError:"
grep -rn "fatalError(" --include="*.swift" . | grep -v "Tests\|// safety" | head -5 || echo "  None found ✓"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
```

**If verification fails:**
1. Capture specific errors
2. Dispatch debug subagent
3. Apply fixes
4. Re-verify
5. Max 3 retry cycles

---

## Phase 6: Documentation

Generate documentation artifacts:

### Cleanup Report
```markdown
# Engineering Cleanup Report: {App}
**Date:** YYYY-MM-DD
**Worktree:** cleanup-{app}-{timestamp}
**Commit:** {final_commit_hash}

## Summary
| Category | Count | Time |
|----------|-------|------|
| Bugs Fixed (P0) | X | Y hrs |
| Swift 6 Issues | X | Y hrs |
| SwiftData Issues | X | Y hrs |
| Optimizations | X | Y hrs |
| Slop Removed | X | Y hrs |
| Integrations | X | Y hrs |
| **Total** | **X** | **Y hrs** |

## Critical Fixes (P0)
- [B-01] [Description] — [File:Line] — [Impact if not fixed]

## Swift 6 Compliance
- [S6-01] [Description] — [Change made]

## SwiftData Improvements
- [SD-01] [Description] — [Change made]

## Performance Optimizations
- [OPT-01] [Description] — [Improvement]

## AI Slop Removed
- [SL-01] [Pattern] — [Files affected]

## Integrations Completed
- [INT-01] [Gap] — [Solution]

## Verification Results
- Build: [PASS/FAIL] (X errors, Y warnings)
- Tests: [X passed, Y failed]
- Archive: [PASS/FAIL]
- SwiftLint: [X warnings]
- Slop Scan: [PASS/FAIL]

## App Store Compliance
- Risk Level: [LOW/MEDIUM/HIGH]
- Rejection Risks: [X resolved]
- Warnings: [X resolved]
```

### Future Tech Debt Document
```markdown
# Future Tech Debt: {App}
**Identified during cleanup:** YYYY-MM-DD

## P1: Address Soon
| ID | Issue | Location | Effort | Impact |
|----|-------|----------|--------|--------|
| TD-01 | [Description] | [file] | M | High |

## P2: Backlog
| ID | Issue | Location | Effort | Impact |
|----|-------|----------|--------|--------|
| TD-10 | [Description] | [file] | L | Medium |

## Monitoring
- Watch for: [patterns that may cause future issues]
```

---

## Phase 7: TestFlight Alpha Push

After verification passes, push alpha to TestFlight:

> **macOS apps:** Standard fastlane `pilot distribute` and `xc_distribute_build` often fail for macOS due to API path differences. See the macOS fallback script below.

```bash
#!/bin/bash
# testflight-push.sh — Push verified build to TestFlight

set -e

APP="{app}"
WORKTREE="cleanup-{app}-{timestamp}"

echo "═══════════════════════════════════════════════════════════════"
echo "  TESTFLIGHT ALPHA PUSH"
echo "═══════════════════════════════════════════════════════════════"

# 1. Return to main repo and merge worktree
echo ""
echo "📥 Step 1: Merging worktree to main"
cd /path/to/main/repo
git add -A
git commit -m "cleanup($APP): engineering hardening pass

Automated cleanup including:
- Fixed X critical bugs (concurrency, crashes, logic)
- Resolved Y Swift 6 compliance issues
- Fixed Z SwiftData issues
- Applied N optimizations
- Removed M instances of AI slop
- Wired up P unwired features

Verification:
- Build: PASS (0 errors)
- Tests: X passed
- Archive: PASS
- SwiftLint: clean

Worktree: $WORKTREE"

git push origin main

# 2. Wait for CI to start
echo ""
echo "⏳ Step 2: Waiting for CI to start..."
sleep 30

# 3. Poll CI until complete (using check-build skill tools)
echo ""
echo "🔍 Step 3: Polling CI build status..."

MAX_RETRIES=60  # 30 minutes (30s intervals)
RETRY=0

while [ $RETRY -lt $MAX_RETRIES ]; do
    STATUS=$(xc_status 2>/dev/null | grep -E "succeeded|failed|in_progress" | head -1)
    
    if echo "$STATUS" | grep -q "succeeded"; then
        echo "✅ CI build succeeded!"
        break
    elif echo "$STATUS" | grep -q "failed"; then
        echo "❌ CI build failed!"
        echo "Check errors with: xc_get_issues"
        exit 1
    fi
    
    echo "  Build in progress... ($(($RETRY * 30))s elapsed)"
    sleep 30
    RETRY=$((RETRY + 1))
done

if [ $RETRY -eq $MAX_RETRIES ]; then
    echo "⏱️ CI polling timeout — check manually with xc_status"
    exit 1
fi

# 4. Distribute to Internal Testing
echo ""
echo "🚀 Step 4: Distributing to TestFlight Internal Testing..."

xc_distribute_build \
  --groups "Internal Testing" \
  --changelog "Engineering cleanup: Swift 6 compliance, crash fixes, optimizations"

echo ""
echo "✅ Alpha build pushed to TestFlight!"
```

### macOS TestFlight Fallback (When Standard Distribution Fails)

If the app is a **macOS app** and `xc_distribute_build` / `pilot distribute` fails:

```ruby
# fastlane/Fastfile — add these lanes for macOS

def asc_api_token
  Spaceship::ConnectAPI::Token.create(
    key_id: ENV["ASC_KEY_ID"],
    issuer_id: ENV["ASC_ISSUER_ID"],
    filepath: ENV["ASC_KEY_PATH"]
  )
end

lane :update_beta_changelog do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find(options[:bundle_id])
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }

  locs = build.get_beta_build_localizations
  existing = locs.find { |l| l.locale == "en-US" }

  if existing
    Spaceship::ConnectAPI.patch_beta_build_localizations(
      localization_id: existing.id,
      attributes: { whatsNew: options[:changelog] }
    )
  else
    Spaceship::ConnectAPI.post_beta_build_localizations(
      build_id: build.id,
      attributes: { locale: "en-US", whatsNew: options[:changelog] }
    )
  end
end

lane :distribute_macos_alpha do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find(options[:bundle_id])
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }
  group = app.get_beta_groups.find { |g| g.name == options[:group] }

  current = group.fetch_builds
  unless current.any? { |b| b.id == build.id }
    Spaceship::ConnectAPI.add_beta_groups_to_build(
      build_id: build.id,
      beta_group_ids: [group.id]
    )
  end
end
```

### TestFlight Verification

After push, verify the build is live:

```bash
#!/bin/bash
# verify-testflight.sh

echo "🔍 Verifying TestFlight distribution..."

# Get latest build info
BUILD_INFO=$(xc_list_tf_builds --limit 1)
BUILD_NUMBER=$(echo "$BUILD_INFO" | grep -oE "[0-9]+" | head -1)
BUILD_STATUS=$(echo "$BUILD_INFO" | grep -i "status")

echo "Latest build: #$BUILD_NUMBER"
echo "Status: $BUILD_STATUS"

# Check if internal testing has the build
echo ""
echo "Internal Testing Groups:"
xc_list_tf_builds --limit 1 --include-groups

echo ""
echo "✅ TestFlight Alpha Verification Complete"
```

---

## Phase 8: Final Report

```
═══════════════════════════════════════════════════════════════════
  APPLE CLEANUP — ENGINEERING HARDENING COMPLETE
  {App} — Production Ready
═══════════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
─────────────────
Duration:        X hours
Issues Found:    X (Engineering + Compliance)
Issues Fixed:    X
Files Modified:  X
Build Status:    ✅ PASS (0 errors)
Test Status:     ✅ X passed, 0 failed
Archive Status:  ✅ PASS (production-ready)
TestFlight:      ✅ Build #{N} live on Internal Testing

REVIEW PANEL SCORES (Before → After)
─────────────────────────────────────
Engineering:  X/10 → Y/10
Compliance:   X/10 → Y/10
Overall:      X/10 → Y/10

SQUAD PERFORMANCE
─────────────────
🐛 Bug Fix Squad:      X P0 issues fixed
⚡ Swift 6 Squad:      X compliance issues resolved
🗄️  SwiftData Squad:   X data issues fixed
⚡ Optimization Squad: X improvements applied
🧹 AI Deslop Squad:    X patterns cleaned
🔌 Integration Squad:  X gaps wired

CRITICAL FIXES (Would Have Caused Crashes/Rejection)
────────────────────────────────────────────────────
1. [B-01] [Description] — [Impact if not fixed]
2. [S6-01] [Description] — [Swift 6 crash risk]
3. [C-01] [Description] — [App Store rejection risk]

VERIFICATION DETAILS
────────────────────
Build:      ✅ Clean (0 errors, X warnings)
Tests:      ✅ All passed (X tests)
Archive:    ✅ Production-ready
SwiftLint:  ✅ Clean
Slop Scan:  ✅ No issues detected
Compliance: ✅ No rejection risks remaining

TESTFLIGHT STATUS
─────────────────
Build Number:   #{N}
Status:         🟢 Processing → 🟢 Ready
Distribution:   ✅ Internal Testing
Install Link:   [TestFlight link]

WHAT'S DIFFERENT NOW
────────────────────
- App is production-hardened and App Store ready
- All Swift 6 strict concurrency issues resolved
- All P0 crash/rejection risks eliminated
- Zero AI slop remaining
- All features fully wired and functional
- Alpha build live on TestFlight for verification

ARTIFACTS GENERATED
───────────────────
📄 Cleanup Report:      docs/cleanup/YYYY-MM-DD-{app}-cleanup-report.md
📄 Tech Debt Doc:       docs/cleanup/YYYY-MM-DD-{app}-tech-debt.md
💾 Commit:              {commit_hash}
🌿 Branch:              main
🚀 TestFlight Build:    #{N}

NEXT STEPS
──────────
1. Install TestFlight build and verify functionality
2. Address P1 tech debt items in next sprint
3. Proceed to beta when ready: /prepare-submission {app}

═══════════════════════════════════════════════════════════════════
  Status: APP HARDENED — ALPHA LIVE ON TESTFLIGHT
═══════════════════════════════════════════════════════════════════
```

---

## Error Handling & Recovery

### If CI Build Fails

```bash
1. Capture CI errors: xc_get_issues
2. Analyze failures — are they related to cleanup changes?
3. If related:
   a. Return to worktree
   b. Dispatch fix subagent with error context
   c. Re-verify locally
   d. Amend commit and re-push
4. If unrelated (infrastructure/signing):
   a. Document in report
   b. Escalate to /check-build skill
   c. Manual intervention may be needed
```

### If TestFlight Distribution Fails

```bash
1. Check error with xc_get_build
2. Common issues:
   - Missing compliance info → Fix and re-push
   - Signing issues → /check-build skill
   - Export compliance → Add ITSAppUsesNonExemptEncryption = NO
3. Re-trigger distribution after fix
```

### If Local Build Succeeds but CI Fails

```bash
1. Compare environments (local vs CI)
2. Check for:
   - Environment-specific code (#if DEBUG)
   - Missing files not committed
   - Xcode version differences
3. Fix and re-push
```

---

## Context Management

The main session orchestrates with minimal context usage:

```
Main Session:        ~40% context (planning, coordination)
├── Review Subagents: ~60% each (2 parallel, engineering + compliance)
├── Fix Subagents:    ~50% each (batched by dependency)
└── Verification:     Automated (minimal context)

Total time: ~2-4 hours depending on issue count
```

---

## Integration with Other Skills

| When This Happens | Use This Skill |
|-------------------|----------------|
| CI/build issues | `/check-build` |
| Need feature work | `/implement-feature` |
| Ready for App Store | `/prepare-submission` |
| Just want review | `/apple-review` |
| Session review | `/review-session` |

---

## Success Criteria — EXHAUSTIVE VERIFICATION

### MANDATORY — All Must Pass

✅ **ALL P0 issues resolved** (crashes, data loss, security vulnerabilities) — ZERO TOLERANCE  
✅ **ALL P1 issues resolved** (rejection risks, Swift 6 improvements, error handling) — NO EXCEPTIONS  
✅ **ALL P2 issues resolved** (tech debt, optimizations, style, documentation) — CLEAN SLATE  
✅ **Build passes with zero errors**  
✅ **All tests pass**  
✅ **Archive succeeds** (production-ready)  
✅ **SwiftLint clean**  
✅ **No AI slop detected**  
✅ **All features wired**  
✅ **TestFlight alpha live and verified**  

### EXHAUSTIVE CLEANUP PRINCIPLE

**The cleanup is NOT complete until:**
1. Every P0, P1, and P2 issue identified in Phase 1 is resolved
2. All fixes are verified (build, archive, tests)
3. Documentation is updated
4. TestFlight alpha is live

**No shortcuts. No omissions. Mission-critical quality.**

---

*Engineering excellence: crash-free, compliant, optimized, shipped. No exceptions. No shortcuts.*
