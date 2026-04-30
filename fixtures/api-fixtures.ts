import {
  test as base,
  expect,
  request as playwrightRequest,
  type APIRequestContext,
} from "@playwright/test";
import { UserFactory, type SignupUser } from "../test-data/UserFactory";
import { SignupService } from "../services/signup.service";
import { ProductService } from "../services/product.service";

type ApiFixtures = {
  apiRequest: APIRequestContext;
  signupService: SignupService;
  productService: ProductService;
};

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({}, use) => {
    const baseURL = process.env.API_BASE_URL;
    const context = await playwrightRequest.newContext({ baseURL });
    await use(context);
    await context.dispose();
  },

  signupService: async ({ apiRequest }, use) => {
    await use(new SignupService(apiRequest));
  },

  productService: async ({ apiRequest }, use) => {
    await use(new ProductService(apiRequest));
  },
});

export { expect };
