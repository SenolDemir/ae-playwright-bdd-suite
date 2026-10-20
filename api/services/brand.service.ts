import type { APIResponse } from "@playwright/test";
import { BaseClient } from "../base.client";
import { API_ENDPOINTS } from "../endpoints";

/**
 * BrandService encapsulates all brand-related API calls.
 */
export class BrandService extends BaseClient {
  async getBrandsList(): Promise<APIResponse> {
    return this.request.get(API_ENDPOINTS.brand.LIST);
  }
}
