# iOS 26 Foundation Models — Community Intelligence

> Loaded for deep debugging. Real-world gotchas from Swift Forums, developer forums, and production apps.
> For quick reference, use essentials/foundation-models.md instead.

**Report Date:** April 7, 2026  
**Sources:** Stack Overflow, Apple Developer Forums, Swift Forums, GitHub, Medium, Hacking With Swift, Kodeco, Reddit, Twitter/X, Technical Blogs  
**Purpose:** Real-world bugs, workarounds, performance data, and production gotchas for iOS 26 Foundation Models

---

## Executive Summary

iOS 26 Foundation Models is a 3-billion parameter on-device LLM with a 4096-token context window. While promising for privacy-first AI, developers have hit significant real-world issues in production. This report documents verified bugs, crashes, performance issues, and community-verified workarounds.

**Critical Finding:** The framework has NO model versioning guarantee—Apple can change the model or guardrails in any iOS update, potentially breaking your app without warning.

---

## 1. REAL BUG REPORTS WITH SOLUTIONS

### 1.1 EXC_BAD_ACCESS Crash on LanguageModelSession Initialization

**Severity:** CRITICAL  
**Status:** Confirmed on macOS 26 Beta 4, M1 Pro devices

**Bug Description:**
App crashes immediately with `EXC_BAD_ACCESS` when initializing `LanguageModelSession()`, even though `SystemLanguageModel.default.availability` returns `.available`.

**Affected Projects:**
- FoundationModelsTripPlanner (Apple sample)
- SwiftTranscriptionSampleApp (Apple sample)
- Custom apps on M1 Pro devices

**Developer Report (Apple Forums):**
> "Whenever I try to initialize a LanguageModelSession (let session = LanguageModelSession()), my app crashes with EXC_BAD_ACCESS. SystemLanguageModel.default.availability returns available. I tried running the two sample projects I found that use Foundation Models, and they both also crash—immediately on launch."

**Workarounds:**
1. **Region/Locale Issue:** Some EU-based developers (Austria) report this issue—may be related to locale restrictions in beta
2. **Canvas Destination Fix:** For previews, switch from "My Mac (Designed for iPad)" to "My Mac (AppKit)"
3. **Clean Build:** Delete derived data, clean build folder, restart Xcode

**Feedback IDs:** Multiple reports, no official fix confirmed

---

### 1.2 Model Catalog Error: "No Underlying Assets"

**Severity:** CRITICAL  
**Error:**
```
Error Domain=com.apple.UnifiedAssetFramework Code=5000 
"There are no underlying assets (neither atomic instance nor asset roots) 
for consistency token for asset set com.apple.modelcatalog"
```

**Root Causes & Solutions:**

#### A. Siri Language Mismatch (Most Common)
**Reported by:** Multiple Stack Overflow users, joschua.io  
**Solution:**
- macOS Language: English (US) 
- Siri Language: MUST also be English (US)
- Even though Apple docs say English (Australia/UK/etc.) are supported, the models only download with English (US) Siri setting

**Developer Report:**
> "The error persisted until I noticed that my macOS language was set to English (US) but the Siri language defaulted to English (Australia). Once I switched the Siri language to English (United States) the Apple Intelligence checkbox appeared and it started downloading the models."

#### B. macOS Version Requirement for Simulator
**Error Message (Xcode 26 Beta 5+):**
```
assetsUnavailable(...debugDescription: "Host is not running macOS 26.")
```

**Solution:** Simulator REQUIRES macOS 26 Tahoe to access Foundation Models. The simulator borrows models from the host macOS.

#### C. Beta 2 Sandbox Restriction Regression
**Error:**
```
com.apple.modelcatalog.catalog: connection error: 
Sandbox restriction. Error 159
```

**Status:** Worked in Beta 1, broke in Beta 2  
**Solution:** Upgrade to later beta or stable release

---

### 1.3 Guardrail Violation Errors (False Positives)

**Severity:** HIGH  
**iOS 26.4 Regression Confirmed**

**Bug Description:**
After iOS 26.4 update, developers report massive increase in `GenerationError.refusal` errors for completely benign prompts.

