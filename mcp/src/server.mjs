import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as z from 'zod/v4';
import { buildComponentIndex, readComponentIndex, writeComponentIndex, paths } from './index-builder.mjs';

function ensureIndex() {
  const inFile = readComponentIndex();
  if (inFile && inFile.totalComponents > 0) return inFile;
  const built = buildComponentIndex();
  writeComponentIndex(built);
  return built;
}

let indexData = ensureIndex();

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter((t) => t.length > 1);
}

function normalizeMatchKey(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '');
}

function extractEnglishTokens(text) {
  return String(text || '').match(/[A-Za-z][A-Za-z0-9]*/g) || [];
}

function getComponentKeys(component) {
  const keys = new Set();
  keys.add(String(component.name || '').toLowerCase());
  keys.add(String(component.slug || '').toLowerCase());

  for (const token of extractEnglishTokens(component.name)) {
    keys.add(token.toLowerCase());
  }

  return [...keys].filter(Boolean);
}

function scoreComponent(queryTokens, component) {
  const name = component.name.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (name === token) score += 120;
    else if (name.includes(token)) score += 55;
    if (component.keywords.includes(token)) score += 14;
    if ((component.description || '').toLowerCase().includes(token)) score += 8;
    if ((component.group || '').toLowerCase().includes(token)) score += 5;
  }

  if (queryTokens.length === 0) score = 1;
  return score;
}

function rankComponents(query, limit = 8) {
  const tokens = tokenize(query);
  return [...indexData.components]
    .map((component) => ({
      component,
      score: scoreComponent(tokens, component),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function selectTop(query, limit = 8) {
  return rankComponents(query, limit)
    .map((x) => x.component);
}

function resolveComponent(query) {
  const input = String(query || '').trim();
  if (!input) {
    return {
      component: null,
      suggestions: [],
      matchedBy: null,
    };
  }

  const qLower = input.toLowerCase();
  const qNorm = normalizeMatchKey(input);
  const exact = [];
  const normalized = [];
  const partial = [];

  for (const component of indexData.components) {
    const keys = getComponentKeys(component);
    const normalizedKeys = keys.map((k) => normalizeMatchKey(k));

    if (keys.includes(qLower)) {
      exact.push(component);
      continue;
    }

    if (qNorm && normalizedKeys.includes(qNorm)) {
      normalized.push(component);
      continue;
    }

    const hasPartial = keys.some((k) => k.includes(qLower))
      || (qNorm && normalizedKeys.some((k) => k.includes(qNorm)));
    if (hasPartial) partial.push(component);
  }

  if (exact.length === 1) {
    return { component: exact[0], suggestions: [], matchedBy: 'exact' };
  }

  if (normalized.length === 1) {
    return { component: normalized[0], suggestions: [], matchedBy: 'normalized' };
  }

  if (partial.length === 1) {
    return { component: partial[0], suggestions: [], matchedBy: 'partial' };
  }

  const ranked = rankComponents(input, 5);
  if (ranked.length > 0) {
    if (ranked.length === 1) {
      return { component: ranked[0].component, suggestions: [], matchedBy: 'ranked' };
    }
    if (ranked[0].score >= ranked[1].score + 30) {
      return { component: ranked[0].component, suggestions: [], matchedBy: 'ranked' };
    }
  }

  const suggestions = (exact.length > 0 ? exact
    : (normalized.length > 0 ? normalized
      : (partial.length > 0 ? partial : ranked.map((x) => x.component))))
    .slice(0, 5)
    .map((c) => c.name);

  return {
    component: null,
    suggestions,
    matchedBy: null,
  };
}

function toJsonResult(data) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
    structuredContent: data,
  };
}

function toTextResult(text) {
  return {
    content: [
      {
        type: 'text',
        text: String(text || ''),
      },
    ],
  };
}

function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, '<br/>');
}

function buildApiTableLines(props) {
  const extraHeaders = [];
  for (const row of props) {
    const keys = Object.keys(row?.extra || {});
    for (const key of keys) {
      if (!extraHeaders.includes(key)) extraHeaders.push(key);
    }
  }

  const headers = ['Property', 'Description', 'Type', 'Default', ...extraHeaders];
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...props.map((p) => {
      const row = [
        escapeCell(p.name),
        escapeCell(p.description),
        escapeCell(p.type),
        escapeCell(p.default),
        ...extraHeaders.map((key) => escapeCell(p?.extra?.[key] ?? '')),
      ];
      return `| ${row.join(' | ')} |`;
    }),
  ];
}

