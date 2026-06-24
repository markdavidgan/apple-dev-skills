# Vision Framework — iOS 26 Essentials

> For deep reference: load `reference/vision-reference.md`
>
> Last verified: 2026-04-08
> Sources: Apple Developer Documentation, WWDC 2024/2025 sessions

---

## Correct API Signatures (vs Common Mistakes)

| # | Topic | WRONG | RIGHT | Why |
|---|-------|-------|-------|-----|
| 1 | `perform()` thread | `@MainActor func analyze() { try handler.perform([request]) }` | Call `perform()` on background queue/actor | `perform()` is synchronous and blocks the calling thread — freezes UI |
| 2 | Handler reuse | Reusing `VNImageRequestHandler` across frames | Create a new handler per image/frame | Handlers are single-use; they cache intermediates for one image only |
| 3 | Sequence handler isolation | Sharing `VNSequenceRequestHandler` across actors | Confine to a single actor or serial queue | Not Sendable — concurrent access corrupts internal tracking state |
| 4 | Passing observations across actors | `Task.detached { let box = observation.boundingBox }` | Extract `CGRect`/`Float`/`String` first, then pass | `VNObservation` subclasses are NSObject-based, NOT Sendable |
| 5 | Capture session pixel buffer | `storedBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)` | Deep copy or convert to `CIImage` immediately | Capture session recycles the buffer after delegate returns — dangling pointer |
| 6 | Coordinate system | Using Vision `boundingBox` directly in UIKit layout | Flip Y: `y = (1.0 - origin.y - height)` then scale | Vision origin is bottom-left; UIKit is top-left |
| 7 | iOS 18+ API mixing | Mixing `VN`-prefixed and prefix-free requests in one `perform()` | Use one API style per perform call | Old and new APIs have different handler types |
| 8 | Multiple requests efficiency | Creating separate handlers for each request on the same image | Pass all requests in one `handler.perform([req1, req2, req3])` | Single handler caches intermediate image reps across requests |
| 9 | CVPixelBuffer locking | Accessing pixel data without locking | `CVPixelBufferLockBaseAddress(buffer, .readOnly)` + `defer { Unlock }` | Unlocked access to GPU-backed memory causes EXC_BAD_ACCESS |
| 10 | Revision pinning | Assuming consistent results across OS versions | Pin `request.revision = VN...RequestRevisionN` for reproducibility | Apple updates default revisions between OS releases |

---

## Crash Prevention Patterns

### Crash 1: CVPixelBuffer Data Race (EXC_BAD_ACCESS in perform())

```swift
// WRONG — async use of capture session's buffer
func captureOutput(..., didOutput sampleBuffer: CMSampleBuffer, ...) {
    let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)!
    Task.detached {
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:])
        try handler.perform([request])  // CRASH — buffer already recycled
    }
}

// RIGHT — convert to CIImage (thread-safe) before async
func captureOutput(..., didOutput sampleBuffer: CMSampleBuffer, ...) {
    let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)!
    let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
    Task.detached {
        let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
        try handler.perform([request])  // Safe — CIImage is thread-safe
    }
}
```

### Crash 2: Main Thread Blocked by perform()

```swift
// WRONG — UI freezes for 15-200ms per frame
@MainActor func analyze() {
    try handler.perform([bodyPoseRequest])
}

// RIGHT — use dedicated actor
actor VisionProcessor {
    func detectPose(in buffer: CVPixelBuffer) throws -> [CGRect] {
        let request = VNDetectHumanBodyPoseRequest()
        let handler = VNImageRequestHandler(cvPixelBuffer: buffer, options: [:])
        try handler.perform([request])
        return (request.results as? [VNHumanBodyPoseObservation])?.map(\.boundingBox) ?? []
    }
}
```

### Crash 3: VNSequenceRequestHandler Shared Across Actors

```swift
// WRONG — corrupted tracking state
actor Actor1 { let handler = VNSequenceRequestHandler() }
actor Actor2 { func use(_ h: VNSequenceRequestHandler) { } }

// RIGHT — confine to single actor
actor ObjectTracker {
    private let sequenceHandler = VNSequenceRequestHandler()
    func track(in buffer: CVPixelBuffer) throws -> CGRect? {
        guard let obs = lastObservation else { return nil }
        let request = VNTrackObjectRequest(detectedObjectObservation: obs)
        try sequenceHandler.perform([request], on: buffer)
        lastObservation = request.results?.first as? VNDetectedObjectObservation
        return lastObservation?.boundingBox
    }
    private var lastObservation: VNDetectedObjectObservation?
}
```

### Crash 4: Memory Pressure from Unthrottled Processing

```swift
// WRONG — processing every frame at 30fps
func captureOutput(...) {
    // Heavy Vision analysis on every single frame
}

// RIGHT — frame gate actor
actor VisionGate {
    private var isProcessing = false
    func shouldProcess() -> Bool {
        guard !isProcessing else { return false }
        isProcessing = true
        return true
    }
    func doneProcessing() { isProcessing = false }
}
```

### Crash 5: Completion Handler Retain Cycles

```swift
// WRONG — retains self forever
let request = VNDetectFaceRectanglesRequest { request, error in
    self.updateFaces(request.results)  // Strong capture
}

// RIGHT
let request = VNDetectFaceRectanglesRequest { [weak self] request, error in
    guard let self else { return }
    self.updateFaces(request.results)
}
```

### Crash 6: Simulator-Only Vision Failures

```swift
// Some Vision requests fail with "Unspecified error" (Code=9) in Simulator
#if targetEnvironment(simulator)
    // Use mock data or skip Vision analysis
#else
    try handler.perform([request])
#endif
```

---

## Known Gotchas

