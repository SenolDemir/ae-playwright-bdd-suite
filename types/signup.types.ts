// ── Closed sets: single source of truth for generator, page objects and Zod schemas ──
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

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type Country = (typeof COUNTRIES)[number];
export type Title = (typeof TITLES)[number];
export type Month = (typeof MONTHS)[number];

// ── Domain types ──
export interface DateOfBirth {
  readonly day: string; // dropdown label, "1".."31"
  readonly month: Month;
  readonly year: string;
}

export interface SignupData {
  readonly title: Title;
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string; // derived by the generator by default; an explicit override wins
  readonly email: string;
  readonly password: string;
  readonly dateOfBirth: DateOfBirth;
  readonly company: string;
  readonly address1: string;
  readonly address2: string;
  readonly country: Country;
  readonly state: string;
  readonly city: string;
  readonly zipcode: string;
  readonly mobileNumber: string;
}

// Negative tests may override any field, including fullName
export type SignupDataOverrides = Partial<SignupData>;

// ── Narrow slices: what each page method actually needs ──
export type Credentials = Pick<SignupData, "email" | "password">;

export type AccountInformation = Pick<SignupData, "title" | "password" | "dateOfBirth">;

export type AddressInformation = Pick<
  SignupData,
  | "firstName"
  | "lastName"
  | "company"
  | "address1"
  | "address2"
  | "country"
  | "state"
  | "city"
  | "zipcode"
  | "mobileNumber"
>;
