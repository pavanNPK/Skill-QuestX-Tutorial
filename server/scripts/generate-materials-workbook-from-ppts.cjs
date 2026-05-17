const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { basename, join, resolve } = require('path');
const { inflateRawSync } = require('zlib');

const PPT_DIR = '/Users/pavankumar/Downloads/ ';
const OUTPUT = resolve('docs/basic-anatomy-physiology-ppt-as-uploaded.xlsx');

const PPTS = [
  ['index-1-basic-anatomy-physiology', 'Basic Anatomy & Physiology.pptx', 'Basic Anatomy & Physiology'],
  ['index-2-integumentary-system', 'Integumentary system.pptx', 'Integumentary System'],
  ['index-3-blood-and-circulatory', 'Blood and circulatory.pptx', 'Blood and Circulatory System'],
  ['index-4-lymphatic-system', 'Lymphatic system.pptx', 'Lymphatic System'],
  ['index-5-digestive-system', 'Digestive system.pptx', 'Digestive System'],
  ['index-6-endocrine-system', 'Endocrine system.pptx', 'Endocrine System'],
  ['index-7-musculoskeletal-system', 'Musculoskeletal system.pptx', 'Musculoskeletal System'],
  ['index-8-nervous-system', 'Nervous system.pptx', 'Nervous System'],
  ['index-9-reproductive-system', 'Reproductive system.pptx', 'Reproductive System'],
  ['index-10-respiratory-system', 'Respiratory.pptx', 'Respiratory System'],
  ['index-11-sensory-organs', 'sensory organs.pptx', 'Sensory Organs'],
  ['index-12-urinary-system', 'Urinary system.pptx', 'Urinary System'],
];

const NS = {
  p: 'http://schemas.openxmlformats.org/presentationml/2006/main',
  a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
};

function unzip(buffer) {
  const files = new Map();
  let eocdOffset = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 70000); i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error('Invalid zip');
  const count = buffer.readUInt16LE(eocdOffset + 10);
  const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
  let ptr = centralOffset;
  for (let i = 0; i < count; i++) {
    if (buffer.readUInt32LE(ptr) !== 0x02014b50) throw new Error('Invalid central directory');
    const method = buffer.readUInt16LE(ptr + 10);
    const compressedSize = buffer.readUInt32LE(ptr + 20);
    const nameLength = buffer.readUInt16LE(ptr + 28);
    const extraLength = buffer.readUInt16LE(ptr + 30);
    const commentLength = buffer.readUInt16LE(ptr + 32);
    const localOffset = buffer.readUInt32LE(ptr + 42);
    const name = buffer.slice(ptr + 46, ptr + 46 + nameLength).toString('utf8');
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.slice(dataStart, dataStart + compressedSize);
    files.set(name, method === 8 ? inflateRawSync(compressed) : compressed);
    ptr += 46 + nameLength + extraLength + commentLength;
  }
  return files;
}

