import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Batch, BatchDocument } from './schemas/batch.schema';
import { CourseService } from '../course/course.service';

/** Lean batch with populated courseId (name only). */
export interface BatchLean {
  _id: Types.ObjectId;
  name: string;
  courseId: Types.ObjectId | { _id: Types.ObjectId; name: string };
  studentIds: Types.ObjectId[];
}

@Injectable()
export class BatchService {
  constructor(
    @InjectModel(Batch.name) private batchModel: Model<BatchDocument>,
    private courseService: CourseService,
  ) {}

  /** All batches (for SA). */
  async findAll(): Promise<BatchLean[]> {
    const list = await this.batchModel
      .find()
      .populate('courseId', 'name')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return list as unknown as BatchLean[];
  }

  /** Batches for given course IDs. */
  async findByCourseIds(courseIds: Types.ObjectId[]): Promise<BatchLean[]> {
    if (!courseIds?.length) return [];
    const list = await this.batchModel
      .find({ courseId: { $in: courseIds } })
      .populate('courseId', 'name')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return list as unknown as BatchLean[];
  }

  /** Count batches where the given user is an instructor (course's instructorIds includes userId). */
  async countBatchesByInstructorId(instructorId: string): Promise<number> {
    const courses = await this.courseService.findByInstructorId(instructorId);
    const courseIds = courses.map((c) => c._id);
    if (!courseIds.length) return 0;
    return this.batchModel.countDocuments({ courseId: { $in: courseIds } }).exec();
  }

  /** Unique student IDs enrolled in any batch of courses taught by this instructor. */
  async getStudentIdsForInstructor(instructorId: string): Promise<Types.ObjectId[]> {
    const courses = await this.courseService.findByInstructorId(instructorId);
    const courseIds = courses.map((c) => c._id);
    if (!courseIds.length) return [];
    const batches = (await this.batchModel
      .find({ courseId: { $in: courseIds } })
      .select('studentIds')
      .lean()
      .exec()) as unknown as BatchLean[];
    const set = new Set<Types.ObjectId>();
    for (const b of batches) {
      for (const id of b.studentIds || []) {
        set.add(id);
      }
    }
    return Array.from(set);
  }
}
