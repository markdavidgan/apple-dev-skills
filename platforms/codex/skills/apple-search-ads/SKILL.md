---
name: apple-search-ads
category: product
description: Set up, optimize, and scale Apple Search Ads (ASA) campaigns — keyword bidding, match types, campaign structure, Custom Product Page routing, and ROAS optimization. Use when the user mentions "Apple Search Ads", "ASA", "Search Ads", "Search tab ads", "Today tab ads", "CPT", "TTR", "Search Match", "exact match", "broad match", "CPP in ads", "ASA bidding", "Search Ads budget", "keyword bids", or "App Store paid acquisition". For other paid channels (Meta, Google UAC, TikTok), see app-launch.
---

# Apple Search Ads

**Run the highest-intent paid acquisition channel available to iOS apps — directly inside the App Store, where users are already searching to download.**

Apple Search Ads is structurally unlike every other UA channel. Users are not scrolling social feeds or watching videos; they are standing in the App Store with fingers ready to tap Install. That intent advantage means ASA delivers installs that behave more like organic users than paid users on any other network.

---

## Why ASA Is Different

| Property | ASA | Every other paid channel |
|----------|-----|--------------------------|
| User intent | Actively searching to download | Interrupted from another activity |
| Targeting axis | Keyword only | Audience (demo, interest, behavioral) |
| ATT / SKAN gap | None — Apple owns the conversion signal | Significant signal loss post-iOS 14 |
| Ad appearance | Indistinguishable from organic results | Clearly an ad unit |
| Conversion data | First-party, deterministic | Modeled or probabilistic |

The no-ATT gap is the most underrated advantage. Every CPI, CVR, and ROAS figure you read out of ASA is real — not a model estimate. That makes optimization decisions reliable in a way that Meta/Google campaigns rarely are post-iOS 14.

---

## Campaign Placements

| Placement | Where it appears | Best use |
|-----------|-----------------|----------|
| **Search Results** | Immediately below the first organic result when a user searches | Primary driver — highest intent, most controllable |
| **Search Tab** | Top of the Search tab before any query is typed | Broad awareness; reach users before they form intent |
| **Today Tab** | App Store home page | Brand moments, major launches |
| **Product Pages** | Below the listing of a competitor or related app | Competitive conquesting |

Start with Search Results only. It is the most measurable and most efficient placement at every stage of scale. Layer in other placements only after Search Results is profitable and stable.

---

## Account Structure

One app per ASC app record; one ASA account per app. Build four campaigns from day one — they serve different intents and must not share budgets.

```
Account
└── App
    ├── Campaign: Brand         (protect branded searches)
    │   └── Ad Group: exact brand terms
    ├── Campaign: Competitor    (conquesting)
    │   └── Ad Group: exact competitor names
    ├── Campaign: Category      (generic intent)
    │   └── Ad Group: broad + exact category terms
    └── Campaign: Discovery     (find new terms)
        └── Ad Group: Search Match ON, no explicit keywords
```

### Why Four Separate Campaigns

- **Budget isolation** — Brand spend cannot be cannibalized by generic discovery.
- **Separate bid floors** — Brand keywords should almost always win; competitor and category keywords warrant lower, more measured bids.
- **Clean attribution** — Performance is readable by intent type. Blending campaign types hides which keyword class is actually driving installs.
- **Surgical pausing** — You can pause Discovery without touching Brand during a budget crunch.

---

## Match Types

| Match type | Trigger logic | Where to use |
|------------|--------------|--------------|
| **Exact** | Only the keyword as typed (or very close) | Proven high-value terms; Brand campaign |
| **Broad** | Variations, plurals, related phrases | Category campaign initial seeding |
| **Search Match** | Apple automatically maps your app to relevant queries | Discovery campaign only — leave keyword list empty |

### Discovery-to-Exact Workflow

1. Run Discovery campaign with Search Match ON and no keywords.
2. Pull the Search Terms report weekly.
3. Identify terms with TTR above 5% and CVR above 30%.
4. Graduate those terms to your Category campaign as exact-match keywords with raised bids.
5. Add poor performers (high taps, zero installs) as negatives immediately.

This pipeline continuously finds keywords you would never have thought to bid on manually.

---

## Keyword Seeding

### Brand Campaign
- Your exact app name
- Common misspellings of the app name
- Your developer/studio name
- Any well-known sub-brand or feature name

### Competitor Campaign
- Top 5–10 direct competitor app names (exact match)
- Note: competitor CVR is structurally lower — users searching a competitor brand are often loyalists. Bid conservatively and track CVR carefully before scaling.

### Category Campaign
Seed with high-volume generic terms relevant to your category, then expand:

- High-volume head terms: "meditation app", "habit tracker", "budget planner"
- Long-tail modifiers: "meditation for sleep", "daily habit tracker free", "budget planner couples"

For keyword volume and difficulty research, use the `asc-aso` skill (keyword strategy) or run a WebSearch for category benchmarks. Do not rely on guesswork for head-term volume — the investment in validation pays off immediately.

### Negative Keywords

Add negatives at the account level so they propagate across all campaigns:
- Competitor names you are not actively targeting in your Competitor campaign (avoids accidental wins with poor CVR)
- Irrelevant terms surfacing in Search Match (review weekly)
- Any term accumulating 100+ taps with zero installs

---

## Bidding

### Starting Bids by Campaign

| Campaign | Starting bid range | Rationale |
|----------|--------------------|-----------|
| Brand | $2–5 CPT | You must win your own brand terms — underbidding here is a strategic error |
| Competitor | $1–2 CPT | Lower CVR expected; keep CPI math positive |
| Category | $0.80–1.50 CPT | Test volume before scaling |
| Discovery | $0.50–0.80 CPT | Exploration budget; hold bids low while finding signal |

