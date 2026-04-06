import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { SignupPage } from "../pages/SignupPage";
import { HomePage } from "../pages/HomePage";

type Fixtures = {
  // ...set types of your custom fixtures
  signupPage: SignupPage;
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  // implement your custom fixtures
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
export { expect };
