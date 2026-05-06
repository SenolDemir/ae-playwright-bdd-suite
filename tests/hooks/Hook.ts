import { After, Before } from "../../src/fixtures/ui.fixtures.js";
import { BasePage } from "../../src/pages/BasePage.js";

Before(async ({ page }) => {
  await page.goto("/");
  const consentButton = page.getByRole("button", { name: "Consent" });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
});

After(async ({}) => {
  // Common scenario cleanups can be added here if needed
});
