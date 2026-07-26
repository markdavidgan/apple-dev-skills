#!/usr/bin/env node
/**
 * Test that running build.js twice produces byte-identical output.
 *
 * The check hashes the generated trees directly rather than going through git.
 * An earlier version staged the outputs with `git add -A` and then compared
 * `git diff --cached` before and after the second build — which compared the
 * index against HEAD, not build 1 against build 2. Any uncommitted `src/`
 * change made the first build legitimately rewrite `platforms/`, leaving the
 * index dirty, so the test reported "not idempotent" for a build that was
 * perfectly idempotent. It also mutated the caller's git index as a side
 * effect, which is not a test's business.
 */

const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

// Everything build.js is allowed to write.
const GENERATED = [
  'platforms',
  '.claude-plugin',
  '.cursor-plugin',
  '.kimi-plugin',
  'CATALOG.md',
];

/** Map of repo-relative path -> sha256, for every generated file that exists. */
function snapshot() {
  const digests = new Map();

  const visit = (abs) => {
    const stat = fs.lstatSync(abs);
    if (stat.isSymbolicLink()) {
      digests.set(path.relative(REPO_ROOT, abs), `symlink:${fs.readlinkSync(abs)}`);
      return;
    }
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(abs).sort()) visit(path.join(abs, entry));
      return;
    }
    if (stat.isFile()) {
      const hash = crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
      digests.set(path.relative(REPO_ROOT, abs), hash);
    }
  };

  for (const target of GENERATED) {
    const abs = path.join(REPO_ROOT, target);
    if (fs.existsSync(abs)) visit(abs);
  }
  return digests;
}

function compare(before, after) {
  const changed = [];
  const added = [];
  const removed = [];

  for (const [file, hash] of after) {
    if (!before.has(file)) added.push(file);
    else if (before.get(file) !== hash) changed.push(file);
  }
  for (const file of before.keys()) {
    if (!after.has(file)) removed.push(file);
  }
  return { changed, added, removed };
}

function report(label, files) {
  if (!files.length) return;
  console.log(`\n  ${label} (${files.length}):`);
  for (const file of files.slice(0, 20)) console.log(`    ${file}`);
  if (files.length > 20) console.log(`    ... and ${files.length - 20} more`);
}

console.log('=== Build Idempotency Test ===\n');

try {
  console.log('Running first build...');
  execSync('node scripts/build.js', { cwd: REPO_ROOT, stdio: 'inherit' });
  const first = snapshot();
  console.log(`\nSnapshot after first build: ${first.size} generated files.`);

  console.log('\nRunning second build...');
  execSync('node scripts/build.js', { cwd: REPO_ROOT, stdio: 'inherit' });
  const second = snapshot();

  const { changed, added, removed } = compare(first, second);

  if (changed.length || added.length || removed.length) {
    console.log('\n❌ FAIL: Second build produced different output. Build is not idempotent:');
    report('changed', changed);
    report('added', added);
    report('removed', removed);
    process.exit(1);
  }

  console.log(`\n✅ PASS: Build is idempotent (${second.size} files identical across two runs).`);
} catch (err) {
  console.error('\n❌ Test failed:', err.message);
  process.exit(1);
}
