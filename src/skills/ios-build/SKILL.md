---
name: ios-build
description: iOS build system patterns — the 4-layer validation pipeline (fast/full/export/upload), XcodeGen project config, archive-vs-debug concurrency checks, and common build-failure fixes. Use for build errors, validation before commit, signing/export problems, XcodeGen setup, or CI/CD configuration. Trigger on "build failing", "validate", "xcodebuild error", "XcodeGen", "archive build", or "set up CI".
---

# iOS Build

Build system patterns, validation workflows, and troubleshooting. **Run validation before every commit.**

---

## The 4-Layer Validation Pipeline

Use the lightest layer that matches your situation.

| Layer | Command | Time | What It Catches |
|-------|---------|------|-----------------|
| **1. Fast** | `make validate-fast` | ~30s | Lint, isolation violations, safety patterns |
| **2. Full** | `make validate` | ~3 min | Layer 1 + archive builds (Swift 6 strict concurrency) |
| **3. Export Test** | `make export-test-{app}` | ~5 min | Layer 2 + signing, provisioning, icons, entitlements |
| **4. Upload** | `bundle exec fastlane alpha` | ~10 min | Layer 3 + Apple Transporter, TestFlight processing |

### When to Use Each Layer

- **During development:** `make validate-fast` after each significant change
- **Before committing:** `make validate` at minimum
- **Before pushing:** `make export-test-{app}` for the affected app(s)
- **Release:** `bundle exec fastlane alpha` to upload

---

## Critical Rule: Archive vs Debug Builds

**Debug/simulator builds do NOT catch all strict concurrency errors.**

Swift 6 strict concurrency checking is more thorough in optimized builds:

```bash
# Debug build — misses some concurrency errors
xcodebuild -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' build

# Archive build — catches ALL concurrency errors
xcodebuild -scheme MyApp -destination 'generic/platform=iOS' archive
```

Always run archive builds before committing Swift code changes.

---

## XcodeGen

### Project Structure

```yaml
# project.yml
name: MyApp
targets:
  MyApp-iOS:
    type: application
    platform: iOS
    deploymentTarget: "26.0"
    sources:
      - MyApp-iOS
    dependencies:
      - target: MyAppKit
      - sdk: HealthKit.framework
      - sdk: Speech.framework
    settings:
      base:
        SWIFT_STRICT_CONCURRENCY: complete
        SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
        PRODUCT_BUNDLE_IDENTIFIER: com.example.myapp
    info:
      path: MyApp-iOS/Info.plist
      properties:
        UISupportedInterfaceOrientations: [UIInterfaceOrientationPortrait]
        
  MyAppKit:
    type: framework
    platform: iOS
    sources:
      - MyAppKit/Sources
```

### Regenerating Project

```bash
# After any project.yml change
xcodegen generate

# With specific spec
xcodegen generate --spec project.yml
```

### Adding Files

**Do NOT manually edit `.xcodeproj`.** XcodeGen automatically includes files from configured source directories.

```yaml
sources:
  - MyApp-iOS           # All .swift files included
  - path: Resources      # Non-code resources
    buildPhase: resources
```

### XcodeGen Hyphen to Underscore

**Critical:** XcodeGen converts hyphens in target names to underscores in Swift module names:

```yaml
# project.yml
targets:
  MyApp-iOS:           # Target name with hyphen
    # ...
```

```swift
// Generated Swift module uses underscore
@testable import MyApp_iOS  // Not MyApp-iOS
```

### Watch App Configuration

**Critical:** Watch apps require specific XcodeGen configuration to embed properly:

```yaml
# WRONG — causes Xcode Cloud archive failures
targets:
  MyApp-iOS:
    scheme:
      buildTargets:           # Don't include Watch targets here!
        - MyApp-iOS
        - MyApp-Watch         # ❌ Breaks Xcode Cloud
        
# RIGHT — embed via target dependency only
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch
        embed: true
        copyFiles:
          - destination: products/Watch
            subpath: MyAppWatch.app
            
  MyApp-Watch:
    type: application.watchapp2
    platform: watchOS
    deploymentTarget: "10.0"
    sources:
      - MyApp-Watch
```

**Key rules:**
1. Never add Watch targets to the iOS scheme's `buildTargets` — breaks Xcode Cloud
2. Use `embed: true` with `copyFiles` to `products/Watch`
3. Watch app will build automatically via target dependency

