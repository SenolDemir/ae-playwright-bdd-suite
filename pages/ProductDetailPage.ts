import { BasePage } from "./BasePage.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class ProductDetailPage extends BasePage {
  // ── Container locators ──────────────────────────────
  private readonly productDetailSection: Locator = this.page.locator(
    ".product-information",
  );

  // ── Element locators ────────────────────────────────
  public readonly productName: Locator =
    this.productDetailSection.getByRole("heading");
  public readonly productCategory: Locator =
    this.productDetailSection.getByText(/Category/i);
  public readonly productPrice: Locator =
    this.productDetailSection.getByText(/Rs\./i);
  public readonly productAvailability: Locator =
    this.productDetailSection.locator("p", { hasText: "Availability:" });
  public readonly productCondition: Locator = this.productDetailSection.locator(
    "p",
    { hasText: "Condition:" },
  );
  public readonly productBrand: Locator = this.productDetailSection.locator(
    "p",
    { hasText: "Brand:" },
  );
  public readonly productImage: Locator =
    this.page.locator(".view-product img");

  public readonly addToCartButton: Locator = this.page.getByRole("button", {
    name: /Add to cart/i,
  });
  public readonly notFoundHeading: Locator = this.page.getByRole("heading", {
    name: /Page not found/i,
  });
  public readonly urlInfo: Locator = this.page.getByText(
    /product_details\/invalid-id/i,
  );

  // ── Review form locators ─────────────────────────────

  public readonly writeReviewSection: Locator =
    this.page.locator("#review-form");

  public readonly reviewNameInput: Locator =
    this.writeReviewSection.getByPlaceholder("Your Name");

  public readonly reviewEmailInput: Locator =
    this.writeReviewSection.getByPlaceholder("Email Address");

  public readonly reviewTextarea: Locator =
    this.writeReviewSection.getByPlaceholder("Add Review Here!");

  public readonly reviewSubmitButton: Locator =
    this.writeReviewSection.locator("#button-review");

  public readonly reviewSuccessAlert: Locator = this.writeReviewSection.locator(
    ".alert-success.alert span",
  );

  // ── Methods ─────────────────────────────────────────

  async expectProductDetailVisible(): Promise<void> {
    await expect(this.productDetailSection).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.writeReviewSection).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async expectProductNotFoundVisible(): Promise<void> {
    await expect(this.notFoundHeading).toBeVisible();
    await expect(this.urlInfo).toBeVisible();
  }

  public async verifyProductDetails(
    expected: Record<string, string>,
  ): Promise<void> {
    for (const [field, value] of Object.entries(expected)) {
      const actual = await this.getProductDetailFieldValue(field);
      expect(actual).toBe(value);
    }
  }

  // Helper method to map field names to locators
  private async getProductDetailFieldValue(field: string): Promise<string> {
    const categoryContext = await this.productCategory.textContent();
    const categoryName = categoryContext!.replace("Category: ", "").trim();
    const availabilityFull = await this.productAvailability.textContent();
    const availabilityValue =
      availabilityFull?.replace(/^Availability:\s*/, "").trim() ?? "";

    switch (field) {
      case "Name":
        return (await this.productName.textContent()) ?? "";
      case "Category":
        return categoryName;
      case "Price":
        return (await this.productPrice.textContent()) ?? "";
      case "Availability":
        return availabilityValue;
      case "Condition": {
        const conditionFull = await this.productCondition.textContent();
        return conditionFull?.replace(/^Condition:\s*/, "").trim() ?? "";
      }
      case "Brand": {
        const brandFull = await this.productBrand.textContent();
        return brandFull?.replace(/^Brand:\s*/, "").trim() ?? "";
      }
      // ...repeat for other fields
      default:
        throw new Error(`Unknown field: ${field}`);
    }
  }
}
