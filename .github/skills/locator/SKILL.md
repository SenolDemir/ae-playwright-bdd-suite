---
name: locator-strategy
description: Rules for writing Playwright locators in Page Objects and Component Objects. Use whenever creating, editing, reviewing or healing a locator, or when asked to generate locators from DOM. Defines the priority order, banned patterns, container scoping and naming.

# Playwright Locator Strategy

Framework: Playwright + TypeScript + playwright-bdd.
Pattern: Page Object Model.

## Locator priority

1. `getByRole(role, { name })`
2. `getByLabel('...')`
3. `getByPlaceholder('...')`
4. `getByTestId('...')` for `data-testid` only
5. `locator('[data-qa="..."]')` for stable `data-qa` attributes
6. `getByText('...')` when semantic locators are unsuitable
7. `getByAltText('...')`
8. `getByTitle('...')`
9. `locator('[name="..."]')`
10. `locator('#id')` only for stable, non-generated IDs
11. CSS selectors as a last resort

Never use XPath, hashed class names, `.nth()`, `.first()`, `.last()`, or `.or()` chains.

When repeated items lack a unique identifier, prefer `.filter({ hasText: '...' })`
or `.filter({ has: locator })`.

### Container scoping 

Declare a container locator when: - the same element type appears more than once on the page, - a strict-mode violation is likely, or - the page uses repeated patterns (forms, cards, tables, dialogs). 

When scoping: 
1. Declare the container first, using the priority order above.
2. Chain every child locator from the container. Do not repeat the container inline. 
3. Do not over-scope unique elements (no `body > main > section` chains). `getByRole('form')` only matches forms that have an accessible name. If the form has none, scope it through a child it contains, or through `data-qa`:
```typescript
private readonly signupForm: Locator =
    this.page.locator('form').filter({
        has: this.page.getByRole('heading', { name: /new user signup/i }),
    });

public readonly nameInput: Locator =
    this.signupForm.locator('[data-qa="signup-name"]');

public readonly signupButton: Locator =
    this.signupForm.locator('[data-qa="signup-button"]');
```

## Declarations

- Use `private readonly` for structural/container locators.
- Use `public readonly` for leaf locators used by tests or step definitions.
- Use one locator expression per declaration.
- Do not invent roles or attributes absent from the inspected DOM.
- Use regex for role names and visible text; use exact strings for labels, placeholders, and data attributes.
- Name locators in domain language: `signupEmailInput`, `submitButton`, `productCard`, `checkoutDialog`.

## Mode: generate locators from pasted DOM

Applies only when the user pastes DOM and asks for locators.
Output bare TypeScript property declarations only: no imports, class wrapper,
constructor, comments or explanations.

```typescript
public readonly emailInput: Locator =
    this.page.getByPlaceholder('Email Address');
```

In any other task (generator agent, healer agent, refactoring), apply the rules above
but respond in the format that task requires.

## Confidence levels (used in generator reports)
- 🟢 High: getByRole, getByLabel, getByPlaceholder, getByTestId
- 🟡 Medium: getByText, getByAltText, getByTitle
- 🔴 Low: locator('#id'), CSS/XPath (flag for review)