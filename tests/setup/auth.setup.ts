import { test as setup } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { LoginPage } from "../../src/pages/login.page";

export const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto("/");
  await homePage.nav.navigateTo("Signup / Login");
  await loginPage.expectLoginPageVisible();
  await loginPage.loginWithValidCredentials();
  await homePage.nav.expectLoggedIn();

  await page.context().storageState({ path: authFile });
});
