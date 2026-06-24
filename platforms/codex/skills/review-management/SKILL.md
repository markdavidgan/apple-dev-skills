---
name: review-management
category: asc
description: Pull, cluster, triage, and respond to App Store reviews via the App Store Connect MCP. Use when you need to fetch recent reviews, analyze sentiment, draft developer responses, track recurring themes as product signals, or close the loop on a rating recovery campaign. Trigger phrases: "triage reviews", "respond to reviews", "what are users complaining about", "review sentiment", "draft a review response", "App Store feedback", "bad reviews", "one-star reviews", "review themes".
invoke: "/review-triage [app] — Pull App Store reviews, analyze sentiment, and draft developer responses."
---

# Review Management

**Turn App Store reviews from noise into signal — and respond in a way that recovers ratings, surfaces real bugs, and builds reviewer trust.**

---

## MCP Tools at a Glance

| Tool | What it does |
|---|---|
| `asc_list_reviews` | Fetch reviews by app, territory, rating, or date range |
| `asc_get_review_detail` | Load full body + metadata for a single review |
| `asc_respond_review` | Post a new developer response |
| `asc_update_response` | Edit an existing response |
| `asc_delete_response` | Remove a response (rarely needed; prefer editing) |

All tools accept the app's `appId` (the numeric App Store ID, not the bundle ID).

---

## Core Workflow: List → Cluster → Triage → Respond → Ship

### Step 1 — Pull Recent Reviews

```
asc_list_reviews(appId, territory="US", rating=null, limit=200, sort="mostRecent")
```

Start broad. Pull the last 200 reviews from your primary territory, unsorted by rating so you see the real chronological stream. Repeat for secondary territories if your user base is multilingual.

**Filters to use situationally:**

- `rating=1` or `rating=2` — when a new build caused a spike in low ratings
- `territory="JP"` — when localizing or debugging region-specific issues
- `sort="mostCritical"` — when you want to prioritize damage control

### Step 2 — Cluster by Theme

Read each review body and assign one primary bucket. Quantify:

| Bucket | Signal it maps to |
|---|---|
| Crash / hang | Engineering — pair with `asc-build-check`, `performance-instruments` |
| Bug / broken feature | Engineering backlog |
| Missing feature | Product roadmap |
| Pricing / paywall | Monetization — pair with `paywall-design` |
| UX confusion | Onboarding, IA, copy |
| Praise | Nothing to fix; optionally use in ASO copy (`asc-aso`) |

A review can touch two buckets; assign it to the dominant one.

### Step 3 — Triage by Priority

Not all one-star reviews are equal. Score each cluster:

1. **Volume** — how many reviews mention this theme?
2. **Recency** — is this cluster growing week-over-week?
3. **Rating weight** — crashes skew 1-star; UX confusion often lands at 2–3.
4. **Respondability** — can you fix it now, acknowledge it honestly, or only apologize?

Clusters with high volume + high recency + no existing response = respond first.

### Step 4 — Draft Responses

Use the HEAR framework (see below). Call `asc_get_review_detail` on representative reviews from each cluster to read the full text before drafting.

```
asc_get_review_detail(reviewId)
```

Draft one canonical response per cluster theme. Personalize lightly — swap in the specific feature name the reviewer mentioned.

### Step 5 — Post Responses

```
asc_respond_review(reviewId, responseBody)
```

Apple's guidelines: responses are public, cannot be longer than 5,970 characters, and are moderated. Responses go live within minutes but can be rejected for policy violations.

To edit a live response after a fix ships:

```
asc_update_response(responseId, responseBody)
```

Update to close the loop: "Update: this is fixed in 4.2, available now."

---

## The HEAR Response Framework

| Step | What you do |
|---|---|
| **H**ear | Restate what the reviewer experienced — show you actually read their review |
| **E**mpathize | Validate the frustration without being sycophantic |
| **A**cknowledge or Apologize | Own the problem if it's yours; acknowledge if it's a limitation |
| **R**esolve | Give a concrete next step: a fix ETA, a workaround, or a support link |

Every response must end with a next step. "We're looking into it" is not a next step.

---

## Response Do / Don't Rules

**Do:**
- Respond within 48 hours of a 1–2 star review appearing
- Use the reviewer's language register (casual app = casual tone)
- Give a version number when a fix is live
- Invite the reviewer to contact support with a direct link
- Update old responses when the underlying issue is resolved

**Never:**
- Argue, defend aggressively, or correct the reviewer's perception
- Ask happy 5-star reviewers to do anything (no "rate us again!", no prompts)
- Reveal personal data or order information
- Promise a specific ship date you cannot guarantee
- Write a response that sounds like a press release

---

## Response Templates

### Crash / Bug

> Thank you for the report — this is clearly not the experience [App Name] should deliver. We've identified a crash affecting [iOS version / device / scenario] and a fix is in review now. In the meantime, [workaround if any]. If you'd like to help us validate the fix before it ships, reach out at [support link] — we'd love to get you on TestFlight.

### Missing Feature

> We hear you — [feature] is one of our most-requested additions. It's on our roadmap, and your feedback moves it up. If you want to be notified when it lands (and get early access), drop us a line at [support link]. We appreciate you taking the time to tell us.

### Pricing / Paywall Complaint

