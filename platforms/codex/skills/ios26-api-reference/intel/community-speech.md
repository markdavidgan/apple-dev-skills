# iOS 26 SpeechTranscriber — Community Intelligence

> Loaded for deep debugging. Real-world gotchas from Swift Forums, developer forums, and production apps.
> For quick reference, use essentials/speech.md instead.

**Report Date:** April 2026  
**Purpose:** Production-ready intelligence for SpeechTranscriber implementation  
**Sources:** Stack Overflow, Apple Developer Forums, GitHub, WWDC 2025, Swift Forums, Kodeco, Production Apps

---

## Executive Summary

iOS 26 introduces `SpeechTranscriber` as the replacement for `SFSpeechRecognizer`. While it offers significant improvements (on-device processing, lower latency, longer audio support), the community has identified **critical production issues** that can crash apps, leak memory, and cause unpredictable behavior.

**CRITICAL:** This API is NOT stable between beta releases. Apps working on Beta 1 may fail on Beta 2+.

---

## 1. CRITICAL CRASHES & STABILITY ISSUES

### 1.1 "Cannot use modules with unallocated locales" (SFSpeechErrorDomain Code=10)

**Severity:** CRITICAL - App-breaking  
**Status:** Confirmed across multiple iOS 26 betas

**Error Pattern:**
```
SpeechAnalyzer: Input loop ending with error: 
Error Domain=SFSpeechErrorDomain Code=10 
"Cannot use modules with unallocated locales [en_US (fixed en_US)]"
```

**Root Cause:**  
Locale assets become corrupted or deallocated between app launches, especially after iOS updates or app reinstalls.

**Real-World Impact:**
- Official WWDC sample app crashes on iPhone 15 Pro with iOS 26 beta 2
- Error is **NOT catchable** - bypasses all catch handlers
- Breaks all transcription functionality

**Workaround (from community):**
```swift
// 1. Always check supportedLocales first
let supported = await SpeechTranscriber.supportedLocales
print("Supported: \(supported)")  // May return empty array!

// 2. Check if locale is installed before using
let installed = await Set(SpeechTranscriber.installedLocales)

// 3. Explicitly allocate locale before use
await AssetInventory.allocate(locale: locale)

// 4. Check transcriber availability
guard SpeechTranscriber.isAvailable else {
    // Fall back to DictationTranscriber or SFSpeechRecognizer
    return
}
```

**Source:** Apple Developer Forums, multiple confirmed reports (iPhone 15 Pro, iOS 26 beta 1→2)

---

### 1.2 SpeechAnalyzer.start(inputSequence:) Fails with _GenericObjCError

**Severity:** CRITICAL - Streaming transcription broken  
**Status:** Confirmed on macOS 26.3, Xcode 26.3  
**Radar:** FB22149971 (filed)

**Error Pattern:**
```
_GenericObjCError domain=Foundation._GenericObjCError code=0 detail=nilError
```

**Affects:** Streaming path only (`start(inputSequence:)`)  
**Does NOT affect:** File-based transcription (`start(inputAudioFile:finishAfterFile:)`)

**Environment:**
- macOS 26.3 (25D122)
- Xcode 26.3
- Swift 6.2.4
- Apple Silicon Mac

**Attempted Fixes (that FAILED):**
- Using DictationTranscriber instead of SpeechTranscriber
- Removing realtime pacing during replay
- Pure Swift CLI reproduction

**Working Alternative:**
```swift
// Use file-based transcription instead of streaming
let fileURL = // ... your audio file
if let lastSample = try await analyzer.analyzeSequence(from: AVAudioFile(forReading: fileURL)) {
    try await analyzer.finalizeAndFinish(through: lastSample)
}
```

**Source:** Apple Developer Forums (confirmed 3+ weeks ago)

---

### 1.3 Sample Rate Mismatch Crash (AVAudioEngine)

**Severity:** HIGH - Crash on recording start  
**Stack Trace:**
```
[avae] AVAEInternal.h:70:_AVAE_Check: required condition is false:
[AVAudioIONodeImpl.mm:911:SetOutputFormat: (format.sampleRate == hwFormat.sampleRate)]
*** Terminating app due to uncaught exception 'com.apple.coreaudio.avfaudio',
reason: 'required condition is false: format.sampleRate == hwFormat.sampleRate'
```

**Root Cause:**  
Audio format mismatch between AVAudioEngine.inputNode and hardware format.

**Production Solution (from Kodeco/Ray Wenderlich):**
```swift
// Always use inputNode.outputFormat(forBus: 0) - don't hardcode
let inputNode = audioEngine.inputNode
let recordingFormat = inputNode.outputFormat(forBus: 0)

// Remove existing tap before installing new one
inputNode.removeTap(onBus: 0)

// Install with the correct format
inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
    self.recognitionRequest?.append(buffer)
}
```

