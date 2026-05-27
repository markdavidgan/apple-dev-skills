# Apple Dev Skills — Catalog

> Version: **0.1.0**
> Generated: 2026-05-27
> Repository: https://github.com/markdavidgan/apple-dev-skills

## Skills (19)

| Skill | Description | Invoke |
|-------|-------------|--------|
| apple-cleanup | Exhaustive engineering hardening of an iOS app. Reviews for Swift 6 compliance, crash risks, App Store rejection risks, and tech debt; builds a surgical plan; dispatches parallel subagents to fix all P0-P2 issues; then pushes an alpha to TestFlight. Use for pre-submission cleanup and code hardening, not design polish. | `/apple-cleanup [app] — EXHAUSTIVE cleanup: review → plan → fix ALL (P0-P2) → optimize → TestFlight alpha` |
| apple-patterns-check | Validate iOS code against Apple's best practices. Run during /ship, before commits, or when reviewing code for Apple-specific compliance. Triggers on "check patterns", "apple check", "pre-commit check", or "validate swift code". | `/apple-check [path] — Validate Apple patterns in modified files` |
| apple-polish | Design and keynote-readiness craftsmanship review of an iOS app. Evaluates through Jony Ive (visual obsession) and Steve Jobs (demo readiness) perspectives, presents prioritized findings, then orchestrates parallel agents to fix selected issues and push a TestFlight build. Use for design polish, not engineering bugs. | `/apple-polish [app] — Design & keynote review → select issues → fix → TestFlight` |
| apple-review | Comprehensive Apple-grade review of an iOS app covering design (Apple design leader perspective), engineering (architecture and code quality), compliance (App Store rejection risks), and keynote readiness (product story and demo quality). Use when asked for a full app review, Apple-quality audit, design critique, HIG compliance check, App Store readiness assessment, or "would Apple approve this", "keynote ready", "WWDC ready". | `/apple-review [app-dir] — Full Apple-grade review (design + engineering + compliance + keynote)` |
| asc-build-check | Check the latest CI build status and debug failures using the App Store Connect MCP server. Use when user says "check build", "what broke", "CI status", "build failing", or asks about recent build failures. Also use for signing issues, provisioning profiles, bundle ID capabilities, or Developer Portal queries. |  |
| asc-submission | Prepare an app for App Store submission or TestFlight distribution using the App Store Connect MCP server. Use when user says "prepare submission", "submit to app store", "prepare for review", "update metadata", "set what's new", "check submission readiness", "distribute to testflight", or wants to manage App Store Connect metadata, screenshots, or review submissions. |  |
| complete-feature | Complete a feature implementation with full validation. Use when a feature feels 'done' to ensure nothing is missed before committing. | `/complete-feature [feature-name] — Run full validation and completion workflow` |
| ios-accessibility | Audit SwiftUI views for accessibility issues and apply fixes. Use whenever VoiceOver, Dynamic Type, accessibility labels, screen readers, or App Store accessibility is mentioned. Also trigger when asked to "make it accessible", improve UI quality broadly, or prepare for App Store review. |  |
| ios-asc | App Store Connect MCP tools for signing certificates, provisioning profiles, TestFlight builds, and app submission. |  |
| ios-build | iOS build system patterns, validation workflows, XcodeGen, and common build failure solutions. Use for build errors, validation, and CI/CD setup. |  |
| ios-design | SwiftUI design system patterns, iOS 26 Liquid Glass, accessibility best practices, and preview patterns. |  |
| ios-simulate | iOS Simulator workflows, xcrun simctl commands, screenshot automation, and device management. |  |
| ios-standards | Swift 6.0+ standards, strict concurrency patterns, modern SwiftUI with @Observable, and @MainActor isolation. Essential for iOS 26+ development. Updated 2026-04-04 with crash audit findings. |  |
| ios-test | XCTest patterns, SwiftData testing with in-memory containers, UI testing, and test performance budgets for iOS. |  |
| ios26-api-reference | Authoritative iOS/macOS/watchOS 26 API reference with 3-tier smart loading. Prevents crashes from hallucinated APIs. Trigger on ANY code involving FoundationModels, SpeechTranscriber, SpeechAnalyzer, @Generable, LanguageModelSession, glassEffect, SwiftData, @Observable, Live Activity, App Intents, Vision, VideoToolbox, Network.framework, AVAudioEngine, MenuBarExtra, NSPanel, WKHapticType, or WCSession. Also trigger on Swift 6 concurrency errors, Sendable warnings, or @MainActor isolation issues. |  |
| merge-check | Automatically verify code quality before merging to main. Triggers when user mentions merging, creating PRs, or asks if code is ready. Spawns parallel subagents for build, test, and lint verification. Use for quality gates before main branch integration. |  |
| regression-test | Add regression tests when fixing bugs. Use when user says "fix this bug", "this is broken", "fix this issue", or when implementing any bug fix to prevent recurrence. |  |
| swift6-concurrency | Handle Swift 6 concurrency patterns. Use when encountering Sendable warnings, data race errors, MainActor isolation issues, or framework interop problems (EventKit, Speech, AVFoundation, etc.). Trigger on "Swift 6 error", "Sendable", "data race", "MainActor", "concurrency warning", or "strict concurrency". |  |
| verify-against-spec | Use when finishing a spec-driven feature, when asked to verify nothing was missed, when approaching context limits on a long feature session, or after hearing "make sure everything is implemented". Cross-checks the design spec against the actual implementation, in parallel with build and doc verification. | `/verify-against-spec [spec-path] — Check implementation coverage against design spec` |

