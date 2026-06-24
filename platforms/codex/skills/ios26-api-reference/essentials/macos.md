# macOS 26 — AppKit + SwiftUI Essentials

> Gate ALL macOS code with `#if os(macOS)` in cross-platform files.
> Last verified: 2026-05-29

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

### Pattern 4: NSPanel Floating Window (passive HUD)

This is the **passive** variant — a display-only overlay (floating preview, status HUD)
that never takes input. `canBecomeKey: false` is correct here. For a panel that handles
clicks/drags/keyboard, see Pattern 7 — copying this one verbatim onto an interactive
overlay is a common source of "the overlay doesn't respond to anything" bugs.

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
    override var canBecomeKey: Bool { false }   // passive: never takes input
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

### Pattern 7: Interactive Overlay Panel (handles input)

A full-screen overlay that takes clicks, drags, or keyboard (region-select, window
picker, annotation HUD) needs three things the passive panel (Pattern 4) does NOT:

1. **`canBecomeKey: true`** — required to receive keyboard events (Return to commit,
   Escape to cancel). The passive `false` silently swallows all key input.
2. **Activate the app first** — an `LSUIElement` (menubar agent) app is not in the
   normal activation list, so a `.nonactivatingPanel` is starved of mouse AND keyboard
   events until `NSApp.activate(...)` runs. This is Pattern 2 applied to input, and is
   the usual root cause of "drag does nothing" on an overlay.
3. **Intercept input via `sendEvent`** when the panel sits at a high window level
   (`.screenSaver`, `.popUpMenu`): SwiftUI gestures inside `NSHostingView` do not
   reliably arrive at those levels. Override `sendEvent` and drive your state directly.

```swift
final class OverlayPanel: NSPanel {
    override var canBecomeKey: Bool { true }    // interactive: MUST be true for keys
    override var canBecomeMain: Bool { false }

    // SwiftUI DragGesture is unreliable at .screenSaver level — intercept here.
    override func sendEvent(_ event: NSEvent) {
        switch event.type {
        case .leftMouseDown:    selection.beginDrag(at: point(for: event))
        case .leftMouseDragged: selection.updateCursor(point(for: event))
        case .leftMouseUp:      if let r = selection.endDrag() { onCommit(r) } // MUST commit on up
        default: break
        }
        super.sendEvent(event)
    }
    private func point(for e: NSEvent) -> CGPoint {
        contentView!.convert(e.locationInWindow, from: nil)  // window → view coords
    }
}

// At the call site — activate BEFORE ordering front, or events never arrive:
NSApp.activate(ignoringOtherApps: true)
panel.makeKeyAndOrderFront(nil)
```

**Drag-to-select must commit on `leftMouseUp`.** A two-step "click to start, click to
end" refactor that drops the mouse-up commit makes a natural press-drag-release never
fire — the overlay looks dead even though events arrive.

### Pattern 8: AppKit ↔ SwiftUI ↔ CoreGraphics Coordinate Systems

Three coordinate systems collide in any capture/overlay/hit-testing code. Mixing them
is the #1 cause of "selection lands in the wrong place" and "hover highlights the wrong
window" bugs.

| System | Origin | Y axis | Used by |
|--------|--------|--------|---------|
| AppKit (`NSEvent.locationInWindow`, `NSScreen.frame`) | bottom-left | up ↑ | windows, events, screens |
| SwiftUI (gesture/`onContinuousHover` points, layout) | top-left | down ↓ | views inside `NSHostingView` |
| CoreGraphics / ScreenCaptureKit display space | top-left | down ↓ | `SCScreenshotManager`, `CGWindowID` frames, `CGDisplay` |

Rules:

- **Convert once at each boundary, never mix raw values.** `NSView.convert(_:from: nil)`
  maps window → view coords; `NSHostingView` is **flipped** (top-left) by default, so a
  converted point is already in SwiftUI's space — do not flip again.
- **`NSEvent.locationInWindow` is bottom-left.** A SwiftUI gesture point for the *same
  physical pixel* is top-left. If you feed both into one `SelectionState`, one of them
  must be converted first or your rect is vertically mirrored.
- **`SCScreenshotManager.captureImage(in:)` wants CG display space** (top-left, main
  display at origin) — NOT AppKit screen coords. On multi-display or non-primary
  displays the y-flip is `displayHeight - appKitY - height`.
- **`CGWindowID` frames are top-left already** — they line up with SwiftUI, not AppKit.
- When unsure which space a value is in, log raw vs converted for one real run and
  compare against a known reference point before writing the transform. Don't guess the
  flip — verify it.

```swift
// AppKit (bottom-left) → CG display space (top-left), single display:
func toDisplaySpace(_ rect: CGRect, displayHeight: CGFloat) -> CGRect {
    CGRect(x: rect.minX,
           y: displayHeight - rect.maxY,   // flip Y
           width: rect.width, height: rect.height)
}
```

Note: `NSStringFromRect` / `NSStringFromPoint` live in **AppKit**. In a SwiftUI-only
Swift package that does not `import AppKit`, format geometry manually for logging.

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
- [ ] Interactive panels override `canBecomeKey: true` (passive ones: `false`)
- [ ] Interactive overlays at `.screenSaver` level handle input via `sendEvent`
- [ ] Drag-to-select commits on `leftMouseUp` (not on a second click)
- [ ] Coordinate boundaries converted once (AppKit bottom-left ↔ SwiftUI/CG top-left)
- [ ] `SCScreenshotManager` rects in CG display space, not AppKit screen coords
- [ ] `NSHostingView` used (not `UIHostingController`) for SwiftUI embedding
- [ ] `NSPasteboard.clearContents()` called before writing
- [ ] ENABLE_HARDENED_RUNTIME set in build settings

### References
- https://developer.apple.com/documentation/swiftui/menubarextra
- https://developer.apple.com/documentation/appkit/nspanel
- https://developer.apple.com/documentation/appkit/nsevent
- https://developer.apple.com/documentation/appkit/nssharingservicepicker
- https://developer.apple.com/documentation/appkit/nshostingview
- https://developer.apple.com/documentation/appkit/nsview/convert(_:from:)
- https://developer.apple.com/documentation/appkit/nsapplication/activate(ignoringotherapps:)
- https://developer.apple.com/documentation/screencapturekit/scscreenshotmanager
