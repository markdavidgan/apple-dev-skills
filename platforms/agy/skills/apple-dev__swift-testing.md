---
name: swift-testing
category: engineering
description: The Swift Testing framework (import Testing) — @Test functions, #expect/#require macros, @Suite, parameterized tests, traits/tags, async and throwing tests, and migrating from XCTest. Use when writing new tests in Swift 6 / Xcode 16+, when the user mentions "Swift Testing", "@Test", "#expect", "parameterized test", "test traits", or "migrate from XCTest". For XCTest harness/CI and SwiftData test setup see ios-test.
---

# Swift Testing

**Author tests with the modern Swift Testing framework** (`import Testing`, Xcode 16+/Swift 6). It coexists with XCTest in the same target — migrate incrementally. For the test *harness*, CI wiring, SwiftData in-memory setup, and UI/performance testing, see `ios-test`; this skill is the authoring model.

> **Pick the right tool.** Swift Testing covers unit/integration/logic tests. **UI tests (`XCUIApplication`) and `XCTMetric` performance tests still use XCTest** — Swift Testing does not replace them. You can keep both in one project.

---

## The shape of a test

```swift
import Testing
@testable import MyApp

@Test func timerStartsAtConfiguredDuration() {
    let timer = FocusTimer(minutes: 25)
    #expect(timer.remaining == .seconds(25 * 60))
}
```

- No `XCTest` subclass, no `test` prefix, no `XCTAssert`. A free function (or method) annotated `@Test`.
- `#expect(...)` records a failure but **continues**. It captures the full expression, so `#expect(a == b)` reports the actual values of `a` and `b` — no need for `XCTAssertEqual`.
- Give tests descriptive names: `@Test("Remaining time is clamped to zero")`.

### `#require` — stop on failure / safe unwrap

```swift
@Test func decodesUser() throws {
    let data = try #require(Self.fixture)         // unwraps Optional or throws → test stops
    let user = try JSONDecoder().decode(User.self, from: data)
    #expect(user.name == "Ada")
}
```

`#require` is the hard assert: if it fails the test stops (like a guard). Use it when continuing would crash or cascade. `try #require(optional)` is the idiomatic non-force unwrap.

---

## Async, throwing, and errors

```swift
@Test func loadsRemoteProfile() async throws {
    let profile = try await client.fetchProfile(id: 42)   // just use async/await
    #expect(profile.id == 42)
}

// Asserting a specific error is thrown
@Test func rejectsEmptyName() {
    #expect(throws: ValidationError.emptyName) {
        try Validator.validate(name: "")
    }
}

// Any error / error of a type
#expect(throws: (any Error).self) { try risky() }
#expect(throws: ValidationError.self) { try validate() }
#expect(throws: Never.self) { try shouldNotThrow() }   // asserts NO throw
```

### Confirmations (callbacks / events that should fire N times)

```swift
@Test func deliversTwoEvents() async {
    await confirmation("emits exactly twice", expectedCount: 2) { confirm in
        stream.onEvent = { _ in confirm() }
        await stream.run()
    }
}
```

`confirmation` replaces `XCTestExpectation` for "this closure must be called exactly N times."

---

## Suites — grouping & shared state

```swift
@Suite("Cart")
struct CartTests {
    let cart: Cart                       // fresh instance per test → natural isolation

    init() async throws {                // runs before EACH test (replaces setUp)
        cart = try await Cart.empty()
    }

    deinit { /* teardown, if needed */ } // runs after each test (for class-based suites)

    @Test func startsEmpty() { #expect(cart.items.isEmpty) }
    @Test func addsItem()   { cart.add(.sample); #expect(cart.items.count == 1) }
}
```

- A `@Suite` is just a `struct`/`final class`/`actor`. Annotation is optional if it only contains `@Test`s, but explicit `@Suite("name")` reads better.
- **Each test gets a fresh suite instance** — `init` runs per test, so state doesn't leak between tests. This is the big ergonomic win over XCTest's shared instance.
- Use a `struct` by default (value semantics, parallel-safe). Use `actor` if tests share mutable reference state.

---

## Parameterized tests — one test, many inputs

```swift
@Test(arguments: ["", " ", "\t"])
func rejectsBlankNames(_ name: String) {
    #expect(throws: ValidationError.self) { try Validator.validate(name: name) }
}

// Multiple argument sets are zipped or crossed:
@Test(arguments: zip([1, 2, 3], [2, 4, 6]))
func doubles(_ input: Int, _ expected: Int) {
    #expect(input * 2 == expected)
}
```

Each argument set is a **separate test case** in the navigator — failures point to the exact input. Prefer this over a `for` loop inside one test (a loop stops at the first failure and hides which input broke).

---

## Traits — control how/when tests run

```swift
@Test(.tags(.networking))                       // group across suites by tag
@Test(.disabled("flaky until FB12345 fixed"))   // skip with a reason (not silent)
@Test(.bug("https://…/issue/42"))               // link a tracker
@Test(.timeLimit(.minutes(1)))                  // fail if it overruns
@Test(.enabled(if: AppFeatures.payments))       // conditional
@Test(.serialized)                              // opt a suite OUT of parallelism
```

Define tags once:

```swift
extension Tag { @Tag static var networking: Self }
```

Run by tag from CLI / scheme to slice fast vs slow suites.

### Known issues (expected failures)

```swift
withKnownIssue("rounding off by one until FB123") {
    #expect(Money(0.1) + Money(0.2) == Money(0.3))
}
```

`withKnownIssue` records the failure without failing the run, and **flips to a failure if the issue is unexpectedly fixed** — so stale workarounds get flagged.

---

## Parallelism (default ON — design for it)

Swift Testing runs tests **in parallel by default**, including across suites, and may run them out of order.

- Don't rely on execution order or shared global mutable state.
- Per-test isolation comes free from fresh suite instances — use it instead of `static var`.
- Force serial execution only when necessary with `@Suite(.serialized)`.
- `@MainActor`-isolate tests that touch main-actor state: `@Test @MainActor func …` (matches `ios-standards` isolation rules).

---

## Migrating from XCTest

| XCTest | Swift Testing |
|--------|---------------|
| `class FooTests: XCTestCase` | `struct FooTests` (`@Suite`) |
| `func testBar()` | `@Test func bar()` |
| `XCTAssert(x)` / `XCTAssertTrue` | `#expect(x)` |
| `XCTAssertEqual(a, b)` | `#expect(a == b)` |
| `XCTAssertNil(x)` | `#expect(x == nil)` |
| `XCTUnwrap(x)` | `try #require(x)` |
| `XCTAssertThrowsError` | `#expect(throws:)` |
| `setUp()` / `tearDown()` | `init()` / `deinit` |
| `XCTestExpectation` / `wait` | `await confirmation { … }` |
| `XCTSkip` | `.disabled(...)` / `.enabled(if:)` traits |
| `XCTExpectFailure` | `withKnownIssue { … }` |

**Migration strategy:** both frameworks run in the same target — convert file-by-file, leave UI/performance tests on XCTest, and don't rewrite working tests just to change syntax. Start with new tests.

See `ios-test` for the harness (schemes, CI, code coverage, SwiftData in-memory containers, UI/perf tests) and `regression-test` for the failing-test-first bug-fix workflow.
