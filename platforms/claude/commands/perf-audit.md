---
description: "Profile a performance complaint and fix the biggest contributor with Instruments and MetricKit."
argument-hint: "[symptom or area]"
---

Run the `performance-instruments` skill on `$ARGUMENTS`.

Reproduces the symptom on a Release build, picks the right instrument (Time Profiler, App Launch, Hangs, Animation Hitches, Allocations/Leaks, Energy), finds the single biggest contributor, fixes it, re-measures to confirm the win, and adds a signpost or perf test so the regression can't silently return. Checks MetricKit field trends after release.
