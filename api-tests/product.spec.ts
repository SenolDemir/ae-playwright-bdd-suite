// tests/api/products.spec.ts
import { test, expect } from "../fixtures/api-fixtures.ts";

test("GET /productsList returns products", async ({ request, testContext }) => {
  const response = await request.get("/productsList");

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.products).toBeInstanceOf(Array);
});
