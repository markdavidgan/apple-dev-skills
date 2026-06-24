# AVFoundation / AVAudioEngine — iOS 26 Essentials

> For deep reference: load `reference/avfoundation-reference.md`
> For expert guide: load `guides/expert-speech-audio.md`
> For community intel: load `intel/community-avaudio.md`
>
> Last verified: 2026-04-08
> Sources: Apple Developer Documentation, Developer Forums, WWDC sessions, production crash reports

---

## Correct Patterns (vs Common Mistakes)

| # | Topic | WRONG | RIGHT | Why |
|---|-------|-------|-------|-----|
| 1 | Read format timing | `let fmt = engine.inputNode.outputFormat(forBus: 0)` before `prepare()` | `engine.prepare()` then `let fmt = engine.inputNode.outputFormat(forBus: 0)` | Format returns 0 Hz / 0 channels before `prepare()` queries hardware |
| 2 | Tap installation order | `try engine.start()` then `inputNode.installTap(...)` | `inputNode.installTap(...)` then `engine.prepare()` then `try engine.start()` | Installing a tap on a running engine throws uncatchable NSException |
| 3 | Double tap | `inputNode.installTap(...)` twice on same bus | `inputNode.removeTap(onBus: 0)` before every `installTap(...)` | Only ONE tap per bus; second install throws NSException: `nullptr == Tap()` |
| 4 | MainActor from tap | `installTap { buffer, _ in self.transcript = "text" }` | `installTap { [weak self] buffer, _ in Task { @MainActor [weak self] in self?.transcript = "text" } }` | Tap closure runs on audio I/O thread, NOT MainActor |
| 5 | Strong self in tap | `installTap { buffer, _ in self.process(buffer) }` | `installTap { [weak self] buffer, _ in self?.process(buffer) }` | Strong reference creates retain cycle — engine holds tap, tap holds self |
| 6 | Engine start without nodes | `let engine = AVAudioEngine(); try engine.start()` | `let _ = engine.inputNode; engine.prepare(); try engine.start()` | `start()` crashes if no input/output node exists in graph |
| 7 | `reset()` between sessions | `stop()` then `reset()` then restart | `stop()` then `removeTap()` — no `reset()` | `reset()` destroys node graph and corrupts engine for subsequent recordings |
| 8 | @MainActor on audio class | `@MainActor @Observable class MyAudioService { let engine = AVAudioEngine() }` | `@Observable class MyAudioService { var _engine: AVAudioEngine? }` with `@MainActor` on methods only | Class-level @MainActor creates deinit crash — deinit runs on arbitrary thread |
| 9 | Session deactivation timing | `audioSession.setActive(false)` while engine running | `engine.stop()` then `removeTap()` then `audioSession.setActive(false)` | Deactivating with running I/O throws error |
| 10 | Hardcoded sample rate | `AVAudioFormat(standardFormatWithSampleRate: 44100, channels: 1)` | Query `inputNode.outputFormat(forBus: 0).sampleRate` after `prepare()` | Devices use 48kHz, 44.1kHz, or 16kHz — never assume |
| 11 | Simulator audio | `let inputNode = engine.inputNode` on Simulator | `#if targetEnvironment(simulator) throw AudioError.simulatorNotSupported #endif` | Simulator has no audio hardware; `inputNode` access throws NSException |
| 12 | Missing audio session config | Access `engine.inputNode` before configuring `AVAudioSession` | Configure `setCategory` + `setActive(true)` BEFORE `engine.inputNode` | Session must be active for hardware format to be valid |

---

## Crash Prevention Patterns

### Crash 1: Format Read Before prepare()

```swift
// WRONG — NSException: IsFormatSampleRateAndChannelCountValid(format)
let format = audioEngine.inputNode.outputFormat(forBus: 0)  // 0 Hz!
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { ... }

// RIGHT
audioEngine.prepare()
let format = audioEngine.inputNode.outputFormat(forBus: 0)  // 48000 Hz
guard format.sampleRate > 0, format.channelCount > 0 else { throw AudioError.invalidFormat }
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { ... }
```

### Crash 2: Install Tap on Running Engine

```swift
// WRONG — NSException (uncatchable in Swift)
try audioEngine.start()
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: fmt) { ... }

// RIGHT — install BEFORE start
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: fmt) { ... }
audioEngine.prepare()
try audioEngine.start()
```

