---
name: submission-preflight
category: asc
description: Pre-submission risk audit for App Store review — catch the rejection triggers (metadata, privacy, IAP, design, account, legal) BEFORE you submit, by app type. Use when the user says "preflight", "will this get rejected", "check before submitting", "review readiness", "submission checklist", "App Review guidelines", "is my app compliant", or is about to submit a build. Run after asc-build-check, before asc-submission hits submit.
invoke: "/preflight [app] — Audit a build against App Review rejection triggers by app type before submitting."
---

# Submission Preflight

**Catch the rejection before Apple does.** This is the adversarial pass you run *before* `asc-submission` submits — it simulates App Review and finds the guideline violations that cost you a 1–3 day rejection cycle each. Build/upload mechanics live in `asc-build-check` and `asc-submission`; privacy-manifest specifics live in `privacy-manifest`; this skill is the *will-it-pass-review* gate.

App Review rejects on patterns, not vibes. The rejection reasons cluster into six buckets, and each app type adds its own. This skill checks the universal buckets, then loads the rule pack for the app's type.

---

## How to run a preflight

1. **Identify the app type** — pick the closest from the table below. An app can match several; load each relevant pack.
2. **Pull live state** via the App Store Connect MCP: `asc_get_app_info`, `asc_get_metadata` (name/subtitle/description/keywords/URLs), `asc_get_privacy` (nutrition label), `asc_get_age_rating`, `asc_list_iaps` / `asc_list_subscriptions`, `asc_check_submission` (what's blocking right now). If MCP access isn't configured, ask the user to paste each field.
3. **Run the universal rule packs** (`references/rule-*.md`) — six buckets, every app.
4. **Run the app-type pack(s)** (`references/type-*.md`).
5. **Report** as a triaged checklist: ❌ will-reject / ⚠️ likely-flag / ✅ clear — each with the guideline number and the concrete fix.
6. **Hand off**: privacy-manifest gaps → `privacy-manifest`; if already rejected → `app-rejection-recovery`; listing/keyword issues → `asc-aso`.

---

## App-type router

| If the app… | Load pack | Highest-risk guideline |
|-------------|-----------|------------------------|
| Any app (always) | `references/type-all-apps.md` | 2.1, 2.3.x, 5.1.1 |
| Sells subscriptions / IAP | `references/type-subscription-iap.md` | 3.1.1, 3.1.2 |
| Social / user-generated content | `references/type-social-ugc.md` | 1.2 |
| Targets or appeals to kids | `references/type-kids.md` | 1.3, 5.1.4 |
| Health / fitness / medical | `references/type-health-fitness.md` | 1.4.1, 5.1.3 |
| Games (esp. loot/gambling-adjacent) | `references/type-games.md` | 3.1.1, 5.3 |
| macOS app | `references/type-macos.md` | 2.4.5, 2.5 |
| Uses AI / generative / chatbot | `references/type-ai-apps.md` | 1.2, 4.3, 5.1.1 |
| Crypto / finance / trading | `references/type-crypto-finance.md` | 3.1.5, 3.2.1 |
| VPN / network / privacy tool | `references/type-vpn-utility.md` | 5.4, 2.5.1 |

---

## The six universal buckets

Each has a rule pack under `references/rules/`. The rule schema is: **What to check → How to detect → Resolution → Example rejection.**

| Bucket | Pack | Catches |
|--------|------|---------|
| **Metadata & assets** | `references/rule-metadata.md` | Inaccurate screenshots, placeholder text, wrong category, beta language, mentioning other platforms, broken support URL (2.3.x) |
| **Privacy** | `references/rule-privacy.md` | Missing privacy policy, nutrition label mismatch, ATT prompt, data collection without consent, missing manifest (5.1.1, 5.1.2) |
| **Purchases** | `references/rule-subscription.md` | IAP not using StoreKit, missing restore, subscription terms, external-purchase steering (3.1.1, 3.1.2) |
| **Design & function** | `references/rule-design.md` | Crashes, broken links, login walls with no demo account, web-wrapper apps, minimum functionality (2.1, 4.2) |
| **Account & legal** | `references/rule-entitlements.md` | Sign in with Apple parity, account deletion, entitlement misuse, export compliance (5.1.1(v), 5.6) |
| **Demo & reviewability** | `references/rule-metadata.md` | No demo credentials, gated content review can't reach, App Review Notes empty |

---

## The highest-ROI checks (if you only do five)

1. **Demo account + App Review Notes.** Any login wall without working demo credentials in App Review Information = automatic 2.1 rejection. Free, 30 seconds, most common avoidable reject.
2. **Account deletion.** If the app supports account creation, it **must** offer in-app account deletion (5.1.1(v)). Settings-only or "email us" fails.
3. **Privacy policy URL + nutrition label truth.** A reachable privacy policy is mandatory; the nutrition label must match what the app actually collects (cross-check with `privacy-manifest`).
4. **Subscription paywall completeness.** Price, period, what's included, restore button, and links to Terms (EULA) + Privacy on the purchase screen (3.1.2). See `paywall-design`.
5. **Screenshots match the current build.** Outdated/marketing-only screenshots that don't show the actual UI are 2.3.10. Re-shoot after UI changes.

---

## Output template

```
## Preflight: <App Name> — <build/version>
App type(s): <e.g. subscription + AI>

### ❌ Will reject (fix before submitting)
- [Guideline X.Y] <issue> → <fix>

### ⚠️ Likely to be flagged
- [Guideline X.Y] <issue> → <fix>

### ✅ Clear
- <bucket> — checked, no issues

### Demo & reviewability
- Demo account: <present / MISSING>
- App Review Notes: <adequate / MISSING>

Recommendation: <SAFE TO SUBMIT / FIX BLOCKERS FIRST>
```

> A preflight that says "safe to submit" and is wrong costs the user a review cycle. Bias toward flagging. When a rule is ambiguous, surface it as ⚠️ with the guideline number rather than silently passing it.
