---
name: retention-optimization
category: product
description: Diagnose and fix user retention by reading cohort curves, pinpointing churn leaks, and deploying Apple-native re-engagement levers. Use when D1/D7/D30 retention is low or dropping, when users activate but do not form habits, when deciding on a notification sequence, when adding widgets or Live Activities to drive return visits, or when diagnosing the step where users churn. Trigger on "retention", "users are dropping off", "D7 curve", "cohort", "re-engagement", "hab it loop", "bring users back", or "churn diagnosis".
---

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
