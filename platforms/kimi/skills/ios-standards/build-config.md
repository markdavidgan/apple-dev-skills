# Build Configuration Standards

> For project.yml, target embedding, and XcodeGen configuration.

## Watch App Embedding

### The Golden Rule: Scheme Separation, Not Target Dependency

**CRITICAL**: Never add Watch target to iOS target dependencies. This breaks local simulator builds.

Use **scheme separation** instead:

```yaml
# ❌ WRONG — Breaks local simulator builds
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch        # DON'T DO THIS
        embed: true
        codeSign: false

# ✅ CORRECT — Separate schemes for different contexts
schemes:
  MyApp-iOS:                    # For local development
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all      # Widgets OK (same platform)
        # NO Watch target here

  MyApp-iOS-Archive:            # For Xcode Cloud / distribution
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all
        MyApp-Watch: all        # Watch included in archive scheme
        MyApp-WatchComplication: all
    archive:
      config: Release
```

**Why**: Watch apps use watchOS SDK, iOS uses iOS SDK. You can't build both for iOS simulator. Xcode Cloud builds for device and can compile both.

### Watch App as Plugins (When You DO Embed)

If you must embed (legacy projects only), use `plugins` destination:

```yaml
# Legacy only — modern projects use scheme separation
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch
        embed: true
        codeSign: false
        buildPhase:
          copyFiles:
            destination: plugins
```

**Why**: Foundation extensions must be in the Plugins directory. Xcode warns: *"Foundation extension must be embedded in the parent app bundle's Plugins directory"*.

## Widget Extension Embedding

Widgets are iOS extensions, so they CAN be in iOS target dependencies:

```yaml
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Widgets
        embed: true
        codeSign: false
        buildPhase:
          copyFiles:
            destination: plugins
```

## Complete Project Structure

```yaml
name: MyApp
targets:
  MyApp-iOS:
    type: application
    platform: iOS
    sources:
      - path: Sources
    dependencies:
      - package: MyAppKit
      - target: MyApp-Widgets      # OK: iOS extension
        embed: true
        codeSign: false
        buildPhase:
          copyFiles:
            destination: plugins
      # NO Watch target dependency!

  MyApp-Watch:
    type: application
    platform: watchOS
    sources:
      - path: Watch/Sources

  MyApp-Widgets:
    type: app-extension
    platform: iOS
    sources:
      - path: Widgets/Sources

schemes:
  MyApp-iOS:
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all
    run:
      config: Debug
    test:
      config: Debug

  MyApp-iOS-Archive:
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all
        MyApp-Watch: all
    archive:
      config: Release

  MyApp-Watch:
    build:
      targets:
        MyApp-Watch: all
```

## Build Commands

### Local Development (No Watch)

```bash
# Fast, simulator builds
xcodegen generate && xcodebuild \
  -project MyApp.xcodeproj \
  -scheme MyApp-iOS \
  -sdk iphonesimulator \
  -configuration Debug \
  build
```

### Archive for Distribution (Includes Watch)

```bash
# Archive for TestFlight/App Store
xcodegen generate && xcodebuild archive \
  -project MyApp.xcodeproj \
  -scheme MyApp-iOS-Archive \
  -destination generic/platform=iOS \
  -archivePath /tmp/MyApp.xcarchive
```

## Xcode Cloud Configuration

In App Store Connect:

1. **Primary scheme**: `MyApp-iOS-Archive`
2. **Additional schemes**: Add `MyApp-Watch`

The Watch app will be built and automatically embedded.

## Adding New Frameworks

```yaml
# In target dependencies section
dependencies:
  - sdk: HealthKit.framework
  - sdk: EventKit.framework
  # Add @preconcurrency import in source files
```

## Build Settings for Swift 6

```yaml
targets:
  MyApp-iOS:
    settings:
      base:
        SWIFT_VERSION: "6.0"
        SWIFT_STRICT_CONCURRENCY: complete
        SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
        IPHONEOS_DEPLOYMENT_TARGET: "26.0"
```

## Build Verification

After project.yml changes:

