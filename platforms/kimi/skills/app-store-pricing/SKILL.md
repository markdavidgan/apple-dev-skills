---
name: app-store-pricing
category: product
description: App Store pricing strategy, global equalization, subscription management, and regional pricing decisions using Apple's official 900-price-point system. Use when user asks about pricing tiers, IAP pricing, subscription pricing, regional pricing, price changes, App Store proceeds, base storefront selection, introductory offers, or promotional offers.
invoke: "/pricing-strategy [app-id] — Recommend App Store pricing setup and global equalization strategy"
---

# App Store Pricing

**Strategic guidance for App Store pricing using Apple's official 900-price-point system, global equalization, subscription management, and regional pricing decisions.**

All guidance is based on Apple's official pricing capabilities (March 2023 onwards). Do NOT reference pre-2023 fixed tier tables or third-party price matrices — they are outdated.

## When to Use

- **Do use** when the user asks about App Store pricing, IAP pricing, subscription pricing, regional pricing, price changes, proceeds calculations, or base storefront selection
- **Do use** when setting up introductory offers, promotional offers, or offer codes
- **Do use** when planning a price increase or decrease for subscriptions
- **Don't use** for general SaaS pricing theory (Van Westendorp, MaxDiff, etc.) — those frameworks don't apply to Apple's constrained price-point system
- **Don't use** for payment processing outside the App Store

## Apple's Pricing System (Official)

### 900 Price Points

Apple offers **900 price points** per currency (800 default + 100 higher on request up to $10,000). Price increments are:

| Price Range | Increment | Example Prices |
|-------------|-----------|----------------|
| $0.29 – $9.99 | $0.10 | $0.29, $0.39, $0.49 ... $9.99 |
| $10.00 – $49.99 | $0.50 | $10.00, $10.50, $11.00 ... $49.99 |
| $50.00 – $199.99 | $1.00 | $50, $51, $52 ... $199.99 |
| $200.00 – $499.99 | $5.00 | $200, $205, $210 ... $499.99 |
| $500.00 – $9,999.99 | $10–$50 | $500, $510, $520 ... $9,999.99 |

### Pricing Conventions

Apple supports multiple price endings per region. Common conventions:

| Convention | Range | Best For |
|------------|-------|----------|
| `.99` | $0.99 – $9,999.99 | Standard app/IAP pricing |
| `.00` | $1.00 – $10,000 | Clean numbers, annual plans |
| `.90` | $0.90 – $99.90 | Discounts, promotions |
| `.95` | $0.95 – $49.95 | Psychological pricing |

China has additional conventions ( endings in `8`, `9`, `.80`, `.90`). Choose the convention that matches your market positioning.

### Proceeds Calculation

```
Developer Proceeds = (Customer Price − VAT/Applicable Tax) × (1 − Apple Commission)
```

- **Apple Commission**: 15% for Small Business Program / 30% standard
- **Tax**: Apple collects and remits VAT/sales tax in most territories. The App Store Connect pricing tool displays **tax-inclusive** prices by default.
- **Base storefront**: The one territory where Apple will NEVER auto-adjust your price

## Global Equalization Strategy

### Base Storefront Selection

The base storefront is the anchor for all 174 other storefronts. Apple auto-generates equalized prices based on FX rates and taxes.

| Scenario | Recommended Base | Rationale |
|----------|------------------|-----------|
| US-centric business | United States | Largest market, stable currency |
| EU-centric business | Germany or France | Euro anchor, largest EU markets |
| Global but price-sensitive | Your home market | Familiar with local purchasing power |
| Subscription parity desired | Germany | Apple's default for global parity examples |

**Critical rule**: Apple never changes the base storefront price. All other 174 storefronts may auto-adjust when FX rates move 10%+ sustained over quarters, or 25%+ quickly. You receive 14-day email notice before auto-adjustments.

### Manual Override Strategy

When you manually set a price for a specific storefront, Apple stops auto-adjusting that storefront forever (unless you reset via global price change).

