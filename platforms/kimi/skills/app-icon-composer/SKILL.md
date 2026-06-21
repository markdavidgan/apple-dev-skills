---
name: app-icon-composer
category: design
description: Produce HIG-correct, Icon Composer-ready layered app icons for iOS/iPadOS/macOS/watchOS 26 (Liquid Glass) — apply Apple's app-icon guidelines, design the layer stack and Default/Dark/Mono appearances, and author the art as SVG the model can write directly (no paid generator required), falling back to image-gen MCPs only for illustrative art. Use when the user says "app icon", "Icon Composer", ".icon file", "Liquid Glass icon", "layered icon", "dark/tinted/mono icon variant", "icon for App Store", or needs icon art produced and assembled.
invoke: "/icon-composer [concept] — Design a HIG-correct layered Liquid Glass icon and produce Icon Composer-ready art + an import checklist."
---

# App Icon Composer

**Produce a layered Liquid Glass app icon that follows Apple's Human Interface Guidelines and drops straight into Icon Composer — authored as SVG the model writes directly, no SnapAI, no paid icon SaaS.** The *brand* decision (silhouette, signature color, what the icon means) lives in `app-brand-identity`; App Store listing use lives in `asc-aso`. This skill is the HIG-correct production pipeline: concept → layer stack → appearances → an Icon Composer-ready bundle.

> **Since iOS/iPadOS/macOS/watchOS 26, app icons are layered, not flat.** You hand Icon Composer (bundled with Xcode 26) a small set of **flat, opaque source layers**; the system renders Liquid Glass — specular highlights, refraction, translucency, shadow, blur, and corners — and derives the appearance variants. A baked 1024 PNG fights that renderer and looks dead next to native icons. **SVG is Apple's recommended input format**, which is exactly what a code-capable model can produce directly.

---

## When to use vs. when not to

| Use this skill | Use instead |
|----------------|-------------|
| Turning an approved concept into HIG-correct Icon Composer layers | `app-brand-identity` — to pick the concept, silhouette, signature color |
| Authoring the layer art (SVG-first) and the Default/Dark/Mono appearances | — |
| Assembling a `.icon` import bundle + asset-catalog fallback | `asc-submission` — to upload the built app |
| Multi-size legacy `AppIcon.appiconset` discipline | `app-brand-identity` (its "All Sizes" section) |

If there's no agreed concept yet, stop and run `app-brand-identity` first. This skill assumes you know *what* the icon is.

---

## HIG foundations (get these right before any pixels)

Apple's app-icon guidance, current for the layered system:

- **One concept, instantly understood.** A single focus point, centered. If you can't name the idea in three words, simplify.
- **Flat, opaque, simple source art.** No photos, no realistic imagery, **no text or words**, no UI screenshots/chrome. These fail at small sizes and read as amateur.
- **Bold weights, rounder corners.** Use bold line weights so detail survives at Home Screen size; **avoid sharp edges and thin lines** — rounded corners let light travel cleanly across edges under Liquid Glass. Fine linework disappears below ~64px.
- **Legibility is the gate**, especially for the Mono appearance. Test the art at 32pt and 64pt before committing.
- **Design in layers** so color and material can be tuned per appearance — that's the whole point of the new system.
- **Consistent personality across platforms**, tuned per platform shape. Same icon, not five different ones.

Anti-slop (from `app-brand-identity`): no gradient blobs, no purple-blue "AI aesthetic," no fake 3D, no stock templates. If it smells generated, redo it as clean vector.

---

## The layered model

Icon Composer organizes art into a **background plus one or more foreground layers** (it groups layers; a group holds up to 4 layers). Minimum viable icon = one background + one foreground.

| Layer role | What goes here | Rules |
|------------|----------------|-------|
| **Background** | Full-bleed ground — solid, gradient, or material | Fills the whole canvas edge-to-edge |
| **Foreground (1+)** | The hero glyph/mark, plus optional supporting shapes for depth | Lives in the safe area; this is what reads at a glance |

What the **system** owns — never bake these into source art:

