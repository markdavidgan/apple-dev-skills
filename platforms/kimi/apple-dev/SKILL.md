---
name: apple-dev
description: Comprehensive Apple platform development skill covering Swift 6, SwiftUI, design, accessibility, concurrency, App Store Connect, testing, and advanced workflows. Master reference for iOS 26+ development.
---

# Apple Dev Skills — Master Reference

> **Platform Note:** This is a consolidated skill for Kimi Code. All 19 apple-dev skills are included below. For granular skill loading, use Claude Code or Cursor.
> **Repository:** https://github.com/markdavidgan/apple-dev-skills

## Table of Contents

| # | Skill | Domain | Description |
|---|-------|--------|-------------|
| 1 | apple-cleanup | Quality | Exhaustive engineering hardening of an iOS app. Reviews for Swift 6 compliance, crash risks, App Store rejection risks, and tech debt; builds a surgical plan; dispatches parallel subagents to fix all P0-P2 issues; then pushes an alpha to TestFlight. Use for pre-submission cleanup and code hardening, not design polish. |
| 2 | apple-patterns-check | Quality | Validate iOS code against Apple's best practices. Run during /ship, before commits, or when reviewing code for Apple-specific compliance. Triggers on "check patterns", "apple check", "pre-commit check", or "validate swift code". |
| 3 | apple-polish | Quality | Design and keynote-readiness craftsmanship review of an iOS app. Evaluates through Jony Ive (visual obsession) and Steve Jobs (demo readiness) perspectives, presents prioritized findings, then orchestrates parallel agents to fix selected issues and push a TestFlight build. Use for design polish, not engineering bugs. |
| 4 | apple-review | Quality | Comprehensive Apple-grade review of an iOS app covering design (Apple design leader perspective), engineering (architecture and code quality), compliance (App Store rejection risks), and keynote readiness (product story and demo quality). Use when asked for a full app review, Apple-quality audit, design critique, HIG compliance check, App Store readiness assessment, or "would Apple approve this", "keynote ready", "WWDC ready". |
| 5 | asc-build-check | ASC | Check the latest CI build status and debug failures using the App Store Connect MCP server. Use when user says "check build", "what broke", "CI status", "build failing", or asks about recent build failures. Also use for signing issues, provisioning profiles, bundle ID capabilities, or Developer Portal queries. |
| 6 | asc-submission | ASC | Prepare an app for App Store submission or TestFlight distribution using the App Store Connect MCP server. Use when user says "prepare submission", "submit to app store", "prepare for review", "update metadata", "set what's new", "check submission readiness", "distribute to testflight", or wants to manage App Store Connect metadata, screenshots, or review submissions. |
| 7 | complete-feature | Workflow | Complete a feature implementation with full validation. Use when a feature feels 'done' to ensure nothing is missed before committing. |
| 8 | ios-accessibility | iOS | Audit SwiftUI views for accessibility issues and apply fixes. Use whenever VoiceOver, Dynamic Type, accessibility labels, screen readers, or App Store accessibility is mentioned. Also trigger when asked to "make it accessible", improve UI quality broadly, or prepare for App Store review. |
| 9 | ios-asc | iOS | App Store Connect MCP tools for signing certificates, provisioning profiles, TestFlight builds, and app submission. |
| 10 | ios-build | iOS | iOS build system patterns, validation workflows, XcodeGen, and common build failure solutions. Use for build errors, validation, and CI/CD setup. |
| 11 | ios-design | iOS | SwiftUI design system patterns, iOS 26 Liquid Glass, accessibility best practices, and preview patterns. |
| 12 | ios-simulate | iOS | iOS Simulator workflows, xcrun simctl commands, screenshot automation, and device management. |
| 13 | ios-standards | iOS | Swift 6.0+ standards, strict concurrency patterns, modern SwiftUI with @Observable, and @MainActor isolation. Essential for iOS 26+ development. Updated 2026-04-04 with crash audit findings. |
| 14 | ios-test | iOS | XCTest patterns, SwiftData testing with in-memory containers, UI testing, and test performance budgets for iOS. |
| 15 | ios26-api-reference | iOS | Authoritative iOS/macOS/watchOS 26 API reference with 3-tier smart loading. Prevents crashes from hallucinated APIs. Trigger on ANY code involving FoundationModels, SpeechTranscriber, SpeechAnalyzer, @Generable, LanguageModelSession, glassEffect, SwiftData, @Observable, Live Activity, App Intents, Vision, VideoToolbox, Network.framework, AVAudioEngine, MenuBarExtra, NSPanel, WKHapticType, or WCSession. Also trigger on Swift 6 concurrency errors, Sendable warnings, or @MainActor isolation issues. |
| 16 | merge-check | Workflow | Automatically verify code quality before merging to main. Triggers when user mentions merging, creating PRs, or asks if code is ready. Spawns parallel subagents for build, test, and lint verification. Use for quality gates before main branch integration. |
| 17 | regression-test | Workflow | Add regression tests when fixing bugs. Use when user says "fix this bug", "this is broken", "fix this issue", or when implementing any bug fix to prevent recurrence. |
| 18 | swift6-concurrency | Workflow | Handle Swift 6 concurrency patterns. Use when encountering Sendable warnings, data race errors, MainActor isolation issues, or framework interop problems (EventKit, Speech, AVFoundation, etc.). Trigger on "Swift 6 error", "Sendable", "data race", "MainActor", "concurrency warning", or "strict concurrency". |
| 19 | verify-against-spec | Workflow | Use when finishing a spec-driven feature, when asked to verify nothing was missed, when approaching context limits on a long feature session, or after hearing "make sure everything is implemented". Cross-checks the design spec against the actual implementation, in parallel with build and doc verification. |

---

## How to Use This Reference

This document contains all Apple Dev Skills concatenated in order. Use the Table of Contents above to navigate.
Each skill is bounded by `<!-- BEGIN SKILL: name -->` and `<!-- END SKILL: name -->` markers.

For **executable validation**, use the plugin tools:
- `pattern-check` — Run mechanical Swift 6 / SwiftUI / SwiftData / entitlements validation
- `api-lookup` — Query iOS 26 API signatures and anti-hallucination references

---

<!-- BEGIN SKILL: apple-cleanup -->

# apple-cleanup

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
  
  MANDATORY: Use Context7 MCP for live API documentation verification.
  When encountering unfamiliar APIs or verifying signatures:
  1. Query Context7 for official Apple framework documentation
  2. Cross-reference with ios26-api-reference essentials
  3. Flag any API usage that conflicts with Context7 documentation
  4. Prioritize Context7 for API signatures, local essentials for crash prevention rules
  
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
  
  MANDATORY: 
  1. Load ios26-api-reference/essentials/swift6.md before fixing
  2. Use Context7 MCP to verify any unfamiliar concurrency API patterns
  3. Cross-reference Context7 findings with local crash prevention rules
  
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
  
  MANDATORY:
  1. Load ios26-api-reference/essentials/swiftdata.md before fixing
  2. Use Context7 MCP to verify SwiftData API signatures (ModelContext, Query, predicates)
  3. Query Context7 for migration patterns if schema changes are needed
  
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

<!-- END SKILL: apple-cleanup -->

---

<!-- BEGIN SKILL: apple-patterns-check -->

# apple-patterns-check

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

<!-- END SKILL: apple-patterns-check -->

---

<!-- BEGIN SKILL: apple-polish -->

# apple-polish

# Apple Polish

Design and product craftsmanship, automated. Reviews the app through the obsessive eyes of Apple's greatest designers and product visionaries, presents what needs fixing, and then dispatches agents to make it real — ending with a fresh TestFlight build.

This is the complement to `/apple-cleanup`:
- `/apple-cleanup` → engineering hardening (Swift 6, crashes, App Store compliance)
- `/apple-polish` → design craftsmanship (visual polish, UX flows, delight, product story)

## When to Use

- "The app works but doesn't *feel* Apple yet"
- Before a demo, press review, or App Store featured app consideration
- After completing a major feature — does it still feel coherent?
- "Would Jony Ive approve of this?"
- "Is this keynote-ready?"
- Periodic design quality audits

**Not for:** Engineering bugs, Swift 6 compliance, App Store rejection risks — use `/apple-cleanup`.

---

## Command Reference

```
/apple-polish              # Review and polish app in current directory
/apple-polish [app]        # Target a specific app subdirectory
```

---

## Architecture: The Polish Pipeline

```
/apple-polish [app]
│
├─► [Pre-Work] FILE MANIFEST ─────────────────────────────────────
│   Main thread: discover views, design system, onboarding
│
├─► [Phase 1] DESIGN & KEYNOTE REVIEW (parallel) ──────────────────
│   │
│   ├─► Subagent: Design Panel (Jony Ive perspective)
│   │   Visual craft, HIG, flows, typography, delight, empty states
│   │
│   └─► Subagent: Keynote Panel (Steve Jobs perspective)
│       One-sentence story, 90s demo script, "one more thing",
│       cringe test, platform narrative
│
├─► [Phase 2] INTERACTIVE SELECTION ───────────────────────────────
│   Present correlated findings to user, grouped by priority
│   User selects which issues to fix
│
├─► [Phase 3] ORCHESTRATION PLAN ─────────────────────────────────
│   Spawn planning agent → sequenced workstreams + dependencies
│
├─► [Phase 4] PARALLEL IMPLEMENTATION SQUADS ─────────────────────
│   │
│   ├─► Visual Polish Squad (typography, colors, spacing, icons)
│   ├─► UX Flow Squad (navigation, empty states, error flows)
│   ├─► Delight Squad (transitions, haptics, micro-interactions)
│   └─► Narrative Squad (copy, onboarding story, in-app messaging)
│
├─► [Phase 5] VERIFICATION ───────────────────────────────────────
│   Build passes, Xcode Previews compile, spot-check
│
└─► [Phase 6] TESTFLIGHT PUSH ────────────────────────────────────
    Commit → push → CI → TestFlight Internal Testing
```

---

## Pre-Work: Build the File Manifest

Before spawning any agents, the main thread MUST build a targeted file manifest. Design and Keynote panels only need views — skip services, models, and tests entirely.

```bash
# All View/UI files with line counts
find [APP_DIR] -name "*.swift" \
  \( -path "*/Views/*" -o -path "*/View.swift" -o -name "*View.swift" \
     -o -path "*/DesignSystem/*" -o -path "*/Design/*" \
     -o -name "*ViewModel.swift" -o -path "*/ViewModels/*" \
     -o -path "*/Onboarding*" -o -name "App.swift" \) \
  -not -path "*/Tests/*" | xargs wc -l | sort -rn | head -50
```

Build a manifest like:

```
FILE MANIFEST — Views Only:
App/ — App.swift (120), ContentView.swift (80)
Onboarding/ — OnboardingView.swift (340), WelcomeView.swift (210)
Home/ — HomeView.swift (545), DashboardView.swift (280)
Editor/ — EditorView.swift (620), ToolbarView.swift (190)
Live/ — LiveSessionView.swift (480), ControlSurfaceView.swift (320)
Components/ — CardView.swift (150), EmptyStateView.swift (95), ...
DesignSystem/ — Typography.swift (120), Colors.swift (95), Spacing.swift (60)
ViewModels/ — HomeViewModel.swift (380), SessionViewModel.swift (290)
```

Assign files:
- **Design Panel**: All views, DesignSystem, ViewModels
- **Keynote Panel**: App entry, Onboarding, Home, primary editor/action flow, DesignSystem

---

## Phase 1: Design & Keynote Review

Spawn 2 parallel subagents with the file manifest pre-loaded.

### Subagent 1: Design Panel

**Persona:** Jony Ive and the Apple design team reviewing a product the night before announcement. Every pixel is intentional. Every transition earns its place. The question isn't "does it work?" — it's "does it feel inevitable?"

