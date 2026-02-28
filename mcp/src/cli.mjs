#!/usr/bin/env node

import { startServer } from './server.mjs';

startServer().catch((error) => {
  console.error('[aeroly-mcp] server error', error);
  process.exit(1);
});
