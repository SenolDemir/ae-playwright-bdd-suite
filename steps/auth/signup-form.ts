import { Given, When, Then, expect } from "../../fixtures/testbase.ts";

Given("I am on the Automation Exercise home page", async ({ homePage }) => {
  await homePage.expectHomePageVisible();
});

Given("I navigate to {string} page", async ({ homePage }, pageName: string) => {
  await homePage.navigateTo(pageName);
});

Then("I should see the signup form", async ({ signupPage }) => {
  await signupPage.expectSignupFormVisible();
});

When("I submit valid signup credentials", async ({ signupPage, page }) => {
  await signupPage.submitSignupCredentials();
  await expect(page).toHaveURL(/\/signup/);
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
// ------------------------------------------------------------------

When("I enter name {string}", async ({ signupPage }, name: string) => {
  await signupPage.enterNewUserName(name);
});

When("I enter email {string}", async ({ signupPage }, email: string) => {
  await signupPage.enterNewUserEmail(email);
});

When(
  "I click the {string} button on the Login\\/Signup page",
  async ({ signupPage }, buttonName: string) => {
    await signupPage.clickSignupButton();
  },
);

Then(
  "I should see the name field error message {string}",
  async ({ signupPage }, message: string) => {
    await signupPage.expectEmptyNameMessage(message);
  },
);

Then(
  "I should see the email field error message {string}",
  async ({ signupPage }, message: string) => {
    await signupPage.expectEmptyEmailMessage(message);
  },
);

Then("I leave the name field empty", async ({ signupPage }) => {
  await signupPage.enterNewUserName("");
});

Then("I should remain on the Login\\/Signup page", async ({ signupPage }) => {
  await signupPage.expectSignupFormVisible();
});

Then(
  "I should see the error message {string}",
  async ({ signupPage }, arg: string) => {
    // Step: Then I should remain on the Login/Signup page
    // From: features/auth/signup-form.feature:41:19
  },
);

When("I leave the email field empty", async ({}) => {
  // Step: And I leave the email field empty
  // From: features/auth/signup-form.feature:47:19
});
