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

When("I complete the account information form", async ({ accountSetupPage }) => {
  await accountSetupPage.completeAccountSetupForm();
});

When("I submit the registration", async ({ accountSetupPage }) => {
  await accountSetupPage.submitAccountSetup();

});

When("I complete the account information form with valid data", async ({accountSetupPage}) => {
  await accountSetupPage.completeAccountSetupForm();
});

When("I leave the {string} field empty", async ({}, arg: string) => {
  // Step: And I leave the "password" field empty
  // From: tests/features/auth/account-setup.feature:47:19
});

Then(
  "I should see the {string} field error message {string}",
  async ({}, arg: string, arg1: string) => {
    // Step: Then I should see the "password" field error message "Please fill in this field."
    // From: tests/features/auth/account-setup.feature:49:19
  },
);
