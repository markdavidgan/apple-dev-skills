import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";
import { createHash } from "crypto";
import * as fs from "fs";
import * as path from "path";

// ═══════════════════════════════════════════════════════════════════
// Helper: multi-step upload (create → chunk upload → commit)
// ═══════════════════════════════════════════════════════════════════

async function uploadChunks(
  uploadOperations: Array<{
    method: string;
    url: string;
    length: number;
    offset: number;
    requestHeaders: Array<{ name: string; value: string }>;
  }>,
  fileBuffer: Buffer
): Promise<void> {
  for (const op of uploadOperations) {
    const slice = fileBuffer.subarray(op.offset, op.offset + op.length);
    // Copy into a fresh ArrayBuffer for Blob/fetch compatibility
    const ab = new ArrayBuffer(slice.byteLength);
    new Uint8Array(ab).set(slice);
    const blob = new Blob([ab]);
    const headers: Record<string, string> = Object.fromEntries(
      op.requestHeaders.map((h) => [h.name, h.value])
    );

    const response = await fetch(op.url, {
      method: op.method,
      headers,
      body: blob,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Upload chunk failed (offset ${op.offset}, length ${op.length}): ${response.status} — ${body}`
      );
    }
  }
}

function computeMd5(buffer: Buffer): string {
  return createHash("md5").update(buffer).digest("hex");
}

export function register(server: McpServer) {
  // ─── Create Screenshot Set ──────────────────────────────────────

  server.tool(
    "asc_create_screenshot_set",
    "Create a screenshot set for an App Store version localization. Use screenshotDisplayType like APP_IPHONE_67, APP_IPHONE_65, APP_IPAD_PRO_3GEN_129, APP_APPLE_WATCH_ULTRA, etc.",
    {
      localization_id: z
        .string()
        .describe(
          "App Store version localization ID (from asc_list_versions with include=localizations)"
        ),
      screenshot_display_type: z
        .string()
        .describe(
          'Screenshot display type (e.g. "APP_IPHONE_67", "APP_IPHONE_65", "APP_IPAD_PRO_3GEN_129", "APP_APPLE_WATCH_ULTRA")'
        ),
    },
    async ({ localization_id, screenshot_display_type }) => {
      const result = await ascFetch("/appScreenshotSets", undefined, {
        method: "POST",
        body: {
          data: {
            type: "appScreenshotSets",
            attributes: {
              screenshotDisplayType: screenshot_display_type,
            },
            relationships: {
              appStoreVersionLocalization: {
                data: {
                  type: "appStoreVersionLocalizations",
                  id: localization_id,
                },
              },
            },
          },
        },
      });

      const set = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Screenshot set created`,
                id: set.id,
                screenshotDisplayType:
                  set.attributes?.screenshotDisplayType,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Screenshot Set ──────────────────────────────────────

  server.tool(
    "asc_delete_screenshot_set",
    "Delete an entire screenshot set (and all screenshots within it)",
    {
      screenshot_set_id: z
        .string()
        .describe("Screenshot set ID to delete"),
    },
    async ({ screenshot_set_id }) => {
      await ascFetch(`/appScreenshotSets/${screenshot_set_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Screenshot set deleted: ${screenshot_set_id}`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Upload Screenshot ──────────────────────────────────────────

  server.tool(
    "asc_upload_screenshot",
    "Upload a screenshot image from a local file path to an App Store screenshot set. Handles the full multi-step upload: reserve → chunk upload → commit.",
    {
      screenshot_set_id: z
        .string()
        .describe("Screenshot set ID to upload into"),
      file_path: z
        .string()
        .describe(
          "Absolute path to the screenshot image file (PNG or JPEG)"
        ),
    },
    async ({ screenshot_set_id, file_path }) => {
      // Validate file exists
      if (!fs.existsSync(file_path)) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                { error: `File not found: ${file_path}` },
                null,
                2
              ),
            },
          ],
        };
      }

      const fileBuffer = fs.readFileSync(file_path);
      const fileSize = fs.statSync(file_path).size;
      const fileName = path.basename(file_path);
      const md5 = computeMd5(fileBuffer);

      // Step 1: Reserve the screenshot resource
      const createResult = await ascFetch("/appScreenshots", undefined, {
        method: "POST",
        body: {
          data: {
            type: "appScreenshots",
            attributes: {
              fileName,
              fileSize,
            },
            relationships: {
              appScreenshotSet: {
                data: {
                  type: "appScreenshotSets",
                  id: screenshot_set_id,
                },
              },
            },
          },
        },
      });

      const screenshot = createResult.data;
      const screenshotId = screenshot.id;
      const uploadOps =
        screenshot.attributes?.uploadOperations ?? [];

      // Step 2: Upload chunks
      try {
        await uploadChunks(uploadOps, fileBuffer);
      } catch (err: any) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  error: `Chunk upload failed for ${fileName}`,
                  detail: err.message,
                  screenshotId,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Step 3: Commit the upload
      const commitResult = await ascFetch(
        `/appScreenshots/${screenshotId}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "appScreenshots",
              id: screenshotId,
              attributes: {
                uploaded: true,
                sourceFileChecksum: md5,
              },
            },
          },
        }
      );

      const committed = commitResult.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Screenshot uploaded: ${fileName}`,
                id: committed.id,
                fileName: committed.attributes?.fileName,
                fileSize: committed.attributes?.fileSize,
                assetDeliveryState:
                  committed.attributes?.assetDeliveryState,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Screenshot ──────────────────────────────────────────

  server.tool(
    "asc_delete_screenshot",
    "Delete a single screenshot from a screenshot set",
    {
      screenshot_id: z
        .string()
        .describe("Screenshot ID to delete"),
    },
    async ({ screenshot_id }) => {
      await ascFetch(`/appScreenshots/${screenshot_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Screenshot deleted: ${screenshot_id}`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Reorder Screenshots ───────────────────────────────────────

  server.tool(
    "asc_reorder_screenshots",
    "Reorder screenshots within a screenshot set. Provide screenshot IDs in the desired display order.",
    {
      screenshot_set_id: z
        .string()
        .describe("Screenshot set ID containing the screenshots"),
      screenshot_ids: z
        .array(z.string())
        .describe(
          "Ordered array of screenshot IDs in the desired display order"
        ),
    },
    async ({ screenshot_set_id, screenshot_ids }) => {
      await ascFetch(
        `/appScreenshotSets/${screenshot_set_id}/relationships/appScreenshots`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: screenshot_ids.map((id) => ({
              type: "appScreenshots",
              id,
            })),
          },
        }
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Screenshots reordered in set ${screenshot_set_id}`,
                order: screenshot_ids,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Create Preview Set ─────────────────────────────────────────

  server.tool(
    "asc_create_preview_set",
    "Create an app preview (video) set for an App Store version localization. Use previewType like APP_IPHONE_67, APP_IPHONE_65, APP_IPAD_PRO_3GEN_129, etc.",
    {
      localization_id: z
        .string()
        .describe(
          "App Store version localization ID (from asc_list_versions with include=localizations)"
        ),
      preview_type: z
        .string()
        .describe(
          'Preview display type (e.g. "APP_IPHONE_67", "APP_IPHONE_65", "APP_IPAD_PRO_3GEN_129")'
        ),
    },
    async ({ localization_id, preview_type }) => {
      const result = await ascFetch("/appPreviewSets", undefined, {
        method: "POST",
        body: {
          data: {
            type: "appPreviewSets",
            attributes: {
              previewType: preview_type,
            },
            relationships: {
              appStoreVersionLocalization: {
                data: {
                  type: "appStoreVersionLocalizations",
                  id: localization_id,
                },
              },
            },
          },
        },
      });

      const set = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Preview set created`,
                id: set.id,
                previewType: set.attributes?.previewType,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Preview Set ─────────────────────────────────────────

  server.tool(
    "asc_delete_preview_set",
    "Delete an entire app preview set (and all previews within it)",
    {
      preview_set_id: z
        .string()
        .describe("Preview set ID to delete"),
    },
    async ({ preview_set_id }) => {
      await ascFetch(`/appPreviewSets/${preview_set_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Preview set deleted: ${preview_set_id}`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Upload Preview ─────────────────────────────────────────────

  server.tool(
    "asc_upload_preview",
    "Upload an app preview video from a local file path to an App Store preview set. Handles the full multi-step upload: reserve → chunk upload → commit.",
    {
      preview_set_id: z
        .string()
        .describe("Preview set ID to upload into"),
      file_path: z
        .string()
        .describe("Absolute path to the video file (e.g. MP4)"),
      mime_type: z
        .string()
        .default("video/mp4")
        .describe('MIME type of the video (default: "video/mp4")'),
      preview_frame_time_code: z
        .string()
        .optional()
        .describe(
          'Time code for the poster frame (e.g. "00:00:05;00"). Optional — Apple will auto-select if omitted.'
        ),
    },
    async ({
      preview_set_id,
      file_path,
      mime_type,
      preview_frame_time_code,
    }) => {
      // Validate file exists
      if (!fs.existsSync(file_path)) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                { error: `File not found: ${file_path}` },
                null,
                2
              ),
            },
          ],
        };
      }

      const fileBuffer = fs.readFileSync(file_path);
      const fileSize = fs.statSync(file_path).size;
      const fileName = path.basename(file_path);
      const md5 = computeMd5(fileBuffer);

      // Step 1: Reserve the preview resource
      const attributes: Record<string, any> = {
        fileName,
        fileSize,
        mimeType: mime_type,
      };
      if (preview_frame_time_code) {
        attributes.previewFrameTimeCode = preview_frame_time_code;
      }

      const createResult = await ascFetch("/appPreviews", undefined, {
        method: "POST",
        body: {
          data: {
            type: "appPreviews",
            attributes,
            relationships: {
              appPreviewSet: {
                data: {
                  type: "appPreviewSets",
                  id: preview_set_id,
                },
              },
            },
          },
        },
      });

      const preview = createResult.data;
      const previewId = preview.id;
      const uploadOps =
        preview.attributes?.uploadOperations ?? [];

      // Step 2: Upload chunks
      try {
        await uploadChunks(uploadOps, fileBuffer);
      } catch (err: any) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  error: `Chunk upload failed for ${fileName}`,
                  detail: err.message,
                  previewId,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Step 3: Commit the upload
      const commitResult = await ascFetch(
        `/appPreviews/${previewId}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "appPreviews",
              id: previewId,
              attributes: {
                uploaded: true,
                sourceFileChecksum: md5,
              },
            },
          },
        }
      );

      const committed = commitResult.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Preview uploaded: ${fileName}`,
                id: committed.id,
                fileName: committed.attributes?.fileName,
                fileSize: committed.attributes?.fileSize,
                mimeType: committed.attributes?.mimeType,
                assetDeliveryState:
                  committed.attributes?.assetDeliveryState,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Delete Preview ─────────────────────────────────────────────

  server.tool(
    "asc_delete_preview",
    "Delete a single app preview video from a preview set",
    {
      preview_id: z
        .string()
        .describe("Preview ID to delete"),
    },
    async ({ preview_id }) => {
      await ascFetch(`/appPreviews/${preview_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ Preview deleted: ${preview_id}`,
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
