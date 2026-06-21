# Preflight Pack — Health & Fitness Apps

Deep pack for Guideline 1.4.1 and 5.1.3 (HealthKit / Health & Fitness data). Open this for any app that makes health claims, uses HealthKit, conducts human-subject research, or provides medical guidance. Cross-reference: `rule-privacy.md`.

---

### Medical Claims Require Accuracy, Sources, and Regulatory Clearance  ·  Guideline 1.4.1  ·  REJECTION
- **What to check:** Apps that make specific medical claims (e.g., "lowers blood pressure," "clinically proven to reduce anxiety," "FDA-cleared for X") must be able to substantiate those claims. Apps that constitute medical devices (diagnosis, treatment, cure, mitigation) typically require FDA clearance or equivalent and must reference it.
- **How to detect:** Use `asc_get_metadata` to retrieve description, subtitle, and keywords. Search for "clinically proven," "FDA," "medically certified," "treats," "cures," "diagnoses," "clears." Cross-check against any FDA 510(k) or De Novo clearance documentation you hold.
- **Resolution:** Remove or qualify unsubstantiated medical claims. Replace "treats" with "may support." Where regulatory clearance applies, reference it in the App Review notes and supply the clearance number. Add a disclaimer that the app is not a substitute for professional medical advice.
- **Example rejection:** "Your app contains medical claims that are not substantiated. Apps must not claim to diagnose, cure, treat, or prevent any medical condition without appropriate regulatory clearance and supporting evidence."

---

### No Dosage Calculators Without Medical Credentials  ·  Guideline 1.4.1  ·  REJECTION
- **What to check:** Features that calculate medication dosages, drug interactions, or clinical thresholds (e.g., weight-based pediatric dosing, IV drip rates) are treated as medical devices by Apple unless the app is explicitly scoped to licensed healthcare professionals and access is gated accordingly.
- **How to detect:** Search source and UI strings for "dose," "dosage," "mg/kg," "drip rate," "interaction." Manually walk any calculator or recommendation flow. Use `asc_check_submission` to see if review notes address the professional-use scope.
- **Resolution:** Gate dosage calculator features behind a healthcare-professional verification step (license number entry, institution verification). Add prominent disclaimers that all outputs must be verified by a qualified clinician. Add this scope to App Review notes.
- **Example rejection:** "Your app provides medication dosage calculations without restricting access to licensed medical professionals. Apps that offer medical dosage information must be limited to healthcare providers and include appropriate safeguards."

---

### HealthKit Data Must Not Be Used for Advertising  ·  Guideline 5.1.3  ·  REJECTION
- **What to check:** Data obtained via HealthKit (steps, heart rate, sleep, workouts, etc.) must not be used for advertising, marketing, or sold to data brokers. It must not be shared with third parties for purposes other than improving health and fitness functionality within the app.
- **How to detect:** grep source for HealthKit read/write calls (`HKHealthStore`, `HKQuery`). Trace the data flow downstream — confirm no analytics or ad SDK receives HealthKit-derived values. Use `asc_get_privacy` to verify data type declarations.
- **Resolution:** Audit every HealthKit data read and remove any path that forwards that data to an ad network, analytics platform, or third-party not strictly necessary for core app functionality. Update privacy labels accordingly.
- **Example rejection:** "Your app accesses HealthKit data and shares it with a third-party analytics or advertising service. HealthKit data may only be used to provide health and fitness features and may not be used for advertising or marketing purposes."

---

### HealthKit Data Must Not Be Stored in iCloud  ·  Guideline 5.1.3  ·  REJECTION
- **What to check:** HealthKit data must not be written to iCloud (CloudKit or iCloud Drive) in a form that could expose it outside the app's controlled sandbox. Health data may be stored on-device or on your own HIPAA-compliant server, but not in a general-purpose iCloud container.
- **How to detect:** grep source for `CKRecord`, `NSUbiquitousKeyValueStore`, and `FileManager` paths containing `ubiquityContainerIdentifier`. Confirm no HealthKit-derived values are persisted into CloudKit containers.
- **Resolution:** Migrate HealthKit data persistence to on-device storage (`HKHealthStore` itself is the canonical store) or your own encrypted, HIPAA-compliant backend. Remove any CloudKit writes for health values.
- **Example rejection:** "Your app writes HealthKit data to iCloud, which is not permitted. Health data must not be stored in iCloud or shared with Apple's iCloud service."

