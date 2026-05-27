#!/usr/bin/env bash
#
# Apple Patterns Check — Kimi Tool
# Reads JSON params from stdin, writes JSON results to stdout.
# Validates Swift/SwiftUI/SwiftData/entitlements/safety patterns via grep.
#
# Input:  {"path": ".", "strict": false}
# Output: {"content": "structured markdown report"}

set -euo pipefail

# ─── Parse JSON from stdin (no jq dependency) ───
read -r INPUT
PATH_ARG=$(echo "$INPUT" | grep -o '"path"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4 || true)
STRICT_ARG=$(echo "$INPUT" | grep -o '"strict"[[:space:]]*:[[:space:]]*true' || true)

PROJECT_PATH="${PATH_ARG:-.}"
STRICT="${STRICT_ARG:+true}"
STRICT="${STRICT:-false}"

cd "$PROJECT_PATH" 2>/dev/null || {
  echo '{"content":"❌ Error: Could not cd to project path: '"$PROJECT_PATH"'"}'
  exit 1
}

# ─── Helpers ───
REPORT=""
TOTAL_ISSUES=0
CRITICAL_COUNT=0
HIGH_COUNT=0
MEDIUM_COUNT=0

append_section() {
  local title="$1"
  local icon="$2"
  REPORT+="\n## $icon $title\n"
}

add_issue() {
  local severity="$1"
  local message="$2"
  local fix="${3:-}"
  TOTAL_ISSUES=$((TOTAL_ISSUES + 1))
  case "$severity" in
    CRITICAL) CRITICAL_COUNT=$((CRITICAL_COUNT + 1)) ;;
    HIGH)     HIGH_COUNT=$((HIGH_COUNT + 1)) ;;
    MEDIUM)   MEDIUM_COUNT=$((MEDIUM_COUNT + 1)) ;;
  esac
  REPORT+="\n- **[$severity]** $message"
  [[ -n "$fix" ]] && REPORT+="\n  → Fix: $fix"
}

add_ok() {
  REPORT+="\n- ✅ $1"
}

# ─── 1. Swift 6 Concurrency ───
append_section "Swift 6 Concurrency" "🔒"

