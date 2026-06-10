import {
  Given,
  When,
  Then,
  expect,
} from "../../../src/fixtures/ui.fixtures.ts";

Then("I should be on the account information setup page", async ({ page }) => {
  await expect(page).toHaveURL(/\/signup/);
  await expect(
    page.getByRole("heading", { name: "Enter Account Information" }),
  ).toBeVisible();
});

When(
  "I complete the account information form",
  async ({ accountSetupPage }) => {
    await accountSetupPage.completeAccountSetupForm();
  },
);

When("I submit the registration", async ({ accountSetupPage }) => {
  await accountSetupPage.submitAccountSetup();
});

When(
  "I complete the account information form with valid data",
  async ({ accountSetupPage }) => {
    await accountSetupPage.completeAccountSetupForm();
  },
);

When(
  "I enter {string} in the password field",
  async ({ accountSetupPage }, password: string) => {
    await accountSetupPage.passwordInput.fill(password);
  },
);

When("I leave the {string} field empty", async ({ accountSetupPage }, fieldName: string) => {
    await accountSetupPage.clearField(fieldName);
  },
);

Then(
  "I should see the {string} field error message {string}",
  async ({ accountSetupPage }, fieldName: string, errorMessage: string) => {
    await accountSetupPage.expectFieldErrorMessage(fieldName, errorMessage);
  },
);

When(
  "I enter whitespace only in the {string} field",
  async ({ accountSetupPage }, fieldName: string) => {
    await accountSetupPage.enterWhitespaceInField(fieldName);
  },
);

When("I enter {string} in the mobile_number field", async ({ accountSetupPage }, mobileNumber: string) => {
  await accountSetupPage.mobileNumberInput.fill(mobileNumber);
});
