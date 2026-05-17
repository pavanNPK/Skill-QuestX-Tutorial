const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { inflateRawSync } = require('zlib');

dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillquestx';
const workbookPath = path.resolve(
  __dirname,
  '../..',
  process.env.EXAM_WORKBOOK || 'docs/anatomy-online-exams-bulk-upload.xlsx',
);

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function xmlDecode(value) {
  return String(value ?? '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function cellColumn(ref) {
  const letters = String(ref || 'A').match(/[A-Z]+/)?.[0] ?? 'A';
  return [...letters].reduce((sum, char) => (sum * 26) + char.charCodeAt(0) - 64, 0) - 1;
}

function unzip(buffer) {
  const files = new Map();
  let eocdOffset = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 70000); i -= 1) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error('Invalid .xlsx file.');

  const entryCount = buffer.readUInt16LE(eocdOffset + 10);
  const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
  let ptr = centralOffset;

  for (let i = 0; i < entryCount; i += 1) {
    if (buffer.readUInt32LE(ptr) !== 0x02014b50) throw new Error('Invalid .xlsx central directory.');
    const method = buffer.readUInt16LE(ptr + 10);
    const compressedSize = buffer.readUInt32LE(ptr + 20);
    const fileNameLength = buffer.readUInt16LE(ptr + 28);
    const extraLength = buffer.readUInt16LE(ptr + 30);
    const commentLength = buffer.readUInt16LE(ptr + 32);
    const localOffset = buffer.readUInt32LE(ptr + 42);
    const fileName = buffer.slice(ptr + 46, ptr + 46 + fileNameLength).toString('utf8');

    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error('Invalid .xlsx local file header.');
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.slice(dataStart, dataStart + compressedSize);
    files.set(fileName, method === 8 ? inflateRawSync(compressed) : compressed);

    ptr += 46 + fileNameLength + extraLength + commentLength;
  }

  return files;
}

function readZipText(files, filePath) {
  const value = files.get(filePath);
  if (!value) throw new Error(`Missing workbook file: ${filePath}`);
  return value.toString('utf8');
}

function parseSharedStrings(xml) {
  return [...xml.matchAll(/<si\b[\s\S]*?<\/si>/g)].map((match) => (
    [...match[0].matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)]
      .map((text) => xmlDecode(text[1]))
      .join('')
  ));
}

function parseWorksheet(xml, sharedStrings) {
  const rows = [];
  for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const row = [];
    for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attrs = cellMatch[1];
      const cell = cellMatch[2];
      const ref = attrs.match(/\br="([^"]+)"/)?.[1] ?? `A${rows.length + 1}`;
      const type = attrs.match(/\bt="([^"]+)"/)?.[1] ?? '';
      const column = cellColumn(ref);
      let value = '';
      if (type === 'inlineStr') {
        value = [...cell.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map((text) => xmlDecode(text[1])).join('');
      } else {
        const raw = cell.match(/<v>([\s\S]*?)<\/v>/)?.[1] ?? '';
        value = type === 's' ? (sharedStrings[Number(raw)] ?? '') : xmlDecode(raw);
      }
      row[column] = value;
    }
    rows.push(row.map((value) => clean(value)));
  }
  return rows;
}

function sheetRowsToObjects(rows) {
  const headers = (rows[0] ?? []).map((header) => clean(header));
  return rows.slice(1)
    .filter((row) => row.some((value) => clean(value)))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, clean(row[index])])));
}

