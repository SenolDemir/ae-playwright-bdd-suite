// api/base.client.ts
import type { APIRequestContext, APIResponse } from "@playwright/test";

export interface ApiBody {
  responseCode: number;
  message?: string;
}

export class WafBlockedError extends Error {}

// to capture Cloudflare issues in CI
export abstract class BaseClient {
  constructor(protected readonly request: APIRequestContext) {}

  async parseJson<T = ApiBody>(response: APIResponse): Promise<T> {
    const text = await response.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      const h = response.headers();
      const looksBlocked = /^\s*<(!doctype|html)/i.test(text) || h["cf-mitigated"] !== undefined;
      const details =
        `status=${response.status()} server=${h["server"]} ` +
        `cf-mitigated=${h["cf-mitigated"]} cf-ray=${h["cf-ray"]} ` +
        `body=${text.slice(0, 200)}`;
      throw looksBlocked
        ? new WafBlockedError(`Blocked by WAF? ${details}`)
        : new Error(`Non-JSON response: ${details}`);
    }
  }
}
