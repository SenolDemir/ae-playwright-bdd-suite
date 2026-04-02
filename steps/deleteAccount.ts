import { Given, When, Then, expect } from "../fixtures/pages.ts";

Given(
  "I have a registered and logged in account",
  async ({ loginPage, homePage }) => {
    await homePage.navigateToLoginPage();
    await loginPage.submitSignupCredentials();
    await loginPage.completeAccountInformationForm();
    await loginPage.createAccountButton.click();
    await loginPage.expectAccountCreated();
    await loginPage.continueButton.click();
    await homePage.expectLoggedInAs(loginPage.generatedSignupUser.fullName);
  },
);

When("I submit to delete the account", async ({homePage}) => {
  await homePage.submitDeleteAccount();
});

Then("I should see the account deleted confirmation", async ({homePage}) => {
  await homePage.expectAccountDeletedConfirmation();
});

When("I should be not logged in on the home page", async ({homePage}) => {
  await homePage.expectNotLoggedInOnHomePage();
});
