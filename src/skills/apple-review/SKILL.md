---
name: apple-review
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
