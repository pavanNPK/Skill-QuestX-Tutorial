const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillquestx';
const contentPath = path.resolve(
  __dirname,
  '..',
  process.env.CONTENT_JSON || 'sample-content/basic-anatomy-physiology.json',
);
const courseName = process.env.COURSE_NAME || 'Basic Anatomy & Physiology';
const publish = process.env.PUBLISH !== 'false';
const instructorEmail = (process.env.INSTRUCTOR_EMAIL || '').trim().toLowerCase();
const instructorId = (process.env.INSTRUCTOR_ID || '').trim();

function slugPart(value, fallback) {
  const slug = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || fallback;
}

function normalizeBlocks(blocks = [], lessonId) {
  return blocks.map((block, index) => ({
    id: block.id || `${lessonId}-block-${index + 1}`,
    type: block.type || 'paragraph',
    title: block.title || '',
    text: block.text || '',
    url: block.url || '',
    assetId: block.assetId || '',
    items: Array.isArray(block.items) ? block.items : [],
    columns: Array.isArray(block.columns) ? block.columns : [],
    rows: Array.isArray(block.rows) ? block.rows : [],
  }));
}

function normalizeContent(content) {
  return {
    title: content.title || courseName,
    description: content.description || '',
    modules: (content.modules || []).map((module, moduleIndex) => {
      const moduleId = module.id || `module-${moduleIndex + 1}-${slugPart(module.title, 'untitled')}`;
      return {
        id: moduleId,
        title: module.title || `Module ${moduleIndex + 1}`,
        summary: module.summary || '',
        lessons: (module.lessons || []).map((lesson, lessonIndex) => {
          const lessonId = lesson.id || `${moduleId}-lesson-${lessonIndex + 1}-${slugPart(lesson.title, 'untitled')}`;
          return {
            id: lessonId,
            title: lesson.title || `Lesson ${lessonIndex + 1}`,
            summary: lesson.summary || '',
            durationMinutes: Number(lesson.durationMinutes || 0),
            blocks: normalizeBlocks(lesson.blocks, lessonId),
          };
        }),
      };
    }),
  };
}

async function main() {
  const raw = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  const snapshot = normalizeContent(raw);
  const now = new Date();

  await mongoose.connect(mongoUri);

  const users = mongoose.connection.collection('users');
  const courses = mongoose.connection.collection('courses');
  const coursecontents = mongoose.connection.collection('coursecontents');

  let instructor = null;
  if (instructorId) {
    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      throw new Error(`Invalid INSTRUCTOR_ID=${instructorId}`);
    }
    instructor = await users.findOne({ _id: new mongoose.Types.ObjectId(instructorId) });
    if (!instructor) {
      throw new Error(`Instructor not found for INSTRUCTOR_ID=${instructorId}`);
    }
  } else if (instructorEmail) {
    instructor = await users.findOne({ email: instructorEmail });
    if (!instructor) {
      throw new Error(`Instructor not found for INSTRUCTOR_EMAIL=${instructorEmail}`);
    }
  }

  const instructorIds = instructor ? [instructor._id] : [];
  const existingCourse = await courses.findOne({ name: courseName });
  const courseUpdate = {
    $set: {
      name: courseName,
      description: snapshot.description,
      author: instructor ? `${instructor.firstName || ''} ${instructor.lastName || ''}`.trim() : 'SkillQuestX',
      updatedAt: now,
    },
    $setOnInsert: {
      createdAt: now,
      createdBy: instructor ? instructor._id : null,
      price: 0,
      discount: 0,
      ratingAverage: 0,
      ratingCount: 0,
      thumbnail: '',
      accentColor: '#5B4BC4',
    },
  };

  if (instructorIds.length) {
    courseUpdate.$addToSet = { instructorIds: { $each: instructorIds } };
  } else if (!existingCourse) {
    courseUpdate.$setOnInsert.instructorIds = [];
  }

  await courses.updateOne({ name: courseName }, courseUpdate, { upsert: true });
  const course = await courses.findOne({ name: courseName });

  await coursecontents.updateOne(
    { courseId: course._id },
    {
      $set: {
        courseId: course._id,
        draft: snapshot,
        published: publish ? snapshot : null,
        status: publish ? 'published' : 'draft',
        updatedBy: instructor ? instructor._id : null,
        publishedBy: publish && instructor ? instructor._id : null,
        publishedAt: publish ? now : null,
        updatedAt: now,
      },
      $setOnInsert: {
        createdBy: instructor ? instructor._id : null,
        createdAt: now,
      },
    },
    { upsert: true },
  );

  console.log(`Imported "${snapshot.title}" into course ${course._id}`);
  console.log(`Modules: ${snapshot.modules.length}`);
  console.log(`Lessons: ${snapshot.modules.reduce((total, module) => total + module.lessons.length, 0)}`);
  console.log(`Status: ${publish ? 'published' : 'draft'}`);
  if (instructor) console.log(`Assigned instructor: ${instructor.email}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
