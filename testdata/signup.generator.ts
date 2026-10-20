import { faker } from "@faker-js/faker";
import {
  COUNTRIES,
  MONTHS,
  TITLES,
  type Country,
  type DateOfBirth,
  type SignupData,
  type SignupDataOverrides,
  type Title,
} from "../types/signup.types";

export class SignupDataGenerator {
  static title(): Title {
    return faker.helpers.arrayElement([...TITLES]);
  }

  static country(): Country {
    return faker.helpers.arrayElement([...COUNTRIES]);
  }

  static firstName(): string {
    return faker.person.firstName();
  }

  static lastName(): string {
    return faker.person.lastName();
  }

  static email(): string {
    return `user.${faker.string.alphanumeric(12)}@example.com`.toLowerCase();
  }

  static password(): string {
    const filler = faker.string.alphanumeric(4).split("");
    return faker.helpers
      .shuffle([
        faker.string.alpha({ length: 1, casing: "lower" }),
        faker.string.alpha({ length: 1, casing: "upper" }),
        faker.string.numeric(1),
        faker.helpers.arrayElement(["@", "$", "!", "%", "*", "?", "&"]),
        ...filler,
      ])
      .join("");
  }

  static dateOfBirth(): DateOfBirth {
    return {
      day: String(faker.number.int({ min: 1, max: 28 })),
      month: faker.helpers.arrayElement([...MONTHS]),
      year: String(faker.number.int({ min: 1970, max: 2000 })),
    };
  }

  static company(): string {
    return faker.company.name();
  }

  static address1(): string {
    return faker.location.streetAddress();
  }

  static address2(): string {
    return faker.location.secondaryAddress();
  }

  static state(): string {
    return faker.location.state();
  }

  static city(): string {
    return faker.location.city();
  }

  static zipcode(): string {
    return faker.location.zipCode();
  }

  static mobileNumber(): string {
    return faker.string.numeric(10);
  }

 
  static generateSignupData(overrides: SignupDataOverrides = {}): SignupData {
   
    const firstName = overrides.firstName ?? this.firstName();
    const lastName = overrides.lastName ?? this.lastName();

    return {
      title: this.title(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: this.email(),
      password: this.password(),
      dateOfBirth: this.dateOfBirth(),
      company: this.company(),
      address1: this.address1(),
      address2: this.address2(),
      country: this.country(),
      state: this.state(),
      city: this.city(),
      zipcode: this.zipcode(),
      mobileNumber: this.mobileNumber(),
      ...overrides, // to be able to override any explicit value in tests
    };
  }

  /**
   * Resolves a placeholder token used in feature files (e.g. "[too_long]") to a generated value.
   * Returns undefined when the input is not a known token, so callers can use it as a literal.
   */
  static resolveToken(token: string): string | undefined {
    const values: Record<string, () => string> = {
      "[too_long]": () => faker.string.alpha({ length: 100 }),
      "[xss_email]": () => "<script>alert('xss')</script>@test.com",
      "[html_injection_email]": () => '"><img src=x onerror=alert(1)>@test.com',
      valid_email: () => this.email(),
    };
    return values[token]?.();
  }

  // to create intentionally invalid SignupData objects for negative testing
  static withInvalid<K extends keyof SignupData>(field: K, value: unknown): SignupData {
    return { ...this.generateSignupData(), [field]: value } as SignupData;
  }
}
