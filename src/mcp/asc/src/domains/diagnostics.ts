import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch, listTestFlightBuilds } from "../api.js";

type DiagnosticType = "DISK_WRITES" | "HANGS" | "LAUNCHES";

interface SignatureSummary {
  id: string;
  diagnosticType?: DiagnosticType | string;
  weight?: number;
  signaturePreview: string;
  insight?: {
    type?: string;
    direction?: string;
    referenceVersions?: Array<{ version?: string; value?: number }>;
  };
}

function summarizeSignature(raw: any): SignatureSummary {
  const a = raw?.attributes ?? {};
  const sig: string = typeof a.signature === "string" ? a.signature : "";
  return {
    id: raw.id,
    diagnosticType: a.diagnosticType,
    weight: a.weight,
    signaturePreview: sig.length > 240 ? sig.slice(0, 240) + "…" : sig,
    insight: a.insight
      ? {
          type: a.insight.insightType,
          direction: a.insight.direction,
          referenceVersions: a.insight.referenceVersions,
        }
      : undefined,
  };
}

export function register(server: McpServer) {
  // ─── List Diagnostic Signatures for a Build ─────────────────────────
  server.tool(
    "asc_list_diagnostic_signatures",
    "List aggregate backtrace signatures (HANGS, LAUNCHES, DISK_WRITES) captured for a TestFlight or App Store build. Each signature is a cluster of crashes/hangs grouped by stack pattern with a `weight` indicating relative frequency. Use this as ground-truth production crash signal before treating an app as ship-ready.",
    {
      build_id: z.string().describe("Build ID (from asc_list_tf_builds / asc_list_builds)"),
      diagnostic_type: z
        .enum(["DISK_WRITES", "HANGS", "LAUNCHES"])
        .optional()
        .describe("Filter to a single diagnostic type. Omit to list all types."),
      limit: z
        .number()
        .int()
        .min(1)
        .max(200)
        .optional()
        .describe("Max signatures to return (default 50, max 200)."),
    },
    async ({ build_id, diagnostic_type, limit }) => {
      const params: Record<string, string> = {
        limit: String(limit ?? 50),
      };
      if (diagnostic_type) {
        params["filter[diagnosticType]"] = diagnostic_type;
      }
      const result = await ascFetch(
        `/builds/${build_id}/diagnosticSignatures`,
        params
      );
      const signatures: SignatureSummary[] = (result.data ?? []).map(
        summarizeSignature
      );
      // Sort heaviest first — agents almost always want the top N.
      signatures.sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));

      const byType: Record<string, number> = {};
      for (const s of signatures) {
        const k = String(s.diagnosticType ?? "UNKNOWN");
        byType[k] = (byType[k] ?? 0) + 1;
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                buildId: build_id,
                filter: diagnostic_type ?? "ALL",
                total: signatures.length,
                byType,
                signatures,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Get Logs for a Diagnostic Signature ────────────────────────────
  server.tool(
    "asc_get_diagnostic_logs",
    "Fetch anonymized backtrace samples for a diagnostic signature. Returns symbolicated callStackTrees plus per-sample metadata (osVersion, deviceType, appVersion, event). Use to root-cause a high-weight signature surfaced by asc_list_diagnostic_signatures.",
    {
      signature_id: z.string().describe("DiagnosticSignature ID (from asc_list_diagnostic_signatures)"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("Max log samples to return (default 10, max 50)."),
      include_full_stacks: z
        .boolean()
        .optional()
        .describe("Include full call stack trees in output (default false — only blame frames + metadata)."),
    },
    async ({ signature_id, limit, include_full_stacks }) => {
      const result = await ascFetch(
        `/diagnosticSignatures/${signature_id}/logs`,
        { limit: String(limit ?? 10) }
      );

      const productData = (result.productData ?? []) as any[];
      const samples = productData.flatMap((p: any) => {
        const insights = (p.diagnosticInsights ?? []).map((i: any) => ({
          category: i.insightsCategory,
          summary: i.insightsString,
          url: i.insightsURL,
        }));
        const logs = (p.diagnosticLogs ?? []).map((log: any) => {
          const meta = log.diagnosticMetaData ?? {};
          const blameFrames: any[] = [];
          const collectBlame = (frames: any[]) => {
            for (const f of frames ?? []) {
              if (f?.isBlameFrame) {
                blameFrames.push({
                  symbol: f.symbolName,
                  binary: f.binaryName,
                  file: f.fileName,
                  line: f.lineNumber,
                  samples: f.sampleCount,
                });
              }
              if (f?.subFrames) collectBlame(f.subFrames);
            }
          };
          for (const tree of log.callStackTree ?? []) {
            for (const stack of tree.callStacks ?? []) {
              collectBlame(stack.callStackRootFrames ?? []);
            }
          }
          return {
            event: meta.event,
            osVersion: meta.osVersion,
            appVersion: meta.appVersion,
            bundleId: meta.bundleId,
            deviceType: meta.deviceType,
            platformArchitecture: meta.platformArchitecture,
            writesCaused: meta.writesCaused,
            blameFrames,
            ...(include_full_stacks ? { callStackTree: log.callStackTree } : {}),
          };
        });
        return [{ signatureId: p.signatureId, insights, logs }];
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                signatureId: signature_id,
                sampleCount: samples.reduce(
                  (n, s) => n + (s.logs?.length ?? 0),
                  0
                ),
                samples,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── List Recent Crashes for an App (aggregated) ────────────────────
  server.tool(
    "asc_list_recent_crashes_for_app",
    "Aggregate diagnostic signatures across recent TestFlight builds for an app. Returns the top N stack signatures, weighted across builds, useful for a release-readiness sweep before submission. Note: aggregation is by signature ID — Apple groups identical stack patterns across builds.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
      build_count: z
        .number()
        .int()
        .min(1)
        .max(20)
        .optional()
        .describe("How many recent builds to scan (default 5, max 20)."),
      diagnostic_type: z
        .enum(["DISK_WRITES", "HANGS", "LAUNCHES"])
        .optional()
        .describe("Filter to a single diagnostic type. Omit to include all."),
      top_n: z
        .number()
        .int()
        .min(1)
        .max(100)
        .optional()
        .describe("Top N signatures to return after aggregation (default 20)."),
    },
    async ({ app_id, build_count, diagnostic_type, top_n }) => {
      const buildsResp = await listTestFlightBuilds({ appId: app_id });
      const builds = ((buildsResp.data ?? []) as any[]).slice(
        0,
        build_count ?? 5
      );

      const aggregate = new Map<
        string,
        {
          id: string;
          diagnosticType?: string;
          weight: number;
          signaturePreview: string;
          buildsSeen: string[];
          weightByBuild: Record<string, number>;
        }
      >();

      const errors: Array<{ buildId: string; error: string }> = [];
      for (const b of builds) {
        const params: Record<string, string> = { limit: "100" };
        if (diagnostic_type) params["filter[diagnosticType]"] = diagnostic_type;
        try {
          const sigs = await ascFetch(
            `/builds/${b.id}/diagnosticSignatures`,
            params
          );
          for (const s of sigs.data ?? []) {
            const summary = summarizeSignature(s);
            const w = summary.weight ?? 0;
            const existing = aggregate.get(s.id);
            if (existing) {
              existing.weight += w;
              existing.buildsSeen.push(b.id);
              existing.weightByBuild[b.id] = w;
            } else {
              aggregate.set(s.id, {
                id: s.id,
                diagnosticType: summary.diagnosticType,
                weight: w,
                signaturePreview: summary.signaturePreview,
                buildsSeen: [b.id],
                weightByBuild: { [b.id]: w },
              });
            }
          }
        } catch (err: any) {
          errors.push({ buildId: b.id, error: String(err?.message ?? err) });
        }
      }

      const sorted = [...aggregate.values()]
        .sort((a, b) => b.weight - a.weight)
        .slice(0, top_n ?? 20);

      const buildIndex = builds.map((b: any) => ({
        id: b.id,
        version: b.attributes?.version,
        uploadedDate: b.attributes?.uploadedDate,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                appId: app_id,
                buildsScanned: buildIndex,
                filter: diagnostic_type ?? "ALL",
                uniqueSignatures: aggregate.size,
                topSignatures: sorted,
                errors,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}
