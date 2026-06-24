---
name: storekit-purchases
category: engineering
description: StoreKit 2 in-app purchases and subscriptions in Swift — Product fetch, purchase flow, transaction verification, entitlement checks, Transaction.updates listener, restore, and SwiftUI StoreKit views. Use when implementing or debugging IAP, subscriptions, paywalls, "buy" buttons, free trials, restore purchases, receipt/transaction validation, or StoreKit testing. Pairs with app-store-pricing (strategy) and asc-aso (conversion).
---

# StoreKit 2 — Purchases & Subscriptions

**Implement in-app purchases and subscriptions with the modern async StoreKit 2 API.** Strategy (tiers, regional pricing) lives in `app-store-pricing`; paywall conversion in `asc-aso`. This skill is the *code*.

> Use StoreKit 2 (`import StoreKit`, async/await, iOS 15+). Do **not** hand-parse receipts or call the legacy `SKPaymentQueue`/`verifyReceipt` server endpoint for new work — StoreKit 2 verifies transactions cryptographically on-device via `VerificationResult`.

---

## The Five Things Every IAP Implementation Needs

1. **Load products** from the App Store.
2. **Purchase** a product and handle the result.
3. **Verify** the transaction (never trust an unverified transaction).
4. **Check current entitlements** to unlock content (on launch and on change).
5. **Listen** for transactions that arrive outside your purchase call (renewals, Ask-to-Buy approvals, purchases on other devices, refunds).

Miss #5 and subscriptions silently break.

---

## Minimal correct implementation

```swift
import StoreKit

@MainActor
@Observable
final class Store {
    private(set) var products: [Product] = []
    private(set) var purchasedProductIDs: Set<String> = []

    private var updates: Task<Void, Never>?

    init() {
        // 5. ALWAYS start the transaction listener before any purchase,
        //    at app launch, so renewals/Ask-to-Buy/refunds are not missed.
        updates = Task.detached { [weak self] in
            for await update in Transaction.updates {
                await self?.handle(verification: update)
            }
        }
    }

    deinit { updates?.cancel() }

    // 1. Load products
    func loadProducts(ids: [String]) async {
        do {
            products = try await Product.products(for: ids)
        } catch {
            // network/StoreKit error — surface, allow retry
        }
    }

    // 2 + 3. Purchase and verify
    func purchase(_ product: Product) async throws -> Transaction? {
        let result = try await product.purchase()
        switch result {
        case .success(let verification):
            let transaction = try checkVerified(verification)   // 3
            await updateEntitlements()
            await transaction.finish()                          // REQUIRED
            return transaction
        case .userCancelled:
            return nil
        case .pending:
            return nil   // Ask-to-Buy / SCA — resolved later via Transaction.updates
        @unknown default:
            return nil
        }
    }

    // 3. Verification — the ONLY trustworthy source of truth
    private func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified(_, let error): throw error   // do NOT grant entitlement
        case .verified(let safe):       return safe
        }
    }

    private func handle(verification: VerificationResult<Transaction>) async {
        guard let transaction = try? checkVerified(verification) else { return }
        await updateEntitlements()
        await transaction.finish()
    }

    // 4. Current entitlements — the source of truth for "what is unlocked"
    func updateEntitlements() async {
        var owned: Set<String> = []
        for await result in Transaction.currentEntitlements {
            guard let transaction = try? checkVerified(result) else { continue }
            if transaction.revocationDate == nil {   // not refunded/revoked
                owned.insert(transaction.productID)
            }
        }
        purchasedProductIDs = owned
    }
}
```

### The non-negotiables

- **Always `finish()` a transaction.** Unfinished consumables/transactions are redelivered forever via `Transaction.updates`.
- **Entitlement = `Transaction.currentEntitlements`, not a local bool.** Recompute on launch and on every `Transaction.updates` event. Respect `revocationDate` (refunds) and, for subscriptions, expiry.
- **Verify before granting.** `.unverified` means a jailbreak/tamper — deny.
- **Start the listener at launch**, not when the paywall opens.

---

