---
description: "Diagnose an App Review rejection, draft a Resolution Center response, and plan the fix."
argument-hint: "[guideline]"
---

Run the `app-rejection-recovery` skill on `$ARGUMENTS`.

Triages an App Store rejection: maps the cited guideline to its bucket and typical fix, drafts a Resolution Center reply, and decides fix-vs-appeal (and whether to request expedited review). Pulls submission/review state via the App Store Connect MCP when available. Hand off prevention to `preflight`.
