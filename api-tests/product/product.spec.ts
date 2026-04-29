import { test, expect } from "../../fixtures/api-fixtures";


test.describe("Product Catalog", () => {

    test("GET: product list", async ({ apiRequest }) => {
      const response = await apiRequest.get("productsList");
      console.log(await response.json());
      expect(response.status()).toBe(200);
    });


});