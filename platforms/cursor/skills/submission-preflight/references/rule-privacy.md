# Preflight Rules — Privacy

---

### Missing or Unreachable Privacy Policy URL  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** All apps must link to a publicly accessible privacy policy. The URL must load without login, without a 404, and must clearly describe data collection/use. Apps targeting children (Kids category or age rating 4+) have stricter requirements.
- **How to detect:** `asc_get_metadata` → `privacyPolicyUrl`. Verify it resolves to a real, crawlable page (not gated, not parking, not localhost). Manually confirm the policy text is substantive — not a placeholder.
- **Resolution:** Host a complete privacy policy and enter the URL in App Store Connect. For Kids category apps, ensure the policy complies with COPPA and CCPA requirements.
- **Example rejection:** "Your app does not include a privacy policy URL. All apps must provide a link to a privacy policy on the App Store and within the app."

---

### App Privacy Nutrition Label Mismatch  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** The App Privacy questionnaire (Data Types collected, purposes, data-linked-to-user status) must exactly match what the app actually collects. Omitting a collected data type or mis-classifying purpose (e.g., marking analytics data as "not linked to user" when it is linked via fingerprinting) triggers rejection.
- **How to detect:** `asc_get_privacy` → compare declared data types and purposes against a code audit of analytics SDKs, crash reporters, advertising SDKs, and first-party collection points. Check SDK privacy manifests.
- **Resolution:** Update the nutrition label via App Store Connect → App Privacy, or audit and remove data collection that exceeds what's declared. Every third-party SDK that collects data must be reflected.
- **Example rejection:** "Your app collects email addresses for account creation, but this data type is not declared in your App Privacy responses. Please update your privacy information."

---

### Data Collected Before Consent  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** No personal data or device identifiers may be collected or transmitted before the user has seen and accepted the privacy policy and any required permission prompts. This includes analytics and crash data at cold launch.
- **How to detect:** Manual review / network traffic inspection (Charles Proxy or equivalent). Check that analytics SDKs are initialized after consent is granted, not at `application(_:didFinishLaunchingWithOptions:)` unconditionally.
- **Resolution:** Defer SDK initialization until after the user's consent flow completes. Use SDK-level opt-in APIs where available (e.g., Firebase `analyticsCollectionEnabled`).
- **Example rejection:** "Upon review, your app begins transmitting user data before any consent is obtained. Data collection must begin only after the user has given explicit consent."

---

### Missing ATT Prompt When Tracking / IDFA Is Used  ·  Guideline 5.1.2  ·  REJECTION
- **What to check:** Any use of `ASIdentifierManager.advertisingIdentifier` (IDFA) or cross-app/cross-website tracking must be preceded by an ATT prompt (`ATTrackingManager.requestTrackingAuthorization`). `NSUserTrackingUsageDescription` must be present in `Info.plist` with a meaningful description.
- **How to detect:** Grep source for `advertisingIdentifier`, `ATTrackingManager`, and any ad network SDKs (Meta Audience Network, Google AdMob, etc.). Confirm `NSUserTrackingUsageDescription` exists and is non-generic. Verify the prompt is shown before any IDFA access.
- **Resolution:** Add a well-worded `NSUserTrackingUsageDescription`. Present `requestTrackingAuthorization` before accessing the IDFA or initialising tracking-dependent SDKs. If tracking is not used, audit SDKs to confirm and remove IDFA access.
- **Example rejection:** "Your app uses the Advertising Identifier (IDFA) but does not include NSUserTrackingUsageDescription in its Info.plist. This key is required."

---

### Missing or Generic Purpose Strings  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** Every sensitive permission used must have a corresponding `NS*UsageDescription` key in `Info.plist` with a user-intelligible, specific explanation of why the app needs it. Generic strings like "This app requires access to your camera." are routinely rejected.
- **How to detect:** Grep `Info.plist` for `NSCameraUsageDescription`, `NSMicrophoneUsageDescription`, `NSLocationWhenInUseUsageDescription`, `NSContactsUsageDescription`, `NSPhotoLibraryUsageDescription`, etc. Validate each value is specific and truthful.
- **Resolution:** Rewrite each purpose string to name the concrete feature: "Used to scan QR codes on your boarding pass." Ensure every entitlement/capability used has a corresponding description.
- **Example rejection:** "Your app's NSCameraUsageDescription does not provide sufficient information about how the camera will be used. Please revise the purpose string to explain the specific use."

---

### Data Collected Beyond Core Function  ·  Guideline 5.1.1(i)  ·  REJECTION
- **What to check:** Apps may only request access to data that is necessary for the app's advertised core functionality. Requesting contacts for a flashlight app, or location for a tip calculator, are textbook violations.
- **How to detect:** Map each permission request to a documented user-facing feature. If no feature justifies the data, it should not be requested. `asc_get_privacy` can surface declared collection; cross-check with actual permission requests in code.
- **Resolution:** Remove the permission request, or add and document the feature that requires it.
- **Example rejection:** "Your app requests access to Contacts, but we were unable to identify a feature in the app that requires this data. Please remove the permission request or provide a clear explanation."

---

### Account Deletion Not Available for Account-Creating Apps  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Any app that allows users to create an account must provide an in-app mechanism to delete that account (not just deactivate it). The deletion flow must be easily discoverable — typically in account/profile settings.
- **How to detect:** Manual review: navigate to Settings / Profile and confirm a "Delete Account" option exists. Verify it initiates actual deletion (not just logout). `asc_get_metadata` → `reviewNotes` should document the path if it is non-obvious.
- **Resolution:** Implement an in-app account deletion flow that deletes all associated data or initiates a documented deletion request per applicable privacy regulations. Cross-ref `rule-entitlements.md` for Sign in with Apple deletion requirements.
- **Example rejection:** "Your app allows users to create an account but does not offer a way to delete the account from within the app. Please add an in-app account deletion option."

---

### Sign In with Apple Not Offered as Alternative  ·  Guideline 5.x  ·  REJECTION
- **What to check:** If the app exclusively requires login via a third-party social provider (Google, Facebook, etc.) with no alternative, it must also offer Sign in with Apple. See `rule-entitlements.md` for the complete sign-in rule.
- **How to detect:** Review all sign-in entry points. If any third-party social login is offered as the sole identity option, Sign in with Apple must be present. `asc_get_metadata` → `reviewNotes` should note the sign-in flows available.
- **Resolution:** Add Sign in with Apple as an equivalent login option alongside any third-party social sign-in. Cross-ref `rule-entitlements.md`.
- **Example rejection:** "Your app offers login via Facebook but does not offer Sign in with Apple. Apps that offer third-party social login must also offer Sign in with Apple."

---

> For `PrivacyInfo.xcprivacy`, required-reason APIs, ITMS-91053, and ITMS-91061 compliance, hand off to the `privacy-manifest` skill — those details are not duplicated here.
