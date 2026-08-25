# GitHub Copilot Instructions

ae-playwright-bdd-suite

# Project Overview

This project is an AI-augmented test suite using Playwright for end-to-end testing. The suite is designed to leverage AI capabilities to enhance test generation, maintenance, and execution efficiency.

# Stack

- **Framework**: Playwright BDD
- **Language**: TypeScript
- **Design Pattern**: Page Object Model (POM)
- **Test Data Generation**: @faker-js/faker
- **AI Augmentation**: GitHub Copilot + Playwright MCP for code suggestions and test generation
- **Reporting**: Playwright built-in reports (current) + Allure Reports (planned)

# Project general coding standards

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (\_)
- Use ALL_CAPS for constants
- Use kebab-case for folder and directory names (e.g. data, page-objects, step-definitions)

## TypeScript Guidelines

- Use strict mode in tsconfig.json
- Always define return types for functions and methods
- Use interfaces for object shapes and page object models
- Avoid using `any` type; use `unknown` if type is uncertain
- Use `async/await` for all asynchronous operations, avoid `.then()` chains
- Use optional chaining (`?.`) and nullish coalescing (`??`) where appropriate
- Use `enum` for fixed sets of values (e.g. test environments, user roles)
- Use `readonly` for properties that should not be reassigned
- Destructure objects and arrays where it improves readability
- Use type imports where possible: `import type { Page } from 'playwright'`

# Playwright + BDD Rules

### Architecture

- Always follow Page Object Model (POM) design pattern
- Page classes live in `pages/` — one file per page/component
- Step definitions live in `steps/`
- Tests (feature files) live in `features/`
- Shared fixtures live in `fixtures/`
- Test data factories and interfaces live in `data/`
- Utility functions live in `utils/`

### Page Object Rules

- Each page class must extend a `BasePage` class
- Locators are defined as readonly class properties at the top
- No raw selectors allowed inside step definitions or test files
- Methods on page objects should represent user actions, not low-level clicks
  - ✅ `loginPage.submitCredentials(user, pass)`
  - ❌ `page.locator('#btn').click()`

### Locator Strategy

**Priority Order (Accessibility-First):**

1. `getByRole(role, { name })`
2. `getByLabel('...')`
3. `getByPlaceholder('...')`
4. `getByTestId('...')` for data-testid attributes only
5. `locator('[data-qa="..."]')` for stable data-qa attributes
   6–8. `getByText('...')`, `getByAltText('...')`, `getByTitle('...')`
   9–11. `locator('[name="..."]')`, `locator('#id')`, CSS selectors (last resort)

Never use: XPath, hashed class names, `.nth()`, `.first()`, `.last()`, `.or()` chains

**Container Scoping:** Use `private readonly` for container locators, `public readonly` for child elements.

> **Full rules, code examples, and scoping patterns: [.github/prompts/locator.prompt.md](.github/prompts/locator.prompt.md)**

## Test Data Generation

- Use `@faker-js/faker` library for generating realistic test data
- Create factory functions in `data/` directory for domain-specific data
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
