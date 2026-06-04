---
description: "Build a current, labeled screenshot package of an app's UI for an external design reviewer, reusing the project's existing screenshot UITest + fastlane lane."
argument-hint: "<app> [prepare|capture|package|bundle|all] [--dest <dir>]"
---

Run the `design-handoff` skill on `$ARGUMENTS`.

Phases: `prepare` (reconcile the manifest against the existing screenshot UITest target — any host), `capture` (run the existing fastlane snapshot lane — capture-capable host only, behind the simulator-capability guard), `package` (collect PNGs into `latest/`, archive the prior set, write captions + design context + reviewer prompt, stamp provenance), `bundle` (zip + copy to `--dest`). Never invents a parallel harness; never captures on a machine the host guard marks `forbidden`.
