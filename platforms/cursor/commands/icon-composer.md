---
description: "Design a HIG-correct layered Liquid Glass icon and produce Icon Composer-ready art plus an import checklist."
argument-hint: "[concept]"
---

Run the `app-icon-composer` skill on `$ARGUMENTS`.

Turns an approved icon concept into HIG-correct, Icon Composer-ready layers for iOS/macOS/watchOS 26: applies Apple's app-icon guidelines, designs the background/foreground layer stack, authors the Default/Dark/Mono appearances (the system derives Clear/Tinted), and exports a drag-in `.icon` bundle plus a pre-26 asset-catalog fallback. Authors art as SVG directly by default (no paid generator), using the image MCPs (Recraft, or OpenAI/Gemini) only for illustrative art. Needs an agreed concept first — run `brand-identity` if there isn't one.
