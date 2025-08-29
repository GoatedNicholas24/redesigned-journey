import app from './app.js';
import { env } from './config/env.js';
const server = app.listen(env.PORT, () => {
    console.log(`API v1 listening on port ${env.PORT}`);
});
process.on('SIGTERM', () => server.close(() => process.exit(0)));
