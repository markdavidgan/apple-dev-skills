import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseCatalog, resolveFramework, DEFAULT_SET } from "../src/resolve.ts";

const catalog = parseCatalog(
  JSON.parse(readFileSync(new URL("./fixtures/technologies-slice.json", import.meta.url), "utf8"))
);

test("parseCatalog keeps framework-level pages, drops symbol-level", () => {
  const slugs = catalog.map((f) => f.slug).sort();
  assert.deepEqual(slugs, ["foundation", "swiftui", "uikit"]);
  assert.ok(!slugs.includes("urlsession")); // /documentation/foundation/urlsession is 2 segments
});

test("explicit framework arg always wins and normalizes to slug", () => {
  const r = resolveFramework("anything at all", catalog, "Foundation");
  assert.deepEqual(r.slugs, ["foundation"]);
  assert.equal(r.matched, true);
});

test("resolves framework named in the query", () => {
  const r = resolveFramework("SwiftUI Button styling", catalog);
  assert.deepEqual(r.slugs, ["swiftui"]);
  assert.equal(r.matched, true);
});

test("alias resolves 'ui' to uikit", () => {
  const r = resolveFramework("how do ui views work", catalog);
  assert.deepEqual(r.slugs, ["uikit"]);
  assert.equal(r.matched, true);
});

test("falls back to the default set when no framework is named", () => {
  const r = resolveFramework("URLSession data task", catalog);
  assert.deepEqual(r.slugs, DEFAULT_SET);
  assert.equal(r.matched, false);
});
