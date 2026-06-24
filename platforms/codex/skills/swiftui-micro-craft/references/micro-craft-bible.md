# The SwiftUI Micro-Craft Bible

> The complete, quantified treatment of every micro-craft domain. SKILL.md is the index and the scoring entrypoint; this is the reference. Each § gives the **rule**, the **why**, **Do/Don't**, and the **API** (verified against Apple docs / the iOS 26 API Bible — see References at the bottom of SKILL.md).

A note on tokens: this file references generic token names (`Spacing.md`, `Radius.lg`, `Motion.standard`). In a specific app, bind them to that app's real token enum. The *rules* are universal; the *values* are per-app.

---

## §1 — The spacing grid

**Rule:** Every gap, inset, and offset is a multiple of **4**, and you reach for **8** first. Express it through a `Spacing` token, never a bare literal.

**Why:** A 4pt base grid is the lattice the entire system aligns to. Off-grid values (10, 13, 15, 18) read as "almost right," which the eye registers as cheapness even when it can't name it. The grid is also how independent components line up *with each other* without coordination.

Canonical ladder (adapt names to your app):

| Token | pt | Use |
|-------|----|----|
| `xxs` | 4 | Icon-to-label, tight chip internals |
| `xs` | 8 | Default intra-component gap |
| `sm` | 12 | Related elements |
| `md` | 16 | Standard content padding, card insets |
| `lg` | 24 | Section separation |
| `xl` | 32 | Major blocks |
| `xxl` | 48 | Screen-level breathing room |

**Don't:** `VStack(spacing: 10)`, `.padding(15)`, `.padding(.top, 18)`.
**Do:** `VStack(spacing: Spacing.xs)`, `.padding(Spacing.md)`.

**Subtlety:** `VStack`/`HStack` default spacing is system-chosen (~8–10 depending on content) and is *fine* when you genuinely want the system default — but make it a decision, not an accident. If you set spacing, tokenize it.

---

## §2 — Optical vs geometric alignment

**Rule:** Center things by how they *look*, not by their bounding box. Shapes with visual weight off their geometric center need a deliberate nudge.

**Why:** The human eye centers on a shape's *visual mass*, not its frame. A play triangle, a chevron, a paper-plane "send" glyph, or any trailing-heavy form looks off-center when frame-centered.

The classic cases:

| Element | Problem | Correction |
|---------|---------|-----------|
| Play ▶ icon in a circle | Triangle's mass sits left of frame center | Nudge **right** ~1–2pt (`.offset(x: 1)` or `.padding(.leading, 2)`) |
| Chevron `>` row accessory | Optically light, sits too close to edge | Standard trailing inset, then trust the system |
| Up/down/send arrows | Directional mass | Offset *toward* the heavy side by 1–2pt |
| Glyph + text on one line | Cap-height vs x-height mismatch | Baseline-align (§3), don't center |

**Do:** comment every optical correction so it survives refactors:
```swift
Image(systemName: "play.fill")
    .offset(x: 1)   // optical: triangle mass sits left of center (§2)
```

**Don't:** apply a magic offset with no comment — the next agent will "clean it up" and reintroduce the imbalance.

This is the **one place** raw literals are allowed in a view body — and only with the `// optical:` comment. The auditor whitelists `.offset` lines carrying that comment.

---

## §3 — Baseline alignment

**Rule:** When text sits beside text (different sizes) or beside an icon, align on the **text baseline**, not vertical center.

**Why:** Two strings of different point sizes centered vertically have mismatched baselines — they look like they're floating at different heights. Baseline alignment is how typesetting has worked for 500 years.

```swift
// ❌ "24" and "min" float at different heights
HStack { Text("24").font(.largeTitle); Text("min").font(.body) }

// ✅ they sit on the same line
HStack(alignment: .firstTextBaseline) {
    Text("24").font(.largeTitle)
    Text("min").font(.body).foregroundStyle(.secondary)
}
```

