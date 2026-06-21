import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import {
  tokenize,
  chunkMarkdown,
  parseFrontmatter,
  walkSkills,
  buildIndex,
  search,
} from "../src/indexer.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_ROOT = join(__dirname, "fixtures", "skills");

// ─── tokenize ────────────────────────────────────────────────────────────────

test("tokenize lowercases and drops stopwords", () => {
  const tokens = tokenize("The Keychain stores a secret");
  assert.ok(!tokens.includes("the"), "should drop 'the'");
  assert.ok(!tokens.includes("a"), "should drop 'a'");
  assert.ok(tokens.includes("keychain"), "should keep 'keychain'");
  assert.ok(tokens.includes("stores"), "should keep 'stores'");
  assert.ok(tokens.includes("secret"), "should keep 'secret'");
});

test("tokenize strips punctuation and short tokens", () => {
  const tokens = tokenize("Swift, iOS: 17.0+");
  assert.ok(!tokens.includes(","), "no punctuation");
  // 'swift', 'ios', '17' — '17' has length 2, should be included
  assert.ok(tokens.includes("swift"));
  assert.ok(tokens.includes("ios"));
});

// ─── parseFrontmatter ─────────────────────────────────────────────────────────

test("parseFrontmatter extracts name and description", () => {
  const content = `---\nname: app-security\ndescription: Use when hardening apps\n---\n\n# Body`;
  const fm = parseFrontmatter(content);
  assert.equal(fm.name, "app-security");
  assert.equal(fm.description, "Use when hardening apps");
});

test("parseFrontmatter returns empty object when no frontmatter", () => {
  const fm = parseFrontmatter("# No frontmatter here");
  assert.deepEqual(fm, {});
});

// ─── chunkMarkdown ────────────────────────────────────────────────────────────

test("chunkMarkdown produces chunks per heading section", () => {
  const md = `# App Security\n\nIntro text.\n\n## Keychain\n\nStore secrets safely.\n\n### Storing Credentials\n\nUse SecItemAdd.`;
  const chunks = chunkMarkdown("app-security", "app-security/SKILL.md", md);

  // Expect 3 chunks: one for intro, one for Keychain, one for Storing Credentials
  assert.equal(chunks.length, 3);
  assert.equal(chunks[0].heading, "App Security");
  assert.ok(chunks[0].text.includes("Intro text"));
  assert.equal(chunks[1].heading, "Keychain");
  assert.ok(chunks[1].text.includes("Store secrets safely"));
  assert.equal(chunks[2].heading, "Storing Credentials");
  assert.ok(chunks[2].text.includes("SecItemAdd"));
});

test("chunkMarkdown sets skill and file correctly", () => {
  const md = `## Section\n\nSome content.`;
  const chunks = chunkMarkdown("my-skill", "my-skill/SKILL.md", md);
  assert.equal(chunks[0].skill, "my-skill");
  assert.equal(chunks[0].file, "my-skill/SKILL.md");
});

test("chunkMarkdown skips empty sections", () => {
  const md = `## Empty\n\n## HasContent\n\nActual text here.`;
  const chunks = chunkMarkdown("skill", "skill/SKILL.md", md);
  // "Empty" section has no text, should not produce a chunk
  const headings = chunks.map((c) => c.heading);
  assert.ok(!headings.includes("Empty"), "empty section should be skipped");
  assert.ok(headings.includes("HasContent"));
});

// ─── walkSkills + buildIndex + search ────────────────────────────────────────

test("walkSkills finds fixture skills and parses frontmatter", () => {
  const { skills, chunks } = walkSkills(FIXTURES_ROOT);

  assert.equal(skills.length, 2, "should find 2 fixture skills");

  const names = skills.map((s) => s.name);
  assert.ok(names.includes("app-security"));
  assert.ok(names.includes("apple-review"));

  const secSkill = skills.find((s) => s.name === "app-security")!;
  assert.ok(secSkill.description.length > 0, "description should be parsed");

  assert.ok(chunks.length > 0, "should have chunks");
});

test("search returns app-security chunks for 'keychain'", () => {
  const { chunks } = walkSkills(FIXTURES_ROOT);
  const index = buildIndex(chunks);
  const hits = search(index, "keychain", 5);

  assert.ok(hits.length > 0, "should have results");
  assert.equal(hits[0].skill, "app-security", "top hit should be app-security");
  assert.ok(
    hits[0].heading.toLowerCase().includes("keychain"),
    `top hit heading should mention keychain, got: "${hits[0].heading}"`
  );
});

test("search returns apple-review chunks for 'rejection'", () => {
  const { chunks } = walkSkills(FIXTURES_ROOT);
  const index = buildIndex(chunks);
  const hits = search(index, "rejection appeal", 5);

  assert.ok(hits.length > 0, "should have results");
  assert.equal(hits[0].skill, "apple-review", "top hit should be apple-review");
});

test("search respects limit parameter", () => {
  const { chunks } = walkSkills(FIXTURES_ROOT);
  const index = buildIndex(chunks);
  const hits = search(index, "app", 2);
  assert.ok(hits.length <= 2, "should not exceed limit");
});

test("search returns empty array for nonsense query", () => {
  const { chunks } = walkSkills(FIXTURES_ROOT);
  const index = buildIndex(chunks);
  const hits = search(index, "xyzzy qwerty zork", 10);
  assert.equal(hits.length, 0);
});

test("search hits include score, snippet, skill, file, heading", () => {
  const { chunks } = walkSkills(FIXTURES_ROOT);
  const index = buildIndex(chunks);
  const hits = search(index, "biometric authentication", 3);

  assert.ok(hits.length > 0);
  const h = hits[0];
  assert.ok(typeof h.skill === "string");
  assert.ok(typeof h.file === "string");
  assert.ok(typeof h.heading === "string");
  assert.ok(typeof h.snippet === "string");
  assert.ok(typeof h.score === "number" && h.score > 0);
  assert.ok(h.snippet.length <= 300, "snippet should be at most 300 chars");
});
