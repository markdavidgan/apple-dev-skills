---
name: app-brand-identity
description: Create a complete brand identity system for Apple platform apps — wordmark, icon, design tokens, brand voice, and App Store marketing assets. Use when starting a new app, renaming/rebranding, designing a logo, choosing typography, building a design system, or preparing App Store screenshots and preview materials.
invoke: "/brand-identity [app-name] — Create wordmark, icon, design tokens, and App Store marketing asset strategy"
---

# App Brand Identity

Create a complete brand identity system for Apple platform apps. Produces a wordmark, app icon, design token foundation, brand voice guidelines, and App Store marketing asset strategy. **Use before `apple-design` — this skill creates the visual system that `apple-design` implements in SwiftUI.**

> **Embody a product designer at Apple.** Your brand will live on the App Store, in the Dock, in Spotlight results, and in screenshots on social media. Every decision must survive at 16×16 (menu bar) and 1280×800 (App Store feature). No generic startup aesthetics. No gradient blobs. No AI-slop.

## When to Use

- Starting a new app and need a name, logo, or visual identity
- Renaming or rebranding an existing app
- Designing the app icon (macOS rounded rect, iOS squircle, visionOS layered)
- Choosing typography, color palette, or spacing system
- Building a design token system that bridges marketing site and app code
- Preparing App Store screenshots, preview video storyboards, or feature graphics
- Creating a press kit or maker page

## When NOT to Use

- **Don't use** for pure UI component design — that's `apple-design`
- **Don't use** for App Store submission logistics — that's `asc-submission`
- **Don't use** for pricing decisions — that's `app-store-pricing`
- **Don't use** for architecture diagrams — that's `apple-architecture-diagram`

---

## The Brand Identity Process

### 1. Discovery & Constraints

Before designing, lock the constraints:

| Question | Why It Matters |
|----------|----------------|
| **Platforms?** | macOS icons are rounded rect (≤ 1024pt). iOS is squircle (superellipse mask). visionOS is circular with layered depth. |
| **Minimum OS?** | iOS/macOS 26+ unlocks Liquid Glass, SF Rounded, new material effects. |
| **Category?** | Utility apps need instant recognition. Creative tools can be more expressive. Productivity apps should feel calm and competent. |
| **Competitive frame?** | Who do you want to be compared to? Who do you want to avoid being compared to? |
| **Name length?** | Short names (< 6 chars) allow larger wordmarks. Long names need abbreviation strategies. |
| **Dark mode default?** | macOS utilities often live in dark mode. iOS apps see both. |

### 2. Name & Naming Conventions

**Product name rules for Apple platforms:**

- **Searchable** — type it into Spotlight and App Store search; is it unique enough?
- **Speakable** — can someone say it to Siri and be understood?
- **Short** — 4–6 characters ideal for menubar/Dock labels; 10+ requires truncation strategy
- **No generic descriptors** — "Photo Editor Pro" is unbrandable. "Orbit" is ownable.
- **Domain check** — `.app` preferred, but not required at launch

**Naming convention matrix:**

| Context | Form | Example |
|---------|------|---------|
| Product name in prose | Full name | Orbit |
| Wordmark / logo lockup | Name + mark | `orbit` + triangle |
| Paid tier | Name + modifier | Orbit+ |
| App Store listing | Full name (no punctuation marks) | Orbit |
| Bundle ID | Reverse DNS | `com.example.orbit` |
| Menubar / Dock | Icon only (no text) | — |

### 3. Wordmark Design

#### The Wordmark Hierarchy

Every wordmark decision is a trade-off between **distinctiveness** and **legibility**:

| Approach | Distinctiveness | Legibility | Best For |
|----------|----------------|------------|----------|
| **System sans + custom mark** (SF Pro + unique icon) | Medium | High | Most apps |
| **System rounded** (SF Rounded) | Low | High | Friendly consumer apps |
| **Serif + geometric mark** | High | Medium | Premium/design tools |
| **Custom logotype** | Very High | Variable | Established brands |

**Default recommendation for indie Apple apps:** System sans (SF Pro) + custom mark. It feels native, performs well at small sizes, and doesn't fight the platform.

#### Typography Selection

| Font | Weight | Personality | Platform Feel |
|------|--------|-------------|---------------|
| SF Pro Display | 300–600 | Native, neutral, professional | Invisible (good) |
| SF Pro Rounded | 400–500 | Friendly, accessible, soft | Playful without being childish |
| Georgia / Times | 400 | Editorial, distinctive, premium | Stands out in utility categories |
| Custom sans | Varies | Unique, ownable | Requires strong justification |

