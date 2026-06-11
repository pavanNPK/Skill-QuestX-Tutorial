// use of this file is:
// API client for the standalone material upload/review/submit workflow.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MaterialDraft, MaterialFile } from '../../features/materials/domain/material-draft.model';

export interface MaterialDraftImageUpload {
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class MaterialDraftService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/material-drafts`;

  list(): Observable<MaterialDraft[]> {
    return this.http.get<MaterialDraft[]>(this.apiUrl);
  }

  get(id: string): Observable<MaterialDraft> {
    return this.http.get<MaterialDraft>(`${this.apiUrl}/${id}`);
  }

  create(draft: MaterialDraft): Observable<MaterialDraft> {
    return this.http.post<MaterialDraft>(this.apiUrl, draft);
  }

  update(id: string, draft: MaterialDraft): Observable<MaterialDraft> {
    return this.http.patch<MaterialDraft>(`${this.apiUrl}/${id}`, draft);
  }

  submit(id: string): Observable<MaterialDraft> {
    return this.http.post<MaterialDraft>(`${this.apiUrl}/${id}/submit`, {});
  }

  importFile(file: File): Observable<MaterialFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MaterialFile>(`${this.apiUrl}/import-file`, formData);
  }

  uploadImage(file: File): Observable<MaterialDraftImageUpload> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<MaterialDraftImageUpload>(`${this.apiUrl}/images`, formData);
  }
}
