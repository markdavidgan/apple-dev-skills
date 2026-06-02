# apple-docs MCP — Design

**Date:** 2026-06-02
**Status:** Approved

## Problem

Agents writing Apple-platform code hallucinate APIs and availability. Apple
publishes its entire developer documentation corpus as structured JSON (the data
layer behind developer.apple.com), but exposes **no public search-query API** —
the old `search_data.php` endpoint is gone. What *is* live and verified:

| Endpoint | Returns |
|---|---|
| `…/tutorials/data/documentation/technologies.json` | Framework catalog (~373 frameworks, `title → /documentation/<Framework>`) |
| `…/tutorials/data/index/<framework>` | Full nav tree, nodes `{path, title, type}`, split by language (`swift`/`occ`) |
| `…/tutorials/data/documentation/<path>.json` | Per-symbol render JSON: title, symbolKind, platform availability, abstract, declaration, discussion, topics |

This MCP turns that data layer into four agent tools, with **zero committed
data** — it ships code only and caches fetched JSON at runtime.

## Architecture

Standalone TypeScript MCP server at `src/mcp/apple-docs/`, mirroring the ASC MCP:
ESM, `@modelcontextprotocol/sdk`, `zod`, `tsc` → `dist/`. Its own
`package.json` / `tsconfig.json` / `mcp.json` / `README.md`. Built separately —
**not** part of `scripts/build.js` (same as ASC).

### Modules

- `src/cache.ts` — JSON-file cache under `$XDG_CACHE_HOME/apple-docs-mcp/`
  (fallback `~/.cache`, then `os.tmpdir()`). TTL per kind; serves stale on
  refetch failure.
- `src/fetch.ts` — `fetch` with explicit User-Agent + cache integration. Three
  endpoint helpers: `getCatalog()`, `getIndexTree(framework)`,
  `getRenderJson(path)`. **No bulk crawling** — every fetch is tool-driven.
- `src/resolve.ts` — pure `parseCatalog(json)` and
  `resolveFramework(query, catalog, explicit?)`. Auto-resolves the framework
  from the query against the catalog + a small alias map; explicit arg always
  wins; falls back to a default set.
- `src/search.ts` — pure `searchTree(tree, query, limit)` and
  `listTree(tree, depth)`.
- `src/render.ts` — pure `distillSymbol(json)` and `extractAvailability(json)`.
- `src/index.ts` — server + four tool registrations (thin: fetch → pure fn).

Pure functions take parsed JSON as arguments so they are unit-tested against
committed fixtures with no network.

## Framework resolution (auto-resolve)

1. Explicit `framework` arg → normalized to a slug, used directly.
2. Else scan the query against catalog titles/slugs + alias map
   (`ui`→UIKit, `nsurl…`→Foundation, …). Longest match wins → search that tree.
3. Else fall back to a default set: Foundation, SwiftUI, UIKit, Combine,
   SwiftData, Observation. Fetch each tree (cached), merge + rank.

Every search result reports `searchedFrameworks` so the scope is never silently
narrowed. Index slugs are lowercased (`/index/foundation`); resolver normalizes
and falls back to catalog casing on 404.

## Tools

- **`search_docs(query, framework?, limit=10)`** → `{ results: [{title, path,
  kind, framework}], searchedFrameworks }`.
- **`get_symbol(path, language?="swift")`** → distilled markdown: title, kind,
  availability, abstract, declaration, discussion summary, topic links.
- **`list_framework(framework, depth=1)`** → top-level topics/symbols.
- **`check_availability(path)`** → platform/OS-version line only.

## Errors

404 → "not found, did you mean…" with nearest catalog matches. Network failure
with warm cache → serve stale + flag. Cold failure → clear error naming the URL.

## Testing

Committed fixture JSONs (catalog slice, index-tree slice, a render JSON).
Unit tests (`node --test` via `tsx`) cover the resolver, tree search/ranking,
and the distiller — fully offline. One live-smoke test gated behind an env flag
so CI stays hermetic.

## Out of scope (YAGNI)

No LSP. No pre-built/global/committed index or DB (not portable in a skills
repo). No Obj-C-first output (Swift default; `language` arg covers it). No
cache-write/refresh tooling.
