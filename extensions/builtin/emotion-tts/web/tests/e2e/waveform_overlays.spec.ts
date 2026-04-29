import { expect, test } from "@playwright/test";

test.skip(
  !process.env.RUN_E2E,
  "Gated behind RUN_E2E=1 — requires a warm IndexTTS-2 runtime + seeded deployment with at least one mapping (speaker voice asset attached)."
);

const HOST = process.env.EMOTIONTTS_HOST ?? "http://127.0.0.1:3000";
const DEPLOYMENT_ID = process.env.EMOTIONTTS_DEPLOYMENT_ID ?? "dep_smoke";

const START_LABEL = "Region start";
const END_LABEL = "Region end";

test.describe("waveform overlays (FR-036)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${HOST}/extensions/nexus.audio.emotiontts/${DEPLOYMENT_ID}/mappings`);
    const firstMapping = page.getByTestId("mapping-row").first();
    await expect(firstMapping).toBeVisible({ timeout: 30_000 });
    await firstMapping.click();
    await expect(page.getByRole("slider", { name: START_LABEL })).toBeVisible({ timeout: 30_000 });
  });

  test("trimmed regions render a dimmed overlay distinct from the active region (FR-036)", async ({
    page,
  }) => {
    const startHandle = page.getByRole("slider", { name: START_LABEL });
    const endHandle = page.getByRole("slider", { name: END_LABEL });

    await startHandle.focus();
    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press("Shift+ArrowRight");
    }
    await endHandle.focus();
    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press("Shift+ArrowLeft");
    }

    const wrapperOpacities = await page.evaluate((labels) => {
      const handle = document.querySelector(`[role="slider"][aria-label="${labels.start}"]`);
      const wrapper = handle?.parentElement;
      if (!wrapper) return null;
      const dimmed = Array.from(wrapper.children).filter(
        (child) => child instanceof HTMLElement && child.getAttribute("role") !== "slider" && child.tagName !== "CANVAS",
      );
      return dimmed
        .map((node) => Number(getComputedStyle(node as HTMLElement).opacity))
        .filter((value) => Number.isFinite(value));
    }, { start: START_LABEL });

    expect(wrapperOpacities).not.toBeNull();
    const dimRegionOpacity = (wrapperOpacities as number[]).find((value) => value > 0 && value < 1);
    expect(dimRegionOpacity).toBeDefined();
    expect(dimRegionOpacity!).toBeLessThan(1);
  });

  test("waveform canvas keeps a stable aspect ratio while overlays render (FR-036 layout invariant)", async ({
    page,
  }) => {
    const canvas = page.locator('canvas[aria-label="Audio waveform"]');
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
    expect(box!.height / box!.width).toBeLessThan(1);
  });

  test.skip("mute regions render a flat horizontal bar (FR-036 future op)", async () => {
    /* Skipped — mute op UI is not yet implemented in waveform_canvas.tsx. */
    /* When the mute op renders an overlay, this test should snapshot the */
    /* canvas pixel band across the muted range and assert variance ≈ 0.    */
  });

  test.skip("fade regions render a triangular gradient (FR-036 future op)", async () => {
    /* Skipped — fade op UI is not yet implemented in waveform_canvas.tsx. */
    /* When the fade op renders an overlay, assert the alpha channel along */
    /* the fade region is monotonically increasing or decreasing.          */
  });
});
