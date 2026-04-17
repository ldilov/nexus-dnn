import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE = JSON.parse(
  readFileSync(join(HERE, "routes.json"), "utf8"),
) as RouteFixture;

interface RouteFixture {
  version: string;
  capturedOnSha: string;
  entries: RouteEntry[];
}

interface RouteEntry {
  path: string;
  title: string;
  mustContain: string[];
  viewports?: number[];
  requiresFixture?: boolean;
  fixtureSeed?: string;
  reducedMotion?: boolean;
  skipVisualDiff?: boolean;
}

function hashPath(path: string): string {
  return `/#${path}`;
}

for (const entry of FIXTURE.entries) {
  test(`route smoke: ${entry.path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(hashPath(entry.path), { waitUntil: "networkidle" });

    for (const needle of entry.mustContain) {
      await expect(
        page.getByText(needle, { exact: false }).first(),
        `route ${entry.path} missing expected copy: "${needle}"`,
      ).toBeVisible({ timeout: 3_000 });
    }
  });
}
