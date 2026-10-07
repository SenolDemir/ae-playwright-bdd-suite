import { test, expect } from "../../../fixtures/api.fixtures";
import { validateSchema } from "../../../api/utils/schema.validator";
import {
  signupCreatedSchema,
  verifySignupByEmailSchema,
  signupUpdatedSchema,
  signupDeletedSchema,
  signupNotFoundSchema,
} from "../../../api/schemas/signup.schema";
import { skipLiveApi, SKIP_REASON } from "../../../api/utils/api.guard";
import { SignupMapper } from "../../../api/mappers/signup.mapper";

test.describe("Signup API CRUD Test", () => {
  test.skip(skipLiveApi, SKIP_REASON);

  test("CRUD Lifecycle", async ({ signupService, signupPayloadFactory }) => {
    const payload = signupPayloadFactory();

    await test.step("Create: new user account", async () => {
      const response = await signupService.createAccount(payload);
      // response message is 201 but the API returns 200
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/html; charset=utf-8");
      const responseBody = await signupService.parseJson(response);
      validateSchema(signupCreatedSchema, responseBody);
    });

    await test.step("Read: verify user account", async () => {
      const response = await signupService.getUserDetailsByEmail(payload.email);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/html; charset=utf-8");
      const responseBody = await signupService.parseJson(response);
      const userAccount = validateSchema(verifySignupByEmailSchema, responseBody);
      expect(userAccount.user).toMatchObject(SignupMapper.toExpectedUserProfile(payload));
    });

    await test.step("Update: Verify Update user account", async () => {
      // generate update palyoad with the same email and password of the existing user
      const updatedPayload = signupPayloadFactory({
        email: payload.email,
        password: payload.password,
      });
      const response = await signupService.updateAccount(updatedPayload);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/html; charset=utf-8");
      const responseBody = await signupService.parseJson(response);
      validateSchema(signupUpdatedSchema, responseBody);

      // verify the update persisted
      const getResponse = await signupService.getUserDetailsByEmail(payload.email);
      const body = await signupService.parseJson(getResponse);
      const userAccount = validateSchema(verifySignupByEmailSchema, body);
      expect(userAccount.user).toMatchObject(SignupMapper.toExpectedUserProfile(updatedPayload));
    });

    await test.step("Delete: Verify Delete user account", async () => {
      const response = await signupService.deleteAccount(payload.email, payload.password);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("text/html; charset=utf-8");
      const responseBody = await signupService.parseJson(response);
      validateSchema(signupDeletedSchema, responseBody);

      // verify the account is gone
      const getResponse = await signupService.getUserDetailsByEmail(payload.email);
      const body = await signupService.parseJson(getResponse);
      validateSchema(signupNotFoundSchema, body);
      
    });
  });
});
