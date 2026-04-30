import { faker } from "@faker-js/faker";

/**
 * How the factory is structured:
 * SignupUser (central data for new user)
     │
     └── generateSignupPayload(user) 
              │
              └──  SignupPayload → (assigns fields forAPI shape) 
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

export interface SignupPayload {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
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
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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

  // transforms SignupUser to API's expected shape (payload)
  static toSignupPayload(
    user: SignupUser,
    overrides?: Partial<SignupPayload>,
  ): SignupPayload {
    return {
      name: user.fullName, // reads from SignupUser
      email: user.email, // reads from SignupUser
      password: user.password, // ... same for all fields
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
      /** ...overrides:
       * for negative test scenarios, the overrides argument handles it 
       * without any new factory methods:
       * Duplicate email test, different title or country
          const payload = UserFactory.toSignupPayload(user, { email: "existing@test.com" });
          const payload = UserFactory.toSignupPayload(user, { title: "Mrs", country: "Canada" });
       */
    };
  }
}
