# Design Spec — `apple-design-language` skill

**Date:** 2026-06-04
**Status:** Approved (design); pending implementation plan
**Author:** Mark David Gan (with Claude)

---

## Context

This repo (`apple-dev-skills`) has strong **iOS visual-craft** coverage (`swiftui-micro-craft`, `apple-design`, `ios-accessibility`, `app-brand-identity`) but gaps when compared to web-design references (`pbakaus/impeccable`, `alchaincyf/huashu-design`):

- **UX writing** has no home (only an `apple-polish` "Narrative" squad gesture).
- **Interaction/forms/loading states** are not taught as a domain.
- **Empty/error states** are scattered, treated as implementation details rather than design problems.
- There is no **editorial "taste" layer** — guidance on when to follow vs. tastefully break HIG.

`impeccable` is **not** vendored in this repo (verified — the only string matches are the English word "impeccable" used as prose). We are **not** vendoring it: it is web-first (DOM/CSS/container-queries), carries a foreign license, and its rules ("don't use Inter, no bounce easing") don't translate 1:1 to SF Pro / Dynamic Type / Liquid Glass. Instead we port its *structure* (domain reference files + numbered anti-slop rules + a coherent design vocabulary) and refill every domain with Apple-native substance.

### Place in the larger suite

This is **sub-project #1 of 6** agreed in brainstorming. The full suite:

| # | Skill | New/extend | Depends on |
|---|-------|-----------|------------|
| **1** | **`apple-design-language`** (this spec) | New (umbrella + references) | — |
| 2 | `swiftui-design-check` — deterministic slop linter | New (skill + script) | #1 (enforces its numbered rules) |
| 3 | `watchos-design` | New | #1 |
| 4 | `ipad-adaptivity` — Stage Manager, multi-window, Slide Over, pointer/keyboard | Extend `cross-platform-adaptivity` | #1 |
| 5 | `apple-design-studio` — generative mockups + multi-dimensional critique | New | #1, #2 |
| 6 | `category:` frontmatter field + grouped docs | Repo-wide metadata change | — |

