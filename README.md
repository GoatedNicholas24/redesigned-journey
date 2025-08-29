# API Backend — Express + TypeScript + Supabase

## Overview
This project is a versioned REST API backend for a mobile app, built with Express, TypeScript, and Supabase. It features robust middleware, JWT authentication (Supabase + JWKS), Pino logging, Zod validation, rate limiting, and a modular, scalable structure.

---

## Project Structure

```
apps/api
├─ src
│  ├─ server.ts                # Bootstrap + graceful shutdown
│  ├─ app.ts                   # Express app (helmet, cors, json, requestId, logger)
│  ├─ config/
│  │  ├─ env.ts                # Env parsing & validation
│  │  ├─ supabase.ts           # Supabase client helper
│  │  └─ jwks.ts               # JWKS setup + caching
│  ├─ middleware/
│  │  ├─ error.ts              # Zod -> 422, structured error shape
│  │  ├─ auth.ts               # Supabase JWT verification
│  │  ├─ rateLimit.ts          # Per-IP + per-user
│  │  ├─ requestId.ts          # Attach x-request-id
│  │  └─ logger.ts             # Pino request logger
│  ├─ modules/
│  │  ├─ catalog/
│  │  │  ├─ controller.ts
│  │  │  ├─ service.ts
│  │  │  └─ schema.ts
│  │  ├─ products/
│  │  ├─ services/
│  │  ├─ ads/
│  │  ├─ orders/
│  │  │  ├─ controller.ts
│  │  │  ├─ service.ts
│  │  │  └─ schema.ts
│  │  ├─ notifications/
│  │  └─ settings/
│  ├─ db/
│  │  ├─ index.ts              # Query runner
│  │  └─ migrations/
│  ├─ routes.ts                # Mounts /api/v1/*
│  ├─ utils/
│  │  ├─ response.ts           # Response helpers
│  │  └─ pagination.ts
│  └─ tests/
│     ├─ unit/
│     └─ integration/
└─ package.json
```

---

## Features
- **Versioned API**: All endpoints under `/api/v1`. Future versions can be added easily.
- **Authentication**: Supabase JWT validation using JWKS and `jose`.
- **Validation**: Zod for request validation, with structured error responses.
- **Logging**: Pino for JSON logs, with request IDs for traceability.
- **Rate Limiting**: Per-IP and per-user rate limiting.
- **Security**: Helmet, strict CORS, HSTS in production.
- **Observability**: Health (`/healthz`) and readiness (`/readyz`) endpoints.
- **Modular Structure**: Each domain (catalog, products, orders, etc.) is a module.

---

## Suggestions for Further Development
- **User Endpoints**: Add a `users` module for user profile management, e.g. `/api/v1/users/:id`.
- **Products Endpoints**: Implement CRUD for products in `modules/products`.
- **Orders Endpoints**: Implement order creation, listing, and status updates in `modules/orders`.
- **Services/Ads**: Add endpoints for services and ads as needed.
- **Notifications**: Implement push/email notification endpoints.
- **Settings**: Add user or app settings endpoints.
- **Testing**: Expand unit and integration tests for all modules and middleware.
- **API Docs**: Integrate Swagger or Redoc for live API documentation.
- **CI/CD**: Add GitHub Actions or similar for automated testing and deployment.

---

## User Guide

### Prerequisites
- Node.js v18+
- Supabase project (get your `SUPABASE_URL` and `SUPABASE_ANON_KEY`)
- PostgreSQL (if using direct DB access)

### Setup
1. **Install dependencies**
   ```sh
   npm install
   # or
   pnpm install
   ```
2. **Configure environment variables**
   - Create a `.env` file or set variables in your environment:
     - `SUPABASE_URL` (e.g. `https://xyzcompany.supabase.co`)
     - `SUPABASE_ANON_KEY`
     - `PORT` (default: 4000)
     - `CLIENT_ORIGINS` (comma-separated, e.g. `http://localhost:5173`)
     - `RATE_LIMIT_PER_MIN` (default: 60)

3. **Run the server**
   ```sh
   npm run dev
   # or
   pnpm dev
   ```

4. **Test authentication**
   - Get a valid Supabase access token (from your app or Supabase dashboard).
   - Call a protected endpoint:
     ```sh
     curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:4000/api/v1/catalog/feed
     ```

5. **Project structure**
   - Add new modules under `src/modules/` for new domains (e.g. `users`, `products`).
   - Add controllers, services, and schemas as needed.

### Adding a New Endpoint Example
1. Create a new folder under `src/modules/` (e.g. `users`).
2. Add `controller.ts`, `service.ts`, and `schema.ts`.
3. Register the controller in `src/routes.ts`:
   ```ts
   import users from './modules/users/controller';
   // ...
   router.use('/users', users);
   ```
4. Implement your endpoint logic and validation.

---

## Contributing
- Fork and clone the repo.
- Create a feature branch.
- Add or update tests for your changes.
- Open a pull request.

---

## License
MIT