| Approach | When to Use | Risk |
|----------|-------------|------|
| **Full auto** (recommended for most) | Let Apple manage all 174 storefronts | Prices drift with FX; always equalized |
| **Key market parity** | Manually lock US/UK/EU to same number (e.g., $7.99 / £7.99 / €7.99) | You must monitor FX and adjust manually |
| **Emerging market discount** | Manually lower prices in India, Indonesia, etc. | Lose auto-adjustment; must maintain manually |
| **Full manual** | Enterprise apps with territory-specific contracts | High maintenance burden |

**Decision tree:**
1. Is your app sold in >20 territories? → Use full auto
2. Do you care about price parity across US/UK/EU? → Auto + manual override on those 2–3 storefronts
3. Do you have localized cost structures? → Manual for those territories only

### Subscription Pricing Specifics

Subscriptions behave differently from one-time purchases:

| Behavior | One-Time IAP / Paid App | Auto-Renewable Subscription |
|----------|------------------------|----------------------------|
| Auto FX adjustment | Yes | **No** |
| Tax/FX change impact | Apple auto-adjusts | You must update manually |
| Price change for existing subscribers | N/A (one-time) | Optional: preserve current price |
| Consent required for increase | N/A | Yes, in certain markets and for large increases |

**Subscription price changes:**
- You can preserve the current price for existing subscribers when increasing
- Apple handles consent flows via email, push notification, and in-app messaging (iOS 13.4+)
- Large or frequent increases trigger consent requirements
- Price decreases apply to all subscribers immediately

## Subscription Offer Types

| Offer Type | Eligibility | Duration | Use Case |
|------------|-------------|----------|----------|
| **Introductory Offer** | New customers only | 1 week – 1 year | Acquisition |
| **Promotional Offer** | New, existing, lapsed | Flexible | Retention, win-back |
| **Offer Code** | New, existing, lapsed | Flexible | Marketing campaigns |

### Introductory Offer Configurations

- **Pay as you go**: Discounted recurring price (e.g., $0.99/mo for 3 months)
- **Pay up front**: One-time discounted price for a period (e.g., $4.99 for 6 months)
- **Free**: Free trial (3 days – 1 year)

One introductory offer per subscription group per customer lifetime.

### Promotional Offers

- Requires generating an offer identifier in App Store Connect
- You present the offer in-app using `SKPaymentQueue` with the promotional offer identifier
- Used for retention (e.g., "come back for 50% off 3 months")

### Offer Codes

- Up to 1 million redemptions per app per quarter
- Can be customized: customer eligibility, timing, territories, pricing, duration
- Redeemable via App Store, in-app, or custom URL

## Pricing Workflows

### Workflow A: Set Initial App Pricing

1. **Choose base storefront** — Select the territory you know best
2. **Select base price** — Pick from 900 price points using the most common convention for that territory
3. **Review global equalization** — Apple generates prices for 174 storefronts; review and manually override only key markets if needed
4. **Confirm** — New pricing takes effect immediately

### Workflow B: Plan a Subscription Price Increase

1. **List current subscriptions** — Use `asc_list_subscriptions` to find subscription IDs
2. **Determine new price** — Pick from 800 price points (or request higher tier access)
3. **Decide on preserved pricing** — Will existing subscribers keep their current price?
4. **Check consent requirements** — Large increases or increases in certain markets require user consent
5. **Schedule the change** — Set start date; Apple notifies subscribers 30 days in advance
6. **Monitor churn** — Watch subscription metrics after the change

### Workflow C: Set Up Introductory Pricing

1. **Create subscription** (if not exists) — Use `asc_create_subscription`
2. **Set standard price** — Establish the normal subscription price first
3. **Add introductory offer** — In App Store Connect, set offer type, duration, and price
4. **Localize** — Use `asc_set_subscription_localization` for each market's offer text
5. **Implement in-app** — Use StoreKit to display introductory pricing eligibility