**Decision on plugin grouping:** keep a **single plugin**. Skills are lazily loaded by description (no context cost to keeping them together); the repo is single-domain ("Apple dev") with cross-category orchestrators (`apple-review`, `complete-feature`); and 4 of 6 build targets have no plugin concept. Organizational grouping is achieved via an optional `category:` field (sub-project #6), not physical plugin separation.

---

## Goal

A single skill that makes the repo's five design skills read as **one coherent Apple design language**, while owning the three genuinely missing domains and the editorial taste layer — for **iOS, iPadOS, and macOS** treated as a capability-based family (touch vs. pointer, compact vs. regular vs. window), not device names. watchOS and visionOS are explicitly deferred to their own skills.

---

## Scope

### Owns directly
- **Orientation index** — the design-language map that routes every concern to its home skill.
- **Editorial taste layer** — HIG-as-floor stance, explicit deviation decision rules, and Apple-native "quality vs. templated slop" tells (numbered for the #2 linter).
- **UX writing** — voice/tone, copy for buttons/labels/errors/alerts/notifications/permissions.
- **Interaction / forms / loading states** — form design, validation timing, focus order, loading patterns, control-state discipline.
- **Empty / error states** — full taxonomy as a decision tree.

### Delegates (cross-reference, never restate)
- Spacing / optical alignment / motion / haptics → `swiftui-micro-craft`
- Design tokens / color / Liquid Glass → `apple-design`
- VoiceOver / Dynamic Type / tap targets → `ios-accessibility`

### Out of scope
- watchOS design (sub-project #3), iPad layout mechanics (#4), generative/critique (#5), the slop linter tool itself (#2), quantified visual-craft rules (already in `swiftui-micro-craft`).

---

## Architecture (Approach B — hub + references)

Chosen over a single tight `SKILL.md` (undersells four domains, hits the ~5,000-word cap immediately) and over splitting into sibling skills (contradicts the "one coherent language via thin index" decision; fragments the umbrella).

```
src/skills/apple-design-language/
├── SKILL.md                          # hub: index + taste layer + quick-ref tables (~1,500–2,000 words)
└── references/
    ├── ux-writing.md                 # voice, button/label/error copy, capitalization, tone, macOS deltas
    ├── interaction-states.md         # forms, validation, focus, loading/skeleton, disabled, destructive, 5-state discipline
    ├── empty-error-states.md         # first-run/no-data/no-results/offline/permission-denied/failure decision tree
    └── exemplars.md                  # quarantined named-app catalog (the dateable part)
```

Depth is 1 (satisfies the Antigravity/Codex/Agy flatten constraint). Mirrors the proven `swiftui-micro-craft/references/auditor.md` pattern.

### Component responsibilities

**`SKILL.md` (hub)** — three parts:
1. **Orientation index** — a table routing each concern to its home skill (spacing→micro-craft, tokens/color/glass→apple-design, a11y→ios-accessibility, copy/interaction/empty-error/taste→here). This is what makes five skills read as one language.
2. **Taste layer (the soul)** — HIG-as-floor stance; deviation decision rules as explicit gates: *deviate only when (a) you can name the user benefit, (b) it survives the slop check, (c) it still passes VoiceOver + Dynamic Type*; plus native "quality vs. slop" tells (system-gray-everything, sheet-for-everything, unlabeled icon buttons, untouched `.automatic` styling). **Anti-slop tells are a numbered list** — the contract with sub-project #2.
3. **Quick-reference tables** — capitalization rules, button-verb cheatsheet, empty/error decision tree at a glance.

**`references/ux-writing.md`** — voice/tone; title vs. sentence case and where each applies (iOS vs. macOS); button verbs ("Done" vs. "Save" vs. "OK"); error structure (what happened + why + how to fix, no codes/jargon); destructive-action wording; notification/permission-prompt copy; macOS menu-item/sentence-case deltas.

**`references/interaction-states.md`** — form design (grouping, validation timing inline vs. on-submit, required-field signaling); focus order (touch vs. keyboard vs. pointer); loading patterns (spinner vs. skeleton vs. progressive, when each); disabled vs. hidden; destructive confirmation; the five-states discipline (default/hover/pressed/focused/disabled — hover/focus being the macOS+iPad pointer deltas).

**`references/empty-error-states.md`** — decision tree across first-run vs. no-data vs. no-search-results vs. offline vs. permission-denied vs. operation-failed; each with what to show, what to say, what action to offer.

**`references/exemplars.md`** — named-app catalog; each entry = *app → HIG rule it breaks → why it works → transferable principle*. Carries a "verify before citing" note (apps evolve). Quarantined so drift never touches the core.

---

## Frontmatter

```yaml
---
name: apple-design-language
category: design
description: Apple-native design language for iOS, iPadOS, and macOS — the editorial
  layer above HIG plus the domains craft skills miss: UX writing, interaction/form/loading
  states, and empty/error states. Use when writing or reviewing user-facing copy,
  button/error/alert text, designing forms or input validation, loading/empty/error/
  permission-denied states, deciding when to follow or tastefully break HIG, or judging
  whether a screen feels Apple-quality versus templated AI slop. Routes to
  swiftui-micro-craft for quantified spacing/typography/motion and apple-design for
  tokens and Liquid Glass.
---
```

- Front-loads concrete trigger phrases for auto-triggering.
- No angle brackets; ~640 chars (under the 1024 cap).
- `category: design` per sub-project #6 — safe to include now (validate.js ignores unknown keys; see OQ-1).
- No `invoke:` line — this is a reference skill, not a command-backed one.

---

## Integration

**Outbound:** index links to `swiftui-micro-craft`, `apple-design`, `ios-accessibility`.

**Inbound (makes it get *used*, not just exist):** add a one-line reference to `apple-design-language` in the design panels of `apple-review` and `apple-polish`, and in `paywall-design` (copy). Without this, the orchestrators keep reviewing visual craft but never check UX writing / empty-error / interaction states.

**Hand-off to #2 (linter):** the taste layer's anti-slop tells are written as a numbered rule list so #2 can map each detectable rule to a scanner check by number. This is the #1↔#2 contract.

---

## Repo touchpoints (per CLAUDE.md)

- Edit only `src/`; then `node scripts/build.js` regenerates all 6 platforms (Kimi concatenates into the master `SKILL.md`; references flow through). Commit `src/` + `platforms/` together.
- `node scripts/validate.js` must pass (frontmatter valid, name = dir, kebab-case, no angle brackets, ≤5,000 words).
- Skill count 41 → 42 (count automation + README counts).
- Light edits to `apple-review`, `apple-polish`, `paywall-design` SKILL.md (inbound references).

---

## Success criteria

1. `validate.js` + `build.js` pass; word cap respected via the references split.
2. Zero duplication — every delegated topic is a link, never a restatement.
3. `apple-review` / `apple-polish` / `paywall-design` reference the skill.
4. Anti-slop rules are numbered (ready for #2 to mechanize).
5. Description auto-triggers on copy/forms/empty-error/HIG-deviation phrasing (verifiable later with `skill-creator` evals).

---

## Open questions

- **OQ-1 (sequencing) — RESOLVED.** Verified `scripts/validate.js` only enforces `name` + `description` presence, kebab-case, name=dir, and no angle brackets; it does **not** reject unknown frontmatter keys. So `category: design` is safe to include now without waiting on sub-project #6. #6 will later formalize/validate the field and group docs by it. No blocker.

---

## Non-goals / YAGNI

- No slash command (reference skill).
- No new agent.
- No restating of spacing/typography/color/motion content that already lives in `swiftui-micro-craft` / `apple-design`.
- No watchOS, visionOS, iPad-layout, or generative content (separate sub-projects).
