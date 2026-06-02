import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { selectLanguage, searchTree, listTree } from "../src/search.ts";

const index = JSON.parse(
  readFileSync(new URL("./fixtures/index-foundation-slice.json", import.meta.url), "utf8")
);
const nodes = selectLanguage(index, "swift");

test("selectLanguage returns the swift root module", () => {
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0].title, "Foundation");
});

test("searchTree ranks an exact title match first", () => {
  const hits = searchTree(nodes, "URLSession", 10);
  assert.equal(hits[0].title, "URLSession");
  assert.equal(hits[0].path, "/documentation/foundation/urlsession");
  assert.equal(hits[0].kind, "class");
});

test("searchTree descends into children", () => {
  const hits = searchTree(nodes, "dataTask", 10);
  assert.ok(hits.some((h) => h.path === "/documentation/foundation/urlsession/datatask(with:)"));
});

test("searchTree carries the deprecated flag", () => {
  const hits = searchTree(nodes, "NSURLConnection", 10);
  assert.equal(hits[0].deprecated, true);
});

test("listTree returns depth-1 entries with a path, skipping group markers", () => {
  const items = listTree(nodes, 1);
  const titles = items.map((i) => i.title);
  assert.ok(titles.includes("URLSession"));
  assert.ok(titles.includes("URLSessionConfiguration"));
  assert.ok(!titles.includes("URL Loading System")); // groupMarker, no path
  assert.ok(!titles.includes("dataTask(with:)")); // depth 2
});
