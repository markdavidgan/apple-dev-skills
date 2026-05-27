---
name: asc-build-check
description: Check the latest CI build status and debug failures using the App Store Connect MCP server. Use when user says "check build", "what broke", "CI status", "build failing", or asks about recent build failures. Also use for signing issues, provisioning profiles, bundle ID capabilities, or Developer Portal queries.
---

# ASC Build Check

**Inspect CI builds, diagnose failures, and manage Developer Portal signing using the App Store Connect MCP server.**

## Workflow

### Step 1: Get Overview

Call `asc_status` to see all products and their recent build status.

If the user specified an app name, filter the output to that product.

### Step 2: Identify Failures

Look for builds where `completionStatus` is not `SUCCEEDED`. Common statuses:
- `SUCCEEDED` -- all good
- `FAILED` -- build or test failure
- `ERRORED` -- infrastructure/config issue
- `CANCELED` -- manually stopped

If all builds are green, report success and stop.

### Step 3: Drill Into Failures

For each failed build:

1. **Get build details:** Call `asc_get_build` with the build run ID to see all actions (build, test, archive, etc.) and which ones failed.

2. **Get issues:** Call `asc_get_issues` with the build run ID -- this is the fastest way to see all errors, warnings, and test failures in one call.

3. **Get test results** (if test action failed): Call `asc_get_test_results` to see which specific tests failed.

4. **Get logs** (if needed): Use `asc_get_build_logs` with the failed action ID to fetch build log artifacts. Then `asc_download_artifact` for specific log files.

### Step 3b: Diagnose Export/Signing Failures

If errors include `ExportArchiveStep` failures ("Exporting for X Distribution failed"):

1. **Parallel local analysis** — while calling `asc_check_signing`, dispatch an `explore` agent (Fast tier: `claude-haiku-4-5` / `gpt-4.1-mini` / `gemini-3.0-flash` / `kimi-for-coding`) to read local files simultaneously:

```
You (MCP calls)                    explore agent (local files)
asc_check_signing (bundle IDs)  ←→  find all *.entitlements files
asc_list_profiles               ←→  read xcconfig for CODE_SIGN_IDENTITY
asc_list_certificates           ←→  grep for com.apple.developer.* keys
         │                                     │
         └──────────── compare ───────────────┘
```

   **Explore agent prompt:**
   ```
   Read all .entitlements files in <app-dir> and report:
   - File path → bundle ID (from app-dir name or filename)
   - All com.apple.developer.* keys present
   - App group identifiers (com.apple.security.application-groups values)
   - Any aps-environment value (push notifications)
   Return as a flat list: bundleId | entitlementKey | value
   ```

2. **Compare results:** Cross-reference the explore agent output with `asc_check_signing` to find mismatches between local entitlements and Developer Portal capabilities.

3. **Fix mismatches:** Use `asc_add_capability` to add missing capabilities directly via the API.

4. **Verify certificates and profiles:** The health check also reports certificate and profile status.

### Step 4: Report

Present a clear summary:

```
## Build Status: [Product Name]

**Build #[number]** -- [branch] -- [status]
Started: [time] | Finished: [time]

### Failures
- [action name]: [error summary]
  - File: [path]:[line]
  - Message: [compiler/test error]

### Signing Status (if applicable)
- [bundle ID]: [OK | Missing: CAPABILITY_NAME]

### Suggested Fix
[Actionable suggestion based on the error]
```

### Step 5: Fix (if asked)

If the user asks to fix the issue:
1. **Code errors:** Locate the file, read context, apply fix, verify with a local archive build
2. **Signing errors:** Use `asc_add_capability` to fix portal mismatches, then push to trigger a new build

## Entitlements Reference

When checking signing, read entitlements files and map to capability types:

| Entitlement Key | Capability Type |
|----------------|-----------------|
| `com.apple.security.application-groups` | `APP_GROUPS` |
| `com.apple.developer.icloud-container-identifiers` | `ICLOUD` |
| `com.apple.developer.healthkit` | `HEALTHKIT` |
| `aps-environment` | `PUSH_NOTIFICATIONS` |
| `com.apple.developer.applesignin` | `APPLE_ID_AUTH` |
| `com.apple.developer.associated-domains` | `ASSOCIATED_DOMAINS` |

## MCP Tools Reference

### CI / Build Tools

| Tool | Purpose |
|------|---------|
| `asc_status` | Quick overview of all products + last 3 builds |
| `asc_list_products` | List CI products (get IDs) |
| `asc_list_workflows` | List workflows for a product |
| `asc_list_builds` | List build runs (filter by workflow/product) |
| `asc_get_build` | Build details + all actions |
| `asc_get_issues` | All errors/warnings/test failures |
| `asc_get_test_results` | Test pass/fail results |
| `asc_get_build_logs` | Log artifacts for a build action |
| `asc_download_artifact` | Download specific artifact content |
| `asc_trigger_build` | Manually re-trigger a build without a new commit |
| `asc_wait_for_build` | Block + poll until a build completes, returns issues inline |

### Developer Portal / Signing Tools

| Tool | Purpose |
|------|---------|
| `asc_list_bundle_ids` | List registered bundle IDs (filter by app name) |
| `asc_get_capabilities` | Get capabilities for a specific bundle ID |
| `asc_add_capability` | Add a capability (e.g. APP_GROUPS) to a bundle ID |
| `asc_remove_capability` | Remove a capability from a bundle ID |
| `asc_list_certificates` | List all signing certificates + expiration |
| `asc_list_profiles` | List provisioning profiles (filter by state/type) |
| `asc_check_signing` | Health check -- compare expected vs portal capabilities, check certs & profiles |
| `asc_create_certificate` | Generate CSR, submit to Apple, install in login keychain |
| `asc_revoke_certificate` | Revoke a certificate by ID |
| `asc_create_profile` | Create a provisioning profile for a bundle ID + certificate |
| `asc_delete_profile` | Delete a provisioning profile by ID |
| `asc_setup_signing` | One-shot: create dist cert + all App Store profiles for given bundle IDs |
