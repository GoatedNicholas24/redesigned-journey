import pino from 'pino';
import * as pinoHttp from 'pino-http';
import { env } from '../config/env.js';
export const logger = pino({ level: env.NODE_ENV === 'development' ? 'debug' : 'info' });
export const httpLogger = (pinoHttp.default ?? pinoHttp)({ logger, genReqId: (req) => req.requestId });
