import { After, Before } from "../../src/fixtures/ui.fixtures.js";
import { BasePage } from "../../src/pages/BasePage.js";

Before(async ({ page }) => {
  await page.goto("/");
  const consentButton = page.getByRole("button", { name: "Consent" });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
});

After(async ({ page, $testInfo }) => {
  // when failure occurs, capture current URL and page title as annotations
  // for better debugging context in reports
  if ($testInfo.errors.length > 0) {
    $testInfo.annotations.push({
      type: "debug-context",
      description: JSON.stringify({
        url: page.url(),
        title: await page.title(),
        timestamp: new Date().toISOString(),
      }),
    });
  }
});
