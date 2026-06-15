# Preflight Rules — Design & Functionality

---

### App Crashes or Bugs on Review  ·  Guideline 2.1  ·  REJECTION
- **What to check:** The app must be stable on all devices and OS versions declared in the submission. Crashes at launch, during core flows, or on specific device classes (iPhone vs iPad, older hardware) are the most common single cause of rejection.
- **How to detect:** `asc_check_submission` for any pre-submission validation warnings. Run the app on the oldest supported OS (check `MinimumOSVersion` in `Info.plist`) using a physical device or Simulator. Review crash logs from TestFlight via `asc_list_beta_feedback`. Cross-ref `performance-instruments` for profiling steps.
- **Resolution:** Fix all crashes and major bugs before submission. Pay special attention to edge cases reviewers will hit: fresh install on a clean account, low-memory conditions, and background-to-foreground transitions.
- **Example rejection:** "We discovered a crash when we tapped the 'Sign Up' button on an iPhone 14 running iOS 17. Please resolve the crash and resubmit."

---

### Broken Links or Placeholder Content in App  ·  Guideline 2.1  ·  REJECTION
- **What to check:** All in-app links (support, help, social, legal), embedded webviews, and displayed content must be live and functional at review time. Placeholder copy, dummy images, or hardcoded "example.com" links fail review.
- **How to detect:** Manual walkthrough of every navigable screen. Tap every outbound link. Inspect embedded webviews for connectivity to a live server. Grep source for "example.com", "TODO", "placeholder", "dummy".
- **Resolution:** Replace all placeholder content with final production content. Ensure backend endpoints referenced by the app are live and accessible from Apple's review network (not behind a VPN or IP allow-list without a workaround for review).
- **Example rejection:** "When we tapped the 'Help' link, it led to a page that returned a 404 error. All links within the app must be functional."

---

### Login Wall with No Reviewer Path  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If the app requires login before showing any functionality, reviewers must be provided with working demo credentials. Apps that show only a login screen with no guest mode and no working credentials are rejected on first review.
- **How to detect:** Fresh-install the app and confirm the very first user-facing screen is reachable without an account, or that `reviewInformation.demoAccountName` / `demoAccountPassword` are present and valid in `asc_check_submission`. Cross-ref `rule-metadata.md` → Missing Demo Account Credentials.
- **Resolution:** Provide demo credentials in App Review Information, or add a guest/browse mode that allows reviewers to see core functionality without creating an account.
- **Example rejection:** "We were unable to evaluate your app because it requires a login and no demo account was provided. Please add demo account credentials in App Review Information."

---

### Minimum Functionality / Too Simple  ·  Guideline 4.2  ·  REJECTION
- **What to check:** The app must provide a meaningful, lasting user experience. Apps that are effectively a single static screen, a countdown timer with no other features, or a simple wrapper around a single webpage do not meet the minimum functionality bar.
- **How to detect:** Count distinct, purposeful user interactions and screens. If the entire app can be fully experienced in under 30 seconds with one tap, it likely fails 4.2. Compare the stated description with actual app features.
- **Resolution:** Add substantive features, content, or interactivity. If the concept is inherently simple, consider distributing it as a widget, App Clip, or iMessage extension instead of a standalone app.
- **Example rejection:** "Your app provides limited functionality and does not offer enough lasting value to remain on the App Store. We encourage you to expand the app's feature set before resubmitting."

---

### Web Wrapper / Pure Webview App  ·  Guideline 4.2  ·  REJECTION
- **What to check:** Apps that are primarily a WKWebView or SFSafariViewController pointed at a website with no native UI, offline capability, or value-add beyond the mobile browser experience are rejected as web wrappers.
- **How to detect:** Review main view controllers — if `UIViewController` hierarchy is dominated by a single `WKWebView` filling the screen and loading a remote URL with no native chrome beyond a back button, it is a web wrapper. Check `AppDelegate` / `SceneDelegate` for any native screen construction.
- **Resolution:** Add native UI, offline content, device integration (notifications, widgets, Siri, etc.), or a curated native UX layer. Alternatively, consider App Clips for lightweight web-enhanced experiences, or direct users to your website via Safari.
- **Example rejection:** "Your app appears to be a simple web view of your website and does not provide the native iOS experience users expect from an App Store app."

---