### Workflow D: Regional Availability Strategy

1. **App-level availability** — Distribute app globally or restrict to specific storefronts
2. **IAP-level availability** — Restrict specific in-app purchases to territories where you have content rights
3. **Subscription-level availability** — Control per-subscription territory availability

**Important**: When removing an existing subscription from a territory, provide advance notice to existing subscribers.

## Common Pricing Mistakes

| Mistake | Why It Hurts | Fix |
|---------|--------------|-----|
| **Ignoring tax-inclusive display** | You think you earn $0.70 on $0.99, but VAT reduces proceeds in EU | Use App Store Connect's proceeds estimator |
| **Manual override on too many storefronts** | You lose auto-equalization and prices drift out of sync | Override only 2–3 key markets |
| **Forgetting subscription auto-adjust doesn't exist** | You expect FX changes to auto-update sub prices | Set calendar reminders to review sub pricing quarterly |
| **Wrong tax category** | Books taxed differently than software; video has special rules | Assign correct tax category in ASC |
| **Price increase without preserved pricing** | Existing subscribers churn unexpectedly | Preserve pricing for existing subscribers on increases |
| **Intro offer without localization** | Offer text shows in wrong language | Localize via `asc_set_subscription_localization` |

## Tax Categories

App Store Connect lets you assign tax categories based on content type. This affects tax rates in each territory.

| Category | Content Types |
|----------|--------------|
| Software | Default for most apps |
| Books | E-books, audiobooks |
| News / Magazines | Periodical subscriptions |
| Video | Streaming video, movies |

**Action**: Review and set the correct tax category in App Store Connect → App → Pricing and Availability → Tax Category. Incorrect categorization means incorrect tax calculation and lower/higher proceeds than expected.

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `asc_get_app_pricing` | Get current app pricing schedule (manual + automatic prices) |
| `asc_list_iaps` | List in-app purchases for pricing review |
| `asc_list_subscriptions` | List subscriptions to check current pricing |
| `asc_list_subscription_groups` | List subscription groups for tier strategy |
| `asc_create_iap` | Create a new IAP with pricing to be set in ASC |
| `asc_create_subscription` | Create a subscription with period and group level |
| `asc_update_subscription` | Update subscription metadata (not price — done in ASC) |
| `asc_set_iap_localization` | Localize IAP name/description for pricing display |
| `asc_set_subscription_localization` | Localize subscription name/description |

**Note**: Setting actual prices requires App Store Connect web UI or the App Store Connect API. The MCP server covers IAP/subscription creation and metadata; price scheduling is managed through ASC's pricing tool directly.

## Quick Reference: Price Selection

### App Pricing Conventions

| Price | Signal | Typical Use |
|-------|--------|-------------|
| Free + IAP | Freemium | Most common; lowest barrier |
| $0.99 | Impulse buy | Simple utility apps |
| $1.99–$2.99 | Value app | Tools, productivity |
| $3.99–$5.99 | Premium utility | Pro features, no subscriptions |
| $9.99+ | Professional | Niche professional tools |

### Subscription Pricing Conventions

| Monthly Price | Annual Equivalent | Category |
|---------------|-------------------|----------|
| $0.99–$1.99 | $9.99–$19.99 | Budget/utility |
| $2.99–$4.99 | $29.99–$39.99 | Consumer/prosumer |
| $5.99–$9.99 | $49.99–$79.99 | Premium consumer |
| $10.99–$19.99 | $89.99–$149.99 | Pro/professional |
| $20+ | $150+ | Enterprise/niche |

### Annual Plan Psychology

Annual plans should be priced at roughly **8–10 months** of the monthly price (17–20% discount). Too small a discount won't drive annual commitment; too large erodes lifetime value.

## Cross-References

- `asc-submission` — Prepare app metadata and screenshots for review
- `ios-build` — Build validation before pricing changes go live
- `apple-review` — Review compliance including IAP restore mechanisms and pricing display
