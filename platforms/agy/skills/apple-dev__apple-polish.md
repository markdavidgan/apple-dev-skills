---
name: apple-polish
description: Design and keynote-readiness craftsmanship review of an iOS app. Evaluates through Jony Ive (visual obsession) and Steve Jobs (demo readiness) perspectives, presents prioritized findings, then orchestrates parallel agents to fix selected issues and push a TestFlight build. Use for design polish, not engineering bugs.
invoke: "/apple-polish [app] — Design & keynote review → select issues → fix → TestFlight"
---

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

### Review Panels

Each panel is a self-contained subagent prompt kept in `references/` (progressive
disclosure — load only what you dispatch). For each panel: read the reference
file, paste the Views-only file manifest into its
`[PASTE FILE MANIFEST HERE — Views only]` placeholder, and dispatch the prompt
verbatim as the listed subagent type. Spawn both in parallel.

| Panel | Subagent type | Lens | Prompt |
|-------|---------------|------|--------|
| 1. Design | `code-reviewer` | First impressions, navigation, visual craft, motion, delight, simplicity, HIG, edge cases | `references/panel-design.md` |
| 2. Keynote | `code-reviewer` | Story clarity, demo-readiness, "one more thing", narrative, platform story, cringe test | `references/panel-keynote.md` |

Both panel prompts enforce the same contract:

- **Reading budget** — a strict MUST READ / SHOULD READ / SKIP order; stop after
  ~15-20 files and write the review (an incomplete structured review beats a
  complete file read with no output).
- **Mechanical audits** — grep checks the subagent runs rather than relying on
  training data (VoiceOver coverage, hardcoded colors/fonts, placeholder strings,
  developer-facing language, truncation risks).
- **Stable finding IDs** — Design `D-`, Keynote `K-` — preserved into the
  Phase 2 correlation.
- **Priority buckets** — P0 (fix before any demo or submission) through P3 (would
  round out the product).
- **Mandatory structured output** — each prompt ends by requiring the panel's
  output format before the response ends.

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
