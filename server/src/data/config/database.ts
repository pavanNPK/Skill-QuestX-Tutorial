/** Core config file: centralizes application configuration used by bootstrap, services, and middleware. */
import mongoose = require('mongoose');
import { env } from '../../core/config/env';

export async function connectDatabase(): Promise<void> {
  // use of this is:
  // Open one Mongoose connection using the validated/configured MongoDB URI before serving requests.
  await mongoose.connect(env.mongodbUri);
}
