import { faker } from "@faker-js/faker";

export interface SignupUser {
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
  readonly state: string;
  readonly city: string;
  readonly zipcode: string;
  readonly mobileNumber: string;
}

export class UserFactory {
  static generate(): SignupUser {
    return this.createValidSignupUser();
  }

  static createValidSignupUser(): SignupUser {
    const uniqueToken: string = `${Date.now()}-${faker.string.alphanumeric(6)}`;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const password = this.generatePassword();
    const dayOfBirth = String(faker.number.int({ min: 1, max: 31 })).toString();
    const monthOfBirth = faker.date.month();
    const yearOfBirth = String(
      faker.number.int({ min: 1970, max: 2000 }),
    ).toString();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress();
    const address2 = faker.location.secondaryAddress();
    const state = faker.location.state();
    const city = faker.location.city();
    const zipcode = faker.location.zipCode();
    const mobileNumber = faker.phone.number();

    return {
      firstName,
      lastName,
      fullName,
      email: `user.${uniqueToken}@example.com`.toLowerCase(),
      password,
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
      company,
      address1,
      address2,
      state,
      city,
      zipcode,
      mobileNumber,
    };
  }

  static generatePassword(): string {
    return faker.internet.password({
      length: 8,
      memorable: true,
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    });
  }
}
