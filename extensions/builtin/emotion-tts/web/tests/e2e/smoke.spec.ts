import { expect, test } from "@playwright/test";

test.skip(
  !process.env.RUN_E2E,
  "Gated behind RUN_E2E=1 — requires a warm IndexTTS-2 runtime + seeded deployment.",
);

const HOST = process.env.EMOTIONTTS_HOST ?? "http://127.0.0.1:3000";
const DEPLOYMENT_ID = process.env.EMOTIONTTS_DEPLOYMENT_ID ?? "dep_smoke";

const CANONICAL_SCRIPT = `[Bob] Hey Alice, can you hear me?
[Alice] Loud and clear, Bob.
[Sarah] I'll join you both in a second.
[Bob] Perfect, take your time.`;

test("canonical Bob/Alice/Sarah flow produces four audio files", async ({ page }) => {
  await page.goto(`${HOST}/extensions/nexus.audio.emotiontts/${DEPLOYMENT_ID}/recipe`);

  await expect(page.getByRole("heading", { name: /deployment/i }).first()).toBeVisible();
  const textarea = page.getByRole("textbox", { name: /dialogue script/i });
  await textarea.fill(CANONICAL_SCRIPT);

  await expect(page.getByText("004_Bob_002.mp3")).toBeVisible();

  const generate = page.getByRole("button", { name: /generate/i });
  await expect(generate).toBeEnabled();
  await generate.click();

  await expect(page.getByText(/running/i).first()).toBeVisible({ timeout: 10_000 });

  await expect(page.getByText("003_Sarah_001.mp3")).toBeVisible();

  await expect(page.getByRole("link", { name: /download zip/i })).toBeVisible({
    timeout: 120_000,
  });
});
