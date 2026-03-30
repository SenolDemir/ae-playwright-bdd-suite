import { After, Before } from "../fixtures/pages.js";

Before(async ({ page }) => {
  const consentButton = page
    .locator(".fc-consent-root .fc-cta-consent")
    .first();
  const consentOverlay = page.locator(".fc-dialog-overlay");

  // Navigate to the homepage before each scenario.
  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 15000 });
  // waits only for DOM to be ready, not all resources
  // to speed up the test execution. Adjust the timeout as needed.

  // Handle cookie consent if the banner is present.
  if ((await consentButton.count()) > 0 && (await consentButton.isVisible())) {
    await consentButton.click({ timeout: 5000 });
    await consentOverlay.waitFor({ state: "hidden", timeout: 10000 });
  }
});

After(async () => {
  // Common scenario cleanup goes here.
});