```yaml
subagent_type: code-reviewer
prompt: |
  You are conducting a DESIGN REVIEW of {app_name} with the critical eye of
  Apple's most obsessive designers. Every pixel, every transition, every moment
  of friction matters. You MUST produce a structured review with scores and
  specific file:line references.

  ## File Manifest
  [PASTE FILE MANIFEST HERE — Views only]

  ## Reading Strategy
  Read files in this priority order. Stop after 15-20 files and write your review.
  1. MUST READ: App entry, Home/main view, onboarding, primary editor, live/session
     view, ALL DesignSystem files, ALL ViewModels
  2. SHOULD READ (if context allows): Components, Controls, edge case views
  3. SKIP: Services, Models, Tests, Extensions, Utilities

  An incomplete review based on 15 files is infinitely more valuable than reading
  40 files and producing no output. After reading MUST READ files, STOP and write.

  ## Evaluation Criteria

  ### 1.1 First Impressions & Onboarding
  - What does the user see on first launch? Welcoming or overwhelming?
  - Skippable onboarding? Does it respect the user's time?
  - Time-to-value: taps from launch to first meaningful interaction?
  - Does the first screen earn the user's trust?

  ### 1.2 Core Flow & Navigation
  - Map the primary user journey (the ONE thing people open the app to do)
  - Count taps/gestures required for the most common actions
  - Dead ends? Confusing back-navigation? Orphaned screens?
  - Does navigation feel spatial and predictable (iOS stack/tab patterns)?
  - Clear information hierarchy on each screen?

  ### 1.3 Visual Craft & Polish
  - Typography: consistent scale? Orphaned styles (hardcoded fonts vs tokens)?
  - Color: cohesive palette? Semantic colors used correctly? Hardcoded hex?
  - Spacing: consistent system? Cramped or floating elements?
  - Icons: consistent SF Symbol weight and optical alignment?
  - Dark mode: intentional or just inverted?
  - Dynamic Type: graceful adaptation at all text sizes?
  - Are DesignSystem tokens actually used, or do views hardcode their own values?

  ### 1.4 Motion & Feedback
  - Are transitions meaningful or gratuitous?
  - Do interactive elements provide immediate haptic/visual feedback?
  - Loading states: skeleton views or spinners? (spinners = lazy)
  - Does the app feel responsive — do taps register instantly?
  - Micro-interactions that reward the user?

  ### 1.5 Delight & WOW Factor
  - Is there at least one moment that makes a user want to show someone else?
  - Does the app have personality without being gimmicky?
  - Thoughtful details that reveal themselves over time?
  - Does the success/completion state feel rewarding?
  - Would someone pause and think "someone really cared about this"?

  ### 1.6 Simplicity & Focus
  - Can you explain what the app does in one sentence?
  - Is every screen earning its place? Could any be merged or removed?
  - Minimal, well-defaulted settings — or option overload?
  - Does the app resist feature creep? Is the scope disciplined?

  ### 1.7 HIG Compliance
  - Standard iOS patterns: navigation bars, tab bars, sheets, alerts
  - Platform conventions: swipe-to-delete, pull-to-refresh where expected
  - Accessibility: VoiceOver labels, Dynamic Type, sufficient contrast
  - Latest platform capabilities leveraged (Liquid Glass on iOS 26, etc.)?
  IMPORTANT: Verify with Grep, not memory:
  - Count `accessibilityLabel` occurrences vs interactive views
  - Check for hardcoded font sizes vs Dynamic Type modifiers
  - Grep for `.foregroundColor(` with hex Color literals

  ### 1.8 Edge Cases & Empty States
  - No data? Is the empty state helpful or sad?
  - Permissions denied? Recovery flow?
  - Extremely long text input? Truncation graceful?
  - User interrupts a flow midway? State preserved?

  ### Mechanical Audits (run these checks)
  - Count `accessibilityLabel` / `accessibilityHint` vs total interactive views
    (ratio < 0.5 = poor VoiceOver coverage)
  - `grep -rn "TODO\|FIXME\|Lorem\|placeholder" --include="*.swift" -i` in views
  - `grep -rn '\.lineLimit(1)' --include="*.swift"` (truncation risks on key content)
  - `grep -rn 'Color(red:\|Color(hex:\|UIColor(red:' --include="*.swift"` outside DesignSystem
  - `grep -rn '"[A-Z][a-z].*"' --include="*.swift"` for hardcoded user-visible strings
  - `grep -rn 'font(.system(size:' --include="*.swift"` (hardcoded font sizes)

  ## OUTPUT FORMAT (MANDATORY)

  ## Design Review: {App}

  ### Overall Impression
  [2-3 sentences: gut reaction as a design leader — honest, specific]

  ### Scores (1-10)
  | Dimension | Score | Notes |
  |-----------|-------|-------|
  | First Impression | X | ... |
  | Core Flow | X | ... |
  | Visual Craft | X | ... |
  | Motion & Feedback | X | ... |
  | Delight Factor | X | ... |
  | Simplicity | X | ... |
  | HIG Compliance | X | ... |
  | Edge Cases | X | ... |
  | **Overall** | **X** | ... |

  ### Mechanical Audit Results
  - VoiceOver coverage: X labels across Y files (ratio: Z)
  - Placeholder/TODO strings: [count, locations]
  - Hardcoded colors outside DesignSystem: [count]
  - Truncation risks (.lineLimit on key content): [count]
  - Hardcoded font sizes: [count]

  ### Delights (what's already great)
  - [Specific praise — file:line]

  ### Critical Issues (P0 — fix before any demo or submission)
  - [ID: D-01] [Description] — [file:line] — [Recommended fix]

  ### Design Gaps (P1 — significant UX improvements)
  - [ID: D-10] [Description] — [file:line] — [Approach]

  ### Polish Targets (P2 — elevates the experience)
  - [ID: D-20] [Description] — [file:line] — [Approach]

  ### Missing Elements (P3 — would round out the product)
  - [ID: D-30] [Description] — [Why it matters]

  CRITICAL: You MUST produce the structured review above before your response ends.
  Do NOT spend more than 60% of your work reading files. After reading MUST READ
  files, STOP and write your review.
```

### Subagent 2: Keynote Panel

**Persona:** Steve Jobs, the night before WWDC. He's about to walk on stage and demo this app to the world. He doesn't care about the architecture or test coverage — he cares about the *story*. One moment of confusion, hesitation, or ugliness and the whole thing falls apart.

```yaml
subagent_type: code-reviewer
prompt: |
  You are Steve Jobs reviewing {app_name} the night before a WWDC keynote.
  Tomorrow you walk on stage and demo this app live to the world. You MUST
  produce a structured review with a demo script, scores, and file:line references.

  ## File Manifest
  [PASTE FILE MANIFEST HERE — Views only]

  ## Reading Strategy
  Read files in this order. Stop after ~15 files and write your review.
  1. MUST READ: App entry, Onboarding, Home/main view, primary action flow
  2. MUST READ: Live/session/result view (the payoff), DesignSystem files
  3. SHOULD READ: Key components in the demo flow
  4. SKIP: Services, Models, Tests, Extensions, Utilities, migration files

  Experience this as a NARRATIVE, not a code audit. You are reading a demo script.

  ## Evaluation Criteria

  ### 4.1 The One-Sentence Story
  - Explain the app in ONE sentence a non-technical person immediately wants
  - Is there a clear "hero problem" the app solves? Not three — one
  - Would a first-time user understand the value within 5 seconds of opening it?
  - Does the app's name and icon reinforce the story?

  ### 4.2 The Demo Script
  - Map the ideal 90-second live demo: opening shot → problem → solution → payoff
  - Is the primary flow demo-safe? (No network deps, loading spinners, empty states)
  - Any states that could embarrass on stage? (Empty lists, error dialogs, slow transitions)
  - Can the demo flow be completed with zero hesitation, zero explanation?
  - Does the UI read clearly at projection scale (large text, clear contrast)?

  ### 4.3 The "One More Thing" Moment
  - Is there a feature so thoughtful it earns a dramatic reveal?
    Examples: Watch companion that Just Works, a Live Activity on the lock screen,
    AI that suggests the next action, a beautiful empty state that tells a story
  - If there's no "one more thing" yet, what COULD be built? (With effort estimate)
  - Is there a moment where the technology disappears and only the human benefit remains?

  ### 4.4 Narrative Coherence
  - Does every screen tell part of the same story, or do some feel bolted-on?
  - Clear emotional arc? (Problem → Solution → Celebration)
  - Consistent personality? (Voice, tone, visual language throughout)
  - What would a journalist's headline be after a hands-on review?

  ### 4.5 Platform Story
  - Does this app showcase what makes Apple's platform special?
  - System capabilities used in ways that feel native and earned, not checkbox features?
  - Does the app feel like it *belongs* here — couldn't exist anywhere else?
  - Watch integration (if any): natural extension, not a shrunken iPhone?
  - Widgets/Live Activities (if any): glanceable story on their own?

  ### 4.6 The Cringe Test
  Walk through every screen in the demo flow and ask: "Would I be embarrassed
  showing this on stage to 10 million people?"
  - Placeholder content, unfinished corners, inconsistent styling
  - Awkward copy, confusing iconography, developer-facing language
  - Anything requiring explanation ("you have to long-press to...") is a FAIL
  - Anything that looks unfinished or half-baked

  ### Mechanical Audits
  - `grep -rn '"JSON"\|"API"\|"debug"\|"nil"\|"config"\|"TODO"\|"test"' \
    --include="*.swift" -i` (developer-facing language in user-visible strings)
  - Check for empty states that would appear during a demo (no-data screens)
  - Check if onboarding uses SF Symbols as illustrations (feels cheap)
  - `grep -rn '"Error"\|"Failed"\|"Unknown"' --include="*.swift"` in user-visible text

  ## OUTPUT FORMAT (MANDATORY)

  ## Keynote Review: {App}

  ### The Story
  [Write the ONE-sentence pitch exactly as Steve would say it on stage]

  ### Demo Readiness: [READY / ALMOST / NOT READY]

  ### The 90-Second Demo Script
  1. [Opening shot — what the audience sees first and why it hooks them]
  2. [The problem moment — show the pain point viscerally]
  3. [The solution — core action in real-time, no explanation needed]
  4. [The payoff — the result that earns applause]
  5. ["One More Thing" — if it exists]

  ### Scores (1-10)
  | Dimension | Score | Notes |
  |-----------|-------|-------|
  | Story Clarity | X | ... |
  | Demo Safety | X | ... |
  | "One More Thing" Potential | X | ... |
  | Narrative Coherence | X | ... |
  | Platform Story | X | ... |
  | Cringe-Free | X | ... |
  | **Overall** | **X** | ... |

  ### Applause Moments (what already earns the gasp)
  - [Specific moment with file:line context]

  ### Cringe Moments (P0 — what kills the demo on stage)
  - [ID: K-01] [Description] — [file:line] — [Why it fails on stage] — [Fix]

  ### Story Gaps (P1 — breaks the narrative)
  - [ID: K-10] [Description] — [file:line] — [Fix]

  ### Platform Opportunities (P2 — would strengthen the platform story)
  - [ID: K-20] [Description] — [Approach]

  ### "One More Thing" Candidates (P3 — new features worth building)
  - [ID: K-30] [Feature idea] — [Why it would wow] — [Effort: S/M/L]

  CRITICAL: You MUST produce the structured review above before your response ends.
  Do NOT spend more than 60% of your work reading files. You are writing a demo
  script and critique, not auditing code. After reading the demo flow, STOP and write.
```

---

## Phase 2: Interactive Selection

After both panels return, correlate findings and present them to the user.

### Correlation Rules

1. **Design + Keynote flag same area** → Highest priority — visible flaw + story gap
2. **Design flags something Keynote missed** → Visual issue, may still tank the demo
3. **Keynote flags something Design missed** → Product story gap — often a UX or copy issue
4. **Multiple independent findings at same file:line** → Note it; strengthens case

### Presentation Format

Present findings to the user in this exact format. **P0 and P1 are pre-selected by default** — the user only needs to confirm, deselect, or add more.

```
═══════════════════════════════════════════════════════════════════
  APPLE POLISH REVIEW — {App}
  Design: X/10 | Keynote: X/10 | Demo Readiness: [STATUS]
═══════════════════════════════════════════════════════════════════

THE STORY
─────────
"{one-sentence pitch from Keynote panel}"

✅ P0 — DEMO KILLERS [SELECTED — will fix automatically]
──────────────────────────────────────────────────────────
  1. ✅ [D-01 / K-01] [Description] — [file:line]
  2. ✅ [D-02] [Description] — [file:line]

✅ P1 — DESIGN GAPS [SELECTED — will fix automatically]
──────────────────────────────────────────────────────────
  3. ✅ [D-10] [Description] — [file:line]
  4. ✅ [K-10] [Description] — [file:line]
  5. ✅ [D-11] [Description] — [file:line]

⬜ P2 — POLISH TARGETS (optional — elevates the experience)
────────────────────────────────────────────────────────────
  6. ⬜ [D-20] [Description] — [file:line]
  7. ⬜ [K-20] [Description] — [file:line]
  8. ⬜ [D-21] [Description] — [file:line]

⬜ P3 — "ONE MORE THING" CANDIDATES (optional — new features)
──────────────────────────────────────────────────────────────
  9. ⬜ [K-30] [Feature idea] — Effort: S/M/L
  10. ⬜ [D-30] [Feature idea] — Effort: S/M/L

DELIGHTS (already great — keeping these)
──────────────────────────────────────────
  • [Specific delight with file:line]
  • [Specific delight with file:line]

═══════════════════════════════════════════════════════════════════
  DEFAULT PLAN: Fix all P0 + P1 ({X} issues)
═══════════════════════════════════════════════════════════════════

  Confirm or adjust:
  • Press Enter / "yes" / "go" — fix all P0 + P1 as shown
  • Add P2: "yes +6,7" or "yes +P2"
  • Add P3: "yes +9" (caution: these add new features)
  • Remove items: "yes -4" to deselect specific P1 items
  • Review only: "none" — stop here, no fixes applied
```

Wait for user confirmation before proceeding. If user says "yes" or presses enter, proceed with all P0 + P1 items selected.

---

## Phase 3: Orchestration Plan

After user selects issues, spawn a planning agent to create the execution plan.

```yaml
subagent_type: architect
prompt: |
  You are a DESIGN ORCHESTRATOR planning the implementation of selected polish
  issues for {app_name}.

  ## Selected Issues
  [List of user-selected findings with descriptions and file:line refs]

  ## App Structure
  [FILE MANIFEST]

  ## Your Task
  Group the selected issues into workstreams and produce an execution plan.

  ### Squad Types Available
  - **Visual Polish Squad**: Typography tokens, color consistency, spacing,
    SF Symbol weight/alignment, dark mode fixes, hardcoded value removal
  - **UX Flow Squad**: Navigation fixes, empty states, error states, permission
    recovery flows, back-navigation, loading state improvements
  - **Delight Squad**: Transitions/animations, haptic feedback, micro-interactions,
    completion/success states, skeleton loading views
  - **Narrative Squad**: App copy, onboarding story, empty state messaging,
    in-app help text, button labels, action confirmations

  ### Rules
  1. Group related issues into the same squad (minimize context switching)
  2. Identify dependencies (e.g. DesignSystem token changes must come before views that use them)
  3. Squads that share files MUST be sequenced (not parallel) for those files
  4. P0 issues must be assigned first, before any P2/P3 work

  ## OUTPUT FORMAT

  # Polish Execution Plan: {App}

  **Selected issues:** [X items]
  **Worktree:** polish-{app}-{timestamp}

  ## Dependency Order
  [Which changes must happen before others, and why]

  ## Squad Assignments

  ### Batch 1 — Must run first (dependencies for later squads)
  | Squad | Issues | Files | Est. Effort |
  |-------|--------|-------|-------------|
  | Visual Polish | D-01, D-20 | DesignSystem/Colors.swift, Typography.swift | M |

  ### Batch 2 — Can run in parallel after Batch 1
  | Squad | Issues | Files | Est. Effort |
  |-------|--------|-------|-------------|
  | UX Flow | D-10, K-10 | HomeView.swift, OnboardingView.swift | M |
  | Narrative Squad | K-01 | OnboardingView.swift, EmptyStateView.swift | S |

  ### Batch 3 — Final polish (depends on Batch 2)
  | Squad | Issues | Files | Est. Effort |
  |-------|--------|-------|-------------|
  | Delight Squad | D-20, K-20 | LiveSessionView.swift, CardView.swift | L |

  ## Success Criteria
  - Build passes with zero errors
  - All Xcode Previews compile
  - All selected P0/P1 issues resolved
  - No regressions in existing design tokens
```

---

## Phase 4: Parallel Implementation Squads

Dispatch squads per the orchestration plan. Run independent batches in parallel, sequential batches one-at-a-time.

All squads work in an isolated worktree:

```bash
WORKTREE_NAME="polish-{app}-$(date +%Y%m%d-%H%M%S)"
git worktree add "../$WORKTREE_NAME" -b "$WORKTREE_NAME"
cd "../$WORKTREE_NAME"
xcodegen generate
# Verify baseline build
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  build 2>&1 | tail -5
```

### Visual Polish Squad

```yaml
subagent_type: coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a VISUAL POLISH SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected visual issues with file:line}

  Your mandate: make every pixel intentional. Like Jony Ive's team going over
  every surface before a product announcement.

  Common fixes:
  - Replace hardcoded Color(hex:) / Color(red:) with DesignSystem tokens
  - Replace font(.system(size: X)) with type scale tokens
  - Fix inconsistent padding/spacing (align to 8pt grid)
  - Fix SF Symbol weight mismatches (.regular vs .semibold across same context)
  - Fix dark mode: colors that don't adapt, images that don't have dark variants
  - Ensure Dynamic Type: no fixed heights on text containers

  CONSTRAINTS:
  - Load DesignSystem files first — understand all existing tokens before adding anything new
  - Prefer extending existing tokens over adding new ones
  - No behavior changes — visual only
  - Build must pass after changes
  - Test each Xcode Preview after touching a view file

  Return: List of visual changes + which issues are resolved
```

### UX Flow Squad

```yaml
subagent_type: coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a UX FLOW SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected UX issues with file:line}

  Your mandate: every transition should feel like you're moving through a real
  space. No dead ends. No confusion. No explanation required.

  Common fixes:
  - Replace blank/sad empty states with helpful, actionable ones
  - Add recovery flows for denied permissions (Settings deep-link)
  - Fix navigation dead ends (back buttons that lead nowhere sensible)
  - Replace loading spinners with skeleton views where appropriate
  - Ensure interrupted flows preserve state (return to where user left off)
  - Fix confusing button labels (rename to clear action verbs)

  CONSTRAINTS:
  - Read the full flow context before changing navigation
  - No new screens unless strictly necessary for recovery flows
  - Match existing navigation patterns in the app (push vs sheet vs replace)
  - Build must pass after changes

  Return: Flow improvements made + which issues are resolved
```

### Delight Squad

```yaml
subagent_type: coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a DELIGHT SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected delight issues with file:line}

  Your mandate: add the moments that make someone pause and think "someone
  really cared about this." Not gratuitous animation — purposeful joy.

  Common additions:
  - Add haptic feedback at meaningful moments (task completion, destructive actions)
  - Replace abrupt appears/disappears with spring animations or fade transitions
  - Add satisfying completion states (not just "Done" — a moment of celebration)
  - Add micro-interactions: buttons that give visual feedback on tap
  - Improve skeleton/loading views to feel like the content is about to appear
  - Add the "one more thing" moment if a P3 candidate was selected

  CONSTRAINTS:
  - Use system haptics (UIImpactFeedbackGenerator, UINotificationFeedbackGenerator)
  - Use SwiftUI's built-in animation system — no UIKit animation unless necessary
  - Animations must respect Reduce Motion (withAnimation(.linear(duration: 0)) for reduced)
  - No animation should delay the user's ability to interact
  - Build must pass, Previews must compile

  Return: Delight additions + which issues are resolved
```

### Narrative Squad

```yaml
subagent_type: coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a NARRATIVE SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected narrative/copy issues with file:line}

  Your mandate: every word in this app should feel like Apple wrote it.
  Clear, human, confident, specific. Never technical. Never corporate.

  Apple writing principles to follow:
  - Short sentences. Active voice. Present tense where possible.
  - Never say "please" (condescending) or "sorry" (weak)
  - Buttons are verbs: "Get Started" not "Next", "Save Changes" not "OK"
  - Empty states invite action: "No items yet. Tap + to add your first."
  - Error messages explain what happened AND what to do next
  - Onboarding should earn the user's trust in 3 screens maximum
  - Remove developer-facing language: "JSON", "API", "sync", "fetch", "null"

  CONSTRAINTS:
  - Only change user-visible strings — no code logic changes
  - Preserve string key names if localization is used (only change the values)
  - If the app uses Localizable.strings, update those files — not hardcoded strings
  - Build must pass

  Return: Copy changes made + which issues are resolved
```

---

## Phase 5: Verification

After all squads complete, verify the build is clean:

```bash
#!/bin/bash
set -e

echo "═══════════════════════════════════════════════════════════════"
echo "  POLISH VERIFICATION"
echo "═══════════════════════════════════════════════════════════════"

# 1. Project regeneration
echo "📋 Regenerating project..."
xcodegen generate 2>&1 | tail -3

# 2. Build verification
echo ""
echo "🔨 Build verification..."
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  build 2>&1 | grep -E "error:|warning:|Build succeeded|BUILD FAILED" | tail -10

# 3. Preview compilation check (catches SwiftUI issues missed by build)
echo ""
echo "👁️  Checking for obvious Preview issues..."
grep -rn "#Preview" --include="*.swift" . | wc -l
echo "  Previews defined — spot-check key views in Xcode after merge"

# 4. Design token consistency check
echo ""
echo "🎨 Design token consistency check..."
echo "Hardcoded colors remaining:"
grep -rn 'Color(red:\|Color(hex:\|UIColor(red:' --include="*.swift" . \
  | grep -v "DesignSystem\|Tests\|Preview" | head -10 || echo "  None ✓"

echo "Hardcoded font sizes remaining:"
grep -rn 'font(.system(size:' --include="*.swift" . \
  | grep -v "DesignSystem\|Tests" | head -10 || echo "  None ✓"

echo "Developer-facing strings remaining:"
grep -rn '"JSON"\|"API"\|"debug"\|"fetch"\|"sync"\|"null"' \
  --include="*.swift" -i . | grep -v "Tests\|// ok" | head -10 || echo "  None ✓"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
```

**If build fails:**
1. Capture errors
2. Dispatch debug subagent to the worktree with error context
3. Apply fix, re-verify
4. Max 3 retry cycles

---

## Phase 6: TestFlight Push

After verification passes:

```bash
#!/bin/bash
set -e

APP="{app}"
WORKTREE="polish-{app}-{timestamp}"

echo "═══════════════════════════════════════════════════════════════"
echo "  TESTFLIGHT PUSH — {App} Polish Build"
echo "═══════════════════════════════════════════════════════════════"

# 1. Commit in worktree
echo "📝 Committing polish changes..."
git add -A
git commit -m "polish($APP): design and UX craftsmanship pass

Design improvements:
{list of resolved design issues}

Keynote improvements:
{list of resolved keynote issues}

Squads run:
- Visual Polish: {X issues}
- UX Flow: {X issues}
- Delight: {X issues}
- Narrative: {X issues}

Verification: Build PASS, design tokens consistent
Worktree: $WORKTREE"

# 2. Merge to main
echo ""
echo "📥 Merging to main..."
cd /path/to/main/repo
git merge "$WORKTREE_NAME" --no-ff -m "merge: polish pass for $APP"
git push origin main

# 3. Poll CI
echo ""
echo "⏳ Polling CI..."
MAX_RETRIES=60
RETRY=0
while [ $RETRY -lt $MAX_RETRIES ]; do
    STATUS=$(xc_status 2>/dev/null | grep -E "succeeded|failed|in_progress" | head -1)
    if echo "$STATUS" | grep -q "succeeded"; then
        echo "✅ CI build succeeded!"
        break
    elif echo "$STATUS" | grep -q "failed"; then
        echo "❌ CI build failed — check with: xc_get_issues"
        exit 1
    fi
    echo "  Building... ($(($RETRY * 30))s elapsed)"
    sleep 30
    RETRY=$((RETRY + 1))
done

# 4. Distribute
echo ""
echo "🚀 Distributing to TestFlight Internal Testing..."
xc_distribute_build \
  --groups "Internal Testing" \
  --changelog "Design polish: {brief summary of what was improved}"

echo "✅ Polish build live on TestFlight!"
```

---

## Final Report

```
═══════════════════════════════════════════════════════════════════
  APPLE POLISH COMPLETE — {App}
═══════════════════════════════════════════════════════════════════

THE STORY (before / after)
───────────────────────────
Before: [old pitch or "unclear"]
After:  "{polished one-sentence pitch}"

SCORECARD
──────────
                    Before  After
Design:              X/10 → Y/10
Keynote Readiness:   X/10 → Y/10
Demo Status:     [OLD] → [NEW]

SQUADS
───────
🎨 Visual Polish:    X issues resolved
🧭 UX Flow:         X issues resolved
✨ Delight:          X issues resolved
✍️  Narrative:       X issues resolved

ISSUES RESOLVED
────────────────
P0 Demo Killers:    [X resolved / Y total]
P1 Design Gaps:     [X resolved / Y total]
P2 Polish Targets:  [X resolved / Y total]
P3 "One More Thing": [X built / Y proposed]

TESTFLIGHT
──────────
Build:   #{N}
Status:  🟢 Internal Testing
Commit:  {hash}

WHAT'S DIFFERENT
────────────────
{3-5 specific, concrete improvements — what a user will actually notice}

NEXT STEPS
──────────
1. Install TestFlight build — walk the demo script from the Keynote review
2. Remaining issues (not selected): [list with IDs for future reference]
3. "One More Thing" candidates deferred: [list with effort estimates]
4. When ready for App Store: /apple-cleanup for engineering hardening

═══════════════════════════════════════════════════════════════════
  Status: POLISHED — DEMO BUILD LIVE ON TESTFLIGHT
═══════════════════════════════════════════════════════════════════
```

---

## Relationship to Other Skills

| Skill | Focus | Automation | When |
|-------|-------|-----------|------|
| `apple-polish` | Design + Keynote | Review → select → fix → TestFlight | Design craftsmanship |
| `apple-cleanup` | Engineering + Compliance | Review → fix ALL → TestFlight | Code hardening |
| `apple-review` | All 4 panels | Review only (no fixes) | Full audit |
| `ios-design` | SwiftUI design patterns | Reference only | While coding |
| `ios-accessibility` | VoiceOver + Dynamic Type | Reference only | Accessibility audit |

---

*Every pixel intentional. Every word earned. Every transition purposeful. Ship what Apple would be proud of.*

<!-- END SKILL: apple-polish -->

---

<!-- BEGIN SKILL: apple-review -->

# apple-review

# Apple Review

A comprehensive, multi-perspective review that examines an app the way Apple would — from the obsessive design eye of their best designers, the architectural rigor of their engineering leads, the checklist discipline of App Review, and the product vision clarity required before anything earns a keynote slide.

This goes deeper than a session review (which checks recent changes) or `/apple-patterns-check` (which validates code patterns). This skill evaluates the **entire app experience** as a cohesive product.

## When to Use

- Before a major App Store submission
- Periodic quality audits ("how good is this app, really?")
- After completing a significant feature milestone
- When you want an honest, Apple-caliber critique
- When preparing for Apple Design Award consideration

## HARD RULE: Presented vs Dormant vs Debug-Only

**Every panel MUST verify that any view it critiques is actually reachable from the running app in a Release build** before treating it as a runtime UX/engineering problem. Defined-but-unpresented views, and views only reachable in DEBUG builds, are completely different finding classes than shipping-but-flawed views.

Before any Critical Issue / Cringe Moment cites a full-screen view, modal, sheet, or flow, the panel MUST run at least one reverse-reference search and report one of:

- **`[shipped]`** — citing the `file:line` of the `.sheet` / `.fullScreenCover` / `NavigationLink` / direct embed / `NavigationDestination` that presents the view from the live app graph in Release builds.
- **`[wired-behind-flag]`** — presentation exists but gated by a feature flag or remote setting that *could* be enabled in Release; cite the gate.
- **`[debug-only]`** — presentation only occurs inside `#if DEBUG`, a developer menu, a launch-argument check, or similar. Cite the gate. Users will never see this in shipped builds — Compliance and Keynote panels must treat as out of scope; Engineering may still flag if it leaks symbols/secrets into Release.
- **`[dormant]`** — the view has no call site outside its own file and previews. In this case the finding must be reframed as "dormant code — ship it, stage it, or delete it?" NOT as a user-facing UX flaw.

**Verification recipe for each view flagged:**
1. `grep -rn 'ViewName(' app/ --include='*.swift'` excluding the view's own file and tests.
2. If zero matches outside the view's own file → `[dormant]`. Full stop.
3. If matches exist, check whether every match is inside `#if DEBUG` / a debug menu / a launch-arg gate → `[debug-only]`.
4. Otherwise → pick the presenting call site and cite `file:line` as `[shipped]` or `[wired-behind-flag]`.

This rule exists because a file that compiles cleanly, has previews, and has a ViewModel can still be unreachable at runtime. Reading code-in-isolation tells you what a view *would* do if presented, not whether users ever see it. Confident plausible narratives about "UX whiplash" or "jarring flows" are exactly where this trap fires — plausibility is when verification matters most.

## Input

```
/apple-review                    # Review app in current directory
/apple-review apps/focus         # Review a specific app subdirectory
/apple-review --design-only      # Run only the Design panel
/apple-review --engineering-only # Run only the Engineering panel
```

Adapt paths to your project structure. For monorepos with multiple apps, specify the app directory.

## Architecture: Four Review Panels

The review spawns four parallel subagents, each examining the app from a distinct perspective. They work independently — like four separate Apple review teams who don't talk to each other — then their findings are correlated into a unified report.

```
/apple-review
│
├─► [Pre-Work Phase] ────────────────────────────────────────
│   Main thread: build file manifest, count files/lines,
│   identify key files for each panel
│
├─► [Parallel Phase] ─────────────────────────────────────────
│   │
│   ├─► Panel 1: Design Review (code-reviewer)
│   │   UI/UX flows, visual craft, delight, simplicity, HIG
│   │
│   ├─► Panel 2: Engineering Review (auditor)
│   │   Architecture, code quality, performance, patterns
│   │
│   ├─► Panel 3: Compliance Review (code-reviewer)
│   │   App Store guidelines, rejection risks, metadata
│   │
│   └─► Panel 4: Keynote Review (code-reviewer)
│       Product story, demo-readiness, "one more thing" moments
│
├─► [Correlation Phase] ──────────────────────────────────────
│   Cross-reference findings, deduplicate, prioritize
│
└─► [Report Phase] ───────────────────────────────────────────
    Write unified report to docs/reviews/
```

---

## Pre-Work Phase (Main Thread)

Before spawning any agents, the main thread MUST:

### 1. Build the File Manifest

```bash
# List all non-test Swift files with line counts
find [APP_DIR] -name "*.swift" -not -path "*/Tests/*" -not -path "*/UITests/*" | \
  xargs wc -l | sort -rn | head -60

# List config files
find [APP_DIR] -name "*.plist" -o -name "*.entitlements" -o -name "*.xcprivacy" -o -name "project.yml"
```

### 2. Categorize Files for Each Panel

Build a manifest like:

```
FILE MANIFEST (auto-generated):
Views/ — 40 files, ~6000 lines
  Setup/ — HomeView.swift (545), ProgramEditorView.swift (380), ...
  Live/ — RundownView.swift (200), ControlSurfaceView.swift (580), ...
  Live/iPad/ — ActiveSegmentView.swift (430), ...
ViewModels/ — 5 files, ~2500 lines
  RundownViewModel.swift (1100), SessionViewModel.swift (400), ...
Services/ — 35 files, ~8000 lines
Models/ — 18 files, ~1200 lines
DesignSystem/ — 3 files, ~300 lines
Config: project.yml, Info.plist, AetherCue.entitlements, PrivacyInfo.xcprivacy
```

### 3. Assign files to each panel

- **Design**: App entry, onboarding, home, main editor, live views, design system, ViewModels
- **Engineering**: All services, models, ViewModels, extensions, utilities, project config, tests
- **Compliance**: project.yml, Info.plist, entitlements, privacy manifest, services with protected APIs, app entry
- **Keynote**: Onboarding, home, editor, live views, design system, README

Include this manifest in each agent's prompt so they don't waste tool calls on file discovery.

---

## Panel 1: Design Review

**Persona:** Think like Apple's most design-obsessed leader reviewing a product before launch. Every pixel, every transition, every moment of friction matters. The question isn't "does it work?" but "does it feel inevitable?"

**Spawn as subagent** (`subagent_type: "code-reviewer"`) with this prompt:

```
You are conducting a design review of [app name] with the critical eye of Apple's
best product designers. You MUST produce a structured review with scores and
specific file:line references.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy
Read files in this priority order. Stop after 15-20 files and write your review.
1. MUST READ (core flow): App entry point, Home/main view, onboarding, primary
   editor, live/session view, settings, ALL design system files, ALL ViewModels
2. SHOULD READ (if context allows): Components/, Controls/, edge case views
3. SKIP: Services, Models, Tests, Extensions, Utilities

An incomplete review based on 15 files is infinitely more valuable than reading
40 files and producing no output.

## Evaluation Criteria

### 1.1 First Impressions & Onboarding
- What does the user see on first launch? Welcoming or overwhelming?
- Is there onboarding? Is it skippable? Does it respect the user's time?
- How quickly can a new user accomplish the app's core action?
- Time-to-value: taps from launch to first meaningful interaction?

### 1.2 Core Flow & Navigation
- Map the primary user journey (the thing people open the app to do)
- Count taps/gestures required for the most common actions
- Dead ends? Confusing back-navigation? Orphaned screens?
- Does navigation feel spatial and predictable (iOS stack/tab patterns)?
- Clear information hierarchy on each screen?

### 1.3 Visual Craft & Polish
- Typography: consistent scale? Orphaned styles (hardcoded fonts instead of tokens)?
- Color: cohesive palette? Semantic colors used correctly? Hardcoded hex instead of tokens?
- Spacing: consistent system? Cramped or floating elements?
- Icons: consistent SF Symbol weight and optical alignment?
- Dark mode: intentional or just inverted?
- Dynamic Type: graceful adaptation at all text sizes?
- Are design tokens from the DesignSystem actually used consistently, or do views
  hardcode their own values?

### 1.4 Motion & Feedback
- Are transitions meaningful or gratuitous?
- Do interactive elements provide immediate haptic/visual feedback?
- Loading states handled gracefully (skeleton views, not spinners)?
- Does the app feel responsive — do taps register instantly?
- Micro-interactions that reward the user?

### 1.5 Delight & WOW Factor
- Is there at least one moment that makes a user want to show someone?
- Does the app have personality without being gimmicky?
- Thoughtful details that reveal themselves over time?
- Does the completion/success state feel rewarding?
- Would someone pause and think "someone really cared about this"?

### 1.6 Simplicity & Focus
- Can you explain what the app does in one sentence?
- Is every screen earning its place? Could any be merged or removed?
- Minimal, well-defaulted settings — or option overload?
- Does the app resist feature creep? Is the scope disciplined?

### 1.7 HIG Compliance (verify against Apple docs)
- Standard iOS patterns: navigation bars, tab bars, sheets, alerts
- System integration: widgets, Shortcuts, Live Activities, Share Sheet
- Accessibility: VoiceOver labels, Dynamic Type, sufficient contrast
- Platform conventions: swipe-to-delete, pull-to-refresh where expected
- Latest platform capabilities leveraged (Liquid Glass on iOS 26, etc.)?
IMPORTANT: When evaluating HIG compliance, do NOT rely on training data alone.
Use Grep to check actual usage patterns: count accessibilityLabel occurrences,
check for hardcoded font sizes vs Dynamic Type, verify contrast ratios.

### 1.8 Edge Cases & Empty States
- No data? Is the empty state helpful or sad?
- Permissions denied? Is there a recovery flow?
- Extremely long text input?
- User interrupts a flow midway?

### Mechanical Audits (run these grep checks)
- Count `accessibilityLabel` / `accessibilityHint` vs total interactive views
  (ratio < 0.5 = poor VoiceOver coverage)
- Grep for hardcoded strings that are developer-facing: "JSON", "API", "debug",
  "nil", "TODO", "FIXME", "Lorem", "placeholder"
- Grep for `.lineLimit(1)` on important content (potential truncation)
- Grep for hardcoded Color values (hex literals) outside the DesignSystem files

## Findings Target
Produce the structure below. Each finding MUST have a file:line reference.
Quality gate: produce 0–5 findings per bucket — do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed at this depth of review."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Design Review: [App Name]

### Overall Impression
[2-3 sentences: gut reaction as a design leader]

### Scores (1-10)
| Dimension | Score | Notes |
|-----------|-------|-------|
| First Impression | X | ... |
| Core Flow | X | ... |
| Visual Craft | X | ... |
| Motion & Feedback | X | ... |
| Delight Factor | X | ... |
| Simplicity | X | ... |
| HIG Compliance | X | ... |
| Edge Cases | X | ... |
| **Overall** | **X** | ... |

### Mechanical Audit Results
- VoiceOver coverage: X labels across Y files (ratio: Z)
- Developer-facing strings found: [list]
- Hardcoded colors outside DesignSystem: [count]
- Truncation risks (.lineLimit on important content): [count]

### Delights (what's already great)
- [specific praise with file:line]

### Critical Issues (fix before shipping)
- [ID: D-01] [Description] — [file:line] — Presentation: `[shipped @ file:line]` | `[wired-behind-flag @ file:line]` | `[debug-only @ file:line]` | `[dormant]` — [Recommended fix]
  (if `[dormant]` or `[debug-only]`, reframe finding accordingly and do NOT claim runtime UX impact for shipped users)

### Enhancements (would elevate the experience)
- [ID: D-10] [Description] — [Recommended approach]

### Missing Elements (gaps in the experience)
- [ID: D-20] [Description] — [Why it matters]

### References
- [Apple doc URL or Context7 query that verified a guideline]
- [If a guideline cited is from training data and unverified, flag here]

## CRITICAL: You MUST produce the structured review above before your response
ends. Do NOT spend more than 60% of your work on reading files. After reading
the MUST READ files, STOP reading and write your review. An incomplete review
with structured output is infinitely more valuable than a complete file read
with no review.
```

---

## Panel 2: Engineering Review

**Persona:** Think like Apple's senior engineering leads reviewing a codebase for architectural soundness, performance, maintainability, and adherence to platform best practices. The question is "would we be proud to ship this?"

**Spawn as subagent** (`subagent_type: "auditor"`) with this prompt:

```
You are conducting an engineering review of [app name] as a senior Apple
engineering lead. You MUST produce a structured review with scores and specific
file:line references.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy
Read systematically by layer. Prioritize:
1. MUST READ: All ViewModels, all Models, project.yml, App entry point,
   migration files, design system
2. MUST READ: Core services (the 5-8 most important by line count)
3. SHOULD READ: Remaining services, extensions, utilities
4. SCAN: Test files (read names and structure, deep-read 2-3 representative tests)

## Evaluation Criteria

### 2.1 Architecture & Structure
- Is MVVM cleanly separated? Do Views contain business logic?
- Are ViewModels testable in isolation?
- Is the service layer properly abstracted?
- Is shared/package code well-factored vs app-specific code?
- Dependencies flowing in the right direction?
- God objects? (Any file > 500 lines should be scrutinized)

### 2.2 Swift 6 & Concurrency
- Strict concurrency compliance (`SWIFT_STRICT_CONCURRENCY: complete`)
- `@MainActor` isolation patterns — check project.yml for SWIFT_DEFAULT_ACTOR_ISOLATION
- `@preconcurrency import` ONLY where the compiler specifically demands it on a single import. iOS 26 frameworks (EventKit, HealthKit, AVFoundation, VideoToolbox, SwiftData, ActivityKit, Speech, Vision, CoreLocation, CoreData, MultipeerConnectivity) ship with Sendable annotations. Prophylactic use masks real concurrency issues.
- No `@Model` objects crossing async boundaries — extract scalars before Tasks
- `nonisolated deinit` on all `@MainActor` classes with cleanup (Apple-confirmed crash)
- `Task { @MainActor [weak self] in }` — child Tasks do NOT inherit actor isolation
- No `MainActor.assumeIsolated` from delegate callbacks on background queues
- No hardcoded `isAvailable = true` for FoundationModels
- Sheet `onDismiss` + `withCheckedContinuation` double-resume race check
- Task cancellation handling
- Actor isolation boundaries
- `nonisolated(unsafe)` usage — each one is a potential data race, verify safety

### 2.3 SwiftData & Persistence
- Model design: relationships correct? Cascade rules?
- **All `@Model` stored properties have default values** (missing = runtime crash)
- Migration strategy: VersionedSchema + SchemaMigrationPlan
- CloudKit safety: no renames, no relationship type changes
- Query efficiency: are fetches well-scoped?
- No `@Model` objects passed into `AsyncStream` closures or bare `Task` blocks

### 2.4 SwiftUI Patterns
- State management: `@Observable` vs `@State` vs `@Environment`
- View composition: are views small and focused?
- Performance: expensive computations in body?
- Preview coverage: every view has `#Preview`?
- Design tokens used (no hardcoded colors/fonts in views)

### 2.5 Performance & Resources
- Memory: retain cycles? Proper `[weak self]` in closures?
- Launch time: work deferred appropriately?
- Background tasks: well-behaved?
- Timer patterns: RunLoop.common on iOS, Task.sleep on watchOS
- Synchronous work on MainActor that should be async

### 2.6 Error Handling & Resilience
- Errors handled gracefully at every boundary?
- Data-loss scenarios: alerts, not banners
- Crash safety: force unwraps, fatalError in production paths
- State recovery: can the app recover from any interrupted state?
- Silent data loss (e.g., `try?` swallowing decode failures)

### 2.7 AI-Generated Code Audit
- Hallucinated APIs: check any unusual API usage actually exists
- Hardcoded availability: `isAvailable = true` instead of runtime checks
- Duplicate type definitions across files
- Dead code: services never instantiated, @Tool definitions never registered
- Design token drift: spacing/color values defined in multiple places

### 2.8 Testing
- Critical paths tested?
- Tests validate behavior, not implementation?
- No shared state between tests?
- Are the MOST important classes tested? (ViewModels especially)

### Mechanical Audits (run these grep checks)
- `grep -rn "fatalError\|preconditionFailure" --include="*.swift"` outside #if DEBUG
- `grep -rn "try!" --include="*.swift"` outside #Preview
- `grep -rn "as!" --include="*.swift"` (force casts)
- `grep -rn "nonisolated(unsafe)" --include="*.swift"` (data race risks)
- `grep -rn "@unchecked Sendable" --include="*.swift"`
- `grep -rn "import Combine" --include="*.swift"` then check if Combine is actually used
- Files with zero references elsewhere (dead code candidates)
- Duplicate function/extension definitions across files

## Findings Target
Quality gate: produce 0–8 findings per bucket — do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed at this depth of review."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Engineering Review: [App Name]

### Architecture Assessment
[2-3 sentences: overall architectural health]

### Scores (1-10)
| Dimension | Score | Notes |
|-----------|-------|-------|
| Architecture | X | ... |
| Swift 6 Compliance | X | ... |
| SwiftData Usage | X | ... |
| SwiftUI Patterns | X | ... |
| Performance | X | ... |
| Error Handling | X | ... |
| Test Coverage | X | ... |
| **Overall** | **X** | ... |

### Mechanical Audit Results
- fatalError/preconditionFailure in production: [count, locations]
- Force try (try!): [count, locations]
- Force cast (as!): [count, locations]
- nonisolated(unsafe): [count, locations — verify each is safe]
- @unchecked Sendable: [count]
- Dead Combine imports: [count]
- Duplicate definitions: [list]

### Strengths
- [specific praise with file:line]

### Critical Issues (bugs or crash risks)
- [ID: E-01] [Description] — [file:line] — Presentation: `[shipped @ file:line]` | `[wired-behind-flag @ file:line]` | `[debug-only @ file:line]` | `[dormant]` — [Fix]
  (if `[dormant]` or `[debug-only]`, the bug has no runtime user impact in shipped builds — downgrade priority and reframe as "dead/staged code" decision, unless it leaks symbols/secrets into Release)

### Improvements (code quality / maintainability)
- [ID: E-10] [Description] — [file:line] — [Approach]

### Tech Debt
- [ID: E-20] [Description] — [Impact if not addressed]

### References
- [Apple doc URL or Context7 query that verified an API signature]
- [ios26-api-reference / ios26-api-bible entries consulted]

## CRITICAL: You MUST produce the structured review above before your response
ends. Do NOT spend more than 60% of your work on reading files. After reading
the priority files, STOP and write your review.
```

---

## Panel 3: Compliance Review

**Persona:** Think like the App Store Review team combined with Apple's legal/privacy compliance group. Find everything that could cause a rejection, delay, or removal.

**Spawn as subagent** (`subagent_type: "code-reviewer"`) with this prompt:

```
You are conducting an App Store compliance review of [app name]. You MUST produce
a structured review with risk level, specific guideline references, and file:line
references for every finding.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy (STRICT — read only these files)
1. MUST READ: project.yml, Info.plist (all targets), all .entitlements files,
   PrivacyInfo.xcprivacy, App entry point (.swift)
2. MUST READ: Settings/preferences view (check for Privacy Policy link)
3. MUST GREP: Services directory for protected API usage patterns
4. MUST GREP: All views for placeholder content markers
5. SKIP: ViewModels, DesignSystem, Extensions, Tests, Utilities

You should read ~10-12 files maximum. This is a compliance check, not a code review.

## Evaluation Criteria

### 3.1 App Store Review Guidelines
- **4.0 Design:** Sufficient value? Not a "thin" app?
- **2.1 Performance:** App completeness — no placeholder content, dead links
- **2.3 Accurate Metadata:** Screenshots match actual UI? Description accurate?
- **3.1 Payments:** No links to external purchase mechanisms
- **4.2 Minimum Functionality:** Does the app do enough to justify existence?

### 3.2 Privacy & Data
- Privacy manifest (`PrivacyInfo.xcprivacy`): present and complete?
- Required reason APIs: all used APIs declared with valid reasons?
- Usage descriptions: Camera, Microphone, Speech, Location, Health, Reminders, etc.
  - Specific and honest? (Vague = rejection)
  - Present for every capability actually used in code?
  - Cross-check: grep for framework imports, then verify matching usage descriptions
- Data collection: App Privacy label matches actual behavior?
- Tracking: ATT prompt if any tracking occurs?

### 3.3 Entitlements & Capabilities
- Cross-check: for each entitlement in .entitlements, verify the corresponding
  framework is imported AND the API is called in code
- For each protected API usage in code, verify the entitlement and usage description exist
- Entitlements declared but not used? (reviewers flag this)
- App Groups: consistent identifiers across all targets?

### 3.4 Binary & Build
- No private API usage
- Minimum deployment target: is it reasonable? Does it exclude too many devices?
- App icon: CFBundleIconName referenced, verify asset catalog exists
- Launch screen: present and not misleading?
- Export compliance: ITSAppUsesNonExemptEncryption declared?

### 3.5 App Intents Compliance
- Intent descriptions don't contain prohibited words ("Apple", "iPhone", "iPad", "Siri")
- No `suggestedInvocationPhrase` on plain AppIntent structs (must be on AppShortcutsProvider)
- All App Shortcut phrases include `\(.applicationName)`
- Intents referenced in AppShortcutsProvider are in the main app target (not frameworks)

### 3.6 Content & Legal
- Terms of Service / Privacy Policy: linked IN THE APP (not just on website)?
- No placeholder "Lorem ipsum" or "TODO" content in views
- No references to competing platforms
- EULA if needed?
- Copyright notice present?

### 3.6 In-App Purchase (if applicable)
- Restore purchases implemented?
- Subscription management accessible?
- Clear pricing display before purchase?

### Mechanical Audits (run these grep checks)
- `grep -rn "fatalError\|preconditionFailure" --include="*.swift"` — production crashes
- `grep -rn "TODO\|FIXME\|HACK\|XXX" --include="*.swift"` — unfinished work markers
- `grep -rn "placeholder\|lorem\|test.*data\|sample.*text" --include="*.swift" -i` in views
- Verify NSCameraUsageDescription, NSMicrophoneUsageDescription,
  NSSpeechRecognitionUsageDescription, NSLocalNetworkUsageDescription,
  NSBluetoothAlwaysUsageDescription exist in Info.plist for each API used
- Check for privacy policy URL in code (grep for "privacy")
- `grep -rn "IntentDescription.*Apple\|IntentDescription.*iPhone\|IntentDescription.*iPad" --include="*.swift"` — App Intent trademark violations (error 90626)

## Findings Target
Quality gate: produce findings within the upper bounds shown in the output
format below (e.g. "0–3 Rejection Risks"). Do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Compliance Review: [App Name]

### Submission Readiness
[2-3 sentences: would this pass App Review today?]

### Risk Level: [LOW / MEDIUM / HIGH / REJECTION LIKELY]

### Entitlement Cross-Check
| Entitlement/API | In Entitlements? | Usage Description? | Actually Used in Code? | Status |
|-----------------|------------------|--------------------|-----------------------|--------|
| Camera | ... | ... | ... | OK/MISSING/UNUSED |
| ... | ... | ... | ... | ... |

### Rejection Risks (0–3, will likely cause rejection)
- [ID: C-01] [Guideline #] [Description] — [file:line] — [Required fix]

### Warnings (0–4, may cause rejection depending on reviewer)
- [ID: C-10] [Guideline #] [Description] — [Recommendation]

### Best Practices (0–4, not rejection risks, but recommended)
- [ID: C-20] [Description] — [Why it matters]

### Checklist
- [ ] Privacy manifest complete
- [ ] All usage descriptions present and specific
- [ ] Entitlements match code usage
- [ ] No placeholder content
- [ ] App icon complete
- [ ] Privacy policy linked IN APP
- [ ] Export compliance declared
- [ ] No fatalError in production paths
- [ ] No TODO/FIXME in user-visible code

### References
- [Specific App Store Review Guideline URLs consulted]
- [Privacy manifest or entitlement docs consulted]

## CRITICAL: You MUST produce the structured review above before your response
ends. This is a focused compliance check — read only the files listed above,
run the greps, and write your review. Do NOT explore the codebase broadly.
```

---

## Panel 4: Keynote Review

**Persona:** Think like Steve Jobs preparing for a WWDC keynote. He's about to walk on stage and demo this app to the world. He doesn't care about architecture or test coverage — he cares about the *story*. Can he hold up this app and make the audience gasp? Can he explain what it does in one sentence that makes people lean forward? If there's a single moment of confusion, hesitation, or ugliness during the live demo, the whole thing falls apart.

**Spawn as subagent** (`subagent_type: "code-reviewer"`) with this prompt:

```
You are Steve Jobs reviewing [app name] the night before a WWDC keynote. Tomorrow
you walk on stage and demo this app live. You MUST produce a structured review
with a demo script, scores, and specific file:line references.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy (follow this order, stop after ~15 files)
1. MUST READ: README (if exists), App entry point, Onboarding view, Home/main view
2. MUST READ: Primary editor view, Live session view (the demo flow)
3. MUST READ: Design system files (visual language)
4. SHOULD READ: Key components that appear during the demo flow
5. SKIP: Services, Models, Tests, Extensions, Utilities, migration files

Experience the app as a NARRATIVE, not a feature list. You are reading the
script of a demo, not auditing code.

## Evaluation Criteria

### 4.1 The One-Sentence Story
- Explain the app in a single sentence a non-technical person would immediately want
- Is there a clear "hero problem" the app solves? Not three — one
- Does the app's name reinforce the story? Does the icon?
- Would a first-time user understand the value within 5 seconds of opening it?

### 4.2 The Demo Script
- Map the ideal 90-second live demo: what do you show first? The build? The payoff?
- Is the primary flow demo-safe? (No network deps, no loading spinners mid-demo)
- Any states that could embarrass on stage? (Empty lists, error dialogs, slow transitions)
- Can the demo flow be completed with zero hesitation or explanation?
- Does the UI read clearly at projection scale (large text, clear contrast)?

### 4.3 The "One More Thing" Moment
- Is there a feature so thoughtful it earns a dramatic reveal?
  Examples: a background interaction that Just Works, Watch companion, a Live
  Activity that tells a story on the lock screen, AI intelligence that suggests
  the next action
- If there's no "one more thing," what *could* be?
- Is there a moment where the technology disappears and only the human benefit remains?

### 4.4 Narrative Coherence
- Does every screen tell part of the same story, or do some feel bolted-on?
- Clear emotional arc? (Problem -> Solution -> Celebration)
- Consistent personality? (Voice, tone, visual language)
- What would a journalist's headline be after a hands-on review?

### 4.5 Platform Story
- Does this app showcase what makes Apple's platform special?
- System capabilities used in ways that feel native and earned, not checkbox features?
- Watch integration: natural extension, not a shrunken iPhone?
- Widgets/Live Activities: glanceable story on their own?
- Does the app feel like it *belongs* here — couldn't exist anywhere else?

### 4.6 The Cringe Test
Walk through every screen in the demo flow and ask: "Would I be embarrassed
showing this on stage?"
- Placeholder content, unfinished corners, inconsistent styling
- Awkward copy, confusing iconography, developer-facing language
- Anything requiring explanation ("you have to long-press to...") is a fail

### Mechanical Audits (grep checks)
- Grep for developer-facing language in views: "JSON", "API", "debug", "nil",
  "config", "TODO", "test" (case insensitive, in user-visible strings)
- Check if onboarding uses placeholder art (SF Symbols as illustrations)
- Check for empty states that would appear during a demo

## Findings Target
Quality gate: produce 0–5 findings per bucket — do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed at this depth of review."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Keynote Review: [App Name]

### The Story
[Write the one-sentence pitch as Steve would say it on stage]

### Demo Readiness: [READY / ALMOST / NOT READY]

### The 90-Second Demo Script
1. [Opening shot — what the audience sees first]
2. [The problem moment — show the pain point]
3. [The solution — core action in real-time]
4. [The payoff — result that earns applause]
5. [The "one more thing" — if it exists]

### Scores (1-10)
| Dimension | Score | Notes |
|-----------|-------|-------|
| Story Clarity | X | ... |
| Demo Safety | X | ... |
| "One More Thing" Potential | X | ... |
| Narrative Coherence | X | ... |
| Platform Story | X | ... |
| Cringe-Free | X | ... |
| **Overall** | **X** | ... |

### Applause Moments (what earns the gasp)
- [specific moment with file:line context]

### Cringe Moments (what kills the demo)
- [ID: K-01] [Description] — [file:line] — Presentation: `[shipped @ file:line]` | `[wired-behind-flag @ file:line]` | `[debug-only @ file:line]` | `[dormant]` — [Why it fails] — [Fix]
  (debug-only and dormant views won't appear in a live demo — remove from "kills the demo" list and put under "demo gap: unshipped feature" instead)

### Missing "One More Thing" Candidates
- [ID: K-10] [Feature idea] — [Why it would wow] — [Estimated effort: S/M/L]

### References
- [WWDC sessions or Apple narrative patterns consulted]

## CRITICAL: You MUST produce the structured review above before your response
ends. Do NOT spend more than 60% of your work on reading files. You are writing
a demo script and critique, not auditing code. After reading the demo flow files,
STOP and write your review.
```

---

## Correlation Phase

After all panels complete, correlate findings into a unified report.

### Cross-Reference Rules

1. **Design + Engineering flag same area** -> Priority boost. Same root issue from two angles.
2. **Keynote + Design flag same area** -> Highest-impact polish target. Visible flaw.
3. **Keynote flags something no other panel caught** -> Story gap, not technical gap. High weight.
4. **Compliance flags something Design missed** -> Also a design gap (e.g. missing VoiceOver labels).
5. **Engineering + Compliance overlap** -> Merge into compliance finding (harder requirement).
6. **Multiple panels independently flagged the same issue** -> Note this; it strengthens the case.

### Dormant / Debug-Only Sanity Gate (MANDATORY before promoting any finding to P0/P1)

For EVERY Critical Issue / Cringe Moment that claims runtime user impact ("frustrates users", "interrupts flow", "jarring", "crash risk users hit"), the orchestrator MUST verify:

- The finding cites `[shipped @ file:line]` or `[wired-behind-flag @ file:line]` AND the gate is realistically reachable in a shipped Release build, OR
- The orchestrator runs its OWN reverse-reference grep (`ViewName(` against the app target, excluding the view's own file and previews/tests) and confirms a live call site that is NOT inside `#if DEBUG` or a debug-only gate.

**If no live call site exists:** the finding is reclassified as `[dormant]` and demoted to P3 "dead or staged code — decide" regardless of how many panels flagged it.

**If every call site is debug-only:** the finding is reclassified as `[debug-only]` and demoted to P3 unless it leaks symbols, strings, or secrets into the shipped binary.

**Why:** two panels reading the same dormant or debug-only file and each flagging it is NOT independent corroboration — it's the same mistake counted twice. Correlation between panels that read the same sources never upgrades confidence; only a presentation-graph trace does.

Plausibility is a trap. A finding that sounds clean and causal ("5-second capture → 20-second triage modal") is exactly when to grep the presenter before promoting to P1.

### ID Preservation Rule

Each panel issues prefixed IDs (`D-XX`, `E-XX`, `C-XX`, `K-XX`). The correlated findings table MUST keep panel-prefixed IDs verbatim — do NOT renumber to generic `X-XX`. When a single underlying issue is flagged by multiple panels, list all IDs in the row (e.g. `D-03, K-02`).

### Priority Framework

| Priority | Criteria | Action |
|----------|----------|--------|
| **P0 -- Blocker** | App Store rejection or crash users hit in Release | Fix before submission |
| **P1 -- Critical** | Significant UX degradation or architectural risk in shipped code path | Fix in next sprint |
| **P2 -- Important** | Polish gap, minor UX issue, tech debt | Plan for upcoming release |
| **P3 -- Enhancement / Dormant / Debug-only** | Would elevate the app but not blocking; or "ship / stage / delete" decisions on dormant or debug-only code | Backlog |

---

## Report Phase

Write the unified report to `docs/reviews/YYYY-MM-DD-apple-review-[app].md`.

### Unified Report Template

```markdown
# Apple Review: [App Name]

**Date:** YYYY-MM-DD
**Version:** [version]
**Reviewed by:** AI Apple Review Panel (Design + Engineering + Compliance + Keynote)

---

## Executive Summary

[3-5 sentences: overall assessment. Would this app impress Apple? Most important thing to address? Strongest aspect?]

### Scorecard

| Panel | Score | Verdict |
|-------|-------|---------|
| Design | X/10 | [one-line] |
| Engineering | X/10 | [one-line] |
| Keynote | X/10 | [one-line] |
| Compliance | X/10 | [one-line] |
| **Overall** | **X/10** | [one-line] |

### Submission Readiness: [READY / READY WITH CAVEATS / NOT READY]

---

## Design Review
[Full Panel 1 output]

---

## Engineering Review
[Full Panel 2 output]

---

## Keynote Review
[Full Panel 4 output]

---

## Compliance Review
[Full Panel 3 output]

---

## Correlated Findings

| ID | Issue | Panels | Priority | Effort |
|----|-------|--------|----------|--------|
| X-01 | ... | Design + Engineering | P0 | S/M/L |

---

## Action Plan

### P0 -- Blockers (fix before submission)
1. [D-01] [Issue] -- [Estimated effort]   ← keep the panel-prefixed ID

### P1 -- Critical (fix in next sprint)
### P2 -- Important (upcoming release)
### P3 -- Enhancements / Dormant decisions / Debug-only (backlog)

---

## Exit Criteria

- **Submit now**: Overall ≥ 8.5/10 AND zero P0 findings AND Compliance Risk Level ∈ {LOW, MEDIUM}.
- **Iterate**: Overall < 8.5 OR any P0 OR Compliance Risk ∈ {HIGH, REJECTION LIKELY}. Run the action plan and re-review once P0/P1 are closed.

---

## Appendix: Files Reviewed
[All files examined across all panels]
```

## Apple Documentation Verification

**MANDATORY for Design and Engineering panels:**

When evaluating HIG compliance, SwiftUI patterns, SwiftData usage, or any Apple framework API:

1. **Use Context7 MCP FIRST** for live API documentation — Query for official Apple framework docs when encountering unfamiliar APIs or verifying signatures. Context7 has the latest documentation and prevents hallucinations.
2. Use `Grep` to verify actual API usage patterns in the codebase.
3. Cross-reference Context7 findings with `ios26-api-reference` skill for crash prevention rules.
4. When Context7 is unavailable and you're uncertain about an API, flag it as "unverified" rather than asserting correctness.
5. For HIG compliance specifically, check against concrete patterns:
   - Navigation: are NavigationStack/NavigationSplitView used correctly?
   - Sheets: presentation detents, drag indicators, corner radius
   - Alerts: proper use of role: .destructive, confirmation dialogs
   - Accessibility: actual accessibilityLabel/Hint/Value counts
6. Do NOT hallucinate Apple guidelines. If you're unsure about a specific guideline number, omit the number and describe the requirement instead.

### Context7 Query Guidelines for Review Panels

**Engineering Panel:**
- Query Context7 for any API you haven't seen before
- Verify SwiftData predicate syntax, SwiftUI modifier chains, FoundationModels APIs
- Cross-check: Context7 for signature, ios26-api-reference for crash prevention

**Design Panel:**
- Query Context7 for HIG-specific guidance on new iOS 26 features
- Verify Liquid Glass (`glassEffect`) usage patterns
- Check accessibility API requirements for new components

**Compliance Panel:**
- Query Context7 for App Store Review Guidelines updates
- Verify privacy manifest requirements for specific frameworks
- Check entitlement documentation for protected APIs

## Execution Notes

- Each panel agent MUST produce structured output — this is non-negotiable
- The `code-reviewer` agent type is used for Design/Compliance/Keynote because it
  emphasizes analysis and structured output over exploration
- The `auditor` agent type is used for Engineering because it
  excels at deep codebase analysis with structured findings. If `auditor` is
  not available in the current environment, fall back to `architect` (preferred)
  or `code-reviewer`, and note the substitution in the report.
- If a panel agent returns without structured output, the main thread should note
  this in the report and fill in from its own reading
- Include the file manifest in each agent's prompt — this saves 3-5 tool calls per agent
- If the app has a Watch target, include it in Design and Engineering reviews
- If the app has Widgets, include them in all panels
- Total runtime: **10-20 minutes** for 4 parallel panels (longer with screenshot
  capture or operational signal collection; shorter in focused single-panel runs)

## Relationship to Other Skills

| Skill | Scope | Depth | When |
|-------|-------|-------|------|
| `apple-review` | Entire app | Deep, multi-panel | Major milestones, pre-submission |
| `ios-standards/review-checklist.md` | Recent code changes | Systematic checklist | Code review |
| `apple-patterns-check` | Code patterns only | Pattern matching with grep | Before commits |

<!-- END SKILL: apple-review -->

---

<!-- BEGIN SKILL: asc-build-check -->

# asc-build-check

# ASC Build Check

**Inspect CI builds, diagnose failures, and manage Developer Portal signing using the App Store Connect MCP server.**

## Workflow

### Step 1: Get Overview

Call `asc_status` to see all products and their recent build status.

If the user specified an app name, filter the output to that product.

### Step 2: Identify Failures

Look for builds where `completionStatus` is not `SUCCEEDED`. Common statuses:
- `SUCCEEDED` -- all good
- `FAILED` -- build or test failure
- `ERRORED` -- infrastructure/config issue
- `CANCELED` -- manually stopped

If all builds are green, report success and stop.

### Step 3: Drill Into Failures

For each failed build:

1. **Get build details:** Call `asc_get_build` with the build run ID to see all actions (build, test, archive, etc.) and which ones failed.

2. **Get issues:** Call `asc_get_issues` with the build run ID -- this is the fastest way to see all errors, warnings, and test failures in one call.

3. **Get test results** (if test action failed): Call `asc_get_test_results` to see which specific tests failed.

4. **Get logs** (if needed): Use `asc_get_build_logs` with the failed action ID to fetch build log artifacts. Then `asc_download_artifact` for specific log files.

### Step 3b: Diagnose Export/Signing Failures

If errors include `ExportArchiveStep` failures ("Exporting for X Distribution failed"):

1. **Parallel local analysis** — while calling `asc_check_signing`, dispatch an `explore` agent (Fast tier: `claude-haiku-4-5` / `gpt-4.1-mini` / `gemini-3.0-flash` / `kimi-for-coding`) to read local files simultaneously:

```
You (MCP calls)                    explore agent (local files)
asc_check_signing (bundle IDs)  ←→  find all *.entitlements files
asc_list_profiles               ←→  read xcconfig for CODE_SIGN_IDENTITY
asc_list_certificates           ←→  grep for com.apple.developer.* keys
         │                                     │
         └──────────── compare ───────────────┘
```

   **Explore agent prompt:**
   ```
   Read all .entitlements files in <app-dir> and report:
   - File path → bundle ID (from app-dir name or filename)
   - All com.apple.developer.* keys present
   - App group identifiers (com.apple.security.application-groups values)
   - Any aps-environment value (push notifications)
   Return as a flat list: bundleId | entitlementKey | value
   ```

2. **Compare results:** Cross-reference the explore agent output with `asc_check_signing` to find mismatches between local entitlements and Developer Portal capabilities.

3. **Fix mismatches:** Use `asc_add_capability` to add missing capabilities directly via the API.

4. **Verify certificates and profiles:** The health check also reports certificate and profile status.

### Step 4: Report

Present a clear summary:

```
## Build Status: [Product Name]

**Build #[number]** -- [branch] -- [status]
Started: [time] | Finished: [time]

### Failures
- [action name]: [error summary]
  - File: [path]:[line]
  - Message: [compiler/test error]

### Signing Status (if applicable)
- [bundle ID]: [OK | Missing: CAPABILITY_NAME]

### Suggested Fix
[Actionable suggestion based on the error]
```

### Step 5: Fix (if asked)

If the user asks to fix the issue:
1. **Code errors:** Locate the file, read context, apply fix, verify with a local archive build
2. **Signing errors:** Use `asc_add_capability` to fix portal mismatches, then push to trigger a new build

## Entitlements Reference

When checking signing, read entitlements files and map to capability types:

| Entitlement Key | Capability Type |
|----------------|-----------------|
| `com.apple.security.application-groups` | `APP_GROUPS` |
| `com.apple.developer.icloud-container-identifiers` | `ICLOUD` |
| `com.apple.developer.healthkit` | `HEALTHKIT` |
| `aps-environment` | `PUSH_NOTIFICATIONS` |
| `com.apple.developer.applesignin` | `APPLE_ID_AUTH` |
| `com.apple.developer.associated-domains` | `ASSOCIATED_DOMAINS` |

## MCP Tools Reference

### CI / Build Tools

| Tool | Purpose |
|------|---------|
| `asc_status` | Quick overview of all products + last 3 builds |
| `asc_list_products` | List CI products (get IDs) |
| `asc_list_workflows` | List workflows for a product |
| `asc_list_builds` | List build runs (filter by workflow/product) |
| `asc_get_build` | Build details + all actions |
| `asc_get_issues` | All errors/warnings/test failures |
| `asc_get_test_results` | Test pass/fail results |
| `asc_get_build_logs` | Log artifacts for a build action |
| `asc_download_artifact` | Download specific artifact content |
| `asc_trigger_build` | Manually re-trigger a build without a new commit |
| `asc_wait_for_build` | Block + poll until a build completes, returns issues inline |

### Developer Portal / Signing Tools

| Tool | Purpose |
|------|---------|
| `asc_list_bundle_ids` | List registered bundle IDs (filter by app name) |
| `asc_get_capabilities` | Get capabilities for a specific bundle ID |
| `asc_add_capability` | Add a capability (e.g. APP_GROUPS) to a bundle ID |
| `asc_remove_capability` | Remove a capability from a bundle ID |
| `asc_list_certificates` | List all signing certificates + expiration |
| `asc_list_profiles` | List provisioning profiles (filter by state/type) |
| `asc_check_signing` | Health check -- compare expected vs portal capabilities, check certs & profiles |
| `asc_create_certificate` | Generate CSR, submit to Apple, install in login keychain |
| `asc_revoke_certificate` | Revoke a certificate by ID |
| `asc_create_profile` | Create a provisioning profile for a bundle ID + certificate |
| `asc_delete_profile` | Delete a provisioning profile by ID |
| `asc_setup_signing` | One-shot: create dist cert + all App Store profiles for given bundle IDs |

<!-- END SKILL: asc-build-check -->

---

<!-- BEGIN SKILL: asc-submission -->

# asc-submission

# ASC Submission

**Prepare apps for App Store review or TestFlight distribution using the App Store Connect MCP server.**

## Workflows

### Workflow A: Full Submission Readiness Check

When the user asks to prepare or check submission readiness, run steps 1–2 sequentially then dispatch parallel validation.

1. **Get app ID:** Call `asc_list_apps` and find the app by name/bundle ID.

2. **Check version exists:** Call `asc_list_versions` to find a version in PREPARE_FOR_SUBMISSION state. If none exists, create one with `asc_create_version`.

3. **Parallel validation** — dispatch two agents simultaneously:

```
Coordinator (you)
├─► Agent A — Signing + Readiness check   [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
└─► Agent B — Local entitlements scan     [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
         │
         ▼ (both complete)
Coordinator — aggregate results, report missing items, offer to fix
```

**Agent A prompt:**
```
Check submission readiness for app ID: <app_id>

1. Call asc_check_signing with bundle IDs: <list>
   and expected capabilities from the entitlements scan (provided by Agent B)
2. Call asc_check_submission with app ID: <app_id>

Report:
- SIGNING: OK / ISSUES (list mismatches)
- METADATA: OK / MISSING (list required fields)
- SCREENSHOTS: OK / MISSING (list devices/locales)
- OVERALL: READY / BLOCKED (list blockers)
```

**Agent B prompt:**
```
Read local entitlements files and report capabilities for each bundle ID.

1. Find all .entitlements files: find <app-dir> -name "*.entitlements"
2. For each file, extract: app group identifiers, capability keys, bundle ID
3. Return a map: { bundleId: [capability1, capability2, ...] }

This output feeds Agent A's signing check.
```

4. **Report missing items** and offer to fix them.

### Workflow B: Update Metadata

When the user asks to update metadata, what's new, or description:

1. **Get app and version:** `asc_list_apps` then `asc_list_versions` (find PREPARE_FOR_SUBMISSION version).

2. **Get current metadata:** `asc_get_metadata` with the version ID.

3. **Generate content:**
   - **What's New:** Generate from git commits since last release tag. Use `git log` to find commits, then write a user-friendly summary.
   - **Description:** Review current description and suggest updates.
   - **Keywords:** Analyze current keywords and suggest improvements.

4. **Update:** Call `asc_update_metadata` with the localization ID and new content.

### Workflow C: TestFlight Distribution

When the user wants to distribute a build to TestFlight:

1. **List builds:** Call `asc_list_tf_builds` filtered by app ID. Find the latest processed build.

2. **Set beta notes:** Call `asc_set_beta_notes` with a "What to Test" summary generated from recent commits.

3. **List beta groups:** Call `asc_list_beta_groups` to find the target group.

4. **Distribute:** Call `asc_distribute_build` to add the build to the group.

### Workflow D: Submit for Review

When the user explicitly asks to submit for review:

1. **Run readiness check** (Workflow A) first.

2. **If ready:** Confirm with the user, then call `asc_submit_for_review`.

3. **If not ready:** Report missing items and offer to fix them.

## Metadata Guidelines

### What's New Text
- Keep under 4000 characters
- Lead with the most impactful change
- Use bullet points for multiple changes
- Write for users, not developers (no technical jargon)
- Example: "New haptic feedback during focus sessions" not "feat(haptics): add UIFeedbackGenerator"

### Keywords
- Max 100 characters, comma-separated
- No spaces after commas
- Include app name variations and key features

### Description
- Lead with the core value proposition
- Structure: what it does, who it's for, key features, how it works
- Include accessibility mentions for App Store featuring consideration

## MCP Tools Reference

### App Store

| Tool | Purpose |
|------|---------|
| `asc_list_apps` | List all apps (get IDs) |
| `asc_list_versions` | List App Store versions and their states |
| `asc_create_version` | Create a new version (e.g. '1.1.0') |
| `asc_get_metadata` | Get description, keywords, what's new per locale |
| `asc_update_metadata` | Update description, keywords, what's new |
| `asc_get_app_info` | Get app name, subtitle, privacy URL |
| `asc_update_app_info` | Update app name, subtitle, privacy URL |
| `asc_list_screenshots` | List screenshots per locale and display type |
| `asc_submit_for_review` | Submit version for App Review |
| `asc_check_submission` | Readiness check -- verifies everything needed for submission |

### TestFlight

| Tool | Purpose |
|------|---------|
| `asc_list_tf_builds` | List TestFlight builds (version, state, dates) |
| `asc_list_beta_groups` | List beta groups (internal/external) |
| `asc_distribute_build` | Add a build to a beta group |
| `asc_set_beta_notes` | Set "What to Test" text for a build |

## Transporter Validation

Apple Transporter runs during CI upload to App Store Connect -- it does not run locally. Even if a local export or archive succeeds, Transporter can still reject the build during upload.

### What Transporter Validates

- **Provisioning profile validity:** Profile must be active, not expired, and match the bundle ID exactly
- **Metadata completeness:** Required fields (bundle display name, version, build number) must be present
- **Bundle ID consistency:** The bundle ID in the binary must match the provisioning profile and App Store Connect record
- **Entitlements:** Every entitlement in the binary must correspond to a real Apple capability enabled in the Developer Portal

### Common Transporter Failures

| Failure | Cause | Fix |
|---------|-------|-----|
| Missing watchOS icons | Asset catalog incomplete for Watch target | Add all required icon sizes to the Watch asset catalog |
| Invalid provisioning profile | Profile expired or revoked | Regenerate via `xc_create_profile` or Developer Portal |
| Fake entitlements | Non-existent entitlement keys in .entitlements file | Remove fabricated keys (e.g., `com.apple.developer.widgetkit` is not real) |
| Bundle ID mismatch | Binary bundle ID differs from profile | Verify `PRODUCT_BUNDLE_IDENTIFIER` matches the provisioning profile |
| Missing privacy manifest | `PrivacyInfo.xcprivacy` absent from extension target | Add privacy manifest to each target that uses required reason APIs |

### Debugging Transporter Rejections

Transporter errors surface in Xcode Cloud build logs after the archive step. Use `xc_get_issues` to read the full error list. Local reproduction requires `xcrun altool --validate-app` or Transporter.app, but the fastest path is fixing based on the CI error message and re-pushing.

---

### Developer Portal (from asc-build-check)

| Tool | Purpose |
|------|---------|
| `asc_check_signing` | Health check -- compare entitlements vs portal capabilities |
| `asc_add_capability` | Fix missing capabilities |

<!-- END SKILL: asc-submission -->

---

<!-- BEGIN SKILL: complete-feature -->

# complete-feature

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

<!-- END SKILL: complete-feature -->

---

<!-- BEGIN SKILL: ios-accessibility -->

# ios-accessibility

Audit SwiftUI file(s) for accessibility issues and apply fixes. If no file is specified, audit all main views in the app.

## Workflow

1. Read the design system / theme file first — confirm canonical font styles and spacing tokens
2. Read each target file fully before editing
3. Apply all fixes in one pass per file
4. Summarize changes grouped by category (VoiceOver, Dynamic Type, Tap targets)
5. Flag any issues requiring runtime testing (VoiceOver navigation order, contrast in real lighting)

---

## VoiceOver Labels

- Every interactive element (button, toggle, slider, gesture area) needs `.accessibilityLabel()` describing its **purpose**, not its visual appearance
  - Bad: `.accessibilityLabel("Purple ring")` — describes appearance
  - Good: `.accessibilityLabel("Focus session progress, 18 minutes remaining")` — describes meaning
- Icon-only and image-only buttons always need explicit labels
- Decorative visuals should be silenced with `.accessibilityHidden(true)`
- Compound views: use `.accessibilityElement(children: .ignore)` on the container and compose a single label + value

### Hints and Traits

- `.accessibilityHint()` — use for non-obvious gestures: `"Double-tap to pause session"`
- `.accessibilityAddTraits(.updatesFrequently)` — live countdown text (prevents VoiceOver interrupting every second)
- `.accessibilityAddTraits(.isHeader)` — section headings in lists
- `.accessibilityAddTraits(.isButton)` — any `Text` or `ZStack` wired to `onTapGesture` instead of native `Button`
- `.accessibilityAddTraits(.isSelected)` — selected filter chips, tabs

---

## Dynamic Type

- All text must use a semantic `Font` style (`.body`, `.headline`, `.caption`, `.title2`, etc.) — never a hardcoded point size like `.font(.system(size: 48))`
- Use `@ScaledMetric` for spacing constants and icon frame sizes that need to grow proportionally:
  ```swift
  @ScaledMetric(relativeTo: .body) private var iconSize: CGFloat = 24
  ```
- Layouts must not clip at `accessibilityExtraExtraExtraLarge`. Replace fixed `.frame(width:)` on text containers with `.frame(maxWidth: .infinity, alignment: .leading)`
- Check the design system / theme file for any font definitions using fixed sizes — replace with scaled equivalents

---

## Tap Targets

- Any tappable area smaller than 44×44pt must reach that minimum via `.frame(minWidth: 44, minHeight: 44)` or padding
- Add `.contentShape(Rectangle())` so the entire padded area is hittable
- Confirm purely decorative elements aren't accidentally hittable; add `.accessibilityHidden(true)` if so

---

## Semantic Grouping

- Related elements that form one logical unit: use `.accessibilityElement(children: .ignore)` on the container with a single composed label
- Wrapper containers that add no meaning: leave default (`.accessibilityElement(children: .contain)`)
- Avoid double-announcing content that's already labeled on children

---

## Swipe Actions

SwiftUI's `.swipeActions` is automatically VoiceOver-accessible — verify the button label is descriptive:

```swift
.swipeActions(edge: .trailing, allowsFullSwipe: true) {
    Button(role: .destructive) { ... } label: {
        Label("Delete", systemImage: "trash")
    }
    .accessibilityLabel("Delete capture")
}
```

---

## Checklist

- [ ] All interactive elements have `.accessibilityLabel()`
- [ ] Decorative elements have `.accessibilityHidden(true)`
- [ ] Live-updating text has `.accessibilityAddTraits(.updatesFrequently)`
- [ ] Section headers have `.accessibilityAddTraits(.isHeader)`
- [ ] No hardcoded font sizes — all use semantic styles
- [ ] `@ScaledMetric` for icon sizes and key spacing
- [ ] All tap targets are 44×44pt minimum
- [ ] Selected states use `.accessibilityAddTraits(.isSelected)`
- [ ] Compound views grouped with single composed label

<!-- END SKILL: ios-accessibility -->

---

<!-- BEGIN SKILL: ios-asc -->

# ios-asc

# iOS App Store Connect

**Manage signing, provisioning, TestFlight distribution, and app submission using MCP tools.** These tools connect directly to Apple's App Store Connect API — no manual portal navigation required.

---

## MCP Tool Overview

### Signing Tools

| Tool | Purpose |
|------|---------|
| `xc_setup_signing` | **One-shot setup**: Create distribution cert + App Store profiles for all bundle IDs |
| `xc_check_signing` | **Health check**: Compare local entitlements vs portal capabilities, verify certs & profiles |
| `xc_create_certificate` | Generate CSR, submit to Apple, install in login keychain |
| `xc_revoke_certificate` | Revoke a certificate by ID |
| `xc_list_certificates` | List all certificates with expiration dates |

### Provisioning Tools

| Tool | Purpose |
|------|---------|
| `xc_list_bundle_ids` | List registered bundle IDs (filter by identifier substring) |
| `xc_register_bundle_id` | Register a new bundle ID in the Developer Portal |
| `xc_delete_bundle_id` | Remove a bundle ID from the portal |
| `xc_get_capabilities` | Get capabilities enabled for a bundle ID |
| `xc_add_capability` | Add a capability (e.g., APP_GROUPS) to a bundle ID |
| `xc_remove_capability` | Remove a capability from a bundle ID |
| `xc_list_profiles` | List provisioning profiles (filter by state/type) |
| `xc_create_profile` | Create a provisioning profile for bundle ID + certificate |
| `xc_delete_profile` | Delete a provisioning profile by ID |

### TestFlight Tools

| Tool | Purpose |
|------|---------|
| `xc_list_apps` | List all apps with IDs, names, bundle IDs, current versions |
| `xc_list_tf_builds` | List TestFlight builds with version, state, processing status |
| `xc_list_beta_groups` | List beta groups (internal/external) |
| `xc_create_beta_group` | Create a new TestFlight beta group |
| `xc_update_beta_group` | Update group settings (public link, feedback, etc.) |
| `xc_delete_beta_group` | Remove a beta group |
| `xc_list_beta_testers` | List testers (filter by group, app, or email) |
| `xc_invite_beta_tester` | Invite a tester by email to a group |
| `xc_remove_beta_tester` | Remove a tester from a group |
| `xc_distribute_build` | Add a build to a beta group for distribution |
| `xc_set_beta_notes` | Set "What to Test" text for a build |
| `xc_submit_beta_review` | Submit build for external beta review |

### Metadata & Release Tools

| Tool | Purpose |
|------|---------|
| `xc_list_versions` | List App Store versions with state (READY_FOR_SALE, PREPARE_FOR_SUBMISSION, etc.) |
| `xc_create_version` | Create a new App Store version (e.g., "1.1.0") |
| `xc_update_version` | Update version attributes (release type, scheduled date) |
| `xc_get_metadata` | Get localized metadata (description, keywords, what's new) |
| `xc_create_localization` | Create a new locale for a version |
| `xc_update_metadata` | Update localized metadata |
| `xc_get_app_info` | Get app-level info (name, subtitle, privacy URL) |
| `xc_update_app_info` | Update app-level localized info |
| `xc_set_review_detail` | Set review contact info and demo account |
| `xc_submit_for_review` | Submit version for App Review |
| `xc_release_version` | Manually release an approved version |

---

## Common Workflows

### One-Shot Signing Setup

Use this when setting up a new app or fixing "No profiles found" errors:

```bash
# 1. Read local entitlements to identify expected capabilities
find . -name "*.entitlements" -exec cat {} \;

# 2. Run one-shot signing setup
# (Use xc_setup_signing with all bundle identifiers)
# Creates distribution cert + App Store profiles for each bundle ID
```

The `xc_setup_signing` tool:
- Creates an Apple Distribution certificate if none exists
- Generates App Store provisioning profiles for each bundle ID
- Installs the certificate in your login keychain

### Checking Signing Health

Run this when builds fail with signing errors:

```bash
# 1. Read entitlements files
find . -name "*.entitlements" -exec cat {} \;

# 2. Run signing health check
# (Use xc_check_signing with each bundle ID and expected capabilities)
```

The `xc_check_signing` tool reports:
- Missing capabilities in the portal vs local entitlements
- Certificate status and expiration
- Provisioning profile existence and validity

### Creating a New Bundle ID with Capabilities

```bash
# 1. Register the bundle ID
# (Use xc_register_bundle_id with identifier and name)

# 2. Add required capabilities
# (Use xc_add_capability with bundle_id_id and capability_type)

# 3. Create provisioning profile
# Get certificate IDs from xc_list_certificates
# (Use xc_create_profile with bundle_id_id and certificate_ids)
```

### Distributing a Build to TestFlight

```bash
# 1. List available builds
# (Use xc_list_tf_builds with optional app_id filter)

# 2. List beta groups
# (Use xc_list_beta_groups with app_id)

# 3. Distribute build to group
# (Use xc_distribute_build with build_id and beta_group_id)
```

### Setting Beta Test Notes

```bash
# 1. List builds to get build ID
# (Use xc_list_tf_builds)

# 2. Set "What to Test" notes
# (Use xc_set_beta_notes with build_id and whats_new text)
```

---

## Capability Mapping

Map entitlements file keys to capability types for MCP tools:

| Entitlement Key | Capability Type |
|-----------------|-----------------|
| `com.apple.security.application-groups` | `APP_GROUPS` |
| `com.apple.developer.icloud-container-identifiers` | `ICLOUD` |
| `com.apple.developer.healthkit` | `HEALTHKIT` |
| `aps-environment` | `PUSH_NOTIFICATIONS` |
| `com.apple.developer.applesignin` | `APPLE_ID_AUTH` |
| `com.apple.developer.associated-domains` | `ASSOCIATED_DOMAINS` |
| `com.apple.developer.in-app-payments` | `IN_APP_PURCHASE` |
| `com.apple.developer.siri` | `SIRIKIT` |
| `com.apple.developer.networking.wifi-info` | `ACCESS_WIFI_INFORMATION` |
| `com.apple.developer.default-data-protection` | `DATA_PROTECTION` |

### Example: Reading Entitlements

```xml
<!-- MyApp.entitlements -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.application-groups</key>
    <array>
        <string>group.com.example.myapp</string>
    </array>
    <key>aps-environment</key>
    <string>production</string>
</dict>
</plist>
```

Required capabilities: `APP_GROUPS`, `PUSH_NOTIFICATIONS`

---

## Fastlane Integration

### Alpha Lanes (TestFlight Upload)

```ruby
# fastlane/Fastfile
lane :alpha do
  increment_build_number
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight(
    skip_waiting_for_build_processing: false,
    notify_external_testers: false
  )
end

lane :alpha_next do
  bump_build  # Custom lane to increment build
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight
end
```

Run with:
```bash
cd apps/myapp && bundle exec fastlane alpha
```

### Beta Review Submission

```ruby
lane :submit_beta do
  # Distribute to external group triggers beta review
  upload_to_testflight(
    distribute_external: true,
    groups: ["External Testers"],
    changelog: "Bug fixes and improvements"
  )
end
```

### Metadata Sync

```ruby
lane :sync_metadata do
  download_from_app_store_connect(
    metadata_path: "./fastlane/metadata"
  )
  # Edit files in fastlane/metadata/
  upload_to_app_store_connect(
    metadata_path: "./fastlane/metadata",
    skip_binary_upload: true,
    skip_screenshots: true
  )
end
```

---

## Troubleshooting

### No Profiles Found

**Error:** `No profiles for 'com.example.app' were found`

**Solution:**
1. Check if bundle ID is registered: `xc_list_bundle_ids`
2. If missing, register it: `xc_register_bundle_id`
3. Run one-shot setup: `xc_setup_signing`
4. Or manually create profile: `xc_create_profile`

### Certificate Expiration

**Error:** `Signing certificate expired`

**Solution:**
1. List certificates: `xc_list_certificates`
2. Check expiration dates
3. If expiring soon, create new: `xc_create_certificate`
4. Old certificates can be revoked: `xc_revoke_certificate`

### Capability Mismatches

**Error:** `Provisioning profile doesn't include the aps-environment entitlement`

**Solution:**
1. Read local entitlements file
2. Check portal capabilities: `xc_get_capabilities`
3. Add missing capability: `xc_add_capability`
4. Recreate provisioning profile: `xc_create_profile`

### Build Processing Failures

**Error:** Build stuck in "Processing" or fails TestFlight upload

**Common causes:**
- **Missing compliance:** Set encryption declaration with `xc_set_encryption`
- **Invalid binary:** Check for private API usage or missing icons
- **Version conflict:** Bump build number with `increment_build_number`
- **API key issues:** Verify `ASC_KEY_PATH` environment variable

### Profile Not Found After Creation

Xcode may cache old profiles. Force refresh:

```bash
# Remove cached profiles
rm -rf ~/Library/MobileDevice/Provisioning\ Profiles/*

# Restart Xcode
# Download profiles: Xcode > Settings > Accounts > Download Manual Profiles
```

---

## Quick Reference

### Essential Commands

```bash
# Check signing health for all apps
make validate-fast

# Archive build (catches signing errors)
make archive-{app}

# Full export test (catches provisioning errors)
make export-test-{app}

# Upload to TestFlight
bundle exec fastlane alpha
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `ASC_KEY_PATH` | Path to App Store Connect API key (`.p8` file) |
| `ASC_KEY_ID` | Key ID from App Store Connect |
| `ASC_ISSUER_ID` | Issuer ID from App Store Connect |
| `TEAM_ID` | Apple Developer Team ID |

### Bundle ID Patterns

```
com.example.myapp              # Main app
com.example.myapp.watch        # Watch app
com.example.myapp.widgets      # Widget extension
com.example.myapp.watch.widgets # Watch widgets
```

---

## See Also

- `ios-build` — Build validation and troubleshooting
- `ios-standards` — Swift 6 concurrency patterns
- `check-build` — Diagnose build/signing failures (project-specific)

<!-- END SKILL: ios-asc -->

---

<!-- BEGIN SKILL: ios-build -->

# ios-build

# iOS Build

Build system patterns, validation workflows, and troubleshooting. **Run validation before every commit.**

---

## The 4-Layer Validation Pipeline

Use the lightest layer that matches your situation.

| Layer | Command | Time | What It Catches |
|-------|---------|------|-----------------|
| **1. Fast** | `make validate-fast` | ~30s | Lint, isolation violations, safety patterns |
| **2. Full** | `make validate` | ~3 min | Layer 1 + archive builds (Swift 6 strict concurrency) |
| **3. Export Test** | `make export-test-{app}` | ~5 min | Layer 2 + signing, provisioning, icons, entitlements |
| **4. Upload** | `bundle exec fastlane alpha` | ~10 min | Layer 3 + Apple Transporter, TestFlight processing |

### When to Use Each Layer

- **During development:** `make validate-fast` after each significant change
- **Before committing:** `make validate` at minimum
- **Before pushing:** `make export-test-{app}` for the affected app(s)
- **Release:** `bundle exec fastlane alpha` to upload

---

## Critical Rule: Archive vs Debug Builds

**Debug/simulator builds do NOT catch all strict concurrency errors.**

Swift 6 strict concurrency checking is more thorough in optimized builds:

```bash
# Debug build — misses some concurrency errors
xcodebuild -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' build

# Archive build — catches ALL concurrency errors
xcodebuild -scheme MyApp -destination 'generic/platform=iOS' archive
```

Always run archive builds before committing Swift code changes.

---

## XcodeGen

### Project Structure

```yaml
# project.yml
name: MyApp
targets:
  MyApp-iOS:
    type: application
    platform: iOS
    deploymentTarget: "26.0"
    sources:
      - MyApp-iOS
    dependencies:
      - target: MyAppKit
      - sdk: HealthKit.framework
      - sdk: Speech.framework
    settings:
      base:
        SWIFT_STRICT_CONCURRENCY: complete
        SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
        PRODUCT_BUNDLE_IDENTIFIER: com.example.myapp
    info:
      path: MyApp-iOS/Info.plist
      properties:
        UISupportedInterfaceOrientations: [UIInterfaceOrientationPortrait]
        
  MyAppKit:
    type: framework
    platform: iOS
    sources:
      - MyAppKit/Sources
```

### Regenerating Project

```bash
# After any project.yml change
xcodegen generate

# With specific spec
xcodegen generate --spec project.yml
```

### Adding Files

**Do NOT manually edit `.xcodeproj`.** XcodeGen automatically includes files from configured source directories.

```yaml
sources:
  - MyApp-iOS           # All .swift files included
  - path: Resources      # Non-code resources
    buildPhase: resources
```

### XcodeGen Hyphen to Underscore

**Critical:** XcodeGen converts hyphens in target names to underscores in Swift module names:

```yaml
# project.yml
targets:
  MyApp-iOS:           # Target name with hyphen
    # ...
```

```swift
// Generated Swift module uses underscore
@testable import MyApp_iOS  // Not MyApp-iOS
```

### Watch App Configuration

**Critical:** Watch apps require specific XcodeGen configuration to embed properly:

```yaml
# WRONG — causes Xcode Cloud archive failures
targets:
  MyApp-iOS:
    scheme:
      buildTargets:           # Don't include Watch targets here!
        - MyApp-iOS
        - MyApp-Watch         # ❌ Breaks Xcode Cloud
        
# RIGHT — embed via target dependency only
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch
        embed: true
        copyFiles:
          - destination: products/Watch
            subpath: MyAppWatch.app
            
  MyApp-Watch:
    type: application.watchapp2
    platform: watchOS
    deploymentTarget: "10.0"
    sources:
      - MyApp-Watch
```

**Key rules:**
1. Never add Watch targets to the iOS scheme's `buildTargets` — breaks Xcode Cloud
2. Use `embed: true` with `copyFiles` to `products/Watch`
3. Watch app will build automatically via target dependency

---

## Build Commands

### Simulator Build (Fast)

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | grep -E "error:|Build succeeded"
```

### Device Build

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'generic/platform=iOS' \
  build
```

### Archive Build (Required for Validation)

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'generic/platform=iOS' \
  -archivePath build/MyApp.xcarchive \
  archive
```

### Export Test (CI-Equivalent)

```bash
# Create export options plist
cat > exportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
</dict>
</plist>
EOF

# Export archive
xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist exportOptions.plist \
  -exportPath build/ipa
```

---

## Testing

### Unit Tests (Package)

```bash
cd MyAppKit && swift test
```

### Unit Tests (Xcode)

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests
```

### UI Tests

```bash
xcodebuild test -scheme MyApp-iOS-UITests \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max'
```

### Specific Test

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests/test_startFromIdle
```

---

## Common Build Errors

### Strict Concurrency Errors

**Error:** `Call to main actor-isolated instance method in a synchronous nonisolated context`

**Fix:** Add `@MainActor` annotation:

```swift
// Before
class ViewModel {
    func update() { }
}

// After
@MainActor
class ViewModel {
    func update() { }
}
```

### Sendable Errors

**Error:** `Non-sendable type 'X' returned by call crossing isolation boundary`

**Fix:** Use `@preconcurrency import` or extract values:

```swift
@preconcurrency import EventKit

@MainActor
final class Service {
    private let store = EKEventStore()
}
```

### Task Isolation Errors

**Error:** `Reference to captured var 'self' in concurrently-executing code`

**Fix:** Use `[weak self]` with explicit isolation:

```swift
// Wrong
Task {
    await self.update()
}

// Right
Task { @MainActor [weak self] in
    guard let self = self else { return }
    await self.update()
}
```

### Missing Provisioning Profile

**Error:** `No profiles for 'com.example.app' were found`

**Fix:** Use MCP tools to check and fix signing:

```bash
# Check signing status
# (Use xc_check_signing MCP tool with bundle ID and expected capabilities)

# Fix with one-shot setup
# (Use xc_setup_signing MCP tool with bundle identifiers)
```

### DerivedData Issues

```bash
# Clear DerivedData for this project
rm -rf ~/Library/Developer/Xcode/DerivedData/MyApp-*

# Clear all DerivedData (nuclear option)
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### SwiftData Model Changes

**Error:** Crash after changing @Model properties

**Fix:** Delete app to recreate database:

```bash
xcrun simctl uninstall booted com.example.myapp
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  test:
    runs-on: macos-15
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.4.8
          bundler-cache: true
      
      - name: Install XcodeGen
        run: brew install xcodegen
      
      - name: Generate Project
        run: xcodegen generate
      
      - name: Run Package Tests
        run: cd MyAppKit && swift test
      
      - name: Archive Build (catches concurrency errors)
        run: |
          xcodebuild archive \
            -scheme MyApp-iOS \
            -destination 'generic/platform=iOS' \
            -archivePath build/MyApp.xcarchive
      
      - name: Run Unit Tests
        run: |
          xcodebuild test \
            -scheme MyApp-iOS \
            -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
            -only-testing:MyAppTests | xcpretty
```

### Fastlane Integration

```ruby
# fastlane/Fastfile
lane :test do
  run_tests(scheme: "MyApp-iOS")
end

lane :archive do
  build_app(
    scheme: "MyApp-iOS",
    export_method: "app-store"
  )
end

lane :alpha do
  increment_build_number
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight
end
```

---

## CI/CD Gotchas

### Build Number Regression

**Critical:** TestFlight rejects uploads with regressed build numbers:

```bash
# WRONG — hardcoded build number
# If TestFlight has build 50, and you upload build 45:
# Apple silently rejects the upload

# RIGHT — inject via agvtool in ci_pre_xcodebuild.sh
#!/bin/bash
agvtool new-version -all "${CI_BUILD_NUMBER}"
```

**Never rely on Xcode Cloud's "Manage Version and Build Number" setting** — it's unreliable and causes conflicts.

### DerivedData Corruption + Fastlane Clean

**Critical:** Corrupted DerivedData + `clean: true` = 30+ minute builds:

```ruby
# WRONG — clean every build
build_app(
  scheme: "MyApp-iOS",
  clean: true  # ❌ 30+ min builds if DerivedData corrupted
)

# RIGHT — only clean when necessary
build_app(
  scheme: "MyApp-iOS"
  # clean: false (default) — incremental builds
)
```

Fix corrupted DerivedData manually:
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/MyApp-*
```

### App Store Keywords with Apple Trademarks

Apple rejects apps with trademarked terms in keywords:

```
# keywords.txt — REJECTED
keynote,presentation,powerpoint,slides

# keywords.txt — ACCEPTED
presentation,speech,timer,practice,talk
```

**Never include:** keynote, powerpoint, keynote remote, final cut, logic pro, etc.

### Usage Descriptions for Unused Capabilities

Apple rejects apps declaring usage descriptions for capabilities they don't use:

```xml
<!-- REJECTED — app doesn't actually use health data -->
<key>NSHealthShareUsageDescription</key>
<string>This app does not use health data</string>
```

Remove the entitlement entirely if not used.

---

## Build Settings Reference

### Essential Swift 6 Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `SWIFT_VERSION` | `6.0` | Swift 6 language mode |
| `SWIFT_STRICT_CONCURRENCY` | `complete` | Full concurrency checking |
| `SWIFT_DEFAULT_ACTOR_ISOLATION` | `MainActor` | UI isolation by default |

### In project.yml

```yaml
settings:
  base:
    SWIFT_VERSION: "6.0"
    SWIFT_STRICT_CONCURRENCY: complete
    SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
    ENABLE_USER_SCRIPT_SANDBOXING: NO
    GENERATE_INFOPLIST_FILE: NO
```

---

## Best Practices

1. **Always run archive builds** before committing — debug builds miss concurrency errors
2. **Use `make validate`** as a pre-commit check
3. **Regenerate project** after project.yml changes
4. **Clear DerivedData** when builds behave strangely
5. **Use MCP tools** for signing issues, not manual portal fixes
6. **Test on device** periodically — simulators don't catch all issues

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios-asc` — App Store Connect MCP tools for signing
- `ios-test` — Testing patterns and commands

<!-- END SKILL: ios-build -->

---

<!-- BEGIN SKILL: ios-design -->

# ios-design

# iOS Design

SwiftUI design system patterns, iOS 26 Liquid Glass effects, and accessibility best practices. **Apply these patterns to all UI code.**

---

## Design System Architecture

### Theme.swift Pattern

Centralize design tokens in a theme enum. Apps extend a shared base theme for app-specific expression.

```swift
// Shared package: AetherTheme.swift
public enum AetherTheme {
    // Foundation: Backgrounds
    public static var canvas: Color {
        Color(light: Color(hex: "#FAF9F6"), dark: Color(hex: "#0D0D0F"))
    }
    
    // Action: Primary color
    public static let actionPrimary = Color(hex: "#7BA7BC")
    
    // Spacing system
    public enum Spacing {
        public static let xs: CGFloat = 8
        public static let md: CGFloat = 16
        public static let lg: CGFloat = 24
    }
    
    // Corner radius
    public enum Radius {
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 12
        public static let capsule: CGFloat = 999
    }
}

// App-specific: Theme.swift
enum Theme {
    // Inherit from shared theme
    static let primary = AetherTheme.actionPrimary
    static let spacing = AetherTheme.Spacing.self
    
    // App-specific expression
    static var dialFace: Color {
        Color(light: AetherTheme.surface, dark: Color(hex: "#1A1A1E"))
    }
}
```

### Design Tokens vs Hardcoded Values

| Do | Don't |
|----|-------|
| `Theme.primary` | `Color.blue` |
| `Theme.Spacing.md` | `16` |
| `Theme.Radius.capsule` | `999` |
| `AetherTheme.canvas` | `Color.white` |

### Asset Catalog Organization

```
Assets.xcassets/
  Colors/
    Primary.colorset/
    Surface.colorset/
  Images/
    AppIcon.appiconset/
    Logo.imageset/
```

Prefer code-defined colors (hex values in theme) for dynamic dark mode support.

---

## iOS 26 Liquid Glass

### Glass Background Effects

```swift
// Standard glass background
.glassEffect(.regular)

// Glass with interactive (hover/press) feedback
.glassEffect(.regular.interactive())

// Ornament for floating controls
.ornament(visibility: .visible, attachmentAnchor: .scene(.trailing)) {
    FloatingControls()
        .glassEffect(.regular)
}
```

### Glass Material Hierarchy

```swift
// Thick material for modals, sheets
.background(.thickMaterial)

// Regular material for cards, surfaces
.background(.regularMaterial)

// Thin material for subtle overlays
.background(.ultraThinMaterial)

// From theme
AetherTheme.glassSurface   // .regularMaterial
AetherTheme.glassThick     // .thickMaterial
AetherTheme.glassThin      // .ultraThinMaterial
```

### Liquid Glass Best Practices

| Do | Don't |
|----|-------|
| Use `.glassEffect(.regular)` for floating UI | Use solid colors for primary surfaces |
| Layer glass at different thicknesses for depth | Overuse glass — it reduces contrast |
| Add `.hoverEffect(.lift)` for interactive elements | Apply glass to text-heavy content |
| Use ornaments for secondary controls | Put glass behind primary action buttons |

---

## SwiftUI Patterns

### ViewModifiers for Reusable Styles

```swift
// Define custom modifiers
struct PrimaryButtonStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.headline.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(Theme.primary)
            .clipShape(Capsule())
    }
}

// Extend View for convenience
extension View {
    func primaryButtonStyle() -> some View {
        modifier(PrimaryButtonStyle())
    }
}

// Usage
Button("Start") { }
    .primaryButtonStyle()
```

### Container Views for Layout Patterns

```swift
// Reusable card container
struct Card<Content: View>: View {
    @ViewBuilder let content: Content
    
    var body: some View {
        content
            .padding(Theme.Spacing.md)
            .background(AetherTheme.surface)
            .cornerRadius(Theme.Radius.md)
            .aetherDepth(.surface)
    }
}

// Usage
Card {
    VStack(alignment: .leading) {
        Text("Title")
        Text("Description")
            .foregroundStyle(Theme.textSecondary)
    }
}
```

### Environment Values for Theme

```swift
// Custom environment key
private struct ThemeKey: EnvironmentKey {
    static let defaultValue = AppTheme.standard
}

extension EnvironmentValues {
    var appTheme: AppTheme {
        get { self[ThemeKey.self] }
        set { self[ThemeKey.self] = newValue }
    }
}

// Usage in view
@Environment(\.appTheme) private var theme
```

### Preview Patterns with PreviewContainer

```swift
/// Lightweight container that injects required @Environment objects
@MainActor
struct PreviewContainer<Content: View>: View {
    let content: Content
    let timerVM: TimerViewModel
    let modelContext: ModelContext
    
    init(
        timerState: TimerState = .idle,
        @ViewBuilder content: () -> Content
    ) {
        self.timerVM = TimerViewModel()
        self.timerVM.timerState = timerState
        self.content = content()
        // Create in-memory model context for previews
        self.modelContext = try! ModelContext(
            ModelContainer(for: FocusSession.self, configurations: ModelConfiguration(isStoredInMemoryOnly: true))
        )
    }
    
    var body: some View {
        content
            .environment(timerVM)
            .modelContainer(modelContext.container)
    }
}

// Preview usage
#Preview("Running State") {
    PreviewContainer(timerState: .running) {
        TimerView()
    }
}

#Preview("Dark Mode") {
    PreviewContainer(timerState: .idle) {
        TimerView()
    }
    .preferredColorScheme(.dark)
}
```

---

## Accessibility

### Labels and Hints

```swift
// Always provide accessibility labels for icons
Image(systemName: "play.fill")
    .accessibilityLabel("Start timer")

// Add hints for interactive elements
Button(action: startSession) {
    Text("Focus")
}
.accessibilityHint("Double tap to begin a focus session")

// Hide decorative elements
Image(systemName: "sparkles")
    .accessibilityHidden(true)
```

### Identifiers for Testing

```swift
// Add identifiers for UI testing
Text(timeRemaining)
    .accessibilityIdentifier("timeDisplay")

Button(action: pause) {
    Image(systemName: "pause.fill")
}
.accessibilityIdentifier("pauseButton")
```

### Dynamic Type Support

```swift
// Use scalable font metrics
Text("Title")
    .font(.system(.title, design: .rounded))

// Or custom sizes relative to metrics
Text("Body")
    .font(.system(size: UIFont.preferredFont(forTextStyle: .body).pointSize))

// Ensure layouts adapt
VStack {
    Text("Title")
}
.padding(.horizontal, Theme.Spacing.md)
// Use GeometryReader or @ScaledMetric for size-dependent layouts
```

### VoiceOver Considerations

```swift
// Group related elements
VStack {
    Text("25:00")
    Text("remaining")
}
.accessibilityElement(children: .combine)
.accessibilityLabel("25 minutes remaining")

// Custom actions for complex UI
.accessibilityAction(named: "Add 5 minutes") {
    extendSession(by: 300)
}

// Update announcements for state changes
@AccessibilityAction
private func announceCompletion() {
    AccessibilityNotification.announce("Focus session complete")
}
```

### Accessibility Checklist

| Element | Required |
|---------|----------|
| Icon buttons | `.accessibilityLabel()` |
| Custom controls | `.accessibilityLabel()` + `.accessibilityHint()` |
| Test targets | `.accessibilityIdentifier()` |
| Decorative images | `.accessibilityHidden(true)` |
| Complex groups | `.accessibilityElement(children: .combine)` |
| Dynamic text | Use `UIFont` metrics or `.dynamicTypeSize()` |

---

## ADHD-Friendly UX Principles

Design for focus, clarity, and reduced cognitive load. Never use "ADHD" in user-facing copy.

### Reduce Decision Fatigue

```swift
// Do: Smart defaults, minimal choices
struct DurationSelector: View {
    let presets = [15, 25, 45, 60]  // Curated options
    
    var body: some View {
        HStack(spacing: Theme.Spacing.sm) {
            ForEach(presets, id: \.self) { minutes in
                DurationChip(minutes: minutes)
            }
        }
    }
}

// Don't: Open-ended inputs or overwhelming options
TextField("Enter duration", value: $customMinutes, format: .number)
```

### Clear Visual Hierarchy

```swift
// Do: One primary action, clear focal point
VStack(spacing: Theme.Spacing.lg) {
    // Hero element (the dial)
    TimerDial()
        .frame(maxWidth: .infinity)
    
    // Secondary actions in a row
    HStack {
        SecondaryButton("Adjust") { }
        PrimaryButton("Start") { }
    }
}

// Don't: Competing primary actions
HStack {
    Button("Start") { }      // Same weight as...
    Button("Settings") { }   // ...this
    Button("History") { }
}
```

### Immediate Feedback

```swift
// Do: Instant visual response
Button(action: { isPressed.toggle() }) {
    Image(systemName: isPressed ? "pause.fill" : "play.fill")
}
.buttonStyle(.borderedProminent)

// Do: Haptic feedback for actions
HapticsService.shared.playTap()

// Do: Visual state changes
Circle()
    .fill(isActive ? Theme.primary : Theme.surface)
    .animation(.easeInOut(duration: 0.2), value: isActive)
```

### Forgiving Interactions

```swift
// Do: Easy undo, no destructive confirmations
Button(action: { 
    withAnimation {
        item.delete()
    }
}) {
    Label("Remove", systemImage: "xmark")
}

// Do: Auto-save, resume where left off
@AppStorage("draftThought") private var draftThought: String = ""

// Do: Gesture forgiveness (larger touch targets)
Button(action: action) {
    Image(systemName: "plus")
        .frame(width: 44, height: 44)  // Minimum 44pt
}
```

### UX Principles Summary

| Principle | Implementation |
|-----------|----------------|
| Reduce decision fatigue | Curated presets, smart defaults, progressive disclosure |
| Clear visual hierarchy | One hero element, primary/secondary action distinction |
| Immediate feedback | Haptics, animations, visual state changes |
| Forgiving interactions | Undo support, auto-save, 44pt minimum touch targets |
| Never label as ADHD | Describe benefits: "captures thoughts in under 5 seconds" |

---

## Quick Reference

### Common Modifiers

```swift
// Depth/shadow
.aetherDepth(.surface)
.breathingShadow(color: Theme.primary)

// Border
.radiantBorder(color: Theme.primary, intensity: 0.3)

// Glass (iOS 26+)
.glassEffect(.regular)
.glassEffect(.regular.interactive())

// Accessibility
.accessibilityLabel("Description")
.accessibilityHint("Double tap to activate")
.accessibilityIdentifier("uniqueID")
.accessibilityHidden(true)
```

### Theme Values

```swift
// Colors
AetherTheme.canvas           // Background
AetherTheme.surface          // Cards
AetherTheme.actionPrimary    // Buttons
AetherTheme.textPrimary      // Body text

// Spacing
AetherTheme.Spacing.xs       // 8
AetherTheme.Spacing.md       // 16
AetherTheme.Spacing.lg       // 24

// Radius
AetherTheme.Radius.sm        // 8
AetherTheme.Radius.md        // 12
AetherTheme.Radius.capsule   // 999
```

### Preview Template

```swift
#Preview("State Name") {
    PreviewContainer(timerState: .idle) {
        YourView()
    }
}

#Preview("Dark Mode") {
    PreviewContainer(timerState: .idle) {
        YourView()
    }
    .preferredColorScheme(.dark)
}
```

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios26-api-reference` — iOS 26 API signatures
- `ios-build` — Build validation workflow

