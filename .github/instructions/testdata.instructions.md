---
description: Test data generators, factories and domain types
applyTo: "testdata/**/*.ts,types/**/*.ts"
---

# Test Data Rules

- Generators live in `testdata/<domain>.generator.ts` (no I/O, no Playwright imports); domain types in `types/<domain>.types.ts`.
- Check existing generators first; extend one rather than creating a duplicate.
- Return the domain type from `types/`, never an untyped object.
- Accept optional overrides so negative scenarios reuse the generator (`generateSignupData({ email: "invalid" })`).
- Make values that must be unique (emails, usernames) unique per call, e.g. a timestamp plus a faker token, so parallel workers do not collide.
- All data comes from generators. Page objects and steps never call faker directly.
- Never hardcode credentials. The existing test user comes from `TEST_USER_EMAIL` / `TEST_USER_PASSWORD`, read outside generators and passed in as parameters.
- Fixed value sets (countries, titles, roles) are `as const` arrays or enums in `types/`, with the union type derived from them.
- For invalid-input scenarios, pass the value from the step parameter as an override to the `testdata/` generator (`generateSignupData({ name })`). Do not build the object by hand.
