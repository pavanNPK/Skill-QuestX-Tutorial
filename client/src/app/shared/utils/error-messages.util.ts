import { HttpErrorResponse } from '@angular/common/http';

/** Technical messages we must never show to users. */
const TECHNICAL_PATTERNS = [
  /cannot\s+(get|post|put|patch|delete)\s+/i,
  /^\s*\d{3}\s+/,
  /\/api\/|\/auth\/|localhost/i,
  /^\s*not found\s*$/i,
  /internal server error/i,
  /econnrefused|enotfound|network error/i
];

function isTechnicalMessage(msg: string | undefined): boolean {
  if (!msg || typeof msg !== 'string') return true;
  const trimmed = msg.trim();
  if (!trimmed) return true;
  return TECHNICAL_PATTERNS.some((p) => p.test(trimmed));
}

/**
 * Returns a user-friendly message for any auth/API error.
 * Never exposes "Cannot POST ...", status codes, or raw URLs.
 */
export function getFriendlyErrorMessage(
  err: unknown,
  fallbacks: {
    default?: string;
    notFound?: string;
    network?: string;
    server?: string;
  } = {}
): string {
  const defaultMsg = fallbacks.default ?? 'Something went wrong. Please try again.';
  const notFoundMsg = fallbacks.notFound ?? 'Service is temporarily unavailable. Please try again later.';
  const networkMsg = fallbacks.network ?? 'Unable to connect. Please check your connection and try again.';
  const serverMsg = fallbacks.server ?? 'Something went wrong. Please try again later.';

  if (err instanceof HttpErrorResponse) {
    const bodyMessage = err.error?.message;
    const strMessage = Array.isArray(bodyMessage) ? bodyMessage[0] : bodyMessage;
    if (strMessage && typeof strMessage === 'string' && !isTechnicalMessage(strMessage)) {
      return strMessage;
    }
    if (err.status === 0) return networkMsg;
    if (err.status === 404) return notFoundMsg;
    if (err.status >= 500) return serverMsg;
    if (err.status >= 400 && strMessage && typeof strMessage === 'string') {
      if (!isTechnicalMessage(strMessage)) return strMessage;
    }
    return defaultMsg;
  }

  if (err && typeof err === 'object' && 'message' in err) {
    const msg = (err as { message?: string }).message;
    if (msg && typeof msg === 'string' && !isTechnicalMessage(msg)) return msg;
  }

  return defaultMsg;
}
