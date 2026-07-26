import {
  test as base,
  expect,
  request as playwrightRequest,
  type APIRequestContext,
} from "@playwright/test";
import { UserFactory, type SignupUser } from "../test-data/UserFactory";
import { SignupClient } from "../api-clients/signup.client";
import { ProductClient } from "../api-clients/product.client";
import { LoginClient } from "../api-clients/login.client";


type ApiFixtures = {
  apiRequest: APIRequestContext;
  signupClient: SignupClient;
  loginClient: LoginClient;
  productClient: ProductClient;
};

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({}, use) => {
    const baseURL = process.env.API_BASE_URL;
    const context = await playwrightRequest.newContext({ baseURL });
    await use(context);
    await context.dispose();
  },

  signupClient: async ({ apiRequest }, use) => {
    await use(new SignupClient(apiRequest));
  },

  productClient: async ({ apiRequest }, use) => {
    await use(new ProductClient(apiRequest));
  },
  loginClient: async ({ apiRequest }, use) => {
    await use(new LoginClient(apiRequest));
  },
});

export { expect };
