---
name: overlay-sync
category: meta
description: Scaffold, sync, and update a project's per-project overlay skills from a single descriptor, idempotently. Use when you want to bind generic engine skills (like design-handoff) to a specific Apple project, refresh those overlays after the descriptor or an engine template changes, or check in CI that committed overlays are in sync. Runs in any Apple-development project and is safe to run any number of times.
invoke: "/overlay-sync [--check] — Generate/refresh this project's overlay skills from .claude/apple-overlays.json"
---

# Overlay Sync

> **Purpose:** Keep a project's thin **overlay skills** (`.claude/skills/<prefix>-<engine>/SKILL.md`) generated from one declarative descriptor, so they never drift and never get hand-maintained. Idempotent — run it any time, in any Apple-dev project.
> **Trigger:** You added an engine→project binding, changed the descriptor, an engine shipped a new overlay template, or you want a CI check that committed overlays match.

## Why this exists

The toolkit uses a **two-layer pattern**: a generic *engine* skill in `apple-dev-skills` (e.g. `design-handoff`, `swiftui-micro-craft`) plus a thin *overlay* in each project that binds it to that project's apps, schemes, and paths. Hand-writing and hand-updating those overlays is exactly the kind of duplicated, drift-prone work CLAUDE.md's "one source of truth" rules forbid. `overlay-sync` makes the overlay a **generated artifact** of one descriptor — one source, many consumers.

## How it works

```
.claude/apple-overlays.json   →   node sync.mjs   →   .claude/skills/<prefix>-<engine>/SKILL.md
   (you author this)              (this skill)         (generated; managed region only)
```

1. You author `.claude/apple-overlays.json` once — which engines to overlay, and the project bindings (apps, schemes, dirs, design language).
2. `sync.mjs` finds each engine's shipped `overlay-template.md` (it lives beside this skill in the same plugin), fills `{{placeholders}}` from the descriptor, computes the apps table/bindings, and writes each overlay SKILL.md.
3. It regenerates **only the managed region** (top of file through the `<!-- END <engine>:managed -->` marker). Anything you write *after* that marker (project notes, gotchas) is preserved across syncs.

**Idempotent:** unchanged descriptor + unchanged template ⇒ byte-identical output, reported `unchanged`. Re-running is always safe.

## Usage

```bash
# Generate/refresh all overlays declared in the descriptor:
node "<skill-dir>/sync.mjs"

# Custom descriptor path:
node "<skill-dir>/sync.mjs" --descriptor path/to/apple-overlays.json

# CI / pre-commit: no writes, exit 1 if any overlay is out of sync:
node "<skill-dir>/sync.mjs" --check
```

Run from the **project root** (the script writes under `./.claude/skills/`). It needs Node 18+ and has zero external dependencies.

`<skill-dir>` is wherever this skill's `sync.mjs` was installed. The script auto-locates its engine templates across every platform's layout; if you installed it somewhere non-standard, point it explicitly with `--templates-dir <dir>` (or set `OVERLAY_SYNC_TEMPLATES_DIR`).

### Per-CLI invocation

Each CLI flattens the skill bundle differently, so the script ships in a slightly different place — but invocation is the same idea (`node <script> [--check]`):

| CLI | How to run |
|-----|-----------|
| **Claude Code / Cursor** | `/overlay-sync [--check]` (slash command), or `node .claude/skills/overlay-sync/sync.mjs`. |
| **cimi** (Claude Code via Kimi API) | Same as Claude Code — it reads `.claude/`. |
| **Kimi Code** (standalone) | `/overlay-sync [--check]` (bundled command), which runs `node ~/.kimi-code/skills/apple-dev/scripts/overlay-sync.mjs`. |
| **Codex / Agy / Antigravity** | No commands — run the bundled script directly: `node <skills-dir>/overlay-sync__sync.mjs [--check]` (templates travel beside it as `<engine>__templates/`). |

> **Output namespace:** overlays are always written to `.claude/skills/` (the Claude namespace). Claude Code / cimi consume them directly; the other CLIs read their own skills dirs, so they *generate* the overlays but don't load them. That's intended — these app repos are Claude-primary.

## The descriptor — `.claude/apple-overlays.json`

JSON (not YAML) so it parses with zero dependencies. Start from `<skill-dir>/templates/apple-overlays.example.json`.

