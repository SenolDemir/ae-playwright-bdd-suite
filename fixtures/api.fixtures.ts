import { test as base, expect, request as playwrightRequest, type APIRequestContext } from "@playwright/test";
import { SignupService } from "../api/services/signup.service";
import { ProductService } from "../api/services/product.service";
import { LoginService } from "../api/services/login.service";
import { SignupMapper } from "../api/mappers/signup.mapper";
import type { SignupPayload } from "../api/schemas/signup.schema";
import { SignupDataGenerator } from "../testdata/signup.generator";
import type { SignupData } from "../types/signup.types";

type ApiFixtures = {
  apiContext: APIRequestContext;
  signupData: SignupData;
  signupPayloadFactory: (overrides?: Partial<SignupPayload>) => SignupPayload;
  signupService: SignupService;
  loginService: LoginService;
  productService: ProductService;
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

  // Composes generator + mapper so services/tests never need direct generator access.
  signupPayloadFactory: async ({}, use) => {
    await use((overrides?: Partial<SignupPayload>) => {
      const data = SignupDataGenerator.generateSignupData();
      return SignupMapper.toSignupPayload(data, overrides);
    });
  },

  signupService: async ({ apiContext }, use) => {
    await use(new SignupService(apiContext));
  },

  productService: async ({ apiContext }, use) => {
    await use(new ProductService(apiContext));
  },

  loginService: async ({ apiContext }, use) => {
    await use(new LoginService(apiContext));
  },
});

export { expect };
