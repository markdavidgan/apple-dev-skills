#!/usr/bin/env bash
#
# iOS 26 API Lookup — Kimi Tool
# Reads JSON params from stdin, writes JSON results to stdout.
# Searches the ios26-api-reference for API signatures and anti-hallucination data.
#
# Input:  {"query": "LanguageModelSession"}
# Output: {"content": "matching snippets and references"}

set -euo pipefail

# Resolve reference directory relative to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REF_DIR="$SCRIPT_DIR/../reference"

# ─── Parse JSON from stdin ───
read -r INPUT
QUERY=$(echo "$INPUT" | grep -o '"query"[[:space:]]*:[[:space:]]*"[^"]*"' | cut -d'"' -f4 || true)

if [[ -z "$QUERY" ]]; then
  echo '{"error":"Missing query parameter"}'
  exit 1
fi

# ─── Search ───
RESULTS=""
MATCH_COUNT=0

# Search in essentials (highest priority)
if [[ -d "$REF_DIR/essentials" ]]; then
  essentials=$(grep -rni "$QUERY" "$REF_DIR/essentials" --include="*.md" 2>/dev/null | head -30 || true)
  if [[ -n "$essentials" ]]; then
    RESULTS+="\n## 📘 Essentials\n\n\`\`\`\n$essentials\n\`\`\`\n"
    MATCH_COUNT=$((MATCH_COUNT + $(echo "$essentials" | wc -l)))
  fi
fi

# Search in reference (deep lookup)
if [[ -d "$REF_DIR/reference" ]]; then
  reference=$(grep -rni "$QUERY" "$REF_DIR/reference" --include="*.md" 2>/dev/null | head -30 || true)
  if [[ -n "$reference" ]]; then
    RESULTS+="\n## 📚 Reference\n\n\`\`\`\n$reference\n\`\`\`\n"
    MATCH_COUNT=$((MATCH_COUNT + $(echo "$reference" | wc -l)))
  fi
fi

# Search in guides (expert context)
if [[ -d "$REF_DIR/guides" ]]; then
  guides=$(grep -rni "$QUERY" "$REF_DIR/guides" --include="*.md" 2>/dev/null | head -20 || true)
  if [[ -n "$guides" ]]; then
    RESULTS+="\n## 🎓 Expert Guides\n\n\`\`\`\n$guides\n\`\`\`\n"
    MATCH_COUNT=$((MATCH_COUNT + $(echo "$guides" | wc -l)))
  fi
fi

# Search in intel (community gotchas)
if [[ -d "$REF_DIR/intel" ]]; then
  intel=$(grep -rni "$QUERY" "$REF_DIR/intel" --include="*.md" 2>/dev/null | head -20 || true)
  if [[ -n "$intel" ]]; then
    RESULTS+="\n## 💡 Community Intel\n\n\`\`\`\n$intel\n\`\`\`\n"
    MATCH_COUNT=$((MATCH_COUNT + $(echo "$intel" | wc -l)))
  fi
fi

# ─── Build response ───
if [[ $MATCH_COUNT -eq 0 ]]; then
  REPORT="No matches found for '\"$QUERY\"' in the iOS 26 API reference.\n\nSuggestions:\n- Try a broader term (e.g., 'Speech' instead of 'SpeechTranscriber')\n- Check the framework name (e.g., 'SwiftData', 'FoundationModels')\n- Use Context7 MCP for live documentation lookup"
else
  REPORT="Found $MATCH_COUNT match(es) for '\"$QUERY\"':\n$RESULTS\n\n---\n\n**Priority:** Essentials > Reference > Guides > Intel\n**Tip:** For live API signatures, also query Context7 MCP."
fi

# ─── Output JSON ───
JSON_CONTENT=$(printf '%s' "$REPORT" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g; s/\t/\\t/g')
echo "{\"content\": \"$JSON_CONTENT\"}"