**Developer Reports (Apple Forums):**
> "After installing iOS 26.4 the Foundation Models instruction following and tool calling capabilities have been degraded significantly. The model is not usable anymore."
>
> "This works: 'Is the car plugged in?'  
> This does not work: 'Tell me if the car is plugged in'"
>
> "Anything with the word 'frunk' (front trunk) triggers Guardrail Violation. Phrases like 'Lock Pride' also trigger Guardrail Violation (Pride is the name of the car)."

**False Positive Triggers:**
- Word "frunk" (automotive term)
- "Lock Pride" (car name)
- Political news content (mainstream sources like Politico)
- "Tell me if..." phrasing

**Workarounds:**
1. Rephrase prompts to be more neutral/educational
2. Remove excessive punctuation (!!!, ???)
3. Avoid excessive capitalization
4. Avoid spam-like keywords ("click", "buy", "free", "win", "urgent", "act now")

**Feedback ID:** FB17904424 (news summarization guardrail issues)

---

### 1.4 Context Window 90% Full After Single Prompt (Adapter Bug)

**Severity:** CRITICAL for Adapters  
**Status:** Under investigation by Apple

**Bug Description:**
When using a trained LoRA adapter, the context window fills to 90% after a single simple prompt. Without the adapter, the same prompt uses only 1% of context.

**Developer Report:**
> "I have been able to train an adapter on Google's Colaboratory. I am able to start a LanguageModelSession and load it with my adapter. The problem is that after one simple prompt, the context window is 90% full. If I start the session without the adapter, the same simple prompt consumes only 1% of the context window."

**Root Cause Analysis:**
The issue appears to be related to verbose system prompts embedded in training data. Apple's guidance:

> "Your system prompt seems to be extremely verbose. Instead of embedding all instructions/examples in the system message, we want to try to just let the model learn the patterns from training examples."

**Recommended Training Format:**
```json
{
  "role": "system",
  "content": "A conversation between a user and a helpful assistant.",
  "tools": [/* tool definition */]
},
{
  "role": "user",
  "content": "Create a music player widget"
},
{
  "role": "assistant",
  "content": "",
  "tool_calls": [/* tool call */]
}
```

**NOT RECOMMENDED:**
- Embedding full few-shot examples in system prompt
- Including verbose instructions in system message
- Training with full conversation examples in system prompt

---

### 1.5 @Generable Macro Not Found in Playgrounds

**Severity:** MEDIUM  
**Error:**
```
external macro implementation type 'FoundationModelsMacros.GenerableMacro' 
could not be found for macro '@Generable'; 
plugin for module 'FoundationModelsMacros' not found
```

**Solution:** 
- Ensure you're using Xcode project (not standalone playground)
- FoundationModels macros require a proper app target with macro support
- Playground support is limited/non-functional for macros

---

### 1.6 Adapter Training: Base Model Signature Mismatch

**Severity:** CRITICAL for Custom Adapters  
**Error:**
```
Adapter is not compatible with the current system base model.
compatibleAdapterNotFound
```

**Technical Details:**
The adapter training toolkit hardcodes a `BASE_SIGNATURE` hash:
```python
BASE_SIGNATURE = "9799725ff8e851184037110b422d891ad3b92ec1"
```

When Apple updates the system model, this signature changes and previously trained adapters become incompatible.

**Developer Impact:**
> "Any guidance on how the Foundation Models framework derives and verifies the base model signature—or how to regenerate it for beta 4—would be greatly appreciated."

**Current Status:** No official workaround. Apple has not committed to versioning strategy.

---

### 1.7 visionOS Symbol Not Found Error

**Severity:** CRASH  
**Error:**
```
dyld[904]: Symbol not found: 
_$s16FoundationModels10TranscriptV7entriesACSayAC5EntryOG_tcfC
```

**Occurs:** visionOS 26 beta 2 device launch  
**Status:** Framework binary mismatch between beta versions

---

## 2. PERFORMANCE BENCHMARKS FROM REAL APPS

### 2.1 Context Window Specifications

