---
name: app-icon-composer
category: design
description: Produce Icon Composer-ready layered app icons for iOS/iPadOS/macOS/watchOS 26 (Liquid Glass .icon) — design the layer stack, generate art with the image MCPs you already have, and export a clean import bundle. Use when the user says "app icon", "Icon Composer", ".icon file", "Liquid Glass icon", "layered icon", "icon for App Store", "dark/tinted icon variant", or needs icon art produced and assembled. No third-party paid icon generator required.
invoke: "/icon-composer [concept] — Design a layered Liquid Glass icon and produce Icon Composer-ready art + an import checklist."
---

# App Icon Composer

**Design and assemble a Liquid Glass app icon Apple's Icon Composer can ingest directly — no SnapAI, no paid icon SaaS.** The *brand* decision (silhouette, signature color, what the icon means) lives in `app-brand-identity`; the *App Store listing* use lives in `asc-aso`. This skill is the production pipeline: concept → layer stack → generated art → an Icon Composer-ready bundle, built on the image MCPs already wired into this environment.

> **Icon Composer is layer-first, not pixel-first.** Since iOS/iPadOS/macOS/watchOS 26, the system renders one source icon into light, dark, clear, and tinted appearances and applies Liquid Glass material, blur, specular highlights, and shadow *for* you. Your job is to hand it cleanly separated layers, not a baked 1024 PNG. A flattened raster fights the renderer and looks dead next to native icons.

---

## When to use vs. when not to

| Use this skill | Use instead |
|----------------|-------------|
| Turning an approved concept into Icon Composer layers | `app-brand-identity` — to pick the concept, silhouette, signature color |
| Generating/cleaning the actual icon art | — |
| Producing dark + tinted + clear variants | — |
| Exporting a `.icon` import bundle + asset-catalog fallback | `asc-submission` — to upload the built app |
| Multi-size legacy `AppIcon.appiconset` discipline | `app-brand-identity` (its "All Sizes" section) |

If there's no agreed concept yet, stop and run `app-brand-identity` first. This skill assumes you know *what* the icon is.

---

## The Icon Composer layer model

Icon Composer (ships with Xcode 26) takes a layered source and produces the `.icon` document. Design to this model:

| Layer role | What goes here | Rules |
|------------|----------------|-------|
| **Background** | The full-bleed ground — solid, gradient, or material | Fills the whole canvas edge-to-edge. No rounded corners — the system masks. |
| **Midground (optional)** | Supporting shape behind the hero | Used for depth/parallax; keep subtle |
| **Foreground** | The hero glyph/mark | Lives in the safe area; this is what reads at a glance |
| **Specular / highlight** | Leave to the system | Do **not** paint fake gloss — Liquid Glass adds it. Painting your own double-glosses. |

Design tenets:

- **Separation = depth.** Each layer is its own transparent PNG (or vector). The system offsets and shadows them to create the glass parallax. One flat layer = no depth.
- **Centered, generous safe area.** Keep the hero glyph well inside the safe region; the squircle mask and rounded glass eat the edges. Roughly the central ~80% is safe.
- **No baked corners, no baked shadow, no baked blur.** The renderer owns all three. Ship flat, sharp art.
- **One idea.** Same rule as `app-brand-identity` — readable at 60px Spotlight and 1024px App Store.
- **Design the glyph as vector.** You will rasterize per slot; vector keeps small sizes crisp (see `app-brand-identity` → multi-size discipline for why faint detail dies below ~64px).

---

## The four appearances you must check

Icon Composer renders these from your layers. Verify each:

| Appearance | What it is | What to check |
|------------|-----------|---------------|
| **Light (default)** | Standard Home Screen | Hero reads against background; contrast OK |
| **Dark** | Dark Home Screen | Provide a darker background layer; the glyph must not vanish. Often a transparent-ground + glowing glyph. |
| **Clear / Liquid Glass** | Tinted glass system look | Glyph holds up as a near-monochrome glass form; avoid relying on color to carry meaning |
| **Tinted (monochrome)** | User-tinted Home Screen | The glyph must read as a single-color silhouette. If it dissolves, simplify the foreground. |

