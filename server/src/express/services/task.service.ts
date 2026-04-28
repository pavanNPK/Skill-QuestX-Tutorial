import { Types } from 'mongoose';
import { TaskModel } from '../models/task.model';
import { TaskSubmissionModel } from '../models/task-submission.model';
import { badRequest } from '../utils/http-error';
import type { BatchService } from './batch.service';
import type { CourseService } from './course.service';
import type { MailService } from './mail.service';
import type { NotificationService } from './notification.service';
import type { UserService } from './user.service';

export interface CreateTaskDto {
  title: string;
  description?: string;
  courseId: string;
  batchIds?: string[];
  dueDate?: string | null;
}

export interface SubmitTaskDto {
  comment?: string;
  attachmentUrl?: string | null;
}

export class TaskService {
  constructor(
    private readonly batchService: BatchService,
    private readonly courseService: CourseService,
    private readonly notificationService: NotificationService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateTaskDto, instructorId: string): Promise<{ id: string; title: string }> {
    const courseList = await this.courseService.findNamesByIds([dto.courseId]);
    if (!courseList.length) throw badRequest('Course not found.');
    const courseName = courseList[0].name;
    const batchIds = dto.batchIds?.length ? dto.batchIds.map((id) => new Types.ObjectId(id)) : [];
    const dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    const task = await TaskModel.create({
      title: dto.title.trim(),
      description: (dto.description ?? '').trim(),
      courseId: new Types.ObjectId(dto.courseId),
      batchIds,
      createdBy: new Types.ObjectId(instructorId),
      dueDate,
    });

    const studentIds = batchIds.length
      ? await this.batchService.getStudentIdsByBatchIds(dto.batchIds!)
      : await this.batchService.getStudentIdsByCourseId(dto.courseId);
    const dueStr = dueDate ? dueDate.toLocaleDateString() : null;

    await this.notificationService.createForUsers(studentIds, `New task: ${task.title}`, 'task_added', {
      message: `A new task has been added for ${courseName}.`,
      link: '/tasks',
      metadata: { taskId: task._id.toString(), courseId: dto.courseId, courseName, dueDate: dueStr },
    });

    for (const studentId of studentIds) {
      const user = await this.userService.findById(studentId);
      if (!user?.email) continue;
      const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Student';
      try {
        await this.mailService.sendTaskAddedToBatch(user.email, name, task.title, courseName, dueStr);
      } catch (e) {
        console.warn('Failed to send task-added email to', user.email, e);
      }
    }

    return { id: task._id.toString(), title: task.title };
  }

  async submit(taskId: string, studentId: string, dto: SubmitTaskDto): Promise<{ id: string }> {
    const task = await TaskModel.findById(taskId).lean().exec();
    if (!task) throw badRequest('Task not found.');
    const existing = await TaskSubmissionModel.findOne({
      taskId: new Types.ObjectId(taskId),
      studentId: new Types.ObjectId(studentId),
    }).exec();
    if (existing) throw badRequest('You have already submitted this task.');

    const sub = await TaskSubmissionModel.create({
      taskId: new Types.ObjectId(taskId),
      studentId: new Types.ObjectId(studentId),
      comment: (dto.comment ?? '').trim(),
      attachmentUrl: dto.attachmentUrl ?? null,
    });

    const instructorId = (task as any).createdBy?.toString();
    if (instructorId) {
      const student = await this.userService.findById(studentId);
      const studentName = student ? `${student.firstName ?? ''} ${student.lastName ?? ''}`.trim() || 'A student' : 'A student';
      await this.notificationService.create({
        userId: instructorId,
        title: `Task submitted: ${(task as any).title}`,
        message: `${studentName} has submitted the task.`,
        type: 'task_submitted',
        link: '/tasks',
        metadata: { taskId, studentId, studentName, taskTitle: (task as any).title },
      });
      const instructor = await this.userService.findById(instructorId);
      if (instructor?.email) {
        const instructorName = `${instructor.firstName ?? ''} ${instructor.lastName ?? ''}`.trim() || 'Instructor';
        try {
          await this.mailService.sendTaskSubmittedToInstructor(instructor.email, instructorName, studentName, (task as any).title);
        } catch (e) {
          console.warn('Failed to send task-submitted email to instructor', e);
        }
      }
    }
    return { id: sub._id.toString() };
  }
}
