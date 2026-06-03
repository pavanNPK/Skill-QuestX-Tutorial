/** Core utility file: provides reusable framework-safe helpers for routes, controllers, and services. */
export class HttpError extends Error {
  // use of this is:
  // Wraps an HTTP status with a message so services can throw framework-safe API errors.
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

// use of these helpers is:
// Services/controllers call readable helpers instead of repeating new HttpError(status, message).
export const badRequest = (message: string): HttpError => new HttpError(400, message);
export const unauthorized = (message: string): HttpError => new HttpError(401, message);
export const forbidden = (message: string): HttpError => new HttpError(403, message);
export const conflict = (message: string): HttpError => new HttpError(409, message);
