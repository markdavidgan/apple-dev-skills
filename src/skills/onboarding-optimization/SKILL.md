---
name: onboarding-optimization
category: product
description: Audit and redesign first-run flows to drive activation with minimum friction. Use when a user says "too many users drop off before they do anything useful", "our Day-1 retention is bad", "we need to improve onboarding", "users aren't reaching the aha moment", "when should we ask for permissions", "can we defer sign-up", "our activation rate is low", or "audit our first-run experience". Covers tap-count audits, permission-prompt strategy, sign-up friction reduction, and measurement.
---

# Onboarding Optimization

**Get every new user to their first moment of real value — fast, frictionlessly, and without a rejection from App Store Review.**

---

## The Core Goal: Activation, Not Completion

Onboarding is not a tutorial. It is a funnel with one exit condition: the user experiences the activation event — the moment they understand why this app exists for them.

Everything before that event is pure overhead. Every screen that does not directly advance the user toward activation is a drop-off risk.

### Define the Activation Event First

Before auditing a single screen, name the activation event for your app type:

| App type | Activation event |
|---|---|
| Task manager | First task created and checked off |
| Finance / budgeting | First transaction categorized |
| Social | First connection made or first post published |
| Fitness | First workout logged or first plan started |
| Streaming / media | First piece of content played for 30+ seconds |
| Shopping | First item saved or first purchase completed |
| Utility (e.g., scanner) | First scan completed and exported |
| Developer tool | First successful build or first API call |

Write this event down. Every onboarding decision is evaluated by a single question: does this step bring the user closer to that event, or does it delay it?

---

## First-Run Flow Audit

### Count Everything

Instrument or walk through the current onboarding manually. Record:

- Total screens from cold launch to activation event
- Total taps required (including "Next", "Continue", "Allow", "Skip")
- Screens that require user input (text fields, toggles, selections)
- Screens that are pure marketing or feature explanation with no user action

A healthy first-run flow reaches activation in **5 taps or fewer** for simple apps; under 10 for complex ones. If you are beyond that, you are losing users.

### The Cut List

Apply these rules in order:

1. **Remove feature tours.** If the screen says "Here is what you can do", cut it. Show the user by letting them do it.
2. **Remove welcome screens that aren't personalization.** A splash with your tagline is not onboarding; it is friction.
3. **Collapse multi-step questionnaires.** More than 3 personalization questions before first value is too many. Reduce, or move them post-activation.
4. **Cut all permissions not needed for the activation event.** Notifications, contacts, tracking — these do not belong on screen 2 of a utility app.
5. **Defer account creation.** (See sign-up friction section below.)

### The Defer Heuristic

If removing a step would still allow the user to reach the activation event, defer it. If deferring it would break the core loop, keep it and make it as fast as possible.

---

## Permission-Prompt Strategy

Getting rejected by users on system prompts is permanent for some permissions (ATT, notifications on iOS 16+). A denial cannot be undone without the user visiting Settings manually. One bad permission screen early in onboarding can destroy the rest of the flow.

### The Rule: Contextual Timing Only

Never request multiple permissions in sequence on the same screen or in the first 60 seconds. Request each permission at the moment the user needs the feature it enables.

| Permission | When to ask |
|---|---|
| Notifications (`push-notifications`) | After user completes a task that has a time dimension, or after they enable a reminder feature |
| Location | When user taps a map, a nearby search, or a feature that is clearly location-dependent |
| Camera / microphone | When user taps the camera button or a record action |
| Contacts | When user taps "Find friends" or "Invite", never before |
| ATT (App Tracking Transparency) | After the user has experienced value — Day 1 retention improves when ATT is requested post-activation |
| Health / HealthKit | When user navigates to the health integration section |
| Photos | When user attempts to import or export a photo |

### Pre-Permission Priming Screens

Before every system permission prompt, show a custom priming screen. This is a single screen — not a modal — that explains:

- What the permission is for (one sentence, plain language)
- What the user will gain by granting it
- That they are about to see an iOS prompt

**Effective priming screen anatomy:**

```
[Icon representing the feature, not the permission]

"[App name] uses your location to show nearby [things]."

"We never store your location or share it with third parties."

[Allow button — primary, full width]
[Not now — secondary, text link]
```

