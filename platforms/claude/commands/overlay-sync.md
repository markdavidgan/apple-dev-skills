---
description: "Scaffold/sync this project's overlay skills from .claude/apple-overlays.json, idempotently. Add --check for a no-write CI drift check."
argument-hint: "[--check] [--descriptor <path>]"
---

Run the `overlay-sync` skill on `$ARGUMENTS`.

Reads `.claude/apple-overlays.json`, finds each declared engine's shipped overlay template, fills it from the project bindings, and regenerates `.claude/skills/<prefix>-<engine>/SKILL.md` — managed region only, preserving hand-written tails. Idempotent and safe to run any number of times in any Apple-development project. `--check` makes no writes and exits non-zero if committed overlays have drifted.
