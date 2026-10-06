import { test, expect } from "../../../fixtures/api.fixtures";
import { validateSchema } from "../../../api/utils/schema.validator";
import { signupCreatedSchema, 
  signupDeletedSchema, 
  signupEmailExistsSchema, 
  signupInvalidSchema } from "../../../api/schemas/signup.schema";
import type { ApiBody } from "../../../api/base.client";
import { skipLiveApi, SKIP_REASON } from "../../../api/api.guard";

test.describe("Signup API CRUD Test", () => {
  test.skip(skipLiveApi, SKIP_REASON);

  test("CRUD Lifecycle", async ({ signupService, signupPayloadFactory }) => {
    const payload = signupPayloadFactory();
    let responseBody: ApiBody;

    await test.step("Create: new user account", async () => {
      const response = await signupService.createAccount(payload);
      // response message is 201 but the API returns 200
      expect(response.status()).toBe(200);
      responseBody = await signupService.parseJson(response);
      expect(responseBody.responseCode).toBe(201);
      validateSchema(signupCreatedSchema, responseBody);
      
    });

    await test.step("Read: verify user account", async () => {
      const response = await signupService.getUserDetailsByEmail(payload.email);
      expect(response.status()).toBe(200);
      responseBody = await signupService.parseJson(response);
      expect(responseBody.responseCode).toBe(200);
    });

    await test.step("Update: Verify Update user account", async () => {
      // generate update palyoad with the same email and password of the existing user
      const updatedPayload = signupPayloadFactory({
        email: payload.email,
        password: payload.password,
      });

      const response = await signupService.updateAccount(updatedPayload);
      expect(response.status()).toBe(200);
      responseBody = await signupService.parseJson(response);
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.message).toBe("User updated!");
    });

    await test.step("Delete: Verify Delete user account", async () => {
      const response = await signupService.deleteAccount(payload.email, payload.password);
      expect(response.status()).toBe(200);
      responseBody = await signupService.parseJson(response);
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.message).toBe("Account deleted!");
    });
  });
});
