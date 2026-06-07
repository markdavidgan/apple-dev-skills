# Xcode Cloud UI Testing & Screenshots

**Use Xcode Cloud's build agents to run UI tests and capture App Store screenshots on real device configurations.**

---

## When to Use Xcode Cloud for UI Tests

| Scenario | Why Xcode Cloud Helps |
|----------|----------------------|
| **Parallel device coverage** | Run the same test suite across multiple device sizes and iOS versions simultaneously |
| **Clean environment** | Every build starts from a fresh simulator state — no leaked UserDefaults, Keychain, or stale app data |
| **CI gate** | Block merges on UI test results without maintaining local simulator infrastructure |
| **Screenshot pipeline** | Capture App Store screenshots on the exact device sizes Apple requires, with deterministic data |
| **Team consistency** | Everyone triggers the same workflow; no "works on my machine" simulator differences |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Local (Development Machine)                                │
│  ┌──────────────┐    ┌──────────────┐                      │
│  │ Write tests  │ →  │ git commit   │                      │
│  │ Edit code    │    │ push main    │                      │
│  └──────────────┘    └──────────────┘                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Xcode Cloud (Apple Build Agents)                           │
│  ┌────────────────────┐        ┌────────────────────┐      │
│  │ UI Tests Workflow  │        │ Screenshots Flow   │      │
│  │ (test action)      │        │ (test action)      │      │
│  │                    │        │                    │      │
│  │ Run test plan      │        │ Seed data          │      │
│  │ Assert + Report    │        │ Navigate screens   │      │
│  └────────────────────┘        │ Capture PNG        │      │
│                                │ + XCTAttachment    │      │
│                                └────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Test Plans

Test plans (`.xctestplan`) are the Xcode-native way to control which tests run and how.

**Why use them:**
- Selectively enable/disable tests without code changes
- Share the same plan across local development and CI
- Xcode Cloud workflows reference test plans directly

**Example test plan structure:**

```json
{
  "configurations": [{ "id": "UI-Tests", "name": "UI Tests" }],
  "defaultOptions": {
    "testExecutionOrdering": "random",
    "commandLineArgumentEntries": [
      { "argument": "--uitesting" }
    ]
  },
  "testTargets": [
    {
      "target": {
        "containerPath": "container:MyApp.xcodeproj",
        "identifier": "MyApp-UITests",
        "name": "MyApp-UITests"
      }
    }
  ],
  "version": 1
}
```

**Typical test plans:**

| Plan | Purpose | Content |
|------|---------|---------|
| `MyApp-UITests.xctestplan` | Regression suite | All UI tests |
| `MyApp-Screenshots.xctestplan` | App Store capture | Screenshot tests only |
| `MyApp-Smoke.xctestplan` | Fast gate | Critical path tests only |

---

## 2. Xcode Cloud Workflow Setup

### Creating a Test Workflow

1. **App Store Connect** → Xcode Cloud → Your App → Create Workflow
2. **Action:** `Test`
3. **Scheme:** Your UI test scheme (e.g., `MyApp-iOS-UITests`)
4. **Test Plan:** Select your `.xctestplan`
5. **Start Conditions:** None (manual-only) or branch/tag triggers
6. **Device:** Select via `testConfiguration.testDestinations`

### Required API Fields for TEST Actions

When creating a workflow via the App Store Connect API, `TEST` actions require `testConfiguration` with `testDestinations`:

```json
{
  "actions": [{
    "name": "Test - iOS",
    "actionType": "TEST",
    "destination": "ANY_IOS_DEVICE",
    "scheme": "MyApp-iOS-UITests",
    "platform": "IOS",
    "isRequiredToPass": true,
    "testConfiguration": {
      "testDestinations": [
        {
          "deviceTypeName": "iPhone 17 Pro Max",
          "deviceTypeIdentifier": "com.apple.CoreSimulator.SimDeviceType.iPhone-17-Pro-Max",
          "runtimeName": "iOS 26.5",
          "runtimeIdentifier": "com.apple.CoreSimulator.SimRuntime.iOS-26-5"
        }
      ]
    }
  }]
}
```

**Key fields:**

| Field | Description |
|-------|-------------|
| `deviceTypeName` | Human-readable device name |
| `deviceTypeIdentifier` | CoreSimulator identifier (required) |
| `runtimeName` | Human-readable OS version |
| `runtimeIdentifier` | CoreSimulator runtime identifier (required) |

**Common device identifiers:**

| Device | `deviceTypeIdentifier` |
|--------|------------------------|
| iPhone 17 Pro Max | `com.apple.CoreSimulator.SimDeviceType.iPhone-17-Pro-Max` |
| iPhone 17 Pro | `com.apple.CoreSimulator.SimDeviceType.iPhone-17-Pro` |
| iPhone 17 | `com.apple.CoreSimulator.SimDeviceType.iPhone-17` |
| iPhone SE (3rd gen) | `com.apple.CoreSimulator.SimDeviceType.iPhone-SE-3rd-generation` |
| iPad Pro 13-inch (M4) | `com.apple.CoreSimulator.SimDeviceType.iPad-Pro-13-inch-M4-8GB` |

**Common runtime identifiers:**

| Runtime | `runtimeIdentifier` |
|---------|---------------------|
| iOS 26.5 | `com.apple.CoreSimulator.SimRuntime.iOS-26-5` |
| iOS 26.4 | `com.apple.CoreSimulator.SimRuntime.iOS-26-4` |
| iOS 17.5 | `com.apple.CoreSimulator.SimRuntime.iOS-17-5` |

