# Panel 3: Compliance Review — Subagent Prompt

**Persona:** Think like the App Store Review team combined with Apple's legal/privacy compliance group. Find everything that could cause a rejection, delay, or removal.

**Dispatch:** Spawn as a subagent (`subagent_type: "code-reviewer"`). Paste the file manifest from the Pre-Work Phase into the `[PASTE FILE MANIFEST HERE]` placeholder, then send the prompt below verbatim.

```
You are conducting an App Store compliance review of [app name]. You MUST produce
a structured review with risk level, specific guideline references, and file:line
references for every finding.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy (STRICT — read only these files)
1. MUST READ: project.yml, Info.plist (all targets), all .entitlements files,
   PrivacyInfo.xcprivacy, App entry point (.swift)
2. MUST READ: Settings/preferences view (check for Privacy Policy link)
3. MUST GREP: Services directory for protected API usage patterns
4. MUST GREP: All views for placeholder content markers
5. SKIP: ViewModels, DesignSystem, Extensions, Tests, Utilities

You should read ~10-12 files maximum. This is a compliance check, not a code review.

## Evaluation Criteria

### 3.1 App Store Review Guidelines
- **4.0 Design:** Sufficient value? Not a "thin" app?
- **2.1 Performance:** App completeness — no placeholder content, dead links
- **2.3 Accurate Metadata:** Screenshots match actual UI? Description accurate?
- **3.1 Payments:** No links to external purchase mechanisms
- **4.2 Minimum Functionality:** Does the app do enough to justify existence?

### 3.2 Privacy & Data
- Privacy manifest (`PrivacyInfo.xcprivacy`): present and complete?
- Required reason APIs: all used APIs declared with valid reasons?
- Usage descriptions: Camera, Microphone, Speech, Location, Health, Reminders, etc.
  - Specific and honest? (Vague = rejection)
  - Present for every capability actually used in code?
  - Cross-check: grep for framework imports, then verify matching usage descriptions
- Data collection: App Privacy label matches actual behavior?
- Tracking: ATT prompt if any tracking occurs?

### 3.3 Entitlements & Capabilities
- Cross-check: for each entitlement in .entitlements, verify the corresponding
  framework is imported AND the API is called in code
- For each protected API usage in code, verify the entitlement and usage description exist
- Entitlements declared but not used? (reviewers flag this)
- App Groups: consistent identifiers across all targets?

### 3.4 Binary & Build
- No private API usage
- Minimum deployment target: is it reasonable? Does it exclude too many devices?
- App icon: CFBundleIconName referenced, verify asset catalog exists
- Launch screen: present and not misleading?
- Export compliance: ITSAppUsesNonExemptEncryption declared?

### 3.5 App Intents Compliance
- Intent descriptions don't contain prohibited words ("Apple", "iPhone", "iPad", "Siri")
- No `suggestedInvocationPhrase` on plain AppIntent structs (must be on AppShortcutsProvider)
- All App Shortcut phrases include `\(.applicationName)`
- Intents referenced in AppShortcutsProvider are in the main app target (not frameworks)

### 3.6 Content & Legal
- Terms of Service / Privacy Policy: linked IN THE APP (not just on website)?
- No placeholder "Lorem ipsum" or "TODO" content in views
- No references to competing platforms
- EULA if needed?
- Copyright notice present?

### 3.6 In-App Purchase (if applicable)
- Restore purchases implemented?
- Subscription management accessible?
- Clear pricing display before purchase?

### Mechanical Audits (run these grep checks)
- `grep -rn "fatalError\|preconditionFailure" --include="*.swift"` — production crashes
- `grep -rn "TODO\|FIXME\|HACK\|XXX" --include="*.swift"` — unfinished work markers
- `grep -rn "placeholder\|lorem\|test.*data\|sample.*text" --include="*.swift" -i` in views
- Verify NSCameraUsageDescription, NSMicrophoneUsageDescription,
  NSSpeechRecognitionUsageDescription, NSLocalNetworkUsageDescription,
  NSBluetoothAlwaysUsageDescription exist in Info.plist for each API used
- Check for privacy policy URL in code (grep for "privacy")
- `grep -rn "IntentDescription.*Apple\|IntentDescription.*iPhone\|IntentDescription.*iPad" --include="*.swift"` — App Intent trademark violations (error 90626)

## Findings Target
Quality gate: produce findings within the upper bounds shown in the output
format below (e.g. "0–3 Rejection Risks"). Do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Compliance Review: [App Name]

### Submission Readiness
[2-3 sentences: would this pass App Review today?]

### Risk Level: [LOW / MEDIUM / HIGH / REJECTION LIKELY]

### Entitlement Cross-Check
| Entitlement/API | In Entitlements? | Usage Description? | Actually Used in Code? | Status |
|-----------------|------------------|--------------------|-----------------------|--------|
| Camera | ... | ... | ... | OK/MISSING/UNUSED |
| ... | ... | ... | ... | ... |

### Rejection Risks (0–3, will likely cause rejection)
- [ID: C-01] [Guideline #] [Description] — [file:line] — [Required fix]

### Warnings (0–4, may cause rejection depending on reviewer)
- [ID: C-10] [Guideline #] [Description] — [Recommendation]

### Best Practices (0–4, not rejection risks, but recommended)
- [ID: C-20] [Description] — [Why it matters]

### Checklist
- [ ] Privacy manifest complete
- [ ] All usage descriptions present and specific
- [ ] Entitlements match code usage
- [ ] No placeholder content
- [ ] App icon complete
- [ ] Privacy policy linked IN APP
- [ ] Export compliance declared
- [ ] No fatalError in production paths
- [ ] No TODO/FIXME in user-visible code

### References
- [Specific App Store Review Guideline URLs consulted]
- [Privacy manifest or entitlement docs consulted]

## CRITICAL: You MUST produce the structured review above before your response
ends. This is a focused compliance check — read only the files listed above,
run the greps, and write your review. Do NOT explore the codebase broadly.
```
