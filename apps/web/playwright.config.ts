import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.WEB_PORT ?? 5173);
const HOST = process.env.WEB_HOST ?? "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
] as const;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    colorScheme: "dark",
    locale: "en-US",
  },
  projects: [
    {
      name: "smoke",
      testMatch: /tests\/smoke\/.*\.spec\.ts$/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    ...VIEWPORTS.map((vp) => ({
      name: `visual-${vp.name}`,
      testMatch: /tests\/visual\/.*\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: vp.width, height: vp.height },
      },
    })),
  ],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005,
      threshold: 0.2,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: "pnpm dev",
        url: BASE_URL,
        timeout: 120_000,
        reuseExistingServer: !process.env.CI,
      },
});
