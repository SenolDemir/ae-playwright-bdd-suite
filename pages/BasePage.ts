import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import type { TestData } from "../fixtures/ui-fixtures";
import type { SignupUser } from "../test-data/UserFactory.js";

/**
 * BasePage class represents common functionality for all page objects
 */
export class BasePage {
  protected readonly page: Page;
  protected readonly testData: TestData;

  private get cookieConsentDialog(): Locator {
    return this.page.getByRole("dialog", {
      name: "This site asks for consent to use your data",
    });
  }

  private get consentButton(): Locator {
    return this.cookieConsentDialog.getByRole("button", {
      name: "Consent",
    });
  }

  private get consentOverlay(): Locator {
    return this.page.locator(".fc-dialog-overlay");
  }

  private get consentRoot(): Locator {
    return this.page.locator(".fc-consent-root");
  }

  /**
   * Constructs a BasePage instance
   * @param page - The Playwright Page object
   * @param testData - The shared test data
   */
  constructor(page: Page, testData: TestData) {
    this.page = page;
    this.testData = testData;
  }

  async dismissCookieConsent(): Promise<void> {
    try {
      const cookieAcceptButton = this.page.getByRole("button", {
        name: "Consent",
      });

      if (await cookieAcceptButton.isVisible()) {
        await cookieAcceptButton.click();
      }
    } catch (error) {
      console.warn("No cookie popup found");
    }
  }

  // Shared helper - available to all page objects
  protected get newUser(): SignupUser {
    return this.testData.newUser;
  }
}
