import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export type ExamQuestionType = 'blank' | 'single_select' | 'multi_select';

export interface ExamOption {
  value: string;
  label: string;
}

export interface ExamQuestion {
  id: string;
  type: ExamQuestionType;
  prompt: string;
  options: ExamOption[];
}

export interface ExamSection {
  id: string;
  title: string;
  summary: string;
  questions: ExamQuestion[];
}

export interface AvailableExam {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  sectionCount: number;
  questionCount: number;
}

export interface ExamDetail extends AvailableExam {
  sections: ExamSection[];
}

export interface ExamAnswer {
  questionId: string;
  value: string | string[];
}

export interface ExamSubmissionResult {
  id: string;
  examId: string;
  submittedAt: string;
  autoSubmitted: boolean;
  answeredCount: number;
  questionCount: number;
}

@Injectable({ providedIn: 'root' })
export class ExamService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  getAvailableExams(): Observable<AvailableExam[]> {
    return this.http.get<AvailableExam[]>(`${this.apiUrl}/exams/available`, {
      headers: this.noCacheHeaders,
      params: { t: Date.now() },
    }).pipe(timeout(12000));
  }

  getExam(examId: string): Observable<ExamDetail> {
    return this.http.get<ExamDetail>(`${this.apiUrl}/exams/${examId}`, {
      headers: this.noCacheHeaders,
      params: { t: Date.now() },
    }).pipe(timeout(12000));
  }

  submitExam(examId: string, answers: ExamAnswer[], autoSubmitted = false): Observable<ExamSubmissionResult> {
    return this.http.post<ExamSubmissionResult>(`${this.apiUrl}/exams/${examId}/submit`, {
      answers,
      autoSubmitted,
    }).pipe(timeout(12000));
  }
}
