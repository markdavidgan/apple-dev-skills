# Apple Dev Skills — Catalog

> Version: **0.1.0**
> Generated: 2026-06-01
> Repository: https://github.com/markdavidgan/apple-dev-skills

## Skills (25)

| Skill | Description | Invoke |
|-------|-------------|--------|
| app-brand-identity | Create a complete brand identity system for Apple platform apps — wordmark, icon, design tokens, brand voice, and App Store marketing assets. Use when starting a new app, renaming/rebranding, designing a logo, choosing typography, building a design system, or preparing App Store screenshots and preview materials. | `/brand-identity [app-name] — Create wordmark, icon, design tokens, and App Store marketing asset strategy` |
| app-store-pricing | App Store pricing strategy, global equalization, subscription management, and regional pricing decisions using Apple's official 900-price-point system. Use when user asks about pricing tiers, IAP pricing, subscription pricing, regional pricing, price changes, App Store proceeds, base storefront selection, introductory offers, or promotional offers. | `/pricing-strategy [app-id] — Recommend App Store pricing setup and global equalization strategy` |
| apple-architecture-diagram | Create WWDC-Keynote-ready, self-contained HTML architecture diagrams for Apple platform apps (iOS, macOS, watchOS, tvOS, visionOS). Activates when users ask for app architecture, system design, data flow, module structure, or technical documentation for Apple apps. Produces ultra-beautiful, drill-down capable diagrams with Apple-native design language. | `/arch-diagram [topic] — Create a self-contained HTML architecture diagram for the given topic or system.` |
| apple-cleanup | Exhaustive engineering hardening of an iOS app. Reviews for Swift 6 compliance, crash risks, App Store rejection risks, and tech debt; builds a surgical plan; dispatches parallel subagents to fix all P0-P2 issues; then pushes an alpha to TestFlight. Use for pre-submission cleanup and code hardening, not design polish. | `/apple-cleanup [app] — EXHAUSTIVE cleanup: review → plan → fix ALL (P0-P2) → optimize → TestFlight alpha` |
| apple-design | Apple platform design system, iOS 26 & macOS 26 Liquid Glass, design tokens, and accessibility-aware previews. Use when building or reviewing SwiftUI views, defining a theme or design tokens, applying Liquid Glass, organizing asset catalogs, or improving visual consistency. Trigger on "design system", "theme", "design tokens", "Liquid Glass", "glassEffect", "SwiftUI styling", or "make the UI consistent". |  |
| apple-patterns-check | Validate iOS code against Apple's best practices. Run during /ship, before commits, or when reviewing code for Apple-specific compliance. Triggers on "check patterns", "apple check", "pre-commit check", or "validate swift code". | `/apple-check [path] — Validate Apple patterns in modified files` |
| apple-polish | Design and keynote-readiness craftsmanship review of an iOS app. Evaluates through Jony Ive (visual obsession) and Steve Jobs (demo readiness) perspectives, presents prioritized findings, then orchestrates parallel agents to fix selected issues and push a TestFlight build. Use for design polish, not engineering bugs. | `/apple-polish [app] — Design & keynote review → select issues → fix → TestFlight` |
| apple-review | Comprehensive Apple-grade review of an iOS app covering design (Apple design leader perspective), engineering (architecture and code quality), compliance (App Store rejection risks), and keynote readiness (product story and demo quality). Use when asked for a full app review, Apple-quality audit, design critique, HIG compliance check, App Store readiness assessment, or "would Apple approve this", "keynote ready", "WWDC ready". | `/apple-review [app-dir] — Full Apple-grade review (design + engineering + compliance + keynote)` |
| asc-build-check | Check the latest CI build status and debug failures using the App Store Connect MCP server. Use when user says "check build", "what broke", "CI status", "build failing", or asks about recent build failures. Also use for signing issues, provisioning profiles, bundle ID capabilities, or Developer Portal queries. | `/check-build [app] — Check CI build status and debug failures via App Store Connect MCP.` |
| asc-submission | Prepare an app for App Store submission or TestFlight distribution using the App Store Connect MCP server. Use when user says "prepare submission", "submit to app store", "prepare for review", "update metadata", "set what's new", "check submission readiness", "distribute to testflight", or wants to manage App Store Connect metadata, screenshots, or review submissions. | `/prepare-submission [app] — Check submission readiness, metadata, screenshots, and signing via ASC MCP.` |
| complete-feature | Complete a feature implementation with full validation across build, tests, lint, and Apple patterns before committing. Use when a feature feels "done", before opening a PR, or when you want to confirm nothing was missed. Trigger on "complete this feature", "is this done", "finish the feature", "ready to commit", or "final validation". | `/complete-feature [feature-name] — Run full validation and completion workflow` |
| design-contract | Turn a visual mockup (HTML/PNG/Figma/spec) into a machine-readable design contract plus co-located mockup and #Preview/capture gates, so an executing agent cannot drift from the design. Use before writing or editing a plan that reproduces a mockup. | `/design-contract [mockup-path] — Extract a machine-readable design contract from a mockup` |
| ios-accessibility | Audit SwiftUI views for accessibility issues and apply fixes. Use whenever VoiceOver, Dynamic Type, accessibility labels, screen readers, or App Store accessibility is mentioned. Also trigger when asked to "make it accessible", improve UI quality broadly, or prepare for App Store review. |  |
| ios-asc | App Store Connect MCP tools for code signing, provisioning profiles, bundle IDs, TestFlight builds, beta testers, and App Store metadata/release management. Use when signing an app, creating or repairing provisioning profiles, managing bundle ID capabilities, distributing to TestFlight, managing beta groups, editing App Store versions or localized metadata, or submitting for review. Trigger on "sign the app", "provisioning profile", "distribute to TestFlight", "add beta tester", "submit for review", or "update App Store metadata". |  |
| ios-build | iOS build system patterns — the 4-layer validation pipeline (fast/full/export/upload), XcodeGen project config, archive-vs-debug concurrency checks, and common build-failure fixes. Use for build errors, validation before commit, signing/export problems, XcodeGen setup, or CI/CD configuration. Trigger on "build failing", "validate", "xcodebuild error", "XcodeGen", "archive build", or "set up CI". |  |
| ios-simulate | iOS Simulator workflows via xcrun simctl — boot and shutdown devices, automate screenshots and video, install/uninstall apps, set appearance, and control device state. Use when running an app in the Simulator, capturing screenshots for the App Store or docs, or managing simulator devices. Trigger on "simulator", "simctl", "boot a device", "take a screenshot", "record video", "set dark mode", or "reset simulator". |  |
| ios-standards | Swift 6.0+ standards — strict concurrency, @MainActor isolation, @Observable (not ObservableObject), and modern SwiftUI architecture for iOS 26+. Use when writing or reviewing Swift code, structuring ViewModels and services, or resolving concurrency and isolation design questions. Trigger on "Swift 6", "strict concurrency", "@MainActor", "@Observable", "SwiftUI architecture", or "code standards". |  |
| ios-test | XCTest patterns for unit tests, UI tests, and SwiftData testing with in-memory containers under Swift 6 strict concurrency, plus test performance budgets. Use when writing or fixing tests, setting up test targets, testing SwiftData models, or planning CI test suites. Trigger on "write a test", "unit test", "XCTest", "test SwiftData", "UI test", "flaky test", or "test coverage". Note: never run UI tests without explicit approval. |  |
| ios26-api-reference | Authoritative iOS/macOS/watchOS 26 API reference with 3-tier smart loading. Prevents crashes from hallucinated APIs. Trigger on ANY code involving FoundationModels, SpeechTranscriber, SpeechAnalyzer, @Generable, LanguageModelSession, glassEffect, SwiftData, @Observable, Live Activity, App Intents, Vision, VideoToolbox, Network.framework, AVAudioEngine, MenuBarExtra, NSPanel, WKHapticType, or WCSession. Also trigger on Swift 6 concurrency errors, Sendable warnings, or @MainActor isolation issues. |  |
| merge-check | Automatically verify code quality before merging to main. Triggers when user mentions merging, creating PRs, or asks if code is ready. Spawns parallel subagents for build, test, and lint verification. Use for quality gates before main branch integration. | `/merge-check — Pre-merge quality gate. Runs build, archive, test, and lint checks in parallel.` |
| preview-capture | Render named SwiftUI #Previews to PNG at canonical device resolution for design-contract verification, with an automatic simulator-capability check and a documented fallback for machines that cannot or must not run the simulator. Use to produce capture proof for a design contract's §9 frames. | `/preview-capture [preview-name...] — Render named #Previews to committed PNGs` |
| regression-test | Add regression tests when fixing bugs. Use when user says "fix this bug", "this is broken", "fix this issue", or when implementing any bug fix to prevent recurrence. | `/regression-test [bug-description] — Write a failing test for the bug, fix it, verify, and check for similar issues.` |
| swift6-concurrency | Handle Swift 6 concurrency patterns. Use when encountering Sendable warnings, data race errors, MainActor isolation issues, or framework interop problems (EventKit, Speech, AVFoundation, etc.). Trigger on "Swift 6 error", "Sendable", "data race", "MainActor", "concurrency warning", or "strict concurrency". | `/swift6-fix [file] — Diagnose and fix Swift 6 strict concurrency, Sendable, or MainActor isolation errors.` |
| swiftui-micro-craft | Quantified rules and a mechanical auditor for Apple-grade SwiftUI micro-craft — the spacing, alignment, optical centering, padding, corner-radius concentricity, SF Symbol pairing, depth, hairlines, Dynamic Type, motion, gestures, and haptics details that separate shipped Apple quality from AI-slop UI. Use when writing or reviewing any SwiftUI view, when spacing or padding or alignment feels off, when about to hardcode a size or duration, or before committing UI code. | `/swiftui-micro-craft — Audit a SwiftUI view against quantified Apple-grade micro-craft rules` |
| verify-against-spec | Use when finishing a spec-driven feature, when asked to verify nothing was missed, when approaching context limits on a long feature session, or after hearing "make sure everything is implemented". Cross-checks the design spec against the actual implementation, in parallel with build and doc verification. | `/verify-against-spec [spec-path] — Check implementation coverage against design spec` |

