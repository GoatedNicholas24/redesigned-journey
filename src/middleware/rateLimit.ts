import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: env.RATE_LIMIT_PER_MIN,
  message: { error: { code: 'too_many_requests', message: 'Too many requests' } }
});

// For auth-sensitive endpoints we can apply a different limiter keyed by user id or IP.
