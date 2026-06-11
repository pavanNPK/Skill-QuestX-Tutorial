import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';
import { MaterialDraftService } from '../../../../../core/services/material-draft.service';
import {
  MaterialFile,
  MaterialSlide,
  reorderById,
} from '../../../domain/material-draft.model';
import { ManualMaterialEditorComponent } from './manual-material-editor.component';

@Component({
  selector: 'sqx-material-upload-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, ManualMaterialEditorComponent],
  template: `
    <div class="upload-layout">
      <section class="upload-main">
        <div
          class="drop-zone"
          [class.is-uploading]="uploading"
          (dragover)="$event.preventDefault()"
          (drop)="onDrop($event)"
        >
          <i class="pi pi-cloud-upload"></i>
          <h3>Drag and drop PPTX or XLSX files here</h3>
          <p>Images are not extracted automatically. Upload images manually while editing each slide/content item.</p>
          <input #fileInput type="file" hidden multiple accept=".pptx,.xlsx" (change)="onFilesSelected($event)" />
          <button pButton type="button" icon="pi pi-upload" [label]="uploading ? 'Uploading...' : 'Choose files'" [disabled]="uploading" (click)="fileInput.click()"></button>
        </div>

        @if (errorMessage) {
          <div class="validation-message">{{ errorMessage }}</div>
        }

        <div class="file-list">
          <div class="list-title">
            <strong>{{ files.length }} material source{{ files.length === 1 ? '' : 's' }}</strong>
            <span>{{ totalSlides }} slides/content items</span>
          </div>
          @for (file of orderedFiles; track file.id) {
            <article
              class="file-card"
              draggable="true"
              (dragstart)="dragFileId = file.id"
              (dragover)="$event.preventDefault()"
              (drop)="dropFile(file.id)"
            >
              <div class="file-row">
                <i class="pi pi-bars drag-icon"></i>
                <i [class]="file.fileType === 'XLSX' ? 'pi pi-file-excel file-type' : file.fileType === 'PPTX' ? 'pi pi-file file-type' : 'pi pi-pencil file-type'"></i>
                <div>
                  <strong>{{ file.fileName }}</strong>
                  <span>{{ file.fileType }} · {{ file.slides.length }} slides/sheets extracted</span>
                </div>
                <p-tag [value]="file.status" [severity]="file.status === 'PUBLISHED' ? 'success' : 'warn'" />
                <button pButton type="button" icon="pi pi-eye" label="Preview" class="p-button-text" (click)="preview.emit(file.slides[0])"></button>
                <button pButton type="button" icon="pi pi-trash" class="p-button-text p-button-danger" aria-label="Remove" (click)="removeFile(file.id)"></button>
              </div>
              <div class="slide-strip">
                @for (slide of orderedSlides(file); track slide.id) {
                  <button
                    type="button"
                    class="slide-chip"
                    draggable="true"
                    (dragstart)="dragSlideId = slide.id"
                    (dragover)="$event.preventDefault()"
                    (drop)="dropSlide(file.id, slide.id)"
                  >
                    <i class="pi pi-bars"></i>
                    {{ slide.order }}. {{ slide.title }}
                  </button>
                }
              </div>
            </article>
          } @empty {
            <div class="empty-state">No files added yet.</div>
          }
        </div>
      </section>

      <aside class="upload-side">
        <sqx-manual-material-editor (createMaterial)="addManualMaterial($event)" />
        <section class="settings-box">
          <h3>Upload Settings</h3>
          <div class="setting-row">
            <i class="pi pi-check-circle"></i>
            <span>Create one material source per uploaded file.</span>
          </div>
          <div class="setting-row">
            <i class="pi pi-align-left"></i>
            <span>Extract slide/sheet names and text placeholders only.</span>
          </div>
          <div class="setting-row">
            <i class="pi pi-image"></i>
            <span>Skip images until manual slide-wise upload.</span>
          </div>
        </section>
      </aside>
    </div>
  `,
  styles: [`
    .upload-layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 1rem; align-items: start; }
    .upload-main, .upload-side { display: grid; gap: 1rem; }
    .drop-zone { min-height: 210px; display: grid; place-items: center; text-align: center; gap: .45rem; border: 1.5px dashed #7669d8; border-radius: 8px; background: #fbfaff; padding: 1.2rem; }
    .drop-zone.is-uploading { opacity: .72; cursor: progress; }
    .drop-zone .pi-cloud-upload { font-size: 2.2rem; color: #4d3ac8; }
    h3 { margin: 0; color: #151936; }
    p { margin: 0; color: #626783; }
    .validation-message { border: 1px solid #ffd1d1; background: #fff4f4; color: #b42323; border-radius: 6px; padding: .75rem; }
    .file-list, .settings-box { border: 1px solid #e4e1f4; border-radius: 8px; background: #fff; }
    .list-title { display: flex; justify-content: space-between; gap: 1rem; padding: .85rem 1rem; border-bottom: 1px solid #eeeaf9; color: #343957; }
    .file-card { border-bottom: 1px solid #eeeaf9; padding: .8rem 1rem; }
    .file-card:last-child { border-bottom: 0; }
    .file-row { display: grid; grid-template-columns: auto auto minmax(0, 1fr) auto auto auto; gap: .7rem; align-items: center; }
    .file-row strong, .file-row span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .file-row span { color: #626783; font-size: .86rem; margin-top: .15rem; }
    .drag-icon, .slide-chip .pi-bars { color: #7a7891; cursor: grab; }
    .file-type { color: #4d3ac8; font-size: 1.1rem; }
    .slide-strip { display: flex; flex-wrap: wrap; gap: .45rem; margin-top: .75rem; padding-left: 3.1rem; }
    .slide-chip { display: inline-flex; align-items: center; gap: .35rem; border: 1px solid #dedaf2; background: #faf9ff; color: #343957; border-radius: 6px; padding: .35rem .55rem; cursor: grab; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .empty-state { padding: 1rem; color: #626783; }
    .settings-box { display: grid; gap: .8rem; padding: 1rem; }
    .setting-row { display: grid; grid-template-columns: 24px 1fr; gap: .6rem; color: #343957; }
    .setting-row i { color: #4d3ac8; }
    @media (max-width: 980px) { .upload-layout { grid-template-columns: 1fr; } }
    @media (max-width: 640px) { .file-row { grid-template-columns: auto auto minmax(0, 1fr) auto; } .file-row p-tag { grid-column: 3 / 4; } .slide-strip { padding-left: 0; } }
  `],
})
export class MaterialUploadStepComponent {
  private readonly materialDraftService = inject(MaterialDraftService);

