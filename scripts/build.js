#!/usr/bin/env node
/**
 * Build platform outputs from src/
 *
 * Usage: node scripts/build.js
 * No dependencies required.
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const PLATFORMS = path.join(__dirname, '..', 'platforms');

function getVersion() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return pkg.version || '1.0.0';
  }
  return '1.0.0';
}

const VERSION = getVersion();

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

// ─── Platform Builders ───

function buildClaude() {
  const dest = path.join(PLATFORMS, 'claude');
  console.log('[claude] Building...');

  copyDir(path.join(SRC, 'skills'), path.join(dest, 'skills'));
  copyDir(path.join(SRC, 'agents'), path.join(dest, 'agents'));
  copyDir(path.join(SRC, 'commands'), path.join(dest, 'commands'));

  // Copy MCP config
  const mcpJsonSrc = path.join(SRC, 'mcp', 'asc', 'mcp.json');
  if (fs.existsSync(mcpJsonSrc)) {
    fs.copyFileSync(mcpJsonSrc, path.join(dest, 'mcp.json'));
  }

  const pluginJson = {
    name: 'apple-dev-skills',
    description: 'Apple platform development skills, agents, commands, and App Store Connect MCP server. Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, and ASC API automation.',
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
    description: 'Apple platform development skills, agents, commands, and App Store Connect MCP server. Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, and ASC API automation.',
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

  // ── Build master SKILL.md ──
  let masterSkill = `---
name: apple-dev
description: Comprehensive Apple platform development skill covering Swift 6, SwiftUI, design, accessibility, concurrency, App Store Connect, testing, and advanced workflows. Master reference for iOS 26+ development.
---

# Apple Dev Skills — Master Reference

> **Platform Note:** This is a consolidated skill for Kimi Code. All ${skillDirs.length} apple-dev skills are included below. For granular skill loading, use Claude Code or Cursor.
> **Repository:** https://github.com/markdavidgan/apple-dev-skills

## Table of Contents

| # | Skill | Domain | Description |
|---|-------|--------|-------------|
`;

  let idx = 1;
  for (const dir of skillDirs) {
    const skillPath = path.join(SRC, 'skills', dir, 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      console.warn(`[kimi] Skipping "${dir}" — no SKILL.md found`);
      continue;
    }
    const { frontmatter } = readFrontmatter(skillPath);
    const domain = dir.startsWith('ios') ? 'iOS' : (dir.startsWith('asc') ? 'ASC' : (dir.startsWith('apple') ? 'Quality' : 'Workflow'));
    masterSkill += `| ${idx} | ${dir} | ${domain} | ${frontmatter.description || ''} |\n`;
    idx++;
  }

  masterSkill += `
---

## How to Use This Reference

This document contains all Apple Dev Skills concatenated in order. Use the Table of Contents above to navigate.
Each skill is bounded by \`<!-- BEGIN SKILL: name -->\` and \`<!-- END SKILL: name -->\` markers.

For **executable validation**, use the plugin tools:
- \`pattern-check\` — Run mechanical Swift 6 / SwiftUI / SwiftData / entitlements validation
- \`api-lookup\` — Query iOS 26 API signatures and anti-hallucination references

---

`;

  // ios26-api-reference ships its (very large) reference tree via the api-lookup
  // tool (copied to dest/reference/ above), so it must NOT be inlined here.
  const INLINE_REF_EXCLUDE = new Set(['ios26-api-reference']);

  for (const dir of skillDirs) {
    const skillPath = path.join(SRC, 'skills', dir, 'SKILL.md');
    if (!fs.existsSync(skillPath)) continue;
    const { body } = readFrontmatter(skillPath);
    masterSkill += `<!-- BEGIN SKILL: ${dir} -->\n\n# ${dir}\n\n${body.trim()}\n\n`;

    // Kimi has no progressive disclosure (one SKILL.md per plugin), so any
    // references/*.md a skill links to must travel inline or they are lost.
    if (!INLINE_REF_EXCLUDE.has(dir)) {
      const skillRoot = path.join(SRC, 'skills', dir);
      const refFiles = [];
      (function walk(d, rel) {
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
          if (entry.name === 'SKILL.md') continue;
          const abs = path.join(d, entry.name);
          const relPath = rel ? `${rel}/${entry.name}` : entry.name;
          if (entry.isDirectory()) walk(abs, relPath);
          else if (entry.name.endsWith('.md')) refFiles.push({ relPath, abs });
        }
      })(skillRoot, '');
      refFiles.sort((a, b) => a.relPath.localeCompare(b.relPath));
      for (const ref of refFiles) {
        const refBody = fs.readFileSync(ref.abs, 'utf8').trim();
        masterSkill += `<!-- REFERENCE: ${dir}/${ref.relPath} -->\n\n${refBody}\n\n`;
      }
    }

    masterSkill += `<!-- END SKILL: ${dir} -->\n\n---\n\n`;
  }

  fs.writeFileSync(path.join(dest, 'SKILL.md'), masterSkill);

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
  }

  console.log('[antigravity] Done.');
}

function buildCodex() {
  const dest = path.join(PLATFORMS, 'codex', 'skills');
  console.log('[codex] Building...');

  cleanDir(dest);
  const skillDirs = getSkillDirs();

  for (const dir of skillDirs) {
    const srcFile = path.join(SRC, 'skills', dir, 'SKILL.md');
    const destFile = path.join(dest, `apple-dev__${dir}.SKILL.md`);
    fs.copyFileSync(srcFile, destFile);

    // Flatten subdirectories with __ separator (Codex doesn't discover nested
    // dirs — referenced files must travel alongside the skill or they are lost).
    const subdirs = fs.readdirSync(path.join(SRC, 'skills', dir))
      .filter(f => fs.statSync(path.join(SRC, 'skills', dir, f)).isDirectory());
    for (const sub of subdirs) {
      const subSrc = path.join(SRC, 'skills', dir, sub);
      const subDest = path.join(dest, `${dir}__${sub}`);
      fs.cpSync(subSrc, subDest, { recursive: true });
    }
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
  }

  console.log('[agy] Done.');
}

function buildRootMarketplaces() {
  console.log('[marketplace] Building root manifests...');

  // Claude marketplace
  const claudeMarketplace = {
    '$schema': 'https://anthropic.com/claude-code/marketplace.schema.json',
    name: 'apple-dev-skills',
    description: 'Apple platform development skills, agents, commands, and App Store Connect MCP server. Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, and ASC API automation.',
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
      description: 'Apple platform development skills, agents, commands, and App Store Connect MCP server. Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, and ASC API automation.',
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

  // Kimi marketplace
  const kimiMarketplace = {
    name: 'apple-dev-skills',
    owner: { name: 'Mark David Gan', email: 'mark@markdavidgan.com' },
    metadata: {
      description: 'Apple platform development tools and knowledge for iOS, Swift, SwiftUI, and App Store Connect. Covers Swift 6, SwiftUI, design, accessibility, concurrency, Apple review auditing, CI build checks, and ASC API automation.',
      version: VERSION
    },
    plugins: [
      {
        name: 'apple-dev',
        source: 'platforms/kimi/apple-dev',
        description: `Apple platform development skills (consolidated ${getSkillDirs().length} skills), pattern-check tool, and iOS 26 API lookup tool for Kimi Code.`
      }
    ]
  };
  const kimiPluginDir = path.join(__dirname, '..', '.kimi-plugin');
  fs.mkdirSync(kimiPluginDir, { recursive: true });
  fs.writeFileSync(
    path.join(kimiPluginDir, 'marketplace.json'),
    JSON.stringify(kimiMarketplace, null, 2) + '\n'
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
  buildRootMarketplaces();
  writeCompatibilityMatrix();

  console.log('\n=== Build Complete ===');
  console.log('Outputs written to platforms/');
}

main();
