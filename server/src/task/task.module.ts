import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskSubmission, TaskSubmissionSchema } from './schemas/task-submission.schema';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { BatchModule } from '../batch/batch.module';
import { CourseModule } from '../course/course.module';
import { NotificationModule } from '../notification/notification.module';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TaskSubmission.name, schema: TaskSubmissionSchema },
    ]),
    BatchModule,
    CourseModule,
    NotificationModule,
    MailModule,
    UserModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
