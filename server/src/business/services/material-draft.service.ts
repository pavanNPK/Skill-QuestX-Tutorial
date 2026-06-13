/** Service file: persists and validates standalone material upload/manual drafts. */
import { randomUUID } from 'crypto';
import { inflateRawSync } from 'zlib';
import { Types } from 'mongoose';
import { ROLES } from '../../core/constants/roles';
import { badRequest, forbidden } from '../../core/utils/http-error';
import type { AuthUser } from '../../core/types/request';
import type { UploadedFile } from '../../core/types/uploaded-file';
import {
  MaterialDraftModel,
  type MaterialContentBlock,
  type MaterialContentBlockType,
  type MaterialDraftDocument,
  type MaterialDraftStatus,
  type MaterialFile,
  type MaterialFileType,
  type MaterialItemStatus,
  type MaterialLinkValue,
  type MaterialSlide,
  type MaterialSourceType,
} from '../../data/models/material-draft.model';

const blockTypes = new Set<MaterialContentBlockType>([
  'HEADING',
  'PARAGRAPH',
  'TEXT',
  'BULLETS',
  'NUMBERED_LIST',
  'TABLE',
  'MEDIA',
  'NOTES',
  'LINK',
  'NESTED',
  'CODE',
  'QUOTE',
]);

interface WorkbookSheets {
  [sheetName: string]: string[][];
}

export class MaterialDraftService {
  async list(user: AuthUser) {
    this.requireCreator(user);
    const query = this.canSeeAll(user) ? {} : { createdBy: new Types.ObjectId(user.id) };
    const drafts = await MaterialDraftModel.find(query)
      .sort({ updatedAt: -1 })
      .select('title sourceType status files.id files.fileName files.fileType files.slides.id createdAt updatedAt submittedAt createdBy updatedBy')
      .lean()
      .exec();
    return drafts.map((draft) => this.toResponse(draft));
  }

  async get(id: string, user: AuthUser) {
    const draft = await this.requireDraft(id, user);
    return this.toResponse(draft);
  }

  async create(body: unknown, user: AuthUser) {
    this.requireCreator(user);
    const normalized = this.normalizeDraft(body);
    const created = await MaterialDraftModel.create({
      title: normalized.title,
      sourceType: normalized.sourceType,
      status: normalized.status,
      files: normalized.files,
      createdBy: new Types.ObjectId(user.id),
      updatedBy: new Types.ObjectId(user.id),
      submittedBy: null,
      submittedAt: null,
    });
    return this.toResponse(created);
  }

  async update(id: string, body: unknown, user: AuthUser) {
    const draft = await this.requireDraft(id, user);
    if (draft.status === 'SUBMITTED') {
      draft.status = 'DRAFT';
      draft.submittedBy = null;
      draft.submittedAt = null;
    }
    const normalized = this.normalizeDraft(body);
    draft.title = normalized.title;
    draft.sourceType = normalized.sourceType;
    draft.status = normalized.status === 'SUBMITTED' ? 'DRAFT' : normalized.status;
    draft.files = normalized.files as any;
    draft.updatedBy = new Types.ObjectId(user.id);
    await draft.save();
    return this.toResponse(draft);
  }

  async remove(id: string, user: AuthUser) {
    const draft = await this.requireDraft(id, user);
    await draft.deleteOne();
    return { id, deleted: true };
  }

  async submit(id: string, body: unknown, user: AuthUser) {
    const draft = await this.requireDraft(id, user);
    const persistedDraft = this.normalizeDraft(draft);
    const submittedDraft = this.hasDraftPayload(body) ? this.normalizeDraft(body) : null;
    const normalized = persistedDraft.files.length ? persistedDraft : submittedDraft ?? persistedDraft;
    this.validateSubmittable(normalized.files);
    draft.title = normalized.title;
    draft.sourceType = normalized.sourceType;
    draft.files = normalized.files as any;
    draft.status = 'SUBMITTED';
    draft.updatedBy = new Types.ObjectId(user.id);
    draft.submittedBy = new Types.ObjectId(user.id);
    draft.submittedAt = new Date();
    await draft.save();
    return this.toResponse(draft);
  }

