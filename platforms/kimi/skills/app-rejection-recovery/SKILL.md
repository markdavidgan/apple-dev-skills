---
name: app-rejection-recovery
category: asc
description: Diagnoses App Store rejections, drafts Resolution Center responses, and plans the fix for resubmission. Use when the user says "my app was rejected", "Apple rejected my app", "App Review rejection", "guideline violation", "Resolution Center response", "guideline 2.1", "guideline 4.3", "guideline 5.1.1", "binary rejection", "metadata rejection", "appeal App Review", "App Review Board", or "expedited review request". For pre-submission health checks, see submission-preflight. For metadata copy, see asc-aso.
invoke: "/rejection-recovery [guideline] — Diagnose an App Review rejection, draft a Resolution Center response, and plan the fix."
---

# App Rejection Recovery

**Diagnose Apple App Review rejections fast, write a response that gets re-reviewed within 24 hours, and ship the fix before your launch window closes.**

---

## Step 1 — Triage before you type a single word

Do not draft anything until you have answers to all of the following:

1. **Paste the full rejection verbatim** — every sentence, including the guideline number(s). Paraphrasing loses signal.
2. **First submission or update?** First submissions face higher scrutiny; updates that regress on a previously approved flow are a separate failure mode.
3. **What changed in this version?** A clean diff of what's new (features, SDKs, entitlements, Info.plist keys) narrows root cause immediately.
4. **Is this time-sensitive?** Marketing tied to a date, a live event, or a partner launch — that changes the escalation path.
5. **App category and monetization model** — required to assess 3.x IAP and 5.x privacy exposure.

Use `asc_get_review_detail` (App Store Connect MCP) to pull the current review state and any inline reviewer notes if the user hasn't already copied them.

---

## Apple Rejection Taxonomy

| Guideline | Bucket | Typical Fix |
|-----------|--------|-------------|
| 2.1 | Performance / completeness | Reproduce crash on reviewer's device + iOS; ship fixed binary with demo account |
| 2.3.x | Accurate metadata | Screenshots must match live binary; no unsupported device mentions |
| 2.5.x | Software requirements | Remove private API use; correct HealthKit / CallKit / SiriKit misuse |
| 3.1.1 | IAP — digital goods | All digital content sold through StoreKit; no external payment links |
| 3.1.2 | IAP — subscriptions | Auto-renewal disclosure on screen; restore purchases button; terms link |
| 3.2.2 | Unacceptable business model | MLM, lottery without license, or misleading monetization |
| 4.0 | Design | Broken layout, non-functional UI, copycat shell |
| 4.2 | Minimum functionality | Web wrapper, thin brochureware, or single-static-page app |
| 4.3 | Spam / duplicate | Substantive differentiation from your own or competitor portfolio required |
| 4.5.x | Apple sites and services | Correct Apple logo usage; no push-notification abuse |
| 5.1.1 | Privacy — data collection | Privacy policy URL live; App Privacy labels accurate; ATT copy specific |
| 5.1.2 | Data use and sharing | Privacy nutrition labels must reflect every SDK's collection, not just first-party |
| 5.1.5 | Location services | "Always" permission must be demonstrably necessary; "When In Use" for most apps |
| 5.1.7 | Health and medical | Disclaimers required; no diagnostic claims without regulatory clearance |
| 5.2.x | Intellectual property | Trademark or copyright holder permission in writing |
| 5.3.x | Gaming and gambling | Valid regional license required for real-money wagering |
| 5.6.1 | Developer code of conduct | Fake reviews, review manipulation, spam across apps |

---

## Common Rejection Playbooks

### Guideline 2.1 — Crash or incomplete functionality

The reviewer hit a crash or a dead-end flow you didn't catch internally.

**Fix sequence:**
1. Read the device model and iOS version Apple tested on — reproduce on that exact config or the closest available in Simulator.
2. If the crash is environment-dependent (account state, region, backend flag), provide a seeded demo account with a numbered walkthrough in the Resolution Center response. A Loom-style screen recording uploaded to a public URL eliminates ambiguity.
3. Ship a new binary. Never reply with "we couldn't reproduce it" without also providing the demo account — reviewers don't retry without a reproduction path.
4. Reference the exact crash location (view controller, function, or error log line) in your response to signal that you traced it fully.

### Guideline 2.3.10 — Inaccurate metadata or screenshots

