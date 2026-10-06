
export const signupResponseSchema = (responseCode: number, message: string) => ({
  type: "object",
  required: ["responseCode", "message"],
  properties: {
    responseCode: { type: "integer", const: responseCode },
    message: { type: "string", const: message },
  },
  additionalProperties: false,
});