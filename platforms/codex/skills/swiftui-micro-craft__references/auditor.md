# The Micro-Craft Auditor

> Mechanical enforcement for the rules in [micro-craft-bible.md](micro-craft-bible.md). Two layers: a **grep auditor** that flags candidate violations by §, and a **0–4 scoring rubric** for the judgment calls grep can't make. Run the auditor over changed views before every commit; score anything it flags.

The auditor's job is to **surface candidates, not to convict.** Optical corrections (§2) and intentional system defaults are legitimate. A flagged line is a prompt to either tokenize it or add a one-line justifying comment — never to blindly "fix."

---

## Part A — The grep auditor

Copy this into `scripts/micro-craft-audit.sh` in the target repo (or run inline). It scans staged/changed Swift view files and prints findings tagged by §. Pure `grep`/`bash` — no build, no deps.

```bash
#!/usr/bin/env bash
# Micro-craft auditor — flags candidate violations of swiftui-micro-craft §rules.
# Usage: ./micro-craft-audit.sh [path ...]   (defaults to git-changed .swift files)
# Pure grep/bash. Uses process substitution (< <(...)) so the hit counter and the
# per-file header survive — a plain `grep | while` runs in a subshell and loses both.
set -uo pipefail

# Resolve targets: explicit args, else changed files vs HEAD, else all Swift.
if [ "$#" -gt 0 ]; then
  FILES="$*"
else
  FILES="$(git diff --name-only --diff-filter=ACM HEAD -- '*.swift' 2>/dev/null)"
  [ -z "$FILES" ] && FILES="$(git ls-files '*.swift')"
fi
[ -z "$FILES" ] && { echo "No Swift files to audit."; exit 0; }

hits=0
header_printed=0
cur=""
emit() {  # §  message  file:line:content   — prints the file header once, counts the hit
  [ "$header_printed" -eq 0 ] && { echo "▸ $cur"; header_printed=1; }
  printf '  [%s] %s\n      %s\n' "$1" "$2" "$3"
  hits=$((hits+1))
}

# check §  message  regex  [invert-regex]   — runs one grep in the parent shell via < <(...)
check() {
  local sec="$1" msg="$2" re="$3" inv="${4:-}"
  while IFS= read -r l; do
    [ -n "$inv" ] && printf '%s' "$l" | grep -qE "$inv" && continue
    emit "$sec" "$msg" "$cur:$l"
  done < <(grep -nE "$re" "$cur" 2>/dev/null)
}

for f in $FILES; do
  [ -f "$f" ] || continue
  cur="$f"; header_printed=0

  check "§1/§6" "literal padding — tokenize (Spacing.*) or make directional" '\.padding\(\s*[0-9]+'
  check "§1"    "literal stack spacing — use a Spacing token" '(spacing:\s*[0-9]+)' 'spacing:\s*0\b'
  check "§5"    "literal cornerRadius — verify it nests (inner = outer − padding) or use .containerConcentric" '(cornerRadius:\s*[0-9]+)|\.cornerRadius\(\s*[0-9]+'
  check "§4/§10" "hardcoded font size — use a semantic style (.body/.headline…) so it scales" '\.font\(\s*\.system\(size:\s*[0-9]'
  check "§8"    "shadow without y-offset — reads as a glow; use the elevation ladder (radius + y)" '\.shadow\(' 'y:'
  check "§9"    "literal color / freehand opacity — use a semantic token + opacity ladder" 'Color\.(black|white|gray|red|blue|green)\b|\.opacity\(\s*0?\.[0-9]+'
  check "§9"    "raw RGB/hex in view — move to asset catalog / token with dark-mode variant" 'Color\(red:|#[0-9A-Fa-f]{6}|init\(hex'
  check "§14"   "magic-number animation duration — prefer named springs (.smooth/.snappy/.bouncy) or tokenize" '(easeInOut|easeIn|easeOut|linear|spring)\([^)]*duration:\s*[0-9.]'
  check "§14"   "unscoped .animation — bind to value: so it only animates the trigger" '\.animation\([^,)]*\)\s*$'
  # (§3 baseline alignment is a judgment call — not regex-detectable; score it via Part B, not here.)

  # §2 raw .offset without an optical justification comment (allowed only if commented)
  while IFS= read -r l; do
    case "$l" in *optical*) : ;; *) emit "§2" ".offset without // optical: comment — justify the nudge or remove it" "$cur:$l";; esac
  done < <(grep -nE '\.offset\(' "$f" 2>/dev/null)

  # §17 nested glassEffect (forbidden) — flag files with >1 occurrence for manual check
  gcount=$(grep -cE '\.glassEffect\(' "$f" 2>/dev/null); gcount=${gcount:-0}
  [ "$gcount" -gt 1 ] && emit "§17?" "multiple glassEffect calls ($gcount) — ensure none are nested; group with GlassEffectContainer" "$cur"

  # §16 haptic on appear / in a loop (gratuitous)
  if grep -qE 'sensoryFeedback|NSHapticFeedback' "$f" 2>/dev/null && grep -qE 'onAppear|ForEach|while |for ' "$f" 2>/dev/null; then
    emit "§16?" "haptic + onAppear/loop present — confirm haptics fire only on discrete state changes" "$cur"
  fi
done

echo
if [ "$hits" -eq 0 ]; then
  echo "✓ Micro-craft auditor: no candidate violations."
else
  echo "⚠ $hits candidate(s). Each must be tokenized OR carry a one-line justifying comment. See micro-craft-bible.md."
fi
exit 0   # advisory by default; flip to 'exit $((hits>0))' to gate commits
```