<!-- END SKILL: ios-design -->

---

<!-- BEGIN SKILL: ios-simulate -->

# ios-simulate

# iOS Simulate

iOS Simulator management, screenshot automation, and device control via `xcrun simctl`. Use for testing, screenshots, and simulator-based workflows.

---

## Quick Reference

| Task | Command |
|------|---------|
| List devices | `xcrun simctl list devices available` |
| Boot simulator | `xcrun simctl boot "iPhone 17 Pro Max"` |
| Screenshot | `xcrun simctl io booted screenshot output.png` |
| Record video | `xcrun simctl io booted recordVideo output.mp4` |
| Install app | `xcrun simctl install booted MyApp.app` |
| Uninstall app | `xcrun simctl uninstall booted com.example.app` |
| Set dark mode | `xcrun simctl ui booted appearance dark` |
| Open URL | `xcrun simctl openurl booted https://example.com` |

---

## Simulator Management

### List Available Simulators

```bash
# All devices (including unavailable)
xcrun simctl list devices

# Only available devices
xcrun simctl list devices available

# JSON output (for scripting)
xcrun simctl list devices available -j

# Filter by device type
xcrun simctl list devices | grep "iPhone"
```

### Boot and Shutdown

```bash
# Boot a specific device by name
xcrun simctl boot "iPhone 17 Pro Max"

# Boot by UDID
xcrun simctl boot 4C6DD567-0C7E-476D-8946-8CA9A21A9452

# Wait for boot to complete
xcrun simctl bootstatus "iPhone 17 Pro Max" -b

# Shutdown
xcrun simctl shutdown "iPhone 17 Pro Max"

# Shutdown all simulators
xcrun simctl shutdown all

# Check if running
xcrun simctl list devices | grep "iPhone 17 Pro Max" | grep "Booted"
```

