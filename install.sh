#!/bin/bash
set -euo pipefail

# Apple Dev Skills — Cross-Platform Installer
# Supports: Claude Code, Cursor, Kimi Code, Antigravity, Codex CLI, Agy

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLATFORM=""
SCOPE="global"
COMPONENTS="all"
DRY_RUN=false

# ─── Colors ───
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info()  { echo -e "${BLUE}[INFO]${NC} $*"; }
log_ok()    { echo -e "${GREEN}[OK]${NC} $*"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*"; }

# ─── Usage ───
usage() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Install Apple Dev Skills for your AI platform.

Options:
  --platform <name>   Target platform: claude, cursor, kimi, antigravity, codex, agy, all
  --local             Install into current project (./.claude, ./.cursor, etc.)
  --global            Install into user home (default)
  --components <list> Comma-separated: skills,agents,commands,mcp (default: all)
  --dry-run           Show what would happen without doing it
  -h, --help          Show this help

Examples:
  ./install.sh --platform claude
  ./install.sh --platform claude --local
  ./install.sh --platform all --global
  ./install.sh --platform kimi
  ./install.sh --platform antigravity --components skills
EOF
}

# ─── Args ───
while [[ $# -gt 0 ]]; do
  case "$1" in
    --platform)   PLATFORM="$2"; shift 2 ;;
    --local)      SCOPE="local"; shift ;;
    --global)     SCOPE="global"; shift ;;
    --components) COMPONENTS="$2"; shift 2 ;;
    --dry-run)    DRY_RUN=true; shift ;;
    -h|--help)    usage; exit 0 ;;
    *)            log_error "Unknown option: $1"; usage; exit 1 ;;
  esac
done

if [[ -z "$PLATFORM" ]]; then
  log_error "--platform is required"
  usage
  exit 1
fi

# ─── Scope Paths ───
get_scope_base() {
  if [[ "$SCOPE" == "local" ]]; then
    echo "$PWD"
  else
    echo "$HOME"
  fi
}

# ─── Install Helpers ───

symlink_or_copy() {
  local src="$1"
  local dest="$2"
  local use_symlink="${3:-true}"

  if [[ "$DRY_RUN" == true ]]; then
    if [[ "$use_symlink" == true ]]; then
      echo "  [dry-run] symlink: $src -> $dest"
    else
      echo "  [dry-run] copy: $src -> $dest"
    fi
    return
  fi

  # Backup existing
  if [[ -e "$dest" && ! -L "$dest" ]]; then
    local backup="${dest}.backup.$(date +%s)"
    log_warn "Backing up existing file to $backup"
    mv "$dest" "$backup"
  fi

  # Remove existing symlink
  if [[ -L "$dest" ]]; then
    rm "$dest"
  fi

  mkdir -p "$(dirname "$dest")"

  if [[ "$use_symlink" == true ]]; then
    ln -s "$src" "$dest"
    log_ok "Linked: $dest"
  else
    if [[ -d "$src" ]]; then
      cp -R "$src" "$dest"
    else
      cp "$src" "$dest"
    fi
    log_ok "Copied: $dest"
  fi
}

install_claude() {
  local base="$(get_scope_base)"
  local src="$REPO_ROOT/platforms/claude"

  log_info "Installing for Claude Code ($SCOPE)..."

  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"skills"* ]]; then
    symlink_or_copy "$src/skills" "$base/.claude/skills/apple-dev" true
  fi
  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"agents"* ]]; then
    symlink_or_copy "$src/agents" "$base/.claude/agents/apple-dev" true
  fi
  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"commands"* ]]; then
    symlink_or_copy "$src/commands" "$base/.claude/commands/apple-dev" true
  fi

  log_info "Claude Code installation complete."
  log_info "To register the MCP servers (build each first — see README), run:"
  echo "  claude mcp add-json app-store-connect < $REPO_ROOT/src/mcp/asc/mcp.json"
  echo "  claude mcp add-json apple-docs        < $REPO_ROOT/src/mcp/apple-docs/mcp.json"
}

