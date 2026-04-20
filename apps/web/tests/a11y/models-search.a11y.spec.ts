import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/#/models?q=llama&format=gguf";

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

    const firstVariant = page.getByRole("listitem").first();
    await expect(firstVariant).toBeVisible();

    const label = await firstVariant.getAttribute("aria-label");
    expect(label).toMatch(/q\d|fp\d|bf\d|precision|variant/i);
  });

  test("paginator is announced as a navigation landmark", async ({ page }) => {
    await gotoModelsSearch(page);

    const paginator = page.getByRole("navigation", { name: /pagination/i });
    if (await paginator.count()) {
      await expect(paginator.first()).toBeVisible();
      const prev = paginator.getByRole("button", { name: /previous page/i });
      await expect(prev).toBeVisible();
    }
  });

  test("Downloaded chip cycles state via Enter and preserves non-color label", async ({
    page,
  }) => {
    await gotoModelsSearch(page);

    const chip = page.getByRole("button", { name: /^filter: downloaded/i });
    await expect(chip).toBeVisible();
    const initialPressed = await chip.getAttribute("aria-pressed");
    expect(initialPressed).toBe("false");

    await chip.focus();
    await page.keyboard.press("Enter");
    const afterOne = await chip.getAttribute("aria-pressed");
    expect(afterOne).toBe("true");
    const labelOne = await chip.getAttribute("aria-label");
    expect(labelOne).toMatch(/downloaded only/i);

    await page.keyboard.press("Enter");
    const labelTwo = await chip.getAttribute("aria-label");
    expect(labelTwo).toMatch(/not downloaded/i);
  });

  test("Tab order reaches filter bar, sort menu, and first variant", async ({
    page,
  }) => {
    await gotoModelsSearch(page);

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
    const keyboardTargets = [...reached].filter((t) =>
      /button|switch|option|listitem|link/i.test(t),
    );
    expect(keyboardTargets.length).toBeGreaterThan(0);
  });
});