## Agents (3)

| Agent | Model | Effort | Description |
|-------|-------|--------|-------------|
| auditor | sonnet | medium | Deep codebase analyzer for architectural reviews, compliance audits, and comprehensive assessments. Use PROACTIVELY when evaluating architecture before major changes, auditing for Swift 6 compliance, identifying tech debt across modules, scoring code quality, or conducting engineering reviews that require systematic layer-by-layer analysis. |
| build-agent | haiku | low | Build and compilation specialist for iOS/Swift projects. Use PROACTIVELY for build failures, compilation errors, or build system configuration tasks. |
| ios-code-reviewer | sonnet | low | Reviews iOS code changes against iOS 26 crash patterns, concurrency rules, and API correctness. Lighter than auditor — focused on changed files only. Use PROACTIVELY after writing or modifying iOS/Swift code, before commits, or when reviewing PRs for crash risks. |

## Commands (6)

| Command | Description | Arguments |
|---------|-------------|-----------|
| /apple-check | Validate Apple patterns in modified Swift files. Runs the apple-patterns-check skill. | `[path]` |
| /apple-cleanup | EXHAUSTIVE engineering hardening: review → plan → fix ALL (P0-P2) → optimize → TestFlight alpha. Runs the apple-cleanup skill. | `[app-dir]` |
| /apple-polish | Design & keynote craftsmanship review → select issues → fix → TestFlight. Runs the apple-polish skill. | `[app-dir]` |
| /apple-review | Full Apple-grade review (design + engineering + compliance + keynote). Review only, no fixes. Runs the apple-review skill. | `[app-dir]` |
| /complete-feature | Complete a feature with full validation across build, tests, lint, and patterns. Runs the complete-feature skill. | `[feature-name]` |
| /setup-asc | Configure App Store Connect API authentication for the ASC MCP server. Guides through API key setup (Key ID, Issuer ID, .p8 file), validates credentials, and generates MCP configuration. Use when user says "setup asc", "configure app store connect", "asc api key", or needs to set up the App Store Connect MCP server. |  |

## MCP Servers

| Server | Version | Description |
|--------|---------|-------------|
| asc-mcp | 0.1.0 | MCP server for the full App Store Connect API — CI/CD, signing, metadata, TestFlight, IAP, reviews, and more |

---

## Platform Compatibility

See [docs/platform-compatibility.md](docs/platform-compatibility.md) for the full feature matrix.
