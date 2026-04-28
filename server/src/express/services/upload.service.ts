import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

export class UploadService {
  private readonly uploadsDir = join(process.cwd(), 'uploads');

  getResumeUrl(filename: string): string {
    return `/uploads/resumes/${filename}`;
  }

  deleteResume(filename: string): void {
    const filePath = join(this.uploadsDir, 'resumes', filename);
    if (existsSync(filePath)) unlinkSync(filePath);
  }

  getFilenameFromUrl(url: string): string | null {
    const match = url.match(/\/uploads\/resumes\/(.+)$/);
    return match ? match[1] : null;
  }
}