### Create Custom Simulators

```bash
# List available device types
xcrun simctl list devicetypes

# List available runtimes
xcrun simctl list runtimes

# Create custom simulator
xcrun simctl create "My iPhone 15" "iPhone 15" "iOS17.4"

# Delete simulator
xcrun simctl delete "My iPhone 15"

# Erase all content and settings
xcrun simctl erase "iPhone 17 Pro Max"
```

### Open Simulator App

```bash
# Open Simulator.app
open -a Simulator

# Open with specific device
xcrun simctl boot "iPhone 17 Pro Max" && open -a Simulator
```

---

## App Management

### Install and Uninstall

```bash
# Install app from .app bundle
xcrun simctl install booted /path/to/MyApp.app

# Install by device name
xcrun simctl install "iPhone 17 Pro Max" /path/to/MyApp.app

# Uninstall by bundle ID
xcrun simctl uninstall booted com.example.myapp

# Get app container path
xcrun simctl get_app_container booted com.example.myapp data
```

### Launch and Terminate

```bash
# Launch app
xcrun simctl launch booted com.example.myapp

# Launch with arguments
xcrun simctl launch booted com.example.myapp --uitesting

# Terminate app
xcrun simctl terminate booted com.example.myapp

# Get app PID
xcrun simctl spawn booted pgrep -x MyApp
```

