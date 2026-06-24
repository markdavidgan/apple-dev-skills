# Preflight Rules — Entitlements & Compliance

---

### Sign In with Apple Required When Third-Party Social Login Is Offered  ·  Guideline 4.8  ·  REJECTION
- **What to check:** If your app offers any third-party social or federated sign-in (Google, Facebook, Twitter/X, GitHub, etc.) as an authentication option, you must also offer Sign in with Apple as an equivalent alternative. This applies to all apps — not just those that exclusively use third-party login. Exemptions exist for government, enterprise, and education apps that use specific credentialing systems, and for apps where the login is only for accessing non-personal accounts (e.g., business system credentials).
- **How to detect:** Review all authentication entry points. If `ASAuthorizationAppleIDProvider` is not present in the codebase alongside any third-party OAuth SDK (GoogleSignIn, FacebookLogin, etc.), the requirement is unmet. `asc_get_metadata` → `reviewNotes` should describe available sign-in options.
- **Resolution:** Integrate `AuthenticationServices` framework and `ASAuthorizationAppleIDButton`. Handle `ASAuthorizationAppleIDCredential` for both initial sign-in and credential-state verification on subsequent launches. Ensure the Sign in with Apple button is visually equivalent in prominence to other sign-in options.
- **Example rejection:** "Your app offers Sign in with Google but does not offer Sign in with Apple. Apps that offer third-party authentication must also offer Sign in with Apple."

---

### In-App Account Deletion Mandatory  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Any app that allows users to create an account must provide a clearly discoverable, in-app mechanism to fully delete that account and its associated data. Deactivation, suspension, or "contact support to delete" flows are not sufficient. The deletion must be initiatable from within the app without requiring a browser redirect or email request.
- **How to detect:** Navigate to Settings / Profile / Account in the app and confirm a "Delete Account" option exists and initiates deletion. Verify that Sign in with Apple token revocation (`ASAuthorizationAppleIDProvider.revokeToken`) is called for Apple-ID-based accounts. Cross-ref `rule-privacy.md` → Account Deletion rule.
- **Resolution:** Implement an in-app delete account flow. For Sign in with Apple accounts, call the token revocation API. Ensure deletion purges or schedules purge of all user-generated data per applicable privacy laws. Document the path in App Review Notes if it is non-obvious.
- **Example rejection:** "Your app allows users to create an account but does not offer a way to delete the account from within the app. Please add in-app account deletion."

---

### Export Compliance / Encryption Declaration  ·  Guideline 2.5 / US Export Law  ·  REJECTION
- **What to check:** Every app that uses any encryption — including HTTPS/TLS, secure storage, or third-party SDKs that use encryption — must make an accurate export compliance declaration. If `ITSAppUsesNonExemptEncryption` is `YES` in `Info.plist` or in App Store Connect, a valid ERN (Encryption Registration Number) or equivalent exemption documentation is required.
- **How to detect:** Check `Info.plist` for `ITSAppUsesNonExemptEncryption`. Use `asc_set_encryption` (or the equivalent submission API) to declare compliance status. Most apps qualify for the standard exemption (uses only HTTPS and Apple-framework encryption) and should set `ITSAppUsesNonExemptEncryption` to `NO`. Confirm with legal counsel if your app implements custom cryptographic algorithms.
- **Resolution:** Set `ITSAppUsesNonExemptEncryption` to `NO` in `Info.plist` if the app uses only standard encryption (HTTPS via `URLSession`, Apple `CryptoKit`, `Security.framework`, etc.). If non-exempt encryption is used, obtain an ERN from the US Bureau of Industry and Security and upload documentation in App Store Connect before submission.
- **Example rejection:** "Your app uses encryption but has not provided an export compliance declaration. Please select the appropriate export compliance option in App Store Connect."

---

