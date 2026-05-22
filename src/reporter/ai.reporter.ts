/**
 * AI Reporter Script
 * Reads Playwright JSON results, sends failures to Gemini API,
 * and generates a human-readable AI analysis report.
 *
 * Usage: npx ts-node scripts/ai-reporter.ts
 * or as part of: npm run test:report
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { generateHtmlReport } from "./html.report.generator.ts";
import type {
  AiAnalysis,
  FailureSummary,
  PlaywrightResults,
} from "./reporter.types.ts";

// ─── Config ──────────────────────────────────────────────────────────────────

const RESULTS_PATH = path.resolve("reports/playwright-results.json");
const REPORTS_DIR = path.resolve("reports/ai-report");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

// ─── Entry Point ─────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🤖 AI Reporter — starting analysis...\n");

  if (!fs.existsSync(RESULTS_PATH)) {
    console.error(`playwright-results.json not found at: ${RESULTS_PATH}`);
    console.error(
      "   Make sure you run: npx playwright test --reporter=json,html",
    );
    process.exit(1);
  }

  const raw = fs.readFileSync(RESULTS_PATH, "utf-8");
  const results: PlaywrightResults = JSON.parse(raw);

  const failures = extractFailures(results);

  if (failures.length === 0) {
    console.log("✅ No failures found — skipping AI analysis.");
    return;
  }

  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in your .env file.");
    process.exit(1);
  }

  console.log(
    `📋 Found ${failures.length} failure(s). Sending to Gemini for analysis...\n`,
  );

  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  const analysis = await analyzeWithGemini(failures, results.stats);

  // Write JSON (machine-readable)
  const jsonPath = path.join(REPORTS_DIR, "ai-analysis.json");
  fs.writeFileSync(jsonPath, JSON.stringify(analysis, null, 2));

  // Write HTML (human-readable)
  const htmlPath = path.join(REPORTS_DIR, "index.html");
  const html = generateHtmlReport(analysis, results.stats);
  fs.writeFileSync(htmlPath, html);

  console.log(`\n✅ AI analysis complete!`);
  console.log(`   📄 HTML report: ${htmlPath}`);
  console.log(`   📦 JSON output: ${jsonPath}`);
  console.log(`\n   Open with: open ${htmlPath}\n`);
}

// ─── Extract Failures from Playwright JSON ───────────────────────────────────

function extractFailures(results: PlaywrightResults): FailureSummary[] {
  const failures: FailureSummary[] = [];

  for (const suite of results.suites ?? []) {
    collectFailures(suite, failures, []);
  }

  return failures;
}

function collectFailures(
  suite: any,
  acc: FailureSummary[],
  parentTitles: string[],
) {
  const titles = suite.title ? [...parentTitles, suite.title] : parentTitles;

  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const annotations: Array<{ type: string; description?: string }> =
        test.annotations ?? [];
      const pageUrl = annotations.find(
        (a) => a.type === "page-url",
      )?.description;
      const pageTitle = annotations.find(
        (a) => a.type === "page-title",
      )?.description;
      const capturedAt = annotations.find(
        (a) => a.type === "captured-at",
      )?.description;

      for (const result of test.results ?? []) {
        if (result.status === "failed" || result.status === "timedOut") {
          const error = result.errors?.[0];

          const errorContextAttachment = (result.attachments ?? []).find(
            (a: { name: string; path?: string }) => a.name === "error-context",
          );
          const pageSnapshot = errorContextAttachment?.path
            ? extractPageSnapshot(errorContextAttachment.path)
            : undefined;

          acc.push({
            title: spec.title,
            fullPath: [...titles, spec.title].filter(Boolean).join(" › "),
            file: suite.file ?? "",
            status: result.status,
            errorMessage:
              error?.message?.replace(/\x1B\[[0-9;]*m/g, "").trim() ??
              "Unknown error",
            failedStep: extractFailedStep(error?.message ?? ""),
            retries: (test.results?.length ?? 1) - 1,
            duration: result.duration,
            isFlaky:
              test.results?.some((r: any) => r.status === "passed") ?? false,
            pageUrl,
            pageTitle,
            capturedAt,
            pageSnapshot,
          });
        }
      }
    }
  }

  for (const child of suite.suites ?? []) {
    collectFailures(child, acc, titles);
  }
}

function extractFailedStep(errorMessage: string): string {
  // BDD: extract the Gherkin step from playwright-bdd error messages
  const stepMatch = errorMessage.match(/(?:Given|When|Then|And|But)\s.+/);
  if (stepMatch) return stepMatch[0].split("\n")[0].trim();

  // Fallback: first meaningful line
  const lines = errorMessage.split("\n").filter((l) => l.trim());
  return lines[0]?.trim() ?? "";
}

// ─── Page Snapshot Extraction ─────────────────────────────────────────────────

const SNAPSHOT_MAX_LINES = 150;

/**
 * Reads an error-context.md file produced by Playwright and returns the content
 * of the `# Page snapshot` fenced code block. Returns undefined if the file does
 * not exist or does not contain a snapshot section.
 */