**Rules:**
- Use **SF Pro Display** for wordmarks unless you have a specific reason not to
- Use **Georgia** only when the icon already contains serif elements (creates system harmony)
- Never use **SF Pro Text** for wordmarks — it's optimized for body copy, not display
- Letter-spacing: tight (`-0.02em` to `-0.04em`) for modern feel; normal for classic

#### The Mark (Punctuation/Icon Element)

The mark is the visual signature that makes the wordmark ownable:

| Mark Type | Example | Risk | Reward |
|-----------|---------|------|--------|
| **Dot** | `orbit.` | Generic — any product can use it | Clean, typographic |
| **Triangle/geometric** | `orbit` ▲ | Requires design work | Ownable, product-relevant |
| **Plus badge** | `orbit+` | Universal tier signifier | Clear paid tier communication |
| **None** | `Orbit` | Harder to trademark, less distinctive | Maximum simplicity |

**Mark construction rules (from Orbit triangle mark):**
- The mark must echo the app icon — every wordmark use reinforces icon recognition
- Position in natural whitespace, never clip or modify letterforms
- Scale proportionally: derive size from font metrics (e.g., `fontSize × 0.247`)
- Use Canvas API or SVG for precise positioning after `document.fonts.ready`

#### Wordmark Exploration Template

When exploring wordmarks, produce **4 directions** as self-contained HTML:

```html
<!-- Direction A: System sans, bold, no mark -->
<!-- Direction B: System rounded, medium weight -->
<!-- Direction C: Serif + geometric mark -->
<!-- Direction D: System sans + custom mark (Liquid Glass aesthetic) -->
```

Each direction must show:
- Large (hero size)
- Medium (nav bar size)
- Small (App Store listing size)
- Dark background
- Light background
- With paid tier variant (+ mark)

### 4. App Icon Design

#### Platform Geometry

| Platform | Shape | Corner Radius | Key Characteristic |
|----------|-------|---------------|-------------------|
| **macOS** | Rounded rectangle | `22%` of side (1024pt → ~205px) | Subtle 3D tilt optional |
| **iOS** | Superellipse (squircle) | System-masked | No transparency |
| **visionOS** | Circle with depth | N/A (circular mask) | Layered glass + shadow |
| **watchOS** | Circle | N/A | Simplified, high contrast |

**Anti-patterns:**
- Don't design the macOS icon as a perfect square with sharp corners — it looks like a Windows port
- Don't put text inside the icon (except single-letter marks at very large sizes)
- Don't use the full wordmark inside the icon — it becomes illegible at 29×29

#### Icon Design Principles

1. **One idea, instantly readable** — The icon should communicate the app's core action at 60×60 (Spotlight) and 1024×1024 (App Store)
2. **Bold silhouette** — The outer shape should be distinctive even when blurred
3. **Material honesty** — On macOS 26+/iOS 26+, use Liquid Glass or native materials. On older OS, use flat or subtle gradients.
4. **Color discipline** — 1–2 colors + neutral. Coral + dark is better than rainbow.

#### Icon Variations Checklist

```
AppIcon.appiconset/
  ├─ 16x16@1x.png      (menubar, small)
  ├─ 16x16@2x.png
  ├─ 32x32@1x.png      (Retina menubar)
  ├─ 32x32@2x.png
  ├─ 128x128@1x.png    (Finder)
  ├─ 128x128@2x.png
  ├─ 256x256@1x.png    (Dock default)
  ├─ 256x256@2x.png
  ├─ 512x512@1x.png    (Quick Look)
  ├─ 512x512@2x.png    (App Store)
  └─ 1024x1024@1x.png  (App Store marketing)
```

**Critical:** The 16×16 menubar icon is the hardest. Design it first — if it works there, it works everywhere.

### 5. Color System

#### Primary Palette

| Role | Selection Criteria | Example |
|------|-------------------|---------|
| **Signature** | The one color users associate with your app | `#FF6B5B` (coral) |
| **Canvas (dark)** | The background your app lives on | `#0E1117` |
| **Canvas (light)** | For light mode / marketing | `#F5F5F7` |
| **Surface** | Elevated cards, panels | `#16191D` (dark), `#FFFFFF` (light) |
| **Text primary** | Headlines, body | `#FFFFFF` (dark), `#1D1D1F` (light) |
| **Text muted** | Captions, secondary | `#9CA3AF` (dark), `#86868B` (light) |

**Rules:**
- Signature color must pass WCAG AA on both canvas colors (4.5:1 for text, 3:1 for UI)
- Never use the signature color for error states — reserve red (`#FF453A`) for errors
- Dark canvas should be subtly tinted toward the signature (e.g., coral-tinted dark `#0E1117`), not pure gray

#### Semantic Colors

