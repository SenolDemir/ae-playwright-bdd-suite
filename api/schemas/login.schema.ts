import { z } from "zod";
import { messageResponseSchema } from "./common.schema";

// login request payload schema (email is a plain string so negative tests can send invalid values)
export const loginRequestSchema = z.strictObject({
  email: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

// login response schemas
export const loginSuccessSchema = messageResponseSchema(200, "User exists!");
export const loginNotFoundSchema = messageResponseSchema(404, "User not found!");
export const loginMissingEmailSchema = messageResponseSchema(
  400,
  "Bad request, email or password parameter is missing in POST request.",
);

