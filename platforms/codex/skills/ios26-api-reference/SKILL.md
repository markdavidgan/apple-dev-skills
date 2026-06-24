---
name: ios26-api-reference
category: reference
description: Authoritative iOS/macOS/watchOS 26 API reference with 3-tier smart loading. Prevents crashes from hallucinated APIs. Trigger on ANY code involving FoundationModels, SpeechTranscriber, SpeechAnalyzer, @Generable, LanguageModelSession, glassEffect, SwiftData, @Observable, Live Activity, App Intents, Vision, VideoToolbox, Network.framework, AVAudioEngine, MenuBarExtra, NSPanel, WKHapticType, or WCSession. Also trigger on Swift 6 concurrency errors, Sendable warnings, or @MainActor isolation issues.
---

# iOS 26 API Reference — Smart Dispatcher

> **Purpose:** Prevent bugs from hallucinated or outdated API signatures.
> **Architecture:** 3-tier loading — only load what you need.
> **Last verified:** 2026-04-08
> **Context7 Integration (Optional):** Live API documentation lookup for latest signatures. If unavailable, rely on the static reference below.

---

## Step 1: Detect Frameworks

Scan `import` statements and code patterns. Load **only** the matching essentials file(s).

| Import / Pattern | Load Essential | Deep Reference (if debugging) |
|------------------|---------------|-------------------------------|
| `import SwiftUI`, any View code | `essentials/swiftui.md` | `reference/swiftui-reference.md` |
| `import SwiftData`, `@Model`, `ModelContext` | `essentials/swiftdata.md` | `reference/swiftdata-reference.md` |
| `import FoundationModels`, `@Generable`, `LanguageModelSession` | `essentials/foundation-models.md` | `reference/foundation-models-reference.md` |
| `import Speech`, `SpeechTranscriber`, `SpeechAnalyzer` | `essentials/speech.md` | `reference/speech-reference.md` |
| `import AVFoundation`, `AVAudioEngine`, `AVAudioSession` | `essentials/avfoundation.md` | `reference/avfoundation-reference.md` |
| `import WidgetKit`, `import ActivityKit`, Live Activity | `essentials/widgets.md` | `reference/widgets-reference.md` |
| `import AppIntents`, `AppShortcutsProvider` | `essentials/app-intents.md` | `reference/app-intents-reference.md` |
| `import Vision`, `VNRequest`, `VNObservation` | `essentials/vision.md` | `reference/vision-reference.md` |
| `import VideoToolbox`, `VTCompressionSession` | `essentials/videotoolbox.md` | `reference/videotoolbox-reference.md` |
| `import Network`, `NWConnection`, `NWListener` | `essentials/network.md` | `reference/network-reference.md` |
| `#if os(macOS)`, `import AppKit` | `essentials/macos.md` | — |
| `#if os(watchOS)`, `import WatchKit` | `essentials/watchos.md` | — |
| Swift 6 concurrency errors, `@MainActor`, `Sendable` | `essentials/swift6.md` | `reference/swift6-reference.md` |

**Rule:** Always load `essentials/swift6.md` alongside any other framework when the project uses `SWIFT_STRICT_CONCURRENCY: complete`.

## Step 2: Loading Protocol

| Scenario | What to Load | Expected Lines |
|----------|-------------|----------------|
| **Writing code** | SKILL.md + matching essentials (1-3 files) | 700-1,800 |
| **Debugging a crash** | + the matching reference file | 2,000-4,000 |
| **Deep investigation** | + matching expert guide and/or community intel | 4,000-6,000 |
| **Full code review** | SKILL.md + essentials/swift6.md + essentials for each detected framework | 2,000-3,500 |

### Deep-Dive Files (Tier 3)

For debugging sessions that need architectural context or real-world gotchas:

| Framework | Expert Guide | Community Intel |
|-----------|-------------|-----------------|
| Swift 6 | `guides/expert-swift6.md` | `intel/community-swift6.md` |
| FoundationModels | — | `intel/community-foundation-models.md` |
| NaturalLanguage (NLEmbedding) | — | `intel/community-naturallanguage.md` |
| Speech + Audio | — | `intel/community-speech.md` |

Also available: `reference/crash-cheat-sheet.md` (universal rules) and `reference/apple-guides.md` (Apple documentation compilation).

---

## Step 3: Context7 Live Documentation Lookup (Optional)

