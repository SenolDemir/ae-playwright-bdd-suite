import { BasePage } from "./BasePage.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class HomePage extends BasePage {
  

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
