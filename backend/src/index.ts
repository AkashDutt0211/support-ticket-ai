import { config } from 'dotenv';
import { resolve } from 'node:path';
import { loadEnv } from './config/env.js';
import { createApp } from './app.js';
import { disconnectPrisma } from './lib/prisma.js';

config({ path: resolve(process.cwd(), '.env') });

const env = loadEnv();
const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});

async function shutdown(): Promise<void> {
  server.close();
  await disconnectPrisma();
  process.exit(0);
}

process.on('SIGINT', () => {
  void shutdown();
});

process.on('SIGTERM', () => {
  void shutdown();
});
