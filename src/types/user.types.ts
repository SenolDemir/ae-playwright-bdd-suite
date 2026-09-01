
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
