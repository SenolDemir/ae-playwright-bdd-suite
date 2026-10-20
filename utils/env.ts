
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  TEST_USER_EMAIL: z.string().email(),
  TEST_USER_PASSWORD: z.string().min(1),
  MAXIMIZED_WINDOW: z.enum(["true", "false"]).default("false"),
});

export const env = envSchema.parse(process.env);
