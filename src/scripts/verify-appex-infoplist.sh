#!/usr/bin/env bash
# verify-appex-infoplist.sh — Verify every app-extension carries NSExtensionPointIdentifier.
#
# Background: an app-extension (.appex) whose Info.plist lacks the NSExtension dict /
# NSExtensionPointIdentifier key builds, exports, and *uploads* cleanly — `xcrun altool`
# prints "Successfully uploaded" because SkipValidateProductErrors defers the check — then
# Apple's ASYNC server-side processing FAILS the build with error 90348 and the build silently
# drops out of the TestFlight valid-builds list. GENERATE_INFOPLIST_FILE does NOT inject these
# keys; the extension target needs an explicit INFOPLIST_FILE base plist with the NSExtension
# dict. See the ios-build skill ("App Extension Info.plist") and asc-submission skill
# ("Asynchronous Processing Failures").
#
# Project-agnostic: no hard-coded app names or paths. Point it at a built artifact (preferred,
# authoritative) or at one or more XcodeGen project.yml files (source pre-check).
#
# Modes:
#   Binary (authoritative) — inspect every embedded .appex inside a built .ipa or .xcarchive.
#                            Validates the exact bytes about to be uploaded. Wire this in as a
#                            gate AFTER export and BEFORE upload_to_testflight / altool.
#   Source (pre-check)     — scan XcodeGen project.yml files for `type: app-extension` targets
#                            and verify each target's INFOPLIST_FILE base plist. Fast (<1s).
#
# Usage:
#   verify-appex-infoplist.sh --ipa path/to/App.ipa
#   verify-appex-infoplist.sh --archive path/to/App.xcarchive
#   verify-appex-infoplist.sh --app path/to/App.app
#   verify-appex-infoplist.sh --project path/to/project.yml [--project ...]
#   verify-appex-infoplist.sh --project-scan [DIR]     # find every project.yml under DIR (default .)
#
# Exit codes: 0 = all good, 1 = a violation was found, 2 = usage error.

set -uo pipefail

RED='\033[0;31m'; YELLOW='\033[0;33m'; GREEN='\033[0;32m'; BOLD='\033[1m'; NC='\033[0m'
[ -t 1 ] || { RED=''; YELLOW=''; GREEN=''; BOLD=''; NC=''; }

ERRORS=0
PB=/usr/libexec/PlistBuddy

# ── Verify one Info.plist has NSExtension.NSExtensionPointIdentifier ───────────
# args: <label> <plist-path>
verify_plist() {
  local label="$1" plist="$2"
  if [ ! -f "$plist" ]; then
    printf "  ${RED}✗${NC} %s — Info.plist not found: %s\n" "$label" "$plist"
    ERRORS=$((ERRORS + 1)); return
  fi
  local point
  point="$("$PB" -c "Print :NSExtension:NSExtensionPointIdentifier" "$plist" 2>/dev/null)"
  if [ -z "$point" ]; then
    printf "  ${RED}✗${NC} %s — missing NSExtension.NSExtensionPointIdentifier\n" "$label"
    printf "      ${YELLOW}↳ %s${NC}\n" "$plist"
    printf "      ${YELLOW}↳ would fail Apple processing with error 90348 (GENERATE_INFOPLIST_FILE does not inject this)${NC}\n"
    ERRORS=$((ERRORS + 1))
  else
    printf "  ${GREEN}✓${NC} %s — %s\n" "$label" "$point"
  fi
}

# ── Inspect every .appex inside a built .app directory ─────────────────────────
verify_app_bundle() {
  local app_root="$1" origin="$2"
  printf "${BOLD}Checking embedded app-extensions in %s…${NC}\n" "$origin"
  local appex count=0
  while IFS= read -r appex; do
    [ -z "$appex" ] && continue
    count=$((count + 1))
    verify_plist "${appex#"$app_root"/}" "$appex/Info.plist"
  done < <(find "$app_root" -name '*.appex' -type d)
  [ "$count" -eq 0 ] && printf "  ${YELLOW}No .appex bundles embedded (main app only).${NC}\n"
}

