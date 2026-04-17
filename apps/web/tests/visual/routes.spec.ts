import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = join(HERE, "..", "smoke", "routes.json");
const FIXTURE = JSON.parse(readFileSync(FIXTURE_PATH, "utf8")) as RouteFixture;

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
  skipVisualDiff?: boolean;
}

function slug(path: string): string {
  return path.replace(/^\//, "").replace(/\//g, "-").replace(/:/g, "_") || "root";
}

function hashPath(path: string): string {
  return `/#${path}`;
}

for (const entry of FIXTURE.entries) {
  if (entry.skipVisualDiff) continue;

  test(`visual: ${entry.path}`, async ({ page }, testInfo) => {
    const viewportName = testInfo.project.name.replace("visual-", "");
    const viewportWidth = Number(viewportName);
    const allowed = entry.viewports ?? [375, 768, 1440];
    test.skip(
      !allowed.includes(viewportWidth),
      `skipped: ${entry.path} does not run at ${viewportWidth}px`,
    );

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(hashPath(entry.path), { waitUntil: "networkidle" });
    await page.waitForTimeout(250);

    await expect(page).toHaveScreenshot(`${slug(entry.path)}-${viewportWidth}.png`, {
      fullPage: true,
    });
  });
}
