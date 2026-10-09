import { test as setup } from "@playwright/test";
import { HomePage } from "../../ui/pages/home.page";
import { LoginPage } from "../../ui/pages/login.page";

export const AUTH_FILE = ".auth/user.json";

setup("authenticate via UI login", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto("/");
  await homePage.nav.navigateTo("Signup / Login");
  await loginPage.expectLoginPageVisible();
  await loginPage.loginWithValidCredentials();
  await homePage.nav.expectLoggedIn();

  await page.context().storageState({ path: AUTH_FILE });
  
});
