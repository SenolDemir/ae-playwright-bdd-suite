# GitHub Copilot Instructions

ae-playwright-bdd-suite

# Project Overview

This project is an AI-augmented test suite using Playwright for end-to-end testing. The suite is designed to leverage AI capabilities to enhance test generation, maintenance, and execution efficiency.

# Stack and Architecture

- **Runtime and package manager**: Node.js, npm
- **Language**: TypeScript (strict mode)
- **Test runner**: Playwright Test
- **BDD for UI tests**: `playwright-bdd` with Gherkin feature files and step definitions
- **UI feature files**: `tests/features/`.
- **UI step definitions**: `tests/steps/`.
- **API testing**: Playwright native `test()` specs with `APIRequestContext`
- **UI architecture**: Page Object Model; page classes live in `ui/pages/`, and reusable Component Objects live in `ui/components/`.
- **API architecture**: API Object Model using domain-specific service/client classes in `api/` and `api/services`
- **API related utilities** live in `api/utils/`
- **Fixtures**: Separate UI and API fixtures in `fixtures/`
- **Test data**: `@faker-js/faker` and centralized data factories in `testdata/`
- **Types**: Shared domain types live in `types/`
- **Configuration**: `dotenv` for environment variables in `.env` files
- **AI tooling**: GitHub Copilot, Playwright MCP, and Playwright Agents.
- **CI/CD**: GitHub Actions
- **Reporting**: Playwright HTML Reporter and Allure Report

# Project general coding standards

## Naming Conventions

- Use PascalCase for class names and interfaces
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (\_)
- Use ALL_CAPS for constants
- Use kebab-case for folder and directory names (e.g. data, page-objects, step-definitions)
- Use lowercase dot-notation for file names, scoped by type: `login.page.ts`, `user.type.ts`, `base.client.ts`, `auth.steps.ts`, `user.factory.ts`

## TypeScript Guidelines

- Always declare explicit return types on functions and methods.
- Never use `any`; use `unknown` and narrow it.
- Use `async/await`; no `.then()` chains.
- Use interfaces for data shapes (test data, API models). Page objects, components, and clients are classes.
- Mark locators and injected dependencies in classes as `readonly`.
- Use type-only imports: `import type { Page, Locator } from '@playwright/test'`.


# Playwright + BDD Rules

### Page Object Rules

- Each page class must extend a `BasePage` class
- Locators are defined as readonly class properties at the top
- No raw selectors allowed inside step definitions or test files
- Methods on page objects should represent user actions, not low-level clicks
  - ✅ `loginPage.submitCredentials(user, pass)`
  - ❌ `page.locator('#btn').click()`


### Locators

Use accessibility-first Playwright locators and avoid brittle selectors.
Before writing or changing any locator, follow the `locator` skill
(.github/skills/locator-strategy/SKILL.md). Do not restate its rules here.

## Test Data Generation

- Use `@faker-js/faker` library for generating realistic test data
- Create factory functions in `testdata/` directory for domain-specific data
- Factory functions should return typed objects matching domain interfaces
- Prefer factories over inline faker calls in step definitions
  - ✅ `const user = UserFactory.createValidUser()`
  - ❌ `const user = { name: faker.person.fullName(), email: faker.internet.email() }`
- Document factory functions with JSDoc comments
- Use faker locale settings for region-specific data when needed

## Playwright Test Generation Rules

### Before generating any test

1. Check if a page object already exists for the page under test
2. If yes — reuse and extend it, do not create a duplicate
3. If no — create the page class first, then the step definitions, then wire to the feature file
4. Check if a test data factory exists for the domain entity
5. If yes — use the factory to generate test data
6. If no — create the factory first, then use it in step definitions
