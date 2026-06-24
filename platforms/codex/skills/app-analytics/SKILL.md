---
name: app-analytics
category: product
description: Decide what to measure and how — north-star metric, activation/retention/conversion funnels, a clean event taxonomy, App Store Connect App Analytics, StoreKit/subscription metrics, and privacy-respecting instrumentation. Use when defining product metrics, designing analytics events, measuring retention or conversion, choosing a north-star metric, or interpreting App Analytics. Trigger on "analytics", "metrics", "north star", "funnel", "retention", "activation", "conversion rate", "event tracking", or "what should we measure".
---

# App Analytics

**Measure the few things that drive decisions — not everything you can.** Over-instrumenting creates noise, privacy risk, and a dashboard nobody reads. This skill is about *what* to measure; performance telemetry is `performance-instruments` (MetricKit).

> Test for every metric: *if this number moved, would we do something differently?* If not, don't track it.

---

## Start with one north-star metric

A north-star is the single number that best captures delivered user value — leading, not lagging.

- Good: "weekly active note editors", "sessions completed per user/week", "tracked workouts/week."
- Weak: raw downloads or DAU alone (vanity; doesn't capture value).
- The north-star should *predict* retention and revenue. Everything else is a supporting or guardrail metric.

---

## The funnel (AARRR, pragmatically)

| Stage | Question | Typical metric |
|-------|----------|----------------|
| **Acquisition** | Are people arriving? | Impressions → installs (see `asc-aso`) |
| **Activation** | Did they reach first value? | % completing the "aha" action in session 1 |
| **Retention** | Do they come back? | D1 / D7 / D30 **cohort** retention |
| **Revenue** | Do they pay? | Trial→paid, conversion, ARPU (see `paywall-design`, `app-store-pricing`) |
| **Referral** | Do they bring others? | Invites sent/accepted, rating prompts |

**Activation and retention are where most apps actually win or lose.** Define your activation event precisely ("created and saved 1 note", "logged 3 days") and measure the % who hit it on day 0 — it's the highest-leverage number for a young app.

### Retention is a cohort, not a percentage

Always read retention as **cohorts** (users who installed in week N, % active in weeks N+1, N+7…). A single "retention %" hides whether you're improving. A flattening retention curve (not decaying to zero) is the signal of product-market fit.

---

## Event taxonomy — design it before you instrument

A messy event log is worse than none. Conventions:

- **Name consistently:** `object_action` in one tense — `note_created`, `paywall_viewed`, `subscription_started`. Pick a casing and keep it.
- **Properties over event explosion:** one `paywall_viewed` event with a `source` property beats `paywall_viewed_onboarding` / `paywall_viewed_settings` / … Same event, structured dimensions.
- **Track the funnel-defining events first** (activation, key actions, purchase steps), then add detail only when a question demands it.
- **Version the schema** and write it down — undocumented events rot.
- Capture enough context to **segment** (platform, plan, locale) without capturing PII.

---

## Apple's built-in sources (often enough)

- **App Store Connect → App Analytics:** impressions, product page views, **conversion rate**, installs, retention, and sessions — segmented by **Source Type** (Search / Browse / Referrer). Free, privacy-safe, no SDK. Start here.
- **StoreKit / Subscription analytics:** trials, conversions, churn, proceeds, by product — the source of truth for monetization (pairs with `storekit-purchases`).
- **MetricKit:** performance/diagnostics from the field (launch, hangs, hitches) — route to your dashboards via `performance-instruments`.

Reach for a third-party analytics SDK only when you need event-level product funnels the built-ins don't give you.

---

## Privacy is part of analytics, not a footnote

- Minimize: collect the least that answers your question. Don't log PII or precise location "just in case."
- Anything you collect must be reflected in the **privacy nutrition label** and, for required-reason/tracking APIs, the **privacy manifest** — see `privacy-manifest`. Tracking across apps requires **App Tracking Transparency** consent.
- Prefer aggregate/on-device where possible. Truthful labels are an App Review and trust requirement.

---

## From metric to action

1. Pick the **one decision** you're trying to inform.
2. Define the **metric + target + window** (ties to `product-spec` success metrics).
3. Instrument the **minimum events** to compute it, with clean names/properties.
4. Read it as **cohorts/segments**, not a single global number.
5. Change one thing, measure the move, keep or revert. Repeat.
