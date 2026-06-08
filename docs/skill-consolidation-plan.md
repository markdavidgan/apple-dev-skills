# Skill Consolidation Plan (machine-wide)

Audit date: 2026-06-08. Scope: this Mac. Sources reviewed: `aether-agent-plugins`,
`apple-dev-skills`, `personal-agent-skills`, and every CLI install location.

This plan is for review **before** executing the Claude-side consolidation. The
"safe cleanup" (Phase 0) has already been applied. Nothing in Phases 1–3 has run.

---

## Root cause

Skills reach each CLI through **inconsistent, overlapping mechanisms**:

- **Claude** loads the same skills **twice** — once as enabled *marketplace
  plugins* (namespaced, e.g. `apple-dev-skills:apple-review`) and once as loose
  entries in `~/.claude/skills/` (unnamespaced, e.g. `apple-review`). Transcripts
  confirm the same skill invoked under 2–3 different names.
- **Codex / Agy / Gemini / Kimi** use *copies* that only refresh on reinstall and
  have drifted (stale backups, a doubled nested path, a missing install, an
  unrelated `understand-*` family in Kimi).

---

## Phase 0 — Safe cleanup ✅ DONE (2026-06-08)

- Removed `~/.agy/skills/apple-dev.backup.1779926621` (stale)
- Removed `~/.codex/skills/apple-dev.backup.1779926621` (stale)
- Removed `~/.codex/.codex/` doubled nest (`ui-ux-pro-max` exists correctly at
  `~/.codex/skills/ui-ux-pro-max`)

---

## Phase 1 — One delivery model per CLI  ✅ DONE (2026-06-08, marketplace-canonical)

**Executed.** Removed 23 redundant loose `~/.claude/skills/` entries (19 symlinks +
`icon-workflow`/`review-insights`/`save-insight` drifted copies + empty `superpowers`
dir). Each was verified COVERED by an enabled marketplace plugin first. **Kept** 3
not provided by any plugin: `compound-engineering`, `impeccable` (not in the
`personal-agent-skills` plugin), `vercel-debug` (lives in aether-agent-plugins' own
`.claude/skills`, not a plugin). Non-Claude CLIs refreshed via `install.sh` (codex,
agy, antigravity, kimi all now 0-diff vs repo source).

> **Gemini "gap" was a false alarm.** `apple-dev` is installed at
> `~/.gemini/antigravity/skills/apple-dev` (the Antigravity path `install.sh` uses).
> `~/.gemini/skills` is a *separate* aether-agent-plugins symlink install that
> auto-syncs and correctly has no apple-dev.

