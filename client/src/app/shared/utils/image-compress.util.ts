/**
 * Image compression utility.
 * Compresses images to a target size and dimensions while maintaining quality.
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1, default 0.8
  maxSizeKB?: number; // Max file size in KB
}

const DEFAULT_OPTIONS: CompressOptions = {
  maxWidth: 400,
  maxHeight: 400,
  quality: 0.8,
  maxSizeKB: 200, // 200KB max for profile images
};

/**
 * Compress an image file and return as base64 data URL.
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise<string> - Base64 data URL of compressed image
 */
export function compressImage(file: File, options: CompressOptions = {}): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    // Validate file type
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

function compressAndResize(img: HTMLImageElement, opts: CompressOptions): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Calculate new dimensions maintaining aspect ratio
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

  // Draw image with white background (for transparency)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  // Start with requested quality
  let quality = opts.quality || 0.8;
  let result = canvas.toDataURL('image/jpeg', quality);

  // If still too large, reduce quality iteratively
  const maxSizeBytes = (opts.maxSizeKB || 200) * 1024;
  while (getBase64Size(result) > maxSizeBytes && quality > 0.3) {
    quality -= 0.1;
    result = canvas.toDataURL('image/jpeg', quality);
  }

  // If still too large, reduce dimensions
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

function getBase64Size(base64: string): number {
  const base64Data = base64.split(',')[1];
  if (!base64Data) return 0;
  return (base64Data.length * 3) / 4;
}

/**
 * Get file size in human readable format.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Validate image file before compression.
 */
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
