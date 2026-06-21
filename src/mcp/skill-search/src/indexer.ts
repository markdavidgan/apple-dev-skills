/**
 * indexer.ts — Walk src/skills, chunk by markdown headings, build an
 * in-memory BM25-style index.
 *
 * Retrieval strategy: keyword/BM25 (TF-IDF with BM25 saturation).
 * This keeps the server zero-infra and zero-dependency on model downloads.
 * The tokenizer + scorer is pluggable; a future version could swap in
 * embedding-based retrieval by replacing `scoreChunk` below.
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Chunk {
  /** Skill directory name, e.g. "app-security" */
  skill: string;
  /** File path relative to skills root, e.g. "app-security/SKILL.md" */
  file: string;
  /** Heading breadcrumb, e.g. "## Authentication > ### Keychain" */
  heading: string;
  /** Raw text of the chunk (trimmed) */
  text: string;
}

export interface SearchHit extends Chunk {
  /** Snippet: first ~300 chars of text */
  snippet: string;
  /** BM25 score */
  score: number;
}

export interface SkillMeta {
  name: string;
  description: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","from","up","about","into","through","during","is","are","was","were",
  "be","been","being","have","has","had","do","does","did","will","would",
  "could","should","may","might","shall","can","need","dare","ought","used",
  "that","this","these","those","it","its","i","you","he","she","we","they",
  "what","which","who","whom","how","when","where","why","all","any","both",
  "each","few","more","most","other","some","such","no","not","only","own",
  "same","so","than","too","very","just","as","if","then","there","here",
]);

// BM25 parameters
const K1 = 1.5;
const B = 0.75;

// ─── Tokeniser ───────────────────────────────────────────────────────────────

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

// ─── Markdown chunker ────────────────────────────────────────────────────────

const HEADING_RE = /^(#{1,3})\s+(.+)$/m;

/**
 * Split a markdown document into heading-scoped chunks.
 * Each chunk captures the heading trail and the text beneath it until the
 * next heading of equal or higher level.
 */
export function chunkMarkdown(
  skill: string,
  relFile: string,
  content: string
): Chunk[] {
  const lines = content.split("\n");
  const chunks: Chunk[] = [];
  let currentHeading = "";
  let buffer: string[] = [];

  function flush() {
    const text = buffer.join("\n").trim();
    if (text.length > 0) {
      chunks.push({
        skill,
        file: relFile,
        heading: currentHeading,
        text,
      });
    }
    buffer = [];
  }

  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)$/);
    if (m) {
      flush();
      // Heading is the leaf section title (level is captured but the trail is
      // intentionally flat — the skill name already scopes the chunk).
      currentHeading = m[2].trim();
    } else {
      buffer.push(line);
    }
  }
  flush();
  return chunks;
}

// ─── Frontmatter parser ──────────────────────────────────────────────────────

export function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon > 0) {
      const key = line.slice(0, colon).trim();
      const val = line.slice(colon + 1).trim();
      result[key] = val;
    }
  }
  return result;
}

// ─── File walker ─────────────────────────────────────────────────────────────

export function walkSkills(skillsRoot: string): { chunks: Chunk[]; skills: SkillMeta[] } {
  const chunks: Chunk[] = [];
  const skills: SkillMeta[] = [];

  if (!existsSync(skillsRoot)) {
    throw new Error(`Skills root not found: ${skillsRoot}`);
  }

  const entries = readdirSync(skillsRoot).sort();
  for (const entry of entries) {
    const skillDir = join(skillsRoot, entry);
    if (!statSync(skillDir).isDirectory()) continue;

    const skillMdPath = join(skillDir, "SKILL.md");
    if (!existsSync(skillMdPath)) continue;

    const skillMdContent = readFileSync(skillMdPath, "utf8");
    const fm = parseFrontmatter(skillMdContent);

    skills.push({
      name: fm.name ?? entry,
      description: fm.description ?? "",
    });

    // Chunk SKILL.md
    const relFile = `${entry}/SKILL.md`;
    chunks.push(...chunkMarkdown(entry, relFile, skillMdContent));

    // Chunk references/*.md if present
    const refsDir = join(skillDir, "references");
    if (existsSync(refsDir) && statSync(refsDir).isDirectory()) {
      for (const ref of readdirSync(refsDir).sort()) {
        if (!ref.endsWith(".md")) continue;
        const refPath = join(refsDir, ref);
        const refContent = readFileSync(refPath, "utf8");
        const relRef = `${entry}/references/${ref}`;
        chunks.push(...chunkMarkdown(entry, relRef, refContent));
      }
    }
  }

  return { chunks, skills };
}

// ─── BM25 scorer ─────────────────────────────────────────────────────────────

export interface BM25Index {
  chunks: Chunk[];
  /** tf[chunkIdx][term] = raw term frequency */
  tf: Map<string, number>[];
  /** idf[term] = log((N - df + 0.5) / (df + 0.5) + 1) */
  idf: Map<string, number>;
  /** Average chunk length in tokens */
  avgLen: number;
  /** Per-chunk token lengths */
  lengths: number[];
}

export function buildIndex(chunks: Chunk[]): BM25Index {
  const N = chunks.length;
  const df = new Map<string, number>(); // document frequency
  const tf: Map<string, number>[] = [];
  const lengths: number[] = [];

  for (const chunk of chunks) {
    const tokens = tokenize(chunk.text + " " + chunk.heading);
    lengths.push(tokens.length);
    const freqMap = new Map<string, number>();
    for (const tok of tokens) {
      freqMap.set(tok, (freqMap.get(tok) ?? 0) + 1);
    }
    tf.push(freqMap);
    for (const tok of freqMap.keys()) {
      df.set(tok, (df.get(tok) ?? 0) + 1);
    }
  }

  const avgLen = lengths.reduce((a, b) => a + b, 0) / (N || 1);

  const idf = new Map<string, number>();
  for (const [term, freq] of df) {
    idf.set(term, Math.log((N - freq + 0.5) / (freq + 0.5) + 1));
  }

  return { chunks, tf, idf, avgLen, lengths };
}

export function search(
  index: BM25Index,
  query: string,
  limit: number
): SearchHit[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scores: number[] = new Array(index.chunks.length).fill(0);

  for (const term of queryTokens) {
    const idfVal = index.idf.get(term) ?? 0;
    if (idfVal === 0) continue;
    for (let i = 0; i < index.chunks.length; i++) {
      const freq = index.tf[i].get(term) ?? 0;
      if (freq === 0) continue;
      const len = index.lengths[i];
      const norm = 1 - B + B * (len / index.avgLen);
      const tfSat = (freq * (K1 + 1)) / (freq + K1 * norm);
      scores[i] += idfVal * tfSat;
    }
  }

  // Sort indices by score descending
  const ranked = scores
    .map((score, i) => ({ score, i }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return ranked.map(({ score, i }) => {
    const chunk = index.chunks[i];
    return {
      ...chunk,
      snippet: chunk.text.slice(0, 300).replace(/\n+/g, " ").trim(),
      score: Math.round(score * 1000) / 1000,
    };
  });
}
