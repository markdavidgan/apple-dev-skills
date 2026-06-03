---
name: performance-instruments
category: quality
description: Diagnose and fix iOS performance — launch time, main-thread hangs and scroll hitches, memory growth and leaks, and energy, using Instruments, os_signpost, and MetricKit field data. Use when the app is slow, janky, or battery-hungry, when investigating launch time, frame drops, retain cycles, or memory warnings, or when profiling with Instruments. Trigger on "slow", "laggy", "hang", "hitch", "memory leak", "Instruments", "Time Profiler", "launch time", "MetricKit", or "battery drain".
invoke: "/perf-audit [symptom] — Profile a complaint and fix the biggest contributor with Instruments and MetricKit."
---

# Performance & Instruments

**Measure first, then fix the thing the measurement points at.** Guessing at performance wastes days. Pair with `ios-test` (perf tests) and `ios-standards` (concurrency).

> Rule: never optimize without a profile. A 2-line fix at the real hot spot beats a week of speculative micro-optimization elsewhere.

---

## Pick the right instrument

| Problem | Instrument / tool |
|---------|-------------------|
| CPU hot spots, "where is time going" | **Time Profiler** |
| App launch breakdown | **App Launch** template |
| Main-thread stalls (UI freezes) | **Hangs** / **Thread State** |
| Dropped frames while scrolling/animating | **Animation Hitches** / **SwiftUI** |
| Memory growth, abandoned memory | **Allocations** + **Leaks** + Memory Graph |
| Battery / wakeups / networking | **Energy Log**, **Points of Interest** |
| Real-world data from users | **MetricKit** (`MXMetricManager`) |

Profile a **Release/optimized build on a real device** — Debug builds and the simulator lie about performance.

---

## Launch time (the first impression)

Target **< ~400ms** to first frame. Apple flags slow launches in App Analytics.

- Use the **App Launch** instrument to see pre-main (dyld, framework load) vs post-main work.
- **Reduce dynamic frameworks** — each one costs launch time; prefer static linking / fewer dependencies.
- **Defer non-critical work** off the launch path: don't do network calls, disk scans, or analytics setup in `init`/`application(_:didFinishLaunching…)`. Kick them off after first frame.
- Avoid heavy work in SwiftUI `body` / `App.init`.

Mark your own phases with signposts so they show on the timeline:

```swift
import OSLog
let signposter = OSSignposter(subsystem: "com.app", category: "launch")
let state = signposter.beginInterval("loadModel")
// … work …
signposter.endInterval("loadModel", state)
```

---

## Hangs & hitches (jank)

- A **hang** = the main thread is blocked > ~250ms (user sees a freeze). A **hitch** = a frame misses its deadline (stutter). On ProMotion (120Hz) the per-frame budget is ~8ms, so hitches are easier to hit.
- **Get work off the main thread.** Heavy decoding, file I/O, image resizing, JSON parsing → background (an `actor` or `Task.detached`), then hop back to `@MainActor` for UI only. See `ios-standards`.
- **Don't block on `await` of slow work inside view updates.** Load asynchronously and render a placeholder.
- In lists: pre-size rows, avoid synchronous image decode, use lazy stacks/`List` recycling.
- The **Hangs** instrument (and Xcode's runtime "Hang" warnings) pinpoint the blocking call stack.

---

## Memory

- **Leaks (cycles):** the usual culprit is a closure capturing `self` strongly. Use `[weak self]` in escaping closures, delegates, and `Task`s that outlive the view. The **Memory Graph Debugger** (Xcode → Debug Memory Graph) shows retain cycles visually; **Leaks** flags them live.
- **Abandoned memory / growth:** **Allocations** with "Mark Generation" — repeat an action, mark, and see what never frees. Caches without limits are a classic.
- Respond to memory pressure; don't cache unbounded. Large images: downsample to display size before keeping them.

---

## MetricKit — performance from real users

Instruments shows *your* device; MetricKit shows the field.

```swift
import MetricKit
final class Metrics: NSObject, MXMetricManagerSubscriber {
    func didReceive(_ payloads: [MXMetricPayload]) { /* launch, hang, hitch, memory, disk, energy */ }
    func didReceive(_ payloads: [MXDiagnosticPayload]) { /* crash, hang, CPU-exception diagnostics */ }
}
// MXMetricManager.shared.add(subscriber)
```

Payloads arrive ~once/day. Aggregate `applicationLaunchMetrics`, `applicationHangTime`, `animationMetrics` (hitch ratio), and `memoryMetrics` to catch regressions you'd never reproduce locally. Feed these into your analytics (see `app-analytics`).

---

## Workflow (`/perf-audit`)

1. Reproduce the complaint on a **real device, Release build**.
2. Pick the instrument for the symptom (table above) and capture a trace.
3. Find the **single biggest** contributor; fix it; re-measure to confirm the win.
4. Add a **signpost or perf test** (`ios-test`) so the regression can't silently return.
5. Check MetricKit trends after release to verify the fix holds in the field.
