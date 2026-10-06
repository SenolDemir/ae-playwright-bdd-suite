import type { SignupData } from "../../types/signup.types";
import { signupPayloadSchema, type SignupPayload } from "../schemas/signup.schema";

export class SignupMapper {
  // transforms SignupData to the API's expected shape (payload) by mapping its fields to the expected API keys.
  static toSignupPayload(user: SignupData, overrides?: Partial<SignupPayload>): SignupPayload {
    return signupPayloadSchema.parse({
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
    });
  }
}
