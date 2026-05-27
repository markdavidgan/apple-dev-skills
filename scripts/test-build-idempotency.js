#!/usr/bin/env node
/**
 * Test that running build.js twice produces zero diff.
 */

const { execSync } = require('child_process');

console.log('=== Build Idempotency Test ===\n');

try {
  // First build
  console.log('Running first build...');
  execSync('node scripts/build.js', { stdio: 'inherit' });

  // Stage any generated changes so second build can be compared cleanly
  execSync('git add -A platforms/ .claude-plugin/ .cursor-plugin/ .kimi-plugin/ CATALOG.md', { stdio: 'ignore' });

  // Check if first build produced content changes
  const diff1 = execSync('git diff --cached --stat').toString().trim();
  if (diff1) {
    console.log('\n⚠️  First build produced changes (expected if platforms/ was stale):');
    console.log(diff1);
  }

  // Second build
  console.log('\nRunning second build...');
  execSync('node scripts/build.js', { stdio: 'inherit' });

  // Check if second build changed any content
  const diff2 = execSync('git diff --cached --stat').toString().trim();
  if (diff2) {
    console.log('\n❌ FAIL: Second build produced changes. Build is not idempotent:');
    console.log(diff2);
    process.exit(1);
  }

  console.log('\n✅ PASS: Build is idempotent.');
} catch (err) {
  console.error('\n❌ Test failed:', err.message);
  process.exit(1);
}
