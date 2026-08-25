import type { Page, TestInfo } from "@playwright/test";

/**
 * Captures the current page URL, title, and timestamp as Playwright annotations.
 * Should be called only on test failure — these annotations are serialized into
 * the JSON report and are available to downstream consumers (AI reporter, etc.).
 *
 * Annotation types written:
 *   - `page-url`    — the URL at the moment of failure
 *   - `page-title`  — the document title at the moment of failure
 *   - `captured-at` — ISO 8601 timestamp of the capture
 */
export async function capturePageContext(page: Page, testInfo: TestInfo): Promise<void> {
  const [title] = await Promise.allSettled([page.title()]);

  testInfo.annotations.push({
    type: "page-url",
    description: page.url(),
  });

  testInfo.annotations.push({
    type: "page-title",
    description: title.status === "fulfilled" ? title.value : "(unavailable)",
  });

  testInfo.annotations.push({
    type: "captured-at",
    description: new Date().toISOString(),
  });
}
