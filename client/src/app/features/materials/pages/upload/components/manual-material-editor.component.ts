import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import {
  MATERIAL_BLOCK_TYPES,
  MaterialContentBlock,
  MaterialContentBlockType,
  MaterialFile,
  MaterialSlide,
  createMaterialId,
} from '../../../domain/material-draft.model';

interface ManualIndexDraft {
  id: string;
  title: string;
  slides: ManualSlideDraft[];
}

interface ManualSlideDraft {
  id: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED';
  blocks: MaterialContentBlock[];
}

@Component({
  selector: 'sqx-manual-material-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DrawerModule, InputTextModule, SelectModule, TextareaModule],
  template: `
    <section class="manual-box">
      <div class="manual-intro">
        <h3>Create Manually</h3>
        <p>Add multiple indexes and slides, then review, preview, edit, and publish them before submitting.</p>
      </div>
      <div class="manual-tips">
        <div>
          <i class="pi pi-folder"></i>
          <span>Create one or more indexes/material sources.</span>
        </div>
        <div>
          <i class="pi pi-clone"></i>
          <span>Add slides under each index.</span>
        </div>
        <div>
          <i class="pi pi-th-large"></i>
          <span>Use text, lists, tables, media, links, notes, code, and quotes.</span>
        </div>
      </div>
      <button pButton type="button" icon="pi pi-plus" label="Create Manually" (click)="openDrawer()"></button>
    </section>

    <p-drawer
      [(visible)]="drawerVisible"
      position="right"
      styleClass="manual-material-drawer"
      [modal]="true"
      [showCloseIcon]="false"
    >
      <ng-template pTemplate="header">
        <div class="drawer-head">
          <h3>Create Manual Material</h3>
          <button type="button" class="drawer-close" aria-label="Close" (click)="drawerVisible = false">
            <i class="pi pi-times"></i>
          </button>
        </div>
      </ng-template>

      <div class="drawer-body">
        <section class="index-panel">
          <div class="panel-title">
            <strong>Indexes</strong>
            <button type="button" class="text-action" (click)="addIndex()">
              <i class="pi pi-plus"></i>
              Add
            </button>
          </div>

          <div class="index-list">
            @for (index of indexes; track index.id; let i = $index) {
              <button type="button" class="index-pill" [class.active]="index.id === selectedIndexId" (click)="selectIndex(index.id)">
                <span>{{ i + 1 }}</span>
                <strong>{{ index.title.trim() || 'Untitled index' }}</strong>
                <small>{{ index.slides.length }} slide{{ index.slides.length === 1 ? '' : 's' }}</small>
              </button>
            }
          </div>
        </section>

        <section class="slide-panel">
          @if (activeIndex) {
            <label>
              <span>Index title</span>
              <input pInputText [(ngModel)]="activeIndex.title" placeholder="Example: Anatomy basics" />
            </label>

            <div class="panel-title">
              <strong>Slides</strong>
              <button type="button" class="text-action" (click)="addSlide()">
                <i class="pi pi-plus"></i>
                Add
              </button>
            </div>

            <div class="slide-list">
              @for (slide of activeIndex.slides; track slide.id; let i = $index) {
                <button type="button" class="slide-pill" [class.active]="slide.id === selectedSlideId" (click)="selectSlide(slide.id)">
                  <span>{{ i + 1 }}</span>
                  <strong>{{ slide.title.trim() || 'Untitled slide' }}</strong>
                  <small>{{ slide.blocks.length }} block{{ slide.blocks.length === 1 ? '' : 's' }}</small>
                </button>
              }
            </div>
          }
        </section>

        <section class="content-panel">
          @if (activeSlide) {
            <div class="content-head">
              <label>
                <span>Slide title</span>
                <input pInputText [(ngModel)]="activeSlide.title" placeholder="Example: Medical terminology" />
              </label>
              <label>
                <span>Status</span>
                <p-select [options]="statusOptions" [(ngModel)]="activeSlide.status" optionLabel="label" optionValue="value" appendTo="body"></p-select>
              </label>
            </div>

            <div class="block-add-row">
              <button pButton type="button" icon="pi pi-align-left" label="Add text" class="p-button-outlined" (click)="newBlockType = 'PARAGRAPH'; addBlock()"></button>
              <button pButton type="button" icon="pi pi-table" label="Add table" class="p-button-outlined" (click)="newBlockType = 'TABLE'; addBlock()"></button>
              <p-select [options]="blockTypes" [(ngModel)]="newBlockType" optionLabel="label" optionValue="value" appendTo="body"></p-select>
              <button pButton type="button" icon="pi pi-plus" label="Add block" class="p-button-outlined" (click)="addBlock()"></button>
            </div>

            <div class="blocks-list">
              @for (block of sortedBlocks; track block.id) {
                <section class="block-editor">
                  <div class="block-header">
                    <p-select
                      [options]="blockTypes"
                      [(ngModel)]="block.type"
                      optionLabel="label"
                      optionValue="value"
                      appendTo="body"
                      (ngModelChange)="normalizeBlock(block)"
                    ></p-select>
                    <button type="button" class="icon-danger" (click)="deleteBlock(block.id)" aria-label="Delete block">
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>

                  @if (block.type === 'BULLETS' || block.type === 'NUMBERED_LIST') {
                    <textarea pTextarea rows="5" [ngModel]="listText(block)" (ngModelChange)="setList(block, $event)" placeholder="One point per line"></textarea>
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
                    <div class="two-fields">
                      <input pInputText placeholder="Label" [ngModel]="linkLabel(block)" (ngModelChange)="setLinkLabel(block, $event)" />
                      <input pInputText placeholder="URL" [ngModel]="linkUrl(block)" (ngModelChange)="setLinkUrl(block, $event)" />
                    </div>
                  } @else if (block.type === 'MEDIA') {
                    <div class="two-fields">
                      <input pInputText placeholder="Media name" [ngModel]="mediaName(block)" (ngModelChange)="setMediaName(block, $event)" />
                      <input pInputText placeholder="Media URL" [ngModel]="mediaUrl(block)" (ngModelChange)="setMediaUrl(block, $event)" />
                    </div>
                  } @else {
                    <textarea pTextarea rows="5" [(ngModel)]="block.value" placeholder="Add content here"></textarea>
                  }
                </section>
              } @empty {
                <div class="empty-blocks">
                  <i class="pi pi-plus-circle"></i>
                  <span>Add a content block to this slide.</span>
                </div>
              }
            </div>
          }
        </section>
      </div>

      <ng-template pTemplate="footer">
        <div class="drawer-footer">
          <button pButton type="button" label="Cancel" class="p-button-outlined" (click)="drawerVisible = false"></button>
          <button pButton type="button" icon="pi pi-plus" label="Add Manual Materials" [disabled]="!canCreate" (click)="create()"></button>
        </div>
      </ng-template>
    </p-drawer>
  `,
  styles: [`
    .manual-box { display: grid; gap: 1rem; border: 1px solid #e4e1f4; border-radius: 8px; padding: 1rem; background: #fff; }
    .manual-intro h3 { margin: 0 0 .25rem; color: #151936; }
    .manual-intro p { margin: 0; color: #626783; line-height: 1.4; }
    .manual-tips { display: grid; gap: .7rem; }
    .manual-tips div { display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: .65rem; align-items: start; color: #343957; font-size: .88rem; line-height: 1.35; }
    .manual-tips i { width: 28px; height: 28px; border-radius: 8px; display: inline-grid; place-items: center; color: #4d3ac8; background: #f4f1ff; }

    :host ::ng-deep .manual-material-drawer { width: min(1320px, 98vw); }
    :host ::ng-deep .manual-material-drawer .p-drawer-header { padding: 1rem 1.5rem; border-bottom: 1px solid #ece9f8; }
    :host ::ng-deep .manual-material-drawer .p-drawer-content { padding: 0; background: #fbfbfe; }
    :host ::ng-deep .manual-material-drawer .p-drawer-footer { padding: 1rem 1.5rem; border-top: 1px solid #ece9f8; background: #fff; }
    .drawer-head { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0 2rem}
    .drawer-head h3 { margin: 0; color: #151936; font-size: 1.2rem; }
    .drawer-close { width: 36px; height: 36px; border: 1px solid #dedaf2; border-radius: 999px; background: #fff; color: #343957; display: inline-grid; place-items: center; cursor: pointer; }
    .drawer-body { min-height: calc(100vh - 154px); display: grid; grid-template-columns: 230px 280px minmax(420px, 1fr); gap: 1rem; padding: 1.25rem 1.5rem; }
    .index-panel, .slide-panel, .content-panel { min-height: 0; background: #fff; border: 1px solid #e4e1f4; border-radius: 8px; padding: 1rem; }
    .index-panel, .slide-panel { display: grid; align-content: start; gap: 1rem; }
    .content-panel { display: grid; align-content: start; gap: 1rem; }
    .panel-title { display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
    label { display: grid; gap: .45rem; color: #151936; font-weight: 800; }
    label span { font-size: .86rem; }
    textarea { resize: vertical; }
    .text-action { border: 0; background: transparent; color: #4d3ac8; font-weight: 800; display: inline-flex; align-items: center; gap: .35rem; cursor: pointer; padding: .2rem; }
    .index-list, .slide-list, .blocks-list { display: grid; gap: .55rem; overflow: auto; padding-right: .15rem; }
    .index-list, .slide-list { max-height: 64vh; }
    .blocks-list { max-height: 60vh; }
    .index-pill, .slide-pill { width: 100%; border: 1px solid #e4e1f4; border-radius: 8px; background: #fff; color: #343957; display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: .15rem .55rem; align-items: center; padding: .6rem; cursor: pointer; text-align: left; }
    .index-pill.active, .slide-pill.active { border-color: #5a49d6; background: #f5f2ff; box-shadow: 0 0 0 2px rgba(90,73,214,.08); }
    .index-pill span, .slide-pill span { grid-row: span 2; width: 30px; height: 30px; border-radius: 999px; display: inline-grid; place-items: center; background: #4d3ac8; color: #fff; font-size: .78rem; font-weight: 900; }
    .index-pill strong, .slide-pill strong { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .86rem; }
    .index-pill small, .slide-pill small { color: #626783; font-size: .76rem; }
    .content-head, .two-fields { display: grid; grid-template-columns: minmax(0, 1fr) minmax(180px, .35fr); gap: 1rem; }
    .block-add-row { display: flex; gap: .65rem; align-items: center; flex-wrap: wrap; }
    .block-editor { border: 1px solid #e5e2f5; border-radius: 8px; padding: .85rem; background: #fff; box-shadow: 0 8px 22px rgba(36, 26, 90, .05); }
    .block-header { display: grid; grid-template-columns: minmax(180px, 1fr) auto; gap: .65rem; align-items: center; margin-bottom: .75rem; }
    .icon-danger { border: 0; background: #fff2f2; color: #d43b3b; border-radius: 6px; width: 36px; height: 36px; cursor: pointer; }
    .table-tools { display: flex; gap: .6rem; margin-bottom: .75rem; }
    .table-grid-wrap { overflow: auto; border: 1px solid #ece8fb; border-radius: 8px; }
    .table-grid-wrap table { width: max-content; min-width: 100%; border-collapse: collapse; }
    .table-grid-wrap td { position: relative; min-width: 160px; border: 1px solid #ece8fb; padding: .45rem; background: #fff; }
    .table-grid-wrap tr:first-child td:not(.row-delete-cell) { background: #f4f1ff; font-weight: 800; }
    .table-grid-wrap input { border: 0; box-shadow: none; background: rgba(255,255,255,.72); padding-right: 2rem; }
    .mini-delete { position: absolute; right: .35rem; top: .35rem; display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid #ffb6b6; color: #ff3d3d; background: #fff7f7; border-radius: 6px; cursor: pointer; }
    .row-delete-cell { min-width: 44px !important; width: 44px; }
    .row-delete-cell .mini-delete { position: static; }
    .empty-blocks { min-height: 160px; display: grid; place-items: center; gap: .5rem; color: #626783; border: 1px dashed #d9d3f3; border-radius: 8px; }
    .empty-blocks i { color: #4d3ac8; font-size: 1.4rem; }
    .drawer-footer { display: flex; justify-content: flex-end; gap: .75rem; border-top: 0 !important }
    @media (max-width: 1180px) { .drawer-body { grid-template-columns: 1fr; } .index-list, .slide-list, .blocks-list { max-height: none; } }
    @media (max-width: 700px) { .content-head, .two-fields { grid-template-columns: 1fr; } }
  `],
})
export class ManualMaterialEditorComponent {
  @Output() createMaterial = new EventEmitter<MaterialFile[]>();

