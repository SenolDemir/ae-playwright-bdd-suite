
## Installation & Adding Dependencies
npm init -y
npm install -D @playwright/test@latest 
npm init playwright@latest

typescript
npm install typescript ts-node @types/node
npx tsc --init

npm install -D playwright-bdd
npm install --save-dev @faker-js/faker
npm install dotenv --save


## Setup and Configurations
- in tsconfig.json (strict mode rules, conflicts etc.)
- generate workspace level setting.json file
- in setting.json file:
- adding custom test running commands

## Project Structure
.github   AI prompts
features  stays pure Gherkin only
pages     holds the POM classes
fixtures  holds the injected fixture container
hooks     
steps     consumes the injected objects
test-data
reports
utils
.env


## Page Object Injection Set Up in playwrigh-bdd
it is set up by fixtures/testbase.ts file
Page Objects should be added into this file in three block
and injection via step function callback as an argument
```typescript
When(
  "user logs in with {string} and {string}",
  async ({ loginPage }, email: string, password: string) => {
    await loginPage.login(email, password);
  }
);
```

### feature-gen folder
playwright-bdd works by acting as a bridge between Cucumber's .feature files and Playwright's native test runner. Playwright's runner (@playwright/test) does not understand Gherkin syntax natively — it only knows how to run .spec.ts files. So playwright-bdd auto-generates those .spec.ts files from your .feature files into the features-gen folder (or whatever you configure it as), and Playwright then runs those generated files.

## Reporting

reports/
├── playwright-html/     ← Playwright native HTML report
├── allure-results/      ← raw Allure JSON data
└── allure-report/       ← generated Allure HTML report

### Allure Report
allure-result
Keeps raw test results. It is not cleaned before each session.

Allure-report
It is for html report. It is cleaned before each test run.

to generate and open the report immediately
```json
"allure:serve": "npx allure serve reports/allure-results"
```

to generate the report separately for later use:
```json
"allure:generate": "npx allure generate reports/allure-results --clean -o reports/allure-report",
"allure:open": "npx allure open reports/allure-report",
```

Limitation of Allure Report:
When you open generated html report, even the html page is closed, you have to end allure server manually by pressing <Ctril+C> in terminal session of it. Otherwise it remains working. 


