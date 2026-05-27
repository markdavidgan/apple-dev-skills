# FoundationModels Framework -- Complete API Reference

> **THE AUTHORITATIVE REFERENCE FOR ALL FoundationModels APIs**
>
> Last Updated: 2026-04-08
>
> **Purpose:** Prevent crashes from incorrect API usage. Every method signature, every enum case, every type -- verified against Apple developer documentation, WWDC25 sessions (286, 301, 259), and community-verified implementations.
>
> **Sources consulted:**
> - [Foundation Models -- Apple Developer Documentation](https://developer.apple.com/documentation/foundationmodels)
> - [WWDC25-286: Meet the Foundation Models framework](https://developer.apple.com/videos/play/wwdc2025/286/)
> - [WWDC25-301: Deep dive into the Foundation Models framework](https://developer.apple.com/videos/play/wwdc2025/301/)
> - [WWDC25-259: Code-along: Bring on-device AI to your app](https://developer.apple.com/videos/play/wwdc2025/259/)
> - [Code-along 205: Code along with the Foundation Models framework](https://developer.apple.com/videos/play/meet-with-apple/205/)

---

## Table of Contents

1. [Framework Overview](#framework-overview)
2. [SystemLanguageModel](#systemlanguagemodel)
3. [LanguageModelSession](#languagemodelsession)
4. [GenerationOptions](#generationoptions)
5. [Response Types](#response-types)
6. [Transcript System](#transcript-system)
7. [Instructions and Prompt Types](#instructions-and-prompt-types)
8. [@Generable Macro](#generable-macro)
9. [@Guide Macro](#guide-macro)
10. [PartiallyGenerated Types](#partiallygenerated-types)
11. [Tool Protocol](#tool-protocol)
12. [ToolOutput](#tooloutput)
13. [ToolCallContext](#toolcallcontext)
14. [Dynamic Schemas](#dynamic-schemas)
15. [Error Types](#error-types)
16. [Availability Checking -- Complete Guide](#availability-checking)
17. [Streaming Patterns](#streaming-patterns)
18. [Session Lifecycle and Memory](#session-lifecycle-and-memory)
19. [Device Requirements](#device-requirements)
20. [Content Tagging Adapter](#content-tagging-adapter)
21. [Adapter Training (LoRA)](#adapter-training)
22. [Feedback API](#feedback-api)
23. [Crash Prevention Checklist](#crash-prevention-checklist)

---

## Framework Overview

```swift
import FoundationModels
```

**Availability:** iOS 26.0+, iPadOS 26.0+, macOS 26.0+, visionOS 26.0+

The Foundation Models framework provides access to Apple's on-device ~3 billion parameter large language model (2-bit quantized), the same model powering Apple Intelligence. All inference happens on-device via CPU, GPU, and Neural Engine. Zero cost per request. Works offline. Data stays local.

**Key constraints:**
- **4,096 token context window** (combined input + output)
- **Text-only** input/output (no image processing)
- **1 token is approximately 3-4 characters** (Latin scripts) or approximately 1 character (CJK)
- **Approximately 3GB RAM** usage during inference
- **Knowledge cutoff:** End of 2023
- **16 supported languages**

---

## SystemLanguageModel

The entry point for accessing Apple's on-device model.

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct SystemLanguageModel {
    /// The default general-purpose language model
    public static var `default`: SystemLanguageModel { get }
    
    /// Create a model with a specific use case adapter
    public init(useCase: UseCase)
}
```

### Properties

```swift
/// Current availability status of the model
public var availability: Availability { get }

/// Whether the model is available for use (convenience)
public var isAvailable: Bool { get }

/// Languages supported by the model
public var supportedLanguages: [Locale.Language] { get }

/// Context size in tokens
public var contextSize: Int { get async throws }
```

### Methods

```swift
/// Check if a specific locale is supported
public func supportsLocale(_ locale: Locale) -> Bool

/// Get token usage for a transcript
public func tokenUsage(for transcript: Transcript) async throws -> TokenUsage
```

### Nested Types

#### SystemLanguageModel.Availability (enum)

```swift
@available(iOS 26.0, macOS 26.0, *)
public enum Availability: Equatable {
    /// Model is ready to use
    case available
    
    /// Model is not available; see associated reason
    case unavailable(UnavailabilityReason)
}
```

#### SystemLanguageModel.UnavailabilityReason (enum)

```swift
@available(iOS 26.0, macOS 26.0, *)
public enum UnavailabilityReason {
    /// Device hardware does not support Apple Intelligence
    /// (A13 or older chip -- permanent, will never work)
    case deviceNotEligible
    
    /// Apple Intelligence is not enabled in Settings
    /// (compatible hardware, user action required)
    case appleIntelligenceNotEnabled
    
    /// Model is downloading or initializing
    /// (temporary -- poll and retry)
    case modelNotReady
}
```

#### SystemLanguageModel.UseCase (enum)

```swift
@available(iOS 26.0, macOS 26.0, *)
public enum UseCase {
    /// Fine-tuned for tagging, entity extraction, topic detection, classification
    case contentTagging
}
```

### Usage Example

```swift
let model = SystemLanguageModel.default

switch model.availability {
case .available:
    // Proceed with Foundation Models
    let session = LanguageModelSession()
    
case .unavailable(.deviceNotEligible):
    // Permanent limitation -- show fallback UI
    showBasicFallbackView()
    
case .unavailable(.appleIntelligenceNotEnabled):
    // User needs to enable -- show banner
    showEnablementBanner()
    
case .unavailable(.modelNotReady):
    // Temporary -- poll for readiness
    scheduleRetry()
    
@unknown default:
    // Future-proof
    showGenericFallback()
}
```

---

## LanguageModelSession

The primary class for interacting with the on-device model. Manages conversation context, instructions, tools, and transcript.

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, *)
public class LanguageModelSession {
    // See initializers below
}
```

### Initializers

```swift
/// Basic session with default model
public init()

/// Session with custom instructions
public init(instructions: String)

/// Session with instructions builder
public init(@InstructionsBuilder instructions: () -> Instructions)

/// Session with model and instructions
public init(
    model: SystemLanguageModel = .default,
    instructions: String
)

/// Session with model, guardrails, tools, and instructions
public init(
    model: SystemLanguageModel = .default,
    guardrails: Guardrails = .default,
    tools: [any Tool] = [],
    @InstructionsBuilder instructions: () -> Instructions
)

/// Session resumed from a previous transcript
public init(transcript: Transcript)

/// Session with tools (trailing closure for instructions)
public init(
    tools: [any Tool],
    @InstructionsBuilder instructions: () -> Instructions
)
```

**Parameter details:**
- `model`: Defaults to `SystemLanguageModel.default`; use `SystemLanguageModel(useCase:)` for specialized adapters
- `guardrails`: `.default` is always applied and **cannot be disabled** -- enforces Apple's content safety guidelines
- `tools`: Array of `Tool`-conforming instances the model may invoke during generation
- `instructions`: System-level directives defining model persona, behavior, constraints

### Properties

```swift
/// Whether the session is currently generating a response
/// Check before calling respond() -- concurrent calls throw
public var isResponding: Bool { get }

/// Complete record of all interactions in this session
public var transcript: Transcript { get }
```

### Response Methods (Non-Streaming)

```swift
/// Generate a plain text response
public func respond(
    to prompt: String,
    options: GenerationOptions = GenerationOptions(),
    isolation: isolated (any Actor)? = #isolation
) async throws -> Response<String>

/// Generate a plain text response using Prompt builder
public func respond(
    to prompt: Prompt,
    options: GenerationOptions = GenerationOptions(),
    isolation: isolated (any Actor)? = #isolation
) async throws -> Response<String>

/// Generate a structured response (Generable type)
public func respond<Content: Generable>(
    to prompt: String,
    generating type: Content.Type,
    includeSchemaInPrompt: Bool = true,
    options: GenerationOptions = GenerationOptions(),
    isolation: isolated (any Actor)? = #isolation
) async throws -> Response<Content>

/// Generate using Prompt builder + Generable type
public func respond<Content: Generable>(
    to prompt: Prompt,
    generating type: Content.Type,
    includeSchemaInPrompt: Bool = true,
    options: GenerationOptions = GenerationOptions(),
    isolation: isolated (any Actor)? = #isolation
) async throws -> Response<Content>

/// Generate using a dynamic schema
public func respond(
    to prompt: String,
    schema: GenerationSchema,
    options: GenerationOptions = GenerationOptions(),
    isolation: isolated (any Actor)? = #isolation
) async throws -> Response<GeneratedContent>

/// Generate using PromptBuilder trailing closure
public func respond<Content: Generable>(
    generating type: Content.Type,
    includeSchemaInPrompt: Bool = true,
    options: GenerationOptions = GenerationOptions(),
    isolation: isolated (any Actor)? = #isolation,
    @PromptBuilder prompt: () -> Prompt
) async throws -> Response<Content>
```

### Streaming Methods

```swift
/// Stream a plain text response
public func streamResponse(
    to prompt: String,
    options: GenerationOptions = GenerationOptions()
) -> some AsyncSequence<Response<String>, Error>

/// Stream a structured response
public func streamResponse<Content: Generable>(
    to prompt: String,
    generating type: Content.Type,
    includeSchemaInPrompt: Bool = true,
    options: GenerationOptions = GenerationOptions()
) -> some AsyncSequence<Response<Content.PartiallyGenerated>, Error>

/// Stream with Prompt builder + Generable
public func streamResponse<Content: Generable>(
    generating type: Content.Type,
    options: GenerationOptions = GenerationOptions(),
    includeSchemaInPrompt: Bool = true,
    @PromptBuilder prompt: () -> Prompt
) -> some AsyncSequence<Response<Content.PartiallyGenerated>, Error>
```

### Prewarming

```swift
/// Eagerly load session resources to reduce first-response latency
/// Call early (e.g., in .task modifier) before user needs a response
public func prewarm()

/// Prewarm with a prompt prefix hint
public func prewarm(promptPrefix: String)
```

### Critical Constraints

1. **One request at a time:** Calling `respond()` while `isResponding == true` throws a runtime error
2. **Sessions are stateful:** Each call adds to the transcript, consuming context window tokens
3. **Context window limit:** 4,096 tokens total (instructions + all prompts + all responses) -- exceeding throws `exceededContextWindowSize`
4. **Not thread-safe for concurrent writes:** Use from a single actor/task at a time

---

## GenerationOptions

Controls model output behavior.

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct GenerationOptions {
    /// Sampling strategy
    public var sampling: SamplingMethod?
    
    /// Temperature (0.0 to 2.0)
    /// Lower = more deterministic/predictable
    /// Higher = more creative/varied
    public var temperature: Double?
    
    /// Maximum number of tokens to generate in the response
    public var maximumResponseTokens: Int?
    
    public init(
        sampling: SamplingMethod? = nil,
        temperature: Double? = nil,
        maximumResponseTokens: Int? = nil
    )
}
```

### SamplingMethod (enum)

```swift
@available(iOS 26.0, macOS 26.0, *)
public enum SamplingMethod {
    /// Deterministic -- always picks the highest probability token
    /// Same input produces identical output (within same model version)
    case greedy
    
    /// Top-p (nucleus) sampling with probability threshold
    case random(probabilityThreshold: Double, seed: UInt64? = nil)
    
    /// Top-k sampling
    case random(top: Int, seed: UInt64? = nil)
}
```

### Usage Examples

```swift
// Deterministic output
let options = GenerationOptions(sampling: .greedy)

// Creative output
let options = GenerationOptions(temperature: 1.5)

// Stable creative with seed
let options = GenerationOptions(
    sampling: .random(top: 40, seed: 42),
    temperature: 0.8
)

// Limited length
let options = GenerationOptions(maximumResponseTokens: 200)

// Combined
let options = GenerationOptions(
    sampling: .greedy,
    temperature: 0.5,
    maximumResponseTokens: 100
)
```

---

## Response Types

### Response<Content>

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct Response<Content> {
    /// The generated content
    /// - For text: String
    /// - For structured: the @Generable type instance
    /// - For dynamic schema: GeneratedContent
    /// - For streaming structured: T.PartiallyGenerated
    public var content: Content { get }
}
```

### Accessing Response Content

```swift
// Plain text
let response = try await session.respond(to: "Hello")
let text: String = response.content

// Structured output
let response = try await session.respond(
    to: "Generate a recipe",
    generating: Recipe.self
)
let recipe: Recipe = response.content

// Dynamic schema
let response = try await session.respond(to: "Generate data", schema: schema)
let generated: GeneratedContent = response.content
let title = try generated.value(String.self, forProperty: "title")
```

---

## Transcript System

Sessions maintain a `Transcript` containing all interactions.

### Transcript

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct Transcript {
    /// All entries in chronological order
    public var entries: [Entry]
    
    /// Initialize with specific entries (for resuming sessions)
    public init(entries: [Entry])
}
```

### Transcript.Entry (enum)

```swift
@available(iOS 26.0, macOS 26.0, *)
public enum Entry {
    /// System instructions provided at session creation
    case instructions(Instructions)
    
    /// User prompt
    case prompt(Prompt)
    
    /// Model response
    case response(Response)
    
    /// Tool calls made by the model
    case toolCalls([ToolCall])
    
    /// Output returned from tool execution
    case toolOutput(ToolOutput)
}
```

### Transcript.ToolCall

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct ToolCall {
    /// Name of the tool that was called
    public var toolName: String { get }
}
```

### Context Window Recovery Pattern

```swift
// When exceededContextWindowSize is caught, create a new session
// with a condensed transcript (keep instructions + last exchange)
func recoverFromContextOverflow(session: LanguageModelSession) -> LanguageModelSession {
    let allEntries = session.transcript.entries
    var condensedEntries: [Transcript.Entry] = []
    
    // Keep instructions (first entry)
    if let first = allEntries.first {
        condensedEntries.append(first)
    }
    
    // Keep last response
    if allEntries.count > 1, let last = allEntries.last {
        condensedEntries.append(last)
    }
    
    let condensed = Transcript(entries: condensedEntries)
    return LanguageModelSession(transcript: condensed)
}
```

---

## Instructions and Prompt Types

### Instructions

System-level directives that guide model behavior for the entire session.

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct Instructions {
    public init(_ content: String)
}

/// Result builder for composing instructions
@resultBuilder
public struct InstructionsBuilder {
    // Supports string literals, string interpolation, conditionals
}
```

**Usage:**

```swift
// Simple string
let session = LanguageModelSession(instructions: "You are a helpful assistant.")

// Builder syntax
let session = LanguageModelSession {
    "You are a helpful recipe assistant."
    "Always suggest healthy alternatives."
    if isVegetarian {
        "The user is vegetarian -- never suggest meat."
    }
}
```

**Key behavior:** Instructions take precedence over prompts. The model prioritizes instruction directives over user prompt content.

### Prompt

User input delivered to the model during active sessions.

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct Prompt {
    public init(_ content: String)
}

/// Result builder for composing prompts
@resultBuilder
public struct PromptBuilder {
    // Supports string literals, string interpolation, conditionals,
    // and @Generable instances (auto-serialized as examples)
}
```

**Usage:**

```swift
// Simple string
let response = try await session.respond(to: "Tell me a joke")

// Prompt builder
let response = try await session.respond(
    generating: Itinerary.self
) {
    "Generate a \(dayCount)-day itinerary to \(landmark.name)."
    if kidFriendly {
        "The itinerary must be kid-friendly."
    }
    "Here is an example of the desired format:"
    Itinerary.exampleTrip  // @Generable instances auto-serialize
}
```

---

## @Generable Macro

Marks a struct or enum for type-safe structured output via constrained decoding.

### Declaration

```swift
@attached(member)
@attached(extension, conformances: Generable, ConvertibleFromGeneratedContent)
public macro Generable() = #externalMacro(module: "FoundationModelsPlugin", type: "GenerableMacro")
```

### What it generates at compile time

1. A `generationSchema: GenerationSchema` static property
2. An initializer for parsing generated text into the type
3. A `PartiallyGenerated` nested type (mirror with all optional properties) for streaming
4. Conformance to `Generable` and `ConvertibleFromGeneratedContent` protocols

### Supported Property Types

| Type | Example | Notes |
|------|---------|-------|
| `String` | `let name: String` | Most common |
| `Int` | `let count: Int` | Integer values |
| `Double` | `let price: Double` | Floating point |
| `Float` | `let score: Float` | Single precision |
| `Decimal` | `let amount: Decimal` | Precise decimals |
| `Bool` | `let isActive: Bool` | Boolean values |
| `[T]` | `let items: [Item]` | Arrays of generable types |
| `T?` | `let note: String?` | Optional generable types |
| `@Generable struct` | `let address: Address` | Nested generable structs |
| `@Generable enum` | `let status: Status` | Generable enums |
| Recursive types | `let children: [Node]` | Self-referencing types |

### Struct Examples

```swift
@Generable
struct Recipe {
    let name: String
    let prepTimeMinutes: Int
    let ingredients: [Ingredient]
    let instructions: [String]
}

@Generable
struct Ingredient {
    let name: String
    let quantity: Double
    let unit: Unit
}
```

### Enum Examples

```swift
// Simple enum (each case is a possible value)
@Generable
enum Unit: String, Codable {
    case grams, kilograms, milliliters, liters
    case teaspoons, tablespoons, cups, pieces
}

// Enum with associated values
@Generable
enum Encounter {
    case orderCoffee(String)
    case wantToTalkToManager(complaint: String)
}
```

### Property Order Matters

Properties are generated in declaration order. The model generates token-by-token, so:
- Place independent properties first
- Place dependent properties (like summaries) last
- Place the most important/anchoring properties at the top

```swift
@Generable
struct StudyPlan {
    // GOOD: subject first, then dependent topics
    let subject: String
    let weeklyTopics: [String]    // depends on subject
    let prerequisites: [String]   // depends on subject
    let summary: String           // depends on everything above
}
```

### Constraints

- ALL stored properties must be generable types
- The type must be a struct or enum
- Cannot use computed properties in the schema
- Keep types small -- each property consumes context window tokens

---

## @Guide Macro

Provides constraints and descriptions to guide model output for individual properties within `@Generable` types.

### Declaration

```swift
@attached(peer)
public macro Guide(
    description: String? = nil,
    _ constraints: GuideConstraint...
) = #externalMacro(module: "FoundationModelsPlugin", type: "GuideMacro")

@attached(peer)
public macro Guide(
    _ regex: some RegexComponent
) = #externalMacro(module: "FoundationModelsPlugin", type: "GuideMacro")
```

### All Constraint Types

#### String Constraints

```swift
// Natural language description
@Guide(description: "A full name for the character")
let name: String

// Restrict to specific values (simulates enum for strings)
@Guide(.anyOf(["PG", "PG-13", "R", "G"]))
let rating: String

// Fixed constant value
@Guide(.constant("My Online School"))
let school: String

// Regex pattern
@Guide(Regex {
    Capture {
        ChoiceOf {
            "Mr"
            "Mrs"
        }
    }
    ". "
    OneOrMore(.word)
})
let name: String
```

#### Numeric Constraints

```swift
// Inclusive range
@Guide(.range(1...10))
let level: Int

// Minimum only
@Guide(.minimum(1))
let minValue: Int

// Maximum only
@Guide(.maximum(100))
let maxValue: Int
```

#### Array Constraints

```swift
// Exact count
@Guide(.count(3))
let attributes: [Attribute]

// Variable count with range
@Guide(.count(.range(1...5)))
let items: [String]

// Minimum count
@Guide(.minimumCount(1))
let required: [String]

// Maximum count
@Guide(.maximumCount(3))
let topActions: [String]
```

#### Combined Constraints

```swift
@Generable
struct NPC {
    @Guide(description: "A full name")
    let name: String
    
    @Guide(.range(1...10))
    let level: Int
    
    @Guide(.count(3))
    let attributes: [Attribute]
    
    @Guide(description: "An exciting coffee order", .anyOf(["Latte", "Espresso", "Cappuccino"]))
    let coffeeOrder: String
}
```

---

## PartiallyGenerated Types

Auto-generated by `@Generable` macro. A mirror of the original struct where all properties become optional. Used during streaming to represent incomplete generation.

### Declaration (auto-generated)

```swift
// For this @Generable struct:
@Generable
struct Recipe {
    let name: String
    let ingredients: [Ingredient]
}

// The macro generates:
extension Recipe {
    struct PartiallyGenerated: Identifiable, ConvertibleFromGeneratedContent {
        var name: String?          // Optional version
        var ingredients: [Ingredient.PartiallyGenerated]?  // Optional + partial
    }
}
```

### Usage in Streaming

```swift
@State private var recipe: Recipe.PartiallyGenerated?

let stream = session.streamResponse(
    to: "Suggest a recipe",
    generating: Recipe.self
)

for try await partial in stream {
    // partial.content is Recipe.PartiallyGenerated
    recipe = partial.content
    
    // Properties fill in incrementally
    if let name = recipe?.name {
        // name is available
    }
    // ingredients may still be nil or partially filled
}
```

---

## Tool Protocol

Enables the model to autonomously call functions in your app during generation.

### Protocol Declaration

```swift
@available(iOS 26.0, macOS 26.0, *)
public protocol Tool {
    /// Unique identifier for this tool
    var name: String { get }
    
    /// Natural language description of what this tool does
    var description: String { get }
    
    /// The arguments type (must be @Generable)
    associatedtype Arguments: Generable
    
    /// Execute the tool with generated arguments
    /// IMPORTANT: The return type is String or ToolOutput (varies by API version)
    func call(arguments: Arguments) async throws -> ToolOutput
    
    /// Enhanced version with session context (beta 26.1+)
    func call(arguments: Arguments, context: ToolCallContext) async throws -> ToolOutput
}
```

**CRITICAL NOTES:**
- The method is named `call(arguments:)`, **NOT** `invoke(...)`. Using `invoke` will not compile.
- `Arguments` must be a nested `@Generable` struct
- The model decides when/if to call tools -- you do not invoke them directly
- Tools can be called multiple times per request, and in parallel
- Tool instances maintain state across the session lifetime (developer-controlled)

### Complete Tool Implementation

```swift
struct FindContactTool: Tool {
    let name = "findContact"
    let description = "Finds a contact by generation."
    
    @Generable
    struct Arguments {
        @Guide(description: "The generation to search")
        let generation: Generation
        
        @Generable
        enum Generation {
            case babyBoomers
            case genX
            case millennial
            case genZ
        }
    }
    
    func call(arguments: Arguments) async throws -> ToolOutput {
        // Your implementation here
        let contactName = "Jane Doe"
        return ToolOutput(contactName)
    }
}
```

### Tool with State

```swift
class FindContactTool: Tool {
    let name = "findContact"
    let description = "Finds a contact, avoiding repeats."
    
    // State maintained across calls within the session
    var pickedContacts = Set<String>()
    
    @Generable
    struct Arguments {
        let generation: String
    }
    
    func call(arguments: Arguments) async throws -> ToolOutput {
        // Filter out already-picked contacts
        let available = allContacts.filter { !pickedContacts.contains($0) }
        guard let picked = available.randomElement() else {
            return ToolOutput("No more contacts available.")
        }
        pickedContacts.insert(picked)
        return ToolOutput(picked)
    }
}
```

### Registering Tools

```swift
let session = LanguageModelSession(
    tools: [FindContactTool(), GetWeatherTool()],
    instructions: { "Use tools to provide accurate information." }
)
```

### Tool Calling Flow (Internal)

1. Session initialized with tools array
2. User prompt sent via `respond(to:)`
3. Model generates tool call(s) autonomously based on prompt + tool descriptions
4. Framework executes `call(arguments:)` on the appropriate tool(s)
5. Tool output inserted into transcript as `.toolOutput` entry
6. Model incorporates tool results in final response to user

---

## ToolOutput

The return type from `Tool.call(arguments:)`.

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct ToolOutput {
    /// Create from a string
    public init(_ content: String)
    
    /// Create from structured generated content
    public init(_ content: GeneratedContent)
}
```

### Usage

```swift
// String output (most common)
func call(arguments: Arguments) async throws -> ToolOutput {
    return ToolOutput("The temperature in Paris is 72F.")
}

// Structured output
func call(arguments: Arguments) async throws -> ToolOutput {
    let content = GeneratedContent(properties: [
        "temperature": 72,
        "unit": "fahrenheit"
    ])
    return ToolOutput(content)
}
```

---

## ToolCallContext

Provides session transcript access to tools (available in beta 26.1+).

### Declaration

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct ToolCallContext {
    /// The session's transcript at the time of the tool call
    public var transcript: [Transcript.Entry] { get }
}
```

### Usage

```swift
func call(arguments: Arguments, context: ToolCallContext) async throws -> ToolOutput {
    // Inspect previous tool calls to avoid duplicates
    var previousCalls: [Transcript.ToolCall] = []
    
    for entry in context.transcript {
        if case .toolCalls(let calls) = entry {
            previousCalls.append(contentsOf: calls)
        }
    }
    
    // Count > 1 because the CURRENT call is already in the transcript
    let myPreviousCalls = previousCalls.filter { $0.toolName == self.name }
    if myPreviousCalls.count > 1 {
        return ToolOutput("Already called -- skipping duplicate.")
    }
    
    return ToolOutput("Result here.")
}
```

**IMPORTANT:** When checking `targetCalls.count`, compare against `> 1` (not `> 0`) because the current invocation is already in the transcript when `call(arguments:context:)` is invoked.

---

## Dynamic Schemas

For runtime-defined structured output (when the schema is not known at compile time).

### DynamicGenerationSchema

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct DynamicGenerationSchema {
    /// Schema for a primitive type
    public init(type: Any.Type)
    
    /// Schema for a named object with properties
    public init(name: String, properties: [Property])
    
    /// Schema for an array of a given schema
    public init(arrayOf: DynamicGenerationSchema)
    
    /// Schema referencing another named type
    public init(referenceTo: String)
    
    public struct Property {
        public let name: String
        public let schema: DynamicGenerationSchema
    }
}
```

### GenerationSchema

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct GenerationSchema {
    /// Create a schema with a root type and dependencies
    public init(
        root: DynamicGenerationSchema,
        dependencies: [DynamicGenerationSchema]
    ) throws
}
```

### GeneratedContent

```swift
@available(iOS 26.0, macOS 26.0, *)
public class GeneratedContent {
    /// Extract a typed value for a property
    public func value<T>(_ type: T.Type, forProperty name: String) throws -> T
}
```

### Usage Example

```swift
// Build schema at runtime
var riddleSchema = DynamicGenerationSchema(
    name: "Riddle",
    properties: [
        .init(name: "question", schema: DynamicGenerationSchema(type: String.self)),
        .init(name: "answers", schema: DynamicGenerationSchema(
            arrayOf: DynamicGenerationSchema(referenceTo: "Answer")
        ))
    ]
)

var answerSchema = DynamicGenerationSchema(
    name: "Answer",
    properties: [
        .init(name: "text", schema: DynamicGenerationSchema(type: String.self)),
        .init(name: "isCorrect", schema: DynamicGenerationSchema(type: Bool.self))
    ]
)

let schema = try GenerationSchema(
    root: riddleSchema,
    dependencies: [answerSchema]
)

let session = LanguageModelSession()
let response = try await session.respond(to: "Generate a riddle", schema: schema)

let question = try response.content.value(String.self, forProperty: "question")
let answers = try response.content.value([GeneratedContent].self, forProperty: "answers")
```

---

## Error Types

### LanguageModelSession.GenerationError (enum)

```swift
@available(iOS 26.0, macOS 26.0, *)
public enum GenerationError: Error {
    /// Model assets are not available (downloading, missing)
    /// Retryable -- wait and try again
    case assetsUnavailable(Context)
    
    /// Context window limit exceeded (4,096 tokens)
    /// NOT retryable with same session -- create new session with condensed transcript
    case exceededContextWindowSize(Context)
    
    /// Content violated safety guardrails (prompt or response)
    /// NOT retryable with same prompt -- rephrase
    case guardrailViolation(Context)
    
    /// Language or locale not supported by the model
    /// NOT retryable -- check supportedLanguages first
    case unsupportedLanguageOrLocale(Context)
    
    /// Guide constraint could not be satisfied
    case unsupportedGuide(Context)
    
    /// Failed to decode structured output into target type
    case decodingFailure(Context)
    
    /// Rate limited (app backgrounded, system resource contention)
    /// Retryable after delay
    case rateLimited(Context)
    
    /// Multiple concurrent requests on the same session
    /// Check isResponding before calling respond()
    case concurrentRequests(Context)
}
```

**Note:** The exact set of cases may vary between beta versions. Always include `@unknown default` in switch statements.

### LanguageModelSession.ToolCallError

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct ToolCallError: Error {
    /// The tool instance that failed
    public var tool: any Tool { get }
    
    /// The original error thrown by the tool's call() method
    public var underlyingError: Error { get }
}
```

### Error Handling Pattern

```swift
do {
    let response = try await session.respond(to: prompt)
    print(response.content)
} catch let error as LanguageModelSession.GenerationError {
    switch error {
    case .assetsUnavailable:
        // Wait and retry
        try? await Task.sleep(for: .seconds(5))
        // retry...
        
    case .exceededContextWindowSize:
        // Create new session with condensed transcript
        session = recoverFromContextOverflow(session: session)
        
    case .guardrailViolation:
        // Show user-friendly message, do NOT retry same prompt
        showMessage("I can't help with that request.")
        
    case .unsupportedLanguageOrLocale:
        // Check supported languages
        showMessage("This language is not supported.")
        
    case .unsupportedGuide:
        // @Guide constraint could not be met
        showMessage("Could not generate with those constraints.")
        
    case .decodingFailure:
        // Structured output parsing failed -- retry or simplify schema
        // retry...
        
    case .rateLimited:
        // Wait and retry
        try? await Task.sleep(for: .seconds(2))
        // retry...
        
    case .concurrentRequests:
        // Bug -- should check isResponding before calling
        assertionFailure("Concurrent request on same session")
        
    @unknown default:
        showMessage("An unexpected error occurred.")
    }
} catch {
    // Non-generation errors (network, system, etc.)
    print("Unexpected error: \(error)")
}
```

---

## Availability Checking

### The Complete Availability Check Flow

**Step 1: Compile-time availability**

```swift
if #available(iOS 26.0, *) {
    // FoundationModels APIs are available at compile time
} else {
    // iOS 25 or earlier -- no FoundationModels
}
```

**Step 2: Runtime model availability**

```swift
@available(iOS 26.0, *)
func checkAvailability() -> Bool {
    let model = SystemLanguageModel.default
    
    switch model.availability {
    case .available:
        return true
    case .unavailable(.deviceNotEligible):
        // A13 or older -- will NEVER work on this device
        return false
    case .unavailable(.appleIntelligenceNotEnabled):
        // Compatible hardware, user hasn't enabled
        // Prompt user, but don't block UI
        return false
    case .unavailable(.modelNotReady):
        // Compatible + enabled, downloading model
        // Poll every 10-30 seconds
        return false
    @unknown default:
        return false
    }
}
```

**Step 3: Language support**

```swift
let model = SystemLanguageModel.default
let supportedLanguages = model.supportedLanguages
guard supportedLanguages.contains(Locale.current.language) else {
    // Show language unsupported message
    return
}
```

### Convenience Property

```swift
// Quick boolean check (combines all states)
if SystemLanguageModel.default.isAvailable {
    // Ready to use
}
```

### SwiftUI Availability Pattern

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

### Retry Strategy for `.modelNotReady`

```swift
func waitForModel() async -> Bool {
    for _ in 0..<30 {  // Max 5 minutes (30 x 10s)
        if SystemLanguageModel.default.isAvailable {
            return true
        }
        try? await Task.sleep(for: .seconds(10))
    }
    return false
}
```

### Hardware Requirements Summary

| Device | Chip | Supported |
|--------|------|-----------|
| iPhone 15 Pro / Pro Max | A17 Pro | Yes |
| iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max | A18 / A18 Pro | Yes |
| iPhone 17 series | A19 | Yes |
| iPhone 15 / 15 Plus | A16 | **No** |
| iPhone 14 and earlier | A15 and earlier | **No** |
| iPad with M1 or later | M-series | Yes |
| Mac with M1 or later | M-series | Yes |
| Apple Vision Pro | M2 | Yes |

**Additional prerequisites beyond hardware:**
- Apple Intelligence enabled in Settings
- 7 GB free storage (for model download)
- Supported language configured
- Model fully downloaded
- Sufficient battery (not in Low Power Mode restrictions)
- Not in Game Mode

---

## Streaming Patterns

### Basic Text Streaming

```swift
let stream = session.streamResponse(to: "List 5 facts about space")

for try await partial in stream {
    // partial.content accumulates -- each iteration has more text
    print(partial.content)
}
```

### Structured Streaming

```swift
@State var recipe: Recipe.PartiallyGenerated?

let stream = session.streamResponse(
    to: "Suggest a healthy recipe",
    generating: Recipe.self
)

for try await partial in stream {
    recipe = partial.content
    // recipe.name may be filled, recipe.ingredients may still be nil
}
```

### SwiftUI Streaming Pattern

```swift
@Observable
@MainActor
class RecipeGenerator {
    var recipe: Recipe.PartiallyGenerated?
    var isGenerating = false
    var error: Error?
    
    private let session: LanguageModelSession
    
    init() {
        session = LanguageModelSession {
            "You are a recipe assistant."
        }
    }
    
    func generate(ingredients: [String]) async {
        isGenerating = true
        error = nil
        defer { isGenerating = false }
        
        do {
            let prompt = "Suggest a recipe using: \(ingredients.joined(separator: ", "))"
            let stream = session.streamResponse(
                to: prompt,
                generating: Recipe.self
            )
            
            for try await partial in stream {
                recipe = partial.content
            }
        } catch {
            self.error = error
        }
    }
    
    func prewarm() {
        session.prewarm()
    }
}

struct RecipeView: View {
    @State private var generator = RecipeGenerator()
    
    var body: some View {
        VStack {
            if let recipe = generator.recipe {
                if let name = recipe.name {
                    Text(name)
                        .font(.title)
                        .contentTransition(.opacity)
                }
            }
            
            if generator.isGenerating {
                ProgressView()
            }
        }
        .task {
            generator.prewarm()
        }
    }
}
```

---

## Session Lifecycle and Memory

### Session State

- Sessions are **stateful containers** managing instructions, prompts, and responses
- The transcript grows with each interaction, consuming context window tokens
- When the context window is full, `exceededContextWindowSize` is thrown

### Single-Turn vs Multi-Turn

```swift
// Single-turn: create fresh session per request (isolated tasks)
func summarize(text: String) async throws -> String {
    let session = LanguageModelSession()
    let response = try await session.respond(to: "Summarize: \(text)")
    return response.content
}

// Multi-turn: reuse session for conversation continuity
class ChatManager {
    private var session = LanguageModelSession()
    
    func send(message: String) async throws -> String {
        let response = try await session.respond(to: message)
        return response.content
        // Session transcript now includes this exchange
    }
    
    func reset() {
        session = LanguageModelSession()  // Fresh context
    }
}
```

### Memory Management

- Sessions do not require explicit cleanup or disposal
- Creating a new `LanguageModelSession()` effectively resets the context
- Model memory (approximately 3GB) is shared by the OS -- managed by the system daemon
- The framework uses a shared KV-cache across sessions for efficiency

### Prewarming for Latency

```swift
// Call early to reduce first-response latency
session.prewarm()

// In SwiftUI
.task {
    generator.session.prewarm()
}

// With prompt hint
session.prewarm(promptPrefix: "Generate a recipe")
```

---

## Content Tagging Adapter

A specialized fine-tuned adapter (LoRA rank-32) optimized for classification tasks.

```swift
// Create tagging-optimized session
let taggingModel = SystemLanguageModel(useCase: .contentTagging)
let session = LanguageModelSession(model: taggingModel)

// Entity extraction
@Generable
struct TagResult {
    let topics: [String]
    let sentiment: String
}

let result = try await session.respond(
    to: "Analyze: 'The new iPhone camera is incredible but battery life needs work'",
    generating: TagResult.self
).content

// Custom classification
@Generable
struct EmotionResult {
    @Guide(.maximumCount(3))
    let actions: [String]
    @Guide(.maximumCount(3))
    let emotions: [String]
}

let session = LanguageModelSession(
    model: SystemLanguageModel(useCase: .contentTagging),
    instructions: { "Tag the 3 most important actions and emotions." }
)
```

---

## Adapter Training

Custom fine-tuned adapters via LoRA (Low-Rank Adaptation).

| Property | Value |
|----------|-------|
| Method | LoRA, rank-32 |
| Size | Approximately 160MB per adapter |
| Training | Python toolkit on Mac with Apple Silicon (32+ GB RAM) or Linux GPU |
| Deployment | Background Assets framework |
| Compatibility | Single model version only (retraining required on OS updates) |
| Entitlement | Requires "Foundation Models Framework Adapter Entitlement" |

---

## Feedback API

For reporting model quality issues to Apple via Feedback Assistant.

```swift
@available(iOS 26.0, macOS 26.0, *)
public struct LanguageModelFeedbackAttachment: Codable {
    public var input: [String]
    public var output: [String]
    public var sentiment: Sentiment
    public var issues: [Issue]
    public var desiredOutputExamples: [[String]]
    
    public enum Sentiment: String, Codable {
        case positive
        case negative
        case neutral
    }
    
    public struct Issue: Codable {
        public var category: Category
        public var explanation: String
        
        public enum Category: String, Codable {
            case incorrect
            case offensive
            case irrelevant
            case incomplete
        }
    }
}
```

---

## Crash Prevention Checklist

### Before Using FoundationModels

- [ ] Check `#available(iOS 26.0, *)` at compile time
- [ ] Check `SystemLanguageModel.default.availability` at runtime
- [ ] Handle ALL unavailability reasons (deviceNotEligible, appleIntelligenceNotEnabled, modelNotReady)
- [ ] Check `supportedLanguages` if accepting user locale input
- [ ] Never assume the model is available -- always guard

### Before Calling respond()

- [ ] Check `session.isResponding == false` (concurrent calls crash)
- [ ] Wrap in do/catch with all `GenerationError` cases
- [ ] Include `@unknown default` in switch statements (future-proofing)
- [ ] Consider context window usage -- do not send extremely long prompts
- [ ] Use `prewarm()` before first call for better UX

### When Using @Generable

- [ ] All stored properties are generable types (String, Int, Double, Float, Decimal, Bool, arrays, optional, nested @Generable)
- [ ] Property order is intentional (dependencies flow top-to-bottom)
- [ ] Keep schema small to conserve context window tokens
- [ ] Use `@Guide` constraints to improve output quality

### When Using Tools

- [ ] Tool method is `call(arguments:)` -- NOT `invoke()`
- [ ] `Arguments` is a nested `@Generable` struct
- [ ] Return type is `ToolOutput` -- NOT raw `String`
- [ ] Tool `name` is a short English identifier (no spaces or special chars)
- [ ] Tool `description` is a concise one-sentence explanation

### When Handling Errors

- [ ] Catch `LanguageModelSession.GenerationError` specifically (not just generic Error)
- [ ] Handle `exceededContextWindowSize` by creating a new session with condensed transcript
- [ ] Handle `guardrailViolation` with user-friendly message (do NOT retry same prompt)
- [ ] Handle `rateLimited` with exponential backoff retry
- [ ] Handle `assetsUnavailable` with retry after delay

### When Streaming

- [ ] Use `for try await` pattern
- [ ] Access `partial.content` -- properties are optional in `PartiallyGenerated`
- [ ] Handle partial state in UI (nil checks on all properties)
- [ ] Support cancellation via Task

---

## Quick API Lookup Table

| What You Want | Method | Returns |
|---------------|--------|---------|
| Plain text response | `session.respond(to: String)` | `Response<String>` |
| Structured response | `session.respond(to:, generating: T.self)` | `Response<T>` |
| Dynamic schema response | `session.respond(to:, schema:)` | `Response<GeneratedContent>` |
| Stream text | `session.streamResponse(to: String)` | `AsyncSequence<Response<String>>` |
| Stream structured | `session.streamResponse(to:, generating: T.self)` | `AsyncSequence<Response<T.PartiallyGenerated>>` |
| Check availability | `SystemLanguageModel.default.availability` | `Availability` enum |
| Quick available check | `SystemLanguageModel.default.isAvailable` | `Bool` |
| Reduce latency | `session.prewarm()` | `Void` |
| Check language | `model.supportsLocale(locale)` | `Bool` |
| Resume session | `LanguageModelSession(transcript:)` | New session |
| Use tagging model | `SystemLanguageModel(useCase: .contentTagging)` | Specialized model |

---

*Framework: FoundationModels | Platforms: iOS 26.0+, macOS 26.0+, iPadOS 26.0+, visionOS 26.0+ | Last Updated: 2026-04-08*
