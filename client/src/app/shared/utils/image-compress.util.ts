// use of this file is:
// Shared utility file. It compresses, formats, and validates image files before upload.

// use of this is:
// Options passed by callers to control image size, output quality, and maximum encoded payload size.
export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1, default 0.8
  maxSizeKB?: number; // Max file size in KB
}

// use of this is:
// Default compression settings keep profile/material images small enough for fast upload and loading.
const DEFAULT_OPTIONS: CompressOptions = {
  maxWidth: 400,
  maxHeight: 400,
  quality: 0.8,
  maxSizeKB: 200, // 200KB max for profile images
};

// use of this is:
// Reads a browser File, validates it is an image, resizes/compresses it, and returns a base64 data URL.
export function compressImage(file: File, options: CompressOptions = {}): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    // use of this is:
    // Blocks unsupported file types before FileReader/canvas work starts.
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
      reject(new Error('Invalid image type. Only JPEG, PNG, and WebP are allowed.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const result = compressAndResize(img, opts);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// use of this is:
// Performs the actual canvas resize/compression work after the image has loaded in memory.
function compressAndResize(img: HTMLImageElement, opts: CompressOptions): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // use of this is:
  // Calculates new dimensions while preserving aspect ratio so uploaded images do not look stretched.
  let { width, height } = img;
  const maxW = opts.maxWidth || 400;
  const maxH = opts.maxHeight || 400;

  if (width > maxW || height > maxH) {
    const ratio = Math.min(maxW / width, maxH / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  canvas.width = width;
  canvas.height = height;

  // use of this is:
  // Draws on a white background so transparent PNG/WebP images become valid JPEG output.
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  // use of this is:
  // Starts with requested quality first so small images keep better visual quality.
  let quality = opts.quality || 0.8;
  let result = canvas.toDataURL('image/jpeg', quality);

  // use of this is:
  // Reduces JPEG quality step by step until the encoded result fits the requested size.
  const maxSizeBytes = (opts.maxSizeKB || 200) * 1024;
  while (getBase64Size(result) > maxSizeBytes && quality > 0.3) {
    quality -= 0.1;
    result = canvas.toDataURL('image/jpeg', quality);
  }

  // use of this is:
  // If quality reduction is not enough, reduces dimensions once more to protect API payload size.
  if (getBase64Size(result) > maxSizeBytes) {
    const scale = 0.8;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    result = canvas.toDataURL('image/jpeg', 0.7);
  }

  return result;
}

// use of this is:
// Estimates byte size from a base64 data URL so compression can compare it with maxSizeKB.
function getBase64Size(base64: string): number {
  const base64Data = base64.split(',')[1];
  if (!base64Data) return 0;
  return (base64Data.length * 3) / 4;
}

// use of this is:
// Converts raw bytes into a readable label for upload validation messages and UI previews.
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// use of this is:
// Validates type and size before compression so the UI can show a clear error early.
export function validateImageFile(file: File, maxSizeMB: number = 5): string | null {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return 'Invalid file type. Only JPEG, PNG, and WebP are allowed.';
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File too large. Maximum size is ${maxSizeMB}MB.`;
  }
  return null;
}
