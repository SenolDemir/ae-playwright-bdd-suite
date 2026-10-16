---
description: Gherkin feature file conventions for the BDD suite
applyTo: "tests/features/**/*.feature"
---

# Feature File Rules

## Location and naming

- Features live in `tests/features/<domain>/<feature-name>.feature` (kebab-case), e.g. `auth/login.feature`.
- Drafts awaiting review go to `tests/features/_review/` and are moved to their domain folder once approved. Draft filenames follow the planner convention `{domain}-{feature-name}-{scenario-type}.feature`.

## Structure

- One `Feature:` per file, with an `As a / I want / So that` description.
- Use `Rule:` / `Background:` / `Scenario:` structure. Put shared setup in `Background`.
- Use `Scenario Outline` with an `Examples` table for data-driven cases.
- Strict Given/When/Then. Scenario titles state the exact case being tested.
- A scenario tests one behaviour. Keep it independent of other scenarios.

## Tags

- Feature level: `@ui @{feature-id} @{domain} @{feature-name}`, e.g. `@ui @ui02 @auth @login`.
- Scenario level: `@{feature-id}-{n} @positive` or `@{feature-id}-{n} @negative`, e.g. `@ui02-3 @negative`. The number is unique within the feature.
- Optional status tags: `@wip` (in progress), `@fail @bug-<name>` (known bug).

## Steps

- Reuse the exact wording of existing steps (search `tests/features/` and `tests/steps/`). Do not paraphrase or create variants. Add new wording only when no existing step applies.
- Write steps in business language: no selectors, URLs, CSS or implementation details.
- `Then` steps assert exact messages observed in the application, not guessed text.
- Do not hardcode real credentials in steps. Use generated or env-provided data (see the testdata instructions) and prefer steps that do not embed secrets.
