---
description: Call an automationexercise.com API endpoint, capture real responses, and generate draft-07 JSON Schemas (consumer contracts)
---

# Generate JSON Schemas for API Testing

## Context

I'm building an API test automation portfolio project using **Playwright + TypeScript** targeting `https://automationexercise.com/api/`. This is an undocumented demo API. There are no official docs, no Swagger/OpenAPI spec, and no requirements. All API behavior is discovered by exploring the site.

My project architecture:
- **API Object Model**: each domain has a client class in `src/clients/` with typed request/response methods.
- **API testing** uses Playwright's native `test()` spec structure with the built-in `request` fixture (NOT `pw-api-plugin`). BDD/Gherkin is used for UI tests only, so do not generate Gherkin.
- **Schema validation** uses the `playwright-ajv-schema-validator` npm package.
- **Schemas** are plain JSON Schema files in `src/schemas/`, one file per response shape (success, error), each a standalone schema with no wrapper object.
- **Test data** is generated with `@faker-js/faker`.
- Do not modify files in `src/clients/`, `src/fixtures/` or `tests/`. Only create files in `src/schemas/`.

## Your Task

Call the endpoint below, capture real responses, then generate **plain JSON Schemas (draft-07)** from them. This is a **consumer contract**: it defines what my tests depend on, not an official API spec. Never write a schema from memory or assumption. Every schema must be based on responses you actually captured in this run.

## Input

- Base URL: `https://automationexercise.com/api`
- Endpoint: `${input:method} ${input:path}` (path is relative to the base URL, e.g. `productsList`)
- Request parameters (if any): `${input:params:none}`
- Error case to trigger (if any): `${input:errorCase:none}` (e.g. `POST with no body` for `productsList`)

## Step 1: Collect samples (do this before writing any schema)

1. Run `date +%F` and use the result as the "Last verified" date.
2. Call the endpoint **twice** with `curl` using the method and parameters above. For each call, capture the status, content type and raw body:
```bash
   curl -s -w "\nHTTP_STATUS:%{http_code}\nCONTENT_TYPE:%{content_type}\n" -X <METHOD> "<BASE_URL>/<PATH>" [params]
```
3. If the endpoint accepts parameters whose values change the output (e.g. a search term), use **different** parameter values for the two calls.
4. If an error case was given, trigger it **once** and capture it the same way. If none was given, do not invent one.
5. Safety: calls other than `GET` change data on a shared demo site. Before running any non-GET call, tell me exactly what you will send and wait for my confirmation. Use throwaway values (Faker-style, unique emails), never my real credentials from `.env`.
6. Show me a short summary of the captured samples (HTTP status, body `responseCode`, top-level keys per sample) before generating schemas.

## Step 2: Generate schemas

### Schema Design Rules

1. **Use JSON Schema draft-07** (`"$schema": "http://json-schema.org/draft-07/schema#"`) in every schema.
2. **`additionalProperties: true`** at every object level. The demo API may add fields without notice, and I don't want false failures.
3. **Validate structure, not volatile values:**
   - DO require known fields with `type`. Add `minLength: 1` to a string only if it is non-empty in every sample; if any sample shows `""`, omit `minLength`. For numbers, use a sensible `minimum`.
   - DO NOT use `const` or `enum` for values that may change (product names, counts, prices, URLs, messages).
   - DO use `const` only for the `responseCode` field, set to the value observed in the body for that schema (e.g. `200`, `404`, `405`).
4. **Required fields only when consistent.** Mark a field `required` only if it appears in **every** sample of that response type. Never compare a success sample against an error sample. Two samples is the minimum evidence; mention in the `$comment` how many samples were used.
5. **Fully define nested objects and arrays.** Define the item schema for every array. Never use `{}` or a bare `{"type": "object"}` without `properties`. For arrays of objects, only require item fields that are present in every item of every sample.
6. **Arrays that should not be empty** (e.g. a product list on a success response) get `"minItems": 1`. Numeric IDs get `"minimum": 1`.
7. **Don't over-constrain string formats.** Use `format: "email"` or `format: "uri"` only when the field is clearly that type. Do not guess formats, and do not use `pattern` unless I ask.
8. **Type correctness.** `type` must match the actual data. If a field is `"price": "Rs. 1000"`, the type is `string`, not `number`. Read the samples literally and never "fix" types.
9. **Body vs HTTP status.** This API frequently returns HTTP 200 with the real status in the body's `responseCode`. Treat `responseCode` as a body field, not the HTTP status. Do not conflate the two.
10. **Positive and