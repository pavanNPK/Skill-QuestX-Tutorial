import { Types } from 'mongoose';
import { CourseModel } from '../models/course.model';

export interface CourseLean {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  author?: string;
  createdBy?: Types.ObjectId | null;
  price?: number;
  discount?: number;
  ratingAverage?: number;
  ratingCount?: number;
  thumbnail?: string;
  accentColor?: string;
  instructorIds: Types.ObjectId[];
}

export class CourseService {
  async create(name: string): Promise<{ _id: Types.ObjectId; name: string }> {
    const created = await CourseModel.create({ name, instructorIds: [] });
    return { _id: created._id as Types.ObjectId, name: created.name };
  }

  async findAll(): Promise<CourseLean[]> {
    const list = await CourseModel.find().sort({ createdAt: -1 }).lean().exec();
    return list as unknown as CourseLean[];
  }

  async findNamesByIds(courseIds: string[]): Promise<{ id: string; name: string }[]> {
    if (!courseIds?.length) return [];
    const ids = courseIds.map((id) => new Types.ObjectId(id));
    const list = await CourseModel.find({ _id: { $in: ids } }).select('name').lean().exec();
    return (list as any[]).map((c) => ({ id: c._id.toString(), name: c.name ?? 'Course' }));
  }

  async findByInstructorId(instructorId: string): Promise<CourseLean[]> {
    const list = await CourseModel.find({ instructorIds: new Types.ObjectId(instructorId) })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return list as unknown as CourseLean[];
  }

  async countByInstructorId(instructorId: string): Promise<number> {
    return CourseModel.countDocuments({ instructorIds: new Types.ObjectId(instructorId) }).exec();
  }

  async addInstructorToCourses(instructorId: string, courseIds: string[]): Promise<void> {
    if (!courseIds?.length) return;
    await CourseModel.updateMany(
      { _id: { $in: courseIds.map((id) => new Types.ObjectId(id)) } },
      { $addToSet: { instructorIds: new Types.ObjectId(instructorId) } },
    ).exec();
  }
}
