import { After, Before } from "../../src/fixtures/ui.fixtures.js";

Before(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.addLocatorHandler(page.locator(".fc-consent-root"), async (overlay) => {
    await overlay.getByRole("button", { name: "Consent" }).click();
  });
});
