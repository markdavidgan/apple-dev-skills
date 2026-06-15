---
name: asc-aso
category: product
description: App Store Optimization — keyword research, title/subtitle/keyword-field strategy, localized metadata, and conversion-rate optimization for App Store discoverability. Use when the user says "ASO", "app store optimization", "keywords", "improve discoverability", "rank higher", "optimize my listing", "app store keywords", "subtitle", "promotional text", or wants more organic installs. Complements asc-submission (mechanics) and app-store-pricing (economics).
invoke: "/aso-audit [app] — Audit App Store listing for keyword coverage, metadata limits, and conversion levers."
---

# App Store Optimization (ASO)

**Maximize organic discoverability and conversion on the App Store.** Submission mechanics live in `asc-submission`; pricing lives in `app-store-pricing`. This skill is about being *found* and *chosen*.

ASO has two halves:
1. **Discoverability** — ranking for the searches your users actually type (driven by the indexed text fields).
2. **Conversion** — turning a product-page visit into an install (driven by the visual/first-impression assets).

---

## The Indexed Fields (what Apple searches)

Apple builds its keyword index from the **union** of these fields. Order and weighting matter.

| Field | Limit | Indexed? | Weight | Notes |
|-------|-------|:--------:|--------|-------|
| **App name / title** | 30 chars | ✅ | Highest | Brand + 1–2 strongest keywords |
| **Subtitle** | 30 chars | ✅ | High | Second-strongest keywords; visible under the name |
| **Keyword field** | 100 chars | ✅ | Medium | Comma-separated, **no spaces**, hidden from users |
| **In-app purchase name/desc** | 30/45 chars | ✅ (light) | Low | IAP display names are lightly indexed |
| **Developer name** | — | ✅ | Low | — |
| Description | 4000 chars | ❌ | None (iOS) | **Not indexed** on Apple — write for humans/conversion |
| Promotional text | 170 chars | ❌ | None | Editable without review; not indexed |

> **Apple ≠ Google Play.** On the App Store the long description is **not** indexed. Don't keyword-stuff it. (Google Play *does* index the description — keep that distinction if you ship both.)

### The golden rules of the keyword field

- **Never repeat a word** across title, subtitle, and keyword field — Apple indexes the union, so repetition wastes characters. Each keyword appears **once**, in exactly one field.
- **No spaces after commas:** `focus,timer,pomodoro` not `focus, timer, pomodoro` (spaces burn characters).
- **No plurals if you have the singular** — Apple matches stems reasonably; spend characters on distinct terms.
- **Don't include your app name or category name** — those are already indexed.
- **Don't use competitor trademarks** — rejection / legal risk.
- **Singular words combine** — `time`,`management` lets you rank for "time management" without spending on the phrase. Apple auto-combines indexed words into phrases.

---

## Keyword Research Workflow

1. **Seed list** — brainstorm what a *non-user* would type to find the app's job-to-be-done (not your feature names). Think intents: "track water", "split bills", "white noise".
2. **Expand** — for each seed, gather synonyms, related jobs, and long-tail variants.
3. **Score each candidate** on three axes:
   - **Relevance** — does the app genuinely satisfy this search? (Irrelevant keywords tank conversion and ranking.)
   - **Volume** — how many people search it? (High volume = more traffic if you rank.)
   - **Difficulty** — how entrenched are the top results? (New apps win on *low-difficulty, high-relevance* long-tail first.)
4. **Allocate** — strongest term → title, next → subtitle, the rest → keyword field by descending value until 100 chars are full.
5. **Localize** — repeat per locale (see below). This is where most apps leave the most traffic on the table.

> New apps: **win the long tail first.** Don't fight "fitness" on day one. Rank #1 for "interval timer for boxing", accrue ratings + conversion velocity, then climb to broader terms.

---

## Localization = free traffic

Each **localization** is a separate keyword index. You can add keywords in other locales' fields even when the app UI is English, and you inherit traffic from locales that share a base.

- **English has two storefront locales** — **en-US** and **en-GB (English UK)**. en-GB is indexed for many non-US English-speaking storefronts. Filling en-GB keywords **doubles** your English keyword budget for free.
- Localize at least: en-US, en-GB, and your top revenue locales' languages.
- Localize **screenshots and subtitle**, not just keywords — conversion is locale-sensitive.

---

## Conversion-Rate Optimization (the product page)

Ranking gets the visit; these convert it. Order by impact:

1. **First 1–3 screenshots** — visible without scrolling. Lead with the #1 benefit as a captioned hero shot, not a bare UI screenshot. Use text overlays describing the *value*, not the feature name.
2. **App icon** — the single most-tested asset. High contrast, recognizable at 1× thumbnail size. (See `app-brand-identity` for icon craft.)
3. **App preview video** — autoplay (muted) at the top; first 3 seconds decide. Show the app *in use*, not a logo splash.
4. **Title + subtitle** — double duty: indexed *and* the first thing read. Make the subtitle a benefit, not a keyword dump.
5. **Ratings & reviews** — volume and recency feed both ranking and trust. Prompt for ratings with `SKStoreReviewController`/`requestReview` at a moment of delight (see `storekit-purchases` for the modern API).
6. **Promotional text** (170 chars) — editable without a review submission; use it for timely hooks (events, seasonal, "now with …").