### Sign-In Required for Features That Don't Need an Account  ·  Guideline 5.1.1(i)  ·  REJECTION
- **What to check:** Users must be able to access the app's core features without being forced to create an account if account functionality is not intrinsic to the service. Forcing sign-up to view a read-only content feed or use a non-personalised feature violates minimum functionality and privacy rules simultaneously.
- **How to detect:** Fresh-install walkthrough: can the user reach any meaningful functionality without creating an account or logging in? If every entry point routes to an account gate, this is a violation.
- **Resolution:** Implement a guest or browse mode for features that do not require server-side personalisation or data sync. Defer sign-in to the moment it is genuinely required (e.g., saving progress, syncing, purchasing).
- **Example rejection:** "Your app requires users to register or log in before they are able to access any content or features. Apps should not require user registration prior to allowing access to app content and features that do not require a personal account."

---

### Spam / Duplicate of Your Own App  ·  Guideline 4.3  ·  REJECTION
- **What to check:** Submitting multiple apps with the same or very similar functionality, or apps that differ only in minor cosmetic details (different colour scheme, different language for the same content), is treated as spam and all versions may be removed.
- **How to detect:** Search your own developer account (or `asc_list_apps`) for existing apps with overlapping feature sets. Identify if the new submission is substantively different in functionality, target audience, or content.
- **Resolution:** Consolidate functionality into a single app using in-app features, localisation, or conditional logic. If differentiation is genuine, document it clearly in App Review Notes.
- **Example rejection:** "Your app appears to be a duplicate of another app in your account. Please review guideline 4.3 and consolidate your apps or differentiate them with unique content or functionality."

---

### Copycat UI or Intellectual Property Infringement  ·  Guideline 4.1  ·  REJECTION
- **What to check:** The app must not replicate the UI, name, icon, or branding of another well-known app in a way that could mislead users or infringe trademarks/copyrights. This includes clone apps of Apple's built-in apps.
- **How to detect:** Visual review of icon, app name, and core UI patterns. Legal review if the design closely resembles a third-party app. `asc_get_metadata` → `name` — search App Store for similar names.
- **Resolution:** Redesign UI elements, rename the app, and ensure the icon is original. If using open-source UI components, verify licences permit App Store distribution.
- **Example rejection:** "Your app's icon and name are confusingly similar to an existing App Store app. Please update your app's branding to differentiate it."

---

### Hidden or Undocumented Features  ·  Guideline 2.3.1  ·  REJECTION
- **What to check:** All features in the binary must be disclosed in the app description and to the reviewer. Features hidden behind server flags that are invisible to reviewers but visible to end users post-approval ("bait and switch") result in removal and potential developer account action.
- **How to detect:** Diff the feature set accessible with the review account versus a normal user account. Identify any runtime checks that disable features when running on Apple's review network (IP-based or account-based gating of features).
- **Resolution:** Either include all features in the review build or explicitly document feature-flag differences in App Review Notes. Never hide features from reviewers that will be shown to users.
- **Example rejection:** "Your app appears to have features that were not available to us during review. Please ensure all app functionality is accessible to App Review and described in your metadata."

---

### Uses Private or Undocumented APIs  ·  Guideline 2.5.1  ·  REJECTION
- **What to check:** Any use of private Apple frameworks, undocumented selectors, or reverse-engineered APIs results in automatic rejection and may trigger static analysis at upload time (ITMS error at binary validation).
- **How to detect:** `asc_check_submission` catches some violations at upload. Static analysis: `nm -gU <binary>` or `otool -ov` to inspect symbol references. Search for known private API names (`UIApplication._sendAction`, `SpringBoard`, `_UIAlertManager`, etc.).
- **Resolution:** Replace all private API usage with supported public equivalents. If no public API exists, the feature must be removed.
- **Example rejection:** "Your app uses the private API _UIConstraintBasedLayoutPlaySoundForceAutolayoutTrace which is not permitted on the App Store."

---

### Placeholder Push Notifications or Non-Working Features  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If the app requests push notification permission, push must be wired to a real backend. Requesting permission and never sending a notification, or sending only hardcoded local notifications without server-side triggers, when the metadata implies a real notification system, is flagged during review.
- **How to detect:** Manual test: grant push permission in review flow and verify that the stated notification use case functions. Check APNs certificate/key configuration in `asc_check_submission`. Confirm server-side push infrastructure is live.
- **Resolution:** Ensure push is fully operational end-to-end before submission. If push is not yet implemented, remove the permission request until it is. Cross-ref `asc-build-check` for APNs capability verification.
- **Example rejection:** "Your app requests permission to send push notifications, but we did not receive any notifications during our review. Please ensure push notifications are working correctly before resubmitting."

---

> Cross-ref: `asc-build-check` for binary validation and build inspection; `performance-instruments` for profiling crashes and performance issues.
