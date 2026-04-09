import { Given, When, Then, expect } from "../../fixtures/pages.ts";

Given("I am on the Automation Exercise home page", async ({ homePage }) => {
  await homePage.expectHomePageVisible();
});

Given("I navigate to the registration page", async ({ homePage }) => {
  await homePage.navigateToLoginPage();
});

Then("I should see the signup form", async ({ signupPage }) => {
  await signupPage.expectSignupFormVisible();
});

When("I submit valid signup credentials", async ({ signupPage, page }) => {
  await signupPage.submitSignupCredentials();
  await expect(page).toHaveURL(/\/signup/);
});

Then(
  "I should be on the account information setup page",
  async ({ page, signupPage }) => {
    await expect(page).toHaveURL(/\/signup/);
    await signupPage.expectFormHeadingVisible();
  },
);

When("I complete the account information form", async ({ signupPage }) => {
  await signupPage.completeAccountInformationForm();
});

When("I submit the registration", async ({ signupPage }) => {
  await signupPage.createAccountButton.click();
});

Then("my account should be created successfully", async ({ signupPage }) => {
  await signupPage.expectAccountCreated();
});

When("I click continue", async ({ page, signupPage }) => {
  await signupPage.continueButton.click();
});

Then(
  "I should be logged in as a registered user on the home page",
  async ({ homePage, signupPage }) => {
    await homePage.expectLoggedIn(signupPage.generatedSignupUser.fullName);
  },
);
