# FoundationModels -- iOS 26 Essentials

> For deep reference: load `reference/foundation-models-reference.md`
> For expert guide: load `guides/expert-foundation-models.md`
> For community intel: load `intel/community-foundation-models.md`

**Framework:** `import FoundationModels` | iOS 26.0+, macOS 26.0+, iPadOS 26.0+, visionOS 26.0+

On-device ~3B parameter LLM (2-bit quantized). Zero cost. Works offline. Data stays local.
- 4,096 token context window (input + output combined)
- Text-only (no images)
- ~3GB RAM during inference
- 16 supported languages

---

## Correct API Signatures (vs Common Hallucinations)

| What | CORRECT | HALLUCINATED (will not compile) |
|------|---------|-------------------------------|
| Tool method | `func call(arguments: Arguments) async throws -> String` (any `PromptRepresentable`) | ~~`func invoke(...)`~~, ~~`func execute(...)`~~ |
| Availability check | `SystemLanguageModel.default.isAvailable` | ~~`LanguageModelSession.isAvailable`~~, ~~`FoundationModels.isAvailable`~~ |
| Availability enum | `SystemLanguageModel.default.availability` | ~~`LanguageModelSession.availability`~~ |
| Unavailability reason | `.unavailable(.deviceNotEligible)` | ~~`.notSupported`~~, ~~`.hardwareUnavailable`~~ |
| @Generable target | `struct` or `enum` only | ~~`class`~~ |
| @Guide first param | `description:` (named parameter) | ~~positional string without label~~ |
| Tool return type | `String`, `[String]`, or any `PromptRepresentable` (`@Generable` types qualify) | ~~`ToolOutput`~~ (no such top-level type), ~~`any Sendable`~~ |
| Tool arguments type | Nested `@Generable struct Arguments` | ~~`[String: Any]`~~, ~~`Codable`~~ |
| Streaming partials | Accumulate (each emission is full state so far) | ~~Deltas (incremental diffs)~~ |
| Session init with tools | `LanguageModelSession(tools:instructions:)` | ~~`LanguageModelSession(tools:systemPrompt:)`~~ |
| Structured response | `session.respond(to:, generating: T.self)` | ~~`session.generate(T.self, from:)`~~ |
| Prewarm method | `session.prewarm()` | ~~`session.warmUp()`~~, ~~`session.prepare()`~~ |
| Context size | `model.contextSize` (async throws) | ~~`model.maxTokens`~~, ~~`session.contextLimit`~~ |

---

## Crash Prevention Patterns

### 1. Tool Protocol: `call(arguments:)` NOT `invoke()`

```swift
// WRONG -- will not compile
struct MyTool: Tool {
    func invoke(args: MyArgs) async throws -> String { ... }  // NO
}

// RIGHT
struct MyTool: Tool {
    let name = "myTool"
    let description = "Does something useful."
    
    @Generable
    struct Arguments {
        let query: String
    }
    
    func call(arguments: Arguments) async throws -> String {  // any PromptRepresentable
        return "result"
    }
}
```

### 2. Availability: Check on SystemLanguageModel, NOT Session

```swift
// WRONG -- no such property
if LanguageModelSession.isAvailable { ... }  // NO

// RIGHT
if SystemLanguageModel.default.isAvailable {
    let session = LanguageModelSession()
    // ...
}

// RIGHT (detailed)
switch SystemLanguageModel.default.availability {
case .available:
    // proceed
case .unavailable(.deviceNotEligible):
    // permanent -- show fallback
case .unavailable(.appleIntelligenceNotEnabled):
    // user action needed
case .unavailable(.modelNotReady):
    // temporary -- poll and retry
@unknown default:
    // future-proof
}
```

### 3. @Generable: Struct/Enum Only, NOT Class

```swift
// WRONG -- classes not supported
@Generable
class Recipe { ... }  // NO

// RIGHT
@Generable
struct Recipe {
    let name: String
    let prepTimeMinutes: Int
    let ingredients: [Ingredient]
}
```

### 4. @Guide: Requires `description:` Label

