import { Router } from 'express';
import { asyncHandler } from '../middleware/async-handler';
import { services } from '../services';

export function courseRoutes(): Router {
  const router = Router();
  router.get('/', asyncHandler(async (_req, res) => {
    const courses = await services.courseService.findAll();
    res.json(courses.map((c) => ({
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
    })));
  }));
  return router;
}
