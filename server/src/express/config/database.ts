import mongoose = require('mongoose');
import { env } from './env';

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.mongodbUri);
}
