import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";

export function register(server: McpServer) {
  // ─── Register Bundle ID ──────────────────────────────────────────

  server.tool(
    "asc_register_bundle_id",
    "Register a new bundle ID in the Apple Developer Portal",
    {
      identifier: z
        .string()
        .describe("Bundle identifier (e.g. com.example.myapp)"),
      name: z
        .string()
        .describe("Human-readable name for the bundle ID (e.g. My App)"),
      platform: z
        .enum(["UNIVERSAL", "IOS", "MAC_OS"])
        .default("UNIVERSAL")
        .describe("Platform for the bundle ID"),
    },
    async ({ identifier, name, platform }) => {
      const result = await ascFetch("/bundleIds", undefined, {
        method: "POST",
        body: {
          data: {
            type: "bundleIds",
            attributes: {
              identifier,
              name,
              platform,
            },
          },
        },
      });

      const bundleId = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Bundle ID registered: ${identifier}`,
                id: bundleId.id,
                identifier: bundleId.attributes?.identifier,
                name: bundleId.attributes?.name,
                platform: bundleId.attributes?.platform,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Bundle ID ────────────────────────────────────────────

  server.tool(
    "asc_delete_bundle_id",
    "Delete a bundle ID from the Apple Developer Portal",
    {
      bundle_id_id: z
        .string()
        .describe(
          "Resource ID of the bundle ID to delete (not the identifier string — use asc_list_bundle_ids to find it)"
        ),
    },
    async ({ bundle_id_id }) => {
      await ascFetch(`/bundleIds/${bundle_id_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Bundle ID deleted: ${bundle_id_id}`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── List Devices ────────────────────────────────────────────────

  server.tool(
    "asc_list_devices",
    "List devices registered in the Apple Developer Portal",
    {
      platform: z
        .enum(["IOS", "MAC_OS", "UNIVERSAL"])
        .optional()
        .describe("Filter by platform"),
      status: z
        .enum(["ENABLED", "DISABLED"])
        .optional()
        .describe("Filter by device status"),
      name: z.string().optional().describe("Filter by device name"),
    },
    async ({ platform, status, name }) => {
      const params: Record<string, string> = { limit: "200" };
      if (platform) params["filter[platform]"] = platform;
      if (status) params["filter[status]"] = status;
      if (name) params["filter[name]"] = name;

      const result = await ascFetch("/devices", params);
      const devices = (result.data ?? []).map((d: any) => ({
        id: d.id,
        name: d.attributes?.name,
        udid: d.attributes?.udid,
        deviceClass: d.attributes?.deviceClass,
        model: d.attributes?.model,
        platform: d.attributes?.platform,
        status: d.attributes?.status,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(devices, null, 2),
          },
        ],
      };
    }
  );

  // ─── Register Device ─────────────────────────────────────────────

  server.tool(
    "asc_register_device",
    "Register a new device in the Apple Developer Portal",
    {
      name: z.string().describe("A name for the device (e.g. Mark's iPhone)"),
      udid: z.string().describe("The device UDID"),
      platform: z
        .enum(["IOS", "MAC_OS", "UNIVERSAL"])
        .default("IOS")
        .describe("Device platform"),
    },
    async ({ name, udid, platform }) => {
      const result = await ascFetch("/devices", undefined, {
        method: "POST",
        body: {
          data: {
            type: "devices",
            attributes: {
              name,
              udid,
              platform,
            },
          },
        },
      });

      const device = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Device registered: ${name}`,
                id: device.id,
                name: device.attributes?.name,
                udid: device.attributes?.udid,
                deviceClass: device.attributes?.deviceClass,
                model: device.attributes?.model,
                platform: device.attributes?.platform,
                status: device.attributes?.status,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update Device ───────────────────────────────────────────────

  server.tool(
    "asc_update_device",
    "Update a registered device's name or status (enable/disable)",
    {
      device_id: z
        .string()
        .describe("Resource ID of the device (from asc_list_devices)"),
      name: z.string().optional().describe("New device name"),
      status: z
        .enum(["ENABLED", "DISABLED"])
        .optional()
        .describe("New device status"),
    },
    async ({ device_id, name, status }) => {
      const attributes: Record<string, string> = {};
      if (name) attributes.name = name;
      if (status) attributes.status = status;

      const result = await ascFetch(`/devices/${device_id}`, undefined, {
        method: "PATCH",
        body: {
          data: {
            type: "devices",
            id: device_id,
            attributes,
          },
        },
      });

      const device = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Device updated: ${device.attributes?.name}`,
                id: device.id,
                name: device.attributes?.name,
                udid: device.attributes?.udid,
                platform: device.attributes?.platform,
                status: device.attributes?.status,
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
