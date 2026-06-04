#!/usr/bin/env bash
# Simulator-capability ladder for design-handoff `capture`.
# Echoes exactly one of: forbidden | unavailable | insufficient | capable
# This is the SAME ladder the `preview-capture` skill uses — one convention
# across the Apple toolkit. The opt-out marker is AUTHORITATIVE: a machine that
# declares itself out (e.g. crashes on the simulator) is never overridden by a
# hardware probe. Run from the repo root so the `.claude/NO_SIMULATOR.md` marker
# resolves.
set -euo pipefail

cap_marker_present() {
  [ -f ".claude/NO_SIMULATOR.md" ] || [ -n "${AETHER_NO_SIMULATOR:-}" ] || \
  [ -f "$HOME/.config/no-simulator" ]
}

min_free_ram_gb=8
min_free_disk_gb=15

if cap_marker_present; then
  echo "forbidden"                       # human/policy opt-out — AUTHORITATIVE, stop here
elif [ "$(uname -s)" != "Darwin" ]; then
  echo "unavailable"                     # simulators are macOS-only
elif ! xcode-select -p >/dev/null 2>&1; then
  echo "unavailable"                     # no Xcode toolchain
elif ! xcrun simctl list runtimes 2>/dev/null | grep -qiE "iOS|watchOS|visionOS"; then
  echo "unavailable"                     # no installed simulator runtime
else
  ram_gb=$(( $(sysctl -n hw.memsize) / 1073741824 ))
  disk_gb=$(df -g . | awk 'NR==2 {print $4}')
  if [ "$ram_gb" -lt "$min_free_ram_gb" ] || [ "${disk_gb:-0}" -lt "$min_free_disk_gb" ]; then
    echo "insufficient"                  # meets neither RAM nor disk floor
  else
    echo "capable"
  fi
fi
