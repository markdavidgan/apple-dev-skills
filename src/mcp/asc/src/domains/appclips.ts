import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";
import { createHash } from "crypto";
import * as fs from "fs";
import * as path from "path";

// ═══════════════════════════════════════════════════════════════════
// App Clip Experiences
//
// Two layers exist on the App Store Connect API, and they are easy to
// conflate:
//
//   • A *bundle ID* with the App Clip capability — registered in the
//     Developer Portal (asc_register_bundle_id / asc_list_bundle_ids).
//     This is just the identity the clip target signs with.
//
//   • An *App Clip Experience* — the URL→card association Apple actually
//     serves when someone taps an invocation link or scans a code. THIS
//     is what these tools manage.
//
// Within experiences there are two kinds:
//
//   • DEFAULT experiences are tied to an App Store version
//     (releaseWithAppStoreVersion) — they ship with the app.
//
//   • ADVANCED experiences map a *specific full URL* (e.g.
//     https://keepnear.app/invite) to its own card, independent of any
//     App Store version. They can be created and edited standalone, with
//     no version and no build relationship in the request body.
//
// PRECONDITION (both kinds): an `appClips` resource only exists once a
// processed build that *contains the clip target* has been delivered to
// ASC. Until then `asc_list_app_clips` returns an empty array and there
// is no `appClip` id to attach an experience to. Registering the clip's
// bundle ID is not enough — the binary has to carry the clip.
//
// Header image spec: 3000×2000 px (Apple accepts the 1800×1200 family as
// well); PNG/JPEG, no alpha.
// ═══════════════════════════════════════════════════════════════════