### Reset App State

```bash
# Uninstall and reinstall (cleanest reset)
xcrun simctl uninstall booted com.example.myapp
xcrun simctl install booted /path/to/MyApp.app

# Erase entire simulator (nuclear option)
xcrun simctl erase booted
```

---

## Screenshot Automation

### Basic Screenshot Capture

```bash
# Capture screenshot of booted device
xcrun simctl io booted screenshot screenshot.png

# Capture specific device
xcrun simctl io "iPhone 17 Pro Max" screenshot screenshot.png

# Capture with timestamp
xcrun simctl io booted screenshot "screenshot-$(date +%Y%m%d-%H%M%S).png"
```

### Dual-Path Architecture

The Aether project uses two screenshot paths with different purposes:

#### ASC Path (Committed, High Quality)

For App Store Connect screenshots — strict requirements, committed to git.

```bash
# ASC requirements:
# - iPhone 17 Pro Max (1290×2796)
# - Status bar: 9:41 AM, 100% battery
# - Clean app state
# - PNG format, no alpha

# Manual capture script
./scripts/asc-screenshots/manual-capture.sh

# Validate ASC compliance
./scripts/asc-screenshots/validate.sh

# Output location
apps/focus/fastlane/screenshots/en-US/
```

#### Verification Path (Debug/PR, Git-Ignored)

For debugging, design reviews, PR validation — quick capture, not committed.

```bash
# Quick capture script
./scripts/verify-screenshots/capture.sh -n "dark-mode-timer"

# With options
./scripts/verify-screenshots/capture.sh \
  -n "settings-screen" \
  -d "iPad Pro (12.9-inch)" \
  -a dark

# Output location (git-ignored)
apps/focus/.build/verification-screenshots/
```

### Status Bar Override

**Note:** Status bar override works on iOS 25 and below. iOS 26+ does not support this feature.

```bash
# Set 9:41 AM, full bars, 100% battery (iOS 25 and below)
xcrun simctl status_bar booted override \
  --time "09:41" \
  --dataNetwork wifi \
  --wifiMode active \
  --wifiBars 3 \
  --cellularMode active \
  --operatorName '' \
  --cellularBars 4 \
  --batteryState charged \
  --batteryLevel 100

# Clear status bar override
xcrun simctl status_bar booted clear
```

### Screenshot with Device Frame

```bash
# Capture and add device frame using frameit (Fastlane)
bundle exec fastlane frameit

# Manual framing with ImageMagick
convert screenshot.png device-frame.png -composite final.png
```

### Dark Mode Screenshots

```bash
# Set dark mode
xcrun simctl ui booted appearance dark

# Set light mode
xcrun simctl ui booted appearance light

# Capture sequence
xcrun simctl ui booted appearance light
xcrun simctl io booted screenshot light-mode.png
xcrun simctl ui booted appearance dark
xcrun simctl io booted screenshot dark-mode.png
```

---

## Video Recording

### Record Simulator Video

```bash
# Start recording
xcrun simctl io booted recordVideo demo.mp4

# Record with H264 codec
xcrun simctl io booted recordVideo --codec h264 demo.mp4

# Force overwrite existing file
xcrun simctl io booted recordVideo --force demo.mp4

# Stop recording (Ctrl+C or kill process)
```

### Background Recording Script

```bash
# Record in background
xcrun simctl io booted recordVideo --codec h264 --force output.mp4 &
RECORD_PID=$!

# Run your tests or interactions
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator'

# Stop recording
kill "$RECORD_PID"
```

### Marketing Demo Recording

```bash
# Full demo sequence
./scripts/record-demo-sim.sh

# Single hero shot
./scripts/record-demo-sim.sh testHero_03_TheStage

# Slower pace for demos
MARKETING_DEMO_SLOW=1 ./scripts/record-demo-sim.sh
```

---

## Device State Management

### Appearance (Light/Dark Mode)

```bash
# Set dark mode
xcrun simctl ui booted appearance dark

# Set light mode
xcrun simctl ui booted appearance light

# Check current appearance
xcrun simctl ui booted appearance
```

### Locale and Language

```bash
# Set locale
xcrun simctl spawn booted defaults write NSGlobalDomain AppleLocale "de_DE"

# Set language
xcrun simctl spawn booted defaults write NSGlobalDomain AppleLanguages "(de)"

# Restart app to apply
xcrun simctl terminate booted com.example.myapp
xcrun simctl launch booted com.example.myapp
```

### Time and Date

```bash
# Set specific time (iOS 25 and below via status_bar)
xcrun simctl status_bar booted override --time "09:41"

# Note: Full date/time override requires device restart or status_bar
```

### Dynamic Type (Text Size)

