import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { SignupPage } from "../pages/SignupPage";
import { AccountSetupPage } from "../pages/AccountSetupPage";
import { HomePage } from "../pages/HomePage";
import { UserFactory, type SignupUser } from "../test-data/UserFactory";


export interface TestContext {
  newUser: SignupUser; // registration, login, checkout
  // product?: ProductData; // add when you build cart/order tests
  // order?: OrderData;     // add when you build order history tests
}

type Fixtures = {
  // ...set types of your custom fixtures
  signupPage: SignupPage;
  accountSetupPage: AccountSetupPage;
  homePage: HomePage;
  testContext: TestContext;
};

export const test = base.extend<Fixtures>({
  // implement your custom fixtures
  testContext: async ({}, use) => {
    const testContext: TestContext = {
      newUser: UserFactory.createValidSignupUser(),
    };
    await use(testContext);
  },
  signupPage: async ({ page, testContext }, use) => {
    const signupPage = new SignupPage(page, testContext);
    await use(signupPage);
  },
  accountSetupPage: async ({ page, testContext }, use) => {
    const accountSetupPage = new AccountSetupPage(page, testContext);
    await use(accountSetupPage);
  },
  homePage: async ({ page, testContext }, use) => {
    const homePage = new HomePage(page, testContext);
    await use(homePage);
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
export { expect };