### Entitlements Requested but Unused or Unjustified  ·  Guideline 2.5.x  ·  REJECTION
- **What to check:** Every entitlement in the `.entitlements` file and every capability enabled in the provisioning profile must correspond to an active, reviewer-visible feature in the app. Unused entitlements (e.g., `com.apple.developer.healthkit` in a calculator app) trigger rejection.
- **How to detect:** `codesign -d --entitlements :- <app.ipa>` to list all entitlements. Cross-reference against actual feature usage in code. Common offenders: HealthKit, HomeKit, Associated Domains, Push Notifications, Background Modes when the corresponding feature is stubbed or removed.
- **Resolution:** Remove entitlements and capabilities that are not actively used. For any entitlement that requires usage justification (e.g., HealthKit clinical records, Network Extensions), document the feature in App Review Notes.
- **Example rejection:** "Your app includes the HealthKit entitlement but does not appear to use HealthKit functionality. Please remove unused entitlements from your app."

---

### Background Modes Misuse  ·  Guideline 2.5.4  ·  REJECTION
- **What to check:** Background mode declarations in `Info.plist` (`UIBackgroundModes`) must only be present if the app actively uses them for their declared purpose. Declaring `audio` to prevent suspension without playing meaningful background audio, or declaring `location` for always-on location without a user-facing reason, is a violation.
- **How to detect:** Inspect `Info.plist` → `UIBackgroundModes`. For each declared mode, verify a corresponding real feature exists: `audio` → active audio playback API; `location` → continuous location tracking with explicit user benefit; `fetch` → actual background fetch logic in `application(_:performFetchWithCompletionHandler:)` or `BGAppRefreshTask`.
- **Resolution:** Remove background modes that do not correspond to active features. For legitimate always-on location use, ensure `NSLocationAlwaysAndWhenInUseUsageDescription` is set and the user-facing benefit is clear. Document in App Review Notes.
- **Example rejection:** "Your app declares the audio background mode but does not appear to play audio in the background. Background modes must be used only for their declared purpose."

---

### Entitlement / Capability Mismatch with Functionality  ·  Guideline 2.5.x  ·  REJECTION
- **What to check:** The capabilities enabled in Xcode (and thus in the provisioning profile) must match the entitlements in the signed binary and the features actually present in the app. A mismatch — e.g., Associated Domains enabled but no `apple-app-site-association` on the server, or Sign in with Apple entitlement present but the feature is not implemented — causes build validation failures or rejections.
- **How to detect:** `asc_check_submission` surfaces binary validation errors at upload time. Manually verify: for Associated Domains, that `apple-app-site-association` is reachable at `https://<domain>/.well-known/apple-app-site-association`; for Push Notifications, that the APNs certificate matches the bundle ID; for Sign in with Apple, that the entitlement matches the App ID configuration.
- **Resolution:** Synchronise entitlements, provisioning profile capabilities, App ID configuration in the Apple Developer portal, and actual in-app feature usage. Re-export the archive after any capability change.
- **Example rejection:** "The app has the Associated Domains entitlement enabled, but we could not find a valid apple-app-site-association file at the domain specified. Please ensure your server is correctly configured."

---

### Data-Collection Consent for Sign-In  ·  Guideline 5.1.1  ·  WARNING
- **What to check:** When using Sign in with Apple or any other federated identity provider, any profile data received (name, email) that is stored server-side or used for analytics must be declared in the App Privacy nutrition label and handled in accordance with the stated privacy policy.
- **How to detect:** `asc_get_privacy` → check that "Name" and "Email Address" are declared if collected at sign-in. Verify that the privacy policy covers identity data received from Apple or other providers. Confirm the app does not silently share identity data with third parties.
- **Resolution:** Update the App Privacy label to include any identity data collected during sign-in. Ensure the privacy policy describes how sign-in data is stored, used, and can be deleted (per the account deletion rule above). Cross-ref `rule-privacy.md`.
- **Example rejection:** "Your app collects email addresses at sign-in but this data type is not declared in your App Privacy responses. Please update your privacy information to reflect all data collected."

---

> Cross-ref: `privacy-manifest` for PrivacyInfo.xcprivacy, required-reason APIs, and ITMS-91053/91061; `asc-submission` for the full submission checklist including encryption and export compliance steps.