### Levers you can pull *without* an app update

- **Promotional text** and **in-app events** — edit anytime.
- **Custom Product Pages (CPPs)** — up to 35 variants with different screenshots/text for different ad campaigns; each has its own URL and conversion analytics.
- **Product Page Optimization (PPO)** — Apple's native A/B test for icon/screenshots/preview (up to 3 treatments vs baseline). Run one continuously.

---

## Audit Checklist (`/aso-audit`)

When auditing an existing listing, pull current metadata via `asc-submission`'s `asc_get_metadata` / `asc_get_app_info`, then check:

- [ ] **Title** ≤ 30 chars, brand + 1 strong keyword, no wasted words.
- [ ] **Subtitle** ≤ 30 chars, benefit-driven, distinct keywords (no overlap with title).
- [ ] **Keyword field** = 100 chars used, no spaces, no repeats vs title/subtitle, no app/category name, no plurals-of-included-singulars.
- [ ] **No keyword repeated** across the three indexed fields.
- [ ] **en-GB locale** keywords filled (doubles English budget).
- [ ] **Top revenue locales** localized (keywords + subtitle + screenshots).
- [ ] **First 3 screenshots** are benefit-captioned, not bare UI.
- [ ] **App preview video** present, hooks in 3s.
- [ ] **Promotional text** used and current.
- [ ] **PPO / Custom Product Pages** in use for paid traffic.
- [ ] **Ratings prompt** wired to a delight moment, not app launch.

Report findings as: ✅ good / ⚠️ leaving value on the table / ❌ rule violation (e.g. keyword repetition, over-limit), each with the specific fix.

---

## The ASO Score Card (0–100)

For an audit, don't just list issues — score the listing so the user sees where they stand and what moves the needle most. Rate each factor 0–10, multiply by its weight, sum to 100.

| # | Factor | Weight | What a 10 looks like |
|---|--------|:------:|----------------------|
| 1 | **Title** | 15% | ≤30 chars, brand + 1 high-value keyword, zero waste |
| 2 | **Subtitle** | 12% | ≤30 chars, benefit-led, distinct keywords (no title overlap) |
| 3 | **Keyword field** | 12% | 100/100 chars used, no spaces, no repeats, no app/category name |
| 4 | **Localization coverage** | 12% | en-US + en-GB filled, all top-revenue locales localized |
| 5 | **Screenshots (first 3)** | 13% | Benefit-captioned hero shots, not bare UI; hook in slot 1 |
| 6 | **App preview video** | 6% | Present, shows the app in use, hooks in 3s |
| 7 | **Icon** | 8% | High contrast, legible at thumbnail, distinct from competitors |
| 8 | **Ratings & reviews** | 10% | Healthy volume + recency; ≥4.5 avg; prompt at delight moment |
| 9 | **Conversion levers** | 7% | Promo text current; PPO running; CPPs for paid traffic |
| 10 | **Keyword relevance/targeting** | 5% | Ranking for terms the app genuinely satisfies, long-tail first |

> **Score = Σ(factor ÷ 10 × weight).** Report the number, the band (0–40 *needs overhaul* / 41–70 *solid, leaking value* / 71–100 *optimized*), and the three lowest-weighted-score factors as the priority fixes.

### Tiered recommendations

After scoring, structure the output into three tiers so the user knows what to do **today** vs. **this quarter**:

- **🟢 Quick Wins** — no-update, no-cost edits: keyword field rewrite, en-GB fill, promo text, subtitle tweak. Ship today.
- **🟡 High-Impact** — needs an app/version update or asset work: screenshot redesign, preview video, icon test (PPO). Ship this cycle.
- **🔵 Strategic** — sustained effort: full localization rollout, ratings-velocity program, CPP-per-campaign for Apple Search Ads (see `apple-search-ads`).

### Competitor comparison

Discoverability is relative. Pull 2–3 direct competitors and compare side by side:

| Field | You | Competitor A | Competitor B |
|-------|-----|--------------|--------------|
| Title keywords | … | … | … |
| Subtitle angle | … | … | … |
| Visible keyword themes | … | … | … |
| Rating (count / avg) | … | … | … |
| Screenshot hook | … | … | … |

Use this to find the **gap terms** — relevant, lower-difficulty keywords competitors under-target — and the conversion ideas worth borrowing. Gather competitor metadata via WebSearch / the public App Store listing, or ask the user; for your own live fields use `asc_get_metadata` / `asc_get_app_info`.

---

## Measuring ASO

Use App Store Connect **App Analytics**:

- **Impressions → Product Page Views → Downloads** is the funnel. ASO discoverability moves impressions; CRO moves the views→downloads ratio (the **conversion rate**).
- Segment by **Source Type**: *App Store Search* (keyword ASO), *App Store Browse* (category/featuring), *Web Referrer*, *App Referrer*.
- Watch **conversion rate** per Custom Product Page and PPO treatment to pick winners.

A 1% absolute conversion-rate gain often beats weeks of ranking work — instrument both, optimize the cheaper one first.
