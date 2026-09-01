import { After, Before } from "../../src/fixtures/ui.fixtures.js";


Before(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const consentButton = page.getByRole("button", { name: "Consent" });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
});


