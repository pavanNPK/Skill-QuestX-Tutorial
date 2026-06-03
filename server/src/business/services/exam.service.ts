/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { Types } from 'mongoose';
import { inflateRawSync } from 'zlib';
import { ROLES } from '../../core/constants/roles';
import { ExamModel, type ExamQuestion, type ExamSection } from '../../data/models/exam.model';
import { ExamSubmissionModel } from '../../data/models/exam-submission.model';
import { badRequest, forbidden } from '../../core/utils/http-error';
import type { AuthUser } from '../../core/types/request';
import type { UploadedFile } from '../../core/types/uploaded-file';

const questionTypes = new Set(['blank', 'single_select', 'multi_select']);

interface WorkbookSheets {
  [sheetName: string]: Record<string, string>[];
}

export class ExamService {
  async getAvailableExams() {
    const exams = await ExamModel.find({ status: 'published' }).sort({ createdAt: 1 }).lean().exec();
    return exams.map((exam: any) => ({
      id: exam._id.toString(),
      title: exam.title,
      description: exam.description ?? '',
      durationMinutes: exam.durationMinutes ?? 30,
      sectionCount: exam.sections?.length ?? 0,
      questionCount: this.countQuestions(exam.sections ?? []),
    }));
  }

  async getExam(examId: string) {
    if (!Types.ObjectId.isValid(examId)) throw badRequest('Invalid exam id.');
    const exam = await ExamModel.findById(examId).lean().exec();
    if (!exam || exam.status !== 'published') throw badRequest('Exam not found.');
    return this.toResponse(exam);
  }

  async getManagedExams(user: AuthUser) {
    this.requireManage(user);
    const exams = await ExamModel.find({}).sort({ createdAt: 1 }).lean().exec();
    return exams.map((exam: any) => this.toResponse(exam, true));
  }

  async create(body: any, user: AuthUser) {
    this.requireManage(user);
    const exam = await ExamModel.create(this.normalize(body));
    return this.toResponse(exam, true);
  }

  async update(examId: string, body: any, user: AuthUser) {
    this.requireManage(user);
    if (!Types.ObjectId.isValid(examId)) throw badRequest('Invalid exam id.');
    const exam = await ExamModel.findById(examId).exec();
    if (!exam) throw badRequest('Exam not found.');
    const normalized = this.normalize(body);
    exam.title = normalized.title;
    exam.description = normalized.description;
    exam.durationMinutes = normalized.durationMinutes;
    exam.status = normalized.status as any;
    exam.sections = normalized.sections as any;
    await exam.save();
    return this.toResponse(exam, true);
  }

  async delete(examId: string, user: AuthUser) {
    this.requireManage(user);
    if (!Types.ObjectId.isValid(examId)) throw badRequest('Invalid exam id.');
    const deleted = await ExamModel.findByIdAndDelete(examId).lean().exec();
    if (!deleted) throw badRequest('Exam not found.');
    return { id: examId, deleted: true };
  }

  async importWorkbook(file: UploadedFile, user: AuthUser) {
    this.requireManage(user);
    if (!file?.buffer?.length) throw badRequest('Upload an Excel .xlsx workbook.');
    if (!/\.xlsx$/i.test(file.originalname)) throw badRequest('Bulk upload supports Excel .xlsx files only.');
    const imported = this.examsFromWorkbook(this.parseXlsxWorkbook(file.buffer));
    if (!imported.length) throw badRequest('Workbook does not contain any exams.');
    await ExamModel.deleteMany({}).exec();
    const created = await ExamModel.insertMany(imported);
    return created.map((exam: any) => this.toResponse(exam, true));
  }

