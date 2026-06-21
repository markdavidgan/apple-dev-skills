---
name: apple-router
category: product
description: Dispatcher that points a vague app request to the right Apple dev skill(s) and the order to run them. Use when the request is broad or you are unsure which skill applies — "help me grow my app", "get ready to ship", "improve my App Store presence", "my app isn't making money", "what should I do next", or any goal that spans discovery, conversion, lifecycle, submission, or launch. Routes; it does not do the work itself.
---

# Apple Router

**Turn a fuzzy goal into the right skill, in the right order.** When a request is broad ("grow my app", "get ready to launch", "why is revenue flat"), don't guess — map the goal to the lifecycle stage, hand off to the specific skill(s), and sequence them. This skill *routes*; the named skills do the work.

> If the request already names a clear task (e.g. "audit my keywords", "fix this rejection"), skip the router and go straight to that skill. Use this only to disambiguate.

---

## How to route

1. **Classify the intent** into a stage (table below).
2. **If foundational context is missing**, run the foundation skill first: `app-marketing-context` for any growth/marketing work, `product-spec` for a feature.
3. **Dispatch** to the matched skill(s).
4. **If the goal spans stages**, run them in the order given and tell the user the sequence up front.

---

## Intent → skill map

### Discovery & growth ("more installs", "rank higher", "grow")

| The user wants… | Route to |
|-----------------|----------|
| Set up reusable marketing context first | `app-marketing-context` (do this before the rest) |
| Rank for more / better keywords, audit the listing | `asc-aso` |
| Run paid acquisition on the App Store | `apple-search-ads` |
| Plan a launch or major-version release | `app-launch` |
| Get featured by Apple editors | `app-store-featured` |
| Brand, icon, screenshots, marketing assets | `app-brand-identity` → `app-icon-composer` |

### Conversion & money ("more revenue", "improve the paywall")

| The user wants… | Route to |
|-----------------|----------|
| Design / fix the paywall | `paywall-design` |
| Set or restructure pricing | `app-store-pricing` |
| Implement purchases in code | `storekit-purchases` |
| Manage the subscriber journey (trials, churn, win-back) | `subscription-lifecycle` |

### Activation & retention ("users drop off", "keep users")

| The user wants… | Route to |
|-----------------|----------|
| Fix the first-run / onboarding flow | `onboarding-optimization` |
| Improve D1/D7/D30 retention | `retention-optimization` |
| Decide what to measure | `app-analytics` |
| Get more / better ratings | `rating-prompt-strategy` |
| Respond to and learn from reviews | `review-management` |
| Re-engage with notifications | `push-notifications` |

### Ship & compliance ("get ready to submit", "rejected")

| The user wants… | Route to |
|-----------------|----------|
| Check CI build / signing | `asc-build-check` |
| Risk-audit before submitting | `submission-preflight` |
| Privacy manifest / required-reason APIs | `privacy-manifest` |
| Actually submit / TestFlight | `asc-submission` |
| Recover from a rejection | `app-rejection-recovery` |
| Monitor post-release crashes / phased release | `asc-build-check` |

### Build & craft ("write the feature", "review my code")

Engineering and design requests route to the existing skills — e.g. `apple-design`, `ios-accessibility`, `swift6-concurrency`, `performance-instruments`, `apple-review`, `complete-feature`. These are usually named directly; the router only needs to catch the growth/ship side above.

---

## Common multi-skill sequences

When a goal spans stages, run in this order and say so up front:

- **"Help me grow my app"** → `app-marketing-context` → `asc-aso` → (`apple-search-ads` if budget) → `rating-prompt-strategy` + `review-management`.
- **"Get ready to launch"** → `app-marketing-context` → `app-brand-identity`/`app-icon-composer` → `asc-aso` → `submission-preflight` → `asc-submission` → `app-launch` → `app-store-featured`.
- **"Revenue is flat"** → `app-analytics` (find the leak) → `paywall-design` or `subscription-lifecycle` or `app-store-pricing` (fix the identified stage).
- **"Users churn"** → `app-analytics` → `onboarding-optimization` (if early drop) or `retention-optimization` (if later) → `push-notifications`.
- **"I got rejected"** → `app-rejection-recovery` → fix → `submission-preflight` → `asc-submission`.

---

## Disambiguation rules

- **`product-spec` vs `app-marketing-context`** — product requirements vs. go-to-market positioning. A feature request → `product-spec`; a growth request → `app-marketing-context`.
- **`asc-aso` vs `apple-search-ads`** — organic discoverability vs. paid placement. They share keyword research; do ASO first.
- **`paywall-design` vs `app-store-pricing` vs `storekit-purchases`** — the screen vs. the economics vs. the code.
- **`onboarding-optimization` vs `retention-optimization`** — Day-0 activation vs. Day-7+ return.
- **`submission-preflight` vs `asc-submission`** — will-it-pass-review audit vs. the actual submission mechanics. Preflight first.
- **`app-icon-composer` vs `app-brand-identity`** — producing the layered icon files vs. deciding the brand/concept. Concept first.

When two skills genuinely both apply, run the upstream one first and name the sequence rather than picking one silently.
