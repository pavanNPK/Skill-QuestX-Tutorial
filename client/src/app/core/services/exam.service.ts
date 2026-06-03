// use of this file is:
// Core service file. It provides app-wide API/state helpers shared by multiple features.
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  answer?: string | string[] | null;
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
  status?: 'draft' | 'published';
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
    // use of this is:
    // Loads student-visible exams with cache-busting headers/params.
    return this.http.get<AvailableExam[]>(`${this.apiUrl}/exams/available`, {
      headers: this.noCacheHeaders,
      params: { t: Date.now() },
    }).pipe(timeout(12000));
  }

  getExam(examId: string): Observable<ExamDetail> {
    // use of this is:
    // Loads one exam detail for assessment taking.
    return this.http.get<ExamDetail>(`${this.apiUrl}/exams/${examId}`, {
      headers: this.noCacheHeaders,
      params: { t: Date.now() },
    }).pipe(timeout(12000));
  }

  submitExam(examId: string, answers: ExamAnswer[], autoSubmitted = false): Observable<ExamSubmissionResult> {
    // use of this is:
    // Sends answers to backend and receives submission summary.
    return this.http.post<ExamSubmissionResult>(`${this.apiUrl}/exams/${examId}/submit`, {
      answers,
      autoSubmitted,
    }).pipe(timeout(12000));
  }

  getManagedExams(): Observable<ExamDetail[]> {
    // use of this is:
    // Loads manager exam list; falls back for compatibility with older endpoint path.
    return this.http.get<ExamDetail[]>(`${this.apiUrl}/exams/manage/all`, {
      headers: this.noCacheHeaders,
      params: { t: Date.now() },
    }).pipe(
      timeout(12000),
      catchError(() => this.http.get<ExamDetail[]>(`${this.apiUrl}/exams/manage`, {
        headers: this.noCacheHeaders,
        params: { t: Date.now() },
      }).pipe(timeout(12000))),
    );
  }

  createExam(payload: Partial<ExamDetail>): Observable<ExamDetail> {
    // use of this is:
    // Creates a new exam draft/published item from manager UI.
    return this.http.post<ExamDetail>(`${this.apiUrl}/exams/manage`, payload).pipe(timeout(12000));
  }

  updateExam(examId: string, payload: Partial<ExamDetail>): Observable<ExamDetail> {
    // use of this is:
    // Updates one managed exam by id.
    return this.http.put<ExamDetail>(`${this.apiUrl}/exams/manage/${examId}`, payload).pipe(timeout(12000));
  }

  deleteExam(examId: string): Observable<{ id: string; deleted: boolean }> {
    // use of this is:
    // Deletes one managed exam by id.
    return this.http.delete<{ id: string; deleted: boolean }>(`${this.apiUrl}/exams/manage/${examId}`).pipe(timeout(12000));
  }

  importWorkbook(file: File): Observable<ExamDetail[]> {
    // use of this is:
    // Uploads XLSX exam workbook and returns imported exam records.
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ExamDetail[]>(`${this.apiUrl}/exams/manage/import-xlsx`, formData).pipe(timeout(30000));
  }
}
