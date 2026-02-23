/**
 * Seeds the Course collection with full Popular Courses data (description, author, price, discount, ratings).
 * Run from server folder: node scripts/seed-courses.cjs
 *
 * Uses MONGODB_URI from server/.env (or default mongodb://localhost:27017/skillquestx).
 * Skips inserting if a course with the same name already exists.
 * ratingAverage/ratingCount are dummy for now; later replace with real ratings (who gave, how many).
 */

const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
}

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillquestx';

// Full course data matching Popular Courses UI (description, author, price, discount, rating placeholder)
const COURSES = [
  { name: 'Program Overview', description: 'Medical Coding is a core healthcare profession that involves translating clinical documentation such as diagnoses, procedures, and services into standardized medical codes.', author: 'SkillQuestX Team', price: 150, discount: 33, thumbnail: 'assets/images/medical-coding.jpg', accentColor: '#5B4BC4' },
  { name: 'Course Highlights', description: 'Comprehensive coverage of ICD-10-CM, ICD-10-PCS, CPT, and HCPCS Level II coding systems with trainer-led live sessions.', author: 'SkillQuestX Team', price: 150, discount: 20, thumbnail: 'assets/images/course-highlights.jpg', accentColor: '#f59e0b' },
  { name: 'Who Should Enroll', description: 'Life Science graduates, Pharmacy, Nursing, Allied Health professionals, and those transitioning into healthcare IT and RCM roles.', author: 'SkillQuestX Team', price: 150, discount: 0, thumbnail: 'assets/images/who-enroll.jpg', accentColor: '#10b981' },
  { name: 'Curriculum Summary', description: 'Healthcare fundamentals, medical terminology, anatomy, diagnosis coding using ICD-10-CM, inpatient procedure coding using ICD-10-PCS.', author: 'SkillQuestX Team', price: 150, discount: 15, thumbnail: 'assets/images/curriculum.jpg', accentColor: '#3b82f6' },
  { name: 'Certification Prepared', description: 'CPC – Certified Professional Coder (AAPC), CIC – Certified Inpatient Coder, CCS – Certified Coding Specialist (AHIMA).', author: 'SkillQuestX Team', price: 150, discount: 0, thumbnail: 'assets/images/certification.jpg', accentColor: '#8b5cf6' },
  { name: 'Career Opportunities', description: 'Medical Coder, Inpatient/Outpatient Coder, Coding Auditor, Medical Billing Analyst, AR Analyst, Clinical Documentation Specialist.', author: 'SkillQuestX Team', price: 150, discount: 25, thumbnail: 'assets/images/career.jpg', accentColor: '#ec4899' },
  { name: 'Specialty & Advanced Training', description: 'Inpatient DRG Coding, DRG Validation, Clinical Documentation Improvement (CDI), Ambulatory & Outpatient Coding, E&M Coding.', author: 'SkillQuestX Team', price: 150, discount: 10, thumbnail: 'assets/images/specialty.jpg', accentColor: '#14b8a6' },
  { name: 'Coding Best Practices & Tips', description: 'Code strictly from provider documentation, ensure proper linkage between diagnosis and procedures for medical necessity.', author: 'SkillQuestX Team', price: 150, discount: 0, thumbnail: 'assets/images/best-practices.jpg', accentColor: '#f97316' },
  { name: 'CMS & Industry Updates', description: 'Latest CMS ICD-10-CM and ICD-10-PCS guideline updates, OPPS and APC fundamentals, Medicare compliance requirements.', author: 'SkillQuestX Team', price: 150, discount: 20, thumbnail: 'assets/images/cms-updates.jpg', accentColor: '#ef4444' },
];

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    author: { type: String, default: '', trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    thumbnail: { type: String, default: '', trim: true },
    accentColor: { type: String, default: '#5B4BC4', trim: true },
    instructorIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  },
  { timestamps: true, collection: 'courses' }
);

const Course = mongoose.model('Course', courseSchema);

async function seedCourses() {
  try {
    await mongoose.connect(MONGODB_URI);
    let added = 0;
    let skipped = 0;
    for (const data of COURSES) {
      const exists = await Course.findOne({ name: data.name }).exec();
      if (exists) {
        skipped++;
        continue;
      }
      await Course.create({
        ...data,
        createdBy: null,
        ratingAverage: 4.2,
        ratingCount: 0,
        instructorIds: [],
      });
      added++;
      console.log('Created course:', data.name);
    }
    console.log('Done. Added:', added, 'Skipped (already exist):', skipped);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedCourses();
