---
description: "Scan for required-reason API usage and verify PrivacyInfo.xcprivacy completeness before submission."
argument-hint: "[path]"
---

Run the `privacy-manifest` skill on `$ARGUMENTS`.

Scans source for required-reason API usage (UserDefaults, file timestamps, system boot time, disk space, active keyboards), lists every PrivacyInfo.xcprivacy in the project, and cross-checks that each used category is declared with a valid reason code — flagging ITMS-91053 / ITMS-91061 risks before submission.
