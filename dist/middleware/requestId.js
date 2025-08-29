import { v4 as uuid } from 'uuid';
export function requestId(req, res, next) {
    const id = req.headers['x-request-id'] ?? uuid();
    res.setHeader('x-request-id', id);
    // attach to req for loggers
    req.requestId = id;
    next();
}
