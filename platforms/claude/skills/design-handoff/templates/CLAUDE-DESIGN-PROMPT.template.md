<!--
  Paste-in prompt for an external design reviewer (Claude Design, a human
  designer, or any image-consuming tool). The `package` step fills the
  {{placeholders}} from the manifest + STAMP; you complete the prose brief.
-->

# Design review — {{APP_NAME}}

You are reviewing the **current** UI of {{APP_NAME}} ({{PLATFORM}}). The goal is a
critique + concrete improvement suggestions across the whole experience, screen
by screen and as a system.

## What this app is

{{ONE_PARAGRAPH_PRODUCT_INTENT}}

## Design language (ground truth — do not invent palette/spacing)

{{DESIGN_LANGUAGE_BRIEF}}
<!-- tokens, type ramp, color roles, motion principles, any hard constraints
     (e.g. dark-mode-only). Pulled from the overlay's design-context brief and
     grounded in the actual code. -->

## The screens (attached, in order)

{{SHOT_TABLE}}
<!-- generated: each image id -> caption -->

## How to read these

- These are real renders from the build at commit `{{GIT_SHA}}` ({{VERSION}}), captured {{CAPTURE_DATE}}.
- {{MISSING_NOTE}}  <!-- e.g. "All manifest states captured." or "N states not yet captured — see Not captured below." -->

## What I want from you

1. Per-screen critique: hierarchy, spacing, type, color, affordances, state clarity.
2. System-level: consistency across screens, navigation, cohesion of the design language.
3. Top 5 highest-leverage changes, ranked, each with the why.
4. Anything that reads as off-brand against the design language above.

## Scope

Point your codebase context at the scoped **`{{APP_SUBDIR}}/`** subdirectory only,
not the whole monorepo (large repos lag and dilute relevance).

## Not captured (if any)

{{WISHLIST_AND_MISSING}}
<!-- honest list of states the reviewer is NOT seeing, so absence is never read
     as "this state doesn't exist". -->