> **Follow-ups (not done):**
> - To make the 3 kept skills marketplace-canonical too: add `compound-engineering`
>   + `impeccable` to the `personal-agent-skills` plugin, and expose `vercel-debug`
>   as a plugin skill in aether-agent-plugins (it's currently repo-only `.claude/skills`).
> - `install.sh` backs up any existing copy dest before copying, which is what
>   generated the stale `*.backup.<ts>` dirs. Consider having it prune prior backups
>   (or skip the backup for its own managed copies).

### Claude — marketplace plugins canonical, loose copies dropped (done)

Enabled plugins already cover these repos:
`aether-agent-plugins-{core,design,web,product}`, `apple-dev-skills`,
`personal-agent-skills`, `superpowers`. The loose `~/.claude/skills/` entries are
redundant with them.

**Proposed:** remove the redundant loose entries so each skill loads once under a
stable namespaced name. Entries and their disposition:

| `~/.claude/skills/` entry | Type | Covered by enabled plugin? | Action |
|---|---|---|---|
| 19 symlinks → aether-agent-plugins (`git-workflow`, `deslop`, `python-standards`, …) | symlink | yes (`aether-agent-plugins-*`) | remove symlink |
| `apple-dev` → apple-dev-skills/platforms | symlink | yes (`apple-dev-skills`) | remove symlink |
| `icon-workflow`, `review-insights`, `save-insight` | **real-dir copy** | yes (aether-agent-plugins) | remove copy (drifted dup) |
| `compound-engineering`, `impeccable` | **real-dir copy** | yes (`personal-agent-skills`) | remove copy (drifted dup) |
| `superpowers` | real dir | yes (`superpowers` plugin) | verify identical, then remove |

Net effect: skills resolve to one canonical, versioned, namespaced source.
**Trade-off:** invocation names change to the namespaced form
(`apple-dev-skills:apple-review`, not `apple-review`). Muscle-memory shifts once.

*Alternative if you prefer short names:* keep the loose symlinks and instead
**disable the overlapping marketplace plugins**. Pick one — not both.

### Codex / Agy / Gemini / Kimi — standardize on `install.sh`

`apple-dev-skills/install.sh` already supports `claude, cursor, kimi, antigravity,
codex, agy`. Make every non-Claude CLI a clean reinstall from one command and stop
hand-maintaining copies.

- Fix the **missing Gemini `apple-dev`**: `./install.sh --platform antigravity`
  (Gemini/Antigravity share the flattened format).
- Re-run the matching `--platform` for codex / agy after any source change.
- Decide whether Kimi's `understand-*` family is wanted; if not, remove it.

---

## Phase 2 — Content prune (the "outdated" question)

`aether-agent-plugins` is **not** git-stale (committed 2026-06-07) and is the live
source of your generic skills — do **not** delete the repo. Instead prune by usage.

**Usage signal — Claude transcripts only** (does not capture other CLIs, subagent
auto-loads, or description-triggered loads; treat as directional, not absolute):

- **Heavily used:** `superpowers:*` (brainstorming, writing-plans,
  subagent-driven-development, debugging), aether project commands, `impeccable`.
- **aether-agent-plugins generic — invoked:** `git-workflow`, `vercel-debug`,
  `icon-workflow`. **Zero invocations:** `deslop`, `python-standards`, `fix-ci`,
  `changelog-management`, `mac-cleanup`, `dev-workflow`, `model-selection`,
  `execution-contract`, `advanced-elicitation`, `review-session`,
  `subagent-orchestration`, `loop-on-ci`, `fix-merge-conflicts`,
  `auto-document`, `doc-conventions`, `setup`.
- **apple-dev-skills — invoked:** `ios26-api-reference`, `apple-polish`,
  `apple-review`, `app-brand-identity` (the other 40 are mostly reference/
  description-triggered, used inside aether-focus rather than globally).

**Proposed:** review the zero-invocation aether-agent-plugins skills for removal
from that repo. Confirm each is truly unused (check other CLIs / subagents) before
deleting — usage data here is Claude-only.

---

## Phase 3 — apple-dev-skills internal design-cluster review (optional)

The 6 design skills are mostly distinct, not redundant:

- `apple-design` (design system/tokens/Liquid Glass) ↔ `apple-design-language`
  (editorial/UX-writing layer above HIG) — **closest overlap; worth a closer look.**
- `apple-polish` (subjective Ive/Jobs craft review) ↔ `swiftui-micro-craft`
  (mechanical numeric auditor) — complementary, keep both.
- `design-contract` (mockup → contract + preview gates), `design-handoff`
  (screenshot package), `apple-patterns-check` (code compliance) — distinct niches.

**Proposed:** only `apple-design` vs `apple-design-language` merits a merge review;
the rest stay.

---

## Recommended order

1. ✅ Phase 0 (done)
2. ✅ Phase 1 (done — marketplace-canonical; Claude pruned, non-Claude refreshed)
3. Phase 2 content prune — review zero-usage aether-agent-plugins skills (confirm
   non-Claude usage first); optionally add the 3 kept skills to plugins (see follow-ups)
4. Phase 3 only if you want the design-cluster tightened
   (`apple-design` vs `apple-design-language`)
