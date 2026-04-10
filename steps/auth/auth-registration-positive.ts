import { Given, When, Then, expect } from "../../fixtures/testbase.ts";

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

Then("I should be on the account information setup page", async ({ page }) => {
  await expect(page).toHaveURL(/\/signup/);
  await expect(
    page.getByRole("heading", { name: "Enter Account Information" }),
  ).toBeVisible();
});

When(
  "I complete the account information form",
  async ({ accountSetupPage }) => {
    await accountSetupPage.completeAccountInformationForm();
  },
);

When("I submit the registration", async ({ accountSetupPage }) => {
  await accountSetupPage.createAccountButton.click();
});

Then(
  "my account should be created successfully",
  async ({ accountSetupPage }) => {
    await accountSetupPage.expectAccountCreated();
  },
);

When("I click continue", async ({ page, accountSetupPage }) => {
  await accountSetupPage.continueButton.click();
});

Then(
  "I should be logged in as a registered user on the home page",
  async ({ homePage, testContext }) => {
    await homePage.expectLoggedIn(testContext.newUser.fullName);
  },
);
