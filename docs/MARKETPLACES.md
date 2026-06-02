# Marketplace Submission Guide

This document covers how to submit Apple Dev Skills to each supported marketplace.

---

## Claude Code Marketplace

### Manifest
- File: `.claude-plugin/marketplace.json`
- Schema: `https://anthropic.com/claude-code/marketplace.schema.json`

### Submission Steps
1. Ensure the repo is public.
2. Verify `.claude-plugin/marketplace.json` is valid JSON.
3. In Claude Code, run:
   ```
   /plugin marketplace add markdavidgan/apple-dev-skills
   /plugin install apple-dev-skills
   ```
4. For official listing, contact Anthropic or apply through their partner program.

### Update Process
- Bump version in `package.json`.
- Run `node scripts/build.js`.
- Commit and push. Marketplace reads `plugin.json` version field.

---

## Cursor Marketplace

### Manifest
- File: `.cursor-plugin/marketplace.json`

### Submission Steps
1. Ensure the repo is public.
2. Verify `.cursor-plugin/marketplace.json` is valid JSON.
3. In Cursor, go to Settings → Plugins → Add Marketplace.
4. Enter the repo URL: `https://github.com/markdavidgan/apple-dev-skills`

### Update Process
- Same as Claude: bump, build, commit, push.

---

## Kimi Code

### Manifest
- File: `.kimi-plugin/marketplace.json`

### Installation Steps
```bash
./install.sh --platform kimi
```

Copies the consolidated bundle from `platforms/kimi/apple-dev/` (`SKILL.md` + `scripts/` + `reference/`) to `~/.kimi-code/skills/apple-dev/`, which Kimi Code auto-discovers on restart. (Kimi Code has no plugin-install CLI or MCP support — it discovers plain skills under `~/.kimi-code/skills/`.)

### Update Process
- Users re-run `./install.sh --platform kimi`.

---

## MCP Registry (Smithery)

The App Store Connect MCP server can be listed on MCP registries like Smithery.

### Manifest
- File: `src/mcp/asc/mcp.json`

### Prerequisites
1. Build the MCP server:
   ```bash
   cd src/mcp/asc
   npm install
   npm run build
   ```
2. Ensure `src/mcp/asc/dist/index.js` exists.

### Submission
- Submit `src/mcp/asc/mcp.json` to the registry.
- Update the `<REPO_PATH>` placeholder in `args` to the user's actual clone path.

---

## npm Registry (Future)

If we publish an npm CLI package:

```bash
npm publish --access public
```

This would enable:
```bash
npx apple-dev-skills install --platform claude
```

See [architecture.md](architecture.md) for the CLI design.