```swift
// Inherit from Apple semantic colors where possible
let success = Color.green      // #34C759
let warning = Color.orange     // #FF9F0A
let danger = Color.red         // #FF453A
```

### 6. Design Token System

Tokens bridge marketing (CSS) and app (SwiftUI):

```css
/* apps/website/src/styles/tokens.css */
@theme {
  --color-primary: #0E1117;
  --color-signature: #FF6B5B;
  --font-display: "SF Pro Display", -apple-system, sans-serif;
  --radius-icon: 22px;
  --ease-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1.0);
}
```

```swift
// Packages/AppCore/Sources/AppCore/Tokens/AppTokens.swift
public enum AppTokens {
    public static let signature = Color(hex: "#FF6B5B")
    public static let canvasDark = Color(hex: "#0E1117")
    public static let canvasLight = Color(hex: "#F5F5F7")
    public static let radiusIcon: CGFloat = 22
}
```

**Sync rule:** When tokens.css changes, update the Swift mirror. Document the dependency in both files.

### 7. Brand Voice

| Attribute | Do | Don't |
|-----------|-----|-------|
| **Tone** | Calm, confident, craft-focused | Hype, exclamation points, trend words |
| **AI references** | Name what it does, not that it's AI | "AI-powered," "smarter than ever" |
| **Feature copy** | Describe the benefit, not the mechanism | "Utilizes advanced neural networks" |
| **Error copy** | Plain language, no blame | "Something went wrong" not "User error" |
| **Pricing copy** | One-time = "Unlock"; Subscription = "Pro" | Ambiguous tier names |

**Voice test:** Read your App Store subtitle aloud. If it sounds like it could be from any other app, rewrite it.

### 8. App Store Marketing Assets

#### Screenshots Strategy

| Slot | Purpose | Content |
|------|---------|---------|
| 1 | **Hook** — the "wow" moment | The app doing its core action beautifully |
| 2 | **Context** — where it lives | Menubar, Dock, or device context |
| 3 | **Feature 1** — primary differentiator | The one thing no competitor does |
| 4 | **Feature 2** — secondary benefit | Supporting capability |
| 5 | **Social proof** — trust | Ratings, testimonials, or "Featured by Apple" |
| 6 | **CTA** — pricing clarity | Clear tier distinction, no surprises |

**Screenshot rules:**
- Use **real app UI** — never mockups. The gap between screenshot and reality is a rejection risk.
- Include **device chrome** for iOS; **clean UI** for macOS (no window chrome needed)
- Maintain **color consistency** — all screenshots feel like the same app
- **Text overlays** are optional; if used, keep under 4 words per slide

#### App Preview Video (Optional)

- 15–30 seconds
- No audio required (most users watch muted)
- Show the core loop: trigger → action → result
- End on the App Store CTA frame

#### Press Kit / Maker Note

Single-page markdown:
- One-sentence pitch
- 3 bullet differentiators
- 2–3 screenshot links
- Contact / social links
- "Made by [name]" — personal attribution performs better than anonymous studio

---

## Deliverables Checklist

A complete brand identity handoff includes:

- [ ] **Name** — searchable, speakable, ownable
- [ ] **Wordmark** — 4-direction exploration → 1 approved → dark + light variants
- [ ] **App Icon** — 1024pt master → all platform variations → menubar 16×16 validated
- [ ] **Color system** — signature + canvas + surface + semantic + contrast verification
- [ ] **Typography** — display font, text font, mono font (if needed), weights specified
- [ ] **Design tokens** — CSS file + Swift mirror, synced
- [ ] **Brand voice** — tone attributes, do/don't table, example copy
- [ ] **App Store screenshots** — 6-slot strategy + mock descriptions
- [ ] **Maker note / press kit** — single-page markdown

---

## Integration with Other Skills

| After `app-brand-identity`, invoke... | For... |
|--------------------------------------|--------|
| `apple-design` | Implementing tokens in SwiftUI, Liquid Glass effects, preview patterns |
| `app-store-pricing` | Pricing tiers, introductory offers, global equalization |
| `asc-submission` | Preparing screenshots, metadata, and App Store listing |
| `apple-architecture-diagram` | Marketing architecture diagrams for press/VC pitches |

---

## Anti-AI-Slop Rules

| Avoid | Use Instead |
|-------|-------------|
| Gradient blobs / abstract shapes | Meaningful geometry related to app function |
| Purple-blue gradients ("AI aesthetic") | Signature color + true black |
| Generic sans-serif wordmarks with no mark | System font + custom geometric mark |
| Stock icon templates | Original silhouette tested at 16×16 |
| Trendy 3D renderings | Native materials (Liquid Glass, metal, fabric) |
| Multiple competing signature colors | One signature + neutral system |
