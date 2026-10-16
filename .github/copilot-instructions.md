# GitHub Copilot Instructions

ae-playwright-bdd-suite

# Project Overview

This project is an AI-augmented test suite using Playwright for end-to-end testing. The suite is designed to leverage AI capabilities to enhance test generation, maintenance, and execution efficiency.

# Stack and Architecture

- **Runtime and package manager**: Node.js, npm
- **Language**: TypeScript (strict mode)
- **Test runner**: Playwright Test
- **BDD for UI tests**: `playwright-bdd` with Gherkin feature files and step definitions
- **API testing**: Playwright native `test()` specs with `APIRequestContext`
- **UI architecture**: Page Object Model with reusable Component Objects
- **API architecture**: API Object Model using domain-specific service/client classes
- **Fixtures**: Separate UI and API fixtures
- **Test data**: `@faker-js/faker` and centralized data generators
- **Configuration**: `dotenv` for environment variables in `.env` files
- **AI tooling**: GitHub Copilot, Playwright MCP, and Playwright Agents.
- **CI/CD**: GitHub Actions
- **Reporting**: Playwright HTML Reporter and Allure Report

## Project map

| Artifact | Path |
|---|---|
| UI feature files | `tests/features/` |
| UI step definitions | `tests/steps/` |
| Hooks and auth setup | `tests/hooks/`, `tests/setup/` |
| API specs | `tests/api/` |
| Page objects (base class: `base.page.ts`) | `ui/pages/` |
| Component objects | `ui/components/` |
| UI fixtures | `fixtures/ui.fixtures.ts` |
| API fixtures | `fixtures/api.fixtures.ts` |
| API services (base class: `base.client.ts`) | `api/services/` |
| API endpoints, schemas, mappers, utils | `api/endpoints.ts`, `api/schemas/`, `api/mappers/`, `api/utils/` |
| Test-data generators | `testdata/` |
| Shared domain types | `types/` |

# Project general coding standards

## Naming Conventions

- Use PascalCase for class names and interfaces
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (\_)
- Use ALL_CAPS for constants
- Use kebab-case for folder and directory names (e.g. data, page-objects)
- Use lowercase dot-notation for file names, scoped by type: `login.page.ts`, `user.type.ts`, `base.client.ts`, `user.factory.ts`

## TypeScript Guidelines

- Always declare explicit return types on functions and methods.
- Never use `any`; use `unknown` and narrow it.
- Use `async/await`; no `.then()` chains.
- Use interfaces for data shapes (test data, API models). Page objects, components, and clients are classes.
- Mark locators and injected dependencies in classes as `readonly`.
- Use type-only imports: `import type { Page, Locator } from '@playwright/test'`.


# Layer-specific rules

Detailed rules load automatically from `.github/instructions/` by file path:

- `tests/features/**` → `features.instructions.md`
- `ui/**` → `page-objects.instructions.md`, `locator.instructions.md`
- `api/**` → `api-layer.instructions.md`
- `testdata/**`, `types/**` → `testdata.instructions.md`

Cross-cutting rule: no raw selectors and no inline faker calls in step definitions or specs.
For finding or fixing locators against a live page, use the `locator` skill (`.github/skills/locator/SKILL.md`).

## Playwright Test Generation Rules

### Before generating any test

1. Check if a page object already exists for the page under test
2. If yes — reuse and extend it, do not create a duplicate
3. If no — create the page class first, then the step definitions, then wire to the feature file
4. Check if a test data factory exists for the domain entity
5. If yes — use the factory to generate test data
6. If no — create the factory first, then use it in step definitions