```json
{
  "project": "Aether",
  "prefix": "aether",
  "overlays": [
    {
      "engine": "design-handoff",
      "vars": {
        "captureCommand": "cd apps/<app> && bundle exec fastlane ios_screenshots",
        "handoffPathPattern": "apps/{app}/design-handoff/",
        "hostPolicy": "…",
        "apps": [
          { "name": "ember", "scheme": "AetherEmber-Screenshots", "dir": "apps/ember",
            "screenshotsDir": "apps/ember/design-handoff",
            "designLanguage": "Dark-mode-only; brass dial; sunset/amber arc; …" }
        ]
      }
    }
  ]
}
```

| Field | Meaning |
|-------|---------|
| `project` | Human project name (used in titles/descriptions). |
| `prefix` | Overlay name prefix → `.claude/skills/<prefix>-<engine>/`. |
| `overlays[].engine` | Engine skill to overlay (must be installed in this plugin and ship `templates/overlay-template.md`). |
| `overlays[].name` | Optional explicit overlay name; default `<prefix>-<engine>`. |
| `overlays[].vars` | Values for the engine template's `{{placeholders}}`. `apps` is rendered into the table + bindings automatically. |

Unspecified template vars fall back to sensible defaults, so a minimal descriptor still produces a valid overlay.

## Adding a new overlay to a project

1. Add an entry to `overlays[]` (engine + vars).
2. Run `node "<skill-dir>/sync.mjs"`.
3. Commit the descriptor **and** the generated `.claude/skills/<prefix>-<engine>/SKILL.md` together.

### Overlay-able engines

These engines ship `templates/overlay-template.md` and can be overlaid:

| Engine | Binds | Key vars |
|--------|-------|----------|
| `design-handoff` | apps, schemes, capture host | `apps`, `captureCommand`, `handoffPathPattern`, `hostPolicy` |
| `submission-preflight` | app identity, which type packs apply, demo creds | `appName`, `appStoreId`, `bundleIds`, `appTypes`, `demoCredsPath`, `complianceNotes` |
| `asc-aso` | listing identity, locales, seed keywords | `appName`, `appStoreId`, `categories`, `locales`, `keywordTargets`, `conversionNotes` |
| `review-management` | app identity, territories, response voice | `appName`, `appStoreId`, `territories`, `voice`, `supportLink`, `responseNotes` |

All vars are optional — each falls back to a sensible default, so a minimal entry still produces a valid overlay.

### Multi-app projects

`design-handoff` renders a multi-app table from `vars.apps`. The ASC engines bind **one app per overlay** — give each its own entry with an explicit `name` so the output dirs don't collide:

```json
{ "engine": "submission-preflight", "name": "aether-ember-preflight", "vars": { "appName": "Aether Ember", … } },
{ "engine": "submission-preflight", "name": "aether-cadence-preflight", "vars": { "appName": "Aether Cadence", … } }
```

## Authoring an engine so it can be overlaid

Any engine skill becomes overlay-able by shipping `templates/overlay-template.md` with:
- YAML frontmatter using `{{overlayName}}` / `{{overlayDescription}}`,
- a managed block delimited by `<!-- BEGIN <engine>:managed … -->` … `<!-- END <engine>:managed -->`,
- `{{placeholders}}` inside the managed block,
- a free tail after the END marker for project notes (preserved across syncs).

`design-handoff` is the reference implementation.

## Error handling

| Symptom | Cause | Fix |
|---------|-------|-----|
| `descriptor not found` | No `.claude/apple-overlays.json` | Copy the example template and edit |
| `engine template not found for "<x>"` | Engine not installed, or it ships no overlay template | Install the engine plugin / add `templates/overlay-template.md` to it |
| `--check` exits 1 | Committed overlay drifted from descriptor/template | Run without `--check`, commit the result |
| Unresolved `{{placeholder}}` warning | Template var not supplied and no default | Add it to the overlay's `vars` |
| Hand edits to an overlay disappeared | They were inside the managed region | Move them below the `END … managed` marker |

## Cross-references

- Reference engine that ships an overlay template: `design-handoff`
- Other overlay-able engines: `submission-preflight`, `asc-aso`, `review-management`
- The two-layer convention this generalizes: `swiftui-micro-craft` ↔ project micro-craft overlays
