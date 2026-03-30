import { BasePage } from "./BasePage.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class HomePage extends BasePage {
  // private readonly _loggedInUserLabel: Locator;
  // private readonly _signupLoginLink: Locator;
  // private readonly _signupFormHeading: Locator;
  // private readonly _consentButton: Locator;
  // private readonly _consentOverlay: Locator;

  // public constructor(page: Page) {
  //   super(page);
  //   this._loggedInUserLabel = this._page.locator('a:has-text("Logged in as")');
  //   this._signupLoginLink = this._page.locator('a[href="/login"]');
  //   this._signupFormHeading = this._page.locator(
  //     'h2:has-text("New User Signup!")',
  //   );
  //   this._consentButton = this._page
  //     .locator(".fc-consent-root .fc-cta-consent")
  //     .first();
  //   this._consentOverlay = this._page.locator(".fc-dialog-overlay");
  // }

  // public get loggedInUserLabel(): Locator {
  //   return this._loggedInUserLabel;
  // }

  // public get signupFormHeading(): Locator {
  //   return this._signupFormHeading;
  // }

  // public async open(): Promise<void> {
  //   await this._page.goto("/");
  //   await this.dismissConsentIfVisible();
  // }

  // public async navigateToRegistrationPage(): Promise<void> {
  //   await this.dismissConsentIfVisible();
  //   await this._signupLoginLink.click();
  // }

  // private async dismissConsentIfVisible(): Promise<void> {
  //   if ((await this._consentButton.count()) === 0) {
  //     return;
  //   }

  //   if (await this._consentButton.isVisible()) {
  //     await this._consentButton.click({ timeout: 5000 });
  //     await this._consentOverlay.waitFor({ state: "hidden", timeout: 10000 });
  //   }
  // }

  public readonly signupOrLoginLink: Locator = this.page.getByRole("link", {
    name: "Signup / Login",
  });
  public readonly logoutLink: Locator = this.page.getByRole("link", {
    name: "Logout",
  });
  // Visible only after authentication.
  public readonly deleteAccountLink: Locator = this.page.getByRole("link", {
    name: "Delete Account",
  });
  // Visible only after authentication.
  public readonly loggedInAsText: Locator =
    this.page.getByText(/Logged in as/i);

  // Visible only after deleting an authenticated account.
  public readonly accountDeletedHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Account Deleted!" },
  );
  public readonly continueLink: Locator = this.page.getByRole("link", {
    name: "Continue",
  });

  // ---------------------- methods --------------------------

  async navigateToLoginPage(): Promise<void> {
    await this.signupOrLoginLink.click();
  }

  async expectHomePageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(
      process.env.BASE_URL || "https://automationexercise.com/",
    );
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async expectLoggedInAs(fullName: string): Promise<void> {
    await expect(this.loggedInAsText).toContainText(`Logged in as ${fullName}`);
  }

  async submitDeleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async expectAccountDeletedConfirmation(): Promise<void> {
    await expect(this.page).toHaveURL(/delete_account/);
    await expect(this.accountDeletedHeading).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueLink.click();
  }

  async expectNotLoggedInOnHomePage(): Promise<void> {
    await expect(this.page).toHaveURL(
      process.env.BASE_URL || "https://www.automationexercise.com/",
    );
    await expect(this.signupOrLoginLink).toBeVisible();
    await expect(this.logoutLink).toHaveCount(0);
    await expect(this.deleteAccountLink).toHaveCount(0);
    await expect(this.loggedInAsText).toHaveCount(0);
  }
}
