import { z } from "zod";

export function validateSchema<T extends z.ZodType>(
  schema: T,
  data: unknown,
  label = "Response",
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(`${label} schema validation failed:\n${z.prettifyError(result.error)}`);
  }

  return result.data;
}


