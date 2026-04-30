import { Given, When, Then, expect } from "../../fixtures/ui-fixtures.ts";

Then("the ALL PRODUCTS page is displayed", async ({ productPage }) => {
  await productPage.expectAllProductsPageVisible();
});

Then("the products list is visible", async ({ productPage }) => {
  await productPage.expectProductsListVisible();
});

When(
  "I clicks on {string} for the first product",
  async ({ page, productPage }, arg: string) => {
    await productPage.viewFirstProduct();
    await page.waitForTimeout(5000);
  },
);

Then("I am navigated to the product detail page", async ({ page }) => {
  await expect(page.url()).toContain("/product_details/");
});

Then(
  "the product detail is visible with:",
  async ({ productDetailPage }, dataTable) => {
    const expectedDetails = dataTable.rowsHash(); // { Name: 'Blue Top', ... }
    await productDetailPage.verifyProductDetails(expectedDetails);
  },
);

Then("the product image is visible", async ({ productDetailPage }) => {
  await expect(productDetailPage.productImage).toBeVisible();
});

Then(
  "the write review section is visible and enable",
  async ({ productDetailPage }) => {
    await expect(productDetailPage.writeReviewSection).toBeVisible();
    await expect(productDetailPage.writeReviewSection).toBeEnabled();
  },
);

Then(
  "{string} button is visible and enabled",
  async ({ productDetailPage }, buttonName: string) => {
    await expect(productDetailPage.addToCartButton).toBeVisible();
    await expect(productDetailPage.addToCartButton).toBeEnabled();
  },
);

When("I navigate back to the products page", async ({ page }) => {
  await page.goBack();
});

Then("the products list is displayed", async ({ productPage }) => {
  await productPage.expectProductsListVisible();
});

When(
  "I navigate to a product detail page with an invalid product id",
  async ({ page }) => {
    await page.goto("/product_details/999");
  },
);

Then(
  "an error message or {string} page is displayed",
  async ({ productDetailPage }, arg: string) => {
    await productDetailPage.expectProductNotFoundVisible();
  },
);
