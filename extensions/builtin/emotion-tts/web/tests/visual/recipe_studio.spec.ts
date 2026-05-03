import { expect, test } from "@playwright/test";

const RUN_VISUAL = process.env.RUN_VISUAL === "1";
const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

const RECIPE_URL = process.env.RECIPE_URL ?? "http://localhost:5173/#/extensions/nexus.audio.emotiontts/example/recipe";

test.describe("Recipe Studio visual baselines (SC-001)", () => {
  test.skip(!RUN_VISUAL, "RUN_VISUAL=1 to run; baselines committed when stable");

  for (const viewport of VIEWPORTS) {
    test(`renders without clipping at ${viewport.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(RECIPE_URL);
      await page.waitForSelector('[aria-labelledby="recipe-section-script"]', {
        timeout: 10_000,
      });

      await expect(page).toHaveScreenshot(`recipe-${viewport.name}.png`, {
        fullPage: true,
        animations: "disabled",
      });

      const clipped = await page.$$eval("h1, h2, h3, p, span, button", (nodes) =>
        nodes
          .filter((el) => {
            const e = el as HTMLElement;
            const overflow = window.getComputedStyle(e).textOverflow;
            return (
              overflow === "ellipsis" &&
              e.scrollWidth > e.clientWidth + 1 &&
              e.offsetWidth > 0
            );
          })
          .map((el) => ({
            tag: el.tagName,
            text: (el.textContent ?? "").slice(0, 60),
          })),
      );
      expect(clipped, `Found clipped elements at ${viewport.name}px`).toEqual([]);
    });
  }
});
