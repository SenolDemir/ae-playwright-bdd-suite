import { BasePage } from "./BasePage.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class HomePage extends BasePage {

  // ---------------------- Locators --------------------------

  // Visible only after deleting an authenticated account.
  public readonly accountDeletedHeading: Locator = this.page.getByRole("heading", { name: "Account Deleted!" });
  public readonly continueLink: Locator = this.page.getByRole("link", {
    name: "Continue",
  });

  // ---------------------- functions  -----------------------------------

  async expectHomePageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(process.env.BASE_URL || "https://www.automationexercise.com/");
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async expectLoggedIn(fullName?: string): Promise<void> {
    await expect(this.page).toHaveURL(process.env.BASE_URL || "https://www.automationexercise.com/");
    await expect(this.nav.loggedInAsText).toBeVisible();
    
  }


  async submitDeleteAccount(): Promise<void> {
    await this.nav.deleteAccountLink.click();
  }

  async expectAccountDeletedConfirmation(): Promise<void> {
    await expect(this.page).toHaveURL(/delete_account/);
    await expect(this.accountDeletedHeading).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueLink.click();
  }

  async expectNotLoggedInOnHomePage(): Promise<void> {
    await expect(this.page).toHaveURL(process.env.BASE_URL || "https://www.automationexercise.com/");
    await expect(this.nav.signupOrLoginLink).toBeVisible();
    await expect(this.nav.logoutLink).toHaveCount(0);
    await expect(this.nav.deleteAccountLink).toHaveCount(0);
    await expect(this.nav.loggedInAsText).toHaveCount(0);
  }
}
