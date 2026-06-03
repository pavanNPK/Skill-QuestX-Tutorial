/** Controller file: translates Fastify requests into service method calls and returns API DTOs. */
import { services } from '../../business/services';

export class CourseController {
  // use of this is:
  // Lists public course cards for the frontend course catalogue.
  // This controller maps Mongo documents into stable API DTOs so Angular does not depend on raw Mongoose shape.
  async listCourses() {
    // CourseService hides the database query; controller only handles the HTTP response shape.
    const courses = await services.courseService.findAll();
    // Each document is converted to plain JSON fields expected by the existing Angular screens.
    return courses.map((c) => ({
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

export const courseController = new CourseController();
