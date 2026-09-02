// src/fixtures/ui.fixtures.ts
import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { SignupPage } from "../pages/signup.page.js";
import { HomePage } from "../pages/home.page.js";
import { ProductPage } from "../pages/product.page.js";
import { ProductDetailPage } from "../pages/product-detail.page.js";
import { LoginPage } from "../pages/login.page.js";
import { AccountSetupPage } from "../pages/account-setup.page.js";
import { SignupDataGenerator } from "../data/signup.generator.js";
import type { SignupData } from "../types/signup.types.js";

type Fixtures = {
  signupData: SignupData;
  signupPage: SignupPage;
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  productDetailPage: ProductDetailPage;
  accountSetupPage: AccountSetupPage;
};

export const test = base.extend<Fixtures>({

  signupData: async ({}, use) => {
    await use(SignupDataGenerator.generateSignupData());
  },

  signupPage: async ({ page, signupData }, use) => {
    await use(new SignupPage(page, signupData));
  },
  accountSetupPage: async ({ page, signupData }, use) => {
    await use(new AccountSetupPage(page, signupData));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
export { expect };
