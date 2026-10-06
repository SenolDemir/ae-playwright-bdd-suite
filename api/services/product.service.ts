import type { APIResponse } from "@playwright/test";
import { BaseClient } from "../base.client";
import { API_ENDPOINTS } from "../endpoints";

/**
 * ProductService encapsulates all product-related API calls.
 */
export class ProductService extends BaseClient {
  async getProductsList(): Promise<APIResponse> {
    return this.request.get(API_ENDPOINTS.product.LIST);
  }

  async getProductById(productId: string): Promise<APIResponse> {
    return this.request.get(API_ENDPOINTS.product.byId(productId));
  }

  async searchProduct(searchProduct?: string): Promise<APIResponse> {
    return this.request.post(API_ENDPOINTS.product.SEARCH, {
      form: searchProduct === undefined ? {} : { search_product: searchProduct },
    });
  }
}