### Crash 3: Double Tap on Same Bus

```swift
// WRONG — NSException: nullptr == Tap()
audioEngine.inputNode.installTap(onBus: 0, ...)
audioEngine.inputNode.installTap(onBus: 0, ...)  // CRASH

// RIGHT — remove first
audioEngine.inputNode.removeTap(onBus: 0)
audioEngine.inputNode.installTap(onBus: 0, ...)
```

### Crash 4: MainActor Access from Tap Closure

```swift
// WRONG — EXC_BAD_ACCESS from audio thread
inputNode.installTap(onBus: 0, ...) { buffer, _ in
    self.transcript = "text"  // @MainActor property from audio thread
}

// RIGHT — hop to MainActor
inputNode.installTap(onBus: 0, ...) { [weak self] buffer, _ in
    let power = self?.calculateRMS(from: buffer) ?? 0.0
    Task { @MainActor [weak self] in
        self?.powerLevel = power
    }
}
```

### Crash 5: @MainActor on Class with AVAudioEngine

```swift
// WRONG — SIGABRT: deinit on arbitrary thread conflicts with MainActor isolation
@MainActor @Observable
class MyAudioService {
    private let audioEngine = AVAudioEngine()
}

// RIGHT — @MainActor on methods, nonisolated deinit
@Observable
class MyAudioService {
    private var _audioEngine: AVAudioEngine?
    @MainActor func startRecording() { }
    nonisolated deinit { _task?.cancel() }
}
```

### Crash 6: Engine Start with No Nodes

```swift
// WRONG — required condition is false: inputNode != NULL || outputNode != NULL
let engine = AVAudioEngine()
try engine.start()

// RIGHT — force node creation first
let engine = AVAudioEngine()
let _ = engine.inputNode
engine.prepare()
try engine.start()
```

### Crash 7: reset() Corrupts Node Graph

```swift
// WRONG — subsequent recordings crash
func stopRecording() {
    audioEngine.stop()
    audioEngine.inputNode.removeTap(onBus: 0)
    audioEngine.reset()  // Destroys node graph!
}

// RIGHT — stop and remove tap, never reset
func stopRecording() {
    audioEngine.stop()
    audioEngine.inputNode.removeTap(onBus: 0)
    // No reset()!
}
```

---

## The 9-Step installTap Sequence

This is the only sequence that reliably avoids crashes:

```swift
// 1. Configure audio session
let audioSession = AVAudioSession.sharedInstance()
try audioSession.setCategory(.playAndRecord, mode: .spokenAudio,
                              options: [.duckOthers, .defaultToSpeaker])
try audioSession.setActive(true, options: .notifyOthersOnDeactivation)

// 2. Access inputNode (creates the I/O unit)
let inputNode = audioEngine.inputNode

// 3. Call prepare() (queries hardware, populates format)
audioEngine.prepare()

// 4. Read the format (valid ONLY after prepare())
let inputFormat = inputNode.outputFormat(forBus: 0)

// 5. Validate the format
guard inputFormat.sampleRate > 0, inputFormat.channelCount > 0 else {
    throw AudioError.invalidFormat
}

// 6. Remove any existing tap (safe even if none installed)
inputNode.removeTap(onBus: 0)

// 7. Install new tap
inputNode.installTap(onBus: 0, bufferSize: 1024, format: inputFormat) { [weak self] buffer, time in
    self?.handleBuffer(buffer)  // Runs on audio I/O thread
}

// 8. Re-prepare (tap changes the graph)
audioEngine.prepare()

// 9. Start the engine
try audioEngine.start()
```

---

## Known Gotchas

