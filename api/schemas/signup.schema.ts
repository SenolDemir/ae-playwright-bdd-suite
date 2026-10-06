import { z } from "zod";
import { messageResponseSchema } from "./common.schema";


export const signupPayloadSchema = z.strictObject({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  title: z.string(),
  birth_date: z.string(),
  birth_month: z.string(),
  birth_year: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  company: z.string(),
  address1: z.string(),
  address2: z.string(),
  country: z.string(),
  zipcode: z.string(),
  state: z.string(),
  city: z.string(),
  mobile_number: z.string(),
});

export type SignupPayload = z.infer<typeof signupPayloadSchema>;


// signup response schemas (positive)
export const signupCreatedSchema = messageResponseSchema(201, "User created!");
export const signupUpdatedSchema = messageResponseSchema(200, "User updated!");
export const signupDeletedSchema = messageResponseSchema(200, "Account deleted!");
export const signupEmailExistsSchema = messageResponseSchema(400, "Email already exists!");

export const verifySignupByEmailSchema = z.strictObject({
  responseCode: z.literal(200),
  user: z.strictObject({
    id: z.number(),
    name: z.string(),
    email: z.email(),
    title: z.string(),
    birth_day: z.string(),
    birth_month: z.string(),
    birth_year: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address1: z.string(),
    address2: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    zipcode: z.string(),
  }),
});
