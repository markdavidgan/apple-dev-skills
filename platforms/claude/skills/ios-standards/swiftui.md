# SwiftUI Standards

> Patterns for Views, state management, and animations in iOS 26+.

## Critical Rules

### 1. Environment Pattern for ViewModels

**CHECKLIST**: Views using `@Environment` for shared state?

```swift
// ✅ CORRECT — Use @Environment for shared ViewModels
struct TimerView: View {
    @Environment(TimerViewModel.self) private var timerVM
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        // Access directly — @Observable means no @ObservedObject needed
        Text(timerVM.timeRemainingFormatted)
    }
}
```

### 2. @Observable ViewModels (Not ObservableObject)

**CHECKLIST**: New ViewModels using `@Observable`, not `ObservableObject`?

```swift
// ❌ OLD PATTERN — Don't use
class OldViewModel: ObservableObject {
    @Published var state: State = .idle
}

// ✅ CORRECT — Swift 6 @Observable
@Observable
@MainActor
class TimerViewModel {
    var timerState: TimerState = .idle
    var timeRemaining: TimeInterval = 25 * 60

    // No @Published needed — all stored properties are observable
}
```

### 3. State Initialization

**CHECKLIST**: `@State` objects properly initialized?

```swift
// ✅ CORRECT — Direct initialization
struct MyView: View {
    @State private var speechService = SpeechService()
    @State private var waveformService = RealAudioWaveformService()
    @State private var isRecording = false
}
```

### 4. Every File Has #Preview

**CHECKLIST**: Every SwiftUI view file has at least one `#Preview`?

```swift
// Required at end of every View file
#Preview("Default State") {
    MyView()
}

#Preview("Dark Mode") {
    MyView()
        .preferredColorScheme(.dark)
}
```

**For complex views requiring environment setup**, use a preview container:

```swift
#Preview {
    PreviewContainer {
        MyView()
    }
}

// PreviewContainer helper
struct PreviewContainer<Content: View>: View {
    @State private var viewModel = MyViewModel()

    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .environment(viewModel)
    }
}
```

## Animation Patterns

### Standard Transitions

```swift
// Use consistent animation values
.animation(.spring(response: 0.35, dampingFraction: 0.8), value: isExpanded)
.animation(.easeInOut(duration: 0.3), value: showCapture)

// For view appearance/disappearance
.transition(.opacity.combined(with: .scale(scale: 0.95)))
.transition(.move(edge: .bottom).combined(with: .opacity))
```

### WithAnimation Blocks

```swift
// For programmatic state changes
withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
    showCompletion = true
}
```

## Layout Patterns

### Design System Constants

Never hardcode values — use your design system:

```swift
// ✅ CORRECT — Use design system tokens
.padding(.horizontal, Theme.Spacing.lg)
.background(Theme.background)
.foregroundStyle(Theme.primary)

// Define in Theme.swift or asset catalog
enum Theme {
    enum Spacing {
        static let xs: CGFloat = 8
        static let sm: CGFloat = 12
        static let md: CGFloat = 16
        static let lg: CGFloat = 20
        static let xl: CGFloat = 24
        static let xxl: CGFloat = 32
    }

    enum Radius {
        static let small: CGFloat = 8
        static let medium: CGFloat = 12
        static let large: CGFloat = 16
    }

    static let primary = Color("Primary")
    static let background = Color("Background")
}
```

### Conditional Modifiers

```swift
// Use conditional modifiers for clean code
.background(hasContent ? Theme.primary : Theme.chip)
.opacity(isLoading ? 0.5 : 1)
```

## Accessibility

**CHECKLIST**: Views have proper accessibility?

```swift
// Add identifiers for UI testing
Button("Save") { }
    .accessibilityIdentifier("save-button")

// Group related elements
VStack {
    Text("Title")
    Text("Subtitle")
}
.accessibilityElement(children: .combine)
.accessibilityLabel("Title, Subtitle")

// Hide decorative elements
Image("background-decoration")
    .accessibilityHidden(true)
```

## Quick Self-Check

Before finishing a View:

- [ ] File has `#Preview`
- [ ] Uses `@Environment` for shared ViewModels, not `@ObservedObject`
- [ ] Uses `@Observable` ViewModels, not `ObservableObject`
- [ ] No hardcoded colors or spacing — uses design system tokens
- [ ] Proper accessibility identifiers on interactive elements
- [ ] Animations use appropriate curves (not `.linear`)
