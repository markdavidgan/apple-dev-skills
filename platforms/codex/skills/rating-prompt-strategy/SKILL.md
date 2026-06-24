---
name: rating-prompt-strategy
category: product
description: Design and implement an ethical App Store rating prompt strategy that maximizes review volume and average rating. Use when you need to add rating prompts to an app, decide when to ask for reviews, debug why prompts are not appearing, recover a rating after a bad version, or plan a full-year review budget. Trigger phrases: "ask for ratings", "SKStoreReviewRequest", "requestReview", "improve App Store rating", "rating prompt timing", "review prompt strategy", "boost ratings", "increase reviews".
---

# Rating Prompt Strategy

**Prompt at the right moment, earn the rating you deserve — Apple controls the rest.**

You get at most three system-managed prompts per 365 days per device. Apple may suppress every one of them. Your only lever is *when* you ask and *who* you ask. Done right, you surface prompts to users who are genuinely delighted, maximize the probability Apple actually shows the dialog, and grow your average rating without ever gaming the system.

---

## Apple's Rules, Precisely

| Constraint | Detail |
|---|---|
| API | `SKStoreReviewRequest.requestReview(in:)` (UIKit) / `requestReview` environment action (SwiftUI) / `AppStore.requestReview(in:)` (iOS 18+) |
| Throttle | System enforces ~3 prompts per 365 days per device; calls beyond that are silently ignored |
| Display guarantee | None. Apple may suppress the prompt entirely — especially if the user has already rated, if they dismissed recently, or based on undisclosed internal signals |
| Custom star gates | Forbidden. You may not show a custom 1–5 star UI that routes low scores away from the App Store and only sends happy users to rate. Guideline 1.1 and Review Guideline 5.6.1 both prohibit this |
| Incentivized reviews | Forbidden. Never offer rewards, currency, or features in exchange for a rating |
| Timing control | Entirely yours — call the API whenever you want, but Apple decides whether to render the prompt |

**Takeaway:** treat each of your three annual calls as a budget line. Spend them on your most satisfied users at your most confident moments.

---

## The Modern Swift API

### SwiftUI (recommended)

```swift
import StoreKit
import SwiftUI

struct TaskCompleteView: View {
    @Environment(\.requestReview) private var requestReview
    @AppStorage("lastReviewedVersion") private var lastReviewedVersion = ""
    @AppStorage("promptsThisYear") private var promptsThisYear = 0
    @AppStorage("firstPromptDate") private var firstPromptDate = 0.0

    var body: some View {
        VStack { /* … */ }
            .onAppear { maybeRequestReview() }
    }

    private func maybeRequestReview() {
        let currentVersion = Bundle.main.appVersion
        guard lastReviewedVersion != currentVersion else { return }
        guard promptsThisYear < 3 else { return }

        let now = Date.now.timeIntervalSinceEpoch
        if promptsThisYear == 0 { firstPromptDate = now }
        let yearInSeconds: Double = 365 * 24 * 3600
        guard now - firstPromptDate < yearInSeconds else {
            // Reset annual budget
            promptsThisYear = 0
            firstPromptDate = now
            return
        }

        requestReview()
        lastReviewedVersion = currentVersion
        promptsThisYear += 1
    }
}
```

### UIKit / iOS 18+

```swift
// iOS 18+
import StoreKit

func promptIfEligible(scene: UIWindowScene) {
    AppStore.requestReview(in: scene)
}

// iOS 16–17 fallback
func promptLegacy(scene: UIWindowScene) {
    SKStoreReviewController.requestReview(in: scene)
}
```

Keep a `Bundle` extension for `appVersion` (`CFBundleShortVersionString`). Do not use build number — minor builds should not reset version-gating.

---

## Timing: When to Call

### The Rule

Prompt only after a user completes a meaningful, positive action. The system prompt should feel like a natural pause, not an interruption.

### High-Signal Trigger Moments