| Metric | Value | Notes |
|--------|-------|-------|
| **Context Window** | 4096 tokens | Hard limit—throws error if exceeded |
| **Approx. Words** | ~3000 English words | Varies by language and content |
| **Error Type** | `exceededContextWindowSize` | Fatal error—must recreate session |

**Critical Finding:** Apple does NOT expose a public tokenizer. Token estimation is heuristic-only:

> "Apple does not expose a tokenizer publicly... treat this as an empirical note rather than a guarantee."

**Token Estimation Guidelines:**
- Emojis tokenize to many pieces
- Non-Latin languages consume more tokens per character
- Code/text ratio varies significantly

### 2.2 Real-World Performance Measurements

**From System26 Benchmark App (GitHub: withcaldera/system26):**

| Device | Throughput (TPS) | TTFT (ms) | Memory Usage |
|--------|-----------------|-----------|--------------|
| iPhone 15 Pro | ~20-30 TPS | <500ms | ~1GB model + overhead |
| M3 Max Mac | ~30-50 TPS | <300ms | ~1GB model + overhead |
| iPad Pro M4 | ~25-35 TPS | <400ms | ~1GB model + overhead |

**Observations:**
- Time to First Token (TTFT) is very fast—good UX even for longer generations
- Streaming is essential for good perceived performance
- 3B parameter model = ~1GB RAM footprint

### 2.3 Memory Constraints

**From Developer Reports:**
- Adapter training requires significant GPU memory
- MPS backend OOM reported: "MPS allocated: 22.64 GB, max allowed: 22.64 GB"
- Training recommendation: Use Google Colab or high-memory Mac (M3 Max+ with 36GB+ RAM)

---

## 3. GOTCHAS NOT IN APPLE'S DOCS

### 3.1 Model Versioning Risk (CRITICAL)

**Developer Question (Apple Forums):**
> "Has Apple made any commitment to versioning the Foundation Models on device? What if you build a feature that works great on 26.0 but they change the model or guardrails in 26.1 and it breaks your feature, is your only recourse filing Feedback or pulling the feature from the app? Will there be a way to specify a model version like in all of the server based LLM provider APIs?"

**Apple Response:** NONE. No commitment to versioning.  
**Risk Level:** HIGH

**Implications:**
- No way to pin to a specific model version
- Guardrails can change between iOS releases
- Prompt engineering that works today may break tomorrow
- No server-side API style versioning available

**Mitigation:**
- Extensive testing on each iOS update
- Graceful degradation paths
- Fallback to server-side models for critical features
- Monitor for `refusal` errors and adapt

### 3.2 Temperature Range Changed

**Original Beta:** Temperature allowed >1.0  
**Final iOS 26:** Temperature limited to 0.0-1.0 range  
**Warning Generated:** If you use values >1.0

### 3.3 Session Reuse is CRITICAL for Context

**Anti-pattern (loses context):**
```swift
func generate() {
    let session = LanguageModelSession() // New session every time
    let response = try await session.respond(to: prompt)
}
```

**Correct pattern (maintains context):**
```swift
@State private var session = LanguageModelSession()

func generate() {
    let response = try await session.respond(to: prompt)
}
```

**Gotcha:** Creating new sessions loses all conversation history and context.

### 3.4 isResponding Property Behavior

**Critical Rule:**
> "You must not attempt to create future responses while the isResponding property is true."

**Implementation:**
```swift
Button("Generate") { /* ... */ }
    .disabled(session.isResponding)
```

### 3.5 No Token Estimation API

**Gap:** Apple provides NO way to count tokens before sending.  
**Workaround (from zats.io):**
```swift
extension Transcript {
    var estimatedText: String {
        reduce(into: "") { result, entry in
            switch entry {
            case .instructions: break
            case .prompt(let prompt):
                result.append("User:" + /* text from segments */)
            case .response(let response):
                result.append("AI:" + /* text from segments */)
            case .toolCalls, .toolOutput: break
            }
        }
    }
}
```

**Strategy:** Trigger summarization at 70-80% of estimated context.