install_cursor() {
  local base="$(get_scope_base)"
  local src="$REPO_ROOT/platforms/cursor"

  log_info "Installing for Cursor ($SCOPE)..."

  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"skills"* ]]; then
    symlink_or_copy "$src/skills" "$base/.cursor/skills/apple-dev" true
  fi
  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"agents"* ]]; then
    symlink_or_copy "$src/agents" "$base/.cursor/agents/apple-dev" true
  fi
  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"commands"* ]]; then
    symlink_or_copy "$src/commands" "$base/.cursor/commands/apple-dev" true
  fi

  log_info "Cursor installation complete."
}

install_kimi() {
  local base="$(get_scope_base)"
  local src="$REPO_ROOT/platforms/kimi/apple-dev"
  # Kimi Code auto-discovers skills from <home>/.kimi-code/skills (user) and
  # <project>/.kimi-code/skills (project). The legacy ~/.kimi/plugins path was
  # abandoned in the 2026-05 migration to .kimi-code and is no longer read.
  local dest="$base/.kimi-code/skills/apple-dev"

  log_info "Installing for Kimi Code ($SCOPE)..."

  if [[ "$DRY_RUN" == true ]]; then
    echo "  [dry-run] copy: $src -> $dest"
    log_info "Kimi installation complete (dry-run)."
    return
  fi

  # Kimi prefers copy (not symlink) for skill discovery stability
  if [[ -d "$dest" ]]; then
    rm -rf "$dest"
  fi
  mkdir -p "$(dirname "$dest")"
  cp -R "$src" "$dest"
  log_ok "Copied: $dest"

  log_info "Kimi Code installation complete."
  log_info "Restart Kimi Code to pick up the skill."
}

install_antigravity() {
  local base="$(get_scope_base)"
  local src="$REPO_ROOT/platforms/antigravity/skills"
  local dest

  if [[ "$SCOPE" == "local" ]]; then
    dest="$base/.agents/skills/apple-dev"
  else
    dest="${ANTIGRAVITY_SKILLS_DIR:-$HOME/.gemini/antigravity/skills}/apple-dev"
  fi

  log_info "Installing for Antigravity ($SCOPE)..."

  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"skills"* ]]; then
    symlink_or_copy "$src" "$dest" false
  fi

  log_info "Antigravity installation complete."
  log_info "Skills will be discovered on next Antigravity startup."
}

install_codex() {
  local base="$(get_scope_base)"
  local src="$REPO_ROOT/platforms/codex/skills"
  local dest

  if [[ "$SCOPE" == "local" ]]; then
    dest="$base/.codex/skills/apple-dev"
  else
    dest="${CODEX_HOME:-$HOME/.codex}/skills/apple-dev"
  fi

  log_info "Installing for Codex CLI ($SCOPE)..."

  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"skills"* ]]; then
    symlink_or_copy "$src" "$dest" false
  fi

  log_info "Codex CLI installation complete."
}

install_agy() {
  local base="$(get_scope_base)"
  local src="$REPO_ROOT/platforms/agy/skills"
  local dest

  if [[ "$SCOPE" == "local" ]]; then
    dest="$base/.agy/skills/apple-dev"
  else
    dest="${AGY_HOME:-$HOME/.agy}/skills/apple-dev"
  fi

  log_info "Installing for Agy ($SCOPE)..."

  if [[ "$COMPONENTS" == "all" || "$COMPONENTS" == *"skills"* ]]; then
    symlink_or_copy "$src" "$dest" false
  fi

  log_info "Agy installation complete."
}

# ─── Main Dispatch ───
case "$PLATFORM" in
  claude)
    install_claude
    ;;
  cursor)
    install_cursor
    ;;
  kimi)
    install_kimi
    ;;
  antigravity)
    install_antigravity
    ;;
  codex)
    install_codex
    ;;
  agy)
    install_agy
    ;;
  all)
    install_claude
    install_cursor
    install_kimi
    install_antigravity
    install_codex
    install_agy
    ;;
  *)
    log_error "Unknown platform: $PLATFORM"
    usage
    exit 1
    ;;
esac

log_ok "Done."
