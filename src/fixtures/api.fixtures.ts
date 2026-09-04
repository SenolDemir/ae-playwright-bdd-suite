// src/fixtures/api.fixtures.ts
import { test as base, expect, request as playwrightRequest, type APIRequestContext } from "@playwright/test";
import { SignupClient } from "../clients/signup.client";
import { ProductClient } from "../clients/product.client";
import { LoginClient } from "../clients/login.client";
import { SignupDataGenerator } from "../data/signup.generator";
import type { SignupData } from "../types/signup.types";

type ApiFixtures = {
  apiContext: APIRequestContext;
  signupData: SignupData;
  signupClient: SignupClient;
  loginClient: LoginClient;
  productClient: ProductClient;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const baseURL = process.env.API_BASE_URL;
    const context = await playwrightRequest.newContext({ baseURL });
    await use(context);
    await context.dispose();
  },

  // Same generator as UI tests — one source of truth for signup data shape,
  // resolved once per test, independent of any browser/page context.
  signupData: async ({}, use) => {
    await use(SignupDataGenerator.generateSignupData());
  },

  signupClient: async ({ apiContext }, use) => {
    await use(new SignupClient(apiContext));
  },

  productClient: async ({ apiContext }, use) => {
    await use(new ProductClient(apiContext));
  },

  loginClient: async ({ apiContext }, use) => {
    await use(new LoginClient(apiContext));
  },
});

export { expect };