```bash
# Set content size category
xcrun simctl spawn booted defaults write com.apple.UIKit \
  UIContentSizeCategoryPreferenceKey -string UICTContentSizeCategoryAccessibilityExtraLarge

# Available sizes:
# - UICTContentSizeCategoryExtraSmall
# - UICTContentSizeCategorySmall
# - UICTContentSizeCategoryMedium
# - UICTContentSizeCategoryLarge (default)
# - UICTContentSizeCategoryExtraLarge
# - UICTContentSizeCategoryExtraExtraLarge
# - UICTContentSizeCategoryExtraExtraExtraLarge
# - UICTContentSizeCategoryAccessibilityMedium
# - UICTContentSizeCategoryAccessibilityLarge
# - UICTContentSizeCategoryAccessibilityExtraLarge
# - UICTContentSizeCategoryAccessibilityExtraExtraLarge
# - UICTContentSizeCategoryAccessibilityExtraExtraExtraLarge
```

---

## Permissions and Privacy

### Grant Permissions

```bash
# Grant all permissions for app
xcrun simctl privacy booted grant all com.example.myapp

# Grant specific permission types
xcrun simctl privacy booted grant camera com.example.myapp
xcrun simctl privacy booted grant microphone com.example.myapp
xcrun simctl privacy booted grant photos com.example.myapp
xcrun simctl privacy booted grant location com.example.myapp
xcrun simctl privacy booted grant notifications com.example.myapp
```

### Revoke Permissions

```bash
# Revoke all permissions
xcrun simctl privacy booted revoke all com.example.myapp

# Revoke specific permission
xcrun simctl privacy booted revoke camera com.example.myapp
```

### Reset Privacy

```bash
# Reset all privacy settings
xcrun simctl privacy booted reset all

# Reset specific permission type
xcrun simctl privacy booted reset camera
```

### List Permission Types

```bash
xcrun simctl privacy booted list
```

---

## Push Notifications

### Send Push Notification

```bash
# Send push with JSON payload
cat > notification.json << 'EOF'
{
  "aps": {
    "alert": {
      "title": "Hello",
      "body": "This is a test notification"
    },
    "badge": 1,
    "sound": "default"
  }
}
EOF

xcrun simctl push booted com.example.myapp notification.json
```

### Send Silent Push

```bash
cat > silent-push.json << 'EOF'
{
  "aps": {
    "content-available": 1
  },
  "custom-data": "value"
}
EOF

xcrun simctl push booted com.example.myapp silent-push.json
```

---

## Location Simulation

### Set Location

```bash
# Set specific coordinates (latitude, longitude)
xcrun simctl location booted set 37.7749,-122.4194

# Set location by place name (if supported)
xcrun simctl location booted set "San Francisco, CA"
```

### Simulate Movement

```bash
# Start freeway drive simulation
xcrun simctl location booted start freeway_drive

# Start city run simulation
xcrun simctl location booted start city_run

# Stop location simulation
xcrun simctl location booted stop
```

### Clear Location

```bash
xcrun simctl location booted clear
```

---

## System Events

### Memory Warning

```bash
# Simulate memory warning
xcrun simctl spawn booted notifyutil -p com.apple.system.lowmemory
```

### Open URL

```bash
# Open web URL
xcrun simctl openurl booted https://example.com

# Open custom URL scheme
xcrun simctl openurl booted myapp://screen/settings

# Open with query parameters
xcrun simctl openurl booted "myapp://item?id=123"
```

### Send Text Input

```bash
# Send text (requires app to be focused)
xcrun simctl spawn booted simctl type "Hello World"
```

### Hardware Buttons

```bash
# Simulate home button press
xcrun simctl spawn booted simctl press home

# Note: Other hardware buttons require UI automation or accessibility APIs
```

---

## File Operations

### Copy Files to Simulator

```bash
# Copy file to documents directory
xcrun simctl addmedia booted /path/to/photo.jpg

# Copy to specific app container
xcrun simctl install booted /path/to/MyApp.app
doc_path=$(xcrun simctl get_app_container booted com.example.myapp documents)
cp /path/to/file.txt "$doc_path/"
```

### Access App Data

```bash
# Get app container paths
xcrun simctl get_app_container booted com.example.myapp app
xcrun simctl get_app_container booted com.example.myapp data
xcrun simctl get_app_container booted com.example.myapp groups
xcrun simctl get_app_container booted com.example.myapp documents

# List app files
ls -la $(xcrun simctl get_app_container booted com.example.myapp documents)
```

---

## Fastlane Snapshot Integration

### Run Snapshot Tests

```bash
# Run all snapshot tests
bundle exec fastlane snapshot

# Run for specific devices
bundle exec fastlane snapshot --devices "iPhone 17 Pro Max"

# Run specific language
bundle exec fastlane snapshot --languages "en-US"
```

### Snapshot Configuration

```ruby
# fastlane/Snapfile
devices([
  "iPhone 17 Pro Max",
  "iPhone 15 Plus",
  "iPad Pro (12.9-inch) (6th generation)"
])

languages([
  "en-US"
])

output_directory("./fastlane/screenshots")
clear_previous_screenshots(true)
```

---

## Common Workflows

### Full Screenshot Sequence

```bash
#!/bin/bash
set -e

DEVICE="iPhone 17 Pro Max"
APP_BUNDLE="com.example.myapp"
OUTPUT_DIR="./screenshots"

# Setup
mkdir -p "$OUTPUT_DIR"
xcrun simctl boot "$DEVICE" 2>/dev/null || true
xcrun simctl bootstatus "$DEVICE" -b > /dev/null 2>&1

# Reset state
xcrun simctl uninstall booted "$APP_BUNDLE" 2>/dev/null || true
xcrun simctl install booted ./build/MyApp.app

# Light mode screenshots
xcrun simctl ui booted appearance light
xcrun simctl launch booted "$APP_BUNDLE"
sleep 2
xcrun simctl io booted screenshot "$OUTPUT_DIR/01-home-light.png"

# Dark mode screenshots
xcrun simctl ui booted appearance dark
xcrun simctl terminate booted "$APP_BUNDLE"
xcrun simctl launch booted "$APP_BUNDLE"
sleep 2
xcrun simctl io booted screenshot "$OUTPUT_DIR/02-home-dark.png"

echo "Screenshots saved to $OUTPUT_DIR"
```

### Automated UI Test with Screenshots

```bash
#!/bin/bash
set -e

# Boot simulator
xcrun simctl boot "iPhone 17 Pro Max" 2>/dev/null || true
xcrun simctl bootstatus "iPhone 17 Pro Max" -b > /dev/null 2>&1

# Run UI tests with screenshot capture
xcodebuild test \
  -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppUITests/ScreenshotTests
```

---

## Troubleshooting

### Simulator Won't Boot

```bash
# Shutdown all simulators first
xcrun simctl shutdown all

# Boot specific device
xcrun simctl boot "iPhone 17 Pro Max"

# If still failing, erase and recreate
xcrun simctl erase "iPhone 17 Pro Max"
xcrun simctl boot "iPhone 17 Pro Max"
```

### Screenshot Fails

```bash
# Ensure simulator is booted
xcrun simctl list devices | grep "Booted"

# Try explicit device instead of 'booted'
xcrun simctl io "iPhone 17 Pro Max" screenshot test.png

# Check permissions
ls -la ~/Library/Developer/CoreSimulator/Devices/
```

### App Won't Install

```bash
# Check app bundle exists and is valid
ls -la /path/to/MyApp.app

# Check bundle ID matches
plutil -p /path/to/MyApp.app/Info.plist | grep CFBundleIdentifier

# Try uninstall first
xcrun simctl uninstall booted com.example.myapp
xcrun simctl install booted /path/to/MyApp.app
```

### Performance Issues

```bash
# Check simulator processes
ps aux | grep -i simulator

# Kill stuck simulators
killall -9 Simulator
killall -9 com.apple.CoreSimulator.SimulatorTrampoline

# Reset all simulators (nuclear)
xcrun simctl erase all
```

---

## Best Practices

1. **Use device names, not UDIDs** in scripts — UDIDs vary between machines
2. **Always use `bootstatus -b`** to wait for boot completion before operations
3. **Reset app state** between screenshot captures for consistency
4. **Use `booted`** alias for the currently booted device
5. **Commit ASC screenshots** to git; keep verification screenshots git-ignored
6. **Set status bar** to 9:41 AM for professional screenshots (iOS 25 and below)
7. **Use dual-path architecture** — separate committed ASC assets from debug captures
8. **Automate with scripts** — manual simulator operations are error-prone

---

## See Also

- `ios-build` — Build validation and XcodeGen
- `ios-standards` — Swift 6 concurrency patterns
- `ios-test` — Testing patterns and UI automation

<!-- END SKILL: ios-simulate -->

---

<!-- BEGIN SKILL: ios-standards -->

# ios-standards

# iOS Standards

Swift 6.0+ patterns, strict concurrency, and modern SwiftUI architecture. **Apply these patterns to all iOS code.**

## ☠️ ULTIMATE RULE

**NEVER KEEP MULTIPLE VERSIONS OF A FEATURE IN CODE** (`v2Enabled`, `legacyMode`, `newFlow`, etc.). When replacing a feature, replace it. Delete the old path. Systematic modular variants (enum injection, DI, strategy protocols) are allowed; inline boolean forks are forbidden.

---

## Swift 6 Concurrency

### @MainActor Isolation

All UI-related code must be `@MainActor` isolated.

```swift
// WRONG — not MainActor isolated
class TimerViewModel: ObservableObject {
    @Published var timeRemaining: TimeInterval = 0
}

// RIGHT — @MainActor isolated
@MainActor
@Observable
class TimerViewModel {
    var timeRemaining: TimeInterval = 0
}
```

#### Common Patterns

```swift
// ViewModels — always @MainActor
@MainActor
@Observable
class MyViewModel {
    var state: AppState = .idle
    
    func updateUI() {
        // Safe to touch UI state
    }
}

// Services that touch UI — @MainActor
@MainActor
final class NotificationService {
    func showNotification() {
        // UIKit calls require MainActor
    }
}

// Services that don't touch UI — no annotation needed
final class AnalyticsService {
    func track(event: String) async {
        // Background-safe work
    }
}
```

### @Observable (Not ObservableObject)

Use the new Observation framework, not Combine.

```swift
// WRONG — old pattern
import Combine

class OldViewModel: ObservableObject {
    @Published var count = 0
}

// RIGHT — Swift 6 pattern
import Observation

@MainActor
@Observable
class NewViewModel {
    var count = 0  // No @Published needed
}
```

#### Using in Views

```swift
import SwiftUI

struct MyView: View {
    @Environment(MyViewModel.self) private var viewModel
    // @StateObject no longer needed for @Observable
    
    var body: some View {
        Text("\(viewModel.count)")
    }
}
```

### Sendable Conformance

Types crossing isolation boundaries must be Sendable.

```swift
// Value types are automatically Sendable
struct Settings: Sendable {
    var duration: TimeInterval
    var soundEnabled: Bool
}

// Classes must explicitly conform
final class UserPreferences: @unchecked Sendable {
    // @unchecked because we manually ensure thread safety
    private let lock = NSLock()
    private var _value: Int = 0
}

// Enums are automatically Sendable
enum TimerState: Sendable {
    case idle
    case running(startTime: Date)
    case paused(elapsed: TimeInterval)
}
```

### @preconcurrency Import

Use for Apple frameworks that haven't added Sendable yet.

```swift
// WRONG — compiler warnings about non-Sendable types
import EventKit

// RIGHT — suppress warnings at framework boundary
@preconcurrency import EventKit

@MainActor
final class RemindersService {
    private let store = EKEventStore()  // Non-Sendable, but safe here
}
```

Common frameworks needing @preconcurrency (complete list as of iOS 26):
- `EventKit` (EKEventStore, EKReminder)
- `HealthKit` (HKHealthStore, HKSample)
- `Speech` (SFSpeechRecognizer, SFSpeechRecognitionResult)
- `AVFoundation` (AVAudioEngine, AVCaptureSession)
- `VideoToolbox` (VTCompressionSession)
- `SwiftData` (@Model types are NOT Sendable)
- `ActivityKit` (Live Activity types)
- `Vision` (VNRequest types)
- `CoreLocation` (CLLocationManager)
- `CoreData` (NSManagedObject NOT Sendable, NSManagedObjectContext IS Sendable — Beta 5)
- `UIKit` (some types)

### Actor Isolation

Use actors for shared mutable state:

```swift
actor TimerStateStore {
    private var sessions: [UUID: TimerSession] = [:]
    
    func addSession(_ session: TimerSession) {
        sessions[session.id] = session
    }
    
    func getSession(id: UUID) -> TimerSession? {
        sessions[id]
    }
}

// Usage
let store = TimerStateStore()
await store.addSession(session)
let session = await store.getSession(id: uuid)
```

### nonisolated(unsafe)

Last resort for non-Sendable state in @MainActor classes:

```swift
@MainActor
@Observable
class ViewModel {
    // Safe because ViewModel is @MainActor
    private nonisolated(unsafe) var cancellables: Set<AnyCancellable> = []
}
```

### @MainActor Class-Level vs Method-Level

**Critical for AVAudioEngine, SpeechTranscriber, and other hardware-interfacing classes:**

```swift
// WRONG — class-level @MainActor causes crashes with AVAudioEngine/Speech
@MainActor
final class SpeechService {
    private let audioEngine = AVAudioEngine()  // Crashes on initialization
    private let transcriber = SpeechTranscriber(locale: Locale(identifier: "en-US"))
}

// RIGHT — method-level @MainActor for hardware-interfacing services
final class SpeechService {
    private let audioEngine = AVAudioEngine()
    private let transcriber = SpeechTranscriber(locale: Locale(identifier: "en-US"))
    
    @MainActor
    func startRecording() async {
        // UI-related work on MainActor
    }
    
    func processAudio() async {
        // Audio processing off MainActor
    }
}
```

**When to use class-level vs method-level:**

| Use Class-Level | Use Method-Level |
|-----------------|------------------|
| Pure SwiftUI ViewModels | Services with AVAudioEngine |
| UI-only services | Speech framework services |
| No hardware/framework initialization | Services with heavy I/O |

### nonisolated deinit (MANDATORY for @MainActor classes)

All `@MainActor` classes (explicit or via `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`) that have a `deinit` MUST use `nonisolated deinit`. This is an Apple-confirmed known issue — accessing MainActor state from deinit causes crashes.

```swift
// WRONG — crashes on deallocation
@MainActor
class CameraService {
    deinit {
        captureSession.stopRunning()  // CRASH
    }
}

// CORRECT
@MainActor
class CameraService {
    nonisolated deinit {
        // Do NOT access @MainActor properties
        // Only non-isolated cleanup (VTCompressionSessionInvalidate, etc.)
    }
    
    func cleanup() {
        // Call this explicitly before deallocation for MainActor cleanup
        captureSession.stopRunning()
    }
}
```

### FoundationModels Availability Check (MANDATORY)

Never hardcode `isAvailable = true`. Always check at runtime:

```swift
// WRONG — crashes on non-AI devices (iPhone 15 and below)
var isAvailable: Bool { true }

// CORRECT
import FoundationModels
var isAvailable: Bool { SystemLanguageModel.default.isAvailable }
```

There is NO static `isAvailable` on `LanguageModelSession`. Check via `SystemLanguageModel.default`.

### Nested @MainActor Classes and Deallocation

**Critical:** Nested `@MainActor` classes can corrupt task-local storage during deallocation:

```swift
// WRONG — nested @MainActor classes cause deallocation crashes
@MainActor
final class OuterViewModel {
    private let inner = InnerService()  // Also @MainActor
    
    deinit {
        // SIGABRT: task-local storage corruption
    }
}

@MainActor
final class InnerService { }

// RIGHT — avoid nesting @MainActor classes as stored properties
@MainActor
final class OuterViewModel {
    private let inner: InnerServiceProtocol
    
    init(inner: InnerServiceProtocol) {
        self.inner = inner
    }
}

// Use protocol to break the nesting
protocol InnerServiceProtocol: Sendable { }

final class InnerService: InnerServiceProtocol {
    // Not @MainActor — breaks the nesting chain
}
```

**Testing implication:** Tests for `@MainActor` classes should be `async` to provide proper task context:

```swift
// WRONG — synchronous test causes deallocation crash
func test_viewModel() {
    let vm = MyViewModel()  // Crash on dealloc
}

// RIGHT — async test provides task context
func test_viewModel() async {
    let vm = MyViewModel()
    // Test code
}
```

### SwiftData @Model Objects and Async Boundaries

**Critical:** `@Model` objects must not cross async boundaries directly:

```swift
// WRONG — @Model object crosses async boundary
func processSession(_ session: FocusSession) async {
    // session is @Model — crossing async boundary causes data race
    await backgroundProcessor.process(session)
}

// RIGHT — extract scalar values before crossing
func processSession(_ session: FocusSession) async {
    let sessionID = session.id
    let duration = session.duration
    
    // Pass scalars, not the @Model object
    await backgroundProcessor.process(id: sessionID, duration: duration)
}
```

### NotificationCenter with @MainActor

Even with `queue: .main`, NotificationCenter callbacks need explicit MainActor:

```swift
// WRONG — NotificationCenter closure not on MainActor
@MainActor
final class ViewModel {
    init() {
        NotificationCenter.default.addObserver(
            forName: .sessionCompleted,
            object: nil,
            queue: .main  // Still not sufficient!
        ) { [weak self] _ in
            self?.updateUI()  // Not on MainActor!
        }
    }
}

// RIGHT — wrap in Task { @MainActor in }
@MainActor
final class ViewModel {
    init() {
        NotificationCenter.default.addObserver(
            forName: .sessionCompleted,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor [weak self] in
                self?.updateUI()
            }
        }
    }
}
```

---

## Common Concurrency Patterns

### Background Task with MainActor Result

```swift
func loadData() async {
    // Background work
    let data = await fetchFromNetwork()
    
    // Update UI on MainActor
    await MainActor.run {
        self.data = data
    }
}
```

### Task with Correct Isolation

```swift
// WRONG — Task inherits isolation, can cause crashes
func start() {
    Task {
        await updateUI()  // Might not be on MainActor
    }
}

// RIGHT — explicit MainActor
func start() {
    Task { @MainActor in
        await updateUI()
    }
}

// RIGHT — use detached if needed (rare)
func start() {
    Task.detached { @MainActor in
        await updateUI()
    }
}
```

### Task { @MainActor [weak self] } Pattern

**Critical pattern for preventing crashes in @MainActor classes:**

```swift
// WRONG — Task captures self without proper isolation
@MainActor
final class TimerService {
    func startTimer() {
        Task { [weak self] in  // Missing @MainActor!
            while let self = self {
                await self.tick()  // Crash: deallocation race
            }
        }
    }
}

// RIGHT — explicit @MainActor with [weak self]
@MainActor
final class TimerService {
    func startTimer() {
        Task { @MainActor [weak self] in
            while let self = self {
                await self.tick()  // Safe: proper isolation
            }
        }
    }
}
```

**Why this matters:** Without `@MainActor` on the Task closure, the Task runs non-isolated. When the `@MainActor` class is deallocated, the non-isolated Task accessing it causes memory corruption.

### Async Stream with Isolation

```swift
@MainActor
final class SpeechService {
    private var transcriptionTask: Task<Void, Never>?
    
    func startRecording() {
        transcriptionTask = Task { @MainActor [weak self] in
            guard let transcriber = self?.transcriber else { return }
            for await result in transcriber.results {
                // Already on MainActor
                self?.handleResult(result)
            }
        }
    }
}
```

---

## SwiftData Integration

### Model Definition

```swift
import SwiftData

@Model
final class FocusSession {
    var startDate: Date
    var duration: TimeInterval
    var isCompleted: Bool
    
    // Relationship with cascade delete
    @Relationship(deleteRule: .cascade, inverse: \CapturedThought.session)
    var captures: [CapturedThought]?
    
    init(startDate: Date, duration: TimeInterval) {
        self.startDate = startDate
        self.duration = duration
        self.isCompleted = false
    }
}

@Model
final class CapturedThought {
    var text: String
    var timestamp: Date
    
    // Back reference
    var session: FocusSession?
    
    init(text: String, timestamp: Date = Date()) {
        self.text = text
        self.timestamp = timestamp
    }
}
```

### ModelContainer Setup

```swift
import SwiftData

@MainActor
final class DataController {
    let container: ModelContainer
    
    init() {
        let schema = Schema([FocusSession.self, CapturedThought.self])
        let config = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false
        )
        
        do {
            container = try ModelContainer(
                for: schema,
                configurations: config
            )
        } catch {
            fatalError("Could not create container: \(error)")
        }
    }
}
```

### Using in ViewModels

```swift
@MainActor
@Observable
class SessionsViewModel {
    private let modelContext: ModelContext
    private(set) var sessions: [FocusSession] = []
    
    init(modelContext: ModelContext) {
        self.modelContext = modelContext
    }
    
    func loadSessions() async {
        let descriptor = FetchDescriptor<FocusSession>(
            sortBy: [SortDescriptor(\.startDate, order: .reverse)]
        )
        
        do {
            sessions = try modelContext.fetch(descriptor)
        } catch {
            // Handle error
        }
    }
}
```

---

## Service Architecture

### Singleton Pattern

```swift
@MainActor
final class HapticsService {
    static let shared = HapticsService()
    
    private let feedbackGenerator = UIImpactFeedbackGenerator(style: .medium)
    
    private init() {
        feedbackGenerator.prepare()
    }
    
    func playTap() {
        feedbackGenerator.impactOccurred()
    }
}
```

### Protocol-Based Services (for Testing)

```swift
protocol NotificationServiceProtocol: Sendable {
    func scheduleNotification(at date: Date, title: String, body: String) async
}

@MainActor
final class NotificationService: NotificationServiceProtocol {
    static let shared = NotificationService()
    
    func scheduleNotification(at date: Date, title: String, body: String) async {
        // Implementation
    }
}
```

---

## Build Configuration

### Strict Concurrency

Enable in project settings or project.yml:

```yaml
# project.yml
settings:
  SWIFT_STRICT_CONCURRENCY: complete
  SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
```

### Critical Build Rule

> **Debug/simulator builds do NOT catch all strict concurrency errors.** Archive builds use `-O` optimization which enforces full isolation checking. Always run archive builds before committing.

```bash
# Debug build — misses some errors
xcodebuild -scheme MyApp -destination 'platform=iOS Simulator' build

# Archive build — catches all concurrency errors
xcodebuild -scheme MyApp -destination 'generic/platform=iOS' archive
```

---

## Quick Reference: Common Fixes

| Error | Fix |
|-------|-----|
| `Call to main actor-isolated instance method in a synchronous nonisolated context` | Add `@MainActor` to the class/method, or use `await MainActor.run` |
| `Non-sendable type returned by call crossing isolation boundary` | Use `@preconcurrency import`, or extract Sendable values before crossing |
| `Reference to captured var in concurrently-executing code` | Use `[weak self]` and check for nil, or capture values instead |
| `Task or actor-isolated value used in nonisolated context` | Use `@MainActor` on Task closure, or mark property `nonisolated(unsafe)` |
| `ObservableObject conformance warning` | Switch to `@Observable` macro |
| SIGABRT in dealloc with nested @MainActor classes | Avoid nesting @MainActor classes as stored properties; use protocols |
| @MainActor class deinit crash | Use `nonisolated deinit`, move cleanup to explicit `func cleanup()` |
| `MainActor.assumeIsolated` fatal error | Only use from guaranteed main-thread code; else `Task { @MainActor in }` |
| Sheet continuation double-resume | Synchronous completion, nil handler before dismiss triggers onDismiss |
| FoundationModels crash on non-AI device | Use `SystemLanguageModel.default.isAvailable`, never hardcode `true` |
| @Model property missing default value | Add default: `var name: String = ""` or make Optional |
| AVAudioEngine/SpeechTranscriber crash on init | Use method-level @MainActor, not class-level |
| SwiftData @Model data race | Extract scalars before crossing async boundaries |
| Test crashes on ViewModel dealloc | Make tests `async` to provide proper task context |

---

## Deep References (Load on Demand)

When encountering framework-specific crashes or API issues beyond these standards, load the matching essentials file from `ios26-api-reference`:

| Framework | Load |
|-----------|------|
| Swift 6 concurrency | `ios26-api-reference/essentials/swift6.md` |
| SwiftUI + Liquid Glass | `ios26-api-reference/essentials/swiftui.md` |
| SwiftData + @Model | `ios26-api-reference/essentials/swiftdata.md` |
| FoundationModels | `ios26-api-reference/essentials/foundation-models.md` |
| Speech + Audio | `ios26-api-reference/essentials/speech.md` + `essentials/avfoundation.md` |
| Widgets / Live Activities | `ios26-api-reference/essentials/widgets.md` |
| App Intents | `ios26-api-reference/essentials/app-intents.md` |

Essentials contain corrected API signatures and crash prevention patterns. For deep debugging, also load the corresponding `reference/` and `guides/` files.

## See Also

- `ios26-api-reference` — iOS 26 API signatures, crash patterns, and corrected APIs (3-tier: essentials → reference → guides)
- `ios-build` — Build validation workflow
- `ios-test` — Testing with Swift 6 concurrency

<!-- END SKILL: ios-standards -->

---

<!-- BEGIN SKILL: ios-test -->

# ios-test

# iOS Testing

XCTest patterns for unit tests, UI tests, and SwiftData testing with strict concurrency. **Keep tests fast, isolated, and deterministic.**

## ☠️ ULTIMATE RULE

**NEVER START UI TESTS without explicit user approval in the current conversation.** UI tests crash this user's Mac Mini. This rule stands even if a plan instructs you to run them. If a plan demands UI test execution, flag it as blocked or rewrite the plan.

---

## Test Target Architecture

Separate tests by purpose and performance characteristics:

