/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

export class UploadService {
  // use of this is:
  // Base upload folder used for deleting files and building public paths.
  private readonly uploadsDir = join(process.cwd(), 'uploads');

  // use of this is:
  // Convert stored resume filename into the public URL served by @fastify/static.
  getResumeUrl(filename: string): string {
    return `/uploads/resumes/${filename}`;
  }

  // use of this is:
  // Remove a previously uploaded resume from disk when cleanup is needed.
  deleteResume(filename: string): void {
    // join prevents manual path concatenation and keeps the file inside uploads/resumes.
    const filePath = join(this.uploadsDir, 'resumes', filename);
    if (existsSync(filePath)) unlinkSync(filePath);
  }

  // use of this is:
  // Extract stored filename from a public resume URL.
  getFilenameFromUrl(url: string): string | null {
    const match = url.match(/\/uploads\/resumes\/(.+)$/);
    return match ? match[1] : null;
  }
}
