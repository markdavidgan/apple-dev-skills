import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ascFetch } from "../api.js";

export function register(server: McpServer) {
  // ─── Update App Store Version ───────────────────────────────────

  server.tool(
    "asc_update_version",
    "Update App Store version attributes — version string, release type, or scheduled release date.",
    {
      version_id: z.string().describe("App Store Version ID (from asc_list_versions)"),
      version_string: z.string().optional().describe("New version string (e.g. '1.2.0')"),
      release_type: z
        .enum(["MANUAL", "AFTER_APPROVAL", "SCHEDULED"])
        .optional()
        .describe("Release type: MANUAL (you release it), AFTER_APPROVAL (auto), SCHEDULED (set date)"),
      earliest_release_date: z
        .string()
        .optional()
        .describe("Earliest release date in ISO 8601 format (required when release_type is SCHEDULED)"),
    },
    async ({ version_id, version_string, release_type, earliest_release_date }) => {
      const attrs: Record<string, string> = {};
      if (version_string !== undefined) attrs.versionString = version_string;
      if (release_type !== undefined) attrs.releaseType = release_type;
      if (earliest_release_date !== undefined) attrs.earliestReleaseDate = earliest_release_date;

      const result = await ascFetch(`/appStoreVersions/${version_id}`, undefined, {
        method: "PATCH",
        body: {
          data: {
            type: "appStoreVersions",
            id: version_id,
            attributes: attrs,
          },
        },
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ Updated version ${result.data?.attributes?.versionString ?? version_id}\nRelease type: ${result.data?.attributes?.releaseType ?? "unchanged"}`,
          },
        ],
      };
    }
  );

  // ─── Create Localization ────────────────────────────────────────

  server.tool(
    "asc_create_localization",
    "Create a new locale for an App Store version with metadata (description, keywords, what's new, etc.).",
    {
      version_id: z.string().describe("App Store Version ID (from asc_list_versions)"),
      locale: z.string().describe("Locale code (e.g. 'en-US', 'ja', 'de-DE')"),
      description: z.string().optional().describe("Full app description for this locale"),
      keywords: z.string().optional().describe("Comma-separated keywords (max 100 chars)"),
      whats_new: z.string().optional().describe("What's New text for this version"),
      promotional_text: z.string().optional().describe("Promotional text (updateable without new version)"),
      marketing_url: z.string().optional().describe("Marketing URL"),
      support_url: z.string().optional().describe("Support URL"),
    },
    async ({ version_id, locale, description, keywords, whats_new, promotional_text, marketing_url, support_url }) => {
      const attrs: Record<string, string> = { locale };
      if (description !== undefined) attrs.description = description;
      if (keywords !== undefined) attrs.keywords = keywords;
      if (whats_new !== undefined) attrs.whatsNew = whats_new;
      if (promotional_text !== undefined) attrs.promotionalText = promotional_text;
      if (marketing_url !== undefined) attrs.marketingUrl = marketing_url;
      if (support_url !== undefined) attrs.supportUrl = support_url;

      const result = await ascFetch("/appStoreVersionLocalizations", undefined, {
        method: "POST",
        body: {
          data: {
            type: "appStoreVersionLocalizations",
            attributes: attrs,
            relationships: {
              appStoreVersion: {
                data: { type: "appStoreVersions", id: version_id },
              },
            },
          },
        },
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ Created localization '${locale}' for version ${version_id}\nLocalization ID: ${result.data?.id}`,
          },
        ],
      };
    }
  );

  // ─── Get Age Rating ─────────────────────────────────────────────

  server.tool(
    "asc_get_age_rating",
    "Get the age rating declaration for an App Store version. Shows all content rating fields.",
    {
      version_id: z.string().describe("App Store Version ID (from asc_list_versions)"),
    },
    async ({ version_id }) => {
      const result = await ascFetch(`/appStoreVersions/${version_id}/ageRatingDeclaration`);
      const decl = result.data;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                id: decl?.id,
                ...decl?.attributes,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Set Age Rating ─────────────────────────────────────────────

  const ratingLevel = z
    .enum(["NONE", "INFREQUENT_OR_MILD", "FREQUENT_OR_INTENSE"])
    .optional();

  server.tool(
    "asc_set_age_rating",
    "Update the age rating declaration for an app. Each content field accepts NONE, INFREQUENT_OR_MILD, or FREQUENT_OR_INTENSE.",
    {
      declaration_id: z.string().describe("Age Rating Declaration ID (from asc_get_age_rating)"),
      alcohol_tobacco_or_drug_use_or_references: ratingLevel.describe("Alcohol, tobacco, or drug use/references"),
      contests: ratingLevel.describe("Contests"),
      gambling: z.boolean().optional().describe("Simulated gambling (true/false)"),
      gambling_simulated: ratingLevel.describe("Simulated gambling frequency"),
      horror_or_fear_themes: ratingLevel.describe("Horror or fear themes"),
      mature_or_suggestive_themes: ratingLevel.describe("Mature or suggestive themes"),
      medical_or_treatment_information: ratingLevel.describe("Medical/treatment information"),
      profanity_or_crude_humor: ratingLevel.describe("Profanity or crude humor"),
      sexual_content_graphic_and_nudity: ratingLevel.describe("Graphic sexual content and nudity"),
      sexual_content_or_nudity: ratingLevel.describe("Sexual content or nudity"),
      violence_cartoon_or_fantasy: ratingLevel.describe("Cartoon or fantasy violence"),
      violence_realistic: ratingLevel.describe("Realistic violence"),
      violence_realistic_prolonged: ratingLevel.describe("Prolonged realistic violence"),
      age_rating_override: z
        .string()
        .optional()
        .describe("Age rating override value (e.g. SEVENTEEN_PLUS)"),
      korea_age_rating_override: z
        .string()
        .optional()
        .describe("Korea-specific age rating override"),
    },
    async ({
      declaration_id,
      alcohol_tobacco_or_drug_use_or_references,
      contests,
      gambling,
      gambling_simulated,
      horror_or_fear_themes,
      mature_or_suggestive_themes,
      medical_or_treatment_information,
      profanity_or_crude_humor,
      sexual_content_graphic_and_nudity,
      sexual_content_or_nudity,
      violence_cartoon_or_fantasy,
      violence_realistic,
      violence_realistic_prolonged,
      age_rating_override,
      korea_age_rating_override,
    }) => {
      const attrs: Record<string, any> = {};
      if (alcohol_tobacco_or_drug_use_or_references !== undefined)
        attrs.alcoholTobaccoOrDrugUseOrReferences = alcohol_tobacco_or_drug_use_or_references;
      if (contests !== undefined) attrs.contests = contests;
      if (gambling !== undefined) attrs.gambling = gambling;
      if (gambling_simulated !== undefined) attrs.gamblingSimulated = gambling_simulated;
      if (horror_or_fear_themes !== undefined) attrs.horrorOrFearThemes = horror_or_fear_themes;
      if (mature_or_suggestive_themes !== undefined)
        attrs.matureOrSuggestiveThemes = mature_or_suggestive_themes;
      if (medical_or_treatment_information !== undefined)
        attrs.medicalOrTreatmentInformation = medical_or_treatment_information;
      if (profanity_or_crude_humor !== undefined) attrs.profanityOrCrudeHumor = profanity_or_crude_humor;
      if (sexual_content_graphic_and_nudity !== undefined)
        attrs.sexualContentGraphicAndNudity = sexual_content_graphic_and_nudity;
      if (sexual_content_or_nudity !== undefined) attrs.sexualContentOrNudity = sexual_content_or_nudity;
      if (violence_cartoon_or_fantasy !== undefined)
        attrs.violenceCartoonOrFantasy = violence_cartoon_or_fantasy;
      if (violence_realistic !== undefined) attrs.violenceRealistic = violence_realistic;
      if (violence_realistic_prolonged !== undefined)
        attrs.violenceRealisticProlonged = violence_realistic_prolonged;
      if (age_rating_override !== undefined) attrs.ageRatingOverride = age_rating_override;
      if (korea_age_rating_override !== undefined) attrs.koreaAgeRatingOverride = korea_age_rating_override;

      const result = await ascFetch(`/ageRatingDeclarations/${declaration_id}`, undefined, {
        method: "PATCH",
        body: {
          data: {
            type: "ageRatingDeclarations",
            id: declaration_id,
            attributes: attrs,
          },
        },
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ Updated age rating declaration ${declaration_id}\n${JSON.stringify(result.data?.attributes, null, 2)}`,
          },
        ],
      };
    }
  );

  // ─── Get Review Detail ──────────────────────────────────────────

  server.tool(
    "asc_get_review_detail",
    "Get app review contact info and demo account details for an App Store version.",
    {
      version_id: z.string().describe("App Store Version ID (from asc_list_versions)"),
    },
    async ({ version_id }) => {
      const result = await ascFetch(`/appStoreVersions/${version_id}/appStoreReviewDetail`);
      const detail = result.data;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                id: detail?.id,
                ...detail?.attributes,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Set Review Detail ──────────────────────────────────────────

  server.tool(
    "asc_set_review_detail",
    "Set app review contact info and demo account. Creates if none exists, updates if already present.",
    {
      version_id: z.string().describe("App Store Version ID (from asc_list_versions)"),
      contact_first_name: z.string().optional().describe("Reviewer contact first name"),
      contact_last_name: z.string().optional().describe("Reviewer contact last name"),
      contact_phone: z.string().optional().describe("Reviewer contact phone number"),
      contact_email: z.string().optional().describe("Reviewer contact email"),
      demo_account_name: z.string().optional().describe("Demo account username"),
      demo_account_password: z.string().optional().describe("Demo account password"),
      demo_account_required: z.boolean().optional().describe("Whether a demo account is required for review"),
      notes: z.string().optional().describe("Notes for the reviewer"),
    },
    async ({
      version_id,
      contact_first_name,
      contact_last_name,
      contact_phone,
      contact_email,
      demo_account_name,
      demo_account_password,
      demo_account_required,
      notes,
    }) => {
      const attrs: Record<string, any> = {};
      if (contact_first_name !== undefined) attrs.contactFirstName = contact_first_name;
      if (contact_last_name !== undefined) attrs.contactLastName = contact_last_name;
      if (contact_phone !== undefined) attrs.contactPhone = contact_phone;
      if (contact_email !== undefined) attrs.contactEmail = contact_email;
      if (demo_account_name !== undefined) attrs.demoAccountName = demo_account_name;
      if (demo_account_password !== undefined) attrs.demoAccountPassword = demo_account_password;
      if (demo_account_required !== undefined) attrs.demoAccountRequired = demo_account_required;
      if (notes !== undefined) attrs.notes = notes;

      // Try to get existing review detail
      let existingId: string | null = null;
      try {
        const existing = await ascFetch(`/appStoreVersions/${version_id}/appStoreReviewDetail`);
        existingId = existing.data?.id ?? null;
      } catch {
        // No existing review detail — will create
      }

      let result;
      if (existingId) {
        result = await ascFetch(`/appStoreReviewDetails/${existingId}`, undefined, {
          method: "PATCH",
          body: {
            data: {
              type: "appStoreReviewDetails",
              id: existingId,
              attributes: attrs,
            },
          },
        });
      } else {
        result = await ascFetch("/appStoreReviewDetails", undefined, {
          method: "POST",
          body: {
            data: {
              type: "appStoreReviewDetails",
              attributes: attrs,
              relationships: {
                appStoreVersion: {
                  data: { type: "appStoreVersions", id: version_id },
                },
              },
            },
          },
        });
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ ${existingId ? "Updated" : "Created"} review detail for version ${version_id}\nReview Detail ID: ${result.data?.id}`,
          },
        ],
      };
    }
  );

  // ─── Set Export Compliance / Encryption ──────────────────────────

  server.tool(
    "asc_set_encryption",
    "Set export compliance (encryption declaration) for a build. Checks for existing declaration first.",
    {
      build_id: z.string().describe("Build ID (from asc_list_tf_builds)"),
      uses_encryption: z.boolean().describe("Whether the app uses encryption"),
      is_exempt: z.boolean().optional().describe("Whether the encryption is exempt from regulations"),
      contains_proprietary_cryptography: z
        .boolean()
        .optional()
        .describe("Contains proprietary cryptography"),
      contains_third_party_cryptography: z
        .boolean()
        .optional()
        .describe("Contains third-party cryptography"),
      available_on_french_store: z
        .boolean()
        .optional()
        .describe("Available on the French App Store"),
      platform: z
        .enum(["IOS", "MAC_OS", "TV_OS"])
        .optional()
        .default("IOS")
        .describe("Platform"),
      code_value: z.string().optional().describe("Encryption code value"),
      app_description: z.string().optional().describe("Description of app encryption usage"),
    },
    async ({
      build_id,
      uses_encryption,
      is_exempt,
      contains_proprietary_cryptography,
      contains_third_party_cryptography,
      available_on_french_store,
      platform,
      code_value,
      app_description,
    }) => {
      // Check for existing declaration on this build
      let existingId: string | null = null;
      try {
        const existing = await ascFetch(`/builds/${build_id}/appEncryptionDeclaration`);
        existingId = existing.data?.id ?? null;
      } catch {
        // No existing declaration
      }

      const attrs: Record<string, any> = {
        usesEncryption: uses_encryption,
      };
      if (is_exempt !== undefined) attrs.isExempt = is_exempt;
      if (contains_proprietary_cryptography !== undefined)
        attrs.containsProprietaryCryptography = contains_proprietary_cryptography;
      if (contains_third_party_cryptography !== undefined)
        attrs.containsThirdPartyCryptography = contains_third_party_cryptography;
      if (available_on_french_store !== undefined) attrs.availableOnFrenchStore = available_on_french_store;
      if (platform !== undefined) attrs.platform = platform;
      if (code_value !== undefined) attrs.codeValue = code_value;
      if (app_description !== undefined) attrs.appDescription = app_description;

      let result;
      if (existingId) {
        result = await ascFetch(`/appEncryptionDeclarations/${existingId}`, undefined, {
          method: "PATCH",
          body: {
            data: {
              type: "appEncryptionDeclarations",
              id: existingId,
              attributes: attrs,
            },
          },
        });
      } else {
        // Create new declaration and link to build
        result = await ascFetch("/appEncryptionDeclarations", undefined, {
          method: "POST",
          body: {
            data: {
              type: "appEncryptionDeclarations",
              attributes: attrs,
            },
          },
        });

        // Link the declaration to the build
        if (result.data?.id) {
          await ascFetch(`/builds/${build_id}/relationships/appEncryptionDeclaration`, undefined, {
            method: "PATCH",
            body: {
              data: { type: "appEncryptionDeclarations", id: result.data.id },
            },
          });
        }
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ ${existingId ? "Updated" : "Created"} encryption declaration for build ${build_id}\nDeclaration ID: ${result.data?.id}\nUses encryption: ${uses_encryption}`,
          },
        ],
      };
    }
  );

  // ─── Set Phased Release ─────────────────────────────────────────

  server.tool(
    "asc_set_phased_release",
    "Create or update phased release for an App Store version. Phased release rolls out to users over 7 days.",
    {
      version_id: z.string().describe("App Store Version ID (from asc_list_versions)"),
      phased_release_state: z
        .enum(["ACTIVE", "PAUSED", "COMPLETE"])
        .describe("Phased release state: ACTIVE (rolling out), PAUSED (halt rollout), COMPLETE (release to all)"),
      phased_release_id: z
        .string()
        .optional()
        .describe("Existing Phased Release ID (for updates — omit to create new)"),
    },
    async ({ version_id, phased_release_state, phased_release_id }) => {
      let result;

      if (phased_release_id) {
        result = await ascFetch(`/appStoreVersionPhasedReleases/${phased_release_id}`, undefined, {
          method: "PATCH",
          body: {
            data: {
              type: "appStoreVersionPhasedReleases",
              id: phased_release_id,
              attributes: { phasedReleaseState: phased_release_state },
            },
          },
        });
      } else {
        result = await ascFetch("/appStoreVersionPhasedReleases", undefined, {
          method: "POST",
          body: {
            data: {
              type: "appStoreVersionPhasedReleases",
              attributes: { phasedReleaseState: phased_release_state },
              relationships: {
                appStoreVersion: {
                  data: { type: "appStoreVersions", id: version_id },
                },
              },
            },
          },
        });
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ ${phased_release_id ? "Updated" : "Created"} phased release for version ${version_id}\nPhased Release ID: ${result.data?.id}\nState: ${phased_release_state}`,
          },
        ],
      };
    }
  );

  // ─── Delete Phased Release ──────────────────────────────────────

  server.tool(
    "asc_delete_phased_release",
    "Remove phased release from a version, switching to immediate full release.",
    {
      phased_release_id: z.string().describe("Phased Release ID (from asc_set_phased_release response)"),
    },
    async ({ phased_release_id }) => {
      await ascFetch(`/appStoreVersionPhasedReleases/${phased_release_id}`, undefined, {
        method: "DELETE",
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ Removed phased release ${phased_release_id} — version will release immediately to all users`,
          },
        ],
      };
    }
  );

  // ─── Release Version ────────────────────────────────────────────

  server.tool(
    "asc_release_version",
    "Manually release an approved App Store version. Only works when version is in PENDING_DEVELOPER_RELEASE state.",
    {
      version_id: z.string().describe("App Store Version ID in PENDING_DEVELOPER_RELEASE state"),
    },
    async ({ version_id }) => {
      const result = await ascFetch("/appStoreVersionReleaseRequests", undefined, {
        method: "POST",
        body: {
          data: {
            type: "appStoreVersionReleaseRequests",
            relationships: {
              appStoreVersion: {
                data: { type: "appStoreVersions", id: version_id },
              },
            },
          },
        },
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `✅ Release request submitted for version ${version_id}\nThe version is now being released to the App Store.`,
          },
        ],
      };
    }
  );

  // ─── Get App Pricing ────────────────────────────────────────────

  server.tool(
    "asc_get_app_pricing",
    "Get app pricing schedule including manual and automatic prices.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
    },
    async ({ app_id }) => {
      const result = await ascFetch(`/apps/${app_id}/appPriceSchedule`, {
        include: "manualPrices,automaticPrices",
      });

      const schedule = result.data;
      const included = result.included ?? [];

      const manualPrices = included
        .filter((i: any) => i.type === "appPrices" || i.type === "appPricePoints")
        .map((p: any) => ({
          id: p.id,
          type: p.type,
          ...p.attributes,
        }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                id: schedule?.id,
                manualPrices,
                relationships: schedule?.relationships,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Get App Privacy ────────────────────────────────────────────

  server.tool(
    "asc_get_privacy",
    "Get app privacy detail sections (data collection declarations) for an app.",
    {
      app_id: z.string().describe("App ID (from asc_list_apps)"),
    },
    async ({ app_id }) => {
      const result = await ascFetch(`/apps/${app_id}/appPrivacyDetails`);
      const details = (result.data ?? []).map((d: any) => ({
        id: d.id,
        ...d.attributes,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: details.length > 0
              ? JSON.stringify(details, null, 2)
              : "No privacy details configured for this app.",
          },
        ],
      };
    }
  );
}
