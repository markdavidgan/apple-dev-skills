---
name: asc-submission
description: Prepare an app for App Store submission or TestFlight distribution using the App Store Connect MCP server. Use when user says "prepare submission", "submit to app store", "prepare for review", "update metadata", "set what's new", "check submission readiness", "distribute to testflight", or wants to manage App Store Connect metadata, screenshots, or review submissions.
invoke: "/prepare-submission [app] — Check submission readiness, metadata, screenshots, and signing via ASC MCP."
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

#### Workflow C-macOS: TestFlight Distribution for macOS Apps

Fastlane's `pilot distribute` and `asc_distribute_build` (MCP) often fail for macOS builds due to API path differences. Use this fallback when the standard workflow fails:

```ruby
# In Fastfile — macOS-specific distribution via Spaceship
lane :distribute_macos_build do |options|
  token = Spaceship::ConnectAPI::Token.create(
    key_id: ENV["ASC_KEY_ID"],
    issuer_id: ENV["ASC_ISSUER_ID"],
    filepath: ENV["ASC_KEY_PATH"]
  )
  Spaceship::ConnectAPI.token = token

  app = Spaceship::ConnectAPI::App.find(options[:bundle_id])
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }
  group = app.get_beta_groups.find { |g| g.name == options[:group] }

  # Set "What to Test"
  locs = build.get_beta_build_localizations
  existing = locs.find { |l| l.locale == "en-US" }
  if existing
    Spaceship::ConnectAPI.patch_beta_build_localizations(
      localization_id: existing.id,
      attributes: { whatsNew: options[:changelog] }
    )
  else
    Spaceship::ConnectAPI.post_beta_build_localizations(
      build_id: build.id,
      attributes: { locale: "en-US", whatsNew: options[:changelog] }
    )
  end

  # Add to beta group
  current = group.fetch_builds
  unless current.any? { |b| b.id == build.id }
    Spaceship::ConnectAPI.add_beta_groups_to_build(
      build_id: build.id,
      beta_group_ids: [group.id]
    )
  end
end
```

**Common macOS TestFlight failures and fixes:**

| Symptom | Cause | Fix |
|---------|-------|-----|
| `pilot list` → `betaBuildMetrics is not a valid relationship name` | fastlane bug with macOS build metadata | Use Spaceship directly; build status is still queryable via `app.get_builds` |
| `pilot distribute` → interactive platform prompt | macOS builds lack `betaBuildMetrics` relationship | Use `add_beta_groups_to_build` via Spaceship |
| `asc_set_beta_notes` → "resource does not exist" | MCP tool may use wrong API path for macOS | Use `post_beta_build_localizations` / `patch_beta_build_localizations` via Spaceship |
| Build not appearing in TestFlight after upload | macOS `.pkg` processing takes longer than `.ipa` | Poll `app.get_builds` and check `processing_state` — can take 10-30 min |

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

> **First App Store release has no editable "What's New."** The `whatsNew` field only exists for *updates*. On an app's very first version, a `PATCH` to `appStoreVersionLocalizations` for `whatsNew` returns **`409 STATE_ERROR` — "cannot be edited at this time"**, and the field is absent/null in `GET` responses. This is expected, not a blocker. Readiness tooling that checks "is What's New set?" will **false-positive** on a first release — treat a missing `whatsNew` on version 1.0 / the first-ever version as N/A, not as an incomplete-metadata failure. Set the description, keywords, screenshots, and promotional text instead. "What's New" becomes editable starting with the second version.

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
| Missing `NSExtensionPointIdentifier` | App extension has no `NSExtension` dict in Info.plist (error **90348**) | Give every `.appex` an explicit base Info.plist with `NSExtension.NSExtensionPointIdentifier` — see `ios-build` → "App Extension Info.plist" |

### Debugging Transporter Rejections

Transporter errors surface in Xcode Cloud build logs after the archive step. Use `xc_get_issues` to read the full error list. Local reproduction requires `xcrun altool --validate-app` or Transporter.app, but the fastest path is fixing based on the CI error message and re-pushing.

## Asynchronous Processing Failures (upload "succeeds", build still fails)

**`xcrun altool`/`upload_to_testflight` printing "Successfully uploaded" does NOT mean the build was accepted.** altool uploads with `SkipValidateProductErrors: true`, which defers binary validation to Apple's **asynchronous server-side processing**. That processing runs minutes later and can still **FAIL** the build — at which point it **silently disappears from the TestFlight valid-builds list**. There is no error at upload time, no local build failure, and the App Store Connect builds API only returns valid builds, so the failed build is effectively invisible unless you go looking.

Symptoms (all at once):
- Upload reported success, but the build never appears in the internal beta group.
- A build number you uploaded shows "failed" in the App Store Connect UI, or is just absent.
- Re-uploading the **same** build number is rejected as a duplicate (the number is consumed even though the build failed) — you must bump to a new build number to retry.

**Common async-only failures:**

| Error | Cause | Fix |
|-------|-------|-----|
| **90348** Missing `NSExtensionPointIdentifier` | An embedded `.appex` has no `NSExtension` dict — builds and uploads fine, fails async | Add the base Info.plist key; re-ship under a **new** build number. See `ios-build`. |
| **90482**/ICON errors | Required app-icon asset missing | Complete the asset catalog; re-ship under a new build number |
| Invalid Swift support / dSYM | Stripped or mismatched symbols | Re-archive with correct `DEBUG_INFORMATION_FORMAT`; re-ship |

### Diagnose async failures locally (no email needed)

Apple emails the failure, but the same server-side errors are written **locally** by altool — you don't have to wait for or rely on email:

```bash
# altool writes per-upload logs here; the newest one holds the assetDeliveryState errors
ls -t ~/Library/Logs/ContentDelivery/com.apple.itunes.altool/*.txt | head -1
```

Open the newest file and look for an `assetDeliveryState` block with `"state": "FAILED"` and an `errors` array carrying the numeric `code` (e.g. `90348`) and human-readable `description`. This is the authoritative reason, available immediately after the upload regardless of mailbox access.

> Tooling note: a TestFlight/builds-list query that filters to valid `processingState` will not show a build that failed processing. When a build "uploaded fine but isn't there," check the ContentDelivery log first, then query the builds endpoint **without** a valid-only filter (the API exposes `processingState`, including `INVALID`/`FAILED`).

---

### Developer Portal (from asc-build-check)

| Tool | Purpose |
|------|---------|
| `asc_check_signing` | Health check -- compare entitlements vs portal capabilities |
| `asc_add_capability` | Fix missing capabilities |