#### Watch App Icon — Xcode 17 iphoneos Thinning (Gotcha)

When archiving with `-destination generic/platform=iOS`, Xcode 17 runs actool on the **embedded Watch bundle** with `--platform iphoneos` as part of the iOS archive's thinning pass. If your Watch `AppIcon.appiconset/Contents.json` only contains a `"platform": "watchos"` entry, actool throws:

```
error: The app icon set named "AppIcon" did not have any applicable content.
```

**Fix:** Add a second `"idiom": "universal"` entry (no `platform` field) pointing to the same 1024×1024 file. The watchOS-specific entry continues to handle proper CFBundleIconName assignment for the Watch bundle; the universal entry gives iphoneos thinning something to find.

```json
{
  "images": [
    {
      "filename": "AppIcon.png",
      "idiom": "universal",
      "platform": "watchos",
      "size": "1024x1024"
    },
    {
      "filename": "AppIcon.png",
      "idiom": "universal",
      "size": "1024x1024"
    }
  ],
  "info": { "author": "xcode", "version": 1 }
}
```

The "unassigned child" warning emitted for the universal entry is harmless — it's a warning, not an error, and does not affect the archive result or altool validation.

#### Never Pass `-sdk iphoneos` to xcodebuild (Xcode 17)

Passing `-sdk iphoneos` to an xcodebuild archive command forces **all** targets — including the embedded Watch app — to compile against the iOS SDK. In Xcode 17 this causes the Watch build to fail outright.

```bash
# ❌ Broken in Xcode 17 — Watch targets compile against iOS SDK
xcodebuild -scheme MyApp-iOS -sdk iphoneos archive ...

# ✅ Correct — each platform target uses its own SDK automatically
xcodebuild -scheme MyApp-iOS -destination generic/platform=iOS archive ...
```

Remove `-sdk iphoneos` from any Fastfile `gym`/`xcodebuild` invocation and use `-destination generic/platform=iOS` only.

---

## Build Commands

### Simulator Build (Fast)

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | grep -E "error:|Build succeeded"
```

### Device Build

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'generic/platform=iOS' \
  build
```

### Archive Build (Required for Validation)

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'generic/platform=iOS' \
  -archivePath build/MyApp.xcarchive \
  archive
```

### Export Test (CI-Equivalent)

```bash
# Create export options plist
cat > exportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
</dict>
</plist>
EOF

# Export archive
xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist exportOptions.plist \
  -exportPath build/ipa
```

---

## Testing

### Unit Tests (Package)

```bash
cd MyAppKit && swift test
```

### Unit Tests (Xcode)

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests
```

### UI Tests

```bash
xcodebuild test -scheme MyApp-iOS-UITests \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max'
```

### Specific Test

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests/test_startFromIdle
```

---

## Common Build Errors

### Strict Concurrency Errors

**Error:** `Call to main actor-isolated instance method in a synchronous nonisolated context`

**Fix:** Add `@MainActor` annotation:

```swift
// Before
class ViewModel {
    func update() { }
}

// After
@MainActor
class ViewModel {
    func update() { }
}
```

### Sendable Errors

**Error:** `Non-sendable type 'X' returned by call crossing isolation boundary`

**Fix:** Use `@preconcurrency import` or extract values:

```swift
@preconcurrency import EventKit

@MainActor
final class Service {
    private let store = EKEventStore()
}
```

### Task Isolation Errors

**Error:** `Reference to captured var 'self' in concurrently-executing code`

**Fix:** Use `[weak self]` with explicit isolation:

```swift
// Wrong
Task {
    await self.update()
}

// Right
Task { @MainActor [weak self] in
    guard let self = self else { return }
    await self.update()
}
```

### Missing Provisioning Profile

**Error:** `No profiles for 'com.example.app' were found`

**Fix:** Use ASC MCP tools to check and fix signing:

```bash
# Check signing status against Developer Portal
asc_check_signing --bundle-id com.example.app --capabilities push-notifications,app-groups

# List available certificates and profiles
asc_list_certificates
asc_list_profiles --type IOS_APP_DEVELOPMENT

# Create a new certificate if needed
asc_create_certificate --type DISTRIBUTION
```

### DerivedData Issues

```bash
# Clear DerivedData for this project
rm -rf ~/Library/Developer/Xcode/DerivedData/MyApp-*