- Use `.firstTextBaseline` for top-aligned multi-line; `.lastTextBaseline` when bottoms should match.
- For an SF Symbol that should sit on the text baseline, prefer `Label` or put the symbol *inside* the `Text` via interpolation (`Text("\(Image(systemName: "bolt.fill")) Charged")`) so it inherits the baseline and font metrics automatically.
- Numeric readouts (a timer's "24" + "min", a price's "$" + "9" + ".99") almost always want baseline alignment.

---

## §4 — SF Symbols

**Rule:** A symbol's **weight matches the adjacent text's weight**, its **size** is set with `.imageScale` or `.font`, and its **color treatment** is chosen with `.symbolRenderingMode`. Never leave all three to default beside styled text.

**Why:** SF Symbols are designed as a *typeface*. A default-weight symbol next to semibold text looks anemic; an oversized symbol breaks the line's rhythm. The symbol should feel like it was set in the same font.

| Concern | API | Note |
|---------|-----|------|
| Weight | `.fontWeight(.semibold)` or inherit via `.font(.headline)` | Match the neighbor text weight |
| Size | `.imageScale(.small/.medium/.large)` or `.font(.system(size:))` | `.imageScale` scales *relative* to surrounding text — preferred |
| Color | `.symbolRenderingMode(.hierarchical / .palette / .multicolor / .monochrome)` | `.hierarchical` gives free depth from one color |
| Variant | `.symbolVariant(.fill / .circle / .slash)` | Don't hardcode `"x.circle.fill"` if context implies it |

```swift
// ✅ symbol set like type: inherits headline weight & size, hierarchical depth
Label("Focus", systemImage: "scope")
    .font(.headline)
    .symbolRenderingMode(.hierarchical)
    .foregroundStyle(.tint)
```

**Do:** prefer `.imageScale` so the symbol scales with Dynamic Type and the surrounding font.
**Don't:** `Image(systemName: "scope").font(.system(size: 11))` beside 10pt caps text — the 1pt mismatch is visible and won't scale.

For animation, SF Symbols support `.symbolEffect(.bounce / .pulse / .variableColor, value:)` (iOS 17+) — tie to a state change, not `.onAppear` loops (§14, §16).

---

## §5 — Corner-radius concentricity

**Rule:** A rounded shape nested inside another rounded shape must be **concentric**: `innerRadius = outerRadius − padding`. Two independent radii inside each other are the single most common "looks cheap" tell.

**Why:** When a card has radius R and contains a button with its own radius, the gap between their arcs must be constant all the way around the corner. That only happens when `inner = outer − inset`. If both are 16 with 12pt padding between them, the inner arc is *tighter* than the gap — the corners visibly "pinch."

```swift
// Card: radius 16, padding 12 → inner content radius must be 16 − 12 = 4
RoundedRectangle(cornerRadius: 16)
    .padding(12)
    // any rounded child here uses cornerRadius 4

// iOS 26: let the system do it automatically
.glassEffect(.regular, in: .rect(cornerRadius: .containerConcentric))
// or
RoundedRectangle(cornerRadius: .containerConcentric)
```

- **Portable rule (all OS versions):** compute `outer − padding` by hand, store as tokens (`Radius.card`, `Radius.cardInner`).
- **iOS 26:** `.containerConcentric` resolves the inner radius from the container automatically — prefer it inside containers that propagate a concentric shape.
- If `outer − padding ≤ 0`, the inner shape should be **square** (radius 0), not a tiny positive radius.
- A `Capsule` inside a `RoundedRectangle` is fine — capsules are radius-by-height, exempt from the formula, but still center them within the parent's safe corner.

---

## §6 — Padding

**Rule:** Padding is **directional and asymmetric on purpose**. A single global `.padding(n)` is a smell unless the content is genuinely symmetric. Text needs *optical* padding that differs from geometric.

**Why:** Real layouts have hierarchy: more space above a heading than below it; more leading inset than trailing for a chevron row; tighter top than bottom on a button because cap-height leaves optical space. One number can't express that.

