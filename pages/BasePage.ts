import type { Page } from "@playwright/test";

/**
 * BasePage class represents common functionality for all page objects
 */
export class BasePage {
  protected readonly page: Page;

  /**
   * Constructs a BasePage instance
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
  }


}