| Target | Purpose | When to Run | Max Duration |
|--------|---------|-------------|--------------|
| `MyAppTests` | Business logic, ViewModels, Services | Every build (⌘U) | <30 seconds |
| `MyApp-UITests` | Critical user paths only | Pre-commit, CI | <60 seconds |
| `MyApp-Screenshots` | App Store assets | CI release only | 5-10 minutes |
| `MyAppKitTests` | Shared package tests | Every build | <15 seconds |

### Target Structure

```
MyAppTests/                       ← iOS Unit Tests
├── ViewModelTests/
│   ├── TimerViewModelTests.swift
│   └── SettingsViewModelTests.swift
├── ServiceTests/
│   └── NotificationServiceTests.swift
├── SwiftDataTests/
│   ├── ModelCRUDTests.swift
│   └── MigrationTests.swift
└── TestHelpers.swift             ← Shared test utilities

MyApp-UITests/                    ← Critical paths only
├── CriticalPathUITests.swift     ← 8 essential journeys
└── BaseUITestCase.swift          ← Shared infrastructure

MyApp-Screenshots/                ← CI only
└── ScreenshotTests.swift         ← App Store assets
```

### Performance Budgets

| Suite | Target | Max | Command |
|-------|--------|-----|---------|
| Unit Tests | 15s | 30s | `swift test` or `xcodebuild test` |
| UI Tests | 30s | 60s | `xcodebuild test -scheme MyApp-UITests` |
| Screenshot Tests | — | CI only | `bundle exec fastlane screenshots` |
| **Total CI** | **60s** | **120s** | Full suite |

---

## SwiftData Testing

### In-Memory ModelContainer

**WRONG:** Using the app container (slow, persists between tests, causes isolation issues)

```swift
// WRONG — uses real database
let container = try ModelContainer(for: MyModel.self)
```

**RIGHT:** In-memory container for fast, isolated tests

```swift
// TestHelpers.swift
import SwiftData

func makeTestContainer(for models: any PersistentModel.Type...) throws -> ModelContainer {
    let schema = Schema(models)
    let config = ModelConfiguration(schema: schema, isStoredInMemoryOnly: true)
    return try ModelContainer(for: schema, configurations: config)
}

// Usage in tests
@MainActor
func test_fetchSessions_returnsSorted() throws {
    let container = try makeTestContainer(for: FocusSession.self, CapturedThought.self)
    let context = ModelContext(container)
    // ... test code
}
```

### @MainActor Test Isolation

SwiftData contexts must be accessed from the main actor:

```swift
// WRONG — not MainActor isolated
func test_createSession_savesToDatabase() throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let context = ModelContext(container)  // ❌ Main actor-isolated init
}

// RIGHT — @MainActor isolated
@MainActor
func test_createSession_savesToDatabase() throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let context = ModelContext(container)  // ✓ Safe on MainActor
}
```

### Test Data Seeding

```swift
@MainActor
func seedTestSessions(in container: ModelContainer, count: Int = 5) throws {
    let context = ModelContext(container)
    
    for i in 0..<count {
        let session = FocusSession(
            startDate: Date().addingTimeInterval(-Double(i * 86400)),
            duration: 1500
        )
        context.insert(session)
    }
    
    try context.save()
}
```

### Cascade Delete Testing

```swift
@MainActor
func test_deleteSession_cascadesToCaptures() throws {
    // Given: Session with captures
    let container = try makeTestContainer(for: FocusSession.self, CapturedThought.self)
    let context = ModelContext(container)
    
    let session = FocusSession(startDate: Date(), duration: 1500)
    let capture = CapturedThought(text: "Test thought", timestamp: Date())
    capture.session = session
    
    context.insert(session)
    context.insert(capture)
    try context.save()
    
    // When: Delete session
    context.delete(session)
    try context.save()
    
    // Then: Captures are also deleted
    let captures = try context.fetch(FetchDescriptor<CapturedThought>())
    XCTAssertEqual(captures.count, 0)
}
```

### Migration Testing

Every `.custom` migration stage needs a test. `.lightweight` stages need data preservation tests.

```swift
@MainActor
func test_migrationV1toV2_preservesExistingData() throws {
    // 1. Write data using V1 schema
    let v1Config = ModelConfiguration(isStoredInMemoryOnly: true)
    let v1Container = try ModelContainer(
        for: SchemaV1.FocusSession.self,
        configurations: v1Config
    )
    let v1Context = ModelContext(v1Container)
    let session = SchemaV1.FocusSession(startDate: Date(), duration: 1500)
    v1Context.insert(session)
    try v1Context.save()
    
    // 2. Open with V2 schema + migration plan
    let v2Container = try ModelContainer(
        for: SchemaV2.FocusSession.self,
        migrationPlan: AppMigrationPlan.self,
        configurations: v1Config
    )
    let v2Context = ModelContext(v2Container)
    
    // 3. Verify old data is intact
    let sessions = try v2Context.fetch(FetchDescriptor<SchemaV2.FocusSession>())
    XCTAssertEqual(sessions.count, 1)
    XCTAssertEqual(sessions.first?.duration, 1500)
    
    // 4. Verify new field defaults correctly
    XCTAssertNil(sessions.first?.newOptionalField)
}
```

---

## XCTest Patterns

### Test Naming Convention

```swift
func test_<subject>_<condition>_<expectedResult>()

// Examples:
func test_categorize_buyKeyword_returnsTask()
func test_timerState_startFromIdle_transitionsToRunning()
func test_swiftData_deleteSession_cascadesCaptures()
func test_remindersService_requestAccess_promptsForPermission()
```

### Async/Await Test Patterns

```swift
// Async test — direct await
@MainActor
func test_refresh_updatesStats() async throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let viewModel = InsightsViewModel(container: container)
    
    await viewModel.refresh()
    
    XCTAssertGreaterThan(viewModel.totalFocusTime, 0)
}

// Async throws pattern
func test_fetchData_returnsResults() async throws {
    let service = DataService()
    
    let data = try await service.fetchData()
    
    XCTAssertFalse(data.isEmpty)
}
```

### XCTestExpectation for Callbacks

```swift
func test_speechTranscription_returnsText() {
    let expectation = expectation(description: "Transcription completed")
    let service = SpeechService()
    
    service.onTranscription = { text in
        XCTAssertEqual(text, "buy oat milk")
        expectation.fulfill()
    }
    
    service.startRecording()
    
    wait(for: [expectation], timeout: 5)
}

// Multiple expectations
func test_parallelDownloads_complete() {
    let exp1 = expectation(description: "Download 1")
    let exp2 = expectation(description: "Download 2")
    
    download(url1) { exp1.fulfill() }
    download(url2) { exp2.fulfill() }
    
    wait(for: [exp1, exp2], timeout: 10)
}
```

### setUpWithError / tearDownWithError

```swift
class TimerViewModelTests: XCTestCase {
    var container: ModelContainer!
    var viewModel: TimerViewModel!

    @MainActor
    override func setUpWithError() throws {
        try super.setUpWithError()
        container = try makeTestContainer(for: FocusSession.self)
        viewModel = TimerViewModel(container: container)
    }

    override func tearDownWithError() throws {
        viewModel = nil
        container = nil
        try super.tearDownWithError()
    }
}

### Testing @MainActor Classes

**Critical — applies to the entire test class:** When your test class is `@MainActor` (or tests a `@MainActor` subject), **every** test method must be `async` — even ones with no async work. Synchronous methods crash at deallocation with `POINTER_BEING_FREED_WAS_NOT_ALLOCATED` deep in `swift_task_deinitOnExecutorImpl`.

**Root cause:** `@MainActor` class dealloc uses `swift_task_deinitOnExecutorImpl`, which creates a `TaskLocal.StopLookupScope`. In a synchronous test there is no current Task, so the scope's heap is uninitialized — destroying it crashes.

```swift
// WRONG — crashes on dealloc even though the test body is fine
@MainActor
final class MyViewModelTests: XCTestCase {
    func test_initialState() {           // ❌ sync — crashes at deinit
        let vm = MyViewModel()
        XCTAssertFalse(vm.isActive)
    }

    func test_activate() throws {        // ❌ throws but not async — also crashes
        let vm = MyViewModel()
        try vm.activate()
        XCTAssertTrue(vm.isActive)
    }
}

// RIGHT — every method is async
@MainActor
final class MyViewModelTests: XCTestCase {
    func test_initialState() async {     // ✅ async — proper task context
        let vm = MyViewModel()
        XCTAssertFalse(vm.isActive)
    }

    func test_activate() async throws {  // ✅ async throws
        let vm = MyViewModel()
        try vm.activate()
        XCTAssertTrue(vm.isActive)
    }
}
```

This rule applies to `setUp`/`tearDown` too — prefer `setUp() async throws` / `tearDown() async throws` in `@MainActor` test classes.
```

### Mock Services for Testing

```swift
protocol NotificationServiceProtocol: Sendable {
    func scheduleNotification(at date: Date, title: String) async
}

class MockNotificationService: NotificationServiceProtocol {
    var scheduledNotifications: [(date: Date, title: String)] = []
    var shouldSucceed = true
    
    func scheduleNotification(at date: Date, title: String) async {
        if shouldSucceed {
            scheduledNotifications.append((date, title))
        }
    }
}

// Usage in test
@MainActor
func test_startSession_schedulesNotification() async {
    let mockService = MockNotificationService()
    let viewModel = TimerViewModel(notificationService: mockService)

    await viewModel.startSession()

    XCTAssertEqual(mockService.scheduledNotifications.count, 1)
}

### Protocol-Based Mocking for Framework Classes

**Critical:** Some framework classes cause heap corruption when subclassed for testing:

```swift
// WRONG — subclassing EKEventStore causes heap corruption in iOS 26 simulator
class MockEventStore: EKEventStore {
    override func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        completion(true, nil)
    }
}

// RIGHT — use protocol conformance
protocol EventStoreProtocol {
    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler)
    func calendars(for entityType: EKEntityType) -> [EKCalendar]
    func save(_ reminder: EKReminder, commit: Bool) throws
}

// Real implementation wraps the framework class
final class EventStoreWrapper: EventStoreProtocol {
    private let store = EKEventStore()

    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        store.requestAccess(to: entityType, completion: completion)
    }

    func calendars(for entityType: EKEntityType) -> [EKCalendar] {
        store.calendars(for: entityType)
    }

    func save(_ reminder: EKReminder, commit: Bool) throws {
        try store.save(reminder, commit: commit)
    }
}

// Mock implementation for tests
final class MockEventStore: EventStoreProtocol {
    var shouldSucceed = true
    var calendarsResult: [EKCalendar] = []
    var savedReminders: [EKReminder] = []

    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        completion(shouldSucceed, nil)
    }

    func calendars(for entityType: EKEntityType) -> [EKCalendar] {
        return calendarsResult
    }

    func save(_ reminder: EKReminder, commit: Bool) throws {
        if shouldSucceed {
            savedReminders.append(reminder)
        } else {
            throw NSError(domain: "MockError", code: 1)
        }
    }
}
```

**Framework classes requiring protocol mocking:**
- `EKEventStore` (EventKit) — heap corruption in iOS 26 simulator
- `AVAudioEngine` — complex initialization state
- `HKHealthStore` (HealthKit) — privacy-sensitive

---
```

---

## UI Testing

### XCUIApplication Patterns

```swift
class CriticalPathUITests: XCTestCase {
    let app = XCUIApplication()
    
    override func setUpWithError() throws {
        continueAfterFailure = false
    }
    
    func test_startFocusSession() {
        app.launchArguments = ["-UITestMode", "-FastTimer"]
        app.launch()
        
        // Tap start
        app.buttons["startButton"].tap()
        
        // Verify running state
        XCTAssertTrue(app.staticTexts["timerRunning"].waitForExistence(timeout: 2))
    }
}
```

### Launch Arguments for Test Mode

| Argument | Purpose |
|----------|---------|
| `-UITestMode` | Disables animations, analytics, alerts |
| `-SeedScenario=<name>` | Pre-populates test data |
| `-FastTimer` | Accelerated timer for tests |
| `-DisableOnboarding` | Skips onboarding flow |
| `-ResetState` | Clears UserDefaults on launch |

```swift
// In test
app.launchArguments = [
    "-UITestMode",
    "-SeedScenario=History30Days",
    "-FastTimer"
]
app.launch()

// In app (AppDelegate/Init)
if CommandLine.arguments.contains("-UITestMode") {
    // Disable animations
    UIView.setAnimationsEnabled(false)
}
```

### Data Seeding via RuntimeSeeder

**WRONG:** Creating data through UI (slow, flaky)

```swift
// Slow: 30-50s per test
func test_capturesList() {
    app.launch()
    startTimer()           // ~5s
    addCapture("Thought 1") // ~10s
    addCapture("Thought 2") // ~10s
    // ... actual test
}
```

**RIGHT:** Pre-seed via launch arguments (fast, deterministic)

```swift
// Fast: ~5s total
func test_capturesList() {
    app.launchArguments = ["-UITestMode", "-SeedScenario=MultipleCaptures"]
    app.launch()
    // Test immediately with pre-populated data
}
```

### Available Seeding Scenarios

| Scenario | Sessions | Captures | Use Case |
|----------|----------|----------|----------|
| `FreshInstall` | 0 | 0 | First launch, onboarding |
| `SingleSession` | 1 | 2 | Basic timer flow |
| `ActiveSession` | 1 (running) | 1 | Pause/resume testing |
| `History7Days` | 7 | 15 | Weekly review screens |
| `History30Days` | 30 | 60 | Insights, trends |
| `HighCompletion` | 20 (18 done) | 40 | Success messaging |
| `LowCompletion` | 20 (5 done) | 25 | Coaching nudges |

### Accessibility Identifiers

Add identifiers to all interactive elements:

```swift
// In SwiftUI
Button("Start") {
    viewModel.start()
}
.accessibilityIdentifier("startButton")

// In UI test
app.buttons["startButton"].tap()
```

### UI Testing Gotchas

#### SwipeActions Only Work in List/Form

**Critical:** `.swipeActions` are not reliably testable via XCUITest when used within `ScrollView > LazyVStack`:

```swift
// WRONG — SwipeActions not testable
struct ContentView: View {
    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(items) { item in
                    ItemRow(item: item)
                        .swipeActions {  // ❌ Not accessible to XCUITest
                            Button("Delete", role: .destructive) { }
                        }
                }
            }
        }
    }
}

// RIGHT — Use List for testable SwipeActions
struct ContentView: View {
    var body: some View {
        List {
            ForEach(items) { item in
                ItemRow(item: item)
                    .swipeActions {  // ✓ Accessible to XCUITest
                        Button("Delete", role: .destructive) { }
                    }
            }
        }
    }
}

// UI test
func test_deleteItem() {
    app.launch()
    let cell = app.cells.firstMatch
    cell.swipeLeft()
    cell.buttons["Delete"].tap()
}
```

#### TextField(axis: .vertical) Element Type

**Critical:** `TextField(axis: .vertical)` in iOS 26 is not exposed as `app.textViews` or `app.textFields`:

```swift
// In SwiftUI
TextField("Enter text", text: $text, axis: .vertical)
    .accessibilityIdentifier("notesTextField")
```

```swift
// WRONG — element not found
func test_enterText() {
    app.launch()
    app.textFields["notesTextField"].tap()  // Not found
}

// WRONG — also not found
func test_enterText() {
    app.launch()
    app.textViews["notesTextField"].tap()  // Also not found
}

// RIGHT — use descendants with any type
func test_enterText() {
    app.launch()
    let textField = app.descendants(matching: .any)["notesTextField"]
    textField.tap()
    textField.typeText("Test notes")
}
```

#### UI Test Data Seeding Race Condition

**Critical:** Async data seeding requires synchronization:

```swift
// In app — signal when seeding completes
func seedTestData() async {
    // ... seed data
    await MainActor.run {
        NotificationCenter.default.post(name: .testDataSeeded, object: nil)
    }
}

// In UI test — wait for signal
func test_withSeededData() {
    app.launchArguments = ["-UITestMode", "-SeedScenario=MultipleCaptures"]
    app.launch()

    // Wait for seeding completion
    let seeded = expectation(forNotification: .testDataSeeded, object: nil)
    wait(for: [seeded], timeout: 5)

    // Now test with data
    XCTAssertTrue(app.cells.firstMatch.exists)
}
```

**Also:** Use `Date()` timestamps for test data to avoid time-filter hiding:

```swift
// WRONG — past dates filtered by default
let capture = CapturedThought(text: "Test", timestamp: Date().addingTimeInterval(-86400))

// RIGHT — use current date
let capture = CapturedThought(text: "Test", timestamp: Date())
```

### Waiting for State Changes

```swift
// WRONG — long sleep
sleep(5)
XCTAssertTrue(element.exists)

// RIGHT — predicate expectation
let predicate = NSPredicate(format: "label == %@", "tap to pause")
let expectation = XCTNSPredicateExpectation(predicate: predicate, object: hintLabel)
XCTWaiter.wait(for: [expectation], timeout: 5)

// RIGHT — wait for existence with short timeout
XCTAssertTrue(element.waitForExistence(timeout: 2))
```

---

## Common Pitfalls

### Date Filtering in Test Data

**Problem:** ViewModel defaults to `.today` filter, but seeded data uses past dates.

**WRONG:**
```swift
let capture = CapturedThought(text: "Test", timestamp: Date().addingTimeInterval(-86400))
// Won't appear in today's filter
```

**RIGHT:**
```swift
let capture = CapturedThought(text: "Test", timestamp: Date())
// Visible with default filter
```

### Test Isolation Violations

**WRONG:** Sharing state between tests
```swift
static var sharedContainer: ModelContainer!  // ❌ Never do this

override func setUp() {
    // Reusing container from previous test
}
```

**RIGHT:** Fresh container per test
```swift
override func setUpWithError() throws {
    container = try makeTestContainer(for: MyModel.self)
}

override func tearDownWithError() throws {
    container = nil  // Clean up
}
```

### Excessive Wait Times

**WRONG:**
```swift
XCTAssertTrue(element.waitForExistence(timeout: 30))  // Too long
sleep(5)  // Wastes time
```

**RIGHT:**
```swift
XCTAssertTrue(element.waitForExistence(timeout: 2))   // UI responds in <2s
// Or use expectations for specific state changes
```

### Creating Data Through UI vs Seeding

See UI Testing section above. Always prefer seeding for setup state.

---

## Running Tests

### Unit Tests (Package)

```bash
cd MyAppKit && swift test
```

### Unit Tests (Xcode)

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests
```

### Specific Test File

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests
```

### Specific Test

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests/test_startFromIdle_transitionsToRunning
```

### UI Tests

```bash
xcodebuild test -scheme MyApp-UITests \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max'
```

### With Coverage

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -enableCodeCoverage YES \
  -resultBundlePath TestResults.xcresult
```

---

## Testing Checklist

When adding a new feature:

- [ ] Unit tests for ViewModel logic
- [ ] Unit tests for Service layer (if applicable)
- [ ] UI test for critical user path
- [ ] Screenshot test if new screen visible in App Store
- [ ] Accessibility identifiers added to interactive elements
- [ ] Test data scenario updated (if needed)
- [ ] Async operations tested with expectations
- [ ] Error states tested (failures, permissions denied)

---

## Quick Reference

| Pattern | Code |
|---------|------|
| In-memory container | `ModelConfiguration(isStoredInMemoryOnly: true)` |
| MainActor test class | `@MainActor final class MyTests: XCTestCase` — ALL methods must also be `async` |
| Async test | `func test_...() async throws` — required for any `@MainActor` subject |
| Expectation | `let exp = expectation(description: "..."); wait(for: [exp], timeout: 5)` |
| Mock service | Protocol + class with configurable behavior |
| UI test launch | `app.launchArguments = ["-UITestMode"]; app.launch()` |
| Wait for element | `element.waitForExistence(timeout: 2)` |

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios-build` — Build validation and CI integration

<!-- END SKILL: ios-test -->

---

<!-- BEGIN SKILL: ios26-api-reference -->

# ios26-api-reference

# iOS 26 API Reference — Smart Dispatcher

> **Purpose:** Prevent bugs from hallucinated or outdated API signatures.
> **Architecture:** 3-tier loading — only load what you need.
> **Last verified:** 2026-04-08
> **Context7 Integration:** Live API documentation lookup for latest signatures

---

## Step 1: Detect Frameworks

Scan `import` statements and code patterns. Load **only** the matching essentials file(s).

| Import / Pattern | Load Essential | Deep Reference (if debugging) |
|------------------|---------------|-------------------------------|
| `import SwiftUI`, any View code | `essentials/swiftui.md` | `reference/swiftui-reference.md` |
| `import SwiftData`, `@Model`, `ModelContext` | `essentials/swiftdata.md` | `reference/swiftdata-reference.md` |
| `import FoundationModels`, `@Generable`, `LanguageModelSession` | `essentials/foundation-models.md` | `reference/foundation-models-reference.md` |
| `import Speech`, `SpeechTranscriber`, `SpeechAnalyzer` | `essentials/speech.md` | `reference/speech-reference.md` |
| `import AVFoundation`, `AVAudioEngine`, `AVAudioSession` | `essentials/avfoundation.md` | `reference/avfoundation-reference.md` |
| `import WidgetKit`, `import ActivityKit`, Live Activity | `essentials/widgets.md` | `reference/widgets-reference.md` |
| `import AppIntents`, `AppShortcutsProvider` | `essentials/app-intents.md` | `reference/app-intents-reference.md` |
| `import Vision`, `VNRequest`, `VNObservation` | `essentials/vision.md` | `reference/vision-reference.md` |
| `import VideoToolbox`, `VTCompressionSession` | `essentials/videotoolbox.md` | `reference/videotoolbox-reference.md` |
| `import Network`, `NWConnection`, `NWListener` | `essentials/network.md` | `reference/network-reference.md` |
| `#if os(macOS)`, `import AppKit` | `essentials/macos.md` | — |
| `#if os(watchOS)`, `import WatchKit` | `essentials/watchos.md` | — |
| Swift 6 concurrency errors, `@MainActor`, `Sendable` | `essentials/swift6.md` | `reference/swift6-reference.md` |

**Rule:** Always load `essentials/swift6.md` alongside any other framework when the project uses `SWIFT_STRICT_CONCURRENCY: complete`.

## Step 2: Loading Protocol

| Scenario | What to Load | Expected Lines |
|----------|-------------|----------------|
| **Writing code** | SKILL.md + matching essentials (1-3 files) | 700-1,800 |
| **Debugging a crash** | + the matching reference file | 2,000-4,000 |
| **Deep investigation** | + matching expert guide and/or community intel | 4,000-6,000 |
| **Full code review** | SKILL.md + essentials/swift6.md + essentials for each detected framework | 2,000-3,500 |

### Deep-Dive Files (Tier 3)

For debugging sessions that need architectural context or real-world gotchas:

| Framework | Expert Guide | Community Intel |
|-----------|-------------|-----------------|
| Swift 6 | `guides/expert-swift6.md` | `intel/community-swift6.md` |
| FoundationModels | `guides/expert-foundation-models.md` | `intel/community-foundation-models.md` |
| Speech + Audio | `guides/expert-speech-audio.md` | `intel/community-speech.md`, `intel/community-avaudio.md` |

Also available: `reference/crash-cheat-sheet.md` (universal rules) and `reference/apple-guides.md` (Apple documentation compilation).

---

## Step 3: Context7 Live Documentation Lookup

When static references are insufficient or you encounter unfamiliar APIs, **use Context7 MCP** to fetch the latest official documentation.

### When to Query Context7

| Scenario | Action |
|----------|--------|
| Unfamiliar API signature | Query Context7 before assuming |
| API behaving unexpectedly | Cross-reference with live docs |
| New framework version | Verify API hasn't changed |
| Code review findings | Flag "unverified" if Context7 unavailable |
| Hallucination suspicion | Always verify via Context7 first |

### Context7 Query Pattern

```
1. Identify the framework/library (e.g., "SwiftData", "FoundationModels")
2. Query Context7 for specific API documentation
3. Cross-reference with local essentials files
4. If conflict: Context7 wins (it's live), but note the discrepancy
```

### Example Queries

- **SwiftData predicate syntax:** Query Context7 for `NSPredicate` + `SwiftData` patterns
- **FoundationModels API:** Query Context7 for `LanguageModelSession` latest methods
- **New iOS 26 APIs:** Query Context7 for `glassEffect` modifier parameters
- **Swift 6 concurrency:** Query Context7 for `Sendable` conformance patterns

### Integration with Local References

| Source | Use For | Priority |
|--------|---------|----------|
| Context7 MCP | Live API signatures, latest changes | **Highest** |
| essentials/*.md | Verified patterns, common pitfalls | High |
| reference/*.md | Deep dives, comprehensive lookup | Medium |
| intel/*.md | Community solutions, workarounds | Contextual |

**Rule:** When Context7 and local docs conflict, trust Context7 for API signatures (it's live), but verify against local crash prevention rules (they're battle-tested).

---

## Step 4: Universal Crash Prevention (Always in Context)

These 5 rules apply to ALL iOS 26 code. Memorize them.

### Rule 1: @MainActor on ALL UI Code

```swift
// WRONG
class ViewModel { var state = "" }

// RIGHT
@MainActor @Observable
class ViewModel { var state = "" }
```

### Rule 2: nonisolated deinit on @MainActor Classes

```swift
// WRONG — crash on deallocation from background
@MainActor class Service {
    deinit { cleanup() }  // CRASH
}

// RIGHT
@MainActor class Service {
    nonisolated deinit { /* safe */ }
}
```

### Rule 3: @preconcurrency ONLY When the Compiler Demands It

> **Reversed guidance (2026-04-03):** iOS 26 first-party frameworks ship with full Sendable annotations. Do NOT add `@preconcurrency` prophylactically — it masks real concurrency issues that surface as archive crashes. Cadence removed `@preconcurrency` from 10 files and crashes stopped. Only add it where the compiler specifically warns on a single import.

```swift
// ❌ WRONG — do not add prophylactically
@preconcurrency import EventKit
@preconcurrency import AVFoundation

// ✅ CORRECT — add only where compiler specifically demands it
import EventKit
import AVFoundation
@preconcurrency import SomeLegacyBinaryFramework  // Compiler demanded this
```

### Rule 4: Task Does NOT Inherit Actor Isolation

```swift
// WRONG — no @MainActor, runs on cooperative pool
Task { self.state = newState }