# ── Binary mode dispatch (.ipa / .xcarchive / .app) ────────────────────────────
binary_mode() {
  local kind="$1" target="$2"
  [ -e "$target" ] || { printf "${RED}Path not found: %s${NC}\n" "$target"; exit 2; }
  local app_root cleanup=""
  case "$kind" in
    archive)
      app_root="$(find "$target/Products/Applications" -maxdepth 1 -name '*.app' -type d 2>/dev/null | head -1)" ;;
    app)
      app_root="$target" ;;
    ipa)
      local tmp; tmp="$(mktemp -d)"; cleanup="$tmp"
      unzip -q "$target" -d "$tmp"
      app_root="$(find "$tmp/Payload" -maxdepth 1 -name '*.app' -type d 2>/dev/null | head -1)" ;;
  esac
  if [ -z "$app_root" ] || [ ! -d "$app_root" ]; then
    printf "${RED}No .app found inside %s${NC}\n" "$target"
    [ -n "$cleanup" ] && rm -rf "$cleanup"; exit 1
  fi
  verify_app_bundle "$app_root" "$(basename "$target")"
  [ -n "$cleanup" ] && rm -rf "$cleanup"
}

# ── Source mode: validate each app-extension's base plist in a project.yml ──────
# arg: <path to project.yml>
source_mode_one() {
  local yml="$1"
  [ -f "$yml" ] || { printf "${RED}project.yml not found: %s${NC}\n" "$yml"; ERRORS=$((ERRORS + 1)); return; }
  local proj_dir; proj_dir="$(cd "$(dirname "$yml")" && pwd)"
  # Emit "<target>|<infoplist-relpath>" for every `type: app-extension` target.
  # XcodeGen layout: target name at indent 2; `type:` / `INFOPLIST_FILE:` deeper in the block.
  local rows
  rows="$(awk '
    /^  [A-Za-z][A-Za-z0-9_.-]*:[[:space:]]*$/ {
      if (is_ext && plist != "") print target "|" plist
      target = $1; sub(/:$/, "", target); is_ext = 0; plist = ""; next
    }
    /^[[:space:]]+type:[[:space:]]*app-extension/ { is_ext = 1 }
    /^[[:space:]]+INFOPLIST_FILE:/ { if (plist == "") { plist = $2; gsub(/"/, "", plist) } }
    END { if (is_ext && plist != "") print target "|" plist }
  ' "$yml")"
  printf "${BOLD}%s${NC}\n" "$yml"
  if [ -z "$rows" ]; then
    printf "  ${YELLOW}No app-extension targets found.${NC}\n"; return
  fi
  local target plist
  while IFS='|' read -r target plist; do
    [ -z "$target" ] && continue
    if [ -z "$plist" ]; then
      printf "  ${RED}✗${NC} %s — type: app-extension but no INFOPLIST_FILE set\n" "$target"
      printf "      ${YELLOW}↳ GENERATE_INFOPLIST_FILE alone will NOT inject NSExtensionPointIdentifier${NC}\n"
      ERRORS=$((ERRORS + 1)); continue
    fi
    verify_plist "$target" "$proj_dir/$plist"
  done <<< "$rows"
}

# ── Argument parsing ───────────────────────────────────────────────────────────
[ $# -eq 0 ] && { sed -n '2,33p' "$0"; exit 2; }

PROJECTS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --ipa)         binary_mode ipa "${2:?--ipa needs a path}"; shift 2 ;;
    --archive)     binary_mode archive "${2:?--archive needs a path}"; shift 2 ;;
    --app)         binary_mode app "${2:?--app needs a path}"; shift 2 ;;
    --project)     PROJECTS+=("${2:?--project needs a path}"); shift 2 ;;
    --project-scan)
      scan_dir="${2:-.}"
      while IFS= read -r p; do PROJECTS+=("$p"); done < <(find "$scan_dir" -name project.yml -type f 2>/dev/null)
      # advance past optional dir arg
      if [ -n "${2:-}" ] && [ -d "${2:-}" ]; then shift 2; else shift; fi ;;
    -h|--help)     sed -n '2,33p' "$0"; exit 0 ;;
    *)             printf "${RED}Unknown argument: %s${NC}\n" "$1"; exit 2 ;;
  esac
done

if [ ${#PROJECTS[@]} -gt 0 ]; then
  printf "${BOLD}Checking app-extension Info.plists (source)…${NC}\n"
  for yml in "${PROJECTS[@]}"; do source_mode_one "$yml"; done
fi

echo
if [ "$ERRORS" -gt 0 ]; then
  printf "${RED}${BOLD}✗ %s app-extension Info.plist problem(s) — would fail Apple processing (error 90348).${NC}\n" "$ERRORS"
  printf "${YELLOW}Add an explicit INFOPLIST_FILE base plist with an NSExtension dict + NSExtensionPointIdentifier.${NC}\n"
  exit 1
fi
printf "${GREEN}${BOLD}✓ All app-extension Info.plists carry NSExtensionPointIdentifier.${NC}\n"
exit 0
