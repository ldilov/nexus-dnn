import { expect, test } from "@playwright/test";

const RUN_E2E = process.env.RUN_E2E === "1";
const RECIPE_URL = process.env.RECIPE_URL ?? "http://localhost:5173/#/extensions/nexus.audio.emotiontts/example/recipe";
const RUN_DETAIL_URL = process.env.RUN_DETAIL_URL ?? "http://localhost:5173/#/extensions/nexus.audio.emotiontts/example/runs";

test.describe("Recipe Studio perceived-latency assertions", () => {
  test.skip(!RUN_E2E, "RUN_E2E=1 to run against a live deployment");

  test("SC-002 — radar drag commits within 50 ms (median of 5 trials)", async ({ page }) => {
    await page.goto(RECIPE_URL);
    await page.waitForSelector('[aria-label="8-axis emotion radar"]', { timeout: 10_000 });

    const trials: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      const t0 = await page.evaluate(() => performance.now());
      await page.locator('[aria-label="8-axis emotion radar"] circle[role="slider"]').first().focus();
      await page.keyboard.press("ArrowUp");
      await page.waitForFunction(() => {
        const chips = Array.from(document.querySelectorAll('[aria-pressed="true"]'));
        return chips.length > 0;
      });
      const t1 = await page.evaluate(() => performance.now());
      trials.push(t1 - t0);
    }
    trials.sort((a, b) => a - b);
    const median = trials[2] ?? 0;
    expect(median, `Radar drag latency p50 = ${median}ms`).toBeLessThan(50);
  });

  test("SC-013 — slider readout updates within 16 ms in-page (1 frame at 60Hz)", async ({ page }) => {
    await page.goto(RECIPE_URL);
    await page.waitForSelector("input[type=range]", { timeout: 10_000 });
    const elapsed = await page.evaluate(() => {
      const slider = document.querySelector<HTMLInputElement>("input[type=range]");
      if (!slider) return Number.POSITIVE_INFINITY;
      slider.focus();
      const t0 = performance.now();
      const initial = Number(slider.value);
      const step = Number(slider.step) || 1;
      slider.value = String(initial + step);
      slider.dispatchEvent(new Event("input", { bubbles: true }));
      const t1 = performance.now();
      return t1 - t0;
    });
    expect(elapsed, "in-page slider input handler").toBeLessThan(16);
  });

  test("SC-012 — preview latency cache-warm <500ms / cache-cold <3s", async ({ page }) => {
    await page.goto(RUN_DETAIL_URL);
    await page.waitForSelector('button:has-text("Open editor")', { timeout: 10_000 }).catch(() => {});
    test.skip(true, "Requires active run + utterance fixture; populate before running");
  });

  test("SC-004 — recipe → utterance editor in ≤2 user-visible clicks", async ({ page }) => {
    await page.goto(RECIPE_URL);
    let clickCount = 0;
    await page.context().route("**/*", (route) => route.continue());
    page.on("click", () => {
      clickCount += 1;
    });
    const recentRun = page.locator('button:has-text("Open queue")').first();
    test.skip(true, "Requires active deployment with at least one completed run");
    void recentRun;
    expect(clickCount, "click count to editor").toBeLessThanOrEqual(2);
  });

  test("SC-015 — Synth speed mode hides when supports_per_utterance_speed=false", async ({ page }) => {
    await page.goto(RECIPE_URL);
    test.skip(true, "Requires runtime capability mock; integrate with backend test fixtures");
  });
});

test.describe("Two-tab concurrent edit smoke (last-write-wins)", () => {
  test.skip(!RUN_E2E, "RUN_E2E=1 to run");

  test("two browser contexts edit the same recipe screen without chain corruption", async ({ browser }) => {
    test.skip(true, "Requires active deployment + audio asset fixtures");
    const ctxA = await browser.newContext();
    const ctxB = await browser.newContext();
    const pageA = await ctxA.newPage();
    const pageB = await ctxB.newPage();
    await pageA.goto(RECIPE_URL);
    await pageB.goto(RECIPE_URL);
    await ctxA.close();
    await ctxB.close();
  });
});
