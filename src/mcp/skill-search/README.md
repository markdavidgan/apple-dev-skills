# skill-search MCP

A local-first MCP server that provides **keyword/BM25 search** over the 57
apple-dev skills and their `references/*.md` files. Lets agents find the right
skill and load only the section they need, instead of injecting full SKILL.md
bodies into context.

## Why

57 skills × several KB each = tens of thousands of tokens if loaded in bulk.
This server indexes them at startup and returns ranked chunks so agents can:

1. Call `search_skills("rejection recovery")` → find `apple-review` with score
2. Call `get_skill_section("apple-review", "Appeal")` → load just that section

## Tools

| Tool | Purpose |
|------|---------|
| `search_skills(query, limit?=8)` | BM25 keyword search over all skill chunks. Returns `{skill, file, heading, snippet, score}`. |
| `list_skills()` | All skill names + frontmatter descriptions. Good for browsing. |
| `get_skill_section(skill, heading?)` | Full SKILL.md text, or just the section matching `heading` (substring, case-insensitive). |

## Retrieval strategy

Keyword BM25 (TF-IDF with saturation). The scorer is intentionally simple:

- Zero dependencies beyond the MCP SDK and Zod.
- No model download, no embedding server, no external API.
- Good enough for 57 skills: typical query latency < 5 ms after index build.

**Pluggable:** `search()` in `src/indexer.ts` takes a `BM25Index` struct.
A future version could add an embedding-based re-ranker by replacing
`scoreChunk` without changing the server API.

## Build

```bash
npm install
npm run build   # tsc → dist/
npm test        # node --test (offline, fixture-based)
```

Register with Claude Code (replace `<REPO_PATH>`):

```json
{
  "mcpServers": {
    "skill-search": {
      "command": "node",
      "args": ["<REPO_PATH>/apple-dev-skills/src/mcp/skill-search/dist/index.js"],
      "env": {}
    }
  }
}
```

## Configuration

| Env var | Default | Purpose |
|---------|---------|---------|
| `SKILL_SEARCH_ROOT` | `../../skills` (relative to `dist/index.js`) | Override skills root, useful for testing |

## Indexing

The index is built **lazily on the first query** and cached in-memory. It walks:

```
src/skills/<name>/SKILL.md
src/skills/<name>/references/*.md   (if present)
```

Each file is split into chunks at `#` / `##` / `###` heading boundaries.
Chunks carry: `skill`, `file`, `heading`, `text`.

BM25 parameters: K1=1.5, B=0.75 (standard defaults).

## Tests

Unit-tested against committed fixtures in `test/fixtures/`. The suite runs
fully offline — no network, no external services.

```bash
npm test
```
