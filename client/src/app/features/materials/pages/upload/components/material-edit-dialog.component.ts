import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { finalize } from 'rxjs';
import { MaterialDraftService } from '../../../../../core/services/material-draft.service';
import {
  MATERIAL_BLOCK_TYPES,
  MaterialContentBlock,
  MaterialContentBlockType,
  MaterialItemStatus,
  MaterialSlide,
  createMaterialId,
  reorderById,
} from '../../../domain/material-draft.model';

@Component({
  selector: 'sqx-material-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, InputTextModule, SelectModule, TextareaModule],
  template: `
    <p-dialog
      [visible]="visible"
      (visibleChange)="close($event)"
      [modal]="true"
      [style]="{ width: 'min(1180px, 98vw)' }"
      [breakpoints]="{ '760px': '96vw' }"
      header="Edit Slide"
    >
      @if (draft) {
        <div class="edit-shell">
          <aside class="edit-summary">
            <div class="slide-badge">{{ draft.order | number: '2.0-0' }}</div>
            <h3>{{ draft.title || 'Untitled slide' }}</h3>
            <p>{{ draft.blocks.length }} content block{{ draft.blocks.length === 1 ? '' : 's' }}</p>
            <p-select [options]="statusOptions" [(ngModel)]="draft.status" optionLabel="label" optionValue="value" />
          </aside>

          <section class="edit-main">
            <div class="edit-grid">
              <label>
                <span>Slide title</span>
                <input pInputText [(ngModel)]="draft.title" />
              </label>
              <label>
                <span>Notes</span>
                <textarea pTextarea rows="2" [(ngModel)]="draft.notes"></textarea>
              </label>
            </div>

            <div class="block-add-row">
              <button pButton type="button" icon="pi pi-align-left" label="Add text" class="p-button-outlined" (click)="newBlockType = 'PARAGRAPH'; addBlock()"></button>
              <button pButton type="button" icon="pi pi-table" label="Add table" class="p-button-outlined" (click)="newBlockType = 'TABLE'; addBlock()"></button>
              <p-select [options]="blockTypes" [(ngModel)]="newBlockType" optionLabel="label" optionValue="value" />
              <button pButton type="button" icon="pi pi-plus" label="Add block" class="p-button-outlined" (click)="addBlock()"></button>
              <label class="image-upload">
                <i class="pi pi-image"></i>
                {{ uploadingImage ? 'Uploading...' : 'Upload image' }}
                <input type="file" accept="image/*" (change)="onImageSelected($event)" />
              </label>
            </div>

            <div class="blocks-list">
              @for (block of sortedBlocks; track block.id) {
                <section
                  class="block-editor"
                  draggable="true"
                  (dragstart)="dragBlockId = block.id"
                  (dragover)="$event.preventDefault()"
                  (drop)="dropBlock(block.id)"
                >
                  <div class="block-header">
                    <i class="pi pi-bars"></i>
                    <p-select
                      [options]="blockTypes"
                      [(ngModel)]="block.type"
                      optionLabel="label"
                      optionValue="value"
                      (ngModelChange)="normalizeBlock(block)"
                    />
                    <button type="button" class="format-btn" (mousedown)="$event.preventDefault()" (click)="applyBoldToSelection()">Bold</button>
                    <button type="button" class="icon-danger" (click)="deleteBlock(block.id)" aria-label="Delete block">
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>

                  @if (block.type === 'BULLETS' || block.type === 'NUMBERED_LIST') {
                    <textarea pTextarea rows="5" [ngModel]="listText(block)" (ngModelChange)="setList(block, $event)" placeholder="One point per line. Indent nested points with spaces."></textarea>
                  } @else if (block.type === 'TABLE') {
                    <div class="table-tools">
                      <button pButton type="button" icon="pi pi-plus" label="Column" class="p-button-outlined" (click)="addTableColumn(block)"></button>
                      <button pButton type="button" icon="pi pi-plus" label="Row" class="p-button-outlined" (click)="addTableRow(block)"></button>
                    </div>
                    <div class="table-grid-wrap">
                      <table>
                        @for (row of tableValue(block); track $index; let rowIndex = $index) {
                          <tr>
                            @for (cell of row; track $index; let colIndex = $index) {
                              <td>
                                <input pInputText [ngModel]="cell" (ngModelChange)="setTableCell(block, rowIndex, colIndex, $event)" />
                                @if (rowIndex === 0) {
                                  <button type="button" class="mini-delete" (click)="deleteTableColumn(block, colIndex)" aria-label="Delete column">
                                    <i class="pi pi-times"></i>
                                  </button>
                                }
                              </td>
                            }
                            <td class="row-delete-cell">
                              <button type="button" class="mini-delete" (click)="deleteTableRow(block, rowIndex)" aria-label="Delete row">
                                <i class="pi pi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        }
                      </table>
                    </div>
                  } @else if (block.type === 'LINK') {
                    <div class="edit-grid">
                      <input pInputText placeholder="Label" [ngModel]="linkLabel(block)" (ngModelChange)="setLinkLabel(block, $event)" />
                      <input pInputText placeholder="URL" [ngModel]="linkUrl(block)" (ngModelChange)="setLinkUrl(block, $event)" />
                    </div>
                  } @else if (block.type === 'MEDIA') {
                    <input pInputText [ngModel]="mediaName(block)" (ngModelChange)="setMediaName(block, $event)" />
                  } @else {
                    <textarea pTextarea rows="5" [(ngModel)]="block.value"></textarea>
                  }
                </section>
              }
            </div>
          </section>
        </div>
      }

      <ng-template pTemplate="footer">
        <button pButton type="button" label="Cancel" class="p-button-outlined" (click)="close(false)"></button>
        <button pButton type="button" icon="pi pi-save" label="Save Changes" [disabled]="!canSave" (click)="save()"></button>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .edit-shell { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 1rem; }
    .edit-summary { align-self: start; position: sticky; top: 0; display: grid; gap: .8rem; border: 1px solid #e4e1f4; border-radius: 8px; padding: 1rem; background: linear-gradient(180deg, #f8f6ff, #fff); }
    .slide-badge { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 999px; background: #4d3ac8; color: #fff; font-weight: 900; font-size: 1.2rem; }
    .edit-summary h3 { margin: 0; color: #151936; line-height: 1.25; }
    .edit-summary p { margin: 0; color: #626783; }
    .edit-main { min-width: 0; }
    .edit-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1rem; }
    label, .full-field { display: grid; gap: .4rem; color: #343957; font-weight: 700; }
    .full-field { margin-top: 1rem; }
    input, textarea, p-select { width: 100%; }
    .block-add-row { display: flex; gap: .75rem; align-items: center; flex-wrap: wrap; margin: 1rem 0; }
    .image-upload { display: inline-flex; align-items: center; gap: .45rem; min-height: 40px; border: 1px solid #d6d2f0; border-radius: 6px; padding: 0 .9rem; cursor: pointer; color: #4d3ac8; }
    .image-upload input { display: none; }
    .blocks-list { display: grid; gap: .8rem; max-height: 58vh; overflow: auto; padding-right: .25rem; }
    .block-editor { border: 1px solid #e5e2f5; border-radius: 8px; padding: .9rem; background: #fff; box-shadow: 0 10px 28px rgba(36, 26, 90, .06); }
    .block-header { display: grid; grid-template-columns: auto minmax(180px, 1fr) auto auto; gap: .65rem; align-items: center; margin-bottom: .75rem; }
    .block-header .pi-bars { color: #7a7891; cursor: grab; }
    .icon-danger { border: 0; background: #fff2f2; color: #d43b3b; border-radius: 6px; width: 36px; height: 36px; cursor: pointer; }
    .format-btn { border: 1px solid #d6d2f0; background: #fff; color: #4d3ac8; height: 36px; border-radius: 6px; padding: 0 .75rem; font-weight: 800; cursor: pointer; }
    .table-tools { display: flex; gap: .6rem; margin-bottom: .75rem; }
    .table-grid-wrap { overflow: auto; border: 1px solid #ece8fb; border-radius: 8px; }
    .table-grid-wrap table { width: max-content; min-width: 100%; border-collapse: collapse; }
    .table-grid-wrap td { position: relative; min-width: 180px; border: 1px solid #ece8fb; padding: .45rem; background: #fff; }
    .table-grid-wrap tr:first-child td:not(.row-delete-cell) { background: #f4f1ff; font-weight: 800; }
    .table-grid-wrap input { border: 0; box-shadow: none; background: rgba(255,255,255,.72); }
    .mini-delete { position: absolute; right: .35rem; top: .35rem; display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid #ffb6b6; color: #ff3d3d; background: #fff7f7; border-radius: 6px; cursor: pointer; }
    .row-delete-cell { min-width: 44px !important; width: 44px; }
    .row-delete-cell .mini-delete { position: static; }
    @media (max-width: 860px) { .edit-shell, .edit-grid { grid-template-columns: 1fr; } .edit-summary { position: static; } }
  `],
})
export class MaterialEditDialogComponent implements OnChanges {
  private readonly materialDraftService = inject(MaterialDraftService);

