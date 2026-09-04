import { BasePage } from "./base.page.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {
  // ── Login form (container + children) ───────────────────
  private readonly loginForm: Locator = this.page.locator('form[action="/login"]');
  public readonly loginEmailInput: Locator = this.loginForm.locator('[data-qa="login-email"]');
  public readonly loginPasswordInput: Locator = this.loginForm.locator('[data-qa="login-password"]');
  public readonly loginButton: Locator = this.loginForm.locator('[data-qa="login-button"]');
  public readonly loginErrorMessage: Locator = this.page.getByText("Your email or password is incorrect!");

  // ---------------------- Functions ---------------------------------------------------

  async expectLoginPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.loginForm).toBeVisible();
  }
  
  async loginWithValidCredentials(): Promise<void> {
    const email = process.env.TEST_USER_EMAIL || "";
    const password = process.env.TEST_USER_PASSWORD || "";
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async getLoginEmailValidationMessage(): Promise<string> {
    return this.getValidationMessage(this.loginEmailInput);
  }


  async getLoginPasswordValidationMessage(): Promise<string> {
    return this.getValidationMessage(this.loginPasswordInput);
  }
}
