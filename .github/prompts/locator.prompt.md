---
agent: agent
description: Generate Playwright POM locators with strict semantic priority
---

# Locator Generation — Manual Expert Workflow

## Context

You are a web automation expert generating Playwright Page Object locators from provided DOM content. Output TypeScript property declarations only.

Framework: Playwright + TypeScript + Playwright BDD  
Pattern: Page Object Model (POM)


## Locator Priority Order (Accessibility-First)

1. `getByRole(role, { name })` — ARIA roles and accessible names only
2. `getByLabel('...')`
3. `getByPlaceholder('...')`
4. `getByTestId('...')` — data-testid attributes only
5. `locator('[data-qa="..."]')` — preferred for leaf elements inside scoped containers
6. `getByText('...')` for visible text when semantic locators are not suitable
7. `getByAltText('...')`
8. `getByTitle('...')`
9. `locator('[name="..."]')`
10. `locator('#id')` — only for stable, non-generated IDs
11. CSS selectors — last resort only

Never use: XPath, hashed class names, `.nth()`, `.first()`, `.last()`, `.or()` chains.

When a list contains repeated items with no unique identifier, use
`.filter({ hasText: '...' })` or `.filter({ has: locator })` instead.

## Container Scoping & Chaining Rules

Declare a container locator when:
- The same element type appears more than once on the page.
- A strict-mode violation is likely.
- The page uses repeated patterns (forms, cards, tables, dialogs).

When scoping:
1. Declare the container first using the priority order above.
2. Chain all child locators from the container — do not repeat the container inline.
3. Do not over-scope unique elements (no `body > main > section` chains).

When a form has no accessible name, use `data-qa` or a wrapping landmark:

```typescript
private readonly signupForm: Locator =
    this.page.getByRole('form', { name: /signup/i });

public readonly nameInput: Locator =
    this.signupForm.locator('[data-qa="signup-name"]');

public readonly emailInput: Locator =
    this.signupForm.locator('[data-qa="signup-email"]');

public readonly signupButton: Locator =
    this.signupForm.locator('[data-qa="signup-button"]');
```

## Declaration Rules

1. `private readonly` — structural/container locators only.
2. `public readonly` — leaf locators used in test steps or step definitions.
3. One expression per locator. No chained conditions.
4. Do not invent attributes or roles absent from the DOM.
5. Use regex (`/.../i`) for role names and visible text.
   Use exact strings for placeholders, labels, and data attributes.
6. Name locators clearly using domain language:
   `signupEmailInput`, `submitButton`, `productCard`, `checkoutDialog`

### Output Format

Bare TypeScript property declarations only.  
No imports, no class wrapper, no constructor, no comments, no explanations.

```typescript
public readonly emailInput: Locator =
    this.page.getByPlaceholder('Email Address');

private readonly signupForm: Locator =
    this.page.getByRole('form', { name: /signup/i });

public readonly nameInput: Locator =
    this.signupForm.getByPlaceholder('Name');
```
