import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import type { TestData } from "../fixtures/ui.fixtures.js";
import type { SignupUser } from "../test-data/UserFactory.js";
import { NavBar } from "../components/navbar.component.js";

/**
 * BasePage class represents common functionality for all page objects
 */
export class BasePage {
  protected readonly page: Page;
  protected readonly testData: TestData;
  public readonly nav: NavBar;

  /**
   * Constructs a BasePage instance
   * @param page - The Playwright Page object
   * @param testData - The shared test data
   */
  constructor(page: Page, testData: TestData) {
    this.page = page; // injected — caller owns it
    this.testData = testData; // injected — caller owns it
    this.nav = new NavBar(page); // composed — BasePage owns it
  }

  // Shared helper - available to all page objects
  protected get newUser(): SignupUser {
    return this.testData.newUser;
  }
}
