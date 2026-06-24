#!/usr/bin/env node
/**
 * Build platform outputs from src/
 *
 * Usage: node scripts/build.js
 * No dependencies required.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PLATFORMS = path.join(ROOT, 'platforms');

function getVersion() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return pkg.version || '1.0.0';
  }
  return '1.0.0';
}

const VERSION = getVersion();

// Kimi Code slash command for overlay-sync. Kimi ships no progressive-disclosure
// skill dirs, so the command invokes the script bundled inside the installed
// plugin (scripts/overlay-sync.mjs), probing user- then project-scope installs.
// sync.mjs self-locates its templates relative to itself — no --templates-dir.
const KIMI_OVERLAY_SYNC_COMMAND = `---
description: "Scaffold/sync this project's overlay skills from .claude/apple-overlays.json, idempotently. Add --check for a no-write CI drift check."
argument-hint: "[--check] [--descriptor <path>]"
---

Run the overlay-sync script bundled with this plugin, from the project root, passing \`$ARGUMENTS\`:

\`\`\`bash
node "$(ls "\${KIMI_CODE_HOME:-$HOME/.kimi-code}/skills/apple-dev/scripts/overlay-sync.mjs" ./.kimi-code/skills/apple-dev/scripts/overlay-sync.mjs 2>/dev/null | head -1)" $ARGUMENTS
\`\`\`

It reads \`.claude/apple-overlays.json\`, fills each declared engine's bundled overlay
template, and regenerates \`.claude/skills/<prefix>-<engine>/SKILL.md\` — regenerating the
managed region only and preserving any hand-written tail. Idempotent: re-running with
unchanged inputs reports \`unchanged\`. \`--check\` makes no writes and exits non-zero if the
committed overlays have drifted (CI / pre-commit guard). The script self-locates its engine
templates (bundled at \`apple-dev/templates/<engine>/overlay-template.md\`).

Note: overlays are written to \`.claude/skills/\` (the Claude namespace). They are consumed by
Claude Code / cimi in this repo; standalone Kimi Code reads \`~/.kimi-code/skills/\`, so it
generates them but does not load them itself.
`;

// ─── Helpers ───

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content, raw: content };

  const lines = match[1].split('\n');
  const fm = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      // Remove surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      fm[key] = val;
    }
  }
  return { frontmatter: fm, body: match[2], raw: content };
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  cleanDir(dest);
  fs.cpSync(src, dest, { recursive: true });
}

// Flattened platforms (Codex / Agy / Antigravity) copy only SKILL.md + subdirs,
// so loose runnable files (e.g. overlay-sync/sync.mjs) would be dropped, breaking
// script-backed skills. Copy them alongside as <dir>__<file>. The overlay-sync
// script probes this <engine>__templates layout, so it stays runnable.
function copyLooseScripts(skillSrcDir, dir, dest) {
  for (const entry of fs.readdirSync(skillSrcDir, { withFileTypes: true })) {
    if (entry.isFile() && /\.(mjs|js|sh)$/.test(entry.name)) {
      fs.copyFileSync(path.join(skillSrcDir, entry.name), path.join(dest, `${dir}__${entry.name}`));
    }
  }
}

function getSkillDirs() {
  const skillsRoot = path.join(SRC, 'skills');
  if (!fs.existsSync(skillsRoot)) return [];
  return fs.readdirSync(skillsRoot)
    .filter(d => fs.statSync(path.join(skillsRoot, d)).isDirectory())
    .sort();
}

function getAgentFiles() {
  const agentsRoot = path.join(SRC, 'agents');
  if (!fs.existsSync(agentsRoot)) return [];
  return fs.readdirSync(agentsRoot).filter(f => f.endsWith('.md')).sort();
}

function getCommandFiles() {
  const cmdsRoot = path.join(SRC, 'commands');
  if (!fs.existsSync(cmdsRoot)) return [];
  return fs.readdirSync(cmdsRoot).filter(f => f.endsWith('.md')).sort();
}

// ─── MCP bundling ───
//
// Each src/mcp/<server> is a tiny tsc package that imports its runtime deps
// (@modelcontextprotocol/sdk, zod, jsonwebtoken) from node_modules — ~190MB
// across the three, far too heavy to ship in a marketplace plugin. So we bundle
// each server into a single self-contained ESM file with esbuild and drop it at
// platforms/claude/mcp/<server>/index.js. The per-server mcp.json references it
// via ${CLAUDE_PLUGIN_ROOT}/mcp/<server>/index.js, so a fresh marketplace install
// runs with zero extra steps and no node_modules.
//
// The createRequire banner lets bundled CJS deps (jsonwebtoken) use require()
// from inside the ESM output — the standard esbuild ESM-bundling shim.
function bundleClaudeMcpServers(dest) {
  const mcpRoot = path.join(SRC, 'mcp');
  if (!fs.existsSync(mcpRoot)) return;

  let esbuild;
  try {
    esbuild = require('esbuild');
  } catch {
    throw new Error(
      "esbuild is required to bundle the MCP servers. Run `npm install` at the repo root first."
    );
  }

  const servers = fs.readdirSync(mcpRoot).filter((d) => {
    const entry = path.join(mcpRoot, d, 'src', 'index.ts');
    return fs.existsSync(entry);
  }).sort();

  for (const server of servers) {
    const serverDir = path.join(mcpRoot, server);
    const entry = path.join(serverDir, 'src', 'index.ts');

    // esbuild resolves deps from the server's own node_modules; install if absent.
    if (!fs.existsSync(path.join(serverDir, 'node_modules'))) {
      console.log(`[claude]   installing ${server} deps...`);
      execFileSync('npm', ['ci'], { cwd: serverDir, stdio: 'inherit' });
    }

    const outfile = path.join(dest, 'mcp', server, 'index.js');
    console.log(`[claude]   bundling mcp/${server}...`);
    esbuild.buildSync({
      entryPoints: [entry],
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: 'node18',
      outfile,
      absWorkingDir: serverDir,
      logLevel: 'warning',
      banner: {
        js: "import { createRequire as __cr } from 'module'; const require = __cr(import.meta.url);",
      },
    });
  }
}

// ─── Platform Builders ───

function buildClaude() {
  const dest = path.join(PLATFORMS, 'claude');
  console.log('[claude] Building...');

  copyDir(path.join(SRC, 'skills'), path.join(dest, 'skills'));
  copyDir(path.join(SRC, 'agents'), path.join(dest, 'agents'));
  copyDir(path.join(SRC, 'commands'), path.join(dest, 'commands'));

  // Merge MCP config from every src/mcp/<server>/mcp.json
  const mcpRoot = path.join(SRC, 'mcp');
  if (fs.existsSync(mcpRoot)) {
    const merged = { _meta: [], mcpServers: {} };
    const servers = fs.readdirSync(mcpRoot)
      .filter(d => fs.existsSync(path.join(mcpRoot, d, 'mcp.json')))
      .sort();
    for (const server of servers) {
      const cfg = JSON.parse(fs.readFileSync(path.join(mcpRoot, server, 'mcp.json'), 'utf8'));
      if (cfg._meta) merged._meta.push(cfg._meta);
      Object.assign(merged.mcpServers, cfg.mcpServers || {});
    }
    if (servers.length) {
      fs.writeFileSync(path.join(dest, 'mcp.json'), JSON.stringify(merged, null, 2) + '\n');
    }
  }

  // Bundle each MCP server into platforms/claude/mcp/<server>/index.js so the
  // packaged plugin is self-contained (mcp.json points at ${CLAUDE_PLUGIN_ROOT}).
  cleanDir(path.join(dest, 'mcp'));
  bundleClaudeMcpServers(dest);

  const pluginJson = {
    name: 'apple-dev-skills',
    description: 'Apple platform development skills, agents, commands, and MCP servers (App Store Connect + Apple developer docs). Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, ASC API automation, and live Apple documentation lookup.',
    version: VERSION,
    author: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    repository: 'https://github.com/markdavidgan/apple-dev-skills',
    license: 'MIT',
    keywords: ['ios','swift','swiftui','swiftdata','xcode','apple','accessibility','concurrency','design','app-store-connect','testflight','mcp']
  };
  fs.writeFileSync(path.join(dest, 'plugin.json'), JSON.stringify(pluginJson, null, 2) + '\n');

  console.log('[claude] Done.');
}

function buildCursor() {
  const dest = path.join(PLATFORMS, 'cursor');
  console.log('[cursor] Building...');

  copyDir(path.join(SRC, 'skills'), path.join(dest, 'skills'));
  copyDir(path.join(SRC, 'agents'), path.join(dest, 'agents'));
  copyDir(path.join(SRC, 'commands'), path.join(dest, 'commands'));

  const pluginJson = {
    name: 'apple-dev-skills',
    displayName: 'Apple Dev Skills',
    version: VERSION,
    description: 'Apple platform development skills, agents, commands, and MCP servers (App Store Connect + Apple developer docs). Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, ASC API automation, and live Apple documentation lookup.',
    author: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    repository: 'https://github.com/markdavidgan/apple-dev-skills',
    license: 'MIT',
    keywords: ['ios','swift','swiftui','swiftdata','xcode','apple','accessibility','concurrency','design','app-store-connect','testflight','mcp'],
    skills: './skills/',
    agents: './agents/',
    commands: './commands/'
  };
  fs.writeFileSync(path.join(dest, 'plugin.json'), JSON.stringify(pluginJson, null, 2) + '\n');

  console.log('[cursor] Done.');
}

function buildKimi() {
  const dest = path.join(PLATFORMS, 'kimi', 'apple-dev');
  console.log('[kimi] Building consolidated plugin...');

  cleanDir(dest);
  fs.mkdirSync(path.join(dest, 'scripts'), { recursive: true });

  // Copy iOS 26 API reference data for api-lookup tool
  const apiRefSrc = path.join(SRC, 'skills', 'ios26-api-reference');
  if (fs.existsSync(apiRefSrc)) {
    fs.cpSync(apiRefSrc, path.join(dest, 'reference'), { recursive: true });
  }

  const skillDirs = getSkillDirs();

  // ── Build master SKILL.md (lightweight plugin-host stub) ──
  // The full skill index is emitted to reference/all-skills.md so it is available
  // on demand without being auto-injected into every Kimi session.
  const masterSkill = `---
name: apple-dev
description: Apple platform development plugin host for Kimi Code CLI. Provides pattern-check and api-lookup tools; load individual apple-dev skills by name.
disable-model-invocation: true
---

# Apple Dev Skills — Plugin Host

This directory hosts the Kimi-specific \`apple-dev\` plugin tools.

- \`pattern-check\` — Run mechanical Swift 6 / SwiftUI / SwiftData / entitlements / safety audit
- \`api-lookup\` — Query iOS 26 API signatures and anti-hallucination reference

For the full skill index, see \`reference/all-skills.md\`.
Load a specific skill by invoking its name, e.g. \`/skill:swift6-concurrency\`.
`;

  fs.writeFileSync(path.join(dest, 'SKILL.md'), masterSkill);

  // ── Build reference/all-skills.md index ──
  let indexMd = `# Apple Dev Skills — Index

| # | Skill | Domain | Description |\n|---|-------|--------|-------------|\n`;
  let idx = 1;
  for (const dir of skillDirs) {
    const skillPath = path.join(SRC, 'skills', dir, 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      console.warn(`[kimi] Skipping "${dir}" — no SKILL.md found`);
      continue;
    }
    const { frontmatter } = readFrontmatter(skillPath);
    const domain = dir.startsWith('ios') ? 'iOS' : (dir.startsWith('asc') ? 'ASC' : (dir.startsWith('apple') ? 'Quality' : 'Workflow'));
    indexMd += `| ${idx} | ${dir} | ${domain} | ${frontmatter.description || ''} |\n`;
    idx++;
  }
  fs.writeFileSync(path.join(dest, 'reference', 'all-skills.md'), indexMd);

  // ── Emit each skill as its own discoverable Kimi skill dir ──
  // Kimi Code discovers every <name>/SKILL.md under ~/.kimi-code/skills/, so we ship
  // the skills individually rather than concatenated into one master SKILL.md. This
  // restores metadata-first progressive disclosure (load ~100 tokens of frontmatter
  // per skill; pull a body in only when relevant) and keeps the Kimi output
  // structurally identical to every other platform's per-skill layout. Worst case —
  // if Kimi were to eager-load every body — is no worse than the old concatenation.
  const perSkillRoot = path.join(PLATFORMS, 'kimi', 'skills');
  cleanDir(perSkillRoot);
  let perSkillCount = 0;
  for (const dir of skillDirs) {
    const srcSkill = path.join(SRC, 'skills', dir);
    if (!fs.existsSync(path.join(srcSkill, 'SKILL.md'))) continue;
    const outDir = path.join(perSkillRoot, dir);
    if (dir === 'ios26-api-reference') {
      // The very large reference tree already ships via the api-lookup tool (copied
      // to apple-dev/reference/ above); emit only the skill body here to avoid
      // duplicating megabytes of API data into every Kimi session's skill index.
      fs.mkdirSync(outDir, { recursive: true });
      fs.copyFileSync(path.join(srcSkill, 'SKILL.md'), path.join(outDir, 'SKILL.md'));
    } else {
      // Copy verbatim: SKILL.md (name === dirname, enforced by validate.js) plus any
      // references/ subdirs, so per-skill progressive disclosure works inside Kimi too.
      fs.cpSync(srcSkill, outDir, { recursive: true });
    }
    perSkillCount++;
  }
  console.log(`[kimi] Emitted ${perSkillCount} individual skill dirs -> platforms/kimi/skills/`);

  // ── Generate plugin.json with tools ──
  const pluginJson = {
    name: 'apple-dev',
    version: VERSION,
    description: 'Apple platform development tools and knowledge for iOS, Swift, SwiftUI, and App Store Connect. Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, and ASC API automation.',
    author: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    repository: 'https://github.com/markdavidgan/apple-dev-skills',
    license: 'MIT',
    keywords: ['ios','swift','swiftui','swiftdata','xcode','apple','accessibility','concurrency','design','app-store-connect','testflight'],
    tools: [
      {
        name: 'pattern-check',
        description: 'Run Apple patterns validation (Swift 6, SwiftUI, SwiftData, entitlements, safety checks) via grep/shell audit.',
        command: ['bash', 'scripts/pattern-check.sh'],
        parameters: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'Project path to check (default: current directory)' },
            strict: { type: 'boolean', description: 'Enable strict mode (fail on P1+)' }
          }
        }
      },
      {
        name: 'api-lookup',
        description: 'Look up iOS 26 API signatures and anti-hallucination reference.',
        command: ['bash', 'scripts/api-lookup.sh'],
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'API name, framework, or keyword to look up' }
          },
          required: ['query']
        }
      }
    ]
  };
  fs.writeFileSync(path.join(dest, 'plugin.json'), JSON.stringify(pluginJson, null, 2) + '\n');

  // ── Copy shared scripts from src/scripts ──
  const srcScriptsDir = path.join(SRC, 'scripts');
  if (fs.existsSync(srcScriptsDir)) {
    const scriptFiles = fs.readdirSync(srcScriptsDir).filter(f => f.endsWith('.sh'));
    for (const script of scriptFiles) {
      fs.copyFileSync(path.join(srcScriptsDir, script), path.join(dest, 'scripts', script));
      fs.chmodSync(path.join(dest, 'scripts', script), 0o755);
    }
  }

  // ── Ship overlay-sync as a runnable command ──
  // The consolidated SKILL.md inlines every skill's prose, but overlay-sync is a
  // Node script that needs its engine templates as real files on disk. Ship the
  // script (scripts/overlay-sync.mjs) + each engine's template (templates/<engine>/)
  // + a slash command that invokes it. sync.mjs self-locates the templates via its
  // <scriptDir>/../templates/<engine>/overlay-template.md probe — no flag needed.
  const overlaySync = path.join(SRC, 'skills', 'overlay-sync', 'sync.mjs');
  const cmdDir = path.join(dest, 'commands');
  fs.mkdirSync(cmdDir, { recursive: true });
  if (fs.existsSync(overlaySync)) {
    fs.copyFileSync(overlaySync, path.join(dest, 'scripts', 'overlay-sync.mjs'));
    fs.chmodSync(path.join(dest, 'scripts', 'overlay-sync.mjs'), 0o755);
    for (const dir of skillDirs) {
      const tpl = path.join(SRC, 'skills', dir, 'templates', 'overlay-template.md');
      if (!fs.existsSync(tpl)) continue;
      const tplDest = path.join(dest, 'templates', dir);
      fs.mkdirSync(tplDest, { recursive: true });
      fs.copyFileSync(tpl, path.join(tplDest, 'overlay-template.md'));
    }
    fs.writeFileSync(path.join(cmdDir, 'overlay-sync.md'), KIMI_OVERLAY_SYNC_COMMAND);
  }

  // ── Ship generic slash commands ──
  // Every other src/commands/*.md becomes a Kimi slash command. These invoke the
  // matching skill inside the consolidated SKILL.md. Commands that dispatch Claude
  // agents include the skill's Kimi adaptation (sequential fallback) inline.
  const srcCmdDir = path.join(SRC, 'commands');
  for (const cmdFile of fs.readdirSync(srcCmdDir).filter(f => f.endsWith('.md'))) {
    if (cmdFile === 'overlay-sync.md') continue; // already emitted above
    const srcCmdPath = path.join(srcCmdDir, cmdFile);
    const { frontmatter, body } = readFrontmatter(srcCmdPath);
    const escapeQuotes = (s) => String(s || '').replace(/"/g, '\\"');
    const cmdFrontmatter = ['---', `description: "${escapeQuotes(frontmatter.description)}"`];
    if (frontmatter['argument-hint'] !== undefined) {
      cmdFrontmatter.push(`argument-hint: "${escapeQuotes(frontmatter['argument-hint'])}"`);
    }
    cmdFrontmatter.push('---');
    fs.writeFileSync(
      path.join(cmdDir, cmdFile),
      `${cmdFrontmatter.join('\n')}\n\n${body.trim()}\n`
    );
  }

  console.log('[kimi] Done.');
}

function buildAntigravity() {
  const dest = path.join(PLATFORMS, 'antigravity', 'skills');
  console.log('[antigravity] Building...');

  cleanDir(dest);
  const skillDirs = getSkillDirs();

  for (const dir of skillDirs) {
    const srcFile = path.join(SRC, 'skills', dir, 'SKILL.md');
    const destFile = path.join(dest, `apple-dev__${dir}.md`);
    fs.copyFileSync(srcFile, destFile);

    // Flatten subdirectories with __ separator
    const subdirs = fs.readdirSync(path.join(SRC, 'skills', dir))
      .filter(f => fs.statSync(path.join(SRC, 'skills', dir, f)).isDirectory());
    for (const sub of subdirs) {
      const subSrc = path.join(SRC, 'skills', dir, sub);
      const subDest = path.join(dest, `${dir}__${sub}`);
      fs.cpSync(subSrc, subDest, { recursive: true });
    }
    copyLooseScripts(path.join(SRC, 'skills', dir), dir, dest);
  }

  console.log('[antigravity] Done.');
}

function buildCodex() {
  const dest = path.join(PLATFORMS, 'codex', 'skills');
  console.log('[codex] Building...');

  cleanDir(dest);
  const skillDirs = getSkillDirs();

  for (const dir of skillDirs) {
    const srcDir = path.join(SRC, 'skills', dir);
    const destDir = path.join(dest, dir);
    fs.cpSync(srcDir, destDir, { recursive: true });
  }

  console.log('[codex] Done.');
}

function buildAgy() {
  const dest = path.join(PLATFORMS, 'agy', 'skills');
  console.log('[agy] Building...');

  cleanDir(dest);
  const skillDirs = getSkillDirs();

  for (const dir of skillDirs) {
    const srcFile = path.join(SRC, 'skills', dir, 'SKILL.md');
    const destFile = path.join(dest, `apple-dev__${dir}.md`);
    fs.copyFileSync(srcFile, destFile);

    // Flatten subdirectories with __ separator (Agy doesn't discover nested
    // dirs — referenced files must travel alongside the skill or they are lost).
    const subdirs = fs.readdirSync(path.join(SRC, 'skills', dir))
      .filter(f => fs.statSync(path.join(SRC, 'skills', dir, f)).isDirectory());
    for (const sub of subdirs) {
      const subSrc = path.join(SRC, 'skills', dir, sub);
      const subDest = path.join(dest, `${dir}__${sub}`);
      fs.cpSync(subSrc, subDest, { recursive: true });
    }
    copyLooseScripts(path.join(SRC, 'skills', dir), dir, dest);
  }

  console.log('[agy] Done.');
}

// Cross-CLI instruction files. CLAUDE.md is the single hand-edited source of
// truth; AGENTS.md (Codex / Kimi / any AGENTS.md-aware CLI) and GEMINI.md
// (Gemini CLI / Antigravity / Agy) are generated VERBATIM from it with only a
// per-CLI banner prepended. This replaces the old practice of hand-copying (and
// blind-find/replacing) CLAUDE.md, which silently corrupted AGENTS.md.
function buildInstructionFiles() {
  console.log('[instructions] Generating AGENTS.md + GEMINI.md from CLAUDE.md...');

  const claudePath = path.join(ROOT, 'CLAUDE.md');
  if (!fs.existsSync(claudePath)) {
    console.warn('[instructions] CLAUDE.md not found — skipping.');
    return;
  }

  let body = fs.readFileSync(claudePath, 'utf8');
  // Drop the leading H1 title; each generated file supplies its own.
  body = body.replace(/^#\s.*\n+/, '');

  const stamp = '<!-- GENERATED FROM CLAUDE.md by scripts/build.js — DO NOT EDIT. ' +
    'Edit CLAUDE.md, then run: node scripts/build.js -->';

  const targets = [
    {
      file: 'AGENTS.md',
      title: '# Apple Dev Skills — Agent Guide (Codex / Kimi / cross-CLI)',
      note:
        '> Cross-CLI copy of the project guide, generated verbatim from `CLAUDE.md`.\n' +
        '> Read by Codex CLI, Kimi Code, and any agent following the AGENTS.md convention.\n' +
        '>\n' +
        "> **Tool mapping:** Claude Code's `Skill` / `Agent` / `Read` / `Edit` / `Bash` tools\n" +
        '> map to your CLI\'s equivalents. Skills are markdown `SKILL.md` files discovered from\n' +
        '> your CLI\'s skills directory (Codex: `.agents/skills/`; Kimi: `~/.kimi-code/skills/`).\n' +
        '> See "Cross-Platform Constraints" below for per-CLI limits (e.g. no agents on\n' +
        '> Kimi / Codex; no commands on Codex).',
    },
    {
      file: 'GEMINI.md',
      title: '# Apple Dev Skills — Agent Guide (Gemini / Antigravity / Agy)',
      note:
        '> Cross-CLI copy of the project guide, generated verbatim from `CLAUDE.md`.\n' +
        '> Read by Gemini CLI, Antigravity, and Agy.\n' +
        '>\n' +
        "> **Tool mapping:** Claude Code's `Skill` / `Agent` / `Read` / `Edit` / `Bash` tools\n" +
        '> map to your CLI\'s equivalents (Gemini activates skills via `activate_skill`). Skills\n' +
        '> are markdown files discovered from `.agents/skills/` or `~/.gemini/...`. Subdirectories\n' +
        '> are flattened with `__` separators — see "Cross-Platform Constraints" below.',
    },
  ];

  for (const t of targets) {
    const content = `${stamp}\n\n${t.title}\n\n${t.note}\n\n---\n\n${body}`;
    fs.writeFileSync(path.join(ROOT, t.file), content);
    console.log(`[instructions] Wrote ${t.file}`);
  }
}

function buildRootMarketplaces() {
  console.log('[marketplace] Building root manifests...');

  // Claude marketplace
  const claudeMarketplace = {
    '$schema': 'https://anthropic.com/claude-code/marketplace.schema.json',
    name: 'apple-dev-skills',
    description: 'Apple platform development skills, agents, commands, and MCP servers (App Store Connect + Apple developer docs). Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, ASC API automation, and live Apple documentation lookup.',
    owner: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    plugins: [
      {
        name: 'apple-dev-skills',
        description: 'Apple platform development skills (ios-standards, ios26-api-reference, ios-design, accessibility, concurrency, apple-review, ASC build checks, submission prep, verify-against-spec, complete-feature, merge-check, regression-test), App Store Connect MCP server, and build agent.',
        source: './platforms/claude'
      }
    ]
  };
  fs.writeFileSync(
    path.join(__dirname, '..', '.claude-plugin', 'marketplace.json'),
    JSON.stringify(claudeMarketplace, null, 2) + '\n'
  );

  // Cursor marketplace
  const cursorMarketplace = {
    name: 'apple-dev-skills',
    owner: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    metadata: {
      description: 'Apple platform development skills, agents, commands, and MCP servers (App Store Connect + Apple developer docs). Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, ASC API automation, and live Apple documentation lookup.',
      version: VERSION
    },
    plugins: [
      {
        name: 'apple-dev-skills',
        source: 'platforms/cursor',
        description: 'Apple platform development skills (ios-standards, ios26-api-reference, ios-design, accessibility, concurrency, apple-review, ASC build checks, submission prep, verify-against-spec, complete-feature, merge-check, regression-test), App Store Connect MCP server, and build agent.'
      }
    ]
  };
  fs.writeFileSync(
    path.join(__dirname, '..', '.cursor-plugin', 'marketplace.json'),
    JSON.stringify(cursorMarketplace, null, 2) + '\n'
  );

  // Shared metadata for plugin manifests
  const sharedMetadata = {
    name: 'apple-dev-skills',
    version: VERSION,
    description: 'Apple platform development skills, reference, and MCP servers for AI coding agents. Covers Swift 6, SwiftUI, design, accessibility, concurrency, App Store Connect, testing, and App Store submission.',
    author: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    homepage: 'https://github.com/markdavidgan/apple-dev-skills',
    repository: 'https://github.com/markdavidgan/apple-dev-skills.git',
    license: 'MIT',
    keywords: ['ios', 'swift', 'swiftui', 'swiftdata', 'xcode', 'apple', 'app-store-connect', 'testflight']
  };

  const sharedInterface = {
    displayName: 'Apple Dev Skills',
    shortDescription: 'Apple platform development skills and MCP tools',
    longDescription: 'A collection of Apple-platform Agent Skills covering Swift 6, SwiftUI, design, accessibility, concurrency, App Store Connect, testing, and App Store submission. Also exposes MCP servers for live Apple docs lookup, App Store Connect API access, and semantic search across the bundled skills.',
    developerName: 'Mark David Gan',
    websiteURL: 'https://github.com/markdavidgan/apple-dev-skills'
  };

  // MCP server declarations (relative to plugin root) used by Kimi + Codex manifests.
  const mcpServers = {
    'apple-docs': {
      command: 'node',
      args: ['./src/mcp/apple-docs/dist/index.js']
    },
    'app-store-connect': {
      command: 'node',
      args: ['./src/mcp/asc/dist/index.js'],
      env: {
        ASC_KEY_ID: '${ASC_KEY_ID}',
        ASC_ISSUER_ID: '${ASC_ISSUER_ID}',
        ASC_KEY_PATH: '${ASC_KEY_PATH}'
      }
    },
    'skill-search': {
      command: 'node',
      args: ['./src/mcp/skill-search/dist/index.js'],
      env: {
        SKILL_SEARCH_ROOT: './platforms/kimi/skills'
      }
    }
  };

  // Root .mcp.json (used by Codex plugin manifest and available for manual installs).
  fs.writeFileSync(
    path.join(__dirname, '..', '.mcp.json'),
    JSON.stringify({ mcpServers }, null, 2) + '\n'
  );

  // Kimi marketplace + plugin manifest
  const kimiMarketplace = {
    name: 'apple-dev-skills',
    owner: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    metadata: {
      description: sharedMetadata.description,
      version: VERSION
    },
    plugins: [
      {
        name: 'apple-dev-skills',
        source: '.',
        description: `Apple platform development skills (${getSkillDirs().length} individual skills), pattern-check tool, iOS 26 API lookup tool, and Apple docs / App Store Connect / skill-search MCP servers for Kimi Code.`
      }
    ]
  };
  const kimiPluginDir = path.join(__dirname, '..', '.kimi-plugin');
  fs.mkdirSync(kimiPluginDir, { recursive: true });
  fs.writeFileSync(
    path.join(kimiPluginDir, 'marketplace.json'),
    JSON.stringify(kimiMarketplace, null, 2) + '\n'
  );
  fs.writeFileSync(
    path.join(kimiPluginDir, 'plugin.json'),
    JSON.stringify({
      ...sharedMetadata,
      interface: sharedInterface,
      skills: './platforms/kimi/skills/',
      mcpServers
    }, null, 2) + '\n'
  );

  // Codex plugin manifest
  const codexPluginDir = path.join(__dirname, '..', '.codex-plugin');
  fs.mkdirSync(codexPluginDir, { recursive: true });
  fs.writeFileSync(
    path.join(codexPluginDir, 'plugin.json'),
    JSON.stringify({
      ...sharedMetadata,
      interface: sharedInterface,
      skills: './platforms/codex/skills/',
      mcpServers: './.mcp.json'
    }, null, 2) + '\n'
  );

  console.log('[marketplace] Done.');
}

function writeCompatibilityMatrix() {
  const outPath = path.join(PLATFORMS, 'COMPATIBILITY.md');
  const content = `# Build-Generated Compatibility Matrix

> Auto-generated by scripts/build.js. Do not edit manually.

| Skill | Claude | Cursor | Kimi | Antigravity | Codex | Agy |
|-------|:------:|:------:|:----:|:-----------:|:-----:|:---:|
`;

  const skillDirs = getSkillDirs();
  const lines = skillDirs.map(dir => {
    const hasSubdirs = fs.readdirSync(path.join(SRC, 'skills', dir))
      .some(f => fs.statSync(path.join(SRC, 'skills', dir, f)).isDirectory());
    const agy = hasSubdirs ? '⚠️' : '✅';
    const antigravity = hasSubdirs ? '⚠️' : '✅';
    return `| ${dir} | ✅ | ✅ | ✅ | ${antigravity} | ✅ | ${agy} |`;
  });

  fs.writeFileSync(outPath, content + lines.join('\n') + '\n');
}

// ─── Main ───
function main() {
  console.log('=== Apple Dev Skills Build ===\n');

  if (!fs.existsSync(SRC)) {
    console.error('Error: src/ directory not found.');
    process.exit(1);
  }

  fs.mkdirSync(PLATFORMS, { recursive: true });

  buildClaude();
  buildCursor();
  buildKimi();
  buildAntigravity();
  buildCodex();
  buildAgy();
  buildInstructionFiles();
  buildRootMarketplaces();
  writeCompatibilityMatrix();

  console.log('\n=== Build Complete ===');
  console.log('Outputs written to platforms/');
}

main();
