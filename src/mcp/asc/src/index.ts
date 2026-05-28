#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as api from "./api.js";
import { register as registerSigning } from "./domains/signing.js";
import { register as registerAppStore } from "./domains/appstore.js";
import { register as registerTestFlight } from "./domains/testflight.js";
import { register as registerScreenshots } from "./domains/screenshots.js";
import { register as registerIAP } from "./domains/iap.js";
import { register as registerMisc } from "./domains/misc.js";
import { register as registerDiagnostics } from "./domains/diagnostics.js";
import { execSync, spawnSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const server = new McpServer({
  name: "app-store-connect",
  version: "2.0.0",
});

// ─── List CI Products ───────────────────────────────────────────────

server.tool(
  "asc_list_products",
  "List all CI products (apps) configured in App Store Connect",
  {},
  async () => {
    const result = await api.listProducts();
    const products = (result.data ?? []).map((p: any) => ({
      id: p.id,
      name: p.attributes?.name,
      productType: p.attributes?.productType,
      createdDate: p.attributes?.createdDate,
    }));
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(products, null, 2),
        },
      ],
    };
  }
);

// ─── List Workflows ─────────────────────────────────────────────────

server.tool(
  "asc_list_workflows",
  "List CI workflows for a product",
  {
    product_id: z
      .string()
      .describe("CI Product ID (from asc_list_products)"),
  },
  async ({ product_id }) => {
    const result = await api.listWorkflows(product_id);
    const workflows = (result.data ?? []).map((w: any) => ({
      id: w.id,
      name: w.attributes?.name,
      description: w.attributes?.description,
      isEnabled: w.attributes?.isEnabled,
      lastModifiedDate: w.attributes?.lastModifiedDate,
      clean: w.attributes?.clean,
    }));
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(workflows, null, 2),
        },
      ],
    };
  }
);

// ─── Get Workflow ──────────────────────────────────────────────────

