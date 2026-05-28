---
name: ios-design
description: SwiftUI design system patterns, iOS 26 Liquid Glass effects, design tokens, and accessibility-aware previews for Apple platform UI. Use when building or reviewing SwiftUI views, defining a theme or design tokens, applying Liquid Glass, organizing asset catalogs, or improving visual consistency. Trigger on "design system", "theme", "design tokens", "Liquid Glass", "glassEffect", "SwiftUI styling", or "make the UI consistent".
---

# iOS Design

SwiftUI design system patterns, iOS 26 Liquid Glass effects, and accessibility best practices. **Apply these patterns to all UI code.**

---

## Design System Architecture

### Theme.swift Pattern

Centralize design tokens in a theme enum. Apps extend a shared base theme for app-specific expression.

```swift
// Shared package: AppTheme.swift
public enum AppTheme {
    // Foundation: Backgrounds
    public static var canvas: Color {
        Color(light: Color(hex: "#FAF9F6"), dark: Color(hex: "#0D0D0F"))
    }
    
    // Action: Primary color
    public static let actionPrimary = Color(hex: "#7BA7BC")
    
    // Spacing system
    public enum Spacing {
        public static let xs: CGFloat = 8
        public static let md: CGFloat = 16
        public static let lg: CGFloat = 24
    }
    
    // Corner radius
    public enum Radius {
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 12
        public static let capsule: CGFloat = 999
    }
}

// App-specific: Theme.swift
enum Theme {
    // Inherit from shared theme
    static let primary = AppTheme.actionPrimary
    static let spacing = AppTheme.Spacing.self
    
    // App-specific expression
    static var dialFace: Color {
        Color(light: AppTheme.surface, dark: Color(hex: "#1A1A1E"))
    }
}
```

### Design Tokens vs Hardcoded Values

| Do | Don't |
|----|-------|
| `Theme.primary` | `Color.blue` |
| `Theme.Spacing.md` | `16` |
| `Theme.Radius.capsule` | `999` |
| `AppTheme.canvas` | `Color.white` |

### Asset Catalog Organization

```
Assets.xcassets/
  Colors/
    Primary.colorset/
    Surface.colorset/
  Images/
    AppIcon.appiconset/
    Logo.imageset/
```

Prefer code-defined colors (hex values in theme) for dynamic dark mode support.

---

## iOS 26 Liquid Glass

### Glass Background Effects

```swift
// Standard glass background
.glassEffect(.regular)

// Glass with interactive (hover/press) feedback
.glassEffect(.regular.interactive())

// Ornament for floating controls
.ornament(visibility: .visible, attachmentAnchor: .scene(.trailing)) {
    FloatingControls()
        .glassEffect(.regular)
}
```

### Glass Material Hierarchy

```swift
// Thick material for modals, sheets
.background(.thickMaterial)

// Regular material for cards, surfaces
.background(.regularMaterial)

// Thin material for subtle overlays
.background(.ultraThinMaterial)

// From theme
AppTheme.glassSurface   // .regularMaterial
AppTheme.glassThick     // .thickMaterial
AppTheme.glassThin      // .ultraThinMaterial
```

### Liquid Glass Best Practices

| Do | Don't |
|----|-------|
| Use `.glassEffect(.regular)` for floating UI | Use solid colors for primary surfaces |
| Layer glass at different thicknesses for depth | Overuse glass — it reduces contrast |
| Add `.hoverEffect(.lift)` for interactive elements | Apply glass to text-heavy content |
| Use ornaments for secondary controls | Put glass behind primary action buttons |

---

## SwiftUI Patterns

### ViewModifiers for Reusable Styles

```swift
// Define custom modifiers
struct PrimaryButtonStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.headline.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(Theme.primary)
            .clipShape(Capsule())
    }
}

// Extend View for convenience
extension View {
    func primaryButtonStyle() -> some View {
        modifier(PrimaryButtonStyle())
    }
}

// Usage
Button("Start") { }
    .primaryButtonStyle()
```

### Container Views for Layout Patterns

```swift
// Reusable card container
struct Card<Content: View>: View {
    @ViewBuilder let content: Content
    
    var body: some View {
        content
            .padding(Theme.Spacing.md)
            .background(AppTheme.surface)
            .cornerRadius(Theme.Radius.md)
            .appDepth(.surface)
    }
}

// Usage
Card {
    VStack(alignment: .leading) {
        Text("Title")
        Text("Description")
            .foregroundStyle(Theme.textSecondary)
    }
}
```

### Environment Values for Theme

