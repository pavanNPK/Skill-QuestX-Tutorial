/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { Types } from 'mongoose';
import { BatchModel } from '../../data/models/batch.model';
import type { CourseService } from './course.service';

export interface BatchLean {
  _id: Types.ObjectId;
  name: string;
  courseId: Types.ObjectId | { _id: Types.ObjectId; name: string };
  studentIds: Types.ObjectId[];
}

export class BatchService {
  // use of this is:
  // CourseService is injected because batch queries often need course ownership/instructor context.
  constructor(private readonly courseService: CourseService) {}

  // use of this is:
  // Returns all batches with course name populated for admin/instructor screens.
  async findAll(): Promise<BatchLean[]> {
    // lean() returns plain objects instead of full Mongoose documents for faster read-only responses.
    const list = await BatchModel.find().populate('courseId', 'name').sort({ createdAt: -1 }).lean().exec();
    return list as unknown as BatchLean[];
  }

  // use of this is:
  // Counts batches connected to courses assigned to one instructor.
  async countBatchesByInstructorId(instructorId: string): Promise<number> {
    // Instructor owns courses, and batches belong to courses, so we resolve course ids first.
    const courses = await this.courseService.findByInstructorId(instructorId);
    const courseIds = courses.map((c) => c._id);
    if (!courseIds.length) return 0;
    return BatchModel.countDocuments({ courseId: { $in: courseIds } }).exec();
  }

  // use of this is:
  // Gets unique student ids from selected batches for task notifications.
  async getStudentIdsByBatchIds(batchIds: string[]): Promise<string[]> {
    if (!batchIds?.length) return [];
    // Convert route/body string ids to Mongo ObjectIds for the query.
    const batches = await BatchModel.find({ _id: { $in: batchIds.map((id) => new Types.ObjectId(id)) } })
      .select('studentIds')
      .lean()
      .exec();
    const set = new Set<string>();
    // Set removes duplicate students who appear in more than one selected batch.
    for (const b of batches as any[]) {
      for (const sid of b.studentIds || []) set.add(sid.toString());
    }
    return Array.from(set);
  }

  // use of this is:
  // Gets every student enrolled in any batch for a course.
  async getStudentIdsByCourseId(courseId: string): Promise<string[]> {
    const batches = await BatchModel.find({ courseId: new Types.ObjectId(courseId) }).select('studentIds').lean().exec();
    const set = new Set<string>();
    for (const b of batches as any[]) {
      for (const sid of b.studentIds || []) set.add(sid.toString());
    }
    return Array.from(set);
  }

  // use of this is:
  // Checks whether a student is enrolled in the course through any batch.
  async isStudentInCourse(studentId: string, courseId: string): Promise<boolean> {
    // Count is cheaper than loading full batch documents when we only need yes/no.
    const count = await BatchModel.countDocuments({
      courseId: new Types.ObjectId(courseId),
      studentIds: new Types.ObjectId(studentId),
    }).exec();
    return count > 0;
  }

  // use of this is:
  // Returns course ids a student can read because they are present in course batches.
  async getCourseIdsForStudent(studentId: string): Promise<string[]> {
    const batches = await BatchModel.find({ studentIds: new Types.ObjectId(studentId) })
      .select('courseId')
      .lean()
      .exec();
    const ids = new Set<string>();
    for (const batch of batches as any[]) {
      if (batch.courseId) ids.add(batch.courseId.toString());
    }
    return Array.from(ids);
  }
}
