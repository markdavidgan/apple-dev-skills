---
name: verify-against-spec
description: Use when finishing a spec-driven feature, when asked to verify nothing was missed, when approaching context limits on a long feature session, or after hearing "make sure everything is implemented". Cross-checks the design spec against the actual implementation, in parallel with build and doc verification.
invoke: "/verify-against-spec [spec-path] — Check implementation coverage against design spec"
---

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
