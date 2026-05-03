import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: /tests\/(e2e|a11y|visual)\/.*\.spec\.ts$/,
  timeout: 180_000,
  fullyParallel: false,
  retries: 0,
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      testMatch: /tests\/e2e\/.*\.spec\.ts$/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "a11y",
      testMatch: /tests\/a11y\/.*\.spec\.ts$/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "visual",
      testMatch: /tests\/visual\/.*\.spec\.ts$/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
