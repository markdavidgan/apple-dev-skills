---
name: ios-accessibility
category: design
description: Audit SwiftUI views for accessibility issues and apply fixes. Use whenever VoiceOver, Dynamic Type, accessibility labels, screen readers, or App Store accessibility is mentioned. Also trigger when asked to "make it accessible", improve UI quality broadly, or prepare for App Store review.
---

Audit SwiftUI file(s) for accessibility issues and apply fixes. If no file is specified, audit all main views in the app.

## Workflow

1. Read the design system / theme file first — confirm canonical font styles and spacing tokens
2. Read each target file fully before editing
3. Apply all fixes in one pass per file
4. Summarize changes grouped by category (VoiceOver, Dynamic Type, Tap targets)
5. Flag any issues requiring runtime testing (VoiceOver navigation order, contrast in real lighting)

---

## VoiceOver Labels

- Every interactive element (button, toggle, slider, gesture area) needs `.accessibilityLabel()` describing its **purpose**, not its visual appearance
  - Bad: `.accessibilityLabel("Purple ring")` — describes appearance
  - Good: `.accessibilityLabel("Focus session progress, 18 minutes remaining")` — describes meaning
- Icon-only and image-only buttons always need explicit labels
- Decorative visuals should be silenced with `.accessibilityHidden(true)`
- Compound views: use `.accessibilityElement(children: .ignore)` on the container and compose a single label + value

### Hints and Traits

- `.accessibilityHint()` — use for non-obvious gestures: `"Double-tap to pause session"`
- `.accessibilityAddTraits(.updatesFrequently)` — live countdown text (prevents VoiceOver interrupting every second)
- `.accessibilityAddTraits(.isHeader)` — section headings in lists
- `.accessibilityAddTraits(.isButton)` — any `Text` or `ZStack` wired to `onTapGesture` instead of native `Button`
- `.accessibilityAddTraits(.isSelected)` — selected filter chips, tabs

---

## Dynamic Type

- All text must use a semantic `Font` style (`.body`, `.headline`, `.caption`, `.title2`, etc.) — never a hardcoded point size like `.font(.system(size: 48))`
- Use `@ScaledMetric` for spacing constants and icon frame sizes that need to grow proportionally:
  ```swift
  @ScaledMetric(relativeTo: .body) private var iconSize: CGFloat = 24
  ```
- Layouts must not clip at `accessibilityExtraExtraExtraLarge`. Replace fixed `.frame(width:)` on text containers with `.frame(maxWidth: .infinity, alignment: .leading)`
- Check the design system / theme file for any font definitions using fixed sizes — replace with scaled equivalents

---

## Tap Targets

- Any tappable area smaller than 44×44pt must reach that minimum via `.frame(minWidth: 44, minHeight: 44)` or padding
- Add `.contentShape(Rectangle())` so the entire padded area is hittable
- Confirm purely decorative elements aren't accidentally hittable; add `.accessibilityHidden(true)` if so

---

## Semantic Grouping

- Related elements that form one logical unit: use `.accessibilityElement(children: .ignore)` on the container with a single composed label
- Wrapper containers that add no meaning: leave default (`.accessibilityElement(children: .contain)`)
- Avoid double-announcing content that's already labeled on children

---

## Swipe Actions

SwiftUI's `.swipeActions` is automatically VoiceOver-accessible — verify the button label is descriptive:

```swift
.swipeActions(edge: .trailing, allowsFullSwipe: true) {
    Button(role: .destructive) { ... } label: {
        Label("Delete", systemImage: "trash")
    }
    .accessibilityLabel("Delete capture")
}
```

---

## Checklist

- [ ] All interactive elements have `.accessibilityLabel()`
- [ ] Decorative elements have `.accessibilityHidden(true)`
- [ ] Live-updating text has `.accessibilityAddTraits(.updatesFrequently)`
- [ ] Section headers have `.accessibilityAddTraits(.isHeader)`
- [ ] No hardcoded font sizes — all use semantic styles
- [ ] `@ScaledMetric` for icon sizes and key spacing
- [ ] All tap targets are 44×44pt minimum
- [ ] Selected states use `.accessibilityAddTraits(.isSelected)`
- [ ] Compound views grouped with single composed label
