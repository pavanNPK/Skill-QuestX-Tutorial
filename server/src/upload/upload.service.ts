import { Injectable, BadRequestException } from '@nestjs/common';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadsDir = join(process.cwd(), 'uploads');

  /** Validate base64 profile image. Returns true if valid. */
  validateProfileImageBase64(base64: string): boolean {
    if (!base64) return false;
    
    // Check if it's a valid data URL
    const match = base64.match(/^data:image\/(jpeg|jpg|png|webp);base64,/);
    if (!match) return false;

    // Check approximate size (base64 is ~33% larger than binary)
    // Limit to ~500KB after compression (670KB base64)
    const base64Data = base64.split(',')[1];
    if (!base64Data) return false;
    
    const sizeInBytes = (base64Data.length * 3) / 4;
    const maxSize = 500 * 1024; // 500KB
    
    return sizeInBytes <= maxSize;
  }

  /** Get the URL path for a resume file. */
  getResumeUrl(filename: string): string {
    return `/uploads/resumes/${filename}`;
  }

  /** Delete a resume file by filename. */
  deleteResume(filename: string): void {
    const filePath = join(this.uploadsDir, 'resumes', filename);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  /** Extract filename from resume URL. */
  getFilenameFromUrl(url: string): string | null {
    const match = url.match(/\/uploads\/resumes\/(.+)$/);
    return match ? match[1] : null;
  }
}
