---
description: Test data generators, factories and domain types
applyTo: "testdata/**/*.ts,types/**/*.ts"
---

# Test Data Rules

- Generators live in `testdata/<domain>.generator.ts` (or `.factory.ts`); domain types in `types/<domain>.types.ts`.
- Use `@faker-js/faker` only inside generators. Step definitions call the generator and never use inline faker.
  - ✅ `const user = SignupDataGenerator.generateSignupData()`
  - ❌ `{ name: faker.person.fullName() }` in a step
- Generators return typed objects that match an interface from `types/`. No `any`; use `unknown` if the type is uncertain.
- Accept an `overrides` parameter (`Partial` / dedicated overrides type) so scenarios can build negative or boundary data.
- Make values that must be unique (emails, usernames) unique per call, e.g. a timestamp plus a faker token, so parallel workers do not collide.
- Fixed value sets (countries, titles, roles) are `as const` arrays or enums in `types/`, with the union type derived from them.
- Document every public generator method with a short JSDoc comment (what it returns, and what overrides do).
- Generators are static or pure helpers: no side effects, no network calls, no Playwright imports.
- Never hardcode real credentials. Read them from environment variables.
- Use faker locale settings when region-specific data is needed.
- Reuse an existing generator before creating a new one; extend it instead of duplicating it.