# Clear all DerivedData (nuclear option)
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### SwiftData Model Changes

**Error:** Crash after changing @Model properties

**Fix:** Delete app to recreate database:

```bash
xcrun simctl uninstall booted com.example.myapp
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  test:
    runs-on: macos-15
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.4.8
          bundler-cache: true
      
      - name: Install XcodeGen
        run: brew install xcodegen
      
      - name: Generate Project
        run: xcodegen generate
      
      - name: Run Package Tests
        run: cd MyAppKit && swift test
      
      - name: Archive Build (catches concurrency errors)
        run: |
          xcodebuild archive \
            -scheme MyApp-iOS \
            -destination 'generic/platform=iOS' \
            -archivePath build/MyApp.xcarchive
      
      - name: Run Unit Tests
        run: |
          xcodebuild test \
            -scheme MyApp-iOS \
            -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
            -only-testing:MyAppTests | xcpretty
```

### Fastlane Integration

```ruby
# fastlane/Fastfile
lane :test do
  run_tests(scheme: "MyApp-iOS")
end

lane :archive do
  build_app(
    scheme: "MyApp-iOS",
    export_method: "app-store"
  )
end

lane :alpha do
  increment_build_number
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight
end
```

---

## macOS TestFlight & App Store

macOS builds follow different export and distribution paths than iOS. The standard Fastlane `build_app` + `upload_to_testflight` patterns are iOS-centric and break on macOS.

### macOS Archive + Export

```bash
# Archive (automatic signing + ASC API key auth)
xcodebuild -project MyApp.xcodeproj \
  -scheme MyApp \
  -configuration Release \
  archive \
  -archivePath build/MyApp.xcarchive \
  -destination 'generic/platform=macOS' \
  -allowProvisioningUpdates \
  -authenticationKeyPath ~/.private_keys/AuthKey_XXXXXX.p8 \
  -authenticationKeyID <KEY_ID> \
  -authenticationKeyIssuerID <ISSUER_ID> \
  CODE_SIGN_STYLE=Automatic \
  CODE_SIGN_IDENTITY='Apple Development' \
  PROVISIONING_PROFILE_SPECIFIER='' \
  DEVELOPMENT_TEAM=<TEAM_ID>

# Export as .pkg (Mac App Store distribution)
cat > /tmp/exportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ...>
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>   <!-- NOT "app-store" -->
  <key>teamID</key>
  <string>YOUR_TEAM_ID</string>
  <key>signingStyle</key>
  <string>automatic</string>
  <key>thinning</key>
  <string>&lt;none&gt;</string>
</dict>
</plist>
EOF

xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist /tmp/exportOptions.plist \
  -exportPath build \
  -allowProvisioningUpdates \
  -authenticationKeyPath ~/.private_keys/AuthKey_XXXXXX.p8 \
  -authenticationKeyID <KEY_ID> \
  -authenticationKeyIssuerID <ISSUER_ID>
# Produces: build/MyApp.pkg
```

### Fastlane macOS Limitations (Critical)

Fastlane's `pilot` and `build_app` actions have **known macOS incompatibilities** as of 2.235.0:

| Action | iOS | macOS | Workaround |
|--------|-----|-------|------------|
| `build_app` / `gym` | ✅ Produces `.ipa` | ❌ Not designed for `.pkg` | Use raw `xcodebuild` archive + export |
| `upload_to_testflight` / `pilot` | ✅ Uploads `.ipa` | ✅ Uploads `.pkg` via `pkg:` param | Works, but see below |
| `pilot list` | ✅ Lists builds | ❌ `'betaBuildMetrics' is not a valid relationship name` | Use Spaceship directly |
| `pilot distribute` | ✅ Adds to groups | ❌ Prompts for platform interactively; crashes non-interactive | Use Spaceship directly |
| `set_changelog` (action) | ✅ Sets "What to Test" | ❌ Built-in action doesn't target macOS builds reliably | Use Spaceship directly |

### Spaceship Workarounds for macOS TestFlight

When fastlane actions fail for macOS, use Spaceship directly in your `Fastfile`:

