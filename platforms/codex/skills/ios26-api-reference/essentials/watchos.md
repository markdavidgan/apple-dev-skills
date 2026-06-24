# watchOS 26 — Constraints & Patterns Essentials

> Gate ALL watchOS code with `#if os(watchOS)` in cross-platform files.
> Last verified: 2026-04-08

---

## Critical Constraints

| Framework | Available? | Alternative |
|-----------|-----------|-------------|
| `Speech` (SpeechTranscriber, SpeechAnalyzer) | **NO** | TextField + silence timer (system dictation) |
| `FoundationModels` | **NO** (needs A17 Pro/M1+) | Skip on Watch, use `#if canImport` |
| `UIKit` | **NO** | `import WatchKit` for device APIs |
| `.sheet` with custom detents | **NO** | `.fullScreenCover` or navigation push |
| `UIActivityViewController` | **NO** | Sharing not available on Watch |
| `NavigationSplitView` | **NO** | `NavigationStack` works |

---

## Crash Prevention Patterns

### Pattern 1: Speech is NOT Available

```swift
// WRONG — does not compile on watchOS
import Speech
let transcriber = SpeechTranscriber(locale: .current, preset: .progressiveTranscription)

// RIGHT — use TextField + silence timer for dictation
@Observable final class WatchSpeechService {
    var transcribedText: String = ""
    var isListening: Bool = false
    private var silenceTimer: Timer?

    func textDidChange() {
        silenceTimer?.invalidate()
        silenceTimer = Timer.scheduledTimer(withTimeInterval: 2.0, repeats: false) { [weak self] _ in
            Task { @MainActor [weak self] in self?.finalize() }
        }
    }

    private func finalize() {
        silenceTimer?.invalidate()
        silenceTimer = nil
        isListening = false
    }
}
```

### Pattern 2: FoundationModels NOT Available

```swift
// WRONG — crashes at runtime on Watch
let session = LanguageModelSession()

// RIGHT — guard with #if canImport AND omit watchOS from availability
#if canImport(FoundationModels)
if #available(macOS 26.0, iOS 26.0, *) {  // intentionally omit watchOS
    return try await session.respond(to: prompt).content
}
#endif
return fallbackResult
```

### Pattern 3: WKHapticType (Watch Haptics)

```swift
import WatchKit

@MainActor struct WatchHapticService {
    private static let device = WKInterfaceDevice.current()

    static func play(_ type: WKHapticType) {
        device.play(type)
    }
}

// Available types:
// .click      — light tap, UI confirmation
// .start      — session start
// .stop       — session stop
// .success    — positive outcome
// .failure    — error
// .retry      — try again
// .directionUp / .directionDown — progress
// .notification — incoming notification
```

**`WKInterfaceDevice.current()` must be called from main thread.**

### Pattern 4: WCSession Delegate — Nonisolated Pattern

```swift
#if os(watchOS)
import WatchConnectivity

@MainActor @Observable
final class WatchConnectivityService: NSObject {
    private let session = WCSession.default
    private var delegate: SessionDelegate?

    func activate() {
        guard WCSession.isSupported() else { return }
        delegate = SessionDelegate(service: self)
        session.delegate = delegate
        session.activate()
    }

    // Called from nonisolated delegate — extract values BEFORE actor boundary
    nonisolated func handleMessage(_ message: [String: Any]) {
        guard let action = message["action"] as? String else { return }
        Task { @MainActor in self.process(action: action) }
    }
}

// Separate delegate avoids NSObject + @Observable conflicts
private final class SessionDelegate: NSObject, WCSessionDelegate, @unchecked Sendable {
    private nonisolated(unsafe) weak var service: WatchConnectivityService?

    init(service: WatchConnectivityService) { self.service = service }

    nonisolated func session(_ session: WCSession,
                             activationDidCompleteWith state: WCSessionActivationState,
                             error: (any Error)?) {}

    nonisolated func session(_ session: WCSession,
                             didReceiveMessage message: [String: Any]) {
        service?.handleMessage(message)
    }
}
#endif
```

**Key rules:**
- Separate `SessionDelegate` class — mixing `NSObject` with `@Observable` causes issues
- All delegate methods are `nonisolated`
- Extract scalar values on calling thread, then `Task { @MainActor in }` to update state
- `nonisolated(unsafe) weak var service` because weak refs to `@MainActor` types aren't Sendable

### Pattern 5: File Guards

```swift
// Wrap Watch-only files at top level
#if os(watchOS)
import WatchConnectivity
// ... entire file ...
#endif
```

---

## Known Gotchas

- **Digital Crown:** `.digitalCrownRotation($value)` modifier for scroll/input
- **Always-on display:** Check `WKExtension.shared().isAutorotating` for ambient mode
- **No `UIImpactFeedbackGenerator`** — use `WKInterfaceDevice.current().play(.click)` instead
- **NavigationStack works**, `NavigationSplitView` does not
- **WCSession.isReachable** may return false even when iPhone is nearby — check before sending

## Quick Checklist

- [ ] All watchOS code gated with `#if os(watchOS)`
- [ ] No `import Speech` in Watch targets
- [ ] No `import FoundationModels` calls in Watch targets (or properly guarded)
- [ ] WCSessionDelegate methods are `nonisolated`
- [ ] Haptics use `WKInterfaceDevice.current().play()` from `@MainActor`
- [ ] Separate delegate class for WCSession (not on the @Observable service)

### References
- https://developer.apple.com/documentation/watchkit/wkinterfacedevice
- https://developer.apple.com/documentation/watchconnectivity/wcsession
- https://developer.apple.com/documentation/watchkit/wkhaptictype
