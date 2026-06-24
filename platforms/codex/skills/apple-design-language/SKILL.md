---
name: apple-design-language
category: design
description: Apple-native design language for iOS, iPadOS, and macOS — the editorial layer above HIG plus the domains craft skills miss: UX writing, interaction/form/loading states, and empty/error states. Use when writing or reviewing user-facing copy, button/error/alert text, designing forms or input validation, loading/empty/error/permission-denied states, deciding when to follow or tastefully break HIG, or judging whether a screen feels Apple-quality versus templated AI slop. Routes to swiftui-micro-craft for quantified spacing/typography/motion and apple-design for tokens and Liquid Glass.
---

# Apple Design Language

The editorial layer for Apple apps on iOS, iPadOS, and macOS: the parts of "feels Apple-quality" that aren't a spacing number — copy, interaction states, empty/error states, and the judgment of when to follow versus tastefully break the Human Interface Guidelines. Think in capabilities (touch vs. pointer, compact vs. regular vs. window), not device names.

This skill is the **entry point** to the design language. It owns four things and routes everything else.

## Orientation index

| Concern | Where it lives |
|---|---|
| Spacing, optical alignment, padding, corner concentricity, hairlines, depth | `swiftui-micro-craft` |
| Motion timing, named springs, gestures, haptics | `swiftui-micro-craft` |
| Type scale mechanics, SF Symbol sizing/weight, Dynamic Type plumbing | `swiftui-micro-craft` |
| Color, design tokens, Liquid Glass, system materials | `apple-design` |
| VoiceOver, Dynamic Type coverage, tap-target sizing | `ios-accessibility` |
| Adaptive layout, size classes, multi-platform navigation | `cross-platform-adaptivity` |
| **UX writing & copy** | this skill → `references/ux-writing.md` |
| **Forms, validation, focus, loading, control states** | this skill → `references/interaction-states.md` |
| **Empty & error states** | this skill → `references/empty-error-states.md` |
| **When to follow vs. break HIG; quality-vs-slop judgment** | this skill (below) |
| Worked examples of tasteful HIG deviation | this skill → `references/exemplars.md` |

## HIG is the floor, not the ceiling

The Human Interface Guidelines encode what is **safe and approvable**. Meet that floor everywhere. But Apple's own best apps — and most Apple Design Award winners — exceed or selectively break the defaults where it serves the user. "HIG-compliant" and "great" are not the same target. Your job: clear the floor without exception, then raise the ceiling deliberately.

### Deviation decision gates

Deviate from a HIG default only when **all four** hold:

1. **Named benefit** — you can state the user benefit in one sentence that isn't "looks better," "feels modern," or "cleaner."
2. **Survives the slop check** — it is not one of the numbered tells below (and will pass `swiftui-design-check` once that exists).
3. **Survives assistive tech** — still correct under VoiceOver and Dynamic Type at AX5 (see `ios-accessibility`).
4. **Systematic** — applied as a rule across the app, not a one-off that creates an inconsistency.

If any gate fails, use the HIG default. Deviation is earned, not assumed.

## Anti-slop tells (numbered — the contract with `swiftui-design-check`)

These are the Apple-native equivalents of web "AI slop." Each is numbered so the `swiftui-design-check` linter (sub-project #2) can map a scanner rule to it. **Statically detectable** ones are marked ⚙.

1. ⚙ **System-gray everything** — flat `.gray`/`Color(.systemGray)` fills where a system material or hierarchical foreground style belongs.
2. **Sheet-for-everything** — a modal `.sheet` where a push, popover, menu, or inline disclosure fits the navigation depth better.
3. ⚙ **Unlabeled icon-only buttons** — an icon `Button`/`Label(systemImage:)` with no `accessibilityLabel` and no visible text.
4. ⚙ **Untouched `.automatic` styling** — default button/list/navigation styling shipped with no deliberate choice behind it.
5. ⚙ **Center-everything layout** — no leading-edge alignment hierarchy; titles, body, and controls all centered.
6. ⚙ **Hardcoded font sizes** — `.font(.system(size: 17))` instead of a semantic text style.
7. ⚙ **Twin full-width CTAs** — primary and secondary actions given equal visual weight, destroying hierarchy.
8. ⚙ **Emoji as iconography** — emoji where an SF Symbol is the native choice.
9. ⚙ **Placeholder-as-label** — relying on `TextField` placeholder text instead of a persistent field label.
10. **Spinner-for-everything** — indeterminate spinners where a skeleton or determinate progress fits, with no empty/error variant designed.
11. **Overlay for the critical** — a non-modal banner or overlay where an `.alert` is required (data loss, destructive confirmation).
12. ⚙ **Gradient-and-glow slop** — decorative purple-ish gradients, drop-glows, or faux depth not derived from system materials.
13. **Generic empty state** — "No items" with no cause and no next action (see `references/empty-error-states.md`).
14. ⚙ **Title Case body copy** — title-casing sentences, labels, or descriptions that should be sentence case (see `references/ux-writing.md`).

## Quick reference

### Capitalization

| Use | Case |
|---|---|
| Nav-bar titles, buttons, menu items, alert titles | Title Case |
| Labels, body text, alert messages, hints, footnotes, placeholders | Sentence case |

### Button verbs (pick the precise word)

| Word | Use for |
|---|---|
| Done | Dismiss, keeping changes already applied |
| Save | Commit changes that aren't applied yet |
| Cancel | Dismiss, discarding changes |
| OK | Acknowledge an alert with no alternative — prefer a specific verb when one fits |
| Delete / Remove | Destructive — pair with confirmation; never "OK" |

### Empty/error: which surface

Data loss or destructive confirmation → `.alert`. Recoverable, non-blocking → inline state or banner. No data yet → designed empty state with cause + action. Full tree in `references/empty-error-states.md`.

## Relationship to other skills

This skill is the design-language hub. It complements `swiftui-micro-craft` (quantified visual craft), `apple-design` (tokens, color, Liquid Glass), `ios-accessibility` (assistive tech), and `cross-platform-adaptivity` (layout). It is consumed by `apple-review` and `apple-polish` (design panels) and `paywall-design` (copy). The numbered anti-slop tells above are the rule source for `swiftui-design-check`.
