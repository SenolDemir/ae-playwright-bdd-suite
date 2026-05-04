import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const parseBoolean = (
  value: string | undefined,
  defaultValue: boolean,
): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

const browserType = (process.env.BROWSER_TYPE ?? "chromium").toLowerCase();
const headlessMode = parseBoolean(process.env.HEADLESS_MODE, true);
const maximizedWindow = parseBoolean(process.env.MAXIMIZED_WINDOW, false);
const baseUrl = process.env.BASE_URL;

const allProjects = [
  {
    name: "chromium",
    use: { browserName: "chromium" as const },
  },
  {
    name: "firefox",
    use: { browserName: "firefox" as const },
  },
  {
    name: "webkit",
    use: { browserName: "webkit" as const },
  },
  {
    name: "chrome",
    use: { browserName: "chromium" as const, channel: "chrome" as const },
  },
  {
    name: "msedge",
    use: { browserName: "chromium" as const, channel: "msedge" as const },
  },
  {
    name: "mobile-chrome",
    use: { ...devices["Pixel 5"] },
  },
  {
    name: "mobile-safari",
    use: { ...devices["iPhone 12"] },
  },
];

const uiBrowsers =
  browserType === "all"
    ? allProjects
    : allProjects.filter(({ name }) => name === browserType);

const bddTestDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: ["steps/**/*.ts", "hooks/**/*.ts", "fixtures/ui.fixtures.ts"],
});

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : parseInt(process.env.WORKERS ?? "4"),

  reporter: [
    ["line"],
    ["html", { outputFolder: "reports/playwright-html", open: "never" }],
    // [
    //   "allure-playwright",
    //   {
    //     detail: true,
    //     resultsDir: "reports/allure-results",
    //     suiteTitle: false,
    //   },
    // ],
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
      testDir: "api-tests",
      testMatch: "**/*.spec.ts",
    },

    // ── UI projects (BDD) ─────────────────────────────────────
    ...uiBrowsers.map((browser) => ({
      ...browser,
      testDir: bddTestDir,
    })),
  ],
});