```swift
// WRONG -- positional string
@Guide("A character name")  // NO -- ambiguous, may not compile
let name: String

// RIGHT
@Guide(description: "A character name")
let name: String

// RIGHT -- with constraints
@Guide(description: "Player level", .range(1...10))
let level: Int

// RIGHT -- constraint only (no description)
@Guide(.anyOf(["PG", "PG-13", "R", "G"]))
let rating: String
```

### 5. Streaming Partials Accumulate (NOT Deltas)

```swift
// WRONG -- treating as deltas
var fullText = ""
for try await partial in stream {
    fullText += partial.content  // NO -- content is already accumulated
}

// RIGHT -- each emission is the full content so far
for try await partial in stream {
    currentText = partial.content  // Replace, don't append
}
```

### 6. Concurrent Session Calls Crash

```swift
// WRONG -- calling respond() while already responding
Task { try await session.respond(to: "first") }
Task { try await session.respond(to: "second") }  // CRASH

// RIGHT -- check isResponding or serialize calls
guard !session.isResponding else { return }
let response = try await session.respond(to: prompt)
```

### 7. Reusing Cached Sessions Safely (Actor Isolation)

Creating a new `LanguageModelSession` for every call wastes context window and adds latency. Caching is correct, but sessions are **not thread-safe** and must be accessed from a single actor. Use an actor wrapper with `isResponding` guards:

```swift
private actor SessionActor {
    private var session: LanguageModelSession?

    var currentSession: LanguageModelSession {
        if let existing = session { return existing }
        let newSession = LanguageModelSession(instructions: "You are a helpful assistant.")
        session = newSession
        Task { try? await newSession.prewarm() }
        return newSession
    }

    func recreateSession() -> LanguageModelSession {
        session = nil
        return currentSession
    }
}

// Usage — always check isResponding before reusing a cached session
func generate(prompt: String) async throws -> String {
    let session = await actor.currentSession
    guard !session.isResponding else { return "" }
    let response = try await session.respond(to: prompt)
    return response.content
}
```

Tool-enabled sessions should be cached separately — tool state persists for the session lifetime:

```swift
private actor SessionActor {
    private var toolSession: LanguageModelSession?

    func toolSession(tools: [any Tool]) -> LanguageModelSession {
        if let existing = toolSession { return existing }
        let newSession = LanguageModelSession(tools: tools, instructions: { "Use tools." })
        toolSession = newSession
        Task { try? await newSession.prewarm() }
        return newSession
    }

    func recreateToolSession(tools: [any Tool]) -> LanguageModelSession {
        toolSession = nil
        return toolSession(tools: tools)
    }
}
```

### 8. Context Window Overflow Recovery

```swift
// WRONG -- retrying on same session after overflow
catch LanguageModelSession.GenerationError.exceededContextWindowSize {
    try await session.respond(to: prompt)  // Will fail again
}

// RIGHT -- create new session with condensed transcript
catch LanguageModelSession.GenerationError.exceededContextWindowSize {
    let entries = session.transcript.entries
    var condensed: [Transcript.Entry] = []
    if let first = entries.first { condensed.append(first) }
    if let last = entries.last { condensed.append(last) }
    session = LanguageModelSession(transcript: Transcript(entries: condensed))
}
```

### 9. Guardrail Violations: Do NOT Retry Same Prompt

```swift
// WRONG -- retrying the same prompt
catch LanguageModelSession.GenerationError.guardrailViolation {
    try await session.respond(to: samePrompt)  // Will fail again
}

// RIGHT
catch LanguageModelSession.GenerationError.guardrailViolation {
    showMessage("I can't help with that request.")  // Rephrase needed
}
```

### 10. De-duplicating tool calls: Count > 1, NOT > 0

There is no `ToolCallContext` type and no `call(arguments:context:)` overload. To detect repeat calls, inspect the session transcript — the current invocation is **already recorded** in it, so guard on `> 1`, not `> 0`.

```swift
// WRONG -- current call is already in the transcript, so > 0 blocks the first call
let myCalls = previousCalls.filter { $0.toolName == self.name }
if myCalls.count > 0 { return "duplicate" }  // Blocks first call!

// RIGHT
if myCalls.count > 1 { return "duplicate" }
```

