---
name: ios-asc
category: asc
description: App Store Connect MCP tools for code signing, provisioning profiles, bundle IDs, TestFlight builds, beta testers, and App Store metadata/release management. Use when signing an app, creating or repairing provisioning profiles, managing bundle ID capabilities, distributing to TestFlight, managing beta groups, editing App Store versions or localized metadata, or submitting for review. Trigger on "sign the app", "provisioning profile", "distribute to TestFlight", "add beta tester", "submit for review", or "update App Store metadata".
---

# iOS App Store Connect

**Manage signing, provisioning, TestFlight distribution, and app submission using MCP tools.** These tools connect directly to Apple's App Store Connect API — no manual portal navigation required.

---

## MCP Tool Overview

### Signing Tools

| Tool | Purpose |
|------|---------|
| `xc_setup_signing` | **One-shot setup**: Create distribution cert + App Store profiles for all bundle IDs |
| `xc_check_signing` | **Health check**: Compare local entitlements vs portal capabilities, verify certs & profiles |
| `xc_create_certificate` | Generate CSR, submit to Apple, install in login keychain |
| `xc_revoke_certificate` | Revoke a certificate by ID |
| `xc_list_certificates` | List all certificates with expiration dates |

### Provisioning Tools

| Tool | Purpose |
|------|---------|
| `xc_list_bundle_ids` | List registered bundle IDs (filter by identifier substring) |
| `xc_register_bundle_id` | Register a new bundle ID in the Developer Portal |
| `xc_delete_bundle_id` | Remove a bundle ID from the portal |
| `xc_get_capabilities` | Get capabilities enabled for a bundle ID |
| `xc_add_capability` | Add a capability (e.g., APP_GROUPS) to a bundle ID |
| `xc_remove_capability` | Remove a capability from a bundle ID |
| `xc_list_profiles` | List provisioning profiles (filter by state/type) |
| `xc_create_profile` | Create a provisioning profile for bundle ID + certificate |
| `xc_delete_profile` | Delete a provisioning profile by ID |

### TestFlight Tools

| Tool | Purpose |
|------|---------|
| `xc_list_apps` | List all apps with IDs, names, bundle IDs, current versions |
| `xc_list_tf_builds` | List TestFlight builds with version, state, processing status |
| `xc_list_beta_groups` | List beta groups (internal/external) |
| `xc_create_beta_group` | Create a new TestFlight beta group |
| `xc_update_beta_group` | Update group settings (public link, feedback, etc.) |
| `xc_delete_beta_group` | Remove a beta group |
| `xc_list_beta_testers` | List testers (filter by group, app, or email) |
| `xc_invite_beta_tester` | Invite a tester by email to a group |
| `xc_remove_beta_tester` | Remove a tester from a group |
| `xc_distribute_build` | Add a build to a beta group for distribution |
| `xc_set_beta_notes` | Set "What to Test" text for a build |
| `xc_submit_beta_review` | Submit build for external beta review |

### Metadata & Release Tools

