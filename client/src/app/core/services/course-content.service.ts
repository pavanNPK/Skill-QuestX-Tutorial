import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export type ContentBlockType =
  | 'heading'
  | 'paragraph'
  | 'bullet_list'
  | 'nested_bullet_list'
  | 'image'
  | 'document'
  | 'video'
  | 'link'
  | 'assignment_note'
  | 'table';

export interface NestedBulletItem {
  text: string;
  children?: NestedBulletItem[];
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title?: string;
  text?: string;
  url?: string;
  assetId?: string;
  items?: NestedBulletItem[];
  columns?: string[];
  rows?: string[][];
}

export interface ContentLesson {
  id: string;
  title: string;
  summary?: string;
  durationMinutes?: number;
  blocks: ContentBlock[];
}

export interface ContentModule {
  id: string;
  title: string;
  summary?: string;
  lessons: ContentLesson[];
}

export interface CourseContent {
  courseId: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'unpublished';
  mode: 'draft' | 'published';
  canManage: boolean;
  publishedAt?: string | null;
  updatedAt?: string | null;
  modules: ContentModule[];
}

export interface AvailableCourseContent {
  id: string;
  name: string;
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  accentColor: string;
  status: 'draft' | 'published' | 'unpublished';
  canManage: boolean;
  moduleCount: number;
  lessonCount: number;
}

export interface ContentAsset {
  id: string;
  courseId: string;
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  type: 'pdf' | 'ppt' | 'doc' | 'image' | 'video' | 'other';
}

@Injectable({ providedIn: 'root' })
export class CourseContentService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly debugLogs = !environment.production && globalThis.localStorage?.getItem('debugCourseContentApi') === 'true';

  getAvailableCourses(): Observable<AvailableCourseContent[]> {
    const url = `${this.apiUrl}/courses/content/available`;
    this.logRequest('GET', url);
    return this.http.get<AvailableCourseContent[]>(url).pipe(
      tap((courses) => this.logSuccess('GET', url, { courses: courses.length })),
      catchError((error) => this.logError<AvailableCourseContent[]>('GET', url, error)),
    );
  }

  getContent(courseId: string): Observable<CourseContent> {
    const url = `${this.apiUrl}/courses/${courseId}/content`;
    this.logRequest('GET', url);
    return this.http.get<CourseContent>(url).pipe(
      tap((content) => this.logSuccess('GET', url, {
        courseId: content.courseId,
        status: content.status,
        mode: content.mode,
        modules: content.modules.length,
      })),
      catchError((error) => this.logError<CourseContent>('GET', url, error)),
    );
  }

  importContent(courseId: string, payload: unknown): Observable<CourseContent> {
    const url = `${this.apiUrl}/courses/${courseId}/content/import`;
    this.logRequest('POST', url);
    return this.http.post<CourseContent>(url, payload).pipe(
      tap((content) => this.logSuccess('POST', url, { courseId: content.courseId, status: content.status })),
      catchError((error) => this.logError<CourseContent>('POST', url, error)),
    );
  }

  importWorkbook(courseId: string, file: File): Observable<CourseContent> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}/courses/${courseId}/content/import-workbook`;
    this.logRequest('POST', url, { fileName: file.name, fileType: file.type, fileSize: file.size });
    return this.http.post<CourseContent>(url, formData).pipe(
      tap((content) => this.logSuccess('POST', url, { courseId: content.courseId, modules: content.modules.length })),
      catchError((error) => this.logError<CourseContent>('POST', url, error)),
    );
  }

  saveDraft(courseId: string, payload: unknown): Observable<CourseContent> {
    const url = `${this.apiUrl}/courses/${courseId}/content`;
    this.logRequest('PATCH', url);
    return this.http.patch<CourseContent>(url, payload).pipe(
      tap((content) => this.logSuccess('PATCH', url, { courseId: content.courseId, status: content.status })),
      catchError((error) => this.logError<CourseContent>('PATCH', url, error)),
    );
  }

  publish(courseId: string): Observable<CourseContent> {
    const url = `${this.apiUrl}/courses/${courseId}/content/publish`;
    this.logRequest('POST', url);
    return this.http.post<CourseContent>(url, {}).pipe(
      tap((content) => this.logSuccess('POST', url, { courseId: content.courseId, status: content.status })),
      catchError((error) => this.logError<CourseContent>('POST', url, error)),
    );
  }

  unpublish(courseId: string): Observable<CourseContent> {
    const url = `${this.apiUrl}/courses/${courseId}/content/unpublish`;
    this.logRequest('POST', url);
    return this.http.post<CourseContent>(url, {}).pipe(
      tap((content) => this.logSuccess('POST', url, { courseId: content.courseId, status: content.status })),
      catchError((error) => this.logError<CourseContent>('POST', url, error)),
    );
  }

  uploadAsset(courseId: string, file: File): Observable<ContentAsset> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}/courses/${courseId}/content/assets`;
    this.logRequest('POST', url, { fileName: file.name, fileType: file.type, fileSize: file.size });
    return this.http.post<ContentAsset>(url, formData).pipe(
      tap((asset) => this.logSuccess('POST', url, { assetId: asset.id, assetUrl: asset.url })),
      catchError((error) => this.logError<ContentAsset>('POST', url, error)),
    );
  }

  absoluteAssetUrl(url?: string): string {
    if (!url) return '';
    if (/^https?:\/\//.test(url)) return url;
    return `${this.apiUrl.replace(/\/api$/, '')}${url}`;
  }

  private logRequest(method: string, url: string, details?: unknown): void {
    if (!this.debugLogs) return;
    console.info('[CourseContent API] Request', { method, url, details });
  }

  private logSuccess(method: string, url: string, details?: unknown): void {
    if (!this.debugLogs) return;
    console.info('[CourseContent API] Success', { method, url, details });
  }

  private logError<T>(method: string, url: string, error: unknown): Observable<T> {
    if (this.debugLogs) console.error('[CourseContent API] Error', { method, url, error });
    return throwError(() => error);
  }
}
