#!/usr/bin/env bash
set -euo pipefail

# Update apple-dev-skills across agents.
# Usage:
#   ./scripts/update.sh [repo-path]
#
# If no repo path is given, the script checks:
#   1. $APPLE_DEV_SKILLS_REPO
#   2. ../apple-dev-skills (relative to the current working directory)
#   3. $HOME/apple-dev-skills
#   4. $HOME/.apple-dev-skills

log_info()  { echo "[INFO] $*"; }
log_warn()  { echo "[WARN] $*" >&2; }
log_error() { echo "[ERROR] $*" >&2; }

REPO="${1:-}"

if [[ -z "$REPO" ]]; then
  REPO="${APPLE_DEV_SKILLS_REPO:-}"
fi

if [[ -z "$REPO" ]]; then
  for candidate in "../apple-dev-skills" "$HOME/apple-dev-skills" "$HOME/.apple-dev-skills"; do
    if [[ -d "$candidate/.git" ]] && [[ -f "$candidate/.kimi-plugin/plugin.json" ]]; then
      REPO="$(cd "$candidate" && pwd)"
      break
    fi
  done
fi

if [[ -z "$REPO" || ! -d "$REPO/.git" ]]; then
  log_error "Could not locate the apple-dev-skills git repository."
  log_error "Pass the repo path as an argument or set APPLE_DEV_SKILLS_REPO."
  exit 1
fi

log_info "Updating apple-dev-skills from: $REPO"
git -C "$REPO" pull

KIMI_HOME="${KIMI_CODE_HOME:-$HOME/.kimi-code}"
MANAGED_PLUGIN="$KIMI_HOME/plugins/managed/apple-dev-skills"

# Refresh the Kimi plugin managed copy if it was installed via /plugins install.
if [[ -d "$MANAGED_PLUGIN" ]]; then
  log_info "Refreshing Kimi plugin managed copy at: $MANAGED_PLUGIN"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete --exclude='.git' "$REPO/" "$MANAGED_PLUGIN/"
  else
    rm -rf "$MANAGED_PLUGIN"
    cp -R "$REPO" "$MANAGED_PLUGIN"
  fi
else
  log_warn "Kimi managed plugin not found at $MANAGED_PLUGIN."
  log_warn "Install it first with: /plugins install $REPO"
fi

# Refresh Kimi slash commands (plugins do not install commands automatically).
if [[ -d "$REPO/platforms/kimi/apple-dev/commands" ]]; then
  mkdir -p "$KIMI_HOME/commands"
  cp -R "$REPO/platforms/kimi/apple-dev/commands/." "$KIMI_HOME/commands/"
  log_info "Refreshed Kimi slash commands."
fi

# Refresh other agents if their config directories exist.
for platform in claude cursor codex antigravity agy; do
  config_dir="$HOME/.$platform"
  case "$platform" in
    claude|cursor) components="skills,commands" ;;
    codex)         components="skills,mcp" ;;
    antigravity|agy) components="skills" ;;
  esac
  if [[ -d "$config_dir" ]]; then
    log_info "Refreshing $platform installation ..."
    "$REPO/install.sh" --platform "$platform" --global --components "$components" || log_warn "$platform refresh returned a non-zero exit code; continuing."
  fi
done

log_info "Done."
log_info "Restart Kimi with /new (and any other agent sessions) to load the updated skills and MCP servers."