Screenshots show UI that doesn't exist in the submitted binary, or device frames claim support that isn't declared.

**Fix sequence:**
1. Audit every screenshot: does every screen shown exist in this exact build?
2. Remove any iPad screenshots if `UIDeviceFamily` doesn't include iPad.
3. Strip third-party trademarks, logos, or app icons from promotional art unless you hold rights.
4. Replace placeholder copy ("Lorem ipsum", "Coming soon") anywhere visible in screenshots.
5. Cross-reference with `asc-aso` for listing-copy accuracy.

### Guideline 3.1.1 — IAP required for digital goods

An external payment link, a "Buy on web" CTA, or a reader-app workaround applied incorrectly.

**Fix sequence:**
1. Audit every purchase surface — in-app, settings, onboarding — for external payment references.
2. Implement StoreKit for all digital goods and premium features.
3. Note: the US External Purchase Link Entitlement (post-Epic ruling) allows a single outbound link for eligible developers — it requires an explicit entitlement request via ASC and does **not** apply globally. Don't apply it without verifying eligibility first.
4. See `paywall-design` for compliant purchase screen patterns and `app-store-pricing` for price tier mechanics.

### Guideline 4.3 — Spam or duplicate app

Apple is comparing your app to another in your portfolio or to a near-identical competitor.

This is the hardest bucket to recover from. No Resolution Center response fixes it — only the binary does.

**Fix sequence:**
1. Identify which app(s) the reviewer is comparing yours to. If it's your own portfolio, seriously consider consolidating.
2. Add a genuinely differentiated feature — not a UI reskin. The reviewer will compare the two side by side again on resubmission.
3. Update metadata to emphasize the unique value clearly — see `asc-aso`.
4. If this is the second 4.3 rejection for the same app: stop resubmitting. Appeal with concrete differentiation evidence, or retire the app.
5. Do not appeal a first-time 4.3 — fix and resubmit is faster than the App Review Board queue.

### Guideline 5.1.1 — Privacy: data collection disclosure

The privacy policy is missing, dead-linked, or the App Privacy labels underreport what your SDKs collect.

**Fix sequence:**
1. Privacy policy URL must be live, HTTPS, and contain app-specific language — not a generic company policy.
2. Open ASC → App Privacy and audit every data type against every SDK in your dependency tree. Analytics, attribution, and crash-reporting SDKs commonly over-collect relative to what developers declare.
3. ATT prompt string (`NSUserTrackingUsageDescription`) must name a specific use — "to show you relevant ads from our partners" — not "to improve your experience."
4. All `NSUsageDescription` strings must explain the user benefit in plain language, not describe the permission mechanism.
5. See `privacy-manifest` for the PrivacyInfo.xcprivacy required API declaration process.

### Guideline 5.1.5 — Location: "Always" not justified

Your app requests `Always` location authorization but the reviewer can't confirm a legitimate background need.

**Fix sequence:**
1. Audit whether your app genuinely requires background location. Navigation, delivery tracking, and geo-fencing are valid. Most apps don't need it.
2. Downgrade to `WhenInUse` if background location isn't a core feature.
3. If `Always` is legitimately required: add a prominent in-app explanation screen before the system prompt, update `NSLocationAlwaysAndWhenInUseUsageDescription` with a specific justification, and note the user scenario in your Resolution Center response.

---

## Resolution Center Response Template

A well-structured response gets your app into the re-review queue within 24 hours. A defensive or vague response does not.

```
Hello App Review Team,

Thank you for the detailed feedback on guideline [X.Y.Z].

UNDERSTANDING
We understand the issue is [one sentence describing exactly what was flagged — do not paraphrase the guideline, describe the specific instance].

CHANGES MADE
1. [Specific change — what was removed, added, or fixed, and where in the app]
2. [Specific change]
3. [Specific change if applicable]

DEMO INFORMATION
  Username: demo@yourapp.com
  Password: [password]
  Reproduction steps:
    1. [Step]
    2. [Step]
    3. [Step]
  Screen recording: [URL — optional but strongly recommended for 2.1 rejections]

We have submitted build [version (build number)] containing these changes. Please let us know if you need any additional information.

Thank you,
[Your name]
```