function decodeXml(value = '') {
  return value
    .replace(/&#10;/g, '\n')
    .replace(/&#xA;/gi, '\n')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function attr(xml, name) {
  const match = xml.match(new RegExp(`\\b${name}="([^"]*)"`));
  return match ? decodeXml(match[1]) : '';
}

function inner(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? match[1] : '';
}

function textFromXml(xml) {
  return [...xml.matchAll(/<a:t\b[^>]*>([\s\S]*?)<\/a:t>/g)]
    .map((match) => decodeXml(match[1]))
    .join('')
    .replace(/\u000b/g, '\n')
    .trim();
}

function slideOrder(files) {
  const presentation = files.get('ppt/presentation.xml')?.toString('utf8') ?? '';
  const rels = files.get('ppt/_rels/presentation.xml.rels')?.toString('utf8') ?? '';
  const relTargets = new Map([...rels.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  return [...presentation.matchAll(/<p:sldId\b[^>]*(?:r:id|id)="([^"]+)"/g)]
    .map((match) => relTargets.get(match[1]))
    .filter(Boolean)
    .map((target) => `ppt/${target.replace(/^\.\.\//, '').replace(/^\//, '')}`);
}

function geometry(xml) {
  const xfrm = inner(xml, 'a:xfrm');
  const offMatch = xfrm.match(/<a:off\b([^>]*)\/>/);
  const extMatch = xfrm.match(/<a:ext\b([^>]*)\/>/);
  return {
    x: Number(attr(offMatch?.[1] ?? '', 'x') || 0),
    y: Number(attr(offMatch?.[1] ?? '', 'y') || 0),
    cx: Number(attr(extMatch?.[1] ?? '', 'cx') || 0),
    cy: Number(attr(extMatch?.[1] ?? '', 'cy') || 0),
  };
}

function paragraphRuns(shapeXml) {
  return [...shapeXml.matchAll(/<a:p\b[^>]*>([\s\S]*?)<\/a:p>/g)]
    .map((match) => {
      const paragraph = match[1];
      const text = textFromXml(paragraph);
      if (!text) return null;
      const pPr = paragraph.match(/<a:pPr\b([^>]*)[\s\S]*?(?:\/>|<\/a:pPr>)/)?.[0] ?? '';
      const rawLevel = Number(attr(pPr, 'lvl') || 0);
      const level = rawLevel > 0 ? 1 : 0;
      const bullet = /<a:bu(?:Char|AutoNum|Blip|Font)\b/.test(pPr) || rawLevel > 0;
      return { text, level, bullet };
    })
    .filter(Boolean);
}

function tableRows(tableXml) {
  return [...tableXml.matchAll(/<a:tr\b[^>]*>([\s\S]*?)<\/a:tr>/g)].map((rowMatch) => {
    return [...rowMatch[1].matchAll(/<a:tc\b[^>]*>([\s\S]*?)<\/a:tc>/g)].map((cellMatch) => {
      return [...cellMatch[1].matchAll(/<a:p\b[^>]*>([\s\S]*?)<\/a:p>/g)]
        .map((p) => textFromXml(p[1]))
        .filter(Boolean)
        .join(' ');
    });
  }).filter((row) => row.some(Boolean));
}

function slideItems(xml) {
  const items = [];
  let order = 0;
  for (const match of xml.matchAll(/<p:sp\b[\s\S]*?<\/p:sp>/g)) {
    const shapeXml = match[0];
    const paragraphs = paragraphRuns(shapeXml);
    if (!paragraphs.length) continue;
    items.push({ kind: 'text', order: order++, ...geometry(shapeXml), paragraphs });
  }
  for (const match of xml.matchAll(/<a:tbl\b[\s\S]*?<\/a:tbl>/g)) {
    const rows = tableRows(match[0]);
    if (!rows.length) continue;
    items.push({ kind: 'table', order: order++, x: 0, y: 0, rows });
  }
  return items.sort((a, b) => a.y - b.y || a.x - b.x || a.order - b.order);
}

function pickTitle(items, fallbackTitle) {
  const textItems = items.filter((item) => item.kind === 'text');
  const candidates = textItems.filter((item) => {
    if (item.paragraphs.length !== 1) return false;
    const p = item.paragraphs[0];
    return !p.bullet && item.y <= 1500000;
  });
  const titleItem = candidates[0] ?? textItems.find((item) => item.paragraphs.length === 1 && !item.paragraphs[0].bullet);
  return {
    title: titleItem?.paragraphs[0]?.text || fallbackTitle,
    titleItem,
  };
}

function textItemToBlocks(item, blockBase) {
  const blocks = [];
  const paragraphs = item.paragraphs;
  let current = [];
  let mode = '';
  const flush = () => {
    if (!current.length) return;
    const text = current.map((p) => `${'  '.repeat(p.level)}${p.text}`).join('\n');
    const type = mode === 'bullet' ? (current.some((p) => p.level > 0) ? 'nested_bullet_list' : 'bullet_list') : 'paragraph';
    blocks.push({ type, title: '', text, columns: '', rows: '' });
    current = [];
  };
  for (const paragraph of paragraphs) {
    const nextMode = paragraph.bullet ? 'bullet' : 'paragraph';
    if (mode && nextMode !== mode) flush();
    mode = nextMode;
    current.push(paragraph);
  }
  flush();
  return blocks.map((block, index) => ({ ...block, block_id: `${blockBase}-${index + 1}` }));
}

function parsePpt(pptPath, indexId, indexOrder, indexTitle) {
  const files = unzip(readFileSync(pptPath));
  const slides = [];
  const blocks = [];
  let visibleSlide = 0;
  for (const slidePath of slideOrder(files)) {
    const xml = files.get(slidePath)?.toString('utf8');
    if (!xml) continue;
    const items = slideItems(xml);
    if (!items.length) continue;
    const { title, titleItem } = pickTitle(items, indexTitle);
    const contentItems = items.filter((item) => item !== titleItem);
    if (!contentItems.length && title.trim().toLowerCase() === 'thank you!') continue;
    visibleSlide += 1;
    const slideId = `${indexId}-slide-${visibleSlide}`;
    slides.push([slideId, indexId, String(visibleSlide), title, '']);
    let blockOrder = 0;
    for (const item of contentItems) {
      if (item.kind === 'table') {
        const [columns, ...rows] = item.rows;
        if (!columns?.length || !rows.length) continue;
        blockOrder += 1;
        blocks.push([
          `${slideId}-block-${blockOrder}`,
          slideId,
          String(blockOrder),
          'table',
          '',
          '',
          columns.join('|'),
          rows.map((row) => row.join('|')).join('\n'),
        ]);
        continue;
      }
      for (const block of textItemToBlocks(item, `${slideId}-block-${blockOrder + 1}`)) {
        blockOrder += 1;
        blocks.push([
          `${slideId}-block-${blockOrder}`,
          slideId,
          String(blockOrder),
          block.type,
          block.title,
          block.text,
          block.columns,
          block.rows,
        ]);
      }
    }
  }
  return {
    index: [indexId, String(indexOrder), `${indexOrder}. ${indexTitle}`, `${indexTitle} slides imported from ${basename(pptPath)}.`],
    slides,
    blocks,
  };
}

function colName(index) {
  let n = index + 1;
  let name = '';
  while (n) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sheetXml(rows) {
  const maxCols = Math.max(...rows.map((row) => row.length), 1);
  const dimension = `A1:${colName(maxCols - 1)}${Math.max(rows.length, 1)}`;
  const out = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">',
    `<dimension ref="${dimension}"/>`,
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews>',
    '<sheetFormatPr defaultRowHeight="15"/>',
    '<sheetData>',
  ];
  rows.forEach((row, rowIndex) => {
    const r = rowIndex + 1;
    out.push(`<row r="${r}">`);
    row.forEach((value, columnIndex) => {
      const ref = `${colName(columnIndex)}${r}`;
      out.push(`<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${escapeXml(value)}</t></is></c>`);
    });
    out.push('</row>');
  });
  out.push('</sheetData></worksheet>');
  return out.join('');
}

function crc32(buffer) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = Array.from({ length: 256 }, (_, i) => {
      let c = i;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      return c >>> 0;
    });
  }
  let crc = -1;
  for (const byte of buffer) crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff];
  return (crc ^ -1) >>> 0;
}

function writeZip(entries, output) {
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const [name, content] of entries) {
    const data = Buffer.from(content);
    const nameBuffer = Buffer.from(name);
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
    local.writeUInt16LE(nameBuffer.length, 26);
    chunks.push(local, nameBuffer, data);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0);
    c.writeUInt16LE(20, 4);
    c.writeUInt16LE(20, 6);
    c.writeUInt16LE(0, 8);
    c.writeUInt16LE(0, 10);
    c.writeUInt32LE(0, 12);
    c.writeUInt32LE(crc, 16);
    c.writeUInt32LE(data.length, 20);
    c.writeUInt32LE(data.length, 24);
    c.writeUInt16LE(nameBuffer.length, 28);
    c.writeUInt32LE(offset, 42);
    central.push(c, nameBuffer);
    offset += local.length + nameBuffer.length + data.length;
  }
  const centralOffset = offset;
  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralSize, 12);
  eocd.writeUInt32LE(centralOffset, 16);
  writeFileSync(output, Buffer.concat([...chunks, ...central, eocd]));
}

