---
name: design-contract
description: Turn a visual mockup (HTML/PNG/Figma/spec) into a machine-readable design contract plus co-located mockup and #Preview/capture gates, so an executing agent cannot drift from the design. Use before writing or editing a plan that reproduces a mockup.
invoke: "/design-contract [mockup-path] — Extract a machine-readable design contract from a mockup"
---

# Design Contract

> **Purpose:** Convert a visual mockup into a tabular, section-numbered contract that a plan cites row-by-row, eliminating "compare against the mockup" drift.
> **Trigger:** A mockup exists (HTML, PNG, Figma export, detailed spec) and you are about to write the plan that builds it.

A plan that says "match the mockup" lets an executing agent hallucinate its own design — visually close, subtly wrong. The fix is a **machine-readable contract** (every color named, every string verbatim, every size mapped to real device points) plus **`#Preview`/capture gates** that make divergence a build-time failure rather than a review-time opinion.

## When to Use

- **Do use** when a brainstorm/design folder contains a visual mockup and the next step is a SwiftUI implementation plan.
- **Do use** when an existing plan references a mockup only softly ("compare against the mockup") and you want to harden it.
- **Don't use** for backend-only features, pure-text brainstorms with no visual, or one-file bug fixes.

## Command Reference

```
/design-contract <mockup-path>        # Extract contract from a mockup file
/design-contract <brainstorm-dir>     # Extract from a folder (reads every mockup in it)
```

## Workflow

### Step 1: Read the mockup in full

Read every mockup file end-to-end — do not skim. For HTML, grep `:root` for CSS custom properties and every inline `style=` for ad-hoc tokens. For PNG/Figma, enumerate frames visually.

**Gate:** you cannot proceed until you can list every distinct color, font size, spacing value, corner radius, animation, and user-facing string. If the mockup is 1000+ lines, read it in ≤400-line chunks.

### Step 2: Extract the contract

Write `<app>/docs/vision/<feature>-design-contract.md` using this section skeleton. The contract is **authoritative** — it wins over the mockup when they disagree (the mockup is a snapshot; the contract is tracked).

```
§1  — Color tokens (name, hex/rgba, token symbol, use). Every hex gets a NAME — no orphan literals.
§2  — Typography (name, font, size, weight, tracking, line-height, SwiftUI mapping)
§3  — Spacing scale (token, pt, used for)
§4  — Radii (token, pt, used for)
§5  — Shadows & glows (effect, spec, used for)
§6  — Component specs (layout, padding, radius, colors per component)
§7  — Motion (name, duration, easing, reduced-motion fallback)
§8  — Copy strings (every user-facing string, VERBATIM incl. punctuation, grouped by screen, with string ids)
§9  — Canonical frames (Frame ID, mockup anchor, SwiftUI #Preview name, state description) — 6–10 frames
§10 — Non-negotiables (hard rules: no light mode, no new screens, no count-down, etc.)
§11 — Open questions (what the mockup couldn't answer — font-metric widths, etc.)
```

**Apple-platform critical rules:**

- **Mockup px ≠ SwiftUI pt.** Mockup phones are scaled down to sit side-by-side in a browser; in-app sizes run **~1.5–1.8×** larger. §2 MUST carry a "SwiftUI mapping" column with the real device-pt value, not the mockup px. State the scale factor at the top of the contract.
- **Every hex gets a name, tied to a tokens file.** `#E8A15A` becomes `amber` in `Theme.swift` / `<App>Tokens.swift` (see `ios-design`/`apple-design`). The plan references `Theme.amber`, never the literal.
- **No copy-synonym drift.** If the mockup says `Gone.` with a period, §8 says `Gone.` with a period. The plan cites §8 by string id, never paraphrases.
- **Canonical frames are finite.** 6–10 frames is correct. More means the feature is too big for one plan — decompose.

### Step 3: Co-locate the mockup

The mockup lives canonically in the brainstorm folder. Make it openable from the code, and create the capture target:

```bash
cd <app>/docs/vision
ln -sf <relative-path-to-brainstorm>/<mockup> ./<mockup>     # symlink, stays git-committable
mkdir -p captures && touch captures/.gitkeep
```

Update `<app>/docs/vision/README.md` to link the contract, the symlinked mockup, and `captures/`.

### Step 4: Write the plan with hard gates

Every plan step cites the contract and requires preview-backed evidence. Open the plan with a **Fidelity contract** establishing four gates:

1. **Cite the contract** — every checkbox references a §section/row. No citation ⇒ the contract is incomplete; fix §1–§8 first.
2. **Previews are mandatory** — no view step is complete without a named `#Preview` rendering the §9 state verbatim.
3. **Capture proof** — a PNG of each touched §9 frame is committed to `captures/` at canonical device resolution (see `preview-capture`). On machines that cannot render previews, substitute the documented fallback (archive build as CI gate + human-rendered captures — see `preview-capture` §capability ladder).
4. **Diff justification** — any deviation from the mockup is either justified against a §section in the PR description or is a bug.

Make **Step 1 of the plan** = "encode tokens in `<App>Tokens.swift`" with a grep gate forbidding hex literals / ad-hoc paddings in view code. This front-loads the contract into the type system.

### Step 5: Commit and hand off

Single commit: `docs(<app>): extract design contract + harden <feature> verification gates`. In the body, explain *why* the gates exist (prevent drift during execution). Hand the plan to the execution skill.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| Soft-reference drift | Plan says "compare against mockup", no §citations | Require a §citation per checkbox; if one has none, §1–§8 is incomplete |
| Mockup-pt rendered as app-pt | Executor builds at the mockup's small px | §2 needs the SwiftUI-mapping column; scale 1.5–1.8× |
| Copy synonym drift | "Got it!" when mockup says "Got it" | §8 is the only source; cite by string id |
| Token leak | Hex literals reappear in view code weeks later | Plan Step 1 encodes tokens; grep gate forbids hex outside the tokens file |
| "Improvement" drift | Executor adds an unrequested glow | §10 forbids it; if the change is right, update the contract first, then code |
| Unreviewable PR | No captures; reviewer can't judge fidelity | Mergeable = every touched §9 frame has a fresh capture |

## Cross-References

- Render the captures: `preview-capture`
- Verify coverage + visual fidelity after build: `verify-against-spec` (its Visual Fidelity agent diffs `captures/` against §9)
- Tokens & Theme patterns: `apple-design` / `ios-design`
- API signatures for the views you build: `ios26-api-reference`

## Contract Maintenance

The contract is living until V1 ships, then it freezes and the mockup is archived. The contract wins over the mockup on disagreement. PRs that change a token must update the contract in the same change, or the next executor loses the reason.
