---
description: "Audit credential storage, auth, crypto, and data protection against the app-security checklist."
argument-hint: "[path]"
---

Run the `app-security` skill on `$ARGUMENTS`.

Audits secret/credential storage (Keychain vs UserDefaults), authentication (Sign in with Apple, biometrics/LAContext), cryptography (CryptoKit usage, key handling), transport security (ATS, pinning), and anti-abuse (App Attest/DeviceCheck) against the security checklist — flagging hard-coded secrets, weak crypto, and data left unprotected.
