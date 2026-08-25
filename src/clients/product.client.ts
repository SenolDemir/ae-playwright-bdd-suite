import type { APIRequestContext, APIResponse } from "@playwright/test";

/**
 * ProductClient encapsulates all product-related API calls and payload templates.
 */
export class ProductClient {
	private readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	/**
	 * Gets the product list
	 */
	async getProductsList(): Promise<APIResponse> {
		return this.request.get("productsList");
	}

	/**
	 * Gets product details by ID
	 */
	async getProductById(productId: string): Promise<APIResponse> {
		return this.request.get(`/products/${productId}`);
	}

	// Add more product-related API methods as needed
}
