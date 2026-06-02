# apple-docs MCP

An MCP server for Apple's **official developer documentation**. It reads the
live DocC data layer behind developer.apple.com — no API key, no scraping of
rendered HTML, and **no committed data**: docs are fetched on demand and cached
as JSON at runtime.

## Why

Agents writing Apple-platform code hallucinate APIs and availability. Apple has
no public documentation *search* endpoint, but it does serve its entire corpus
as structured JSON. This server turns that into four lookup tools.

## Tools

| Tool | Purpose |
|------|---------|
| `search_docs(query, framework?, limit=10)` | Search symbols/APIs. Auto-resolves the framework from the query; pass `framework` to scope. |
| `get_symbol(path, language?="swift")` | Read a symbol: title, kind, availability, abstract, declaration, discussion, topics. |
| `list_framework(framework, depth=1)` | Browse a framework's top-level topics. |
| `check_availability(path)` | Just the platform/OS-version line, e.g. `iOS 17.0+, macOS 14.0+`. |

Paths come from `search_docs` and look like `/documentation/foundation/urlsession`.

## Build

```bash
npm install
npm run build   # tsc → dist/
npm test        # offline unit tests (node --test via tsx)
```

Register with `mcp.json` (replace `<REPO_PATH>`):

```json
{
  "mcpServers": {
    "apple-docs": { "command": "node", "args": ["<REPO_PATH>/apple-dev-skills/src/mcp/apple-docs/dist/index.js"] }
  }
}
```

## Data & caching

- Endpoints (all public, unauthenticated): `technologies.json` (framework
  catalog), `/tutorials/data/index/<framework>` (nav tree),
  `/tutorials/data/documentation/<path>.json` (symbol render JSON).
- Cache: JSON files under `$XDG_CACHE_HOME/apple-docs-mcp` (fallback `~/.cache`,
  then the temp dir). Catalog/index trees 24 h, symbols 7 d. A warm cache is
  served if a refetch fails.
- These `tutorials/data/*.json` paths are Apple's internal data layer, not a
  published contract. The server fetches only on demand (no bulk crawling) and
  caches, which keeps usage light and resilient to shape changes.

## Tests

Pure functions (resolver, tree search, render distiller) are unit-tested
against committed fixtures in `test/fixtures/`, so the suite runs fully offline.
