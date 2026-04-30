import { After, Before } from "../fixtures/ui-fixtures.js";
import { BasePage } from "../pages/BasePage.js";

Before(async ({ page, testData }) => {
  const basePage = new BasePage(page, testData);

  await page.goto("/");
  await basePage.dismissCookieConsent();
});

After(async ({}) => {
  // Common scenario cleanup goes here.
});
