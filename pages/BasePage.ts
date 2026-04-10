import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import type { TestContext } from "../fixtures/pages";
import type { SignupUser } from "../test-data/UserFactory.js";

/**
 * BasePage class represents common functionality for all page objects
 */
export class BasePage {
  protected readonly page: Page;
  protected readonly testContext: TestContext;

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
   * @param testContext - The shared test context
   */
  constructor(page: Page, testContext: TestContext) {
    this.page = page;
    this.testContext = testContext;
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
    return this.testContext.userData;
  }
}
