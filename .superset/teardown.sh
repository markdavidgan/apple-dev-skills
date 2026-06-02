#!/usr/bin/env bash
# Superset workspace teardown for apple-dev-skills.
#
# Setup starts no long-running services (no Docker, no databases, no dev
# server), so there is nothing to stop. We only remove the MCP server build
# artifacts that setup generated. These are gitignored, and the worktree is
# deleted anyway, so this is just tidy-up.
set -euo pipefail

rm -rf src/mcp/asc/node_modules src/mcp/asc/dist

echo "==> Teardown complete."
