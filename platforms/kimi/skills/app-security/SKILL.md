---
name: app-security
category: engineering
description: On-device app security — Keychain storage, Sign in with Apple, biometric auth (Face ID / Touch ID), CryptoKit encryption/hashing, App Attest / DeviceCheck, and certificate pinning. Use when storing tokens/secrets, adding Sign in with Apple, gating with Face ID/Touch ID, encrypting data, verifying device integrity to your server, or pinning TLS certificates. Trigger on "Keychain", "Sign in with Apple", "Face ID", "biometric", "CryptoKit", "App Attest", "encrypt", or "certificate pinning".
invoke: "/security-check [path] — Audit credential storage, auth, crypto, and data protection against the security checklist."
---

# App Security

**Store secrets, authenticate users, and protect data correctly on Apple platforms.** The golden rule: **never put secrets, tokens, or keys in `UserDefaults`, `@AppStorage`, plist, or source** — those are plaintext and back up off-device.

---

## Keychain — the only place for secrets

Use a thin wrapper around the C API (or a vetted micro-library). Store tokens, refresh tokens, encryption keys.

```swift
import Security

enum Keychain {
    static func set(_ data: Data, account: String) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: account,
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
        ]
        SecItemDelete(query as CFDictionary)               // replace existing
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { throw KeychainError(status) }
    }
    static func get(account: String) -> Data? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: account,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        var out: CFTypeRef?
        return SecItemCopyMatching(query as CFDictionary, &out) == errSecSuccess ? out as? Data : nil
    }
}
```

- **Choose accessibility deliberately:** `...WhenUnlockedThisDeviceOnly` (most secrets) or `...AfterFirstUnlockThisDeviceOnly` (needed in the background). The `ThisDeviceOnly` variants don't migrate to new devices/backups — correct for tokens.
- Gate the most sensitive items with `SecAccessControl` (`.biometryCurrentSet`, `.userPresence`) so reading requires Face ID/Touch ID.

---

## Sign in with Apple

Required if you offer other third-party social logins (App Review guideline 4.8). Privacy-friendly: email relay, minimal data.

```swift
let request = ASAuthorizationAppleIDProvider().createRequest()
request.requestedScopes = [.fullName, .email]
request.nonce = sha256(currentNonce)          // bind to your backend to prevent replay
let controller = ASAuthorizationController(authorizationRequests: [request])
controller.delegate = self
controller.performRequests()
```

- The **`user` identifier is stable**; name/email are returned **only on first authorization** — persist them then or you can't get them again.
- Send the **`identityToken` + `nonce`** to your server and verify the JWT against Apple's public keys. Never trust the client result alone.
- Use `SignInWithAppleButton` in SwiftUI for the HIG-compliant button.

---

## Biometric gate (local)

```swift
import LocalAuthentication
let ctx = LAContext()
var err: NSError?
if ctx.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &err) {
    let ok = try await ctx.evaluatePolicy(.deviceOwnerAuthentication,   // falls back to passcode
                                          localizedReason: "Unlock your vault")
}
```

Biometric success is a **UI gate**, not a cryptographic guarantee — back it with Keychain access control for real protection. Always provide a passcode fallback (`.deviceOwnerAuthentication`).

---

## CryptoKit — encryption & hashing

```swift
import CryptoKit
let key = SymmetricKey(size: .bits256)                 // store in Keychain
let sealed = try AES.GCM.seal(plaintext, using: key)   // authenticated encryption
let data = sealed.combined!
let opened = try AES.GCM.open(.init(combined: data), using: key)

let digest = SHA256.hash(data: payload)                // hashing
let signature = try P256.Signing.PrivateKey().signature(for: payload)
```

- Prefer **AES-GCM** (authenticated) over CBC. Never roll your own crypto or reuse nonces.
- For keys that must never leave hardware, generate in the **Secure Enclave** (`kSecAttrTokenIDSecureEnclave` / `SecureEnclave.P256`).

---

## App Attest / DeviceCheck — prove requests come from your real app

For high-value backends (anti-fraud, anti-cheat), verify the client is a genuine, unmodified instance of your app on a real device.

- `DCAppAttestService.shared` → `generateKey`, `attestKey(_:clientDataHash:)` (once), then `generateAssertion` per request.
- Your **server** verifies the attestation/assertion against Apple's App Attest root. Client-side checks alone are worthless.
- Use `DeviceCheck` (`DCDevice.generateToken`) for lightweight per-device flags (e.g. "already claimed free trial").

---

## Certificate pinning (only when justified)

Pinning defends against compromised CAs/MITM but **breaks when servers rotate certs** — pin to a **public key**, not a leaf cert, and ship a backup pin.

```swift
func urlSession(_ s: URLSession, didReceive challenge: URLAuthenticationChallenge) async
  -> (URLSession.AuthChallengeDisposition, URLCredential?) {
    guard let trust = challenge.protectionSpace.serverTrust,
          isPinned(publicKeyOf: trust) else { return (.cancelAuthenticationChallenge, nil) }
    return (.useCredential, URLCredential(trust: trust))
}
```

Don't pin if you can't operationally manage rotation — a stale pin bricks every install until they update. Pairs with `networking`.

---

## Quick audit

- [ ] No secrets in `UserDefaults`/plist/source.
- [ ] Tokens in Keychain with a `ThisDeviceOnly` accessibility class.
- [ ] Sign in with Apple verified **server-side** with nonce.
- [ ] Biometric gate backed by Keychain access control, with passcode fallback.
- [ ] AES-GCM (not CBC); nonces never reused; keys in Keychain/Secure Enclave.
- [ ] App Attest/DeviceCheck verified server-side (if used).
- [ ] Cert pins are public-key + have a backup (if used).
- [ ] Required-reason/privacy declarations current — see `privacy-manifest`.
