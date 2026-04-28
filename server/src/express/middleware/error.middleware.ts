import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/http-error';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ statusCode: 404, message: `Cannot ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof HttpError) {
    res.status(error.status).json({ statusCode: error.status, message: error.message });
    return;
  }

  if (error instanceof Error && error.message.includes('Invalid file type')) {
    res.status(400).json({ statusCode: 400, message: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ statusCode: 500, message: 'Internal server error' });
}
