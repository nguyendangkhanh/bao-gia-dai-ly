import "server-only";

// Rate limit in-memory, fixed-window theo key (vd theo shortName đại lý).
// LƯU Ý: chỉ đáng tin cậy khi app chạy 1 process dài hạn (next start/PM2).
// Nếu deploy serverless nhiều instance (Vercel), mỗi instance giữ bucket riêng
// nên giới hạn thực tế có thể cao hơn số cấu hình — chấp nhận được cho quy mô
// vài chục đại lý hiện tại, cần chuyển sang store chung (Redis/Upstash) nếu
// cần giới hạn chính xác tuyệt đối.
const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = Number(process.env.PUBLIC_API_RATE_LIMIT_PER_MIN || 60);

const buckets = new Map<string, { count: number; windowStart: number }>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 100) return;
  for (const [key, b] of buckets.entries()) {
    if (now - b.windowStart > DEFAULT_WINDOW_MS * 2) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(
  key: string,
  maxRequests = DEFAULT_MAX_REQUESTS,
  windowMs = DEFAULT_WINDOW_MS,
): RateLimitResult {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (bucket.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: bucket.windowStart + windowMs };
  }

  bucket.count += 1;
  return { allowed: true, remaining: maxRequests - bucket.count, resetAt: bucket.windowStart + windowMs };
}
