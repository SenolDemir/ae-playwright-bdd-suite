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

When("I complete the account information form", async ({ signupPage }) => {
  await signupPage.completeAccountInformationForm();
});

When("I submit the registration", async ({ signupPage }) => {
  await signupPage.createAccountButton.click();
});
