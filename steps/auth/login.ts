import { sign } from "node:crypto";
import { Given, When, Then, expect } from "../../fixtures/ui.fixtures.ts";

When("I login with valid email and password", async ({ loginPage }) => {
  await loginPage.loginWithValidCredentials();
});

When("I enter my email as {string}", async ({ loginPage }, email: string) => {
  await loginPage.loginEmailInput.fill(email);
});

When(
  "I enter my password as {string}",
  async ({ loginPage }, password: string) => {
    await loginPage.loginPasswordInput.fill(password);
  },
);

When("I click the login button", async ({ loginPage }) => {
  await loginPage.loginButton.click();
});

Then("I should be logged in successfully", async ({ homePage }) => {
  await homePage.expectLoggedIn(process.env.TEST_USERNAME || "");
});
