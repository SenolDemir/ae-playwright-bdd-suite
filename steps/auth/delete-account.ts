import { Given, When, Then, expect } from "../../fixtures/testbase.ts";

Given(
  "I have a registered and logged in account",
  async ({ signupPage, homePage, accountSetupPage, testContext }) => {
    await homePage.navigateToLoginPage();
    await signupPage.submitSignupCredentials();
    await accountSetupPage.completeAccountInformationForm();
    await accountSetupPage.createAccountButton.click();
    await accountSetupPage.expectAccountCreated();
    await accountSetupPage.clickContinue();
    await homePage.expectLoggedIn(testContext.newUser.fullName);
  },
);

When("I submit to delete the account", async ({ homePage }) => {
  await homePage.submitDeleteAccount();
});

Then("I should see the account deleted confirmation", async ({ homePage }) => {
  await homePage.expectAccountDeletedConfirmation();
});

When("I should be not logged in on the home page", async ({ homePage }) => {
  await homePage.expectNotLoggedInOnHomePage();
});
