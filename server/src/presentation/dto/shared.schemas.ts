/** DTO schema file: Fastify uses these JSON schemas to validate request params and bodies before handlers run. */
export const courseIdParamsSchema = {
  // use of this is:
  // Validates routes that receive /:courseId before controllers read request.params.courseId.
  type: 'object',
  required: ['courseId'],
  additionalProperties: false,
  properties: {
    courseId: { type: 'string', minLength: 1, maxLength: 64 },
  },
};

export const examIdParamsSchema = {
  // use of this is:
  // Validates routes that receive /:examId before controllers call ExamService.
  type: 'object',
  required: ['examId'],
  additionalProperties: false,
  properties: {
    examId: { type: 'string', minLength: 1, maxLength: 64 },
  },
};

export const idParamsSchema = {
  // use of this is:
  // Generic id parameter schema for routes like notifications and tasks.
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: { type: 'string', minLength: 1, maxLength: 64 },
  },
};

export const looseObjectBodySchema = {
  // use of this is:
  // Allows feature services to normalize flexible editor/import JSON while still requiring an object body.
  type: 'object',
  additionalProperties: true,
};
