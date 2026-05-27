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
