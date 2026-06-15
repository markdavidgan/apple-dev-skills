---
description: "Pull App Store reviews, cluster by theme, and draft developer responses."
argument-hint: "[app]"
---

Run the `review-management` skill on `$ARGUMENTS`.

Pulls App Store reviews via the App Store Connect MCP, clusters them by theme (bugs/crashes, missing features, pricing, UX confusion, praise), quantifies sentiment, drafts developer responses using the HEAR framework, and routes recurring issues to the right skill (engineering, `check-build`, `paywall-design`). Posts responses on request.
