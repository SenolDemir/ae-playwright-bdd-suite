import type { APIResponse } from "@playwright/test";
import { BaseClient } from "../base.client";
import { API_ENDPOINTS } from "../endpoints";
import type { SignupPayload } from "../schemas/signup.schema";

export class SignupService extends BaseClient {
  async createAccount(payload: SignupPayload): Promise<APIResponse> {
    return this.request.post(API_ENDPOINTS.signup.CREATE, { form: payload });
  }

  async updateAccount(payload: SignupPayload): Promise<APIResponse> {
    return this.request.put(API_ENDPOINTS.signup.UPDATE, { form: payload });
  }

  async deleteAccount(email: string, password: string): Promise<APIResponse> {
    return this.request.delete(API_ENDPOINTS.signup.DELETE, {
      form: { email, password },
    });
  }

  async getUserDetailsByEmail(email: string): Promise<APIResponse> {
    return this.request.get(API_ENDPOINTS.signup.GET_BY_EMAIL, {
      params: { email },
    });
  }
}
