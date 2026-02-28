# aeroly-mcp

MCP server for Aeroly component retrieval and code validation, designed for Pen-to-code and AI coding workflows.

## Version Policy

Starting from `aeroly@1.0.1`, `aeroly-mcp` and `aeroly` use **1:1 version mapping**.

- `aeroly@1.0.1` -> `aeroly-mcp@1.0.1`
- `aeroly@1.1.0` -> `aeroly-mcp@1.1.0`
- `aeroly@x.y.z` -> `aeroly-mcp@x.y.z`

Use the same version for both packages to avoid API/doc mismatch.

## Install

Project local install (recommended):

```bash
npm i -D aeroly-mcp
```

Recommended pair install example:

```bash
npm i aeroly@1.0.1
npm i -D aeroly-mcp@1.0.1
```

## Use in Kiro

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
        "get_component_usage",
        "get_component_doc",
        "validate_generated_code",
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
        "get_component_usage",
        "get_component_doc",
        "validate_generated_code",
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
        "get_component_usage",
        "get_component_doc",
        "validate_generated_code",
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
        "get_component_usage",
        "get_component_doc",
        "validate_generated_code",
        "refresh_component_index"
      ]
    }
  }
}
```

After config is loaded, you can ask AI to call tools like:

- `list_components`
- `search_components`
- `get_component_usage`
- `get_component_doc`
- `validate_generated_code`
- `refresh_component_index`

## What Is Bundled in npm Package

This package includes prebuilt docs and index so users do not need Aeroly source docs in their project:

- `data/docs/*.md` (snapshot docs, generated from `src/*/index.md` first)
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

- `list_components`: list component metadata from index
- `search_components`: retrieve best-fit components by intent
- `get_component_usage`: usage constraints, props, examples, anti-patterns
- `get_component_doc`: full markdown doc for a component
- `validate_generated_code`: validate generated TSX with documented API/rules
- `refresh_component_index`: rebuild and hot-reload index

## Release Checklist (Maintainers)

1. Keep `aeroly-mcp` version exactly equal to target `aeroly` version.
2. Ensure `"private": false` in `mcp/package.json`.
3. Run `npm run build:all`.
4. Run `npm run smoke`.
5. Run `npm pack --dry-run` and verify `data/docs` + `data/component-index.json` are included.
6. Publish to npm.
