#!/usr/bin/env node
/**
 * Validate src/ before building platform outputs.
 *
 * Usage:
 *   node scripts/validate.js              # one-shot validation
 *   node scripts/validate.js --watch      # watch mode (re-runs on change)
 *   node scripts/validate.js --compact    # machine-readable output
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
let errors = 0;
let warnings = 0;
let format = 'pretty';
let currentFile = '';

const ARGS = process.argv.slice(2);
const WATCH = ARGS.includes('--watch');
if (ARGS.includes('--compact')) format = 'compact';

function setFile(f) { currentFile = f; }

function error(msg) {
  if (format === 'compact') {
    console.error(`${currentFile}:error:${msg}`);
  } else {
    console.error(`  ❌ ${msg}`);
  }
  errors++;
}

function warn(msg) {
  if (format === 'compact') {
    console.warn(`${currentFile}:warning:${msg}`);
  } else {
    console.warn(`  ⚠️  ${msg}`);
  }
  warnings++;
}

function ok(msg) {
  if (format !== 'compact') {
    console.log(`  ✅ ${msg}`);
  }
}

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
  if (format !== 'compact') console.log('\n📂 Validating skills...');
  const skillsRoot = path.join(SRC, 'skills');
  if (!fs.existsSync(skillsRoot)) {
    setFile(skillsRoot);
    error('skills/ directory missing');
    return;
  }

  const dirs = fs.readdirSync(skillsRoot).filter(d => fs.statSync(path.join(skillsRoot, d)).isDirectory());
  if (dirs.length === 0) {
    setFile(skillsRoot);
    error('No skill directories found');
    return;
  }

  for (const dir of dirs) {
    const skillDir = path.join(skillsRoot, dir);
    const skillPath = path.join(skillDir, 'SKILL.md');

    // Guide: SKILL.md must be exactly that name (case-sensitive); no README.md inside.
    const entries = fs.readdirSync(skillDir);
    if (!entries.includes('SKILL.md')) {
      setFile(skillPath);
      const wrongCase = entries.find(e => e.toLowerCase() === 'skill.md');
      if (wrongCase) error(`Skill "${dir}" has "${wrongCase}" — must be exactly "SKILL.md" (case-sensitive)`);
      else error(`Skill "${dir}" missing SKILL.md`);
      continue;
    }
    const readme = entries.find(e => e.toLowerCase() === 'readme.md');
    if (readme) {
      setFile(path.join(skillDir, readme));
      error(`Skill "${dir}" contains "${readme}" — skills must not include README.md (put docs in SKILL.md or references/)`);
    }

    // Guide: skill folder naming — kebab-case, no "claude"/"anthropic".
    if (!KEBAB_CASE.test(dir)) {
      setFile(skillPath);
      error(`Skill "${dir}" folder name is not kebab-case (lowercase, hyphens only)`);
    }
    if (/\b(claude|anthropic)\b/i.test(dir) || /(claude|anthropic)/i.test(dir)) {
      setFile(skillPath);
      error(`Skill "${dir}" name contains reserved word "claude"/"anthropic"`);
    }

    const fm = readFrontmatter(skillPath);
    if (!fm) {
      setFile(skillPath);
      error(`Skill "${dir}" missing YAML frontmatter`);
      continue;
    }

    setFile(skillPath);
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
  if (format !== 'compact') console.log('\n🤖 Validating agents...');
  const agentsRoot = path.join(SRC, 'agents');
  if (!fs.existsSync(agentsRoot)) {
    setFile(agentsRoot);
    warn('agents/ directory missing');
    return;
  }

  const files = fs.readdirSync(agentsRoot).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(agentsRoot, file);
    setFile(filePath);
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
  if (format !== 'compact') console.log('\n⌨️  Validating commands...');
  const cmdsRoot = path.join(SRC, 'commands');
  if (!fs.existsSync(cmdsRoot)) {
    setFile(cmdsRoot);
    warn('commands/ directory missing');
    return;
  }

  const files = fs.readdirSync(cmdsRoot).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(cmdsRoot, file);
    setFile(filePath);
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
  if (format !== 'compact') console.log('\n🔌 Validating MCP server...');
  const mcpRoot = path.join(SRC, 'mcp', 'asc');
  if (!fs.existsSync(mcpRoot)) {
    setFile(mcpRoot);
    warn('mcp/asc/ directory missing');
    return;
  }

  const pkgPath = path.join(mcpRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    setFile(pkgPath);
    error('mcp/asc/package.json missing');
    return;
  }

  setFile(pkgPath);
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (!pkg.name) error('mcp/asc/package.json missing "name"');
  if (!pkg.version) warn('mcp/asc/package.json missing "version"');

  ok('MCP server package.json');
}

// ─── Core validation runner ───
function validate() {
  errors = 0;
  warnings = 0;
  currentFile = '';

  if (format !== 'compact') {
    console.log('=== Apple Dev Skills Validation ===');
  }

  if (!fs.existsSync(SRC)) {
    console.error('Error: src/ directory not found.');
    return false;
  }

  validateSkills();
  validateAgents();
  validateCommands();
  validateMcp();

  if (format !== 'compact') {
    console.log('\n=== Validation Complete ===');
    console.log(`Errors: ${errors}, Warnings: ${warnings}`);
  }

  return errors === 0;
}

// ─── Watch mode ───
function watch() {
  console.log('👀 Watching src/ for changes... (Ctrl+C to stop)\n');

  let debounceTimer = null;
  const trigger = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (format !== 'compact') console.clear();
      validate();
      if (format !== 'compact') console.log('\n👀 Watching for changes...');
    }, 150);
  };

  const dirsToWatch = [
    path.join(SRC, 'skills'),
    path.join(SRC, 'agents'),
    path.join(SRC, 'commands'),
    path.join(SRC, 'mcp', 'asc'),
  ];

  for (const dir of dirsToWatch) {
    if (!fs.existsSync(dir)) continue;
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename && (filename.endsWith('.md') || filename === 'package.json')) {
        trigger();
      }
    });
  }

  // Initial run
  validate();
  if (format !== 'compact') console.log('\n👀 Watching for changes...');
}

// ─── Main ───
function main() {
  if (WATCH) {
    watch();
  } else {
    const ok = validate();
    process.exit(ok ? 0 : 1);
  }
}

main();
