import { Given, When, Then, expect } from "../../../src/fixtures/ui.fixtures.ts";
import { faker } from "@faker-js/faker";
import { SignupDataGenerator } from "../../../src/data/signup.generator.js";

const NAME_TOKENS: Record<string, () => string> = {
  "[too_long]": () => faker.string.alpha({ length: 100 }),
};

const EMAIL_TOKENS: Record<string, () => string> = {
  "[valid_email]": () => SignupDataGenerator.generateSignupData().email,
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

Then("I should see the signup form", async ({ signupPage }) => {
  await signupPage.expectSignupFormVisible();
});

When("I submit valid signup credentials", async ({ signupPage, page }) => {
  await signupPage.submitSignupCredentials();
  await expect(page).toHaveURL(/\/signup/);
});

Then("my account should be created successfully", async ({ accountSetupPage }) => {
  await accountSetupPage.expectAccountCreated();
});

When("I click continue", async ({ page, accountSetupPage }) => {
  await accountSetupPage.clickContinue();
});

Then("I should be logged in as a registered user on the home page", async ({ loginPage, signupData }) => {
  await loginPage.nav.expectLoggedIn(signupData.fullName);
});

When("I submit to delete the account", async ({ homePage }) => {
  await homePage.submitDeleteAccount();
});

Then("I should see the account deleted confirmation", async ({ homePage }) => {
  await homePage.expectAccountDeletedConfirmation();
});

When("I should be not logged in on the home page", async ({ homePage }) => {
  await homePage.nav.expectNotLoggedIn();
});

// ------------------------------------------------------------------

When("I enter name {string}", async ({ signupPage }, rawName: string) => {
  // Replace token with pre-defined value if it exists
  const name = NAME_TOKENS[rawName]?.() ?? rawName;
  await signupPage.enterNewUserName(name);
});

When("I enter email {string}", async ({ signupPage }, rawEmail: string) => {
  const email = EMAIL_TOKENS[rawEmail]?.() ?? rawEmail;
  await signupPage.enterNewUserEmail(email);
});

When("I click the {string} button on the Login\\/Signup page", async ({ signupPage }, buttonName: string) => {
  await signupPage.clickSignupButton();
});

Then("I should see the name field error message {string}", async ({ signupPage }, expectedMessage: string) => {
  const actualMessage = await signupPage.getNameValidationMessage();
  // normalize Linux Chromium vs macOS Chrome native message wording
  expect(actualMessage.replace("fill out", "fill in")).toBe(expectedMessage);
});

Then("I should see the email field error message {string}", async ({ signupPage }, expectedMessage: string) => {
  const actualMessage = await signupPage.getEmailValidationMessage();
  expect(actualMessage.replace("fill out", "fill in")).toBe(expectedMessage);
});

Then("I leave the name field empty", async ({ signupPage }) => {
  await signupPage.enterNewUserName("");
});

Then("I should remain on the Login\\/Signup page", async ({ signupPage }) => {
  await signupPage.expectSignupFormVisible();
});

Then("I should see the existing email message {string}", async ({ signupPage }, expectedMessage: string) => {
  const actualMessage = await signupPage.getExistingEmailMessage();
  expect(actualMessage).toBe(expectedMessage);
});

When("I leave the email field empty", async ({ signupPage }) => {
  await signupPage.newUserEmailInput.clear();
});
