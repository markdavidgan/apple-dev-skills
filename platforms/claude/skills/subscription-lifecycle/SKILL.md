---
name: subscription-lifecycle
category: product
description: Manage the full post-purchase subscriber journey from trial through renewal, voluntary churn, involuntary churn, and win-back. Use when diagnosing churn spikes, designing retention save flows, recovering billing failures, interpreting App Store Server Notifications, debugging grace period behaviour, building win-back offer campaigns, or auditing subscriber LTV. Also use when asked about dunning, billing retry, DID_FAIL_TO_RENEW, offer codes, or subscription metrics from ASC reports.
---

# Subscription Lifecycle

**Retain every subscriber you already paid to acquire — because acquisition cost is sunk the moment they tap Subscribe.**

Paywall design lives in `paywall-design`. Pricing economics live in `app-store-pricing`. StoreKit code lives in `storekit-purchases`. This skill owns everything that happens *after* the purchase: nurturing trials, renewing paid subscribers, rescuing billing failures, and winning back churned users.

---

## The Lifecycle Map

```
Free Trial ──► Paid (active) ──► Renewal attempt
     │               │                  │
     │ trial-to-paid │ voluntary         ├── Success ──► Paid (renewed)
     │ conversion    │ cancellation      │
     ▼               ▼                  └── Failure ──► Grace Period (16 days)
  Expired        Cancelled                                    │
  Trial          (voluntary                       ├── Recovered ──► Paid
                  churn)                          └── Expired ──► Billing Retry
                                                                   (60 days)
                                                                        │
                                                              ├── Recovered
                                                              └── Lapsed ──► Win-back
```

Every state transition maps to an App Store Server Notification V2 event. Model this state machine in your backend before writing any UI.

---

## Trial Nurture

### What Apple Gives You

- `isEligibleForIntroOffer` — query via `StoreKit 2` product's `subscription.isEligibleForIntroOffer`. Gate your paywall intro-offer messaging on this flag; showing an offer to an ineligible user wastes premium paywall real estate and feels broken.
- **Intro offer types** — Free Trial (period of $0), Pay Up Front (one-time discounted price), Pay As You Go (discounted recurring price). Each has different psychology and conversion curves; see `app-store-pricing` for the economics.

### Nurture Moments During a Free Trial

| Day | Touchpoint | Goal |
|-----|-----------|------|
| 0 (start) | Onboarding completion prompt | Activate the core value prop immediately |
| 2–3 | First win notification | Surface a result the user got from the app |
| Trial end minus 3 days | Conversion push | Remind, show social proof, offer frictionless cancel info |
| Trial end minus 1 day | Final nudge | Urgency without desperation; cite what they'll lose |

Implement these via `push-notifications`. Never send more than two trial-end nudges — Apple's HIG calls out "harassment patterns" and users who feel spammed cancel before the trial ends.

### Free Trial vs Pay As You Go vs Pay Up Front

- **Free trial** — Highest top-of-funnel conversion, lowest intent signal. Expect 40–60% of trials to cancel before paying.
- **Pay As You Go** — Lower acquisition but higher intent; subscribers who paid even $1 churn at lower rates.
- **Pay Up Front** — Works for premium/niche apps where perceived value is immediate. Rare in consumer apps.

---

## Voluntary Churn: Stop the Bleed

### Cancellation Reasons (What Apple Surfaces)

App Store Server Notifications V2 delivers a `DID_CHANGE_RENEWAL_STATUS` event with `cancellationReason` in the signed renewal info:

| Code | Meaning |
|------|---------|
| 0 | Other/not specified |
| 1 | Price increase (subscriber declined) |

That's it — Apple gives you almost nothing here. Mine your own in-app cancellation flow for the real signal.

### In-App Retention Save Flow

Trigger a save flow when a user taps your "Manage Subscription" or "Cancel" button — *before* they leave your app for the iOS subscription management screen.

**Save flow architecture:**

1. Intercept the cancel intent in-app.
2. Ask one question: "What's not working?" — offer 3–5 radio options (too expensive, not using it, missing a feature, switching apps, other).
3. Route to the appropriate save offer based on the answer:
   - **Too expensive** — show a downgrade tier or promotional offer code.
   - **Not using it** — offer a pause (if you support it) or remind of pending value.
   - **Missing feature** — collect the feedback, offer a small win-back discount.
4. If the user still wants to cancel, deep-link to `itms-apps://apps.apple.com/account/subscriptions` — never make them hunt for the cancel button. Friction here earns a 1-star review.

