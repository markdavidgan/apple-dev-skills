# Preflight Pack — macOS (Mac App Store)

---

### App Sandbox Required  ·  Guideline 2.4.5(i)  ·  REJECTION
- **What to check:** All Mac App Store submissions must enable App Sandbox (`com.apple.security.app-sandbox = YES` in the entitlements file). Apps that disable sandboxing are rejected outright.
- **How to detect:** Inspect the app's `.entitlements` file(s) in the built product or source. Use `asc_check_submission` logs for "ITMS-90286: Invalid Code Signing Entitlements" or Transporter errors citing sandbox. Confirm both the main target and any XPC services / helper tools carry the sandbox entitlement.
- **Resolution:** Enable `com.apple.security.app-sandbox` in the target's entitlements. Audit all file, network, and hardware access and add only the required capability entitlements. Helpers and XPC services need their own sandboxed entitlements files.
- **Example rejection:** "Your app does not have the App Sandbox feature enabled. The Mac App Store requires that all apps implement the App Sandbox."

---

### No Writes Outside the App Container  ·  Guideline 2.4.5(i)  ·  REJECTION
- **What to check:** A sandboxed app may only write to its container (`~/Library/Containers/<bundle-id>/`), user-selected locations via security-scoped bookmarks, or shared containers declared with an App Group entitlement. Writing to arbitrary filesystem paths is a sandbox violation.
- **How to detect:** Run the app under `fs_usage` or Instruments > File Activity and look for writes to paths outside the container. Check for hardcoded paths like `/tmp/`, `/var/folders/`, or `~/Library/Application Support/<AppName>/` without a corresponding security-scoped bookmark or group container entitlement.
- **Resolution:** Migrate preference/cache writes into `NSApplicationSupportDirectory` within the container. Use `NSOpenPanel` / `NSSavePanel` + security-scoped bookmarks for user-chosen paths. Declare shared data via `com.apple.security.application-groups`.
- **Example rejection:** "Your app attempts to write data outside of its sandbox container without the appropriate user permission. This is not permitted on the Mac App Store."

---

### Temporary Exception Entitlements Justification  ·  Guideline 2.4.5 / Entitlement Policy  ·  WARNING
- **What to check:** Temporary exception entitlements (e.g., `com.apple.security.temporary-exception.files.absolute-path.read-write`) trigger manual Apple review and are rarely approved for MAS. Their presence signals architectural debt.
- **How to detect:** Search entitlement files for `temporary-exception`. Use `asc_check_submission` or Xcode's Capabilities tab to list all declared entitlements. Flag any temporary exceptions and verify that a justification was included in the App Review notes.
- **Resolution:** Replace temporary exceptions with first-class entitlements where available. For unavoidable cases, provide a detailed business justification in the App Review Information field explaining why no standard API meets the need.
- **Example rejection:** "Your app requests the temporary exception entitlement [X] without an adequate explanation. Temporary exceptions must be justified in your App Review notes."

---

### No Self-Update / Sparkle on MAS  ·  Guideline 2.4.5(iv)  ·  REJECTION
- **What to check:** MAS apps must not include self-update mechanisms such as Sparkle, in-app "Check for Updates" buttons, or code that downloads and installs new versions outside the MAS update pipeline.
- **How to detect:** Search the binary and linked frameworks for Sparkle (`SUUpdater`, `SPUUpdater`), or any HTTP call to a `.appcast.xml` or `appcasts` endpoint. Use `asc_check_submission` or manual static analysis. Check `Info.plist` for `SUFeedURL` or related Sparkle keys.
- **Resolution:** Remove Sparkle and all update-check logic entirely. MAS handles updates. If you need both a MAS and a direct-distribution build, gate Sparkle behind a build flag that is stripped from the MAS target.
- **Example rejection:** "Your app includes code to update itself outside of the Mac App Store update process, which is not permitted."

---

### Hardened Runtime Required for Notarization  ·  Guideline 2.4.5 / Notarization Policy  ·  REJECTION
- **What to check:** For Developer ID (direct distribution) notarization, Hardened Runtime must be enabled. For MAS, it is also enforced by code-signing policy. Unsigned or non-hardened builds are rejected at upload.
- **How to detect:** Run `codesign -dv --verbose=4 <App.app>` and check for `flags=0x10000(runtime)`. Absence of the `runtime` flag means Hardened Runtime is off. `asc_check_submission` upload errors citing "ITMS-90338" or "invalid binary" often trace back to this.
- **Resolution:** In Xcode, set "Enable Hardened Runtime" to YES for all targets. If the app requires a runtime exception (e.g., JIT, unsigned executable memory for game engines), add only the specific exception entitlement and justify it in App Review notes.
- **Example rejection:** "The binary is not compiled with the Hardened Runtime, which is required for all Mac App Store submissions."

---

### No Requiring Admin / Root Privileges  ·  Guideline 2.4.5 / Sandboxing Policy  ·  REJECTION
- **What to check:** Apps must not require administrator credentials or `sudo` to perform their primary function. Installer helpers and privileged helpers must use `SMJobBless` / `ServiceManagement` — not `AuthorizationExecuteWithPrivileges` (deprecated).
- **How to detect:** Grep the source and scripts for `AuthorizationExecuteWithPrivileges`, `sudo`, or `osascript` with `do shell script … with administrator privileges`. Use `asc_check_submission` or manual binary analysis.
- **Resolution:** Refactor privileged operations into a properly blessed `launchd` helper tool using `SMJobBless`. The helper should request only the minimum privileges needed and communicate via XPC. See `rule-entitlements.md` for SMJobBless setup.
- **Example rejection:** "Your app uses deprecated privileged authorization APIs or requires administrator access in ways that are not permitted for Mac App Store distribution."

---

### File-Access Scope / Open and Save Panels  ·  Guideline 2.4.5(i)  ·  WARNING
- **What to check:** A sandboxed app that needs broad file access (e.g., a text editor, media converter) must use `NSOpenPanel` / `NSSavePanel` to obtain user consent, then persist access with security-scoped bookmarks. Declaring `com.apple.security.files.user-selected.read-write` without the accompanying UI flow is insufficient.
- **How to detect:** Use `asc_get_metadata` to check the app category and infer expected file-access patterns. In a local build, verify that file-open operations go through a panel and that bookmarks are persisted to UserDefaults or the container. Missing bookmark persistence means access is lost on relaunch.
- **Resolution:** Store security-scoped bookmarks using `URL.bookmarkData(options: .withSecurityScope, ...)` after the user selects a file. Call `startAccessingSecurityScopedResource()` / `stopAccessingSecurityScopedResource()` around file operations on subsequent launches.
- **Example rejection:** "Your app accesses files outside its container without the required user permission. File access in sandboxed apps must be obtained through Open and Save panels, and persistent access must use security-scoped bookmarks."

---

**Cross-references:** `rule-entitlements.md` (entitlements reference and SMJobBless guide), `asc-submission` (submission checklist and reviewer credentials).