| Situation | Padding shape |
|-----------|---------------|
| Button label | `.padding(.horizontal, md)` `.padding(.vertical, sm)` — wider than tall |
| Text block | slightly less top than bottom (cap height eats top space) |
| List row with trailing chevron | full leading inset, reduced trailing |
| Icon-only button | symmetric, but expand hit area via `.contentShape` (§7) not padding |

```swift
// ❌ one number, ignores that text has optical top-space from cap height
Text(title).padding(16)

// ✅ directional
Text(title)
    .padding(.horizontal, Spacing.md)
    .padding(.top, Spacing.sm)
    .padding(.bottom, Spacing.md)
```

**Order matters:** `.padding().background()` paints behind the padding; `.background().padding()` paints only the content then spaces it. Decide which you mean.

---

## §7 — Hit targets

**Rule:** Every interactive element has a **≥44×44pt** tappable area (Apple HIG minimum). When the *visual* is smaller, expand the *hittable* area with `.contentShape` + a min frame — never by inflating the glyph.

**Why:** A 24pt close button is a frustrating target; misses feel like the app is broken. But you don't want a 44pt-wide *visible* X. The fix decouples visual size from touch size.

```swift
Button(action: dismiss) {
    Image(systemName: "xmark")
        .imageScale(.medium)
        .frame(width: 44, height: 44)   // hit area
        .contentShape(Rectangle())       // entire frame is tappable, incl. transparent
}
```

- `.contentShape(Rectangle())` makes the *whole* frame hittable, including transparent padding — without it, only the glyph's pixels respond.
- Rows: give the row `.contentShape(Rectangle())` so taps in the gaps register.
- **macOS:** pointer targets can be tighter than 44pt, but respect a comfortable click target (~28pt+) and add `.help()` tooltips and hover feedback (`.onHover`).

---

## §8 — Depth & the elevation ladder

**Rule:** Shadows come from a **fixed elevation scale**, not ad-hoc `radius:` values. Real depth uses a **y-offset** (light comes from above) plus low opacity — not a big symmetric blur.

**Why:** Inconsistent shadows make a UI feel like cut-and-paste. A 3-step ladder (rest / raised / overlay) keeps every elevated surface coherent. A symmetric `.shadow(radius: 8)` with no offset looks like a glow, not a shadow.

| Level | Use | Shape (tune per app) |
|-------|-----|----------------------|
| **Rest** | Cards on background | `color: .black.opacity(0.08), radius: 6, y: 2` |
| **Raised** | Buttons, active card | `opacity(0.16), radius: 12, y: 4` |
| **Overlay** | Sheets, popovers, menus | `opacity(0.24), radius: 24, y: 8` |

```swift
// ✅ ladder token, directional
.shadow(color: .black.opacity(0.16), radius: 12, y: 4)   // Elevation.raised
```

- Prefer **one** shadow per surface. Stacking shadows is almost always wrong.
- On Liquid Glass, let the glass material carry depth — don't add a heavy drop shadow on top (§17).
- Dark mode: shadows are weaker; lean on lighter backgrounds/borders for separation instead of darker shadows.

---

## §9 — Color & token discipline

**Rule:** Colors come from **semantic tokens**; opacity comes from a **defined ladder**; everything respects Dark Mode and the environment `.tint`.

**Why:** `Color.black.opacity(0.2)` scattered through views can't be themed, can't adapt to dark mode, and drifts (0.18 here, 0.22 there). Semantic naming (`Color.surfaceSecondary`, `Color.separator`) makes intent legible and change a one-line edit.

- **Never** literal RGB/hex in a view body. Define in an asset catalog or token enum with light/dark variants.
- Opacity ladder: pick a small set (e.g. `0.04 / 0.08 / 0.16 / 0.24`) and name them; don't freehand decimals.
- Use `.foregroundStyle` (not deprecated `.foregroundColor`) and `.tint` for accent propagation.
- Use system semantic colors (`.primary`, `.secondary`, `.tertiary`, `Color(.separator)`) where they fit — they're already dark-mode and accessibility correct.
- Respect `.background(.regularMaterial)` etc. for vibrancy instead of faking translucency with opacity.

