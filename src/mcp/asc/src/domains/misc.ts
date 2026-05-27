import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";

export function register(server: McpServer) {
  // ═══════════════════════════════════════════════════════════════════
  // Customer Reviews
  // ═══════════════════════════════════════════════════════════════════

  // ─── List Reviews ─────────────────────────────────────────────────

  server.tool(
    "asc_list_reviews",
    "List customer reviews for an app. Returns review title, body, rating, reviewer, date, and territory.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
      sort: z
        .enum(["-createdDate", "createdDate", "-rating", "rating"])
        .optional()
        .describe("Sort order (default: -createdDate for newest first)"),
      rating: z
        .string()
        .optional()
        .describe("Filter by rating (1-5). Can be comma-separated for multiple values, e.g. '1,2'"),
      limit: z
        .number()
        .optional()
        .describe("Max reviews to return (default: 20)"),
    },
    async ({ app_id, sort, rating, limit }) => {
      const params: Record<string, string> = {
        limit: String(limit ?? 20),
        "fields[customerReviews]":
          "title,body,rating,reviewerNickname,createdDate,territory",
      };
      if (sort) params.sort = sort;
      if (rating) params["filter[rating]"] = rating;

      const result = await ascFetch(
        `/apps/${app_id}/customerReviews`,
        params
      );

      const reviews = (result.data ?? []).map((r: any) => ({
        id: r.id,
        title: r.attributes?.title,
        body: r.attributes?.body,
        rating: r.attributes?.rating,
        reviewerNickname: r.attributes?.reviewerNickname,
        createdDate: r.attributes?.createdDate,
        territory: r.attributes?.territory,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(reviews, null, 2),
          },
        ],
      };
    }
  );

  // ─── Respond to Review ────────────────────────────────────────────

  server.tool(
    "asc_respond_review",
    "Respond to a customer review on the App Store",
    {
      review_id: z
        .string()
        .describe("Customer review ID (from asc_list_reviews)"),
      response_body: z
        .string()
        .describe("The response text to post publicly"),
    },
    async ({ review_id, response_body }) => {
      const result = await ascFetch("/customerReviewResponses", undefined, {
        method: "POST",
        body: {
          data: {
            type: "customerReviewResponses",
            attributes: {
              responseBody: response_body,
            },
            relationships: {
              review: {
                data: { type: "customerReviews", id: review_id },
              },
            },
          },
        },
      });

      const response = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Response posted to review ${review_id}`,
                id: response.id,
                responseBody: response.attributes?.responseBody,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update Review Response ───────────────────────────────────────

  server.tool(
    "asc_update_response",
    "Update an existing response to a customer review",
    {
      response_id: z
        .string()
        .describe("Review response ID (from the response to a review)"),
      response_body: z.string().describe("Updated response text"),
    },
    async ({ response_id, response_body }) => {
      const result = await ascFetch(
        `/customerReviewResponses/${response_id}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "customerReviewResponses",
              id: response_id,
              attributes: {
                responseBody: response_body,
              },
            },
          },
        }
      );

      const response = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Review response updated: ${response_id}`,
                id: response.id,
                responseBody: response.attributes?.responseBody,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Review Response ───────────────────────────────────────

  server.tool(
    "asc_delete_response",
    "Delete a response to a customer review",
    {
      response_id: z
        .string()
        .describe("Review response ID to delete"),
    },
    async ({ response_id }) => {
      await ascFetch(
        `/customerReviewResponses/${response_id}`,
        undefined,
        { method: "DELETE" }
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Review response deleted: ${response_id}`,
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
  // Users & Team Management
  // ═══════════════════════════════════════════════════════════════════

  // ─── List Users ───────────────────────────────────────────────────

  server.tool(
    "asc_list_users",
    "List team members in App Store Connect. Shows name, email, roles, and permissions.",
    {},
    async () => {
      const result = await ascFetch("/users", {
        limit: "200",
        "fields[users]":
          "firstName,lastName,email,roles,allAppsVisible,provisioningAllowed",
      });

      const users = (result.data ?? []).map((u: any) => ({
        id: u.id,
        firstName: u.attributes?.firstName,
        lastName: u.attributes?.lastName,
        email: u.attributes?.email,
        roles: u.attributes?.roles,
        allAppsVisible: u.attributes?.allAppsVisible,
        provisioningAllowed: u.attributes?.provisioningAllowed,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(users, null, 2),
          },
        ],
      };
    }
  );

  // ─── Invite User ──────────────────────────────────────────────────

  server.tool(
    "asc_invite_user",
    "Invite a new team member to App Store Connect",
    {
      email: z.string().describe("Email address of the person to invite"),
      first_name: z.string().describe("First name"),
      last_name: z.string().describe("Last name"),
      roles: z
        .array(
          z.enum([
            "DEVELOPER",
            "APP_MANAGER",
            "ADMIN",
            "MARKETING",
            "SALES",
            "CUSTOMER_SUPPORT",
            "FINANCE",
            "READ_ONLY",
          ])
        )
        .describe("Roles to assign (e.g. ['DEVELOPER'])"),
      all_apps_visible: z
        .boolean()
        .optional()
        .describe("Whether the user can see all apps (default: true)"),
      visible_app_ids: z
        .array(z.string())
        .optional()
        .describe(
          "App IDs the user can access (only used when all_apps_visible is false)"
        ),
    },
    async ({
      email,
      first_name,
      last_name,
      roles,
      all_apps_visible,
      visible_app_ids,
    }) => {
      const attributes: Record<string, any> = {
        email,
        firstName: first_name,
        lastName: last_name,
        roles,
      };
      if (all_apps_visible !== undefined)
        attributes.allAppsVisible = all_apps_visible;

      const relationships: Record<string, any> = {};
      if (visible_app_ids && visible_app_ids.length > 0) {
        relationships.visibleApps = {
          data: visible_app_ids.map((id) => ({ type: "apps", id })),
        };
      }

      const result = await ascFetch("/userInvitations", undefined, {
        method: "POST",
        body: {
          data: {
            type: "userInvitations",
            attributes,
            ...(Object.keys(relationships).length > 0 && { relationships }),
          },
        },
      });

      const invitation = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Invitation sent to ${email}`,
                id: invitation.id,
                email: invitation.attributes?.email,
                firstName: invitation.attributes?.firstName,
                lastName: invitation.attributes?.lastName,
                roles: invitation.attributes?.roles,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update User ──────────────────────────────────────────────────

  server.tool(
    "asc_update_user",
    "Update a team member's roles or app visibility in App Store Connect",
    {
      user_id: z.string().describe("User ID (from asc_list_users)"),
      roles: z
        .array(
          z.enum([
            "DEVELOPER",
            "APP_MANAGER",
            "ADMIN",
            "MARKETING",
            "SALES",
            "CUSTOMER_SUPPORT",
            "FINANCE",
            "READ_ONLY",
          ])
        )
        .optional()
        .describe("New roles to assign"),
      all_apps_visible: z
        .boolean()
        .optional()
        .describe("Whether the user can see all apps"),
    },
    async ({ user_id, roles, all_apps_visible }) => {
      const attributes: Record<string, any> = {};
      if (roles) attributes.roles = roles;
      if (all_apps_visible !== undefined)
        attributes.allAppsVisible = all_apps_visible;

      const result = await ascFetch(`/users/${user_id}`, undefined, {
        method: "PATCH",
        body: {
          data: {
            type: "users",
            id: user_id,
            attributes,
          },
        },
      });

      const user = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ User updated: ${user.attributes?.firstName} ${user.attributes?.lastName}`,
                id: user.id,
                roles: user.attributes?.roles,
                allAppsVisible: user.attributes?.allAppsVisible,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Remove User ──────────────────────────────────────────────────

  server.tool(
    "asc_remove_user",
    "Remove a team member from App Store Connect. This cannot be undone.",
    {
      user_id: z.string().describe("User ID to remove (from asc_list_users)"),
    },
    async ({ user_id }) => {
      await ascFetch(`/users/${user_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ User removed: ${user_id}`,
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
  // Reporting (Sales & Finance)
  // ═══════════════════════════════════════════════════════════════════

  // ─── Sales Report ─────────────────────────────────────────────────

  server.tool(
    "asc_sales_report",
    "Generate a curl command to download a sales report from App Store Connect. Sales reports are returned as gzipped TSV and require binary handling outside of the JSON API.",
    {
      report_type: z
        .enum(["SALES", "SUBSCRIBER", "SUBSCRIPTION", "SUBSCRIPTION_EVENT", "NEWSSTAND", "PRE_ORDER"])
        .describe("Type of sales report"),
      report_sub_type: z
        .enum(["SUMMARY", "DETAILED", "OPT_IN"])
        .describe("Report sub-type"),
      frequency: z
        .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
        .describe("Reporting frequency"),
      report_date: z
        .string()
        .describe("Report date in YYYY-MM-DD format"),
      vendor_number: z
        .string()
        .describe("Vendor number from App Store Connect (found in Sales & Trends > Reports)"),
    },
    async ({ report_type, report_sub_type, frequency, report_date, vendor_number }) => {
      const params = new URLSearchParams({
        "filter[reportType]": report_type,
        "filter[reportSubType]": report_sub_type,
        "filter[frequency]": frequency,
        "filter[reportDate]": report_date,
        "filter[vendorNumber]": vendor_number,
      });

      const curlCommand = [
        "curl -g",
        `'https://api.appstoreconnect.apple.com/v1/salesReports?${params.toString()}'`,
        "-H 'Authorization: Bearer <YOUR_JWT_TOKEN>'",
        "-H 'Accept: application/a-gzip'",
        "--output report.gz",
        "&& gunzip report.gz",
        "&& cat report",
      ].join(" \\\n  ");

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Sales reports return gzipped TSV data that requires binary handling. Use the curl command below to download and decompress the report.",
                parameters: {
                  reportType: report_type,
                  reportSubType: report_sub_type,
                  frequency,
                  reportDate: report_date,
                  vendorNumber: vendor_number,
                },
                curl: curlCommand,
                notes: [
                  "Replace <YOUR_JWT_TOKEN> with a valid App Store Connect JWT.",
                  "The output is a TSV (tab-separated values) file.",
                  "DAILY reports are available after 5 AM PST for the previous day.",
                  "WEEKLY reports are available on Mondays for the previous week.",
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Finance Report ───────────────────────────────────────────────

  server.tool(
    "asc_finance_report",
    "Generate a curl command to download a finance report from App Store Connect. Finance reports are returned as gzipped TSV and require binary handling outside of the JSON API.",
    {
      region_code: z
        .string()
        .describe("Two-letter region code (e.g. 'US', 'EU', 'JP')"),
      report_type: z
        .enum(["FINANCIAL", "FINANCE_DETAIL"])
        .describe("Type of finance report"),
      report_date: z
        .string()
        .describe("Report date in YYYY-MM format"),
      vendor_number: z
        .string()
        .describe("Vendor number from App Store Connect"),
    },
    async ({ region_code, report_type, report_date, vendor_number }) => {
      const params = new URLSearchParams({
        "filter[regionCode]": region_code,
        "filter[reportType]": report_type,
        "filter[reportDate]": report_date,
        "filter[vendorNumber]": vendor_number,
      });

      const curlCommand = [
        "curl -g",
        `'https://api.appstoreconnect.apple.com/v1/financeReports?${params.toString()}'`,
        "-H 'Authorization: Bearer <YOUR_JWT_TOKEN>'",
        "-H 'Accept: application/a-gzip'",
        "--output report.gz",
        "&& gunzip report.gz",
        "&& cat report",
      ].join(" \\\n  ");

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Finance reports return gzipped TSV data that requires binary handling. Use the curl command below to download and decompress the report.",
                parameters: {
                  regionCode: region_code,
                  reportType: report_type,
                  reportDate: report_date,
                  vendorNumber: vendor_number,
                },
                curl: curlCommand,
                notes: [
                  "Replace <YOUR_JWT_TOKEN> with a valid App Store Connect JWT.",
                  "The output is a TSV (tab-separated values) file.",
                  "Finance reports are typically available around the 5th of the following month.",
                  "Use report_date in YYYY-MM format (not YYYY-MM-DD).",
                ],
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
  // SCM (Source Control) Repositories
  // ═══════════════════════════════════════════════════════════════════

  // ─── List Repositories ────────────────────────────────────────────

  server.tool(
    "asc_list_repositories",
    "List SCM repositories connected to Xcode Cloud",
    {},
    async () => {
      const result = await ascFetch("/scmRepositories", {
        limit: "50",
      });

      const repos = (result.data ?? []).map((r: any) => ({
        id: r.id,
        httpCloneUrl: r.attributes?.httpCloneUrl,
        sshCloneUrl: r.attributes?.sshCloneUrl,
        ownerName: r.attributes?.ownerName,
        repositoryName: r.attributes?.repositoryName,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(repos, null, 2),
          },
        ],
      };
    }
  );

  // ─── List Git References ──────────────────────────────────────────

  server.tool(
    "asc_list_git_refs",
    "List branches and tags for an SCM repository connected to Xcode Cloud",
    {
      repo_id: z
        .string()
        .describe("SCM repository ID (from asc_list_repositories)"),
      kind: z
        .enum(["BRANCH", "TAG"])
        .optional()
        .describe("Filter by reference kind (BRANCH or TAG)"),
      limit: z
        .number()
        .optional()
        .describe("Max references to return (default: 50)"),
    },
    async ({ repo_id, kind, limit }) => {
      const params: Record<string, string> = {
        limit: String(limit ?? 50),
      };
      if (kind) params["filter[kind]"] = kind;

      const result = await ascFetch(
        `/scmRepositories/${repo_id}/gitReferences`,
        params
      );

      const refs = (result.data ?? []).map((r: any) => ({
        id: r.id,
        name: r.attributes?.name,
        kind: r.attributes?.kind,
        canonicalName: r.attributes?.canonicalName,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(refs, null, 2),
          },
        ],
      };
    }
  );
}
