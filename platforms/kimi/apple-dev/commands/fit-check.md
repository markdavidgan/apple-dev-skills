---
description: "Audit a design or subsystem for primitive/problem fit (the wrong-primitive trap). Runs the architecture-fit-check skill."
argument-hint: "[path-or-subsystem]"
---

Run the `architecture-fit-check` skill on `$ARGUMENTS` (default: the subsystem touched by the current change, or the design under discussion).

Produce the five-question audit, a fit verdict (**fits** / **mismatch** / **needs-observability**), and — if mismatched — the fitting primitive from the decision matrix plus the cheapest falsifiable spike to prove the substrate before committing.
