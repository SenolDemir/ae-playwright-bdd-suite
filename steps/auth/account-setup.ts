import { Given, When, Then, expect } from "../../fixtures/testbase.ts";


Then("I should be on the account information setup page", async ({ page }) => {
  await expect(page).toHaveURL(/\/signup/);
  await expect(
    page.getByRole("heading", { name: "Enter Account Information" }),
  ).toBeVisible();
});

When(
  "I complete the account information form",
  async ({ accountSetupPage }) => {
    await accountSetupPage.completeAccountInformationForm();
  },
);

When("I submit the registration", async ({ accountSetupPage }) => {
  await accountSetupPage.createAccountButton.click();
});
