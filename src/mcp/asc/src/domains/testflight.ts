import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";

export function register(server: McpServer) {
  // ─── Create Beta Group ──────────────────────────────────────────

  server.tool(
    "asc_create_beta_group",
    "Create a new TestFlight beta group for an app. Groups organize testers and control build access.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
      name: z.string().describe("Name for the beta group"),
      is_internal_group: z
        .boolean()
        .optional()
        .describe("Whether this is an internal group (default: false)"),
      public_link_enabled: z
        .boolean()
        .optional()
        .describe("Enable public invite link"),
      public_link_limit: z
        .number()
        .optional()
        .describe("Max testers via public link (1-10000)"),
      feedback_enabled: z
        .boolean()
        .optional()
        .describe("Enable feedback from testers"),
      has_access_to_all_builds: z
        .boolean()
        .optional()
        .describe("Automatically distribute all builds to this group"),
    },
    async ({
      app_id,
      name,
      is_internal_group,
      public_link_enabled,
      public_link_limit,
      feedback_enabled,
      has_access_to_all_builds,
    }) => {
      const attributes: Record<string, any> = { name };
      if (is_internal_group !== undefined)
        attributes.isInternalGroup = is_internal_group;
      if (public_link_enabled !== undefined)
        attributes.publicLinkEnabled = public_link_enabled;
      if (public_link_limit !== undefined)
        attributes.publicLinkLimit = public_link_limit;
      if (feedback_enabled !== undefined)
        attributes.feedbackEnabled = feedback_enabled;
      if (has_access_to_all_builds !== undefined)
        attributes.hasAccessToAllBuilds = has_access_to_all_builds;

      const result = await ascFetch("/betaGroups", undefined, {
        method: "POST",
        body: {
          data: {
            type: "betaGroups",
            attributes,
            relationships: {
              app: {
                data: { type: "apps", id: app_id },
              },
            },
          },
        },
      });

      const group = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Beta group created: ${name}`,
                id: group.id,
                name: group.attributes?.name,
                isInternalGroup: group.attributes?.isInternalGroup,
                publicLinkEnabled: group.attributes?.publicLinkEnabled,
                feedbackEnabled: group.attributes?.feedbackEnabled,
                hasAccessToAllBuilds: group.attributes?.hasAccessToAllBuilds,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update Beta Group ──────────────────────────────────────────

  server.tool(
    "asc_update_beta_group",
    "Update a TestFlight beta group's settings (name, public link, feedback, build access).",
    {
      beta_group_id: z
        .string()
        .describe("Beta Group ID (from asc_list_beta_groups)"),
      name: z.string().optional().describe("New group name"),
      public_link_enabled: z
        .boolean()
        .optional()
        .describe("Enable or disable public invite link"),
      public_link_limit: z
        .number()
        .optional()
        .describe("Max testers via public link (1-10000)"),
      feedback_enabled: z
        .boolean()
        .optional()
        .describe("Enable or disable feedback from testers"),
      has_access_to_all_builds: z
        .boolean()
        .optional()
        .describe("Automatically distribute all builds to this group"),
    },
    async ({
      beta_group_id,
      name,
      public_link_enabled,
      public_link_limit,
      feedback_enabled,
      has_access_to_all_builds,
    }) => {
      const attributes: Record<string, any> = {};
      if (name !== undefined) attributes.name = name;
      if (public_link_enabled !== undefined)
        attributes.publicLinkEnabled = public_link_enabled;
      if (public_link_limit !== undefined)
        attributes.publicLinkLimit = public_link_limit;
      if (feedback_enabled !== undefined)
        attributes.feedbackEnabled = feedback_enabled;
      if (has_access_to_all_builds !== undefined)
        attributes.hasAccessToAllBuilds = has_access_to_all_builds;

      const result = await ascFetch(
        `/betaGroups/${beta_group_id}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "betaGroups",
              id: beta_group_id,
              attributes,
            },
          },
        }
      );

      const group = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Beta group updated: ${group.attributes?.name}`,
                id: group.id,
                name: group.attributes?.name,
                publicLinkEnabled: group.attributes?.publicLinkEnabled,
                publicLinkLimit: group.attributes?.publicLinkLimit,
                feedbackEnabled: group.attributes?.feedbackEnabled,
                hasAccessToAllBuilds: group.attributes?.hasAccessToAllBuilds,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Beta Group ──────────────────────────────────────────

  server.tool(
    "asc_delete_beta_group",
    "Delete a TestFlight beta group. This removes all tester associations.",
    {
      beta_group_id: z
        .string()
        .describe("Beta Group ID (from asc_list_beta_groups)"),
    },
    async ({ beta_group_id }) => {
      await ascFetch(`/betaGroups/${beta_group_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Beta group deleted: ${beta_group_id}`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── List Beta Testers ──────────────────────────────────────────

  server.tool(
    "asc_list_beta_testers",
    "List TestFlight beta testers. Optionally filter by beta group, app, or email.",
    {
      beta_group_id: z
        .string()
        .optional()
        .describe("Filter by Beta Group ID"),
      app_id: z.string().optional().describe("Filter by App ID"),
      email: z.string().optional().describe("Filter by tester email"),
    },
    async ({ beta_group_id, app_id, email }) => {
      const params: Record<string, string> = {
        limit: "50",
        "fields[betaTesters]":
          "firstName,lastName,email,inviteType,state",
      };
      if (beta_group_id) params["filter[betaGroups]"] = beta_group_id;
      if (app_id) params["filter[apps]"] = app_id;
      if (email) params["filter[email]"] = email;

      const result = await ascFetch("/betaTesters", params);
      const testers = (result.data ?? []).map((t: any) => ({
        id: t.id,
        firstName: t.attributes?.firstName,
        lastName: t.attributes?.lastName,
        email: t.attributes?.email,
        inviteType: t.attributes?.inviteType,
        state: t.attributes?.state,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(testers, null, 2),
          },
        ],
      };
    }
  );

  // ─── Invite Beta Tester ─────────────────────────────────────────

  server.tool(
    "asc_invite_beta_tester",
    "Invite a tester by email to a TestFlight beta group. Creates the tester if they don't exist.",
    {
      email: z.string().describe("Tester's email address"),
      beta_group_id: z
        .string()
        .describe("Beta Group ID to add the tester to"),
      first_name: z.string().optional().describe("Tester's first name"),
      last_name: z.string().optional().describe("Tester's last name"),
    },
    async ({ email, beta_group_id, first_name, last_name }) => {
      const attributes: Record<string, string> = { email };
      if (first_name) attributes.firstName = first_name;
      if (last_name) attributes.lastName = last_name;

      const result = await ascFetch("/betaTesters", undefined, {
        method: "POST",
        body: {
          data: {
            type: "betaTesters",
            attributes,
            relationships: {
              betaGroups: {
                data: [{ type: "betaGroups", id: beta_group_id }],
              },
            },
          },
        },
      });

      const tester = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Tester invited: ${email}`,
                id: tester.id,
                email: tester.attributes?.email,
                firstName: tester.attributes?.firstName,
                lastName: tester.attributes?.lastName,
                inviteType: tester.attributes?.inviteType,
                state: tester.attributes?.state,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Remove Beta Tester ─────────────────────────────────────────

  server.tool(
    "asc_remove_beta_tester",
    "Remove a tester from a TestFlight beta group. The tester remains in the system but loses group access.",
    {
      beta_group_id: z
        .string()
        .describe("Beta Group ID to remove the tester from"),
      beta_tester_id: z
        .string()
        .describe("Beta Tester ID (from asc_list_beta_testers)"),
    },
    async ({ beta_group_id, beta_tester_id }) => {
      await ascFetch(
        `/betaGroups/${beta_group_id}/relationships/betaTesters`,
        undefined,
        {
          method: "DELETE",
          body: {
            data: [{ type: "betaTesters", id: beta_tester_id }],
          },
        }
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Tester ${beta_tester_id} removed from beta group ${beta_group_id}`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Submit for Beta Review ─────────────────────────────────────

  server.tool(
    "asc_submit_beta_review",
    "Submit a build for external TestFlight beta review. Required before distributing to external testers.",
    {
      build_id: z
        .string()
        .describe("Build ID (from asc_list_tf_builds)"),
    },
    async ({ build_id }) => {
      const result = await ascFetch(
        "/betaAppReviewSubmissions",
        undefined,
        {
          method: "POST",
          body: {
            data: {
              type: "betaAppReviewSubmissions",
              relationships: {
                build: {
                  data: { type: "builds", id: build_id },
                },
              },
            },
          },
        }
      );

      const submission = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Build ${build_id} submitted for beta review`,
                id: submission.id,
                betaReviewState: submission.attributes?.betaReviewState,
                submittedDate: submission.attributes?.submittedDate,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Get Beta App Localizations ─────────────────────────────────

  server.tool(
    "asc_get_beta_app_localization",
    "Get TestFlight app-level localizations (description, feedback email) for all locales.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
    },
    async ({ app_id }) => {
      const result = await ascFetch(
        `/apps/${app_id}/betaAppLocalizations`
      );
      const localizations = (result.data ?? []).map((l: any) => ({
        id: l.id,
        locale: l.attributes?.locale,
        description: l.attributes?.description,
        feedbackEmail: l.attributes?.feedbackEmail,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(localizations, null, 2),
          },
        ],
      };
    }
  );

  // ─── Set Beta App Localization ──────────────────────────────────

  server.tool(
    "asc_set_beta_app_localization",
    "Set TestFlight app description and feedback email for a locale. Creates or updates the localization.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
      locale: z
        .string()
        .default("en-US")
        .describe("Locale code (default: en-US)"),
      description: z
        .string()
        .optional()
        .describe("TestFlight app description shown to testers"),
      feedback_email: z
        .string()
        .optional()
        .describe("Email address for tester feedback"),
    },
    async ({ app_id, locale, description, feedback_email }) => {
      // Check if localization already exists for this locale
      const existing = await ascFetch(
        `/apps/${app_id}/betaAppLocalizations`
      );
      const existingLoc = (existing.data ?? []).find(
        (l: any) => l.attributes?.locale === locale
      );

      const attributes: Record<string, string> = {};
      if (description !== undefined) attributes.description = description;
      if (feedback_email !== undefined)
        attributes.feedbackEmail = feedback_email;

      let result;
      if (existingLoc) {
        // Update existing localization
        result = await ascFetch(
          `/betaAppLocalizations/${existingLoc.id}`,
          undefined,
          {
            method: "PATCH",
            body: {
              data: {
                type: "betaAppLocalizations",
                id: existingLoc.id,
                attributes,
              },
            },
          }
        );
      } else {
        // Create new localization
        result = await ascFetch("/betaAppLocalizations", undefined, {
          method: "POST",
          body: {
            data: {
              type: "betaAppLocalizations",
              attributes: { locale, ...attributes },
              relationships: {
                app: {
                  data: { type: "apps", id: app_id },
                },
              },
            },
          },
        });
      }

      const loc = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Beta app localization ${existingLoc ? "updated" : "created"} for ${locale}`,
                id: loc.id,
                locale: loc.attributes?.locale,
                description: loc.attributes?.description,
                feedbackEmail: loc.attributes?.feedbackEmail,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Get Build Beta Detail ──────────────────────────────────────

  server.tool(
    "asc_get_build_beta_detail",
    "Get beta detail for a build including auto-notify status and external build state.",
    {
      build_id: z
        .string()
        .describe("Build ID (from asc_list_tf_builds)"),
    },
    async ({ build_id }) => {
      const result = await ascFetch(
        `/builds/${build_id}/buildBetaDetail`
      );
      const detail = result.data;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                id: detail.id,
                autoNotifyEnabled: detail.attributes?.autoNotifyEnabled,
                internalBuildState: detail.attributes?.internalBuildState,
                externalBuildState: detail.attributes?.externalBuildState,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update Build Beta Detail ───────────────────────────────────

  server.tool(
    "asc_update_build_beta_detail",
    "Update build beta detail settings such as auto-notify for TestFlight testers.",
    {
      build_beta_detail_id: z
        .string()
        .describe(
          "Build Beta Detail ID (from asc_get_build_beta_detail)"
        ),
      auto_notify_enabled: z
        .boolean()
        .optional()
        .describe(
          "Whether testers are automatically notified when this build is available"
        ),
    },
    async ({ build_beta_detail_id, auto_notify_enabled }) => {
      const attributes: Record<string, any> = {};
      if (auto_notify_enabled !== undefined)
        attributes.autoNotifyEnabled = auto_notify_enabled;

      const result = await ascFetch(
        `/buildBetaDetails/${build_beta_detail_id}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "buildBetaDetails",
              id: build_beta_detail_id,
              attributes,
            },
          },
        }
      );

      const detail = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Build beta detail updated: ${build_beta_detail_id}`,
                id: detail.id,
                autoNotifyEnabled: detail.attributes?.autoNotifyEnabled,
                internalBuildState: detail.attributes?.internalBuildState,
                externalBuildState: detail.attributes?.externalBuildState,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── List Build Bundles ─────────────────────────────────────────

  server.tool(
    "asc_list_build_bundles",
    "List the bundles inside a TestFlight build — the main app bundle and, if the build embeds one, its App Clip bundle. Use this to find the App Clip's build-bundle ID and to see any beta App Clip invocation URLs already configured on it.",
    {
      build_id: z.string().describe("Build ID (from asc_list_tf_builds)"),
    },
    async ({ build_id }) => {
      // The build→buildBundles relationship can't be navigated directly
      // (Apple returns 403: "no allowed operations"), so read the bundles via
      // an `include` on the build resource itself.
      const result = await ascFetch(`/builds/${build_id}`, {
        include: "buildBundles",
      });
      const rawBundles = (result.included ?? []).filter(
        (x: any) => x.type === "buildBundles"
      );

      const bundles = [];
      for (const b of rawBundles) {
        // Any existing invocations live behind the bundle's own relationship
        // endpoint (the build-level include doesn't carry them). Only an App
        // Clip bundle can hold them, so skip the call for the main app bundle.
        let invocations: { id: string; url: string }[] = [];
        if (b.attributes?.bundleType === "APP_CLIP") {
          const inv = await ascFetch(
            `/buildBundles/${b.id}/betaAppClipInvocations`
          );
          invocations = (inv.data ?? []).map((i: any) => ({
            id: i.id,
            url: i.attributes?.url,
          }));
        }
        bundles.push({
          id: b.id,
          bundleType: b.attributes?.bundleType,
          bundleId: b.attributes?.bundleId,
          fileName: b.attributes?.fileName,
          betaAppClipInvocations: invocations,
        });
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(bundles, null, 2),
          },
        ],
      };
    }
  );

  // ─── Set Beta App Clip Invocation ───────────────────────────────

  server.tool(
    "asc_set_beta_app_clip_invocation",
    "Configure the App Clip experience TestFlight testers launch for a build: an invocation URL plus the card title. Auto-detects the build's App Clip bundle, replaces any invocation already set on it, then creates the new one with a localized title. NOTE: this is per-build — Apple binds the invocation to a specific build bundle, so re-run it for every new build that embeds the App Clip. It affects TestFlight only; the public App Store App Clip experience is configured separately.",
    {
      build_id: z
        .string()
        .describe("Build ID (from asc_list_tf_builds) — must embed an App Clip"),
      url: z
        .string()
        .describe(
          "The invocation URL testers launch (e.g. https://example.com/invite?…). Must be a URL your App Clip's associated domains handle."
        ),
      title: z
        .string()
        .default("Open")
        .describe("Card title shown to testers (default: 'Open')"),
      locale: z
        .string()
        .default("en-US")
        .describe("Locale for the title (default: en-US)"),
      build_bundle_id: z
        .string()
        .optional()
        .describe(
          "Override the App Clip build-bundle ID (from asc_list_build_bundles). Omit to auto-detect the APP_CLIP bundle."
        ),
    },
    async ({ build_id, url, title, locale, build_bundle_id }) => {
      // 1. Resolve the App Clip build bundle, unless the caller pinned a
      //    specific bundle id. The build→buildBundles relationship can't be
      //    navigated directly (Apple returns 403: "no allowed operations"), so
      //    read the bundles via an `include` on the build resource itself.
      const bundlesResult = await ascFetch(`/builds/${build_id}`, {
        include: "buildBundles",
      });
      const bundles = (bundlesResult.included ?? []).filter(
        (x: any) => x.type === "buildBundles"
      );
      const clipBundle = build_bundle_id
        ? bundles.find((b: any) => b.id === build_bundle_id)
        : bundles.find((b: any) => b.attributes?.bundleType === "APP_CLIP");

      if (!clipBundle) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: build_bundle_id
                    ? `❌ Build bundle ${build_bundle_id} not found on build ${build_id}.`
                    : `❌ Build ${build_id} has no App Clip bundle. The uploaded build must embed an App Clip target for a beta invocation to exist. Bundles found: ${
                        bundles
                          .map((b: any) => b.attributes?.bundleType)
                          .join(", ") || "none"
                      }.`,
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      // 2. Remove any beta App Clip invocation already on this bundle, so a
      //    re-run cleanly replaces rather than stacks (Apple allows several).
      //    The build-level include doesn't carry them, so read from the
      //    bundle's own relationship endpoint (this navigation *is* allowed).
      const existingResult = await ascFetch(
        `/buildBundles/${clipBundle.id}/betaAppClipInvocations`
      );
      const existing = existingResult.data ?? [];
      for (const ref of existing) {
        await ascFetch(`/betaAppClipInvocations/${ref.id}`, undefined, {
          method: "DELETE",
        });
      }

      // 3. Create the invocation with its localized title inline. Apple links
      //    the localization via a matching placeholder id in `included` (the
      //    JSON:API create-with-included pattern). The placeholder id must be
      //    wrapped as `${...}` — Apple rejects a bare string (409 INVALID_ID).
      const locRef = "${loc1}";
      const result = await ascFetch("/betaAppClipInvocations", undefined, {
        method: "POST",
        body: {
          data: {
            type: "betaAppClipInvocations",
            attributes: { url },
            relationships: {
              buildBundle: {
                data: { type: "buildBundles", id: clipBundle.id },
              },
              betaAppClipInvocationLocalizations: {
                data: [
                  { type: "betaAppClipInvocationLocalizations", id: locRef },
                ],
              },
            },
          },
          included: [
            {
              type: "betaAppClipInvocationLocalizations",
              id: locRef,
              attributes: { locale, title },
            },
          ],
        },
      });

      const invocation = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Beta App Clip invocation set on build ${build_id}`,
                replacedExisting: existing.length,
                buildBundleId: clipBundle.id,
                appClipBundleId: clipBundle.attributes?.bundleId,
                invocationId: invocation?.id,
                url: invocation?.attributes?.url ?? url,
                title,
                locale,
                note: "Per-build: re-run for each new build that embeds the App Clip. TestFlight only — the App Store App Clip experience is separate.",
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