---

### Human-Subject Research Requires IRB Approval and In-App Consent  ·  Guideline 5.1.3  ·  REJECTION
- **What to check:** Apps that collect health data as part of a clinical study or human-subject research must (1) obtain IRB / ethics board approval, (2) present an informed consent flow within the app that covers study purpose, risks, voluntary participation, and data use, and (3) allow participants to withdraw.
- **How to detect:** Review the app description and review notes for research/study language. Use `asc_check_submission` to confirm IRB documentation has been provided to Apple. Manually walk the onboarding flow to confirm a ResearchKit-style consent sequence is present.
- **Resolution:** Obtain IRB approval before submitting to App Review. Implement a ResearchKit consent flow (or equivalent) with all required disclosure elements. Provide IRB approval documentation in App Review notes. Implement a study withdrawal mechanism.
- **Example rejection:** "Your app conducts human subject research or a clinical study but does not provide evidence of IRB approval or a proper informed consent process within the app."

---

### Accurate Health Measurements and Disclaimers  ·  Guideline 1.4.1  ·  WARNING
- **What to check:** Apps that claim to measure physiological values (heart rate via camera, SpO2, stress, blood pressure) must be accurate within published, validated tolerances. Overstated accuracy claims and missing disclaimers (e.g., "not a medical device," "not for diagnostic use") are grounds for rejection or metadata removal.
- **How to detect:** Use `asc_get_metadata` to scan description and keywords for accuracy claims ("medical-grade," "clinical accuracy," "ECG"). Verify the disclaimer text is present on every measurement result screen in the build.
- **Resolution:** Ground accuracy claims in published validation studies cited in review notes. Add "Not a medical device. Not intended to diagnose or treat any condition." to every screen displaying a health measurement result.
- **Example rejection:** "Your app claims to provide medically accurate heart rate measurements using the device camera but does not include disclaimers clarifying that the feature is not a medical device and is not intended for diagnostic purposes."

---

### Emergency Services Disclaimer  ·  Guideline 1.4.1  ·  WARNING
- **What to check:** Any feature that could be construed as an emergency-response tool (fall detection, SOS, seizure alerts, cardiac event detection) must clearly disclaim that it is not a substitute for calling emergency services and must not promise guaranteed alerting.
- **How to detect:** Navigate to any emergency-adjacent feature in the build. Confirm disclaimer text is present and prominent. Use `asc_get_metadata` to check description for unqualified emergency claims.
- **Resolution:** Add a disclaimer on the feature's primary screen: "This feature is not a substitute for emergency services. In an emergency, call [local emergency number]." Do not promise 100% detection accuracy.
- **Example rejection:** "Your app includes an emergency alert feature but does not inform users that this feature is not a replacement for contacting emergency services."

---

### Mental Health Crisis Handling  ·  Guideline 1.4.1  ·  REJECTION
- **What to check:** Apps that provide mental health support, mood tracking, or any interaction where a user may disclose suicidal ideation, self-harm, or crisis states must refer users to crisis resources (e.g., 988 Suicide & Crisis Lifeline in the U.S., Crisis Text Line). Failure to do so is a hard rejection.
- **How to detect:** Test the app with crisis-related language in any text input (chatbot, journal, mood log). Confirm crisis resources are surfaced. Use `asc_check_submission` to verify this is addressed in review notes. Review the app description for mental health claims.
- **Resolution:** Implement a keyword-triggered crisis resource prompt that surfaces emergency helpline numbers and links (in-app, not requiring internet for the number itself). The 988 Lifeline and local equivalents are the baseline. Surface this before any AI/LLM response in mental health chat contexts.
- **Example rejection:** "Your app provides mental health support features but does not include information about crisis resources or emergency services for users who may be in distress or danger."
