---
name: app-store-featured
category: product
description: Guides you through earning App Store editorial featuring — Today tab, App of the Day, category collections, and In-App Events. Use when preparing a featuring nomination, assessing featuring readiness, writing a pitch for Apple editors, planning an In-App Event for editorial consideration, or asking "how do I get featured on the App Store?" Covers the Apple tech checklist, nomination form timing, pitch writing, and a weighted readiness scorecard.
---

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
