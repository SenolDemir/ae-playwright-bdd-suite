import { BasePage } from "./base.page.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class AccountSetupPage extends BasePage {
  
  // ----------- account information form elements -------------------------

  public readonly enterAccountInformationHeading: Locator = this.page.getByRole("heading", {
    name: "Enter Account Information",
  });

  // account information Container
  public readonly accountInformationForm: Locator = this.page.locator('form[action="/signup"]');

  // title radio buttons
  public readonly titleMrRadioButton: Locator = this.accountInformationForm.getByLabel("Mr.");
  public readonly titleMrsRadioButton: Locator = this.accountInformationForm.getByLabel("Mrs.");

  public readonly passwordInput: Locator = this.page.getByLabel("Password");

  // Name input (pre-filled from Step 1 signup; data-qa="name")
  public readonly nameInput: Locator = this.accountInformationForm.locator('[data-qa="name"]');

  // Date of Birth Dropdowns
  public readonly daysDropdown: Locator = this.accountInformationForm.locator('[data-qa="days"]');
  public readonly monthsDropdown: Locator = this.accountInformationForm.locator('[data-qa="months"]');
  public readonly yearsDropdown: Locator = this.accountInformationForm.locator('[data-qa="years"]');

  // Checkboxes
  public readonly newsletterCheckbox: Locator = this.accountInformationForm.getByRole("checkbox", {
    name: /Sign up for our newsletter!/i,
  });
  public readonly offersCheckbox: Locator = this.accountInformationForm.getByRole("checkbox", {
    name: /Receive special offers from our partners!/i,
  });

  // Personal Information Inputs
  public readonly firstNameInput: Locator = this.accountInformationForm.getByLabel("First name");
  public readonly lastNameInput: Locator = this.accountInformationForm.getByLabel("Last name");
  public readonly companyInput: Locator = this.page.getByLabel("Company", {
    exact: true,
  });
  public readonly address1Input: Locator = this.accountInformationForm.locator('[data-qa="address"]');
  public readonly address2Input: Locator = this.accountInformationForm.getByLabel("Address 2");
  public readonly stateInput: Locator = this.accountInformationForm.getByLabel("State");
  public readonly cityInput: Locator = this.accountInformationForm.getByLabel("City");
  public readonly zipcodeInput: Locator = this.page.locator('[data-qa="zipcode"]');
  public readonly mobileNumberInput: Locator = this.accountInformationForm.getByLabel("Mobile Number");
  public readonly createAccountButton: Locator = this.accountInformationForm.getByRole("button", {
    name: "Create Account",
  });

  // Account created confirmation elements
  public readonly accountCreatedHeading: Locator = this.page.getByRole("heading", {
    name: "Account Created!",
    level: 2,
  });

  public readonly continueButton: Locator = this.page.getByRole("link", {
    name: "Continue",
  });

  // ------------  Account information form functions ------------------------------------

  async expectAccountSetupHeadingVisible(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Enter Account Information" })).toBeVisible();
  }

  async selectTitle(title: string): Promise<void> {
    if (title === "Mr.") {
      await this.titleMrRadioButton.check();
    } else {
      await this.titleMrsRadioButton.check();
    }
  }

  async selectRandomDateOfBirth(): Promise<void> {
    await this.daysDropdown.selectOption({
      label: this.newUser.dayOfBirth,
    });
    await this.monthsDropdown.selectOption({
      label: this.newUser.monthOfBirth,
    });
    await this.yearsDropdown.selectOption({
      label: this.newUser.yearOfBirth,
    });
  }

  async selectCountry(): Promise<void> {
    const countryDropdown: Locator = this.page.getByRole("combobox", {
      name: "Country",
    });
    await countryDropdown.click();
    await countryDropdown.selectOption({ label: this.newUser.country });
  }

  async completeAccountSetupForm(): Promise<void> {
    await this.selectTitle(this.newUser.title);
    await this.passwordInput.fill(this.newUser.password);
    await this.selectRandomDateOfBirth();
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.firstNameInput.fill(this.newUser.firstName);
    await this.lastNameInput.fill(this.newUser.lastName);
    await this.companyInput.fill(this.newUser.company);
    await this.address1Input.fill(this.newUser.address1);
    await this.address2Input.fill(this.newUser.address2);
    await this.selectCountry();
    await this.stateInput.fill(this.newUser.state);
    await this.cityInput.fill(this.newUser.city);
    await this.zipcodeInput.fill(this.newUser.zipcode);
    await this.mobileNumberInput.fill(this.newUser.mobileNumber);
  }

  async submitAccountSetup(): Promise<void> {
    await this.createAccountButton.click();
  }

  async expectAccountCreated(): Promise<void> {
    // await expect(this.page).toHaveURL("https://www.automationexercise.com/account_created");
    await expect(this.page).toHaveURL(/account_created$/);
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.accountCreatedHeading).toHaveText("Account Created!");
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  // ── Negative / validation scenario methods ────────────────────────────

  /**
   * Returns the Locator for a given field name string.
   * Normalises "first_name" and "mobile_number" (underscore variants)
   * to their space-separated equivalents before lookup.
   */
  private getFieldLocator(fieldName: string): Locator {
    const normalised = fieldName.toLowerCase().replace(/_/g, " ").trim();
    const locatorMap: Record<string, Locator> = {
      name: this.nameInput,
      password: this.passwordInput,
      "first name": this.firstNameInput,
      "last name": this.lastNameInput,
      address: this.address1Input,
      state: this.stateInput,
      city: this.cityInput,
      zipcode: this.zipcodeInput,
      "mobile number": this.mobileNumberInput,
    };
    const locator = locatorMap[normalised];
    if (!locator) {
      throw new Error(`AccountSetupPage: no locator mapped for field "${fieldName}"`);
    }
    return locator;
  }

  /** Fills the password field with an explicit value (use "" to test empty-password validation). */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /** Clears the named field so it is left empty before form submission. */
  async clearField(fieldName: string): Promise<void> {
    await this.getFieldLocator(fieldName).clear();
  }

  /** Fills the named field with whitespace-only text. */
  async enterWhitespaceInField(fieldName: string): Promise<void> {
    await this.getFieldLocator(fieldName).fill("   ");
  }

  /** Fills the mobile number field with an explicit value for format-validation tests. */
  async enterMobileNumber(value: string): Promise<void> {
    await this.mobileNumberInput.fill(value);
  }

  /**
   * Asserts that the HTML5 native validation message for the named field
   * matches the expected error string (e.g. "Please fill in this field.").
   */
  async expectFieldErrorMessage(fieldName: string, errorMessage: string): Promise<void> {
    const locator = this.getFieldLocator(fieldName);
    const validationMessage = await locator.evaluate((el: HTMLInputElement) => el.validationMessage);
    // normalize Linux Chromium vs macOS Chrome native message wording
    expect(validationMessage.replace("fill out", "fill in")).toBe(errorMessage);
  }
}
