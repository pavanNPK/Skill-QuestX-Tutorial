/** Route file: declares URL, HTTP method, preHandler auth hooks, DTO schema validation, and controller handler. */
import type { FastifyPluginAsync } from 'fastify';

import { examController } from '../../controller/controllers/exam.controller';
import { examIdParamsSchema, looseObjectBodySchema } from '../dto/shared.schemas';

export const examRoutes: FastifyPluginAsync = async (app) => {
  // use of this hook is:
  // Exam responses should not be browser-cached because exam content, answers, and availability can change.
  // onSend runs after the handler and before the response is sent, so every route below gets these headers.
  app.addHook('onSend', async (_request, reply, payload) => {
    reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', '0');
    return payload;
  });

  // use of this route is:
  // List exams visible to students.
  // preHandler authenticates first so anonymous users cannot view exam availability.
  app.get('/available', {
    preHandler: [app.authenticate],
    handler: examController.getAvailableExams,
  });

  // use of this route is:
  // List manageable exams for instructor/admin screens.
  // Service applies role rules after authenticate attaches request.user.
  app.get('/manage', {
    preHandler: [app.authenticate],
    handler: examController.getManagedExams,
  });

  // use of this route is:
  // Backward-compatible alias for the management list endpoint.
  app.get('/manage/all', {
    preHandler: [app.authenticate],
    handler: examController.getManagedExams,
  });

  // use of this route is:
  // Create a new exam from JSON editor data.
  // schema.body accepts a bounded object; ExamService performs domain-level normalization.
  app.post('/manage', {
    preHandler: [app.authenticate],
    schema: { body: looseObjectBodySchema },
    handler: examController.create,
  });

  // use of this route is:
  // Import exams from XLSX multipart upload.
  // Multipart file checks happen in upload utility because JSON schema does not validate file streams.
  app.post('/manage/import-xlsx', {
    preHandler: [app.authenticate],
    handler: examController.importWorkbook,
  });

  // use of this route is:
  // Update one existing exam.
  // params schema validates examId; body schema blocks non-object payloads and oversized values.
  app.put('/manage/:examId', {
    preHandler: [app.authenticate],
    schema: { params: examIdParamsSchema, body: looseObjectBodySchema },
    handler: examController.update,
  });

  // use of this route is:
  // Delete one exam by id after service-level permission checks.
  app.delete('/manage/:examId', {
    preHandler: [app.authenticate],
    schema: { params: examIdParamsSchema },
    handler: examController.delete,
  });

  // use of this route is:
  // Load one exam for the assessment screen.
  app.get('/:examId', {
    preHandler: [app.authenticate],
    schema: { params: examIdParamsSchema },
    handler: examController.getExam,
  });

  // use of this route is:
  // Submit exam answers from the student assessment page.
  // Inline body schema is strict because answer payloads are high-risk user input.
  app.post('/:examId/submit', {
    preHandler: [app.authenticate],
    schema: {
      params: examIdParamsSchema,
      body: {
        type: 'object',
        additionalProperties: false,
        properties: {
          answers: {
            type: 'array',
            maxItems: 500,
            items: {
              type: 'object',
              required: ['questionId', 'value'],
              additionalProperties: false,
              properties: {
                questionId: { type: 'string', minLength: 1, maxLength: 128 },
                value: {
                  anyOf: [
                    { type: 'string', maxLength: 4000 },
                    { type: 'array', maxItems: 50, items: { type: 'string', maxLength: 1000 } },
                  ],
                },
              },
            },
          },
          autoSubmitted: { type: 'boolean' },
        },
      },
    },
    handler: examController.submit,
  });
};
