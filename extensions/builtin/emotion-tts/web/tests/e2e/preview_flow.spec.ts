import { expect, test } from "@playwright/test";

test.skip(
  !process.env.RUN_E2E,
  "Gated behind RUN_E2E=1 — requires a warm IndexTTS-2 runtime + seeded deployment with at least one mapping (speaker voice asset attached)."
);

const HOST = process.env.EMOTIONTTS_HOST ?? "http://127.0.0.1:3000";
const DEPLOYMENT_ID = process.env.EMOTIONTTS_DEPLOYMENT_ID ?? "dep_smoke";

test("preview flow — render, swap, and revoke object URLs", async ({ page }) => {
  const revokedUrls: string[] = [];
  await page.exposeFunction("__recordRevoke", (url: string) => {
    revokedUrls.push(url);
  });
  await page.addInitScript(() => {
    const original = URL.revokeObjectURL.bind(URL);
    URL.revokeObjectURL = (url: string) => {
      (window as unknown as { __recordRevoke: (u: string) => void }).__recordRevoke(url);
      original(url);
    };
  });

  await page.goto(`${HOST}/extensions/nexus.audio.emotiontts/${DEPLOYMENT_ID}/mappings`);

  const firstMapping = page.getByTestId("mapping-row").first();
  await expect(firstMapping).toBeVisible({ timeout: 30_000 });
  await firstMapping.click();

  const previewButton = page.getByRole("button", { name: /preview/i });
  await expect(previewButton).toBeEnabled();

  await previewButton.click();
  const audio = page.locator('audio[aria-label="Edit preview"]');
  await expect(audio).toBeVisible({ timeout: 60_000 });

  const firstSrc = await audio.getAttribute("src");
  expect(firstSrc).toMatch(/^blob:/);

  await expect(page.getByTestId("preview-consumed-hint")).toBeVisible();

  await previewButton.click();
  await expect(audio).toBeVisible({ timeout: 60_000 });
  const secondSrc = await audio.getAttribute("src");
  expect(secondSrc).toMatch(/^blob:/);
  expect(secondSrc).not.toBe(firstSrc);

  expect(revokedUrls).toContain(firstSrc);

  await page.reload();
  await expect(page.locator('audio[aria-label="Edit preview"]')).toHaveCount(0);
});
