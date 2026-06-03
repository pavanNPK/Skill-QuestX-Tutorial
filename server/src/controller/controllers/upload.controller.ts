/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import { requireMultipartFile, saveMultipartFile } from '../../core/utils/upload';

const uploadsDir = join(process.cwd(), 'uploads');
const resumesDir = join(uploadsDir, 'resumes');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });
if (!existsSync(resumesDir)) mkdirSync(resumesDir, { recursive: true });

const resumeMimes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

export class UploadController {
  // use of this is:
  // Receives a resume upload during registration before the user has an account.
  async uploadResume(request: FastifyRequest) {
    // request.file() reads the multipart form file through @fastify/multipart.
    const part = await requireMultipartFile(await request.file(), 'No file uploaded');
    // saveMultipartFile streams to disk, limits file size, and allows only resume document MIME types.
    const file = await saveMultipartFile(part, resumesDir, 'resume', 5 * 1024 * 1024, resumeMimes);
    // Response gives Angular the stored filename and public URL to attach to registration data.
    return {
      message: 'Resume uploaded successfully',
      filename: file.filename,
      url: services.uploadService.getResumeUrl(file.filename),
      size: file.size,
    };
  }
}

export const uploadController = new UploadController();
