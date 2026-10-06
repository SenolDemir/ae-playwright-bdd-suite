// src/schemas/signup.schema.ts
import { messageResponseSchema } from "./common.schema";


// signup response schemas
export const signupCreatedSchema = messageResponseSchema(201, "User created!");
export const signupDeletedSchema = messageResponseSchema(200, "Account deleted!");
export const signupEmailExistsSchema = messageResponseSchema(400, "Email already exists!");
export const signupInvalidSchema = messageResponseSchema(400, "Invalid signup data!");