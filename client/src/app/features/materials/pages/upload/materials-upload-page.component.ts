import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize, map, of, switchMap } from 'rxjs';
import { ContentBlock, ContentLesson, ContentModule, CourseContent, CourseContentService } from '../../../../core/services/course-content.service';
import { HeaderService } from '../../../../core/services/header.service';
import { MaterialDraftService } from '../../../../core/services/material-draft.service';
import {
  MaterialDraft,
  MaterialFile,
  MaterialSlide,
  createMaterialId,
} from '../../domain/material-draft.model';
import { MaterialsStore } from '../../state/materials.store';
import { MaterialEditDialogComponent } from './components/material-edit-dialog.component';
import { MaterialPreviewDialogComponent } from './components/material-preview-dialog.component';
import { MaterialReviewStepComponent } from './components/material-review-step.component';
import { MaterialUploadStepComponent } from './components/material-upload-step.component';

@Component({
  selector: 'sqx-materials-upload-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    MaterialUploadStepComponent,
    MaterialReviewStepComponent,
    MaterialPreviewDialogComponent,
    MaterialEditDialogComponent,
  ],
  providers: [ConfirmationService],
  template: `
    <p-confirmDialog />
    <div class="upload-page">
      <header class="page-head">
        <div>
          <h1>Create Material</h1>
          <p>Upload PPTX/XLSX files or create slides/content manually.</p>
        </div>
        <button pButton type="button" icon="pi pi-times" label="Cancel" class="p-button-outlined" (click)="cancel()"></button>
      </header>

      <nav class="stepper" aria-label="Material upload progress">
        <button type="button" [class.active]="step() === 1" (click)="step.set(1)">
          <span>1</span>
          Upload
        </button>
        <div></div>
        <button type="button" [class.active]="step() === 2" [disabled]="!files().length" (click)="goReview()">
          <span>2</span>
          Review & Submit
        </button>
      </nav>

      @if (step() === 1) {
        <sqx-material-upload-step
          [files]="files()"
          (filesChange)="setFiles($event)"
          (preview)="openPreview($event)"
        />
      } @else {
        <sqx-material-review-step
          [files]="files()"
          [selectedFileId]="selectedFileId()"
          [validationMessage]="validationMessage()"
          [canSubmit]="canSubmit()"
          (selectFile)="selectedFileId.set($event)"
          (filesChange)="setFiles($event)"
          (preview)="openPreview($event)"
          (edit)="openEdit($event)"
          (delete)="confirmDelete($event)"
          (publishAll)="publishAllSlides()"
          (submit)="submit()"
        />
      }

      <footer class="page-actions">
        @if (step() === 1) {
          <button pButton type="button" label="Cancel" class="p-button-outlined" (click)="cancel()"></button>
          <button pButton type="button" icon="pi pi-arrow-right" iconPos="right" label="Start Review" [disabled]="!files().length" (click)="goReview()"></button>
        } @else {
          <button pButton type="button" icon="pi pi-arrow-left" label="Back" class="p-button-outlined" (click)="step.set(1)"></button>
          <button pButton type="button" icon="pi pi-send" [label]="saving() ? 'Submitting...' : 'Submit Material'" [disabled]="!canSubmit() || saving()" (click)="submit()"></button>
        }
      </footer>
    </div>

    <sqx-material-preview-dialog
      [visible]="previewVisible()"
      (visibleChange)="previewVisible.set($event)"
      [files]="files()"
      [slide]="previewSlide()"
    />

    <sqx-material-edit-dialog
      [visible]="editVisible()"
      (visibleChange)="editVisible.set($event)"
      [slide]="editSlide()"
      (saveSlide)="saveEditedSlide($event)"
    />
  `,
  styleUrl: './materials-upload-page.component.scss',
})
export class MaterialsUploadPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly headerService = inject(HeaderService);
  private readonly materialDraftService = inject(MaterialDraftService);
  private readonly contentService = inject(CourseContentService);
  private readonly materialsStore = inject(MaterialsStore);
  private uploadCourseId = '';

  readonly step = signal<1 | 2>(1);
  readonly draft = signal<MaterialDraft>({
    id: createMaterialId('draft'),
    title: 'Untitled Material',
    sourceType: 'FILE_UPLOAD',
    status: 'DRAFT',
    files: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  readonly selectedFileId = signal('');
  readonly previewVisible = signal(false);
  readonly previewSlide = signal<MaterialSlide | null>(null);
  readonly editVisible = signal(false);
  readonly editSlide = signal<MaterialSlide | null>(null);
  readonly saving = signal(false);

  readonly files = computed(() => this.draft().files);
  readonly validationMessage = computed(() => this.getValidationMessage());
  readonly canSubmit = computed(() => this.validationMessage() === 'Ready to submit.');

  ngOnInit(): void {
    this.uploadCourseId = this.route.snapshot.queryParamMap.get('course') ?? '';
    this.headerService.updateTitle('Create Material');
    this.headerService.updateBreadcrumbs([
      { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
      { label: 'Materials', url: '/materials' },
      { label: 'Upload' },
    ]);
  }

  setFiles(files: MaterialFile[]): void {
    const normalized = files.map((file, index) => ({
      ...file,
      order: index + 1,
      status: file.slides.length && file.slides.every((slide) => slide.status === 'PUBLISHED') ? 'PUBLISHED' as const : 'DRAFT' as const,
      slides: file.slides.map((slide, slideIndex) => ({ ...slide, order: slideIndex + 1 })),
    }));
    this.draft.update((draft) => ({
      ...draft,
      sourceType: normalized.some((file) => file.fileType !== 'MANUAL') ? 'FILE_UPLOAD' : 'MANUAL',
      files: normalized,
      updatedAt: new Date().toISOString(),
    }));
    if (!this.selectedFileId() || !normalized.some((file) => file.id === this.selectedFileId())) {
      this.selectedFileId.set(normalized[0]?.id ?? '');
    }
  }

  goReview(): void {
    if (!this.files().length) return;
    this.selectedFileId.set(this.selectedFileId() || this.files()[0]?.id || '');
    this.step.set(2);
  }

  openPreview(slide: MaterialSlide): void {
    this.previewSlide.set(slide);
    this.previewVisible.set(true);
  }

  openEdit(slide: MaterialSlide): void {
    this.editSlide.set(slide);
    this.editVisible.set(true);
  }

  saveEditedSlide(slide: MaterialSlide): void {
    this.setFiles(this.files().map((file) => ({
      ...file,
      slides: file.slides.map((item) => item.id === slide.id ? slide : item),
    })));
    this.messageService.add({ severity: 'success', summary: 'Slide updated', detail: 'Review data was saved.' });
  }

  publishAllSlides(): void {
    const nextFiles = this.files().map((file) => ({
      ...file,
      status: 'PUBLISHED' as const,
      slides: file.slides.map((slide) => ({ ...slide, status: 'PUBLISHED' as const })),
    }));
    this.setFiles(nextFiles);
    this.messageService.add({
      severity: 'success',
      summary: 'All slides published',
      detail: 'Every uploaded slide is marked Published for review.',
    });
  }

  confirmDelete(slide: MaterialSlide): void {
    this.confirmationService.confirm({
      header: 'Delete Slide / Content',
      message: `Delete "${slide.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => this.deleteSlide(slide.id),
    });
  }

  submit(): void {
    if (!this.canSubmit() || this.saving()) return;
    const draftToSave: MaterialDraft = {
      ...this.draft(),
      updatedAt: new Date().toISOString(),
    };
    this.saving.set(true);
    this.materialDraftService.create(draftToSave)
      .pipe(
        switchMap((createdDraft) => this.materialDraftService.submit(createdDraft.id, draftToSave)),
        switchMap((submittedDraft) => {
          if (!this.uploadCourseId) return of({ submittedDraft, savedContent: null as CourseContent | null });
          return this.contentService.getContent(this.uploadCourseId).pipe(
            switchMap((content) => this.contentService.saveChanges(this.uploadCourseId, this.mergeSubmittedFiles(content, submittedDraft.files))),
            map((savedContent) => ({ submittedDraft, savedContent })),
          );
        }),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: ({ submittedDraft, savedContent }) => {
          if (savedContent) {
            this.materialsStore.setCourseContent(savedContent);
            void this.materialsStore.loadAvailableCourses(true).catch(() => undefined);
          }
          this.draft.set(submittedDraft);
          this.messageService.add({
            severity: 'success',
            summary: 'Material submitted',
            detail: this.uploadCourseId ? 'The material was saved and added to this course.' : 'The material was saved to the database and submitted.',
          });
          this.router.navigate(['/materials']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Submit failed',
            detail: error?.error?.message || error?.message || 'Could not submit material.',
          });
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/materials']);
  }

  private deleteSlide(slideId: string): void {
    const next = this.files()
      .map((file) => ({
        ...file,
        slides: file.slides.filter((slide) => slide.id !== slideId).map((slide, index) => ({ ...slide, order: index + 1 })),
      }))
      .filter((file) => file.slides.length > 0);
    this.setFiles(next);
  }

  private getValidationMessage(): string {
    const files = this.files();
    if (!files.length) return 'Add at least one file or manual material before submitting.';
    const slides = files.flatMap((file) => file.slides);
    if (!slides.length) return 'Add at least one slide/content item before submitting.';
    if (slides.some((slide) => !slide.title.trim() || !slide.blocks.length)) return 'Every slide/content needs a title and at least one content block.';
    if (slides.some((slide) => slide.blocks.some((block) => !this.hasBlockValue(block.value)))) return 'Every content block needs content before submitting.';
    if (slides.some((slide) => slide.status === 'DRAFT')) return 'All slides/content must be published before submitting.';
    return 'Ready to submit.';
  }

  private hasBlockValue(value: unknown): boolean {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === 'object') return Object.values(value).some((item) => String(item).trim().length > 0);
    return false;
  }

  private mergeSubmittedFiles(content: CourseContent, files: MaterialFile[]): CourseContent {
    const importedModules = files.map((file, index) => this.fileToModule(file, index));
    const importedIds = new Set(importedModules.map((module) => module.id));
    return {
      ...content,
      modules: [
        ...content.modules.filter((module) => !importedIds.has(module.id)),
        ...importedModules,
      ],
    };
  }

  private fileToModule(file: MaterialFile, index: number): ContentModule {
    return {
      id: this.stableCourseId(file.id || file.sourceKey || file.fileName, `uploaded-index-${index + 1}`),
      title: file.fileName.replace(/\.(pptx|xlsx)$/i, ''),
      summary: `${file.fileType} upload`,
      lessons: file.slides
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((slide): ContentLesson => ({
          id: this.stableCourseId(slide.id, `uploaded-slide-${slide.order}`),
          title: slide.title,
          summary: slide.notes ?? '',
          durationMinutes: 0,
          blocks: slide.blocks
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((block, blockIndex) => this.materialBlockToCourseBlock(block, blockIndex)),
        })),
    };
  }

  private materialBlockToCourseBlock(block: MaterialSlide['blocks'][number], index: number): ContentBlock {
    const base: ContentBlock = {
      id: this.stableCourseId(block.id, `uploaded-block-${index + 1}`),
      type: 'paragraph',
      title: '',
      text: '',
    };
    const value = block.value;

    if (block.type === 'HEADING') return { ...base, type: 'heading', text: this.valueToText(value) };
    if (block.type === 'BULLETS' || block.type === 'NUMBERED_LIST') {
      const items = Array.isArray(value) ? value.flat().map((text) => ({ text: String(text) })).filter((item) => item.text.trim()) : [];
      return { ...base, type: 'bullet_list', items, text: '' };
    }
    if (block.type === 'TABLE') {
      const rows = Array.isArray(value) ? value.map((row) => Array.isArray(row) ? row.map(String) : [String(row)]) : [];
      return {
        ...base,
        type: 'table',
        title: 'Table',
        text: '',
        columns: rows[0] ?? ['Column 1'],
        rows: rows.slice(1),
      };
    }
    if (block.type === 'NOTES') return { ...base, type: 'assignment_note', text: this.valueToText(value) };
    if (block.type === 'LINK' && value && typeof value === 'object' && !Array.isArray(value)) {
      const link = value as { label?: string; url?: string };
      return { ...base, type: 'link', title: link.label ?? 'Link', text: link.label ?? link.url ?? '', url: link.url ?? '' };
    }
    if (block.type === 'MEDIA' && value && typeof value === 'object' && !Array.isArray(value)) {
      const media = value as { name?: string; url?: string };
      return { ...base, type: 'document', title: media.name ?? 'Media', text: media.name ?? media.url ?? '', url: media.url ?? '' };
    }
    return { ...base, type: block.type === 'QUOTE' ? 'assignment_note' : 'paragraph', text: this.valueToText(value) };
  }

  private valueToText(value: unknown): string {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.flat().join('\n');
    if (value && typeof value === 'object') return Object.values(value).join('\n');
    return '';
  }

  private stableCourseId(value: string | undefined, fallback: string): string {
    const raw = value?.trim() || fallback;
    return raw.toLowerCase().normalize('NFKC').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || fallback;
  }
}
