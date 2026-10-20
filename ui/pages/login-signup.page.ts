import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import type { SignupData } from "../../types/signup.types";
import { BasePage } from "./base.page";

export class LoginSignupPage extends BasePage {

  private readonly loginForm: Locator = this.page.locator('form[action="/login"]');
  public readonly loginEmailInput: Locator = this.loginForm.locator('[data-qa="login-email"]');
  public readonly loginPasswordInput: Locator = this.loginForm.locator('[data-qa="login-password"]');
  public readonly loginButton: Locator = this.loginForm.locator('[data-qa="login-button"]');
  public readonly loginErrorMessage: Locator = this.page.getByText("Your email or password is incorrect!");

  // -------------------- Signup Form Locators --------------------
  
  private readonly signupSection: Locator = this.page.locator(".signup-form");
  public readonly newUserNameInput: Locator = this.signupSection.getByPlaceholder("Name");
  public readonly newUserEmailInput: Locator = this.signupSection.getByPlaceholder("Email Address");
  public readonly signupButton: Locator = this.signupSection.getByRole("button", { name: "Signup" });
  public readonly emailAlreadyExistsError: Locator = this.page.getByText("Email Address already exist!");

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


  // -------------------- Signup Form Methods --------------------

  async expectSignupFormVisible(): Promise<void> {
    await expect(this.newUserNameInput).toBeVisible();
    await expect(this.newUserEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  async submitSignupCredentials(data: SignupData): Promise<void> {
    await this.newUserNameInput.fill(data.fullName);
    await this.newUserEmailInput.fill(data.email);
    await this.signupButton.click();
  }

  async enterNewUserName(name: string): Promise<void> {
    await this.newUserNameInput.fill(name);
  }

  async enterNewUserEmail(email: string): Promise<void> {
    await this.newUserEmailInput.fill(email);
  }

  async clickSignupButton(): Promise<void> {
    await this.signupButton.click();
  }

  async getNameValidationMessage(): Promise<string> {
    return this.getValidationMessage(this.newUserNameInput);
  }

  async getExistingEmailMessage(): Promise<string> {
    return this.emailAlreadyExistsError.innerText();
  }

  async getEmailValidationMessage(): Promise<string> {
    return this.getValidationMessage(this.newUserEmailInput);
  }

  async isEmailInputValid(): Promise<boolean> {
    return this.newUserEmailInput.evaluate((input: HTMLInputElement) => input.validity.valid);
  }
}
