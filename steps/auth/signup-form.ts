
import { Given, When, Then, expect } from "../../fixtures/pages.ts";


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

When("I leave both name and email fields empty", async ({}) => {
  // Step: When I leave both name and email fields empty
  // From: features/auth/signup-form.feature:55:19
});

When('I enter email "<iframe src={string}>"', async ({}, arg: string) => {
  // Step: And I enter email "<iframe src="malicious.com">"
  // From: features/auth/signup-form.feature:127:19
});
