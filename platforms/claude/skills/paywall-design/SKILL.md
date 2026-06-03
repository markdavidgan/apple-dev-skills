---
name: paywall-design
category: design
description: Design high-converting, App Review-compliant paywalls and subscription upsell screens — value framing, plan presentation, trial/intro-offer design, and required legal elements. Use when building or improving a paywall, subscription screen, upsell, or "go Pro" flow, choosing trial framing, or fixing low conversion or a 3.1.2 rejection. Trigger on "paywall", "subscription screen", "upsell", "go premium", "free trial design", or "purchase screen". Bridges app-store-pricing (economics) and storekit-purchases (code).
---

# Paywall Design

**Design paywalls that convert without getting rejected.** Economics (tiers, regional pricing) live in `app-store-pricing`; the implementation lives in `storekit-purchases`; this is the *screen* — UX and compliance.

---

## App Review compliance — non-negotiable (Guideline 3.1.2)

A paywall that converts but gets rejected ships nothing. Every subscription paywall **must** show, on the purchase screen or one tap away:

- **What the user gets** (the value/contents of the subscription).
- **Price, duration, and per-period billing** for each option (e.g. "$4.99/month").
- For **free trials / intro offers:** the trial length, what happens when it ends, and the price that begins — clearly, before purchase.
- A visible **Restore Purchases** control.
- Functional links to **Terms (EULA)** and **Privacy Policy**.
- Honest auto-renew disclosure (it renews until cancelled).

Missing any of these is the most common subscription rejection. Build the compliant skeleton first, then design on top of it.

---

## The conversion structure (top to bottom)

1. **Value first, price second.** Lead with the outcome the user wants ("Track unlimited habits", "Remove all ads"), not a feature checklist or the price. Show the transformation.
2. **Concrete benefits, not feature names.** "Sync across all your devices" beats "iCloud integration." 3–5 benefits, scannable, each with an icon.
3. **Plan selection.** If offering multiple durations, **anchor**: show annual next to monthly with a "Save 40%" / "Best value" badge so the annual looks like the smart default. Pre-select the plan you want most users to pick.
4. **Trial framing** (if used): "Start 7-day free trial" as the primary CTA reduces friction far more than "Subscribe." Be explicit about what happens after.
5. **Social proof** (optional): ratings count, testimonials, or "Join 50,000 users" — only if true.
6. **One primary CTA.** A single, high-contrast button. Secondary actions (other plan, restore, close) are visually quieter.
7. **Required legal row** at the bottom: price recap, Restore, Terms, Privacy.

---

## Trial & offer design

- **No-card trials convert higher** but with more cancellations; weigh against intro-price offers. Gate trial eligibility with `isEligibleForIntroOffer` so ex-subscribers don't see "free trial" (see `storekit-purchases`).
- **Reminder UX:** surfacing "we'll remind you before it ends" increases trial starts by reducing fear.
- **Intro offers** (discounted first period) suit habit/utility apps where the user needs time to see value.
- Match the offer to the moment — an onboarding paywall and a contextual one (hit a limit) can use different framing.

---

## Where to place the paywall

| Pattern | When it fits | Trade-off |
|---------|--------------|-----------|
| **Onboarding (hard)** — paywall before use | Strong, obvious value; benefits clear upfront | Highest revenue per install, lowest activation |
| **Onboarding (soft)** — skippable | Most consumer apps | Balanced; keep "skip" discoverable but quiet |
| **Contextual** — at the moment of need (hit a limit, premium feature tapped) | Value is felt in-app | Highest intent, fewer impressions |
| **Persistent entry** — a "Pro" tab/badge | Long-term upsell | Low pressure, low conversion alone |

Most apps combine a **soft onboarding** paywall with **contextual** triggers. Don't trap users — a hidden or fake close button risks rejection and 1-star reviews.

---

## Visual & motion craft

- Apply the app's design system (see `apple-design`, `swiftui-micro-craft`) — the paywall should feel premium, because it's selling premium.
- Respect Dynamic Type and VoiceOver: the price, trial terms, and CTA must be reachable and legible at large sizes (see `ios-accessibility`). Truncated legal text is both a UX and compliance failure.
- Subtle motion on the value prop is fine; never animate the close affordance away.

---

## Measure & iterate

- Instrument **paywall impression → plan selected → purchase → trial-to-paid** (see `app-analytics`).
- A/B test with **Custom Product Pages** and on-device variants; test *one* thing at a time (headline, trial length, plan order).
- Track **trial-to-paid conversion** and **involuntary churn** separately — a high trial start with low conversion means the value promise isn't landing.
