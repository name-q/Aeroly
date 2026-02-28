import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MCP_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(MCP_ROOT, '..');
const REPO_SRC_DIR = path.join(REPO_ROOT, 'src');
const SNAPSHOT_DOCS_DIR = path.join(MCP_ROOT, 'data', 'docs');
const OUTPUT_PATH = path.join(MCP_ROOT, 'data', 'component-index.json');

const NON_COMPONENT_DIRS = new Set([
  '__tests__',
  'styles',
  'utils',
  'locale',
  'hero',
  'DemoBox',
]);

function exists(filePath) {
  return fs.existsSync(filePath);
}

function isDir(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function readJsonSafe(filePath) {
  const raw = readFileSafe(filePath);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function listMdFiles(dir) {
  if (!isDir(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => path.join(dir, e.name))
    .sort((a, b) => a.localeCompare(b));
}

function detectSourceKind(rootPath) {
  if (!isDir(rootPath)) return null;
  const mdFiles = listMdFiles(rootPath);
  if (mdFiles.length > 0) return 'flat_docs';

  const hasComponentDirs = fs.readdirSync(rootPath, { withFileTypes: true })
    .some((e) => e.isDirectory() && !NON_COMPONENT_DIRS.has(e.name) && !e.name.startsWith('.'));
  if (hasComponentDirs) return 'component_src';
  return null;
}

function resolveDocsSource() {
  const envRoot = process.env.AEROLY_DOCS_ROOT
    ? path.resolve(process.env.AEROLY_DOCS_ROOT)
    : '';
  if (envRoot) {
    const kind = detectSourceKind(envRoot);
    if (kind) {
      return {
        kind,
        root: envRoot,
        sourceLabel: `env:${envRoot}`,
      };
    }
  }

  const snapshotKind = detectSourceKind(SNAPSHOT_DOCS_DIR);
  if (snapshotKind) {
    return {
      kind: snapshotKind,
      root: SNAPSHOT_DOCS_DIR,
      sourceLabel: 'mcp/data/docs/*.md',
    };
  }

  const repoKind = detectSourceKind(REPO_SRC_DIR);
  if (repoKind) {
    return {
      kind: repoKind,
      root: REPO_SRC_DIR,
      sourceLabel: 'repo:src/*/index.md|index.zh-CN.md',
    };
  }

  throw new Error(
    'No valid docs source found. Provide AEROLY_DOCS_ROOT, or include mcp/data/docs, or run inside Aeroly repo.',
  );
}

function parseFrontmatter(rawInput) {
  const raw = rawInput.replace(/^\uFEFF/, '');
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) {
    const inlineMeta = parseInlineMeta(raw);
    return { body: inlineMeta.body, frontmatter: inlineMeta.frontmatter };
  }

  const yamlText = (fmMatch[1] || '').trim();
  const body = raw.slice(fmMatch[0].length);
  const frontmatter = {};

  let parent = '';
  for (const rawLine of yamlText.split(/\r?\n/)) {
    const line = rawLine.replace(/\t/g, '  ');
    if (!line.trim()) continue;

    const parentMatch = line.match(/^([A-Za-z0-9_.-]+)\s*:\s*$/);
    if (parentMatch) {
      parent = parentMatch[1];
      continue;
    }

    const childMatch = line.match(/^\s+([A-Za-z0-9_.-]+)\s*:\s*(.+)$/);
    if (childMatch && parent) {
      const key = `${parent}.${childMatch[1]}`;
      const value = childMatch[2].trim().replace(/^['"]|['"]$/g, '');
      frontmatter[key] = value;
      continue;
    }

    const topMatch = line.match(/^([A-Za-z0-9_.-]+)\s*:\s*(.+)$/);
    if (topMatch) {
      const key = topMatch[1].trim();
      const value = topMatch[2].trim().replace(/^['"]|['"]$/g, '');
      frontmatter[key] = value;
      parent = '';
    }
  }

  return { body, frontmatter };
}

function parseInlineMeta(rawInput) {
  const raw = rawInput.replace(/^\uFEFF/, '');
  const m = raw.match(/^\s*<!--\s*AEROLY_META\s+([^>]+?)\s*-->\s*/);
  if (!m) {
    return { body: raw, frontmatter: {} };
  }

  const attrsText = m[1] || '';
  const attrs = {};
  const re = /([A-Za-z0-9_.-]+)\s*=\s*"([^"]*)"/g;
  let x;
  while ((x = re.exec(attrsText))) {
    attrs[x[1]] = x[2];
  }

  const frontmatter = {};
  if (attrs.title) frontmatter.title = attrs.title;
  if (attrs.groupTitle) frontmatter['group.title'] = attrs.groupTitle;
  if (attrs.group) frontmatter.group = attrs.group;
  if (attrs.navTitle) frontmatter['nav.title'] = attrs.navTitle;
  if (attrs.toc) frontmatter.toc = attrs.toc;

  const body = raw.slice(m[0].length);
  return { body, frontmatter };
}

function parseTitle(body, fallback) {
  const m = body.match(/^#\s+(.+)$/m);
  return (m?.[1] || fallback).trim();
}

function parseDescription(body) {
  const lines = body.split('\n');
  let foundTitle = false;
  const desc = [];

  for (const line of lines) {
    if (!foundTitle) {
      if (/^#\s+/.test(line)) {
        foundTitle = true;
      }
      continue;
    }

    if (line.trim().length === 0) {
      if (desc.length > 0) break;
      continue;
    }

    if (/^##\s+/.test(line)) break;
    desc.push(line.trim());
  }

  return desc.join(' ').trim();
}

function parseExamples(body) {
  const lines = body.split('\n');
  const examples = [];
  let section = '';

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      section = h2[1].trim();
      continue;
    }

    if (section.toLowerCase() === 'api') {
      break;
    }

    const codeTag = line.match(/<code\s+src="([^"]+)"(?:\s+id="([^"]+)")?(?:\s+description="([^"]+)")?\s*><\/code>/);
    if (codeTag) {
      examples.push({
        section,
        source: codeTag[1],
        id: codeTag[2] || '',
        description: codeTag[3] || '',
      });
      continue;
    }

    const marker = line.match(/<!--\s*AEROLY_DEMO\s+src="([^"]+)"(?:\s+id="([^"]*)")?(?:\s+description="([^"]*)")?\s*-->/);
    if (marker) {
      examples.push({
        section,
        source: marker[1],
        id: marker[2] || '',
        description: marker[3] || '',
      });
    }
  }

  return examples;
}

function parseMarkdownTables(body) {
  const lines = body.split('\n');
  const tables = [];
  let currentSection = '';

  for (let i = 0; i < lines.length; i += 1) {
    const h3 = lines[i].match(/^###\s+(.+)$/);
    if (h3) {
      currentSection = h3[1].trim();
      continue;
    }

    if (!lines[i].startsWith('|')) {
      continue;
    }

    if (i + 1 >= lines.length || !/^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())) {
      continue;
    }

    const headers = lines[i].split('|').slice(1, -1).map((v) => v.trim());
    const rows = [];

    i += 2;
    while (i < lines.length && lines[i].startsWith('|')) {
      const cols = lines[i].split('|').slice(1, -1).map((v) => v.trim());
      if (cols.length === headers.length) {
        rows.push(cols);
      }
      i += 1;
    }
    i -= 1;

    tables.push({
      section: currentSection || 'Main',
      headers,
      rows,
    });
  }

  return tables;
}

function normalizePropRow(headers, row) {
  const obj = {};
  headers.forEach((h, idx) => {
    obj[h.toLowerCase()] = row[idx] ?? '';
  });

  return {
    name: obj.property || obj['属性'] || '',
    description: obj.description || obj['说明'] || '',
    type: obj.type || obj['类型'] || '',
    default: obj.default || obj['默认值'] || '',
  };
}

function parseApiSections(body) {
  const tables = parseMarkdownTables(body);
  const apiSections = [];

  for (const table of tables) {
    const header0 = (table.headers[0] || '').toLowerCase();
    if (!(header0 === 'property' || header0 === '属性')) {
      continue;
    }

    const props = table.rows
      .map((row) => normalizePropRow(table.headers, row))
      .filter((r) => r.name);

    if (props.length > 0) {
      apiSections.push({
        name: table.section,
        props,
      });
    }
  }

  return apiSections;
}

function pickPrimaryProps(componentName, apiSections) {
  if (apiSections.length === 0) return [];
  const exact = apiSections.find((s) => s.name.toLowerCase() === componentName.toLowerCase());
  return exact ? exact.props : apiSections[0].props;
}

function deriveControlledPairs(props) {
  const propNames = new Set(props.map((p) => p.name));
  const pairs = [];
  if (propNames.has('value') && propNames.has('onChange')) pairs.push(['value', 'onChange']);
  if (propNames.has('open') && propNames.has('onOpenChange')) pairs.push(['open', 'onOpenChange']);
  if (propNames.has('checked') && propNames.has('onChange')) pairs.push(['checked', 'onChange']);
  return pairs;
}

function deriveAntiPatterns(componentName, props, pairs) {
  const rules = [];
  for (const [stateProp, eventProp] of pairs) {
    rules.push({
      id: `controlled-pair-${stateProp}-${eventProp}`,
      severity: 'error',
      message: `${componentName}: when using \`${stateProp}\` in controlled mode, also provide \`${eventProp}\`.`,
      ruleType: 'controlled_pair',
      stateProp,
      eventProp,
    });
  }

  const propNames = new Set(props.map((p) => p.name));
  if (propNames.has('value') && propNames.has('defaultValue')) {
    rules.push({
      id: 'mixed-controlled-uncontrolled',
      severity: 'warning',
      message: `${componentName}: avoid using \`value\` and \`defaultValue\` together.`,
      ruleType: 'mutual_exclusion',
      props: ['value', 'defaultValue'],
    });
  }
  if (propNames.has('open') && propNames.has('defaultOpen')) {
    rules.push({
      id: 'mixed-open-default-open',
      severity: 'warning',
      message: `${componentName}: avoid using \`open\` and \`defaultOpen\` together.`,
      ruleType: 'mutual_exclusion',
      props: ['open', 'defaultOpen'],
    });
  }
  return rules;
}

function tokenize(...texts) {
  const bag = new Set();
  const joined = texts.filter(Boolean).join(' ').toLowerCase();
  for (const token of joined.split(/[^a-z0-9\u4e00-\u9fa5]+/)) {
    if (token && token.length >= 2) {
      bag.add(token);
    }
  }
  return Array.from(bag).sort();
}

function collectDocsFromFlat(root) {
  return listMdFiles(root).map((docPath) => ({
    componentDir: path.basename(docPath, '.md'),
    docPath,
  }));
}

function collectDocsFromComponentSrc(root) {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .filter((e) => !NON_COMPONENT_DIRS.has(e.name) && !e.name.startsWith('.') && !e.name.startsWith('_'))
    .map((e) => {
      const zh = path.join(root, e.name, 'index.zh-CN.md');
      const en = path.join(root, e.name, 'index.md');
      const docPath = exists(en) ? en : (exists(zh) ? zh : '');
      return docPath ? { componentDir: e.name, docPath } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.componentDir.localeCompare(b.componentDir));
}

function collectComponentDocs(source) {
  if (source.kind === 'flat_docs') return collectDocsFromFlat(source.root);
  return collectDocsFromComponentSrc(source.root);
}

function loadSnapshotManifestMap(source) {
  const byComponent = new Map();
  if (source.kind !== 'flat_docs') return byComponent;

  const manifestPath = path.join(source.root, 'manifest.json');
  const manifest = readJsonSafe(manifestPath);
  if (!manifest || !Array.isArray(manifest.components)) return byComponent;

  for (const item of manifest.components) {
    const key = String(item?.component || '').trim().toLowerCase();
    if (key) {
      byComponent.set(key, item);
    }
  }

  return byComponent;
}

function buildComponentRecord(item, manifestByComponent) {
  const raw = readFileSafe(item.docPath);
  if (!raw) return null;

  const manifestItem = manifestByComponent.get(item.componentDir.toLowerCase()) || null;
  const { body, frontmatter } = parseFrontmatter(raw);
  const componentName = parseTitle(body, frontmatter.title || manifestItem?.title || item.componentDir);
  const description = parseDescription(body);
  const parsedExamples = parseExamples(body);
  const examples = parsedExamples.length > 0
    ? parsedExamples
    : (Array.isArray(manifestItem?.examples) ? manifestItem.examples : []);
  const apiSections = parseApiSections(body);
  const props = pickPrimaryProps(componentName, apiSections);
  const controlledPairs = deriveControlledPairs(props);
  const antiPatterns = deriveAntiPatterns(componentName, props, controlledPairs);
  const group = frontmatter['group.title'] || frontmatter.group || manifestItem?.groupTitle || manifestItem?.group || '';

  const keywords = tokenize(
    componentName,
    group,
    description,
    examples.map((e) => e.section).join(' '),
    props.map((p) => p.name).join(' '),
    props.map((p) => p.description).join(' '),
  );

  return {
    name: componentName,
    slug: item.componentDir.toLowerCase(),
    group,
    docPath: path.relative(MCP_ROOT, item.docPath),
    description,
    props,
    apiSections,
    examples,
    controlledPairs,
    antiPatterns,
    keywords,
  };
}

export function buildComponentIndex() {
  const source = resolveDocsSource();
  const docs = collectComponentDocs(source);
  const manifestByComponent = loadSnapshotManifestMap(source);
  const components = docs.map((item) => buildComponentRecord(item, manifestByComponent)).filter(Boolean);

  return {
    generatedAt: new Date().toISOString(),
    source: source.sourceLabel,
    totalComponents: components.length,
    components,
  };
}

export function writeComponentIndex(indexData) {
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(indexData, null, 2)}\n`, 'utf8');
}

export function readComponentIndex() {
  const raw = readFileSafe(OUTPUT_PATH);
  if (!raw) return null;
  return JSON.parse(raw);
}

export const paths = {
  mcpRoot: MCP_ROOT,
  repoRoot: REPO_ROOT,
  repoSrcDir: REPO_SRC_DIR,
  snapshotDocsDir: SNAPSHOT_DOCS_DIR,
  outputPath: OUTPUT_PATH,
};
