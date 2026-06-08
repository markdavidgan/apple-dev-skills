# `apple-design` vs `apple-design-language` — merge analysis

Date: 2026-06-08. Scope: the one design-cluster pair flagged as "closest overlap"
in `skill-consolidation-plan.md` (Phase 3). Question: should these two skills be
merged, or do they occupy genuinely distinct niches?

**Verdict: keep both separate.** They are complementary layers, not duplicates.
The overlap is small and already governed by an explicit routing contract. Merging
would produce one oversized skill and blur a boundary the author drew on purpose.
Two small boundary fixes are recommended instead.

---

## What each skill actually is

| | `apple-design` | `apple-design-language` |
|---|---|---|
| Layer | **Implementation** — code-level design system | **Editorial / judgment** — the layer above HIG |
| Owns | Theme.swift tokens, Liquid Glass code (`glassEffect`, nested-glass contrast rules), SwiftUI ViewModifiers/containers, preview templates, localization plumbing, accessibility code, ADHD-UX patterns | UX writing & copy, interaction/form/loading states, empty/error states, when to follow vs. tastefully break HIG, the numbered anti-slop tells |
| Output | Swift code you paste in | Decisions, copy, and a quality bar you judge against |
| Trigger words | "design system", "theme", "design tokens", "Liquid Glass", "glassEffect", "SwiftUI styling" | "user-facing copy", "button/error/alert text", "forms", "empty/error/loading state", "feels Apple-quality vs AI slop", "break HIG" |
| Size | ~2,000 words | ~930 words + `references/` |
| Role | Leaf skill (terminal patterns) | **Hub** — explicit "entry point" that routes to other skills |

## The overlap is thin and already contracted

`apple-design-language` opens with an **orientation index** that explicitly cedes
territory to its neighbours:

> Color, design tokens, Liquid Glass, system materials → `apple-design`
> Spacing, motion, type mechanics → `swiftui-micro-craft`
> VoiceOver, Dynamic Type, tap-targets → `ios-accessibility`

So the two skills' descriptions don't actually compete for the same job: anything
about **tokens/color/Liquid Glass** routes *to* `apple-design`, and `apple-design`
holds none of the copy/state/HIG-judgment material. The shared surface is only:

1. Both legitimately match the bare word **"design"** in a vague prompt. This is a
   *router* problem (which skill loads first), not a *content* duplication problem.
2. **Accessibility** appears in both — but `apple-design` carries actual a11y *code*
   while `apple-design-language` routes a11y to `ios-accessibility`. That's the one
   genuine content seam (see fix #2).

## Why not merge

- **Size.** A merged skill is ~3,000 words, over the ~5k soft cap once
  `references/` is folded in, and mixes "paste this Swift" with "judge this copy" —
  two different reading modes in one file.
- **Breaks the hub.** `apple-design-language` is consumed *by name* as a routing hub
  by `apple-review`, `apple-polish`, and `paywall-design`, and is the rule source for
  the planned `swiftui-design-check` linter (the numbered anti-slop tells). Merging
  dissolves that contract and forces edits across every consumer.
- **Different cadence.** Token/Liquid-Glass code churns with each iOS SDK;
  editorial/HIG judgment is far more stable. Keeping them apart lets each version
  independently.

## Recommended boundary fixes (instead of a merge)

1. **Tighten `apple-design`'s description so it stops matching pure-copy/UX prompts.**
   Make it explicitly code/tokens-scoped and add a one-line "for copy, states, and
   HIG judgment, see `apple-design-language`" pointer in the body. This resolves the
   "both match 'design'" router ambiguity without moving any content.
2. **Resolve the accessibility seam.** `apple-design` currently holds an
   Accessibility *code* section while `apple-design-language` routes a11y to
   `ios-accessibility`. Decide one home: either keep a11y code in `apple-design` and
   have it cross-reference `ios-accessibility`, or move it into `ios-accessibility`
   and leave `apple-design` a pointer. Today a reader can land in either.
3. **Add a reciprocal pointer.** `apple-design-language` already routes *to*
   `apple-design`; add the reverse link in `apple-design`'s "See Also" so the two
   are navigable in both directions.

## If you still want consolidation

The cluster-wide lever isn't merging these two — it's making `apple-design-language`
the **single design entry point** and demoting the leaves (`apple-design`,
`swiftui-micro-craft`) to "loaded on demand via the orientation index." That keeps
content separated but gives you one front door. Lower effort, same discoverability
win, none of the size/coupling cost of a literal merge.
