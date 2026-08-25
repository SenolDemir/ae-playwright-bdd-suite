import type { SignupUser } from "./user.types";

export interface TestData {
  newUser: SignupUser; // registration, login, checkout
  // product?: ProductData; // add when build cart/order tests
  // order?: OrderData;     // add when build order history tests
}
