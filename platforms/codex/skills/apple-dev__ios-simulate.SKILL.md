---
name: ios-simulate
category: engineering
description: iOS Simulator workflows via xcrun simctl — boot and shutdown devices, automate screenshots and video, install/uninstall apps, set appearance, and control device state. Use when running an app in the Simulator, capturing screenshots for the App Store or docs, or managing simulator devices. Trigger on "simulator", "simctl", "boot a device", "take a screenshot", "record video", "set dark mode", or "reset simulator".
---

# iOS Simulate

iOS Simulator management, screenshot automation, and device control via `xcrun simctl`. Use for testing, screenshots, and simulator-based workflows.

---

## Quick Reference

| Task | Command |
|------|---------|
| List devices | `xcrun simctl list devices available` |
| Boot simulator | `xcrun simctl boot "iPhone 17 Pro Max"` |
| Screenshot | `xcrun simctl io booted screenshot output.png` |
| Record video | `xcrun simctl io booted recordVideo output.mp4` |
| Install app | `xcrun simctl install booted MyApp.app` |
| Uninstall app | `xcrun simctl uninstall booted com.example.app` |
| Set dark mode | `xcrun simctl ui booted appearance dark` |
| Open URL | `xcrun simctl openurl booted https://example.com` |

---

## Simulator Management

### List Available Simulators

```bash
# All devices (including unavailable)
xcrun simctl list devices

# Only available devices
xcrun simctl list devices available

# JSON output (for scripting)
xcrun simctl list devices available -j

# Filter by device type
xcrun simctl list devices | grep "iPhone"
```

### Boot and Shutdown

```bash
# Boot a specific device by name
xcrun simctl boot "iPhone 17 Pro Max"

# Boot by UDID
xcrun simctl boot 4C6DD567-0C7E-476D-8946-8CA9A21A9452

# Wait for boot to complete
xcrun simctl bootstatus "iPhone 17 Pro Max" -b

# Shutdown
xcrun simctl shutdown "iPhone 17 Pro Max"

# Shutdown all simulators
xcrun simctl shutdown all

# Check if running
xcrun simctl list devices | grep "iPhone 17 Pro Max" | grep "Booted"
```

### Create Custom Simulators

```bash
# List available device types
xcrun simctl list devicetypes

# List available runtimes
xcrun simctl list runtimes

# Create custom simulator
xcrun simctl create "My iPhone 15" "iPhone 15" "iOS17.4"

# Delete simulator
xcrun simctl delete "My iPhone 15"

# Erase all content and settings
xcrun simctl erase "iPhone 17 Pro Max"
```

### Open Simulator App

```bash
# Open Simulator.app
open -a Simulator

# Open with specific device
xcrun simctl boot "iPhone 17 Pro Max" && open -a Simulator
```

---

## App Management

### Install and Uninstall

```bash
# Install app from .app bundle
xcrun simctl install booted /path/to/MyApp.app

# Install by device name
xcrun simctl install "iPhone 17 Pro Max" /path/to/MyApp.app

# Uninstall by bundle ID
xcrun simctl uninstall booted com.example.myapp

# Get app container path
xcrun simctl get_app_container booted com.example.myapp data
```

### Launch and Terminate

```bash
# Launch app
xcrun simctl launch booted com.example.myapp

# Launch with arguments
xcrun simctl launch booted com.example.myapp --uitesting

# Terminate app
xcrun simctl terminate booted com.example.myapp

# Get app PID
xcrun simctl spawn booted pgrep -x MyApp
```

### Reset App State

```bash
# Uninstall and reinstall (cleanest reset)
xcrun simctl uninstall booted com.example.myapp
xcrun simctl install booted /path/to/MyApp.app

# Erase entire simulator (nuclear option)
xcrun simctl erase booted
```

---

## Screenshot Automation

### Basic Screenshot Capture

```bash
# Capture screenshot of booted device
xcrun simctl io booted screenshot screenshot.png

# Capture specific device
xcrun simctl io "iPhone 17 Pro Max" screenshot screenshot.png

# Capture with timestamp
xcrun simctl io booted screenshot "screenshot-$(date +%Y%m%d-%H%M%S).png"
```

### Dual-Path Architecture

The example project uses two screenshot paths with different purposes:

#### ASC Path (Committed, High Quality)

For App Store Connect screenshots — strict requirements, committed to git.

```bash
# ASC requirements:
# - iPhone 17 Pro Max (1290×2796)
# - Status bar: 9:41 AM, 100% battery
# - Clean app state
# - PNG format, no alpha

# Manual capture script
./scripts/asc-screenshots/manual-capture.sh

# Validate ASC compliance
./scripts/asc-screenshots/validate.sh

# Output location
apps/focus/fastlane/screenshots/en-US/
```

#### Verification Path (Debug/PR, Git-Ignored)

For debugging, design reviews, PR validation — quick capture, not committed.

```bash
# Quick capture script
./scripts/verify-screenshots/capture.sh -n "dark-mode-timer"

# With options
./scripts/verify-screenshots/capture.sh \
  -n "settings-screen" \
  -d "iPad Pro (12.9-inch)" \
  -a dark

# Output location (git-ignored)
apps/focus/.build/verification-screenshots/
```

### Status Bar Override

**Note:** Status bar override works on iOS 25 and below. iOS 26+ does not support this feature.

```bash
# Set 9:41 AM, full bars, 100% battery (iOS 25 and below)
xcrun simctl status_bar booted override \
  --time "09:41" \
  --dataNetwork wifi \
  --wifiMode active \
  --wifiBars 3 \
  --cellularMode active \
  --operatorName '' \
  --cellularBars 4 \
  --batteryState charged \
  --batteryLevel 100

# Clear status bar override
xcrun simctl status_bar booted clear
```

### Screenshot with Device Frame

```bash
# Capture and add device frame using frameit (Fastlane)
bundle exec fastlane frameit

# Manual framing with ImageMagick
convert screenshot.png device-frame.png -composite final.png
```

### Dark Mode Screenshots

```bash
# Set dark mode
xcrun simctl ui booted appearance dark

# Set light mode
xcrun simctl ui booted appearance light

# Capture sequence
xcrun simctl ui booted appearance light
xcrun simctl io booted screenshot light-mode.png
xcrun simctl ui booted appearance dark
xcrun simctl io booted screenshot dark-mode.png
```

---

## Video Recording

### Record Simulator Video

```bash
# Start recording
xcrun simctl io booted recordVideo demo.mp4

# Record with H264 codec
xcrun simctl io booted recordVideo --codec h264 demo.mp4

# Force overwrite existing file
xcrun simctl io booted recordVideo --force demo.mp4

# Stop recording (Ctrl+C or kill process)
```

### Background Recording Script

```bash
# Record in background
xcrun simctl io booted recordVideo --codec h264 --force output.mp4 &
RECORD_PID=$!

# Run your tests or interactions
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator'

# Stop recording
kill "$RECORD_PID"
```

### Marketing Demo Recording

```bash
# Full demo sequence
./scripts/record-demo-sim.sh

# Single hero shot
./scripts/record-demo-sim.sh testHero_03_TheStage

# Slower pace for demos
MARKETING_DEMO_SLOW=1 ./scripts/record-demo-sim.sh
```

---

## Device State Management

### Appearance (Light/Dark Mode)

```bash
# Set dark mode
xcrun simctl ui booted appearance dark

# Set light mode
xcrun simctl ui booted appearance light

# Check current appearance
xcrun simctl ui booted appearance
```

### Locale and Language

```bash
# Set locale
xcrun simctl spawn booted defaults write NSGlobalDomain AppleLocale "de_DE"

# Set language
xcrun simctl spawn booted defaults write NSGlobalDomain AppleLanguages "(de)"

# Restart app to apply
xcrun simctl terminate booted com.example.myapp
xcrun simctl launch booted com.example.myapp
```

### Time and Date

```bash
# Set specific time (iOS 25 and below via status_bar)
xcrun simctl status_bar booted override --time "09:41"

# Note: Full date/time override requires device restart or status_bar
```

### Dynamic Type (Text Size)