server.tool(
  "asc_get_workflow",
  "Get detailed information about a specific workflow including its actions, start conditions, and environment variables.",
  {
    workflow_id: z.string().describe("Workflow ID"),
  },
  async ({ workflow_id }) => {
    const result = await api.getWorkflow(workflow_id);
    const w = result.data;
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              id: w.id,
              name: w.attributes?.name,
              description: w.attributes?.description,
              isEnabled: w.attributes?.isEnabled,
              clean: w.attributes?.clean,
              containerFilePath: w.attributes?.containerFilePath,
              lastModifiedDate: w.attributes?.lastModifiedDate,
              branchStartCondition: w.attributes?.branchStartCondition,
              tagStartCondition: w.attributes?.tagStartCondition,
              manualBranchStartCondition:
                w.attributes?.manualBranchStartCondition,
              actions: w.attributes?.actions,
              environment: w.attributes?.environment,
              relationships: w.relationships,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ─── Create Workflow ──────────────────────────────────────────────────

server.tool(
  "asc_create_workflow",
  "Create a new CI workflow for a product. Requires product ID, repository ID, name, and at least one action (e.g. ARCHIVE). Use asc_list_products and asc_get_workflow on existing workflows to find repository IDs.",
  {
    product_id: z
      .string()
      .describe("CI Product ID (from asc_list_products)"),
    repository_id: z
      .string()
      .describe(
        "SCM Repository ID (find via asc_get_workflow on an existing workflow — look in relationships.repository.data.id)"
      ),
    name: z.string().describe("Workflow name (e.g. 'TestFlight Alpha')"),
    description: z
      .string()
      .optional()
      .describe("Workflow description"),
    scheme: z
      .string()
      .describe(
        "Xcode scheme to build (e.g. 'MyApp-iOS', 'MyAppWatch-iOS')"
      ),
    action_type: z
      .enum(["ARCHIVE", "BUILD", "TEST", "ANALYZE"])
      .optional()
      .default("ARCHIVE")
      .describe("Action type (default: ARCHIVE)"),
    is_enabled: z
      .boolean()
      .optional()
      .default(true)
      .describe("Enable the workflow (default: true)"),
    clean: z
      .boolean()
      .optional()
      .default(false)
      .describe("Clean build (default: false)"),
    branch_name: z
      .string()
      .optional()
      .describe(
        "Branch to trigger on (e.g. 'main'). Omit for manual-only workflow."
      ),
    manual_branch: z
      .string()
      .optional()
      .describe(
        "Branch for manual triggers (e.g. 'main'). Set this for on-demand workflows."
      ),
    container_file_path: z
      .string()
      .optional()
      .describe(
        "Path to the Xcode project/workspace relative to repo root (e.g. 'apps/ios/MyApp.xcodeproj')"
      ),
  },
  async ({
    product_id,
    repository_id,
    name,
    description,
    scheme,
    action_type,
    is_enabled,
    clean,
    branch_name,
    manual_branch,
    container_file_path,
  }) => {
    const options: any = {
      productId: product_id,
      repositoryId: repository_id,
      name,
      description,
      isEnabled: is_enabled,
      clean,
      containerFilePath: container_file_path,
      actions: [
        {
          name: `${action_type === "ARCHIVE" ? "Archive" : action_type === "BUILD" ? "Build" : action_type === "TEST" ? "Test" : "Analyze"} - iOS`,
          actionType: action_type,
          scheme,
          platform: "IOS",
          destination: "ANY_IOS_DEVICE",
        },
      ],
    };

    if (branch_name) {
      options.branchStartCondition = {
        source: { branchName: branch_name, isAllMatch: false },
        autoCancel: true,
      };
    }

    if (manual_branch) {
      options.manualBranchStartCondition = {
        source: { branchName: manual_branch, isAllMatch: false },
      };
    }

    const result = await api.createWorkflow(options);
    const w = result.data;
    return {
      content: [
        {
          type: "text" as const,
          text: [
            `✅ Created workflow`,
            `ID: ${w.id}`,
            `Name: ${w.attributes?.name}`,
            `Enabled: ${w.attributes?.isEnabled}`,
            `Actions: ${(w.attributes?.actions ?? []).map((a: any) => a.name).join(", ")}`,
            branch_name
              ? `Auto-trigger: pushes to '${branch_name}'`
              : "Auto-trigger: none (manual only)",
            manual_branch
              ? `Manual trigger branch: '${manual_branch}'`
              : "",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
    };
  }
);

// ─── Update Workflow ──────────────────────────────────────────────────

server.tool(
  "asc_update_workflow",
  "Update an existing CI workflow. Can enable/disable, rename, change start conditions, or modify actions. Only provided fields are changed.",
  {
    workflow_id: z.string().describe("Workflow ID to update"),
    name: z.string().optional().describe("New workflow name"),
    description: z.string().optional().describe("New description"),
    is_enabled: z
      .boolean()
      .optional()
      .describe("Enable (true) or disable (false) the workflow"),
    clean: z
      .boolean()
      .optional()
      .describe("Enable clean builds"),
    branch_name: z
      .string()
      .optional()
      .describe(
        "Set auto-trigger branch (e.g. 'main'). Use 'none' to remove auto-trigger."
      ),
    manual_branch: z
      .string()
      .optional()
      .describe(
        "Set manual trigger branch. Use 'none' to remove."
      ),
  },
  async ({
    workflow_id,
    name,
    description,
    is_enabled,
    clean,
    branch_name,
    manual_branch,
  }) => {
    const attrs: any = {};
    if (name !== undefined) attrs.name = name;
    if (description !== undefined) attrs.description = description;
    if (is_enabled !== undefined) attrs.isEnabled = is_enabled;
    if (clean !== undefined) attrs.clean = clean;

    if (branch_name === "none") {
      attrs.branchStartCondition = null;
    } else if (branch_name) {
      attrs.branchStartCondition = {
        source: { branchName: branch_name, isAllMatch: false },
        autoCancel: true,
      };
    }

    if (manual_branch === "none") {
      attrs.manualBranchStartCondition = null;
    } else if (manual_branch) {
      attrs.manualBranchStartCondition = {
        source: { branchName: manual_branch, isAllMatch: false },
      };
    }

    const result = await api.updateWorkflow(workflow_id, attrs);
    const w = result.data;
    return {
      content: [
        {
          type: "text" as const,
          text: [
            `✅ Updated workflow`,
            `ID: ${w.id}`,
            `Name: ${w.attributes?.name}`,
            `Enabled: ${w.attributes?.isEnabled}`,
            `Clean: ${w.attributes?.clean}`,
          ].join("\n"),
        },
      ],
    };
  }
);

// ─── Delete Workflow ──────────────────────────────────────────────────

server.tool(
  "asc_delete_workflow",
  "Delete a CI workflow permanently. Use with caution — this cannot be undone.",
  {
    workflow_id: z.string().describe("Workflow ID to delete"),
  },
  async ({ workflow_id }) => {
    await api.deleteWorkflow(workflow_id);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Deleted workflow ${workflow_id}`,
        },
      ],
    };
  }
);

// ─── List Build Runs ────────────────────────────────────────────────

server.tool(
  "asc_list_builds",
  "List recent CI build runs. Filter by workflow or product. Returns status, start/finish times, and source info.",
  {
    workflow_id: z
      .string()
      .optional()
      .describe("Filter by workflow ID (preferred)"),
    product_id: z
      .string()
      .optional()
      .describe("Filter by product ID (alternative to workflow_id)"),
    limit: z
      .number()
      .optional()
      .default(10)
      .describe("Max results (default 10)"),
  },
  async ({ workflow_id, product_id, limit }) => {
    if (!workflow_id && !product_id) {
      return {
        content: [
          {
            type: "text" as const,
            text: "Error: Provide either workflow_id or product_id",
          },
        ],
        isError: true,
      };
    }

    const result = await api.listBuildRuns({
      workflowId: workflow_id,
      productId: product_id,
      limit,
    });

    const builds = (result.data ?? []).map((b: any) => ({
      id: b.id,
      number: b.attributes?.number,
      status: b.attributes?.executionProgress,
      completionStatus: b.attributes?.completionStatus,
      startedDate: b.attributes?.startedDate,
      finishedDate: b.attributes?.finishedDate,
      sourceCommit: b.attributes?.sourceCommit,
      sourceBranchOrTag: b.attributes?.sourceBranchOrTag,
      isPullRequestBuild: b.attributes?.isPullRequestBuild,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(builds, null, 2),
        },
      ],
    };
  }
);

// ─── Get Build Run Details ──────────────────────────────────────────

server.tool(
  "asc_get_build",
  "Get detailed information about a specific CI build run, including its actions and status",
  {
    build_run_id: z.string().describe("Build Run ID"),
  },
  async ({ build_run_id }) => {
    const [buildRun, actions] = await Promise.all([
      api.getBuildRun(build_run_id),
      api.listBuildActions(build_run_id),
    ]);

    const detail = {
      id: buildRun.data?.id,
      attributes: buildRun.data?.attributes,
      actions: (actions.data ?? []).map((a: any) => ({
        id: a.id,
        name: a.attributes?.name,
        actionType: a.attributes?.actionType,
        executionProgress: a.attributes?.executionProgress,
        completionStatus: a.attributes?.completionStatus,
        startedDate: a.attributes?.startedDate,
        finishedDate: a.attributes?.finishedDate,
        issueCounts: a.attributes?.issueCounts,
      })),
    };

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(detail, null, 2),
        },
      ],
    };
  }
);

// ─── Get Build Logs ─────────────────────────────────────────────────

server.tool(
  "asc_get_build_logs",
  "Get build logs/artifacts for a specific build action. First use asc_get_build to find action IDs, then pass one here.",
  {
    action_id: z
      .string()
      .describe("Build Action ID (from asc_get_build actions)"),
  },
  async ({ action_id }) => {
    const artifacts = await api.listArtifacts(action_id);

    const artifactList = (artifacts.data ?? []).map((a: any) => ({
      id: a.id,
      fileName: a.attributes?.fileName,
      fileSize: a.attributes?.fileSize,
    }));

    // Try to download text-based artifacts (logs)
    const logs: { fileName: string; content: string }[] = [];
    for (const artifact of artifactList) {
      if (
        artifact.fileName?.endsWith(".txt") ||
        artifact.fileName?.endsWith(".log") ||
        artifact.fileName?.includes("log")
      ) {
        try {
          const content = await api.downloadArtifact(artifact.id);
          logs.push({ fileName: artifact.fileName, content });
        } catch {
          logs.push({
            fileName: artifact.fileName,
            content: "(failed to download)",
          });
        }
      }
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              artifacts: artifactList,
              logs:
                logs.length > 0
                  ? logs
                  : "No text logs found. Use artifact IDs to download specific files.",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ─── Download Artifact ──────────────────────────────────────────────

server.tool(
  "asc_download_artifact",
  "Download a specific build artifact by ID. Returns the text content.",
  {
    artifact_id: z.string().describe("Artifact ID"),
  },
  async ({ artifact_id }) => {
    const content = await api.downloadArtifact(artifact_id);

    // Truncate very large content
    const maxLen = 50_000;
    const truncated =
      content.length > maxLen
        ? content.slice(0, maxLen) + "\n\n... (truncated, total " + content.length + " chars)"
        : content;

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

// ─── Get Build Issues ───────────────────────────────────────────────

server.tool(
  "asc_get_issues",
  "Get all issues (errors, warnings, test failures) from a build run. This is the fastest way to understand why a build failed.",
  {
    build_run_id: z.string().describe("Build Run ID"),
  },
  async ({ build_run_id }) => {
    const issues = await api.listIssues(build_run_id);

    const formatted = (issues.data ?? []).map((i: any) => ({
      category: i.attributes?.category,
      message: i.attributes?.message,
      fileSource: i.attributes?.fileSource,
      actionName: i._actionName,
      actionType: i._actionType,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text:
            formatted.length > 0
              ? JSON.stringify(formatted, null, 2)
              : "No issues found for this build run.",
        },
      ],
    };
  }
);

// ─── Get Test Results ───────────────────────────────────────────────

server.tool(
  "asc_get_test_results",
  "Get test results from a build run, including pass/fail status for each test",
  {
    build_run_id: z.string().describe("Build Run ID"),
  },
  async ({ build_run_id }) => {
    const results = await api.listTestResults(build_run_id);

    const formatted = (results.data ?? []).map((r: any) => ({
      className: r.attributes?.className,
      name: r.attributes?.name,
      status: r.attributes?.status,
      duration: r.attributes?.duration,
      message: r.attributes?.message,
      actionName: r._actionName,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text:
            formatted.length > 0
              ? JSON.stringify(formatted, null, 2)
              : "No test results found for this build run.",
        },
      ],
    };
  }
);

// ─── Trigger Build ──────────────────────────────────────────────────

server.tool(
  "asc_trigger_build",
  "Manually trigger a new CI build run for a workflow. Use asc_list_workflows to get the workflow ID. Useful for re-running a build without pushing a commit.",
  {
    workflow_id: z.string().describe("Workflow ID (from asc_list_workflows)"),
  },
  async ({ workflow_id }) => {
    const result = await api.triggerBuildRun(workflow_id);
    const build = result.data;
    return {
      content: [
        {
          type: "text" as const,
          text: [
            `✅ Triggered build run`,
            `Build Run ID: ${build?.id}`,
            `Number: ${build?.attributes?.number}`,
            `Status: ${build?.attributes?.executionProgress}`,
          ].join("\n"),
        },
      ],
    };
  }
);

// ─── Wait For Build ──────────────────────────────────────────────────
//
// Blocks until the most recent build for a product/workflow is COMPLETE.
// Polls every 30 seconds — ideal for the automated ship loop.

server.tool(
  "asc_wait_for_build",
  "Wait (poll) until the most recent CI build for a product completes. Returns SUCCEEDED or FAILED with issues. Essential for the automated ship loop — call this after pushing a commit.",
  {
    product_name: z
      .string()
      .describe(
        "Product name to wait on: 'focus', 'cadence', or a specific product ID from asc_list_products"
      ),
    timeout_minutes: z
      .number()
      .optional()
      .default(25)
      .describe("How long to wait before giving up (default: 25 minutes)"),
    build_run_id: z
      .string()
      .optional()
      .describe(
        "Specific build run ID to wait on. If omitted, waits on the most recently started build for the product."
      ),
  },
  async ({ product_name, timeout_minutes, build_run_id }) => {
    // Resolve product ID from name if needed
    let targetBuildRunId = build_run_id;

    if (!targetBuildRunId) {
      const products = await api.listProducts();
      const product = (products.data ?? []).find(
        (p: any) =>
          p.id === product_name ||
          p.attributes?.name?.toLowerCase().includes(product_name.toLowerCase())
      );
      if (!product) {
        return {
          content: [
            {
              type: "text" as const,
              text: `❌ No product found matching '${product_name}'. Use asc_list_products to see available products.`,
            },
          ],
        };
      }

      const builds = await api.listBuildRuns({ productId: product.id, limit: 1 });
      targetBuildRunId = builds.data?.[0]?.id;

      if (!targetBuildRunId) {
        return {
          content: [
            {
              type: "text" as const,
              text: `❌ No build runs found for product '${product_name}'.`,
            },
          ],
        };
      }
    }

    const pollLog: string[] = [
      `⏳ Waiting for build run ${targetBuildRunId} (timeout: ${timeout_minutes}m)...`,
    ];

    const { buildRun, issues } = await api.waitForBuildRun({
      buildRunId: targetBuildRunId,
      timeoutMinutes: timeout_minutes,
      intervalSeconds: 30,
      onPoll: (elapsed, status) => {
        pollLog.push(`  [${elapsed}s] ${status}`);
      },
    });

    const completionStatus: string =
      buildRun?.attributes?.completionStatus ?? "UNKNOWN";
    const buildNumber: number = buildRun?.attributes?.number;
    const succeeded = completionStatus === "SUCCEEDED";

    const formattedIssues =
      issues.length > 0
        ? issues
            .filter((i: any) => i.attributes?.category !== "DEPRECATION")
            .map((i: any) => ({
              category: i.attributes?.category,
              message: i.attributes?.message,
              file: i.attributes?.fileSource?.path
                ?.split("/repository/")
                .pop(),
              line: i.attributes?.fileSource?.lineNumber,
              action: i._actionName,
            }))
        : [];

    const summary = [
      succeeded
        ? `✅ Build #${buildNumber} SUCCEEDED`
        : `❌ Build #${buildNumber} FAILED (${completionStatus})`,
      `Build Run ID: ${targetBuildRunId}`,
      "",
      ...pollLog,
    ];

    if (!succeeded && formattedIssues.length > 0) {
      summary.push("", "Issues:", JSON.stringify(formattedIssues, null, 2));
    }

    return {
      content: [
        {
          type: "text" as const,
          text: summary.join("\n"),
        },
      ],
    };
  }
);

// ─── Quick Status (convenience tool) ────────────────────────────────

server.tool(
  "asc_status",
  "Quick overview: lists all products and their most recent build status. Great starting point.",
  {},
  async () => {
    const products = await api.listProducts();
    const summary: any[] = [];

    for (const product of products.data ?? []) {
      const productInfo: any = {
        name: product.attributes?.name,
        id: product.id,
        recentBuilds: [],
      };

      try {
        const builds = await api.listBuildRuns({
          productId: product.id,
          limit: 3,
        });

        productInfo.recentBuilds = (builds.data ?? []).map((b: any) => ({
          id: b.id,
          number: b.attributes?.number,
          status: b.attributes?.executionProgress,
          completionStatus: b.attributes?.completionStatus,
          branch: b.attributes?.sourceBranchOrTag?.name,
          finishedDate: b.attributes?.finishedDate,
        }));
      } catch {
        productInfo.recentBuilds = "(unable to fetch)";
      }

      summary.push(productInfo);
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(summary, null, 2),
        },
      ],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════
// Developer Portal Tools
// ═══════════════════════════════════════════════════════════════════

// ─── List Bundle IDs ────────────────────────────────────────────

server.tool(
  "asc_list_bundle_ids",
  "List all registered bundle IDs in the Apple Developer Portal. Optionally filter by identifier substring (e.g. 'cadence').",
  {
    filter: z
      .string()
      .optional()
      .describe("Filter bundle IDs by identifier (e.g. 'cadence', 'focus')"),
  },
  async ({ filter }) => {
    const result = await api.listBundleIds();
    let bundleIds = (result.data ?? []).map((b: any) => ({
      id: b.id,
      identifier: b.attributes?.identifier,
      name: b.attributes?.name,
      platform: b.attributes?.platform,
    }));

    if (filter) {
      bundleIds = bundleIds.filter((b: any) =>
        b.identifier?.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(bundleIds, null, 2),
        },
      ],
    };
  }
);

// ─── Get Capabilities ───────────────────────────────────────────

server.tool(
  "asc_get_capabilities",
  "Get all capabilities enabled for a bundle ID. Use asc_list_bundle_ids first to get the internal ID.",
  {
    bundle_id_id: z
      .string()
      .describe("Internal bundle ID resource ID (from asc_list_bundle_ids, NOT the identifier string)"),
  },
  async ({ bundle_id_id }) => {
    const caps = await api.listCapabilities(bundle_id_id);
    const formatted = (caps.data ?? []).map((c: any) => ({
      id: c.id,
      capabilityType: c.attributes?.capabilityType,
      settings: c.attributes?.settings,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text:
            formatted.length > 0
              ? JSON.stringify(formatted, null, 2)
              : "No capabilities enabled for this bundle ID.",
        },
      ],
    };
  }
);

// ─── Add Capability ─────────────────────────────────────────────

server.tool(
  "asc_add_capability",
  "Add a capability to a bundle ID (e.g. APP_GROUPS, ICLOUD, HEALTHKIT, PUSH_NOTIFICATIONS, IN_APP_PURCHASE).",
  {
    bundle_id_id: z
      .string()
      .describe("Internal bundle ID resource ID"),
    capability_type: z
      .string()
      .describe("Capability type (e.g. APP_GROUPS, ICLOUD, HEALTHKIT, PUSH_NOTIFICATIONS, IN_APP_PURCHASE, ACCESS_WIFI_INFORMATION)"),
  },
  async ({ bundle_id_id, capability_type }) => {
    const result = await api.addCapability(bundle_id_id, capability_type);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Added ${capability_type} to bundle ID.\nCapability ID: ${result.data?.id}`,
        },
      ],
    };
  }
);

// ─── Remove Capability ──────────────────────────────────────────

server.tool(
  "asc_remove_capability",
  "Remove a capability from a bundle ID. Use asc_get_capabilities to find the capability ID.",
  {
    capability_id: z
      .string()
      .describe("Capability resource ID (from asc_get_capabilities)"),
  },
  async ({ capability_id }) => {
    await api.removeCapability(capability_id);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Removed capability ${capability_id}`,
        },
      ],
    };
  }
);

// ─── List Certificates ──────────────────────────────────────────

server.tool(
  "asc_list_certificates",
  "List all signing certificates in the Apple Developer account. Shows type, name, and expiration.",
  {},
  async () => {
    const result = await api.listCertificates();
    const certs = (result.data ?? []).map((c: any) => ({
      id: c.id,
      name: c.attributes?.displayName ?? c.attributes?.name,
      type: c.attributes?.certificateType,
      expirationDate: c.attributes?.expirationDate,
      platform: c.attributes?.platform,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text:
            certs.length > 0
              ? JSON.stringify(certs, null, 2)
              : "No certificates found.",
        },
      ],
    };
  }
);

// ─── List Provisioning Profiles ─────────────────────────────────

server.tool(
  "asc_list_profiles",
  "List provisioning profiles. Optionally filter by state (ACTIVE, INVALID) or type (IOS_APP_STORE, IOS_APP_DEVELOPMENT, IOS_APP_ADHOC).",
  {
    state: z
      .string()
      .optional()
      .describe("Filter by profile state: ACTIVE, INVALID"),
    type: z
      .string()
      .optional()
      .describe("Filter by profile type: IOS_APP_STORE, IOS_APP_DEVELOPMENT, IOS_APP_ADHOC"),
  },
  async ({ state, type }) => {
    const result = await api.listProfiles({
      profileState: state,
      profileType: type,
    });
    const profiles = (result.data ?? []).map((p: any) => ({
      id: p.id,
      name: p.attributes?.name,
      profileType: p.attributes?.profileType,
      profileState: p.attributes?.profileState,
      expirationDate: p.attributes?.expirationDate,
      platform: p.attributes?.platform,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text:
            profiles.length > 0
              ? JSON.stringify(profiles, null, 2)
              : "No provisioning profiles found matching the filter.",
        },
      ],
    };
  }
);

// ─── Signing Health Check ───────────────────────────────────────

server.tool(
  "asc_check_signing",
  "Compare expected capabilities against what is registered in the Developer Portal. Pass bundle identifiers and their expected capabilities to detect mismatches. Also checks certificates and profiles.",
  {
    checks: z
      .array(
        z.object({
          identifier: z
            .string()
            .describe("Bundle identifier (e.g. com.example.app)"),
          expected_capabilities: z
            .array(z.string())
            .describe("Expected capability types (e.g. ['APP_GROUPS', 'ICLOUD'])"),
        })
      )
      .describe("Array of bundle IDs and their expected capabilities"),
  },
  async ({ checks }) => {
    // Fetch all bundle IDs
    const allBundleIds = await api.listBundleIds();
    const bundleIdMap = new Map<string, any>();
    for (const b of allBundleIds.data ?? []) {
      bundleIdMap.set(b.attributes?.identifier, b);
    }

    const report: any[] = [];

    for (const check of checks) {
      const bundleId = bundleIdMap.get(check.identifier);
      if (!bundleId) {
        report.push({
          identifier: check.identifier,
          status: "❌ NOT REGISTERED",
          message: "Bundle ID not found in Developer Portal",
        });
        continue;
      }

      // Get capabilities
      const caps = await api.listCapabilities(bundleId.id);
      const portalCaps = (caps.data ?? []).map(
        (c: any) => c.attributes?.capabilityType
      );

      const missing = check.expected_capabilities.filter(
        (c) => !portalCaps.includes(c)
      );
      const extra = portalCaps.filter(
        (c: string) =>
          !check.expected_capabilities.includes(c) &&
          !["IN_APP_PURCHASE", "PUSH_NOTIFICATIONS"].includes(c)
      );

      report.push({
        identifier: check.identifier,
        portalId: bundleId.id,
        status: missing.length === 0 ? "✅ OK" : "❌ MISMATCH",
        portalCapabilities: portalCaps.sort(),
        expectedCapabilities: check.expected_capabilities.sort(),
        missing: missing.length > 0 ? missing : undefined,
        extra: extra.length > 0 ? extra : undefined,
      });
    }

    // Also check certificates
    const certs = await api.listCertificates();
    const certSummary = (certs.data ?? []).map((c: any) => ({
      name: c.attributes?.displayName ?? c.attributes?.name,
      type: c.attributes?.certificateType,
      expirationDate: c.attributes?.expirationDate,
    }));

    const hasDistribution = certSummary.some(
      (c: any) =>
        c.type === "DISTRIBUTION" ||
        c.type === "IOS_DISTRIBUTION" ||
        c.type === "APPLE_DISTRIBUTION"
    );

    // Check profiles
    const profiles = await api.listProfiles();
    const profileSummary = (profiles.data ?? [])
      .filter((p: any) => {
        const name = (p.attributes?.name ?? "").toLowerCase();
        return checks.some((c) =>
          name.includes(c.identifier.split(".").pop()!)
        );
      })
      .map((p: any) => ({
        name: p.attributes?.name,
        type: p.attributes?.profileType,
        state: p.attributes?.profileState,
        expires: p.attributes?.expirationDate,
      }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              capabilityChecks: report,
              certificates: {
                hasDistributionCert: hasDistribution,
                all: certSummary,
              },
              provisioningProfiles:
                profileSummary.length > 0
                  ? profileSummary
                  : "No matching provisioning profiles found (Xcode Cloud may manage these automatically)",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ─── Create Certificate ─────────────────────────────────────────
//
// Generates a private key + CSR via OpenSSL, submits the CSR to
// Apple, and installs the resulting certificate in the login keychain.

server.tool(
  "asc_create_certificate",
  "Create a signing certificate in the Apple Developer Portal. Generates a private key and CSR locally via OpenSSL, submits to Apple, then installs the certificate in your login keychain. Use certificate_type DISTRIBUTION for App Store / Xcode Cloud.",
  {
    certificate_type: z
      .string()
      .default("DISTRIBUTION")
      .describe(
        "Certificate type: DISTRIBUTION (App Store / Xcode Cloud), IOS_DEVELOPMENT, MAC_APP_DISTRIBUTION, MAC_INSTALLER_DISTRIBUTION"
      ),
    common_name: z
      .string()
      .optional()
      .describe(
        "Common name for the certificate (e.g. 'iPhone Distribution: Mark Gan'). Defaults to a sensible value based on type."
      ),
    install_in_keychain: z
      .boolean()
      .optional()
      .default(true)
      .describe(
        "Install the certificate and private key into the login keychain (default: true). Required for Xcode to use it."
      ),
  },
  async ({ certificate_type, common_name, install_in_keychain }) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "asc-cert-"));
    const keyPath = path.join(tmpDir, "private.key");
    const csrPath = path.join(tmpDir, "request.csr");
    const certPath = path.join(tmpDir, "certificate.cer");

    try {
      // Determine a sensible CN if not provided
      const cn =
        common_name ??
        (certificate_type === "IOS_DEVELOPMENT"
          ? "iPhone Developer"
          : "iPhone Distribution");

      // Generate 2048-bit RSA private key
      spawnSync("openssl", ["genrsa", "-out", keyPath, "2048"], {
        stdio: "pipe",
      });

      // Generate CSR
      spawnSync(
        "openssl",
        [
          "req",
          "-new",
          "-key",
          keyPath,
          "-out",
          csrPath,
          "-subj",
          `/CN=${cn}/O=Apple/C=US`,
        ],
        { stdio: "pipe" }
      );

      if (!fs.existsSync(csrPath)) {
        throw new Error(
          "Failed to generate CSR — is OpenSSL installed? (brew install openssl)"
        );
      }

      // Read CSR PEM content
      const csrPem = fs.readFileSync(csrPath, "utf8");

      // Submit CSR to Apple
      const result = await api.createCertificate(certificate_type, csrPem);
      const certData = result.data;
      const certId = certData?.id;
      const certContent = certData?.attributes?.certificateContent; // base64 DER
      const expirationDate = certData?.attributes?.expirationDate;
      const displayName =
        certData?.attributes?.displayName ?? certData?.attributes?.name;
      const certType = certData?.attributes?.certificateType;

      if (!certContent) {
        throw new Error(
          `Apple returned no certificate content. Full response: ${JSON.stringify(result)}`
        );
      }

      // Decode base64 DER certificate and write to disk
      fs.writeFileSync(certPath, Buffer.from(certContent, "base64"));

      let keychainResult = "";
      if (install_in_keychain) {
        // Import private key into login keychain
        const keyImport = spawnSync(
          "security",
          ["import", keyPath, "-k", "login.keychain", "-T", "/usr/bin/codesign"],
          { stdio: "pipe" }
        );

        // Import certificate into login keychain
        const certImport = spawnSync(
          "security",
          [
            "import",
            certPath,
            "-k",
            "login.keychain",
            "-T",
            "/usr/bin/codesign",
          ],
          { stdio: "pipe" }
        );

        const keyErr = keyImport.stderr?.toString() ?? "";
        const certErr = certImport.stderr?.toString() ?? "";
        if (keyImport.status === 0 && certImport.status === 0) {
          keychainResult = "✅ Installed private key + certificate in login keychain";
        } else {
          keychainResult = `⚠️  Keychain import had issues:\n  key: ${keyErr || "ok"}\n  cert: ${certErr || "ok"}\n\nCertificate file saved at: ${certPath}\nPrivate key saved at: ${keyPath}\n(You can import them manually via Xcode > Settings > Accounts > Manage Certificates)`;
        }
      }

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `✅ Created certificate`,
              `ID: ${certId}`,
              `Name: ${displayName}`,
              `Type: ${certType}`,
              `Expires: ${expirationDate}`,
              keychainResult,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      };
    } finally {
      // Clean up temp files (private key especially)
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {
        // best effort
      }
    }
  }
);

// ─── Revoke Certificate ─────────────────────────────────────────

server.tool(
  "asc_revoke_certificate",
  "Revoke a signing certificate by its ID. Use asc_list_certificates to find the ID. Warning: this cannot be undone.",
  {
    certificate_id: z
      .string()
      .describe("Certificate ID (from asc_list_certificates)"),
  },
  async ({ certificate_id }) => {
    await api.revokeCertificate(certificate_id);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Revoked certificate ${certificate_id}`,
        },
      ],
    };
  }
);

// ─── Create Provisioning Profile ────────────────────────────────

server.tool(
  "asc_create_profile",
  "Create a provisioning profile for a bundle ID and certificate. Use asc_list_bundle_ids to get the bundle ID resource ID and asc_list_certificates to get certificate IDs.",
  {
    name: z.string().describe("Profile name (e.g. 'MyApp App Store')"),
    profile_type: z
      .string()
      .default("IOS_APP_STORE")
      .describe(
        "Profile type: IOS_APP_STORE, IOS_APP_DEVELOPMENT, IOS_APP_ADHOC, MAC_APP_STORE, TVOS_APP_STORE"
      ),
    bundle_id_id: z
      .string()
      .describe("Bundle ID resource ID (from asc_list_bundle_ids, NOT the identifier string)"),
    certificate_ids: z
      .array(z.string())
      .describe("Array of certificate IDs to include (from asc_list_certificates)"),
    device_ids: z
      .array(z.string())
      .optional()
      .describe("Device IDs for development/adhoc profiles (not needed for App Store)"),
  },
  async ({ name, profile_type, bundle_id_id, certificate_ids, device_ids }) => {
    const result = await api.createProfile({
      name,
      profileType: profile_type,
      bundleIdId: bundle_id_id,
      certificateIds: certificate_ids,
      deviceIds: device_ids,
    });
    const profile = result.data;
    return {
      content: [
        {
          type: "text" as const,
          text: [
            `✅ Created provisioning profile`,
            `ID: ${profile?.id}`,
            `Name: ${profile?.attributes?.name}`,
            `Type: ${profile?.attributes?.profileType}`,
            `State: ${profile?.attributes?.profileState}`,
            `Expires: ${profile?.attributes?.expirationDate}`,
          ].join("\n"),
        },
      ],
    };
  }
);

// ─── Delete Provisioning Profile ────────────────────────────────

server.tool(
  "asc_delete_profile",
  "Delete a provisioning profile by its ID. Use asc_list_profiles to find the ID.",
  {
    profile_id: z
      .string()
      .describe("Profile ID (from asc_list_profiles)"),
  },
  async ({ profile_id }) => {
    await api.deleteProfile(profile_id);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Deleted provisioning profile ${profile_id}`,
        },
      ],
    };
  }
);

