import { test, expect } from "../../../src/fixtures/api.fixtures";
import { SignupClient } from "../../../src/clients/signup.client";

test.describe("Login API", () => {
  test("login with valid payload", async ({ apiContext, loginClient }) => {
    const response = await apiContext.post("verifyLogin", {
      form: {
        email: process.env.TEST_USER_EMAIL || "",
        password: process.env.TEST_USER_PASSWORD || "",
      },
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
  });

  test("login with valid payload with API Object", async ({ apiContext, loginClient }) => {
    const response = await loginClient.login();
    console.log(await response.json());
    expect(response.status()).toBe(200);
  });

  test("verify login without email parameter", async ({ apiContext, loginClient }) => {
    const response = await loginClient.login({ email: "" });
    const body = await response.json();
    console.log(await response.json());

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });

  test("verify login with invlaid email parameter", async ({ apiContext, loginClient }) => {
    const response = await loginClient.login({ email: "not-an-email" });
    const body = await response.json();
    console.log(await response.json());

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });


  test("verify login with invlaid password parameter", async ({ apiContext, loginClient }) => {
    const response = await loginClient.login({ password: "not-a-password" });
    const body = await response.json();
    console.log(await response.json());

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });





});