**Hard rules:**
- Never argue the guideline. Acknowledge it and address it.
- Never resubmit the same binary as a response to a binary rejection — you must ship a new build.
- Always state the exact new build number. Reviewers will not hunt for it.
- Provide demo credentials for every response, even if the rejection isn't login-related. Reduce friction at every point.
- One response per issue. If multiple guidelines were cited, address each in a numbered list under CHANGES MADE.

---

## Appeal vs. Fix Decision

| Situation | Action |
|-----------|--------|
| Reviewer applied the guideline to the wrong feature | Appeal via App Review Board — be factual, brief, include screenshots |
| Reviewer tested on wrong device or account state | Respond in Resolution Center with exact reproduction steps; no formal appeal needed |
| First-time 4.3 spam rejection | Fix substantively and resubmit; appealing is slower and rarely wins |
| Guideline you demonstrably comply with | Appeal with evidence: code references, screenshots, privacy policy sections |
| Second or third rejection on same issue | Escalate to App Review Board; re-review is unlikely to go differently |
| 5.6.1 account threat or developer suspension | Appeal immediately with full context; do not ignore or delay |

**App Review Board** (developer.apple.com/contact/app-store/) — expect 5–10 business days. Reserve appeals for genuine reviewer error. Frivolous appeals slow your account's review velocity.

---

## Expedited Review

Request via ASC → Help → Contact Us → App Review → Request Expedited App Review.

**Valid reasons Apple accepts:**
- Critical bug fix affecting existing users in a live build
- Security vulnerability disclosed and patched
- Time-sensitive event with a contractual or public commitment (conference, launch partner, media coverage date)

**Not valid:**
- Marketing deadlines you set internally
- "We need this for our investors"
- Competitive pressure

Abuse of expedited requests is noted on your account. Use it once per meaningful situation.

---

## Diagnosis Output Template

Use this structure when presenting findings to the user:

```
REJECTION DIAGNOSIS — [App Name] [Version]

REJECTION TYPE
  Guideline:   [number and title]
  Bucket:      [from taxonomy table]
  Complexity:  Low / Medium / High

ROOT CAUSE
  [One clear paragraph in plain English explaining what triggered the rejection
   and why the reviewer flagged it]

FIX PLAN
  Binary changes:        [list]
  Metadata changes:      [list]
  ASC configuration:     [list — entitlements, App Privacy, etc.]
  Estimated effort:      [hours]

RESOLUTION CENTER RESPONSE
  [Completed template from above]

RESUBMISSION CHECKLIST
  [ ] Reproduced on device/OS Apple tested
  [ ] Demo account seeded and verified
  [ ] Build number incremented (version or build)
  [ ] App Privacy labels reconciled with all SDKs
  [ ] Resolution Center response posted before resubmission
  [ ] Expedited review requested if time-sensitive (and justified)

ESCALATION PATH
  If rejected again on same guideline: [specific next step — appeal, redesign, or retire]
```

---

## Prevention: Stop the Next Rejection Before It Happens

After the current rejection is resolved, run through `submission-preflight` before every future submission. High-signal checks specific to the rejection types above:

- [ ] Every screenshot matches the exact binary being submitted — no future UI, no placeholder states
- [ ] All `NSUsageDescription` keys written for users, not engineers
- [ ] Privacy policy URL returns HTTP 200 from an external network (not just localhost)
- [ ] App Privacy labels audited against every third-party SDK's published privacy manifest
- [ ] No "BETA", "BUG FIXES", or generic What's New copy in the version release notes
- [ ] Sign in with Apple offered alongside every third-party social login option
- [ ] Demo account seeded with realistic content and credentials documented before submission
- [ ] If the app has a paywall, review `paywall-design` for 3.1.1 and 3.1.2 compliance before each update

---

## Cross-Skill Handoffs

| Need | Skill |
|------|-------|
| Full pre-submission checklist | `submission-preflight` |
| App Privacy labels and PrivacyInfo.xcprivacy | `privacy-manifest` |
| Listing copy, screenshots, keywords after approval | `asc-aso` |
| Paywall compliance (3.1.1, 3.1.2) | `paywall-design` |
| Price tiers and subscription configuration | `app-store-pricing` |
| Build upload and submission mechanics | `asc-submission` |

Use `asc_check_submission` and `asc_get_review_detail` (App Store Connect MCP) to pull live review state, current build status, and any reviewer attachments without leaving the agent.
