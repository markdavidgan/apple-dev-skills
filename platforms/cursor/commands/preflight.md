---
description: "Audit a build against App Review rejection triggers by app type before submitting."
argument-hint: "[app]"
---

Run the `submission-preflight` skill on `$ARGUMENTS`.

Simulates App Review before you submit: identifies the app type(s), pulls live listing/privacy/IAP state via the App Store Connect MCP, runs the six universal rejection buckets plus the app-type rule packs, and reports a triaged ❌ will-reject / ⚠️ likely-flag / ✅ clear checklist with guideline numbers and concrete fixes. Run after `check-build`, before `prepare-submission`.
