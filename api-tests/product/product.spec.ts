import { test, expect } from "../../fixtures/api.fixtures";

test.describe("Product Catalog", () => {
  test("GET: product list", async ({ productClient }) => {
    const response = await productClient.getProductsList();
    console.log(await response.json());
    expect(response.status()).toBe(200);
  });
});