function renderBriefDocFromIndex(component) {
  const lines = [`# ${component.name}`, '', '## API', ''];
  const sections = Array.isArray(component.apiSections) ? component.apiSections : [];

  if (sections.length > 0) {
    for (const section of sections) {
      const title = String(section?.name || '').trim() || component.name;
      const props = Array.isArray(section?.props) ? section.props : [];
      lines.push(`### ${title}`);
      lines.push('');
      if (props.length > 0) {
        lines.push(...buildApiTableLines(props));
      } else {
        lines.push('_No API rows found._');
      }
      lines.push('');
    }
    return `${lines.join('\n').trimEnd()}\n`;
  }

  if (Array.isArray(component.props) && component.props.length > 0) {
    lines.push(`### ${component.name}`);
    lines.push('');
    lines.push(...buildApiTableLines(component.props));
    lines.push('');
    return `${lines.join('\n').trimEnd()}\n`;
  }

  lines.push('_No API section found._');
  lines.push('');
  return `${lines.join('\n').trimEnd()}\n`;
}

function formatNotFoundText(componentName, suggestions = []) {
  const lines = [`Component "${componentName}" not found in component index.`];
  if (Array.isArray(suggestions) && suggestions.length > 0) {
    lines.push('');
    lines.push('Did you mean:');
    suggestions.slice(0, 5).forEach((name) => lines.push(`- ${name}`));
  }
  return `${lines.join('\n')}\n`;
}

function readComponentDocText(componentName, level = 'brief') {
  const resolved = resolveComponent(componentName);
  const c = resolved.component;
  if (!c) {
    return formatNotFoundText(componentName, resolved.suggestions);
  }

  if (level === 'brief') {
    if (c.apiDocPath) {
      const absApiDocPath = path.resolve(paths.mcpRoot, c.apiDocPath);
      if (fs.existsSync(absApiDocPath)) {
        const markdown = fs.readFileSync(absApiDocPath, 'utf8');
        return markdown;
      }
    }

    return renderBriefDocFromIndex(c);
  }

  const absDocPath = path.resolve(paths.mcpRoot, c.docPath);
  if (!fs.existsSync(absDocPath)) {
    return `Doc file not found: ${c.docPath}\n`;
  }

  return fs.readFileSync(absDocPath, 'utf8');
}

const server = new McpServer({
  name: 'aeroly-component-mcp',
  version: '0.1.0',
});

server.registerTool(
  'list_components',
  {
    description: 'List Aeroly components from index built from src/*/index.md.',
    inputSchema: {
      group: z.string().optional().describe('Optional group filter, e.g. Data Entry, Feedback'),
      limit: z.number().int().min(1).max(500).optional().describe('Deprecated hint. Ignored to avoid truncating component list.'),
    },
  },
  async ({ group, limit }) => {
    let components = indexData.components;
    if (group) {
      const g = group.toLowerCase();
      components = components.filter((c) => (c.group || '').toLowerCase().includes(g));
    }
    const result = components.map((c) => ({
      name: c.name,
      group: c.group,
      docPath: c.docPath,
      description: c.description,
    }));
    return toJsonResult({
      total: result.length,
      requestedLimit: limit ?? null,
      limitIgnored: typeof limit === 'number',
      generatedAt: indexData.generatedAt,
      components: result,
    });
  },
);

server.registerTool(
  'search_components',
  {
    description: 'Search components by intent/keyword for Pen-to-code selection.',
    inputSchema: {
      query: z.string().describe('Intent or keyword, e.g. form validation modal table pagination'),
      limit: z.number().int().min(1).max(20).optional().describe('Top-k results'),
    },
  },
  async ({ query, limit }) => {
    const top = selectTop(query, limit ?? 8).map((c) => ({
      name: c.name,
      group: c.group,
      description: c.description,
      keyProps: c.props.slice(0, 10).map((p) => p.name),
      docPath: c.docPath,
    }));

    return toJsonResult({
      query,
      total: top.length,
      results: top,
    });
  },
);

server.registerTool(
  'get_component_doc',
  {
    description: 'Get component markdown doc text. level=brief returns API-only doc (default); level=full returns full doc with demos.',
    inputSchema: {
      component: z.string().describe('Component name, e.g. Select, Modal, Input'),
      level: z.enum(['brief', 'full']).optional().describe('brief: API-only markdown (default), full: complete markdown'),
    },
  },
  async ({ component, level }) => toTextResult(readComponentDocText(component, level || 'brief')),
);

server.registerTool(
  'refresh_component_index',
  {
    description: 'Rebuild component index from src/*/index.md and hot-reload server memory.',
    inputSchema: {},
  },
  async () => {
    const next = buildComponentIndex();
    writeComponentIndex(next);
    indexData = next;
    return toJsonResult({
      refreshed: true,
      generatedAt: indexData.generatedAt,
      totalComponents: indexData.totalComponents,
    });
  },
);

export async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[aeroly-mcp] server started on stdio');
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isDirectRun) {
  startServer().catch((error) => {
    console.error('[aeroly-mcp] server error', error);
    process.exit(1);
  });
}
