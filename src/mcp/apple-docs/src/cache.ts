// JSON-file cache under $XDG_CACHE_HOME/apple-docs-mcp (fallback ~/.cache, then
// os.tmpdir). Ships no data — everything here is written at runtime. Serves
// stale entries when a refetch fails, so transient network errors degrade
// gracefully rather than hard-fail.

import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as crypto from "crypto";

function cacheRoot(): string {
  const base =
    process.env.XDG_CACHE_HOME ||
    (os.homedir() ? path.join(os.homedir(), ".cache") : os.tmpdir());
  return path.join(base, "apple-docs-mcp");
}

interface Entry<T> {
  storedAt: number; // epoch ms
  value: T;
}

function fileFor(key: string): string {
  const hash = crypto.createHash("sha1").update(key).digest("hex");
  return path.join(cacheRoot(), `${hash}.json`);
}

/** Read a cached value. Returns the value and whether it is within `ttlMs`. */
export function read<T>(key: string): { value: T; ageMs: number } | null {
  try {
    const raw = fs.readFileSync(fileFor(key), "utf8");
    const entry = JSON.parse(raw) as Entry<T>;
    return { value: entry.value, ageMs: Date.now() - entry.storedAt };
  } catch {
    return null;
  }
}

export function write<T>(key: string, value: T): void {
  try {
    fs.mkdirSync(cacheRoot(), { recursive: true });
    const entry: Entry<T> = { storedAt: Date.now(), value };
    fs.writeFileSync(fileFor(key), JSON.stringify(entry), "utf8");
  } catch {
    // Cache is best-effort; a write failure must never break a tool call.
  }
}
