// Framework catalog parsing and query → framework resolution. Pure: every
// function takes parsed JSON / plain data so it is unit-testable offline.

export interface Framework {
  title: string; // e.g. "SwiftUI"
  slug: string; // e.g. "swiftui" (used for the /index/<slug> endpoint)
}

// Frameworks searched when the query names none. Kept small to bound fetches.
export const DEFAULT_SET = [
  "foundation",
  "swiftui",
  "uikit",
  "combine",
  "swiftdata",
  "observation",
];

// Hand aliases for cases the catalog text won't match on its own.
const ALIASES: Record<string, string> = {
  ui: "uikit",
  appkit: "appkit",
  ns: "foundation",
  nsobject: "foundation",
  cg: "coregraphics",
  ca: "quartzcore",
};

/** Parse technologies.json into a flat framework catalog. */
export function parseCatalog(json: any): Framework[] {
  const refs = json?.references ?? {};
  const out: Framework[] = [];
  const seen = new Set<string>();
  for (const ref of Object.values<any>(refs)) {
    const url: string = ref?.url ?? "";
    // Framework-level pages are exactly /documentation/<Slug> (one segment).
    const m = /^\/documentation\/([^/]+)$/.exec(url);
    if (!m) continue;
    const slug = m[1].toLowerCase();
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ title: ref.title ?? m[1], slug });
  }
  return out;
}

function normalizeExplicit(explicit: string, catalog: Framework[]): string {
  const want = explicit.toLowerCase().replace(/\s+/g, "");
  const byTitle = catalog.find((f) => f.title.toLowerCase().replace(/\s+/g, "") === want);
  if (byTitle) return byTitle.slug;
  const bySlug = catalog.find((f) => f.slug === want);
  if (bySlug) return bySlug.slug;
  return ALIASES[want] ?? want; // accept unknown slugs as-is
}

export interface Resolution {
  slugs: string[];
  matched: boolean; // true if resolved from query/explicit; false if default set
}

/**
 * Resolve which framework slug(s) to search.
 *  1. explicit arg always wins,
 *  2. else longest catalog/alias match found in the query,
 *  3. else the default set.
 */
export function resolveFramework(
  query: string,
  catalog: Framework[],
  explicit?: string
): Resolution {
  if (explicit && explicit.trim()) {
    return { slugs: [normalizeExplicit(explicit, catalog)], matched: true };
  }

  const q = ` ${query.toLowerCase()} `;
  let best: { slug: string; len: number } | null = null;

  for (const f of catalog) {
    const t = f.title.toLowerCase();
    // Word-ish boundary match so "ui" in "build" doesn't count.
    if (q.includes(` ${t} `) || q.includes(` ${f.slug} `)) {
      if (!best || t.length > best.len) best = { slug: f.slug, len: t.length };
    }
  }
  for (const [alias, slug] of Object.entries(ALIASES)) {
    if (q.includes(` ${alias} `) && (!best || alias.length > best.len)) {
      best = { slug, len: alias.length };
    }
  }

  if (best) return { slugs: [best.slug], matched: true };
  return { slugs: DEFAULT_SET, matched: false };
}

/** Nearest framework titles for a "did you mean" hint. */
export function nearestFrameworks(needle: string, catalog: Framework[], n = 5): string[] {
  const q = needle.toLowerCase();
  return catalog
    .filter((f) => f.slug.includes(q) || f.title.toLowerCase().includes(q))
    .slice(0, n)
    .map((f) => f.title);
}