**Additional Safety (from community):**
```swift
// Some developers add sleep to prevent race conditions
usleep(100_000)  // 0.1s delay between removeTap and installTap
try? inputNode.removeTap(onBus: 0)
usleep(100_000)
inputNode.installTap(...)
```

**Source:** Stack Overflow (25 votes, 18k views)

---

### 1.4 AVAudioEngine "throwing -10878" Error

**Severity:** HIGH - Audio pipeline failure  
**Error:**
```
throwing -10878
```

**Root Cause:**  
Adding input sources to mixer fails due to format mismatches or connection issues.

**Common Triggers:**
- mixer.addInput() with incompatible formats
- Voice processing mode conflicts
- AGC (Automatic Gain Control) interference

**Source:** Apple Developer Forums, AudioKit community

---

## 2. MEMORY LEAKS & RESOURCE MANAGEMENT

### 2.1 SFLocalSpeechRecognitionClient Memory Leak

**Severity:** CRITICAL - Unbounded memory growth  
**Affects:** SFSpeechRecognizer (legacy API, may affect new API too)

**Leak Pattern:**
```swift
// Each call creates a new SFLocalSpeechRecognitionClient that NEVER releases
SFSpeechRecognizer(locale: Locale(identifier: "zh_CN"))
```

**Impact in Instruments:**
- SFLocalSpeechRecognitionClient remains in memory
- Grows with each transcription session
- Eventually leads to app termination

**Mitigation:**
```swift
// Reuse a single recognizer instance
class SpeechManager {
    private let speechRecognizer: SFSpeechRecognizer?
    
    init() {
        self.speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US"))
    }
    
    // Don't create new recognizers per session
}
```

**Source:** Apple Developer Forums (confirmed issue)

---

### 2.2 SFSpeechAudioBufferRecognitionRequest Leak

**Severity:** HIGH - Crash after multiple recording sessions  
**Symptom:** App crashes spectacularly after opening recording view multiple times

**Root Cause:**  
Not properly stopping recording and cleaning up resources.

**Required Cleanup Pattern (from Kodeco):**
```swift
fileprivate func stopRecording() {
    audioEngine.stop()
    request.endAudio()
    recognitionTask?.cancel()
    
    // Also remove the tap!
    audioEngine.inputNode.removeTap(onBus: 0)
}

// Call in deinit AND view dismissal
deinit {
    stopRecording()
}
```

**Source:** Kodeco Speech Recognition Tutorial

---

### 2.3 AVAudioSession Not Released (Legacy Pattern)

**Symptom:** Audio session remains active after recording stops, blocking other audio

**Fix:**
```swift
// After stopping recording
try? AVAudioSession.sharedInstance().setActive(false, 
    options: .notifyOthersOnDeactivation)
```

**Source:** Stack Overflow (Speech Recognition with AVAudioEngine Blocks Sound After Recording)

---

## 3. SIMULATOR vs DEVICE DIFFERENCES

### 3.1 SpeechTranscriber Not Available on Simulator

**Status:** CONFIRMED - BY DESIGN

**Symptoms:**
- `SpeechTranscriber.isAvailable` returns `false` on Simulator
- `supportedLocales` returns empty array `[]`
- Console warning: `Cannot use modules with unallocated locales [en_US (fixed en_US)]. Currently allocated locales are []. This will be an error in a future release!`

**Tested On:**
- Xcode 26.0 and 26.1
- macOS Sequoia and macOS Tahoe

**Workaround:**
```swift
#if targetEnvironment(simulator)
    // Use SFSpeechRecognizer for simulator testing
    let recognizer = SFSpeechRecognizer()
#else
    // Use SpeechTranscriber on device
    let transcriber = SpeechTranscriber(locale: locale, ...)
#endif
```

**Source:** Apple Developer Forums (multiple confirmations)

---

### 3.2 Intel Mac Symbol Not Found Crash

**Error:**
```
dyld[2080]: Symbol not found: _$s16FoundationModels20LanguageModelSessionC...
Expected in: /System/Library/Frameworks/FoundationModels.framework/FoundationModels
```

**Status:** Intel Macs NOT supported for Foundation Models/SpeechTranscriber development

**Source:** Apple Developer Forums

---

## 4. PERFORMANCE ISSUES

### 4.1 14+ Second First Result Latency

**Severity:** HIGH  
**Environment:** iOS 26.0 Beta, Xcode Beta 5, iPhone 16 Pro

**Symptom:**
```
[20:30:41.532] Analyzer started successfully
[20:30:56.342] FIRST TRANSCRIPTION RESULT after 14.810s: 'Hello' (isFinal: false)
```

