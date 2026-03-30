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
