import { Types } from 'mongoose';
import { inflateRawSync } from 'zlib';
import { ROLES } from '../constants/roles';
import { ExamModel, type ExamQuestion, type ExamSection } from '../models/exam.model';
import { ExamSubmissionModel } from '../models/exam-submission.model';
import { badRequest, forbidden } from '../utils/http-error';
import type { AuthUser } from '../types/request';

const questionTypes = new Set(['blank', 'single_select', 'multi_select']);

export class ExamService {
  async getAvailableExams() {
    const exams = await ExamModel.find({ status: 'published' }).sort({ createdAt: -1 }).lean().exec();
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
    const exams = await ExamModel.find({}).sort({ createdAt: -1 }).lean().exec();
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

  async importDocx(files: Express.Multer.File[], user: AuthUser) {
    this.requireManage(user);
    if (!files.length) throw badRequest('Upload at least one .docx file.');
    const created = [];
    for (const file of files) {
      if (!/\.docx$/i.test(file.originalname)) throw badRequest('Bulk upload supports .docx files only.');
      const exam = await ExamModel.create(this.examFromDocx(file));
      created.push(this.toResponse(exam, true));
    }
    return created;
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
    return {
      title: this.clean(input?.title) || 'Untitled Exam',
      description: this.clean(input?.description),
      durationMinutes: Number.isFinite(Number(input?.durationMinutes)) ? Number(input.durationMinutes) : 30,
      status: input?.status === 'draft' ? 'draft' : 'published',
      sections: Array.isArray(input?.sections) ? input.sections.map((section: any, sectionIndex: number) => this.normalizeSection(section, sectionIndex)) : [],
    };
  }

  private examFromDocx(file: Express.Multer.File) {
    const title = this.clean(file.originalname.replace(/\.docx$/i, '').replace(/\s+/g, ' ')) || 'Imported Exam';
    const paragraphs = this.docxParagraphs(file.buffer);
    const questions = paragraphs
      .map((text, index) => this.questionFromText(text, index))
      .filter(Boolean) as ExamQuestion[];
    if (!questions.length) throw badRequest(`${file.originalname} does not contain questions.`);
    return this.normalize({
      title,
      description: `Imported from ${file.originalname}`,
      durationMinutes: 30,
      status: 'draft',
      sections: [{
        id: 'section-1',
        title,
        summary: '',
        questions,
      }],
    });
  }

  private questionFromText(text: string, index: number): ExamQuestion | null {
    const cleanText = this.clean(text.replace(/\s+/g, ' '));
    if (!cleanText) return null;
    const optionMatches = [...cleanText.matchAll(/\b([A-D])\.\s*([^A-D]+?)(?=\s+[A-D]\.\s*|$)/g)];
    if (!optionMatches.length) {
      return {
        id: `q-${index + 1}`,
        type: 'blank',
        prompt: cleanText.replace(/_{3,}/g, '__________'),
        options: [],
      };
    }
    const firstOptionIndex = cleanText.search(/\b[A-D]\.\s*/);
    const prompt = this.clean(cleanText.slice(0, firstOptionIndex).replace(/\[\s*\]/g, ''));
    return {
      id: `q-${index + 1}`,
      type: 'single_select',
      prompt: prompt || `Question ${index + 1}`,
      options: optionMatches.map((match) => ({
        value: match[1].toLowerCase(),
        label: this.clean(match[2]),
      })).filter((option) => option.label),
    };
  }

  private docxParagraphs(buffer: Buffer): string[] {
    const files = this.unzip(buffer);
    const xml = files.get('word/document.xml')?.toString('utf8');
    if (!xml) throw badRequest('Invalid .docx file.');
    const paragraphs = [...xml.matchAll(/<w:p\b[\s\S]*?<\/w:p>/g)]
      .map((match) => [...match[0].matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g)]
        .map((text) => this.xmlDecode(text[1]))
        .join('')
        .trim())
      .filter(Boolean);

    const combined: string[] = [];
    for (const paragraph of paragraphs) {
      const previous = combined[combined.length - 1] ?? '';
      const continuesQuestion = previous && !/[.?)]\s*$/.test(previous) && !/_{3,}\s*$/.test(previous);
      const startsOptionLine = /^\s*(?:\[?\s*\]?\s*)?[A-D]\.\s+/i.test(paragraph);
      if (combined.length && (startsOptionLine || continuesQuestion)) {
        combined[combined.length - 1] = `${previous} ${paragraph}`.trim();
      } else {
        combined.push(paragraph);
      }
    }
    return combined;
  }

  private unzip(buffer: Buffer): Map<string, Buffer> {
    const files = new Map<string, Buffer>();
    let eocdOffset = -1;
    for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 70000); i--) {
      if (buffer.readUInt32LE(i) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }
    if (eocdOffset < 0) throw badRequest('Invalid .docx file.');
    const entryCount = buffer.readUInt16LE(eocdOffset + 10);
    const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
    let ptr = centralOffset;
    for (let i = 0; i < entryCount; i++) {
      if (buffer.readUInt32LE(ptr) !== 0x02014b50) throw badRequest('Invalid .docx central directory.');
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

  private xmlDecode(value: string): string {
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
    return {
      id: this.clean(section?.id) || `section-${sectionIndex + 1}`,
      title: this.clean(section?.title) || `Section ${sectionIndex + 1}`,
      summary: this.clean(section?.summary),
      questions: Array.isArray(section?.questions) ? section.questions.map((question: any, questionIndex: number) => this.normalizeQuestion(question, questionIndex)) : [],
    };
  }

  private normalizeQuestion(question: any, questionIndex: number): ExamQuestion {
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
    return sections.reduce((total, section) => total + (section.questions?.length ?? 0), 0);
  }

  private clean(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  private requireManage(user: AuthUser) {
    if (![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.INSTRUCTOR].includes(user.role as any)) {
      throw forbidden('You do not have permission to manage exams.');
    }
  }
}
