// use of this file is:
// Core interceptor file. It runs on HTTP requests/responses before feature code receives them.
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

const DEDUPE_WINDOW_MS = 2500;

interface CacheEntry {
  observable: Observable<HttpEvent<unknown>>;
  createdAt: number;
}

const requestCache = new Map<string, CacheEntry>();

function requestKey(req: HttpRequest<unknown>): string | null {
  // use of this is:
  // Build a cache key only for write requests that users may accidentally double-click.
  const method = req.method.toUpperCase();
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return null;
  }
  let body = '';
  try {
    body = JSON.stringify(req.body ?? {});
  } catch {
    body = '';
  }
  return `${method}:${req.url}:${body}`;
}

export const dedupeInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // use of this is:
  // Reuse the same in-flight write request for a short window to prevent duplicate saves/submits.
  const key = requestKey(req);
  if (!key) {
    return next(req);
  }

  const now = Date.now();
  const entry = requestCache.get(key);
  if (entry && now - entry.createdAt < DEDUPE_WINDOW_MS) {
    return entry.observable;
  }

  const shared = next(req).pipe(
    // shareReplay lets duplicate subscribers receive the same response instead of creating new HTTP calls.
    shareReplay({ bufferSize: 1, refCount: true })
  );

  requestCache.set(key, { observable: shared, createdAt: now });
  setTimeout(() => {
    // Delete only the same cache entry that this timer created.
    if (requestCache.get(key)?.createdAt === now) {
      requestCache.delete(key);
    }
  }, DEDUPE_WINDOW_MS);

  return shared;
};
