---
description: API clients, services, schemas and mappers
applyTo: "api/**/*.ts"
---

# API Layer Rules

## Structure

- `api/services/<name>.service.ts`: one service per resource, extends `BaseClient` (`api/base.client.ts`).
- `api/endpoints.ts`: all URLs live in `API_ENDPOINTS`. Never hardcode paths in services or tests.
- `api/schemas/<name>.schema.ts`: request/response types and validation schemas.
- `api/mappers/<name>.mapper.ts`: convert domain data (`types/`) to request payloads.
- `api/utils/`: `schema.validator.ts` and `api.guard.ts` helpers.

## Rules

- Services take `APIRequestContext` through `BaseClient` and use `this.request`. Do not create new contexts inside services.
- Service methods return `Promise<APIResponse>` (or a typed result). Assertions stay in tests and steps, not in services.
- Always parse bodies with `parseJson<T>()`; it raises `WafBlockedError` for Cloudflare or HTML responses.
- Validate response bodies with `schema.validator.ts` against the schemas in `schemas/`.
- The target API returns HTTP 200 and signals results in `responseCode` in the body. Assert on `responseCode`, not only on the HTTP status.
- Payload builders default to env-configured credentials (`TEST_USER_EMAIL`, `TEST_USER_PASSWORD`) and accept `Partial` overrides for negative or boundary cases.
- Live API specs use `skipLiveApi` / `SKIP_REASON` from `api/utils/api.guard.ts`, because the site blocks GitHub-hosted runner IPs.
- Never hardcode credentials or tokens, and never log them.
- Use `import type` for types. Always declare return types. Use `async/await` only.
- No UI imports (`ui/`) in `api/`. Test data comes from `testdata/` generators.
- Reuse an existing service before creating a new one.
