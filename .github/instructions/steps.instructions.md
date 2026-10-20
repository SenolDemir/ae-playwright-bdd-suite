---
description: Rules for BDD step definitions
applyTo: "tests/steps/**/*.ts"
---

# Step Definition Rules

- Place steps in `tests/steps/<domain>/<feature>.steps.ts`; `<domain>` matches the folder under `tests/features/`.
- Import `Given`, `When`, `Then` from `fixtures/ui.fixtures` (created via `createBdd(test)`), so steps get the custom fixtures. Never import them from `playwright-bdd` directly.
- Steps are thin: call page-object methods and fixtures only. No locators, no `expect`, no raw `page` interaction.
  - Actions → page-object action methods; assertions → `expect*` page-object methods.
- Valid test data comes from fixtures or `testdata/` generators. No hardcoded values or inline faker in steps.
- For invalid-input scenarios, start from a generated valid object and override only the field under test with the value from the step parameter (`{ ...validUser, name: name }`). Do not build the whole object by hand.
- Before adding a step, search `tests/steps/` for the same or an overlapping expression and reuse it. Duplicates cause ambiguous-step errors in `bddgen`.
- Never edit or generalize an existing step. If a new expression collides with an existing one, do not write it; report the collision and the conflicting file instead.
- The step expression must match the feature file text exactly. Never edit a feature file to fit a step; if they disagree, report it.
- Share state between steps through fixtures, not module-level variables (tests run in parallel).
- No conditional logic or `waitForTimeout` in steps.