- **Specular highlights** (edge definition; alignment configurable in Icon Composer)
- **Refraction** (lens-like light bending; layers pick up color from layers beneath — this is *why* you separate layers)
- **Translucency / frostiness**
- **Shadow and blur**
- **Corners** — for **iOS/iPadOS** (squircle) and **watchOS** (circle), draw with **90° corners** and let the system mask. **Exception — macOS:** you draw the rounded rectangle yourself (the system does *not* auto-mask macOS).

> **Separation = depth.** Each layer is its own transparent element so the renderer can offset, shadow, and refract them. Source layers *may* carry alpha (refraction needs it); the *exported* Home Screen icon is flattened and **opaque**.

---

## Appearances: author three, the system derives the rest

You configure **three** appearances; the system generates the translucent and tinted variants from them.

| You author | What it is | Key rule |
|------------|-----------|----------|
| **Default** | Standard light look | Hero reads against the background; good contrast |
| **Dark** | Dark Home Screen | Adjust fills/colors for legibility; a transparent/darker ground is allowed (unlike pre-26 flat icons) |
| **Mono** | Monochrome / accessibility / tint base | Set the most prominent element to **white**; map everything else to **grays**. If the glyph dissolves here, simplify the foreground. |

| System derives | From |
|----------------|------|
| **Clear Light / Clear Dark** (translucent glass) | your layers |
| **Tinted Light / Tinted Dark** (user color-infused) | the Mono appearance |

> The fastest way to a bad iOS 26 icon is designing only Default. **Mono is the stress test** — if the idea survives as a white-on-gray silhouette, the tinted and clear variants will too. Render all three before you commit.

Apple Watch supports the light/updated look only — if your iOS Mono needed simplification, the watch art does too.

---

## Canvas & geometry

| Platform | Canvas | Shape | Corners |
|----------|--------|-------|---------|
| iPhone / iPad / Mac | **1024×1024** (unified) | iOS squircle · macOS rounded-rect | iOS: draw 90°, system masks · **macOS: you draw the rounded rect** (~824×824 content area, 185.4pt radius in the 1024 canvas) |
| Apple Watch | **1088×1088** (intentional overshoot) | Circle | Draw 90°/full-bleed, system applies the circular mask |

