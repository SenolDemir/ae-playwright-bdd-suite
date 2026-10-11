import { test, expect } from "../../../fixtures/api.fixtures";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { validateSchema } from "../../../api/utils/schema.validator";
import { loginSuccessSchema, loginNotFoundSchema, loginMissingEmailSchema } from "../../../api/schemas/login.schema";
import { skipLiveApi, SKIP_REASON } from "../../../api/utils/api.guard";


test.describe("Login API", () => {
  test.skip(skipLiveApi, SKIP_REASON);

  test("login with valid payload", async ({ apiContext, loginService }) => {
    const response = await apiContext.post(API_ENDPOINTS.login.VERIFY, {
      form: {
        email: process.env.TEST_USER_EMAIL || "",
        password: process.env.TEST_USER_PASSWORD || "",
      },
    });
    const body = await loginService.parseJson(response);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/html");
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");
    validateSchema(loginSuccessSchema, body);
  });

  test("login with valid payload with API Object", async ({ loginService }) => {
    const response = await loginService.login();
    const body = await loginService.parseJson(response);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/html");
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");
    validateSchema(loginSuccessSchema, body);
  });

  test("verify login without email parameter", async ({ loginService }) => {
    const response = await loginService.loginWithoutEmail();
    const body = await loginService.parseJson(response);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/html");
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, email or password parameter is missing in POST request.");
    validateSchema(loginMissingEmailSchema, body);
  });

  test("verify login with invalid email parameter", async ({ loginService }) => {
    const response = await loginService.login({ email: "not-an-email" });
    const body = await loginService.parseJson(response);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/html");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
    validateSchema(loginNotFoundSchema, body);
  });

  test("verify login with invalid password parameter", async ({ loginService }) => {
    const response = await loginService.login({ password: "not-a-password" });
    const body = await loginService.parseJson(response);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/html");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
    validateSchema(loginNotFoundSchema, body);
  });
});
