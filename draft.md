
# 🎭 AI-Augmented Playwright BDD Test Suite

![Playwright](https://img.shields.io/badge/Playwright-1.63.0-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![playwright-bdd](https://img.shields.io/badge/playwright--bdd-9.2.0-brightgreen?logo=cucumber&logoColor=white)
![Faker.js](https://img.shields.io/badge/%40faker--js%2Ffaker-10.4.0-F7DF1E?logo=javascript&logoColor=black)
![Allure Reports](https://img.shields.io/badge/Allure_Reports-3.9.0-E85A2B?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgMjJoMjBMMTIgMnoiLz48L3N2Zz4=&logoColor=white)
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
    - [Playwright BDD over Cucumber.js?](#playwright-bdd-over-cucumberjs)
    - [Hybrid Test Style: BDD for UI, Native Spec for API](#hybrid-test-style-bdd-for-ui-native-spec-for-api)
    - [Resilient Locator Strategy](#resilient-locator-strategy)
    - [Page Object Model](#page-object-model)
  - [AI Augmentation](#ai-augmentation)
    - [GitHub Copilot](#github-copilot)
    - [Playwright MCP (Model Context Protocol)](#playwright-mcp-model-context-protocol)
    - [Playwright Agents](#playwright-agents)
    - [Test Generation with Playwright Agents](#test-generation-with-playwright-agents)
    - [Self-Healing Strategy](#self-healing-strategy)
  - [Environment Management](#environment-management)
  - [Test Data Strategy](#test-data-strategy)
  - [CI/CD](#cicd)
    - [Local Parity](#local-parity)
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
  - [Visual Regression (with Playwright)](#visual-regression-with-playwright)
  - [References](#references)

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
│   │   ├── playwright-bdd-planner.agent.md
│   │   ├── playwright-bdd-generator.agent.md
│   │   ├── playwright-test-generator.agent.md
│   │   ├── playwright-test-healer.agent.md
│   │   └── playwright-test-planner.agent.md
│   ├── prompts/               # Reusable Copilot prompt files
│   │   ├── auth-login.prompt.md
│   │   ├── consent-overlay.prompt.md
│   │   ├── debugger.prompt.md
│   │   └── locator.prompt.md
│   ├── workflows/             # GitHub Actions CI workflows
│   │   ├── ci-e2e-test.yml
│   │   ├── ci-e2e-sharded.yml
│   │   └── copilot-setup-steps.yml
│   └── copilot-instructions.md
│
├── tests/
│   ├── features/              # Gherkin feature files (BDD / UI tests)
│   │   ├── auth/
│   │   │   ├── login.feature
│   │   │   └── signup.feature
│   │   └── product/
│   │       └── product-catalog.feature
│   ├── steps/                 # Step definitions (BDD / UI tests)
│   │   ├── auth/
│   │   │   ├── login.steps.ts
│   │   │   └── signup.step.ts
│   │   └── product/
│   │       └── product-catalog.ts
│   ├── api/                   # Playwright native API spec tests
│   │   ├── auth/
│   │   │   ├── login.api.spec.ts
│   │   │   └── signup.api.spec.ts
│   │   └── product/
│   │       └── product.api.spec.ts
│   └── hooks/                 # Global and test-specific hooks
│       └── Hook.ts
│
├── src/
│   ├── pages/                 # Page Object Model classes
│   │   ├── base.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   ├── signup.page.ts
│   │   ├── account-setup.page.ts
│   │   ├── product.page.ts
│   │   └── product-detail.page.ts
│   ├── components/            # Component Object classes
│   │   └── navbar.component.ts
│   ├── clients/               # API Object Model — one client per domain
│   │   ├── base.client.ts
│   │   ├── login.client.ts
│   │   ├── signup.client.ts
│   │   └── product.client.ts
│   ├── fixtures/              # Playwright fixture definitions
│   │   ├── ui.fixtures.ts
│   │   └── api.fixtures.ts
│   ├── data/                  # Faker factories & data interfaces
│   │   └── signup.generator.ts
│   ├── types/                 # Shared TypeScript type definitions
│   │   └── signup.types.ts
│   └── api-models/
│       └── login.api-model.ts
│
├── reports/                   # Generated test reports (git-ignored)
│   ├── playwright-html/
│   ├── allure-results/        # Raw Allure JSON data
│   └── allure-report/         # Generated Allure HTML report
│
├── .env                       # Local environment variables (git-ignored)
├── playwright.config.ts
├── tsconfig.json
└── package.json
```


## Architecture Overview

The project is built over the following key design decisions:

### Playwright BDD over Cucumber.js?
`playwright-bdd` bridges Playwright's fixture system directly with Gherkin step definitions. This means:
- BDD steps have full access to Playwright fixtures (`page`, `context`, custom fixtures like `signup.page`)
- No separate test runner: Playwright **is** the runner; reports, retries, and parallelism all come from Playwright natively
- `bddgen` generates the glue code automatically, zero boilerplate per feature file
- Read this article to explore more: [Playwright × BDD: Cucumber.js vs Playwright-bdd](https://www.arrangility.com/blog/playwright-cucumber-vs-playwright-bdd)

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

### Page Object Model

Each significant page of the application has a corresponding Page Object class. Responsibilities include:
- Encapsulating locators (using semantic/role-based selectors)
- Exposing high-level action methods (e.g., `login(email, password)`)
- Keeping assertions out of the POM layer (separation of concerns)

**Component Objects** 
Reusable UI fragments that appear across multiple pages are extracted into Component Object classes. This avoids duplicating locator definitions and interaction logic across multiple Page Objects. 

**API Object Model (AOM)**
Mirrors the POM philosophy applied to API interactions. Each domain (Users, Products, Cart, etc.) has a dedicated client class with strongly typed request/response methods, reused across both API spec tests and UI test setup hooks.

## AI Augmentation

The project showcases AI-augmented testing approach where AI tools enhance every layer of the test automation stack with human review ensuring correctness and quality.  The key point  human expertise + AI capability working together. It's distinct from fully automated testing with AI which gives less control. By this way it helps minimizing manual effort while maximizing coverage and maintainability.

AI Augmentation layers are:

### GitHub Copilot
Used throughout the authoring workflow for:
- Suggesting step definition implementations from Gherkin text
- Auto-completing TypeScript types and interface definitions
- Refactoring repetitive locator patterns
- Debugging error, fails.

### Playwright MCP (Model Context Protocol)

To be able to AI models to interact with external tools/platforms the project enhanced with Playwright MCP. 


### Playwright Agents
Playwright Agents extend AI assistance beyond code generation into the full test lifecycle, covering test case development and locator self-healing. 

### Test Generation with Playwright Agents

Playwright provides a built-in planner agent, however it is not designed to generate bdd (Gherkin) feature files with scenarios and scenario steps. To use agents for this workflow two custom agents are built based on Playwright's agents structure.
- playwright-bdd-planner
- playwright-bdd-generator

**playwright-bdd-planner**

This agent:
- Receives a test basis scope (feature charter) via chat prompt
- Produces a raw feature file including scenarios and step definitions
- Applies standard test design techniques: equivalence partitioning, boundary value analysis, happy path, edge case, and negative scenarios

Rather than scoping the agent to an entire feature at once, feature charters are preferred. Validating one focused slice of behavior at a time builds more confidence than evaluating a large batch at once. It also prevents the AI from mixing primary flows, edge cases, and unrelated page behaviors together.


**playwright-bdd-generator**

Takes a reviewed .feature file from the `_review/` folder as input and handles the implementation phase. It inspects the live DOM via Playwright MCP, then decides whether to create a new Page Object class or extend an existing one. Alongside page objects, it wires new fixtures and generates any missing test data factories. 

It follow locator strategy to implement resilient locator structure.

### Self-Healing Strategy

Test resilience is maintained through two layers:
- **Resilient Locator Strategy (preventive)** — semantic and role-based locators are preferred at authoring time to minimize the chance of locator breakage across UI changes (see Resilient Locator Strategy above)
  
- **Playwright Healer Agent** — implemented via playwright-test-healer. By this agent a semi-automated healing loop on failure is provided. It replays the failing steps to reproduce the failure, inspect the current UI to locate equivalent elements or flows,  suggest a pacth to heal root cause, finally re-run the tests until passes.


## Environment Management

Environmental configurations and data is managed via `dotenv`. By this way:
- Keep secrets out of source code like API keys, passwords, and URLs live in .env. 
- Environment specific config: easily swap values between local, staging, and production without changing code
- Separates configuration from code, a widely accepted best practice and it is simple to use.

## Test Data Strategy

Dynamic test data is generated at runtime using `@faker-js/faker`. By help of this tool:

- No hardcoded test data that can become stale
- Each test run uses unique data, avoiding state conflicts between runs
- Realistic data shapes (valid email formats, real-looking names and addresses)

It is designed with a **centralized data strategy** to ensure consistency across the testing lifecycle. This approach ensures that test data is generated once and shared across all layers—from UI form entries to API payloads.


---

## CI/CD 

Continuous integration is implemented with **GitHub Actions**, mirroring the same npm scripts used locally (`bddgen`, `playwright test`)

| Workflow                      | File                 | Purpose                                                                                         |
| ----------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| Playwright E2E Test           | `ci-e2e-test.yml`    | Runs the full UI + API suite in a single job and publishes Playwright + Allure reports          |
| Playwright E2E Test (Sharded) | `ci-e2e-sharded.yml` | Splits the UI/API suite across 5 parallel shards, then merges blob reports into one HTML report |  |

### Local Parity

Every CI job calls the same npm scripts documented in [Running Tests](#running-tests) (`tests`, `test:sharded`), so a workflow failure can always be reproduced locally with the identical command.

> [!Note]
> All workflows currently trigger on `workflow_dispatch` (manual run) only. `pull_request` and scheduled `cron` triggers are ready to be enabled, and also `repository_dispatch` can be added to integrate CI pipeline.


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

There is no `.env.example` file — create a `.env` file manually at the project root with the following keys:

```bash
# Playwright execution
HEADLESS_MODE=true
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

# Run tests in headed mode (visible browser)
npx bddgen && npx playwright test --headed --project=chromium
# or set HEADLESS_MODE=false in .env

# Run a specific feature file
npx bddgen && npx playwright test login.feature --project=chromium
# equivalent to: npm run test:specific

# Run a specific API spec
npx playwright test tests/api/auth/login.api.spec.ts

# Filter tests by name or tag
npx playwright test --grep "login" -i

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

---

## Visual Regression (with Playwright)

**[ae-visual-regression-suite](https://github.com/SenolDemir/ae-visual-regression-suite)** — 
A visual regression testing suite built for the same [automationexercise.com](https://www.automationexercise.com/) target. It covers pixel-diff snapshot comparisons, responsive-layout screenshots across mobile/tablet/desktop breakpoints, cross-browser rendering comparisons, and automated horizontal-overflow detection. It is kept separate from this repo to isolate OS/browser-specific baseline snapshots from the BDD/API suite.

---

## References

- **[Playwright × BDD: Cucumber.js vs Playwright-bdd](https://www.arrangility.com/blog/playwright-cucumber-vs-playwright-bdd)** — A practical comparison of the two BDD integration approaches for Playwright, covering fixture compatibility, runner behaviour, and boilerplate trade-offs.

- **[Test Design Techniques — ISTQB Foundation Syllabus](https://istqb-main-web-prod.s3.amazonaws.com/media/documents/ISTQB-CTFL_Syllabus_2023_v4.0.1.pdf)** — The Authoritative reference for equivalence partitioning, boundary value analysis, and decision table testing techniques that applied by the `playwright-bdd-planner` agent during scenario generation.

- **[Playwright Test Agents in 2026: what works, what breaks, and what's next](https://bug0.com/blog/playwright-test-agents)** — A realistic evaluation of Playwright's agent capabilities including generation, healing, and the boundaries of current AI assistance. Referenced in the [Playwright Agents](#playwright-agents) section.

- **[How to Handle Playwright Page Objects - Nawaz Dhandalag](https://oneuptime.com/blog/post/2026-02-02-playwright-page-objects/view)** — Covers how to decompose Page Objects into smaller component abstractions to the Component Object Model applied in this project's `/components` layer.
  
- **[Gojko Adzic — Specification by Example (Manning, 2011)](https://gojko.net/books/specification-by-example/)** — The book that defined "living documentation" as the primary value of BDD.


---

<div align="center">

Crafted with ☕ and precision by a QA engineer who believes good test requires continuous evolution.

</div>