// RIGHT — explicit isolation
Task { @MainActor [weak self] in
    self?.state = newState
}
```

### Rule 5: @Model Objects Never Cross Async Boundaries

```swift
// WRONG — data race
let session = modelContext.model(for: id) as! Session
Task.detached { session.name = "..." }  // CRASH

// RIGHT — pass scalars or PersistentIdentifier
let id = session.persistentModelID
Task.detached {
    let ctx = ModelContext(container)
    let s = ctx.model(for: id) as! Session
    s.name = "..."
}
```

---

## Error Decoder Ring

| Error | Fix |
|-------|-----|
| `Main actor-isolated property can not be mutated from non-isolated context` | Add `@MainActor` or `await MainActor.run {}` |
| `Non-sendable type returned by call crossing isolation boundary` | Extract Sendable values; add `@preconcurrency import` ONLY if compiler demands it |
| `Reference to captured var in concurrently-executing code` | `[weak self]` or capture as `let` |
| `Required condition is false: IsFormatSampleRateAndChannelCountValid` | Call `engine.prepare()` before reading format |
| `Cannot start an audio tap when the engine is running` | Install tap BEFORE `engine.start()` |
| `Cannot use staged migration with unknown model version` | Delete app data or implement migration |
| `ssu-cli-app crashed` | Remove `suggestedInvocationPhrase` from non-shortcut intents |

---

## Quick Reference Card — Corrected API Signatures

| API | Correct Signature | Common Hallucination |
|-----|------------------|----------------------|
| FM plain response | `try await session.respond(to: prompt)` → `.content: String` | Forgetting `try await` |
| FM structured | `session.respond(to:, generating: T.self)` → `.content: T` | Wrong param order |
| FM streaming | `session.streamResponse(to: prompt)` → `AsyncSequence` of partials | Treating partials as deltas (they accumulate) |
| FM Tool protocol | `func call(arguments:) async throws -> Value` | `invoke(location:)` — **HALLUCINATED** |
| FM availability | `SystemLanguageModel.default.isAvailable` | `LanguageModelSession.isAvailable` — **DOES NOT EXIST** |
| @Generable | `@Generable struct X { var y: String }` | Using on class (struct only) |
| @Guide | `@Guide(description: "...", .range(...))` | Missing description param |
| SpeechTranscriber | `SpeechTranscriber(locale:, preset:)` | Omitting locale |
| Transcriber results | `transcriber.results` → `AsyncSequence<Result>` | `.text` directly (it's `AttributedString`) |
| Result to String | `String(result.text.characters)` | `result.text as String` (wrong type) |
| SpeechAnalyzer | `SpeechAnalyzer(inputSequence:, modules:)` — it's an **actor** | Treating as struct |
| Liquid Glass | `.glassEffect(.regular, in: .rect(cornerRadius: 12))` | `.background(.glass)` — **DOES NOT EXIST** |
| SwiftData index | `#Index<Model>([\.prop1])` (freestanding macro) | `@Index` — wrong syntax |
| Canvas + Observable | Wrap in `TimelineView(.animation)` | Direct Canvas (never redraws) |
| Color providers | Precompute, `@Sendable`-safe closures | `Color(light:dark:)` inline (background crash) |
| Live Activity families | `.supplementalActivityFamilies([.small, .medium])` | Wrong modifier name |
| nonisolated deinit | `nonisolated deinit { }` | Plain `deinit` in @MainActor class |

---

## Platform Version Reference

| Platform | Minimum | Current | Xcode |
|----------|---------|---------|-------|
| iOS | 26.0 | 26.4 | 17.0+ |
| watchOS | 26.0 | 26.0+ | 17.0+ |
| macOS | 26.0 | 26.0+ | 17.0+ |
| Swift | 6.0 | 6.0 (strict) | — |

## Build Settings

```yaml
SWIFT_VERSION: "6.0"
SWIFT_STRICT_CONCURRENCY: complete
SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
```

---

## Cross-Skill References

| Need | Skill |
|------|-------|
| Swift 6 coding patterns | `ios-standards` |
| Specific concurrency error fixes | `swift6-concurrency` |
| Automated pattern validation | `apple-patterns-check` |
| Design system + Liquid Glass | `ios-design` |
| Build troubleshooting | `ios-build` |
| Live API documentation | Context7 MCP (via `/setup`) |

---

## FoundationModels Beta Issue Tracker

| Issue | Fixed In | Workaround |
|-------|----------|------------|
| `includeSchemaInPrompt: false` ignored | Beta 2 | — |
| Primitive tool arguments fail | Beta 2 | — |
| Recursive `@Generable` types crash | Beta 3 | Flatten types |
| Chinese language unsupported | Beta 3 | — |
| Public `@Generable` types bug | Beta 3 | — |
| Duplicate tool names crash | Beta 3 | Unique names |
| Tool calling + guided gen fails | Beta 4 | — |
| Guardrail false positives | Beta 5 | — |
| Enum with associated values crash | Beta 5 | — |
| **Enum assoc. type as Argument** | **OPEN** | Wrap in struct |

---

## When to Consult This Skill

- **Before** writing code with ANY Apple framework listed above
- **When** debugging Swift 6 concurrency errors
- **When** tests pass locally but fail in archive/CI builds
- **When** audio/speech code crashes
- **When** `Canvas` views don't update or `Color` providers crash
- **When** `ssu-cli-app` crashes in App Intents

<!-- END SKILL: ios26-api-reference -->

---

<!-- BEGIN SKILL: merge-check -->

# merge-check

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
| Lint | WARNING | Fix style issues or mark intentional |
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

<!-- END SKILL: merge-check -->

---

<!-- BEGIN SKILL: regression-test -->

# regression-test

# Regression Test Skill

When fixing a bug, always follow this workflow to prevent the bug from recurring.

---

## Regression Test Workflow

### Step 0: Identify the Bug Class

Before writing any test, classify the bug. This determines what *else* to check.

| Bug Class | Root Cause | Also Search For |
|-----------|------------|----------------|
| **Force unwrap crash** (`!`) | Assumed non-nil, was nil | Other `!` in same file/service |
| **try! crash** | Error ignored at call site | Other `try!` in same target |
| **fatalError crash** | Defensive code hit in prod | Other `fatalError` in prod paths |
| **Missing confirmation** | Destructive action unguarded | Other destructive actions without `.destructive` role |
| **MainActor isolation crash** | Async code off main thread | Other `@MainActor` + async patterns in same ViewModel |
| **App Group mismatch** | Entitlements out of sync | All targets sharing the group |
| **State not restored** | Background/foreground not handled | Other lifecycle observers |

After identifying the class, fix *all* instances of the class in this file/service — not just the one that crashed. One bug usually means there are siblings.

### Step 1: Write Failing Test First

Before fixing the bug, reproduce it in a test that fails:

```swift
func test_timer_backgrounding_shouldPause() {
    // Given: Running timer
    let viewModel = TimerViewModel()
    viewModel.start()

    // When: App backgrounds
    NotificationCenter.default.post(name: UIApplication.didEnterBackgroundNotification, object: nil)

    // Then: Timer should be paused
    XCTAssertEqual(viewModel.state, .paused)
}
```

**Why first?** Ensures you understand the bug and can prove the fix works.

### Step 2: Fix the Bug

Make minimal changes to fix the issue. Run the test from Step 1 — it should now pass.

### Step 3: Verify Test Passes

```bash
# Run the specific test you added
xcodebuild test -scheme <YourScheme> \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:<TestTarget>/<TestClass>/<test_method_name>
```

### Step 4: Run Full Suite

Ensure your fix didn't break anything else:

```bash
# Run all tests using your project's test command
<project-test-command>
```

### Step 5: Pattern Check

Search for similar bugs in the codebase:

```bash
# Find similar code patterns that might have the same issue
rg "<pattern-from-bug>" --type swift
```

---

## Test Location Guide

| Bug Location | Test Location | Naming Pattern |
|--------------|---------------|----------------|
| **ViewModel** | `Tests/[Name]ViewModelTests.swift` | `test_[method]_[scenario]_should[Expected]` |
| **Service** | `Tests/ServiceTests/[Name]Tests.swift` | Mock dependencies, test error cases |
| **Model (SwiftData)** | `Tests/ModelTests/[Name]Tests.swift` | Test CRUD, relationships, migrations |
| **UI Flow** | `UITests/CriticalPathUITests.swift` | Extend existing test or add new flow |
| **UI Component** | `UITests/[Feature]UITests.swift` | Component-specific interactions |

Adapt paths to your project's test directory structure.

---

## Concrete Example

### Bug Report
> Timer doesn't pause when backgrounding app during active session.

### Regression Test

```swift
@MainActor
func test_timer_backgrounding_shouldPause() {
    // Given: Active session
    let container = try makeTestContainer()
    let viewModel = TimerViewModel(modelContainer: container)
    viewModel.startSession()
    XCTAssertEqual(viewModel.state, .running)

    // When: App backgrounds
    NotificationCenter.default.post(
        name: UIApplication.didEnterBackgroundNotification,
        object: nil
    )

    // Then: Timer is paused
    XCTAssertEqual(viewModel.state, .paused)
}
```

### The Fix

```swift
init() {
    NotificationCenter.default.addObserver(
        self,
        selector: #selector(handleBackground),
        name: UIApplication.didEnterBackgroundNotification,
        object: nil
    )
}

@objc private func handleBackground() {
    if state == .running {
        pause()
    }
}
```

### Verification

```bash
# 1. Run new regression test
xcodebuild test -scheme <YourScheme> \
  -only-testing:<TestTarget>/TimerViewModelTests/test_timer_backgrounding_shouldPause

# 2. Run full suite
<project-test-command>

# 3. Pattern check — find other notification handlers
rg "NotificationCenter" <ViewModels-dir>/
```

---

## Common Regression Test Patterns

### State Machine Bug

```swift
func test_timerState_[invalidTransition]_should[Expected]() {
    // Given: State X
    // When: Invalid action Y
    // Then: Expected behavior (error, ignore, etc.)
}
```

### Data Persistence Bug

```swift
func test_[model]_[operation]_shouldPersist() {
    // Given: Model instance
    // When: Save / Update / Delete
    // Then: Data correctly persisted / cascade deleted
}
```

### Service Integration Bug

```swift
func test_[service]_[failure]_should[handleGracefully]() {
    // Given: Mock service configured to fail
    // When: Call method
    // Then: Error handled, state consistent
}
```

### UI State Bug

```swift
func test_[ui]_[action]_should[updateState]() {
    // Given: UI in specific state
    // When: User action
    // Then: UI reflects new state
}
```

---

## Checklist

- [ ] Failing test written that reproduces the bug
- [ ] Bug fixed with minimal changes
- [ ] Test passes after fix
- [ ] Full test suite passes
- [ ] Pattern check completed for similar issues
- [ ] Test named clearly: `test_[what]_[when]_[should]`
- [ ] Test location follows conventions

<!-- END SKILL: regression-test -->

---

<!-- BEGIN SKILL: swift6-concurrency -->

# swift6-concurrency

Handle Swift 6 concurrency issues. Swift 6 enforces strict data isolation by default; most errors fall into a small number of patterns with known fixes.

> **Deep reference:** For 8 comprehensive crash scenarios with WRONG/RIGHT pairs, load `ios26-api-reference/essentials/swift6.md`.
> For expert-level patterns (actor isolation, migration strategies), load `ios26-api-reference/guides/expert-swift6.md`.
> For real-world community gotchas, load `ios26-api-reference/intel/community-swift6.md`.
> **Live API verification:** Use Context7 MCP to query the latest Swift concurrency documentation for unfamiliar patterns or API signatures.

---

## Common Error Patterns

### 1. `static property is not concurrency-safe`

App Intent metadata and similar protocol requirements often use `static var`:

```swift
// Wrong
struct MyIntent: AppIntent {
    static var title: LocalizedStringResource = "..."
}

// Correct
struct MyIntent: AppIntent {
    static let title: LocalizedStringResource = "..."
}
```

**Fix:** Change `static var` to `static let` for immutable protocol requirements.

---

### 2. `sending 'self' risks causing data races` in callbacks

```swift
// Wrong
class MyService {
    func doWork() {
        someFrameworkCallback { result in
            self.handleResult(result)  // Error
        }
    }
}

// Correct
class MyService {
    func doWork() {
        someFrameworkCallback { result in
            Task { @MainActor in
                self.handleResult(result)
            }
        }
    }
}
```

**Fix:** Dispatch to `@MainActor` inside the callback via `Task { @MainActor in ... }`.

---

### 3. Framework types not Sendable (EventKit, Speech, AVFoundation, etc.)

```swift
// Wrong — prophylactic @preconcurrency masks real concurrency issues
@preconcurrency import EventKit

func fetch() async -> [EKReminder] { ... }  // [EKReminder] is not Sendable

// Correct — start with plain import; add @preconcurrency only if compiler demands it
import EventKit

@MainActor
class RemindersService {
    func fetch() async -> [EKReminder] { ... }
}
```

**Fix:** Use `@preconcurrency import` ONLY when the compiler specifically demands it on a single import. iOS 26 first-party frameworks (AVFoundation, Vision, ActivityKit, SwiftData, etc.) ship with full Sendable annotations — do not add `@preconcurrency` prophylactically. It masks real concurrency issues that surface as archive crashes. Combine with `@MainActor` isolation where the types are used in UI-adjacent code.

---

### 4. Singleton shared state

```swift
// Wrong — mutable static is not safe
class MySingleton {
    static var shared = MySingleton()
}

// Correct — immutable init, marked nonisolated(unsafe) if truly shared
class MySingleton {
    nonisolated(unsafe) static let shared = MySingleton()
    private init() {}
}
```

**Fix:** Use `nonisolated(unsafe)` only when you can guarantee the instance itself is safe after initialization.

---

### 5. `nonisolated deinit` required for @MainActor classes (Apple Known Issue)

```swift
// Wrong — @MainActor class with deinit crashes on deallocation
@MainActor
class CameraService {
    deinit {
        captureSession.stopRunning()  // CRASH: Cannot access MainActor state from deinit
    }
}

// Correct — nonisolated deinit doesn't access MainActor state
class CameraService {
    nonisolated deinit {
        // Only non-isolated cleanup (e.g., VTCompressionSessionInvalidate)
        // Do NOT access any @MainActor properties here
    }
}
```

**Fix:** All `@MainActor` classes (explicit or via `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`) must use `nonisolated deinit`. Move any MainActor-dependent cleanup to a separate `func cleanup()` called before deallocation.

---

### 6. `MainActor.assumeIsolated` from background queues — Fatal Error

```swift
// Wrong — AVCaptureOutput delegate fires on a BACKGROUND queue
nonisolated func captureOutput(_ output: AVCaptureOutput, didOutput buffer: CMSampleBuffer, from connection: AVCaptureConnection) {
    MainActor.assumeIsolated {
        self.latestBuffer = buffer  // FATAL ERROR: not on main thread
    }
}

// Correct — use Task to hop to MainActor
nonisolated func captureOutput(_ output: AVCaptureOutput, didOutput buffer: CMSampleBuffer, from connection: AVCaptureConnection) {
    Task { @MainActor in
        self.latestBuffer = buffer
    }
}
```

**Fix:** Only use `MainActor.assumeIsolated` when you have *proof* the code runs on the main thread. Framework delegate callbacks are NOT guaranteed main-thread unless the documentation explicitly says so.

---

### 7. Sheet `onDismiss` + `withCheckedContinuation` double-resume

```swift
// Wrong — async onComplete races with synchronous onDismiss
.sheet(isPresented: $showPrompt, onDismiss: {
    completion?(false)  // Fires FIRST (synchronous)
}) {
    PromptView(onComplete: { enabled in
        Task { await promptCompleted(enabled: enabled) }  // Fires SECOND (queued) → DOUBLE RESUME
    })
}

// Correct — synchronous completion, nil before dismiss
func promptCompleted(enabled: Bool) {  // NOT async
    showPrompt = false
    let cb = self.completion
    self.completion = nil       // Nil BEFORE dismiss fires onDismiss
    cb?(enabled)                // Resume exactly once
}
```

**Fix:** Never wrap a sheet's `onComplete` in `Task { await }` if `onDismiss` also resumes the same continuation.

---

### 8. CoreData Sendable Annotations (iOS 26 Beta 5)

```swift
// NSManagedObject is NOT Sendable — never pass between actors
// NSManagedObjectContext IS Sendable — use perform blocks for cross-actor access

// Wrong
func badFunction(item: NSManagedObject) async {
    Task.detached { process(item) }  // data race
}

// Correct
let context = persistentContainer.viewContext
Task.detached {
    await context.perform {
        // Safe — context manages its own queue
    }
}
```

---

### 9. Task closure captures changed from `@Sendable` to `sending`

The closure passed to `Task.init` and `Task.detached` was changed from `@Sendable` to `sending`. The compiler no longer tells you *which* captured values create the data race. Be explicit:

```swift
// Be explicit about captures
Task { [weak self, capturedValue] in
    // capturedValue must be Sendable
    // self is weak reference
}
```

---

## Safe Patterns

### Services that touch UI → `@MainActor`

```swift
@MainActor
@Observable
class MyService {
    var state: MyState = .idle
}
```

### ViewModels always → `@MainActor @Observable`

```swift
@MainActor
@Observable
class MyViewModel {
    var items: [Item] = []
}
```

### Protocols with async methods across actors

```swift
@MainActor
protocol MyProtocol {
    func doWork() async
}

// Implementation inherits isolation
class MyImpl: MyProtocol {
    func doWork() async { ... }
}
```

---

## Unsafe Patterns — Never Use

| Pattern | Problem | Use Instead |
|---------|---------|-------------|
| `struct Wrapper<T>: @unchecked Sendable` | Hides real safety issues | Proper isolation; `@preconcurrency` only if compiler demands it |
| `unsafeBitCast` for Sendable conformance | Undefined behavior | Proper isolation |
| Enabling strict concurrency without audit | Cascading build failures | Audit first, enable per-module |

---

## Framework-Specific Guidance

| Framework | Issue | Solution |
|-----------|-------|----------|
| EventKit | `EKReminder`, `EKCalendar` not Sendable | Only if compiler demands it; prefer `@MainActor` |
| HealthKit | `HKSample` types not Sendable | Only if compiler demands it; prefer `@MainActor` |
| Speech | `SFSpeechRecognitionResult` not Sendable | Only if compiler demands it |
| AVFoundation | `AVAudioEngine` thread safety | Do NOT add prophylactically; use `@MainActor` for UI-related audio |
| VideoToolbox | VTCompressionSession types | Only if compiler demands it |
| Vision | VNRequest types not Sendable | Only if compiler demands it |
| SwiftData | `@Model` NOT Sendable | Do NOT add prophylactically; extract scalars before async boundary |
| ActivityKit | Live Activity types | Only if compiler demands it |
| CoreData | `NSManagedObject` NOT Sendable (Beta 5) | Only if compiler demands it; use `perform` blocks |
| CoreLocation | Location types | Only if compiler demands it |
| WidgetKit | Timeline providers | Only if compiler demands it |
| UserNotifications | Completion handlers | `Task { @MainActor in ... }` in callbacks |

---

## Quick Reference

| Problem | Solution |
|---------|----------|
| `static var` in App Intent | Change to `static let` |
| Callback captures `self` across actors | `Task { @MainActor in self.method() }` |
| Framework type not Sendable | `@preconcurrency import FrameworkName` **only if compiler demands it** |
| Singleton shared state | `nonisolated(unsafe) static let shared` |
| Service needs UI updates | `@MainActor @Observable class` |
| Protocol used across actors | `@MainActor protocol` |
| @MainActor class with deinit | `nonisolated deinit { }` — never access MainActor state |
| `MainActor.assumeIsolated` crash | Only use from guaranteed main-thread code; else `Task { @MainActor in }` |
| Sheet + continuation double-resume | Synchronous completion, nil handler before dismiss |
| @Model crossing async boundary | Extract scalars before `Task` or `AsyncStream` |
| `NSManagedObject` across actors | Use `context.perform { }` — NSManagedObject is NOT Sendable |
| Task capture data race | Explicit `[weak self, value]` capture list |

---

## Archive vs Debug Isolation

Debug builds (`-Onone`) relax strict concurrency checks. Archive builds (`-O`) enforce them fully. **This is the #1 cause of CI failures** — code compiles clean in Xcode's debug/simulator mode but fails in Xcode Cloud's archive build.

Always run an archive build before pushing Swift changes that touch concurrency or actor isolation.

### `nonisolated(unsafe)` for Mutable Stored Properties

Mutable stored properties on `Sendable` types require `nonisolated(unsafe)` in archive builds. Debug builds may not flag this.

```swift
// Wrong — compiles in debug, fails in archive
struct MyConfig: Sendable {
    static var current = MyConfig()
}

// Correct — nonisolated(unsafe) satisfies archive-mode isolation
struct MyConfig: Sendable {
    nonisolated(unsafe) static var current = MyConfig()
}
```

**Rule of thumb:** If your CI catches `MainActor`-isolation or `Sendable` errors that Xcode didn't show locally, you are building in debug mode. Switch to archive (`Product > Archive` or `xcodebuild archive`) to reproduce locally.

---

## Migration Path

When enabling `SWIFT_STRICT_CONCURRENCY: complete` on an existing codebase:

1. Enable per-module incrementally (start with leaf modules)
2. Fix errors bottom-up (models → services → viewmodels → views)
3. Remove any prophylactic `@preconcurrency` imports; keep only those the compiler specifically demands
4. Test each change with a build before proceeding

<!-- END SKILL: swift6-concurrency -->

---

<!-- BEGIN SKILL: verify-against-spec -->

# verify-against-spec

# Verify Against Spec

Parallel verification that catches implementation gaps before they slip through context compaction.

## When to Use

- End of a multi-session feature development cycle
- "Make sure we haven't missed anything"
- Context window is filling up and you want a coverage check
- After a code review that introduced fixes — are all fixes applied?

**Do NOT use for:** Simple single-file changes, bug fixes without a spec, UI polish.

## Process

```
Find spec file
    │
    ▼
Launch 3 parallel agents
    ├─► Spec Coverage Verifier
    ├─► Build + Test
    └─► Docs Sync
    │
    ▼
Triage results
    │
    ▼
High severity gaps? ─► Yes ─► Fix gaps ─► Commit
                    └► No  ─► Commit
```

## Step 1: Find the Spec

Look in order:
1. `docs/plans/<feature-plan>.md`
2. `docs/brainstorm/<feature>/design.md`
3. Ask the user if unclear

## Step 2: Launch Parallel Agents

Dispatch all three agents simultaneously. Each runs independently.

```
Coordinator (you)
├─► Agent 1 — Spec Coverage Verifier   [Standard tier: claude-sonnet-4-6 / gpt-4.1 / gemini-3.1-pro / kimi-k2.5]
├─► Agent 2 — Build + Test             [Fast tier:     claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
└─► Agent 3 — Docs Sync               [Fast tier:     claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
         │
         ▼ (all three complete)
Coordinator — triage and fix
```

### Agent 1 — Spec Coverage Verifier

Prompt template:
```
You are verifying implementation coverage for a feature.

DESIGN SPEC: <path to spec or plan>

Read the spec and identify every requirement, behavior, and component it describes.
Then read the implementation files listed below.

For each spec requirement, determine:
- IMPLEMENTED: clearly present in code
- PARTIAL: partially implemented or different from spec
- MISSING: not found in implementation

Implementation files to check:
<list the key new/modified files from this feature>

Return a list sorted by severity (High = functional gap, Medium = behavioral mismatch, Low = cosmetic/naming).
Format each gap as: [Severity] Requirement | Current State | Spec Says
```

### Agent 2 — Build + Test

**(Fast tier — mechanical execution, no judgment required)**

Run your project's build and test commands:

```bash
# Build — use your project's build system
# Examples: xcodebuild, swift build, make build
<project-build-command> 2>&1 | grep -E "error:|BUILD SUCCEEDED|BUILD FAILED"

# Test — use your project's test runner
<project-test-command> 2>&1 | tail -5
```

Report: build status + test count + any failures.

### Agent 3 — Docs Sync

**(Fast tier — read-only comparison)**

Check:
- Project documentation — do conventions accurately reflect new patterns introduced?
- Memory files — do they capture key decisions/gotchas from this session?
- Plan file — should it be moved to a completed folder?

Return: list of stale/missing entries with suggested updates.

## Step 3: Triage and Fix

| Severity | Action |
|----------|--------|
| High | Fix before committing — functional gap |
| Medium | Fix if quick (<15 min), otherwise file a note |
| Low | Skip — cosmetic, not worth the churn |

Fix High gaps by re-reading the relevant spec section and comparing to the implementation. Don't invent new behavior — follow the spec.

## Step 4: Commit

After fixes:
```bash
git add -p
git commit -m "fix(feature): address spec coverage gaps from verification"
```

## Common Gaps Found

Based on experience with Apple platform projects:

- **Sheet environment injection**: New sheets often miss `@Environment` props that parent views have
- **Empty state handling**: Spec says show message X, implementation shows nothing
- **Toast/confirmation feedback**: Spec says "show toast after action", action is silent
- **Dead code leftover**: Old implementations not deleted when replaced
- **Filter/state cleanup**: ViewModel has unused state from previous design

## Quick Reference

```
/verify-against-spec docs/plans/feature-redesign.md
/verify-against-spec docs/brainstorm/2026-03-20-new-feature/design.md
```

Run at the end of every multi-day feature branch. Context compaction hides gaps — this surfaces them.

## Relationship to Other Skills

| Skill | When | Purpose |
|-------|------|---------|
| `verify-against-spec` | End of spec-driven work | Coverage vs design spec |
| `complete-feature` | Feature feels done | Comprehensive checklist |
| `merge-check` | Before merging to main | Pre-merge quality gate |
| `regression-test` | During bug fix | TDD-first regression workflow |

<!-- END SKILL: verify-against-spec -->

---

