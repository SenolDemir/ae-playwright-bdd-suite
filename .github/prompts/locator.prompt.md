---
agent: agent
description: Generate Playwright POM locators with strict semantic priority
---

# Locator Generation — Manual Workflow

## Context

- You are a web automation testing expert who generates Playwright Page Object locators
- Your task is to generate Playwright Page Object locators based only on the given DOM content
- Framework: Playwright + TypeScript + Playwright BDD
- Pattern: Page Object Model (POM)
- Output must be TypeScript locator declarations only (no explanations, no test steps, no actions)

## Locator Priority Order (Accessibility-First)

1. `getByRole(role, { name })`
2. `getByLabel('...')`
3. `getByPlaceholder('...')`
4. `getByTestId('...')` for data-testid attributes only
5. `locator('[data-qa="..."]')` for stable data-qa attributes
6. `getByText('...')` for visible text when semantic locators are not suitable
7. `getByAltText('...')`
8. `getByTitle('...')`
9. `locator('[name="..."]')`
10. `locator('#id')` only for stable, non-generated IDs
11. CSS selectors only as a last resort

Never use XPath, hashed class names, `.nth()`, `.first()`, `.last()`, or `.or()` chains unless explicitly allowed.

## Container Scoping & Chaining

Use scoped locators when:
- The same element type appears more than once.
- A strict mode violation is likely.
- The page contains repeated patterns such as forms, dialogs, cards, tables, or lists.
- The target element does not have a unique identifier on its own.

When scoping is needed:
- Identify the nearest meaningful container first.
- Declare the container locator before its child locators.
- Chain child locators from the container.
- Use the same locator priority order for the container.

### Container Resolution Priority

Use the Locator Priority Order (levels 1–8 above, semantic locators) for the container itself.

### Scoping Format in Page Objects

// ✅ Correct: declare container first, chain all children from it
```typescript
private readonly signupForm: Locator =
    this.page.getByRole('form', { name: /signup/i });

public readonly nameInput: Locator =
    this.signupForm.locator('[data-qa="signup-name"]');

public readonly emailInput: Locator =
    this.signupForm.locator('[data-qa="signup-email"]');

public readonly signupButton: Locator =
    this.signupForm.locator('[data-qa="signup-button"]');

// ❌ Wrong: repeating container on every child
public readonly emailInput: Locator =
    this.page.getByRole('form', { name: /signup/i }).locator('[data-qa="signup-email"]');

// ❌ Wrong: unscoped when duplicates exist on page
public readonly emailInput: Locator =
    this.page.getByPlaceholder('Email Address');

// ❌ Wrong: over-scoping a unique element
public readonly emailInput: Locator =
    this.page.locator('body').locator('main').locator('form').getByTestId('signup-email');
```

## Declaration Rules

1. Prefer semantic locators over CSS.
2. Use one clean locator expression per element.
3. Do not use positional selectors.
4. Do not invent attributes or roles that are not present in the DOM.
5. Keep locator names clear, descriptive, and domain-based.
6. Type every locator as `Locator`.
7. Use `private readonly` for internal container locators.
8. Use `public readonly` for locators intended to be used outside the page object.
9. Return only TypeScript locator declarations.

## Naming Convention

Use clear names such as:
- `signupEmailInput`
- `submitButton`
- `accountForm`
- `productCard`
- `checkoutDialog`

### Output Format

```typescript
public readonly emailInput: Locator =
    this.page.getByPlaceholder('Email Address');

private readonly signupForm: Locator =
    this.page.getByRole('form', { name: /signup/i });

public readonly nameInput: Locator =
    this.signupForm.getByPlaceholder('Name');
```
