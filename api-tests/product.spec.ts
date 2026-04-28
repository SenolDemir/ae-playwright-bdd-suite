// tests/api/products.spec.ts
import { test, expect } from "../fixtures/api-fixtures";

test("GET /productsList returns products", async ({ productService }) => {
  const response = await productService.getProductsList();
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
});
