---
name: push-notifications
category: engineering
description: Apple push notifications (APNs) and local notifications — authorization, device tokens, payload structure, rich/actionable notifications, notification service & content extensions, interruption levels, and Live Activity push. Use when implementing push, "remote notifications", APNs, "notification not showing", rich media notifications, notification actions, silent/background push, or pushing Live Activity updates. Trigger on "APNs", "UNUserNotificationCenter", "device token", "notification extension", or "silent push".
---

# Push & Local Notifications

**Deliver remote (APNs) and local notifications correctly** — from permission to payload to rich/actionable extensions. Live Activity push pairs with `app-intents`.

---

## 1. Authorization + registration

```swift
import UserNotifications

let center = UNUserNotificationCenter.current()
let granted = try await center.requestAuthorization(options: [.alert, .sound, .badge])
if granted {
    await MainActor.run { UIApplication.shared.registerForRemoteNotifications() }
}
```

Then capture the token in the app delegate:

```swift
func application(_ app: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let token = deviceToken.map { String(format: "%02x", $0) }.joined()
    // send `token` to your server
}
func application(_ app: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    // log; common cause: no `aps-environment` entitlement / wrong provisioning
}
```

**Requirements:** Push Notifications capability (adds `aps-environment` entitlement), a real device or a simulator with a signed build (simulator push works via `.apns` drag-drop or `simctl push`), and APNs auth (prefer a **token-based `.p8` key** over certs — one key works for all your apps, no yearly expiry).

---

## 2. Payload anatomy

```json
{
  "aps": {
    "alert": { "title": "Focus complete", "body": "Nice work — 25 minutes done." },
    "sound": "default",
    "badge": 1,
    "thread-id": "focus",
    "interruption-level": "time-sensitive",
    "relevance-score": 0.8,
    "mutable-content": 1,
    "category": "FOCUS_DONE"
  },
  "deep_link": "myapp://session/42"
}
```

- **`interruption-level`**: `passive` (no sound/banner urgency), `active` (default), `time-sensitive` (breaks through Focus; needs the Time Sensitive Notifications capability), `critical` (bypasses mute/Focus; requires a special Apple entitlement).
- **`thread-id`** groups notifications; **`relevance-score`** orders a summary.
- **`mutable-content: 1`** routes through your **service extension** (for rich media / decryption).
- **`content-available: 1`** (and *omit* `alert/sound`) = **silent/background push** to refresh data — delivery is throttled and not guaranteed; never use for urgent delivery.
- Custom keys live **outside** `aps` (e.g. `deep_link`).

### Headers (APNs HTTP/2)

`apns-push-type` (`alert`, `background`, `liveactivity`, `voip`…), `apns-topic` (bundle id; suffix `.push-type.liveactivity` for activities), `apns-priority` (10 immediate, 5 power-aware; **background push must be 5**), `apns-collapse-id` to coalesce.

---

## 3. Actionable notifications

```swift
let snooze = UNNotificationAction(identifier: "SNOOZE", title: "Snooze 5 min", options: [])
let category = UNNotificationCategory(identifier: "FOCUS_DONE", actions: [snooze],
                                      intentIdentifiers: [], options: [])
center.setNotificationCategories([category])
```

Handle taps/actions in `UNUserNotificationCenterDelegate`:

```swift
func userNotificationCenter(_ c: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse) async {
    if response.actionIdentifier == "SNOOZE" { /* … */ }
}
// Show banners while foregrounded:
func userNotificationCenter(_ c: UNUserNotificationCenter,
        willPresent n: UNNotification) async -> UNNotificationPresentationOptions {
    [.banner, .sound]
}
```

Set the delegate **before** the app finishes launching, or you miss the cold-launch tap.

---

## 4. Extensions

- **Notification Service Extension** (`UNNotificationServiceExtension`): runs for `mutable-content` payloads to download/attach media or decrypt before display. You have ~30s; always call the content handler (with the original content) in `serviceExtensionTimeWillExpire`.
- **Notification Content Extension**: a custom UI for the expanded notification.

Each extension is a separate target — and if it touches required-reason APIs, it needs its own privacy manifest (see `privacy-manifest`).

---

## 5. Live Activity push

Request the activity with a push token, send it to your server, then update via APNs with `apns-push-type: liveactivity` and a `content-state` matching your `ContentState`. End with `"event": "end"`. See `app-intents` for the ActivityKit UI side.

---

## Debugging checklist

| Symptom | Likely cause |
|---------|--------------|
| No token / `didFailToRegister` | Missing Push capability / `aps-environment`; bad provisioning profile |
| Push sent, nothing shows | Wrong topic/bundle id, dev vs prod APNs mismatch, app in foreground without `willPresent` |
| Silent push never fires | Used priority 10, missing `content-available`, or system throttling — expected |
| Rich media absent | No `mutable-content: 1`, or service extension didn't attach/return in time |
| Time-sensitive ignored | Missing Time Sensitive capability or user disabled it |

Test locally: `xcrun simctl push <device> <bundle-id> payload.apns`.
