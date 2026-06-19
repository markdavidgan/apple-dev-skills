---
name: apple-dev
description: Comprehensive Apple platform development skill covering Swift 6, SwiftUI, design, accessibility, concurrency, App Store Connect, testing, and advanced workflows. Master reference for iOS 26+ development.
---

# Apple Dev Skills — Master Reference

> **Platform Note:** This is a consolidated skill for Kimi Code. All 57 apple-dev skills are included below. For granular skill loading, use Claude Code or Cursor.
> **Repository:** https://github.com/markdavidgan/apple-dev-skills

## Table of Contents

| # | Skill | Domain | Description |
|---|-------|--------|-------------|
| 1 | app-analytics | Workflow | Decide what to measure and how — north-star metric, activation/retention/conversion funnels, a clean event taxonomy, App Store Connect App Analytics, StoreKit/subscription metrics, and privacy-respecting instrumentation. Use when defining product metrics, designing analytics events, measuring retention or conversion, choosing a north-star metric, or interpreting App Analytics. Trigger on "analytics", "metrics", "north star", "funnel", "retention", "activation", "conversion rate", "event tracking", or "what should we measure". |
| 2 | app-brand-identity | Workflow | Create a complete brand identity system for Apple platform apps — wordmark, icon, design tokens, brand voice, and App Store marketing assets. Use when starting a new app, renaming/rebranding, designing a logo, choosing typography, building a design system, or preparing App Store screenshots and preview materials. |
| 3 | app-icon-composer | Workflow | Produce HIG-correct, Icon Composer-ready layered app icons for iOS/iPadOS/macOS/watchOS 26 (Liquid Glass) — apply Apple's app-icon guidelines, design the layer stack and Default/Dark/Mono appearances, and author the art as SVG the model can write directly (no paid generator required), falling back to image-gen MCPs only for illustrative art. Use when the user says "app icon", "Icon Composer", ".icon file", "Liquid Glass icon", "layered icon", "dark/tinted/mono icon variant", "icon for App Store", or needs icon art produced and assembled. |
| 4 | app-intents | Workflow | App Intents, Shortcuts, Siri, Spotlight, interactive Widgets, Controls (Control Center / Action button), and Live Activities / Dynamic Island. Use when exposing app actions to Siri/Shortcuts/Spotlight, building an interactive or Lock Screen widget, adding a Control Center control, or showing a Live Activity / Dynamic Island. Trigger on "App Intent", "AppShortcut", "Siri", "Shortcuts", "interactive widget", "Control Widget", "Live Activity", "Dynamic Island", or "ActivityKit". |
| 5 | app-launch | Workflow | Pre-launch to post-launch playbook for shipping a new iOS/macOS app or major version. Use when user says "plan my app launch", "launch checklist", "prepare to ship", "TestFlight beta strategy", "Product Hunt launch", "phased release", "press outreach", "launch day checklist", "8-week launch plan", or wants a structured countdown from development to App Store live. |
| 6 | app-marketing-context | Workflow | Gather and persist go-to-market context for an Apple app into app-marketing-context.md so every marketing skill reads it without re-asking questions. Use when starting ASO, launch planning, ad campaigns, or any growth work; when the user says "set up marketing context", "capture app context", "marketing brief", "GTM", "go-to-market", "positioning", or "before we do ASO". Distinct from product-spec (PRD/requirements) — this captures positioning, competitors, and KPIs that asc-aso, app-launch, apple-search-ads, app-store-pricing, app-brand-identity, and asc-submission all depend on. |
| 7 | app-rejection-recovery | Workflow | Diagnoses App Store rejections, drafts Resolution Center responses, and plans the fix for resubmission. Use when the user says "my app was rejected", "Apple rejected my app", "App Review rejection", "guideline violation", "Resolution Center response", "guideline 2.1", "guideline 4.3", "guideline 5.1.1", "binary rejection", "metadata rejection", "appeal App Review", "App Review Board", or "expedited review request". For pre-submission health checks, see submission-preflight. For metadata copy, see asc-aso. |
| 8 | app-security | Workflow | On-device app security — Keychain storage, Sign in with Apple, biometric auth (Face ID / Touch ID), CryptoKit encryption/hashing, App Attest / DeviceCheck, and certificate pinning. Use when storing tokens/secrets, adding Sign in with Apple, gating with Face ID/Touch ID, encrypting data, verifying device integrity to your server, or pinning TLS certificates. Trigger on "Keychain", "Sign in with Apple", "Face ID", "biometric", "CryptoKit", "App Attest", "encrypt", or "certificate pinning". |
| 9 | app-store-featured | Workflow | Guides you through earning App Store editorial featuring — Today tab, App of the Day, category collections, and In-App Events. Use when preparing a featuring nomination, assessing featuring readiness, writing a pitch for Apple editors, planning an In-App Event for editorial consideration, or asking "how do I get featured on the App Store?" Covers the Apple tech checklist, nomination form timing, pitch writing, and a weighted readiness scorecard. |
| 10 | app-store-pricing | Workflow | App Store pricing strategy, global equalization, subscription management, and regional pricing decisions using Apple's official 900-price-point system. Use when user asks about pricing tiers, IAP pricing, subscription pricing, regional pricing, price changes, App Store proceeds, base storefront selection, introductory offers, or promotional offers. |
| 11 | apple-architecture-diagram | Quality | Create WWDC-Keynote-ready, self-contained HTML architecture diagrams for Apple platform apps (iOS, macOS, watchOS, tvOS, visionOS). Activates when users ask for app architecture, system design, data flow, module structure, or technical documentation for Apple apps. Produces ultra-beautiful, drill-down capable diagrams with Apple-native design language. |
| 12 | apple-cleanup | Quality | Exhaustive engineering hardening of an iOS app. Reviews for Swift 6 compliance, crash risks, App Store rejection risks, and tech debt; builds a surgical plan; dispatches parallel subagents to fix all P0-P2 issues; then pushes an alpha to TestFlight. Use for pre-submission cleanup and code hardening, not design polish. |
| 13 | apple-design | Quality | Apple platform design system, iOS 26 & macOS 26 Liquid Glass, design tokens, and accessibility-aware previews. Use when building or reviewing SwiftUI views, defining a theme or design tokens, applying Liquid Glass, organizing asset catalogs, or improving visual consistency. Trigger on "design system", "theme", "design tokens", "Liquid Glass", "glassEffect", "SwiftUI styling", or "make the UI consistent". |
| 14 | apple-design-language | Quality | Apple-native design language for iOS, iPadOS, and macOS — the editorial layer above HIG plus the domains craft skills miss: UX writing, interaction/form/loading states, and empty/error states. Use when writing or reviewing user-facing copy, button/error/alert text, designing forms or input validation, loading/empty/error/permission-denied states, deciding when to follow or tastefully break HIG, or judging whether a screen feels Apple-quality versus templated AI slop. Routes to swiftui-micro-craft for quantified spacing/typography/motion and apple-design for tokens and Liquid Glass. |
| 15 | apple-foundation-models | Quality | On-device AI with Apple's Foundation Models framework (import FoundationModels) in iOS 26 / Apple Intelligence — LanguageModelSession, guided generation with @Generable/@Guide, streaming, tool calling, and availability gating. Use when the user wants on-device LLM features, Apple Intelligence integration, "summarize/classify/extract on device", structured generation, "@Generable", or asks about the Foundation Models framework. For UI design of AI features see apple-design. |
| 16 | apple-patterns-check | Quality | Validate iOS code against Apple's best practices. Run during /ship, before commits, or when reviewing code for Apple-specific compliance. Triggers on "check patterns", "apple check", "pre-commit check", or "validate swift code". |
| 17 | apple-polish | Quality | Design and keynote-readiness craftsmanship review of an iOS app. Evaluates through Jony Ive (visual obsession) and Steve Jobs (demo readiness) perspectives, presents prioritized findings, then orchestrates parallel agents to fix selected issues and push a TestFlight build. Use for design polish, not engineering bugs. |
| 18 | apple-review | Quality | Comprehensive Apple-grade review of an iOS app covering design (Apple design leader perspective), engineering (architecture and code quality), compliance (App Store rejection risks), and keynote readiness (product story and demo quality). Use when asked for a full app review, Apple-quality audit, design critique, HIG compliance check, App Store readiness assessment, or "would Apple approve this", "keynote ready", "WWDC ready". |
| 19 | apple-router | Quality | Dispatcher that points a vague app request to the right Apple dev skill(s) and the order to run them. Use when the request is broad or you are unsure which skill applies — "help me grow my app", "get ready to ship", "improve my App Store presence", "my app isn't making money", "what should I do next", or any goal that spans discovery, conversion, lifecycle, submission, or launch. Routes; it does not do the work itself. |
| 20 | apple-search-ads | Quality | Set up, optimize, and scale Apple Search Ads (ASA) campaigns — keyword bidding, match types, campaign structure, Custom Product Page routing, and ROAS optimization. Use when the user mentions "Apple Search Ads", "ASA", "Search Ads", "Search tab ads", "Today tab ads", "CPT", "TTR", "Search Match", "exact match", "broad match", "CPP in ads", "ASA bidding", "Search Ads budget", "keyword bids", or "App Store paid acquisition". For other paid channels (Meta, Google UAC, TikTok), see app-launch. |
| 21 | asc-aso | ASC | App Store Optimization — keyword research, title/subtitle/keyword-field strategy, localized metadata, and conversion-rate optimization for App Store discoverability. Use when the user says "ASO", "app store optimization", "keywords", "improve discoverability", "rank higher", "optimize my listing", "app store keywords", "subtitle", "promotional text", or wants more organic installs. Complements asc-submission (mechanics) and app-store-pricing (economics). |
| 22 | asc-build-check | ASC | Check the latest CI build status and debug failures using the App Store Connect MCP server. Use when user says "check build", "what broke", "CI status", "build failing", or asks about recent build failures. Also use for signing issues, provisioning profiles, bundle ID capabilities, or Developer Portal queries. |
| 23 | asc-submission | ASC | Prepare an app for App Store submission or TestFlight distribution using the App Store Connect MCP server. Use when user says "prepare submission", "submit to app store", "prepare for review", "update metadata", "set what's new", "check submission readiness", "distribute to testflight", or wants to manage App Store Connect metadata, screenshots, or review submissions. |
| 24 | cloudkit-sync | Workflow | Sync SwiftData / Core Data across a user's devices with CloudKit, plus CKShare collaboration and conflict handling. Use when adding iCloud sync, "sync across devices", SwiftData + CloudKit, NSPersistentCloudKitContainer, sharing records between users, or debugging why data isn't syncing. Trigger on "CloudKit", "iCloud sync", "cloudKitDatabase", "CKShare", "sync not working", or "share data between users". |
| 25 | complete-feature | Workflow | Complete a feature implementation with full validation across build, tests, lint, and Apple patterns before committing. Use when a feature feels "done", before opening a PR, or when you want to confirm nothing was missed. Trigger on "complete this feature", "is this done", "finish the feature", "ready to commit", or "final validation". |
| 26 | cross-platform-adaptivity | Workflow | Adapt one SwiftUI codebase across iPhone, iPad, Mac, Apple Watch, Apple TV, and Vision Pro — size classes, adaptive navigation, multi-window/scenes, platform conditionals, and idiomatic per-platform behavior. Use when supporting iPad alongside iPhone, bringing an app to macOS or visionOS, fixing a layout that only works on one device, choosing adaptive navigation, or sharing code across platforms. Trigger on "iPad", "macOS", "Mac Catalyst", "visionOS", "watchOS", "tvOS", "size class", "adaptive layout", "multiplatform", "NavigationSplitView", or "responsive". |
| 27 | design-contract | Workflow | Turn a visual mockup (HTML/PNG/Figma/spec) into a machine-readable design contract plus co-located mockup and #Preview/capture gates, so an executing agent cannot drift from the design. Use before writing or editing a plan that reproduces a mockup. |
| 28 | design-handoff | Workflow | Produce a current, labeled screenshot package of a whole app experience for an external design reviewer (Claude Design, a human designer, or any image-consuming tool), reusing the project's existing screenshot UITest target and fastlane snapshot lane. Use when you need an up-to-date visual handoff of an iOS app's UI states, refresh a stale handoff after UI changes, or bundle screenshots plus design context for upload. Has an authoritative simulator-capability guard so it never tries to capture on a machine that may not run the simulator. |
| 29 | ios-accessibility | iOS | Audit SwiftUI views for accessibility issues and apply fixes. Use whenever VoiceOver, Dynamic Type, accessibility labels, screen readers, or App Store accessibility is mentioned. Also trigger when asked to "make it accessible", improve UI quality broadly, or prepare for App Store review. |
| 30 | ios-asc | iOS | App Store Connect MCP tools for code signing, provisioning profiles, bundle IDs, TestFlight builds, beta testers, and App Store metadata/release management. Use when signing an app, creating or repairing provisioning profiles, managing bundle ID capabilities, distributing to TestFlight, managing beta groups, editing App Store versions or localized metadata, or submitting for review. Trigger on "sign the app", "provisioning profile", "distribute to TestFlight", "add beta tester", "submit for review", or "update App Store metadata". |
| 31 | ios-build | iOS | iOS build system patterns — the 4-layer validation pipeline (fast/full/export/upload), XcodeGen project config, archive-vs-debug concurrency checks, and common build-failure fixes. Use for build errors, validation before commit, signing/export problems, XcodeGen setup, or CI/CD configuration. Trigger on "build failing", "validate", "xcodebuild error", "XcodeGen", "archive build", or "set up CI". |
| 32 | ios-simulate | iOS | iOS Simulator workflows via xcrun simctl — boot and shutdown devices, automate screenshots and video, install/uninstall apps, set appearance, and control device state. Use when running an app in the Simulator, capturing screenshots for the App Store or docs, or managing simulator devices. Trigger on "simulator", "simctl", "boot a device", "take a screenshot", "record video", "set dark mode", or "reset simulator". |
| 33 | ios-standards | iOS | Swift 6.0+ standards — strict concurrency, @MainActor isolation, @Observable (not ObservableObject), and modern SwiftUI architecture for iOS 26+. Use when writing or reviewing Swift code, structuring ViewModels and services, or resolving concurrency and isolation design questions. Trigger on "Swift 6", "strict concurrency", "@MainActor", "@Observable", "SwiftUI architecture", or "code standards". |
| 34 | ios-test | iOS | XCTest patterns for unit tests, UI tests, and SwiftData testing with in-memory containers under Swift 6 strict concurrency, plus test performance budgets. Use when writing or fixing tests, setting up test targets, testing SwiftData models, or planning CI test suites. Trigger on "write a test", "unit test", "XCTest", "test SwiftData", "UI test", "flaky test", or "test coverage". Note: never run UI tests without explicit approval. |
| 35 | ios26-api-reference | iOS | Authoritative iOS/macOS/watchOS 26 API reference with 3-tier smart loading. Prevents crashes from hallucinated APIs. Trigger on ANY code involving FoundationModels, SpeechTranscriber, SpeechAnalyzer, @Generable, LanguageModelSession, glassEffect, SwiftData, @Observable, Live Activity, App Intents, Vision, VideoToolbox, Network.framework, AVAudioEngine, MenuBarExtra, NSPanel, WKHapticType, or WCSession. Also trigger on Swift 6 concurrency errors, Sendable warnings, or @MainActor isolation issues. |
| 36 | localization | Workflow | Localize and internationalize an app with String Catalogs (.xcstrings), correct pluralization and grammar agreement, RTL layout, locale-aware formatting, and pseudolocalization testing. Use when adding languages, translating UI, fixing plurals or gendered strings, supporting right-to-left languages, formatting dates/numbers/currency per locale, or producing localized screenshots. Trigger on "localization", "internationalization", "i18n", "String Catalog", ".xcstrings", "translate", "RTL", "plural", or "locale". |
| 37 | merge-check | Workflow | Automatically verify code quality before merging to main. Triggers when user mentions merging, creating PRs, or asks if code is ready. Spawns parallel subagents for build, test, and lint verification. Use for quality gates before main branch integration. |
| 38 | networking | Workflow | Modern Swift networking with URLSession and async/await — typed requests, Codable decoding, HTTP status & error handling, retry with backoff, offline/connectivity handling, and a Sendable API client. Use when calling a REST/JSON API, building an API client/service layer, decoding responses, handling network errors or timeouts, adding retry logic, or detecting offline state. Trigger on "URLSession", "API client", "networking", "fetch data", "JSONDecoder", "retry", or "offline". |
| 39 | onboarding-optimization | Workflow | Audit and redesign first-run flows to drive activation with minimum friction. Use when a user says "too many users drop off before they do anything useful", "our Day-1 retention is bad", "we need to improve onboarding", "users aren't reaching the aha moment", "when should we ask for permissions", "can we defer sign-up", "our activation rate is low", or "audit our first-run experience". Covers tap-count audits, permission-prompt strategy, sign-up friction reduction, and measurement. |
| 40 | overlay-sync | Workflow | Scaffold, sync, and update a project's per-project overlay skills from a single descriptor, idempotently. Use when you want to bind generic engine skills (like design-handoff) to a specific Apple project, refresh those overlays after the descriptor or an engine template changes, or check in CI that committed overlays are in sync. Runs in any Apple-development project and is safe to run any number of times. |
| 41 | paywall-design | Workflow | Design high-converting, App Review-compliant paywalls and subscription upsell screens — value framing, plan presentation, trial/intro-offer design, and required legal elements. Use when building or improving a paywall, subscription screen, upsell, or "go Pro" flow, choosing trial framing, or fixing low conversion or a 3.1.2 rejection. Trigger on "paywall", "subscription screen", "upsell", "go premium", "free trial design", or "purchase screen". Bridges app-store-pricing (economics) and storekit-purchases (code). |
| 42 | performance-instruments | Workflow | Diagnose and fix iOS performance — launch time, main-thread hangs and scroll hitches, memory growth and leaks, and energy, using Instruments, os_signpost, and MetricKit field data. Use when the app is slow, janky, or battery-hungry, when investigating launch time, frame drops, retain cycles, or memory warnings, or when profiling with Instruments. Trigger on "slow", "laggy", "hang", "hitch", "memory leak", "Instruments", "Time Profiler", "launch time", "MetricKit", or "battery drain". |
| 43 | preview-capture | Workflow | Render named SwiftUI #Previews to PNG at canonical device resolution for design-contract verification, with an automatic simulator-capability check and a documented fallback for machines that cannot or must not run the simulator. Use to produce capture proof for a design contract's §9 frames. |
| 44 | privacy-manifest | Workflow | Apple privacy manifests (PrivacyInfo.xcprivacy) and required-reason APIs — declare data collection, tracking domains, and approved reason codes to avoid App Store rejection. Use when the user mentions "privacy manifest", "PrivacyInfo.xcprivacy", "required reason API", "ITMS-91053", "ITMS-91061", "privacy nutrition label", "App Store privacy rejection", or adds an SDK/framework. Run before submission alongside asc-submission. |
| 45 | product-spec | Workflow | Write a clear product spec / PRD for an app feature — problem, goals and non-goals, user stories, testable acceptance criteria, success metrics, scope, and open questions. Use when defining a feature before building, writing a PRD or spec, turning a vague idea into buildable requirements, or producing acceptance criteria. Trigger on "PRD", "product spec", "requirements", "acceptance criteria", "user stories", "scope this feature", or "write a spec". Feeds verify-against-spec. |
| 46 | push-notifications | Workflow | Apple push notifications (APNs) and local notifications — authorization, device tokens, payload structure, rich/actionable notifications, notification service & content extensions, interruption levels, and Live Activity push. Use when implementing push, "remote notifications", APNs, "notification not showing", rich media notifications, notification actions, silent/background push, or pushing Live Activity updates. Trigger on "APNs", "UNUserNotificationCenter", "device token", "notification extension", or "silent push". |
| 47 | rating-prompt-strategy | Workflow | Design and implement an ethical App Store rating prompt strategy that maximizes review volume and average rating. Use when you need to add rating prompts to an app, decide when to ask for reviews, debug why prompts are not appearing, recover a rating after a bad version, or plan a full-year review budget. Trigger phrases: "ask for ratings", "SKStoreReviewRequest", "requestReview", "improve App Store rating", "rating prompt timing", "review prompt strategy", "boost ratings", "increase reviews". |
| 48 | regression-test | Workflow | Add regression tests when fixing bugs. Use when user says "fix this bug", "this is broken", "fix this issue", or when implementing any bug fix to prevent recurrence. |
| 49 | retention-optimization | Workflow | Diagnose and fix user retention by reading cohort curves, pinpointing churn leaks, and deploying Apple-native re-engagement levers. Use when D1/D7/D30 retention is low or dropping, when users activate but do not form habits, when deciding on a notification sequence, when adding widgets or Live Activities to drive return visits, or when diagnosing the step where users churn. Trigger on "retention", "users are dropping off", "D7 curve", "cohort", "re-engagement", "hab it loop", "bring users back", or "churn diagnosis". |
| 50 | review-management | Workflow | Pull, cluster, triage, and respond to App Store reviews via the App Store Connect MCP. Use when you need to fetch recent reviews, analyze sentiment, draft developer responses, track recurring themes as product signals, or close the loop on a rating recovery campaign. Trigger phrases: "triage reviews", "respond to reviews", "what are users complaining about", "review sentiment", "draft a review response", "App Store feedback", "bad reviews", "one-star reviews", "review themes". |
| 51 | storekit-purchases | Workflow | StoreKit 2 in-app purchases and subscriptions in Swift — Product fetch, purchase flow, transaction verification, entitlement checks, Transaction.updates listener, restore, and SwiftUI StoreKit views. Use when implementing or debugging IAP, subscriptions, paywalls, "buy" buttons, free trials, restore purchases, receipt/transaction validation, or StoreKit testing. Pairs with app-store-pricing (strategy) and asc-aso (conversion). |
| 52 | submission-preflight | Workflow | Pre-submission risk audit for App Store review — catch the rejection triggers (metadata, privacy, IAP, design, account, legal) BEFORE you submit, by app type. Use when the user says "preflight", "will this get rejected", "check before submitting", "review readiness", "submission checklist", "App Review guidelines", "is my app compliant", or is about to submit a build. Run after asc-build-check, before asc-submission hits submit. |
| 53 | subscription-lifecycle | Workflow | Manage the full post-purchase subscriber journey from trial through renewal, voluntary churn, involuntary churn, and win-back. Use when diagnosing churn spikes, designing retention save flows, recovering billing failures, interpreting App Store Server Notifications, debugging grace period behaviour, building win-back offer campaigns, or auditing subscriber LTV. Also use when asked about dunning, billing retry, DID_FAIL_TO_RENEW, offer codes, or subscription metrics from ASC reports. |
| 54 | swift-testing | Workflow | The Swift Testing framework (import Testing) — @Test functions, #expect/#require macros, @Suite, parameterized tests, traits/tags, async and throwing tests, and migrating from XCTest. Use when writing new tests in Swift 6 / Xcode 16+, when the user mentions "Swift Testing", "@Test", "#expect", "parameterized test", "test traits", or "migrate from XCTest". For XCTest harness/CI and SwiftData test setup see ios-test. |
| 55 | swift6-concurrency | Workflow | Handle Swift 6 concurrency patterns. Use when encountering Sendable warnings, data race errors, MainActor isolation issues, or framework interop problems (EventKit, Speech, AVFoundation, etc.). Trigger on "Swift 6 error", "Sendable", "data race", "MainActor", "concurrency warning", or "strict concurrency". |
| 56 | swiftui-micro-craft | Workflow | Quantified rules and a mechanical auditor for Apple-grade SwiftUI micro-craft — the spacing, alignment, optical centering, padding, corner-radius concentricity, SF Symbol pairing, depth, hairlines, Dynamic Type, motion, gestures, and haptics details that separate shipped Apple quality from AI-slop UI. Use when writing or reviewing any SwiftUI view, when spacing or padding or alignment feels off, when about to hardcode a size or duration, or before committing UI code. |
| 57 | verify-against-spec | Workflow | Use when finishing a spec-driven feature, when asked to verify nothing was missed, when approaching context limits on a long feature session, or after hearing "make sure everything is implemented". Cross-checks the design spec against the actual implementation, in parallel with build and doc verification. |

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

<!-- BEGIN SKILL: app-icon-composer -->

# app-icon-composer

# App Icon Composer

**Produce a layered Liquid Glass app icon that follows Apple's Human Interface Guidelines and drops straight into Icon Composer — authored as SVG the model writes directly, no SnapAI, no paid icon SaaS.** The *brand* decision (silhouette, signature color, what the icon means) lives in `app-brand-identity`; App Store listing use lives in `asc-aso`. This skill is the HIG-correct production pipeline: concept → layer stack → appearances → an Icon Composer-ready bundle.

> **Since iOS/iPadOS/macOS/watchOS 26, app icons are layered, not flat.** You hand Icon Composer (bundled with Xcode 26) a small set of **flat, opaque source layers**; the system renders Liquid Glass — specular highlights, refraction, translucency, shadow, blur, and corners — and derives the appearance variants. A baked 1024 PNG fights that renderer and looks dead next to native icons. **SVG is Apple's recommended input format**, which is exactly what a code-capable model can produce directly.

---

## When to use vs. when not to

| Use this skill | Use instead |
|----------------|-------------|
| Turning an approved concept into HIG-correct Icon Composer layers | `app-brand-identity` — to pick the concept, silhouette, signature color |
| Authoring the layer art (SVG-first) and the Default/Dark/Mono appearances | — |
| Assembling a `.icon` import bundle + asset-catalog fallback | `asc-submission` — to upload the built app |
| Multi-size legacy `AppIcon.appiconset` discipline | `app-brand-identity` (its "All Sizes" section) |

If there's no agreed concept yet, stop and run `app-brand-identity` first. This skill assumes you know *what* the icon is.

---

## HIG foundations (get these right before any pixels)

Apple's app-icon guidance, current for the layered system:

- **One concept, instantly understood.** A single focus point, centered. If you can't name the idea in three words, simplify.
- **Flat, opaque, simple source art.** No photos, no realistic imagery, **no text or words**, no UI screenshots/chrome. These fail at small sizes and read as amateur.
- **Bold weights, rounder corners.** Use bold line weights so detail survives at Home Screen size; **avoid sharp edges and thin lines** — rounded corners let light travel cleanly across edges under Liquid Glass. Fine linework disappears below ~64px.
- **Legibility is the gate**, especially for the Mono appearance. Test the art at 32pt and 64pt before committing.
- **Design in layers** so color and material can be tuned per appearance — that's the whole point of the new system.
- **Consistent personality across platforms**, tuned per platform shape. Same icon, not five different ones.

Anti-slop (from `app-brand-identity`): no gradient blobs, no purple-blue "AI aesthetic," no fake 3D, no stock templates. If it smells generated, redo it as clean vector.

---

## The layered model

Icon Composer organizes art into a **background plus one or more foreground layers** (it groups layers; a group holds up to 4 layers). Minimum viable icon = one background + one foreground.

| Layer role | What goes here | Rules |
|------------|----------------|-------|
| **Background** | Full-bleed ground — solid, gradient, or material | Fills the whole canvas edge-to-edge |
| **Foreground (1+)** | The hero glyph/mark, plus optional supporting shapes for depth | Lives in the safe area; this is what reads at a glance |

What the **system** owns — never bake these into source art:

- **Specular highlights** (edge definition; alignment configurable in Icon Composer)
- **Refraction** (lens-like light bending; layers pick up color from layers beneath — this is *why* you separate layers)
- **Translucency / frostiness**
- **Shadow and blur**
- **Corners** — for **iOS/iPadOS** (squircle) and **watchOS** (circle), draw with **90° corners** and let the system mask. **Exception — macOS:** you draw the rounded rectangle yourself (the system does *not* auto-mask macOS).

> **Separation = depth.** Each layer is its own transparent element so the renderer can offset, shadow, and refract them. Source layers *may* carry alpha (refraction needs it); the *exported* Home Screen icon is flattened and **opaque**.

---

## Appearances: author three, the system derives the rest

You configure **three** appearances; the system generates the translucent and tinted variants from them.

| You author | What it is | Key rule |
|------------|-----------|----------|
| **Default** | Standard light look | Hero reads against the background; good contrast |
| **Dark** | Dark Home Screen | Adjust fills/colors for legibility; a transparent/darker ground is allowed (unlike pre-26 flat icons) |
| **Mono** | Monochrome / accessibility / tint base | Set the most prominent element to **white**; map everything else to **grays**. If the glyph dissolves here, simplify the foreground. |

| System derives | From |
|----------------|------|
| **Clear Light / Clear Dark** (translucent glass) | your layers |
| **Tinted Light / Tinted Dark** (user color-infused) | the Mono appearance |

> The fastest way to a bad iOS 26 icon is designing only Default. **Mono is the stress test** — if the idea survives as a white-on-gray silhouette, the tinted and clear variants will too. Render all three before you commit.

Apple Watch supports the light/updated look only — if your iOS Mono needed simplification, the watch art does too.

---

## Canvas & geometry

| Platform | Canvas | Shape | Corners |
|----------|--------|-------|---------|
| iPhone / iPad / Mac | **1024×1024** (unified) | iOS squircle · macOS rounded-rect | iOS: draw 90°, system masks · **macOS: you draw the rounded rect** (~824×824 content area, 185.4pt radius in the 1024 canvas) |
| Apple Watch | **1088×1088** (intentional overshoot) | Circle | Draw 90°/full-bleed, system applies the circular mask |

Keep the hero glyph generously inside the safe area — the mask and glass eat the edges. Apple publishes exact grid templates (Figma/Sketch/PSD/AI) on [Apple Design Resources](https://developer.apple.com/design/resources/); use them when precision matters.

---

## Production pipeline — a capability ladder

Pick the lowest rung that fits; it's the most portable and the cleanest.

### Rung 1 (default): the model authors the layers as SVG

For **geometric, symbolic, glyph, or lettermark** icons — which is most app icons — the best path is to **write the SVG directly**. It needs no MCP, runs in *every* CLI and model (including Kimi/Codex/Antigravity where image MCPs may not exist), is native vector (perfect for Mono silhouettes and small-size crispness), and each `<g>` maps cleanly to an Icon Composer layer.

Author one SVG per layer (or one grouped SVG), flat and opaque, per the geometry above. Then run the **feedback loop** — without it the model is drawing blind:

> write SVG → rasterize to PNG (`rsvg-convert`, `resvg`, `cairosvg`, headless Chrome `--screenshot`, or `qlmanage -t`) → **Read the PNG back** (the Read tool shows images to the model) → critique against the HIG rules + the three-appearance test → adjust → repeat until it holds at 1024, 64, and 32px.

A purely geometric mark may never need anything else.

### Rung 2: image generation for illustrative/organic art

When the concept is illustrative (a rendered object, mascot, organic scene) raw SVG is weak. Use an image-gen tool for the *generation slot only*, then bring it back to vector:

| Slot | Default (wired here) | Drop-in alternatives |
|------|----------------------|----------------------|
| Generate flat hero art | `mcp__recraft__generate_image` (use the icon/vector style) | OpenAI `gpt-image-1`, Gemini "Nano Banana" — **if the user has them wired** |
| Isolate the subject | `mcp__recraft__remove_background` | any bg-removal |
| **Vectorize → SVG** | `mcp__recraft__vectorize_image` | Illustrator Image Trace, `potrace` |
| Sharp upscale of master | `mcp__recraft__crisp_upscale` | — |

> **Recraft is the recommended default** because it covers generate + bg-remove + **vectorize** + upscale natively and is already an MCP here — no API key, no external CLI (the dependency we deliberately dropped from the SnapAI approach). OpenAI/Gemini are fine for the *generation* step if preferred, but they're **raster-only** — always route their output through a vectorizer before it becomes a layer, or the Mono/Clear appearances and small sizes will mush. Treat any generated art as a draft of the silhouette and run it past the anti-slop rules.

### Rung 3 (optional): preview / compose surface

To eyeball the layer stack or render a preview grid, the `pencil` or `figma` MCP (`get_screenshot`, `export_nodes`) can help — but they're UI-oriented design tools, not icon authoring tools. The plain SVG→PNG→Read loop in Rung 1 covers the feedback need more portably; reach for Pencil/Figma only if you're already composing there.

---

## Export: what "Icon Composer-ready" means

Deliver a folder the user drags into Icon Composer (or hands to a designer), plus a fallback:

```
<AppName>Icon/
├─ background.svg          full-bleed ground (or .png), opaque
├─ foreground.svg          hero glyph, transparent, centered in safe area
├─ foreground-extra.svg    (optional) supporting foreground layer(s)
├─ dark/                   Dark-appearance versions of the layers
├─ mono/                   Mono-appearance versions (white hero + grays)
├─ macos-rounded.svg       (macOS only) art on the designer-drawn rounded rect
└─ NOTES.md               layer order, signature hex, canvas size, safe-area, appearance checks
```

Rules for every exported layer:

- **SVG preferred** (Icon Composer's recommended input); if raster, 1024×1024 (1088 for watch), sRGB.
- **Flat and opaque source — no baked corners (except macOS), shadow, gloss, blur, or specular.** The renderer owns those.
- Author **Default, Dark, and Mono**; let Icon Composer derive Clear/Tinted.
- In `NOTES.md`, record layer order, signature hex, canvas size, the safe-area assumption, and the three-appearance check results so the import is reproducible.

### Asset-catalog fallback (pre-26 targets)

Icon Composer also exports a flattened `AppIcon.appiconset`. If you must support OS versions before the layered system, produce a single flattened **opaque** 1024 master and follow the **multi-size "All Sizes" discipline** in `app-brand-identity` (bolder art in the small slots; alpha stripped to avoid ITMS rejection). The `.icon` layers serve OS 26+; the raster catalog serves older OS.

---

## Output checklist (`/icon-composer`)

- [ ] **Concept confirmed** (from `app-brand-identity`, or flagged as missing).
- [ ] **HIG pass** — single concept, flat/opaque, no text/photo/UI, bold weights, no sharp thin lines.
- [ ] **Rung chosen** — SVG-authored (geometric) or image-gen→vectorize (illustrative), with the render→Read→critique loop run.
- [ ] **Layers separated** — background + foreground(s), each its own file.
- [ ] **No baked corners/shadow/gloss/blur/specular** (except the macOS rounded rect).
- [ ] **Canvas & geometry correct** — 1024 (1088 watch); iOS 90° corners, macOS rounded rect drawn.
- [ ] **Three appearances authored** — Default, Dark, Mono; Mono hero is white on grays.
- [ ] **Mono silhouette holds** at 64px and 32px.
- [ ] **Export bundle** assembled with `NOTES.md`; SVG sources included.
- [ ] **Fallback raster** produced if pre-26 support is needed (+ multi-size per `app-brand-identity`).
- [ ] **Anti-slop pass** — no gradient blob / AI-gradient / fake 3D.

> **Smell test before you ship:** render the foreground as a flat white-on-gray silhouette at 32px (the Mono/tinted worst case). If you can't tell what the app does, the layered appearances will fail taste even when they pass App Review. Simplify the foreground until the silhouette alone carries the idea.

---

## References

- App icons — Apple HIG: https://developer.apple.com/design/human-interface-guidelines/app-icons
- Creating your app icon using Icon Composer (Xcode 26): https://developer.apple.com/documentation/Xcode/creating-your-app-icon-using-icon-composer
- Icon Composer: https://developer.apple.com/icon-composer/
- WWDC25 — "Say hello to the new look of app icons" (220), "Create icons with Icon Composer" (361), "Meet Liquid Glass" (219)
- Apple Design Resources (grid templates): https://developer.apple.com/design/resources/

<!-- END SKILL: app-icon-composer -->

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

<!-- BEGIN SKILL: app-launch -->

# app-launch

# App Launch

**Ship a new app or major version with a disciplined 8-week countdown — from final positioning to post-launch phased rollout.**

This skill owns the end-to-end launch process. It delegates asset work to `app-brand-identity`, listing copy to `asc-aso`, submission mechanics to `asc-submission`, risk checks to `submission-preflight`, pricing to `app-store-pricing`, featuring pursuit to `app-store-featured`, build health to `asc-build-check`, and paid acquisition to `apple-search-ads`.

---

## The 8-Week Launch Countdown

### Week 8 — Lock Positioning

**Goal:** Nail the single sentence that explains why your app exists.

- [ ] Write the positioning statement: "For [audience] who [need], [App] is the [category] that [key differentiator]. Unlike [alternatives], we [unique proof point]."
- [ ] Confirm your monetization model and price tier — see `app-store-pricing`
- [ ] Define the one launch metric that declares success (downloads, revenue, rating count)
- [ ] Identify your 3–5 target keywords (seed for `asc-aso` later)
- [ ] Decide your release type: full release or phased? (See [Release Strategy](#release-strategy))

---

### Week 7 — Brand and Store Assets

**Goal:** Hand off all visual deliverables so nothing blocks the listing later.

- [ ] App icon finalized at 1024×1024 px — hand off to `app-brand-identity`
- [ ] Screenshots designed for every required device size (iPhone 6.9", 6.5", iPad 13")
- [ ] App Preview video scripted and recorded (optional but strongly recommended for featuring)
- [ ] Feature graphic / promotional image ready
- [ ] Press kit: icon (1024px), screenshots (3 hero), brief (150 words), founder photo

> Screenshots convert. Spend disproportionate time here. Lead with the emotional outcome, not the interface. Show text large enough to read on a phone-sized thumbnail in search results.

---

### Week 6 — TestFlight Beta

**Goal:** Real signal from real people before GA.

#### Set up the beta group via ASC MCP

```
1. asc_list_apps          → get your app ID
2. asc_create_beta_group  → create "External Beta – Week 6" (external, requires review)
3. asc_set_beta_notes     → set "What to Test" focus areas
4. asc_invite_beta_tester → add testers by email (up to 10,000 external)
```

#### Beta testing focus areas (by week)

| Day Range | Focus |
|-----------|-------|
| 1–4 | Core happy path — does the main flow work end-to-end? |
| 5–9 | Edge cases — empty states, no connectivity, sign-in errors |
| 10–14 | Onboarding — first-run experience, paywall clarity |

- [ ] Monitor crash reports daily — hand off any crash pattern to `asc-build-check`
- [ ] Collect structured feedback: what confused testers, what delighted them
- [ ] Fix P0 and P1 bugs; ship updated build with `asc_set_beta_notes` changelog
- [ ] Confirm the build that will ship to production is identical to your final beta build

#### Internal vs. external beta

| Type | Max Testers | Review Required | Best For |
|------|-------------|----------------|---------|
| Internal | 100 | No | Team, QA, stakeholders |
| External | 10,000 | Yes (first build per group) | Real users, press, creators |

---

### Week 5 — Press and Creator Outreach

**Goal:** Line up coverage to publish on launch day.

#### Press tier strategy

| Tier | Outlets | Pitch Style | Lead Time |
|------|---------|-------------|-----------|
| Top-tier | TechCrunch, The Verge, 9to5Mac, MacStories | News angle, exclusives, founder story | 3–4 weeks |
| Mid-tier | AppAdvice, iMore, TouchArcade (games) | Feature request, category angle | 2–3 weeks |
| Niche | Vertical blogs, subreddits, newsletters | Use-case specific, deep dive | 1–2 weeks |

#### Pitch outline (adapt per outlet)

```
Subject: [App Name] — [One-line hook, no buzzwords]

[Reporter first name],

[1 sentence: what it does and for whom.]
[1 sentence: what makes it novel or timely — tie to something they covered recently.]
[1 sentence: launch timing and platform.]

Happy to provide early access, a demo call, or exclusive screenshots.

[Your name]
```

- [ ] Send top-tier pitches with TestFlight invite and embargo date
- [ ] Follow up once, 5 days before embargo lifts — never more

#### Creator / UGC seeding

- [ ] Identify 10–20 creators in your niche (YouTube, TikTok, X, Reddit)
- [ ] Offer early access, no strings attached — never ask for positive review
- [ ] Give creators a direct line to you for questions
- [ ] Brief creators on your launch date so their content can drop simultaneously

---

### Week 4 — ASO Baseline

**Goal:** Optimize the listing before the App Store spider indexes it.

Hand off to `asc-aso` for full keyword research and copy. Launch-week minimums:

- [ ] Title: app name + 1–2 high-volume keywords (30 char max)
- [ ] Subtitle: secondary value prop + supporting keyword (30 char max)
- [ ] Keyword field: 100 chars, comma-separated, no spaces, no repeats from title
- [ ] Description: 4000 chars, lead with value prop, CTA in first two lines (truncated above the fold)
- [ ] Localize at minimum for English (US) and your next-largest market

> Do not duplicate keywords between title, subtitle, and keyword field — Apple indexes all three independently.

---

### Week 3 — Submit for Review With Buffer

**Goal:** Clear App Review with time to fix rejections before your launch date.

- [ ] Run `submission-preflight` checklist before submitting
- [ ] Verify all metadata, screenshots, and privacy details are complete via `asc-submission`
- [ ] Set pricing and availability in `app-store-pricing`
- [ ] Submit via `asc_submit_for_review` — do NOT use "Manual Release" if you want same-day control; use "Scheduled Release" set to your launch day, or hold with "Manual Release" and release via `asc_release_version`

```
asc_submit_for_review → triggers App Review queue
```

**Buffer math:** App Review averages 1–2 days; rejections add 1–5 days per round trip. Plan for worst-case 10 days. If your hard launch date is Tuesday Week 1, submit no later than Friday Week 3.

#### If rejected

1. Read the rejection reason in App Store Connect
2. Fix only what's cited — do not make unrelated changes
3. Reply in Resolution Center if you disagree; include the specific guideline and your counter-argument
4. Resubmit with `asc_submit_for_review` once fixed

---

### Week 2 — Build Anticipation

**Goal:** Warm the audience so launch day has momentum.

- [ ] "Coming Soon" posts on your channels (X, Mastodon, LinkedIn, Instagram)
- [ ] Tease screenshots and app clips in stories format
- [ ] Pre-launch landing page with email capture (if applicable)
- [ ] Submit Apple featuring nomination — hand off to `app-store-featured`
- [ ] Prepare launch-day content calendar (see [Launch-Day Checklist](#launch-day-checklist))
- [ ] Set up Apple Search Ads campaign targeting brand keywords — hand off to `apple-search-ads`
- [ ] Confirm with press contacts that embargo holds and articles are drafted

---

### Week 1 — Final Checks

**Goal:** Verify the approved build is production-ready.

- [ ] Confirm App Review status is "Ready for Sale" or "Pending Manual Release"
- [ ] Smoke-test the App Store-signed build on a clean device (not a simulator)
- [ ] Verify in-app purchases and subscriptions in production environment (Sandbox → Production ladder)
- [ ] Confirm analytics and crash reporting are initialized and sending
- [ ] Confirm support email and App Store URL are live
- [ ] Set up response template for launch-day reviews

---

## Launch Day

**Goal:** Maximize visibility in the first 24 hours.

### Morning (7–9 AM in your largest market's timezone)

- [ ] Release the build: `asc_release_version` (if held on Manual Release)
- [ ] Verify app appears in App Store search within 5–10 minutes
- [ ] Post across all owned channels simultaneously
- [ ] Publish Product Hunt listing (see [Product Hunt](#product-hunt))
- [ ] Send launch email to waitlist/early-access list
- [ ] Alert press contacts: "Live now — embargo lifted"

### Throughout the day

- [ ] Respond to every review in the first 24 hours
- [ ] Monitor crash rate via `asc-build-check`; if crash rate spikes above 1%, pause phased release immediately (see [Release Strategy](#release-strategy))
- [ ] Engage every social mention
- [ ] Track chart ranking every 2 hours (App Store Connect → Trends)
- [ ] Post real-time milestones ("100 downloads in 3 hours") to keep momentum

### Evening

- [ ] Review day-one analytics: downloads, conversion rate, crash-free sessions %
- [ ] Draft a post-launch retrospective note while it's fresh
- [ ] Set reminder to respond to all reviews again in 48 hours

---

## Launch-Day Checklist (Printable)

```
PRE-FLIGHT
[ ] App is in "Ready for Sale" or "Pending Manual Release"
[ ] Production IAP verified on real device
[ ] Analytics confirmed sending
[ ] Support email responds

RELEASE
[ ] asc_release_version called (if Manual Release)
[ ] App visible in App Store search

DISTRIBUTION
[ ] Social posts live
[ ] Product Hunt submitted
[ ] Press embargo lifted
[ ] Email list notified

MONITORING
[ ] Crash dashboard open (asc-build-check)
[ ] Review queue open
[ ] Chart ranking tracked

END OF DAY
[ ] All reviews responded to
[ ] Day-1 metrics recorded
[ ] Phased release health check
```

---

## Release Strategy

### Full Release vs. Phased Release

| Factor | Full Release | Phased Release |
|--------|-------------|----------------|
| All users get it immediately | Yes | No — 1% on day 1, scaling over 7 days |
| Can pause if crash spike | No (app is live) | Yes — pause with one API call |
| Good for | Coordinated launch events, embargos, small user bases | Large apps, first major update to an existing user base |
| Downside | No rollback gate; crash spike hits everyone | Day-1 download numbers look small; press may not see it |

**Recommendation:** Use phased release for any update to an app with >10,000 existing users. Use full release for a brand-new app (no existing users to protect).

### Phased Release via ASC MCP

```
# Enable phased release before or at submission
asc_set_phased_release → sets distribution to phased (7-day ramp)

# Launch day: release from "Pending Developer Release"
asc_release_version → starts the phased ramp at 1%

# If crash rate spikes: pause immediately
asc_set_phased_release (paused: true) → halts distribution

# Once fix is live: resume
asc_set_phased_release (paused: false) → resumes from current percentage
```

#### Phased release ramp schedule

| Day | Approximate Users |
|-----|-----------------|
| 1 | 1% |
| 2 | 2% |
| 3 | 5% |
| 4 | 10% |
| 5 | 20% |
| 6 | 50% |
| 7 | 100% |

**Pause trigger:** Crash-free session rate drops below 99.5% in production, or any P0 regression confirmed in crash logs. Hand off crash investigation to `asc-build-check`.

---

## Product Hunt

Product Hunt is worth pursuing for consumer apps, developer tools, and productivity apps. Not worth it for enterprise-only or highly niche B2B tools.

### How to maximize a PH launch

- [ ] Submit at 12:01 AM Pacific (competition resets midnight)
- [ ] Hunter should be an established PH user with followers — ask a community member, not yourself
- [ ] Tagline: one concrete value statement, no em-dashes, no "the", under 60 chars
- [ ] First comment from maker: personal story, what problem you solved and why
- [ ] Prepare 5–7 product screenshots and a 2-min video walkthrough
- [ ] Brief your community to upvote and comment organically on launch day — do not coordinate mass upvoting schemes (PH detects and penalizes)
- [ ] Respond to every comment within the first 4 hours

**Realistic PH outcomes:** A top-5 product of the day gives 500–2,000 visits. Conversion to downloads varies wildly (5–30%). Treat PH as awareness and backlink, not primary distribution.

---

## Post-Launch (Weeks 1–4 After GA)

### Week 1 post-launch

- [ ] Analyze keyword ranking baseline — hand off to `asc-aso` for optimizations
- [ ] Compile user feedback from reviews and TestFlight crash submissions
- [ ] File bug reports for any issues surfaced in reviews
- [ ] Confirm phased release has reached 100% (or manually complete it)
- [ ] Launch Apple Search Ads brand defense campaign — hand off to `apple-search-ads`

### Weeks 2–4 post-launch

- [ ] Ship a 1.0.1 patch with day-one fixes (fast turnaround signals quality to App Review)
- [ ] Respond to every review, especially 1–3 star reviews with specific complaints
- [ ] Evaluate featuring eligibility now that you have a live app with ratings — hand off to `app-store-featured`
- [ ] Review conversion funnel: impression → product page view → download. Optimize the weakest link.
- [ ] Run a retrospective against your launch metric. Did you hit it? Why or why not?

---

## Launch Plan Output Template

When a user asks to "create a launch plan," produce a doc in this structure:

```
# [App Name] Launch Plan

## Positioning
- One-liner:
- Target audience:
- Key differentiator:

## Launch Date: [DATE]
- Submission date (target): [DATE - 10 days buffer]
- Embargo date for press: [DATE - 1 day]
- Product Hunt day: [DATE]

## Metrics
- Primary launch metric:
- Day-1 target:
- 30-day target:

## Phased Release: Yes / No
- Pause threshold: crash-free sessions < 99.5%

## Channel Plan
- Press contacts: [list tier 1, 2, 3]
- Creators: [list]
- Community: [subreddits, forums, Slack groups]
- Owned: [email list size, social followers]

## Week-by-Week Tasks
[Populate from the 8-week countdown above]

## Open Questions
[Dependencies, decisions not yet made]
```

---

## Cross-References

| Skill | When to Hand Off |
|-------|-----------------|
| `app-brand-identity` | Week 7: icon, screenshots, press kit, visual system |
| `asc-aso` | Week 4: keyword research, title/subtitle/description copy |
| `asc-submission` | Week 3: metadata completeness, screenshots, submit for review |
| `submission-preflight` | Week 3: pre-submission risk check before submitting |
| `app-store-pricing` | Week 3: price tiers, IAP setup, regional pricing |
| `app-store-featured` | Week 2: featuring nomination, editorial guidelines |
| `asc-build-check` | Launch day + phased rollout: crash monitoring, build health |
| `apple-search-ads` | Week 2 onward: brand defense, category campaigns |

<!-- END SKILL: app-launch -->

---

<!-- BEGIN SKILL: app-marketing-context -->

# app-marketing-context

# App Marketing Context

**Produce a single persistent brief that every marketing skill reads first, so you never answer the same questions twice.**

This is the foundation skill for the growth cluster. Run it once per app (or when positioning shifts); every downstream skill — `asc-aso`, `app-launch`, `apple-search-ads`, `app-store-pricing`, `app-brand-identity` — checks for this file before asking you anything.

> **This is not a PRD.** `product-spec` captures what to build and why; `app-marketing-context` captures how to position, price, and grow what you've built. If you need both, run `product-spec` first.

---

## When to Run

- Starting any growth or marketing work on an Apple app for the first time.
- Onboarding to a new client's app — capture the landscape before touching metadata.
- Positioning has shifted (new audience, rebrand, major feature, pricing change).
- Another skill says "load app-marketing-context.md" and the file doesn't exist.

### Before creating, check for an existing file

```
Does app-marketing-context.md exist in the project root or .claude/?
  YES → Offer to review and update specific sections rather than recreate.
  NO  → Proceed with the full template below.
```

When updating, ask which sections changed. Don't overwrite data that's still accurate.

---

## The Context Document Template

Save the completed file to `.claude/app-marketing-context.md` (preferred) or the project root. Use this skeleton verbatim — downstream skills parse it by section heading.

````markdown
# App Marketing Context
<!-- Generated by app-marketing-context skill. Update don't recreate. -->

## App Overview

| Field | Value |
|-------|-------|
| App name | |
| Apple App ID | |
| Primary category | |
| Secondary category | |
| Platforms | iOS / iPadOS / macOS / watchOS / visionOS |
| Price model | Free / Freemium / Paid / Paymium |
| Launch date | |
| Current version | |
| App Store URL | https://apps.apple.com/app/id<APP_ID> |

## Value Proposition

**Problem:** Who has what pain, and what evidence proves it (reviews, support tickets, churn)?

**Target audience:** Primary persona (one paragraph: demographics, device habits, Jobs To Be Done).

**Differentiator:** What do you do that the top 3 competitors don't — and why does it matter to that persona?

**One-line pitch:** "For [audience], [App] is the [category] that [unique benefit] — unlike [alternative]."

## Competitor Landscape

| App | App ID | Strengths | Weaknesses | Our angle |
|-----|--------|-----------|------------|-----------|
| | | | | |
| | | | | |
| | | | | |

> Tip: Use `asc_get_app_info` on each competitor's App ID to pull current ratings and review counts without leaving Claude.

## Current ASO State

Pull live data via ASC MCP before filling these in:

```
asc_get_metadata(appId: "<APP_ID>", platform: "IOS")
asc_get_app_info(appId: "<APP_ID>")
```

| Field | Current value | Char limit | Notes |
|-------|--------------|:----------:|-------|
| Title | | 30 | |
| Subtitle | | 30 | |
| Keyword field | | 100 | |
| Promotional text | | 170 | editable without review |
| Average rating | | — | pull from asc_get_app_info |
| Rating count | | — | |
| Last metadata update | | — | |

## Goals & KPIs

Focus on three. More dilutes accountability.

| # | Goal | Metric | Target | Date |
|---|------|--------|--------|------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## Resources & Constraints

| Resource | Detail |
|----------|--------|
| Budget (paid UA) | |
| Team size | |
| ASO tool | App Store Connect / third-party |
| Design capacity | |
| Release cadence | |
| Key constraint | |

## Markets & Localization

| Market | Priority | Languages | Notes |
|--------|----------|-----------|-------|
| | Primary | | |
| | Secondary | | |

````

---

## Gathering the Data

Work through sections in this order — it's the dependency chain:

1. **App Overview** — Apple App ID unlocks everything else (ASC MCP calls, App Store URL, competitor cross-reference). Get it first.
2. **Value Proposition** — Write the one-line pitch before looking at competitors; otherwise competitors anchor your framing.
3. **Competitor Landscape** — Now look outward. Pull their App IDs, run `asc_get_app_info` on each, read their top reviews for recurring complaints (those are your wedge).
4. **Current ASO State** — Run `asc_get_metadata` to get the live title/subtitle/keyword field. Don't transcribe from memory — the live state is the only truth that matters for gap analysis.
5. **Goals & KPIs** — Force a priority order. If everything is #1, nothing is.
6. **Resources & Constraints** — Honest constraints prevent wasted strategies. A solo dev with no paid UA budget needs a different playbook than a funded team.
7. **Markets** — Localization is the highest-ROI ASO lever most teams underuse. Name it explicitly.

### ASC MCP quick reference

| What you need | Tool call |
|---------------|-----------|
| App name, rating, subtitle | `asc_get_app_info(appId: "…")` |
| Live title / subtitle / keywords / promo text | `asc_get_metadata(appId: "…", platform: "IOS")` |
| Same for macOS | `asc_get_metadata(appId: "…", platform: "MAC_OS")` |

> These calls require the ASC MCP server (`src/mcp/asc/`) to be configured. If it isn't, fill the ASO State section manually and note the date so you know when to refresh.

---

## Output Step

After the file is written:

1. **Save** to `.claude/app-marketing-context.md` (create `.claude/` if it doesn't exist).
2. **Summarize** in this format:

```
Saved: .claude/app-marketing-context.md

Strengths identified:
- …

Gaps to address:
- …

Recommended next skills (in order):
1. asc-aso        — keyword and metadata strategy
2. app-brand-identity — if visual identity is undefined
3. app-launch     — if launch or relaunch is upcoming
4. apple-search-ads — if paid UA budget exists
5. app-store-pricing — if price model is unsettled
```

3. **Do not run** those skills automatically — let the user choose the order.

---

## Distinction: This Skill vs. Siblings

| Skill | What it captures | When to run it |
|-------|-----------------|----------------|
| `product-spec` | PRD: problem, user stories, acceptance criteria, non-goals | Before building a feature |
| **`app-marketing-context`** | Go-to-market: positioning, competitors, KPIs, ASO state, markets | Before any growth or marketing work |
| `asc-aso` | Keyword strategy and metadata execution | After this file exists |
| `app-launch` | Launch plan: timeline, channels, press, ratings prompt | After positioning is locked |
| `apple-search-ads` | Paid UA campaigns on Apple Search Ads | After context and ASO baseline exist |
| `app-store-pricing` | Price tier selection, in-app purchases, subscription design | When monetization model is in question |
| `app-brand-identity` | Visual identity: icon, wordmark, design tokens | When brand is undefined or being refreshed |

`product-spec` and `app-marketing-context` are complementary, not competing. A well-run app has both: the spec tells engineers what to build; this file tells the growth team how to sell it.

---

## Keeping It Fresh

Stale context is worse than no context — other skills will make decisions on bad assumptions.

**Update triggers:**

- Major version release (new features change the value proposition and keyword opportunities).
- Price model change (affects every downstream skill).
- New primary market or localization push.
- Competitive landscape shift (a major competitor launches or shuts down).
- KPIs are hit or reset (new goals need a new brief).

Add the update date to the file header comment so you always know how old the data is.

<!-- END SKILL: app-marketing-context -->

---

<!-- BEGIN SKILL: app-rejection-recovery -->

# app-rejection-recovery

# App Rejection Recovery

**Diagnose Apple App Review rejections fast, write a response that gets re-reviewed within 24 hours, and ship the fix before your launch window closes.**

---

## Step 1 — Triage before you type a single word

Do not draft anything until you have answers to all of the following:

1. **Paste the full rejection verbatim** — every sentence, including the guideline number(s). Paraphrasing loses signal.
2. **First submission or update?** First submissions face higher scrutiny; updates that regress on a previously approved flow are a separate failure mode.
3. **What changed in this version?** A clean diff of what's new (features, SDKs, entitlements, Info.plist keys) narrows root cause immediately.
4. **Is this time-sensitive?** Marketing tied to a date, a live event, or a partner launch — that changes the escalation path.
5. **App category and monetization model** — required to assess 3.x IAP and 5.x privacy exposure.

Use `asc_get_review_detail` (App Store Connect MCP) to pull the current review state and any inline reviewer notes if the user hasn't already copied them.

---

## Apple Rejection Taxonomy

| Guideline | Bucket | Typical Fix |
|-----------|--------|-------------|
| 2.1 | Performance / completeness | Reproduce crash on reviewer's device + iOS; ship fixed binary with demo account |
| 2.3.x | Accurate metadata | Screenshots must match live binary; no unsupported device mentions |
| 2.5.x | Software requirements | Remove private API use; correct HealthKit / CallKit / SiriKit misuse |
| 3.1.1 | IAP — digital goods | All digital content sold through StoreKit; no external payment links |
| 3.1.2 | IAP — subscriptions | Auto-renewal disclosure on screen; restore purchases button; terms link |
| 3.2.2 | Unacceptable business model | MLM, lottery without license, or misleading monetization |
| 4.0 | Design | Broken layout, non-functional UI, copycat shell |
| 4.2 | Minimum functionality | Web wrapper, thin brochureware, or single-static-page app |
| 4.3 | Spam / duplicate | Substantive differentiation from your own or competitor portfolio required |
| 4.5.x | Apple sites and services | Correct Apple logo usage; no push-notification abuse |
| 5.1.1 | Privacy — data collection | Privacy policy URL live; App Privacy labels accurate; ATT copy specific |
| 5.1.2 | Data use and sharing | Privacy nutrition labels must reflect every SDK's collection, not just first-party |
| 5.1.5 | Location services | "Always" permission must be demonstrably necessary; "When In Use" for most apps |
| 5.1.7 | Health and medical | Disclaimers required; no diagnostic claims without regulatory clearance |
| 5.2.x | Intellectual property | Trademark or copyright holder permission in writing |
| 5.3.x | Gaming and gambling | Valid regional license required for real-money wagering |
| 5.6.1 | Developer code of conduct | Fake reviews, review manipulation, spam across apps |

---

## Common Rejection Playbooks

### Guideline 2.1 — Crash or incomplete functionality

The reviewer hit a crash or a dead-end flow you didn't catch internally.

**Fix sequence:**
1. Read the device model and iOS version Apple tested on — reproduce on that exact config or the closest available in Simulator.
2. If the crash is environment-dependent (account state, region, backend flag), provide a seeded demo account with a numbered walkthrough in the Resolution Center response. A Loom-style screen recording uploaded to a public URL eliminates ambiguity.
3. Ship a new binary. Never reply with "we couldn't reproduce it" without also providing the demo account — reviewers don't retry without a reproduction path.
4. Reference the exact crash location (view controller, function, or error log line) in your response to signal that you traced it fully.

### Guideline 2.3.10 — Inaccurate metadata or screenshots

Screenshots show UI that doesn't exist in the submitted binary, or device frames claim support that isn't declared.

**Fix sequence:**
1. Audit every screenshot: does every screen shown exist in this exact build?
2. Remove any iPad screenshots if `UIDeviceFamily` doesn't include iPad.
3. Strip third-party trademarks, logos, or app icons from promotional art unless you hold rights.
4. Replace placeholder copy ("Lorem ipsum", "Coming soon") anywhere visible in screenshots.
5. Cross-reference with `asc-aso` for listing-copy accuracy.

### Guideline 3.1.1 — IAP required for digital goods

An external payment link, a "Buy on web" CTA, or a reader-app workaround applied incorrectly.

**Fix sequence:**
1. Audit every purchase surface — in-app, settings, onboarding — for external payment references.
2. Implement StoreKit for all digital goods and premium features.
3. Note: the US External Purchase Link Entitlement (post-Epic ruling) allows a single outbound link for eligible developers — it requires an explicit entitlement request via ASC and does **not** apply globally. Don't apply it without verifying eligibility first.
4. See `paywall-design` for compliant purchase screen patterns and `app-store-pricing` for price tier mechanics.

### Guideline 4.3 — Spam or duplicate app

Apple is comparing your app to another in your portfolio or to a near-identical competitor.

This is the hardest bucket to recover from. No Resolution Center response fixes it — only the binary does.

**Fix sequence:**
1. Identify which app(s) the reviewer is comparing yours to. If it's your own portfolio, seriously consider consolidating.
2. Add a genuinely differentiated feature — not a UI reskin. The reviewer will compare the two side by side again on resubmission.
3. Update metadata to emphasize the unique value clearly — see `asc-aso`.
4. If this is the second 4.3 rejection for the same app: stop resubmitting. Appeal with concrete differentiation evidence, or retire the app.
5. Do not appeal a first-time 4.3 — fix and resubmit is faster than the App Review Board queue.

### Guideline 5.1.1 — Privacy: data collection disclosure

The privacy policy is missing, dead-linked, or the App Privacy labels underreport what your SDKs collect.

**Fix sequence:**
1. Privacy policy URL must be live, HTTPS, and contain app-specific language — not a generic company policy.
2. Open ASC → App Privacy and audit every data type against every SDK in your dependency tree. Analytics, attribution, and crash-reporting SDKs commonly over-collect relative to what developers declare.
3. ATT prompt string (`NSUserTrackingUsageDescription`) must name a specific use — "to show you relevant ads from our partners" — not "to improve your experience."
4. All `NSUsageDescription` strings must explain the user benefit in plain language, not describe the permission mechanism.
5. See `privacy-manifest` for the PrivacyInfo.xcprivacy required API declaration process.

### Guideline 5.1.5 — Location: "Always" not justified

Your app requests `Always` location authorization but the reviewer can't confirm a legitimate background need.

**Fix sequence:**
1. Audit whether your app genuinely requires background location. Navigation, delivery tracking, and geo-fencing are valid. Most apps don't need it.
2. Downgrade to `WhenInUse` if background location isn't a core feature.
3. If `Always` is legitimately required: add a prominent in-app explanation screen before the system prompt, update `NSLocationAlwaysAndWhenInUseUsageDescription` with a specific justification, and note the user scenario in your Resolution Center response.

---

## Resolution Center Response Template

A well-structured response gets your app into the re-review queue within 24 hours. A defensive or vague response does not.

```
Hello App Review Team,

Thank you for the detailed feedback on guideline [X.Y.Z].

UNDERSTANDING
We understand the issue is [one sentence describing exactly what was flagged — do not paraphrase the guideline, describe the specific instance].

CHANGES MADE
1. [Specific change — what was removed, added, or fixed, and where in the app]
2. [Specific change]
3. [Specific change if applicable]

DEMO INFORMATION
  Username: demo@yourapp.com
  Password: [password]
  Reproduction steps:
    1. [Step]
    2. [Step]
    3. [Step]
  Screen recording: [URL — optional but strongly recommended for 2.1 rejections]

We have submitted build [version (build number)] containing these changes. Please let us know if you need any additional information.

Thank you,
[Your name]
```

**Hard rules:**
- Never argue the guideline. Acknowledge it and address it.
- Never resubmit the same binary as a response to a binary rejection — you must ship a new build.
- Always state the exact new build number. Reviewers will not hunt for it.
- Provide demo credentials for every response, even if the rejection isn't login-related. Reduce friction at every point.
- One response per issue. If multiple guidelines were cited, address each in a numbered list under CHANGES MADE.

---

## Appeal vs. Fix Decision

| Situation | Action |
|-----------|--------|
| Reviewer applied the guideline to the wrong feature | Appeal via App Review Board — be factual, brief, include screenshots |
| Reviewer tested on wrong device or account state | Respond in Resolution Center with exact reproduction steps; no formal appeal needed |
| First-time 4.3 spam rejection | Fix substantively and resubmit; appealing is slower and rarely wins |
| Guideline you demonstrably comply with | Appeal with evidence: code references, screenshots, privacy policy sections |
| Second or third rejection on same issue | Escalate to App Review Board; re-review is unlikely to go differently |
| 5.6.1 account threat or developer suspension | Appeal immediately with full context; do not ignore or delay |

**App Review Board** (developer.apple.com/contact/app-store/) — expect 5–10 business days. Reserve appeals for genuine reviewer error. Frivolous appeals slow your account's review velocity.

---

## Expedited Review

Request via ASC → Help → Contact Us → App Review → Request Expedited App Review.

**Valid reasons Apple accepts:**
- Critical bug fix affecting existing users in a live build
- Security vulnerability disclosed and patched
- Time-sensitive event with a contractual or public commitment (conference, launch partner, media coverage date)

**Not valid:**
- Marketing deadlines you set internally
- "We need this for our investors"
- Competitive pressure

Abuse of expedited requests is noted on your account. Use it once per meaningful situation.

---

## Diagnosis Output Template

Use this structure when presenting findings to the user:

```
REJECTION DIAGNOSIS — [App Name] [Version]

REJECTION TYPE
  Guideline:   [number and title]
  Bucket:      [from taxonomy table]
  Complexity:  Low / Medium / High

ROOT CAUSE
  [One clear paragraph in plain English explaining what triggered the rejection
   and why the reviewer flagged it]

FIX PLAN
  Binary changes:        [list]
  Metadata changes:      [list]
  ASC configuration:     [list — entitlements, App Privacy, etc.]
  Estimated effort:      [hours]

RESOLUTION CENTER RESPONSE
  [Completed template from above]

RESUBMISSION CHECKLIST
  [ ] Reproduced on device/OS Apple tested
  [ ] Demo account seeded and verified
  [ ] Build number incremented (version or build)
  [ ] App Privacy labels reconciled with all SDKs
  [ ] Resolution Center response posted before resubmission
  [ ] Expedited review requested if time-sensitive (and justified)

ESCALATION PATH
  If rejected again on same guideline: [specific next step — appeal, redesign, or retire]
```

---

## Prevention: Stop the Next Rejection Before It Happens

After the current rejection is resolved, run through `submission-preflight` before every future submission. High-signal checks specific to the rejection types above:

- [ ] Every screenshot matches the exact binary being submitted — no future UI, no placeholder states
- [ ] All `NSUsageDescription` keys written for users, not engineers
- [ ] Privacy policy URL returns HTTP 200 from an external network (not just localhost)
- [ ] App Privacy labels audited against every third-party SDK's published privacy manifest
- [ ] No "BETA", "BUG FIXES", or generic What's New copy in the version release notes
- [ ] Sign in with Apple offered alongside every third-party social login option
- [ ] Demo account seeded with realistic content and credentials documented before submission
- [ ] If the app has a paywall, review `paywall-design` for 3.1.1 and 3.1.2 compliance before each update

---

## Cross-Skill Handoffs

| Need | Skill |
|------|-------|
| Full pre-submission checklist | `submission-preflight` |
| App Privacy labels and PrivacyInfo.xcprivacy | `privacy-manifest` |
| Listing copy, screenshots, keywords after approval | `asc-aso` |
| Paywall compliance (3.1.1, 3.1.2) | `paywall-design` |
| Price tiers and subscription configuration | `app-store-pricing` |
| Build upload and submission mechanics | `asc-submission` |

Use `asc_check_submission` and `asc_get_review_detail` (App Store Connect MCP) to pull live review state, current build status, and any reviewer attachments without leaving the agent.

<!-- END SKILL: app-rejection-recovery -->

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

<!-- BEGIN SKILL: app-store-featured -->

# app-store-featured

# App Store Featuring

**Win editorial placement by building the app Apple's editors want to champion — then telling them about it at exactly the right moment.**

---

## What Apple's Editors Actually Reward

Apple does not feature apps for marketing partnerships or install volume. Editorial decisions are made by humans who care about craft. The signal they look for:

- **Exemplary adoption of recent OS features** — widgets, Live Activities, App Intents, App Clips, Dynamic Island, Apple Intelligence integration. Apps that ship day-one support for a new API stand out.
- **Outstanding visual and interaction design** — feels native, uses SF Symbols, respects the HIG, animations are purposeful.
- **Strong accessibility** — VoiceOver fully functional, Dynamic Type supported, sufficient contrast, no accessibility blockers. Editors use assistive technology.
- **Deep localization** — App Store product page and in-app strings localized into the languages of the regions being pitched.
- **Stability** — crash-free sessions above 99.5 % in the relevant App Store Connect metrics. Editors check.
- **A timely story** — cultural moment, seasonal hook, new feature launch, major update, awareness event. The pitch needs a "why now."
- **Product page quality** — screenshots that communicate value in three seconds, a preview video, a compelling short description.

---

## Featuring Surfaces

| Surface | What it is | Typical lead time |
|---|---|---|
| Today tab story | Full-page editorial card written by Apple | 3-6 weeks |
| App of the Day | Single-app spotlight, Today tab | 3-6 weeks |
| Game of the Day | Same as above, Games tab | 3-6 weeks |
| Category collections | "Apps We Love Right Now," genre lists | 2-4 weeks |
| In-App Events | Timed event card inside the App Store | 14 days minimum before event start |
| Seasonal / moment collections | Holiday, back-to-school, awareness months | 4-8 weeks |

---

## Featuring-Readiness Scorecard

Score your app before submitting a nomination. Target 80+ before pitching a major surface.

### 1. Latest-API Adoption (30 pts)

| Item | Points |
|---|---|
| Widgets (WidgetKit) — at least one useful widget | 6 |
| Live Activities — relevant real-time content | 6 |
| App Intents — Siri / Shortcuts / Spotlight actions | 6 |
| App Clips — low-friction discovery flow | 4 |
| Apple Intelligence — Writing Tools, Image Playground, or Siri integration where contextually appropriate | 5 |
| Dynamic Island — compact / expanded presenter | 3 |

### 2. Design Quality (25 pts)

| Item | Points |
|---|---|
| Follows current HIG — no deprecated patterns | 8 |
| SF Symbols used throughout (not custom icon soup) | 5 |
| Supports all relevant screen sizes without layout breaks | 5 |
| Animations feel native, not janky or overdone | 4 |
| Dark Mode fully supported | 3 |

### 3. Accessibility (20 pts)

See `ios-accessibility` for the full audit checklist. Score here is a gate, not a detail.

| Item | Points |
|---|---|
| VoiceOver: all interactive elements labeled and reachable | 8 |
| Dynamic Type: no truncated or clipped text at any size | 6 |
| Contrast ratio passes WCAG AA (4.5:1 text, 3:1 UI) | 4 |
| Reduce Motion respected | 2 |

### 4. Localization (10 pts)

See `localization` for string extraction and locale coverage guidance.

| Item | Points |
|---|---|
| App Store product page localized in pitched region's language(s) | 5 |
| In-app strings localized (no hardcoded English visible to non-English users) | 3 |
| RTL layout works correctly (Arabic, Hebrew) | 2 |

### 5. Stability and Metrics (10 pts)

Use `asc-build-check` to pull crash and engagement data.

| Item | Points |
|---|---|
| Crash-free sessions ≥ 99.5 % (last 30 days) | 6 |
| No pending rejection or metadata warning in ASC | 3 |
| App has been live ≥ 90 days (unless pitching a new launch) | 1 |

### 6. Product Page Quality (5 pts)

See `asc-aso` for screenshots, preview, and metadata best practices.

| Item | Points |
|---|---|
| Preview video present and current | 2 |
| Screenshots use device frames and communicate the core value prop | 2 |
| Short description (170 chars) reads well without truncation | 1 |

---

**Score interpretation**

| Score | Readiness |
|---|---|
| 90-100 | Strong candidate — nominate now |
| 80-89 | Ready — address any 0-pt items before pitching |
| 65-79 | Not yet — ship the missing APIs and re-audit |
| Below 65 | Significant gaps — focus on API adoption and accessibility first |

---

## The Apple Tech Checklist

These are the specific capabilities Apple highlights in editorial consideration. Tick every box that applies to your app's category.

**Universal (all apps)**
- [ ] Supports latest iOS SDK (same-year release target)
- [ ] Uses SF Symbols 6+ (or current release)
- [ ] Runs natively on iPhone and iPad without letterboxing
- [ ] Supports Stage Manager on iPad if a productivity app
- [ ] WidgetKit widget with useful glanceable content
- [ ] Siri / Shortcuts via App Intents framework

**Contextual (tick if relevant)**
- [ ] Live Activities for real-time state (sports, delivery, workouts, timers)
- [ ] App Clip for first-use or physical-world trigger
- [ ] SharePlay for co-experience apps
- [ ] StoreKit 2 for In-App Purchases (not legacy StoreKit)
- [ ] PassKit / Wallet integration
- [ ] HealthKit, ARKit, RealityKit, MapKit, Core ML — relevant to category
- [ ] Apple Intelligence: Writing Tools opt-in (text editors), Image Playground, visual search

**Product page**
- [ ] App Preview video (15-30 seconds, no voiceover required)
- [ ] Custom product page variants created for key use cases
- [ ] In-App Events configured in ASC (at least one past or active event)

---

## In-App Events as a Featuring Surface

In-App Events appear directly on the App Store product page and in search results. They are one of the lowest-friction paths to editorial visibility because Apple actively promotes them in the "Events" tab and in algorithmic recommendations.

**What qualifies as an In-App Event**

- Challenges and competitions
- Live events (concerts, sports seasons, real-time content drops)
- Premiers (new content launches)
- Major updates (new feature or significant version)
- Seasonal moments tied to cultural events

**Copy and asset brief for each event**

| Field | Spec |
|---|---|
| Event name | 30 chars max. Specific, not generic ("Summer Training Challenge" not "New Update") |
| Short description | 50 chars. Appears in list views. |
| Long description | 120 chars. Appears on event detail card. |
| Event card image | 1920 x 1080 px, no alpha. Text must not be placed in bottom 20 % (obscured by gradient). |
| Start / end dates | Must be live in the app by the start date — Apple will test it |
| Event type | Select from ASC enum: challenge, competition, live event, premier, major update, special event |

**Submission timeline**

Submit the event in App Store Connect at least 14 days before the event start date. For seasonal moments (New Year's, summer, etc.) submit 3-4 weeks early — Apple's editorial calendar fills up.

**Editorial boost signals**

Events that get featured share these traits:
- Image is original, high-production art (not a screenshot)
- Name and description communicate a clear time-bound benefit
- Event is genuinely interactive, not just a sale
- The app itself has strong recent ratings and stability metrics

---

## The Nomination Form

**Where to submit:** App Store Connect → [Your App] → App Store tab → scroll to "Promote Your App" → "Submit for Feature Consideration."

Separate forms exist for:
- New app launch (submit 3+ weeks before launch)
- Major update / new feature (submit 3+ weeks before release date)
- Seasonal / cultural moment (submit 4-8 weeks before the moment)
- In-App Event (submit in ASC event editor, not the nomination form)

**Form fields and what Apple is really asking**

| Field | What to write |
|---|---|
| Tell us about your app | The 2-sentence pitch: what it does + who it's for. Concrete, not fluffy. |
| What makes your app unique | Specific differentiators. Mention the latest API features you've adopted. |
| Why should we feature it now | The hook: a cultural moment, launch date, major update, awareness event. Be explicit about dates. |
| Supported platforms | List every platform you ship: iPhone, iPad, Mac (Catalyst or native), Apple Watch, Apple TV, Vision Pro. |
| Accessibility features | List them specifically: VoiceOver support, Dynamic Type, Reduce Motion. Don't be vague. |
| Localization | List locale codes, e.g., "en, es, fr, de, ja, zh-Hans, ar." |
| Contact | Use the email of someone who can respond same-day if Apple's editorial team follows up. |

**Lead time rule of thumb**

- App of the Day / Today tab story: 4-6 weeks minimum
- Category collection: 2-4 weeks
- Seasonal editorial (App Store seasonal campaigns): 6-8 weeks — Apple's calendar locks early

---

## Writing a Pitch That Gets Read

Apple editors read hundreds of nominations. A pitch that works:

1. **Opens with the story, not the features.** "We built Tempo for athletes who train alone but want to feel coached" — not "Tempo is a fitness app with AI."
2. **States the "why now" in the first paragraph.** A date, a moment, a launch. No moment = no urgency = deprioritized.
3. **Mentions the specific Apple technologies by name.** "Live Activities for real-time split tracking, App Intents for Siri workout commands, WidgetKit complication for glanceable pace." Editors verify these are actually in the app.
4. **Cites one human story or use case.** A real user scenario, not a demographic segment.
5. **Is short.** 150-250 words total. Editors are not reading essays.

---

## Nomination Pitch Template

```
App Name: [Name]
Bundle ID: [com.company.app]
Current version: [x.x]
Platform(s): [iPhone / iPad / Mac / Watch / TV / Vision Pro]
Proposed feature date or window: [e.g., "Week of September 22" or "Back-to-school, late August"]
Feature type requested: [Today tab story / App of the Day / Category collection / Seasonal]

--- The Story (2-3 sentences) ---
[Who built it, who it's for, and the one thing it does better than anything else.]

--- Why Now ---
[The specific moment, launch date, awareness event, or cultural hook. Include exact dates.]

--- Apple Technology Highlights ---
- [Technology 1]: [how it's used]
- [Technology 2]: [how it's used]
- [Technology 3]: [how it's used]

--- Accessibility & Localization ---
Accessibility: [e.g., VoiceOver fully supported, Dynamic Type, Reduce Motion]
Locales: [e.g., en, es-MX, fr, de, ja, zh-Hans, ar]

--- Metrics (optional but recommended) ---
Crash-free sessions (30-day): [e.g., 99.7 %]
Average rating: [e.g., 4.8 (12,000 ratings)]

Contact: [name, email, timezone]
```

---

## Readiness Output Template

When asked to assess featuring readiness, output this summary after scoring:

```
## Featuring Readiness: [App Name]

**Total score: [X] / 100**

### Strengths
- [Top 2-3 scoring areas with specifics]

### Gaps to close before nominating
- [Each 0-pt or low-pt item with a concrete fix]

### Recommended nomination window
[Earliest realistic date based on gaps + lead time, or "ready now"]

### Suggested feature type
[App of the Day / Today tab story / Category collection — based on score and story strength]

### Next steps
1. [Highest-impact fix]
2. [Second fix]
3. Submit nomination at App Store Connect → [App] → Promote Your App
```

---

## Related Skills

| Need | Skill |
|---|---|
| Accessibility audit before nomination | `ios-accessibility` |
| Localization coverage and string extraction | `localization` |
| App Intents / Shortcuts implementation | `app-intents` |
| Product page optimization (screenshots, preview, ASO) | `asc-aso` |
| Crash-free rate and build metrics | `asc-build-check` |
| App review risk and submission strategy | `apple-review` |
| Launch planning and phased rollout | `app-launch` |
| Brand identity and visual consistency | `app-brand-identity` |

<!-- END SKILL: app-store-featured -->

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

<!-- BEGIN SKILL: apple-design-language -->

# apple-design-language

# Apple Design Language

The editorial layer for Apple apps on iOS, iPadOS, and macOS: the parts of "feels Apple-quality" that aren't a spacing number — copy, interaction states, empty/error states, and the judgment of when to follow versus tastefully break the Human Interface Guidelines. Think in capabilities (touch vs. pointer, compact vs. regular vs. window), not device names.

This skill is the **entry point** to the design language. It owns four things and routes everything else.

## Orientation index

| Concern | Where it lives |
|---|---|
| Spacing, optical alignment, padding, corner concentricity, hairlines, depth | `swiftui-micro-craft` |
| Motion timing, named springs, gestures, haptics | `swiftui-micro-craft` |
| Type scale mechanics, SF Symbol sizing/weight, Dynamic Type plumbing | `swiftui-micro-craft` |
| Color, design tokens, Liquid Glass, system materials | `apple-design` |
| VoiceOver, Dynamic Type coverage, tap-target sizing | `ios-accessibility` |
| Adaptive layout, size classes, multi-platform navigation | `cross-platform-adaptivity` |
| **UX writing & copy** | this skill → `references/ux-writing.md` |
| **Forms, validation, focus, loading, control states** | this skill → `references/interaction-states.md` |
| **Empty & error states** | this skill → `references/empty-error-states.md` |
| **When to follow vs. break HIG; quality-vs-slop judgment** | this skill (below) |
| Worked examples of tasteful HIG deviation | this skill → `references/exemplars.md` |

## HIG is the floor, not the ceiling

The Human Interface Guidelines encode what is **safe and approvable**. Meet that floor everywhere. But Apple's own best apps — and most Apple Design Award winners — exceed or selectively break the defaults where it serves the user. "HIG-compliant" and "great" are not the same target. Your job: clear the floor without exception, then raise the ceiling deliberately.

### Deviation decision gates

Deviate from a HIG default only when **all four** hold:

1. **Named benefit** — you can state the user benefit in one sentence that isn't "looks better," "feels modern," or "cleaner."
2. **Survives the slop check** — it is not one of the numbered tells below (and will pass `swiftui-design-check` once that exists).
3. **Survives assistive tech** — still correct under VoiceOver and Dynamic Type at AX5 (see `ios-accessibility`).
4. **Systematic** — applied as a rule across the app, not a one-off that creates an inconsistency.

If any gate fails, use the HIG default. Deviation is earned, not assumed.

## Anti-slop tells (numbered — the contract with `swiftui-design-check`)

These are the Apple-native equivalents of web "AI slop." Each is numbered so the `swiftui-design-check` linter (sub-project #2) can map a scanner rule to it. **Statically detectable** ones are marked ⚙.

1. ⚙ **System-gray everything** — flat `.gray`/`Color(.systemGray)` fills where a system material or hierarchical foreground style belongs.
2. **Sheet-for-everything** — a modal `.sheet` where a push, popover, menu, or inline disclosure fits the navigation depth better.
3. ⚙ **Unlabeled icon-only buttons** — an icon `Button`/`Label(systemImage:)` with no `accessibilityLabel` and no visible text.
4. ⚙ **Untouched `.automatic` styling** — default button/list/navigation styling shipped with no deliberate choice behind it.
5. ⚙ **Center-everything layout** — no leading-edge alignment hierarchy; titles, body, and controls all centered.
6. ⚙ **Hardcoded font sizes** — `.font(.system(size: 17))` instead of a semantic text style.
7. ⚙ **Twin full-width CTAs** — primary and secondary actions given equal visual weight, destroying hierarchy.
8. ⚙ **Emoji as iconography** — emoji where an SF Symbol is the native choice.
9. ⚙ **Placeholder-as-label** — relying on `TextField` placeholder text instead of a persistent field label.
10. **Spinner-for-everything** — indeterminate spinners where a skeleton or determinate progress fits, with no empty/error variant designed.
11. **Overlay for the critical** — a non-modal banner or overlay where an `.alert` is required (data loss, destructive confirmation).
12. ⚙ **Gradient-and-glow slop** — decorative purple-ish gradients, drop-glows, or faux depth not derived from system materials.
13. **Generic empty state** — "No items" with no cause and no next action (see `references/empty-error-states.md`).
14. ⚙ **Title Case body copy** — title-casing sentences, labels, or descriptions that should be sentence case (see `references/ux-writing.md`).

## Quick reference

### Capitalization

| Use | Case |
|---|---|
| Nav-bar titles, buttons, menu items, alert titles | Title Case |
| Labels, body text, alert messages, hints, footnotes, placeholders | Sentence case |

### Button verbs (pick the precise word)

| Word | Use for |
|---|---|
| Done | Dismiss, keeping changes already applied |
| Save | Commit changes that aren't applied yet |
| Cancel | Dismiss, discarding changes |
| OK | Acknowledge an alert with no alternative — prefer a specific verb when one fits |
| Delete / Remove | Destructive — pair with confirmation; never "OK" |

### Empty/error: which surface

Data loss or destructive confirmation → `.alert`. Recoverable, non-blocking → inline state or banner. No data yet → designed empty state with cause + action. Full tree in `references/empty-error-states.md`.

## Relationship to other skills

This skill is the design-language hub. It complements `swiftui-micro-craft` (quantified visual craft), `apple-design` (tokens, color, Liquid Glass), `ios-accessibility` (assistive tech), and `cross-platform-adaptivity` (layout). It is consumed by `apple-review` and `apple-polish` (design panels) and `paywall-design` (copy). The numbered anti-slop tells above are the rule source for `swiftui-design-check`.

<!-- REFERENCE: apple-design-language/references/empty-error-states.md -->

# Empty and Error States

Every state where content is absent or unavailable is a designed state — not a missing one. Pick the right surface and copy for the cause.

---

## Decision tree

```
Is there content to show?
├─ No, and the user hasn't acted yet              → FIRST-RUN empty state
├─ No, because this collection is genuinely empty → NO-DATA empty state
├─ No, because a search/filter matched nothing    → NO-RESULTS state
├─ No, because we can't reach the network         → OFFLINE state
├─ No, because the user denied a permission       → PERMISSION-DENIED state
└─ No, because an operation failed                → ERROR/FAILURE state
```

Each leaf is a distinct cause with a distinct fix. Never collapse them into a single "No items" screen — that is anti-slop tell #13 (Generic empty state).

---

## 1. FIRST-RUN empty state

The user has never added content. The collection is empty because nothing has happened yet, not because something went wrong.

**What to show:** a centered layout with an SF Symbol or simple illustration, a brief title, and one primary action button. `ContentUnavailableView` is the modern SwiftUI API — use it; it provides the standard centered layout and adapts to dark mode via system colors.

**What to say:** explain the value in one line. Tell the user what this space is for, then invite them to fill it. "Your trips will appear here. Add your first flight." Not a marketing pitch — one sentence of orientation, one sentence of direction.

**What to offer:** a single primary action that starts the creation flow. "Add Flight." No secondary distractions.

The first-run state is also the right moment for pre-permission priming if the feature needs a system permission — explain the benefit once, before triggering the system prompt (see the "Notifications and permission prompts" section of `ux-writing.md`).

---

## 2. NO-DATA empty state

The user has used the app before but has deleted or archived all items, or this section has never received any. Cause: the collection is structurally empty right now, not because it has never been filled.

**What to show:** same `ContentUnavailableView` pattern as first-run, but lighter — the user already knows what this space is for, so you don't need orientation copy.

**What to say:** skip the value explanation. Go straight to the prompt: "No entries. Add one to get started." or simply "No entries" with an Add button if the surface is already familiar.

**What to offer:** the same create action as first-run. The difference is tone, not structure — encouraging the first time, matter-of-fact on return.

---

## 3. NO-RESULTS state

A search or filter has returned zero matches. The collection is not empty — the query just didn't find anything in it. This is a different cause and requires a different message.

**What to show:** `ContentUnavailableView` with a search-specific icon (e.g., `magnifyingglass`). Do not reuse the same layout as the no-data state — after a search, users can't tell whether the collection is empty or the query failed.

**What to say:** confirm what they searched for, then suggest broadening. "No results for 'Paris'." Body: "Try a different keyword or adjust your filters."

**What to offer:** a "Clear Filters" or "Clear Search" button. Don't make the user hunt for the search bar to reset — put the escape hatch in the state itself.

Never make the no-results state identical to the no-data state. Different cause, different fix.

---

## 4. OFFLINE state

The app can't reach the network. Distinguish this clearly from a server-side failure — the user needs different information and different actions.

**What to show:** if you have cached content, show it — degraded content beats a blank state. Mark it as potentially stale ("Last updated 2 hours ago"). Reserve the empty/error surface for features that cannot function at all offline.

**What to say:** "You're offline." Then tell the user what is and isn't available. "You can read saved articles. New content will load when you reconnect." Do not conflate offline with server failure — "Something went wrong" is wrong here.

**What to offer:** a Retry button for content that should load when connectivity returns. If the user has unsynced changes, surface them — never silently discard unsynced work. "3 changes will sync when you reconnect" is a status, not an error.

---

## 5. PERMISSION-DENIED state

The user has denied a system permission the feature depends on. This is not an error — the user made a choice. Respect it while offering a clear path back.

**What to show:** an explanation of what the feature needs and why the user benefits, then a Settings button. Use `UIApplication.openSettingsURLString` to deep-link to your app's settings page.

**What to say:** state the capability, not a guilt trip. "Location access is off. Enable it in Settings to see places near you." Not "You denied location — the app needs this to work."

**What to offer:** an "Open Settings" button that launches `UIApplication.openSettingsURLString`. If a degraded-but-useful path exists, offer it too: "You can still search by city name." Pre-permission priming (see the "Notifications and permission prompts" section of `ux-writing.md`) reduces how often you reach this state — a well-primed user grants the permission before you need to recover from a denial.

Never nag. Show this state once per session at most. If the user dismisses it without going to Settings, respect that decision until the next time they invoke the feature.

---

## 6. ERROR/FAILURE state

An operation failed: a network call returned an error, a write failed, a sync conflict occurred. This is the broadest category and requires the most precision.

**What to show:** depends on severity.

- **Transient failure** (network timeout, 5xx, rate limit) — inline error state using `ContentUnavailableView`, with a Retry button. No `.alert` required.
- **Data loss or destructive outcome** — use `.alert`. Non-modal banners or overlays can be dismissed, partially obscured, or missed; data-loss confirmation requires a blocking decision surface. This is anti-slop tell #11 (Overlay for the critical). The `.alert` must use the `.destructive` button role and name the real action verb.

**What to say:** three-part error copy — what happened, why, how to fix it. Full structure is in the "Error messages" section of `ux-writing.md`. Example: "Couldn't upload the photo. The file may be too large — try a smaller photo or check your connection." Do not say "An error occurred." That is the text equivalent of anti-slop tell #13: a bare fact with no cause and no path forward.

**What to offer:**

- Retry for transient failures. Put the button in the state, not buried in a menu.
- Preserve the user's input. If a form submission failed, the fields must still contain what the user typed — never reset on error.
- For permanent or unrecoverable failures, say so plainly and tell the user what you'll do: "We couldn't recover this file. Your other notes are safe."

Tie the choice of surface to the cause: recoverable → inline state with Retry; data loss → `.alert`. Never use a non-modal banner or overlay for anything in the error/failure category that requires a user decision.

---

## Anatomy of a good empty state

A well-formed empty state has four elements:

1. **An SF Symbol or simple illustration** — not an emoji (anti-slop tell #8) and not a decorative gradient (anti-slop tell #12). Pick an SF Symbol that represents the missing content type, not a generic warning icon.
2. **A sentence-case headline** — one line, explains the cause or names the content type.
3. **A sentence-case body line** (optional) — explains what to do next.
4. **One primary action button** — Title Case verb, drives the next step. No secondary button competing for attention (anti-slop tell #7).

**Centering is acceptable here.** This is the one place where a fully centered layout is intentional and correct — the absence of content leaves nothing else to align to. This is an explicit carve-out from anti-slop tell #5 (Center-everything layout), which targets screens with real content that should have a leading-edge hierarchy. Empty states are the exception, not the rule.

Use `ContentUnavailableView` for this layout in SwiftUI. It handles Dynamic Type scaling, dark mode, and the centering automatically. Verify at AX5 (largest Dynamic Type size) that the layout does not clip or overflow.

---

See the hub: ../SKILL.md

<!-- REFERENCE: apple-design-language/references/exemplars.md -->

# Exemplars

Worked examples of tasteful HIG deviation — apps that earn a deliberate departure from the defaults and the transferable principle each one yields.

**Caution:** Apps evolve. Verify a cited behavior in the current version before relying on it. These illustrate the principle, which outlasts the specific implementation.

---

## Catalog

| App | HIG default it sets aside | Why it works (named user benefit) | Transferable principle |
|---|---|---|---|
| Things | Inset-grouped list with full-bleed separators and system row heights | Long task lists stay readable at a glance because the reduced visual weight lets hierarchy carry the eye, not chrome | Earn density with hierarchy and whitespace, not by cramming |
| Fantastical | Stock form entry for calendar events | Power users add events dozens of times a day; a bespoke interaction cuts that friction to a single gesture | Invest custom interaction in the one action users repeat most |
| Flighty | Conservative, near-neutral data presentation | Flight status is time-sensitive; color encodes meaning (on time, delayed, boarding) so users read state in a glance without parsing text | Deviate from neutral palettes only where color encodes meaning |
| Apple's own apps (Weather, Music) | Plain-form default and flat, neutral surfaces | Users orient to the content's context at a glance — current conditions, the album you're playing — instead of reading it out of plain rows | Apple itself treats HIG as a floor; match the ambition where content warrants |

---

## Expanded entries

### Things — density through hierarchy

Things, as of recent versions, renders task lists with quieter typography and tighter row spacing than the stock inset-grouped `List` default. The deviation does not feel cramped because the hierarchy does the structural work: project headings, task titles, and metadata carry clearly differentiated weights so the eye always knows where it is. Whitespace is reduced selectively, not uniformly — the breathing room moves to the boundaries between sections rather than between individual rows. The named user benefit is focus: a calm, dense list keeps the user in thinking mode rather than scrolling mode. This pattern transfers to any app where users manage long, frequently-revisited collections — earn the density first with a clear type hierarchy, then compress spacing at the row level.

### Fantastical — custom interaction for the core task

Fantastical's event-entry experience, as of recent versions, replaces the stock multi-field form with a single natural-language input surface for its most common operation. Instead of tapping through picker fields, the user types or dictates "Lunch with Alex Friday at noon" and the app parses intent. The named user benefit is speed: the single most-repeated task in a calendar app is adding an event, and every tap removed from that path compounds across hundreds of uses. The lesson is directional, not about copying the specific UI: identify the one action users perform most often and ask whether the default form pattern is actually the fastest path to that outcome. Custom interaction is expensive to build and expensive to maintain — it is only worth the investment at the highest-frequency touchpoint.

### Flighty — color that encodes, not decorates

Flighty uses bold, saturated color as a status system for flight data. As of recent versions, flight states — on time, delayed, boarding, landed — each carry a distinct color that appears consistently across list rows, detail headers, and widgets. This deviates from the conservative, near-neutral palette that most utility apps default to. The named user benefit is glanceability: a traveler checks flight status in motion, often briefly, and color lets them read state faster than parsing a label. The principle is a constraint, not a license: deviate from neutral palettes only where the color carries a specific, consistent, learnable meaning. Decorative color that does not encode a state (gradients for atmosphere, drop-glows for drama) is anti-slop tell #12 and earns nothing.

### Apple's own apps — treating HIG as a floor

Weather, Music, and similar Apple-built apps, as of recent versions, use edge-to-edge imagery, system materials with substantial depth, and layouts that would look excessive in a plain-form app. These choices are not accidental or Apple-privileged — they are the logical result of content that warrants emotional expression. Weather's full-screen gradients carry the ambient feel of current conditions; Music's artwork-driven layouts make the listening experience part of the visual identity. The named user benefit is informational and emotional density: the screen communicates more than data — it communicates context. The transferable principle is about ambition, not copying any specific layout: when your content has inherent visual or emotional character, a neutral, plain-form treatment wastes it. Build to the content's ceiling, not to the framework's default.

---

## Using these as models: run the four gates first

Each deviation above would still pass the hub's four deviation gates — Named benefit, Survives the slop check, Survives assistive tech, and Systematic — and that is why they hold up. Before imitating any exemplar, run your own proposed deviation through those same four gates. If a gate fails — if you cannot name the user benefit in one sentence, if it trips an anti-slop tell, if it breaks under VoiceOver or at the largest Dynamic Type sizes, or if it is a one-off rather than a rule applied consistently — use the HIG default instead. Exemplars are evidence that deviation can be earned, not a shortcut past earning it.

---

See the hub: ../SKILL.md

<!-- REFERENCE: apple-design-language/references/interaction-states.md -->

# Interaction States

Every interactive control ships with a complete set of states; every form is structured for keyboard navigation and inline feedback. Designing one state without the others is incomplete work.

---

## 1. The five-state discipline

Every interactive control must define five states: **default**, **pressed**, **focused**, **disabled**, and — on pointer platforms — **hover**. Hover and focus are the macOS and iPad-with-pointer deltas; never ship a Mac or iPad control with no hover feedback or no focus ring. The system provides defaults for standard controls, but any custom control requires explicit treatment for each.

Disabled is not the same as hidden. Hide a control only when it is irrelevant in the current context (for example, a send button when there is no selected recipient). Disable it — with a reason discoverable nearby — when it is temporarily unavailable. A disabled control must carry a discoverable reason; a silent disabled button is a slop tell (see section 8).

---

## 2. Forms — structure

Group related fields using `Form` and `Section`. One logical idea per section; keep sections short rather than stacking twelve fields in one block.

Use **persistent labels**, never placeholder-as-label (anti-slop tell #9: Placeholder-as-label — relying on `TextField` placeholder text instead of a persistent field label). When the placeholder is the only label, it disappears on first tap and the user loses context mid-entry. Put the label above or beside the field with a separate `Text`, or use a `LabeledContent` pattern.

Match the keyboard to the content: `.keyboardType(.emailAddress)` for email, `.keyboardType(.decimalPad)` for prices and measurements, `.keyboardType(.numberPad)` for whole-number quantities or PINs, `.textContentType(.username)` and `.textContentType(.password)` for credential fields so the system can offer autofill. Field order should follow logical reading sequence — name before email, street before city before zip.

---

## 3. Forms — validation timing

Validate on submit for required-field and format errors. The user should not see "Email is required" before they have had a chance to enter anything.

Validate inline only for rules the user can fix while typing — for example, password strength rules — and only after the field has lost focus at least once (first blur). Never fire inline validation on every keystroke from an empty field; that produces a cascade of red text the moment the form renders.

Show the error message adjacent to the field that triggered it, in sentence case, and say how to fix it: "Enter a valid email address, like name@example.com." not "Invalid input." For the full error-message structure (what happened + why + how to fix), see the "Error messages" section of `ux-writing.md`.

---

## 4. Required vs. optional

Mark the **minority**. If most fields are required, annotate only the optional ones ("Optional" in sentence case, as helper text or a label suffix). If most fields are optional, annotate only the required ones. Do not asterisk every field — it adds visual noise and trains users to ignore the markers.

When a field is contextually required (required only when another field has a value), reveal that dependency inline, adjacent to the field, when the condition becomes true.

---

## 5. Focus order

Define `@FocusState` explicitly for any form with more than one field on iOS. The Return key on the keyboard should advance to the next logical field, and submit the form from the last field. Do not leave `.submitLabel` at its default on every field — use `.submitLabel(.next)` on intermediate fields and `.submitLabel(.done)` or `.submitLabel(.send)` on the last.

On macOS and iPad with a connected keyboard, verify the tab order matches the visual and logical reading order. A tab sequence that jumps from the first field to the submit button, skipping the middle fields, is a bug, not a quirk.

---

## 6. Loading patterns

Choose the pattern by what you know about duration and layout:

- **Determinate progress** (`ProgressView(value:total:)`) — use when you know what fraction of the work is done. Downloads, uploads, multi-step processing with trackable stages.
- **Skeleton / redacted placeholder** (`.redacted(reason: .placeholder)`) — use when you know the layout of the content and the wait is likely longer than roughly 1 second. Feeds, list rows, profile screens. Avoids layout shift when real content arrives because the placeholders already occupy the correct space.
- **Spinner** (`ProgressView()`, indeterminate) — use only for short, unpredictable waits where you have no layout to skeleton. A spinner on a transient network call is fine; a spinner that owns the whole screen for an indeterminate period is not.

Anti-slop tell #10: never use an indeterminate spinner where a skeleton or determinate progress fits, and never ship a loading surface with no empty and no error variant designed. Every loading surface needs all three reachable states: loading, loaded (or empty), and error. Design them together.

Avoid layout shift when content arrives. If content will push other elements around on load, use a placeholder that reserves the space.

---

## 7. Destructive actions

Confirm destructive actions with an `.alert` using a button in the `.destructive` role, labeled with the real action verb. "Delete" not "OK". "Remove Account" not "Yes". The user must be able to read the confirmation button and know exactly what will happen.

Where feasible, prefer an **undo affordance** over a confirmation-only prompt: it is less friction for users who intended the action and a safety net for those who did not. Archive with an undo banner (a non-destructive, non-blocking surface) beats a modal confirm-then-no-recovery pattern.

Never use a non-modal banner or overlay for destructive confirmation (anti-slop tell #11: a non-modal banner or overlay where an `.alert` is required for data loss or destructive confirmation). Banners can be dismissed accidentally, partially obscured, or missed. Destructive confirmation requires a blocking decision surface.

---

## 8. Disabled affordances

A disabled primary button must let the user discover why it is disabled. Silent dead buttons — a `.disabled(true)` primary CTA with no explanation — are a slop tell.

Acceptable patterns: helper text beneath the button naming the missing condition ("Add at least one item to continue"), or a tappable-but-explaining variant that enables on tap and shows an inline explanation of what is needed. Never ship a form where the submit button is grey and the user has no signal about what is blocking them.

---

See the hub: ../SKILL.md

<!-- REFERENCE: apple-design-language/references/ux-writing.md -->

# UX Writing

Apple-native copy guidance: capitalization, button labels, error messages, alerts, notifications, and empty states — covering iOS, iPadOS, and macOS.

---

## 1. Voice and tone

Apple's voice is **clear, direct, and human** — never snarky, never cute for cute's sake, never corporate. Functional copy (buttons, labels, errors, alerts) is invisible when it works: it gets out of the way and lets the user act.

Rules:
- **Second person** ("you", "your") throughout. Never "the user."
- **Active voice** and **present tense** by default. "Couldn't save the note" — not "The note could not be saved."
- **No marketing fluff in functional copy.** "Experience seamless productivity" belongs on a landing page, not inside the app. Onboarding body text is not an ad.
- **Plain language.** Write at the reading level of a confident adult who isn't a developer.
- **Contractions are fine** ("You're offline" reads faster than "You are offline").
- **Empathy without apology.** "Couldn't connect" is empathetic. "We're so sorry, something went wrong!" is noise.

---

## 2. Capitalization

This is anti-slop tell #14. Getting it wrong is one of the most visible markers of AI-generated copy.

**The rule:**

| Surface | Case |
|---|---|
| Navigation bar titles | Title Case |
| Buttons and action labels | Title Case |
| Alert titles | Title Case |
| Menu items (iOS and macOS) | Title Case |
| Labels, body text, alert messages | Sentence case |
| Hints and helper text | Sentence case |
| Footnotes and captions | Sentence case |
| Placeholders | Sentence case |

**macOS nuance:** macOS menu bar items and contextual menu items use Title Case. Menu items that open further UI append an ellipsis ("…") — not three periods — after the label.

**Good/bad pair:**

Button (Title Case): "Move to Trash" — correct.
Explanatory label below it (sentence case): "This moves the file to the trash and it can be recovered later." — correct.

Button: "Move To Trash" — wrong. "To" is a preposition, not capitalized in Title Case unless it's a verb.
Label: "This Moves The File To The Trash." — wrong. Labels are sentence case.

Correct Title Case: capitalize the first word, last word, all nouns, pronouns, verbs, adjectives, and adverbs. Do not capitalize articles (a, an, the), coordinating conjunctions (and, but, or), or short prepositions (to, for, in, on, at, with) unless they open the title. Pronouns are capitalized, so "Got It" is correct.

---

## 3. Buttons and labels

**The verb names the outcome, not the mechanism.**

The user cares what happens, not how the system achieves it.

- Prefer "Save" over "Submit" — "submit" is a form mechanic, not a user goal.
- Prefer "Delete" over "Remove" when data is permanently gone.
- Prefer "Send" over "Upload" in social or messaging contexts.
- Prefer "Sign In" over "Login" — two words, Title Case.

**OK is the default of last resort.** Use a specific verb whenever one fits. "Got It" is acceptable for dismissing informational alerts where no action is being taken. Never label a destructive confirmation button "OK" — the real verb (Delete, Remove, Discard) must appear.

**One primary call-to-action per screen.** If two equal-weight buttons appear, one is probably wrong. The primary verb drives the screen's purpose; the secondary is Cancel (discards) or Done (keeps changes already applied) — these are not interchangeable.

| Do | Do not |
|---|---|
| Save | Submit |
| Delete | OK (on a destructive action) |
| Send | Upload (messaging context) |
| Sign In | Login |
| Add to Library | Confirm |
| Discard Changes | Yes (on a yes/no alert) |

---

## 4. Error messages

**Three-part structure: what happened + why (plainly) + how to fix.**

Every error message answers three questions for the user:
1. What happened?
2. Why did it happen (in plain terms, no blame)?
3. What can they do about it?

If the user cannot fix it, say so plainly and tell them what you'll do (retry, sync later).

No error codes. No stack-trace fragments. No developer jargon. No blame ("you entered an invalid value").

**Good example:**
"Couldn't save the note. You're offline — it'll sync when you reconnect."

- What happened: couldn't save.
- Why: offline.
- What to do: nothing — it auto-syncs.

**Bad example:**
"Error -1009"

No context, no cause, no path forward. Users cannot act on this.

**Another bad example:**
"An unexpected error occurred. Please try again later."

Technically grammatical, practically useless. Gives no signal about cause or recoverability.

**Additional rules:**
- Do not start an error with "Error:" — the context makes it obvious.
- Do not end with "Contact support" unless that is actually the only path forward.
- Do not use passive voice: "The file could not be uploaded" — rewrite to "Couldn't upload the file."
- This section ties directly to `empty-error-states.md` for the full decision tree on which surface to use.

---

## 5. Alerts

Alerts are reserved for situations requiring an explicit decision — especially destructive actions or data loss. Do not use them for non-blocking information (use banners or inline states instead).

**Structure:**
- **Title** — Title Case noun phrase or question. Short (five words or fewer when possible). "Delete This Recording?" not "Are you sure you want to delete this recording?"
- **Message** — Sentence case explanation. Gives context the title can't fit. "Deleted recordings can't be recovered."
- **Buttons** — Verbs. Destructive button uses the real verb and the `.destructive` role (red). Cancel is always available on a destructive alert.

**Good example:**
Title: "Delete Recording"
Message: "This recording will be permanently deleted."
Buttons: "Delete" (destructive) / "Cancel"

**Bad example:**
Title: "Warning"
Message: "Are you sure?"
Buttons: "OK" / "Cancel"

"OK" on a destructive alert is a guardrail failure — the user can't tell from the button label what they're confirming.

---

## 6. Notifications and permission prompts

**Pre-permission priming:** The system permission alert is a one-shot prompt — if the user denies it, recovery requires Settings. Show a custom screen or sheet first that explains the benefit before triggering the system prompt. This is called pre-permission priming.

**The Info.plist usage string (NSPhotoLibraryUsageDescription, etc.):**
- Sentence case.
- Benefit-led: what does the user gain?
- Specific: what will you actually use the permission for?
- No passive voice.

Good: "Lets you attach photos to entries."
Bad: "This app needs photo access."
Bad: "Required for app functionality."

The system shows the usage string verbatim in the alert. The user reads it while deciding to allow or deny — make it earn trust.

**Notifications:**
- Lead with user benefit, not app ego. "Your transfer is complete" beats "Financy has finished processing your transfer."
- Keep the body to one sentence.
- Do not re-state the app name — the system already shows it.

---

## 7. Empty-state copy

Empty states are not missing UI — they are a designed state. Three things to communicate:

1. **Cause** — why is it empty? (No items added yet, no results matched the filter, connection failed.)
2. **Next action** — what can the user do? (Add an item, clear the filter, retry.)
3. **Tone** — encouraging for no-content-yet; neutral and direct for error-driven empty.

Never ship "No items" as a final empty state. It names a fact; it does not help the user.

**Good example:**
Title: "No Entries Yet"
Body: "Start by adding your first entry."
Button: "Add Entry"

**Bad example:**
"No items"

A bare fact with no cause and no path forward. This is anti-slop tell #13 in the hub.

**Filter-driven empty state:**
Title: "No Results"
Body: "Try adjusting your filters or search terms."

Full decision tree for choosing between inline empty states, error states, and alerts: see `empty-error-states.md`.

---

## 8. macOS deltas

Mac copy differs from iOS in a few specific ways:

**Capitalization:** macOS menu bar menus (File, Edit, View) and all contextual menu items use Title Case. "Move to Trash", "Show in Finder", "Open With" — all Title Case. This matches the hub's capitalization table, which lists menu items under Title Case.

**Ellipsis in menus:** Append an ellipsis ("…") — the single Unicode character U+2026, not three periods — to any menu item that opens a dialog or sheet before the action completes. "Export…" opens a save panel. "Delete" completes immediately, no ellipsis.

**Pointer and keyboard copy:** On macOS you can say "Click", "Right-click", "Control-click", "Drag", and "Press Command-S" (or "⌘S"). On iOS say "Tap", "Long press", "Swipe", and spell out key combos only where an external keyboard applies (iPadOS multitasking, keyboard shortcuts sheet). Do not use "Click" in iOS copy.

**Window-level context:** macOS copy can reference windows by title. iOS copy avoids "screen" where possible — "in the app" is often clearer.

**Otherwise:** the voice, tone, error-message structure, button verb rules, and capitalization sentence-case rules are identical across platforms.

---

See the hub: ../SKILL.md

<!-- END SKILL: apple-design-language -->

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
| `apple-design-language` | Copy, interaction/empty/error states, HIG-deviation taste | Reference only | Writing UX copy, designing states, deciding when to break HIG |
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

The Keynote panel additionally grades the project's **keynote run sheet** — the
committed `docs/keynote/run-sheet.md` artifact whose standard lives in
`references/keynote-run-sheet.md`. A review verifies that a WWDC-worthy run sheet
*exists and is current*; it never assesses whether the team has *rehearsed*
(unknowable from the repo, external to the product). An absent or stale run sheet
is a `K-` finding, and the panel's generated demo script is written in run-sheet
shape so it can seed or refresh the artifact.

The Compliance panel has the same shape. It grades the project's **submission
package** — the committed `docs/app-store/review-notes.md` artifact whose standard
lives in `references/app-review-submission-package.md`. And it never predicts the
**approval verdict**, which is unknowable from the repo (it turns on a human
reviewer, the running binary, server content, and ASC-side metadata). The
Compliance `/10` and Risk Level reflect only the **rejection-risk surface
detectable in the repo** plus the state of that artifact: a `LOW` band means "no
rejection risk I can see," never "Apple will approve." An absent or stale
submission package is a `C-` finding. Both panels grade a *checkable artifact*,
not an *off-stage outcome* — that is the rule the two share.

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
[Reflects rejection-risk surface detectable in the repo, NOT a prediction that
Apple will approve. See the Compliance panel's out-of-static-scope note.]

### Keynote Run Sheet: [PRESENT & CURRENT / THIN-or-STALE / ABSENT]

### Submission Package: [PRESENT & CURRENT / THIN-or-STALE / ABSENT]

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

- **Submit now**: Overall ≥ 8.5/10 AND zero P0 findings AND Compliance Risk Level ∈ {LOW, MEDIUM}. This clears the *detectable* rejection-risk surface — it is not a prediction that Apple will approve (see the Compliance out-of-static-scope note).
- **Iterate**: Overall < 8.5 OR any P0 OR Compliance Risk ∈ {HIGH, REJECTION LIKELY}. Run the action plan and re-review once P0/P1 are closed.
- **Submission-ready package** (smooths the review hand-off): a **PRESENT & CURRENT** submission package (`docs/app-store/review-notes.md`) — demo access, how to reach every reviewable feature, account/data deletion, export compliance. Not a gate on "Submit now," but an absent one is a `C-` finding and a common cause of avoidable round-trips.
- **Keynote / Apple Design Award readiness** (beyond submission): also requires a **PRESENT & CURRENT** keynote run sheet (`docs/keynote/run-sheet.md`). Submission does not require it; a stage demo does.

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

<!-- REFERENCE: apple-review/references/app-review-submission-package.md -->

# App Review Submission Package — Standard & Template

The compliance twin of the keynote run sheet. Every project headed for the App
Store maintains a committed **submission package**: the artifact you hand App
Review so a human reviewer can understand, reach, and clear the app without
guessing. It is the part of compliance that is *in your control and checkable in
the repo* — as opposed to the part that is not.

**The review checks the artifact, not the outcome.** Whether Apple *approves* is
unknowable from the repo: it depends on a human reviewer on a given day, the
running binary's behaviour on their device, server-side content, the accuracy of
ASC metadata and screenshots, and guidelines that shift. A repo-static review
can only verify **detectable rejection-risk surface** and whether the submission
package **exists, is complete, and is current**. A `LOW` risk band means *"no
rejection risk I can see in the repo"* — never *"Apple will approve this."*

**Location (convention):** `docs/app-store/review-notes.md` (or
`docs/app-store/<app>-review-notes.md` in a monorepo).

**Currency:** the package names the build/version it was last validated against.
One older than the current marketing version is **stale**, not **present**.

---

## Required sections

### 1. What the app is — in 20 seconds
One honest paragraph a reviewer can read at a glance: what it does, who it's for,
the one thing to try. Plain language, no marketing.

### 2. Demo access
- Credentials for any required account, **or** an explicit "no account — uses
  iCloud / Sign in with Apple, nothing to log into."
- If features sit behind purchase, a reviewer-comp path or a note that StoreKit
  sandbox covers them.

### 3. How to reach every reviewable feature
The reviewer must be able to exercise everything that could be flagged —
especially anything behind a **purchase, permission prompt, device pairing, or
first-run-only** moment. Spell out the taps. (E.g. "to see the Live Activity:
start a session, lock the device"; "to test sharing with one device: invite,
then accept from Settings → …".)

### 4. Account & data deletion (Guideline 5.1.1(v))
- If the app supports account *creation*: the exact in-app path to delete the
  account and its data.
- If it does not (iCloud-only, no app-managed account): a one-line statement of
  *why it's exempt*. Reviewers reject on this constantly; pre-empt it.

### 5. Privacy posture
- Where the privacy policy lives — **in-app** (required) and the URL.
- What data leaves the device and to whom (often: nothing / no third parties).
- How the App Privacy "nutrition label" maps to actual behaviour, and how
  `PrivacyInfo.xcprivacy` backs it.

### 6. Export compliance
The `ITSAppUsesNonExemptEncryption` answer and its one-line rationale (standard
HTTPS/OS crypto is exempt; declare it so the build isn't held).

### 7. Sensitive-content rationale (when applicable)
For apps near **health, crisis, finance, or user-generated content**: state
plainly what the app *is* and *is not* — e.g. "a personal journal and companion,
**not** a medical device; makes no diagnostic or treatment claims" — and how any
safety/moderation surface is handled. This is what turns a 2-week 1.4.x / 5.x
rejection round-trip into a clean pass.

### 8. Provenance
- **Last validated against:** build NNN (version X.Y.Z), date.
- **Seeded from review:** `docs/reviews/YYYY-MM-DD-…md`.

---

## Quality bar (how the Compliance panel grades it)

| State | Meaning | Review action |
|-------|---------|---------------|
| **ABSENT** | No submission package in the repo | Compliance finding — P2 by default, **P1 if submission is imminent**. Seed one from this template. |
| **THIN / STALE** | Missing required sections (no deletion statement, no demo access, no sensitive-content rationale where needed), or older than the current version | Quality finding naming the specific gaps. |
| **PRESENT & CURRENT** | All applicable sections present and validated against the current build | No artifact finding. |

---

## Out of static scope (name these so a clean risk band isn't misread)

A repo-static compliance review **cannot** verify, and must not imply, the
following — list them explicitly in the report so `LOW` risk is not read as
"done":

- The running binary's behaviour on the reviewer's device (crashes, hangs).
- Server-side content, moderation, or anything fetched at runtime.
- ASC-side metadata: screenshot accuracy, description claims, age rating, price.
- The reviewer's subjective judgement (4.0 design, 4.2 minimum functionality).
- The approval itself. No static review predicts it; it de-risks it.

<!-- REFERENCE: apple-review/references/keynote-run-sheet.md -->

# Keynote Run Sheet — Standard & Template

Every Apple-grade project maintains a **keynote run sheet**: a committed, living
document anyone on the team could pick up and rehearse from cold. It is the
difference between *"we think this demos well"* (a guess) and *"here is the exact
90 seconds, the state it runs from, and what we do if a beat misfires"* (a plan).

**The review checks the artifact, not the rehearsal.** Whether the team has
*practiced* is unknowable from the repo and external to the product — a review
can never assert it. What a review *can* assert is whether this run sheet
**exists, is current, and is WWDC-worthy**. Rehearsal is what you do *against*
the run sheet; the run sheet is the thing the review actually grades.

**Location (convention):** `docs/keynote/run-sheet.md`. In a monorepo with
multiple apps, one per app: `docs/keynote/<app>-run-sheet.md`.

**Currency:** a run sheet names the build/version it was last validated against.
One older than the current marketing version is **stale**, not **present**.

---

## Required sections

### 1. The One-Sentence Story
The spine — the single sentence said on stage that makes the audience lean
forward. If it needs two sentences, the story isn't found yet. (Mirrors review
criterion §4.1.)

### 2. Cold Open — the first 10 seconds
What is on screen the instant the demo begins, before a word is spoken. The
strongest opens show the *payoff state*, never a launch screen or an empty list.

### 3. The Beat Sheet
The ~90-second spine as a table. Each beat is one row:

| # | Beat | On screen | Spoken line | Duration | Demo-safe? |
|---|------|-----------|-------------|----------|:---------:|
| 1 | Cold open | … | … | 0:10 | ✓ |
| 2 | The problem | … | … | 0:15 | ✓ |
| … | … | … | … | … | … |

Durations must sum to the target (≈90s). **Demo-safe?** flags any beat carrying a
network call, a loading state, a permission prompt, or a first-run-only moment —
the things that embarrass on stage.

### 4. Demo-Safe State Setup
The exact starting state, reproducible by someone who has never run the demo:
- Device & OS, orientation, appearance (light/dark).
- The build (scheme/config) and the signed-in account.
- Seeded data — which fixtures, which Scene, which contacts. Never live, never empty.
- Network posture — airplane mode, a known-good network, or a recorded fixture.
- Notifications silenced, **Low Power off**, brightness up, auto-lock off.
- Anything pre-warmed: first sync done, caches primed, permissions pre-granted.

### 5. The "One More Thing"
The beat that earns the gasp — the moment the technology disappears and only the
human benefit remains (a Live Activity that tells a story on the lock screen, a
Watch hand-off, an intelligence that suggests the next move). If there isn't one
yet, this section names the *candidate* and its status.

### 6. Failure & Recovery
The section that separates a run sheet from a script. For each beat that *could*
misfire live: the symptom, the recovery move, and the fallback (a screenshot, a
recorded clip, a clean skip). **A beat with no recovery has no business in a live
demo** — either make it demo-safe or cut it.

### 7. Projection-Scale Check
Demos are seen from the back of a hall: largest readable text, contrast verified
on the *actual* Scene/asset at worst case, pointer/touch indicators visible, no
UI that only reads at arm's length.

### 8. Reset Procedure
How to return to the exact demo-start state between run-throughs, in under a
minute. A demo you can't cleanly reset is a demo you can only run once.

### 9. Provenance
- **Last validated against:** build NNN (version X.Y.Z), date.
- **Seeded from review:** `docs/reviews/YYYY-MM-DD-…md`.

---

## Quality bar (how the Keynote panel grades it)

| State | Meaning | Review action |
|-------|---------|---------------|
| **ABSENT** | No run sheet artifact in the repo | Keynote finding — P2 by default, **P1 if a keynote / Apple Design Award slot is imminent**. Seed one from the demo script the panel just produced. |
| **THIN / STALE** | Exists but missing required sections, durations don't sum, no failure/recovery plan, or older than the current version | Quality finding naming the specific gaps. |
| **PRESENT & CURRENT** | All sections present, beats timed, recovery planned, validated against the current build | No artifact finding — grade its *craft* (story clarity, one-more-thing strength) as normal. |

A run sheet is never "done" when first written. It is re-validated every time the
demo flow changes — that is what keeps it a plan and not a relic.

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
5. MUST CHECK: the submission package artifact — `docs/app-store/review-notes.md`
   (or `docs/app-store/<app>-review-notes.md`). Its presence, completeness, and
   currency are graded in §3.8. If absent, that is itself a finding — do not skip it.
6. SKIP: ViewModels, DesignSystem, Extensions, Tests, Utilities

You should read ~10-12 files maximum. This is a compliance check, not a code review.

## What this review can and cannot assert
Whether Apple **approves** is unknowable from the repo — it depends on a human
reviewer on a given day, the running binary's behaviour on their device,
server-side content, the accuracy of ASC metadata and screenshots, and
guidelines that shift. This review verifies only **detectable rejection-risk
surface** and whether the submission package exists and is current. A `LOW` risk
band means *"no rejection risk I can see in the repo,"* never *"Apple will approve
this."* List what is out of static scope (see the closing note) so a clean band
is not misread as an approval prediction.

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

### 3.7 In-App Purchase (if applicable)
- Restore purchases implemented?
- Subscription management accessible?
- Clear pricing display before purchase?

### 3.8 Submission Package (artifact, not outcome)
A submission-ready project maintains a committed **submission package** — the
standard is in `app-review-submission-package.md`. This is the part of compliance
that is *in your control and checkable in the repo*: the notes you hand App Review
so a human can understand, reach, and clear the app without guessing. Do NOT grade
whether Apple will approve (unknowable, external); grade whether the artifact a
reviewer would read exists and is complete.

- Does `docs/app-store/review-notes.md` (or `docs/app-store/<app>-review-notes.md`)
  exist?
- If present: does it carry all applicable sections (what the app is in 20s; demo
  access; how to reach every reviewable feature; account & data deletion
  5.1.1(v); privacy posture; export compliance; sensitive-content rationale where
  health/crisis/finance/UGC applies; provenance)?
- Is it **current** — validated against the current marketing version, not a stale
  build?
- Grade it: **ABSENT** / **THIN-or-STALE** / **PRESENT & CURRENT** (see the quality
  bar in `app-review-submission-package.md`). ABSENT or THIN is a `C-` finding.

### Mechanical Audits (run these grep checks)
- `grep -rn "fatalError\|preconditionFailure" --include="*.swift"` — production crashes
- `grep -rn "TODO\|FIXME\|HACK\|XXX" --include="*.swift"` — unfinished work markers
- `grep -rn "placeholder\|lorem\|test.*data\|sample.*text" --include="*.swift" -i` in views
- Verify NSCameraUsageDescription, NSMicrophoneUsageDescription,
  NSSpeechRecognitionUsageDescription, NSLocalNetworkUsageDescription,
  NSBluetoothAlwaysUsageDescription exist in Info.plist for each API used
- Check for privacy policy URL in code (grep for "privacy")
- `grep -rn "IntentDescription.*Apple\|IntentDescription.*iPhone\|IntentDescription.*iPad" --include="*.swift"` — App Intent trademark violations (error 90626)
- Submission package presence: `ls docs/app-store/ 2>/dev/null` and
  `find docs -iname '*review-notes*' -o -iname '*submission*'`. Zero matches →
  grade §3.8 ABSENT and raise a `C-` finding.

## Findings Target
Quality gate: produce findings within the upper bounds shown in the output
format below (e.g. "0–3 Rejection Risks"). Do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Compliance Review: [App Name]

### Submission Readiness
[2-3 sentences on the rejection-risk surface detectable in the repo — NOT a
verdict on whether Apple will approve. Frame it as "no/some/serious rejection
risk I can see," and name anything material that is out of static scope.]

### Risk Level: [LOW / MEDIUM / HIGH / REJECTION LIKELY]
[This band reflects detectable rejection risk only. LOW = "no rejection risk I
can see in the repo," never "approved." See the out-of-scope note at the end.]

### Submission Package Status: [PRESENT & CURRENT / THIN-or-STALE / ABSENT]
[If THIN-or-STALE, name the missing/outdated sections. If ABSENT, note that one
should be seeded at `docs/app-store/review-notes.md` from the
`app-review-submission-package.md` template.]

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
- [ ] Submission package present & current (`docs/app-store/review-notes.md`)

### Out of Static Scope (state these so a clean band isn't misread)
A repo-static compliance review cannot verify, and this report does not imply:
- The running binary's behaviour on the reviewer's device (crashes, hangs).
- Server-side content, moderation, or anything fetched at runtime.
- ASC-side metadata: screenshot accuracy, description claims, age rating, price.
- The reviewer's subjective judgement (4.0 design, 4.2 minimum functionality).
- The approval itself. This review de-risks the submission; it does not predict it.

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
- Copy, empty/error states, interaction states, and HIG-deviation judgment: evaluate against `apple-design-language` and call out any anti-slop tells by number (the hub lists them 1-14).

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
4. MUST CHECK: the keynote run sheet artifact — `docs/keynote/run-sheet.md` (or
   `docs/keynote/<app>-run-sheet.md`). Its presence, completeness, and currency
   are graded in §4.7. If absent, that is itself a finding — do not skip it.
5. SHOULD READ: Key components that appear during the demo flow
6. SKIP: Services, Models, Tests, Extensions, Utilities, migration files

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

### 4.7 The Run Sheet (artifact, not vibe)
A keynote-ready project maintains a committed **run sheet** — the standard is in
`keynote-run-sheet.md`. This is the one part of keynote readiness a review can
verify, because it is an artifact in the repo, not an act performed off-stage.
Do NOT grade whether the team has rehearsed (unknowable, external); grade whether
the thing they would rehearse from exists and is WWDC-worthy.

- Does `docs/keynote/run-sheet.md` (or `docs/keynote/<app>-run-sheet.md`) exist?
- If present: does it carry all nine required sections (story, cold open, beat
  sheet with summed timings, demo-safe state setup, "one more thing", failure &
  recovery, projection-scale check, reset procedure, provenance)?
- Is it **current** — validated against the current marketing version, not a
  stale build?
- Grade it: **ABSENT** / **THIN-or-STALE** / **PRESENT & CURRENT** (see the quality
  bar in `keynote-run-sheet.md`). ABSENT or THIN is a `K-` finding.
- When you write the 90-Second Demo Script below, write it in the run sheet's
  shape so it can **seed or update** `docs/keynote/run-sheet.md` — the script is
  a deliverable that lands in the repo, not a paragraph that dies in this report.

### Mechanical Audits (grep checks)
- Grep for developer-facing language in views: "JSON", "API", "debug", "nil",
  "config", "TODO", "test" (case insensitive, in user-visible strings)
- Check if onboarding uses placeholder art (SF Symbols as illustrations)
- Check for empty states that would appear during a demo
- Run sheet presence: `ls docs/keynote/ 2>/dev/null` and
  `find docs -iname '*run-sheet*' -o -iname '*runsheet*'`. Zero matches → grade
  §4.7 ABSENT and raise a `K-` finding.

## Findings Target
Quality gate: produce 0–5 findings per bucket — do NOT invent findings to hit a
quota. If a bucket is empty, write "None observed at this depth of review."

## OUTPUT FORMAT (MANDATORY — your response MUST end with this)

## Keynote Review: [App Name]

### The Story
[Write the one-sentence pitch as Steve would say it on stage]

### Demo Readiness: [READY / ALMOST / NOT READY]

### Run Sheet Status: [PRESENT & CURRENT / THIN-or-STALE / ABSENT]
[If THIN-or-STALE, name the missing/outdated sections. If ABSENT, note that the
script below should be committed to `docs/keynote/run-sheet.md` to start one.]

### The 90-Second Demo Script
[Write this in the run sheet's beat-sheet shape (see `keynote-run-sheet.md`) so it
can be committed as, or merged into, `docs/keynote/run-sheet.md` — not left to
die in this report.]
1. [Cold open — what the audience sees first, before a word]
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

<!-- BEGIN SKILL: apple-router -->

# apple-router

# Apple Router

**Turn a fuzzy goal into the right skill, in the right order.** When a request is broad ("grow my app", "get ready to launch", "why is revenue flat"), don't guess — map the goal to the lifecycle stage, hand off to the specific skill(s), and sequence them. This skill *routes*; the named skills do the work.

> If the request already names a clear task (e.g. "audit my keywords", "fix this rejection"), skip the router and go straight to that skill. Use this only to disambiguate.

---

## How to route

1. **Classify the intent** into a stage (table below).
2. **If foundational context is missing**, run the foundation skill first: `app-marketing-context` for any growth/marketing work, `product-spec` for a feature.
3. **Dispatch** to the matched skill(s).
4. **If the goal spans stages**, run them in the order given and tell the user the sequence up front.

---

## Intent → skill map

### Discovery & growth ("more installs", "rank higher", "grow")

| The user wants… | Route to |
|-----------------|----------|
| Set up reusable marketing context first | `app-marketing-context` (do this before the rest) |
| Rank for more / better keywords, audit the listing | `asc-aso` |
| Run paid acquisition on the App Store | `apple-search-ads` |
| Plan a launch or major-version release | `app-launch` |
| Get featured by Apple editors | `app-store-featured` |
| Brand, icon, screenshots, marketing assets | `app-brand-identity` → `app-icon-composer` |

### Conversion & money ("more revenue", "improve the paywall")

| The user wants… | Route to |
|-----------------|----------|
| Design / fix the paywall | `paywall-design` |
| Set or restructure pricing | `app-store-pricing` |
| Implement purchases in code | `storekit-purchases` |
| Manage the subscriber journey (trials, churn, win-back) | `subscription-lifecycle` |

### Activation & retention ("users drop off", "keep users")

| The user wants… | Route to |
|-----------------|----------|
| Fix the first-run / onboarding flow | `onboarding-optimization` |
| Improve D1/D7/D30 retention | `retention-optimization` |
| Decide what to measure | `app-analytics` |
| Get more / better ratings | `rating-prompt-strategy` |
| Respond to and learn from reviews | `review-management` |
| Re-engage with notifications | `push-notifications` |

### Ship & compliance ("get ready to submit", "rejected")

| The user wants… | Route to |
|-----------------|----------|
| Check CI build / signing | `asc-build-check` |
| Risk-audit before submitting | `submission-preflight` |
| Privacy manifest / required-reason APIs | `privacy-manifest` |
| Actually submit / TestFlight | `asc-submission` |
| Recover from a rejection | `app-rejection-recovery` |
| Monitor post-release crashes / phased release | `asc-build-check` |

### Build & craft ("write the feature", "review my code")

Engineering and design requests route to the existing skills — e.g. `apple-design`, `ios-accessibility`, `swift6-concurrency`, `performance-instruments`, `apple-review`, `complete-feature`. These are usually named directly; the router only needs to catch the growth/ship side above.

---

## Common multi-skill sequences

When a goal spans stages, run in this order and say so up front:

- **"Help me grow my app"** → `app-marketing-context` → `asc-aso` → (`apple-search-ads` if budget) → `rating-prompt-strategy` + `review-management`.
- **"Get ready to launch"** → `app-marketing-context` → `app-brand-identity`/`app-icon-composer` → `asc-aso` → `submission-preflight` → `asc-submission` → `app-launch` → `app-store-featured`.
- **"Revenue is flat"** → `app-analytics` (find the leak) → `paywall-design` or `subscription-lifecycle` or `app-store-pricing` (fix the identified stage).
- **"Users churn"** → `app-analytics` → `onboarding-optimization` (if early drop) or `retention-optimization` (if later) → `push-notifications`.
- **"I got rejected"** → `app-rejection-recovery` → fix → `submission-preflight` → `asc-submission`.

---

## Disambiguation rules

- **`product-spec` vs `app-marketing-context`** — product requirements vs. go-to-market positioning. A feature request → `product-spec`; a growth request → `app-marketing-context`.
- **`asc-aso` vs `apple-search-ads`** — organic discoverability vs. paid placement. They share keyword research; do ASO first.
- **`paywall-design` vs `app-store-pricing` vs `storekit-purchases`** — the screen vs. the economics vs. the code.
- **`onboarding-optimization` vs `retention-optimization`** — Day-0 activation vs. Day-7+ return.
- **`submission-preflight` vs `asc-submission`** — will-it-pass-review audit vs. the actual submission mechanics. Preflight first.
- **`app-icon-composer` vs `app-brand-identity`** — producing the layered icon files vs. deciding the brand/concept. Concept first.

When two skills genuinely both apply, run the upstream one first and name the sequence rather than picking one silently.

<!-- END SKILL: apple-router -->

---

<!-- BEGIN SKILL: apple-search-ads -->

# apple-search-ads

# Apple Search Ads

**Run the highest-intent paid acquisition channel available to iOS apps — directly inside the App Store, where users are already searching to download.**

Apple Search Ads is structurally unlike every other UA channel. Users are not scrolling social feeds or watching videos; they are standing in the App Store with fingers ready to tap Install. That intent advantage means ASA delivers installs that behave more like organic users than paid users on any other network.

---

## Why ASA Is Different

| Property | ASA | Every other paid channel |
|----------|-----|--------------------------|
| User intent | Actively searching to download | Interrupted from another activity |
| Targeting axis | Keyword only | Audience (demo, interest, behavioral) |
| ATT / SKAN gap | None — Apple owns the conversion signal | Significant signal loss post-iOS 14 |
| Ad appearance | Indistinguishable from organic results | Clearly an ad unit |
| Conversion data | First-party, deterministic | Modeled or probabilistic |

The no-ATT gap is the most underrated advantage. Every CPI, CVR, and ROAS figure you read out of ASA is real — not a model estimate. That makes optimization decisions reliable in a way that Meta/Google campaigns rarely are post-iOS 14.

---

## Campaign Placements

| Placement | Where it appears | Best use |
|-----------|-----------------|----------|
| **Search Results** | Immediately below the first organic result when a user searches | Primary driver — highest intent, most controllable |
| **Search Tab** | Top of the Search tab before any query is typed | Broad awareness; reach users before they form intent |
| **Today Tab** | App Store home page | Brand moments, major launches |
| **Product Pages** | Below the listing of a competitor or related app | Competitive conquesting |

Start with Search Results only. It is the most measurable and most efficient placement at every stage of scale. Layer in other placements only after Search Results is profitable and stable.

---

## Account Structure

One app per ASC app record; one ASA account per app. Build four campaigns from day one — they serve different intents and must not share budgets.

```
Account
└── App
    ├── Campaign: Brand         (protect branded searches)
    │   └── Ad Group: exact brand terms
    ├── Campaign: Competitor    (conquesting)
    │   └── Ad Group: exact competitor names
    ├── Campaign: Category      (generic intent)
    │   └── Ad Group: broad + exact category terms
    └── Campaign: Discovery     (find new terms)
        └── Ad Group: Search Match ON, no explicit keywords
```

### Why Four Separate Campaigns

- **Budget isolation** — Brand spend cannot be cannibalized by generic discovery.
- **Separate bid floors** — Brand keywords should almost always win; competitor and category keywords warrant lower, more measured bids.
- **Clean attribution** — Performance is readable by intent type. Blending campaign types hides which keyword class is actually driving installs.
- **Surgical pausing** — You can pause Discovery without touching Brand during a budget crunch.

---

## Match Types

| Match type | Trigger logic | Where to use |
|------------|--------------|--------------|
| **Exact** | Only the keyword as typed (or very close) | Proven high-value terms; Brand campaign |
| **Broad** | Variations, plurals, related phrases | Category campaign initial seeding |
| **Search Match** | Apple automatically maps your app to relevant queries | Discovery campaign only — leave keyword list empty |

### Discovery-to-Exact Workflow

1. Run Discovery campaign with Search Match ON and no keywords.
2. Pull the Search Terms report weekly.
3. Identify terms with TTR above 5% and CVR above 30%.
4. Graduate those terms to your Category campaign as exact-match keywords with raised bids.
5. Add poor performers (high taps, zero installs) as negatives immediately.

This pipeline continuously finds keywords you would never have thought to bid on manually.

---

## Keyword Seeding

### Brand Campaign
- Your exact app name
- Common misspellings of the app name
- Your developer/studio name
- Any well-known sub-brand or feature name

### Competitor Campaign
- Top 5–10 direct competitor app names (exact match)
- Note: competitor CVR is structurally lower — users searching a competitor brand are often loyalists. Bid conservatively and track CVR carefully before scaling.

### Category Campaign
Seed with high-volume generic terms relevant to your category, then expand:

- High-volume head terms: "meditation app", "habit tracker", "budget planner"
- Long-tail modifiers: "meditation for sleep", "daily habit tracker free", "budget planner couples"

For keyword volume and difficulty research, use the `asc-aso` skill (keyword strategy) or run a WebSearch for category benchmarks. Do not rely on guesswork for head-term volume — the investment in validation pays off immediately.

### Negative Keywords

Add negatives at the account level so they propagate across all campaigns:
- Competitor names you are not actively targeting in your Competitor campaign (avoids accidental wins with poor CVR)
- Irrelevant terms surfacing in Search Match (review weekly)
- Any term accumulating 100+ taps with zero installs

---

## Bidding

### Starting Bids by Campaign

| Campaign | Starting bid range | Rationale |
|----------|--------------------|-----------|
| Brand | $2–5 CPT | You must win your own brand terms — underbidding here is a strategic error |
| Competitor | $1–2 CPT | Lower CVR expected; keep CPI math positive |
| Category | $0.80–1.50 CPT | Test volume before scaling |
| Discovery | $0.50–0.80 CPT | Exploration budget; hold bids low while finding signal |

These are starting points only. Every category has different competitive pressure — a finance app competes differently from a casual game.

### Target CPT Formula

```
Target CPT = Target CPI × Historical CVR (installs ÷ taps)
```

If your target CPI is $4.00 and your measured CVR is 45%, your target CPT is $1.80. This formula anchors every bid decision to your unit economics rather than to what competitors are bidding.

### Bid Optimization Signals

| Signal | What it means | Action |
|--------|--------------|--------|
| Impression share below 50% | Losing auctions — bid is too low | Raise bid 20–30% and reassess in 48 hours |
| High TTR, low CVR | Users tap the ad but don't install | Improve the product page or paywall — see `paywall-design` and `asc-aso` |
| Low TTR (below 3%) | Ad creative or keyword relevance mismatch | Test a Custom Product Page matched to the keyword intent |
| High CVR but spend not scaling | You are winning at the current bid but capped | Raise bid or raise daily budget |
| CPT rising with flat or falling CVR | Auction is heating up around you | Reduce bid or pause the keyword; it is no longer profitable |

### Automated Bidding

ASA offers automated bidding targeting a goal CPA or ROAS. Use it only after:
- The campaign has 50+ conversions per ad group per week (Apple's minimum for signal quality)
- Manual bidding has produced a stable baseline CPT over at least two weeks

Switching to automated bidding before these thresholds hands the algorithm too little data and produces erratic results. Earn the right to automate.

---

## Custom Product Page Routing

Custom Product Pages (CPPs) let you show different screenshots, preview video, and promotional text to different ad groups — without changing your default App Store listing.

```
Ad Group: "yoga app"            → CPP: yoga-studio screenshots + yoga copy
Ad Group: "sleep sounds"        → CPP: night-sky screenshots + sleep copy
Ad Group: Competitor keywords   → CPP: head-to-head comparison screenshots
```

**Why it works.** A user searching "yoga app" who sees yoga-specific screenshots instead of your generic default listing immediately understands the app is relevant. TTR and CVR both lift — typically 15–30% on well-matched CPPs.

**Setup path:** App Store Connect → Custom Product Pages → create and submit pages → ASA Campaign Manager → Ad Group → Creative → select CPP.

For CPP creative strategy and screenshot principles, use the `asc-aso` skill. For paywall placement and subscription copy on the product page, use `paywall-design`.

---

## Metrics and Benchmarks

| Metric | Formula | Healthy | Investigate if |
|--------|---------|---------|----------------|
| **TTR** | Taps / Impressions | Above 5% | Below 3% |
| **CVR** | Installs / Taps | Above 50% | Below 30% |
| **CPT** | Spend / Taps | Category-dependent | Rising with flat CVR |
| **CPI** | Spend / Installs | Below your LTV threshold | Above 3× target |
| **ROAS** | Revenue / Spend | Above 100% (break-even); target 150%+ | Below 80% after 30 days |

TTR and CVR are the two levers you control most directly. TTR is a creative and keyword-relevance problem; CVR is a product page and paywall problem. Fix them independently — mixing the diagnoses leads to wrong solutions.

For app-store pricing strategy that affects CVR on paid installs, use `app-store-pricing`.

---

## Weekly Optimization Checklist

```
- [ ] Pull Search Terms report — graduate top terms to exact match in Category campaign
- [ ] Add new negatives from irrelevant or zero-install search terms
- [ ] Review impression share per keyword — raise bids where below 50%
- [ ] Pause any keyword with 100+ taps and 0 installs
- [ ] Check TTR per ad group — if below 3%, test a new CPP
- [ ] Verify no campaign is hitting daily budget cap before noon (cap blocks afternoon traffic)
- [ ] Compare CVR across campaign types: Brand vs Category vs Competitor
- [ ] Confirm CPI is within target for each campaign
```

---

## Scaling Checklist

Before raising budgets or expanding to new placements:

```
- [ ] CVR above 30% on primary campaigns
- [ ] CPI below 3× your target
- [ ] Negative keyword list is maintained and current
- [ ] At least two CPP variants have been tested and best performer selected
- [ ] Bid strategy is manual and stable (not thrashing week-over-week)
- [ ] Discovery campaign is producing a consistent flow of new exact-match graduates
```

Scaling a campaign that fails these checks amplifies problems, not results.

---

## Campaign Audit Output Template

When a user shares their ASA data, structure the audit like this:

```
Account: [App Name]
Audit period: [date range]

Campaign Structure
  [✓/✗] Brand campaign
  [✓/✗] Competitor campaign
  [✓/✗] Category campaign
  [✓/✗] Discovery campaign
  [✓/✗] CPP assigned to at least one ad group

Performance Summary
  Impressions:  [N]
  Taps:         [N]   (TTR: [X]%)
  Installs:     [N]   (CVR: [X]%)
  Spend:        $[N]
  CPI:          $[N]
  ROAS:         [X]%

Top Issues
  1. [issue] — [specific fix]
  2. [issue] — [specific fix]

Priority Actions (ordered by expected impact)
  1. [action] — rationale: [why this moves the needle]
  2. [action] — rationale: [why this moves the needle]
```

---

## Related Skills

- `asc-aso` — Keyword research and App Store listing optimization; use before seeding any keyword list
- `paywall-design` — Improve CVR from install to subscription (the conversion that makes ROAS positive)
- `app-store-pricing` — Subscription pricing strategy that affects CPI payback period
- `app-launch` — Full launch strategy including non-ASA paid channels (Meta, Google UAC, TikTok)

<!-- END SKILL: apple-search-ads -->

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

## The ASO Score Card (0–100)

For an audit, don't just list issues — score the listing so the user sees where they stand and what moves the needle most. Rate each factor 0–10, multiply by its weight, sum to 100.

| # | Factor | Weight | What a 10 looks like |
|---|--------|:------:|----------------------|
| 1 | **Title** | 15% | ≤30 chars, brand + 1 high-value keyword, zero waste |
| 2 | **Subtitle** | 12% | ≤30 chars, benefit-led, distinct keywords (no title overlap) |
| 3 | **Keyword field** | 12% | 100/100 chars used, no spaces, no repeats, no app/category name |
| 4 | **Localization coverage** | 12% | en-US + en-GB filled, all top-revenue locales localized |
| 5 | **Screenshots (first 3)** | 13% | Benefit-captioned hero shots, not bare UI; hook in slot 1 |
| 6 | **App preview video** | 6% | Present, shows the app in use, hooks in 3s |
| 7 | **Icon** | 8% | High contrast, legible at thumbnail, distinct from competitors |
| 8 | **Ratings & reviews** | 10% | Healthy volume + recency; ≥4.5 avg; prompt at delight moment |
| 9 | **Conversion levers** | 7% | Promo text current; PPO running; CPPs for paid traffic |
| 10 | **Keyword relevance/targeting** | 5% | Ranking for terms the app genuinely satisfies, long-tail first |

> **Score = Σ(factor ÷ 10 × weight).** Report the number, the band (0–40 *needs overhaul* / 41–70 *solid, leaking value* / 71–100 *optimized*), and the three lowest-weighted-score factors as the priority fixes.

### Tiered recommendations

After scoring, structure the output into three tiers so the user knows what to do **today** vs. **this quarter**:

- **🟢 Quick Wins** — no-update, no-cost edits: keyword field rewrite, en-GB fill, promo text, subtitle tweak. Ship today.
- **🟡 High-Impact** — needs an app/version update or asset work: screenshot redesign, preview video, icon test (PPO). Ship this cycle.
- **🔵 Strategic** — sustained effort: full localization rollout, ratings-velocity program, CPP-per-campaign for Apple Search Ads (see `apple-search-ads`).

### Competitor comparison

Discoverability is relative. Pull 2–3 direct competitors and compare side by side:

| Field | You | Competitor A | Competitor B |
|-------|-----|--------------|--------------|
| Title keywords | … | … | … |
| Subtitle angle | … | … | … |
| Visible keyword themes | … | … | … |
| Rating (count / avg) | … | … | … |
| Screenshot hook | … | … | … |

Use this to find the **gap terms** — relevant, lower-difficulty keywords competitors under-target — and the conversion ideas worth borrowing. Gather competitor metadata via WebSearch / the public App Store listing, or ask the user; for your own live fields use `asc_get_metadata` / `asc_get_app_info`.

---

## Measuring ASO

Use App Store Connect **App Analytics**:

- **Impressions → Product Page Views → Downloads** is the funnel. ASO discoverability moves impressions; CRO moves the views→downloads ratio (the **conversion rate**).
- Segment by **Source Type**: *App Store Search* (keyword ASO), *App Store Browse* (category/featuring), *Web Referrer*, *App Referrer*.
- Watch **conversion rate** per Custom Product Page and PPO treatment to pick winners.

A 1% absolute conversion-rate gain often beats weeks of ranking work — instrument both, optimize the cheaper one first.

<!-- REFERENCE: asc-aso/templates/overlay-template.md -->

---
name: {{overlayName}}
description: {{overlayDescription}}
---

<!-- GENERATED by overlay-sync from .claude/apple-overlays.json. The region
     between the BEGIN/END managed markers is regenerated on every sync — DO NOT
     hand-edit it. Add project notes BELOW the END marker; those are preserved.
     Vars this engine reads from the descriptor's `vars` (all optional — each has
     a sensible default): appName, appStoreId, categories, locales,
     keywordTargets, conversionNotes. -->

# {{overlayTitle}}

> Thin **project overlay** over the generic `asc-aso` engine. The engine owns the
> indexed-field rules, the keyword-research workflow, the 0–100 score card, and
> the conversion levers. This overlay only binds the engine to **{{projectName}}**
> — the listing's identity, the locales to optimize, and the seed keyword themes.
>
> Run the `asc-aso` skill; pull live metadata with `asc_get_metadata` /
> `asc_get_app_info`, then audit against the bindings below.

<!-- BEGIN asc-aso:managed — generated by overlay-sync, do not edit -->

## Listing under optimization

| Field | Value |
|-------|-------|
| App | {{appName}} |
| App Store ID | {{appStoreId}} |
| Categories | {{categories}} |

## Locales to optimize

{{locales}}

## Keyword targets & seed themes

{{keywordTargets}}

## Conversion notes

{{conversionNotes}}

<!-- END asc-aso:managed -->

## Project notes (preserved across syncs)

<!-- Add competitor App IDs, locked metadata decisions, or do-not-use terms here.
     overlay-sync never touches anything below the END marker. -->

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

## Post-Release Crash Monitoring

A green CI build is not the end of the story. **Crashes after release are an ASO signal, not just an engineering problem** — they tank retention, drag the rating down (which feeds App Store ranking, see `asc-aso`), and trigger 1-star "it keeps crashing" reviews that `review-management` then has to absorb. Treat the crash rate as a release gate.

Pull recent crashes for a live app with `asc_list_recent_crashes_for_app`, then triage and decide whether the rollout continues.

### Crash-free targets

| Metric | Target | Action if missed |
|--------|--------|------------------|
| **Crash-free sessions** | > 99.5% | Investigate before expanding rollout |
| **Crash-free users** | > 99.0% | Below this, pause phased release |

### Severity triage

| Tier | Definition | Response |
|------|-----------|----------|
| **P0** | Launch crash, data loss, or affects >1% of sessions | Pause rollout, hotfix + expedited review (`app-rejection-recovery` covers expedited) |
| **P1** | Core-flow crash on a common device/OS | Fix in the next build this cycle |
| **P2** | Edge-case crash, low volume | Backlog, batch into a routine release |
| **P3** | Rare, non-blocking, single-device | Monitor; fix opportunistically |

Sort by **volume × severity**, not raw count — a crash hitting 0.8% of sessions on the latest iOS outranks a louder one on a deprecated device.

### Phased release as blast-radius control

Ship major versions with **phased release** (`asc_set_phased_release`) so a regression reaches 1% → 2% → 5% → … of users over 7 days instead of everyone at once. Watch the crash-free rate at each stage:

- **Crash rate rises > 0.2% absolute vs. the prior version → pause the rollout** (keep the phased release paused; do not call `asc_release_version` to go 100%).
- Clean for 24h at the current stage → let it continue.
- Confirmed P0 in the wild → pause, fix, submit a new build; the bad version stops spreading.

This converts "we shipped a crash to 100% of users" into "we caught it at 2%."

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
| `asc_list_recent_crashes_for_app` | Post-release crash reports for a live app (crash-rate gate) |
| `asc_set_phased_release` | Enable/pause phased rollout (blast-radius control) |
| `asc_release_version` | Push a version to 100% (only after the crash rate is clean) |

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

### The Development schema only exists if a Debug build generated it

Deploy can only promote what's *in* Development — and the Development schema is built **just-in-time by a running Debug build**, not by writing model code. `NSPersistentCloudKitContainer` (and SwiftData + CloudKit) lazily create the `CD_*` record types in Development the first time a **Debug build, signed into iCloud on a real device,** actually writes/syncs. Production *prohibits* this JIT creation — that's the entire reason you deploy a schema.

The trap: **an app that has only ever shipped TestFlight/App Store (Production) builds and never run a Debug build has an empty Development schema.** Open **Deploy Schema Changes** and you see a **zero diff — "nothing to deploy."** That reads like "already in sync," but it actually means *both environments are empty*. Production stays empty, and every sync — and every `CKShare` — silently fails in the shipped build. A zero diff is ambiguous: it's either "in sync" or "both empty." **Disambiguate by opening Schema → Record Types** — if it's blank, you never generated the dev schema.

**Fix, in order:**

1. Run a **Debug build on a real device signed into iCloud** (a simulator with no iCloud account won't generate the schema). Either exercise the code paths that write each record type, **or** — more reliably — call `initializeCloudKitSchema(options:)` once inside `#if DEBUG`. **Prefer the latter:** exercising paths by hand only registers the types you actually *touch*, so it's easy to leave a **partial** schema (miss one entity and that record type is silently absent from Production). `initializeCloudKitSchema` dry-runs one record of **every** mirrored entity in a single shot, then deletes them — so all `CD_*` types appear at once. **Never ship that call** — it throws against Production.
2. **`CKShare` record types are not generated by `initializeCloudKitSchema`.** The sharing schema (`cloudkit.share` and the shared custom zone) only appears once you **originate a share** — call `container.share(...)` once in Development.
3. Confirm **Schema → Record Types** in Development is now non-empty and lists your `CD_*` types (and the share type, if you share).
4. *Now* **Deploy Schema Changes** — the diff is real — and verify the same record types appear under the **Production** environment.

### Generating the schema headlessly (no Xcode window)

You don't have to sit in Xcode to run `initializeCloudKitSchema`. Gate it behind **both** `#if DEBUG` and a launch flag, run it off the main thread, and drive a device build from the command line:

```swift
#if DEBUG
guard UserDefaults.standard.bool(forKey: "InitCloudKitSchema") else { return }
DispatchQueue.global(qos: .userInitiated).async {
    try? container.initializeCloudKitSchema(options: [])   // blocking; never on main
}
#endif
```

```bash
xcodebuild -scheme YourApp -destination 'generic/platform=iOS' build
xcrun devicectl device install app --device <UDID> /path/to/YourApp.app
xcrun devicectl device process launch --terminate-existing --device <UDID> \
    -- com.you.app -InitCloudKitSchema YES
```

The **`--` separator is required** — without it `devicectl` parses `-InitCloudKitSchema` as one of *its own* flags and fails (it tries to read `YES` as the value for `-t`). Everything after `--` is the bundle id and the app's own launch arguments; `-Key Value` lands in `NSArgumentDomain`, where `UserDefaults.standard.bool(forKey:)` reads it. The device must be unlocked and the app foregrounded for ~15s while it writes and deletes the temp records.

### Verify the deploy from the CLI with `cktool`

You don't have to eyeball the Console to confirm a deploy landed. `xcrun cktool export-schema` reads the live schema and — unlike most cktool verbs — **works against both environments**, so you can diff Development against Production *after* deploying:

```bash
xcrun cktool export-schema --team-id <TEAM> \
    --container-id iCloud.com.you.app --environment production
```

(Needs a saved token once: `xcrun cktool save-token --type management`.) The record-type list **is** the schema truth — if Production's export matches Development's, the deploy is complete.

**cktool verifies; it does not promote.** `import-schema` and `validate-schema` are **Development-only** (against Production they return "endpoint not applicable in the environment 'production'"), and **no cktool verb pushes Dev→Prod**. Promotion stays the Console's **Deploy Schema Changes** button — cktool is for generating (via the headless DEBUG path above) and verifying, never deploying.

---

## Conflicts & merging

- The default is **last-writer-wins** at the field level (CloudKit) / configurable merge policy (Core Data: set `viewContext.mergePolicy = NSMergeByPropertyObjectTrumpPolicy`).
- For data where lost edits matter (counters, sets), model them so concurrent edits *combine* rather than overwrite (e.g. store events and reduce, not a single mutable total).
- Sync is **eventual** — design UI to tolerate a record appearing/updating later. Never block the UI on a sync.

---

## Sharing between users (CKShare)

For collaboration (not just same-user multi-device):

- Create a `CKShare` for a record (or use SwiftData's sharing affordances) and present `UICloudSharingController` to invite participants.
- Shared records live in the **shared database**; participants need the right `CKShare.ParticipantPermission` (`.readOnly` / `.readWrite`).
- Handle the share-accept flow via the scene/app delegate `userDidAcceptCloudKitShareWith`.

### CKShare invite flow: end-to-end

This is the most error-prone CloudKit surface. Each step must be correct for the connection to complete.

#### 1. Origination

- The **owner** creates a `CKShare` from their **private** CloudKit database using `NSPersistentCloudKitContainer.share(_:to:completion:)`.
- Set `publicPermission` if you invite by link rather than by pre-registered participant: `share.publicPermission = .readWrite`.
- Persist the share with `persistUpdatedShare(_:in:)` so metadata updates (including `share.url`) are mirrored.
- Wait for `share.url` to exist before showing the invite UI. If it is nil, force-save/fetch the share from the private database, or let `UICloudSharingController` mint it.

#### 2. Delivery

- The recommended UI entry point is `UICloudSharingController`. If you build a custom composer (e.g., `MFMessageComposeViewController`), you must manage `share.url`, permissions, and participant lifecycle yourself.
- `MFMessageComposeViewController.recipients` expects an array of **phone-number strings** (digits plus leading `+`). Formatting characters may fail.
- For App Clip cards in Messages, the link must be a verified associated-domain URL and App Store Connect must have a **published Default App Clip Experience**. A missing or `RECEIVED`-only experience often causes the card not to render.

#### 3. App Clip hand-off

- App Clips **cannot use private/shared CloudKit containers**. They cannot accept a `CKShare`.
- The App Clip should parse the invite URL, stash the raw share URL in a shared App Group (or pass it via `NSUserActivity`), and prompt the user to install the full app.
- The full app drains the stash on first launch and accepts the share.

#### 4. Acceptance

The recipient app receives the invitation through **UIKit callbacks triggered by the user tapping the link**, not by a silent CloudKit push:

- `windowScene(_:userDidAcceptCloudKitShareWith:)` for raw CloudKit share URLs.
- `onOpenURL` / universal links for wrapped URLs (e.g., `https://example.com/invite?s=ckshare...`).

In both cases, accept with:

```swift
persistentContainer.acceptShareInvitations(
    from: [metadata],
    into: sharedStore        // the .shared-scope persistent store
) { acceptedMetadatas, error in
    // handle error
}
```

**Critical:** acceptance can arrive while the persistent stores are still loading. Buffer the metadata and drain it after the shared store is ready, or the tap is silently dropped.

#### 5. The sender learns acceptance only through sync

CloudKit **does not push** a “recipient accepted” notification to the owner. The owner must fetch/refresh the updated `CKShare` record and inspect:

```swift
share.participants.contains { $0.role != .owner && $0.acceptanceStatus == .accepted }
```

Provide an explicit refresh affordance (pull-to-refresh, `onAppear` refresh) so the user is not stuck in “pending.”

#### 6. Honest status model

| State | Source | Notes |
|---|---|---|
| Sent | Local confirmation (`MFMessageComposeViewController` `.sent`, `UICloudSharingController` save) | Persist per-contact on-device. |
| Received / opened | **Not available** | CloudKit exposes no such event. Do not claim it. |
| Accepted | `CKShare.Participant.acceptanceStatus == .accepted` for a non-owner participant | Requires the owner's device to sync the updated share. |
| Rejected | **Not available** | `CKShare.ParticipantAcceptanceStatus` has no rejected case. |

---

## Debugging sync

- Add the launch argument `-com.apple.CoreData.CloudKitDebug 1` (and `-com.apple.CoreData.SQLDebug 1`) to see sync activity in the console.
- Verify the device is **signed into iCloud** and iCloud Drive is on — sync silently no-ops otherwise. Surface iCloud account status (`CKContainer.accountStatus`) in the UI.
- New devices/back-ups import in the background after first launch — give it time and a connection.
- "Works on one device, not the other" → check both are on the same iCloud account and the schema is deployed.
- **Look in the right database and zone.** Core Data + CloudKit writes to the **private** database in a **custom zone** named `com.apple.coredata.cloudkit.zone` — *not* the Public database, *not* `_defaultZone`. Sharing adds the **shared** database. The Console opens on the Public DB / `_defaultZone` by default, where a Core Data app stores **nothing** — see it empty there and you'll wrongly conclude sync is broken. To check actual data, switch to **Private Database → `com.apple.coredata.cloudkit.zone`**; to check the schema, use **Schema → Record Types** (which spans the whole environment).

| Symptom | Cause | Fix |
|---------|-------|-----|
| Throws at `ModelContainer` init | Schema breaks a CloudKit rule | Make properties optional/defaulted, drop `.unique` |
| Builds, never syncs | Missing Remote notifications background mode, or signed out of iCloud | Add capability; check `accountStatus` |
| Works in Xcode, not in App Store build | Schema not deployed to Production | Deploy in CloudKit Console |
| "Deploy Schema Changes" shows nothing to deploy | Never ran a Debug build → the **Development schema is empty** (not "in sync") | Run a Debug build on-device signed into iCloud (or `initializeCloudKitSchema` in DEBUG); confirm Schema → Record Types is non-empty, then deploy |
| Console shows no records though the app saved data | Looking at the Public DB / `_defaultZone` | Look in Private DB → `com.apple.coredata.cloudkit.zone` |
| `CKShare` create fails on a TestFlight/App Store build ("invitation couldn't be created") | Sharing schema never reached Production — a share was never originated in Development before deploy | Originate one share in a Debug build to generate the share schema, then deploy to Production |
| Can't confirm a deploy actually reached Production (no Console access) | — | `xcrun cktool export-schema --environment production` (works on both envs) and check the `CD_*` list matches Development |
| Edits clobber each other | Last-writer-wins | Model concurrent data as combinable events |
| App Clip card does not appear in Messages / Safari | Missing or unpublished Default App Clip Experience in App Store Connect | Create and publish a Default App Clip Experience; re-check Advanced Experiences stuck in `RECEIVED` |
| Both users installed and sent invites, but both still see "pending" | No on-demand refresh of `CKShare` metadata; CloudKit does not push acceptance | Add explicit refresh on Shared tab appear / pull-to-refresh; force snapshot rebuild after acceptance |
| Share acceptance silently fails on cold launch | `acceptShareInvitations` runs before the `.shared` store is loaded | Buffer `CKShare.Metadata` in the scene delegate and drain after store load |
| `CKShare` operations stop working after a local-only fallback | Code uses `container` directly instead of the active fallback container | Route all share operations through the active container/coordinator |

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

<!-- BEGIN SKILL: design-handoff -->

# design-handoff

# Design Handoff

> **Purpose:** Turn an app's real UI states into a current, captioned screenshot package that an external reviewer can consume — without inventing a parallel screenshot mechanism, and without ever capturing on a machine that may not run the simulator.
> **Trigger:** You need to hand an app's UI to Claude Design / a designer / an image-consuming tool, and the committed screenshots are missing or stale.

This skill is the generic **engine**. A project binds it through a thin overlay skill (generated by `overlay-sync`) that supplies the app list, schemes, paths, and a design-context brief. The engine never hard-codes a project.

## Core principle: reuse, never duplicate

Most iOS apps already have a screenshot path — a UITest target driven by `fastlane snapshot` (`capture_ios_screenshots`), a seeding mechanism for deterministic states, and stable accessibility identifiers. **This skill drives that existing path. It does not create a second harness, a second seeding system, or a `-STATE` enum.** If the app's deterministic states live in a seeder enum, the manifest references those enum cases by name. If a needed state is missing, you extend the existing seeder/UITest target — you do not start a parallel one. (See the "never keep multiple versions of a feature" rule that most Apple projects in this org enforce.)

## Phases

```
/design-handoff <app> [phase] [--dest <dir>]
```

| Phase | Where it may run | Does |
|-------|------------------|------|
| `prepare` | any host (incl. capture-forbidden) | Reconcile the manifest against the app's screenshot UITest target — report/author the test methods that produce each manifest shot. No simulator. |
| `capture` | **capture-capable host only** | Run the host guard, then the project's existing fastlane screenshot lane → raw PNGs. |
| `package` | any host | Collect the raw PNGs into `latest/`, archive the previous set, write captions + design context + the reviewer prompt, stamp provenance. |
| `bundle` | any host | Zip `latest/` and copy it to `--dest`. |
| `all` | capture-capable host | `capture` then `package` (then `bundle` if `--dest` is given). |

Default phase is `package` if raw screenshots already exist, otherwise the skill tells you to run `capture` on a capable host first.

## Step 1 — Simulator-capability guard (REQUIRED before `capture`/`all`)

You cannot reliably probe whether the simulator will destabilize *this* machine. An explicit opt-out therefore always wins over any hardware probe. Run the shipped guard, which echoes one of `forbidden | unavailable | insufficient | capable`:

```bash
bash "<skill-dir>/scripts/host-guard.sh"
```

| Result | Action |
|--------|--------|
| `forbidden` | A marker (`.claude/NO_SIMULATOR.md`, `$AETHER_NO_SIMULATOR`, `~/.config/no-simulator`) opts this machine out. **Stop. Never override.** Tell the user to run `capture` on a capture-capable Mac, then `package` anywhere. |
| `unavailable` | Not macOS, no Xcode, or no installed runtime. Cannot capture here. |
| `insufficient` | Below the RAM/disk floor. Warn; prefer a capable host. |
| `capable` | Proceed to capture. |

> The marker is authoritative. If unsure, treat as `forbidden`. This is the same ladder `preview-capture` uses — one convention across the toolkit.

## Step 2 — The manifest (`<app screenshots dir>/shots.yaml`)

Single source of truth for "which states matter for review." One entry per shot. The manifest **maps each shot to the app's existing deterministic state mechanism** — do not invent launch flags the app does not already read.

```yaml
# Captions double as the reviewer's per-image context.
scheme: AppName-Screenshots          # the existing fastlane snapshot scheme
seedMechanism: launchArgScenario      # how this app stages state (documentation only)
shots:
  - id: "01_TimerIdle"               # MUST equal the snapshot("<id>") name in the UITest
    title: "Timer — idle"
    caption: "Resting dial at 25:00; first-run hint visible."
    scenario: "freshInstall"          # an existing seeder case, not a new one
    nav: []                           # accessibility-id taps after launch, in order
  - id: "03_QuickCapture"
    title: "Capture — typing"
    caption: "Thought-parking sheet open with sample text."
    scenario: "multipleCaptures"
    nav: ["captureButton", "type:captureTextField:Email the team"]
devices: ["iPhone 17 Pro Max"]        # informational; the Snapfile owns the real device list
# States worth adding later but not yet in the UITest target — never silently dropped:
wishlist:
  - "Completion moment"
  - "Session detail / ThoughtVerse"
```

A template lives at `<skill-dir>/templates/shots.example.yaml`.

## Step 3 — `prepare`: reconcile manifest ↔ UITest target

1. Read `shots.yaml` and the app's existing screenshot UITest file (the one the `scheme` builds).
2. For every shot whose `id` has no matching `snapshot("<id>")` call, author one test method following the file's established pattern (seed the `scenario`, launch, apply `nav`, wait on the relevant accessibility id, then `snapshot("<id>")`). Reuse the existing seeding helper (e.g. `TestDataSeeder`/`setupSnapshot`) — do not introduce a new one.
3. Report a diff: shots **added**, **updated**, **already present**, and any manifest `id` you could not map (with why). `prepare` is idempotent — an unchanged manifest produces no edits.
4. Commit the UITest changes. Never run the UITests here (capture happens in its own phase, on a capable host).

If the app has **no** screenshot UITest target yet, say so and point the user at the project's UITest conventions; scaffold one only with explicit approval.

## Step 4 — `capture` (capable host only)

After the guard passes, run the project's existing lane (the overlay supplies the exact command), e.g.:

```bash
cd <app dir> && bundle exec fastlane ios_screenshots
```

Raw PNGs land wherever the project's Snapfile/lane writes them (commonly `fastlane/screenshots/<locale>/`). Do not reimplement capture; if the project also has a Watch lane and the manifest has Watch shots, run that too. **Never run plain UI tests as part of this** — capture is a render pass, not a test pass.

## Step 5 — `package`

Run the shipped packager, then write the prose:

```bash
node "<skill-dir>/scripts/package-handoff.mjs" \
  --raw "<dir of captured PNGs>" \
  --out "<app dir>/design-handoff" \
  --scheme "<scheme>" \
  --shots "<app screenshots dir>/shots.yaml"
```

The packager (deterministic file plumbing only):
- Archives the current `design-handoff/latest/` into `design-handoff/archive/<date>-<sha>/` (gitignored history).
- Copies the captured PNGs into `design-handoff/latest/`.
- Writes `latest/STAMP.txt` — git SHA, marketing + build version (best-effort), capture date, scheme, image count — so a stale set can never again pass as current.
- Emits `latest/manifest.json` (id → caption) for downstream tools.

Then **you** write the prose into `latest/` (the packager does not fabricate these):
- `manifest.md` — each image mapped to its caption.
- `<app>-design-context.md` — a code-grounded brief (design tokens, per-screen intent). The overlay supplies the app's design language; ground every claim in the actual code, never invent palette/spacing.
- `CLAUDE-DESIGN-PROMPT.md` — the paste-in reviewer prompt + the explicit upload list + "point the reviewer at the scoped `<app dir>/` subdirectory, not the whole monorepo." Start from `<skill-dir>/templates/CLAUDE-DESIGN-PROMPT.template.md`.

**Honesty rule:** if some manifest shots were not captured (forbidden host, wishlist states), `package` lists them as missing rather than shipping a handoff that looks complete. Never claim visual parity you cannot see.

## Step 6 — `bundle` (optional)

```bash
node "<skill-dir>/scripts/package-handoff.mjs" --zip "<app dir>/design-handoff/latest" --dest "<dir>"
```

Zips `latest/` to `<app>-handoff-<version>-<sha>.zip` and copies it to `--dest` (default `~/Desktop/<project>-handoffs/`). The zip is transient — gitignore it.

## Output layout

```
<app dir>/design-handoff/
  latest/                      # committed, canonical upload target
    01_TimerIdle.png ...
    manifest.json              # generated (id -> caption)
    manifest.md                # authored
    <app>-design-context.md    # authored, code-grounded
    CLAUDE-DESIGN-PROMPT.md     # authored
    STAMP.txt                  # generated provenance
  archive/<date>-<sha>/        # gitignored history
```

Recommended `.gitignore`: `**/design-handoff/archive/` and `*-handoff-*.zip`.

## Error handling

| Symptom | Cause | Fix |
|---------|-------|-----|
| Guard returns `capable` on a known-bad machine | Marker missing | Create `.claude/NO_SIMULATOR.md`; the marker is authoritative |
| `capture` invoked on `forbidden` host | Wrong machine | Refuse; run `capture` on a capable Mac, `package` anywhere |
| Manifest `id` not found in UITest | Test method missing | Run `prepare`; author the method against the existing pattern |
| Missing PNG for a manifest `id` | Capture skipped/failed | `package` lists it as missing — do not hand-fill |
| STAMP older than HEAD | `latest/` is stale | Re-run `capture`+`package` on a capable host |

## Cross-references

- Generated per-project overlay + descriptor sync: `overlay-sync`
- Simulator-capability convention shared here: `preview-capture`
- Device selection / simctl: `ios-simulate`
- Why UI-test execution is gated: `ios-test`

<!-- REFERENCE: design-handoff/templates/CLAUDE-DESIGN-PROMPT.template.md -->

<!--
  Paste-in prompt for an external design reviewer (Claude Design, a human
  designer, or any image-consuming tool). `package` does NOT fill this file — it
  writes STAMP.txt + manifest.json next to it. YOU fill every {{placeholder}}:
    - from STAMP.txt:   {{GIT_SHA}}, {{CAPTURE_DATE}}, {{MISSING_NOTE}}
    - from manifest.json: {{SHOT_TABLE}} (id -> caption), {{WISHLIST_AND_MISSING}}
    - by hand:          {{APP_NAME}}, {{PLATFORM}}, {{VERSION}} (marketing+build),
                        {{ONE_PARAGRAPH_PRODUCT_INTENT}}, {{DESIGN_LANGUAGE_BRIEF}},
                        {{APP_SUBDIR}} — from the overlay's design-context brief.
-->

# Design review — {{APP_NAME}}

You are reviewing the **current** UI of {{APP_NAME}} ({{PLATFORM}}). The goal is a
critique + concrete improvement suggestions across the whole experience, screen
by screen and as a system.

## What this app is

{{ONE_PARAGRAPH_PRODUCT_INTENT}}

## Design language (ground truth — do not invent palette/spacing)

{{DESIGN_LANGUAGE_BRIEF}}
<!-- tokens, type ramp, color roles, motion principles, any hard constraints
     (e.g. dark-mode-only). Pulled from the overlay's design-context brief and
     grounded in the actual code. -->

## The screens (attached, in order)

{{SHOT_TABLE}}
<!-- generated: each image id -> caption -->

## How to read these

- These are real renders from the build at commit `{{GIT_SHA}}` ({{VERSION}}), captured {{CAPTURE_DATE}}.
- {{MISSING_NOTE}}  <!-- e.g. "All manifest states captured." or "N states not yet captured — see Not captured below." -->

## What I want from you

1. Per-screen critique: hierarchy, spacing, type, color, affordances, state clarity.
2. System-level: consistency across screens, navigation, cohesion of the design language.
3. Top 5 highest-leverage changes, ranked, each with the why.
4. Anything that reads as off-brand against the design language above.

## Scope

Point your codebase context at the scoped **`{{APP_SUBDIR}}/`** subdirectory only,
not the whole monorepo (large repos lag and dilute relevance).

## Not captured (if any)

{{WISHLIST_AND_MISSING}}
<!-- honest list of states the reviewer is NOT seeing, so absence is never read
     as "this state doesn't exist". -->

<!-- REFERENCE: design-handoff/templates/overlay-template.md -->

---
name: {{overlayName}}
description: {{overlayDescription}}
---

<!-- GENERATED by overlay-sync from .claude/apple-overlays.json. The region
     between the BEGIN/END managed markers is regenerated on every sync — DO NOT
     hand-edit it. Add project notes BELOW the END marker; those are preserved. -->

# {{overlayTitle}}

> Thin **project overlay** over the generic `design-handoff` engine. The engine
> owns the pipeline (prepare → capture → package → bundle), the host guard, the
> manifest schema, and the packager. This overlay only binds the engine to
> **{{projectName}}** — apps, schemes, paths, and the design-context brief.
>
> Run the `design-handoff` skill; apply the bindings below.

<!-- BEGIN design-handoff:managed — generated by overlay-sync, do not edit -->

## Apps in this project

{{appsTable}}

## Per-app bindings

{{appBindings}}

## Capture command

On a capture-capable host (the engine's host guard must return `capable`):

```bash
{{captureCommand}}
```

## Output home

Each app's handoff lives at `{{handoffPathPattern}}`. The committed upload target
is `latest/`; history is archived under `archive/` (gitignored).

## Host policy

{{hostPolicy}}

<!-- END design-handoff:managed -->

## Project notes (preserved across syncs)

<!-- Add project-specific design-context guidance, gotchas, or links here.
     overlay-sync never touches anything outside the managed markers. -->

<!-- END SKILL: design-handoff -->

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

**Error (either signature — same root cause):**

```
error: unable to write file '.../DerivedData/.../<Target>-<hash>-VFS-iphoneos/all-product-headers.yaml':
       No such file or directory (2)
** ARCHIVE FAILED **
```

```
error: Unable to resolve module dependency: 'CoreFoundation' (in target 'MyKit' from project 'MyKit')
error: Unable to resolve module dependency: 'Darwin' …
error: Unable to resolve module dependency: 'UIKit' …
** ARCHIVE FAILED **
```

The second signature is the more *misleading* one: it names **system** modules
(`CoreFoundation`/`Darwin`/`UIKit`/`Dispatch`/`QuartzCore`) against a shared Kit/SPM target, so it
reads like "your code references something that doesn't exist." It doesn't — the build just couldn't
read the cached system module maps because a parallel build was rewriting/locking them. **Do not edit
code or `rm -rf` the cache reflexively.** Confirm with `pgrep -f "xcodebuild|swift-frontend"` first.

**Cause:** Two `xcodebuild` runs (archive *or* build) sharing **one** DerivedData path race on the same VFS
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

#### watchOS: `tap()` Is Delivered, `press(forDuration:)` Is Not

**Critical (watchOS simulator):** XCUITest synthesizes a coordinate `tap()` into a SwiftUI `.onTapGesture` on a *custom* element (e.g. a `ZStack` ring with `.accessibilityElement(children: .ignore)` + `.isButton`), but it does **not** synthesize `press(forDuration:)` into that element's `.onLongPressGesture`. The long-press simply never fires, so any assertion that depends on the post-long-press state hangs until it times out.

```swift
// Custom control: a morphing ring that is the only accessible element.
// tap starts/resumes; long press pauses/stops.
ZStack { /* … */ }
    .onTapGesture { viewModel.primaryAction() }
    .onLongPressGesture { viewModel.secondaryAction() }
    .accessibilityElement(children: .ignore)
    .accessibilityAddTraits(.isButton)
    .accessibilityLabel(ringLabel)

// WORKS — coordinate tap reaches .onTapGesture
func test_tapStarts() {
    ring.tap()
    XCTAssertTrue(waitForRingLabel(containing: "running"))  // ✓ passes
}

// DOES NOT WORK — press(forDuration:) is not delivered to .onLongPressGesture
func test_longPressPauses() throws {
    try XCTSkipIf(true, "watchOS XCUITest can't deliver a long press to a custom .onLongPressGesture; cover the pause/stop logic with ViewModel unit tests instead.")
    ring.tap()
    ring.press(forDuration: 0.6)
    XCTAssertTrue(waitForRingLabel(containing: "paused"))  // ✗ never satisfied → times out
}
```

- **`.accessibilityAction` does NOT change this.** `tap()` is a *coordinate* tap, not an accessibility activation, so adding `.accessibilityAction(.default)`/`.accessibilityAction(named:)` neither helps the tap (already works) nor enables the long press. Don't reach for it as a fix — it was a tested dead end.
- **Skip, don't fight it.** Gate undrivable-gesture tests with `try XCTSkipIf(true, "<reason>")` (a *throwing call*, so the compiler won't flag the preserved body as unreachable — unlike a bare `throw XCTSkip(...)`), and move the behavior coverage to `@MainActor` ViewModel unit tests. The gesture still works for real users; only the simulator's event synthesis is the gap.
- The same class of limitation covers `TabView(.verticalPage)` (a `swipeDown` after `swipeUp` reports "app not running") and the double-tap *hand* gesture (`handGestureShortcut(.primaryAction)` — no XCUITest affordance at all).

#### watchOS: UI Tests Share an App Group — Reset It Under a Launch Arg

**Critical:** watchOS UI tests in one suite share the App Group store. A session (or any persisted UI state) that test A starts is restored into test B's launch via your "restore from shared state" hook, so tests pass alone but fail in sequence (state bleed). Reset the shared stores in the launch-once restore hook, gated by a launch argument:

```swift
// Test
override func setUp() async throws {
    app = XCUIApplication()
    app.launchArguments = ["--uitesting"]
    app.launch()
}

// App (launch-once restore hook, guarded so it never clears a live mid-test session)
func restoreFromSharedStateIfNeeded() {
    guard !didAttemptRestore else { return }
    didAttemptRestore = true
    if CommandLine.arguments.contains("--uitesting") {
        TimerStateStore.clear()
        WatchSessionRestoreStore.clear()
        return                       // start every test from a clean, independent state
    }
    // … normal restore …
}
```

Reset only what causes bleed. A separate **SwiftData** captures store often is *not* cleared by this hook, so a screenshot test that seeds captures leaves rows visible to a later "empty idle" test — design that later assertion to tolerate the seeded rows rather than assuming a pristine store (see below).

#### watchOS WatchConnectivity: Force Independent Start Under Test

If a watch screen normally begins by negotiating with the paired iPhone over `WCSession`, that round-trip stalls in the simulator (no reachable counterpart), so even `tap()`-to-start appears broken. Bypass the negotiation entirely under test:

```swift
#if os(watchOS)
if CommandLine.arguments.contains("--uitesting") {
    role = .independent
    onIndependent()            // start locally, never wait on the phone
    return
}
if isCounterpartReachable { /* normal WCSession path */ }
#endif
```

Separately, any one-shot `WCSession` request needs its completion gated so it fires *exactly once* and its timeout actually fires: store a sentinel keyed by `requestID` in a lock-guarded registry, and gate every completion path (success / error / timeout) on an atomic `retrieve()` (remove-and-return). Forgetting to store the sentinel means the timeout's `retrieve()` returns nil and the timeout never fires → a permanent hang on a reachable-but-silent counterpart.

#### Screenshot Tests Need Assertions, Not Just `snapshot()`

A fastlane screenshot test that calls `snapshot("paused")` right after `ring.press(forDuration:)` **proves nothing about the paused state** — `snapshot()` captures whatever is on screen, with no assertion that the long press actually landed. Such a test stays green even when the gesture is silently dropped (see the watchOS long-press gotcha), giving false confidence. If a screenshot is meant to document a *state*, assert the state was reached before capturing:

```swift
ring.tap()
XCTAssertTrue(waitForRingLabel(containing: "running"))   // assert, then…
snapshot("running")                                       // …capture
```

#### `NavigationLink` Counts as a Button — Avoid Exact Button Counts

A SwiftUI `NavigationLink` is exposed to XCUITest as a `button`. Assertions like `XCTAssertEqual(app.buttons.count, 1)` are brittle: a "View all" history link, a leaked `.swipeActions` button (swipe actions outside a `List` don't function but still leak an *empty-label* button into the tree), or any conditional link inflate the count. Assert on intent — that no *labeled* control of the forbidden kind exists — and tolerate known-benign extras:

```swift
let labels = app.buttons.allElementsBoundByIndex.map(\.label)
let unexpected = labels.filter {
    !$0.hasPrefix("Ember timer") && $0 != "View all" && !$0.isEmpty  // ring, history link, empty swipe-action leak
}
XCTAssertTrue(unexpected.isEmpty, "unexpected buttons: \(unexpected)")
```

#### watchOS Sim Launch Flake — Launch Once, Wait, Retry Once (Don't Pre-`terminate()`)

The watchOS simulator on Xcode Cloud intermittently fails to (re)launch the app under test (`"Simulator device failed to launch …watchkitapp"`). A test suite that does `app.terminate(); app.launch()` in every `setUp` makes this *worse* — `launch()` already terminates a running instance, so the explicit `terminate()` just doubles the number of fragile relaunches (~2× tests/run). Replace it with a launch-then-confirm helper that retries exactly once:

```swift
extension XCUIApplication {
    func launchForWatchUITest(timeout: TimeInterval = 30) {
        launch()
        if wait(for: .runningForeground, timeout: timeout) { return }
        terminate(); launch()
        _ = wait(for: .runningForeground, timeout: timeout)   // wait(for:) is available on watchOS (Xcode 16.3+)
    }
}
```

**Then give `setUp` headroom:** the retry can spend up to `2 × timeout` (~60s) before the app is foreground, which by itself trips a `executionTimeAllowance = 60`. Raise the allowance (≥120s) on any class using the retry, or the run fails with `"Test exceeded execution time allowance of 1 minute"` even though every test is logically green (0 failures, all SUCCESS/SKIPPED).

#### CI That Uses a Committed `.xcodeproj` Won't See New Files Until You Regenerate

If a project commits its `.xcodeproj` and the CI clone script does **not** run `xcodegen` (check `ci_scripts/ci_post_clone.sh`), a brand-new source file added to a target is invisible to CI — the build fails with `Value of type 'X' has no member 'Y'` for the new symbol. Regenerate (`xcodegen generate`), re-apply any committed post-gen patches, and commit the `project.pbxproj`; the diff should be only the new file-reference insertions (`PBXBuildFile`, `PBXFileReference`, group, Sources phase).

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

<!-- BEGIN SKILL: onboarding-optimization -->

# onboarding-optimization

# Onboarding Optimization

**Get every new user to their first moment of real value — fast, frictionlessly, and without a rejection from App Store Review.**

---

## The Core Goal: Activation, Not Completion

Onboarding is not a tutorial. It is a funnel with one exit condition: the user experiences the activation event — the moment they understand why this app exists for them.

Everything before that event is pure overhead. Every screen that does not directly advance the user toward activation is a drop-off risk.

### Define the Activation Event First

Before auditing a single screen, name the activation event for your app type:

| App type | Activation event |
|---|---|
| Task manager | First task created and checked off |
| Finance / budgeting | First transaction categorized |
| Social | First connection made or first post published |
| Fitness | First workout logged or first plan started |
| Streaming / media | First piece of content played for 30+ seconds |
| Shopping | First item saved or first purchase completed |
| Utility (e.g., scanner) | First scan completed and exported |
| Developer tool | First successful build or first API call |

Write this event down. Every onboarding decision is evaluated by a single question: does this step bring the user closer to that event, or does it delay it?

---

## First-Run Flow Audit

### Count Everything

Instrument or walk through the current onboarding manually. Record:

- Total screens from cold launch to activation event
- Total taps required (including "Next", "Continue", "Allow", "Skip")
- Screens that require user input (text fields, toggles, selections)
- Screens that are pure marketing or feature explanation with no user action

A healthy first-run flow reaches activation in **5 taps or fewer** for simple apps; under 10 for complex ones. If you are beyond that, you are losing users.

### The Cut List

Apply these rules in order:

1. **Remove feature tours.** If the screen says "Here is what you can do", cut it. Show the user by letting them do it.
2. **Remove welcome screens that aren't personalization.** A splash with your tagline is not onboarding; it is friction.
3. **Collapse multi-step questionnaires.** More than 3 personalization questions before first value is too many. Reduce, or move them post-activation.
4. **Cut all permissions not needed for the activation event.** Notifications, contacts, tracking — these do not belong on screen 2 of a utility app.
5. **Defer account creation.** (See sign-up friction section below.)

### The Defer Heuristic

If removing a step would still allow the user to reach the activation event, defer it. If deferring it would break the core loop, keep it and make it as fast as possible.

---

## Permission-Prompt Strategy

Getting rejected by users on system prompts is permanent for some permissions (ATT, notifications on iOS 16+). A denial cannot be undone without the user visiting Settings manually. One bad permission screen early in onboarding can destroy the rest of the flow.

### The Rule: Contextual Timing Only

Never request multiple permissions in sequence on the same screen or in the first 60 seconds. Request each permission at the moment the user needs the feature it enables.

| Permission | When to ask |
|---|---|
| Notifications (`push-notifications`) | After user completes a task that has a time dimension, or after they enable a reminder feature |
| Location | When user taps a map, a nearby search, or a feature that is clearly location-dependent |
| Camera / microphone | When user taps the camera button or a record action |
| Contacts | When user taps "Find friends" or "Invite", never before |
| ATT (App Tracking Transparency) | After the user has experienced value — Day 1 retention improves when ATT is requested post-activation |
| Health / HealthKit | When user navigates to the health integration section |
| Photos | When user attempts to import or export a photo |

### Pre-Permission Priming Screens

Before every system permission prompt, show a custom priming screen. This is a single screen — not a modal — that explains:

- What the permission is for (one sentence, plain language)
- What the user will gain by granting it
- That they are about to see an iOS prompt

**Effective priming screen anatomy:**

```
[Icon representing the feature, not the permission]

"[App name] uses your location to show nearby [things]."

"We never store your location or share it with third parties."

[Allow button — primary, full width]
[Not now — secondary, text link]
```

Then immediately trigger the system prompt. The user who taps "Allow" on your screen will almost always allow the system prompt too.

### NSUsageDescription Strings

Short, honest, specific. Review rejects vague strings.

Bad: `"This app needs your location."`
Good: `"Your location is used to show [Feature Name] results near you. It is never stored on our servers."`

For ATT specifically, the `NSUserTrackingUsageDescription` must not imply tracking is optional when it is required for core function, and must not make claims about sharing that you cannot enforce. See `privacy-manifest` for the full list of required reasons API declarations.

---

## Sign-Up Friction

### Default Position: Let Users Try First

Unless your app has zero utility without an account (real-time multiplayer, sync-first tools), let users reach the activation event without signing in. Require an account only when they want to save, sync, or share.

Implementation options in order of preference:

1. **Anonymous account (preferred)** — Create a silent, unauthenticated session on first launch. Persist local data. Prompt to "save your progress" with Sign in with Apple when the user has something worth saving.
2. **Guest mode** — Explicit "Continue without account" path. Data is device-local. Prompt to sign in at a natural save point.
3. **Deferred sign-up wall** — Force sign-in only when the user attempts a feature that requires a server-side identity (share, sync, leaderboard).

Never put a sign-in wall before the activation event unless the app is inherently identity-first (social, banking).

### Sign In With Apple

Offer Sign in with Apple as the primary option on every sign-up screen. Apple requires it when any third-party social login is offered. Beyond compliance:

- Zero-friction for users already authenticated on device
- Built-in Hide My Email reduces friction for privacy-conscious users
- Apple handles two-factor; you inherit that trust

Ordering on the sign-up screen: Sign in with Apple first, other social options second, email/password last.

### Minimize Required Fields

If you have a traditional form, audit each field:

| Field | Keep? |
|---|---|
| Email | Only if required for account; skip if using Sign in with Apple |
| Password | Skip if using Sign in with Apple or passkey |
| Full name | Almost never needed at sign-up; ask post-activation |
| Phone number | Only if SMS verification is core to your security model |
| Birthday / age | Only if required for legal compliance (COPPA, etc.) |
| Profile photo | Defer; never required at sign-up |

If you need more than email + password for a traditional account, question why.

### Passkeys

Offer Passkeys (`AuthenticationServices`) as the credential type for new accounts. Passkeys eliminate password fatigue, have zero phishing surface, and are the direction Apple is explicitly pushing. For new apps, passkeys + Sign in with Apple covers nearly all users.

---

## Onboarding Paywall Placement

If the app has a free trial or a hard paywall, placement matters enormously. Two models work:

**Post-activation paywall** — Show the paywall after the user has experienced the activation event. They understand the value; conversion rates are higher; App Store Review has no reason to flag the flow as deceptive. Hand off to `paywall-design` for screen anatomy and StoreKit 2 integration.

**Soft-gate model** — Let users access a subset of features indefinitely. Surface the paywall contextually when they attempt a premium feature. This performs best for utility and productivity apps.

Avoid: paywalls on screen 1 or 2 before the user has done anything. This is increasingly flagged in App Store Review as "misleading" and user reviews will mention it.

---

## Copy and Empty States

### Onboarding Copy Principles

Align with `apple-design-language` voice guidelines:

- Lead with benefit, not feature name. "See what is near you" not "Location Feature Enabled".
- Use second-person, present tense. "You are set up." not "Setup complete."
- Avoid exclamation marks. Apple's own onboarding does not use them; they undercut authority.
- Permission priming copy: state the user benefit first, data handling second.

### First Empty State

The state the user sees immediately after completing sign-up or activating an account is the most important empty state in the app. It must:

1. Confirm they are in the right place
2. Show exactly one clear call to action that leads to the activation event
3. Not list every feature the app has

See `apple-design-language` for illustration, icon, and layout guidance on empty states.

### Accessibility of the Onboarding Flow

Run every onboarding screen through VoiceOver before shipping. Common failures:

- Images without `accessibilityLabel`
- Custom "Allow" / "Skip" buttons not reachable by VoiceOver
- Progress indicators (dots) not announcing step count
- Priming screen dismiss gestures not supported by Switch Control

See `ios-accessibility` for the full audit checklist and Dynamic Type compliance requirements. The onboarding flow is the first experience a user with accessibility needs has with your product; a broken flow causes immediate uninstalls.

---

## Measurement

Instrument the onboarding funnel before shipping. Without data you cannot improve it. See `app-analytics` for event schema and funnel setup.

### Events to Track

| Event | Properties |
|---|---|
| `onboarding_started` | app version, device model, iOS version |
| `onboarding_step_viewed` | step index, step name |
| `onboarding_step_completed` | step index, step name, time on step |
| `permission_priming_viewed` | permission type |
| `permission_system_prompt_shown` | permission type |
| `permission_granted` | permission type |
| `permission_denied` | permission type |
| `signup_started` | method (apple, email, guest) |
| `signup_completed` | method, time to complete |
| `onboarding_skipped` | step where user tapped skip |
| `activation_event` | (your custom event name) |

### Metrics That Matter

- **Day-1 activation rate** — percentage of installs that reach the activation event within 24 hours. Target varies by app type; under 40% for a simple utility is a red flag.
- **Step-by-step drop-off** — waterfall chart from `onboarding_started` to `activation_event`. Any single step with more than 20% drop-off is a problem.
- **Permission grant rates** — track per permission type. Below 50% for notifications or ATT usually means the priming screen is weak.
- **Time to activation** — median minutes from first launch to activation event. Long times (over 5 minutes for a simple app) indicate friction.
- **D1 / D7 / D30 retention** — see `retention-optimization` for cohort analysis and benchmarks.

---

## Onboarding Audit Output Template

Use this as a deliverable when auditing an existing flow.

```
ONBOARDING AUDIT — [App Name] — [Date]

ACTIVATION EVENT
Defined: [yes / no — state the event]

FLOW SUMMARY
Total screens: [n]
Total taps to activation: [n]
Required input screens: [n]
Pure marketing screens (recommend cut): [n]

PERMISSION PROMPTS
Permissions requested before activation event: [list]
Priming screens present: [yes / no per permission]
NSUsageDescription quality: [pass / fail per permission]
ATT request timing: [before / after activation]

SIGN-UP FRICTION
Sign in with Apple offered: [yes / no]
Account required before activation: [yes / no]
Guest / anonymous mode available: [yes / no]
Required fields at sign-up: [list]

COPY AUDIT
Benefit-led copy on key screens: [yes / no]
Empty state CTA clarity: [1–5]
Accessibility labels present: [yes / no]

MEASUREMENT
Funnel events instrumented: [yes / no]
Activation event tracked: [yes / no]
Permission grant rates visible: [yes / no]

TOP 3 RECOMMENDATIONS
1. [Highest-impact change]
2. [Second change]
3. [Third change]

HANDOFFS
- Paywall screen: paywall-design
- Privacy / ATT declarations: privacy-manifest
- Push priming: push-notifications
- Accessibility audit: ios-accessibility
- Analytics schema: app-analytics
- Retention cohorts: retention-optimization
- App Intents for re-engagement: app-intents
- Copy and empty state design: apple-design-language
```

---

## Quick Checklist

- [ ] Activation event defined and tracked
- [ ] Flow reaches activation in 10 taps or fewer
- [ ] Welcome / feature-tour screens removed or cut
- [ ] Account creation deferred; guest or anonymous mode available
- [ ] Sign in with Apple offered as primary option
- [ ] No permission requested before it is contextually needed
- [ ] Priming screen precedes every system permission prompt
- [ ] NSUsageDescription strings are specific and honest
- [ ] ATT prompt fires post-activation
- [ ] Paywall placement is post-activation (hand off to `paywall-design`)
- [ ] Empty state has exactly one CTA pointing at activation
- [ ] VoiceOver navigates all onboarding screens correctly (hand off to `ios-accessibility`)
- [ ] Full funnel instrumented; Day-1 activation rate baseline captured (hand off to `app-analytics`)
- [ ] Retention cohorts set up to measure onboarding changes over time (hand off to `retention-optimization`)

<!-- END SKILL: onboarding-optimization -->

---

<!-- BEGIN SKILL: overlay-sync -->

# overlay-sync

# Overlay Sync

> **Purpose:** Keep a project's thin **overlay skills** (`.claude/skills/<prefix>-<engine>/SKILL.md`) generated from one declarative descriptor, so they never drift and never get hand-maintained. Idempotent — run it any time, in any Apple-dev project.
> **Trigger:** You added an engine→project binding, changed the descriptor, an engine shipped a new overlay template, or you want a CI check that committed overlays match.

## Why this exists

The toolkit uses a **two-layer pattern**: a generic *engine* skill in `apple-dev-skills` (e.g. `design-handoff`, `swiftui-micro-craft`) plus a thin *overlay* in each project that binds it to that project's apps, schemes, and paths. Hand-writing and hand-updating those overlays is exactly the kind of duplicated, drift-prone work CLAUDE.md's "one source of truth" rules forbid. `overlay-sync` makes the overlay a **generated artifact** of one descriptor — one source, many consumers.

## How it works

```
.claude/apple-overlays.json   →   node sync.mjs   →   .claude/skills/<prefix>-<engine>/SKILL.md
   (you author this)              (this skill)         (generated; managed region only)
```

1. You author `.claude/apple-overlays.json` once — which engines to overlay, and the project bindings (apps, schemes, dirs, design language).
2. `sync.mjs` finds each engine's shipped `overlay-template.md` (it lives beside this skill in the same plugin), fills `{{placeholders}}` from the descriptor, computes the apps table/bindings, and writes each overlay SKILL.md.
3. It regenerates **only the managed region** (top of file through the `<!-- END <engine>:managed -->` marker). Anything you write *after* that marker (project notes, gotchas) is preserved across syncs.

**Idempotent:** unchanged descriptor + unchanged template ⇒ byte-identical output, reported `unchanged`. Re-running is always safe.

## Usage

```bash
# Generate/refresh all overlays declared in the descriptor:
node "<skill-dir>/sync.mjs"

# Custom descriptor path:
node "<skill-dir>/sync.mjs" --descriptor path/to/apple-overlays.json

# CI / pre-commit: no writes, exit 1 if any overlay is out of sync:
node "<skill-dir>/sync.mjs" --check
```

Run from the **project root** (the script writes under `./.claude/skills/`). It needs Node 18+ and has zero external dependencies.

`<skill-dir>` is wherever this skill's `sync.mjs` was installed. The script auto-locates its engine templates across every platform's layout; if you installed it somewhere non-standard, point it explicitly with `--templates-dir <dir>` (or set `OVERLAY_SYNC_TEMPLATES_DIR`).

### Per-CLI invocation

Each CLI flattens the skill bundle differently, so the script ships in a slightly different place — but invocation is the same idea (`node <script> [--check]`):

| CLI | How to run |
|-----|-----------|
| **Claude Code / Cursor** | `/overlay-sync [--check]` (slash command), or `node .claude/skills/overlay-sync/sync.mjs`. |
| **cimi** (Claude Code via Kimi API) | Same as Claude Code — it reads `.claude/`. |
| **Kimi Code** (standalone) | `/overlay-sync [--check]` (bundled command), which runs `node ~/.kimi-code/skills/apple-dev/scripts/overlay-sync.mjs`. |
| **Codex / Agy / Antigravity** | No commands — run the bundled script directly: `node <skills-dir>/overlay-sync__sync.mjs [--check]` (templates travel beside it as `<engine>__templates/`). |

> **Output namespace:** overlays are always written to `.claude/skills/` (the Claude namespace). Claude Code / cimi consume them directly; the other CLIs read their own skills dirs, so they *generate* the overlays but don't load them. That's intended — these app repos are Claude-primary.

## The descriptor — `.claude/apple-overlays.json`

JSON (not YAML) so it parses with zero dependencies. Start from `<skill-dir>/templates/apple-overlays.example.json`.

```json
{
  "project": "Aether",
  "prefix": "aether",
  "overlays": [
    {
      "engine": "design-handoff",
      "vars": {
        "captureCommand": "cd apps/<app> && bundle exec fastlane ios_screenshots",
        "handoffPathPattern": "apps/{app}/design-handoff/",
        "hostPolicy": "…",
        "apps": [
          { "name": "ember", "scheme": "AetherEmber-Screenshots", "dir": "apps/ember",
            "screenshotsDir": "apps/ember/design-handoff",
            "designLanguage": "Dark-mode-only; brass dial; sunset/amber arc; …" }
        ]
      }
    }
  ]
}
```

| Field | Meaning |
|-------|---------|
| `project` | Human project name (used in titles/descriptions). |
| `prefix` | Overlay name prefix → `.claude/skills/<prefix>-<engine>/`. |
| `overlays[].engine` | Engine skill to overlay (must be installed in this plugin and ship `templates/overlay-template.md`). |
| `overlays[].name` | Optional explicit overlay name; default `<prefix>-<engine>`. |
| `overlays[].vars` | Values for the engine template's `{{placeholders}}`. `apps` is rendered into the table + bindings automatically. |

Unspecified template vars fall back to sensible defaults, so a minimal descriptor still produces a valid overlay.

## Adding a new overlay to a project

1. Add an entry to `overlays[]` (engine + vars).
2. Run `node "<skill-dir>/sync.mjs"`.
3. Commit the descriptor **and** the generated `.claude/skills/<prefix>-<engine>/SKILL.md` together.

### Overlay-able engines

These engines ship `templates/overlay-template.md` and can be overlaid:

| Engine | Binds | Key vars |
|--------|-------|----------|
| `design-handoff` | apps, schemes, capture host | `apps`, `captureCommand`, `handoffPathPattern`, `hostPolicy` |
| `submission-preflight` | app identity, which type packs apply, demo creds | `appName`, `appStoreId`, `bundleIds`, `appTypes`, `demoCredsPath`, `complianceNotes` |
| `asc-aso` | listing identity, locales, seed keywords | `appName`, `appStoreId`, `categories`, `locales`, `keywordTargets`, `conversionNotes` |
| `review-management` | app identity, territories, response voice | `appName`, `appStoreId`, `territories`, `voice`, `supportLink`, `responseNotes` |

All vars are optional — each falls back to a sensible default, so a minimal entry still produces a valid overlay.

### Multi-app projects

`design-handoff` renders a multi-app table from `vars.apps`. The ASC engines bind **one app per overlay** — give each its own entry with an explicit `name` so the output dirs don't collide:

```json
{ "engine": "submission-preflight", "name": "aether-ember-preflight", "vars": { "appName": "Aether Ember", … } },
{ "engine": "submission-preflight", "name": "aether-cadence-preflight", "vars": { "appName": "Aether Cadence", … } }
```

## Authoring an engine so it can be overlaid

Any engine skill becomes overlay-able by shipping `templates/overlay-template.md` with:
- YAML frontmatter using `{{overlayName}}` / `{{overlayDescription}}`,
- a managed block delimited by `<!-- BEGIN <engine>:managed … -->` … `<!-- END <engine>:managed -->`,
- `{{placeholders}}` inside the managed block,
- a free tail after the END marker for project notes (preserved across syncs).

`design-handoff` is the reference implementation.

## Error handling

| Symptom | Cause | Fix |
|---------|-------|-----|
| `descriptor not found` | No `.claude/apple-overlays.json` | Copy the example template and edit |
| `engine template not found for "<x>"` | Engine not installed, or it ships no overlay template | Install the engine plugin / add `templates/overlay-template.md` to it |
| `--check` exits 1 | Committed overlay drifted from descriptor/template | Run without `--check`, commit the result |
| Unresolved `{{placeholder}}` warning | Template var not supplied and no default | Add it to the overlay's `vars` |
| Hand edits to an overlay disappeared | They were inside the managed region | Move them below the `END … managed` marker |

## Cross-references

- Reference engine that ships an overlay template: `design-handoff`
- Other overlay-able engines: `submission-preflight`, `asc-aso`, `review-management`
- The two-layer convention this generalizes: `swiftui-micro-craft` ↔ project micro-craft overlays

<!-- END SKILL: overlay-sync -->

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
- Get the copy right (see `apple-design-language`): value-led headline, sentence-case benefits, precise CTA verb, and a designed error state for failed/restored purchases.
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

<!-- BEGIN SKILL: rating-prompt-strategy -->

# rating-prompt-strategy

# Rating Prompt Strategy

**Prompt at the right moment, earn the rating you deserve — Apple controls the rest.**

You get at most three system-managed prompts per 365 days per device. Apple may suppress every one of them. Your only lever is *when* you ask and *who* you ask. Done right, you surface prompts to users who are genuinely delighted, maximize the probability Apple actually shows the dialog, and grow your average rating without ever gaming the system.

---

## Apple's Rules, Precisely

| Constraint | Detail |
|---|---|
| API | `SKStoreReviewRequest.requestReview(in:)` (UIKit) / `requestReview` environment action (SwiftUI) / `AppStore.requestReview(in:)` (iOS 18+) |
| Throttle | System enforces ~3 prompts per 365 days per device; calls beyond that are silently ignored |
| Display guarantee | None. Apple may suppress the prompt entirely — especially if the user has already rated, if they dismissed recently, or based on undisclosed internal signals |
| Custom star gates | Forbidden. You may not show a custom 1–5 star UI that routes low scores away from the App Store and only sends happy users to rate. Guideline 1.1 and Review Guideline 5.6.1 both prohibit this |
| Incentivized reviews | Forbidden. Never offer rewards, currency, or features in exchange for a rating |
| Timing control | Entirely yours — call the API whenever you want, but Apple decides whether to render the prompt |

**Takeaway:** treat each of your three annual calls as a budget line. Spend them on your most satisfied users at your most confident moments.

---

## The Modern Swift API

### SwiftUI (recommended)

```swift
import StoreKit
import SwiftUI

struct TaskCompleteView: View {
    @Environment(\.requestReview) private var requestReview
    @AppStorage("lastReviewedVersion") private var lastReviewedVersion = ""
    @AppStorage("promptsThisYear") private var promptsThisYear = 0
    @AppStorage("firstPromptDate") private var firstPromptDate = 0.0

    var body: some View {
        VStack { /* … */ }
            .onAppear { maybeRequestReview() }
    }

    private func maybeRequestReview() {
        let currentVersion = Bundle.main.appVersion
        guard lastReviewedVersion != currentVersion else { return }
        guard promptsThisYear < 3 else { return }

        let now = Date.now.timeIntervalSinceEpoch
        if promptsThisYear == 0 { firstPromptDate = now }
        let yearInSeconds: Double = 365 * 24 * 3600
        guard now - firstPromptDate < yearInSeconds else {
            // Reset annual budget
            promptsThisYear = 0
            firstPromptDate = now
            return
        }

        requestReview()
        lastReviewedVersion = currentVersion
        promptsThisYear += 1
    }
}
```

### UIKit / iOS 18+

```swift
// iOS 18+
import StoreKit

func promptIfEligible(scene: UIWindowScene) {
    AppStore.requestReview(in: scene)
}

// iOS 16–17 fallback
func promptLegacy(scene: UIWindowScene) {
    SKStoreReviewController.requestReview(in: scene)
}
```

Keep a `Bundle` extension for `appVersion` (`CFBundleShortVersionString`). Do not use build number — minor builds should not reset version-gating.

---

## Timing: When to Call

### The Rule

Prompt only after a user completes a meaningful, positive action. The system prompt should feel like a natural pause, not an interruption.

### High-Signal Trigger Moments

| Moment | Signal Strength | Notes |
|---|---|---|
| Completed a core task for the Nth time (N = 3–5) | Very high | User has formed a habit |
| Hit a streak milestone | High | Emotional peak, not mid-task |
| Finished onboarding successfully | Medium-high | Only if onboarding delivers clear value |
| First purchase confirmed | High | Post-transaction, after success screen |
| Returned after 7+ days away | Medium | Re-engagement moment |
| Reached a goal or level | High | Celebratory context |

### Hard Prohibitions

- Never prompt on cold launch (App Store guidelines, and users are not yet in a positive frame)
- Never prompt after an error, crash, or failed action
- Never prompt mid-task (during a flow, modal, or form)
- Never prompt during a paywall interaction
- Never prompt the same app version twice per device

---

## Pre-Prompt Gating: Detect Satisfaction Without a Custom Star Screen

You cannot build a "are you enjoying the app?" 1–5 screen and only send 4–5 stars to the App Store. That is guideline-violating dark pattern territory.

What you *can* do: use behavioral signals to determine satisfaction before spending a prompt call.

```swift
struct SatisfactionGate {
    static func isSatisfied(engagement: EngagementTracker) -> Bool {
        engagement.sessionsThisWeek >= 3
        && engagement.lastActionSucceeded
        && !engagement.hadErrorInLastSession
        && !engagement.isFirstWeek
    }
}
```

If a user does not pass the gate, do not call `requestReview`. Optionally surface a passive, non-intrusive feedback path — a "Send Feedback" button in Settings, a shake-to-report gesture, or a support link — so dissatisfied users can reach you without leaving a bad review out of frustration.

This is the correct pattern: satisfied users get the prompt, dissatisfied users get a support path. You are not routing based on predicted star rating; you are routing based on readiness.

---

## Version-Gating and Budget Planning

### Version Gate

Track the last app version that triggered a prompt. Do not re-prompt on the same version. Reset when a new version ships.

```swift
let versionKey = "lastReviewPromptVersion"
let current = Bundle.main.appVersion
guard UserDefaults.standard.string(forKey: versionKey) != current else { return }
// … call requestReview …
UserDefaults.standard.set(current, forKey: versionKey)
```

### Spreading the 3-Per-Year Budget

| Prompt | Recommended Timing | Target User State |
|---|---|---|
| Prompt 1 | ~30 days post-install (or after 5 completed core tasks) | Early adopters who stuck around |
| Prompt 2 | ~90 days post-install, or after major feature use | Retained, habitual users |
| Prompt 3 | ~180–240 days (or after a significant milestone) | Power users, loyalists |

Avoid clustering prompts. If you release frequently, hold prompt 2 and 3 for versions with meaningful feature additions — users who just updated and see value are more likely to rate 5 stars.

---

## Rating Recovery After a Bad Version

A bad release — crashes, data loss, broken flows — will spike 1-star reviews. The recovery playbook:

1. **Fix first, prompt never.** Do not call `requestReview` on the bad version. Suppress prompts until the fix ships.
2. **Ship the fix rapidly.** Expedited review is available for critical bug fixes.
3. **Reply to negative reviews.** Use the `review-management` skill to craft developer responses that acknowledge the issue and announce the fix. Responses are public and visible to prospective users.
4. **Resume prompting on the fix version.** Target users who update and then complete a successful core task — they have lived through the bad version and seen you fix it, which is itself a trust signal.
5. **Monitor the trend.** Use `app-analytics` to watch your rolling average rating and `asc-aso` to track keyword ranking impact (ratings affect ranking). Give the recovery 2–4 weeks before assessing.
6. **Do not manufacture reviews.** Never solicit reviews from friends/family accounts or use review exchange services.

---

## Unhappy User Path

Do not suppress the App Store prompt for users you think will rate low. Do build a *parallel* feedback path so dissatisfied users can reach you before they decide to vent in a review.

Recommended placements:

- **Settings screen**: "Send Feedback" → `mailto:support@yourapp.com` or a support form
- **Shake to report**: `UIFeedbackGenerator` pattern, present a support sheet
- **Post-error**: show a "Something went wrong — let us know" banner with a feedback link, not a rating prompt

This is not a gate. Both paths exist independently. You are increasing the probability that a frustrated user contacts you rather than reviewing, while giving satisfied users the system prompt.

---

## Integration with Other Skills

| Skill | Integration Point |
|---|---|
| `review-management` | Reply to reviews surfaced by prompts; coordinate messaging after bad-version recovery |
| `app-analytics` | Track rating trends, session depth, retention curves to calibrate trigger thresholds |
| `asc-aso` | Monitor how rating average and volume affect keyword ranking and conversion on the product page |
| `retention-optimization` | Share engagement signals — streak data, session frequency, task completion — to power the satisfaction gate |

---

## Output Template: Rating Strategy Plan

Use this when shipping a new app or resetting strategy for a new year:

```
App: [name] | Version: [x.y] | Date: [yyyy-mm-dd]

TRIGGER MOMENTS
---------------
Prompt 1: [event] at [milestone] — target [user segment]
Prompt 2: [event] at [milestone] — target [user segment]
Prompt 3: [event] at [milestone] — target [user segment]

SATISFACTION GATE CONDITIONS
-----------------------------
- Sessions this week >= [N]
- No error in last session
- Core task completed >= [N] times total
- App installed >= [N] days

UNHAPPY USER PATH
-----------------
- Settings > Feedback: [mailto / form URL]
- Shake-to-report: [yes / no]
- Post-error banner: [yes / no]

BUDGET TRACKING (reset annually)
---------------------------------
Prompt 1 fired: [date / not yet]
Prompt 2 fired: [date / not yet]
Prompt 3 fired: [date / not yet]

RECOVERY PLAN (if applicable)
------------------------------
Bad version: [x.y] | Issue: [description]
Fix version: [x.y] | Ship date: [date]
Reviews replied to: [yes / partial / no]
Resume prompting on version: [x.y]

EXPECTED LIFT
-------------
Baseline rating: [current]
Target rating in 90 days: [goal]
Review volume goal (monthly): [N]
Conversion rate assumption: [~0.5–2% of prompted users]
```

---

## Common Mistakes

| Mistake | Why It Matters | Fix |
|---|---|---|
| Calling `requestReview` on app launch | Interrupts user before any positive experience; Apple likely suppresses it anyway | Move to a post-task moment |
| Building a custom 1–5 star gate | Violates App Store guidelines, risk of removal | Use behavioral gating, not self-reported sentiment |
| Prompting the same version repeatedly | Wastes budget; Apple deduplicates by version internally | Track `lastReviewedVersion` in `UserDefaults` |
| Not tracking the annual budget | Can silently exhaust all 3 calls on low-signal moments | Store `promptsThisYear` and `firstPromptDate` |
| Prompting immediately after a crash fix | Users may still distrust the app | Wait for 1+ successful session post-update |
| Ignoring negative reviews after prompting | Prompting raises visibility; unanswered negative reviews hurt conversion | Use `review-management` to reply within 48 hours |

---

## Checklist

- [ ] Using `SKStoreReviewRequest` / `requestReview` environment action — no third-party prompt SDKs
- [ ] Version gate implemented: same version never triggers twice
- [ ] Annual budget tracked: no more than 3 calls per 365-day window
- [ ] Trigger moments are post-success, never on launch or post-error
- [ ] Satisfaction gate uses behavioral signals, not a custom star screen
- [ ] Unhappy user path exists independently (Settings feedback link at minimum)
- [ ] Bad-version suppression: prompts off during known defect window
- [ ] `review-management` workflow connected for reply cadence
- [ ] `app-analytics` monitoring rating trend and review volume post-launch

<!-- END SKILL: rating-prompt-strategy -->

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

<!-- BEGIN SKILL: retention-optimization -->

# retention-optimization

# Retention Optimization

**Turn one-time openers into users who come back, form habits, and stay.**

---

## The retention framework

Retention is not a single number — it is a pipeline with three stages. Fix them in order; adding notifications before the activation event is fixed is noise.

```
Activation  →  Habit formation  →  Long-term engagement
```

**Activation** — the moment the user gets undeniable value for the first time. Every app has exactly one activation event. Find yours: it is the action that, when users take it on day 0, predicts they will still be present on day 7.

**Habit loop** — four steps that repeat:

| Step | What it means in your app |
|------|---------------------------|
| Trigger | External (push, widget) or internal (urge, cue) |
| Action | The lowest-friction path to value |
| Variable reward | An outcome that feels good and is slightly uncertain |
| Investment | Data, content, or personalization the user puts in, raising switching cost |

**Long-term engagement** — the loop runs without constant external prodding. The user has made your app part of their routine.

> Implication: if activation is broken, fix `onboarding-optimization` first. If the habit loop is thin, redesign the core action before wiring up notifications.

---

## Reading retention curves

Pull cohort data from **App Store Connect App Analytics** (the `app-analytics` skill covers the full query flow). Navigate to **Analytics → Retention** and select cohort size (weekly is most actionable) and time window.

### What "good" looks like by app type

| App type | D1 | D7 | D30 | Characteristic shape |
|----------|----|----|-----|----------------------|
| Casual / hypercasual game | 35–45% | 15–25% | 6–12% | Steep drop, flat tail |
| Puzzle / mid-core game | 40–55% | 20–35% | 10–20% | Slower drop |
| Social / messaging | 60–75% | 45–60% | 30–45% | High floor |
| Utility / productivity | 30–50% | 20–35% | 12–25% | Slow decay, high if habit forms |
| Health / fitness | 30–45% | 18–28% | 8–18% | Spikes around resolution dates |
| Finance / subscription | 50–65% | 35–50% | 20–35% | Step-function drops at billing |

These are competitive benchmarks, not ceilings. What matters most is **where the curve flattens** — your retained core — and **where it drops sharply** — your biggest leak.

### Diagnosing the curve shape

- **Near-vertical D0→D1 drop:** onboarding is not delivering the activation event. Fix onboarding first (see `onboarding-optimization`).
- **D1–D7 slide without flattening:** no habit loop has formed. The trigger or reward is missing.
- **Step-function drop at D30:** often a subscription billing moment; check involuntary churn and `subscription-lifecycle`.
- **Curve that flattens early (low but stable):** you have a retained core — grow it, don't over-optimize for the churned majority.

---

## Churn diagnosis: fix the leak before adding re-engagement

Adding notifications to a leaky funnel accelerates churn by annoying the users who might have stayed.

**Step 1 — Identify the drop-off step.** In ASC Analytics, compare the actions users take before and after each major retention milestone. Segment by acquisition source if volumes allow.

**Step 2 — Instrument it.** Place analytics events at every screen transition and key action in the first session and the second session. Use `app-analytics` to capture and query these events. You cannot diagnose what you cannot measure.

**Step 3 — Form a hypothesis.** Common root causes:

- Missing activation event — user never got the "aha."
- Too many steps before value — trim `onboarding-optimization`.
- App opened once for a specific task, then nothing else pulls the user back — the trigger is absent.
- Core action is too slow or confusing — see `performance-instruments` and `apple-design`.
- Content or data goes stale — the variable reward disappears.

**Step 4 — Fix the leak, then measure.** Re-pull the cohort curve two weeks after the fix ships. If D7 moved, the hypothesis was correct.

---

## Re-engagement levers (Apple-native only)

Apply these in the order they are listed — each one reaches users at progressively higher commitment.

### 1. Notification sequences (Days 0/1/3/7)

Well-timed, low-volume notifications are the most direct re-engagement lever. Design them with restraint.

**Permission timing:** Never ask on launch. Ask at a moment of high intent — after the activation event, after the user voluntarily completes a meaningful action. Delegate the permission ask to `onboarding-optimization`, which owns the first-session flow.

**Sequence template:**

| Day | Purpose | Tone | Content example |
|-----|---------|------|-----------------|
| 0 (evening, ~6 h after install) | Completion / reinforce activation | Warm, encouraging | "You tracked your first 3 habits. You're on a roll." |
| 1 | Habit trigger — remind them why they downloaded the app | Direct, low friction | "Your 8 am check-in is ready." |
| 3 | Variable reward / social proof | Curious, slightly surprising | "You're in the top 20% of new users this week." |
| 7 | Investment reinforcement | Value-framing | "You've built 7 days of data. Here's what it shows." |

Rules:
- Maximum 1 notification per day in the first 7 days, then back off to what the user opted into.
- Every notification must be actionable — tap it and land on the exact relevant screen, never the app root.
- Use `interruption-level: .timeSensitive` only when the content is genuinely time-sensitive. Use `.passive` for informational nudges that do not need to interrupt a Focus.
- Respect Focus filters (see below) — a notification that fires during a user's Work Focus and has no relevance to work will be silenced and may be permanently disabled.
- If the user silences your notifications in Settings, the next best path is widgets.

See `push-notifications` for APNs payload, interruption levels, and notification service/content extensions.

### 2. Home Screen and Lock Screen widgets

Widgets create passive re-engagement without requiring the user to act on a notification. A widget that surfaces a useful at-a-glance value keeps your app present in the user's daily visual field.

Design for widgets:
- Show the user's most personally relevant metric — not generic marketing copy.
- Update via `WidgetKit` timelines on a sensible schedule; don't thrash the battery.
- Small widget: one number or status. Medium: context + CTA. Large: summary + multiple entry points.
- Lock Screen widgets (iOS 16+): small, glanceable, monochrome-friendly.

Lock Screen placement is high-value real estate. Users who add a Lock Screen widget have dramatically higher 30-day retention than those who do not — because the app appears before they even unlock.

See `app-intents` for widget intents and App Shortcuts that make widgets interactive.

### 3. Live Activities and Dynamic Island

For apps with time-bound sessions (workouts, timers, deliveries, game events), Live Activities keep users engaged without an app launch.

- Start a Live Activity when the user begins a session, not proactively.
- Update via push (ActivityKit push token) to reflect real-time state.
- End the activity promptly — stale Live Activities damage trust.
- Dynamic Island compact/expanded/minimal views are the highest-visibility placements on supported hardware.

Pairs with `app-intents` for intent-driven Live Activity actions.

### 4. App Shortcuts and Spotlight

Users who reach your app through Siri or Spotlight show higher retention because the app integrates into their workflow rather than requiring deliberate launch.

- Define `AppShortcutsProvider` with at least one shortcut that completes the core action in one step.
- Donate intents when the user performs repeating actions so Siri Suggestions surface them proactively.
- Spotlight deep links (via `NSUserActivity` and `CoreSpotlight`) let users jump directly to content.

See `app-intents` for the full AppIntents API surface.

### 5. Focus filters

iOS 16+ Focus filters let users configure which apps are relevant during a given Focus (Work, Personal, Sleep). Opt in by implementing `SetFocusFilterIntent`.

- An app that respects Focus filters will not be blocked by them — it adapts.
- Surface only the relevant subset of content during each Focus context.
- Users who configure your app with a Focus filter have a strong signal of intent to use it habitually.

### 6. Email (if applicable)

Email is Apple-native in the sense that it respects user preference and is not dependent on push authorization. Use for:
- Subscription billing receipts and trial-ending reminders (see `subscription-lifecycle`).
- Weekly or monthly digest if your app produces data worth summarizing.
- Win-back campaigns for users who have not opened the app in 30+ days.

Email is not an excuse to avoid fixing in-app triggers. It is a fallback for users who revoked push authorization.

---

## Rating prompts and retention signal

Users who rate your app 4–5 stars are a proxy for your retained, satisfied core. Trigger the system prompt only after a demonstrable success moment — not on a timer, and never during onboarding.

See `rating-prompt-strategy` for timing rules and App Review guidelines on `SKStoreReviewRequest`. A well-timed prompt also surfaces users who are happy enough to write a review, which feeds ASO (see `asc-aso`).

---

## Subscription churn and retention

Involuntary churn (failed billing) is one of the largest, most underestimated retention killers. ASC provides billing-retry status and grace period data.

Tactics:
- Implement a **grace period** (up to 16 days on App Store) — the subscription stays active while Apple retries the charge, so the user never feels interrupted.
- Surface an **in-app billing recovery prompt** at next launch when the grace period is active.
- Track **monthly recurring revenue (MRR) churn rate** separately from user churn — a user can stay active but let the subscription lapse.

See `subscription-lifecycle` for the full billing-state machine and grace-period implementation.

---

## Retention audit output template

Run this audit after every major release and after any significant D1/D7 curve movement.

```
## Retention Audit — [App Name] — [Date]

### Cohort curve (last 4 weeks, all sources)
D1: ___%   D7: ___%   D14: ___%   D30: ___%

Curve shape: [ ] steep-then-flat  [ ] still falling at D30  [ ] flat early

### Biggest leak
Step where the curve drops most sharply: _______________
Hypothesis for cause: _______________
Instrumented? [ ] Yes  [ ] No (instrument before fixing)

### Top 3 fixes
1. _______________  Owner: ___  Target: ___
2. _______________  Owner: ___  Target: ___
3. _______________  Owner: ___  Target: ___

### Re-engagement levers in place
[ ] Notification sequence (Day 0/1/3/7 — restraint-checked)
[ ] Widget (Home Screen and/or Lock Screen)
[ ] Live Activity (if time-bound sessions exist)
[ ] App Shortcut / Spotlight donation
[ ] Focus filter opt-in
[ ] Email fallback (subscription apps)

### Cross-skill dependencies
[ ] onboarding-optimization — activation event confirmed
[ ] push-notifications — APNs payload and interruption levels reviewed
[ ] app-intents — widget/shortcut intents wired
[ ] subscription-lifecycle — grace period and billing recovery active
[ ] rating-prompt-strategy — prompt timing set to post-success moment
[ ] app-analytics — all key events instrumented and queryable in ASC
```

---

## Skill cross-references

| Skill | Handoff point |
|-------|--------------|
| `onboarding-optimization` | Activation event definition; notification permission timing |
| `push-notifications` | APNs registration, payload, interruption levels, extensions |
| `app-intents` | Widgets, Live Activities, App Shortcuts, Focus filters |
| `app-analytics` | Cohort curve data, event instrumentation, ASC App Analytics |
| `subscription-lifecycle` | Grace period, billing-retry state machine, involuntary churn |
| `rating-prompt-strategy` | Post-success prompt timing, SKStoreReviewRequest rules |

<!-- END SKILL: retention-optimization -->

---

<!-- BEGIN SKILL: review-management -->

# review-management

# Review Management

**Turn App Store reviews from noise into signal — and respond in a way that recovers ratings, surfaces real bugs, and builds reviewer trust.**

---

## MCP Tools at a Glance

| Tool | What it does |
|---|---|
| `asc_list_reviews` | Fetch reviews by app, territory, rating, or date range |
| `asc_get_review_detail` | Load full body + metadata for a single review |
| `asc_respond_review` | Post a new developer response |
| `asc_update_response` | Edit an existing response |
| `asc_delete_response` | Remove a response (rarely needed; prefer editing) |

All tools accept the app's `appId` (the numeric App Store ID, not the bundle ID).

---

## Core Workflow: List → Cluster → Triage → Respond → Ship

### Step 1 — Pull Recent Reviews

```
asc_list_reviews(appId, territory="US", rating=null, limit=200, sort="mostRecent")
```

Start broad. Pull the last 200 reviews from your primary territory, unsorted by rating so you see the real chronological stream. Repeat for secondary territories if your user base is multilingual.

**Filters to use situationally:**

- `rating=1` or `rating=2` — when a new build caused a spike in low ratings
- `territory="JP"` — when localizing or debugging region-specific issues
- `sort="mostCritical"` — when you want to prioritize damage control

### Step 2 — Cluster by Theme

Read each review body and assign one primary bucket. Quantify:

| Bucket | Signal it maps to |
|---|---|
| Crash / hang | Engineering — pair with `asc-build-check`, `performance-instruments` |
| Bug / broken feature | Engineering backlog |
| Missing feature | Product roadmap |
| Pricing / paywall | Monetization — pair with `paywall-design` |
| UX confusion | Onboarding, IA, copy |
| Praise | Nothing to fix; optionally use in ASO copy (`asc-aso`) |

A review can touch two buckets; assign it to the dominant one.

### Step 3 — Triage by Priority

Not all one-star reviews are equal. Score each cluster:

1. **Volume** — how many reviews mention this theme?
2. **Recency** — is this cluster growing week-over-week?
3. **Rating weight** — crashes skew 1-star; UX confusion often lands at 2–3.
4. **Respondability** — can you fix it now, acknowledge it honestly, or only apologize?

Clusters with high volume + high recency + no existing response = respond first.

### Step 4 — Draft Responses

Use the HEAR framework (see below). Call `asc_get_review_detail` on representative reviews from each cluster to read the full text before drafting.

```
asc_get_review_detail(reviewId)
```

Draft one canonical response per cluster theme. Personalize lightly — swap in the specific feature name the reviewer mentioned.

### Step 5 — Post Responses

```
asc_respond_review(reviewId, responseBody)
```

Apple's guidelines: responses are public, cannot be longer than 5,970 characters, and are moderated. Responses go live within minutes but can be rejected for policy violations.

To edit a live response after a fix ships:

```
asc_update_response(responseId, responseBody)
```

Update to close the loop: "Update: this is fixed in 4.2, available now."

---

## The HEAR Response Framework

| Step | What you do |
|---|---|
| **H**ear | Restate what the reviewer experienced — show you actually read their review |
| **E**mpathize | Validate the frustration without being sycophantic |
| **A**cknowledge or Apologize | Own the problem if it's yours; acknowledge if it's a limitation |
| **R**esolve | Give a concrete next step: a fix ETA, a workaround, or a support link |

Every response must end with a next step. "We're looking into it" is not a next step.

---

## Response Do / Don't Rules

**Do:**
- Respond within 48 hours of a 1–2 star review appearing
- Use the reviewer's language register (casual app = casual tone)
- Give a version number when a fix is live
- Invite the reviewer to contact support with a direct link
- Update old responses when the underlying issue is resolved

**Never:**
- Argue, defend aggressively, or correct the reviewer's perception
- Ask happy 5-star reviewers to do anything (no "rate us again!", no prompts)
- Reveal personal data or order information
- Promise a specific ship date you cannot guarantee
- Write a response that sounds like a press release

---

## Response Templates

### Crash / Bug

> Thank you for the report — this is clearly not the experience [App Name] should deliver. We've identified a crash affecting [iOS version / device / scenario] and a fix is in review now. In the meantime, [workaround if any]. If you'd like to help us validate the fix before it ships, reach out at [support link] — we'd love to get you on TestFlight.

### Missing Feature

> We hear you — [feature] is one of our most-requested additions. It's on our roadmap, and your feedback moves it up. If you want to be notified when it lands (and get early access), drop us a line at [support link]. We appreciate you taking the time to tell us.

### Pricing / Paywall Complaint

> Fair feedback. [App Name]'s subscription supports [brief honest value statement — e.g., "continuous server costs and weekly content updates"]. We know that doesn't work for everyone. If you'd like to discuss your specific situation, our support team at [link] has options. We want you to feel the value before you pay for it.

### Confused User

> Sorry the [feature / flow] wasn't clear — that's on us to fix. Here's the quick path: [1–2 sentence workaround or explanation]. We're also revising that part of the UI in our next update. If you get stuck, [support link] connects you directly with our team.

### 5-Star Praise

> Thank you — this genuinely means a lot to the team. More good things coming.

Keep praise responses short. Do not solicit anything.

---

## Sentiment Breakdown Output Template

After running the triage workflow, produce this summary before posting any responses:

```
REVIEW TRIAGE — [App Name] — [Date Range]

Total reviews pulled: N
Primary territory: US (+ any others)

SENTIMENT BREAKDOWN
  5-star:  N  (N%)
  4-star:  N  (N%)
  3-star:  N  (N%)
  2-star:  N  (N%)
  1-star:  N  (N%)

THEME CLUSTERS
  Crash / hang:          N reviews  — [top device/OS combo]
  Bug / broken feature:  N reviews  — [top feature affected]
  Missing feature:       N reviews  — [most requested]
  Pricing / paywall:     N reviews  — [specific objection]
  UX confusion:          N reviews  — [screen or flow]
  Praise:                N reviews  — [most-cited positive]

TOP 3 RECURRING ISSUES (by volume + recency)
  1. [Issue] — N mentions, avg rating N.N — Action: [engineering/product/response]
  2. [Issue] — N mentions, avg rating N.N — Action: [engineering/product/response]
  3. [Issue] — N mentions, avg rating N.N — Action: [engineering/product/response]

RESPONSES QUEUED
  - [reviewId] — [1-line summary] — [template used]
  - ...

PRODUCT ACTIONS
  - Bug clusters → engineering backlog ticket
  - Crash cluster → asc-build-check + performance-instruments
  - Paywall cluster → paywall-design
  - Rating trend → rating-prompt-strategy
```

---

## Turning Reviews into a Backlog

Reviews are unstructured user research. Make them structured:

**Crash clusters** — Export review bodies mentioning crash/freeze/hang. Hand them to `asc-build-check` to correlate with build diagnostics and to `performance-instruments` for profiling targets. Include the iOS version and device model that appear most often in the reviews.

**Bug clusters** — File one engineering ticket per distinct bug pattern. Attach the review IDs as evidence. Set priority by cluster size and rating impact.

**Missing feature clusters** — Add each to the product backlog with a review count as the demand signal. Revisit quarterly.

**Paywall / pricing clusters** — Route to `paywall-design` for a conversion audit. A pricing objection in reviews often reflects a paywall UX problem, not a price point problem.

**UX confusion clusters** — Flag the specific screen or flow to design. UX confusion reviews are free usability tests.

**Praise clusters** — Extract the phrases users reach for when describing what they love. Feed these into ASO keywords and screenshots via `asc-aso`.

---

## Rating Recovery Loop

A rating dip after a release follows a predictable arc. Work it explicitly:

1. **Detect** — `asc_list_reviews(sort="mostRecent", rating=1)` immediately after a build ships. A spike within 24 hours means the build broke something.
2. **Diagnose** — Cross-reference with `asc-build-check` crash rates and `performance-instruments` regression data.
3. **Fix + Expedite** — Ship a hotfix. Request expedited review in App Store Connect if the regression is severe.
4. **Respond** — Update every unanswered 1-star review in the affected cohort with the fix version once it's live. Use `asc_update_response` on any responses you already posted.
5. **Prompt recovered users** — After the fix ships, use `rating-prompt-strategy` to surface a re-rating prompt to users who experienced the bug and have since used the fixed version. Never prompt users who haven't opened the fixed build.

Average rating recovery time with this loop: 2–4 weeks after a hotfix ships, assuming active response and a properly timed prompt.

---

## App Rejection Edge Case

If a review mentions behavior that triggers an App Store guideline concern (e.g., "the app charged me without showing a price"), cross-reference with `app-rejection-recovery`. A pattern of reviews describing a guideline violation can precede a removal notice.

---

## Cross-Skill Integration Map

| Situation | Skill to invoke |
|---|---|
| Crash spike in reviews | `asc-build-check`, `performance-instruments` |
| Paywall / pricing objections | `paywall-design` |
| Rating dip recovery | `rating-prompt-strategy` |
| Praise language for ASO | `asc-aso` |
| Guideline-risk review patterns | `app-rejection-recovery` |

---

## Checklist: Weekly Review Cadence

- [ ] Pull last 7 days of reviews (`asc_list_reviews`, limit=100, sort="mostRecent")
- [ ] Assign every review to a theme bucket
- [ ] Respond to all 1–2 star reviews within 48 hours
- [ ] Update stale responses where a fix has shipped
- [ ] Escalate crash / bug clusters to engineering with review IDs
- [ ] Update product backlog with feature request counts
- [ ] Check if any cluster warrants a `rating-prompt-strategy` campaign
- [ ] Spot-check ASO keywords against praise language (`asc-aso`)

<!-- REFERENCE: review-management/templates/overlay-template.md -->

---
name: {{overlayName}}
description: {{overlayDescription}}
---

<!-- GENERATED by overlay-sync from .claude/apple-overlays.json. The region
     between the BEGIN/END managed markers is regenerated on every sync — DO NOT
     hand-edit it. Add project notes BELOW the END marker; those are preserved.
     Vars this engine reads from the descriptor's `vars` (all optional — each has
     a sensible default): appName, appStoreId, territories, voice, supportLink,
     responseNotes. -->

# {{overlayTitle}}

> Thin **project overlay** over the generic `review-management` engine. The engine
> owns the List → Cluster → Triage → Respond → Ship workflow, the HEAR framework,
> the response templates, and the rating-recovery loop. This overlay only binds
> the engine to **{{projectName}}** — the app's identity, the territories to pull,
> the brand voice responses must match, and the support link to route users to.
>
> Run the `review-management` skill; pull reviews with `asc_list_reviews`, then
> draft responses in the voice below.

<!-- BEGIN review-management:managed — generated by overlay-sync, do not edit -->

## App & territories

| Field | Value |
|-------|-------|
| App | {{appName}} |
| App Store ID | {{appStoreId}} |
| Primary territories | {{territories}} |

## Response voice

{{voice}}

## Support link

{{supportLink}}

## Known-issue response mappings

{{responseNotes}}

<!-- END review-management:managed -->

## Project notes (preserved across syncs)

<!-- Add canned responses for recurring themes, escalation contacts, or
     do-not-say lines here. overlay-sync never touches anything below the END
     marker. -->

<!-- END SKILL: review-management -->

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

<!-- BEGIN SKILL: submission-preflight -->

# submission-preflight

# Submission Preflight

**Catch the rejection before Apple does.** This is the adversarial pass you run *before* `asc-submission` submits — it simulates App Review and finds the guideline violations that cost you a 1–3 day rejection cycle each. Build/upload mechanics live in `asc-build-check` and `asc-submission`; privacy-manifest specifics live in `privacy-manifest`; this skill is the *will-it-pass-review* gate.

App Review rejects on patterns, not vibes. The rejection reasons cluster into six buckets, and each app type adds its own. This skill checks the universal buckets, then loads the rule pack for the app's type.

---

## How to run a preflight

1. **Identify the app type** — pick the closest from the table below. An app can match several; load each relevant pack.
2. **Pull live state** via the App Store Connect MCP: `asc_get_app_info`, `asc_get_metadata` (name/subtitle/description/keywords/URLs), `asc_get_privacy` (nutrition label), `asc_get_age_rating`, `asc_list_iaps` / `asc_list_subscriptions`, `asc_check_submission` (what's blocking right now). If MCP access isn't configured, ask the user to paste each field.
3. **Run the universal rule packs** (`references/rule-*.md`) — six buckets, every app.
4. **Run the app-type pack(s)** (`references/type-*.md`).
5. **Report** as a triaged checklist: ❌ will-reject / ⚠️ likely-flag / ✅ clear — each with the guideline number and the concrete fix.
6. **Hand off**: privacy-manifest gaps → `privacy-manifest`; if already rejected → `app-rejection-recovery`; listing/keyword issues → `asc-aso`.

---

## App-type router

| If the app… | Load pack | Highest-risk guideline |
|-------------|-----------|------------------------|
| Any app (always) | `references/type-all-apps.md` | 2.1, 2.3.x, 5.1.1 |
| Sells subscriptions / IAP | `references/type-subscription-iap.md` | 3.1.1, 3.1.2 |
| Social / user-generated content | `references/type-social-ugc.md` | 1.2 |
| Targets or appeals to kids | `references/type-kids.md` | 1.3, 5.1.4 |
| Health / fitness / medical | `references/type-health-fitness.md` | 1.4.1, 5.1.3 |
| Games (esp. loot/gambling-adjacent) | `references/type-games.md` | 3.1.1, 5.3 |
| macOS app | `references/type-macos.md` | 2.4.5, 2.5 |
| Uses AI / generative / chatbot | `references/type-ai-apps.md` | 1.2, 4.3, 5.1.1 |
| Crypto / finance / trading | `references/type-crypto-finance.md` | 3.1.5, 3.2.1 |
| VPN / network / privacy tool | `references/type-vpn-utility.md` | 5.4, 2.5.1 |

---

## The six universal buckets

Each has a rule pack under `references/rules/`. The rule schema is: **What to check → How to detect → Resolution → Example rejection.**

| Bucket | Pack | Catches |
|--------|------|---------|
| **Metadata & assets** | `references/rule-metadata.md` | Inaccurate screenshots, placeholder text, wrong category, beta language, mentioning other platforms, broken support URL (2.3.x) |
| **Privacy** | `references/rule-privacy.md` | Missing privacy policy, nutrition label mismatch, ATT prompt, data collection without consent, missing manifest (5.1.1, 5.1.2) |
| **Purchases** | `references/rule-subscription.md` | IAP not using StoreKit, missing restore, subscription terms, external-purchase steering (3.1.1, 3.1.2) |
| **Design & function** | `references/rule-design.md` | Crashes, broken links, login walls with no demo account, web-wrapper apps, minimum functionality (2.1, 4.2) |
| **Account & legal** | `references/rule-entitlements.md` | Sign in with Apple parity, account deletion, entitlement misuse, export compliance (5.1.1(v), 5.6) |
| **Demo & reviewability** | `references/rule-metadata.md` | No demo credentials, gated content review can't reach, App Review Notes empty |

---

## The highest-ROI checks (if you only do five)

1. **Demo account + App Review Notes.** Any login wall without working demo credentials in App Review Information = automatic 2.1 rejection. Free, 30 seconds, most common avoidable reject.
2. **Account deletion.** If the app supports account creation, it **must** offer in-app account deletion (5.1.1(v)). Settings-only or "email us" fails.
3. **Privacy policy URL + nutrition label truth.** A reachable privacy policy is mandatory; the nutrition label must match what the app actually collects (cross-check with `privacy-manifest`).
4. **Subscription paywall completeness.** Price, period, what's included, restore button, and links to Terms (EULA) + Privacy on the purchase screen (3.1.2). See `paywall-design`.
5. **Screenshots match the current build.** Outdated/marketing-only screenshots that don't show the actual UI are 2.3.10. Re-shoot after UI changes.

---

## Output template

```
## Preflight: <App Name> — <build/version>
App type(s): <e.g. subscription + AI>

### ❌ Will reject (fix before submitting)
- [Guideline X.Y] <issue> → <fix>

### ⚠️ Likely to be flagged
- [Guideline X.Y] <issue> → <fix>

### ✅ Clear
- <bucket> — checked, no issues

### Demo & reviewability
- Demo account: <present / MISSING>
- App Review Notes: <adequate / MISSING>

Recommendation: <SAFE TO SUBMIT / FIX BLOCKERS FIRST>
```

> A preflight that says "safe to submit" and is wrong costs the user a review cycle. Bias toward flagging. When a rule is ambiguous, surface it as ⚠️ with the guideline number rather than silently passing it.

<!-- REFERENCE: submission-preflight/references/rule-design.md -->

# Preflight Rules — Design & Functionality

---

### App Crashes or Bugs on Review  ·  Guideline 2.1  ·  REJECTION
- **What to check:** The app must be stable on all devices and OS versions declared in the submission. Crashes at launch, during core flows, or on specific device classes (iPhone vs iPad, older hardware) are the most common single cause of rejection.
- **How to detect:** `asc_check_submission` for any pre-submission validation warnings. Run the app on the oldest supported OS (check `MinimumOSVersion` in `Info.plist`) using a physical device or Simulator. Review crash logs from TestFlight via `asc_list_beta_feedback`. Cross-ref `performance-instruments` for profiling steps.
- **Resolution:** Fix all crashes and major bugs before submission. Pay special attention to edge cases reviewers will hit: fresh install on a clean account, low-memory conditions, and background-to-foreground transitions.
- **Example rejection:** "We discovered a crash when we tapped the 'Sign Up' button on an iPhone 14 running iOS 17. Please resolve the crash and resubmit."

---

### Broken Links or Placeholder Content in App  ·  Guideline 2.1  ·  REJECTION
- **What to check:** All in-app links (support, help, social, legal), embedded webviews, and displayed content must be live and functional at review time. Placeholder copy, dummy images, or hardcoded "example.com" links fail review.
- **How to detect:** Manual walkthrough of every navigable screen. Tap every outbound link. Inspect embedded webviews for connectivity to a live server. Grep source for "example.com", "TODO", "placeholder", "dummy".
- **Resolution:** Replace all placeholder content with final production content. Ensure backend endpoints referenced by the app are live and accessible from Apple's review network (not behind a VPN or IP allow-list without a workaround for review).
- **Example rejection:** "When we tapped the 'Help' link, it led to a page that returned a 404 error. All links within the app must be functional."

---

### Login Wall with No Reviewer Path  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If the app requires login before showing any functionality, reviewers must be provided with working demo credentials. Apps that show only a login screen with no guest mode and no working credentials are rejected on first review.
- **How to detect:** Fresh-install the app and confirm the very first user-facing screen is reachable without an account, or that `reviewInformation.demoAccountName` / `demoAccountPassword` are present and valid in `asc_check_submission`. Cross-ref `rule-metadata.md` → Missing Demo Account Credentials.
- **Resolution:** Provide demo credentials in App Review Information, or add a guest/browse mode that allows reviewers to see core functionality without creating an account.
- **Example rejection:** "We were unable to evaluate your app because it requires a login and no demo account was provided. Please add demo account credentials in App Review Information."

---

### Minimum Functionality / Too Simple  ·  Guideline 4.2  ·  REJECTION
- **What to check:** The app must provide a meaningful, lasting user experience. Apps that are effectively a single static screen, a countdown timer with no other features, or a simple wrapper around a single webpage do not meet the minimum functionality bar.
- **How to detect:** Count distinct, purposeful user interactions and screens. If the entire app can be fully experienced in under 30 seconds with one tap, it likely fails 4.2. Compare the stated description with actual app features.
- **Resolution:** Add substantive features, content, or interactivity. If the concept is inherently simple, consider distributing it as a widget, App Clip, or iMessage extension instead of a standalone app.
- **Example rejection:** "Your app provides limited functionality and does not offer enough lasting value to remain on the App Store. We encourage you to expand the app's feature set before resubmitting."

---

### Web Wrapper / Pure Webview App  ·  Guideline 4.2  ·  REJECTION
- **What to check:** Apps that are primarily a WKWebView or SFSafariViewController pointed at a website with no native UI, offline capability, or value-add beyond the mobile browser experience are rejected as web wrappers.
- **How to detect:** Review main view controllers — if `UIViewController` hierarchy is dominated by a single `WKWebView` filling the screen and loading a remote URL with no native chrome beyond a back button, it is a web wrapper. Check `AppDelegate` / `SceneDelegate` for any native screen construction.
- **Resolution:** Add native UI, offline content, device integration (notifications, widgets, Siri, etc.), or a curated native UX layer. Alternatively, consider App Clips for lightweight web-enhanced experiences, or direct users to your website via Safari.
- **Example rejection:** "Your app appears to be a simple web view of your website and does not provide the native iOS experience users expect from an App Store app."

---

### Sign-In Required for Features That Don't Need an Account  ·  Guideline 5.1.1(i)  ·  REJECTION
- **What to check:** Users must be able to access the app's core features without being forced to create an account if account functionality is not intrinsic to the service. Forcing sign-up to view a read-only content feed or use a non-personalised feature violates minimum functionality and privacy rules simultaneously.
- **How to detect:** Fresh-install walkthrough: can the user reach any meaningful functionality without creating an account or logging in? If every entry point routes to an account gate, this is a violation.
- **Resolution:** Implement a guest or browse mode for features that do not require server-side personalisation or data sync. Defer sign-in to the moment it is genuinely required (e.g., saving progress, syncing, purchasing).
- **Example rejection:** "Your app requires users to register or log in before they are able to access any content or features. Apps should not require user registration prior to allowing access to app content and features that do not require a personal account."

---

### Spam / Duplicate of Your Own App  ·  Guideline 4.3  ·  REJECTION
- **What to check:** Submitting multiple apps with the same or very similar functionality, or apps that differ only in minor cosmetic details (different colour scheme, different language for the same content), is treated as spam and all versions may be removed.
- **How to detect:** Search your own developer account (or `asc_list_apps`) for existing apps with overlapping feature sets. Identify if the new submission is substantively different in functionality, target audience, or content.
- **Resolution:** Consolidate functionality into a single app using in-app features, localisation, or conditional logic. If differentiation is genuine, document it clearly in App Review Notes.
- **Example rejection:** "Your app appears to be a duplicate of another app in your account. Please review guideline 4.3 and consolidate your apps or differentiate them with unique content or functionality."

---

### Copycat UI or Intellectual Property Infringement  ·  Guideline 4.1  ·  REJECTION
- **What to check:** The app must not replicate the UI, name, icon, or branding of another well-known app in a way that could mislead users or infringe trademarks/copyrights. This includes clone apps of Apple's built-in apps.
- **How to detect:** Visual review of icon, app name, and core UI patterns. Legal review if the design closely resembles a third-party app. `asc_get_metadata` → `name` — search App Store for similar names.
- **Resolution:** Redesign UI elements, rename the app, and ensure the icon is original. If using open-source UI components, verify licences permit App Store distribution.
- **Example rejection:** "Your app's icon and name are confusingly similar to an existing App Store app. Please update your app's branding to differentiate it."

---

### Hidden or Undocumented Features  ·  Guideline 2.3.1  ·  REJECTION
- **What to check:** All features in the binary must be disclosed in the app description and to the reviewer. Features hidden behind server flags that are invisible to reviewers but visible to end users post-approval ("bait and switch") result in removal and potential developer account action.
- **How to detect:** Diff the feature set accessible with the review account versus a normal user account. Identify any runtime checks that disable features when running on Apple's review network (IP-based or account-based gating of features).
- **Resolution:** Either include all features in the review build or explicitly document feature-flag differences in App Review Notes. Never hide features from reviewers that will be shown to users.
- **Example rejection:** "Your app appears to have features that were not available to us during review. Please ensure all app functionality is accessible to App Review and described in your metadata."

---

### Uses Private or Undocumented APIs  ·  Guideline 2.5.1  ·  REJECTION
- **What to check:** Any use of private Apple frameworks, undocumented selectors, or reverse-engineered APIs results in automatic rejection and may trigger static analysis at upload time (ITMS error at binary validation).
- **How to detect:** `asc_check_submission` catches some violations at upload. Static analysis: `nm -gU <binary>` or `otool -ov` to inspect symbol references. Search for known private API names (`UIApplication._sendAction`, `SpringBoard`, `_UIAlertManager`, etc.).
- **Resolution:** Replace all private API usage with supported public equivalents. If no public API exists, the feature must be removed.
- **Example rejection:** "Your app uses the private API _UIConstraintBasedLayoutPlaySoundForceAutolayoutTrace which is not permitted on the App Store."

---

### Placeholder Push Notifications or Non-Working Features  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If the app requests push notification permission, push must be wired to a real backend. Requesting permission and never sending a notification, or sending only hardcoded local notifications without server-side triggers, when the metadata implies a real notification system, is flagged during review.
- **How to detect:** Manual test: grant push permission in review flow and verify that the stated notification use case functions. Check APNs certificate/key configuration in `asc_check_submission`. Confirm server-side push infrastructure is live.
- **Resolution:** Ensure push is fully operational end-to-end before submission. If push is not yet implemented, remove the permission request until it is. Cross-ref `asc-build-check` for APNs capability verification.
- **Example rejection:** "Your app requests permission to send push notifications, but we did not receive any notifications during our review. Please ensure push notifications are working correctly before resubmitting."

---

> Cross-ref: `asc-build-check` for binary validation and build inspection; `performance-instruments` for profiling crashes and performance issues.

<!-- REFERENCE: submission-preflight/references/rule-entitlements.md -->

# Preflight Rules — Entitlements & Compliance

---

### Sign In with Apple Required When Third-Party Social Login Is Offered  ·  Guideline 4.8  ·  REJECTION
- **What to check:** If your app offers any third-party social or federated sign-in (Google, Facebook, Twitter/X, GitHub, etc.) as an authentication option, you must also offer Sign in with Apple as an equivalent alternative. This applies to all apps — not just those that exclusively use third-party login. Exemptions exist for government, enterprise, and education apps that use specific credentialing systems, and for apps where the login is only for accessing non-personal accounts (e.g., business system credentials).
- **How to detect:** Review all authentication entry points. If `ASAuthorizationAppleIDProvider` is not present in the codebase alongside any third-party OAuth SDK (GoogleSignIn, FacebookLogin, etc.), the requirement is unmet. `asc_get_metadata` → `reviewNotes` should describe available sign-in options.
- **Resolution:** Integrate `AuthenticationServices` framework and `ASAuthorizationAppleIDButton`. Handle `ASAuthorizationAppleIDCredential` for both initial sign-in and credential-state verification on subsequent launches. Ensure the Sign in with Apple button is visually equivalent in prominence to other sign-in options.
- **Example rejection:** "Your app offers Sign in with Google but does not offer Sign in with Apple. Apps that offer third-party authentication must also offer Sign in with Apple."

---

### In-App Account Deletion Mandatory  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Any app that allows users to create an account must provide a clearly discoverable, in-app mechanism to fully delete that account and its associated data. Deactivation, suspension, or "contact support to delete" flows are not sufficient. The deletion must be initiatable from within the app without requiring a browser redirect or email request.
- **How to detect:** Navigate to Settings / Profile / Account in the app and confirm a "Delete Account" option exists and initiates deletion. Verify that Sign in with Apple token revocation (`ASAuthorizationAppleIDProvider.revokeToken`) is called for Apple-ID-based accounts. Cross-ref `rule-privacy.md` → Account Deletion rule.
- **Resolution:** Implement an in-app delete account flow. For Sign in with Apple accounts, call the token revocation API. Ensure deletion purges or schedules purge of all user-generated data per applicable privacy laws. Document the path in App Review Notes if it is non-obvious.
- **Example rejection:** "Your app allows users to create an account but does not offer a way to delete the account from within the app. Please add in-app account deletion."

---

### Export Compliance / Encryption Declaration  ·  Guideline 2.5 / US Export Law  ·  REJECTION
- **What to check:** Every app that uses any encryption — including HTTPS/TLS, secure storage, or third-party SDKs that use encryption — must make an accurate export compliance declaration. If `ITSAppUsesNonExemptEncryption` is `YES` in `Info.plist` or in App Store Connect, a valid ERN (Encryption Registration Number) or equivalent exemption documentation is required.
- **How to detect:** Check `Info.plist` for `ITSAppUsesNonExemptEncryption`. Use `asc_set_encryption` (or the equivalent submission API) to declare compliance status. Most apps qualify for the standard exemption (uses only HTTPS and Apple-framework encryption) and should set `ITSAppUsesNonExemptEncryption` to `NO`. Confirm with legal counsel if your app implements custom cryptographic algorithms.
- **Resolution:** Set `ITSAppUsesNonExemptEncryption` to `NO` in `Info.plist` if the app uses only standard encryption (HTTPS via `URLSession`, Apple `CryptoKit`, `Security.framework`, etc.). If non-exempt encryption is used, obtain an ERN from the US Bureau of Industry and Security and upload documentation in App Store Connect before submission.
- **Example rejection:** "Your app uses encryption but has not provided an export compliance declaration. Please select the appropriate export compliance option in App Store Connect."

---

### Entitlements Requested but Unused or Unjustified  ·  Guideline 2.5.x  ·  REJECTION
- **What to check:** Every entitlement in the `.entitlements` file and every capability enabled in the provisioning profile must correspond to an active, reviewer-visible feature in the app. Unused entitlements (e.g., `com.apple.developer.healthkit` in a calculator app) trigger rejection.
- **How to detect:** `codesign -d --entitlements :- <app.ipa>` to list all entitlements. Cross-reference against actual feature usage in code. Common offenders: HealthKit, HomeKit, Associated Domains, Push Notifications, Background Modes when the corresponding feature is stubbed or removed.
- **Resolution:** Remove entitlements and capabilities that are not actively used. For any entitlement that requires usage justification (e.g., HealthKit clinical records, Network Extensions), document the feature in App Review Notes.
- **Example rejection:** "Your app includes the HealthKit entitlement but does not appear to use HealthKit functionality. Please remove unused entitlements from your app."

---

### Background Modes Misuse  ·  Guideline 2.5.4  ·  REJECTION
- **What to check:** Background mode declarations in `Info.plist` (`UIBackgroundModes`) must only be present if the app actively uses them for their declared purpose. Declaring `audio` to prevent suspension without playing meaningful background audio, or declaring `location` for always-on location without a user-facing reason, is a violation.
- **How to detect:** Inspect `Info.plist` → `UIBackgroundModes`. For each declared mode, verify a corresponding real feature exists: `audio` → active audio playback API; `location` → continuous location tracking with explicit user benefit; `fetch` → actual background fetch logic in `application(_:performFetchWithCompletionHandler:)` or `BGAppRefreshTask`.
- **Resolution:** Remove background modes that do not correspond to active features. For legitimate always-on location use, ensure `NSLocationAlwaysAndWhenInUseUsageDescription` is set and the user-facing benefit is clear. Document in App Review Notes.
- **Example rejection:** "Your app declares the audio background mode but does not appear to play audio in the background. Background modes must be used only for their declared purpose."

---

### Entitlement / Capability Mismatch with Functionality  ·  Guideline 2.5.x  ·  REJECTION
- **What to check:** The capabilities enabled in Xcode (and thus in the provisioning profile) must match the entitlements in the signed binary and the features actually present in the app. A mismatch — e.g., Associated Domains enabled but no `apple-app-site-association` on the server, or Sign in with Apple entitlement present but the feature is not implemented — causes build validation failures or rejections.
- **How to detect:** `asc_check_submission` surfaces binary validation errors at upload time. Manually verify: for Associated Domains, that `apple-app-site-association` is reachable at `https://<domain>/.well-known/apple-app-site-association`; for Push Notifications, that the APNs certificate matches the bundle ID; for Sign in with Apple, that the entitlement matches the App ID configuration.
- **Resolution:** Synchronise entitlements, provisioning profile capabilities, App ID configuration in the Apple Developer portal, and actual in-app feature usage. Re-export the archive after any capability change.
- **Example rejection:** "The app has the Associated Domains entitlement enabled, but we could not find a valid apple-app-site-association file at the domain specified. Please ensure your server is correctly configured."

---

### Data-Collection Consent for Sign-In  ·  Guideline 5.1.1  ·  WARNING
- **What to check:** When using Sign in with Apple or any other federated identity provider, any profile data received (name, email) that is stored server-side or used for analytics must be declared in the App Privacy nutrition label and handled in accordance with the stated privacy policy.
- **How to detect:** `asc_get_privacy` → check that "Name" and "Email Address" are declared if collected at sign-in. Verify that the privacy policy covers identity data received from Apple or other providers. Confirm the app does not silently share identity data with third parties.
- **Resolution:** Update the App Privacy label to include any identity data collected during sign-in. Ensure the privacy policy describes how sign-in data is stored, used, and can be deleted (per the account deletion rule above). Cross-ref `rule-privacy.md`.
- **Example rejection:** "Your app collects email addresses at sign-in but this data type is not declared in your App Privacy responses. Please update your privacy information to reflect all data collected."

---

> Cross-ref: `privacy-manifest` for PrivacyInfo.xcprivacy, required-reason APIs, and ITMS-91053/91061; `asc-submission` for the full submission checklist including encryption and export compliance steps.

<!-- REFERENCE: submission-preflight/references/rule-metadata.md -->

# Preflight Rules — Metadata & Assets

---

### Inaccurate Screenshots  ·  Guideline 2.3.10  ·  REJECTION
- **What to check:** Every screenshot and App Preview must accurately represent the current build. Device frames, UI, and features shown must exist in the submitted binary at the same screen shown.
- **How to detect:** Pull current screenshots with `asc_get_metadata` and compare against the app as built. Look for screens from older versions, unreleased features, or mocked-up marketing composites.
- **Resolution:** Capture fresh screenshots directly from the submitted build (or the most recent build targeting that OS/device). Update via App Store Connect or `asc_update_metadata`.
- **Example rejection:** "Your screenshots do not sufficiently reflect the app in use. Screenshot 3 shows a feature not present in the submitted version."

---

### Non-App / Marketing-Only Screenshots  ·  Guideline 2.3.10  ·  REJECTION
- **What to check:** Screenshots must show the actual app UI, not lifestyle photography, pure marketing text overlays with no UI, or stock imagery that fills the frame with no in-app content visible.
- **How to detect:** Visual review of assets returned by `asc_get_metadata`. Any image where real app chrome is absent or cropped to invisibility is a violation.
- **Resolution:** Overlay marketing copy on a real screenshot background, or present pure in-app UI. Apple allows caption text on top of actual screens.
- **Example rejection:** "Your screenshots appear to show only marketing imagery without the app interface. Screenshots must accurately represent the content and functionality of your app."

---

### Placeholder / Lorem Ipsum Text  ·  Guideline 2.3.8  ·  REJECTION
- **What to check:** Description, subtitle, keywords, and What's New must contain real, final copy — no "lorem ipsum," filler text, or developer-facing notes.
- **How to detect:** `asc_get_metadata` → inspect `description`, `whatsNew`, `subtitle`. Grep for "lorem", "placeholder", "TBD", "coming soon".
- **Resolution:** Replace all placeholder copy with production content before submission.
- **Example rejection:** "Your app's description contains placeholder text. Please revise to accurately describe your app."

---

### Beta / Test / Coming Soon Language  ·  Guideline 2.2  ·  REJECTION
- **What to check:** No field (name, subtitle, description, What's New, screenshots, keywords) may contain "beta," "test," "demo," "coming soon," "early access," or equivalent language implying the app is not finished.
- **How to detect:** `asc_get_metadata` → string-search all text fields for these terms.
- **Resolution:** Remove or rephrase. If the feature genuinely isn't ready, remove it from the build.
- **Example rejection:** "Your app description states this is a beta version. Apps submitted to the App Store must be final versions."

---

### Competitor Platform / External Pricing Mentions  ·  Guideline 2.3.10 / 3.1.1  ·  REJECTION
- **What to check:** Metadata must not name Android, Google Play, or any competing platform. It must not reference prices in dollar amounts (use "free" or tier language only) or direct users to purchase outside the App Store.
- **How to detect:** `asc_get_metadata` → full-text scan of description and What's New for "Android," "Google Play," "Play Store," "$", "€", "buy on," "visit our website to subscribe."
- **Resolution:** Remove all such references. Pricing mentions belong only in IAP display prices managed via App Store Connect.
- **Example rejection:** "Your app description references purchasing options outside the App Store, which is not permitted."

---

### Wrong Primary Category  ·  Guideline 2.3.x  ·  WARNING
- **What to check:** The selected primary category must reflect the app's dominant use case. Miscategorized apps surface in wrong store charts, and reviewers may flag deliberate mis-selection as a metadata violation.
- **How to detect:** `asc_get_metadata` → `primaryCategory`. Compare against app functionality.
- **Resolution:** Update the category via App Store Connect before submission. Use the secondary category for secondary use cases.
- **Example rejection:** "Your app is categorized as Games but does not appear to offer game functionality as its primary purpose."

---

### Broken Support / Marketing URL  ·  Guideline 1.5  ·  REJECTION
- **What to check:** Support URL and marketing URL must load a real, publicly accessible page (no login wall, no 404, no domain-parking page) at submission time.
- **How to detect:** `asc_get_metadata` → retrieve `supportUrl` and `marketingUrl`. Fetch each with `curl -I` (or equivalent) and verify HTTP 200 with publicly readable content.
- **Resolution:** Fix or replace the URLs. Common causes: staging domain, expired domain, maintenance mode.
- **Example rejection:** "The Support URL you provided does not link to a functioning webpage. Please update with a valid URL."

---

### App Name / Subtitle Keyword Stuffing  ·  Guideline 2.3.7  ·  REJECTION
- **What to check:** App name and subtitle must not contain lists of keywords, repeated terms, or any text that functions as a keyword dump (e.g., "MyApp — Tracker, Planner, Journal, Habit, Reminder").
- **How to detect:** `asc_get_metadata` → inspect `name` and `subtitle` for comma-separated keyword lists, repetition, or generic category terms appended purely for search benefit. Cross-ref `asc-aso` skill for keyword strategy.
- **Resolution:** Rewrite to a clean, descriptive name and subtitle. Keywords belong in the Keywords field only.
- **Example rejection:** "Your app name includes excessive keywords. Please revise your app name to remove terms that are not part of your app's brand."

---

### Missing Demo Account Credentials  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If the app requires account creation or login to access any functionality, fully working demo credentials (username + password) must be provided in App Review Information.
- **How to detect:** `asc_check_submission` or `asc_get_metadata` → inspect `reviewInformation.demoAccountName` and `demoAccountPassword`. Also check `reviewNotes`.
- **Resolution:** Create a permanent, non-expiring sandbox account and enter credentials in App Review Information. Ensure the account is pre-populated with data if the app requires it.
- **Example rejection:** "We were unable to sign in using the demo account credentials provided. Please update your Review Notes with working login information."

---

### Empty / Inadequate App Review Notes for Gated Features  ·  Guideline 2.1  ·  REJECTION
- **What to check:** Any non-obvious feature, hardware requirement, server-side flag, or gated flow must be explained in App Review Notes so the reviewer can reach and test it.
- **How to detect:** `asc_check_submission` → `reviewInformation.reviewNotes`. Evaluate whether the notes cover: AR/location features, backend feature flags, required physical hardware, non-obvious navigation paths.
- **Resolution:** Add step-by-step instructions. Attach a review-only configuration or test environment URL if needed.
- **Example rejection:** "We were unable to locate the in-app purchase flow mentioned in your metadata. Please provide steps to access this feature in the App Review Notes."

---

### Age Rating Mismatch  ·  Guideline 2.3.6  ·  REJECTION
- **What to check:** The age rating questionnaire responses must match actual app content. Under-rating mature themes, violence, or user-generated content is a common cause of rejection or removal.
- **How to detect:** `asc_get_metadata` → `ageRatingDeclaration`. Compare each category (violence, sexual content, gambling, unrestricted web access, UGC) against the actual feature set in the build.
- **Resolution:** Re-complete the age rating questionnaire in App Store Connect accurately. If UGC is present, ensure moderation controls are in place to justify the selected rating.
- **Example rejection:** "Your age rating indicates no mature content, but the app contains user-generated content without moderation controls, which requires a minimum rating of 17+."

---

> Cross-ref: `asc-aso` for keyword and listing optimisation; `app-rejection-recovery` if already in a rejected state.

<!-- REFERENCE: submission-preflight/references/rule-privacy.md -->

# Preflight Rules — Privacy

---

### Missing or Unreachable Privacy Policy URL  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** All apps must link to a publicly accessible privacy policy. The URL must load without login, without a 404, and must clearly describe data collection/use. Apps targeting children (Kids category or age rating 4+) have stricter requirements.
- **How to detect:** `asc_get_metadata` → `privacyPolicyUrl`. Verify it resolves to a real, crawlable page (not gated, not parking, not localhost). Manually confirm the policy text is substantive — not a placeholder.
- **Resolution:** Host a complete privacy policy and enter the URL in App Store Connect. For Kids category apps, ensure the policy complies with COPPA and CCPA requirements.
- **Example rejection:** "Your app does not include a privacy policy URL. All apps must provide a link to a privacy policy on the App Store and within the app."

---

### App Privacy Nutrition Label Mismatch  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** The App Privacy questionnaire (Data Types collected, purposes, data-linked-to-user status) must exactly match what the app actually collects. Omitting a collected data type or mis-classifying purpose (e.g., marking analytics data as "not linked to user" when it is linked via fingerprinting) triggers rejection.
- **How to detect:** `asc_get_privacy` → compare declared data types and purposes against a code audit of analytics SDKs, crash reporters, advertising SDKs, and first-party collection points. Check SDK privacy manifests.
- **Resolution:** Update the nutrition label via App Store Connect → App Privacy, or audit and remove data collection that exceeds what's declared. Every third-party SDK that collects data must be reflected.
- **Example rejection:** "Your app collects email addresses for account creation, but this data type is not declared in your App Privacy responses. Please update your privacy information."

---

### Data Collected Before Consent  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** No personal data or device identifiers may be collected or transmitted before the user has seen and accepted the privacy policy and any required permission prompts. This includes analytics and crash data at cold launch.
- **How to detect:** Manual review / network traffic inspection (Charles Proxy or equivalent). Check that analytics SDKs are initialized after consent is granted, not at `application(_:didFinishLaunchingWithOptions:)` unconditionally.
- **Resolution:** Defer SDK initialization until after the user's consent flow completes. Use SDK-level opt-in APIs where available (e.g., Firebase `analyticsCollectionEnabled`).
- **Example rejection:** "Upon review, your app begins transmitting user data before any consent is obtained. Data collection must begin only after the user has given explicit consent."

---

### Missing ATT Prompt When Tracking / IDFA Is Used  ·  Guideline 5.1.2  ·  REJECTION
- **What to check:** Any use of `ASIdentifierManager.advertisingIdentifier` (IDFA) or cross-app/cross-website tracking must be preceded by an ATT prompt (`ATTrackingManager.requestTrackingAuthorization`). `NSUserTrackingUsageDescription` must be present in `Info.plist` with a meaningful description.
- **How to detect:** Grep source for `advertisingIdentifier`, `ATTrackingManager`, and any ad network SDKs (Meta Audience Network, Google AdMob, etc.). Confirm `NSUserTrackingUsageDescription` exists and is non-generic. Verify the prompt is shown before any IDFA access.
- **Resolution:** Add a well-worded `NSUserTrackingUsageDescription`. Present `requestTrackingAuthorization` before accessing the IDFA or initialising tracking-dependent SDKs. If tracking is not used, audit SDKs to confirm and remove IDFA access.
- **Example rejection:** "Your app uses the Advertising Identifier (IDFA) but does not include NSUserTrackingUsageDescription in its Info.plist. This key is required."

---

### Missing or Generic Purpose Strings  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** Every sensitive permission used must have a corresponding `NS*UsageDescription` key in `Info.plist` with a user-intelligible, specific explanation of why the app needs it. Generic strings like "This app requires access to your camera." are routinely rejected.
- **How to detect:** Grep `Info.plist` for `NSCameraUsageDescription`, `NSMicrophoneUsageDescription`, `NSLocationWhenInUseUsageDescription`, `NSContactsUsageDescription`, `NSPhotoLibraryUsageDescription`, etc. Validate each value is specific and truthful.
- **Resolution:** Rewrite each purpose string to name the concrete feature: "Used to scan QR codes on your boarding pass." Ensure every entitlement/capability used has a corresponding description.
- **Example rejection:** "Your app's NSCameraUsageDescription does not provide sufficient information about how the camera will be used. Please revise the purpose string to explain the specific use."

---

### Data Collected Beyond Core Function  ·  Guideline 5.1.1(i)  ·  REJECTION
- **What to check:** Apps may only request access to data that is necessary for the app's advertised core functionality. Requesting contacts for a flashlight app, or location for a tip calculator, are textbook violations.
- **How to detect:** Map each permission request to a documented user-facing feature. If no feature justifies the data, it should not be requested. `asc_get_privacy` can surface declared collection; cross-check with actual permission requests in code.
- **Resolution:** Remove the permission request, or add and document the feature that requires it.
- **Example rejection:** "Your app requests access to Contacts, but we were unable to identify a feature in the app that requires this data. Please remove the permission request or provide a clear explanation."

---

### Account Deletion Not Available for Account-Creating Apps  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Any app that allows users to create an account must provide an in-app mechanism to delete that account (not just deactivate it). The deletion flow must be easily discoverable — typically in account/profile settings.
- **How to detect:** Manual review: navigate to Settings / Profile and confirm a "Delete Account" option exists. Verify it initiates actual deletion (not just logout). `asc_get_metadata` → `reviewNotes` should document the path if it is non-obvious.
- **Resolution:** Implement an in-app account deletion flow that deletes all associated data or initiates a documented deletion request per applicable privacy regulations. Cross-ref `rule-entitlements.md` for Sign in with Apple deletion requirements.
- **Example rejection:** "Your app allows users to create an account but does not offer a way to delete the account from within the app. Please add an in-app account deletion option."

---

### Sign In with Apple Not Offered as Alternative  ·  Guideline 5.x  ·  REJECTION
- **What to check:** If the app exclusively requires login via a third-party social provider (Google, Facebook, etc.) with no alternative, it must also offer Sign in with Apple. See `rule-entitlements.md` for the complete sign-in rule.
- **How to detect:** Review all sign-in entry points. If any third-party social login is offered as the sole identity option, Sign in with Apple must be present. `asc_get_metadata` → `reviewNotes` should note the sign-in flows available.
- **Resolution:** Add Sign in with Apple as an equivalent login option alongside any third-party social sign-in. Cross-ref `rule-entitlements.md`.
- **Example rejection:** "Your app offers login via Facebook but does not offer Sign in with Apple. Apps that offer third-party social login must also offer Sign in with Apple."

---

> For `PrivacyInfo.xcprivacy`, required-reason APIs, ITMS-91053, and ITMS-91061 compliance, hand off to the `privacy-manifest` skill — those details are not duplicated here.

<!-- REFERENCE: submission-preflight/references/rule-subscription.md -->

# Preflight Rules — Subscriptions & In-App Purchases

---

### Digital Goods Must Use IAP  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any digital content, features, or services consumed within the app must be purchased through Apple's In-App Purchase system. This includes premium features, virtual currency, extra content, and subscriptions. Physical goods, person-to-person services, and business-to-business enterprise software are exempt.
- **How to detect:** `asc_list_iaps` to enumerate existing IAPs. Review app flows for any premium feature access that does not go through StoreKit. Test with a reviewer-facing account to confirm IAP is the only path to unlocking content.
- **Resolution:** Implement StoreKit purchases for all applicable digital goods. Remove any payment flows that bypass IAP.
- **Example rejection:** "Your app offers digital content for purchase through a mechanism other than In-App Purchase. Digital goods must be sold using Apple's In-App Purchase API."

---

### Missing Restore Purchases  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any app offering non-consumable IAPs or auto-renewable subscriptions must provide a clearly accessible "Restore Purchases" mechanism so users can recover purchases on a new device or after reinstalling.
- **How to detect:** Manual review: search for a restore button in Settings, purchase flow, or paywall UI. Verify it calls `StoreKit.AppStore.sync()` (StoreKit 2) or `SKPaymentQueue.default().restoreCompletedTransactions()` (StoreKit 1). `asc_list_iaps` confirms which non-consumable or subscription products exist.
- **Resolution:** Add a visible "Restore Purchases" button in the paywall or settings screen. Wire it to the appropriate StoreKit restore API.
- **Example rejection:** "Your app offers In-App Purchases but does not include a mechanism for users to restore previous purchases."

---

### Paywall Missing Required Disclosure  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** The subscription paywall or purchase screen must clearly display: (1) price and billing period, (2) what is included in the subscription, (3) that it auto-renews, (4) how to cancel, (5) links to Terms of Service / EULA and Privacy Policy.
- **How to detect:** Manual review of every paywall screen. Confirm StoreKit `Product.displayPrice` and `subscriptionPeriod` are shown. Verify "Cancel anytime in App Store Settings" or equivalent language is visible. Check that EULA and Privacy Policy links are tappable and resolve.
- **Resolution:** Update the paywall UI to include all required disclosures. Apple provides a recommended subscription disclosure template in the Human Interface Guidelines.
- **Example rejection:** "Your subscription paywall does not clearly state the subscription price, duration, and auto-renewal terms before purchase. Please update your paywall to include this information."

---

### Anti-Steering: Directing Users to External Purchase  ·  Guideline 3.1.1 / 3.1.3  ·  REJECTION
- **What to check:** The app must not contain language or UI that encourages users to purchase outside the App Store (e.g., "Buy on our website for a lower price," "Subscribe at example.com," or buttons/links that navigate to an external checkout for digital goods).
- **How to detect:** Full UI walkthrough and text search of the binary / source for "website," "web," "cheaper," "subscribe at," "visit us to" in contexts adjacent to purchase flows. `asc_get_metadata` → description and What's New should also be checked.
- **Resolution:** Remove steering language and external purchase links for digital goods. Note: a limited US StoreKit External Purchase Entitlement and EU DMA-based entitlement exist but require explicit Apple approval and have specific disclosure requirements — do not use without that entitlement in place.
- **Example rejection:** "Your app includes a link to purchase a subscription on your website. Apps may not include buttons, links, or other calls to action that direct users to purchase digital goods or services outside of the App Store."

---

### Reader App / Multiplatform Service Exemption Misapplied  ·  Guideline 3.1.3  ·  WARNING
- **What to check:** Reader apps (streaming media, digital magazines, newspapers, books, audio, cloud storage) and multiplatform services may allow users to access previously purchased content or subscriptions without offering IAP — but may NOT promote, link to, or assist in external purchases within the app.
- **How to detect:** Confirm your app's category qualifies as a Reader under 3.1.3. Verify no "Sign up" or "Subscribe" links to external web flows exist within the app. Account creation for a Reader app must not be possible from within the iOS app itself unless it is free.
- **Resolution:** Remove in-app sign-up or subscribe links for Reader apps. Only link to Apple-approved external management if the Reader entitlement is held. Cross-ref `subscription-lifecycle` skill.
- **Example rejection:** "Your app includes a link to subscribe to your service on your website. Reader apps may not include links or calls to action for purchasing content outside the App Store."

---

### Free Trial Disclosure Missing  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** If a free trial is offered, the paywall must disclose the trial length, what happens at trial end (price and billing period), and how to cancel before being charged. The disclosure must appear before the user initiates the trial purchase.
- **How to detect:** Review paywall screens that surface introductory offers via `Product.subscriptionInfo.introductoryOffer`. Confirm trial duration, post-trial price, and cancellation instructions are shown before the purchase CTA.
- **Resolution:** Add explicit trial disclosure text adjacent to or above the subscribe button. Use StoreKit's `introductoryOffer` data to populate it dynamically.
- **Example rejection:** "Your app offers a free trial but does not clearly inform users of the trial duration and the price they will be charged when the trial ends."

---

### IAP Metadata Incomplete or Inconsistent  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Each IAP product must have a display name, description, and at least one screenshot (for subscriptions: a subscription group screenshot) submitted for review. The IAP display name in the storefront must match how the product is described in the app UI.
- **How to detect:** `asc_list_iaps` → check each product's `name`, `description`, `state`, and attached review screenshots. Verify subscription group display names are set. Cross-check IAP names against how they appear in app paywalls.
- **Resolution:** Complete all required IAP metadata fields in App Store Connect. Upload a screenshot showing the IAP in context within the app.
- **Example rejection:** "One or more of your In-App Purchase products are missing required metadata. Please ensure all In-App Purchase items have a display name, description, and review screenshot."

---

### Price Tier Mismatch / Unexpected Price  ·  Guideline 3.1.1  ·  WARNING
- **What to check:** The IAP price displayed in the app (if hardcoded) must match the actual StoreKit price for the user's storefront. Hardcoded price strings go stale when Apple adjusts prices in a territory or when you change tiers.
- **How to detect:** Compare hardcoded price strings in the UI against `asc_list_iaps` → `priceTier` and against `Product.displayPrice` returned at runtime by StoreKit. Cross-ref `app-store-pricing` skill.
- **Resolution:** Always render prices dynamically from StoreKit's `Product.displayPrice`. Never hardcode currency amounts in UI strings.
- **Example rejection:** "The price shown in your app's paywall does not match the price of the In-App Purchase. Please ensure prices are retrieved dynamically from StoreKit."

---

> Cross-ref: `paywall-design` for UI layout requirements; `app-store-pricing` for tier management; `subscription-lifecycle` for renewal, cancellation, and billing-retry handling.

<!-- REFERENCE: submission-preflight/references/type-ai-apps.md -->

# Preflight Pack — AI & Generative Apps

---

### UGC / Generated Content Safeguards  ·  Guideline 1.2  ·  REJECTION
- **What to check:** Apps that allow users to generate or share content — including AI-generated text, images, audio, or video — must implement content filtering, a mechanism to report objectionable content, a mechanism to block abusive users, and published Terms of Service.
- **How to detect:** Use `asc_get_metadata` to review the app description and confirm it discloses AI-generation capability. Manually probe the app's generative flows for unconstrained output. Verify a report/flag button is present on generated outputs. Check that a ToS/EULA link appears in the app and in App Store Connect (EULA field).
- **Resolution:** Integrate a content moderation layer (on-device classifier, server-side API, or both) that blocks or hides policy-violating outputs before display. Add a report button adjacent to generated content. Implement user-blocking for social or sharing features. Link to `type-social-ugc.md` for the full UGC checklist.
- **Example rejection:** "Your app enables users to generate content using artificial intelligence but does not include adequate safeguards to filter objectionable material or a method for users to flag inappropriate content."

---

### Age Rating for AI-Generated Content  ·  Guideline 1.2 / Rating Requirements  ·  REJECTION
- **What to check:** Apps capable of generating mature, violent, sexual, or disturbing content — even with filters in place — must carry a 17+ age rating. Many general-purpose AI chat or image apps are incorrectly rated 4+ or 9+.
- **How to detect:** Use `asc_get_age_rating` and compare the declared descriptors against the app's actual output range. If the model can generate content that would require a 17+ descriptor (e.g., "Frequent/Intense Mature/Suggestive Themes") but none is declared, flag it. Check whether a parental gate is implemented for any 17+ content surfaced in a lower-rated shell app.
- **Resolution:** Re-rate to 17+ in App Store Connect > App Information > Age Rating. If the app is intentionally designed for all ages, implement strict server-side output constraints that make 17+ generation impossible and document this in App Review notes.
- **Example rejection:** "Your app's age rating does not reflect the type of content that can be generated. Apps capable of producing mature content must be rated 17+."

---

### AI Content Transparency  ·  Guideline 4.3 / 1.1  ·  WARNING
- **What to check:** Users must be able to identify content as AI-generated when there is a reasonable risk of confusion with human-created or factual content. Deepfakes or synthetic media of real, identifiable people without their consent are prohibited.
- **How to detect:** Manually review the app's output UI for any labeling ("Generated by AI", watermark, disclosure text). Check whether photo/video outputs of real people can be created without consent controls. Use `asc_get_metadata` to review screenshots for any synthetic-media features.
- **Resolution:** Add visible AI-generation labels or watermarks on outputs. Prohibit the upload of third-party likenesses for face-swap or voice-clone features without explicit consent controls. Include Terms of Service clauses prohibiting non-consensual deepfakes.
- **Example rejection:** "Your app generates synthetic media involving real people without disclosing that the content is AI-generated, which may deceive users and violates App Store Guidelines."

---

### Thin GPT-Wrapper Clone / Spam  ·  Guideline 4.3  ·  REJECTION
- **What to check:** Apps that simply wrap a third-party AI API (e.g., OpenAI, Anthropic, Google) with a generic chat UI and no meaningful differentiation are rejected as low-quality or spam, especially when dozens of similar apps exist in the same category.
- **How to detect:** Use `asc_get_metadata` to assess whether the app description articulates a specific use case, domain expertise, or unique feature beyond raw chat. If the app's entire value proposition is "ChatGPT but with a different color scheme," flag it.
- **Resolution:** Define a narrow, valuable use case (legal drafting, recipe generation, code review). Add proprietary prompting logic, domain-specific fine-tuning, or a unique UX flow that justifies the app's existence beyond the underlying model. Document differentiation in App Review notes.
- **Example rejection:** "Your app appears to be a simple interface to a third-party AI service with minimal functionality of its own. Apps must provide unique value beyond wrapping a third-party API."

---

### Privacy of Prompts and Model Provider Disclosure  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** User-entered prompts and AI responses are personal data. The app's privacy nutrition label must accurately declare data linked to the user (e.g., "User Content — used for app functionality") and data sent to third-party model providers. Undisclosed data transmission is a rejection cause.
- **How to detect:** Use `asc_get_privacy` to retrieve the declared privacy labels. Cross-reference against the actual API calls in the binary or network layer — are prompts transmitted to a third-party endpoint? Is any prompt logging or training opt-out disclosed? Verify the privacy policy URL is populated in `asc_get_metadata`.
- **Resolution:** Add "User Content" and any applicable "Identifiers" or "Usage Data" to the nutrition label, linking them to the correct purpose. Update the privacy policy to describe prompt handling, retention, and whether data is used to train models. If users can opt out of training, surface that control in the app.
- **Example rejection:** "Your app collects user-generated content and sends it to a third-party service but does not disclose this data collection in your App Store privacy information."

---

### Medical / Legal / Financial AI Advice Disclaimers  ·  Guideline 1.1.6 / 5.1.1  ·  WARNING
- **What to check:** AI apps that provide health, legal, or financial information must include clear disclaimers that outputs are not professional advice, are not a substitute for licensed practitioners, and should not be relied upon for consequential decisions.
- **How to detect:** Manually test the app with queries like "Should I take this medication?" or "How do I write my will?" and inspect whether a disclaimer appears in the response UI or onboarding. Use `asc_get_metadata` to check if the app description makes any treatment/legal/financial claims. Use `asc_check_submission` for any prior rejection notes about this.
- **Resolution:** Add a persistent disclaimer banner or per-response footnote: "This is not medical/legal/financial advice. Consult a qualified professional." Include this language in the app description and onboarding. Do not market the app with outcome-based claims ("Diagnose your symptoms").
- **Example rejection:** "Your app provides health-related recommendations generated by artificial intelligence but does not include a disclaimer stating that the information is not a substitute for professional medical advice."

---

### Model Provider Endorsement Implication  ·  Guideline 4.0 / Developer Identity  ·  WARNING
- **What to check:** App names, icons, and marketing copy must not imply official partnership with, endorsement by, or affiliation with an AI model provider (e.g., "Official ChatGPT App", "Claude Assistant Pro") unless that entity is the developer of record.
- **How to detect:** Use `asc_get_metadata` to inspect the app name, subtitle, and description for model provider names used in ways that suggest official status. Compare against the developer name — if it is not the model provider itself, flag any branding that implies otherwise.
- **Resolution:** Remove the model provider's name from the app name or make the third-party relationship explicit and subordinate ("Recipe Helper, powered by AI"). Consult the provider's brand guidelines and ToS for permitted usage of their name and marks.
- **Example rejection:** "Your app's name and description imply an official relationship with [Provider] that does not exist. You may not use [Provider]'s trademarks in a way that suggests endorsement or official affiliation."

---

**Cross-references:** `type-social-ugc.md` (full UGC moderation checklist), `rule-privacy.md` (nutrition label setup), `rule-design.md` (UI clarity standards), `app-rejection-recovery` (responding to AI-related rejections).

<!-- REFERENCE: submission-preflight/references/type-all-apps.md -->

# Preflight Pack — All Apps (Baseline Triage)

This is the always-load index pack. Run through this checklist for every submission regardless of app type, then open the deeper type-specific packs as needed.

---

## Deeper Packs — Open These as Applicable

| Pack | When to open |
|------|-------------|
| `rule-metadata.md` | Name, subtitle, keywords, screenshots, descriptions |
| `rule-privacy.md` | Privacy policy, data collection labels, tracking |
| `rule-subscription.md` | Any auto-renewable subscription or IAP |
| `rule-design.md` | UI/UX, hardware API usage, web views |
| `rule-entitlements.md` | Capabilities, push, HealthKit, Sign in with Apple |
| `type-subscription-iap.md` | Paywall, free trial, external payment steering |
| `type-social-ugc.md` | User-generated content, social features |
| `type-kids.md` | Kids Category or audience under 13 |
| `type-health-fitness.md` | Medical claims, HealthKit, research features |

---

## Cross-Cutting Baseline Rules

### Demo Account Present  ·  Guideline 2.1  ·  REJECTION
- **What to check:** If your app requires login, a valid demo username and password must be included in the App Review notes field.
- **How to detect:** Use `asc_check_submission` to inspect the review notes field. Verify the credentials actually work in a fresh session against your staging/production environment.
- **Resolution:** Add demo credentials in App Review Information. If login is unavailable during review (e.g., enterprise SSO), explain the authentication flow in notes and provide a demo video.
- **Example rejection:** "We were unable to review your app because it requires a login, and no demo account credentials were provided in the App Review Information section."

---

### Account Deletion  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Any app that allows account creation must also allow account deletion from within the app. Deletion must be permanent (not just deactivation), and any linked data must be purged per your privacy policy.
- **How to detect:** Manually navigate to account/profile settings. Use `asc_get_privacy` to confirm deletion is declared. grep app source for "deleteAccount" / "deactivate" to confirm distinction.
- **Resolution:** Implement a clearly labeled "Delete Account" option in-app. Ensure backend purges or schedules purge of personal data. Link to a web-based deletion flow only as a supplement, not a replacement.
- **Example rejection:** "Your app allows users to create an account but does not provide the ability to initiate deletion of their account directly within the app."

---

### Privacy Policy Reachable  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** A privacy policy URL must be set in App Store Connect and must be accessible without login at review time. The URL must point to a policy covering this specific app (not a generic corporate page that omits the app).
- **How to detect:** Use `asc_get_privacy` to retrieve the stored URL. Curl or visit the URL to confirm it returns HTTP 200 and is not behind auth.
- **Resolution:** Host the policy on a stable URL (not localhost, not a Notion draft, not a redirect that breaks). Update the policy to name the app explicitly if needed.
- **Example rejection:** "Your app's privacy policy URL is not functional. The URL must be accessible and must specifically describe how user data is handled within your app."

---

### Screenshots Current  ·  Guideline 2.3.10  ·  REJECTION
- **What to check:** Screenshots must accurately reflect the current build's UI. Screenshots showing features not present in the binary, or showing a significantly different UI, are grounds for rejection.
- **How to detect:** Use `asc_get_metadata` to pull current screenshot set. Compare visually against the app binary being submitted.
- **Resolution:** Retake screenshots from the current build. Ensure all required device sizes are covered (6.9" and 6.5" for iPhone; 13" and 12.9" for iPad if the app supports iPad).
- **Example rejection:** "Your app's screenshots do not sufficiently reflect the app in use. Screenshots must show the app's actual UI and must not include content that misleads users about the app's core experience."

---

### Crash-Free on Launch  ·  Guideline 2.1  ·  REJECTION
- **What to check:** The app must launch and remain stable on supported OS versions and device types. Crashes during basic reviewer flow are the most common 2.1 rejection.
- **How to detect:** Use `asc_check_submission` to review any existing crash metadata. Run the binary on minimum-deployment-target device/simulator. Check TestFlight crash feedback via `asc_list_beta_feedback` before promoting to review.
- **Resolution:** Fix crashes before submission. If a device-specific crash is suspected, note supported devices in review notes. Attach a demo video if the reviewer flow is non-obvious.
- **Example rejection:** "We discovered one or more bugs in your app. Specifically, the app crashed when launched on [device] running [OS version]."

---

### Support URL Works  ·  Guideline 1.5  ·  WARNING
- **What to check:** The support URL in App Store Connect must be live and relevant. A broken URL or a URL pointing to a generic homepage without app-specific support options may flag a metadata warning or, in stricter reviews, a rejection.
- **How to detect:** Use `asc_get_metadata` to retrieve the stored support URL. Visit it to confirm HTTP 200 and relevance.
- **Resolution:** Use a dedicated support page or a help-desk URL (e.g., Zendesk, Intercom, a /support path). The page must include a way for users to contact support.
- **Example rejection:** "The support URL you provided does not appear to offer support for your app. Please update it to a URL that provides users with a way to get help."

<!-- REFERENCE: submission-preflight/references/type-crypto-finance.md -->

# Preflight Pack — Crypto & Finance Apps

---

### Crypto Exchange / Wallet — Licensed Entity Only  ·  Guideline 3.1.5(ii)  ·  REJECTION
- **What to check:** Apps that facilitate the exchange, purchase, or custody of cryptocurrency must be submitted by the institution or licensed entity that operates the service. Third-party clients or aggregators are not permitted without the owning institution as the developer of record.
- **How to detect:** Use `asc_get_metadata` to compare the developer name against the service name. If the app name references a well-known exchange but the developer is a different entity, flag it. Check App Review notes for prior approval status. Confirm the app's privacy policy and ToS identify a licensed operator.
- **Resolution:** Ensure the exchange or custodial wallet service is the registered Apple Developer account holder submitting the app. Third-party frontends must be consolidated under the primary entity's account. Document licensing credentials in the App Review Information notes.
- **Example rejection:** "Your app provides cryptocurrency exchange services but does not appear to be submitted by a licensed financial institution or the entity that operates the service."

---

### No On-Device Crypto Mining  ·  Guideline 3.1.5(ii)  ·  REJECTION
- **What to check:** Apps may not mine cryptocurrency on the device. This includes background mining, mining in response to user actions, or delegating mining work to the device's CPU/GPU on behalf of a pool.
- **How to detect:** Inspect the binary for known mining library symbols (e.g., references to `xmrig`, `cryptonight`, `stratum+tcp://` connection strings). Review network entitlements and background mode declarations in `asc_check_submission` for signs of persistent network work consistent with pool communication. Profile the app for sustained CPU activity with no UI interaction.
- **Resolution:** Remove all mining code. If the app is a mining pool dashboard (display only), ensure it performs zero computation and clearly states it monitors an external miner rather than performing work on-device.
- **Example rejection:** "Your app mines cryptocurrency on the user's device, which is not permitted under App Store Review Guideline 3.1.5(ii)."

---

### ICO / Futures / Derivatives — Licensing per Region  ·  Guideline 3.1.5(ii) / 5.3  ·  REJECTION
- **What to check:** Apps offering initial coin offerings, token sales, crypto futures, options, or leveraged products require regulatory licensing in every jurisdiction where the app is available. The app must geo-restrict to only licensed regions.
- **How to detect:** Use `asc_get_metadata` to review the territory availability list. Cross-reference against the developer's disclosed jurisdictional licenses in the App Review notes. Flag any app that is available in major markets (US, EU, UK) without documented licensing for those regions. Use `asc_check_submission` for prior Apple communications on this topic.
- **Resolution:** Restrict availability in App Store Connect to only those territories where the operator holds a valid license. Implement server-side geo-blocking as an additional layer. Submit documentation of all applicable licenses (FINRA, FCA, MAS, etc.) in the App Review Information notes.
- **Example rejection:** "Your app offers financial derivatives or token sales and is available in regions where you have not demonstrated the required regulatory licensing."

---

### Banking / Financial Services — Legitimate Institution  ·  Guideline 3.2.1  ·  REJECTION
- **What to check:** Apps that act as banking or payment services (account management, fund transfer, card issuance) must be submitted by or on behalf of a regulated financial institution. The developer must be the bank, credit union, payment processor, or a licensed agent thereof.
- **How to detect:** Use `asc_get_metadata` to verify the developer name and organization match a licensed institution. Review the app's Terms of Service for a licensed entity. Check whether the app links to a chartered bank or FDIC/equivalent member. Use `asc_get_privacy` to confirm appropriate financial data disclosures.
- **Resolution:** The licensed institution must be the Apple Developer account holder or must explicitly authorize a contracted agent in writing (provide this in App Review notes). Include a direct reference to the regulatory body and license number in the app's legal disclosures.
- **Example rejection:** "Your app provides banking or financial account management services but is not submitted by a licensed financial institution or its authorized agent."

---

### No Unlicensed Money Transmission  ·  Guideline 3.2.1 / 5.3  ·  REJECTION
- **What to check:** Apps that move money between users (P2P transfers, remittance, crowdfunding with disbursements) must hold or partner with a licensed money transmitter in each operating jurisdiction. Unlicensed money movement is prohibited.
- **How to detect:** Identify P2P transfer flows in the app. Use `asc_get_metadata` to check category and description for payment/transfer language. Verify the privacy policy and legal footer name a licensed money transmitter. Confirm the developer's App Review notes document licensing or a formal partnership with a licensed partner (e.g., Stripe, Marqeta, a state-licensed MTB).
- **Resolution:** Partner with a licensed money transmitter and disclose the relationship. Alternatively, route all transfers through an Apple-native mechanism (Apple Pay, StoreKit). Document MTB licenses by state/country in App Review notes and restrict availability to licensed jurisdictions only.
- **Example rejection:** "Your app facilitates the transfer of funds between users without demonstrating the required money transmission licensing in the regions where the app is available."

---

### Regulatory Disclosures In-App  ·  Guideline 3.2.1 / 5.1.1  ·  WARNING
- **What to check:** Finance and crypto apps must surface required regulatory disclosures within the app: investment risk warnings, "not FDIC insured" notices where applicable, crypto volatility disclaimers, and relevant jurisdiction-specific mandatory disclosures.
- **How to detect:** Manual review — launch the app and navigate to account creation and any investment/trade screen. Verify risk disclosures appear before the user commits funds. Use `asc_get_metadata` to confirm the app description does not make unqualified return or performance promises.
- **Resolution:** Add a risk disclosure modal during onboarding and an inline disclaimer near any trade or investment action ("Cryptocurrency is highly volatile and you may lose your investment"). Remove any guaranteed-return language from metadata and in-app copy.
- **Example rejection:** "Your app offers investment or financial products but does not include required risk disclosures within the app experience."

---

### Demo / Test Account for Reviewer  ·  Guideline 2.1 / 3.1.5  ·  REJECTION
- **What to check:** Financial and crypto apps that require real funds, KYC identity verification, or banking credentials to review must provide Apple with a demo account or sandbox mode that allows the reviewer to evaluate all features without committing real money or completing identity checks.
- **How to detect:** Walk through the submission checklist in `asc_check_submission`. Verify that demo credentials are populated in the App Review Information > Demo Account field. Test that the demo account exposes all purchasable/tradable features in a simulated or paper-trading mode.
- **Resolution:** Implement a sandbox/paper-trading mode toggled by the demo credentials. Pre-fund the demo account with virtual currency. Bypass KYC for accounts flagged as reviewer accounts server-side. Document the demo mode in the App Review notes explaining what the reviewer can do.
- **Example rejection:** "We were unable to review your app because it requires financial account credentials or real-money transactions to access its features. Please provide a demo account in the App Review Information section."

---

**Cross-references:** `rule-entitlements.md` (entitlements for finance-category apps), `rule-metadata.md` (metadata compliance for financial claims).

<!-- REFERENCE: submission-preflight/references/type-games.md -->

# Preflight Pack — Games

---

### Loot Box Odds Disclosure  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any randomized IAP (loot boxes, gacha pulls, card packs, spins) must prominently disclose the probability of each item type before purchase.
- **How to detect:** Use `asc_list_iaps` to enumerate IAPs; flag any with "pack", "chest", "box", "spin", or "pull" in the display name. Check the app's UI screenshots and build for a disclosure screen prior to the purchase CTA. Verify disclosure is in-app, not merely in a linked web page.
- **Resolution:** Add a probability table or interactive odds screen surfaced before the buy button. Odds must be exact (e.g., "Legendary: 0.3%"), not ranges. Link to the odds disclosure from the IAP paywall.
- **Example rejection:** "Your app offers randomized virtual items but does not disclose the probability of receiving each item type prior to purchase, which is required by App Store Review Guideline 3.1.1."

---

### Real-Money Gaming / Gambling  ·  Guideline 5.3  ·  REJECTION
- **What to check:** Apps where real currency is wagered (poker, sports betting, casino, fantasy sports with cash prizes) require explicit Apple approval, proof of licensing in each jurisdiction offered, and geo-restriction to licensed regions.
- **How to detect:** Check `asc_get_metadata` for the primary/secondary category (Games > Casino or Sports). Use `asc_get_age_rating` to confirm 17+. Verify that the binary enforces geo-restriction (IP or device locale check) and that the Apple-approved entitlement is present. Confirm licensing documentation was submitted via App Review Notes.
- **Resolution:** Apply for the gambling entitlement through Apple's developer portal before submitting. Implement server-side geo-blocking. Provide reviewer credentials to a demo region where gambling is licensed and testing is permitted. Document licenses in the App Review Information notes field.
- **Example rejection:** "Your app facilitates real-money wagering. Apps that offer real money gaming, gambling, or lotteries must obtain appropriate licensing, restrict availability to licensed regions, and receive prior approval from Apple."

---

### In-Game Currency IAP Restorability  ·  Guideline 3.1.1  ·  WARNING
- **What to check:** Non-consumable IAPs (permanent upgrades, ad removal) must be restorable. Consumable virtual currency is exempt, but bundles that mix consumable and non-consumable items need careful split.
- **How to detect:** Use `asc_list_iaps` and check each IAP's `productType`. Any `NON_CONSUMABLE` that lacks a "Restore Purchases" path in the UI is a violation. Mixed bundles where a non-consumable benefit is bundled with consumable currency should be separated or treated as non-consumable.
- **Resolution:** Implement `SKPaymentQueue.default().restoreCompletedTransactions()` (StoreKit 1) or `Transaction.currentEntitlements` (StoreKit 2) and expose a visible Restore button in Settings or Purchases screen.
- **Example rejection:** "Your app does not provide a mechanism to restore previously purchased non-consumable in-app purchases, which is required by the App Store Review Guidelines."

---

### Simulated Gambling for Kids  ·  Guideline 5.3 / 1.3  ·  REJECTION
- **What to check:** Slot machines, card games, or casino-style mechanics intended for or accessible to minors (age rating below 17+) that simulate gambling — even without real money — may be rejected if they normalize gambling behavior for children.
- **How to detect:** Use `asc_get_age_rating` to check the rating and any content descriptors. Inspect whether the app uses slot reel animations, chip/bet mechanics, or terminology ("bet", "jackpot", "casino") in an app rated 4+ or 9+.
- **Resolution:** Either raise the age rating to 17+ and restrict download in jurisdictions with minors-gambling laws, or redesign the mechanic to remove casino-style presentation. Do not market casino-style features in screenshots if rated below 17+.
- **Example rejection:** "Your app contains slot machine or casino-style content but is rated for ages 4 and up. Apps with gambling-style content must be rated 17+."

---

### Third-Party Ad SDK Privacy Manifests  ·  Guideline 5.1.2  ·  REJECTION
- **What to check:** Game engines and ad SDKs (Unity Ads, ironSource, AppLovin MAX, Meta Audience Network, Google AdMob) must include a privacy manifest (`PrivacyInfo.xcprivacy`) declaring required reason APIs and collected data. Missing manifests now cause upload rejection.
- **How to detect:** Run `asc_check_submission` and inspect Transporter or Xcode upload logs for "ITMS-91053: Missing API declaration" or "ITMS-91054" errors. Check the linked frameworks in the app bundle for `PrivacyInfo.xcprivacy` presence. Escalate to the `privacy-manifest` skill for full audit.
- **Resolution:** Update each third-party SDK to a version that ships its own `PrivacyInfo.xcprivacy`. For custom ad code, add a manifest in the main app target declaring all accessed required-reason APIs. See the `privacy-manifest` skill for full remediation steps.
- **Example rejection:** "Your app accesses one or more required reason APIs without providing an approved reason in the app's privacy manifest. Please update your app's privacy manifest to include approved reasons."

---

### Clone / Spam Games  ·  Guideline 4.3  ·  REJECTION
- **What to check:** Games that are near-identical copies of existing App Store titles, or bulk-produced from an asset template with minimal differentiation, are rejected as spam or copycats.
- **How to detect:** Manual review — compare screenshots, gameplay loops, and metadata against obvious market leaders. Use `asc_get_metadata` to inspect title, subtitle, and keywords for keyword-stuffed clones. Flag if the developer has >10 near-identical apps in their portfolio (`asc_check_submission` reviewer notes may reference this).
- **Resolution:** Differentiate with original mechanics, art, or narrative. Remove duplicate keyword strings. Consolidate template-derived apps into a single app with in-app level packs rather than separate submissions.
- **Example rejection:** "Your app duplicates the content and functionality of apps already available on the App Store. Submitting duplicate apps is not acceptable."

---

### Age Rating Accuracy for Violent / Mature Content  ·  Guideline 4.3 / Rating Requirements  ·  REJECTION
- **What to check:** Games with cartoon violence, realistic violence, sexual content, horror, or drug/alcohol themes must select the correct frequency descriptor during age rating setup. Under-rating causes rejection or removal.
- **How to detect:** Use `asc_get_age_rating` and cross-check each descriptor against visible in-game content. Pay special attention to "Realistic Violence" vs "Cartoon Violence" — many games mis-select. Games with 17+ content distributed to all regions without parental gate are flagged.
- **Resolution:** Re-rate the app via App Store Connect > App Information > Age Rating. If the correct rating is 17+, ensure the store page and marketing do not target minors.
- **Example rejection:** "Your app's age rating does not accurately reflect its content. Apps must be rated according to the most mature content present in the app, including content generated by users or AI."

---

**Cross-references:** `rule-subscription.md` (subscription IAPs), `paywall-design` (paywall UI rules), `privacy-manifest` (SDK manifest audit), `rule-entitlements.md` (gambling entitlement process).

<!-- REFERENCE: submission-preflight/references/type-health-fitness.md -->

# Preflight Pack — Health & Fitness Apps

Deep pack for Guideline 1.4.1 and 5.1.3 (HealthKit / Health & Fitness data). Open this for any app that makes health claims, uses HealthKit, conducts human-subject research, or provides medical guidance. Cross-reference: `rule-privacy.md`.

---

### Medical Claims Require Accuracy, Sources, and Regulatory Clearance  ·  Guideline 1.4.1  ·  REJECTION
- **What to check:** Apps that make specific medical claims (e.g., "lowers blood pressure," "clinically proven to reduce anxiety," "FDA-cleared for X") must be able to substantiate those claims. Apps that constitute medical devices (diagnosis, treatment, cure, mitigation) typically require FDA clearance or equivalent and must reference it.
- **How to detect:** Use `asc_get_metadata` to retrieve description, subtitle, and keywords. Search for "clinically proven," "FDA," "medically certified," "treats," "cures," "diagnoses," "clears." Cross-check against any FDA 510(k) or De Novo clearance documentation you hold.
- **Resolution:** Remove or qualify unsubstantiated medical claims. Replace "treats" with "may support." Where regulatory clearance applies, reference it in the App Review notes and supply the clearance number. Add a disclaimer that the app is not a substitute for professional medical advice.
- **Example rejection:** "Your app contains medical claims that are not substantiated. Apps must not claim to diagnose, cure, treat, or prevent any medical condition without appropriate regulatory clearance and supporting evidence."

---

### No Dosage Calculators Without Medical Credentials  ·  Guideline 1.4.1  ·  REJECTION
- **What to check:** Features that calculate medication dosages, drug interactions, or clinical thresholds (e.g., weight-based pediatric dosing, IV drip rates) are treated as medical devices by Apple unless the app is explicitly scoped to licensed healthcare professionals and access is gated accordingly.
- **How to detect:** Search source and UI strings for "dose," "dosage," "mg/kg," "drip rate," "interaction." Manually walk any calculator or recommendation flow. Use `asc_check_submission` to see if review notes address the professional-use scope.
- **Resolution:** Gate dosage calculator features behind a healthcare-professional verification step (license number entry, institution verification). Add prominent disclaimers that all outputs must be verified by a qualified clinician. Add this scope to App Review notes.
- **Example rejection:** "Your app provides medication dosage calculations without restricting access to licensed medical professionals. Apps that offer medical dosage information must be limited to healthcare providers and include appropriate safeguards."

---

### HealthKit Data Must Not Be Used for Advertising  ·  Guideline 5.1.3  ·  REJECTION
- **What to check:** Data obtained via HealthKit (steps, heart rate, sleep, workouts, etc.) must not be used for advertising, marketing, or sold to data brokers. It must not be shared with third parties for purposes other than improving health and fitness functionality within the app.
- **How to detect:** grep source for HealthKit read/write calls (`HKHealthStore`, `HKQuery`). Trace the data flow downstream — confirm no analytics or ad SDK receives HealthKit-derived values. Use `asc_get_privacy` to verify data type declarations.
- **Resolution:** Audit every HealthKit data read and remove any path that forwards that data to an ad network, analytics platform, or third-party not strictly necessary for core app functionality. Update privacy labels accordingly.
- **Example rejection:** "Your app accesses HealthKit data and shares it with a third-party analytics or advertising service. HealthKit data may only be used to provide health and fitness features and may not be used for advertising or marketing purposes."

---

### HealthKit Data Must Not Be Stored in iCloud  ·  Guideline 5.1.3  ·  REJECTION
- **What to check:** HealthKit data must not be written to iCloud (CloudKit or iCloud Drive) in a form that could expose it outside the app's controlled sandbox. Health data may be stored on-device or on your own HIPAA-compliant server, but not in a general-purpose iCloud container.
- **How to detect:** grep source for `CKRecord`, `NSUbiquitousKeyValueStore`, and `FileManager` paths containing `ubiquityContainerIdentifier`. Confirm no HealthKit-derived values are persisted into CloudKit containers.
- **Resolution:** Migrate HealthKit data persistence to on-device storage (`HKHealthStore` itself is the canonical store) or your own encrypted, HIPAA-compliant backend. Remove any CloudKit writes for health values.
- **Example rejection:** "Your app writes HealthKit data to iCloud, which is not permitted. Health data must not be stored in iCloud or shared with Apple's iCloud service."

---

### Human-Subject Research Requires IRB Approval and In-App Consent  ·  Guideline 5.1.3  ·  REJECTION
- **What to check:** Apps that collect health data as part of a clinical study or human-subject research must (1) obtain IRB / ethics board approval, (2) present an informed consent flow within the app that covers study purpose, risks, voluntary participation, and data use, and (3) allow participants to withdraw.
- **How to detect:** Review the app description and review notes for research/study language. Use `asc_check_submission` to confirm IRB documentation has been provided to Apple. Manually walk the onboarding flow to confirm a ResearchKit-style consent sequence is present.
- **Resolution:** Obtain IRB approval before submitting to App Review. Implement a ResearchKit consent flow (or equivalent) with all required disclosure elements. Provide IRB approval documentation in App Review notes. Implement a study withdrawal mechanism.
- **Example rejection:** "Your app conducts human subject research or a clinical study but does not provide evidence of IRB approval or a proper informed consent process within the app."

---

### Accurate Health Measurements and Disclaimers  ·  Guideline 1.4.1  ·  WARNING
- **What to check:** Apps that claim to measure physiological values (heart rate via camera, SpO2, stress, blood pressure) must be accurate within published, validated tolerances. Overstated accuracy claims and missing disclaimers (e.g., "not a medical device," "not for diagnostic use") are grounds for rejection or metadata removal.
- **How to detect:** Use `asc_get_metadata` to scan description and keywords for accuracy claims ("medical-grade," "clinical accuracy," "ECG"). Verify the disclaimer text is present on every measurement result screen in the build.
- **Resolution:** Ground accuracy claims in published validation studies cited in review notes. Add "Not a medical device. Not intended to diagnose or treat any condition." to every screen displaying a health measurement result.
- **Example rejection:** "Your app claims to provide medically accurate heart rate measurements using the device camera but does not include disclaimers clarifying that the feature is not a medical device and is not intended for diagnostic purposes."

---

### Emergency Services Disclaimer  ·  Guideline 1.4.1  ·  WARNING
- **What to check:** Any feature that could be construed as an emergency-response tool (fall detection, SOS, seizure alerts, cardiac event detection) must clearly disclaim that it is not a substitute for calling emergency services and must not promise guaranteed alerting.
- **How to detect:** Navigate to any emergency-adjacent feature in the build. Confirm disclaimer text is present and prominent. Use `asc_get_metadata` to check description for unqualified emergency claims.
- **Resolution:** Add a disclaimer on the feature's primary screen: "This feature is not a substitute for emergency services. In an emergency, call [local emergency number]." Do not promise 100% detection accuracy.
- **Example rejection:** "Your app includes an emergency alert feature but does not inform users that this feature is not a replacement for contacting emergency services."

---

### Mental Health Crisis Handling  ·  Guideline 1.4.1  ·  REJECTION
- **What to check:** Apps that provide mental health support, mood tracking, or any interaction where a user may disclose suicidal ideation, self-harm, or crisis states must refer users to crisis resources (e.g., 988 Suicide & Crisis Lifeline in the U.S., Crisis Text Line). Failure to do so is a hard rejection.
- **How to detect:** Test the app with crisis-related language in any text input (chatbot, journal, mood log). Confirm crisis resources are surfaced. Use `asc_check_submission` to verify this is addressed in review notes. Review the app description for mental health claims.
- **Resolution:** Implement a keyword-triggered crisis resource prompt that surfaces emergency helpline numbers and links (in-app, not requiring internet for the number itself). The 988 Lifeline and local equivalents are the baseline. Surface this before any AI/LLM response in mental health chat contexts.
- **Example rejection:** "Your app provides mental health support features but does not include information about crisis resources or emergency services for users who may be in distress or danger."

<!-- REFERENCE: submission-preflight/references/type-kids.md -->

# Preflight Pack — Kids Category Apps

Deep pack for Guideline 1.3 and 5.1.4 (Privacy — Kids). Open this for any app in the Kids Category or any app whose primary or significant audience includes children under 13. Cross-reference: `rule-privacy.md`.

---

### No Third-Party Analytics or Advertising (Non-Apple, Non-Contextual)  ·  Guideline 1.3  ·  REJECTION
- **What to check:** Kids Category apps may not use third-party advertising networks or analytics SDKs unless the vendor is on Apple's approved list or the ads are strictly contextual (no user data collected, no behavioral targeting). Behavioral advertising is categorically prohibited.
- **How to detect:** grep the project for known analytics SDK imports: `FirebaseAnalytics`, `Amplitude`, `Mixpanel`, `AppsFlyerLib`, `Adjust`, `FacebookCore`, `GoogleMobileAds`, `MoPub`, `ironSource`. Use `asc_check_submission` to review any prior notes about SDK rejections. Check `Package.resolved` / `Podfile.lock` for suspect packages.
- **Resolution:** Remove disqualifying SDKs entirely. Replace analytics with Apple's own privacy-preserving tools (SKAdNetwork, app install validation via your own server). For ads, use only Apple Advertising or a contextual provider explicitly approved for Kids Category.
- **Example rejection:** "Your app is in the Kids category and integrates a third-party advertising SDK that collects user data. Third-party advertising and analytics that collect user information are not permitted in Kids category apps."

---

### No Behavioral Advertising  ·  Guideline 1.3 / 5.1.4  ·  REJECTION
- **What to check:** Even if an ad network claims COPPA compliance, serving ads targeted on behavioral or interest data to an audience that includes children under 13 is prohibited. Interest-based targeting, retargeting, and lookalike audiences are all disqualifying.
- **How to detect:** Review the ad network integration configuration. Look for targeting parameters, audience segmentation calls, or consent-management SDKs that conditionally enable tracking. Use `asc_get_age_rating` to confirm the Kids Category designation is set.
- **Resolution:** Switch to strictly contextual ads (keyed only on app content or placement, no user identifiers). Obtain written confirmation from the ad provider that the integration is COPPA-compliant and does not pass behavioral signals.
- **Example rejection:** "Your app serves interest-based or behavioral advertisements. Apps in the Kids category may only display contextual advertisements and may not use advertising that targets users based on personal data or browsing behavior."

---

### Parental Gate Before External Links  ·  Guideline 1.3  ·  REJECTION
- **What to check:** Any link or mechanism that takes a child outside the app (to a website, another app, a social network, email, phone) must be gated behind a parental gate — a challenge that requires adult-level reasoning to pass (not a simple tap-to-confirm).
- **How to detect:** Manually navigate all screens in the review build looking for tappable URLs, "Share" actions, "Rate Us" prompts, social media links, and "Visit our website" buttons. Confirm each triggers a parental gate challenge before opening.
- **Resolution:** Implement a parental gate using a math problem, a text-entry question, or a similar cognitive challenge that a young child is unlikely to solve. Simple "Are you an adult? Tap Yes" dialogs do not satisfy Apple's standard.
- **Example rejection:** "Your app contains links that take users outside the app but does not implement a parental gate prior to displaying these links, as required for apps in the Kids category."

---

### Parental Gate Before Account Creation and Personal Info Collection  ·  Guideline 1.3 / 5.1.4  ·  REJECTION
- **What to check:** If the app allows or requires account creation, or collects any personal information (name, email, photo, location), a parental gate must precede those flows. This is in addition to COPPA verifiable parental consent where required by law.
- **How to detect:** Walk the onboarding and registration flows. Confirm a parental gate challenge appears before any form requesting personal data. Use `asc_get_privacy` to verify data collection labels match what the app actually collects.
- **Resolution:** Gate the account creation and profile-setup flows. Where COPPA applies (U.S. users under 13), implement verifiable parental consent (VPC) via an approved method (e.g., email to parent, credit card micro-charge, knowledge-based authentication).
- **Example rejection:** "Your app collects personal information from users without first displaying a parental gate, as required for apps in the Kids category."

---

### No Purchases Without Parental Gate  ·  Guideline 1.3  ·  REJECTION
- **What to check:** IAP and subscription flows in Kids Category apps must be preceded by a parental gate. The standard StoreKit authentication prompt (Face ID / Touch ID / password) is not sufficient — a parental gate must appear before the StoreKit sheet is invoked.
- **How to detect:** Navigate to any IAP or subscription purchase point in the review build. Confirm a parental gate challenge appears before `SKPaymentQueue.add(_:)` or `Product.purchase()` is called.
- **Resolution:** Trigger your parental gate before initiating any StoreKit purchase. Only if the gate is passed should the StoreKit payment sheet be presented.
- **Example rejection:** "Your app offers in-app purchases without first displaying a parental gate. Apps in the Kids category must include a parental gate prior to any purchase flow."

---

### COPPA and Children's Privacy — No PII Collection Without Consent  ·  Guideline 5.1.4  ·  REJECTION
- **What to check:** The app must not collect, transmit, or store personally identifiable information (PII) from children without verifiable parental consent. PII includes: full name, email, phone, photo, precise location, device identifiers tied to the child, and any data that could be used to identify or contact a child.
- **How to detect:** Use `asc_get_privacy` to audit declared data types. grep source for calls to `CLLocationManager`, camera/photo library access, `identifierForVendor`, or any form input saving to a remote server. Confirm that privacy labels match actual data flows.
- **Resolution:** Minimize data collection to what is strictly necessary. Obtain and record verifiable parental consent before collecting any PII. Do not use device advertising identifiers. Anonymize analytics. Update privacy labels to accurately reflect what is collected.
- **Example rejection:** "Your app collects personal information, including precise location data, from users in the Kids category without implementing verifiable parental consent as required by Guideline 5.1.4 and applicable law."

---

### Age Rating Must Reflect Kids Category Placement  ·  Guideline 1.3 / Rating  ·  WARNING
- **What to check:** Apps in the Kids Category must be rated 4+, 6+, or 9+ (the three Kids subcategories). A 12+ or 17+ rating is incompatible with Kids Category placement. Age rating must not contain flags for mature themes, violence, or sexual content.
- **How to detect:** Use `asc_get_age_rating` to retrieve the current rating and questionnaire responses. Verify the primary and secondary category in `asc_get_metadata` includes a Kids subcategory.
- **Resolution:** Ensure all content in the app is appropriate for the selected age band. If the app contains content suitable only for older users, it does not belong in the Kids Category.
- **Example rejection:** "Your app is categorized under the Kids category but has an age rating that is not compatible with that category. Apps in the Kids category must be rated 4+, 6+, or 9+."

---

### No Links Out of App Without Parental Gate (Catch-All)  ·  Guideline 1.3  ·  REJECTION
- **What to check:** This covers any path not covered by the External Links rule above: deep links, universal links from push notifications, in-app browsers opened via user interaction, and share sheets that could expose the child to external content.
- **How to detect:** Audit all `UIApplication.open(_:)`, `SFSafariViewController`, and `WKWebView` call sites in source. Review push notification tap handlers. Confirm each external-navigation path is gated.
- **Resolution:** Wrap every navigation-out-of-app code path with a parental gate check. Disable or suppress Share Sheet options (AirDrop, social sharing) or gate them.
- **Example rejection:** "Your app allows users to navigate to external websites or content via in-app links or push notifications without passing a parental gate, which is required for apps in the Kids category."

<!-- REFERENCE: submission-preflight/references/type-macos.md -->

# Preflight Pack — macOS (Mac App Store)

---

### App Sandbox Required  ·  Guideline 2.4.5(i)  ·  REJECTION
- **What to check:** All Mac App Store submissions must enable App Sandbox (`com.apple.security.app-sandbox = YES` in the entitlements file). Apps that disable sandboxing are rejected outright.
- **How to detect:** Inspect the app's `.entitlements` file(s) in the built product or source. Use `asc_check_submission` logs for "ITMS-90286: Invalid Code Signing Entitlements" or Transporter errors citing sandbox. Confirm both the main target and any XPC services / helper tools carry the sandbox entitlement.
- **Resolution:** Enable `com.apple.security.app-sandbox` in the target's entitlements. Audit all file, network, and hardware access and add only the required capability entitlements. Helpers and XPC services need their own sandboxed entitlements files.
- **Example rejection:** "Your app does not have the App Sandbox feature enabled. The Mac App Store requires that all apps implement the App Sandbox."

---

### No Writes Outside the App Container  ·  Guideline 2.4.5(i)  ·  REJECTION
- **What to check:** A sandboxed app may only write to its container (`~/Library/Containers/<bundle-id>/`), user-selected locations via security-scoped bookmarks, or shared containers declared with an App Group entitlement. Writing to arbitrary filesystem paths is a sandbox violation.
- **How to detect:** Run the app under `fs_usage` or Instruments > File Activity and look for writes to paths outside the container. Check for hardcoded paths like `/tmp/`, `/var/folders/`, or `~/Library/Application Support/<AppName>/` without a corresponding security-scoped bookmark or group container entitlement.
- **Resolution:** Migrate preference/cache writes into `NSApplicationSupportDirectory` within the container. Use `NSOpenPanel` / `NSSavePanel` + security-scoped bookmarks for user-chosen paths. Declare shared data via `com.apple.security.application-groups`.
- **Example rejection:** "Your app attempts to write data outside of its sandbox container without the appropriate user permission. This is not permitted on the Mac App Store."

---

### Temporary Exception Entitlements Justification  ·  Guideline 2.4.5 / Entitlement Policy  ·  WARNING
- **What to check:** Temporary exception entitlements (e.g., `com.apple.security.temporary-exception.files.absolute-path.read-write`) trigger manual Apple review and are rarely approved for MAS. Their presence signals architectural debt.
- **How to detect:** Search entitlement files for `temporary-exception`. Use `asc_check_submission` or Xcode's Capabilities tab to list all declared entitlements. Flag any temporary exceptions and verify that a justification was included in the App Review notes.
- **Resolution:** Replace temporary exceptions with first-class entitlements where available. For unavoidable cases, provide a detailed business justification in the App Review Information field explaining why no standard API meets the need.
- **Example rejection:** "Your app requests the temporary exception entitlement [X] without an adequate explanation. Temporary exceptions must be justified in your App Review notes."

---

### No Self-Update / Sparkle on MAS  ·  Guideline 2.4.5(iv)  ·  REJECTION
- **What to check:** MAS apps must not include self-update mechanisms such as Sparkle, in-app "Check for Updates" buttons, or code that downloads and installs new versions outside the MAS update pipeline.
- **How to detect:** Search the binary and linked frameworks for Sparkle (`SUUpdater`, `SPUUpdater`), or any HTTP call to a `.appcast.xml` or `appcasts` endpoint. Use `asc_check_submission` or manual static analysis. Check `Info.plist` for `SUFeedURL` or related Sparkle keys.
- **Resolution:** Remove Sparkle and all update-check logic entirely. MAS handles updates. If you need both a MAS and a direct-distribution build, gate Sparkle behind a build flag that is stripped from the MAS target.
- **Example rejection:** "Your app includes code to update itself outside of the Mac App Store update process, which is not permitted."

---

### Hardened Runtime Required for Notarization  ·  Guideline 2.4.5 / Notarization Policy  ·  REJECTION
- **What to check:** For Developer ID (direct distribution) notarization, Hardened Runtime must be enabled. For MAS, it is also enforced by code-signing policy. Unsigned or non-hardened builds are rejected at upload.
- **How to detect:** Run `codesign -dv --verbose=4 <App.app>` and check for `flags=0x10000(runtime)`. Absence of the `runtime` flag means Hardened Runtime is off. `asc_check_submission` upload errors citing "ITMS-90338" or "invalid binary" often trace back to this.
- **Resolution:** In Xcode, set "Enable Hardened Runtime" to YES for all targets. If the app requires a runtime exception (e.g., JIT, unsigned executable memory for game engines), add only the specific exception entitlement and justify it in App Review notes.
- **Example rejection:** "The binary is not compiled with the Hardened Runtime, which is required for all Mac App Store submissions."

---

### No Requiring Admin / Root Privileges  ·  Guideline 2.4.5 / Sandboxing Policy  ·  REJECTION
- **What to check:** Apps must not require administrator credentials or `sudo` to perform their primary function. Installer helpers and privileged helpers must use `SMJobBless` / `ServiceManagement` — not `AuthorizationExecuteWithPrivileges` (deprecated).
- **How to detect:** Grep the source and scripts for `AuthorizationExecuteWithPrivileges`, `sudo`, or `osascript` with `do shell script … with administrator privileges`. Use `asc_check_submission` or manual binary analysis.
- **Resolution:** Refactor privileged operations into a properly blessed `launchd` helper tool using `SMJobBless`. The helper should request only the minimum privileges needed and communicate via XPC. See `rule-entitlements.md` for SMJobBless setup.
- **Example rejection:** "Your app uses deprecated privileged authorization APIs or requires administrator access in ways that are not permitted for Mac App Store distribution."

---

### File-Access Scope / Open and Save Panels  ·  Guideline 2.4.5(i)  ·  WARNING
- **What to check:** A sandboxed app that needs broad file access (e.g., a text editor, media converter) must use `NSOpenPanel` / `NSSavePanel` to obtain user consent, then persist access with security-scoped bookmarks. Declaring `com.apple.security.files.user-selected.read-write` without the accompanying UI flow is insufficient.
- **How to detect:** Use `asc_get_metadata` to check the app category and infer expected file-access patterns. In a local build, verify that file-open operations go through a panel and that bookmarks are persisted to UserDefaults or the container. Missing bookmark persistence means access is lost on relaunch.
- **Resolution:** Store security-scoped bookmarks using `URL.bookmarkData(options: .withSecurityScope, ...)` after the user selects a file. Call `startAccessingSecurityScopedResource()` / `stopAccessingSecurityScopedResource()` around file operations on subsequent launches.
- **Example rejection:** "Your app accesses files outside its container without the required user permission. File access in sandboxed apps must be obtained through Open and Save panels, and persistent access must use security-scoped bookmarks."

---

**Cross-references:** `rule-entitlements.md` (entitlements reference and SMJobBless guide), `asc-submission` (submission checklist and reviewer credentials).

<!-- REFERENCE: submission-preflight/references/type-social-ugc.md -->

# Preflight Pack — Social & UGC Apps

Deep pack for Guideline 1.2 (User-Generated Content). Open this for any app that lets users post text, images, video, audio, or other content visible to other users. Cross-reference: `rule-design.md`, `app-rejection-recovery`.

---

## The Four Required UGC Safeguards (Guideline 1.2)

Apple requires ALL FOUR of the following to be present and functional. Missing even one is grounds for rejection.

### Content Filtering for Objectionable Material  ·  Guideline 1.2  ·  REJECTION
- **What to check:** The app must have a mechanism to filter or moderate objectionable content before it is visible to other users. This can be automated (ML classifiers, hash-matching for CSAM) and/or human moderation, but must be documented and demonstrably active.
- **How to detect:** Manually attempt to post content containing profanity, hate speech indicators, or flagged image content. Verify the moderation pipeline intercepts it. Check review notes to confirm moderation approach is described. Use `asc_check_submission` to confirm review notes field is populated with moderation details.
- **Resolution:** Integrate a content moderation service (e.g., Apple's on-device text classifiers, a third-party API, or human review queue). Document the approach in App Review notes. Apple does not require perfection — they require a credible, active effort.
- **Example rejection:** "Your app allows users to generate or share user-generated content without sufficient mechanisms to filter or moderate objectionable material, which is not in compliance with Guideline 1.2."

---

### In-App Reporting and Flagging  ·  Guideline 1.2  ·  REJECTION
- **What to check:** Users must be able to report or flag content directly within the app. The reporting option must be accessible without leaving the content view (e.g., a long-press menu, a "..." overflow, or a dedicated report button).
- **How to detect:** Navigate to any piece of user-generated content in the review build. Confirm a report/flag action is reachable within two taps. Check that the report flow completes without error and provides user feedback.
- **Resolution:** Add a report action to every UGC surface (posts, comments, profiles, messages). The action must submit to a moderation queue and acknowledge receipt to the reporting user.
- **Example rejection:** "Your app contains user-generated content but does not provide users with a way to flag or report objectionable content within the app."

---

### User Blocking  ·  Guideline 1.2  ·  REJECTION
- **What to check:** Users must be able to block other users from contacting them or appearing in their feed/content views. Blocking must be persistent and must prevent further contact from the blocked account.
- **How to detect:** Create two test accounts. From account A, block account B. Verify that account B's content is suppressed and that account B cannot message account A. Confirm the block is retained across sessions.
- **Resolution:** Implement a block action accessible from user profiles and/or message threads. Store block relationships server-side so they persist across devices. Provide an unblock path via settings.
- **Example rejection:** "Your app does not provide users with the ability to block other users from contacting them or interacting with their content."

---

### Published Terms of Use with Zero-Tolerance and 24h Response Commitment  ·  Guideline 1.2  ·  REJECTION
- **What to check:** The app must display (or link to) Terms of Use / EULA that explicitly: (1) prohibit objectionable content, (2) state the developer will act on reported violations within 24 hours, and (3) warn that violations result in account removal.
- **How to detect:** Use `asc_get_metadata` to check EULA URL. Visit the linked terms and search for "24 hour," "objectionable," and "terminate." If terms are shown inline, grep source for these clauses.
- **Resolution:** Update your Terms of Use / Community Guidelines to include all three required clauses. Surface the link before or during account creation. Re-present terms when major updates are made.
- **Example rejection:** "Your app's Terms of Use do not include a statement that you will act on reports of objectionable content within 24 hours, or that users who repeatedly post such content will be removed."

---

## Additional UGC Rules

### Moderation Plan in Review Notes  ·  Guideline 1.2  ·  WARNING
- **What to check:** App Review reviewers cannot verify automated moderation by inspection alone. Without a written moderation plan in the review notes, expect a follow-up information request that delays approval.
- **How to detect:** Use `asc_check_submission` to read the current review notes. Confirm the notes describe: what moderation is used, what categories of content are filtered, escalation path for severe content (CSAM → NCMEC), and the 24h human review SLA.
- **Resolution:** Add a moderation section to App Review notes. Be specific: "We use [service] for automated image scanning and a human review queue with a 24-hour SLA. CSAM is reported to NCMEC per legal obligation."
- **Example rejection:** "Please provide information about your content moderation process, including how your app detects and removes objectionable user-generated content."

---

### Age Rating Reflects UGC Presence  ·  Guideline 1.2 / Rating  ·  WARNING
- **What to check:** Apps with unrestricted UGC must be rated 17+ for "Frequent/Intense" mature/suggestive themes because any user can post adult content. Ratings lower than 17+ for an unmoderated or weakly moderated UGC app will be corrected by Apple — or rejected.
- **How to detect:** Use `asc_get_age_rating` to retrieve the current rating and the answers to the rating questionnaire. Confirm "User Generated Content" toggle is set to the appropriate frequency.
- **Resolution:** Set the UGC questionnaire answer to "Frequent/Intense" unless your moderation guarantees content is kept within a lower tier. If moderation is robust and auditable, a lower rating may be defensible — document it in review notes.
- **Example rejection:** "Your app allows users to generate and share content with other users but is not rated 17+. Apps with user-generated content must be rated appropriately."

---

### Contact Information for Law Enforcement Reports  ·  Guideline 1.2  ·  WARNING
- **What to check:** The developer must provide contact information (email or web form) that law enforcement or Apple can use to report illegal UGC (CSAM, threats, etc.). This is typically in the privacy policy or a dedicated safety page.
- **How to detect:** Visit the privacy policy URL from `asc_get_privacy`. Search for a safety contact email or form. Confirm the link is not behind authentication.
- **Resolution:** Add a "Safety / Law Enforcement Contact" section to your privacy policy or support page with a dedicated email (e.g., safety@yourdomain.com).
- **Example rejection:** "Your app's privacy policy or support materials do not provide a contact mechanism for law enforcement to report illegal or harmful user-generated content."

---

### Account Deletion Applies to UGC Accounts  ·  Guideline 5.1.1(v)  ·  REJECTION
- **What to check:** Social apps are account-based by nature. Account deletion must remove or anonymize all UGC posted by the deleted account (not just the profile). Users must not be forced to email support to delete — deletion must be initiatable in-app.
- **How to detect:** Manually navigate to account settings in the review build. Use `asc_get_privacy` to verify deletion is declared in the privacy label. Post test content, then delete the test account and verify content is removed or anonymized per your privacy policy.
- **Resolution:** Wire in-app account deletion to a backend job that purges or anonymizes all associated posts, comments, and media. Provide a confirmation screen with data deletion timeline. See `type-all-apps.md` for the baseline rule.
- **Example rejection:** "Your app requires users to contact customer support via email to delete their account. Account deletion must be initiatable from within the app."

<!-- REFERENCE: submission-preflight/references/type-subscription-iap.md -->

# Preflight Pack — Subscriptions & IAP

Deep pack for Guideline 3.1.1 / 3.1.2. Open this alongside `rule-subscription.md` and whenever the app offers any auto-renewable subscription, consumable, or non-consumable IAP. Cross-reference: `paywall-design`, `app-store-pricing`, `subscription-lifecycle`.

---

### IAP for Digital Goods  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** All digital content, features, or services consumed within the app must be purchased through Apple's IAP system. Physical goods and services rendered outside the app are exempt.
- **How to detect:** Use `asc_list_iaps` and `asc_list_subscriptions` to confirm every purchasable item is registered. grep source for payment SDKs (Stripe, Braintree, PayPal) not wrapped behind an entitlement check — these are disqualifying if they gate digital content.
- **Resolution:** Route all digital-good purchases through StoreKit. Remove or server-gate any alternative payment path that affects in-app feature access.
- **Example rejection:** "Your app includes the ability to purchase digital content or services using a payment mechanism other than in-app purchase, which is not permitted."

---

### Paywall Disclosure Completeness  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** Before a user initiates an auto-renewable subscription purchase, the paywall must clearly display: price, billing period, what is included, that billing is automatic and recurring, a link to the EULA, and a link to the privacy policy.
- **How to detect:** Manually walk the subscription purchase flow in the current build. Use `asc_get_metadata` to verify EULA URL is set in App Store Connect. Use `asc_get_privacy` to confirm the privacy policy URL is present. Screenshot the paywall for review.
- **Resolution:** Render all required disclosure elements above the purchase CTA. Do not bury them behind a "terms" link that opens only after tapping buy. Apple expects price and period to be visually prominent.
- **Example rejection:** "We noticed your app's subscription paywall does not clearly display the price, duration, and content included in the subscription prior to purchase initiation."

---

### Restore Purchases  ·  Guideline 3.1.1  ·  REJECTION
- **What to check:** Any app selling non-consumable IAP or auto-renewable subscriptions must provide a visible "Restore Purchases" button accessible without requiring a new purchase attempt.
- **How to detect:** Manually navigate all purchase-gated screens. grep source for `restoreCompletedTransactions` / `Transaction.currentEntitlements`. Use `asc_check_submission` to see if this is flagged.
- **Resolution:** Place a "Restore Purchases" button on the paywall or in Settings. It must be reachable on a fresh install without prompting a new purchase.
- **Example rejection:** "Your app does not include a mechanism to restore previously purchased in-app purchases. Please add a 'Restore Purchases' option that users can access without initiating a new purchase."

---

### Free Trial Terms Disclosure  ·  Guideline 3.1.2  ·  REJECTION
- **What to check:** If the subscription offers a free trial, introductory, or promotional period, the paywall must state the trial length, what happens at the end (price + billing period), and how to cancel before being charged.
- **How to detect:** Use `asc_list_subscriptions` to check introductory offer configuration. Manually trigger the trial-eligible purchase flow and inspect displayed text.
- **Resolution:** Display trial terms in human-readable language adjacent to the subscribe button, e.g., "7-day free trial, then $9.99/month. Cancel anytime in Settings before trial ends."
- **Example rejection:** "Your app offers a free trial period but does not clearly communicate the price and billing period that will apply once the trial ends, or how users can cancel before being charged."

---

### No External-Payment Steering  ·  Guideline 3.1.1 / Anti-Steering  ·  REJECTION
- **What to check:** The app must not contain buttons, links, or language that direct users to purchase outside the app to avoid Apple's commission. This includes URLs to web checkout, references to "cheaper on our website," and developer emails soliciting purchases.
- **How to detect:** grep source and all web views for "cheaper," "website," "sign up at," external checkout URLs embedded in app strings. Use `asc_get_metadata` to check description for steering language (also rejected).
- **Resolution:** Remove all external-payment call-to-actions for digital goods. Reader apps and qualifying apps may use an external purchase link only under the specific entitlement Apple grants — do not implement without that entitlement.
- **Example rejection:** "Your app contains a link or call-to-action that directs users to a purchase mechanism other than in-app purchase. Apps may not include buttons, external links, or other calls to action that direct customers to purchase mechanisms other than Apple's in-app purchase."

---

### Subscription Group / Upgrade-Downgrade Correctness  ·  Guideline 3.1.2  ·  WARNING
- **What to check:** All tiers of a subscription product family must be in the same subscription group. Upgrade, downgrade, and crossgrade behavior must match the group ranking. Users must not be charged twice during a tier switch.
- **How to detect:** Use `asc_list_subscriptions` to inspect group membership and rank ordering. Verify in StoreKit Testing that a downgrade defers correctly and an upgrade is immediate.
- **Resolution:** Assign correct ranks within the group (1 = highest value). Test all switching paths in a sandbox environment. Do not create separate groups for tiers that compete.
- **Example rejection:** "We found that users who upgrade or downgrade their subscription are being charged for both the old and new subscription simultaneously. Please review your subscription group configuration."

---

### Family Sharing Claims  ·  Guideline 3.1.2  ·  WARNING
- **What to check:** If the App Store product page or paywall claims Family Sharing is supported, the IAP/subscription must have Family Sharing enabled in App Store Connect, and the app must handle the `familyShared` transaction property correctly.
- **How to detect:** Use `asc_list_subscriptions` / `asc_list_iaps` to verify "Family Sharing" toggle state. grep source for `familyShared` handling.
- **Resolution:** Enable Family Sharing on the relevant products in App Store Connect and implement the corresponding StoreKit entitlement check. Remove marketing claims if the feature is not configured.
- **Example rejection:** "Your app's description states that the subscription supports Family Sharing, but the subscription product in App Store Connect does not have Family Sharing enabled."

---

### "Free" Claims When Paywalled  ·  Guideline 2.3.2 / 3.1.2  ·  REJECTION
- **What to check:** If core functionality requires a subscription or IAP, the app must not be described as "free" in the name, subtitle, or description without clearly disclosing that additional purchases are required. The app metadata must not be misleading about cost.
- **How to detect:** Use `asc_get_metadata` to retrieve name, subtitle, and description. Search for "free," "no cost," "no subscription needed." Confirm whether the app is actually usable without payment.
- **Resolution:** Replace misleading "free" language with "free to download" or "try for free" where accurate. Ensure the description mentions required purchases prominently.
- **Example rejection:** "Your app's description states the app is 'free,' however, users are immediately presented with a subscription paywall upon launch with no free tier available."

<!-- REFERENCE: submission-preflight/references/type-vpn-utility.md -->

# Preflight Pack — VPN & Network Utility Apps

---

### VPN Must Use NEVPNManager / NetworkExtension  ·  Guideline 5.4  ·  REJECTION
- **What to check:** VPN apps must implement tunneling via `NEVPNManager`, `NETunnelProviderManager`, or `NEPacketTunnelProvider` from the NetworkExtension framework. Apps that attempt to route traffic through non-system-approved mechanisms (e.g., proxy-only, custom socket layer without the NE entitlement) are rejected.
- **How to detect:** Use `asc_check_submission` for entitlement validation errors. Check the app's `.entitlements` file for `com.apple.developer.networking.vpn.api` and `com.apple.developer.networking.networkextension`. Verify the NetworkExtension bundle extension (`.appex`) is present in the app bundle and declares the correct `NSExtensionPointIdentifier` (`com.apple.networkextension.packet-tunnel` or equivalent).
- **Resolution:** Implement the appropriate `NEProvider` subclass. Request the NetworkExtension entitlement via the Apple Developer portal. Ensure the App Extension target is included in the main app bundle. Refer to Apple's Human Interface Guidelines for VPN onboarding best practices.
- **Example rejection:** "Your app provides VPN functionality but does not use the NetworkExtension framework as required. All VPN apps must use the approved APIs to establish VPN connections."

---

### VPN Provider Must Be an Enrolled Organization  ·  Guideline 5.4  ·  REJECTION
- **What to check:** VPN services must be offered by organizations enrolled in the Apple Developer Program as a company or organization (not an individual account). The VPN service must be operated by the developer of record or an entity they represent.
- **How to detect:** Use `asc_get_metadata` to check the seller name and developer type. Individual-account submissions offering third-party VPN services are a red flag. Verify that the App Review notes or Terms of Service identify the VPN infrastructure operator and its relationship to the developer.
- **Resolution:** Re-enroll under an organizational developer account. Ensure the Terms of Service and privacy policy name the VPN operator and describe the service relationship. If acting as a reseller, document the formal agreement with the infrastructure provider in App Review notes.
- **Example rejection:** "Your app provides a VPN service but is submitted under an individual developer account. VPN apps must be submitted by organizations that provide the VPN service themselves."

---

### No Selling or Sharing User Traffic Data  ·  Guideline 5.4  ·  REJECTION
- **What to check:** VPN providers must commit in their privacy policy and App Store privacy nutrition label that user traffic, browsing history, and connection metadata are not sold to third parties or used for advertising targeting. Any such use is a direct guideline violation.
- **How to detect:** Use `asc_get_privacy` to retrieve declared data types. Flag any declared use of "Browsing History" or "Identifiers" for "Third-Party Advertising" or "Developer's Advertising." Read the linked privacy policy for data-selling or data-sharing clauses. Check whether any third-party analytics SDK is embedded that receives network-level data.
- **Resolution:** Remove any data-sale or data-sharing clauses from the privacy policy. Update the nutrition label to remove advertising-purpose data uses for traffic data. Audit embedded SDKs and disable or remove any that receive user traffic metadata. Add an explicit "We do not sell your data" statement to the privacy policy and in-app settings.
- **Example rejection:** "Your app's privacy policy indicates that user traffic data may be shared with or sold to third parties. VPN apps must not monetize user data collected in the course of providing the VPN service."

---

### No Collection of Data Unrelated to VPN Function  ·  Guideline 5.4 / 5.1.1  ·  REJECTION
- **What to check:** A VPN app may collect only the data necessary to provide the VPN service (e.g., account credentials, connection logs for troubleshooting). Collecting contact lists, photos, device sensors, or broad analytics unrelated to connectivity is prohibited.
- **How to detect:** Use `asc_get_privacy` and compare declared data types against what a VPN service legitimately requires. Flag data types such as "Contacts," "Photos or Videos," "Location" (beyond coarse IP-based region selection), or "Health & Fitness" as almost certainly extraneous. Audit the binary for permission request strings (`NSContactsUsageDescription`, etc.) that suggest unrelated collection.
- **Resolution:** Remove all data collection not directly required for VPN provisioning, authentication, and troubleshooting. Delete unrelated permission strings and SDK integrations. Update the nutrition label to reflect only the data that remains.
- **Example rejection:** "Your app requests access to user data (contacts, photos) that has no clear relationship to the functionality of a VPN service. Apps may only collect data necessary for their core functionality."

---

### Privacy Policy Mandatory  ·  Guideline 5.1.1  ·  REJECTION
- **What to check:** All VPN apps must include a link to a privacy policy both on the App Store product page and within the app itself. The policy must describe what data is collected, how it is used, how long it is retained, and how users can request deletion.
- **How to detect:** Use `asc_get_metadata` to verify the privacy policy URL field is populated. Launch the app and navigate to Settings/About to confirm the in-app privacy policy link is present and resolves to a live page. Check that the policy covers VPN-specific data (connection logs, IP addresses, session timestamps).
- **Resolution:** Draft or update a VPN-specific privacy policy that explicitly addresses connection logging practices (zero-log claim requires auditable technical controls). Populate the App Store Connect privacy policy URL field and add a tappable link within the app UI. See `rule-privacy.md` for full nutrition label guidance.
- **Example rejection:** "Your app does not include a link to a privacy policy on its App Store product page, which is required for all apps."

---

### No Private APIs in Network Utilities  ·  Guideline 2.5.1  ·  REJECTION
- **What to check:** Network and utility apps frequently attempt to use private APIs to inspect network interfaces, packet contents, or system configurations (e.g., undocumented `SystemConfiguration` calls, private `CoreTelephony` symbols, kernel extension remnants). These are rejected.
- **How to detect:** Run `nm -u <binary>` or use MachOView to scan for symbols with `_` prefixes not present in public SDK headers. Use `asc_check_submission` for "ITMS-90338: Non-public API usage." Compare symbol names against the current iOS/macOS SDK header exports.
- **Resolution:** Replace private API calls with documented equivalents from NetworkExtension, CoreTelephony's public interface, or CFNetwork. If no public API exists for the required capability, redesign the feature or request an entitlement through Apple's formal entitlement request process.
- **Example rejection:** "Your app uses one or more non-public APIs: [symbol list]. The use of non-public APIs is not permitted on the App Store as it may lead to a poor user experience if those APIs change."

---

### Content Blockers Must Use the Proper Extension API  ·  Guideline 2.5.1 / 5.4  ·  REJECTION
- **What to check:** Apps that block ads or trackers in Safari must use the `WKContentRuleList` / Content Blocker Extension API. Implementing content filtering by proxying all device traffic through a VPN-based DNS sinkhole without user transparency and proper VPN entitlements is a violation.
- **How to detect:** Check the app bundle for a Content Blocker extension (`NSExtensionPointIdentifier: com.apple.Safari.content-blocker`). If the app instead establishes a local VPN or DNS-over-HTTPS profile to achieve blocking, verify it declares the `NEVPNManager` entitlement and clearly discloses this mechanism to users.
- **Resolution:** For Safari content blocking: implement a proper `WKContentRuleListStore`-backed extension. For system-wide blocking via DNS/VPN: declare the NetworkExtension entitlement, disclose the VPN mechanism in onboarding, and obtain explicit user consent before establishing the VPN configuration.
- **Example rejection:** "Your app installs a VPN configuration to filter network traffic but does not use the approved Content Blocker Extension API for this purpose and does not adequately disclose the VPN usage to users."

---

### Local Law Compliance and Regional Availability  ·  Guideline 5.4 / Legal Requirements  ·  WARNING
- **What to check:** VPN apps may be illegal or restricted in certain jurisdictions (e.g., VPN services in China require ICP licensing and government approval). Distributing a VPN app in a region where it violates local law can result in removal from that storefront.
- **How to detect:** Use `asc_get_metadata` to check the territory availability list. Flag availability in China, Russia, UAE, and other known VPN-restricted markets unless the developer has confirmed local compliance. Verify that the App Store Connect territory settings reflect legal availability.
- **Resolution:** Restrict availability to territories where VPN operation is legally permitted. For China distribution, obtain the required ICP license and submit through the appropriate channel. Document legal authorizations in App Review notes. Monitor Apple's published list of country-specific guideline overrides.
- **Example rejection:** "Your app has been removed from the [Country] App Store because it does not comply with local laws regarding VPN services. VPN apps must comply with all applicable laws in the regions where they are distributed."

---

### Clear Disclosure of Routed Traffic  ·  Guideline 5.4 / 5.1.1  ·  WARNING
- **What to check:** Users must understand what traffic is routed through the VPN (all traffic, split-tunnel, only specific apps), which server regions are used, and what the VPN's logging policy is before they connect. This must be disclosed in onboarding and in the app's settings.
- **How to detect:** Walk through the VPN onboarding flow manually. Verify a plain-language description of traffic routing appears before the VPN profile installation prompt. Use `asc_get_metadata` and review screenshots for any disclosure language. Check the privacy policy for a logging statement (no-log, minimal-log, or full-log) and verify it matches the in-app disclosure.
- **Resolution:** Add an onboarding screen summarizing: what traffic is routed, which countries' servers are used, and the logging policy. Surface the logging policy again in Settings. Ensure the App Store description and screenshots are consistent with these disclosures.
- **Example rejection:** "Your app does not adequately disclose to users what network traffic will be routed through the VPN or what information is logged, which is required for VPN apps under App Store Review Guideline 5.4."

---

**Cross-references:** `rule-privacy.md` (nutrition label and privacy policy requirements), `privacy-manifest` (SDK privacy manifest audit for embedded analytics).

<!-- REFERENCE: submission-preflight/templates/overlay-template.md -->

---
name: {{overlayName}}
description: {{overlayDescription}}
---

<!-- GENERATED by overlay-sync from .claude/apple-overlays.json. The region
     between the BEGIN/END managed markers is regenerated on every sync — DO NOT
     hand-edit it. Add project notes BELOW the END marker; those are preserved.
     Vars this engine reads from the descriptor's `vars` (all optional — each has
     a sensible default): appName, appStoreId, bundleIds, appTypes,
     demoCredsPath, complianceNotes. -->

# {{overlayTitle}}

> Thin **project overlay** over the generic `submission-preflight` engine. The
> engine owns the rule packs (six universal buckets + per-type packs), the
> detection schema, the highest-ROI checks, and the output template. This overlay
> only binds the engine to **{{projectName}}** — the app's identity, which type
> packs apply, and where the demo credentials and review notes live.
>
> Run the `submission-preflight` skill; apply the bindings below before pulling
> live state via the App Store Connect MCP.

<!-- BEGIN submission-preflight:managed — generated by overlay-sync, do not edit -->

## App under review

| Field | Value |
|-------|-------|
| App | {{appName}} |
| App Store ID | {{appStoreId}} |
| Bundle IDs | {{bundleIds}} |

## Type packs to load

Always load `references/type-all-apps.md` first, then the project-specific packs:

{{appTypes}}

## Demo & reviewability

{{demoCredsPath}}

## Project compliance notes

{{complianceNotes}}

<!-- END submission-preflight:managed -->

## Project notes (preserved across syncs)

<!-- Add prior rejection history, reviewer-note boilerplate, or project-specific
     preflight gotchas here. overlay-sync never touches anything below the END
     marker. -->

<!-- END SKILL: submission-preflight -->

---

<!-- BEGIN SKILL: subscription-lifecycle -->

# subscription-lifecycle

# Subscription Lifecycle

**Retain every subscriber you already paid to acquire — because acquisition cost is sunk the moment they tap Subscribe.**

Paywall design lives in `paywall-design`. Pricing economics live in `app-store-pricing`. StoreKit code lives in `storekit-purchases`. This skill owns everything that happens *after* the purchase: nurturing trials, renewing paid subscribers, rescuing billing failures, and winning back churned users.

---

## The Lifecycle Map

```
Free Trial ──► Paid (active) ──► Renewal attempt
     │               │                  │
     │ trial-to-paid │ voluntary         ├── Success ──► Paid (renewed)
     │ conversion    │ cancellation      │
     ▼               ▼                  └── Failure ──► Grace Period (16 days)
  Expired        Cancelled                                    │
  Trial          (voluntary                       ├── Recovered ──► Paid
                  churn)                          └── Expired ──► Billing Retry
                                                                   (60 days)
                                                                        │
                                                              ├── Recovered
                                                              └── Lapsed ──► Win-back
```

Every state transition maps to an App Store Server Notification V2 event. Model this state machine in your backend before writing any UI.

---

## Trial Nurture

### What Apple Gives You

- `isEligibleForIntroOffer` — query via `StoreKit 2` product's `subscription.isEligibleForIntroOffer`. Gate your paywall intro-offer messaging on this flag; showing an offer to an ineligible user wastes premium paywall real estate and feels broken.
- **Intro offer types** — Free Trial (period of $0), Pay Up Front (one-time discounted price), Pay As You Go (discounted recurring price). Each has different psychology and conversion curves; see `app-store-pricing` for the economics.

### Nurture Moments During a Free Trial

| Day | Touchpoint | Goal |
|-----|-----------|------|
| 0 (start) | Onboarding completion prompt | Activate the core value prop immediately |
| 2–3 | First win notification | Surface a result the user got from the app |
| Trial end minus 3 days | Conversion push | Remind, show social proof, offer frictionless cancel info |
| Trial end minus 1 day | Final nudge | Urgency without desperation; cite what they'll lose |

Implement these via `push-notifications`. Never send more than two trial-end nudges — Apple's HIG calls out "harassment patterns" and users who feel spammed cancel before the trial ends.

### Free Trial vs Pay As You Go vs Pay Up Front

- **Free trial** — Highest top-of-funnel conversion, lowest intent signal. Expect 40–60% of trials to cancel before paying.
- **Pay As You Go** — Lower acquisition but higher intent; subscribers who paid even $1 churn at lower rates.
- **Pay Up Front** — Works for premium/niche apps where perceived value is immediate. Rare in consumer apps.

---

## Voluntary Churn: Stop the Bleed

### Cancellation Reasons (What Apple Surfaces)

App Store Server Notifications V2 delivers a `DID_CHANGE_RENEWAL_STATUS` event with `cancellationReason` in the signed renewal info:

| Code | Meaning |
|------|---------|
| 0 | Other/not specified |
| 1 | Price increase (subscriber declined) |

That's it — Apple gives you almost nothing here. Mine your own in-app cancellation flow for the real signal.

### In-App Retention Save Flow

Trigger a save flow when a user taps your "Manage Subscription" or "Cancel" button — *before* they leave your app for the iOS subscription management screen.

**Save flow architecture:**

1. Intercept the cancel intent in-app.
2. Ask one question: "What's not working?" — offer 3–5 radio options (too expensive, not using it, missing a feature, switching apps, other).
3. Route to the appropriate save offer based on the answer:
   - **Too expensive** — show a downgrade tier or promotional offer code.
   - **Not using it** — offer a pause (if you support it) or remind of pending value.
   - **Missing feature** — collect the feedback, offer a small win-back discount.
4. If the user still wants to cancel, deep-link to `itms-apps://apps.apple.com/account/subscriptions` — never make them hunt for the cancel button. Friction here earns a 1-star review.

**Downgrade offers** — If you have multiple subscription tiers, surface a cheaper tier explicitly. A subscriber on a lower plan is worth more than a churned user.

**Promotional offer codes** — Generate via ASC or the `asc_list_subscriptions` MCP tool. Offer codes can be single-use or multi-use and can unlock a discounted price or a free extension period. Present these in the save flow for high-LTV subscribers.

### Win-Back Offers (iOS 18+, StoreKit 2)

iOS 18 introduced first-class win-back offer support in StoreKit 2.

- Create win-back offers in ASC under your subscription's Offers section (type: Win-Back).
- StoreKit surfaces eligible offers via `product.subscription.promotionalOffers` — check `offerType == .winBack`.
- Eligibility: the user must have previously subscribed and be currently lapsed.
- Present win-back paywalls in your app's post-lapse re-engagement flows, or in push campaigns (see `push-notifications`).
- Win-back offer codes can also be distributed externally (email, web) — generate them in ASC.

**Win-back sequence:**

```
Day 1 post-lapse  — emotional "we miss you" push with specific value reminder
Day 7             — concrete offer: "Come back at 40% off for 3 months"
Day 30            — final offer or sunset message
```

Do not spam. Lapsed users who uninstall after aggressive win-back campaigns will never return.

---

## Involuntary Churn: The Silent Killer

Involuntary churn — billing failures — typically accounts for 20–40% of total subscriber loss in mature apps. Most teams underinvest here because it's invisible until you look.

### The Apple Billing Recovery Stack

Apple runs its own retry logic automatically, but you need to understand each layer:

#### 1. Billing Grace Period

- Opt in to Billing Grace Period in ASC (Subscriptions configuration).
- Duration: 16 days for monthly, 16 days for annual (Apple defines the period).
- During grace period: subscription stays active, user retains access, Apple keeps retrying payment.
- Detection: `expiresDate` is in the past but `gracePeriodExpiresDate` is in the future in the signed transaction. Server Notification: `GRACE_PERIOD_EXPIRED` fires if payment is never recovered.
- **Always opt in.** The access-continuity alone reduces involuntary churn by 20–30% with zero engineering beyond enabling it.

#### 2. App Store Billing Retry

- After grace period expires, Apple enters a billing retry window of up to 60 days.
- The subscription is expired during this window; you should restrict access.
- Server Notification: `DID_FAIL_TO_RENEW` — fires when the original renewal attempt fails.
- Notification: `DID_RENEW` — fires when Apple successfully recovers payment. Re-grant access immediately.

#### 3. Account Hold (Google Play equivalent)

Apple does not have a separate "account hold" state distinct from grace period — do not conflate with Google Play's model.

### App Store Server Notifications V2 — Events to Handle

Register your HTTPS endpoint in ASC (App Information). Handle at minimum:

| Notification type | Subtype | Action |
|-------------------|---------|--------|
| `DID_FAIL_TO_RENEW` | — | Begin dunning; restrict access after grace period |
| `GRACE_PERIOD_EXPIRED` | — | Hard restrict access; escalate dunning |
| `DID_RENEW` | — | Restore access immediately |
| `EXPIRED` | `VOLUNTARY` | Voluntary cancel confirmed |
| `EXPIRED` | `BILLING_RETRY` | Billing retry exhausted; move to win-back flow |
| `DID_CHANGE_RENEWAL_STATUS` | `AUTO_RENEW_DISABLED` | Trigger save flow if user is still in-app |
| `OFFER_REDEEMED` | — | Log offer redemption; tag in analytics |

Validate every signed payload using Apple's public key. Never trust unverified notifications.

### Dunning / Recovery Messaging

Dunning = communicating with users whose billing is failing. Do this via `push-notifications` and optionally email (collected at signup):

**Message principles:**
- Frame as "help us update your payment" not "your subscription failed."
- Deep-link directly to the iOS payment update screen: `itms-apps://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions` (or the equivalent updated URL from Apple's documentation).
- Three touches maximum during the grace period. After that, silence until win-back.

**Dunning sequence during grace period:**

| Day | Channel | Tone |
|-----|---------|------|
| 1 | Push | Friendly alert; "just checking" |
| 5 | Push | Slightly more urgent; surface value |
| 12 | Push | Final warning before access ends |

After `GRACE_PERIOD_EXPIRED`, stop dunning pushes. Move to a win-back email sequence (outside Apple's system) if you collected email.

---

## Metrics That Matter

Track these per cohort (acquisition channel, paywall variant, subscription tier):

| Metric | Definition | Healthy range |
|--------|-----------|---------------|
| Trial-to-paid % | Paid conversions / trials started | 40–65% (varies by vertical) |
| Month-1 renewal rate | Subs renewing after first period / subs who completed first period | 60–80% |
| Monthly churn rate | Churned this month / active start of month | Under 5% for strong apps |
| Voluntary churn % | Voluntary cancels / total churn | Should be the majority; if involuntary is over 30%, fix billing |
| Involuntary churn % | Billing failures / total churn | Target below 20% with grace period enabled |
| Recovery rate | Recovered billing failures / total billing failures | 50–70% is achievable with grace period + dunning |
| Subscriber LTV | ARPU / churn rate | Model by cohort; factor in intro-offer discounts |
| Win-back rate | Re-subscribed / total lapsed (30-day window) | 5–15% is realistic |

### Where to Read These in ASC

- **ASC Subscriptions report** — Revenue, proceeds, active subscribers, churned, reactivated. Available in the Reports section; also queryable via the App Store Connect MCP (`asc_list_subscriptions` for active, `asc_get_subscription_report` for historical).
- **App Store Server API** — Pull individual subscriber status via `GET /inApps/v1/subscriptions/{transactionId}` for real-time state reconciliation.
- **Sales and Trends** — Subscription overview with cohort graphs in the ASC web UI.
- See `app-analytics` for cohort retention and `retention-optimization` for intervention design grounded in the data.

---

## Lifecycle Audit Checklist

Run this against any subscription app before shipping or diagnosing a churn problem:

### Trial Configuration
- [ ] `isEligibleForIntroOffer` gates intro-offer messaging — non-eligible users see standard paywall
- [ ] Trial length matches value-delivery timeline (users must hit the "aha moment" before trial ends)
- [ ] At least two trial-nurture pushes scheduled (see `push-notifications`)

### Voluntary Churn
- [ ] In-app save flow intercepts cancel intent before user leaves to iOS Settings
- [ ] Cancellation reason collected in-app (even if Apple's data is thin)
- [ ] Downgrade tier available and surfaced in save flow
- [ ] Win-back offers configured in ASC for each subscription product (iOS 18+ eligible)
- [ ] Post-cancel win-back sequence defined (day 1, day 7, day 30)

### Involuntary Churn
- [ ] Billing Grace Period enabled in ASC for all subscription groups
- [ ] App Store Server Notifications V2 endpoint registered and validated
- [ ] `DID_FAIL_TO_RENEW` handler restricts access gracefully (not abruptly)
- [ ] `DID_RENEW` handler restores access within seconds
- [ ] `GRACE_PERIOD_EXPIRED` escalates to restricted access + escalated dunning
- [ ] Dunning push sequence live (days 1, 5, 12 during grace period)
- [ ] Deep-link to iOS payment update screen tested on physical device

### Metrics
- [ ] Trial-to-paid % tracked per paywall variant
- [ ] Voluntary vs involuntary churn split tracked monthly
- [ ] Recovery rate measured (billing failures recovered / total failures)
- [ ] LTV model exists per subscription tier and acquisition cohort

---

## Lifecycle Audit Output Template

When auditing a subscription app, produce a report in this shape:

```
## Subscription Lifecycle Audit — [App Name]

### Trial Health
- Trial-to-paid %: [X%] (benchmark: 40–65%)
- Trial nurture: [present / missing / partial]
- isEligibleForIntroOffer gate: [yes / no]

### Voluntary Churn
- Monthly voluntary churn: [X%]
- In-app save flow: [present / missing]
- Win-back offers: [configured / not configured]

### Involuntary Churn (PRIORITY: HIGH / MEDIUM / LOW)
- Billing grace period: [enabled / DISABLED]
- Server Notifications V2: [registered / not registered]
- DID_FAIL_TO_RENEW handler: [present / missing]
- Recovery rate: [X%] (estimate if unknown)
- Dunning sequence: [configured / missing]

### Top 3 Actions
1. [Highest-impact fix with expected churn improvement]
2. [Second action]
3. [Third action]
```

---

## Cross-Skill References

| Need | Skill |
|------|-------|
| Paywall layout and offer presentation | `paywall-design` |
| StoreKit 2 transaction and renewal code | `storekit-purchases` |
| Intro offer pricing and price increase strategy | `app-store-pricing` |
| Push notification dunning and win-back campaigns | `push-notifications` |
| Cohort retention analysis and intervention design | `retention-optimization` |
| ASC metrics and reporting queries | `app-analytics` |
| Subscriber sentiment and churn signals via reviews | `review-management` |

<!-- END SKILL: subscription-lifecycle -->

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

## Core Philosophy

### Start Single-Threaded, Profile Before Optimizing

Concurrency is a complexity tax. Apps should begin with all code on the main thread and only introduce concurrency when profiling data proves it's necessary.

- **Use Instruments first.** Run the Time Profiler to confirm that severe hangs are genuinely caused by main-thread blocking before converting code to run concurrently.
- **Optimize without concurrency first.** If code can be made faster algorithmically (better data structures, reduced work, caching), pursue that route before adding `async/await` or background tasks.
- **Latency vs. throughput.** Use `async/await` to hide latency (network, disk). Use `async let` or `TaskGroup` to exploit multiple CPU cores for parallel computation. Do not conflate the two.

### When to Use Each Concurrency Tool

| Goal | Tool | Example |
|------|------|---------|
| Hide I/O latency | `async/await` | Network request, file read |
| Parallel CPU work | `async let`, `TaskGroup` | Image processing, data parsing |
| Isolate shared mutable state | Custom `actor` | Cache, network connection manager |
| Update UI safely | `@MainActor` | ViewModel, ObservableObject |

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

### 10. Framework callback closures inherit `@MainActor` isolation and crash at runtime

Inside a `@MainActor` type or function, closures passed to framework callbacks silently inherit MainActor isolation. If the framework invokes the callback on its own queue (haptics, notifications, UIKit icon changes, audio delegates, etc.), Swift 6 isolation enforcement crashes the app rather than hopping threads.

```swift
// Wrong — closure inherits MainActor isolation, but CHHapticEngine calls it on its own queue
@MainActor
enum NearHaptics {
    static func sent() {
        let engine = try! CHHapticEngine()
        engine.notifyWhenPlayersFinished { _ in .stopEngine }  // CRASH
    }
}

// Correct — mark the closure @Sendable so it does not inherit MainActor isolation
@MainActor
enum NearHaptics {
    static func sent() {
        let engine = try! CHHapticEngine()
        engine.notifyWhenPlayersFinished { @Sendable _ in .stopEngine }
    }
}
```

Other common offenders:

```swift
// Wrong
UNUserNotificationCenter.current().setBadgeCount(1) { _ in }
UIApplication.shared.setAlternateIconName("dark") { error in
    if error != nil { /* handle */ }
}

// Correct
UNUserNotificationCenter.current().setBadgeCount(1) { @Sendable _ in }
UIApplication.shared.setAlternateIconName("dark") { @Sendable error in
    Task { @MainActor in
        if error != nil { /* handle */ }
    }
}
```

For delegate-style callbacks where you cannot mark the closure `@Sendable`, dispatch the work back explicitly:

```swift
// Correct
final class AudioEndDelegate: NSObject, AVAudioPlayerDelegate {
    private let onFinish: @MainActor () -> Void
    init(onFinish: @escaping @MainActor () -> Void) { self.onFinish = onFinish }
    nonisolated func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        Task { @MainActor in onFinish() }
    }
}
```

**Fix:** Mark framework callback closures `@Sendable` when they need no MainActor access. If they *do* need MainActor access, wrap only that work in `Task { @MainActor in ... }` rather than letting the whole closure inherit isolation.

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
| Framework callback inside `@MainActor` context crashes at runtime | Mark closure `@Sendable`; use `Task { @MainActor in }` only for UI work |

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

---

## Audit Checklist

Use this checklist when reviewing existing code for concurrency safety or during a Swift 6 migration.

### Before Adding Concurrency
- [ ] **Profiled with Instruments.** Confirmed the bottleneck is main-thread blocking, not algorithmic inefficiency.
- [ ] **No single-threaded optimization possible.** Cache lookups, reduced copies, or better algorithms won't solve it.

### Build Settings & Compiler
- [ ] **Swift 6 language mode enabled.** `SWIFT_STRICT_CONCURRENCY: complete` (or `SWIFT_VERSION: 6.0`).
- [ ] **Default isolation reviewed.** If using `SWIFT_DEFAULT_ACTOR_ISOLATION: MainActor`, avoid explicit `@MainActor` on the same declarations (nested isolation causes deinit crashes).
- [ ] **SPM targets configured.** Packages do not inherit Xcode build settings; set `defaultIsolation: MainActor.self` in `Package.swift` if needed (Swift tools 6.2+).

### Main Actor Isolation
- [ ] **No deinit accessing MainActor state.** All `@MainActor` classes use `nonisolated deinit` and store cleanup resources in `nonisolated(unsafe)` properties when necessary.
- [ ] **Callbacks that update UI hop to MainActor.** Framework callbacks (AVCapture, audio taps, Obj-C delegates) use `Task { @MainActor [weak self] in }`, not `MainActor.assumeIsolated`.
- [ ] **Task isolation is explicit.** `Task { }` created inside `nonisolated` functions does NOT inherit MainActor; mark `@MainActor` inside the closure if UI state is touched.

### Shared Mutable State
- [ ] **No data races flagged by compiler.** If a race exists, ask: does this state truly need to be shared?
- [ ] **Reference types not arbitrarily marked Sendable.** Model classes remain on the main actor or are kept non-Sendable intentionally. Do not add `Sendable` conformance to mutable reference types without proper synchronization.
- [ ] **Value types preferred.** Structs and enums with Sendable members are the safest way to pass data across concurrency boundaries.
- [ ] **Custom actors used for subsystem state.** Network managers, caches, and connection pools that hold mutable state are isolated to dedicated actors, not the main actor.

### Framework Interop
- [ ] **`@preconcurrency import` used only on demand.** Do not add prophylactically to first-party frameworks (EventKit, HealthKit, AVFoundation, etc.). Only apply where the compiler specifically demands it on a single import.
- [ ] **Framework callbacks are not over-isolated.** Inside `@MainActor` types/functions, closures passed to framework callbacks (haptics, notifications, UIKit icon APIs, audio delegates, etc.) are marked `@Sendable` or dispatch to `@MainActor` explicitly. Do not let the closure inherit MainActor isolation if the framework invokes it on its own queue.
- [ ] **Non-Sendable framework types isolated.** Types like `EKReminder`, `NSManagedObject`, `VNRequest` are never passed between actors; access them within their isolation domain or extract scalars first.

### Build Verification
- [ ] **Archive build passes.** Debug builds (`-Onone`) may miss strict concurrency errors. Always validate with an archive build (`Product > Archive` or `xcodebuild archive`) before pushing.
- [ ] **Thread Sanitizer clean.** Run the test suite with TSan enabled to catch runtime races the compiler missed.
- [ ] **Real device tested.** Simulator can miss some timing-dependent races.

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