**Downgrade offers** — If you have multiple subscription tiers, surface a cheaper tier explicitly. A subscriber on a lower plan is worth more than a churned user.

**Promotional offer codes** — Generate via ASC or the `asc_list_subscriptions` MCP tool. Offer codes can be single-use or multi-use and can unlock a discounted price or a free extension period. Present these in the save flow for high-LTV subscribers.

### Win-Back Offers (iOS 18+, StoreKit 2)

iOS 18 introduced first-class win-back offer support in StoreKit 2.

- Create win-back offers in ASC under your subscription's Offers section (type: Win-Back).
- StoreKit surfaces eligible offers via `product.subscription.promotionalOffers` — check `offerType == .winBack`.
- Eligibility: the user must have previously subscribed and be currently lapsed.
- Present win-back paywalls in your app's post-lapse re-engagement flows, or in push campaigns (see `push-notifications`).
- Win-back offer codes can also be distributed externally (email, web) — generate them in ASC.

**Win-back sequence:**

```
Day 1 post-lapse  — emotional "we miss you" push with specific value reminder
Day 7             — concrete offer: "Come back at 40% off for 3 months"
Day 30            — final offer or sunset message
```

Do not spam. Lapsed users who uninstall after aggressive win-back campaigns will never return.

---

## Involuntary Churn: The Silent Killer

Involuntary churn — billing failures — typically accounts for 20–40% of total subscriber loss in mature apps. Most teams underinvest here because it's invisible until you look.

### The Apple Billing Recovery Stack

Apple runs its own retry logic automatically, but you need to understand each layer:

#### 1. Billing Grace Period

- Opt in to Billing Grace Period in ASC (Subscriptions configuration).
- Duration: 16 days for monthly, 16 days for annual (Apple defines the period).
- During grace period: subscription stays active, user retains access, Apple keeps retrying payment.
- Detection: `expiresDate` is in the past but `gracePeriodExpiresDate` is in the future in the signed transaction. Server Notification: `GRACE_PERIOD_EXPIRED` fires if payment is never recovered.
- **Always opt in.** The access-continuity alone reduces involuntary churn by 20–30% with zero engineering beyond enabling it.

#### 2. App Store Billing Retry

- After grace period expires, Apple enters a billing retry window of up to 60 days.
- The subscription is expired during this window; you should restrict access.
- Server Notification: `DID_FAIL_TO_RENEW` — fires when the original renewal attempt fails.
- Notification: `DID_RENEW` — fires when Apple successfully recovers payment. Re-grant access immediately.

#### 3. Account Hold (Google Play equivalent)

Apple does not have a separate "account hold" state distinct from grace period — do not conflate with Google Play's model.

### App Store Server Notifications V2 — Events to Handle

Register your HTTPS endpoint in ASC (App Information). Handle at minimum:

| Notification type | Subtype | Action |
|-------------------|---------|--------|
| `DID_FAIL_TO_RENEW` | — | Begin dunning; restrict access after grace period |
| `GRACE_PERIOD_EXPIRED` | — | Hard restrict access; escalate dunning |
| `DID_RENEW` | — | Restore access immediately |
| `EXPIRED` | `VOLUNTARY` | Voluntary cancel confirmed |
| `EXPIRED` | `BILLING_RETRY` | Billing retry exhausted; move to win-back flow |
| `DID_CHANGE_RENEWAL_STATUS` | `AUTO_RENEW_DISABLED` | Trigger save flow if user is still in-app |
| `OFFER_REDEEMED` | — | Log offer redemption; tag in analytics |

Validate every signed payload using Apple's public key. Never trust unverified notifications.

### Dunning / Recovery Messaging

Dunning = communicating with users whose billing is failing. Do this via `push-notifications` and optionally email (collected at signup):