---

## Known Gotchas

- **Enum associated types as Tool Arguments:** Known beta issue -- enum cases with associated values used as `@Generable` Tool `Arguments` may fail at runtime. Use a flat `@Generable struct` for arguments instead.
- **4,096 token limit is total:** Instructions + all prompts + all responses share the window. Long instructions eat into response capacity.
- **Property order matters in @Generable:** The model generates token-by-token in declaration order. Put independent fields first, summaries/dependent fields last.
- **`prewarm()` is not await:** It returns immediately and loads resources in the background. Call early (e.g., in `.task` modifier).
- **Guardrails cannot be disabled:** `.default` guardrails are always enforced. There is no `.none` option.
- **`isResponding` is not KVO-observable:** Check it before calling `respond()`, but do not try to observe changes on it.
- **Sessions are not thread-safe:** Use from a single actor/task. Concurrent writes produce undefined behavior.
- **`respond()` on the same session is serialized:** Calling `respond()` while another call is in flight throws `concurrentRequests`.
- **Streaming structured output uses `PartiallyGenerated`:** All properties are optional. The final emission is NOT the full type -- you need non-streaming `respond()` for that.
- **Model version coupling:** Custom LoRA adapters are tied to a single model version. OS updates require retraining.
- **`@unknown default` is mandatory:** Apple may add new `GenerationError` cases or `UnavailabilityReason` values between betas.
- **Siri language blocks model download:** Model assets may never download if the Siri language is set to a non-English locale, even on eligible hardware with Apple Intelligence enabled. Check `Locale.preferredLanguages` as a secondary guard if you observe silent `modelNotReady` failures.
- **Swift 6 strict concurrency:** If you see Sendability warnings on `LanguageModelSession`, use `@preconcurrency import FoundationModels` to suppress framework-level concurrency gaps.
- **Conditional compilation:** Use `#if canImport(FoundationModels)` for code that must compile on platforms without the framework (e.g., watchOS, older deployment targets).

---

## Complete Tool Implementation Pattern

The Tool protocol is the #1 source of hallucinated APIs. Here is the complete, correct pattern:

```swift
struct WeatherTool: Tool {
    let name = "getWeather"
    let description = "Gets current weather for a city."
    
    @Generable
    struct Arguments {
        @Guide(description: "City name to look up")
        let city: String
    }
    
    // Return any PromptRepresentable — String works (so do [String] and @Generable types).
    func call(arguments: Arguments) async throws -> String {
        let temp = await WeatherService.temperature(for: arguments.city)
        return "Temperature in \(arguments.city): \(temp)F"
    }
}

// Register tools at session creation
let session = LanguageModelSession(
    tools: [WeatherTool(), CalendarTool()],
    instructions: { "Use tools to provide accurate, real-time information." }
)

// The model autonomously decides when to call tools
let response = try await session.respond(to: "What's the weather in Tokyo?")
// Framework calls WeatherTool.call(arguments:) automatically
```

**Tool calling flow:**
1. Session initialized with tools array
2. User prompt sent via `respond(to:)`
3. Model generates tool call(s) autonomously
4. Framework executes `call(arguments:)` on matched tool(s)
5. Tool output inserted into transcript
6. Model incorporates results in final response

---

## SwiftUI Availability Pattern

```swift
@available(iOS 26.0, *)
struct AIFeatureView: View {
    var body: some View {
        Group {
            switch SystemLanguageModel.default.availability {
            case .available:
                AIContentView()
                
            case .unavailable(.deviceNotEligible):
                ContentUnavailableView(
                    "AI Features Unavailable",
                    systemImage: "cpu",
                    description: Text("This device doesn't support Apple Intelligence.")
                )
                
            case .unavailable(.appleIntelligenceNotEnabled):
                ContentUnavailableView(
                    "Enable Apple Intelligence",
                    systemImage: "sparkles",
                    description: Text("Enable Apple Intelligence in Settings.")
                ) {
                    Button("Open Settings") {
                        if let url = URL(string: UIApplication.openSettingsURLString) {
                            UIApplication.shared.open(url)
                        }
                    }
                }
                
            case .unavailable(.modelNotReady):
                VStack {
                    ProgressView()
                    Text("Downloading AI model...")
                }
                
            case .unavailable:
                ContentUnavailableView(
                    "AI Unavailable",
                    systemImage: "exclamationmark.triangle"
                )
            }
        }
    }
}
```

