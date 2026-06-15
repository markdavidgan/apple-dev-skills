---
name: app-launch
category: product
description: Pre-launch to post-launch playbook for shipping a new iOS/macOS app or major version. Use when user says "plan my app launch", "launch checklist", "prepare to ship", "TestFlight beta strategy", "Product Hunt launch", "phased release", "press outreach", "launch day checklist", "8-week launch plan", or wants a structured countdown from development to App Store live.
---

# App Launch

**Ship a new app or major version with a disciplined 8-week countdown — from final positioning to post-launch phased rollout.**

This skill owns the end-to-end launch process. It delegates asset work to `app-brand-identity`, listing copy to `asc-aso`, submission mechanics to `asc-submission`, risk checks to `submission-preflight`, pricing to `app-store-pricing`, featuring pursuit to `app-store-featured`, build health to `asc-build-check`, and paid acquisition to `apple-search-ads`.

---

## The 8-Week Launch Countdown

### Week 8 — Lock Positioning

**Goal:** Nail the single sentence that explains why your app exists.

- [ ] Write the positioning statement: "For [audience] who [need], [App] is the [category] that [key differentiator]. Unlike [alternatives], we [unique proof point]."
- [ ] Confirm your monetization model and price tier — see `app-store-pricing`
- [ ] Define the one launch metric that declares success (downloads, revenue, rating count)
- [ ] Identify your 3–5 target keywords (seed for `asc-aso` later)
- [ ] Decide your release type: full release or phased? (See [Release Strategy](#release-strategy))

---

### Week 7 — Brand and Store Assets

**Goal:** Hand off all visual deliverables so nothing blocks the listing later.

- [ ] App icon finalized at 1024×1024 px — hand off to `app-brand-identity`
- [ ] Screenshots designed for every required device size (iPhone 6.9", 6.5", iPad 13")
- [ ] App Preview video scripted and recorded (optional but strongly recommended for featuring)
- [ ] Feature graphic / promotional image ready
- [ ] Press kit: icon (1024px), screenshots (3 hero), brief (150 words), founder photo

> Screenshots convert. Spend disproportionate time here. Lead with the emotional outcome, not the interface. Show text large enough to read on a phone-sized thumbnail in search results.

---

### Week 6 — TestFlight Beta

**Goal:** Real signal from real people before GA.

#### Set up the beta group via ASC MCP

```
1. asc_list_apps          → get your app ID
2. asc_create_beta_group  → create "External Beta – Week 6" (external, requires review)
3. asc_set_beta_notes     → set "What to Test" focus areas
4. asc_invite_beta_tester → add testers by email (up to 10,000 external)
```

#### Beta testing focus areas (by week)

| Day Range | Focus |
|-----------|-------|
| 1–4 | Core happy path — does the main flow work end-to-end? |
| 5–9 | Edge cases — empty states, no connectivity, sign-in errors |
| 10–14 | Onboarding — first-run experience, paywall clarity |

- [ ] Monitor crash reports daily — hand off any crash pattern to `asc-build-check`
- [ ] Collect structured feedback: what confused testers, what delighted them
- [ ] Fix P0 and P1 bugs; ship updated build with `asc_set_beta_notes` changelog
- [ ] Confirm the build that will ship to production is identical to your final beta build

#### Internal vs. external beta

| Type | Max Testers | Review Required | Best For |
|------|-------------|----------------|---------|
| Internal | 100 | No | Team, QA, stakeholders |
| External | 10,000 | Yes (first build per group) | Real users, press, creators |

---

### Week 5 — Press and Creator Outreach

**Goal:** Line up coverage to publish on launch day.

#### Press tier strategy

| Tier | Outlets | Pitch Style | Lead Time |
|------|---------|-------------|-----------|
| Top-tier | TechCrunch, The Verge, 9to5Mac, MacStories | News angle, exclusives, founder story | 3–4 weeks |
| Mid-tier | AppAdvice, iMore, TouchArcade (games) | Feature request, category angle | 2–3 weeks |
| Niche | Vertical blogs, subreddits, newsletters | Use-case specific, deep dive | 1–2 weeks |

#### Pitch outline (adapt per outlet)

```
Subject: [App Name] — [One-line hook, no buzzwords]

[Reporter first name],

[1 sentence: what it does and for whom.]
[1 sentence: what makes it novel or timely — tie to something they covered recently.]
[1 sentence: launch timing and platform.]

Happy to provide early access, a demo call, or exclusive screenshots.

[Your name]
```

- [ ] Send top-tier pitches with TestFlight invite and embargo date
- [ ] Follow up once, 5 days before embargo lifts — never more

#### Creator / UGC seeding

- [ ] Identify 10–20 creators in your niche (YouTube, TikTok, X, Reddit)
- [ ] Offer early access, no strings attached — never ask for positive review
- [ ] Give creators a direct line to you for questions
- [ ] Brief creators on your launch date so their content can drop simultaneously

---

### Week 4 — ASO Baseline

**Goal:** Optimize the listing before the App Store spider indexes it.

Hand off to `asc-aso` for full keyword research and copy. Launch-week minimums:

- [ ] Title: app name + 1–2 high-volume keywords (30 char max)
- [ ] Subtitle: secondary value prop + supporting keyword (30 char max)
- [ ] Keyword field: 100 chars, comma-separated, no spaces, no repeats from title
- [ ] Description: 4000 chars, lead with value prop, CTA in first two lines (truncated above the fold)
- [ ] Localize at minimum for English (US) and your next-largest market

> Do not duplicate keywords between title, subtitle, and keyword field — Apple indexes all three independently.

---

### Week 3 — Submit for Review With Buffer

**Goal:** Clear App Review with time to fix rejections before your launch date.

- [ ] Run `submission-preflight` checklist before submitting
- [ ] Verify all metadata, screenshots, and privacy details are complete via `asc-submission`
- [ ] Set pricing and availability in `app-store-pricing`
- [ ] Submit via `asc_submit_for_review` — do NOT use "Manual Release" if you want same-day control; use "Scheduled Release" set to your launch day, or hold with "Manual Release" and release via `asc_release_version`

```
asc_submit_for_review → triggers App Review queue
```

**Buffer math:** App Review averages 1–2 days; rejections add 1–5 days per round trip. Plan for worst-case 10 days. If your hard launch date is Tuesday Week 1, submit no later than Friday Week 3.

#### If rejected

1. Read the rejection reason in App Store Connect
2. Fix only what's cited — do not make unrelated changes
3. Reply in Resolution Center if you disagree; include the specific guideline and your counter-argument
4. Resubmit with `asc_submit_for_review` once fixed

---

### Week 2 — Build Anticipation

**Goal:** Warm the audience so launch day has momentum.

- [ ] "Coming Soon" posts on your channels (X, Mastodon, LinkedIn, Instagram)
- [ ] Tease screenshots and app clips in stories format
- [ ] Pre-launch landing page with email capture (if applicable)
- [ ] Submit Apple featuring nomination — hand off to `app-store-featured`
- [ ] Prepare launch-day content calendar (see [Launch-Day Checklist](#launch-day-checklist))
- [ ] Set up Apple Search Ads campaign targeting brand keywords — hand off to `apple-search-ads`
- [ ] Confirm with press contacts that embargo holds and articles are drafted

---

### Week 1 — Final Checks

**Goal:** Verify the approved build is production-ready.

- [ ] Confirm App Review status is "Ready for Sale" or "Pending Manual Release"
- [ ] Smoke-test the App Store-signed build on a clean device (not a simulator)
- [ ] Verify in-app purchases and subscriptions in production environment (Sandbox → Production ladder)
- [ ] Confirm analytics and crash reporting are initialized and sending
- [ ] Confirm support email and App Store URL are live
- [ ] Set up response template for launch-day reviews

---

## Launch Day

**Goal:** Maximize visibility in the first 24 hours.

### Morning (7–9 AM in your largest market's timezone)

- [ ] Release the build: `asc_release_version` (if held on Manual Release)
- [ ] Verify app appears in App Store search within 5–10 minutes
- [ ] Post across all owned channels simultaneously
- [ ] Publish Product Hunt listing (see [Product Hunt](#product-hunt))
- [ ] Send launch email to waitlist/early-access list
- [ ] Alert press contacts: "Live now — embargo lifted"

### Throughout the day

- [ ] Respond to every review in the first 24 hours
- [ ] Monitor crash rate via `asc-build-check`; if crash rate spikes above 1%, pause phased release immediately (see [Release Strategy](#release-strategy))
- [ ] Engage every social mention
- [ ] Track chart ranking every 2 hours (App Store Connect → Trends)
- [ ] Post real-time milestones ("100 downloads in 3 hours") to keep momentum

### Evening

- [ ] Review day-one analytics: downloads, conversion rate, crash-free sessions %
- [ ] Draft a post-launch retrospective note while it's fresh
- [ ] Set reminder to respond to all reviews again in 48 hours

---

## Launch-Day Checklist (Printable)

```
PRE-FLIGHT
[ ] App is in "Ready for Sale" or "Pending Manual Release"
[ ] Production IAP verified on real device
[ ] Analytics confirmed sending
[ ] Support email responds

RELEASE
[ ] asc_release_version called (if Manual Release)
[ ] App visible in App Store search

DISTRIBUTION
[ ] Social posts live
[ ] Product Hunt submitted
[ ] Press embargo lifted
[ ] Email list notified

MONITORING
[ ] Crash dashboard open (asc-build-check)
[ ] Review queue open
[ ] Chart ranking tracked

END OF DAY
[ ] All reviews responded to
[ ] Day-1 metrics recorded
[ ] Phased release health check
```

---

## Release Strategy

### Full Release vs. Phased Release

| Factor | Full Release | Phased Release |
|--------|-------------|----------------|
| All users get it immediately | Yes | No — 1% on day 1, scaling over 7 days |
| Can pause if crash spike | No (app is live) | Yes — pause with one API call |
| Good for | Coordinated launch events, embargos, small user bases | Large apps, first major update to an existing user base |
| Downside | No rollback gate; crash spike hits everyone | Day-1 download numbers look small; press may not see it |

**Recommendation:** Use phased release for any update to an app with >10,000 existing users. Use full release for a brand-new app (no existing users to protect).

### Phased Release via ASC MCP

```
# Enable phased release before or at submission
asc_set_phased_release → sets distribution to phased (7-day ramp)

# Launch day: release from "Pending Developer Release"
asc_release_version → starts the phased ramp at 1%

# If crash rate spikes: pause immediately
asc_set_phased_release (paused: true) → halts distribution

# Once fix is live: resume
asc_set_phased_release (paused: false) → resumes from current percentage
```

#### Phased release ramp schedule

| Day | Approximate Users |
|-----|-----------------|
| 1 | 1% |
| 2 | 2% |
| 3 | 5% |
| 4 | 10% |
| 5 | 20% |
| 6 | 50% |
| 7 | 100% |

**Pause trigger:** Crash-free session rate drops below 99.5% in production, or any P0 regression confirmed in crash logs. Hand off crash investigation to `asc-build-check`.

---

## Product Hunt

Product Hunt is worth pursuing for consumer apps, developer tools, and productivity apps. Not worth it for enterprise-only or highly niche B2B tools.

### How to maximize a PH launch

- [ ] Submit at 12:01 AM Pacific (competition resets midnight)
- [ ] Hunter should be an established PH user with followers — ask a community member, not yourself
- [ ] Tagline: one concrete value statement, no em-dashes, no "the", under 60 chars
- [ ] First comment from maker: personal story, what problem you solved and why
- [ ] Prepare 5–7 product screenshots and a 2-min video walkthrough
- [ ] Brief your community to upvote and comment organically on launch day — do not coordinate mass upvoting schemes (PH detects and penalizes)
- [ ] Respond to every comment within the first 4 hours

**Realistic PH outcomes:** A top-5 product of the day gives 500–2,000 visits. Conversion to downloads varies wildly (5–30%). Treat PH as awareness and backlink, not primary distribution.

---

## Post-Launch (Weeks 1–4 After GA)

### Week 1 post-launch

- [ ] Analyze keyword ranking baseline — hand off to `asc-aso` for optimizations
- [ ] Compile user feedback from reviews and TestFlight crash submissions
- [ ] File bug reports for any issues surfaced in reviews
- [ ] Confirm phased release has reached 100% (or manually complete it)
- [ ] Launch Apple Search Ads brand defense campaign — hand off to `apple-search-ads`

### Weeks 2–4 post-launch

- [ ] Ship a 1.0.1 patch with day-one fixes (fast turnaround signals quality to App Review)
- [ ] Respond to every review, especially 1–3 star reviews with specific complaints
- [ ] Evaluate featuring eligibility now that you have a live app with ratings — hand off to `app-store-featured`
- [ ] Review conversion funnel: impression → product page view → download. Optimize the weakest link.
- [ ] Run a retrospective against your launch metric. Did you hit it? Why or why not?

---

## Launch Plan Output Template

When a user asks to "create a launch plan," produce a doc in this structure:

```
# [App Name] Launch Plan

## Positioning
- One-liner:
- Target audience:
- Key differentiator:

## Launch Date: [DATE]
- Submission date (target): [DATE - 10 days buffer]
- Embargo date for press: [DATE - 1 day]
- Product Hunt day: [DATE]

## Metrics
- Primary launch metric:
- Day-1 target:
- 30-day target:

## Phased Release: Yes / No
- Pause threshold: crash-free sessions < 99.5%

## Channel Plan
- Press contacts: [list tier 1, 2, 3]
- Creators: [list]
- Community: [subreddits, forums, Slack groups]
- Owned: [email list size, social followers]

## Week-by-Week Tasks
[Populate from the 8-week countdown above]

## Open Questions
[Dependencies, decisions not yet made]
```

---

## Cross-References

| Skill | When to Hand Off |
|-------|-----------------|
| `app-brand-identity` | Week 7: icon, screenshots, press kit, visual system |
| `asc-aso` | Week 4: keyword research, title/subtitle/description copy |
| `asc-submission` | Week 3: metadata completeness, screenshots, submit for review |
| `submission-preflight` | Week 3: pre-submission risk check before submitting |
| `app-store-pricing` | Week 3: price tiers, IAP setup, regional pricing |
| `app-store-featured` | Week 2: featuring nomination, editorial guidelines |
| `asc-build-check` | Launch day + phased rollout: crash monitoring, build health |
| `apple-search-ads` | Week 2 onward: brand defense, category campaigns |