```bash
# Set content size category
xcrun simctl spawn booted defaults write com.apple.UIKit \
  UIContentSizeCategoryPreferenceKey -string UICTContentSizeCategoryAccessibilityExtraLarge

# Available sizes:
# - UICTContentSizeCategoryExtraSmall
# - UICTContentSizeCategorySmall
# - UICTContentSizeCategoryMedium
# - UICTContentSizeCategoryLarge (default)
# - UICTContentSizeCategoryExtraLarge
# - UICTContentSizeCategoryExtraExtraLarge
# - UICTContentSizeCategoryExtraExtraExtraLarge
# - UICTContentSizeCategoryAccessibilityMedium
# - UICTContentSizeCategoryAccessibilityLarge
# - UICTContentSizeCategoryAccessibilityExtraLarge
# - UICTContentSizeCategoryAccessibilityExtraExtraLarge
# - UICTContentSizeCategoryAccessibilityExtraExtraExtraLarge
```

---

## Permissions and Privacy

### Grant Permissions

```bash
# Grant all permissions for app
xcrun simctl privacy booted grant all com.example.myapp

# Grant specific permission types
xcrun simctl privacy booted grant camera com.example.myapp
xcrun simctl privacy booted grant microphone com.example.myapp
xcrun simctl privacy booted grant photos com.example.myapp
xcrun simctl privacy booted grant location com.example.myapp
xcrun simctl privacy booted grant notifications com.example.myapp
```

### Revoke Permissions

```bash
# Revoke all permissions
xcrun simctl privacy booted revoke all com.example.myapp

# Revoke specific permission
xcrun simctl privacy booted revoke camera com.example.myapp
```

### Reset Privacy

```bash
# Reset all privacy settings
xcrun simctl privacy booted reset all

# Reset specific permission type
xcrun simctl privacy booted reset camera
```

### List Permission Types

```bash
xcrun simctl privacy booted list
```

---

## Push Notifications

### Send Push Notification

```bash
# Send push with JSON payload
cat > notification.json << 'EOF'
{
  "aps": {
    "alert": {
      "title": "Hello",
      "body": "This is a test notification"
    },
    "badge": 1,
    "sound": "default"
  }
}
EOF

xcrun simctl push booted com.example.myapp notification.json
```

### Send Silent Push

```bash
cat > silent-push.json << 'EOF'
{
  "aps": {
    "content-available": 1
  },
  "custom-data": "value"
}
EOF

xcrun simctl push booted com.example.myapp silent-push.json
```

---

## Location Simulation

### Set Location

```bash
# Set specific coordinates (latitude, longitude)
xcrun simctl location booted set 37.7749,-122.4194

# Set location by place name (if supported)
xcrun simctl location booted set "San Francisco, CA"
```

### Simulate Movement

```bash
# Start freeway drive simulation
xcrun simctl location booted start freeway_drive

# Start city run simulation
xcrun simctl location booted start city_run

# Stop location simulation
xcrun simctl location booted stop
```

### Clear Location

```bash
xcrun simctl location booted clear
```

---

## System Events

### Memory Warning

```bash
# Simulate memory warning
xcrun simctl spawn booted notifyutil -p com.apple.system.lowmemory
```

### Open URL

```bash
# Open web URL
xcrun simctl openurl booted https://example.com

# Open custom URL scheme
xcrun simctl openurl booted myapp://screen/settings

# Open with query parameters
xcrun simctl openurl booted "myapp://item?id=123"
```

### Send Text Input

```bash
# Send text (requires app to be focused)
xcrun simctl spawn booted simctl type "Hello World"
```

### Hardware Buttons

```bash
# Simulate home button press
xcrun simctl spawn booted simctl press home

# Note: Other hardware buttons require UI automation or accessibility APIs
```

---

## File Operations

### Copy Files to Simulator

```bash
# Copy file to documents directory
xcrun simctl addmedia booted /path/to/photo.jpg

# Copy to specific app container
xcrun simctl install booted /path/to/MyApp.app
doc_path=$(xcrun simctl get_app_container booted com.example.myapp documents)
cp /path/to/file.txt "$doc_path/"
```

### Access App Data

```bash
# Get app container paths
xcrun simctl get_app_container booted com.example.myapp app
xcrun simctl get_app_container booted com.example.myapp data
xcrun simctl get_app_container booted com.example.myapp groups
xcrun simctl get_app_container booted com.example.myapp documents

# List app files
ls -la $(xcrun simctl get_app_container booted com.example.myapp documents)
```

---

## Fastlane Snapshot Integration

### Run Snapshot Tests