When static references are insufficient or you encounter unfamiliar APIs, **use Context7 MCP** (if installed) to fetch the latest official documentation. If Context7 is not available, rely on the static references in this skill and flag uncertain APIs as "unverified".

### When to Query Context7

| Scenario | Action |
|----------|--------|
| Unfamiliar API signature | Query Context7 before assuming |
| API behaving unexpectedly | Cross-reference with live docs |
| New framework version | Verify API hasn't changed |
| Code review findings | Flag "unverified" if Context7 unavailable |
| Hallucination suspicion | Always verify via Context7 first |

### Context7 Query Pattern

```
1. Identify the framework/library (e.g., "SwiftData", "FoundationModels")
2. Query Context7 for specific API documentation
3. Cross-reference with local essentials files
4. If conflict: Context7 wins (it's live), but note the discrepancy
```

### Example Queries

- **SwiftData predicate syntax:** Query Context7 for `NSPredicate` + `SwiftData` patterns
- **FoundationModels API:** Query Context7 for `LanguageModelSession` latest methods
- **New iOS 26 APIs:** Query Context7 for `glassEffect` modifier parameters
- **Swift 6 concurrency:** Query Context7 for `Sendable` conformance patterns

### Integration with Local References

| Source | Use For | Priority |
|--------|---------|----------|
| Context7 MCP | Live API signatures, latest changes | **Highest** |
| essentials/*.md | Verified patterns, common pitfalls | High |
| reference/*.md | Deep dives, comprehensive lookup | Medium |
| intel/*.md | Community solutions, workarounds | Contextual |

**Rule:** When Context7 and local docs conflict, trust Context7 for API signatures (it's live), but verify against local crash prevention rules (they're battle-tested).

---

## Step 4: Universal Crash Prevention (Always in Context)

These 5 rules apply to ALL iOS 26 code. Memorize them.

### Rule 1: @MainActor on ALL UI Code

```swift
// WRONG
class ViewModel { var state = "" }

// RIGHT
@MainActor @Observable
class ViewModel { var state = "" }
```

### Rule 2: nonisolated deinit on @MainActor Classes

```swift
// WRONG — crash on deallocation from background
@MainActor class Service {
    deinit { cleanup() }  // CRASH
}

// RIGHT
@MainActor class Service {
    nonisolated deinit { /* safe */ }
}
```

### Rule 3: @preconcurrency ONLY When the Compiler Demands It

> **Reversed guidance (2026-04-03):** iOS 26 first-party frameworks ship with full Sendable annotations. Do NOT add `@preconcurrency` prophylactically — it masks real concurrency issues that surface as archive crashes. Cadence removed `@preconcurrency` from 10 files and crashes stopped. Only add it where the compiler specifically warns on a single import.

```swift
// ❌ WRONG — do not add prophylactically
@preconcurrency import EventKit
@preconcurrency import AVFoundation

// ✅ CORRECT — add only where compiler specifically demands it
import EventKit
import AVFoundation
@preconcurrency import SomeLegacyBinaryFramework  // Compiler demanded this
```

### Rule 4: Task Does NOT Inherit Actor Isolation

```swift
// WRONG — no @MainActor, runs on cooperative pool
Task { self.state = newState }

// RIGHT — explicit isolation
Task { @MainActor [weak self] in
    self?.state = newState
}
```

### Rule 5: @Model Objects Never Cross Async Boundaries

```swift
// WRONG — data race
let session = modelContext.model(for: id) as! Session
Task.detached { session.name = "..." }  // CRASH

