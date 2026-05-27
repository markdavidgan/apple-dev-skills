---
name: ios-build
description: iOS build system patterns, validation workflows, XcodeGen, and common build failure solutions. Use for build errors, validation, and CI/CD setup.
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

**Fix:** Use MCP tools to check and fix signing:

```bash
# Check signing status
# (Use xc_check_signing MCP tool with bundle ID and expected capabilities)

# Fix with one-shot setup
# (Use xc_setup_signing MCP tool with bundle identifiers)
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
5. **Use MCP tools** for signing issues, not manual portal fixes
6. **Test on device** periodically — simulators don't catch all issues

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios-asc` — App Store Connect MCP tools for signing
- `ios-test` — Testing patterns and commands