| Tool | Purpose |
|------|---------|
| `xc_list_versions` | List App Store versions with state (READY_FOR_SALE, PREPARE_FOR_SUBMISSION, etc.) |
| `xc_create_version` | Create a new App Store version (e.g., "1.1.0") |
| `xc_update_version` | Update version attributes (release type, scheduled date) |
| `xc_get_metadata` | Get localized metadata (description, keywords, what's new) |
| `xc_create_localization` | Create a new locale for a version |
| `xc_update_metadata` | Update localized metadata |
| `xc_get_app_info` | Get app-level info (name, subtitle, privacy URL) |
| `xc_update_app_info` | Update app-level localized info |
| `xc_set_review_detail` | Set review contact info and demo account |
| `xc_submit_for_review` | Submit version for App Review |
| `xc_release_version` | Manually release an approved version |

---

## Common Workflows

### One-Shot Signing Setup

Use this when setting up a new app or fixing "No profiles found" errors:

```bash
# 1. Read local entitlements to identify expected capabilities
find . -name "*.entitlements" -exec cat {} \;

# 2. Run one-shot signing setup
# (Use xc_setup_signing with all bundle identifiers)
# Creates distribution cert + App Store profiles for each bundle ID
```

The `xc_setup_signing` tool:
- Creates an Apple Distribution certificate if none exists
- Generates App Store provisioning profiles for each bundle ID
- Installs the certificate in your login keychain

### Checking Signing Health

Run this when builds fail with signing errors:

```bash
# 1. Read entitlements files
find . -name "*.entitlements" -exec cat {} \;

# 2. Run signing health check
# (Use xc_check_signing with each bundle ID and expected capabilities)
```

The `xc_check_signing` tool reports:
- Missing capabilities in the portal vs local entitlements
- Certificate status and expiration
- Provisioning profile existence and validity

### Creating a New Bundle ID with Capabilities

```bash
# 1. Register the bundle ID
# (Use xc_register_bundle_id with identifier and name)

# 2. Add required capabilities
# (Use xc_add_capability with bundle_id_id and capability_type)

# 3. Create provisioning profile
# Get certificate IDs from xc_list_certificates
# (Use xc_create_profile with bundle_id_id and certificate_ids)
```

#### ⚠️ App Groups: the capability toggle is NOT the container link

The ASC API (and `xc_add_capability` with `APP_GROUPS`) only flips the
capability **on** for a bundle ID. It does **not** associate a specific
container like `group.com.example.shared`. There is **no** App Store Connect
API resource for App Group container assignment — `/v1/bundleIdCapabilities`
has no relationship to App Groups, and there is no `/v1/appGroups` endpoint.
This means automatic signing (`xcodebuild -allowProvisioningUpdates` with an
ASC `.p8` API key) will fail to mint a managed profile for a bundle ID whose
entitlements declare an App Group until that container is linked, with errors
like "App Group ... is not associated with this app ID" or a silent fallback
to a wildcard profile.

**The only programmatic way to link the container is `fastlane produce`,
which authenticates with an Apple ID *cookie/web session* (spaceship), NOT the
`.p8` API key:**

```bash
# Authenticate once (caches a spaceship session under ~/.fastlane):
#   FASTLANE_USER + FASTLANE_PASSWORD (or interactive Apple ID login)

# Ensure the App Group exists (idempotent):
bundle exec fastlane produce group \
  -g group.com.example.shared -n "Example Shared Group"

# Associate the group with each bundle ID that declares it
# (main app AND every extension — run per bundle ID, idempotent):
bundle exec fastlane produce associate_group \
  -a com.example.myapp           group.com.example.shared
bundle exec fastlane produce associate_group \
  -a com.example.myapp.share     group.com.example.shared
```

After `associate_group` succeeds for every bundle ID, automatic signing with
the `.p8` key works normally. Same applies to the web portal
(Certificates, Identifiers & Profiles → the App ID → App Groups → Edit) if you
prefer clicking. **Capability key auth is irrelevant here — the limitation is
the API surface, not the key role.** (Verified 2026-06-01 shipping Aether
Field's share extension; see aether-focus pattern
`2026-06-01-app-group-link-requires-produce.md`.)

### Distributing a Build to TestFlight

```bash
# 1. List available builds
# (Use xc_list_tf_builds with optional app_id filter)

# 2. List beta groups
# (Use xc_list_beta_groups with app_id)

# 3. Distribute build to group
# (Use xc_distribute_build with build_id and beta_group_id)
```

### Setting Beta Test Notes

```bash
# 1. List builds to get build ID
# (Use xc_list_tf_builds)

# 2. Set "What to Test" notes
# (Use xc_set_beta_notes with build_id and whats_new text)
```

---

## Capability Mapping

Map entitlements file keys to capability types for MCP tools:

| Entitlement Key | Capability Type |
|-----------------|-----------------|
| `com.apple.security.application-groups` | `APP_GROUPS` ⚠️ capability toggle only — container link needs `fastlane produce associate_group` (see above) |
| `com.apple.developer.icloud-container-identifiers` | `ICLOUD` |
| `com.apple.developer.healthkit` | `HEALTHKIT` |
| `aps-environment` | `PUSH_NOTIFICATIONS` |
| `com.apple.developer.applesignin` | `APPLE_ID_AUTH` |
| `com.apple.developer.associated-domains` | `ASSOCIATED_DOMAINS` |
| `com.apple.developer.in-app-payments` | `IN_APP_PURCHASE` |
| `com.apple.developer.siri` | `SIRIKIT` |
| `com.apple.developer.networking.wifi-info` | `ACCESS_WIFI_INFORMATION` |
| `com.apple.developer.default-data-protection` | `DATA_PROTECTION` |

### Example: Reading Entitlements

```xml
<!-- MyApp.entitlements -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.application-groups</key>
    <array>
        <string>group.com.example.myapp</string>
    </array>
    <key>aps-environment</key>
    <string>production</string>
</dict>
</plist>
```

Required capabilities: `APP_GROUPS`, `PUSH_NOTIFICATIONS`

---

## Fastlane Integration

### Alpha Lanes (TestFlight Upload)

```ruby
# fastlane/Fastfile
lane :alpha do
  increment_build_number
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight(
    skip_waiting_for_build_processing: false,
    notify_external_testers: false
  )
end

lane :alpha_next do
  bump_build  # Custom lane to increment build
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight
end
```

Run with:
```bash
cd apps/myapp && bundle exec fastlane alpha
```

### Beta Review Submission

```ruby
lane :submit_beta do
  # Distribute to external group triggers beta review
  upload_to_testflight(
    distribute_external: true,
    groups: ["External Testers"],
    changelog: "Bug fixes and improvements"
  )
end
```

### Metadata Sync

```ruby
lane :sync_metadata do
  download_from_app_store_connect(
    metadata_path: "./fastlane/metadata"
  )
  # Edit files in fastlane/metadata/
  upload_to_app_store_connect(
    metadata_path: "./fastlane/metadata",
    skip_binary_upload: true,
    skip_screenshots: true
  )
end
```

---

## Troubleshooting

### No Profiles Found

**Error:** `No profiles for 'com.example.app' were found`

**Solution:**
1. Check if bundle ID is registered: `xc_list_bundle_ids`
2. If missing, register it: `xc_register_bundle_id`
3. Run one-shot setup: `xc_setup_signing`
4. Or manually create profile: `xc_create_profile`

### Certificate Expiration

**Error:** `Signing certificate expired`

**Solution:**
1. List certificates: `xc_list_certificates`
2. Check expiration dates
3. If expiring soon, create new: `xc_create_certificate`
4. Old certificates can be revoked: `xc_revoke_certificate`

### Capability Mismatches

**Error:** `Provisioning profile doesn't include the aps-environment entitlement`

**Solution:**
1. Read local entitlements file
2. Check portal capabilities: `xc_get_capabilities`
3. Add missing capability: `xc_add_capability`
4. Recreate provisioning profile: `xc_create_profile`

### Build Processing Failures

**Error:** Build stuck in "Processing" or fails TestFlight upload

**Common causes:**
- **Missing compliance:** Set encryption declaration with `xc_set_encryption`
- **Invalid binary:** Check for private API usage or missing icons
- **Version conflict:** Bump build number with `increment_build_number`
- **API key issues:** Verify `ASC_KEY_PATH` environment variable

### Profile Not Found After Creation

Xcode may cache old profiles. Force refresh:

```bash
# Remove cached profiles
rm -rf ~/Library/MobileDevice/Provisioning\ Profiles/*

# Restart Xcode
# Download profiles: Xcode > Settings > Accounts > Download Manual Profiles
```

---

## Quick Reference

### Essential Commands

```bash
# Check signing health for all apps
make validate-fast

# Archive build (catches signing errors)
make archive-{app}

# Full export test (catches provisioning errors)
make export-test-{app}

# Upload to TestFlight
bundle exec fastlane alpha
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `ASC_KEY_PATH` | Path to App Store Connect API key (`.p8` file) |
| `ASC_KEY_ID` | Key ID from App Store Connect |
| `ASC_ISSUER_ID` | Issuer ID from App Store Connect |
| `TEAM_ID` | Apple Developer Team ID |

### Bundle ID Patterns

```
com.example.myapp              # Main app
com.example.myapp.watch        # Watch app
com.example.myapp.widgets      # Widget extension
com.example.myapp.watch.widgets # Watch widgets
```

---

## See Also

- `ios-build` — Build validation and troubleshooting
- `ios-standards` — Swift 6 concurrency patterns
- `check-build` — Diagnose build/signing failures (project-specific)
