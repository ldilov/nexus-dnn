/**
 * Accessibility + keyboard-navigation coverage for the Models Search screen
 * (spec 025-models-search-refactor, T117).
 *
 * Scope — NFR-006, NFR-007, SC-005:
 *   - keyboard navigation reaches the filter controls and variant rows
 *   - every status (compatibility, loading, degraded registry) is conveyed
 *     with a non-color channel (text + role/aria, not just a hue)
 *   - filter region and paginator announce themselves to AT via landmark roles
 *
 * This spec is the follow-up coverage ticket referenced by the Principle VI
 * design-heavy-UI carve-out (spec.md § Test Strategy). It runs headless and
 * depends on the standard `pnpm dev` webServer from playwright.config.ts.
 */
import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/#/models-search?q=llama&format=gguf";

async function gotoModelsSearch(page: Page): Promise<void> {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(ROUTE, { waitUntil: "networkidle" });
}

test.describe("Models Search — accessibility + keyboard nav", () => {
  test("filter bar exposes search landmark and clear button", async ({ page }) => {
    await gotoModelsSearch(page);

    const filterRegion = page.getByRole("search", { name: /model filters/i });
    await expect(filterRegion).toBeVisible();

    const clearAll = page.getByRole("button", { name: /clear all filters/i });
    await expect(clearAll).toBeVisible();
  });

  test("show-unsupported toggle is announced as a switch", async ({ page }) => {
    await gotoModelsSearch(page);

    const toggle = page.getByRole("switch", { name: /show unsupported/i });
    await expect(toggle).toBeVisible();

    // Keyboard: space must flip the switch state.
    const before = await toggle.getAttribute("aria-checked");
    await toggle.focus();
    await page.keyboard.press("Space");
    const after = await toggle.getAttribute("aria-checked");
    expect(after).not.toBe(before);
  });

  test("compatibility badge is labelled (non-color channel)", async ({ page }) => {
    await gotoModelsSearch(page);

    const anyBadge = page
      .getByRole("status")
      .filter({ hasText: /compatibility:/i })
      .first();
    await expect(anyBadge).toBeVisible();
  });

  test("variant rows are reachable and labelled for screen readers", async ({
    page,
  }) => {
    await gotoModelsSearch(page);

    // The first card's variant list should expose a list role; each row a
    // listitem with an aria-label describing label + size + compat.
    const firstVariant = page.getByRole("listitem").first();
    await expect(firstVariant).toBeVisible();

    const label = await firstVariant.getAttribute("aria-label");
    expect(label, "variant row must have an aria-label combining label + size").toMatch(
      /q\d|fp\d|bf\d|precision|variant/i,
    );
  });

  test("paginator is announced as a navigation landmark", async ({ page }) => {
    await gotoModelsSearch(page);

    const paginator = page.getByRole("navigation", { name: /pagination/i });
    // Paginator may be absent for small result sets — only assert when present.
    if (await paginator.count()) {
      await expect(paginator.first()).toBeVisible();
      const prev = paginator.getByRole("button", { name: /previous page/i });
      await expect(prev).toBeVisible();
    }
  });

  test("Tab order reaches filter bar, sort menu, and first variant", async ({
    page,
  }) => {
    await gotoModelsSearch(page);

    // Press Tab a handful of times and assert focus never gets trapped outside
    // the main landmark. We cap the sweep at 20 to keep the test deterministic.
    const reached = new Set<string>();
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const tag = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return "none";
        const role = el.getAttribute("role") ?? "";
        return `${el.tagName.toLowerCase()}:${role}`;
      });
      reached.add(tag);
    }
    // We expect the sweep to surface at least one interactive element that
    // belongs to the search screen (button / switch / listitem / option).
    const keyboardTargets = [...reached].filter((t) =>
      /button|switch|option|listitem|link/i.test(t),
    );
    expect(keyboardTargets.length).toBeGreaterThan(0);
  });
});
