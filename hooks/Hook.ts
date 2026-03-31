import { After, Before } from "../fixtures/pages.js";
import { BasePage } from "../pages/BasePage.js";

Before(async ({ page }) => {
  const basePage = new BasePage(page);

  await page.goto("/");
  await basePage.dismissCookieConsent();
  
});

After(async () => {
  // Common scenario cleanup goes here.
});
