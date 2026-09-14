import { test, expect } from "../../../src/fixtures/api.fixtures";

test.describe("Product Catalog", () => {
  
  test("GET: product list", async ({ productClient }) => {
    const response = await productClient.getProductsList();
    expect(response.status()).toBe(200);
  });
});