- **Coordinate system is bottom-left origin** (0,0 at bottom-left), NOT UIKit's top-left. Every bounding box needs Y-flip conversion.
- **`perform()` is synchronous.** It blocks until ALL requests complete. The iOS 18+ async API (`request.perform(on:)`) wraps this properly.
- **`VNRequest`, `VNImageRequestHandler`, `VNSequenceRequestHandler`, and `VNObservation` are all NOT Sendable.** Extract primitive/Sendable data before crossing actor boundaries.
- **Camera orientation matters.** Rear camera typically needs `.right`, front camera `.leftMirrored`. Wrong orientation = wrong detection coordinates.
- **Feature print distances changed between revisions.** Rev 1 (iOS 13-16): 2048 elements, distance 0-40. Rev 2 (iOS 17+): 768 elements, distance 0-2. Pin revision for consistent comparisons.
- **`preferBackgroundProcessing = true`** reduces thermal impact for non-real-time analysis but does NOT move execution off the calling thread.
- **`usesCPUOnly` is deprecated** since iOS 17. Let the system choose the execution path.
- **Person segmentation request is stateful.** Reuse the same instance across frames for temporal consistency.
- **`VNSequenceRequestHandler` does NOT cache images** between perform() calls, unlike `VNImageRequestHandler` which caches intermediates.
- **iOS 26 adds `RecognizeDocumentsRequest`** with table/list/paragraph structure detection and 26-language support.
- **1,303 classification categories** in `VNClassifyImageRequest`. Use `hasMinimumPrecision(_:forRecall:)` for smart filtering instead of raw confidence thresholds.
- **Body pose detects 19 joints** (head 5, torso 3, shoulders 2, arms 4, hips 2, legs 4). Confidence per joint — always check `> 0.5` before using coordinates.

---

## Quick Checklist

- [ ] **Never call `perform()` on MainActor.** Use a dedicated Vision actor or background queue.
- [ ] **Deep copy or convert CVPixelBuffer to CIImage** before async processing from camera callbacks.
- [ ] **Extract Sendable data** (`CGRect`, `Float`, `String`) from observations before crossing actor boundaries.
- [ ] **Batch multiple requests** in a single `handler.perform([...])` call for efficiency.
- [ ] **Implement frame skipping** for live camera feeds — body pose at 10fps, classification at 1-2fps.
- [ ] **Flip Y coordinates** when converting Vision results to UIKit/SwiftUI layout.
- [ ] **Confine `VNSequenceRequestHandler`** to a single actor or serial queue.
- [ ] **Test on real device** — simulator may fail with certain Vision requests.

---

## Request Performance Guide

| Request | Typical Time | Recommended FPS |
|---------|-------------|-----------------|
| `VNDetectFaceRectanglesRequest` | ~5ms | 30fps (every frame) |
| `VNGenerateImageFeaturePrintRequest` | ~1.5ms/MP | 30fps (very fast) |
| `VNGeneratePersonSegmentationRequest (.fast)` | ~10ms | 30fps |
| `VNDetectHumanBodyPoseRequest` | ~15-30ms | 10fps |
| `VNHomographicImageRegistrationRequest` | ~30-50ms | 5-10fps |
| `VNRecognizeTextRequest (.fast)` | ~20ms | 10fps |
| `VNClassifyImageRequest` | ~50-100ms | 1-2fps |
| `VNRecognizeTextRequest (.accurate)` | ~100-200ms | Snapshot only |

---

## Dedicated Vision Actor Pattern (Recommended)

```swift
actor VisionProcessor {
    func analyze(pixelBuffer: CVPixelBuffer) throws -> AnalysisResult {
        let faceReq = VNDetectFaceRectanglesRequest()
        let poseReq = VNDetectHumanBodyPoseRequest()
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .right, options: [:])
        try handler.perform([faceReq, poseReq])

        // Extract Sendable data inside the actor
        let faces = (faceReq.results as? [VNFaceObservation])?.map(\.boundingBox) ?? []
        let poses = (poseReq.results as? [VNHumanBodyPoseObservation])?.compactMap { obs in
            try? obs.recognizedPoint(.nose)
        }.filter { $0.confidence > 0.5 }.map(\.location) ?? []

        return AnalysisResult(faces: faces, nosePositions: poses)
    }
}

struct AnalysisResult: Sendable {
    let faces: [CGRect]
    let nosePositions: [CGPoint]
}
```

---

### References

- [Vision Framework](https://developer.apple.com/documentation/vision)
- [VNImageRequestHandler](https://developer.apple.com/documentation/vision/vnimagerequesthandler)
- [VNSequenceRequestHandler](https://developer.apple.com/documentation/vision/vnsequencerequesthandler)
- [VNDetectHumanBodyPoseRequest](https://developer.apple.com/documentation/vision/vndetecthumanbodyposerequest)
- [VNClassifyImageRequest](https://developer.apple.com/documentation/vision/vnclassifyimagerequest)
- [VNGenerateImageFeaturePrintRequest](https://developer.apple.com/documentation/vision/vngenerateimagefeatureprintrequest)
- [VNRecognizeTextRequest](https://developer.apple.com/documentation/vision/vnrecognizetextrequest)
- [VNGeneratePersonSegmentationRequest](https://developer.apple.com/documentation/vision/vngeneratepersonsegmentationrequest)
- [RecognizeDocumentsRequest (iOS 26)](https://developer.apple.com/documentation/vision/recognizedocumentsrequest)
- [Discover Swift enhancements in the Vision framework — WWDC 2024](https://developer.apple.com/videos/play/wwdc2024/10163/)
- [Read documents using the Vision framework — WWDC 2025](https://developer.apple.com/videos/play/wwdc2025/272/)
- [Detect Body and Hand Pose with Vision — WWDC 2020](https://developer.apple.com/videos/play/wwdc2020/10653/)