```swift
// Custom environment key
private struct ThemeKey: EnvironmentKey {
    static let defaultValue = AppTheme.standard
}

extension EnvironmentValues {
    var appTheme: AppTheme {
        get { self[ThemeKey.self] }
        set { self[ThemeKey.self] = newValue }
    }
}

// Usage in view
@Environment(\.appTheme) private var theme
```

### Preview Patterns with PreviewContainer

```swift
/// Lightweight container that injects required @Environment objects
@MainActor
struct PreviewContainer<Content: View>: View {
    let content: Content
    let timerVM: TimerViewModel
    let modelContext: ModelContext
    
    init(
        timerState: TimerState = .idle,
        @ViewBuilder content: () -> Content
    ) {
        self.timerVM = TimerViewModel()
        self.timerVM.timerState = timerState
        self.content = content()
        // Create in-memory model context for previews
        self.modelContext = try! ModelContext(
            ModelContainer(for: FocusSession.self, configurations: ModelConfiguration(isStoredInMemoryOnly: true))
        )
    }
    
    var body: some View {
        content
            .environment(timerVM)
            .modelContainer(modelContext.container)
    }
}

// Preview usage
#Preview("Running State") {
    PreviewContainer(timerState: .running) {
        TimerView()
    }
}

#Preview("Dark Mode") {
    PreviewContainer(timerState: .idle) {
        TimerView()
    }
    .preferredColorScheme(.dark)
}
```

---

## Localization

### Infrastructure Setup

Create `Localizable.strings` early — even for single-language apps. It prevents hardcoded string debt and makes future localization trivial:

```
App/Resources/
  en.lproj/
    Localizable.strings
```

```swift
// Localizable.strings
"preview.action.ai" = "Ask this screenshot";
"preview.conversation.inputPlaceholder" = "Ask anything…";
"upgrade.title" = "Unlock Pro";
"lockedFeature.trialButton" = "Try free for %d days";
```

### NSLocalizedString in SwiftUI

```swift
// ✅ CORRECT — Use table name for app-specific strings
struct UpgradeSheetCopy {
    static var title: String {
        NSLocalizedString("upgrade.title", tableName: "Localizable", comment: "Upgrade sheet title")
    }
    static func trialButton(days: Int) -> String {
        String(format: NSLocalizedString("lockedFeature.trialButton", tableName: "Localizable", comment: ""), days)
    }
}

// In views
Text(UpgradeSheetCopy.title)
TextField(UpgradeSheetCopy.inputPlaceholder, text: $input)
```

### Migration Path: Hardcoded → Localized

When retrofitting localization into an existing app:

1. Extract all user-facing strings to `Localizable.strings` with semantic keys
2. Replace literals with `NSLocalizedString` calls
3. Keep keys namespaced by feature: `feature.element.purpose`
4. Use `String(format: ...)` for interpolated values — never concatenate

```swift
// ❌ WRONG — concatenation breaks in RTL languages
Text("Try free for " + String(days) + " days")

// ✅ CORRECT — format string handles pluralization and RTL
String(format: NSLocalizedString("lockedFeature.trialButton", comment: ""), days)
```

---

## Accessibility

### Labels and Hints

```swift
// Always provide accessibility labels for icons
Image(systemName: "play.fill")
    .accessibilityLabel("Start timer")

// Add hints for interactive elements
Button(action: startSession) {
    Text("Focus")
}
.accessibilityHint("Double tap to begin a focus session")

// Hide decorative elements
Image(systemName: "sparkles")
    .accessibilityHidden(true)
```

### Identifiers for Testing

```swift
// Add identifiers for UI testing
Text(timeRemaining)
    .accessibilityIdentifier("timeDisplay")

Button(action: pause) {
    Image(systemName: "pause.fill")
}
.accessibilityIdentifier("pauseButton")
```

### Dynamic Type Support

```swift
// Use scalable font metrics
Text("Title")
    .font(.system(.title, design: .rounded))

// Or custom sizes relative to metrics
Text("Body")
    .font(.system(size: UIFont.preferredFont(forTextStyle: .body).pointSize))

// Ensure layouts adapt
VStack {
    Text("Title")
}
.padding(.horizontal, Theme.Spacing.md)
// Use GeometryReader or @ScaledMetric for size-dependent layouts
```

### VoiceOver Considerations

```swift
// Group related elements
VStack {
    Text("25:00")
    Text("remaining")
}
.accessibilityElement(children: .combine)
.accessibilityLabel("25 minutes remaining")

// Custom actions for complex UI
.accessibilityAction(named: "Add 5 minutes") {
    extendSession(by: 300)
}

// Update announcements for state changes
@AccessibilityAction
private func announceCompletion() {
    AccessibilityNotification.announce("Focus session complete")
}
```