---

## §10 — Typography

**Rule:** Use **semantic text styles** (`.headline`, `.body`, `.caption`); use **monospaced digits** for any changing number; set `lineSpacing`/tracking deliberately; define truncation behavior.

**Why:** Semantic styles scale with Dynamic Type for free (§12). Proportional digits make a running timer or counter "wobble" as glyph widths change — monospaced digits hold still. Default line spacing is often too tight for multi-line body copy.

```swift
// counters / timers — no horizontal jitter
Text(timeString).font(.system(.title, design: .rounded).monospacedDigit())
// or
Text(count, format: .number).monospacedDigit()

// multi-line body — give it air, control truncation
Text(longBody)
    .lineSpacing(2)
    .lineLimit(3)
    .truncationMode(.tail)
```

- Headlines/labels: tracking can tighten slightly at large sizes (`.tracking(-0.2)`) — optional, test it.
- Never `.font(.system(size: 17))` to mimic `.body` — you lose Dynamic Type and the value drifts from the real metric.
- All-caps labels: use `.textCase(.uppercase)` + tracking, not a hardcoded uppercased string.

---

## §11 — Hairlines & separators

**Rule:** A true hairline is **`1 / displayScale`** points, not `1`. Separators are **inset to content**, not edge-to-edge, unless they intentionally span (e.g. full-width section break).

**Why:** On a 3× screen, a 1pt line is 3 physical pixels — chunky. `1/displayScale` is a single device pixel — the crisp hairline Apple uses. And list separators that run to the screen edge look unfinished; system lists inset them to the text's leading edge.

```swift
@Environment(\.displayScale) private var displayScale

Rectangle()
    .fill(Color(.separator))
    .frame(height: 1 / displayScale)   // one physical pixel
    .padding(.leading, Spacing.md)     // inset to content, matches row text
```

- In `List`, use `.listRowSeparator(.hidden)` + `.alignmentGuide`/insets or `.listRowInsets` rather than fighting defaults.
- A `Divider()` is convenient but doesn't give you `1/displayScale` control or inset by default — wrap it or use the `Rectangle` form when precision matters.

---

## §12 — Dynamic Type

**Rule:** Text scales automatically via semantic styles. **Non-text metrics** (icon frames, custom paddings, fixed heights) must scale too — use `@ScaledMetric`. Test at **AX5** (largest accessibility size).

**Why:** A layout that's perfect at default size collapses at AX5 if the icon is a fixed 24pt while the text triples. `@ScaledMetric` ties a numeric value to the Dynamic Type setting so it grows proportionally. (Available iOS 14+; scales any `BinaryFloatingPoint`; `relativeTo:` defaults to `.body`.)

```swift
@ScaledMetric(relativeTo: .headline) private var iconSize: CGFloat = 24

Image(systemName: "bell")
    .frame(width: iconSize, height: iconSize)   // grows with the headline
```

- Don't `@ScaledMetric` *everything* — grid spacing usually stays fixed; scale things that pair with text (icon sizes, avatar diameters, min row heights).
- Avoid fixed `.frame(height:)` on text containers; let them grow. If you must cap, cap at a scaled value.
- Test: Settings → Accessibility → Larger Text → AX5, or `#Preview` with `.dynamicTypeSize(.accessibility5)`. A view that breaks at AX5 scores ≤2.

---

## §13 — Safe area & full-bleed

**Rule:** **Backgrounds bleed** edge-to-edge with `.ignoresSafeArea`; **content respects** safe-area insets. Know which layer you're on.

**Why:** A gradient or image background should run under the notch and home indicator (full-bleed) — but the readable content must stay inside the safe area or it gets clipped/obscured. Mixing these up gives you either letterboxed backgrounds or text under the Dynamic Island.

