import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";

// Spec 037 — T097: WCAG 2.2 AA baseline across every primary host route.
// Asserts zero serious/critical violations at the documented baseline:
//   data-density="cozy" × data-accent="primary" × data-card="flat"
// Routes that depend on host data SKIP cleanly when the API is unreachable.

interface RouteSpec {
  readonly id: string;
  readonly path: string;
  readonly probe?: string;
}

const PRIMARY_ROUTES: readonly RouteSpec[] = [
  { id: "home", path: "/" },
  { id: "modules-index", path: "/#/modules", probe: "/api/v1/modules" },
  { id: "deployments-index", path: "/#/deployments", probe: "/api/v1/deployments" },
  { id: "backends", path: "/#/backends", probe: "/api/v1/backends" },
  { id: "backend-runtimes", path: "/#/backend-runtimes", probe: "/api/v1/backend-runtimes" },
  { id: "models-search", path: "/#/models-search" },
  { id: "runs", path: "/#/runs" },
  { id: "artifacts", path: "/#/artifacts" },
  { id: "extensions-gallery", path: "/#/extensions" },
  { id: "recipes", path: "/#/recipes", probe: "/api/v1/recipes" },
  { id: "workflows", path: "/#/workflows" },
];

async function hostAvailable(page: Page, probe: string | undefined): Promise<boolean> {
  if (!probe) return true;
  try {
    const res = await page.request.get(probe);
    const ct = res.headers()["content-type"] ?? "";
    return res.ok() && ct.includes("application/json");
  } catch {
    return false;
  }
}

async function applyBaseline(page: Page): Promise<void> {
  // Set tweak storage BEFORE navigation so the pre-React initializer (T011) reads it.
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem(
        "nexus.tweaks.accent",
        JSON.stringify({ value: "primary" }),
      );
      window.localStorage.setItem(
        "nexus.tweaks.density",
        JSON.stringify({ value: "cozy" }),
      );
      window.localStorage.setItem(
        "nexus.tweaks.card",
        JSON.stringify({ value: "flat" }),
      );
    } catch {
      // ignore — fresh contexts may not have storage yet
    }
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
}

test.describe("Primary host routes — WCAG 2.2 AA baseline (spec 037 T097)", () => {
  for (const route of PRIMARY_ROUTES) {
    test(`${route.id} — no serious/critical axe violations`, async ({ page }) => {
      await applyBaseline(page);
      if (!(await hostAvailable(page, route.probe))) {
        test.skip(true, `host API not reachable for ${route.id}`);
        return;
      }
      await page.goto(route.path, { waitUntil: "networkidle" });

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
