---
name: regression-test
description: Add regression tests when fixing bugs. Use when user says "fix this bug", "this is broken", "fix this issue", or when implementing any bug fix to prevent recurrence.
invoke: "/regression-test [bug-description] — Write a failing test for the bug, fix it, verify, and check for similar issues."
---

# Regression Test Skill

When fixing a bug, always follow this workflow to prevent the bug from recurring.

---

## Regression Test Workflow

### Step 0: Identify the Bug Class

Before writing any test, classify the bug. This determines what *else* to check.

| Bug Class | Root Cause | Also Search For |
|-----------|------------|----------------|
| **Force unwrap crash** (`!`) | Assumed non-nil, was nil | Other `!` in same file/service |
| **try! crash** | Error ignored at call site | Other `try!` in same target |
| **fatalError crash** | Defensive code hit in prod | Other `fatalError` in prod paths |
| **Missing confirmation** | Destructive action unguarded | Other destructive actions without `.destructive` role |
| **MainActor isolation crash** | Async code off main thread | Other `@MainActor` + async patterns in same ViewModel |
| **App Group mismatch** | Entitlements out of sync | All targets sharing the group |
| **State not restored** | Background/foreground not handled | Other lifecycle observers |

After identifying the class, fix *all* instances of the class in this file/service — not just the one that crashed. One bug usually means there are siblings.

### Step 1: Write Failing Test First

Before fixing the bug, reproduce it in a test that fails:

```swift
func test_timer_backgrounding_shouldPause() {
    // Given: Running timer
    let viewModel = TimerViewModel()
    viewModel.start()

    // When: App backgrounds
    NotificationCenter.default.post(name: UIApplication.didEnterBackgroundNotification, object: nil)

    // Then: Timer should be paused
    XCTAssertEqual(viewModel.state, .paused)
}
```

**Why first?** Ensures you understand the bug and can prove the fix works.

### Step 2: Fix the Bug

Make minimal changes to fix the issue. Run the test from Step 1 — it should now pass.

### Step 3: Verify Test Passes

```bash
# Run the specific test you added
xcodebuild test -scheme <YourScheme> \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:<TestTarget>/<TestClass>/<test_method_name>
```

### Step 4: Run Full Suite

Ensure your fix didn't break anything else:

```bash
# Run all tests using your project's test command
<project-test-command>
```

### Step 5: Pattern Check

Search for similar bugs in the codebase:

```bash
# Find similar code patterns that might have the same issue
rg "<pattern-from-bug>" --type swift
```

---

## Test Location Guide

| Bug Location | Test Location | Naming Pattern |
|--------------|---------------|----------------|
| **ViewModel** | `Tests/[Name]ViewModelTests.swift` | `test_[method]_[scenario]_should[Expected]` |
| **Service** | `Tests/ServiceTests/[Name]Tests.swift` | Mock dependencies, test error cases |
| **Model (SwiftData)** | `Tests/ModelTests/[Name]Tests.swift` | Test CRUD, relationships, migrations |
| **UI Flow** | `UITests/CriticalPathUITests.swift` | Extend existing test or add new flow |
| **UI Component** | `UITests/[Feature]UITests.swift` | Component-specific interactions |

Adapt paths to your project's test directory structure.

---

## Concrete Example

### Bug Report
> Timer doesn't pause when backgrounding app during active session.

### Regression Test

```swift
@MainActor
func test_timer_backgrounding_shouldPause() {
    // Given: Active session
    let container = try makeTestContainer()
    let viewModel = TimerViewModel(modelContainer: container)
    viewModel.startSession()
    XCTAssertEqual(viewModel.state, .running)

    // When: App backgrounds
    NotificationCenter.default.post(
        name: UIApplication.didEnterBackgroundNotification,
        object: nil
    )

    // Then: Timer is paused
    XCTAssertEqual(viewModel.state, .paused)
}
```

### The Fix

```swift
init() {
    NotificationCenter.default.addObserver(
        self,
        selector: #selector(handleBackground),
        name: UIApplication.didEnterBackgroundNotification,
        object: nil
    )
}

@objc private func handleBackground() {
    if state == .running {
        pause()
    }
}
```

### Verification

```bash
# 1. Run new regression test
xcodebuild test -scheme <YourScheme> \
  -only-testing:<TestTarget>/TimerViewModelTests/test_timer_backgrounding_shouldPause

# 2. Run full suite
<project-test-command>

# 3. Pattern check — find other notification handlers
rg "NotificationCenter" <ViewModels-dir>/
```

---

## Common Regression Test Patterns

### State Machine Bug

```swift
func test_timerState_[invalidTransition]_should[Expected]() {
    // Given: State X
    // When: Invalid action Y
    // Then: Expected behavior (error, ignore, etc.)
}
```

### Data Persistence Bug

```swift
func test_[model]_[operation]_shouldPersist() {
    // Given: Model instance
    // When: Save / Update / Delete
    // Then: Data correctly persisted / cascade deleted
}
```

### Service Integration Bug

```swift
func test_[service]_[failure]_should[handleGracefully]() {
    // Given: Mock service configured to fail
    // When: Call method
    // Then: Error handled, state consistent
}
```

### UI State Bug

```swift
func test_[ui]_[action]_should[updateState]() {
    // Given: UI in specific state
    // When: User action
    // Then: UI reflects new state
}
```

---

## Checklist

- [ ] Failing test written that reproduces the bug
- [ ] Bug fixed with minimal changes
- [ ] Test passes after fix
- [ ] Full test suite passes
- [ ] Pattern check completed for similar issues
- [ ] Test named clearly: `test_[what]_[when]_[should]`
- [ ] Test location follows conventions
