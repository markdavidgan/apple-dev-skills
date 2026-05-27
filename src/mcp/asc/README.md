# App Store Connect MCP Server

A Model Context Protocol (MCP) server for the full App Store Connect API.

## Features

- **80+ tools** covering CI/builds, TestFlight, signing, provisioning, metadata, app submission, IAP, reviews, and screenshots
- **JWT auth** via Apple Developer API key (.p8 file)
- **TypeScript** implementation using the official MCP SDK

## Prerequisites

- Node.js >= 22
- Apple Developer API key (Key ID, Issuer ID, .p8 private key file)

## Installation

```bash
cd src/mcp/asc
npm install
npm run build
```

## Configuration

Set these environment variables:

```bash
export ASC_KEY_ID="your-key-id"
export ASC_ISSUER_ID="your-issuer-id"
export ASC_KEY_PATH="/path/to/AuthKey.p8"
```

## Usage with Claude Code

```bash
claude mcp add-json app-store-connect < src/mcp/asc/mcp.json
```

> Note: Update the `<REPO_PATH>` placeholder in `mcp.json` to your actual repository path.

## Development

```bash
npm run dev    # Run with tsx (hot reload)
npm run build  # Compile TypeScript to dist/
npm start      # Run compiled output
```

## API Coverage

| Domain | Tools |
|--------|-------|
| App Store | App info, versions, review submissions, metadata |
| TestFlight | Builds, groups, testers, beta review |
| Signing | Certificates, provisioning profiles |
| Users & Roles | Team members, roles |
| IAP | Products, subscriptions, offers |
| Screenshots | Upload, list, delete |
| Diagnostics | Crash logs, metrics |

## License

MIT
