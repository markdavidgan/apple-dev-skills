import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as api from "../api.js";
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

export function register(server: McpServer) {
  server.tool(
    "asc_audit",
    "Audit ASC drift (builds, testflight, release notes, metadata)",
    {
      app_id: z.string().describe("App Store Connect App ID"),
      repo_build: z.string().optional().describe("Expected build number from repo"),
      repo_version: z.string().optional().describe("Expected version from repo"),
      runbook_path: z.string().optional().describe("Path to launch runbook for doc freshness check"),
    },
    async ({ app_id, repo_build, repo_version, runbook_path }) => {
      const findings: Array<{ severity: string; area: string; summary: string; detail: string }> = [];
      const add = (severity: string, area: string, summary: string, detail: string) =>
        findings.push({ severity, area, summary, detail });
      const BLOCKER = "BLOCKER", WARN = "WARN", INFO = "INFO";

      // A. Version + attached build
      const versions = await api.ascFetch(`/v1/apps/${app_id}/appStoreVersions?limit=5&include=build`);
      const version = versions.data?.[0];
      const attachedBuild = versions.included?.find((i: any) => i.type === "builds")?.attributes?.version ?? null;
      const versionId = version?.id;
      const state = version?.attributes?.appStoreState;

      const builds = await api.ascFetch(`/v1/builds?filter[app]=${app_id}&limit=10&sort=-version&fields[builds]=version,processingState,expired,uploadedDate`);
      const latest = builds.data?.[0]?.attributes ?? null;
      const latestValid = (builds.data ?? []).find((b: any) => b.attributes.processingState === "VALID")?.attributes ?? null;

      if (attachedBuild && latestValid && attachedBuild !== latestValid.version) {
        add(BLOCKER, "build", `Draft attached to ${attachedBuild}, newest VALID is ${latestValid.version}`, "Stale binary risk.");
      } else if (attachedBuild) {
        add(INFO, "build", `Attached build ${attachedBuild} is newest VALID.`, "");
      }
      if (attachedBuild && repo_build && attachedBuild !== repo_build) {
        add(WARN, "build", `Attached ${attachedBuild} != repo ${repo_build}`, "Draft behind.");
      }
      if (repo_version && version && repo_version !== version.attributes.versionString) {
        add(WARN, "version", `Repo ${repo_version} != ASC ${version.attributes.versionString}`, "");
      }

      // B. TestFlight
      const groups = await api.ascFetch(`/v1/apps/${app_id}/betaGroups?limit=10&fields[betaGroups]=name,isInternalGroup`);
      const external = (groups.data ?? []).find((g: any) => !g.attributes.isInternalGroup);
      if (external) {
        const inGroup = await api.ascFetch(`/v1/betaGroups/${external.id}/builds?limit=50&fields[builds]=version`);
        const groupVersions = (inGroup.data ?? []).map((b: any) => Number(b.attributes.version)).sort((a: number, b: number) => b - a);
        const newestAssigned = groupVersions[0] ?? null;

        const detailed = await api.ascFetch(`/v1/builds?filter[app]=${app_id}&limit=60&sort=-version&include=buildBetaDetail&fields[builds]=version,buildBetaDetail&fields[buildBetaDetails]=externalBuildState`);
        const stateById = Object.fromEntries((detailed.included ?? []).map((i: any) => [i.id, i.attributes.externalBuildState]));
        const rows = (detailed.data ?? []).map((b: any) => ({
          v: Number(b.attributes.version),
          s: stateById[b.relationships?.buildBetaDetail?.data?.id] ?? null,
        }));
        const AVAILABLE = new Set(["BETA_APPROVED", "IN_BETA_TESTING"]);
        const distributed = rows.filter((r: any) => AVAILABLE.has(r.s)).map((r: any) => r.v).sort((a: number, b: number) => b - a)[0] ?? null;

        if (newestAssigned && distributed && newestAssigned !== distributed) {
          add(BLOCKER, "testflight", `Testers on ${distributed}, but ${newestAssigned} assigned and not distributed.`, "");
        } else if (distributed) {
          add(INFO, "testflight", `Testers on build ${distributed}.`, "");
        }
      }

      // C. Release note staleness
      const recent = (builds.data ?? []).slice(0, 6);
      const noteHashes = [];
      for (const b of recent) {
        const loc = await api.ascFetch(`/v1/builds/${b.id}/betaBuildLocalizations?fields[betaBuildLocalizations]=whatsNew,locale`);
        const text = loc.data?.[0]?.attributes?.whatsNew ?? "";
        noteHashes.push({
          version: b.attributes.version,
          hash: crypto.createHash("md5").update(text).digest("hex").substring(0, 8),
          empty: !text.trim(),
        });
      }
      const uniqueHashes = new Set(noteHashes.filter(n => !n.empty).map(n => n.hash));
      if (noteHashes.length >= 3 && uniqueHashes.size === 1) {
        add(WARN, "release-notes", `What to Test identical across ${noteHashes.length} builds.`, "");
      }

      // Doc freshness
      if (runbook_path) {
        try {
          const runbook = fs.readFileSync(runbook_path, "utf8");
          const claimed = runbook.match(/LIVE READ (\d{4}-\d{2}-\d{2})/)?.[1];
          if (claimed) {
            const ageDays = Math.floor((Date.now() - new Date(claimed).getTime()) / 86400000);
            if (ageDays > 3) add(WARN, "docs", `Runbook read is ${ageDays} days old.`, "");
          }
        } catch {}
      }

      return {
        content: [{ type: "text", text: JSON.stringify({ appId: app_id, attachedBuild, latestBuild: latest?.version ?? null, findings }, null, 2) }]
      };
    }
  );
}
