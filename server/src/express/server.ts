import { env } from './config/env';
import { connectDatabase } from './config/database';
import { createExpressApp } from './app';

async function bootstrap(): Promise<void> {
  await connectDatabase();
  const app = createExpressApp();
  app.listen(Number(env.port), () => {
    console.log(`Express server running at http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start Express server', error);
  process.exit(1);
});
