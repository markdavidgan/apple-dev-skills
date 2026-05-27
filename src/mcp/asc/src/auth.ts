import jwt from "jsonwebtoken";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));

let cachedToken: { token: string; expiresAt: number } | null = null;

function findKeyFile(): string {
  const keyId = process.env.ASC_KEY_ID;

  // 1. Explicit env var
  if (process.env.ASC_KEY_PATH) {
    if (!existsSync(process.env.ASC_KEY_PATH)) {
      throw new Error(`ASC_KEY_PATH points to missing file: ${process.env.ASC_KEY_PATH}`);
    }
    return process.env.ASC_KEY_PATH;
  }

  // 2. Look in keys/ directory next to this file (dist/keys or src/keys)
  const localKeysDir = resolve(__dirname, "..", "keys");
  if (existsSync(localKeysDir)) {
    const p8Files = readdirSync(localKeysDir).filter((f) => f.endsWith(".p8"));
    if (p8Files.length === 1) return join(localKeysDir, p8Files[0]);
    if (p8Files.length > 1 && keyId) {
      const match = p8Files.find((f) => f.includes(keyId));
      if (match) return join(localKeysDir, match);
    }
  }

  // 3. Machine-level config: ~/.config/asc/keys/
  const globalKeysDir = join(homedir(), ".config", "asc", "keys");
  if (existsSync(globalKeysDir)) {
    const p8Files = readdirSync(globalKeysDir).filter((f) => f.endsWith(".p8"));
    if (p8Files.length === 1) return join(globalKeysDir, p8Files[0]);
    if (p8Files.length > 1 && keyId) {
      const match = p8Files.find((f) => f.includes(keyId));
      if (match) return join(globalKeysDir, match);
    }
  }

  throw new Error(
    [
      "No .p8 key found. Provide credentials via one of:",
      "  1. Set ASC_KEY_PATH environment variable",
      "  2. Place key in <mcp-server>/keys/AuthKey_<KEY_ID>.p8",
      "  3. Place key in ~/.config/asc/keys/AuthKey_<KEY_ID>.p8",
      "",
      "Get your API key from: https://appstoreconnect.apple.com/access/integrations/api",
    ].join("\n")
  );
}

export function getConfig() {
  const keyPath = findKeyFile();
  const keyId = process.env.ASC_KEY_ID;
  const issuerId = process.env.ASC_ISSUER_ID;

  if (!keyId) {
    const match = keyPath.match(/AuthKey_([A-Z0-9]+)\.p8$/);
    if (match) {
      process.env.ASC_KEY_ID = match[1];
      return { keyPath, keyId: match[1], issuerId: issuerId ?? "" };
    }
    throw new Error(
      "ASC_KEY_ID is required. Set it as an environment variable or in .mcp.json env block."
    );
  }

  if (!issuerId) {
    throw new Error(
      "ASC_ISSUER_ID is required. Find it at: https://appstoreconnect.apple.com/access/integrations/api"
    );
  }

  return { keyPath, keyId, issuerId };
}

export function generateToken(): string {
  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && cachedToken.expiresAt > now + 60) {
    return cachedToken.token;
  }

  const { keyPath, keyId, issuerId } = getConfig();
  const privateKey = readFileSync(keyPath, "utf8");

  const expiresAt = now + 20 * 60;
  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    keyid: keyId,
    issuer: issuerId,
    expiresIn: "20m",
    audience: "appstoreconnect-v1",
  });

  cachedToken = { token, expiresAt };
  return token;
}
