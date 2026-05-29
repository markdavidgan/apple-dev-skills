# Architecture

This document explains how `apple-dev-skills` is structured, why it is structured this way, and how content flows from source to platform-specific outputs.

---

## Design Goals

1. **Single source of truth** — Edit content in `src/`; never edit generated `platforms/` directly.
2. **Multi-platform with minimal duplication** — One canonical skill set, multiple platform bundles.
3. **Graceful degradation** — Platforms without agents/commands still get full knowledge via skills.
4. **Installable from Git** — Every platform can install directly from the GitHub repo without extra build steps on the user's machine.
5. **CI-validated** — GitHub Actions ensure `platforms/` never drifts from `src/`.

---

## High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│  src/                        Canonical source of truth      │
│  ├── skills/*                22 skill directories           │
│  ├── agents/*                7 agent definitions            │
│  ├── commands/*              12 command definitions         │
│  └── mcp/asc/                TypeScript MCP server          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  scripts/build.js            Reads src/, applies platform   │
│                              templates, writes platforms/   │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   ┌────────────┐    ┌──────────────┐    ┌──────────────┐
   │  Claude    │    │    Kimi      │    │  Antigravity │
   │  (native)  │    │ (consolidated│    │   (flattened)│
   │            │    │  + tools)    │    │              │
   └────────────┘    └──────────────┘    └──────────────┘
```

---

## Source Structure (`src/`)

### Skills

Each skill lives in its own directory:

```
src/skills/<skill-name>/
├── SKILL.md              # Required entrypoint
└── (subdirs/*.md)        # Optional supporting files
```

**Rules:**
- `SKILL.md` must exist.
- YAML frontmatter is required (`name`, `description`).
- Subdirectories are allowed for deep reference material (e.g., `ios26-api-reference/essentials/`).
- Cross-references between skills use skill names, not file paths.

### Agents

```
src/agents/<agent-name>.md
```

Frontmatter declares model tier, effort, tools, maxTurns, and background execution.

### Commands

```
src/commands/<command-name>.md
```

Thin wrappers that invoke skills. Frontmatter includes `description` and optional `argument-hint`.

### MCP Server

```
src/mcp/asc/
├── package.json
├── src/                  # TypeScript source
├── dist/                 # Compiled output (built, not committed)
└── README.md
```

The ASC MCP server is a standard TypeScript MCP server. It is built separately from the skill build pipeline.

---

## Platform Outputs (`platforms/`)

### Claude

**Strategy:** Native structure — copy as-is.

```
platforms/claude/
├── skills/               # 22 directories, identical to src/skills/
├── agents/               # 7 files
├── commands/             # 12 files
└── plugin.json           # Claude marketplace manifest
```

Claude Code supports nested skills, agents, and commands natively. No transformation needed.

### Cursor

**Strategy:** Native structure — copy as-is with Cursor-specific manifest.

```
platforms/cursor/
├── skills/
├── agents/
├── commands/
└── plugin.json           # Cursor marketplace manifest
```

Cursor's `plugin.json` includes `skills`, `agents`, and `commands` path references.

### Kimi

**Strategy:** Consolidated single-plugin with tools.

```
platforms/kimi/apple-dev/
├── plugin.json           # Tool declarations + metadata
├── SKILL.md              # Consolidated master skill
└── scripts/              # Executable tools
    ├── pattern-check.sh
    └── api-lookup.sh
```

**Why consolidation?** Kimi Code discovers **only one `SKILL.md` per plugin**. Nested skill directories are ignored. Therefore all 22 skills are concatenated into a single master `SKILL.md` with clear section boundaries and a skill index.

**Tools:** Because Kimi lacks commands/agents, executable tools in `plugin.json` provide interactive capabilities:
- `pattern-check` — Runs the mechanical validation script
- `api-lookup` — Queries the iOS 26 API reference

**Trade-off:** The master skill is large (~8,000+ lines) but well-structured. It loads into context as a single unit, which is actually efficient for Kimi's retrieval.

### Antigravity

**Strategy:** Flattened skills with prefixed filenames.

```
platforms/antigravity/skills/
├── apple-dev__apple-cleanup.md
├── apple-dev__apple-patterns-check.md
├── ...
├── ios26-api-reference__essentials/
│   └── ...
└── ...
```

Antigravity reads skills from `~/.gemini/antigravity/skills/`. It does not support nested directories well for discovery, so subdirectories are flattened with `__` separators.

### Codex

**Strategy:** Flattened skills with `.SKILL.md` extension.

```
platforms/codex/skills/
├── apple-dev__apple-cleanup.SKILL.md
├── apple-dev__apple-patterns-check.SKILL.md
└── ...
```

Codex CLI expects `.SKILL.md` extensions. Subdirectories are omitted; only top-level `SKILL.md` content is included.

### Agy

**Strategy:** Flattened skills with prefixed filenames (same as Antigravity).

```
platforms/agy/skills/
├── apple-dev__apple-cleanup.md
└── ...
```

Agy's skill format is similar to Antigravity. We use the same flattening logic.

---

## Build Pipeline (`scripts/build.js`)

The build script is a pure Node.js script with no external dependencies.

### Steps

1. **Parse** — Reads YAML frontmatter from every `src/skills/*/SKILL.md`.
2. **Generate Claude** — `cp -R src/skills → platforms/claude/skills`, same for agents/commands. Writes `plugin.json`.
3. **Generate Cursor** — Same as Claude, writes Cursor-flavored `plugin.json`.
4. **Generate Kimi** —
   - Concatenates all skills into `platforms/kimi/apple-dev/SKILL.md` with `<!-- BEGIN/END SKILL -->` markers.
   - Generates `plugin.json` with tool declarations.
   - Copies shared scripts into `scripts/`.
5. **Generate Antigravity** — Copies each `SKILL.md` to `platforms/antigravity/skills/apple-dev__<name>.md`. Flattens subdirectories with `__` separators.
6. **Generate Codex** — Copies each `SKILL.md` to `platforms/codex/skills/apple-dev__<name>.SKILL.md`.
7. **Generate Agy** — Same as Antigravity.

### Running

```bash
node scripts/build.js
```

No `npm install` required.

---

## Validation Pipeline (`scripts/validate.js`)

Pre-build checks:

1. Every skill directory has a `SKILL.md`.
2. Every `SKILL.md` has valid YAML frontmatter with `name` and `description`.
3. No broken cross-references (optional, future).
4. No orphaned subdirectories without a parent `SKILL.md`.
5. Agent files have required frontmatter (`name`, `description`, `model`, `tools`).
6. Command files have required frontmatter (`description`).

```bash
node scripts/validate.js
```

---

## Installer (`install.sh`)

### Philosophy

- **Symlink when possible** — Instant updates via `git pull`.
- **Copy when necessary** — Platforms that don't support symlinks well (Kimi plugin registry) get copies.
- **Idempotent** — Re-running is safe.
- **Scope-aware** — `--global` (default) vs `--local`.

### Platform Detection Matrix

| Platform | Global Path | Local Path | Mechanism |
|----------|-------------|------------|-----------|
| Claude | `~/.claude/` | `.claude/` | Symlink |
| Cursor | `~/.cursor/` | `.cursor/` | Symlink |
| Kimi | `~/.kimi/plugins/` | `.kimi/plugins/` | Copy + `kimi plugin install` |
| Antigravity | `~/.gemini/antigravity/skills/` | `.agents/skills/` | Copy |
| Codex | `~/.codex/skills/` | `.codex/skills/` | Copy |
| Agy | `~/.agy/skills/` | `.agy/skills/` | Copy |

### MCP Install

The installer does **not** auto-configure MCP servers because they require credentials. It prints the exact command needed:

```bash
claude mcp add-json app-store-connect < platforms/claude/mcp.json
```

For platforms with different MCP config paths (Antigravity: `~/.gemini/antigravity/mcp_config.json`), the installer prints platform-specific instructions.

---

## CI/CD

### `build.yml`

Triggered on every push/PR:
1. Run `node scripts/validate.js`.
2. Run `node scripts/build.js`.
3. Fail if `git diff --name-only platforms/` shows uncommitted changes (ensures `platforms/` was regenerated).

### `release.yml`

Triggered on version tags (`v*`):
1. Run validation + build.
2. Create platform bundles as release artifacts:
   - `apple-dev-skills-claude.zip`
   - `apple-dev-skills-cursor.zip`
   - `apple-dev-skills-kimi.zip`
   - `apple-dev-skills-antigravity.zip`
   - `apple-dev-skills-codex.zip`
   - `apple-dev-skills-agy.zip`
3. Publish GitHub Release with changelog.

---

## Content Guidelines

### Writing Skills

1. **Frontmatter first** — Always include `name` and `description`.
2. **Self-contained** — A skill should make sense when loaded alone.
3. **Cross-reference by name** — Use "Load `ios-standards`" not "see `src/skills/ios-standards/SKILL.md`".
4. **Severity framework** — Use P0 (Critical), P1 (High), P2 (Medium), P3 (Low) consistently.
5. **Platform-neutral language** — Avoid "Claude Code will..." unless in agent definitions. Skills are consumed by multiple platforms.

### Writing Agents

1. **Model tier** — Declare Fast/Standard/Powerful. Map to provider equivalents.
2. **Tool list** — Be explicit about allowed tools.
3. **Escalation rules** — State when to escalate to a higher-tier agent.

### Writing Commands

1. **One purpose** — A command invokes exactly one skill.
2. **Argument hint** — Document expected arguments.
3. **No logic** — Commands are thin wrappers; logic lives in skills.

---

## Migration from `aether-agent-plugins`

If you are migrating from the monorepo:

1. All `plugins/apple-dev/skills/*` → `src/skills/*`
2. All `plugins/apple-dev/agents/*` → `src/agents/*`
3. All `plugins/apple-dev/commands/*` → `src/commands/*`
4. All `plugins/apple-dev/mcp/asc/*` → `src/mcp/asc/*`
5. Cross-references to other plugins (e.g., `core/git-workflow`) should be replaced with generic guidance or removed.
6. Run `node scripts/build.js` to regenerate all platform outputs.

---

## Future Improvements

1. **Granular Kimi plugins** — Instead of one consolidated plugin, offer themed plugins (`apple-dev-standards`, `apple-dev-build`, `apple-dev-asc`) for users who want smaller context windows.
2. **CLI installer** — npm package (`npx apple-dev-skills install --platform claude`) similar to `uipro-cli`.
3. **Live API docs** — Replace static `ios26-api-reference` with a tool that scrapes/fetches live Apple documentation.
4. **Test suite** — Unit tests for `scripts/build.js` and `scripts/validate.js`.
5. **Auto-publish** — GitHub Action to submit to Claude/Cursor marketplaces on release.
