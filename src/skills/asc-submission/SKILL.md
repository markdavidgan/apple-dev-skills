---
name: asc-submission
description: Prepare an app for App Store submission or TestFlight distribution using the App Store Connect MCP server. Use when user says "prepare submission", "submit to app store", "prepare for review", "update metadata", "set what's new", "check submission readiness", "distribute to testflight", or wants to manage App Store Connect metadata, screenshots, or review submissions.
---

# ASC Submission

**Prepare apps for App Store review or TestFlight distribution using the App Store Connect MCP server.**

## Workflows

### Workflow A: Full Submission Readiness Check

When the user asks to prepare or check submission readiness, run steps 1–2 sequentially then dispatch parallel validation.

1. **Get app ID:** Call `asc_list_apps` and find the app by name/bundle ID.

2. **Check version exists:** Call `asc_list_versions` to find a version in PREPARE_FOR_SUBMISSION state. If none exists, create one with `asc_create_version`.

3. **Parallel validation** — dispatch two agents simultaneously:

```
Coordinator (you)
├─► Agent A — Signing + Readiness check   [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
└─► Agent B — Local entitlements scan     [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
         │
         ▼ (both complete)
Coordinator — aggregate results, report missing items, offer to fix
```

**Agent A prompt:**
```
Check submission readiness for app ID: <app_id>

1. Call asc_check_signing with bundle IDs: <list>
   and expected capabilities from the entitlements scan (provided by Agent B)
2. Call asc_check_submission with app ID: <app_id>

Report:
- SIGNING: OK / ISSUES (list mismatches)
- METADATA: OK / MISSING (list required fields)
- SCREENSHOTS: OK / MISSING (list devices/locales)
- OVERALL: READY / BLOCKED (list blockers)
```

**Agent B prompt:**
```
Read local entitlements files and report capabilities for each bundle ID.

1. Find all .entitlements files: find <app-dir> -name "*.entitlements"
2. For each file, extract: app group identifiers, capability keys, bundle ID
3. Return a map: { bundleId: [capability1, capability2, ...] }

This output feeds Agent A's signing check.
```

4. **Report missing items** and offer to fix them.

### Workflow B: Update Metadata

When the user asks to update metadata, what's new, or description:

1. **Get app and version:** `asc_list_apps` then `asc_list_versions` (find PREPARE_FOR_SUBMISSION version).

2. **Get current metadata:** `asc_get_metadata` with the version ID.

3. **Generate content:**
   - **What's New:** Generate from git commits since last release tag. Use `git log` to find commits, then write a user-friendly summary.
   - **Description:** Review current description and suggest updates.
   - **Keywords:** Analyze current keywords and suggest improvements.

4. **Update:** Call `asc_update_metadata` with the localization ID and new content.

### Workflow C: TestFlight Distribution

When the user wants to distribute a build to TestFlight:

1. **List builds:** Call `asc_list_tf_builds` filtered by app ID. Find the latest processed build.

2. **Set beta notes:** Call `asc_set_beta_notes` with a "What to Test" summary generated from recent commits.

3. **List beta groups:** Call `asc_list_beta_groups` to find the target group.

4. **Distribute:** Call `asc_distribute_build` to add the build to the group.

### Workflow D: Submit for Review

When the user explicitly asks to submit for review:

1. **Run readiness check** (Workflow A) first.

2. **If ready:** Confirm with the user, then call `asc_submit_for_review`.

3. **If not ready:** Report missing items and offer to fix them.

## Metadata Guidelines

### What's New Text
- Keep under 4000 characters
- Lead with the most impactful change
- Use bullet points for multiple changes
- Write for users, not developers (no technical jargon)
- Example: "New haptic feedback during focus sessions" not "feat(haptics): add UIFeedbackGenerator"

### Keywords
- Max 100 characters, comma-separated
- No spaces after commas
- Include app name variations and key features

### Description
- Lead with the core value proposition
- Structure: what it does, who it's for, key features, how it works
- Include accessibility mentions for App Store featuring consideration

## MCP Tools Reference

### App Store

| Tool | Purpose |
|------|---------|
| `asc_list_apps` | List all apps (get IDs) |
| `asc_list_versions` | List App Store versions and their states |
| `asc_create_version` | Create a new version (e.g. '1.1.0') |
| `asc_get_metadata` | Get description, keywords, what's new per locale |
| `asc_update_metadata` | Update description, keywords, what's new |
| `asc_get_app_info` | Get app name, subtitle, privacy URL |
| `asc_update_app_info` | Update app name, subtitle, privacy URL |
| `asc_list_screenshots` | List screenshots per locale and display type |
| `asc_submit_for_review` | Submit version for App Review |
| `asc_check_submission` | Readiness check -- verifies everything needed for submission |

### TestFlight

| Tool | Purpose |
|------|---------|
| `asc_list_tf_builds` | List TestFlight builds (version, state, dates) |
| `asc_list_beta_groups` | List beta groups (internal/external) |
| `asc_distribute_build` | Add a build to a beta group |
| `asc_set_beta_notes` | Set "What to Test" text for a build |

## Transporter Validation

Apple Transporter runs during CI upload to App Store Connect -- it does not run locally. Even if a local export or archive succeeds, Transporter can still reject the build during upload.

### What Transporter Validates

- **Provisioning profile validity:** Profile must be active, not expired, and match the bundle ID exactly
- **Metadata completeness:** Required fields (bundle display name, version, build number) must be present
- **Bundle ID consistency:** The bundle ID in the binary must match the provisioning profile and App Store Connect record
- **Entitlements:** Every entitlement in the binary must correspond to a real Apple capability enabled in the Developer Portal

### Common Transporter Failures

| Failure | Cause | Fix |
|---------|-------|-----|
| Missing watchOS icons | Asset catalog incomplete for Watch target | Add all required icon sizes to the Watch asset catalog |
| Invalid provisioning profile | Profile expired or revoked | Regenerate via `xc_create_profile` or Developer Portal |
| Fake entitlements | Non-existent entitlement keys in .entitlements file | Remove fabricated keys (e.g., `com.apple.developer.widgetkit` is not real) |
| Bundle ID mismatch | Binary bundle ID differs from profile | Verify `PRODUCT_BUNDLE_IDENTIFIER` matches the provisioning profile |
| Missing privacy manifest | `PrivacyInfo.xcprivacy` absent from extension target | Add privacy manifest to each target that uses required reason APIs |

### Debugging Transporter Rejections

Transporter errors surface in Xcode Cloud build logs after the archive step. Use `xc_get_issues` to read the full error list. Local reproduction requires `xcrun altool --validate-app` or Transporter.app, but the fastest path is fixing based on the CI error message and re-pushing.

---

### Developer Portal (from asc-build-check)

| Tool | Purpose |
|------|---------|
| `asc_check_signing` | Health check -- compare entitlements vs portal capabilities |
| `asc_add_capability` | Fix missing capabilities |
