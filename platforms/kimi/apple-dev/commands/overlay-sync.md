---
description: "Scaffold/sync this project's overlay skills from .claude/apple-overlays.json, idempotently. Add --check for a no-write CI drift check."
argument-hint: "[--check] [--descriptor <path>]"
---

Run the overlay-sync script bundled with this plugin, from the project root, passing `$ARGUMENTS`:

```bash
node "$(ls "${KIMI_CODE_HOME:-$HOME/.kimi-code}/skills/apple-dev/scripts/overlay-sync.mjs" ./.kimi-code/skills/apple-dev/scripts/overlay-sync.mjs 2>/dev/null | head -1)" $ARGUMENTS
```

It reads `.claude/apple-overlays.json`, fills each declared engine's bundled overlay
template, and regenerates `.claude/skills/<prefix>-<engine>/SKILL.md` — regenerating the
managed region only and preserving any hand-written tail. Idempotent: re-running with
unchanged inputs reports `unchanged`. `--check` makes no writes and exits non-zero if the
committed overlays have drifted (CI / pre-commit guard). The script self-locates its engine
templates (bundled at `apple-dev/templates/<engine>/overlay-template.md`).

Note: overlays are written to `.claude/skills/` (the Claude namespace). They are consumed by
Claude Code / cimi in this repo; standalone Kimi Code reads `~/.kimi-code/skills/`, so it
generates them but does not load them itself.
