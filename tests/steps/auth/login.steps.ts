import { sign } from "node:crypto";
import { Given, When, Then, expect } from "../../../src/fixtures/ui.fixtures.ts";
import { LoginPage } from "../../../src/pages/LoginPage.ts";



Then("I should be on the login page", async ({ loginPage }) => {
  await loginPage.expectLoginPageVisible();
});

When("I login with valid email and password", async ({ loginPage }) => {
  await loginPage.loginWithValidCredentials();
});

When("I enter my email as {string}", async ({ loginPage }, email: string) => {
  await loginPage.loginEmailInput.fill(email);
});

When("I enter my password as {string}", async ({ loginPage }, password: string) => {
  await loginPage.loginPasswordInput.fill(password);
});

When("I click the login button", async ({ loginPage }) => {
  await loginPage.loginButton.click();
});

Then("I should be logged in successfully", async ({ homePage }) => {
  await homePage.expectLoggedIn();
});

Then("I should see {string} in the navigation", async ({ loginPage }, username: string) => {
  const loggedInUsername = await loginPage.nav.getLoggedInUsername();
  expect(loggedInUsername).toContain(username);
});

When("I click the logout button", async ({ loginPage }) => {
  await loginPage.nav.logout();
});

Then("I should not be logged in", async ({ loginPage }) => {
  await loginPage.nav.expectNotLoggedIn();
});

Then("I should see an error message {string}", async ({ loginPage }, errorMessage: string) => {
  await expect(loginPage.loginErrorMessage).toHaveText(errorMessage);
});


Then("the email field should show a validation error as {string}", async ({ loginPage }, expectedMessage: string) => {
  const actualMessage = await loginPage.getLoginEmailValidationMessage();
  expect(actualMessage).toBe(expectedMessage);
});

Then("the password field should show a validation error as {string}", async ({ loginPage }, expectedMessage: string) => {
  const actualMessage = await loginPage.getLoginPasswordValidationMessage();
  expect(actualMessage).toBe(expectedMessage);
});