> The fastest way to a bad iOS 26 icon is designing only the light appearance. Render all four before you commit — a glyph that depends on a gradient to be legible fails tinted and clear.

---

## Production pipeline (the image MCPs you already have)

No external CLI. Use the MCP tools in this environment. Typical flow:

1. **Generate the hero glyph art** with `mcp__recraft__generate_image` — prompt for a *flat, centered, single-subject* mark on a transparent or solid background, in the signature color from `app-brand-identity`. Ask for the icon/vector-art style, not a photographic render. Generate 3–4 candidates.
   - For a strictly geometric mark you can author SVG directly instead and skip generation.
2. **Isolate the subject** with `mcp__recraft__remove_background` so the foreground becomes a clean transparent layer separable from the ground.
3. **Vectorize** the chosen glyph with `mcp__recraft__vectorize_image` — gives crisp scaling for every slot and a clean silhouette for the tinted appearance.
4. **Upscale** the master if needed with `mcp__recraft__crisp_upscale` (sharp/flat art) so the 1024 source is pristine.
5. **Build the background layer** separately — a solid or gradient ground generated or hand-authored; keep it full-bleed and corner-free.
6. (Optional) **Stitch/preview composition** with the `pencil` or `figma` MCP if you want to eyeball the layer stack before import, or render a quick preview grid.

> Treat generated art as a *draft of the silhouette*, not the final. Run it past the `app-brand-identity` anti-AI-slop rules: no gradient blobs, no purple-blue "AI aesthetic," no fake 3D gloss. If it smells generated, redo the glyph as clean vector.

---

## Export: what "Icon Composer-ready" means

Deliver a folder the user can drag into Icon Composer (or hand to a designer) plus a fallback. Produce:

```
<AppName>Icon/
├─ background.png         1024×1024, full-bleed, opaque, NO corners/shadow
├─ foreground.png         1024×1024, transparent, hero glyph centered in safe area
├─ midground.png          (optional) 1024×1024, transparent
├─ foreground.svg         vector source of the glyph (for crisp re-export)
├─ dark-background.png     1024×1024 dark-appearance ground (if different)
└─ NOTES.md               layer order, signature hex, safe-area %, appearance checks
```

Rules for every exported layer:

- **1024×1024**, square, **no rounded corners**, **no drop shadow**, **no painted gloss/blur**.
- Foreground/midground PNGs are **transparent**; background is **opaque** (or intentionally transparent for a glass-on-clear dark look).
- sRGB color space; flatten to the signature hex from the brand tokens.
- In `NOTES.md`, record layer order, the four-appearance check results, and the safe-area assumption so the import is reproducible.

### Asset-catalog fallback (pre-26 / non-layered targets)

If the app must support OS versions before the layered system, also produce a single flattened `1024×1024` opaque master for a classic `AppIcon.appiconset`, and follow the **multi-size "All Sizes" discipline** in `app-brand-identity` (bolder art in the small slots; alpha stripped to avoid ITMS rejection). The layered `.icon` and the flattened catalog coexist — newer OS uses the layers, older OS uses the raster.

---

## Output checklist (`/icon-composer`)

When producing an icon, report:

- [ ] **Concept confirmed** (from `app-brand-identity`, or flagged as missing).
- [ ] **Layers separated** — background / foreground (+ midground) each its own file.
- [ ] **No baked corners, shadow, gloss, or blur** in any layer.
- [ ] **Safe area respected** — hero inside ~central 80%.
- [ ] **Four appearances checked** — light, dark, clear, tinted all legible.
- [ ] **Tinted silhouette holds** — glyph reads as one color.
- [ ] **Vector glyph source** included for crisp re-export.
- [ ] **Export bundle** assembled with `NOTES.md`.
- [ ] **Fallback raster** produced if pre-26 support is needed (+ multi-size per `app-brand-identity`).
- [ ] **Anti-slop pass** — no gradient blob / AI-gradient / fake 3D.

> **Smell test before you ship:** render the foreground glyph as a flat monochrome silhouette at 60px. If you can't tell what the app does, the tinted and clear appearances will fail review-of-taste even if they pass App Review. Simplify the foreground until the silhouette alone carries the idea.