> Fair feedback. [App Name]'s subscription supports [brief honest value statement — e.g., "continuous server costs and weekly content updates"]. We know that doesn't work for everyone. If you'd like to discuss your specific situation, our support team at [link] has options. We want you to feel the value before you pay for it.

### Confused User

> Sorry the [feature / flow] wasn't clear — that's on us to fix. Here's the quick path: [1–2 sentence workaround or explanation]. We're also revising that part of the UI in our next update. If you get stuck, [support link] connects you directly with our team.

### 5-Star Praise

> Thank you — this genuinely means a lot to the team. More good things coming.

Keep praise responses short. Do not solicit anything.

---

## Sentiment Breakdown Output Template

After running the triage workflow, produce this summary before posting any responses:

```
REVIEW TRIAGE — [App Name] — [Date Range]

Total reviews pulled: N
Primary territory: US (+ any others)

SENTIMENT BREAKDOWN
  5-star:  N  (N%)
  4-star:  N  (N%)
  3-star:  N  (N%)
  2-star:  N  (N%)
  1-star:  N  (N%)

THEME CLUSTERS
  Crash / hang:          N reviews  — [top device/OS combo]
  Bug / broken feature:  N reviews  — [top feature affected]
  Missing feature:       N reviews  — [most requested]
  Pricing / paywall:     N reviews  — [specific objection]
  UX confusion:          N reviews  — [screen or flow]
  Praise:                N reviews  — [most-cited positive]

TOP 3 RECURRING ISSUES (by volume + recency)
  1. [Issue] — N mentions, avg rating N.N — Action: [engineering/product/response]
  2. [Issue] — N mentions, avg rating N.N — Action: [engineering/product/response]
  3. [Issue] — N mentions, avg rating N.N — Action: [engineering/product/response]

RESPONSES QUEUED
  - [reviewId] — [1-line summary] — [template used]
  - ...

PRODUCT ACTIONS
  - Bug clusters → engineering backlog ticket
  - Crash cluster → asc-build-check + performance-instruments
  - Paywall cluster → paywall-design
  - Rating trend → rating-prompt-strategy
```

---

## Turning Reviews into a Backlog

Reviews are unstructured user research. Make them structured:

**Crash clusters** — Export review bodies mentioning crash/freeze/hang. Hand them to `asc-build-check` to correlate with build diagnostics and to `performance-instruments` for profiling targets. Include the iOS version and device model that appear most often in the reviews.

**Bug clusters** — File one engineering ticket per distinct bug pattern. Attach the review IDs as evidence. Set priority by cluster size and rating impact.

**Missing feature clusters** — Add each to the product backlog with a review count as the demand signal. Revisit quarterly.

**Paywall / pricing clusters** — Route to `paywall-design` for a conversion audit. A pricing objection in reviews often reflects a paywall UX problem, not a price point problem.

**UX confusion clusters** — Flag the specific screen or flow to design. UX confusion reviews are free usability tests.

**Praise clusters** — Extract the phrases users reach for when describing what they love. Feed these into ASO keywords and screenshots via `asc-aso`.

---

## Rating Recovery Loop

A rating dip after a release follows a predictable arc. Work it explicitly:

1. **Detect** — `asc_list_reviews(sort="mostRecent", rating=1)` immediately after a build ships. A spike within 24 hours means the build broke something.
2. **Diagnose** — Cross-reference with `asc-build-check` crash rates and `performance-instruments` regression data.
3. **Fix + Expedite** — Ship a hotfix. Request expedited review in App Store Connect if the regression is severe.
4. **Respond** — Update every unanswered 1-star review in the affected cohort with the fix version once it's live. Use `asc_update_response` on any responses you already posted.
5. **Prompt recovered users** — After the fix ships, use `rating-prompt-strategy` to surface a re-rating prompt to users who experienced the bug and have since used the fixed version. Never prompt users who haven't opened the fixed build.

Average rating recovery time with this loop: 2–4 weeks after a hotfix ships, assuming active response and a properly timed prompt.

---

## App Rejection Edge Case

If a review mentions behavior that triggers an App Store guideline concern (e.g., "the app charged me without showing a price"), cross-reference with `app-rejection-recovery`. A pattern of reviews describing a guideline violation can precede a removal notice.

---

## Cross-Skill Integration Map

| Situation | Skill to invoke |
|---|---|
| Crash spike in reviews | `asc-build-check`, `performance-instruments` |
| Paywall / pricing objections | `paywall-design` |
| Rating dip recovery | `rating-prompt-strategy` |
| Praise language for ASO | `asc-aso` |
| Guideline-risk review patterns | `app-rejection-recovery` |

---

## Checklist: Weekly Review Cadence

- [ ] Pull last 7 days of reviews (`asc_list_reviews`, limit=100, sort="mostRecent")
- [ ] Assign every review to a theme bucket
- [ ] Respond to all 1–2 star reviews within 48 hours
- [ ] Update stale responses where a fix has shipped
- [ ] Escalate crash / bug clusters to engineering with review IDs
- [ ] Update product backlog with feature request counts
- [ ] Check if any cluster warrants a `rating-prompt-strategy` campaign
- [ ] Spot-check ASO keywords against praise language (`asc-aso`)
