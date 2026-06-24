# App Review Submission Package — Standard & Template

The compliance twin of the keynote run sheet. Every project headed for the App
Store maintains a committed **submission package**: the artifact you hand App
Review so a human reviewer can understand, reach, and clear the app without
guessing. It is the part of compliance that is *in your control and checkable in
the repo* — as opposed to the part that is not.

**The review checks the artifact, not the outcome.** Whether Apple *approves* is
unknowable from the repo: it depends on a human reviewer on a given day, the
running binary's behaviour on their device, server-side content, the accuracy of
ASC metadata and screenshots, and guidelines that shift. A repo-static review
can only verify **detectable rejection-risk surface** and whether the submission
package **exists, is complete, and is current**. A `LOW` risk band means *"no
rejection risk I can see in the repo"* — never *"Apple will approve this."*

**Location (convention):** `docs/app-store/review-notes.md` (or
`docs/app-store/<app>-review-notes.md` in a monorepo).

**Currency:** the package names the build/version it was last validated against.
One older than the current marketing version is **stale**, not **present**.

---

## Required sections

### 1. What the app is — in 20 seconds
One honest paragraph a reviewer can read at a glance: what it does, who it's for,
the one thing to try. Plain language, no marketing.

### 2. Demo access
- Credentials for any required account, **or** an explicit "no account — uses
  iCloud / Sign in with Apple, nothing to log into."
- If features sit behind purchase, a reviewer-comp path or a note that StoreKit
  sandbox covers them.

### 3. How to reach every reviewable feature
The reviewer must be able to exercise everything that could be flagged —
especially anything behind a **purchase, permission prompt, device pairing, or
first-run-only** moment. Spell out the taps. (E.g. "to see the Live Activity:
start a session, lock the device"; "to test sharing with one device: invite,
then accept from Settings → …".)

### 4. Account & data deletion (Guideline 5.1.1(v))
- If the app supports account *creation*: the exact in-app path to delete the
  account and its data.
- If it does not (iCloud-only, no app-managed account): a one-line statement of
  *why it's exempt*. Reviewers reject on this constantly; pre-empt it.

### 5. Privacy posture
- Where the privacy policy lives — **in-app** (required) and the URL.
- What data leaves the device and to whom (often: nothing / no third parties).
- How the App Privacy "nutrition label" maps to actual behaviour, and how
  `PrivacyInfo.xcprivacy` backs it.

### 6. Export compliance
The `ITSAppUsesNonExemptEncryption` answer and its one-line rationale (standard
HTTPS/OS crypto is exempt; declare it so the build isn't held).

### 7. Sensitive-content rationale (when applicable)
For apps near **health, crisis, finance, or user-generated content**: state
plainly what the app *is* and *is not* — e.g. "a personal journal and companion,
**not** a medical device; makes no diagnostic or treatment claims" — and how any
safety/moderation surface is handled. This is what turns a 2-week 1.4.x / 5.x
rejection round-trip into a clean pass.

### 8. Provenance
- **Last validated against:** build NNN (version X.Y.Z), date.
- **Seeded from review:** `docs/reviews/YYYY-MM-DD-…md`.

---

## Quality bar (how the Compliance panel grades it)

| State | Meaning | Review action |
|-------|---------|---------------|
| **ABSENT** | No submission package in the repo | Compliance finding — P2 by default, **P1 if submission is imminent**. Seed one from this template. |
| **THIN / STALE** | Missing required sections (no deletion statement, no demo access, no sensitive-content rationale where needed), or older than the current version | Quality finding naming the specific gaps. |
| **PRESENT & CURRENT** | All applicable sections present and validated against the current build | No artifact finding. |

---

## Out of static scope (name these so a clean risk band isn't misread)

A repo-static compliance review **cannot** verify, and must not imply, the
following — list them explicitly in the report so `LOW` risk is not read as
"done":

- The running binary's behaviour on the reviewer's device (crashes, hangs).
- Server-side content, moderation, or anything fetched at runtime.
- ASC-side metadata: screenshot accuracy, description claims, age rating, price.
- The reviewer's subjective judgement (4.0 design, 4.2 minimum functionality).
- The approval itself. No static review predicts it; it de-risks it.
