import type { APIRequestContext, APIResponse } from "@playwright/test";
import { UserFactory, type SignupUser } from "../data/UserFactory";
import type { SignupPayload } from "./api.models";

/**
 * SignupClient encapsulates all signup-related API calls and payload templates.
 */
export class SignupClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  static createNewUserPayload(overrides?: Partial<SignupPayload>): SignupPayload {
    const user = UserFactory.generateSignupUser();
    return SignupClient.toSignupPayload(user, overrides);
  }

  // transforms SignupUser to API's expected shape (payload)
  static toSignupPayload(user: SignupUser, overrides?: Partial<SignupPayload>): SignupPayload {
    return {
      name: user.fullName,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.dayOfBirth ?? "",
      birth_month: user.monthOfBirth ?? "",
      birth_year: user.yearOfBirth ?? "",
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
      ...overrides,
    };
  }
  /**
   * const existingEmailPayload = SignupClient
   *        .toSignupPayload(user, { email: "existing@test.com" });
   */


  async getUserDetailsByEmail(email: string): Promise<APIResponse> {
    return this.request.get("getUserDetailByEmail", {
      params: { email },
    });
  }


  
}
