# Preflight Pack — Social & UGC Apps

Deep pack for Guideline 1.2 (User-Generated Content). Open this for any app that lets users post text, images, video, audio, or other content visible to other users. Cross-reference: `rule-design.md`, `app-rejection-recovery`.

---

## The Four Required UGC Safeguards (Guideline 1.2)

Apple requires ALL FOUR of the following to be present and functional. Missing even one is grounds for rejection.

### Content Filtering for Objectionable Material  ·  Guideline 1.2  ·  REJECTION
- **What to check:** The app must have a mechanism to filter or moderate objectionable content before it is visible to other users. This can be automated (ML classifiers, hash-matching for CSAM) and/or human moderation, but must be documented and demonstrably active.
- **How to detect:** Manually attempt to post content containing profanity, hate speech indicators, or flagged image content. Verify the moderation pipeline intercepts it. Check review notes to confirm moderation approach is described. Use `asc_check_submission` to confirm review notes field is populated with moderation details.
- **Resolution:** Integrate a content moderation service (e.g., Apple's on-device text classifiers, a third-party API, or human review queue). Document the approach in App Review notes. Apple does not require perfection — they require a credible, active effort.
- **Example rejection:** "Your app allows users to generate or share user-generated content without sufficient mechanisms to filter or moderate objectionable material, which is not in compliance with Guideline 1.2."

---

### In-App Reporting and Flagging  ·  Guideline 1.2  ·  REJECTION
- **What to check:** Users must be able to report or flag content directly within the app. The reporting option must be accessible without leaving the content view (e.g., a long-press menu, a "..." overflow, or a dedicated report button).
- **How to detect:** Navigate to any piece of user-generated content in the review build. Confirm a report/flag action is reachable within two taps. Check that the report flow completes without error and provides user feedback.
- **Resolution:** Add a report action to every UGC surface (posts, comments, profiles, messages). The action must submit to a moderation queue and acknowledge receipt to the reporting user.
- **Example rejection:** "Your app contains user-generated content but does not provide users with a way to flag or report objectionable content within the app."

---

### User Blocking  ·  Guideline 1.2  ·  REJECTION
- **What to check:** Users must be able to block other users from contacting them or appearing in their feed/content views. Blocking must be persistent and must prevent further contact from the blocked account.
- **How to detect:** Create two test accounts. From account A, block account B. Verify that account B's content is suppressed and that account B cannot message account A. Confirm the block is retained across sessions.
- **Resolution:** Implement a block action accessible from user profiles and/or message threads. Store block relationships server-side so they persist across devices. Provide an unblock path via settings.
- **Example rejection:** "Your app does not provide users with the ability to block other users from contacting them or interacting with their content."

---

### Published Terms of Use with Zero-Tolerance and 24h Response Commitment  ·  Guideline 1.2  ·  REJECTION
- **What to check:** The app must display (or link to) Terms of Use / EULA that explicitly: (1) prohibit objectionable content, (2) state the developer will act on reported violations within 24 hours, and (3) warn that violations result in account removal.
- **How to detect:** Use `asc_get_metadata` to check EULA URL. Visit the linked terms and search for "24 hour," "objectionable," and "terminate." If terms are shown inline, grep source for these clauses.
- **Resolution:** Update your Terms of Use / Community Guidelines to include all three required clauses. Surface the link before or during account creation. Re-present terms when major updates are made.
- **Example rejection:** "Your app's Terms of Use do not include a statement that you will act on reports of objectionable content within 24 hours, or that users who repeatedly post such content will be removed."

---

## Additional UGC Rules

### Moderation Plan in Review Notes  ·  Guideline 1.2  ·  WARNING
- **What to check:** App Review reviewers cannot verify automated moderation by inspection alone. Without a written moderation plan in the review notes, expect a follow-up information request that delays approval.
- **How to detect:** Use `asc_check_submission` to read the current review notes. Confirm the notes describe: what moderation is used, what categories of content are filtered, escalation path for severe content (CSAM → NCMEC), and the 24h human review SLA.
- **Resolution:** Add a moderation section to App Review notes. Be specific: "We use [service] for automated image scanning and a human review queue with a 24-hour SLA. CSAM is reported to NCMEC per legal obligation."
- **Example rejection:** "Please provide information about your content moderation process, including how your app detects and removes objectionable user-generated content."

---

### Age Rating Reflects UGC Presence  ·  Guideline 1.2 / Rating  ·  WARNING
- **What to check:** Apps with unrestricted UGC must be rated 17+ for "Frequent/Intense" mature/suggestive themes because any user can post adult content. Ratings lower than 17+ for an unmoderated or weakly moderated UGC app will be corrected by Apple — or rejected.
- **How to detect:** Use `asc_get_age_rating` to retrieve the current rating and the answers to the rating questionnaire. Confirm "User Generated Content" toggle is set to the appropriate frequency.
- **Resolution:** Set the UGC questionnaire answer to "Frequent/Intense" unless your moderation guarantees content is kept within a lower tier. If moderation is robust and auditable, a lower rating may be defensible — document it in review notes.
- **Example rejection:** "Your app allows users to generate and share content with other users but is not rated 17+. Apps with user-generated content must be rated appropriately."

---

### Contact Information for Law Enforcement Reports  ·  Guideline 1.2  ·  WARNING
- **What to check:** The developer must provide contact information (email or web form) that law enforcement or Apple can use to report illegal UGC (CSAM, threats, etc.). This is typically in the privacy policy or a dedicated safety page.
- **How to detect:** Visit the privacy policy URL from `asc_get_privacy`. Search for a safety contact email or form. Confirm the link is not behind authentication.
- **Resolution:** Add a "Safety / Law Enforcement Contact" section to your privacy policy or support page with a dedicated email (e.g., safety@yourdomain.com).
- **Example rejection:** "Your app's privacy policy or support materials do not provide a contact mechanism for law enforcement to report illegal or harmful user-generated content."

---

### Account Deletion Applies to UGC Accounts  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Social apps are account-based by nature. Account deletion must remove or anonymize all UGC posted by the deleted account (not just the profile). Users must not be forced to email support to delete — deletion must be initiatable in-app.
- **How to detect:** Manually navigate to account settings in the review build. Use `asc_get_privacy` to verify deletion is declared in the privacy label. Post test content, then delete the test account and verify content is removed or anonymized per your privacy policy.
- **Resolution:** Wire in-app account deletion to a backend job that purges or anonymizes all associated posts, comments, and media. Provide a confirmation screen with data deletion timeline. See `type-all-apps.md` for the baseline rule.
- **Example rejection:** "Your app requires users to contact customer support via email to delete their account. Account deletion must be initiatable from within the app."
