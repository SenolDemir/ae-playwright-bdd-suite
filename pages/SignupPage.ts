import { BasePage } from "./BasePage.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";


export class SignupPage extends BasePage {

  // signup form elements
  private readonly signupSection: Locator = this.page.locator(".signup-form");
  public readonly newUserNameInput: Locator =
    this.signupSection.getByPlaceholder("Name");
  public readonly newUserEmailInput: Locator =
    this.signupSection.getByPlaceholder("Email Address");
  public readonly signupButton: Locator = this.signupSection.getByRole(
    "button",
    { name: "Signup" },
  );

  // ── Login form (container + children) ───────────────────
  private readonly loginForm: Locator = this.page.locator(
    'form[action="/login"]',
  );

  public readonly loginEmailInput: Locator = this.loginForm.locator(
    '[data-qa="login-email"]',
  );

  public readonly loginPasswordInput: Locator = this.loginForm.locator(
    '[data-qa="login-password"]',
  );

  public readonly loginButton: Locator = this.loginForm.locator(
    '[data-qa="login-button"]',
  );

  // ---------------------- Functions ---------------------------------------------------

  async expectSignupFormVisible(): Promise<void> {
    await expect(this.newUserNameInput).toBeVisible();
    await expect(this.newUserEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  async submitSignupCredentials(): Promise<void> {
    await this.newUserNameInput.fill(this.newUser.fullName);
    await this.newUserEmailInput.fill(this.newUser.email);
    await this.signupButton.click();
  }

  async enterNewUserName(name: string): Promise<void> {
    await this.newUserNameInput.fill(name);
  }

  async enterNewUserEmail(email: string): Promise<void> {
    if (email == "valid_email") {
      email = faker.internet.email(); // generate a random valid email for testing
    }
    await this.newUserEmailInput.fill(email);
  }

  async clickSignupButton(): Promise<void> {
    await this.signupButton.click();
  }

  // Get the browser's native validation message for name field
  async expectEmptyNameMessage(message: string): Promise<void> {
    const validationMessage = await this.newUserNameInput.evaluate(
      (input: HTMLInputElement) => {
        return input.validationMessage;
      },
    );
    expect(validationMessage).toBe(message);
  }

  // Get the browser's native validation message for email field
  async expectEmptyEmailMessage(message: string): Promise<void> {
    const validationMessage = await this.newUserEmailInput.evaluate(
      (input: HTMLInputElement) => {
        return input.validationMessage;
      },
    );
    expect(validationMessage).toBe(message);
  }

  async loginAsTester(email: string, password: string): Promise<void> {
    email = process.env.TEST_USER_EMAIL || email;
    password = process.env.TEST_USER_PASSWORD || password;
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  
}
