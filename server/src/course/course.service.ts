import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

/** Lean (plain) course for list responses - no Document methods. */
export interface CourseLean {
  _id: Types.ObjectId;
  name: string;
  instructorIds: Types.ObjectId[];
}

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  /** Create a course (name only; instructorIds empty). */
  async create(name: string): Promise<{ _id: Types.ObjectId; name: string }> {
    const created = await this.courseModel.create({ name, instructorIds: [] });
    return { _id: created._id, name: created.name };
  }

  /** All courses (for SA). */
  async findAll(): Promise<CourseLean[]> {
    const list = await this.courseModel.find().sort({ createdAt: -1 }).lean().exec();
    return list as unknown as CourseLean[];
  }

  /** Courses where the given user is an instructor. */
  async findByInstructorId(instructorId: string): Promise<CourseLean[]> {
    const id = new Types.ObjectId(instructorId);
    const list = await this.courseModel
      .find({ instructorIds: id })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return list as unknown as CourseLean[];
  }

  /** Count courses taught by this instructor. */
  async countByInstructorId(instructorId: string): Promise<number> {
    const id = new Types.ObjectId(instructorId);
    return this.courseModel.countDocuments({ instructorIds: id }).exec();
  }

  /** Assign instructor to the given courses (add instructorId to each course's instructorIds). */
  async addInstructorToCourses(instructorId: string, courseIds: string[]): Promise<void> {
    if (!courseIds?.length) return;
    const instructorObjId = new Types.ObjectId(instructorId);
    const courseObjIds = courseIds.map((id) => new Types.ObjectId(id));
    await this.courseModel
      .updateMany(
        { _id: { $in: courseObjIds } },
        { $addToSet: { instructorIds: instructorObjId } },
      )
      .exec();
  }
}
