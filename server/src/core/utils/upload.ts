/** Core utility file: provides reusable framework-safe helpers for routes, controllers, and services. */
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { pipeline } from 'stream/promises';
import { randomUUID } from 'crypto';
import type { MultipartFile } from '@fastify/multipart';

import { badRequest } from './http-error';
import type { UploadedFile } from '../types/uploaded-file';

export async function requireMultipartFile(part: MultipartFile | undefined, message: string): Promise<MultipartFile> {
  // use of this is:
  // Ensure the request actually contains a multipart file part before upload logic continues.
  if (!part || part.type !== 'file') throw badRequest(message);
  return part;
}

// use of this is:
// Workbook imports are small enough to buffer, which lets services parse them synchronously.
export async function fileToBuffer(part: MultipartFile, maxBytes: number, allowedExtensions?: RegExp): Promise<UploadedFile> {
  // Extension validation rejects obvious wrong file types before buffering the full upload.
  validateExtension(part.filename, allowedExtensions);
  // toBuffer is acceptable for small imports because maxBytes is checked immediately after.
  const buffer = await part.toBuffer();
  if (buffer.length > maxBytes) throw badRequest(`File is too large. Maximum size is ${formatBytes(maxBytes)}.`);

  return {
    originalname: part.filename,
    filename: part.filename,
    mimetype: part.mimetype,
    size: buffer.length,
    buffer,
  };
}

// use of this is:
// Large assets are streamed to disk so the server does not keep the whole file in memory.
export async function saveMultipartFile(
  part: MultipartFile,
  targetDir: string,
  prefix: string,
  maxBytes: number,
  allowedMimes?: ReadonlySet<string>,
): Promise<UploadedFile> {
  // MIME allow-list rejects files that the route does not expect, such as scripts during resume upload.
  if (allowedMimes && !allowedMimes.has(part.mimetype)) {
    throw badRequest('Invalid file type.');
  }

  // Ensure target directory exists before creating the write stream.
  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

  // Unique filename prevents user-provided names from overwriting existing files.
  const filename = `${prefix}-${Date.now()}-${randomUUID()}${extname(part.filename)}`;
  const targetPath = join(targetDir, filename);
  let size = 0;

  // Count bytes while streaming so oversized uploads are stopped during transfer.
  part.file.on('data', (chunk: Buffer) => {
    size += chunk.length;
    if (size > maxBytes) {
      part.file.destroy(badRequest(`File is too large. Maximum size is ${formatBytes(maxBytes)}.`));
    }
  });

  // pipeline handles stream backpressure and rejects when disk write or upload stream fails.
  await pipeline(part.file, createWriteStream(targetPath));

  return {
    originalname: part.filename,
    filename,
    mimetype: part.mimetype,
    size,
  };
}

function validateExtension(filename: string, allowedExtensions: RegExp | undefined): void {
  // Some import parsers only understand specific extensions, so reject unsupported names early.
  if (allowedExtensions && !allowedExtensions.test(filename)) {
    throw badRequest('Unsupported file extension.');
  }
}

function formatBytes(bytes: number): string {
  // Human-readable MB values make validation errors understandable to frontend users.
  return `${Math.round(bytes / 1024 / 1024)}MB`;
}