```swift
ZStack {
    BackgroundGradient().ignoresSafeArea()   // bleeds to physical edges
    ScrollView { content }                    // respects safe area automatically
}
```

- Scope it: `.ignoresSafeArea(.container, edges: .bottom)` is more honest than a blanket `.ignoresSafeArea()`.
- Use `.safeAreaInset(edge:)` to place a pinned toolbar/CTA that *pushes* content rather than overlapping it.
- Keyboard: `.ignoresSafeArea(.keyboard)` selectively when you don't want content to jump.

---

## §14 — Motion

**Rule:** Prefer **named springs** (`.smooth`, `.snappy`, `.bouncy`) over magic `duration:` numbers. Animate a specific `value:`, never wrap the world in `.animation()`. Tokenize any custom timing.

**Why:** Hardcoded `easeInOut(duration: 0.3)` scattered around gives every transition a slightly different feel. iOS 17+ named springs are tuned to feel native and self-document intent: `.snappy` for UI that should feel responsive, `.smooth` for content, `.bouncy` for playful affordances. Implicit `.animation(_, value:)` scopes the animation to the state that changed.

```swift
// ❌ magic number, unscoped (animates EVERYTHING that changes)
.animation(.easeInOut(duration: 0.3))

// ✅ named spring, scoped to the trigger
.animation(.snappy, value: isExpanded)

// custom spring → tokenize it, don't inline
extension Animation { static let panelReveal = Animation.spring(response: 0.4, dampingFraction: 0.8) }
.animation(.panelReveal, value: isOpen)
```

- `withAnimation(.smooth) { state.toggle() }` for explicit, event-driven changes.
- Respect Reduce Motion: `@Environment(\.accessibilityReduceMotion)` — swap springs for a cross-fade or none.
- Transitions: use `.transition(.move/.opacity/.scale)` with a matching animation; for shared-element morphs on glass use `matchedGeometryEffect`/`glassEffectID` (§17).
- Never drive continuous animation from `.onAppear` timers when a `value:`-bound animation will do.

---

## §15 — Gestures

**Rule:** Define the **hit shape first** (`.contentShape`), then declare **priority and simultaneity** explicitly, and make **thresholds and cancellation** intentional. Gestures should never silently steal touches from scrolling.

**Why:** The default gesture stack resolves conflicts in non-obvious ways. A `DragGesture` on a row inside a `ScrollView` can hijack the scroll unless you set thresholds or simultaneity. Being explicit is the difference between "feels native" and "feels fighty."

| Need | API |
|------|-----|
| Whole area responds | `.contentShape(Rectangle())` before the gesture |
| Tap | `.onTapGesture` (cheap) or `TapGesture()` for composition |
| Drag with a dead zone | `DragGesture(minimumDistance: 10)` so small moves stay scrolls |
| Run alongside scroll | `.simultaneousGesture(...)` |
| Take precedence | `.highPriorityGesture(...)` (use sparingly) |
| Long-press → drag | `LongPressGesture().sequenced(before: DragGesture())` |

```swift
.contentShape(Rectangle())
.gesture(
    DragGesture(minimumDistance: 10)         // dead zone preserves scroll
        .onChanged { value in offset = value.translation.width }
        .onEnded { value in
            withAnimation(.snappy) {           // §14
                offset = abs(value.translation.width) > 80 ? .commit : 0  // explicit threshold
            }
        }
)
```

- Always animate gesture *resolution* (`onEnded`) with a named spring (§14).
- Pair a committing gesture with haptic confirmation (§16).
- Don't attach gestures to zero-padding glyphs — combine with §7's hit-area expansion.

---

## §16 — Haptics

**Rule:** Haptics confirm a **discrete state change** the user caused. On iOS use `.sensoryFeedback(_:trigger:)` (iOS 17+) bound to a value; on macOS use `NSHapticFeedbackManager`. Never fire on `.onAppear`, in a loop, or "for flavor."