**Message principles:**
- Frame as "help us update your payment" not "your subscription failed."
- Deep-link directly to the iOS payment update screen: `itms-apps://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions` (or the equivalent updated URL from Apple's documentation).
- Three touches maximum during the grace period. After that, silence until win-back.

**Dunning sequence during grace period:**

| Day | Channel | Tone |
|-----|---------|------|
| 1 | Push | Friendly alert; "just checking" |
| 5 | Push | Slightly more urgent; surface value |
| 12 | Push | Final warning before access ends |

After `GRACE_PERIOD_EXPIRED`, stop dunning pushes. Move to a win-back email sequence (outside Apple's system) if you collected email.

---

## Metrics That Matter

Track these per cohort (acquisition channel, paywall variant, subscription tier):

| Metric | Definition | Healthy range |
|--------|-----------|---------------|
| Trial-to-paid % | Paid conversions / trials started | 40–65% (varies by vertical) |
| Month-1 renewal rate | Subs renewing after first period / subs who completed first period | 60–80% |
| Monthly churn rate | Churned this month / active start of month | Under 5% for strong apps |
| Voluntary churn % | Voluntary cancels / total churn | Should be the majority; if involuntary is over 30%, fix billing |
| Involuntary churn % | Billing failures / total churn | Target below 20% with grace period enabled |
| Recovery rate | Recovered billing failures / total billing failures | 50–70% is achievable with grace period + dunning |
| Subscriber LTV | ARPU / churn rate | Model by cohort; factor in intro-offer discounts |
| Win-back rate | Re-subscribed / total lapsed (30-day window) | 5–15% is realistic |

### Where to Read These in ASC

- **ASC Subscriptions report** — Revenue, proceeds, active subscribers, churned, reactivated. Available in the Reports section; also queryable via the App Store Connect MCP (`asc_list_subscriptions` for active, `asc_get_subscription_report` for historical).
- **App Store Server API** — Pull individual subscriber status via `GET /inApps/v1/subscriptions/{transactionId}` for real-time state reconciliation.
- **Sales and Trends** — Subscription overview with cohort graphs in the ASC web UI.
- See `app-analytics` for cohort retention and `retention-optimization` for intervention design grounded in the data.

---

## Lifecycle Audit Checklist

Run this against any subscription app before shipping or diagnosing a churn problem:

### Trial Configuration
- [ ] `isEligibleForIntroOffer` gates intro-offer messaging — non-eligible users see standard paywall
- [ ] Trial length matches value-delivery timeline (users must hit the "aha moment" before trial ends)
- [ ] At least two trial-nurture pushes scheduled (see `push-notifications`)

### Voluntary Churn
- [ ] In-app save flow intercepts cancel intent before user leaves to iOS Settings
- [ ] Cancellation reason collected in-app (even if Apple's data is thin)
- [ ] Downgrade tier available and surfaced in save flow
- [ ] Win-back offers configured in ASC for each subscription product (iOS 18+ eligible)
- [ ] Post-cancel win-back sequence defined (day 1, day 7, day 30)

### Involuntary Churn
- [ ] Billing Grace Period enabled in ASC for all subscription groups
- [ ] App Store Server Notifications V2 endpoint registered and validated
- [ ] `DID_FAIL_TO_RENEW` handler restricts access gracefully (not abruptly)
- [ ] `DID_RENEW` handler restores access within seconds
- [ ] `GRACE_PERIOD_EXPIRED` escalates to restricted access + escalated dunning
- [ ] Dunning push sequence live (days 1, 5, 12 during grace period)
- [ ] Deep-link to iOS payment update screen tested on physical device

### Metrics
- [ ] Trial-to-paid % tracked per paywall variant
- [ ] Voluntary vs involuntary churn split tracked monthly
- [ ] Recovery rate measured (billing failures recovered / total failures)
- [ ] LTV model exists per subscription tier and acquisition cohort

---

## Lifecycle Audit Output Template

When auditing a subscription app, produce a report in this shape:

```
## Subscription Lifecycle Audit — [App Name]

### Trial Health
- Trial-to-paid %: [X%] (benchmark: 40–65%)
- Trial nurture: [present / missing / partial]
- isEligibleForIntroOffer gate: [yes / no]

### Voluntary Churn
- Monthly voluntary churn: [X%]
- In-app save flow: [present / missing]
- Win-back offers: [configured / not configured]

### Involuntary Churn (PRIORITY: HIGH / MEDIUM / LOW)
- Billing grace period: [enabled / DISABLED]
- Server Notifications V2: [registered / not registered]
- DID_FAIL_TO_RENEW handler: [present / missing]
- Recovery rate: [X%] (estimate if unknown)
- Dunning sequence: [configured / missing]

### Top 3 Actions
1. [Highest-impact fix with expected churn improvement]
2. [Second action]
3. [Third action]
```

---

## Cross-Skill References

| Need | Skill |
|------|-------|
| Paywall layout and offer presentation | `paywall-design` |
| StoreKit 2 transaction and renewal code | `storekit-purchases` |
| Intro offer pricing and price increase strategy | `app-store-pricing` |
| Push notification dunning and win-back campaigns | `push-notifications` |
| Cohort retention analysis and intervention design | `retention-optimization` |
| ASC metrics and reporting queries | `app-analytics` |
| Subscriber sentiment and churn signals via reviews | `review-management` |