// RIGHT — pass scalars or PersistentIdentifier
let id = session.persistentModelID
Task.detached {
    let ctx = ModelContext(container)
    let s = ctx.model(for: id) as! Session
    s.name = "..."
}
```

---

## Error Decoder Ring

| Error | Fix |
|-------|-----|
| `Main actor-isolated property can not be mutated from non-isolated context` | Add `@MainActor` or `await MainActor.run {}` |
| `Non-sendable type returned by call crossing isolation boundary` | Extract Sendable values; add `@preconcurrency import` ONLY if compiler demands it |
| `Reference to captured var in concurrently-executing code` | `[weak self]` or capture as `let` |
| `Required condition is false: IsFormatSampleRateAndChannelCountValid` | Call `engine.prepare()` before reading format |
| `Cannot start an audio tap when the engine is running` | Install tap BEFORE `engine.start()` |
| `Cannot use staged migration with unknown model version` | Delete app data or implement migration |
| `ssu-cli-app crashed` | Remove `suggestedInvocationPhrase` from non-shortcut intents |

---

## Quick Reference Card — Corrected API Signatures

| API | Correct Signature | Common Hallucination |
|-----|------------------|----------------------|
| FM plain response | `try await session.respond(to: prompt)` → `.content: String` | Forgetting `try await` |
| FM structured | `session.respond(to:, generating: T.self)` → `.content: T` | Wrong param order |
| FM streaming | `session.streamResponse(to: prompt)` → `AsyncSequence` of partials | Treating partials as deltas (they accumulate) |
| FM Tool protocol | `func call(arguments:) async throws -> Value` | `invoke(location:)` — **HALLUCINATED** |
| FM availability | `SystemLanguageModel.default.isAvailable` | `LanguageModelSession.isAvailable` — **DOES NOT EXIST** |
| @Generable | `@Generable struct X { var y: String }` | Using on class (struct only) |
| @Guide | `@Guide(description: "...", .range(...))` | Missing description param |
| SpeechTranscriber | `SpeechTranscriber(locale:, preset:)` | Omitting locale |
| Transcriber results | `transcriber.results` → `AsyncSequence<Result>` | `.text` directly (it's `AttributedString`) |
| Result to String | `String(result.text.characters)` | `result.text as String` (wrong type) |
| SpeechAnalyzer | `SpeechAnalyzer(inputSequence:, modules:)` — it's an **actor** | Treating as struct |
| Liquid Glass | `.glassEffect(.regular, in: .rect(cornerRadius: 12))` | `.background(.glass)` — **DOES NOT EXIST** |
| SwiftData index | `#Index<Model>([\.prop1])` (freestanding macro) | `@Index` — wrong syntax |
| Canvas + Observable | Wrap in `TimelineView(.animation)` | Direct Canvas (never redraws) |
| Color providers | Precompute, `@Sendable`-safe closures | `Color(light:dark:)` inline (background crash) |
| Live Activity families | `.supplementalActivityFamilies([.small, .medium])` | Wrong modifier name |
| nonisolated deinit | `nonisolated deinit { }` | Plain `deinit` in @MainActor class |

---

## Platform Version Reference

| Platform | Minimum | Current | Xcode |
|----------|---------|---------|-------|
| iOS | 26.0 | 26.4 | 17.0+ |
| watchOS | 26.0 | 26.0+ | 17.0+ |
| macOS | 26.0 | 26.0+ | 17.0+ |
| Swift | 6.0 | 6.0 (strict) | — |

## Build Settings

```yaml
SWIFT_VERSION: "6.0"
SWIFT_STRICT_CONCURRENCY: complete
SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
```

---

## Cross-Skill References

| Need | Skill |
|------|-------|
| Swift 6 coding patterns | `ios-standards` |
| Specific concurrency error fixes | `swift6-concurrency` |
| Automated pattern validation | `apple-patterns-check` |
| Design system + Liquid Glass | `apple-design` |
| Build troubleshooting | `ios-build` |
| Live API documentation | Context7 MCP (Optional — via `/setup`) |

---

## FoundationModels Beta Issue Tracker

| Issue | Fixed In | Workaround |
|-------|----------|------------|
| `includeSchemaInPrompt: false` ignored | Beta 2 | — |
| Primitive tool arguments fail | Beta 2 | — |
| Recursive `@Generable` types crash | Beta 3 | Flatten types |
| Chinese language unsupported | Beta 3 | — |
| Public `@Generable` types bug | Beta 3 | — |
| Duplicate tool names crash | Beta 3 | Unique names |
| Tool calling + guided gen fails | Beta 4 | — |
| Guardrail false positives | Beta 5 | — |
| Enum with associated values crash | Beta 5 | — |
| **Enum assoc. type as Argument** | **OPEN** | Wrap in struct |

---

## When to Consult This Skill

- **Before** writing code with ANY Apple framework listed above
- **When** debugging Swift 6 concurrency errors
- **When** tests pass locally but fail in archive/CI builds
- **When** audio/speech code crashes
- **When** `Canvas` views don't update or `Color` providers crash
- **When** `ssu-cli-app` crashes in App Intents
