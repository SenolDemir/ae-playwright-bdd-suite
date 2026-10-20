// src/schemas/common.schema.ts
import { z } from "zod";

export const apiEnvelopeSchema = z.object({
  responseCode: z.number(),
  message: z.string(),
});

/** Strict response with an exact code and message */
export const messageResponseSchema = (responseCode: number, message: string) =>
  z.strictObject({
    responseCode: z.literal(responseCode),
    message: z.literal(message),
  });
