import { shareReplay } from 'rxjs';
const DEDUPE_WINDOW_MS = 2500;
const requestCache = new Map();
function requestKey(req) {
    const method = req.method.toUpperCase();
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        return null;
    }
    let body = '';
    try {
        body = JSON.stringify(req.body ?? {});
    }
    catch {
        body = '';
    }
    return `${method}:${req.url}:${body}`;
}
export const dedupeInterceptor = (req, next) => {
    const key = requestKey(req);
    if (!key) {
        return next(req);
    }
    const now = Date.now();
    const entry = requestCache.get(key);
    if (entry && now - entry.createdAt < DEDUPE_WINDOW_MS) {
        return entry.observable;
    }
    const shared = next(req).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    requestCache.set(key, { observable: shared, createdAt: now });
    setTimeout(() => {
        if (requestCache.get(key)?.createdAt === now) {
            requestCache.delete(key);
        }
    }, DEDUPE_WINDOW_MS);
    return shared;
};
