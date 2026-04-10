import { After, Before } from "../fixtures/testbase.js";
import { BasePage } from "../pages/BasePage.js";

Before(async ({ page, testContext }) => {
  const basePage = new BasePage(page, testContext);

  await page.goto("/");
  await basePage.dismissCookieConsent();
});

After(async () => {
  // Common scenario cleanup goes here.
});
