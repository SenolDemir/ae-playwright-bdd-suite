
# 🎭 AI-Augmented Playwright BDD Test Suite

![Playwright](https://img.shields.io/badge/Playwright-1.64.0-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![playwright-bdd](https://img.shields.io/badge/playwright--bdd-9.2.0-brightgreen?logo=cucumber&logoColor=white)
![Faker.js](https://img.shields.io/badge/%40faker--js%2Ffaker-10.4.0-F7DF1E?logo=javascript&logoColor=black)
![Allure Reports](https://img.shields.io/badge/Allure_Reports-3.9.0-E85A2B?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgMjJoMjBMMTIgMnoiLz48L3N2Zz4=&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4.6.5-3E67B1?logo=zod&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.22.3-339933?logo=nodedotjs&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-17.3.1-ECD53F?logo=dotenv&logoColor=black)


> A production-grade test automation portfolio project targeting [automationexercise.com](https://www.automationexercise.com/) — combining Playwright, TypeScript, BDD, AI Agents and other AI-assisted tooling into a modern, resilient testing framework.

---

## Table of Contents

- [🎭 AI-Augmented Playwright BDD Test Suite](#-ai-augmented-playwright-bdd-test-suite)
	- [Table of Contents](#table-of-contents)
	- [Project Overview](#project-overview)
	- [Tech Stack](#tech-stack)
	- [Project Structure](#project-structure)
	- [Architecture Overview](#architecture-overview)
		- [Playwright BDD](#playwright-bdd)
		- [Hybrid Test Style: BDD for UI, Native Spec for API](#hybrid-test-style-bdd-for-ui-native-spec-for-api)
		- [Resilient Locator Strategy](#resilient-locator-strategy)
		- [Page Object Model (POM)](#page-object-model-pom)
		- [API Testing](#api-testing)
		- [Visual Regression (with Playwright)](#visual-regression-with-playwright)
		- [Environment Management](#environment-management)
		- [Test Data Strategy](#test-data-strategy)
	- [AI Augmentation](#ai-augmentation)
		- [GitHub Copilot](#github-copilot)
		- [Playwright MCP](#playwright-mcp)
		- [Playwright Agents](#playwright-agents)
			- [`playwright-bdd-planner`](#playwright-bdd-planner)
			- [`playwright-bdd-generator`](#playwright-bdd-generator)
		- [Self-Healing Strategy](#self-healing-strategy)
	- [CI/CD Integration](#cicd-integration)
	- [Limitations](#limitations)
		- [Login and logout behavior in API tests](#login-and-logout-behavior-in-api-tests)
		- [Cloudflare blocking in CI](#cloudflare-blocking-in-ci)
		- [Weak input validation in the signup flow](#weak-input-validation-in-the-signup-flow)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Recommended VS Code Extensions](#recommended-vs-code-extensions)
		- [Installation](#installation)
		- [Environment Setup](#environment-setup)
	- [Running Tests](#running-tests)
	- [Parallel Execution](#parallel-execution)
		- [Current Setup](#current-setup)
		- [To run in a custom configuration:](#to-run-in-a-custom-configuration)
		- [Cross-Browser Parallel](#cross-browser-parallel)
		- [API Tests](#api-tests)
	- [Retries](#retries)
		- [Current Setup](#current-setup-1)
		- [Enabling Retries Locally](#enabling-retries-locally)
	- [Reporting](#reporting)
		- [Playwright HTML Report](#playwright-html-report)
		- [Allure Report](#allure-report)
		- [Reporting in CI](#reporting-in-ci)
	- [References](#references)
	- [Contributing](#contributing)
	- [License](#license)

---

## Project Overview

This project is a **portfolio-grade test automation framework** built to demonstrate modern QA engineering practices. It targets the publicly available e-commerce demo site [AutomationExercise.com](https://www.automationexercise.com/) as the system under test, covering both **UI** and **API** test scenarios.

The framework is built on three core pillars:

1. **BDD-first for UI** — UI tests are written in Gherkin (`.feature` files), making them readable by non-technical stakeholders and serving as living documentation of system behavior.
2. **Resilient by design** — Locator strategies prioritize semantic, accessible, and role-based selectors over brittle CSS or XPath expressions, reducing test flakiness.
3. **AI-augmented** — Development velocity and test quality are enhanced by integrating GitHub Copilot, Playwright Agents and Playwright MCP into the authoring workflow.

The project was built without a formal requirements document. All user stories and acceptance criteria were derived by **exploratory testing** of the live application, reflecting real-world scenarios where testers must infer behavior from existing products.

---

## Tech Stack

| Layer           | Technology                                                   |
| --------------- | ------------------------------------------------------------ |
| Test Runner     | [Playwright](https://playwright.dev/)                        |
| Language        | [TypeScript](https://www.typescriptlang.org/) (strict mode)  |
| BDD Layer       | [playwright-bdd](https://vitalets.github.io/playwright-bdd/) |
| UI Pattern      | Page Object Model (POM)                                      |
| API Testing     | Playwright built-in `APIRequestContext` + API Object Model   |
| API Validation  | [Zod](https://zod.dev/) request and response schemas          |
| Test Data       | [@faker-js/faker](https://fakerjs.dev/)                      |
| Env Management  | [dotenv](https://github.com/motdotla/dotenv)                 |
| AI Augmentation | GitHub Copilot + Playwright Agents + Playwright MCP          |
| Reporting       | Playwright HTML Report + Allure Report                       |

---

## Project Structure

```
root/
├── .github/
│   ├── agents/                # Custom Copilot agent definitions
│   ├── prompts/               # Reusable Copilot prompt files
│   ├── skills/
│   │   ├── auth-login/        # On-demand Copilot skill: authenticated login
│   │   └── consent-overlay/   # On-demand Copilot skill: consent overlay handling
│   ├── workflows/             # GitHub Actions CI workflows (API, E2E, sharded E2E, Copilot setup)
│   └── copilot-instructions.md
│
├── .vscode/                   # Workspace settings and MCP server config
│
├── tests/
│   ├── features/
│   │   ├── auth/              # Gherkin feature files: login, signup
│   │   └── product/           # Gherkin feature files: product catalog
│   ├── steps/
│   │   ├── auth/              # Step definitions: login, signup
│   │   └── product/           # Step definitions: product catalog
│   ├── api/
│   │   ├── auth/              # Playwright native API specs: login, signup
│   │   └── product/           # Playwright native API specs: product
│   ├── setup/                 # Setup projects (e.g. authentication state)
│   └── hooks/                 # Global and test-specific hooks
│
├── ui/
│   ├── pages/                 # Page Object Model classes
│   └── components/            # Component Object classes
│
├── fixtures/                  # Playwright fixture definitions (UI and API)
│
├── testdata/                  # Faker-based test data generators
│
├── types/                     # Shared domain TypeScript type definitions
│
├── api/                       # API Object Model
│   ├── endpoints.ts           # Central registry of endpoint path constants
│   ├── base.client.ts         # Thin shared client base (JSON parsing, WAF detection)
│   ├── mappers/               # Domain data → wire payload transforms
│   ├── schemas/               # Zod request/response schemas and inferred types
│   ├── services/              # One service per domain, each extends base.client.ts
│   └── utils/                 # Schema validator and live-API CI guard
│
├── docs/
│   ├── notes.md               # Project notes and known limitations
│   └── signup/                # Sample signup request/response payloads
│
├── reports/                   # Generated test reports (git-ignored)
│   ├── playwright-html/
│   ├── allure-results/        # Raw Allure JSON data
│   └── allure-report/         # Generated Allure HTML report
│
├── .env                       # Local environment variables (git-ignored)
├── .mcp.json                  # MCP server configuration
├── playwright.config.ts
├── tsconfig.json
└── package.json
```


## Architecture Overview

The project is built over the following key design decisions:

### Playwright BDD

The project uses **Playwright BDD** to create reusable, business-readable UI tests. Gherkin scenarios describe application behavior from a product perspective, making the tests easier to understand and maintain.

`playwright-bdd` is preferred because it bridges Playwright’s fixture system directly with Gherkin step definitions. As a result:
- BDD steps have full access to Playwright fixtures, including `page`, `context`, and custom fixtures such as `signup.page`
- Playwright remains the native test runner, so reports, retries, and parallel execution are handled by Playwright
- `bddgen` automatically generates the step-definition glue code, reducing boilerplate for each feature file

### Hybrid Test Style: BDD for UI, Native Spec for API
UI tests use Gherkin feature files via `playwright-bdd`. They document user-facing journeys in a language accessible to all stakeholders. API tests use Playwright's native `test()` spec structure, which is more concise and better suited to HTTP-level assertions without the overhead of mapping Gherkin steps to request/response logic.

### Resilient Locator Strategy
Locators are selected in this priority order to maximize resilience against UI changes:

1. **Semantic / ARIA role locators** — `getByRole('button', { name: 'Login' })`
2. **Label-based locators** — `getByLabel('Email Address')`
3. **Placeholder locators** — `getByPlaceholder('Enter email')`
4. **Text locators** — `getByText('Proceed to Checkout')`
5. **Test IDs** — `getByTestId('submit-btn')` *(where available)*
6. **CSS selectors** — used only as a last resort

This approach aligns with how assistive technologies interact with the DOM, making tests inherently more accessible and less brittle than XPath or class-based selectors.

### Page Object Model (POM)

The framework applies the **Page Object Model (POM)** for UI automation and follows a similar service-object approach for API automation. 

**Page Objects**
Each significant page of the application has a corresponding Page Object class. Page Objects encapsulate locators and expose high-level action methods, keeping these implementation details outside the test layer. This improves reusability, maintainability, and readability while keeping test assertions clean.

**Component Objects**
Reusable UI fragments that appear across multiple pages are extracted into Component Object classes. This avoids duplicating locator definitions and interaction logic across multiple Page Objects.

**API Service Objects**
The API layer mirrors the POM philosophy for API interactions. Each domain, such as Users, Products, and Cart, has a dedicated service class that extends the shared `api/base.client.ts`.

### API Testing

API tests use Playwright's native `test()` spec structure, as described in [Hybrid Test Style](#hybrid-test-style-bdd-for-ui-native-spec-for-api).  The target is a demo app that publishes no OpenAPI/Swagger specification, so the [Zod](https://zod.dev/) schemas in `api/schemas/` are derived from observed endpoint responses and act as the de facto contract. Zod provides both runtime validation and inferred TypeScript types for requests and responses.

```text
types/signup.types.ts        shared domain: SignupData
    ↓
testdata/signup.generator.ts Faker → SignupData
    ↓
api/schemas/                 Zod: SignupPayload (wire format), response schemas
    ↓
api/mappers/                 SignupData → SignupPayload (parsed by the schema)
    ↓
fixtures/api.fixtures.ts     composes generator + mapper, builds services
    ↓                      		
api/services/                send payloads to api/endpoints.ts paths via
    ↓                      
tests					     playwright tests
```

> [!Note]
> Some limitations were encountered during API test development. These are described in the [Limitations](#limitations) section.


### Visual Regression (with Playwright)

A visual regression testing suite built for the target application. It covers pixel-diff snapshot comparisons, responsive-layout screenshots breakpoints, cross-browser rendering comparisons, and automated horizontal-overflow detection. It is kept separate from this repo to isolate OS/browser-specific baseline snapshots from the BDD/API suite. To check it
**[ae-visual-regression-suite](https://github.com/SenolDemir/ae-visual-regression-suite)**


### Environment Management

Environmental configurations and data is managed via `dotenv`. By this way:
- Keep secrets out of source code like API keys, passwords, and URLs live in .env. 
- Environment specific config: easily swap values between local, staging, and production without changing code
- Separates configuration from code, a widely accepted best practice and it is simple to use.

### Test Data Strategy

Dynamic test data is generated at runtime using `@faker-js/faker`. By help of this tool:

- No hardcoded test data that can become stale
- Each test run uses unique data, avoiding state conflicts between runs
- Realistic data shapes (valid email formats, real-looking names and addresses)

It is designed with a **centralized data strategy** to ensure consistency across the testing lifecycle. This approach ensures that test data is generated once and shared across all layers—from UI form entries to API payloads.


## AI Augmentation

The project follows an **AI-augmented testing approach**: AI tools accelerate test design, implementation, and maintenance, while human review ensures correctness, quality, and alignment with the intended test strategy.

The key principle is combining **human expertise with AI capability**. Unlike fully autonomous AI testing, this approach keeps the tester in control while reducing manual effort and improving coverage and maintainability. AI augmentation is implemented through the following tools and actors:

### GitHub Copilot

GitHub Copilot provides AI assistance throughout the authoring workflow, including:

- Suggesting step-definition implementations from Gherkin text
- Auto-completing TypeScript types and interfaces
- Refactoring repetitive locator patterns
- Supporting debugging and error analysis

### Playwright MCP

Playwright MCP enables GitHub Copilot and Playwright Agents to interact with the application under test. It provides the live browser context needed to inspect the DOM, validate locators, and support context-aware test generation.

### Playwright Agents

Playwright Agents extend AI assistance beyond code generation into the full test lifecycle, including test-case development and locator self-healing. Playwright provides a built-in planner agent, but it is not designed to generate BDD/Gherkin feature files containing scenarios and scenario steps. Therefore, two custom agents were created based on Playwright’s agent structure:

- `playwright-bdd-planner`
- `playwright-bdd-generator`

#### `playwright-bdd-planner`

- Receives a focused test basis, called a **feature charter**, through a chat prompt
- Produces a draft `.feature` file containing scenarios and scenario steps
- Applies standard test-design techniques, including equivalence partitioning, boundary value analysis, happy-path, edge-case, and negative scenarios

Using focused feature charters instead of generating an entire feature at once keeps each AI-assisted output reviewable and prevents unrelated behaviors from being mixed into one scenario set.

#### `playwright-bdd-generator`

This agent takes a reviewed `.feature` file from the `_review/` folder and handles the implementation phase. It inspects the live DOM through Playwright MCP, then decides whether to create a new Page Object class or extend an existing one.

In addition to Page Objects, it wires the required fixtures and generates missing test-data factories. It follows the project’s resilient locator strategy to create maintainable and robust locator implementations.

### Self-Healing Strategy

Test resilience is maintained through two layers:
- **Resilient Locator Strategy (preventive)** — semantic and role-based locators are preferred at authoring time to minimize the chance of locator breakage across UI changes (see Resilient Locator Strategy above)
  
- **Playwright Healer Agent** — implemented via playwright-test-healer. By this agent a semi-automated healing loop on failure is provided. It replays the failing steps to reproduce the failure, inspect the current UI to locate equivalent elements or flows,  suggest a pacth to heal root cause, finally re-run the tests until passes.


---

## CI/CD Integration

Continuous integration is implemented with **GitHub Actions**, mirroring the same npm scripts used locally (`bddgen`, `playwright test`)

| Workflow                      | File                 | Purpose                                                                                         |
| ----------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| Playwright E2E Test           | `ci-e2e-test.yml`    | Runs the full UI + API suite in a single job and publishes Playwright + Allure reports          |
| Playwright E2E Test (Sharded) | `ci-e2e-sharded.yml` | Splits the UI/API suite across 5 parallel shards, then merges blob reports into one HTML report |  |

All workflows currently trigger on `workflow_dispatch` (manual run) only. `pull_request` and scheduled `cron` triggers are ready to be enabled, and also `repository_dispatch` can be added to integrate CI pipeline.

**Local Parity**
Every CI job calls the same npm scripts documented in [Running Tests](#running-tests) (`tests`, `test:sharded`), so a workflow failure can always be reproduced locally with the identical command.

> [!Note]
> Some limitations were encountered during API test development. These are described in the [Limitations](#limitations) section.


## Limitations

Because the target is a public demo site, a few constraints shaped the test design. Each is documented below along with how the project handles it.

### Login and logout behavior in API tests

The `verifyLogin` endpoint only validates an email and password pair; it does not create a session. The `sessionid` cookie is issued only by the site's own login form at `/login`. Logging out invalidates the session on the server but does not remove the cookie from the client, so the cookie remains present while the server no longer accepts it.

To demonstrate this, `web-session.api.spec.ts` performs login and logout over plain HTTP without a browser. These tests are **not part of the main API suite**. They exist purely as a showcase of how the application behaves.

### Cloudflare blocking in CI

API tests fail on GitHub-hosted runners because requests are blocked, most likely because Cloudflare flags the runners' shared IP ranges as suspicious traffic. The tests and the application are not at fault: the same tests pass on a local machine or any trusted network.

To keep the pipeline meaningful, API tests are **automatically skipped when `CI` is set**, with a message explaining why. They run normally locally, on a self-hosted runner, or when the skip is explicitly overridden (see `<your override variable>`).

### Weak input validation in the signup flow

The signup form accepts clearly invalid input, for example a name made up only of digits or special characters. These scenarios are tagged `@fail` in the feature files so they stay visible as known defects, rather than being removed or having their assertions weakened to match the app's behavior. 

>Note: These constraints reflect situations real projects run into, like bot protection and known defects, and each one is handled with an explicit, documented decision.

---

## Getting Started

### Prerequisites

- Node.js `>= 20.x` (the project currently uses Node.js `22.22.3`)
- npm `>= 9.x`

### Recommended VS Code Extensions

| Extension                       | Purpose                                                                 |
| ------------------------------- | ----------------------------------------------------------------------- |
| Playwright Test for VSCode      | Test runner integration, debugging, and one-click test execution        |
| Cucumber (Gherkin) Full Support | Syntax highlighting and step definition navigation for `.feature` files |
| Prettier                        | Consistent code formatting                                              |
| dotenv                          | secure and modular management of environments                           |
| npm Intellisense                | Autocomplete for npm module imports                                     |
| GitHub Copilot                  | AI-powered code suggestions and test generation                         |

---

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ae-playwright-bdd-suite.git
cd ae-playwright-bdd-suite

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

The project includes a `.env.example` file listing every environment variable it uses. Create your local `.env` by copying it, then fill in your own values:

```bash
cp .env.example .env
```

```bash
# Playwright execution
MAXIMIZED_WINDOW=false
BASE_URL=https://www.automationexercise.com/

# API
API_BASE_URL=https://automationexercise.com/api/

# Test user credentials
TEST_USER_EMAIL=your_test_user@example.com
TEST_USER_PASSWORD=your_test_user_password
```


## Running Tests

```bash
# Run all tests (UI + API)
npm run tests

# Run UI tests only (chromium project)
npm run test:ui-all

# Run UI tests filtered by tag
npm run test:ui-tag

# Run API tests only
npm run test:api-all

# Run API tests filtered by tag
npm run test:api-tag
#or by specifying the tag as
npx playwright test --grep @tagname

# Browser mode: headed locally, headless in CI (controlled by the CI env var in playwright.config.ts)
# Force headless locally:
CI=true npx bddgen && CI=true npx playwright test --project=chromium

# Run a specific feature file
npx bddgen && npx playwright test login.feature --project=chromium
# equivalent to: npm run test:specific

# Run a specific API spec
npx playwright test tests/api/auth/login.api.spec.ts

# Open the Playwright HTML report after a run
npm run report
```

---

## Parallel Execution

### Current Setup

| Setting         | Local  | CI     |
| --------------- | ------ | ------ |
| `fullyParallel` | `true` | `true` |
| `workers`       | `3`    | `1`    |

`workers` is derived directly from `process.env.CI` in [playwright.config.ts](playwright.config.ts)

### To run in a custom configuration:

**1. Via CLI flag (recommended)**
```bash
npx playwright test --workers=8
```

**2. Via config change**
```ts
// playwright.config.ts
workers: process.env.CI ? 1 : 3,
```
Edit the local branch (`3`) directly if you want a different default worker count.

### Cross-Browser Parallel

Three browser projects (`chromium`, `firefox`, `webkit`) are set up. Tests are run alongside these browsers.

To run specific browser:

```bash
npx playwright test --project=chromium
```
To run multiple browsers explicitly:
```bash
npx playwright test --project=chromium --project=firefox
```
### API Tests

The `api` project has no worker override, so it inherits the global `workers` value and runs in parallel already.

---

## Retries

### Current Setup

```ts
// playwright.config.ts
retries: process.env.CI ? 2 : 0,
```

Locally: retries: 0 — no retries. A flaky test will fail immediately on first attempt.   
In CI: retries: 2 — a failed test is retried up to 2 more times before being marked as failed.


### Enabling Retries Locally
To enable retries locally for debugging flaky tests, you can change configuration to 1 or 2, or give run the test with `--retries` flag.
```bash
npx playwright test --retries=2
```

Or scope it to a specific context

```bash
npx bddgen && npx playwright test --retries=2 login.feature --project=chromium
npx playwright test --retries=2 tests/api/auth/login.api.spec.ts --project=api
```

---


## Reporting

This project supports two complementary reporting mechanisms: quick local feedback and rich analytical reporting.

### Playwright HTML Report

Built into Playwright. Generated automatically after each test run.

```bash
# Open the report after running tests
npx playwright show-report reports/playwright-html
# or: npm run report
```

### Allure Report

Provides advanced analytics including historical trends, test categorization, environment info, and custom widgets.

```bash
# Generate the Allure report from collected results
npx allure generate reports/allure-results --clean -o reports/allure-report

# Open the report in a browser
npx allure open reports/allure-report
```

### Reporting in CI

Both E2E workflows (`ci-e2e-test.yml` and `ci-e2e-sharded.yml`) generate a GitHub Actions job summary and a Playwright HTML report, which is uploaded as a downloadable workflow artifact. In addition, `ci-e2e-test.yml` generates an Allure report and publishes it to GitHub Pages.

| Workflow             | GitHub job summary | Playwright HTML report                       | Allure report    |
| -------------------- | ------------------ | -------------------------------------------- | ---------------- |
| `ci-e2e-test.yml`    | ✅                  | ✅ (artifact)                                 | ✅ (GitHub Pages) |
| `ci-e2e-sharded.yml` | ✅                  | ✅ (artifact, merged from shard blob reports) | ❌                |

The latest Allure report from `ci-e2e-test.yml` is available here:
👉 [Latest Allure Report](https://senoldemir.github.io/ae-playwright-bdd-suite/)


---

## References

- **[Playwright × BDD: Cucumber.js vs Playwright-bdd](https://www.arrangility.com/blog/playwright-cucumber-vs-playwright-bdd)** — A practical comparison of the two BDD integration approaches for Playwright, covering fixture compatibility, runner behaviour, and boilerplate trade-offs.

- **[Test Design Techniques — ISTQB Foundation Syllabus](https://istqb-main-web-prod.s3.amazonaws.com/media/documents/ISTQB-CTFL_Syllabus_2023_v4.0.1.pdf)** — The Authoritative reference for equivalence partitioning, boundary value analysis, and decision table testing techniques that applied by the `playwright-bdd-planner` agent during scenario generation.

- **[Playwright Test Agents in 2026: what works, what breaks, and what's next](https://bug0.com/blog/playwright-test-agents)** — A realistic evaluation of Playwright's agent capabilities including generation, healing, and the boundaries of current AI assistance. Referenced in the [Playwright Agents](#playwright-agents) section.

- **[How to Handle Playwright Page Objects - Nawaz Dhandalag](https://oneuptime.com/blog/post/2026-02-02-playwright-page-objects/view)** — Covers how to decompose Page Objects into smaller component abstractions to the Component Object Model applied in this project's `/components` layer.
  
- **[Gojko Adzic — Specification by Example (Manning, 2011)](https://gojko.net/books/specification-by-example/)** — The book that defined "living documentation" as the primary value of BDD.


---

## Contributing

This is primarily a personal portfolio project, but suggestions and PRs demonstrating alternative testing approaches are welcome.

- Follow the coding standards in [.github/copilot-instructions.md](.github/copilot-instructions.md)
- Use the [locator strategy](.github/prompts/locator.prompt.md) for any new selectors
- Make sure to update or add tests as appropriate

## License

[MIT License](LICENSE)

<div align="center">

----

Crafted with ☕ and precision by a QA engineer who believes good test requires continuous evolution.

</div>