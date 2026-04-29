import type { APIRequestContext, APIResponse } from "@playwright/test";
import {
  UserFactory,
  type SignupPayload,
  type SignupUser,
} from "../test-data/UserFactory";

/**
 * SignupService encapsulates all signup-related API calls and payload templates.
 */
export class SignupService {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  static createNewUserPayload(
    overrides?: Partial<SignupPayload>,
  ): SignupPayload {
    const user = UserFactory.generateSignupUser();
    return UserFactory.generateSignupPayload(user, overrides);
  }
  /**
   * const existingEmailPayload = SignupService
   *        .createNewUserPayload({ email: "existing@test.com" });
   */
}