Then immediately trigger the system prompt. The user who taps "Allow" on your screen will almost always allow the system prompt too.

### NSUsageDescription Strings

Short, honest, specific. Review rejects vague strings.

Bad: `"This app needs your location."`
Good: `"Your location is used to show [Feature Name] results near you. It is never stored on our servers."`

For ATT specifically, the `NSUserTrackingUsageDescription` must not imply tracking is optional when it is required for core function, and must not make claims about sharing that you cannot enforce. See `privacy-manifest` for the full list of required reasons API declarations.

---

## Sign-Up Friction

### Default Position: Let Users Try First

Unless your app has zero utility without an account (real-time multiplayer, sync-first tools), let users reach the activation event without signing in. Require an account only when they want to save, sync, or share.

Implementation options in order of preference:

1. **Anonymous account (preferred)** — Create a silent, unauthenticated session on first launch. Persist local data. Prompt to "save your progress" with Sign in with Apple when the user has something worth saving.
2. **Guest mode** — Explicit "Continue without account" path. Data is device-local. Prompt to sign in at a natural save point.
3. **Deferred sign-up wall** — Force sign-in only when the user attempts a feature that requires a server-side identity (share, sync, leaderboard).

Never put a sign-in wall before the activation event unless the app is inherently identity-first (social, banking).

### Sign In With Apple

Offer Sign in with Apple as the primary option on every sign-up screen. Apple requires it when any third-party social login is offered. Beyond compliance:

- Zero-friction for users already authenticated on device
- Built-in Hide My Email reduces friction for privacy-conscious users
- Apple handles two-factor; you inherit that trust

Ordering on the sign-up screen: Sign in with Apple first, other social options second, email/password last.

### Minimize Required Fields

If you have a traditional form, audit each field:

| Field | Keep? |
|---|---|
| Email | Only if required for account; skip if using Sign in with Apple |
| Password | Skip if using Sign in with Apple or passkey |
| Full name | Almost never needed at sign-up; ask post-activation |
| Phone number | Only if SMS verification is core to your security model |
| Birthday / age | Only if required for legal compliance (COPPA, etc.) |
| Profile photo | Defer; never required at sign-up |

If you need more than email + password for a traditional account, question why.

### Passkeys

Offer Passkeys (`AuthenticationServices`) as the credential type for new accounts. Passkeys eliminate password fatigue, have zero phishing surface, and are the direction Apple is explicitly pushing. For new apps, passkeys + Sign in with Apple covers nearly all users.

---

## Onboarding Paywall Placement

If the app has a free trial or a hard paywall, placement matters enormously. Two models work:

**Post-activation paywall** — Show the paywall after the user has experienced the activation event. They understand the value; conversion rates are higher; App Store Review has no reason to flag the flow as deceptive. Hand off to `paywall-design` for screen anatomy and StoreKit 2 integration.

**Soft-gate model** — Let users access a subset of features indefinitely. Surface the paywall contextually when they attempt a premium feature. This performs best for utility and productivity apps.

Avoid: paywalls on screen 1 or 2 before the user has done anything. This is increasingly flagged in App Store Review as "misleading" and user reviews will mention it.

---

## Copy and Empty States

### Onboarding Copy Principles

Align with `apple-design-language` voice guidelines:

- Lead with benefit, not feature name. "See what is near you" not "Location Feature Enabled".
- Use second-person, present tense. "You are set up." not "Setup complete."
- Avoid exclamation marks. Apple's own onboarding does not use them; they undercut authority.
- Permission priming copy: state the user benefit first, data handling second.

### First Empty State

The state the user sees immediately after completing sign-up or activating an account is the most important empty state in the app. It must:

1. Confirm they are in the right place
2. Show exactly one clear call to action that leads to the activation event
3. Not list every feature the app has

See `apple-design-language` for illustration, icon, and layout guidance on empty states.

### Accessibility of the Onboarding Flow

Run every onboarding screen through VoiceOver before shipping. Common failures:

- Images without `accessibilityLabel`
- Custom "Allow" / "Skip" buttons not reachable by VoiceOver
- Progress indicators (dots) not announcing step count
- Priming screen dismiss gestures not supported by Switch Control

