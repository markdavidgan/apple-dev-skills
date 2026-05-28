---
description: "Pre-merge quality gate with parallel verification. Runs build, archive, test, and lint checks."
argument-hint: ""
---

Run the `merge-check` skill on the current branch.

Spawns 4 parallel subagents (Build, Archive, Test, Lint) and aggregates results into a merge readiness report.
