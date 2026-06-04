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

Correct Title Case: capitalize the first word, last word, all nouns, verbs, adjectives, adverbs. Do not capitalize articles (a, an, the), coordinating conjunctions (and, but, or), or prepositions (to, for, in, on, at, with) unless they open the title.

---

## 3. Buttons and labels

**The verb names the outcome, not the mechanism.**

The user cares what happens, not how the system achieves it.

- Prefer "Save" over "Submit" — "submit" is a form mechanic, not a user goal.
- Prefer "Delete" over "Remove" when data is permanently gone.
- Prefer "Send" over "Upload" in social or messaging contexts.
- Prefer "Sign In" over "Login" — two words, Title Case.

**OK is the default of last resort.** Use a specific verb whenever one fits. "Got It" is acceptable for dismissing informational alerts where no action is being taken. Never label a destructive confirmation button "OK" — the real verb (Delete, Remove, Discard) must appear.

**One primary call-to-action per screen.** If two equal-weight buttons appear, one is probably wrong. The primary verb drives the screen's purpose; the secondary is Cancel or Done.

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

Never ship "No items." as a final empty state. It names a fact; it does not help the user.

**Good example:**
Title: "No Entries Yet"
Body: "Start by adding your first entry."
Button: "Add Entry"

**Bad example:**
"No items."

One sentence with no cause and no path forward. This is anti-slop tell #13 in the hub.

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