### Accessibility Checklist

| Element | Required |
|---------|----------|
| Icon buttons | `.accessibilityLabel()` |
| Custom controls | `.accessibilityLabel()` + `.accessibilityHint()` |
| Test targets | `.accessibilityIdentifier()` |
| Decorative images | `.accessibilityHidden(true)` |
| Complex groups | `.accessibilityElement(children: .combine)` |
| Dynamic text | Use `UIFont` metrics or `.dynamicTypeSize()` |

---

## ADHD-Friendly UX Principles

Design for focus, clarity, and reduced cognitive load. Never use "ADHD" in user-facing copy.

### Reduce Decision Fatigue

```swift
// Do: Smart defaults, minimal choices
struct DurationSelector: View {
    let presets = [15, 25, 45, 60]  // Curated options
    
    var body: some View {
        HStack(spacing: Theme.Spacing.sm) {
            ForEach(presets, id: \.self) { minutes in
                DurationChip(minutes: minutes)
            }
        }
    }
}

// Don't: Open-ended inputs or overwhelming options
TextField("Enter duration", value: $customMinutes, format: .number)
```

### Clear Visual Hierarchy

```swift
// Do: One primary action, clear focal point
VStack(spacing: Theme.Spacing.lg) {
    // Hero element (the dial)
    TimerDial()
        .frame(maxWidth: .infinity)
    
    // Secondary actions in a row
    HStack {
        SecondaryButton("Adjust") { }
        PrimaryButton("Start") { }
    }
}

// Don't: Competing primary actions
HStack {
    Button("Start") { }      // Same weight as...
    Button("Settings") { }   // ...this
    Button("History") { }
}
```

### Immediate Feedback

```swift
// Do: Instant visual response
Button(action: { isPressed.toggle() }) {
    Image(systemName: isPressed ? "pause.fill" : "play.fill")
}
.buttonStyle(.borderedProminent)

// Do: Haptic feedback for actions
HapticsService.shared.playTap()

// Do: Visual state changes
Circle()
    .fill(isActive ? Theme.primary : Theme.surface)
    .animation(.easeInOut(duration: 0.2), value: isActive)
```

### Forgiving Interactions

```swift
// Do: Easy undo, no destructive confirmations
Button(action: { 
    withAnimation {
        item.delete()
    }
}) {
    Label("Remove", systemImage: "xmark")
}

// Do: Auto-save, resume where left off
@AppStorage("draftThought") private var draftThought: String = ""

// Do: Gesture forgiveness (larger touch targets)
Button(action: action) {
    Image(systemName: "plus")
        .frame(width: 44, height: 44)  // Minimum 44pt
}
```

### UX Principles Summary

| Principle | Implementation |
|-----------|----------------|
| Reduce decision fatigue | Curated presets, smart defaults, progressive disclosure |
| Clear visual hierarchy | One hero element, primary/secondary action distinction |
| Immediate feedback | Haptics, animations, visual state changes |
| Forgiving interactions | Undo support, auto-save, 44pt minimum touch targets |
| Never label as ADHD | Describe benefits: "captures thoughts in under 5 seconds" |

---

## Quick Reference

### Common Modifiers

```swift
// Depth/shadow
.appDepth(.surface)
.breathingShadow(color: Theme.primary)

// Border
.radiantBorder(color: Theme.primary, intensity: 0.3)

// Glass (iOS 26+)
.glassEffect(.regular)
.glassEffect(.regular.interactive())

// Accessibility
.accessibilityLabel("Description")
.accessibilityHint("Double tap to activate")
.accessibilityIdentifier("uniqueID")
.accessibilityHidden(true)
```

### Theme Values

```swift
// Colors
AppTheme.canvas           // Background
AppTheme.surface          // Cards
AppTheme.actionPrimary    // Buttons
AppTheme.textPrimary      // Body text

// Spacing
AppTheme.Spacing.xs       // 8
AppTheme.Spacing.md       // 16
AppTheme.Spacing.lg       // 24

// Radius
AppTheme.Radius.sm        // 8
AppTheme.Radius.md        // 12
AppTheme.Radius.capsule   // 999
```

### Preview Template

```swift
#Preview("State Name") {
    PreviewContainer(timerState: .idle) {
        YourView()
    }
}

#Preview("Dark Mode") {
    PreviewContainer(timerState: .idle) {
        YourView()
    }
    .preferredColorScheme(.dark)
}
```

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios26-api-reference` — iOS 26 API signatures
- `ios-build` — Build validation workflow
