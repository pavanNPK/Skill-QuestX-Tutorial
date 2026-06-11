export type MaterialSourceType = 'FILE_UPLOAD' | 'MANUAL';
export type MaterialDraftStatus = 'DRAFT' | 'PUBLISHED' | 'SUBMITTED';
export type MaterialFileType = 'PPTX' | 'XLSX' | 'MANUAL';
export type MaterialItemStatus = 'DRAFT' | 'PUBLISHED';

export type MaterialContentBlockType =
  | 'HEADING'
  | 'PARAGRAPH'
  | 'TEXT'
  | 'BULLETS'
  | 'NUMBERED_LIST'
  | 'TABLE'
  | 'MEDIA'
  | 'NOTES'
  | 'LINK'
  | 'NESTED'
  | 'CODE'
  | 'QUOTE';

export interface MaterialContentBlock {
  id: string;
  type: MaterialContentBlockType;
  order: number;
  value: string | string[] | string[][] | MaterialLinkValue | MaterialMediaValue;
}

export interface MaterialLinkValue {
  label: string;
  url: string;
}

export interface MaterialMediaValue {
  name: string;
  url: string;
}

export interface MaterialSlide {
  id: string;
  title: string;
  order: number;
  status: MaterialItemStatus;
  blocks: MaterialContentBlock[];
  notes?: string;
  links?: MaterialLinkValue[];
  imageUrls?: string[];
}

export interface MaterialFile {
  id: string;
  fileName: string;
  fileType: MaterialFileType;
  sourceKey?: string;
  order: number;
  status: MaterialItemStatus;
  slides: MaterialSlide[];
}

export interface MaterialDraft {
  id: string;
  title: string;
  sourceType: MaterialSourceType;
  status: MaterialDraftStatus;
  files: MaterialFile[];
  createdAt: string;
  updatedAt: string;
}

export const MATERIAL_BLOCK_TYPES: { label: string; value: MaterialContentBlockType }[] = [
  { label: 'Heading', value: 'HEADING' },
  { label: 'Paragraph', value: 'PARAGRAPH' },
  { label: 'Text', value: 'TEXT' },
  { label: 'Bullet list', value: 'BULLETS' },
  { label: 'Numbered list', value: 'NUMBERED_LIST' },
  { label: 'Table', value: 'TABLE' },
  { label: 'Media/Image', value: 'MEDIA' },
  { label: 'Notes', value: 'NOTES' },
  { label: 'Link', value: 'LINK' },
  { label: 'Nested section', value: 'NESTED' },
  { label: 'Code', value: 'CODE' },
  { label: 'Quote', value: 'QUOTE' },
];

export function createMaterialId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function reorderById<T extends { id: string; order: number }>(
  items: T[],
  draggedId: string,
  targetId: string,
): T[] {
  const from = items.findIndex((item) => item.id === draggedId);
  const to = items.findIndex((item) => item.id === targetId);
  if (from < 0 || to < 0 || from === to) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next.map((item, index) => ({ ...item, order: index + 1 }));
}