See `ios-accessibility` for the full audit checklist and Dynamic Type compliance requirements. The onboarding flow is the first experience a user with accessibility needs has with your product; a broken flow causes immediate uninstalls.

---

## Measurement

Instrument the onboarding funnel before shipping. Without data you cannot improve it. See `app-analytics` for event schema and funnel setup.

### Events to Track

| Event | Properties |
|---|---|
| `onboarding_started` | app version, device model, iOS version |
| `onboarding_step_viewed` | step index, step name |
| `onboarding_step_completed` | step index, step name, time on step |
| `permission_priming_viewed` | permission type |
| `permission_system_prompt_shown` | permission type |
| `permission_granted` | permission type |
| `permission_denied` | permission type |
| `signup_started` | method (apple, email, guest) |
| `signup_completed` | method, time to complete |
| `onboarding_skipped` | step where user tapped skip |
| `activation_event` | (your custom event name) |

### Metrics That Matter

- **Day-1 activation rate** — percentage of installs that reach the activation event within 24 hours. Target varies by app type; under 40% for a simple utility is a red flag.
- **Step-by-step drop-off** — waterfall chart from `onboarding_started` to `activation_event`. Any single step with more than 20% drop-off is a problem.
- **Permission grant rates** — track per permission type. Below 50% for notifications or ATT usually means the priming screen is weak.
- **Time to activation** — median minutes from first launch to activation event. Long times (over 5 minutes for a simple app) indicate friction.
- **D1 / D7 / D30 retention** — see `retention-optimization` for cohort analysis and benchmarks.

---

## Onboarding Audit Output Template

Use this as a deliverable when auditing an existing flow.

```
ONBOARDING AUDIT — [App Name] — [Date]

ACTIVATION EVENT
Defined: [yes / no — state the event]

FLOW SUMMARY
Total screens: [n]
Total taps to activation: [n]
Required input screens: [n]
Pure marketing screens (recommend cut): [n]

PERMISSION PROMPTS
Permissions requested before activation event: [list]
Priming screens present: [yes / no per permission]
NSUsageDescription quality: [pass / fail per permission]
ATT request timing: [before / after activation]

SIGN-UP FRICTION
Sign in with Apple offered: [yes / no]
Account required before activation: [yes / no]
Guest / anonymous mode available: [yes / no]
Required fields at sign-up: [list]

COPY AUDIT
Benefit-led copy on key screens: [yes / no]
Empty state CTA clarity: [1–5]
Accessibility labels present: [yes / no]

MEASUREMENT
Funnel events instrumented: [yes / no]
Activation event tracked: [yes / no]
Permission grant rates visible: [yes / no]

TOP 3 RECOMMENDATIONS
1. [Highest-impact change]
2. [Second change]
3. [Third change]

HANDOFFS
- Paywall screen: paywall-design
- Privacy / ATT declarations: privacy-manifest
- Push priming: push-notifications
- Accessibility audit: ios-accessibility
- Analytics schema: app-analytics
- Retention cohorts: retention-optimization
- App Intents for re-engagement: app-intents
- Copy and empty state design: apple-design-language
```

---

## Quick Checklist

- [ ] Activation event defined and tracked
- [ ] Flow reaches activation in 10 taps or fewer
- [ ] Welcome / feature-tour screens removed or cut
- [ ] Account creation deferred; guest or anonymous mode available
- [ ] Sign in with Apple offered as primary option
- [ ] No permission requested before it is contextually needed
- [ ] Priming screen precedes every system permission prompt
- [ ] NSUsageDescription strings are specific and honest
- [ ] ATT prompt fires post-activation
- [ ] Paywall placement is post-activation (hand off to `paywall-design`)
- [ ] Empty state has exactly one CTA pointing at activation
- [ ] VoiceOver navigates all onboarding screens correctly (hand off to `ios-accessibility`)
- [ ] Full funnel instrumented; Day-1 activation rate baseline captured (hand off to `app-analytics`)
- [ ] Retention cohorts set up to measure onboarding changes over time (hand off to `retention-optimization`)
