---
description: Rules for Page Object and Component Object classes
applyTo: "ui/**/*.ts"
---

# Page Object Design Rules

- One class per file: `ui/pages/<name>.page.ts` for pages, `ui/components/<name>.component.ts` for reusable components.
- Every page class extends `BasePage` (`ui/pages/base.page.ts`). Do not create a duplicate page; reuse and extend the existing one.
- Reusable UI parts (navbar, dialogs) are components composed into pages, not copied.
- Use `import type { Page, Locator } from "@playwright/test"`.
- Locators are `readonly` properties declared at the top of the class. Follow [locator.instructions.md](./locator.instructions.md).
- Indicate the locators by adding a `// Locators` comment block above the locator fields
- Public methods represent user actions in domain language (`submitCredentials`, `addProductToCart`), not low-level clicks.
  - ✅ `loginPage.submitCredentials(email, password)`
  - ❌ `page.locator('#btn').click()` in a step or test
- Always declare return types (`Promise<void>`, `Promise<string>`, ...). Use `async/await` only.
- Steps are thin: one call into a page object or fixture per step.
- No selectors, no `page.locator`, and no direct `expect(locator)` in steps. Use the page object's `expect*` methods.
- Test data comes from `testdata/` generators via fixtures, never inline. No faker or random data generation inside page objects.
- Keep page objects focused on representing the UI and user interactions. Avoid embedding business logic or test assertions outside of `expect*` methods.
- Prefer Playwright auto-waiting. No `waitForTimeout`; wait on a locator state or a response.
- Private helper methods use the `private`/`protected` modifier. Private locators (containers) use `private readonly` with no `_` prefix.
- Page navigation methods return `void` or the next page object, never a raw `Page`.
