import { test, expect } from "../../fixtures/api-fixtures";
import { SignupService } from "../../services/signup.service";
import { UserFactory } from "../../test-data/UserFactory";

test.describe("Signup API", () => {
  test("signup with valid payload", async ({ apiRequest, signupService }) => {
    const payload = SignupService.createNewUserPayload();
    const response = await apiRequest.post("createAccount", { form: payload });
    console.log(await response.json());
    // response message is 201 but the API returns 200
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(201);
  });
});
