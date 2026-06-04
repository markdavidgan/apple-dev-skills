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
| Apple's own apps (Weather, Music) | Plain-form default and flat, neutral surfaces | Expressive layouts make the content itself the identity of the screen, delivering emotional impact alongside information | Apple itself treats HIG as a floor; match the ambition where content warrants |

---

## Expanded entries

### Things — density through hierarchy

Things, as of recent versions, renders task lists with quieter typography and tighter row spacing than the stock inset-grouped `List` default. The deviation does not feel cramped because the hierarchy does the structural work: project headings, task titles, and metadata carry clearly differentiated weights so the eye always knows where it is. Whitespace is reduced selectively, not uniformly — the breathing room moves to the boundaries between sections rather than between individual rows. The named user benefit is focus: a calm, dense list keeps the user in thinking mode rather than scrolling mode. This pattern transfers to any app where users manage long, frequently-revisited collections — earn the density first with a clear type hierarchy, then compress spacing at the row level.

### Fantastical — custom interaction for the core task

Fantastical's event-entry experience replaces the stock multi-field form with a single natural-language input surface for its most common operation. Instead of tapping through picker fields, the user types or dictates "Lunch with Alex Friday at noon" and the app parses intent. The named user benefit is speed: the single most-repeated task in a calendar app is adding an event, and every tap removed from that path compounds across hundreds of uses. The lesson is directional, not about copying the specific UI: identify the one action users perform most often and ask whether the default form pattern is actually the fastest path to that outcome. Custom interaction is expensive to build and expensive to maintain — it is only worth the investment at the highest-frequency touchpoint.

### Flighty — color that encodes, not decorates

Flighty uses bold, saturated color as a status system for flight data. As of recent versions, flight states — on time, delayed, boarding, landed — each carry a distinct color that appears consistently across list rows, detail headers, and widgets. This deviates from the conservative, near-neutral palette that most utility apps default to. The named user benefit is glanceability: a traveler checks flight status in motion, often briefly, and color lets them read state faster than parsing a label. The principle is a constraint, not a license: deviate from neutral palettes only where the color carries a specific, consistent, learnable meaning. Decorative color that does not encode a state (gradients for atmosphere, accent fills for visual interest) is anti-slop tell #12 and earns nothing.

### Apple's own apps — treating HIG as a floor

Weather, Music, and similar Apple-built apps use edge-to-edge imagery, system materials with substantial depth, and layouts that would look excessive in a plain-form app. These choices are not accidental or Apple-privileged — they are the logical result of content that warrants emotional expression. Weather's full-screen gradients carry the ambient feel of current conditions; Music's artwork-driven layouts make the listening experience part of the visual identity. The named user benefit is informational and emotional density: the screen communicates more than data — it communicates context. The transferable principle is about ambition, not copying any specific layout: when your content has inherent visual or emotional character, a neutral, plain-form treatment wastes it. Build to the content's ceiling, not to the framework's default.

---

## Using these as models: run the four gates first

Each deviation above would still pass the hub's four deviation gates — Named benefit, Survives the slop check, Survives assistive tech, and Systematic — and that is why they hold up. Before imitating any exemplar, run your own proposed deviation through those same four gates. If a gate fails — if you cannot name the user benefit in one sentence, if it trips an anti-slop tell, if it breaks under VoiceOver or at AX5 Dynamic Type, or if it is a one-off rather than a rule applied consistently — use the HIG default instead. Exemplars are evidence that deviation can be earned, not a shortcut past earning it.

---

See the hub: ../SKILL.md
