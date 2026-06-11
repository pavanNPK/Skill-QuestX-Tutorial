/** Route file: declares standalone material draft management endpoints. */
import type { FastifyPluginAsync } from 'fastify';

import { materialDraftController } from '../../controller/controllers/material-draft.controller';
import { idParamsSchema, looseObjectBodySchema } from '../dto/shared.schemas';

export const materialDraftRoutes: FastifyPluginAsync = async (app) => {
  app.addHook('onRequest', async (request) => {
    request.log.info({ method: request.method, url: request.url }, 'material-draft request');
  });

  app.get('/', {
    preHandler: [app.authenticate],
    handler: materialDraftController.list,
  });

  app.post('/', {
    preHandler: [app.authenticate],
    schema: { body: looseObjectBodySchema },
    handler: materialDraftController.create,
  });

  app.post('/import-file', {
    preHandler: [app.authenticate],
    handler: materialDraftController.importFile,
  });

  app.post('/images', {
    preHandler: [app.authenticate],
    handler: materialDraftController.uploadImage,
  });

  app.get('/:id', {
    preHandler: [app.authenticate],
    schema: { params: idParamsSchema },
    handler: materialDraftController.get,
  });

  app.patch('/:id', {
    preHandler: [app.authenticate],
    schema: { params: idParamsSchema, body: looseObjectBodySchema },
    handler: materialDraftController.update,
  });

  app.post('/:id/submit', {
    preHandler: [app.authenticate],
    schema: { params: idParamsSchema },
    handler: materialDraftController.submit,
  });

  app.delete('/:id', {
    preHandler: [app.authenticate],
    schema: { params: idParamsSchema },
    handler: materialDraftController.remove,
  });
};
