import { test, expect } from "../../../fixtures/api.fixtures";
import { skipLiveApi, SKIP_REASON } from "../../../api/utils/api.guard";

test.describe("Product Catalog", () => {
  test.skip(skipLiveApi, SKIP_REASON);

  test("GET: product list", async ({ productService }) => {
    const response = await productService.getProductsList();
    expect(response.status()).toBe(200);
  });
});
