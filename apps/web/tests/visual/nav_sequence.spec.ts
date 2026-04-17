import { test, expect } from "@playwright/test";

const VISUAL_VIEWPORT_WIDTH = 1440;

function hashPath(path: string): string {
  return `/#${path}`;
}

test(`nav-sequence reduced-motion: no in-flight animation captured`, async ({
  page,
}, testInfo) => {
  const viewportWidth = Number(testInfo.project.name.replace("visual-", ""));
  test.skip(
    viewportWidth !== VISUAL_VIEWPORT_WIDTH,
    `nav-sequence only runs at ${VISUAL_VIEWPORT_WIDTH}px`,
  );

  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.goto(hashPath("/"), { waitUntil: "networkidle" });
  await page.waitForTimeout(50);

  await page.goto(hashPath("/recipes"), { waitUntil: "networkidle" });
  await page.waitForTimeout(50);

  await page.goto(hashPath("/backends"), { waitUntil: "networkidle" });
  await page.waitForTimeout(250);

  await expect(page).toHaveScreenshot(
    `nav-sequence-final-backends-${viewportWidth}.png`,
    { fullPage: true },
  );
});