// ── Shared upload helper (reserve → chunk PUT → commit) ─────────────
// Mirrors screenshots.ts; duplicated here so this domain stays
// self-contained and the screenshots module keeps a single responsibility.

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
  // ─── List App Clips ─────────────────────────────────────────────

  server.tool(
    "asc_list_app_clips",
    "List the App Clip targets ASC knows about for an app. These only appear after a processed build containing the clip target has been delivered — an empty result means no such build has been uploaded yet (registering the clip's bundle ID alone is not enough). Each entry's id is the `appClip` you attach experiences to.",
    {
      app_id: z
        .string()
        .describe("App Store Connect app resource ID (from asc_list_apps)"),
    },
    async ({ app_id }) => {
      const result = await ascFetch(`/apps/${app_id}/appClips`, {
        limit: "200",
        "fields[appClips]": "bundleId,appClipDefaultExperiences",
      });

      const clips = (result.data ?? []).map((c: any) => ({
        id: c.id,
        bundleId: c.attributes?.bundleId,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              clips.length
                ? clips
                : {
                    message:
                      "No App Clips found for this app. Upload a processed build that contains the App Clip target first — the clip's bundle ID being registered is not sufficient.",
                  },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── List Advanced Experiences ──────────────────────────────────

  server.tool(
    "asc_list_advanced_experiences",
    "List the App Clip Advanced Experiences for a clip (the standalone URL→card associations, e.g. https://keepnear.app/invite). Includes their link, status, action, and default language. Advanced experiences hang off the App Clip, not the app — pass the appClip id from asc_list_app_clips.",
    {
      app_clip_id: z
        .string()
        .describe("The appClip resource id (from asc_list_app_clips)"),
      include_localizations: z
        .boolean()
        .default(false)
        .describe("Also fetch each experience's localizations (title/subtitle)"),
    },
    async ({ app_clip_id, include_localizations }) => {
      const params: Record<string, string> = {
        limit: "200",
        "fields[appClipAdvancedExperiences]":
          "link,version,status,action,placeStatus,isPoweredBy,defaultLanguage,localizations",
      };
      if (include_localizations) {
        params.include = "localizations";
        params["fields[appClipAdvancedExperienceLocalizations]"] =
          "language,title,subtitle";
      }

      const result = await ascFetch(
        `/appClips/${app_clip_id}/appClipAdvancedExperiences`,
        params
      );

      const experiences = (result.data ?? []).map((e: any) => ({
        id: e.id,
        link: e.attributes?.link,
        status: e.attributes?.status,
        action: e.attributes?.action,
        defaultLanguage: e.attributes?.defaultLanguage,
        isPoweredBy: e.attributes?.isPoweredBy,
        version: e.attributes?.version,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                experiences,
                included: include_localizations ? result.included ?? [] : undefined,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Reserve + Upload Advanced Experience Header Image ──────────

  server.tool(
    "asc_upload_advanced_experience_image",
    "Upload a header image for an App Clip Advanced Experience card from a local file path. Handles the full multi-step upload (reserve → chunk PUT → commit) and returns the committed image id to pass as header_image_id when creating/updating an experience. Spec: 3000×2000 px (1800×1200 family also accepted), PNG/JPEG, no alpha.",
    {
      file_path: z
        .string()
        .describe("Absolute path to the header image file (PNG or JPEG, no alpha)"),
    },
    async ({ file_path }) => {
      if (!fs.existsSync(file_path)) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({ error: `File not found: ${file_path}` }, null, 2),
            },
          ],
        };
      }

      const fileBuffer = fs.readFileSync(file_path);
      const fileSize = fs.statSync(file_path).size;
      const fileName = path.basename(file_path);
      const md5 = computeMd5(fileBuffer);

      // Step 1: Reserve the image resource (no relationships — the image is
      // referenced by the experience create/update request afterward).
      const createResult = await ascFetch(
        "/appClipAdvancedExperienceImages",
        undefined,
        {
          method: "POST",
          body: {
            data: {
              type: "appClipAdvancedExperienceImages",
              attributes: { fileName, fileSize },
            },
          },
        }
      );

      const image = createResult.data;
      const imageId = image.id;
      const uploadOps = image.attributes?.uploadOperations ?? [];

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
                  imageId,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Step 3: Commit
      const commitResult = await ascFetch(
        `/appClipAdvancedExperienceImages/${imageId}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "appClipAdvancedExperienceImages",
              id: imageId,
              attributes: { uploaded: true, sourceFileChecksum: md5 },
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
                message: `✅ Advanced experience header image uploaded: ${fileName}`,
                id: committed.id,
                header_image_id: committed.id,
                assetDeliveryState: committed.attributes?.assetDeliveryState,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Create Advanced Experience ─────────────────────────────────

  server.tool(
    "asc_create_advanced_experience",
    "Create an App Clip Advanced Experience: map a specific full URL (e.g. https://keepnear.app/invite) to its own clip card. Standalone — no App Store version or build relationship is needed in the request, only a processed build containing the clip (so an `appClip` id exists). Localizations are sent inline; each carries a title and optional subtitle.",
    {
      app_clip_id: z
        .string()
        .describe("The appClip resource id (from asc_list_app_clips)"),
      link: z
        .string()
        .describe(
          "The exact invocation URL this card serves, e.g. https://keepnear.app/invite"
        ),
      default_language: z
        .string()
        .describe(
          'Default language code for the experience, e.g. "EN" (App Clip language enum — uppercase ISO-ish, EN, FR, DE, ES, JA …)'
        ),
      header_image_id: z
        .string()
        .describe(
          "Committed header image id from asc_upload_advanced_experience_image"
        ),
      localizations: z
        .array(
          z.object({
            language: z
              .string()
              .describe('Language code, e.g. "EN" — must include default_language'),
            title: z.string().describe("Card title (App Clip language enum value)"),
            subtitle: z.string().optional().describe("Card subtitle"),
          })
        )
        .min(1)
        .describe(
          "One entry per language; must include the default_language. Title/subtitle are the card copy."
        ),
      action: z
        .enum(["OPEN", "VIEW", "PLAY"])
        .default("OPEN")
        .describe("Card call-to-action verb"),
      business_category: z
        .string()
        .optional()
        .describe(
          "Optional business category enum (used for place-based experiences; omit for plain link cards)"
        ),
      is_powered_by: z
        .boolean()
        .default(false)
        .describe('Whether to show Apple\'s "Powered by" attribution row'),
    },
    async ({
      app_clip_id,
      link,
      default_language,
      header_image_id,
      localizations,
      action,
      business_category,
      is_powered_by,
    }) => {
      const attributes: Record<string, any> = {
        link,
        action,
        defaultLanguage: default_language,
        isPoweredBy: is_powered_by,
      };
      if (business_category) attributes.businessCategory = business_category;

      // Localizations ride inline in the top-level `included` array and are
      // linked from the experience's `localizations` relationship by
      // client-supplied temp ids. Per Apple's schema the inline localization
      // carries only language/title/subtitle — the header image is a
      // top-level `headerImage` relationship, NOT a per-localization one.
      const included = localizations.map((loc) => ({
        type: "appClipAdvancedExperienceLocalizations",
        id: `loc-${loc.language}`,
        attributes: {
          language: loc.language,
          title: loc.title,
          ...(loc.subtitle ? { subtitle: loc.subtitle } : {}),
        },
      }));

      const result = await ascFetch("/appClipAdvancedExperiences", undefined, {
        method: "POST",
        body: {
          data: {
            type: "appClipAdvancedExperiences",
            attributes,
            relationships: {
              appClip: {
                data: { type: "appClips", id: app_clip_id },
              },
              headerImage: {
                data: {
                  type: "appClipAdvancedExperienceImages",
                  id: header_image_id,
                },
              },
              localizations: {
                data: included.map((l) => ({ type: l.type, id: l.id })),
              },
            },
          },
          included,
        },
      });

      const exp = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ App Clip Advanced Experience created for ${link}`,
                id: exp.id,
                link: exp.attributes?.link,
                status: exp.attributes?.status,
                action: exp.attributes?.action,
                defaultLanguage: exp.attributes?.defaultLanguage,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Update Advanced Experience ─────────────────────────────────

  server.tool(
    "asc_update_advanced_experience",
    "Update an existing App Clip Advanced Experience — change its action, default language, Powered-by row, or mark it removed (action removal is done by setting `removed: true`). Does not edit localizations or the header image.",
    {
      experience_id: z
        .string()
        .describe("The appClipAdvancedExperience id (from asc_list_advanced_experiences)"),
      action: z
        .enum(["OPEN", "VIEW", "PLAY"])
        .optional()
        .describe("New call-to-action verb"),
      default_language: z
        .string()
        .optional()
        .describe("New default language code"),
      is_powered_by: z
        .boolean()
        .optional()
        .describe('Toggle Apple\'s "Powered by" attribution row'),
      removed: z
        .boolean()
        .optional()
        .describe("Set true to remove (deactivate) this experience"),
    },
    async ({ experience_id, action, default_language, is_powered_by, removed }) => {
      const attributes: Record<string, any> = {};
      if (action !== undefined) attributes.action = action;
      if (default_language !== undefined) attributes.defaultLanguage = default_language;
      if (is_powered_by !== undefined) attributes.isPoweredBy = is_powered_by;
      if (removed !== undefined) attributes.removed = removed;

      const result = await ascFetch(
        `/appClipAdvancedExperiences/${experience_id}`,
        undefined,
        {
          method: "PATCH",
          body: {
            data: {
              type: "appClipAdvancedExperiences",
              id: experience_id,
              attributes,
            },
          },
        }
      );

      const exp = result.data;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `✅ App Clip Advanced Experience updated: ${experience_id}`,
                id: exp?.id,
                link: exp?.attributes?.link,
                status: exp?.attributes?.status,
                action: exp?.attributes?.action,
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
