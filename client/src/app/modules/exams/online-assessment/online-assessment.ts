import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  AvailableExam,
  ExamAnswer,
  ExamDetail,
  ExamOption,
  ExamQuestion,
  ExamQuestionType,
  ExamSection,
  ExamService,
  ExamSubmissionResult,
} from '../../core/services/exam.service';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { HeaderService } from '../../core/services/header.service';

type ExamMode = 'list' | 'section' | 'exam' | 'submitted';
type PendingConfirm = {
  title: string;
  message: string;
  actionLabel: string;
  onConfirm: () => void;
};

@Component({
  selector: 'sqx-online-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './online-assessment.html',
  styleUrl: './online-assessment.scss',
})
export class OnlineAssessment implements OnInit, OnDestroy {
  mode = signal<ExamMode>('list');
  loading = true;
  error = '';
  availableExams: AvailableExam[] = [];
  selectedExam: ExamDetail | null = null;
  selectedSection: ExamSection | null = null;
  currentQuestionIndex = signal(0);
  answers: Record<string, string | string[]> = {};
  remainingSeconds = 0;
  submissionResult: ExamSubmissionResult | null = null;
  manageMode = false;
  managedExams: ExamDetail[] = [];
  selectedManageExam: ExamDetail | null = null;
  selectedManageSectionId = '';
  selectedManageQuestionId = '';
  saving = false;
  managerMessage = '';
  pendingConfirm: PendingConfirm | null = null;
  readonly questionTypes: Array<{ label: string; value: ExamQuestionType }> = [
    { label: 'Text area', value: 'blank' },
    { label: 'Single choice', value: 'single_select' },
    { label: 'Multi choice', value: 'multi_select' },
  ];

