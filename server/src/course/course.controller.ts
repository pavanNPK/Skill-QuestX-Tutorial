import { Controller, Get } from '@nestjs/common';
import { CourseService, CourseLean } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /** List all courses (full data for Popular Courses / courses list). Any authenticated user. */
  @Get()
  async list() {
    const courses = await this.courseService.findAll();
    return courses.map((c: CourseLean) => ({
      id: c._id.toString(),
      name: c.name,
      title: c.name,
      description: c.description ?? '',
      author: c.author ?? '',
      createdBy: c.createdBy?.toString() ?? null,
      price: c.price ?? 0,
      discount: c.discount ?? 0,
      ratingAverage: c.ratingAverage ?? 0,
      ratingCount: c.ratingCount ?? 0,
      thumbnail: c.thumbnail ?? '',
      accentColor: c.accentColor ?? '#5B4BC4',
    }));
  }
}
