---
name: cross-platform-adaptivity
category: design
description: Adapt one SwiftUI codebase across iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro — size classes, adaptive navigation, multi-window/scenes, platform conditionals, and idiomatic per-platform behavior. Use when supporting iPad alongside iPhone, bringing an app to macOS or visionOS, fixing a layout that only works on one device, choosing adaptive navigation, or sharing code across platforms. Trigger on "iPad", "macOS", "Mac Catalyst", "visionOS", "watchOS", "tvOS", "size class", "adaptive layout", "multiplatform", "NavigationSplitView", or "responsive".
---

# Cross-Platform Adaptivity

**One codebase, native everywhere — adapt to the device, don't just stretch to fit.** A blown-up iPhone UI on iPad or Vision Pro reads as lazy. Share logic; specialize presentation. Pair with `apple-design` (HIG) and `swiftui-micro-craft` (polish).

> Principle: design for **capabilities and size**, not device names. Branch on size class / horizontal space, reserve `#if os()` for genuinely platform-specific APIs.

---

## Adapt to size, not device

```swift
@Environment(\.horizontalSizeClass) private var hSize

var body: some View {
    if hSize == .compact {
        TabView { … }            // iPhone portrait, narrow windows
    } else {
        NavigationSplitView { … } // iPad, Mac, wide windows
    }
}
```

- **Compact vs regular** size classes matter more than iPhone-vs-iPad: an iPad multitasking slide-over is *compact*, and a Mac window can be resized to either. Respond to the class.
- Let layout flex with **`ViewThatFits`** (pick the first child that fits), **adaptive `Grid`** / `LazyVGrid(columns: [.adaptive(minimum:)])`, and `.frame(maxWidth:)` reading caps — not hard-coded widths.
- Avoid magic-number breakpoints; prefer the system's size classes and Dynamic Type.

---

## Adaptive navigation

| Pattern | Compact | Regular |
|---------|---------|---------|
| `NavigationStack` | Push/pop column | Push/pop column |
| **`NavigationSplitView`** | Collapses to a stack automatically | 2–3 column sidebar + content + detail |
| `TabView` | Bottom tabs | Sidebar-adaptable tabs (`.tabViewStyle`) / top on tvOS |

**`NavigationSplitView` is the workhorse** for content apps: it gives a sidebar on iPad/Mac and automatically collapses to a navigation stack on iPhone. Drive selection with state so the same model works in both layouts.

---

## Per-platform idioms (what "native" means on each)

- **iPadOS** — pointer/trackpad hover (`.hoverEffect`), keyboard shortcuts (`.keyboardShortcut`), multiple windows/scenes, drag & drop, Stage Manager resizing, sidebar. Support external keyboard and the menu bar.
- **macOS** — menu bar `CommandMenu`, `Settings` scene (⌘,), window management, `.focusable`, hover, right-click context menus, sensible min window sizes. Mac Catalyst vs native SwiftUI is a porting decision — native SwiftUI for new apps.
- **visionOS** — depth, glass materials, ornaments, `.windowStyle(.volumetric)`, immersive spaces, eye/hand input (hover is gaze — generous hit targets). Don't assume a 2D plane; respect the spatial HIG.
- **watchOS** — glanceable, short sessions, the Digital Crown, complications; build *for the wrist*, not a shrunken phone screen.
- **tvOS** — the **focus engine** drives everything; design for a 10-foot distance and the Siri Remote. Focusable, not tappable.

---

## Platform conditionals — use sparingly

```swift
#if os(iOS)
    .navigationBarTitleDisplayMode(.inline)   // doesn't exist on macOS
#endif

#if os(visionOS)
    .glassBackgroundEffect()
#endif
```

- `#if os(iOS|macOS|watchOS|tvOS|visionOS)` for compile-time API differences; `#if targetEnvironment(macCatalyst)` for Catalyst.
- Prefer **runtime** size-class/environment checks for layout (one binary adapts live as a window resizes); reserve `#if` for APIs that don't exist on a platform.
- Isolate platform code behind small wrappers / `extension`s so the shared view stays readable. Don't litter `body` with conditionals.

---

## Structure for sharing

- **One multiplatform target** (or shared SwiftUI package) for models, view models, and most views; thin platform layers for the differences. Most SwiftUI views are already portable.
- Use **`@Environment`-driven** styling so components restyle themselves per platform instead of forking.
- Gate **capabilities, not platforms**: check for the feature (camera, `UIApplication`, push) rather than assuming from `os()`.
- Keep assets/icons per platform in the asset catalog; verify each platform's icon set (see `app-brand-identity`).

---

## Pre-ship checklist

- [ ] Works in **both size classes** (resize the iPad/Mac window; try slide-over).
- [ ] Navigation collapses sensibly compact↔regular (`NavigationSplitView`).
- [ ] No hard-coded widths that break on Mac resize or iPad multitasking.
- [ ] Each shipped platform uses its idioms (menus on Mac, focus on tvOS, depth on visionOS, Crown on watch).
- [ ] `#if os()` limited to true API gaps, not layout.
- [ ] Keyboard shortcuts & pointer hover on iPad/Mac; VoiceOver/focus verified per platform (see `ios-accessibility`).
- [ ] Each platform's app icon and launch experience set correctly.
