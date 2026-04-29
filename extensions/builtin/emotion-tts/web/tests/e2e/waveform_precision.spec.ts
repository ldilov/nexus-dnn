import { expect, test } from "@playwright/test";

test.skip(
  !process.env.RUN_E2E,
  "Gated behind RUN_E2E=1 — requires a warm IndexTTS-2 runtime + seeded deployment with at least one mapping (speaker voice asset attached)."
);

const HOST = process.env.EMOTIONTTS_HOST ?? "http://127.0.0.1:3000";
const DEPLOYMENT_ID = process.env.EMOTIONTTS_DEPLOYMENT_ID ?? "dep_smoke";

const START_LABEL = "Region start";
const END_LABEL = "Region end";

async function readAriaValueNow(handle: import("@playwright/test").Locator): Promise<number> {
  const raw = await handle.getAttribute("aria-valuenow");
  if (!raw) throw new Error("handle missing aria-valuenow");
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) throw new Error(`aria-valuenow not numeric: ${raw}`);
  return parsed;
}

test.describe("waveform precision (FR-033 / FR-035 / SC-011)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${HOST}/extensions/nexus.audio.emotiontts/${DEPLOYMENT_ID}/mappings`);
    const firstMapping = page.getByTestId("mapping-row").first();
    await expect(firstMapping).toBeVisible({ timeout: 30_000 });
    await firstMapping.click();
    await expect(page.getByRole("slider", { name: START_LABEL })).toBeVisible({ timeout: 30_000 });
  });

  test("ArrowRight nudges start handle by exactly 10 ms (FR-035 default step)", async ({ page }) => {
    const startHandle = page.getByRole("slider", { name: START_LABEL });
    await startHandle.focus();
    const before = await readAriaValueNow(startHandle);

    await page.keyboard.press("ArrowRight");

    const after = await readAriaValueNow(startHandle);
    expect(after - before).toBe(10);
  });

  test("Shift+ArrowRight nudges by exactly 100 ms (FR-035 coarse step)", async ({ page }) => {
    const startHandle = page.getByRole("slider", { name: START_LABEL });
    await startHandle.focus();
    const before = await readAriaValueNow(startHandle);

    await page.keyboard.press("Shift+ArrowRight");

    const after = await readAriaValueNow(startHandle);
    expect(after - before).toBe(100);
  });

  test("Ctrl+ArrowRight nudges by exactly 1 ms (FR-035 fine step)", async ({ page }) => {
    const startHandle = page.getByRole("slider", { name: START_LABEL });
    await startHandle.focus();
    const before = await readAriaValueNow(startHandle);

    await page.keyboard.press("Control+ArrowRight");

    const after = await readAriaValueNow(startHandle);
    expect(after - before).toBe(1);
  });

  test("ArrowLeft nudges symmetrically by -10 ms", async ({ page }) => {
    const startHandle = page.getByRole("slider", { name: START_LABEL });
    await startHandle.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    const before = await readAriaValueNow(startHandle);

    await page.keyboard.press("ArrowLeft");

    const after = await readAriaValueNow(startHandle);
    expect(after - before).toBe(-10);
  });

  test("end handle keyboard nudges respond identically (FR-035 symmetry)", async ({ page }) => {
    const endHandle = page.getByRole("slider", { name: END_LABEL });
    await endHandle.focus();
    const before = await readAriaValueNow(endHandle);

    await page.keyboard.press("ArrowLeft");

    const after = await readAriaValueNow(endHandle);
    expect(after - before).toBe(-10);
  });

  test("pointer drag of start handle resolves within ≤100 ms of expected boundary at default zoom (FR-033)", async ({
    page,
  }) => {
    const startHandle = page.getByRole("slider", { name: START_LABEL });
    const wrapperBox = await startHandle.evaluate((el) => {
      const wrapper = el.parentElement as HTMLElement | null;
      if (!wrapper) return null;
      const rect = wrapper.getBoundingClientRect();
      return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    });
    if (!wrapperBox) throw new Error("waveform wrapper bounding box unavailable");

    const handleBox = await startHandle.boundingBox();
    if (!handleBox) throw new Error("handle bounding box unavailable");

    const durationRaw = await startHandle.getAttribute("aria-valuemax");
    const durationMs = Number(durationRaw ?? "0");
    expect(durationMs).toBeGreaterThan(0);

    const targetRatio = 0.25;
    const targetX = wrapperBox.x + wrapperBox.width * targetRatio;
    const centreY = wrapperBox.y + wrapperBox.height / 2;
    const expectedMs = Math.round(durationMs * targetRatio);

    await page.mouse.move(handleBox.x + handleBox.width / 2, centreY);
    await page.mouse.down();
    await page.mouse.move(targetX, centreY, { steps: 12 });
    await page.mouse.up();

    const resolvedMs = await readAriaValueNow(startHandle);
    expect(Math.abs(resolvedMs - expectedMs)).toBeLessThanOrEqual(100);
  });

  test.skip("max-zoom drag accuracy ≤10 ms (FR-033 high-zoom)", async () => {
    /* Skipped — current waveform_canvas implementation has no zoom controls. */
    /* When zoom lands, this test should drive the zoom control to its max */
    /* setting and re-run the drag-accuracy assertion with a 10 ms tolerance. */
  });
});
