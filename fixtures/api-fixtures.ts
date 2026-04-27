import { test as base, expect } from "@playwright/test";
import { UserFactory, type SignupUser } from "../test-data/UserFactory";

export interface ApiTestContext {
  newUser: SignupUser;
}

type ApiFixtures = {
  testContext: ApiTestContext;
};

export const test = base.extend<ApiFixtures>({
  testContext: async ({}, use) => {
    await use({ newUser: UserFactory.createValidSignupUser() });
  },
  // 'request' is built-in — pre-configured from playwright.config.ts
  // no custom apiContext needed
});

export { expect };
