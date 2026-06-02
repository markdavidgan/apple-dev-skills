# Apple Dev Skills

A comprehensive, multi-platform plugin set for Apple platform development. Covers Swift 6, SwiftUI, SwiftData, iOS 26+ APIs, design systems, accessibility, App Store Connect automation, testing, and advanced quality workflows.

**Platforms:** Claude Code · Cursor · Kimi Code · Antigravity · Codex CLI · Agy

---

## What's Included

### 22 Skills

| Skill | Domain | Purpose |
|-------|--------|---------|
| `app-brand-identity` | Design | Brand identity system — wordmark, icon, design tokens, brand voice, App Store marketing assets |
| `app-store-pricing` | Business | Pricing tiers, global equalization, subscriptions, regional pricing via Apple's 900-price-point system |
| `apple-architecture-diagram` | Docs | WWDC-keynote-ready, self-contained HTML architecture diagrams for Apple platform apps |
| `apple-cleanup` | Quality | Exhaustive engineering hardening pipeline (P0–P2 fix → optimize → TestFlight) |
| `apple-design` | Design | SwiftUI design system, iOS 26 Liquid Glass, design tokens, accessibility-aware previews |
| `apple-patterns-check` | Quality | Fast mechanical validation of Swift 6, SwiftUI, SwiftData, entitlements, safety |
| `apple-polish` | Design | Design & keynote-readiness review → fix → TestFlight |
| `apple-review` | Quality | 4-panel review (Design + Engineering + Compliance + Keynote) |
| `asc-build-check` | ASC | CI build status/debug via App Store Connect MCP tools |
| `asc-submission` | ASC | App Store submission prep, metadata, TestFlight distribution |
| `complete-feature` | Workflow | Feature completion validation with parallel subagents |
| `ios-accessibility` | Design | VoiceOver, Dynamic Type, tap targets, semantic grouping audit |
| `ios-asc` | ASC | App Store Connect MCP tools reference |
| `ios-build` | Engineering | Build system patterns, XcodeGen, 4-layer validation, CI/CD |
| `ios-simulate` | Engineering | iOS Simulator workflows, screenshot automation, device management |
| `ios-standards` | Engineering | Swift 6.0+ standards, strict concurrency, `@Observable`, `@MainActor` |
| `ios-test` | Engineering | XCTest patterns, SwiftData in-memory testing, UI testing, perf budgets |
| `ios26-api-reference` | Reference | 3-tier API reference preventing hallucinated APIs |
| `merge-check` | Quality | Pre-merge quality gate with 4 parallel subagents |
| `regression-test` | Quality | Bug-fix workflow: failing test → fix → sibling pattern check |
| `swift6-concurrency` | Engineering | Swift 6 concurrency error patterns and fixes |
| `verify-against-spec` | Workflow | Parallel spec coverage verification |

### 7 Agents

| Agent | Tier | Purpose |
|-------|------|---------|
| `architect` | Deep | Architectural decisions, ADR creation, system design |
| `auditor` | Standard | Deep codebase analysis, architectural & compliance audits |
| `build-agent` | Fast | iOS/Swift build & compilation troubleshooting |
| `code-reviewer` | Standard | Code review for quality, security, and best practices |
| `coder` | Standard | General-purpose coding — features, bug fixes, tests |
| `explore` | Fast | Fast codebase exploration and pattern search |
| `ios-code-reviewer` | Standard | Changed-files-only review against iOS 26 crash patterns |

### 12 Commands

| Command | Skill | Purpose |
|---------|-------|---------|
| `/apple-check` | `apple-patterns-check` | Fast pattern validation |
| `/apple-cleanup` | `apple-cleanup` | Engineering hardening pipeline |
| `/apple-polish` | `apple-polish` | Design & keynote polish pipeline |
| `/apple-review` | `apple-review` | Full 4-panel review (no fixes) |
| `/arch-diagram` | `apple-architecture-diagram` | Self-contained HTML architecture diagram |
| `/check-build` | `asc-build-check` | CI build status & failure debugging via ASC |
| `/complete-feature` | `complete-feature` | Feature completion gate |
| `/merge-check` | `merge-check` | Pre-merge quality gate |
| `/prepare-submission` | `asc-submission` | Submission readiness, metadata, screenshots, signing |
| `/regression-test` | `regression-test` | Failing test → fix → sibling pattern check |
| `/setup-asc` | — | ASC MCP server authentication setup |
| `/swift6-fix` | `swift6-concurrency` | Diagnose & fix Swift 6 concurrency errors |

### MCP Servers

**App Store Connect MCP** (`mcp/asc/`) — 80+ tools for CI/builds, TestFlight, signing, provisioning, metadata, app submission, IAP, and screenshots. Requires an ASC API key.

**Apple Docs MCP** (`mcp/apple-docs/`) — 4 tools (`search_docs`, `get_symbol`, `list_framework`, `check_availability`) that search and read Apple's official developer documentation from the live DocC data layer. No auth; fetches on demand and caches JSON locally.

---

## Installation

### Quick Install (Recommended)

```bash
# Clone anywhere you want
git clone https://github.com/markdavidgan/apple-dev-skills.git
cd apple-dev-skills

# Install for your platform
./install.sh --platform claude       # Claude Code
./install.sh --platform cursor       # Cursor
./install.sh --platform kimi         # Kimi Code
./install.sh --platform antigravity  # Antigravity
./install.sh --platform codex        # Codex CLI
./install.sh --platform agy          # Agy

# Or install to all detected platforms
./install.sh --platform all
```

### Per-Platform Details