function parseWorkbook(buffer) {
  const files = unzip(buffer);
  const workbookXml = readZipText(files, 'xl/workbook.xml');
  const workbookRelsXml = readZipText(files, 'xl/_rels/workbook.xml.rels');
  const sharedStrings = files.has('xl/sharedStrings.xml') ? parseSharedStrings(readZipText(files, 'xl/sharedStrings.xml')) : [];
  const relTargets = new Map();
  for (const rel of workbookRelsXml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) {
    relTargets.set(rel[1], rel[2]);
  }

  const workbook = {};
  for (const sheet of workbookXml.matchAll(/<sheet\b[^>]*name="([^"]+)"[^>]*(?:r:id|id)="([^"]+)"/g)) {
    const target = relTargets.get(sheet[2]);
    if (!target) continue;
    const normalizedTarget = target.replace(/^\//, '');
    const targetPath = normalizedTarget.startsWith('xl/') ? normalizedTarget : `xl/${normalizedTarget}`;
    workbook[xmlDecode(sheet[1])] = sheetRowsToObjects(parseWorksheet(readZipText(files, targetPath), sharedStrings));
  }
  return workbook;
}

function sortRows(rows, key) {
  return [...rows].sort((a, b) => Number(a[key] || 0) - Number(b[key] || 0));
}

function normalizeQuestionType(value, optionCount) {
  const normalized = clean(value).toLowerCase().replace(/[\s-]+/g, '_');
  if (['single', 'mcq', 'single_choice', 'single_select'].includes(normalized)) return 'single_select';
  if (['multi', 'multiple', 'multi_choice', 'multi_select'].includes(normalized)) return 'multi_select';
  if (['blank', 'text', 'text_area', 'textarea'].includes(normalized)) return 'blank';
  return optionCount ? 'single_select' : 'blank';
}

function normalizeAnswer(value, type) {
  if (!value) return type === 'multi_select' ? [] : null;
  if (type === 'multi_select') return value.split(/[|,]/).map(clean).filter(Boolean);
  return value;
}

function examsFromWorkbook(workbook) {
  const examRows = workbook.Exams ?? [];
  const sectionRows = workbook.Sections ?? [];
  const questionRows = workbook.Questions ?? [];
  const optionRows = workbook.Options ?? [];
  if (!examRows.length || !sectionRows.length || !questionRows.length) {
    throw new Error('Workbook must contain Exams, Sections, and Questions rows.');
  }

  const sectionsByExam = new Map();
  const questionsBySection = new Map();
  const optionsByQuestion = new Map();
  const examIds = new Set();
  const sectionIds = new Set();
  const questionIds = new Set();

  for (const row of examRows) {
    const id = clean(row.exam_id);
    if (!id) throw new Error('Exams sheet has a row without exam_id.');
    if (examIds.has(id)) throw new Error(`Duplicate exam_id: ${id}`);
    examIds.add(id);
  }

  for (const row of sectionRows) {
    const id = clean(row.section_id);
    const examId = clean(row.exam_id);
    if (!id) throw new Error('Sections sheet has a row without section_id.');
    if (sectionIds.has(id)) throw new Error(`Duplicate section_id: ${id}`);
    if (!examIds.has(examId)) throw new Error(`Sections sheet references unknown exam_id: ${examId}`);
    sectionIds.add(id);
    sectionsByExam.set(examId, [...(sectionsByExam.get(examId) ?? []), row]);
  }

  for (const row of questionRows) {
    const id = clean(row.question_id);
    const sectionId = clean(row.section_id);
    if (!id) throw new Error('Questions sheet has a row without question_id.');
    if (questionIds.has(id)) throw new Error(`Duplicate question_id: ${id}`);
    if (!sectionIds.has(sectionId)) throw new Error(`Questions sheet references unknown section_id: ${sectionId}`);
    questionIds.add(id);
    questionsBySection.set(sectionId, [...(questionsBySection.get(sectionId) ?? []), row]);
  }

  for (const row of optionRows) {
    const questionId = clean(row.question_id);
    if (!questionIds.has(questionId)) throw new Error(`Options sheet references unknown question_id: ${questionId}`);
    optionsByQuestion.set(questionId, [...(optionsByQuestion.get(questionId) ?? []), row]);
  }

  return sortRows(examRows, 'exam_order').map((examRow, examIndex) => ({
    title: clean(examRow.exam_title) || `Exam ${examIndex + 1}`,
    description: clean(examRow.exam_description),
    durationMinutes: Number.isFinite(Number(examRow.duration_minutes)) ? Number(examRow.duration_minutes) : 30,
    status: 'published',
    sections: sortRows(sectionsByExam.get(clean(examRow.exam_id)) ?? [], 'section_order').map((sectionRow, sectionIndex) => {
      const sectionId = clean(sectionRow.section_id) || `section-${sectionIndex + 1}`;
      return {
        id: sectionId,
        title: clean(sectionRow.section_title) || `Section ${sectionIndex + 1}`,
        summary: clean(sectionRow.section_summary),
        questions: sortRows(questionsBySection.get(sectionId) ?? [], 'question_order').map((questionRow, questionIndex) => {
          const questionId = clean(questionRow.question_id) || `q-${questionIndex + 1}`;
          const options = sortRows(optionsByQuestion.get(questionId) ?? [], 'option_order')
            .map((optionRow, optionIndex) => ({
              value: clean(optionRow.option_value) || String.fromCharCode(97 + optionIndex),
              label: clean(optionRow.option_label),
            }))
            .filter((option) => option.label);
          const type = normalizeQuestionType(questionRow.question_type, options.length);
          return {
            id: questionId,
            type,
            prompt: clean(questionRow.question) || `Question ${questionIndex + 1}`,
            options,
            answer: normalizeAnswer(clean(questionRow.answer), type),
          };
        }),
      };
    }),
  }));
}

async function main() {
  if (!fs.existsSync(workbookPath)) throw new Error(`Workbook not found: ${workbookPath}`);
  const imported = examsFromWorkbook(parseWorkbook(fs.readFileSync(workbookPath)));
  if (!imported.length) throw new Error('Workbook does not contain any exams.');

  const now = new Date();
  const docs = imported.map((exam) => ({ ...exam, createdAt: now, updatedAt: now }));
  const questionCount = docs.reduce(
    (sum, exam) => sum + exam.sections.reduce((sectionSum, section) => sectionSum + section.questions.length, 0),
    0,
  );

  await mongoose.connect(mongoUri);
  const exams = mongoose.connection.collection('exams');
  const deleted = await exams.deleteMany({});
  const inserted = await exams.insertMany(docs);

  console.log(`Deleted exams: ${deleted.deletedCount}`);
  console.log(`Inserted exams: ${inserted.insertedCount}`);
  console.log(`Inserted questions: ${questionCount}`);
  console.log(`Workbook: ${workbookPath}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