### 3.6 Language/Locale Restrictions

**Error:**
```
GenerativeModelsAvailability.Parameters: Initialized with invalid language code: en-GB. 
Expected to receive two-letter ISO 639 code. e.g. 'zh' or 'en'. Falling back to: en
```

**Gotcha:** Framework expects two-letter ISO codes, not full locale identifiers.

### 3.7 Model Not Available on Non-Apple Intelligence Devices

**Device Support:**
- iPhone 15 Pro and later
- iPad Pro M1 and later  
- Mac M1 and later

**Simulator:** Requires host Mac with Apple Intelligence enabled

---

## 4. RECOMMENDED THIRD-PARTY RESOURCES

### 4.1 Open-Source Implementations

| Project | Description | URL |
|---------|-------------|-----|
| **OpenFoundationModels** | 100% API-compatible open implementation supporting OpenAI, Anthropic, MLX, Ollama | github.com/1amageek/OpenFoundationModels |
| **AnyLanguageModel** | Unified API for local and remote LLMs | Chinese community project |
| **System26** | Performance monitoring app for on-device AI | github.com/withcaldera/system26 |
| **FoundationChat** | SwiftUI chat app example | github.com/Dimillian/FoundationChat |

### 4.2 React Native Bridge

| Project | Description | URL |
|---------|-------------|-----|
| **react-native-apple-foundation-models** | React Native module for Foundation Models | github.com/ratley/react-native-apple-foundation-models |

**Features:**
- Mirrors `SystemLanguageModel.default.availability`
- Graceful fallbacks for unsupported platforms
- TypeScript definitions

### 4.3 Tutorials & Courses

| Resource | Type | URL |
|----------|------|-----|
| **Kodeco (Ray Wenderlich)** | Full course + video | kodeco.com/ios/paths/new-ios26/48744203-apple-foundation-models |
| **Hacking With Swift** | Book chapter (Swift AI Playbook) | hackingwithswift.com |
| **Create With Swift** | Tutorial | createwithswift.com/exploring-the-foundation-models-framework/ |
| **AppCoda** | Tutorial | appcoda.com/foundation-models/ |
| **Mobisoft Infotech** | Complete guide | mobisoftinfotech.com/resources/blog/app-development/apple-intelligence-apps-ios-26-on-device-ai-guide |

### 4.4 Technical Deep Dives

| Resource | Topic | URL |
|----------|-------|-----|
| **zats.io** | Context window management | zats.io/blog/making-the-most-of-apple-foundation-models-context-window/ |
| **joschua.io** | Guardrail error fix | joschua.io/posts/2025/08/23/guardrail-error-xcode-26/ |

### 4.5 Community Skill/Plugin

| Resource | Description | URL |
|----------|-------------|-----|
| **apple_foundation_models_claude_skill** | Claude Code skill for Foundation Models | github.com/Eyadkelleh/apple_foundation_models_claude_skill |

---

## 5. GITHUB REPOS WITH GOOD EXAMPLES

### 5.1 Official-Style Examples

```
FoundationChat (Dimillian)
├── Full SwiftUI chat implementation
├── SwiftData persistence
├── Tool integration example
└── Streaming response handling
```

### 5.2 Tutorial Projects

```
Foundation-Model-Tutorial (Khalidelommali)
├── Tool calling with EventKit
├── Calendar integration
├── MVVM architecture
└── Privacy-first patterns
```

### 5.3 Benchmark/Utility

```
System26 (withcaldera)
├── Real-time LLM metrics
├── TPS measurement
├── TTFT measurement
├── Memory tracking
└── Thermal analysis
```

### 5.4 Cross-Platform Bridge

```
react-native-apple-foundation-models (ratley)
├── TypeScript definitions
├── Availability checking
├── Error handling
└── Platform fallbacks
```

---

## 6. PRODUCTION RECOMMENDATIONS

### 6.1 Context Window Management Strategy

**Sliding Window Approach:**
```swift
// Keep last N messages
let maxMessages = 10
var conversationHistory: [Message] = []

func addMessage(_ message: Message) {
    conversationHistory.append(message)
    if conversationHistory.count > maxMessages {
        conversationHistory.removeFirst()
    }
}
```

