import { Given, When, Then, expect } from "../../../fixtures/ui.fixtures";

Then("I should be on the login page", async ({ loginSignupPage }) => {
  await loginSignupPage.expectLoginPageVisible();
});

When("I login with valid email and password", async ({ loginSignupPage }) => {
  await loginSignupPage.loginWithValidCredentials();
});

When("I enter my email as {string}", async ({ loginSignupPage }, email: string) => {
  await loginSignupPage.loginEmailInput.fill(email);
});

When("I enter my password as {string}", async ({ loginSignupPage }, password: string) => {
  await loginSignupPage.loginPasswordInput.fill(password);
});

When("I click the login button", async ({ loginSignupPage }) => {
  await loginSignupPage.loginButton.click();
});

Then("I should be logged in successfully", async ({ loginSignupPage }) => {
  await loginSignupPage.nav.expectLoggedIn();
});

Then("I should see {string} in the navigation", async ({ loginSignupPage }, username: string) => {
  const loggedInUsername = await loginSignupPage.nav.getLoggedInUsername();
  expect(loggedInUsername).toContain(username);
});

When("I click the logout button", async ({ loginSignupPage }) => {
  await loginSignupPage.nav.logout();
});

Then("I should not be logged in", async ({ loginSignupPage }) => {
  await loginSignupPage.nav.expectNotLoggedInLoginPage();
});

Then("I should see an error message {string}", async ({ loginSignupPage }, errorMessage: string) => {
  await expect(loginSignupPage.loginErrorMessage).toHaveText(errorMessage);
});

Then(
  "the email field should show a validation error as {string}",
  async ({ loginSignupPage }, expectedMessage: string) => {
    const actualMessage = await loginSignupPage.getLoginEmailValidationMessage();
    // normalize Linux Chromium vs macOS Chrome native message wording
    expect(actualMessage.replace("fill out", "fill in")).toBe(expectedMessage);
  },
);

Then(
  "the password field should show a validation error as {string}",
  async ({ loginSignupPage }, expectedMessage: string) => {
    const actualMessage = await loginSignupPage.getLoginPasswordValidationMessage();
    expect(actualMessage.replace("fill out", "fill in")).toBe(expectedMessage);
  },
);
