---
description: Locator strategy for Page Objects and Components
applyTo: "ui/**/*.ts"
---

# Locator Rules

## Priority (use the first that works)

1. `getByRole(role, { name })`
2. `getByLabel('...')`
3. `getByPlaceholder('...')`
4. `getByTestId('...')` (`data-testid` only)
5. `locator('[data-qa="..."]')` (stable `data-qa` attributes)
6. `getByText('...')`
7. `getByAltText('...')`
8. `getByTitle('...')`
9. `locator('[name="..."]')`
10. `locator('#id')` (stable, non-generated IDs only)
11. CSS selectors (last resort)

## Never use

XPath, hashed or generated class names, `.nth()`, `.first()`, `.last()`, `.or()` chains.
For repeated items without a unique identifier, use `.filter({ hasText })` or `.filter({ has: locator })`.

## Container scoping

Declare a container when the same element type repeats, a strict-mode violation is likely, or the UI is a form, card, table or dialog.

- Declare the container first, chain every child from it, and do not repeat the container inline.
- Containers are `private readonly`; child locators used by steps are `public readonly`.
- Do not over-scope unique elements (no `body > main > section` chains).
- `getByRole('form')` matches only forms with an accessible name. Otherwise scope via a contained heading or `data-qa`.

```typescript
private readonly signupForm: Locator = this.page.locator("form").filter({
  has: this.page.getByRole("heading", { name: /new user signup/i }),
});

public readonly nameInput: Locator = this.signupForm.locator('[data-qa="signup-name"]');
```

## Declarations

- One locator expression per declaration, with an explicit `Locator` type.
- Name in domain language: `signupEmailInput`, `submitButton`, `productCard`.
- Regex for role names and visible text; exact strings for labels, placeholders and data attributes.
- Never invent roles or attributes that are not in the inspected DOM.
- Flag low-confidence locators (`#id`, CSS) for review.

## Confidence levels (for reports)

- 🟢 High: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`
- 🟡 Medium: `getByText`, `getByAltText`, `getByTitle`, `[data-qa]`, `[name]`
- 🔴 Low: `locator('#id')`, CSS (flag for review)
