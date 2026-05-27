# Speech Framework — iOS 26 Essentials

> For deep reference: load `reference/speech-reference.md`
> For expert guide: load `guides/expert-speech-audio.md`
> For community intel: load `intel/community-speech.md`

---

## Correct API Signatures (vs Common Hallucinations)

| Concept | CORRECT (iOS 26) | WRONG (Hallucinated) |
|---------|------------------|----------------------|
| Core coordinator | `SpeechAnalyzer` is an **actor** | `SpeechAnalyzer` is a struct/class |
| Transcription module | `SpeechTranscriber` is an **actor** conforming to `SpeechModule` | `SpeechTranscriber` is a class |
| Result stream | `transcriber.results` returns `AsyncThrowingStream<TranscriptionResult, Error>` | Delegate callbacks / completion handlers |
| Result text type | `result.text` is `AttributedString` — extract via `String(result.text.characters)` | `result.text` is `String` |
| Authorization | SpeechTranscriber needs **microphone permission only** | Needs `SFSpeechRecognizer.requestAuthorization()` |
| Audio input | Feed audio via `AsyncStream<AnalyzerInput>` with `continuation.yield(AnalyzerInput(buffer:))` | `request.append(buffer)` / delegate |
| Finalization | `await analyzer.cancelAndFinishNow()` or `analyzer.finalizeAndFinish(through:)` | `task.cancel()` / `task.finish()` |
| Preset init | `SpeechTranscriber(locale:preset:)` | `SpeechTranscriber(locale:options:)` |
| Device check | `SpeechTranscriber.isAvailable` (static Bool) | `SpeechRecognizer.isAvailable` / instance property |
| Supported locales | `await SpeechTranscriber.supportedLocales` (async) | `SFSpeechRecognizer.supportedLocales()` (sync Set) |

---

## Crash Prevention Patterns

### 1. Authorization: Do NOT call SFSpeechRecognizer.requestAuthorization()

```swift
// WRONG — SpeechTranscriber does not use the speech recognition privacy boundary
SFSpeechRecognizer.requestAuthorization { status in ... }
let transcriber = SpeechTranscriber(locale: locale, preset: .progressiveLiveTranscription)

// RIGHT — Only microphone permission is needed
let micStatus = AVAudioApplication.shared.recordPermission
guard micStatus == .granted else { throw MyError.micNotGranted }
let transcriber = SpeechTranscriber(locale: locale, preset: .progressiveLiveTranscription)
```

### 2. AVAudioEngine: prepare() BEFORE querying outputFormat

```swift
// WRONG — outputFormat returns sampleRate=0, channelCount=0, installTap crashes
let format = audioEngine.inputNode.outputFormat(forBus: 0)
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { ... }

// RIGHT — Access inputNode → prepare → query format
let inputNode = audioEngine.inputNode     // Forces node creation
audioEngine.prepare()                     // Builds processing graph
let inputFormat = inputNode.outputFormat(forBus: 0)  // Now returns real hardware format
guard inputFormat.sampleRate > 0, inputFormat.channelCount > 0 else { throw ... }
```

### 3. installTap: Use INPUT format, not target format

```swift
// WRONG — Target format doesn't match hardware; crashes with NSException
let targetFormat = AVAudioFormat(commonFormat: .pcmFormatInt16, sampleRate: 16000, channels: 1, interleaved: true)!
inputNode.installTap(onBus: 0, bufferSize: 1024, format: targetFormat) { ... }

// RIGHT — Tap uses hardware format; convert inside the closure
let inputFormat = inputNode.outputFormat(forBus: 0)
inputNode.installTap(onBus: 0, bufferSize: 1024, format: inputFormat) { [weak self] buffer, _ in
    if let converted = self?.convert(buffer, to: targetFormat) {
        self?.continuation?.yield(AnalyzerInput(buffer: converted))
    }
}
```

### 4. Results: Single consumer only

```swift
// WRONG — Two consumers on AsyncThrowingStream = crash / undefined behavior
Task { for try await r in transcriber.results { ... } }
Task { for try await r in transcriber.results { ... } }

// RIGHT — Single consumer, dispatch to UI
let resultTask = Task {
    for try await result in transcriber.results {
        guard !Task.isCancelled else { break }
        await MainActor.run { self.updateUI(result) }
    }
}
```

### 5. Results: AttributedString, not String

```swift
// WRONG — result.text is AttributedString, not String
let text: String = result.text  // Compile error

// RIGHT — Extract characters
let text = String(result.text.characters)
```

### 6. Cleanup: Correct shutdown order