  async submit(examId: string, body: any, user: AuthUser) {
    if (!Types.ObjectId.isValid(examId)) throw badRequest('Invalid exam id.');
    const exam = await ExamModel.findById(examId).lean().exec();
    if (!exam || exam.status !== 'published') throw badRequest('Exam not found.');

    const answers = Array.isArray(body?.answers)
      ? body.answers.map((answer: any) => ({
        questionId: String(answer.questionId ?? ''),
        value: Array.isArray(answer.value) ? answer.value.map(String) : String(answer.value ?? ''),
      })).filter((answer: any) => answer.questionId)
      : [];

    const submission = await ExamSubmissionModel.create({
      examId: new Types.ObjectId(examId),
      userId: new Types.ObjectId(user.id),
      answers,
      autoSubmitted: body?.autoSubmitted === true,
      submittedAt: new Date(),
    });

    return {
      id: submission._id.toString(),
      examId,
      submittedAt: submission.submittedAt,
      autoSubmitted: submission.autoSubmitted,
      answeredCount: answers.filter((answer: any) => Array.isArray(answer.value) ? answer.value.length : String(answer.value).trim()).length,
      questionCount: this.countQuestions((exam as any).sections ?? []),
    };
  }

  normalize(input: any) {
    // use of this is:
    // Convert raw editor/import data into the exact Exam document shape Mongo expects.
    return {
      title: this.clean(input?.title) || 'Untitled Exam',
      description: this.clean(input?.description),
      durationMinutes: Number.isFinite(Number(input?.durationMinutes)) ? Number(input.durationMinutes) : 30,
      status: input?.status === 'draft' ? 'draft' : 'published',
      sections: Array.isArray(input?.sections) ? input.sections.map((section: any, sectionIndex: number) => this.normalizeSection(section, sectionIndex)) : [],
    };
  }

  private examsFromWorkbook(workbook: WorkbookSheets) {
    // use of this is:
    // Convert parsed workbook sheets into normalized exams.
    const examRows = workbook.Exams ?? [];
    const sectionRows = workbook.Sections ?? [];
    const questionRows = workbook.Questions ?? [];
    const optionRows = workbook.Options ?? [];
    if (!examRows.length) throw badRequest('Exams sheet has no data rows.');
    if (!sectionRows.length) throw badRequest('Sections sheet has no data rows.');
    if (!questionRows.length) throw badRequest('Questions sheet has no data rows.');

    const sectionsByExam = new Map<string, Record<string, string>[]>();
    const questionsBySection = new Map<string, Record<string, string>[]>();
    const optionsByQuestion = new Map<string, Record<string, string>[]>();
    const examIds = new Set<string>();
    const sectionIds = new Set<string>();
    const questionIds = new Set<string>();

    examRows.forEach((row) => {
      // Exam rows become top-level exam documents and must have unique ids.
      const id = this.clean(row.exam_id);
      if (!id) throw badRequest('Exams sheet has a row without exam_id.');
      if (examIds.has(id)) throw badRequest(`Duplicate exam_id: ${id}`);
      examIds.add(id);
    });

    sectionRows.forEach((row) => {
      // Section rows must reference an existing exam id.
      const id = this.clean(row.section_id);
      const examId = this.clean(row.exam_id);
      if (!id) throw badRequest('Sections sheet has a row without section_id.');
      if (sectionIds.has(id)) throw badRequest(`Duplicate section_id: ${id}`);
      if (!examIds.has(examId)) throw badRequest(`Sections sheet references unknown exam_id: ${examId}`);
      sectionIds.add(id);
      sectionsByExam.set(examId, [...(sectionsByExam.get(examId) ?? []), row]);
    });

    questionRows.forEach((row) => {
      // Question rows must reference an existing section id.
      const id = this.clean(row.question_id);
      const sectionId = this.clean(row.section_id);
      if (!id) throw badRequest('Questions sheet has a row without question_id.');
      if (questionIds.has(id)) throw badRequest(`Duplicate question_id: ${id}`);
      if (!sectionIds.has(sectionId)) throw badRequest(`Questions sheet references unknown section_id: ${sectionId}`);
      questionIds.add(id);
      questionsBySection.set(sectionId, [...(questionsBySection.get(sectionId) ?? []), row]);
    });

    optionRows.forEach((row) => {
      // Option rows must reference an existing question id.
      const questionId = this.clean(row.question_id);
      if (!questionIds.has(questionId)) throw badRequest(`Options sheet references unknown question_id: ${questionId}`);
      optionsByQuestion.set(questionId, [...(optionsByQuestion.get(questionId) ?? []), row]);
    });

    return this.sortRows(examRows, 'exam_order').map((examRow, examIndex) => this.normalize({
      title: this.clean(examRow.exam_title) || `Exam ${examIndex + 1}`,
      description: this.clean(examRow.exam_description),
      durationMinutes: Number(examRow.duration_minutes || 30),
      status: 'published',
      sections: this.sortRows(sectionsByExam.get(this.clean(examRow.exam_id)) ?? [], 'section_order').map((sectionRow, sectionIndex) => {
        const sectionId = this.clean(sectionRow.section_id) || `section-${sectionIndex + 1}`;
        return {
          id: sectionId,
          title: this.clean(sectionRow.section_title) || `Section ${sectionIndex + 1}`,
          summary: this.clean(sectionRow.section_summary),
          questions: this.sortRows(questionsBySection.get(sectionId) ?? [], 'question_order').map((questionRow, questionIndex) => {
            const questionId = this.clean(questionRow.question_id) || `q-${questionIndex + 1}`;
            const options = this.sortRows(optionsByQuestion.get(questionId) ?? [], 'option_order')
              .map((optionRow, optionIndex) => ({
                value: this.clean(optionRow.option_value) || String.fromCharCode(97 + optionIndex),
                label: this.clean(optionRow.option_label),
              }))
              .filter((option) => option.label);
            const type = this.normalizeQuestionType(this.clean(questionRow.question_type), options.length);
            return {
              id: questionId,
              type,
              prompt: this.clean(questionRow.question) || `Question ${questionIndex + 1}`,
              options,
              answer: this.normalizeAnswer(this.clean(questionRow.answer), type),
            };
          }),
        };
      }),
    }));
  }

