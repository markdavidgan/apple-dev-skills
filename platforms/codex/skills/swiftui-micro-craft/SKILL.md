---
name: swiftui-micro-craft
category: design
description: Quantified rules and a mechanical auditor for Apple-grade SwiftUI micro-craft — the spacing, alignment, optical centering, padding, corner-radius concentricity, SF Symbol pairing, depth, hairlines, Dynamic Type, motion, gestures, and haptics details that separate shipped Apple quality from AI-slop UI. Use when writing or reviewing any SwiftUI view, when spacing or padding or alignment feels off, when about to hardcode a size or duration, or before committing UI code.
invoke: "/swiftui-micro-craft — Audit a SwiftUI view against quantified Apple-grade micro-craft rules"
---

# SwiftUI Micro-Craft

> **Core principle:** Apple-grade polish is not taste — it is a finite set of *quantified, checkable* rules. "It looks a bit off" almost always decomposes into a measurable violation: a value off the grid, an optically-uncentered glyph, a child radius that doesn't nest its parent, a hardcoded duration, a tap target under 44pt. This skill names every rule, scores against it 0–4, and ships a grep auditor so the violation is caught mechanically — not left to a reviewer's eye.

This is the **objective ruler**. It complements three sibling skills:

| Skill | Role | Relationship |
|-------|------|--------------|
| `apple-design` | House style + Liquid Glass + token architecture | This skill *enforces* what that one *describes* |
| `apple-polish` | Subjective Ive/Jobs craftsmanship review | This skill is the ruler those panels cite by § |
| `design-contract` | Mockup → machine-readable contract + capture gates | This skill is the rule layer when there is **no** mockup |

## When to Use

- Writing **any** new SwiftUI view, modifier, or component.
- Reviewing UI in a PR or before a commit that touches `.swift` view code.
- Something "looks off" and you can't name why (spacing, weight, alignment, depth).
- You're about to type a **literal number** into `.padding()`, `.frame()`, `.cornerRadius()`, `.font(.system(size:))`, an animation `duration`, or a hardcoded color.
- Wiring a gesture or adding haptic feedback.

**When NOT to use:** pure engineering bugs (use `apple-cleanup`), accessibility audits beyond Dynamic Type (use `ios-accessibility`), or producing a contract from an existing mockup (use `design-contract`).

## The Iron Rule

**Every literal that controls layout, type, color, motion, or depth must trace to a named token or a stated optical exception.** A raw `16`, `0.3`, `Color.black.opacity(0.2)`, or `.system(size: 20)` in a view body is a defect until proven otherwise. "Proven otherwise" means: it is a documented optical correction (§2) with a one-line comment saying so.

```swift
// ❌ AI slop — five untraceable literals, off-grid, no concentricity, hardcoded motion
VStack(spacing: 10) {
    Text(title).font(.system(size: 17, weight: .semibold))
    Label("Go", systemImage: "arrow.right").padding(13)
}
.padding(15)
.background(.white.opacity(0.08), in: RoundedRectangle(cornerRadius: 14))
.shadow(radius: 8)
.animation(.easeInOut(duration: 0.3), value: isOpen)

// ✅ Apple-grade — every value tokenized, radius nests, motion named, baseline-aligned
VStack(spacing: Spacing.sm) {                         // 8 — on grid
    Text(title).font(.headline)                        // semantic type, scales with Dynamic Type
    Label("Go", systemImage: "arrow.right")
        .labelStyle(.titleAndIcon)
        .padding(.horizontal, Spacing.md)              // 12
        .padding(.vertical, Spacing.sm)                // 8
}
.padding(Spacing.md)                                   // 12 outer
.background(.regularMaterial, in: RoundedRectangle(cornerRadius: Radius.lg)) // 16 outer
// inner radius rule: child = 16 − 12 = 4  (see §5)
.shadow(color: .black.opacity(0.18), radius: 12, y: 4) // depth ladder §8
.animation(.smooth, value: isOpen)                     // named spring §14
```

## The 0–4 Scoring Rubric

Score each view; **anything below 3 ships a defect.** Full rubric and per-rule scoring in [references/auditor.md](references/auditor.md).

| Score | Meaning |
|-------|---------|
| **4 — Apple-grade** | Every value tokenized; optical corrections applied & commented; radii nest; motion named; targets ≥44pt; scales to AX5; no hairline/separator-inset miss. |
| **3 — Shippable** | Tokenized and on-grid; minor optical misses (e.g. icon not optically centered) but nothing geometrically wrong. |
| **2 — Rough** | Mostly on-grid but ≥1 hardcoded literal, OR a radius that doesn't nest, OR a sub-44pt target. |
| **1 — Slop** | Multiple raw literals, off-grid spacing, hardcoded motion, no Dynamic Type. |
| **0 — Broken** | Geometric errors visible at a glance: misaligned baselines, clipped content, overlapping glass. |

## Quick Reference — the 17 domains

