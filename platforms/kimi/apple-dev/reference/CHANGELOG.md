# iOS 26 API Reference — Changelog

All notable changes to the ios26-api-reference skill.

---

## 2026-04-08 — v2.0: Knowledge Architecture Upgrade

### Changed
- **SKILL.md rewritten** as 3-tier smart dispatcher (~250 lines, down from 1,835)
  - Framework detection table maps imports → essentials files
  - 5 universal crash rules always in context
  - Loading protocol for write/debug/review scenarios
  - Quick Reference Card with corrected API signatures
  - Error decoder ring for 7 most common crashes

### Added — Tier 1: Essentials (compact crash patterns per framework)
- `essentials/swift6.md` — @MainActor, Sendable, Task isolation, nonisolated deinit
- `essentials/swiftui.md` — @Observable, Liquid Glass, Canvas, sheets, navigation
- `essentials/swiftdata.md` — @Model safety, ModelActor trap, migrations, CloudKit
- `essentials/foundation-models.md` — Tool protocol (call not invoke), @Generable, availability
- `essentials/speech.md` — SpeechTranscriber (not SFSpeechRecognizer), SpeechAnalyzer actor
- `essentials/avfoundation.md` — AVAudioEngine lifecycle, installTap 9-step sequence
- `essentials/widgets.md` — Live Activity lifecycle, budgets, timer display, App Groups
- `essentials/app-intents.md` — ssu-cli-app crash, LiveActivityIntent, entity queries
- `essentials/vision.md` — VNRequest types, CVPixelBuffer safety, Vision actor pattern
- `essentials/videotoolbox.md` — VTSession lifecycle, safe memory patterns
- `essentials/network.md` — NWConnection state machine, protocol framing
- `essentials/macos.md` — MenuBarExtra, NSPanel, NSEvent monitors, sharing
- `essentials/watchos.md` — WKHapticType, WCSession, Speech/FM unavailability

### Added — Tier 2: Full References (loaded on demand for debugging)
- `reference/swift6-reference.md` through `reference/network-reference.md` (11 files)
- `reference/apple-guides.md` — Apple documentation compilation
- `reference/crash-cheat-sheet.md` — Universal crash prevention rules

### Added — Tier 3: Expert Guides + Community Intel
- `guides/expert-swift6.md` — Actor isolation deep-dive, migration patterns
- `guides/expert-foundation-models.md` — Advanced FM patterns, performance, safety
- `guides/expert-speech-audio.md` — SpeechTranscriber + AVAudioEngine integration
- `intel/community-swift6.md` — Swift Forums findings, real-world migration
- `intel/community-foundation-models.md` — Developer forum FM findings
- `intel/community-speech.md` — Speech framework production gotchas
- `intel/community-avaudio.md` — AVAudioEngine issues from AudioKit, WhisperKit

### Source
Ported from the iOS 26 API Bible (53K+ lines of verified Apple framework references), with project-specific content stripped for portability. Every file includes `### References` with Apple documentation URLs.

### Architecture
- **Smart loading:** Agents detect imports → load only matching essentials (~300-500 lines each)
- **Context budget:** Typical task loads 700-1,800 lines; deep debugging up to 5,000
- **Old monolithic SKILL.md replaced** (was 1,835 lines, now ~225-line dispatcher)

---

## 2026-04-04 — v1.0: Initial Release

### Added
- Monolithic `SKILL.md` (1,835 lines) covering:
  - FoundationModels (sessions, @Generable, streaming, tools)
  - Speech (SpeechTranscriber, SpeechAnalyzer)
  - WidgetKit / Live Activities
  - SwiftUI (Liquid Glass, Canvas, @Observable)
  - SwiftData (#Index, iOS 26 additions)
  - Swift 6 + Default Actor Isolation
  - Known Gotchas & Anti-Patterns
  - Conditional Compilation
  - macOS AppKit patterns
  - watchOS constraints
  - Quick Reference Card (44 corrected signatures)

### Verified Against
- Apple Developer Documentation (2026-04-04)
- Working codebase implementations
- Xcode 17.0 beta SDK headers
