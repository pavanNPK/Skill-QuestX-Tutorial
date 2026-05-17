const fs = require('fs');
const path = require('path');
const { inflateRawSync } = require('zlib');

const SOURCE_DIR = '/Users/pavankumar/Downloads/ /Anatomy Questions';
const OUTPUT = path.resolve(__dirname, '../../docs/anatomy-online-exams-bulk-upload.xlsx');

const INPUT_FILES = [
  'Basic anatomy questions.docx',
  'Integumentary system.docx',
  'Blood and circulatory system.docx',
  'Lymphatic system.docx',
  'Digestive system.docx',
  'Endocrine system.docx',
  'Muskuloskeletal system.docx',
  'Nervous system.docx',
  'Reproductive system.docx',
  'Sensory system.docx',
  'Respiratory system.docx',
  'Urinary system.docx',
];

const TITLE_OVERRIDES = new Map([
  ['Basic anatomy questions.docx', 'Basic Anatomy Questions'],
  ['Muskuloskeletal system.docx', 'Musculoskeletal System'],
  ['Sensory system.docx', 'Sensory System'],
]);

function cleanTitle(fileName) {
  return TITLE_OVERRIDES.get(fileName)
    || path.basename(fileName, '.docx').replace(/\b\w/g, (char) => char.toUpperCase());
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function xmlDecode(value) {
  return String(value ?? '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function unzip(buffer) {
  const files = new Map();
  let eocdOffset = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 70000); i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error('Invalid DOCX zip file.');
  const entryCount = buffer.readUInt16LE(eocdOffset + 10);
  const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
  let ptr = centralOffset;
  for (let i = 0; i < entryCount; i++) {
    const method = buffer.readUInt16LE(ptr + 10);
    const compressedSize = buffer.readUInt32LE(ptr + 20);
    const fileNameLength = buffer.readUInt16LE(ptr + 28);
    const extraLength = buffer.readUInt16LE(ptr + 30);
    const commentLength = buffer.readUInt16LE(ptr + 32);
    const localOffset = buffer.readUInt32LE(ptr + 42);
    const fileName = buffer.slice(ptr + 46, ptr + 46 + fileNameLength).toString('utf8');
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.slice(dataStart, dataStart + compressedSize);
    files.set(fileName, method === 8 ? inflateRawSync(compressed) : compressed);
    ptr += 46 + fileNameLength + extraLength + commentLength;
  }
  return files;
}

function paragraphsFromDocx(filePath) {
  const files = unzip(fs.readFileSync(filePath));
  const documentXml = files.get('word/document.xml')?.toString('utf8') ?? '';
  return [...documentXml.matchAll(/<w:p(?:\s|>)[\s\S]*?<\/w:p>/g)]
    .map((paragraph) => [...paragraph[0].matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)]
      .map((text) => xmlDecode(text[1]))
      .join(''))
    .map((text) => text.replace(/\s+/g, ' ').trim())
    .filter((text) => text && !/^A:\s*_+$/.test(text));
}

function parseMcq(text) {
  const questionMatch = text.match(/^(.*?)\s*\[\s*\]\s*A\./);
  if (!questionMatch) return null;
  const question = questionMatch[1].trim();
  const optionText = text.slice(questionMatch[0].lastIndexOf('A.'));
  const options = [...optionText.matchAll(/([A-D])\.\s*(.*?)(?=(?:[A-D]\.)|$)/g)]
    .map((match) => ({ value: match[1].toLowerCase(), label: match[2].trim() }))
    .filter((option) => option.label);
  return options.length ? { question, options } : null;
}

