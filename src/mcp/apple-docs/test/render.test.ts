import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { distillSymbol, extractAvailability } from "../src/render.ts";

const render = JSON.parse(
  readFileSync(new URL("./fixtures/render-urlsession.json", import.meta.url), "utf8")
);

test("extractAvailability formats every platform", () => {
  assert.equal(
    extractAvailability(render),
    "iOS 7.0+, iPadOS 7.0+, macOS 10.9+, Mac Catalyst 13.0+"
  );
});

test("extractAvailability is empty when no platform data", () => {
  assert.equal(extractAvailability({ metadata: {} }), "");
});

test("distillSymbol includes title, kind, availability, abstract", () => {
  const md = distillSymbol(render);
  assert.match(md, /^# URLSession/);
  assert.match(md, /\*\*Kind:\*\* class/);
  assert.match(md, /\*\*Availability:\*\* iOS 7\.0\+/);
  assert.match(md, /coordinates a group of related/);
});

test("distillSymbol renders the swift declaration", () => {
  const md = distillSymbol(render);
  assert.match(md, /```swift\nclass URLSession\n```/);
});

test("distillSymbol flattens discussion inline content (codeVoice → backticks)", () => {
  const md = distillSymbol(render);
  assert.match(md, /## Discussion/);
  assert.match(md, /Your app creates one or more `URLSession` instances/);
});

test("distillSymbol lists topics with resolved paths", () => {
  const md = distillSymbol(render);
  assert.match(md, /## Topics/);
  assert.match(md, /- URLSessionConfiguration — \/documentation\/foundation\/urlsessionconfiguration/);
});
