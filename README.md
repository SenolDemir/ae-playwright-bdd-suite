# 🎭 AE Playwright AI-Augmented BDD Suite

> A production-grade test automation portfolio project targeting [AutomationExercise.com](https://www.automationexercise.com/) — combining Playwright, TypeScript, BDD, AI Agents and other AI-assisted tooling into a modern, resilient testing framework.

---

## Table of Contents

- [🎭 AE Playwright AI-Augmented BDD Suite](#-ae-playwright-ai-augmented-bdd-suite)
	- [Table of Contents](#table-of-contents)
	- [Project Overview](#project-overview)
			- [Why playwright-bdd over cucumber.js?](#why-playwright-bdd-over-cucumberjs)
	- [Tech Stack](#tech-stack)
	- [Architecture Overview](#architecture-overview)
		- [Layer Responsibilities](#layer-responsibilities)
	- [Project Structure](#project-structure)
	- [Key Design Decisions](#key-design-decisions)
		- [Hybrid Test Style: BDD for UI, Native Spec for API](#hybrid-test-style-bdd-for-ui-native-spec-for-api)
		- [Resilient Locator Strategy](#resilient-locator-strategy)
		- [Page Object Model](#page-object-model)
		- [Service Object Pattern (API)](#service-object-pattern-api)
	- [AI Augmentation](#ai-augmentation)
		- [GitHub Copilot](#github-copilot)
		- [Playwright MCP (Model Context Protocol)](#playwright-mcp-model-context-protocol)
		- [Playwright Agents](#playwright-agents)
		- [Locator Healing with Playwright Healer Agent](#locator-healing-with-playwright-healer-agent)
	- [Environment Variables](#environment-variables)
	- [Test Data Strategy](#test-data-strategy)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Recommended VS Code Extensions](#recommended-vs-code-extensions)
	- [| GitHub Copilot                  | AI-powered code suggestions and test generation                         |](#-github-copilot-------------------ai-powered-code-suggestions-and-test-generation-------------------------)
		- [Installation](#installation)
		- [Environment Setup](#environment-setup)
	- [Running Tests](#running-tests)
	- [UI Testing](#ui-testing)
	- [API Testing](#api-testing)
	- [Reporting](#reporting)
		- [Playwright HTML Report](#playwright-html-report)
		- [Allure Report](#allure-report)

---

## Project Overview

This project is a **portfolio-grade test automation framework** built to demonstrate modern QA engineering practices. It targets the publicly available e-commerce demo site [AutomationExercise.com](https://www.automationexercise.com/) as the system under test, covering both **UI** and **API** test scenarios.

The framework is built on three core pillars:

1. **BDD-first for UI** — UI tests are written in Gherkin (`.feature` files), making them readable by non-technical stakeholders and serving as living documentation of system behavior.
2. **Resilient by design** — Locator strategies prioritize semantic, accessible, and role-based selectors over brittle CSS or XPath expressions, reducing test flakiness.
3. **AI-augmented** — Development velocity and test quality are enhanced by integrating GitHub Copilot and Playwright MCP into the authoring workflow.

#### Why playwright-bdd over cucumber.js?
`playwright-bdd` bridges Playwright's fixture system directly with Gherkin step definitions. This means:
- BDD steps have full access to Playwright fixtures (`page`, `context`, custom fixtures like `signup.page`)
- No separate test runner: Playwright **is** the runner; reports, retries, and parallelism all come from Playwright natively
- `bddgen` generates the glue code automatically, zero boilerplate per feature file
- Raed this article to explore more: [Playwright × BDD: Cucumber.js vs Playwright-bdd](https://www.arrangility.com/blog/playwright-cucumber-vs-playwright-bdd)

The project was built without a formal requirements document — all user stories and acceptance criteria were derived by **exploratory testing** of the live application, reflecting real-world scenarios where testers must infer behavior from existing products.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Test Runner | [Playwright](https://playwright.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| BDD Layer | [playwright-bdd](https://vitalets.github.io/playwright-bdd/) |
| UI Pattern | Page Object Model (POM) |
| API Testing | Playwright built-in `APIRequestContext` + Service Object Pattern |
| Test Data | [@faker-js/faker](https://fakerjs.dev/) |
| Env Management | [dotenv](https://github.com/motdotla/dotenv) |
| Reporting | Playwright HTML Report + Allure Report |
| AI Tooling | GitHub Copilot + Playwright Agents + Playwright MCP |

---

## Architecture Overview

The framework is organized into distinct layers, each with well-defined responsibilities. UI tests flow from Gherkin feature files through step definitions into the Page Object Model, while API tests use Playwright's native spec structure backed by the Service Object layer. Both layers share common supporting utilities.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         UI Test Layer (BDD)                              │
│                  .feature files written in Gherkin                       │
└─────────────────────────────┬────────────────────────────────────────────┘
					│
┌─────────────────────────────▼────────────────────────────────────────────┐
│                        Step Definitions                                  │
│            TypeScript functions binding Gherkin steps to code            │
└──────────────────┬───────────────────────────────────────────────────────┘
			 │
┌──────────────────▼──────────────┐    ┌─────────────────────────────────┐
│       Page Object Model         │    │       API Test Layer            │
│    (UI – browser actions)       │    │  Playwright native .spec.ts     │
│    pages/ + fixtures/           │    │  api-tests/ grouped by domain   │
└──────────────────┬──────────────┘    └──────────────┬──────────────────┘
			 │                                  │
┌──────────────────▼──────────────┐    ┌──────────────▼──────────────────┐
│      Playwright Browser         │    │      Service Object Layer       │
│   (Chromium / Firefox / WebKit) │    │  services/ wrapping             │
│                                 │    │  APIRequestContext              │
└──────────────────┬──────────────┘    └───────────────┬─────────────────┘
			 │                                   │
┌──────────────────▼───────────────────────────────────▼──────────────────┐
│                          Supporting Utilities                           │
│             faker-js  │  dotenv  │  fixtures  │  hooks  │  helpers      │
└─────────────────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

**Feature Files (`/features`)**  
Gherkin scenarios describing UI behavior from the user's perspective. These act as living documentation, readable by developers, testers, and business stakeholders alike. Applies to UI tests only.

**Step Definitions (`/steps`)**  
TypeScript functions that bind each Gherkin step to executable code. Steps are kept thin, they orchestrate calls to Page Objects rather than containing logic themselves.

**Page Object Model (`/pages`)**  
Each significant page of the application has a corresponding Page Object class. Responsibilities include:
- Encapsulating locators (using semantic/role-based selectors)
- Exposing high-level action methods (e.g., `login(email, password)`)
- Keeping assertions out of the POM layer (separation of concerns)

**API Tests (`/api-tests`)**  
API tests are implemented using Playwright's native `test()` structure (`.spec.ts` files), organized by domain. They do not use BDD/Gherkin — instead, they follow a direct spec style that is more natural for HTTP-level assertions without the overhead of mapping Gherkin steps to request/response logic. All HTTP interactions are delegated to the Service Object layer.

**Service Object Layer (`/services`)**  
Provides a clean abstraction over Playwright's `APIRequestContext`. Each domain (Users, Products, Cart, etc.) has a dedicated Service class with strongly typed request/response methods, reused across both API spec tests and UI test setup hooks.

**Fixtures (`/fixtures`)**  
Playwright fixtures extend the base test context to inject Page Objects, Service Objects, and shared configuration — keeping step definitions and spec files clean and enabling dependency injection across the suite.

---

## Project Structure

```
├── features/                  # Gherkin feature files (UI tests only)
│   └── auth/
│   └── product/
├── steps/                     # Step definition files (UI tests only)
│   └── auth/
│   └── product/
├── pages/                     # Page Object Model classes
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── register.page.ts
│   ├── products.page.ts
│   └── ...
├── api-tests/                 # Playwright native API spec tests
│   ├── user.spec.ts
│   ├── products.spec.ts
│   └── ...
├── services/                  # Service Object classes (API layer)
│   ├── base.service.ts
│   ├── user.service.ts
│   ├── product.service.ts
│   └── ...
├── fixtures/                  # Playwright fixture definitions
│   └── ui.fixtures.ts
│   └── api.fixtures.ts
├── hooks/                     # Global and test-specific hooks
│   └── hooks.ts
├── test-data/                 # Factories and interfaces for test data
│   └── ...
├── utils/                     # Utility functions and helpers
│   └── helpers.ts
├── reports/                   # Generated test reports (git-ignored)
│   ├── playwright-html/
│   └── allure-results/
├── .env                       # Local environment variables (git-ignored)
├── playwright.config.ts       # Playwright configuration
└── package.json
```

---

## Key Design Decisions

### Hybrid Test Style: BDD for UI, Native Spec for API
UI tests use Gherkin feature files via `playwright-bdd` — they document user-facing journeys in a language accessible to all stakeholders. API tests use Playwright's native `test()` spec structure, which is more concise and better suited to HTTP-level assertions without the overhead of mapping Gherkin steps to request/response logic.

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
POMs follow strict separation of concerns:
- **No assertions inside POMs** — POMs return data or perform actions; assertions live in step definitions or spec files.
- **Fluent interfaces** where appropriate — methods return `this` or the next logical POM to support method chaining.
- **Single Responsibility** — each class maps to one page or significant component.

### Service Object Pattern (API)
Mirrors the POM philosophy applied to API interactions:
- Each `*Service` class encapsulates all API calls for a given domain.
- Methods are strongly typed with request params and response interfaces.
- `BaseService` handles shared config — base URL, default headers, authentication.
- Service classes are reusable across both API spec tests and UI test fixtures (e.g., pre-creating a user via API before a UI scenario).

---

## AI Augmentation

This framework treats AI as a **first-class development accelerator**, integrated at two levels:

### GitHub Copilot
Used throughout the authoring workflow for:
- Generating boilerplate POM and Service classes from page/endpoint descriptions
- Suggesting step definition implementations from Gherkin text
- Auto-completing TypeScript types and interface definitions
- Refactoring repetitive locator patterns


### Playwright MCP (Model Context Protocol)
Playwright MCP enables AI models to interact with a live browser session. In this project it is used to:
- **Explore the application** and auto-generate initial locator suggestions
- **Record interaction patterns** that are then refined into Page Object methods
- **Validate locator resilience** by having the AI verify selectors against the live DOM

### Playwright Agents
Playwright Agents extend AI assistance beyond code generation into the full test lifecycle, covering test case development and locator self-healing.

**Test Case Development with Playwright Agents**  
Playwright provides a built-in planner agent; however, since a BDD-based framework is used, it is not designed to generate Gherkin feature files with scenarios and scenario steps. For this purpose, a custom agent — playwright-bdd-planner — has been created. This agent:
- Receives a test basis scope (feature charter) via chat prompt
- Produces a raw feature file including scenarios and step definitions
- Appends an Exploration Map and Observations & Anomalies section for human review
- Applies standard test design techniques: equivalence partitioning, boundary value analysis, happy path, edge case, and negative scenarios

Rather than scoping the agent to an entire feature at once, feature charters are preferred. Validating one focused slice of behavior at a time builds more confidence than evaluating a large batch at once. It also prevents the AI from mixing primary flows, edge cases, and unrelated page behaviors together — which makes prioritization and automation harder.

The feature charter and any additional instructions are provided to the agent via chat prompt. The agent generates the feature file into a dedicated review folder, where a human reviewer completes the test case development process.

### Locator Healing with Playwright Healer Agent
Test resilience is maintained through a two-pronged approach:
- Resilient Locator Strategy (preventive) — semantic and role-based locators are preferred at authoring time to minimize the chance of locator breakage across UI changes (see Resilient Locator Strategy above).
- Playwright Healer Agent (reactive) — when locator failures do occur, the healer agent inspects the live DOM, identifies the closest matching element, and proposes an updated locator. This keeps the suite maintainable without requiring manual triage for every UI change.

Together, these two layers provide defense-in-depth: the locator strategy reduces the frequency of failures, and the healer agent reduces the cost of recovery when failures do occur.

>The goal is not to replace engineering judgment, but to accelerate the scaffolding, exploration, and recovery phases — keeping focus on test design quality rather than boilerplate authoring or manual locator maintenance.

>The goal is not to replace engineering judgment, but to accelerate the scaffolding and exploration phases — keeping focus on test design quality rather than boilerplate authoring.

---

## Environment Variables

All sensitive configuration is managed via `dotenv`. Never commit your `.env` file — use `.env.example` to document required variables.

| Variable             | Description                | Example                                  |
| -------------------- | -------------------------- | ---------------------------------------- |
| `BASE_URL`           | Application base URL       | `https://www.automationexercise.com`     |
| `API_BASE_URL`       | API base URL               | `https://www.automationexercise.com/api` |
| `TEST_USER_EMAIL`    | Default test user email    | `testuser@example.com`                   |
| `TEST_USER_PASSWORD` | Default test user password | `SecurePass123`                          |

---

## Test Data Strategy

Dynamic test data is generated at runtime using `@faker-js/faker`:

**Benefits:**
- No hardcoded test data that can become stale
- Each test run uses unique data, avoiding state conflicts between runs
- Realistic data shapes (valid email formats, real-looking names and addresses)


---

## Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`

### Recommended VS Code Extensions

| Extension                       | Purpose                                                                 |
| ------------------------------- | ----------------------------------------------------------------------- |
| Playwright Test for VSCode      | Test runner integration, debugging, and one-click test execution        |
| Cucumber (Gherkin) Full Support | Syntax highlighting and step definition navigation for `.feature` files |
| Prettier                        | Consistent code formatting                                              |
| DotENV                          | Syntax highlighting for `.env` files                                    |
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

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values
```

See [Environment Variables](#environment-variables) for details.


## Running Tests

```bash
# Run all tests (UI + API)
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run tests in headed mode (visible browser)
npm run test:headed

# Run a specific feature file
npx playwright test features/ui/login.feature

# Run a specific API spec
npx playwright test api-tests/user.spec.ts

# Filter tests by name or tag
npx playwright test --grep "Login"

# Open the Playwright HTML report after a run
npx playwright show-report
```

---

## UI Testing

UI tests cover key user journeys on [AutomationExercise.com](https://www.automationexercise.com/), expressed as BDD scenarios in Gherkin and executed via `playwright-bdd`.

Covered flows:
- User registration and login
- Product browsing, filtering, and search
- Shopping cart and checkout
- Contact form submission
- Subscription flows
- Account management

Each scenario was derived from exploratory testing of the live site, documenting real application behavior as executable specifications.

---

## API Testing

API tests are written as **Playwright native spec files** (`.spec.ts`) under `api-tests/`, using Playwright's built-in `APIRequestContext`. All HTTP interactions are encapsulated in the **Service Object layer** under `services/`.

Covered API domains:
- **User Management** — create user, login, update user, delete user, get user detail
- **Products** — get all products, search products, get all brands
- **Cart** — add to cart, view cart

Each API test:
- Uses a dedicated Service Object to perform HTTP calls
- Asserts on response status codes, response body schema, and business logic
- Uses `faker-js` to generate unique payloads where required

---
## Reporting

This project supports two complementary reporting mechanisms — quick local feedback and rich analytical reporting.

### Playwright HTML Report

Built into Playwright. Generated automatically after each test run.

```bash
# Open the report after running tests
npx playwright show-report
```

Output directory: `reports/playwright-html/`

### Allure Report

Provides advanced analytics including historical trends, test categorization, environment info, and custom widgets.

```bash
# Generate the Allure report from collected results
npx allure generate reports/allure-results --clean -o reports/allure-report

# Open the report in a browser
npx allure open reports/allure-report
```

Output directory: `reports/allure-report/`



---

<div align="center">

Built with ☕ and precision by a QA engineer who believes good tests should have good documentation.

</div>
