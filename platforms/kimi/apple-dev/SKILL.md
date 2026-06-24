---
name: apple-dev
description: Apple platform development plugin host for Kimi Code CLI. Provides pattern-check and api-lookup tools; load individual apple-dev skills by name.
disable-model-invocation: true
---

# Apple Dev Skills — Plugin Host

This directory hosts the Kimi-specific `apple-dev` plugin tools.

- `pattern-check` — Run mechanical Swift 6 / SwiftUI / SwiftData / entitlements / safety audit
- `api-lookup` — Query iOS 26 API signatures and anti-hallucination reference

For the full skill index, see `reference/all-skills.md`.
Load a specific skill by invoking its name, e.g. `/skill:swift6-concurrency`.
