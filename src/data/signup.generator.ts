import { faker } from "@faker-js/faker";
import {
  COUNTRIES,
  TITLES,
  type Country,
  type Title,
  type SignupData,
  type SignupDataOverrides,
} from "../types/signup.types";

export class SignupDataGenerator {
  static randomCountry(): Country {
    return faker.helpers.arrayElement([...COUNTRIES]);
  }

  static randomTitle(): Title {
    return faker.helpers.arrayElement([...TITLES]);
  }

  static generatePassword(): string {
    const lower = faker.string.alpha({ length: 1, casing: "lower" });
    const upper = faker.string.alpha({ length: 1, casing: "upper" });
    const digit = faker.string.numeric(1);
    const special = faker.helpers.arrayElement(["@", "$", "!", "%", "*", "?", "&"]);
    const filler = faker.string.alphanumeric(4);
    return faker.helpers.shuffle([lower, upper, digit, special, ...filler.split("")]).join("");
  }

  static generateSignupData(overrides: SignupDataOverrides = {}): SignupData {
    const uniqueToken = `${Date.now()}-${faker.string.alphanumeric(6)}`;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const base: SignupData = {
      title: this.randomTitle(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: `user.${uniqueToken}@example.com`.toLowerCase(),
      password: this.generatePassword(),
      dayOfBirth: String(faker.number.int({ min: 1, max: 28 })),
      monthOfBirth: faker.date.month(),
      yearOfBirth: String(faker.number.int({ min: 1970, max: 2000 })),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: this.randomCountry(),
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.string.numeric(10),
    };

    return { ...base, ...overrides };
  }
}
