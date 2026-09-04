import type { Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import type { SignupData } from "../types/signup.types.js";


export class SignupPage extends BasePage {
  private readonly signupData: SignupData;

  constructor(page: Page, signupData: SignupData) {
    super(page);
    this.signupData = signupData;
  }
  // ----- signup form elements -------------------

  private readonly signupSection: Locator = this.page.locator(".signup-form");
  public readonly newUserNameInput: Locator = this.signupSection.getByPlaceholder("Name");
  public readonly newUserEmailInput: Locator = this.signupSection.getByPlaceholder("Email Address");
  public readonly signupButton: Locator = this.signupSection.getByRole("button", { name: "Signup" });
  public readonly emailAlreadyExistsError: Locator = this.page.getByText("Email Address already exist!");

  // ---------------------- Signup Forms Functions ---------------------------------------------------

  async expectSignupFormVisible(): Promise<void> {
    await expect(this.newUserNameInput).toBeVisible();
    await expect(this.newUserEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  /**
   * Fills name + email and submits. Defaults to the fixture-provided signupData,
   * but accepts an override for scenario-specific data (e.g. duplicate-email tests).
   */
  async submitSignupCredentials(data: SignupData = this.signupData): Promise<void> {
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
    return this.newUserEmailInput.evaluate((input: HTMLInputElement) => {
      return input.validity.valid;
    });
  }

  //--------------------------------------------------------------------
}