#### Claude Code

**Marketplace:**
```
/plugin marketplace add markdavidgan/apple-dev-skills
/plugin install apple-dev-skills
```

**Manual:**
```bash
./install.sh --platform claude
```

Installs to `~/.claude/skills/`, `~/.claude/agents/`, `~/.claude/commands/`.

#### Cursor

**Marketplace:** Import repo URL in Cursor → Plugins → Add Marketplace.

**Manual:**
```bash
./install.sh --platform cursor
```

Installs to `~/.cursor/skills/`, `~/.cursor/agents/`, `~/.cursor/commands/`.

#### Kimi Code

```bash
./install.sh --platform kimi
```

Installs the consolidated skill to `~/.kimi-code/skills/apple-dev/` (one `SKILL.md` + bundled `scripts/`), which Kimi Code auto-discovers on restart. Note: Kimi Code has **no MCP support**, so the App Store Connect and Apple Docs MCP servers are Claude Code / Cursor only — in Kimi the bundled `scripts/` (`pattern-check`, `api-lookup`) provide the equivalent interactivity.

#### Antigravity

```bash
./install.sh --platform antigravity
```

Installs skills to `~/.gemini/antigravity/skills/apple-dev/`.

#### Codex CLI

```bash
./install.sh --platform codex
```

Installs skills to `~/.codex/skills/apple-dev/`.

#### Agy

```bash
./install.sh --platform agy
```

Installs skills to `~/.agy/skills/apple-dev/`.

### Local (Project-Scoped) Install

Add `--local` to install into the current project directory (e.g., `.claude/`, `.cursor/`, `.kimi/`) instead of the global user directory:

```bash
./install.sh --platform claude --local
```

### MCP Server Setup

Each MCP server requires a one-time build:

```bash
# App Store Connect
cd src/mcp/asc && npm install && npm run build

# Apple Docs
cd src/mcp/apple-docs && npm install && npm run build
```

**App Store Connect** needs auth (requires an Apple Developer API key):

```bash
# Claude Code
claude mcp add-json app-store-connect < src/mcp/asc/mcp.json

# Or run the setup command
/setup-asc
```

**Apple Docs** needs no auth — register it directly:

```bash
claude mcp add-json apple-docs < src/mcp/apple-docs/mcp.json
```

---

## Updating

```bash
cd apple-dev-skills
git pull
./install.sh --platform <your-platform>
```

Symlink-based installs update instantly. Copied installs require re-running `./install.sh`.

---

## Repository Structure

```
apple-dev-skills/
├── src/                    # Source of truth (canonical content)
│   ├── skills/             # 22 skill directories
│   ├── agents/             # 7 agent definitions
│   ├── commands/           # 12 command definitions
│   └── mcp/                # MCP servers (asc, apple-docs)
├── platforms/              # Generated platform outputs
│   ├── claude/             # Claude Code bundle
│   ├── cursor/             # Cursor bundle
│   ├── kimi/apple-dev/     # Kimi plugin (consolidated skill + tools)
│   ├── antigravity/        # Antigravity skills
│   ├── codex/              # Codex skills
│   └── agy/                # Agy skills
├── scripts/
│   ├── build.js            # Build platform outputs from src/
│   └── validate.js         # Validate skills before build (--watch, --compact)
├── .vscode/
│   ├── tasks.json          # VS Code tasks: Validate Skills (watch / once)
│   └── settings.json       # Editor associations
├── install.sh              # Cross-platform installer
└── docs/
    ├── architecture.md
    └── platform-compatibility.md
```

---

## Building from Source

If you modify `src/`, regenerate platform outputs:

```bash
node scripts/build.js
```

Validate before building:

```bash
node scripts/validate.js              # one-shot validation
node scripts/validate.js --watch      # watch mode (re-runs on file changes)
node scripts/validate.js --compact    # machine-readable output (for CI / problem matchers)
```

**VS Code:** Open the command palette → `Tasks: Run Task` → `Validate Skills (watch)` for continuous validation as you edit.

---

## Platform Compatibility

See [docs/platform-compatibility.md](docs/platform-compatibility.md) for the full feature matrix.

| Feature | Claude | Cursor | Kimi | Antigravity | Codex | Agy |
|---------|--------|--------|------|-------------|-------|-----|
| Skills (all 22) | ✅ | ✅ | ✅* | ✅ | ✅ | ✅ |
| Agents | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Commands | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| MCP Server | ✅ | ✅ | ✅** | ✅** | ❌ | ❌ |

\* Kimi consolidates all skills into one master `SKILL.md` + executable tools.  
\** MCP requires manual config; see docs.

---

## Versioning

This repo uses **semantic versioning** from `package.json` as the single source of truth.

```bash
# Bump version and propagate to all platform manifests
node scripts/bump-version.js patch   # 1.0.0 → 1.0.1
node scripts/bump-version.js minor   # 1.0.0 → 1.1.0
node scripts/bump-version.js major   # 1.0.0 → 2.0.0
node scripts/bump-version.js 1.2.3   # set exact version

# Rebuild all platform outputs with the new version
node scripts/build.js

# Regenerate the catalog
node scripts/generate-catalog.js
```

Then commit, tag, and push:

```bash
git add .
git commit -m "v1.0.1"
git tag -a v1.0.1 -m "v1.0.1"
git push && git push origin v1.0.1
```

CI runs automatically on every PR and push. Claude Marketplace, Cursor Marketplace, and Kimi plugin registry all read version from their respective `plugin.json` manifests, which are kept in sync by `scripts/build.js`.

---

## License

MIT
