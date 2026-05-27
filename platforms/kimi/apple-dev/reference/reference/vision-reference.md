# Vision Framework -- Definitive API Reference for iOS 26

> **Last updated:** 2026-04-08
> **Applies to:** iOS 11+ through iOS 26, with emphasis on the new Swift API (iOS 18+)
> **Use case:** Real-time video analysis (body pose, scene classification, feature prints, homography, OCR, face detection)
> **Critical concerns:** CVPixelBuffer data races, synchronous Vision calls blocking main thread, Swift 6 strict concurrency

---

## Table of Contents

1. [Framework Overview](#1-framework-overview)
2. [Architecture: Request-Handler-Observation Pattern](#2-architecture-request-handler-observation-pattern)
3. [VNImageRequestHandler -- Single Image Processing](#3-vnimagerequesthandler--single-image-processing)
4. [VNSequenceRequestHandler -- Stateful Multi-Frame Processing](#4-vnsequencerequesthandler--stateful-multi-frame-processing)
5. [VNRequest Base Class and Properties](#5-vnrequest-base-class-and-properties)
6. [Complete Request Type Catalog](#6-complete-request-type-catalog)
7. [VNObservation Base Class and Subclasses](#7-vnobservation-base-class-and-subclasses)
8. [Body Pose Detection -- VNDetectHumanBodyPoseRequest](#8-body-pose-detection--vndetecthumanbodyposerequest)
9. [Scene Classification -- VNClassifyImageRequest](#9-scene-classification--vnclassifyimagerequest)
10. [Feature Print Matching -- VNGenerateImageFeaturePrintRequest](#10-feature-print-matching--vngenerateimagefeatureprintrequest)
11. [Homographic Image Registration -- VNHomographicImageRegistrationRequest](#11-homographic-image-registration--vnhomographicimageregistrationrequest)
12. [Text Recognition -- VNRecognizeTextRequest](#12-text-recognition--vnrecognizetextrequest)
13. [Face Detection -- VNDetectFaceRectanglesRequest](#13-face-detection--vndetectfacerectanglesrequest)
14. [Object Tracking -- VNTrackingRequest Subclasses](#14-object-tracking--vntrackingrequest-subclasses)
15. [Person Segmentation -- VNGeneratePersonSegmentationRequest](#15-person-segmentation--vngeneratepersonsegmentationrequest)
16. [iOS 18+ Swift API (New Prefix-Free API)](#16-ios-18-swift-api-new-prefix-free-api)
17. [iOS 26 New Requests (WWDC 2025)](#17-ios-26-new-requests-wwdc-2025)
18. [CVPixelBuffer Handling and Thread Safety](#18-cvpixelbuffer-handling-and-thread-safety)
19. [Thread Safety and Actor Isolation Patterns](#19-thread-safety-and-actor-isolation-patterns)
20. [Performance Optimization and Frame Skipping](#20-performance-optimization-and-frame-skipping)
21. [VNImageOption Dictionary Keys](#21-vnimageoption-dictionary-keys)
22. [Crash Prevention Patterns](#22-crash-prevention-patterns)
23. [Complete Code Examples](#23-complete-code-examples)
24. [References](#24-references)

---

## 1. Framework Overview

The Vision framework (`import Vision`) provides high-performance image analysis and computer vision capabilities using Apple's hardware-optimized ML models. It runs on CPU, GPU, and Neural Engine depending on the request type and device capabilities.

**Key characteristics:**
- Zero external dependencies -- pure Apple framework
- Hardware-accelerated on Neural Engine (A11+ chips)
- Supports still images, video frames, and live camera feeds
- Coordinate system: normalized (0.0 to 1.0), origin at **bottom-left** (unlike UIKit's top-left)
- Thread-safe for **separate** handler instances; NOT safe to share handlers across threads
- As of iOS 18: 33+ distinct request types available

**Import:**
```swift
import Vision
```

**Minimum deployment:** iOS 11.0 (original), with many request types added in later versions.

---

## 2. Architecture: Request-Handler-Observation Pattern

Vision uses a three-role architecture:

```
Request (what to analyze) --> Handler (performs analysis) --> Observation (results)
```

### The Three Roles

| Role | Class | Purpose |
|------|-------|---------|
| **Request** | `VNRequest` subclasses | Defines WHAT analysis to perform |
| **Handler** | `VNImageRequestHandler` or `VNSequenceRequestHandler` | Performs the analysis on image data |
| **Observation** | `VNObservation` subclasses | Contains the analysis results |

### Flow (Legacy API, iOS 11-17)

```swift
// 1. Create request with completion handler
let request = VNDetectFaceRectanglesRequest { request, error in
    guard let observations = request.results as? [VNFaceObservation] else { return }
    // Process results
}

// 2. Create handler with image
let handler = VNImageRequestHandler(cgImage: image, options: [:])

// 3. Perform (synchronous, blocking call -- NEVER call on main thread)
try handler.perform([request])
```

### Flow (New API, iOS 18+)

```swift
// 1. Create request
let request = DetectFaceRectanglesRequest()

// 2. Perform with async/await -- returns observations directly
let observations = try await request.perform(on: imageURL)
```

---

## 3. VNImageRequestHandler -- Single Image Processing

**Class:** `VNImageRequestHandler` (legacy) / `ImageRequestHandler` (iOS 18+)
**Purpose:** Processes one or more requests against a **single** image. Caches intermediate image representations for efficiency when running multiple requests on the same image.

### All Initializers (Objective-C/Legacy Swift)

```swift
// CVPixelBuffer (most common for live camera)
init(cvPixelBuffer: CVPixelBuffer, options: [VNImageOption: Any])
init(cvPixelBuffer: CVPixelBuffer, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])
init(cvPixelBuffer: CVPixelBuffer, depthData: AVDepthData, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])

// CGImage
init(cgImage: CGImage, options: [VNImageOption: Any])
init(cgImage: CGImage, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])

// CIImage (thread-safe by design)
init(ciImage: CIImage, options: [VNImageOption: Any])
init(ciImage: CIImage, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])

// URL (file path to image)
init(url: URL, options: [VNImageOption: Any])
init(url: URL, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])

// Data (raw image data)
init(data: Data, options: [VNImageOption: Any])
init(data: Data, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])

// CMSampleBuffer (from AVCaptureOutput)
init(cmSampleBuffer: CMSampleBuffer, options: [VNImageOption: Any])
init(cmSampleBuffer: CMSampleBuffer, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])
init(cmSampleBuffer: CMSampleBuffer, depthData: AVDepthData, orientation: CGImagePropertyOrientation, options: [VNImageOption: Any])
```

**Total: 15 initializer overloads.**

### perform() Method

```swift
// Legacy (iOS 11+) -- SYNCHRONOUS, BLOCKING
func perform(_ requests: [VNRequest]) throws
```

**CRITICAL:** `perform()` is synchronous. It blocks the calling thread until ALL requests complete. NEVER call from the main thread.

### Usage Rules

1. **Single-use per image:** Create a new handler for each image/frame
2. **Multiple requests OK:** Pass multiple `VNRequest` objects in the array -- the handler optimizes shared intermediate representations
3. **NOT reusable:** Do not reuse a handler for different images
4. **Thread-safe across instances:** Different handler instances can run concurrently on different threads
5. **NOT thread-safe within instance:** Do not call `perform()` concurrently on the same handler from multiple threads

### Orientation Parameter

The `orientation` parameter uses `CGImagePropertyOrientation`:

| Value | Meaning |
|-------|---------|
| `.up` | Default -- image is correctly oriented |
| `.right` | 90 degrees clockwise (rear camera landscape left) |
| `.left` | 90 degrees counter-clockwise |
| `.leftMirrored` | Front camera, typical orientation |
| `.down` | Upside down |

**For camera feeds:** Use `.right` for rear camera, `.leftMirrored` for front camera (typical values -- verify with your capture session).

---

## 4. VNSequenceRequestHandler -- Stateful Multi-Frame Processing

**Class:** `VNSequenceRequestHandler`
**Purpose:** Processes requests across a **sequence** of images/frames. Maintains internal state for tracking and temporal analysis. Essential for object tracking across video frames.

### Initializer

```swift
init()  // Simple, no parameters
```

Unlike `VNImageRequestHandler`, the sequence handler is initialized once and reused across many frames.

### All perform() Method Overloads

Each overload specifies the image source inline (rather than in the initializer):

```swift
// CVPixelBuffer
func perform(_ requests: [VNRequest], on pixelBuffer: CVPixelBuffer) throws
func perform(_ requests: [VNRequest], on pixelBuffer: CVPixelBuffer, orientation: CGImagePropertyOrientation) throws

// CGImage
func perform(_ requests: [VNRequest], on image: CGImage) throws
func perform(_ requests: [VNRequest], on image: CGImage, orientation: CGImagePropertyOrientation) throws

// CIImage
func perform(_ requests: [VNRequest], on image: CIImage) throws
func perform(_ requests: [VNRequest], on image: CIImage, orientation: CGImagePropertyOrientation) throws

// URL
func perform(_ requests: [VNRequest], on imageURL: URL) throws
func perform(_ requests: [VNRequest], on imageURL: URL, orientation: CGImagePropertyOrientation) throws

// Data
func perform(_ requests: [VNRequest], on imageData: Data) throws
func perform(_ requests: [VNRequest], on imageData: Data, orientation: CGImagePropertyOrientation) throws
```

**Total: 10 perform() overloads.**

### Key Differences from VNImageRequestHandler

| Aspect | VNImageRequestHandler | VNSequenceRequestHandler |
|--------|----------------------|--------------------------|
| **Lifecycle** | One-shot per image | Reuse across many frames |
| **State** | Stateless | Maintains tracking state |
| **Image source** | In initializer | In perform() call |
| **Caching** | Caches intermediate reps | Does NOT retain images after perform() returns |
| **Use case** | Still images, single frames | Video sequences, object tracking |
| **Multiple requests** | Optimized (shared cache) | Each request processed independently |

### When to Use Which

- **VNImageRequestHandler:** Single image analysis, running multiple diverse requests on one image (e.g., body pose + scene classification on a snapshot)
- **VNSequenceRequestHandler:** Object tracking across video frames (VNTrackObjectRequest, VNTrackRectangleRequest), temporal analysis

---

## 5. VNRequest Base Class and Properties

**Class:** `VNRequest` (abstract base class)
**Subclassed by:** All specific request types

### Properties

```swift
// Completion handler (legacy pattern, iOS 11+)
var completionHandler: VNRequestCompletionHandler? { get }
typealias VNRequestCompletionHandler = (VNRequest, Error?) -> Void

// Results -- populated after perform() completes
var results: [VNObservation]? { get }

// Performance hints
var preferBackgroundProcessing: Bool { get set }
// Hint to minimize resource burden -- reduces memory/CPU/GPU contention
// Helps keep UI responsive during Vision processing
// Default: false

var usesCPUOnly: Bool { get set }  // DEPRECATED in iOS 17
// Forces CPU-only execution (no GPU/Neural Engine)
// Default: false
// Deprecated: let the system choose the best execution path

// Revision control
var revision: Int { get set }
// Set specific algorithm revision (e.g., VNDetectFaceRectanglesRequestRevision3)
// Each request type defines its own revision constants

class var currentRevision: Int { get }
class var defaultRevision: Int { get }
class var supportedRevisions: IndexSet { get }
```

### Initializers

```swift
// Legacy (with completion handler)
init(completionHandler: VNRequestCompletionHandler?)

// Simple
init()
```

### Key Behaviors

1. **Results are populated AFTER perform() completes** -- check `request.results` in the completion handler or after `try handler.perform([request])`
2. **Completion handler vs results property:** Both work. Completion handler fires when the specific request finishes; results property is populated at the same time
3. **preferBackgroundProcessing = true:** Use this for non-real-time analysis to reduce thermal impact and let UI stay responsive
4. **Revision pinning:** Pin a specific revision if you need reproducible results across OS versions

---

## 6. Complete Request Type Catalog

### Face Detection and Analysis

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNDetectFaceRectanglesRequest` | `VNFaceObservation` | iOS 11 | Detect face bounding boxes |
| `VNDetectFaceLandmarksRequest` | `VNFaceObservation` | iOS 11 | Detect facial features (eyes, nose, lips, etc.) |
| `VNDetectFaceCaptureQualityRequest` | `VNFaceObservation` | iOS 13 | Assess face photo quality (0.0-1.0) |

### Text Recognition

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNRecognizeTextRequest` | `VNRecognizedTextObservation` | iOS 13 | OCR -- printed and handwritten text |
| `VNDetectTextRectanglesRequest` | `VNTextObservation` | iOS 11 | Detect text region bounding boxes (no OCR) |

### Body and Hand Pose

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNDetectHumanBodyPoseRequest` | `VNHumanBodyPoseObservation` | iOS 14 | 2D body pose (19 joints) |
| `VNDetectHumanBodyPose3DRequest` | `VNHumanBodyPose3DObservation` | iOS 17 | 3D body pose (17 joints in 3D space) |
| `VNDetectHumanHandPoseRequest` | `VNHumanHandPoseObservation` | iOS 14 | Hand pose (21 joints per hand) |

### Object Detection and Tracking

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNDetectRectanglesRequest` | `VNRectangleObservation` | iOS 11 | Detect rectangular regions |
| `VNTrackObjectRequest` | `VNDetectedObjectObservation` | iOS 11 | Track arbitrary objects across frames |
| `VNTrackRectangleRequest` | `VNRectangleObservation` | iOS 11 | Track rectangles across frames |
| `VNCoreMLRequest` | varies | iOS 11 | Run custom Core ML models |

### Image Classification and Analysis

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNClassifyImageRequest` | `VNClassificationObservation` | iOS 13 | Scene/object classification (1303 categories) |
| `VNRecognizeAnimalsRequest` | `VNRecognizedObjectObservation` | iOS 13 | Detect cats and dogs |
| `VNGenerateImageFeaturePrintRequest` | `VNFeaturePrintObservation` | iOS 13 | Image similarity feature vectors |
| `VNCalculateImageAestheticsScoresRequest` | Aesthetics observation | iOS 18 | Image quality/aesthetic scoring |

### Image Registration

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNHomographicImageRegistrationRequest` | `VNImageHomographicAlignmentObservation` | iOS 11 | 3x3 perspective warp matrix between images |
| `VNTranslationalImageRegistrationRequest` | `VNImageTranslationAlignmentObservation` | iOS 11 | Simple 2D translation between images |

### Saliency

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNGenerateAttentionBasedSaliencyImageRequest` | `VNSaliencyImageObservation` | iOS 13 | Where humans look in the image |
| `VNGenerateObjectnessBasedSaliencyImageRequest` | `VNSaliencyImageObservation` | iOS 13 | Where objects are in the image |

### Segmentation

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNGeneratePersonSegmentationRequest` | `VNPixelBufferObservation` | iOS 15 | Person matte mask |
| `VNGeneratePersonInstanceMaskRequest` | Instance mask observation | iOS 17 | Per-person instance masks |

### Contour and Shape Detection

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNDetectContoursRequest` | `VNContoursObservation` | iOS 14 | Detect contours/edges |
| `VNDetectDocumentSegmentationRequest` | `VNRectangleObservation` | iOS 15 | Document boundary detection |

### Barcode Detection

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNDetectBarcodesRequest` | `VNBarcodeObservation` | iOS 11 | QR codes, barcodes |

### Optical Flow

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNGenerateOpticalFlowRequest` | `VNPixelBufferObservation` | iOS 14 | Motion vectors between frames |

### Horizon Detection

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNDetectHorizonRequest` | `VNHorizonObservation` | iOS 11 | Horizon angle in image |

### Animal Pose (iOS 17+)

| Request | Result Type | Since | Purpose |
|---------|------------|-------|---------|
| `VNDetectAnimalBodyPoseRequest` | `VNAnimalBodyPoseObservation` | iOS 17 | Animal body pose detection |

---

## 7. VNObservation Base Class and Subclasses

### VNObservation (Abstract Base)

```swift
class VNObservation: NSObject, NSCopying, NSSecureCoding, VNRequestRevisionProviding {
    var confidence: VNConfidence { get }  // Float, 0.0 to 1.0
    var uuid: UUID { get }                // Unique identifier for tracking
    var timeRange: CMTimeRange { get }    // For video observations
    var requestRevision: Int { get }       // Which algorithm revision produced this
}
```

### Key Subclasses

```swift
// Base for anything with a bounding box
class VNDetectedObjectObservation: VNObservation {
    var boundingBox: CGRect { get }  // Normalized coordinates, bottom-left origin
}

// Face observations
class VNFaceObservation: VNDetectedObjectObservation {
    var landmarks: VNFaceLandmarks2D? { get }
    var faceCaptureQuality: Float? { get }
    var roll: NSNumber? { get }
    var yaw: NSNumber? { get }
    var pitch: NSNumber? { get }
}

// Classification results
class VNClassificationObservation: VNObservation {
    var identifier: String { get }    // e.g., "beach", "sunset", "cat"
    var confidence: VNConfidence { get }
    
    func hasMinimumRecall(_ minimumRecall: Float, forPrecision precision: Float) -> Bool
    func hasMinimumPrecision(_ minimumPrecision: Float, forRecall recall: Float) -> Bool
}

// Text recognition results
class VNRecognizedTextObservation: VNRectangleObservation {
    func topCandidates(_ maxCandidateCount: Int) -> [VNRecognizedText]
}

class VNRecognizedText {
    var string: String { get }
    var confidence: VNConfidence { get }
    func boundingBox(for range: Range<String.Index>) throws -> VNRectangleObservation?
}

// Feature prints for image similarity
class VNFeaturePrintObservation: VNObservation {
    var elementType: VNElementType { get }  // .float or .double
    var elementCount: Int { get }
    var data: Data { get }
    func computeDistance(_ outDistance: UnsafeMutablePointer<Float>, 
                        to featurePrint: VNFeaturePrintObservation) throws
}

// Pixel buffer output (segmentation masks, optical flow)
class VNPixelBufferObservation: VNObservation {
    var pixelBuffer: CVPixelBuffer { get }
    var featureName: String? { get }  // Core ML feature name
}

// Homographic alignment result
class VNImageHomographicAlignmentObservation: VNImageAlignmentObservation {
    var warpTransform: matrix_float3x3 { get set }
}

// Saliency maps
class VNSaliencyImageObservation: VNPixelBufferObservation {
    var salientObjects: [VNRectangleObservation]? { get }
}

// Body pose
class VNHumanBodyPoseObservation: VNRecognizedPointsObservation {
    func recognizedPoint(_ jointName: JointName) throws -> VNRecognizedPoint
    func recognizedPoints(_ jointsGroupName: JointsGroupName) throws -> [JointName: VNRecognizedPoint]
    var availableJointNames: [JointName] { get }
    var availableJointsGroupNames: [JointsGroupName] { get }
}

// Barcode
class VNBarcodeObservation: VNRectangleObservation {
    var payloadStringValue: String? { get }
    var symbology: VNBarcodeSymbology { get }
}
```

### VNRecognizedPoint (used by pose detection)

```swift
class VNRecognizedPoint: VNDetectedPoint {
    var identifier: VNRecognizedPointKey { get }
    var confidence: VNConfidence { get }  // 0.0 to 1.0
    var location: CGPoint { get }         // Normalized, bottom-left origin
}
```

---

## 8. Body Pose Detection -- VNDetectHumanBodyPoseRequest

**Class:** `VNDetectHumanBodyPoseRequest`
**Result:** `[VNHumanBodyPoseObservation]`
**Since:** iOS 14
**Detects:** Up to 19 2D body joints per person

### All 19 Joint Names

```swift
enum VNHumanBodyPoseObservation.JointName {
    // Head (5 joints)
    case nose
    case leftEye
    case rightEye
    case leftEar
    case rightEar
    
    // Torso (3 joints)
    case neck           // "neck_1_joint"
    case root           // Center between hips, "root"
    
    // Shoulders (2 joints)
    case leftShoulder   // "left_shoulder_1_joint"
    case rightShoulder  // "right_shoulder_1_joint"
    
    // Arms (4 joints)
    case leftElbow
    case rightElbow
    case leftWrist
    case rightWrist
    
    // Hips (2 joints)
    case leftHip        // "left_upLeg_joint"
    case rightHip       // "right_upLeg_joint"
    
    // Legs (4 joints)
    case leftKnee
    case rightKnee
    case leftAnkle
    case rightAnkle
}
```

### Joint Group Names

```swift
enum VNHumanBodyPoseObservation.JointsGroupName {
    case face       // nose, leftEye, rightEye, leftEar, rightEar
    case torso      // neck, leftShoulder, rightShoulder, leftHip, rightHip, root
    case leftArm    // leftShoulder, leftElbow, leftWrist
    case rightArm   // rightShoulder, rightElbow, rightWrist
    case leftLeg    // leftHip, leftKnee, leftAnkle
    case rightLeg   // rightHip, rightKnee, rightAnkle
    case all        // All 19 joints
}
```

### Usage Example

```swift
let request = VNDetectHumanBodyPoseRequest()

let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .right, options: [:])
try handler.perform([request])

guard let observations = request.results as? [VNHumanBodyPoseObservation] else { return }

for observation in observations {
    // Access individual joint
    let nosePoint = try observation.recognizedPoint(.nose)
    if nosePoint.confidence > 0.5 {
        let normalizedLocation = nosePoint.location  // CGPoint, normalized 0-1
        // Convert to image coordinates:
        let imagePoint = VNImagePointForNormalizedPoint(
            normalizedLocation, 
            Int(imageWidth), 
            Int(imageHeight)
        )
    }
    
    // Access joint group
    let torsoJoints = try observation.recognizedPoints(.torso)
    for (jointName, point) in torsoJoints where point.confidence > 0.5 {
        // Process torso joints
    }
}
```

### Coordinate System

- **Origin:** Bottom-left (0,0)
- **Range:** 0.0 to 1.0 (normalized)
- **Convert to image coords:** `VNImagePointForNormalizedPoint(point, width, height)`
- **Convert to UIKit coords:** Flip Y axis: `CGPoint(x: point.x, y: 1.0 - point.y)` then scale

### iOS 18+ Enhancement

In iOS 18, `DetectHumanBodyPoseRequest` adds simultaneous hand detection:

```swift
var request = DetectHumanBodyPoseRequest()
request.detectsHands = true  // NEW in iOS 18

let bodyPose = try await request.perform(on: image).first
let bodyJoints = bodyPose?.allJoints()
let leftHandJoints = bodyPose?.leftHand?.allJoints()
let rightHandJoints = bodyPose?.rightHand?.allJoints()
```

### 3D Body Pose (iOS 17+)

```swift
let request3D = VNDetectHumanBodyPose3DRequest()
// Returns VNHumanBodyPose3DObservation with 17 joints in 3D space
// Includes bodyHeight estimate (meters)
```

---

## 9. Scene Classification -- VNClassifyImageRequest

**Class:** `VNClassifyImageRequest`
**Result:** `[VNClassificationObservation]`
**Since:** iOS 13
**Categories:** 1,303 classification identifiers (Revision 1)

### API

```swift
let request = VNClassifyImageRequest()

// Get all known classifications
let knownClassifications = try VNClassifyImageRequest.knownClassifications(
    forRevision: VNClassifyImageRequestRevision1
)
// Returns [VNClassificationObservation] with all 1303 identifiers

let handler = VNImageRequestHandler(cgImage: image, options: [:])
try handler.perform([request])

guard let results = request.results as? [VNClassificationObservation] else { return }

// Filter by confidence
let significantResults = results.filter { $0.confidence > 0.1 }
for classification in significantResults {
    print("\(classification.identifier): \(classification.confidence)")
}
```

### Filtering with Precision/Recall

```swift
// High precision: fewer false positives
let preciseResults = results.filter { 
    $0.hasMinimumPrecision(0.8, forRecall: 0.0)
}

// High recall: fewer false negatives
let comprehensiveResults = results.filter {
    $0.hasMinimumRecall(0.8, forPrecision: 0.0)
}
```

### Classification Categories (Sample)

The 1,303 identifiers span diverse categories:

**Animals:** adult_cat, dog, bird, fish, horse, butterfly, bee, spider, alligator_crocodile, bear, etc.
**Food:** apple, banana, pizza, sushi, bread, cake, coffee, beer, wine, etc.
**Environments:** beach, mountain, forest, desert, ocean, cityscape, sunset, etc.
**Activities:** running, swimming, dancing, skiing, yoga, baseball, basketball, etc.
**Objects:** car, airplane, computer, phone, chair, table, book, guitar, etc.
**Scenes:** wedding, concert, graduation, birthday, fireworks, etc.

### Revisions

| Revision | Constant | Categories |
|----------|----------|------------|
| 1 | `VNClassifyImageRequestRevision1` | 1,303 identifiers |

---

## 10. Feature Print Matching -- VNGenerateImageFeaturePrintRequest

**Class:** `VNGenerateImageFeaturePrintRequest`
**Result:** `VNFeaturePrintObservation`
**Since:** iOS 13
**Purpose:** Generate compact image fingerprints for similarity comparison

### Generating Feature Prints

```swift
func generateFeaturePrint(for image: UIImage) -> VNFeaturePrintObservation? {
    guard let cgImage = image.cgImage else { return nil }
    
    let request = VNGenerateImageFeaturePrintRequest()
    let handler = VNImageRequestHandler(
        cgImage: cgImage,
        orientation: .init(image.imageOrientation),
        options: [:]
    )
    
    do {
        try handler.perform([request])
    } catch {
        print("Feature print generation failed: \(error)")
        return nil
    }
    
    return request.results?.first as? VNFeaturePrintObservation
}
```

### Computing Distance Between Images

```swift
var distance: Float = .infinity

do {
    try featurePrint1.computeDistance(&distance, to: featurePrint2)
} catch {
    print("Distance computation failed: \(error)")
}
```

**Method signature:**
```swift
func computeDistance(_ outDistance: UnsafeMutablePointer<Float>, 
                    to featurePrint: VNFeaturePrintObservation) throws
```

### Distance Interpretation

The distance is computed as the **Euclidean distance** (via `vDSP_distancesq` + square root from Accelerate framework).

| Revision | elementCount | elementType | Distance Range | Normalization |
|----------|-------------|-------------|----------------|---------------|
| Revision 1 (iOS 13-16) | 2048 | `.float` | 0.0 to ~40.0 | Non-normalized |
| Revision 2 (iOS 17+) | 768 | `.float` | 0.0 to ~2.0 | Normalized |

**Similarity thresholds (approximate):**

| Distance (Rev 1) | Distance (Rev 2) | Interpretation |
|-------------------|-------------------|----------------|
| 0.0 | 0.0 | Identical images |
| < 10 | < 0.5 | Very similar |
| 10-20 | 0.5-1.0 | Somewhat similar |
| > 25 | > 1.2 | Different images |

### VNFeaturePrintObservation Properties

```swift
class VNFeaturePrintObservation: VNObservation {
    var elementType: VNElementType { get }  // .float or .double
    var elementCount: Int { get }           // 2048 (rev1) or 768 (rev2)
    var data: Data { get }                  // Raw feature vector bytes
    
    func computeDistance(_ outDistance: UnsafeMutablePointer<Float>,
                        to featurePrint: VNFeaturePrintObservation) throws
}
```

### Accessing Raw Vector Data

```swift
let array: [Float] = featurePrint.data.withUnsafeBytes {
    Array($0.bindMemory(to: Float.self))
}
// array.count == featurePrint.elementCount
```

### Pinning Revision for Consistency

```swift
let request = VNGenerateImageFeaturePrintRequest()
request.revision = VNGenerateImageFeaturePrintRequestRevision1  // Force 2048-element vector
```

### Performance

~1.5 milliseconds per megapixel on iPhone 12 mini (averaged over 250 runs).

---

## 11. Homographic Image Registration -- VNHomographicImageRegistrationRequest

**Class:** `VNHomographicImageRegistrationRequest`
**Result:** `VNImageHomographicAlignmentObservation`
**Since:** iOS 11
**Purpose:** Compute the 3x3 perspective warp matrix to align two images of the same scene

### How It Works

1. You provide a **reference image** (in the handler initializer) and a **floating image** (as the request target)
2. Vision computes the homography matrix that transforms the floating image to align with the reference
3. The result is a `matrix_float3x3` representing the perspective transformation

### Usage

```swift
// Reference image is the one in the handler
let handler = VNImageRequestHandler(cgImage: referenceImage, options: [:])

// The request targets the floating image
let request = VNHomographicImageRegistrationRequest(
    targetedCGImage: floatingImage,
    options: [:]
)

try handler.perform([request])

guard let result = request.results?.first as? VNImageHomographicAlignmentObservation else { return }

let warpMatrix: matrix_float3x3 = result.warpTransform
// warpMatrix.columns.0, .1, .2 give the three columns of the 3x3 matrix
```

### The warpTransform Property

```swift
class VNImageHomographicAlignmentObservation: VNImageAlignmentObservation {
    var warpTransform: matrix_float3x3 { get set }
}
```

The `matrix_float3x3` is a SIMD type with columns:
- `columns.0`: first column (a, d, g)
- `columns.1`: second column (b, e, h)
- `columns.2`: third column (c, f, i)

### Applying the Transform with Core Image

```swift
let ciImage = CIImage(cgImage: floatingImage)
let transformFilter = CIFilter(name: "CIPerspectiveTransformWithExtent")!
// Convert matrix_float3x3 to CIPerspectiveTransform parameters
// Each corner maps using the homography
```

### When to Use Homography vs Feature Prints

| Scenario | Use |
|----------|-----|
| **Same scene, different viewpoint** | Homography |
| **Aligning camera frames** | Homography |
| **Image stabilization** | Homography |
| **Finding similar photos** | Feature prints |
| **Deduplication** | Feature prints |
| **Content-based search** | Feature prints |

### Also Available: Translational Registration

```swift
let transRequest = VNTranslationalImageRegistrationRequest(
    targetedCGImage: floatingImage, options: [:]
)
// Result: VNImageTranslationAlignmentObservation
// .alignmentTransform: CGAffineTransform (simpler, 2D translation only)
```

---

## 12. Text Recognition -- VNRecognizeTextRequest

**Class:** `VNRecognizeTextRequest`
**Result:** `[VNRecognizedTextObservation]`
**Since:** iOS 13
**Purpose:** OCR for printed and handwritten text

### Configurable Properties

```swift
let request = VNRecognizeTextRequest()

// Recognition level
request.recognitionLevel = .accurate  // .accurate (default) or .fast
// .accurate: neural network-based, slower, better results
// .fast: character-level detection, faster, less accurate

// Languages (order matters -- first language determines the recognition model)
request.recognitionLanguages = ["en-US", "fr-FR", "de-DE"]

// Language correction
request.usesLanguageCorrection = true  // default: true
// Uses NLP to correct recognition errors based on language model

// Custom vocabulary
request.customWords = ["MyApp", "IMAG", "PGM", "PVW"]
// Bias recognition toward these specific terms

// Minimum text height (as fraction of image height)
request.minimumTextHeight = 0.0  // 0.0 = detect all sizes (default)
// Set higher (e.g., 0.05) to filter small text and improve speed
```

### Getting Supported Languages

```swift
// Class method (iOS 15+)
let supportedLanguages = try VNRecognizeTextRequest.supportedRecognitionLanguages(
    for: .accurate,
    revision: VNRecognizeTextRequestRevision2
)
// Returns: [String] of language codes

// Instance method (iOS 16+)
let request = VNRecognizeTextRequest()
let languages = try request.supportedRecognitionLanguages()
```

### Supported Languages (iOS 18+)

```
en-US, fr-FR, it-IT, de-DE, es-ES, pt-BR, 
zh-Hans, zh-Hant, yue-Hans, yue-Hant, 
ko-KR, ja-JP, ru-RU, uk-UA, 
th-TH, vi-VT, ar-SA, ars-SA
```

**Total: 18 languages** including Cyrillic, Arabic, Thai, and CJK scripts.

### Processing Results

```swift
let handler = VNImageRequestHandler(cgImage: image, options: [:])
try handler.perform([request])

guard let observations = request.results as? [VNRecognizedTextObservation] else { return }

for observation in observations {
    // Get top candidate (most likely text)
    guard let topCandidate = observation.topCandidates(1).first else { continue }
    
    let recognizedText = topCandidate.string      // The actual text
    let confidence = topCandidate.confidence       // 0.0 to 1.0
    let boundingBox = observation.boundingBox      // Normalized CGRect
    
    // Get up to 10 alternative candidates
    let alternatives = observation.topCandidates(10)
    
    // Get bounding box for a specific character range
    if let range = topCandidate.string.range(of: "specific") {
        let charBox = try topCandidate.boundingBox(for: range)
    }
}
```

### Recognition Level Comparison

| Aspect | `.fast` | `.accurate` |
|--------|---------|-------------|
| **Speed** | ~2x faster | Baseline |
| **Accuracy** | Lower | Higher |
| **Handwriting** | Limited | Good |
| **Languages** | Fewer | All 18 |
| **Use case** | Real-time preview | Final capture, documents |

---

## 13. Face Detection -- VNDetectFaceRectanglesRequest

**Class:** `VNDetectFaceRectanglesRequest`
**Result:** `[VNFaceObservation]`
**Since:** iOS 11

### Usage

```swift
let request = VNDetectFaceRectanglesRequest()

let handler = VNImageRequestHandler(cgImage: image, options: [:])
try handler.perform([request])

guard let faces = request.results as? [VNFaceObservation] else { return }

for face in faces {
    let boundingBox = face.boundingBox  // Normalized CGRect, bottom-left origin
    let roll = face.roll?.floatValue    // Head roll (tilt) in radians
    let yaw = face.yaw?.floatValue      // Head yaw (turn) in radians
    let pitch = face.pitch?.floatValue  // Head pitch (nod) in radians (iOS 15+)
}
```

### VNFaceObservation Properties

```swift
class VNFaceObservation: VNDetectedObjectObservation {
    var landmarks: VNFaceLandmarks2D? { get }  // Requires VNDetectFaceLandmarksRequest
    var faceCaptureQuality: Float? { get }      // Requires VNDetectFaceCaptureQualityRequest
    var roll: NSNumber? { get }                 // Radians
    var yaw: NSNumber? { get }                  // Radians
    var pitch: NSNumber? { get }                // Radians (iOS 15+)
}
```

### BoundingBox Coordinate Conversion

```swift
// Vision normalized (bottom-left origin) to UIKit (top-left origin)
func convertBoundingBox(_ box: CGRect, imageSize: CGSize) -> CGRect {
    let x = box.origin.x * imageSize.width
    let y = (1.0 - box.origin.y - box.height) * imageSize.height  // Flip Y
    let width = box.width * imageSize.width
    let height = box.height * imageSize.height
    return CGRect(x: x, y: y, width: width, height: height)
}
```

### Face Landmarks (requires separate request)

```swift
let landmarksRequest = VNDetectFaceLandmarksRequest()
try handler.perform([landmarksRequest])

if let face = landmarksRequest.results?.first as? VNFaceObservation,
   let landmarks = face.landmarks {
    // 76 landmark points total
    let leftEye = landmarks.leftEye        // VNFaceLandmarkRegion2D
    let rightEye = landmarks.rightEye
    let nose = landmarks.nose
    let outerLips = landmarks.outerLips
    let innerLips = landmarks.innerLips
    let leftEyebrow = landmarks.leftEyebrow
    let rightEyebrow = landmarks.rightEyebrow
    let faceContour = landmarks.faceContour
    let leftPupil = landmarks.leftPupil
    let rightPupil = landmarks.rightPupil
    let medianLine = landmarks.medianLine
    
    // Access points in a region
    if let points = leftEye?.normalizedPoints {
        // Array of CGPoint in normalized face bounding box coordinates
    }
}
```

---

## 14. Object Tracking -- VNTrackingRequest Subclasses

### VNTrackingRequest (Abstract Base)

```swift
class VNTrackingRequest: VNImageBasedRequest {
    var inputObservation: VNDetectedObjectObservation { get set }
    var trackingLevel: TrackingLevel { get set }  // .fast or .accurate
    var isLastFrame: Bool { get set }             // Signal end of sequence
}

enum VNRequestTrackingLevel {
    case fast       // Speed over accuracy
    case accurate   // Accuracy over speed
}
```

### VNTrackObjectRequest

```swift
// Initialize with a detection from a previous frame
let trackRequest = VNTrackObjectRequest(detectedObjectObservation: previousObservation)
trackRequest.trackingLevel = .accurate

// Use with VNSequenceRequestHandler
let sequenceHandler = VNSequenceRequestHandler()
try sequenceHandler.perform([trackRequest], on: currentPixelBuffer)

if let updatedObservation = trackRequest.results?.first as? VNDetectedObjectObservation {
    // updatedObservation.boundingBox has the new position
    // Feed this back as inputObservation for the next frame
}
```

### VNTrackRectangleRequest

```swift
// Specifically for tracking rectangular objects (documents, screens, etc.)
let rectTrack = VNTrackRectangleRequest(detectedObjectObservation: rectObservation)
// Result: VNRectangleObservation with updated corner points
```

### Tracking Lifecycle

```swift
// Frame 1: Detect
let detectRequest = VNDetectRectanglesRequest()
let imageHandler = VNImageRequestHandler(cvPixelBuffer: frame1)
try imageHandler.perform([detectRequest])
var lastObservation = detectRequest.results?.first as? VNRectangleObservation

// Frame 2+: Track
let sequenceHandler = VNSequenceRequestHandler()
for frame in subsequentFrames {
    guard let observation = lastObservation else { break }
    let trackRequest = VNTrackRectangleRequest(detectedObjectObservation: observation)
    try sequenceHandler.perform([trackRequest], on: frame)
    lastObservation = trackRequest.results?.first as? VNRectangleObservation
}

// Last frame: Signal completion
trackRequest.isLastFrame = true
```

---

## 15. Person Segmentation -- VNGeneratePersonSegmentationRequest

**Class:** `VNGeneratePersonSegmentationRequest`
**Result:** `VNPixelBufferObservation`
**Since:** iOS 15
**Purpose:** Generate a matte mask isolating people from the background

### Quality Levels

```swift
let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .balanced  // .fast, .balanced, .accurate

// Output format
request.outputPixelFormat = kCVPixelFormatType_OneComponent8  // 8-bit grayscale mask
```

| Quality | Speed | Mask Quality | Use Case |
|---------|-------|-------------|----------|
| `.fast` | Fastest | Coarse edges | Real-time video |
| `.balanced` | Moderate | Good edges | Near-real-time |
| `.accurate` | Slowest | Sharp edges | Static images (default) |

### Usage

```swift
let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:])
try handler.perform([request])

guard let result = request.results?.first as? VNPixelBufferObservation else { return }
let maskBuffer = result.pixelBuffer
// 0 = background, 255 = person
// Use as alpha mask or with CIBlendWithMask filter
```

### Stateful for Video

This request is **stateful** -- create one instance and reuse it across frames for temporal consistency:

```swift
let segmentationRequest = VNGeneratePersonSegmentationRequest()
segmentationRequest.qualityLevel = .fast

// Reuse for each frame
for frame in videoFrames {
    let handler = VNImageRequestHandler(cvPixelBuffer: frame, options: [:])
    try handler.perform([segmentationRequest])  // Same request instance
}
```

---

## 16. iOS 18+ Swift API (New Prefix-Free API)

WWDC 2024 introduced a completely redesigned Swift API for Vision. The new API:
- Drops the `VN` prefix from all types
- Uses `async/await` instead of completion handlers
- Returns typed results directly (no casting needed)
- Uses parameter packs for multiple requests

### Name Mapping (Old to New)

| Legacy (iOS 11-17) | New (iOS 18+) |
|---------------------|---------------|
| `VNClassifyImageRequest` | `ClassifyImageRequest` |
| `VNRecognizeTextRequest` | `RecognizeTextRequest` |
| `VNDetectBarcodesRequest` | `DetectBarcodesRequest` |
| `VNDetectFaceRectanglesRequest` | `DetectFaceRectanglesRequest` |
| `VNDetectHumanBodyPoseRequest` | `DetectHumanBodyPoseRequest` |
| `VNGenerateImageFeaturePrintRequest` | `GenerateImageFeaturePrintRequest` |
| `VNImageRequestHandler` | `ImageRequestHandler` |
| `VNClassificationObservation` | `ClassificationObservation` |
| `VNRecognizedTextObservation` | `RecognizedTextObservation` |
| `VNBarcodeObservation` | `BarcodeObservation` |
| `VNHumanBodyPoseObservation` | `HumanBodyPoseObservation` |

### New Async/Await Pattern

```swift
// Single request
let request = ClassifyImageRequest()
let observations = try await request.perform(on: imageURL)
// observations is already [ClassificationObservation] -- no casting

for observation in observations {
    print("\(observation.identifier): \(observation.confidence)")
}
```

### Multiple Requests with Parameter Packs

```swift
// Run multiple requests concurrently, wait for all
var barcodesRequest = DetectBarcodesRequest()
var textRequest = RecognizeTextRequest()

let handler = ImageRequestHandler(fileURL)
let (barcodesResult, textResult) = try await handler.perform(barcodesRequest, textRequest)
// Both results are strongly typed
```

### Streaming Results with performAll()

```swift
// Process results as each request completes
let handler = ImageRequestHandler(fileURL)
for try await result in handler.performAll([barcodesRequest, textRequest]) {
    switch result {
    case .detectBarcodes(_, let barcodeObservations):
        // Handle barcodes immediately
    case .recognizeText(_, let textObservations):
        // Handle text immediately
    default:
        break
    }
}
```

### New Coordinate Conversion

```swift
// iOS 18+ built-in conversion
let imageCoords = observation.boundingBox.toImageCoordinates(
    viewSize,
    origin: .upperLeft  // Convert to UIKit coordinate system
)
```

### New Request: CalculateImageAestheticsScoresRequest

```swift
let request = CalculateImageAestheticsScoresRequest()
let result = try await request.perform(on: imageURL)
print(result.overallScore)  // Overall aesthetic quality score
print(result.isUtility)     // Whether classified as utility/stock photo
```

### Migration Strategy

Both APIs coexist. The old `VN`-prefixed API continues to work. For your app:
- Use new API for iOS 18+ minimum deployment
- The old API is fine for iOS 14-17 compatibility
- Do NOT mix old and new in the same perform() call

---

## 17. iOS 26 New Requests (WWDC 2025)

### RecognizeDocumentsRequest

```swift
let request = RecognizeDocumentsRequest()
let result = try await request.perform(on: documentImage)
// Returns DocumentObservation with:
// - Structural elements (tables, lists, paragraphs)
// - Machine-readable codes (QR codes)
// - Important information (emails, phone numbers, URLs)
// - 26 language support
```

### DetectLensSmudgeRequest (DetectCameraLensSmudgeRequest)

```swift
let request = DetectLensSmudgeRequest()
let result = try await request.perform(on: image)
// Detects whether the camera lens was smudged/obscured
// Used internally by the Camera app in iOS 26
```

**Total request types as of iOS 26: 35+**

---

## 18. CVPixelBuffer Handling and Thread Safety

### The Core Problem

`CVPixelBuffer` is NOT Sendable. It represents a reference to potentially GPU-backed memory (IOSurface). Multiple concurrent accesses without locking cause data races and crashes.

### Locking Protocol

```swift
// Lock for reading
CVPixelBufferLockBaseAddress(pixelBuffer, .readOnly)
defer { CVPixelBufferUnlockBaseAddress(pixelBuffer, .readOnly) }

// Access data
let baseAddress = CVPixelBufferGetBaseAddress(pixelBuffer)
let bytesPerRow = CVPixelBufferGetBytesPerRow(pixelBuffer)
let width = CVPixelBufferGetWidth(pixelBuffer)
let height = CVPixelBufferGetHeight(pixelBuffer)

// Lock for writing
CVPixelBufferLockBaseAddress(pixelBuffer, [])  // Empty flags = read/write
defer { CVPixelBufferUnlockBaseAddress(pixelBuffer, []) }
```

### Lock Flags

| Flag | Purpose |
|------|---------|
| `.readOnly` (`kCVPixelBufferLock_ReadOnly`) | Lock for read-only access; multiple readers allowed |
| `[]` (empty) | Lock for read/write access; exclusive |

### Deep Copy (Thread-Safe Pattern)

When you need to pass a pixel buffer across thread/actor boundaries, deep copy it:

```swift
extension CVPixelBuffer {
    func deepCopy() throws -> CVPixelBuffer {
        precondition(CFGetTypeID(self) == CVPixelBufferGetTypeID())
        
        var copy: CVPixelBuffer?
        let width = CVPixelBufferGetWidth(self)
        let height = CVPixelBufferGetHeight(self)
        let formatType = CVPixelBufferGetPixelFormatType(self)
        let attachments = CVBufferCopyAttachments(self, .shouldPropagate)
        
        let status = CVPixelBufferCreate(nil, width, height, formatType, attachments, &copy)
        guard status == kCVReturnSuccess, let copy else {
            throw NSError(domain: "CVPixelBuffer", code: Int(status))
        }
        
        CVPixelBufferLockBaseAddress(self, .readOnly)
        CVPixelBufferLockBaseAddress(copy, [])
        defer {
            CVPixelBufferUnlockBaseAddress(copy, [])
            CVPixelBufferUnlockBaseAddress(self, .readOnly)
        }
        
        let planeCount = CVPixelBufferGetPlaneCount(self)
        
        if planeCount == 0 {
            // Non-planar buffer
            guard let dest = CVPixelBufferGetBaseAddress(copy),
                  let source = CVPixelBufferGetBaseAddress(self) else {
                throw NSError(domain: "CVPixelBuffer", code: -1)
            }
            let srcBytesPerRow = CVPixelBufferGetBytesPerRow(self)
            let dstBytesPerRow = CVPixelBufferGetBytesPerRow(copy)
            
            if srcBytesPerRow == dstBytesPerRow {
                memcpy(dest, source, height * srcBytesPerRow)
            } else {
                var src = source
                var dst = dest
                for _ in 0..<height {
                    memcpy(dst, src, min(srcBytesPerRow, dstBytesPerRow))
                    src = src.advanced(by: srcBytesPerRow)
                    dst = dst.advanced(by: dstBytesPerRow)
                }
            }
        } else {
            // Planar buffer (e.g., YCbCr)
            for plane in 0..<planeCount {
                guard let dest = CVPixelBufferGetBaseAddressOfPlane(copy, plane),
                      let source = CVPixelBufferGetBaseAddressOfPlane(self, plane) else { continue }
                let planeHeight = CVPixelBufferGetHeightOfPlane(self, plane)
                let srcBytesPerRow = CVPixelBufferGetBytesPerRowOfPlane(self, plane)
                let dstBytesPerRow = CVPixelBufferGetBytesPerRowOfPlane(copy, plane)
                
                if srcBytesPerRow == dstBytesPerRow {
                    memcpy(dest, source, planeHeight * srcBytesPerRow)
                } else {
                    var src = source
                    var dst = dest
                    for _ in 0..<planeHeight {
                        memcpy(dst, src, min(srcBytesPerRow, dstBytesPerRow))
                        src = src.advanced(by: srcBytesPerRow)
                        dst = dst.advanced(by: dstBytesPerRow)
                    }
                }
            }
        }
        
        return copy
    }
}
```

### Alternative: Convert to CIImage

`CIImage` is thread-safe by design. If you do not need raw pixel access, convert immediately:

```swift
let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
// CIImage can be safely passed across actors/threads
// Vision handlers accept CIImage directly
```

### Rules for AVCaptureSession Pixel Buffers

1. The `CVPixelBuffer` from `captureOutput(_:didOutput:from:)` is **owned by the capture session**
2. It will be **recycled** after the delegate method returns
3. You must either: (a) process it synchronously before returning, (b) deep copy it, or (c) convert to CIImage
4. **NEVER** store a reference to the capture session's pixel buffer for later async use

---

## 19. Thread Safety and Actor Isolation Patterns

### Core Threading Rules

1. **VNImageRequestHandler.perform() is synchronous and blocking.** It blocks until ALL requests complete. NEVER call on the main thread.
2. **VNRequest objects are NOT Sendable.** Do not pass them across actor boundaries.
3. **VNImageRequestHandler is NOT Sendable.** Create handlers on the thread where you will call perform().
4. **VNSequenceRequestHandler is NOT Sendable.** Always use it from the same serial context.
5. **VNObservation subclasses are NSObject-based** and generally NOT Sendable. Extract the data you need (CGRect, Float, String) and pass those across boundaries.

### Pattern 1: Dedicated Vision Actor (RECOMMENDED)

```swift
// Create a dedicated actor for all Vision processing
actor VisionProcessor {
    private let sequenceHandler = VNSequenceRequestHandler()
    
    func detectBodyPose(in pixelBuffer: CVPixelBuffer) throws -> [BodyPoseResult] {
        let request = VNDetectHumanBodyPoseRequest()
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:])
        try handler.perform([request])
        
        // Extract Sendable data from observations
        return (request.results as? [VNHumanBodyPoseObservation])?.compactMap { obs in
            guard let nose = try? obs.recognizedPoint(.nose), nose.confidence > 0.5 else { return nil }
            return BodyPoseResult(
                noseLocation: nose.location,
                noseConfidence: nose.confidence
            )
        } ?? []
    }
}

// Sendable result struct
struct BodyPoseResult: Sendable {
    let noseLocation: CGPoint
    let noseConfidence: Float
}
```

### Pattern 2: nonisolated async Function

```swift
@MainActor
class AnalysisViewModel: ObservableObject {
    
    // Mark as nonisolated to avoid running on MainActor
    nonisolated func analyzeFrame(_ pixelBuffer: CVPixelBuffer) async throws -> [String] {
        let request = VNClassifyImageRequest()
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:])
        try handler.perform([request])
        
        // Return Sendable data
        return (request.results as? [VNClassificationObservation])?
            .filter { $0.confidence > 0.3 }
            .map { $0.identifier } ?? []
    }
}
```

### Pattern 3: Task.detached for Background Execution

```swift
func processFrame(_ pixelBuffer: CVPixelBuffer) {
    // Deep copy first -- the original buffer will be recycled
    guard let bufferCopy = try? pixelBuffer.deepCopy() else { return }
    
    Task.detached(priority: .userInitiated) {
        let request = VNDetectHumanBodyPoseRequest()
        let handler = VNImageRequestHandler(cvPixelBuffer: bufferCopy, options: [:])
        try handler.perform([request])
        
        let results = request.results as? [VNHumanBodyPoseObservation]
        
        // Update UI on main actor
        await MainActor.run {
            self.bodyPoseResults = results?.map { /* extract sendable data */ }
        }
    }
}
```

### Pattern 4: Serial DispatchQueue (Pre-Swift Concurrency)

```swift
private let visionQueue = DispatchQueue(label: "com.myapp.vision", qos: .userInitiated)

func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, 
                   from connection: AVCaptureConnection) {
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
    
    visionQueue.async { [weak self] in
        let request = VNDetectHumanBodyPoseRequest()
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .right, options: [:])
        
        do {
            try handler.perform([request])
            let results = request.results as? [VNHumanBodyPoseObservation]
            
            DispatchQueue.main.async {
                self?.updateUI(with: results)
            }
        } catch {
            print("Vision error: \(error)")
        }
    }
}
```

### Swift 6.2+ Patterns

```swift
// nonisolated(nonsending) -- runs on caller's executor
nonisolated(nonsending) func processVision(_ buffer: CVPixelBuffer) throws -> [CGRect] {
    let request = VNDetectFaceRectanglesRequest()
    let handler = VNImageRequestHandler(cvPixelBuffer: buffer, options: [:])
    try handler.perform([request])
    return (request.results as? [VNFaceObservation])?.map(\.boundingBox) ?? []
}

// @concurrent -- explicitly runs on background thread
@concurrent func processVisionBackground(_ buffer: CVPixelBuffer) throws -> [CGRect] {
    let request = VNDetectFaceRectanglesRequest()
    let handler = VNImageRequestHandler(cvPixelBuffer: buffer, options: [:])
    try handler.perform([request])
    return (request.results as? [VNFaceObservation])?.map(\.boundingBox) ?? []
}
```

### CRITICAL: What NOT to Do

```swift
// BAD: Calling perform() on main thread
@MainActor func badExample() {
    let handler = VNImageRequestHandler(cgImage: image, options: [:])
    try handler.perform([request])  // BLOCKS MAIN THREAD -- UI freezes
}

// BAD: Sharing VNSequenceRequestHandler across actors
actor Actor1 {
    let handler = VNSequenceRequestHandler()  // Created here
}
actor Actor2 {
    func use(_ handler: VNSequenceRequestHandler) { }  // Used here -- DATA RACE
}

// BAD: Storing capture session's pixel buffer
var storedBuffer: CVPixelBuffer?  // CRASH -- buffer recycled after delegate returns
func captureOutput(...) {
    storedBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)  // BAD
}

// BAD: Passing VNObservation across actor boundaries
let observation: VNFaceObservation = ...
Task.detached {
    let box = observation.boundingBox  // NOT Sendable -- potential data race
}

// GOOD: Extract Sendable data first
let box = observation.boundingBox  // CGRect is Sendable
Task.detached {
    processBox(box)  // Safe
}
```

---

## 20. Performance Optimization and Frame Skipping

### Frame Skipping Strategy

For live camera feeds (30fps), you cannot process every frame with heavy requests. Use a gate:

```swift
actor VisionGate {
    private var isProcessing = false
    
    func shouldProcess() -> Bool {
        guard !isProcessing else { return false }
        isProcessing = true
        return true
    }
    
    func doneProcessing() {
        isProcessing = false
    }
}

// In capture delegate
let gate = VisionGate()

func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, 
                   from connection: AVCaptureConnection) {
    Task {
        guard await gate.shouldProcess() else { return }  // Skip frame
        defer { Task { await gate.doneProcessing() } }
        
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        // Process this frame...
    }
}
```

### Time-Based Frame Skipping

```swift
private var lastProcessedTime: CFAbsoluteTime = 0
private let minimumInterval: CFAbsoluteTime = 0.1  // 10 fps max

func captureOutput(...) {
    let now = CFAbsoluteTimeGetCurrent()
    guard now - lastProcessedTime >= minimumInterval else { return }
    lastProcessedTime = now
    // Process frame...
}
```

### Request-Specific Performance Tips

| Request | Typical Time | Optimization |
|---------|-------------|--------------|
| `VNDetectFaceRectanglesRequest` | ~5ms | Fast, run every frame |
| `VNDetectHumanBodyPoseRequest` | ~15-30ms | Skip frames, 10fps sufficient |
| `VNClassifyImageRequest` | ~50-100ms | Run infrequently (1-2fps) |
| `VNRecognizeTextRequest (.fast)` | ~20ms | Use `.fast` for live, `.accurate` for snapshots |
| `VNRecognizeTextRequest (.accurate)` | ~100-200ms | Snapshot only |
| `VNGenerateImageFeaturePrintRequest` | ~1.5ms/MP | Very fast, run freely |
| `VNHomographicImageRegistrationRequest` | ~30-50ms | Skip frames |
| `VNGeneratePersonSegmentationRequest (.fast)` | ~10ms | Run every frame at `.fast` quality |

### Thermal Management

```swift
// Monitor thermal state
NotificationCenter.default.addObserver(
    forName: ProcessInfo.thermalStateDidChangeNotification,
    object: nil,
    queue: .main
) { _ in
    switch ProcessInfo.processInfo.thermalState {
    case .nominal, .fair:
        // Full processing
        self.frameSkipInterval = 0.033  // 30fps
    case .serious:
        // Reduce workload
        self.frameSkipInterval = 0.1    // 10fps
    case .critical:
        // Minimal processing
        self.frameSkipInterval = 0.5    // 2fps
    @unknown default:
        self.frameSkipInterval = 0.1
    }
}
```

### preferBackgroundProcessing

```swift
let request = VNClassifyImageRequest()
request.preferBackgroundProcessing = true
// Hints to Vision to reduce resource contention
// Useful for non-real-time analysis running alongside UI updates
```

### Batching Multiple Requests

Running multiple requests in a single `perform()` call is more efficient than separate calls because the handler caches intermediate image representations:

```swift
// EFFICIENT: Single handler, multiple requests
let handler = VNImageRequestHandler(cvPixelBuffer: buffer, options: [:])
try handler.perform([bodyPoseRequest, faceRequest, textRequest])

// LESS EFFICIENT: Three separate handlers
let handler1 = VNImageRequestHandler(cvPixelBuffer: buffer, options: [:])
try handler1.perform([bodyPoseRequest])  // Image processed from scratch
let handler2 = VNImageRequestHandler(cvPixelBuffer: buffer, options: [:])
try handler2.perform([faceRequest])       // Image processed again
let handler3 = VNImageRequestHandler(cvPixelBuffer: buffer, options: [:])
try handler3.perform([textRequest])       // Image processed yet again
```

---

## 21. VNImageOption Dictionary Keys

```swift
struct VNImageOption {
    static let properties: VNImageOption
    // NSData of image properties/metadata from the image source
    // Used by algorithms like horizon detection
    
    static let cameraIntrinsics: VNImageOption
    // NSData containing a matrix_float3x3 (column-major)
    // Camera intrinsic matrix: [[fx, 0, 0], [0, fy, 0], [ox, oy, 1]]
    // fx, fy = focal lengths
    // ox, oy = principal point (origin at upper-left)
    
    static let ciContext: VNImageOption
    // CIContext for Core Image operations
    // If not provided, Vision creates its own
    // Provide your own for efficiency if you're already using Core Image
}
```

### Usage

```swift
let ciContext = CIContext(options: [.useSoftwareRenderer: false])
let options: [VNImageOption: Any] = [
    .ciContext: ciContext
]

let handler = VNImageRequestHandler(
    cvPixelBuffer: buffer,
    orientation: .right,
    options: options
)
```

---

## 22. Crash Prevention Patterns

### Problem 1: CVPixelBuffer Data Races

**Symptom:** EXC_BAD_ACCESS in Vision perform(), intermittent crashes during live camera analysis

**Fix:** Never share CVPixelBuffer across threads. Either process synchronously in the capture delegate or deep copy.

```swift
// SAFE: Process in delegate context with dedicated queue
func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer,
                   from connection: AVCaptureConnection) {
    // This is already on videoDataOutputQueue
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
    
    // Option A: Process synchronously here (blocks next frame)
    let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .right, options: [:])
    try? handler.perform([bodyPoseRequest])
    
    // Option B: Convert to CIImage (thread-safe) for async processing
    let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
    Task.detached {
        let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
        try handler.perform([self.bodyPoseRequest])
    }
}
```

### Problem 2: Main Thread Blocking

**Symptom:** UI freezes during Vision analysis, janky scrolling, dropped frames

**Fix:** NEVER call `perform()` on the main thread. Always use a background context.

```swift
// WRONG
@MainActor func analyze() {
    try handler.perform([request])  // Blocks UI
}

// RIGHT
func analyze() async throws {
    // iOS 18+
    let results = try await request.perform(on: imageURL)
    
    // Or pre-iOS 18
    try await withCheckedThrowingContinuation { continuation in
        visionQueue.async {
            do {
                try handler.perform([request])
                continuation.resume()
            } catch {
                continuation.resume(throwing: error)
            }
        }
    }
}
```

### Problem 3: VNSequenceRequestHandler Shared Across Actors

**Symptom:** Corrupted tracking state, crashes in tracking requests

**Fix:** Confine VNSequenceRequestHandler to a single actor or serial queue.

```swift
// SAFE: Sequence handler lives inside an actor
actor ObjectTracker {
    private let sequenceHandler = VNSequenceRequestHandler()
    private var lastObservation: VNDetectedObjectObservation?
    
    func track(in pixelBuffer: CVPixelBuffer) throws -> CGRect? {
        guard let observation = lastObservation else { return nil }
        
        let request = VNTrackObjectRequest(detectedObjectObservation: observation)
        try sequenceHandler.perform([request], on: pixelBuffer)
        
        lastObservation = request.results?.first as? VNDetectedObjectObservation
        return lastObservation?.boundingBox
    }
    
    func setInitialObservation(_ observation: VNDetectedObjectObservation) {
        lastObservation = observation
    }
}
```

### Problem 4: Memory Pressure from Unthrottled Vision Processing

**Symptom:** Memory warnings, jetsam kills, thermal throttling

**Fix:** Implement frame skipping and monitor thermal state (see section 20).

### Problem 5: Completion Handler Retain Cycles

**Symptom:** Memory leaks, view controllers not deallocating

**Fix:** Use `[weak self]` in completion handlers, or migrate to iOS 18+ async API.

```swift
// Legacy API -- watch for retain cycles
let request = VNDetectFaceRectanglesRequest { [weak self] request, error in
    guard let self else { return }
    // Process results
}
```

### Problem 6: Wrong Coordinate System

**Symptom:** Overlays appear in wrong positions, mirrored bounding boxes

**Fix:** Vision uses bottom-left origin. UIKit uses top-left. Always convert.

```swift
extension CGRect {
    /// Convert from Vision coordinates (bottom-left origin) to UIKit (top-left origin)
    func toUIKitCoordinates(imageSize: CGSize) -> CGRect {
        CGRect(
            x: self.origin.x * imageSize.width,
            y: (1.0 - self.origin.y - self.height) * imageSize.height,
            width: self.width * imageSize.width,
            height: self.height * imageSize.height
        )
    }
}
```

### Problem 7: Simulator Crashes with Vision

**Symptom:** `com.apple.vis Code=9 "Unspecified error"` in simulator

**Reality:** Some Vision requests fail in the simulator. Always test on device for Vision features. Use conditional compilation for tests:

```swift
#if targetEnvironment(simulator)
    // Skip Vision analysis or use mock data
#else
    try handler.perform([request])
#endif
```

---

## 23. Complete Code Examples

### Multi-Request Video Analyzer

```swift
import Vision
import AVFoundation

actor VideoAnalyzer {
    private var isProcessing = false
    private let sequenceHandler = VNSequenceRequestHandler()
    
    struct AnalysisResult: Sendable {
        let faces: [CGRect]
        let bodyPoses: [BodyPoseData]
        let sceneLabels: [String]
        let recognizedText: [TextBlock]
    }
    
    struct BodyPoseData: Sendable {
        let joints: [String: CGPoint]  // JointName raw value -> location
        let confidence: Float
    }
    
    struct TextBlock: Sendable {
        let text: String
        let confidence: Float
        let boundingBox: CGRect
    }
    
    func analyze(pixelBuffer: CVPixelBuffer, orientation: CGImagePropertyOrientation = .right) throws -> AnalysisResult {
        guard !isProcessing else { return AnalysisResult(faces: [], bodyPoses: [], sceneLabels: [], recognizedText: []) }
        isProcessing = true
        defer { isProcessing = false }
        
        // Create all requests
        let faceRequest = VNDetectFaceRectanglesRequest()
        let bodyPoseRequest = VNDetectHumanBodyPoseRequest()
        let classifyRequest = VNClassifyImageRequest()
        classifyRequest.preferBackgroundProcessing = true
        let textRequest = VNRecognizeTextRequest()
        textRequest.recognitionLevel = .fast
        
        // Single handler, multiple requests (efficient)
        let handler = VNImageRequestHandler(
            cvPixelBuffer: pixelBuffer,
            orientation: orientation,
            options: [:]
        )
        
        try handler.perform([faceRequest, bodyPoseRequest, classifyRequest, textRequest])
        
        // Extract Sendable data from face results
        let faces = (faceRequest.results as? [VNFaceObservation])?.map(\.boundingBox) ?? []
        
        // Extract body pose data
        let bodyPoses = (bodyPoseRequest.results as? [VNHumanBodyPoseObservation])?.compactMap { obs -> BodyPoseData? in
            guard let allJoints = try? obs.recognizedPoints(.all) else { return nil }
            var joints: [String: CGPoint] = [:]
            for (name, point) in allJoints where point.confidence > 0.3 {
                joints[name.rawValue.rawValue] = point.location
            }
            return BodyPoseData(joints: joints, confidence: obs.confidence)
        } ?? []
        
        // Extract scene labels
        let sceneLabels = (classifyRequest.results as? [VNClassificationObservation])?
            .filter { $0.confidence > 0.1 }
            .prefix(5)
            .map { $0.identifier } ?? []
        
        // Extract text
        let recognizedText = (textRequest.results as? [VNRecognizedTextObservation])?.compactMap { obs -> TextBlock? in
            guard let candidate = obs.topCandidates(1).first, candidate.confidence > 0.5 else { return nil }
            return TextBlock(
                text: candidate.string,
                confidence: candidate.confidence,
                boundingBox: obs.boundingBox
            )
        } ?? []
        
        return AnalysisResult(
            faces: faces,
            bodyPoses: bodyPoses,
            sceneLabels: sceneLabels,
            recognizedText: recognizedText
        )
    }
}
```

### Feature Print Image Comparator

```swift
actor ImageComparator {
    
    struct SimilarityResult: Sendable {
        let distance: Float
        let isSimilar: Bool  // distance < threshold
    }
    
    func generateFeaturePrint(from image: CGImage) throws -> VNFeaturePrintObservation {
        let request = VNGenerateImageFeaturePrintRequest()
        let handler = VNImageRequestHandler(cgImage: image, options: [:])
        try handler.perform([request])
        
        guard let result = request.results?.first as? VNFeaturePrintObservation else {
            throw VisionError.noResults
        }
        return result
    }
    
    func compareImages(_ image1: CGImage, _ image2: CGImage, threshold: Float = 15.0) throws -> SimilarityResult {
        let fp1 = try generateFeaturePrint(from: image1)
        let fp2 = try generateFeaturePrint(from: image2)
        
        var distance: Float = .infinity
        try fp1.computeDistance(&distance, to: fp2)
        
        return SimilarityResult(distance: distance, isSimilar: distance < threshold)
    }
    
    enum VisionError: Error {
        case noResults
    }
}
```

### Camera Feed Integration (AVCaptureSession)

```swift
class CameraVisionBridge: NSObject, AVCaptureVideoDataOutputSampleBufferDelegate {
    private let visionQueue = DispatchQueue(label: "com.myapp.vision", qos: .userInitiated)
    private let videoAnalyzer = VideoAnalyzer()
    private var lastAnalysisTime: CFAbsoluteTime = 0
    private let analysisInterval: CFAbsoluteTime = 0.1  // 10fps
    
    func setupCapture() {
        let session = AVCaptureSession()
        session.sessionPreset = .hd1280x720
        
        let videoOutput = AVCaptureVideoDataOutput()
        videoOutput.setSampleBufferDelegate(self, queue: visionQueue)
        videoOutput.alwaysDiscardsLateVideoFrames = true
        
        session.addOutput(videoOutput)
        session.startRunning()
    }
    
    func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer,
                       from connection: AVCaptureConnection) {
        // Frame skip
        let now = CFAbsoluteTimeGetCurrent()
        guard now - lastAnalysisTime >= analysisInterval else { return }
        lastAnalysisTime = now
        
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        
        // Convert to CIImage for safe async processing
        let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
        
        Task {
            do {
                // Create a new handler with the thread-safe CIImage
                // Note: We cannot pass the analyzer a CVPixelBuffer here because
                // the capture session will recycle it after this method returns
                let handler = VNImageRequestHandler(ciImage: ciImage, orientation: .right, options: [:])
                let faceRequest = VNDetectFaceRectanglesRequest()
                try handler.perform([faceRequest])
                
                let faces = (faceRequest.results as? [VNFaceObservation])?.map(\.boundingBox) ?? []
                
                await MainActor.run {
                    // Update UI with results
                }
            } catch {
                print("Vision error: \(error)")
            }
        }
    }
}
```

---

## 24. References

### Official Apple Documentation
- [Vision Framework](https://developer.apple.com/documentation/vision)
- [VNImageRequestHandler](https://developer.apple.com/documentation/vision/vnimagerequesthandler)
- [VNSequenceRequestHandler](https://developer.apple.com/documentation/vision/vnsequencerequesthandler)
- [VNRequest](https://developer.apple.com/documentation/vision/vnrequest)
- [VNDetectHumanBodyPoseRequest](https://developer.apple.com/documentation/vision/vndetecthumanbodyposerequest)
- [VNClassifyImageRequest](https://developer.apple.com/documentation/vision/vnclassifyimagerequest)
- [VNGenerateImageFeaturePrintRequest](https://developer.apple.com/documentation/vision/vngenerateimagefeatureprintrequest)
- [VNHomographicImageRegistrationRequest](https://developer.apple.com/documentation/vision/vnhomographicimageregistrationrequest)
- [VNRecognizeTextRequest](https://developer.apple.com/documentation/vision/vnrecognizetextrequest)
- [VNDetectFaceRectanglesRequest](https://developer.apple.com/documentation/vision/vndetectfacerectanglesrequest)
- [VNObservation](https://developer.apple.com/documentation/vision/vnobservation)
- [VNFeaturePrintObservation](https://developer.apple.com/documentation/vision/vnfeatureprintobservation)
- [VNHumanBodyPoseObservation](https://developer.apple.com/documentation/vision/vnhumanbodyposeobservation)
- [VNClassificationObservation](https://developer.apple.com/documentation/vision/vnclassificationobservation)
- [VNPixelBufferObservation](https://developer.apple.com/documentation/vision/vnpixelbufferobservation)
- [VNImageHomographicAlignmentObservation](https://developer.apple.com/documentation/vision/vnimagehomographicalignmentobservation)
- [VNGeneratePersonSegmentationRequest](https://developer.apple.com/documentation/vision/vngeneratepersonsegmentationrequest)
- [VNTrackObjectRequest](https://developer.apple.com/documentation/vision/vntrackobjectrequest)
- [VNTrackingRequest](https://developer.apple.com/documentation/vision/vntrackingrequest)
- [VNImageOption](https://developer.apple.com/documentation/vision/vnimageoption)
- [RecognizeDocumentsRequest (iOS 26)](https://developer.apple.com/documentation/vision/recognizedocumentsrequest)
- [preferBackgroundProcessing](https://developer.apple.com/documentation/vision/vnrequest/preferbackgroundprocessing)
- [usesCPUOnly (deprecated)](https://developer.apple.com/documentation/vision/vnrequest/2923480-usescpuonly)

### WWDC Sessions
- [Discover Swift enhancements in the Vision framework -- WWDC 2024](https://developer.apple.com/videos/play/wwdc2024/10163/)
- [Read documents using the Vision framework -- WWDC 2025](https://developer.apple.com/videos/play/wwdc2025/272/)
- [Detect Body and Hand Pose with Vision -- WWDC 2020](https://developer.apple.com/videos/play/wwdc2020/10653/)
- [Explore 3D body pose and person segmentation in Vision -- WWDC 2023](https://developer.apple.com/videos/play/wwdc2023/111241/)
- [Explore Computer Vision APIs -- WWDC 2020](https://developer.apple.com/videos/play/wwdc2020/10673/)
- [Extract document data using Vision -- WWDC 2021](https://developer.apple.com/videos/play/wwdc2021/10041/)

### Technical Articles
- [Detecting body pose using Vision framework](https://medium.com/@kamil.tustanowski/detecting-body-pose-using-vision-framework-caba5435796a)
- [Comparing images using the Vision framework](https://medium.com/@kamil.tustanowski/comparing-images-using-the-vision-framework-ff13291901ff)
- [Image classification using the Vision framework](https://medium.com/@kamil.tustanowski/image-classification-using-the-vision-framework-3cac0ab6f399)
- [Advanced Image Similarity Techniques (MWM)](https://medium.com/@MWM.io/apples-vision-framework-exploring-advanced-image-similarity-techniques-f7bb7d008763)
- [VNClassifyImageRequest supported identifiers (1303 categories)](https://gist.github.com/ktustanowski/56c0d7541813868fed4aceb60ab5d149)
- [CVPixelBuffer deep copy](https://gist.github.com/humblehacker/a55db40791605c4e40411f70bcd13d13)
- [iOS Vision Framework -- Swift API Enhancements (WWDC 24)](https://medium.com/kkdaytech/ios-vision-framework-x-wwdc-24-discover-swift-enhancements-in-the-vision-framework-session-755509180ca8)
- [Recognizing text with the Vision framework](https://www.createwithswift.com/recognizing-text-with-the-vision-framework/)
- [Detecting body poses in a live video feed](https://www.createwithswift.com/detecting-body-poses-in-a-live-video-feed/)
- [Person Segmentation in the Vision Framework (Kodeco)](https://www.kodeco.com/29650263-person-segmentation-in-the-vision-framework)
- [Object Tracking in Vision](https://nilotic.github.io/2018/08/20/Object-Tracking-in-Vision.html)
- [Detecting text in images with the Vision framework (Daniel Saidi, 2026)](https://danielsaidi.com/blog/2026/01/10/detecting-text-in-images-with-the-vision-framework)
- [iOS 26: Apple Adds Native Table Detection to Vision Framework](https://medium.com/@surajkumbhar904/ios-26-apple-adds-native-table-detection-to-vision-framework-142558ab086a)
- [Swift Concurrency + AVCaptureSession (Swift Forums)](https://forums.swift.org/t/safely-use-avcapturesession-swift-6-2-concurrency/83622)

### Rust/Xamarin Bindings (for complete API surface verification)
- [VNImageRequestHandler Rust bindings](https://docs.rs/objc2-vision/latest/aarch64-apple-ios/objc2_vision/struct.VNImageRequestHandler.html)
- [VNSequenceRequestHandler .NET bindings](https://learn.microsoft.com/en-us/dotnet/api/vision.vnsequencerequesthandler.perform?view=net-ios-26.0-10.0)
- [iOS SDK Headers: VNRequestHandler.h](https://github.com/xybp888/iOS-SDKs/blob/master/iPhoneOS13.0.sdk/System/Library/Frameworks/Vision.framework/Headers/VNRequestHandler.h)
