import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const parseBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

const headlessMode = parseBoolean(process.env.HEADLESS_MODE, true);
const maximizedWindow = parseBoolean(process.env.MAXIMIZED_WINDOW, false);
const baseUrl = process.env.BASE_URL;

const bddTestDir = defineBddConfig({
  features: "tests/features/**/*.feature",
  steps: ["tests/steps/**/*.ts", "tests/hooks/**/*.ts", "src/fixtures/ui.fixtures.ts"],
});

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : parseInt(process.env.WORKERS ?? "4"),

  reporter: process.env.CI
    ? [
        ["blob", { outputDir: "blob-report" }],
        ["line"],
        [
          "allure-playwright",
          {
            detail: true,
            resultsDir: "reports/allure-results",
            suiteTitle: false,
          },
        ],
      ]
    : [
        ["line"],
        ["html", { outputFolder: "reports/playwright-html", open: "never" }],
        ["json", { outputFile: "reports/playwright-results.json" }],
        [
          "allure-playwright",
          {
            detail: true,
            resultsDir: "reports/allure-results",
            suiteTitle: false,
          },
        ],
      ],

  use: {
    screenshot: "only-on-failure",
    headless: headlessMode,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: "on-first-retry",
    ...(baseUrl ? { baseURL: baseUrl } : {}),
    ...(maximizedWindow
      ? {
          viewport: null,
          launchOptions: { args: ["--start-maximized"] },
        }
      : {}),
  },

  projects: [
    // ── API project (test discovery only) ─────────────────────
    {
      name: "api",
      testDir: "tests/api",
    },

    // ── UI projects (BDD) — select via --project ───────────────
    { name: "chromium", use: { browserName: "chromium" }, testDir: bddTestDir },
    // { name: "firefox", use: { browserName: "firefox" }, testDir: bddTestDir },
    // { name: "webkit", use: { browserName: "webkit" }, testDir: bddTestDir },
    // { name: "mobile-chrome", use: { ...devices["Pixel 5"] }, testDir: bddTestDir },
    // { name: "mobile-safari", use: { ...devices["iPhone 12"] }, testDir: bddTestDir },
  ],
});
