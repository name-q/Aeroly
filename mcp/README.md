# Aeroly MCP

Aeroly MCP is a standalone subproject that provides component retrieval and code validation for Pen-to-code workflows.

Important for npm usage:

- Aeroly runtime package usually does not ship `src/*/index.md`.
- This MCP package ships its own docs snapshot and index under `mcp/data/`.
- `<code src="...">` tags are inlined to real TSX code during snapshot build, so users do not see broken demo paths.

## Setup

```bash
cd mcp
npm install
npm run build:all
```

## Run

```bash
cd mcp
npm start
```

## Tools

- `list_components`: List components from docs index
- `search_components`: Retrieve best-fit components for a user intent
- `get_component_usage`: Fetch key props, examples, and anti-pattern rules for one component (supports aliases like `Form` -> `Form 表单`)
- `get_component_doc`: Get full component markdown doc (snapshot, demos inlined; supports component aliases)
- `validate_generated_code`: Validate generated TSX against documented API and controlled/uncontrolled rules
- `refresh_component_index`: Rebuild and reload index from `src/*/index.md`

Notes:

- `list_components` keeps `limit` only for backward compatibility and ignores it by default to avoid accidental truncation (for example, `limit: 50`).

## Data Source

Single source of truth in repository development is `src/*/index.md` (fallback `index.zh-CN.md`).

For published npm package:

- snapshot docs: `mcp/data/docs/*.md` (content is generated from `index.md` first)
- index file: `mcp/data/component-index.json`

During publish, docs snapshot and index are built by `prepack`.
