# 🎭 AE Playwright AI-Augmented BDD Suite

![Playwright](https://img.shields.io/badge/Playwright-1.59.0-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![playwright-bdd](https://img.shields.io/badge/playwright--bdd-8.5.0-brightgreen?logo=cucumber&logoColor=white)
![Faker.js](https://img.shields.io/badge/%40faker--js%2Ffaker-10.4.0-F7DF1E?logo=javascript&logoColor=black)
![Allure Reports](https://img.shields.io/badge/Allure_Reports-3.9.0-E85A2B?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgMjJoMjBMMTIgMnoiLz48L3N2Zz4=&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-ESM-339933?logo=nodedotjs&logoColor=white)


> A production-grade test automation portfolio project targeting [AutomationExercise.com](https://www.automationexercise.com/) — combining Playwright, TypeScript, BDD, AI Agents and other AI-assisted tooling into a modern, resilient testing framework.

---

## Table of Contents

- [🎭 AE Playwright AI-Augmented BDD Suite](#-ae-playwright-ai-augmented-bdd-suite)
	- [Table of Contents](#table-of-contents)
	- [Project Overview](#project-overview)
	- [Tech Stack](#tech-stack)
	- [Architecture Overview](#architecture-overview)
		- [Layer Responsibilities](#layer-responsibilities)
	- [📁 Project Structure](#-project-structure)
	- [Key Design Decisions](#key-design-decisions)
		- [Hybrid Test Style: BDD for UI, Native Spec for API](#hybrid-test-style-bdd-for-ui-native-spec-for-api)
		- [Playwright BDD over Cucumber.js?](#playwright-bdd-over-cucumberjs)
		- [Resilient Locator Strategy](#resilient-locator-strategy)
		- [Page Object Model](#page-object-model)
			- [Component Objects](#component-objects)
			- [API Object Model (AOM)](#api-object-model-aom)
	- [AI Augmentation](#ai-augmentation)
		- [GitHub Copilot](#github-copilot)
		- [Playwright MCP (Model Context Protocol)](#playwright-mcp-model-context-protocol)
		- [Playwright Agents](#playwright-agents)
		- [playwright-bdd-planner](#playwright-bdd-planner)
		- [playwright-bdd-generator](#playwright-bdd-generator)
		- [Self-Healing Strategy](#self-healing-strategy)
	- [Environment Management](#environment-management)
	- [Test Data Strategy](#test-data-strategy)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Recommended VS Code Extensions](#recommended-vs-code-extensions)
	- [| GitHub Copilot                  | AI-powered code suggestions and test generation                         |](#-github-copilot-------------------ai-powered-code-suggestions-and-test-generation-------------------------)
		- [Installation](#installation)
		- [Environment Setup](#environment-setup)
	- [Running Tests](#running-tests)
	- [Reporting](#reporting)
		- [Playwright HTML Report](#playwright-html-report)
		- [Allure Report](#allure-report)
	- [Parallel Execution](#parallel-execution)
		- [Current Setup](#current-setup)
		- [How to Control It](#how-to-control-it)
		- [Cross-Browser Parallel](#cross-browser-parallel)
		- [API Tests](#api-tests)
	- [Retries](#retries)
		- [Current Setup](#current-setup-1)
		- [Enabling Retries Locally](#enabling-retries-locally)
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

| Layer | Technology |
|---|---|
| Test Runner | [Playwright](https://playwright.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| BDD Layer | [playwright-bdd](https://vitalets.github.io/playwright-bdd/) |
| UI Pattern | Page Object Model (POM) |
| API Testing | Playwright built-in `APIRequestContext` + API Object Model |
| Test Data | [@faker-js/faker](https://fakerjs.dev/) |
| Env Management | [dotenv](https://github.com/motdotla/dotenv) |
| AI Augmentation | GitHub Copilot + Playwright Agents + Playwright MCP |
| Reporting | Playwright HTML Report + Allure Report |

---

## Architecture Overview

The framework is organized into distinct layers, each with well-defined responsibilities. UI tests flow from Gherkin feature files through step definitions into the Page Object Model, while API tests use Playwright's native spec structure backed by the API Object layer. Both layers share common supporting utilities.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         UI Test Layer (BDD)                             │
│                  .feature files written in Gherkin                      │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────────┐
│                        Step Definitions                                 │
│            TypeScript functions binding Gherkin steps to code           │
└──────────────────┬──────────────────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────┐    ┌─────────────────────────────────┐
│       Page Object Model         │    │       API Test Layer            │
│    (UI – browser actions)       │    │  Playwright native .spec.ts     │
│    pages/ + fixtures/           │    │  api/ grouped by domain         │
└──────────────────┬──────────────┘    └──────────────┬──────────────────┘
                   │                                  │
┌──────────────────▼──────────────┐    ┌──────────────▼──────────────────┐
│    Component Objects            │    │      API Objects Model          │
│  Reusable UI fragment classes   │    │  clients/ wrapping              │
│  components/.                   │    │  APIRequestContext              │
└──────────────────┬──────────────┘    └───────────────┬─────────────────┘
                   │                                   │
┌──────────────────▼──────────────┐                    │
│      Playwright Browser         │                    │
│   (Chromium / Firefox / WebKit) │                    │
└──────────────────┬──────────────┘                    │
                   │                                   │
┌──────────────────▼───────────────────────────────────▼──────────────────┐
│                          Supporting Utilities                           │
│             faker-js  │  dotenv  │  fixtures  │  hooks  │  helpers      │
└─────────────────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

**UI Tests**  
UI tests cover key user journeys on [AutomationExercise.com](https://www.automationexercise.com/), expressed as BDD scenarios in Gherkin and executed via `playwright-bdd`.

**Feature Files (`/features`)**  
Gherkin scenarios describing UI behavior from the user's perspective. These act as living documentation, readable by developers, testers, and business stakeholders alike. Applies to UI tests only.

**Step Definitions (`/steps`)**  
TypeScript functions that bind each Gherkin step to executable code. Steps are kept thin, they orchestrate calls to Page Objects rather than containing logic themselves.

**Page Object Model (`/pages`)**  
Each significant page of the application has a corresponding Page Object class. Responsibilities include:
- Encapsulating locators (using semantic/role-based selectors)
- Exposing high-level action methods (e.g., `login(email, password)`)
- Keeping assertions out of the POM layer (separation of concerns)

**Component Object Model (`/components`)**  
Reusable UI fragments that appear across multiple pages are extracted into Component Object classes. This avoids duplicating locator definitions and interaction logic across multiple Page Objects. 

**API Tests (`/api`)**  
API tests are implemented using Playwright's native `test()` structure (`.spec.ts` files),  using Playwright's built-in `APIRequestContext`. They do not use BDD/Gherkin — instead, they follow a direct spec style that is more natural for HTTP-level assertions without the overhead of mapping Gherkin steps to request/response logic. All HTTP interactions are delegeted to the **API Object Model** under `clients/`.

**API Object Model (`/clients`)**  
Provides a clean abstraction over Playwright's `APIRequestContext`. Each domain (Users, Products, Cart, etc.) has a dedicated client class with strongly typed request/response methods, reused across both API spec tests and UI test setup hooks.

**Fixtures (`/fixtures`)**  
Playwright fixtures extend the base test context to inject Page Objects, API Client Objects, and shared configuration — keeping step definitions and spec files clean and enabling dependency injection across the suite.

---

## 📁 Project Structure

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
│   │   └── copilot-setup-steps.yml
│   └── copilot-instructions.md
│
├── tests/
│   ├── features/              # Gherkin feature files (BDD / UI tests)
│   │   ├── auth/
│   │   │   ├── account-setup.feature
│   │   │   ├── login.feature
│   │   │   └── signup.feature
│   │   └── product/
│   │       └── product-catalog.feature
│   ├── steps/                 # Step definitions (BDD / UI tests)
│   │   ├── auth/
│   │   │   ├── account-setup.step.ts
│   │   │   ├── login.steps.ts
│   │   │   └── signup.step.ts
│   │   └── product/
│   │       └── product-catalog.ts
│   ├── api/                   # Playwright native API spec tests
│   │   ├── auth/
│   │   │   ├── login.api.spec.ts
│   │   │   └── signup.api.spec.ts
│   │   ├── product/
│   │   │   └── product.api.spec.ts
│   │   └── seed.spec.ts
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
│   │   ├── api.types.ts
│   │   ├── fixture.types.ts
│   │   └── signup.types.ts
│   └── utils/                 # Utility functions and helpers
│       └── page.context.ts
│
├── reports/                   # Generated test reports (git-ignored)
│   ├── playwright-html/
│   ├── allure-results/        # Raw Allure JSON data
│   └── allure-report/         # Generated Allure HTML report
│
├── .env                       # Local environment variables (git-ignored)
├── playwright.config.ts
└── package.json
```

---

## Key Design Decisions

### Hybrid Test Style: BDD for UI, Native Spec for API
UI tests use Gherkin feature files via `playwright-bdd`. They document user-facing journeys in a language accessible to all stakeholders. API tests use Playwright's native `test()` spec structure, which is more concise and better suited to HTTP-level assertions without the overhead of mapping Gherkin steps to request/response logic.

### Playwright BDD over Cucumber.js?
`playwright-bdd` bridges Playwright's fixture system directly with Gherkin step definitions. This means:
- BDD steps have full access to Playwright fixtures (`page`, `context`, custom fixtures like `signup.page`)
- No separate test runner: Playwright **is** the runner; reports, retries, and parallelism all come from Playwright natively
- `bddgen` generates the glue code automatically, zero boilerplate per feature file
- Raed this article to explore more: [Playwright × BDD: Cucumber.js vs Playwright-bdd](https://www.arrangility.com/blog/playwright-cucumber-vs-playwright-bdd)

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
- **Fluent interfaces** —  interfaces use method chaining to make code more readable
- **Single Responsibility** — each class maps to one page or significant component.

#### Component Objects 
Component Objects extend the POM pattern by modelling recurring UI fragments as independent, reusable classes. This pattern significantly reduces locator duplication across the suite and keeps Page Object classes focused on page-level flows rather than fragment-level implementation details.

#### API Object Model (AOM)
Mirrors the POM philosophy applied to API interactions:
- Each `*client` class encapsulates all API calls for a given domain.
- Client classes are reusable across both API tests and UI test fixtures (e.g., pre-creating a user via API before a UI scenario).

---

## AI Augmentation

The project showcases AI-augmented testing — a modern approach where AI tools enhance every layer of the test automation stack with human review ensuring correctness and quality.  The key point  human expertise + AI capability working together. It's distinct from fully automated testing with AI which gives less control. By this way it helps minimizing manual effort while maximizing coverage and maintainability.

AI Augmentation layers are:

### GitHub Copilot
Used throughout the authoring workflow for:
- Suggesting step definition implementations from Gherkin text
- Auto-completing TypeScript types and interface definitions
- Refactoring repetitive locator patterns
- Debugging error, fails.

### Playwright MCP (Model Context Protocol)
Playwright MCP enables AI models to interact with a live browser session. In this project it is used to:
- **Explore the application** and auto-generate initial locator suggestions
- **Record interaction patterns** that are then refined into Page Object methods
- **Validate locator resilience** by having the AI verify selectors against the live DOM

### Playwright Agents
Playwright Agents extend AI assistance beyond code generation into the full test lifecycle, covering test case development and locator self-healing. 

**Test Generation with Playwright Agents**  

Playwright provides a built-in planner agent, however it is not designed to generate Gherkin feature files with scenarios and scenario steps. To use agents for this workflow two custom agents are built based on plawright agents structure.
- playwright-bdd-planner
- playwright-bdd-generator

### playwright-bdd-planner

This agent:
- Receives a test basis scope (feature charter) via chat prompt
- Produces a raw feature file including scenarios and step definitions
- Applies standard test design techniques: equivalence partitioning, boundary value analysis, happy path, edge case, and negative scenarios

Rather than scoping the agent to an entire feature at once, feature charters are preferred. Validating one focused slice of behavior at a time builds more confidence than evaluating a large batch at once. It also prevents the AI from mixing primary flows, edge cases, and unrelated page behaviors together.

[tablo]

The agent generates the feature file into a dedicated review folder, where a human reviewer completes the test case development process.
To get more insight about Playwright Agents have a look at this article:
[Playwright Test Agents in 2026: what works, what breaks, and what's next](https://bug0.com/blog/playwright-test-agents) 


### playwright-bdd-generator

Takes a reviewed .feature file from the `_review/` folder as input and handles the implementation phase. It inspects the live DOM via Playwright MCP, then decides whether to create a new Page Object class or extend an existing one — never duplicating locators or methods already in place. Alongside page objects, it wires new fixtures and generates any missing test data factories. 

It follow locator strategy to implement resilient locator structure.

Output is strictly limited to `pages/`, `fixtures/`, and `data/` — step definitions and feature files are out of scope.


### Self-Healing Strategy

Test resilience is maintained through two layers:
- **Resilient Locator Strategy (preventive)** — semantic and role-based locators are preferred at authoring time to minimize the chance of locator breakage across UI changes (see Resilient Locator Strategy above)
  
- **Playwright Healer Agent (reactive)** — implemented via playwright-test-healer, this agent runs a semi-automated healing loop on failure:
  1. **Replays** the failing steps to reproduce the failure
  2. **Inspects** the current UI to locate equivalent elements or flows
  3. **Suggests a patch** — this may be a locator update, a wait adjustment, or a data fix, depending on the root cause
  4. **Re-runs** the test with the proposed patch until it passes or until guardrails stop the loop

>The goal is not to replace engineering judgment, but to accelerate the scaffolding and exploration phases — keeping focus on test design quality rather than boilerplate authoring.

---

## Environment Management

Enviromental configurations and data is managed via `dotenv`. `dotenv` package makes it easy to manage environment variables by loading them from a .env file into process.env at runtime. It provides:
- Keep secrets out of source code like API keys, passwords, and URLs live in .env (which is .gitignore'd), not hardcoded in the codebase
- Environment specific config: easily swap values between local, staging, and production without changing code
- Separates configuration from code, a widely accepted best practice and it is simple to use.


---

## Test Data Strategy

Dynamic test data is generated at runtime using `@faker-js/faker`:

**Benefits:**
- No hardcoded test data that can become stale
- Each test run uses unique data, avoiding state conflicts between runs
- Realistic data shapes (valid email formats, real-looking names and addresses)

It is designed with a **centralized data strategy** to ensure consistency across the testing lifecycle. By encapsulating all faker.* calls within a single source of truth, the framework avoids the pitfalls of scattered data generation. This approach ensures that test data is generated once and shared across all layers—from UI form entries to API payloads.

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

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values
```

See [Environment Variables](#environment-variables) for details.


## Running Tests

```bash
# Run all tests (UI + API)
npm run tests

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run tests in headed mode (visible browser)
npm run test:headed
# or configure it via .env file

# Run a specific feature file
npx playwright test features/ui/login.feature

# Run a specific API spec
npx playwright test api/user.spec.ts

# Filter tests by name or tag
npx playwright test --grep "Login"

# Open the Playwright HTML report after a run
npx playwright show-report
```

---

## Reporting

This project supports two complementary reporting mechanisms: quick local feedback and rich analytical reporting.

### Playwright HTML Report

Built into Playwright. Generated automatically after each test run.

```bash
# Open the report after running tests
npx playwright show-report
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

## Parallel Execution

### Current Setup

| Setting         | Local  | CI     |
| --------------- | ------ | ------ |
| `fullyParallel` | `true` | `true` |
| `workers`       | `4`    | `1`    |

### How to Control It

**1. Via environment variable (easiest)**
```bash
WORKERS=8 
#then
npx bddgen && npx playwright test
```

**2. Via CLI flag**
```bash
npx playwright test --workers=8
```

### Cross-Browser Parallel

When `BROWSER_TYPE=all`, 7 browser projects × N workers multiply fast. Set `WORKERS` to a lower number (1–2) in that case to avoid resource exhaustion.

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
npx playwright test --retries=2 features/auth/login.feature
npx playwright test --retries=2 api/user.spec.ts
```

---

## References

- **[Gojko Adzic — Specification by Example (Manning, 2011)](https://gojko.net/books/specification-by-example/)** — The book that defined "living documentation" as the primary value of BDD.

- **[Playwright × BDD: Cucumber.js vs Playwright-bdd](https://www.arrangility.com/blog/playwright-cucumber-vs-playwright-bdd)** — A practical comparison of the two BDD integration approaches for Playwright, covering fixture compatibility, runner behaviour, and boilerplate trade-offs.

- **[Test Design Techniques — ISTQB Foundation Syllabus](https://istqb-main-web-prod.s3.amazonaws.com/media/documents/ISTQB-CTFL_Syllabus_2023_v4.0.1.pdf)** — The Authoritative reference for equivalence partitioning, boundary value analysis, and decision table testing techniques that applied by the `playwright-bdd-planner` agent during scenario generation.

- **[How to Handle Playwright Page Objects - Nawaz Dhandalag](https://oneuptime.com/blog/post/2026-02-02-playwright-page-objects/view)** — Covers how to decompose Page Objects into smaller component abstractions to the Component Object Model applied in this project's `/components` layer.

- **[Playwright Test Agents in 2026: what works, what breaks, and what's next](https://bug0.com/blog/playwright-test-agents)** — A realistic evaluation of Playwright's agent capabilities including generation, healing, and the boundaries of current AI assistance. Referenced in the [Playwright Agents](#playwright-agents) section.

---

<div align="center">

Built with ☕ and precision by a QA engineer who believes good tests should have good documentation.

</div>
