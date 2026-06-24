# AVFoundation Audio Engine — Definitive API Reference for Speech Recognition

> **Scope:** AVAudioEngine, AVAudioSession, AVAudioInputNode, AVAudioFormat, AVAudioPCMBuffer, AVAudioApplication  
> **Target:** iOS 26+ with Swift 6 strict concurrency  
> **Purpose:** Prevent crashes in audio/speech recognition pipelines  
> **Last Updated:** 2026-04-08

---

## Table of Contents

1. [AVAudioEngine Lifecycle](#1-avaudioengine-lifecycle)
2. [installTap Critical Sequence](#2-installtap-critical-sequence)
3. [AVAudioSession Configuration for Speech](#3-avaudiosession-configuration-for-speech)
4. [Cleanup and Teardown](#4-cleanup-and-teardown)
5. [Error Handling](#5-error-handling)
6. [Permissions](#6-permissions)
7. [AVAudioFormat and AVAudioPCMBuffer](#7-avaudioformat-and-avaudiopcmbuffer)
8. [Configuration Change Notification](#8-configuration-change-notification)
9. [Voice Processing](#9-voice-processing)
10. [Dangerous Patterns Summary](#10-dangerous-patterns-summary)
11. [Proven Correct Sequence](#11-proven-correct-sequence)
12. [Sources](#12-sources)

---

## 1. AVAudioEngine Lifecycle

### Class Declaration

```swift
@available(iOS 8.0, *)
open class AVAudioEngine: NSObject {
    // Key Properties
    open var inputNode: AVAudioInputNode { get }     // System audio input (microphone)
    open var outputNode: AVAudioOutputNode { get }   // System audio output (speaker)
    open var mainMixerNode: AVAudioMixerNode { get } // Main mixer (auto-created)
    open var isRunning: Bool { get }                  // Whether engine is started
    open var attachedNodes: Set<AVAudioNode> { get }  // All attached nodes
    open var isInManualRenderingMode: Bool { get }    // Manual rendering mode active

    // Lifecycle Methods
    open func prepare()                              // Pre-allocate resources
    open func start() throws                         // Start audio processing
    open func stop()                                 // Stop audio processing
    open func reset()                                // Reset all nodes to initial state
    open func pause()                                // Pause audio processing

    // Node Management
    open func attach(_ node: AVAudioNode)
    open func detach(_ node: AVAudioNode)
    open func connect(_ node1: AVAudioNode, to node2: AVAudioNode, format: AVAudioFormat?)
    open func connect(_ node1: AVAudioNode, to node2: AVAudioNode, fromBus bus1: AVAudioNodeBus, toBus bus2: AVAudioNodeBus, format: AVAudioFormat?)
    open func disconnectNodeInput(_ node: AVAudioNode)
    open func disconnectNodeInput(_ node: AVAudioNode, bus: AVAudioNodeBus)
    open func disconnectNodeOutput(_ node: AVAudioNode)
    open func disconnectNodeOutput(_ node: AVAudioNode, bus: AVAudioNodeBus)
}
```

### Lifecycle State Machine

```
┌──────────┐     prepare()     ┌──────────┐     start()     ┌─────────┐
│  Created  │ ───────────────▶ │ Prepared  │ ──────────────▶ │ Running │
│           │                  │           │                 │         │
└──────────┘                  └──────────┘                 └────┬────┘
      │                             ▲                          │
      │ (inputNode access           │ prepare()                │ stop()
      │  creates nodes)             │ (re-prepare)             │
      ▼                             │                          ▼
┌──────────┐                  ┌──────────┐    reset()    ┌─────────┐
│  Nodes   │                  │  Stopped  │ ◀──────────  │ Stopped │
│ Created  │                  │ (re-use)  │              │         │
└──────────┘                  └──────────┘              └─────────┘
```

### State Details

| State | Description | What Works | What Fails |
|-------|-------------|------------|------------|
| **Created** | `AVAudioEngine()` called. No nodes exist yet. | Nothing useful | `start()` crashes — no input/output node |
| **Nodes Accessed** | `engine.inputNode` or `engine.outputNode` accessed. Forces node creation. | Nodes exist but formats may be stale/placeholder | `outputFormat(forBus:)` may return 0 Hz sample rate |
| **Prepared** | `engine.prepare()` called. Resources pre-allocated, hardware format queried. | `outputFormat(forBus:)` returns valid hardware format | — |
| **Running** | `engine.start()` called. Render thread active, audio flowing. | Everything works, taps receive buffers | Cannot install new taps (NSException) |
| **Stopped** | `engine.stop()` called. Render thread stopped. | Can re-prepare and restart | Taps stop receiving buffers |

### What `prepare()` Actually Does

1. **Pre-allocates audio buffers** for all nodes in the graph
2. **Queries hardware format** from the audio session and configures internal I/O units
3. **Establishes the audio rendering chain** — determines which chains are active
4. **Populates format information** on inputNode and outputNode so `outputFormat(forBus:)` returns valid values
5. **Does NOT start the render thread** — that requires `start()`

> **CRITICAL:** `prepare()` can invalidate previously-obtained node references. If you called `let node = engine.inputNode` before `prepare()`, you MUST re-access `engine.inputNode` after `prepare()` because the node object may have been deallocated and recreated.

### What `reset()` Does

1. **Resets all nodes** to their initial state
2. **Clears any scheduled audio** in player nodes
3. **Triggers a configuration change** — the engine detects settings changed and stops itself
4. **Posts `AVAudioEngineConfigurationChange` notification**
5. **Does NOT remove taps** — taps survive reset but may need reconfiguration

> **WARNING:** Do NOT call `reset()` between recording sessions. It destroys the node graph and can corrupt the engine for subsequent recordings. Use `stop()` + `removeTap()` instead.

### What `stop()` Does

1. **Stops the render thread** — audio stops flowing
2. **Does NOT remove taps** — taps remain installed but stop receiving callbacks
3. **Does NOT deallocate resources** — engine can be restarted with `prepare()` + `start()`
4. **Does NOT deactivate the audio session** — must do this separately

### `inputNode` Access Side Effects

```swift
// Accessing inputNode has SIDE EFFECTS — it forces creation of the input I/O unit
let inputNode = audioEngine.inputNode  // Creates the input node if it doesn't exist
```

> **CRITICAL:** You MUST access `engine.inputNode` (or `engine.outputNode`, or `engine.mainMixerNode`) before calling `engine.start()`. If no nodes exist, `start()` crashes with: `required condition is false: inputNode != NULL || outputNode != NULL`

---

## 2. installTap Critical Sequence

### AVAudioNode.installTap Signature

```swift
// Declared on AVAudioNode (base class for all nodes)
open func installTap(
    onBus bus: AVAudioNodeBus,         // Bus number (usually 0)
    bufferSize: AVAudioFrameCount,     // Requested buffer size in frames
    format: AVAudioFormat?,            // Desired format, or nil for node's output format
    block tapBlock: @escaping AVAudioNodeTapBlock
)

// The tap block type:
public typealias AVAudioNodeTapBlock = (AVAudioPCMBuffer, AVAudioTime) -> Void
```

### AVAudioNode.removeTap Signature

```swift
open func removeTap(onBus bus: AVAudioNodeBus)
```

### The EXACT Correct Order of Operations

```swift
// ═══════════════════════════════════════════════════════════
// THE ONLY CORRECT SEQUENCE — DEVIATION CAUSES CRASHES
// ═══════════════════════════════════════════════════════════

// 1. Configure audio session FIRST
let audioSession = AVAudioSession.sharedInstance()
try audioSession.setCategory(.playAndRecord, mode: .spokenAudio, options: [.duckOthers, .defaultToSpeaker])
try audioSession.setActive(true, options: .notifyOthersOnDeactivation)

// 2. Access inputNode — this CREATES the node and its I/O unit
let inputNode = audioEngine.inputNode

// 3. Call prepare() — this queries hardware and populates format info
audioEngine.prepare()

// 4. NOW read the format — it's valid after prepare()
let inputFormat = inputNode.outputFormat(forBus: 0)

// 5. Validate the format
guard inputFormat.sampleRate > 0, inputFormat.channelCount > 0 else {
    throw AudioError.invalidFormat
}

// 6. Remove any existing tap (idempotent — safe even if no tap exists)
inputNode.removeTap(onBus: 0)

// 7. Install new tap
inputNode.installTap(onBus: 0, bufferSize: 1024, format: inputFormat) { [weak self] buffer, time in
    // This closure runs on the audio I/O thread — NOT MainActor
    self?.handleBuffer(buffer)
}

// 8. Re-prepare after tap installation (tap changes the graph)
audioEngine.prepare()

// 9. Start the engine
try audioEngine.start()
```

### Why `outputFormat(forBus:0)` Returns Garbage Before `prepare()`

Before `prepare()` is called:
- The input I/O unit has not queried the audio hardware
- `outputFormat(forBus: 0)` returns a **placeholder format** with sample rate of 0 Hz and/or channel count of 0
- Passing this placeholder format to `installTap` causes an NSException: `Required condition is false: IsFormatSampleRateAndChannelCountValid(format)`

After `prepare()`:
- The engine has queried `AVAudioSession.sharedInstance().sampleRate` and the hardware configuration
- `outputFormat(forBus: 0)` returns the actual hardware format (e.g., 48000 Hz, 1 channel on modern iPhones)

### Format Parameter: `nil` vs Explicit Format

| Parameter | Behavior |
|-----------|----------|
| `nil` | Engine uses the node's native output format. Safest option but you don't control the format. |
| `inputNode.outputFormat(forBus: 0)` | Uses the hardware format. Must be read AFTER `prepare()`. Required when you need a specific format for downstream processing. |
| Custom `AVAudioFormat` | Engine attempts sample rate conversion. **Must match the hardware format's sample rate** or you get `format.sampleRate == hwFormat.sampleRate` crash. |

> **For speech recognition:** Use the hardware format from `inputNode.outputFormat(forBus: 0)`, then convert to the speech recognizer's required format (16kHz mono Int16) using `AVAudioConverter` inside the tap closure.

### Can You Install Multiple Taps?

**NO.** Only ONE tap per bus. Installing a second tap on the same bus throws an NSException:
```
Required condition is false: nullptr == Tap()
```

Always call `removeTap(onBus: 0)` before installing a new tap.

### What Thread Does the Tap Closure Run On?

The tap closure runs on the **audio I/O thread** (sometimes labeled `AVAudioIOUnit` or `com.apple.coreaudio.AURemoteIO`). This is:

- **NOT the main thread / MainActor**
- **NOT a standard GCD queue** — it's a real-time audio thread
- **Higher priority than standard Cocoa threads** but with more buffering than raw AudioUnit callbacks

The tap provides a safer abstraction than raw audio unit callbacks. You CAN:
- Allocate memory (with caution)
- Call Swift methods
- Use synchronization primitives

You should NOT:
- Perform heavy computation
- Block or wait
- Access MainActor-isolated properties directly
- Make network calls
- Perform file I/O (except through pre-opened file handles)

### Passing Data from Tap Closure to MainActor

```swift
// CORRECT: Use Task { @MainActor in } to hop threads
inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
    let power = self?.calculateRMS(from: buffer) ?? 0.0

    Task { @MainActor [weak self] in
        self?.currentPowerLevel = power
    }
}

// CORRECT: Use AsyncStream continuation (preferred for speech recognition)
inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
    // Convert buffer format if needed
    if let converted = self?.convert(buffer) {
        self?.inputContinuation?.yield(AnalyzerInput(buffer: converted))
    }
}

// WRONG: Directly access MainActor state
inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, _ in
    self.transcript = "text"  // CRASH: MainActor from audio thread
}
```

### Buffer Size Guidance

| Buffer Size | Latency | Use Case |
|-------------|---------|----------|
| 256 frames | ~5ms at 48kHz | Ultra-low latency monitoring |
| 512 frames | ~10ms | Real-time processing |
| **1024 frames** | ~21ms | **Speech recognition (recommended)** |
| 2048 frames | ~42ms | Offline processing |
| 4096 frames | ~85ms | Maximum accuracy, higher latency |

> **Note:** The actual buffer size delivered may differ from the requested size. The system may deliver larger or smaller buffers depending on hardware and system load.

---

## 3. AVAudioSession Configuration for Speech

### AVAudioSession Key API

```swift
@available(iOS 3.0, *)
open class AVAudioSession: NSObject {
    // Singleton
    open class func sharedInstance() -> AVAudioSession

    // Configuration
    open func setCategory(_ category: AVAudioSession.Category,
                          mode: AVAudioSession.Mode,
                          options: AVAudioSession.CategoryOptions) throws
    open func setActive(_ active: Bool,
                        options: AVAudioSession.SetActiveOptions) throws

    // State
    open var category: AVAudioSession.Category { get }
    open var mode: AVAudioSession.Mode { get }
    open var isOtherAudioPlaying: Bool { get }
    open var sampleRate: Double { get }
    open var inputNumberOfChannels: Int { get }
    open var availableInputs: [AVAudioSessionPortDescription]? { get }
    open var currentRoute: AVAudioSessionRouteDescription { get }

    // Deprecated in iOS 17 — use AVAudioApplication instead
    open var recordPermission: AVAudioSession.RecordPermission { get }
}
```

### Categories for Speech Recognition

| Category | Records | Plays | Silences Others | Use When |
|----------|---------|-------|-----------------|----------|
| `.record` | Yes | No | Yes | Pure speech-to-text, no audio playback needed |
| `.playAndRecord` | Yes | Yes | Yes | Speech recognition + audio feedback (e.g., timer sounds, spoken audio) |
| `.playback` | No | Yes | Yes | Audio playback only |
| `.ambient` | No | Yes | No | Background music, non-essential audio |

### Modes Relevant to Speech

| Mode | Effect | Use When |
|------|--------|----------|
| `.measurement` | Minimizes system signal processing on input/output. Preserves raw audio fidelity. | Pure speech recognition where accuracy matters most |
| `.spokenAudio` | Optimizes for spoken word content. Ducks other audio properly. | Speech recognition + audio output (typical for apps with both) |
| `.voiceChat` | Enables echo cancellation and AGC. Routes to earpiece. | Two-way voice communication |
| `.default` | Standard system processing | General use |

### Options

| Option | Effect |
|--------|--------|
| `.duckOthers` | Reduces volume of other audio sources while your session is active |
| `.defaultToSpeaker` | Routes audio to the speaker instead of earpiece (only with `.playAndRecord`) |
| `.allowBluetooth` | Allows Bluetooth HFP devices for input/output |
| `.allowBluetoothA2DP` | Allows high-quality Bluetooth audio (output only) |
| `.mixWithOthers` | Allows your audio to mix with other app audio |
| `.interruptSpokenAudioAndMixWithOthers` | Interrupts spoken audio from other apps, then mixes |

### Configuration for Apps with Playback + Recording

```swift
// Apps that need playback (sounds) AND recording (speech recognition)
// .spokenAudio mode is optimized for speech content
try audioSession.setCategory(
    .playAndRecord,
    mode: .spokenAudio,
    options: [.duckOthers, .defaultToSpeaker]
)
try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
```

### Configuration for Pure Speech-to-Text

```swift
// Apps that only need recording — no audio playback during transcription
try audioSession.setCategory(
    .record,
    mode: .measurement,
    options: [.duckOthers]
)
try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
```

### Activation and Deactivation

**Activation:**
```swift
// Activate before using audio
try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
```

- Must be called BEFORE accessing `audioEngine.inputNode`
- Can fail if another app has exclusive audio access (e.g., Phone call)
- The `.notifyOthersOnDeactivation` option tells the system to notify other apps when you deactivate

**Deactivation:**
```swift
// Deactivate when done with audio
try audioSession.setActive(false, options: .notifyOthersOnDeactivation)
```

- Must be called AFTER `audioEngine.stop()` and `removeTap()`
- **Will throw** if the engine is still running (`Deactivating an audio session that has running I/O`)
- Allows other apps' audio to resume
- Use `try?` — deactivation failure is usually non-fatal

### What Happens When Another App Uses Audio?

1. **Your app receives `AVAudioSession.interruptionNotification`** with type `.began`
2. **Your audio engine may stop** (the system can stop it)
3. **When interruption ends**, you receive `.ended` notification
4. **Check `shouldResume` option** — if present, it's safe to restart
5. **You must manually restart** your audio engine (it doesn't auto-resume)

```swift
// Handle interruptions
NotificationCenter.default.addObserver(
    forName: AVAudioSession.interruptionNotification,
    object: AVAudioSession.sharedInstance(),
    queue: .main
) { [weak self] notification in
    guard let userInfo = notification.userInfo,
          let typeValue = userInfo[AVAudioSessionInterruptionTypeKey] as? UInt,
          let type = AVAudioSession.InterruptionType(rawValue: typeValue) else { return }

    switch type {
    case .began:
        // Audio was interrupted — stop your engine
        self?.handleInterruptionBegan()
    case .ended:
        let options = (userInfo[AVAudioSessionInterruptionOptionKey] as? UInt)
            .flatMap { AVAudioSession.InterruptionOptions(rawValue: $0) }
        if options?.contains(.shouldResume) == true {
            // Safe to restart
            self?.handleInterruptionEnded()
        }
    @unknown default:
        break
    }
}
```

---

## 4. Cleanup and Teardown

### The Correct Cleanup Sequence

```swift
// ═══════════════════════════════════════════════════════════
// THE ONLY CORRECT CLEANUP SEQUENCE
// ═══════════════════════════════════════════════════════════

// 1. Signal end of audio input (for AsyncStream-based pipelines)
inputContinuation?.finish()
inputContinuation = nil

// 2. Stop the audio engine (stops render thread)
if audioEngine.isRunning {
    audioEngine.stop()
}

// 3. Remove the tap (AFTER stop — see note below)
if inputTapInstalled {
    audioEngine.inputNode.removeTap(onBus: 0)
    inputTapInstalled = false
}

// 4. Cancel transcription task
transcriptionTask?.cancel()
transcriptionTask = nil

// 5. Finalize speech analyzer (delivers final results)
try? await analyzer?.finalizeAndFinishThroughEndOfInput()
// OR for immediate cancellation:
await analyzer?.cancelAndFinishNow()

// 6. Release speech objects
analyzer = nil
transcriber = nil

// 7. Deactivate audio session
try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)

// 8. Do NOT call audioEngine.reset() — it corrupts the node graph
```

### Stop vs RemoveTap Order

There is conflicting information about the order. Here is the reality:

| Order | What Happens | Safe? |
|-------|-------------|-------|
| `removeTap()` then `stop()` | Tap removed cleanly, then engine stops | Yes — documented as "correct" in some sources |
| `stop()` then `removeTap()` | Engine stops first, tap is still registered but inactive | **Also safe** — production code does this without crashes |
| Neither (just nil the engine) | Tap still installed, engine deallocated | **DANGEROUS** — can crash during deallocation |

> **Recommended pattern:** Call `stop()` first, then `removeTap()`. This works because `stop()` merely stops the render thread — the tap registration is metadata that can be cleaned up after. The important thing is that `removeTap()` IS called before the engine is deallocated or reused.

### What Happens If You `stop()` Without `removeTap()`?

- The tap closure stops receiving callbacks (render thread is dead)
- The tap registration stays in memory
- If you later call `prepare()` + `start()`, the old tap fires again
- If you try to install a new tap, you get: `Required condition is false: nullptr == Tap()`
- **Always** call `removeTap()` before installing a new tap

### Can Cleanup Happen in `deinit`?

**Partially.** `deinit` runs on an arbitrary thread, which creates problems:

```swift
// Safe in deinit (pure cancellation, no I/O)
nonisolated deinit {
    _transcriptionTaskForDeinit?.cancel()
}

// DANGEROUS in deinit
deinit {
    audioEngine.stop()              // May deadlock — engine callbacks in flight
    audioEngine.inputNode.removeTap(onBus: 0)  // May crash — accessing node during dealloc
    try? AVAudioSession.sharedInstance().setActive(false)  // Throws, can't handle
}
```

> **Rule:** Always provide an explicit `stopRecording()` method. Use `deinit` only for emergency task cancellation. The audio engine and session cleanup must happen in an explicit, called-before-dealloc method.

### Audio File Write Race Condition

If you're writing audio to a file inside the tap closure:

```swift
// DANGEROUS: Race between tap closure writing and stop() closing
inputNode.installTap(...) { buffer, _ in
    try? audioFile?.write(from: buffer)  // May execute AFTER stop()
}

// Later...
audioEngine.stop()  // Tap may still be executing
audioFile?.close()  // CRASH: write() still in progress on audio thread

// SAFE: Signal completion, wait, then close
inputContinuation?.finish()  // Signal no more writes
audioEngine.stop()           // Wait for render thread to stop
// Audio thread has now drained
audioFile = nil              // Safe to close
```

---

## 5. Error Handling

### Errors from `start()`

`AVAudioEngine.start()` throws `NSError` in the `com.apple.coreaudio.avfaudio` domain.

| OSStatus Code | Name | Cause |
|---------------|------|-------|
| -10851 | `kAudioUnitErr_InvalidPropertyValue` | Invalid audio unit property (bad format, bad configuration) |
| -10863 | `kAudioUnitErr_CannotDoInCurrentContext` | Calling at wrong time (e.g., during interruption) |
| -10877 | `kAudioUnitErr_InvalidElement` | Invalid bus or element |
| -50 | `paramErr` | Invalid parameter to Core Audio |
| -10878 | (various) | iOS version-specific issues |
| 2003329396 | (FaceTime conflict) | Microphone in use by another process |

```swift
do {
    try audioEngine.start()
} catch {
    let nsError = error as NSError
    logger.error("Engine start failed: domain=\(nsError.domain) code=\(nsError.code) \(nsError.localizedDescription)")

    // Clean up
    audioEngine.inputNode.removeTap(onBus: 0)

    // Re-throw or handle
    throw error
}
```

### Errors from `setCategory()` / `setActive()`

```swift
do {
    try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
} catch {
    // Usually means the category/mode/options combination is invalid
    // e.g., .defaultToSpeaker with .record category (requires .playAndRecord)
}

do {
    try audioSession.setActive(true)
} catch {
    // Usually means another app has exclusive audio access
    // e.g., active Phone call
}

do {
    try audioSession.setActive(false, options: .notifyOthersOnDeactivation)
} catch {
    // "Deactivating an audio session that has running I/O"
    // Must stop engine BEFORE deactivating session
}
```

### NSExceptions That Swift Cannot Catch

> **CRITICAL:** Several AVAudioEngine operations throw Objective-C `NSException` rather than Swift `Error`. Swift's `do/try/catch` **CANNOT** catch these. They crash the process.

| Operation | Exception | Trigger |
|-----------|-----------|---------|
| `installTap(onBus:bufferSize:format:block:)` | `NSInternalInconsistencyException` | Format with 0 Hz sample rate or 0 channels |
| `installTap(onBus:bufferSize:format:block:)` | `NSInternalInconsistencyException` | Tap already installed on same bus |
| `engine.inputNode` access | `NSInternalInconsistencyException` | No audio route (simulator with no audio) |
| `engine.start()` | `NSInternalInconsistencyException` | No input or output node in graph |
| `installTap` with wrong format | `com.apple.coreaudio.avfaudio` | `format.sampleRate == hwFormat.sampleRate` validation failure |

**Prevention strategies:**

```swift
// 1. Guard format validity BEFORE installTap
guard inputFormat.sampleRate > 0, inputFormat.channelCount > 0 else {
    throw AudioError.invalidFormat  // Prevent NSException
}

// 2. Track tap state with a boolean flag
guard !inputTapInstalled else {
    inputNode.removeTap(onBus: 0)  // Remove old tap first
}

// 3. Guard simulator
#if targetEnvironment(simulator)
throw AudioError.simulatorNotSupported
#endif

// 4. If you MUST catch NSExceptions, use an ObjC wrapper:
// See: github.com/sindresorhus/ExceptionCatcher
// See: github.com/mattgallagher/CwlCatchException
```

---

## 6. Permissions

### Two Separate Permission Systems

| Permission | API | Info.plist Key | System Dialog |
|-----------|-----|----------------|---------------|
| **Microphone** | `AVAudioApplication.requestRecordPermission()` | `NSMicrophoneUsageDescription` | "App Would Like to Access the Microphone" |
| **Speech Recognition** | `SFSpeechRecognizer.requestAuthorization()` | `NSSpeechRecognitionUsageDescription` | "App Would Like to Access Speech Recognition" |

> **iOS 26 SpeechTranscriber:** Only microphone permission is needed. `SpeechTranscriber` and `SpeechAnalyzer` process audio buffers via `AsyncStream<AnalyzerInput>` and do NOT access the speech recognition privacy boundary. `SFSpeechRecognizer.requestAuthorization()` is NOT required.

### AVAudioApplication (iOS 17+)

```swift
@available(iOS 17.0, *)
open class AVAudioApplication: NSObject {
    // Singleton
    open class var shared: AVAudioApplication { get }

    // Permission state
    open var recordPermission: AVAudioApplication.RecordPermission { get }

    // Request permission (async)
    open class func requestRecordPermission() async -> Bool

    // Request permission (callback — original API)
    open class func requestRecordPermission(completionHandler response: @escaping (Bool) -> Void)
}

// Permission states
@available(iOS 17.0, *)
extension AVAudioApplication {
    public enum RecordPermission: Int {
        case undetermined = 0  // User hasn't been asked yet
        case denied = 1        // User denied permission
        case granted = 2       // User granted permission
    }
}
```

> **Deprecation:** `AVAudioSession.requestRecordPermission(_:)` is deprecated in iOS 17. Use `AVAudioApplication.requestRecordPermission()` instead.

### Permission Request Behavior

```swift
// Check current state without triggering dialog
let currentStatus = AVAudioApplication.shared.recordPermission

switch currentStatus {
case .granted:
    // Can proceed with audio
    break
case .denied:
    // Direct user to Settings
    break
case .undetermined:
    // Will show system dialog
    let granted = await AVAudioApplication.requestRecordPermission()
    // Dialog shown on first call only
    break
@unknown default:
    break
}
```

**When does the system dialog appear?**
- Only when status is `.undetermined`
- Only on the FIRST call to `requestRecordPermission()`
- Subsequent calls with `.undetermined` status return immediately (system remembers the pending state)
- After the user responds, future calls return the stored decision without showing a dialog

**What happens if you call it twice?**
- Second call returns the result of the first decision
- No second dialog is shown
- If the first dialog is still visible, the second call waits for the user's response

---

## 7. AVAudioFormat and AVAudioPCMBuffer

### AVAudioFormat

```swift
open class AVAudioFormat: NSObject, NSSecureCoding {
    // Initializers
    public init?(commonFormat: AVAudioCommonFormat, sampleRate: Double, channels: AVAudioChannelCount, interleaved: Bool)
    public init?(standardFormatWithSampleRate sampleRate: Double, channels: AVAudioChannelCount)
    public init?(settings: [String: Any])

    // Properties
    open var sampleRate: Double { get }
    open var channelCount: AVAudioChannelCount { get }
    open var commonFormat: AVAudioCommonFormat { get }
    open var isInterleaved: Bool { get }
    open var isStandard: Bool { get }     // 32-bit float, deinterleaved
    open var streamDescription: UnsafePointer<AudioStreamBasicDescription> { get }
}

// Common formats
public enum AVAudioCommonFormat: UInt {
    case otherFormat = 0
    case pcmFormatFloat32 = 1   // Standard float (default for most operations)
    case pcmFormatFloat64 = 2   // Double precision
    case pcmFormatInt16 = 3     // 16-bit signed integer (used by SpeechAnalyzer)
    case pcmFormatInt32 = 4     // 32-bit signed integer
}
```

### AVAudioPCMBuffer

```swift
open class AVAudioPCMBuffer: AVAudioBuffer {
    public init?(pcmFormat format: AVAudioFormat, frameCapacity: AVAudioFrameCount)

    open var frameCapacity: AVAudioFrameCount { get }
    open var frameLength: AVAudioFrameCount { get set }
    open var floatChannelData: UnsafePointer<UnsafeMutablePointer<Float>>? { get }
    open var int16ChannelData: UnsafePointer<UnsafeMutablePointer<Int16>>? { get }
    open var int32ChannelData: UnsafePointer<UnsafeMutablePointer<Int32>>? { get }
    open var stride: Int { get }
}
```

### Format Conversion for Speech Recognition

SpeechAnalyzer requires **16-bit signed integer PCM at 16kHz mono**. Most iPhone microphones record at **48kHz mono float32**. Conversion is mandatory.

```swift
// Create the target format for SpeechAnalyzer
guard let targetFormat = AVAudioFormat(
    commonFormat: .pcmFormatInt16,
    sampleRate: 16000,
    channels: 1,
    interleaved: true
) else { fatalError("Cannot create format") }

// Create converter
guard let converter = AVAudioConverter(from: inputFormat, to: targetFormat) else {
    throw AudioError.converterCreationFailed
}

// Convert inside tap closure
inputNode.installTap(onBus: 0, bufferSize: 1024, format: inputFormat) { [weak self] inputBuffer, _ in
    // Calculate output frame capacity with ratio
    let frameCapacity = AVAudioFrameCount(
        targetFormat.sampleRate * Double(inputBuffer.frameLength) / inputFormat.sampleRate
    ) + 1  // +1 to handle rounding

    guard let convertedBuffer = AVAudioPCMBuffer(
        pcmFormat: targetFormat,
        frameCapacity: frameCapacity
    ) else { return }

    var error: NSError?
    converter.convert(to: convertedBuffer, error: &error) { inNumPackets, outStatus in
        outStatus.pointee = .haveData
        return inputBuffer
    }

    if error == nil {
        self?.inputContinuation?.yield(AnalyzerInput(buffer: convertedBuffer))
    }
}
```

### Sample Rate Change Between Devices

Modern iPhones use **48kHz** as the default microphone sample rate. Older devices and some Bluetooth devices use **44.1kHz** or **16kHz**. Never hardcode sample rates.

```swift
// CORRECT: Query the actual format
audioEngine.prepare()
let actualRate = audioEngine.inputNode.outputFormat(forBus: 0).sampleRate  // 48000, 44100, etc.

// WRONG: Assume a fixed rate
let format = AVAudioFormat(standardFormatWithSampleRate: 44100, channels: 1)  // May not match hardware
```

---

## 8. Configuration Change Notification

### When It Fires

`AVAudioEngine.configurationChangeNotification` (`.AVAudioEngineConfigurationChange`) fires when:

1. **Audio route changes** (headphones plugged/unplugged, Bluetooth connected/disconnected)
2. **`setVoiceProcessingEnabled(_:)`** is called (changes the I/O unit type)
3. **`reset()`** is called
4. **Hardware sample rate changes**
5. **System reconfigures audio** (e.g., CarPlay connection)

### What Happens

1. The engine **stops itself** — `isRunning` becomes `false`
2. **Node connections may be invalidated** — formats may have changed
3. **Taps remain installed** but stop receiving callbacks
4. **You must re-prepare and restart** the engine

### How to Handle

```swift
// Register for notification
NotificationCenter.default.addObserver(
    forName: .AVAudioEngineConfigurationChange,
    object: audioEngine,
    queue: .main
) { [weak self] notification in
    guard let self else { return }

    Task { @MainActor in
        if !self.audioEngine.isRunning {
            // Engine stopped itself due to configuration change
            // Option 1: Restart with new format
            do {
                // Re-read format (it may have changed)
                let newFormat = self.audioEngine.inputNode.outputFormat(forBus: 0)
                // Reconfigure tap if format changed
                self.audioEngine.inputNode.removeTap(onBus: 0)
                self.audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: newFormat) { ... }
                self.audioEngine.prepare()
                try self.audioEngine.start()
            } catch {
                // Handle restart failure
            }

            // Option 2: Signal interruption and let user restart
            self.onInterruption?()
        }
    }
}
```

---

## 9. Voice Processing

### `setVoiceProcessingEnabled(_:)` (iOS 15+)

```swift
// Declared on AVAudioIONode (base class of AVAudioInputNode and AVAudioOutputNode)
@available(iOS 15.0, *)
open func setVoiceProcessingEnabled(_ enabled: Bool) throws
```

**What it enables:**
- Echo cancellation (removes speaker output from microphone input)
- Noise suppression
- Automatic gain control (AGC)

**Side effects:**
- **Triggers engine configuration change** — engine stops itself
- Both I/O nodes (input AND output) are switched to voice processing mode
- Only mono audio output is supported when enabled
- Not available in manual rendering mode

**When to use:**
- Voice chat / VoIP applications
- When the app plays audio through the speaker while recording from the microphone
- NOT needed for pure speech recognition (SpeechTranscriber handles this)

> **Note:** If your app plays sounds through the speaker while recording speech, voice processing could prevent sounds from being picked up by the microphone. However, enabling it triggers a disruptive engine reconfiguration. Evaluate whether it is needed for your use case.

---

## 10. Dangerous Patterns Summary

### CRASH: Read format before prepare()

```swift
// CRASHES with NSException
let format = audioEngine.inputNode.outputFormat(forBus: 0)  // 0 Hz sample rate
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { ... }
// NSException: Required condition is false: IsFormatSampleRateAndChannelCountValid(format)

// FIX
audioEngine.prepare()  // Populate format from hardware
let format = audioEngine.inputNode.outputFormat(forBus: 0)  // Valid format
```

### CRASH: Install tap while engine running

```swift
// CRASHES with NSException
try audioEngine.start()
audioEngine.inputNode.installTap(...)  // Cannot install tap on running engine

// FIX: Install tap BEFORE start
audioEngine.inputNode.installTap(...)
audioEngine.prepare()
try audioEngine.start()
```

### CRASH: Double tap on same bus

```swift
// CRASHES with NSException
audioEngine.inputNode.installTap(onBus: 0, ...)  // First tap
audioEngine.inputNode.installTap(onBus: 0, ...)  // CRASH: nullptr == Tap()

// FIX: Remove old tap first
audioEngine.inputNode.removeTap(onBus: 0)
audioEngine.inputNode.installTap(onBus: 0, ...)
```

### CRASH: @MainActor on class with AVAudioEngine

```swift
// CRASHES — deinit on arbitrary thread conflicts with MainActor isolation
@MainActor
@Observable
class MyAudioService {
    private let audioEngine = AVAudioEngine()  // Created on MainActor
    // deinit implicitly @MainActor — crashes when called from audio thread
}

// FIX: No @MainActor on class, nonisolated deinit
@Observable
class MyAudioService {
    private var _audioEngine: AVAudioEngine?  // Lazy
    @MainActor func startRecording() { }      // @MainActor on methods only
    nonisolated deinit { _task?.cancel() }     // Nonisolated — safe
}
```

### CRASH: Simulator with no audio route

```swift
// CRASHES on iOS Simulator — NSException from inputNode access
let inputNode = audioEngine.inputNode  // No audio hardware in sim

// FIX: Guard simulator
#if targetEnvironment(simulator)
throw AudioError.simulatorNotSupported
#endif
```

### CRASH: Engine start with no nodes

```swift
// CRASHES — no input or output node
let engine = AVAudioEngine()
try engine.start()  // Required condition is false: inputNode != NULL || outputNode != NULL

// FIX: Access a node first (creates it)
let engine = AVAudioEngine()
let _ = engine.inputNode  // Force node creation
engine.prepare()
try engine.start()
```

### LEAK: Strong self in tap closure

```swift
// MEMORY LEAK — retain cycle
inputNode.installTap(onBus: 0, ...) { buffer, _ in
    self.processBuffer(buffer)  // Strong reference to self
}

// FIX: Weak capture
inputNode.installTap(onBus: 0, ...) { [weak self] buffer, _ in
    self?.processBuffer(buffer)
}
```

### CRASH: MainActor access from tap closure

```swift
// CRASHES — tap runs on audio thread, not MainActor
inputNode.installTap(onBus: 0, ...) { buffer, _ in
    self.transcript = "text"  // @MainActor property from audio thread
}

// FIX: Hop to MainActor
inputNode.installTap(onBus: 0, ...) { [weak self] buffer, _ in
    Task { @MainActor [weak self] in
        self?.transcript = "text"
    }
}
```

### CORRUPTION: Using reset() between sessions

```swift
// CORRUPTS engine — node graph destroyed, subsequent recordings crash
func stopRecording() {
    audioEngine.stop()
    audioEngine.inputNode.removeTap(onBus: 0)
    audioEngine.reset()  // Destroys node graph!
}

// FIX: Don't call reset() — just stop and remove tap
func stopRecording() {
    audioEngine.stop()
    audioEngine.inputNode.removeTap(onBus: 0)
    // No reset()!
}
```

---

## 11. Proven Correct Sequence

This is a battle-tested sequence that survived 14+ crash investigations in production:

```swift
@Observable
class MyAudioService {
    // ── Properties ──
    private var _audioEngine: AVAudioEngine?       // Lazy — not created in init
    @ObservationIgnored nonisolated(unsafe)
    private var _inputTapInstalled = false          // Track tap state
    private var isCleaningUp = false                // Prevent re-entrancy

    // ── Lazy Engine ──
    private var audioEngine: AVAudioEngine {
        if let existing = _audioEngine { return existing }
        let engine = AVAudioEngine()
        _audioEngine = engine
        return engine
    }

    // ── Nonisolated Deinit ──
    nonisolated deinit {
        _transcriptionTaskForDeinit?.cancel()
        // Do NOT touch audioEngine here — explicit stop required
    }

    // ── Start ──
    @MainActor
    func setupAndStartRecording() throws {
        // 0. Guard re-entrancy
        guard !isCleaningUp else { throw Error.cleanupInProgress }

        // 1. Clean up any previous session
        prepareForNewInputPipeline()

        // 2. Guard simulator
        #if targetEnvironment(simulator)
        throw Error.simulatorNotSupported
        #endif

        // 3. Check availability
        guard SpeechTranscriber.isAvailable else { throw Error.notAvailable }

        // 4. Configure audio session
        let audioSession = AVAudioSession.sharedInstance()
        try audioSession.setCategory(.playAndRecord, mode: .spokenAudio, options: [.duckOthers, .defaultToSpeaker])
        try audioSession.setActive(true, options: .notifyOthersOnDeactivation)

        // 5. Verify audio input exists
        guard let inputs = audioSession.availableInputs, !inputs.isEmpty else {
            throw Error.noAudioInput
        }
        guard !audioSession.currentRoute.inputs.isEmpty else {
            throw Error.noAudioRoute
        }

        // 6. Access inputNode -> prepare() -> read format
        let inputNode = audioEngine.inputNode
        audioEngine.prepare()
        let inputFormat = inputNode.outputFormat(forBus: 0)

        // 7. Validate format
        guard inputFormat.sampleRate > 0, inputFormat.channelCount > 0 else {
            throw Error.invalidFormat
        }

        // 8. Create target format + converter
        guard let recordingFormat = AVAudioFormat(
            commonFormat: .pcmFormatInt16, sampleRate: 16000, channels: 1, interleaved: true
        ) else { throw Error.formatCreationFailed }
        guard let converter = AVAudioConverter(from: inputFormat, to: recordingFormat) else {
            throw Error.converterCreationFailed
        }

        // 9. Create SpeechTranscriber + Analyzer
        let transcriber = SpeechTranscriber(locale: locale, preset: .progressiveTranscription)
        let (stream, continuation) = AsyncStream.makeStream(of: AnalyzerInput.self)
        let analyzer = SpeechAnalyzer(inputSequence: stream, modules: [transcriber])

        // 10. Install tap (nonisolated helper)
        installAudioTap(on: inputNode, inputFormat: inputFormat, outputFormat: recordingFormat,
                        converter: converter, continuation: continuation)
        _inputTapInstalled = true

        // 11. Re-prepare + start
        audioEngine.prepare()
        try audioEngine.start()

        // 12. Start consuming results
        startTranscriptionTask(from: transcriber)
    }

    // ── Stop ──
    @MainActor
    func stopRecording() async {
        guard !isCleaningUp else { return }
        isCleaningUp = true

        // 1. Stop engine
        if audioEngine.isRunning { audioEngine.stop() }

        // 2. Remove tap
        if _inputTapInstalled {
            audioEngine.inputNode.removeTap(onBus: 0)
            _inputTapInstalled = false
        }

        // 3. Signal stream end
        inputContinuation?.finish()
        inputContinuation = nil

        // 4. Cancel transcription
        transcriptionTask?.cancel()
        transcriptionTask = nil

        // 5. Finalize analyzer
        await analyzer?.cancelAndFinishNow()
        analyzer = nil
        transcriber = nil

        // 6. Deactivate session
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)

        isCleaningUp = false
    }
}
```

---

## 12. Sources

**Apple Developer Documentation:**
- [AVAudioEngine](https://developer.apple.com/documentation/avfaudio/avaudioengine)
- [AVAudioNode](https://developer.apple.com/documentation/avfaudio/avaudionode)
- [AVAudioInputNode](https://developer.apple.com/documentation/avfaudio/avaudioinputnode)
- [AVAudioOutputNode](https://developer.apple.com/documentation/avfaudio/avaudiooutputnode)
- [AVAudioSession](https://developer.apple.com/documentation/avfaudio/avaudiosession)
- [AVAudioSession.Category](https://developer.apple.com/documentation/avfaudio/avaudiosession/category)
- [AVAudioFormat](https://developer.apple.com/documentation/avfaudio/avaudioformat)
- [AVAudioPCMBuffer](https://developer.apple.com/documentation/avfaudio/avaudiopcmbuffer)
- [AVAudioApplication](https://developer.apple.com/documentation/avfaudio/avaudioapplication)
- [installTap(onBus:bufferSize:format:block:)](https://developer.apple.com/documentation/avfaudio/avaudionode/1387122-installtap)
- [removeTap(onBus:)](https://developer.apple.com/documentation/avfaudio/avaudionode/removetap(onbus:))
- [prepare()](https://developer.apple.com/documentation/avfaudio/avaudioengine/prepare())
- [reset()](https://developer.apple.com/documentation/avfaudio/avaudioengine/1389668-reset)
- [setVoiceProcessingEnabled(\_:)](https://developer.apple.com/documentation/avfaudio/avaudioionode/setvoiceprocessingenabled(_:))
- [AVAudioEngineConfigurationChange Notification](https://developer.apple.com/documentation/foundation/nsnotification/name/1389078-avaudioengineconfigurationchange)
- [Recognizing Speech in Live Audio](https://developer.apple.com/documentation/Speech/recognizing-speech-in-live-audio)
- [Asking Permission to Use Speech Recognition](https://developer.apple.com/documentation/speech/asking-permission-to-use-speech-recognition)

**Apple Developer Forums:**
- [Short starter guide for AVAudioEngine](https://developer.apple.com/forums/thread/764954) — Lifecycle, inputNode access, prepare() behavior
- [Crash when starting AVAudioEngine](https://developer.apple.com/forums/thread/44833) — Missing node crash
- [AVAudioEngine crash in iOS 14](https://developer.apple.com/forums/thread/651353) — Format changes across iOS versions
- [Required condition is false](https://developer.apple.com/forums/thread/117084) — Format validation crash
- [Unable to install tap on input node](https://developer.apple.com/forums/thread/695974) — Double-tap crash
- [Random AVAudioEngine crash](https://developer.apple.com/forums/thread/679091) — Thread safety
- [AVAudioEngine thread-safety](https://developer.apple.com/forums/thread/123540) — Serial access requirement
- [AVAudioEngine exception](https://developer.apple.com/forums/thread/711583) — Sample rate mismatch
- [AVAudioEngine sample rate mismatch](https://developer.apple.com/forums/thread/680785) — Device format changes

**WWDC Sessions:**
- [AVAudioEngine in Practice — WWDC 2014](https://developer.apple.com/videos/play/wwdc2014/502/) — Foundational concepts, node graph, taps, threading
- [What's New in Voice Processing — WWDC 2023](https://developer.apple.com/videos/play/wwdc2023/10235/) — Voice processing, echo cancellation
- [What's New in AVAudioEngine — WWDC 2019](https://developer.apple.com/videos/play/wwdc2019/510/) — Voice processing API addition

**Third-Party References:**
- [Tips about AVAudioEngine](https://snakamura.github.io/log/2024/11/audio_engine.html) — Reset behavior, configuration changes, converter patterns
- [Audio Engine crash on iOS — WhisperKit #261](https://github.com/argmaxinc/WhisperKit/issues/261) — installTap format validation crash
- [ExceptionCatcher](https://github.com/sindresorhus/ExceptionCatcher) — Catching ObjC exceptions in Swift
- [CwlCatchException](https://github.com/mattgallagher/CwlCatchException) — Alternative ObjC exception catcher

---

*This document synthesizes Apple documentation, Developer Forums discussions, WWDC session content, third-party crash reports, and battle-tested production code.*