Deep treatment of each in **[references/micro-craft-bible.md](references/micro-craft-bible.md)**. The one-line rule per domain:

| § | Domain | The one rule |
|---|--------|-------------|
| 1 | **Spacing grid** | Every gap is a multiple of 4 (ideally 8); use a `Spacing` token, never a literal. |
| 2 | **Optical vs geometric** | Center by *eye*, not by *frame*: triangles/play glyphs/trailing-heavy shapes need a nudge. |
| 3 | **Baseline alignment** | Text beside text or beside an icon aligns on `.firstTextBaseline`, not `.center`. |
| 4 | **SF Symbols** | Symbol weight tracks adjacent text weight; size via `.imageScale`/`.font`, color via `.symbolRenderingMode`. |
| 5 | **Corner concentricity** | Inner radius = outer radius − padding. Nested rounded shapes must be concentric. |
| 6 | **Padding** | Directional and asymmetric on purpose; optical text padding > geometric; never one global number. |
| 7 | **Hit targets** | ≥44×44pt (iOS) tappable area; expand with `.contentShape`, never by bloating visuals. |
| 8 | **Depth ladder** | Shadows come from a fixed elevation scale (rest/raised/overlay); y-offset > blur-only. |
| 9 | **Color discipline** | Semantic tokens only; opacity from a ladder; respect Dark Mode & `.tint`. |
| 10 | **Typography** | Semantic styles; mono digits for counters; set `lineSpacing`/tracking; define truncation. |
| 11 | **Hairlines & separators** | 1px = `1/displayScale`; separators inset to content, not edge-to-edge. |
| 12 | **Dynamic Type** | Type scales automatically; scale *metrics* (padding, icon size) with `@ScaledMetric`; test AX5. |
| 13 | **Safe area** | Backgrounds bleed with `.ignoresSafeArea`; content respects insets; know when to do which. |
| 14 | **Motion** | Named springs (`.smooth`/`.snappy`/`.bouncy`) over magic durations; animate `value:`, not blanket. |
| 15 | **Gestures** | `.contentShape` first; declare priority/simultaneity; thresholds & cancellation are explicit. |
| 16 | **Haptics** | `.sensoryFeedback` (iOS 17+) tied to a state change; `NSHapticFeedbackManager` on macOS; never gratuitous. |
| 17 | **Liquid Glass** | `.containerConcentric` corners; never nest `glassEffect`; ≤8% white tint; interactive glass needs feedback. |

## Workflow

1. **Before writing:** open the bible §s for what you're building (a list row → §1,3,5,6,11; a button → §2,4,7,8,16).
2. **While writing:** every literal gets a token or an optical-exception comment. No exceptions (see Iron Rule).
3. **Before committing:** run the auditor (`references/auditor.md`) over changed views. Score each. Fix anything below 3.
4. **In review:** cite findings by § and score, e.g. *"§5 radius doesn't nest (inner 16 inside 16-padded 16 → should be 0/sharp or reduce padding); §7 close button is 30pt. Score 2."*

## Common Mistakes

| Mistake | Fix | § |
|---------|-----|---|
| One `.padding(16)` everywhere | Directional padding; optical correction for text | 6 |
| `.cornerRadius(12)` inside a 12-padded 16-radius card | `inner = 16 − 12 = 4`, or use `.containerConcentric` | 5 |
| Icon `.center`-aligned with its label | `HStack(alignment: .firstTextBaseline)` + symbol baseline | 3,4 |
| `Image(systemName:)` at default weight beside bold text | `.fontWeight(.semibold)` on the symbol to match | 4 |
| 24pt icon button | `.frame(minWidth: 44, minHeight: 44)` + `.contentShape` | 7 |
| `.animation(.easeInOut(duration: 0.3))` | `.animation(.smooth, value: state)` | 14 |
| `.shadow(radius: 8)` ad hoc | Pull from the elevation ladder with a y-offset | 8 |
| No `@ScaledMetric` on a fixed icon frame | Scale the metric so it grows with text | 12 |
| Haptic fired every frame / on appear | Tie `.sensoryFeedback` to a discrete state transition | 16 |

## See Also

- `apple-design` — token architecture (primitive→semantic→component), Liquid Glass house rules, accessibility checklist.
- `apple-polish` — Ive/Jobs craftsmanship panels (cite this skill's §/score as evidence).
- `design-contract` — when a mockup exists, bind values to it instead of to generic tokens.
- `ios-accessibility` — full VoiceOver/Dynamic Type audit beyond §12.

**References:**
- [sensoryFeedback(_:trigger:) — Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/view/sensoryfeedback(_:trigger:))
- [SensoryFeedback — Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/sensoryfeedback)
- [ScaledMetric — Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/scaledmetric)
- [Human Interface Guidelines: Layout (44pt targets)](https://developer.apple.com/design/human-interface-guidelines/layout)
- iOS 26 API Bible (this repo): `.glassEffect(.regular, in: .rect(cornerRadius: .containerConcentric))`, named springs `.bouncy`/`.smooth`/`.snappy`.