function extractPageSnapshot(filePath: string): string | undefined {
  if (!fs.existsSync(filePath)) return undefined;

  const content = fs.readFileSync(filePath, "utf-8");

  // Locate the fenced block under the "# Page snapshot" heading
  const snapshotStart = content.indexOf("# Page snapshot");
  if (snapshotStart === -1) return undefined;

  const fenceOpen = content.indexOf("```", snapshotStart);
  if (fenceOpen === -1) return undefined;

  const blockStart = content.indexOf("\n", fenceOpen) + 1;
  const fenceClose = content.indexOf("```", fenceOpen + 3);
  if (fenceClose === -1) return undefined;

  const raw = content.slice(blockStart, fenceClose).trimEnd();

  // Trim to token budget
  const lines = raw.split("\n");
  if (lines.length <= SNAPSHOT_MAX_LINES) return raw;

  return [
    ...lines.slice(0, SNAPSHOT_MAX_LINES),
    `... (${lines.length - SNAPSHOT_MAX_LINES} lines truncated)`,
  ].join("\n");
}

// ─── Gemini API Call ──────────────────────────────────────────────────────────

async function analyzeWithGemini(
  failures: FailureSummary[],
  stats: any,
): Promise<AiAnalysis> {
  const prompt = buildPrompt(failures, stats);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  // Strip markdown fences if present
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean);
    return parsed as AiAnalysis;
  } catch {
    console.error(
      "⚠️  Failed to parse Gemini response as JSON. Raw response saved.",
    );
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    fs.writeFileSync(path.join(REPORTS_DIR, "raw-response.txt"), text);
    throw new Error(
      "Gemini returned non-JSON response. See reports/ai-report/raw-response.txt",
    );
  }
}

// ─── Prompt Builder ───────────────────────────────────────────────────────────

function buildPrompt(failures: FailureSummary[], stats: any): string {
  const failureList = failures
    .map(
      (f, i) => `
Failure #${i + 1}
  Title: ${f.title}
  Full path: ${f.fullPath}
  File: ${f.file}
  Status: ${f.status}
  Failed step: ${f.failedStep}
  Error: ${f.errorMessage.slice(0, 500)}
  Retries: ${f.retries}
  Flaky: ${f.isFlaky}
  Duration: ${f.duration}ms${f.pageUrl ? `\n  Page URL: ${f.pageUrl}` : ""}${f.pageTitle ? `\n  Page title: ${f.pageTitle}` : ""}${f.capturedAt ? `\n  Captured at: ${f.capturedAt}` : ""}${
    f.pageSnapshot
      ? `\n  Page snapshot (ARIA accessibility tree at moment of failure):\n${f.pageSnapshot
          .split("\n")
          .map((l) => `    ${l}`)
          .join("\n")}`
      : ""
  }`,
    )
    .join("\n");

  return `You are an expert test automation engineer analyzing Playwright test failures for an e-commerce test suite targeting automationexercise.com.

The suite uses:
- Playwright + TypeScript + BDD (playwright-bdd with Gherkin feature files)
- Page Object Model with Component Objects
- Semantic/role-based locators (resilient locator strategy)
- API tests alongside UI tests

## Page Snapshot Analysis Rules (apply these FIRST when a snapshot is present)

1. Treat the "Page snapshot" as ground truth — it is the exact ARIA accessibility tree rendered by the browser at the moment of failure.
2. Before hypothesising a locator issue, check whether the expected element (e.g. a validation message, error text) is PRESENT anywhere in the snapshot.
3. If the expected element or text is ABSENT from the snapshot entirely, classify the failure as \`missing_feature\` — the application does not implement this behaviour. Do NOT classify it as a locator failure.
4. Only classify as \`locator_failure\` if the expected content type IS present in the snapshot but is located at a different selector than what the test targets.
5. If a snapshot shows a completely different application state (e.g. wrong page, unexpected error) classify as \`application_bug\` or \`environment_issue\` as appropriate.

Test run summary:
- Total: ${stats?.expected ?? "N/A"} tests
- Passed: ${stats != null ? stats.expected - stats.unexpected : "N/A"}
- Failed: ${failures.length}
- Duration: ${Math.round((stats?.duration ?? 0) / 1000)}s

Failures to analyze:
${failureList}

Analyze these failures and respond ONLY with a valid JSON object (no markdown, no preamble) in exactly this structure:

{
  "executiveSummary": "2-3 sentence plain-English summary of what went wrong in this test run",
  "overallHealthScore": <number 0-100 representing suite health, 100 = all passing>,
  "rootCausePatterns": [
    {
      "pattern": "short pattern name",
      "description": "what this pattern means",
      "affectedFailures": [<failure numbers>],
      "likelihood": "high|medium|low"
    }
  ],
  "categorizedFailures": [
    {
      "failureNumber": <number>,
      "title": "test title",
      "category": "locator_failure|assertion_failure|api_failure|test_data_issue|environment_issue|application_bug|missing_feature|timeout|flaky",
      "rootCauseSummary": "one sentence hypothesis",
      "suggestedAction": "one concrete next step for the engineer",
      "priority": "critical|high|medium|low",
      "priorityReason": "why this priority"
    }
  ],
  "prioritizedFixOrder": [<failure numbers in recommended fix order>],
  "systemicIssues": ["any cross-cutting concerns affecting multiple tests"],
  "quickWins": ["failures that are likely fastest to fix"]
}`;
}

main().catch((err) => {
  console.error("\n❌ AI Reporter failed:", err.message);
  process.exit(1);
});
