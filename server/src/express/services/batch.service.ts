import { Types } from 'mongoose';
import { BatchModel } from '../models/batch.model';
import type { CourseService } from './course.service';

export interface BatchLean {
  _id: Types.ObjectId;
  name: string;
  courseId: Types.ObjectId | { _id: Types.ObjectId; name: string };
  studentIds: Types.ObjectId[];
}

export class BatchService {
  constructor(private readonly courseService: CourseService) {}

  async findAll(): Promise<BatchLean[]> {
    const list = await BatchModel.find().populate('courseId', 'name').sort({ createdAt: -1 }).lean().exec();
    return list as unknown as BatchLean[];
  }

  async countBatchesByInstructorId(instructorId: string): Promise<number> {
    const courses = await this.courseService.findByInstructorId(instructorId);
    const courseIds = courses.map((c) => c._id);
    if (!courseIds.length) return 0;
    return BatchModel.countDocuments({ courseId: { $in: courseIds } }).exec();
  }

  async getStudentIdsByBatchIds(batchIds: string[]): Promise<string[]> {
    if (!batchIds?.length) return [];
    const batches = await BatchModel.find({ _id: { $in: batchIds.map((id) => new Types.ObjectId(id)) } })
      .select('studentIds')
      .lean()
      .exec();
    const set = new Set<string>();
    for (const b of batches as any[]) {
      for (const sid of b.studentIds || []) set.add(sid.toString());
    }
    return Array.from(set);
  }

  async getStudentIdsByCourseId(courseId: string): Promise<string[]> {
    const batches = await BatchModel.find({ courseId: new Types.ObjectId(courseId) }).select('studentIds').lean().exec();
    const set = new Set<string>();
    for (const b of batches as any[]) {
      for (const sid of b.studentIds || []) set.add(sid.toString());
    }
    return Array.from(set);
  }
}
