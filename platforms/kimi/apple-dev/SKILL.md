---
name: apple-dev
description: Comprehensive Apple platform development skill covering Swift 6, SwiftUI, design, accessibility, concurrency, App Store Connect, testing, and advanced workflows. Master reference for iOS 26+ development.
---

# Apple Dev Skills — Master Reference

> **Platform Note:** This is a consolidated skill for Kimi Code. All 41 apple-dev skills are included below. For granular skill loading, use Claude Code or Cursor.
> **Repository:** https://github.com/markdavidgan/apple-dev-skills

## Table of Contents

| # | Skill | Domain | Description |
|---|-------|--------|-------------|
| 1 | app-analytics | Workflow | Decide what to measure and how — north-star metric, activation/retention/conversion funnels, a clean event taxonomy, App Store Connect App Analytics, StoreKit/subscription metrics, and privacy-respecting instrumentation. Use when defining product metrics, designing analytics events, measuring retention or conversion, choosing a north-star metric, or interpreting App Analytics. Trigger on "analytics", "metrics", "north star", "funnel", "retention", "activation", "conversion rate", "event tracking", or "what should we measure". |
| 2 | app-brand-identity | Workflow | Create a complete brand identity system for Apple platform apps — wordmark, icon, design tokens, brand voice, and App Store marketing assets. Use when starting a new app, renaming/rebranding, designing a logo, choosing typography, building a design system, or preparing App Store screenshots and preview materials. |
| 3 | app-intents | Workflow | App Intents, Shortcuts, Siri, Spotlight, interactive Widgets, Controls (Control Center / Action button), and Live Activities / Dynamic Island. Use when exposing app actions to Siri/Shortcuts/Spotlight, building an interactive or Lock Screen widget, adding a Control Center control, or showing a Live Activity / Dynamic Island. Trigger on "App Intent", "AppShortcut", "Siri", "Shortcuts", "interactive widget", "Control Widget", "Live Activity", "Dynamic Island", or "ActivityKit". |
| 4 | app-security | Workflow | On-device app security — Keychain storage, Sign in with Apple, biometric auth (Face ID / Touch ID), CryptoKit encryption/hashing, App Attest / DeviceCheck, and certificate pinning. Use when storing tokens/secrets, adding Sign in with Apple, gating with Face ID/Touch ID, encrypting data, verifying device integrity to your server, or pinning TLS certificates. Trigger on "Keychain", "Sign in with Apple", "Face ID", "biometric", "CryptoKit", "App Attest", "encrypt", or "certificate pinning". |
| 5 | app-store-pricing | Workflow | App Store pricing strategy, global equalization, subscription management, and regional pricing decisions using Apple's official 900-price-point system. Use when user asks about pricing tiers, IAP pricing, subscription pricing, regional pricing, price changes, App Store proceeds, base storefront selection, introductory offers, or promotional offers. |
| 6 | apple-architecture-diagram | Quality | Create WWDC-Keynote-ready, self-contained HTML architecture diagrams for Apple platform apps (iOS, macOS, watchOS, tvOS, visionOS). Activates when users ask for app architecture, system design, data flow, module structure, or technical documentation for Apple apps. Produces ultra-beautiful, drill-down capable diagrams with Apple-native design language. |
| 7 | apple-cleanup | Quality | Exhaustive engineering hardening of an iOS app. Reviews for Swift 6 compliance, crash risks, App Store rejection risks, and tech debt; builds a surgical plan; dispatches parallel subagents to fix all P0-P2 issues; then pushes an alpha to TestFlight. Use for pre-submission cleanup and code hardening, not design polish. |
| 8 | apple-design | Quality | Apple platform design system, iOS 26 & macOS 26 Liquid Glass, design tokens, and accessibility-aware previews. Use when building or reviewing SwiftUI views, defining a theme or design tokens, applying Liquid Glass, organizing asset catalogs, or improving visual consistency. Trigger on "design system", "theme", "design tokens", "Liquid Glass", "glassEffect", "SwiftUI styling", or "make the UI consistent". |
| 9 | apple-foundation-models | Quality | On-device AI with Apple's Foundation Models framework (import FoundationModels) in iOS 26 / Apple Intelligence — LanguageModelSession, guided generation with @Generable/@Guide, streaming, tool calling, and availability gating. Use when the user wants on-device LLM features, Apple Intelligence integration, "summarize/classify/extract on device", structured generation, "@Generable", or asks about the Foundation Models framework. For UI design of AI features see apple-design. |
| 10 | apple-patterns-check | Quality | Validate iOS code against Apple's best practices. Run during /ship, before commits, or when reviewing code for Apple-specific compliance. Triggers on "check patterns", "apple check", "pre-commit check", or "validate swift code". |
| 11 | apple-polish | Quality | Design and keynote-readiness craftsmanship review of an iOS app. Evaluates through Jony Ive (visual obsession) and Steve Jobs (demo readiness) perspectives, presents prioritized findings, then orchestrates parallel agents to fix selected issues and push a TestFlight build. Use for design polish, not engineering bugs. |
| 12 | apple-review | Quality | Comprehensive Apple-grade review of an iOS app covering design (Apple design leader perspective), engineering (architecture and code quality), compliance (App Store rejection risks), and keynote readiness (product story and demo quality). Use when asked for a full app review, Apple-quality audit, design critique, HIG compliance check, App Store readiness assessment, or "would Apple approve this", "keynote ready", "WWDC ready". |
| 13 | asc-aso | ASC | App Store Optimization — keyword research, title/subtitle/keyword-field strategy, localized metadata, and conversion-rate optimization for App Store discoverability. Use when the user says "ASO", "app store optimization", "keywords", "improve discoverability", "rank higher", "optimize my listing", "app store keywords", "subtitle", "promotional text", or wants more organic installs. Complements asc-submission (mechanics) and app-store-pricing (economics). |
| 14 | asc-build-check | ASC | Check the latest CI build status and debug failures using the App Store Connect MCP server. Use when user says "check build", "what broke", "CI status", "build failing", or asks about recent build failures. Also use for signing issues, provisioning profiles, bundle ID capabilities, or Developer Portal queries. |
| 15 | asc-submission | ASC | Prepare an app for App Store submission or TestFlight distribution using the App Store Connect MCP server. Use when user says "prepare submission", "submit to app store", "prepare for review", "update metadata", "set what's new", "check submission readiness", "distribute to testflight", or wants to manage App Store Connect metadata, screenshots, or review submissions. |
| 16 | cloudkit-sync | Workflow | Sync SwiftData / Core Data across a user's devices with CloudKit, plus CKShare collaboration and conflict handling. Use when adding iCloud sync, "sync across devices", SwiftData + CloudKit, NSPersistentCloudKitContainer, sharing records between users, or debugging why data isn't syncing. Trigger on "CloudKit", "iCloud sync", "cloudKitDatabase", "CKShare", "sync not working", or "share data between users". |
| 17 | complete-feature | Workflow | Complete a feature implementation with full validation across build, tests, lint, and Apple patterns before committing. Use when a feature feels "done", before opening a PR, or when you want to confirm nothing was missed. Trigger on "complete this feature", "is this done", "finish the feature", "ready to commit", or "final validation". |
| 18 | cross-platform-adaptivity | Workflow | Adapt one SwiftUI codebase across iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro — size classes, adaptive navigation, multi-window/scenes, platform conditionals, and idiomatic per-platform behavior. Use when supporting iPad alongside iPhone, bringing an app to macOS or visionOS, fixing a layout that only works on one device, choosing adaptive navigation, or sharing code across platforms. Trigger on "iPad", "macOS", "Mac Catalyst", "visionOS", "watchOS", "tvOS", "size class", "adaptive layout", "multiplatform", "NavigationSplitView", or "responsive". |
| 19 | design-contract | Workflow | Turn a visual mockup (HTML/PNG/Figma/spec) into a machine-readable design contract plus co-located mockup and #Preview/capture gates, so an executing agent cannot drift from the design. Use before writing or editing a plan that reproduces a mockup. |
| 20 | ios-accessibility | iOS | Audit SwiftUI views for accessibility issues and apply fixes. Use whenever VoiceOver, Dynamic Type, accessibility labels, screen readers, or App Store accessibility is mentioned. Also trigger when asked to "make it accessible", improve UI quality broadly, or prepare for App Store review. |
| 21 | ios-asc | iOS | App Store Connect MCP tools for code signing, provisioning profiles, bundle IDs, TestFlight builds, beta testers, and App Store metadata/release management. Use when signing an app, creating or repairing provisioning profiles, managing bundle ID capabilities, distributing to TestFlight, managing beta groups, editing App Store versions or localized metadata, or submitting for review. Trigger on "sign the app", "provisioning profile", "distribute to TestFlight", "add beta tester", "submit for review", or "update App Store metadata". |
| 22 | ios-build | iOS | iOS build system patterns — the 4-layer validation pipeline (fast/full/export/upload), XcodeGen project config, archive-vs-debug concurrency checks, and common build-failure fixes. Use for build errors, validation before commit, signing/export problems, XcodeGen setup, or CI/CD configuration. Trigger on "build failing", "validate", "xcodebuild error", "XcodeGen", "archive build", or "set up CI". |
| 23 | ios-simulate | iOS | iOS Simulator workflows via xcrun simctl — boot and shutdown devices, automate screenshots and video, install/uninstall apps, set appearance, and control device state. Use when running an app in the Simulator, capturing screenshots for the App Store or docs, or managing simulator devices. Trigger on "simulator", "simctl", "boot a device", "take a screenshot", "record video", "set dark mode", or "reset simulator". |
| 24 | ios-standards | iOS | Swift 6.0+ standards — strict concurrency, @MainActor isolation, @Observable (not ObservableObject), and modern SwiftUI architecture for iOS 26+. Use when writing or reviewing Swift code, structuring ViewModels and services, or resolving concurrency and isolation design questions. Trigger on "Swift 6", "strict concurrency", "@MainActor", "@Observable", "SwiftUI architecture", or "code standards". |
| 25 | ios-test | iOS | XCTest patterns for unit tests, UI tests, and SwiftData testing with in-memory containers under Swift 6 strict concurrency, plus test performance budgets. Use when writing or fixing tests, setting up test targets, testing SwiftData models, or planning CI test suites. Trigger on "write a test", "unit test", "XCTest", "test SwiftData", "UI test", "flaky test", or "test coverage". Note: never run UI tests without explicit approval. |
| 26 | ios26-api-reference | iOS | Authoritative iOS/macOS/watchOS 26 API reference with 3-tier smart loading. Prevents crashes from hallucinated APIs. Trigger on ANY code involving FoundationModels, SpeechTranscriber, SpeechAnalyzer, @Generable, LanguageModelSession, glassEffect, SwiftData, @Observable, Live Activity, App Intents, Vision, VideoToolbox, Network.framework, AVAudioEngine, MenuBarExtra, NSPanel, WKHapticType, or WCSession. Also trigger on Swift 6 concurrency errors, Sendable warnings, or @MainActor isolation issues. |
| 27 | localization | Workflow | Localize and internationalize an app with String Catalogs (.xcstrings), correct pluralization and grammar agreement, RTL layout, locale-aware formatting, and pseudolocalization testing. Use when adding languages, translating UI, fixing plurals or gendered strings, supporting right-to-left languages, formatting dates/numbers/currency per locale, or producing localized screenshots. Trigger on "localization", "internationalization", "i18n", "String Catalog", ".xcstrings", "translate", "RTL", "plural", or "locale". |
| 28 | merge-check | Workflow | Automatically verify code quality before merging to main. Triggers when user mentions merging, creating PRs, or asks if code is ready. Spawns parallel subagents for build, test, and lint verification. Use for quality gates before main branch integration. |
| 29 | networking | Workflow | Modern Swift networking with URLSession and async/await — typed requests, Codable decoding, HTTP status & error handling, retry with backoff, offline/connectivity handling, and a Sendable API client. Use when calling a REST/JSON API, building an API client/service layer, decoding responses, handling network errors or timeouts, adding retry logic, or detecting offline state. Trigger on "URLSession", "API client", "networking", "fetch data", "JSONDecoder", "retry", or "offline". |
| 30 | paywall-design | Workflow | Design high-converting, App Review-compliant paywalls and subscription upsell screens — value framing, plan presentation, trial/intro-offer design, and required legal elements. Use when building or improving a paywall, subscription screen, upsell, or "go Pro" flow, choosing trial framing, or fixing low conversion or a 3.1.2 rejection. Trigger on "paywall", "subscription screen", "upsell", "go premium", "free trial design", or "purchase screen". Bridges app-store-pricing (economics) and storekit-purchases (code). |
| 31 | performance-instruments | Workflow | Diagnose and fix iOS performance — launch time, main-thread hangs and scroll hitches, memory growth and leaks, and energy, using Instruments, os_signpost, and MetricKit field data. Use when the app is slow, janky, or battery-hungry, when investigating launch time, frame drops, retain cycles, or memory warnings, or when profiling with Instruments. Trigger on "slow", "laggy", "hang", "hitch", "memory leak", "Instruments", "Time Profiler", "launch time", "MetricKit", or "battery drain". |
| 32 | preview-capture | Workflow | Render named SwiftUI #Previews to PNG at canonical device resolution for design-contract verification, with an automatic simulator-capability check and a documented fallback for machines that cannot or must not run the simulator. Use to produce capture proof for a design contract's §9 frames. |
| 33 | privacy-manifest | Workflow | Apple privacy manifests (PrivacyInfo.xcprivacy) and required-reason APIs — declare data collection, tracking domains, and approved reason codes to avoid App Store rejection. Use when the user mentions "privacy manifest", "PrivacyInfo.xcprivacy", "required reason API", "ITMS-91053", "ITMS-91061", "privacy nutrition label", "App Store privacy rejection", or adds an SDK/framework. Run before submission alongside asc-submission. |
| 34 | product-spec | Workflow | Write a clear product spec / PRD for an app feature — problem, goals and non-goals, user stories, testable acceptance criteria, success metrics, scope, and open questions. Use when defining a feature before building, writing a PRD or spec, turning a vague idea into buildable requirements, or producing acceptance criteria. Trigger on "PRD", "product spec", "requirements", "acceptance criteria", "user stories", "scope this feature", or "write a spec". Feeds verify-against-spec. |
| 35 | push-notifications | Workflow | Apple push notifications (APNs) and local notifications — authorization, device tokens, payload structure, rich/actionable notifications, notification service & content extensions, interruption levels, and Live Activity push. Use when implementing push, "remote notifications", APNs, "notification not showing", rich media notifications, notification actions, silent/background push, or pushing Live Activity updates. Trigger on "APNs", "UNUserNotificationCenter", "device token", "notification extension", or "silent push". |
| 36 | regression-test | Workflow | Add regression tests when fixing bugs. Use when user says "fix this bug", "this is broken", "fix this issue", or when implementing any bug fix to prevent recurrence. |
| 37 | storekit-purchases | Workflow | StoreKit 2 in-app purchases and subscriptions in Swift — Product fetch, purchase flow, transaction verification, entitlement checks, Transaction.updates listener, restore, and SwiftUI StoreKit views. Use when implementing or debugging IAP, subscriptions, paywalls, "buy" buttons, free trials, restore purchases, receipt/transaction validation, or StoreKit testing. Pairs with app-store-pricing (strategy) and asc-aso (conversion). |
| 38 | swift-testing | Workflow | The Swift Testing framework (import Testing) — @Test functions, #expect/#require macros, @Suite, parameterized tests, traits/tags, async and throwing tests, and migrating from XCTest. Use when writing new tests in Swift 6 / Xcode 16+, when the user mentions "Swift Testing", "@Test", "#expect", "parameterized test", "test traits", or "migrate from XCTest". For XCTest harness/CI and SwiftData test setup see ios-test. |
| 39 | swift6-concurrency | Workflow | Handle Swift 6 concurrency patterns. Use when encountering Sendable warnings, data race errors, MainActor isolation issues, or framework interop problems (EventKit, Speech, AVFoundation, etc.). Trigger on "Swift 6 error", "Sendable", "data race", "MainActor", "concurrency warning", or "strict concurrency". |
| 40 | swiftui-micro-craft | Workflow | Quantified rules and a mechanical auditor for Apple-grade SwiftUI micro-craft — the spacing, alignment, optical centering, padding, corner-radius concentricity, SF Symbol pairing, depth, hairlines, Dynamic Type, motion, gestures, and haptics details that separate shipped Apple quality from AI-slop UI. Use when writing or reviewing any SwiftUI view, when spacing or padding or alignment feels off, when about to hardcode a size or duration, or before committing UI code. |
| 41 | verify-against-spec | Workflow | Use when finishing a spec-driven feature, when asked to verify nothing was missed, when approaching context limits on a long feature session, or after hearing "make sure everything is implemented". Cross-checks the design spec against the actual implementation, in parallel with build and doc verification. |

---

## How to Use This Reference

This document contains all Apple Dev Skills concatenated in order. Use the Table of Contents above to navigate.
Each skill is bounded by `<!-- BEGIN SKILL: name -->` and `<!-- END SKILL: name -->` markers.

For **executable validation**, use the plugin tools:
- `pattern-check` — Run mechanical Swift 6 / SwiftUI / SwiftData / entitlements validation
- `api-lookup` — Query iOS 26 API signatures and anti-hallucination references

---

<!-- BEGIN SKILL: app-analytics -->

# app-analytics

# App Analytics

**Measure the few things that drive decisions — not everything you can.** Over-instrumenting creates noise, privacy risk, and a dashboard nobody reads. This skill is about *what* to measure; performance telemetry is `performance-instruments` (MetricKit).

> Test for every metric: *if this number moved, would we do something differently?* If not, don't track it.

---

## Start with one north-star metric

A north-star is the single number that best captures delivered user value — leading, not lagging.

- Good: "weekly active note editors", "sessions completed per user/week", "tracked workouts/week."
- Weak: raw downloads or DAU alone (vanity; doesn't capture value).
- The north-star should *predict* retention and revenue. Everything else is a supporting or guardrail metric.

---

## The funnel (AARRR, pragmatically)

| Stage | Question | Typical metric |
|-------|----------|----------------|
| **Acquisition** | Are people arriving? | Impressions → installs (see `asc-aso`) |
| **Activation** | Did they reach first value? | % completing the "aha" action in session 1 |
| **Retention** | Do they come back? | D1 / D7 / D30 **cohort** retention |
| **Revenue** | Do they pay? | Trial→paid, conversion, ARPU (see `paywall-design`, `app-store-pricing`) |
| **Referral** | Do they bring others? | Invites sent/accepted, rating prompts |

**Activation and retention are where most apps actually win or lose.** Define your activation event precisely ("created and saved 1 note", "logged 3 days") and measure the % who hit it on day 0 — it's the highest-leverage number for a young app.

### Retention is a cohort, not a percentage

Always read retention as **cohorts** (users who installed in week N, % active in weeks N+1, N+7…). A single "retention %" hides whether you're improving. A flattening retention curve (not decaying to zero) is the signal of product-market fit.

---

## Event taxonomy — design it before you instrument

A messy event log is worse than none. Conventions:

- **Name consistently:** `object_action` in one tense — `note_created`, `paywall_viewed`, `subscription_started`. Pick a casing and keep it.
- **Properties over event explosion:** one `paywall_viewed` event with a `source` property beats `paywall_viewed_onboarding` / `paywall_viewed_settings` / … Same event, structured dimensions.
- **Track the funnel-defining events first** (activation, key actions, purchase steps), then add detail only when a question demands it.
- **Version the schema** and write it down — undocumented events rot.
- Capture enough context to **segment** (platform, plan, locale) without capturing PII.

---

## Apple's built-in sources (often enough)

- **App Store Connect → App Analytics:** impressions, product page views, **conversion rate**, installs, retention, and sessions — segmented by **Source Type** (Search / Browse / Referrer). Free, privacy-safe, no SDK. Start here.
- **StoreKit / Subscription analytics:** trials, conversions, churn, proceeds, by product — the source of truth for monetization (pairs with `storekit-purchases`).
- **MetricKit:** performance/diagnostics from the field (launch, hangs, hitches) — route to your dashboards via `performance-instruments`.

Reach for a third-party analytics SDK only when you need event-level product funnels the built-ins don't give you.

---

## Privacy is part of analytics, not a footnote

- Minimize: collect the least that answers your question. Don't log PII or precise location "just in case."
- Anything you collect must be reflected in the **privacy nutrition label** and, for required-reason/tracking APIs, the **privacy manifest** — see `privacy-manifest`. Tracking across apps requires **App Tracking Transparency** consent.
- Prefer aggregate/on-device where possible. Truthful labels are an App Review and trust requirement.

---

## From metric to action

1. Pick the **one decision** you're trying to inform.
2. Define the **metric + target + window** (ties to `product-spec` success metrics).
3. Instrument the **minimum events** to compute it, with clean names/properties.
4. Read it as **cohorts/segments**, not a single global number.
5. Change one thing, measure the move, keep or revert. Repeat.

<!-- END SKILL: app-analytics -->

---

<!-- BEGIN SKILL: app-brand-identity -->

# app-brand-identity

# App Brand Identity

Create a complete brand identity system for Apple platform apps. Produces a wordmark, app icon, design token foundation, brand voice guidelines, and App Store marketing asset strategy. **Use before `apple-design` — this skill creates the visual system that `apple-design` implements in SwiftUI.**

> **Embody a product designer at Apple.** Your brand will live on the App Store, in the Dock, in Spotlight results, and in screenshots on social media. Every decision must survive at 16×16 (menu bar) and 1280×800 (App Store feature). No generic startup aesthetics. No gradient blobs. No AI-slop.

## When to Use

- Starting a new app and need a name, logo, or visual identity
- Renaming or rebranding an existing app
- Designing the app icon (macOS rounded rect, iOS squircle, visionOS layered)
- Choosing typography, color palette, or spacing system
- Building a design token system that bridges marketing site and app code
- Preparing App Store screenshots, preview video storyboards, or feature graphics
- Creating a press kit or maker page

## When NOT to Use

- **Don't use** for pure UI component design — that's `apple-design`
- **Don't use** for App Store submission logistics — that's `asc-submission`
- **Don't use** for pricing decisions — that's `app-store-pricing`
- **Don't use** for architecture diagrams — that's `apple-architecture-diagram`

---

## The Brand Identity Process

### 1. Discovery & Constraints

Before designing, lock the constraints:

| Question | Why It Matters |
|----------|----------------|
| **Platforms?** | macOS icons are rounded rect (≤ 1024pt). iOS is squircle (superellipse mask). visionOS is circular with layered depth. |
| **Minimum OS?** | iOS/macOS 26+ unlocks Liquid Glass, SF Rounded, new material effects. |
| **Category?** | Utility apps need instant recognition. Creative tools can be more expressive. Productivity apps should feel calm and competent. |
| **Competitive frame?** | Who do you want to be compared to? Who do you want to avoid being compared to? |
| **Name length?** | Short names (< 6 chars) allow larger wordmarks. Long names need abbreviation strategies. |
| **Dark mode default?** | macOS utilities often live in dark mode. iOS apps see both. |

### 2. Name & Naming Conventions

**Product name rules for Apple platforms:**

- **Searchable** — type it into Spotlight and App Store search; is it unique enough?
- **Speakable** — can someone say it to Siri and be understood?
- **Short** — 4–6 characters ideal for menubar/Dock labels; 10+ requires truncation strategy
- **No generic descriptors** — "Photo Editor Pro" is unbrandable. "Orbit" is ownable.
- **Domain check** — `.app` preferred, but not required at launch

**Naming convention matrix:**

| Context | Form | Example |
|---------|------|---------|
| Product name in prose | Full name | Orbit |
| Wordmark / logo lockup | Name + mark | `orbit` + triangle |
| Paid tier | Name + modifier | Orbit+ |
| App Store listing | Full name (no punctuation marks) | Orbit |
| Bundle ID | Reverse DNS | `com.example.orbit` |
| Menubar / Dock | Icon only (no text) | — |

### 3. Wordmark Design

#### The Wordmark Hierarchy

Every wordmark decision is a trade-off between **distinctiveness** and **legibility**:

| Approach | Distinctiveness | Legibility | Best For |
|----------|----------------|------------|----------|
| **System sans + custom mark** (SF Pro + unique icon) | Medium | High | Most apps |
| **System rounded** (SF Rounded) | Low | High | Friendly consumer apps |
| **Serif + geometric mark** | High | Medium | Premium/design tools |
| **Custom logotype** | Very High | Variable | Established brands |

**Default recommendation for indie Apple apps:** System sans (SF Pro) + custom mark. It feels native, performs well at small sizes, and doesn't fight the platform.

#### Typography Selection

| Font | Weight | Personality | Platform Feel |
|------|--------|-------------|---------------|
| SF Pro Display | 300–600 | Native, neutral, professional | Invisible (good) |
| SF Pro Rounded | 400–500 | Friendly, accessible, soft | Playful without being childish |
| Georgia / Times | 400 | Editorial, distinctive, premium | Stands out in utility categories |
| Custom sans | Varies | Unique, ownable | Requires strong justification |

**Rules:**
- Use **SF Pro Display** for wordmarks unless you have a specific reason not to
- Use **Georgia** only when the icon already contains serif elements (creates system harmony)
- Never use **SF Pro Text** for wordmarks — it's optimized for body copy, not display
- Letter-spacing: tight (`-0.02em` to `-0.04em`) for modern feel; normal for classic

#### The Mark (Punctuation/Icon Element)

The mark is the visual signature that makes the wordmark ownable:

| Mark Type | Example | Risk | Reward |
|-----------|---------|------|--------|
| **Dot** | `orbit.` | Generic — any product can use it | Clean, typographic |
| **Triangle/geometric** | `orbit` ▲ | Requires design work | Ownable, product-relevant |
| **Plus badge** | `orbit+` | Universal tier signifier | Clear paid tier communication |
| **None** | `Orbit` | Harder to trademark, less distinctive | Maximum simplicity |

**Mark construction rules (from Orbit triangle mark):**
- The mark must echo the app icon — every wordmark use reinforces icon recognition
- Position in natural whitespace, never clip or modify letterforms
- Scale proportionally: derive size from font metrics (e.g., `fontSize × 0.247`)
- Use Canvas API or SVG for precise positioning after `document.fonts.ready`

#### Wordmark Exploration Template

When exploring wordmarks, produce **4 directions** as self-contained HTML:

```html
<!-- Direction A: System sans, bold, no mark -->
<!-- Direction B: System rounded, medium weight -->
<!-- Direction C: Serif + geometric mark -->
<!-- Direction D: System sans + custom mark (Liquid Glass aesthetic) -->
```

Each direction must show:
- Large (hero size)
- Medium (nav bar size)
- Small (App Store listing size)
- Dark background
- Light background
- With paid tier variant (+ mark)

### 4. App Icon Design

#### Platform Geometry

| Platform | Shape | Corner Radius | Key Characteristic |
|----------|-------|---------------|-------------------|
| **macOS** | Rounded rectangle | `22%` of side (1024pt → ~205px) | Subtle 3D tilt optional |
| **iOS** | Superellipse (squircle) | System-masked | No transparency |
| **visionOS** | Circle with depth | N/A (circular mask) | Layered glass + shadow |
| **watchOS** | Circle | N/A | Simplified, high contrast |

**Anti-patterns:**
- Don't design the macOS icon as a perfect square with sharp corners — it looks like a Windows port
- Don't put text inside the icon (except single-letter marks at very large sizes)
- Don't use the full wordmark inside the icon — it becomes illegible at 29×29

#### Icon Design Principles

1. **One idea, instantly readable** — The icon should communicate the app's core action at 60×60 (Spotlight) and 1024×1024 (App Store)
2. **Bold silhouette** — The outer shape should be distinctive even when blurred
3. **Material honesty** — On macOS 26+/iOS 26+, use Liquid Glass or native materials. On older OS, use flat or subtle gradients.
4. **Color discipline** — 1–2 colors + neutral. Coral + dark is better than rainbow.

#### Icon Variations Checklist

```
AppIcon.appiconset/
  ├─ 16x16@1x.png      (menubar, small)
  ├─ 16x16@2x.png
  ├─ 32x32@1x.png      (Retina menubar)
  ├─ 32x32@2x.png
  ├─ 128x128@1x.png    (Finder)
  ├─ 128x128@2x.png
  ├─ 256x256@1x.png    (Dock default)
  ├─ 256x256@2x.png
  ├─ 512x512@1x.png    (Quick Look)
  ├─ 512x512@2x.png    (App Store)
  └─ 1024x1024@1x.png  (App Store marketing)
```

**Critical:** The 16×16 menubar icon is the hardest. Design it first — if it works there, it works everywhere.

#### iOS/iPadOS/watchOS — ship an "All Sizes" catalog when detail is size-fragile

A single-size iOS app icon (one 1024 master, the "Single Size" appiconset) is a trap for any
icon with **fine or low-opacity detail**. iOS does not just show that 1024 on the Home Screen —
it **downscales it** for Spotlight, Settings, notifications, and the App Store / TestFlight list
rows. Thin strokes, soft glows, and trailing/ghost elements (anything below ~10–15% opacity or
~1% of the canvas in stroke width) **turn to mud below ~64px**, so the icon collapses to a flat
colored blob exactly where users see it most. The 1024 looks perfect in review and the small
renders silently rot.

The fix is the same per-size discipline macOS and tvOS already *require*: provide an asset for
each size and put **bolder, simplified art** in the small slots.

```
AppIcon.appiconset/   (iOS "All Sizes")
  ├─ small-variant art → 20pt, 29pt, 40pt @1x/@2x/@3x   (notification / settings / spotlight)
  └─ master art        → 60pt @2x/@3x (home screen) + 1024 (App Store)
```

Rules:

- **Choose the variant by ROLE, not raw pixel count.** Spotlight @3x is 120px yet should still
  get the *small* art — a Spotlight icon should read like a Spotlight icon on every device. The
  ~64px figure is the boundary for *standalone* renders (favicons, complications), not the
  per-slot decision inside an app-icon catalog.
- **Small art = thicker strokes, dropped faint layers, tightened glow, larger glyph.** Author it
  as a separate vector and rasterize per slot; don't just downscale the master.
- iOS app icons must be **opaque** (no alpha) or you risk ITMS rejection — flatten onto the
  ground colour and strip the alpha channel after rasterizing.
- **Apple sanctions this:** *"to show more detail at a larger size, you can provide individual
  assets for the variations"* and *"For macOS and tvOS, you need to supply an asset for each
  size."* — [Configuring your app icon using an asset catalog](https://developer.apple.com/documentation/Xcode/configuring-your-app-icon).
- **watchOS has the same problem, more acutely** — the watch face renders the icon tiny and
  circular. If your iOS catalog needed small art, the watch set does too.

**Smell test:** if your icon's *meaning* lives in detail finer than a bold silhouette, a
single-size iOS catalog will lose that meaning. Render your master at 40px and 60px before
shipping; if it reads as a blob, you need the multi-size catalog.

### 5. Color System

#### Primary Palette

| Role | Selection Criteria | Example |
|------|-------------------|---------|
| **Signature** | The one color users associate with your app | `#FF6B5B` (coral) |
| **Canvas (dark)** | The background your app lives on | `#0E1117` |
| **Canvas (light)** | For light mode / marketing | `#F5F5F7` |
| **Surface** | Elevated cards, panels | `#16191D` (dark), `#FFFFFF` (light) |
| **Text primary** | Headlines, body | `#FFFFFF` (dark), `#1D1D1F` (light) |
| **Text muted** | Captions, secondary | `#9CA3AF` (dark), `#86868B` (light) |

**Rules:**
- Signature color must pass WCAG AA on both canvas colors (4.5:1 for text, 3:1 for UI)
- Never use the signature color for error states — reserve red (`#FF453A`) for errors
- Dark canvas should be subtly tinted toward the signature (e.g., coral-tinted dark `#0E1117`), not pure gray

#### Semantic Colors

```swift
// Inherit from Apple semantic colors where possible
let success = Color.green      // #34C759
let warning = Color.orange     // #FF9F0A
let danger = Color.red         // #FF453A
```

### 6. Design Token System

Tokens bridge marketing (CSS) and app (SwiftUI):

```css
/* apps/website/src/styles/tokens.css */
@theme {
  --color-primary: #0E1117;
  --color-signature: #FF6B5B;
  --font-display: "SF Pro Display", -apple-system, sans-serif;
  --radius-icon: 22px;
  --ease-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1.0);
}
```

```swift
// Packages/AppCore/Sources/AppCore/Tokens/AppTokens.swift
public enum AppTokens {
    public static let signature = Color(hex: "#FF6B5B")
    public static let canvasDark = Color(hex: "#0E1117")
    public static let canvasLight = Color(hex: "#F5F5F7")
    public static let radiusIcon: CGFloat = 22
}
```

**Sync rule:** When tokens.css changes, update the Swift mirror. Document the dependency in both files.

### 7. Brand Voice

| Attribute | Do | Don't |
|-----------|-----|-------|
| **Tone** | Calm, confident, craft-focused | Hype, exclamation points, trend words |
| **AI references** | Name what it does, not that it's AI | "AI-powered," "smarter than ever" |
| **Feature copy** | Describe the benefit, not the mechanism | "Utilizes advanced neural networks" |
| **Error copy** | Plain language, no blame | "Something went wrong" not "User error" |
| **Pricing copy** | One-time = "Unlock"; Subscription = "Pro" | Ambiguous tier names |

**Voice test:** Read your App Store subtitle aloud. If it sounds like it could be from any other app, rewrite it.

### 8. App Store Marketing Assets

#### Screenshots Strategy

| Slot | Purpose | Content |
|------|---------|---------|
| 1 | **Hook** — the "wow" moment | The app doing its core action beautifully |
| 2 | **Context** — where it lives | Menubar, Dock, or device context |
| 3 | **Feature 1** — primary differentiator | The one thing no competitor does |
| 4 | **Feature 2** — secondary benefit | Supporting capability |
| 5 | **Social proof** — trust | Ratings, testimonials, or "Featured by Apple" |
| 6 | **CTA** — pricing clarity | Clear tier distinction, no surprises |

**Screenshot rules:**
- Use **real app UI** — never mockups. The gap between screenshot and reality is a rejection risk.
- Include **device chrome** for iOS; **clean UI** for macOS (no window chrome needed)
- Maintain **color consistency** — all screenshots feel like the same app
- **Text overlays** are optional; if used, keep under 4 words per slide

#### App Preview Video (Optional)

- 15–30 seconds
- No audio required (most users watch muted)
- Show the core loop: trigger → action → result
- End on the App Store CTA frame

#### Press Kit / Maker Note

Single-page markdown:
- One-sentence pitch
- 3 bullet differentiators
- 2–3 screenshot links
- Contact / social links
- "Made by [name]" — personal attribution performs better than anonymous studio

---

## Deliverables Checklist

A complete brand identity handoff includes:

- [ ] **Name** — searchable, speakable, ownable
- [ ] **Wordmark** — 4-direction exploration → 1 approved → dark + light variants
- [ ] **App Icon** — 1024pt master → all platform variations → menubar 16×16 validated
- [ ] **Color system** — signature + canvas + surface + semantic + contrast verification
- [ ] **Typography** — display font, text font, mono font (if needed), weights specified
- [ ] **Design tokens** — CSS file + Swift mirror, synced
- [ ] **Brand voice** — tone attributes, do/don't table, example copy
- [ ] **App Store screenshots** — 6-slot strategy + mock descriptions
- [ ] **Maker note / press kit** — single-page markdown

---

## Integration with Other Skills

| After `app-brand-identity`, invoke... | For... |
|--------------------------------------|--------|
| `apple-design` | Implementing tokens in SwiftUI, Liquid Glass effects, preview patterns |
| `app-store-pricing` | Pricing tiers, introductory offers, global equalization |
| `asc-submission` | Preparing screenshots, metadata, and App Store listing |
| `apple-architecture-diagram` | Marketing architecture diagrams for press/VC pitches |

---

## Anti-AI-Slop Rules

| Avoid | Use Instead |
|-------|-------------|
| Gradient blobs / abstract shapes | Meaningful geometry related to app function |
| Purple-blue gradients ("AI aesthetic") | Signature color + true black |
| Generic sans-serif wordmarks with no mark | System font + custom geometric mark |
| Stock icon templates | Original silhouette tested at 16×16 |
| Trendy 3D renderings | Native materials (Liquid Glass, metal, fabric) |
| Multiple competing signature colors | One signature + neutral system |

<!-- END SKILL: app-brand-identity -->

---

<!-- BEGIN SKILL: app-intents -->

# app-intents

# App Intents, Widgets & Live Activities

**Expose your app's actions and surface them across the system** — Siri, Shortcuts, Spotlight, widgets, Control Center, the Action button, and Live Activities. One App Intent powers all of them. Verify signatures against the **apple-docs MCP** (`get_symbol`, `list_framework AppIntents`); see `ios26-api-reference` for crash-prone API gotchas.

---

## App Intents — the foundation

An `AppIntent` is a unit of app functionality the system can run. Define it once; reuse it in Shortcuts, Siri, widgets, and controls.

```swift
import AppIntents

struct StartFocusIntent: AppIntent {
    static let title: LocalizedStringResource = "Start Focus Session"
    static let description = IntentDescription("Begins a focus session.")

    @Parameter(title: "Duration (minutes)")
    var minutes: Int

    // Bring the app to the foreground when run? Default false (runs in background).
    static let openAppWhenRun = false

    @MainActor
    func perform() async throws -> some IntentResult & ProvidesDialog {
        try await FocusEngine.shared.start(minutes: minutes)
        return .result(dialog: "Started a \(minutes)-minute session.")
    }
}
```

- `perform()` is `async throws` and returns `some IntentResult`. Compose result types: `& ProvidesDialog`, `& ReturnsValue<T>`, `& OpensIntent`, `& ShowsSnippetView`.
- `@Parameter` values can be requested interactively by Siri/Shortcuts when missing.
- Keep `perform()` fast and `@MainActor` only where it touches UI/model state (see `ios-standards`).

### Entities & queries (let intents operate on your data)

```swift
struct Project: AppEntity {
    static let typeDisplayRepresentation: TypeDisplayRepresentation = "Project"
    static let defaultQuery = ProjectQuery()
    var id: UUID
    var displayRepresentation: DisplayRepresentation { DisplayRepresentation(title: "\(name)") }
    let name: String
}

struct ProjectQuery: EntityQuery {
    func entities(for ids: [UUID]) async throws -> [Project] { /* fetch */ }
    func suggestedEntities() async throws -> [Project] { /* recents */ }
}
```

`AppEntity` + `EntityQuery` let parameters be picked from your real data and make intents work with "the project named X".

---

## App Shortcuts — zero-setup Siri & Spotlight

`AppShortcutsProvider` auto-registers phrases. No user setup; they appear in Spotlight and Siri immediately after install.

```swift
struct FocusShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: StartFocusIntent(),
            phrases: ["Start a focus session in \(.applicationName)"],
            shortTitle: "Start Focus",
            systemImageName: "timer"
        )
    }
}
```

- **Always include `\(.applicationName)`** in at least one phrase per shortcut — Siri requires it.
- App Shortcuts are limited (~10); reserve them for your highest-value actions.

---

## Interactive widgets (iOS 17+)

Widgets run intents directly from `Button(intent:)` / `Toggle(intent:)` — no app launch.

```swift
// In the widget view
Button(intent: StartFocusIntent(minutes: 25)) { Label("Focus", systemImage: "play.fill") }
Toggle(isOn: isActive, intent: ToggleFocusIntent()) { Text("Active") }
```

Use an `AppIntentTimelineProvider` so the timeline reacts to intent-driven state. Keep widget work tiny; heavy lifting belongs in the app/shared model.

---

## Controls (iOS 18+) — Control Center, Lock Screen, Action button

```swift
struct FocusControl: ControlWidget {
    var body: some ControlWidgetConfiguration {
        StaticControlConfiguration(kind: "com.app.focus") {
            ControlWidgetToggle("Focus", isOn: FocusState.isActive, action: ToggleFocusIntent()) { isOn in
                Label(isOn ? "On" : "Off", systemImage: "timer")
            }
        }
    }
}
```

`ControlWidgetButton` / `ControlWidgetToggle` are backed by App Intents. The same control can be assigned to the **Action button** by the user.

---

## Live Activities & Dynamic Island (ActivityKit)

Show real-time, glanceable state on the Lock Screen and in the Dynamic Island.

```swift
import ActivityKit

struct FocusAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable { var remaining: TimeInterval }
    var sessionName: String
}

// Start (in-app)
let activity = try Activity.request(
    attributes: FocusAttributes(sessionName: "Deep Work"),
    content: .init(state: .init(remaining: 1500), staleDate: nil)
)

// Update
await activity.update(.init(state: .init(remaining: 1200), staleDate: nil))

// End
await activity.end(nil, dismissalPolicy: .immediate)
```

UI is a `Widget` whose body is an `ActivityConfiguration` with a Lock Screen view and a `DynamicIsland { ... }` (compact/minimal/expanded regions).

**Constraints:**
- Requires `NSSupportsLiveActivities = YES` in Info.plist.
- `ContentState` must stay small (~4KB) and `Codable`.
- Remote updates use **ActivityKit push tokens** with `apns-push-type: liveactivity` — see `push-notifications`.
- Use `Text(timerInterval:)` for self-updating countdowns instead of pushing every second.

---

## Where this connects

- `push-notifications` — remote Live Activity / widget updates.
- `ios26-api-reference` — App Intents / ActivityKit crash patterns and availability.
- `ios-standards` — concurrency/isolation rules for `perform()` and shared state.

<!-- END SKILL: app-intents -->

---

<!-- BEGIN SKILL: app-security -->

# app-security

# App Security

**Store secrets, authenticate users, and protect data correctly on Apple platforms.** The golden rule: **never put secrets, tokens, or keys in `UserDefaults`, `@AppStorage`, plist, or source** — those are plaintext and back up off-device.

---

## Keychain — the only place for secrets

Use a thin wrapper around the C API (or a vetted micro-library). Store tokens, refresh tokens, encryption keys.

```swift
import Security

enum Keychain {
    static func set(_ data: Data, account: String) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: account,
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
        ]
        SecItemDelete(query as CFDictionary)               // replace existing
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { throw KeychainError(status) }
    }
    static func get(account: String) -> Data? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: account,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        var out: CFTypeRef?
        return SecItemCopyMatching(query as CFDictionary, &out) == errSecSuccess ? out as? Data : nil
    }
}
```

- **Choose accessibility deliberately:** `...WhenUnlockedThisDeviceOnly` (most secrets) or `...AfterFirstUnlockThisDeviceOnly` (needed in the background). The `ThisDeviceOnly` variants don't migrate to new devices/backups — correct for tokens.
- Gate the most sensitive items with `SecAccessControl` (`.biometryCurrentSet`, `.userPresence`) so reading requires Face ID/Touch ID.

---

## Sign in with Apple

Required if you offer other third-party social logins (App Review guideline 4.8). Privacy-friendly: email relay, minimal data.

```swift
let request = ASAuthorizationAppleIDProvider().createRequest()
request.requestedScopes = [.fullName, .email]
request.nonce = sha256(currentNonce)          // bind to your backend to prevent replay
let controller = ASAuthorizationController(authorizationRequests: [request])
controller.delegate = self
controller.performRequests()
```

- The **`user` identifier is stable**; name/email are returned **only on first authorization** — persist them then or you can't get them again.
- Send the **`identityToken` + `nonce`** to your server and verify the JWT against Apple's public keys. Never trust the client result alone.
- Use `SignInWithAppleButton` in SwiftUI for the HIG-compliant button.

---

## Biometric gate (local)

```swift
import LocalAuthentication
let ctx = LAContext()
var err: NSError?
if ctx.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &err) {
    let ok = try await ctx.evaluatePolicy(.deviceOwnerAuthentication,   // falls back to passcode
                                          localizedReason: "Unlock your vault")
}
```

Biometric success is a **UI gate**, not a cryptographic guarantee — back it with Keychain access control for real protection. Always provide a passcode fallback (`.deviceOwnerAuthentication`).

---

## CryptoKit — encryption & hashing

```swift
import CryptoKit
let key = SymmetricKey(size: .bits256)                 // store in Keychain
let sealed = try AES.GCM.seal(plaintext, using: key)   // authenticated encryption
let data = sealed.combined!
let opened = try AES.GCM.open(.init(combined: data), using: key)

let digest = SHA256.hash(data: payload)                // hashing
let signature = try P256.Signing.PrivateKey().signature(for: payload)
```

- Prefer **AES-GCM** (authenticated) over CBC. Never roll your own crypto or reuse nonces.
- For keys that must never leave hardware, generate in the **Secure Enclave** (`kSecAttrTokenIDSecureEnclave` / `SecureEnclave.P256`).

---

## App Attest / DeviceCheck — prove requests come from your real app

For high-value backends (anti-fraud, anti-cheat), verify the client is a genuine, unmodified instance of your app on a real device.

- `DCAppAttestService.shared` → `generateKey`, `attestKey(_:clientDataHash:)` (once), then `generateAssertion` per request.
- Your **server** verifies the attestation/assertion against Apple's App Attest root. Client-side checks alone are worthless.
- Use `DeviceCheck` (`DCDevice.generateToken`) for lightweight per-device flags (e.g. "already claimed free trial").

---

## Certificate pinning (only when justified)

Pinning defends against compromised CAs/MITM but **breaks when servers rotate certs** — pin to a **public key**, not a leaf cert, and ship a backup pin.

```swift
func urlSession(_ s: URLSession, didReceive challenge: URLAuthenticationChallenge) async
  -> (URLSession.AuthChallengeDisposition, URLCredential?) {
    guard let trust = challenge.protectionSpace.serverTrust,
          isPinned(publicKeyOf: trust) else { return (.cancelAuthenticationChallenge, nil) }
    return (.useCredential, URLCredential(trust: trust))
}
```

Don't pin if you can't operationally manage rotation — a stale pin bricks every install until they update. Pairs with `networking`.

---

## Quick audit

- [ ] No secrets in `UserDefaults`/plist/source.
- [ ] Tokens in Keychain with a `ThisDeviceOnly` accessibility class.
- [ ] Sign in with Apple verified **server-side** with nonce.
- [ ] Biometric gate backed by Keychain access control, with passcode fallback.
- [ ] AES-GCM (not CBC); nonces never reused; keys in Keychain/Secure Enclave.
- [ ] App Attest/DeviceCheck verified server-side (if used).
- [ ] Cert pins are public-key + have a backup (if used).
- [ ] Required-reason/privacy declarations current — see `privacy-manifest`.

<!-- END SKILL: app-security -->

---

<!-- BEGIN SKILL: app-store-pricing -->

# app-store-pricing

# App Store Pricing

**Strategic guidance for App Store pricing using Apple's official 900-price-point system, global equalization, subscription management, and regional pricing decisions.**

All guidance is based on Apple's official pricing capabilities (March 2023 onwards). Do NOT reference pre-2023 fixed tier tables or third-party price matrices — they are outdated.

## When to Use

- **Do use** when the user asks about App Store pricing, IAP pricing, subscription pricing, regional pricing, price changes, proceeds calculations, or base storefront selection
- **Do use** when setting up introductory offers, promotional offers, or offer codes
- **Do use** when planning a price increase or decrease for subscriptions
- **Don't use** for general SaaS pricing theory (Van Westendorp, MaxDiff, etc.) — those frameworks don't apply to Apple's constrained price-point system
- **Don't use** for payment processing outside the App Store

## Apple's Pricing System (Official)

### 900 Price Points

Apple offers **900 price points** per currency (800 default + 100 higher on request up to $10,000). Price increments are:

| Price Range | Increment | Example Prices |
|-------------|-----------|----------------|
| $0.29 – $9.99 | $0.10 | $0.29, $0.39, $0.49 ... $9.99 |
| $10.00 – $49.99 | $0.50 | $10.00, $10.50, $11.00 ... $49.99 |
| $50.00 – $199.99 | $1.00 | $50, $51, $52 ... $199.99 |
| $200.00 – $499.99 | $5.00 | $200, $205, $210 ... $499.99 |
| $500.00 – $9,999.99 | $10–$50 | $500, $510, $520 ... $9,999.99 |

### Pricing Conventions

Apple supports multiple price endings per region. Common conventions:

| Convention | Range | Best For |
|------------|-------|----------|
| `.99` | $0.99 – $9,999.99 | Standard app/IAP pricing |
| `.00` | $1.00 – $10,000 | Clean numbers, annual plans |
| `.90` | $0.90 – $99.90 | Discounts, promotions |
| `.95` | $0.95 – $49.95 | Psychological pricing |

China has additional conventions ( endings in `8`, `9`, `.80`, `.90`). Choose the convention that matches your market positioning.

### Proceeds Calculation

```
Developer Proceeds = (Customer Price − VAT/Applicable Tax) × (1 − Apple Commission)
```

- **Apple Commission**: 15% for Small Business Program / 30% standard
- **Tax**: Apple collects and remits VAT/sales tax in most territories. The App Store Connect pricing tool displays **tax-inclusive** prices by default.
- **Base storefront**: The one territory where Apple will NEVER auto-adjust your price

## Global Equalization Strategy

### Base Storefront Selection

The base storefront is the anchor for all 174 other storefronts. Apple auto-generates equalized prices based on FX rates and taxes.

| Scenario | Recommended Base | Rationale |
|----------|------------------|-----------|
| US-centric business | United States | Largest market, stable currency |
| EU-centric business | Germany or France | Euro anchor, largest EU markets |
| Global but price-sensitive | Your home market | Familiar with local purchasing power |
| Subscription parity desired | Germany | Apple's default for global parity examples |

**Critical rule**: Apple never changes the base storefront price. All other 174 storefronts may auto-adjust when FX rates move 10%+ sustained over quarters, or 25%+ quickly. You receive 14-day email notice before auto-adjustments.

### Manual Override Strategy

When you manually set a price for a specific storefront, Apple stops auto-adjusting that storefront forever (unless you reset via global price change).

| Approach | When to Use | Risk |
|----------|-------------|------|
| **Full auto** (recommended for most) | Let Apple manage all 174 storefronts | Prices drift with FX; always equalized |
| **Key market parity** | Manually lock US/UK/EU to same number (e.g., $7.99 / £7.99 / €7.99) | You must monitor FX and adjust manually |
| **Emerging market discount** | Manually lower prices in India, Indonesia, etc. | Lose auto-adjustment; must maintain manually |
| **Full manual** | Enterprise apps with territory-specific contracts | High maintenance burden |

**Decision tree:**
1. Is your app sold in >20 territories? → Use full auto
2. Do you care about price parity across US/UK/EU? → Auto + manual override on those 2–3 storefronts
3. Do you have localized cost structures? → Manual for those territories only

### Subscription Pricing Specifics

Subscriptions behave differently from one-time purchases:

| Behavior | One-Time IAP / Paid App | Auto-Renewable Subscription |
|----------|------------------------|----------------------------|
| Auto FX adjustment | Yes | **No** |
| Tax/FX change impact | Apple auto-adjusts | You must update manually |
| Price change for existing subscribers | N/A (one-time) | Optional: preserve current price |
| Consent required for increase | N/A | Yes, in certain markets and for large increases |

**Subscription price changes:**
- You can preserve the current price for existing subscribers when increasing
- Apple handles consent flows via email, push notification, and in-app messaging (iOS 13.4+)
- Large or frequent increases trigger consent requirements
- Price decreases apply to all subscribers immediately

## Subscription Offer Types

| Offer Type | Eligibility | Duration | Use Case |
|------------|-------------|----------|----------|
| **Introductory Offer** | New customers only | 1 week – 1 year | Acquisition |
| **Promotional Offer** | New, existing, lapsed | Flexible | Retention, win-back |
| **Offer Code** | New, existing, lapsed | Flexible | Marketing campaigns |

### Introductory Offer Configurations

- **Pay as you go**: Discounted recurring price (e.g., $0.99/mo for 3 months)
- **Pay up front**: One-time discounted price for a period (e.g., $4.99 for 6 months)
- **Free**: Free trial (3 days – 1 year)

One introductory offer per subscription group per customer lifetime.

### Promotional Offers

- Requires generating an offer identifier in App Store Connect
- You present the offer in-app using `SKPaymentQueue` with the promotional offer identifier
- Used for retention (e.g., "come back for 50% off 3 months")

### Offer Codes

- Up to 1 million redemptions per app per quarter
- Can be customized: customer eligibility, timing, territories, pricing, duration
- Redeemable via App Store, in-app, or custom URL

## Pricing Workflows

### Workflow A: Set Initial App Pricing

1. **Choose base storefront** — Select the territory you know best
2. **Select base price** — Pick from 900 price points using the most common convention for that territory
3. **Review global equalization** — Apple generates prices for 174 storefronts; review and manually override only key markets if needed
4. **Confirm** — New pricing takes effect immediately

### Workflow B: Plan a Subscription Price Increase

1. **List current subscriptions** — Use `asc_list_subscriptions` to find subscription IDs
2. **Determine new price** — Pick from 800 price points (or request higher tier access)
3. **Decide on preserved pricing** — Will existing subscribers keep their current price?
4. **Check consent requirements** — Large increases or increases in certain markets require user consent
5. **Schedule the change** — Set start date; Apple notifies subscribers 30 days in advance
6. **Monitor churn** — Watch subscription metrics after the change

### Workflow C: Set Up Introductory Pricing

1. **Create subscription** (if not exists) — Use `asc_create_subscription`
2. **Set standard price** — Establish the normal subscription price first
3. **Add introductory offer** — In App Store Connect, set offer type, duration, and price
4. **Localize** — Use `asc_set_subscription_localization` for each market's offer text
5. **Implement in-app** — Use StoreKit to display introductory pricing eligibility

### Workflow D: Regional Availability Strategy

1. **App-level availability** — Distribute app globally or restrict to specific storefronts
2. **IAP-level availability** — Restrict specific in-app purchases to territories where you have content rights
3. **Subscription-level availability** — Control per-subscription territory availability

**Important**: When removing an existing subscription from a territory, provide advance notice to existing subscribers.

## Common Pricing Mistakes

| Mistake | Why It Hurts | Fix |
|---------|--------------|-----|
| **Ignoring tax-inclusive display** | You think you earn $0.70 on $0.99, but VAT reduces proceeds in EU | Use App Store Connect's proceeds estimator |
| **Manual override on too many storefronts** | You lose auto-equalization and prices drift out of sync | Override only 2–3 key markets |
| **Forgetting subscription auto-adjust doesn't exist** | You expect FX changes to auto-update sub prices | Set calendar reminders to review sub pricing quarterly |
| **Wrong tax category** | Books taxed differently than software; video has special rules | Assign correct tax category in ASC |
| **Price increase without preserved pricing** | Existing subscribers churn unexpectedly | Preserve pricing for existing subscribers on increases |
| **Intro offer without localization** | Offer text shows in wrong language | Localize via `asc_set_subscription_localization` |

## Tax Categories

App Store Connect lets you assign tax categories based on content type. This affects tax rates in each territory.

| Category | Content Types |
|----------|--------------|
| Software | Default for most apps |
| Books | E-books, audiobooks |
| News / Magazines | Periodical subscriptions |
| Video | Streaming video, movies |

**Action**: Review and set the correct tax category in App Store Connect → App → Pricing and Availability → Tax Category. Incorrect categorization means incorrect tax calculation and lower/higher proceeds than expected.

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `asc_get_app_pricing` | Get current app pricing schedule (manual + automatic prices) |
| `asc_list_iaps` | List in-app purchases for pricing review |
| `asc_list_subscriptions` | List subscriptions to check current pricing |
| `asc_list_subscription_groups` | List subscription groups for tier strategy |
| `asc_create_iap` | Create a new IAP with pricing to be set in ASC |
| `asc_create_subscription` | Create a subscription with period and group level |
| `asc_update_subscription` | Update subscription metadata (not price — done in ASC) |
| `asc_set_iap_localization` | Localize IAP name/description for pricing display |
| `asc_set_subscription_localization` | Localize subscription name/description |

**Note**: Setting actual prices requires App Store Connect web UI or the App Store Connect API. The MCP server covers IAP/subscription creation and metadata; price scheduling is managed through ASC's pricing tool directly.

## Quick Reference: Price Selection

### App Pricing Conventions

| Price | Signal | Typical Use |
|-------|--------|-------------|
| Free + IAP | Freemium | Most common; lowest barrier |
| $0.99 | Impulse buy | Simple utility apps |
| $1.99–$2.99 | Value app | Tools, productivity |
| $3.99–$5.99 | Premium utility | Pro features, no subscriptions |
| $9.99+ | Professional | Niche professional tools |

### Subscription Pricing Conventions

| Monthly Price | Annual Equivalent | Category |
|---------------|-------------------|----------|
| $0.99–$1.99 | $9.99–$19.99 | Budget/utility |
| $2.99–$4.99 | $29.99–$39.99 | Consumer/prosumer |
| $5.99–$9.99 | $49.99–$79.99 | Premium consumer |
| $10.99–$19.99 | $89.99–$149.99 | Pro/professional |
| $20+ | $150+ | Enterprise/niche |

### Annual Plan Psychology

Annual plans should be priced at roughly **8–10 months** of the monthly price (17–20% discount). Too small a discount won't drive annual commitment; too large erodes lifetime value.

## Cross-References

- `asc-submission` — Prepare app metadata and screenshots for review
- `ios-build` — Build validation before pricing changes go live
- `apple-review` — Review compliance including IAP restore mechanisms and pricing display

<!-- END SKILL: app-store-pricing -->

---

<!-- BEGIN SKILL: apple-architecture-diagram -->

# apple-architecture-diagram

# Apple Architecture Diagram

Create WWDC-Keynote-ready architecture diagrams for Apple platform apps. Self-contained HTML+SVG, dark cinematic aesthetic, interactive drill-down across four architectural layers.

> **Embody a WWDC presenter.** Your diagrams are shown on a 40-foot screen to thousands of developers. Every pixel earns its place. No filler. No generic tech aesthetics.

## When to Use

- "Draw the architecture of this app" / "Show me how this is structured"
- "Document our iOS app architecture" / "Create a system diagram"
- "What's the data flow?" / "How do the modules interact?"
- "Show me the MVVM structure" / "SwiftData architecture"
- "Keynote-ready diagram" / "WWDC-style architecture doc"
- Comparing before/after refactoring architectures

## Core Philosophy

### 1. Apple Design Language, Not Generic Tech

**Anti-AI-slop rules specific to Apple diagrams:**

| Avoid | Use Instead |
|-------|-------------|
| Purple gradients | Apple system colors on true black |
| JetBrains Mono | SF Mono or ui-monospace |
| Material Design cards | Apple glass material with purposeful blur |
| Generic server icons | Apple device frames (iPhone, Mac, Vision Pro) |
| Flat color fills | Subtle depth, 1px borders, ambient glow |
| Cluttered boxes everywhere | Progressive disclosure — show layers on demand |
| Random hex colors | Apple semantic palette (see below) |

### 2. Four-Layer Drill-Down

Every architecture diagram supports four zoom levels. Default to **Logical**, let user drill:

| Layer | Question Answered | Detail Level |
|-------|-------------------|--------------|
| **Conceptual** | What problem does this solve? | User flows, business value, metrics |
| **Logical** | What are the major parts? | MVVM/TCA layers, modules, boundaries |
| **Physical** | Where does it run? | Devices, processes, threads, Darwin layers |
| **Implementation** | What are the actual files? | Xcode groups, specific classes, frameworks |

### 3. Cinematic Reveal

WWDC keynotes don't show everything at once. They **build**. Your diagrams should:
- Load with the Conceptual layer visible, others dimmed
- Animate elements in with staggered CSS transitions (0.3s ease-out)
- Use opacity + translateY for entrance, never jarring pops
- Reserve "hero moments" for the most important connection or boundary

---

## Apple Design System

### Color Palette

Use Apple system colors on true black `#000000`. Never tint neutrals toward purple.

| Component Type | Fill | Stroke | Glow (optional) |
|---------------|------|--------|-----------------|
| **User / Client** | `rgba(10, 132, 255, 0.12)` | `#0A84FF` | `0 0 20px rgba(10,132,255,0.15)` |
| **SwiftUI / UIKit View** | `rgba(94, 92, 230, 0.12)` | `#5E5CE6` | `0 0 20px rgba(94,92,230,0.15)` |
| **ViewModel / @Observable** | `rgba(191, 90, 242, 0.12)` | `#BF5AF2` | `0 0 20px rgba(191,90,242,0.15)` |
| **Service / Manager** | `rgba(255, 159, 10, 0.12)` | `#FF9F0A` | `0 0 20px rgba(255,159,10,0.15)` |
| **Data / SwiftData / Core Data** | `rgba(48, 209, 88, 0.12)` | `#30D158` | `0 0 20px rgba(48,209,88,0.15)` |
| **Cloud / Network** | `rgba(100, 210, 255, 0.12)` | `#64D2FF` | `0 0 20px rgba(100,210,255,0.15)` |
| **Apple Service** (CloudKit, APNS, etc.) | `rgba(255, 214, 10, 0.10)` | `#FFD60A` | `0 0 20px rgba(255,214,10,0.12)` |
| **Security / Keychain** | `rgba(255, 69, 58, 0.12)` | `#FF453A` | `0 0 20px rgba(255,69,58,0.15)` |
| **External API** | `rgba(255, 55, 95, 0.12)` | `#FF375F` | `0 0 20px rgba(255,55,95,0.15)` |
| **Combine / Event Bus** | `rgba(175, 82, 222, 0.12)` | `#AF52DE` | — |
| **Surface / Background** | `#1C1C1E` | `#38383A` | — |
| **Glass Panel** | `rgba(120, 120, 128, 0.24)` | `rgba(255,255,255,0.1)` | `backdrop-filter: blur(20px)` |

**Text colors:**
- Primary: `#FFFFFF`
- Secondary: `rgba(255, 255, 255, 0.6)`
- Tertiary: `rgba(255, 255, 255, 0.3)`
- Label on colored fill: `#FFFFFF` with `text-shadow: 0 1px 2px rgba(0,0,0,0.5)`

### Typography

```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  /* Fallback chain: SF Pro → Inter → system-ui */
  :root {
    --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
    --font-mono: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;
  }
</style>
```

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Hero Title | 48px | 700 | Diagram title, top of page |
| Section Label | 14px | 600 | Layer titles, group headers |
| Component Name | 13px | 500 | Box labels inside SVG |
| Sublabel / Type | 11px | 400 | Protocol names, file references |
| Annotation | 10px | 400 | Arrows, small notes |
| Code / Mono | 12px | 400 | Class names, framework refs |

### Spacing System

Apple 8-point grid, adapted for SVG diagrams:

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 8px | Tight internal padding |
| `space-sm` | 16px | Component internal padding |
| `space-md` | 24px | Between related components |
| `space-lg` | 32px | Between groups |
| `space-xl` | 48px | Section breaks |
| `space-2xl` | 64px | Major boundaries |

**Vertical stacking rule:** Minimum 40px gap between component rows. Inline connectors (event buses) sit centered in the gap.

### Component Shape Language

- **Standard node:** `rx="12"` (Apple's large corner radius), 1.5px stroke
- **Device frame:** `rx="24"` for iPhone, `rx="16"` for Mac, `rx="40"` for Vision Pro
- **Security boundary:** Dashed stroke `stroke-dasharray="6,4"`, red tint, no fill
- **Module boundary:** Dashed stroke `stroke-dasharray="10,5"`, white 20% opacity, `rx="16"`
- **Glass detail panel:** `backdrop-filter: blur(20px)`, `background: rgba(120,120,128,0.24)`, `border: 1px solid rgba(255,255,255,0.1)`, `rx="16"`

---

## SVG Component Library

### Standard Service Node

```svg
<g class="node" data-layer="logical">
  <!-- Opaque backing to mask arrows behind -->
  <rect x="140" y="80" width="160" height="60" rx="12" fill="#1C1C1E"/>
  <!-- Styled surface -->
  <rect x="140" y="80" width="160" height="60" rx="12" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
  <!-- Label -->
  <text x="220" y="108" text-anchor="middle" fill="#FFFFFF" font-family="var(--font-display)" font-size="13" font-weight="500">TimerView</text>
  <text x="220" y="125" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="var(--font-mono)" font-size="10">SwiftUI.View</text>
</g>
```

### Device Frame — iPhone

```svg
<g class="device-frame" transform="translate(40, 40)">
  <rect x="0" y="0" width="200" height="400" rx="32" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <!-- Dynamic Island -->
  <rect x="60" y="12" width="80" height="28" rx="14" fill="#000"/>
  <!-- Screen content area -->
  <rect x="8" y="50" width="184" height="320" rx="8" fill="#1C1C1E"/>
  <!-- Home indicator -->
  <rect x="70" y="384" width="60" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
</g>
```

### Device Frame — Mac

```svg
<g class="device-frame" transform="translate(40, 40)">
  <!-- Top bar -->
  <rect x="0" y="0" width="400" height="28" rx="8" fill="#2C2C2E"/>
  <circle cx="20" cy="14" r="6" fill="#FF453A"/>
  <circle cx="40" cy="14" r="6" fill="#FFD60A"/>
  <circle cx="60" cy="14" r="6" fill="#30D158"/>
  <!-- Screen -->
  <rect x="0" y="28" width="400" height="272" rx="0 0 8 8" fill="#1C1C1E"/>
</g>
```

### Arrow / Connection

```svg
<defs>
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.4)"/>
  </marker>
</defs>
<!-- Data flow (solid) -->
<path d="M300,190 L460,190" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
<!-- Async / Event flow (dashed) -->
<path d="M300,230 L460,230" stroke="rgba(191,90,242,0.6)" stroke-width="1.5" stroke-dasharray="6,4" fill="none" marker-end="url(#arrow)"/>
```

### Glass Detail Panel (for drill-down)

```svg
<foreignObject x="520" y="80" width="280" height="200">
  <div xmlns="http://www.w3.org/1999/xhtml" style="
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(120,120,128,0.24);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 16px;
    color: white;
    font-family: var(--font-display);
  ">
    <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">TimerViewModel</div>
    <div style="font-size: 11px; color: rgba(255,255,255,0.6); font-family: var(--font-mono);">
      @MainActor @Observable<br/>
      Sources/ViewModels/
    </div>
  </div>
</foreignObject>
```

---

## Drill-Down Architecture

### Layer Toggle UI

Place a segmented control above the SVG for layer switching:

```html
<div class="layer-switcher" style="display: flex; gap: 4px; margin-bottom: 24px;">
  <button onclick="showLayer('conceptual')" class="layer-btn active">Conceptual</button>
  <button onclick="showLayer('logical')" class="layer-btn">Logical</button>
  <button onclick="showLayer('physical')" class="layer-btn">Physical</button>
  <button onclick="showLayer('implementation')" class="layer-btn">Implementation</button>
</div>
```

```css
.layer-btn {
  background: rgba(120,120,128,0.24);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  padding: 6px 16px;
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.layer-btn.active {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border-color: rgba(255,255,255,0.3);
}
```

### JavaScript Layer Controller

```html
<script>
function showLayer(layerName) {
  document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  const layers = ['conceptual', 'logical', 'physical', 'implementation'];
  layers.forEach(l => {
    const g = document.getElementById('layer-' + l);
    if (g) {
      g.style.opacity = l === layerName ? '1' : '0.15';
      g.style.pointerEvents = l === layerName ? 'all' : 'none';
    }
  });
}
</script>
```

### SVG Layer Groups

```svg
<svg viewBox="0 0 1000 640" style="width: 100%; height: auto;">
  <!-- Background grid (subtle) -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#000"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  
  <!-- Conceptual layer: user flows, value prop -->
  <g id="layer-conceptual" style="transition: opacity 0.5s ease;">
    <!-- User personas, business value, key metrics -->
  </g>
  
  <!-- Logical layer: MVVM, modules, boundaries -->
  <g id="layer-logical" style="transition: opacity 0.5s ease;">
    <!-- Views, ViewModels, Services, Data stores -->
  </g>
  
  <!-- Physical layer: devices, processes, Darwin -->
  <g id="layer-physical" style="transition: opacity 0.5s ease;">
    <!-- iPhone process, watch extension, CloudKit daemon -->
  </g>
  
  <!-- Implementation layer: Xcode groups, files -->
  <g id="layer-implementation" style="transition: opacity 0.5s ease;">
    <!-- File tree, framework dependencies, build phases -->
  </g>
</svg>
```

---

## HTML Template Structure

Every diagram follows this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[App Name] — Architecture</title>
  <!-- Fonts -->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    :root {
      --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
      --font-mono: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      color: #fff;
      font-family: var(--font-display);
      padding: 48px;
      min-height: 100vh;
    }
    /* ... all styles ... */
  </style>
</head>
<body>
  <!-- 1. Header -->
  <header style="margin-bottom: 32px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: #30D158; box-shadow: 0 0 12px #30D158;"></div>
      <h1 style="font-size: 32px; font-weight: 700; letter-spacing: -0.02em;">[App Name]</h1>
    </div>
    <p style="color: rgba(255,255,255,0.5); font-size: 15px;">Architecture Overview — [Platform]</p>
  </header>

  <!-- 2. Layer Switcher -->
  <div class="layer-switcher">...</div>

  <!-- 3. Main SVG Diagram -->
  <div style="border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 24px; background: rgba(255,255,255,0.02);">
    <svg viewBox="0 0 1000 640">...</svg>
  </div>

  <!-- 4. Detail Cards (3-column grid below diagram) -->
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px;">
    <div class="glass-card">...</div>
    <div class="glass-card">...</div>
    <div class="glass-card">...</div>
  </div>

  <!-- 5. Export Toolbar -->
  <div class="toolbar">...</div>

  <!-- Scripts: layer toggle + export -->
  <script>...</script>
</body>
</html>
```

---

## Export Toolbar

Every diagram ships with the `⋯` toggle in the top-right:

```html
<div class="toolbar" style="position: fixed; top: 24px; right: 24px; z-index: 100;">
  <div class="toolbar-actions" style="display: none; gap: 8px; margin-bottom: 8px;">
    <button onclick="copyAsImage()" title="Copy PNG">📋</button>
    <button onclick="downloadPNG()" title="Download PNG">🖼️</button>
    <button onclick="downloadPDF()" title="Download PDF">📄</button>
  </div>
  <button class="toolbar-toggle" onclick="this.previousElementSibling.style.display = this.previousElementSibling.style.display === 'flex' ? 'none' : 'flex'" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(120,120,128,0.24); border: 1px solid rgba(255,255,255,0.1); color: #fff; cursor: pointer;">⋯</button>
</div>
```

**CDN dependencies (SRI-pinned):**
- `html2canvas@1.4.1` — for PNG capture
- `jspdf@2.5.2` — for PDF export

Capture excludes the toolbar, adds 32px padding around content, scale 2x for retina.

---

## Workflow

### Step 1: Analyze the codebase

Read key files to understand architecture:
- `README.md` — purpose, tech stack
- `*.xcodeproj` / `Package.swift` — dependencies, targets
- `Sources/` or top-level Swift files — module structure
- Key ViewModels, Services, Data models

### Step 2: Classify the architecture pattern

Determine which pattern the app uses:

| Pattern | Visual Signature |
|---------|-----------------|
| **MVVM + @Observable** | Views ↔ ViewModels ↔ Services ↔ Data |
| **TCA (The Composable Architecture)** | Store → Reducer → State + Actions → Effects |
| **Clean Architecture / VIPER** | View → Presenter → Interactor → Entity → Worker |
| **SwiftUI + SwiftData** | View → @Query → @Model → ModelContext |
| **Multi-platform (iOS + watchOS + visionOS)** | Device frames with shared services |

### Step 3: Map to four layers

Populate each layer with real project entities:

**Conceptual:**
- Who are the users? (persona icons)
- What value is created? (1-line value prop)
- Key metrics (optional)

**Logical:**
- Views (SwiftUI/UIKit)
- ViewModels / Store (state management)
- Services (network, location, notifications)
- Data layer (SwiftData, Core Data, UserDefaults, Keychain)
- Apple services (CloudKit, HealthKit, etc.)

**Physical:**
- Device/app process boundaries
- Extension processes (widget, watch, live activity)
- Background tasks (BGTaskScheduler)
- Network boundaries (device ↔ iCloud ↔ server)

**Implementation:**
- Xcode group structure
- Key files with paths
- Framework dependencies (local + SPM)
- Build target graph

### Step 4: Build the HTML

- Start with the template above
- Default SVG viewBox: `0 0 1000 640` (16:10, presentation-friendly)
- Logical layer is active by default
- Draw connections last (so they render behind boxes)
- Place legend outside all boundaries, 20px below lowest element

### Step 5: Validate

Before delivering:
- [ ] Open in Safari — does it look Keynote-ready?
- [ ] Test all four layer toggles
- [ ] Export PNG at 2x — is text crisp?
- [ ] Check that no arrows overlap component labels
- [ ] Verify legend is outside all boundary boxes
- [ ] Confirm no generic purple gradients or Inter-as-display-font slop

---

## Cross-Skill References

| Need | Load |
|------|------|
| Aesthetic guidance, anti-slop check, design critique | `huashu-design` skill |
| Swift 6 concurrency patterns for Physical layer | `ios-standards` skill |
| SwiftUI / SwiftData implementation details | `apple-design` skill |
| Specific API signatures for Apple frameworks | `ios26-api-reference` skill |
| Build target analysis | `ios-build` skill |

---

## Legend Placement Rule

**CRITICAL:** Place legends OUTSIDE all boundary boxes.

```
Module Boundary: y=30, height=460 → ends at y=490
Legend should start at: y=510 or below
SVG viewBox height: at least 580 to fit
```

Wrong: Legend at y=470 inside a boundary that ends at y=490.
Right: Legend at y=510, below the boundary, with viewBox extended.

---

## Output Specification

- **Single self-contained `.html` file**
- **Embedded CSS only** (no external stylesheets)
- **Inline SVG only** (no external images)
- **JavaScript** only for layer toggle and export (no frameworks)
- **Google Fonts via CSS @import** acceptable for display font fallback
- **CDN scripts** only for html2canvas + jsPDF export
- File name: `[AppName]-architecture.html`

---

## Example Trigger Phrases

> "Show me the architecture of this iOS app"
> "Create a WWDC-style diagram for our SwiftData setup"
> "How is the app structured? Make it visual."
> "Document our MVVM architecture — Keynote ready"
> "Draw the data flow from CloudKit to SwiftUI"
> "Architecture diagram with drill-down for our watchOS extension"

<!-- REFERENCE: apple-architecture-diagram/references/visual-patterns.md -->

# Visual Patterns for Apple Architecture Diagrams

Ready-to-copy SVG patterns for common Apple app architectures. Use as building blocks in `apple-architecture-diagram` skill.

## Pattern 1: MVVM + @Observable (Standard)

The bread and butter of modern SwiftUI apps. View → ViewModel → Service → Data.

```svg
<!-- View Layer -->
<g id="mvvm-views">
  <rect x="80" y="100" width="140" height="56" rx="12" fill="#1C1C1E" stroke="#5E5CE6" stroke-width="1.5"/>
  <text x="150" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">TimerView</text>
  <text x="150" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">SwiftUI.View</text>
  
  <rect x="80" y="180" width="140" height="56" rx="12" fill="#1C1C1E" stroke="#5E5CE6" stroke-width="1.5"/>
  <text x="150" y="205" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">HistoryView</text>
  <text x="150" y="222" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">SwiftUI.View</text>
</g>

<!-- ViewModel Layer -->
<g id="mvvm-viewmodels">
  <rect x="340" y="100" width="160" height="56" rx="12" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
  <text x="420" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">TimerViewModel</text>
  <text x="420" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Observable</text>
  
  <rect x="340" y="180" width="160" height="56" rx="12" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
  <text x="420" y="205" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">HistoryViewModel</text>
  <text x="420" y="222" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Observable</text>
</g>

<!-- Service Layer -->
<g id="mvvm-services">
  <rect x="620" y="100" width="160" height="56" rx="12" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1.5"/>
  <text x="700" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">TimerService</text>
  <text x="700" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">actor</text>
  
  <rect x="620" y="180" width="160" height="56" rx="12" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1.5"/>
  <text x="700" y="205" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">NotificationService</text>
  <text x="700" y="222" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@MainActor</text>
</g>

<!-- Data Layer -->
<g id="mvvm-data">
  <rect x="620" y="280" width="160" height="56" rx="12" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
  <text x="700" y="305" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">SwiftData</text>
  <text x="700" y="322" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Model</text>
  
  <rect x="620" y="360" width="160" height="56" rx="12" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
  <text x="700" y="385" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">UserDefaults</text>
  <text x="700" y="402" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">Foundation</text>
</g>

<!-- Arrows: View → ViewModel -->
<path d="M220,128 L340,128" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M220,208 L340,208" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>

<!-- Arrows: ViewModel → Service -->
<path d="M500,128 L620,128" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M500,208 L620,208" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>

<!-- Arrows: Service → Data -->
<path d="M700,156 L700,280" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Boundaries -->
<rect x="60" y="70" width="180" height="190" rx="16" fill="none" stroke="rgba(94,92,230,0.3)" stroke-width="1" stroke-dasharray="8,4"/>
<text x="70" y="95" fill="#5E5CE6" font-size="11" font-weight="600">Presentation</text>

<rect x="320" y="70" width="200" height="190" rx="16" fill="none" stroke="rgba(191,90,242,0.3)" stroke-width="1" stroke-dasharray="8,4"/>
<text x="330" y="95" fill="#BF5AF2" font-size="11" font-weight="600">Domain</text>

<rect x="600" y="70" width="200" height="370" rx="16" fill="none" stroke="rgba(255,159,10,0.3)" stroke-width="1" stroke-dasharray="8,4"/>
<text x="610" y="95" fill="#FF9F0A" font-size="11" font-weight="600">Data &amp; Infrastructure</text>
```

## Pattern 2: Multi-Platform with Shared Services

iPhone + Apple Watch + Vision Pro sharing a core service layer.

```svg
<!-- iPhone -->
<g transform="translate(80, 80)">
  <rect x="0" y="0" width="140" height="280" rx="24" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <rect x="42" y="10" width="56" height="20" rx="10" fill="#000"/>
  <rect x="8" y="40" width="124" height="220" rx="10" fill="#1C1C1E"/>
  <text x="70" y="235" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10">iOS App</text>
</g>

<!-- Apple Watch -->
<g transform="translate(280, 140)">
  <rect x="0" y="0" width="100" height="120" rx="32" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <rect x="8" y="8" width="84" height="104" rx="24" fill="#1C1C1E"/>
  <text x="50" y="110" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="9">watchOS</text>
</g>

<!-- Vision Pro -->
<g transform="translate(260, 300)">
  <rect x="0" y="0" width="140" height="90" rx="40" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
  <rect x="10" y="10" width="120" height="70" rx="30" fill="#1C1C1E"/>
  <text x="70" y="80" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="9">visionOS</text>
</g>

<!-- Shared Services -->
<rect x="480" y="120" width="180" height="200" rx="16" fill="none" stroke="rgba(255,159,10,0.4)" stroke-width="1.5" stroke-dasharray="8,4"/>
<text x="495" y="145" fill="#FF9F0A" font-size="12" font-weight="600">Shared Core</text>

<rect x="500" y="160" width="140" height="40" rx="8" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="570" y="185" text-anchor="middle" fill="#fff" font-size="11">SessionService</text>

<rect x="500" y="210" width="140" height="40" rx="8" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="570" y="235" text-anchor="middle" fill="#fff" font-size="11">SyncEngine</text>

<rect x="500" y="260" width="140" height="40" rx="8" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="570" y="285" text-anchor="middle" fill="#fff" font-size="11">HealthKitService</text>

<!-- CloudKit -->
<rect x="520" y="380" width="100" height="48" rx="8" fill="rgba(255,214,10,0.12)" stroke="#FFD60A" stroke-width="1"/>
<text x="570" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">CloudKit</text>
<text x="570" y="415" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Apple Service</text>

<!-- Connections -->
<path d="M220,220 L480,200" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M380,200 L480,200" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M330,345 L480,280" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M570,308 L570,380" stroke="rgba(255,214,10,0.4)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>
```

## Pattern 3: TCA (The Composable Architecture)

Store-driven unidirectional data flow with Effects.

```svg
<!-- Store -->
<rect x="400" y="100" width="160" height="60" rx="12" fill="rgba(10,132,255,0.15)" stroke="#0A84FF" stroke-width="2"/>
<text x="480" y="130" text-anchor="middle" fill="#fff" font-size="14" font-weight="600">StoreOf&lt;Feature&gt;</text>
<text x="480" y="148" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">ComposableArchitecture</text>

<!-- State -->
<rect x="200" y="220" width="140" height="50" rx="10" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
<text x="270" y="245" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Feature.State</text>
<text x="270" y="260" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@ObservableState</text>

<!-- Action -->
<rect x="420" y="220" width="120" height="50" rx="10" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1.5"/>
<text x="480" y="245" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Feature.Action</text>
<text x="480" y="260" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">enum</text>

<!-- Reducer -->
<rect x="620" y="220" width="140" height="50" rx="10" fill="rgba(255,69,58,0.12)" stroke="#FF453A" stroke-width="1.5"/>
<text x="690" y="245" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Feature</text>
<text x="690" y="260" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">Reducer</text>

<!-- Effect -->
<rect x="620" y="320" width="140" height="50" rx="10" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
<text x="690" y="345" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">Effect&lt;Action&gt;</text>
<text x="690" y="360" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">async / Combine</text>

<!-- View -->
<rect x="200" y="100" width="120" height="50" rx="10" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
<text x="260" y="125" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">FeatureView</text>
<text x="260" y="140" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">View</text>

<!-- Arrows -->
<!-- View sends Action to Store -->
<path d="M320,125 L400,130" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="355" y="118" fill="rgba(255,255,255,0.4)" font-size="9">send(action)</text>

<!-- Store holds State -->
<path d="M450,160 L310,220" stroke="rgba(191,90,242,0.5)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Store dispatches to Reducer -->
<path d="M560,130 L660,220" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>

<!-- Reducer returns Effect -->
<path d="M690,270 L690,320" stroke="rgba(48,209,88,0.5)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Effect feeds back to Store -->
<path d="M620,345 L520,160" stroke="rgba(48,209,88,0.4)" stroke-width="1.5" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
<text x="590" y="280" fill="rgba(48,209,88,0.7)" font-size="9">Effect output</text>

<!-- State drives View -->
<path d="M260,220 L260,150" stroke="rgba(94,92,230,0.5)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="230" y="185" fill="rgba(94,92,230,0.7)" font-size="9">@Bindable</text>
```

## Pattern 4: SwiftData Stack

SwiftUI → @Query → ModelContext → @Model → Persistence.

```svg
<!-- SwiftUI View with @Query -->
<rect x="100" y="100" width="160" height="60" rx="12" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
<text x="180" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">SessionListView</text>
<text x="180" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Query</text>

<!-- ModelContext -->
<rect x="340" y="100" width="160" height="60" rx="12" fill="rgba(191,90,242,0.12)" stroke="#BF5AF2" stroke-width="1.5"/>
<text x="420" y="125" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">ModelContext</text>
<text x="420" y="142" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">SwiftData</text>

<!-- @Model -->
<rect x="340" y="220" width="160" height="60" rx="12" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1.5"/>
<text x="420" y="245" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">FocusSession</text>
<text x="420" y="262" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">@Model</text>

<!-- Persistence -->
<rect x="340" y="360" width="160" height="50" rx="10" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1.5"/>
<text x="420" y="380" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">SQLite</text>
<text x="420" y="395" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">.sqlite</text>

<!-- iCloud Sync -->
<rect x="580" y="220" width="140" height="50" rx="10" fill="rgba(255,214,10,0.12)" stroke="#FFD60A" stroke-width="1.5"/>
<text x="650" y="240" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">CloudKit</text>
<text x="650" y="255" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">iCloud Sync</text>

<!-- Arrows -->
<path d="M260,130 L340,130" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="295" y="122" fill="rgba(255,255,255,0.4)" font-size="9">fetch</text>

<path d="M420,160 L420,220" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="430" y="195" fill="rgba(255,255,255,0.4)" font-size="9">manages</text>

<path d="M420,280 L420,360" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>
<text x="430" y="325" fill="rgba(255,255,255,0.4)" font-size="9">persists</text>

<path d="M500,245 L580,245" stroke="rgba(255,214,10,0.4)" stroke-width="1.5" stroke-dasharray="6,3" marker-end="url(#arrow)"/>
<text x="535" y="238" fill="rgba(255,214,10,0.6)" font-size="9">sync</text>

<!-- Annotation: automatic -->
<rect x="100" y="200" width="180" height="32" rx="6" fill="rgba(120,120,128,0.24)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
<text x="190" y="220" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="10">ModelContext auto-injected via @Environment</text>
```

## Pattern 5: Widget + Live Activity Extension

App + WidgetExtension + LiveActivity sharing timeline data.

```svg
<!-- App Group Container -->
<rect x="300" y="60" width="380" height="420" rx="20" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="10,5"/>
<text x="320" y="90" fill="rgba(255,255,255,0.6)" font-size="12" font-weight="600">App Group Container</text>

<!-- Main App -->
<rect x="340" y="110" width="140" height="100" rx="12" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
<text x="410" y="140" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Main App</text>
<rect x="355" y="155" width="110" height="30" rx="6" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1"/>
<text x="410" y="174" text-anchor="middle" fill="#fff" font-size="10">TimerView</text>

<!-- Widget Extension -->
<rect x="340" y="240" width="140" height="100" rx="12" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
<text x="410" y="270" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Widget</text>
<rect x="355" y="285" width="110" height="30" rx="6" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="1"/>
<text x="410" y="304" text-anchor="middle" fill="#fff" font-size="10">TimerWidget</text>

<!-- Live Activity -->
<rect x="340" y="370" width="140" height="80" rx="12" fill="#0A0A0A" stroke="#38383A" stroke-width="2"/>
<text x="410" y="400" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Live Activity</text>
<rect x="355" y="410" width="110" height="24" rx="6" fill="rgba(255,159,10,0.12)" stroke="#FF9F0A" stroke-width="1"/>
<text x="410" y="426" text-anchor="middle" fill="#fff" font-size="10">ActivityWidget</text>

<!-- Shared -->
<rect x="530" y="180" width="120" height="160" rx="12" fill="rgba(100,210,255,0.08)" stroke="#64D2FF" stroke-width="1.5" stroke-dasharray="6,3"/>
<text x="590" y="205" text-anchor="middle" fill="#64D2FF" font-size="11" font-weight="600">Shared</text>
<rect x="545" y="220" width="90" height="28" rx="6" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1"/>
<text x="590" y="238" text-anchor="middle" fill="#fff" font-size="10">TimerEntry</text>
<rect x="545" y="258" width="90" height="28" rx="6" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1"/>
<text x="590" y="276" text-anchor="middle" fill="#fff" font-size="10">Provider</text>
<rect x="545" y="296" width="90" height="28" rx="6" fill="rgba(100,210,255,0.12)" stroke="#64D2FF" stroke-width="1"/>
<text x="590" y="314" text-anchor="middle" fill="#fff" font-size="10">AppIntent</text>

<!-- AppIntents -->
<rect x="80" y="200" width="120" height="60" rx="10" fill="rgba(255,214,10,0.12)" stroke="#FFD60A" stroke-width="1.5"/>
<text x="140" y="225" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">App Intents</text>
<text x="140" y="242" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="ui-monospace">Shortcuts</text>

<!-- Connections -->
<path d="M480,160 L530,240" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M480,290 L530,290" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M480,410 L530,330" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M200,230 L340,290" stroke="rgba(255,214,10,0.4)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>
```

## Pattern 6: Security / Keychain Flow

Sensitive data boundary with Keychain, Biometry, and Secure Enclave.

```svg
<!-- User -->
<circle cx="120" cy="140" r="30" fill="rgba(10,132,255,0.15)" stroke="#0A84FF" stroke-width="1.5"/>
<text x="120" y="145" text-anchor="middle" fill="#fff" font-size="12" font-weight="500">User</text>

<!-- App -->
<rect x="240" y="100" width="140" height="80" rx="12" fill="rgba(94,92,230,0.12)" stroke="#5E5CE6" stroke-width="1.5"/>
<text x="310" y="130" text-anchor="middle" fill="#fff" font-size="13" font-weight="500">App</text>
<text x="310" y="148" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">Presentation Layer</text>

<!-- Security Boundary -->
<rect x="460" y="60" width="220" height="200" rx="16" fill="none" stroke="rgba(255,69,58,0.4)" stroke-width="2" stroke-dasharray="6,4"/>
<text x="475" y="85" fill="#FF453A" font-size="11" font-weight="600">Security Boundary</text>

<!-- LocalAuthentication -->
<rect x="480" y="100" width="180" height="50" rx="8" fill="rgba(255,69,58,0.12)" stroke="#FF453A" stroke-width="1"/>
<text x="570" y="122" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">LocalAuthentication</text>
<text x="570" y="138" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Face ID / Touch ID</text>

<!-- Keychain -->
<rect x="480" y="170" width="180" height="50" rx="8" fill="rgba(255,69,58,0.12)" stroke="#FF453A" stroke-width="1"/>
<text x="570" y="192" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">Keychain Services</text>
<text x="570" y="208" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">kSecClassGenericPassword</text>

<!-- Secure Enclave -->
<rect x="740" y="135" width="160" height="50" rx="8" fill="rgba(255,55,95,0.12)" stroke="#FF375F" stroke-width="1.5"/>
<text x="820" y="157" text-anchor="middle" fill="#fff" font-size="11" font-weight="500">Secure Enclave</text>
<text x="820" y="173" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Hardware-isolated</text>

<!-- Arrows -->
<path d="M150,140 L240,140" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M380,140 L460,125" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M570,150 L570,170" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)"/>
<path d="M660,195 L740,160" stroke="rgba(255,69,58,0.4)" stroke-width="1.5" stroke-dasharray="4,4" marker-end="url(#arrow)"/>

<!-- Auth success annotation -->
<rect x="200" y="200" width="180" height="28" rx="6" fill="rgba(120,120,128,0.24)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
<text x="290" y="218" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="10">Biometric match → decrypt key</text>
```

## Common Marker Definition

Always include this in `<defs>`:

```svg
<defs>
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.4)"/>
  </marker>
  <marker id="arrow-dashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.25)"/>
  </marker>
</defs>
```

<!-- END SKILL: apple-architecture-diagram -->

---

<!-- BEGIN SKILL: apple-cleanup -->

# apple-cleanup

# Apple Cleanup — EXHAUSTIVE Engineering Hardening

> **Purpose:** Transform an app from "development mode" to "production hardened" through EXHAUSTIVE engineering excellence — crash-free, App Store compliant, fully optimized. This is MISSION-CRITICAL cleanup. Lives depend on it. No shortcuts. No omissions.

## ☠️ ULTIMATE RULES (NON-NEGOTIABLE)

1. **NEVER START UI TESTS** unless the user has explicitly approved it in the current conversation. This stands even if a plan says to run them. UI tests crash this user's Mac Mini.
2. **NEVER KEEP MULTIPLE VERSIONS OF A FEATURE IN CODE** (`v2Enabled`, `legacyMode`, `newFlow`, etc.). When replacing a feature, replace it. Delete the old path. Systematic modular variants (enum injection, DI, strategy protocols) are allowed; inline boolean forks are forbidden.
> 
> **Scope:** EXHAUSTIVE — ALL priorities must be addressed:
- **P0 (Critical):** Engineering crashes, data loss, security vulnerabilities — ZERO TOLERANCE
- **P1 (High):** Compliance rejection risks, Swift 6 improvements, performance, error handling — MUST FIX
- **P2 (Medium):** Tech debt, style cleanup, optimizations, documentation — MUST FIX
- **P3 (Low):** Minor refinements — address if identified

**THIS IS NOT OPTIONAL CLEANUP.** Every identified issue from P0 to P2 MUST be fixed before completion. No exceptions.

No design reviews, no marketing narratives.

## When to Use

- **Pre-submission hardening** — "The app works, now make it bulletproof for App Review"
- **Swift 6 compliance pass** — "Fix all concurrency warnings and strict mode issues"
- **Crash prevention sweep** — "Find and fix every potential crash"
- **Post-development cleanup** — "Clean up accumulated tech debt and AI slop"
- **Before TestFlight alpha** — "Engineering validation before distributing"

**Not for:** Design reviews, feature additions, version management, or marketing copy.

---

## Command Reference

```
/apple-cleanup              # Cleanup app in current directory
/apple-cleanup [app]        # Cleanup a specific app target
```

---

## Architecture: The Engineering Pipeline

```
/apple-cleanup [app]
│
├─► [Phase 1] ENGINEERING & COMPLIANCE REVIEW ────────────────────
│   │
│   ├─► Subagent: Engineering Panel (Swift 6, SwiftData, patterns)
│   └─► Subagent: Compliance Panel (App Store rejection risks)
│   │
│   └─► Output: Correlated findings with priority matrix
│
├─► [Phase 2] SURGICAL EXECUTION PLAN ────────────────────────────
│   │
│   ├─► Analyze findings → categorize into workstreams
│   ├─► Estimate effort and dependencies
│   └─► Output: Surgical execution plan
│
├─► [Phase 3] WORKTREE SETUP ─────────────────────────────────────
│   │
│   ├─► Create isolated worktree: `cleanup-{app}-{timestamp}`
│   ├─► Verify clean build in worktree
│   └─► Output: Ready workspace for automated fixes
│
├─► [Phase 4] PARALLEL CLEANUP SWARM ─────────────────────────────
│   │
│   ├─► Bug Fix Squad (crash risks, logic errors, edge cases)
│   ├─► Swift 6 Squad (concurrency, Sendable, @MainActor)
│   ├─► SwiftData Squad (models, queries, migrations)
│   ├─► Optimization Squad (performance, memory)
│   ├─► AI Deslop Squad (cleanup, style normalization)
│   └─► Integration Squad (unwired features, previews, accessibility)
│   │
│   └─► Output: All fixes applied, verified in worktree
│
├─► [Phase 5] VERIFICATION & VALIDATION ──────────────────────────
│   │
│   ├─► Build verification (zero errors)
│   ├─► Test suite execution
│   ├─► Archive verification (production validation)
│   ├─► SwiftLint enforcement
│   └─► Output: PASS/FAIL with detailed report
│
├─► [Phase 6] DOCUMENTATION ──────────────────────────────────────
│   │
│   ├─► Generate cleanup report (what was fixed)
│   ├─► Generate future tech debt doc
│   └─► Output: Complete documentation package
│
├─► [Phase 7] TESTFLIGHT ALPHA PUSH ──────────────────────────────
│   │
│   ├─► Commit all changes to worktree
│   ├─► Merge to main
│   ├─► Push alpha to TestFlight via Fastlane
│   ├─► Poll CI until build completes
│   ├─► Verify build distributed to Internal Testing
│   └─► Output: Build #N live on TestFlight
│
└─► [Phase 8] FINAL REPORT ───────────────────────────────────────
    │
    └─► Comprehensive report with TestFlight confirmation
```

---

## Phase 1: Engineering & Compliance Review

Spawn 2 parallel subagents reading the entire app codebase.

### Review Panels

Each panel is a self-contained subagent prompt kept in `references/` (progressive
disclosure — load only what you dispatch). For each panel: read the reference
file, fill in the app/package path placeholders, and dispatch the prompt verbatim
as the listed subagent type. Spawn both in parallel reading the entire codebase.

| Panel | Subagent type | Lens | Prompt |
|-------|---------------|------|--------|
| 1. Engineering | `apple-dev-skills:code-reviewer` | Swift 6 concurrency, SwiftData, SwiftUI patterns, performance, error handling, architecture, tests | `references/panel-engineering.md` |
| 2. Compliance | `apple-dev-skills:explore` | App Store guidelines, privacy manifest, entitlements, binary/build, content/legal, IAP | `references/panel-compliance.md` |

Both panel prompts enforce the same contract:

- **API grounding** — the engineering panel loads `ios26-api-reference` essentials
  for every detected framework and (optionally) cross-checks signatures against
  Context7 live docs before flagging.
- **Stable finding IDs** — Engineering `E-`, Compliance `C-` — carried into the
  Phase 2 priority matrix.
- **Priority buckets** — P0 (crash/bug or rejection risk) → P1 (quality / may
  cause rejection) → P2 (tech debt / recommended).
- **Mandatory structured output** — each prompt ends with a required output format
  (scores table, bucketed findings, compliance checklist) so the orchestrator can
  correlate results.

---

## Phase 2: Surgical Execution Plan

After both panels return, correlate findings and create the execution plan.

### Priority Matrix — ALL MUST BE FIXED

| Finding Type | Priority | Squad Assignment | Status Requirement |
|--------------|----------|------------------|-------------------|
| P0 - Engineering crashes/data loss | CRITICAL | Bug Fix Squad | MUST FIX — Zero tolerance |
| P0 - Compliance (rejection risk) | CRITICAL | Integration Squad | MUST FIX — Zero tolerance |
| P1 - Engineering (quality/concurrency) | HIGH | Swift 6 / SwiftData / Optimization Squads | MUST FIX — No exceptions |
| P1 - Error handling improvements | HIGH | Bug Fix Squad | MUST FIX — No silent failures |
| P1 - Compliance (warnings) | HIGH | Integration Squad | MUST FIX — Prevent escalation |
| P2 - Tech debt, optimizations | MEDIUM | AI Deslop / Optimization Squads | MUST FIX — Clean slate required |
| P2 - Documentation, style | MEDIUM | AI Deslop Squad | MUST FIX — Maintainability |
| P3 - Minor refinements | LOW | AI Deslop Squad | Fix if identified |

**EXHAUSTIVE CLEANUP PRINCIPLE:**
- **P0:** Engineering crashes, data loss, security vulnerabilities — ZERO TOLERANCE. All must be fixed.
- **P1:** Compliance rejection risks, engineering improvements, error handling — ALL MUST BE FIXED. No exceptions.
- **P2:** Tech debt, optimizations, style, documentation — ALL MUST BE FIXED. Clean slate required.
- **P3:** Minor refinements — address if found.

**COMPLETION CRITERIA:** The cleanup is NOT complete until ALL P0, P1, and P2 issues identified in Phase 1 are resolved, verified, and documented.

### Execution Plan Template

```markdown
# Engineering Cleanup Plan: {App}

**Date:** YYYY-MM-DD
**Worktree:** cleanup-{app}-{timestamp}
**Estimated Duration:** X hours
**Risk Level:** [LOW / MEDIUM / HIGH / CRITICAL]

---

## Summary

| Category | P0 Critical | P1 High | P2 Medium | Total |
|----------|-------------|---------|-----------|-------|
| Engineering | X | X | X | X |
| Compliance | X | X | X | X |
| **Total** | **X** | **X** | **X** | **X** |

---

## Squad Assignments

### Bug Fix Squad — [X P0 issues]
| ID | Issue | File:Line | Root Cause | Fix Strategy |
|----|-------|-----------|------------|--------------|
| B-01 | [Description] | [location] | [cause] | [approach] |

### Swift 6 Squad — [X issues]
| ID | Issue | File:Line | Current | Target |
|----|-------|-----------|---------|--------|
| S6-01 | [Description] | [location] | [current] | [target] |

### SwiftData Squad — [X issues]
| ID | Issue | File:Line | Current | Target |
|----|-------|-----------|---------|--------|
| SD-01 | [Description] | [location] | [current] | [target] |

### Optimization Squad — [X issues]
| ID | Issue | File:Line | Current | Target |
|----|-------|-----------|---------|--------|
| OPT-01 | [Description] | [location] | [current] | [target] |

### AI Deslop Squad — [X issues]
| ID | Pattern | Files | Current | Target |
|----|---------|-------|---------|--------|
| SL-01 | [Pattern] | [files] | [example] | [target] |

### Integration Squad — [X issues]
| ID | Gap | Location | Missing | Implementation |
|----|-----|----------|---------|----------------|
| INT-01 | [Description] | [location] | [what's missing] | [how to add] |

---

## Dependency Graph

```
[Which fixes must happen before others]
```

---

## Success Criteria

- [ ] All P0 issues resolved
- [ ] Build succeeds with zero errors
- [ ] All tests pass
- [ ] Archive succeeds (production-ready)
- [ ] SwiftLint clean
- [ ] No AI slop remaining
- [ ] All features wired
- [ ] TestFlight alpha pushed and verified
```

---

## Phase 3: Worktree Setup

Create an isolated workspace for automated surgery:

```bash
# Create worktree
WORKTREE_NAME="cleanup-{app}-$(date +%Y%m%d-%H%M%S)"
git worktree add "../$WORKTREE_NAME" -b "$WORKTREE_NAME"
cd "../$WORKTREE_NAME"

# Generate project
xcodegen generate

# Verify clean build
echo "=== Initial Build Verification ==="
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | tail -20
```

---

## Phase 4: Parallel Cleanup Swarm

Dispatch specialized subagents in parallel batches.

### Squad Dispatch Patterns

**Bug Fix Squad (P0 critical):**
```yaml
subagent_type: apple-dev-skills:coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a BUG FIX SPECIALIST in worktree: {worktree_path}
  
  CRITICAL BUG: {bug_description}
  Location: {file:line}
  Root Cause: {analysis}
  Risk: {crash/data loss/rejection}
  
  STEPS:
  1. Read affected file(s) in worktree
  2. Understand the bug and its impact
  3. Implement minimal, safe fix
  4. Build verify: `xcodebuild -scheme {App}-iOS build`
  5. Report: Fix applied + verification result
  
  CONSTRAINTS:
  - Minimal changes — fix only the bug
  - Follow ios26-api-reference essentials patterns strictly
  - No new dependencies
  - Build must pass
  
  Return: Fix summary + build status
```

**Swift 6 Squad:**
```yaml
subagent_type: apple-dev-skills:coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a SWIFT 6 COMPLIANCE SPECIALIST in worktree: {worktree_path}
  
  ISSUE: {concurrency_issue}
  Location: {file:line}
  
  REQUIRED:
  1. Load ios26-api-reference/essentials/swift6.md before fixing
  2. Use Context7 MCP to verify any unfamiliar concurrency API patterns (optional)
  3. Cross-reference live findings with local crash prevention rules
  
  Common fixes:
  - Add @preconcurrency import for Apple frameworks
  - Add @MainActor to UI-related classes
  - Use nonisolated deinit for MainActor classes
  - Fix Sendable conformance issues
  - Add proper Task cancellation
  
  Verify with build after each change.
  
  Return: Changes made + compliance improvement
```

**SwiftData Squad:**
```yaml
subagent_type: apple-dev-skills:coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a SWIFTDATA SPECIALIST in worktree: {worktree_path}
  
  ISSUE: {swifdata_issue}
  Location: {file:line}
  
  REQUIRED:
  1. Load ios26-api-reference/essentials/swiftdata.md before fixing
  2. Use Context7 MCP to verify SwiftData API signatures (optional)
  3. Query Context7 for migration patterns if schema changes are needed (optional)
  
  Common fixes:
  - Add default values to model properties
  - Fix query efficiency (avoid N+1)
  - Proper context threading
  - Migration strategy if schema changed
  
  Return: Changes made + data integrity verification
```

**Optimization Squad:**
```yaml
subagent_type: apple-dev-skills:coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are a PERFORMANCE OPTIMIZER in worktree: {worktree_path}
  
  TARGET: {optimization_description}
  Location: {file:line}
  
  Focus areas:
  - Memory leaks and retain cycles
  - Expensive computations in body
  - Inefficient SwiftData queries
  - Timer pattern issues
  - Background task efficiency
  
  Return: Optimizations applied + estimated improvement
```

**AI Deslop Squad:**
```yaml
subagent_type: apple-dev-skills:coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are an AI DESLOP SPECIALIST in worktree: {worktree_path}
  
  TARGET: {pattern_description}
  Files: {file_list}
  
  Remove these patterns:
  - Unnecessary/obvious comments
  - Defensive checks abnormal for codebase
  - Casts to `any` to bypass types
  - Deep nesting (use early returns)
  - Debug prints in production
  - Force unwraps without safety comments
  - Inconsistent style
  
  CONSTRAINTS:
  - Keep behavior identical
  - Minimal, focused edits
  - Build must pass
  
  Return: Files cleaned + specific changes
```

**Integration Squad:**
```yaml
subagent_type: apple-dev-skills:coder
worktree: cleanup-{app}-{timestamp}
prompt: |
  You are an INTEGRATION SPECIALIST in worktree: {worktree_path}
  
  GAP: {gap_description}
  Location: {file:line}
  
  Tasks:
  - Add missing #Preview to SwiftUI views
  - Wire up placeholder buttons/actions
  - Add missing accessibility labels
  - Replace hardcoded colors with Theme tokens
  - Fix compliance issues (privacy descriptions, etc.)
  
  Return: Integrations completed + verification
```

---

## Phase 5: Verification & Validation

After all squads complete, run comprehensive verification:

```bash
#!/bin/bash
# verification.sh — Run in worktree

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICATION PIPELINE"
echo "═══════════════════════════════════════════════════════════════"

# 1. Project Generation
echo ""
echo "📋 Phase 1: Project Generation"
xcodegen generate 2>&1 | tail -5

# 2. Build Verification
echo ""
echo "🔨 Phase 2: Build Verification"
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | grep -E "error:|warning:|Build succeeded|BUILD FAILED" | tail -10

# 3. Archive Verification (catches production issues)
echo ""
echo "📦 Phase 3: Archive Verification"
make archive-{app} 2>&1 | tail -20

# 4. Test Execution
echo ""
echo "🧪 Phase 4: Test Execution"
swift test 2>&1 | tail -30

# 5. SwiftLint
echo ""
echo "🎨 Phase 5: SwiftLint"
swiftlint lint --quiet 2>&1 | head -20 || echo "SwiftLint clean or not configured"

# 6. Slop Scan
echo ""
echo "🧹 Phase 6: Slop Scan"
echo "Force unwraps:"
grep -rn " try!\| as!\|!." --include="*.swift" . | grep -v "Tests\|Preview\|// safety" | head -5 || echo "  None found ✓"

echo "Debug prints:"
grep -rn ' print(' --include="*.swift" . | grep -v '#if DEBUG\|Tests\|// ok' | head -5 || echo "  None found ✓"

echo "fatalError:"
grep -rn "fatalError(" --include="*.swift" . | grep -v "Tests\|// safety" | head -5 || echo "  None found ✓"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
```

**If verification fails:**
1. Capture specific errors
2. Dispatch debug subagent
3. Apply fixes
4. Re-verify
5. Max 3 retry cycles

---

## Phase 6: Documentation

Generate documentation artifacts:

### Cleanup Report
```markdown
# Engineering Cleanup Report: {App}
**Date:** YYYY-MM-DD
**Worktree:** cleanup-{app}-{timestamp}
**Commit:** {final_commit_hash}

## Summary
| Category | Count | Time |
|----------|-------|------|
| Bugs Fixed (P0) | X | Y hrs |
| Swift 6 Issues | X | Y hrs |
| SwiftData Issues | X | Y hrs |
| Optimizations | X | Y hrs |
| Slop Removed | X | Y hrs |
| Integrations | X | Y hrs |
| **Total** | **X** | **Y hrs** |

## Critical Fixes (P0)
- [B-01] [Description] — [File:Line] — [Impact if not fixed]

## Swift 6 Compliance
- [S6-01] [Description] — [Change made]

## SwiftData Improvements
- [SD-01] [Description] — [Change made]

## Performance Optimizations
- [OPT-01] [Description] — [Improvement]

## AI Slop Removed
- [SL-01] [Pattern] — [Files affected]

## Integrations Completed
- [INT-01] [Gap] — [Solution]

## Verification Results
- Build: [PASS/FAIL] (X errors, Y warnings)
- Tests: [X passed, Y failed]
- Archive: [PASS/FAIL]
- SwiftLint: [X warnings]
- Slop Scan: [PASS/FAIL]

## App Store Compliance
- Risk Level: [LOW/MEDIUM/HIGH]
- Rejection Risks: [X resolved]
- Warnings: [X resolved]
```

### Future Tech Debt Document
```markdown
# Future Tech Debt: {App}
**Identified during cleanup:** YYYY-MM-DD

## P1: Address Soon
| ID | Issue | Location | Effort | Impact |
|----|-------|----------|--------|--------|
| TD-01 | [Description] | [file] | M | High |

## P2: Backlog
| ID | Issue | Location | Effort | Impact |
|----|-------|----------|--------|--------|
| TD-10 | [Description] | [file] | L | Medium |

## Monitoring
- Watch for: [patterns that may cause future issues]
```

---

## Phase 7: TestFlight Alpha Push

After verification passes, push alpha to TestFlight:

> **macOS apps:** Standard fastlane `pilot distribute` and `xc_distribute_build` often fail for macOS due to API path differences. See the macOS fallback script below.

```bash
#!/bin/bash
# testflight-push.sh — Push verified build to TestFlight

set -e

APP="{app}"
WORKTREE="cleanup-{app}-{timestamp}"

echo "═══════════════════════════════════════════════════════════════"
echo "  TESTFLIGHT ALPHA PUSH"
echo "═══════════════════════════════════════════════════════════════"

# 1. Return to main repo and merge worktree
echo ""
echo "📥 Step 1: Merging worktree to main"
cd /path/to/main/repo
git add -A
git commit -m "cleanup($APP): engineering hardening pass

Automated cleanup including:
- Fixed X critical bugs (concurrency, crashes, logic)
- Resolved Y Swift 6 compliance issues
- Fixed Z SwiftData issues
- Applied N optimizations
- Removed M instances of AI slop
- Wired up P unwired features

Verification:
- Build: PASS (0 errors)
- Tests: X passed
- Archive: PASS
- SwiftLint: clean

Worktree: $WORKTREE"

git push origin main

# 2. Wait for CI to start
echo ""
echo "⏳ Step 2: Waiting for CI to start..."
sleep 30

# 3. Poll CI until complete (using check-build skill tools)
echo ""
echo "🔍 Step 3: Polling CI build status..."

MAX_RETRIES=60  # 30 minutes (30s intervals)
RETRY=0

while [ $RETRY -lt $MAX_RETRIES ]; do
    STATUS=$(xc_status 2>/dev/null | grep -E "succeeded|failed|in_progress" | head -1)
    
    if echo "$STATUS" | grep -q "succeeded"; then
        echo "✅ CI build succeeded!"
        break
    elif echo "$STATUS" | grep -q "failed"; then
        echo "❌ CI build failed!"
        echo "Check errors with: xc_get_issues"
        exit 1
    fi
    
    echo "  Build in progress... ($(($RETRY * 30))s elapsed)"
    sleep 30
    RETRY=$((RETRY + 1))
done

if [ $RETRY -eq $MAX_RETRIES ]; then
    echo "⏱️ CI polling timeout — check manually with xc_status"
    exit 1
fi

# 4. Distribute to Internal Testing
echo ""
echo "🚀 Step 4: Distributing to TestFlight Internal Testing..."

xc_distribute_build \
  --groups "Internal Testing" \
  --changelog "Engineering cleanup: Swift 6 compliance, crash fixes, optimizations"

echo ""
echo "✅ Alpha build pushed to TestFlight!"
```

### macOS TestFlight Fallback (When Standard Distribution Fails)

If the app is a **macOS app** and `xc_distribute_build` / `pilot distribute` fails:

```ruby
# fastlane/Fastfile — add these lanes for macOS

def asc_api_token
  Spaceship::ConnectAPI::Token.create(
    key_id: ENV["ASC_KEY_ID"],
    issuer_id: ENV["ASC_ISSUER_ID"],
    filepath: ENV["ASC_KEY_PATH"]
  )
end

lane :update_beta_changelog do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find(options[:bundle_id])
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }

  locs = build.get_beta_build_localizations
  existing = locs.find { |l| l.locale == "en-US" }

  if existing
    Spaceship::ConnectAPI.patch_beta_build_localizations(
      localization_id: existing.id,
      attributes: { whatsNew: options[:changelog] }
    )
  else
    Spaceship::ConnectAPI.post_beta_build_localizations(
      build_id: build.id,
      attributes: { locale: "en-US", whatsNew: options[:changelog] }
    )
  end
end

lane :distribute_macos_alpha do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find(options[:bundle_id])
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }
  group = app.get_beta_groups.find { |g| g.name == options[:group] }

  current = group.fetch_builds
  unless current.any? { |b| b.id == build.id }
    Spaceship::ConnectAPI.add_beta_groups_to_build(
      build_id: build.id,
      beta_group_ids: [group.id]
    )
  end
end
```

### TestFlight Verification

After push, verify the build is live:

```bash
#!/bin/bash
# verify-testflight.sh

echo "🔍 Verifying TestFlight distribution..."

# Get latest build info
BUILD_INFO=$(xc_list_tf_builds --limit 1)
BUILD_NUMBER=$(echo "$BUILD_INFO" | grep -oE "[0-9]+" | head -1)
BUILD_STATUS=$(echo "$BUILD_INFO" | grep -i "status")

echo "Latest build: #$BUILD_NUMBER"
echo "Status: $BUILD_STATUS"

# Check if internal testing has the build
echo ""
echo "Internal Testing Groups:"
xc_list_tf_builds --limit 1 --include-groups

echo ""
echo "✅ TestFlight Alpha Verification Complete"
```

---

## Error Handling & Recovery

These recoveries apply to the Phase 7 push — CI and TestFlight failures surface here.

### If CI Build Fails

```bash
1. Capture CI errors: xc_get_issues
2. Analyze failures — are they related to cleanup changes?
3. If related:
   a. Return to worktree
   b. Dispatch fix subagent with error context
   c. Re-verify locally
   d. Amend commit and re-push
4. If unrelated (infrastructure/signing):
   a. Document in report
   b. Escalate to /check-build skill
   c. Manual intervention may be needed
```

### If TestFlight Distribution Fails

```bash
1. Check error with xc_get_build
2. Common issues:
   - Missing compliance info → Fix and re-push
   - Signing issues → /check-build skill
   - Export compliance → Add ITSAppUsesNonExemptEncryption = NO
3. Re-trigger distribution after fix
```

### If Local Build Succeeds but CI Fails

```bash
1. Compare environments (local vs CI)
2. Check for:
   - Environment-specific code (#if DEBUG)
   - Missing files not committed
   - Xcode version differences
3. Fix and re-push
```

---

## Phase 8: Final Report

```
═══════════════════════════════════════════════════════════════════
  APPLE CLEANUP — ENGINEERING HARDENING COMPLETE
  {App} — Production Ready
═══════════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
─────────────────
Duration:        X hours
Issues Found:    X (Engineering + Compliance)
Issues Fixed:    X
Files Modified:  X
Build Status:    ✅ PASS (0 errors)
Test Status:     ✅ X passed, 0 failed
Archive Status:  ✅ PASS (production-ready)
TestFlight:      ✅ Build #{N} live on Internal Testing

REVIEW PANEL SCORES (Before → After)
─────────────────────────────────────
Engineering:  X/10 → Y/10
Compliance:   X/10 → Y/10
Overall:      X/10 → Y/10

SQUAD PERFORMANCE
─────────────────
🐛 Bug Fix Squad:      X P0 issues fixed
⚡ Swift 6 Squad:      X compliance issues resolved
🗄️  SwiftData Squad:   X data issues fixed
⚡ Optimization Squad: X improvements applied
🧹 AI Deslop Squad:    X patterns cleaned
🔌 Integration Squad:  X gaps wired

CRITICAL FIXES (Would Have Caused Crashes/Rejection)
────────────────────────────────────────────────────
1. [B-01] [Description] — [Impact if not fixed]
2. [S6-01] [Description] — [Swift 6 crash risk]
3. [C-01] [Description] — [App Store rejection risk]

VERIFICATION DETAILS
────────────────────
Build:      ✅ Clean (0 errors, X warnings)
Tests:      ✅ All passed (X tests)
Archive:    ✅ Production-ready
SwiftLint:  ✅ Clean
Slop Scan:  ✅ No issues detected
Compliance: ✅ No rejection risks remaining

TESTFLIGHT STATUS
─────────────────
Build Number:   #{N}
Status:         🟢 Processing → 🟢 Ready
Distribution:   ✅ Internal Testing
Install Link:   [TestFlight link]

WHAT'S DIFFERENT NOW
────────────────────
- App is production-hardened and App Store ready
- All Swift 6 strict concurrency issues resolved
- All P0 crash/rejection risks eliminated
- Zero AI slop remaining
- All features fully wired and functional
- Alpha build live on TestFlight for verification

ARTIFACTS GENERATED
───────────────────
📄 Cleanup Report:      docs/cleanup/YYYY-MM-DD-{app}-cleanup-report.md
📄 Tech Debt Doc:       docs/cleanup/YYYY-MM-DD-{app}-tech-debt.md
💾 Commit:              {commit_hash}
🌿 Branch:              main
🚀 TestFlight Build:    #{N}

NEXT STEPS
──────────
1. Install TestFlight build and verify functionality
2. Address P1 tech debt items in next sprint
3. Proceed to beta when ready: /prepare-submission {app}

═══════════════════════════════════════════════════════════════════
  Status: APP HARDENED — ALPHA LIVE ON TESTFLIGHT
═══════════════════════════════════════════════════════════════════
```

---

## Context Management

The main session orchestrates with minimal context usage:

```
Main Session:        ~40% context (planning, coordination)
├── Review Subagents: ~60% each (2 parallel, engineering + compliance)
├── Fix Subagents:    ~50% each (batched by dependency)
└── Verification:     Automated (minimal context)

Total time: ~2-4 hours depending on issue count
```

---

## Integration with Other Skills

| When This Happens | Use This Skill |
|-------------------|----------------|
| CI/build issues | `/check-build` |
| Need feature work | `/implement-feature` |
| Ready for App Store | `/prepare-submission` |
| Just want review | `/apple-review` |
| Session review | `/review-session` |

---

## Success Criteria — EXHAUSTIVE VERIFICATION

### MANDATORY — All Must Pass

✅ **ALL P0 issues resolved** (crashes, data loss, security vulnerabilities) — ZERO TOLERANCE  
✅ **ALL P1 issues resolved** (rejection risks, Swift 6 improvements, error handling) — NO EXCEPTIONS  
✅ **ALL P2 issues resolved** (tech debt, optimizations, style, documentation) — CLEAN SLATE  
✅ **Build passes with zero errors**  
✅ **All tests pass**  
✅ **Archive succeeds** (production-ready)  
✅ **SwiftLint clean**  
✅ **No AI slop detected**  
✅ **All features wired**  
✅ **TestFlight alpha live and verified**  

### EXHAUSTIVE CLEANUP PRINCIPLE

**The cleanup is NOT complete until:**
1. Every P0, P1, and P2 issue identified in Phase 1 is resolved
2. All fixes are verified (build, archive, tests)
3. Documentation is updated
4. TestFlight alpha is live

**No shortcuts. No omissions. Mission-critical quality.**

---

*Engineering excellence: crash-free, compliant, optimized, shipped. No exceptions. No shortcuts.*

<!-- REFERENCE: apple-cleanup/references/panel-compliance.md -->

# Panel 2: Compliance Review — Subagent Prompt

**Persona:** An App Store Review team member hunting every rejection risk, guideline violation, or compliance gap before submission.

**Dispatch:** Spawn as a parallel subagent. Send the block below verbatim.

```yaml
subagent_type: apple-dev-skills:explore
prompt: |
  You are conducting an APP STORE COMPLIANCE REVIEW of {app_name} as an App 
  Store Review team member. Find every rejection risk, guideline violation, 
  or compliance gap.
  
  Check:
  1. App Store Review Guidelines
     - 4.0 Design: sufficient value, not a "thin" app
     - 2.1 Performance: app completeness, no placeholder content
     - 2.3 Accurate Metadata: screenshots match UI, description accurate
     - 1.3 Kids Category: COPPA compliance if applicable
     - 3.1 Payments: no external purchase links
     - 4.2 Minimum Functionality: app does enough to justify existence
  
  2. Privacy & Data
     - PrivacyInfo.xcprivacy: present and complete
     - Required reason APIs: all used APIs declared
     - Usage descriptions in Info.plist:
       * Camera, Microphone, Speech — specific and honest descriptions
       * Location, Health, Reminders — if applicable
     * Data collection matches App Privacy label
     * ATT prompt if any tracking occurs
  
  3. Entitlements & Capabilities
     - Entitlements match code usage
     - No entitlements declared but unused
     - No capabilities used but not declared
     - App Groups: consistent identifiers across targets
     - Push notifications: registered if used
  
  4. Binary & Build
     - No private API usage
     - Minimum deployment target reasonable (iOS 26+)
     - App icon: all required sizes present
     - Launch screen present and not misleading
  
  5. Content & Legal
     - Terms of Service / Privacy Policy linked
     - Copyright notices present
     - No "Lorem ipsum" placeholder content
     - No competing platform references
  
  6. In-App Purchase (if applicable)
     - Products configured correctly
     - Restore purchases implemented
     - Subscription management accessible
     - Clear pricing display before purchase
  
  Files to read:
  - Info.plist, *.entitlements, PrivacyInfo.xcprivacy
  - project.yml (capabilities)
  - All code touching protected APIs
  
  OUTPUT FORMAT (markdown):
  ## Compliance Review: {App}
  
  ### Risk Level: [LOW / MEDIUM / HIGH / REJECTION LIKELY]
  
  ### Rejection Risks (P0 - will likely cause rejection)
  - [ID: C-01] [Guideline #] [Description] — [file:line] — [Required fix]
  
  ### Warnings (P1 - may cause rejection)
  - [ID: C-10] [Guideline #] [Description] — [Recommendation]
  
  ### Best Practices (P2 - recommended)
  - [ID: C-20] [Description] — [Why it matters]
  
  ### Checklist
  - [ ] Privacy manifest complete
  - [ ] All usage descriptions present and specific
  - [ ] Entitlements match code usage
  - [ ] No placeholder content
  - [ ] App icon complete
  - [ ] Privacy policy linked
```

<!-- REFERENCE: apple-cleanup/references/panel-engineering.md -->

# Panel 1: Engineering Review — Subagent Prompt

**Persona:** A senior Apple engineering lead evaluating architecture, code quality, Swift 6 compliance, performance, and platform best practices across the entire app codebase.

**Dispatch:** Spawn as a parallel subagent reading the entire app codebase. Fill in the `[app-dir]` / `[shared-package-dir]` placeholders, then send the block below verbatim.

```yaml
subagent_type: apple-dev-skills:code-reviewer
prompt: |
  You are conducting an ENGINEERING REVIEW of {app_name} as a senior Apple
  engineering lead. Evaluate architecture, code quality, Swift 6 compliance,
  performance, and platform best practices.
  
  App path: [app-dir]/
  Shared packages: [shared-package-dir]/ (if any)
  
  MANDATORY: Load ios26-api-reference essentials before analyzing.
  Detect frameworks via import statements and load matching files:
  - essentials/swift6.md — strict concurrency patterns
  - essentials/swiftdata.md — model design, queries, migrations
  - essentials/swiftui.md — @Observable patterns, previews
  - essentials/speech.md — if app uses speech recognition
  - essentials/avfoundation.md — if app uses audio
  - (load other essentials as needed per detected imports)
  
  RECOMMENDED: Use Context7 MCP (if installed) for live API documentation verification.
  When encountering unfamiliar APIs or verifying signatures:
  1. Query Context7 for official Apple framework documentation (optional)
  2. Cross-reference with ios26-api-reference essentials
  3. Flag any API usage that conflicts with live documentation, or mark as "unverified" if Context7 is unavailable
  4. Prioritize live docs for API signatures, local essentials for crash prevention rules
  
  Evaluate:
  1. Swift 6 & Concurrency
     - SWIFT_STRICT_CONCURRENCY: complete enabled
     - @MainActor isolation on UI classes
     - @preconcurrency imports for EventKit/HealthKit/Speech/AVFoundation
     - Nonisolated deinit for MainActor classes (Apple confirmed crash fix)
     - Task cancellation handling
     - Sendable conformance
     - No @Model objects crossing async boundaries
  
  2. SwiftData & Persistence
     - Model design: relationships, cascade rules, default values
     - Migration strategy: VersionedSchema usage
     - Query efficiency: well-scoped fetches, no N+1 queries
     - Data integrity: invariants enforced at model level
     - Threading: proper context usage
  
  3. SwiftUI Patterns
     - @Observable (iOS 17+) vs ObservableObject
     - @State for selection (Observable list selection crash workaround)
     - #Preview coverage for every view
     - Theme token usage (no hardcoded colors/fonts)
     - Sheet environment propagation (.modelContext())
  
  4. Performance & Resources
     - Memory: retain cycles, [weak self] usage
     - Launch time: deferred work
     - Timer patterns: RunLoop.common on iOS, Task.sleep on watchOS
     - Background tasks: well-behaved
  
  5. Error Handling & Resilience
     - No force unwraps (try!, as!, !)
     - No fatalError in production paths
     - Graceful error handling at all boundaries
     - State recovery from interrupted states
  
  6. Architecture & Structure
     - MVVM separation: Views contain no business logic
     - ViewModels are testable in isolation
     - Service layer properly abstracted
     - Dependencies flow correctly
  
  7. Testing
     - Critical paths have test coverage
     - Tests validate behavior, not implementation
     - No shared state between tests
  
  Provide specific file:line references for every finding.
  
  OUTPUT FORMAT (markdown):
  ## Engineering Review: {App}
  
  ### Scores (1-10)
  | Dimension | Score | Notes |
  |-----------|-------|-------|
  | Swift 6 Compliance | X | ... |
  | SwiftData Usage | X | ... |
  | SwiftUI Patterns | X | ... |
  | Performance | X | ... |
  | Error Handling | X | ... |
  | Architecture | X | ... |
  | Test Coverage | X | ... |
  | **Overall** | **X** | ... |
  
  ### Critical Issues (P0 - crash/bug risks)
  - [ID: E-01] [Description] — [file:line] — [Fix]
  
  ### Improvements (P1 - quality/maintainability)
  - [ID: E-10] [Description] — [file:line] — [Approach]
  
  ### Tech Debt (P2 - address soon)
  - [ID: E-20] [Description] — [Impact]
```

<!-- END SKILL: apple-cleanup -->

---

<!-- BEGIN SKILL: apple-design -->

# apple-design

---

# iOS Design

SwiftUI design system patterns, iOS 26 Liquid Glass effects, and accessibility best practices. **Apply these patterns to all UI code.**

---

## Design System Architecture

### Theme.swift Pattern

Centralize design tokens in a theme enum. Apps extend a shared base theme for app-specific expression.

```swift
// Shared package: AppTheme.swift
public enum AppTheme {
    // Foundation: Backgrounds
    public static var canvas: Color {
        Color(light: Color(hex: "#FAF9F6"), dark: Color(hex: "#0D0D0F"))
    }
    
    // Action: Primary color
    public static let actionPrimary = Color(hex: "#7BA7BC")
    
    // Spacing system
    public enum Spacing {
        public static let xs: CGFloat = 8
        public static let md: CGFloat = 16
        public static let lg: CGFloat = 24
    }
    
    // Corner radius
    public enum Radius {
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 12
        public static let capsule: CGFloat = 999
    }
}

// App-specific: Theme.swift
enum Theme {
    // Inherit from shared theme
    static let primary = AppTheme.actionPrimary
    static let spacing = AppTheme.Spacing.self
    
    // App-specific expression
    static var dialFace: Color {
        Color(light: AppTheme.surface, dark: Color(hex: "#1A1A1E"))
    }
}
```

### Design Tokens vs Hardcoded Values

| Do | Don't |
|----|-------|
| `Theme.primary` | `Color.blue` |
| `Theme.Spacing.md` | `16` |
| `Theme.Radius.capsule` | `999` |
| `AppTheme.canvas` | `Color.white` |

### Asset Catalog Organization

```
Assets.xcassets/
  Colors/
    Primary.colorset/
    Surface.colorset/
  Images/
    AppIcon.appiconset/
    Logo.imageset/
```

Prefer code-defined colors (hex values in theme) for dynamic dark mode support.

---

## iOS 26 Liquid Glass

### Glass Background Effects

```swift
// Standard glass background
.glassEffect(.regular)

// Glass with interactive (hover/press) feedback
.glassEffect(.regular.interactive())

// Ornament for floating controls
.ornament(visibility: .visible, attachmentAnchor: .scene(.trailing)) {
    FloatingControls()
        .glassEffect(.regular)
}
```

### Glass Material Hierarchy

```swift
// Thick material for modals, sheets
.background(.thickMaterial)

// Regular material for cards, surfaces
.background(.regularMaterial)

// Thin material for subtle overlays
.background(.ultraThinMaterial)

// From theme
AppTheme.glassSurface   // .regularMaterial
AppTheme.glassThick     // .thickMaterial
AppTheme.glassThin      // .ultraThinMaterial
```

### Liquid Glass Best Practices

| Do | Don't |
|----|-------|
| Use `.glassEffect(.regular)` for floating UI | Use solid colors for primary surfaces |
| Layer glass at different thicknesses for depth | Overuse glass — it reduces contrast |
| Add `.hoverEffect(.lift)` for interactive elements | Apply glass to text-heavy content |
| Use ornaments for secondary controls | Put glass behind primary action buttons |

### Nested Glass & Contrast (macOS/iOS 26)

**The #1 cause of "muddy unreadable glass UI"** is violating these four rules simultaneously:

**Rule 1: Keep glass backing ≤ 8% white opacity for `.surface` tiers**
```swift
// ❌ WRONG: White at 20% overwhelms the system tint
.background(shape.fill(Color.white.opacity(0.20)))

// ✅ CORRECT: Let the system Liquid Glass tint dominate
.background(shape.fill(Color.white.opacity(0.08)))
```
At 20% white, light desktops wash out text; dark desktops create gray sludge. At 8%, the panel refracts the desktop without overwhelming it.

**Rule 2: Never put solid `Color.opacity()` overlays on top of glass**
```swift
// ❌ WRONG: Three competing opacity layers (desktop → glass → white backing → dark overlay → text)
.background(Color.black.opacity(0.65))

// ✅ CORRECT: True glass.embedded — light refracts through coherent depth
.glassEffect(.regular, in: RoundedRectangle(cornerRadius: 12))
    .opacity(0.88)
```
Solid color overlays on glass create inconsistent contrast that varies with the desktop wallpaper. Use `.glassEffect(.regular)` at reduced opacity, or `.ultraThinMaterial`, for embedded rows.

**Rule 3: Never nest `glassEffect` inside `glassEffect`**
```swift
// ❌ WRONG: Glass-on-glass causes visual doubling and smearing
GlassPanel(tier: .surface) {
    Button("Unlock") { }
        .glassEffect(.regular.interactive())  // Nested — fights parent glass
}

// ✅ CORRECT: Use stroke borders or materials for child elements inside glass
.background(
    Capsule()
        .stroke(accentColor, lineWidth: 1)
)
```
A `.glassEffect(.regular)` button inside a `.glassEffect(.regular)` panel picks up the parent's refraction and creates a low-contrast blob. Use coral hairline strokes, `.ultraThinMaterial`, or plain text instead.

**Rule 4: Glass UIs need explicit hover feedback**
```swift
// ❌ WRONG: .buttonStyle(.plain) on glass feels dead and unresponsive
Button("Settings…") { }
    .buttonStyle(.plain)

// ✅ CORRECT: Add hover states — coral stroke for rows, underline for text
@State private var isHovered = false
// ...
.background(
    RoundedRectangle(cornerRadius: 12)
        .stroke(isHovered ? accentColor : Color.clear, lineWidth: 1)
)
.onHover { isHovered = $0 }
```
On glass surfaces, `.buttonStyle(.plain)` provides zero visual feedback. Every tappable element needs a hover state: coral hairline stroke for rows, underline for text buttons, or scale+lift for prominent actions.

### Menubar Dropdown Pattern (macOS 26)

```swift
// Surface glass container
GlassPanel(tier: .surface, radius: 18) {
    VStack(spacing: 0) {
        // Header: sparkle + wordmark
        HStack {
            Image(systemName: "sparkle")
                .foregroundStyle(accentColor)
            Text("app.")
                .font(.system(size: 16, weight: .ultraLight))
            Spacer()
            // Trial chip: coral hairline stroke, NOT nested glass
            TrialChip()
        }

        Divider()

        // Capture rows: glass.embedded with hover stroke
        ForEach(actions) { action in
            CaptureRow(action: action)
        }

        Divider()

        // Footer: plain text with hover underline
        FooterButton("Settings…")
        FooterButton("Quit")
    }
    .frame(width: 360)  // Not 280 — give content room to breathe
}
```

**Key dimensions:**
- Width: **360pt** (not 280pt — cramped width breaks visual rhythm)
- Backing: **≤ 8% white opacity** for surface tier
- Embedded rows: `.glassEffect(.regular)` at **0.88 opacity**
- Buttons inside glass: **stroke borders**, not nested glass effects
- Hover: **coral hairline stroke** on rows, **underline** on text buttons

---

## SwiftUI Patterns

### ViewModifiers for Reusable Styles

```swift
// Define custom modifiers
struct PrimaryButtonStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.headline.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(Theme.primary)
            .clipShape(Capsule())
    }
}

// Extend View for convenience
extension View {
    func primaryButtonStyle() -> some View {
        modifier(PrimaryButtonStyle())
    }
}

// Usage
Button("Start") { }
    .primaryButtonStyle()
```

### Container Views for Layout Patterns

```swift
// Reusable card container
struct Card<Content: View>: View {
    @ViewBuilder let content: Content
    
    var body: some View {
        content
            .padding(Theme.Spacing.md)
            .background(AppTheme.surface)
            .cornerRadius(Theme.Radius.md)
            .appDepth(.surface)
    }
}

// Usage
Card {
    VStack(alignment: .leading) {
        Text("Title")
        Text("Description")
            .foregroundStyle(Theme.textSecondary)
    }
}
```

### Environment Values for Theme

```swift
// Custom environment key
private struct ThemeKey: EnvironmentKey {
    static let defaultValue = AppTheme.standard
}

extension EnvironmentValues {
    var appTheme: AppTheme {
        get { self[ThemeKey.self] }
        set { self[ThemeKey.self] = newValue }
    }
}

// Usage in view
@Environment(\.appTheme) private var theme
```

### Preview Patterns with PreviewContainer

```swift
/// Lightweight container that injects required @Environment objects
@MainActor
struct PreviewContainer<Content: View>: View {
    let content: Content
    let timerVM: TimerViewModel
    let modelContext: ModelContext
    
    init(
        timerState: TimerState = .idle,
        @ViewBuilder content: () -> Content
    ) {
        self.timerVM = TimerViewModel()
        self.timerVM.timerState = timerState
        self.content = content()
        // Create in-memory model context for previews
        self.modelContext = try! ModelContext(
            ModelContainer(for: FocusSession.self, configurations: ModelConfiguration(isStoredInMemoryOnly: true))
        )
    }
    
    var body: some View {
        content
            .environment(timerVM)
            .modelContainer(modelContext.container)
    }
}

// Preview usage
#Preview("Running State") {
    PreviewContainer(timerState: .running) {
        TimerView()
    }
}

#Preview("Dark Mode") {
    PreviewContainer(timerState: .idle) {
        TimerView()
    }
    .preferredColorScheme(.dark)
}
```

---

## Localization

### Infrastructure Setup

Create `Localizable.strings` early — even for single-language apps. It prevents hardcoded string debt and makes future localization trivial:

```
App/Resources/
  en.lproj/
    Localizable.strings
```

```swift
// Localizable.strings
"preview.action.ai" = "Ask this screenshot";
"preview.conversation.inputPlaceholder" = "Ask anything…";
"upgrade.title" = "Unlock Pro";
"lockedFeature.trialButton" = "Try free for %d days";
```

### NSLocalizedString in SwiftUI

```swift
// ✅ CORRECT — Use table name for app-specific strings
struct UpgradeSheetCopy {
    static var title: String {
        NSLocalizedString("upgrade.title", tableName: "Localizable", comment: "Upgrade sheet title")
    }
    static func trialButton(days: Int) -> String {
        String(format: NSLocalizedString("lockedFeature.trialButton", tableName: "Localizable", comment: ""), days)
    }
}

// In views
Text(UpgradeSheetCopy.title)
TextField(UpgradeSheetCopy.inputPlaceholder, text: $input)
```

### Migration Path: Hardcoded → Localized

When retrofitting localization into an existing app:

1. Extract all user-facing strings to `Localizable.strings` with semantic keys
2. Replace literals with `NSLocalizedString` calls
3. Keep keys namespaced by feature: `feature.element.purpose`
4. Use `String(format: ...)` for interpolated values — never concatenate

```swift
// ❌ WRONG — concatenation breaks in RTL languages
Text("Try free for " + String(days) + " days")

// ✅ CORRECT — format string handles pluralization and RTL
String(format: NSLocalizedString("lockedFeature.trialButton", comment: ""), days)
```

---

## Accessibility

### Labels and Hints

```swift
// Always provide accessibility labels for icons
Image(systemName: "play.fill")
    .accessibilityLabel("Start timer")

// Add hints for interactive elements
Button(action: startSession) {
    Text("Focus")
}
.accessibilityHint("Double tap to begin a focus session")

// Hide decorative elements
Image(systemName: "sparkles")
    .accessibilityHidden(true)
```

### Identifiers for Testing

```swift
// Add identifiers for UI testing
Text(timeRemaining)
    .accessibilityIdentifier("timeDisplay")

Button(action: pause) {
    Image(systemName: "pause.fill")
}
.accessibilityIdentifier("pauseButton")
```

### Dynamic Type Support

```swift
// Use scalable font metrics
Text("Title")
    .font(.system(.title, design: .rounded))

// Or custom sizes relative to metrics
Text("Body")
    .font(.system(size: UIFont.preferredFont(forTextStyle: .body).pointSize))

// Ensure layouts adapt
VStack {
    Text("Title")
}
.padding(.horizontal, Theme.Spacing.md)
// Use GeometryReader or @ScaledMetric for size-dependent layouts
```

### VoiceOver Considerations

```swift
// Group related elements
VStack {
    Text("25:00")
    Text("remaining")
}
.accessibilityElement(children: .combine)
.accessibilityLabel("25 minutes remaining")

// Custom actions for complex UI
.accessibilityAction(named: "Add 5 minutes") {
    extendSession(by: 300)
}

// Update announcements for state changes
@AccessibilityAction
private func announceCompletion() {
    AccessibilityNotification.announce("Focus session complete")
}
```

### Accessibility Checklist

| Element | Required |
|---------|----------|
| Icon buttons | `.accessibilityLabel()` |
| Custom controls | `.accessibilityLabel()` + `.accessibilityHint()` |
| Test targets | `.accessibilityIdentifier()` |
| Decorative images | `.accessibilityHidden(true)` |
| Complex groups | `.accessibilityElement(children: .combine)` |
| Dynamic text | Use `UIFont` metrics or `.dynamicTypeSize()` |

---

## ADHD-Friendly UX Principles

Design for focus, clarity, and reduced cognitive load. Never use "ADHD" in user-facing copy.

### Reduce Decision Fatigue

```swift
// Do: Smart defaults, minimal choices
struct DurationSelector: View {
    let presets = [15, 25, 45, 60]  // Curated options
    
    var body: some View {
        HStack(spacing: Theme.Spacing.sm) {
            ForEach(presets, id: \.self) { minutes in
                DurationChip(minutes: minutes)
            }
        }
    }
}

// Don't: Open-ended inputs or overwhelming options
TextField("Enter duration", value: $customMinutes, format: .number)
```

### Clear Visual Hierarchy

```swift
// Do: One primary action, clear focal point
VStack(spacing: Theme.Spacing.lg) {
    // Hero element (the dial)
    TimerDial()
        .frame(maxWidth: .infinity)
    
    // Secondary actions in a row
    HStack {
        SecondaryButton("Adjust") { }
        PrimaryButton("Start") { }
    }
}

// Don't: Competing primary actions
HStack {
    Button("Start") { }      // Same weight as...
    Button("Settings") { }   // ...this
    Button("History") { }
}
```

### Immediate Feedback

```swift
// Do: Instant visual response
Button(action: { isPressed.toggle() }) {
    Image(systemName: isPressed ? "pause.fill" : "play.fill")
}
.buttonStyle(.borderedProminent)

// Do: Haptic feedback for actions
HapticsService.shared.playTap()

// Do: Visual state changes
Circle()
    .fill(isActive ? Theme.primary : Theme.surface)
    .animation(.easeInOut(duration: 0.2), value: isActive)
```

### Forgiving Interactions

```swift
// Do: Easy undo, no destructive confirmations
Button(action: { 
    withAnimation {
        item.delete()
    }
}) {
    Label("Remove", systemImage: "xmark")
}

// Do: Auto-save, resume where left off
@AppStorage("draftThought") private var draftThought: String = ""

// Do: Gesture forgiveness (larger touch targets)
Button(action: action) {
    Image(systemName: "plus")
        .frame(width: 44, height: 44)  // Minimum 44pt
}
```

### UX Principles Summary

| Principle | Implementation |
|-----------|----------------|
| Reduce decision fatigue | Curated presets, smart defaults, progressive disclosure |
| Clear visual hierarchy | One hero element, primary/secondary action distinction |
| Immediate feedback | Haptics, animations, visual state changes |
| Forgiving interactions | Undo support, auto-save, 44pt minimum touch targets |
| Never label as ADHD | Describe benefits: "captures thoughts in under 5 seconds" |

---

## Quick Reference

### Common Modifiers

```swift
// Depth/shadow
.appDepth(.surface)
.breathingShadow(color: Theme.primary)

// Border
.radiantBorder(color: Theme.primary, intensity: 0.3)

// Glass (iOS 26+)
.glassEffect(.regular)
.glassEffect(.regular.interactive())

// Accessibility
.accessibilityLabel("Description")
.accessibilityHint("Double tap to activate")
.accessibilityIdentifier("uniqueID")
.accessibilityHidden(true)
```

### Theme Values

```swift
// Colors
AppTheme.canvas           // Background
AppTheme.surface          // Cards
AppTheme.actionPrimary    // Buttons
AppTheme.textPrimary      // Body text

// Spacing
AppTheme.Spacing.xs       // 8
AppTheme.Spacing.md       // 16
AppTheme.Spacing.lg       // 24

// Radius
AppTheme.Radius.sm        // 8
AppTheme.Radius.md        // 12
AppTheme.Radius.capsule   // 999
```

### Preview Template

```swift
#Preview("State Name") {
    PreviewContainer(timerState: .idle) {
        YourView()
    }
}

#Preview("Dark Mode") {
    PreviewContainer(timerState: .idle) {
        YourView()
    }
    .preferredColorScheme(.dark)
}
```

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios26-api-reference` — iOS 26 API signatures
- `ios-build` — Build validation workflow

<!-- END SKILL: apple-design -->

---

<!-- BEGIN SKILL: apple-foundation-models -->

# apple-foundation-models

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

    // `call` returns any PromptRepresentable — a String works (so do [String] and @Generable types).
    func call(arguments: Arguments) async throws -> String {
        let temp = try await WeatherService.temperature(for: arguments.city)
        return "\(temp)°C in \(arguments.city)"
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

<!-- END SKILL: apple-foundation-models -->

---

<!-- BEGIN SKILL: apple-patterns-check -->

# apple-patterns-check

# Apple Patterns Check

Fast validation that code follows Apple's documented patterns. Uses shell commands to detect violations before they reach CI.

## When to Use

- Before committing significant Swift changes
- During `/ship` — after implement, before archive
- When reviewing code touching SwiftUI, SwiftData, or concurrency
- When unsure "is this the Apple way?"

## Quick Check

```bash
/apple-check
/apple-check src/ViewModels/
/apple-check --since-last-commit
```

## Pattern Validation

### 1. Swift 6 Concurrency Patterns

```bash
# 1.1 Task @MainActor annotation — CRITICAL: crash risk
# All Task { [weak self] must be Task { @MainActor [weak self]
git diff HEAD --name-only -- "*.swift" | xargs grep -n "Task { \[weak self\]" 2>/dev/null | grep -v "@MainActor"

# 1.2 @preconcurrency import — OBSOLETE CHECK (2026-04-03)
# iOS 26 first-party frameworks are Sendable-annotated. Prophylactic @preconcurrency
# masks real concurrency issues. Only add where compiler specifically demands it.
# This check is kept for legacy/third-party modules only.
# git diff HEAD --name-only -- "*.swift" | xargs grep -n "^import SomeLegacyModule" 2>/dev/null | grep -v "@preconcurrency"

# 1.3 Double @MainActor (crash risk if SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor)
# If the build setting is already MainActor, remove explicit @MainActor from class declarations
grep -rn "@MainActor" . --include="*.swift" | grep "class " | head -20
```

### 1.5 nonisolated deinit — CRITICAL: crash risk for @MainActor classes
# Any @MainActor class with deinit that doesn't say nonisolated will crash
grep -rn "deinit" . --include="*.swift" | grep -v "nonisolated\|Tests\|// no-cleanup"
# If the class is @MainActor (explicit or via SWIFT_DEFAULT_ACTOR_ISOLATION), deinit MUST be nonisolated

# 1.6 FoundationModels isAvailable must NOT be hardcoded — CRITICAL: crash on non-AI devices
grep -rn "isAvailable.*return true\|isAvailable.*=.*true" . --include="*.swift" | grep -iv "test\|mock\|preview"
# Expected: 0 results — must use SystemLanguageModel.default.isAvailable

# 1.7 MainActor.assumeIsolated — only safe from guaranteed main-thread code
grep -rn "MainActor.assumeIsolated" . --include="*.swift" | head -10
# Verify each usage is from a callback documented as main-thread-only (NOT delegate callbacks from background queues)

# 1.8 Sheet onDismiss + continuation double-resume risk
grep -rn "withCheckedContinuation\|withUnsafeContinuation" . --include="*.swift" | head -10
# Cross-check: if the file also has .sheet with onDismiss, verify continuation is nil'd BEFORE dismiss
```

### 2. Error Handling (Apple HIG)

```bash
# 2.1 Data-loss scenarios must use .alert(), not banners
# Saving, persisting, or deleting should show alerts on failure — not silent banners
grep -rn "showBanner\|showToast\|showNotification" . --include="*.swift" | grep -i "save\|persist\|delete\|error"

# 2.2 No silent try? on persistence operations
grep -rn "try? modelContext.save\|try? context.save" . --include="*.swift"
# Expected: 0 results — save failures must be caught and shown to the user
```

### 3. SwiftUI State Management

```bash
# 3.1 @Observable coalescing — snapshot pattern needed when clearing data + showing completion
grep -rn "showCompletion = true\|isComplete = true" . --include="*.swift" | head -10
# If setting completion state AND clearing data simultaneously, ensure a snapshot is taken first

# 3.2 @Bindable for two-way bindings on @Observable models
grep -rn "@Environment.*\.self.*var" . --include="*.swift" | grep -v "@Bindable\|let " | head -10

# 3.3 Canvas does not observe @Observable — needs TimelineView wrapper
grep -rn "Canvas {" . --include="*.swift" | head -10
# If the Canvas depends on animating state, it must be wrapped in a TimelineView
```

### 4. SwiftData Patterns

```bash
# 4.1 @Model objects must not cross async boundaries — extract scalars first
grep -B3 -A3 "AsyncStream" . --include="*.swift" -r | grep -B2 -A2 "@Model"

# 4.2 @Model stored properties without defaults — CRITICAL: runtime crash
# All @Model properties must have default values or be Optional
grep -A20 "@Model" . --include="*.swift" -r | grep "var " | grep -v "=" | grep -v "?" | grep -v "//" | head -10
# Expected: 0 results — every non-optional @Model property needs a default value

# 4.3 Soft-delete pattern — hard-delete + recreate breaks SwiftData identity
grep -rn "context.delete\|modelContext.delete" . --include="*.swift" | head -10
# If undo is needed on this entity, prefer soft-delete (isPendingDeletion) over hard-delete

# 4.3 CloudKit migration safety
# RULE: NEVER rename @Model classes — CloudKit creates orphaned record types (permanent data loss)
# RULE: NEVER rename stored properties — creates orphaned CKRecord fields
# RULE: NEVER change raw ID → @Relationship without .custom migration
# Safe: adding optional properties, removing properties
#
# Detect @Model files changed WITHOUT a VersionedSchema update (the dangerous case)
changed_model_files=$(git diff HEAD --name-only -- "*.swift" | xargs grep -l "@Model" 2>/dev/null || true)
migration_files=$(git diff HEAD --name-only | grep -E 'VersionedSchema|MigrationPlan|SchemaV[0-9]' || true)
if [ -n "$changed_model_files" ] && [ -z "$migration_files" ]; then
    echo "⚠️  @Model files changed without VersionedSchema update — verify no schema change"
    echo "   $changed_model_files"
fi
#
# Detect potential @Model class renames — CRITICAL: permanent silent CloudKit data loss
git diff HEAD -- "*.swift" | grep -E "^-.*@Model" | grep -E "class [A-Z]"
git diff HEAD -- "*.swift" | grep -E "^\+.*@Model" | grep -E "class [A-Z]"
# If a class name was removed AND a different class name was added → this is a rename. STOP.
```

### 5. Timer & RunLoop Patterns

```bash
# 5.1 iOS timers must use RunLoop.common — Task.sleep pauses during scroll
grep -rn "Task.sleep" . --include="*.swift" | grep -i "timer\|tick\|interval\|countdown"
# Fix: use Timer.publish(every:on:in:) with RunLoop.common mode

# 5.2 watchOS uses Task.sleep (correct — no scroll context)
# No action needed for watchOS timer code
```

### 6. Entitlements & Capabilities

```bash
# 6.1 Fake entitlement keys — CRITICAL: CI rejection during Transporter
# WidgetKit needs NO entitlement. Live Activities use NSSupportsLiveActivities in Info.plist.
grep -rn "com.apple.developer.widgetkit\|com.apple.developer.live-activities" . --include="*.entitlements"
# Expected: 0 results — these are NOT real Apple entitlement keys

# 6.2 Every declared entitlement must match a real Apple capability
# Cross-reference entitlements files against Apple's documented capability list
grep -rn "com.apple.developer\." . --include="*.entitlements" | grep -v "app-groups\|associated-domains\|healthkit\|icloud\|in-app-payments\|push-notifications\|siri\|default-data-protection\|maps\|network-extensions\|autofill\|usernotifications\|authentication-services\|coremedia\|game-center\|homekit\|nfc\|personal-vpn\|wallet\|weatherkit\|carplay\|classkit\|exposure-notification\|fileprovider\|hotspot\|multipath\|system-extension"
# Any matches may be fabricated entitlement keys — verify each against Apple documentation
```

### 7. AppIntent Configuration

```bash
# 7.1 suggestedInvocationPhrase placement — CRITICAL: crashes ssu-cli-app with SIGILL during export
# Must be on AppShortcutsProvider, NOT on plain AppIntent structs
grep -rn "suggestedInvocationPhrase" . --include="*.swift" | head -20
# Verify each match is inside an AppShortcutsProvider, not a plain AppIntent struct

# 7.2 CFBundleIconName must be present in static Info.plist for App Intents
grep -rn "CFBundleIconName" . --include="*.plist" | head -10
# Expected: at least one match per target that uses App Intents

# 7.3 IntentDescription prohibited words — CRITICAL: TestFlight rejection (error 90626)
# App Intent descriptions cannot contain "Apple" or other trademarked terms
grep -rn "IntentDescription.*Apple" . --include="*.swift" | head -20
# Examples that will fail:
#   IntentDescription("Start a timer on Apple Watch")  ❌ Rejected
#   IntentDescription("Start a timer on your Watch")   ✅ Accepted
# Other prohibited terms to check: "iPhone", "iPad", "iOS", "Siri" (in descriptions)
```

### 8. Safety Checks

```bash
# 8.1 No force-try in production
grep -rn " try!" . --include="*.swift" | grep -v "Tests\|// safety:"

# 8.2 No fatalError in production
grep -rn "fatalError(" . --include="*.swift" | grep -v "Tests\|// safety:"

# 8.3 No debug print() in production
grep -rn " print(" . --include="*.swift" | grep -v "Tests\|#if DEBUG\|// safety:"

# 8.4 No force unwrap
grep -rn "[a-zA-Z0-9_]!" . --include="*.swift" | grep -v "Tests\|// safety:\|IBOutlet\|@objc\|\"" | head -20
```

## Severity Levels

| Check | Severity | Fix Before Commit? |
|-------|----------|-------------------|
| Missing `@MainActor` on Task | **CRITICAL** | Yes — memory corruption risk |
| `@Model` class rename (CloudKit) | **CRITICAL** | Yes — permanent silent data loss |
| Data-loss error uses banner not alert | **HIGH** | Yes — user data loss risk |
| `@Model` in AsyncStream | **HIGH** | Yes — data race risk |
| `@Model` property rename (CloudKit) | **HIGH** | Yes — orphaned CKRecord fields |
| `@Model` changed without VersionedSchema | **HIGH** | Yes — crashes on launch for existing users |
| Raw ID → `@Relationship` without `.custom` | **HIGH** | Yes — cross-version sync breaks |
| Silent `try?` on persistence save | **HIGH** | Yes — silent data loss |
| Missing `nonisolated deinit` on @MainActor class | **CRITICAL** | Yes — crash on deallocation |
| Hardcoded `isAvailable = true` for FoundationModels | **CRITICAL** | Yes — crash on non-AI devices |
| `MainActor.assumeIsolated` from background queue | **CRITICAL** | Yes — fatal error at runtime |
| `@Model` property without default value | **CRITICAL** | Yes — runtime crash |
| Sheet continuation double-resume | **CRITICAL** | Yes — fatal error at runtime |
| Prophylactic `@preconcurrency` on iOS 26 first-party imports | **MEDIUM** | Yes — masks real concurrency bugs |
| iOS timer uses Task.sleep | **MEDIUM** | Yes — UX bug during scroll |
| force unwrap / fatalError / try! | **MEDIUM** | Yes — crash risk |
| Fake entitlement keys (widgetkit, live-activities) | **CRITICAL** | Yes — CI rejection during Transporter |
| Entitlement not matching real Apple capability | **CRITICAL** | Yes — CI rejection during Transporter |
| `suggestedInvocationPhrase` on plain AppIntent | **CRITICAL** | Yes — crashes ssu-cli-app with SIGILL |
| Missing `CFBundleIconName` in Info.plist | **CRITICAL** | Yes — App Intents export failure |
| IntentDescription contains "Apple" or trademarked terms | **CRITICAL** | Yes — TestFlight rejection (error 90626) |
| Missing TimelineView on animated Canvas | **LOW** | If animation expected |

## Output Format

```
🔍 Apple Patterns Check

✅ Swift 6 Concurrency: 3/3 checks passed

⚠️  Error Handling: 1 issue
   [HIGH] TimerView.swift:42 — SwiftData save uses banner instead of .alert()
   Fix: Replace with .alert("Could Not Save", isPresented: $showError)

✅ SwiftUI State: 4/4 checks passed

❌ SwiftData: 1 CRITICAL issue
   [CRITICAL] IntelligenceStack.swift:88 — @Model object crosses AsyncStream boundary
   Fix: Extract (id: UUID, text: String) scalars before AsyncStream closure

✅ Timers: 2/2 checks passed
✅ Safety: 3/3 checks passed

---
Summary: 1 CRITICAL, 1 HIGH — fix before committing
```

## Pre-Commit Hook

Add to `.git/hooks/pre-commit` to enforce safety checks automatically:

```bash
#!/usr/bin/env bash
set -euo pipefail
ERRORS=()

SWIFT_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.swift$' || true)

if [ -n "$SWIFT_FILES" ]; then
    # No force-try
    matches=$(echo "$SWIFT_FILES" | xargs grep -n ' try!' 2>/dev/null | grep -v 'Tests\|// safety:' || true)
    [ -n "$matches" ] && ERRORS+=("force try! found:\n$matches")

    # No fatalError
    matches=$(echo "$SWIFT_FILES" | xargs grep -n 'fatalError(' 2>/dev/null | grep -v 'Tests\|// safety:' || true)
    [ -n "$matches" ] && ERRORS+=("fatalError() found:\n$matches")

    # No print()
    matches=$(echo "$SWIFT_FILES" | xargs grep -n ' print(' 2>/dev/null | grep -v 'Tests\|#if DEBUG\|// safety:' || true)
    [ -n "$matches" ] && ERRORS+=("print() found:\n$matches")
fi

# @Model rename detection (CloudKit CRITICAL)
REMOVED=$(git diff --cached -- "*.swift" | grep '^-' | grep -E '@Model|: PersistentModel' | grep -E 'class [A-Z]' || true)
ADDED=$(git diff --cached -- "*.swift" | grep '^\+' | grep -E '@Model|: PersistentModel' | grep -E 'class [A-Z]' || true)
if [ -n "$REMOVED" ] && [ -n "$ADDED" ]; then
    ERRORS+=("@Model class rename detected — permanent CloudKit data loss.\n  Use a new class + .custom migration instead.\n  Removed: $REMOVED\n  Added: $ADDED")
fi

if [ ${#ERRORS[@]} -gt 0 ]; then
    echo "🚫 Pre-commit FAILED:"
    for e in "${ERRORS[@]}"; do echo -e "  ❌ $e\n"; done
    exit 1
fi
```

## Remediation Reference

When a check fails, load the corresponding essentials file for the correct pattern:

| Check Category | Load for Fix |
|---------------|--------------|
| Swift 6 Concurrency (1.x) | `ios26-api-reference/essentials/swift6.md` |
| SwiftUI Patterns (2.x) | `ios26-api-reference/essentials/swiftui.md` |
| SwiftData Safety (3.x) | `ios26-api-reference/essentials/swiftdata.md` |
| Entitlements / Widgets (4.x) | `ios26-api-reference/essentials/widgets.md` |
| App Intents (5.x) | `ios26-api-reference/essentials/app-intents.md` |
| Force unwrap / unsafe (6.x) | `ios26-api-reference/reference/crash-cheat-sheet.md` |

## Integration with /ship

Run as Phase 2 (after implement, before archive):

```
Phase 2: Local Verification
├── Run /apple-patterns-check
├── Run archive build (catches strict concurrency errors)
└── Fix any CRITICAL or HIGH issues before pushing
```

<!-- END SKILL: apple-patterns-check -->

---

<!-- BEGIN SKILL: apple-polish -->

# apple-polish

# Apple Polish

Design and product craftsmanship, automated. Reviews the app through the obsessive eyes of Apple's greatest designers and product visionaries, presents what needs fixing, and then dispatches agents to make it real — ending with a fresh TestFlight build.

This is the complement to `/apple-cleanup`:
- `/apple-cleanup` → engineering hardening (Swift 6, crashes, App Store compliance)
- `/apple-polish` → design craftsmanship (visual polish, UX flows, delight, product story)

## When to Use

- "The app works but doesn't *feel* Apple yet"
- Before a demo, press review, or App Store featured app consideration
- After completing a major feature — does it still feel coherent?
- "Would Jony Ive approve of this?"
- "Is this keynote-ready?"
- Periodic design quality audits

**Not for:** Engineering bugs, Swift 6 compliance, App Store rejection risks — use `/apple-cleanup`.

---

## Command Reference

```
/apple-polish              # Review and polish app in current directory
/apple-polish [app]        # Target a specific app subdirectory
```

---

## Architecture: The Polish Pipeline

```
/apple-polish [app]
│
├─► [Pre-Work] FILE MANIFEST ─────────────────────────────────────
│   Main thread: discover views, design system, onboarding
│
├─► [Phase 1] DESIGN & KEYNOTE REVIEW (parallel) ──────────────────
│   │
│   ├─► Subagent: Design Panel (Jony Ive perspective)
│   │   Visual craft, HIG, flows, typography, delight, empty states
│   │
│   └─► Subagent: Keynote Panel (Steve Jobs perspective)
│       One-sentence story, 90s demo script, "one more thing",
│       cringe test, platform narrative
│
├─► [Phase 2] INTERACTIVE SELECTION ───────────────────────────────
│   Present correlated findings to user, grouped by priority
│   User selects which issues to fix
│
├─► [Phase 3] ORCHESTRATION PLAN ─────────────────────────────────
│   Spawn planning agent → sequenced workstreams + dependencies
│
├─► [Phase 4] PARALLEL IMPLEMENTATION SQUADS ─────────────────────
│   │
│   ├─► Visual Polish Squad (typography, colors, spacing, icons)
│   ├─► UX Flow Squad (navigation, empty states, error flows)
│   ├─► Delight Squad (transitions, haptics, micro-interactions)
│   └─► Narrative Squad (copy, onboarding story, in-app messaging)
│
├─► [Phase 5] VERIFICATION ───────────────────────────────────────
│   Build passes, Xcode Previews compile, spot-check
│
└─► [Phase 6] TESTFLIGHT PUSH ────────────────────────────────────
    Commit → push → CI → TestFlight Internal Testing
```

---

## Pre-Work: Build the File Manifest

Before spawning any agents, the main thread MUST build a targeted file manifest. Design and Keynote panels only need views — skip services, models, and tests entirely.

```bash
# All View/UI files with line counts
find [APP_DIR] -name "*.swift" \
  \( -path "*/Views/*" -o -path "*/View.swift" -o -name "*View.swift" \
     -o -path "*/DesignSystem/*" -o -path "*/Design/*" \
     -o -name "*ViewModel.swift" -o -path "*/ViewModels/*" \
     -o -path "*/Onboarding*" -o -name "App.swift" \) \
  -not -path "*/Tests/*" | xargs wc -l | sort -rn | head -50
```

Build a manifest like:

```
FILE MANIFEST — Views Only:
App/ — App.swift (120), ContentView.swift (80)
Onboarding/ — OnboardingView.swift (340), WelcomeView.swift (210)
Home/ — HomeView.swift (545), DashboardView.swift (280)
Editor/ — EditorView.swift (620), ToolbarView.swift (190)
Live/ — LiveSessionView.swift (480), ControlSurfaceView.swift (320)
Components/ — CardView.swift (150), EmptyStateView.swift (95), ...
DesignSystem/ — Typography.swift (120), Colors.swift (95), Spacing.swift (60)
ViewModels/ — HomeViewModel.swift (380), SessionViewModel.swift (290)
```

Assign files:
- **Design Panel**: All views, DesignSystem, ViewModels
- **Keynote Panel**: App entry, Onboarding, Home, primary editor/action flow, DesignSystem

---

## Phase 1: Design & Keynote Review

Spawn 2 parallel subagents with the file manifest pre-loaded.

### Review Panels

Each panel is a self-contained subagent prompt kept in `references/` (progressive
disclosure — load only what you dispatch). For each panel: read the reference
file, paste the Views-only file manifest into its
`[PASTE FILE MANIFEST HERE — Views only]` placeholder, and dispatch the prompt
verbatim as the listed subagent type. Spawn both in parallel.

| Panel | Subagent type | Lens | Prompt |
|-------|---------------|------|--------|
| 1. Design | `apple-dev-skills:code-reviewer` | First impressions, navigation, visual craft, motion, delight, simplicity, HIG, edge cases | `references/panel-design.md` |
| 2. Keynote | `apple-dev-skills:code-reviewer` | Story clarity, demo-readiness, "one more thing", narrative, platform story, cringe test | `references/panel-keynote.md` |

Both panel prompts enforce the same contract:

- **Reading budget** — a strict MUST READ / SHOULD READ / SKIP order; stop after
  ~15-20 files and write the review (an incomplete structured review beats a
  complete file read with no output).
- **Mechanical audits** — grep checks the subagent runs rather than relying on
  training data (VoiceOver coverage, hardcoded colors/fonts, placeholder strings,
  developer-facing language, truncation risks).
- **Stable finding IDs** — Design `D-`, Keynote `K-` — preserved into the
  Phase 2 correlation.
- **Priority buckets** — P0 (fix before any demo or submission) through P3 (would
  round out the product).
- **Mandatory structured output** — each prompt ends by requiring the panel's
  output format before the response ends.

---

## Phase 2: Interactive Selection

After both panels return, correlate findings and present them to the user.

### Correlation Rules

1. **Design + Keynote flag same area** → Highest priority — visible flaw + story gap
2. **Design flags something Keynote missed** → Visual issue, may still tank the demo
3. **Keynote flags something Design missed** → Product story gap — often a UX or copy issue
4. **Multiple independent findings at same file:line** → Note it; strengthens case

### Presentation Format

Present findings to the user in this exact format. **P0 and P1 are pre-selected by default** — the user only needs to confirm, deselect, or add more.

```
═══════════════════════════════════════════════════════════════════
  APPLE POLISH REVIEW — {App}
  Design: X/10 | Keynote: X/10 | Demo Readiness: [STATUS]
═══════════════════════════════════════════════════════════════════

THE STORY
─────────
"{one-sentence pitch from Keynote panel}"

✅ P0 — DEMO KILLERS [SELECTED — will fix automatically]
──────────────────────────────────────────────────────────
  1. ✅ [D-01 / K-01] [Description] — [file:line]
  2. ✅ [D-02] [Description] — [file:line]

✅ P1 — DESIGN GAPS [SELECTED — will fix automatically]
──────────────────────────────────────────────────────────
  3. ✅ [D-10] [Description] — [file:line]
  4. ✅ [K-10] [Description] — [file:line]
  5. ✅ [D-11] [Description] — [file:line]

⬜ P2 — POLISH TARGETS (optional — elevates the experience)
────────────────────────────────────────────────────────────
  6. ⬜ [D-20] [Description] — [file:line]
  7. ⬜ [K-20] [Description] — [file:line]
  8. ⬜ [D-21] [Description] — [file:line]

⬜ P3 — "ONE MORE THING" CANDIDATES (optional — new features)
──────────────────────────────────────────────────────────────
  9. ⬜ [K-30] [Feature idea] — Effort: S/M/L
  10. ⬜ [D-30] [Feature idea] — Effort: S/M/L

DELIGHTS (already great — keeping these)
──────────────────────────────────────────
  • [Specific delight with file:line]
  • [Specific delight with file:line]

═══════════════════════════════════════════════════════════════════
  DEFAULT PLAN: Fix all P0 + P1 ({X} issues)
═══════════════════════════════════════════════════════════════════

  Confirm or adjust:
  • Press Enter / "yes" / "go" — fix all P0 + P1 as shown
  • Add P2: "yes +6,7" or "yes +P2"
  • Add P3: "yes +9" (caution: these add new features)
  • Remove items: "yes -4" to deselect specific P1 items
  • Review only: "none" — stop here, no fixes applied
```

Wait for user confirmation before proceeding. If user says "yes" or presses enter, proceed with all P0 + P1 items selected.

---

## Phase 3: Orchestration Plan

After user selects issues, spawn a planning agent to create the execution plan.

```yaml
subagent_type: apple-dev-skills:architect
prompt: |
  You are a DESIGN ORCHESTRATOR planning the implementation of selected polish
  issues for {app_name}.

  ## Selected Issues
  [List of user-selected findings with descriptions and file:line refs]

  ## App Structure
  [FILE MANIFEST]

  ## Your Task
  Group the selected issues into workstreams and produce an execution plan.

  ### Squad Types Available
  - **Visual Polish Squad**: Typography tokens, color consistency, spacing,
    SF Symbol weight/alignment, dark mode fixes, hardcoded value removal
  - **UX Flow Squad**: Navigation fixes, empty states, error states, permission
    recovery flows, back-navigation, loading state improvements
  - **Delight Squad**: Transitions/animations, haptic feedback, micro-interactions,
    completion/success states, skeleton loading views
  - **Narrative Squad**: App copy, onboarding story, empty state messaging,
    in-app help text, button labels, action confirmations

  ### Rules
  1. Group related issues into the same squad (minimize context switching)
  2. Identify dependencies (e.g. DesignSystem token changes must come before views that use them)
  3. Squads that share files MUST be sequenced (not parallel) for those files
  4. P0 issues must be assigned first, before any P2/P3 work

  ## OUTPUT FORMAT

  # Polish Execution Plan: {App}

  **Selected issues:** [X items]
  **Worktree:** polish-{app}-{timestamp}

  ## Dependency Order
  [Which changes must happen before others, and why]

  ## Squad Assignments

  ### Batch 1 — Must run first (dependencies for later squads)
  | Squad | Issues | Files | Est. Effort |
  |-------|--------|-------|-------------|
  | Visual Polish | D-01, D-20 | DesignSystem/Colors.swift, Typography.swift | M |

  ### Batch 2 — Can run in parallel after Batch 1
  | Squad | Issues | Files | Est. Effort |
  |-------|--------|-------|-------------|
  | UX Flow | D-10, K-10 | HomeView.swift, OnboardingView.swift | M |
  | Narrative Squad | K-01 | OnboardingView.swift, EmptyStateView.swift | S |

  ### Batch 3 — Final polish (depends on Batch 2)
  | Squad | Issues | Files | Est. Effort |
  |-------|--------|-------|-------------|
  | Delight Squad | D-20, K-20 | LiveSessionView.swift, CardView.swift | L |

  ## Success Criteria
  - Build passes with zero errors
  - All Xcode Previews compile
  - All selected P0/P1 issues resolved
  - No regressions in existing design tokens
```

---

## Phase 4: Parallel Implementation Squads

Dispatch squads per the orchestration plan. Run independent batches in parallel, sequential batches one-at-a-time.

All squads work in an isolated worktree:

```bash
WORKTREE_NAME="polish-{app}-$(date +%Y%m%d-%H%M%S)"
git worktree add "../$WORKTREE_NAME" -b "$WORKTREE_NAME"
cd "../$WORKTREE_NAME"
xcodegen generate
# Verify baseline build
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  build 2>&1 | tail -5
```

### Visual Polish Squad

```yaml
subagent_type: apple-dev-skills:coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a VISUAL POLISH SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected visual issues with file:line}

  Your mandate: make every pixel intentional. Like Jony Ive's team going over
  every surface before a product announcement.

  Common fixes:
  - Replace hardcoded Color(hex:) / Color(red:) with DesignSystem tokens
  - Replace font(.system(size: X)) with type scale tokens
  - Fix inconsistent padding/spacing (align to 8pt grid)
  - Fix SF Symbol weight mismatches (.regular vs .semibold across same context)
  - Fix dark mode: colors that don't adapt, images that don't have dark variants
  - Ensure Dynamic Type: no fixed heights on text containers

  CONSTRAINTS:
  - Load DesignSystem files first — understand all existing tokens before adding anything new
  - Prefer extending existing tokens over adding new ones
  - No behavior changes — visual only
  - Build must pass after changes
  - Test each Xcode Preview after touching a view file

  Return: List of visual changes + which issues are resolved
```

### UX Flow Squad

```yaml
subagent_type: apple-dev-skills:coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a UX FLOW SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected UX issues with file:line}

  Your mandate: every transition should feel like you're moving through a real
  space. No dead ends. No confusion. No explanation required.

  Common fixes:
  - Replace blank/sad empty states with helpful, actionable ones
  - Add recovery flows for denied permissions (Settings deep-link)
  - Fix navigation dead ends (back buttons that lead nowhere sensible)
  - Replace loading spinners with skeleton views where appropriate
  - Ensure interrupted flows preserve state (return to where user left off)
  - Fix confusing button labels (rename to clear action verbs)

  CONSTRAINTS:
  - Read the full flow context before changing navigation
  - No new screens unless strictly necessary for recovery flows
  - Match existing navigation patterns in the app (push vs sheet vs replace)
  - Build must pass after changes

  Return: Flow improvements made + which issues are resolved
```

### Delight Squad

```yaml
subagent_type: apple-dev-skills:coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a DELIGHT SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected delight issues with file:line}

  Your mandate: add the moments that make someone pause and think "someone
  really cared about this." Not gratuitous animation — purposeful joy.

  Common additions:
  - Add haptic feedback at meaningful moments (task completion, destructive actions)
  - Replace abrupt appears/disappears with spring animations or fade transitions
  - Add satisfying completion states (not just "Done" — a moment of celebration)
  - Add micro-interactions: buttons that give visual feedback on tap
  - Improve skeleton/loading views to feel like the content is about to appear
  - Add the "one more thing" moment if a P3 candidate was selected

  CONSTRAINTS:
  - Use system haptics (UIImpactFeedbackGenerator, UINotificationFeedbackGenerator)
  - Use SwiftUI's built-in animation system — no UIKit animation unless necessary
  - Animations must respect Reduce Motion (withAnimation(.linear(duration: 0)) for reduced)
  - No animation should delay the user's ability to interact
  - Build must pass, Previews must compile

  Return: Delight additions + which issues are resolved
```

### Narrative Squad

```yaml
subagent_type: apple-dev-skills:coder
worktree: polish-{app}-{timestamp}
prompt: |
  You are a NARRATIVE SPECIALIST working in worktree: {worktree_path}

  ISSUES: {selected narrative/copy issues with file:line}

  Your mandate: every word in this app should feel like Apple wrote it.
  Clear, human, confident, specific. Never technical. Never corporate.

  Apple writing principles to follow:
  - Short sentences. Active voice. Present tense where possible.
  - Never say "please" (condescending) or "sorry" (weak)
  - Buttons are verbs: "Get Started" not "Next", "Save Changes" not "OK"
  - Empty states invite action: "No items yet. Tap + to add your first."
  - Error messages explain what happened AND what to do next
  - Onboarding should earn the user's trust in 3 screens maximum
  - Remove developer-facing language: "JSON", "API", "sync", "fetch", "null"

  CONSTRAINTS:
  - Only change user-visible strings — no code logic changes
  - Preserve string key names if localization is used (only change the values)
  - If the app uses Localizable.strings, update those files — not hardcoded strings
  - Build must pass

  Return: Copy changes made + which issues are resolved
```

---

## Phase 5: Verification

After all squads complete, verify the build is clean:

```bash
#!/bin/bash
set -e

echo "═══════════════════════════════════════════════════════════════"
echo "  POLISH VERIFICATION"
echo "═══════════════════════════════════════════════════════════════"

# 1. Project regeneration
echo "📋 Regenerating project..."
xcodegen generate 2>&1 | tail -3

# 2. Build verification
echo ""
echo "🔨 Build verification..."
xcodebuild -scheme {App}-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  build 2>&1 | grep -E "error:|warning:|Build succeeded|BUILD FAILED" | tail -10

# 3. Preview compilation check (catches SwiftUI issues missed by build)
echo ""
echo "👁️  Checking for obvious Preview issues..."
grep -rn "#Preview" --include="*.swift" . | wc -l
echo "  Previews defined — spot-check key views in Xcode after merge"

# 4. Design token consistency check
echo ""
echo "🎨 Design token consistency check..."
echo "Hardcoded colors remaining:"
grep -rn 'Color(red:\|Color(hex:\|UIColor(red:' --include="*.swift" . \
  | grep -v "DesignSystem\|Tests\|Preview" | head -10 || echo "  None ✓"

echo "Hardcoded font sizes remaining:"
grep -rn 'font(.system(size:' --include="*.swift" . \
  | grep -v "DesignSystem\|Tests" | head -10 || echo "  None ✓"

echo "Developer-facing strings remaining:"
grep -rn '"JSON"\|"API"\|"debug"\|"fetch"\|"sync"\|"null"' \
  --include="*.swift" -i . | grep -v "Tests\|// ok" | head -10 || echo "  None ✓"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  VERIFICATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
```

**If build fails:**
1. Capture errors
2. Dispatch debug subagent to the worktree with error context
3. Apply fix, re-verify
4. Max 3 retry cycles

---

## Phase 6: TestFlight Push

After verification passes:

```bash
#!/bin/bash
set -e

APP="{app}"
WORKTREE="polish-{app}-{timestamp}"

echo "═══════════════════════════════════════════════════════════════"
echo "  TESTFLIGHT PUSH — {App} Polish Build"
echo "═══════════════════════════════════════════════════════════════"

# 1. Commit in worktree
echo "📝 Committing polish changes..."
git add -A
git commit -m "polish($APP): design and UX craftsmanship pass

Design improvements:
{list of resolved design issues}

Keynote improvements:
{list of resolved keynote issues}

Squads run:
- Visual Polish: {X issues}
- UX Flow: {X issues}
- Delight: {X issues}
- Narrative: {X issues}

Verification: Build PASS, design tokens consistent
Worktree: $WORKTREE"

# 2. Merge to main
echo ""
echo "📥 Merging to main..."
cd /path/to/main/repo
git merge "$WORKTREE_NAME" --no-ff -m "merge: polish pass for $APP"
git push origin main

# 3. Poll CI
echo ""
echo "⏳ Polling CI..."
MAX_RETRIES=60
RETRY=0
while [ $RETRY -lt $MAX_RETRIES ]; do
    STATUS=$(xc_status 2>/dev/null | grep -E "succeeded|failed|in_progress" | head -1)
    if echo "$STATUS" | grep -q "succeeded"; then
        echo "✅ CI build succeeded!"
        break
    elif echo "$STATUS" | grep -q "failed"; then
        echo "❌ CI build failed — check with: xc_get_issues"
        exit 1
    fi
    echo "  Building... ($(($RETRY * 30))s elapsed)"
    sleep 30
    RETRY=$((RETRY + 1))
done

# 4. Distribute
echo ""
echo "🚀 Distributing to TestFlight Internal Testing..."
xc_distribute_build \
  --groups "Internal Testing" \
  --changelog "Design polish: {brief summary of what was improved}"

echo "✅ Polish build live on TestFlight!"
```

---

## Final Report

```
═══════════════════════════════════════════════════════════════════
  APPLE POLISH COMPLETE — {App}
═══════════════════════════════════════════════════════════════════

THE STORY (before / after)
───────────────────────────
Before: [old pitch or "unclear"]
After:  "{polished one-sentence pitch}"

SCORECARD
──────────
                    Before  After
Design:              X/10 → Y/10
Keynote Readiness:   X/10 → Y/10
Demo Status:     [OLD] → [NEW]

SQUADS
───────
🎨 Visual Polish:    X issues resolved
🧭 UX Flow:         X issues resolved
✨ Delight:          X issues resolved
✍️  Narrative:       X issues resolved

ISSUES RESOLVED
────────────────
P0 Demo Killers:    [X resolved / Y total]
P1 Design Gaps:     [X resolved / Y total]
P2 Polish Targets:  [X resolved / Y total]
P3 "One More Thing": [X built / Y proposed]

TESTFLIGHT
──────────
Build:   #{N}
Status:  🟢 Internal Testing
Commit:  {hash}

WHAT'S DIFFERENT
────────────────
{3-5 specific, concrete improvements — what a user will actually notice}

NEXT STEPS
──────────
1. Install TestFlight build — walk the demo script from the Keynote review
2. Remaining issues (not selected): [list with IDs for future reference]
3. "One More Thing" candidates deferred: [list with effort estimates]
4. When ready for App Store: /apple-cleanup for engineering hardening

═══════════════════════════════════════════════════════════════════
  Status: POLISHED — DEMO BUILD LIVE ON TESTFLIGHT
═══════════════════════════════════════════════════════════════════
```

---

## Relationship to Other Skills

| Skill | Focus | Automation | When |
|-------|-------|-----------|------|
| `apple-polish` | Design + Keynote | Review → select → fix → TestFlight | Design craftsmanship |
| `apple-cleanup` | Engineering + Compliance | Review → fix ALL → TestFlight | Code hardening |
| `apple-review` | All 4 panels | Review only (no fixes) | Full audit |
| `apple-design` | SwiftUI design patterns | Reference only | While coding |
| `ios-accessibility` | VoiceOver + Dynamic Type | Reference only | Accessibility audit |

---

*Every pixel intentional. Every word earned. Every transition purposeful. Ship what Apple would be proud of.*

<!-- REFERENCE: apple-polish/references/panel-design.md -->

# Panel 1: Design Review — Subagent Prompt

**Persona:** Jony Ive and the Apple design team reviewing a product the night before announcement. Every pixel is intentional. Every transition earns its place. The question isn't "does it work?" — it's "does it feel inevitable?"

**Dispatch:** Spawn as a parallel subagent with the Views-only file manifest pre-loaded into the `[PASTE FILE MANIFEST HERE — Views only]` placeholder, then send the block below verbatim.

```yaml
subagent_type: apple-dev-skills:code-reviewer
prompt: |
  You are conducting a DESIGN REVIEW of {app_name} with the critical eye of
  Apple's most obsessive designers. Every pixel, every transition, every moment
  of friction matters. You MUST produce a structured review with scores and
  specific file:line references.

  ## File Manifest
  [PASTE FILE MANIFEST HERE — Views only]

  ## Reading Strategy
  Read files in this priority order. Stop after 15-20 files and write your review.
  1. MUST READ: App entry, Home/main view, onboarding, primary editor, live/session
     view, ALL DesignSystem files, ALL ViewModels
  2. SHOULD READ (if context allows): Components, Controls, edge case views
  3. SKIP: Services, Models, Tests, Extensions, Utilities

  An incomplete review based on 15 files is infinitely more valuable than reading
  40 files and producing no output. After reading MUST READ files, STOP and write.

  ## Evaluation Criteria

  ### 1.1 First Impressions & Onboarding
  - What does the user see on first launch? Welcoming or overwhelming?
  - Skippable onboarding? Does it respect the user's time?
  - Time-to-value: taps from launch to first meaningful interaction?
  - Does the first screen earn the user's trust?

  ### 1.2 Core Flow & Navigation
  - Map the primary user journey (the ONE thing people open the app to do)
  - Count taps/gestures required for the most common actions
  - Dead ends? Confusing back-navigation? Orphaned screens?
  - Does navigation feel spatial and predictable (iOS stack/tab patterns)?
  - Clear information hierarchy on each screen?

  ### 1.3 Visual Craft & Polish
  - Typography: consistent scale? Orphaned styles (hardcoded fonts vs tokens)?
  - Color: cohesive palette? Semantic colors used correctly? Hardcoded hex?
  - Spacing: consistent system? Cramped or floating elements?
  - Icons: consistent SF Symbol weight and optical alignment?
  - Dark mode: intentional or just inverted?
  - Dynamic Type: graceful adaptation at all text sizes?
  - Are DesignSystem tokens actually used, or do views hardcode their own values?

  ### 1.4 Motion & Feedback
  - Are transitions meaningful or gratuitous?
  - Do interactive elements provide immediate haptic/visual feedback?
  - Loading states: skeleton views or spinners? (spinners = lazy)
  - Does the app feel responsive — do taps register instantly?
  - Micro-interactions that reward the user?

  ### 1.5 Delight & WOW Factor
  - Is there at least one moment that makes a user want to show someone else?
  - Does the app have personality without being gimmicky?
  - Thoughtful details that reveal themselves over time?
  - Does the success/completion state feel rewarding?
  - Would someone pause and think "someone really cared about this"?

  ### 1.6 Simplicity & Focus
  - Can you explain what the app does in one sentence?
  - Is every screen earning its place? Could any be merged or removed?
  - Minimal, well-defaulted settings — or option overload?
  - Does the app resist feature creep? Is the scope disciplined?

  ### 1.7 HIG Compliance
  - Standard iOS patterns: navigation bars, tab bars, sheets, alerts
  - Platform conventions: swipe-to-delete, pull-to-refresh where expected
  - Accessibility: VoiceOver labels, Dynamic Type, sufficient contrast
  - Latest platform capabilities leveraged (Liquid Glass on iOS 26, etc.)?
  IMPORTANT: Verify with Grep, not memory:
  - Count `accessibilityLabel` occurrences vs interactive views
  - Check for hardcoded font sizes vs Dynamic Type modifiers
  - Grep for `.foregroundColor(` with hex Color literals

  ### 1.8 Edge Cases & Empty States
  - No data? Is the empty state helpful or sad?
  - Permissions denied? Recovery flow?
  - Extremely long text input? Truncation graceful?
  - User interrupts a flow midway? State preserved?

  ### Mechanical Audits (run these checks)
  - Count `accessibilityLabel` / `accessibilityHint` vs total interactive views
    (ratio < 0.5 = poor VoiceOver coverage)
  - `grep -rn "TODO\|FIXME\|Lorem\|placeholder" --include="*.swift" -i` in views
  - `grep -rn '\.lineLimit(1)' --include="*.swift"` (truncation risks on key content)
  - `grep -rn 'Color(red:\|Color(hex:\|UIColor(red:' --include="*.swift"` outside DesignSystem
  - `grep -rn '"[A-Z][a-z].*"' --include="*.swift"` for hardcoded user-visible strings
  - `grep -rn 'font(.system(size:' --include="*.swift"` (hardcoded font sizes)

  ## OUTPUT FORMAT (MANDATORY)

  ## Design Review: {App}

  ### Overall Impression
  [2-3 sentences: gut reaction as a design leader — honest, specific]

  ### Scores (1-10)
  | Dimension | Score | Notes |
  |-----------|-------|-------|
  | First Impression | X | ... |
  | Core Flow | X | ... |
  | Visual Craft | X | ... |
  | Motion & Feedback | X | ... |
  | Delight Factor | X | ... |
  | Simplicity | X | ... |
  | HIG Compliance | X | ... |
  | Edge Cases | X | ... |
  | **Overall** | **X** | ... |

  ### Mechanical Audit Results
  - VoiceOver coverage: X labels across Y files (ratio: Z)
  - Placeholder/TODO strings: [count, locations]
  - Hardcoded colors outside DesignSystem: [count]
  - Truncation risks (.lineLimit on key content): [count]
  - Hardcoded font sizes: [count]

  ### Delights (what's already great)
  - [Specific praise — file:line]

  ### Critical Issues (P0 — fix before any demo or submission)
  - [ID: D-01] [Description] — [file:line] — [Recommended fix]

  ### Design Gaps (P1 — significant UX improvements)
  - [ID: D-10] [Description] — [file:line] — [Approach]

  ### Polish Targets (P2 — elevates the experience)
  - [ID: D-20] [Description] — [file:line] — [Approach]

  ### Missing Elements (P3 — would round out the product)
  - [ID: D-30] [Description] — [Why it matters]

  CRITICAL: You MUST produce the structured review above before your response ends.
  Do NOT spend more than 60% of your work reading files. After reading MUST READ
  files, STOP and write your review.
```

<!-- REFERENCE: apple-polish/references/panel-keynote.md -->

# Panel 2: Keynote Review — Subagent Prompt

**Persona:** Steve Jobs, the night before WWDC. He's about to walk on stage and demo this app to the world. He doesn't care about the architecture or test coverage — he cares about the *story*. One moment of confusion, hesitation, or ugliness and the whole thing falls apart.

**Dispatch:** Spawn as a parallel subagent with the Views-only file manifest pre-loaded into the `[PASTE FILE MANIFEST HERE — Views only]` placeholder, then send the block below verbatim.

```yaml
subagent_type: apple-dev-skills:code-reviewer
prompt: |
  You are Steve Jobs reviewing {app_name} the night before a WWDC keynote.
  Tomorrow you walk on stage and demo this app live to the world. You MUST
  produce a structured review with a demo script, scores, and file:line references.

  ## File Manifest
  [PASTE FILE MANIFEST HERE — Views only]

  ## Reading Strategy
  Read files in this order. Stop after ~15 files and write your review.
  1. MUST READ: App entry, Onboarding, Home/main view, primary action flow
  2. MUST READ: Live/session/result view (the payoff), DesignSystem files
  3. SHOULD READ: Key components in the demo flow
  4. SKIP: Services, Models, Tests, Extensions, Utilities, migration files

  Experience this as a NARRATIVE, not a code audit. You are reading a demo script.

  ## Evaluation Criteria

  ### 4.1 The One-Sentence Story
  - Explain the app in ONE sentence a non-technical person immediately wants
  - Is there a clear "hero problem" the app solves? Not three — one
  - Would a first-time user understand the value within 5 seconds of opening it?
  - Does the app's name and icon reinforce the story?

  ### 4.2 The Demo Script
  - Map the ideal 90-second live demo: opening shot → problem → solution → payoff
  - Is the primary flow demo-safe? (No network deps, loading spinners, empty states)
  - Any states that could embarrass on stage? (Empty lists, error dialogs, slow transitions)
  - Can the demo flow be completed with zero hesitation, zero explanation?
  - Does the UI read clearly at projection scale (large text, clear contrast)?

  ### 4.3 The "One More Thing" Moment
  - Is there a feature so thoughtful it earns a dramatic reveal?
    Examples: Watch companion that Just Works, a Live Activity on the lock screen,
    AI that suggests the next action, a beautiful empty state that tells a story
  - If there's no "one more thing" yet, what COULD be built? (With effort estimate)
  - Is there a moment where the technology disappears and only the human benefit remains?

  ### 4.4 Narrative Coherence
  - Does every screen tell part of the same story, or do some feel bolted-on?
  - Clear emotional arc? (Problem → Solution → Celebration)
  - Consistent personality? (Voice, tone, visual language throughout)
  - What would a journalist's headline be after a hands-on review?

  ### 4.5 Platform Story
  - Does this app showcase what makes Apple's platform special?
  - System capabilities used in ways that feel native and earned, not checkbox features?
  - Does the app feel like it *belongs* here — couldn't exist anywhere else?
  - Watch integration (if any): natural extension, not a shrunken iPhone?
  - Widgets/Live Activities (if any): glanceable story on their own?

  ### 4.6 The Cringe Test
  Walk through every screen in the demo flow and ask: "Would I be embarrassed
  showing this on stage to 10 million people?"
  - Placeholder content, unfinished corners, inconsistent styling
  - Awkward copy, confusing iconography, developer-facing language
  - Anything requiring explanation ("you have to long-press to...") is a FAIL
  - Anything that looks unfinished or half-baked

  ### Mechanical Audits
  - `grep -rn '"JSON"\|"API"\|"debug"\|"nil"\|"config"\|"TODO"\|"test"' \
    --include="*.swift" -i` (developer-facing language in user-visible strings)
  - Check for empty states that would appear during a demo (no-data screens)
  - Check if onboarding uses SF Symbols as illustrations (feels cheap)
  - `grep -rn '"Error"\|"Failed"\|"Unknown"' --include="*.swift"` in user-visible text

  ## OUTPUT FORMAT (MANDATORY)

  ## Keynote Review: {App}

  ### The Story
  [Write the ONE-sentence pitch exactly as Steve would say it on stage]

  ### Demo Readiness: [READY / ALMOST / NOT READY]

  ### The 90-Second Demo Script
  1. [Opening shot — what the audience sees first and why it hooks them]
  2. [The problem moment — show the pain point viscerally]
  3. [The solution — core action in real-time, no explanation needed]
  4. [The payoff — the result that earns applause]
  5. ["One More Thing" — if it exists]

  ### Scores (1-10)
  | Dimension | Score | Notes |
  |-----------|-------|-------|
  | Story Clarity | X | ... |
  | Demo Safety | X | ... |
  | "One More Thing" Potential | X | ... |
  | Narrative Coherence | X | ... |
  | Platform Story | X | ... |
  | Cringe-Free | X | ... |
  | **Overall** | **X** | ... |

  ### Applause Moments (what already earns the gasp)
  - [Specific moment with file:line context]

  ### Cringe Moments (P0 — what kills the demo on stage)
  - [ID: K-01] [Description] — [file:line] — [Why it fails on stage] — [Fix]

  ### Story Gaps (P1 — breaks the narrative)
  - [ID: K-10] [Description] — [file:line] — [Fix]

  ### Platform Opportunities (P2 — would strengthen the platform story)
  - [ID: K-20] [Description] — [Approach]

  ### "One More Thing" Candidates (P3 — new features worth building)
  - [ID: K-30] [Feature idea] — [Why it would wow] — [Effort: S/M/L]

  CRITICAL: You MUST produce the structured review above before your response ends.
  Do NOT spend more than 60% of your work reading files. You are writing a demo
  script and critique, not auditing code. After reading the demo flow, STOP and write.
```

<!-- END SKILL: apple-polish -->

---

<!-- BEGIN SKILL: apple-review -->

# apple-review

# Apple Review

A comprehensive, multi-perspective review that examines an app the way Apple would — from the obsessive design eye of their best designers, the architectural rigor of their engineering leads, the checklist discipline of App Review, and the product vision clarity required before anything earns a keynote slide.

This goes deeper than a session review (which checks recent changes) or `/apple-patterns-check` (which validates code patterns). This skill evaluates the **entire app experience** as a cohesive product.

## When to Use

- Before a major App Store submission
- Periodic quality audits ("how good is this app, really?")
- After completing a significant feature milestone
- When you want an honest, Apple-caliber critique
- When preparing for Apple Design Award consideration

## HARD RULE: Presented vs Dormant vs Debug-Only

**Every panel MUST verify that any view it critiques is actually reachable from the running app in a Release build** before treating it as a runtime UX/engineering problem. Defined-but-unpresented views, and views only reachable in DEBUG builds, are completely different finding classes than shipping-but-flawed views.

Before any Critical Issue / Cringe Moment cites a full-screen view, modal, sheet, or flow, the panel MUST run at least one reverse-reference search and report one of:

- **`[shipped]`** — citing the `file:line` of the `.sheet` / `.fullScreenCover` / `NavigationLink` / direct embed / `NavigationDestination` that presents the view from the live app graph in Release builds.
- **`[wired-behind-flag]`** — presentation exists but gated by a feature flag or remote setting that *could* be enabled in Release; cite the gate.
- **`[debug-only]`** — presentation only occurs inside `#if DEBUG`, a developer menu, a launch-argument check, or similar. Cite the gate. Users will never see this in shipped builds — Compliance and Keynote panels must treat as out of scope; Engineering may still flag if it leaks symbols/secrets into Release.
- **`[dormant]`** — the view has no call site outside its own file and previews. In this case the finding must be reframed as "dormant code — ship it, stage it, or delete it?" NOT as a user-facing UX flaw.

**Verification recipe for each view flagged:**
1. `grep -rn 'ViewName(' app/ --include='*.swift'` excluding the view's own file and tests.
2. If zero matches outside the view's own file → `[dormant]`. Full stop.
3. If matches exist, check whether every match is inside `#if DEBUG` / a debug menu / a launch-arg gate → `[debug-only]`.
4. Otherwise → pick the presenting call site and cite `file:line` as `[shipped]` or `[wired-behind-flag]`.

This rule exists because a file that compiles cleanly, has previews, and has a ViewModel can still be unreachable at runtime. Reading code-in-isolation tells you what a view *would* do if presented, not whether users ever see it. Confident plausible narratives about "UX whiplash" or "jarring flows" are exactly where this trap fires — plausibility is when verification matters most.

## HARD RULE: Privacy Symbols vs Usage Strings (the two-scanner contract)

Two independent gates inspect privacy permissions, and they fail in **opposite** directions:

- **Apple's automated binary scanner** (TestFlight upload) rejects with `ITMS-90683` if the binary links a privacy-sensitive symbol but the Info.plist has no matching usage string. It reads *linked symbols*, not features.
- **Human App Review** rejects under **Guideline 5.1.1** if the Info.plist declares a usage string for a permission the app has no feature for. It reads *the running app*, not symbols.

A permission therefore needs **symbol present ⟺ string present**. Both-or-neither. Declaring a string "just in case" fails human review; linking the symbol without the string fails the scanner.

**Symbol linkage is the trigger — not the `import`, and not the feature.**

- It is the *specific symbol*, not the umbrella framework. `import AVFoundation` alone does not demand `NSCameraUsageDescription`; **`AVCaptureDevice`** does. Audio via `AVAudioApplication` demands only `NSMicrophoneUsageDescription`. Same framework, different keys, keyed off which symbols you actually reference.
- Linkage is **function-granular under the optimizer's reachability, not branch-granular**. A never-hit `switch` branch or an `if false` path still links the symbol if the *enclosing function* is reachable from the app's entry graph. You cannot dead-code your way out of a symbol by making the call conditional — only by making the enclosing function unreachable, or by removing the reference from the linked image entirely.
- This bites hardest with **shared packages**: a symbol referenced anywhere in a package that every app links gets linked into *every* app, so one app's camera code forces a camera-permission decision on apps that have no camera. The fix is to move the symbol behind a product/module boundary that only camera-using apps link (see `ios-build` → symbol-gating). Verify with `nm <app-binary> | grep -i <Symbol>` against a *fresh* archive — stale archives in `build/` predate the fix and will mislead you.

When auditing, treat a usage string with no reachable feature and a linked privacy symbol with no usage string as **the same class of finding** — a broken two-scanner contract — and report which side is missing.

## Input

```
/apple-review                    # Review app in current directory
/apple-review apps/focus         # Review a specific app subdirectory
/apple-review --design-only      # Run only the Design panel
/apple-review --engineering-only # Run only the Engineering panel
```

Adapt paths to your project structure. For monorepos with multiple apps, specify the app directory.

## Architecture: Four Review Panels

The review spawns four parallel subagents, each examining the app from a distinct perspective. They work independently — like four separate Apple review teams who don't talk to each other — then their findings are correlated into a unified report.

```
/apple-review
│
├─► [Pre-Work Phase] ────────────────────────────────────────
│   Main thread: build file manifest, count files/lines,
│   identify key files for each panel
│
├─► [Parallel Phase] ─────────────────────────────────────────
│   │
│   ├─► Panel 1: Design Review (apple-dev-skills:code-reviewer)
│   │   UI/UX flows, visual craft, delight, simplicity, HIG
│   │
│   ├─► Panel 2: Engineering Review (apple-dev-skills:auditor)
│   │   Architecture, code quality, performance, patterns
│   │
│   ├─► Panel 3: Compliance Review (apple-dev-skills:code-reviewer)
│   │   App Store guidelines, rejection risks, metadata
│   │
│   └─► Panel 4: Keynote Review (apple-dev-skills:code-reviewer)
│       Product story, demo-readiness, "one more thing" moments
│
├─► [Correlation Phase] ──────────────────────────────────────
│   Cross-reference findings, deduplicate, prioritize
│
└─► [Report Phase] ───────────────────────────────────────────
    Write unified report to docs/reviews/
```

---

## Pre-Work Phase (Main Thread)

Before spawning any agents, the main thread MUST:

### 1. Build the File Manifest

```bash
# List all non-test Swift files with line counts
find [APP_DIR] -name "*.swift" -not -path "*/Tests/*" -not -path "*/UITests/*" | \
  xargs wc -l | sort -rn | head -60

# List config files
find [APP_DIR] -name "*.plist" -o -name "*.entitlements" -o -name "*.xcprivacy" -o -name "project.yml"
```

### 2. Categorize Files for Each Panel

Build a manifest like:

```
FILE MANIFEST (auto-generated):
Views/ — 40 files, ~6000 lines
  Setup/ — HomeView.swift (545), ProgramEditorView.swift (380), ...
  Live/ — RundownView.swift (200), ControlSurfaceView.swift (580), ...
  Live/iPad/ — ActiveSegmentView.swift (430), ...
ViewModels/ — 5 files, ~2500 lines
  RundownViewModel.swift (1100), SessionViewModel.swift (400), ...
Services/ — 35 files, ~8000 lines
Models/ — 18 files, ~1200 lines
DesignSystem/ — 3 files, ~300 lines
Config: project.yml, Info.plist, MyApp.entitlements, PrivacyInfo.xcprivacy
```

### 3. Assign files to each panel

- **Design**: App entry, onboarding, home, main editor, live views, design system, ViewModels
- **Engineering**: All services, models, ViewModels, extensions, utilities, project config, tests
- **Compliance**: project.yml, Info.plist, entitlements, privacy manifest, services with protected APIs, app entry
- **Keynote**: Onboarding, home, editor, live views, design system, README

Include this manifest in each agent's prompt so they don't waste tool calls on file discovery.

---

## Review Panels

Each panel is a self-contained subagent prompt kept in `references/` (progressive
disclosure — load only what you dispatch). For each panel: read the reference
file, paste the file manifest from the Pre-Work Phase into its
`[PASTE FILE MANIFEST HERE]` placeholder, and dispatch the prompt verbatim as the
listed subagent type. Spawn all four in parallel.

| Panel | Subagent type | Lens | Prompt |
|-------|---------------|------|--------|
| 1. Design | `apple-dev-skills:code-reviewer` | UI/UX flows, visual craft, delight, simplicity, HIG | `references/panel-design.md` |
| 2. Engineering | `apple-dev-skills:auditor` | Architecture, Swift 6, performance, patterns, tests | `references/panel-engineering.md` |
| 3. Compliance | `apple-dev-skills:code-reviewer` | App Store guidelines, privacy, entitlements, rejection risks | `references/panel-compliance.md` |
| 4. Keynote | `apple-dev-skills:code-reviewer` | Product story, demo-readiness, "one more thing" | `references/panel-keynote.md` |

Each panel prompt enforces the same contract:

- **Reading budget** — a strict MUST READ / SHOULD READ / SKIP order; stop reading
  and write the review after ~15 files (an incomplete structured review beats a
  complete file read with no output).
- **Mechanical audits** — grep checks the subagent runs rather than relying on
  training data (VoiceOver coverage, `fatalError`/`try!`/`as!`, missing usage
  descriptions, developer-facing strings, etc.).
- **Findings quality gate** — 0–N findings per bucket; never invent findings to
  hit a quota; empty buckets say "None observed at this depth of review."
- **Stable finding IDs** — Design `D-`, Engineering `E-`, Compliance `C-`,
  Keynote `K-` — preserved into the correlated report.
- **Presentation tag** — every issue is marked `shipped` / `wired-behind-flag` /
  `debug-only` / `dormant` so the Correlation Phase can gate priority (see the
  HARD RULE above).
- **Mandatory structured output** — each prompt ends by requiring the panel's
  output format before the response ends.

---

## Correlation Phase

After all panels complete, correlate findings into a unified report.

### Cross-Reference Rules

1. **Design + Engineering flag same area** -> Priority boost. Same root issue from two angles.
2. **Keynote + Design flag same area** -> Highest-impact polish target. Visible flaw.
3. **Keynote flags something no other panel caught** -> Story gap, not technical gap. High weight.
4. **Compliance flags something Design missed** -> Also a design gap (e.g. missing VoiceOver labels).
5. **Engineering + Compliance overlap** -> Merge into compliance finding (harder requirement).
6. **Multiple panels independently flagged the same issue** -> Note this; it strengthens the case.

### Dormant / Debug-Only Sanity Gate (MANDATORY before promoting any finding to P0/P1)

For EVERY Critical Issue / Cringe Moment that claims runtime user impact ("frustrates users", "interrupts flow", "jarring", "crash risk users hit"), the orchestrator MUST verify:

- The finding cites `[shipped @ file:line]` or `[wired-behind-flag @ file:line]` AND the gate is realistically reachable in a shipped Release build, OR
- The orchestrator runs its OWN reverse-reference grep (`ViewName(` against the app target, excluding the view's own file and previews/tests) and confirms a live call site that is NOT inside `#if DEBUG` or a debug-only gate.

**If no live call site exists:** the finding is reclassified as `[dormant]` and demoted to P3 "dead or staged code — decide" regardless of how many panels flagged it.

**If every call site is debug-only:** the finding is reclassified as `[debug-only]` and demoted to P3 unless it leaks symbols, strings, or secrets into the shipped binary.

**Why:** two panels reading the same dormant or debug-only file and each flagging it is NOT independent corroboration — it's the same mistake counted twice. Correlation between panels that read the same sources never upgrades confidence; only a presentation-graph trace does.

Plausibility is a trap. A finding that sounds clean and causal ("5-second capture → 20-second triage modal") is exactly when to grep the presenter before promoting to P1.

### ID Preservation Rule

Each panel issues prefixed IDs (`D-XX`, `E-XX`, `C-XX`, `K-XX`). The correlated findings table MUST keep panel-prefixed IDs verbatim — do NOT renumber to generic `X-XX`. When a single underlying issue is flagged by multiple panels, list all IDs in the row (e.g. `D-03, K-02`).

### Priority Framework

| Priority | Criteria | Action |
|----------|----------|--------|
| **P0 -- Blocker** | App Store rejection or crash users hit in Release | Fix before submission |
| **P1 -- Critical** | Significant UX degradation or architectural risk in shipped code path | Fix in next sprint |
| **P2 -- Important** | Polish gap, minor UX issue, tech debt | Plan for upcoming release |
| **P3 -- Enhancement / Dormant / Debug-only** | Would elevate the app but not blocking; or "ship / stage / delete" decisions on dormant or debug-only code | Backlog |

---

## Report Phase

Write the unified report to `docs/reviews/YYYY-MM-DD-apple-review-[app].md`.

### Unified Report Template

```markdown
# Apple Review: [App Name]

**Date:** YYYY-MM-DD
**Version:** [version]
**Reviewed by:** AI Apple Review Panel (Design + Engineering + Compliance + Keynote)

---

## Executive Summary

[3-5 sentences: overall assessment. Would this app impress Apple? Most important thing to address? Strongest aspect?]

### Scorecard

| Panel | Score | Verdict |
|-------|-------|---------|
| Design | X/10 | [one-line] |
| Engineering | X/10 | [one-line] |
| Keynote | X/10 | [one-line] |
| Compliance | X/10 | [one-line] |
| **Overall** | **X/10** | [one-line] |

### Submission Readiness: [READY / READY WITH CAVEATS / NOT READY]

---

## Design Review
[Full Panel 1 output]

---

## Engineering Review
[Full Panel 2 output]

---

## Keynote Review
[Full Panel 4 output]

---

## Compliance Review
[Full Panel 3 output]

---

## Correlated Findings

| ID | Issue | Panels | Priority | Effort |
|----|-------|--------|----------|--------|
| X-01 | ... | Design + Engineering | P0 | S/M/L |

---

## Action Plan

### P0 -- Blockers (fix before submission)
1. [D-01] [Issue] -- [Estimated effort]   ← keep the panel-prefixed ID

### P1 -- Critical (fix in next sprint)
### P2 -- Important (upcoming release)
### P3 -- Enhancements / Dormant decisions / Debug-only (backlog)

---

## Exit Criteria

- **Submit now**: Overall ≥ 8.5/10 AND zero P0 findings AND Compliance Risk Level ∈ {LOW, MEDIUM}.
- **Iterate**: Overall < 8.5 OR any P0 OR Compliance Risk ∈ {HIGH, REJECTION LIKELY}. Run the action plan and re-review once P0/P1 are closed.

---

## Appendix: Files Reviewed
[All files examined across all panels]
```

## Apple Documentation Verification

**RECOMMENDED for Design and Engineering panels:**

When evaluating HIG compliance, SwiftUI patterns, SwiftData usage, or any Apple framework API:

1. **Use Context7 MCP FIRST** (if installed) for live API documentation — Query for official Apple framework docs when encountering unfamiliar APIs or verifying signatures. Context7 has the latest documentation and prevents hallucinations.
2. Use `Grep` to verify actual API usage patterns in the codebase.
3. Cross-reference Context7 findings with `ios26-api-reference` skill for crash prevention rules.
4. When Context7 is unavailable and you're uncertain about an API, flag it as "unverified" rather than asserting correctness.
5. For HIG compliance specifically, check against concrete patterns:
   - Navigation: are NavigationStack/NavigationSplitView used correctly?
   - Sheets: presentation detents, drag indicators, corner radius
   - Alerts: proper use of role: .destructive, confirmation dialogs
   - Accessibility: actual accessibilityLabel/Hint/Value counts
6. Do NOT hallucinate Apple guidelines. If you're unsure about a specific guideline number, omit the number and describe the requirement instead.

### Context7 Query Guidelines for Review Panels

**Engineering Panel:**
- Query Context7 for any API you haven't seen before
- Verify SwiftData predicate syntax, SwiftUI modifier chains, FoundationModels APIs
- Cross-check: Context7 for signature, ios26-api-reference for crash prevention

**Design Panel:**
- Query Context7 for HIG-specific guidance on new iOS 26 features
- Verify Liquid Glass (`glassEffect`) usage patterns
- Check accessibility API requirements for new components

**Compliance Panel:**
- Query Context7 for App Store Review Guidelines updates
- Verify privacy manifest requirements for specific frameworks
- Check entitlement documentation for protected APIs

## Execution Notes

- Each panel agent MUST produce structured output — this is non-negotiable
- The `apple-dev-skills:code-reviewer` agent type is used for Design/Compliance/Keynote because it
  emphasizes analysis and structured output over exploration
- The `apple-dev-skills:auditor` agent type is used for Engineering because it
  excels at deep codebase analysis with structured findings. If `apple-dev-skills:auditor` is
  not available in the current environment, fall back to `apple-dev-skills:architect` (preferred)
  or `apple-dev-skills:code-reviewer`, and note the substitution in the report.
- If a panel agent returns without structured output, the main thread should note
  this in the report and fill in from its own reading
- Include the file manifest in each agent's prompt — this saves 3-5 tool calls per agent
- If the app has a Watch target, include it in Design and Engineering reviews
- If the app has Widgets, include them in all panels
- Total runtime: **10-20 minutes** for 4 parallel panels (longer with screenshot
  capture or operational signal collection; shorter in focused single-panel runs)

## Relationship to Other Skills

| Skill | Scope | Depth | When |
|-------|-------|-------|------|
| `apple-review` | Entire app | Deep, multi-panel | Major milestones, pre-submission |
| `ios-standards/review-checklist.md` | Recent code changes | Systematic checklist | Code review |
| `apple-patterns-check` | Code patterns only | Pattern matching with grep | Before commits |

<!-- REFERENCE: apple-review/references/panel-compliance.md -->

# Panel 3: Compliance Review — Subagent Prompt

**Persona:** Think like the App Store Review team combined with Apple's legal/privacy compliance group. Find everything that could cause a rejection, delay, or removal.

**Dispatch:** Spawn as a subagent (`subagent_type: "apple-dev-skills:code-reviewer"`). Paste the file manifest from the Pre-Work Phase into the `[PASTE FILE MANIFEST HERE]` placeholder, then send the prompt below verbatim.

```
You are conducting an App Store compliance review of [app name]. You MUST produce
a structured review with risk level, specific guideline references, and file:line
references for every finding.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy (STRICT — read only these files)
1. MUST READ: project.yml, Info.plist (all targets), all .entitlements files,
   PrivacyInfo.xcprivacy, App entry point (.swift)
2. MUST READ: Settings/preferences view (check for Privacy Policy link)
3. MUST GREP: Services directory for protected API usage patterns
4. MUST GREP: All views for placeholder content markers
5. SKIP: ViewModels, DesignSystem, Extensions, Tests, Utilities

You should read ~10-12 files maximum. This is a compliance check, not a code review.

## Evaluation Criteria

### 3.1 App Store Review Guidelines
- **4.0 Design:** Sufficient value? Not a "thin" app?
- **2.1 Performance:** App completeness — no placeholder content, dead links
- **2.3 Accurate Metadata:** Screenshots match actual UI? Description accurate?
- **3.1 Payments:** No links to external purchase mechanisms
- **4.2 Minimum Functionality:** Does the app do enough to justify existence?

### 3.2 Privacy & Data
- Privacy manifest (`PrivacyInfo.xcprivacy`): present and complete?
- Required reason APIs: all used APIs declared with valid reasons?
- Usage descriptions: Camera, Microphone, Speech, Location, Health, Reminders, etc.
  - Specific and honest? (Vague = rejection)
  - Present for every capability actually used in code?
  - Cross-check: grep for framework imports, then verify matching usage descriptions
- Data collection: App Privacy label matches actual behavior?
- Tracking: ATT prompt if any tracking occurs?

### 3.3 Entitlements & Capabilities
- Cross-check: for each entitlement in .entitlements, verify the corresponding
  framework is imported AND the API is called in code
- For each protected API usage in code, verify the entitlement and usage description exist
- Entitlements declared but not used? (reviewers flag this)
- App Groups: consistent identifiers across all targets?

### 3.4 Binary & Build
- No private API usage
- Minimum deployment target: is it reasonable? Does it exclude too many devices?
- App icon: CFBundleIconName referenced, verify asset catalog exists
- Launch screen: present and not misleading?
- Export compliance: ITSAppUsesNonExemptEncryption declared?

### 3.5 App Intents Compliance
- Intent descriptions don't contain prohibited words ("Apple", "iPhone", "iPad", "Siri")
- No `suggestedInvocationPhrase` on plain AppIntent structs (must be on AppShortcutsProvider)
- All App Shortcut phrases include `\(.applicationName)`
- Intents referenced in AppShortcutsProvider are in the main app target (not frameworks)

### 3.6 Content & Legal
- Terms of Service / Privacy Policy: linked IN THE APP (not just on website)?
- No placeholder "Lorem ipsum" or "TODO" content in views
- No references to competing platforms
- EULA if needed?
- Copyright notice present?

### 3.6 In-App Purchase (if applicable)
- Restore purchases implemented?
- Subscription management accessible?
- Clear pricing display before purchase?

### Mechanical Audits (run these grep checks)
- `grep -rn "fatalError\|preconditionFailure" --include="*.swift"` — production crashes
- `grep -rn "TODO\|FIXME\|HACK\|XXX" --include="*.swift"` — unfinished work markers
- `grep -rn "placeholder\|lorem\|test.*data\|sample.*text" --include="*.swift" -i` in views
- Verify NSCameraUsageDescription, NSMicrophoneUsageDescription,
  NSSpeechRecognitionUsageDescription, NSLocalNetworkUsageDescription,
  NSBluetoothAlwaysUsageDescription exist in Info.plist for each API used
- Check for privacy policy URL in code (grep for "privacy")
- `grep -rn "IntentDescription.*Apple\|IntentDescription.*iPhone\|IntentDescription.*iPad" --include="*.swift"` — App Intent trademark violations (error 90626)

## Findings Target
Quality gate: produce findings within the upper bounds shown in the output
format below (e.g. "0–3 Rejection Risks"). Do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Compliance Review: [App Name]

### Submission Readiness
[2-3 sentences: would this pass App Review today?]

### Risk Level: [LOW / MEDIUM / HIGH / REJECTION LIKELY]

### Entitlement Cross-Check
| Entitlement/API | In Entitlements? | Usage Description? | Actually Used in Code? | Status |
|-----------------|------------------|--------------------|-----------------------|--------|
| Camera | ... | ... | ... | OK/MISSING/UNUSED |
| ... | ... | ... | ... | ... |

### Rejection Risks (0–3, will likely cause rejection)
- [ID: C-01] [Guideline #] [Description] — [file:line] — [Required fix]

### Warnings (0–4, may cause rejection depending on reviewer)
- [ID: C-10] [Guideline #] [Description] — [Recommendation]

### Best Practices (0–4, not rejection risks, but recommended)
- [ID: C-20] [Description] — [Why it matters]

### Checklist
- [ ] Privacy manifest complete
- [ ] All usage descriptions present and specific
- [ ] Entitlements match code usage
- [ ] No placeholder content
- [ ] App icon complete
- [ ] Privacy policy linked IN APP
- [ ] Export compliance declared
- [ ] No fatalError in production paths
- [ ] No TODO/FIXME in user-visible code

### References
- [Specific App Store Review Guideline URLs consulted]
- [Privacy manifest or entitlement docs consulted]

## CRITICAL: You MUST produce the structured review above before your response
ends. This is a focused compliance check — read only the files listed above,
run the greps, and write your review. Do NOT explore the codebase broadly.
```

<!-- REFERENCE: apple-review/references/panel-design.md -->

# Panel 1: Design Review — Subagent Prompt

**Persona:** Think like Apple's most design-obsessed leader reviewing a product before launch. Every pixel, every transition, every moment of friction matters. The question isn't "does it work?" but "does it feel inevitable?"

**Dispatch:** Spawn as a subagent (`subagent_type: "apple-dev-skills:code-reviewer"`). Paste the file manifest from the Pre-Work Phase into the `[PASTE FILE MANIFEST HERE]` placeholder, then send the prompt below verbatim.

```
You are conducting a design review of [app name] with the critical eye of Apple's
best product designers. You MUST produce a structured review with scores and
specific file:line references.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy
Read files in this priority order. Stop after 15-20 files and write your review.
1. MUST READ (core flow): App entry point, Home/main view, onboarding, primary
   editor, live/session view, settings, ALL design system files, ALL ViewModels
2. SHOULD READ (if context allows): Components/, Controls/, edge case views
3. SKIP: Services, Models, Tests, Extensions, Utilities

An incomplete review based on 15 files is infinitely more valuable than reading
40 files and producing no output.

## Evaluation Criteria

### 1.1 First Impressions & Onboarding
- What does the user see on first launch? Welcoming or overwhelming?
- Is there onboarding? Is it skippable? Does it respect the user's time?
- How quickly can a new user accomplish the app's core action?
- Time-to-value: taps from launch to first meaningful interaction?

### 1.2 Core Flow & Navigation
- Map the primary user journey (the thing people open the app to do)
- Count taps/gestures required for the most common actions
- Dead ends? Confusing back-navigation? Orphaned screens?
- Does navigation feel spatial and predictable (iOS stack/tab patterns)?
- Clear information hierarchy on each screen?

### 1.3 Visual Craft & Polish
- Typography: consistent scale? Orphaned styles (hardcoded fonts instead of tokens)?
- Color: cohesive palette? Semantic colors used correctly? Hardcoded hex instead of tokens?
- Spacing: consistent system? Cramped or floating elements?
- Icons: consistent SF Symbol weight and optical alignment?
- Dark mode: intentional or just inverted?
- Dynamic Type: graceful adaptation at all text sizes?
- Are design tokens from the DesignSystem actually used consistently, or do views
  hardcode their own values?

### 1.4 Motion & Feedback
- Are transitions meaningful or gratuitous?
- Do interactive elements provide immediate haptic/visual feedback?
- Loading states handled gracefully (skeleton views, not spinners)?
- Does the app feel responsive — do taps register instantly?
- Micro-interactions that reward the user?

### 1.5 Delight & WOW Factor
- Is there at least one moment that makes a user want to show someone?
- Does the app have personality without being gimmicky?
- Thoughtful details that reveal themselves over time?
- Does the completion/success state feel rewarding?
- Would someone pause and think "someone really cared about this"?

### 1.6 Simplicity & Focus
- Can you explain what the app does in one sentence?
- Is every screen earning its place? Could any be merged or removed?
- Minimal, well-defaulted settings — or option overload?
- Does the app resist feature creep? Is the scope disciplined?

### 1.7 HIG Compliance (verify against Apple docs)
- Standard iOS patterns: navigation bars, tab bars, sheets, alerts
- System integration: widgets, Shortcuts, Live Activities, Share Sheet
- Accessibility: VoiceOver labels, Dynamic Type, sufficient contrast
- Platform conventions: swipe-to-delete, pull-to-refresh where expected
- Latest platform capabilities leveraged (Liquid Glass on iOS 26, etc.)?
IMPORTANT: When evaluating HIG compliance, do NOT rely on training data alone.
Use Grep to check actual usage patterns: count accessibilityLabel occurrences,
check for hardcoded font sizes vs Dynamic Type, verify contrast ratios.

### 1.8 Edge Cases & Empty States
- No data? Is the empty state helpful or sad?
- Permissions denied? Is there a recovery flow?
- Extremely long text input?
- User interrupts a flow midway?

### Mechanical Audits (run these grep checks)
- Count `accessibilityLabel` / `accessibilityHint` vs total interactive views
  (ratio < 0.5 = poor VoiceOver coverage)
- Grep for hardcoded strings that are developer-facing: "JSON", "API", "debug",
  "nil", "TODO", "FIXME", "Lorem", "placeholder"
- Grep for `.lineLimit(1)` on important content (potential truncation)
- Grep for hardcoded Color values (hex literals) outside the DesignSystem files

## Findings Target
Produce the structure below. Each finding MUST have a file:line reference.
Quality gate: produce 0–5 findings per bucket — do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed at this depth of review."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Design Review: [App Name]

### Overall Impression
[2-3 sentences: gut reaction as a design leader]

### Scores (1-10)
| Dimension | Score | Notes |
|-----------|-------|-------|
| First Impression | X | ... |
| Core Flow | X | ... |
| Visual Craft | X | ... |
| Motion & Feedback | X | ... |
| Delight Factor | X | ... |
| Simplicity | X | ... |
| HIG Compliance | X | ... |
| Edge Cases | X | ... |
| **Overall** | **X** | ... |

### Mechanical Audit Results
- VoiceOver coverage: X labels across Y files (ratio: Z)
- Developer-facing strings found: [list]
- Hardcoded colors outside DesignSystem: [count]
- Truncation risks (.lineLimit on important content): [count]

### Delights (what's already great)
- [specific praise with file:line]

### Critical Issues (fix before shipping)
- [ID: D-01] [Description] — [file:line] — Presentation: `[shipped @ file:line]` | `[wired-behind-flag @ file:line]` | `[debug-only @ file:line]` | `[dormant]` — [Recommended fix]
  (if `[dormant]` or `[debug-only]`, reframe finding accordingly and do NOT claim runtime UX impact for shipped users)

### Enhancements (would elevate the experience)
- [ID: D-10] [Description] — [Recommended approach]

### Missing Elements (gaps in the experience)
- [ID: D-20] [Description] — [Why it matters]

### References
- [Apple doc URL or Context7 query that verified a guideline]
- [If a guideline cited is from training data and unverified, flag here]

## CRITICAL: You MUST produce the structured review above before your response
ends. Do NOT spend more than 60% of your work on reading files. After reading
the MUST READ files, STOP reading and write your review. An incomplete review
with structured output is infinitely more valuable than a complete file read
with no review.
```

<!-- REFERENCE: apple-review/references/panel-engineering.md -->

# Panel 2: Engineering Review — Subagent Prompt

**Persona:** Think like Apple's senior engineering leads reviewing a codebase for architectural soundness, performance, maintainability, and adherence to platform best practices. The question is "would we be proud to ship this?"

**Dispatch:** Spawn as a subagent (`subagent_type: "apple-dev-skills:auditor"`). Paste the file manifest from the Pre-Work Phase into the `[PASTE FILE MANIFEST HERE]` placeholder, then send the prompt below verbatim.

```
You are conducting an engineering review of [app name] as a senior Apple
engineering lead. You MUST produce a structured review with scores and specific
file:line references.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy
Read systematically by layer. Prioritize:
1. MUST READ: All ViewModels, all Models, project.yml, App entry point,
   migration files, design system
2. MUST READ: Core services (the 5-8 most important by line count)
3. SHOULD READ: Remaining services, extensions, utilities
4. SCAN: Test files (read names and structure, deep-read 2-3 representative tests)

## Evaluation Criteria

### 2.1 Architecture & Structure
- Is MVVM cleanly separated? Do Views contain business logic?
- Are ViewModels testable in isolation?
- Is the service layer properly abstracted?
- Is shared/package code well-factored vs app-specific code?
- Dependencies flowing in the right direction?
- God objects? (Any file > 500 lines should be scrutinized)

### 2.2 Swift 6 & Concurrency
- Strict concurrency compliance (`SWIFT_STRICT_CONCURRENCY: complete`)
- `@MainActor` isolation patterns — check project.yml for SWIFT_DEFAULT_ACTOR_ISOLATION
- `@preconcurrency import` ONLY where the compiler specifically demands it on a single import. iOS 26 frameworks (EventKit, HealthKit, AVFoundation, VideoToolbox, SwiftData, ActivityKit, Speech, Vision, CoreLocation, CoreData, MultipeerConnectivity) ship with Sendable annotations. Prophylactic use masks real concurrency issues.
- No `@Model` objects crossing async boundaries — extract scalars before Tasks
- `nonisolated deinit` on all `@MainActor` classes with cleanup (Apple-confirmed crash)
- `Task { @MainActor [weak self] in }` — child Tasks do NOT inherit actor isolation
- No `MainActor.assumeIsolated` from delegate callbacks on background queues
- No hardcoded `isAvailable = true` for FoundationModels
- Sheet `onDismiss` + `withCheckedContinuation` double-resume race check
- Task cancellation handling
- Actor isolation boundaries
- `nonisolated(unsafe)` usage — each one is a potential data race, verify safety

### 2.3 SwiftData & Persistence
- Model design: relationships correct? Cascade rules?
- **All `@Model` stored properties have default values** (missing = runtime crash)
- Migration strategy: VersionedSchema + SchemaMigrationPlan
- CloudKit safety: no renames, no relationship type changes
- Query efficiency: are fetches well-scoped?
- No `@Model` objects passed into `AsyncStream` closures or bare `Task` blocks

### 2.4 SwiftUI Patterns
- State management: `@Observable` vs `@State` vs `@Environment`
- View composition: are views small and focused?
- Performance: expensive computations in body?
- Preview coverage: every view has `#Preview`?
- Design tokens used (no hardcoded colors/fonts in views)

### 2.5 Performance & Resources
- Memory: retain cycles? Proper `[weak self]` in closures?
- Launch time: work deferred appropriately?
- Background tasks: well-behaved?
- Timer patterns: RunLoop.common on iOS, Task.sleep on watchOS
- Synchronous work on MainActor that should be async

### 2.6 Error Handling & Resilience
- Errors handled gracefully at every boundary?
- Data-loss scenarios: alerts, not banners
- Crash safety: force unwraps, fatalError in production paths
- State recovery: can the app recover from any interrupted state?
- Silent data loss (e.g., `try?` swallowing decode failures)

### 2.7 AI-Generated Code Audit
- Hallucinated APIs: check any unusual API usage actually exists
- Hardcoded availability: `isAvailable = true` instead of runtime checks
- Duplicate type definitions across files
- Dead code: services never instantiated, @Tool definitions never registered
- Design token drift: spacing/color values defined in multiple places

### 2.8 Testing
- Critical paths tested?
- Tests validate behavior, not implementation?
- No shared state between tests?
- Are the MOST important classes tested? (ViewModels especially)

### Mechanical Audits (run these grep checks)
- `grep -rn "fatalError\|preconditionFailure" --include="*.swift"` outside #if DEBUG
- `grep -rn "try!" --include="*.swift"` outside #Preview
- `grep -rn "as!" --include="*.swift"` (force casts)
- `grep -rn "nonisolated(unsafe)" --include="*.swift"` (data race risks)
- `grep -rn "@unchecked Sendable" --include="*.swift"`
- `grep -rn "import Combine" --include="*.swift"` then check if Combine is actually used
- Files with zero references elsewhere (dead code candidates)
- Duplicate function/extension definitions across files

## Findings Target
Quality gate: produce 0–8 findings per bucket — do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed at this depth of review."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Engineering Review: [App Name]

### Architecture Assessment
[2-3 sentences: overall architectural health]

### Scores (1-10)
| Dimension | Score | Notes |
|-----------|-------|-------|
| Architecture | X | ... |
| Swift 6 Compliance | X | ... |
| SwiftData Usage | X | ... |
| SwiftUI Patterns | X | ... |
| Performance | X | ... |
| Error Handling | X | ... |
| Test Coverage | X | ... |
| **Overall** | **X** | ... |

### Mechanical Audit Results
- fatalError/preconditionFailure in production: [count, locations]
- Force try (try!): [count, locations]
- Force cast (as!): [count, locations]
- nonisolated(unsafe): [count, locations — verify each is safe]
- @unchecked Sendable: [count]
- Dead Combine imports: [count]
- Duplicate definitions: [list]

### Strengths
- [specific praise with file:line]

### Critical Issues (bugs or crash risks)
- [ID: E-01] [Description] — [file:line] — Presentation: `[shipped @ file:line]` | `[wired-behind-flag @ file:line]` | `[debug-only @ file:line]` | `[dormant]` — [Fix]
  (if `[dormant]` or `[debug-only]`, the bug has no runtime user impact in shipped builds — downgrade priority and reframe as "dead/staged code" decision, unless it leaks symbols/secrets into Release)

### Improvements (code quality / maintainability)
- [ID: E-10] [Description] — [file:line] — [Approach]

### Tech Debt
- [ID: E-20] [Description] — [Impact if not addressed]

### References
- [Apple doc URL or Context7 query that verified an API signature]
- [ios26-api-reference / ios26-api-bible entries consulted]

## CRITICAL: You MUST produce the structured review above before your response
ends. Do NOT spend more than 60% of your work on reading files. After reading
the priority files, STOP and write your review.
```

<!-- REFERENCE: apple-review/references/panel-keynote.md -->

# Panel 4: Keynote Review — Subagent Prompt

**Persona:** Think like Steve Jobs preparing for a WWDC keynote. He's about to walk on stage and demo this app to the world. He doesn't care about architecture or test coverage — he cares about the *story*. Can he hold up this app and make the audience gasp? Can he explain what it does in one sentence that makes people lean forward? If there's a single moment of confusion, hesitation, or ugliness during the live demo, the whole thing falls apart.

**Dispatch:** Spawn as a subagent (`subagent_type: "apple-dev-skills:code-reviewer"`). Paste the file manifest from the Pre-Work Phase into the `[PASTE FILE MANIFEST HERE]` placeholder, then send the prompt below verbatim.

```
You are Steve Jobs reviewing [app name] the night before a WWDC keynote. Tomorrow
you walk on stage and demo this app live. You MUST produce a structured review
with a demo script, scores, and specific file:line references.

## File Manifest
[PASTE FILE MANIFEST HERE]

## Reading Strategy (follow this order, stop after ~15 files)
1. MUST READ: README (if exists), App entry point, Onboarding view, Home/main view
2. MUST READ: Primary editor view, Live session view (the demo flow)
3. MUST READ: Design system files (visual language)
4. SHOULD READ: Key components that appear during the demo flow
5. SKIP: Services, Models, Tests, Extensions, Utilities, migration files

Experience the app as a NARRATIVE, not a feature list. You are reading the
script of a demo, not auditing code.

## Evaluation Criteria

### 4.1 The One-Sentence Story
- Explain the app in a single sentence a non-technical person would immediately want
- Is there a clear "hero problem" the app solves? Not three — one
- Does the app's name reinforce the story? Does the icon?
- Would a first-time user understand the value within 5 seconds of opening it?

### 4.2 The Demo Script
- Map the ideal 90-second live demo: what do you show first? The build? The payoff?
- Is the primary flow demo-safe? (No network deps, no loading spinners mid-demo)
- Any states that could embarrass on stage? (Empty lists, error dialogs, slow transitions)
- Can the demo flow be completed with zero hesitation or explanation?
- Does the UI read clearly at projection scale (large text, clear contrast)?

### 4.3 The "One More Thing" Moment
- Is there a feature so thoughtful it earns a dramatic reveal?
  Examples: a background interaction that Just Works, Watch companion, a Live
  Activity that tells a story on the lock screen, AI intelligence that suggests
  the next action
- If there's no "one more thing," what *could* be?
- Is there a moment where the technology disappears and only the human benefit remains?

### 4.4 Narrative Coherence
- Does every screen tell part of the same story, or do some feel bolted-on?
- Clear emotional arc? (Problem -> Solution -> Celebration)
- Consistent personality? (Voice, tone, visual language)
- What would a journalist's headline be after a hands-on review?

### 4.5 Platform Story
- Does this app showcase what makes Apple's platform special?
- System capabilities used in ways that feel native and earned, not checkbox features?
- Watch integration: natural extension, not a shrunken iPhone?
- Widgets/Live Activities: glanceable story on their own?
- Does the app feel like it *belongs* here — couldn't exist anywhere else?

### 4.6 The Cringe Test
Walk through every screen in the demo flow and ask: "Would I be embarrassed
showing this on stage?"
- Placeholder content, unfinished corners, inconsistent styling
- Awkward copy, confusing iconography, developer-facing language
- Anything requiring explanation ("you have to long-press to...") is a fail

### Mechanical Audits (grep checks)
- Grep for developer-facing language in views: "JSON", "API", "debug", "nil",
  "config", "TODO", "test" (case insensitive, in user-visible strings)
- Check if onboarding uses placeholder art (SF Symbols as illustrations)
- Check for empty states that would appear during a demo

## Findings Target
Quality gate: produce 0–5 findings per bucket — do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed at this depth of review."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Keynote Review: [App Name]

### The Story
[Write the one-sentence pitch as Steve would say it on stage]

### Demo Readiness: [READY / ALMOST / NOT READY]

### The 90-Second Demo Script
1. [Opening shot — what the audience sees first]
2. [The problem moment — show the pain point]
3. [The solution — core action in real-time]
4. [The payoff — result that earns applause]
5. [The "one more thing" — if it exists]

### Scores (1-10)
| Dimension | Score | Notes |
|-----------|-------|-------|
| Story Clarity | X | ... |
| Demo Safety | X | ... |
| "One More Thing" Potential | X | ... |
| Narrative Coherence | X | ... |
| Platform Story | X | ... |
| Cringe-Free | X | ... |
| **Overall** | **X** | ... |

### Applause Moments (what earns the gasp)
- [specific moment with file:line context]

### Cringe Moments (what kills the demo)
- [ID: K-01] [Description] — [file:line] — Presentation: `[shipped @ file:line]` | `[wired-behind-flag @ file:line]` | `[debug-only @ file:line]` | `[dormant]` — [Why it fails] — [Fix]
  (debug-only and dormant views won't appear in a live demo — remove from "kills the demo" list and put under "demo gap: unshipped feature" instead)

### Missing "One More Thing" Candidates
- [ID: K-10] [Feature idea] — [Why it would wow] — [Estimated effort: S/M/L]

### References
- [WWDC sessions or Apple narrative patterns consulted]

## CRITICAL: You MUST produce the structured review above before your response
ends. Do NOT spend more than 60% of your work on reading files. You are writing
a demo script and critique, not auditing code. After reading the demo flow files,
STOP and write your review.
```

<!-- END SKILL: apple-review -->

---

<!-- BEGIN SKILL: asc-aso -->

# asc-aso

# App Store Optimization (ASO)

**Maximize organic discoverability and conversion on the App Store.** Submission mechanics live in `asc-submission`; pricing lives in `app-store-pricing`. This skill is about being *found* and *chosen*.

ASO has two halves:
1. **Discoverability** — ranking for the searches your users actually type (driven by the indexed text fields).
2. **Conversion** — turning a product-page visit into an install (driven by the visual/first-impression assets).

---

## The Indexed Fields (what Apple searches)

Apple builds its keyword index from the **union** of these fields. Order and weighting matter.

| Field | Limit | Indexed? | Weight | Notes |
|-------|-------|:--------:|--------|-------|
| **App name / title** | 30 chars | ✅ | Highest | Brand + 1–2 strongest keywords |
| **Subtitle** | 30 chars | ✅ | High | Second-strongest keywords; visible under the name |
| **Keyword field** | 100 chars | ✅ | Medium | Comma-separated, **no spaces**, hidden from users |
| **In-app purchase name/desc** | 30/45 chars | ✅ (light) | Low | IAP display names are lightly indexed |
| **Developer name** | — | ✅ | Low | — |
| Description | 4000 chars | ❌ | None (iOS) | **Not indexed** on Apple — write for humans/conversion |
| Promotional text | 170 chars | ❌ | None | Editable without review; not indexed |

> **Apple ≠ Google Play.** On the App Store the long description is **not** indexed. Don't keyword-stuff it. (Google Play *does* index the description — keep that distinction if you ship both.)

### The golden rules of the keyword field

- **Never repeat a word** across title, subtitle, and keyword field — Apple indexes the union, so repetition wastes characters. Each keyword appears **once**, in exactly one field.
- **No spaces after commas:** `focus,timer,pomodoro` not `focus, timer, pomodoro` (spaces burn characters).
- **No plurals if you have the singular** — Apple matches stems reasonably; spend characters on distinct terms.
- **Don't include your app name or category name** — those are already indexed.
- **Don't use competitor trademarks** — rejection / legal risk.
- **Singular words combine** — `time`,`management` lets you rank for "time management" without spending on the phrase. Apple auto-combines indexed words into phrases.

---

## Keyword Research Workflow

1. **Seed list** — brainstorm what a *non-user* would type to find the app's job-to-be-done (not your feature names). Think intents: "track water", "split bills", "white noise".
2. **Expand** — for each seed, gather synonyms, related jobs, and long-tail variants.
3. **Score each candidate** on three axes:
   - **Relevance** — does the app genuinely satisfy this search? (Irrelevant keywords tank conversion and ranking.)
   - **Volume** — how many people search it? (High volume = more traffic if you rank.)
   - **Difficulty** — how entrenched are the top results? (New apps win on *low-difficulty, high-relevance* long-tail first.)
4. **Allocate** — strongest term → title, next → subtitle, the rest → keyword field by descending value until 100 chars are full.
5. **Localize** — repeat per locale (see below). This is where most apps leave the most traffic on the table.

> New apps: **win the long tail first.** Don't fight "fitness" on day one. Rank #1 for "interval timer for boxing", accrue ratings + conversion velocity, then climb to broader terms.

---

## Localization = free traffic

Each **localization** is a separate keyword index. You can add keywords in other locales' fields even when the app UI is English, and you inherit traffic from locales that share a base.

- **English has two storefront locales** — **en-US** and **en-GB (English UK)**. en-GB is indexed for many non-US English-speaking storefronts. Filling en-GB keywords **doubles** your English keyword budget for free.
- Localize at least: en-US, en-GB, and your top revenue locales' languages.
- Localize **screenshots and subtitle**, not just keywords — conversion is locale-sensitive.

---

## Conversion-Rate Optimization (the product page)

Ranking gets the visit; these convert it. Order by impact:

1. **First 1–3 screenshots** — visible without scrolling. Lead with the #1 benefit as a captioned hero shot, not a bare UI screenshot. Use text overlays describing the *value*, not the feature name.
2. **App icon** — the single most-tested asset. High contrast, recognizable at 1× thumbnail size. (See `app-brand-identity` for icon craft.)
3. **App preview video** — autoplay (muted) at the top; first 3 seconds decide. Show the app *in use*, not a logo splash.
4. **Title + subtitle** — double duty: indexed *and* the first thing read. Make the subtitle a benefit, not a keyword dump.
5. **Ratings & reviews** — volume and recency feed both ranking and trust. Prompt for ratings with `SKStoreReviewController`/`requestReview` at a moment of delight (see `storekit-purchases` for the modern API).
6. **Promotional text** (170 chars) — editable without a review submission; use it for timely hooks (events, seasonal, "now with …").

### Levers you can pull *without* an app update

- **Promotional text** and **in-app events** — edit anytime.
- **Custom Product Pages (CPPs)** — up to 35 variants with different screenshots/text for different ad campaigns; each has its own URL and conversion analytics.
- **Product Page Optimization (PPO)** — Apple's native A/B test for icon/screenshots/preview (up to 3 treatments vs baseline). Run one continuously.

---

## Audit Checklist (`/aso-audit`)

When auditing an existing listing, pull current metadata via `asc-submission`'s `asc_get_metadata` / `asc_get_app_info`, then check:

- [ ] **Title** ≤ 30 chars, brand + 1 strong keyword, no wasted words.
- [ ] **Subtitle** ≤ 30 chars, benefit-driven, distinct keywords (no overlap with title).
- [ ] **Keyword field** = 100 chars used, no spaces, no repeats vs title/subtitle, no app/category name, no plurals-of-included-singulars.
- [ ] **No keyword repeated** across the three indexed fields.
- [ ] **en-GB locale** keywords filled (doubles English budget).
- [ ] **Top revenue locales** localized (keywords + subtitle + screenshots).
- [ ] **First 3 screenshots** are benefit-captioned, not bare UI.
- [ ] **App preview video** present, hooks in 3s.
- [ ] **Promotional text** used and current.
- [ ] **PPO / Custom Product Pages** in use for paid traffic.
- [ ] **Ratings prompt** wired to a delight moment, not app launch.

Report findings as: ✅ good / ⚠️ leaving value on the table / ❌ rule violation (e.g. keyword repetition, over-limit), each with the specific fix.

---

## Measuring ASO

Use App Store Connect **App Analytics**:

- **Impressions → Product Page Views → Downloads** is the funnel. ASO discoverability moves impressions; CRO moves the views→downloads ratio (the **conversion rate**).
- Segment by **Source Type**: *App Store Search* (keyword ASO), *App Store Browse* (category/featuring), *Web Referrer*, *App Referrer*.
- Watch **conversion rate** per Custom Product Page and PPO treatment to pick winners.

A 1% absolute conversion-rate gain often beats weeks of ranking work — instrument both, optimize the cheaper one first.

<!-- END SKILL: asc-aso -->

---

<!-- BEGIN SKILL: asc-build-check -->

# asc-build-check

# ASC Build Check

**Inspect CI builds, diagnose failures, and manage Developer Portal signing using the App Store Connect MCP server.**

## Workflow

### Step 1: Get Overview

Call `asc_status` to see all products and their recent build status.

If the user specified an app name, filter the output to that product.

### Step 2: Identify Failures

Look for builds where `completionStatus` is not `SUCCEEDED`. Common statuses:
- `SUCCEEDED` -- all good
- `FAILED` -- build or test failure
- `ERRORED` -- infrastructure/config issue
- `CANCELED` -- manually stopped

If all builds are green, report success and stop.

### Step 3: Drill Into Failures

For each failed build:

1. **Get build details:** Call `asc_get_build` with the build run ID to see all actions (build, test, archive, etc.) and which ones failed.

2. **Get issues:** Call `asc_get_issues` with the build run ID -- this is the fastest way to see all errors, warnings, and test failures in one call.

3. **Get test results** (if test action failed): Call `asc_get_test_results` to see which specific tests failed.

4. **Get logs** (if needed): Use `asc_get_build_logs` with the failed action ID to fetch build log artifacts. Then `asc_download_artifact` for specific log files.

### Step 3b: Diagnose Export/Signing Failures

If errors include `ExportArchiveStep` failures ("Exporting for X Distribution failed"):

1. **Parallel local analysis** — while calling `asc_check_signing`, dispatch an `apple-dev-skills:explore` agent (Fast tier: `claude-haiku-4-5` / `gpt-4.1-mini` / `gemini-3.0-flash` / `kimi-for-coding`) to read local files simultaneously:

```
You (MCP calls)                    explore agent (local files)
asc_check_signing (bundle IDs)  ←→  find all *.entitlements files
asc_list_profiles               ←→  read xcconfig for CODE_SIGN_IDENTITY
asc_list_certificates           ←→  grep for com.apple.developer.* keys
         │                                     │
         └──────────── compare ───────────────┘
```

   **Explore agent prompt:**
   ```
   Read all .entitlements files in <app-dir> and report:
   - File path → bundle ID (from app-dir name or filename)
   - All com.apple.developer.* keys present
   - App group identifiers (com.apple.security.application-groups values)
   - Any aps-environment value (push notifications)
   Return as a flat list: bundleId | entitlementKey | value
   ```

2. **Compare results:** Cross-reference the explore agent output with `asc_check_signing` to find mismatches between local entitlements and Developer Portal capabilities.

3. **Fix mismatches:** Use `asc_add_capability` to add missing capabilities directly via the API.

   ⚠️ **App Groups are the exception.** If the mismatch is an
   `application-groups` entitlement (error mentions "App Group ... is not
   associated with this app ID", or signing silently falls back to a wildcard
   profile), `asc_add_capability APP_GROUPS` only flips the capability on — it
   does **not** link the container, and **no ASC API can.** Link the container
   per bundle ID (main app + every extension) with a cookie/Apple-ID session:
   `bundle exec fastlane produce associate_group -a <bundleId> <group.id>`.
   See `ios-asc` → "App Groups: the capability toggle is NOT the container
   link" for the full procedure.

4. **Verify certificates and profiles:** The health check also reports certificate and profile status.

### Step 3c: Diagnose "uploaded fine but no build" (async processing failures)

When an upload reported success (`altool`/`upload_to_testflight` printed "Successfully uploaded") but the build never appears in TestFlight — or shows "failed" / is just absent — it almost certainly failed Apple's **asynchronous** server-side processing **after** the upload. A builds-list query that returns only valid builds will not show it, so it looks like it vanished.

Diagnose **locally**, without waiting on Apple's email:

```bash
# Newest altool upload log holds the server-side assetDeliveryState errors
ls -t ~/Library/Logs/ContentDelivery/com.apple.itunes.altool/*.txt | head -1
```

Open it and find the `assetDeliveryState` block with `"state": "FAILED"` and an `errors` array — each carries a numeric `code` and `description`. Common: **90348** (an embedded `.appex` is missing `NSExtension.NSExtensionPointIdentifier` — see `ios-build`). A consumed build number can't be reused even on failure; fix the cause and re-ship under a **new** build number. Full treatment in `asc-submission` → "Asynchronous Processing Failures".

### Step 4: Report

Present a clear summary:

```
## Build Status: [Product Name]

**Build #[number]** -- [branch] -- [status]
Started: [time] | Finished: [time]

### Failures
- [action name]: [error summary]
  - File: [path]:[line]
  - Message: [compiler/test error]

### Signing Status (if applicable)
- [bundle ID]: [OK | Missing: CAPABILITY_NAME]

### Suggested Fix
[Actionable suggestion based on the error]
```

### Step 5: Fix (if asked)

If the user asks to fix the issue:
1. **Code errors:** Locate the file, read context, apply fix, verify with a local archive build
2. **Signing errors:** Use `asc_add_capability` to fix portal mismatches, then push to trigger a new build

## Entitlements Reference

When checking signing, read entitlements files and map to capability types:

| Entitlement Key | Capability Type |
|----------------|-----------------|
| `com.apple.security.application-groups` | `APP_GROUPS` |
| `com.apple.developer.icloud-container-identifiers` | `ICLOUD` |
| `com.apple.developer.healthkit` | `HEALTHKIT` |
| `aps-environment` | `PUSH_NOTIFICATIONS` |
| `com.apple.developer.applesignin` | `APPLE_ID_AUTH` |
| `com.apple.developer.associated-domains` | `ASSOCIATED_DOMAINS` |

## MCP Tools Reference

### CI / Build Tools

| Tool | Purpose |
|------|---------|
| `asc_status` | Quick overview of all products + last 3 builds |
| `asc_list_products` | List CI products (get IDs) |
| `asc_list_workflows` | List workflows for a product |
| `asc_list_builds` | List build runs (filter by workflow/product) |
| `asc_get_build` | Build details + all actions |
| `asc_get_issues` | All errors/warnings/test failures |
| `asc_get_test_results` | Test pass/fail results |
| `asc_get_build_logs` | Log artifacts for a build action |
| `asc_download_artifact` | Download specific artifact content |
| `asc_trigger_build` | Manually re-trigger a build without a new commit |
| `asc_wait_for_build` | Block + poll until a build completes, returns issues inline |

### Developer Portal / Signing Tools

| Tool | Purpose |
|------|---------|
| `asc_list_bundle_ids` | List registered bundle IDs (filter by app name) |
| `asc_get_capabilities` | Get capabilities for a specific bundle ID |
| `asc_add_capability` | Add a capability (e.g. APP_GROUPS) to a bundle ID |
| `asc_remove_capability` | Remove a capability from a bundle ID |
| `asc_list_certificates` | List all signing certificates + expiration |
| `asc_list_profiles` | List provisioning profiles (filter by state/type) |
| `asc_check_signing` | Health check -- compare expected vs portal capabilities, check certs & profiles |
| `asc_create_certificate` | Generate CSR, submit to Apple, install in login keychain |
| `asc_revoke_certificate` | Revoke a certificate by ID |
| `asc_create_profile` | Create a provisioning profile for a bundle ID + certificate |
| `asc_delete_profile` | Delete a provisioning profile by ID |
| `asc_setup_signing` | One-shot: create dist cert + all App Store profiles for given bundle IDs |

<!-- END SKILL: asc-build-check -->

---

<!-- BEGIN SKILL: asc-submission -->

# asc-submission

# ASC Submission

**Prepare apps for App Store review or TestFlight distribution using the App Store Connect MCP server.**

## Workflows

### Workflow A: Full Submission Readiness Check

When the user asks to prepare or check submission readiness, run steps 1–2 sequentially then dispatch parallel validation.

1. **Get app ID:** Call `asc_list_apps` and find the app by name/bundle ID.

2. **Check version exists:** Call `asc_list_versions` to find a version in PREPARE_FOR_SUBMISSION state. If none exists, create one with `asc_create_version`.

3. **Parallel validation** — dispatch two agents simultaneously:

```
Coordinator (you)
├─► Agent A — Signing + Readiness check   [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
└─► Agent B — Local entitlements scan     [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
         │
         ▼ (both complete)
Coordinator — aggregate results, report missing items, offer to fix
```

**Agent A prompt:**
```
Check submission readiness for app ID: <app_id>

1. Call asc_check_signing with bundle IDs: <list>
   and expected capabilities from the entitlements scan (provided by Agent B)
2. Call asc_check_submission with app ID: <app_id>

Report:
- SIGNING: OK / ISSUES (list mismatches)
- METADATA: OK / MISSING (list required fields)
- SCREENSHOTS: OK / MISSING (list devices/locales)
- OVERALL: READY / BLOCKED (list blockers)
```

**Agent B prompt:**
```
Read local entitlements files and report capabilities for each bundle ID.

1. Find all .entitlements files: find <app-dir> -name "*.entitlements"
2. For each file, extract: app group identifiers, capability keys, bundle ID
3. Return a map: { bundleId: [capability1, capability2, ...] }

This output feeds Agent A's signing check.
```

4. **Report missing items** and offer to fix them.

### Workflow B: Update Metadata

When the user asks to update metadata, what's new, or description:

1. **Get app and version:** `asc_list_apps` then `asc_list_versions` (find PREPARE_FOR_SUBMISSION version).

2. **Get current metadata:** `asc_get_metadata` with the version ID.

3. **Generate content:**
   - **What's New:** Generate from git commits since last release tag. Use `git log` to find commits, then write a user-friendly summary.
   - **Description:** Review current description and suggest updates.
   - **Keywords:** Analyze current keywords and suggest improvements.

4. **Update:** Call `asc_update_metadata` with the localization ID and new content.

### Workflow C: TestFlight Distribution

When the user wants to distribute a build to TestFlight:

1. **List builds:** Call `asc_list_tf_builds` filtered by app ID. Find the latest processed build.

2. **Set beta notes:** Call `asc_set_beta_notes` with a "What to Test" summary generated from recent commits.

3. **List beta groups:** Call `asc_list_beta_groups` to find the target group.

4. **Distribute:** Call `asc_distribute_build` to add the build to the group.

#### Workflow C-macOS: TestFlight Distribution for macOS Apps

Fastlane's `pilot distribute` and `asc_distribute_build` (MCP) often fail for macOS builds due to API path differences. Use this fallback when the standard workflow fails:

```ruby
# In Fastfile — macOS-specific distribution via Spaceship
lane :distribute_macos_build do |options|
  token = Spaceship::ConnectAPI::Token.create(
    key_id: ENV["ASC_KEY_ID"],
    issuer_id: ENV["ASC_ISSUER_ID"],
    filepath: ENV["ASC_KEY_PATH"]
  )
  Spaceship::ConnectAPI.token = token

  app = Spaceship::ConnectAPI::App.find(options[:bundle_id])
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }
  group = app.get_beta_groups.find { |g| g.name == options[:group] }

  # Set "What to Test"
  locs = build.get_beta_build_localizations
  existing = locs.find { |l| l.locale == "en-US" }
  if existing
    Spaceship::ConnectAPI.patch_beta_build_localizations(
      localization_id: existing.id,
      attributes: { whatsNew: options[:changelog] }
    )
  else
    Spaceship::ConnectAPI.post_beta_build_localizations(
      build_id: build.id,
      attributes: { locale: "en-US", whatsNew: options[:changelog] }
    )
  end

  # Add to beta group
  current = group.fetch_builds
  unless current.any? { |b| b.id == build.id }
    Spaceship::ConnectAPI.add_beta_groups_to_build(
      build_id: build.id,
      beta_group_ids: [group.id]
    )
  end
end
```

**Common macOS TestFlight failures and fixes:**

| Symptom | Cause | Fix |
|---------|-------|-----|
| `pilot list` → `betaBuildMetrics is not a valid relationship name` | fastlane bug with macOS build metadata | Use Spaceship directly; build status is still queryable via `app.get_builds` |
| `pilot distribute` → interactive platform prompt | macOS builds lack `betaBuildMetrics` relationship | Use `add_beta_groups_to_build` via Spaceship |
| `asc_set_beta_notes` → "resource does not exist" | MCP tool may use wrong API path for macOS | Use `post_beta_build_localizations` / `patch_beta_build_localizations` via Spaceship |
| Build not appearing in TestFlight after upload | macOS `.pkg` processing takes longer than `.ipa` | Poll `app.get_builds` and check `processing_state` — can take 10-30 min |

### Workflow D: Submit for Review

When the user explicitly asks to submit for review:

1. **Run readiness check** (Workflow A) first.

2. **If ready:** Confirm with the user, then call `asc_submit_for_review`.

3. **If not ready:** Report missing items and offer to fix them.

## Metadata Guidelines

### What's New Text
- Keep under 4000 characters
- Lead with the most impactful change
- Use bullet points for multiple changes
- Write for users, not developers (no technical jargon)
- Example: "New haptic feedback during focus sessions" not "feat(haptics): add UIFeedbackGenerator"

> **First App Store release has no editable "What's New."** The `whatsNew` field only exists for *updates*. On an app's very first version, a `PATCH` to `appStoreVersionLocalizations` for `whatsNew` returns **`409 STATE_ERROR` — "cannot be edited at this time"**, and the field is absent/null in `GET` responses. This is expected, not a blocker. Readiness tooling that checks "is What's New set?" will **false-positive** on a first release — treat a missing `whatsNew` on version 1.0 / the first-ever version as N/A, not as an incomplete-metadata failure. Set the description, keywords, screenshots, and promotional text instead. "What's New" becomes editable starting with the second version.

### Keywords
- Max 100 characters, comma-separated
- No spaces after commas
- Include app name variations and key features

### Description
- Lead with the core value proposition
- Structure: what it does, who it's for, key features, how it works
- Include accessibility mentions for App Store featuring consideration

## MCP Tools Reference

### App Store

| Tool | Purpose |
|------|---------|
| `asc_list_apps` | List all apps (get IDs) |
| `asc_list_versions` | List App Store versions and their states |
| `asc_create_version` | Create a new version (e.g. '1.1.0') |
| `asc_get_metadata` | Get description, keywords, what's new per locale |
| `asc_update_metadata` | Update description, keywords, what's new |
| `asc_get_app_info` | Get app name, subtitle, privacy URL |
| `asc_update_app_info` | Update app name, subtitle, privacy URL |
| `asc_list_screenshots` | List screenshots per locale and display type |
| `asc_submit_for_review` | Submit version for App Review |
| `asc_check_submission` | Readiness check -- verifies everything needed for submission |

### TestFlight

| Tool | Purpose |
|------|---------|
| `asc_list_tf_builds` | List TestFlight builds (version, state, dates) |
| `asc_list_beta_groups` | List beta groups (internal/external) |
| `asc_distribute_build` | Add a build to a beta group |
| `asc_set_beta_notes` | Set "What to Test" text for a build |

## Transporter Validation

Apple Transporter runs during CI upload to App Store Connect -- it does not run locally. Even if a local export or archive succeeds, Transporter can still reject the build during upload.

### What Transporter Validates

- **Provisioning profile validity:** Profile must be active, not expired, and match the bundle ID exactly
- **Metadata completeness:** Required fields (bundle display name, version, build number) must be present
- **Bundle ID consistency:** The bundle ID in the binary must match the provisioning profile and App Store Connect record
- **Entitlements:** Every entitlement in the binary must correspond to a real Apple capability enabled in the Developer Portal

### Common Transporter Failures

| Failure | Cause | Fix |
|---------|-------|-----|
| Missing watchOS icons | Asset catalog incomplete for Watch target | Add all required icon sizes to the Watch asset catalog |
| Invalid provisioning profile | Profile expired or revoked | Regenerate via `xc_create_profile` or Developer Portal |
| Fake entitlements | Non-existent entitlement keys in .entitlements file | Remove fabricated keys (e.g., `com.apple.developer.widgetkit` is not real) |
| Bundle ID mismatch | Binary bundle ID differs from profile | Verify `PRODUCT_BUNDLE_IDENTIFIER` matches the provisioning profile |
| Missing privacy manifest | `PrivacyInfo.xcprivacy` absent from extension target | Add privacy manifest to each target that uses required reason APIs |
| Missing `NSExtensionPointIdentifier` | App extension has no `NSExtension` dict in Info.plist (error **90348**) | Give every `.appex` an explicit base Info.plist with `NSExtension.NSExtensionPointIdentifier` — see `ios-build` → "App Extension Info.plist" |

### Debugging Transporter Rejections

Transporter errors surface in Xcode Cloud build logs after the archive step. Use `xc_get_issues` to read the full error list. Local reproduction requires `xcrun altool --validate-app` or Transporter.app, but the fastest path is fixing based on the CI error message and re-pushing.

## Asynchronous Processing Failures (upload "succeeds", build still fails)

**`xcrun altool`/`upload_to_testflight` printing "Successfully uploaded" does NOT mean the build was accepted.** altool uploads with `SkipValidateProductErrors: true`, which defers binary validation to Apple's **asynchronous server-side processing**. That processing runs minutes later and can still **FAIL** the build — at which point it **silently disappears from the TestFlight valid-builds list**. There is no error at upload time, no local build failure, and the App Store Connect builds API only returns valid builds, so the failed build is effectively invisible unless you go looking.

Symptoms (all at once):
- Upload reported success, but the build never appears in the internal beta group.
- A build number you uploaded shows "failed" in the App Store Connect UI, or is just absent.
- Re-uploading the **same** build number is rejected as a duplicate (the number is consumed even though the build failed) — you must bump to a new build number to retry.

**Common async-only failures:**

| Error | Cause | Fix |
|-------|-------|-----|
| **90348** Missing `NSExtensionPointIdentifier` | An embedded `.appex` has no `NSExtension` dict — builds and uploads fine, fails async | Add the base Info.plist key; re-ship under a **new** build number. See `ios-build`. |
| **90482**/ICON errors | Required app-icon asset missing | Complete the asset catalog; re-ship under a new build number |
| Invalid Swift support / dSYM | Stripped or mismatched symbols | Re-archive with correct `DEBUG_INFORMATION_FORMAT`; re-ship |

### Diagnose async failures locally (no email needed)

Apple emails the failure, but the same server-side errors are written **locally** by altool — you don't have to wait for or rely on email:

```bash
# altool writes per-upload logs here; the newest one holds the assetDeliveryState errors
ls -t ~/Library/Logs/ContentDelivery/com.apple.itunes.altool/*.txt | head -1
```

Open the newest file and look for an `assetDeliveryState` block with `"state": "FAILED"` and an `errors` array carrying the numeric `code` (e.g. `90348`) and human-readable `description`. This is the authoritative reason, available immediately after the upload regardless of mailbox access.

> Tooling note: a TestFlight/builds-list query that filters to valid `processingState` will not show a build that failed processing. When a build "uploaded fine but isn't there," check the ContentDelivery log first, then query the builds endpoint **without** a valid-only filter (the API exposes `processingState`, including `INVALID`/`FAILED`).

---

### Developer Portal (from asc-build-check)

| Tool | Purpose |
|------|---------|
| `asc_check_signing` | Health check -- compare entitlements vs portal capabilities |
| `asc_add_capability` | Fix missing capabilities |

<!-- END SKILL: asc-submission -->

---

<!-- BEGIN SKILL: cloudkit-sync -->

# cloudkit-sync

# CloudKit Sync (SwiftData & Core Data)

**Sync a user's data across their devices with iCloud, for free, using their private database.** This is the on-ramp to multi-device; for the local store and modeling, see `ios-standards` (SwiftData/`@Model`).

> CloudKit's private database is per-user, on the user's iCloud account. You don't run a server. The trade-off: the **schema must obey CloudKit's rules**, and sync is eventual (seconds to minutes), not instant.

---

## SwiftData + CloudKit

```swift
let config = ModelConfiguration(
    "Main",
    schema: Schema([Trip.self, Stop.self]),
    cloudKitDatabase: .automatic        // or .private("iCloud.com.you.app")
)
let container = try ModelContainer(for: Trip.self, Stop.self, configurations: config)
```

**Enable in the project:** add the **iCloud** capability → **CloudKit**, pick/create a container, and add the **Background Modes → Remote notifications** capability (CloudKit uses silent pushes to trigger sync).

### The schema rules CloudKit forces on you

These are the cause of ~90% of "it won't build / won't sync" issues:

- **Every non-optional property needs a default value**, or must be optional. CloudKit can't represent required-with-no-default.
- **No `@Attribute(.unique)`** — unique constraints aren't supported with CloudKit. Enforce uniqueness in app logic instead.
- **Relationships must be optional** and you generally need an inverse.
- **No `.deny` delete rules** that CloudKit can't model.

Violating these throws at `ModelContainer` init or silently disables sync. If a previously-local model won't sync, audit it against this list first.

---

## Core Data path

Use `NSPersistentCloudKitContainer` instead of `NSPersistentContainer`. Set the store's `cloudKitContainerOptions` and `NSPersistentStoreRemoteChangeNotificationPostOptionKey` to observe remote changes. Same schema constraints apply. Initialize the CloudKit schema during development with `initializeCloudKitSchema(options:)` (debug builds only — never ship that call).

---

## Going to production

CloudKit has **two environments: Development and Production.** Your dev schema changes do **not** reach production until you **deploy the schema** in the **CloudKit Console**.

- Deploy schema to Production **before** you ship to TestFlight/App Store, or real users get nothing.
- The schema is **additive-only in production** — you can add fields/record types, never rename or delete them. Model carefully up front.

This is the #1 launch-day CloudKit surprise: "works in Xcode, broken in the App Store build" = schema not deployed to Production.

---

## Conflicts & merging

- The default is **last-writer-wins** at the field level (CloudKit) / configurable merge policy (Core Data: set `viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy`).
- For data where lost edits matter (counters, sets), model them so concurrent edits *combine* rather than overwrite (e.g. store events and reduce, not a single mutable total).
- Sync is **eventual** — design UI to tolerate a record appearing/updating later. Never block the UI on a sync.

---

## Sharing between users (CKShare)

For collaboration (not just same-user multi-device):

- Create a `CKShare` for a record (or use SwiftData's sharing affordances) and present `UICloudSharingController` to invite participants.
- Shared records live in the **shared database**; participants need the right `CKShare.ParticipantPermission` (`.readOnly` / `.readWrite`).
- Handle the share-accept flow via the scene/app delegate `userDidAcceptCloudKitShareWith`.

---

## Debugging sync

- Add the launch argument `-com.apple.CoreData.CloudKitDebug 1` (and `-com.apple.CoreData.SQLDebug 1`) to see sync activity in the console.
- Verify the device is **signed into iCloud** and iCloud Drive is on — sync silently no-ops otherwise. Surface iCloud account status (`CKContainer.accountStatus`) in the UI.
- New devices/back-ups import in the background after first launch — give it time and a connection.
- "Works on one device, not the other" → check both are on the same iCloud account and the schema is deployed.

| Symptom | Cause | Fix |
|---------|-------|-----|
| Throws at `ModelContainer` init | Schema breaks a CloudKit rule | Make properties optional/defaulted, drop `.unique` |
| Builds, never syncs | Missing Remote notifications background mode, or signed out of iCloud | Add capability; check `accountStatus` |
| Works in Xcode, not in App Store build | Schema not deployed to Production | Deploy in CloudKit Console |
| Edits clobber each other | Last-writer-wins | Model concurrent data as combinable events |

<!-- END SKILL: cloudkit-sync -->

---

<!-- BEGIN SKILL: complete-feature -->

# complete-feature

# Feature Completion Workflow

Run this skill when you believe a feature is complete. It runs comprehensive checks across six areas.

## Usage

```
/complete-feature "focus-timer-widget"
/complete-feature "category-ai-classification"
```

## Parallel Dispatch

Phases 1–4 run as three parallel subagents to maximize speed. Dispatch all three simultaneously, then aggregate results before continuing to Phase 5.

```
Coordinator (you)
├─► Agent A — Build + Test          [Fast tier: claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash]
├─► Agent B — Code Quality          [Standard tier: claude-sonnet-4-6 / gpt-4.1 / gemini-3.1-pro]
└─► Agent C — Accessibility Audit   [Standard tier: claude-sonnet-4-6 / gpt-4.1 / gemini-3.1-pro]
         │
         ▼ (all three complete)
Coordinator — Phase 5: Documentation + Phase 6: App Store Readiness
```

### Agent A — Build + Test (Fast tier)

Spawn as `apple-dev-skills:build-agent` (or `apple-dev-skills:explore`). Prompt:

```
Run build and test verification for the iOS feature being completed.

1. Debug build (simulator):
   xcodebuild -scheme <scheme> -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' build 2>&1 | grep -E "error:|BUILD SUCCEEDED|BUILD FAILED"

2. Archive build (CRITICAL — catches MainActor isolation errors debug misses):
   xcodebuild -scheme <scheme> -configuration Release -destination 'generic/platform=iOS' archive 2>&1 | grep -E "error:|ARCHIVE SUCCEEDED|ARCHIVE FAILED"

3. Unit tests:
   <project-test-command> 2>&1 | tail -10

Report:
- BUILD: PASS/FAIL + first 3 errors if failed
- ARCHIVE: PASS/FAIL + first 3 errors if failed
- TESTS: X passed, Y failed + failing test names
```

### Agent B — Code Quality (Standard tier)

Spawn as `apple-dev-skills:code-reviewer`. Prompt:

```
Run code quality checks on the changed files for this iOS feature.

Changed files: <list from git diff --name-only HEAD>

1. Apple patterns check — apply the apple-patterns-check skill rules:
   - Force unwraps, try!, fatalError() in production code
   - print() statements not in #if DEBUG
   - Missing @preconcurrency imports for EventKit/ActivityKit/CoreData/AVFoundation/SwiftData/Speech/Vision/HealthKit
   - Task { [weak self] without @MainActor
   - Missing nonisolated deinit on @MainActor classes
   - Hardcoded isAvailable=true for FoundationModels (must use SystemLanguageModel.default.isAvailable)
   - MainActor.assumeIsolated from background queue callbacks
   - @Model properties without default values
   - Sheet onDismiss + continuation double-resume risk

2. Code cleanliness:
   - TODO:/FIXME: without issue links
   - Commented-out code blocks (>5 lines)
   - Dead code (unreachable, unused variables)

Report each issue as: [SEVERITY] File:Line — Description
Severity: CRITICAL | HIGH | MEDIUM
```

### Agent C — Accessibility Audit (Standard tier)

Spawn as `apple-dev-skills:code-reviewer`. Prompt:

```
Run accessibility audit on the SwiftUI views changed in this feature.

Changed Swift files with views: <list files containing 'View' from git diff --name-only HEAD>

Apply ios-accessibility skill rules:
1. VoiceOver: .accessibilityLabel on all interactive elements (Button, Toggle, custom controls)
2. Dynamic Type: font(.body) not hardcoded sizes; no fixed frame heights on text containers
3. Reduce Motion: withAnimation guarded by accessibilityReduceMotion where used
4. Color contrast: no color-only distinction for meaning; check against WCAG AA

Report each issue as: [SEVERITY] File:Line — Description
If no views changed, report: N/A
```

---

## Completion Checklist

### 1. Build Verification
- [ ] Debug build passes (simulator)
- [ ] Archive build passes -- CRITICAL: catches MainActor isolation errors debug misses
- [ ] No Swift 6 strict concurrency warnings
- [ ] If the app embeds any app extension (`.appex`): every one carries `NSExtension.NSExtensionPointIdentifier` -- run `verify-appex-infoplist.sh --ipa <exported.ipa>`. Missing it builds & uploads fine but fails Apple's async processing (error 90348) and silently drops from TestFlight. See `ios-build` → "App Extension Info.plist".

### 2. Test Verification
- [ ] All unit tests pass
- [ ] New code has corresponding test coverage
- [ ] UI tests pass if views changed

### 3. Code Quality

Delegate to `apple-patterns-check` for detailed pattern validation, then verify:
- [ ] No `TODO:` or `FIXME:` without issue links
- [ ] No force unwraps, `try!`, or `fatalError()` in production code
- [ ] No `print()` statements in production code

### 4. Accessibility

Delegate to `ios-accessibility` for detailed audit, then verify:
- [ ] VoiceOver labels on all interactive elements
- [ ] Dynamic Type support verified
- [ ] Reduce Motion respected
- [ ] Color contrast meets WCAG AA

### 5. Documentation
- [ ] ADR written if architectural decision made
- [ ] Project roadmap updated with completion status
- [ ] Feature plan moved to completed folder
- [ ] Project documentation updated if patterns changed

### 6. App Store Readiness (if applicable)
- [ ] App Store Connect metadata updated
- [ ] Screenshots generated if UI changed
- [ ] What's New text drafted
- [ ] Privacy manifest updated if new data collected

**Entitlements Audit** (common App Store rejection cause):
```bash
# All targets sharing data must have the SAME App Group identifier
grep -r "group\." <app-dir> --include="*.entitlements"

# Verify PrivacyInfo.xcprivacy exists for each extension target
find <app-dir> -name "PrivacyInfo.xcprivacy" -not -path "*/build/*"

# Verify no unused entitlements
grep -r "com.apple.developer" <app-dir> --include="*.entitlements"
```

## Post-Completion Actions

After all checks pass:

1. **Stage changes**: `git add -A`
2. **Commit**: Follow conventional commits (feat:, fix:, docs:, etc.)
3. **Push**: Only after all checks pass

## Example Session

```
User: /complete-feature "spark-timer"

Claude: Running feature completion workflow for "spark-timer"...

[1/6] Build Verification
  Build passed
  No Swift 6 warnings

[2/6] Test Verification
  Unit tests passed (42 tests)
  1 iOS test failing: TimerViewModelTests.testTimerState

[3/6] Code Quality
  apple-patterns-check: all passed
  No debug prints found

[4/6] Accessibility
  VoiceOver labels verified
  Dynamic Type not tested — recommend testing on device

[5/6] Documentation
  ADR: docs/adr-timer-state-management.md
  Roadmap updated
  Feature plan not yet in completed/

[6/6] App Store Readiness
  N/A — not a user-facing feature

---
Summary:
- 2 warnings to address
- 1 test to fix
- 1 documentation item to complete
```

## Integration with Other Skills

This skill coordinates with:
- `apple-patterns-check` — code pattern validation (Phase 3)
- `ios-accessibility` — VoiceOver/contrast verification (Phase 4)
- `verify-against-spec` — if the feature was spec-driven, run this first
- `merge-check` — run after completing, before merging to main

<!-- END SKILL: complete-feature -->

---

<!-- BEGIN SKILL: cross-platform-adaptivity -->

# cross-platform-adaptivity

# Cross-Platform Adaptivity

**One codebase, native everywhere — adapt to the device, don't just stretch to fit.** A blown-up iPhone UI on iPad or Vision Pro reads as lazy. Share logic; specialize presentation. Pair with `apple-design` (HIG) and `swiftui-micro-craft` (polish).

> Principle: design for **capabilities and size**, not device names. Branch on size class / horizontal space, reserve `#if os()` for genuinely platform-specific APIs.

---

## Adapt to size, not device

```swift
@Environment(\.horizontalSizeClass) private var hSize

var body: some View {
    if hSize == .compact {
        TabView { … }            // iPhone portrait, narrow windows
    } else {
        NavigationSplitView { … } // iPad, Mac, wide windows
    }
}
```

- **Compact vs regular** size classes matter more than iPhone-vs-iPad: an iPad multitasking slide-over is *compact*, and a Mac window can be resized to either. Respond to the class.
- Let layout flex with **`ViewThatFits`** (pick the first child that fits), **adaptive `Grid`** / `LazyVGrid(columns: [.adaptive(minimum:)])`, and `.frame(maxWidth:)` reading caps — not hard-coded widths.
- Avoid magic-number breakpoints; prefer the system's size classes and Dynamic Type.

---

## Adaptive navigation

| Pattern | Compact | Regular |
|---------|---------|---------|
| `NavigationStack` | Push/pop column | Push/pop column |
| **`NavigationSplitView`** | Collapses to a stack automatically | 2–3 column sidebar + content + detail |
| `TabView` | Bottom tabs | Sidebar-adaptable tabs (`.tabViewStyle`) / top on tvOS |

**`NavigationSplitView` is the workhorse** for content apps: it gives a sidebar on iPad/Mac and automatically collapses to a navigation stack on iPhone. Drive selection with state so the same model works in both layouts.

---

## Per-platform idioms (what "native" means on each)

- **iPadOS** — pointer/trackpad hover (`.hoverEffect`), keyboard shortcuts (`.keyboardShortcut`), multiple windows/scenes, drag & drop, Stage Manager resizing, sidebar. Support external keyboard and the menu bar.
- **macOS** — menu bar `CommandMenu`, `Settings` scene (⌘,), window management, `.focusable`, hover, right-click context menus, sensible min window sizes. Mac Catalyst vs native SwiftUI is a porting decision — native SwiftUI for new apps.
- **visionOS** — depth, glass materials, ornaments, `.windowStyle(.volumetric)`, immersive spaces, eye/hand input (hover is gaze — generous hit targets). Don't assume a 2D plane; respect the spatial HIG.
- **watchOS** — glanceable, short sessions, the Digital Crown, complications; build *for the wrist*, not a shrunken phone screen.
- **tvOS** — the **focus engine** drives everything; design for a 10-foot distance and the Siri Remote. Focusable, not tappable.

---

## Platform conditionals — use sparingly

```swift
#if os(iOS)
    .navigationBarTitleDisplayMode(.inline)   // doesn't exist on macOS
#endif

#if os(visionOS)
    .glassBackgroundEffect()
#endif
```

- `#if os(iOS|macOS|watchOS|tvOS|visionOS)` for compile-time API differences; `#if targetEnvironment(macCatalyst)` for Catalyst.
- Prefer **runtime** size-class/environment checks for layout (one binary adapts live as a window resizes); reserve `#if` for APIs that don't exist on a platform.
- Isolate platform code behind small wrappers / `extension`s so the shared view stays readable. Don't litter `body` with conditionals.

---

## Structure for sharing

- **One multiplatform target** (or shared SwiftUI package) for models, view models, and most views; thin platform layers for the differences. Most SwiftUI views are already portable.
- Use **`@Environment`-driven** styling so components restyle themselves per platform instead of forking.
- Gate **capabilities, not platforms**: check for the feature (camera, `UIApplication`, push) rather than assuming from `os()`.
- Keep assets/icons per platform in the asset catalog; verify each platform's icon set (see `app-brand-identity`).

---

## Pre-ship checklist

- [ ] Works in **both size classes** (resize the iPad/Mac window; try slide-over).
- [ ] Navigation collapses sensibly compact↔regular (`NavigationSplitView`).
- [ ] No hard-coded widths that break on Mac resize or iPad multitasking.
- [ ] Each shipped platform uses its idioms (menus on Mac, focus on tvOS, depth on visionOS, Crown on watch).
- [ ] `#if os()` limited to true API gaps, not layout.
- [ ] Keyboard shortcuts & pointer hover on iPad/Mac; VoiceOver/focus verified per platform (see `ios-accessibility`).
- [ ] Each platform's app icon and launch experience set correctly.

<!-- END SKILL: cross-platform-adaptivity -->

---

<!-- BEGIN SKILL: design-contract -->

# design-contract

# Design Contract

> **Purpose:** Convert a visual mockup into a tabular, section-numbered contract that a plan cites row-by-row, eliminating "compare against the mockup" drift.
> **Trigger:** A mockup exists (HTML, PNG, Figma export, detailed spec) and you are about to write the plan that builds it.

A plan that says "match the mockup" lets an executing agent hallucinate its own design — visually close, subtly wrong. The fix is a **machine-readable contract** (every color named, every string verbatim, every size mapped to real device points) plus **`#Preview`/capture gates** that make divergence a build-time failure rather than a review-time opinion.

## When to Use

- **Do use** when a brainstorm/design folder contains a visual mockup and the next step is a SwiftUI implementation plan.
- **Do use** when an existing plan references a mockup only softly ("compare against the mockup") and you want to harden it.
- **Don't use** for backend-only features, pure-text brainstorms with no visual, or one-file bug fixes.

## Command Reference

```
/design-contract <mockup-path>        # Extract contract from a mockup file
/design-contract <brainstorm-dir>     # Extract from a folder (reads every mockup in it)
```

## Workflow

### Step 1: Read the mockup in full

Read every mockup file end-to-end — do not skim. For HTML, grep `:root` for CSS custom properties and every inline `style=` for ad-hoc tokens. For PNG/Figma, enumerate frames visually.

**Gate:** you cannot proceed until you can list every distinct color, font size, spacing value, corner radius, animation, and user-facing string. If the mockup is 1000+ lines, read it in ≤400-line chunks.

### Step 2: Extract the contract

Write `<app>/docs/vision/<feature>-design-contract.md` using this section skeleton. The contract is **authoritative** — it wins over the mockup when they disagree (the mockup is a snapshot; the contract is tracked).

```
§1  — Color tokens (name, hex/rgba, token symbol, use). Every hex gets a NAME — no orphan literals.
§2  — Typography (name, font, size, weight, tracking, line-height, SwiftUI mapping)
§3  — Spacing scale (token, pt, used for)
§4  — Radii (token, pt, used for)
§5  — Shadows & glows (effect, spec, used for)
§6  — Component specs (layout, padding, radius, colors per component)
§7  — Motion (name, duration, easing, reduced-motion fallback)
§8  — Copy strings (every user-facing string, VERBATIM incl. punctuation, grouped by screen, with string ids)
§9  — Canonical frames (Frame ID, mockup anchor, SwiftUI #Preview name, state description) — 6–10 frames
§10 — Non-negotiables (hard rules: no light mode, no new screens, no count-down, etc.)
§11 — Open questions (what the mockup couldn't answer — font-metric widths, etc.)
```

**Apple-platform critical rules:**

- **Mockup px ≠ SwiftUI pt.** Mockup phones are scaled down to sit side-by-side in a browser; in-app sizes run **~1.5–1.8×** larger. §2 MUST carry a "SwiftUI mapping" column with the real device-pt value, not the mockup px. State the scale factor at the top of the contract.
- **Every hex gets a name, tied to a tokens file.** `#E8A15A` becomes `amber` in `Theme.swift` / `<App>Tokens.swift` (see `ios-design`/`apple-design`). The plan references `Theme.amber`, never the literal.
- **No copy-synonym drift.** If the mockup says `Gone.` with a period, §8 says `Gone.` with a period. The plan cites §8 by string id, never paraphrases.
- **Canonical frames are finite.** 6–10 frames is correct. More means the feature is too big for one plan — decompose.

### Step 3: Co-locate the mockup

The mockup lives canonically in the brainstorm folder. Make it openable from the code, and create the capture target:

```bash
cd <app>/docs/vision
ln -sf <relative-path-to-brainstorm>/<mockup> ./<mockup>     # symlink, stays git-committable
mkdir -p captures && touch captures/.gitkeep
```

Update `<app>/docs/vision/README.md` to link the contract, the symlinked mockup, and `captures/`.

### Step 4: Write the plan with hard gates

Every plan step cites the contract and requires preview-backed evidence. Open the plan with a **Fidelity contract** establishing four gates:

1. **Cite the contract** — every checkbox references a §section/row. No citation ⇒ the contract is incomplete; fix §1–§8 first.
2. **Previews are mandatory** — no view step is complete without a named `#Preview` rendering the §9 state verbatim.
3. **Capture proof** — a PNG of each touched §9 frame is committed to `captures/` at canonical device resolution (see `preview-capture`). On machines that cannot render previews, substitute the documented fallback (archive build as CI gate + human-rendered captures — see `preview-capture` §capability ladder).
4. **Diff justification** — any deviation from the mockup is either justified against a §section in the PR description or is a bug.

Make **Step 1 of the plan** = "encode tokens in `<App>Tokens.swift`" with a grep gate forbidding hex literals / ad-hoc paddings in view code. This front-loads the contract into the type system.

### Step 5: Commit and hand off

Single commit: `docs(<app>): extract design contract + harden <feature> verification gates`. In the body, explain *why* the gates exist (prevent drift during execution). Hand the plan to the execution skill.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| Soft-reference drift | Plan says "compare against mockup", no §citations | Require a §citation per checkbox; if one has none, §1–§8 is incomplete |
| Mockup-pt rendered as app-pt | Executor builds at the mockup's small px | §2 needs the SwiftUI-mapping column; scale 1.5–1.8× |
| Copy synonym drift | "Got it!" when mockup says "Got it" | §8 is the only source; cite by string id |
| Token leak | Hex literals reappear in view code weeks later | Plan Step 1 encodes tokens; grep gate forbids hex outside the tokens file |
| "Improvement" drift | Executor adds an unrequested glow | §10 forbids it; if the change is right, update the contract first, then code |
| Unreviewable PR | No captures; reviewer can't judge fidelity | Mergeable = every touched §9 frame has a fresh capture |

## Cross-References

- Render the captures: `preview-capture`
- Verify coverage + visual fidelity after build: `verify-against-spec` (its Visual Fidelity agent diffs `captures/` against §9)
- Tokens & Theme patterns: `apple-design` / `ios-design`
- API signatures for the views you build: `ios26-api-reference`

## Contract Maintenance

The contract is living until V1 ships, then it freezes and the mockup is archived. The contract wins over the mockup on disagreement. PRs that change a token must update the contract in the same change, or the next executor loses the reason.

<!-- END SKILL: design-contract -->

---

<!-- BEGIN SKILL: ios-accessibility -->

# ios-accessibility

Audit SwiftUI file(s) for accessibility issues and apply fixes. If no file is specified, audit all main views in the app.

## Workflow

1. Read the design system / theme file first — confirm canonical font styles and spacing tokens
2. Read each target file fully before editing
3. Apply all fixes in one pass per file
4. Summarize changes grouped by category (VoiceOver, Dynamic Type, Tap targets)
5. Flag any issues requiring runtime testing (VoiceOver navigation order, contrast in real lighting)

---

## VoiceOver Labels

- Every interactive element (button, toggle, slider, gesture area) needs `.accessibilityLabel()` describing its **purpose**, not its visual appearance
  - Bad: `.accessibilityLabel("Purple ring")` — describes appearance
  - Good: `.accessibilityLabel("Focus session progress, 18 minutes remaining")` — describes meaning
- Icon-only and image-only buttons always need explicit labels
- Decorative visuals should be silenced with `.accessibilityHidden(true)`
- Compound views: use `.accessibilityElement(children: .ignore)` on the container and compose a single label + value

### Hints and Traits

- `.accessibilityHint()` — use for non-obvious gestures: `"Double-tap to pause session"`
- `.accessibilityAddTraits(.updatesFrequently)` — live countdown text (prevents VoiceOver interrupting every second)
- `.accessibilityAddTraits(.isHeader)` — section headings in lists
- `.accessibilityAddTraits(.isButton)` — any `Text` or `ZStack` wired to `onTapGesture` instead of native `Button`
- `.accessibilityAddTraits(.isSelected)` — selected filter chips, tabs

---

## Dynamic Type

- All text must use a semantic `Font` style (`.body`, `.headline`, `.caption`, `.title2`, etc.) — never a hardcoded point size like `.font(.system(size: 48))`
- Use `@ScaledMetric` for spacing constants and icon frame sizes that need to grow proportionally:
  ```swift
  @ScaledMetric(relativeTo: .body) private var iconSize: CGFloat = 24
  ```
- Layouts must not clip at `accessibilityExtraExtraExtraLarge`. Replace fixed `.frame(width:)` on text containers with `.frame(maxWidth: .infinity, alignment: .leading)`
- Check the design system / theme file for any font definitions using fixed sizes — replace with scaled equivalents

---

## Tap Targets

- Any tappable area smaller than 44×44pt must reach that minimum via `.frame(minWidth: 44, minHeight: 44)` or padding
- Add `.contentShape(Rectangle())` so the entire padded area is hittable
- Confirm purely decorative elements aren't accidentally hittable; add `.accessibilityHidden(true)` if so

---

## Semantic Grouping

- Related elements that form one logical unit: use `.accessibilityElement(children: .ignore)` on the container with a single composed label
- Wrapper containers that add no meaning: leave default (`.accessibilityElement(children: .contain)`)
- Avoid double-announcing content that's already labeled on children

---

## Swipe Actions

SwiftUI's `.swipeActions` is automatically VoiceOver-accessible — verify the button label is descriptive:

```swift
.swipeActions(edge: .trailing, allowsFullSwipe: true) {
    Button(role: .destructive) { ... } label: {
        Label("Delete", systemImage: "trash")
    }
    .accessibilityLabel("Delete capture")
}
```

---

## Checklist

- [ ] All interactive elements have `.accessibilityLabel()`
- [ ] Decorative elements have `.accessibilityHidden(true)`
- [ ] Live-updating text has `.accessibilityAddTraits(.updatesFrequently)`
- [ ] Section headers have `.accessibilityAddTraits(.isHeader)`
- [ ] No hardcoded font sizes — all use semantic styles
- [ ] `@ScaledMetric` for icon sizes and key spacing
- [ ] All tap targets are 44×44pt minimum
- [ ] Selected states use `.accessibilityAddTraits(.isSelected)`
- [ ] Compound views grouped with single composed label

<!-- END SKILL: ios-accessibility -->

---

<!-- BEGIN SKILL: ios-asc -->

# ios-asc

# iOS App Store Connect

**Manage signing, provisioning, TestFlight distribution, and app submission using MCP tools.** These tools connect directly to Apple's App Store Connect API — no manual portal navigation required.

---

## MCP Tool Overview

### Signing Tools

| Tool | Purpose |
|------|---------|
| `xc_setup_signing` | **One-shot setup**: Create distribution cert + App Store profiles for all bundle IDs |
| `xc_check_signing` | **Health check**: Compare local entitlements vs portal capabilities, verify certs & profiles |
| `xc_create_certificate` | Generate CSR, submit to Apple, install in login keychain |
| `xc_revoke_certificate` | Revoke a certificate by ID |
| `xc_list_certificates` | List all certificates with expiration dates |

### Provisioning Tools

| Tool | Purpose |
|------|---------|
| `xc_list_bundle_ids` | List registered bundle IDs (filter by identifier substring) |
| `xc_register_bundle_id` | Register a new bundle ID in the Developer Portal |
| `xc_delete_bundle_id` | Remove a bundle ID from the portal |
| `xc_get_capabilities` | Get capabilities enabled for a bundle ID |
| `xc_add_capability` | Add a capability (e.g., APP_GROUPS) to a bundle ID |
| `xc_remove_capability` | Remove a capability from a bundle ID |
| `xc_list_profiles` | List provisioning profiles (filter by state/type) |
| `xc_create_profile` | Create a provisioning profile for bundle ID + certificate |
| `xc_delete_profile` | Delete a provisioning profile by ID |

### TestFlight Tools

| Tool | Purpose |
|------|---------|
| `xc_list_apps` | List all apps with IDs, names, bundle IDs, current versions |
| `xc_list_tf_builds` | List TestFlight builds with version, state, processing status |
| `xc_list_beta_groups` | List beta groups (internal/external) |
| `xc_create_beta_group` | Create a new TestFlight beta group |
| `xc_update_beta_group` | Update group settings (public link, feedback, etc.) |
| `xc_delete_beta_group` | Remove a beta group |
| `xc_list_beta_testers` | List testers (filter by group, app, or email) |
| `xc_invite_beta_tester` | Invite a tester by email to a group |
| `xc_remove_beta_tester` | Remove a tester from a group |
| `xc_distribute_build` | Add a build to a beta group for distribution |
| `xc_set_beta_notes` | Set "What to Test" text for a build |
| `xc_submit_beta_review` | Submit build for external beta review |

### Metadata & Release Tools

| Tool | Purpose |
|------|---------|
| `xc_list_versions` | List App Store versions with state (READY_FOR_SALE, PREPARE_FOR_SUBMISSION, etc.) |
| `xc_create_version` | Create a new App Store version (e.g., "1.1.0") |
| `xc_update_version` | Update version attributes (release type, scheduled date) |
| `xc_get_metadata` | Get localized metadata (description, keywords, what's new) |
| `xc_create_localization` | Create a new locale for a version |
| `xc_update_metadata` | Update localized metadata |
| `xc_get_app_info` | Get app-level info (name, subtitle, privacy URL) |
| `xc_update_app_info` | Update app-level localized info |
| `xc_set_review_detail` | Set review contact info and demo account |
| `xc_submit_for_review` | Submit version for App Review |
| `xc_release_version` | Manually release an approved version |

---

## Common Workflows

### One-Shot Signing Setup

Use this when setting up a new app or fixing "No profiles found" errors:

```bash
# 1. Read local entitlements to identify expected capabilities
find . -name "*.entitlements" -exec cat {} \;

# 2. Run one-shot signing setup
# (Use xc_setup_signing with all bundle identifiers)
# Creates distribution cert + App Store profiles for each bundle ID
```

The `xc_setup_signing` tool:
- Creates an Apple Distribution certificate if none exists
- Generates App Store provisioning profiles for each bundle ID
- Installs the certificate in your login keychain

### Checking Signing Health

Run this when builds fail with signing errors:

```bash
# 1. Read entitlements files
find . -name "*.entitlements" -exec cat {} \;

# 2. Run signing health check
# (Use xc_check_signing with each bundle ID and expected capabilities)
```

The `xc_check_signing` tool reports:
- Missing capabilities in the portal vs local entitlements
- Certificate status and expiration
- Provisioning profile existence and validity

### Creating a New Bundle ID with Capabilities

```bash
# 1. Register the bundle ID
# (Use xc_register_bundle_id with identifier and name)

# 2. Add required capabilities
# (Use xc_add_capability with bundle_id_id and capability_type)

# 3. Create provisioning profile
# Get certificate IDs from xc_list_certificates
# (Use xc_create_profile with bundle_id_id and certificate_ids)
```

#### ⚠️ App Groups: the capability toggle is NOT the container link

The ASC API (and `xc_add_capability` with `APP_GROUPS`) only flips the
capability **on** for a bundle ID. It does **not** associate a specific
container like `group.com.example.shared`. There is **no** App Store Connect
API resource for App Group container assignment — `/v1/bundleIdCapabilities`
has no relationship to App Groups, and there is no `/v1/appGroups` endpoint.
This means automatic signing (`xcodebuild -allowProvisioningUpdates` with an
ASC `.p8` API key) will fail to mint a managed profile for a bundle ID whose
entitlements declare an App Group until that container is linked, with errors
like "App Group ... is not associated with this app ID" or a silent fallback
to a wildcard profile.

**The only programmatic way to link the container is `fastlane produce`,
which authenticates with an Apple ID *cookie/web session* (spaceship), NOT the
`.p8` API key:**

```bash
# Authenticate once (caches a spaceship session under ~/.fastlane):
#   FASTLANE_USER + FASTLANE_PASSWORD (or interactive Apple ID login)

# Ensure the App Group exists (idempotent):
bundle exec fastlane produce group \
  -g group.com.example.shared -n "Example Shared Group"

# Associate the group with each bundle ID that declares it
# (main app AND every extension — run per bundle ID, idempotent):
bundle exec fastlane produce associate_group \
  -a com.example.myapp           group.com.example.shared
bundle exec fastlane produce associate_group \
  -a com.example.myapp.share     group.com.example.shared
```

After `associate_group` succeeds for every bundle ID, automatic signing with
the `.p8` key works normally. Same applies to the web portal
(Certificates, Identifiers & Profiles → the App ID → App Groups → Edit) if you
prefer clicking. **Capability key auth is irrelevant here — the limitation is
the API surface, not the key role.** (Verified 2026-06-01 shipping Aether
Field's share extension; see aether-focus pattern
`2026-06-01-app-group-link-requires-produce.md`.)

### Distributing a Build to TestFlight

```bash
# 1. List available builds
# (Use xc_list_tf_builds with optional app_id filter)

# 2. List beta groups
# (Use xc_list_beta_groups with app_id)

# 3. Distribute build to group
# (Use xc_distribute_build with build_id and beta_group_id)
```

### Setting Beta Test Notes

```bash
# 1. List builds to get build ID
# (Use xc_list_tf_builds)

# 2. Set "What to Test" notes
# (Use xc_set_beta_notes with build_id and whats_new text)
```

---

## Capability Mapping

Map entitlements file keys to capability types for MCP tools:

| Entitlement Key | Capability Type |
|-----------------|-----------------|
| `com.apple.security.application-groups` | `APP_GROUPS` ⚠️ capability toggle only — container link needs `fastlane produce associate_group` (see above) |
| `com.apple.developer.icloud-container-identifiers` | `ICLOUD` |
| `com.apple.developer.healthkit` | `HEALTHKIT` |
| `aps-environment` | `PUSH_NOTIFICATIONS` |
| `com.apple.developer.applesignin` | `APPLE_ID_AUTH` |
| `com.apple.developer.associated-domains` | `ASSOCIATED_DOMAINS` |
| `com.apple.developer.in-app-payments` | `IN_APP_PURCHASE` |
| `com.apple.developer.siri` | `SIRIKIT` |
| `com.apple.developer.networking.wifi-info` | `ACCESS_WIFI_INFORMATION` |
| `com.apple.developer.default-data-protection` | `DATA_PROTECTION` |

### Example: Reading Entitlements

```xml
<!-- MyApp.entitlements -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.application-groups</key>
    <array>
        <string>group.com.example.myapp</string>
    </array>
    <key>aps-environment</key>
    <string>production</string>
</dict>
</plist>
```

Required capabilities: `APP_GROUPS`, `PUSH_NOTIFICATIONS`

---

## Fastlane Integration

### Alpha Lanes (TestFlight Upload)

```ruby
# fastlane/Fastfile
lane :alpha do
  increment_build_number
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight(
    skip_waiting_for_build_processing: false,
    notify_external_testers: false
  )
end

lane :alpha_next do
  bump_build  # Custom lane to increment build
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight
end
```

Run with:
```bash
cd apps/myapp && bundle exec fastlane alpha
```

### Beta Review Submission

```ruby
lane :submit_beta do
  # Distribute to external group triggers beta review
  upload_to_testflight(
    distribute_external: true,
    groups: ["External Testers"],
    changelog: "Bug fixes and improvements"
  )
end
```

### Metadata Sync

```ruby
lane :sync_metadata do
  download_from_app_store_connect(
    metadata_path: "./fastlane/metadata"
  )
  # Edit files in fastlane/metadata/
  upload_to_app_store_connect(
    metadata_path: "./fastlane/metadata",
    skip_binary_upload: true,
    skip_screenshots: true
  )
end
```

---

## Troubleshooting

### No Profiles Found

**Error:** `No profiles for 'com.example.app' were found`

**Solution:**
1. Check if bundle ID is registered: `xc_list_bundle_ids`
2. If missing, register it: `xc_register_bundle_id`
3. Run one-shot setup: `xc_setup_signing`
4. Or manually create profile: `xc_create_profile`

### Certificate Expiration

**Error:** `Signing certificate expired`

**Solution:**
1. List certificates: `xc_list_certificates`
2. Check expiration dates
3. If expiring soon, create new: `xc_create_certificate`
4. Old certificates can be revoked: `xc_revoke_certificate`

### Capability Mismatches

**Error:** `Provisioning profile doesn't include the aps-environment entitlement`

**Solution:**
1. Read local entitlements file
2. Check portal capabilities: `xc_get_capabilities`
3. Add missing capability: `xc_add_capability`
4. Recreate provisioning profile: `xc_create_profile`

### Build Processing Failures

**Error:** Build stuck in "Processing" or fails TestFlight upload

**Common causes:**
- **Missing compliance:** Set encryption declaration with `xc_set_encryption`
- **Invalid binary:** Check for private API usage or missing icons
- **Version conflict:** Bump build number with `increment_build_number`
- **API key issues:** Verify `ASC_KEY_PATH` environment variable

### Profile Not Found After Creation

Xcode may cache old profiles. Force refresh:

```bash
# Remove cached profiles
rm -rf ~/Library/MobileDevice/Provisioning\ Profiles/*

# Restart Xcode
# Download profiles: Xcode > Settings > Accounts > Download Manual Profiles
```

---

## Quick Reference

### Essential Commands

```bash
# Check signing health for all apps
make validate-fast

# Archive build (catches signing errors)
make archive-{app}

# Full export test (catches provisioning errors)
make export-test-{app}

# Upload to TestFlight
bundle exec fastlane alpha
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `ASC_KEY_PATH` | Path to App Store Connect API key (`.p8` file) |
| `ASC_KEY_ID` | Key ID from App Store Connect |
| `ASC_ISSUER_ID` | Issuer ID from App Store Connect |
| `TEAM_ID` | Apple Developer Team ID |

### Bundle ID Patterns

```
com.example.myapp              # Main app
com.example.myapp.watch        # Watch app
com.example.myapp.widgets      # Widget extension
com.example.myapp.watch.widgets # Watch widgets
```

---

## See Also

- `ios-build` — Build validation and troubleshooting
- `ios-standards` — Swift 6 concurrency patterns
- `check-build` — Diagnose build/signing failures (project-specific)

<!-- END SKILL: ios-asc -->

---

<!-- BEGIN SKILL: ios-build -->

# ios-build

# iOS Build

Build system patterns, validation workflows, and troubleshooting. **Run validation before every commit.**

---

## The 4-Layer Validation Pipeline

Use the lightest layer that matches your situation.

| Layer | Command | Time | What It Catches |
|-------|---------|------|-----------------|
| **1. Fast** | `make validate-fast` | ~30s | Lint, isolation violations, safety patterns |
| **2. Full** | `make validate` | ~3 min | Layer 1 + archive builds (Swift 6 strict concurrency) |
| **3. Export Test** | `make export-test-{app}` | ~5 min | Layer 2 + signing, provisioning, icons, entitlements |
| **4. Upload** | `bundle exec fastlane alpha` | ~10 min | Layer 3 + Apple Transporter, TestFlight processing |

### When to Use Each Layer

- **During development:** `make validate-fast` after each significant change
- **Before committing:** `make validate` at minimum
- **Before pushing:** `make export-test-{app}` for the affected app(s)
- **Release:** `bundle exec fastlane alpha` to upload

---

## Critical Rule: Archive vs Debug Builds

**Debug/simulator builds do NOT catch all strict concurrency errors.**

Swift 6 strict concurrency checking is more thorough in optimized builds:

```bash
# Debug build — misses some concurrency errors
xcodebuild -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' build

# Archive build — catches ALL concurrency errors
xcodebuild -scheme MyApp -destination 'generic/platform=iOS' archive
```

Always run archive builds before committing Swift code changes.

---

## XcodeGen

### Project Structure

```yaml
# project.yml
name: MyApp
targets:
  MyApp-iOS:
    type: application
    platform: iOS
    deploymentTarget: "26.0"
    sources:
      - MyApp-iOS
    dependencies:
      - target: MyAppKit
      - sdk: HealthKit.framework
      - sdk: Speech.framework
    settings:
      base:
        SWIFT_STRICT_CONCURRENCY: complete
        SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
        PRODUCT_BUNDLE_IDENTIFIER: com.example.myapp
    info:
      path: MyApp-iOS/Info.plist
      properties:
        UISupportedInterfaceOrientations: [UIInterfaceOrientationPortrait]
        
  MyAppKit:
    type: framework
    platform: iOS
    sources:
      - MyAppKit/Sources
```

### Regenerating Project

```bash
# After any project.yml change
xcodegen generate

# With specific spec
xcodegen generate --spec project.yml
```

### Adding Files

**Do NOT manually edit `.xcodeproj`.** XcodeGen automatically includes files from configured source directories.

```yaml
sources:
  - MyApp-iOS           # All .swift files included
  - path: Resources      # Non-code resources
    buildPhase: resources
```

### XcodeGen Hyphen to Underscore

**Critical:** XcodeGen converts hyphens in target names to underscores in Swift module names:

```yaml
# project.yml
targets:
  MyApp-iOS:           # Target name with hyphen
    # ...
```

```swift
// Generated Swift module uses underscore
@testable import MyApp_iOS  // Not MyApp-iOS
```

### Watch App Configuration

**Critical:** Watch apps require specific XcodeGen configuration to embed properly:

```yaml
# WRONG — causes Xcode Cloud archive failures
targets:
  MyApp-iOS:
    scheme:
      buildTargets:           # Don't include Watch targets here!
        - MyApp-iOS
        - MyApp-Watch         # ❌ Breaks Xcode Cloud
        
# RIGHT — embed via target dependency only
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch
        embed: true
        copyFiles:
          - destination: products/Watch
            subpath: MyAppWatch.app
            
  MyApp-Watch:
    type: application.watchapp2
    platform: watchOS
    deploymentTarget: "10.0"
    sources:
      - MyApp-Watch
```

**Key rules:**
1. Never add Watch targets to the iOS scheme's `buildTargets` — breaks Xcode Cloud
2. Use `embed: true` with `copyFiles` to `products/Watch`
3. Watch app will build automatically via target dependency

#### Watch App Icon — Xcode 17 iphoneos Thinning (Gotcha)

When archiving with `-destination generic/platform=iOS`, Xcode 17 runs actool on the **embedded Watch bundle** with `--platform iphoneos` as part of the iOS archive's thinning pass. If your Watch `AppIcon.appiconset/Contents.json` only contains a `"platform": "watchos"` entry, actool throws:

```
error: The app icon set named "AppIcon" did not have any applicable content.
```

**Fix:** Add a second `"idiom": "universal"` entry (no `platform` field) pointing to the same 1024×1024 file. The watchOS-specific entry continues to handle proper CFBundleIconName assignment for the Watch bundle; the universal entry gives iphoneos thinning something to find.

```json
{
  "images": [
    {
      "filename": "AppIcon.png",
      "idiom": "universal",
      "platform": "watchos",
      "size": "1024x1024"
    },
    {
      "filename": "AppIcon.png",
      "idiom": "universal",
      "size": "1024x1024"
    }
  ],
  "info": { "author": "xcode", "version": 1 }
}
```

The "unassigned child" warning emitted for the universal entry is harmless — it's a warning, not an error, and does not affect the archive result or altool validation.

#### Never Pass `-sdk iphoneos` to xcodebuild (Xcode 17)

Passing `-sdk iphoneos` to an xcodebuild archive command forces **all** targets — including the embedded Watch app — to compile against the iOS SDK. In Xcode 17 this causes the Watch build to fail outright.

```bash
# ❌ Broken in Xcode 17 — Watch targets compile against iOS SDK
xcodebuild -scheme MyApp-iOS -sdk iphoneos archive ...

# ✅ Correct — each platform target uses its own SDK automatically
xcodebuild -scheme MyApp-iOS -destination generic/platform=iOS archive ...
```

Remove `-sdk iphoneos` from any Fastfile `gym`/`xcodebuild` invocation and use `-destination generic/platform=iOS` only.

---

## Gating a Privacy-Sensitive Symbol Per-App in a Shared SPM Package

**Problem:** A shared SPM package (e.g. a monorepo's `Kit`) is linked by several apps. One app needs a privacy-sensitive symbol (`AVCaptureDevice`, `CLLocationManager`, `CMMotionManager`, `HKHealthStore`); the others don't. If the symbol lives in the shared package, *every* app links it, and Apple's binary scanner then demands the corresponding `Info.plist` usage string from apps that have no such feature — which human review rejects as a false feature (Guideline 5.1.1). See `apple-review` → "Privacy Symbols vs Usage Strings."

**Why SPM traits don't solve this in Xcode:** SwiftPM package *traits* (the `traits:`/`enabledTraits:` feature) look like the answer, but they **cannot be toggled per-target from an Xcode `.xcodeproj`**. There's no app-level `Package.swift` to enable a dependency's trait; the `.xcodeproj` just references the product. (Traits work when the consumer is itself a SwiftPM package.) Don't reach for them in an XcodeGen/`.xcodeproj` app.

**Reliable Xcode-native fix — separate product + dependency inversion:**

1. In the shared package, split the symbol into its **own product/target**. Core stays symbol-free; it declares a protocol + a set-once registry instead of calling the symbol directly:
   ```swift
   // Core target — no AVCaptureDevice anywhere
   public protocol CameraPermissionProviding: Sendable { /* status/request */ }
   public enum CameraPermissionRegistry {
       private static let storage = Mutex<(any CameraPermissionProviding)?>(nil)  // Synchronization
       public static func register(_ p: any CameraPermissionProviding) { storage.withLock { $0 = p } }
       public static var provider: (any CameraPermissionProviding)? { storage.withLock { $0 } }
   }
   ```
   ```swift
   // Separate "Camera" target/product — the ONLY AVCaptureDevice site
   public struct AVCaptureCameraProvider: CameraPermissionProviding { /* calls AVCaptureDevice */ }
   public enum AppCamera { public static func install() { CameraPermissionRegistry.register(AVCaptureCameraProvider()) } }
   ```
   ```swift
   // Package.swift
   .library(name: "KitCamera", targets: ["KitCamera"]),
   .target(name: "KitCamera", dependencies: ["Kit"], path: "Sources/KitCamera"),
   ```
2. Only camera-using apps add the product in `project.yml` and call `install()` once at launch:
   ```yaml
   dependencies:
     - package: Kit
       product: Kit          # XcodeGen defaults `- package: Kit` to the same-named product;
     - package: Kit          # list products explicitly when a package has more than one.
       product: KitCamera
   ```
   ```swift
   // App launch (camera-using app only)
   AppCamera.install()
   ```
   Apps that don't link `KitCamera` get the core's safe no-op fallback and never link the symbol.

**Verify at the binary level (don't trust source-grep alone):**
```bash
make archive-<app>          # build a FRESH archive — stale ones in build/ predate the fix
APP=.../<App>.xcarchive/Products/Applications/<App>.app
nm "$APP/<App>" | grep -i AVCaptureDevice          # opted-out app → zero matches
grep -rl AVCaptureDevice "$APP"                     # full-bundle scan incl. embedded frameworks
otool -L "$APP/<App>" | grep -i AVFoundation        # positive control on the opted-in app
```
Run the same `nm` on a camera-using app as a positive control — it *should* show the symbol. App-level Swift compile flags do **not** propagate into a local SwiftPM dependency, so you cannot gate the symbol with an app-target `#if`; the product boundary is what does the gating.

---

## Build Commands

### Simulator Build (Fast)

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | grep -E "error:|Build succeeded"
```

### Device Build

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'generic/platform=iOS' \
  build
```

### Archive Build (Required for Validation)

```bash
xcodebuild -scheme MyApp-iOS \
  -destination 'generic/platform=iOS' \
  -archivePath build/MyApp.xcarchive \
  archive
```

### Export Test (CI-Equivalent)

```bash
# Create export options plist
cat > exportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
</dict>
</plist>
EOF

# Export archive
xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist exportOptions.plist \
  -exportPath build/ipa
```

---

## Testing

### Unit Tests (Package)

```bash
cd MyAppKit && swift test
```

### Unit Tests (Xcode)

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests
```

### UI Tests

```bash
xcodebuild test -scheme MyApp-iOS-UITests \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max'
```

### Specific Test

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests/test_startFromIdle
```

---

## Common Build Errors

### Strict Concurrency Errors

**Error:** `Call to main actor-isolated instance method in a synchronous nonisolated context`

**Fix:** Add `@MainActor` annotation:

```swift
// Before
class ViewModel {
    func update() { }
}

// After
@MainActor
class ViewModel {
    func update() { }
}
```

### Sendable Errors

**Error:** `Non-sendable type 'X' returned by call crossing isolation boundary`

**Fix:** Use `@preconcurrency import` or extract values:

```swift
@preconcurrency import EventKit

@MainActor
final class Service {
    private let store = EKEventStore()
}
```

### Task Isolation Errors

**Error:** `Reference to captured var 'self' in concurrently-executing code`

**Fix:** Use `[weak self]` with explicit isolation:

```swift
// Wrong
Task {
    await self.update()
}

// Right
Task { @MainActor [weak self] in
    guard let self = self else { return }
    await self.update()
}
```

### Concurrent Archives Corrupt Shared DerivedData

**Error:**

```
error: unable to write file '.../DerivedData/.../<Target>-<hash>-VFS-iphoneos/all-product-headers.yaml':
       No such file or directory (2)
** ARCHIVE FAILED **
```

**Cause:** Two `xcodebuild archive` runs sharing **one** DerivedData path race on the same VFS
overlay/header-map intermediates and clobber each other. This is **not** a code, Gemfile, or
signing failure — it is pure build-directory contention. It bites whenever archives run in
parallel: two terminals, two CI jobs on one runner, or two agents in a shared checkout. A custom
shared build location (Xcode → Locations → Derived Data → Custom) makes *every* project collide,
not just two of the same app.

**Fix (durable):** give each archive its own DerivedData so they can never share intermediates:

```bash
xcodebuild -scheme MyApp-Archive -configuration Release archive \
  -archivePath build/MyApp.xcarchive \
  -derivedDataPath build/DerivedData \   # per-app/per-job, isolated
  -destination generic/platform=iOS
```

**Fix (operational):** if you can't isolate paths, **serialize** — never start an archive while
another is in flight. Gate on `pgrep -f "xcodebuild|swift-frontend"` before launching.

**Recovery:** a poisoned archive leaves corrupt intermediates that fail repeat runs. With the
isolated path above, `rm -rf build/DerivedData` and retry. On a shared path, only clear the
corrupt `…/ArchiveIntermediates/<Scheme>` dir while **nothing else is building**, or you break
the other job.

### Missing Provisioning Profile

**Error:** `No profiles for 'com.example.app' were found`

**Fix:** Use ASC MCP tools to check and fix signing:

```bash
# Check signing status against Developer Portal
asc_check_signing --bundle-id com.example.app --capabilities push-notifications,app-groups

# List available certificates and profiles
asc_list_certificates
asc_list_profiles --type IOS_APP_DEVELOPMENT

# Create a new certificate if needed
asc_create_certificate --type DISTRIBUTION
```

### DerivedData Issues

```bash
# Clear DerivedData for this project
rm -rf ~/Library/Developer/Xcode/DerivedData/MyApp-*

# Clear all DerivedData (nuclear option)
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### SwiftData Model Changes

**Error:** Crash after changing @Model properties

**Fix:** Delete app to recreate database:

```bash
xcrun simctl uninstall booted com.example.myapp
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  test:
    runs-on: macos-15
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.4.8
          bundler-cache: true
      
      - name: Install XcodeGen
        run: brew install xcodegen
      
      - name: Generate Project
        run: xcodegen generate
      
      - name: Run Package Tests
        run: cd MyAppKit && swift test
      
      - name: Archive Build (catches concurrency errors)
        run: |
          xcodebuild archive \
            -scheme MyApp-iOS \
            -destination 'generic/platform=iOS' \
            -archivePath build/MyApp.xcarchive
      
      - name: Run Unit Tests
        run: |
          xcodebuild test \
            -scheme MyApp-iOS \
            -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
            -only-testing:MyAppTests | xcpretty
```

### Fastlane Integration

```ruby
# fastlane/Fastfile
lane :test do
  run_tests(scheme: "MyApp-iOS")
end

lane :archive do
  build_app(
    scheme: "MyApp-iOS",
    export_method: "app-store"
  )
end

lane :alpha do
  increment_build_number
  build_app(scheme: "MyApp-iOS")
  upload_to_testflight
end
```

---

## macOS TestFlight & App Store

macOS builds follow different export and distribution paths than iOS. The standard Fastlane `build_app` + `upload_to_testflight` patterns are iOS-centric and break on macOS.

### macOS Archive + Export

```bash
# Archive (automatic signing + ASC API key auth)
xcodebuild -project MyApp.xcodeproj \
  -scheme MyApp \
  -configuration Release \
  archive \
  -archivePath build/MyApp.xcarchive \
  -destination 'generic/platform=macOS' \
  -allowProvisioningUpdates \
  -authenticationKeyPath ~/.private_keys/AuthKey_XXXXXX.p8 \
  -authenticationKeyID <KEY_ID> \
  -authenticationKeyIssuerID <ISSUER_ID> \
  CODE_SIGN_STYLE=Automatic \
  CODE_SIGN_IDENTITY='Apple Development' \
  PROVISIONING_PROFILE_SPECIFIER='' \
  DEVELOPMENT_TEAM=<TEAM_ID>

# Export as .pkg (Mac App Store distribution)
cat > /tmp/exportOptions.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" ...>
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>   <!-- NOT "app-store" -->
  <key>teamID</key>
  <string>YOUR_TEAM_ID</string>
  <key>signingStyle</key>
  <string>automatic</string>
  <key>thinning</key>
  <string>&lt;none&gt;</string>
</dict>
</plist>
EOF

xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist /tmp/exportOptions.plist \
  -exportPath build \
  -allowProvisioningUpdates \
  -authenticationKeyPath ~/.private_keys/AuthKey_XXXXXX.p8 \
  -authenticationKeyID <KEY_ID> \
  -authenticationKeyIssuerID <ISSUER_ID>
# Produces: build/MyApp.pkg
```

### Fastlane macOS Limitations (Critical)

Fastlane's `pilot` and `build_app` actions have **known macOS incompatibilities** as of 2.235.0:

| Action | iOS | macOS | Workaround |
|--------|-----|-------|------------|
| `build_app` / `gym` | ✅ Produces `.ipa` | ❌ Not designed for `.pkg` | Use raw `xcodebuild` archive + export |
| `upload_to_testflight` / `pilot` | ✅ Uploads `.ipa` | ✅ Uploads `.pkg` via `pkg:` param | Works, but see below |
| `pilot list` | ✅ Lists builds | ❌ `'betaBuildMetrics' is not a valid relationship name` | Use Spaceship directly |
| `pilot distribute` | ✅ Adds to groups | ❌ Prompts for platform interactively; crashes non-interactive | Use Spaceship directly |
| `set_changelog` (action) | ✅ Sets "What to Test" | ❌ Built-in action doesn't target macOS builds reliably | Use Spaceship directly |

### Spaceship Workarounds for macOS TestFlight

When fastlane actions fail for macOS, use Spaceship directly in your `Fastfile`:

```ruby
def asc_api_token
  Spaceship::ConnectAPI::Token.create(
    key_id: ENV["ASC_KEY_ID"],
    issuer_id: ENV["ASC_ISSUER_ID"],
    filepath: ENV["ASC_KEY_PATH"]
  )
end

# Set "What to Test" changelog for the latest macOS build
lane :update_beta_changelog do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find("com.example.app")
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }

  locs = build.get_beta_build_localizations
  existing = locs.find { |l| l.locale == "en-US" }

  if existing
    Spaceship::ConnectAPI.patch_beta_build_localizations(
      localization_id: existing.id,
      attributes: { whatsNew: options[:changelog] }
    )
  else
    Spaceship::ConnectAPI.post_beta_build_localizations(
      build_id: build.id,
      attributes: { locale: "en-US", whatsNew: options[:changelog] }
    )
  end
end

# Distribute macOS build to a beta group
lane :distribute_macos_alpha do |options|
  Spaceship::ConnectAPI.token = asc_api_token
  app = Spaceship::ConnectAPI::App.find("com.example.app")
  build = app.get_builds(limit: 10).find { |b| b.version == options[:build] }
  group = app.get_beta_groups.find { |g| g.name == options[:group] }

  current = group.fetch_builds  # NOTE: fetch_builds, NOT get_builds
  unless current.any? { |b| b.id == build.id }
    Spaceship::ConnectAPI.add_beta_groups_to_build(
      build_id: build.id,
      beta_group_ids: [group.id]
    )
  end
end
```

**Key Spaceship API notes for macOS:**
- `Build#get_beta_build_localizations` — returns existing `BetaBuildLocalization` objects
- `post_beta_build_localizations(build_id:, attributes: { locale:, whatsNew: })` — `attributes:` is a Hash, not keyword args
- `patch_beta_build_localizations(localization_id:, attributes: { whatsNew: })` — update existing localization
- `BetaGroup#fetch_builds` — list builds in a group (method name is `fetch_builds`, not `get_builds`)
- `add_beta_groups_to_build(build_id:, beta_group_ids:)` — add build to groups

### Fastfile Naming Conflicts

Avoid naming lanes after built-in fastlane actions:

```ruby
# WRONG — conflicts with built-in `set_changelog` action
lane :set_changelog do ... end

# RIGHT
lane :update_beta_changelog do ... end
```

---

## CI/CD Gotchas

### Build Number Regression

**Critical:** TestFlight rejects uploads with regressed build numbers:

```bash
# WRONG — hardcoded build number
# If TestFlight has build 50, and you upload build 45:
# Apple silently rejects the upload

# RIGHT — inject via agvtool in ci_pre_xcodebuild.sh
#!/bin/bash
agvtool new-version -all "${CI_BUILD_NUMBER}"
```

**Never rely on Xcode Cloud's "Manage Version and Build Number" setting** — it's unreliable and causes conflicts.

### DerivedData Corruption + Fastlane Clean

**Critical:** Corrupted DerivedData + `clean: true` = 30+ minute builds:

```ruby
# WRONG — clean every build
build_app(
  scheme: "MyApp-iOS",
  clean: true  # ❌ 30+ min builds if DerivedData corrupted
)

# RIGHT — only clean when necessary
build_app(
  scheme: "MyApp-iOS"
  # clean: false (default) — incremental builds
)
```

Fix corrupted DerivedData manually:
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/MyApp-*
```

### App Store Keywords with Apple Trademarks

Apple rejects apps with trademarked terms in keywords:

```
# keywords.txt — REJECTED
keynote,presentation,powerpoint,slides

# keywords.txt — ACCEPTED
presentation,speech,timer,practice,talk
```

**Never include:** keynote, powerpoint, keynote remote, final cut, logic pro, etc.

### Usage Descriptions for Unused Capabilities

Apple rejects apps declaring usage descriptions for capabilities they don't use:

```xml
<!-- REJECTED — app doesn't actually use health data -->
<key>NSHealthShareUsageDescription</key>
<string>This app does not use health data</string>
```

Remove the entitlement entirely if not used.

---

## Build Settings Reference

### Essential Swift 6 Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `SWIFT_VERSION` | `6.0` | Swift 6 language mode |
| `SWIFT_STRICT_CONCURRENCY` | `complete` | Full concurrency checking |
| `SWIFT_DEFAULT_ACTOR_ISOLATION` | `MainActor` | UI isolation by default |

### In project.yml

```yaml
settings:
  base:
    SWIFT_VERSION: "6.0"
    SWIFT_STRICT_CONCURRENCY: complete
    SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
    ENABLE_USER_SCRIPT_SANDBOXING: NO
    GENERATE_INFOPLIST_FILE: NO
```

---

## App Extension Info.plist (NSExtensionPointIdentifier)

**Every app-extension target (`type: app-extension` — WidgetKit, Live Activity, Share, Action, Notification Service, etc.) MUST have an explicit base `Info.plist` containing an `NSExtension` dict with `NSExtensionPointIdentifier`.** `GENERATE_INFOPLIST_FILE: true` does **not** synthesize these keys — it only merges `CFBundle*` keys on top of whatever base plist you provide. With no base plist, the built `.appex` ships with no `NSExtension` dict.

Why this is dangerous: a `.appex` missing this key **builds, exports, and uploads cleanly**. `xcrun altool` even prints *"Successfully uploaded"* because `SkipValidateProductErrors` defers the check. Then Apple's **asynchronous server-side processing** fails the build with **error 90348** ("The NSExtensionPointIdentifier key must be present…") and the build **silently drops out of the TestFlight valid-builds list**. There is no local build error — only a failed processing email and an absent build. (See `asc-submission` → "Asynchronous Processing Failures" for diagnosis.)

Wire it up in `project.yml` with an explicit `INFOPLIST_FILE`; keep `GENERATE_INFOPLIST_FILE: true` so Xcode still merges the version/bundle keys:

```yaml
MyApp-Widgets:
  type: app-extension
  settings:
    base:
      INFOPLIST_FILE: MyApp-Widgets/Info.plist   # explicit base — REQUIRED
      GENERATE_INFOPLIST_FILE: true               # merges CFBundle* on top; OK
```

```xml
<!-- MyApp-Widgets/Info.plist -->
<key>NSExtension</key>
<dict>
    <key>NSExtensionPointIdentifier</key>
    <string>com.apple.widgetkit-extension</string>
</dict>
```

**Point identifiers** are extension-type-specific. Verified-common values:

| Extension type | `NSExtensionPointIdentifier` |
|----------------|------------------------------|
| WidgetKit widget **and** Live Activity | `com.apple.widgetkit-extension` |
| Share extension | `com.apple.share-services` |
| Action extension | `com.apple.ui-services` |

> Live Activities are WidgetKit extensions — they use `com.apple.widgetkit-extension` (plus `NSSupportsLiveActivities` in the **main app's** Info.plist), **not** a separate "activity" point identifier. For any extension type not listed above, do **not** guess: use the exact value Xcode's own template generates for that target type, or confirm against Apple's [NSExtensionPointIdentifier docs](https://developer.apple.com/documentation/bundleresources/information-property-list/nsextension/nsextensionpointidentifier).

A Share/Action extension's base plist additionally needs `NSExtensionPrincipalClass` (e.g. `$(PRODUCT_MODULE_NAME).ShareViewController`) and an `NSExtensionAttributes`/`NSExtensionActivationRule`. WidgetKit extensions need only the point identifier.

**Catch it before upload, not after.** A `.appex` missing this key can't be caught by archive/export — validate the built bundle. To verify every embedded extension in a built `.ipa` or `.xcarchive`, run the project-agnostic `verify-appex-infoplist.sh` script (see `scripts/`), ideally as a fail-fast gate between export and `upload_to_testflight`/`altool`.

---

## Best Practices

1. **Always run archive builds** before committing — debug builds miss concurrency errors
2. **Use `make validate`** as a pre-commit check
3. **Regenerate project** after project.yml changes
4. **Clear DerivedData** when builds behave strangely
5. **Use ASC MCP tools** (`asc_check_signing`, `asc_list_profiles`) for signing issues, not manual portal fixes
6. **Test on device** periodically — simulators don't catch all issues

---

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios-asc` — App Store Connect MCP tools for signing
- `ios-test` — Testing patterns and commands

<!-- END SKILL: ios-build -->

---

<!-- BEGIN SKILL: ios-simulate -->

# ios-simulate

# iOS Simulate

iOS Simulator management, screenshot automation, and device control via `xcrun simctl`. Use for testing, screenshots, and simulator-based workflows.

---

## Quick Reference

| Task | Command |
|------|---------|
| List devices | `xcrun simctl list devices available` |
| Boot simulator | `xcrun simctl boot "iPhone 17 Pro Max"` |
| Screenshot | `xcrun simctl io booted screenshot output.png` |
| Record video | `xcrun simctl io booted recordVideo output.mp4` |
| Install app | `xcrun simctl install booted MyApp.app` |
| Uninstall app | `xcrun simctl uninstall booted com.example.app` |
| Set dark mode | `xcrun simctl ui booted appearance dark` |
| Open URL | `xcrun simctl openurl booted https://example.com` |

---

## Simulator Management

### List Available Simulators

```bash
# All devices (including unavailable)
xcrun simctl list devices

# Only available devices
xcrun simctl list devices available

# JSON output (for scripting)
xcrun simctl list devices available -j

# Filter by device type
xcrun simctl list devices | grep "iPhone"
```

### Boot and Shutdown

```bash
# Boot a specific device by name
xcrun simctl boot "iPhone 17 Pro Max"

# Boot by UDID
xcrun simctl boot 4C6DD567-0C7E-476D-8946-8CA9A21A9452

# Wait for boot to complete
xcrun simctl bootstatus "iPhone 17 Pro Max" -b

# Shutdown
xcrun simctl shutdown "iPhone 17 Pro Max"

# Shutdown all simulators
xcrun simctl shutdown all

# Check if running
xcrun simctl list devices | grep "iPhone 17 Pro Max" | grep "Booted"
```

### Create Custom Simulators

```bash
# List available device types
xcrun simctl list devicetypes

# List available runtimes
xcrun simctl list runtimes

# Create custom simulator
xcrun simctl create "My iPhone 15" "iPhone 15" "iOS17.4"

# Delete simulator
xcrun simctl delete "My iPhone 15"

# Erase all content and settings
xcrun simctl erase "iPhone 17 Pro Max"
```

### Open Simulator App

```bash
# Open Simulator.app
open -a Simulator

# Open with specific device
xcrun simctl boot "iPhone 17 Pro Max" && open -a Simulator
```

---

## App Management

### Install and Uninstall

```bash
# Install app from .app bundle
xcrun simctl install booted /path/to/MyApp.app

# Install by device name
xcrun simctl install "iPhone 17 Pro Max" /path/to/MyApp.app

# Uninstall by bundle ID
xcrun simctl uninstall booted com.example.myapp

# Get app container path
xcrun simctl get_app_container booted com.example.myapp data
```

### Launch and Terminate

```bash
# Launch app
xcrun simctl launch booted com.example.myapp

# Launch with arguments
xcrun simctl launch booted com.example.myapp --uitesting

# Terminate app
xcrun simctl terminate booted com.example.myapp

# Get app PID
xcrun simctl spawn booted pgrep -x MyApp
```

### Reset App State

```bash
# Uninstall and reinstall (cleanest reset)
xcrun simctl uninstall booted com.example.myapp
xcrun simctl install booted /path/to/MyApp.app

# Erase entire simulator (nuclear option)
xcrun simctl erase booted
```

---

## Screenshot Automation

### Basic Screenshot Capture

```bash
# Capture screenshot of booted device
xcrun simctl io booted screenshot screenshot.png

# Capture specific device
xcrun simctl io "iPhone 17 Pro Max" screenshot screenshot.png

# Capture with timestamp
xcrun simctl io booted screenshot "screenshot-$(date +%Y%m%d-%H%M%S).png"
```

### Dual-Path Architecture

The example project uses two screenshot paths with different purposes:

#### ASC Path (Committed, High Quality)

For App Store Connect screenshots — strict requirements, committed to git.

```bash
# ASC requirements:
# - iPhone 17 Pro Max (1290×2796)
# - Status bar: 9:41 AM, 100% battery
# - Clean app state
# - PNG format, no alpha

# Manual capture script
./scripts/asc-screenshots/manual-capture.sh

# Validate ASC compliance
./scripts/asc-screenshots/validate.sh

# Output location
apps/focus/fastlane/screenshots/en-US/
```

#### Verification Path (Debug/PR, Git-Ignored)

For debugging, design reviews, PR validation — quick capture, not committed.

```bash
# Quick capture script
./scripts/verify-screenshots/capture.sh -n "dark-mode-timer"

# With options
./scripts/verify-screenshots/capture.sh \
  -n "settings-screen" \
  -d "iPad Pro (12.9-inch)" \
  -a dark

# Output location (git-ignored)
apps/focus/.build/verification-screenshots/
```

### Status Bar Override

**Note:** Status bar override works on iOS 25 and below. iOS 26+ does not support this feature.

```bash
# Set 9:41 AM, full bars, 100% battery (iOS 25 and below)
xcrun simctl status_bar booted override \
  --time "09:41" \
  --dataNetwork wifi \
  --wifiMode active \
  --wifiBars 3 \
  --cellularMode active \
  --operatorName '' \
  --cellularBars 4 \
  --batteryState charged \
  --batteryLevel 100

# Clear status bar override
xcrun simctl status_bar booted clear
```

### Screenshot with Device Frame

```bash
# Capture and add device frame using frameit (Fastlane)
bundle exec fastlane frameit

# Manual framing with ImageMagick
convert screenshot.png device-frame.png -composite final.png
```

### Dark Mode Screenshots

```bash
# Set dark mode
xcrun simctl ui booted appearance dark

# Set light mode
xcrun simctl ui booted appearance light

# Capture sequence
xcrun simctl ui booted appearance light
xcrun simctl io booted screenshot light-mode.png
xcrun simctl ui booted appearance dark
xcrun simctl io booted screenshot dark-mode.png
```

---

## Video Recording

### Record Simulator Video

```bash
# Start recording
xcrun simctl io booted recordVideo demo.mp4

# Record with H264 codec
xcrun simctl io booted recordVideo --codec h264 demo.mp4

# Force overwrite existing file
xcrun simctl io booted recordVideo --force demo.mp4

# Stop recording (Ctrl+C or kill process)
```

### Background Recording Script

```bash
# Record in background
xcrun simctl io booted recordVideo --codec h264 --force output.mp4 &
RECORD_PID=$!

# Run your tests or interactions
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator'

# Stop recording
kill "$RECORD_PID"
```

### Marketing Demo Recording

```bash
# Full demo sequence
./scripts/record-demo-sim.sh

# Single hero shot
./scripts/record-demo-sim.sh testHero_03_TheStage

# Slower pace for demos
MARKETING_DEMO_SLOW=1 ./scripts/record-demo-sim.sh
```

---

## Device State Management

### Appearance (Light/Dark Mode)

```bash
# Set dark mode
xcrun simctl ui booted appearance dark

# Set light mode
xcrun simctl ui booted appearance light

# Check current appearance
xcrun simctl ui booted appearance
```

### Locale and Language

```bash
# Set locale
xcrun simctl spawn booted defaults write NSGlobalDomain AppleLocale "de_DE"

# Set language
xcrun simctl spawn booted defaults write NSGlobalDomain AppleLanguages "(de)"

# Restart app to apply
xcrun simctl terminate booted com.example.myapp
xcrun simctl launch booted com.example.myapp
```

### Time and Date

```bash
# Set specific time (iOS 25 and below via status_bar)
xcrun simctl status_bar booted override --time "09:41"

# Note: Full date/time override requires device restart or status_bar
```

### Dynamic Type (Text Size)

```bash
# Set content size category
xcrun simctl spawn booted defaults write com.apple.UIKit \
  UIContentSizeCategoryPreferenceKey -string UICTContentSizeCategoryAccessibilityExtraLarge

# Available sizes:
# - UICTContentSizeCategoryExtraSmall
# - UICTContentSizeCategorySmall
# - UICTContentSizeCategoryMedium
# - UICTContentSizeCategoryLarge (default)
# - UICTContentSizeCategoryExtraLarge
# - UICTContentSizeCategoryExtraExtraLarge
# - UICTContentSizeCategoryExtraExtraExtraLarge
# - UICTContentSizeCategoryAccessibilityMedium
# - UICTContentSizeCategoryAccessibilityLarge
# - UICTContentSizeCategoryAccessibilityExtraLarge
# - UICTContentSizeCategoryAccessibilityExtraExtraLarge
# - UICTContentSizeCategoryAccessibilityExtraExtraExtraLarge
```

---

## Permissions and Privacy

### Grant Permissions

```bash
# Grant all permissions for app
xcrun simctl privacy booted grant all com.example.myapp

# Grant specific permission types
xcrun simctl privacy booted grant camera com.example.myapp
xcrun simctl privacy booted grant microphone com.example.myapp
xcrun simctl privacy booted grant photos com.example.myapp
xcrun simctl privacy booted grant location com.example.myapp
xcrun simctl privacy booted grant notifications com.example.myapp
```

### Revoke Permissions

```bash
# Revoke all permissions
xcrun simctl privacy booted revoke all com.example.myapp

# Revoke specific permission
xcrun simctl privacy booted revoke camera com.example.myapp
```

### Reset Privacy

```bash
# Reset all privacy settings
xcrun simctl privacy booted reset all

# Reset specific permission type
xcrun simctl privacy booted reset camera
```

### List Permission Types

```bash
xcrun simctl privacy booted list
```

---

## Push Notifications

### Send Push Notification

```bash
# Send push with JSON payload
cat > notification.json << 'EOF'
{
  "aps": {
    "alert": {
      "title": "Hello",
      "body": "This is a test notification"
    },
    "badge": 1,
    "sound": "default"
  }
}
EOF

xcrun simctl push booted com.example.myapp notification.json
```

### Send Silent Push

```bash
cat > silent-push.json << 'EOF'
{
  "aps": {
    "content-available": 1
  },
  "custom-data": "value"
}
EOF

xcrun simctl push booted com.example.myapp silent-push.json
```

---

## Location Simulation

### Set Location

```bash
# Set specific coordinates (latitude, longitude)
xcrun simctl location booted set 37.7749,-122.4194

# Set location by place name (if supported)
xcrun simctl location booted set "San Francisco, CA"
```

### Simulate Movement

```bash
# Start freeway drive simulation
xcrun simctl location booted start freeway_drive

# Start city run simulation
xcrun simctl location booted start city_run

# Stop location simulation
xcrun simctl location booted stop
```

### Clear Location

```bash
xcrun simctl location booted clear
```

---

## System Events

### Memory Warning

```bash
# Simulate memory warning
xcrun simctl spawn booted notifyutil -p com.apple.system.lowmemory
```

### Open URL

```bash
# Open web URL
xcrun simctl openurl booted https://example.com

# Open custom URL scheme
xcrun simctl openurl booted myapp://screen/settings

# Open with query parameters
xcrun simctl openurl booted "myapp://item?id=123"
```

### Send Text Input

```bash
# Send text (requires app to be focused)
xcrun simctl spawn booted simctl type "Hello World"
```

### Hardware Buttons

```bash
# Simulate home button press
xcrun simctl spawn booted simctl press home

# Note: Other hardware buttons require UI automation or accessibility APIs
```

---

## File Operations

### Copy Files to Simulator

```bash
# Copy file to documents directory
xcrun simctl addmedia booted /path/to/photo.jpg

# Copy to specific app container
xcrun simctl install booted /path/to/MyApp.app
doc_path=$(xcrun simctl get_app_container booted com.example.myapp documents)
cp /path/to/file.txt "$doc_path/"
```

### Access App Data

```bash
# Get app container paths
xcrun simctl get_app_container booted com.example.myapp app
xcrun simctl get_app_container booted com.example.myapp data
xcrun simctl get_app_container booted com.example.myapp groups
xcrun simctl get_app_container booted com.example.myapp documents

# List app files
ls -la $(xcrun simctl get_app_container booted com.example.myapp documents)
```

---

## Fastlane Snapshot Integration

### Run Snapshot Tests

```bash
# Run all snapshot tests
bundle exec fastlane snapshot

# Run for specific devices
bundle exec fastlane snapshot --devices "iPhone 17 Pro Max"

# Run specific language
bundle exec fastlane snapshot --languages "en-US"
```

### Snapshot Configuration

```ruby
# fastlane/Snapfile
devices([
  "iPhone 17 Pro Max",
  "iPhone 15 Plus",
  "iPad Pro (12.9-inch) (6th generation)"
])

languages([
  "en-US"
])

output_directory("./fastlane/screenshots")
clear_previous_screenshots(true)
```

---

## Common Workflows

### Full Screenshot Sequence

```bash
#!/bin/bash
set -e

DEVICE="iPhone 17 Pro Max"
APP_BUNDLE="com.example.myapp"
OUTPUT_DIR="./screenshots"

# Setup
mkdir -p "$OUTPUT_DIR"
xcrun simctl boot "$DEVICE" 2>/dev/null || true
xcrun simctl bootstatus "$DEVICE" -b > /dev/null 2>&1

# Reset state
xcrun simctl uninstall booted "$APP_BUNDLE" 2>/dev/null || true
xcrun simctl install booted ./build/MyApp.app

# Light mode screenshots
xcrun simctl ui booted appearance light
xcrun simctl launch booted "$APP_BUNDLE"
sleep 2
xcrun simctl io booted screenshot "$OUTPUT_DIR/01-home-light.png"

# Dark mode screenshots
xcrun simctl ui booted appearance dark
xcrun simctl terminate booted "$APP_BUNDLE"
xcrun simctl launch booted "$APP_BUNDLE"
sleep 2
xcrun simctl io booted screenshot "$OUTPUT_DIR/02-home-dark.png"

echo "Screenshots saved to $OUTPUT_DIR"
```

### Automated UI Test with Screenshots

```bash
#!/bin/bash
set -e

# Boot simulator
xcrun simctl boot "iPhone 17 Pro Max" 2>/dev/null || true
xcrun simctl bootstatus "iPhone 17 Pro Max" -b > /dev/null 2>&1

# Run UI tests with screenshot capture
xcodebuild test \
  -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppUITests/ScreenshotTests
```

---

## Troubleshooting

### Simulator Won't Boot

```bash
# Shutdown all simulators first
xcrun simctl shutdown all

# Boot specific device
xcrun simctl boot "iPhone 17 Pro Max"

# If still failing, erase and recreate
xcrun simctl erase "iPhone 17 Pro Max"
xcrun simctl boot "iPhone 17 Pro Max"
```

### Screenshot Fails

```bash
# Ensure simulator is booted
xcrun simctl list devices | grep "Booted"

# Try explicit device instead of 'booted'
xcrun simctl io "iPhone 17 Pro Max" screenshot test.png

# Check permissions
ls -la ~/Library/Developer/CoreSimulator/Devices/
```

### App Won't Install

```bash
# Check app bundle exists and is valid
ls -la /path/to/MyApp.app

# Check bundle ID matches
plutil -p /path/to/MyApp.app/Info.plist | grep CFBundleIdentifier

# Try uninstall first
xcrun simctl uninstall booted com.example.myapp
xcrun simctl install booted /path/to/MyApp.app
```

### Performance Issues

```bash
# Check simulator processes
ps aux | grep -i simulator

# Kill stuck simulators
killall -9 Simulator
killall -9 com.apple.CoreSimulator.SimulatorTrampoline

# Reset all simulators (nuclear)
xcrun simctl erase all
```

---

## Best Practices

1. **Use device names, not UDIDs** in scripts — UDIDs vary between machines
2. **Always use `bootstatus -b`** to wait for boot completion before operations
3. **Reset app state** between screenshot captures for consistency
4. **Use `booted`** alias for the currently booted device
5. **Commit ASC screenshots** to git; keep verification screenshots git-ignored
6. **Set status bar** to 9:41 AM for professional screenshots (iOS 25 and below)
7. **Use dual-path architecture** — separate committed ASC assets from debug captures
8. **Automate with scripts** — manual simulator operations are error-prone

---

## See Also

- `ios-build` — Build validation and XcodeGen
- `ios-standards` — Swift 6 concurrency patterns
- `ios-test` — Testing patterns and UI automation

<!-- END SKILL: ios-simulate -->

---

<!-- BEGIN SKILL: ios-standards -->

# ios-standards

# iOS Standards

Swift 6.0+ patterns, strict concurrency, and modern SwiftUI architecture. **Apply these patterns to all iOS code.**

## ☠️ ULTIMATE RULE

**NEVER KEEP MULTIPLE VERSIONS OF A FEATURE IN CODE** (`v2Enabled`, `legacyMode`, `newFlow`, etc.). When replacing a feature, replace it. Delete the old path. Systematic modular variants (enum injection, DI, strategy protocols) are allowed; inline boolean forks are forbidden.

---

## Swift 6 Concurrency

### @MainActor Isolation

All UI-related code must be `@MainActor` isolated.

```swift
// WRONG — not MainActor isolated
class TimerViewModel: ObservableObject {
    @Published var timeRemaining: TimeInterval = 0
}

// RIGHT — @MainActor isolated
@MainActor
@Observable
class TimerViewModel {
    var timeRemaining: TimeInterval = 0
}
```

#### Common Patterns

```swift
// ViewModels — always @MainActor
@MainActor
@Observable
class MyViewModel {
    var state: AppState = .idle
    
    func updateUI() {
        // Safe to touch UI state
    }
}

// Services that touch UI — @MainActor
@MainActor
final class NotificationService {
    func showNotification() {
        // UIKit calls require MainActor
    }
}

// Services that don't touch UI — no annotation needed
final class AnalyticsService {
    func track(event: String) async {
        // Background-safe work
    }
}
```

### @Observable (Not ObservableObject)

Use the new Observation framework, not Combine.

```swift
// WRONG — old pattern
import Combine

class OldViewModel: ObservableObject {
    @Published var count = 0
}

// RIGHT — Swift 6 pattern
import Observation

@MainActor
@Observable
class NewViewModel {
    var count = 0  // No @Published needed
}
```

#### Using in Views

```swift
import SwiftUI

struct MyView: View {
    @Environment(MyViewModel.self) private var viewModel
    // @StateObject no longer needed for @Observable
    
    var body: some View {
        Text("\(viewModel.count)")
    }
}
```

### Sendable Conformance

Types crossing isolation boundaries must be Sendable.

```swift
// Value types are automatically Sendable
struct Settings: Sendable {
    var duration: TimeInterval
    var soundEnabled: Bool
}

// Classes must explicitly conform
final class UserPreferences: @unchecked Sendable {
    // @unchecked because we manually ensure thread safety
    private let lock = NSLock()
    private var _value: Int = 0
}

// Enums are automatically Sendable
enum TimerState: Sendable {
    case idle
    case running(startTime: Date)
    case paused(elapsed: TimeInterval)
}
```

### @preconcurrency Import

Use for Apple frameworks that haven't added Sendable yet.

```swift
// WRONG — compiler warnings about non-Sendable types
import EventKit

// RIGHT — suppress warnings at framework boundary
@preconcurrency import EventKit

@MainActor
final class RemindersService {
    private let store = EKEventStore()  // Non-Sendable, but safe here
}
```

Common frameworks needing @preconcurrency (complete list as of iOS 26):
- `EventKit` (EKEventStore, EKReminder)
- `HealthKit` (HKHealthStore, HKSample)
- `Speech` (SFSpeechRecognizer, SFSpeechRecognitionResult)
- `AVFoundation` (AVAudioEngine, AVCaptureSession)
- `VideoToolbox` (VTCompressionSession)
- `SwiftData` (@Model types are NOT Sendable)
- `ActivityKit` (Live Activity types)
- `Vision` (VNRequest types)
- `CoreLocation` (CLLocationManager)
- `CoreData` (NSManagedObject NOT Sendable, NSManagedObjectContext IS Sendable — Beta 5)
- `UIKit` (some types)

### Actor Isolation

Use actors for shared mutable state:

```swift
actor TimerStateStore {
    private var sessions: [UUID: TimerSession] = [:]
    
    func addSession(_ session: TimerSession) {
        sessions[session.id] = session
    }
    
    func getSession(id: UUID) -> TimerSession? {
        sessions[id]
    }
}

// Usage
let store = TimerStateStore()
await store.addSession(session)
let session = await store.getSession(id: uuid)
```

### nonisolated(unsafe)

Last resort for non-Sendable state in @MainActor classes:

```swift
@MainActor
@Observable
class ViewModel {
    // Safe because ViewModel is @MainActor
    private nonisolated(unsafe) var cancellables: Set<AnyCancellable> = []
}
```

### @MainActor Class-Level vs Method-Level

**Critical for AVAudioEngine, SpeechTranscriber, and other hardware-interfacing classes:**

```swift
// WRONG — class-level @MainActor causes crashes with AVAudioEngine/Speech
@MainActor
final class SpeechService {
    private let audioEngine = AVAudioEngine()  // Crashes on initialization
    private let transcriber = SpeechTranscriber(locale: Locale(identifier: "en-US"))
}

// RIGHT — method-level @MainActor for hardware-interfacing services
final class SpeechService {
    private let audioEngine = AVAudioEngine()
    private let transcriber = SpeechTranscriber(locale: Locale(identifier: "en-US"))
    
    @MainActor
    func startRecording() async {
        // UI-related work on MainActor
    }
    
    func processAudio() async {
        // Audio processing off MainActor
    }
}
```

**When to use class-level vs method-level:**

| Use Class-Level | Use Method-Level |
|-----------------|------------------|
| Pure SwiftUI ViewModels | Services with AVAudioEngine |
| UI-only services | Speech framework services |
| No hardware/framework initialization | Services with heavy I/O |

### nonisolated deinit (MANDATORY for @MainActor classes)

All `@MainActor` classes (explicit or via `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`) that have a `deinit` MUST use `nonisolated deinit`. This is an Apple-confirmed known issue — accessing MainActor state from deinit causes crashes.

```swift
// WRONG — crashes on deallocation
@MainActor
class CameraService {
    deinit {
        captureSession.stopRunning()  // CRASH
    }
}

// CORRECT
@MainActor
class CameraService {
    nonisolated deinit {
        // Do NOT access @MainActor properties
        // Only non-isolated cleanup (VTCompressionSessionInvalidate, etc.)
    }
    
    func cleanup() {
        // Call this explicitly before deallocation for MainActor cleanup
        captureSession.stopRunning()
    }
}
```

### FoundationModels Availability Check (MANDATORY)

Never hardcode `isAvailable = true`. Always check at runtime:

```swift
// WRONG — crashes on non-AI devices (iPhone 15 and below)
var isAvailable: Bool { true }

// CORRECT
import FoundationModels
var isAvailable: Bool { SystemLanguageModel.default.isAvailable }
```

There is NO static `isAvailable` on `LanguageModelSession`. Check via `SystemLanguageModel.default`.

### Nested @MainActor Classes and Deallocation

**Critical:** Nested `@MainActor` classes can corrupt task-local storage during deallocation:

```swift
// WRONG — nested @MainActor classes cause deallocation crashes
@MainActor
final class OuterViewModel {
    private let inner = InnerService()  // Also @MainActor
    
    deinit {
        // SIGABRT: task-local storage corruption
    }
}

@MainActor
final class InnerService { }

// RIGHT — avoid nesting @MainActor classes as stored properties
@MainActor
final class OuterViewModel {
    private let inner: InnerServiceProtocol
    
    init(inner: InnerServiceProtocol) {
        self.inner = inner
    }
}

// Use protocol to break the nesting
protocol InnerServiceProtocol: Sendable { }

final class InnerService: InnerServiceProtocol {
    // Not @MainActor — breaks the nesting chain
}
```

**Testing implication:** Tests for `@MainActor` classes should be `async` to provide proper task context:

```swift
// WRONG — synchronous test causes deallocation crash
func test_viewModel() {
    let vm = MyViewModel()  // Crash on dealloc
}

// RIGHT — async test provides task context
func test_viewModel() async {
    let vm = MyViewModel()
    // Test code
}
```

### SwiftData @Model Objects and Async Boundaries

**Critical:** `@Model` objects must not cross async boundaries directly:

```swift
// WRONG — @Model object crosses async boundary
func processSession(_ session: FocusSession) async {
    // session is @Model — crossing async boundary causes data race
    await backgroundProcessor.process(session)
}

// RIGHT — extract scalar values before crossing
func processSession(_ session: FocusSession) async {
    let sessionID = session.id
    let duration = session.duration
    
    // Pass scalars, not the @Model object
    await backgroundProcessor.process(id: sessionID, duration: duration)
}
```

### NotificationCenter with @MainActor

Even with `queue: .main`, NotificationCenter callbacks need explicit MainActor:

```swift
// WRONG — NotificationCenter closure not on MainActor
@MainActor
final class ViewModel {
    init() {
        NotificationCenter.default.addObserver(
            forName: .sessionCompleted,
            object: nil,
            queue: .main  // Still not sufficient!
        ) { [weak self] _ in
            self?.updateUI()  // Not on MainActor!
        }
    }
}

// RIGHT — wrap in Task { @MainActor in }
@MainActor
final class ViewModel {
    init() {
        NotificationCenter.default.addObserver(
            forName: .sessionCompleted,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor [weak self] in
                self?.updateUI()
            }
        }
    }
}
```

---

## Common Concurrency Patterns

### Background Task with MainActor Result

```swift
func loadData() async {
    // Background work
    let data = await fetchFromNetwork()
    
    // Update UI on MainActor
    await MainActor.run {
        self.data = data
    }
}
```

### Task with Correct Isolation

```swift
// WRONG — Task inherits isolation, can cause crashes
func start() {
    Task {
        await updateUI()  // Might not be on MainActor
    }
}

// RIGHT — explicit MainActor
func start() {
    Task { @MainActor in
        await updateUI()
    }
}

// RIGHT — use detached if needed (rare)
func start() {
    Task.detached { @MainActor in
        await updateUI()
    }
}
```

### Task { @MainActor [weak self] } Pattern

**Critical pattern for preventing crashes in @MainActor classes:**

```swift
// WRONG — Task captures self without proper isolation
@MainActor
final class TimerService {
    func startTimer() {
        Task { [weak self] in  // Missing @MainActor!
            while let self = self {
                await self.tick()  // Crash: deallocation race
            }
        }
    }
}

// RIGHT — explicit @MainActor with [weak self]
@MainActor
final class TimerService {
    func startTimer() {
        Task { @MainActor [weak self] in
            while let self = self {
                await self.tick()  // Safe: proper isolation
            }
        }
    }
}
```

**Why this matters:** Without `@MainActor` on the Task closure, the Task runs non-isolated. When the `@MainActor` class is deallocated, the non-isolated Task accessing it causes memory corruption.

### Async Stream with Isolation

```swift
@MainActor
final class SpeechService {
    private var transcriptionTask: Task<Void, Never>?
    
    func startRecording() {
        transcriptionTask = Task { @MainActor [weak self] in
            guard let transcriber = self?.transcriber else { return }
            for await result in transcriber.results {
                // Already on MainActor
                self?.handleResult(result)
            }
        }
    }
}
```

---

## SwiftData Integration

### Model Definition

```swift
import SwiftData

@Model
final class FocusSession {
    var startDate: Date
    var duration: TimeInterval
    var isCompleted: Bool
    
    // Relationship with cascade delete
    @Relationship(deleteRule: .cascade, inverse: \CapturedThought.session)
    var captures: [CapturedThought]?
    
    init(startDate: Date, duration: TimeInterval) {
        self.startDate = startDate
        self.duration = duration
        self.isCompleted = false
    }
}

@Model
final class CapturedThought {
    var text: String
    var timestamp: Date
    
    // Back reference
    var session: FocusSession?
    
    init(text: String, timestamp: Date = Date()) {
        self.text = text
        self.timestamp = timestamp
    }
}
```

### ModelContainer Setup

```swift
import SwiftData

@MainActor
final class DataController {
    let container: ModelContainer
    
    init() {
        let schema = Schema([FocusSession.self, CapturedThought.self])
        let config = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false
        )
        
        do {
            container = try ModelContainer(
                for: schema,
                configurations: config
            )
        } catch {
            fatalError("Could not create container: \(error)")
        }
    }
}
```

### Using in ViewModels

```swift
@MainActor
@Observable
class SessionsViewModel {
    private let modelContext: ModelContext
    private(set) var sessions: [FocusSession] = []
    
    init(modelContext: ModelContext) {
        self.modelContext = modelContext
    }
    
    func loadSessions() async {
        let descriptor = FetchDescriptor<FocusSession>(
            sortBy: [SortDescriptor(\.startDate, order: .reverse)]
        )
        
        do {
            sessions = try modelContext.fetch(descriptor)
        } catch {
            // Handle error
        }
    }
}
```

---

## Service Architecture

### Singleton Pattern

```swift
@MainActor
final class HapticsService {
    static let shared = HapticsService()
    
    private let feedbackGenerator = UIImpactFeedbackGenerator(style: .medium)
    
    private init() {
        feedbackGenerator.prepare()
    }
    
    func playTap() {
        feedbackGenerator.impactOccurred()
    }
}
```

### Protocol-Based Services (for Testing)

```swift
protocol NotificationServiceProtocol: Sendable {
    func scheduleNotification(at date: Date, title: String, body: String) async
}

@MainActor
final class NotificationService: NotificationServiceProtocol {
    static let shared = NotificationService()
    
    func scheduleNotification(at date: Date, title: String, body: String) async {
        // Implementation
    }
}
```

---

## Build Configuration

### Strict Concurrency

Enable in project settings or project.yml:

```yaml
# project.yml
settings:
  SWIFT_STRICT_CONCURRENCY: complete
  SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
```

### Critical Build Rule

> **Debug/simulator builds do NOT catch all strict concurrency errors.** Archive builds use `-O` optimization which enforces full isolation checking. Always run archive builds before committing.

```bash
# Debug build — misses some errors
xcodebuild -scheme MyApp -destination 'platform=iOS Simulator' build

# Archive build — catches all concurrency errors
xcodebuild -scheme MyApp -destination 'generic/platform=iOS' archive
```

---

## Quick Reference: Common Fixes

| Error | Fix |
|-------|-----|
| `Call to main actor-isolated instance method in a synchronous nonisolated context` | Add `@MainActor` to the class/method, or use `await MainActor.run` |
| `Non-sendable type returned by call crossing isolation boundary` | Use `@preconcurrency import`, or extract Sendable values before crossing |
| `Reference to captured var in concurrently-executing code` | Use `[weak self]` and check for nil, or capture values instead |
| `Task or actor-isolated value used in nonisolated context` | Use `@MainActor` on Task closure, or mark property `nonisolated(unsafe)` |
| `ObservableObject conformance warning` | Switch to `@Observable` macro |
| SIGABRT in dealloc with nested @MainActor classes | Avoid nesting @MainActor classes as stored properties; use protocols |
| @MainActor class deinit crash | Use `nonisolated deinit`, move cleanup to explicit `func cleanup()` |
| `MainActor.assumeIsolated` fatal error | Only use from guaranteed main-thread code; else `Task { @MainActor in }` |
| Sheet continuation double-resume | Synchronous completion, nil handler before dismiss triggers onDismiss |
| FoundationModels crash on non-AI device | Use `SystemLanguageModel.default.isAvailable`, never hardcode `true` |
| @Model property missing default value | Add default: `var name: String = ""` or make Optional |
| AVAudioEngine/SpeechTranscriber crash on init | Use method-level @MainActor, not class-level |
| SwiftData @Model data race | Extract scalars before crossing async boundaries |
| Test crashes on ViewModel dealloc | Make tests `async` to provide proper task context |

---

## Deep References (Load on Demand)

When encountering framework-specific crashes or API issues beyond these standards, load the matching essentials file from `ios26-api-reference`:

| Framework | Load |
|-----------|------|
| Swift 6 concurrency | `ios26-api-reference/essentials/swift6.md` |
| SwiftUI + Liquid Glass | `ios26-api-reference/essentials/swiftui.md` |
| SwiftData + @Model | `ios26-api-reference/essentials/swiftdata.md` |
| FoundationModels | `ios26-api-reference/essentials/foundation-models.md` |
| Speech + Audio | `ios26-api-reference/essentials/speech.md` + `essentials/avfoundation.md` |
| Widgets / Live Activities | `ios26-api-reference/essentials/widgets.md` |
| App Intents | `ios26-api-reference/essentials/app-intents.md` |

Essentials contain corrected API signatures and crash prevention patterns. For deep debugging, also load the corresponding `reference/` and `guides/` files.

## See Also

- `ios26-api-reference` — iOS 26 API signatures, crash patterns, and corrected APIs (3-tier: essentials → reference → guides)
- `ios-build` — Build validation workflow
- `ios-test` — Testing with Swift 6 concurrency

<!-- REFERENCE: ios-standards/build-config.md -->

# Build Configuration Standards

> For project.yml, target embedding, and XcodeGen configuration.

## Watch App Embedding

### The Golden Rule: Scheme Separation, Not Target Dependency

**CRITICAL**: Never add Watch target to iOS target dependencies. This breaks local simulator builds.

Use **scheme separation** instead:

```yaml
# ❌ WRONG — Breaks local simulator builds
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch        # DON'T DO THIS
        embed: true
        codeSign: false

# ✅ CORRECT — Separate schemes for different contexts
schemes:
  MyApp-iOS:                    # For local development
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all      # Widgets OK (same platform)
        # NO Watch target here

  MyApp-iOS-Archive:            # For Xcode Cloud / distribution
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all
        MyApp-Watch: all        # Watch included in archive scheme
        MyApp-WatchComplication: all
    archive:
      config: Release
```

**Why**: Watch apps use watchOS SDK, iOS uses iOS SDK. You can't build both for iOS simulator. Xcode Cloud builds for device and can compile both.

### Watch App as Plugins (When You DO Embed)

If you must embed (legacy projects only), use `plugins` destination:

```yaml
# Legacy only — modern projects use scheme separation
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch
        embed: true
        codeSign: false
        buildPhase:
          copyFiles:
            destination: plugins
```

**Why**: Foundation extensions must be in the Plugins directory. Xcode warns: *"Foundation extension must be embedded in the parent app bundle's Plugins directory"*.

## Widget Extension Embedding

Widgets are iOS extensions, so they CAN be in iOS target dependencies:

```yaml
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Widgets
        embed: true
        codeSign: false
        buildPhase:
          copyFiles:
            destination: plugins
```

## Complete Project Structure

```yaml
name: MyApp
targets:
  MyApp-iOS:
    type: application
    platform: iOS
    sources:
      - path: Sources
    dependencies:
      - package: MyAppKit
      - target: MyApp-Widgets      # OK: iOS extension
        embed: true
        codeSign: false
        buildPhase:
          copyFiles:
            destination: plugins
      # NO Watch target dependency!

  MyApp-Watch:
    type: application
    platform: watchOS
    sources:
      - path: Watch/Sources

  MyApp-Widgets:
    type: app-extension
    platform: iOS
    sources:
      - path: Widgets/Sources

schemes:
  MyApp-iOS:
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all
    run:
      config: Debug
    test:
      config: Debug

  MyApp-iOS-Archive:
    build:
      targets:
        MyApp-iOS: all
        MyApp-Widgets: all
        MyApp-Watch: all
    archive:
      config: Release

  MyApp-Watch:
    build:
      targets:
        MyApp-Watch: all
```

## Build Commands

### Local Development (No Watch)

```bash
# Fast, simulator builds
xcodegen generate && xcodebuild \
  -project MyApp.xcodeproj \
  -scheme MyApp-iOS \
  -sdk iphonesimulator \
  -configuration Debug \
  build
```

### Archive for Distribution (Includes Watch)

```bash
# Archive for TestFlight/App Store
xcodegen generate && xcodebuild archive \
  -project MyApp.xcodeproj \
  -scheme MyApp-iOS-Archive \
  -destination generic/platform=iOS \
  -archivePath /tmp/MyApp.xcarchive
```

## Xcode Cloud Configuration

In App Store Connect:

1. **Primary scheme**: `MyApp-iOS-Archive`
2. **Additional schemes**: Add `MyApp-Watch`

The Watch app will be built and automatically embedded.

## Adding New Frameworks

```yaml
# In target dependencies section
dependencies:
  - sdk: HealthKit.framework
  - sdk: EventKit.framework
  # Add @preconcurrency import in source files
```

## Build Settings for Swift 6

```yaml
targets:
  MyApp-iOS:
    settings:
      base:
        SWIFT_VERSION: "6.0"
        SWIFT_STRICT_CONCURRENCY: complete
        SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor
        IPHONEOS_DEPLOYMENT_TARGET: "26.0"
```

## Build Verification

After project.yml changes:

```bash
# 1. Local build (should pass)
xcodegen generate && xcodebuild -scheme MyApp-iOS \
  -sdk iphonesimulator -configuration Debug \
  build 2>&1 | grep -E "error:|warning:"

# 2. Archive build (should pass)
xcodegen generate && xcodebuild archive \
  -scheme MyApp-iOS-Archive \
  -destination generic/platform=iOS \
  -archivePath /tmp/MyApp.xcarchive \
  CODE_SIGNING_ALLOWED=NO
```

## Anti-Patterns to Avoid

### ❌ The Cycle Pattern

```yaml
# This causes the local/Xcode Cloud cycle
targets:
  MyApp-iOS:
    dependencies:
      - target: MyApp-Watch    # Breaks local simulator builds!
```

**Symptoms**:
- Local build: "Unable to find module dependency: 'WatchKit'"
- Xcode Cloud: Build succeeds but no Watch app in archive

**Fix**: Use scheme separation (see above).

### ❌ Conditional Script Workarounds

```yaml
# Don't use shell scripts to work around embedding
preBuildScripts:
  - script: |
      # Fragile, breaks on Xcode updates
      if [ "$PLATFORM_NAME" = "iphonesimulator" ]; then ...
```

**Fix**: Scheme separation handles this natively.

## Extension & Watch Target Gotchas

### Extension Targets Need SKIP_INSTALL: true

Without this, `xcodebuild archive` tries to export extensions as standalone apps, causing export failures.

```yaml
# project.yml
targets:
  MyApp-Widgets:
    type: app-extension
    platform: iOS
    settings:
      base:
        SKIP_INSTALL: true    # Required for all extension targets
    sources:
      - path: Widgets/Sources
```

This applies to **all** extension types: widget extensions, intents extensions, notification extensions, watch complications, etc.

### watchOS Apps Need Their Own Assets.xcassets

Without a platform-specific icon set, "Preparing build for App Store Connect" fails silently or with a cryptic asset validation error.

Create `Watch/Assets.xcassets/AppIcon.appiconset/Contents.json` with the watchOS platform:

```json
{
  "images" : [
    {
      "idiom" : "universal",
      "platform" : "watchos",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
```

Reference it in `project.yml`:

```yaml
targets:
  MyApp-Watch:
    type: application
    platform: watchOS
    sources:
      - path: Watch/Sources
      - path: Watch/Assets.xcassets    # Must contain watchos icon set
    settings:
      base:
        ASSETCATALOG_COMPILER_APPICON_NAME: AppIcon
```

### CFBundleIconName Required in Static Info.plist

Auto-generated plists include `CFBundleIconName` automatically. If you use a static `Info.plist` (e.g., for entitlements or custom keys), you must add it manually — otherwise the app icon won't appear and App Store Connect may reject the build.

```xml
<!-- Info.plist -->
<key>CFBundleIconName</key>
<string>AppIcon</string>
```

Or in `project.yml` using `plist` settings:

```yaml
targets:
  MyApp-iOS:
    info:
      properties:
        CFBundleIconName: AppIcon
```

## Quick Self-Check

- [ ] Watch target is NOT in iOS target dependencies
- [ ] `MyApp-iOS` scheme exists for local development
- [ ] `MyApp-iOS-Archive` scheme exists with Watch target
- [ ] `MyApp-Watch` scheme exists for standalone Watch builds
- [ ] Widget targets have `destination: plugins`
- [ ] `xcodegen generate` run after changes
- [ ] Local build passes: `xcodebuild -scheme MyApp-iOS -sdk iphonesimulator`
- [ ] Archive build passes: `xcodebuild archive -scheme MyApp-iOS-Archive`
- [ ] Swift version set to 6.0
- [ ] Deployment target matches minimum iOS version
- [ ] Extension targets have `SKIP_INSTALL: true`
- [ ] watchOS app has own `Assets.xcassets` with `platform: watchos` icon set
- [ ] Static `Info.plist` files include `CFBundleIconName: AppIcon`

## Reference

- **Related**: See `BUILD_ARCHITECTURE.md` in your project for specific implementation
- **Pattern**: Scheme separation for multi-platform apps
- **Version**: 2026-03-24 (updated for Xcode 16.3, watchOS 26)

<!-- REFERENCE: ios-standards/concurrency.md -->

# Concurrency Standards

> For Swift 6 concurrency in iOS development.

## Critical Rules

### 1. SwiftUI Views Are Structs — No [weak self]

**CHECKLIST**: Any closure in a View body using `[weak self]`?

```swift
// ❌ WRONG — View is a struct
struct MyView: View {
    @State private var service = MyService()

    func load() {
        service.start { [weak self] result in
            self?.handle(result)  // Error: 'weak' only for class types
        }
    }
}

// ✅ CORRECT — Direct capture + MainActor dispatch
struct MyView: View {
    @State private var service = MyService()

    func load() {
        service.start { result in
            Task { @MainActor in
                handle(result)  // 'self' not needed in struct
            }
        }
    }
}
```

### 2. @Sendable Closures Cannot Touch MainActor State

**CHECKLIST**: Any `@Sendable` closure modifying `@State`, `@ObservedObject`, or calling MainActor methods?

```swift
// ❌ WRONG — @Sendable closure captures MainActor-isolated state
Delay.after(0.5) { @Sendable in
    showToast = true  // Error: Main actor-isolated property
}

// ✅ CORRECT — Bridge to MainActor via Task
Delay.after(0.5) { @Sendable in
    Task { @MainActor in
        showToast = true
    }
}
```

### 3. Non-Sendable Types in Async Contexts

**CHECKLIST**: Any SwiftData model (`@Model` class) captured in `@Sendable` closure or passed across isolation boundaries?

```swift
// ❌ WRONG — Capturing non-Sendable model
let thought = CapturedThought(text: "...")
Delay.after(0.5) { @Sendable in
    capturedThought = thought  // Error: non-Sendable type
}

// ✅ CORRECT — Capture ID, fetch in Task
let thoughtID = thought.id
Delay.after(0.5) { @Sendable in
    Task { @MainActor in
        if let thought = try? modelContext.fetch(
            FetchDescriptor<CapturedThought>(
                predicate: #Predicate { $0.id == thoughtID }
            )
        ).first {
            capturedThought = thought
        }
    }
}
```

### 4. Sendable Structs with Stored Properties (Archive Build Killer)

**CHECKLIST**: Any `Sendable` struct with stored properties accessed from `nonisolated` methods?

With `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`, ALL stored properties become implicitly `@MainActor`. If the struct's methods are `nonisolated`, the compiler will reject property access — but **only in archive/release builds**, not debug simulator builds. This is the #1 cause of CI failures.

```swift
// ❌ WRONG — embedding is implicitly @MainActor, nonisolated methods can't access it
struct SemanticMatcher: Sendable {
    private let embedding: NLEmbedding?  // Implicitly @MainActor!

    nonisolated func match(text: String) -> Bool {
        guard let embedding = self.embedding else { return false }
        // ^^^^ Error: Main actor-isolated property 'embedding' cannot be
        //      referenced from a nonisolated context
        return embedding.contains(text)
    }
}

// ✅ CORRECT — nonisolated(unsafe) opts out of MainActor isolation
struct SemanticMatcher: Sendable {
    nonisolated(unsafe) private let embedding: NLEmbedding?

    nonisolated func match(text: String) -> Bool {
        guard let embedding = self.embedding else { return false }
        return embedding.contains(text)
    }
}
```

**Rule**: On any `Sendable` struct/class where methods are `nonisolated`, stored properties that those methods access MUST be `nonisolated(unsafe)`.

**Why debug builds don't catch this**: Simulator builds use `-Onone` (no optimization), which relaxes some isolation checks. Archive builds use `-O` (optimized) with full strict concurrency enforcement. The archive/debug divergence is the **#1 cause of Xcode Cloud failures**.

### 4a. `nonisolated` vs `nonisolated(unsafe)` — Know the Difference

These two annotations solve different problems. Using the wrong one compiles in debug but fails in archive.

| Annotation | Use For | Safety |
|------------|---------|--------|
| `nonisolated` | Immutable `let` properties, pure methods that don't touch isolated state | Fully checked by the compiler |
| `nonisolated(unsafe)` | Mutable `var` stored properties on `Sendable` types that need cross-isolation access | Unchecked — you are asserting thread safety yourself |

```swift
struct Config: Sendable {
    // ✅ nonisolated is enough — immutable let, compiler can verify safety
    nonisolated let id: String

    // ❌ WRONG — var requires nonisolated(unsafe), not plain nonisolated
    nonisolated var retryCount: Int  // Archive error: stored property must be immutable

    // ✅ CORRECT — var on Sendable type needs nonisolated(unsafe)
    nonisolated(unsafe) var retryCount: Int
}

@MainActor
@Observable
class MyService {
    // ✅ nonisolated(unsafe) for the static singleton (mutable storage)
    nonisolated(unsafe) static let shared = MyService()

    // ✅ nonisolated is fine for pure computed properties / methods
    nonisolated func computeHash() -> Int { return 42 }
}
```

**Decision guide**:
1. Is it a `let` property or a method that doesn't access isolated state? Use `nonisolated`.
2. Is it a `var` stored property on a `Sendable` type? Use `nonisolated(unsafe)`.
3. Not sure? Try `nonisolated` first — if archive builds reject it, upgrade to `nonisolated(unsafe)`.

### 5. Service Singleton Pattern

**CHECKLIST**: New services using correct singleton pattern?

```swift
@MainActor
@Observable
class MyService {
    // This is the pattern — nonisolated(unsafe) for shared instance
    nonisolated(unsafe) static let shared = MyService()

    private init() {}

    // Methods are MainActor-isolated by default
    func doWork() { }

    // Explicitly nonisolated for thread-safe operations
    nonisolated func compute() -> Int { return 42 }
}
```

### 6. Framework Imports

**CHECKLIST**: Are `@preconcurrency` imports added ONLY where the compiler specifically demands them?

> **Reversed guidance (2026-04-03):** iOS 26 first-party frameworks (AVFoundation, Speech, EventKit, Vision, SwiftData, ActivityKit, etc.) now ship with full Sendable annotations. Prophylactic `@preconcurrency` masks real concurrency issues that surface as archive crashes. Cadence removed `@preconcurrency` from 10 files and crashes stopped.

```swift
// ❌ WRONG — do not add prophylactically
@preconcurrency import Speech
@preconcurrency import EventKit
@preconcurrency import AVFoundation

// ✅ CORRECT — add only where the compiler specifically demands it
import Speech
import EventKit
import AVFoundation
@preconcurrency import SomeLegacyBinaryFramework  // Compiler demanded this
```

## Common Patterns

### Async Stream with MainActor Updates

```swift
Task {
    for try await result in asyncSequence {
        await MainActor.run {
            // Update UI state here
        }
    }
}
```

### Completion Handlers that Bridge Isolation

```swift
func fetchData(completion: @escaping @Sendable (Result<Data, Error>) -> Void) {
    // Work happens on background queue
    Task {
        let result = await performWork()
        // Completion is @Sendable, so result must be Sendable
        completion(result)
    }
}

// Usage in View:
fetchData { result in
    Task { @MainActor in
        switch result {
        case .success(let data): self.data = data
        case .failure(let error): self.error = error
        }
    }
}
```

## Quick Self-Check

Before finishing concurrency code, verify:

- [ ] No `[weak self]` in View structs
- [ ] All `@Sendable` closures that touch state use `Task { @MainActor in }`
- [ ] SwiftData models captured by ID, not by reference
- [ ] Sendable structs with `nonisolated` methods use `nonisolated(unsafe)` on stored properties
- [ ] `nonisolated` used for immutable `let` / pure methods; `nonisolated(unsafe)` used for mutable `var` stored properties
- [ ] Services use `nonisolated(unsafe) static let shared`
- [ ] Speech/EventKit imports use `@preconcurrency`

<!-- REFERENCE: ios-standards/review-checklist.md -->

# Review Checklist

> Systematic validation for all iOS code changes. Load this module when asked to "review" or "check" code.

## Cross-Cutting Checks

### 1. Build Verification

**MUST PASS** before any code is considered valid:

```bash
# Simulator build (fast, catches most errors)
xcodegen generate && xcodebuild -scheme <YourScheme> \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  build 2>&1 | grep -E "error:|warning:.*concurrency|warning:.*deprecated|warning:.*never used"
```

Expected output: **Empty** (no errors, no concurrency warnings, no deprecation warnings, no unused variable warnings)

### 1b. Archive Verification (catches CI failures)

**CRITICAL**: Run archive builds to catch MainActor isolation errors that simulator builds miss:

```bash
# Archive build (slower, catches strict concurrency errors)
xcodebuild -scheme <YourScheme> -configuration Release \
  -destination 'generic/platform=iOS' archive
```

**Why**: Debug/simulator builds use `-Onone` which relaxes isolation checks. Archive builds use `-O` with full strict concurrency enforcement.

### 2. Every SwiftUI File Has Preview

**CHECK**: Does the file contain `#Preview`?

```swift
// Required pattern
#Preview("Description") {
    MyView()
}

// Or with environment setup
#Preview {
    PreviewContainer {
        MyView()
    }
}
```

### 3. No Hardcoded Design Values

**CHECK**: Any raw numbers for colors, spacing, or fonts?

| Wrong | Correct |
|-------|---------|
| `.padding(16)` | `.padding(Theme.Spacing.lg)` or `.padding(.lg)` |
| `.background(Color.blue)` | `.background(Theme.primary)` |
| `.cornerRadius(8)` | `.cornerRadius(Theme.Radius.medium)` |
| `.font(.title)` | `.font(Theme.Font.title)` |

### 4. Proper Error Handling

**CHECK**: Are errors silently ignored?

```swift
// ❌ WRONG — Silent failure
try? modelContext.save()

// ✅ CORRECT — At minimum, log the error
do {
    try modelContext.save()
} catch {
    errorMessage = error.localizedDescription
    logger.error("Failed to save: \(error)")
}
```

## Module-Specific Checks

### If File Contains SwiftUI Views

Load `swiftui.md` and verify:
- [ ] Uses `@Environment` for ViewModels
- [ ] ViewModels use `@Observable`, not `ObservableObject`
- [ ] Has `#Preview`
- [ ] Uses design system constants (Theme.*)

### If File Contains Async/Closures

Load `concurrency.md` and verify:
- [ ] No `[weak self]` in View structs
- [ ] `@Sendable` closures use `Task { @MainActor in }` for state
- [ ] SwiftData models captured by ID, not reference
- [ ] Services use `nonisolated(unsafe) static let shared`

### If File Contains SwiftData

Load `swiftdata.md` and verify:
- [ ] `@Model` types not captured in closures
- [ ] `modelContext` from `@Environment` in Views
- [ ] Proper `#Predicate` syntax
- [ ] New `@Model` entities or relationships have a `VersionedSchema` + `SchemaMigrationPlan`
- [ ] Test containers use full production schema (all `@Model` types) + unique URLs
- [ ] `PreviewContainer` includes all `@Model` types

**CloudKit migration safety** (if app uses CloudKit sync — see `swiftdata.md` CloudKit section):
- [ ] No `@Model` class was renamed — CRITICAL: permanent silent data loss cross-version
- [ ] No stored property was renamed — HIGH: orphaned CKRecord fields on old devices
- [ ] No raw ID → `@Relationship` change without `.custom` migration stage
- [ ] If `@Model` file changed, a `VersionedSchema` bump was included — HIGH: schema change without migration crashes on launch

### If File Uses System Frameworks

Load `ios26-apis.md` and verify:
- [ ] `AVAudioApplication` for permissions
- [ ] `@preconcurrency` imports where required
- [ ] No deprecated API warnings

## Review Output Format

When reviewing code, structure your response as:

```
## Summary
- Files reviewed: N
- Issues found: N critical, N warnings
- Build status: ✅ PASS / ❌ FAIL

## Critical Issues (MUST FIX)

### File: Path/To/File.swift
**Line X**: [Brief description]
**Rule**: [Which standard was violated]
**Fix**: [Specific code change]

```swift
// Current (wrong):
[code]

// Should be:
[code]
```

## Warnings (SHOULD FIX)
[...]

## Correct Patterns Found ✅
[Acknowledge what was done right]
```

## Pre-Commit Checklist

Before suggesting code is complete:

- [ ] Build passes with no errors
- [ ] Archive build passes (if applicable)
- [ ] No concurrency warnings
- [ ] No deprecated API warnings
- [ ] All SwiftUI files have previews
- [ ] No hardcoded design values
- [ ] Proper error handling (not silent `try?`)
- [ ] Accessibility identifiers on interactive elements

<!-- REFERENCE: ios-standards/swiftdata.md -->

# SwiftData Standards

> Patterns for models, queries, and context operations in iOS 26+.

## Critical Rules

### 1. @Model Classes Are Non-Sendable

**CHECKLIST**: Any `@Model` type being captured in closures, passed to async contexts, or stored in `@State`?

```swift
// ❌ WRONG — @Model class captured in @Sendable closure
@Model
class CapturedThought {
    // ...
}

// Elsewhere:
Delay.after(0.5) { @Sendable in
    let t = thought  // Error: non-Sendable type
}

// ✅ CORRECT — Pass by ID, fetch in destination context
let thoughtID = thought.id
Task {
    let descriptor = FetchDescriptor<CapturedThought>(
        predicate: #Predicate { $0.id == thoughtID }
    )
    if let thought = try? modelContext.fetch(descriptor).first {
        // Work with thought here
    }
}
```

### 2. ModelContext Access

**CHECKLIST**: Using `@Environment(\.modelContext)` in Views, not passing through initializers?

```swift
// ✅ CORRECT — Inject via environment
struct MyView: View {
    @Environment(\.modelContext) private var modelContext

    func save() {
        let thought = CapturedThought(text: "...")
        modelContext.insert(thought)
        try? modelContext.save()
    }
}

// ✅ CORRECT — Pass to ViewModel methods
func addCapture(_ thought: CapturedThought, modelContext: ModelContext) {
    modelContext.insert(thought)
    // ...
}
```

### 3. FetchDescriptor Patterns

**CHECKLIST**: Queries using modern `#Predicate` syntax?

```swift
// ✅ CORRECT — Modern FetchDescriptor with #Predicate
func fetchRecentCaptures() -> [CapturedThought] {
    let descriptor = FetchDescriptor<CapturedThought>(
        predicate: #Predicate { thought in
            thought.timestamp > Date().addingTimeInterval(-86400)
        },
        sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
    )
    return (try? modelContext.fetch(descriptor)) ?? []
}
```

### 4. Model Indexes

**CHECKLIST**: New `@Model` types have appropriate indexes?

```swift
@Model
@Index<CapturedThought>([\.timestamp], [\.categoryRaw, \.timestamp])
class CapturedThought {
    @Attribute(.unique) var id: UUID
    var timestamp: Date
    var categoryRaw: String
    // ...
}
```

### 5. Relationship Patterns

**CHECKLIST**: Relationships using proper inverse declarations?

```swift
@Model
class FocusSession {
    @Relationship(deleteRule: .cascade, inverse: \CapturedThought.session)
    var captures: [CapturedThought]?
}

@Model
class CapturedThought {
    var session: FocusSession?  // Inverse is declared above
}
```

## Common Operations

### Insert and Save

```swift
let thought = CapturedThought(text: text, category: category)
modelContext.insert(thought)
try? modelContext.save()
```

### Delete

```swift
modelContext.delete(thought)
try? modelContext.save()
```

### Batch Delete (for cleanup)

```swift
func deleteAll() {
    let descriptor = FetchDescriptor<CapturedThought>()
    if let thoughts = try? modelContext.fetch(descriptor) {
        for thought in thoughts {
            modelContext.delete(thought)
        }
        try? modelContext.save()
    }
}
```

### Production Service Pattern: Throws on Writes

In production code, **never silently swallow save errors**. Service-layer write methods should `throw` so callers can surface failures to the user or retry:

```swift
public actor HistoryService {
    private let container: ModelContainer?

    public func save(item: CaptureItem, sidecarURL: URL? = nil) async throws {
        guard let container else { throw ServiceError.noContainer }
        try await Task.detached(priority: .utility) {
            let ctx = ModelContext(container)
            let historyItem = CaptureHistoryItem(from: item, sidecarURL: sidecarURL)
            ctx.insert(historyItem)
            try ctx.save()  // throws on failure
        }.value
    }

    public func rename(itemID: UUID, to newName: String) async throws {
        guard let container else { throw ServiceError.noContainer }
        try await Task.detached(priority: .utility) {
            let ctx = ModelContext(container)
            let descriptor = FetchDescriptor<CaptureHistoryItem>(
                predicate: #Predicate { $0.id == itemID }
            )
            guard let item = try ctx.fetch(descriptor).first else {
                throw ServiceError.notFound
            }
            item.displayName = newName
            try ctx.save()
        }.value
    }
}
```

**Why this matters:**
- Silent `try?` saves mask disk-full errors, CloudKit sync conflicts, and schema mismatches
- `throws` forces every caller to handle failure — either propagate or present UI
- `Task.detached(priority: .utility)` keeps SwiftData I/O off the main actor
- Value-type snapshots (e.g., `ChatTurnSnapshot`) should cross module boundaries, not `@Model` objects

## SwiftData + Concurrency

**CRITICAL**: `@Model` objects are NOT Sendable. Never pass them across isolation boundaries.

```swift
// ❌ WRONG
func processThought(_ thought: CapturedThought) async {
    // Error: non-Sendable type
}

// ✅ CORRECT — Pass ID, fetch in context
func processThought(id: UUID) async {
    let descriptor = FetchDescriptor<CapturedThought>(
        predicate: #Predicate { $0.id == id }
    )
    guard let thought = try? modelContext.fetch(descriptor).first else { return }
    // Process...
}
```

## Quick Self-Check

Before finishing SwiftData code:

- [ ] `@Model` classes never captured in `@Sendable` closures
- [ ] Using `@Environment(\.modelContext)` in Views
- [ ] Passing `ModelContext` as parameter to ViewModel methods
- [ ] Using `#Predicate` syntax in `FetchDescriptor`
- [ ] Indexes defined for frequently queried properties
- [ ] Relationships have proper `inverse` declarations
- [ ] New entities/relationships have `VersionedSchema` + `SchemaMigrationPlan`
- [ ] Test containers use full production schema + unique URLs
- [ ] `PreviewContainer` includes all `@Model` types

## Schema Migration (VersionedSchema)

**CRITICAL**: Any new `@Model` entity or new relationship on an existing entity requires a migration plan. Without one, existing users' stores will fail to open → crash on launch (`SIGABRT` in `TaskLocal::StopLookupScope`).

### When Migration Is Required

| Change | Migration Needed? | Type | CloudKit Safe? |
|--------|:-:|------|:-:|
| New `@Model` entity | **YES** | Lightweight | ✅ |
| New optional property on existing entity | **YES** | Lightweight | ✅ |
| New required property (no default) | **YES** | Custom | ✅ |
| New `@Relationship` on existing entity | **YES** | Lightweight | ✅ |
| Delete property | **YES** | Lightweight | ✅ with caveat¹ |
| Rename property | **YES** | Custom | ❌ **HIGH RISK** |
| Rename `@Model` class | **YES** | Custom | ❌ **CRITICAL RISK** |
| Change raw ID → `@Relationship` | **YES** | Custom | ❌ **HIGH RISK** |
| New computed property | No | — | ✅ |

¹ Removing a property is CloudKit-safe IF the old property had no semantic meaning that would cause incorrect behavior when old devices see its default value.

### CloudKit Sync Safety

When CloudKit sync is enabled, the schema rules become much stricter because the iCloud container schema is **permanent and append-only** — record types and fields are never deleted from the server. Multiple devices can run different app versions simultaneously.

#### NEVER rename an `@Model` class

CloudKit maps each `@Model` class to a CKRecord type by name. Renaming creates a new record type; the old one persists with orphaned data. Old devices write records of the old type that new devices don't import, and vice versa — **silent data loss in both directions**.

```swift
// ❌ WRONG — Renaming creates a new CloudKit record type, orphaning old data
// Before: class SubPoint → After: class OutlineLine

// ✅ CORRECT — Add a new class, migrate data in .custom stage, keep old registered for 2 versions
enum SchemaV2: VersionedSchema {
    // Keep OldModelName registered even if unused — old CloudKit records still reference it
    static var models: [any PersistentModel.Type] = [NewModelName.self, OldModelName.self]
}
static let migrateV1toV2 = MigrationStage.custom(
    fromVersion: SchemaV1.self, toVersion: SchemaV2.self,
    willMigrate: { context in
        let old = try context.fetch(FetchDescriptor<OldModelName>())
        for item in old {
            context.insert(NewModelName(from: item))
        }
    }, didMigrate: nil
)
```

#### NEVER rename a stored property

CloudKit maps stored properties to CKRecord fields. Renaming a property creates a new field; the old field persists on old records. Old devices read the old field (never updated); new devices read the new field (missing old data).

```swift
// ❌ WRONG — Renaming creates orphaned CKRecord field
// Before: var duration: Int → After: var durationSeconds: Int

// ✅ CORRECT — Add new property, copy data in .custom stage, stop writing to old
var duration: Int         // keep — old CloudKit records still have this
var durationSeconds: Int  // new
// In .custom migration: durationSeconds = duration
```

#### NEVER change a raw ID field to `@Relationship` without `.custom` migration

Raw ID (`var sessionId: UUID`) and `@Relationship` are stored differently in CloudKit (field vs CKReference). Old devices can't interpret the new format.

```swift
// ❌ WRONG — Changing storage format breaks cross-version sync
// Before: var sessionId: UUID → After: @Relationship var session: FocusSession?

// ✅ CORRECT — Keep both for at least 1 version so old devices can still link via raw ID
var sessionId: UUID?            // keep for backward compat
@Relationship var session: FocusSession?  // new
```

#### Adding and removing properties is safe

- **Adding** optional properties (defaulting to `nil`): old devices ignore unknown fields on import
- **Removing** properties: CloudKit ignores unknown fields → old records sync fine, field is dropped locally

#### Versioning convention

SwiftData uses semantic versioning: `Schema.Version(major, minor, patch)`. Increment patch for additive changes, minor for non-breaking structural changes, major for changes requiring a data transform.

```swift
enum SchemaV1: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] = [FocusSession.self]
}
enum SchemaV2: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(1, 1, 0)  // minor: additive
    static var models: [any PersistentModel.Type] = [FocusSession.self]
}
```

### Pattern: VersionedSchema + MigrationPlan

```swift
import SwiftData

// Each schema version lists which @Model types exist
enum MySchemaV1: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Item.self, Tag.self]
    }
}

enum MySchemaV2: VersionedSchema {
    nonisolated(unsafe) static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Item.self, Tag.self, Folder.self]  // Added Folder
    }
}

enum MyMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [MySchemaV1.self, MySchemaV2.self]
    }
    static var stages: [MigrationStage] {
        [migrateV1toV2]
    }
    static let migrateV1toV2 = MigrationStage.lightweight(
        fromVersion: MySchemaV1.self,
        toVersion: MySchemaV2.self
    )
}

// Wire into container
let schema = Schema(versionedSchema: MySchemaV2.self)
let container = try ModelContainer(
    for: schema,
    migrationPlan: MyMigrationPlan.self,
    configurations: [config]
)
```

### Test Containers

Test `ModelContainer` instances must use the **full production schema** to avoid `loadIssueModelContainer` errors. Use unique URLs to isolate each test:

```swift
// ✅ CORRECT — Full schema + unique URL per test
func makeContainer() throws -> ModelContainer {
    let schema = Schema([Item.self, Tag.self, Folder.self])  // ALL @Model types
    let url = URL(filePath: "/dev/null").appending(path: UUID().uuidString)
    let config = ModelConfiguration(url: url, cloudKitDatabase: .none)
    return try ModelContainer(for: schema, configurations: [config])
}
```

### PreviewContainer

Must also include all `@Model` types in its schema. When adding a new entity, always update `PreviewContainer`.

<!-- REFERENCE: ios-standards/swiftui.md -->

# SwiftUI Standards

> Patterns for Views, state management, and animations in iOS 26+.

## Critical Rules

### 1. Environment Pattern for ViewModels

**CHECKLIST**: Views using `@Environment` for shared state?

```swift
// ✅ CORRECT — Use @Environment for shared ViewModels
struct TimerView: View {
    @Environment(TimerViewModel.self) private var timerVM
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        // Access directly — @Observable means no @ObservedObject needed
        Text(timerVM.timeRemainingFormatted)
    }
}
```

### 2. @Observable ViewModels (Not ObservableObject)

**CHECKLIST**: New ViewModels using `@Observable`, not `ObservableObject`?

```swift
// ❌ OLD PATTERN — Don't use
class OldViewModel: ObservableObject {
    @Published var state: State = .idle
}

// ✅ CORRECT — Swift 6 @Observable
@Observable
@MainActor
class TimerViewModel {
    var timerState: TimerState = .idle
    var timeRemaining: TimeInterval = 25 * 60

    // No @Published needed — all stored properties are observable
}
```

### 3. State Initialization

**CHECKLIST**: `@State` objects properly initialized?

```swift
// ✅ CORRECT — Direct initialization
struct MyView: View {
    @State private var speechService = SpeechService()
    @State private var waveformService = RealAudioWaveformService()
    @State private var isRecording = false
}
```

### 4. Every File Has #Preview

**CHECKLIST**: Every SwiftUI view file has at least one `#Preview`?

```swift
// Required at end of every View file
#Preview("Default State") {
    MyView()
}

#Preview("Dark Mode") {
    MyView()
        .preferredColorScheme(.dark)
}
```

**For complex views requiring environment setup**, use a preview container:

```swift
#Preview {
    PreviewContainer {
        MyView()
    }
}

// PreviewContainer helper
struct PreviewContainer<Content: View>: View {
    @State private var viewModel = MyViewModel()

    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .environment(viewModel)
    }
}
```

## Animation Patterns

### Standard Transitions

```swift
// Use consistent animation values
.animation(.spring(response: 0.35, dampingFraction: 0.8), value: isExpanded)
.animation(.easeInOut(duration: 0.3), value: showCapture)

// For view appearance/disappearance
.transition(.opacity.combined(with: .scale(scale: 0.95)))
.transition(.move(edge: .bottom).combined(with: .opacity))
```

### WithAnimation Blocks

```swift
// For programmatic state changes
withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
    showCompletion = true
}
```

## Layout Patterns

### Design System Constants

Never hardcode values — use your design system:

```swift
// ✅ CORRECT — Use design system tokens
.padding(.horizontal, Theme.Spacing.lg)
.background(Theme.background)
.foregroundStyle(Theme.primary)

// Define in Theme.swift or asset catalog
enum Theme {
    enum Spacing {
        static let xs: CGFloat = 8
        static let sm: CGFloat = 12
        static let md: CGFloat = 16
        static let lg: CGFloat = 20
        static let xl: CGFloat = 24
        static let xxl: CGFloat = 32
    }

    enum Radius {
        static let small: CGFloat = 8
        static let medium: CGFloat = 12
        static let large: CGFloat = 16
    }

    static let primary = Color("Primary")
    static let background = Color("Background")
}
```

### Conditional Modifiers

```swift
// Use conditional modifiers for clean code
.background(hasContent ? Theme.primary : Theme.chip)
.opacity(isLoading ? 0.5 : 1)
```

## Accessibility

**CHECKLIST**: Views have proper accessibility?

```swift
// Add identifiers for UI testing
Button("Save") { }
    .accessibilityIdentifier("save-button")

// Group related elements
VStack {
    Text("Title")
    Text("Subtitle")
}
.accessibilityElement(children: .combine)
.accessibilityLabel("Title, Subtitle")

// Hide decorative elements
Image("background-decoration")
    .accessibilityHidden(true)
```

## Quick Self-Check

Before finishing a View:

- [ ] File has `#Preview`
- [ ] Uses `@Environment` for shared ViewModels, not `@ObservedObject`
- [ ] Uses `@Observable` ViewModels, not `ObservableObject`
- [ ] No hardcoded colors or spacing — uses design system tokens
- [ ] Proper accessibility identifiers on interactive elements
- [ ] Animations use appropriate curves (not `.linear`)

<!-- END SKILL: ios-standards -->

---

<!-- BEGIN SKILL: ios-test -->

# ios-test

# iOS Testing

XCTest patterns for unit tests, UI tests, and SwiftData testing with strict concurrency. **Keep tests fast, isolated, and deterministic.**

## ☠️ ULTIMATE RULE

**NEVER START UI TESTS without explicit user approval in the current conversation.** UI tests crash this user's Mac Mini. This rule stands even if a plan instructs you to run them. If a plan demands UI test execution, flag it as blocked or rewrite the plan.

---

## Test Target Architecture

Separate tests by purpose and performance characteristics:

| Target | Purpose | When to Run | Max Duration |
|--------|---------|-------------|--------------|
| `MyAppTests` | Business logic, ViewModels, Services | Every build (⌘U) | <30 seconds |
| `MyApp-UITests` | Critical user paths only | Pre-commit, CI | <60 seconds |
| `MyApp-Screenshots` | App Store assets | CI release only | 5-10 minutes |
| `MyAppKitTests` | Shared package tests | Every build | <15 seconds |

### Target Structure

```
MyAppTests/                       ← iOS Unit Tests
├── ViewModelTests/
│   ├── TimerViewModelTests.swift
│   └── SettingsViewModelTests.swift
├── ServiceTests/
│   └── NotificationServiceTests.swift
├── SwiftDataTests/
│   ├── ModelCRUDTests.swift
│   └── MigrationTests.swift
└── TestHelpers.swift             ← Shared test utilities

MyApp-UITests/                    ← Critical paths only
├── CriticalPathUITests.swift     ← 8 essential journeys
└── BaseUITestCase.swift          ← Shared infrastructure

MyApp-Screenshots/                ← CI only
└── ScreenshotTests.swift         ← App Store assets
```

### Performance Budgets

| Suite | Target | Max | Command |
|-------|--------|-----|---------|
| Unit Tests | 15s | 30s | `swift test` or `xcodebuild test` |
| UI Tests | 30s | 60s | `xcodebuild test -scheme MyApp-UITests` |
| Screenshot Tests | — | CI only | `bundle exec fastlane screenshots` |
| **Total CI** | **60s** | **120s** | Full suite |

---

## SwiftData Testing

### In-Memory ModelContainer

**WRONG:** Using the app container (slow, persists between tests, causes isolation issues)

```swift
// WRONG — uses real database
let container = try ModelContainer(for: MyModel.self)
```

**RIGHT:** In-memory container for fast, isolated tests

```swift
// TestHelpers.swift
import SwiftData

func makeTestContainer(for models: any PersistentModel.Type...) throws -> ModelContainer {
    let schema = Schema(models)
    let config = ModelConfiguration(schema: schema, isStoredInMemoryOnly: true)
    return try ModelContainer(for: schema, configurations: config)
}

// Usage in tests
@MainActor
func test_fetchSessions_returnsSorted() throws {
    let container = try makeTestContainer(for: FocusSession.self, CapturedThought.self)
    let context = ModelContext(container)
    // ... test code
}
```

### @MainActor Test Isolation

SwiftData contexts must be accessed from the main actor:

```swift
// WRONG — not MainActor isolated
func test_createSession_savesToDatabase() throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let context = ModelContext(container)  // ❌ Main actor-isolated init
}

// RIGHT — @MainActor isolated
@MainActor
func test_createSession_savesToDatabase() throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let context = ModelContext(container)  // ✓ Safe on MainActor
}
```

### Test Data Seeding

```swift
@MainActor
func seedTestSessions(in container: ModelContainer, count: Int = 5) throws {
    let context = ModelContext(container)
    
    for i in 0..<count {
        let session = FocusSession(
            startDate: Date().addingTimeInterval(-Double(i * 86400)),
            duration: 1500
        )
        context.insert(session)
    }
    
    try context.save()
}
```

### Cascade Delete Testing

```swift
@MainActor
func test_deleteSession_cascadesToCaptures() throws {
    // Given: Session with captures
    let container = try makeTestContainer(for: FocusSession.self, CapturedThought.self)
    let context = ModelContext(container)
    
    let session = FocusSession(startDate: Date(), duration: 1500)
    let capture = CapturedThought(text: "Test thought", timestamp: Date())
    capture.session = session
    
    context.insert(session)
    context.insert(capture)
    try context.save()
    
    // When: Delete session
    context.delete(session)
    try context.save()
    
    // Then: Captures are also deleted
    let captures = try context.fetch(FetchDescriptor<CapturedThought>())
    XCTAssertEqual(captures.count, 0)
}
```

### Migration Testing

Every `.custom` migration stage needs a test. `.lightweight` stages need data preservation tests.

```swift
@MainActor
func test_migrationV1toV2_preservesExistingData() throws {
    // 1. Write data using V1 schema
    let v1Config = ModelConfiguration(isStoredInMemoryOnly: true)
    let v1Container = try ModelContainer(
        for: SchemaV1.FocusSession.self,
        configurations: v1Config
    )
    let v1Context = ModelContext(v1Container)
    let session = SchemaV1.FocusSession(startDate: Date(), duration: 1500)
    v1Context.insert(session)
    try v1Context.save()
    
    // 2. Open with V2 schema + migration plan
    let v2Container = try ModelContainer(
        for: SchemaV2.FocusSession.self,
        migrationPlan: AppMigrationPlan.self,
        configurations: v1Config
    )
    let v2Context = ModelContext(v2Container)
    
    // 3. Verify old data is intact
    let sessions = try v2Context.fetch(FetchDescriptor<SchemaV2.FocusSession>())
    XCTAssertEqual(sessions.count, 1)
    XCTAssertEqual(sessions.first?.duration, 1500)
    
    // 4. Verify new field defaults correctly
    XCTAssertNil(sessions.first?.newOptionalField)
}
```

---

## XCTest Patterns

### Test Naming Convention

```swift
func test_<subject>_<condition>_<expectedResult>()

// Examples:
func test_categorize_buyKeyword_returnsTask()
func test_timerState_startFromIdle_transitionsToRunning()
func test_swiftData_deleteSession_cascadesCaptures()
func test_remindersService_requestAccess_promptsForPermission()
```

### Async/Await Test Patterns

```swift
// Async test — direct await
@MainActor
func test_refresh_updatesStats() async throws {
    let container = try makeTestContainer(for: FocusSession.self)
    let viewModel = InsightsViewModel(container: container)
    
    await viewModel.refresh()
    
    XCTAssertGreaterThan(viewModel.totalFocusTime, 0)
}

// Async throws pattern
func test_fetchData_returnsResults() async throws {
    let service = DataService()
    
    let data = try await service.fetchData()
    
    XCTAssertFalse(data.isEmpty)
}
```

### XCTestExpectation for Callbacks

```swift
func test_speechTranscription_returnsText() {
    let expectation = expectation(description: "Transcription completed")
    let service = SpeechService()
    
    service.onTranscription = { text in
        XCTAssertEqual(text, "buy oat milk")
        expectation.fulfill()
    }
    
    service.startRecording()
    
    wait(for: [expectation], timeout: 5)
}

// Multiple expectations
func test_parallelDownloads_complete() {
    let exp1 = expectation(description: "Download 1")
    let exp2 = expectation(description: "Download 2")
    
    download(url1) { exp1.fulfill() }
    download(url2) { exp2.fulfill() }
    
    wait(for: [exp1, exp2], timeout: 10)
}
```

### setUpWithError / tearDownWithError

```swift
class TimerViewModelTests: XCTestCase {
    var container: ModelContainer!
    var viewModel: TimerViewModel!

    @MainActor
    override func setUpWithError() throws {
        try super.setUpWithError()
        container = try makeTestContainer(for: FocusSession.self)
        viewModel = TimerViewModel(container: container)
    }

    override func tearDownWithError() throws {
        viewModel = nil
        container = nil
        try super.tearDownWithError()
    }
}

### Testing @MainActor Classes

**Critical — applies to the entire test class:** When your test class is `@MainActor` (or tests a `@MainActor` subject), **every** test method must be `async` — even ones with no async work. Synchronous methods crash at deallocation with `POINTER_BEING_FREED_WAS_NOT_ALLOCATED` deep in `swift_task_deinitOnExecutorImpl`.

**Root cause:** `@MainActor` class dealloc uses `swift_task_deinitOnExecutorImpl`, which creates a `TaskLocal.StopLookupScope`. In a synchronous test there is no current Task, so the scope's heap is uninitialized — destroying it crashes.

```swift
// WRONG — crashes on dealloc even though the test body is fine
@MainActor
final class MyViewModelTests: XCTestCase {
    func test_initialState() {           // ❌ sync — crashes at deinit
        let vm = MyViewModel()
        XCTAssertFalse(vm.isActive)
    }

    func test_activate() throws {        // ❌ throws but not async — also crashes
        let vm = MyViewModel()
        try vm.activate()
        XCTAssertTrue(vm.isActive)
    }
}

// RIGHT — every method is async
@MainActor
final class MyViewModelTests: XCTestCase {
    func test_initialState() async {     // ✅ async — proper task context
        let vm = MyViewModel()
        XCTAssertFalse(vm.isActive)
    }

    func test_activate() async throws {  // ✅ async throws
        let vm = MyViewModel()
        try vm.activate()
        XCTAssertTrue(vm.isActive)
    }
}
```

This rule applies to `setUp`/`tearDown` too — prefer `setUp() async throws` / `tearDown() async throws` in `@MainActor` test classes.
```

### Mock Services for Testing

```swift
protocol NotificationServiceProtocol: Sendable {
    func scheduleNotification(at date: Date, title: String) async
}

class MockNotificationService: NotificationServiceProtocol {
    var scheduledNotifications: [(date: Date, title: String)] = []
    var shouldSucceed = true
    
    func scheduleNotification(at date: Date, title: String) async {
        if shouldSucceed {
            scheduledNotifications.append((date, title))
        }
    }
}

// Usage in test
@MainActor
func test_startSession_schedulesNotification() async {
    let mockService = MockNotificationService()
    let viewModel = TimerViewModel(notificationService: mockService)

    await viewModel.startSession()

    XCTAssertEqual(mockService.scheduledNotifications.count, 1)
}

### Protocol-Based Mocking for Framework Classes

**Critical:** Some framework classes cause heap corruption when subclassed for testing:

```swift
// WRONG — subclassing EKEventStore causes heap corruption in iOS 26 simulator
class MockEventStore: EKEventStore {
    override func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        completion(true, nil)
    }
}

// RIGHT — use protocol conformance
protocol EventStoreProtocol {
    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler)
    func calendars(for entityType: EKEntityType) -> [EKCalendar]
    func save(_ reminder: EKReminder, commit: Bool) throws
}

// Real implementation wraps the framework class
final class EventStoreWrapper: EventStoreProtocol {
    private let store = EKEventStore()

    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        store.requestAccess(to: entityType, completion: completion)
    }

    func calendars(for entityType: EKEntityType) -> [EKCalendar] {
        store.calendars(for: entityType)
    }

    func save(_ reminder: EKReminder, commit: Bool) throws {
        try store.save(reminder, commit: commit)
    }
}

// Mock implementation for tests
final class MockEventStore: EventStoreProtocol {
    var shouldSucceed = true
    var calendarsResult: [EKCalendar] = []
    var savedReminders: [EKReminder] = []

    func requestAccess(to entityType: EKEntityType, completion: @escaping EKEventStoreRequestAccessCompletionHandler) {
        completion(shouldSucceed, nil)
    }

    func calendars(for entityType: EKEntityType) -> [EKCalendar] {
        return calendarsResult
    }

    func save(_ reminder: EKReminder, commit: Bool) throws {
        if shouldSucceed {
            savedReminders.append(reminder)
        } else {
            throw NSError(domain: "MockError", code: 1)
        }
    }
}
```

**Framework classes requiring protocol mocking:**
- `EKEventStore` (EventKit) — heap corruption in iOS 26 simulator
- `AVAudioEngine` — complex initialization state
- `HKHealthStore` (HealthKit) — privacy-sensitive

---
```

---

## UI Testing

### XCUIApplication Patterns

```swift
class CriticalPathUITests: XCTestCase {
    let app = XCUIApplication()
    
    override func setUpWithError() throws {
        continueAfterFailure = false
    }
    
    func test_startFocusSession() {
        app.launchArguments = ["-UITestMode", "-FastTimer"]
        app.launch()
        
        // Tap start
        app.buttons["startButton"].tap()
        
        // Verify running state
        XCTAssertTrue(app.staticTexts["timerRunning"].waitForExistence(timeout: 2))
    }
}
```

### Launch Arguments for Test Mode

| Argument | Purpose |
|----------|---------|
| `-UITestMode` | Disables animations, analytics, alerts |
| `-SeedScenario=<name>` | Pre-populates test data |
| `-FastTimer` | Accelerated timer for tests |
| `-DisableOnboarding` | Skips onboarding flow |
| `-ResetState` | Clears UserDefaults on launch |

```swift
// In test
app.launchArguments = [
    "-UITestMode",
    "-SeedScenario=History30Days",
    "-FastTimer"
]
app.launch()

// In app (AppDelegate/Init)
if CommandLine.arguments.contains("-UITestMode") {
    // Disable animations
    UIView.setAnimationsEnabled(false)
}
```

### Data Seeding via RuntimeSeeder

**WRONG:** Creating data through UI (slow, flaky)

```swift
// Slow: 30-50s per test
func test_capturesList() {
    app.launch()
    startTimer()           // ~5s
    addCapture("Thought 1") // ~10s
    addCapture("Thought 2") // ~10s
    // ... actual test
}
```

**RIGHT:** Pre-seed via launch arguments (fast, deterministic)

```swift
// Fast: ~5s total
func test_capturesList() {
    app.launchArguments = ["-UITestMode", "-SeedScenario=MultipleCaptures"]
    app.launch()
    // Test immediately with pre-populated data
}
```

### Available Seeding Scenarios

| Scenario | Sessions | Captures | Use Case |
|----------|----------|----------|----------|
| `FreshInstall` | 0 | 0 | First launch, onboarding |
| `SingleSession` | 1 | 2 | Basic timer flow |
| `ActiveSession` | 1 (running) | 1 | Pause/resume testing |
| `History7Days` | 7 | 15 | Weekly review screens |
| `History30Days` | 30 | 60 | Insights, trends |
| `HighCompletion` | 20 (18 done) | 40 | Success messaging |
| `LowCompletion` | 20 (5 done) | 25 | Coaching nudges |

### Accessibility Identifiers

Add identifiers to all interactive elements:

```swift
// In SwiftUI
Button("Start") {
    viewModel.start()
}
.accessibilityIdentifier("startButton")

// In UI test
app.buttons["startButton"].tap()
```

### UI Testing Gotchas

#### SwipeActions Only Work in List/Form

**Critical:** `.swipeActions` are not reliably testable via XCUITest when used within `ScrollView > LazyVStack`:

```swift
// WRONG — SwipeActions not testable
struct ContentView: View {
    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(items) { item in
                    ItemRow(item: item)
                        .swipeActions {  // ❌ Not accessible to XCUITest
                            Button("Delete", role: .destructive) { }
                        }
                }
            }
        }
    }
}

// RIGHT — Use List for testable SwipeActions
struct ContentView: View {
    var body: some View {
        List {
            ForEach(items) { item in
                ItemRow(item: item)
                    .swipeActions {  // ✓ Accessible to XCUITest
                        Button("Delete", role: .destructive) { }
                    }
            }
        }
    }
}

// UI test
func test_deleteItem() {
    app.launch()
    let cell = app.cells.firstMatch
    cell.swipeLeft()
    cell.buttons["Delete"].tap()
}
```

#### TextField(axis: .vertical) Element Type

**Critical:** `TextField(axis: .vertical)` in iOS 26 is not exposed as `app.textViews` or `app.textFields`:

```swift
// In SwiftUI
TextField("Enter text", text: $text, axis: .vertical)
    .accessibilityIdentifier("notesTextField")
```

```swift
// WRONG — element not found
func test_enterText() {
    app.launch()
    app.textFields["notesTextField"].tap()  // Not found
}

// WRONG — also not found
func test_enterText() {
    app.launch()
    app.textViews["notesTextField"].tap()  // Also not found
}

// RIGHT — use descendants with any type
func test_enterText() {
    app.launch()
    let textField = app.descendants(matching: .any)["notesTextField"]
    textField.tap()
    textField.typeText("Test notes")
}
```

#### UI Test Data Seeding Race Condition

**Critical:** Async data seeding requires synchronization:

```swift
// In app — signal when seeding completes
func seedTestData() async {
    // ... seed data
    await MainActor.run {
        NotificationCenter.default.post(name: .testDataSeeded, object: nil)
    }
}

// In UI test — wait for signal
func test_withSeededData() {
    app.launchArguments = ["-UITestMode", "-SeedScenario=MultipleCaptures"]
    app.launch()

    // Wait for seeding completion
    let seeded = expectation(forNotification: .testDataSeeded, object: nil)
    wait(for: [seeded], timeout: 5)

    // Now test with data
    XCTAssertTrue(app.cells.firstMatch.exists)
}
```

**Also:** Use `Date()` timestamps for test data to avoid time-filter hiding:

```swift
// WRONG — past dates filtered by default
let capture = CapturedThought(text: "Test", timestamp: Date().addingTimeInterval(-86400))

// RIGHT — use current date
let capture = CapturedThought(text: "Test", timestamp: Date())
```

### Waiting for State Changes

```swift
// WRONG — long sleep
sleep(5)
XCTAssertTrue(element.exists)

// RIGHT — predicate expectation
let predicate = NSPredicate(format: "label == %@", "tap to pause")
let expectation = XCTNSPredicateExpectation(predicate: predicate, object: hintLabel)
XCTWaiter.wait(for: [expectation], timeout: 5)

// RIGHT — wait for existence with short timeout
XCTAssertTrue(element.waitForExistence(timeout: 2))
```

---

## Common Pitfalls

### Date Filtering in Test Data

**Problem:** ViewModel defaults to `.today` filter, but seeded data uses past dates.

**WRONG:**
```swift
let capture = CapturedThought(text: "Test", timestamp: Date().addingTimeInterval(-86400))
// Won't appear in today's filter
```

**RIGHT:**
```swift
let capture = CapturedThought(text: "Test", timestamp: Date())
// Visible with default filter
```

### Test Isolation Violations

**WRONG:** Sharing state between tests
```swift
static var sharedContainer: ModelContainer!  // ❌ Never do this

override func setUp() {
    // Reusing container from previous test
}
```

**RIGHT:** Fresh container per test
```swift
override func setUpWithError() throws {
    container = try makeTestContainer(for: MyModel.self)
}

override func tearDownWithError() throws {
    container = nil  // Clean up
}
```

### Excessive Wait Times

**WRONG:**
```swift
XCTAssertTrue(element.waitForExistence(timeout: 30))  // Too long
sleep(5)  // Wastes time
```

**RIGHT:**
```swift
XCTAssertTrue(element.waitForExistence(timeout: 2))   // UI responds in <2s
// Or use expectations for specific state changes
```

### Creating Data Through UI vs Seeding

See UI Testing section above. Always prefer seeding for setup state.

---

## Running Tests

### Unit Tests (Package)

```bash
cd MyAppKit && swift test
```

### Unit Tests (Xcode)

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests
```

### Specific Test File

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests
```

### Specific Test

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:MyAppTests/TimerViewModelTests/test_startFromIdle_transitionsToRunning
```

### UI Tests

```bash
xcodebuild test -scheme MyApp-UITests \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max'
```

### With Coverage

```bash
xcodebuild test -scheme MyApp-iOS \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -enableCodeCoverage YES \
  -resultBundlePath TestResults.xcresult
```

---

## Testing Checklist

When adding a new feature:

- [ ] Unit tests for ViewModel logic
- [ ] Unit tests for Service layer (if applicable)
- [ ] UI test for critical user path
- [ ] Screenshot test if new screen visible in App Store
- [ ] Accessibility identifiers added to interactive elements
- [ ] Test data scenario updated (if needed)
- [ ] Async operations tested with expectations
- [ ] Error states tested (failures, permissions denied)

---

## Quick Reference

| Pattern | Code |
|---------|------|
| In-memory container | `ModelConfiguration(isStoredInMemoryOnly: true)` |
| MainActor test class | `@MainActor final class MyTests: XCTestCase` — ALL methods must also be `async` |
| Async test | `func test_...() async throws` — required for any `@MainActor` subject |
| Expectation | `let exp = expectation(description: "..."); wait(for: [exp], timeout: 5)` |
| Mock service | Protocol + class with configurable behavior |
| UI test launch | `app.launchArguments = ["-UITestMode"]; app.launch()` |
| Wait for element | `element.waitForExistence(timeout: 2)` |

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `Main actor-isolated ... can not be referenced from a nonisolated context` in a test | Test class subject is `@MainActor` but the test method is not | Mark the class `@MainActor` and make every test method `async` |
| `SwiftData` test mutates real app data | Container is using the default on-disk store | Use `ModelConfiguration(isStoredInMemoryOnly: true)` for the test container |
| Test hangs and times out at an `expectation` | The awaited callback never fires (wrong queue or unfulfilled mock) | Verify the mock actually invokes the completion; keep `wait(for:timeout:)` ≥ 5s for async work |
| `waitForExistence` flakes in UI tests | Element queried before the screen transition completes | Increase the timeout and assert on a stable accessibility identifier, not a label |
| UI test launches the real backend | Launch arguments not honored | Pass `app.launchArguments = ["-UITestMode"]` and branch on it in the app entry point |
| Whole suite crashes the machine | UI tests were started without approval | UI tests are gated — **never start them without explicit user approval in the current conversation** |

## See Also

- `ios-standards` — Swift 6 concurrency patterns
- `ios-build` — Build validation and CI integration

<!-- END SKILL: ios-test -->

---

<!-- BEGIN SKILL: ios26-api-reference -->

# ios26-api-reference

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

<!-- END SKILL: ios26-api-reference -->

---

<!-- BEGIN SKILL: localization -->

# localization

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

<!-- END SKILL: localization -->

---

<!-- BEGIN SKILL: merge-check -->

# merge-check

# Merge Check Skill

**Pre-merge quality gate with parallel verification.**

## Auto-Triggers

This skill activates when you say:
- "Merge this to main"
- "Is this ready to merge?"
- "Create a pull request"
- "Check if I can merge"
- "Verify this branch"

## Parallel Subagent Architecture

Instead of running checks sequentially, spawn **4 subagents in parallel**:

```
┌─────────────────────────────────────────────────────────────┐
│                      Merge Check Orchestrator                │
│                           (You)                              │
└──┬──────────────┬──────────────────┬──────────────┬─────────┘
   │              │                  │              │
┌──▼──────┐  ┌────▼─────┐  ┌────────▼───┐  ┌──────▼────────┐
│ Build   │  │ Archive  │  │ Test       │  │ Lint          │
│ • Debug │  │ • Release│  │ • Unit     │  │ • SwiftLint   │
│ • Watch │  │ • Strict │  │ • UI (fast)│  │ • Debug code  │
│ • Check │  │   concur.│  │ • Coverage │  │ • Isolation   │
└─────────┘  └──────────┘  └────────────┘  └───────────────┘
```

**CRITICAL**: The Archive subagent catches strict concurrency errors that simulator builds miss.
This is the #1 cause of Xcode Cloud failures.

> **Don't wait for merge to run archive.** For any session touching Swift concurrency, MainActor,
> or new services, run a release archive build *during* development — not just here.
> Fixing archive errors while the code is fresh is 10x faster than fixing them at merge time.

## Workflow

### Phase 1: Context Analysis (You)

1. Detect current branch
2. Check if behind main
3. Determine changed files
4. **Spawn 4 subagents in parallel**

### Phase 2: Parallel Verification (Subagents)

**Subagent 1: Build Verification**
```
Task: Verify debug builds compile
Inputs: Branch name, changed files
Outputs: Build status, error count, first 10 errors
Commands: Use your project's build commands (xcodebuild, swift build, etc.)
```

**Subagent 2: Archive Verification (catches Xcode Cloud failures)**
```
Task: Run release archive builds to catch strict concurrency errors
Inputs: Branch name, changed targets
Outputs: Archive status, concurrency/isolation errors
Note: Debug simulator builds do NOT catch MainActor isolation errors.
      Archive builds use -O optimization which enforces strict concurrency.
      This is the #1 reason Xcode Cloud archives fail.
```

**Subagent 3: Test Verification**
```
Task: Run test suite
Inputs: Branch name
Outputs: Test results, failure count, failed test names, coverage %
```

**Subagent 4: Lint & Quality**
```
Task: Run linting and code quality checks on changed files
Inputs: Changed Swift files
Outputs: Lint errors, warnings, debug code found, isolation violations
Commands:
  git diff --name-only origin/main...HEAD -- "*.swift"
  For each changed file: swiftlint lint [file]
  Check for print(), debugPrint(), NSLog
  Check for force unwraps added (!)
```

**Subagent 5: App-Extension Info.plist (only if the app embeds a `.appex`)**
```
Task: Verify every app extension carries NSExtension.NSExtensionPointIdentifier
Inputs: project.yml (source) and/or the exported .ipa (authoritative)
Outputs: Per-appex pass/fail + the point identifier
Commands:
  verify-appex-infoplist.sh --project <path/to/project.yml>   # source pre-check
  verify-appex-infoplist.sh --ipa <path/to/exported.ipa>      # authoritative, pre-upload
Note: A missing identifier builds, exports, and uploads cleanly, then fails Apple's
      ASYNC processing with error 90348 and silently drops from TestFlight. Neither the
      debug nor the archive build catches it. See ios-build → "App Extension Info.plist".
```

### Phase 3: Aggregation (You)

1. Collect results from all 4 subagents
2. Determine merge readiness:
   - **GREEN**: All checks pass → Ready to merge
   - **YELLOW**: Warnings only, tests pass → Merge with caution
   - **RED**: Build failures OR test failures → Fix before merge

**Explicit Merge Gates:**

| Check | Gate | Failure Action |
|-------|------|----------------|
| Build | BLOCKING | Fix compilation errors |
| Archive | BLOCKING | Fix strict concurrency/isolation errors |
| Unit Tests | BLOCKING | Fix failing tests or update test expectations |
| UI Tests | WARNING | Investigate, retry, document if flaky |
| Lint | WARNING | Fix reported violations, or suppress with an inline `swiftlint:disable` + reason comment |
| Coverage | INFO | No gate, informational only |

3. Present summary with specific fixes needed

## Usage Examples

### Explicit Check
```
User: /merge-check
→ Spawns 4 subagents
→ Aggregates results
→ Reports: Ready to merge
```

### Auto-trigger on Merge Intent
```
User: Merge this to main
→ Detects merge intent
→ Spawns 4 subagents
→ Reports: 2 warnings, 1 test failure
→ User fixes, retries
```

### Before PR Creation
```
User: Create PR for this branch
→ Runs merge-check first
→ Reports: Build failed
→ User fixes, then creates PR
```

## Cost Efficiency

**Parallel subagents:**
- 4 checks run simultaneously (Build, Archive, Test, Lint)
- Total time = slowest check (not sum)
- Typically 3-4 minutes vs 10-12 minutes sequential

**Early exit:**
- If build fails, other checks still report
- But merge blocked immediately
- User gets full picture of issues

## Output Format

```
═══════════════════════════════════════════════════════════════
  Merge Check Results — feature/my-branch
═══════════════════════════════════════════════════════════════

  Build (Subagent 1)
   • iOS: PASS (45s)
   • Watch: PASS (32s)

  Archive (Subagent 2)
   • App: PASS (catches strict concurrency errors)

  Tests (Subagent 3)
   • Unit tests: PASS (42 tests, 3s)
   • UI tests: 2 failures — MERGE BLOCKED
     - TimerViewModelTests.test_startSession
     - CloudSyncTests.test_syncConflict
   • Coverage: 67%

  Lint (Subagent 4)
   • SwiftLint: 0 errors, 3 warnings
   • Debug code: None found
   • Isolation: No violations

═══════════════════════════════════════════════════════════════
  Status: MERGE BLOCKED — Tests failing
═══════════════════════════════════════════════════════════════

Required fixes before merge:
  1. TimerViewModelTests.test_startSession — assertion failed

Emergency bypass (not recommended):
  git push --no-verify  # Skips pre-push hook only
```

## Integration with Other Skills

| Skill | When | Purpose |
|-------|------|---------|
| `complete-feature` | Feature done | Comprehensive validation |
| `merge-check` | Before merge | Quality gate with subagents |
| `apple-patterns-check` | Before commits | Pattern validation |
| `verify-against-spec` | Spec-driven work | Coverage vs design spec |

After merging to main, your CI/CD pipeline handles deployment.
Merge-check prevents broken code in main, which prevents broken releases.

<!-- END SKILL: merge-check -->

---

<!-- BEGIN SKILL: networking -->

# networking

# Networking (URLSession + async/await)

**Build a correct, Sendable networking layer with structured concurrency.** No third-party library needed for most apps. Concurrency/isolation rules follow `ios-standards`.

---

## The core call

```swift
let (data, response) = try await URLSession.shared.data(for: request)
guard let http = response as? HTTPURLResponse else { throw APIError.nonHTTP }
guard 200..<300 ~= http.statusCode else { throw APIError.status(http.statusCode, data) }
let value = try decoder.decode(T.self, from: data)
```

Three things people skip and regret:
1. **Cast to `HTTPURLResponse` and check the status code** — `URLSession` does *not* throw on 4xx/5xx; you get a normal response with an error body.
2. **Decode errors are not network errors** — keep them distinct so you can log the payload.
3. **Build URLs with `URLComponents`** (proper percent-encoding of query items), never string concatenation.

---

## A typed, Sendable client

```swift
struct Endpoint<Response: Decodable> {
    var path: String
    var method = "GET"
    var query: [URLQueryItem] = []
    var body: Data? = nil
}

actor APIClient {
    private let base: URL
    private let session: URLSession
    private let decoder: JSONDecoder

    init(base: URL, session: URLSession = .shared) {
        self.base = base
        self.session = session
        decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        decoder.dateDecodingStrategy = .iso8601
    }

    func send<R>(_ endpoint: Endpoint<R>) async throws -> R {
        var comps = URLComponents(url: base.appending(path: endpoint.path),
                                  resolvingAgainstBaseURL: false)!
        if !endpoint.query.isEmpty { comps.queryItems = endpoint.query }
        var req = URLRequest(url: comps.url!)
        req.httpMethod = endpoint.method
        req.httpBody = endpoint.body
        if endpoint.body != nil { req.setValue("application/json", forHTTPHeaderField: "Content-Type") }

        let (data, response) = try await session.data(for: req)
        guard let http = response as? HTTPURLResponse else { throw APIError.nonHTTP }
        guard 200..<300 ~= http.statusCode else { throw APIError.status(http.statusCode, data) }
        do { return try decoder.decode(R.self, from: data) }
        catch { throw APIError.decoding(error) }
    }
}

enum APIError: Error { case nonHTTP, status(Int, Data), decoding(Error), offline }
```

An `actor` client gives you a thread-safe place for caches/tokens. `URLSession`'s async methods are cancellation-aware — cancelling the `Task` cancels the request.

---

## Parallelism

```swift
// Independent calls — run concurrently
async let user = client.send(Endpoint<User>(path: "me"))
async let feed = client.send(Endpoint<[Post]>(path: "feed"))
let (u, f) = try await (user, feed)

// Dynamic fan-out
let posts = try await withThrowingTaskGroup(of: Post.self) { group in
    for id in ids { group.addTask { try await client.send(Endpoint<Post>(path: "posts/\(id)")) } }
    var out: [Post] = []
    for try await p in group { out.append(p) }
    return out
}
```

Don't `await` independent requests serially — it's the most common avoidable latency bug.

---

## Retry with exponential backoff + jitter

Retry only **idempotent** requests and only **transient** failures (timeouts, 429, 5xx). Never retry a non-idempotent POST blindly.

```swift
func withRetry<T>(max: Int = 3, _ op: () async throws -> T) async throws -> T {
    var attempt = 0
    while true {
        do { return try await op() }
        catch {
            attempt += 1
            guard attempt < max, isTransient(error) else { throw error }
            let backoff = pow(2.0, Double(attempt)) * 0.2
            let jitter = Double.random(in: 0...0.1)
            try await Task.sleep(for: .seconds(backoff + jitter))
        }
    }
}
```

Honor a `Retry-After` header on 429/503 when present instead of your own backoff.

---

## Offline & connectivity

- **Let requests wait** for connectivity when appropriate: set `configuration.waitsForConnectivity = true` and a sensible `timeoutIntervalForResource`.
- **Observe the path** with `NWPathMonitor` (Network framework) to drive UI ("You're offline") and to decide whether to even attempt a call.
- **Cache** with `URLCache` / `Cache-Control`, and consider a local store (SwiftData) as the source of truth with the network as a sync layer — see `cloudkit-sync`.
- Distinguish *offline* (`URLError.notConnectedToInternet`) from *server error* so the UI message is honest.

---

## Other essentials

- **Auth:** inject a bearer token in the client; refresh on 401 once, then fail. Keep tokens in the Keychain, not `UserDefaults` (see `app-security`).
- **Background transfers:** large up/downloads that must survive app suspension use a **background `URLSession`** (`URLSessionConfiguration.background(withIdentifier:)`) with a delegate, not async/await.
- **Don't pin blindly** — if you need certificate pinning, see `app-security`.
- **Testing:** inject a stub `URLProtocol` or a protocol-abstracted client so tests don't hit the network — see `swift-testing`.

<!-- END SKILL: networking -->

---

<!-- BEGIN SKILL: paywall-design -->

# paywall-design

# Paywall Design

**Design paywalls that convert without getting rejected.** Economics (tiers, regional pricing) live in `app-store-pricing`; the implementation lives in `storekit-purchases`; this is the *screen* — UX and compliance.

---

## App Review compliance — non-negotiable (Guideline 3.1.2)

A paywall that converts but gets rejected ships nothing. Every subscription paywall **must** show, on the purchase screen or one tap away:

- **What the user gets** (the value/contents of the subscription).
- **Price, duration, and per-period billing** for each option (e.g. "$4.99/month").
- For **free trials / intro offers:** the trial length, what happens when it ends, and the price that begins — clearly, before purchase.
- A visible **Restore Purchases** control.
- Functional links to **Terms (EULA)** and **Privacy Policy**.
- Honest auto-renew disclosure (it renews until cancelled).

Missing any of these is the most common subscription rejection. Build the compliant skeleton first, then design on top of it.

---

## The conversion structure (top to bottom)

1. **Value first, price second.** Lead with the outcome the user wants ("Track unlimited habits", "Remove all ads"), not a feature checklist or the price. Show the transformation.
2. **Concrete benefits, not feature names.** "Sync across all your devices" beats "iCloud integration." 3–5 benefits, scannable, each with an icon.
3. **Plan selection.** If offering multiple durations, **anchor**: show annual next to monthly with a "Save 40%" / "Best value" badge so the annual looks like the smart default. Pre-select the plan you want most users to pick.
4. **Trial framing** (if used): "Start 7-day free trial" as the primary CTA reduces friction far more than "Subscribe." Be explicit about what happens after.
5. **Social proof** (optional): ratings count, testimonials, or "Join 50,000 users" — only if true.
6. **One primary CTA.** A single, high-contrast button. Secondary actions (other plan, restore, close) are visually quieter.
7. **Required legal row** at the bottom: price recap, Restore, Terms, Privacy.

---

## Trial & offer design

- **No-card trials convert higher** but with more cancellations; weigh against intro-price offers. Gate trial eligibility with `isEligibleForIntroOffer` so ex-subscribers don't see "free trial" (see `storekit-purchases`).
- **Reminder UX:** surfacing "we'll remind you before it ends" increases trial starts by reducing fear.
- **Intro offers** (discounted first period) suit habit/utility apps where the user needs time to see value.
- Match the offer to the moment — an onboarding paywall and a contextual one (hit a limit) can use different framing.

---

## Where to place the paywall

| Pattern | When it fits | Trade-off |
|---------|--------------|-----------|
| **Onboarding (hard)** — paywall before use | Strong, obvious value; benefits clear upfront | Highest revenue per install, lowest activation |
| **Onboarding (soft)** — skippable | Most consumer apps | Balanced; keep "skip" discoverable but quiet |
| **Contextual** — at the moment of need (hit a limit, premium feature tapped) | Value is felt in-app | Highest intent, fewer impressions |
| **Persistent entry** — a "Pro" tab/badge | Long-term upsell | Low pressure, low conversion alone |

Most apps combine a **soft onboarding** paywall with **contextual** triggers. Don't trap users — a hidden or fake close button risks rejection and 1-star reviews.

---

## Visual & motion craft

- Apply the app's design system (see `apple-design`, `swiftui-micro-craft`) — the paywall should feel premium, because it's selling premium.
- Respect Dynamic Type and VoiceOver: the price, trial terms, and CTA must be reachable and legible at large sizes (see `ios-accessibility`). Truncated legal text is both a UX and compliance failure.
- Subtle motion on the value prop is fine; never animate the close affordance away.

---

## Measure & iterate

- Instrument **paywall impression → plan selected → purchase → trial-to-paid** (see `app-analytics`).
- A/B test with **Custom Product Pages** and on-device variants; test *one* thing at a time (headline, trial length, plan order).
- Track **trial-to-paid conversion** and **involuntary churn** separately — a high trial start with low conversion means the value promise isn't landing.

<!-- END SKILL: paywall-design -->

---

<!-- BEGIN SKILL: performance-instruments -->

# performance-instruments

# Performance & Instruments

**Measure first, then fix the thing the measurement points at.** Guessing at performance wastes days. Pair with `ios-test` (perf tests) and `ios-standards` (concurrency).

> Rule: never optimize without a profile. A 2-line fix at the real hot spot beats a week of speculative micro-optimization elsewhere.

---

## Pick the right instrument

| Problem | Instrument / tool |
|---------|-------------------|
| CPU hot spots, "where is time going" | **Time Profiler** |
| App launch breakdown | **App Launch** template |
| Main-thread stalls (UI freezes) | **Hangs** / **Thread State** |
| Dropped frames while scrolling/animating | **Animation Hitches** / **SwiftUI** |
| Memory growth, abandoned memory | **Allocations** + **Leaks** + Memory Graph |
| Battery / wakeups / networking | **Energy Log**, **Points of Interest** |
| Real-world data from users | **MetricKit** (`MXMetricManager`) |

Profile a **Release/optimized build on a real device** — Debug builds and the simulator lie about performance.

---

## Launch time (the first impression)

Target **< ~400ms** to first frame. Apple flags slow launches in App Analytics.

- Use the **App Launch** instrument to see pre-main (dyld, framework load) vs post-main work.
- **Reduce dynamic frameworks** — each one costs launch time; prefer static linking / fewer dependencies.
- **Defer non-critical work** off the launch path: don't do network calls, disk scans, or analytics setup in `init`/`application(_:didFinishLaunching…)`. Kick them off after first frame.
- Avoid heavy work in SwiftUI `body` / `App.init`.

Mark your own phases with signposts so they show on the timeline:

```swift
import OSLog
let signposter = OSSignposter(subsystem: "com.app", category: "launch")
let state = signposter.beginInterval("loadModel")
// … work …
signposter.endInterval("loadModel", state)
```

---

## Hangs & hitches (jank)

- A **hang** = the main thread is blocked > ~250ms (user sees a freeze). A **hitch** = a frame misses its deadline (stutter). On ProMotion (120Hz) the per-frame budget is ~8ms, so hitches are easier to hit.
- **Get work off the main thread.** Heavy decoding, file I/O, image resizing, JSON parsing → background (an `actor` or `Task.detached`), then hop back to `@MainActor` for UI only. See `ios-standards`.
- **Don't block on `await` of slow work inside view updates.** Load asynchronously and render a placeholder.
- In lists: pre-size rows, avoid synchronous image decode, use lazy stacks/`List` recycling.
- The **Hangs** instrument (and Xcode's runtime "Hang" warnings) pinpoint the blocking call stack.

---

## Memory

- **Leaks (cycles):** the usual culprit is a closure capturing `self` strongly. Use `[weak self]` in escaping closures, delegates, and `Task`s that outlive the view. The **Memory Graph Debugger** (Xcode → Debug Memory Graph) shows retain cycles visually; **Leaks** flags them live.
- **Abandoned memory / growth:** **Allocations** with "Mark Generation" — repeat an action, mark, and see what never frees. Caches without limits are a classic.
- Respond to memory pressure; don't cache unbounded. Large images: downsample to display size before keeping them.

---

## MetricKit — performance from real users

Instruments shows *your* device; MetricKit shows the field.

```swift
import MetricKit
final class Metrics: NSObject, MXMetricManagerSubscriber {
    func didReceive(_ payloads: [MXMetricPayload]) { /* launch, hang, hitch, memory, disk, energy */ }
    func didReceive(_ payloads: [MXDiagnosticPayload]) { /* crash, hang, CPU-exception diagnostics */ }
}
// MXMetricManager.shared.add(subscriber)
```

Payloads arrive ~once/day. Aggregate `applicationLaunchMetrics`, `applicationHangTime`, `animationMetrics` (hitch ratio), and `memoryMetrics` to catch regressions you'd never reproduce locally. Feed these into your analytics (see `app-analytics`).

---

## Workflow (`/perf-audit`)

1. Reproduce the complaint on a **real device, Release build**.
2. Pick the instrument for the symptom (table above) and capture a trace.
3. Find the **single biggest** contributor; fix it; re-measure to confirm the win.
4. Add a **signpost or perf test** (`ios-test`) so the regression can't silently return.
5. Check MetricKit trends after release to verify the fix holds in the field.

<!-- END SKILL: performance-instruments -->

---

<!-- BEGIN SKILL: preview-capture -->

# preview-capture

# Preview Capture

> **Purpose:** Turn a design contract's canonical `#Preview` frames into committed PNGs that a reviewer can diff against the mockup.
> **Trigger:** A plan written with `design-contract` requires capture proof, and you need to render `#Preview`s to images.

A design contract's §9 maps each canonical frame to a named `#Preview`. This skill renders those previews to `captures/<PreviewName>.png` so fidelity becomes reviewable. It first decides **whether this machine may render at all** — because "looks capable" is not the same as "is allowed."

## When to Use

- **Do use** to generate capture proof for `design-contract` §9 frames before opening a PR.
- **Do use** to refresh captures after a UI change touches a contracted frame.
- **Don't use** for ad-hoc screenshots of a running app (that's `ios-simulate`), or when there is no design contract.

## Command Reference

```
/preview-capture                       # Render every contracted #Preview in the touched files
/preview-capture <PreviewName> ...     # Render specific named previews
```

## Step 1: Gauge simulator capability (REQUIRED — run first)

You cannot reliably probe "will the simulator crash *this* machine" from hardware. A Mac that meets every spec can still destabilize on boot. Therefore an **explicit opt-out always wins over any hardware probe** — a passing probe must never re-enable a machine a human has marked unsafe.

Resolve capability with this precedence ladder:

```bash
# --- simulator-capability ladder -------------------------------------------
# Echoes one of: forbidden | unavailable | insufficient | capable
cap_marker_present() {
  [ -f ".claude/NO_SIMULATOR.md" ] || [ -n "${AETHER_NO_SIMULATOR:-}" ] || \
  [ -f "$HOME/.config/no-simulator" ]
}

min_free_ram_gb=8
min_free_disk_gb=15

if cap_marker_present; then
  echo "forbidden"                       # human/policy opt-out — AUTHORITATIVE, stop here
elif [ "$(uname -s)" != "Darwin" ]; then
  echo "unavailable"                     # simulators are macOS-only
elif ! xcode-select -p >/dev/null 2>&1; then
  echo "unavailable"                     # no Xcode toolchain
elif ! xcrun simctl list runtimes 2>/dev/null | grep -qiE "iOS|watchOS|visionOS"; then
  echo "unavailable"                     # no installed simulator runtime
else
  ram_gb=$(( $(sysctl -n hw.memsize) / 1073741824 ))
  disk_gb=$(df -g . | awk 'NR==2 {print $4}')
  if [ "$ram_gb" -lt "$min_free_ram_gb" ] || [ "${disk_gb:-0}" -lt "$min_free_disk_gb" ]; then
    echo "insufficient"                  # meets neither RAM nor disk floor
  else
    echo "capable"
  fi
fi
# ---------------------------------------------------------------------------
```

**Interpretation:**

| Result | Meaning | Action |
|--------|---------|--------|
| `forbidden` | A marker (`.claude/NO_SIMULATOR.md`, `AETHER_NO_SIMULATOR`, `~/.config/no-simulator`) opts this machine out | **Go to Step 3 (fallback).** Never override. |
| `unavailable` | Not macOS, no Xcode, or no installed runtime | Go to Step 3. Cannot render here. |
| `insufficient` | Below the RAM/disk floor | Go to Step 3; warn the user the machine is under-resourced. |
| `capable` | Probe passed and no opt-out | Go to Step 2. |

> The hardware probe is a *convenience* that catches obvious "no Xcode" cases. The **marker is the authority.** If you are unsure, treat as `forbidden`.

## Step 2: Render previews (capable machines)

Use Xcode's preview-to-image path. Each `#Preview` named in the contract's §9 renders at the canonical device resolution recorded in the contract (e.g. iPhone 17 Pro Max).

```bash
# Boot the canonical device once (see ios-simulate for device selection)
xcrun simctl boot "<canonical-device>" 2>/dev/null || true

# Render each contracted preview to captures/. Prefer the project's own
# preview-render target/script if present; otherwise drive the simulator and
# screenshot the rendered preview.
xcrun simctl io booted screenshot "<app>/docs/vision/captures/<PreviewName>.png"
```

Commit the PNGs alongside the implementing change. One PNG per §9 frame, named exactly the §9 Preview name so the reviewer can map 1:1.

**Never run iOS UI tests as part of this** — capture is a render, not a test pass. (See `ios-test` for why UI-test execution is gated.)

## Step 3: Fallback (forbidden / unavailable / insufficient)

When this machine may not render, the gate **substitutes** rather than disappears:

1. **CI gate = archive build.** Run the project's archive/export (e.g. `make export-test-<app>` / `xcodebuild archive`). This catches Swift 6 strict concurrency, signing, asset-catalog, and Live Activity encoding failures that a debug render would not — it is a stronger correctness gate than a simulator screenshot.
2. **Visual proof = a human render.** The `#Preview`s remain **mandatory in code** (they cost nothing and a teammate renders them in Xcode or checks a TestFlight build on device). That person drops the PNGs into `captures/<PreviewName>.png`.
3. **Honesty rule.** The agent must NOT fabricate captures and must NOT claim visual parity it cannot see. It states plainly: *"previews compile and archive passes; visual parity pending a teammate's Xcode render."*

Record in the plan which captures are agent-produced vs. pending-human, so the PR reviewer knows what is actually verified.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| Ladder returns `capable` on a known-bad machine | Marker missing | Create `.claude/NO_SIMULATOR.md` (or set `AETHER_NO_SIMULATOR=1`); the marker is authoritative |
| `xcrun simctl` hangs / crashes the host | Machine destabilizes despite passing specs | Add the opt-out marker and use Step 3 permanently for that machine |
| Capture name ≠ §9 Preview name | Hand-named file | Rename to match §9 exactly; the reviewer maps captures→frames by name |
| Blank/black capture | Simulator not booted, or preview compile error | Boot the device; confirm the `#Preview` compiles in the archive build |

## Cross-References

- Defines the §9 frames and capture gate: `design-contract`
- Consumes the captures for fidelity diffing: `verify-against-spec` (Visual Fidelity agent)
- Device selection, simctl workflows: `ios-simulate`
- Why UI tests are gated separately: `ios-test`

<!-- END SKILL: preview-capture -->

---

<!-- BEGIN SKILL: privacy-manifest -->

# privacy-manifest

# Privacy Manifests & Required-Reason APIs

**Declare data use and justify required-reason APIs so the build passes App Review.** Missing or incomplete manifests cause hard rejections (`ITMS-91053`, `ITMS-91061`) at upload/processing time — often *after* a "successful" upload (see `asc-submission` async failures). Run this before submitting.

A privacy manifest is a property list named **`PrivacyInfo.xcprivacy`** added to a target (and **required in each SDK/framework**, not just the app). It declares four things.

---

## The four keys

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>                                  <!-- true only if you track per App Tracking Transparency -->

  <key>NSPrivacyTrackingDomains</key>
  <array/>                                  <!-- domains used for tracking; MUST be empty if NSPrivacyTracking is false -->

  <key>NSPrivacyCollectedDataTypes</key>
  <array>
    <dict>
      <key>NSPrivacyCollectedDataType</key>
      <string>NSPrivacyCollectedDataTypeCrashData</string>
      <key>NSPrivacyCollectedDataTypeLinked</key>
      <false/>                              <!-- linked to user identity? -->
      <key>NSPrivacyCollectedDataTypeTracking</key>
      <false/>                              <!-- used to track? -->
      <key>NSPrivacyCollectedDataTypePurposes</key>
      <array>
        <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
      </array>
    </dict>
  </array>

  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>            <!-- access only to data written by this app -->
      </array>
    </dict>
  </array>
</dict>
</plist>
```

1. **`NSPrivacyTracking`** (Bool) — does the app/SDK track per ATT?
2. **`NSPrivacyTrackingDomains`** (array) — domains that perform tracking. **Must be empty if `NSPrivacyTracking` is false.** Find them with the **App Privacy Report** / Instruments **Network** instrument.
3. **`NSPrivacyCollectedDataTypes`** (array) — what data you collect, whether it's *linked* to identity, whether it's used for *tracking*, and the *purposes*. This feeds the App Store **privacy nutrition label**.
4. **`NSPrivacyAccessedAPITypes`** (array) — each **required-reason API** category you call, plus approved **reason codes**.

---

## Required-reason APIs — the part that triggers rejections

Apple gates a set of commonly-abused APIs ("required reason APIs"). If your code (or a bundled SDK) calls one, you **must** declare an approved reason. There are five categories:

| Category constant | Covers | Common approved reason |
|-------------------|--------|------------------------|
| `NSPrivacyAccessedAPICategoryFileTimestamp` | file creation/modification dates (`stat`, `.contentModificationDate`, `NSFileModificationDate`) | `C617.1` (timestamps of files inside app container), `DDA9.1` (display to user) |
| `NSPrivacyAccessedAPICategorySystemBootTime` | `systemUptime`, `mach_absolute_time` for boot time | `35F9.1` (measure elapsed time), `8FFB.1` (in-app time calc) |
| `NSPrivacyAccessedAPICategoryDiskSpace` | available/total disk space | `E174.1` (check before write), `85F4.1` (display to user) |
| `NSPrivacyAccessedAPICategoryActiveKeyboards` | active keyboard list | `3EC4.1` (custom keyboard app), `54BD.1` (UI customization on user request) |
| `NSPrivacyAccessedAPICategoryUserDefaults` | `UserDefaults` / `NSUserDefaults` | `CA92.1` (data written only by this app), `1C8F.1` (app group shared with your other apps) |

> **`UserDefaults` is the one almost everyone hits.** Using `@AppStorage` or `UserDefaults.standard` requires declaring `NSPrivacyAccessedAPICategoryUserDefaults` with reason `CA92.1`. Forgetting it is the most common cause of `ITMS-91053`.

Pick the **narrowest reason that is actually true**. Declaring a reason you don't qualify for is a compliance violation; Apple cross-checks against documented valid reasons and rejects unknown/invalid codes.

---

## Rejection codes → meaning

| Upload error | Meaning | Fix |
|--------------|---------|-----|
| **ITMS-91053** "Missing API declaration" | You call a required-reason API with no declared reason | Add the category + a valid reason code to `NSPrivacyAccessedAPITypes` |
| **ITMS-91061** "Missing privacy manifest" | A bundled SDK on Apple's list ships no manifest | Update the SDK to a version that includes one, or add a manifest for it |

These arrive by email and in the **ContentDelivery logs** (see `asc-submission` → diagnosing async failures) — the upload can "succeed" then fail processing.

---

## SDK signatures (the second half of ITMS-91061)

Apple maintains a list of commonly-used SDKs that must (a) ship a privacy manifest and (b) be **code-signed**. If you depend on one (analytics, ads, crash reporters, networking libs), update to a version that bundles `PrivacyInfo.xcprivacy` and a signature. You don't author manifests for third-party SDKs — you **upgrade** them.

---

## `/privacy-check` workflow

1. **Scan the source for required-reason API usage** (app + your own SwiftPM/embedded targets):

```bash
# UserDefaults / @AppStorage
grep -rEn "UserDefaults|@AppStorage" --include=*.swift .
# File timestamps
grep -rEn "contentModificationDate|creationDate|NSFileModificationDate|\.stat\(|fileModificationDate" --include=*.swift .
# System boot time / uptime
grep -rEn "systemUptime|mach_absolute_time|mach_continuous_time" --include=*.swift .
# Disk space
grep -rEn "volumeAvailableCapacity|systemFreeSize|systemSize" --include=*.swift .
# Active keyboards
grep -rEn "activeInputModes" --include=*.swift .
```

2. **List every `PrivacyInfo.xcprivacy`** in the project and which target it belongs to:

```bash
find . -name "PrivacyInfo.xcprivacy"
```

3. **Cross-check**: for each API category found in step 1, confirm a matching `NSPrivacyAccessedAPIType` entry with a *valid* reason exists in the app's manifest. Report:
   - ❌ API used but no manifest entry → will cause `ITMS-91053`.
   - ⚠️ Manifest entry with a reason code not on Apple's approved list for that category.
   - ⚠️ `NSPrivacyTracking` true but `NSPrivacyTrackingDomains` empty (or vice-versa).
   - ⚠️ Third-party SDK without a bundled manifest → `ITMS-91061` risk; recommend a version bump.
   - ✅ Each used category declared with a valid reason.

4. **Verify data-collection declarations** match what the app actually sends (crash/analytics/identifiers) so the nutrition label is truthful.

> A manifest is **per target**. App extensions, widgets, and embedded frameworks that touch required-reason APIs each need their own. Missing extension manifests are a frequent late surprise — see `asc-submission` Transporter table.

<!-- END SKILL: privacy-manifest -->

---

<!-- BEGIN SKILL: product-spec -->

# product-spec

# Product Spec / PRD

**Turn an idea into a spec you can build against and verify.** A good spec is the input to `verify-against-spec` (coverage checking) and `complete-feature` (the build gate). Keep it tight — a PRD is a decision record, not an essay.

> Best spec length is "as short as possible while still removing ambiguity." If a sentence doesn't change what gets built or how it's tested, cut it.

---

## The template

```markdown
# <Feature name>

## Problem
Who has what problem, and the evidence it's real (support tickets, churn, a request count).
One paragraph. If you can't state the problem crisply, stop — you're not ready to build.

## Goals
- The outcomes this feature must achieve (user- or business-level, not implementation).

## Non-goals
- Explicitly out of scope. This list prevents scope creep and is half the value of the doc.

## User stories
- As a <user>, I want <capability> so that <benefit>.
  (One per distinct need; each maps to acceptance criteria below.)

## Acceptance criteria
Given/When/Then, testable, unambiguous (see below). These ARE the definition of done.

## Success metrics
- The metric(s) that tell us it worked, with a target and a measurement window.
  (Tie to app-analytics; if you can't measure it, say how you'll judge success.)

## Scope / phases
- v1 (this spec) vs later. What's the smallest shippable slice?

## Risks & open questions
- Known unknowns, dependencies, and decisions still owed. Assign owners.
```

---

## Writing acceptance criteria that are actually testable

This is the part that determines whether the feature can be verified. Use **Given / When / Then**:

```
Given a signed-in user with an expired subscription
When they open the paywall
Then the "Restore Purchases" button is visible
And tapping it re-checks entitlements and unlocks if a valid purchase exists
```

Each criterion must be:
- **Observable** — a tester (or a test) can see pass/fail without reading your mind.
- **Atomic** — one behavior per criterion; split compound ones.
- **Free of solution detail** — say *what*, not *how* ("the list updates within 1s", not "call `reload()` on the diffable data source").
- **Inclusive of edge/empty/error states** — the empty list, the offline case, the rejected input. These are where features actually break.

Bad: "The feature should work well and be fast."
Good: "When the search returns no results, an empty state with a 'Clear filters' action is shown."

---

## Goals vs non-goals — the scope contract

- A goal is an **outcome**: "Users can recover a deleted note within 30 days." Not "add a trash table."
- Non-goals are a feature, not an afterthought: "Not syncing trash across devices in v1" tells engineering what to *not* build and reviewers what *not* to flag as missing.
- If a stakeholder request isn't in Goals, it's a non-goal by default — make the important ones explicit.

---

## Success metrics

- Pick **one primary metric** (the thing that must move) plus a couple of guardrails (things that must *not* get worse, e.g. crash rate, retention).
- State a **target and window**: "lift activation from 40% → 50% within 4 weeks of launch."
- If the feature is hard to quantify, define a qualitative bar and how you'll judge it. "No measurement plan" is itself a risk to list.

See `app-analytics` for instrumenting these, and `app-store-pricing` / `asc-aso` when the metric is revenue/conversion.

---

## Handoff

1. Draft the spec with the template above.
2. Resolve open questions or assign owners — don't start building on unresolved decisions.
3. Hand acceptance criteria to implementation; later run `verify-against-spec` to confirm coverage and `complete-feature` to gate the merge.

<!-- END SKILL: product-spec -->

---

<!-- BEGIN SKILL: push-notifications -->

# push-notifications

# Push & Local Notifications

**Deliver remote (APNs) and local notifications correctly** — from permission to payload to rich/actionable extensions. Live Activity push pairs with `app-intents`.

---

## 1. Authorization + registration

```swift
import UserNotifications

let center = UNUserNotificationCenter.current()
let granted = try await center.requestAuthorization(options: [.alert, .sound, .badge])
if granted {
    await MainActor.run { UIApplication.shared.registerForRemoteNotifications() }
}
```

Then capture the token in the app delegate:

```swift
func application(_ app: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let token = deviceToken.map { String(format: "%02x", $0) }.joined()
    // send `token` to your server
}
func application(_ app: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    // log; common cause: no `aps-environment` entitlement / wrong provisioning
}
```

**Requirements:** Push Notifications capability (adds `aps-environment` entitlement), a real device or a simulator with a signed build (simulator push works via `.apns` drag-drop or `simctl push`), and APNs auth (prefer a **token-based `.p8` key** over certs — one key works for all your apps, no yearly expiry).

---

## 2. Payload anatomy

```json
{
  "aps": {
    "alert": { "title": "Focus complete", "body": "Nice work — 25 minutes done." },
    "sound": "default",
    "badge": 1,
    "thread-id": "focus",
    "interruption-level": "time-sensitive",
    "relevance-score": 0.8,
    "mutable-content": 1,
    "category": "FOCUS_DONE"
  },
  "deep_link": "myapp://session/42"
}
```

- **`interruption-level`**: `passive` (no sound/banner urgency), `active` (default), `time-sensitive` (breaks through Focus; needs the Time Sensitive Notifications capability), `critical` (bypasses mute/Focus; requires a special Apple entitlement).
- **`thread-id`** groups notifications; **`relevance-score`** orders a summary.
- **`mutable-content: 1`** routes through your **service extension** (for rich media / decryption).
- **`content-available: 1`** (and *omit* `alert/sound`) = **silent/background push** to refresh data — delivery is throttled and not guaranteed; never use for urgent delivery.
- Custom keys live **outside** `aps` (e.g. `deep_link`).

### Headers (APNs HTTP/2)

`apns-push-type` (`alert`, `background`, `liveactivity`, `voip`…), `apns-topic` (bundle id; suffix `.push-type.liveactivity` for activities), `apns-priority` (10 immediate, 5 power-aware; **background push must be 5**), `apns-collapse-id` to coalesce.

---

## 3. Actionable notifications

```swift
let snooze = UNNotificationAction(identifier: "SNOOZE", title: "Snooze 5 min", options: [])
let category = UNNotificationCategory(identifier: "FOCUS_DONE", actions: [snooze],
                                      intentIdentifiers: [], options: [])
center.setNotificationCategories([category])
```

Handle taps/actions in `UNUserNotificationCenterDelegate`:

```swift
func userNotificationCenter(_ c: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse) async {
    if response.actionIdentifier == "SNOOZE" { /* … */ }
}
// Show banners while foregrounded:
func userNotificationCenter(_ c: UNUserNotificationCenter,
        willPresent n: UNNotification) async -> UNNotificationPresentationOptions {
    [.banner, .sound]
}
```

Set the delegate **before** the app finishes launching, or you miss the cold-launch tap.

---

## 4. Extensions

- **Notification Service Extension** (`UNNotificationServiceExtension`): runs for `mutable-content` payloads to download/attach media or decrypt before display. You have ~30s; always call the content handler (with the original content) in `serviceExtensionTimeWillExpire`.
- **Notification Content Extension**: a custom UI for the expanded notification.

Each extension is a separate target — and if it touches required-reason APIs, it needs its own privacy manifest (see `privacy-manifest`).

---

## 5. Live Activity push

Request the activity with a push token, send it to your server, then update via APNs with `apns-push-type: liveactivity` and a `content-state` matching your `ContentState`. End with `"event": "end"`. See `app-intents` for the ActivityKit UI side.

---

## Debugging checklist

| Symptom | Likely cause |
|---------|--------------|
| No token / `didFailToRegister` | Missing Push capability / `aps-environment`; bad provisioning profile |
| Push sent, nothing shows | Wrong topic/bundle id, dev vs prod APNs mismatch, app in foreground without `willPresent` |
| Silent push never fires | Used priority 10, missing `content-available`, or system throttling — expected |
| Rich media absent | No `mutable-content: 1`, or service extension didn't attach/return in time |
| Time-sensitive ignored | Missing Time Sensitive capability or user disabled it |

Test locally: `xcrun simctl push <device> <bundle-id> payload.apns`.

<!-- END SKILL: push-notifications -->

---

<!-- BEGIN SKILL: regression-test -->

# regression-test

# Regression Test Skill

When fixing a bug, always follow this workflow to prevent the bug from recurring.

---

## Regression Test Workflow

### Step 0: Identify the Bug Class

Before writing any test, classify the bug. This determines what *else* to check.

| Bug Class | Root Cause | Also Search For |
|-----------|------------|----------------|
| **Force unwrap crash** (`!`) | Assumed non-nil, was nil | Other `!` in same file/service |
| **try! crash** | Error ignored at call site | Other `try!` in same target |
| **fatalError crash** | Defensive code hit in prod | Other `fatalError` in prod paths |
| **Missing confirmation** | Destructive action unguarded | Other destructive actions without `.destructive` role |
| **MainActor isolation crash** | Async code off main thread | Other `@MainActor` + async patterns in same ViewModel |
| **App Group mismatch** | Entitlements out of sync | All targets sharing the group |
| **State not restored** | Background/foreground not handled | Other lifecycle observers |

After identifying the class, fix *all* instances of the class in this file/service — not just the one that crashed. One bug usually means there are siblings.

### Step 1: Write Failing Test First

Before fixing the bug, reproduce it in a test that fails:

```swift
func test_timer_backgrounding_shouldPause() {
    // Given: Running timer
    let viewModel = TimerViewModel()
    viewModel.start()

    // When: App backgrounds
    NotificationCenter.default.post(name: UIApplication.didEnterBackgroundNotification, object: nil)

    // Then: Timer should be paused
    XCTAssertEqual(viewModel.state, .paused)
}
```

**Why first?** Ensures you understand the bug and can prove the fix works.

### Step 2: Fix the Bug

Make minimal changes to fix the issue. Run the test from Step 1 — it should now pass.

### Step 3: Verify Test Passes

```bash
# Run the specific test you added
xcodebuild test -scheme <YourScheme> \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro Max' \
  -only-testing:<TestTarget>/<TestClass>/<test_method_name>
```

### Step 4: Run Full Suite

Ensure your fix didn't break anything else:

```bash
# Run all tests using your project's test command
<project-test-command>
```

### Step 5: Pattern Check

Search for similar bugs in the codebase:

```bash
# Find similar code patterns that might have the same issue
rg "<pattern-from-bug>" --type swift
```

---

## Test Location Guide

| Bug Location | Test Location | Naming Pattern |
|--------------|---------------|----------------|
| **ViewModel** | `Tests/[Name]ViewModelTests.swift` | `test_[method]_[scenario]_should[Expected]` |
| **Service** | `Tests/ServiceTests/[Name]Tests.swift` | Mock dependencies, test error cases |
| **Model (SwiftData)** | `Tests/ModelTests/[Name]Tests.swift` | Test CRUD, relationships, migrations |
| **UI Flow** | `UITests/CriticalPathUITests.swift` | Extend existing test or add new flow |
| **UI Component** | `UITests/[Feature]UITests.swift` | Component-specific interactions |

Adapt paths to your project's test directory structure.

---

## Concrete Example

### Bug Report
> Timer doesn't pause when backgrounding app during active session.

### Regression Test

```swift
@MainActor
func test_timer_backgrounding_shouldPause() {
    // Given: Active session
    let container = try makeTestContainer()
    let viewModel = TimerViewModel(modelContainer: container)
    viewModel.startSession()
    XCTAssertEqual(viewModel.state, .running)

    // When: App backgrounds
    NotificationCenter.default.post(
        name: UIApplication.didEnterBackgroundNotification,
        object: nil
    )

    // Then: Timer is paused
    XCTAssertEqual(viewModel.state, .paused)
}
```

### The Fix

```swift
init() {
    NotificationCenter.default.addObserver(
        self,
        selector: #selector(handleBackground),
        name: UIApplication.didEnterBackgroundNotification,
        object: nil
    )
}

@objc private func handleBackground() {
    if state == .running {
        pause()
    }
}
```

### Verification

```bash
# 1. Run new regression test
xcodebuild test -scheme <YourScheme> \
  -only-testing:<TestTarget>/TimerViewModelTests/test_timer_backgrounding_shouldPause

# 2. Run full suite
<project-test-command>

# 3. Pattern check — find other notification handlers
rg "NotificationCenter" <ViewModels-dir>/
```

---

## Common Regression Test Patterns

### State Machine Bug

```swift
func test_timerState_[invalidTransition]_should[Expected]() {
    // Given: State X
    // When: Invalid action Y
    // Then: Expected behavior (error, ignore, etc.)
}
```

### Data Persistence Bug

```swift
func test_[model]_[operation]_shouldPersist() {
    // Given: Model instance
    // When: Save / Update / Delete
    // Then: Data correctly persisted / cascade deleted
}
```

### Service Integration Bug

```swift
func test_[service]_[failure]_should[handleGracefully]() {
    // Given: Mock service configured to fail
    // When: Call method
    // Then: Error handled, state consistent
}
```

### UI State Bug

```swift
func test_[ui]_[action]_should[updateState]() {
    // Given: UI in specific state
    // When: User action
    // Then: UI reflects new state
}
```

---

## Checklist

- [ ] Failing test written that reproduces the bug
- [ ] Bug fixed with minimal changes
- [ ] Test passes after fix
- [ ] Full test suite passes
- [ ] Pattern check completed for similar issues
- [ ] Test named clearly: `test_[what]_[when]_[should]`
- [ ] Test location follows conventions

<!-- END SKILL: regression-test -->

---

<!-- BEGIN SKILL: storekit-purchases -->

# storekit-purchases

# StoreKit 2 — Purchases & Subscriptions

**Implement in-app purchases and subscriptions with the modern async StoreKit 2 API.** Strategy (tiers, regional pricing) lives in `app-store-pricing`; paywall conversion in `asc-aso`. This skill is the *code*.

> Use StoreKit 2 (`import StoreKit`, async/await, iOS 15+). Do **not** hand-parse receipts or call the legacy `SKPaymentQueue`/`verifyReceipt` server endpoint for new work — StoreKit 2 verifies transactions cryptographically on-device via `VerificationResult`.

---

## The Five Things Every IAP Implementation Needs

1. **Load products** from the App Store.
2. **Purchase** a product and handle the result.
3. **Verify** the transaction (never trust an unverified transaction).
4. **Check current entitlements** to unlock content (on launch and on change).
5. **Listen** for transactions that arrive outside your purchase call (renewals, Ask-to-Buy approvals, purchases on other devices, refunds).

Miss #5 and subscriptions silently break.

---

## Minimal correct implementation

```swift
import StoreKit

@MainActor
@Observable
final class Store {
    private(set) var products: [Product] = []
    private(set) var purchasedProductIDs: Set<String> = []

    private var updates: Task<Void, Never>?

    init() {
        // 5. ALWAYS start the transaction listener before any purchase,
        //    at app launch, so renewals/Ask-to-Buy/refunds are not missed.
        updates = Task.detached { [weak self] in
            for await update in Transaction.updates {
                await self?.handle(verification: update)
            }
        }
    }

    deinit { updates?.cancel() }

    // 1. Load products
    func loadProducts(ids: [String]) async {
        do {
            products = try await Product.products(for: ids)
        } catch {
            // network/StoreKit error — surface, allow retry
        }
    }

    // 2 + 3. Purchase and verify
    func purchase(_ product: Product) async throws -> Transaction? {
        let result = try await product.purchase()
        switch result {
        case .success(let verification):
            let transaction = try checkVerified(verification)   // 3
            await updateEntitlements()
            await transaction.finish()                          // REQUIRED
            return transaction
        case .userCancelled:
            return nil
        case .pending:
            return nil   // Ask-to-Buy / SCA — resolved later via Transaction.updates
        @unknown default:
            return nil
        }
    }

    // 3. Verification — the ONLY trustworthy source of truth
    private func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified(_, let error): throw error   // do NOT grant entitlement
        case .verified(let safe):       return safe
        }
    }

    private func handle(verification: VerificationResult<Transaction>) async {
        guard let transaction = try? checkVerified(verification) else { return }
        await updateEntitlements()
        await transaction.finish()
    }

    // 4. Current entitlements — the source of truth for "what is unlocked"
    func updateEntitlements() async {
        var owned: Set<String> = []
        for await result in Transaction.currentEntitlements {
            guard let transaction = try? checkVerified(result) else { continue }
            if transaction.revocationDate == nil {   // not refunded/revoked
                owned.insert(transaction.productID)
            }
        }
        purchasedProductIDs = owned
    }
}
```

### The non-negotiables

- **Always `finish()` a transaction.** Unfinished consumables/transactions are redelivered forever via `Transaction.updates`.
- **Entitlement = `Transaction.currentEntitlements`, not a local bool.** Recompute on launch and on every `Transaction.updates` event. Respect `revocationDate` (refunds) and, for subscriptions, expiry.
- **Verify before granting.** `.unverified` means a jailbreak/tamper — deny.
- **Start the listener at launch**, not when the paywall opens.

---

## Subscriptions specifics

- **Status:** use `Product.SubscriptionInfo.Status` via `product.subscription?.status` (or `Product.SubscriptionInfo.status(for: groupID)`) for the *current* state including grace period and billing retry — richer than `currentEntitlements` alone.
- **Renewal info:** `status.renewalInfo` (verify it) tells you auto-renew on/off, the next renewal product (upgrade/downgrade/crossgrade pending), and expiration reason.
- **Free trials / intro offers:** check eligibility with `product.subscription?.isEligibleForIntroOffer`. Promotional/win-back offers are passed via `purchase(options:)` with `.promotionalOffer(...)`.
- **Grace period & billing retry:** keep access during `.inGracePeriod` and `.inBillingRetryPeriod` — revoking immediately on a failed renewal churns paying users.
- **Subscription groups:** one active subscription per group; upgrades/downgrades are crossgrades within the group, handled by the App Store, surfaced via `Transaction.updates`.

---

## SwiftUI StoreKit views (iOS 17+) — less code, fewer bugs

For most paywalls, the declarative views handle fetch, purchase, and loading states for you:

```swift
import StoreKit

// Whole subscription group with Apple-managed layout + trial eligibility
SubscriptionStoreView(groupID: "ABCDEF12") {
    MyMarketingHeader()           // your content above the controls
}
.subscriptionStoreButtonLabel(.multiline)
.storeButton(.visible, for: .restorePurchases)

// A single non-consumable
ProductView(id: "com.app.pro")

// A curated set
StoreView(ids: ["com.app.pro", "com.app.coins"])
```

Hook entitlement changes with `.onInAppPurchaseCompletion { product, result in … }` or observe your `Store`. These views still require the launch-time `Transaction.updates` listener for renewals.

---

## Restore purchases

- Provide a visible **Restore Purchases** button (App Review requires it for non-consumables/subscriptions).
- Restore = re-evaluate `Transaction.currentEntitlements` (it's already synced). Only call `AppStore.sync()` if the user explicitly taps Restore and entitlements look empty — it can prompt for App Store auth, so never call it automatically on launch.

---

## Asking for a review (adjacent, commonly needed)

```swift
import StoreKit
@Environment(\.requestReview) private var requestReview   // iOS 16+
// call requestReview() at a delight moment, throttled — Apple caps prompts to 3/year
```

See `asc-aso` for *when* to prompt (conversion impact).

---

## Testing StoreKit

- **Local, no sandbox:** add a **StoreKit Configuration file** (`.storekit`) to the scheme. Lets you test purchases, trials, renewals (accelerated time), Ask-to-Buy, and refunds entirely on-device/simulator.
- **`Transaction` test API:** in `swift-testing`/XCTest use `Transaction.currentEntitlements` against the config file; accelerate subscription renewals in the `.storekit` editor.
- **Sandbox (real ASC):** create Sandbox Apple IDs in App Store Connect → Users and Access → Sandbox. Subscriptions renew on an accelerated real-time schedule.
- Test the unhappy paths explicitly: `userCancelled`, `pending` (Ask-to-Buy), `.unverified`, refund (`revocationDate`), expired subscription, grace period.

See `swift-testing` for the test-authoring patterns and `ios-test` for the harness.

---

## Common bugs this skill prevents

| Symptom | Cause | Fix |
|---------|-------|-----|
| Subscription "lost" after renewal | No `Transaction.updates` listener | Start it at launch; recompute entitlements on each event |
| Purchases redelivered every launch | Transaction never `finish()`ed | `finish()` after granting entitlement |
| Refunded users keep access | Ignoring `revocationDate` | Exclude revoked transactions from entitlements |
| Paying users churned on a card glitch | Revoking on first failed renewal | Honor `.inGracePeriod` / `.inBillingRetryPeriod` |
| "Works in sandbox, fails for some users" | Trusting `.unverified` or local bools | Use `VerificationResult` + `currentEntitlements` |
| Free trial offered to ex-subscribers | Not checking `isEligibleForIntroOffer` | Gate the trial on eligibility |

<!-- END SKILL: storekit-purchases -->

---

<!-- BEGIN SKILL: swift-testing -->

# swift-testing

# Swift Testing

**Author tests with the modern Swift Testing framework** (`import Testing`, Xcode 16+/Swift 6). It coexists with XCTest in the same target — migrate incrementally. For the test *harness*, CI wiring, SwiftData in-memory setup, and UI/performance testing, see `ios-test`; this skill is the authoring model.

> **Pick the right tool.** Swift Testing covers unit/integration/logic tests. **UI tests (`XCUIApplication`) and `XCTMetric` performance tests still use XCTest** — Swift Testing does not replace them. You can keep both in one project.

---

## The shape of a test

```swift
import Testing
@testable import MyApp

@Test func timerStartsAtConfiguredDuration() {
    let timer = FocusTimer(minutes: 25)
    #expect(timer.remaining == .seconds(25 * 60))
}
```

- No `XCTest` subclass, no `test` prefix, no `XCTAssert`. A free function (or method) annotated `@Test`.
- `#expect(...)` records a failure but **continues**. It captures the full expression, so `#expect(a == b)` reports the actual values of `a` and `b` — no need for `XCTAssertEqual`.
- Give tests descriptive names: `@Test("Remaining time is clamped to zero")`.

### `#require` — stop on failure / safe unwrap

```swift
@Test func decodesUser() throws {
    let data = try #require(Self.fixture)         // unwraps Optional or throws → test stops
    let user = try JSONDecoder().decode(User.self, from: data)
    #expect(user.name == "Ada")
}
```

`#require` is the hard assert: if it fails the test stops (like a guard). Use it when continuing would crash or cascade. `try #require(optional)` is the idiomatic non-force unwrap.

---

## Async, throwing, and errors

```swift
@Test func loadsRemoteProfile() async throws {
    let profile = try await client.fetchProfile(id: 42)   // just use async/await
    #expect(profile.id == 42)
}

// Asserting a specific error is thrown
@Test func rejectsEmptyName() {
    #expect(throws: ValidationError.emptyName) {
        try Validator.validate(name: "")
    }
}

// Any error / error of a type
#expect(throws: (any Error).self) { try risky() }
#expect(throws: ValidationError.self) { try validate() }
#expect(throws: Never.self) { try shouldNotThrow() }   // asserts NO throw
```

### Confirmations (callbacks / events that should fire N times)

```swift
@Test func deliversTwoEvents() async {
    await confirmation("emits exactly twice", expectedCount: 2) { confirm in
        stream.onEvent = { _ in confirm() }
        await stream.run()
    }
}
```

`confirmation` replaces `XCTestExpectation` for "this closure must be called exactly N times."

---

## Suites — grouping & shared state

```swift
@Suite("Cart")
struct CartTests {
    let cart: Cart                       // fresh instance per test → natural isolation

    init() async throws {                // runs before EACH test (replaces setUp)
        cart = try await Cart.empty()
    }

    deinit { /* teardown, if needed */ } // runs after each test (for class-based suites)

    @Test func startsEmpty() { #expect(cart.items.isEmpty) }
    @Test func addsItem()   { cart.add(.sample); #expect(cart.items.count == 1) }
}
```

- A `@Suite` is just a `struct`/`final class`/`actor`. Annotation is optional if it only contains `@Test`s, but explicit `@Suite("name")` reads better.
- **Each test gets a fresh suite instance** — `init` runs per test, so state doesn't leak between tests. This is the big ergonomic win over XCTest's shared instance.
- Use a `struct` by default (value semantics, parallel-safe). Use `actor` if tests share mutable reference state.

---

## Parameterized tests — one test, many inputs

```swift
@Test(arguments: ["", " ", "\t"])
func rejectsBlankNames(_ name: String) {
    #expect(throws: ValidationError.self) { try Validator.validate(name: name) }
}

// Multiple argument sets are zipped or crossed:
@Test(arguments: zip([1, 2, 3], [2, 4, 6]))
func doubles(_ input: Int, _ expected: Int) {
    #expect(input * 2 == expected)
}
```

Each argument set is a **separate test case** in the navigator — failures point to the exact input. Prefer this over a `for` loop inside one test (a loop stops at the first failure and hides which input broke).

---

## Traits — control how/when tests run

```swift
@Test(.tags(.networking))                       // group across suites by tag
@Test(.disabled("flaky until FB12345 fixed"))   // skip with a reason (not silent)
@Test(.bug("https://…/issue/42"))               // link a tracker
@Test(.timeLimit(.minutes(1)))                  // fail if it overruns
@Test(.enabled(if: AppFeatures.payments))       // conditional
@Test(.serialized)                              // opt a suite OUT of parallelism
```

Define tags once:

```swift
extension Tag { @Tag static var networking: Self }
```

Run by tag from CLI / scheme to slice fast vs slow suites.

### Known issues (expected failures)

```swift
withKnownIssue("rounding off by one until FB123") {
    #expect(Money(0.1) + Money(0.2) == Money(0.3))
}
```

`withKnownIssue` records the failure without failing the run, and **flips to a failure if the issue is unexpectedly fixed** — so stale workarounds get flagged.

---

## Parallelism (default ON — design for it)

Swift Testing runs tests **in parallel by default**, including across suites, and may run them out of order.

- Don't rely on execution order or shared global mutable state.
- Per-test isolation comes free from fresh suite instances — use it instead of `static var`.
- Force serial execution only when necessary with `@Suite(.serialized)`.
- `@MainActor`-isolate tests that touch main-actor state: `@Test @MainActor func …` (matches `ios-standards` isolation rules).

---

## Migrating from XCTest

| XCTest | Swift Testing |
|--------|---------------|
| `class FooTests: XCTestCase` | `struct FooTests` (`@Suite`) |
| `func testBar()` | `@Test func bar()` |
| `XCTAssert(x)` / `XCTAssertTrue` | `#expect(x)` |
| `XCTAssertEqual(a, b)` | `#expect(a == b)` |
| `XCTAssertNil(x)` | `#expect(x == nil)` |
| `XCTUnwrap(x)` | `try #require(x)` |
| `XCTAssertThrowsError` | `#expect(throws:)` |
| `setUp()` / `tearDown()` | `init()` / `deinit` |
| `XCTestExpectation` / `wait` | `await confirmation { … }` |
| `XCTSkip` | `.disabled(...)` / `.enabled(if:)` traits |
| `XCTExpectFailure` | `withKnownIssue { … }` |

**Migration strategy:** both frameworks run in the same target — convert file-by-file, leave UI/performance tests on XCTest, and don't rewrite working tests just to change syntax. Start with new tests.

See `ios-test` for the harness (schemes, CI, code coverage, SwiftData in-memory containers, UI/perf tests) and `regression-test` for the failing-test-first bug-fix workflow.

<!-- END SKILL: swift-testing -->

---

<!-- BEGIN SKILL: swift6-concurrency -->

# swift6-concurrency

Handle Swift 6 concurrency issues. Swift 6 enforces strict data isolation by default; most errors fall into a small number of patterns with known fixes.

> **Deep reference:** For 8 comprehensive crash scenarios with WRONG/RIGHT pairs, load `ios26-api-reference/essentials/swift6.md`.
> For expert-level patterns (actor isolation, migration strategies), load `ios26-api-reference/guides/expert-swift6.md`.
> For real-world community gotchas, load `ios26-api-reference/intel/community-swift6.md`.
> **Live API verification (Optional):** If Context7 MCP is installed, query it for the latest Swift concurrency documentation. Otherwise, use the static patterns in this skill and flag unfamiliar APIs as "unverified".

---

## Common Error Patterns

### 1. `static property is not concurrency-safe`

App Intent metadata and similar protocol requirements often use `static var`:

```swift
// Wrong
struct MyIntent: AppIntent {
    static var title: LocalizedStringResource = "..."
}

// Correct
struct MyIntent: AppIntent {
    static let title: LocalizedStringResource = "..."
}
```

**Fix:** Change `static var` to `static let` for immutable protocol requirements.

---

### 2. `sending 'self' risks causing data races` in callbacks

```swift
// Wrong
class MyService {
    func doWork() {
        someFrameworkCallback { result in
            self.handleResult(result)  // Error
        }
    }
}

// Correct
class MyService {
    func doWork() {
        someFrameworkCallback { result in
            Task { @MainActor in
                self.handleResult(result)
            }
        }
    }
}
```

**Fix:** Dispatch to `@MainActor` inside the callback via `Task { @MainActor in ... }`.

---

### 3. Framework types not Sendable (EventKit, Speech, AVFoundation, etc.)

```swift
// Wrong — prophylactic @preconcurrency masks real concurrency issues
@preconcurrency import EventKit

func fetch() async -> [EKReminder] { ... }  // [EKReminder] is not Sendable

// Correct — start with plain import; add @preconcurrency only if compiler demands it
import EventKit

@MainActor
class RemindersService {
    func fetch() async -> [EKReminder] { ... }
}
```

**Fix:** Use `@preconcurrency import` ONLY when the compiler specifically demands it on a single import. iOS 26 first-party frameworks (AVFoundation, Vision, ActivityKit, SwiftData, etc.) ship with full Sendable annotations — do not add `@preconcurrency` prophylactically. It masks real concurrency issues that surface as archive crashes. Combine with `@MainActor` isolation where the types are used in UI-adjacent code.

---

### 4. Singleton shared state

```swift
// Wrong — mutable static is not safe
class MySingleton {
    static var shared = MySingleton()
}

// Correct — immutable init, marked nonisolated(unsafe) if truly shared
class MySingleton {
    nonisolated(unsafe) static let shared = MySingleton()
    private init() {}
}
```

**Fix:** Use `nonisolated(unsafe)` only when you can guarantee the instance itself is safe after initialization.

---

### 5. `nonisolated deinit` required for @MainActor classes (Apple Known Issue)

```swift
// Wrong — @MainActor class with deinit crashes on deallocation
@MainActor
class CameraService {
    deinit {
        captureSession.stopRunning()  // CRASH: Cannot access MainActor state from deinit
    }
}

// Correct — nonisolated deinit doesn't access MainActor state
class CameraService {
    nonisolated deinit {
        // Only non-isolated cleanup (e.g., VTCompressionSessionInvalidate)
        // Do NOT access any @MainActor properties here
    }
}
```

**Fix:** All `@MainActor` classes (explicit or via `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`) must use `nonisolated deinit`. Move any MainActor-dependent cleanup to a separate `func cleanup()` called before deallocation.

---

### 6. `MainActor.assumeIsolated` from background queues — Fatal Error

```swift
// Wrong — AVCaptureOutput delegate fires on a BACKGROUND queue
nonisolated func captureOutput(_ output: AVCaptureOutput, didOutput buffer: CMSampleBuffer, from connection: AVCaptureConnection) {
    MainActor.assumeIsolated {
        self.latestBuffer = buffer  // FATAL ERROR: not on main thread
    }
}

// Correct — use Task to hop to MainActor
nonisolated func captureOutput(_ output: AVCaptureOutput, didOutput buffer: CMSampleBuffer, from connection: AVCaptureConnection) {
    Task { @MainActor in
        self.latestBuffer = buffer
    }
}
```

**Fix:** Only use `MainActor.assumeIsolated` when you have *proof* the code runs on the main thread. Framework delegate callbacks are NOT guaranteed main-thread unless the documentation explicitly says so.

---

### 7. Sheet `onDismiss` + `withCheckedContinuation` double-resume

```swift
// Wrong — async onComplete races with synchronous onDismiss
.sheet(isPresented: $showPrompt, onDismiss: {
    completion?(false)  // Fires FIRST (synchronous)
}) {
    PromptView(onComplete: { enabled in
        Task { await promptCompleted(enabled: enabled) }  // Fires SECOND (queued) → DOUBLE RESUME
    })
}

// Correct — synchronous completion, nil before dismiss
func promptCompleted(enabled: Bool) {  // NOT async
    showPrompt = false
    let cb = self.completion
    self.completion = nil       // Nil BEFORE dismiss fires onDismiss
    cb?(enabled)                // Resume exactly once
}
```

**Fix:** Never wrap a sheet's `onComplete` in `Task { await }` if `onDismiss` also resumes the same continuation.

---

### 8. CoreData Sendable Annotations (iOS 26 Beta 5)

```swift
// NSManagedObject is NOT Sendable — never pass between actors
// NSManagedObjectContext IS Sendable — use perform blocks for cross-actor access

// Wrong
func badFunction(item: NSManagedObject) async {
    Task.detached { process(item) }  // data race
}

// Correct
let context = persistentContainer.viewContext
Task.detached {
    await context.perform {
        // Safe — context manages its own queue
    }
}
```

---

### 9. Task closure captures changed from `@Sendable` to `sending`

The closure passed to `Task.init` and `Task.detached` was changed from `@Sendable` to `sending`. The compiler no longer tells you *which* captured values create the data race. Be explicit:

```swift
// Be explicit about captures
Task { [weak self, capturedValue] in
    // capturedValue must be Sendable
    // self is weak reference
}
```

---

## Safe Patterns

### Services that touch UI → `@MainActor`

```swift
@MainActor
@Observable
class MyService {
    var state: MyState = .idle
}
```

### ViewModels always → `@MainActor @Observable`

```swift
@MainActor
@Observable
class MyViewModel {
    var items: [Item] = []
}
```

### Protocols with async methods across actors

```swift
@MainActor
protocol MyProtocol {
    func doWork() async
}

// Implementation inherits isolation
class MyImpl: MyProtocol {
    func doWork() async { ... }
}
```

---

## Unsafe Patterns — Never Use

| Pattern | Problem | Use Instead |
|---------|---------|-------------|
| `struct Wrapper<T>: @unchecked Sendable` | Hides real safety issues | Proper isolation; `@preconcurrency` only if compiler demands it |
| `unsafeBitCast` for Sendable conformance | Undefined behavior | Proper isolation |
| Enabling strict concurrency without audit | Cascading build failures | Audit first, enable per-module |

---

## Framework-Specific Guidance

| Framework | Issue | Solution |
|-----------|-------|----------|
| EventKit | `EKReminder`, `EKCalendar` not Sendable | Only if compiler demands it; prefer `@MainActor` |
| HealthKit | `HKSample` types not Sendable | Only if compiler demands it; prefer `@MainActor` |
| Speech | `SFSpeechRecognitionResult` not Sendable | Only if compiler demands it |
| AVFoundation | `AVAudioEngine` thread safety | Do NOT add prophylactically; use `@MainActor` for UI-related audio |
| VideoToolbox | VTCompressionSession types | Only if compiler demands it |
| Vision | VNRequest types not Sendable | Only if compiler demands it |
| SwiftData | `@Model` NOT Sendable | Do NOT add prophylactically; extract scalars before async boundary |
| ActivityKit | Live Activity types | Only if compiler demands it |
| CoreData | `NSManagedObject` NOT Sendable (Beta 5) | Only if compiler demands it; use `perform` blocks |
| CoreLocation | Location types | Only if compiler demands it |
| WidgetKit | Timeline providers | Only if compiler demands it |
| UserNotifications | Completion handlers | `Task { @MainActor in ... }` in callbacks |

---

## Quick Reference

| Problem | Solution |
|---------|----------|
| `static var` in App Intent | Change to `static let` |
| Callback captures `self` across actors | `Task { @MainActor in self.method() }` |
| Framework type not Sendable | `@preconcurrency import FrameworkName` **only if compiler demands it** |
| Singleton shared state | `nonisolated(unsafe) static let shared` |
| Service needs UI updates | `@MainActor @Observable class` |
| Protocol used across actors | `@MainActor protocol` |
| @MainActor class with deinit | `nonisolated deinit { }` — never access MainActor state |
| `MainActor.assumeIsolated` crash | Only use from guaranteed main-thread code; else `Task { @MainActor in }` |
| Sheet + continuation double-resume | Synchronous completion, nil handler before dismiss |
| @Model crossing async boundary | Extract scalars before `Task` or `AsyncStream` |
| `NSManagedObject` across actors | Use `context.perform { }` — NSManagedObject is NOT Sendable |
| Task capture data race | Explicit `[weak self, value]` capture list |

---

## Archive vs Debug Isolation

Debug builds (`-Onone`) relax strict concurrency checks. Archive builds (`-O`) enforce them fully. **This is the #1 cause of CI failures** — code compiles clean in Xcode's debug/simulator mode but fails in Xcode Cloud's archive build.

Always run an archive build before pushing Swift changes that touch concurrency or actor isolation.

### `nonisolated(unsafe)` for Mutable Stored Properties

Mutable stored properties on `Sendable` types require `nonisolated(unsafe)` in archive builds. Debug builds may not flag this.

```swift
// Wrong — compiles in debug, fails in archive
struct MyConfig: Sendable {
    static var current = MyConfig()
}

// Correct — nonisolated(unsafe) satisfies archive-mode isolation
struct MyConfig: Sendable {
    nonisolated(unsafe) static var current = MyConfig()
}
```

**Rule of thumb:** If your CI catches `MainActor`-isolation or `Sendable` errors that Xcode didn't show locally, you are building in debug mode. Switch to archive (`Product > Archive` or `xcodebuild archive`) to reproduce locally.

---

## Migration Path

When enabling `SWIFT_STRICT_CONCURRENCY: complete` on an existing codebase:

1. Enable per-module incrementally (start with leaf modules)
2. Fix errors bottom-up (models → services → viewmodels → views)
3. Remove any prophylactic `@preconcurrency` imports; keep only those the compiler specifically demands
4. Test each change with a build before proceeding

<!-- END SKILL: swift6-concurrency -->

---

<!-- BEGIN SKILL: swiftui-micro-craft -->

# swiftui-micro-craft

# SwiftUI Micro-Craft

> **Core principle:** Apple-grade polish is not taste — it is a finite set of *quantified, checkable* rules. "It looks a bit off" almost always decomposes into a measurable violation: a value off the grid, an optically-uncentered glyph, a child radius that doesn't nest its parent, a hardcoded duration, a tap target under 44pt. This skill names every rule, scores against it 0–4, and ships a grep auditor so the violation is caught mechanically — not left to a reviewer's eye.

This is the **objective ruler**. It complements three sibling skills:

| Skill | Role | Relationship |
|-------|------|--------------|
| `apple-design` | House style + Liquid Glass + token architecture | This skill *enforces* what that one *describes* |
| `apple-polish` | Subjective Ive/Jobs craftsmanship review | This skill is the ruler those panels cite by § |
| `design-contract` | Mockup → machine-readable contract + capture gates | This skill is the rule layer when there is **no** mockup |

## When to Use

- Writing **any** new SwiftUI view, modifier, or component.
- Reviewing UI in a PR or before a commit that touches `.swift` view code.
- Something "looks off" and you can't name why (spacing, weight, alignment, depth).
- You're about to type a **literal number** into `.padding()`, `.frame()`, `.cornerRadius()`, `.font(.system(size:))`, an animation `duration`, or a hardcoded color.
- Wiring a gesture or adding haptic feedback.

**When NOT to use:** pure engineering bugs (use `apple-cleanup`), accessibility audits beyond Dynamic Type (use `ios-accessibility`), or producing a contract from an existing mockup (use `design-contract`).

## The Iron Rule

**Every literal that controls layout, type, color, motion, or depth must trace to a named token or a stated optical exception.** A raw `16`, `0.3`, `Color.black.opacity(0.2)`, or `.system(size: 20)` in a view body is a defect until proven otherwise. "Proven otherwise" means: it is a documented optical correction (§2) with a one-line comment saying so.

```swift
// ❌ AI slop — five untraceable literals, off-grid, no concentricity, hardcoded motion
VStack(spacing: 10) {
    Text(title).font(.system(size: 17, weight: .semibold))
    Label("Go", systemImage: "arrow.right").padding(13)
}
.padding(15)
.background(.white.opacity(0.08), in: RoundedRectangle(cornerRadius: 14))
.shadow(radius: 8)
.animation(.easeInOut(duration: 0.3), value: isOpen)

// ✅ Apple-grade — every value tokenized, radius nests, motion named, baseline-aligned
VStack(spacing: Spacing.sm) {                         // 8 — on grid
    Text(title).font(.headline)                        // semantic type, scales with Dynamic Type
    Label("Go", systemImage: "arrow.right")
        .labelStyle(.titleAndIcon)
        .padding(.horizontal, Spacing.md)              // 12
        .padding(.vertical, Spacing.sm)                // 8
}
.padding(Spacing.md)                                   // 12 outer
.background(.regularMaterial, in: RoundedRectangle(cornerRadius: Radius.lg)) // 16 outer
// inner radius rule: child = 16 − 12 = 4  (see §5)
.shadow(color: .black.opacity(0.18), radius: 12, y: 4) // depth ladder §8
.animation(.smooth, value: isOpen)                     // named spring §14
```

## The 0–4 Scoring Rubric

Score each view; **anything below 3 ships a defect.** Full rubric and per-rule scoring in [references/auditor.md](references/auditor.md).

| Score | Meaning |
|-------|---------|
| **4 — Apple-grade** | Every value tokenized; optical corrections applied & commented; radii nest; motion named; targets ≥44pt; scales to AX5; no hairline/separator-inset miss. |
| **3 — Shippable** | Tokenized and on-grid; minor optical misses (e.g. icon not optically centered) but nothing geometrically wrong. |
| **2 — Rough** | Mostly on-grid but ≥1 hardcoded literal, OR a radius that doesn't nest, OR a sub-44pt target. |
| **1 — Slop** | Multiple raw literals, off-grid spacing, hardcoded motion, no Dynamic Type. |
| **0 — Broken** | Geometric errors visible at a glance: misaligned baselines, clipped content, overlapping glass. |

## Quick Reference — the 17 domains

Deep treatment of each in **[references/micro-craft-bible.md](references/micro-craft-bible.md)**. The one-line rule per domain:

| § | Domain | The one rule |
|---|--------|-------------|
| 1 | **Spacing grid** | Every gap is a multiple of 4 (ideally 8); use a `Spacing` token, never a literal. |
| 2 | **Optical vs geometric** | Center by *eye*, not by *frame*: triangles/play glyphs/trailing-heavy shapes need a nudge. |
| 3 | **Baseline alignment** | Text beside text or beside an icon aligns on `.firstTextBaseline`, not `.center`. |
| 4 | **SF Symbols** | Symbol weight tracks adjacent text weight; size via `.imageScale`/`.font`, color via `.symbolRenderingMode`. |
| 5 | **Corner concentricity** | Inner radius = outer radius − padding. Nested rounded shapes must be concentric. |
| 6 | **Padding** | Directional and asymmetric on purpose; optical text padding > geometric; never one global number. |
| 7 | **Hit targets** | ≥44×44pt (iOS) tappable area; expand with `.contentShape`, never by bloating visuals. |
| 8 | **Depth ladder** | Shadows come from a fixed elevation scale (rest/raised/overlay); y-offset > blur-only. |
| 9 | **Color discipline** | Semantic tokens only; opacity from a ladder; respect Dark Mode & `.tint`. |
| 10 | **Typography** | Semantic styles; mono digits for counters; set `lineSpacing`/tracking; define truncation. |
| 11 | **Hairlines & separators** | 1px = `1/displayScale`; separators inset to content, not edge-to-edge. |
| 12 | **Dynamic Type** | Type scales automatically; scale *metrics* (padding, icon size) with `@ScaledMetric`; test AX5. |
| 13 | **Safe area** | Backgrounds bleed with `.ignoresSafeArea`; content respects insets; know when to do which. |
| 14 | **Motion** | Named springs (`.smooth`/`.snappy`/`.bouncy`) over magic durations; animate `value:`, not blanket. |
| 15 | **Gestures** | `.contentShape` first; declare priority/simultaneity; thresholds & cancellation are explicit. |
| 16 | **Haptics** | `.sensoryFeedback` (iOS 17+) tied to a state change; `NSHapticFeedbackManager` on macOS; never gratuitous. |
| 17 | **Liquid Glass** | `.containerConcentric` corners; never nest `glassEffect`; ≤8% white tint; interactive glass needs feedback. |

## Workflow

1. **Before writing:** open the bible §s for what you're building (a list row → §1,3,5,6,11; a button → §2,4,7,8,16).
2. **While writing:** every literal gets a token or an optical-exception comment. No exceptions (see Iron Rule).
3. **Before committing:** run the auditor (`references/auditor.md`) over changed views. Score each. Fix anything below 3.
4. **In review:** cite findings by § and score, e.g. *"§5 radius doesn't nest (inner 16 inside 16-padded 16 → should be 0/sharp or reduce padding); §7 close button is 30pt. Score 2."*

## Common Mistakes

| Mistake | Fix | § |
|---------|-----|---|
| One `.padding(16)` everywhere | Directional padding; optical correction for text | 6 |
| `.cornerRadius(12)` inside a 12-padded 16-radius card | `inner = 16 − 12 = 4`, or use `.containerConcentric` | 5 |
| Icon `.center`-aligned with its label | `HStack(alignment: .firstTextBaseline)` + symbol baseline | 3,4 |
| `Image(systemName:)` at default weight beside bold text | `.fontWeight(.semibold)` on the symbol to match | 4 |
| 24pt icon button | `.frame(minWidth: 44, minHeight: 44)` + `.contentShape` | 7 |
| `.animation(.easeInOut(duration: 0.3))` | `.animation(.smooth, value: state)` | 14 |
| `.shadow(radius: 8)` ad hoc | Pull from the elevation ladder with a y-offset | 8 |
| No `@ScaledMetric` on a fixed icon frame | Scale the metric so it grows with text | 12 |
| Haptic fired every frame / on appear | Tie `.sensoryFeedback` to a discrete state transition | 16 |

## See Also

- `apple-design` — token architecture (primitive→semantic→component), Liquid Glass house rules, accessibility checklist.
- `apple-polish` — Ive/Jobs craftsmanship panels (cite this skill's §/score as evidence).
- `design-contract` — when a mockup exists, bind values to it instead of to generic tokens.
- `ios-accessibility` — full VoiceOver/Dynamic Type audit beyond §12.

**References:**
- [sensoryFeedback(_:trigger:) — Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/view/sensoryfeedback(_:trigger:))
- [SensoryFeedback — Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/sensoryfeedback)
- [ScaledMetric — Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/scaledmetric)
- [Human Interface Guidelines: Layout (44pt targets)](https://developer.apple.com/design/human-interface-guidelines/layout)
- iOS 26 API Bible (this repo): `.glassEffect(.regular, in: .rect(cornerRadius: .containerConcentric))`, named springs `.bouncy`/`.smooth`/`.snappy`.

<!-- REFERENCE: swiftui-micro-craft/references/auditor.md -->

# The Micro-Craft Auditor

> Mechanical enforcement for the rules in [micro-craft-bible.md](micro-craft-bible.md). Two layers: a **grep auditor** that flags candidate violations by §, and a **0–4 scoring rubric** for the judgment calls grep can't make. Run the auditor over changed views before every commit; score anything it flags.

The auditor's job is to **surface candidates, not to convict.** Optical corrections (§2) and intentional system defaults are legitimate. A flagged line is a prompt to either tokenize it or add a one-line justifying comment — never to blindly "fix."

---

## Part A — The grep auditor

Copy this into `scripts/micro-craft-audit.sh` in the target repo (or run inline). It scans staged/changed Swift view files and prints findings tagged by §. Pure `grep`/`bash` — no build, no deps.

```bash
#!/usr/bin/env bash
# Micro-craft auditor — flags candidate violations of swiftui-micro-craft §rules.
# Usage: ./micro-craft-audit.sh [path ...]   (defaults to git-changed .swift files)
# Pure grep/bash. Uses process substitution (< <(...)) so the hit counter and the
# per-file header survive — a plain `grep | while` runs in a subshell and loses both.
set -uo pipefail

# Resolve targets: explicit args, else changed files vs HEAD, else all Swift.
if [ "$#" -gt 0 ]; then
  FILES="$*"
else
  FILES="$(git diff --name-only --diff-filter=ACM HEAD -- '*.swift' 2>/dev/null)"
  [ -z "$FILES" ] && FILES="$(git ls-files '*.swift')"
fi
[ -z "$FILES" ] && { echo "No Swift files to audit."; exit 0; }

hits=0
header_printed=0
cur=""
emit() {  # §  message  file:line:content   — prints the file header once, counts the hit
  [ "$header_printed" -eq 0 ] && { echo "▸ $cur"; header_printed=1; }
  printf '  [%s] %s\n      %s\n' "$1" "$2" "$3"
  hits=$((hits+1))
}

# check §  message  regex  [invert-regex]   — runs one grep in the parent shell via < <(...)
check() {
  local sec="$1" msg="$2" re="$3" inv="${4:-}"
  while IFS= read -r l; do
    [ -n "$inv" ] && printf '%s' "$l" | grep -qE "$inv" && continue
    emit "$sec" "$msg" "$cur:$l"
  done < <(grep -nE "$re" "$cur" 2>/dev/null)
}

for f in $FILES; do
  [ -f "$f" ] || continue
  cur="$f"; header_printed=0

  check "§1/§6" "literal padding — tokenize (Spacing.*) or make directional" '\.padding\(\s*[0-9]+'
  check "§1"    "literal stack spacing — use a Spacing token" '(spacing:\s*[0-9]+)' 'spacing:\s*0\b'
  check "§5"    "literal cornerRadius — verify it nests (inner = outer − padding) or use .containerConcentric" '(cornerRadius:\s*[0-9]+)|\.cornerRadius\(\s*[0-9]+'
  check "§4/§10" "hardcoded font size — use a semantic style (.body/.headline…) so it scales" '\.font\(\s*\.system\(size:\s*[0-9]'
  check "§8"    "shadow without y-offset — reads as a glow; use the elevation ladder (radius + y)" '\.shadow\(' 'y:'
  check "§9"    "literal color / freehand opacity — use a semantic token + opacity ladder" 'Color\.(black|white|gray|red|blue|green)\b|\.opacity\(\s*0?\.[0-9]+'
  check "§9"    "raw RGB/hex in view — move to asset catalog / token with dark-mode variant" 'Color\(red:|#[0-9A-Fa-f]{6}|init\(hex'
  check "§14"   "magic-number animation duration — prefer named springs (.smooth/.snappy/.bouncy) or tokenize" '(easeInOut|easeIn|easeOut|linear|spring)\([^)]*duration:\s*[0-9.]'
  check "§14"   "unscoped .animation — bind to value: so it only animates the trigger" '\.animation\([^,)]*\)\s*$'
  # (§3 baseline alignment is a judgment call — not regex-detectable; score it via Part B, not here.)

  # §2 raw .offset without an optical justification comment (allowed only if commented)
  while IFS= read -r l; do
    case "$l" in *optical*) : ;; *) emit "§2" ".offset without // optical: comment — justify the nudge or remove it" "$cur:$l";; esac
  done < <(grep -nE '\.offset\(' "$f" 2>/dev/null)

  # §17 nested glassEffect (forbidden) — flag files with >1 occurrence for manual check
  gcount=$(grep -cE '\.glassEffect\(' "$f" 2>/dev/null); gcount=${gcount:-0}
  [ "$gcount" -gt 1 ] && emit "§17?" "multiple glassEffect calls ($gcount) — ensure none are nested; group with GlassEffectContainer" "$cur"

  # §16 haptic on appear / in a loop (gratuitous)
  if grep -qE 'sensoryFeedback|NSHapticFeedback' "$f" 2>/dev/null && grep -qE 'onAppear|ForEach|while |for ' "$f" 2>/dev/null; then
    emit "§16?" "haptic + onAppear/loop present — confirm haptics fire only on discrete state changes" "$cur"
  fi
done

echo
if [ "$hits" -eq 0 ]; then
  echo "✓ Micro-craft auditor: no candidate violations."
else
  echo "⚠ $hits candidate(s). Each must be tokenized OR carry a one-line justifying comment. See micro-craft-bible.md."
fi
exit 0   # advisory by default; flip to 'exit $((hits>0))' to gate commits
```

### Notes on the auditor

- **Advisory by default.** It exits 0 so it never blocks; flip the last line to gate. Many hits are *legitimate* (a `0` spacing, a commented optical offset, a system default). The point is to make every literal a conscious decision.
- **Heuristics marked with `?`** (§3, §17, §16) are low-confidence — they flag *shape*, not certainty. Eyeball them.
- **False positives are the design.** A clean view passes; a view with raw literals gets a list of "tokenize-or-justify" prompts. That's RED→GREEN at the line level.
- Wire it into a pre-commit hook or the `merge-check` skill's gate if you want it enforced.

---

## Part B — The 0–4 scoring rubric (judgment layer)

Grep can't see optical centering or whether a radius *actually* nests. Score each view by hand using the table below; the auditor's hit-count feeds the lower scores.

### Per-domain scoring

For each view, mark each applicable domain ✓ (correct) / ✗ (violated) / — (N/A):

| § | Pass condition |
|---|----------------|
| 1 | All spacing/padding on the 4pt grid via tokens; zero bare literals |
| 2 | Asymmetric glyphs optically corrected with `// optical:` comments |
| 3 | Mixed-size text & icon+text rows baseline-aligned |
| 4 | Symbol weight matches neighbor; size via imageScale/font; rendering mode set |
| 5 | Every nested radius concentric (`inner = outer − padding`) or `.containerConcentric` |
| 6 | Padding directional/asymmetric where content demands it |
| 7 | Every interactive element ≥44pt with `.contentShape` |
| 8 | Shadows from the elevation ladder, with y-offset; one per surface |
| 9 | Semantic color tokens; opacity ladder; dark-mode safe |
| 10 | Semantic text styles; monospaced digits on counters; truncation defined |
| 11 | Hairlines `1/displayScale`; separators inset to content |
| 12 | Type scales; metrics use `@ScaledMetric`; survives AX5 |
| 13 | Backgrounds bleed; content respects safe area |
| 14 | Named springs / tokenized timing; scoped `value:`; Reduce Motion handled |
| 15 | `.contentShape` first; priority/simultaneity & thresholds explicit |
| 16 | Haptics on discrete state changes only; semantic match |
| 17 | (if glass) concentric corners; no nesting; ≤8% tint; interactive feedback |

### Aggregate score

| Score | Rule |
|-------|------|
| **4** | All applicable domains ✓; optical corrections present & commented; passes AX5. |
| **3** | All geometric domains ✓ (1,3,5,7,11,13); ≤1 optical/polish miss (2,4,8,16). |
| **2** | Any single geometric violation: a bare literal (§1), non-nesting radius (§5), sub-44pt target (§7), or no Dynamic Type (§12). |
| **1** | Multiple literals + hardcoded motion + no Dynamic Type. |
| **0** | Visible geometric breakage: misaligned baselines, clipped content, nested/overlapping glass. |

**Gate: anything below 3 ships a defect.** Fix to ≥3 before commit; aim for 4 on anything a user touches repeatedly (buttons, rows, the primary screen).

### How to report a finding (review shorthand)

Cite the §, give the score, then list findings **tagged by severity**, and close with **Quick Wins** — the top ≤3 fixes doable in five minutes. (Severity + Quick Wins format adapted from huashu-design's 5-dimension critique.)

Severity tags:
- **⚠️ fatal** — visible geometric breakage or a sub-44pt target a user will hit (caps the score at 0–1).
- **⚡ important** — a real defect (non-nesting radius, hardcoded motion, no Dynamic Type) that holds the score at 2.
- **💡 polish** — optical/refinement miss (uncommented nudge, off-ladder shadow) separating a 3 from a 4.

> **`FocusButton.swift` — score 2**
> ⚡ §5: inner `RoundedRectangle(cornerRadius: 16)` inside a 12-padded 16-radius card → arcs pinch; use `16−12=4` or `.containerConcentric`.
> ⚠️ §7: chevron button is 28pt; add `.frame(width: 44, height: 44).contentShape(Rectangle())`.
> 💡 §8: `.shadow(radius: 8)` has no y-offset — reads as a glow; pull from the elevation ladder.
>
> **Quick Wins:** (1) wrap the chevron in a 44pt frame; (2) drop the inner radius to 4; (3) add `y: 4` to the shadow.

Cite §, give the number, tag the severity, give the fix. That's the whole loop.

<!-- REFERENCE: swiftui-micro-craft/references/micro-craft-bible.md -->

# The SwiftUI Micro-Craft Bible

> The complete, quantified treatment of every micro-craft domain. SKILL.md is the index and the scoring entrypoint; this is the reference. Each § gives the **rule**, the **why**, **Do/Don't**, and the **API** (verified against Apple docs / the iOS 26 API Bible — see References at the bottom of SKILL.md).

A note on tokens: this file references generic token names (`Spacing.md`, `Radius.lg`, `Motion.standard`). In a specific app, bind them to that app's real token enum. The *rules* are universal; the *values* are per-app.

---

## §1 — The spacing grid

**Rule:** Every gap, inset, and offset is a multiple of **4**, and you reach for **8** first. Express it through a `Spacing` token, never a bare literal.

**Why:** A 4pt base grid is the lattice the entire system aligns to. Off-grid values (10, 13, 15, 18) read as "almost right," which the eye registers as cheapness even when it can't name it. The grid is also how independent components line up *with each other* without coordination.

Canonical ladder (adapt names to your app):

| Token | pt | Use |
|-------|----|----|
| `xxs` | 4 | Icon-to-label, tight chip internals |
| `xs` | 8 | Default intra-component gap |
| `sm` | 12 | Related elements |
| `md` | 16 | Standard content padding, card insets |
| `lg` | 24 | Section separation |
| `xl` | 32 | Major blocks |
| `xxl` | 48 | Screen-level breathing room |

**Don't:** `VStack(spacing: 10)`, `.padding(15)`, `.padding(.top, 18)`.
**Do:** `VStack(spacing: Spacing.xs)`, `.padding(Spacing.md)`.

**Subtlety:** `VStack`/`HStack` default spacing is system-chosen (~8–10 depending on content) and is *fine* when you genuinely want the system default — but make it a decision, not an accident. If you set spacing, tokenize it.

---

## §2 — Optical vs geometric alignment

**Rule:** Center things by how they *look*, not by their bounding box. Shapes with visual weight off their geometric center need a deliberate nudge.

**Why:** The human eye centers on a shape's *visual mass*, not its frame. A play triangle, a chevron, a paper-plane "send" glyph, or any trailing-heavy form looks off-center when frame-centered.

The classic cases:

| Element | Problem | Correction |
|---------|---------|-----------|
| Play ▶ icon in a circle | Triangle's mass sits left of frame center | Nudge **right** ~1–2pt (`.offset(x: 1)` or `.padding(.leading, 2)`) |
| Chevron `>` row accessory | Optically light, sits too close to edge | Standard trailing inset, then trust the system |
| Up/down/send arrows | Directional mass | Offset *toward* the heavy side by 1–2pt |
| Glyph + text on one line | Cap-height vs x-height mismatch | Baseline-align (§3), don't center |

**Do:** comment every optical correction so it survives refactors:
```swift
Image(systemName: "play.fill")
    .offset(x: 1)   // optical: triangle mass sits left of center (§2)
```

**Don't:** apply a magic offset with no comment — the next agent will "clean it up" and reintroduce the imbalance.

This is the **one place** raw literals are allowed in a view body — and only with the `// optical:` comment. The auditor whitelists `.offset` lines carrying that comment.

---

## §3 — Baseline alignment

**Rule:** When text sits beside text (different sizes) or beside an icon, align on the **text baseline**, not vertical center.

**Why:** Two strings of different point sizes centered vertically have mismatched baselines — they look like they're floating at different heights. Baseline alignment is how typesetting has worked for 500 years.

```swift
// ❌ "24" and "min" float at different heights
HStack { Text("24").font(.largeTitle); Text("min").font(.body) }

// ✅ they sit on the same line
HStack(alignment: .firstTextBaseline) {
    Text("24").font(.largeTitle)
    Text("min").font(.body).foregroundStyle(.secondary)
}
```

- Use `.firstTextBaseline` for top-aligned multi-line; `.lastTextBaseline` when bottoms should match.
- For an SF Symbol that should sit on the text baseline, prefer `Label` or put the symbol *inside* the `Text` via interpolation (`Text("\(Image(systemName: "bolt.fill")) Charged")`) so it inherits the baseline and font metrics automatically.
- Numeric readouts (a timer's "24" + "min", a price's "$" + "9" + ".99") almost always want baseline alignment.

---

## §4 — SF Symbols

**Rule:** A symbol's **weight matches the adjacent text's weight**, its **size** is set with `.imageScale` or `.font`, and its **color treatment** is chosen with `.symbolRenderingMode`. Never leave all three to default beside styled text.

**Why:** SF Symbols are designed as a *typeface*. A default-weight symbol next to semibold text looks anemic; an oversized symbol breaks the line's rhythm. The symbol should feel like it was set in the same font.

| Concern | API | Note |
|---------|-----|------|
| Weight | `.fontWeight(.semibold)` or inherit via `.font(.headline)` | Match the neighbor text weight |
| Size | `.imageScale(.small/.medium/.large)` or `.font(.system(size:))` | `.imageScale` scales *relative* to surrounding text — preferred |
| Color | `.symbolRenderingMode(.hierarchical / .palette / .multicolor / .monochrome)` | `.hierarchical` gives free depth from one color |
| Variant | `.symbolVariant(.fill / .circle / .slash)` | Don't hardcode `"x.circle.fill"` if context implies it |

```swift
// ✅ symbol set like type: inherits headline weight & size, hierarchical depth
Label("Focus", systemImage: "scope")
    .font(.headline)
    .symbolRenderingMode(.hierarchical)
    .foregroundStyle(.tint)
```

**Do:** prefer `.imageScale` so the symbol scales with Dynamic Type and the surrounding font.
**Don't:** `Image(systemName: "scope").font(.system(size: 11))` beside 10pt caps text — the 1pt mismatch is visible and won't scale.

For animation, SF Symbols support `.symbolEffect(.bounce / .pulse / .variableColor, value:)` (iOS 17+) — tie to a state change, not `.onAppear` loops (§14, §16).

---

## §5 — Corner-radius concentricity

**Rule:** A rounded shape nested inside another rounded shape must be **concentric**: `innerRadius = outerRadius − padding`. Two independent radii inside each other are the single most common "looks cheap" tell.

**Why:** When a card has radius R and contains a button with its own radius, the gap between their arcs must be constant all the way around the corner. That only happens when `inner = outer − inset`. If both are 16 with 12pt padding between them, the inner arc is *tighter* than the gap — the corners visibly "pinch."

```swift
// Card: radius 16, padding 12 → inner content radius must be 16 − 12 = 4
RoundedRectangle(cornerRadius: 16)
    .padding(12)
    // any rounded child here uses cornerRadius 4

// iOS 26: let the system do it automatically
.glassEffect(.regular, in: .rect(cornerRadius: .containerConcentric))
// or
RoundedRectangle(cornerRadius: .containerConcentric)
```

- **Portable rule (all OS versions):** compute `outer − padding` by hand, store as tokens (`Radius.card`, `Radius.cardInner`).
- **iOS 26:** `.containerConcentric` resolves the inner radius from the container automatically — prefer it inside containers that propagate a concentric shape.
- If `outer − padding ≤ 0`, the inner shape should be **square** (radius 0), not a tiny positive radius.
- A `Capsule` inside a `RoundedRectangle` is fine — capsules are radius-by-height, exempt from the formula, but still center them within the parent's safe corner.

---

## §6 — Padding

**Rule:** Padding is **directional and asymmetric on purpose**. A single global `.padding(n)` is a smell unless the content is genuinely symmetric. Text needs *optical* padding that differs from geometric.

**Why:** Real layouts have hierarchy: more space above a heading than below it; more leading inset than trailing for a chevron row; tighter top than bottom on a button because cap-height leaves optical space. One number can't express that.

| Situation | Padding shape |
|-----------|---------------|
| Button label | `.padding(.horizontal, md)` `.padding(.vertical, sm)` — wider than tall |
| Text block | slightly less top than bottom (cap height eats top space) |
| List row with trailing chevron | full leading inset, reduced trailing |
| Icon-only button | symmetric, but expand hit area via `.contentShape` (§7) not padding |

```swift
// ❌ one number, ignores that text has optical top-space from cap height
Text(title).padding(16)

// ✅ directional
Text(title)
    .padding(.horizontal, Spacing.md)
    .padding(.top, Spacing.sm)
    .padding(.bottom, Spacing.md)
```

**Order matters:** `.padding().background()` paints behind the padding; `.background().padding()` paints only the content then spaces it. Decide which you mean.

---

## §7 — Hit targets

**Rule:** Every interactive element has a **≥44×44pt** tappable area (Apple HIG minimum). When the *visual* is smaller, expand the *hittable* area with `.contentShape` + a min frame — never by inflating the glyph.

**Why:** A 24pt close button is a frustrating target; misses feel like the app is broken. But you don't want a 44pt-wide *visible* X. The fix decouples visual size from touch size.

```swift
Button(action: dismiss) {
    Image(systemName: "xmark")
        .imageScale(.medium)
        .frame(width: 44, height: 44)   // hit area
        .contentShape(Rectangle())       // entire frame is tappable, incl. transparent
}
```

- `.contentShape(Rectangle())` makes the *whole* frame hittable, including transparent padding — without it, only the glyph's pixels respond.
- Rows: give the row `.contentShape(Rectangle())` so taps in the gaps register.
- **macOS:** pointer targets can be tighter than 44pt, but respect a comfortable click target (~28pt+) and add `.help()` tooltips and hover feedback (`.onHover`).

---

## §8 — Depth & the elevation ladder

**Rule:** Shadows come from a **fixed elevation scale**, not ad-hoc `radius:` values. Real depth uses a **y-offset** (light comes from above) plus low opacity — not a big symmetric blur.

**Why:** Inconsistent shadows make a UI feel like cut-and-paste. A 3-step ladder (rest / raised / overlay) keeps every elevated surface coherent. A symmetric `.shadow(radius: 8)` with no offset looks like a glow, not a shadow.

| Level | Use | Shape (tune per app) |
|-------|-----|----------------------|
| **Rest** | Cards on background | `color: .black.opacity(0.08), radius: 6, y: 2` |
| **Raised** | Buttons, active card | `opacity(0.16), radius: 12, y: 4` |
| **Overlay** | Sheets, popovers, menus | `opacity(0.24), radius: 24, y: 8` |

```swift
// ✅ ladder token, directional
.shadow(color: .black.opacity(0.16), radius: 12, y: 4)   // Elevation.raised
```

- Prefer **one** shadow per surface. Stacking shadows is almost always wrong.
- On Liquid Glass, let the glass material carry depth — don't add a heavy drop shadow on top (§17).
- Dark mode: shadows are weaker; lean on lighter backgrounds/borders for separation instead of darker shadows.

---

## §9 — Color & token discipline

**Rule:** Colors come from **semantic tokens**; opacity comes from a **defined ladder**; everything respects Dark Mode and the environment `.tint`.

**Why:** `Color.black.opacity(0.2)` scattered through views can't be themed, can't adapt to dark mode, and drifts (0.18 here, 0.22 there). Semantic naming (`Color.surfaceSecondary`, `Color.separator`) makes intent legible and change a one-line edit.

- **Never** literal RGB/hex in a view body. Define in an asset catalog or token enum with light/dark variants.
- Opacity ladder: pick a small set (e.g. `0.04 / 0.08 / 0.16 / 0.24`) and name them; don't freehand decimals.
- Use `.foregroundStyle` (not deprecated `.foregroundColor`) and `.tint` for accent propagation.
- Use system semantic colors (`.primary`, `.secondary`, `.tertiary`, `Color(.separator)`) where they fit — they're already dark-mode and accessibility correct.
- Respect `.background(.regularMaterial)` etc. for vibrancy instead of faking translucency with opacity.

---

## §10 — Typography

**Rule:** Use **semantic text styles** (`.headline`, `.body`, `.caption`); use **monospaced digits** for any changing number; set `lineSpacing`/tracking deliberately; define truncation behavior.

**Why:** Semantic styles scale with Dynamic Type for free (§12). Proportional digits make a running timer or counter "wobble" as glyph widths change — monospaced digits hold still. Default line spacing is often too tight for multi-line body copy.

```swift
// counters / timers — no horizontal jitter
Text(timeString).font(.system(.title, design: .rounded).monospacedDigit())
// or
Text(count, format: .number).monospacedDigit()

// multi-line body — give it air, control truncation
Text(longBody)
    .lineSpacing(2)
    .lineLimit(3)
    .truncationMode(.tail)
```

- Headlines/labels: tracking can tighten slightly at large sizes (`.tracking(-0.2)`) — optional, test it.
- Never `.font(.system(size: 17))` to mimic `.body` — you lose Dynamic Type and the value drifts from the real metric.
- All-caps labels: use `.textCase(.uppercase)` + tracking, not a hardcoded uppercased string.

---

## §11 — Hairlines & separators

**Rule:** A true hairline is **`1 / displayScale`** points, not `1`. Separators are **inset to content**, not edge-to-edge, unless they intentionally span (e.g. full-width section break).

**Why:** On a 3× screen, a 1pt line is 3 physical pixels — chunky. `1/displayScale` is a single device pixel — the crisp hairline Apple uses. And list separators that run to the screen edge look unfinished; system lists inset them to the text's leading edge.

```swift
@Environment(\.displayScale) private var displayScale

Rectangle()
    .fill(Color(.separator))
    .frame(height: 1 / displayScale)   // one physical pixel
    .padding(.leading, Spacing.md)     // inset to content, matches row text
```

- In `List`, use `.listRowSeparator(.hidden)` + `.alignmentGuide`/insets or `.listRowInsets` rather than fighting defaults.
- A `Divider()` is convenient but doesn't give you `1/displayScale` control or inset by default — wrap it or use the `Rectangle` form when precision matters.

---

## §12 — Dynamic Type

**Rule:** Text scales automatically via semantic styles. **Non-text metrics** (icon frames, custom paddings, fixed heights) must scale too — use `@ScaledMetric`. Test at **AX5** (largest accessibility size).

**Why:** A layout that's perfect at default size collapses at AX5 if the icon is a fixed 24pt while the text triples. `@ScaledMetric` ties a numeric value to the Dynamic Type setting so it grows proportionally. (Available iOS 14+; scales any `BinaryFloatingPoint`; `relativeTo:` defaults to `.body`.)

```swift
@ScaledMetric(relativeTo: .headline) private var iconSize: CGFloat = 24

Image(systemName: "bell")
    .frame(width: iconSize, height: iconSize)   // grows with the headline
```

- Don't `@ScaledMetric` *everything* — grid spacing usually stays fixed; scale things that pair with text (icon sizes, avatar diameters, min row heights).
- Avoid fixed `.frame(height:)` on text containers; let them grow. If you must cap, cap at a scaled value.
- Test: Settings → Accessibility → Larger Text → AX5, or `#Preview` with `.dynamicTypeSize(.accessibility5)`. A view that breaks at AX5 scores ≤2.

---

## §13 — Safe area & full-bleed

**Rule:** **Backgrounds bleed** edge-to-edge with `.ignoresSafeArea`; **content respects** safe-area insets. Know which layer you're on.

**Why:** A gradient or image background should run under the notch and home indicator (full-bleed) — but the readable content must stay inside the safe area or it gets clipped/obscured. Mixing these up gives you either letterboxed backgrounds or text under the Dynamic Island.

```swift
ZStack {
    BackgroundGradient().ignoresSafeArea()   // bleeds to physical edges
    ScrollView { content }                    // respects safe area automatically
}
```

- Scope it: `.ignoresSafeArea(.container, edges: .bottom)` is more honest than a blanket `.ignoresSafeArea()`.
- Use `.safeAreaInset(edge:)` to place a pinned toolbar/CTA that *pushes* content rather than overlapping it.
- Keyboard: `.ignoresSafeArea(.keyboard)` selectively when you don't want content to jump.

---

## §14 — Motion

**Rule:** Prefer **named springs** (`.smooth`, `.snappy`, `.bouncy`) over magic `duration:` numbers. Animate a specific `value:`, never wrap the world in `.animation()`. Tokenize any custom timing.

**Why:** Hardcoded `easeInOut(duration: 0.3)` scattered around gives every transition a slightly different feel. iOS 17+ named springs are tuned to feel native and self-document intent: `.snappy` for UI that should feel responsive, `.smooth` for content, `.bouncy` for playful affordances. Implicit `.animation(_, value:)` scopes the animation to the state that changed.

```swift
// ❌ magic number, unscoped (animates EVERYTHING that changes)
.animation(.easeInOut(duration: 0.3))

// ✅ named spring, scoped to the trigger
.animation(.snappy, value: isExpanded)

// custom spring → tokenize it, don't inline
extension Animation { static let panelReveal = Animation.spring(response: 0.4, dampingFraction: 0.8) }
.animation(.panelReveal, value: isOpen)
```

- `withAnimation(.smooth) { state.toggle() }` for explicit, event-driven changes.
- Respect Reduce Motion: `@Environment(\.accessibilityReduceMotion)` — swap springs for a cross-fade or none.
- Transitions: use `.transition(.move/.opacity/.scale)` with a matching animation; for shared-element morphs on glass use `matchedGeometryEffect`/`glassEffectID` (§17).
- Never drive continuous animation from `.onAppear` timers when a `value:`-bound animation will do.

---

## §15 — Gestures

**Rule:** Define the **hit shape first** (`.contentShape`), then declare **priority and simultaneity** explicitly, and make **thresholds and cancellation** intentional. Gestures should never silently steal touches from scrolling.

**Why:** The default gesture stack resolves conflicts in non-obvious ways. A `DragGesture` on a row inside a `ScrollView` can hijack the scroll unless you set thresholds or simultaneity. Being explicit is the difference between "feels native" and "feels fighty."

| Need | API |
|------|-----|
| Whole area responds | `.contentShape(Rectangle())` before the gesture |
| Tap | `.onTapGesture` (cheap) or `TapGesture()` for composition |
| Drag with a dead zone | `DragGesture(minimumDistance: 10)` so small moves stay scrolls |
| Run alongside scroll | `.simultaneousGesture(...)` |
| Take precedence | `.highPriorityGesture(...)` (use sparingly) |
| Long-press → drag | `LongPressGesture().sequenced(before: DragGesture())` |

```swift
.contentShape(Rectangle())
.gesture(
    DragGesture(minimumDistance: 10)         // dead zone preserves scroll
        .onChanged { value in offset = value.translation.width }
        .onEnded { value in
            withAnimation(.snappy) {           // §14
                offset = abs(value.translation.width) > 80 ? .commit : 0  // explicit threshold
            }
        }
)
```

- Always animate gesture *resolution* (`onEnded`) with a named spring (§14).
- Pair a committing gesture with haptic confirmation (§16).
- Don't attach gestures to zero-padding glyphs — combine with §7's hit-area expansion.

---

## §16 — Haptics

**Rule:** Haptics confirm a **discrete state change** the user caused. On iOS use `.sensoryFeedback(_:trigger:)` (iOS 17+) bound to a value; on macOS use `NSHapticFeedbackManager`. Never fire on `.onAppear`, in a loop, or "for flavor."

**Why:** Good haptics are felt, not noticed — they close the loop on an action (toggle flipped, item committed, limit reached). Gratuitous haptics feel cheap and drain the Taptic Engine's credibility. The `trigger:` form fires precisely when the bound value changes, which is exactly when feedback is meaningful.

```swift
// iOS 17+ — fire when `isComplete` flips
.sensoryFeedback(.success, trigger: isComplete)

// pick the semantic, not a raw impact, when one exists:
.sensoryFeedback(.selection, trigger: selectedTab)     // picker/segmented change
.sensoryFeedback(.impact(weight: .light), trigger: dragCommitted)
.sensoryFeedback(.warning, trigger: validationFailed)

// conditional: only on a meaningful transition
.sensoryFeedback(.increase, trigger: count) { old, new in new > old }
```

Available `SensoryFeedback` semantics: `.success`, `.warning`, `.error`, `.selection`, `.increase`, `.decrease`, `.start`, `.stop`, `.alignment`, `.levelChange`, and `.impact(weight:intensity:)` / `.impact(flexibility:intensity:)`.

```swift
// macOS — no SwiftUI sensoryFeedback parity; use AppKit at the boundary
import AppKit
NSHapticFeedbackManager.defaultPerformer.perform(.alignment, performanceTime: .now)
// patterns: .generic, .alignment, .levelChange
```

- Match the semantic to the meaning: `.success` for completion, `.selection` for value changes, `.error`/`.warning` for blocks. Reaching for `.impact` everywhere is a smell.
- Respect the system: don't haptic-spam; one event = one feedback.
- Gate behind the user's settings if your app exposes a haptics toggle.

---

## §17 — Liquid Glass micro-rules (iOS 26 / macOS 26)

**Rule:** Glass corners use `.containerConcentric`; **never nest `glassEffect` inside `glassEffect`**; tint stays **≤8% white**; interactive glass **must** have hover/press feedback. (These mirror `apple-design`'s house rules — repeated here as checkable items.)

**Why:** Liquid Glass samples what's behind it. Glass-on-glass double-samples and muddies; over-tinting kills the translucency that justifies the material; un-concentric corners on a glass container break the optical nesting the material is designed around.

```swift
// ✅ single glass layer, concentric corners, interactive feedback
Button("Edit") { }
    .glassEffect(.regular.interactive(), in: .rect(cornerRadius: .containerConcentric))

// group sibling glass elements so they share context & can morph — NOT nest
GlassEffectContainer(spacing: 20) {
    button1.glassEffect(.regular.interactive())
    button2.glassEffect(.regular.interactive())
}
```

The four glass rules (checkable):
1. **≤8% white opacity** for any tint overlay on glass.
2. **No solid color overlays** on glass — defeats the material.
3. **Never nest** `glassEffect` within `glassEffect`; use `GlassEffectContainer` for grouping.
4. **Interactive glass needs feedback** — `.interactive()` + hover/press state.

- Don't stack a heavy drop shadow (§8) on glass — the material carries its own depth.
- Morphing: `glassEffectID(_, in:)` within a `GlassEffectContainer` + an animated state change (§14).

---

## How the §s combine (recipes)

| Building | Apply |
|----------|-------|
| **List row** | §1 spacing · §3 baseline · §6 directional padding · §7 row contentShape · §11 inset separator · §12 scaled icon |
| **Primary button** | §2 optical glyph · §4 symbol weight · §5 inner radius · §7 44pt · §8 raised shadow · §14 press spring · §16 impact on commit |
| **Card** | §1 · §5 concentric children · §8 rest shadow · §9 surface token · §13 if it bleeds |
| **Sheet / overlay** | §8 overlay shadow · §13 safe-area inset CTA · §14 presentation spring · §17 if glass |
| **Counter / timer** | §3 baseline · §10 monospaced digits · §12 scaled · §16 haptic on threshold |
| **Draggable card** | §7 contentShape · §14 resolution spring · §15 threshold + simultaneity · §16 commit haptic |

<!-- END SKILL: swiftui-micro-craft -->

---

<!-- BEGIN SKILL: verify-against-spec -->

# verify-against-spec

# Verify Against Spec

Parallel verification that catches implementation gaps before they slip through context compaction.

## When to Use

- End of a multi-session feature development cycle
- "Make sure we haven't missed anything"
- Context window is filling up and you want a coverage check
- After a code review that introduced fixes — are all fixes applied?

**Do NOT use for:** Simple single-file changes, bug fixes without a spec, UI polish.

## Process

```
Find spec file (+ design contract, if one exists)
    │
    ▼
Launch parallel agents
    ├─► Spec Coverage Verifier
    ├─► Build + Test
    ├─► Docs Sync
    └─► Visual Fidelity Verifier   (only when a design-contract + captures/ exist)
    │
    ▼
Triage results
    │
    ▼
High severity gaps? ─► Yes ─► Fix gaps ─► Commit
                    └► No  ─► Commit
```

## Step 1: Find the Spec

Look in order:
1. `docs/plans/<feature-plan>.md`
2. `docs/brainstorm/<feature>/design.md`
3. Ask the user if unclear

Also look for a **design contract** (`<app>/docs/vision/<feature>-design-contract.md`, see `design-contract`). If one exists with a `captures/` directory, enable Agent 4.

## Step 2: Launch Parallel Agents

Dispatch the agents simultaneously. Each runs independently. Agent 4 runs **only** when a design contract + captures exist (UI-fidelity work); skip it for non-visual features.

```
Coordinator (you)
├─► Agent 1 — Spec Coverage Verifier   [Standard tier: claude-sonnet-4-6 / gpt-4.1 / gemini-3.1-pro / kimi-k2.5]
├─► Agent 2 — Build + Test             [Fast tier:     claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
├─► Agent 3 — Docs Sync               [Fast tier:     claude-haiku-4-5 / gpt-4.1-mini / gemini-3.0-flash / kimi-for-coding]
└─► Agent 4 — Visual Fidelity Verifier [Standard tier: claude-sonnet-4-6 / gpt-4.1 / gemini-3.1-pro / kimi-k2.5]   (conditional)
         │
         ▼ (all complete)
Coordinator — triage and fix
```

### Agent 1 — Spec Coverage Verifier

Prompt template:
```
You are verifying implementation coverage for a feature.

DESIGN SPEC: <path to spec or plan>

Read the spec and identify every requirement, behavior, and component it describes.
Then read the implementation files listed below.

For each spec requirement, determine:
- IMPLEMENTED: clearly present in code
- PARTIAL: partially implemented or different from spec
- MISSING: not found in implementation

Implementation files to check:
<list the key new/modified files from this feature>

Return a list sorted by severity (High = functional gap, Medium = behavioral mismatch, Low = cosmetic/naming).
Format each gap as: [Severity] Requirement | Current State | Spec Says
```

### Agent 2 — Build + Test

**(Fast tier — mechanical execution, no judgment required)**

Run your project's build and test commands:

```bash
# Build — use your project's build system
# Examples: xcodebuild, swift build, make build
<project-build-command> 2>&1 | grep -E "error:|BUILD SUCCEEDED|BUILD FAILED"

# Test — use your project's test runner
<project-test-command> 2>&1 | tail -5
```

Report: build status + test count + any failures.

### Agent 3 — Docs Sync

**(Fast tier — read-only comparison)**

Check:
- Project documentation — do conventions accurately reflect new patterns introduced?
- Memory files — do they capture key decisions/gotchas from this session?
- Plan file — should it be moved to a completed folder?

Return: list of stale/missing entries with suggested updates.

### Agent 4 — Visual Fidelity Verifier (conditional)

**(Standard tier — judgment required. Run only when a `design-contract` + `captures/` exist.)**

Where Agent 1 checks *behavioral* coverage, this agent checks *visual* coverage against the design contract's §9 canonical frames. It does not eyeball "close enough" — it checks contracted tokens and the presence of capture proof.

Prompt template:
```
You are verifying visual fidelity for a UI feature against its design contract.

DESIGN CONTRACT: <app>/docs/vision/<feature>-design-contract.md
CAPTURES DIR:    <app>/docs/vision/captures/
IMPLEMENTATION:  <list the SwiftUI view files changed in this feature>

For each canonical frame in the contract's §9 table:
- CAPTURE PRESENT: is there a captures/<PreviewName>.png matching the §9 Preview name?
- PREVIEW EXISTS:  does a #Preview with that exact name exist in the view files?
For the implementation, check the contract's hard tokens:
- §1 colors:   any raw hex literal in view code instead of a named token? (violation)
- §2 type:     font sizes match the SwiftUI-mapping column (not the mockup px)?
- §8 copy:     every user-facing string matches §8 VERBATIM, by string id (punctuation included)?
- §10 rules:   any non-negotiable violated (e.g. count-down where count-up is required, light mode, new screen)?

Return a list sorted by severity:
  High   = §10 non-negotiable violated, or a contracted frame has neither preview nor capture
  Medium = token/typography/copy mismatch vs the contract
  Low    = capture missing but preview exists (needs a render, not a code change)
Format each: [Severity] §section | Current State | Contract Says
```

If captures are **pending a human render** (machine could not render — see `preview-capture` Step 3), that is a Low, not a High: flag "capture pending" rather than failing the gate, since the preview compiling under the archive build is the available proof.

## Step 3: Triage and Fix

| Severity | Action |
|----------|--------|
| High | Fix before committing — functional gap |
| Medium | Fix if quick (<15 min), otherwise file a note |
| Low | Skip — cosmetic, not worth the churn |

Fix High gaps by re-reading the relevant spec section and comparing to the implementation. Don't invent new behavior — follow the spec.

## Step 4: Commit

After fixes:
```bash
git add -p
git commit -m "fix(feature): address spec coverage gaps from verification"
```

## Common Gaps Found

Based on experience with Apple platform projects:

- **Sheet environment injection**: New sheets often miss `@Environment` props that parent views have
- **Empty state handling**: Spec says show message X, implementation shows nothing
- **Toast/confirmation feedback**: Spec says "show toast after action", action is silent
- **Dead code leftover**: Old implementations not deleted when replaced
- **Filter/state cleanup**: ViewModel has unused state from previous design

## Example

Verifying a "Saved Filters" feature against its design spec:

```
/verify-against-spec docs/plans/saved-filters.md
```

The three agents run in parallel and report back. A typical triage looks like:

```
Spec Coverage Verifier
  ✅ Filter persistence (SwiftData)         — FiltersStore.swift:42
  ✅ Apply filter from list                 — FilterListView.swift:88
  ❌ Spec §3.2 "edit a saved filter"        — NO matching view/action found
  ⚠️  Spec §4.1 empty state copy            — shows blank list, spec wants a message

Build + Test            ✅ Build clean, 41/41 unit tests pass
Docs Sync               ⚠️  README still describes the old single-filter behavior
Visual Fidelity         ✅ F1–F5 captures present and named
                        ⚠️  §8 copy: button reads "Save filter" — contract says "Save"
                        ❌ §10: list uses count-down badge — contract requires count-up
```

Triage outcome: implement the missing edit flow (§3.2 — blocking), fix the count-up
violation (§10 — blocking), correct the button copy (§8), add the empty-state message
(§4.1), update the README, then re-run before committing.

## Quick Reference

```
/verify-against-spec docs/plans/feature-redesign.md
/verify-against-spec docs/brainstorm/2026-03-20-new-feature/design.md
```

Run at the end of every multi-day feature branch. Context compaction hides gaps — this surfaces them.

## Relationship to Other Skills

| Skill | When | Purpose |
|-------|------|---------|
| `verify-against-spec` | End of spec-driven work | Coverage vs design spec (+ visual fidelity) |
| `design-contract` | Before building a mockup | Authors the contract + §9 frames this skill verifies against |
| `preview-capture` | Producing capture proof | Renders the §9 `#Preview`s into `captures/` that Agent 4 checks |
| `complete-feature` | Feature feels done | Comprehensive checklist |
| `merge-check` | Before merging to main | Pre-merge quality gate |
| `regression-test` | During bug fix | TDD-first regression workflow |

<!-- END SKILL: verify-against-spec -->

---