## Agents (7)

| Agent | Model | Effort | Description |
|-------|-------|--------|-------------|
| architect | opus | high | Architecture and design decision agent. Use PROACTIVELY for complex architectural decisions, ADR creation, or system design tasks requiring deep reasoning. |
| auditor | sonnet | medium | Deep codebase analyzer for architectural reviews, compliance audits, and comprehensive assessments. Use PROACTIVELY when evaluating architecture before major changes, auditing for Swift 6 compliance, identifying tech debt across modules, scoring code quality, or conducting engineering reviews that require systematic layer-by-layer analysis. |
| build-agent | haiku | low | Build and compilation specialist for iOS/Swift projects. Use PROACTIVELY for build failures, compilation errors, or build system configuration tasks. |
| code-reviewer | sonnet | medium | Code review specialist. Use PROACTIVELY after writing or modifying code for quality, security, and best practice verification. |
| coder | sonnet | medium | General-purpose coding agent. Use for implementing features, fixing bugs, and writing tests. Can read, write, and edit code. |
| explore | haiku | low | Fast codebase exploration agent. Use PROACTIVELY for searching, understanding code structure, or finding patterns without making changes. |
| ios-code-reviewer | sonnet | low | Reviews iOS code changes against iOS 26 crash patterns, concurrency rules, and API correctness. Lighter than auditor — focused on changed files only. Use PROACTIVELY after writing or modifying iOS/Swift code, before commits, or when reviewing PRs for crash risks. |

