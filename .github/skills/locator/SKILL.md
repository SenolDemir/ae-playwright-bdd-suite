---
name: locator
description: Workflow for finding, generating, refactoring or healing Playwright locators from a live page or pasted DOM. Use when asked to create locators, fix a fragile or failing selector, or convert DOM into Page Object properties.
---

# Locator Workflow

The rules (priority order, banned patterns, container scoping, naming) live in
`.github/instructions/locator.instructions.md`; page and component class rules live in
`.github/instructions/page-objects.instructions.md`. Apply them; do not restate them here.
This skill covers only the workflow and the pasted-DOM output mode. Confidence levels are defined in the locator instructions.
Class and file locations are in the project map in `.github/copilot-instructions.md`.

## Find a locator for an element

1. Inspect the element in the live page (Playwright MCP snapshot) or the pasted DOM. Never invent roles or attributes.
2. Take the highest-priority option from the instructions that matches exactly one element.
3. If it matches several, scope it through a container instead of using `.nth()` / `.first()`.
4. Declare it in the existing page or component class (see `page-objects.instructions.md`).

## Refactor or heal a fragile locator

1. Identify which banned pattern or low-priority option is used.
2. Re-inspect the DOM and look for a higher-priority replacement or a container.
3. Change only the locator declaration; keep the property name and public API unchanged.

## Mode: generate locators from pasted DOM

Applies only when the user pastes DOM and asks for locators.
Output bare TypeScript property declarations only: no imports, class wrapper, constructor, comments or explanations.

```typescript
public readonly emailInput: Locator =
    this.page.getByPlaceholder('Email Address');
```

In any other task (healer agent, refactoring), apply the rules but respond in the format that task requires.