Keep the hero glyph generously inside the safe area — the mask and glass eat the edges. Apple publishes exact grid templates (Figma/Sketch/PSD/AI) on [Apple Design Resources](https://developer.apple.com/design/resources/); use them when precision matters.

---

## Production pipeline — a capability ladder

Pick the lowest rung that fits; it's the most portable and the cleanest.

### Rung 1 (default): the model authors the layers as SVG

For **geometric, symbolic, glyph, or lettermark** icons — which is most app icons — the best path is to **write the SVG directly**. It needs no MCP, runs in *every* CLI and model (including Kimi/Codex/Antigravity where image MCPs may not exist), is native vector (perfect for Mono silhouettes and small-size crispness), and each `<g>` maps cleanly to an Icon Composer layer.

Author one SVG per layer (or one grouped SVG), flat and opaque, per the geometry above. Then run the **feedback loop** — without it the model is drawing blind:

> write SVG → rasterize to PNG (`rsvg-convert`, `resvg`, `cairosvg`, headless Chrome `--screenshot`, or `qlmanage -t`) → **Read the PNG back** (the Read tool shows images to the model) → critique against the HIG rules + the three-appearance test → adjust → repeat until it holds at 1024, 64, and 32px.

A purely geometric mark may never need anything else.

### Rung 2: image generation for illustrative/organic art

When the concept is illustrative (a rendered object, mascot, organic scene) raw SVG is weak. Use an image-gen tool for the *generation slot only*, then bring it back to vector:

| Slot | Default (wired here) | Drop-in alternatives |
|------|----------------------|----------------------|
| Generate flat hero art | `mcp__recraft__generate_image` (use the icon/vector style) | OpenAI `gpt-image-1`, Gemini "Nano Banana" — **if the user has them wired** |
| Isolate the subject | `mcp__recraft__remove_background` | any bg-removal |
| **Vectorize → SVG** | `mcp__recraft__vectorize_image` | Illustrator Image Trace, `potrace` |
| Sharp upscale of master | `mcp__recraft__crisp_upscale` | — |

> **Recraft is the recommended default** because it covers generate + bg-remove + **vectorize** + upscale natively and is already an MCP here — no API key, no external CLI (the dependency we deliberately dropped from the SnapAI approach). OpenAI/Gemini are fine for the *generation* step if preferred, but they're **raster-only** — always route their output through a vectorizer before it becomes a layer, or the Mono/Clear appearances and small sizes will mush. Treat any generated art as a draft of the silhouette and run it past the anti-slop rules.

### Rung 3 (optional): preview / compose surface

To eyeball the layer stack or render a preview grid, the `pencil` or `figma` MCP (`get_screenshot`, `export_nodes`) can help — but they're UI-oriented design tools, not icon authoring tools. The plain SVG→PNG→Read loop in Rung 1 covers the feedback need more portably; reach for Pencil/Figma only if you're already composing there.

---

## Export: what "Icon Composer-ready" means

Deliver a folder the user drags into Icon Composer (or hands to a designer), plus a fallback:

```
<AppName>Icon/
├─ background.svg          full-bleed ground (or .png), opaque
├─ foreground.svg          hero glyph, transparent, centered in safe area
├─ foreground-extra.svg    (optional) supporting foreground layer(s)
├─ dark/                   Dark-appearance versions of the layers
├─ mono/                   Mono-appearance versions (white hero + grays)
├─ macos-rounded.svg       (macOS only) art on the designer-drawn rounded rect
└─ NOTES.md               layer order, signature hex, canvas size, safe-area, appearance checks
```

Rules for every exported layer:

- **SVG preferred** (Icon Composer's recommended input); if raster, 1024×1024 (1088 for watch), sRGB.
- **Flat and opaque source — no baked corners (except macOS), shadow, gloss, blur, or specular.** The renderer owns those.
- Author **Default, Dark, and Mono**; let Icon Composer derive Clear/Tinted.
- In `NOTES.md`, record layer order, signature hex, canvas size, the safe-area assumption, and the three-appearance check results so the import is reproducible.

### Asset-catalog fallback (pre-26 targets)

Icon Composer also exports a flattened `AppIcon.appiconset`. If you must support OS versions before the layered system, produce a single flattened **opaque** 1024 master and follow the **multi-size "All Sizes" discipline** in `app-brand-identity` (bolder art in the small slots; alpha stripped to avoid ITMS rejection). The `.icon` layers serve OS 26+; the raster catalog serves older OS.

---

## Output checklist (`/icon-composer`)

- [ ] **Concept confirmed** (from `app-brand-identity`, or flagged as missing).
- [ ] **HIG pass** — single concept, flat/opaque, no text/photo/UI, bold weights, no sharp thin lines.
- [ ] **Rung chosen** — SVG-authored (geometric) or image-gen→vectorize (illustrative), with the render→Read→critique loop run.
- [ ] **Layers separated** — background + foreground(s), each its own file.
- [ ] **No baked corners/shadow/gloss/blur/specular** (except the macOS rounded rect).
- [ ] **Canvas & geometry correct** — 1024 (1088 watch); iOS 90° corners, macOS rounded rect drawn.
- [ ] **Three appearances authored** — Default, Dark, Mono; Mono hero is white on grays.
- [ ] **Mono silhouette holds** at 64px and 32px.
- [ ] **Export bundle** assembled with `NOTES.md`; SVG sources included.
- [ ] **Fallback raster** produced if pre-26 support is needed (+ multi-size per `app-brand-identity`).
- [ ] **Anti-slop pass** — no gradient blob / AI-gradient / fake 3D.

> **Smell test before you ship:** render the foreground as a flat white-on-gray silhouette at 32px (the Mono/tinted worst case). If you can't tell what the app does, the layered appearances will fail taste even when they pass App Review. Simplify the foreground until the silhouette alone carries the idea.

---

## References

- App icons — Apple HIG: https://developer.apple.com/design/human-interface-guidelines/app-icons
- Creating your app icon using Icon Composer (Xcode 26): https://developer.apple.com/documentation/Xcode/creating-your-app-icon-using-icon-composer
- Icon Composer: https://developer.apple.com/icon-composer/
- WWDC25 — "Say hello to the new look of app icons" (220), "Create icons with Icon Composer" (361), "Meet Liquid Glass" (219)
- Apple Design Resources (grid templates): https://developer.apple.com/design/resources/
