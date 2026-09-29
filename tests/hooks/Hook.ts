import { After, Before } from "../../src/fixtures/ui.fixtures.js";

Before(async ({ page }) => {
  // Register the overlay handler BEFORE navigating
  await page.addLocatorHandler(page.locator(".fc-consent-root"), async (overlay) => {
    await overlay.getByRole("button", { name: "Consent" }).click();
  });

  // Skip ads/analytics/consent scripts that slow down or block page load
  await page.route(
    /googlesyndication|doubleclick|googletagmanager|google-analytics|adservice|fundingchoices/,
    (route) => route.abort(),
  );

  await page.goto("/", { waitUntil: "domcontentloaded" });

});
