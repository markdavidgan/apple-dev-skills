# Preflight Pack — Crypto & Finance Apps

---

### Crypto Exchange / Wallet — Licensed Entity Only  ·  Guideline 3.1.5(ii)  ·  REJECTION
- **What to check:** Apps that facilitate the exchange, purchase, or custody of cryptocurrency must be submitted by the institution or licensed entity that operates the service. Third-party clients or aggregators are not permitted without the owning institution as the developer of record.
- **How to detect:** Use `asc_get_metadata` to compare the developer name against the service name. If the app name references a well-known exchange but the developer is a different entity, flag it. Check App Review notes for prior approval status. Confirm the app's privacy policy and ToS identify a licensed operator.
- **Resolution:** Ensure the exchange or custodial wallet service is the registered Apple Developer account holder submitting the app. Third-party frontends must be consolidated under the primary entity's account. Document licensing credentials in the App Review Information notes.
- **Example rejection:** "Your app provides cryptocurrency exchange services but does not appear to be submitted by a licensed financial institution or the entity that operates the service."

---

### No On-Device Crypto Mining  ·  Guideline 3.1.5(ii)  ·  REJECTION
- **What to check:** Apps may not mine cryptocurrency on the device. This includes background mining, mining in response to user actions, or delegating mining work to the device's CPU/GPU on behalf of a pool.
- **How to detect:** Inspect the binary for known mining library symbols (e.g., references to `xmrig`, `cryptonight`, `stratum+tcp://` connection strings). Review network entitlements and background mode declarations in `asc_check_submission` for signs of persistent network work consistent with pool communication. Profile the app for sustained CPU activity with no UI interaction.
- **Resolution:** Remove all mining code. If the app is a mining pool dashboard (display only), ensure it performs zero computation and clearly states it monitors an external miner rather than performing work on-device.
- **Example rejection:** "Your app mines cryptocurrency on the user's device, which is not permitted under App Store Review Guideline 3.1.5(ii)."

---

### ICO / Futures / Derivatives — Licensing per Region  ·  Guideline 3.1.5(ii) / 5.3  ·  REJECTION
- **What to check:** Apps offering initial coin offerings, token sales, crypto futures, options, or leveraged products require regulatory licensing in every jurisdiction where the app is available. The app must geo-restrict to only licensed regions.
- **How to detect:** Use `asc_get_metadata` to review the territory availability list. Cross-reference against the developer's disclosed jurisdictional licenses in the App Review notes. Flag any app that is available in major markets (US, EU, UK) without documented licensing for those regions. Use `asc_check_submission` for prior Apple communications on this topic.
- **Resolution:** Restrict availability in App Store Connect to only those territories where the operator holds a valid license. Implement server-side geo-blocking as an additional layer. Submit documentation of all applicable licenses (FINRA, FCA, MAS, etc.) in the App Review Information notes.
- **Example rejection:** "Your app offers financial derivatives or token sales and is available in regions where you have not demonstrated the required regulatory licensing."

---

### Banking / Financial Services — Legitimate Institution  ·  Guideline 3.2.1  ·  REJECTION
- **What to check:** Apps that act as banking or payment services (account management, fund transfer, card issuance) must be submitted by or on behalf of a regulated financial institution. The developer must be the bank, credit union, payment processor, or a licensed agent thereof.
- **How to detect:** Use `asc_get_metadata` to verify the developer name and organization match a licensed institution. Review the app's Terms of Service for a licensed entity. Check whether the app links to a chartered bank or FDIC/equivalent member. Use `asc_get_privacy` to confirm appropriate financial data disclosures.
- **Resolution:** The licensed institution must be the Apple Developer account holder or must explicitly authorize a contracted agent in writing (provide this in App Review notes). Include a direct reference to the regulatory body and license number in the app's legal disclosures.
- **Example rejection:** "Your app provides banking or financial account management services but is not submitted by a licensed financial institution or its authorized agent."

---

### No Unlicensed Money Transmission  ·  Guideline 3.2.1 / 5.3  ·  REJECTION
- **What to check:** Apps that move money between users (P2P transfers, remittance, crowdfunding with disbursements) must hold or partner with a licensed money transmitter in each operating jurisdiction. Unlicensed money movement is prohibited.
- **How to detect:** Identify P2P transfer flows in the app. Use `asc_get_metadata` to check category and description for payment/transfer language. Verify the privacy policy and legal footer name a licensed money transmitter. Confirm the developer's App Review notes document licensing or a formal partnership with a licensed partner (e.g., Stripe, Marqeta, a state-licensed MTB).
- **Resolution:** Partner with a licensed money transmitter and disclose the relationship. Alternatively, route all transfers through an Apple-native mechanism (Apple Pay, StoreKit). Document MTB licenses by state/country in App Review notes and restrict availability to licensed jurisdictions only.
- **Example rejection:** "Your app facilitates the transfer of funds between users without demonstrating the required money transmission licensing in the regions where the app is available."

---

### Regulatory Disclosures In-App  ·  Guideline 3.2.1 / 5.1.1  ·  WARNING
- **What to check:** Finance and crypto apps must surface required regulatory disclosures within the app: investment risk warnings, "not FDIC insured" notices where applicable, crypto volatility disclaimers, and relevant jurisdiction-specific mandatory disclosures.
- **How to detect:** Manual review — launch the app and navigate to account creation and any investment/trade screen. Verify risk disclosures appear before the user commits funds. Use `asc_get_metadata` to confirm the app description does not make unqualified return or performance promises.
- **Resolution:** Add a risk disclosure modal during onboarding and an inline disclaimer near any trade or investment action ("Cryptocurrency is highly volatile and you may lose your investment"). Remove any guaranteed-return language from metadata and in-app copy.
- **Example rejection:** "Your app offers investment or financial products but does not include required risk disclosures within the app experience."

---

### Demo / Test Account for Reviewer  ·  Guideline 2.1 / 3.1.5  ·  REJECTION
- **What to check:** Financial and crypto apps that require real funds, KYC identity verification, or banking credentials to review must provide Apple with a demo account or sandbox mode that allows the reviewer to evaluate all features without committing real money or completing identity checks.
- **How to detect:** Walk through the submission checklist in `asc_check_submission`. Verify that demo credentials are populated in the App Review Information > Demo Account field. Test that the demo account exposes all purchasable/tradable features in a simulated or paper-trading mode.
- **Resolution:** Implement a sandbox/paper-trading mode toggled by the demo credentials. Pre-fund the demo account with virtual currency. Bypass KYC for accounts flagged as reviewer accounts server-side. Document the demo mode in the App Review notes explaining what the reviewer can do.
- **Example rejection:** "We were unable to review your app because it requires financial account credentials or real-money transactions to access its features. Please provide a demo account in the App Review Information section."

---

**Cross-references:** `rule-entitlements.md` (entitlements for finance-category apps), `rule-metadata.md` (metadata compliance for financial claims).
