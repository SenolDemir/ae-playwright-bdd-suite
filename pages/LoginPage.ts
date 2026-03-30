import { BasePage } from "./BasePage.js";
import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import  { UserFactory} from "../test-data/UserFactory";
import type { SignupUser } from "../test-data/UserFactory";


export class LoginPage extends BasePage {
  // private readonly _emailInput: Locator;
  // private readonly _passwordInput: Locator;
  // private readonly _loginButton: Locator;

  // public constructor(page: Page) {
  //   super(page);
  //   this._emailInput = this._page.locator('[data-qa="login-email"]');
  //   this._passwordInput = this._page.locator('[data-qa="login-password"]');
  //   this._loginButton = this._page.locator('[data-qa="login-button"]');
  // }

  // public async login(email: string, password: string): Promise<void> {
  //   await this._emailInput.fill(email);
  //   await this._passwordInput.fill(password);
  //   await this._loginButton.click();
  // }

  // ----------------------------------------------------------------

  public generatedSignupUser: SignupUser = UserFactory.createValidSignupUser();

  private readonly signupSection: Locator = this.page.locator(".signup-form");
  private readonly accountInfoSection: Locator =
    this.page.locator(".login-form");
  public readonly newUserNameInput: Locator =
    this.signupSection.getByPlaceholder("Name");
  public readonly signupEmailInput: Locator =
    this.signupSection.getByPlaceholder("Email Address");
  public readonly signupButton: Locator = this.signupSection.getByRole(
    "button",
    { name: "Signup" },
  );

  public readonly enterAccountInformationHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Enter Account Information" },
  );

  public readonly titleMrRadioInput: Locator = this.page.locator("#id_gender1");
  public readonly titleMrsRadioInput: Locator =
    this.page.locator("#id_gender2");
  public readonly passwordInput: Locator = this.page.getByLabel("Password");

  public readonly newsletterCheckbox: Locator = this.page.getByRole(
    "checkbox",
    { name: /Sign up for our newsletter!/i },
  );
  public readonly offersFromPartnersCheckbox: Locator = this.page.getByRole(
    "checkbox",
    {
      name: /Receive special offers from our partners!/i,
    },
  );

  // --------------- Personal Information Inputs ---------------------------------------

  public readonly firstNameInput: Locator = this.page.getByLabel("First name");
  public readonly lastNameInput: Locator = this.page.getByLabel("Last name");
  public readonly companyInput: Locator = this.page.getByLabel("Company", {
    exact: true,
  });
  public readonly address1Input: Locator = this.page.locator(
    '[data-qa="address"]',
  );
  public readonly address2Input: Locator = this.page.locator(
    '[data-qa="address2"]',
  );

  public readonly stateInput: Locator = this.page.getByRole("textbox", {
    name: /state/i,
  });
  public readonly cityInput: Locator = this.page.getByRole("textbox", {
    name: /city/i,
  });
  public readonly zipcodeInput: Locator = this.page.locator(
    '[data-qa="zipcode"]',
  );
  public readonly mobileNumberInput: Locator = this.page.locator(
    '[data-qa="mobile_number"]',
  );

  public readonly createAccountButton: Locator = this.page.getByRole("button", {
    name: "Create Account",
  });

  public readonly accountCreatedHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Account Created!", level: 2 },
  );

  public readonly continueButton: Locator = this.page.getByRole("link", {
    name: "Continue",
  });

  // ---------------------- Functions ---------------------------------------------------

  // async expectHomePageVisible(): Promise<void> {
  //   await expect(this.page).toHaveURL(
  //     process.env.BASE_URL || "https://automationexercise.com/",
  //   );
  //   await expect(this.page).toHaveTitle("Automation Exercise");
  // }

  async expectSignupFormVisible(): Promise<void> {
    await expect(this.newUserNameInput).toBeVisible();
    await expect(this.signupEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  async expectFormHeadingVisible(): Promise<void> {
    await expect(
      this.page.getByRole("heading", { name: "Enter Account Information" }),
    ).toBeVisible();
  }

  async selectTitle(): Promise<void> {
    // select title randomly for testing both options
    const titles = ["Mr.", "Mrs."];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const normalizedTitle = randomTitle.replace(/\./g, "").toLowerCase();
  }

  async selectRandomDateOfBirth(): Promise<void> {
    const dayDropdown: Locator = this.page.locator('[data-qa="d"]');
    const monthDropdown: Locator = this.page.locator('[data-qa="months"]');
    const yearDropdown: Locator = this.page.locator('[data-qa="years"]');

    await dayDropdown.click();
    dayDropdown.selectOption({ label: this.generatedSignupUser.dayOfBirth });
    await monthDropdown.click();
    await monthDropdown.selectOption({
      label: this.generatedSignupUser.monthOfBirth,
    });
    await yearDropdown.click();
    await yearDropdown.selectOption({
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

  // ------------- Step 1: Signup form (name + email) -------------------

  async submitSignupCredentials(): Promise<void> {
    this.generatedSignupUser = UserFactory.createValidSignupUser();
    await this.newUserNameInput.fill(this.generatedSignupUser.fullName);
    await this.signupEmailInput.fill(this.generatedSignupUser.email);
    await this.signupButton.click();
  }

  // ----------- Step 2: Full account info form --------------

  async completeAccountInformationForm(): Promise<void> {
    await this.selectTitle();
    await this.passwordInput.fill(this.generatedSignupUser.password);
    await this.selectRandomDateOfBirth();
    await this.newsletterCheckbox.check();
    await this.offersFromPartnersCheckbox.check();
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

  // ----------- Step 3: Account created confirmation --------------

  async expectAccountCreated(): Promise<void> {
    await expect(this.page).toHaveURL(
      "https://www.automationexercise.com/account_created",
    );
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.accountCreatedHeading).toHaveText("Account Created!");
  }
}
