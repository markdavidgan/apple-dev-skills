# Platform Compatibility

This matrix shows how each feature maps across supported AI platforms.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Fully supported, native mechanism |
| ⚠️ | Supported with workaround or limitation |
| ❌ | Not supported by platform |
| N/A | Not applicable |

---

## Feature Matrix

| Feature | Claude Code | Cursor | Kimi Code | Antigravity | Codex CLI | Agy |
|---------|:-----------:|:------:|:---------:|:-----------:|:---------:|:---:|
| **Skills** |
| All 22 skills | ✅ | ✅ | ⚠️* | ✅ | ✅ | ✅ |
| Nested skill dirs | ✅ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ |
| Skill sub-files | ✅ | ✅ | ❌ | ⚠️ | ❌ | ⚠️ |
| **Agents** |
| Agent definitions | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Subagent dispatch | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Commands** |
| Slash commands | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Tools / Plugins** |
| Executable tools | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| MCP servers | ✅ | ✅ | ✅** | ✅** | ❌ | ❌ |
| **Install Methods** |
| Git clone + symlink | ✅ | ✅ | N/A | N/A | N/A | N/A |
| Native plugin install | ✅ | ✅ | ✅ | N/A | N/A | N/A |
| Marketplace | ✅ | ✅ | N/A | N/A | N/A | N/A |
| **Update Mechanism** |
| `git pull` | ✅ | ✅ | `kimi plugin update` | `git pull` + recopy | `git pull` + recopy | `git pull` + recopy |

\* Kimi consolidates all 22 skills into one master `SKILL.md`. Knowledge is complete; granularity is lost.  
\** MCP requires manual JSON config. Platform-specific paths differ.

---

## Platform-Specific Notes

### Claude Code

**Strengths:** Full feature support. Native skills, agents, commands, MCP. Best experience for complex multi-agent workflows (`apple-cleanup`, `apple-review`, `complete-feature`).

**Install:**
```bash
./install.sh --platform claude
```

**Marketplace:**
```
/plugin marketplace add markdavidgan/apple-dev-skills
/plugin install apple-dev-skills
```

**MCP Config:**
```bash
claude mcp add-json app-store-connect < platforms/claude/mcp.json
```

**Agents Available:**
- `build-agent` — Fast build troubleshooting
- `auditor` — Deep codebase analysis
- `ios-code-reviewer` — Changed-files review

**Commands Available:**
- `/apple-check`, `/apple-cleanup`, `/apple-polish`, `/apple-review`, `/complete-feature`, `/setup-asc`

---

### Cursor

**Strengths:** Full feature support. Skills, agents, and commands work identically to Claude Code. Marketplace integration for teams.

**Install:**
```bash
./install.sh --platform cursor
```

**Marketplace:** Import repo URL in Settings → Plugins.

**MCP Config:** Same as Claude; Cursor reads MCP configs from `~/.cursor/mcp.json` or project-level config.

**Agents/Commands:** Same set as Claude Code.

---

### Kimi Code

**Strengths:** Native plugin system with executable tools. Skills + tools combination is powerful. Good for users who want interactive validation (pattern checks, API lookups).

**Limitations:**
- Only **one `SKILL.md` per plugin** is discovered. Nested skill directories are ignored.
- No agents or commands. Complex multi-phase workflows (like `apple-cleanup`) must be executed as step-by-step instructions rather than dispatched subagents.
- Large consolidated skill may consume significant context window.

**Install:**
```bash
kimi plugin install https://github.com/markdavidgan/apple-dev-skills
```

Or local:
```bash
./install.sh --platform kimi
```

**Tools Available:**
- `pattern-check` — Validate Swift 6, SwiftUI, SwiftData patterns
- `api-lookup` — Query iOS 26 API signatures

**MCP Config:** Kimi supports MCP servers but configures them separately from plugins. See Kimi docs for `mcpServers` config.

**Workflow Adaptation:**
Skills that rely on subagent dispatch (`apple-cleanup`, `apple-review`, `complete-feature`, `merge-check`) include a "Kimi Adaptation" section with sequential step-by-step instructions.

---

### Antigravity

**Strengths:** Reads `.claude/skills/` natively, so Claude-formatted skills work. Supports rules/instructions via `.agents/rules/`.

**Limitations:**
- No agents or commands.
- No subagent dispatch.
- Skills are loaded as flat files; subdirectory structure is flattened.

**Install:**
```bash
./install.sh --platform antigravity
```

**Paths:**
- Global: `~/.gemini/antigravity/skills/apple-dev/`
- Local: `.agents/skills/apple-dev/`

**Rules:** Optionally copy `platforms/claude/agents/` content into `.agents/rules/` if you want agent-like behavior as rules.

**MCP Config:** `~/.gemini/antigravity/mcp_config.json`

---

### Codex CLI

**Strengths:** Simple skill discovery from `~/.codex/skills/`.

**Limitations:**
- Only `.SKILL.md` files are discovered.
- No agents, commands, or MCP.
- Subdirectories not supported.

**Install:**
```bash
./install.sh --platform codex
```

**Paths:**
- Global: `~/.codex/skills/apple-dev/`
- Local: `.codex/skills/apple-dev/`

---

### Agy

**Status:** Experimental support. Agy's skill format is inferred from existing tooling.

**Install:**
```bash
./install.sh --platform agy
```

**Paths:**
- Global: `~/.agy/skills/apple-dev/`
- Local: `.agy/skills/apple-dev/`

---

## Recommended Platform by Use Case

| Use Case | Recommended Platform | Why |
|----------|---------------------|-----|
| Full Apple dev lifecycle | **Claude Code** | Agents + commands + MCP + subagents |
| IDE-integrated workflow | **Cursor** | Same features as Claude, inside IDE |
| Fast pattern checks & API lookup | **Kimi Code** | Native tools + consolidated knowledge |
| Gemini ecosystem users | **Antigravity** | Native skill reading, no config friction |
| Minimal setup, OpenAI stack | **Codex CLI** | Simple skill drop-in |

---

## Adding a New Platform

To add support for a new platform (e.g., Windsurf, Continue):

1. **Research** the platform's skill/agent/command format and discovery paths.
2. **Add a template** in `src/_templates/<platform>/`.
3. **Add a builder** in `scripts/build.js`.
4. **Add an installer path** in `install.sh`.
5. **Document** in this file and `README.md`.
6. **Test** by installing locally.
