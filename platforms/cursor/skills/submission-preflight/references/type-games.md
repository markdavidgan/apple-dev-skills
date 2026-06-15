# Preflight Pack — Games

---

### Loot Box Odds Disclosure  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any randomized IAP (loot boxes, gacha pulls, card packs, spins) must prominently disclose the probability of each item type before purchase.
- **How to detect:** Use `asc_list_iaps` to enumerate IAPs; flag any with "pack", "chest", "box", "spin", or "pull" in the display name. Check the app's UI screenshots and build for a disclosure screen prior to the purchase CTA. Verify disclosure is in-app, not merely in a linked web page.
- **Resolution:** Add a probability table or interactive odds screen surfaced before the buy button. Odds must be exact (e.g., "Legendary: 0.3%"), not ranges. Link to the odds disclosure from the IAP paywall.
- **Example rejection:** "Your app offers randomized virtual items but does not disclose the probability of receiving each item type prior to purchase, which is required by App Store Review Guideline 3.1.1."

---

### Real-Money Gaming / Gambling  ·  Guideline 5.3  ·  REJECTION
- **What to check:** Apps where real currency is wagered (poker, sports betting, casino, fantasy sports with cash prizes) require explicit Apple approval, proof of licensing in each jurisdiction offered, and geo-restriction to licensed regions.
- **How to detect:** Check `asc_get_metadata` for the primary/secondary category (Games > Casino or Sports). Use `asc_get_age_rating` to confirm 17+. Verify that the binary enforces geo-restriction (IP or device locale check) and that the Apple-approved entitlement is present. Confirm licensing documentation was submitted via App Review Notes.
- **Resolution:** Apply for the gambling entitlement through Apple's developer portal before submitting. Implement server-side geo-blocking. Provide reviewer credentials to a demo region where gambling is licensed and testing is permitted. Document licenses in the App Review Information notes field.
- **Example rejection:** "Your app facilitates real-money wagering. Apps that offer real money gaming, gambling, or lotteries must obtain appropriate licensing, restrict availability to licensed regions, and receive prior approval from Apple."

---

### In-Game Currency IAP Restorability  ·  Guideline 3.1.1  ·  WARNING
- **What to check:** Non-consumable IAPs (permanent upgrades, ad removal) must be restorable. Consumable virtual currency is exempt, but bundles that mix consumable and non-consumable items need careful split.
- **How to detect:** Use `asc_list_iaps` and check each IAP's `productType`. Any `NON_CONSUMABLE` that lacks a "Restore Purchases" path in the UI is a violation. Mixed bundles where a non-consumable benefit is bundled with consumable currency should be separated or treated as non-consumable.
- **Resolution:** Implement `SKPaymentQueue.default().restoreCompletedTransactions()` (StoreKit 1) or `Transaction.currentEntitlements` (StoreKit 2) and expose a visible Restore button in Settings or Purchases screen.
- **Example rejection:** "Your app does not provide a mechanism to restore previously purchased non-consumable in-app purchases, which is required by the App Store Review Guidelines."

---

### Simulated Gambling for Kids  ·  Guideline 5.3 / 1.3  ·  REJECTION
- **What to check:** Slot machines, card games, or casino-style mechanics intended for or accessible to minors (age rating below 17+) that simulate gambling — even without real money — may be rejected if they normalize gambling behavior for children.
- **How to detect:** Use `asc_get_age_rating` to check the rating and any content descriptors. Inspect whether the app uses slot reel animations, chip/bet mechanics, or terminology ("bet", "jackpot", "casino") in an app rated 4+ or 9+.
- **Resolution:** Either raise the age rating to 17+ and restrict download in jurisdictions with minors-gambling laws, or redesign the mechanic to remove casino-style presentation. Do not market casino-style features in screenshots if rated below 17+.
- **Example rejection:** "Your app contains slot machine or casino-style content but is rated for ages 4 and up. Apps with gambling-style content must be rated 17+."

---

### Third-Party Ad SDK Privacy Manifests  ·  Guideline 5.1.2  ·  REJECTION
- **What to check:** Game engines and ad SDKs (Unity Ads, ironSource, AppLovin MAX, Meta Audience Network, Google AdMob) must include a privacy manifest (`PrivacyInfo.xcprivacy`) declaring required reason APIs and collected data. Missing manifests now cause upload rejection.
- **How to detect:** Run `asc_check_submission` and inspect Transporter or Xcode upload logs for "ITMS-91053: Missing API declaration" or "ITMS-91054" errors. Check the linked frameworks in the app bundle for `PrivacyInfo.xcprivacy` presence. Escalate to the `privacy-manifest` skill for full audit.
- **Resolution:** Update each third-party SDK to a version that ships its own `PrivacyInfo.xcprivacy`. For custom ad code, add a manifest in the main app target declaring all accessed required-reason APIs. See the `privacy-manifest` skill for full remediation steps.
- **Example rejection:** "Your app accesses one or more required reason APIs without providing an approved reason in the app's privacy manifest. Please update your app's privacy manifest to include approved reasons."

---

### Clone / Spam Games  ·  Guideline 4.3  ·  REJECTION
- **What to check:** Games that are near-identical copies of existing App Store titles, or bulk-produced from an asset template with minimal differentiation, are rejected as spam or copycats.
- **How to detect:** Manual review — compare screenshots, gameplay loops, and metadata against obvious market leaders. Use `asc_get_metadata` to inspect title, subtitle, and keywords for keyword-stuffed clones. Flag if the developer has >10 near-identical apps in their portfolio (`asc_check_submission` reviewer notes may reference this).
- **Resolution:** Differentiate with original mechanics, art, or narrative. Remove duplicate keyword strings. Consolidate template-derived apps into a single app with in-app level packs rather than separate submissions.
- **Example rejection:** "Your app duplicates the content and functionality of apps already available on the App Store. Submitting duplicate apps is not acceptable."

---

### Age Rating Accuracy for Violent / Mature Content  ·  Guideline 4.3 / Rating Requirements  ·  REJECTION
- **What to check:** Games with cartoon violence, realistic violence, sexual content, horror, or drug/alcohol themes must select the correct frequency descriptor during age rating setup. Under-rating causes rejection or removal.
- **How to detect:** Use `asc_get_age_rating` and cross-check each descriptor against visible in-game content. Pay special attention to "Realistic Violence" vs "Cartoon Violence" — many games mis-select. Games with 17+ content distributed to all regions without parental gate are flagged.
- **Resolution:** Re-rate the app via App Store Connect > App Information > Age Rating. If the correct rating is 17+, ensure the store page and marketing do not target minors.
- **Example rejection:** "Your app's age rating does not accurately reflect its content. Apps must be rated according to the most mature content present in the app, including content generated by users or AI."

---

**Cross-references:** `rule-subscription.md` (subscription IAPs), `paywall-design` (paywall UI rules), `privacy-manifest` (SDK manifest audit), `rule-entitlements.md` (gambling entitlement process).
