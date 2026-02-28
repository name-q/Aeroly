import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  const client = new Client(
    { name: 'aeroly-mcp-smoke-client', version: '0.1.0' },
    { capabilities: {} },
  );

  const transport = new StdioClientTransport({
    command: 'node',
    args: ['src/server.mjs'],
    cwd: process.cwd(),
    stderr: 'pipe',
  });

  await client.connect(transport);

  const tools = await client.listTools();
  const toolNames = tools.tools.map((t) => t.name);

  const search = await client.callTool({
    name: 'search_components',
    arguments: { query: 'table pagination form', limit: 3 },
  });

  const usage = await client.callTool({
    name: 'get_component_usage',
    arguments: { component: 'Select', level: 'brief' },
  });

  const doc = await client.callTool({
    name: 'get_component_doc',
    arguments: { component: 'Select', level: 'brief' },
  });

  console.log('MCP smoke test passed');
  console.log('tools:', toolNames.join(', '));
  console.log('search content type:', search.content?.[0]?.type || 'none');
  console.log('usage content type:', usage.content?.[0]?.type || 'none');
  console.log('doc content type:', doc.content?.[0]?.type || 'none');

  await client.close();
}

main().catch((err) => {
  console.error('MCP smoke test failed');
  console.error(err);
  process.exit(1);
});