These are starting points only. Every category has different competitive pressure — a finance app competes differently from a casual game.

### Target CPT Formula

```
Target CPT = Target CPI × Historical CVR (installs ÷ taps)
```

If your target CPI is $4.00 and your measured CVR is 45%, your target CPT is $1.80. This formula anchors every bid decision to your unit economics rather than to what competitors are bidding.

### Bid Optimization Signals

| Signal | What it means | Action |
|--------|--------------|--------|
| Impression share below 50% | Losing auctions — bid is too low | Raise bid 20–30% and reassess in 48 hours |
| High TTR, low CVR | Users tap the ad but don't install | Improve the product page or paywall — see `paywall-design` and `asc-aso` |
| Low TTR (below 3%) | Ad creative or keyword relevance mismatch | Test a Custom Product Page matched to the keyword intent |
| High CVR but spend not scaling | You are winning at the current bid but capped | Raise bid or raise daily budget |
| CPT rising with flat or falling CVR | Auction is heating up around you | Reduce bid or pause the keyword; it is no longer profitable |

### Automated Bidding

ASA offers automated bidding targeting a goal CPA or ROAS. Use it only after:
- The campaign has 50+ conversions per ad group per week (Apple's minimum for signal quality)
- Manual bidding has produced a stable baseline CPT over at least two weeks

Switching to automated bidding before these thresholds hands the algorithm too little data and produces erratic results. Earn the right to automate.

---

## Custom Product Page Routing

Custom Product Pages (CPPs) let you show different screenshots, preview video, and promotional text to different ad groups — without changing your default App Store listing.

```
Ad Group: "yoga app"            → CPP: yoga-studio screenshots + yoga copy
Ad Group: "sleep sounds"        → CPP: night-sky screenshots + sleep copy
Ad Group: Competitor keywords   → CPP: head-to-head comparison screenshots
```

**Why it works.** A user searching "yoga app" who sees yoga-specific screenshots instead of your generic default listing immediately understands the app is relevant. TTR and CVR both lift — typically 15–30% on well-matched CPPs.

**Setup path:** App Store Connect → Custom Product Pages → create and submit pages → ASA Campaign Manager → Ad Group → Creative → select CPP.

For CPP creative strategy and screenshot principles, use the `asc-aso` skill. For paywall placement and subscription copy on the product page, use `paywall-design`.

---

## Metrics and Benchmarks

| Metric | Formula | Healthy | Investigate if |
|--------|---------|---------|----------------|
| **TTR** | Taps / Impressions | Above 5% | Below 3% |
| **CVR** | Installs / Taps | Above 50% | Below 30% |
| **CPT** | Spend / Taps | Category-dependent | Rising with flat CVR |
| **CPI** | Spend / Installs | Below your LTV threshold | Above 3× target |
| **ROAS** | Revenue / Spend | Above 100% (break-even); target 150%+ | Below 80% after 30 days |

TTR and CVR are the two levers you control most directly. TTR is a creative and keyword-relevance problem; CVR is a product page and paywall problem. Fix them independently — mixing the diagnoses leads to wrong solutions.

For app-store pricing strategy that affects CVR on paid installs, use `app-store-pricing`.

---

## Weekly Optimization Checklist

```
- [ ] Pull Search Terms report — graduate top terms to exact match in Category campaign
- [ ] Add new negatives from irrelevant or zero-install search terms
- [ ] Review impression share per keyword — raise bids where below 50%
- [ ] Pause any keyword with 100+ taps and 0 installs
- [ ] Check TTR per ad group — if below 3%, test a new CPP
- [ ] Verify no campaign is hitting daily budget cap before noon (cap blocks afternoon traffic)
- [ ] Compare CVR across campaign types: Brand vs Category vs Competitor
- [ ] Confirm CPI is within target for each campaign
```

---

## Scaling Checklist

Before raising budgets or expanding to new placements:

```
- [ ] CVR above 30% on primary campaigns
- [ ] CPI below 3× your target
- [ ] Negative keyword list is maintained and current
- [ ] At least two CPP variants have been tested and best performer selected
- [ ] Bid strategy is manual and stable (not thrashing week-over-week)
- [ ] Discovery campaign is producing a consistent flow of new exact-match graduates
```

Scaling a campaign that fails these checks amplifies problems, not results.

---

## Campaign Audit Output Template

When a user shares their ASA data, structure the audit like this:

```
Account: [App Name]
Audit period: [date range]

Campaign Structure
  [✓/✗] Brand campaign
  [✓/✗] Competitor campaign
  [✓/✗] Category campaign
  [✓/✗] Discovery campaign
  [✓/✗] CPP assigned to at least one ad group

Performance Summary
  Impressions:  [N]
  Taps:         [N]   (TTR: [X]%)
  Installs:     [N]   (CVR: [X]%)
  Spend:        $[N]
  CPI:          $[N]
  ROAS:         [X]%

Top Issues
  1. [issue] — [specific fix]
  2. [issue] — [specific fix]

Priority Actions (ordered by expected impact)
  1. [action] — rationale: [why this moves the needle]
  2. [action] — rationale: [why this moves the needle]
```

---

## Related Skills

- `asc-aso` — Keyword research and App Store listing optimization; use before seeding any keyword list
- `paywall-design` — Improve CVR from install to subscription (the conversion that makes ROAS positive)
- `app-store-pricing` — Subscription pricing strategy that affects CPI payback period
- `app-launch` — Full launch strategy including non-ASA paid channels (Meta, Google UAC, TikTok)
