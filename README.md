# Apple Dev Skills

A comprehensive, multi-platform plugin set for Apple platform development. Covers Swift 6, SwiftUI, SwiftData, iOS 26+ APIs, design systems, accessibility, App Store Connect automation, testing, and advanced quality workflows.

**Platforms:** Claude Code · Cursor · Kimi Code · Antigravity · Codex CLI · Agy

---

## What's Included

### 44 Skills

> Expanding per the [roadmap](docs/roadmap.md). Skills are grouped by `category:` (design · engineering · product · asc · quality · workflow).

| Skill | Domain | Purpose |
|-------|--------|---------|
| `app-brand-identity` | Design | Brand identity system — wordmark, icon, design tokens, brand voice, App Store marketing assets |
| `app-store-pricing` | Business | Pricing tiers, global equalization, subscriptions, regional pricing via Apple's 900-price-point system |
| `apple-foundation-models` | Engineering | On-device AI (iOS 26) — LanguageModelSession, guided generation (`@Generable`), streaming, tool calling |
| `asc-aso` | Product | App Store Optimization — keyword strategy, localized metadata, conversion-rate optimization |
| `privacy-manifest` | Quality | `PrivacyInfo.xcprivacy` + required-reason APIs — avoid ITMS-91053/91061 rejections |
| `storekit-purchases` | Engineering | StoreKit 2 IAP/subscriptions — purchase, verify, entitlements, restore, StoreKit views |
| `swift-testing` | Engineering | Swift Testing framework — `@Test`/`#expect`, suites, parameterized tests, XCTest migration |
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
| `app-intents` | Engineering | App Intents, App Shortcuts, interactive widgets/controls, Live Activities & Dynamic Island |
| `push-notifications` | Engineering | UNUserNotificationCenter, APNs payloads, actionable & rich notifications, Live Activity push |
| `networking` | Engineering | URLSession async/await, typed Sendable API client, parallelism, retry/backoff, offline handling |
| `cloudkit-sync` | Engineering | SwiftData + CloudKit sync, schema rules, Dev/Prod deployment, CKShare sharing |
| `app-security` | Engineering | Keychain, Sign in with Apple, biometrics, CryptoKit, App Attest, certificate pinning |
| `performance-instruments` | Quality | Launch time, hangs/hitches, memory/leaks, energy — Instruments, signposts, MetricKit |
| `localization` | Engineering | String Catalogs, plurals/grammar, RTL, locale formatting, pseudolocalization |
| `product-spec` | Product | PRD/spec — problem, goals/non-goals, user stories, acceptance criteria, success metrics |
| `paywall-design` | Design | High-converting, App Review-compliant paywalls — value framing, trials, legal elements |
| `app-analytics` | Product | North-star metric, activation/retention/conversion funnels, event taxonomy, App Analytics |
| `cross-platform-adaptivity` | Design | Adapt one SwiftUI codebase across iPhone, iPad, Mac, Watch, TV, Vision Pro |
| `design-contract` | Design | Turn a mockup into a machine-readable design contract + co-located preview/capture |
| `preview-capture` | Design | Render named SwiftUI `#Preview`s to PNG at canonical device resolution |
| `swiftui-micro-craft` | Design | Quantified rules + mechanical auditor for Apple-grade SwiftUI micro-craft |
| `design-handoff` | Design | Current, labeled screenshot package for an external design reviewer, reusing the existing screenshot UITest + fastlane lane |
| `overlay-sync` | Meta | Idempotently scaffold/sync a project's overlay skills from one `.claude/apple-overlays.json` descriptor |

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

### 19 Commands

