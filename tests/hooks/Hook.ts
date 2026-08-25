import { After, Before } from "../../src/fixtures/ui.fixtures.js";
import { capturePageContext } from "../../src/utils/page.context.js";

Before(async ({ page }) => {
  await page.goto("/");
  const consentButton = page.getByRole("button", { name: "Consent" });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
});

After(async ({ page, $testInfo }) => {
  if ($testInfo.status !== $testInfo.expectedStatus) {
    await capturePageContext(page, $testInfo);
  }
});
