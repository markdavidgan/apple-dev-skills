---
name: ios-build
category: engineering
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

## Gating a Privacy-Sensitive Symbol Per-App in a Shared SPM Package

**Problem:** A shared SPM package (e.g. a monorepo's `Kit`) is linked by several apps. One app needs a privacy-sensitive symbol (`AVCaptureDevice`, `CLLocationManager`, `CMMotionManager`, `HKHealthStore`); the others don't. If the symbol lives in the shared package, *every* app links it, and Apple's binary scanner then demands the corresponding `Info.plist` usage string from apps that have no such feature — which human review rejects as a false feature (Guideline 5.1.1). See `apple-review` → "Privacy Symbols vs Usage Strings."

**Why SPM traits don't solve this in Xcode:** SwiftPM package *traits* (the `traits:`/`enabledTraits:` feature) look like the answer, but they **cannot be toggled per-target from an Xcode `.xcodeproj`**. There's no app-level `Package.swift` to enable a dependency's trait; the `.xcodeproj` just references the product. (Traits work when the consumer is itself a SwiftPM package.) Don't reach for them in an XcodeGen/`.xcodeproj` app.

**Reliable Xcode-native fix — separate product + dependency inversion:**

1. In the shared package, split the symbol into its **own product/target**. Core stays symbol-free; it declares a protocol + a set-once registry instead of calling the symbol directly:
   ```swift
   // Core target — no AVCaptureDevice anywhere
   public protocol CameraPermissionProviding: Sendable { /* status/request */ }
   public enum CameraPermissionRegistry {
       private static let storage = Mutex<(any CameraPermissionProviding)?>(nil)  // Synchronization
       public static func register(_ p: any CameraPermissionProviding) { storage.withLock { $0 = p } }
       public static var provider: (any CameraPermissionProviding)? { storage.withLock { $0 } }
   }
   ```
   ```swift
   // Separate "Camera" target/product — the ONLY AVCaptureDevice site
   public struct AVCaptureCameraProvider: CameraPermissionProviding { /* calls AVCaptureDevice */ }
   public enum AppCamera { public static func install() { CameraPermissionRegistry.register(AVCaptureCameraProvider()) } }
   ```
   ```swift
   // Package.swift
   .library(name: "KitCamera", targets: ["KitCamera"]),
   .target(name: "KitCamera", dependencies: ["Kit"], path: "Sources/KitCamera"),
   ```
2. Only camera-using apps add the product in `project.yml` and call `install()` once at launch:
   ```yaml
   dependencies:
     - package: Kit
       product: Kit          # XcodeGen defaults `- package: Kit` to the same-named product;
     - package: Kit          # list products explicitly when a package has more than one.
       product: KitCamera
   ```
   ```swift
   // App launch (camera-using app only)
   AppCamera.install()
   ```
   Apps that don't link `KitCamera` get the core's safe no-op fallback and never link the symbol.

**Verify at the binary level (don't trust source-grep alone):**
```bash
make archive-<app>          # build a FRESH archive — stale ones in build/ predate the fix
APP=.../<App>.xcarchive/Products/Applications/<App>.app
nm "$APP/<App>" | grep -i AVCaptureDevice          # opted-out app → zero matches
grep -rl AVCaptureDevice "$APP"                     # full-bundle scan incl. embedded frameworks
otool -L "$APP/<App>" | grep -i AVFoundation        # positive control on the opted-in app
```
Run the same `nm` on a camera-using app as a positive control — it *should* show the symbol. App-level Swift compile flags do **not** propagate into a local SwiftPM dependency, so you cannot gate the symbol with an app-target `#if`; the product boundary is what does the gating.

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

### Concurrent Archives Corrupt Shared DerivedData

**Error:**

```
error: unable to write file '.../DerivedData/.../<Target>-<hash>-VFS-iphoneos/all-product-headers.yaml':
       No such file or directory (2)
** ARCHIVE FAILED **
```

**Cause:** Two `xcodebuild archive` runs sharing **one** DerivedData path race on the same VFS
overlay/header-map intermediates and clobber each other. This is **not** a code, Gemfile, or
signing failure — it is pure build-directory contention. It bites whenever archives run in
parallel: two terminals, two CI jobs on one runner, or two agents in a shared checkout. A custom
shared build location (Xcode → Locations → Derived Data → Custom) makes *every* project collide,
not just two of the same app.

**Fix (durable):** give each archive its own DerivedData so they can never share intermediates:

```bash
xcodebuild -scheme MyApp-Archive -configuration Release archive \
  -archivePath build/MyApp.xcarchive \
  -derivedDataPath build/DerivedData \   # per-app/per-job, isolated
  -destination generic/platform=iOS
```

**Fix (operational):** if you can't isolate paths, **serialize** — never start an archive while
another is in flight. Gate on `pgrep -f "xcodebuild|swift-frontend"` before launching.

**Recovery:** a poisoned archive leaves corrupt intermediates that fail repeat runs. With the
isolated path above, `rm -rf build/DerivedData` and retry. On a shared path, only clear the
corrupt `…/ArchiveIntermediates/<Scheme>` dir while **nothing else is building**, or you break
the other job.

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

## App Extension Info.plist (NSExtensionPointIdentifier)

**Every app-extension target (`type: app-extension` — WidgetKit, Live Activity, Share, Action, Notification Service, etc.) MUST have an explicit base `Info.plist` containing an `NSExtension` dict with `NSExtensionPointIdentifier`.** `GENERATE_INFOPLIST_FILE: true` does **not** synthesize these keys — it only merges `CFBundle*` keys on top of whatever base plist you provide. With no base plist, the built `.appex` ships with no `NSExtension` dict.

Why this is dangerous: a `.appex` missing this key **builds, exports, and uploads cleanly**. `xcrun altool` even prints *"Successfully uploaded"* because `SkipValidateProductErrors` defers the check. Then Apple's **asynchronous server-side processing** fails the build with **error 90348** ("The NSExtensionPointIdentifier key must be present…") and the build **silently drops out of the TestFlight valid-builds list**. There is no local build error — only a failed processing email and an absent build. (See `asc-submission` → "Asynchronous Processing Failures" for diagnosis.)

Wire it up in `project.yml` with an explicit `INFOPLIST_FILE`; keep `GENERATE_INFOPLIST_FILE: true` so Xcode still merges the version/bundle keys:

```yaml
MyApp-Widgets:
  type: app-extension
  settings:
    base:
      INFOPLIST_FILE: MyApp-Widgets/Info.plist   # explicit base — REQUIRED
      GENERATE_INFOPLIST_FILE: true               # merges CFBundle* on top; OK
```

```xml
<!-- MyApp-Widgets/Info.plist -->
<key>NSExtension</key>
<dict>
    <key>NSExtensionPointIdentifier</key>
    <string>com.apple.widgetkit-extension</string>
</dict>
```

**Point identifiers** are extension-type-specific. Verified-common values:

| Extension type | `NSExtensionPointIdentifier` |
|----------------|------------------------------|
| WidgetKit widget **and** Live Activity | `com.apple.widgetkit-extension` |
| Share extension | `com.apple.share-services` |
| Action extension | `com.apple.ui-services` |

> Live Activities are WidgetKit extensions — they use `com.apple.widgetkit-extension` (plus `NSSupportsLiveActivities` in the **main app's** Info.plist), **not** a separate "activity" point identifier. For any extension type not listed above, do **not** guess: use the exact value Xcode's own template generates for that target type, or confirm against Apple's [NSExtensionPointIdentifier docs](https://developer.apple.com/documentation/bundleresources/information-property-list/nsextension/nsextensionpointidentifier).

A Share/Action extension's base plist additionally needs `NSExtensionPrincipalClass` (e.g. `$(PRODUCT_MODULE_NAME).ShareViewController`) and an `NSExtensionAttributes`/`NSExtensionActivationRule`. WidgetKit extensions need only the point identifier.

**Catch it before upload, not after.** A `.appex` missing this key can't be caught by archive/export — validate the built bundle. To verify every embedded extension in a built `.ipa` or `.xcarchive`, run the project-agnostic `verify-appex-infoplist.sh` script (see `scripts/`), ideally as a fail-fast gate between export and `upload_to_testflight`/`altool`.

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
