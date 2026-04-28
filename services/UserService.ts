import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { SignupUser } from "../test-data/UserFactory";

/**
 * UserService encapsulates all user-related API calls and payload templates.
 */
export class UserService {
	private readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	/**
	 * Registers a new user via API
	 */
	async registerUser(user: SignupUser): Promise<APIResponse> {
		return this.request.post("/register", {
			data: user,
		});
	}

	/**
	 * Logs in a user via API
	 */
	async loginUser(email: string, password: string): Promise<APIResponse> {
		return this.request.post("/login", {
			data: { email, password },
		});
	}

	// Add more user-related API methods as needed
}
