import { Types } from 'mongoose';
import { ExamModel, type ExamQuestion, type ExamSection } from '../models/exam.model';
import { ExamSubmissionModel } from '../models/exam-submission.model';
import { badRequest } from '../utils/http-error';
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

  private toResponse(exam: any) {
    return {
      id: exam._id.toString(),
      title: exam.title,
      description: exam.description ?? '',
      durationMinutes: exam.durationMinutes ?? 30,
      sections: exam.sections ?? [],
      questionCount: this.countQuestions(exam.sections ?? []),
    };
  }

  private countQuestions(sections: any[]): number {
    return sections.reduce((total, section) => total + (section.questions?.length ?? 0), 0);
  }

  private clean(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }
}
