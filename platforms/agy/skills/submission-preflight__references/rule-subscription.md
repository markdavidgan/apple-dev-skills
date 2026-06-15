# Preflight Rules — Subscriptions & In-App Purchases

---

### Digital Goods Must Use IAP  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any digital content, features, or services consumed within the app must be purchased through Apple's In-App Purchase system. This includes premium features, virtual currency, extra content, and subscriptions. Physical goods, person-to-person services, and business-to-business enterprise software are exempt.
- **How to detect:** `asc_list_iaps` to enumerate existing IAPs. Review app flows for any premium feature access that does not go through StoreKit. Test with a reviewer-facing account to confirm IAP is the only path to unlocking content.
- **Resolution:** Implement StoreKit purchases for all applicable digital goods. Remove any payment flows that bypass IAP.
- **Example rejection:** "Your app offers digital content for purchase through a mechanism other than In-App Purchase. Digital goods must be sold using Apple's In-App Purchase API."

---

### Missing Restore Purchases  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any app offering non-consumable IAPs or auto-renewable subscriptions must provide a clearly accessible "Restore Purchases" mechanism so users can recover purchases on a new device or after reinstalling.
- **How to detect:** Manual review: search for a restore button in Settings, purchase flow, or paywall UI. Verify it calls `StoreKit.AppStore.sync()` (StoreKit 2) or `SKPaymentQueue.default().restoreCompletedTransactions()` (StoreKit 1). `asc_list_iaps` confirms which non-consumable or subscription products exist.
- **Resolution:** Add a visible "Restore Purchases" button in the paywall or settings screen. Wire it to the appropriate StoreKit restore API.
- **Example rejection:** "Your app offers In-App Purchases but does not include a mechanism for users to restore previous purchases."

---

### Paywall Missing Required Disclosure  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** The subscription paywall or purchase screen must clearly display: (1) price and billing period, (2) what is included in the subscription, (3) that it auto-renews, (4) how to cancel, (5) links to Terms of Service / EULA and Privacy Policy.
- **How to detect:** Manual review of every paywall screen. Confirm StoreKit `Product.displayPrice` and `subscriptionPeriod` are shown. Verify "Cancel anytime in App Store Settings" or equivalent language is visible. Check that EULA and Privacy Policy links are tappable and resolve.
- **Resolution:** Update the paywall UI to include all required disclosures. Apple provides a recommended subscription disclosure template in the Human Interface Guidelines.
- **Example rejection:** "Your subscription paywall does not clearly state the subscription price, duration, and auto-renewal terms before purchase. Please update your paywall to include this information."

---

### Anti-Steering: Directing Users to External Purchase  ·  Guideline 3.1.1 / 3.1.3  ·  REJECTION
- **What to check:** The app must not contain language or UI that encourages users to purchase outside the App Store (e.g., "Buy on our website for a lower price," "Subscribe at example.com," or buttons/links that navigate to an external checkout for digital goods).
- **How to detect:** Full UI walkthrough and text search of the binary / source for "website," "web," "cheaper," "subscribe at," "visit us to" in contexts adjacent to purchase flows. `asc_get_metadata` → description and What's New should also be checked.
- **Resolution:** Remove steering language and external purchase links for digital goods. Note: a limited US StoreKit External Purchase Entitlement and EU DMA-based entitlement exist but require explicit Apple approval and have specific disclosure requirements — do not use without that entitlement in place.
- **Example rejection:** "Your app includes a link to purchase a subscription on your website. Apps may not include buttons, links, or other calls to action that direct users to purchase digital goods or services outside of the App Store."

---

### Reader App / Multiplatform Service Exemption Misapplied  ·  Guideline 3.1.3  ·  WARNING
- **What to check:** Reader apps (streaming media, digital magazines, newspapers, books, audio, cloud storage) and multiplatform services may allow users to access previously purchased content or subscriptions without offering IAP — but may NOT promote, link to, or assist in external purchases within the app.
- **How to detect:** Confirm your app's category qualifies as a Reader under 3.1.3. Verify no "Sign up" or "Subscribe" links to external web flows exist within the app. Account creation for a Reader app must not be possible from within the iOS app itself unless it is free.
- **Resolution:** Remove in-app sign-up or subscribe links for Reader apps. Only link to Apple-approved external management if the Reader entitlement is held. Cross-ref `subscription-lifecycle` skill.
- **Example rejection:** "Your app includes a link to subscribe to your service on your website. Reader apps may not include links or calls to action for purchasing content outside the App Store."

---

### Free Trial Disclosure Missing  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** If a free trial is offered, the paywall must disclose the trial length, what happens at trial end (price and billing period), and how to cancel before being charged. The disclosure must appear before the user initiates the trial purchase.
- **How to detect:** Review paywall screens that surface introductory offers via `Product.subscriptionInfo.introductoryOffer`. Confirm trial duration, post-trial price, and cancellation instructions are shown before the purchase CTA.
- **Resolution:** Add explicit trial disclosure text adjacent to or above the subscribe button. Use StoreKit's `introductoryOffer` data to populate it dynamically.
- **Example rejection:** "Your app offers a free trial but does not clearly inform users of the trial duration and the price they will be charged when the trial ends."

---

### IAP Metadata Incomplete or Inconsistent  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Each IAP product must have a display name, description, and at least one screenshot (for subscriptions: a subscription group screenshot) submitted for review. The IAP display name in the storefront must match how the product is described in the app UI.
- **How to detect:** `asc_list_iaps` → check each product's `name`, `description`, `state`, and attached review screenshots. Verify subscription group display names are set. Cross-check IAP names against how they appear in app paywalls.
- **Resolution:** Complete all required IAP metadata fields in App Store Connect. Upload a screenshot showing the IAP in context within the app.
- **Example rejection:** "One or more of your In-App Purchase products are missing required metadata. Please ensure all In-App Purchase items have a display name, description, and review screenshot."

---

### Price Tier Mismatch / Unexpected Price  ·  Guideline 3.1.1  ·  WARNING
- **What to check:** The IAP price displayed in the app (if hardcoded) must match the actual StoreKit price for the user's storefront. Hardcoded price strings go stale when Apple adjusts prices in a territory or when you change tiers.
- **How to detect:** Compare hardcoded price strings in the UI against `asc_list_iaps` → `priceTier` and against `Product.displayPrice` returned at runtime by StoreKit. Cross-ref `app-store-pricing` skill.
- **Resolution:** Always render prices dynamically from StoreKit's `Product.displayPrice`. Never hardcode currency amounts in UI strings.
- **Example rejection:** "The price shown in your app's paywall does not match the price of the In-App Purchase. Please ensure prices are retrieved dynamically from StoreKit."

---

> Cross-ref: `paywall-design` for UI layout requirements; `app-store-pricing` for tier management; `subscription-lifecycle` for renewal, cancellation, and billing-retry handling.
