/** Service file: contains business rules and database coordination; controllers call these methods after route validation. */
import { Types } from 'mongoose';
import { CourseModel } from '../../data/models/course.model';

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
  // use of this is:
  // Creates a minimal course record from admin workflows.
  async create(name: string): Promise<{ _id: Types.ObjectId; name: string }> {
    // instructorIds starts empty until instructors are explicitly assigned.
    const created = await CourseModel.create({ name, instructorIds: [] });
    return { _id: created._id as Types.ObjectId, name: created.name };
  }

  // use of this is:
  // Lists all courses for public course cards and admin assignment screens.
  async findAll(): Promise<CourseLean[]> {
    const list = await CourseModel.find().sort({ createdAt: -1 }).lean().exec();
    return list as unknown as CourseLean[];
  }

  // use of this is:
  // Loads one course by id for content/exam/task validation.
  async findById(courseId: string): Promise<CourseLean | null> {
    const course = await CourseModel.findById(courseId).lean().exec();
    return course as unknown as CourseLean | null;
  }

  // use of this is:
  // Resolves course names for notifications, emails, and UI labels.
  async findNamesByIds(courseIds: string[]): Promise<{ id: string; name: string }[]> {
    if (!courseIds?.length) return [];
    const ids = courseIds.map((id) => new Types.ObjectId(id));
    const list = await CourseModel.find({ _id: { $in: ids } }).select('name').lean().exec();
    return (list as any[]).map((c) => ({ id: c._id.toString(), name: c.name ?? 'Course' }));
  }

  // use of this is:
  // Loads many courses in one Mongo query instead of one query per course id.
  async findByIds(courseIds: string[]): Promise<CourseLean[]> {
    if (!courseIds?.length) return [];
    const ids = courseIds.filter((id) => Types.ObjectId.isValid(id)).map((id) => new Types.ObjectId(id));
    if (!ids.length) return [];
    const list = await CourseModel.find({ _id: { $in: ids } }).sort({ createdAt: -1 }).lean().exec();
    return list as unknown as CourseLean[];
  }

  // use of this is:
  // Finds courses assigned to one instructor.
  async findByInstructorId(instructorId: string): Promise<CourseLean[]> {
    const list = await CourseModel.find({ instructorIds: new Types.ObjectId(instructorId) })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return list as unknown as CourseLean[];
  }

  // use of this is:
  // Counts courses assigned to one instructor for dashboard stats.
  async countByInstructorId(instructorId: string): Promise<number> {
    return CourseModel.countDocuments({ instructorIds: new Types.ObjectId(instructorId) }).exec();
  }

  // use of this is:
  // Assigns an instructor to multiple courses without duplicating the id.
  async addInstructorToCourses(instructorId: string, courseIds: string[]): Promise<void> {
    if (!courseIds?.length) return;
    // $addToSet prevents duplicate instructor ids when the same course is assigned twice.
    await CourseModel.updateMany(
      { _id: { $in: courseIds.map((id) => new Types.ObjectId(id)) } },
      { $addToSet: { instructorIds: new Types.ObjectId(instructorId) } },
    ).exec();
  }
}
