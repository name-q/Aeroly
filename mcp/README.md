[中文](./README.zh-CN.md) | English

# aeroly-mcp

MCP server for [Aeroly](https://github.com/name-q/Aeroly) component retrieval and doc guidance, designed for AI coding workflows.

[Documentation](https://aeroly.zeroc.top/) | [GitHub](https://github.com/name-q/Aeroly) | [npm](https://www.npmjs.com/package/aeroly)

## Version Policy

Starting from `aeroly@1.0.1`, `aeroly-mcp` and `aeroly` use **1:1 version mapping**.

- `aeroly@1.0.1` -> `aeroly-mcp@1.0.1`
- `aeroly@x.y.z` -> `aeroly-mcp@x.y.z`

Use the same version for both packages to avoid API/doc mismatch.

## Usage

### Demo use in Kiro

Kiro supports MCP server configuration via `mcpServers`.

Workspace-level config (recommended): `.kiro/settings/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "aeroly-mcp@latest"
      ],
      "autoApprove": [
        "list_components",
        "search_components",
        "get_component_doc",
        "refresh_component_index"
      ]
    }
  }
}
```

User-level config (all projects): `~/.kiro/settings/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "aeroly-mcp@latest"
      ],
      "autoApprove": [
        "list_components",
        "search_components",
        "get_component_doc",
        "refresh_component_index"
      ]
    }
  }
}
```

If your environment blocks npm prompts, use:

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "-y",
        "aeroly-mcp@latest"
      ],
      "autoApprove": [
        "list_components",
        "search_components",
        "get_component_doc",
        "refresh_component_index"
      ]
    }
  }
}
```

For strict version matching with Aeroly, pin the same version instead of `latest`:

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": [
        "aeroly-mcp@1.0.1"
      ],
      "autoApprove": [
        "list_components",
        "search_components",
        "get_component_doc",
        "refresh_component_index"
      ]
    }
  }
}
```

After config is loaded, you can ask AI to call tools like:

- `list_components`
- `search_components`
- `get_component_doc`
- `refresh_component_index`

Token optimization (optional):

- `get_component_doc` default behavior is `level: "brief"` (you do not need to set anything)
- use `level: "brief"` when you only need API-focused output (fewer tokens, faster responses)
- use `level: "full"` when you need complete docs with examples

## What Is Bundled in npm Package

This package includes prebuilt docs and index so users do not need Aeroly source docs in their project:

- `data/docs/*.md` (snapshot docs, generated from `src/*/index.md` first)
- `data/docs-api/*.md` (API-only docs: component title + API section)
- `data/component-index.json`

`<code src="...">` examples are inlined during build, so demo code is directly readable.

## Local Development

```bash
cd mcp
npm install
npm run build:all
npm run smoke
npm start
```

## Tool Summary

- `list_components`: list component metadata from index (supports `group/query/offset/limit`, returns `hasMore/nextOffset`)
- `search_components`: retrieve best-fit components by intent
- `get_component_doc`: returns plain markdown text; supports `level="brief"` (default, API-only markdown) and `level="full"` (full markdown with demos)
- `refresh_component_index`: rebuild and hot-reload index
