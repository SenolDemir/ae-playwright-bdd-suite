// src/pages/base.page.ts
import type { Locator, Page } from "@playwright/test";
import { NavBar } from "../components/navbar.component.js";

/**
 * BasePage — common functionality shared by all page objects.
 * Does not carry test data; subclasses that need data declare it themselves.
 */
export class BasePage {
  protected readonly page: Page;
  public readonly nav: NavBar;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavBar(page);
  }

  protected async getValidationMessage(locator: Locator): Promise<string> {
    return locator.evaluate((el: HTMLInputElement) => el.validationMessage);
  }
}
