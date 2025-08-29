import { z } from 'zod';

const raw = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  CLIENT_ORIGINS: z.string().default('http://localhost:5173'),
  SUPABASE_URL: z.string().default('https://bbgpafulnowlgduckgie.supabase.co'),
  SUPABASE_ANON_KEY: z.string().default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ3BhZnVsbm93bGdkdWNrZ2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMDE5NjIsImV4cCI6MjA1Mzg3Nzk2Mn0.Su5j3p4Lc1b-Wfskks6Ogh7IzSlsKTJZVy5jHNflHd0'), // default anon key for local dev
  JWKS_PATH: z.string().default('https://bbgpafulnowlgduckgie.supabase.co/auth/v1/jwks'), // optional override
  RATE_LIMIT_PER_MIN: z.coerce.number().default(60),
});

const parsed = raw.parse(process.env);
export const env = parsed;
