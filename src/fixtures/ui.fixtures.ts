import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { SignupPage } from "../pages/signup.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { ProductDetailPage } from "../pages/product-detail.page";
import { UserFactory } from "../data/UserFactory";
import type { TestData } from "../types/fixture.types";
import { LoginPage } from "../pages/login.page";
import { AccountSetupPage } from "../pages/account-setup.page";

export type { TestData };

type Fixtures = {
  // ...set types of your custom fixtures
  testData: TestData;
  signupPage: SignupPage;
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  productDetailPage: ProductDetailPage;
  accountSetupPage: AccountSetupPage;
};

export const test = base.extend<Fixtures>({
  // implementing custom fixtures
  testData: async ({}, use) => {
    const testData: TestData = {
      newUser: UserFactory.generateSignupUser(),
      // product: ProductFactory.createProduct(),
    };
    await use(testData);
  },
  signupPage: async ({ page, testData }, use) => {
    const signupPage = new SignupPage(page, testData);
    await use(signupPage);
  },

  accountSetupPage: async ({ page, testData }, use) => {
    const accountSetupPage = new AccountSetupPage(page, testData);
    await use(accountSetupPage);
  },

  loginPage: async ({ page, testData }, use) => {
    const loginPage = new LoginPage(page, testData);
    await use(loginPage);
  },
  homePage: async ({ page, testData }, use) => {
    const homePage = new HomePage(page, testData);
    await use(homePage);
  },
  productPage: async ({ page, testData }, use) => {
    const productPage = new ProductPage(page, testData);
    await use(productPage);
  },
  productDetailPage: async ({ page, testData }, use) => {
    const productDetailPage = new ProductDetailPage(page, testData);
    await use(productDetailPage);
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
export { expect };
