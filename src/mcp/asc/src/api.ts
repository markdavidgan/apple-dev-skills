import { generateToken } from "./auth.js";
import { execSync } from "child_process";
import { mkdtempSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

const BASE_URL = "https://api.appstoreconnect.apple.com/v1";

export async function ascFetch(
  path: string,
  params?: Record<string, string>,
  options?: { method?: string; body?: any }
): Promise<any> {
  const token = generateToken();
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const fetchOptions: RequestInit = {
    method: options?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (options?.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`ASC API ${response.status}: ${body}`);
  }

  // DELETE returns 204 No Content
  if (response.status === 204) return { data: null };

  return response.json();
}

// --- CI Products ---

export async function listProducts() {
  return ascFetch("/ciProducts", {
    "include": "primaryRepositories",
    "limit": "25",
  });
}

// --- Workflows ---

export async function listWorkflows(productId: string) {
  return ascFetch(`/ciProducts/${productId}/workflows`, {
    "limit": "25",
  });
}

export async function getWorkflow(workflowId: string) {
  return ascFetch(`/ciWorkflows/${workflowId}`);
}

export async function createWorkflow(options: {
  productId: string;
  repositoryId: string;
  name: string;
  description?: string;
  isEnabled?: boolean;
  isLockedForEditing?: boolean;
  clean?: boolean;
  containerFilePath?: string;
  branchStartCondition?: {
    source: { isAllMatch: boolean; patterns: Array<{ pattern: string; isPrefix: boolean }> };
    filesAndFoldersRule?: { mode: string };
    autoCancel?: boolean;
  };
  tagStartCondition?: {
    source: { isAllMatch: boolean; patterns: Array<{ pattern: string; isPrefix: boolean }> };
    filesAndFoldersRule?: { mode: string };
    autoCancel?: boolean;
  };
  manualBranchStartCondition?: {
    source: { isAllMatch: boolean; patterns: Array<{ pattern: string; isPrefix: boolean }> };
  };
  actions: Array<{
    name: string;
    actionType: string; // BUILD, TEST, ANALYZE, ARCHIVE
    destination?: string; // ANY_IOS_DEVICE, ANY_MAC, etc.
    scheme: string;
    platform?: string; // IOS, MACOS, WATCHOS, TVOS
    isRequiredToPass?: boolean;
    testConfiguration?: {
      testPlanName?: string;
      testDestinationName?: string;
    } | null;
  }>;
  environment?: {
    variables?: Array<{
      name: string;
      value: string;
      isSecret?: boolean;
    }>;
  };
  xcodeVersionId?: string;
  macOsVersionId?: string;
}) {
  const attributes: any = {
    name: options.name,
    description: options.description ?? "",
    isEnabled: options.isEnabled ?? true,
    isLockedForEditing: options.isLockedForEditing ?? false,
    clean: options.clean ?? false,
    containerFilePath: options.containerFilePath ?? "",
    actions: options.actions.map((a) => ({
      name: a.name,
      actionType: a.actionType,
      destination: a.destination ?? "ANY_IOS_DEVICE",
      scheme: a.scheme,
      platform: a.platform ?? "IOS",
      isRequiredToPass: a.isRequiredToPass ?? true,
      testConfiguration: a.testConfiguration ?? null,
    })),
  };

  if (options.branchStartCondition) {
    attributes.branchStartCondition = options.branchStartCondition;
  }
  if (options.tagStartCondition) {
    attributes.tagStartCondition = options.tagStartCondition;
  }
  if (options.manualBranchStartCondition) {
    attributes.manualBranchStartCondition = options.manualBranchStartCondition;
  }
  if (options.environment) {
    attributes.environment = options.environment;
  }

  const relationships: any = {
    product: {
      data: { type: "ciProducts", id: options.productId },
    },
    repository: {
      data: { type: "scmRepositories", id: options.repositoryId },
    },
  };

  if (options.xcodeVersionId) {
    relationships.xcodeVersion = {
      data: { type: "ciXcodeVersions", id: options.xcodeVersionId },
    };
  }
  if (options.macOsVersionId) {
    relationships.macOsVersion = {
      data: { type: "ciMacOsVersions", id: options.macOsVersionId },
    };
  }

  return ascFetch("/ciWorkflows", undefined, {
    method: "POST",
    body: {
      data: {
        type: "ciWorkflows",
        attributes,
        relationships,
      },
    },
  });
}

export async function updateWorkflow(
  workflowId: string,
  attributes: {
    name?: string;
    description?: string;
    isEnabled?: boolean;
    isLockedForEditing?: boolean;
    clean?: boolean;
    branchStartCondition?: {
      source: { isAllMatch: boolean; patterns: Array<{ pattern: string; isPrefix: boolean }> };
      filesAndFoldersRule?: { mode: string };
      autoCancel?: boolean;
    } | null;
    tagStartCondition?: {
      source: { isAllMatch: boolean; patterns: Array<{ pattern: string; isPrefix: boolean }> };
      filesAndFoldersRule?: { mode: string };
      autoCancel?: boolean;
    } | null;
    manualBranchStartCondition?: {
      source: { isAllMatch: boolean; patterns: Array<{ pattern: string; isPrefix: boolean }> };
    } | null;
    actions?: Array<{
      name: string;
      actionType: string;
      destination?: string;
      scheme: string;
      platform?: string;
      isRequiredToPass?: boolean;
      testConfiguration?: {
        testPlanName?: string;
        testDestinationName?: string;
      } | null;
    }>;
  }
) {
  return ascFetch(`/ciWorkflows/${workflowId}`, undefined, {
    method: "PATCH",
    body: {
      data: {
        type: "ciWorkflows",
        id: workflowId,
        attributes,
      },
    },
  });
}

export async function deleteWorkflow(workflowId: string) {
  return ascFetch(`/ciWorkflows/${workflowId}`, undefined, {
    method: "DELETE",
  });
}

export async function listXcodeVersions() {
  return ascFetch("/ciXcodeVersions", { limit: "25" });
}

export async function listMacOsVersions() {
  return ascFetch("/ciMacOsVersions", { limit: "25" });
}

// --- Build Runs ---

export async function listBuildRuns(options: {
  workflowId?: string;
  productId?: string;
  limit?: number;
}) {
  if (options.workflowId) {
    return ascFetch(`/ciWorkflows/${options.workflowId}/buildRuns`, {
      "limit": String(options.limit ?? 10),
      "sort": "-number",
    });
  }
  if (options.productId) {
    return ascFetch(`/ciProducts/${options.productId}/buildRuns`, {
      "limit": String(options.limit ?? 10),
      "sort": "-number",
    });
  }
  throw new Error("Either workflowId or productId is required");
}

export async function getBuildRun(buildRunId: string) {
  return ascFetch(`/ciBuildRuns/${buildRunId}`, {
    "include": "builds",
  });
}

export async function triggerBuildRun(workflowId: string) {
  return ascFetch("/ciBuildRuns", undefined, {
    method: "POST",
    body: {
      data: {
        type: "ciBuildRuns",
        relationships: {
          workflow: {
            data: { type: "ciWorkflows", id: workflowId },
          },
        },
      },
    },
  });
}

/**
 * Poll a build run every `intervalSeconds` until it reaches COMPLETE
 * or `timeoutMinutes` elapses. Returns the final build run + issues.
 */
export async function waitForBuildRun(options: {
  buildRunId: string;
  timeoutMinutes?: number;
  intervalSeconds?: number;
  onPoll?: (elapsed: number, status: string) => void;
}): Promise<{ buildRun: any; issues: any[] }> {
  const { buildRunId, timeoutMinutes = 25, intervalSeconds = 30, onPoll } = options;
  const timeoutMs = timeoutMinutes * 60 * 1000;
  const started = Date.now();

  while (true) {
    const result = await getBuildRun(buildRunId);
    const build = result.data;
    const progress: string = build?.attributes?.executionProgress ?? "UNKNOWN";
    const elapsed = Math.floor((Date.now() - started) / 1000);

    if (onPoll) onPoll(elapsed, progress);

    if (progress === "COMPLETE") {
      // Fetch issues for the completed build
      let issues: any[] = [];
      try {
        const issueResult = await listIssues(buildRunId);
        issues = issueResult.data ?? [];
      } catch {
        // issues are best-effort
      }
      return { buildRun: build, issues };
    }

    if (Date.now() - started >= timeoutMs) {
      throw new Error(
        `Build ${buildRunId} did not complete within ${timeoutMinutes} minutes. Last status: ${progress}`
      );
    }

    await new Promise((r) => setTimeout(r, intervalSeconds * 1000));
  }
}

// --- Build Actions (individual steps within a build run) ---

export async function listBuildActions(buildRunId: string) {
  return ascFetch(`/ciBuildRuns/${buildRunId}/actions`, {
    "limit": "25",
  });
}

export async function getBuildAction(actionId: string) {
  return ascFetch(`/ciBuildActions/${actionId}`, {
    "include": "buildRun",
  });
}

// --- Artifacts (logs, results, etc.) ---

export async function listArtifacts(buildActionId: string) {
  return ascFetch(`/ciBuildActions/${buildActionId}/artifacts`, {
    "limit": "25",
  });
}

export async function getArtifact(artifactId: string) {
  return ascFetch(`/ciArtifacts/${artifactId}`);
}

// --- Download artifact content ---

export async function downloadArtifact(
  artifactId: string
): Promise<string> {
  // First get the artifact to find the download URL
  const artifact = await getArtifact(artifactId);
  const downloadUrl = artifact.data?.attributes?.downloadUrl;
  const fileName: string = artifact.data?.attributes?.fileName ?? "";

  if (!downloadUrl) {
    throw new Error(`No download URL found for artifact ${artifactId}`);
  }

  // Unzip files using system unzip — download to tmp, extract all entries, return combined text
  if (fileName.endsWith(".zip")) {
    const tmpDir = mkdtempSync(join(tmpdir(), "xc-artifact-"));
    const zipPath = join(tmpDir, "artifact.zip");
    try {
      execSync(`curl -s -L -o "${zipPath}" "${downloadUrl}"`);
      const listing = execSync(`unzip -l "${zipPath}" 2>/dev/null`).toString();
      const content = execSync(`unzip -p "${zipPath}" 2>/dev/null`).toString("utf-8");
      return `=== Archive contents ===\n${listing}\n=== File content ===\n${content}`;
    } catch (e: any) {
      return `Failed to unzip artifact: ${e.message}`;
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Failed to download artifact: ${response.status}`);
  }

  return response.text();
}

// --- Issues (test failures, warnings, errors) ---

export async function listIssues(buildRunId: string) {
  return ascFetch(`/ciBuildRuns/${buildRunId}/actions`, {
    "limit": "25",
  }).then(async (actionsResponse) => {
    // Collect issues from all actions
    const allIssues: any[] = [];
    for (const action of actionsResponse.data ?? []) {
      try {
        const issues = await ascFetch(
          `/ciBuildActions/${action.id}/issues`,
          { "limit": "50" }
        );
        if (issues.data) {
          allIssues.push(
            ...issues.data.map((issue: any) => ({
              ...issue,
              _actionName: action.attributes?.name,
              _actionType: action.attributes?.actionType,
            }))
          );
        }
      } catch {
        // Some actions may not have issues endpoint
      }
    }
    return { data: allIssues };
  });
}

// ═══════════════════════════════════════════════════════════════════
// Developer Portal: Bundle IDs, Capabilities, Certificates, Profiles
// ═══════════════════════════════════════════════════════════════════

// --- Bundle IDs ---

export async function listBundleIds(filter?: string) {
  const params: Record<string, string> = { limit: "200" };
  if (filter) {
    params["filter[identifier]"] = filter;
  }
  return ascFetch("/bundleIds", params);
}

export async function getBundleId(bundleIdId: string) {
  return ascFetch(`/bundleIds/${bundleIdId}`);
}

// --- Capabilities ---

export async function listCapabilities(bundleIdId: string) {
  return ascFetch(`/bundleIds/${bundleIdId}/bundleIdCapabilities`);
}

export async function addCapability(
  bundleIdId: string,
  capabilityType: string,
  settings?: any[]
) {
  return ascFetch("/bundleIdCapabilities", undefined, {
    method: "POST",
    body: {
      data: {
        type: "bundleIdCapabilities",
        attributes: {
          capabilityType,
          settings: settings ?? [],
        },
        relationships: {
          bundleId: {
            data: { type: "bundleIds", id: bundleIdId },
          },
        },
      },
    },
  });
}

export async function removeCapability(capabilityId: string) {
  return ascFetch(`/bundleIdCapabilities/${capabilityId}`, undefined, {
    method: "DELETE",
  });
}

// --- Certificates ---

export async function listCertificates() {
  return ascFetch("/certificates", { limit: "200" });
}

export async function createCertificate(
  certificateType: string,
  csrContent: string
) {
  return ascFetch("/certificates", undefined, {
    method: "POST",
    body: {
      data: {
        type: "certificates",
        attributes: {
          certificateType,
          csrContent,
        },
      },
    },
  });
}

export async function revokeCertificate(certificateId: string) {
  return ascFetch(`/certificates/${certificateId}`, undefined, {
    method: "DELETE",
  });
}

// --- Provisioning Profiles ---

export async function listProfiles(filter?: {
  bundleId?: string;
  profileState?: string;
  profileType?: string;
}) {
  const params: Record<string, string> = { limit: "200" };
  if (filter?.profileState) {
    params["filter[profileState]"] = filter.profileState;
  }
  if (filter?.profileType) {
    params["filter[profileType]"] = filter.profileType;
  }
  return ascFetch("/profiles", params);
}

export async function getProfile(profileId: string) {
  return ascFetch(`/profiles/${profileId}`, {
    include: "bundleId,certificates",
  });
}

export async function createProfile(options: {
  name: string;
  profileType: string; // IOS_APP_STORE, IOS_APP_DEVELOPMENT, IOS_APP_ADHOC, etc.
  bundleIdId: string;
  certificateIds: string[];
  deviceIds?: string[];
}) {
  const relationships: any = {
    bundleId: {
      data: { type: "bundleIds", id: options.bundleIdId },
    },
    certificates: {
      data: options.certificateIds.map((id) => ({
        type: "certificates",
        id,
      })),
    },
  };
  if (options.deviceIds && options.deviceIds.length > 0) {
    relationships.devices = {
      data: options.deviceIds.map((id) => ({ type: "devices", id })),
    };
  }
  return ascFetch("/profiles", undefined, {
    method: "POST",
    body: {
      data: {
        type: "profiles",
        attributes: {
          name: options.name,
          profileType: options.profileType,
        },
        relationships,
      },
    },
  });
}

export async function deleteProfile(profileId: string) {
  return ascFetch(`/profiles/${profileId}`, undefined, {
    method: "DELETE",
  });
}

// ═══════════════════════════════════════════════════════════════════
// App Store: Apps, Versions, Metadata, Submissions
// ═══════════════════════════════════════════════════════════════════

// --- Apps ---

export async function listApps() {
  return ascFetch("/apps", {
    limit: "200",
    "fields[apps]":
      "name,bundleId,sku,primaryLocale,contentRightsDeclaration,appStoreVersions",
    include: "appStoreVersions",
  });
}

export async function getApp(appId: string) {
  return ascFetch(`/apps/${appId}`, {
    include: "appStoreVersions",
  });
}

// --- App Store Versions ---

export async function listAppVersions(appId: string) {
  return ascFetch(`/apps/${appId}/appStoreVersions`, {
    limit: "10",
    "fields[appStoreVersions]":
      "versionString,appStoreState,platform,releaseType,createdDate,appStoreVersionLocalizations,appStoreReviewDetail",
    include: "appStoreVersionLocalizations",
  });
}

export async function getAppVersion(versionId: string) {
  return ascFetch(`/appStoreVersions/${versionId}`, {
    include: "appStoreVersionLocalizations,appStoreReviewDetail",
  });
}

export async function createAppVersion(
  appId: string,
  versionString: string,
  platform: string = "IOS"
) {
  return ascFetch("/appStoreVersions", undefined, {
    method: "POST",
    body: {
      data: {
        type: "appStoreVersions",
        attributes: {
          versionString,
          platform,
        },
        relationships: {
          app: {
            data: { type: "apps", id: appId },
          },
        },
      },
    },
  });
}

export async function updateAppVersion(
  versionId: string,
  attributes: {
    versionString?: string;
    releaseType?: string; // MANUAL, AFTER_APPROVAL, SCHEDULED
    earliestReleaseDate?: string;
  }
) {
  return ascFetch(`/appStoreVersions/${versionId}`, undefined, {
    method: "PATCH",
    body: {
      data: {
        type: "appStoreVersions",
        id: versionId,
        attributes,
      },
    },
  });
}

// --- Version Localizations (What's New, Description, Keywords, etc.) ---

export async function listVersionLocalizations(versionId: string) {
  return ascFetch(
    `/appStoreVersions/${versionId}/appStoreVersionLocalizations`,
    {
      "fields[appStoreVersionLocalizations]":
        "locale,description,keywords,whatsNew,promotionalText,marketingUrl,supportUrl",
    }
  );
}

export async function getVersionLocalization(localizationId: string) {
  return ascFetch(`/appStoreVersionLocalizations/${localizationId}`);
}

export async function updateVersionLocalization(
  localizationId: string,
  attributes: {
    description?: string;
    keywords?: string;
    whatsNew?: string;
    promotionalText?: string;
    marketingUrl?: string;
    supportUrl?: string;
  }
) {
  return ascFetch(
    `/appStoreVersionLocalizations/${localizationId}`,
    undefined,
    {
      method: "PATCH",
      body: {
        data: {
          type: "appStoreVersionLocalizations",
          id: localizationId,
          attributes,
        },
      },
    }
  );
}

export async function createVersionLocalization(
  versionId: string,
  locale: string,
  attributes: {
    description?: string;
    keywords?: string;
    whatsNew?: string;
    promotionalText?: string;
    marketingUrl?: string;
    supportUrl?: string;
  }
) {
  return ascFetch("/appStoreVersionLocalizations", undefined, {
    method: "POST",
    body: {
      data: {
        type: "appStoreVersionLocalizations",
        attributes: { locale, ...attributes },
        relationships: {
          appStoreVersion: {
            data: { type: "appStoreVersions", id: versionId },
          },
        },
      },
    },
  });
}

// --- App Info & App Info Localizations (name, subtitle, category) ---

export async function listAppInfos(appId: string) {
  return ascFetch(`/apps/${appId}/appInfos`, {
    include: "appInfoLocalizations",
    "fields[appInfoLocalizations]": "locale,name,subtitle,privacyPolicyUrl",
  });
}

export async function updateAppInfoLocalization(
  localizationId: string,
  attributes: {
    name?: string;
    subtitle?: string;
    privacyPolicyUrl?: string;
    privacyChoicesUrl?: string;
  }
) {
  return ascFetch(`/appInfoLocalizations/${localizationId}`, undefined, {
    method: "PATCH",
    body: {
      data: {
        type: "appInfoLocalizations",
        id: localizationId,
        attributes,
      },
    },
  });
}

// --- Screenshots ---

export async function listScreenshotSets(localizationId: string) {
  return ascFetch(
    `/appStoreVersionLocalizations/${localizationId}/appScreenshotSets`,
    {
      include: "appScreenshots",
      "fields[appScreenshots]": "fileName,fileSize,sourceFileChecksum,uploadOperations,assetDeliveryState",
    }
  );
}

// --- Review Submissions ---

export async function createReviewSubmission(
  appVersionId: string
) {
  return ascFetch("/appStoreVersionSubmissions", undefined, {
    method: "POST",
    body: {
      data: {
        type: "appStoreVersionSubmissions",
        relationships: {
          appStoreVersion: {
            data: { type: "appStoreVersions", id: appVersionId },
          },
        },
      },
    },
  });
}

// ═══════════════════════════════════════════════════════════════════
// TestFlight: Builds, Beta Groups, Pre-Release
// ═══════════════════════════════════════════════════════════════════

export async function listTestFlightBuilds(filter?: {
  appId?: string;
  version?: string;
  expired?: boolean;
  /**
   * Apple build processingState filter. Comma-separated subset of
   * PROCESSING, FAILED, INVALID, VALID. Omit to return all states.
   * NOTE: a build that fails async *delivery* processing (e.g. error 90348,
   * a missing NSExtensionPointIdentifier) is never created as a build
   * resource and therefore cannot appear here under any state — diagnose
   * those via the altool ContentDelivery log instead.
   */
  processingState?: string;
  /** Page size (default 20, Apple max 200). */
  limit?: number;
}) {
  const params: Record<string, string> = {
    limit: String(filter?.limit ?? 20),
    sort: "-uploadedDate",
    "fields[builds]":
      "version,uploadedDate,processingState,buildAudienceType,minOsVersion,expirationDate,expired,iconAssetToken",
    include: "preReleaseVersion,app",
  };
  if (filter?.appId) params["filter[app]"] = filter.appId;
  if (filter?.version) params["filter[version]"] = filter.version;
  if (filter?.expired !== undefined)
    params["filter[expired]"] = String(filter.expired);
  if (filter?.processingState)
    params["filter[processingState]"] = filter.processingState;
  return ascFetch("/builds", params);
}

export async function getBuild(buildId: string) {
  return ascFetch(`/builds/${buildId}`, {
    include:
      "preReleaseVersion,betaBuildLocalizations,buildBetaDetail,app",
  });
}

export async function listBetaGroups(appId?: string) {
  const params: Record<string, string> = {
    limit: "50",
    "fields[betaGroups]":
      "name,isInternalGroup,publicLinkEnabled,publicLinkLimit,feedbackEnabled,hasAccessToAllBuilds",
  };
  if (appId) params["filter[app]"] = appId;
  return ascFetch("/betaGroups", params);
}

export async function addBuildToBetaGroup(
  betaGroupId: string,
  buildId: string
) {
  return ascFetch(`/betaGroups/${betaGroupId}/relationships/builds`, undefined, {
    method: "POST",
    body: {
      data: [{ type: "builds", id: buildId }],
    },
  });
}

export async function setBetaBuildLocalization(
  buildId: string,
  locale: string,
  whatsNew: string
) {
  // First check if localization exists
  const existing = await ascFetch(`/builds/${buildId}/betaBuildLocalizations`);
  const existingLoc = (existing.data ?? []).find(
    (l: any) => l.attributes?.locale === locale
  );

  if (existingLoc) {
    return ascFetch(`/betaBuildLocalizations/${existingLoc.id}`, undefined, {
      method: "PATCH",
      body: {
        data: {
          type: "betaBuildLocalizations",
          id: existingLoc.id,
          attributes: { whatsNew },
        },
      },
    });
  }

  return ascFetch("/betaBuildLocalizations", undefined, {
    method: "POST",
    body: {
      data: {
        type: "betaBuildLocalizations",
        attributes: { locale, whatsNew },
        relationships: {
          build: { data: { type: "builds", id: buildId } },
        },
      },
    },
  });
}

// --- Test Results ---

export async function listTestResults(buildRunId: string) {
  return ascFetch(`/ciBuildRuns/${buildRunId}/actions`, {
    "limit": "25",
  }).then(async (actionsResponse) => {
    const testActions = (actionsResponse.data ?? []).filter(
      (a: any) => a.attributes?.actionType === "TEST"
    );

    const results: any[] = [];
    for (const action of testActions) {
      try {
        const testResults = await ascFetch(
          `/ciBuildActions/${action.id}/testResults`,
          { "limit": "100" }
        );
        if (testResults.data) {
          results.push(
            ...testResults.data.map((r: any) => ({
              ...r,
              _actionName: action.attributes?.name,
            }))
          );
        }
      } catch {
        // Test results may not be available
      }
    }
    return { data: results };
  });
}
