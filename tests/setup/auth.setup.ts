import { test as setup } from "@playwright/test";
import { HomePage } from "../../ui/pages/home.page";
import { LoginSignupPage } from "../../ui/pages/login-signup.page";

export const AUTH_FILE = ".auth/user.json";

setup("authenticate via UI login", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginSignupPage = new LoginSignupPage(page);

  await page.goto("/");
  await homePage.nav.navigateTo("Signup / Login");
  await loginSignupPage.expectLoginPageVisible();
  await loginSignupPage.loginWithValidCredentials();
  await homePage.nav.expectLoggedIn();

  await page.context().storageState({ path: AUTH_FILE });
  
});
