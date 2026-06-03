#!/usr/bin/env node
/**
 * Verify the skill/command/agent counts written in README.md and CLAUDE.md
 * match what actually exists under src/. Prevents the hand-edited counts from
 * drifting (they have before: 22 → 25 → 41).
 *
 * Usage: node scripts/check-counts.js
 * Exits non-zero on any mismatch so CI can gate on it.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

function countDirs(rel) {
  const p = path.join(SRC, rel);
  if (!fs.existsSync(p)) return 0;
  return fs.readdirSync(p).filter(d => fs.statSync(path.join(p, d)).isDirectory()).length;
}

function countFiles(rel, ext) {
  const p = path.join(SRC, rel);
  if (!fs.existsSync(p)) return 0;
  return fs.readdirSync(p).filter(f => f.endsWith(ext)).length;
}

const actual = {
  skills: countDirs('skills'),
  agents: countFiles('agents', '.md'),
  commands: countFiles('commands', '.md'),
};

// Each check: a label, the actual number, and the files + regexes that must agree.
const checks = [
  { label: 'skills', n: actual.skills, refs: [
    ['README.md', /###\s+(\d+)\s+Skills/g],
    ['CLAUDE.md', /(\d+)\s+skill directories/g],
  ]},
  { label: 'agents', n: actual.agents, refs: [
    ['README.md', /###\s+(\d+)\s+Agents/g],
  ]},
  { label: 'commands', n: actual.commands, refs: [
    ['README.md', /###\s+(\d+)\s+Commands/g],
    ['CLAUDE.md', /(\d+)\s+command definitions/g],
  ]},
];

let failed = 0;
console.log(`Source: ${actual.skills} skills, ${actual.agents} agents, ${actual.commands} commands\n`);

for (const { label, n, refs } of checks) {
  for (const [file, re] of refs) {
    const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
    let m, found = false;
    while ((m = re.exec(text)) !== null) {
      found = true;
      const got = Number(m[1]);
      if (got !== n) {
        console.error(`✗ ${file}: ${label} count says ${got}, src has ${n}`);
        failed++;
      }
    }
    if (!found) {
      console.error(`✗ ${file}: no ${label} count found (pattern ${re})`);
      failed++;
    }
  }
}

if (failed) {
  console.error(`\n${failed} count mismatch(es). Update the docs to match src/.`);
  process.exit(1);
}
console.log('✓ All documented counts match src/.');
