import type { APIRequestContext, APIResponse } from "@playwright/test";
import { SignupDataGenerator } from "../data/signup.generator";
import type { SignupData } from "../types/signup.types";
import type { SignupPayload } from "../types/signup.types";


export class SignupClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  static createNewUserPayload(overrides?: Partial<SignupPayload>): SignupPayload {
    const user = SignupDataGenerator.generateSignupData();
    return SignupClient.toSignupPayload(user, overrides);
  }

  // transforms SignupData to API's expected shape (payload) 
  // by mapping its fields to the expected API keys.
  static toSignupPayload(user: SignupData, overrides?: Partial<SignupPayload>): SignupPayload {
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
