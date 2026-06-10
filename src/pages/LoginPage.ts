import { BasePage } from "./BasePage.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class LoginPage extends BasePage {
  // ── Login form (container + children) ───────────────────
  private readonly loginForm: Locator = this.page.locator('form[action="/login"]');
  public readonly loginEmailInput: Locator = this.loginForm.locator('[data-qa="login-email"]');
  public readonly loginPasswordInput: Locator = this.loginForm.locator('[data-qa="login-password"]');
  public readonly loginButton: Locator = this.loginForm.locator('[data-qa="login-button"]');

  // ---------------------- Functions ---------------------------------------------------

  async loginWithValidCredentials(): Promise<void> {
    const email = process.env.TEST_USER_EMAIL || "";
    const password = process.env.TEST_USER_PASSWORD || "";
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}
