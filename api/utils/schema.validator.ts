import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

export function validateSchema(schema: object, data: unknown): void {
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    throw new Error(`Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`);
  }
}