You can discover available combinations via the ASC API:
- `GET /v1/ciXcodeVersions` — lists devices and runtimes per version
- `GET /v1/ciMacOsVersions` — lists macOS build environments

---

## 3. Screenshot Capture Pattern

When capturing screenshots in UI tests for Xcode Cloud, use a **dual-output helper**:

1. **`XCTAttachment(screenshot:)`** — Xcode Cloud automatically collects these in the test result bundle
2. **PNG file on disk** — Extracted via `ci_post_xcodebuild.sh` for easy download

### Helper Implementation

```swift
import XCTest

@MainActor
final class ScreenshotCaptureHelper {

    static func capture(named name: String, app: XCUIApplication, testCase: XCTestCase) {
        let screenshot = XCUIScreen.main.screenshot()

        // 1. XCTAttachment — collected in Xcode Cloud test results
        let attachment = XCTAttachment(screenshot: screenshot)
        attachment.name = name
        attachment.lifetime = .keepAlways
        testCase.add(attachment)

        // 2. Standalone PNG — extracted via post-build script
        let outputDir = screenshotOutputDirectory()
        try? FileManager.default.createDirectory(at: outputDir, withIntermediateDirectories: true)

        let fileURL = outputDir.appendingPathComponent("\(name).png")
        try? screenshot.pngRepresentation.write(to: fileURL)
    }

    private static func screenshotOutputDirectory() -> URL {
        let source = URL(fileURLWithPath: #file)
        let repoRoot = source
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .deletingLastPathComponent()
        return repoRoot.appendingPathComponent("apps/myapp/.build/screenshots", isDirectory: true)
    }
}
```

### Post-Build Artifact Collection

In `ci_post_xcodebuild.sh`:

```bash
#!/bin/sh
# Collect screenshot artifacts from test runs

SCREENSHOT_DIR="${REPO_ROOT}/apps/myapp/.build/screenshots"

if [ -d "${SCREENSHOT_DIR}" ] && [ "$(ls -A "${SCREENSHOT_DIR}")" ]; then
    ZIP_NAME="screenshots-${CI_BUILD_NUMBER:-manual}.zip"
    (cd "$(dirname "$SCREENSHOT_DIR")" && zip -r "${ZIP_NAME}" screenshots/)
    echo "✅ Screenshots archived: ${ZIP_NAME}"
fi
```

---

## 4. Retrieving Results

### UI Test Results

| Source | How to Access |
|--------|---------------|
| **Xcode Cloud Web UI** | Build → Tests tab → pass/fail per test |
| **Test Attachments** | Build → Tests → Click test → View screenshots |
| **Result Bundle** | Download `.xcresult` → open in Xcode |
| **Build Artifacts** | Download workflow artifacts ZIP |

### Screenshot Artifacts

Screenshots are available in **three places**:

1. **Xcode Cloud Web UI** → Tests → Individual test → Screenshot attachments
2. **`.xcresult` bundle** → Open in Xcode's Test navigator
3. **Post-build ZIP** → If your `ci_post_xcodebuild.sh` zips them

---

## 5. Best Practices

### Deterministic Data

Always seed data before capturing. Use a dedicated seeder that runs via launch arguments:

```swift
private func launchWithScenario(_ scenario: TestDataScenario) {
    TestDataSeeder.seed(scenario, in: app)
    app.launchArguments.append("--uitesting")
    app.launch()
}
```

### Serial Execution for Screenshots

Screenshots must run serially to avoid race conditions in state:

```yaml
# In your xctestplan
defaultOptions:
  testExecutionOrdering: sequential
```

### Parallel Execution for Speed

Regression UI tests can run in parallel:

```yaml
defaultOptions:
  testExecutionOrdering: random
```

### Test Target Attributes

In `project.yml` (XcodeGen) or Xcode scheme settings:

```yaml
testTargetAttributes:
  - target: MyApp-UITests
    parallelizable: true
  - target: MyApp-Screenshots
    parallelizable: false  # Screenshots must be serial
```

### Device Selection Strategy

| Purpose | Recommended Device |
|---------|-------------------|
| App Store screenshots (6.9") | iPhone 17 Pro Max |
| App Store screenshots (6.3") | iPhone 17 Pro |
| App Store screenshots (4.7") | iPhone SE (3rd gen) |
| Regression tests | iPhone 17 Pro Max (primary) + iPad Pro (if supported) |

---

## 6. Workflow Types

| Workflow | Action | When to Trigger |
|----------|--------|-----------------|
| **UI Regression** | `test` | Before releases, after UI changes, nightly |
| **Screenshot Capture** | `test` | Before App Store submission, after redesigns |
| **Smoke Tests** | `test` | On every PR (fast critical-path only) |

---

## 7. Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Build fails with "scheme not found" | `.xcodeproj` out of sync | Regenerate via `xcodegen generate` |
| `Invalid device type` | Wrong `deviceTypeIdentifier` | Use exact CoreSimulator identifier |
| Screenshots missing | Test failed before capture | Check assertion failure in test logs |
| Wrong test plan used | `testPlanName` empty / mismatched | Verify test plan is attached to scheme |
| Test timeouts | Slow agent or heavy setup | Increase `executionTimeAllowance` |
| Permission dialogs block UI | System alerts not dismissed | Add `addUIInterruptionMonitor` |

---

## References

- App Store Connect API: `POST /v1/ciWorkflows`
- Xcode Cloud docs: [developer.apple.com/documentation/xcode-cloud](https://developer.apple.com/documentation/xcode-cloud)
- Test plans: [developer.apple.com/documentation/xcode/organizing-tests-to-improve-feedback](https://developer.apple.com/documentation/xcode/organizing-tests-to-improve-feedback)