---

## SwiftUI Streaming ViewModel Pattern

```swift
@Observable
@MainActor
class SuggestionGenerator {
    var suggestion: Suggestion.PartiallyGenerated?
    var isGenerating = false
    var error: Error?
    
    private let session: LanguageModelSession
    
    init() {
        session = LanguageModelSession {
            "You are a helpful assistant."
        }
    }
    
    func generate(prompt: String) async {
        isGenerating = true
        error = nil
        defer { isGenerating = false }
        
        do {
            let stream = session.streamResponse(
                to: prompt,
                generating: Suggestion.self
            )
            for try await partial in stream {
                suggestion = partial.content  // Replace, NOT append
            }
        } catch {
            self.error = error
        }
    }
    
    func prewarm() { session.prewarm() }
}
```

---

## Conditional Compilation

Production code needs **three layers** of gating working together:

```swift
#if canImport(FoundationModels)
import FoundationModels

// Layer 1: Compile-time — the framework exists on this platform
@available(iOS 26.0, *)
func generateSuggestion() async throws -> String {
    // Layer 2: Runtime — the model is downloaded and ready
    guard SystemLanguageModel.default.isAvailable else { return "" }
    let session = LanguageModelSession()
    let response = try await session.respond(to: "Suggest something")
    return response.content
}
#else
// Layer 3: Fallback — the framework is absent (watchOS, older OS)
func generateSuggestion() async throws -> String {
    return ""
}
#endif
```

**When to use which gate:**

| Gate | Use for | Example |
|------|---------|---------|
| `#if canImport(FoundationModels)` | Compile-time framework import | Wrap the entire `import` and all `FoundationModels` types |
| `@available(iOS 26.0, *)` | API availability on types/methods | Mark `ViewModel` methods that call `LanguageModelSession` |
| `SystemLanguageModel.default.isAvailable` | Runtime model readiness | Guard inside the method before creating a session |

**Common mistake — runtime-only gate:**

```swift
// WRONG — will not compile on watchOS or older deployment targets
func generate() async {
    guard SystemLanguageModel.default.isAvailable else { return }
    // LanguageModelSession does not exist at compile time here
}

// RIGHT — three-layer gate
#if canImport(FoundationModels)
@available(iOS 26.0, *)
func generate() async {
    guard SystemLanguageModel.default.isAvailable else { return }
    let session = LanguageModelSession()
    // ...
}
#else
func generate() async { /* fallback */ }
#endif
```

---

## Core API Quick Reference

| What You Want | Method | Returns |
|---------------|--------|---------|
| Plain text | `session.respond(to: String)` | `Response<String>` |
| Structured | `session.respond(to:, generating: T.self)` | `Response<T>` |
| Dynamic schema | `session.respond(to:, schema:)` | `Response<GeneratedContent>` |
| Stream text | `session.streamResponse(to:)` | `AsyncSequence<Response<String>>` |
| Stream structured | `session.streamResponse(to:, generating: T.self)` | `AsyncSequence<Response<T.PartiallyGenerated>>` |
| Check availability | `SystemLanguageModel.default.availability` | `Availability` enum |
| Quick check | `SystemLanguageModel.default.isAvailable` | `Bool` |
| Reduce latency | `session.prewarm()` | `Void` |
| Check language | `model.supportsLocale(locale)` | `Bool` |
| Resume session | `LanguageModelSession(transcript:)` | New session |
| Tagging model | `SystemLanguageModel(useCase: .contentTagging)` | Specialized model |

---

## Session Initializers (Complete)

```swift
LanguageModelSession()                                    // Default model, no instructions
LanguageModelSession(instructions: String)                // String instructions
LanguageModelSession(instructions: () -> Instructions)    // Builder instructions
LanguageModelSession(model:, instructions: String)        // Custom model
LanguageModelSession(model:, guardrails:, tools:, instructions:)  // Full config
LanguageModelSession(transcript:)                         // Resume from transcript
LanguageModelSession(tools:, instructions:)               // Tools with instructions
```