const indexes = [['index_id', 'index_order', 'index_title', 'index_summary']];
const slides = [['slide_id', 'index_id', 'slide_order', 'slide_title', 'slide_summary']];
const blocks = [['block_id', 'slide_id', 'block_order', 'block_type', 'block_title', 'text', 'columns', 'rows']];

PPTS.forEach(([indexId, fileName, title], index) => {
  const pptPath = join(PPT_DIR, fileName);
  if (!existsSync(pptPath)) throw new Error(`Missing PPT: ${pptPath}`);
  const parsed = parsePpt(pptPath, indexId, index + 1, title);
  indexes.push(parsed.index);
  slides.push(...parsed.slides);
  blocks.push(...parsed.blocks);
  console.log(`${fileName}: ${parsed.slides.length} slides, ${parsed.blocks.length} blocks`);
});

const sheets = [
  ['Indexes', indexes],
  ['Slides', slides],
  ['Blocks', blocks],
  ['Assets', [['asset_id', 'slide_id', 'asset_order', 'asset_type', 'title', 'url']]],
];

if (!existsSync('docs')) mkdirSync('docs', { recursive: true });
writeZip([
  ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet4.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>'],
  ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
  ['xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map(([name], i) => `<sheet name="${name}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>`],
  ['xl/_rels/workbook.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}</Relationships>`],
  ...sheets.map(([, rows], i) => [`xl/worksheets/sheet${i + 1}.xml`, sheetXml(rows)]),
], OUTPUT);

console.log(`Wrote ${OUTPUT}`);
