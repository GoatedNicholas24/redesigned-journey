import { jwtVerify } from 'jose';
import { remoteJwks } from '../config/jwks.js';
import { env } from '../config/env.js';
export async function supabaseAuth(required = true) {
    return async (req, res, next) => {
        const header = String(req.headers.authorization ?? '');
        if (!header.startsWith('Bearer ')) {
            if (required)
                return res.status(401).json({ error: { code: 'token_missing', message: 'Missing Authorization Bearer token' } });
            return next();
        }
        const token = header.slice(7);
        try {
            // Verify with remote JWKS (jose handles kid + caching)
            const { payload } = await jwtVerify(token, remoteJwks, {
                issuer: `${env.SUPABASE_URL.replace(/\/$/, '')}/`,
                // audience could be optional; Supabase's JWT uses client_id sometimes
            });
            // attach minimal user info
            req.auth = {
                sub: String(payload.sub),
                ...(payload['role'] ? { role: payload['role'] } : {}),
                ...(payload['email'] ? { email: payload['email'] } : {}),
                claims: payload
            };
            return next();
        }
        catch (err) {
            // invalid token
            return res.status(401).json({ error: { code: 'invalid_token', message: 'Invalid or expired token' } });
        }
    };
}
export function requireAdmin(req, res, next) {
    const role = req.auth?.role ?? req.auth?.claims?.['role'];
    if (role !== 'admin' && role !== 'ADMIN')
        return res.status(403).json({ error: { code: 'forbidden', message: 'Requires admin' } });
    return next();
}
