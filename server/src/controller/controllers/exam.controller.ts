/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';
import { fileToBuffer, requireMultipartFile } from '../../core/utils/upload';

export class ExamController {
  // use of this is:
  // Lists exams that students are allowed to start from the exam dashboard.
  async getAvailableExams() {
    // Service filters by exam status and returns frontend-ready exam summaries.
    return services.examService.getAvailableExams();
  }

  // use of this is:
  // Lists exams for instructor/admin management screens.
  async getManagedExams(request: FastifyRequest) {
    // request.user is used by ExamService to decide which exams this manager can see.
    return services.examService.getManagedExams((request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Creates a new exam from the editor payload.
  async create(request: FastifyRequest) {
    // request.body is validated as an object by the route; detailed exam normalization is in ExamService.
    return services.examService.create(request.body, (request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Imports one or more exams from an uploaded XLSX workbook.
  async importWorkbook(request: FastifyRequest) {
    // request.file() comes from @fastify/multipart and reads the uploaded workbook stream.
    const part = await requireMultipartFile(await request.file(), 'Upload an Excel .xlsx workbook.');
    // fileToBuffer enforces file size and extension before parsing happens in the service.
    const file = await fileToBuffer(part, 10 * 1024 * 1024, /\.xlsx$/i);
    return services.examService.importWorkbook(file, (request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Updates an existing exam chosen by /manage/:examId.
  async update(request: FastifyRequest) {
    // examId is validated by examIdParamsSchema before this method runs.
    const params = request.params as { examId: string };
    // Service checks manage permissions and applies allowed updates.
    return services.examService.update(params.examId, request.body, (request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Deletes an exam from the management screen.
  async delete(request: FastifyRequest) {
    // Controller only extracts the id; service owns authorization and database delete.
    const params = request.params as { examId: string };
    return services.examService.delete(params.examId, (request as AuthenticatedRequest).user);
  }

  // use of this is:
  // Loads one published exam for the online assessment page.
  async getExam(request: FastifyRequest) {
    // The service returns sanitized questions and does not expose manager-only fields.
    const params = request.params as { examId: string };
    return services.examService.getExam(params.examId);
  }

  // use of this is:
  // Saves a student's answers and calculates the exam submission result.
  async submit(request: FastifyRequest) {
    // examId selects the exam; request.body contains answers validated by the route schema.
    const params = request.params as { examId: string };
    return services.examService.submit(params.examId, request.body, (request as AuthenticatedRequest).user);
  }
}

export const examController = new ExamController();
