# Preflight Pack — Subscriptions & IAP

Deep pack for Guideline 3.1.1 / 3.1.2. Open this alongside `rule-subscription.md` and whenever the app offers any auto-renewable subscription, consumable, or non-consumable IAP. Cross-reference: `paywall-design`, `app-store-pricing`, `subscription-lifecycle`.

---

### IAP for Digital Goods  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** All digital content, features, or services consumed within the app must be purchased through Apple's IAP system. Physical goods and services rendered outside the app are exempt.
- **How to detect:** Use `asc_list_iaps` and `asc_list_subscriptions` to confirm every purchasable item is registered. grep source for payment SDKs (Stripe, Braintree, PayPal) not wrapped behind an entitlement check — these are disqualifying if they gate digital content.
- **Resolution:** Route all digital-good purchases through StoreKit. Remove or server-gate any alternative payment path that affects in-app feature access.
- **Example rejection:** "Your app includes the ability to purchase digital content or services using a payment mechanism other than in-app purchase, which is not permitted."

---

### Paywall Disclosure Completeness  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** Before a user initiates an auto-renewable subscription purchase, the paywall must clearly display: price, billing period, what is included, that billing is automatic and recurring, a link to the EULA, and a link to the privacy policy.
- **How to detect:** Manually walk the subscription purchase flow in the current build. Use `asc_get_metadata` to verify EULA URL is set in App Store Connect. Use `asc_get_privacy` to confirm the privacy policy URL is present. Screenshot the paywall for review.
- **Resolution:** Render all required disclosure elements above the purchase CTA. Do not bury them behind a "terms" link that opens only after tapping buy. Apple expects price and period to be visually prominent.
- **Example rejection:** "We noticed your app's subscription paywall does not clearly display the price, duration, and content included in the subscription prior to purchase initiation."

---

### Restore Purchases  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any app selling non-consumable IAP or auto-renewable subscriptions must provide a visible "Restore Purchases" button accessible without requiring a new purchase attempt.
- **How to detect:** Manually navigate all purchase-gated screens. grep source for `restoreCompletedTransactions` / `Transaction.currentEntitlements`. Use `asc_check_submission` to see if this is flagged.
- **Resolution:** Place a "Restore Purchases" button on the paywall or in Settings. It must be reachable on a fresh install without prompting a new purchase.
- **Example rejection:** "Your app does not include a mechanism to restore previously purchased in-app purchases. Please add a 'Restore Purchases' option that users can access without initiating a new purchase."

---

### Free Trial Terms Disclosure  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** If the subscription offers a free trial, introductory, or promotional period, the paywall must state the trial length, what happens at the end (price + billing period), and how to cancel before being charged.
- **How to detect:** Use `asc_list_subscriptions` to check introductory offer configuration. Manually trigger the trial-eligible purchase flow and inspect displayed text.
- **Resolution:** Display trial terms in human-readable language adjacent to the subscribe button, e.g., "7-day free trial, then $9.99/month. Cancel anytime in Settings before trial ends."
- **Example rejection:** "Your app offers a free trial period but does not clearly communicate the price and billing period that will apply once the trial ends, or how users can cancel before being charged."

---

### No External-Payment Steering  ·  Guideline 3.1.1 / Anti-Steering  ·  REJECTION
- **What to check:** The app must not contain buttons, links, or language that direct users to purchase outside the app to avoid Apple's commission. This includes URLs to web checkout, references to "cheaper on our website," and developer emails soliciting purchases.
- **How to detect:** grep source and all web views for "cheaper," "website," "sign up at," external checkout URLs embedded in app strings. Use `asc_get_metadata` to check description for steering language (also rejected).
- **Resolution:** Remove all external-payment call-to-actions for digital goods. Reader apps and qualifying apps may use an external purchase link only under the specific entitlement Apple grants — do not implement without that entitlement.
- **Example rejection:** "Your app contains a link or call-to-action that directs users to a purchase mechanism other than in-app purchase. Apps may not include buttons, external links, or other calls to action that direct customers to purchase mechanisms other than Apple's in-app purchase."

---

### Subscription Group / Upgrade-Downgrade Correctness  ·  Guideline 3.1.2  ·  WARNING
- **What to check:** All tiers of a subscription product family must be in the same subscription group. Upgrade, downgrade, and crossgrade behavior must match the group ranking. Users must not be charged twice during a tier switch.
- **How to detect:** Use `asc_list_subscriptions` to inspect group membership and rank ordering. Verify in StoreKit Testing that a downgrade defers correctly and an upgrade is immediate.
- **Resolution:** Assign correct ranks within the group (1 = highest value). Test all switching paths in a sandbox environment. Do not create separate groups for tiers that compete.
- **Example rejection:** "We found that users who upgrade or downgrade their subscription are being charged for both the old and new subscription simultaneously. Please review your subscription group configuration."

---

### Family Sharing Claims  ·  Guideline 3.1.2  ·  WARNING
- **What to check:** If the App Store product page or paywall claims Family Sharing is supported, the IAP/subscription must have Family Sharing enabled in App Store Connect, and the app must handle the `familyShared` transaction property correctly.
- **How to detect:** Use `asc_list_subscriptions` / `asc_list_iaps` to verify "Family Sharing" toggle state. grep source for `familyShared` handling.
- **Resolution:** Enable Family Sharing on the relevant products in App Store Connect and implement the corresponding StoreKit entitlement check. Remove marketing claims if the feature is not configured.
- **Example rejection:** "Your app's description states that the subscription supports Family Sharing, but the subscription product in App Store Connect does not have Family Sharing enabled."

---

### "Free" Claims When Paywalled  ·  Guideline 2.3.2 / 3.1.2  ·  REJECTION
- **What to check:** If core functionality requires a subscription or IAP, the app must not be described as "free" in the name, subtitle, or description without clearly disclosing that additional purchases are required. The app metadata must not be misleading about cost.
- **How to detect:** Use `asc_get_metadata` to retrieve name, subtitle, and description. Search for "free," "no cost," "no subscription needed." Confirm whether the app is actually usable without payment.
- **Resolution:** Replace misleading "free" language with "free to download" or "try for free" where accurate. Ensure the description mentions required purchases prominently.
- **Example rejection:** "Your app's description states the app is 'free,' however, users are immediately presented with a subscription paywall upon launch with no free tier available."
