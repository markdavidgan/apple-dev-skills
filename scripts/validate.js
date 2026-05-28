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
  const fm = { _raw: match[1] };
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return fm;
}

// ─── Guide rules (The Complete Guide to Building Skills for Claude) ───
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_DESCRIPTION = 1024;   // guide: description under 1024 characters
const MAX_SKILL_WORDS = 5000;   // guide: keep SKILL.md under 5,000 words
// WHAT + WHEN: a good description states when to trigger.
const TRIGGER_HINTS = /\b(use when|use for|use whenever|trigger|triggers on|trigger on|activate(s)? when|when (the )?user|when you|when asked|use to|use this|run during|run before|use after|use before)\b/i;

function wordCount(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim().split(/\s+/).filter(Boolean).length;
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
    const skillDir = path.join(skillsRoot, dir);
    const skillPath = path.join(skillDir, 'SKILL.md');

    // Guide: SKILL.md must be exactly that name (case-sensitive); no README.md inside.
    const entries = fs.readdirSync(skillDir);
    if (!entries.includes('SKILL.md')) {
      const wrongCase = entries.find(e => e.toLowerCase() === 'skill.md');
      if (wrongCase) error(`Skill "${dir}" has "${wrongCase}" — must be exactly "SKILL.md" (case-sensitive)`);
      else error(`Skill "${dir}" missing SKILL.md`);
      continue;
    }
    const readme = entries.find(e => e.toLowerCase() === 'readme.md');
    if (readme) error(`Skill "${dir}" contains "${readme}" — skills must not include README.md (put docs in SKILL.md or references/)`);

    // Guide: skill folder naming — kebab-case, no "claude"/"anthropic".
    if (!KEBAB_CASE.test(dir)) error(`Skill "${dir}" folder name is not kebab-case (lowercase, hyphens only)`);
    if (/\b(claude|anthropic)\b/i.test(dir) || /(claude|anthropic)/i.test(dir)) {
      error(`Skill "${dir}" name contains reserved word "claude"/"anthropic"`);
    }

    const fm = readFrontmatter(skillPath);
    if (!fm) {
      error(`Skill "${dir}" missing YAML frontmatter`);
      continue;
    }

    if (!fm.name) error(`Skill "${dir}" missing 'name' in frontmatter`);
    if (fm.name && !KEBAB_CASE.test(fm.name)) error(`Skill "${dir}" frontmatter name "${fm.name}" is not kebab-case`);
    if (fm.name && fm.name !== dir) {
      warn(`Skill "${dir}" frontmatter name "${fm.name}" does not match directory name`);
    }

    // Guide: description is required and is the most important field.
    if (!fm.description) {
      error(`Skill "${dir}" missing 'description' in frontmatter (required — how Claude decides to load the skill)`);
    } else {
      if (fm.description.length > MAX_DESCRIPTION) {
        error(`Skill "${dir}" description is ${fm.description.length} chars (guide max ${MAX_DESCRIPTION})`);
      }
      if (!TRIGGER_HINTS.test(fm.description)) {
        warn(`Skill "${dir}" description has no clear trigger/"when to use" cue — add WHAT + WHEN to avoid under-triggering`);
      }
    }

    // Guide: no XML angle brackets anywhere in frontmatter (security restriction).
    if (fm._raw && /[<>]/.test(fm._raw)) {
      error(`Skill "${dir}" frontmatter contains XML angle brackets (< or >) — forbidden`);
    }

    // Guide: keep SKILL.md under ~5,000 words (progressive disclosure).
    const words = wordCount(skillPath);
    if (words > MAX_SKILL_WORDS) {
      warn(`Skill "${dir}" SKILL.md is ${words} words (guide suggests < ${MAX_SKILL_WORDS}; move detail to references/)`);
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