  drawerVisible = false;
  indexes: ManualIndexDraft[] = [];
  selectedIndexId = '';
  selectedSlideId = '';
  newBlockType: MaterialContentBlockType = 'PARAGRAPH';

  readonly blockTypes = MATERIAL_BLOCK_TYPES;
  readonly statusOptions = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Published', value: 'PUBLISHED' },
  ];

  get activeIndex(): ManualIndexDraft | undefined {
    return this.indexes.find((index) => index.id === this.selectedIndexId) ?? this.indexes[0];
  }

  get activeSlide(): ManualSlideDraft | undefined {
    return this.activeIndex?.slides.find((slide) => slide.id === this.selectedSlideId) ?? this.activeIndex?.slides[0];
  }

  get sortedBlocks(): MaterialContentBlock[] {
    return this.activeSlide?.blocks.slice().sort((a, b) => a.order - b.order) ?? [];
  }

  get canCreate(): boolean {
    return this.validIndexes().length > 0;
  }

  openDrawer(): void {
    if (!this.indexes.length) this.addIndex();
    this.drawerVisible = true;
  }

  addIndex(): void {
    const index: ManualIndexDraft = {
      id: createMaterialId('manual-index-draft'),
      title: '',
      slides: [],
    };
    this.indexes = [...this.indexes, index];
    this.selectedIndexId = index.id;
    this.addSlide();
  }

  selectIndex(id: string): void {
    this.selectedIndexId = id;
    this.selectedSlideId = this.activeIndex?.slides[0]?.id ?? '';
  }

  addSlide(): void {
    const index = this.activeIndex;
    if (!index) return;
    const slide: ManualSlideDraft = {
      id: createMaterialId('manual-slide-draft'),
      title: '',
      status: 'DRAFT',
      blocks: [],
    };
    index.slides = [...index.slides, slide];
    this.selectedSlideId = slide.id;
  }

  selectSlide(id: string): void {
    this.selectedSlideId = id;
  }

  addBlock(): void {
    const slide = this.activeSlide;
    if (!slide) return;
    slide.blocks = [
      ...slide.blocks,
      {
        id: createMaterialId('block'),
        type: this.newBlockType,
        order: slide.blocks.length + 1,
        value: this.defaultValue(this.newBlockType),
      },
    ];
  }

  deleteBlock(blockId: string): void {
    const slide = this.activeSlide;
    if (!slide) return;
    slide.blocks = slide.blocks.filter((block) => block.id !== blockId).map((block, index) => ({ ...block, order: index + 1 }));
  }

  normalizeBlock(block: MaterialContentBlock): void {
    block.value = this.defaultValue(block.type);
  }

  listText(block: MaterialContentBlock): string {
    return Array.isArray(block.value) ? (block.value as string[]).join('\n') : '';
  }

  setList(block: MaterialContentBlock, value: string): void {
    block.value = value.split('\n').map((item) => item.trim()).filter(Boolean);
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

  mediaUrl(block: MaterialContentBlock): string {
    return typeof block.value === 'object' && !Array.isArray(block.value) && 'url' in block.value ? block.value.url : '';
  }

  setMediaName(block: MaterialContentBlock, name: string): void {
    block.value = { name, url: this.mediaUrl(block) };
  }

  setMediaUrl(block: MaterialContentBlock, url: string): void {
    block.value = { name: this.mediaName(block), url };
  }

  create(): void {
    const files = this.validIndexes().map((index, indexOrder): MaterialFile => ({
      id: createMaterialId('manual'),
      fileName: index.title.trim(),
      fileType: 'MANUAL',
      sourceKey: createMaterialId('manual-source'),
      order: indexOrder + 1,
      status: index.slides.every((slide) => slide.status === 'PUBLISHED') ? 'PUBLISHED' : 'DRAFT',
      slides: index.slides
        .filter((slide) => slide.title.trim() && slide.blocks.some((block) => this.hasBlockValue(block)))
        .map((slide, slideOrder): MaterialSlide => ({
          id: createMaterialId('slide'),
          title: slide.title.trim(),
          order: slideOrder + 1,
          status: slide.status,
          blocks: slide.blocks
            .filter((block) => this.hasBlockValue(block))
            .map((block, blockOrder) => ({ ...block, id: createMaterialId('block'), order: blockOrder + 1 })),
        })),
    }));
    if (!files.length) return;
    this.createMaterial.emit(files);
    this.drawerVisible = false;
    this.indexes = [];
    this.selectedIndexId = '';
    this.selectedSlideId = '';
  }

  private validIndexes(): ManualIndexDraft[] {
    return this.indexes
      .map((index) => ({
        ...index,
        slides: index.slides.filter((slide) => slide.title.trim() && slide.blocks.some((block) => this.hasBlockValue(block))),
      }))
      .filter((index) => index.title.trim() && index.slides.length > 0);
  }

  private defaultValue(type: MaterialContentBlockType): MaterialContentBlock['value'] {
    if (type === 'BULLETS' || type === 'NUMBERED_LIST') return ['First point'];
    if (type === 'TABLE') return [['Column 1', 'Column 2'], ['Value 1', 'Value 2']];
    if (type === 'LINK') return { label: 'Reference', url: 'https://' };
    if (type === 'MEDIA') return { name: 'Media', url: 'https://' };
    if (type === 'CODE') return 'const example = true;';
    return type === 'HEADING' ? 'New heading' : 'Add content here.';
  }

  private hasBlockValue(block: MaterialContentBlock): boolean {
    if (typeof block.value === 'string') return block.value.trim().length > 0;
    if (Array.isArray(block.value)) return block.value.some((item) => Array.isArray(item) ? item.some((cell) => String(cell).trim()) : String(item).trim());
    return Object.values(block.value).some((value) => String(value).trim().length > 0);
  }
}