## Commands (12)

| Command | Description | Arguments |
|---------|-------------|-----------|
| /apple-check | Validate Apple patterns in modified Swift files. Runs the apple-patterns-check skill. | `[path]` |
| /apple-cleanup | EXHAUSTIVE engineering hardening: review → plan → fix ALL (P0-P2) → optimize → TestFlight alpha. Runs the apple-cleanup skill. | `[app-dir]` |
| /apple-polish | Design & keynote craftsmanship review → select issues → fix → TestFlight. Runs the apple-polish skill. | `[app-dir]` |
| /apple-review | Full Apple-grade review (design + engineering + compliance + keynote). Review only, no fixes. Runs the apple-review skill. | `[app-dir]` |
| /arch-diagram | Create a self-contained HTML architecture diagram for the given topic or system. | `[topic]` |
| /check-build | Check CI build status and debug failures via App Store Connect MCP. | `[app]` |
| /complete-feature | Complete a feature with full validation across build, tests, lint, and patterns. Runs the complete-feature skill. | `[feature-name]` |
| /merge-check | Pre-merge quality gate with parallel verification. Runs build, archive, test, and lint checks. |  |
| /prepare-submission | Check submission readiness, metadata, screenshots, and signing via ASC MCP. | `[app]` |
| /regression-test | Write a failing regression test, fix the bug, verify, and check for similar issues. | `[bug-description]` |
| /setup-asc | Configure App Store Connect API authentication for the ASC MCP server. Guides through API key setup (Key ID, Issuer ID, .p8 file), validates credentials, and generates MCP configuration. Use when user says "setup asc", "configure app store connect", "asc api key", or needs to set up the App Store Connect MCP server. |  |
| /swift6-fix | Diagnose and fix Swift 6 strict concurrency, Sendable, or MainActor isolation errors. | `[file]` |

## MCP Servers

| Server | Version | Description |
|--------|---------|-------------|
| asc-mcp | 0.1.0 | MCP server for the full App Store Connect API — CI/CD, signing, metadata, TestFlight, IAP, reviews, and more |

---

## Platform Compatibility

See [docs/platform-compatibility.md](docs/platform-compatibility.md) for the full feature matrix.