  private normalizeQuestionType(value: string, optionCount: number): ExamQuestion['type'] {
    // use of this is:
    // Accept common workbook labels and convert them into internal question type values.
    const normalized = value.toLowerCase().replace(/[\s-]+/g, '_');
    if (normalized === 'single' || normalized === 'mcq' || normalized === 'single_choice') return 'single_select';
    if (normalized === 'multi' || normalized === 'multiple' || normalized === 'multi_choice') return 'multi_select';
    if (normalized === 'blank' || normalized === 'text' || normalized === 'text_area' || normalized === 'textarea') return 'blank';
    return optionCount ? 'single_select' : 'blank';
  }

  private normalizeAnswer(value: string, type: ExamQuestion['type']): string | string[] | null {
    // use of this is:
    // Convert workbook answer text into the right answer shape for the question type.
    if (!value) return type === 'multi_select' ? [] : null;
    if (type === 'multi_select') return value.split(/[|,]/).map((item) => this.clean(item)).filter(Boolean);
    return value;
  }

  private sortRows(rows: Record<string, string>[], orderKey: string): Record<string, string>[] {
    // use of this is:
    // Preserve workbook order using numeric order columns.
    return [...rows].sort((a, b) => Number(a[orderKey] || 0) - Number(b[orderKey] || 0));
  }