| Command | Skill | Purpose |
|---------|-------|---------|
| `/apple-check` | `apple-patterns-check` | Fast pattern validation |
| `/aso-audit` | `asc-aso` | App Store Optimization audit (keywords, metadata, conversion) |
| `/perf-audit` | `performance-instruments` | Profile a perf complaint and fix the biggest contributor |
| `/security-check` | `app-security` | Audit credential storage, auth, crypto, data protection |
| `/write-spec` | `product-spec` | Draft a PRD — goals, user stories, acceptance criteria, metrics |
| `/apple-cleanup` | `apple-cleanup` | Engineering hardening pipeline |
| `/apple-polish` | `apple-polish` | Design & keynote polish pipeline |
| `/apple-review` | `apple-review` | Full 4-panel review (no fixes) |
| `/arch-diagram` | `apple-architecture-diagram` | Self-contained HTML architecture diagram |
| `/check-build` | `asc-build-check` | CI build status & failure debugging via ASC |
| `/complete-feature` | `complete-feature` | Feature completion gate |
| `/merge-check` | `merge-check` | Pre-merge quality gate |
| `/prepare-submission` | `asc-submission` | Submission readiness, metadata, screenshots, signing |
| `/privacy-check` | `privacy-manifest` | Required-reason API scan + `PrivacyInfo.xcprivacy` completeness |
| `/regression-test` | `regression-test` | Failing test → fix → sibling pattern check |
| `/setup-asc` | — | ASC MCP server authentication setup |
| `/swift6-fix` | `swift6-concurrency` | Diagnose & fix Swift 6 concurrency errors |
| `/design-handoff` | `design-handoff` | Build a current screenshot package for design review |
| `/overlay-sync` | `overlay-sync` | Scaffold/sync project overlay skills from the descriptor |

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

**Project-local (recommended — keeps sessions lean):**

```bash
# Run from the project where you want Apple Dev Skills available
/path/to/apple-dev-skills/install.sh --platform kimi --local
```

Installs the skill into `./.kimi-code/skills/apple-dev/` and writes `./.kimi-code/mcp.json` with the Apple MCP servers. The servers will only load when you open that project in Kimi Code.

Add `.kimi-code/` to the project's `.gitignore` so machine paths and credentials are never committed:

```gitignore
# Kimi Code local settings, MCP config, and skill working files
.kimi-code/
```

**User-global (loads in every session):**

```bash
./install.sh --platform kimi --global
```

Installs the skill to `~/.kimi-code/skills/apple-dev/` but does **not** write a global MCP config. Global `~/.kimi-code/mcp.json` loads in every Kimi session and consumes context; prefer project-local configs.

**MCP credentials**

For a project-local install, export `ASC_KEY_ID`, `ASC_ISSUER_ID`, and `ASC_KEY_PATH` before running the installer and they will be written into `./.kimi-code/mcp.json` automatically. If you prefer, you can create or edit the file manually — the shape is the same as Claude's MCP config:

```jsonc
// <project>/.kimi-code/mcp.json
{
  "mcpServers": {
    "apple-docs":        { "command": "node", "args": ["<repo>/src/mcp/apple-docs/dist/index.js"] },
    "app-store-connect": { "command": "node", "args": ["<repo>/src/mcp/asc/dist/index.js"],
                           "env": { "ASC_KEY_ID": "…", "ASC_ISSUER_ID": "…", "ASC_KEY_PATH": "…" } }
  }
}
```

Or run `/mcp-config` inside Kimi Code to add them interactively. Restart Kimi (or `/new`) to load — MCP servers attach at session start.

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

## Machine-Agnostic Design

This repo ships **code + placeholder configs only**. Nothing machine-specific (absolute clone paths, API credentials) is ever committed — so you can clone it anywhere, on any machine, without edits to tracked files.

**What's in the repo (portable):**
- `src/mcp/*/mcp.json` use a literal `<REPO_PATH>` placeholder for the clone location and `${ASC_KEY_ID}`-style env-var references for secrets — never real paths or keys.
- `install.sh` derives `REPO_ROOT` at runtime (`$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)`) and prints fully-resolved commands for your machine.

**What lives outside the repo (per-machine, never committed):**
- **Claude Code** — registered servers + ASC credentials in `~/.claude.json` (written by `claude mcp add-json`).
- **Kimi Code** — registered servers + ASC credentials in `~/.kimi-code/mcp.json` (user-global) or `<project>/.kimi-code/mcp.json`.

When you register a server **manually** (not via `install.sh`), substitute the `<REPO_PATH>` placeholder with your actual clone path and supply real values for the `${ASC_*}` env vars. `install.sh` prints these already-resolved for you.

> ⚠️ Keep credentials out of the repo. The `.p8` key, key ID, and issuer ID belong only in `~/.claude.json` / `~/.kimi-code/mcp.json` (or your shell env) — never in any tracked file.

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
│   ├── skills/             # 44 skill directories
│   ├── agents/             # 7 agent definitions
│   ├── commands/           # 19 command definitions
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
| Skills (all 44) | ✅ | ✅ | ✅* | ✅ | ✅ | ✅ |
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
