#!/usr/bin/env node
/**
 * Bump version across all manifests.
 *
 * Usage:
 *   node scripts/bump-version.js patch   # 1.0.0 -> 1.0.1
 *   node scripts/bump-version.js minor   # 1.0.0 -> 1.1.0
 *   node scripts/bump-version.js major   # 1.0.0 -> 2.0.0
 *   node scripts/bump-version.js 1.2.3   # set exact version
 */

const fs = require('fs');
const path = require('path');

const PKG_PATH = path.join(__dirname, '..', 'package.json');

function bump(version, type) {
  const parts = version.split('.').map(Number);
  if (type === 'major') {
    parts[0]++;
    parts[1] = 0;
    parts[2] = 0;
  } else if (type === 'minor') {
    parts[1]++;
    parts[2] = 0;
  } else {
    parts[2]++;
  }
  return parts.join('.');
}

function main() {
  const arg = process.argv[2] || 'patch';
  const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'));
  const current = pkg.version || '1.0.0';
  const next = /^\d+\.\d+\.\d+$/.test(arg) ? arg : bump(current, arg);

  pkg.version = next;
  fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Version bumped: ${current} → ${next}`);
  console.log('Run `node scripts/build.js` to propagate to all platform manifests.');
}

main();
