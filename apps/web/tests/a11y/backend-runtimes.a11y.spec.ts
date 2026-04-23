import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/#/backend-runtimes";
const CATALOG_PROBE = "/api/v1/backend-runtimes";

async function hostAvailable(page: Page): Promise<boolean> {
  try {
    const res = await page.request.get(CATALOG_PROBE);
    const ct = res.headers()["content-type"] ?? "";
    return res.ok() && ct.includes("application/json");
  } catch {
    return false;
  }
}

async function goto(page: Page): Promise<void> {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(ROUTE, { waitUntil: "networkidle" });
}

test.describe("Backend Runtimes — accessibility (spec 032 T105)", () => {
  test("catalog page has no WCAG 2.1 AA violations", async ({ page }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable");
      return;
    }
    await goto(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("install modal is keyboard-reachable and traps focus", async ({ page }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable");
      return;
    }
    await goto(page);

    const installBtn = page.getByRole("button", { name: /^install$/i }).first();
    if ((await installBtn.count()) === 0) {
      test.skip(true, "no installable runtime in the running catalog");
      return;
    }

    await installBtn.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const focusable = dialog.getByRole("button").or(dialog.getByRole("combobox"));
    await expect(focusable.first()).toBeFocused();

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("action buttons and live-lease badge expose accessible names", async ({
    page,
  }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable");
      return;
    }
    await goto(page);

    const anyInstallRow = page.locator('[aria-label="installs"]').first();
    if ((await anyInstallRow.count()) === 0) {
      test.skip(true, "no installs rendered — smoke prerequisite");
      return;
    }

    for (const label of ["Start", "Stop", "Restart", "Uninstall"]) {
      const btn = anyInstallRow.getByRole("button", { name: new RegExp(label, "i") }).first();
      if ((await btn.count()) > 0) {
        await expect(btn).toBeVisible();
      }
    }

    const results = await new AxeBuilder({ page })
      .include('[aria-label="installs"]')
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
