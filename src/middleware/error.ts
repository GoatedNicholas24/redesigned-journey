import type { Request } from 'express';
import type { Response } from 'express';
import type { NextFunction } from 'express';
import { ZodError } from 'zod';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: { code: 'not_found', message: 'Not Found' } });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(422).json({ error: { code: 'validation_error', message: 'Validation failed', details: err.flatten() } });
  }
  // structured shape
  const code = err.code ?? 'internal_error';
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';
  res.status(status).json({ error: { code, message, details: err.details ?? null } });
}
