# VideoToolbox — iOS 26 Essentials

> For deep reference: load `reference/videotoolbox-reference.md`

---

## Correct Patterns (vs Common Mistakes)

| Concept | CORRECT | WRONG (Common Mistake) |
|---------|---------|------------------------|
| Import set | `import VideoToolbox`, `import CoreMedia`, `import CoreVideo` | Only importing `VideoToolbox` |
| iOS hardware accel | Always on — no opt-in needed | Setting `kVTVideoEncoderSpecification_RequireHardwareAcceleratedVideoEncoder` on iOS |
| Encoder output format | **AVCC** (4-byte length prefix) | Annex B start codes |
| Decoder input format | **AVCC** (length-prefixed CMSampleBuffer) | Annex B start codes |
| Preferred pixel format | `kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange` (NV12) | `kCVPixelFormatType_32BGRA` (forces conversion) |
| Callback thread | Fires on **arbitrary thread** — synchronize all shared state | Assuming main thread |
| CVPixelBuffer access | Lock before access, unlock after | Direct `baseAddress` without lock |
| SPS/PPS pointers | Nest `withUnsafeBytes` so both valid simultaneously | Store pointers in array outside closure |
| Real-time streaming | `AllowFrameReordering = false`, `MaxFrameDelayCount = 0` | Default settings (adds latency) |
| Session cleanup | `CompleteFrames` then `Invalidate` then release | Just setting session to nil |
| Format changes | Check `CanAcceptFormatDescription`, recreate if false | Reusing session after resolution change |

---

## Crash Prevention Patterns

### 1. NEVER Force-Unwrap baseAddress

```swift
// WRONG — crashes if Data is empty or buffer is invalid
let pointer = bytes.baseAddress!
memoryBlock: UnsafeMutableRawPointer(mutating: bytes.baseAddress!),

// RIGHT — guard with optional binding
data.withUnsafeBytes { rawBuffer in
    guard let baseAddress = rawBuffer.baseAddress else { return }
    // Use baseAddress safely within this scope
}
```

### 2. NEVER Escape Pointers from withUnsafeBytes

```swift
// WRONG — undefined behavior, pointers invalid outside closure
let parameterSets: [UnsafePointer<UInt8>] = [
    sps.withUnsafeBytes { $0.bindMemory(to: UInt8.self).baseAddress! },
    pps.withUnsafeBytes { $0.bindMemory(to: UInt8.self).baseAddress! }
]

// RIGHT — nest closures so both pointers are valid simultaneously
let status = sps.withUnsafeBytes { spsBuffer -> OSStatus in
    pps.withUnsafeBytes { ppsBuffer -> OSStatus in
        guard let spsBase = spsBuffer.baseAddress?.assumingMemoryBound(to: UInt8.self),
              let ppsBase = ppsBuffer.baseAddress?.assumingMemoryBound(to: UInt8.self) else {
            return kVTParameterErr
        }
        let pointers: [UnsafePointer<UInt8>] = [spsBase, ppsBase]
        let sizes: [Int] = [sps.count, pps.count]
        return CMVideoFormatDescriptionCreateFromH264ParameterSets(
            allocator: kCFAllocatorDefault,
            parameterSetCount: 2,
            parameterSetPointers: pointers,
            parameterSetSizes: sizes,
            nalUnitHeaderLength: 4,
            formatDescriptionOut: &formatDescription
        )
    }
}
```

### 3. Safe CMBlockBuffer Creation (Copy-Based)

```swift
// WRONG — zero-copy with kCFAllocatorNull leaves dangling pointer
data.withUnsafeBytes { rawBuffer in
    CMBlockBufferCreateWithMemoryBlock(
        allocator: kCFAllocatorDefault,
        memoryBlock: UnsafeMutableRawPointer(mutating: rawBuffer.baseAddress!),
        blockLength: data.count,
        blockAllocator: kCFAllocatorNull,  // DANGER: no ownership
        ...
    )
}

// RIGHT — let CMBlockBuffer allocate, then copy data in
func createBlockBuffer(from data: Data) -> CMBlockBuffer? {
    var blockBuffer: CMBlockBuffer?
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

### 4. CVPixelBuffer Lock/Unlock Pattern

```swift
// WRONG — no lock, or missing unlock on error path
let base = CVPixelBufferGetBaseAddress(pixelBuffer)!

