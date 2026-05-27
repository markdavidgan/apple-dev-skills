#!/usr/bin/env node
/**
 * Generate CATALOG.md from source content.
 *
 * Usage: node scripts/generate-catalog.js
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const OUT = path.join(__dirname, '..', 'CATALOG.md');

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const fm = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      fm[key] = val;
    }
  }
  return fm;
}

function getSkills() {
  const root = path.join(SRC, 'skills');
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root)
    .filter(d => fs.statSync(path.join(root, d)).isDirectory())
    .map(name => {
      const fm = readFrontmatter(path.join(root, name, 'SKILL.md'));
      return { name, description: fm.description || '', invoke: fm.invoke || '' };
    });
}

function getAgents() {
  const root = path.join(SRC, 'agents');
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const fm = readFrontmatter(path.join(root, file));
      return { name: fm.name || file.replace('.md', ''), description: fm.description || '', model: fm.model || '', effort: fm.effort || '' };
    });
}

function getCommands() {
  const root = path.join(SRC, 'commands');
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const fm = readFrontmatter(path.join(root, file));
      return { name: file.replace('.md', ''), description: fm.description || '', hint: fm['argument-hint'] || '' };
    });
}

function main() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  const version = fs.existsSync(pkgPath)
    ? JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version
    : '1.0.0';

  const skills = getSkills();
  const agents = getAgents();
  const commands = getCommands();

  let md = `# Apple Dev Skills — Catalog\n\n`;
  md += `> Version: **${version}**\n`;
  md += `> Generated: ${new Date().toISOString().split('T')[0]}\n`;
  md += `> Repository: https://github.com/markdavidgan/apple-dev-skills\n\n`;

  md += `## Skills (${skills.length})\n\n`;
  md += `| Skill | Description | Invoke |\n`;
  md += `|-------|-------------|--------|\n`;
  for (const s of skills) {
    const invoke = s.invoke ? `\`${s.invoke}\`` : '';
    md += `| ${s.name} | ${s.description} | ${invoke} |\n`;
  }

  md += `\n## Agents (${agents.length})\n\n`;
  md += `| Agent | Model | Effort | Description |\n`;
  md += `|-------|-------|--------|-------------|\n`;
  for (const a of agents) {
    md += `| ${a.name} | ${a.model} | ${a.effort} | ${a.description} |\n`;
  }

  md += `\n## Commands (${commands.length})\n\n`;
  md += `| Command | Description | Arguments |\n`;
  md += `|---------|-------------|-----------|\n`;
  for (const c of commands) {
    const hint = c.hint ? `\`${c.hint}\`` : '';
    md += `| /${c.name} | ${c.description} | ${hint} |\n`;
  }

  md += `\n## MCP Servers\n\n`;
  md += `| Server | Version | Description |\n`;
  md += `|--------|---------|-------------|\n`;
  const mcpPkgPath = path.join(SRC, 'mcp', 'asc', 'package.json');
  if (fs.existsSync(mcpPkgPath)) {
    const mcpPkg = JSON.parse(fs.readFileSync(mcpPkgPath, 'utf8'));
    md += `| ${mcpPkg.name} | ${mcpPkg.version} | ${mcpPkg.description} |\n`;
  }

  md += `\n---\n\n`;
  md += `## Platform Compatibility\n\n`;
  md += `See [PLATFORM_COMPATIBILITY.md](PLATFORM_COMPATIBILITY.md) for the full feature matrix.\n`;

  fs.writeFileSync(OUT, md);
  console.log(`Catalog generated: ${OUT}`);
}

main();
