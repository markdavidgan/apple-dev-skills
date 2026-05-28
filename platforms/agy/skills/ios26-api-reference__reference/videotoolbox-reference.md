# VideoToolbox Comprehensive API Reference

> **THE DEFINITIVE REFERENCE FOR VideoToolbox H.264 ENCODING/DECODING ON iOS**
>
> Last Updated: 2026-04-08
>
> **Built by research agent from Apple documentation, SDK headers, WWDC sessions, and verified open-source implementations.**
>
> **Scope:** Real-time H.264 hardware encoding/decoding for peer-to-peer network streaming.
> Covers safe memory patterns to replace force-unwrapped `baseAddress!` and raw pointer manipulation.

---

## Table of Contents

1. [Framework Overview](#1-framework-overview)
2. [VTCompressionSession (Encoding)](#2-vtcompressionsession-encoding)
3. [VTDecompressionSession (Decoding)](#3-vtdecompressionsession-decoding)
4. [CMSampleBuffer](#4-cmsamplebuffer)
5. [CMFormatDescription](#5-cmformatdescription)
6. [CVPixelBuffer](#6-cvpixelbuffer)
7. [NAL Unit Parsing](#7-nal-unit-parsing)
8. [AVCC vs Annex B Format](#8-avcc-vs-annex-b-format)
9. [Thread Safety and Swift 6 Patterns](#9-thread-safety-and-swift-6-patterns)
10. [Safe Memory Patterns](#10-safe-memory-patterns)
11. [Error Handling](#11-error-handling)
12. [Performance and Thermal Management](#12-performance-and-thermal-management)
13. [Complete Encoding Pipeline](#13-complete-encoding-pipeline)
14. [Complete Decoding Pipeline](#14-complete-decoding-pipeline)
15. [Common Integration Issues](#15-common-integration-issues)

---

## 1. Framework Overview

VideoToolbox provides direct access to hardware-accelerated video encoding and decoding on Apple platforms. It sits below AVFoundation/AVKit and above CoreMedia/CoreVideo in the media stack.

```
+----------------------------------+
|          AVKit / AVFoundation    |  <-- High-level (preferred for simple use)
+----------------------------------+
|          VideoToolbox            |  <-- Low-level hardware codec access
+----------------------------------+
|     CoreMedia / CoreVideo        |  <-- Buffer management primitives
+----------------------------------+
|     Hardware Video Codec         |  <-- Apple Silicon media engine
+----------------------------------+
```

### Key Facts

| Property | Value |
|----------|-------|
| **Import** | `import VideoToolbox` (also import `CoreMedia`, `CoreVideo`) |
| **Availability** | iOS 8.0+, macOS 10.8+, tvOS 10.2+ |
| **iOS hardware acceleration** | **Always on** (no opt-in needed; iOS has no software fallback) |
| **macOS hardware acceleration** | Off by default; enable via `kVTVideoEncoderSpecification_EnableHardwareAcceleratedVideoEncoder` |
| **Session types** | Compression (encoding), Decompression (decoding), Pixel Transfer |
| **Supported codecs (iOS)** | H.264 (all profiles up to High 5.2), H.265/HEVC (A10+), VP9 (decode only, A12+), AV1 (decode only, M1+/A17+) |
| **C API** | All APIs are C functions; no native Swift types |
| **Memory management** | CoreFoundation reference counting (`CFRetain`/`CFRelease`); Swift handles most automatically |
| **Thread model** | Callbacks fire on arbitrary threads; synchronize all shared state |

### Required Imports

```swift
import VideoToolbox   // VTCompressionSession, VTDecompressionSession
import CoreMedia      // CMSampleBuffer, CMBlockBuffer, CMFormatDescription, CMTime
import CoreVideo      // CVPixelBuffer, CVPixelBufferLockBaseAddress
import CoreImage      // CIImage, CIContext (for pixel buffer -> CGImage conversion)
```

---

## 2. VTCompressionSession (Encoding)

A `VTCompressionSession` compresses raw pixel buffers (CVPixelBuffer/CVImageBuffer) into compressed H.264 NAL units delivered via CMSampleBuffer.

### 2.1 Session Creation

#### C Signature

```c
OSStatus VTCompressionSessionCreate(
    CFAllocatorRef              allocator,                  // kCFAllocatorDefault
    int32_t                     width,                      // Frame width in pixels
    int32_t                     height,                     // Frame height in pixels
    CMVideoCodecType            codecType,                  // kCMVideoCodecType_H264
    CFDictionaryRef             encoderSpecification,       // Encoder hints (hardware preference)
    CFDictionaryRef             sourceImageBufferAttributes,// Pixel buffer pool config
    CFAllocatorRef              compressedDataAllocator,    // nil for default
    VTCompressionOutputCallback outputCallback,             // Callback for encoded frames
    void *                      outputCallbackRefCon,       // Context pointer for callback
    VTCompressionSessionRef *   compressionSessionOut       // Output: the created session
);
// Returns: noErr (0) on success, or a VideoToolbox error code
// Available: iOS 8.0+, macOS 10.8+
```

#### Swift Usage

```swift
var session: VTCompressionSession?

// Encoder specification: prefer hardware on macOS (iOS always uses hardware)
let encoderSpec: [CFString: Any] = [
    kVTVideoEncoderSpecification_EnableHardwareAcceleratedVideoEncoder: true
]

let status = VTCompressionSessionCreate(
    allocator: kCFAllocatorDefault,
    width: Int32(width),
    height: Int32(height),
    codecType: kCMVideoCodecType_H264,
    encoderSpecification: encoderSpec as CFDictionary,
    imageBufferAttributes: nil,       // nil = encoder chooses optimal format
    compressedDataAllocator: nil,
    outputCallback: compressionOutputCallback,
    refcon: Unmanaged.passUnretained(self).toOpaque(),
    compressionSessionOut: &session
)

guard status == noErr, let session else {
    // Handle error -- see Section 11 for error codes
    return
}
```

#### Codec Type Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `kCMVideoCodecType_H264` | `avc1` | H.264/AVC |
| `kCMVideoCodecType_HEVC` | `hvc1` | H.265/HEVC |
| `kCMVideoCodecType_VP9` | `vp09` | VP9 (encode: macOS only) |
| `kCMVideoCodecType_AV1` | `av01` | AV1 (encode: macOS only, Apple Silicon) |

### 2.2 Session Configuration (Properties)

Properties are set after session creation using `VTSessionSetProperty`:

```swift
func VTSessionSetProperty(
    _ session: VTSession,       // Compression or decompression session
    key: CFString,              // Property key
    value: CFTypeRef            // Property value
) -> OSStatus
```

#### Complete H.264 Property Reference

##### Rate Control Properties

| Property Key | Type | R/W | Description |
|-------------|------|-----|-------------|
| `kVTCompressionPropertyKey_AverageBitRate` | CFNumber (SInt32) | R/W | Target average bitrate in bits/sec. The encoder may exceed this momentarily. |
| `kVTCompressionPropertyKey_DataRateLimits` | CFArray | R/W | Hard limits: array of [bytes, seconds] pairs. E.g., `[250_000, 1.0]` = max 250KB per second. |
| `kVTCompressionPropertyKey_Quality` | CFNumber (Float32) | R/W | Quality factor 0.0-1.0. Cannot be used simultaneously with AverageBitRate. |

##### Frame Dependency Properties

| Property Key | Type | R/W | Description |
|-------------|------|-----|-------------|
| `kVTCompressionPropertyKey_MaxKeyFrameInterval` | CFNumber (int) | R/W | Max frames between keyframes. E.g., 60 = keyframe every 2 seconds at 30fps. |
| `kVTCompressionPropertyKey_MaxKeyFrameIntervalDuration` | CFNumber (seconds) | R/W | Max seconds between keyframes. Takes precedence over frame count. |
| `kVTCompressionPropertyKey_AllowTemporalCompression` | CFBoolean | R/W | Enable P-frames and B-frames. Default: true. |
| `kVTCompressionPropertyKey_AllowFrameReordering` | CFBoolean | R/W | Enable B-frames (requires display reordering). **Set false for real-time streaming.** |

##### Bitstream Configuration

| Property Key | Type | R/W | Description |
|-------------|------|-----|-------------|
| `kVTCompressionPropertyKey_ProfileLevel` | CFString | R/W | H.264 profile and level. See profile constants below. |
| `kVTCompressionPropertyKey_H264EntropyMode` | CFString | R/W | `kVTH264EntropyMode_CAVLC` or `kVTH264EntropyMode_CABAC`. CABAC = better compression, Baseline requires CAVLC. |
| `kVTCompressionPropertyKey_Depth` | CFNumber | R/W | Pixel depth of encoded video. |

##### Performance Hints

| Property Key | Type | R/W | Description |
|-------------|------|-----|-------------|
| `kVTCompressionPropertyKey_RealTime` | CFBoolean | R/W | **Critical for streaming.** Hints that frames arrive in real-time. Encoder optimizes for latency over quality. |
| `kVTCompressionPropertyKey_ExpectedFrameRate` | CFNumber | R/W | Expected input frame rate (fps). Helps encoder plan rate control. |
| `kVTCompressionPropertyKey_ExpectedDuration` | CFNumber (seconds) | R/W | Expected total session duration. |
| `kVTCompressionPropertyKey_SourceFrameCount` | CFNumber | R/W | Expected total frame count. |

##### Slice and Frame Limits

| Property Key | Type | R/W | Description |
|-------------|------|-----|-------------|
| `kVTCompressionPropertyKey_MaxH264SliceBytes` | CFNumber (SInt32) | R/W | Max bytes per H.264 slice. Useful for network MTU constraints. |
| `kVTCompressionPropertyKey_MaxFrameDelayCount` | CFNumber | R/W | Max frames encoder may hold before emitting. -1 = unlimited. 0 = one-in-one-out (low latency). |

##### Colorimetry

| Property Key | Type | R/W | Description |
|-------------|------|-----|-------------|
| `kVTCompressionPropertyKey_ColorPrimaries` | CFString | R/W | Color primaries (e.g., `kCVImageBufferColorPrimaries_ITU_R_709_2`) |
| `kVTCompressionPropertyKey_TransferFunction` | CFString | R/W | Transfer function specification |
| `kVTCompressionPropertyKey_YCbCrMatrix` | CFString | R/W | YCbCr matrix specification |

##### Read-Only Properties

| Property Key | Type | R/O | Description |
|-------------|------|-----|-------------|
| `kVTCompressionPropertyKey_NumberOfPendingFrames` | CFNumber | R/O | Frames waiting to be encoded |
| `kVTCompressionPropertyKey_PixelBufferPoolIsShared` | CFBoolean | R/O | Whether pixel buffer pool is shared |
| `kVTCompressionPropertyKey_VideoEncoderPixelBufferAttributes` | CFDictionary | R/O | Encoder's preferred pixel buffer format |
| `kVTCompressionPropertyKey_UsingHardwareAcceleratedVideoEncoder` | CFBoolean | R/O | Whether hardware encoder is active |

##### Hardware Acceleration (Encoder Specification Keys)

| Key | Type | Description |
|-----|------|-------------|
| `kVTVideoEncoderSpecification_EnableHardwareAcceleratedVideoEncoder` | CFBoolean | Allow hardware acceleration |
| `kVTVideoEncoderSpecification_RequireHardwareAcceleratedVideoEncoder` | CFBoolean | Fail if hardware not available |

#### H.264 Profile/Level Constants

**Baseline Profile** (no B-frames, CAVLC only):
- `kVTProfileLevel_H264_Baseline_1_3`, `_3_0` through `_5_2`
- `kVTProfileLevel_H264_Baseline_AutoLevel`

**Main Profile** (B-frames, CABAC):
- `kVTProfileLevel_H264_Main_3_0` through `_5_2`
- `kVTProfileLevel_H264_Main_AutoLevel`

**High Profile** (8x8 transform, CABAC):
- `kVTProfileLevel_H264_High_3_0` through `_5_2`
- `kVTProfileLevel_H264_High_AutoLevel`

> **Recommendation for real-time streaming:** Use `kVTProfileLevel_H264_Baseline_AutoLevel` for maximum compatibility and lowest latency (no B-frames). Use `kVTProfileLevel_H264_Main_AutoLevel` if you need CABAC compression efficiency and disable frame reordering.

#### Typical Real-Time Streaming Configuration

```swift
func configureForRealTimeStreaming(_ session: VTCompressionSession, quality: VideoQuality) {
    // Real-time mode -- optimize for latency
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_RealTime, value: kCFBooleanTrue)

    // Profile: Main for good compression, Baseline for max compatibility
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_ProfileLevel,
                         value: kVTProfileLevel_H264_Main_AutoLevel)

    // Disable B-frames for real-time (eliminates reordering delay)
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_AllowFrameReordering,
                         value: kCFBooleanFalse)

    // Bitrate
    let bitrate = quality.targetBitrate as CFNumber
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_AverageBitRate, value: bitrate)

    // Hard bitrate limit (1.5x average over 1 second)
    let limit = [quality.targetBitrate * 3 / 2 / 8, 1] as CFArray  // [bytes, seconds]
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_DataRateLimits, value: limit)

    // Keyframe every 2 seconds
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_MaxKeyFrameIntervalDuration,
                         value: 2.0 as CFNumber)

    // Expected frame rate
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_ExpectedFrameRate,
                         value: quality.maxFrameRate as CFNumber)

    // One-in-one-out for minimum latency
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_MaxFrameDelayCount,
                         value: 0 as CFNumber)

    // Entropy mode: CABAC for better compression (Main/High profile)
    VTSessionSetProperty(session, key: kVTCompressionPropertyKey_H264EntropyMode,
                         value: kVTH264EntropyMode_CABAC)
}
```

### 2.3 Encoding Frames

#### VTCompressionSessionEncodeFrame

```c
// Callback-based version (iOS 8.0+)
OSStatus VTCompressionSessionEncodeFrame(
    VTCompressionSessionRef session,
    CVImageBufferRef        imageBuffer,            // The frame to encode
    CMTime                  presentationTimeStamp,  // PTS for this frame
    CMTime                  duration,               // Frame duration (kCMTimeInvalid if unknown)
    CFDictionaryRef         frameProperties,        // Per-frame properties (e.g., force keyframe)
    void *                  sourceFrameRefCon,      // Passed to output callback
    VTEncodeInfoFlags *     infoFlagsOut            // May be NULL
);

// Block-based version (iOS 9.0+)
OSStatus VTCompressionSessionEncodeFrameWithOutputHandler(
    VTCompressionSessionRef session,
    CVImageBufferRef        imageBuffer,
    CMTime                  presentationTimeStamp,
    CMTime                  duration,
    CFDictionaryRef         frameProperties,
    VTEncodeInfoFlags *     infoFlagsOut,
    VTCompressionOutputHandler outputHandler         // Block callback
);
```

#### Swift Usage

```swift
func encodeFrame(_ pixelBuffer: CVPixelBuffer, timestamp: CMTime) {
    guard let session = compressionSession else { return }

    var infoFlags = VTEncodeInfoFlags()
    let status = VTCompressionSessionEncodeFrame(
        session,
        imageBuffer: pixelBuffer,
        presentationTimeStamp: timestamp,
        duration: .invalid,          // Unknown duration for real-time
        frameProperties: nil,        // No per-frame overrides
        sourceFrameRefCon: nil,
        infoFlagsOut: &infoFlags
    )

    if status != noErr {
        logger.error("Encode failed: \(status)")
    }

    // Check if frame was dropped
    if infoFlags.contains(.frameDropped) {
        logger.debug("Frame dropped by encoder (rate control)")
    }
}
```

#### Forcing a Keyframe

```swift
func encodeKeyframe(_ pixelBuffer: CVPixelBuffer, timestamp: CMTime) {
    let frameProperties: [CFString: Any] = [
        kVTEncodeFrameOptionKey_ForceKeyFrame: true
    ]

    VTCompressionSessionEncodeFrame(
        session,
        imageBuffer: pixelBuffer,
        presentationTimeStamp: timestamp,
        duration: .invalid,
        frameProperties: frameProperties as CFDictionary,
        sourceFrameRefCon: nil,
        infoFlagsOut: nil
    )
}
```

### 2.4 Output Callback

#### Callback Type (C function pointer -- iOS 8.0+)

```c
typedef void (*VTCompressionOutputCallback)(
    void *                  outputCallbackRefCon,   // Your context pointer
    void *                  sourceFrameRefCon,      // Per-frame context from EncodeFrame
    OSStatus                status,                 // noErr if successful
    VTEncodeInfoFlags       infoFlags,              // Async/dropped indicators
    CMSampleBufferRef       sampleBuffer            // The encoded H.264 data (NULL on error)
);
```

#### VTEncodeInfoFlags

| Flag | Description |
|------|-------------|
| `kVTEncodeInfo_Asynchronous` | Encode ran asynchronously |
| `kVTEncodeInfo_FrameDropped` | Frame was dropped (rate control or thermal) |

#### Complete Output Callback Implementation

```swift
let compressionOutputCallback: VTCompressionOutputCallback = {
    refCon, sourceRefCon, status, infoFlags, sampleBuffer in

    guard let refCon else { return }
    guard status == noErr else {
        Logger.video.error("Compression callback error: \(status)")
        return
    }
    guard let sampleBuffer, CMSampleBufferDataIsReady(sampleBuffer) else { return }

    let encoder = Unmanaged<VideoEncoderService>.fromOpaque(refCon).takeUnretainedValue()

    // Check if this is a keyframe
    let isKeyframe: Bool = {
        guard let attachments = CMSampleBufferGetSampleAttachmentsArray(
            sampleBuffer, createIfNecessary: false
        ) as? [NSDictionary], let first = attachments.first else {
            return true  // No attachments = keyframe
        }
        // If kCMSampleAttachmentKey_NotSync is absent or false, it's a keyframe
        return !(first[kCMSampleAttachmentKey_NotSync] as? Bool ?? false)
    }()

    if isKeyframe {
        // Extract SPS/PPS from keyframe for transmission to decoder
        encoder.extractAndSendParameterSets(from: sampleBuffer)
    }

    // Extract NAL unit data and send over network
    encoder.extractAndSendNALUnits(from: sampleBuffer, isKeyframe: isKeyframe)
}
```

### 2.5 SPS/PPS Extraction from Encoded Output

When the encoder produces a keyframe, the SPS and PPS are embedded in the CMSampleBuffer's format description.

```swift
/// Extracts SPS and PPS parameter sets from an encoded keyframe.
/// - SAFE pattern: uses withUnsafeBufferPointer properly scoped
func extractParameterSets(from sampleBuffer: CMSampleBuffer) -> (sps: Data, pps: Data)? {
    guard let formatDescription = CMSampleBufferGetFormatDescription(sampleBuffer) else {
        return nil
    }

    // Extract SPS (index 0)
    var spsSize: Int = 0
    var spsCount: Int = 0
    var spsPointer: UnsafePointer<UInt8>?
    var spsStatus = CMVideoFormatDescriptionGetH264ParameterSetAtIndex(
        formatDescription,
        parameterSetIndex: 0,
        parameterSetPointerOut: &spsPointer,
        parameterSetSizeOut: &spsSize,
        parameterSetCountOut: &spsCount,
        nalUnitHeaderLengthOut: nil
    )

    guard spsStatus == noErr, let spsPtr = spsPointer else { return nil }
    // SAFE: Copy immediately -- pointer only valid until formatDescription is released
    let spsData = Data(bytes: spsPtr, count: spsSize)

    // Extract PPS (index 1)
    var ppsSize: Int = 0
    var ppsPointer: UnsafePointer<UInt8>?
    var ppsStatus = CMVideoFormatDescriptionGetH264ParameterSetAtIndex(
        formatDescription,
        parameterSetIndex: 1,
        parameterSetPointerOut: &ppsPointer,
        parameterSetSizeOut: &ppsSize,
        parameterSetCountOut: nil,
        nalUnitHeaderLengthOut: nil
    )

    guard ppsStatus == noErr, let ppsPtr = ppsPointer else { return nil }
    let ppsData = Data(bytes: ppsPtr, count: ppsSize)

    return (sps: spsData, pps: ppsData)
}
```

### 2.6 NAL Unit Extraction from Encoded Output (AVCC Format)

The encoder outputs NAL units in **AVCC format** (length-prefixed, NOT Annex B start codes).

```swift
/// Extracts NAL units from encoded CMSampleBuffer in AVCC format.
/// Converts AVCC length prefix to Annex B start codes for network transmission.
/// - SAFE: No force-unwrapping. All pointer access is bounds-checked.
func extractNALUnits(from sampleBuffer: CMSampleBuffer) -> [Data] {
    guard let dataBuffer = CMSampleBufferGetDataBuffer(sampleBuffer) else { return [] }

    var totalLength: Int = 0
    var dataPointer: UnsafeMutablePointer<Int8>?

    let status = CMBlockBufferGetDataPointer(
        dataBuffer,
        atOffset: 0,
        lengthAtOffsetOut: nil,
        totalLengthOut: &totalLength,
        dataPointerOut: &dataPointer
    )

    guard status == noErr, let dataPointer else { return [] }

    var nalUnits: [Data] = []
    var offset = 0
    let avccHeaderLength = 4  // AVCC uses 4-byte length prefix

    while offset < totalLength - avccHeaderLength {
        // Read AVCC length (big-endian UInt32)
        var naluLength: UInt32 = 0
        memcpy(&naluLength, dataPointer.advanced(by: offset), avccHeaderLength)
        naluLength = CFSwapInt32BigToHost(naluLength)

        let naluOffset = offset + avccHeaderLength
        let naluEnd = naluOffset + Int(naluLength)

        // Bounds check
        guard naluEnd <= totalLength else {
            break
        }

        // Convert to Annex B: prepend start code, copy NAL data
        var annexBUnit = Data([0x00, 0x00, 0x00, 0x01])  // 4-byte start code
        annexBUnit.append(Data(bytes: dataPointer.advanced(by: naluOffset),
                               count: Int(naluLength)))

        nalUnits.append(annexBUnit)
        offset = naluEnd
    }

    return nalUnits
}
```

### 2.7 Session Lifecycle

```swift
// Prepare encoder resources (optional but recommended)
VTCompressionSessionPrepareToEncodeFrames(session)

// ... encode frames ...

// Flush remaining frames (blocks until all pending frames are emitted)
VTCompressionSessionCompleteFrames(session, untilPresentationTimeStamp: .invalid)

// Invalidate session (must be called before releasing)
VTCompressionSessionInvalidate(session)
// After invalidation, the session reference can be released (Swift ARC handles this)
```

### 2.8 Pixel Buffer Pool

The session provides an optimized pixel buffer pool for input frames:

```swift
// Get the session's pixel buffer pool (optimized for the encoder)
if let pool = VTCompressionSessionGetPixelBufferPool(session) {
    var pixelBuffer: CVPixelBuffer?
    let status = CVPixelBufferPoolCreatePixelBuffer(nil, pool, &pixelBuffer)
    if status == kCVReturnSuccess, let buffer = pixelBuffer {
        // Use buffer for camera capture or rendering
    }
}
```

---

## 3. VTDecompressionSession (Decoding)

A `VTDecompressionSession` decodes compressed H.264 data (CMSampleBuffer containing NAL units) into raw pixel buffers.

### 3.1 Session Creation

#### C Signature

```c
OSStatus VTDecompressionSessionCreate(
    CFAllocatorRef                              allocator,
    CMVideoFormatDescriptionRef                 videoFormatDescription,  // From SPS/PPS
    CFDictionaryRef                             videoDecoderSpecification,
    CFDictionaryRef                             destinationImageBufferAttributes,
    const VTDecompressionOutputCallbackRecord * outputCallback,
    VTDecompressionSessionRef *                 decompressionSessionOut
);
// Returns: noErr on success
// Available: iOS 8.0+, macOS 10.8+
```

#### Swift Usage

```swift
func createDecompressionSession(
    formatDescription: CMVideoFormatDescription
) -> VTDecompressionSession? {
    // Output pixel buffer attributes
    let attributes: [CFString: Any] = [
        kCVPixelBufferPixelFormatTypeKey: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange,
        kCVPixelBufferIOSurfacePropertiesKey: [:] as CFDictionary,
        // Do NOT set width/height -- let decoder use format description dimensions
    ]

    var callbackRecord = VTDecompressionOutputCallbackRecord(
        decompressionOutputCallback: decompressionCallback,
        decompressionOutputRefCon: Unmanaged.passUnretained(self).toOpaque()
    )

    var session: VTDecompressionSession?
    let status = VTDecompressionSessionCreate(
        allocator: kCFAllocatorDefault,
        formatDescription: formatDescription,
        decoderSpecification: nil,          // nil = system chooses best decoder
        imageBufferAttributes: attributes as CFDictionary,
        outputCallback: &callbackRecord,
        decompressionSessionOut: &session
    )

    guard status == noErr else {
        logger.error("Failed to create decompression session: \(status)")
        return nil
    }

    return session
}
```

#### Recommended Pixel Format

| Format | Constant | Description | Use When |
|--------|----------|-------------|----------|
| NV12 Video Range | `kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange` | Native hardware decoder output | Best performance (no conversion) |
| NV12 Full Range | `kCVPixelFormatType_420YpCbCr8BiPlanarFullRange` | Full-range NV12 | Camera-captured content |
| BGRA | `kCVPixelFormatType_32BGRA` | 32-bit BGRA | When you need direct pixel access for drawing |

> **Performance:** Always prefer `420YpCbCr8BiPlanarVideoRange` (NV12) as the output format. The hardware decoder outputs NV12 natively. Requesting BGRA forces a pixel format conversion that costs CPU/GPU time. Use CIImage for efficient NV12 -> display rendering.

### 3.2 Output Callback

#### Callback Type (C function pointer)

```c
typedef void (*VTDecompressionOutputCallback)(
    void *              decompressionOutputRefCon,  // Your context pointer
    void *              sourceFrameRefCon,           // Per-frame context from DecodeFrame
    OSStatus            status,                      // noErr if successful
    VTDecodeInfoFlags   infoFlags,                   // Async/dropped indicators
    CVImageBufferRef    imageBuffer,                 // Decoded pixel buffer (NULL on error/drop)
    CMTime              presentationTimeStamp,       // PTS of decoded frame
    CMTime              presentationDuration         // Duration of decoded frame
);
```

#### VTDecodeInfoFlags

| Flag | Description |
|------|-------------|
| `kVTDecodeInfo_Asynchronous` | Decode ran asynchronously |
| `kVTDecodeInfo_FrameDropped` | Frame was dropped |

#### VTDecodeFrameFlags

| Flag | Description |
|------|-------------|
| `._EnableAsynchronousDecompression` | Allow async decode (default off = synchronous) |
| `._EnableTemporalProcessing` | Enable display-order output (reordering) |

> **Critical:** "The decoder is blocked until the callback returns." Keep callback work minimal. Copy/retain what you need and return immediately.

#### Safe Callback Implementation

```swift
let decompressionCallback: VTDecompressionOutputCallback = {
    refCon, sourceRefCon, status, infoFlags, imageBuffer, pts, duration in

    // Check for dropped frame
    if infoFlags.contains(.frameDropped) { return }

    guard status == noErr, let imageBuffer else { return }

    // SAFE: retain the pixel buffer before escaping the callback
    CVPixelBufferRetain(imageBuffer)

    // Process on our queue (keep callback fast)
    DispatchQueue.main.async {
        defer { CVPixelBufferRelease(imageBuffer) }
        // Convert to displayable format
        let ciImage = CIImage(cvPixelBuffer: imageBuffer)
        // ... render ciImage ...
    }
}
```

### 3.3 Decoding Frames

#### Synchronous vs Asynchronous Decode

```swift
// SYNCHRONOUS: Callback fires before DecodeFrame returns
var infoFlags = VTDecodeInfoFlags()
let status = VTDecompressionSessionDecodeFrame(
    session,
    sampleBuffer: sample,
    flags: [],          // Empty = synchronous
    frameRefcon: nil,
    infoFlagsOut: &infoFlags
)

// ASYNCHRONOUS: Callback may fire later on a different thread
let status = VTDecompressionSessionDecodeFrame(
    session,
    sampleBuffer: sample,
    flags: [._EnableAsynchronousDecompression],
    frameRefcon: nil,
    infoFlagsOut: &infoFlags
)
```

### 3.4 Additional Session Functions

```swift
// Wait for all async decodes to complete
VTDecompressionSessionWaitForAsynchronousFrames(session)

// Flush delayed frames (when using temporal processing/reordering)
VTDecompressionSessionFinishDelayedFrames(session)

// Check if session can handle a new format (e.g., resolution change)
let canAccept: Bool = VTDecompressionSessionCanAcceptFormatDescription(
    session, newFormatDesc
)
// If false, you must invalidate and recreate the session

// Invalidate session (must be done before release)
VTDecompressionSessionInvalidate(session)

// Check hardware decode support for a codec
let hasHardware = VTIsHardwareDecodeSupported(kCMVideoCodecType_H264)  // iOS 11.0+
```

---

## 4. CMSampleBuffer

`CMSampleBuffer` is the primary data container for both encoded and decoded video data in the CoreMedia pipeline.

### 4.1 Key Functions

```swift
// Get format description from sample buffer
let formatDesc = CMSampleBufferGetFormatDescription(sampleBuffer)

// Get the data buffer (encoded NAL units)
let dataBuffer: CMBlockBuffer? = CMSampleBufferGetDataBuffer(sampleBuffer)

// Get the image buffer (decoded pixel data)
let imageBuffer: CVImageBuffer? = CMSampleBufferGetImageBuffer(sampleBuffer)

// Timing information
let pts: CMTime = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
let dts: CMTime = CMSampleBufferGetDecodeTimeStamp(sampleBuffer)
let duration: CMTime = CMSampleBufferGetDuration(sampleBuffer)

// Data readiness
let isReady: Bool = CMSampleBufferDataIsReady(sampleBuffer)

// Sample count and size
let count: CMItemCount = CMSampleBufferGetNumSamples(sampleBuffer)
let totalSize: Int = CMSampleBufferGetTotalSampleSize(sampleBuffer)

// Attachments (e.g., keyframe detection)
let attachments = CMSampleBufferGetSampleAttachmentsArray(
    sampleBuffer, createIfNecessary: false
) as? [NSDictionary]
```

### 4.2 Creating CMSampleBuffer from Network Data (SAFE Pattern)

This is the critical path for the decoder: you receive H.264 NAL units over the network and must construct a CMSampleBuffer for VideoToolbox.

```swift
/// Creates a CMSampleBuffer from H.264 NAL unit data for decoding.
/// - SAFE: Uses contiguous data copy. No force-unwrapping.
func createSampleBuffer(
    from nalData: Data,
    formatDescription: CMVideoFormatDescription,
    timestamp: CMTime
) -> CMSampleBuffer? {
    // Step 1: Create CMBlockBuffer from Data (SAFE -- copies data)
    var blockBuffer: CMBlockBuffer?

    // SAFE PATTERN: Use Data.withUnsafeBytes with guard, not force-unwrap
    let blockStatus = nalData.withUnsafeBytes { rawBuffer -> OSStatus in
        guard let baseAddress = rawBuffer.baseAddress else {
            return kCMBlockBufferNoErr + 1  // Synthetic error
        }
        return CMBlockBufferCreateWithMemoryBlock(
            allocator: kCFAllocatorDefault,
            memoryBlock: nil,           // nil = CMBlockBuffer allocates its own memory
            blockLength: nalData.count,
            blockAllocator: nil,
            customBlockSource: nil,
            offsetToData: 0,
            dataLength: nalData.count,
            flags: 0,
            blockBufferOut: &blockBuffer
        )
    }

    guard blockStatus == noErr, let block = blockBuffer else { return nil }

    // Copy data into the block buffer (SAFE -- data now owned by CMBlockBuffer)
    let copyStatus = nalData.withUnsafeBytes { rawBuffer -> OSStatus in
        guard let baseAddress = rawBuffer.baseAddress else { return -1 }
        return CMBlockBufferReplaceDataBytes(
            with: baseAddress,
            blockBuffer: block,
            offsetIntoDestination: 0,
            dataLength: nalData.count
        )
    }

    guard copyStatus == noErr else { return nil }

    // Step 2: Create CMSampleBuffer
    var sampleBuffer: CMSampleBuffer?
    var timingInfo = CMSampleTimingInfo(
        duration: .invalid,
        presentationTimeStamp: timestamp,
        decodeTimeStamp: .invalid
    )
    var sampleSize = nalData.count

    let sampleStatus = CMSampleBufferCreateReady(
        allocator: kCFAllocatorDefault,
        dataBuffer: block,
        formatDescription: formatDescription,
        sampleCount: 1,
        sampleTimingEntryCount: 1,
        sampleTimingArray: &timingInfo,
        sampleSizeEntryCount: 1,
        sampleSizeArray: &sampleSize,
        sampleBufferOut: &sampleBuffer
    )

    guard sampleStatus == noErr else { return nil }

    return sampleBuffer
}
```

### 4.3 Alternative: Zero-Copy CMBlockBuffer from Data (Advanced)

For high-performance scenarios where copying is too expensive, you can create a CMBlockBuffer backed by Data's memory. This requires careful lifetime management.

```swift
/// Creates a CMBlockBuffer backed by the given Data without copying.
/// - WARNING: The Data must outlive the CMBlockBuffer. Use `Unmanaged.passRetained`
///   to prevent premature deallocation.
func createZeroCopyBlockBuffer(from data: Data) -> CMBlockBuffer? {
    let nsData = data as NSData
    let retainedData = Unmanaged.passRetained(nsData)
    let bytes = UnsafeMutableRawPointer(mutating: nsData.bytes)

    var customBlockSource = CMBlockBufferCustomBlockSource(
        version: kCMBlockBufferCustomBlockSourceVersion,
        AllocateBlock: { refCon, sizeInBytes in
            return refCon  // Already allocated -- return the pointer
        },
        FreeBlock: { refCon, memoryBlock, sizeInBytes in
            // Release the retained NSData
            Unmanaged<NSData>.fromOpaque(refCon!).release()
        },
        refCon: retainedData.toOpaque()
    )

    var blockBuffer: CMBlockBuffer?
    let status = CMBlockBufferCreateWithMemoryBlock(
        allocator: kCFAllocatorDefault,
        memoryBlock: bytes,
        blockLength: nsData.length,
        blockAllocator: kCFAllocatorNull,   // We manage memory ourselves
        customBlockSource: &customBlockSource,
        offsetToData: 0,
        dataLength: nsData.length,
        flags: 0,
        blockBufferOut: &blockBuffer
    )

    if status != noErr {
        retainedData.release()  // Clean up on failure
        return nil
    }

    return blockBuffer
}
```

---

## 5. CMFormatDescription

`CMFormatDescription` (specifically `CMVideoFormatDescription`) describes the encoding parameters of the video stream. For H.264, it is created from SPS and PPS parameter sets.

### 5.1 Creating from H.264 SPS/PPS

#### SAFE Swift Pattern (Replaces Force-Unwrap)

```swift
/// Creates a CMVideoFormatDescription from SPS and PPS data.
/// - SAFE: All pointer access is properly scoped within withUnsafeBytes closures.
func createFormatDescription(sps: Data, pps: Data) -> CMVideoFormatDescription? {
    var formatDescription: CMVideoFormatDescription?

    // SAFE: Nest withUnsafeBytes so both pointers are valid simultaneously
    let status = sps.withUnsafeBytes { spsBuffer -> OSStatus in
        pps.withUnsafeBytes { ppsBuffer -> OSStatus in
            guard let spsBase = spsBuffer.baseAddress?.assumingMemoryBound(to: UInt8.self),
                  let ppsBase = ppsBuffer.baseAddress?.assumingMemoryBound(to: UInt8.self) else {
                return kVTParameterErr
            }

            // Both pointers are valid within this scope
            let parameterSetPointers: [UnsafePointer<UInt8>] = [spsBase, ppsBase]
            let parameterSetSizes: [Int] = [sps.count, pps.count]

            return CMVideoFormatDescriptionCreateFromH264ParameterSets(
                allocator: kCFAllocatorDefault,
                parameterSetCount: 2,
                parameterSetPointers: parameterSetPointers,
                parameterSetSizes: parameterSetSizes,
                nalUnitHeaderLength: 4,
                formatDescriptionOut: &formatDescription
            )
        }
    }

    guard status == noErr else {
        logger.error("Failed to create format description: \(status)")
        return nil
    }

    return formatDescription
}
```

### 5.2 Extracting Parameters from Format Description

```swift
// Get video dimensions
let dimensions = CMVideoFormatDescriptionGetDimensions(formatDescription)
// dimensions.width, dimensions.height

// Get codec type
let codecType = CMFormatDescriptionGetMediaSubType(formatDescription)
// Returns FourCharCode like 'avc1' for H.264

// Get extensions dictionary (contains SPS/PPS and other metadata)
let extensions = CMFormatDescriptionGetExtensions(formatDescription) as? [CFString: Any]

// Get H.264 parameter set at index
var paramSetPtr: UnsafePointer<UInt8>?
var paramSetSize: Int = 0
var paramSetCount: Int = 0
var nalHeaderLength: Int32 = 0

CMVideoFormatDescriptionGetH264ParameterSetAtIndex(
    formatDescription,
    parameterSetIndex: 0,               // 0 = SPS, 1 = PPS
    parameterSetPointerOut: &paramSetPtr,
    parameterSetSizeOut: &paramSetSize,
    parameterSetCountOut: &paramSetCount,
    nalUnitHeaderLengthOut: &nalHeaderLength
)
```

### 5.3 Checking Format Compatibility

```swift
// Check if two format descriptions are compatible
let equal = CMFormatDescriptionEqual(formatA, otherFormatDescription: formatB)

// For decompression session reuse -- check if session can accept new format
let canAccept = VTDecompressionSessionCanAcceptFormatDescription(session, newFormatDesc)
if !canAccept {
    // Must recreate session with new format description
    VTDecompressionSessionInvalidate(session)
    session = createDecompressionSession(formatDescription: newFormatDesc)
}
```

---

## 6. CVPixelBuffer

`CVPixelBuffer` (aliased as `CVImageBuffer`) is the uncompressed frame container. It may be backed by an IOSurface for zero-copy GPU access.

### 6.1 Locking and Unlocking Base Address

**You MUST lock before accessing pixel data and unlock after.**

#### SAFE Swift Pattern

```swift
/// Safely access pixel buffer data with automatic lock/unlock.
func withLockedPixelBuffer<T>(
    _ pixelBuffer: CVPixelBuffer,
    readOnly: Bool = true,
    body: (UnsafeRawPointer, Int, Int, Int) throws -> T  // (baseAddress, width, height, bytesPerRow)
) rethrows -> T? {
    let flags: CVPixelBufferLockFlags = readOnly ? .readOnly : []
    let lockStatus = CVPixelBufferLockBaseAddress(pixelBuffer, flags)
    guard lockStatus == kCVReturnSuccess else { return nil }
    defer { CVPixelBufferUnlockBaseAddress(pixelBuffer, flags) }

    guard let baseAddress = CVPixelBufferGetBaseAddress(pixelBuffer) else { return nil }
    let width = CVPixelBufferGetWidth(pixelBuffer)
    let height = CVPixelBufferGetHeight(pixelBuffer)
    let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)

    return try body(baseAddress, width, height, bytesPerRow)
}
```

### 6.2 Pixel Buffer Properties

```swift
// Dimensions
let width = CVPixelBufferGetWidth(pixelBuffer)
let height = CVPixelBufferGetHeight(pixelBuffer)

// Memory layout
let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)
let dataSize = CVPixelBufferGetDataSize(pixelBuffer)

// Pixel format
let pixelFormat = CVPixelBufferGetPixelFormatType(pixelBuffer)

// Plane information (for planar formats like NV12)
let planeCount = CVPixelBufferGetPlaneCount(pixelBuffer)
// 0 for non-planar (BGRA), 2 for NV12 (Y plane + CbCr plane)

if CVPixelBufferIsPlanar(pixelBuffer) {
    for plane in 0..<planeCount {
        let planeWidth = CVPixelBufferGetWidthOfPlane(pixelBuffer, plane)
        let planeHeight = CVPixelBufferGetHeightOfPlane(pixelBuffer, plane)
        let planeBytesPerRow = CVPixelBufferGetBytesPerRowOfPlane(pixelBuffer, plane)
        let planeBase = CVPixelBufferGetBaseAddressOfPlane(pixelBuffer, plane)
    }
}
```

### 6.3 Creating a CVPixelBuffer

```swift
func createPixelBuffer(width: Int, height: Int,
                       pixelFormat: OSType = kCVPixelFormatType_32BGRA) -> CVPixelBuffer? {
    let attributes: [CFString: Any] = [
        kCVPixelBufferPixelFormatTypeKey: pixelFormat,
        kCVPixelBufferWidthKey: width,
        kCVPixelBufferHeightKey: height,
        kCVPixelBufferIOSurfacePropertiesKey: [:] as CFDictionary,
        kCVPixelBufferMetalCompatibilityKey: true
    ]

    var pixelBuffer: CVPixelBuffer?
    let status = CVPixelBufferCreate(
        kCFAllocatorDefault, width, height, pixelFormat,
        attributes as CFDictionary, &pixelBuffer
    )

    return status == kCVReturnSuccess ? pixelBuffer : nil
}
```

### 6.4 CVPixelBuffer to CGImage Conversion (Efficient)

```swift
// PREFERRED: Use CIContext (reuse the context instance!)
private let ciContext = CIContext(options: [.useSoftwareRenderer: false])

func createCGImage(from pixelBuffer: CVPixelBuffer) -> CGImage? {
    let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
    return ciContext.createCGImage(ciImage, from: ciImage.extent)
}
```

---

## 7. NAL Unit Parsing

H.264 bitstreams consist of Network Abstraction Layer (NAL) units, each preceded by a header byte.

### 7.1 NAL Unit Type Table

The NAL header byte structure: `[F:1][NRI:2][Type:5]`

| Type | Name | Description | Keyframe? |
|------|------|-------------|-----------|
| 1 | Non-IDR Coded Slice | Part of a P-frame or B-frame | No |
| **5** | **IDR Slice** | **Instantaneous Decoder Refresh -- keyframe** | **Yes** |
| **6** | **SEI** | **Supplemental Enhancement Information** | -- |
| **7** | **SPS** | **Sequence Parameter Set** (resolution, profile, level) | -- |
| **8** | **PPS** | **Picture Parameter Set** (entropy mode, deblocking) | -- |
| **9** | **AUD** | **Access Unit Delimiter** (frame boundary marker) | -- |

### 7.2 Extracting NAL Type from a Byte

```swift
func nalUnitType(from byte: UInt8) -> UInt8 {
    return byte & 0x1F
}

// Usage:
let type = nalUnitType(from: nalData[0])
switch type {
case 5: /* IDR keyframe */
case 7: /* SPS */
case 8: /* PPS */
case 1: /* Non-IDR slice (P/B frame) */
default: break
}
```

### 7.3 Safe NAL Unit Parser

```swift
struct NALUnit {
    let type: UInt8
    let data: Data
    let isKeyframe: Bool     // type == 5 (IDR)
    let isSPS: Bool          // type == 7
    let isPPS: Bool          // type == 8

    init(type: UInt8, data: Data) {
        self.type = type
        self.data = data
        self.isKeyframe = type == 5
        self.isSPS = type == 7
        self.isPPS = type == 8
    }
}

/// Parses Annex B NAL units from H.264 data.
/// Supports both 3-byte (0x000001) and 4-byte (0x00000001) start codes.
/// - SAFE: No force-unwrapping. Uses array subscript with bounds checking.
func parseAnnexBNALUnits(from data: Data) -> [NALUnit] {
    var units: [NALUnit] = []
    let bytes = [UInt8](data)
    let count = bytes.count
    var index = 0

    while index < count {
        var startCodeLength = 0
        if index + 3 < count &&
           bytes[index] == 0x00 && bytes[index+1] == 0x00 &&
           bytes[index+2] == 0x00 && bytes[index+3] == 0x01 {
            startCodeLength = 4
        } else if index + 2 < count &&
                  bytes[index] == 0x00 && bytes[index+1] == 0x00 &&
                  bytes[index+2] == 0x01 {
            startCodeLength = 3
        } else {
            index += 1
            continue
        }

        let nalStart = index + startCodeLength
        var nalEnd = count
        var searchIndex = nalStart + 1
        while searchIndex < count - 2 {
            if bytes[searchIndex] == 0x00 && bytes[searchIndex+1] == 0x00 {
                if bytes[searchIndex+2] == 0x01 {
                    nalEnd = searchIndex
                    break
                }
                if searchIndex + 3 < count && bytes[searchIndex+2] == 0x00 &&
                   bytes[searchIndex+3] == 0x01 {
                    nalEnd = searchIndex
                    break
                }
            }
            searchIndex += 1
        }

        guard nalStart < nalEnd else { index = nalStart; continue }
        let nalType = bytes[nalStart] & 0x1F
        let nalData = Data(bytes[nalStart..<nalEnd])
        units.append(NALUnit(type: nalType, data: nalData))
        index = nalEnd
    }

    return units
}
```

---

## 8. AVCC vs Annex B Format

Two formats exist for packaging H.264 NAL units. VideoToolbox encoder outputs **AVCC**; network streaming typically uses **Annex B**.

### 8.1 Format Comparison

| Feature | Annex B | AVCC |
|---------|---------|------|
| **NAL separator** | Start code: `0x00 0x00 0x01` (3-byte) or `0x00 0x00 0x00 0x01` (4-byte) | Length prefix: 1/2/4 bytes big-endian uint |
| **SPS/PPS location** | Inline in the bitstream before IDR frames | In `AVCDecoderConfigurationRecord` (format description) |
| **Used by** | Elementary streams, RTP, MPEG-TS, network transmission | MP4/MOV containers, VideoToolbox output |
| **VideoToolbox encoder output** | No | **Yes** |
| **VideoToolbox decoder input** | No | **Yes** (requires AVCC-formatted CMSampleBuffer) |

### 8.2 AVCC to Annex B Conversion

```swift
func avccToAnnexB(_ avccData: Data) -> Data {
    var annexB = Data()
    let bytes = [UInt8](avccData)
    var offset = 0

    while offset < bytes.count - 4 {
        let length = Int(bytes[offset]) << 24 |
                     Int(bytes[offset+1]) << 16 |
                     Int(bytes[offset+2]) << 8 |
                     Int(bytes[offset+3])
        guard offset + 4 + length <= bytes.count else { break }

        annexB.append(contentsOf: [0x00, 0x00, 0x00, 0x01])
        annexB.append(contentsOf: bytes[(offset+4)..<(offset+4+length)])
        offset += 4 + length
    }

    return annexB
}
```

### 8.3 Annex B to AVCC Conversion

```swift
func annexBToAVCC(_ annexBNAL: Data) -> Data {
    let nalData: Data
    if annexBNAL.starts(with: [0x00, 0x00, 0x00, 0x01]) {
        nalData = annexBNAL.dropFirst(4)
    } else if annexBNAL.starts(with: [0x00, 0x00, 0x01]) {
        nalData = annexBNAL.dropFirst(3)
    } else {
        nalData = annexBNAL
    }

    var avcc = Data(count: 4)
    let length = UInt32(nalData.count).bigEndian
    withUnsafeBytes(of: length) { avcc.replaceSubrange(0..<4, with: $0) }
    avcc.append(nalData)

    return avcc
}
```

### 8.4 Network Transmission Format

For peer-to-peer network streaming, a recommended message format:

```
+---------------------------------------------+
| Message Type (1 byte)                       |
|   0x01 = Parameter Sets (SPS + PPS)         |
|   0x02 = Video Frame (IDR or non-IDR)       |
|   0x03 = Frame Request (request keyframe)   |
+---------------------------------------------+
| Timestamp (8 bytes, Double, big-endian)     |
+---------------------------------------------+
| Payload (variable)                          |
|   For 0x01: [SPS length:2][SPS][PPS len:2]  |
|             [PPS]                            |
|   For 0x02: [isKeyframe:1]                   |
|             [NAL unit data in Annex B]       |
+---------------------------------------------+
```

---

## 9. Thread Safety and Swift 6 Patterns

### 9.1 VideoToolbox Thread Safety Rules

| Operation | Thread Safety |
|-----------|---------------|
| `VTCompressionSessionCreate` | Must be called from a single thread |
| `VTCompressionSessionEncodeFrame` | Safe to call from any single thread (not concurrent) |
| `VTCompressionOutputCallback` | Fires on an **arbitrary thread** -- synchronize all shared state |
| `VTDecompressionSessionCreate` | Must be called from a single thread |
| `VTDecompressionSessionDecodeFrame` | Safe to call from any single thread (not concurrent) |
| `VTDecompressionOutputCallback` | Fires on an **arbitrary thread** -- synchronize all shared state |
| `VTSessionSetProperty` | Safe to call between frames (not during encode/decode) |
| `CVPixelBufferLockBaseAddress` | **Not thread-safe** -- lock/unlock from the same thread |
| `CMSampleBuffer` creation | Thread-safe (creates new objects) |
| `CIContext.createCGImage` | Thread-safe (CIContext is thread-safe) |

### 9.2 Swift 6 Strict Concurrency Patterns

#### Pattern 1: @unchecked Sendable Wrapper

```swift
final class SendablePixelBuffer: @unchecked Sendable {
    let buffer: CVPixelBuffer

    init(_ buffer: CVPixelBuffer) {
        CVPixelBufferRetain(buffer)
        self.buffer = buffer
    }

    deinit {
        CVPixelBufferRelease(buffer)
    }
}
```

#### Pattern 2: Actor-Based Encoder/Decoder

```swift
actor VideoEncoder {
    private let queue = DispatchSerialQueue(label: "com.myapp.encoder")
    nonisolated var unownedExecutor: UnownedSerialExecutor {
        queue.asUnownedSerialExecutor()
    }

    private var session: VTCompressionSession?

    func encode(_ pixelBuffer: CVPixelBuffer, timestamp: CMTime) throws -> Data {
        guard let session else { throw EncoderError.noSession }
        // All VideoToolbox calls happen on the actor's serial executor
        var infoFlags = VTEncodeInfoFlags()
        let status = VTCompressionSessionEncodeFrame(
            session, imageBuffer: pixelBuffer,
            presentationTimeStamp: timestamp, duration: .invalid,
            frameProperties: nil, sourceFrameRefCon: nil, infoFlagsOut: &infoFlags
        )
        guard status == noErr else { throw EncoderError.encodeFailed(status) }
        // ... collect encoded data ...
    }
}
```

#### Pattern 3: `sending` Parameter for Buffer Transfer

```swift
func processFrame(buffer: sending CVPixelBuffer) async {
    // Buffer is now exclusively owned by this function
    let ciImage = CIImage(cvPixelBuffer: buffer)
    // ... process ...
}
```

### 9.3 Callback Thread Handling

```swift
let outputCallback: VTDecompressionOutputCallback = {
    refCon, _, status, infoFlags, imageBuffer, pts, duration in

    guard status == noErr, let imageBuffer else { return }

    // @MainActor Task (preferred for Swift 6)
    Task { @MainActor in
        let service = Unmanaged<VideoDecoderService>.fromOpaque(refCon!).takeUnretainedValue()
        // Update UI with decoded frame
    }
}
```

---

## 10. Safe Memory Patterns

### 10.1 Replacing Force-Unwrapped baseAddress!

```swift
// UNSAFE -- WILL CRASH IF BUFFER IS EMPTY OR INVALID
let pointer = bytes.baseAddress!

// Safe Alternative 1: Guard with Optional Binding
data.withUnsafeBytes { rawBuffer in
    guard let baseAddress = rawBuffer.baseAddress else { return }
    // Use baseAddress safely
}

// Safe Alternative 2: Copy to Array First (safest)
let bytes = [UInt8](data)
bytes.withUnsafeBufferPointer { bufferPtr in
    guard let ptr = bufferPtr.baseAddress else { return }
    // Use ptr...
}
```

### 10.2 Replacing unsafeBitCast

```swift
// UNSAFE
let dict = unsafeBitCast(cfValue, to: CFDictionary.self)

// SAFE: Use as? conditional cast
if let dict = cfValue as? [CFString: Any] {
    // Use dict
}
```

### 10.3 Safe CMBlockBuffer Creation from Data

```swift
func createBlockBuffer(from data: Data) -> CMBlockBuffer? {
    var blockBuffer: CMBlockBuffer?

    // Let CMBlockBuffer allocate and then copy data in
    var status = CMBlockBufferCreateWithMemoryBlock(
        allocator: kCFAllocatorDefault,
        memoryBlock: nil,             // nil = allocate for us
        blockLength: data.count,
        blockAllocator: nil,
        customBlockSource: nil,
        offsetToData: 0,
        dataLength: data.count,
        flags: 0,
        blockBufferOut: &blockBuffer
    )

    guard status == noErr, let buffer = blockBuffer else { return nil }

    status = data.withUnsafeBytes { rawBuffer -> OSStatus in
        guard let src = rawBuffer.baseAddress else { return -1 }
        return CMBlockBufferReplaceDataBytes(
            with: src,
            blockBuffer: buffer,
            offsetIntoDestination: 0,
            dataLength: data.count
        )
    }

    return status == noErr ? buffer : nil
}
```

### 10.4 Safe Pixel Buffer Access Pattern

```swift
func readPixel(from pixelBuffer: CVPixelBuffer, x: Int, y: Int) -> (UInt8, UInt8, UInt8, UInt8)? {
    CVPixelBufferLockBaseAddress(pixelBuffer, .readOnly)
    defer { CVPixelBufferUnlockBaseAddress(pixelBuffer, .readOnly) }

    guard let baseAddress = CVPixelBufferGetBaseAddress(pixelBuffer) else { return nil }
    let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)
    let width = CVPixelBufferGetWidth(pixelBuffer)
    let height = CVPixelBufferGetHeight(pixelBuffer)

    // Bounds check
    guard x >= 0, x < width, y >= 0, y < height else { return nil }

    let offset = y * bytesPerRow + x * 4
    guard offset + 3 < CVPixelBufferGetDataSize(pixelBuffer) else { return nil }

    let pixel = baseAddress.advanced(by: offset).assumingMemoryBound(to: UInt8.self)
    return (pixel[0], pixel[1], pixel[2], pixel[3])  // B, G, R, A for BGRA format
}
```

---

## 11. Error Handling

### 11.1 VideoToolbox Error Codes

All VideoToolbox functions return `OSStatus`. `noErr` (0) indicates success.

| Code | Constant | Description |
|------|----------|-------------|
| -12900 | `kVTPropertyNotSupportedErr` | The property is not supported by the session |
| -12901 | `kVTPropertyReadOnlyErr` | Attempted to set a read-only property |
| -12902 | `kVTParameterErr` | Invalid parameter passed to function |
| -12903 | `kVTInvalidSessionErr` | Session has been invalidated or is nil |
| -12904 | `kVTAllocationFailedErr` | Memory allocation failed (system under pressure) |
| -12905 | `kVTPixelTransferNotSupportedErr` | Pixel format conversion not supported |
| -12906 | `kVTCouldNotFindVideoDecoderErr` | No decoder available for the codec |
| -12907 | `kVTCouldNotCreateInstanceErr` | Could not instantiate the codec |
| -12908 | `kVTCouldNotFindVideoEncoderErr` | No encoder available for the codec |
| -12909 | `kVTVideoDecoderBadDataErr` | Decoder received malformed data |
| -12910 | `kVTVideoDecoderUnsupportedDataFormatErr` | Data format not supported by decoder |
| -12911 | `kVTVideoDecoderMalfunctionErr` | Decoder internal error |
| -12912 | `kVTVideoEncoderMalfunctionErr` | Encoder internal error |
| -12913 | `kVTVideoDecoderNotAvailableNowErr` | Decoder temporarily unavailable (app backgrounded) |
| -12915 | `kVTVideoEncoderNotAvailableNowErr` | Encoder temporarily unavailable (thermal throttling, background) |
| -12916 | `kVTFormatDescriptionChangeNotSupportedErr` | Cannot change format mid-session |

### 11.2 Error Handling Helper

```swift
func describeVTError(_ status: OSStatus) -> String {
    switch status {
    case noErr: return "Success"
    case -12900: return "Property not supported"
    case -12901: return "Property is read-only"
    case -12902: return "Invalid parameter"
    case -12903: return "Invalid/expired session"
    case -12904: return "Allocation failed (memory pressure)"
    case -12906: return "No video decoder found"
    case -12908: return "No video encoder found"
    case -12909: return "Bad data (malformed NAL units)"
    case -12911: return "Video decoder malfunction"
    case -12912: return "Video encoder malfunction"
    case -12913: return "Decoder not available (backgrounded?)"
    case -12915: return "Encoder not available (thermal throttle?)"
    case -12916: return "Format description change not supported"
    default: return "Unknown error \(status)"
    }
}
```

### 11.3 Common Failure Scenarios and Recovery

| Scenario | Error | Recovery |
|----------|-------|----------|
| App moves to background | `-12913` / `-12915` | Invalidate sessions; recreate on foreground |
| Thermal throttling | `-12915` or frame drops | Reduce quality/resolution/framerate |
| Format change (resolution) | `-12916` | Invalidate session; create new with new format description |
| Bad NAL data | `-12909` | Log and skip frame; wait for next keyframe |
| Memory pressure | `-12904` | Release unused buffers; reduce buffer pool size |
| Session invalidated | `-12903` | Check if session was invalidated; recreate |
| SPS/PPS mismatch | Garbled output | Request new keyframe from encoder |

---

## 12. Performance and Thermal Management

### 12.1 Hardware Acceleration

- **iOS:** Hardware encoding/decoding is **always used**. There is no software fallback.
- **Battery impact:** Hardware codec uses ~2.5x less power than equivalent software decoding.
- **Zero-copy pipeline:** Use `kCVPixelBufferIOSurfacePropertiesKey` for IOSurface-backed buffers.

### 12.2 Low-Latency Encoding (WWDC21 Session 10158)

For real-time streaming:

```swift
VTSessionSetProperty(session, key: kVTCompressionPropertyKey_RealTime, value: kCFBooleanTrue)
VTSessionSetProperty(session, key: kVTCompressionPropertyKey_AllowFrameReordering,
                     value: kCFBooleanFalse)
VTSessionSetProperty(session, key: kVTCompressionPropertyKey_MaxFrameDelayCount,
                     value: 0 as CFNumber)
```

Benefits:
- Eliminates frame reordering delay (no B-frames)
- One-in-one-out encoding pattern
- Faster rate control adaptation
- Can reduce end-to-end latency by up to 100ms for 720p@30fps

### 12.3 Adaptive Frame Dropping

```swift
class AdaptiveFrameScheduler {
    private var lastEncodeTime: CFAbsoluteTime = 0
    private var targetInterval: CFAbsoluteTime = 1.0 / 30.0
    private var consecutiveDrops: Int = 0

    func shouldEncodeFrame() -> Bool {
        let now = CFAbsoluteTimeGetCurrent()
        let elapsed = now - lastEncodeTime
        if elapsed < targetInterval * 0.8 {
            consecutiveDrops += 1
            return false
        }
        if consecutiveDrops > 10 {
            targetInterval = min(targetInterval * 1.5, 1.0 / 10.0)
            consecutiveDrops = 0
        }
        lastEncodeTime = now
        consecutiveDrops = 0
        return true
    }

    func adaptToThermalState(_ state: ProcessInfo.ThermalState) {
        switch state {
        case .nominal:    targetInterval = 1.0 / 30.0
        case .fair:       targetInterval = 1.0 / 24.0
        case .serious:    targetInterval = 1.0 / 15.0
        case .critical:   targetInterval = 1.0 / 10.0
        @unknown default: targetInterval = 1.0 / 15.0
        }
    }
}
```

### 12.4 Performance Best Practices

1. **Reuse CIContext** -- Creating CIContext is expensive. Create once and reuse.
2. **Use NV12 output format** -- Native hardware decoder format. Avoids pixel conversion.
3. **Don't block the callback** -- Copy what you need and return immediately.
4. **Use the session's pixel buffer pool** -- `VTCompressionSessionGetPixelBufferPool()` returns optimally configured buffers.
5. **Don't recreate sessions unnecessarily** -- Use `VTDecompressionSessionCanAcceptFormatDescription()` to check if format changes are compatible.
6. **Monitor thermal state** -- Use `ProcessInfo.processInfo.thermalState` and reduce quality proactively.
7. **Prefer IOSurface-backed buffers** -- Set `kCVPixelBufferIOSurfacePropertiesKey` for zero-copy GPU rendering.

---

## 13. Complete Encoding Pipeline

A complete H.264 encoder for real-time streaming over a peer-to-peer network:

```swift
import VideoToolbox
import CoreMedia
import OSLog

private let logger = Logger(subsystem: "com.myvideoapp", category: "VideoEncoder")

/// Encodes CVPixelBuffer frames to H.264 NAL units for network transmission.
/// Thread-safe: all encoding happens on a dedicated serial queue.
final class H264Encoder: @unchecked Sendable {

    struct EncodedFrame: Sendable {
        let nalUnits: [Data]      // Annex B formatted NAL units
        let isKeyframe: Bool
        let sps: Data?            // Non-nil on keyframes
        let pps: Data?            // Non-nil on keyframes
        let timestamp: CMTime
    }

    private var session: VTCompressionSession?
    private let queue = DispatchQueue(label: "com.myvideoapp.h264encoder", qos: .userInitiated)
    private let lock = NSLock()

    var onEncodedFrame: ((EncodedFrame) -> Void)?

    private let width: Int32
    private let height: Int32
    private let bitrate: Int
    private let maxFrameRate: Int

    init(width: Int, height: Int, bitrate: Int = 1_500_000, maxFrameRate: Int = 30) {
        self.width = Int32(width)
        self.height = Int32(height)
        self.bitrate = bitrate
        self.maxFrameRate = maxFrameRate
    }

    deinit {
        invalidate()
    }

    func start() -> Bool {
        lock.lock()
        defer { lock.unlock() }

        let callback: VTCompressionOutputCallback = { refCon, sourceRefCon, status, flags, sampleBuffer in
            guard let refCon else { return }
            let encoder = Unmanaged<H264Encoder>.fromOpaque(refCon).takeUnretainedValue()
            encoder.handleEncodedOutput(status: status, flags: flags, sampleBuffer: sampleBuffer)
        }

        var newSession: VTCompressionSession?
        let status = VTCompressionSessionCreate(
            allocator: kCFAllocatorDefault,
            width: width, height: height,
            codecType: kCMVideoCodecType_H264,
            encoderSpecification: nil,
            imageBufferAttributes: nil,
            compressedDataAllocator: nil,
            outputCallback: callback,
            refcon: Unmanaged.passUnretained(self).toOpaque(),
            compressionSessionOut: &newSession
        )

        guard status == noErr, let session = newSession else {
            logger.error("Failed to create compression session: \(describeVTError(status))")
            return false
        }

        VTSessionSetProperty(session, key: kVTCompressionPropertyKey_RealTime, value: kCFBooleanTrue)
        VTSessionSetProperty(session, key: kVTCompressionPropertyKey_ProfileLevel,
                             value: kVTProfileLevel_H264_Baseline_AutoLevel)
        VTSessionSetProperty(session, key: kVTCompressionPropertyKey_AllowFrameReordering,
                             value: kCFBooleanFalse)
        VTSessionSetProperty(session, key: kVTCompressionPropertyKey_AverageBitRate,
                             value: bitrate as CFNumber)
        VTSessionSetProperty(session, key: kVTCompressionPropertyKey_ExpectedFrameRate,
                             value: maxFrameRate as CFNumber)
        VTSessionSetProperty(session, key: kVTCompressionPropertyKey_MaxKeyFrameIntervalDuration,
                             value: 2.0 as CFNumber)
        VTSessionSetProperty(session, key: kVTCompressionPropertyKey_MaxFrameDelayCount,
                             value: 0 as CFNumber)

        VTCompressionSessionPrepareToEncodeFrames(session)
        self.session = session
        return true
    }

    func encode(_ pixelBuffer: CVPixelBuffer, timestamp: CMTime) {
        lock.lock()
        let session = self.session
        lock.unlock()
        guard let session else { return }

        var flags = VTEncodeInfoFlags()
        let status = VTCompressionSessionEncodeFrame(
            session, imageBuffer: pixelBuffer,
            presentationTimeStamp: timestamp, duration: .invalid,
            frameProperties: nil, sourceFrameRefCon: nil, infoFlagsOut: &flags
        )
        if status != noErr {
            logger.error("Encode failed: \(describeVTError(status))")
        }
    }

    func invalidate() {
        lock.lock()
        if let session {
            VTCompressionSessionCompleteFrames(session, untilPresentationTimeStamp: .invalid)
            VTCompressionSessionInvalidate(session)
            self.session = nil
        }
        lock.unlock()
    }

    private func handleEncodedOutput(status: OSStatus, flags: VTEncodeInfoFlags,
                                     sampleBuffer: CMSampleBuffer?) {
        guard status == noErr, let sampleBuffer, CMSampleBufferDataIsReady(sampleBuffer) else { return }

        let pts = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
        let isKeyframe: Bool = {
            guard let attachments = CMSampleBufferGetSampleAttachmentsArray(
                sampleBuffer, createIfNecessary: false
            ) as? [NSDictionary], let first = attachments.first else { return true }
            return !(first[kCMSampleAttachmentKey_NotSync] as? Bool ?? false)
        }()

        var sps: Data?
        var pps: Data?
        if isKeyframe {
            (sps, pps) = extractParameterSets(from: sampleBuffer) ?? (nil, nil)
        }

        let nalUnits = extractNALUnitsAsAnnexB(from: sampleBuffer)
        let frame = EncodedFrame(nalUnits: nalUnits, isKeyframe: isKeyframe,
                                 sps: sps, pps: pps, timestamp: pts)
        onEncodedFrame?(frame)
    }

    // ... extractParameterSets and extractNALUnitsAsAnnexB from Sections 2.5 and 2.6
}
```

---

## 14. Complete Decoding Pipeline

A complete H.264 decoder that receives NAL units from the network and produces CGImages:

```swift
import VideoToolbox
import CoreMedia
import CoreImage
import OSLog

private let logger = Logger(subsystem: "com.myvideoapp", category: "VideoDecoder")

/// Decodes H.264 NAL units from the network into displayable frames.
/// SAFE: No force-unwrapping, all pointer access is bounds-checked.
final class SafeH264Decoder: @unchecked Sendable {

    enum DecoderError: Error {
        case noFormatDescription
        case sessionCreationFailed(OSStatus)
        case decodeFailed(OSStatus)
        case noPixelBuffer
    }

    private var session: VTDecompressionSession?
    private var formatDescription: CMVideoFormatDescription?
    private var spsData: Data?
    private var ppsData: Data?
    private let lock = NSLock()
    private let ciContext = CIContext(options: [.useSoftwareRenderer: false])

    var onFrameDecoded: (@Sendable (CGImage) -> Void)?

    deinit { invalidate() }

    /// Processes incoming H.264 data (Annex B format with start codes).
    func processData(_ data: Data) -> CGImage? {
        let nalUnits = parseAnnexBNALUnits(from: data)
        for unit in nalUnits {
            if unit.isSPS { updateSPS(unit.data) }
            else if unit.isPPS { updatePPS(unit.data) }
        }

        let frameUnits = nalUnits.filter { $0.type == 1 || $0.type == 5 }
        guard !frameUnits.isEmpty else { return nil }

        var avccData = Data()
        for unit in frameUnits {
            var length = UInt32(unit.data.count).bigEndian
            avccData.append(Data(bytes: &length, count: 4))
            avccData.append(unit.data)
        }

        return decodeAVCCData(avccData, isKeyframe: frameUnits.contains { $0.isKeyframe })
    }

    // ... private helpers: updateSPS, updatePPS, rebuildFormatDescription,
    //     ensureSession, decodeAVCCData, createBlockBuffer, invalidate
    // See essentials/videotoolbox.md for the safe patterns used in each helper
}
```

---

## 15. Common Integration Issues

### 15.1 Unsafe Memory Patterns (MUST FIX)

#### Issue 1: Force-Unwrapped baseAddress in CMBlockBuffer Creation

```swift
// UNSAFE:
memoryBlock: UnsafeMutableRawPointer(mutating: bytes.baseAddress!),
```

**Problem:** `baseAddress` is nil if `Data` is empty. Force-unwrap crashes. Additionally, the pointer from `withUnsafeBytes` is only valid within the closure, but `CMBlockBufferCreateWithMemoryBlock` with `kCFAllocatorNull` means the CMBlockBuffer does NOT own the memory -- use-after-free risk.

**Fix:** Use the copy-based pattern from Section 10.3.

#### Issue 2: Escaped Pointers from withUnsafeBytes

```swift
// UNSAFE -- UNDEFINED BEHAVIOR:
let parameterSets: [UnsafePointer<UInt8>] = [
    sps.withUnsafeBytes { ptr in ptr.bindMemory(to: UInt8.self).baseAddress! },
    pps.withUnsafeBytes { ptr in ptr.bindMemory(to: UInt8.self).baseAddress! }
]
```

**Problem:** `withUnsafeBytes` provides a pointer valid ONLY within the closure body. Storing it in an array and using it after the closure returns is **undefined behavior**.

**Fix:** Use the nested `withUnsafeBytes` pattern from Section 5.1.

### 15.2 Missing Format Description in CMSampleBuffer

```swift
// WRONG: Creates sample buffer WITHOUT format description
formatDescription: nil,  // VideoToolbox will reject this
```

**Problem:** `VTDecompressionSessionDecodeFrame` requires the CMSampleBuffer to have a format description matching the session's format. Passing nil may cause `-12909` (bad data) errors.

**Fix:** Always provide the format description from SPS/PPS.

### 15.3 Mixed Annex B / AVCC Confusion

The encoder outputs AVCC format. When sending over the network, you convert to Annex B. On the receiving end, you must convert back to AVCC before feeding to VideoToolbox decoder. Mixing these formats causes garbled output or decode errors.

---

## References

**Apple Documentation:**
- [VideoToolbox Framework](https://developer.apple.com/documentation/videotoolbox)
- [VTCompressionSession](https://developer.apple.com/documentation/videotoolbox/vtcompressionsession)
- [VTDecompressionSession](https://developer.apple.com/documentation/videotoolbox/vtdecompressionsession)
- [CMSampleBuffer](https://developer.apple.com/documentation/coremedia/cmsamplebuffer)
- [CVPixelBuffer](https://developer.apple.com/documentation/corevideo/cvpixelbuffer-q2e)
- [Compression Properties](https://developer.apple.com/documentation/videotoolbox/compression-properties)
- [Error Code Constants](https://developer.apple.com/documentation/videotoolbox/1490398-error-code-constants)
- [Encoding Video for Low-Latency Conferencing](https://developer.apple.com/documentation/VideoToolbox/encoding-video-for-low-latency-conferencing)

**WWDC Sessions:**
- [WWDC14 Session 513: Direct Access to Video Encoding and Decoding](https://developer.apple.com/videos/play/wwdc2014/513/)
- [WWDC20 Session 10090: Decode ProRes with AVFoundation and VideoToolbox](https://developer.apple.com/videos/play/wwdc2020/10090/)
- [WWDC21 Session 10158: Explore Low-Latency Video Encoding with VideoToolbox](https://developer.apple.com/videos/play/wwdc2021/10158/)

**SDK Headers:**
- [VTCompressionSession.h](https://github.com/mstg/iOS-full-sdk/blob/master/iPhoneOS9.3.sdk/System/Library/Frameworks/VideoToolbox.framework/Headers/VTCompressionSession.h)
- [VTCompressionProperties.h](https://github.com/theos/sdks/blob/master/iPhoneOS9.3.sdk/System/Library/Frameworks/VideoToolbox.framework/Headers/VTCompressionProperties.h)
- [VTDecompressionSession.h](https://github.com/xybp888/iOS-SDKs/blob/master/iPhoneOS13.0.sdk/System/Library/Frameworks/VideoToolbox.framework/Headers/VTDecompressionSession.h)

**Community Resources:**
- [objc.io: Video Toolbox and Hardware Acceleration](https://www.objc.io/issues/23-video/videotoolbox/)
- [DEV.to: Working with VideoToolbox (Part 1)](https://dev.to/video/working-with-videotoolbox-for-more-control-over-video-encoding-and-decoding-6n1)
- [DEV.to: Working with VideoToolbox (Part 2)](https://dev.to/video/working-with-videotoolbox-for-more-control-over-video-encoding-and-decoding-part-2-1b5k)