// ─── Setup Signing (Combo) ───────────────────────────────────────
//
// Creates a distribution certificate (if none exists) and App Store
// provisioning profiles for a list of bundle IDs in one shot.

server.tool(
  "asc_setup_signing",
  "One-shot signing setup: creates an Apple Distribution certificate (if none exists) and App Store provisioning profiles for the given bundle identifiers. Use this to fix ExportArchiveStep failures.",
  {
    bundle_identifiers: z
      .array(z.string())
      .describe(
        "Bundle identifiers to create profiles for (e.g. ['com.example.app', 'com.example.app.widgets'])"
      ),
    force_new_cert: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Force creation of a new distribution certificate even if one already exists"
      ),
  },
  async ({ bundle_identifiers, force_new_cert }) => {
    const steps: string[] = [];

    // Step 1: Check for existing distribution certificate
    const certsResult = await api.listCertificates();
    const distCerts = (certsResult.data ?? []).filter(
      (c: any) =>
        c.attributes?.certificateType === "DISTRIBUTION" ||
        c.attributes?.certificateType === "IOS_DISTRIBUTION" ||
        c.attributes?.certificateType === "APPLE_DISTRIBUTION"
    );

    let certId: string;

    if (distCerts.length > 0 && !force_new_cert) {
      certId = distCerts[0].id;
      const name =
        distCerts[0].attributes?.displayName ?? distCerts[0].attributes?.name;
      steps.push(
        `✅ Using existing distribution certificate: ${name} (${certId})`
      );
    } else {
      steps.push("📋 No distribution certificate found — creating one...");

      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "asc-setup-"));
      const keyPath = path.join(tmpDir, "private.key");
      const csrPath = path.join(tmpDir, "request.csr");
      const certPath = path.join(tmpDir, "certificate.cer");

      try {
        spawnSync("openssl", ["genrsa", "-out", keyPath, "2048"], {
          stdio: "pipe",
        });
        spawnSync(
          "openssl",
          [
            "req",
            "-new",
            "-key",
            keyPath,
            "-out",
            csrPath,
            "-subj",
            "/CN=iPhone Distribution/O=Apple/C=US",
          ],
          { stdio: "pipe" }
        );

        if (!fs.existsSync(csrPath)) {
          throw new Error("Failed to generate CSR — is OpenSSL installed?");
        }

        const csrPem = fs.readFileSync(csrPath, "utf8");
        const certResult = await api.createCertificate("DISTRIBUTION", csrPem);
        certId = certResult.data?.id;
        const certContent = certResult.data?.attributes?.certificateContent;
        const expirationDate = certResult.data?.attributes?.expirationDate;
        const displayName =
          certResult.data?.attributes?.displayName ??
          certResult.data?.attributes?.name;

        if (!certContent) {
          throw new Error(
            `Apple returned no certificate content: ${JSON.stringify(certResult)}`
          );
        }

        fs.writeFileSync(certPath, Buffer.from(certContent, "base64"));

        // Install in keychain
        spawnSync(
          "security",
          ["import", keyPath, "-k", "login.keychain", "-T", "/usr/bin/codesign"],
          { stdio: "pipe" }
        );
        spawnSync(
          "security",
          [
            "import",
            certPath,
            "-k",
            "login.keychain",
            "-T",
            "/usr/bin/codesign",
          ],
          { stdio: "pipe" }
        );

        steps.push(
          `✅ Created distribution certificate: ${displayName} (${certId}), expires ${expirationDate}`
        );
        steps.push(`✅ Installed certificate + private key in login keychain`);
      } finally {
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch {
          // best effort
        }
      }
    }

    // Step 2: Get all bundle ID resources for the given identifiers
    const allBundleIds = await api.listBundleIds();
    const bundleIdMap = new Map<string, any>();
    for (const b of allBundleIds.data ?? []) {
      bundleIdMap.set(b.attributes?.identifier, b);
    }

    // Step 3: Create App Store profiles for each bundle identifier
    const profileResults: string[] = [];
    for (const identifier of bundle_identifiers) {
      const bundleIdResource = bundleIdMap.get(identifier);
      if (!bundleIdResource) {
        profileResults.push(`⚠️  ${identifier}: Not found in Developer Portal — skipping`);
        continue;
      }

      const shortName = identifier.split(".").pop() ?? identifier;
      const profileName = `${shortName} App Store`;

      try {
        const profileResult = await api.createProfile({
          name: profileName,
          profileType: "IOS_APP_STORE",
          bundleIdId: bundleIdResource.id,
          certificateIds: [certId!],
        });
        const profile = profileResult.data;
        profileResults.push(
          `✅ ${identifier}: Created profile "${profile?.attributes?.name}" (${profile?.id}), state: ${profile?.attributes?.profileState}`
        );
      } catch (err: any) {
        profileResults.push(
          `❌ ${identifier}: Failed to create profile — ${err.message}`
        );
      }
    }

    steps.push(...profileResults);

    return {
      content: [
        {
          type: "text" as const,
          text: steps.join("\n"),
        },
      ],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════
// App Store: Apps, Versions, Metadata
// ═══════════════════════════════════════════════════════════════════

// ─── List Apps ──────────────────────────────────────────────────

server.tool(
  "asc_list_apps",
  "List all apps in App Store Connect. Returns app IDs, names, bundle IDs, and current versions.",
  {},
  async () => {
    const result = await api.listApps();
    const apps = (result.data ?? []).map((a: any) => ({
      id: a.id,
      name: a.attributes?.name,
      bundleId: a.attributes?.bundleId,
      sku: a.attributes?.sku,
      primaryLocale: a.attributes?.primaryLocale,
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(apps, null, 2) }],
    };
  }
);

// ─── Get App Versions ───────────────────────────────────────────

server.tool(
  "asc_list_versions",
  "List App Store versions for an app. Shows version string, state (READY_FOR_SALE, PREPARE_FOR_SUBMISSION, etc.), and platform.",
  {
    app_id: z.string().describe("App ID (from asc_list_apps)"),
  },
  async ({ app_id }) => {
    const result = await api.listAppVersions(app_id);
    const versions = (result.data ?? []).map((v: any) => ({
      id: v.id,
      versionString: v.attributes?.versionString,
      appStoreState: v.attributes?.appStoreState,
      platform: v.attributes?.platform,
      releaseType: v.attributes?.releaseType,
      createdDate: v.attributes?.createdDate,
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(versions, null, 2) }],
    };
  }
);

// ─── Create App Version ─────────────────────────────────────────

server.tool(
  "asc_create_version",
  "Create a new App Store version for an app (e.g. '1.1.0'). This is the first step in preparing a submission.",
  {
    app_id: z.string().describe("App ID (from asc_list_apps)"),
    version: z.string().describe("Version string (e.g. '1.1.0')"),
    platform: z
      .string()
      .optional()
      .default("IOS")
      .describe("Platform: IOS (default), MAC_OS, TV_OS"),
  },
  async ({ app_id, version, platform }) => {
    const result = await api.createAppVersion(app_id, version, platform);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Created version ${version}\nVersion ID: ${result.data?.id}\nState: ${result.data?.attributes?.appStoreState}`,
        },
      ],
    };
  }
);

// ─── Get Version Metadata ───────────────────────────────────────

server.tool(
  "asc_get_metadata",
  "Get all localized metadata for an App Store version — description, keywords, what's new, promotional text, URLs.",
  {
    version_id: z.string().describe("App Store Version ID (from asc_list_versions)"),
  },
  async ({ version_id }) => {
    const result = await api.listVersionLocalizations(version_id);
    const localizations = (result.data ?? []).map((l: any) => ({
      id: l.id,
      locale: l.attributes?.locale,
      description: l.attributes?.description,
      keywords: l.attributes?.keywords,
      whatsNew: l.attributes?.whatsNew,
      promotionalText: l.attributes?.promotionalText,
      marketingUrl: l.attributes?.marketingUrl,
      supportUrl: l.attributes?.supportUrl,
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(localizations, null, 2) }],
    };
  }
);

// ─── Update Version Metadata ────────────────────────────────────

server.tool(
  "asc_update_metadata",
  "Update localized metadata for an App Store version — description, keywords, what's new, promotional text, URLs.",
  {
    localization_id: z
      .string()
      .describe("Localization ID (from asc_get_metadata)"),
    description: z.string().optional().describe("Full app description"),
    keywords: z
      .string()
      .optional()
      .describe("Comma-separated keywords (max 100 chars)"),
    whats_new: z
      .string()
      .optional()
      .describe("What's New text for this version"),
    promotional_text: z
      .string()
      .optional()
      .describe("Promotional text (can be updated without new version)"),
    marketing_url: z.string().optional().describe("Marketing URL"),
    support_url: z.string().optional().describe("Support URL"),
  },
  async ({
    localization_id,
    description,
    keywords,
    whats_new,
    promotional_text,
    marketing_url,
    support_url,
  }) => {
    const attrs: any = {};
    if (description !== undefined) attrs.description = description;
    if (keywords !== undefined) attrs.keywords = keywords;
    if (whats_new !== undefined) attrs.whatsNew = whats_new;
    if (promotional_text !== undefined) attrs.promotionalText = promotional_text;
    if (marketing_url !== undefined) attrs.marketingUrl = marketing_url;
    if (support_url !== undefined) attrs.supportUrl = support_url;

    const result = await api.updateVersionLocalization(localization_id, attrs);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Updated metadata for locale '${result.data?.attributes?.locale}'`,
        },
      ],
    };
  }
);