function rowsFromDocs() {
  const exams = [];
  const sections = [];
  const questions = [];
  const options = [];

  INPUT_FILES.forEach((fileName, fileIndex) => {
    const filePath = path.join(SOURCE_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Missing: ${filePath}`);
      return;
    }
    const title = cleanTitle(fileName);
    const examId = `EXAM-${String(fileIndex + 1).padStart(3, '0')}`;
    const sectionIdBase = `SEC-${String(fileIndex + 1).padStart(3, '0')}`;
    const questionIdBase = `Q-${String(fileIndex + 1).padStart(3, '0')}`;
    exams.push([examId, String(fileIndex + 1), title, `Imported assessment for ${title}.`, '30']);

    let currentSection = 'Questions';
    let currentSectionId = `${sectionIdBase}-001`;
    let sectionOrder = 1;
    let questionOrder = 1;
    let examQuestionOrder = 1;
    sections.push([currentSectionId, examId, String(sectionOrder), currentSection, '']);

    for (const paragraph of paragraphsFromDocx(filePath)) {
      if (/^(Anatomy-Based|Short Answer|Case-Based|Multiple Choice) Questions$/i.test(paragraph)) {
        currentSection = paragraph;
        currentSectionId = `${sectionIdBase}-${String(sectionOrder).padStart(3, '0')}`;
        if (!sections.some((row) => row[0] === currentSectionId)) {
          sections.push([currentSectionId, examId, String(sectionOrder), currentSection, '']);
        } else {
          sections[sections.length - 1][3] = currentSection;
        }
        sectionOrder += 1;
        questionOrder = 1;
        continue;
      }

      const questionId = `${questionIdBase}-${String(examQuestionOrder).padStart(3, '0')}`;
      const mcq = parseMcq(paragraph);
      if (mcq) {
        questions.push([questionId, currentSectionId, String(questionOrder), 'single_select', mcq.question, '']);
        mcq.options.forEach((option, optionIndex) => {
          options.push([questionId, String(optionIndex + 1), option.value, option.label]);
        });
      } else {
        questions.push([questionId, currentSectionId, String(questionOrder), 'text_area', paragraph, '']);
      }
      questionOrder += 1;
      examQuestionOrder += 1;
    }
  });

  return { exams, sections, questions, options };
}

function xmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/\n/g, '&#10;');
}

function colName(index) {
  let name = '';
  let n = index + 1;
  while (n > 0) {
    const mod = (n - 1) % 26;
    name = String.fromCharCode(65 + mod) + name;
    n = Math.floor((n - mod) / 26);
  }
  return name;
}

function worksheetXml(sheet) {
  const rows = [sheet.headers, ...sheet.rows];
  const rowXml = rows.map((row, rowIndex) => {
    const cells = row.map((value, columnIndex) => {
      const ref = `${colName(columnIndex)}${rowIndex + 1}`;
      return `<c r="${ref}" t="inlineStr"><is><t>${xmlEscape(value)}</t></is></c>`;
    }).join('');
    return `<row r="${rowIndex + 1}">${cells}</row>`;
  }).join('');
  const widths = sheet.headers.map((header, index) => {
    const max = Math.max(String(header).length, ...sheet.rows.map((row) => String(row[index] ?? '').length));
    return `<col min="${index + 1}" max="${index + 1}" width="${Math.min(Math.max(max + 3, 14), 60)}" customWidth="1"/>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft"/></sheetView></sheetViews>
  <cols>${widths}</cols>
  <sheetData>${rowXml}</sheetData>
</worksheet>`;
}

function crc32(buffer) {
  let crc = ~0;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}

function zip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const file of files) {
    const name = Buffer.from(file.name, 'utf8');
    const data = Buffer.from(file.content, 'utf8');
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt32LE(0, 10);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, name, data);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt32LE(0, 12);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);
    offset += local.length + name.length + data.length;
  }
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

const data = rowsFromDocs();
const sheets = [
  { name: 'Exams', headers: ['exam_id', 'exam_order', 'exam_title', 'exam_description', 'duration_minutes'], rows: data.exams },
  { name: 'Sections', headers: ['section_id', 'exam_id', 'section_order', 'section_title', 'section_summary'], rows: data.sections },
  { name: 'Questions', headers: ['question_id', 'section_id', 'question_order', 'question_type', 'question', 'answer'], rows: data.questions },
  { name: 'Options', headers: ['question_id', 'option_order', 'option_value', 'option_label'], rows: data.options },
];

const files = [
  {
    name: '[Content_Types].xml',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sheets.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`,
  },
  {
    name: '_rels/.rels',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  },
  {
    name: 'xl/workbook.xml',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, index) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join('')}</sheets></workbook>`,
  },
  {
    name: 'xl/_rels/workbook.xml.rels',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join('')}</Relationships>`,
  },
  ...sheets.map((sheet, index) => ({ name: `xl/worksheets/sheet${index + 1}.xml`, content: worksheetXml(sheet) })),
];

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, zip(files));
console.log(`Created ${OUTPUT}`);
console.log(`Exams: ${data.exams.length}`);
console.log(`Sections: ${data.sections.length}`);
console.log(`Questions: ${data.questions.length}`);
console.log(`Options: ${data.options.length}`);
