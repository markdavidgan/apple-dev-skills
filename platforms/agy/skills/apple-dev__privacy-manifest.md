---
name: privacy-manifest
category: quality
description: Apple privacy manifests (PrivacyInfo.xcprivacy) and required-reason APIs — declare data collection, tracking domains, and approved reason codes to avoid App Store rejection. Use when the user mentions "privacy manifest", "PrivacyInfo.xcprivacy", "required reason API", "ITMS-91053", "ITMS-91061", "privacy nutrition label", "App Store privacy rejection", or adds an SDK/framework. Run before submission alongside asc-submission.
invoke: "/privacy-check [path] — Scan for required-reason API usage and verify PrivacyInfo.xcprivacy completeness before submission."
---

# Privacy Manifests & Required-Reason APIs

**Declare data use and justify required-reason APIs so the build passes App Review.** Missing or incomplete manifests cause hard rejections (`ITMS-91053`, `ITMS-91061`) at upload/processing time — often *after* a "successful" upload (see `asc-submission` async failures). Run this before submitting.

A privacy manifest is a property list named **`PrivacyInfo.xcprivacy`** added to a target (and **required in each SDK/framework**, not just the app). It declares four things.

---

## The four keys

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>                                  <!-- true only if you track per App Tracking Transparency -->

  <key>NSPrivacyTrackingDomains</key>
  <array/>                                  <!-- domains used for tracking; MUST be empty if NSPrivacyTracking is false -->

  <key>NSPrivacyCollectedDataTypes</key>
  <array>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeCrashData</string>
      <key>NSPrivacyCollectedDataTypeLinked</key>
      <false/>                              <!-- linked to user identity? -->
      <key>NSPrivacyCollectedDataTypeTracking</key>
      <false/>                              <!-- used to track? -->
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
  </array>

  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>            <!-- access only to data written by this app -->
      </array>
    </dict>
  </array>
</dict>
</plist>
```

1. **`NSPrivacyTracking`** (Bool) — does the app/SDK track per ATT?
2. **`NSPrivacyTrackingDomains`** (array) — domains that perform tracking. **Must be empty if `NSPrivacyTracking` is false.** Find them with the **App Privacy Report** / Instruments **Network** instrument.
3. **`NSPrivacyCollectedDataTypes`** (array) — what data you collect, whether it's *linked* to identity, whether it's used for *tracking*, and the *purposes*. This feeds the App Store **privacy nutrition label**.
4. **`NSPrivacyAccessedAPITypes`** (array) — each **required-reason API** category you call, plus approved **reason codes**.

---

## Required-reason APIs — the part that triggers rejections

Apple gates a set of commonly-abused APIs ("required reason APIs"). If your code (or a bundled SDK) calls one, you **must** declare an approved reason. There are five categories:

| Category constant | Covers | Common approved reason |
|-------------------|--------|------------------------|
| `NSPrivacyAccessedAPICategoryFileTimestamp` | file creation/modification dates (`stat`, `.contentModificationDate`, `NSFileModificationDate`) | `C617.1` (timestamps of files inside app container), `DDA9.1` (display to user) |
| `NSPrivacyAccessedAPICategorySystemBootTime` | `systemUptime`, `mach_absolute_time` for boot time | `35F9.1` (measure elapsed time), `8FFB.1` (in-app time calc) |
| `NSPrivacyAccessedAPICategoryDiskSpace` | available/total disk space | `E174.1` (check before write), `85F4.1` (display to user) |
| `NSPrivacyAccessedAPICategoryActiveKeyboards` | active keyboard list | `3EC4.1` (custom keyboard app), `54BD.1` (UI customization on user request) |
| `NSPrivacyAccessedAPICategoryUserDefaults` | `UserDefaults` / `NSUserDefaults` | `CA92.1` (data written only by this app), `1C8F.1` (app group shared with your other apps) |

> **`UserDefaults` is the one almost everyone hits.** Using `@AppStorage` or `UserDefaults.standard` requires declaring `NSPrivacyAccessedAPICategoryUserDefaults` with reason `CA92.1`. Forgetting it is the most common cause of `ITMS-91053`.

Pick the **narrowest reason that is actually true**. Declaring a reason you don't qualify for is a compliance violation; Apple cross-checks against documented valid reasons and rejects unknown/invalid codes.

---

## Rejection codes → meaning

| Upload error | Meaning | Fix |
|--------------|---------|-----|
| **ITMS-91053** "Missing API declaration" | You call a required-reason API with no declared reason | Add the category + a valid reason code to `NSPrivacyAccessedAPITypes` |
| **ITMS-91061** "Missing privacy manifest" | A bundled SDK on Apple's list ships no manifest | Update the SDK to a version that includes one, or add a manifest for it |

These arrive by email and in the **ContentDelivery logs** (see `asc-submission` → diagnosing async failures) — the upload can "succeed" then fail processing.

---

## SDK signatures (the second half of ITMS-91061)

Apple maintains a list of commonly-used SDKs that must (a) ship a privacy manifest and (b) be **code-signed**. If you depend on one (analytics, ads, crash reporters, networking libs), update to a version that bundles `PrivacyInfo.xcprivacy` and a signature. You don't author manifests for third-party SDKs — you **upgrade** them.

---

## `/privacy-check` workflow

1. **Scan the source for required-reason API usage** (app + your own SwiftPM/embedded targets):

```bash
# UserDefaults / @AppStorage
grep -rEn "UserDefaults|@AppStorage" --include=*.swift .
# File timestamps
grep -rEn "contentModificationDate|creationDate|NSFileModificationDate|\.stat\(|fileModificationDate" --include=*.swift .
# System boot time / uptime
grep -rEn "systemUptime|mach_absolute_time|mach_continuous_time" --include=*.swift .
# Disk space
grep -rEn "volumeAvailableCapacity|systemFreeSize|systemSize" --include=*.swift .
# Active keyboards
grep -rEn "activeInputModes" --include=*.swift .
```

2. **List every `PrivacyInfo.xcprivacy`** in the project and which target it belongs to:

```bash
find . -name "PrivacyInfo.xcprivacy"
```

3. **Cross-check**: for each API category found in step 1, confirm a matching `NSPrivacyAccessedAPIType` entry with a *valid* reason exists in the app's manifest. Report:
   - ❌ API used but no manifest entry → will cause `ITMS-91053`.
   - ⚠️ Manifest entry with a reason code not on Apple's approved list for that category.
   - ⚠️ `NSPrivacyTracking` true but `NSPrivacyTrackingDomains` empty (or vice-versa).
   - ⚠️ Third-party SDK without a bundled manifest → `ITMS-91061` risk; recommend a version bump.
   - ✅ Each used category declared with a valid reason.

4. **Verify data-collection declarations** match what the app actually sends (crash/analytics/identifiers) so the nutrition label is truthful.

> A manifest is **per target**. App extensions, widgets, and embedded frameworks that touch required-reason APIs each need their own. Missing extension manifests are a frequent late surprise — see `asc-submission` Transporter table.
