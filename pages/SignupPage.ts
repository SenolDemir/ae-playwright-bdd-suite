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

  // account information form heading
  public readonly enterAccountInformationHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Enter Account Information" },
  );

  // account information Container
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

  // Personal Information Inputs
  public readonly firstNameInput: Locator =
    this.accountInformationForm.getByLabel("First name");
  public readonly lastNameInput: Locator =
    this.accountInformationForm.getByLabel("Last name");
  public readonly companyInput: Locator = this.page.getByLabel("Company", {
    exact: true,
  });
  public readonly address1Input: Locator = this.accountInformationForm.locator(
    '[data-qa="address"]',
  );
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

  // Account created confirmation elements
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

  // Account information form functions

  async expectFormHeadingVisible(): Promise<void> {
    await expect(
      this.page.getByRole("heading", { name: "Enter Account Information" }),
    ).toBeVisible();
  }

  // async selectTitle1(): Promise<void> {
  //   // select title randomly for testing both options
  //   const titles = ["Mr.", "Mrs."];
  //   const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  //   if (randomTitle === "Mr.") {
  //     await this.titleMrRadioButton.check();
  //     return;
  //   }
  //   await this.titleMrsRadioButton.check();
  // }

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

  // async selectRandomCountry(): Promise<string> {
  //   const countryDropdown: Locator = this.page.getByRole("combobox", {
  //     name: "Country",
  //   });
  //   await countryDropdown.click();
  //   const options = await countryDropdown.locator("option").allTextContents();
  //   const randomCountry = faker.helpers.arrayElement(options);
  //   await countryDropdown.selectOption({ label: randomCountry });
  //   return randomCountry;
  // }

  async completeAccountInformationForm(): Promise<void> {
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

  async submitAccountCreation(): Promise<void> {
    await this.createAccountButton.click();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(this.page).toHaveURL(
      "https://www.automationexercise.com/account_created",
    );
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.accountCreatedHeading).toHaveText("Account Created!");
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
