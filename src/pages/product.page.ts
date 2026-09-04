import { BasePage } from "./base.page.js";
import type { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class ProductPage extends BasePage {
  
  // Container locator
  private readonly allProductsSection: Locator = this.page.getByRole("region", { name: /All Products/i });

  // ── Element locators ────────────────────────────────
  public readonly allProductsHeading: Locator = this.page.getByRole("heading", { name: /All Products/i });
  public readonly productList: Locator = this.page.locator(".features_items");
  public readonly firstProduct: Locator = this.productList.locator(".col-sm-4").first();
  public readonly firstProductViewButton: Locator = this.firstProduct.getByRole("link", { name: /View Product/i });

  // ── Functions ─────────────────────────────────────────

  async expectAllProductsPageVisible(): Promise<void> {
    await expect(this.allProductsHeading).toBeVisible();
    await expect(this.productList).toBeVisible();
  }

  async viewFirstProduct(): Promise<void> {
    await this.firstProductViewButton.click();
    
  
  }

  async expectProductsListVisible(): Promise<void> {
    await expect(this.productList).toBeVisible();
  }
}
