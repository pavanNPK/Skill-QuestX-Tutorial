import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { TaskSubmission, TaskSubmissionDocument } from './schemas/task-submission.schema';
import { BatchService } from '../batch/batch.service';
import { CourseService } from '../course/course.service';
import { NotificationService } from '../notification/notification.service';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';

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

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(TaskSubmission.name) private submissionModel: Model<TaskSubmissionDocument>,
    private batchService: BatchService,
    private courseService: CourseService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private userService: UserService,
  ) {}

  async create(dto: CreateTaskDto, instructorId: string): Promise<{ id: string; title: string }> {
    const courseId = dto.courseId;
    const courseList = await this.courseService.findNamesByIds([courseId]);
    if (!courseList.length) throw new BadRequestException('Course not found.');
    const courseName = courseList[0].name;
    const batchIds = dto.batchIds?.length
      ? dto.batchIds.map((id) => new Types.ObjectId(id))
      : [];
    const dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    const task = await this.taskModel.create({
      title: dto.title.trim(),
      description: (dto.description ?? '').trim(),
      courseId: new Types.ObjectId(courseId),
      batchIds,
      createdBy: new Types.ObjectId(instructorId),
      dueDate,
    });

    const studentIds = batchIds.length
      ? await this.batchService.getStudentIdsByBatchIds(dto.batchIds!)
      : await this.batchService.getStudentIdsByCourseId(courseId);
    const dueStr = dueDate ? dueDate.toLocaleDateString() : null;

    await this.notificationService.createForUsers(
      studentIds,
      `New task: ${task.title}`,
      'task_added',
      {
        message: `A new task has been added for ${courseName}.`,
        link: '/tasks',
        metadata: { taskId: task._id.toString(), courseId, courseName, dueDate: dueStr },
      },
    );

    for (const studentId of studentIds) {
      const user = await this.userService.findById(studentId);
      if (user?.email) {
        const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Student';
        try {
          await this.mailService.sendTaskAddedToBatch(
            user.email,
            name,
            task.title,
            courseName,
            dueStr,
          );
        } catch (e) {
          console.warn('Failed to send task-added email to', user.email, e);
        }
      }
    }

    return { id: task._id.toString(), title: task.title };
  }

  async submit(taskId: string, studentId: string, dto: SubmitTaskDto): Promise<{ id: string }> {
    const task = await this.taskModel.findById(taskId).lean().exec();
    if (!task) throw new BadRequestException('Task not found.');
    const existing = await this.submissionModel
      .findOne({ taskId: new Types.ObjectId(taskId), studentId: new Types.ObjectId(studentId) })
      .exec();
    if (existing) throw new BadRequestException('You have already submitted this task.');

    const sub = await this.submissionModel.create({
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
          await this.mailService.sendTaskSubmittedToInstructor(
            instructor.email,
            instructorName,
            studentName,
            (task as any).title,
          );
        } catch (e) {
          console.warn('Failed to send task-submitted email to instructor', e);
        }
      }
    }

    return { id: sub._id.toString() };
  }
}
