// Network layer for Apple's DocC data endpoints. Every fetch is driven by a
// tool call — there is no bulk crawling. Responses are cached as JSON; a warm
// (even stale) cache is served when the network fails.

import * as cache from "./cache.js";

const BASE = "https://developer.apple.com";
const UA = "apple-docs-mcp/0.1 (+https://github.com/; MCP doc lookup)";

// TTLs: catalog/index trees change rarely; render JSON rarely. Generous so we
// hit the network sparingly, but not infinite so docs eventually refresh.
const TTL = {
  catalog: 24 * 60 * 60 * 1000,
  index: 24 * 60 * 60 * 1000,
  render: 7 * 24 * 60 * 60 * 1000,
};

export class NotFoundError extends Error {}

async function fetchJson(url: string, ttlMs: number): Promise<any> {
  const cached = cache.read<any>(url);
  if (cached && cached.ageMs < ttlMs) return cached.value;

  let res: Response;
  try {
    res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  } catch (err) {
    if (cached) return cached.value; // stale-on-error
    throw new Error(`Network error fetching ${url}: ${(err as Error).message}`);
  }

  if (res.status === 404) throw new NotFoundError(`Not found: ${url}`);
  if (!res.ok) {
    if (cached) return cached.value; // stale-on-error
    throw new Error(`Apple docs ${res.status} for ${url}`);
  }

  const json = await res.json();
  cache.write(url, json);
  return json;
}

/** The framework catalog (technologies.json). */
export async function getCatalog(): Promise<any> {
  return fetchJson(`${BASE}/tutorials/data/documentation/technologies.json`, TTL.catalog);
}

/**
 * A framework's full index/nav tree. Index slugs are lowercased
 * (`/index/foundation`); we try that first and fall back to the given casing.
 */
export async function getIndexTree(slug: string): Promise<any> {
  const lower = slug.toLowerCase();
  try {
    return await fetchJson(`${BASE}/tutorials/data/index/${lower}`, TTL.index);
  } catch (err) {
    if (err instanceof NotFoundError && lower !== slug) {
      return fetchJson(`${BASE}/tutorials/data/index/${slug}`, TTL.index);
    }
    throw err;
  }
}

/** Per-symbol render JSON. `docPath` is like `/documentation/foundation/urlsession`. */
export async function getRenderJson(docPath: string): Promise<any> {
  const clean = docPath.replace(/^\/+/, "").replace(/\.json$/, "");
  return fetchJson(`${BASE}/tutorials/data/${clean}.json`, TTL.render);
}
