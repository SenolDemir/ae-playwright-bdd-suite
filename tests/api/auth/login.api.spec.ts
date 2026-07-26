import { test, expect } from "../../../src/fixtures/api.fixtures";
import { SignupClient } from "../../../src/api-clients/signup.client";

test.describe("Login API", () => {

test("login with valid payload", async ({ apiRequest, loginClient}) => {


    const response = await apiRequest.post("verifyLogin", {
      form: {
        email: process.env.TEST_USER_EMAIL || "",
        password: process.env.TEST_USER_PASSWORD || "",
      },
    });
      console.log(await response.json());
      expect (response.status()).toBe(200);


});

test("login with valid payload with API Object", async ({ apiRequest, loginClient}) => {

      const response = await loginClient.login();
      console.log(await response.json());
      expect(response.status()).toBe(200);
});





});
  



