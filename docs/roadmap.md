# Apple Dev Skills — Roadmap

Status of the skill set and the planned expansion. This is the single source of truth for *what's next*; the README documents *what ships today*.

Last reviewed: **2026-06-03**.

---

## Strategic Decisions

### One plugin, organized into tracks (not multiple plugin sets)

We deliberately keep **a single `apple-dev-skills` plugin** rather than splitting into per-discipline plugins:

- Skills load lazily by description-matching — only descriptions sit in context, bodies load on trigger. 25 vs 50 skills costs almost nothing, so "too many skills" is not a problem worth fragmenting the repo to solve.
- Skills cross-reference each other **by name** (`apple-review` → `apple-design`, `ios-standards`, …). Plugin boundaries would sever those links.
- The build/validate/install/marketplace pipeline targets one bundle. Splitting doubles maintenance for no user benefit.

**The one case for a second set:** expanding *beyond Apple* — e.g. a platform-agnostic **product-&-growth** set (PRDs, ASO, paywall economics, analytics) useful to non-Apple devs. That is a different audience and a clean seam. Revisit only if/when we go cross-ecosystem. Tracked as a deferred item below.

### Category taxonomy

Skills carry an optional `category:` frontmatter field so tracks are documentable and filterable without fragmenting the plugin. Values:

`design` · `engineering` · `product` · `asc` · `quality` · `workflow` · `reference`

New skills set `category:` from creation. Backfilling the existing 25 is a mechanical follow-up (see Ongoing).

---

## Current Coverage (as of this review)

Strong today: **design/craft** (brand, design system, micro-craft, design-contract, accessibility, previews, polish, architecture diagrams), **core engineering standards** (Swift 6, concurrency, build, test/XCTest, simulate, API reference), **ASC mechanics** (build checks, submission, TestFlight), and **quality workflows** (review, cleanup, merge-check, regression, spec verification).

Gaps cluster in three areas: **product/growth**, **implementation domains** (purchases, surfaces/extensions, networking, sync, security, performance), and **iOS-26 emerging** (on-device AI, Swift Testing, privacy manifests, cross-platform).

---

## Phases

Each phase is a coherent, shippable slice. Phases are ordered by leverage, not dependency.

### Phase 1 — Highest leverage *(in progress)*

| Skill | Category | Why now | Command |
|-------|----------|---------|---------|
| `asc-aso` | product | Biggest product white space — discoverability, not just submission mechanics | `/aso-audit` |
| `apple-foundation-models` | engineering | The headline iOS 26 capability (on-device LLM / Apple Intelligence) | — |
| `storekit-purchases` | engineering | Turns pricing *strategy* into working in-app purchase/subscription code | — |
| `privacy-manifest` | quality | `PrivacyInfo.xcprivacy` + required-reason APIs — prevents real App Store rejections | `/privacy-check` |
| `swift-testing` | engineering | Modernizes the testing story (`@Test`/`#expect`) beyond XCTest | — |

### Phase 2 — App surfaces & extensions

| Skill | Category | Scope |
|-------|----------|-------|
| `app-intents` | engineering | App Intents, Shortcuts, Siri, Spotlight, interactive Widgets, Controls, Live Activities, Dynamic Island |
| `push-notifications` | engineering | APNs, rich/actionable notifications, notification service extension, Live Activity push |

### Phase 3 — Data, networking & security

| Skill | Category | Scope |
|-------|----------|-------|
| `networking` | engineering | `URLSession` async/await, retry/backoff, error & offline handling, decoding |
| `cloudkit-sync` | engineering | CloudKit + SwiftData sync, conflict resolution, sharing |
| `app-security` | engineering | Keychain, App Attest / DeviceCheck, Sign in with Apple, CryptoKit, cert pinning |

### Phase 4 — Performance & localization

| Skill | Category | Scope |
|-------|----------|-------|
| `performance-instruments` | quality | Instruments, launch time, hangs/hitches, memory, energy, MetricKit |
| `localization` | engineering | String Catalogs (`.xcstrings`), pluralization, RTL, pseudolocalization, localized screenshots |

### Phase 5 — Product & growth

| Skill | Category | Scope |
|-------|----------|-------|
| `product-spec` | product | PRD authoring, acceptance criteria (feeds `verify-against-spec`) |
| `paywall-design` | design | Paywall UX, trial/offer design, conversion (bridges `app-store-pricing` → screens) |
| `app-analytics` | product | North-star/funnel framing, StoreKit analytics, conversion measurement |

### Phase 6 — Cross-platform

| Skill | Category | Scope |
|-------|----------|-------|
| `cross-platform-adaptivity` | design | visionOS / macOS / watchOS / iPadOS multitasking, size-class & idiom adaptivity |

---

## Ongoing / Cross-cutting

- **Category backfill** — add `category:` to the existing 25 skills.
- **Skill-count automation** — derive the README count from `src/skills/` instead of a hand-edited number (it drifted 22→25).
- **Second plugin set** — *deferred.* Only if we expand beyond Apple (see Strategic Decisions).
- **Per-skill references** — push long material into `references/*.md` to stay under the 5,000-word guide limit as skills grow.

---

## Authoring Checklist (per new skill)

1. `src/skills/<name>/SKILL.md` with `name`, `description` (WHAT + WHEN + trigger phrases), and `category`.
2. Add `invoke:` + a `src/commands/<cmd>.md` only when there's a clear action verb.
3. Cross-reference sibling skills by name; never hardcode paths.
4. Keep accuracy high — verify framework signatures via the **apple-docs MCP** (`check_availability`, `get_symbol`); prefer pattern-level guidance over invented APIs.
5. `node scripts/validate.js` → `node scripts/build.js` → `node scripts/generate-catalog.js`.
6. Update README (counts + tables) and mark the phase row done here.
