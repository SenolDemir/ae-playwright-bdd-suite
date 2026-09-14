import type { APIRequestContext, APIResponse } from "@playwright/test";
import { expect } from "@playwright/test";
import type { LoginRequest } from "../api-models/login.api-model";

export class LoginClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Builds the login payload for POST /api/verifyLogin.
   * Defaults to env-configured credentials but supports overrides
   * for negative/boundary scenarios (invalid email, empty password, etc.)
   */
  private buildLoginPayload(overrides?: Partial<LoginRequest>): LoginRequest {
    return {
      email: process.env.TEST_USER_EMAIL || "",
      password: process.env.TEST_USER_PASSWORD || "",
      ...overrides,
    };
  }

  async login(overrides?: Partial<LoginRequest>): Promise<APIResponse> {
    const payload = this.buildLoginPayload(overrides);

    return this.request.post("/api/verifyLogin", {
      form: payload,
    });
  }
}
