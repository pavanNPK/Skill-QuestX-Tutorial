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

  /** Unique student IDs enrolled in the given batches. */
  async getStudentIdsByBatchIds(batchIds: string[]): Promise<string[]> {
    if (!batchIds?.length) return [];
    const ids = batchIds.map((id) => new Types.ObjectId(id));
    const batches = await this.batchModel
      .find({ _id: { $in: ids } })
      .select('studentIds')
      .lean()
      .exec();
    const set = new Set<string>();
    for (const b of batches as any[]) {
      for (const sid of b.studentIds || []) {
        set.add(sid.toString());
      }
    }
    return Array.from(set);
  }

  /** Unique student IDs in any batch of the given course. */
  async getStudentIdsByCourseId(courseId: string): Promise<string[]> {
    const batches = await this.batchModel
      .find({ courseId: new Types.ObjectId(courseId) })
      .select('studentIds')
      .lean()
      .exec();
    const set = new Set<string>();
    for (const b of batches as any[]) {
      for (const sid of b.studentIds || []) {
        set.add(sid.toString());
      }
    }
    return Array.from(set);
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
