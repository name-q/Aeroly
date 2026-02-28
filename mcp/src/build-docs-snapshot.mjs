import fs from 'node:fs';
import path from 'node:path';
import { paths } from './index-builder.mjs';

const SRC_DIR = paths.repoSrcDir;
const OUTPUT_DIR = paths.snapshotDocsDir;
const OUTPUT_API_DIR = paths.snapshotApiDocsDir;

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

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function collectComponentDirs() {
  if (!exists(SRC_DIR)) {
    throw new Error(`Source dir not found: ${SRC_DIR}`);
  }

  return fs.readdirSync(SRC_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .filter((e) => !NON_COMPONENT_DIRS.has(e.name) && !e.name.startsWith('.') && !e.name.startsWith('_'))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));
}

function parseCodeAttrs(attrText) {
  const attrs = {};
  const re = /([a-zA-Z0-9_-]+)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(attrText))) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

function parseDocFrontmatter(rawInput) {
  const raw = rawInput.replace(/^\uFEFF/, '');
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) {
    return { frontmatter: {}, body: raw };
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
      frontmatter[key] = childMatch[2].trim().replace(/^['"]|['"]$/g, '');
      continue;
    }

    const topMatch = line.match(/^([A-Za-z0-9_.-]+)\s*:\s*(.+)$/);
    if (topMatch) {
      frontmatter[topMatch[1].trim()] = topMatch[2].trim().replace(/^['"]|['"]$/g, '');
      parent = '';
    }
  }

  return { frontmatter, body };
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return trimmed;
  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];
  if ((first === '"' && last === '"') || (first === '\'' && last === '\'') || (first === '`' && last === '`')) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function isEmptyTitleLine(line) {
  const m = line.match(/^\s*\*\s*title\s*:\s*(.+?)\s*$/i);
  if (!m) return false;
  const normalized = stripQuotes(m[1]).replace(/,+$/, '').trim();
  return normalized.length === 0;
}

function sanitizeDemoCode(rawCode) {
  const lines = rawCode.split(/\r?\n/);
  const filtered = lines.filter((line) => !isEmptyTitleLine(line));
  return filtered.join('\n');
}

function normalizeDescription(value) {
  return String(value || '')
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\*\//g, '*\\/')
    .trim();
}

function hasDescriptionMeta(code) {
  return /^\s*\/\*\*[\s\S]*?\*\/\s*/.test(code)
    && /(^|\n)\s*\*\s*description\s*:/i.test(code);
}

function injectDescriptionMeta(code, rawDescription) {
  const description = normalizeDescription(rawDescription);
  if (!description) return code;
  if (hasDescriptionMeta(code)) return code;

  const headComment = code.match(/^(\s*\/\*\*[\s\S]*?\*\/)(\s*\n?)/);
  if (headComment) {
    const block = headComment[1];
    const gap = headComment[2] || '';
    const withDescription = block.replace(/\*\/\s*$/, ` * description: ${description}\n */`);
    return `${withDescription}${gap}${code.slice(headComment[0].length)}`;
  }

  return `/**\n * description: ${description}\n */\n${code}`;
}

function inlineDemoTags(componentDir, markdown, report) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let section = '';

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      section = h2[1].trim();
      output.push(line);
      continue;
    }

    const codeTag = line.match(/<code\s+([^>]*?)><\/code>/);
    if (!codeTag) {
      output.push(line);
      continue;
    }

    const attrs = parseCodeAttrs(codeTag[1] || '');
    const src = attrs.src || '';
    const id = attrs.id || '';
    const description = attrs.description || '';
    const absDemoPath = path.resolve(SRC_DIR, componentDir, src);

    let code = '';
    let missing = false;
    if (src && exists(absDemoPath)) {
      code = sanitizeDemoCode(read(absDemoPath));
      code = injectDescriptionMeta(code, description).trimEnd();
    } else {
      missing = true;
      code = `// demo source not found: ${src || '(empty src)'}`;
      report.missingExamples.push(src || '(empty src)');
    }

    report.totalExamples += 1;
    if (!missing) report.inlinedExamples += 1;
    report.examples.push({
      section,
      source: src,
      id,
      description,
    });

    output.push('```tsx');
    output.push(code);
    output.push('```');
  }

  return output.join('\n');
}

function extractApiOnlyMarkdown(markdown, fallbackTitle) {
  const lines = markdown.split(/\r?\n/);
  const titleLine = lines.find((line) => /^#\s+/.test(line)) || `# ${fallbackTitle}`;

  let apiStart = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s+api\b/i.test(lines[i].trim())) {
      apiStart = i;
      break;
    }
  }

  if (apiStart === -1) {
    return `${titleLine.trim()}\n`;
  }

  let apiEnd = lines.length;
  for (let i = apiStart + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) {
      apiEnd = i;
      break;
    }
  }

  const apiSection = lines.slice(apiStart, apiEnd).join('\n').trim();
  if (!apiSection) {
    return `${titleLine.trim()}\n`;
  }

  return `${titleLine.trim()}\n\n${apiSection}\n`;
}

function main() {
  const components = collectComponentDirs();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(OUTPUT_API_DIR, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: 'src/*/index.md (fallback index.zh-CN.md)',
    totalComponents: 0,
    totalExamples: 0,
    inlinedExamples: 0,
    missingExamples: 0,
    components: [],
  };

  for (const componentDir of components) {
    const zhDoc = path.join(SRC_DIR, componentDir, 'index.zh-CN.md');
    const enDoc = path.join(SRC_DIR, componentDir, 'index.md');
    const docPath = exists(enDoc) ? enDoc : (exists(zhDoc) ? zhDoc : '');
    if (!docPath) continue;
    const selectedLang = docPath === enDoc ? 'en-US' : 'zh-CN';

    const raw = read(docPath);
    const { frontmatter, body } = parseDocFrontmatter(raw);
    const report = {
      component: componentDir,
      sourceDocPath: path.relative(paths.repoRoot, docPath),
      outputDocPath: path.relative(paths.mcpRoot, path.join(OUTPUT_DIR, `${componentDir}.md`)),
      outputApiDocPath: path.relative(paths.mcpRoot, path.join(OUTPUT_API_DIR, `${componentDir}.md`)),
      title: frontmatter.title || componentDir,
      groupTitle: frontmatter['group.title'] || frontmatter.group || '',
      navTitle: frontmatter['nav.title'] || '',
      toc: frontmatter.toc || '',
      lang: selectedLang,
      totalExamples: 0,
      inlinedExamples: 0,
      missingExamples: [],
      examples: [],
    };

    const inlined = inlineDemoTags(componentDir, body, report);
    const apiOnly = extractApiOnlyMarkdown(body, report.title);
    write(path.join(OUTPUT_DIR, `${componentDir}.md`), `${inlined.trimStart().trimEnd()}\n`);
    write(path.join(OUTPUT_API_DIR, `${componentDir}.md`), `${apiOnly.trimStart().trimEnd()}\n`);

    manifest.totalComponents += 1;
    manifest.totalExamples += report.totalExamples;
    manifest.inlinedExamples += report.inlinedExamples;
    manifest.missingExamples += report.missingExamples.length;
    manifest.components.push(report);
  }

  write(path.join(OUTPUT_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.error(`[aeroly-mcp] Snapshot docs generated: ${manifest.totalComponents} components`);
  console.error(`[aeroly-mcp] Inlined examples: ${manifest.inlinedExamples}/${manifest.totalExamples}`);
  console.error(`[aeroly-mcp] Missing examples: ${manifest.missingExamples}`);
  console.error(`[aeroly-mcp] Output dir: ${OUTPUT_DIR}`);
}

main();
