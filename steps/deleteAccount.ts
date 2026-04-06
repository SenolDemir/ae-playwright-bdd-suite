import { Given, When, Then, expect } from "../fixtures/pages.ts";

Given(
  "I have a registered and logged in account",
  async ({ signupPage, homePage }) => {
    await homePage.navigateToLoginPage();
    await signupPage.submitSignupCredentials();
    await signupPage.completeAccountInformationForm();
    await signupPage.createAccountButton.click();
    await signupPage.expectAccountCreated();
    await signupPage.continueButton.click();
    await homePage.expectLoggedInAs(signupPage.generatedSignupUser.fullName);
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