// ─── Get App Info (name, subtitle, category) ────────────────────

server.tool(
  "asc_get_app_info",
  "Get app-level info including name, subtitle, privacy URL, and category for each locale.",
  {
    app_id: z.string().describe("App ID (from asc_list_apps)"),
  },
  async ({ app_id }) => {
    const result = await api.listAppInfos(app_id);
    const infos = (result.data ?? []).map((info: any) => ({
      id: info.id,
      appStoreState: info.attributes?.appStoreState,
      appStoreAgeRating: info.attributes?.appStoreAgeRating,
      primaryCategory: info.relationships?.primaryCategory?.data?.id,
      localizations: (result.included ?? [])
        .filter(
          (inc: any) =>
            inc.type === "appInfoLocalizations" &&
            info.relationships?.appInfoLocalizations?.data?.some(
              (d: any) => d.id === inc.id
            )
        )
        .map((loc: any) => ({
          id: loc.id,
          locale: loc.attributes?.locale,
          name: loc.attributes?.name,
          subtitle: loc.attributes?.subtitle,
          privacyPolicyUrl: loc.attributes?.privacyPolicyUrl,
        })),
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(infos, null, 2) }],
    };
  }
);

// ─── Update App Info ────────────────────────────────────────────

server.tool(
  "asc_update_app_info",
  "Update app-level localized info — name, subtitle, privacy policy URL.",
  {
    localization_id: z
      .string()
      .describe("App Info Localization ID (from asc_get_app_info)"),
    name: z.string().optional().describe("App name (max 30 chars)"),
    subtitle: z.string().optional().describe("App subtitle (max 30 chars)"),
    privacy_policy_url: z.string().optional().describe("Privacy policy URL"),
  },
  async ({ localization_id, name, subtitle, privacy_policy_url }) => {
    const attrs: any = {};
    if (name !== undefined) attrs.name = name;
    if (subtitle !== undefined) attrs.subtitle = subtitle;
    if (privacy_policy_url !== undefined) attrs.privacyPolicyUrl = privacy_policy_url;

    await api.updateAppInfoLocalization(localization_id, attrs);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Updated app info localization ${localization_id}`,
        },
      ],
    };
  }
);

// ─── List Screenshots ───────────────────────────────────────────

server.tool(
  "asc_list_screenshots",
  "List screenshot sets and their screenshots for a version localization. Shows display types, file names, and upload status.",
  {
    localization_id: z
      .string()
      .describe("Version Localization ID (from asc_get_metadata)"),
  },
  async ({ localization_id }) => {
    const result = await api.listScreenshotSets(localization_id);
    const sets = (result.data ?? []).map((s: any) => ({
      id: s.id,
      displayType: s.attributes?.screenshotDisplayType,
      screenshots: (result.included ?? [])
        .filter(
          (inc: any) =>
            inc.type === "appScreenshots" &&
            s.relationships?.appScreenshots?.data?.some(
              (d: any) => d.id === inc.id
            )
        )
        .map((ss: any) => ({
          id: ss.id,
          fileName: ss.attributes?.fileName,
          fileSize: ss.attributes?.fileSize,
          state: ss.attributes?.assetDeliveryState?.state,
        })),
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(sets, null, 2) }],
    };
  }
);

// ─── Submit for Review ──────────────────────────────────────────

server.tool(
  "asc_submit_for_review",
  "Submit an App Store version for App Review. The version must be in PREPARE_FOR_SUBMISSION state with all required metadata and builds.",
  {
    version_id: z.string().describe("App Store Version ID to submit"),
  },
  async ({ version_id }) => {
    const result = await api.createReviewSubmission(version_id);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Submitted version for review.\nSubmission ID: ${result.data?.id}`,
        },
      ],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════