  @Input() visible = false;
  @Input() slide: MaterialSlide | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveSlide = new EventEmitter<MaterialSlide>();

  draft: MaterialSlide | null = null;
  dragBlockId = '';
  uploadingImage = false;
  newBlockType: MaterialContentBlockType = 'PARAGRAPH';
  readonly blockTypes = MATERIAL_BLOCK_TYPES;
  readonly statusOptions: { label: string; value: MaterialItemStatus }[] = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Published', value: 'PUBLISHED' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if ('slide' in changes) {
      this.draft = this.slide ? structuredClone(this.slide) : null;
    }
  }

  get sortedBlocks(): MaterialContentBlock[] {
    return this.draft?.blocks.slice().sort((a, b) => a.order - b.order) ?? [];
  }

  get canSave(): boolean {
    if (!this.draft) return false;
    return this.draft.title.trim().length > 0 && this.draft.blocks.length > 0 && this.draft.blocks.every((block) => this.hasBlockValue(block));
  }

  close(open: boolean): void {
    this.visibleChange.emit(open);
  }

  save(): void {
    if (!this.draft || !this.canSave) return;
    this.saveSlide.emit({
      ...this.draft,
      title: this.draft.title.trim(),
      blocks: this.sortedBlocks.map((block, index) => ({ ...block, order: index + 1 })),
    });
    this.visibleChange.emit(false);
  }

  addBlock(): void {
    if (!this.draft) return;
    this.draft.blocks = [
      ...this.draft.blocks,
      {
        id: createMaterialId('block'),
        type: this.newBlockType,
        order: this.draft.blocks.length + 1,
        value: this.defaultValue(this.newBlockType),
      },
    ];
  }

  deleteBlock(blockId: string): void {
    if (!this.draft) return;
    this.draft.blocks = this.draft.blocks.filter((block) => block.id !== blockId).map((block, index) => ({ ...block, order: index + 1 }));
  }

  dropBlock(targetId: string): void {
    if (!this.draft || !this.dragBlockId) return;
    this.draft.blocks = reorderById(this.draft.blocks, this.dragBlockId, targetId);
    this.dragBlockId = '';
  }

  normalizeBlock(block: MaterialContentBlock): void {
    block.value = this.defaultValue(block.type);
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    input.value = '';
    if (!file || !this.draft) return;
    this.uploadingImage = true;
    this.materialDraftService.uploadImage(file)
      .pipe(finalize(() => this.uploadingImage = false))
      .subscribe({
        next: (asset) => {
          if (!this.draft) return;
          this.draft.imageUrls = [...(this.draft.imageUrls ?? []), asset.url];
          this.draft.blocks = [
            ...this.draft.blocks,
            {
              id: createMaterialId('media'),
              type: 'MEDIA',
              order: this.draft.blocks.length + 1,
              value: { name: asset.originalName, url: asset.url },
            },
          ];
        },
      });
  }

  listText(block: MaterialContentBlock): string {
    return Array.isArray(block.value) ? (block.value as string[]).join('\n') : '';
  }

  setList(block: MaterialContentBlock, value: string): void {
    block.value = value.split('\n').map((item) => item.trim()).filter(Boolean);
  }

  tableText(block: MaterialContentBlock): string {
    return Array.isArray(block.value) ? (block.value as string[][]).map((row) => row.join(' | ')).join('\n') : '';
  }

  setTable(block: MaterialContentBlock, value: string): void {
    block.value = value.split('\n').filter(Boolean).map((row) => row.split('|').map((cell) => cell.trim()));
  }

  tableValue(block: MaterialContentBlock): string[][] {
    if (!Array.isArray(block.value) || !block.value.every((row) => Array.isArray(row))) {
      block.value = [['Column 1', 'Column 2'], ['', '']];
    }
    const rows = block.value as string[][];
    const columnCount = Math.max(1, ...rows.map((row) => row.length));
    return rows.map((row) => Array.from({ length: columnCount }, (_, index) => row[index] ?? ''));
  }

  setTableCell(block: MaterialContentBlock, rowIndex: number, colIndex: number, value: string): void {
    const rows = this.tableValue(block).map((row) => [...row]);
    rows[rowIndex][colIndex] = value;
    block.value = rows;
  }

  addTableColumn(block: MaterialContentBlock): void {
    block.value = this.tableValue(block).map((row, index) => [...row, index === 0 ? `Column ${row.length + 1}` : '']);
  }

  addTableRow(block: MaterialContentBlock): void {
    const rows = this.tableValue(block);
    block.value = [...rows, rows[0].map(() => '')];
  }

  deleteTableColumn(block: MaterialContentBlock, colIndex: number): void {
    const rows = this.tableValue(block);
    if (rows[0]?.length <= 1) return;
    block.value = rows.map((row) => row.filter((_, index) => index !== colIndex));
  }

  deleteTableRow(block: MaterialContentBlock, rowIndex: number): void {
    const rows = this.tableValue(block);
    if (rows.length <= 1) return;
    block.value = rows.filter((_, index) => index !== rowIndex);
  }

  applyBoldToSelection(): void {
    document.execCommand('bold');
  }

  linkLabel(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && 'label' in block.value ? block.value.label : '';
  }

  linkUrl(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && 'url' in block.value ? block.value.url : '';
  }

  setLinkLabel(block: MaterialContentBlock, label: string): void {
    block.value = { label, url: this.linkUrl(block) };
  }

  setLinkUrl(block: MaterialContentBlock, url: string): void {
    block.value = { label: this.linkLabel(block), url };
  }

  mediaName(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && 'name' in block.value ? block.value.name : '';
  }

  setMediaName(block: MaterialContentBlock, name: string): void {
    const url = typeof block.value === 'object' && !Array.isArray(block.value) && 'url' in block.value ? block.value.url : '';
    block.value = { name, url };
  }

  private defaultValue(type: MaterialContentBlockType): MaterialContentBlock['value'] {
    if (type === 'BULLETS' || type === 'NUMBERED_LIST') return ['First point'];
    if (type === 'TABLE') return [['Column 1', 'Column 2'], ['Value 1', 'Value 2']];
    if (type === 'LINK') return { label: 'Reference', url: 'https://' };
    if (type === 'MEDIA') return { name: 'Uploaded image', url: '' };
    if (type === 'CODE') return 'const example = true;';
    return type === 'HEADING' ? 'New heading' : 'Add content here.';
  }

  private hasBlockValue(block: MaterialContentBlock): boolean {
    if (typeof block.value === 'string') return block.value.trim().length > 0;
    if (Array.isArray(block.value)) return block.value.length > 0;
    return Object.values(block.value).some((value) => String(value).trim().length > 0);
  }
}
