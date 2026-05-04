import { test, expect } from "../../fixtures/api.fixtures";
import { SignupClient } from "../../api-clients/signup.client";
import { UserFactory } from "../../test-data/UserFactory";

test.describe("Signup API", () => {
  test("signup with valid payload", async ({ apiRequest, signupClient }) => {
    const payload = SignupClient.createNewUserPayload();
    const response = await apiRequest.post("createAccount", { form: payload });
    console.log(await response.json());
    // response message is 201 but the API returns 200
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(201);
  });
});
