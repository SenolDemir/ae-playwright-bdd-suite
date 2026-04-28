import { test as base, expect } from "@playwright/test";
import { UserFactory, type SignupUser } from "../test-data/UserFactory";
import { UserService } from "../services/UserService";
import { ProductService } from "../services/ProductService";

export interface ApiTestData {
  newUser: SignupUser;
}

type ApiFixtures = {
  testData: ApiTestData;
  userService: UserService;
  productService: ProductService;
};

export const test = base.extend<ApiFixtures>({
  testData: async ({}, use) => {
    await use({ newUser: UserFactory.createValidSignupUser() });
  },

  userService: async ({ request }, use) => {
    await use(new UserService(request));
  },

  productService: async ({ request }, use) => {
    await use(new ProductService(request));
  },
});

export { expect };
