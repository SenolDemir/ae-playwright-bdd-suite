import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { SignupPage } from "../pages/SignupPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { UserFactory, type SignupUser } from "../test-data/UserFactory";
import { LoginPage } from "../pages/LoginPage";

export interface TestData {
  newUser: SignupUser; // registration, login, checkout
  // product?: ProductData; // add when build cart/order tests
  // order?: OrderData;     // add when build order history tests
}

type Fixtures = {
  // ...set types of your custom fixtures
  testData: TestData;
  signupPage: SignupPage;
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  productDetailPage: ProductDetailPage;
};

export const test = base.extend<Fixtures>({
  // implementing custom fixtures
  testData: async ({}, use) => {
    const testData: TestData = {
      newUser: UserFactory.createValidSignupUser(),
      // product: ProductFactory.createProduct(),
    };
    await use(testData);
  },
  signupPage: async ({ page, testData }, use) => {
    const signupPage = new SignupPage(page, testData);
    await use(signupPage);
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
