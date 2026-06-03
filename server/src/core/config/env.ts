/** Core config file: centralizes application configuration used by bootstrap, services, and middleware. */
import path = require('path');
import dotenv = require('dotenv');

// use of this is:
// Load server/.env from the process working directory so config is available before app startup.
dotenv.config({ path: path.resolve(process.cwd(), '.env'), quiet: true });

export const env = {
  // HTTP port Fastify listens on.
  port: process.env.PORT || '3000',
  // NODE_ENV controls production security decisions such as HTTPS-only cookies and CSP.
  nodeEnv: process.env.NODE_ENV || 'development',
  // MongoDB connection string for Mongoose.
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/skillquestx',
  // JWT secret signs and verifies API bearer tokens.
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
  // JWT expiration controls how long login sessions remain valid.
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // Angular origin allowed by CORS.
  clientUrl: process.env.CLIENT_URL || 'http://localhost:4200',
  // SMTP host used by MailService for OTP/invite emails.
  mailHost: process.env.MAIL_HOST,
  mailPort: Number(process.env.MAIL_PORT || 465),
  mailSecure: process.env.MAIL_SECURE === 'true',
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: process.env.MAIL_FROM || 'SkillQuestX <noreply@skillquestx.com>',
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY || null,
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY || null,
};

// use of this is:
// Fail server startup when required production security configuration is missing or weak.
export function validateEnv(): void {
  // Collect all errors first so deployment logs show every missing setting at once.
  const errors: string[] = [];

  // CORS needs a real origin string to avoid accidentally allowing unsafe origins.
  if (!env.clientUrl.startsWith('http://') && !env.clientUrl.startsWith('https://')) {
    errors.push('CLIENT_URL must be a valid http(s) origin.');
  }

  // Production must not run with development secrets or missing database configuration.
  if (env.nodeEnv === 'production') {
    if (env.jwtSecret === 'your-super-secret-key-change-in-production') {
      errors.push('JWT_SECRET must be set to a strong production secret.');
    }
    if (env.jwtSecret.length < 32) {
      errors.push('JWT_SECRET must be at least 32 characters in production.');
    }
    if (!env.mongodbUri) {
      errors.push('MONGODB_URI is required in production.');
    }
  }

  // Throwing here stops bootstrap before the network port opens.
  if (errors.length) {
    throw new Error(`Invalid server configuration:\n- ${errors.join('\n- ')}`);
  }
}
