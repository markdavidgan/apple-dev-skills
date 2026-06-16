# Keynote Run Sheet — Standard & Template

Every Apple-grade project maintains a **keynote run sheet**: a committed, living
document anyone on the team could pick up and rehearse from cold. It is the
difference between *"we think this demos well"* (a guess) and *"here is the exact
90 seconds, the state it runs from, and what we do if a beat misfires"* (a plan).

**The review checks the artifact, not the rehearsal.** Whether the team has
*practiced* is unknowable from the repo and external to the product — a review
can never assert it. What a review *can* assert is whether this run sheet
**exists, is current, and is WWDC-worthy**. Rehearsal is what you do *against*
the run sheet; the run sheet is the thing the review actually grades.

**Location (convention):** `docs/keynote/run-sheet.md`. In a monorepo with
multiple apps, one per app: `docs/keynote/<app>-run-sheet.md`.

**Currency:** a run sheet names the build/version it was last validated against.
One older than the current marketing version is **stale**, not **present**.

---

## Required sections

### 1. The One-Sentence Story
The spine — the single sentence said on stage that makes the audience lean
forward. If it needs two sentences, the story isn't found yet. (Mirrors review
criterion §4.1.)

### 2. Cold Open — the first 10 seconds
What is on screen the instant the demo begins, before a word is spoken. The
strongest opens show the *payoff state*, never a launch screen or an empty list.

### 3. The Beat Sheet
The ~90-second spine as a table. Each beat is one row:

| # | Beat | On screen | Spoken line | Duration | Demo-safe? |
|---|------|-----------|-------------|----------|:---------:|
| 1 | Cold open | … | … | 0:10 | ✓ |
| 2 | The problem | … | … | 0:15 | ✓ |
| … | … | … | … | … | … |

Durations must sum to the target (≈90s). **Demo-safe?** flags any beat carrying a
network call, a loading state, a permission prompt, or a first-run-only moment —
the things that embarrass on stage.

### 4. Demo-Safe State Setup
The exact starting state, reproducible by someone who has never run the demo:
- Device & OS, orientation, appearance (light/dark).
- The build (scheme/config) and the signed-in account.
- Seeded data — which fixtures, which Scene, which contacts. Never live, never empty.
- Network posture — airplane mode, a known-good network, or a recorded fixture.
- Notifications silenced, **Low Power off**, brightness up, auto-lock off.
- Anything pre-warmed: first sync done, caches primed, permissions pre-granted.

### 5. The "One More Thing"
The beat that earns the gasp — the moment the technology disappears and only the
human benefit remains (a Live Activity that tells a story on the lock screen, a
Watch hand-off, an intelligence that suggests the next move). If there isn't one
yet, this section names the *candidate* and its status.

### 6. Failure & Recovery
The section that separates a run sheet from a script. For each beat that *could*
misfire live: the symptom, the recovery move, and the fallback (a screenshot, a
recorded clip, a clean skip). **A beat with no recovery has no business in a live
demo** — either make it demo-safe or cut it.

### 7. Projection-Scale Check
Demos are seen from the back of a hall: largest readable text, contrast verified
on the *actual* Scene/asset at worst case, pointer/touch indicators visible, no
UI that only reads at arm's length.

### 8. Reset Procedure
How to return to the exact demo-start state between run-throughs, in under a
minute. A demo you can't cleanly reset is a demo you can only run once.

### 9. Provenance
- **Last validated against:** build NNN (version X.Y.Z), date.
- **Seeded from review:** `docs/reviews/YYYY-MM-DD-…md`.

---

## Quality bar (how the Keynote panel grades it)

| State | Meaning | Review action |
|-------|---------|---------------|
| **ABSENT** | No run sheet artifact in the repo | Keynote finding — P2 by default, **P1 if a keynote / Apple Design Award slot is imminent**. Seed one from the demo script the panel just produced. |
| **THIN / STALE** | Exists but missing required sections, durations don't sum, no failure/recovery plan, or older than the current version | Quality finding naming the specific gaps. |
| **PRESENT & CURRENT** | All sections present, beats timed, recovery planned, validated against the current build | No artifact finding — grade its *craft* (story clarity, one-more-thing strength) as normal. |

A run sheet is never "done" when first written. It is re-validated every time the
demo flow changes — that is what keeps it a plan and not a relic.