**Why:** Good haptics are felt, not noticed — they close the loop on an action (toggle flipped, item committed, limit reached). Gratuitous haptics feel cheap and drain the Taptic Engine's credibility. The `trigger:` form fires precisely when the bound value changes, which is exactly when feedback is meaningful.

```swift
// iOS 17+ — fire when `isComplete` flips
.sensoryFeedback(.success, trigger: isComplete)

// pick the semantic, not a raw impact, when one exists:
.sensoryFeedback(.selection, trigger: selectedTab)     // picker/segmented change
.sensoryFeedback(.impact(weight: .light), trigger: dragCommitted)
.sensoryFeedback(.warning, trigger: validationFailed)

// conditional: only on a meaningful transition
.sensoryFeedback(.increase, trigger: count) { old, new in new > old }
```

Available `SensoryFeedback` semantics: `.success`, `.warning`, `.error`, `.selection`, `.increase`, `.decrease`, `.start`, `.stop`, `.alignment`, `.levelChange`, and `.impact(weight:intensity:)` / `.impact(flexibility:intensity:)`.

```swift
// macOS — no SwiftUI sensoryFeedback parity; use AppKit at the boundary
import AppKit
NSHapticFeedbackManager.defaultPerformer.perform(.alignment, performanceTime: .now)
// patterns: .generic, .alignment, .levelChange
```

- Match the semantic to the meaning: `.success` for completion, `.selection` for value changes, `.error`/`.warning` for blocks. Reaching for `.impact` everywhere is a smell.
- Respect the system: don't haptic-spam; one event = one feedback.
- Gate behind the user's settings if your app exposes a haptics toggle.

---

## §17 — Liquid Glass micro-rules (iOS 26 / macOS 26)

**Rule:** Glass corners use `.containerConcentric`; **never nest `glassEffect` inside `glassEffect`**; tint stays **≤8% white**; interactive glass **must** have hover/press feedback. (These mirror `apple-design`'s house rules — repeated here as checkable items.)

**Why:** Liquid Glass samples what's behind it. Glass-on-glass double-samples and muddies; over-tinting kills the translucency that justifies the material; un-concentric corners on a glass container break the optical nesting the material is designed around.

```swift
// ✅ single glass layer, concentric corners, interactive feedback
Button("Edit") { }
    .glassEffect(.regular.interactive(), in: .rect(cornerRadius: .containerConcentric))

// group sibling glass elements so they share context & can morph — NOT nest
GlassEffectContainer(spacing: 20) {
    button1.glassEffect(.regular.interactive())
    button2.glassEffect(.regular.interactive())
}
```

The four glass rules (checkable):
1. **≤8% white opacity** for any tint overlay on glass.
2. **No solid color overlays** on glass — defeats the material.
3. **Never nest** `glassEffect` within `glassEffect`; use `GlassEffectContainer` for grouping.
4. **Interactive glass needs feedback** — `.interactive()` + hover/press state.

- Don't stack a heavy drop shadow (§8) on glass — the material carries its own depth.
- Morphing: `glassEffectID(_, in:)` within a `GlassEffectContainer` + an animated state change (§14).

---

## How the §s combine (recipes)

| Building | Apply |
|----------|-------|
| **List row** | §1 spacing · §3 baseline · §6 directional padding · §7 row contentShape · §11 inset separator · §12 scaled icon |
| **Primary button** | §2 optical glyph · §4 symbol weight · §5 inner radius · §7 44pt · §8 raised shadow · §14 press spring · §16 impact on commit |
| **Card** | §1 · §5 concentric children · §8 rest shadow · §9 surface token · §13 if it bleeds |
| **Sheet / overlay** | §8 overlay shadow · §13 safe-area inset CTA · §14 presentation spring · §17 if glass |
| **Counter / timer** | §3 baseline · §10 monospaced digits · §12 scaled · §16 haptic on threshold |
| **Draggable card** | §7 contentShape · §14 resolution spring · §15 threshold + simultaneity · §16 commit haptic |