---

## Error Handling (All Cases)

```swift
do {
    let response = try await session.respond(to: prompt)
} catch let error as LanguageModelSession.GenerationError {
    switch error {
    case .assetsUnavailable:        // Retryable after delay
    case .exceededContextWindowSize: // New session with condensed transcript
    case .guardrailViolation:       // Do NOT retry same prompt
    case .unsupportedLanguageOrLocale: // Check supportedLanguages first
    case .unsupportedGuide:         // @Guide constraint unsatisfiable
    case .decodingFailure:          // Retry or simplify @Generable schema
    case .rateLimited:              // Retry with backoff
    case .concurrentRequests:       // Check isResponding first (bug if hit)
    @unknown default:               // Future cases
    }
}
```

---

## @Generable Supported Types

`String` | `Int` | `Double` | `Float` | `Decimal` | `Bool` | `[T]` | `T?` | nested `@Generable struct` | `@Generable enum` | recursive types

**NOT supported:** `class`, computed properties, non-generable stored properties, `Date`, `URL`, `Data`, `UUID`

---

## @Guide Constraints Reference

| Constraint | Applies To | Example |
|------------|-----------|---------|
| `description:` | Any | `@Guide(description: "Full name")` |
| `.anyOf([...])` | String | `@Guide(.anyOf(["A", "B"]))` |
| `.constant(...)` | String | `@Guide(.constant("Fixed"))` |
| `Regex { ... }` | String | `@Guide(Regex { OneOrMore(.digit) })` |
| `.range(...)` | Numeric | `@Guide(.range(1...10))` |
| `.minimum(...)` | Numeric | `@Guide(.minimum(0))` |
| `.maximum(...)` | Numeric | `@Guide(.maximum(100))` |
| `.count(N)` | Array | `@Guide(.count(3))` |
| `.count(.range(...))` | Array | `@Guide(.count(.range(1...5)))` |
| `.minimumCount(N)` | Array | `@Guide(.minimumCount(1))` |
| `.maximumCount(N)` | Array | `@Guide(.maximumCount(10))` |

---

## Quick Checklist

- [ ] `#if canImport(FoundationModels)` for cross-platform compilation
- [ ] `@available(iOS 26.0, *)` on types that use FoundationModels APIs
- [ ] `SystemLanguageModel.default.isAvailable` before creating sessions
- [ ] Handle all `UnavailabilityReason` cases + `@unknown default`
- [ ] `session.isResponding == false` before calling `respond()`
- [ ] Cached sessions accessed from a single actor with `isResponding` guards
- [ ] Tool method is `call(arguments:)` -- never `invoke()`
- [ ] `@Generable` on struct/enum only -- never class
- [ ] Streaming partials accumulate (replace, don't append)
- [ ] `@unknown default` on all `GenerationError` switches
- [ ] `prewarm()` called early (`.task` modifier) for latency
- [ ] Context window budget: instructions + prompts + responses <= 4,096 tokens
- [ ] `@preconcurrency import FoundationModels` if Swift 6 Sendability warnings appear

---

### References

- [FoundationModels -- Apple Developer Documentation](https://developer.apple.com/documentation/foundationmodels)
- [SystemLanguageModel](https://developer.apple.com/documentation/foundationmodels/systemlanguagemodel)
- [LanguageModelSession](https://developer.apple.com/documentation/foundationmodels/languagemodelsession)
- [Generable protocol](https://developer.apple.com/documentation/foundationmodels/generable)
- [Tool protocol](https://developer.apple.com/documentation/foundationmodels/tool)
- [WWDC25-286: Meet the Foundation Models framework](https://developer.apple.com/videos/play/wwdc2025/286/)
- [WWDC25-301: Deep dive into the Foundation Models framework](https://developer.apple.com/videos/play/wwdc2025/301/)
- [WWDC25-259: Code-along: Bring on-device AI to your app](https://developer.apple.com/videos/play/wwdc2025/259/)
