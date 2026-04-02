import { Given, When, Then, expect } from "../fixtures/pages.ts";

Given("I am on the Automation Exercise home page", async ({ homePage }) => {
  await homePage.expectHomePageVisible();
});

Given("I navigate to the registration page", async ({ homePage }) => {
  await homePage.navigateToLoginPage();
});

Then("I should see the signup form", async ({ loginPage }) => {
  await loginPage.expectSignupFormVisible();
});

When("I submit valid signup credentials", async ({loginPage}) => {
  await loginPage.submitSignupCredentials();
});

Then("I should be on the account information setup page", async ({loginPage}) => {
  await loginPage.expectFormHeadingVisible();
  
});

When("I complete the account information form", async ({loginPage}) => {
  await loginPage.completeAccountInformationForm();
});

When("I submit the registration", async ({loginPage}) => {
  await loginPage.createAccountButton.click();
});

Then("my account should be created successfully", async ({loginPage}) => {
  await loginPage.expectAccountCreated();
});

When("I click continue", async ({loginPage}) => {
  await loginPage.continueButton.click();
});

Then(
  "I should be logged in as a registered user on the home page", async ({homePage}) => {
    
    await homePage.expectLoggedInUserVisible();
  },
);



