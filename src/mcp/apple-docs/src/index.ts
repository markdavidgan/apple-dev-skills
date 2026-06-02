#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fetcher from "./fetch.js";
import { parseCatalog, resolveFramework, nearestFrameworks, type Framework } from "./resolve.js";
import { selectLanguage, searchTree, listTree, type Hit } from "./search.js";
import { distillSymbol, extractAvailability } from "./render.js";

const server = new McpServer({ name: "apple-docs", version: "0.1.0" });

let catalogCache: Framework[] | null = null;
async function catalog(): Promise<Framework[]> {
  if (!catalogCache) catalogCache = parseCatalog(await fetcher.getCatalog());
  return catalogCache;
}

function text(s: string) {
  return { content: [{ type: "text" as const, text: s }] };
}
function err(s: string) {
  return { content: [{ type: "text" as const, text: s }], isError: true };
}

// ─── search_docs ────────────────────────────────────────────────────
server.tool(
  "search_docs",
  "Search Apple's official developer documentation for symbols, classes, and APIs. Auto-resolves the framework from the query; pass `framework` to scope explicitly.",
  {
    query: z.string().describe("What to search for, e.g. 'URLSession' or 'SwiftUI Button'"),
    framework: z
      .string()
      .optional()
      .describe("Optional framework slug to scope the search, e.g. 'foundation', 'swiftui'"),
    limit: z.number().int().min(1).max(50).default(10).describe("Max results"),
  },
  async ({ query, framework, limit }) => {
    try {
      const cat = await catalog();
      const { slugs, matched } = resolveFramework(query, cat, framework);
      const all: Array<Hit & { framework: string }> = [];
      for (const slug of slugs) {
        try {
          const tree = await fetcher.getIndexTree(slug);
          const nodes = selectLanguage(tree, "swift");
          for (const h of searchTree(nodes, query, limit)) all.push({ ...h, framework: slug });
        } catch {
          // Skip a framework that fails to fetch; report the rest.
        }
      }
      const results = all.slice(0, limit);
      return text(
        JSON.stringify(
          {
            searchedFrameworks: slugs,
            resolvedFromQuery: matched,
            count: results.length,
            results,
          },
          null,
          2
        )
      );
    } catch (e) {
      return err(`search_docs failed: ${(e as Error).message}`);
    }
  }
);

// ─── get_symbol ─────────────────────────────────────────────────────
server.tool(
  "get_symbol",
  "Read an Apple documentation symbol by its doc path (from search_docs). Returns compact markdown: title, kind, availability, abstract, declaration, discussion, and topics.",
  {
    path: z
      .string()
      .describe("Doc path, e.g. '/documentation/foundation/urlsession'"),
    language: z.enum(["swift", "occ"]).default("swift").describe("Source language"),
  },
  async ({ path }) => {
    try {
      const json = await fetcher.getRenderJson(path);
      return text(distillSymbol(json));
    } catch (e) {
      if (e instanceof fetcher.NotFoundError) {
        return err(
          `No symbol at '${path}'. Check the path with search_docs — it must look like '/documentation/<framework>/<symbol>'.`
        );
      }
      return err(`get_symbol failed: ${(e as Error).message}`);
    }
  }
);

// ─── list_framework ─────────────────────────────────────────────────
server.tool(
  "list_framework",
  "List the top-level topics and symbols of an Apple framework, for browsing when you don't know an exact name.",
  {
    framework: z.string().describe("Framework slug, e.g. 'swiftui', 'foundation'"),
    depth: z.number().int().min(1).max(3).default(1).describe("Tree depth to list"),
  },
  async ({ framework, depth }) => {
    try {
      const tree = await fetcher.getIndexTree(framework);
      const nodes = selectLanguage(tree, "swift");
      const items = listTree(nodes, depth);
      return text(JSON.stringify({ framework, count: items.length, items }, null, 2));
    } catch (e) {
      if (e instanceof fetcher.NotFoundError) {
        const near = nearestFrameworks(framework, await catalog());
        return err(
          `Unknown framework '${framework}'.${near.length ? ` Did you mean: ${near.join(", ")}?` : ""}`
        );
      }
      return err(`list_framework failed: ${(e as Error).message}`);
    }
  }
);

// ─── check_availability ─────────────────────────────────────────────
server.tool(
  "check_availability",
  "Return only the platform/OS-version availability for an Apple symbol (e.g. 'iOS 17.0+, macOS 14.0+').",
  {
    path: z.string().describe("Doc path, e.g. '/documentation/swiftui/scrollview'"),
  },
  async ({ path }) => {
    try {
      const json = await fetcher.getRenderJson(path);
      const avail = extractAvailability(json);
      const title = json?.metadata?.title ?? path;
      return text(avail ? `${title}: ${avail}` : `${title}: no platform availability listed.`);
    } catch (e) {
      if (e instanceof fetcher.NotFoundError) {
        return err(`No symbol at '${path}'. Verify the path with search_docs.`);
      }
      return err(`check_availability failed: ${(e as Error).message}`);
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
