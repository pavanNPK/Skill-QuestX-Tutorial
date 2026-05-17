const fs = require('fs');
const path = require('path');

const output = path.resolve(__dirname, '../../docs/online-exams-bulk-upload-sample.xlsx');

const sheets = [
  {
    name: 'Exams',
    headers: ['exam_id', 'exam_order', 'exam_title', 'exam_description', 'duration_minutes'],
    rows: [
      ['EXAM-001', '1', 'Anatomy', 'Blank and single-select assessment for Basic Anatomy & Physiology.', '30'],
      ['EXAM-002', '2', 'Blood and Circulatory System', 'Sample published exam imported from Excel.', '30'],
    ],
  },
  {
    name: 'Sections',
    headers: ['section_id', 'exam_id', 'section_order', 'section_title', 'section_summary'],
    rows: [
      ['SEC-001', 'EXAM-001', '1', 'Basics of Anatomy', 'Medical terminology and body systems.'],
      ['SEC-002', 'EXAM-001', '2', 'Body Positions', 'Directional terms and body positions.'],
      ['SEC-003', 'EXAM-002', '1', 'Circulatory Basics', 'Heart, blood, and vessels.'],
    ],
  },
  {
    name: 'Questions',
    headers: ['question_id', 'section_id', 'question_order', 'question_type', 'question', 'answer'],
    rows: [
      ['Q-001', 'SEC-001', '1', 'blank', 'Hydro- in the term Hydronephrosis means ____________.', 'water'],
      ['Q-002', 'SEC-001', '2', 'blank', 'The suffix -itis means ____________.', 'inflammation'],
      ['Q-003', 'SEC-001', '3', 'single_select', 'Which term means toward the head?', 'a'],
      ['Q-004', 'SEC-002', '1', 'single_select', 'Which body position means lying flat on the back?', 'b'],
      ['Q-005', 'SEC-002', '2', 'multi_select', 'Select the directional terms.', 'a|c'],
      ['Q-006', 'SEC-003', '1', 'blank', 'The heart pumps blood through ____________.', 'vessels'],
    ],
  },
  {
    name: 'Options',
    headers: ['question_id', 'option_order', 'option_value', 'option_label'],
    rows: [
      ['Q-003', '1', 'a', 'Superior'],
      ['Q-003', '2', 'b', 'Inferior'],
      ['Q-003', '3', 'c', 'Lateral'],
      ['Q-003', '4', 'd', 'Medial'],
      ['Q-004', '1', 'a', 'Prone'],
      ['Q-004', '2', 'b', 'Supine'],
      ['Q-004', '3', 'c', 'Lateral recumbent'],
      ['Q-004', '4', 'd', 'Fowler position'],
      ['Q-005', '1', 'a', 'Anterior'],
      ['Q-005', '2', 'b', 'Appendix'],
      ['Q-005', '3', 'c', 'Posterior'],
      ['Q-005', '4', 'd', 'Kidney'],
    ],
  },
];

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
    const max = Math.max(
      String(header).length,
      ...sheet.rows.map((row) => String(row[index] ?? '').length),
    );
    return `<col min="${index + 1}" max="${index + 1}" width="${Math.min(Math.max(max + 3, 14), 45)}" customWidth="1"/>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews>
    <sheetView workbookViewId="0">
      <pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>
      <selection pane="bottomLeft"/>
    </sheetView>
  </sheetViews>
  <cols>${widths}</cols>
  <sheetData>${rowXml}</sheetData>
</worksheet>`;
}

function crc32(buffer) {
  let crc = ~0;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
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

const files = [
  {
    name: '[Content_Types].xml',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  ${sheets.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}
</Types>`,
  },
  {
    name: '_rels/.rels',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
  },
  {
    name: 'xl/workbook.xml',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    ${sheets.map((sheet, index) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join('')}
  </sheets>
</workbook>`,
  },
  {
    name: 'xl/_rels/workbook.xml.rels',
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheets.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join('')}
</Relationships>`,
  },
  ...sheets.map((sheet, index) => ({
    name: `xl/worksheets/sheet${index + 1}.xml`,
    content: worksheetXml(sheet),
  })),
];

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, zip(files));
console.log(output);
