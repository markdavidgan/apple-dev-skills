---
name: localization
category: engineering
description: Localize and internationalize an app with String Catalogs (.xcstrings), correct pluralization and grammar agreement, RTL layout, locale-aware formatting, and pseudolocalization testing. Use when adding languages, translating UI, fixing plurals or gendered strings, supporting right-to-left languages, formatting dates/numbers/currency per locale, or producing localized screenshots. Trigger on "localization", "internationalization", "i18n", "String Catalog", ".xcstrings", "translate", "RTL", "plural", or "locale".
---

# Localization & Internationalization

**Make the app correct in every language — not just translated, but grammatical, well-formatted, and laid out right.** Marketing/keyword localization for the store is `asc-aso`; this is the app itself.

---

## String Catalogs (`.xcstrings`) — the modern way

Add a **String Catalog** (`Localizable.xcstrings`). Xcode extracts strings from `Text("…")`, `String(localized:)`, and `LocalizedStringResource` automatically and tracks translation state per language.

```swift
Text("Welcome")                                   // SwiftUI localizes automatically
let msg = String(localized: "Welcome")            // non-SwiftUI code
let resource: LocalizedStringResource = "Welcome" // pass localizable strings around
```

- **Give translators context** with a comment: `Text("Open", comment: "Verb — opens the document")`. "Open" the verb vs adjective translate differently.
- **Never build sentences by concatenation.** `Text("You have \(n) items")` is one interpolated key; `Text("You have ") + Text("\(n)") + Text(" items")` is untranslatable word-order garbage.
- SwiftUI string literals are localized by default; **non-literal** `Text(someString)` is **not** — wrap with `LocalizedStringKey`/`String(localized:)` deliberately.

---

## Plurals & grammar agreement

Languages have 1–6 plural categories (English 2, Arabic 6, Japanese 1). Don't hand-roll `if n == 1`.

- In the String Catalog, set a key to **vary by plural** and provide the `zero/one/two/few/many/other` forms the language needs. The catalog applies the right one for the count automatically.
- Use **automatic grammar agreement** for inflection: `^[\(count) item](inflect: true)` pluralizes the noun to match the number in supported languages.
- Vary strings **by device** (iPhone vs iPad wording) and by **gender/term** where the catalog supports it.

---

## Right-to-left (RTL)

- Use **leading/trailing**, never **left/right**, in layout and padding — SwiftUI then mirrors automatically for Arabic/Hebrew.
- Mirror directional SF Symbols correctly (most do automatically; check chevrons/arrows).
- Test by forcing it: scheme → Run → Options → **App Language: Right-to-Left Pseudolanguage**, or `.environment(\.layoutDirection, .rightToLeft)` in a preview.
- Numbers, code, and some content stay LTR inside RTL text — let the system handle bidi; don't reorder manually.

---

## Locale-aware formatting (never format by hand)

```swift
let price = 12.5.formatted(.currency(code: "EUR"))     // "12,50 €" in de, "€12.50" in en
let when  = date.formatted(.dateTime.weekday().hour())  // locale order & 12/24h
let count = 5.formatted()                                // grouping separators per locale
let dist  = Measurement(value: 5, unit: UnitLength.kilometers).formatted()  // mi vs km
```

- Decimal/grouping separators, currency placement, first day of week, 12/24h, and units all vary by locale — `.formatted()` / `FormatStyle` handle them. Manual `String(format:)` for numbers/dates is a localization bug.
- Don't assume currency from language; price comes from the storefront (see `app-store-pricing`).

---

## Pseudolocalization — find bugs before translators do

Run with Xcode's built-in pseudolanguages (scheme → Options → App Language):

- **Accented Pseudolanguage** — surfaces hard-coded (non-localized) strings; they stay plain ASCII.
- **Double-Length Pseudolanguage** — German/Finnish run ~30–40% longer; truncation and clipped buttons show up immediately.
- **Right-to-Left Pseudolanguage** — catches left/right layout assumptions.

Also enable **Show non-localizable strings** to flag literals you forgot to wrap.

---

## Screenshots & assets

- Generate **localized screenshots** by running UI tests per language (`xcodebuild ... -testLanguage de -testRegion DE`, or fastlane snapshot) and upload per locale (see `asc-submission`). See `ios-simulate` for the capture harness.
- Localize images/audio that contain text via asset catalog localization or `Bundle` lookups; in SPM use `Bundle.module`.

---

## Pre-ship checklist

- [ ] All user-facing strings in the String Catalog (no literals — pseudoloc clean).
- [ ] Plurals use catalog variations / `inflect:`, not `if n == 1`.
- [ ] Layout uses leading/trailing; RTL pseudolanguage looks right.
- [ ] Dates/numbers/currency via `.formatted()` / `FormatStyle`.
- [ ] Double-length pseudolanguage shows no truncation.
- [ ] Dynamic Type still fits at the longest language (cross-check `ios-accessibility`).
- [ ] Localized screenshots/metadata per shipped locale.
