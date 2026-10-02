import { test, expect } from "../../../fixtures/api.fixtures";

test.describe("Product Catalog", () => {
  test("GET: product list", async ({ productService }) => {
    const response = await productService.getProductsList();
    expect(response.status()).toBe(200);
  });
});