### Notes on the auditor

- **Advisory by default.** It exits 0 so it never blocks; flip the last line to gate. Many hits are *legitimate* (a `0` spacing, a commented optical offset, a system default). The point is to make every literal a conscious decision.
- **Heuristics marked with `?`** (§3, §17, §16) are low-confidence — they flag *shape*, not certainty. Eyeball them.
- **False positives are the design.** A clean view passes; a view with raw literals gets a list of "tokenize-or-justify" prompts. That's RED→GREEN at the line level.
- Wire it into a pre-commit hook or the `merge-check` skill's gate if you want it enforced.

---

## Part B — The 0–4 scoring rubric (judgment layer)

Grep can't see optical centering or whether a radius *actually* nests. Score each view by hand using the table below; the auditor's hit-count feeds the lower scores.

### Per-domain scoring

For each view, mark each applicable domain ✓ (correct) / ✗ (violated) / — (N/A):

| § | Pass condition |
|---|----------------|
| 1 | All spacing/padding on the 4pt grid via tokens; zero bare literals |
| 2 | Asymmetric glyphs optically corrected with `// optical:` comments |
| 3 | Mixed-size text & icon+text rows baseline-aligned |
| 4 | Symbol weight matches neighbor; size via imageScale/font; rendering mode set |
| 5 | Every nested radius concentric (`inner = outer − padding`) or `.containerConcentric` |
| 6 | Padding directional/asymmetric where content demands it |
| 7 | Every interactive element ≥44pt with `.contentShape` |
| 8 | Shadows from the elevation ladder, with y-offset; one per surface |
| 9 | Semantic color tokens; opacity ladder; dark-mode safe |
| 10 | Semantic text styles; monospaced digits on counters; truncation defined |
| 11 | Hairlines `1/displayScale`; separators inset to content |
| 12 | Type scales; metrics use `@ScaledMetric`; survives AX5 |
| 13 | Backgrounds bleed; content respects safe area |
| 14 | Named springs / tokenized timing; scoped `value:`; Reduce Motion handled |
| 15 | `.contentShape` first; priority/simultaneity & thresholds explicit |
| 16 | Haptics on discrete state changes only; semantic match |
| 17 | (if glass) concentric corners; no nesting; ≤8% tint; interactive feedback |

### Aggregate score

| Score | Rule |
|-------|------|
| **4** | All applicable domains ✓; optical corrections present & commented; passes AX5. |
| **3** | All geometric domains ✓ (1,3,5,7,11,13); ≤1 optical/polish miss (2,4,8,16). |
| **2** | Any single geometric violation: a bare literal (§1), non-nesting radius (§5), sub-44pt target (§7), or no Dynamic Type (§12). |
| **1** | Multiple literals + hardcoded motion + no Dynamic Type. |
| **0** | Visible geometric breakage: misaligned baselines, clipped content, nested/overlapping glass. |

**Gate: anything below 3 ships a defect.** Fix to ≥3 before commit; aim for 4 on anything a user touches repeatedly (buttons, rows, the primary screen).

### How to report a finding (review shorthand)

Cite the §, give the score, then list findings **tagged by severity**, and close with **Quick Wins** — the top ≤3 fixes doable in five minutes. (Severity + Quick Wins format adapted from huashu-design's 5-dimension critique.)

Severity tags:
- **⚠️ fatal** — visible geometric breakage or a sub-44pt target a user will hit (caps the score at 0–1).
- **⚡ important** — a real defect (non-nesting radius, hardcoded motion, no Dynamic Type) that holds the score at 2.
- **💡 polish** — optical/refinement miss (uncommented nudge, off-ladder shadow) separating a 3 from a 4.

> **`FocusButton.swift` — score 2**
> ⚡ §5: inner `RoundedRectangle(cornerRadius: 16)` inside a 12-padded 16-radius card → arcs pinch; use `16−12=4` or `.containerConcentric`.
> ⚠️ §7: chevron button is 28pt; add `.frame(width: 44, height: 44).contentShape(Rectangle())`.
> 💡 §8: `.shadow(radius: 8)` has no y-offset — reads as a glow; pull from the elevation ladder.
>
> **Quick Wins:** (1) wrap the chevron in a 44pt frame; (2) drop the inner radius to 4; (3) add `y: 4` to the shadow.

Cite §, give the number, tag the severity, give the fix. That's the whole loop.
