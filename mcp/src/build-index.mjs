import fs from 'node:fs';
import { buildComponentIndex, readComponentIndex, writeComponentIndex, paths } from './index-builder.mjs';

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function printSummary(indexData) {
  console.error(`[aeroly-mcp] Indexed ${indexData.totalComponents} components from ${indexData.source}`);
  console.error(`[aeroly-mcp] Output: ${paths.outputPath}`);
}

function main() {
  const args = new Set(process.argv.slice(2));
  const checkMode = args.has('--check');

  const next = buildComponentIndex();

  if (checkMode) {
    const current = readComponentIndex();
    if (!current) {
      console.error('[aeroly-mcp] component-index.json does not exist. Run build:index first.');
      process.exit(1);
    }

    const currentWithoutTimestamp = { ...current, generatedAt: '' };
    const nextWithoutTimestamp = { ...next, generatedAt: '' };
    const same = deepEqual(currentWithoutTimestamp, nextWithoutTimestamp);
    if (!same) {
      console.error('[aeroly-mcp] component-index.json is stale. Please run `npm run build:index` in mcp/.');
      process.exit(1);
    }
    console.error('[aeroly-mcp] component-index.json is up to date.');
    return;
  }

  writeComponentIndex(next);
  printSummary(next);

  // Ensure file exists for downstream tools in CI and local usage.
  if (!fs.existsSync(paths.outputPath)) {
    console.error('[aeroly-mcp] Failed to write component index.');
    process.exit(1);
  }
}

main();
