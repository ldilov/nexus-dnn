import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const HOST = process.env.EMOTIONTTS_HOST ?? "http://127.0.0.1:3000";
const DEPLOYMENT_ID = process.env.EMOTIONTTS_DEPLOYMENT_ID ?? "dep_smoke";

test.skip(
  !process.env.RUN_E2E,
  "Gated behind RUN_E2E=1 — requires the host shell + a seeded EmotionTTS deployment.",
);

interface RouteSpec {
  readonly id: string;
  readonly path: (deployment: string) => string;
}

const ROUTES: readonly RouteSpec[] = [
  { id: "deployments-index", path: () => `/extensions/nexus.audio.emotiontts/` },
  { id: "recipe", path: (d) => `/extensions/nexus.audio.emotiontts/${d}/recipe` },
  { id: "mappings", path: (d) => `/extensions/nexus.audio.emotiontts/${d}/mappings` },
];

async function applyBaseline(page: Page): Promise<void> {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("nexus.tweaks.accent", "primary");
      window.localStorage.setItem("nexus.tweaks.density", "cozy");
      window.localStorage.setItem("nexus.tweaks.card", "flat");
    } catch {
      // ignore — fresh contexts may not have storage yet
    }
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
}

test.describe("EmotionTTS internal routes — WCAG 2.2 AA baseline", () => {
  for (const route of ROUTES) {
    test(`${route.id} — no serious/critical axe violations`, async ({ page }) => {
      await applyBaseline(page);
      await page.goto(`${HOST}${route.path(DEPLOYMENT_ID)}`, { waitUntil: "networkidle" });
      // Confirm the bundle actually mounted before scoring; if the host
      // refused to render the layout (deployment missing, runtime offline),
      // axe would score the host fallback page and inflate violations.
      await expect(
        page.locator("emotion-tts-app, [data-emotion-tts-mounted]").first(),
      ).toBeAttached({ timeout: 10_000 });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(
        blocking,
        `axe violations on ${route.id}:\n${JSON.stringify(blocking, null, 2)}`,
      ).toEqual([]);
    });
  }
});