```swift
// WRONG — Removing tap before stopping engine, or calling reset()
audioEngine.inputNode.removeTap(onBus: 0)
audioEngine.stop()
audioEngine.reset()  // Corrupts engine for next session

// RIGHT — Stop → remove tap → finish stream → finalize analyzer
if audioEngine.isRunning { audioEngine.stop() }
if tapInstalled { audioEngine.inputNode.removeTap(onBus: 0); tapInstalled = false }
inputContinuation?.finish(); inputContinuation = nil
transcriptionTask?.cancel()
if let analyzer { await analyzer.cancelAndFinishNow() }
analyzer = nil; transcriber = nil
try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
```

### 7. Volatile results: Clear on final

```swift
// WRONG — Appending volatile text causes duplication
if result.isFinal { finalText += text }
else { volatileText += text }

// RIGHT — Replace volatile, clear on final
if result.isFinal {
    finalText += text
    volatileText = ""      // MUST clear
} else {
    volatileText = text    // Replace, don't append
}
```

### 8. Tap closure: Weak self, minimal work

```swift
// WRONG — Strong self + heavy work on real-time audio thread
inputNode.installTap(...) { buffer, _ in
    self.process(buffer)         // Retain cycle
    try self.saveToFile(buffer)  // File I/O on audio thread!
}

// RIGHT — Weak capture, just convert and yield
inputNode.installTap(...) { [weak self] buffer, _ in
    if let converted = self?.quickConvert(buffer) {
        self?.continuation?.yield(AnalyzerInput(buffer: converted))
    }
}
```

---

## Known Gotchas

- **SpeechAnalyzer is an actor** — all calls require `await`. Do not try to use it synchronously.
- **Audio format: 16-bit signed PCM** (`.pcmFormatInt16`, 16kHz mono, interleaved) is the expected input. Hardware mic provides 48kHz float32 — you MUST convert.
- **`audioEngine.reset()` corrupts the node graph** — never call between sessions. Just stop + remove tap.
- **`removeTap(onBus:)` without a tap installed crashes** — always track tap state with a boolean flag.
- **`SpeechTranscriber.isAvailable` returns `false` on Simulator** — test on physical device or use `DictationTranscriber` / mocks.
- **Locale format matters** — Use `Locale(identifier: "en-US")` (hyphen) not `"en_US"` (underscore). Compare via `.identifier(.bcp47)`.
- **Filipino/Tagalog not supported** for on-device SpeechTranscriber. Use DictationTranscriber or legacy SFSpeechRecognizer as fallback.
- **16-core Neural Engine required** for SpeechTranscriber — iPhone 12+, iPad Pro M1+, Apple Silicon Macs. iPhone 11, SE 2nd gen, older iPads: use DictationTranscriber.
- **No watchOS support** — `SpeechTranscriber` is not available on Apple Watch.
- **Rapid start/stop cycles** can crash in beta — add debouncing and an `isCleaningUp` guard.
- **Very long sessions (60+ min)** may hit memory pressure — periodically finalize and restart.
- **`nonisolated deinit`** should only cancel tasks — never access audio engine in deinit.

---

## Quick Checklist

Before shipping speech recognition code:

- [ ] `SpeechTranscriber.isAvailable` checked before creating transcriber (fall back to `DictationTranscriber`)
- [ ] Microphone permission checked before starting audio engine — `SFSpeechRecognizer.requestAuthorization()` NOT called
- [ ] `NSMicrophoneUsageDescription` present in Info.plist
- [ ] AVAudioEngine init order: access `inputNode` → `prepare()` → query `outputFormat` → validate → install tap → `prepare()` again → `start()`
- [ ] `installTap` uses the **input** format (hardware), not the target/converted format
- [ ] `transcriber.results` consumed by exactly **one** Task (single-consumer stream)
- [ ] `await analyzer.cancelAndFinishNow()` or `finalizeAndFinish(through:)` called on every shutdown path
- [ ] `[weak self]` in tap closures and Task closures
- [ ] Volatile text cleared when final result arrives; replaced (not appended) on each update
- [ ] Cleanup order: stop engine → remove tap → finish stream → cancel task → finalize analyzer → deactivate session

---

### References

- [Speech Framework](https://developer.apple.com/documentation/speech)
- [SpeechTranscriber](https://developer.apple.com/documentation/speech/speechtranscriber)
- [SpeechAnalyzer](https://developer.apple.com/documentation/speech/speechanalyzer)
- [DictationTranscriber](https://developer.apple.com/documentation/speech/dictationtranscriber)
- [AVAudioEngine](https://developer.apple.com/documentation/avfaudio/avaudioengine)
- [AVAudioInputNode](https://developer.apple.com/documentation/avfaudio/avaudioinputnode)
- [AVAudioSession](https://developer.apple.com/documentation/avfaudio/avaudiosession)
- [WWDC25 Session 277: Bring advanced speech-to-text to your app](https://developer.apple.com/videos/play/wwdc2025/277/)
- [Bringing advanced speech-to-text capabilities to your app (Apple Article)](https://developer.apple.com/documentation/Speech/bringing-advanced-speech-to-text-capabilities-to-your-app)
