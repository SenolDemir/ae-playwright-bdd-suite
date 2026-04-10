import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const parseBoolean = (
  value: string | undefined,
  defaultValue: boolean,
): boolean => {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
};

/**
 * BrowserType = chromium | firefox | webkit | chrome | msedge |
 * mobile-chrome | mobile-safari | all
 */

const browserType = (process.env.BROWSER_TYPE ?? "chromium").toLowerCase();
const headlessMode = parseBoolean(process.env.HEADLESS_MODE, true);
const maximizedWindow = parseBoolean(process.env.MAXIMIZED_WINDOW, false);
const baseUrl = process.env.BASE_URL;

const allProjects = [
  {
    name: "chromium",
    use: {
      browserName: "chromium" as const,
    },
  },
  {
    name: "firefox",
    use: {
      browserName: "firefox" as const,
    },
  },
  {
    name: "webkit",
    use: {
      browserName: "webkit" as const,
    },
  },
  {
    name: "chrome",
    use: {
      browserName: "chromium" as const,
      channel: "chrome" as const,
    },
  },

  {
    name: "msedge",
    use: {
      browserName: "chromium" as const,
      channel: "msedge" as const,
    },
  },

  /* Test against mobile viewports. */
  {
    name: "mobile-chrome",
    use: {
      ...devices["Pixel 5"],
    },
  },
  {
    name: "mobile-safari",
    use: {
      ...devices["iPhone 12"],
    },
  },
];

const projects =
  browserType === "all"
    ? allProjects
    : allProjects.filter(({ name }) => name === browserType);

const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: ["steps/**/*.ts", "hooks/**/*.ts", "fixtures/testbase.ts"],
  // ...other playwright-bdd options
});

export default defineConfig({
  testDir,
  //testDir: './tests',
  globalTeardown: './playwright.teardown.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // ...(process.env.CI ? { workers: 1 } : {}),
  workers: process.env.CI ? 1 : parseInt(process.env.WORKERS ?? "4"),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: "html",
  reporter: [
    ["line"],
    // ["html", { outputFolder: "reports/playwright-html", open: "never" }],
    // [
    //   "allure-playwright",
    //   {
    //     detail: true,
    //     resultsDir: "reports/allure-results",
    //     suiteTitle: false,
    //   },
    // ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: "only-on-failure",
    // video: "retain-on-failure",
    headless: headlessMode,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    /* Base URL to use in actions like `await page.goto('')`. */
    ...(baseUrl ? { baseURL: baseUrl } : {}),

    ...(maximizedWindow
      ? {
          viewport: null,
          launchOptions: {
            args: ["--start-maximized"],
          },
        }
      : {}),

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects,

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
