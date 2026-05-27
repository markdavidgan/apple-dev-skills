---
name: setup-asc
description: Configure App Store Connect API authentication for the ASC MCP server. Guides through API key setup (Key ID, Issuer ID, .p8 file), validates credentials, and generates MCP configuration. Use when user says "setup asc", "configure app store connect", "asc api key", or needs to set up the App Store Connect MCP server.
---

# /setup-asc — App Store Connect Configuration

Set up authentication for the App Store Connect MCP server. Configures API keys at machine level or repo level.

## Usage

```
/setup-asc          # Run the full setup wizard
/setup-asc status   # Check current configuration status
```

## App Store Connect Setup

The ASC MCP server requires three things to authenticate with Apple's API:
1. **Key ID** — a 10-character alphanumeric identifier
2. **Issuer ID** — a UUID from your team's API settings
3. **Private Key** — an `.p8` file downloaded from App Store Connect

#### Step-by-step flow:

**1. Check existing configuration**

Look for credentials in this order:
- Environment variables: `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_PATH`
- Repo-level: `.mcp.json` in the current project root
- Machine-level: `~/.config/asc/config.json` and `~/.config/asc/keys/*.p8`

Report what's found. If fully configured, offer to validate.

**2. Guide the user to get credentials (if needed)**

Direct the user to:
> **App Store Connect** > **Users and Access** > **Integrations** > **App Store Connect API**
> URL: https://appstoreconnect.apple.com/access/integrations/api

Tell them:
- Click **Generate API Key** (or use an existing one)
- Note the **Key ID** (shown in the key list)
- Note the **Issuer ID** (shown at the top of the page)
- **Download the .p8 file** — this can only be downloaded ONCE

The `.p8` file CANNOT be generated via API. The user must download it from the web portal.

**3. Collect the values**

Ask the user for:
- Key ID (or detect from the `.p8` filename pattern `AuthKey_<KEY_ID>.p8`)
- Issuer ID
- Path to the `.p8` file

**4. Choose installation scope**

- **Machine-level** (recommended for personal machines):
  - Create `~/.config/asc/config.json` with `key_id` and `issuer_id`
  - Copy or symlink the `.p8` file to `~/.config/asc/keys/`
  - Works across all projects without per-repo config

- **Repo-level** (for shared/CI projects):
  - Write or update `.mcp.json` in the project root
  - Place key in project's `keys/` directory (add `keys/*.p8` to `.gitignore`)
  - Scoped to this repository only

**5. Write the configuration**

For machine-level, create `~/.config/asc/config.json`:
```json
{
  "key_id": "<KEY_ID>",
  "issuer_id": "<ISSUER_ID>"
}
```

For repo-level, create or update `.mcp.json`:
```json
{
  "mcpServers": {
    "app-store-connect": {
      "command": "node",
      "args": ["<REPO_PATH>/src/mcp/asc/dist/index.js"],
      "env": {
        "ASC_KEY_ID": "<KEY_ID>",
        "ASC_ISSUER_ID": "<ISSUER_ID>",
        "ASC_KEY_PATH": "<path-to-key>/AuthKey_<KEY_ID>.p8"
      }
    }
  }
}
```

**6. Validate**

Test the credentials by calling `asc_list_apps` (or equivalent direct API call). Report:
- Success: list of apps found
- Auth failure: check Key ID, Issuer ID, and key file
- Network failure: check internet connection

**7. Build the MCP server (if needed)**

If the ASC MCP server hasn't been built yet:
```bash
cd <REPO_PATH>/src/mcp/asc
npm install
npm run build
```

## Configuration Status (`/setup-asc status`)

Check and report:
- Which plugins are installed (via profiles or marketplace)
- Which MCP servers are configured
- Whether credentials are valid
- Whether MCP servers are built and ready

Format:
```
Plugin Configuration Status
============================

App Store Connect MCP:
  Key ID:     7RFR••••H9 (configured)
  Issuer ID:  f928••••-a6fa (configured)
  Key file:   ~/.config/asc/keys/AuthKey_7RFRH9.p8 (found)
  Server:     built (dist/index.js exists)
  Status:     Ready

Missing:
  (none)
```

## Notes

- Never store `.p8` private keys in git (ensure `.gitignore` covers them)
- Key IDs and Issuer IDs are non-secret identifiers (safe to store in config files)
- The `.p8` file is the only secret — treat it like an SSH private key
- Machine-level setup is preferred for personal machines; repo-level for CI/shared
