import { test, expect } from "../../../fixtures/api.fixtures";
import { API_ENDPOINTS } from "../../../api/endpoints";

test.describe("Login API", () => {
  test("login with valid payload", async ({ apiContext, loginService }) => {
    const response = await apiContext.post(API_ENDPOINTS.login.VERIFY, {
      form: {
        email: process.env.TEST_USER_EMAIL || "",
        password: process.env.TEST_USER_PASSWORD || "",
      },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");
  });

  test("login with valid payload with API Object", async ({ loginService }) => {
    const response = await loginService.login();
    expect(response.status()).toBe(200);
  });

  test("verify login without email parameter", async ({ loginService }) => {
    const response = await loginService.login({ email: "" });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });

  test("verify login with invlaid email parameter", async ({ loginService }) => {
    const response = await loginService.login({ email: "not-an-email" });
    const body = await response.json();
    // console.log(await response.json());

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });

  test("verify login with invlaid password parameter", async ({ loginService }) => {
    const response = await loginService.login({ password: "not-a-password" });
    const body = await response.json();
    // console.log(await response.json());

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });
});