**Opportunistic Summarization (70% threshold):**
```swift
if estimatedTokenCount > (4096 * 0.7) {
    let summary = await generateSummary()
    conversationHistory = [systemPrompt, summary]
}
```

### 6.2 Error Handling Pattern

```swift
do {
    let response = try await session.respond(to: prompt)
} catch LanguageModelSession.GenerationError.exceededContextWindowSize {
    // Recreate session with summary
    await recreateSessionWithSummary()
} catch LanguageModelSession.GenerationError.refusal {
    // Rephrase and retry
    await rephraseAndRetry(prompt)
} catch LanguageModelSession.GenerationError.guardrailViolation {
    // Log for analysis
    analytics.logGuardrailViolation(prompt)
}
```

### 6.3 Availability Check Pattern

```swift
var isAvailable: Bool {
    switch SystemLanguageModel.default.availability {
    case .available: return true
    case .unavailable(let reason):
        switch reason {
        case .deviceNotEligible:
            showUpgradeMessage()
        case .appleIntelligenceNotEnabled:
            showEnableInstructions()
        case .modelNotReady:
            showDownloadingSpinner()
        }
        return false
    }
}
```

### 6.4 Recommended App Architecture

```
App
├── AI Feature Coordinator
│   ├── Availability Checker
│   ├── Session Manager (handles context)
│   ├── Error Handler
│   └── Fallback Manager (server-side LLM)
├── Foundation Models Interface
│   ├── LanguageModelSession wrapper
│   ├── Context window tracker
│   └── Token estimator (heuristic)
└── UI Layer
    ├── Loading states
    ├── Error states
    └── Fallback UI
```

---

## 7. FEEDBACK IDs FOR TRACKING

| Issue | Feedback ID | Status |
|-------|-------------|--------|
| Guardrail false positives | FB17904424 | Open |
| Siri language requirement | FB19844387 | Open |
| Adapter context window bug | Multiple threads | Under investigation |
| Model versioning request | Multiple threads | No response |
| EXC_BAD_ACCESS crash | Multiple reports | Open |

---

## 8. SUMMARY: BUILDING FOR PRODUCTION

### DO

1. **Always check availability** before using the model
2. **Implement graceful fallbacks** to server-side LLMs
3. **Manage context window proactively** at 70-80% threshold
4. **Use streaming responses** for better UX
5. **Handle all error cases** especially `refusal` and `exceededContextWindowSize`
6. **Test on real devices**—simulator requires macOS 26
7. **Monitor for iOS updates** that may change model behavior

### DON'T

1. **Don't rely on Foundation Models for critical features** without fallback
2. **Don't exceed 4096 tokens**—it throws a fatal error, not truncation
3. **Don't create multiple concurrent sessions**—check `isResponding`
4. **Don't use verbose system prompts in adapter training**
5. **Don't assume model behavior is stable** across iOS versions
6. **Don't use temperature >1.0**—deprecated in final release

### WATCH OUT FOR

1. iOS 26.4+ guardrail regression—benign prompts being refused
2. Adapter training signature mismatches between beta versions
3. Context window filling rapidly with adapters (90% after one prompt bug)
4. Siri language must match OS language for models to download
5. No public tokenizer—token counting is estimation only

---

## 9. COMMUNITY SENTIMENT

**Positive:**
- Privacy-first approach appreciated
- Fast TTFT enables responsive UX
- No API keys or external dependencies
- Good for simple on-device tasks

**Concerns:**
- No model versioning is a major risk for production
- 4096 token limit severely constrains use cases
- Guardrail false positives limit content types
- Adapter training documentation is lacking
- Context window management is manual (no automatic truncation)

**Overall Assessment:** Foundation Models is suitable for simple, non-critical features with robust fallbacks. Not recommended as primary AI infrastructure until model versioning and larger context windows are available.

---

*Report compiled from public developer forums, GitHub issues, Stack Overflow, and technical blogs. All sources verified as of April 2026.*
