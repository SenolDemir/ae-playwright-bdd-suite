import {Given, When, Then, expect, } from "../../../src/fixtures/ui.fixtures.ts";
import { faker } from "@faker-js/faker";

const NAME_TOKENS: Record<string, () => string> = {
  "[too_long]": () => faker.string.alpha({ length: 100 }),
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

Then("my account should be created successfully", async ({ signupPage }) => {
  await signupPage.expectAccountCreated();
});

When("I click continue", async ({ page, signupPage }) => {
  await signupPage.continueButton.click();
});

Then(
  "I should be logged in as a registered user on the home page",
  async ({ homePage, testData }) => {
    await homePage.expectLoggedIn(testData.newUser.fullName);
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

// ------------------------------------------------------------------

When("I enter name {string}", async ({ signupPage }, rawName: string) => {
  const name = NAME_TOKENS[rawName]?.() ?? rawName; // Replace token with pre-defined value if it exists
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
  async ({ signupPage }, message: string) => {
    await signupPage.expectSignupError(message);
  },
);

When("I leave the email field empty", async ({ signupPage }) => {
  await signupPage.newUserEmailInput.clear();
});
