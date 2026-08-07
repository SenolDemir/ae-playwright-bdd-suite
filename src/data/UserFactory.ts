import { faker } from "@faker-js/faker";

/**
 * How the factory is structured:
 * UserFactory.generateSignupUser() → SignupUser
 * SignupClient.toSignupPayload(user) → SignupPayload (API shape)
 */

export const COUNTRIES = [
  "India",
  "United States",
  "Canada",
  "Australia",
  "Israel",
  "New Zealand",
  "Singapore",
] as const;

export const TITLES = ["Mr.", "Mrs."] as const;

export type Country = (typeof COUNTRIES)[number];
export type Title = (typeof TITLES)[number];

export interface SignupUser {
  readonly title: Title;
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly dayOfBirth?: string;
  readonly monthOfBirth?: string;
  readonly yearOfBirth?: string;
  readonly company: string;
  readonly address1: string;
  readonly address2: string;
  readonly country: Country;
  readonly state: string;
  readonly city: string;
  readonly zipcode: string;
  readonly mobileNumber: string;
}

export class UserFactory {
  static randomCountry(): Country {
    return faker.helpers.arrayElement([...COUNTRIES]);
  }

  static randomTitle(): Title {
    return faker.helpers.arrayElement([...TITLES]);
  }

  static generatePassword(): string {
    return faker.internet.password({
      length: 8,
      memorable: true,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    });
  }

  // Central method to generate a valid user with all necessary fields.
  static generateSignupUser(): SignupUser {
    const uniqueToken = `${Date.now()}-${faker.string.alphanumeric(6)}`;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      title: this.randomTitle(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: `user.${uniqueToken}@example.com`.toLowerCase(),
      password: this.generatePassword(),
      dayOfBirth: String(faker.number.int({ min: 1, max: 28 })), // max 28, safe for all months
      monthOfBirth: faker.date.month(),
      yearOfBirth: String(faker.number.int({ min: 1970, max: 2000 })), //single conversion
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: this.randomCountry(),
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number(),
    };
  }
}