  @Input() files: MaterialFile[] = [];
  @Output() filesChange = new EventEmitter<MaterialFile[]>();
  @Output() preview = new EventEmitter<MaterialSlide>();

  errorMessage = '';
  uploading = false;
  dragFileId = '';
  dragSlideId = '';
  private readonly pendingUploadKeys = new Set<string>();

  get orderedFiles(): MaterialFile[] {
    return this.files.slice().sort((a, b) => a.order - b.order);
  }

  get totalSlides(): number {
    return this.files.reduce((total, file) => total + file.slides.length, 0);
  }

  orderedSlides(file: MaterialFile): MaterialSlide[] {
    return file.slides.slice().sort((a, b) => a.order - b.order);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.uploading) {
      this.errorMessage = 'Please wait for the current import to finish before adding more files.';
      return;
    }
    this.addFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.uploading) {
      this.errorMessage = 'Please wait for the current import to finish before adding more files.';
      input.value = '';
      return;
    }
    this.addFiles(Array.from(input.files ?? []));
    input.value = '';
  }

  addManualMaterial(file: MaterialFile): void {
    this.emitFiles([...this.files, { ...file, order: this.files.length + 1 }]);
  }

  removeFile(fileId: string): void {
    this.emitFiles(this.files.filter((file) => file.id !== fileId).map((file, index) => ({ ...file, order: index + 1 })));
  }

  dropFile(targetId: string): void {
    if (!this.dragFileId) return;
    this.emitFiles(reorderById(this.files, this.dragFileId, targetId));
    this.dragFileId = '';
  }

  dropSlide(fileId: string, targetSlideId: string): void {
    if (!this.dragSlideId) return;
    this.emitFiles(this.files.map((file) => file.id === fileId ? { ...file, slides: reorderById(file.slides, this.dragSlideId, targetSlideId) } : file));
    this.dragSlideId = '';
  }

  private addFiles(files: File[]): void {
    this.errorMessage = '';
    const existingKeys = new Set<string>();
    this.files.forEach((file) => {
      existingKeys.add(this.normalizeFileName(file.fileName));
      if (file.sourceKey) existingKeys.add(file.sourceKey);
    });
    this.pendingUploadKeys.forEach((key) => existingKeys.add(key));
    const seenKeys = new Set<string>();
    const duplicateFiles: string[] = [];
    const uploadFiles = files.filter((file) => {
      if (!/\.(pptx|xlsx)$/i.test(file.name)) return false;
      const key = this.fileKey(file);
      const nameKey = this.normalizeFileName(file.name);
      if (existingKeys.has(key) || existingKeys.has(nameKey) || seenKeys.has(key) || seenKeys.has(nameKey)) {
        duplicateFiles.push(file.name);
        return false;
      }
      seenKeys.add(key);
      seenKeys.add(nameKey);
      return true;
    });
    const rejected = files.filter((file) => !/\.(pptx|xlsx)$/i.test(file.name)).map((file) => file.name);
    const messages: string[] = [];
    if (rejected.length) messages.push(`Unsupported files skipped: ${rejected.join(', ')}`);
    if (duplicateFiles.length) messages.push(`Duplicate files skipped: ${duplicateFiles.join(', ')}`);
    this.errorMessage = messages.join(' ');
    if (!uploadFiles.length) return;

    this.uploading = true;
    let completed = 0;
    const imported: MaterialFile[] = [];
    uploadFiles.forEach((file) => {
      this.pendingUploadKeys.add(this.fileKey(file));
      this.pendingUploadKeys.add(this.normalizeFileName(file.name));
    });
    uploadFiles.forEach((file) => {
      this.materialDraftService.importFile(file)
        .pipe(finalize(() => {
          completed++;
          this.pendingUploadKeys.delete(this.fileKey(file));
          this.pendingUploadKeys.delete(this.normalizeFileName(file.name));
          if (completed === uploadFiles.length) {
            this.uploading = false;
            const nextFiles = this.dedupeFiles([...this.files, ...imported]);
            if (nextFiles.length !== this.files.length) this.emitFiles(nextFiles);
          }
        }))
        .subscribe({
          next: (materialFile) => {
            imported.push({
              ...materialFile,
              sourceKey: this.fileKey(file),
              order: this.files.length + imported.length + 1,
            });
          },
          error: (error) => {
            const message = error?.error?.message || error?.message || `Could not import ${file.name}.`;
            this.errorMessage = this.errorMessage ? `${this.errorMessage} ${message}` : message;
          },
        });
    });
  }

  private emitFiles(files: MaterialFile[]): void {
    this.filesChange.emit(files.map((file, index) => ({ ...file, order: index + 1 })));
  }

  private dedupeFiles(files: MaterialFile[]): MaterialFile[] {
    const seen = new Set<string>();
    return files.filter((file) => {
      const keys = [file.sourceKey, this.normalizeFileName(file.fileName)].filter(Boolean) as string[];
      if (keys.some((key) => seen.has(key))) return false;
      keys.forEach((key) => seen.add(key));
      return true;
    });
  }

  private fileKey(file: File): string {
    return `${this.normalizeFileName(file.name)}-${file.size}`;
  }

  private normalizeFileName(fileName: string): string {
    return fileName.trim().toLowerCase().normalize('NFKC');
  }
}