```bash
# 1. Local build (should pass)
xcodegen generate && xcodebuild -scheme MyApp-iOS \
  -sdk iphonesimulator -configuration Debug \
  build 2>&1 | grep -E "error:|warning:"

# 2. Archive build (should pass)
xcodegen generate && xcodebuild archive \
  -scheme MyApp-iOS-Archive \
  -destination generic/platform=iOS \
  -archivePath /tmp/MyApp.xcarchive \
  CODE_SIGNING_ALLOWED=NO
```

## Anti-Patterns to Avoid

### ❌ The Cycle Pattern

```yaml
# This causes the local/Xcode Cloud cycle
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch    # Breaks local simulator builds!
```

**Symptoms**:
- Local build: "Unable to find module dependency: 'WatchKit'"
- Xcode Cloud: Build succeeds but no Watch app in archive

**Fix**: Use scheme separation (see above).

### ❌ Conditional Script Workarounds

```yaml
# Don't use shell scripts to work around embedding
preBuildScripts:
  - script: |
      # Fragile, breaks on Xcode updates
      if [ "$PLATFORM_NAME" = "iphonesimulator" ]; then ...
```

**Fix**: Scheme separation handles this natively.

## Extension & Watch Target Gotchas

### Extension Targets Need SKIP_INSTALL: true

Without this, `xcodebuild archive` tries to export extensions as standalone apps, causing export failures.

```yaml
# project.yml
targets:
  MyApp-Widgets:
    type: app-extension
    platform: iOS
    settings:
      base:
        SKIP_INSTALL: true    # Required for all extension targets
    sources:
      - path: Widgets/Sources
```

This applies to **all** extension types: widget extensions, intents extensions, notification extensions, watch complications, etc.

### watchOS Apps Need Their Own Assets.xcassets

Without a platform-specific icon set, "Preparing build for App Store Connect" fails silently or with a cryptic asset validation error.

Create `Watch/Assets.xcassets/AppIcon.appiconset/Contents.json` with the watchOS platform:

```json
{
  "images" : [
    {
      "idiom" : "universal",
      "platform" : "watchos",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
```

Reference it in `project.yml`:

```yaml
targets:
  MyApp-Watch:
    type: application
    platform: watchOS
    sources:
      - path: Watch/Sources
      - path: Watch/Assets.xcassets    # Must contain watchos icon set
    settings:
      base:
        ASSETCATALOG_COMPILER_APPICON_NAME: AppIcon
```

### CFBundleIconName Required in Static Info.plist

Auto-generated plists include `CFBundleIconName` automatically. If you use a static `Info.plist` (e.g., for entitlements or custom keys), you must add it manually — otherwise the app icon won't appear and App Store Connect may reject the build.

```xml
<!-- Info.plist -->
<key>CFBundleIconName</key>
<string>AppIcon</string>
```

Or in `project.yml` using `plist` settings:

```yaml
targets:
  MyApp-iOS:
    info:
      properties:
        CFBundleIconName: AppIcon
```

## Quick Self-Check

- [ ] Watch target is NOT in iOS target dependencies
- [ ] `MyApp-iOS` scheme exists for local development
- [ ] `MyApp-iOS-Archive` scheme exists with Watch target
- [ ] `MyApp-Watch` scheme exists for standalone Watch builds
- [ ] Widget targets have `destination: plugins`
- [ ] `xcodegen generate` run after changes
- [ ] Local build passes: `xcodebuild -scheme MyApp-iOS -sdk iphonesimulator`
- [ ] Archive build passes: `xcodebuild archive -scheme MyApp-iOS-Archive`
- [ ] Swift version set to 6.0
- [ ] Deployment target matches minimum iOS version
- [ ] Extension targets have `SKIP_INSTALL: true`
- [ ] watchOS app has own `Assets.xcassets` with `platform: watchos` icon set
- [ ] Static `Info.plist` files include `CFBundleIconName: AppIcon`

## Reference

- **Related**: See `BUILD_ARCHITECTURE.md` in your project for specific implementation
- **Pattern**: Scheme separation for multi-platform apps
- **Version**: 2026-03-24 (updated for Xcode 16.3, watchOS 26)