// TestFlight: Builds, Beta Groups
// ═══════════════════════════════════════════════════════════════════

// ─── List TestFlight Builds ─────────────────────────────────────

server.tool(
  "asc_list_tf_builds",
  "List TestFlight builds. Shows version, upload date, processing state, and expiration. Optionally filter by app.",
  {
    app_id: z
      .string()
      .optional()
      .describe("Filter by App ID (from asc_list_apps)"),
  },
  async ({ app_id }) => {
    const result = await api.listTestFlightBuilds(
      app_id ? { appId: app_id } : undefined
    );
    const builds = (result.data ?? []).map((b: any) => {
      // Find the pre-release version from included
      const prv = (result.included ?? []).find(
        (inc: any) =>
          inc.type === "preReleaseVersions" &&
          inc.id === b.relationships?.preReleaseVersion?.data?.id
      );
      return {
        id: b.id,
        version: b.attributes?.version,
        appVersion: prv?.attributes?.version,
        platform: prv?.attributes?.platform,
        uploadedDate: b.attributes?.uploadedDate,
        processingState: b.attributes?.processingState,
        expired: b.attributes?.expired,
        expirationDate: b.attributes?.expirationDate,
      };
    });
    return {
      content: [{ type: "text" as const, text: JSON.stringify(builds, null, 2) }],
    };
  }
);

