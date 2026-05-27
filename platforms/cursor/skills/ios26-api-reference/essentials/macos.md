# macOS 26 — AppKit + SwiftUI Essentials

> Gate ALL macOS code with `#if os(macOS)` in cross-platform files.
> Last verified: 2026-04-08

---

## Correct Patterns (vs Common Mistakes)

| API | Correct (macOS) | Common Mistake (iOS) |
|-----|-----------------|----------------------|
| Menu bar app | `MenuBarExtra { } label: { }.menuBarExtraStyle(.window)` | Using `WindowGroup` |
| Embed SwiftUI in window | `NSHostingView(rootView: myView)` | `UIHostingController` (iOS only) |
| Share sheet | `NSSharingServicePicker(items:).show(relativeTo:of:preferredEdge:)` | `UIActivityViewController` (iOS only) |
| Clipboard | `NSPasteboard.general.clearContents(); .setString(_:forType:)` | `UIPasteboard` (iOS only) |
| Rendered image | `ImageRenderer(...).nsImage` | `.uiImage` (iOS only) |
| Open Settings | `NSWorkspace.shared.open(URL(string: "x-apple.systempreferences:...")!)` | Hardcoded file paths |
| Foreground app | `NSApp.activate(ignoringOtherApps: true)` | Not needed on iOS |
| Hotkey callback | `Task { @MainActor in action() }` inside global monitor | Direct MainActor state (data race) |

---

## Crash Prevention Patterns

### Pattern 1: NSEvent Global Monitor Thread Safety

**CRITICAL:** Global monitors fire on a background thread. Local monitors fire on the main thread.

```swift
// WRONG — data race
globalMonitor = NSEvent.addGlobalMonitorForEvents(matching: .keyDown) { event in
    action()  // Called from background — MainActor violation
}

// RIGHT — explicit MainActor hop
globalMonitor = NSEvent.addGlobalMonitorForEvents(matching: .keyDown) { event in
    Task { @MainActor in action() }
}

// Local monitors are safe — fire on main thread
localMonitor = NSEvent.addLocalMonitorForEvents(matching: .keyDown) { event in
    action()  // Safe: main thread
    return nil
}
```

| Monitor Type | Fires On | Approach |
|---|---|---|
| `addGlobalMonitorForEvents` | Background thread | Always `Task { @MainActor in }` |
| `addLocalMonitorForEvents` | Main thread | Direct call is safe |

### Pattern 2: LSUIElement Window Focus

```swift
// WRONG — window appears behind others for LSUIElement apps
panel.orderFront(nil)

// RIGHT — activate THEN show
NSApp.activate(ignoringOtherApps: true)
panel.orderFront(nil)
```

### Pattern 3: MenuBarExtra Styles

```swift
// .window — renders SwiftUI in floating panel (most common)
MenuBarExtra { MyPanelView() } label: { Image(systemName: "clock") }
    .menuBarExtraStyle(.window)

// .menu — traditional NSMenu dropdown
MenuBarExtra { /* menu items */ } label: { Image(systemName: "clock") }
    .menuBarExtraStyle(.menu)
```

### Pattern 4: NSPanel Floating Window

```swift
final class FloatingPanel: NSPanel {
    init(contentView: some View) {
        super.init(
            contentRect: NSRect(x: 0, y: 0, width: 200, height: 80),
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered, defer: false
        )
        isFloatingPanel = true
        level = .floating
        hidesOnDeactivate = false
        isMovableByWindowBackground = true
        isOpaque = false
        backgroundColor = .clear
        collectionBehavior = [.canJoinAllSpaces, .stationary, .fullScreenAuxiliary]
        self.contentView = NSHostingView(rootView: contentView)
    }
    override var canBecomeKey: Bool { false }
    override var canBecomeMain: Bool { false }
}
```

### Pattern 5: NSEvent Monitor Cleanup in @MainActor Classes

```swift
@MainActor final class HotkeyManager {
    private nonisolated(unsafe) var globalMonitor: Any?
    private nonisolated(unsafe) var localMonitor: Any?

    func unregister() {
        if let m = globalMonitor { NSEvent.removeMonitor(m) }
        if let m = localMonitor  { NSEvent.removeMonitor(m) }
        globalMonitor = nil
        localMonitor  = nil
    }

    nonisolated deinit {
        if let m = globalMonitor { NSEvent.removeMonitor(m) }
        if let m = localMonitor  { NSEvent.removeMonitor(m) }
    }
}
```

Note: `nonisolated(unsafe)` for monitor tokens because `Any?` is not Sendable.

### Pattern 6: NSApplicationDelegateAdaptor

```swift
@main
struct MyApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    var body: some Scene { ... }
}

@MainActor
final class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) { }
}
```

---

## Known Gotchas

- **`NSPasteboard.general.clearContents()` must be called before setting new content** — otherwise clipboard operations silently fail
- **`NSApp.keyWindow` may be nil** for LSUIElement apps when the menu bar panel is closed
- **`NSSharingServicePicker` requires an NSView anchor** — you can't show it without a view
- **`ENABLE_HARDENED_RUNTIME: true`** is required for Mac App Store submission and notarization
- **`INFOPLIST_KEY_LSUIElement: true`** removes app from Dock and Command-Tab
- **iCloud check:** `FileManager.default.ubiquityIdentityToken != nil`
- **Multi-window:** Use `Window("Title", id: "my-window")` scene + `@Environment(\.openWindow)`

## Quick Checklist

- [ ] All macOS code gated with `#if os(macOS)`
- [ ] Global NSEvent monitors use `Task { @MainActor in }`
- [ ] LSUIElement apps call `NSApp.activate()` before showing windows
- [ ] NSPanel floating windows have correct `collectionBehavior`
- [ ] `NSHostingView` used (not `UIHostingController`) for SwiftUI embedding
- [ ] `NSPasteboard.clearContents()` called before writing
- [ ] ENABLE_HARDENED_RUNTIME set in build settings

### References
- https://developer.apple.com/documentation/swiftui/menubarextra
- https://developer.apple.com/documentation/appkit/nspanel
- https://developer.apple.com/documentation/appkit/nsevent
- https://developer.apple.com/documentation/appkit/nssharingservicepicker
- https://developer.apple.com/documentation/appkit/nshostingview
