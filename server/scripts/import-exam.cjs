const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillquestx';
const examPath = path.resolve(__dirname, '..', process.env.EXAM_JSON || 'sample-exams/basics-of-anatomy.json');

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalize(input) {
  return {
    title: clean(input.title) || 'Untitled Exam',
    description: clean(input.description),
    durationMinutes: Number.isFinite(Number(input.durationMinutes)) ? Number(input.durationMinutes) : 30,
    status: input.status === 'draft' ? 'draft' : 'published',
    sections: Array.isArray(input.sections) ? input.sections.map((section, sectionIndex) => ({
      id: clean(section.id) || `section-${sectionIndex + 1}`,
      title: clean(section.title) || `Section ${sectionIndex + 1}`,
      summary: clean(section.summary),
      questions: Array.isArray(section.questions) ? section.questions.map((question, questionIndex) => ({
        id: clean(question.id) || `q-${questionIndex + 1}`,
        type: ['blank', 'single_select', 'multi_select'].includes(question.type) ? question.type : 'blank',
        prompt: clean(question.prompt) || 'Untitled question',
        options: Array.isArray(question.options) ? question.options.map((option, optionIndex) => ({
          value: clean(option.value) || String.fromCharCode(97 + optionIndex),
          label: clean(option.label),
        })).filter((option) => option.label) : [],
        answer: question.answer ?? null,
      })) : [],
    })) : [],
  };
}

async function main() {
  const exam = normalize(JSON.parse(fs.readFileSync(examPath, 'utf8')));
  const now = new Date();
  await mongoose.connect(mongoUri);
  const exams = mongoose.connection.collection('exams');
  await exams.updateOne(
    { title: exam.title },
    { $set: { ...exam, updatedAt: now }, $setOnInsert: { createdAt: now } },
    { upsert: true },
  );
  const saved = await exams.findOne({ title: exam.title });
  const questionCount = exam.sections.reduce((sum, section) => sum + section.questions.length, 0);
  console.log(`Imported "${exam.title}" into exam ${saved._id}`);
  console.log(`Sections: ${exam.sections.length}`);
  console.log(`Questions: ${questionCount}`);
  console.log(`Timer: ${exam.durationMinutes} minutes`);
  console.log(`Status: ${exam.status}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
