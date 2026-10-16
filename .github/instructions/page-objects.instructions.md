---
description: Rules for Page Object and Component Object classes
applyTo: "ui/**/*.ts"
---

# Page Object Rules

- One class per file: `ui/pages/<name>.page.ts` for pages, `ui/components/<name>.component.ts` for reusable components.
- Every page class extends `BasePage` (`ui/pages/base.page.ts`). Do not create a duplicate page; reuse and extend the existing one.
- Reusable UI parts (navbar, dialogs) are components composed into pages, not copied.
- Use `import type { Page, Locator } from "@playwright/test"`.
- Locators are `readonly` properties declared at the top of the class. Follow [locator.instructions.md](./locator.instructions.md).
- Public methods represent user actions in domain language (`submitCredentials`, `addProductToCart`), not low-level clicks.
  - ✅ `loginPage.submitCredentials(email, password)`
  - ❌ `page.locator('#btn').click()` in a step or test
- Always declare return types (`Promise<void>`, `Promise<string>`, ...). Use `async/await` only.
- Page objects hold no test data and no hardcoded credentials. Data comes in as method parameters, built by `testdata/` generators.
- `Given`/`When` steps map to action methods (`submitCredentials()`); `Then` steps map to assertion methods prefixed `expect` (`expectLoggedIn()`). Step definitions stay thin and call these methods; they contain no selectors.
- State getters (`getErrorMessage()`) are fine for assertions that belong in a step.
- Prefer Playwright auto-waiting. No `waitForTimeout`; wait on a locator state or a response.
- Private helpers use the `_` prefix or `private`/`protected` modifiers.
- Page navigation methods return `void` or the next page object, never a raw `Page`.
