# SwiftUI — Community Intelligence

> Real-world gotchas from production apps.
> For quick reference, use essentials/swiftui.md instead.

---

## @Environment Not Inherited by Nested Private Structs

`@Environment` values are **not** automatically propagated to nested private `struct` types declared inside another view. Each struct that needs an environment value must declare it explicitly.

This applies to:
- Nested `private struct MySubView: View`
- `ButtonStyle` implementations (`private struct MyPressStyle: ButtonStyle`)
- Any other value-type conforming to a SwiftUI protocol declared inside another type

**Symptom:** The compiler reports `cannot find 'reduceMotion' in scope` (or similar) inside the nested struct, even though the outer struct declares `@Environment(\.accessibilityReduceMotion) private var reduceMotion`.

```swift
// ❌ Won't compile — nested struct doesn't inherit the outer @Environment
struct TimerDial: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View { BreathingRing() }

    private struct BreathingRing: View {
        var body: some View {
            // ERROR: cannot find 'reduceMotion' in scope
            Circle().opacity(reduceMotion ? 1 : animatedOpacity)
        }
    }
}

// ✅ Each struct declares what it needs
struct TimerDial: View {
    var body: some View { BreathingRing() }

    private struct BreathingRing: View {
        @Environment(\.accessibilityReduceMotion) private var reduceMotion

        var body: some View {
            Circle().opacity(reduceMotion ? 1 : animatedOpacity)
        }
    }
}
```

This is correct SwiftUI behavior — structs are independent value types and don't have access to the enclosing type's stored properties. The fix is always to add the `@Environment` declaration to each struct that needs it.

**Affects:** Any `@Environment` key — `\.accessibilityReduceMotion`, `\.colorScheme`, `\.dynamicTypeSize`, custom keys, etc.

---

## TimelineView(.animation(minimumInterval:)) — Label Syntax

The `minimumInterval` argument label must appear **before** any ternary expression, not inside it.

```swift
// ❌ Compiler error: expected ',' separator
TimelineView(.animation(minimumInterval: reduceMotion ? nil : 1/60.0)) { ... }
//                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Swift parses this as: label inside ternary — invalid

// ✅ Correct — label before the ternary
TimelineView(.animation(minimumInterval: reduceMotion ? nil : 1.0 / 60.0)) { ... }
```

Passing `nil` for `minimumInterval` lets SwiftUI choose the update cadence (effectively pauses continuous animation), which is the correct behaviour when `reduceMotion` is true.
