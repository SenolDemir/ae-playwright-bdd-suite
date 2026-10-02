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

export interface SignupData {
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

export type SignupDataOverrides = Partial<SignupData>;

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