/* global process */
import { defineConfig, devices } from "@playwright/test";

const baseUrl = "http://127.0.0.1:3000";

let reporter = "line";
if (!process.env.CI) {
  reporter = [
    ["html", { open: "never", outputFolder: "../../Build/Specs/e2e/report" }],
    ["list"],
  ];
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: ".",
  outputDir: "../../Build/Specs/e2e/artifacts",
  fullyParallel: false, // async scripts will block each other and lead to timeouts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: reporter,
  use: {
    baseURL: baseUrl,
    trace: "on-first-retry",
    viewport: { width: 320, height: 180 },
  },
  expect: {
    timeout: 10000,
    toHaveSnapshot: {
      threshold: 0.4,
      maxDiffPixelRatio: 0.02,
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start -- --port 3000",
    url: baseUrl,
    reuseExistingServer: !process.env.CI,
  },
});
