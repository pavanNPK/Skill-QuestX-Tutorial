import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  AvailableExam,
  ExamAnswer,
  ExamDetail,
  ExamQuestion,
  ExamSection,
  ExamService,
  ExamSubmissionResult,
} from '../../core/services/exam.service';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

type ExamMode = 'list' | 'section' | 'exam' | 'submitted';

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

  private timerId: ReturnType<typeof setInterval> | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private examService: ExamService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadExams();
  }

  ngOnDestroy() {
    this.stopTimer();
    this.destroy$.next();
    this.destroy$.complete();
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
    }, 1000);
  }

  private stopTimer() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
  }
}