**Compared to:** Old SFSpeechRecognizer is "far faster"

**Hypothesis:** Beta performance issue - should improve in later betas

**Source:** Apple Developer Forums

---

### 4.2 Battery Drain in Long-Running Transcription

**Issue:** iOS 18.0.1+ sound recognition using up to 45% battery per day

**Mitigation Strategies (from WWDC 2022):**
```swift
// 1. Use autoShutdownEnabled on AVAudioEngine
audioEngine.autoShutdownEnabled = true

// 2. Stop engine when not in use
audioEngine.stop()

// 3. Use appropriate audio session categories
try? AVAudioSession.sharedInstance().setCategory(.playAndRecord, 
    mode: .spokenAudio, 
    options: .duckOthers)
```

**Source:** Apple Discussions, WWDC 2022 "Power down: Improve battery consumption"

---

## 5. AUDIO TIME RANGE ISSUES

### 5.1 audioTimeRange Missing from Most Results

**Severity:** MEDIUM  
**Symptom:** 53-minute file yields only 22 single-word results with time ranges

**Expected:** Time range for each transcribed segment  
**Actual:** Most results contain no audioTimeRange

**Configuration Used:**
```swift
let transcriber = SpeechTranscriber(
    locale: locale,
    transcriptionOptions: [],
    reportingOptions: [.volatileResults],
    attributeOptions: [.audioTimeRange]  // Requested but not always provided
)
```

**Community Note:**  
"The SwiftTranscriptionSampleApp and other examples I've seen lead me to believe I should be getting a lot more time ranges than I actually do."

**Source:** Apple Developer Forums

---

### 5.2 audioTimeRange Only in Final Results (Not Volatile)

**Status:** By design or bug?

**Community Report:**
> "only the final result has audio time ranges, not the volatile results. Is this a performance consideration?"

**Impact:** Cannot track timing of interim transcriptions

**Source:** Apple Developer Forums

---

## 6. PRODUCTION-TESTED PATTERNS

### 6.1 Complete Setup Pattern (from WWDC 2025 Sample)

```swift
func setUpTranscriber() async throws {
    transcriber = SpeechTranscriber(
        locale: Locale.current,
        transcriptionOptions: [],
        reportingOptions: [.volatileResults],
        attributeOptions: [.audioTimeRange]
    )
    
    guard let transcriber else {
        throw TranscriptionError.failedToSetupRecognitionStream
    }
    
    analyzer = SpeechAnalyzer(modules: [transcriber])
    
    // Get compatible audio format
    self.analyzerFormat = await SpeechAnalyzer.bestAvailableAudioFormat(
        compatibleWith: [transcriber]
    )
    
    // Ensure model is downloaded
    try await ensureModel(transcriber: transcriber, locale: Locale.current)
    
    // Create input stream
    (inputSequence, inputBuilder) = AsyncStream<AnalyzerInput>.makeStream()
    
    guard let inputSequence else { return }
    
    try await analyzer?.start(inputSequence: inputSequence)
}

func ensureModel(transcriber: SpeechTranscriber, locale: Locale) async throws {
    guard await supported(locale: locale) else {
        throw TranscriptionError.localeNotSupported
    }
    
    if await installed(locale: locale) {
        return
    } else {
        try await downloadIfNeeded(for: transcriber)
    }
}

func supported(locale: Locale) async -> Bool {
    let supported = await SpeechTranscriber.supportedLocales
    return supported.map { $0.identifier(.bcp47) }
        .contains(locale.identifier(.bcp47))
}

func installed(locale: Locale) async -> Bool {
    let installed = await Set(SpeechTranscriber.installedLocales)
    return installed.map { $0.identifier(.bcp47) }
        .contains(locale.identifier(.bcp47))
}

func downloadIfNeeded(for module: SpeechTranscriber) async throws {
    if let downloader = try await AssetInventory.assetInstallationRequest(
        supporting: [module]
    ) {
        self.downloadProgress = downloader.progress
        try await downloader.downloadAndInstall()
    }
}
```

**Source:** WWDC 2025 Session 277, Apple Documentation

---

### 6.2 Audio Conversion Pattern

```swift
func streamAudioToTranscriber(_ buffer: AVAudioPCMBuffer) async throws {
    guard let inputBuilder, let analyzerFormat else {
        throw TranscriptionError.invalidAudioDataType
    }
    
    // CRITICAL: Convert to analyzer's expected format
    let converted = try self.converter.convertBuffer(buffer, to: analyzerFormat)
    let input = AnalyzerInput(buffer: converted)
    
    inputBuilder.yield(input)
}
```

---

### 6.3 Proper Cleanup Pattern

