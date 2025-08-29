// jose Remote JWK set with caching
import { createRemoteJWKSet } from 'jose';
import { env } from './env.js';

const jwksUrl = env.JWKS_PATH ?? `${env.SUPABASE_URL.replace(/\/$/, '')}/auth/v1/.well-known/jwks.json`;
export const remoteJwks = createRemoteJWKSet(new URL(jwksUrl));

// createRemoteJWKSet has built-in caching behaviour governed by HTTP cache headers.
