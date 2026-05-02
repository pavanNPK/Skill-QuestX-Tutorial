import { AuthService } from './auth.service';
import { BatchService } from './batch.service';
import { CourseService } from './course.service';
import { CourseContentService } from './course-content.service';
import { ExamService } from './exam.service';
import { MailService } from './mail.service';
import { NotificationService } from './notification.service';
import { PushService } from './push.service';
import { TaskService } from './task.service';
import { UploadService } from './upload.service';
import { UserService } from './user.service';

const userService = new UserService();
const courseService = new CourseService();
const batchService = new BatchService(courseService);
const courseContentService = new CourseContentService(courseService, batchService);
const examService = new ExamService();
const mailService = new MailService();
const pushService = new PushService();
const notificationService = new NotificationService(pushService);
const authService = new AuthService(userService, courseService, batchService, mailService, notificationService);
const taskService = new TaskService(batchService, courseService, notificationService, mailService, userService);
const uploadService = new UploadService();

export const services = {
  authService,
  batchService,
  courseService,
  courseContentService,
  examService,
  mailService,
  notificationService,
  pushService,
  taskService,
  uploadService,
  userService,
};
