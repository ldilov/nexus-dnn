import { test, expect, type Page } from "@playwright/test";

const HOST = process.env.EMOTIONTTS_HOST ?? "http://127.0.0.1:3000";
const DEPLOYMENT_ID = process.env.EMOTIONTTS_DEPLOYMENT_ID ?? "dep_smoke";

test.skip(
  !process.env.RUN_E2E,
  "Gated behind RUN_E2E=1 — requires a host shell with EmotionTTS mounted.",
);

async function applyBaseline(page: Page): Promise<void> {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("nexus.tweaks.accent", "primary");
      window.localStorage.setItem("nexus.tweaks.density", "cozy");
      window.localStorage.setItem("nexus.tweaks.card", "flat");
    } catch {
      // ignore
    }
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
}

test("visual: EmotionTTS recipe at the documented baseline", async ({ page }) => {
  await applyBaseline(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${HOST}/extensions/nexus.audio.emotiontts/${DEPLOYMENT_ID}/recipe`, {
    waitUntil: "networkidle",
  });
  await expect(
    page.locator("emotion-tts-app, [data-emotion-tts-mounted]").first(),
  ).toBeAttached({ timeout: 10_000 });
  await page.waitForTimeout(250);

  await expect(page).toHaveScreenshot(`recipe-1440.png`, {
    fullPage: true,
  });
});
