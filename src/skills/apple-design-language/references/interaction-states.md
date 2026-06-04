# Interaction States

Every interactive control ships with a complete set of states; every form is structured for keyboard navigation and inline feedback. Designing one state without the others is incomplete work.

---

## 1. The five-state discipline

Every interactive control must define five states: **default**, **pressed**, **focused**, **disabled**, and — on pointer platforms — **hover**. Hover and focus are the macOS and iPad-with-pointer deltas; never ship a Mac or iPad control with no hover feedback or no focus ring. The system provides defaults for standard controls, but any custom control requires explicit treatment for each.

Disabled is not the same as hidden. Hide a control only when it is irrelevant in the current context (for example, a send button when there is no selected recipient). Disable it — with a reason discoverable nearby — when it is temporarily unavailable. A disabled state without any explanation is a silent dead end; see section 8.

---

## 2. Forms — structure

Group related fields using `Form` and `Section`. One logical idea per section; keep sections short rather than stacking twelve fields in one block.

Use **persistent labels**, never placeholder-as-label (anti-slop #9: relying on `TextField` placeholder text instead of a persistent field label). When the placeholder is the only label, it disappears on first tap and the user loses context mid-entry. Put the label above or beside the field; use `.textFieldLabel` or a `LabeledContent` pattern.

Match the keyboard to the content: `.keyboardType(.emailAddress)` for email, `.keyboardType(.decimalPad)` for amounts, `.textContentType(.username)` and `.textContentType(.password)` for credential fields so the system can offer autofill. Field order should follow logical reading sequence — name before email, street before city before zip.

---

## 3. Forms — validation timing

Validate on submit for required-field and format errors. The user should not see "Email is required" before they have had a chance to enter anything.

Validate inline only for rules the user can fix while typing — for example, password strength rules — and only after the field has lost focus at least once (first blur). Never fire inline validation on every keystroke from an empty field; that produces a cascade of red text the moment the form renders.

Show the error message adjacent to the field that triggered it, in sentence case, and say how to fix it: "Enter a valid email address, like name@example.com." not "Invalid input."

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

Anti-slop #10: never ship spinner-only with no empty state and no error variant designed. Every loading surface needs all three reachable states: loading, loaded (or empty), and error. Design them together.

Avoid layout shift when content arrives. If content will push other elements around on load, use a placeholder that reserves the space.

---

## 7. Destructive actions

Confirm destructive actions with an `.alert` using a button in the `.destructive` role, labeled with the real action verb. "Delete" not "OK". "Remove Account" not "Yes". The user must be able to read the confirmation button and know exactly what will happen.

Where feasible, prefer offering an **undo affordance** over a confirmation-only prompt. An undo affordance is better than a confirmation-only prompt — it is less friction for users who intended the action and a safety net for those who did not. Archive with an undo banner (non-destructive, non-blocking surface) beats a modal confirm-then-no-recovery pattern.

Never use a non-modal banner or overlay for destructive confirmation (anti-slop #11: a non-modal banner or overlay where an `.alert` is required for data loss or destructive confirmation). Banners can be dismissed accidentally, partially obscured, or missed. Destructive confirmation requires a blocking decision surface.

---

## 8. Disabled affordances

A disabled primary button must let the user discover why it is disabled. Silent dead buttons — a `.disabled(true)` primary CTA with no explanation — are a slop tell.

Acceptable patterns: helper text beneath the button naming the missing condition ("Add at least one item to continue"), or a tappable-but-explaining variant that enables on tap and shows an inline explanation of what is needed. Never ship a form where the submit button is grey and the user has no signal about what is blocking them.

---

See the hub: ../SKILL.md