```ruby
def asc_api_token
  Spaceship::ConnectAPI::Token.create(
    key_id: ENV["ASC_KEY_ID"],
    issuer_id: ENV["ASC_ISSUER_ID"],
    filepath: ENV["ASC_KEY_PATH"]
  )
end

# Set "What to Test" changelog for the latest macOS build
lane :update_beta_changelog do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find("com.example.app")
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }

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
end

# Distribute macOS build to a beta group
lane :distribute_macos_alpha do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find("com.example.app")
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }
  group = app.get_beta_groups.find { |g| g.name == options[:group] }

  current = group.fetch_builds  # NOTE: fetch_builds, NOT get_builds
  unless current.any? { |b| b.id == build.id }
    Spaceship::ConnectAPI.add_beta_groups_to_build(
      build_id: build.id,
      beta_group_ids: [group.id]
    )
  end
end
```

**Key Spaceship API notes for macOS:**
- `Build#get_beta_build_localizations` — returns existing `BetaBuildLocalization` objects
- `post_beta_build_localizations(build_id:, attributes: { locale:, whatsNew: })` — `attributes:` is a Hash, not keyword args
- `patch_beta_build_localizations(localization_id:, attributes: { whatsNew: })` — update existing localization
- `BetaGroup#fetch_builds` — list builds in a group (method name is `fetch_builds`, not `get_builds`)
- `add_beta_groups_to_build(build_id:, beta_group_ids:)` — add build to groups

### Fastfile Naming Conflicts

Avoid naming lanes after built-in fastlane actions:

```ruby
# WRONG — conflicts with built-in `set_changelog` action
lane :set_changelog do ... end

# RIGHT
lane :update_beta_changelog do ... end
```

---

## CI/CD Gotchas

### Build Number Regression

**Critical:** TestFlight rejects uploads with regressed build numbers:

```bash
# WRONG — hardcoded build number
# If TestFlight has build 50, and you upload build 45:
# Apple silently rejects the upload

# RIGHT — inject via agvtool in ci_pre_xcodebuild.sh
#!/bin/bash
agvtool new-version -all "${CI_BUILD_NUMBER}"
```

**Never rely on Xcode Cloud's "Manage Version and Build Number" setting** — it's unreliable and causes conflicts.

### DerivedData Corruption + Fastlane Clean

**Critical:** Corrupted DerivedData + `clean: true` = 30+ minute builds:

```ruby
# WRONG — clean every build
build_app(
  scheme: "MyApp-iOS",
  clean: true  # ❌ 30+ min builds if DerivedData corrupted
)

# RIGHT — only clean when necessary
build_app(
  scheme: "MyApp-iOS"
  # clean: false (default) — incremental builds
)
```

Fix corrupted DerivedData manually:
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/MyApp-*
```

### App Store Keywords with Apple Trademarks

Apple rejects apps with trademarked terms in keywords:

```
# keywords.txt — REJECTED
keynote,presentation,powerpoint,slides

# keywords.txt — ACCEPTED
presentation,speech,timer,practice,talk
```

**Never include:** keynote, powerpoint, keynote remote, final cut, logic pro, etc.

### Usage Descriptions for Unused Capabilities

Apple rejects apps declaring usage descriptions for capabilities they don't use:

```xml
<!-- REJECTED — app doesn't actually use health data -->
<key>NSHealthShareUsageDescription</key>
<string>This app does not use health data</string>
```

Remove the entitlement entirely if not used.

---

## Build Settings Reference

### Essential Swift 6 Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `SWIFT_VERSION` | `6.0` | Swift 6 language mode |
| `SWIFT_STRICT_CONCURRENCY` | `complete` | Full concurrency checking |
| `SWIFT_DEFAULT_ACTOR_ISOLATION` | `MainActor` | UI isolation by default |

### In project.yml

```yaml
settings:
  base:
    SWIFT_VERSION: "6.0"
    SWIFT_STRICT_CONCURRENCY: complete
    SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
    ENABLE_USER_SCRIPT_SANDBOXING: NO
    GENERATE_INFOPLIST_FILE: NO
```

---

## Best Practices

1. **Always run archive builds** before committing — debug builds miss concurrency errors
2. **Use `make validate`** as a pre-commit check
3. **Regenerate project** after project.yml changes
4. **Clear DerivedData** when builds behave strangely
5. **Use ASC MCP tools** (`asc_check_signing`, `asc_list_profiles`) for signing issues, not manual portal fixes
6. **Test on device** periodically — simulators don't catch all issues

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios-asc` — App Store Connect MCP tools for signing
- `ios-test` — Testing patterns and commands
