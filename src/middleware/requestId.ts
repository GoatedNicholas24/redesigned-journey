import type { Request } from 'express';
import type { Response } from 'express';
import type { NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = req.headers['x-request-id'] as string | undefined ?? uuid();
  res.setHeader('x-request-id', id);
  // attach to req for loggers
  (req as any).requestId = id;
  next();
}
