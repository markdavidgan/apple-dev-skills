#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import {
  walkSkills,
  buildIndex,
  search,
  parseFrontmatter,
  chunkMarkdown,
  type BM25Index,
  type SkillMeta,
  type Chunk,
} from "./indexer.js";
import { readFileSync, existsSync } from "node:fs";

// ─── Skills root ─────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Allow callers to override the skills root, e.g. for testing with fixtures. */
function getSkillsRoot(): string {
  return process.env.SKILL_SEARCH_ROOT ?? join(__dirname, "..", "..", "..", "skills");
}

// ─── Lazy index ───────────────────────────────────────────────────────────────

interface IndexState {
  index: BM25Index;
  skills: SkillMeta[];
}

let indexCache: IndexState | null = null;

function getIndex(): IndexState {
  if (!indexCache) {
    const root = getSkillsRoot();
    const { chunks, skills } = walkSkills(root);
    const index = buildIndex(chunks);
    indexCache = { index, skills };
  }
  return indexCache;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function text(s: string) {
  return { content: [{ type: "text" as const, text: s }] };
}
function err(s: string) {
  return { content: [{ type: "text" as const, text: s }], isError: true };
}

// ─── MCP server ───────────────────────────────────────────────────────────────

const server = new McpServer({ name: "skill-search", version: "0.1.0" });

// ─── search_skills ───────────────────────────────────────────────────────────

server.tool(
  "search_skills",
  "Keyword/BM25 search over all 57 apple-dev skills and their reference docs. Returns top-k chunks ranked by relevance: {skill, file, heading, snippet, score}. Use this to find which skill covers a topic without loading full SKILL.md bodies into context.",
  {
    query: z.string().describe("What to search for, e.g. 'keychain authentication' or 'App Store review rejection'"),
    limit: z.number().int().min(1).max(50).default(8).describe("Max chunks to return"),
  },
  async ({ query, limit }) => {
    try {
      const { index } = getIndex();
      const hits = search(index, query, limit);
      return text(
        JSON.stringify(
          {
            query,
            count: hits.length,
            results: hits.map((h) => ({
              skill: h.skill,
              file: h.file,
              heading: h.heading,
              snippet: h.snippet,
              score: h.score,
            })),
          },
          null,
          2
        )
      );
    } catch (e) {
      return err(`search_skills failed: ${(e as Error).message}`);
    }
  }
);

// ─── list_skills ──────────────────────────────────────────────────────────────

server.tool(
  "list_skills",
  "Return every apple-dev skill name and its description (parsed from SKILL.md frontmatter). Use to browse available skills or find one by description keyword.",
  {},
  async () => {
    try {
      const { skills } = getIndex();
      return text(
        JSON.stringify({ count: skills.length, skills }, null, 2)
      );
    } catch (e) {
      return err(`list_skills failed: ${(e as Error).message}`);
    }
  }
);

// ─── get_skill_section ────────────────────────────────────────────────────────

server.tool(
  "get_skill_section",
  "Return the full text of a skill (its SKILL.md) or, if `heading` is provided, only the section matching that heading. Use after search_skills to load the exact guidance you need.",
  {
    skill: z.string().describe("Skill directory name, e.g. 'app-security' or 'apple-review'"),
    heading: z
      .string()
      .optional()
      .describe("Optional heading text to scope the response, e.g. 'Keychain' or 'Common Rejection Reasons'. Case-insensitive substring match."),
  },
  async ({ skill, heading }) => {
    try {
      const root = getSkillsRoot();
      const skillMdPath = join(root, skill, "SKILL.md");
      if (!existsSync(skillMdPath)) {
        // Suggest close matches
        const { skills } = getIndex();
        const names = skills.map((s) => s.name);
        const close = names.filter(
          (n) => n.includes(skill) || skill.includes(n)
        );
        return err(
          `Skill "${skill}" not found.${close.length ? ` Did you mean: ${close.join(", ")}?` : " Use list_skills() to browse available skills."}`
        );
      }

      const content = readFileSync(skillMdPath, "utf8");

      if (!heading) {
        return text(content);
      }

      // Find matching section(s) by heading substring
      const chunks: Chunk[] = chunkMarkdown(skill, `${skill}/SKILL.md`, content);
      const needle = heading.toLowerCase();
      const matches = chunks.filter((c) =>
        c.heading.toLowerCase().includes(needle)
      );

      if (matches.length === 0) {
        return err(
          `No section matching "${heading}" found in skill "${skill}". ` +
          `Available headings: ${[...new Set(chunks.map((c) => c.heading).filter(Boolean))].join("; ")}`
        );
      }

      return text(
        matches.map((c) => `### ${c.heading}\n\n${c.text}`).join("\n\n---\n\n")
      );
    } catch (e) {
      return err(`get_skill_section failed: ${(e as Error).message}`);
    }
  }
);

// ─── Connect ─────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
