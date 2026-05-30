---
name: preview-capture
description: Render named SwiftUI #Previews to PNG at canonical device resolution for design-contract verification, with an automatic simulator-capability check and a documented fallback for machines that cannot or must not run the simulator. Use to produce capture proof for a design contract's §9 frames.
invoke: "/preview-capture [preview-name...] — Render named #Previews to committed PNGs"
---

# Preview Capture

> **Purpose:** Turn a design contract's canonical `#Preview` frames into committed PNGs that a reviewer can diff against the mockup.
> **Trigger:** A plan written with `design-contract` requires capture proof, and you need to render `#Preview`s to images.

A design contract's §9 maps each canonical frame to a named `#Preview`. This skill renders those previews to `captures/<PreviewName>.png` so fidelity becomes reviewable. It first decides **whether this machine may render at all** — because "looks capable" is not the same as "is allowed."

## When to Use

- **Do use** to generate capture proof for `design-contract` §9 frames before opening a PR.
- **Do use** to refresh captures after a UI change touches a contracted frame.
- **Don't use** for ad-hoc screenshots of a running app (that's `ios-simulate`), or when there is no design contract.

## Command Reference

```
/preview-capture                       # Render every contracted #Preview in the touched files
/preview-capture <PreviewName> ...     # Render specific named previews
```

## Step 1: Gauge simulator capability (REQUIRED — run first)

You cannot reliably probe "will the simulator crash *this* machine" from hardware. A Mac that meets every spec can still destabilize on boot. Therefore an **explicit opt-out always wins over any hardware probe** — a passing probe must never re-enable a machine a human has marked unsafe.

Resolve capability with this precedence ladder:

```bash
# --- simulator-capability ladder -------------------------------------------
# Echoes one of: forbidden | unavailable | insufficient | capable
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
# ---------------------------------------------------------------------------
```

**Interpretation:**

| Result | Meaning | Action |
|--------|---------|--------|
| `forbidden` | A marker (`.claude/NO_SIMULATOR.md`, `AETHER_NO_SIMULATOR`, `~/.config/no-simulator`) opts this machine out | **Go to Step 3 (fallback).** Never override. |
| `unavailable` | Not macOS, no Xcode, or no installed runtime | Go to Step 3. Cannot render here. |
| `insufficient` | Below the RAM/disk floor | Go to Step 3; warn the user the machine is under-resourced. |
| `capable` | Probe passed and no opt-out | Go to Step 2. |

> The hardware probe is a *convenience* that catches obvious "no Xcode" cases. The **marker is the authority.** If you are unsure, treat as `forbidden`.

## Step 2: Render previews (capable machines)

Use Xcode's preview-to-image path. Each `#Preview` named in the contract's §9 renders at the canonical device resolution recorded in the contract (e.g. iPhone 17 Pro Max).

```bash
# Boot the canonical device once (see ios-simulate for device selection)
xcrun simctl boot "<canonical-device>" 2>/dev/null || true

# Render each contracted preview to captures/. Prefer the project's own
# preview-render target/script if present; otherwise drive the simulator and
# screenshot the rendered preview.
xcrun simctl io booted screenshot "<app>/docs/vision/captures/<PreviewName>.png"
```

Commit the PNGs alongside the implementing change. One PNG per §9 frame, named exactly the §9 Preview name so the reviewer can map 1:1.

**Never run iOS UI tests as part of this** — capture is a render, not a test pass. (See `ios-test` for why UI-test execution is gated.)

## Step 3: Fallback (forbidden / unavailable / insufficient)

When this machine may not render, the gate **substitutes** rather than disappears:

1. **CI gate = archive build.** Run the project's archive/export (e.g. `make export-test-<app>` / `xcodebuild archive`). This catches Swift 6 strict concurrency, signing, asset-catalog, and Live Activity encoding failures that a debug render would not — it is a stronger correctness gate than a simulator screenshot.
2. **Visual proof = a human render.** The `#Preview`s remain **mandatory in code** (they cost nothing and a teammate renders them in Xcode or checks a TestFlight build on device). That person drops the PNGs into `captures/<PreviewName>.png`.
3. **Honesty rule.** The agent must NOT fabricate captures and must NOT claim visual parity it cannot see. It states plainly: *"previews compile and archive passes; visual parity pending a teammate's Xcode render."*

Record in the plan which captures are agent-produced vs. pending-human, so the PR reviewer knows what is actually verified.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| Ladder returns `capable` on a known-bad machine | Marker missing | Create `.claude/NO_SIMULATOR.md` (or set `AETHER_NO_SIMULATOR=1`); the marker is authoritative |
| `xcrun simctl` hangs / crashes the host | Machine destabilizes despite passing specs | Add the opt-out marker and use Step 3 permanently for that machine |
| Capture name ≠ §9 Preview name | Hand-named file | Rename to match §9 exactly; the reviewer maps captures→frames by name |
| Blank/black capture | Simulator not booted, or preview compile error | Boot the device; confirm the `#Preview` compiles in the archive build |

## Cross-References

- Defines the §9 frames and capture gate: `design-contract`
- Consumes the captures for fidelity diffing: `verify-against-spec` (Visual Fidelity agent)
- Device selection, simctl workflows: `ios-simulate`
- Why UI tests are gated separately: `ios-test`
