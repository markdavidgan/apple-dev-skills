# NaturalLanguage (NLEmbedding) — Community Intelligence

> Loaded for deep debugging of on-device semantic features (clustering, similarity, retrieval).
> Pairs with `intel/community-foundation-models.md` — apps that use FoundationModels for
> generation often use `NLEmbedding` for the cheap, model-free similarity layer underneath it.

**Purpose:** Real-world gotchas for `NLEmbedding` semantic similarity, verified from production
debugging. The headline trap below silently corrupts results with no crash and no error — it is
the kind of bug that ships.

---

## 1. The sentence-vs-word out-of-vocabulary trap (silent corruption)

**Severity:** HIGH — no crash, no thrown error, wrong results.

`NLEmbedding` has two factory methods that fail in **opposite** ways for text outside the model's
trained language. Confusing them produces a feature that looks like it works and quietly returns
garbage.

| API | Behavior on out-of-vocabulary / wrong-language input |
|-----|------------------------------------------------------|
| `NLEmbedding.wordEmbedding(for:)` → `.vector(for: word)` | Returns **`nil`** for an OOV word. Skippable. Averaging a sentence's word vectors naturally drops the unknown words → **degrades gracefully**. |
| `NLEmbedding.sentenceEmbedding(for:)` → `.vector(for: text)` | Returns a **non-`nil` but meaningless** vector for text in a language the model was not trained on. It does **not** signal failure. |

The danger is entirely on the **sentence** side. Feed Tagalog/Taglish (or any non-model language)
into an English `sentenceEmbedding`, and you get a real-looking `[Double]` that has no semantic
relationship to the text. Downstream cosine similarity then invents connections and corrupts
clustering — on the user's own data, with no diagnostic.

### Why it bites

- The `nil`-returning word path makes developers assume the sentence path also signals failure. It
  doesn't.
- There is no `.isSupported(language:)` precondition that the vector call enforces — a model loads
  for a language, but `vector(for:)` will still return *something* for foreign text.
- It only manifests for multilingual users, so it survives English-only testing.

### The remedy — guard with `NLLanguageRecognizer` before embedding a sentence

Detect the dominant language and refuse text that doesn't match the model's language. Allow a
`nil` dominant language through (text too short to detect is usually in the device language and
still embeds meaningfully):

```swift
import NaturalLanguage

func guardedSentenceVector(_ text: String,
                           model: NLEmbedding,
                           modelLanguage: NLLanguage) -> [Double]? {
    let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else { return nil }

    let recognizer = NLLanguageRecognizer()
    recognizer.processString(text)
    if let dominant = recognizer.dominantLanguage, dominant != modelLanguage {
        return nil   // refuse — do NOT embed into a meaningless vector
    }
    return model.vector(for: text)
}
```

**Word-embedding matchers do not need this guard** — their OOV-skip already degrades gracefully.
Only add it where you call `sentenceEmbedding`.

---

## 2. Use canonical bare language subtags, not region-qualified codes

When you choose the guard language from the device locale, use the **canonical subtag**
(`"en"`, `"es"`), never a region-qualified value like `"en-US"`.

`NLLanguageRecognizer.dominantLanguage` always emits the canonical form (`"en"`). If your guard
language is `NLLanguage("en-US")`, the comparison `dominant != modelLanguage` is **always true**,
so the guard rejects **every** note — silently disabling the feature on the default device. This
is a self-inflicted version of the very bug in §1, introduced by the fix.

```swift
// RIGHT — canonical subtag
let code = Locale.current.language.languageCode?.identifier ?? "en"   // "en", not "en-US"
let preferred = NLLanguage(rawValue: code)

// WRONG — region-qualified; never equals the recognizer's canonical "en"
let preferred = NLLanguage(rawValue: Locale.preferredLanguages.first ?? "en")  // "en-US"
```

Note that `NLEmbedding.sentenceEmbedding(for: NLLanguage("en-US"))` *does* return a model, which
hides the mistake until you notice the feature embeds nothing.

---

## 3. `NLEmbedding` is not `Sendable`; cosine conventions differ

- `NLEmbedding` is a reference type that is not `Sendable`. Holding one as a stored property under
  Swift 6 strict concurrency typically needs `nonisolated(unsafe)` (it is internally thread-safe
  for `vector(for:)`), or confinement to a single actor.
- **Cosine similarity is not one function.** A bare dot product is correct **only** for
  pre-unit-normalized vectors. Raw `NLEmbedding` output is **not** unit-length — a similarity over
  raw vectors must normalize (`dot / (‖a‖·‖b‖)`). Do not share a "cosine" helper between a
  normalizing call site and a dot-product-only one; they will disagree. Some pipelines also clamp
  to `[0, 1]` and/or persist vectors to disk — those are independent choices, not interchangeable.

---

## Quick checklist

- [ ] Embedding whole sentences? Add the `NLLanguageRecognizer` dominant-language guard (§1).
- [ ] Choosing the guard language from locale? Use the canonical subtag, not `xx-YY` (§2).
- [ ] Only word embeddings? No guard needed — OOV-skip degrades gracefully (§1).
- [ ] Sharing a cosine helper? Confirm both sides agree on normalization/clamping (§3).
- [ ] Storing an `NLEmbedding` property under Swift 6? Confine it or `nonisolated(unsafe)` (§3).