  async importFile(file: UploadedFile, user: AuthUser) {
    this.requireCreator(user);
    if (!file?.buffer?.length) throw badRequest('No material file uploaded.');
    const lowerName = file.originalname.toLowerCase();
    const fileType: MaterialFileType = lowerName.endsWith('.pptx') ? 'PPTX' : lowerName.endsWith('.xlsx') ? 'XLSX' : 'MANUAL';
    if (fileType === 'MANUAL') throw badRequest('Only .pptx and .xlsx files are supported.');
    const slides = fileType === 'XLSX' ? this.xlsxToSlides(file.buffer, file.originalname) : this.pptxToSlides(file.buffer, file.originalname);
    if (!slides.length) throw badRequest('No slides/sheets were found in the uploaded file.');
    return {
      id: randomUUID(),
      fileName: file.originalname,
      fileType,
      order: 1,
      status: 'DRAFT' as MaterialItemStatus,
      slides,
    };
  }

  saveImage(file: UploadedFile) {
    return {
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/material-drafts/images/${file.filename}`,
    };
  }

  private async requireDraft(id: string, user: AuthUser): Promise<MaterialDraftDocument> {
    this.requireCreator(user);
    if (!Types.ObjectId.isValid(id)) throw badRequest('Invalid material draft id.');
    const draft = await MaterialDraftModel.findById(id).exec();
    if (!draft) throw badRequest('Material draft not found.');
    if (!this.canSeeAll(user) && draft.createdBy.toString() !== user.id) {
      throw forbidden('You do not have permission to manage this material draft.');
    }
    return draft;
  }

  private requireCreator(user: AuthUser): void {
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INSTRUCTOR].includes(user.role as any)) {
      throw forbidden('You do not have permission to create material drafts.');
    }
  }

  private canSeeAll(user: AuthUser): boolean {
    return user.role === ROLES.SUPER_ADMIN || user.role === ROLES.ADMIN;
  }

  private normalizeDraft(input: any): { title: string; sourceType: MaterialSourceType; status: MaterialDraftStatus; files: MaterialFile[] } {
    const source = typeof input?.toObject === 'function' ? input.toObject() : input;
    const title = this.cleanString(source?.title) || 'Untitled Material';
    const rawFiles = Array.isArray(source?.files) ? source.files : [];
    const files: MaterialFile[] = this.dedupeFiles(rawFiles.map((file: any, index: number) => this.normalizeFile(file, index)));
    const sourceType: MaterialSourceType = source?.sourceType === 'MANUAL' || (files.length > 0 && files.every((file) => file.fileType === 'MANUAL')) ? 'MANUAL' : 'FILE_UPLOAD';
    const status: MaterialDraftStatus = source?.status === 'PUBLISHED' || source?.status === 'SUBMITTED' ? source.status : 'DRAFT';
    return { title, sourceType, status, files };
  }

  private dedupeFiles(files: MaterialFile[]): MaterialFile[] {
    const seen = new Set<string>();
    return files
      .filter((file) => {
        const key = this.cleanString(file.sourceKey) || this.cleanString(file.fileName).toLowerCase();
        if (!key) return true;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((file, index) => ({ ...file, order: index + 1 }));
  }

  private normalizeFile(file: any, index: number): MaterialFile {
    const fileType: MaterialFileType = ['PPTX', 'XLSX', 'MANUAL'].includes(file?.fileType) ? file.fileType : 'MANUAL';
    const slides: MaterialSlide[] = Array.isArray(file?.slides) ? file.slides.map((slide: any, slideIndex: number) => this.normalizeSlide(slide, slideIndex)) : [];
    return {
      id: this.cleanString(file?.id) || randomUUID(),
      fileName: this.cleanString(file?.fileName) || `${fileType} material`,
      fileType,
      sourceKey: this.cleanString(file?.sourceKey),
      order: Number.isFinite(Number(file?.order)) && Number(file.order) > 0 ? Number(file.order) : index + 1,
      status: slides.length && slides.every((slide) => slide.status === 'PUBLISHED') ? 'PUBLISHED' : 'DRAFT',
      slides,
    };
  }

  private normalizeSlide(slide: any, index: number): MaterialSlide {
    return {
      id: this.cleanString(slide?.id) || randomUUID(),
      title: this.cleanString(slide?.title) || `Slide ${index + 1}`,
      order: Number.isFinite(Number(slide?.order)) && Number(slide.order) > 0 ? Number(slide.order) : index + 1,
      status: slide?.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      blocks: Array.isArray(slide?.blocks) ? slide.blocks.map((block: any, blockIndex: number) => this.normalizeBlock(block, blockIndex)) : [],
      notes: this.cleanString(slide?.notes),
      links: Array.isArray(slide?.links) ? slide.links.map((link: any) => this.normalizeLink(link)).filter((link: MaterialLinkValue) => link.label || link.url) : [],
      imageUrls: Array.isArray(slide?.imageUrls) ? slide.imageUrls.map((url: unknown) => this.cleanString(url)).filter(Boolean) : [],
    };
  }

  private normalizeBlock(block: any, index: number): MaterialContentBlock {
    const type: MaterialContentBlockType = blockTypes.has(block?.type) ? block.type : 'PARAGRAPH';
    return {
      id: this.cleanString(block?.id) || randomUUID(),
      type,
      order: Number.isFinite(Number(block?.order)) && Number(block.order) > 0 ? Number(block.order) : index + 1,
      value: this.normalizeBlockValue(type, block?.value),
    };
  }

  private normalizeBlockValue(type: MaterialContentBlockType, value: unknown): unknown {
    if (type === 'BULLETS' || type === 'NUMBERED_LIST') {
      if (Array.isArray(value)) return value.map((item) => this.cleanString(item)).filter(Boolean);
      return this.cleanString(value).split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
    }
    if (type === 'TABLE') {
      if (Array.isArray(value)) {
        return value.map((row) => Array.isArray(row) ? row.map((cell) => this.cleanString(cell)) : [this.cleanString(row)]).filter((row) => row.some(Boolean));
      }
      return this.cleanString(value).split(/\r?\n/).filter(Boolean).map((row) => row.split('|').map((cell) => cell.trim()));
    }
    if (type === 'LINK') return this.normalizeLink(value);
    if (type === 'MEDIA') {
      return {
        name: this.cleanString((value as any)?.name) || 'Uploaded image',
        url: this.cleanString((value as any)?.url),
      };
    }
    return this.cleanString(value);
  }

  private normalizeLink(value: any): MaterialLinkValue {
    return {
      label: this.cleanString(value?.label),
      url: this.cleanString(value?.url),
    };
  }

  private validateSubmittable(files: MaterialFile[]): void {
    if (!files.length) throw badRequest('At least one file/manual material is required before submitting.');
    const slides = files.flatMap((file) => file.slides);
    if (!slides.length) throw badRequest('At least one slide/content item is required before submitting.');
    slides.forEach((slide) => {
      if (!slide.title.trim()) throw badRequest('Every slide/content item must have a title.');
      if (slide.status !== 'PUBLISHED') throw badRequest('All slides/content must be published before submitting.');
      if (!slide.blocks.length) throw badRequest('Every slide/content item must have at least one content block.');
      slide.blocks.forEach((block) => {
        if (!this.hasValue(block.value)) throw badRequest('Every content block must have content before submitting.');
      });
    });
  }

  private hasDraftPayload(input: unknown): boolean {
    if (!input || typeof input !== 'object') return false;
    const source = input as Record<string, unknown>;
    return Object.keys(source).length > 0 && (Array.isArray(source.files) || typeof source.title === 'string' || typeof source.sourceType === 'string');
  }

  private hasValue(value: unknown): boolean {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === 'object') return Object.values(value).some((item) => this.hasValue(item));
    return false;
  }

  private xlsxToSlides(buffer: Buffer, fileName: string): MaterialSlide[] {
    const workbook = this.parseXlsxWorkbook(buffer);
    const sheets = Object.entries(workbook);
    return sheets.map(([sheetName, rows], index) => {
      const meaningfulRows = rows.filter((row) => row.some((cell) => cell.trim()));
      const title = meaningfulRows[0]?.find(Boolean) || sheetName || `Sheet ${index + 1}`;
      return {
        id: randomUUID(),
        title,
        order: index + 1,
        status: 'DRAFT' as MaterialItemStatus,
        blocks: [
          {
            id: randomUUID(),
            type: 'TABLE',
            order: 1,
            value: meaningfulRows.slice(0, 40),
          },
        ],
        notes: `Extracted sheet content from ${fileName}. Images were intentionally skipped.`,
        links: [],
        imageUrls: [],
      };
    });
  }

  private pptxToSlides(buffer: Buffer, fileName: string): MaterialSlide[] {
    const files = this.unzipOfficeFile(buffer);
    const slidePaths = [...files.keys()]
      .filter((path) => /^ppt\/slides\/slide\d+\.xml$/.test(path))
      .sort((a, b) => Number(a.match(/slide(\d+)\.xml/)?.[1] ?? 0) - Number(b.match(/slide(\d+)\.xml/)?.[1] ?? 0));
    const slides = slidePaths.map((path, index) => {
      const parsed = this.extractPptxSlide(files.get(path)!.toString('utf8'));
      const title = parsed.title || `Slide ${index + 1}`;
      const blocks = parsed.blocks.length
        ? parsed.blocks
        : [{
            id: randomUUID(),
            type: 'PARAGRAPH' as MaterialContentBlockType,
            order: 1,
            value: `No editable text was found in ${fileName}. The slide may contain image-only content.`,
          }];
      return {
        id: randomUUID(),
        title,
        order: index + 1,
        status: 'DRAFT' as MaterialItemStatus,
        blocks,
        notes: `Images were intentionally skipped during PPTX import.`,
        links: [],
        imageUrls: [],
      };
    });
    return this.repairRepeatedSlideTitles(slides);
  }

  private repairRepeatedSlideTitles(slides: MaterialSlide[]): MaterialSlide[] {
    const titleCounts = new Map<string, number>();
    slides.forEach((slide) => {
      const key = this.normalizeComparable(slide.title);
      titleCounts.set(key, (titleCounts.get(key) ?? 0) + 1);
    });
    const used = new Map<string, number>();
    return slides.map((slide) => {
      const key = this.normalizeComparable(slide.title);
      if ((titleCounts.get(key) ?? 0) <= 1 && !/^slide\s+\d+$/i.test(slide.title)) return slide;
      const derivedTitle = this.deriveTitleFromBlocks(slide) || slide.title || `Slide ${slide.order}`;
      const derivedKey = this.normalizeComparable(derivedTitle);
      const count = (used.get(derivedKey) ?? 0) + 1;
      used.set(derivedKey, count);
      return {
        ...slide,
        title: count > 1 ? `${derivedTitle} (${count})` : derivedTitle,
      };
    });
  }

  private deriveTitleFromBlocks(slide: MaterialSlide): string {
    const candidates = slide.blocks.flatMap((block) => {
      if (typeof block.value === 'string') return block.value.split(/\r?\n/);
      if (Array.isArray(block.value) && block.value.every((item) => typeof item === 'string')) return block.value as string[];
      if (Array.isArray(block.value) && block.value.every((row) => Array.isArray(row))) return (block.value as string[][]).flat();
      return [];
    });
    const cleanCandidates = candidates
      .map((item) => item.replace(/^[\s•▪▫➢>-]+/, '').trim())
      .filter((item) => item.length >= 4 && !/^basic human anatomy and physiology$/i.test(item));
    const best = cleanCandidates.find((item) => /:/.test(item)) ?? cleanCandidates[0] ?? '';
    return best
      .split(/[.。]/)[0]
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 72);
  }

  private parseXlsxWorkbook(buffer: Buffer): WorkbookSheets {
    const files = this.unzipOfficeFile(buffer);
    const workbookXml = this.readZipText(files, 'xl/workbook.xml');
    const workbookRelsXml = this.readZipText(files, 'xl/_rels/workbook.xml.rels');
    const sharedStrings = files.has('xl/sharedStrings.xml') ? this.parseSharedStrings(this.readZipText(files, 'xl/sharedStrings.xml')) : [];
    const relTargets = new Map<string, string>();
    for (const rel of workbookRelsXml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) {
      relTargets.set(rel[1], rel[2]);
    }
    const workbook: WorkbookSheets = {};
    for (const sheet of workbookXml.matchAll(/<sheet\b[^>]*name="([^"]+)"[^>]*(?:r:id|id)="([^"]+)"/g)) {
      const sheetName = this.xmlDecode(sheet[1]);
      const target = relTargets.get(sheet[2]);
      if (!target) continue;
      const normalizedTarget = target.replace(/^\//, '');
      const path = normalizedTarget.startsWith('xl/') ? normalizedTarget : `xl/${normalizedTarget}`;
      workbook[sheetName] = this.parseWorksheet(this.readZipText(files, path), sharedStrings);
    }
    return workbook;
  }

  private unzipOfficeFile(buffer: Buffer): Map<string, Buffer> {
    const files = new Map<string, Buffer>();
    let eocdOffset = -1;
    for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 70000); i--) {
      if (buffer.readUInt32LE(i) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }
    if (eocdOffset < 0) throw badRequest('Invalid Office file.');
    const entryCount = buffer.readUInt16LE(eocdOffset + 10);
    const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
    let ptr = centralOffset;
    for (let i = 0; i < entryCount; i++) {
      if (buffer.readUInt32LE(ptr) !== 0x02014b50) throw badRequest('Invalid Office file central directory.');
      const method = buffer.readUInt16LE(ptr + 10);
      const compressedSize = buffer.readUInt32LE(ptr + 20);
      const fileNameLength = buffer.readUInt16LE(ptr + 28);
      const extraLength = buffer.readUInt16LE(ptr + 30);
      const commentLength = buffer.readUInt16LE(ptr + 32);
      const localOffset = buffer.readUInt32LE(ptr + 42);
      const fileName = buffer.slice(ptr + 46, ptr + 46 + fileNameLength).toString('utf8');
      if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw badRequest('Invalid Office file local header.');
      const localNameLength = buffer.readUInt16LE(localOffset + 26);
      const localExtraLength = buffer.readUInt16LE(localOffset + 28);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = buffer.slice(dataStart, dataStart + compressedSize);
      if (method === 0) files.set(fileName, compressed);
      else if (method === 8) files.set(fileName, inflateRawSync(compressed));
      ptr += 46 + fileNameLength + extraLength + commentLength;
    }
    return files;
  }

  private readZipText(files: Map<string, Buffer>, path: string): string {
    const file = files.get(path);
    if (!file) throw badRequest(`File is missing ${path}.`);
    return file.toString('utf8');
  }

  private parseSharedStrings(xml: string): string[] {
    return [...xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)]
      .map((match) => [...match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((textMatch) => this.xmlDecode(textMatch[1])).join(''));
  }

  private parseWorksheet(xml: string, sharedStrings: string[]): string[][] {
    const rows: string[][] = [];
    for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const row: string[] = [];
      for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
        const attrs = cellMatch[1];
        const body = cellMatch[2];
        const ref = attrs.match(/\br="([A-Z]+)\d+"/)?.[1] ?? 'A';
        const columnIndex = this.columnIndex(ref);
        const type = attrs.match(/\bt="([^"]+)"/)?.[1] ?? '';
        let value = '';
        if (type === 'inlineStr') {
          value = [...body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((match) => this.xmlDecode(match[1])).join('');
        } else {
          const rawValue = this.xmlDecode(body.match(/<v>([\s\S]*?)<\/v>/)?.[1] ?? '');
          value = type === 's' ? sharedStrings[Number(rawValue)] ?? '' : rawValue;
        }
        row[columnIndex] = value;
      }
      rows.push(row.map((value) => value ?? ''));
    }
    return rows;
  }

  private extractPptxSlide(xml: string): { title: string; blocks: MaterialContentBlock[] } {
    const shapes = this.extractPptxShapes(xml);
    const titleShape = shapes.find((shape) => shape.isTitle && shape.paragraphs.some((paragraph) => paragraph.text));
    const title = titleShape?.paragraphs.map((paragraph) => paragraph.text).join(' ').trim()
      || shapes.find((shape) => shape.paragraphs.some((paragraph) => paragraph.text))?.paragraphs[0]?.text
      || '';
    const titleKey = this.normalizeComparable(title);
    const blocks: MaterialContentBlock[] = [];

    shapes.forEach((shape) => {
      if (shape === titleShape) return;
      const paragraphs = shape.paragraphs
        .map((paragraph) => ({ ...paragraph, text: paragraph.text.trim() }))
        .filter((paragraph) => paragraph.text && this.normalizeComparable(paragraph.text) !== titleKey);
      if (!paragraphs.length) return;
      const hasBullets = paragraphs.some((paragraph) => paragraph.level > 0 || paragraph.bullet);
      if (hasBullets) {
        blocks.push({
          id: randomUUID(),
          type: 'BULLETS',
          order: blocks.length + 1,
          value: paragraphs.map((paragraph) => paragraph.level > 0 ? `${'  '.repeat(paragraph.level)}${paragraph.text}` : paragraph.text),
        });
      } else {
        paragraphs.forEach((paragraph) => {
          blocks.push({
            id: randomUUID(),
            type: paragraph.text.length < 72 && blocks.length === 0 ? 'HEADING' : 'PARAGRAPH',
            order: blocks.length + 1,
            value: paragraph.text,
          });
        });
      }
    });

    this.extractPptxTables(xml).forEach((table) => {
      if (!table.length) return;
      blocks.push({
        id: randomUUID(),
        type: 'TABLE',
        order: blocks.length + 1,
        value: table,
      });
    });

    return { title, blocks };
  }

  private extractPptxShapes(xml: string): Array<{ isTitle: boolean; paragraphs: Array<{ text: string; level: number; bullet: boolean }> }> {
    return [...xml.matchAll(/<p:sp\b[\s\S]*?<\/p:sp>/g)].map((shapeMatch) => {
      const shapeXml = shapeMatch[0];
      const phMatch = shapeXml.match(/<p:ph\b([^>]*)\/?>/);
      const phAttrs = phMatch?.[1] ?? '';
      const isTitle = /\btype="(?:title|ctrTitle|subTitle)"/.test(phAttrs);
      const paragraphs = [...shapeXml.matchAll(/<a:p\b[^>]*>([\s\S]*?)<\/a:p>/g)]
        .map((paragraphMatch) => {
          const paragraphXml = paragraphMatch[1];
          const level = Number(paragraphXml.match(/<a:pPr\b[^>]*\blvl="(\d+)"/)?.[1] ?? 0);
          const bullet = /<a:bu(?:Char|AutoNum|Blip)\b/.test(paragraphXml);
          const text = [...paragraphXml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)]
            .map((match) => this.xmlDecode(match[1]))
            .join('')
            .replace(/\s+/g, ' ')
            .trim();
          return { text, level, bullet };
        })
        .filter((paragraph) => paragraph.text);
      return { isTitle, paragraphs };
    });
  }

  private extractPptxTables(xml: string): string[][][] {
    return [...xml.matchAll(/<a:tbl\b[\s\S]*?<\/a:tbl>/g)].map((tableMatch) => {
      return [...tableMatch[0].matchAll(/<a:tr\b[\s\S]*?<\/a:tr>/g)].map((rowMatch) => {
        return [...rowMatch[0].matchAll(/<a:tc\b[\s\S]*?<\/a:tc>/g)].map((cellMatch) => {
          return [...cellMatch[0].matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)]
            .map((match) => this.xmlDecode(match[1]).trim())
            .filter(Boolean)
            .join(' ');
        });
      }).filter((row) => row.some(Boolean));
    }).filter((table) => table.length);
  }

  private normalizeComparable(value: string): string {
    return value.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  private xmlDecode(value: string): string {
    return value
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&');
  }

  private columnIndex(columnName: string): number {
    return columnName.split('').reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0) - 1;
  }

  private cleanString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  private toResponse(draft: any) {
    return {
      id: draft._id?.toString?.() ?? draft.id,
      title: draft.title,
      sourceType: draft.sourceType,
      status: draft.status,
      files: draft.files ?? [],
      createdBy: draft.createdBy?.toString?.() ?? draft.createdBy,
      updatedBy: draft.updatedBy?.toString?.() ?? draft.updatedBy,
      submittedBy: draft.submittedBy?.toString?.() ?? draft.submittedBy ?? null,
      submittedAt: draft.submittedAt ?? null,
      createdAt: draft.createdAt ?? null,
      updatedAt: draft.updatedAt ?? null,
    };
  }
}
