import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MaterialFile, MaterialItemStatus, MaterialSlide } from '../../../domain/material-draft.model';

@Component({
  selector: 'sqx-material-review-step',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, TableModule, TagModule],
  template: `
    <div class="review-layout">
      <aside class="review-left">
        <div class="panel-heading">
          <h3>Materials</h3>
          <span>{{ files.length }} source{{ files.length === 1 ? '' : 's' }}</span>
        </div>
        @for (file of orderedFiles; track file.id) {
          <button type="button" class="source-item" [class.active]="file.id === selectedFileId" (click)="selectFile.emit(file.id)">
            <span>{{ file.order }}</span>
            <strong>{{ file.fileName }}</strong>
            <small>{{ file.slides.length }} slides/content</small>
          </button>
        }
      </aside>

      <section class="review-right">
        <div class="review-toolbar">
          <div>
            <h3>{{ selectedFile?.fileName || 'Slides/content' }}</h3>
            <p>Mark each item Published before submitting.</p>
          </div>
          <div class="submit-status" [class.ready]="canSubmit">
            <i [class]="canSubmit ? 'pi pi-check-circle' : 'pi pi-info-circle'"></i>
            {{ validationMessage }}
          </div>
        </div>

        <p-table [value]="selectedSlides" styleClass="review-table" [tableStyle]="{ 'min-width': '760px' }">
          <ng-template pTemplate="header">
            <tr>
              <th>Order</th>
              <th>Slide title / Content title</th>
              <th>Status</th>
              <th class="actions-column">Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-slide>
            <tr>
              <td>{{ slide.order }}</td>
              <td>
                <strong>{{ slide.title }}</strong>
                <small>{{ slide.blocks.length }} block{{ slide.blocks.length === 1 ? '' : 's' }}</small>
              </td>
              <td>
                <p-select
                  [options]="statusOptions"
                  [ngModel]="slide.status"
                  optionLabel="label"
                  optionValue="value"
                  appendTo="body"
                  (ngModelChange)="setStatus(slide, $event)"
                />
              </td>
              <td>
                <div class="row-actions">
                  <button pButton type="button" icon="pi pi-eye" label="Preview" class="p-button-outlined" (click)="preview.emit(slide)"></button>
                  <button pButton type="button" icon="pi pi-pencil" label="Edit" class="p-button-outlined" (click)="edit.emit(slide)"></button>
                  <button pButton type="button" icon="pi pi-trash" class="p-button-outlined p-button-danger" (click)="delete.emit(slide)"></button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="4">No slides/content available.</td>
            </tr>
          </ng-template>
        </p-table>
      </section>
    </div>
  `,
  styles: [`
    .review-layout { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 1rem; align-items: start; }
    .review-left, .review-right { border: 1px solid #e4e1f4; border-radius: 8px; background: #fff; }
    .review-left { padding: .75rem; display: grid; gap: .55rem; }
    .panel-heading, .review-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .panel-heading h3, .review-toolbar h3 { margin: 0; color: #151936; }
    .panel-heading span, .review-toolbar p, .source-item small { margin: 0; color: #626783; }
    .source-item { display: grid; grid-template-columns: 34px 1fr; gap: .25rem .65rem; text-align: left; border: 1px solid #ebe8f8; background: #fff; border-radius: 8px; padding: .75rem; cursor: pointer; color: #343957; }
    .source-item.active { border-color: #4d3ac8; background: #f7f5ff; box-shadow: inset 0 0 0 1px #4d3ac8; }
    .source-item span { grid-row: span 2; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 999px; background: #eef0f8; color: #4b526d; font-weight: 800; }
    .source-item.active span { background: #4d3ac8; color: #fff; }
    .source-item strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .review-toolbar { padding: 1rem; border-bottom: 1px solid #eeeaf9; }
    .submit-status { display: inline-flex; align-items: center; gap: .45rem; padding: .5rem .7rem; border-radius: 6px; background: #fff8e8; color: #8a5a00; font-weight: 700; }
    .submit-status.ready { background: #edf9f1; color: #1e7d46; }
    :host ::ng-deep .review-table td small { display: block; color: #626783; margin-top: .2rem; }
    .actions-column { width: 310px; }
    .row-actions { display: flex; gap: .45rem; flex-wrap: wrap; }
    @media (max-width: 980px) { .review-layout { grid-template-columns: 1fr; } }
    @media (max-width: 640px) { .panel-heading, .review-toolbar { align-items: flex-start; flex-direction: column; } }
  `],
})
export class MaterialReviewStepComponent {
  @Input() files: MaterialFile[] = [];
  @Input() selectedFileId = '';
  @Input() validationMessage = '';
  @Input() canSubmit = false;
  @Output() selectFile = new EventEmitter<string>();
  @Output() filesChange = new EventEmitter<MaterialFile[]>();
  @Output() preview = new EventEmitter<MaterialSlide>();
  @Output() edit = new EventEmitter<MaterialSlide>();
  @Output() delete = new EventEmitter<MaterialSlide>();
  @Output() submit = new EventEmitter<void>();

  readonly statusOptions: { label: string; value: MaterialItemStatus }[] = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Published', value: 'PUBLISHED' },
  ];

  get orderedFiles(): MaterialFile[] {
    return this.files.slice().sort((a, b) => a.order - b.order);
  }

  get selectedFile(): MaterialFile | null {
    return this.files.find((file) => file.id === this.selectedFileId) ?? this.orderedFiles[0] ?? null;
  }

  get selectedSlides(): MaterialSlide[] {
    return this.selectedFile?.slides.slice().sort((a, b) => a.order - b.order) ?? [];
  }

  setStatus(slide: MaterialSlide, status: MaterialItemStatus): void {
    const next = this.files.map((file) => ({
      ...file,
      slides: file.slides.map((item) => item.id === slide.id ? { ...item, status } : item),
      status: file.slides.every((item) => item.id === slide.id ? status === 'PUBLISHED' : item.status === 'PUBLISHED') ? 'PUBLISHED' as const : 'DRAFT' as const,
    }));
    this.filesChange.emit(next);
  }
}