# 1.1 Task { [weak self] without @MainActor
matches=$(grep -rn "Task { \[weak self\]" . --include="*.swift" 2>/dev/null | grep -v "@MainActor" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "Missing @MainActor on Task: $line" "Use Task { @MainActor [weak self] in ... }"
  done <<< "$matches"
else
  add_ok "Task @MainActor annotation — clean"
fi

# 1.2 nonisolated deinit for @MainActor classes
matches=$(grep -rn "deinit" . --include="*.swift" 2>/dev/null | grep -v "nonisolated\|Tests\|// no-cleanup" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "Potentially unsafe deinit: $line" "Add 'nonisolated' if class is @MainActor"
  done <<< "$matches"
else
  add_ok "deinit safety — clean"
fi

# 1.3 Hardcoded FoundationModels isAvailable
matches=$(grep -rn "isAvailable.*return true\|isAvailable.*=.*true" . --include="*.swift" 2>/dev/null | grep -iv "test\|mock\|preview" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "Hardcoded isAvailable = true: $line" "Use SystemLanguageModel.default.isAvailable"
  done <<< "$matches"
else
  add_ok "FoundationModels isAvailable — clean"
fi

# 1.4 MainActor.assumeIsolated
matches=$(grep -rn "MainActor.assumeIsolated" . --include="*.swift" 2>/dev/null | head -5 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "MainActor.assumeIsolated usage: $line" "Verify called only from guaranteed main-thread code"
  done <<< "$matches"
else
  add_ok "MainActor.assumeIsolated — not used"
fi

# 1.5 Sheet continuation double-resume risk
matches=$(grep -rn "withCheckedContinuation\|withUnsafeContinuation" . --include="*.swift" 2>/dev/null | head -5 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "Continuation usage (verify nil before dismiss): $line" "Ensure continuation is nil'd BEFORE sheet dismiss"
  done <<< "$matches"
else
  add_ok "Continuation safety — clean"
fi

# ─── 2. Error Handling ───
append_section "Error Handling" "⚠️"

# 2.1 Data-loss scenarios using banners
matches=$(grep -rn "showBanner\|showToast\|showNotification" . --include="*.swift" 2>/dev/null | grep -i "save\|persist\|delete\|error" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "HIGH" "Data-loss scenario may use banner instead of alert: $line" "Replace with .alert() for data-loss errors"
  done <<< "$matches"
else
  add_ok "Error presentation — clean"
fi

# 2.2 Silent try? on persistence
matches=$(grep -rn "try? modelContext.save\|try? context.save" . --include="*.swift" 2>/dev/null | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "HIGH" "Silent persistence save: $line" "Catch errors and present to user"
  done <<< "$matches"
else
  add_ok "Persistence error handling — clean"
fi

# ─── 3. SwiftUI State ───
append_section "SwiftUI State" "🎨"

# 3.1 @Bindable for two-way bindings
matches=$(grep -rn "@Environment.*\.self.*var" . --include="*.swift" 2>/dev/null | grep -v "@Bindable\|let " | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "MEDIUM" "Potential missing @Bindable: $line" "Use @Bindable for two-way bindings on @Observable models"
  done <<< "$matches"
else
  add_ok "@Bindable usage — clean"
fi

# 3.2 Canvas without TimelineView
matches=$(grep -rn "Canvas {" . --include="*.swift" 2>/dev/null | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "MEDIUM" "Canvas may need TimelineView wrapper: $line" "Wrap in TimelineView if Canvas depends on animating state"
  done <<< "$matches"
else
  add_ok "Canvas animation — clean"
fi

# ─── 4. SwiftData ───
append_section "SwiftData" "💾"

# 4.1 @Model in AsyncStream
matches=$(grep -B3 -A3 "AsyncStream" . --include="*.swift" -r 2>/dev/null | grep -B2 -A2 "@Model" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "HIGH" "@Model object crosses AsyncStream boundary" "Extract scalars (id, text) before AsyncStream closure"
  done <<< "$matches"
else
  add_ok "AsyncStream + @Model — clean"
fi

# 4.2 @Model properties without defaults
matches=$(grep -A20 "@Model" . --include="*.swift" -r 2>/dev/null | grep "var " | grep -v "=" | grep -v "?" | grep -v "//" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "@Model property without default: $line" "Add default value or make Optional"
  done <<< "$matches"
else
  add_ok "@Model defaults — clean"
fi

# 4.3 CloudKit migration safety
changed_model_files=$(git diff HEAD --name-only -- "*.swift" 2>/dev/null | xargs grep -l "@Model" 2>/dev/null || true)
migration_files=$(git diff HEAD --name-only 2>/dev/null | grep -E 'VersionedSchema|MigrationPlan|SchemaV[0-9]' || true)
if [[ -n "$changed_model_files" && -z "$migration_files" ]]; then
  add_issue "HIGH" "@Model files changed without VersionedSchema update" "Add migration if schema changed"
fi

# 4.4 @Model class rename detection
removed=$(git diff HEAD -- "*.swift" 2>/dev/null | grep -E "^-.*@Model" | grep -E "class [A-Z]" || true)
added=$(git diff HEAD -- "*.swift" 2>/dev/null | grep -E "^\+.*@Model" | grep -E "class [A-Z]" || true)
if [[ -n "$removed" && -n "$added" ]]; then
  add_issue "CRITICAL" "@Model class rename detected — permanent CloudKit data loss" "Use new class + .custom migration instead"
fi

# ─── 5. Timers ───
append_section "Timers" "⏱"

matches=$(grep -rn "Task.sleep" . --include="*.swift" 2>/dev/null | grep -i "timer\|tick\|interval\|countdown" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "MEDIUM" "iOS timer uses Task.sleep (pauses during scroll): $line" "Use Timer.publish(every:on:in:) with RunLoop.common"
  done <<< "$matches"
else
  add_ok "Timer patterns — clean"
fi

# ─── 6. Entitlements ───
append_section "Entitlements" "🔐"

# 6.1 Fake entitlement keys
matches=$(grep -rn "com.apple.developer.widgetkit\|com.apple.developer.live-activities" . --include="*.entitlements" 2>/dev/null | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "Fake entitlement key: $line" "WidgetKit needs NO entitlement. Live Activities use NSSupportsLiveActivities in Info.plist"
  done <<< "$matches"
else
  add_ok "Entitlement keys — clean"
fi

# 6.2 Unverified entitlement keys
matches=$(grep -rn "com.apple.developer\." . --include="*.entitlements" 2>/dev/null | grep -v "app-groups\|associated-domains\|healthkit\|icloud\|in-app-payments\|push-notifications\|siri\|default-data-protection\|maps\|network-extensions\|autofill\|usernotifications\|authentication-services\|coremedia\|game-center\|homekit\|nfc\|personal-vpn\|wallet\|weatherkit\|carplay\|classkit\|exposure-notification\|fileprovider\|hotspot\|multipath\|system-extension" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "Unverified entitlement key: $line" "Verify against Apple documentation"
  done <<< "$matches"
else
  add_ok "Entitlement verification — clean"
fi

# ─── 7. App Intents ───
append_section "App Intents" "🔔"

# 7.1 suggestedInvocationPhrase on plain AppIntent
matches=$(grep -rn "suggestedInvocationPhrase" . --include="*.swift" 2>/dev/null | head -20 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "suggestedInvocationPhrase placement (verify in AppShortcutsProvider): $line" "Must be inside AppShortcutsProvider, NOT plain AppIntent struct"
  done <<< "$matches"
else
  add_ok "suggestedInvocationPhrase — not used"
fi

# 7.2 IntentDescription with trademarked terms
matches=$(grep -rn "IntentDescription.*Apple\|IntentDescription.*iPhone\|IntentDescription.*iPad\|IntentDescription.*iOS\|IntentDescription.*Siri" . --include="*.swift" 2>/dev/null | head -20 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "CRITICAL" "IntentDescription contains trademarked term: $line" "Replace 'Apple Watch' → 'your Watch', 'Siri' → 'voice assistant', etc."
  done <<< "$matches"
else
  add_ok "IntentDescription trademarks — clean"
fi

# 7.3 CFBundleIconName
matches=$(grep -rn "CFBundleIconName" . --include="*.plist" 2>/dev/null | head -10 || true)
if [[ -z "$matches" ]]; then
  add_issue "HIGH" "Missing CFBundleIconName in Info.plist" "Required for App Intents export"
else
  add_ok "CFBundleIconName — present"
fi

# ─── 8. Safety Checks ───
append_section "Safety" "🛡"

# 8.1 force-try
matches=$(grep -rn " try!" . --include="*.swift" 2>/dev/null | grep -v "Tests\|// safety:" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "MEDIUM" "force try! found: $line" "Replace with proper do/catch or try?"
  done <<< "$matches"
else
  add_ok "force try! — clean"
fi

# 8.2 fatalError
matches=$(grep -rn "fatalError(" . --include="*.swift" 2>/dev/null | grep -v "Tests\|// safety:" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "MEDIUM" "fatalError() found: $line" "Remove or replace with graceful error handling"
  done <<< "$matches"
else
  add_ok "fatalError — clean"
fi

# 8.3 print()
matches=$(grep -rn " print(" . --include="*.swift" 2>/dev/null | grep -v "Tests\|#if DEBUG\|// safety:" | head -10 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "MEDIUM" "print() found: $line" "Remove or wrap in #if DEBUG"
  done <<< "$matches"
else
  add_ok "print() — clean"
fi

# 8.4 force unwrap
matches=$(grep -rn "[a-zA-Z0-9_]!" . --include="*.swift" 2>/dev/null | grep -v "Tests\|// safety:\|IBOutlet\|@objc\|\"" | head -20 || true)
if [[ -n "$matches" ]]; then
  while IFS= read -r line; do
    add_issue "MEDIUM" "Potential force unwrap: $line" "Use optional binding or nil-coalescing"
  done <<< "$matches"
else
  add_ok "Force unwrap — clean"
fi

# ─── Summary ───
REPORT+="\n\n---\n\n## Summary\n"
REPORT+="- **Total Issues:** $TOTAL_ISSUES\n"
REPORT+="- **CRITICAL:** $CRITICAL_COUNT\n"
REPORT+="- **HIGH:** $HIGH_COUNT\n"
REPORT+="- **MEDIUM:** $MEDIUM_COUNT\n"

if [[ "$STRICT" == "true" && $TOTAL_ISSUES -gt 0 ]]; then
  REPORT+="\n🚫 **STRICT MODE:** $TOTAL_ISSUES issue(s) must be fixed before proceeding."
elif [[ $CRITICAL_COUNT -gt 0 ]]; then
  REPORT+="\n🚫 **Fix CRITICAL issues before committing.**"
elif [[ $HIGH_COUNT -gt 0 ]]; then
  REPORT+="\n⚠️ **Fix HIGH issues before committing.**"
else
  REPORT+="\n✅ **All checks passed.**"
fi

# ─── Output JSON ───
# Escape newlines and quotes for JSON
JSON_CONTENT=$(printf '%s' "$REPORT" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g; s/\t/\\t/g')
echo "{\"content\": \"$JSON_CONTENT\"}"