  private parseXlsxWorkbook(buffer: Buffer): WorkbookSheets {
    // use of this is:
    // Reads workbook XML files from the XLSX zip and returns sheet-name to row-object mapping.
    const files = this.unzip(buffer);
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
      const rows = this.parseWorksheet(this.readZipText(files, path), sharedStrings);
      workbook[sheetName] = this.sheetRowsToObjects(rows);
    }
    return workbook;
  }

  private unzip(buffer: Buffer): Map<string, Buffer> {
    // use of this is:
    // Minimal XLSX unzipper for extracting workbook XML without an extra parser dependency.
    const files = new Map<string, Buffer>();
    let eocdOffset = -1;
    for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 70000); i--) {
      if (buffer.readUInt32LE(i) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }
    if (eocdOffset < 0) throw badRequest('Invalid .xlsx file.');
    const entryCount = buffer.readUInt16LE(eocdOffset + 10);
    const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
    let ptr = centralOffset;
    for (let i = 0; i < entryCount; i++) {
      if (buffer.readUInt32LE(ptr) !== 0x02014b50) throw badRequest('Invalid .xlsx central directory.');
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
      if (method === 0) files.set(fileName, compressed);
      else if (method === 8) files.set(fileName, inflateRawSync(compressed));
      ptr += 46 + fileNameLength + extraLength + commentLength;
    }
    return files;
  }

  private readZipText(files: Map<string, Buffer>, path: string): string {
    // use of this is:
    // Read required XML files from the XLSX archive and fail with a clear import message if missing.
    const file = files.get(path);
    if (!file) throw badRequest(`Workbook is missing ${path}.`);
    return file.toString('utf8');
  }

  private parseSharedStrings(xml: string): string[] {
    // use of this is:
    // Build shared string lookup table used by worksheet cells with type "s".
    return [...xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((match) => {
      return [...match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((textMatch) => this.xmlDecode(textMatch[1])).join('');
    });
  }

  private parseWorksheet(xml: string, sharedStrings: string[]): string[][] {
    // use of this is:
    // Convert one worksheet XML file into a two-dimensional string table.
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

  private sheetRowsToObjects(rows: string[][]): Record<string, string>[] {
    // use of this is:
    // Convert header row + data rows into plain objects keyed by workbook column names.
    const headers = (rows[0] ?? []).map((header) => this.clean(header));
    if (!headers.length) return [];
    return rows.slice(1)
      .map((row) => Object.fromEntries(headers.map((header, index) => [header, this.clean(row[index] ?? '')])))
      .filter((row) => Object.values(row).some(Boolean));
  }

  private columnIndex(columnName: string): number {
    // use of this is:
    // Convert Excel column letters into a zero-based array index.
    return columnName.split('').reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0) - 1;
  }

  private xmlDecode(value: string): string {
    // use of this is:
    // Decode XML entities so imported text matches what users typed in Excel.
    return value
      .replace(/&#10;/g, '\n')
      .replace(/&#xA;/gi, '\n')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }

  private normalizeSection(section: any, sectionIndex: number): ExamSection {
    // use of this is:
    // Normalize one raw section into stable ids, title, summary, and questions.
    return {
      id: this.clean(section?.id) || `section-${sectionIndex + 1}`,
      title: this.clean(section?.title) || `Section ${sectionIndex + 1}`,
      summary: this.clean(section?.summary),
      questions: Array.isArray(section?.questions) ? section.questions.map((question: any, questionIndex: number) => this.normalizeQuestion(question, questionIndex)) : [],
    };
  }

  private normalizeQuestion(question: any, questionIndex: number): ExamQuestion {
    // use of this is:
    // Normalize one raw question into supported type, prompt, options, and answer.
    const type = questionTypes.has(question?.type) ? question.type : 'blank';
    return {
      id: this.clean(question?.id) || `q-${questionIndex + 1}`,
      type,
      prompt: this.clean(question?.prompt) || 'Untitled question',
      options: Array.isArray(question?.options)
        ? question.options.map((option: any, optionIndex: number) => ({
          value: this.clean(option?.value) || String.fromCharCode(97 + optionIndex),
          label: this.clean(option?.label),
        })).filter((option: any) => option.label)
        : [],
      answer: question?.answer ?? null,
    };
  }

  private toResponse(exam: any, includeStatus = false) {
    // use of this is:
    // Hide Mongo internals and return one stable exam DTO to Angular.
    return {
      id: exam._id.toString(),
      title: exam.title,
      description: exam.description ?? '',
      durationMinutes: exam.durationMinutes ?? 30,
      ...(includeStatus ? { status: exam.status ?? 'draft' } : {}),
      sections: exam.sections ?? [],
      sectionCount: exam.sections?.length ?? 0,
      questionCount: this.countQuestions(exam.sections ?? []),
    };
  }

  private countQuestions(sections: any[]): number {
    // use of this is:
    // Count total questions across all sections for cards and submission summaries.
    return sections.reduce((total, section) => total + (section.questions?.length ?? 0), 0);
  }

  private clean(value: unknown): string {
    // use of this is:
    // Trim strings safely and convert non-strings to empty strings.
    return typeof value === 'string' ? value.trim() : '';
  }

  private requireManage(user: AuthUser) {
    // use of this is:
    // Blocks non-manager roles from creating, importing, updating, or deleting exams.
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INSTRUCTOR].includes(user.role as any)) {
      throw forbidden('You do not have permission to manage exams.');
    }
  }
}
