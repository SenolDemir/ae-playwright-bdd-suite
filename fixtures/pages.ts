import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

type Fixtures = {
  // ...set types of your custom fixtures
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  // implement your custom fixtures
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
export { expect };
