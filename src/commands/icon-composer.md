---
description: "Design a layered Liquid Glass icon and produce Icon Composer-ready art plus an import checklist."
argument-hint: "[concept]"
---

Run the `app-icon-composer` skill on `$ARGUMENTS`.

Turns an approved icon concept into Icon Composer-ready layers for iOS/macOS/watchOS 26: designs the background/foreground layer stack, generates and cleans the art with the image MCPs (Recraft generate/remove-background/vectorize/upscale), verifies the light/dark/clear/tinted appearances, and exports a drag-in `.icon` bundle plus a pre-26 asset-catalog fallback. Needs an agreed concept first — run `brand-identity` if there isn't one.
