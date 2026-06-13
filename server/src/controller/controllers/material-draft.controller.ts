/** Controller file: maps material draft HTTP requests to MaterialDraftService calls. */
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';
import { fileToBuffer, requireMultipartFile, saveMultipartFile } from '../../core/utils/upload';

const materialDraftUploadsDir = join(process.cwd(), 'uploads', 'material-drafts');
const materialDraftImagesDir = join(materialDraftUploadsDir, 'images');
if (!existsSync(materialDraftImagesDir)) mkdirSync(materialDraftImagesDir, { recursive: true });

const imageMimes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export class MaterialDraftController {
  async list(request: FastifyRequest) {
    return services.materialDraftService.list((request as AuthenticatedRequest).user);
  }

  async get(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.materialDraftService.get(params.id, (request as AuthenticatedRequest).user);
  }

  async create(request: FastifyRequest) {
    return services.materialDraftService.create(request.body, (request as AuthenticatedRequest).user);
  }

  async update(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.materialDraftService.update(params.id, request.body, (request as AuthenticatedRequest).user);
  }

  async remove(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.materialDraftService.remove(params.id, (request as AuthenticatedRequest).user);
  }

  async submit(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.materialDraftService.submit(params.id, request.body, (request as AuthenticatedRequest).user);
  }

  async importFile(request: FastifyRequest) {
    const part = await requireMultipartFile(await request.file(), 'No material file uploaded');
    const file = await fileToBuffer(part, 20 * 1024 * 1024, /\.(pptx|xlsx)$/i);
    return services.materialDraftService.importFile(file, (request as AuthenticatedRequest).user);
  }

  async uploadImage(request: FastifyRequest) {
    const part = await requireMultipartFile(await request.file(), 'No image uploaded');
    const file = await saveMultipartFile(part, materialDraftImagesDir, 'material-image', 10 * 1024 * 1024, imageMimes);
    return services.materialDraftService.saveImage(file);
  }
}

export const materialDraftController = new MaterialDraftController();
