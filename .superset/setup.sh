#!/usr/bin/env bash
# Superset workspace setup for apple-dev-skills.
#
# This is a pure-Node skills repository: the root package.json has no
# dependencies (its scripts use only Node built-ins), so no root install is
# needed. The only component requiring preparation is the App Store Connect
# MCP server in src/mcp/asc/, which has npm dependencies and a `tsc` build.
set -euo pipefail

echo "==> Validating source skills…"
node scripts/validate.js

echo "==> Preparing App Store Connect MCP server (src/mcp/asc)…"
npm --prefix src/mcp/asc install
npm --prefix src/mcp/asc run build

echo "==> Setup complete."