| Moment | Signal Strength | Notes |
|---|---|---|
| Completed a core task for the Nth time (N = 3–5) | Very high | User has formed a habit |
| Hit a streak milestone | High | Emotional peak, not mid-task |
| Finished onboarding successfully | Medium-high | Only if onboarding delivers clear value |
| First purchase confirmed | High | Post-transaction, after success screen |
| Returned after 7+ days away | Medium | Re-engagement moment |
| Reached a goal or level | High | Celebratory context |

### Hard Prohibitions

- Never prompt on cold launch (App Store guidelines, and users are not yet in a positive frame)
- Never prompt after an error, crash, or failed action
- Never prompt mid-task (during a flow, modal, or form)
- Never prompt during a paywall interaction
- Never prompt the same app version twice per device

---

## Pre-Prompt Gating: Detect Satisfaction Without a Custom Star Screen

You cannot build a "are you enjoying the app?" 1–5 screen and only send 4–5 stars to the App Store. That is guideline-violating dark pattern territory.

What you *can* do: use behavioral signals to determine satisfaction before spending a prompt call.

```swift
struct SatisfactionGate {
    static func isSatisfied(engagement: EngagementTracker) -> Bool {
        engagement.sessionsThisWeek >= 3
        && engagement.lastActionSucceeded
        && !engagement.hadErrorInLastSession
        && !engagement.isFirstWeek
    }
}
```

If a user does not pass the gate, do not call `requestReview`. Optionally surface a passive, non-intrusive feedback path — a "Send Feedback" button in Settings, a shake-to-report gesture, or a support link — so dissatisfied users can reach you without leaving a bad review out of frustration.

This is the correct pattern: satisfied users get the prompt, dissatisfied users get a support path. You are not routing based on predicted star rating; you are routing based on readiness.

---

## Version-Gating and Budget Planning

### Version Gate

Track the last app version that triggered a prompt. Do not re-prompt on the same version. Reset when a new version ships.

```swift
let versionKey = "lastReviewPromptVersion"
let current = Bundle.main.appVersion
guard UserDefaults.standard.string(forKey: versionKey) != current else { return }
// … call requestReview …
UserDefaults.standard.set(current, forKey: versionKey)
```

### Spreading the 3-Per-Year Budget

| Prompt | Recommended Timing | Target User State |
|---|---|---|
| Prompt 1 | ~30 days post-install (or after 5 completed core tasks) | Early adopters who stuck around |
| Prompt 2 | ~90 days post-install, or after major feature use | Retained, habitual users |
| Prompt 3 | ~180–240 days (or after a significant milestone) | Power users, loyalists |

Avoid clustering prompts. If you release frequently, hold prompt 2 and 3 for versions with meaningful feature additions — users who just updated and see value are more likely to rate 5 stars.

---

## Rating Recovery After a Bad Version

A bad release — crashes, data loss, broken flows — will spike 1-star reviews. The recovery playbook:

1. **Fix first, prompt never.** Do not call `requestReview` on the bad version. Suppress prompts until the fix ships.
2. **Ship the fix rapidly.** Expedited review is available for critical bug fixes.
3. **Reply to negative reviews.** Use the `review-management` skill to craft developer responses that acknowledge the issue and announce the fix. Responses are public and visible to prospective users.
4. **Resume prompting on the fix version.** Target users who update and then complete a successful core task — they have lived through the bad version and seen you fix it, which is itself a trust signal.
5. **Monitor the trend.** Use `app-analytics` to watch your rolling average rating and `asc-aso` to track keyword ranking impact (ratings affect ranking). Give the recovery 2–4 weeks before assessing.
6. **Do not manufacture reviews.** Never solicit reviews from friends/family accounts or use review exchange services.

---

## Unhappy User Path

Do not suppress the App Store prompt for users you think will rate low. Do build a *parallel* feedback path so dissatisfied users can reach you before they decide to vent in a review.

