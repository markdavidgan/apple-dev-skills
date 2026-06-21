# Preflight Rules — Metadata & Assets

---

### Inaccurate Screenshots  ·  Guideline 2.3.10  ·  REJECTION
- **What to check:** Every screenshot and App Preview must accurately represent the current build. Device frames, UI, and features shown must exist in the submitted binary at the same screen shown.
- **How to detect:** Pull current screenshots with `asc_get_metadata` and compare against the app as built. Look for screens from older versions, unreleased features, or mocked-up marketing composites.
- **Resolution:** Capture fresh screenshots directly from the submitted build (or the most recent build targeting that OS/device). Update via App Store Connect or `asc_update_metadata`.
- **Example rejection:** "Your screenshots do not sufficiently reflect the app in use. Screenshot 3 shows a feature not present in the submitted version."

---

### Non-App / Marketing-Only Screenshots  ·  Guideline 2.3.10  ·  REJECTION
- **What to check:** Screenshots must show the actual app UI, not lifestyle photography, pure marketing text overlays with no UI, or stock imagery that fills the frame with no in-app content visible.
- **How to detect:** Visual review of assets returned by `asc_get_metadata`. Any image where real app chrome is absent or cropped to invisibility is a violation.
- **Resolution:** Overlay marketing copy on a real screenshot background, or present pure in-app UI. Apple allows caption text on top of actual screens.
- **Example rejection:** "Your screenshots appear to show only marketing imagery without the app interface. Screenshots must accurately represent the content and functionality of your app."

---

### Placeholder / Lorem Ipsum Text  ·  Guideline 2.3.8  ·  REJECTION
- **What to check:** Description, subtitle, keywords, and What's New must contain real, final copy — no "lorem ipsum," filler text, or developer-facing notes.
- **How to detect:** `asc_get_metadata` → inspect `description`, `whatsNew`, `subtitle`. Grep for "lorem", "placeholder", "TBD", "coming soon".
- **Resolution:** Replace all placeholder copy with production content before submission.
- **Example rejection:** "Your app's description contains placeholder text. Please revise to accurately describe your app."

---

### Beta / Test / Coming Soon Language  ·  Guideline 2.2  ·  REJECTION
- **What to check:** No field (name, subtitle, description, What's New, screenshots, keywords) may contain "beta," "test," "demo," "coming soon," "early access," or equivalent language implying the app is not finished.
- **How to detect:** `asc_get_metadata` → string-search all text fields for these terms.
- **Resolution:** Remove or rephrase. If the feature genuinely isn't ready, remove it from the build.
- **Example rejection:** "Your app description states this is a beta version. Apps submitted to the App Store must be final versions."

---

### Competitor Platform / External Pricing Mentions  ·  Guideline 2.3.10 / 3.1.1  ·  REJECTION
- **What to check:** Metadata must not name Android, Google Play, or any competing platform. It must not reference prices in dollar amounts (use "free" or tier language only) or direct users to purchase outside the App Store.
- **How to detect:** `asc_get_metadata` → full-text scan of description and What's New for "Android," "Google Play," "Play Store," "$", "€", "buy on," "visit our website to subscribe."
- **Resolution:** Remove all such references. Pricing mentions belong only in IAP display prices managed via App Store Connect.
- **Example rejection:** "Your app description references purchasing options outside the App Store, which is not permitted."

---

### Wrong Primary Category  ·  Guideline 2.3.x  ·  WARNING
- **What to check:** The selected primary category must reflect the app's dominant use case. Miscategorized apps surface in wrong store charts, and reviewers may flag deliberate mis-selection as a metadata violation.
- **How to detect:** `asc_get_metadata` → `primaryCategory`. Compare against app functionality.
- **Resolution:** Update the category via App Store Connect before submission. Use the secondary category for secondary use cases.
- **Example rejection:** "Your app is categorized as Games but does not appear to offer game functionality as its primary purpose."

---

### Broken Support / Marketing URL  ·  Guideline 1.5  ·  REJECTION
- **What to check:** Support URL and marketing URL must load a real, publicly accessible page (no login wall, no 404, no domain-parking page) at submission time.
- **How to detect:** `asc_get_metadata` → retrieve `supportUrl` and `marketingUrl`. Fetch each with `curl -I` (or equivalent) and verify HTTP 200 with publicly readable content.
- **Resolution:** Fix or replace the URLs. Common causes: staging domain, expired domain, maintenance mode.
- **Example rejection:** "The Support URL you provided does not link to a functioning webpage. Please update with a valid URL."

---

### App Name / Subtitle Keyword Stuffing  ·  Guideline 2.3.7  ·  REJECTION
- **What to check:** App name and subtitle must not contain lists of keywords, repeated terms, or any text that functions as a keyword dump (e.g., "MyApp — Tracker, Planner, Journal, Habit, Reminder").
- **How to detect:** `asc_get_metadata` → inspect `name` and `subtitle` for comma-separated keyword lists, repetition, or generic category terms appended purely for search benefit. Cross-ref `asc-aso` skill for keyword strategy.
- **Resolution:** Rewrite to a clean, descriptive name and subtitle. Keywords belong in the Keywords field only.
- **Example rejection:** "Your app name includes excessive keywords. Please revise your app name to remove terms that are not part of your app's brand."

---

### Missing Demo Account Credentials  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If the app requires account creation or login to access any functionality, fully working demo credentials (username + password) must be provided in App Review Information.
- **How to detect:** `asc_check_submission` or `asc_get_metadata` → inspect `reviewInformation.demoAccountName` and `demoAccountPassword`. Also check `reviewNotes`.
- **Resolution:** Create a permanent, non-expiring sandbox account and enter credentials in App Review Information. Ensure the account is pre-populated with data if the app requires it.
- **Example rejection:** "We were unable to sign in using the demo account credentials provided. Please update your Review Notes with working login information."

---

### Empty / Inadequate App Review Notes for Gated Features  ·  Guideline 2.1  ·  REJECTION
- **What to check:** Any non-obvious feature, hardware requirement, server-side flag, or gated flow must be explained in App Review Notes so the reviewer can reach and test it.
- **How to detect:** `asc_check_submission` → `reviewInformation.reviewNotes`. Evaluate whether the notes cover: AR/location features, backend feature flags, required physical hardware, non-obvious navigation paths.
- **Resolution:** Add step-by-step instructions. Attach a review-only configuration or test environment URL if needed.
- **Example rejection:** "We were unable to locate the in-app purchase flow mentioned in your metadata. Please provide steps to access this feature in the App Review Notes."

---

### Age Rating Mismatch  ·  Guideline 2.3.6  ·  REJECTION
- **What to check:** The age rating questionnaire responses must match actual app content. Under-rating mature themes, violence, or user-generated content is a common cause of rejection or removal.
- **How to detect:** `asc_get_metadata` → `ageRatingDeclaration`. Compare each category (violence, sexual content, gambling, unrestricted web access, UGC) against the actual feature set in the build.
- **Resolution:** Re-complete the age rating questionnaire in App Store Connect accurately. If UGC is present, ensure moderation controls are in place to justify the selected rating.
- **Example rejection:** "Your age rating indicates no mature content, but the app contains user-generated content without moderation controls, which requires a minimum rating of 17+."

---

> Cross-ref: `asc-aso` for keyword and listing optimisation; `app-rejection-recovery` if already in a rejected state.
