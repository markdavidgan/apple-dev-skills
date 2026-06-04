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