Recommended placements:

- **Settings screen**: "Send Feedback" → `mailto:support@yourapp.com` or a support form
- **Shake to report**: `UIFeedbackGenerator` pattern, present a support sheet
- **Post-error**: show a "Something went wrong — let us know" banner with a feedback link, not a rating prompt

This is not a gate. Both paths exist independently. You are increasing the probability that a frustrated user contacts you rather than reviewing, while giving satisfied users the system prompt.

---

## Integration with Other Skills

| Skill | Integration Point |
|---|---|
| `review-management` | Reply to reviews surfaced by prompts; coordinate messaging after bad-version recovery |
| `app-analytics` | Track rating trends, session depth, retention curves to calibrate trigger thresholds |
| `asc-aso` | Monitor how rating average and volume affect keyword ranking and conversion on the product page |
| `retention-optimization` | Share engagement signals — streak data, session frequency, task completion — to power the satisfaction gate |

---

## Output Template: Rating Strategy Plan

Use this when shipping a new app or resetting strategy for a new year:

```
App: [name] | Version: [x.y] | Date: [yyyy-mm-dd]

TRIGGER MOMENTS
---------------
Prompt 1: [event] at [milestone] — target [user segment]
Prompt 2: [event] at [milestone] — target [user segment]
Prompt 3: [event] at [milestone] — target [user segment]

SATISFACTION GATE CONDITIONS
-----------------------------
- Sessions this week >= [N]
- No error in last session
- Core task completed >= [N] times total
- App installed >= [N] days

UNHAPPY USER PATH
-----------------
- Settings > Feedback: [mailto / form URL]
- Shake-to-report: [yes / no]
- Post-error banner: [yes / no]

BUDGET TRACKING (reset annually)
---------------------------------
Prompt 1 fired: [date / not yet]
Prompt 2 fired: [date / not yet]
Prompt 3 fired: [date / not yet]

RECOVERY PLAN (if applicable)
------------------------------
Bad version: [x.y] | Issue: [description]
Fix version: [x.y] | Ship date: [date]
Reviews replied to: [yes / partial / no]
Resume prompting on version: [x.y]

EXPECTED LIFT
-------------
Baseline rating: [current]
Target rating in 90 days: [goal]
Review volume goal (monthly): [N]
Conversion rate assumption: [~0.5–2% of prompted users]
```

---

## Common Mistakes

| Mistake | Why It Matters | Fix |
|---|---|---|
| Calling `requestReview` on app launch | Interrupts user before any positive experience; Apple likely suppresses it anyway | Move to a post-task moment |
| Building a custom 1–5 star gate | Violates App Store guidelines, risk of removal | Use behavioral gating, not self-reported sentiment |
| Prompting the same version repeatedly | Wastes budget; Apple deduplicates by version internally | Track `lastReviewedVersion` in `UserDefaults` |
| Not tracking the annual budget | Can silently exhaust all 3 calls on low-signal moments | Store `promptsThisYear` and `firstPromptDate` |
| Prompting immediately after a crash fix | Users may still distrust the app | Wait for 1+ successful session post-update |
| Ignoring negative reviews after prompting | Prompting raises visibility; unanswered negative reviews hurt conversion | Use `review-management` to reply within 48 hours |

---

## Checklist

- [ ] Using `SKStoreReviewRequest` / `requestReview` environment action — no third-party prompt SDKs
- [ ] Version gate implemented: same version never triggers twice
- [ ] Annual budget tracked: no more than 3 calls per 365-day window
- [ ] Trigger moments are post-success, never on launch or post-error
- [ ] Satisfaction gate uses behavioral signals, not a custom star screen
- [ ] Unhappy user path exists independently (Settings feedback link at minimum)
- [ ] Bad-version suppression: prompts off during known defect window
- [ ] `review-management` workflow connected for reply cadence
- [ ] `app-analytics` monitoring rating trend and review volume post-launch
