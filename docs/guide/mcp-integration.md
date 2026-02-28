---
title: MCP Integration
order: 2
nav:
  title: Guide
  path: /guide
  order: -1
toc: content
---

# MCP Integration

Aeroly ships with an official MCP (Model Context Protocol) Server — `aeroly-mcp`. It lets AI coding assistants query component documentation, search APIs, and retrieve usage examples in real time, so the AI always generates correct Aeroly code without hallucinating props or misusing components.

---

## Why MCP?

When AI writes code with a component library, it often guesses prop names, invents non-existent APIs, or uses outdated patterns. MCP solves this by giving the AI a live connection to the actual component index:

- AI calls `search_components` to find the right component for a task
- AI calls `get_component_doc` to read the exact API table before generating code
- No stale training data — the docs come from the same version you installed

The result: fewer hallucinations, fewer fix-up rounds, faster development.

---

## Quick Setup

Install via npx — no global install needed. Add this to your IDE's MCP config:

### Kiro

Workspace config: `.kiro/settings/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": ["-y", "aeroly-mcp@latest"],
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

### Claude Code

Project config: `.claude/settings.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": ["-y", "aeroly-mcp@latest"]
    }
  }
}
```

### Cursor

Project config: `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "aeroly": {
      "command": "npx",
      "args": ["-y", "aeroly-mcp@latest"]
    }
  }
}
```

After config is loaded, the AI can call the tools automatically — no manual invocation needed.

---

## Available Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all components with metadata. Supports `group`, `query`, `offset`, `limit` for filtering and pagination. |
| `search_components` | Semantic search by intent. e.g. "form validation modal" returns the best-matching components ranked by relevance. |
| `get_component_doc` | Returns component markdown. `level="brief"` (default) for API-only output; `level="full"` for complete docs with demo code. |
| `refresh_component_index` | Rebuild the component index and hot-reload into server memory. |

---

## How It Works in Practice

### Scenario: Build a user settings page

You tell the AI:

> "Build a user settings page with a form for profile info, a password change section, and a save button."

Behind the scenes, the AI:

1. Calls `search_components` with query `"form input button"` to find relevant components
2. Calls `get_component_doc` for `Form`, `Input`, `Button` to read their exact props
3. Generates code using the correct API — `Form.Item`, `rules`, `onFinish`, etc.

Without MCP, the AI might guess that `Form` uses `onSubmit` (it uses `onFinish`), or that validation rules go on `Form` instead of `Form.Item`. With MCP, it reads the actual API first.

### Scenario: Pick the right component

You tell the AI:

> "I need a cascading selector for province/city/district."

The AI calls `search_components` with `"cascading selector"`, gets back `Cascader` as the top result, then reads its full doc to understand `options` structure, `onChange` signature, and `loadData` for async loading.

---

## Token Optimization

MCP responses are designed to be token-efficient:

- `level="brief"` (default) returns only the component title and API table — typically 30-50 lines
- `level="full"` returns the complete doc with inline demo code — use when the AI needs usage examples
- `list_components` supports pagination (`offset`/`limit`) to avoid loading all 57 components at once

For most code generation tasks, `brief` is sufficient. The AI only needs to escalate to `full` when it needs to understand complex patterns (e.g. Form validation rules, Table custom columns).

---

## Version Matching

`aeroly-mcp` follows 1:1 version mapping with `aeroly`:

| aeroly | aeroly-mcp |
|--------|------------|
| 1.0.1  | 1.0.1     |
| x.y.z  | x.y.z     |

Using `@latest` is fine for most cases. Pin a specific version if you need strict API consistency:

```json
{
  "args": ["aeroly-mcp@1.0.1"]
}
```

---

## What's Bundled

The npm package includes prebuilt data so it works without Aeroly source code:

- `data/docs/*.md` — full component docs with inlined demo code
- `data/docs-api/*.md` — API-only docs (title + props table)
- `data/component-index.json` — structured index with props, keywords, controlled pairs, and anti-patterns

No network requests, no external dependencies — everything runs locally via stdio.

---

## Combining with Pencil

MCP and Pencil complement each other in the AI workflow:

1. **Design phase**: AI reads `Aeroly.pen` via Pencil MCP to compose visual layouts
2. **Code generation phase**: AI reads component APIs via `aeroly-mcp` to generate correct React code
3. **Iteration**: modify the design, regenerate code — both tools stay in sync because they reference the same component library

This gives you a complete loop: **Design → Code → Iterate**, all AI-assisted.

---

## Links

- [aeroly-mcp on npm](https://www.npmjs.com/package/aeroly-mcp)
- [Aeroly on GitHub](https://github.com/name-q/Aeroly)
- [Aeroly Documentation](https://aeroly.zeroc.top/)
