---
name: product-spec
category: product
description: Write a clear product spec / PRD for an app feature — problem, goals and non-goals, user stories, testable acceptance criteria, success metrics, scope, and open questions. Use when defining a feature before building, writing a PRD or spec, turning a vague idea into buildable requirements, or producing acceptance criteria. Trigger on "PRD", "product spec", "requirements", "acceptance criteria", "user stories", "scope this feature", or "write a spec". Feeds verify-against-spec.
invoke: "/write-spec [feature] — Draft a PRD with goals, user stories, acceptance criteria, and success metrics."
---

# Product Spec / PRD

**Turn an idea into a spec you can build against and verify.** A good spec is the input to `verify-against-spec` (coverage checking) and `complete-feature` (the build gate). Keep it tight — a PRD is a decision record, not an essay.

> Best spec length is "as short as possible while still removing ambiguity." If a sentence doesn't change what gets built or how it's tested, cut it.

---

## The template

```markdown
# <Feature name>

## Problem
Who has what problem, and the evidence it's real (support tickets, churn, a request count).
One paragraph. If you can't state the problem crisply, stop — you're not ready to build.

## Goals
- The outcomes this feature must achieve (user- or business-level, not implementation).

## Non-goals
- Explicitly out of scope. This list prevents scope creep and is half the value of the doc.

## User stories
- As a <user>, I want <capability> so that <benefit>.
  (One per distinct need; each maps to acceptance criteria below.)

## Acceptance criteria
Given/When/Then, testable, unambiguous (see below). These ARE the definition of done.

## Success metrics
- The metric(s) that tell us it worked, with a target and a measurement window.
  (Tie to app-analytics; if you can't measure it, say how you'll judge success.)

## Scope / phases
- v1 (this spec) vs later. What's the smallest shippable slice?

## Risks & open questions
- Known unknowns, dependencies, and decisions still owed. Assign owners.
```

---

## Writing acceptance criteria that are actually testable

This is the part that determines whether the feature can be verified. Use **Given / When / Then**:

```
Given a signed-in user with an expired subscription
When they open the paywall
Then the "Restore Purchases" button is visible
And tapping it re-checks entitlements and unlocks if a valid purchase exists
```

Each criterion must be:
- **Observable** — a tester (or a test) can see pass/fail without reading your mind.
- **Atomic** — one behavior per criterion; split compound ones.
- **Free of solution detail** — say *what*, not *how* ("the list updates within 1s", not "call `reload()` on the diffable data source").
- **Inclusive of edge/empty/error states** — the empty list, the offline case, the rejected input. These are where features actually break.

Bad: "The feature should work well and be fast."
Good: "When the search returns no results, an empty state with a 'Clear filters' action is shown."

---

## Goals vs non-goals — the scope contract

- A goal is an **outcome**: "Users can recover a deleted note within 30 days." Not "add a trash table."
- Non-goals are a feature, not an afterthought: "Not syncing trash across devices in v1" tells engineering what to *not* build and reviewers what *not* to flag as missing.
- If a stakeholder request isn't in Goals, it's a non-goal by default — make the important ones explicit.

---

## Success metrics

- Pick **one primary metric** (the thing that must move) plus a couple of guardrails (things that must *not* get worse, e.g. crash rate, retention).
- State a **target and window**: "lift activation from 40% → 50% within 4 weeks of launch."
- If the feature is hard to quantify, define a qualitative bar and how you'll judge it. "No measurement plan" is itself a risk to list.

See `app-analytics` for instrumenting these, and `app-store-pricing` / `asc-aso` when the metric is revenue/conversion.

---

## Handoff

1. Draft the spec with the template above.
2. Resolve open questions or assign owners — don't start building on unresolved decisions.
3. Hand acceptance criteria to implementation; later run `verify-against-spec` to confirm coverage and `complete-feature` to gate the merge.
