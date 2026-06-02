// Pure search and listing over a framework index tree. The tree JSON has shape
// { interfaceLanguages: { swift: Node[], occ: Node[], ... } } where each Node is
// { title, path?, type, children?, deprecated?, beta? }.

export interface Node {
  title?: string;
  path?: string;
  type?: string;
  deprecated?: boolean;
  beta?: boolean;
  children?: Node[];
}

export interface Hit {
  title: string;
  path: string;
  kind: string;
  deprecated?: boolean;
}

/** Pick a language's node array, falling back to swift, then any present. */
export function selectLanguage(indexJson: any, lang = "swift"): Node[] {
  const langs = indexJson?.interfaceLanguages ?? {};
  return langs[lang] ?? langs.swift ?? Object.values<Node[]>(langs)[0] ?? [];
}

function score(title: string, path: string, q: string, tokens: string[]): number {
  const t = title.toLowerCase();
  const p = path.toLowerCase();
  let s = 0;
  if (t === q) s = 100;
  else if (t.startsWith(q)) s = 75;
  else if (t.includes(q)) s = 50;
  else if (tokens.every((tok) => t.includes(tok))) s = 40;
  else if (p.includes(q)) s = 25;
  else if (tokens.every((tok) => p.includes(tok))) s = 15;
  else return 0;
  // Prefer more specific (shorter) titles among equal-tier matches.
  return s + Math.max(0, 20 - title.length / 4);
}

/** Rank nodes with a `path` by relevance to `query`. */
export function searchTree(nodes: Node[], query: string, limit = 10): Hit[] {
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);
  const hits: Array<Hit & { _s: number }> = [];

  const walk = (list: Node[]) => {
    for (const n of list) {
      if (n.path && n.title) {
        const s = score(n.title, n.path, q, tokens);
        if (s > 0) {
          hits.push({
            title: n.title,
            path: n.path,
            kind: n.type ?? "symbol",
            deprecated: n.deprecated || undefined,
            _s: s,
          });
        }
      }
      if (n.children) walk(n.children);
    }
  };
  walk(nodes);

  hits.sort((a, b) => b._s - a._s);
  return hits.slice(0, limit).map(({ _s, ...h }) => h);
}

/** Top-level entries down to `depth` (1 = immediate children of the root module). */
export function listTree(nodes: Node[], depth = 1): Hit[] {
  const out: Hit[] = [];
  const walk = (list: Node[], d: number) => {
    for (const n of list) {
      if (n.path && n.title) {
        out.push({
          title: n.title,
          path: n.path,
          kind: n.type ?? "symbol",
          deprecated: n.deprecated || undefined,
        });
      }
      if (n.children && d > 1) walk(n.children, d - 1);
    }
  };
  // The root is usually a single module node; descend into it first.
  const roots = nodes.length === 1 && nodes[0].children ? nodes[0].children : nodes;
  walk(roots, depth);
  return out;
}
