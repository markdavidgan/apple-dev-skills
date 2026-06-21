---
name: apple-review
category: quality
description: Comprehensive Apple-grade review of an iOS app covering design (Apple design leader perspective), engineering (architecture and code quality), compliance (App Store rejection risks), and keynote readiness (product story and demo quality). Use when asked for a full app review, Apple-quality audit, design critique, HIG compliance check, App Store readiness assessment, or "would Apple approve this", "keynote ready", "WWDC ready".
invoke: "/apple-review [app-dir] — Full Apple-grade review (design + engineering + compliance + keynote)"
---

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

## HARD RULE: Privacy Symbols vs Usage Strings (the two-scanner contract)

Two independent gates inspect privacy permissions, and they fail in **opposite** directions:

- **Apple's automated binary scanner** (TestFlight upload) rejects with `ITMS-90683` if the binary links a privacy-sensitive symbol but the Info.plist has no matching usage string. It reads *linked symbols*, not features.
- **Human App Review** rejects under **Guideline 5.1.1** if the Info.plist declares a usage string for a permission the app has no feature for. It reads *the running app*, not symbols.

A permission therefore needs **symbol present ⟺ string present**. Both-or-neither. Declaring a string "just in case" fails human review; linking the symbol without the string fails the scanner.

**Symbol linkage is the trigger — not the `import`, and not the feature.**

- It is the *specific symbol*, not the umbrella framework. `import AVFoundation` alone does not demand `NSCameraUsageDescription`; **`AVCaptureDevice`** does. Audio via `AVAudioApplication` demands only `NSMicrophoneUsageDescription`. Same framework, different keys, keyed off which symbols you actually reference.
- Linkage is **function-granular under the optimizer's reachability, not branch-granular**. A never-hit `switch` branch or an `if false` path still links the symbol if the *enclosing function* is reachable from the app's entry graph. You cannot dead-code your way out of a symbol by making the call conditional — only by making the enclosing function unreachable, or by removing the reference from the linked image entirely.
- This bites hardest with **shared packages**: a symbol referenced anywhere in a package that every app links gets linked into *every* app, so one app's camera code forces a camera-permission decision on apps that have no camera. The fix is to move the symbol behind a product/module boundary that only camera-using apps link (see `ios-build` → symbol-gating). Verify with `nm <app-binary> | grep -i <Symbol>` against a *fresh* archive — stale archives in `build/` predate the fix and will mislead you.

