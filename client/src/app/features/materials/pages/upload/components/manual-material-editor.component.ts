import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import {
  MaterialFile,
  createMaterialId,
} from '../../../domain/material-draft.model';

@Component({
  selector: 'sqx-manual-material-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule],
  template: `
    <section class="manual-box">
      <div>
        <h3>Create Manually</h3>
        <p>Add a manual material with one editable slide/content item. More blocks can be added in review edit.</p>
      </div>
      <div class="manual-fields">
        <input pInputText [(ngModel)]="title" placeholder="Material title" />
        <input pInputText [(ngModel)]="slideTitle" placeholder="Slide/content title" />
        <textarea pTextarea rows="3" [(ngModel)]="body" placeholder="Starter paragraph"></textarea>
      </div>
      <button pButton type="button" icon="pi pi-plus" label="Create Manually" [disabled]="!canCreate" (click)="create()"></button>
    </section>
  `,
  styles: [`
    .manual-box { display: grid; gap: .9rem; border: 1px solid #e4e1f4; border-radius: 8px; padding: 1rem; background: #fff; }
    h3 { margin: 0 0 .25rem; color: #151936; }
    p { margin: 0; color: #626783; }
    .manual-fields { display: grid; gap: .7rem; }
  `],
})
export class ManualMaterialEditorComponent {
  @Output() createMaterial = new EventEmitter<MaterialFile>();

  title = '';
  slideTitle = '';
  body = '';

  get canCreate(): boolean {
    return this.title.trim().length > 0 && this.slideTitle.trim().length > 0 && this.body.trim().length > 0;
  }

  create(): void {
    if (!this.canCreate) return;
    const file: MaterialFile = {
      id: createMaterialId('manual'),
      fileName: this.title.trim(),
      fileType: 'MANUAL',
      order: 1,
      status: 'DRAFT',
      slides: [
        {
          id: createMaterialId('slide'),
          title: this.slideTitle.trim(),
          order: 1,
          status: 'DRAFT',
          blocks: [
            {
              id: createMaterialId('block'),
              type: 'PARAGRAPH',
              order: 1,
              value: this.body.trim(),
            },
          ],
        },
      ],
    };
    this.createMaterial.emit(file);
    this.title = '';
    this.slideTitle = '';
    this.body = '';
  }
}
