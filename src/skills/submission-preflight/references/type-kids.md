# Preflight Pack — Kids Category Apps

Deep pack for Guideline 1.3 and 5.1.4 (Privacy — Kids). Open this for any app in the Kids Category or any app whose primary or significant audience includes children under 13. Cross-reference: `rule-privacy.md`.

---

### No Third-Party Analytics or Advertising (Non-Apple, Non-Contextual)  ·  Guideline 1.3  ·  REJECTION
- **What to check:** Kids Category apps may not use third-party advertising networks or analytics SDKs unless the vendor is on Apple's approved list or the ads are strictly contextual (no user data collected, no behavioral targeting). Behavioral advertising is categorically prohibited.
- **How to detect:** grep the project for known analytics SDK imports: `FirebaseAnalytics`, `Amplitude`, `Mixpanel`, `AppsFlyerLib`, `Adjust`, `FacebookCore`, `GoogleMobileAds`, `MoPub`, `ironSource`. Use `asc_check_submission` to review any prior notes about SDK rejections. Check `Package.resolved` / `Podfile.lock` for suspect packages.
- **Resolution:** Remove disqualifying SDKs entirely. Replace analytics with Apple's own privacy-preserving tools (SKAdNetwork, app install validation via your own server). For ads, use only Apple Advertising or a contextual provider explicitly approved for Kids Category.
- **Example rejection:** "Your app is in the Kids category and integrates a third-party advertising SDK that collects user data. Third-party advertising and analytics that collect user information are not permitted in Kids category apps."

---

### No Behavioral Advertising  ·  Guideline 1.3 / 5.1.4  ·  REJECTION
- **What to check:** Even if an ad network claims COPPA compliance, serving ads targeted on behavioral or interest data to an audience that includes children under 13 is prohibited. Interest-based targeting, retargeting, and lookalike audiences are all disqualifying.
- **How to detect:** Review the ad network integration configuration. Look for targeting parameters, audience segmentation calls, or consent-management SDKs that conditionally enable tracking. Use `asc_get_age_rating` to confirm the Kids Category designation is set.
- **Resolution:** Switch to strictly contextual ads (keyed only on app content or placement, no user identifiers). Obtain written confirmation from the ad provider that the integration is COPPA-compliant and does not pass behavioral signals.
- **Example rejection:** "Your app serves interest-based or behavioral advertisements. Apps in the Kids category may only display contextual advertisements and may not use advertising that targets users based on personal data or browsing behavior."

---

### Parental Gate Before External Links  ·  Guideline 1.3  ·  REJECTION
- **What to check:** Any link or mechanism that takes a child outside the app (to a website, another app, a social network, email, phone) must be gated behind a parental gate — a challenge that requires adult-level reasoning to pass (not a simple tap-to-confirm).
- **How to detect:** Manually navigate all screens in the review build looking for tappable URLs, "Share" actions, "Rate Us" prompts, social media links, and "Visit our website" buttons. Confirm each triggers a parental gate challenge before opening.
- **Resolution:** Implement a parental gate using a math problem, a text-entry question, or a similar cognitive challenge that a young child is unlikely to solve. Simple "Are you an adult? Tap Yes" dialogs do not satisfy Apple's standard.
- **Example rejection:** "Your app contains links that take users outside the app but does not implement a parental gate prior to displaying these links, as required for apps in the Kids category."

---

### Parental Gate Before Account Creation and Personal Info Collection  ·  Guideline 1.3 / 5.1.4  ·  REJECTION
- **What to check:** If the app allows or requires account creation, or collects any personal information (name, email, photo, location), a parental gate must precede those flows. This is in addition to COPPA verifiable parental consent where required by law.
- **How to detect:** Walk the onboarding and registration flows. Confirm a parental gate challenge appears before any form requesting personal data. Use `asc_get_privacy` to verify data collection labels match what the app actually collects.
- **Resolution:** Gate the account creation and profile-setup flows. Where COPPA applies (U.S. users under 13), implement verifiable parental consent (VPC) via an approved method (e.g., email to parent, credit card micro-charge, knowledge-based authentication).
- **Example rejection:** "Your app collects personal information from users without first displaying a parental gate, as required for apps in the Kids category."

---

### No Purchases Without Parental Gate  ·  Guideline 1.3  ·  REJECTION
- **What to check:** IAP and subscription flows in Kids Category apps must be preceded by a parental gate. The standard StoreKit authentication prompt (Face ID / Touch ID / password) is not sufficient — a parental gate must appear before the StoreKit sheet is invoked.
- **How to detect:** Navigate to any IAP or subscription purchase point in the review build. Confirm a parental gate challenge appears before `SKPaymentQueue.add(_:)` or `Product.purchase()` is called.
- **Resolution:** Trigger your parental gate before initiating any StoreKit purchase. Only if the gate is passed should the StoreKit payment sheet be presented.
- **Example rejection:** "Your app offers in-app purchases without first displaying a parental gate. Apps in the Kids category must include a parental gate prior to any purchase flow."

---

### COPPA and Children's Privacy — No PII Collection Without Consent  ·  Guideline 5.1.4  ·  REJECTION
- **What to check:** The app must not collect, transmit, or store personally identifiable information (PII) from children without verifiable parental consent. PII includes: full name, email, phone, photo, precise location, device identifiers tied to the child, and any data that could be used to identify or contact a child.
- **How to detect:** Use `asc_get_privacy` to audit declared data types. grep source for calls to `CLLocationManager`, camera/photo library access, `identifierForVendor`, or any form input saving to a remote server. Confirm that privacy labels match actual data flows.
- **Resolution:** Minimize data collection to what is strictly necessary. Obtain and record verifiable parental consent before collecting any PII. Do not use device advertising identifiers. Anonymize analytics. Update privacy labels to accurately reflect what is collected.
- **Example rejection:** "Your app collects personal information, including precise location data, from users in the Kids category without implementing verifiable parental consent as required by Guideline 5.1.4 and applicable law."

---

### Age Rating Must Reflect Kids Category Placement  ·  Guideline 1.3 / Rating  ·  WARNING
- **What to check:** Apps in the Kids Category must be rated 4+, 6+, or 9+ (the three Kids subcategories). A 12+ or 17+ rating is incompatible with Kids Category placement. Age rating must not contain flags for mature themes, violence, or sexual content.
- **How to detect:** Use `asc_get_age_rating` to retrieve the current rating and questionnaire responses. Verify the primary and secondary category in `asc_get_metadata` includes a Kids subcategory.
- **Resolution:** Ensure all content in the app is appropriate for the selected age band. If the app contains content suitable only for older users, it does not belong in the Kids Category.
- **Example rejection:** "Your app is categorized under the Kids category but has an age rating that is not compatible with that category. Apps in the Kids category must be rated 4+, 6+, or 9+."

---

### No Links Out of App Without Parental Gate (Catch-All)  ·  Guideline 1.3  ·  REJECTION
- **What to check:** This covers any path not covered by the External Links rule above: deep links, universal links from push notifications, in-app browsers opened via user interaction, and share sheets that could expose the child to external content.
- **How to detect:** Audit all `UIApplication.open(_:)`, `SFSafariViewController`, and `WKWebView` call sites in source. Review push notification tap handlers. Confirm each external-navigation path is gated.
- **Resolution:** Wrap every navigation-out-of-app code path with a parental gate check. Disable or suppress Share Sheet options (AirDrop, social sharing) or gate them.
- **Example rejection:** "Your app allows users to navigate to external websites or content via in-app links or push notifications without passing a parental gate, which is required for apps in the Kids category."
