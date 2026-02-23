/**
 * Creates the first Super Admin user. Run once from server folder:
 *   node scripts/create-super-admin.cjs
 *
 * Set env vars (or use server/.env):
 *   MONGODB_URI, SA_EMAIL, SA_PASSWORD, SA_FIRST_NAME, SA_LAST_NAME
 *
 * This file is in .gitignore — do not push to git.
 */

const path = require('path');
const fs = require('fs');

// Load .env from server folder (no dotenv dependency)
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
}

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillquestx';
const SA_EMAIL = process.env.SA_EMAIL || 'superadminsqx@skillquestx.com';
const SA_PASSWORD = process.env.SA_PASSWORD || 'ChangeMe@123';
const SA_FIRST_NAME = process.env.SA_FIRST_NAME || 'Main';
const SA_LAST_NAME = process.env.SA_LAST_NAME || 'Person';

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, lowercase: true },
    passwordHash: String,
    role: { type: String, default: 'student' },
    phoneCountry: String,
    phoneNumber: String,
    underGraduate: String,
    profileImageUrl: String,
    resumeUrl: String,
    skills: [String],
    emailVerified: Boolean,
    otpCode: String,
    otpExpiresAt: Date,
  },
  { timestamps: true, collection: 'users' }
);

const User = mongoose.model('User', userSchema);

async function createSuperAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    const existing = await User.findOne({ email: SA_EMAIL.toLowerCase() });
    if (existing) {
      console.log('Found existing user:', SA_EMAIL);
      console.log('Current role:', existing.role || '(not set)');
      
      // Always update to super_admin to fix any issues
      await User.updateOne(
        { email: SA_EMAIL.toLowerCase() },
        { $set: { role: 'super_admin' } }
      );
      
      // Verify the update
      const updated = await User.findOne({ email: SA_EMAIL.toLowerCase() });
      console.log('Updated role to:', updated.role);
      console.log('Super Admin ready:', SA_EMAIL);
      process.exit(0);
      return;
    } else {
      const passwordHash = await bcrypt.hash(SA_PASSWORD, 10);
      await User.create({
        firstName: SA_FIRST_NAME,
        lastName: SA_LAST_NAME,
        email: SA_EMAIL.toLowerCase(),
        passwordHash,
        role: 'super_admin',
        emailVerified: false,
      });
      console.log('Super Admin created:', SA_EMAIL);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

createSuperAdmin();
