import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";

// TestFlight tester feedback — crash submissions sent by beta testers from the
// TestFlight app. These are DISTINCT from the aggregate `diagnosticSignatures`
// tools (HANGS / LAUNCHES / DISK_WRITES, which are MetricKit roll-ups and never
// contain tester-submitted crashes). A beta tester tapping "report a crash" in
// TestFlight produces a betaFeedbackCrashSubmission carrying a fully
// symbolicated crash log — the single most actionable production crash signal.

interface CrashSubmissionSummary {
  id: string;
  createdDate?: string;
  comment?: string;
  email?: string;
  tester?: string;
  appVersion?: string;
  buildBundleId?: string;
  deviceModel?: string;
  deviceFamily?: string;
  osVersion?: string;
  appPlatform?: string;
  devicePlatform?: string;
  architecture?: string;
  locale?: string;
  timeZone?: string;
  connectionType?: string;
  batteryPercentage?: number;
  appUptimeInMilliseconds?: number;
  buildId?: string;
}

function summarizeSubmission(
  raw: any,
  buildsById: Map<string, any>,
  testersById: Map<string, any>
): CrashSubmissionSummary {
  const a = raw?.attributes ?? {};
  const buildId: string | undefined =
    raw?.relationships?.build?.data?.id ?? undefined;
  const testerId: string | undefined =
    raw?.relationships?.tester?.data?.id ?? undefined;
  const build = buildId ? buildsById.get(buildId) : undefined;
  const tester = testerId ? testersById.get(testerId) : undefined;
  const testerName = tester
    ? [tester.attributes?.firstName, tester.attributes?.lastName]
        .filter(Boolean)
        .join(" ") || undefined
    : undefined;

  return {
    id: raw.id,
    createdDate: a.createdDate,
    comment: a.comment,
    email: a.email ?? tester?.attributes?.email,
    tester: testerName,
    appVersion: build?.attributes?.version,
    buildBundleId: a.buildBundleId,
    deviceModel: a.deviceModel,
    deviceFamily: a.deviceFamily,
    osVersion: a.osVersion,
    appPlatform: a.appPlatform,
    devicePlatform: a.devicePlatform,
    architecture: a.architecture,
    locale: a.locale,
    timeZone: a.timeZone,
    connectionType: a.connectionType,
    batteryPercentage: a.batteryPercentage,
    appUptimeInMilliseconds: a.appUptimeInMilliseconds,
    buildId,
  };
}

export function register(server: McpServer) {
  // ─── List TestFlight Crash Feedback ─────────────────────────────────
  server.tool(
    "asc_list_crash_feedback",
    "List TestFlight beta-tester crash submissions (betaFeedbackCrashSubmissions) for an app or a specific build. Each entry is a crash a tester reported through the TestFlight app, with device/OS metadata, the tester's comment, and a crash-log ID. Use asc_get_crash_feedback_log to fetch the full symbolicated backtrace for any entry. This is the tester-reported crash channel — distinct from asc_list_diagnostic_signatures (aggregate HANGS/LAUNCHES/DISK_WRITES), which never includes these crashes.",
    {
      app_id: z
        .string()
        .optional()
        .describe("App ID (from asc_list_apps). Provide this OR build_id."),
      build_id: z
        .string()
        .optional()
        .describe(
          "Build ID (from asc_list_tf_builds). Scopes to one build. Provide this OR app_id."
        ),
      version: z
        .string()
        .optional()
        .describe(
          "Filter by pre-release version string (e.g. '0.10.0'). Only valid with app_id."
        ),
      os_version: z
        .string()
        .optional()
        .describe("Filter by OS version (e.g. '26.5')."),
      device_model: z
        .string()
        .optional()
        .describe("Filter by device model (e.g. 'iPhone17,1')."),
      limit: z
        .number()
        .int()
        .min(1)
        .max(200)
        .optional()
        .describe("Max submissions to return (default 25, max 200)."),
    },
    async ({ app_id, build_id, version, os_version, device_model, limit }) => {
      if (!app_id && !build_id) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: Provide either app_id or build_id.",
            },
          ],
          isError: true,
        };
      }

      const params: Record<string, string> = {
        limit: String(limit ?? 25),
        sort: "-createdDate",
        include: "build,tester",
        "fields[builds]": "version,uploadedDate,preReleaseVersion",
        "fields[betaTesters]": "firstName,lastName,email",
      };
      if (version) params["filter[build.preReleaseVersion]"] = version;
      if (os_version) params["filter[osVersion]"] = os_version;
      if (device_model) params["filter[deviceModel]"] = device_model;

      const path = build_id
        ? `/builds/${build_id}/betaFeedbackCrashSubmissions`
        : `/apps/${app_id}/betaFeedbackCrashSubmissions`;

      const result = await ascFetch(path, params);

      const buildsById = new Map<string, any>();
      const testersById = new Map<string, any>();
      for (const inc of result.included ?? []) {
        if (inc.type === "builds") buildsById.set(inc.id, inc);
        if (inc.type === "betaTesters") testersById.set(inc.id, inc);
      }

      const submissions: CrashSubmissionSummary[] = (result.data ?? []).map(
        (s: any) => summarizeSubmission(s, buildsById, testersById)
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                scope: build_id ? { buildId: build_id } : { appId: app_id },
                filter: {
                  version: version ?? null,
                  osVersion: os_version ?? null,
                  deviceModel: device_model ?? null,
                },
                total: submissions.length,
                submissions,
                hint:
                  submissions.length > 0
                    ? "Use asc_get_crash_feedback_log with a submission id to fetch the symbolicated crash log."
                    : "No tester crash submissions found for this scope/filter.",
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Get Symbolicated Crash Log for a Submission ────────────────────
  server.tool(
    "asc_get_crash_feedback_log",
    "Fetch the full symbolicated crash log (backtrace) for a TestFlight crash submission. Pass a submission ID from asc_list_crash_feedback. Returns the raw .crash-style log text including Exception Type, Termination Reason, and the symbolicated thread backtraces — the ground truth for root-causing a tester-reported crash.",
    {
      submission_id: z
        .string()
        .describe(
          "betaFeedbackCrashSubmission ID (from asc_list_crash_feedback)"
        ),
      max_chars: z
        .number()
        .int()
        .min(1000)
        .max(200000)
        .optional()
        .describe(
          "Truncate the log to this many characters (default 60000). Raise for very deep backtraces."
        ),
    },
    async ({ submission_id, max_chars }) => {
      const result = await ascFetch(
        `/betaFeedbackCrashSubmissions/${submission_id}/crashLog`
      );
      const logText: string = result?.data?.attributes?.logText ?? "";

      if (!logText) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No crash log text available for submission ${submission_id}. Apple may still be symbolicating it — retry shortly.`,
            },
          ],
        };
      }

      const cap = max_chars ?? 60000;
      const truncated =
        logText.length > cap
          ? logText.slice(0, cap) +
            `\n\n... (truncated, total ${logText.length} chars — raise max_chars to see more)`
          : logText;

      return {
        content: [
          {
            type: "text" as const,
            text: truncated,
          },
        ],
      };
    }
  );
}
