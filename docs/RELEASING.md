# Releasing Apple Dev Skills

This document describes the release workflow for maintainers.

---

## Prerequisites

- Write access to the GitHub repo
- `node` >= 22 installed

---

## Release Checklist

1. **Ensure main is green**
   ```bash
   git checkout main
   git pull
   node scripts/validate.js
   node scripts/build.js
   ```

2. **Bump version**
   ```bash
   node scripts/bump-version.js patch   # 0.1.0 -> 0.1.1
   # or
   node scripts/bump-version.js minor   # 0.1.0 -> 0.2.0
   # or
   node scripts/bump-version.js major   # 0.1.0 -> 1.0.0
   # or
   node scripts/bump-version.js 0.2.3   # exact version
   ```

3. **Build and regenerate**
   ```bash
   node scripts/build.js
   node scripts/generate-catalog.js
   ```

4. **Update changelog**
   - Open `CHANGELOG.md`
   - Add a new section under `## [Unreleased]` or create `## [X.Y.Z] - YYYY-MM-DD`
   - List notable changes

5. **Commit**
   ```bash
   git add .
   git commit -m "chore(release): v0.1.1"
   ```

6. **Tag**
   ```bash
   git tag -a v0.1.1 -m "Release v0.1.1"
   ```

7. **Push**
   ```bash
   git push origin main
   git push origin v0.1.1
   ```

8. **Verify GitHub Release**
   - Go to https://github.com/markdavidgan/apple-dev-skills/releases
   - Confirm the release was created by `.github/workflows/release.yml`
   - Confirm all 6 platform ZIPs are attached

---

## Post-Release

- Announce on social channels if significant
- Update marketplace listings if required (Claude/Cursor usually auto-detect version changes)
- Monitor issues for regressions

---

## Emergency Hotfix

For critical fixes:

1. Create a hotfix branch from the latest tag:
   ```bash
   git checkout -b hotfix/v0.1.2 v0.1.1
   ```
2. Apply the fix in `src/`
3. Bump version: `node scripts/bump-version.js patch`
4. Build, commit, tag `v0.1.2`, push
5. Merge hotfix branch back to `main`
