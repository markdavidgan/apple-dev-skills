#!/usr/bin/env node
// overlay-sync — idempotently scaffold/sync per-project overlay skills from a
// descriptor (.claude/apple-overlays.json). Run in ANY Apple-dev project.
//
//   node sync.mjs [--descriptor <path>] [--check]
//
// For each overlay in the descriptor it:
//   1. locates the engine's overlay template (shipped beside this script in the
//      same plugin: <scriptDir>/../<engine>/templates/overlay-template.md),
//   2. fills {{placeholders}} from the overlay's vars (+ computed appsTable /
//      appBindings from vars.apps),
//   3. writes .claude/skills/<prefix>-<engine>/SKILL.md, regenerating ONLY the
//      managed region (top-of-file through the END marker) and PRESERVING any
//      hand-written tail after it.
//
// Idempotent: unchanged descriptor + unchanged template => byte-identical output,
// reported as "unchanged". --check makes no writes and exits 1 on drift.
// Zero external deps (Node stdlib only). Node 18+.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const END_MARKER_RE = /<!--\s*END\s+\S+:managed\s*-->/;

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  return i !== -1 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}
const CHECK = process.argv.includes("--check");

function fail(msg) {
  console.error(`overlay-sync: ${msg}`);
  process.exit(2);
}

function fill(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (m, key) => {
    if (!(key in vars)) {
      console.error(`overlay-sync: WARNING unresolved placeholder {{${key}}}`);
      return m;
    }
    return String(vars[key]);
  });
}

function renderAppsTable(apps) {
  if (!apps || !apps.length) return "_No apps declared in the descriptor._";
  const rows = apps.map(
    (a) => `| \`${a.name}\` | \`${a.scheme}\` | \`${a.dir}\` |`
  );
  return ["| App | Screenshot scheme | App dir |", "|-----|-------------------|---------|", ...rows].join("\n");
}

function renderAppBindings(apps) {
  if (!apps || !apps.length) return "_No apps declared in the descriptor._";
  return apps
    .map((a) => {
      const lines = [
        `### \`${a.name}\``,
        "",
        `- **Scheme:** \`${a.scheme}\``,
        `- **App dir:** \`${a.dir}\``,
        `- **Manifest:** \`${a.screenshotsDir || a.dir + "/design-handoff"}/shots.yaml\``,
      ];
      if (a.designLanguage) lines.push(`- **Design language:** ${a.designLanguage}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

function computeVars(overlay, descriptor) {
  const prefix = descriptor.prefix || descriptor.project || "app";
  const engine = overlay.engine;
  const v = { ...(overlay.vars || {}) };
  const overlayName = overlay.name || `${prefix}-${engine}`;
  const apps = v.apps || [];

  // Sensible defaults so a minimal descriptor still produces a valid overlay.
  const defaults = {
    overlayName,
    overlayTitle: v.overlayTitle || `${cap(prefix)} ${titleize(engine)}`,
    overlayDescription:
      v.overlayDescription ||
      `Project overlay binding the ${engine} engine to ${descriptor.project || prefix}. Use when running ${engine} in this project.`,
    projectName: v.projectName || descriptor.project || prefix,
    appsTable: renderAppsTable(apps),
    appBindings: renderAppBindings(apps),
    captureCommand: v.captureCommand || "bundle exec fastlane ios_screenshots",
    handoffPathPattern: v.handoffPathPattern || "apps/{app}/design-handoff/",
    hostPolicy:
      v.hostPolicy ||
      "Run `capture` only where the engine's host guard returns `capable`. If a `.claude/NO_SIMULATOR.md` marker is present this machine is opted out — capture elsewhere, package anywhere.",
  };
  // Explicit vars win over computed defaults (except the structural appsTable/appBindings).
  return { ...defaults, ...v, overlayName, appsTable: defaults.appsTable, appBindings: defaults.appBindings };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const titleize = (s) => s.split(/[-_]/).map(cap).join(" ");

function syncOne(overlay, descriptor) {
  const engine = overlay.engine;
  if (!engine) fail("an overlay entry is missing `engine`");
  const templatePath = path.resolve(SCRIPT_DIR, "..", engine, "templates", "overlay-template.md");
  if (!fs.existsSync(templatePath)) {
    fail(`engine template not found for "${engine}" at ${templatePath} (is the ${engine} skill installed in this plugin?)`);
  }
  const template = fs.readFileSync(templatePath, "utf8");
  const vars = computeVars(overlay, descriptor);
  const rendered = fill(template, vars);

  const endMatch = rendered.match(END_MARKER_RE);
  if (!endMatch) fail(`engine template for "${engine}" has no END managed marker`);
  const renderedEnd = endMatch.index + endMatch[0].length;
  const renderedManaged = rendered.slice(0, renderedEnd);
  const renderedTail = rendered.slice(renderedEnd);

  const outDir = path.join(process.cwd(), ".claude", "skills", vars.overlayName);
  const outFile = path.join(outDir, "SKILL.md");

  let finalContent;
  let existed = fs.existsSync(outFile);
  if (existed) {
    const existing = fs.readFileSync(outFile, "utf8");
    // Match THIS engine's END marker, not any engine's — so a marker-like string
    // a user pasted into the preserved tail can't truncate their own notes.
    const esc = engine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exEnd = existing.match(new RegExp(`<!--\\s*END\\s+${esc}:managed\\s*-->`));
    const preservedTail = exEnd ? existing.slice(exEnd.index + exEnd[0].length) : renderedTail;
    finalContent = renderedManaged + preservedTail;
  } else {
    finalContent = renderedManaged + renderedTail;
  }

  const current = existed ? fs.readFileSync(outFile, "utf8") : null;
  if (current === finalContent) return { overlayName: vars.overlayName, status: "unchanged" };

  if (CHECK) return { overlayName: vars.overlayName, status: existed ? "would-update" : "would-create" };

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, finalContent);
  return { overlayName: vars.overlayName, status: existed ? "updated" : "created" };
}

function main() {
  const descriptorPath = path.resolve(arg("--descriptor", ".claude/apple-overlays.json"));
  if (!fs.existsSync(descriptorPath)) {
    fail(`descriptor not found: ${descriptorPath}\nCreate .claude/apple-overlays.json (see the overlay-sync skill template).`);
  }
  let descriptor;
  try {
    descriptor = JSON.parse(fs.readFileSync(descriptorPath, "utf8"));
  } catch (e) {
    fail(`descriptor is not valid JSON: ${e.message}`);
  }
  if (!Array.isArray(descriptor.overlays) || descriptor.overlays.length === 0) {
    fail("descriptor has no `overlays` array");
  }

  const results = descriptor.overlays.map((o) => syncOne(o, descriptor));
  for (const r of results) console.log(`  ${r.status.padEnd(12)} .claude/skills/${r.overlayName}/SKILL.md`);

  if (CHECK) {
    const drift = results.some((r) => r.status.startsWith("would-"));
    if (drift) {
      console.error("overlay-sync --check: overlays are OUT OF SYNC (run without --check to fix)");
      process.exit(1);
    }
    console.log("overlay-sync --check: all overlays in sync");
  }
}

main();
