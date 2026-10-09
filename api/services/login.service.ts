import type { APIResponse } from "@playwright/test";
import { BaseClient } from "../base.client";
import { API_ENDPOINTS } from "../endpoints";
import type { LoginRequest } from "../models/login.model";

export class LoginService extends BaseClient {
  /**
   * Builds the login payload for POST verifyLogin.
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

    return this.request.post(API_ENDPOINTS.login.VERIFY, {
      form: payload,
    });
  }





  
}