## Subscriptions specifics

- **Status:** use `Product.SubscriptionInfo.Status` via `product.subscription?.status` (or `Product.SubscriptionInfo.status(for: groupID)`) for the *current* state including grace period and billing retry — richer than `currentEntitlements` alone.
- **Renewal info:** `status.renewalInfo` (verify it) tells you auto-renew on/off, the next renewal product (upgrade/downgrade/crossgrade pending), and expiration reason.
- **Free trials / intro offers:** check eligibility with `product.subscription?.isEligibleForIntroOffer`. Promotional/win-back offers are passed via `purchase(options:)` with `.promotionalOffer(...)`.
- **Grace period & billing retry:** keep access during `.inGracePeriod` and `.inBillingRetryPeriod` — revoking immediately on a failed renewal churns paying users.
- **Subscription groups:** one active subscription per group; upgrades/downgrades are crossgrades within the group, handled by the App Store, surfaced via `Transaction.updates`.

---

## SwiftUI StoreKit views (iOS 17+) — less code, fewer bugs

For most paywalls, the declarative views handle fetch, purchase, and loading states for you:

```swift
import StoreKit

// Whole subscription group with Apple-managed layout + trial eligibility
SubscriptionStoreView(groupID: "ABCDEF12") {
    MyMarketingHeader()           // your content above the controls
}
.subscriptionStoreButtonLabel(.multiline)
.storeButton(.visible, for: .restorePurchases)

// A single non-consumable
ProductView(id: "com.app.pro")

// A curated set
StoreView(ids: ["com.app.pro", "com.app.coins"])
```

Hook entitlement changes with `.onInAppPurchaseCompletion { product, result in … }` or observe your `Store`. These views still require the launch-time `Transaction.updates` listener for renewals.

---

## Restore purchases

- Provide a visible **Restore Purchases** button (App Review requires it for non-consumables/subscriptions).
- Restore = re-evaluate `Transaction.currentEntitlements` (it's already synced). Only call `AppStore.sync()` if the user explicitly taps Restore and entitlements look empty — it can prompt for App Store auth, so never call it automatically on launch.

---

## Asking for a review (adjacent, commonly needed)

```swift
import StoreKit
@Environment(\.requestReview) private var requestReview   // iOS 16+
// call requestReview() at a delight moment, throttled — Apple caps prompts to 3/year
```

See `asc-aso` for *when* to prompt (conversion impact).

---

## Testing StoreKit

- **Local, no sandbox:** add a **StoreKit Configuration file** (`.storekit`) to the scheme. Lets you test purchases, trials, renewals (accelerated time), Ask-to-Buy, and refunds entirely on-device/simulator.
- **`Transaction` test API:** in `swift-testing`/XCTest use `Transaction.currentEntitlements` against the config file; accelerate subscription renewals in the `.storekit` editor.
- **Sandbox (real ASC):** create Sandbox Apple IDs in App Store Connect → Users and Access → Sandbox. Subscriptions renew on an accelerated real-time schedule.
- Test the unhappy paths explicitly: `userCancelled`, `pending` (Ask-to-Buy), `.unverified`, refund (`revocationDate`), expired subscription, grace period.

See `swift-testing` for the test-authoring patterns and `ios-test` for the harness.

---

## Common bugs this skill prevents

| Symptom | Cause | Fix |
|---------|-------|-----|
| Subscription "lost" after renewal | No `Transaction.updates` listener | Start it at launch; recompute entitlements on each event |
| Purchases redelivered every launch | Transaction never `finish()`ed | `finish()` after granting entitlement |
| Refunded users keep access | Ignoring `revocationDate` | Exclude revoked transactions from entitlements |
| Paying users churned on a card glitch | Revoking on first failed renewal | Honor `.inGracePeriod` / `.inBillingRetryPeriod` |
| "Works in sandbox, fails for some users" | Trusting `.unverified` or local bools | Use `VerificationResult` + `currentEntitlements` |
| Free trial offered to ex-subscribers | Not checking `isEligibleForIntroOffer` | Gate the trial on eligibility |
