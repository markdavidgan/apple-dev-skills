# Preflight Pack — All Apps (Baseline Triage)

This is the always-load index pack. Run through this checklist for every submission regardless of app type, then open the deeper type-specific packs as needed.

---

## Deeper Packs — Open These as Applicable

| Pack | When to open |
|------|-------------|
| `rule-metadata.md` | Name, subtitle, keywords, screenshots, descriptions |
| `rule-privacy.md` | Privacy policy, data collection labels, tracking |
| `rule-subscription.md` | Any auto-renewable subscription or IAP |
| `rule-design.md` | UI/UX, hardware API usage, web views |
| `rule-entitlements.md` | Capabilities, push, HealthKit, Sign in with Apple |
| `type-subscription-iap.md` | Paywall, free trial, external payment steering |
| `type-social-ugc.md` | User-generated content, social features |
| `type-kids.md` | Kids Category or audience under 13 |
| `type-health-fitness.md` | Medical claims, HealthKit, research features |

---

## Cross-Cutting Baseline Rules

### Demo Account Present  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If your app requires login, a valid demo username and password must be included in the App Review notes field.
- **How to detect:** Use `asc_check_submission` to inspect the review notes field. Verify the credentials actually work in a fresh session against your staging/production environment.
- **Resolution:** Add demo credentials in App Review Information. If login is unavailable during review (e.g., enterprise SSO), explain the authentication flow in notes and provide a demo video.
- **Example rejection:** "We were unable to review your app because it requires a login, and no demo account credentials were provided in the App Review Information section."

---

### Account Deletion  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Any app that allows account creation must also allow account deletion from within the app. Deletion must be permanent (not just deactivation), and any linked data must be purged per your privacy policy.
- **How to detect:** Manually navigate to account/profile settings. Use `asc_get_privacy` to confirm deletion is declared. grep app source for "deleteAccount" / "deactivate" to confirm distinction.
- **Resolution:** Implement a clearly labeled "Delete Account" option in-app. Ensure backend purges or schedules purge of personal data. Link to a web-based deletion flow only as a supplement, not a replacement.
- **Example rejection:** "Your app allows users to create an account but does not provide the ability to initiate deletion of their account directly within the app."

---

### Privacy Policy Reachable  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** A privacy policy URL must be set in App Store Connect and must be accessible without login at review time. The URL must point to a policy covering this specific app (not a generic corporate page that omits the app).
- **How to detect:** Use `asc_get_privacy` to retrieve the stored URL. Curl or visit the URL to confirm it returns HTTP 200 and is not behind auth.
- **Resolution:** Host the policy on a stable URL (not localhost, not a Notion draft, not a redirect that breaks). Update the policy to name the app explicitly if needed.
- **Example rejection:** "Your app's privacy policy URL is not functional. The URL must be accessible and must specifically describe how user data is handled within your app."

---

### Screenshots Current  ·  Guideline 2.3.10  ·  REJECTION
- **What to check:** Screenshots must accurately reflect the current build's UI. Screenshots showing features not present in the binary, or showing a significantly different UI, are grounds for rejection.
- **How to detect:** Use `asc_get_metadata` to pull current screenshot set. Compare visually against the app binary being submitted.
- **Resolution:** Retake screenshots from the current build. Ensure all required device sizes are covered (6.9" and 6.5" for iPhone; 13" and 12.9" for iPad if the app supports iPad).
- **Example rejection:** "Your app's screenshots do not sufficiently reflect the app in use. Screenshots must show the app's actual UI and must not include content that misleads users about the app's core experience."

---

### Crash-Free on Launch  ·  Guideline 2.1  ·  REJECTION
- **What to check:** The app must launch and remain stable on supported OS versions and device types. Crashes during basic reviewer flow are the most common 2.1 rejection.
- **How to detect:** Use `asc_check_submission` to review any existing crash metadata. Run the binary on minimum-deployment-target device/simulator. Check TestFlight crash feedback via `asc_list_beta_feedback` before promoting to review.
- **Resolution:** Fix crashes before submission. If a device-specific crash is suspected, note supported devices in review notes. Attach a demo video if the reviewer flow is non-obvious.
- **Example rejection:** "We discovered one or more bugs in your app. Specifically, the app crashed when launched on [device] running [OS version]."

---

### Support URL Works  ·  Guideline 1.5  ·  WARNING
- **What to check:** The support URL in App Store Connect must be live and relevant. A broken URL or a URL pointing to a generic homepage without app-specific support options may flag a metadata warning or, in stricter reviews, a rejection.
- **How to detect:** Use `asc_get_metadata` to retrieve the stored support URL. Visit it to confirm HTTP 200 and relevance.
- **Resolution:** Use a dedicated support page or a help-desk URL (e.g., Zendesk, Intercom, a /support path). The page must include a way for users to contact support.
- **Example rejection:** "The support URL you provided does not appear to offer support for your app. Please update it to a URL that provides users with a way to get help."