```bash
# Run all snapshot tests
bundle exec fastlane snapshot

# Run for specific devices
bundle exec fastlane snapshot --devices "iPhone 17 Pro Max"

# Run specific language
bundle exec fastlane snapshot --languages "en-US"
```

### Snapshot Configuration

```ruby
# fastlane/Snapfile
devices([
  "iPhone 17 Pro Max",
  "iPhone 15 Plus",
  "iPad Pro (12.9-inch) (6th generation)"
])

languages([
  "en-US"
])

output_directory("./fastlane/screenshots")
clear_previous_screenshots(true)
```

---

## Common Workflows

### Full Screenshot Sequence

```bash
#!/bin/bash
set -e

DEVICE="iPhone 17 Pro Max"
APP_BUNDLE="com.example.myapp"
OUTPUT_DIR="./screenshots"

# Setup
mkdir -p "$OUTPUT_DIR"
xcrun simctl boot "$DEVICE" 2>/dev/null || true
xcrun simctl bootstatus "$DEVICE" -b > /dev/null 2>&1

# Reset state
xcrun simctl uninstall booted "$APP_BUNDLE" 2>/dev/null || true
xcrun simctl install booted ./build/MyApp.app

# Light mode screenshots
xcrun simctl ui booted appearance light
xcrun simctl launch booted "$APP_BUNDLE"
sleep 2
xcrun simctl io booted screenshot "$OUTPUT_DIR/01-home-light.png"

# Dark mode screenshots
xcrun simctl ui booted appearance dark
xcrun simctl terminate booted "$APP_BUNDLE"
xcrun simctl launch booted "$APP_BUNDLE"
sleep 2
xcrun simctl io booted screenshot "$OUTPUT_DIR/02-home-dark.png"

echo "Screenshots saved to $OUTPUT_DIR"
```

### Automated UI Test with Screenshots

```bash
#!/bin/bash
set -e

# Boot simulator
xcrun simctl boot "iPhone 17 Pro Max" 2>/dev/null || true
xcrun simctl bootstatus "iPhone 17 Pro Max" -b > /dev/null 2>&1

# Run UI tests with screenshot capture
xcodebuild test \
  -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppUITests/ScreenshotTests
```

---

## Troubleshooting

### Simulator Won't Boot

```bash
# Shutdown all simulators first
xcrun simctl shutdown all

# Boot specific device
xcrun simctl boot "iPhone 17 Pro Max"

# If still failing, erase and recreate
xcrun simctl erase "iPhone 17 Pro Max"
xcrun simctl boot "iPhone 17 Pro Max"
```

### Screenshot Fails

```bash
# Ensure simulator is booted
xcrun simctl list devices | grep "Booted"

# Try explicit device instead of 'booted'
xcrun simctl io "iPhone 17 Pro Max" screenshot test.png

# Check permissions
ls -la ~/Library/Developer/CoreSimulator/Devices/
```

### App Won't Install

```bash
# Check app bundle exists and is valid
ls -la /path/to/MyApp.app

# Check bundle ID matches
plutil -p /path/to/MyApp.app/Info.plist | grep CFBundleIdentifier

# Try uninstall first
xcrun simctl uninstall booted com.example.myapp
xcrun simctl install booted /path/to/MyApp.app
```

### Performance Issues

```bash
# Check simulator processes
ps aux | grep -i simulator

# Kill stuck simulators
killall -9 Simulator
killall -9 com.apple.CoreSimulator.SimulatorTrampoline

# Reset all simulators (nuclear)
xcrun simctl erase all
```

---

## Best Practices

1. **Use device names, not UDIDs** in scripts — UDIDs vary between machines
2. **Always use `bootstatus -b`** to wait for boot completion before operations
3. **Reset app state** between screenshot captures for consistency
4. **Use `booted`** alias for the currently booted device
5. **Commit ASC screenshots** to git; keep verification screenshots git-ignored
6. **Set status bar** to 9:41 AM for professional screenshots (iOS 25 and below)
7. **Use dual-path architecture** — separate committed ASC assets from debug captures
8. **Automate with scripts** — manual simulator operations are error-prone

---

## See Also

- `ios-build` — Build validation and XcodeGen
- `ios-standards` — Swift 6 concurrency patterns
- `ios-test` — Testing patterns and UI automation