```swift
func stopRecording() async {
    audioEngine.stop()
    audioEngine.inputNode.removeTap(onBus: 0)
    
    // CRITICAL: Finalize to convert volatile results
    try? await analyzer?.finalizeAndFinishThroughEndOfInput()
    
    recognitionTask?.cancel()
    recognitionTask = nil
}

// Also handle app lifecycle
.onDisappear {
    if service.isRecording {
        Task { await service.stopRecording() }
    }
}
```

---

### 6.4 Bluetooth Audio Fix (from ambient-voice)

**Issue:** AVAudioEngine.installTap doesn't fire with Bluetooth devices

**Solution:** Use AVCaptureSession instead

```swift
// Use AVCaptureSession for audio capture
let captureSession = AVCaptureSession()

// Delegate callback fires reliably with Bluetooth
captureOutput(_:didOutput:from:) 

// Tradeoff: CMSampleBuffer needs conversion to AVAudioPCMBuffer
```

**Source:** github.com/Marvinngg/ambient-voice

---

## 7. KNOWN RADAR NUMBERS

| Radar | Issue | Status |
|-------|-------|--------|
| FB22149971 | SpeechAnalyzer.start(inputSequence:) fails with _GenericObjCError | Filed |
| FB19024508 | AVAudioEngine.inputNode shows no channels on bus 0 | Filed |

---

## 8. PRODUCTION CHECKLIST

Before shipping SpeechTranscriber in production:

- [ ] Test on physical device (not simulator)
- [ ] Verify SpeechTranscriber.isAvailable before use
- [ ] Check supportedLocales returns expected values
- [ ] Handle "unallocated locales" error gracefully
- [ ] Use fallback to SFSpeechRecognizer if unavailable
- [ ] Implement proper cleanup in deinit/view dismissal
- [ ] Convert audio to bestAvailableAudioFormat
- [ ] Call finalizeAndFinishThroughEndOfInput on stop
- [ ] Clear volatile results when finalized arrives (avoid duplicates)
- [ ] Test with Bluetooth audio devices
- [ ] Profile memory usage for long sessions
- [ ] Handle model download failures
- [ ] Test across iOS updates (beta stability issues)

---

## 9. RECOMMENDED GITHUB REPOS

| Repo | Description | Key Learnings |
|------|-------------|---------------|
| [Marvinngg/ambient-voice](https://github.com/Marvinngg/ambient-voice) | macOS menu bar transcription app | AVCaptureSession for Bluetooth, speaker diarization |
| [FluidInference/swift-scribe](https://github.com/FluidInference/swift-scribe) | iOS 26 transcription + Foundation Models | Complete SpeechAnalyzer integration |
| [lanserxt/77780783adfa179c7a009042b9cf5a95](https://gist.github.com/lanserxt/77780783adfa179c7a009042b9cf5a95) | Gist: iOS 26 SpeechRecognizer example | Model download, locale checking |
| [DaveyEke/expo-speech-transcriber](https://github.com/DaveyEke/expo-speech-transcriber) | Expo plugin for SpeechTranscriber | Real-time buffer transcription |
| [Cap-go/capacitor-speech-recognition](https://github.com/Cap-go/capacitor-speech-recognition) | Capacitor plugin | On-device recognition fallback |

---

## 10. ERROR CODE REFERENCE

| Code | Domain | Meaning | Solution |
|------|--------|---------|----------|
| 10 | SFSpeechErrorDomain | Cannot use modules with unallocated locales | Allocate locale, check isAvailable |
| 1 | SFSpeechErrorDomain | Asset not found after attempted download | Locale may be unsupported |
| 216 | kAFAssistantErrorDomain | Recognition service unavailable | Network/service limit issue |
| 209 | kAFAssistantErrorDomain | Recognition timeout | Audio too long or service busy |
| 203 | kAFAssistantErrorDomain | Recognition cancelled | Normal when cancelling task |
| 1101 | kAFAssistantErrorDomain | Simulator not supported | Use physical device |
| 1700 | kAFAssistantErrorDomain | Permission denied | Request speech authorization |
| 560030580 | NSOSStatusErrorDomain | Session deactivation failed | Audio session conflict |

---

## 11. CONCLUSION

SpeechTranscriber offers powerful capabilities but requires careful handling:

1. **Always check availability** before using - it can fail silently
2. **Have a fallback** - SFSpeechRecognizer or DictationTranscriber
3. **Test on device** - Simulator support is limited
4. **Profile memory** - Known leaks in related classes
5. **Handle locale allocation** - The "unallocated locales" error is common
6. **Clean up properly** - Memory leaks are easy to introduce
7. **Watch beta compatibility** - API stability varies between releases

---

*Report compiled from community sources. Last updated: April 2026*
