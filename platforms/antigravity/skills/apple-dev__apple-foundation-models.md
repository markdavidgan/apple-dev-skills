---
name: apple-foundation-models
category: engineering
description: On-device AI with Apple's Foundation Models framework (import FoundationModels) in iOS 26 / Apple Intelligence — LanguageModelSession, guided generation with @Generable/@Guide, streaming, tool calling, and availability gating. Use when the user wants on-device LLM features, Apple Intelligence integration, "summarize/classify/extract on device", structured generation, "@Generable", or asks about the Foundation Models framework. For UI design of AI features see apple-design.
---

# Apple Foundation Models (On-Device AI)

**Build private, offline, no-cost AI features on Apple's on-device foundation model** (iOS 26 / macOS 26 / Apple Intelligence), via `import FoundationModels`. The model runs on-device: zero server cost, works offline, data never leaves the device.

> **Verify signatures as you go.** This framework is new and evolving. Use the **apple-docs MCP** (`check_availability` for OS/version gating, `get_symbol` for exact API shapes, `list_framework FoundationModels`) before committing to a signature. The patterns below are stable; treat specific initializer/parameter names as "confirm against live docs," in the spirit of `ios26-api-reference`.

---

## Right-sizing: what this model is (and isn't)

The on-device model is a **small (~3B-class) language model**, not a frontier chatbot.

**Great at:** summarization, classification, tagging, extraction, rewriting, short-form generation, structured output from unstructured text, semantic routing.

**Not for:** authoritative world knowledge, math/code reasoning at scale, long documents beyond the context window, anything where a confident hallucination is unacceptable. For those, call a server model — don't force the on-device model past its weight class.

If a task needs world facts, ground it: pass the facts in the prompt (retrieval), don't expect the model to *know* them.

---

## 1. Gate on availability — always

The model is absent on ineligible devices, when Apple Intelligence is off, or while assets download. Check **before** showing any AI UI.

```swift
import FoundationModels

let model = SystemLanguageModel.default

switch model.availability {
case .available:
    // show the feature
case .unavailable(let reason):
    // .deviceNotEligible, .appleIntelligenceNotEnabled, .modelNotReady — degrade gracefully
    break
}
```

Never assume availability. Provide a non-AI fallback path for every AI feature (older devices, EU/region/enterprise restrictions, model still downloading).

---

## 2. A basic session

```swift
let session = LanguageModelSession(
    instructions: "You are a concise assistant that summarizes notes in one sentence."
)

let response = try await session.respond(to: "Summarize: \(noteText)")
print(response.content)   // String
```

- **`instructions`** = the system prompt: role, rules, output style. Set once at session creation; don't put per-call data here.
- The **session keeps a transcript** — follow-up `respond` calls have prior context. Reuse a session for a conversation; create a fresh one for independent tasks.
- Wrap calls in `do/catch` — generation can fail (guardrails, context overflow, unsupported language).

---

## 3. Guided generation — get typed Swift values, not strings

This is the framework's superpower: describe an output type with `@Generable` and get a **decoded, validated Swift value** instead of parsing free text or fragile JSON.

```swift
@Generable
struct Recipe {
    @Guide(description: "A short, appetizing dish name")
    let title: String

    @Guide(description: "Total minutes to cook", .range(1...240))
    let minutes: Int

    @Guide(description: "Each ingredient as a separate line")
    let ingredients: [String]
}

let response = try await session.respond(
    to: "Create a recipe using leftover rice and eggs.",
    generating: Recipe.self
)
let recipe = response.content   // a fully-typed Recipe
```

- `@Generable` on structs/enums makes the type generatable; `@Guide` adds natural-language hints and constraints (ranges, counts, allowed patterns).
- Guided generation constrains decoding so the result **conforms to your type** — no manual JSON parsing, far fewer "model returned malformed output" bugs.
- Enums model classification cleanly: a `@Generable enum Sentiment { case positive, neutral, negative }` turns the model into a typed classifier.

---

## 4. Streaming — show partial output as it generates

```swift
let stream = session.streamResponse(to: prompt)
for try await partial in stream {
    // partial is a progressively-filled snapshot — bind to SwiftUI state
    liveText = partial.content
}
```

Stream for anything user-visible and longer than a few words — perceived latency drops sharply. Works with guided generation too (partials fill in field-by-field).

---

## 5. Tool calling — let the model call your code

Give the model capabilities (fetch data, perform an action) it invokes when useful.

```swift
struct WeatherTool: Tool {
    let name = "getWeather"
    let description = "Get the current temperature for a city."

    @Generable
    struct Arguments {
        @Guide(description: "City name")
        let city: String
    }

    func call(arguments: Arguments) async throws -> ToolOutput {
        let temp = try await WeatherService.temperature(for: arguments.city)
        return ToolOutput("\(temp)°C in \(arguments.city)")
    }
}

let session = LanguageModelSession(
    tools: [WeatherTool()],
    instructions: "Answer weather questions using the getWeather tool."
)
let answer = try await session.respond(to: "Is it cold in Oslo?")
```

The model decides when to call the tool, with arguments it generates (typed via `@Generable`), then incorporates the result. Use tools to keep the model grounded in *your* real data instead of letting it guess.

---

## 6. Tuning & robustness

- **`GenerationOptions`** — pass per-call to set sampling (e.g. temperature, max response tokens). Lower temperature for classification/extraction; higher for creative copy.
- **Prewarm** — call `session.prewarm()` when you know a request is imminent (e.g. user focuses a text field) to cut first-token latency.
- **Context window is finite** — long transcripts overflow. Catch the context-window error, then summarize-and-restart the session or trim history.
- **Guardrails** — the framework applies safety guardrails; handle the guardrail-violation error by softening the prompt or showing a fallback. Don't surface raw errors to users.
- **Languages** — supported-language coverage is limited; check the model's supported languages before offering the feature in a locale.

---

## Error handling shape

```swift
do {
    let response = try await session.respond(to: prompt, generating: Recipe.self)
    use(response.content)
} catch let error as LanguageModelSession.GenerationError {
    // guardrail violation, context window exceeded, unsupported language, etc.
    showFallback(for: error)
} catch {
    showGenericFallback()
}
```

Always have a fallback UI. On-device AI is an *enhancement*, never a hard dependency.

---

## When to reach for this vs. alternatives

| Need | Use |
|------|-----|
| Private, offline, free, short-form NLP | **Foundation Models (this skill)** |
| Typed/structured extraction from text | **Foundation Models + `@Generable`** |
| System-wide writing tools / image generation | Apple Intelligence system features (Writing Tools, Image Playground APIs) |
| Frontier reasoning, long context, world knowledge | A server LLM you call over the network |
| Pure on-device classification with a custom model | Core ML (train your own) |

Design the *experience* of AI features (latency states, fallbacks, trust cues) with `apple-design`; test deterministically by injecting a stubbed model boundary per `swift-testing`.
