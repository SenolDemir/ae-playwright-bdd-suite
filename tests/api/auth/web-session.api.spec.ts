import { test, expect } from "../../../fixtures/api.fixtures";
import type { APIRequestContext } from "@playwright/test";

/// Showcase only: intentionally outside the service layer. 
// These tests document how the web login/logout behaves over plain HTTP.
// The shared storageState is built with a browser login.
// (skipped on CI by api.guard.ts if blocked)
test.use({ baseURL: process.env.BASE_URL });

const email = process.env.TEST_USER_EMAIL!;
const password = process.env.TEST_USER_PASSWORD!;

async function webLogin(request: APIRequestContext) {
  const page = await request.get("login");
  if (page.status() === 403 || page.status() === 503 || page.headers()["cf-mitigated"]) {
    throw new Error(`Blocked by Cloudflare (HTTP ${page.status()})`);
  }
  const csrf = /name=["']csrfmiddlewaretoken["']\s+value=["']([^"']+)["']/.exec(await page.text())?.[1];
  if (!csrf) throw new Error("csrfmiddlewaretoken not found on /login");

  return request.post("login", {
    form: { email, password, csrfmiddlewaretoken: csrf },
    headers: { Referer: new URL("login", process.env.BASE_URL!).toString() },
    maxRedirects: 0,
  });
}

const isLoggedIn = async (ctx: APIRequestContext) =>
  (await (await ctx.get("/")).text()).includes("Logged in as");

test.describe("Web session behavior @web-http", () => {
      
  test("login redirects and sets sessionid", async ({ request }) => {
    const res = await webLogin(request);
    expect(res.status()).toBe(302);
    expect(res.headers()["location"]).toBe("/");
    const { cookies } = await request.storageState();
    expect(cookies.find((c) => c.name === "sessionid")).toBeDefined();
  });

  test("logout ends the session on the server", async ({ request, playwright }) => {
    await webLogin(request);
    const sessionId = (await request.storageState()).cookies.find((c) => c.name === "sessionid")!.value;
    expect(await isLoggedIn(request)).toBe(true);

    const res = await request.get("logout", { maxRedirects: 0 });
    expect(res.status()).toBe(302);
    expect(res.headers()["location"]).toBe("/login");
    expect(await isLoggedIn(request)).toBe(false);

    const replay = await playwright.request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: { Cookie: `sessionid=${sessionId}` },
    });
    expect(await isLoggedIn(replay)).toBe(false);
    await replay.dispose();
  });
});
