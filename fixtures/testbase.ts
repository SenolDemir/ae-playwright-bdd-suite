import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { SignupPage } from "../pages/SignupPage";
import { AccountSetupPage } from "../pages/AccountSetupPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { UserFactory, type SignupUser } from "../test-data/UserFactory";
import { LoginPage } from "../pages/LoginPage";

export interface TestContext {
  newUser: SignupUser; // registration, login, checkout
  // product?: ProductData; // add when you build cart/order tests
  // order?: OrderData;     // add when you build order history tests
}

type Fixtures = {
  // ...set types of your custom fixtures
  testContext: TestContext;
  signupPage: SignupPage;
  loginPage: LoginPage;
  accountSetupPage: AccountSetupPage;
  homePage: HomePage;
  productPage: ProductPage;
  productDetailPage: ProductDetailPage;
};

export const test = base.extend<Fixtures>({
  // implement your custom fixtures
  testContext: async ({}, use) => {
    const testContext: TestContext = {
      newUser: UserFactory.createValidSignupUser(),
      // product: ProductFactory.createProduct(), // add when you build cart/order tests
    };
    await use(testContext);
  },
  signupPage: async ({ page, testContext }, use) => {
    const signupPage = new SignupPage(page, testContext);
    await use(signupPage);
  },
  loginPage: async ({ page, testContext }, use) => {
    const loginPage = new LoginPage(page, testContext);
    await use(loginPage);
  },
  accountSetupPage: async ({ page, testContext }, use) => {
    const accountSetupPage = new AccountSetupPage(page, testContext);
    await use(accountSetupPage);
  },
  homePage: async ({ page, testContext }, use) => {
    const homePage = new HomePage(page, testContext);
    await use(homePage);
  },
  productPage: async ({ page, testContext }, use) => {
    const productPage = new ProductPage(page, testContext);
    await use(productPage);
  },
  productDetailPage: async ({ page, testContext }, use) => {
    const productDetailPage = new ProductDetailPage(page, testContext);
    await use(productDetailPage);
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
export { expect };