// ─── List Beta Groups ───────────────────────────────────────────

server.tool(
  "asc_list_beta_groups",
  "List TestFlight beta groups. Shows group names, internal/external status, and public link status.",
  {
    app_id: z
      .string()
      .optional()
      .describe("Filter by App ID"),
  },
  async ({ app_id }) => {
    const result = await api.listBetaGroups(app_id);
    const groups = (result.data ?? []).map((g: any) => ({
      id: g.id,
      name: g.attributes?.name,
      isInternalGroup: g.attributes?.isInternalGroup,
      publicLinkEnabled: g.attributes?.publicLinkEnabled,
      feedbackEnabled: g.attributes?.feedbackEnabled,
      hasAccessToAllBuilds: g.attributes?.hasAccessToAllBuilds,
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(groups, null, 2) }],
    };
  }
);

// ─── Distribute Build to Beta Group ─────────────────────────────

server.tool(
  "asc_distribute_build",
  "Add a TestFlight build to a beta group for distribution. The build must be processed and approved.",
  {
    beta_group_id: z.string().describe("Beta Group ID (from asc_list_beta_groups)"),
    build_id: z.string().describe("Build ID (from asc_list_tf_builds)"),
  },
  async ({ beta_group_id, build_id }) => {
    await api.addBuildToBetaGroup(beta_group_id, build_id);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Build ${build_id} added to beta group ${beta_group_id}`,
        },
      ],
    };
  }
);

// ─── Set Beta Build What's New ──────────────────────────────────

server.tool(
  "asc_set_beta_notes",
  "Set the 'What to Test' text for a TestFlight build. Visible to testers when they install the build.",
  {
    build_id: z.string().describe("Build ID (from asc_list_tf_builds)"),
    whats_new: z.string().describe("What to test text for testers"),
    locale: z
      .string()
      .optional()
      .default("en-US")
      .describe("Locale (default: en-US)"),
  },
  async ({ build_id, whats_new, locale }) => {
    await api.setBetaBuildLocalization(build_id, locale, whats_new);
    return {
      content: [
        {
          type: "text" as const,
          text: `✅ Set beta notes for build ${build_id} (${locale})`,
        },
      ],
    };
  }
);

// ─── Submission Readiness Check ─────────────────────────────────

server.tool(
  "asc_check_submission",
  "Check if an app version is ready for submission. Verifies metadata completeness, screenshots, build assignment, and signing.",
  {
    app_id: z.string().describe("App ID (from asc_list_apps)"),
    version_id: z
      .string()
      .optional()
      .describe("Version ID to check (defaults to latest PREPARE_FOR_SUBMISSION version)"),
  },
  async ({ app_id, version_id }) => {
    // Get versions
    const versions = await api.listAppVersions(app_id);
    const targetVersion = version_id
      ? (versions.data ?? []).find((v: any) => v.id === version_id)
      : (versions.data ?? []).find(
          (v: any) =>
            v.attributes?.appStoreState === "PREPARE_FOR_SUBMISSION"
        );

    if (!targetVersion) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No version in PREPARE_FOR_SUBMISSION state found.",
          },
        ],
      };
    }

    const versionId = targetVersion.id;
    const versionString = targetVersion.attributes?.versionString;

    // Check metadata
    const localizations = await api.listVersionLocalizations(versionId);
    const metadataChecks = (localizations.data ?? []).map((l: any) => ({
      locale: l.attributes?.locale,
      hasDescription: !!l.attributes?.description,
      hasKeywords: !!l.attributes?.keywords,
      hasWhatsNew: !!l.attributes?.whatsNew,
      hasSupportUrl: !!l.attributes?.supportUrl,
    }));

    // Check screenshots for each localization
    const screenshotChecks: any[] = [];
    for (const loc of localizations.data ?? []) {
      try {
        const sets = await api.listScreenshotSets(loc.id);
        screenshotChecks.push({
          locale: loc.attributes?.locale,
          screenshotSets: (sets.data ?? []).length,
          totalScreenshots: (sets.included ?? []).filter(
            (i: any) => i.type === "appScreenshots"
          ).length,
        });
      } catch {
        screenshotChecks.push({
          locale: loc.attributes?.locale,
          screenshotSets: 0,
          totalScreenshots: 0,
        });
      }
    }

    // Check app info
    const appInfo = await api.listAppInfos(app_id);
    const appInfoLocs = (appInfo.included ?? [])
      .filter((i: any) => i.type === "appInfoLocalizations")
      .map((l: any) => ({
        locale: l.attributes?.locale,
        hasName: !!l.attributes?.name,
        hasSubtitle: !!l.attributes?.subtitle,
        hasPrivacyUrl: !!l.attributes?.privacyPolicyUrl,
      }));

    // Build summary
    const issues: string[] = [];
    for (const m of metadataChecks) {
      if (!m.hasDescription) issues.push(`${m.locale}: Missing description`);
      if (!m.hasWhatsNew) issues.push(`${m.locale}: Missing what's new`);
      if (!m.hasSupportUrl) issues.push(`${m.locale}: Missing support URL`);
    }
    for (const s of screenshotChecks) {
      if (s.totalScreenshots === 0)
        issues.push(`${s.locale}: No screenshots uploaded`);
    }
    for (const a of appInfoLocs) {
      if (!a.hasName) issues.push(`${a.locale}: Missing app name`);
      if (!a.hasPrivacyUrl) issues.push(`${a.locale}: Missing privacy policy URL`);
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              version: versionString,
              versionId,
              state: targetVersion.attributes?.appStoreState,
              ready: issues.length === 0,
              issues: issues.length > 0 ? issues : undefined,
              metadata: metadataChecks,
              screenshots: screenshotChecks,
              appInfo: appInfoLocs,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════
// Domain Modules — register all extended tools
// ═══════════════════════════════════════════════════════════════════

registerSigning(server);
registerAppStore(server);
registerTestFlight(server);
registerScreenshots(server);
registerIAP(server);
registerMisc(server);
registerDiagnostics(server);

// ─── Start Server ───────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("App Store Connect MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
