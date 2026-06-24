# Speech Framework Comprehensive Reference (iOS 26+)

> **Compiled:** 2026-04-07 (updated 2026-04-08)
> **Purpose:** Definitive reference to prevent crashes in apps using iOS 26 speech recognition
> **Scope:** SpeechTranscriber, SpeechAnalyzer, DictationTranscriber, SpeechDetector, AVAudioEngine integration, permissions, error handling
> **Sources:** Apple Developer Documentation, WWDC25 Session 277, Apple sample code, developer forum reports, open-source implementations

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [SpeechAnalyzer (Core Coordinator)](#speechanalyzer-core-coordinator)
3. [SpeechTranscriber (Primary Module)](#speechtranscriber-primary-module)
4. [DictationTranscriber (Fallback Module)](#dictationtranscriber-fallback-module)
5. [SpeechDetector (VAD Module)](#speechdetector-vad-module)
6. [TranscriptionResult and Result Handling](#transcriptionresult-and-result-handling)
7. [AssetInventory (Model Management)](#assetinventory-model-management)
8. [AVAudioEngine Integration (CRASH-CRITICAL)](#avaudioengine-integration-crash-critical)
9. [Audio Format Conversion](#audio-format-conversion)
10. [Permission Handling](#permission-handling)
11. [Complete Working Examples](#complete-working-examples)
12. [Legacy SFSpeechRecognizer Reference](#legacy-sfspeechrecognizer-reference)
13. [Known Issues and Device Compatibility](#known-issues-and-device-compatibility)
14. [Crash Prevention Checklist](#crash-prevention-checklist)

---

## Architecture Overview

iOS 26 introduces a modular speech-to-text architecture replacing `SFSpeechRecognizer`:

```
                        Your Application
   ┌────────────────────────────────────────────────────┐
   │                                                    │
   │  ┌──────────────┐    ┌──────────────────────────┐  │
   │  │ Audio Source  │    │    Result Consumers      │  │
   │  │              │    │                          │  │
   │  │ AVAudioEngine│    │  for try await result    │  │
   │  │ or           │    │    in transcriber.results│  │
   │  │ AVAudioFile  │    │                          │  │
   │  └──────┬───────┘    └────────────▲─────────────┘  │
   │         │                         │                │
   └─────────┼─────────────────────────┼────────────────┘
             │                         │
   ┌─────────▼─────────────────────────┼────────────────┐
   │              SpeechAnalyzer (actor)                 │
   │                                                    │
   │  AsyncStream<AnalyzerInput>  ──▶  Modules          │
   │                                   ├─ SpeechTranscriber ──▶ results
   │                                   ├─ DictationTranscriber ──▶ results
   │                                   └─ SpeechDetector ──▶ results
   │                                                    │
   └────────────────────┬───────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │   On-Device ML    │
              │ (System-managed,  │
              │  outside app      │
              │  memory space)    │
              └───────────────────┘
```

### Key Design Principles

- **Modular:** Attach one or more modules (SpeechTranscriber, SpeechDetector) to a SpeechAnalyzer
- **Decoupled I/O:** Audio input and result consumption are independent async streams
- **Timeline-based:** All operations use CMTime/CMTimeRange for sample-accurate timing
- **On-device:** Models run in a separate system process, not in your app's memory
- **Auto-updating:** The system automatically installs model updates

---

## SpeechAnalyzer (Core Coordinator)

The central coordinator that routes audio to modules and manages the analysis session.

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, tvOS 26.0, *)
public actor SpeechAnalyzer {
    // Initializers
    public init(modules: [any SpeechModule])
    public init(modules: [any SpeechModule], options: SpeechAnalyzer.Options?)
    
    // Convenience initializer for file-based analysis
    public init(
        inputAudioFile: AVAudioFile,
        modules: [any SpeechModule],
        finishAfterFile: Bool
    )
    
    // Convenience initializer for stream-based analysis
    public init(
        inputSequence: AsyncStream<AnalyzerInput>,
        modules: [any SpeechModule]
    )
}
```

### Starting Analysis

```swift
// Method 1: Start with an AsyncStream of audio buffers (live audio)
public func start(inputSequence: AsyncStream<AnalyzerInput>) async throws

// Method 2: Start with an audio file
public func start(inputAudioFile: AVAudioFile, finishAfterFile: Bool) async throws

// Method 3: Analyze a complete sequence from a file (returns last sample timecode)
public func analyzeSequence(from file: AVAudioFile) async throws -> CMTime?
// Overload accepting URL:
public func analyzeSequence(from url: URL) async throws -> CMTime?
```

### Finishing Analysis

```swift
// Finalize through a specific timecode (for file-based analysis)
public func finalizeAndFinish(through time: CMTime) async throws

// Finalize through end of all input (for live audio — waits for stream to finish)
public func finalizeAndFinishThroughEndOfInput() async throws

// Cancel immediately (may lose pending results)
public func cancelAndFinishNow() async
```

**CRITICAL:** You MUST call one of these finalization methods. Without it:
- Final results may be lost
- Memory leaks may occur  
- The analyzer stays active consuming resources

### Static Methods

```swift
// Get the best audio format compatible with all modules
public static func bestAvailableAudioFormat(
    compatibleWith modules: [any SpeechModule]
) async -> AVAudioFormat
```

### AnalyzerInput

```swift
// Wrapper for audio buffers fed to the analyzer
public struct AnalyzerInput: Sendable {
    public init(buffer: AVAudioPCMBuffer)
}
```

### SpeechModule Protocol

```swift
// Protocol all modules conform to
public protocol SpeechModule: Actor {
    // Module-specific configuration
}
```

### Usage Patterns

#### Pattern 1: Convenience Initializer (File)

```swift
let transcriber = SpeechTranscriber(locale: locale, preset: .offlineTranscription)

// SpeechAnalyzer convenience init handles start automatically
let analyzer = SpeechAnalyzer(
    inputAudioFile: try AVAudioFile(forReading: fileURL),
    modules: [transcriber],
    finishAfterFile: true
)

// Just consume results — analyzer handles start/finish
for try await result in transcriber.results {
    print(result.text)
}
```

#### Pattern 2: Convenience Initializer (Stream)

```swift
let (inputStream, continuation) = AsyncStream.makeStream(of: AnalyzerInput.self)

let transcriber = SpeechTranscriber(locale: locale, preset: .progressiveLiveTranscription)

// SpeechAnalyzer convenience init wires input automatically
let analyzer = SpeechAnalyzer(
    inputSequence: inputStream,
    modules: [transcriber]
)

// Feed audio via continuation
continuation.yield(AnalyzerInput(buffer: convertedBuffer))
// ... later
continuation.finish()
```

#### Pattern 3: Explicit Start (Most Control)

```swift
let transcriber = SpeechTranscriber(locale: locale, preset: .progressiveLiveTranscription)
let analyzer = SpeechAnalyzer(modules: [transcriber])

let (inputStream, continuation) = AsyncStream.makeStream(of: AnalyzerInput.self)
try await analyzer.start(inputSequence: inputStream)
```

#### Pattern 4: File Analysis with analyzeSequence

```swift
let transcriber = SpeechTranscriber(locale: locale, preset: .offlineTranscription)
let analyzer = SpeechAnalyzer(modules: [transcriber])

async let transcription = transcriber.results
    .reduce(AttributedString()) { $0 + $1.text }

if let lastSample = try await analyzer.analyzeSequence(from: AVAudioFile(forReading: url)) {
    try await analyzer.finalizeAndFinish(through: lastSample)
} else {
    await analyzer.cancelAndFinishNow()
}

let text = try await transcription
```

---

## SpeechTranscriber (Primary Module)

The primary speech-to-text transcription module. Uses Apple's advanced on-device model (16-core Neural Engine required).

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, tvOS 26.0, *)
public actor SpeechTranscriber: SpeechModule {

    // Custom configuration
    public init(
        locale: Locale,
        transcriptionOptions: TranscriptionOptions = [],
        reportingOptions: ReportingOptions = [],
        attributeOptions: ResultAttributeOption = []
    )

    // Preset configuration
    public init(locale: Locale, preset: Preset)
}
```

### Presets

```swift
public enum Preset {
    case offlineTranscription           // Final results only, no timing — file processing
    case progressiveLiveTranscription   // Volatile + final results with timing — live UI
    case progressiveTranscription       // Volatile + final results — general live use
    case transcription                  // Basic transcription without volatility
}
```

| Preset | Volatile Results | Timing Data | Best For |
|--------|-----------------|-------------|----------|
| `.offlineTranscription` | No | No | File/batch processing |
| `.progressiveLiveTranscription` | Yes | Yes | Live captions, real-time UI |
| `.progressiveTranscription` | Yes | No | Live transcription without timing needs |
| `.transcription` | No | No | Simple one-shot transcription |

### Configuration Options

#### TranscriptionOptions (OptionSet)

```swift
public struct TranscriptionOptions: OptionSet, Sendable {
    // Currently documented options:
    // (Apple's iOS 26 API surface — verify against latest SDK headers)
}
```

**Note:** In WWDC 2025 sample code, `transcriptionOptions` is consistently passed as `[]` (empty). Apple may add options in future point releases. Pass `[]` for default behavior.

#### ReportingOptions (OptionSet)

```swift
public struct ReportingOptions: OptionSet, Sendable {
    public static let volatileResults: ReportingOptions
}
```

| Option | Effect |
|--------|--------|
| `.volatileResults` | Deliver preliminary (less accurate) results before finalization |

**Without `.volatileResults`:** Only final results. Each audio segment produces exactly one result.
**With `.volatileResults`:** Multiple results per segment. Early results have `isFinal = false`. The final result for a segment has `isFinal = true`. **You MUST clear volatile text when final arrives to avoid duplicates.**

#### ResultAttributeOption (OptionSet)

```swift
public struct ResultAttributeOption: OptionSet, Sendable {
    public static let audioTimeRange: ResultAttributeOption
}
```

| Option | Effect |
|--------|--------|
| `.audioTimeRange` | Include `CMTimeRange` timing data in the AttributedString result |

**Accessing timing data:**

```swift
for try await result in transcriber.results {
    for run in result.text.runs {
        if let timeRange = run.audioTimeRange {
            let start = CMTimeGetSeconds(timeRange.start)
            let duration = CMTimeGetSeconds(timeRange.duration)
        }
    }
}
```

### Properties

```swift
// The result stream — AsyncThrowingStream (SINGLE CONSUMER ONLY)
public var results: AsyncThrowingStream<TranscriptionResult, Error> { get }

// Audio formats compatible with this transcriber
public var availableCompatibleAudioFormats: [AVAudioFormat] { get async }

// Supported locales (class-level)
public static var supportedLocales: [Locale] { get async }

// Installed locales (model already downloaded)
public static var installedLocales: [Locale] { get async }

// Device hardware support check
public static var isAvailable: Bool { get }

// Find the closest supported locale
public static func supportedLocale(equivalentTo locale: Locale) -> Locale?
```

### Device Requirements

`SpeechTranscriber.isAvailable` returns `true` only on devices with a 16-core Neural Engine:

| Device | Supported |
|--------|-----------|
| iPhone 12 and later | Yes |
| iPhone SE (3rd gen) | Yes |
| iPhone SE (2nd gen) | **No** |
| iPhone 11 and earlier | **No** |
| iPad Pro (M1 and later) | Yes |
| iPad Pro (2nd gen, A12Z) | **No** (reported by developers) |
| iPad Air (M1 and later) | Yes |
| Mac (Apple Silicon) | Yes |
| Apple Watch | **Not available** (no watchOS support) |
| iOS Simulator | **No** (returns false) |

**Always check `isAvailable` before creating a SpeechTranscriber. Fall back to DictationTranscriber for unsupported devices.**

### Supported Locales (40+ as of iOS 26.0)

Includes: ar_SA, ca_ES, cs_CZ, da_DK, de_DE, el_GR, en_AU, en_GB, en_IN, en_US, es_ES, es_MX, fi_FI, fr_CA, fr_FR, he_IL, hi_IN, hr_HR, hu_HU, id_ID, it_IT, ja_JP, ko_KR, ms_MY, nb_NO, nl_NL, pl_PL, pt_BR, pt_PT, ro_RO, ru_RU, sk_SK, sv_SE, th_TH, tr_TR, uk_UA, vi_VN, zh_CN, zh_HK, zh_TW

**Filipino/Tagalog (fil/tl) is NOT supported** for on-device SpeechTranscriber. Use DictationTranscriber or legacy SFSpeechRecognizer with network-based recognition as fallback.

---

## DictationTranscriber (Fallback Module)

A speech-to-text module using the same engine as iOS keyboard dictation. Works on older devices and supports the same languages as on-device SFSpeechRecognizer.

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, tvOS 26.0, *)
public actor DictationTranscriber: SpeechModule {
    public init(locale: Locale)
}
```

### Key Differences from SpeechTranscriber

| Feature | SpeechTranscriber | DictationTranscriber |
|---------|-------------------|---------------------|
| Hardware | 16-core Neural Engine | Any iOS 26 device |
| Model | Advanced ML model | Dictation model (same as keyboard) |
| Accuracy | Higher (long-form optimized) | Good (dictation-optimized) |
| Punctuation | Manual/per-segment | Auto-punctuation built-in |
| Use case | Meetings, lectures, long audio | Short dictation, commands |
| Siri/Dictation setup | **NOT required** | **NOT required** |

### Properties

```swift
public static var supportedLocales: [Locale] { get async }
public static var installedLocales: [Locale] { get async }
public var results: AsyncThrowingStream<TranscriptionResult, Error> { get }
```

### Fallback Pattern

```swift
func createTranscriber(for locale: Locale) -> any SpeechModule {
    if SpeechTranscriber.isAvailable {
        return SpeechTranscriber(
            locale: locale,
            preset: .progressiveLiveTranscription
        )
    } else {
        // Fallback for older devices (iPhone 11, SE 2nd gen, etc.)
        return DictationTranscriber(locale: locale)
    }
}
```

---

## SpeechDetector (VAD Module)

Voice Activity Detection module. Identifies when speech is present in audio without transcribing it.

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, tvOS 26.0, *)
public actor SpeechDetector: SpeechModule {
    public init(
        detectionOptions: DetectionOptions,
        reportResults: Bool
    )
}
```

### DetectionOptions

```swift
public struct DetectionOptions {
    public init(sensitivityLevel: SensitivityLevel)
    
    public enum SensitivityLevel {
        case low
        case medium
        case high
    }
}
```

### Usage

```swift
let transcriber = SpeechTranscriber(locale: locale, preset: .progressiveLiveTranscription)
let detector = SpeechDetector(
    detectionOptions: .init(sensitivityLevel: .medium),
    reportResults: true
)

// Combine both modules in a single analyzer
let analyzer = SpeechAnalyzer(modules: [detector, transcriber])

// Each module has its own results stream
for try await detection in detector.results {
    // Voice activity detected/ended
}

for try await transcription in transcriber.results {
    // Transcribed text
}
```

**Note:** SpeechDetector requires pairing with either SpeechTranscriber or DictationTranscriber. It cannot operate standalone.

---

## TranscriptionResult and Result Handling

### TranscriptionResult

```swift
public struct TranscriptionResult: Sendable {
    /// The transcribed text as an AttributedString (may include timing attributes)
    public let text: AttributedString
    
    /// true = final (immutable), false = volatile (preliminary, may change)
    public let isFinal: Bool
}
```

### Accessing Timing Attributes

When `.audioTimeRange` is specified in `attributeOptions`:

```swift
// Access from the AttributedString's runs
for run in result.text.runs {
    if let timeRange = run.audioTimeRange {
        // timeRange is CMTimeRange
        let startSeconds = CMTimeGetSeconds(timeRange.start)
        let durationSeconds = CMTimeGetSeconds(timeRange.duration)
    }
}

// Or from the top-level text
let topLevelRange = result.text.audioTimeRange  // CMTimeRange?
```

### Correct Volatile Result Handling

```swift
// CRITICAL: Clear volatile text when final arrives
var finalizedText = ""
var volatileText = ""

for try await result in transcriber.results {
    guard !Task.isCancelled else { break }
    
    let text = String(result.text.characters)
    
    if result.isFinal {
        finalizedText += text
        volatileText = ""           // MUST clear to avoid duplication
    } else {
        volatileText = text         // Replace (don't append) volatile text
    }
}

// Display: finalizedText + volatileText
```

### Single-Consumer Constraint

`transcriber.results` is a **single-consumer** `AsyncThrowingStream`. You can only iterate it once.

```swift
// WRONG: Two consumers crash or cause undefined behavior
Task { for try await r in transcriber.results { ... } }
Task { for try await r in transcriber.results { ... } }  // CRASH

// CORRECT: Single consumer, broadcast if needed
let resultTask = Task {
    for try await result in transcriber.results {
        // Process in one place, dispatch to UI
        await MainActor.run { updateUI(result) }
    }
}
```

---

## AssetInventory (Model Management)

Manages downloadable language models for offline operation.

### Checking Status

```swift
// Check if modules have their required assets
let status = await AssetInventory.status(forModules: [transcriber])

// Status values:
// .installed    — Ready to use
// .supported    — Available for download
// .downloading  — Currently downloading
// .unsupported  — Not available for this device/locale
```

### Downloading Models

```swift
func ensureModel(for module: any SpeechModule) async throws {
    if let downloader = try await AssetInventory.assetInstallationRequest(
        supporting: [module]
    ) {
        // Track progress
        let progress = downloader.progress
        
        // Download and install (blocks until complete)
        try await downloader.downloadAndInstall()
    }
    // nil return = already installed
}
```

### Checking Locale Support

```swift
func isLocaleSupported(_ locale: Locale) async -> Bool {
    let supported = await SpeechTranscriber.supportedLocales
    return supported.map { $0.identifier(.bcp47) }
        .contains(locale.identifier(.bcp47))
}

func isLocaleInstalled(_ locale: Locale) async -> Bool {
    let installed = await SpeechTranscriber.installedLocales
    return installed.map { $0.identifier(.bcp47) }
        .contains(locale.identifier(.bcp47))
}
```

### Deallocating Models

```swift
// Free disk space by removing downloaded models
let allocated = await AssetInventory.allocatedLocales
for locale in allocated {
    await AssetInventory.deallocate(locale: locale)
}
```

---

## AVAudioEngine Integration (CRASH-CRITICAL)

**This section documents the exact initialization order to prevent the most common crashes.** Incorrect AVAudioEngine setup is the #1 source of crashes in speech recognition apps.

### The Correct Initialization Order

```
1. Configure AVAudioSession
2. Access audioEngine.inputNode          (creates the node)
3. Call audioEngine.prepare()            (prepares the graph)
4. Query inputNode.outputFormat(forBus:) (NOW returns valid format)
5. Create AVAudioConverter               (input format → target format)
6. Install tap on inputNode              (with input format)
7. Call audioEngine.prepare() again       (re-prepares with tap)
8. Call audioEngine.start()              (begins audio flow)
```

### Why This Order Matters

**`inputNode.outputFormat(forBus: 0)` BEFORE `prepare()`** can return a stale/placeholder format with sampleRate=0 or channelCount=0. This causes `installTap` to throw an uncatchable `NSException`.

**Accessing `inputNode` first** forces the engine to create the input node and connect it to the hardware. Then `prepare()` builds the processing graph. Only AFTER that does `outputFormat` return the real hardware format.

### Complete AVAudioEngine Setup (Production-Proven Pattern)

```swift
@MainActor
func setupAndStartRecording() throws {
    // STEP 1: Configure audio session
    let audioSession = AVAudioSession.sharedInstance()
    try audioSession.setCategory(
        .playAndRecord,
        mode: .spokenAudio,
        options: [.duckOthers, .defaultToSpeaker]
    )
    try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
    
    // Verify hardware
    guard let inputs = audioSession.availableInputs, !inputs.isEmpty else {
        throw AudioError.noInputHardware
    }
    guard !audioSession.currentRoute.inputs.isEmpty else {
        throw AudioError.noActiveRoute
    }
    
    // STEP 2: Access inputNode (forces creation)
    let inputNode = audioEngine.inputNode
    
    // STEP 3: Prepare the engine (builds graph including input node)
    audioEngine.prepare()
    
    // STEP 4: NOW query the format (returns real hardware format)
    let inputFormat = inputNode.outputFormat(forBus: 0)
    
    // STEP 5: Validate format
    guard inputFormat.sampleRate > 0, inputFormat.channelCount > 0 else {
        throw AudioError.invalidFormat
    }
    
    // STEP 6: Create target format for SpeechAnalyzer
    // SpeechAnalyzer requires 16-bit signed integer PCM, 16kHz mono
    guard let targetFormat = AVAudioFormat(
        commonFormat: .pcmFormatInt16,
        sampleRate: 16000,
        channels: 1,
        interleaved: true
    ) else {
        throw AudioError.formatCreationFailed
    }
    
    // STEP 7: Create converter
    guard let converter = AVAudioConverter(from: inputFormat, to: targetFormat) else {
        throw AudioError.converterCreationFailed
    }
    
    // STEP 8: Install tap (with INPUT format, not target format)
    inputNode.installTap(
        onBus: 0,
        bufferSize: 1024,
        format: inputFormat
    ) { [weak self] buffer, _ in
        // CRITICAL: This runs on the real-time audio thread
        // Keep work MINIMAL — just convert and yield
        guard let self else { return }
        
        // Convert format
        let frameCapacity = AVAudioFrameCount(
            targetFormat.sampleRate * Double(buffer.frameLength) / inputFormat.sampleRate
        ) + 1
        guard let converted = AVAudioPCMBuffer(
            pcmFormat: targetFormat,
            frameCapacity: frameCapacity
        ) else { return }
        
        var error: NSError?
        converter.convert(to: converted, error: &error) { _, outStatus in
            outStatus.pointee = .haveData
            return buffer
        }
        
        if error == nil {
            self.inputContinuation?.yield(AnalyzerInput(buffer: converted))
        }
    }
    inputTapInstalled = true
    
    // STEP 9: Prepare again (with tap installed)
    audioEngine.prepare()
    
    // STEP 10: Start
    try audioEngine.start()
}
```

### Audio Session Categories for Speech

| Category | Mode | Use Case |
|----------|------|----------|
| `.record` | `.measurement` | Pure recording, no playback needed |
| `.playAndRecord` | `.spokenAudio` | Recording + audio feedback/alerts |
| `.playAndRecord` | `.default` | Recording + music/sound playback |

### Cleanup Sequence (Also Crash-Critical)

```swift
@MainActor
func stopRecording() async {
    // 1. Stop the engine FIRST (stops audio flow)
    if audioEngine.isRunning {
        audioEngine.stop()
    }
    
    // 2. Remove tap (MUST happen after stop)
    if inputTapInstalled {
        audioEngine.inputNode.removeTap(onBus: 0)
        inputTapInstalled = false
    }
    
    // 3. Signal end of input stream
    inputContinuation?.finish()
    inputContinuation = nil
    
    // 4. Cancel result consumption task
    transcriptionTask?.cancel()
    transcriptionTask = nil
    
    // 5. Finalize analyzer (delivers remaining results)
    if let analyzer {
        await analyzer.cancelAndFinishNow()
    }
    analyzer = nil
    transcriber = nil
    
    // 6. Deactivate audio session
    let audioSession = AVAudioSession.sharedInstance()
    try? audioSession.setActive(false, options: .notifyOthersOnDeactivation)
    
    // WARNING: Do NOT call audioEngine.reset() — it destroys the
    // node graph and corrupts the engine for subsequent recordings.
}
```

### Common AVAudioEngine Crashes

#### Crash 1: outputFormat Returns Zero

```swift
// WRONG: Query format before prepare
let format = audioEngine.inputNode.outputFormat(forBus: 0)
// format.sampleRate == 0, format.channelCount == 0
audioEngine.inputNode.installTap(..., format: format, ...)
// NSException: required condition is false: IsFormatSampleRateAndChannelCountValid
```

**Fix:** Always call `audioEngine.prepare()` before querying `outputFormat`.

#### Crash 2: installTap with Wrong Format

```swift
// WRONG: Using the target/converted format for the tap
inputNode.installTap(onBus: 0, bufferSize: 4096, format: targetFormat) { ... }
// Crash if targetFormat doesn't match hardware format

// CORRECT: Use the input node's output format
let inputFormat = inputNode.outputFormat(forBus: 0)
inputNode.installTap(onBus: 0, bufferSize: 4096, format: inputFormat) { ... }
```

#### Crash 3: Unbalanced removeTap

```swift
// WRONG: Removing tap that was never installed
audioEngine.inputNode.removeTap(onBus: 0)  // Crash

// CORRECT: Track tap state
if inputTapInstalled {
    audioEngine.inputNode.removeTap(onBus: 0)
    inputTapInstalled = false
}
```

#### Crash 4: audioEngine.reset() Between Sessions

```swift
// WRONG: Calling reset destroys the node graph
audioEngine.stop()
audioEngine.reset()  // Corrupts engine for next session

// CORRECT: Just stop and remove tap
audioEngine.stop()
audioEngine.inputNode.removeTap(onBus: 0)
// Next session: create a new AVAudioEngine or just re-setup
```

#### Crash 5: Strong Self in Tap Closure

```swift
// WRONG: Retain cycle causes leak and crash on dealloc
inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, _ in
    self.process(buffer)  // Strong reference cycle
}

// CORRECT: Weak capture
inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
    self?.process(buffer)
}
```

#### Crash 6: Heavy Work in Tap Closure

```swift
// WRONG: Tap runs on real-time audio thread
inputNode.installTap(...) { buffer, _ in
    let converted = self.heavyConversion(buffer)  // May cause audio glitches
    try self.saveToFile(buffer)                     // File I/O on audio thread!
    Task { await self.updateUI() }                  // Task creation overhead
}

// CORRECT: Minimal work — just yield to stream
inputNode.installTap(...) { [weak self] buffer, _ in
    // Quick conversion + yield only
    if let converted = self?.quickConvert(buffer) {
        self?.continuation?.yield(AnalyzerInput(buffer: converted))
    }
}
```

---

## Audio Format Conversion

SpeechAnalyzer expects audio in a specific format (typically 16-bit PCM, 16kHz mono). The hardware microphone provides audio in a different format (usually 48kHz float32). You MUST convert.

### BufferConverter Class

```swift
class BufferConverter {
    enum ConversionError: Error {
        case failedToCreateConverter
        case failedToCreateBuffer
        case conversionFailed(NSError?)
    }
    
    private var converter: AVAudioConverter?
    
    func convertBuffer(
        _ buffer: AVAudioPCMBuffer,
        to outputFormat: AVAudioFormat
    ) throws -> AVAudioPCMBuffer {
        let inputFormat = buffer.format
        
        // Skip conversion if formats match
        guard inputFormat != outputFormat else {
            return buffer
        }
        
        // Create or update converter
        if converter == nil || converter?.outputFormat != outputFormat {
            converter = AVAudioConverter(from: inputFormat, to: outputFormat)
            converter?.primeMethod = .none
        }
        
        guard let converter else {
            throw ConversionError.failedToCreateConverter
        }
        
        // Calculate output frame capacity
        let sampleRateRatio = converter.outputFormat.sampleRate / converter.inputFormat.sampleRate
        let scaledFrameLength = Double(buffer.frameLength) * sampleRateRatio
        let frameCapacity = AVAudioFrameCount(scaledFrameLength.rounded(.up))
        
        guard let outputBuffer = AVAudioPCMBuffer(
            pcmFormat: converter.outputFormat,
            frameCapacity: frameCapacity
        ) else {
            throw ConversionError.failedToCreateBuffer
        }
        
        var error: NSError?
        var inputConsumed = false
        
        let status = converter.convert(
            to: outputBuffer,
            error: &error
        ) { packetCount, statusPointer in
            defer { inputConsumed = true }
            statusPointer.pointee = inputConsumed ? .noDataNow : .haveData
            return inputConsumed ? nil : buffer
        }
        
        guard status != .error else {
            throw ConversionError.conversionFailed(error)
        }
        
        return outputBuffer
    }
}
```

### Alternative: Using bestAvailableAudioFormat

Instead of hardcoding 16kHz PCM, you can ask the analyzer for its preferred format:

```swift
let analyzerFormat = await SpeechAnalyzer.bestAvailableAudioFormat(
    compatibleWith: [transcriber]
)
// Use this format as the conversion target
```

---

## Permission Handling

### SpeechTranscriber: Microphone Only

**CRITICAL CORRECTION:** `SpeechTranscriber` and `SpeechAnalyzer` (iOS 26, on-device) do **NOT** require `SFSpeechRecognizer.requestAuthorization()`. They process audio buffers fed via `AsyncStream<AnalyzerInput>` -- they don't access the speech recognition privacy boundary.

Only **microphone permission** is needed.

Apple's own sample code from WWDC25 never calls `SFSpeechRecognizer.requestAuthorization()` for the new APIs.

### Required: Microphone Permission

```swift
// Check current status
let micStatus = AVAudioApplication.shared.recordPermission
// .granted, .denied, .undetermined

// Request permission (async)
func requestMicrophonePermission() async -> Bool {
    await withCheckedContinuation { continuation in
        AVAudioApplication.requestRecordPermission { granted in
            continuation.resume(returning: granted)
        }
    }
}
```

### Info.plist Keys

```xml
<!-- REQUIRED for microphone access -->
<key>NSMicrophoneUsageDescription</key>
<string>MyApp uses the microphone for live speech recognition.</string>

<!-- OPTIONAL: Only needed if also using legacy SFSpeechRecognizer -->
<key>NSSpeechRecognitionUsageDescription</key>
<string>MyApp uses speech recognition to transcribe your speech.</string>
```

### Permission Sequencing (DO NOT CHAIN)

```swift
// WRONG: Requesting both permissions simultaneously can crash
Task {
    let mic = await requestMicPermission()
    let speech = await requestSpeechPermission()  // May crash if mic dialog still showing
}

// CORRECT: Request permissions ONE AT A TIME with user action
// Step 1: Show custom UI explaining what's needed
// Step 2: User taps "Enable Microphone"
// Step 3: System dialog appears
// Step 4: After user responds, proceed or show next permission

// For SpeechTranscriber: Only microphone is needed anyway
```

### Complete Permission Check Pattern

```swift
@MainActor
func ensureMicrophonePermission() async -> Bool {
    let status = AVAudioApplication.shared.recordPermission
    
    switch status {
    case .granted:
        return true
    case .denied:
        // Cannot re-prompt — direct to Settings
        return false
    case .undetermined:
        return await requestMicrophonePermission()
    @unknown default:
        return false
    }
}
```

---

## Complete Working Examples

### Example 1: Live Transcription (Production Pattern)

This is a production-proven pattern for live speech transcription:

```swift
import Speech
import AVFoundation
import os.log

private let logger = Logger(subsystem: "com.myapp", category: "Speech")

@Observable
class LiveSpeechService {
    var isListening = false
    var errorMessage: String?
    
    var onSegment: (@Sendable (String) -> Void)?
    
    private var _audioEngine: AVAudioEngine?
    private var audioEngine: AVAudioEngine {
        if let existing = _audioEngine { return existing }
        let engine = AVAudioEngine()
        _audioEngine = engine
        return engine
    }
    
    private var transcriber: SpeechTranscriber?
    private var analyzer: SpeechAnalyzer?
    private var inputContinuation: AsyncStream<AnalyzerInput>.Continuation?
    private var transcriptionTask: Task<Void, Never>?
    
    @ObservationIgnored nonisolated(unsafe) private var _inputTapInstalled = false
    private var isCleaningUp = false
    
    nonisolated deinit {
        // Only cancel tasks — don't touch audio engine in deinit
    }
    
    @MainActor
    func startListening(locale: Locale = .current) throws {
        guard !isCleaningUp else { return }
        guard !isListening else { return }
        
        let micStatus = AVAudioApplication.shared.recordPermission
        guard micStatus == .granted else {
            throw SpeechError.microphoneNotGranted
        }
        
        guard SpeechTranscriber.isAvailable else {
            throw SpeechError.notAvailableOnDevice
        }
        
        // 1. Audio session
        let session = AVAudioSession.sharedInstance()
        try session.setCategory(.playAndRecord, mode: .spokenAudio,
                                options: [.duckOthers, .defaultToSpeaker])
        try session.setActive(true, options: .notifyOthersOnDeactivation)
        
        // 2. Access inputNode → prepare → query format
        let inputNode = audioEngine.inputNode
        audioEngine.prepare()
        let inputFormat = inputNode.outputFormat(forBus: 0)
        
        guard inputFormat.sampleRate > 0, inputFormat.channelCount > 0 else {
            throw SpeechError.audioInputUnavailable
        }
        
        // 3. Target format
        guard let targetFormat = AVAudioFormat(
            commonFormat: .pcmFormatInt16,
            sampleRate: 16000, channels: 1, interleaved: true
        ) else {
            throw SpeechError.formatCreationFailed
        }
        
        guard let converter = AVAudioConverter(from: inputFormat, to: targetFormat) else {
            throw SpeechError.converterCreationFailed
        }
        
        // 4. Create transcriber
        let newTranscriber = SpeechTranscriber(
            locale: locale,
            preset: .progressiveTranscription
        )
        self.transcriber = newTranscriber
        
        // 5. Create input stream and analyzer
        let (inputStream, continuation) = AsyncStream.makeStream(of: AnalyzerInput.self)
        self.inputContinuation = continuation
        
        let newAnalyzer = SpeechAnalyzer(
            inputSequence: inputStream,
            modules: [newTranscriber]
        )
        self.analyzer = newAnalyzer
        
        // 6. Install tap
        inputNode.installTap(
            onBus: 0, bufferSize: 1024, format: inputFormat
        ) { [weak self] buffer, _ in
            guard let self else { return }
            
            let frameCapacity = AVAudioFrameCount(
                targetFormat.sampleRate * Double(buffer.frameLength) / inputFormat.sampleRate
            ) + 1
            guard let converted = AVAudioPCMBuffer(
                pcmFormat: targetFormat, frameCapacity: frameCapacity
            ) else { return }
            
            var error: NSError?
            converter.convert(to: converted, error: &error) { _, outStatus in
                outStatus.pointee = .haveData
                return buffer
            }
            
            if error == nil {
                continuation.yield(AnalyzerInput(buffer: converted))
            }
        }
        _inputTapInstalled = true
        
        // 7. Start engine
        audioEngine.prepare()
        try audioEngine.start()
        
        // 8. Start consuming results
        transcriptionTask = Task { @MainActor [weak self] in
            guard let self else { return }
            do {
                for try await result in newTranscriber.results {
                    guard !Task.isCancelled else { break }
                    let text = String(result.text.characters)
                    self.onSegment?(text)
                }
            } catch is CancellationError {
                logger.debug("Transcription cancelled")
            } catch {
                logger.error("Transcription error: \(error.localizedDescription)")
                self.errorMessage = error.localizedDescription
            }
        }
        
        isListening = true
    }
    
    @MainActor
    func stopListening() async {
        guard !isCleaningUp else { return }
        isCleaningUp = true
        
        isListening = false
        
        if audioEngine.isRunning { audioEngine.stop() }
        if _inputTapInstalled {
            audioEngine.inputNode.removeTap(onBus: 0)
            _inputTapInstalled = false
        }
        
        inputContinuation?.finish()
        inputContinuation = nil
        
        transcriptionTask?.cancel()
        transcriptionTask = nil
        
        if let analyzer {
            await analyzer.cancelAndFinishNow()
        }
        analyzer = nil
        transcriber = nil
        
        try? AVAudioSession.sharedInstance().setActive(
            false, options: .notifyOthersOnDeactivation
        )
        
        isCleaningUp = false
    }
}

enum SpeechError: LocalizedError {
    case microphoneNotGranted
    case notAvailableOnDevice
    case audioInputUnavailable
    case formatCreationFailed
    case converterCreationFailed
    
    var errorDescription: String? {
        switch self {
        case .microphoneNotGranted: return "Microphone permission not granted"
        case .notAvailableOnDevice: return "Speech recognition not available on this device"
        case .audioInputUnavailable: return "Audio input unavailable"
        case .formatCreationFailed: return "Failed to create audio format"
        case .converterCreationFailed: return "Failed to create audio converter"
        }
    }
}
```

### Example 2: File Transcription

```swift
func transcribeFile(at url: URL, locale: Locale) async throws -> String {
    let transcriber = SpeechTranscriber(locale: locale, preset: .offlineTranscription)
    
    // Ensure model is downloaded
    if let downloader = try await AssetInventory.assetInstallationRequest(
        supporting: [transcriber]
    ) {
        try await downloader.downloadAndInstall()
    }
    
    // Collect results concurrently
    async let transcription = transcriber.results
        .reduce(AttributedString()) { $0 + $1.text }
    
    // Analyze file
    let analyzer = SpeechAnalyzer(modules: [transcriber])
    let audioFile = try AVAudioFile(forReading: url)
    
    if let lastSample = try await analyzer.analyzeSequence(from: audioFile) {
        try await analyzer.finalizeAndFinish(through: lastSample)
    } else {
        await analyzer.cancelAndFinishNow()
    }
    
    return String((try await transcription).characters)
}
```

### Example 3: Combined SpeechDetector + SpeechTranscriber

```swift
func transcribeWithVAD(fileURL: URL, locale: Locale) async throws {
    let transcriber = SpeechTranscriber(
        locale: locale,
        transcriptionOptions: [],
        reportingOptions: [.volatileResults],
        attributeOptions: [.audioTimeRange]
    )
    let detector = SpeechDetector(
        detectionOptions: .init(sensitivityLevel: .medium),
        reportResults: true
    )
    
    // Ensure model for both modules
    try await ensureModel(for: transcriber, locale: locale)
    try await ensureModel(for: detector, locale: locale)
    
    let analyzer = SpeechAnalyzer(modules: [detector, transcriber])
    
    // Start result consumers concurrently
    async let transcriptionResults: () = {
        for try await result in transcriber.results {
            if result.isFinal {
                print("FINAL: \(result.text)")
            }
        }
    }()
    
    // Analyze
    let audioFile = try AVAudioFile(forReading: fileURL)
    if let lastSample = try await analyzer.analyzeSequence(from: audioFile) {
        try await analyzer.finalizeAndFinish(through: lastSample)
    } else {
        await analyzer.cancelAndFinishNow()
    }
    
    try await transcriptionResults
}
```

---

## Legacy SFSpeechRecognizer Reference

For code that must support iOS 10-25 or as a fallback.

### Key Classes

```swift
// Recognizer
class SFSpeechRecognizer {
    init?(locale: Locale)
    
    static func requestAuthorization(_ handler: @escaping (SFSpeechRecognizerAuthorizationStatus) -> Void)
    static func authorizationStatus() -> SFSpeechRecognizerAuthorizationStatus
    static func supportedLocales() -> Set<Locale>
    
    var isAvailable: Bool { get }
    var supportsOnDeviceRecognition: Bool { get }
    var delegate: SFSpeechRecognizerDelegate? { get set }
    var defaultTaskHint: SFSpeechRecognitionTaskHint { get set }
    
    func recognitionTask(with request: SFSpeechRecognitionRequest,
                         resultHandler: @escaping (SFSpeechRecognitionResult?, Error?) -> Void) -> SFSpeechRecognitionTask
    func recognitionTask(with request: SFSpeechRecognitionRequest,
                         delegate: SFSpeechRecognitionTaskDelegate) -> SFSpeechRecognitionTask
}

// Authorization status
enum SFSpeechRecognizerAuthorizationStatus: Int {
    case notDetermined
    case denied
    case restricted
    case authorized
}

// Request types
class SFSpeechRecognitionRequest {
    var taskHint: SFSpeechRecognitionTaskHint
    var shouldReportPartialResults: Bool
    var contextualStrings: [String]
    var requiresOnDeviceRecognition: Bool
}

class SFSpeechAudioBufferRecognitionRequest: SFSpeechRecognitionRequest {
    func append(_ audioPCMBuffer: AVAudioPCMBuffer)
    func endAudio()
}

class SFSpeechURLRecognitionRequest: SFSpeechRecognitionRequest {
    init(url: URL)
}

// Task
class SFSpeechRecognitionTask {
    var state: SFSpeechRecognitionTaskState { get }
    var isFinishing: Bool { get }
    var isCancelled: Bool { get }
    var error: Error? { get }
    func cancel()
    func finish()
}

// Result
class SFSpeechRecognitionResult {
    var bestTranscription: SFTranscription { get }
    var transcriptions: [SFTranscription] { get }
    var isFinal: Bool { get }
    var speechRecognitionMetadata: SFSpeechRecognitionMetadata? { get }
}

// Transcription
class SFTranscription {
    var formattedString: String { get }
    var segments: [SFTranscriptionSegment] { get }
}

class SFTranscriptionSegment {
    var substring: String { get }
    var substringRange: NSRange { get }
    var timestamp: TimeInterval { get }
    var duration: TimeInterval { get }
    var confidence: Float { get }
    var alternativeSubstrings: [String] { get }
}
```

### Migration Guide: Legacy to Modern

| Legacy (SFSpeechRecognizer) | Modern (SpeechAnalyzer) |
|----------------------------|------------------------|
| `SFSpeechRecognizer(locale:)` | `SpeechTranscriber(locale:preset:)` |
| `SFSpeechRecognizer.requestAuthorization()` | Not needed (microphone only) |
| `SFSpeechAudioBufferRecognitionRequest()` | `AsyncStream<AnalyzerInput>` |
| `request.append(buffer)` | `continuation.yield(AnalyzerInput(buffer:))` |
| `request.endAudio()` | `continuation.finish()` |
| `recognitionTask(with:resultHandler:)` | `for try await result in transcriber.results` |
| `result.bestTranscription.formattedString` | `String(result.text.characters)` |
| `result.isFinal` | `result.isFinal` (same concept) |
| `task.cancel()` | `await analyzer.cancelAndFinishNow()` |
| `task.finish()` | `await analyzer.finalizeAndFinishThroughEndOfInput()` |
| `delegate.speechRecognizer(_:availabilityDidChange:)` | `SpeechTranscriber.isAvailable` (static check) |
| 1-minute recording limit | No limit (long-form supported) |
| Server or on-device | Always on-device |
| In-app memory | Out-of-process (system-managed) |

---

## Known Issues and Device Compatibility

### Locale Initialization Error

Developers have reported `SpeechTranscriber cannot be initialized with an unsupported locale: en_US (fixed en_US)`. This occurs when the locale identifier format doesn't match what `supportedLocales` returns.

**Fix:** Always use BCP47 identifier comparison:

```swift
let locale = Locale(identifier: "en-US")  // Use hyphen, not underscore
// Or compare using:
supported.map { $0.identifier(.bcp47) }.contains(locale.identifier(.bcp47))
```

### Simulator Limitations

- `SpeechTranscriber.isAvailable` returns `false` on Simulator
- Testing requires a physical device
- Use DictationTranscriber or mock objects for Simulator testing

### iPad Compatibility

Some older iPad Pro models (2nd gen, A12Z) may not support SpeechTranscriber despite running iOS 26. Always check `isAvailable` at runtime.

### Beta Stability Notes

As of iOS 26 beta 3 (and release candidates), some developers have reported:
- Occasional crashes during rapid start/stop cycles
- Model download failures on poor network connections
- Memory pressure issues with very long (60+ minute) transcription sessions

Mitigations: Add debouncing between start/stop, retry model downloads with exponential backoff, and periodically finalize/restart for very long sessions.

---

## Crash Prevention Checklist

Before shipping speech recognition code, verify ALL of these:

### AVAudioEngine

- [ ] `audioEngine.prepare()` called BEFORE `inputNode.outputFormat(forBus:)`
- [ ] `inputNode` accessed BEFORE `prepare()` (forces node creation)
- [ ] `inputFormat.sampleRate > 0 && channelCount > 0` validated
- [ ] `installTap` uses the INPUT format (not the target/converted format)
- [ ] Tap closure captures `[weak self]` (no retain cycles)
- [ ] Tap closure does minimal work (no file I/O, no heavy computation)
- [ ] `inputTapInstalled` flag tracks tap state
- [ ] `removeTap` only called when `inputTapInstalled == true`
- [ ] `audioEngine.reset()` is NEVER called between sessions
- [ ] Audio session deactivated AFTER engine stop

### SpeechAnalyzer/Transcriber

- [ ] `SpeechTranscriber.isAvailable` checked before creating transcriber
- [ ] Locale support verified via `supportedLocales`
- [ ] `transcriber.results` consumed by exactly ONE task (single-consumer)
- [ ] `analyzer.cancelAndFinishNow()` or `finalizeAndFinish` called on shutdown
- [ ] Analyzer finalization happens BEFORE setting `analyzer = nil`
- [ ] `inputContinuation.finish()` called before stopping engine
- [ ] `Task.isCancelled` checked inside result consumption loop

### Permissions

- [ ] `NSMicrophoneUsageDescription` in Info.plist
- [ ] Microphone permission checked BEFORE starting audio engine
- [ ] `SFSpeechRecognizer.requestAuthorization()` NOT called for SpeechTranscriber
- [ ] Permissions requested ONE AT A TIME (never chained)

### Concurrency

- [ ] UI updates dispatched to `@MainActor`
- [ ] `[weak self]` in ALL Task closures and tap closures
- [ ] Class NOT marked `@MainActor` at class level (prevents deinit crashes)
- [ ] `nonisolated deinit` only cancels tasks (no audio engine access)
- [ ] `isCleaningUp` flag prevents re-entrancy during cleanup

### Volatile Results

- [ ] Volatile text cleared when final result arrives
- [ ] Volatile text REPLACED (not appended) on each update

---

## References

- [Speech Framework Documentation](https://developer.apple.com/documentation/speech)
- [SpeechTranscriber Documentation](https://developer.apple.com/documentation/speech/speechtranscriber)
- [SpeechAnalyzer Documentation](https://developer.apple.com/documentation/speech/speechanalyzer)
- [WWDC25 Session 277: Bring advanced speech-to-text to your app with SpeechAnalyzer](https://developer.apple.com/videos/play/wwdc2025/277/)
- [Bringing advanced speech-to-text capabilities to your app (Apple Article)](https://developer.apple.com/documentation/Speech/bringing-advanced-speech-to-text-capabilities-to-your-app)
- [SpeechTranscriber.Preset Documentation](https://developer.apple.com/documentation/speech/speechtranscriber/preset)
- [SpeechTranscriber.ResultAttributeOption Documentation](https://developer.apple.com/documentation/speech/speechtranscriber/resultattributeoption)
- [SpeechAnalyzer init(modules:options:)](https://developer.apple.com/documentation/speech/speechanalyzer/init(modules:options:))
- [SpeechAnalyzer start(inputAudioFile:finishAfterFile:)](https://developer.apple.com/documentation/speech/speechanalyzer/start(inputaudiofile:finishafterfile:))
- [DictationTranscriber Documentation](https://developer.apple.com/documentation/speech/dictationtranscriber)
- [AVAudioEngine Documentation](https://developer.apple.com/documentation/avfaudio/avaudioengine)
- [AVAudioInputNode Documentation](https://developer.apple.com/documentation/avfaudio/avaudioinputnode)
- [AVAudioSession Documentation](https://developer.apple.com/documentation/avfaudio/avaudiosession)
- [SFSpeechRecognizer Documentation](https://developer.apple.com/documentation/speech/sfspeechrecognizer)
- [Implementing advanced speech-to-text in your SwiftUI app (CreateWithSwift)](https://www.createwithswift.com/implementing-advanced-speech-to-text-in-your-swiftui-app/)
- [iOS 26 SpeechAnalyzer Guide (Anton Gubarenko)](https://antongubarenko.substack.com/p/ios-26-speechanalyzer-guide)
- [WWDC 2025 Speech-to-Text Evolution (DEV Community)](https://dev.to/arshtechpro/wwdc-2025-the-next-evolution-of-speech-to-text-using-speechanalyzer-6lo)
- [Apple SpeechAnalyzer and Argmax WhisperKit (Argmax)](https://www.argmaxinc.com/blog/apple-and-argmax)
- [Yap CLI (finnvoor)](https://github.com/finnvoor/yap)
- [Swift Scribe (FluidInference)](https://github.com/FluidInference/swift-scribe)
- [iOS 26 SpeechRecognizer Example Gist](https://gist.github.com/lanserxt/77780783adfa179c7a009042b9cf5a95)
