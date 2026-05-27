import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";

export function register(server: McpServer) {
  // ═══════════════════════════════════════════════════════════════════
  // In-App Purchases
  // ═══════════════════════════════════════════════════════════════════

  // ─── List In-App Purchases ──────────────────────────────────────

  server.tool(
    "asc_list_iaps",
    "List in-app purchases for an app. Returns id, name, productId, type, state, and referenceName.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
    },
    async ({ app_id }) => {
      const result = await ascFetch(`/apps/${app_id}/inAppPurchasesV2`, {
        limit: "200",
      });

      const iaps = (result.data ?? []).map((iap: any) => ({
        id: iap.id,
        name: iap.attributes?.name,
        productId: iap.attributes?.productId,
        inAppPurchaseType: iap.attributes?.inAppPurchaseType,
        state: iap.attributes?.state,
        referenceName: iap.attributes?.referenceName,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(iaps, null, 2),
          },
        ],
      };
    }
  );

  // ─── Create In-App Purchase ─────────────────────────────────────

  server.tool(
    "asc_create_iap",
    "Create an in-app purchase for an app. Supports CONSUMABLE, NON_CONSUMABLE, and NON_RENEWING_SUBSCRIPTION types.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
      name: z.string().describe("Display name for the in-app purchase"),
      product_id: z
        .string()
        .describe("Unique product identifier (e.g. com.example.coins100)"),
      in_app_purchase_type: z
        .enum(["CONSUMABLE", "NON_CONSUMABLE", "NON_RENEWING_SUBSCRIPTION"])
        .describe("Type of in-app purchase"),
      reference_name: z
        .string()
        .optional()
        .describe("Internal reference name (visible only in ASC)"),
      review_note: z
        .string()
        .optional()
        .describe("Note for App Store reviewers"),
      family_sharable: z
        .boolean()
        .optional()
        .describe("Whether the purchase can be shared with Family Sharing"),
    },
    async ({
      app_id,
      name,
      product_id,
      in_app_purchase_type,
      reference_name,
      review_note,
      family_sharable,
    }) => {
      const attributes: Record<string, any> = {
        name,
        productId: product_id,
        inAppPurchaseType: in_app_purchase_type,
      };
      if (reference_name !== undefined) attributes.referenceName = reference_name;
      if (review_note !== undefined) attributes.reviewNote = review_note;
      if (family_sharable !== undefined) attributes.familySharable = family_sharable;

      const result = await ascFetch("/inAppPurchasesV2", undefined, {
        method: "POST",
        body: {
          data: {
            type: "inAppPurchases",
            attributes,
            relationships: {
              app: {
                data: { type: "apps", id: app_id },
              },
            },
          },
        },
      });

      const iap = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ In-app purchase created: ${name}`,
                id: iap.id,
                name: iap.attributes?.name,
                productId: iap.attributes?.productId,
                inAppPurchaseType: iap.attributes?.inAppPurchaseType,
                state: iap.attributes?.state,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update In-App Purchase ─────────────────────────────────────

  server.tool(
    "asc_update_iap",
    "Update an existing in-app purchase. Only provided fields are changed.",
    {
      iap_id: z
        .string()
        .describe("In-app purchase ID (from asc_list_iaps)"),
      name: z.string().optional().describe("New display name"),
      reference_name: z
        .string()
        .optional()
        .describe("New internal reference name"),
      review_note: z
        .string()
        .optional()
        .describe("New note for App Store reviewers"),
      family_sharable: z
        .boolean()
        .optional()
        .describe("Whether the purchase can be shared with Family Sharing"),
    },
    async ({ iap_id, name, reference_name, review_note, family_sharable }) => {
      const attributes: Record<string, any> = {};
      if (name !== undefined) attributes.name = name;
      if (reference_name !== undefined) attributes.referenceName = reference_name;
      if (review_note !== undefined) attributes.reviewNote = review_note;
      if (family_sharable !== undefined) attributes.familySharable = family_sharable;

      const result = await ascFetch(`/inAppPurchasesV2/${iap_id}`, undefined, {
        method: "PATCH",
        body: {
          data: {
            type: "inAppPurchases",
            id: iap_id,
            attributes,
          },
        },
      });

      const iap = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ In-app purchase updated: ${iap.attributes?.name}`,
                id: iap.id,
                name: iap.attributes?.name,
                productId: iap.attributes?.productId,
                state: iap.attributes?.state,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete In-App Purchase ─────────────────────────────────────

  server.tool(
    "asc_delete_iap",
    "Delete an in-app purchase. Warning: this cannot be undone.",
    {
      iap_id: z
        .string()
        .describe("In-app purchase ID (from asc_list_iaps)"),
    },
    async ({ iap_id }) => {
      await ascFetch(`/inAppPurchasesV2/${iap_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { message: `✅ In-app purchase deleted: ${iap_id}` },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── List IAP Localizations ─────────────────────────────────────

  server.tool(
    "asc_list_iap_localizations",
    "List localizations for an in-app purchase. Shows name, description, and locale for each localization.",
    {
      iap_id: z
        .string()
        .describe("In-app purchase ID (from asc_list_iaps)"),
    },
    async ({ iap_id }) => {
      const result = await ascFetch(
        `/inAppPurchasesV2/${iap_id}/inAppPurchaseLocalizations`
      );

      const localizations = (result.data ?? []).map((loc: any) => ({
        id: loc.id,
        locale: loc.attributes?.locale,
        name: loc.attributes?.name,
        description: loc.attributes?.description,
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

  // ─── Set IAP Localization (Create or Update) ───────────────────

  server.tool(
    "asc_set_iap_localization",
    "Create or update a localization for an in-app purchase. Provide localization_id to update an existing one, or iap_id + locale to create a new one.",
    {
      iap_id: z
        .string()
        .optional()
        .describe(
          "In-app purchase ID — required when creating a new localization"
        ),
      localization_id: z
        .string()
        .optional()
        .describe(
          "Localization ID — provide to update an existing localization (from asc_list_iap_localizations)"
        ),
      locale: z
        .string()
        .optional()
        .describe("Locale code (e.g. en-US) — required when creating"),
      name: z
        .string()
        .optional()
        .describe("Localized display name for the IAP"),
      description: z
        .string()
        .optional()
        .describe("Localized description for the IAP"),
    },
    async ({ iap_id, localization_id, locale, name, description }) => {
      const attributes: Record<string, any> = {};
      if (name !== undefined) attributes.name = name;
      if (description !== undefined) attributes.description = description;

      if (localization_id) {
        // Update existing localization
        const result = await ascFetch(
          `/inAppPurchaseLocalizations/${localization_id}`,
          undefined,
          {
            method: "PATCH",
            body: {
              data: {
                type: "inAppPurchaseLocalizations",
                id: localization_id,
                attributes,
              },
            },
          }
        );

        const loc = result.data;
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `✅ IAP localization updated (${loc.attributes?.locale})`,
                  id: loc.id,
                  locale: loc.attributes?.locale,
                  name: loc.attributes?.name,
                  description: loc.attributes?.description,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Create new localization
      if (!iap_id) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: iap_id is required when creating a new localization",
            },
          ],
        };
      }
      if (!locale) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: locale is required when creating a new localization",
            },
          ],
        };
      }

      attributes.locale = locale;

      const result = await ascFetch(
        "/inAppPurchaseLocalizations",
        undefined,
        {
          method: "POST",
          body: {
            data: {
              type: "inAppPurchaseLocalizations",
              attributes,
              relationships: {
                inAppPurchaseV2: {
                  data: { type: "inAppPurchases", id: iap_id },
                },
              },
            },
          },
        }
      );

      const loc = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ IAP localization created (${loc.attributes?.locale})`,
                id: loc.id,
                locale: loc.attributes?.locale,
                name: loc.attributes?.name,
                description: loc.attributes?.description,
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
  // Subscription Groups
  // ═══════════════════════════════════════════════════════════════════

  // ─── List Subscription Groups ───────────────────────────────────

  server.tool(
    "asc_list_subscription_groups",
    "List subscription groups for an app. Returns id and referenceName for each group.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
    },
    async ({ app_id }) => {
      const result = await ascFetch(
        `/apps/${app_id}/subscriptionGroups`,
        { limit: "200" }
      );

      const groups = (result.data ?? []).map((g: any) => ({
        id: g.id,
        referenceName: g.attributes?.referenceName,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(groups, null, 2),
          },
        ],
      };
    }
  );

  // ─── Create Subscription Group ──────────────────────────────────

  server.tool(
    "asc_create_subscription_group",
    "Create a subscription group for an app. Subscriptions within a group are mutually exclusive.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
      reference_name: z
        .string()
        .describe(
          "Internal reference name for the group (visible only in ASC)"
        ),
    },
    async ({ app_id, reference_name }) => {
      const result = await ascFetch("/subscriptionGroups", undefined, {
        method: "POST",
        body: {
          data: {
            type: "subscriptionGroups",
            attributes: {
              referenceName: reference_name,
            },
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
                message: `✅ Subscription group created: ${reference_name}`,
                id: group.id,
                referenceName: group.attributes?.referenceName,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Subscription Group ──────────────────────────────────

  server.tool(
    "asc_delete_subscription_group",
    "Delete a subscription group. All subscriptions in the group must be deleted first.",
    {
      group_id: z
        .string()
        .describe(
          "Subscription group ID (from asc_list_subscription_groups)"
        ),
    },
    async ({ group_id }) => {
      await ascFetch(`/subscriptionGroups/${group_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { message: `✅ Subscription group deleted: ${group_id}` },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ═══════════════════════════════════════════════════════════════════
  // Subscriptions
  // ═══════════════════════════════════════════════════════════════════

  // ─── List Subscriptions ─────────────────────────────────────────

  server.tool(
    "asc_list_subscriptions",
    "List subscriptions in a subscription group. Returns id, name, productId, state, and subscriptionPeriod.",
    {
      group_id: z
        .string()
        .describe(
          "Subscription group ID (from asc_list_subscription_groups)"
        ),
    },
    async ({ group_id }) => {
      const result = await ascFetch(
        `/subscriptionGroups/${group_id}/subscriptions`,
        { limit: "200" }
      );

      const subscriptions = (result.data ?? []).map((sub: any) => ({
        id: sub.id,
        name: sub.attributes?.name,
        productId: sub.attributes?.productId,
        state: sub.attributes?.state,
        subscriptionPeriod: sub.attributes?.subscriptionPeriod,
        groupLevel: sub.attributes?.groupLevel,
        familySharable: sub.attributes?.familySharable,
        referenceName: sub.attributes?.referenceName,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(subscriptions, null, 2),
          },
        ],
      };
    }
  );

  // ─── Create Subscription ────────────────────────────────────────

  server.tool(
    "asc_create_subscription",
    "Create a subscription within a subscription group. Specify the billing period and optional group level for upgrade/downgrade ordering.",
    {
      group_id: z
        .string()
        .describe(
          "Subscription group ID (from asc_list_subscription_groups)"
        ),
      name: z.string().describe("Display name for the subscription"),
      product_id: z
        .string()
        .describe(
          "Unique product identifier (e.g. com.example.pro.monthly)"
        ),
      subscription_period: z
        .enum([
          "ONE_WEEK",
          "ONE_MONTH",
          "TWO_MONTHS",
          "THREE_MONTHS",
          "SIX_MONTHS",
          "ONE_YEAR",
        ])
        .describe("Billing period for the subscription"),
      reference_name: z
        .string()
        .optional()
        .describe("Internal reference name (visible only in ASC)"),
      review_note: z
        .string()
        .optional()
        .describe("Note for App Store reviewers"),
      family_sharable: z
        .boolean()
        .optional()
        .describe("Whether the subscription can be shared with Family Sharing"),
      group_level: z
        .number()
        .optional()
        .describe(
          "Level within the group for upgrade/downgrade ordering (1 = highest tier)"
        ),
    },
    async ({
      group_id,
      name,
      product_id,
      subscription_period,
      reference_name,
      review_note,
      family_sharable,
      group_level,
    }) => {
      const attributes: Record<string, any> = {
        name,
        productId: product_id,
        subscriptionPeriod: subscription_period,
      };
      if (reference_name !== undefined) attributes.referenceName = reference_name;
      if (review_note !== undefined) attributes.reviewNote = review_note;
      if (family_sharable !== undefined) attributes.familySharable = family_sharable;
      if (group_level !== undefined) attributes.groupLevel = group_level;

      const result = await ascFetch("/subscriptions", undefined, {
        method: "POST",
        body: {
          data: {
            type: "subscriptions",
            attributes,
            relationships: {
              group: {
                data: { type: "subscriptionGroups", id: group_id },
              },
            },
          },
        },
      });

      const sub = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Subscription created: ${name}`,
                id: sub.id,
                name: sub.attributes?.name,
                productId: sub.attributes?.productId,
                subscriptionPeriod: sub.attributes?.subscriptionPeriod,
                state: sub.attributes?.state,
                groupLevel: sub.attributes?.groupLevel,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update Subscription ────────────────────────────────────────

  server.tool(
    "asc_update_subscription",
    "Update an existing subscription. Only provided fields are changed.",
    {
      subscription_id: z
        .string()
        .describe("Subscription ID (from asc_list_subscriptions)"),
      name: z.string().optional().describe("New display name"),
      reference_name: z
        .string()
        .optional()
        .describe("New internal reference name"),
      review_note: z
        .string()
        .optional()
        .describe("New note for App Store reviewers"),
      family_sharable: z
        .boolean()
        .optional()
        .describe("Whether the subscription can be shared with Family Sharing"),
      group_level: z
        .number()
        .optional()
        .describe(
          "New level within the group for upgrade/downgrade ordering"
        ),
    },
    async ({
      subscription_id,
      name,
      reference_name,
      review_note,
      family_sharable,
      group_level,
    }) => {
      const attributes: Record<string, any> = {};
      if (name !== undefined) attributes.name = name;
      if (reference_name !== undefined) attributes.referenceName = reference_name;
      if (review_note !== undefined) attributes.reviewNote = review_note;
      if (family_sharable !== undefined) attributes.familySharable = family_sharable;
      if (group_level !== undefined) attributes.groupLevel = group_level;

      const result = await ascFetch(
        `/subscriptions/${subscription_id}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "subscriptions",
              id: subscription_id,
              attributes,
            },
          },
        }
      );

      const sub = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Subscription updated: ${sub.attributes?.name}`,
                id: sub.id,
                name: sub.attributes?.name,
                productId: sub.attributes?.productId,
                subscriptionPeriod: sub.attributes?.subscriptionPeriod,
                state: sub.attributes?.state,
                groupLevel: sub.attributes?.groupLevel,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Subscription ────────────────────────────────────────

  server.tool(
    "asc_delete_subscription",
    "Delete a subscription. Warning: this cannot be undone.",
    {
      subscription_id: z
        .string()
        .describe("Subscription ID (from asc_list_subscriptions)"),
    },
    async ({ subscription_id }) => {
      await ascFetch(`/subscriptions/${subscription_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { message: `✅ Subscription deleted: ${subscription_id}` },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── List Subscription Localizations ────────────────────────────

  server.tool(
    "asc_list_subscription_localizations",
    "List localizations for a subscription. Shows name, description, and locale for each localization.",
    {
      subscription_id: z
        .string()
        .describe("Subscription ID (from asc_list_subscriptions)"),
    },
    async ({ subscription_id }) => {
      const result = await ascFetch(
        `/subscriptions/${subscription_id}/subscriptionLocalizations`
      );

      const localizations = (result.data ?? []).map((loc: any) => ({
        id: loc.id,
        locale: loc.attributes?.locale,
        name: loc.attributes?.name,
        description: loc.attributes?.description,
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

  // ─── Set Subscription Localization (Create or Update) ──────────

  server.tool(
    "asc_set_subscription_localization",
    "Create or update a localization for a subscription. Provide localization_id to update an existing one, or subscription_id + locale to create a new one.",
    {
      subscription_id: z
        .string()
        .optional()
        .describe(
          "Subscription ID — required when creating a new localization"
        ),
      localization_id: z
        .string()
        .optional()
        .describe(
          "Localization ID — provide to update an existing localization (from asc_list_subscription_localizations)"
        ),
      locale: z
        .string()
        .optional()
        .describe("Locale code (e.g. en-US) — required when creating"),
      name: z
        .string()
        .optional()
        .describe("Localized display name for the subscription"),
      description: z
        .string()
        .optional()
        .describe("Localized description for the subscription"),
    },
    async ({ subscription_id, localization_id, locale, name, description }) => {
      const attributes: Record<string, any> = {};
      if (name !== undefined) attributes.name = name;
      if (description !== undefined) attributes.description = description;

      if (localization_id) {
        // Update existing localization
        const result = await ascFetch(
          `/subscriptionLocalizations/${localization_id}`,
          undefined,
          {
            method: "PATCH",
            body: {
              data: {
                type: "subscriptionLocalizations",
                id: localization_id,
                attributes,
              },
            },
          }
        );

        const loc = result.data;
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `✅ Subscription localization updated (${loc.attributes?.locale})`,
                  id: loc.id,
                  locale: loc.attributes?.locale,
                  name: loc.attributes?.name,
                  description: loc.attributes?.description,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Create new localization
      if (!subscription_id) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: subscription_id is required when creating a new localization",
            },
          ],
        };
      }
      if (!locale) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: locale is required when creating a new localization",
            },
          ],
        };
      }

      attributes.locale = locale;

      const result = await ascFetch(
        "/subscriptionLocalizations",
        undefined,
        {
          method: "POST",
          body: {
            data: {
              type: "subscriptionLocalizations",
              attributes,
              relationships: {
                subscription: {
                  data: { type: "subscriptions", id: subscription_id },
                },
              },
            },
          },
        }
      );

      const loc = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Subscription localization created (${loc.attributes?.locale})`,
                id: loc.id,
                locale: loc.attributes?.locale,
                name: loc.attributes?.name,
                description: loc.attributes?.description,
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
