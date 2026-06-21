#!/usr/bin/env node
// design-handoff packager — DETERMINISTIC FILE PLUMBING ONLY.
// It never fabricates prose (captions beyond the manifest, design context, the
// reviewer prompt). Those are authored by the agent into latest/. This script:
//   --raw <dir> --out <handoffDir> --scheme <name> --shots <shots.yaml>
//       archive prior latest/ -> copy raw PNGs into latest/ -> manifest.json + STAMP.txt
//   --zip <latestDir> --dest <dir>
//       zip latest/ -> <name>-handoff-<version>-<sha>.zip into dest
//
// Zero external deps (Node stdlib only). Node 18+.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  return i !== -1 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

function gitOut(args, cwd) {
  try {
    return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

// Minimal, tolerant reader for our manifest's `shots:` list (id + caption only).
// Not a general YAML parser — it reads ONLY the `shots:` list, and from each
// entry only `id` + `caption`. Collection starts at `shots:` and stops at the
// first top-level key after it (e.g. `devices:`, `wishlist:`), so anything
// outside the shots block is silently ignored by design. Captions are used
// solely for manifest.json; the seed/nav fields are intentionally not parsed.
function readShots(file) {
  if (!file || !fs.existsSync(file)) return [];
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const shots = [];
  let inShots = false;
  let cur = null;
  const unquote = (s) => s.trim().replace(/^["']|["']$/g, "");
  for (const raw of lines) {
    const line = raw.replace(/\t/g, "  ");
    if (/^shots:\s*$/.test(line)) { inShots = true; continue; }
    if (inShots && /^[A-Za-z0-9_]+:/.test(line)) { inShots = false; } // next top-level key
    if (!inShots) continue;
    const item = line.match(/^\s*-\s+id:\s*(.+)$/);
    if (item) {
      if (cur) shots.push(cur);
      cur = { id: unquote(item[1]), caption: "" };
      continue;
    }
    const cap = line.match(/^\s+caption:\s*(.+)$/);
    if (cap && cur) cur.caption = unquote(cap[1]);
  }
  if (cur) shots.push(cur);
  return shots;
}

function copyPngs(rawDir, latestDir) {
  const entries = fs
    .readdirSync(rawDir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.png$/i.test(e.name))
    .map((e) => e.name)
    .sort();
  for (const name of entries) {
    fs.copyFileSync(path.join(rawDir, name), path.join(latestDir, name));
  }
  return entries;
}

function doPackage() {
  const rawDir = arg("--raw");
  const outDir = arg("--out");
  const scheme = arg("--scheme", "(unknown)");
  const shotsFile = arg("--shots");
  if (!rawDir || !outDir) {
    console.error("usage: --raw <dir> --out <handoffDir> [--scheme <name>] [--shots <shots.yaml>]");
    process.exit(2);
  }
  if (!fs.existsSync(rawDir)) {
    console.error(`raw dir not found: ${rawDir}`);
    process.exit(1);
  }

  const repoRoot = gitOut(["rev-parse", "--show-toplevel"], outDir) || process.cwd();
  const sha = gitOut(["rev-parse", "--short", "HEAD"], repoRoot) || "nogit";
  const day = gitOut(["show", "-s", "--format=%cd", "--date=format:%Y-%m-%d", "HEAD"], repoRoot) || "undated";

  const latestDir = path.join(outDir, "latest");
  const archiveRoot = path.join(outDir, "archive");

  // Archive prior latest/ before overwriting (gitignored history).
  if (fs.existsSync(latestDir) && fs.readdirSync(latestDir).length > 0) {
    fs.mkdirSync(archiveRoot, { recursive: true });
    let dest = path.join(archiveRoot, `${day}-${sha}`);
    let n = 1;
    while (fs.existsSync(dest)) dest = path.join(archiveRoot, `${day}-${sha}-${n++}`);
    fs.cpSync(latestDir, dest, { recursive: true });
    fs.rmSync(latestDir, { recursive: true, force: true });
  }
  fs.mkdirSync(latestDir, { recursive: true });

  const copied = copyPngs(rawDir, latestDir);
  const shots = readShots(shotsFile);
  const captionById = Object.fromEntries(shots.map((s) => [s.id, s.caption]));

  // manifest.json (id -> caption) + which manifest ids have no PNG (honesty).
  const copiedIds = copied.map((f) => f.replace(/\.png$/i, ""));
  const missing = shots.map((s) => s.id).filter((id) => !copiedIds.includes(id));
  const manifest = {
    scheme,
    sha,
    captureDate: day,
    images: copied.map((f) => ({ id: f.replace(/\.png$/i, ""), file: f, caption: captionById[f.replace(/\.png$/i, "")] || "" })),
    missing,
  };
  fs.writeFileSync(path.join(latestDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

  const stamp = [
    `scheme:      ${scheme}`,
    `git_sha:     ${sha}`,
    `capture_day: ${day}`,
    `image_count: ${copied.length}`,
    `missing:     ${missing.length ? missing.join(", ") : "(none)"}`,
    "",
    "Provenance for this handoff. If git_sha is behind HEAD, latest/ is STALE —",
    "re-run capture + package on a capture-capable host.",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(latestDir, "STAMP.txt"), stamp);

  console.log(`packaged ${copied.length} image(s) -> ${latestDir}`);
  if (missing.length) {
    console.log(`WARNING: ${missing.length} manifest shot(s) have no PNG (listed in manifest.json + STAMP.txt):`);
    for (const id of missing) console.log(`  - ${id}`);
  }
  if (!shotsFile) console.log("note: no --shots given; captions empty in manifest.json");
}

function doZip() {
  const latestDir = arg("--zip");
  const dest = arg("--dest") || path.join(process.env.HOME || ".", "Desktop", "handoffs");
  if (!fs.existsSync(latestDir)) {
    console.error(`latest dir not found: ${latestDir}`);
    process.exit(1);
  }
  // Refuse to ship an empty bundle: a wrong --zip path would otherwise produce a
  // plausibly-named zero-image zip and hand it to a reviewer.
  const pngs = fs.readdirSync(latestDir).filter((f) => /\.png$/i.test(f));
  if (!pngs.length) {
    console.error(`no PNGs in ${latestDir} — run \`package\` first (did you point --zip at the latest/ dir?)`);
    process.exit(1);
  }
  const repoRoot = gitOut(["rev-parse", "--show-toplevel"], latestDir) || process.cwd();
  const sha = gitOut(["rev-parse", "--short", "HEAD"], repoRoot) || "nogit";
  // App label = parent of the design-handoff dir (…/<app>/design-handoff/latest).
  const appLabel = path.basename(path.dirname(path.dirname(path.resolve(latestDir)))) || "app";
  fs.mkdirSync(dest, { recursive: true });
  const zipName = `${appLabel}-handoff-${sha}.zip`;
  const zipPath = path.join(dest, zipName);
  if (fs.existsSync(zipPath)) fs.rmSync(zipPath);
  // `zip` ships with macOS; -j flattens so the archive opens to images directly.
  execFileSync("zip", ["-j", "-r", zipPath, latestDir], { stdio: "inherit" });
  console.log(`bundled -> ${zipPath}`);
}

const mode = process.argv.includes("--zip") ? "zip" : "package";
if (mode === "zip") doZip();
else doPackage();