- **NSExceptions are uncatchable in Swift.** `installTap` with invalid format, double tap, and `inputNode` on simulator all throw ObjC `NSException`. Swift `do/try/catch` cannot catch them. You MUST guard before calling.
- **`prepare()` can invalidate node references.** If you saved `let node = engine.inputNode` before `prepare()`, re-access `engine.inputNode` after — the object may have been deallocated and recreated.
- **Tap closure thread is NOT MainActor.** It runs on the audio I/O thread (`com.apple.coreaudio.AURemoteIO`). Use `Task { @MainActor in }` to hop.
- **`removeTap()` is metadata cleanup only.** It can be called after `stop()` safely. The critical rule: always call `removeTap()` before installing a new tap or before engine deallocation.
- **Audio session must be active BEFORE `inputNode` access.** Otherwise hardware format info may be stale or zero.
- **`reset()` is destructive.** It triggers `AVAudioEngineConfigurationChange`, destroys the node graph, and corrupts the engine for reuse. Never call between recording sessions.
- **Deactivation order matters.** `setActive(false)` throws if engine is still running. Always: stop engine, remove tap, deactivate session.
- **Configuration change notification stops the engine.** Route changes (headphones, Bluetooth) fire `.AVAudioEngineConfigurationChange` and stop the engine. You must re-prepare and restart manually.
- **`deinit` is not safe for audio cleanup.** It runs on arbitrary threads. Use an explicit `stopRecording()` method. Only cancel tasks in `nonisolated deinit`.
- **Buffer size is a request, not a guarantee.** The system may deliver larger or smaller buffers than `bufferSize` depending on hardware and load.
- **`setVoiceProcessingEnabled(_:)` triggers engine reconfiguration.** Calling it stops the engine via configuration change. Plan accordingly.
- **Microphone permission uses `AVAudioApplication` (iOS 17+).** `AVAudioSession.requestRecordPermission(_:)` is deprecated. Use `AVAudioApplication.requestRecordPermission()` instead.

---

## Quick Checklist

Before writing any AVAudioEngine code, verify:

- [ ] Audio session configured (`setCategory` + `setActive(true)`) BEFORE `engine.inputNode` access
- [ ] `engine.prepare()` called BEFORE reading `outputFormat(forBus:)`
- [ ] Format validated (`sampleRate > 0`, `channelCount > 0`) BEFORE `installTap`
- [ ] `removeTap(onBus: 0)` called BEFORE every `installTap`
- [ ] Tap installed BEFORE `engine.start()`, not after
- [ ] `[weak self]` in tap closure to prevent retain cycles
- [ ] MainActor access from tap uses `Task { @MainActor in }`, not direct property access
- [ ] No `@MainActor` at class level on audio service classes (use method-level isolation)
- [ ] No `reset()` call between recording sessions
- [ ] Simulator guarded with `#if targetEnvironment(simulator)`
- [ ] `nonisolated deinit` only cancels tasks — no engine/session cleanup
- [ ] Cleanup sequence: stop engine, remove tap, finish streams, deactivate session

---

### References

- [AVAudioEngine](https://developer.apple.com/documentation/avfaudio/avaudioengine)
- [AVAudioNode.installTap(onBus:bufferSize:format:block:)](https://developer.apple.com/documentation/avfaudio/avaudionode/1387122-installtap)
- [AVAudioNode.removeTap(onBus:)](https://developer.apple.com/documentation/avfaudio/avaudionode/removetap(onbus:))
- [AVAudioEngine.prepare()](https://developer.apple.com/documentation/avfaudio/avaudioengine/prepare())
- [AVAudioEngine.reset()](https://developer.apple.com/documentation/avfaudio/avaudioengine/1389668-reset)
- [AVAudioSession](https://developer.apple.com/documentation/avfaudio/avaudiosession)
- [AVAudioApplication](https://developer.apple.com/documentation/avfaudio/avaudioapplication)
- [AVAudioFormat](https://developer.apple.com/documentation/avfaudio/avaudioformat)
- [AVAudioPCMBuffer](https://developer.apple.com/documentation/avfaudio/avaudiopcmbuffer)
- [setVoiceProcessingEnabled(\_:)](https://developer.apple.com/documentation/avfaudio/avaudioionode/setvoiceprocessingenabled(_:))
- [AVAudioEngineConfigurationChange Notification](https://developer.apple.com/documentation/foundation/nsnotification/name/1389078-avaudioengineconfigurationchange)
- [Recognizing Speech in Live Audio](https://developer.apple.com/documentation/Speech/recognizing-speech-in-live-audio)
- [Short starter guide for AVAudioEngine (Forums)](https://developer.apple.com/forums/thread/764954)
- [AVAudioEngine in Practice — WWDC 2014](https://developer.apple.com/videos/play/wwdc2014/502/)
- [What's New in AVAudioEngine — WWDC 2019](https://developer.apple.com/videos/play/wwdc2019/510/)
