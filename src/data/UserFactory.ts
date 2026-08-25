import { faker } from "@faker-js/faker";
import { COUNTRIES, TITLES, type Country, type Title, type SignupUser } from "../types/user.types";

export { type SignupUser };

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