  private timerId: ReturnType<typeof setInterval> | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private examService: ExamService,
    private auth: AuthService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.updateGlobalHeader();
    this.loadExams();
  }

  ngOnDestroy() {
    this.stopTimer();
    this.destroy$.next();
    this.destroy$.complete();
    this.headerService.reset();
  }

  get currentQuestion(): ExamQuestion | null {
    return this.selectedSection?.questions[this.currentQuestionIndex()] ?? null;
  }

  get isFirstQuestion(): boolean {
    return this.currentQuestionIndex() === 0;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex() === (this.selectedSection?.questions.length ?? 0) - 1;
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  get answeredCount(): number {
    return Object.values(this.answers).filter((value) => Array.isArray(value) ? value.length > 0 : String(value ?? '').trim()).length;
  }

  get canManageExams(): boolean {
    return this.auth.canManageCourseContent();
  }

  get selectedManageSection(): ExamSection | null {
    const exam = this.selectedManageExam;
    if (!exam?.sections?.length) return null;
    return exam.sections.find((section) => section.id === this.selectedManageSectionId) ?? exam.sections[0] ?? null;
  }

  get selectedManageQuestion(): ExamQuestion | null {
    const section = this.selectedManageSection;
    if (!section?.questions?.length) return null;
    return section.questions.find((question) => question.id === this.selectedManageQuestionId) ?? section.questions[0] ?? null;
  }

  loadExams() {
    this.loading = true;
    this.error = '';
    let settled = false;
    window.setTimeout(() => {
      if (!settled && this.loading) this.loadExamsWithFetchFallback();
    }, 3500);
    this.examService.getAvailableExams().pipe(takeUntil(this.destroy$)).subscribe({
      next: (exams) => {
        settled = true;
        this.availableExams = Array.isArray(exams) ? exams : [];
        this.loading = false;
        if (!this.availableExams.length) this.error = 'No online assessments are available yet.';
        this.cdr.detectChanges();
      },
      error: () => {
        settled = true;
        this.loading = false;
        this.error = 'Could not load online assessments.';
        this.cdr.detectChanges();
      },
    });
  }

  startManage() {
    this.manageMode = true;
    this.mode.set('list');
    this.updateGlobalHeader();
    this.loadManagedExams();
  }

  closeManage() {
    this.manageMode = false;
    this.selectedManageExam = null;
    this.managerMessage = '';
    this.updateGlobalHeader();
    this.loadExams();
  }

  loadManagedExams() {
    this.loading = true;
    this.managerMessage = '';
    this.examService.getManagedExams().pipe(takeUntil(this.destroy$)).subscribe({
      next: (exams) => {
        this.managedExams = Array.isArray(exams) ? exams : [];
        this.selectedManageExam = this.selectedManageExam
          ? this.managedExams.find((exam) => exam.id === this.selectedManageExam?.id) ?? this.managedExams[0] ?? null
          : this.managedExams[0] ?? null;
        this.syncManageSelection();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.managerMessage = 'Could not load exam manager. You can still create a new exam.';
      },
    });
  }

  selectManageExam(exam: ExamDetail) {
    this.selectedManageExam = exam;
    this.syncManageSelection();
  }

  addExam() {
    const exam: ExamDetail = {
      id: this.makeId('draft-exam'),
      title: 'New Online Exam',
      description: '',
      durationMinutes: 30,
      sectionCount: 1,
      questionCount: 0,
      status: 'draft',
      sections: [{ id: this.makeId('section'), title: 'Section 1', summary: '', questions: [] }],
    };
    this.managedExams = [exam, ...this.managedExams];
    this.selectedManageExam = exam;
    this.syncManageSelection();
    this.managerMessage = 'New exam draft is ready. Click Save Draft to store it.';
  }

  saveManagedExam(message = 'Exam saved.') {
    if (!this.selectedManageExam) return;
    this.saving = true;
    const save$ = this.isLocalExam(this.selectedManageExam)
      ? this.examService.createExam(this.selectedManageExam)
      : this.examService.updateExam(this.selectedManageExam.id, this.selectedManageExam);
    save$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (exam) => {
        this.managedExams = this.managedExams.map((item) => item.id === this.selectedManageExam?.id ? exam : item);
        this.selectedManageExam = exam;
        this.syncManageSelection();
        this.saving = false;
        this.managerMessage = message;
      },
      error: () => {
        this.saving = false;
        this.managerMessage = 'Could not save exam.';
      },
    });
  }

  deleteManagedExam(exam: ExamDetail, event?: Event) {
    event?.stopPropagation();
    this.requestConfirmation({
      title: 'Delete exam',
      message: `Delete "${exam.title}" and all of its sections and questions?`,
      actionLabel: 'Delete Exam',
      onConfirm: () => this.confirmDeleteExam(exam),
    });
  }

  private confirmDeleteExam(exam: ExamDetail) {
    if (this.isLocalExam(exam)) {
      this.managedExams = this.managedExams.filter((item) => item.id !== exam.id);
      this.selectedManageExam = this.managedExams[0] ?? null;
      this.syncManageSelection();
      this.managerMessage = 'Draft removed.';
      return;
    }
    this.examService.deleteExam(exam.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.managedExams = this.managedExams.filter((item) => item.id !== exam.id);
        this.selectedManageExam = this.managedExams[0] ?? null;
        this.syncManageSelection();
        this.managerMessage = 'Exam deleted.';
      },
      error: () => {
        this.managerMessage = 'Could not delete exam.';
      },
    });
  }

  addSection() {
    if (!this.selectedManageExam) return;
    const section: ExamSection = { id: this.makeId('section'), title: `Section ${this.selectedManageExam.sections.length + 1}`, summary: '', questions: [] };
    this.selectedManageExam.sections = [...this.selectedManageExam.sections, section];
    this.selectedManageSectionId = section.id;
    this.updateManageCounts(this.selectedManageExam);
  }

  deleteSection(section: ExamSection) {
    const exam = this.selectedManageExam;
    if (!exam) return;
    this.requestConfirmation({
      title: 'Delete section',
      message: `Delete "${section.title}" and all questions inside it?`,
      actionLabel: 'Delete Section',
      onConfirm: () => {
        exam.sections = exam.sections.filter((item) => item.id !== section.id);
        this.updateManageCounts(exam);
        this.syncManageSelection();
      },
    });
  }

  addQuestion() {
    const section = this.selectedManageSection;
    if (!section) return;
    const question: ExamQuestion = {
      id: this.makeId('q'),
      type: 'blank',
      prompt: 'New question',
      options: [],
      answer: null,
    };
    section.questions = [...section.questions, question];
    this.selectedManageQuestionId = question.id;
    if (this.selectedManageExam) this.updateManageCounts(this.selectedManageExam);
  }

  deleteQuestion(question: ExamQuestion) {
    const section = this.selectedManageSection;
    if (!section) return;
    this.requestConfirmation({
      title: 'Delete question',
      message: `Delete "${this.shortText(question.prompt)}"?`,
      actionLabel: 'Delete Question',
      onConfirm: () => {
        section.questions = section.questions.filter((item) => item.id !== question.id);
        if (this.selectedManageExam) this.updateManageCounts(this.selectedManageExam);
        this.syncManageSelection();
      },
    });
  }

  updateQuestionType(question: ExamQuestion, type: ExamQuestionType) {
    question.type = type;
    if (type === 'blank') {
      question.options = [];
      question.answer = null;
      return;
    }
    if (!question.options?.length) {
      question.options = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ];
    }
    question.answer = type === 'multi_select' ? [] : '';
  }

  addOption(question: ExamQuestion) {
    const next = String.fromCharCode(97 + (question.options?.length ?? 0));
    question.options = [...(question.options ?? []), { value: next, label: `Option ${next.toUpperCase()}` }];
  }

  deleteOption(question: ExamQuestion, option: ExamOption) {
    this.requestConfirmation({
      title: 'Delete option',
      message: `Delete option "${option.label}"?`,
      actionLabel: 'Delete Option',
      onConfirm: () => {
        question.options = (question.options ?? []).filter((item) => item.value !== option.value);
      },
    });
  }

  cancelConfirmation() {
    this.pendingConfirm = null;
  }

  confirmPendingAction() {
    const action = this.pendingConfirm?.onConfirm;
    this.pendingConfirm = null;
    action?.();
  }

  onDocxSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    if (!files.length) return;
    this.saving = true;
    this.examService.importDocx(files).pipe(takeUntil(this.destroy$)).subscribe({
      next: (created) => {
        this.managedExams = [...created, ...this.managedExams];
        this.selectedManageExam = created[0] ?? this.selectedManageExam;
        this.syncManageSelection();
        this.saving = false;
        this.managerMessage = `${created.length} exam${created.length === 1 ? '' : 's'} imported as draft.`;
      },
      error: () => {
        this.saving = false;
        this.managerMessage = 'Could not import DOCX questions.';
      },
    });
  }

  private async loadExamsWithFetchFallback() {
    try {
      const response = await fetch(`${environment.apiUrl}/exams/available?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${this.auth.getToken() ?? ''}`,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
        cache: 'no-store',
      });
      const exams = response.ok ? await response.json() : [];
      this.availableExams = Array.isArray(exams) ? exams : [];
      this.loading = false;
      this.error = this.availableExams.length ? '' : 'No online assessments are available yet.';
    } catch {
      this.loading = false;
      this.error = 'Could not load online assessments.';
    }
    this.cdr.detectChanges();
  }

  openExam(exam: AvailableExam) {
    this.loading = true;
    this.error = '';
    this.examService.getExam(exam.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (detail) => {
        this.selectedExam = detail;
        this.selectedSection = null;
        this.currentQuestionIndex.set(0);
        this.mode.set('section');
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Could not open this assessment.';
      },
    });
  }

  startSection(section: ExamSection) {
    if (!this.selectedExam) return;
    this.selectedSection = section;
    this.currentQuestionIndex.set(0);
    this.answers = {};
    this.submissionResult = null;
    this.remainingSeconds = this.selectedExam.durationMinutes * 60;
    this.mode.set('exam');
    this.startTimer();
  }

  backToSections() {
    this.stopTimer();
    this.mode.set(this.selectedExam ? 'section' : 'list');
  }

  nextQuestion() {
    if (!this.isLastQuestion) this.currentQuestionIndex.update((index) => index + 1);
  }

  prevQuestion() {
    if (!this.isFirstQuestion) this.currentQuestionIndex.update((index) => index - 1);
  }

  toggleMulti(question: ExamQuestion, value: string, checked: boolean) {
    const current = Array.isArray(this.answers[question.id]) ? this.answers[question.id] as string[] : [];
    this.answers[question.id] = checked ? [...current, value] : current.filter((item) => item !== value);
  }

  isMultiChecked(question: ExamQuestion, value: string): boolean {
    const current = this.answers[question.id];
    return Array.isArray(current) && current.includes(value);
  }

  submitAssessment(autoSubmitted = false) {
    if (!this.selectedExam || !this.selectedSection) return;
    this.stopTimer();
    const payload: ExamAnswer[] = this.selectedSection.questions.map((question) => ({
      questionId: question.id,
      value: this.answers[question.id] ?? '',
    }));
    this.examService.submitExam(this.selectedExam.id, payload, autoSubmitted).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result) => {
        this.submissionResult = result;
        this.mode.set('submitted');
      },
      error: () => {
        this.error = 'Could not submit assessment. Please try again.';
        this.startTimer();
      },
    });
  }

  private startTimer() {
    this.stopTimer();
    this.timerId = setInterval(() => {
      this.remainingSeconds = Math.max(0, this.remainingSeconds - 1);
      if (this.remainingSeconds === 0) this.submitAssessment(true);
      this.cdr.detectChanges();
    }, 1000);
  }

  private stopTimer() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
  }

  private updateGlobalHeader() {
    this.headerService.updateTitle('Online Assessment');
    this.headerService.updateBreadcrumbs([
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
      { label: 'Exams' },
      { label: 'Online Assessment', command: this.manageMode ? () => this.closeManage() : undefined },
      ...(this.manageMode ? [{ label: 'Manage Online Exams' }] : []),
    ]);
  }

  syncManageSelection() {
    const exam = this.selectedManageExam;
    if (!exam) {
      this.selectedManageSectionId = '';
      this.selectedManageQuestionId = '';
      return;
    }
    const section = exam.sections.find((item) => item.id === this.selectedManageSectionId) ?? exam.sections[0] ?? null;
    this.selectedManageSectionId = section?.id ?? '';
    const question = section?.questions.find((item) => item.id === this.selectedManageQuestionId) ?? section?.questions[0] ?? null;
    this.selectedManageQuestionId = question?.id ?? '';
  }

  private requestConfirmation(confirmState: PendingConfirm) {
    this.pendingConfirm = confirmState;
  }

  private isLocalExam(exam: ExamDetail): boolean {
    return exam.id.startsWith('draft-exam-');
  }

  private shortText(value: string): string {
    const text = String(value ?? '').trim() || 'this question';
    return text.length > 80 ? `${text.slice(0, 77)}...` : text;
  }

  private updateManageCounts(exam: ExamDetail) {
    exam.sectionCount = exam.sections.length;
    exam.questionCount = exam.sections.reduce((total, section) => total + section.questions.length, 0);
  }

  private makeId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }
}
