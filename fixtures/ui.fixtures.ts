import { expect } from "@playwright/test";
import { test as base, createBdd } from "playwright-bdd";
import { LoginSignupPage } from "../ui/pages/login-signup.page";
import { HomePage } from "../ui/pages/home.page";
import { ProductPage } from "../ui/pages/product.page";
import { ProductDetailPage } from "../ui/pages/product-detail.page";
import { AccountSetupPage } from "../ui/pages/account-setup.page";
import { SignupDataGenerator } from "../testdata/signup.generator";
import type { SignupData } from "../types/signup.types";

type Fixtures = {
  signupData: SignupData;
  loginSignupPage: LoginSignupPage;
  homePage: HomePage;
  productPage: ProductPage;
  productDetailPage: ProductDetailPage;
  accountSetupPage: AccountSetupPage;
};

export const test = base.extend<Fixtures>({
  signupData: async ({}, use) => {
    await use(SignupDataGenerator.generateSignupData());
  },

  loginSignupPage: async ({ page }, use) => {
    await use(new LoginSignupPage(page));
  },
  accountSetupPage: async ({ page, signupData }, use) => {
    await use(new AccountSetupPage(page, signupData));
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
