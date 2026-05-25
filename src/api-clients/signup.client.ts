import type { APIRequestContext, APIResponse } from "@playwright/test";
import {
  UserFactory,
  type SignupPayload,
  type SignupUser,
} from "../test-data/UserFactory";

/**
 * SignupClient encapsulates all signup-related API calls and payload templates.
 */
export class SignupClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  static createNewUserPayload(
    overrides?: Partial<SignupPayload>,
  ): SignupPayload {
    const user = UserFactory.generateSignupUser();
    return UserFactory.toSignupPayload(user, overrides);
  }
  /**
   * const existingEmailPayload = SignupClient
   *        .toSignupPayload({ email: "existing@test.com" });
   */
}
