import { Given, When, Then, expect } from "../../../fixtures/ui.fixtures";
import { faker } from "@faker-js/faker";
import { SignupDataGenerator } from "../../../testdata/signup.generator.js";

const NAME_TOKENS: Record<string, () => string> = {
  "[too_long]": () => faker.string.alpha({ length: 100 }),
};

const EMAIL_TOKENS: Record<string, () => string> = {
  valid_email: () => SignupDataGenerator.generateSignupData().email,
  "[xss_email]": () => `<script>alert('xss')</script>@test.com`,
  "[html_injection_email]": () => `"><img src=x onerror=alert(1)>@test.com`,
};

Given("I am on the Automation Exercise home page", async ({ homePage }) => {
  await homePage.expectHomePageVisible();
});

Given("I navigate to {string} page", async ({ homePage }, pageName: string) => {
  // await homePage.navigateTo(pageName);
  await homePage.nav.navigateTo(pageName);
});

Then("I should see the signup form", async ({ loginSignupPage }) => {
  await loginSignupPage.expectSignupFormVisible();
});

When("I submit valid signup credentials", async ({ loginSignupPage, signupData, page }) => {
  await loginSignupPage.submitSignupCredentials(signupData);
  await expect(page).toHaveURL(/\/signup/);
});

Then("my account should be created successfully", async ({ accountSetupPage }) => {
  await accountSetupPage.expectAccountCreated();
});

When("I click continue", async ({ page, accountSetupPage }) => {
  await accountSetupPage.clickContinue();
});

Then("I should be logged in as a registered user on the home page", async ({ loginSignupPage, signupData }) => {
  await loginSignupPage.nav.expectLoggedIn(signupData.fullName);
});

When("I submit to delete the account", async ({ homePage }) => {
  await homePage.submitDeleteAccount();
});

Then("I should see the account deleted confirmation", async ({ homePage }) => {
  await homePage.expectAccountDeletedConfirmation();
});

When("I should be not logged in on the home page", async ({ homePage }) => {
  await homePage.nav.expectNotLoggedInHomePage();
});

// ---------------- Signup Entry Form --------------------------------------------------

When("I enter name {string}", async ({ loginSignupPage }, rawName: string) => {
  // Replace token with pre-defined value if it exists
  const name = NAME_TOKENS[rawName]?.() ?? rawName;
  await loginSignupPage.enterNewUserName(name);
});

When("I enter email {string}", async ({ loginSignupPage }, rawEmail: string) => {
  const email = EMAIL_TOKENS[rawEmail]?.() ?? rawEmail;
  await loginSignupPage.enterNewUserEmail(email);
});

When("I click the {string} button on the Login\\/Signup page", async ({ loginSignupPage }, buttonName: string) => {
  await loginSignupPage.clickSignupButton();
});

Then(
  "I should see the name field error message {string}",
  async ({ loginSignupPage }, expectedMessage: string) => {
    const actualMessage = await loginSignupPage.getNameValidationMessage();
    // normalize Linux Chromium vs macOS Chrome native message wording
    expect(actualMessage.replace("fill out", "fill in")).toBe(expectedMessage);
  },
);

Then(
  "I should see the email field error message {string}",
  async ({ loginSignupPage }, expectedMessage: string) => {
    const actualMessage = await loginSignupPage.getEmailValidationMessage();
    expect(actualMessage.replace("fill out", "fill in")).toBe(expectedMessage);
  },
);

Then("I leave the name field empty", async ({ loginSignupPage }) => {
  await loginSignupPage.enterNewUserName("");
});

Then("I should remain on the Login\\/Signup page", async ({ loginSignupPage }) => {
  await loginSignupPage.expectSignupFormVisible();
});

Then("I should see the existing email message {string}", async ({ loginSignupPage }, expectedMessage: string) => {
  const actualMessage = await loginSignupPage.getExistingEmailMessage();
  expect(actualMessage).toBe(expectedMessage);
});

When("I leave the email field empty", async ({ loginSignupPage }) => {
  await loginSignupPage.newUserEmailInput.clear();
});

// ----------------- Account Setup Information Form ----------------------------------------

Then("I should be on the account information setup page", async ({ page }) => {
  await expect(page).toHaveURL(/\/signup/);
  await expect(page.getByRole("heading", { name: "Enter Account Information" })).toBeVisible();
});

When("I complete the account information form", async ({ accountSetupPage }) => {
  await accountSetupPage.completeAccountSetupForm();
});

When("I submit the registration", async ({ accountSetupPage }) => {
  await accountSetupPage.submitAccountSetup();
});

When("I complete the account information form with valid data", async ({ accountSetupPage }) => {
  await accountSetupPage.completeAccountSetupForm();
});

When("I enter {string} in the password field", async ({ accountSetupPage }, password: string) => {
  await accountSetupPage.passwordInput.fill(password);
});

When("I leave the {string} field empty", async ({ accountSetupPage }, fieldName: string) => {
  await accountSetupPage.clearField(fieldName);
});

Then(
  "I should see the {string} field error message {string}",
  async ({ accountSetupPage, page }, fieldName: string, errorMessage: string) => {
    await expect(page, "Form should stay on account setup page when input is invalid").not.toHaveURL(
      /account_created/,
    );
    await expect(accountSetupPage.passwordInput).toBeVisible({ timeout: 5_000 });
    await accountSetupPage.expectFieldErrorMessage(fieldName, errorMessage);
  },
);

When("I enter whitespace only in the {string} field", async ({ accountSetupPage }, fieldName: string) => {
  await accountSetupPage.enterWhitespaceInField(fieldName);
});

When("I enter {string} in the mobile_number field", async ({ accountSetupPage }, mobileNumber: string) => {
  await accountSetupPage.mobileNumberInput.fill(mobileNumber);
});
