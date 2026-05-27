#!/usr/bin/env node
/**
 * Validate src/ before building platform outputs.
 *
 * Usage: node scripts/validate.js
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
let errors = 0;
let warnings = 0;

function error(msg) { console.error(`  ❌ ${msg}`); errors++; }
function warn(msg)  { console.warn(`  ⚠️  ${msg}`); warnings++; }
function ok(msg)    { console.log(`  ✅ ${msg}`); }

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;
  const lines = match[1].split('\n');
  const fm = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return fm;
}

function validateSkills() {
  console.log('\n📂 Validating skills...');
  const skillsRoot = path.join(SRC, 'skills');
  if (!fs.existsSync(skillsRoot)) {
    error('skills/ directory missing');
    return;
  }

  const dirs = fs.readdirSync(skillsRoot).filter(d => fs.statSync(path.join(skillsRoot, d)).isDirectory());
  if (dirs.length === 0) {
    error('No skill directories found');
    return;
  }

  for (const dir of dirs) {
    const skillPath = path.join(skillsRoot, dir, 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      error(`Skill "${dir}" missing SKILL.md`);
      continue;
    }

    const fm = readFrontmatter(skillPath);
    if (!fm) {
      error(`Skill "${dir}" missing YAML frontmatter`);
      continue;
    }

    if (!fm.name) error(`Skill "${dir}" missing 'name' in frontmatter`);
    if (!fm.description) warn(`Skill "${dir}" missing 'description' in frontmatter`);

    if (fm.name && fm.name !== dir) {
      warn(`Skill "${dir}" frontmatter name "${fm.name}" does not match directory name`);
    }

    ok(`Skill "${dir}"`);
  }
}

function validateAgents() {
  console.log('\n🤖 Validating agents...');
  const agentsRoot = path.join(SRC, 'agents');
  if (!fs.existsSync(agentsRoot)) {
    warn('agents/ directory missing');
    return;
  }

  const files = fs.readdirSync(agentsRoot).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(agentsRoot, file);
    const fm = readFrontmatter(filePath);
    if (!fm) {
      error(`Agent "${file}" missing YAML frontmatter`);
      continue;
    }
    if (!fm.name) error(`Agent "${file}" missing 'name' in frontmatter`);
    if (!fm.description) error(`Agent "${file}" missing 'description' in frontmatter`);
    if (!fm.model) warn(`Agent "${file}" missing 'model' in frontmatter`);
    if (!fm.tools) warn(`Agent "${file}" missing 'tools' in frontmatter`);

    ok(`Agent "${file}"`);
  }
}

function validateCommands() {
  console.log('\n⌨️  Validating commands...');
  const cmdsRoot = path.join(SRC, 'commands');
  if (!fs.existsSync(cmdsRoot)) {
    warn('commands/ directory missing');
    return;
  }

  const files = fs.readdirSync(cmdsRoot).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(cmdsRoot, file);
    const fm = readFrontmatter(filePath);
    if (!fm) {
      error(`Command "${file}" missing YAML frontmatter`);
      continue;
    }
    if (!fm.description) error(`Command "${file}" missing 'description' in frontmatter`);

    ok(`Command "${file}"`);
  }
}

function validateMcp() {
  console.log('\n🔌 Validating MCP server...');
  const mcpRoot = path.join(SRC, 'mcp', 'asc');
  if (!fs.existsSync(mcpRoot)) {
    warn('mcp/asc/ directory missing');
    return;
  }

  const pkgPath = path.join(mcpRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    error('mcp/asc/package.json missing');
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (!pkg.name) error('mcp/asc/package.json missing "name"');
  if (!pkg.version) warn('mcp/asc/package.json missing "version"');

  ok('MCP server package.json');
}

// ─── Main ───
function main() {
  console.log('=== Apple Dev Skills Validation ===');

  if (!fs.existsSync(SRC)) {
    console.error('Error: src/ directory not found.');
    process.exit(1);
  }

  validateSkills();
  validateAgents();
  validateCommands();
  validateMcp();

  console.log('\n=== Validation Complete ===');
  console.log(`Errors: ${errors}, Warnings: ${warnings}`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();
