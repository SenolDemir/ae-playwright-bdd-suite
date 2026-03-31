import { BasePage } from "./BasePage.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserFactory } from "../test-data/UserFactory";
import type { SignupUser } from "../test-data/UserFactory";

export class LoginPage extends BasePage {
  public generatedSignupUser: SignupUser = UserFactory.createValidSignupUser();

  // signup form elements
  private readonly signupSection: Locator = this.page.locator(".signup-form");
  public readonly newUserNameInput: Locator =
    this.signupSection.getByPlaceholder("Name");
  public readonly signupEmailInput: Locator =
    this.signupSection.getByPlaceholder("Email Address");
  public readonly signupButton: Locator = this.signupSection.getByRole(
    "button",
    { name: "Signup" },
  );

  // account information form elements
  private readonly accountInfoSection: Locator =
    this.page.locator(".login-form");
  public readonly enterAccountInformationHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Enter Account Information" },
  );

  // Container
  public readonly accountInformationForm: Locator = this.page.locator(
    'form[action="/signup"]',
  );

  // title radio buttons
  public readonly titleMrRadioButton: Locator =
    this.accountInformationForm.getByLabel("Mr.");
  public readonly titleMrsRadioButton: Locator =
    this.accountInformationForm.getByLabel("Mrs.");

  public readonly passwordInput: Locator = this.page.getByLabel("Password");

  // Date of Birth Dropdowns
  public readonly daysDropdown: Locator =
    this.accountInformationForm.locator('[data-qa="days"]');
  public readonly monthsDropdown: Locator =
    this.accountInformationForm.locator('[data-qa="months"]');
  public readonly yearsDropdown: Locator =
    this.accountInformationForm.locator('[data-qa="years"]');

  // Checkboxes
  public readonly newsletterCheckbox: Locator =
    this.accountInformationForm.getByRole("checkbox", {
      name: /Sign up for our newsletter!/i,
    });
  public readonly offersCheckbox: Locator =
    this.accountInformationForm.getByRole("checkbox", {
      name: /Receive special offers from our partners!/i,
    });

  //  Personal Information Inputs
  public readonly firstNameInput: Locator =
    this.accountInformationForm.getByLabel("First name");
  public readonly lastNameInput: Locator =
    this.accountInformationForm.getByLabel("Last name");
  public readonly companyInput: Locator = this.page.getByLabel("Company", {
    exact: true,
  });
  public readonly address1Input: Locator = 
  this.accountInformationForm.locator('[data-qa="address"]',);
  public readonly address2Input: Locator =
    this.accountInformationForm.getByLabel("Address 2");
  public readonly stateInput: Locator =
    this.accountInformationForm.getByLabel("State");
  public readonly cityInput: Locator =
    this.accountInformationForm.getByLabel("City");
  public readonly zipcodeInput: Locator = this.page.locator(
    '[data-qa="zipcode"]',
  );
  public readonly mobileNumberInput: Locator =
    this.accountInformationForm.getByLabel("Mobile Number");
  public readonly createAccountButton: Locator =
    this.accountInformationForm.getByRole("button", { name: "Create Account" });

  public readonly accountCreatedHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Account Created!", level: 2 },
  );

  public readonly continueButton: Locator = this.page.getByRole("link", {
    name: "Continue",
  });
  // ---------------------- Functions ---------------------------------------------------

  async expectSignupFormVisible(): Promise<void> {
    await expect(this.newUserNameInput).toBeVisible();
    await expect(this.signupEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  // ------------- Step 1: Signup form (name + email) -------------------

  async submitSignupCredentials(): Promise<void> {
    this.generatedSignupUser = UserFactory.createValidSignupUser();
    await this.newUserNameInput.fill(this.generatedSignupUser.fullName);
    await this.signupEmailInput.fill(this.generatedSignupUser.email);
    await this.signupButton.click();
  }

  // ------------- Step 2: Account information form -------------------

  async expectFormHeadingVisible(): Promise<void> {
    await expect(
      this.page.getByRole("heading", { name: "Enter Account Information" }),
    ).toBeVisible();
  }

  async selectTitle(): Promise<void> {
    // select title randomly for testing both options
    const titles = ["Mr.", "Mrs."];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];

    if (randomTitle === "Mr.") {
      await this.titleMrRadioButton.check();
      return;
    }

    await this.titleMrsRadioButton.check();
  }

  async selectRandomDateOfBirth(): Promise<void> {
    await this.daysDropdown.selectOption({
      label: this.generatedSignupUser.dayOfBirth,
    });
    await this.monthsDropdown.selectOption({
      label: this.generatedSignupUser.monthOfBirth,
    });
    await this.yearsDropdown.selectOption({
      label: this.generatedSignupUser.yearOfBirth,
    });
  }

  async selectRandomCountry(): Promise<string> {
    const countryDropdown: Locator = this.page.getByRole("combobox", {
      name: "Country",
    });
    await countryDropdown.click();
    const options = await countryDropdown.locator("option").allTextContents();
    const randomCountry = faker.helpers.arrayElement(options);
    await countryDropdown.selectOption({ label: randomCountry });
    return randomCountry;
  }

  // ----------- Step 3: Full account info form --------------

  async completeAccountInformationForm(): Promise<void> {
    await this.selectTitle();
    await this.passwordInput.fill(this.generatedSignupUser.password);
    await this.selectRandomDateOfBirth();
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.firstNameInput.fill(this.generatedSignupUser.firstName);
    await this.lastNameInput.fill(this.generatedSignupUser.lastName);
    await this.companyInput.fill(this.generatedSignupUser.company);
    await this.address1Input.fill(this.generatedSignupUser.address1);
    await this.address2Input.fill(this.generatedSignupUser.address2);
    await this.selectRandomCountry();
    await this.stateInput.fill(this.generatedSignupUser.state);
    await this.cityInput.fill(this.generatedSignupUser.city);
    await this.zipcodeInput.fill(this.generatedSignupUser.zipcode);
    await this.mobileNumberInput.fill(this.generatedSignupUser.mobileNumber);
  }

  // ----------- Step 4: Account created confirmation --------------

  async expectAccountCreated(): Promise<void> {
    await expect(this.page).toHaveURL(
      "https://www.automationexercise.com/account_created",
    );
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.accountCreatedHeading).toHaveText("Account Created!");
  }
}
