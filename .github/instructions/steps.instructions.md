---
description: Rules for BDD step definitions
applyTo: "tests/steps/**/*.ts"
---

# Step Definition Rules

- Place steps in `tests/steps/<domain>/<feature>.steps.ts`; `<domain>` matches the folder under `tests/features/`.
- Import `Given`, `When`, `Then` from `fixtures/ui.fixtures`. Never import them from `playwright-bdd` directly.
- Steps are thin: call page-object methods and fixtures only. No locators, no `expect`, no raw `page` interaction.
  - Actions → page-object action methods; assertions → `expect*` page-object methods.
- Take test data from fixtures or `testdata/` generators. No hardcoded values or inline faker.
- Before adding a step, search all of `tests/steps/` for the same or an overlapping expression. Reuse it; never duplicate.
- Never edit or generalize an existing step. If an expression collides with an existing one, stop and ask.
- Wording and tense follow the feature file exactly; do not rephrase steps.
- Share state between steps through fixtures, not module-level variables.
- No `waitForTimeout` or conditional logic in steps.