// RIGHT — lock, defer unlock, guard baseAddress
func withLockedPixelBuffer<T>(
    _ pixelBuffer: CVPixelBuffer,
    readOnly: Bool = true,
    body: (UnsafeRawPointer, Int, Int, Int) throws -> T
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

### 5. Session Lifecycle

```swift
// WRONG — just nil-ing the session
self.session = nil

// RIGHT — flush, invalidate, then release
VTCompressionSessionCompleteFrames(session, untilPresentationTimeStamp: .invalid)
VTCompressionSessionInvalidate(session)
self.session = nil  // ARC releases after invalidation
```

### 6. CMSampleBuffer MUST Have FormatDescription for Decoding

```swift
// WRONG — nil format description causes -12909 (bad data)
CMSampleBufferCreateReady(
    ...,
    formatDescription: nil,  // VideoToolbox will reject this
    ...
)

// RIGHT — always provide the format description from SPS/PPS
CMSampleBufferCreateReady(
    ...,
    formatDescription: formatDescription,  // From createFormatDescription(sps:pps:)
    ...
)
```

---

## Known Gotchas

### NAL Format Confusion
- **Encoder outputs AVCC** (4-byte big-endian length prefix)
- **Decoder expects AVCC** (length-prefixed CMSampleBuffer)
- **Network streaming uses Annex B** (start codes: `00 00 00 01`)
- You must convert between formats at the network boundary

### SPS/PPS Must Be Sent Before IDR Frames
- The decoder cannot decode anything without SPS and PPS parameter sets
- Extract from encoder keyframe output via `CMVideoFormatDescriptionGetH264ParameterSetAtIndex`
- Send to decoder side before any video frames

### Keyframe Detection
```swift
let isKeyframe: Bool = {
    guard let attachments = CMSampleBufferGetSampleAttachmentsArray(
        sampleBuffer, createIfNecessary: false
    ) as? [NSDictionary], let first = attachments.first else {
        return true  // No attachments = keyframe
    }
    return !(first[kCMSampleAttachmentKey_NotSync] as? Bool ?? false)
}()
```

### Background / Thermal Errors
| Error | Meaning | Recovery |
|-------|---------|----------|
| `-12913` | Decoder unavailable (backgrounded) | Invalidate session; recreate on foreground |
| `-12915` | Encoder unavailable (thermal) | Reduce quality/framerate; recreate session |
| `-12903` | Session invalidated | Check if you called invalidate; recreate |
| `-12909` | Bad data (malformed NAL) | Skip frame; wait for next keyframe |
| `-12916` | Format change mid-session | Invalidate and recreate with new format description |

### Swift 6 Strict Concurrency
- `CVPixelBuffer`, `CMSampleBuffer`, `VTCompressionSession`, `VTDecompressionSession` are all **non-Sendable**
- Use `@unchecked Sendable` wrapper or actor isolation
- Callbacks fire on arbitrary threads; bridge to `@MainActor` with `Task { @MainActor in ... }`
- Prefer actor-based encoder/decoder for new code over `nonisolated(unsafe)` + `NSLock`

### Performance Rules
1. **Reuse CIContext** — creating one is expensive
2. **Use NV12 output** — native hardware format, avoids conversion
3. **Use session's pixel buffer pool** — `VTCompressionSessionGetPixelBufferPool()` returns optimized buffers
4. **Don't block callbacks** — copy what you need and return immediately
5. **Use IOSurface-backed buffers** — set `kCVPixelBufferIOSurfacePropertiesKey` for zero-copy GPU rendering
6. **Monitor `ProcessInfo.processInfo.thermalState`** — reduce quality proactively

---

## Quick Checklist

### Encoding Setup
- [ ] Create `VTCompressionSession` with correct width/height/codec
- [ ] Set `kVTCompressionPropertyKey_RealTime` = true for streaming
- [ ] Set `AllowFrameReordering` = false for real-time (no B-frames)
- [ ] Set `MaxFrameDelayCount` = 0 for one-in-one-out latency
- [ ] Call `VTCompressionSessionPrepareToEncodeFrames` before encoding
- [ ] Handle `VTEncodeInfoFlags.frameDropped` in output callback

### Decoding Setup
- [ ] Create `CMVideoFormatDescription` from SPS + PPS (nested `withUnsafeBytes`)
- [ ] Create `VTDecompressionSession` with format description
- [ ] Set output pixel format to NV12 for best performance
- [ ] Convert network Annex B data to AVCC before creating CMSampleBuffer
- [ ] Check `VTDecompressionSessionCanAcceptFormatDescription` on format changes

### Memory Safety
- [ ] No `baseAddress!` force-unwraps anywhere
- [ ] All `withUnsafeBytes` pointers used only within closure scope
- [ ] CMBlockBuffer created with copy pattern (not zero-copy unless lifetime guaranteed)
- [ ] CVPixelBuffer locked before access, unlocked in `defer`
- [ ] Sessions invalidated before release

### Swift 6
- [ ] Non-Sendable types wrapped or actor-isolated
- [ ] Callbacks bridge to `@MainActor` for UI updates
- [ ] `@preconcurrency import` ONLY if the compiler specifically demands it on that import

---

### References

- [VideoToolbox Framework](https://developer.apple.com/documentation/videotoolbox)
- [VTCompressionSession](https://developer.apple.com/documentation/videotoolbox/vtcompressionsession)
- [VTDecompressionSession](https://developer.apple.com/documentation/videotoolbox/vtdecompressionsession)
- [CMSampleBuffer](https://developer.apple.com/documentation/coremedia/cmsamplebuffer)
- [CVPixelBuffer](https://developer.apple.com/documentation/corevideo/cvpixelbuffer-q2e)
- [Encoding Video for Low-Latency Conferencing](https://developer.apple.com/documentation/VideoToolbox/encoding-video-for-low-latency-conferencing)
- [WWDC21 Session 10158: Explore Low-Latency Video Encoding](https://developer.apple.com/videos/play/wwdc2021/10158/)
