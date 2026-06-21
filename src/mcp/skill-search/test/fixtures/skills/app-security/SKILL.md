---
name: app-security
description: Security hardening for iOS/macOS apps. Use when asked about Keychain, certificate pinning, secure storage, biometric authentication, or preventing reverse engineering.
---

# App Security

Guidance for hardening Apple platform apps against common threats.

## Keychain

Use the Keychain Services API to store secrets securely. Never store passwords in UserDefaults or plain files.

### Storing Credentials

```swift
let query: [String: Any] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrAccount as String: account,
  kSecValueData as String: password.data(using: .utf8)!
]
SecItemAdd(query as CFDictionary, nil)
```

### Keychain Access Groups

Share Keychain items across apps in the same team using access groups.

## Certificate Pinning

Pin your server's certificate or public key to prevent MITM attacks.

## Biometric Authentication

Use LocalAuthentication to gate sensitive flows behind Face ID or Touch ID.