When auditing, treat a usage string with no reachable feature and a linked privacy symbol with no usage string as **the same class of finding** — a broken two-scanner contract — and report which side is missing.

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
│   ├─► Panel 1: Design Review (apple-dev-skills:code-reviewer)
│   │   UI/UX flows, visual craft, delight, simplicity, HIG
│   │
│   ├─► Panel 2: Engineering Review (apple-dev-skills:auditor)
│   │   Architecture, code quality, performance, patterns
│   │
│   ├─► Panel 3: Compliance Review (apple-dev-skills:code-reviewer)
│   │   App Store guidelines, rejection risks, metadata
│   │
│   └─► Panel 4: Keynote Review (apple-dev-skills:code-reviewer)
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
Config: project.yml, Info.plist, MyApp.entitlements, PrivacyInfo.xcprivacy
```

### 3. Assign files to each panel

- **Design**: App entry, onboarding, home, main editor, live views, design system, ViewModels
- **Engineering**: All services, models, ViewModels, extensions, utilities, project config, tests
- **Compliance**: project.yml, Info.plist, entitlements, privacy manifest, services with protected APIs, app entry
- **Keynote**: Onboarding, home, editor, live views, design system, README

Include this manifest in each agent's prompt so they don't waste tool calls on file discovery.

---

## Review Panels

Each panel is a self-contained subagent prompt kept in `references/` (progressive
disclosure — load only what you dispatch). For each panel: read the reference
file, paste the file manifest from the Pre-Work Phase into its
`[PASTE FILE MANIFEST HERE]` placeholder, and dispatch the prompt verbatim as the
listed subagent type. Spawn all four in parallel.

| Panel | Subagent type | Lens | Prompt |
|-------|---------------|------|--------|
| 1. Design | `apple-dev-skills:code-reviewer` | UI/UX flows, visual craft, delight, simplicity, HIG | `references/panel-design.md` |
| 2. Engineering | `apple-dev-skills:auditor` | Architecture, Swift 6, performance, patterns, tests | `references/panel-engineering.md` |
| 3. Compliance | `apple-dev-skills:code-reviewer` | App Store guidelines, privacy, entitlements, rejection risks | `references/panel-compliance.md` |
| 4. Keynote | `apple-dev-skills:code-reviewer` | Product story, demo-readiness, "one more thing" | `references/panel-keynote.md` |

Each panel prompt enforces the same contract:

- **Reading budget** — a strict MUST READ / SHOULD READ / SKIP order; stop reading
  and write the review after ~15 files (an incomplete structured review beats a
  complete file read with no output).
- **Mechanical audits** — grep checks the subagent runs rather than relying on
  training data (VoiceOver coverage, `fatalError`/`try!`/`as!`, missing usage
  descriptions, developer-facing strings, etc.).
- **Findings quality gate** — 0–N findings per bucket; never invent findings to
  hit a quota; empty buckets say "None observed at this depth of review."
- **Stable finding IDs** — Design `D-`, Engineering `E-`, Compliance `C-`,
  Keynote `K-` — preserved into the correlated report.
- **Presentation tag** — every issue is marked `shipped` / `wired-behind-flag` /
  `debug-only` / `dormant` so the Correlation Phase can gate priority (see the
  HARD RULE above).
- **Mandatory structured output** — each prompt ends by requiring the panel's
  output format before the response ends.

The Keynote panel additionally grades the project's **keynote run sheet** — the
committed `docs/keynote/run-sheet.md` artifact whose standard lives in
`references/keynote-run-sheet.md`. A review verifies that a WWDC-worthy run sheet
*exists and is current*; it never assesses whether the team has *rehearsed*
(unknowable from the repo, external to the product). An absent or stale run sheet
is a `K-` finding, and the panel's generated demo script is written in run-sheet
shape so it can seed or refresh the artifact.

The Compliance panel has the same shape. It grades the project's **submission
package** — the committed `docs/app-store/review-notes.md` artifact whose standard
lives in `references/app-review-submission-package.md`. And it never predicts the
**approval verdict**, which is unknowable from the repo (it turns on a human
reviewer, the running binary, server content, and ASC-side metadata). The
Compliance `/10` and Risk Level reflect only the **rejection-risk surface
detectable in the repo** plus the state of that artifact: a `LOW` band means "no
rejection risk I can see," never "Apple will approve." An absent or stale
submission package is a `C-` finding. Both panels grade a *checkable artifact*,
not an *off-stage outcome* — that is the rule the two share.

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
[Reflects rejection-risk surface detectable in the repo, NOT a prediction that
Apple will approve. See the Compliance panel's out-of-static-scope note.]

### Keynote Run Sheet: [PRESENT & CURRENT / THIN-or-STALE / ABSENT]

### Submission Package: [PRESENT & CURRENT / THIN-or-STALE / ABSENT]

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

- **Submit now**: Overall ≥ 8.5/10 AND zero P0 findings AND Compliance Risk Level ∈ {LOW, MEDIUM}. This clears the *detectable* rejection-risk surface — it is not a prediction that Apple will approve (see the Compliance out-of-static-scope note).
- **Iterate**: Overall < 8.5 OR any P0 OR Compliance Risk ∈ {HIGH, REJECTION LIKELY}. Run the action plan and re-review once P0/P1 are closed.
- **Submission-ready package** (smooths the review hand-off): a **PRESENT & CURRENT** submission package (`docs/app-store/review-notes.md`) — demo access, how to reach every reviewable feature, account/data deletion, export compliance. Not a gate on "Submit now," but an absent one is a `C-` finding and a common cause of avoidable round-trips.
- **Keynote / Apple Design Award readiness** (beyond submission): also requires a **PRESENT & CURRENT** keynote run sheet (`docs/keynote/run-sheet.md`). Submission does not require it; a stage demo does.

---

## Appendix: Files Reviewed
[All files examined across all panels]
```

## Apple Documentation Verification

**RECOMMENDED for Design and Engineering panels:**

When evaluating HIG compliance, SwiftUI patterns, SwiftData usage, or any Apple framework API:

1. **Use Context7 MCP FIRST** (if installed) for live API documentation — Query for official Apple framework docs when encountering unfamiliar APIs or verifying signatures. Context7 has the latest documentation and prevents hallucinations.
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
- The `apple-dev-skills:code-reviewer` agent type is used for Design/Compliance/Keynote because it
  emphasizes analysis and structured output over exploration
- The `apple-dev-skills:auditor` agent type is used for Engineering because it
  excels at deep codebase analysis with structured findings. If `apple-dev-skills:auditor` is
  not available in the current environment, fall back to `apple-dev-skills:architect` (preferred)
  or `apple-dev-skills:code-reviewer`, and note the substitution in the report.
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
