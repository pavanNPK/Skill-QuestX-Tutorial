/** Server entry file: validates configuration, connects MongoDB, builds Fastify, and opens the network port. */
import { env, validateEnv } from './core/config/env';
import { connectDatabase } from './data/config/database';
import { buildApp } from './core/build-app';

async function bootstrap(): Promise<void> {
  // use of this is:
  // Start the real HTTP server for local/deployed runtime.

  // Fail fast on insecure production configuration before opening a network port.
  validateEnv();
  // Database connection is established before route registration starts accepting traffic.
  await connectDatabase();

  // Build the same Fastify app that tests can build without opening a port.
  const app = await buildApp();
  // Listen on all interfaces so Docker/cloud hosting can route traffic into the container/process.
  await app.listen({ port: Number(env.port), host: '0.0.0.0' });

  // Structured Fastify logger records the final local URL.
  app.log.info(`Fastify server running at http://localhost:${env.port}`);
}

// use of this is:
// Any startup failure should stop the process instead of running a half-configured API.
bootstrap().catch((error) => {
  console.error('Failed to start Fastify server', error);
  process.exit(1);
});
