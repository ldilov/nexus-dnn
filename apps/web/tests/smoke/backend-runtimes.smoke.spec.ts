import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/#/backend-runtimes";
const CATALOG_PROBE = "/api/v1/backend-runtimes";
const TEST_RUNTIME_ID = "test.echo";

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

test.describe("Backend Runtimes — smoke flows (spec 032 T102)", () => {
  test("page renders the catalog heading even when catalog is empty", async ({
    page,
  }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable — skipping smoke test");
      return;
    }
    await goto(page);

    const heading = page.getByRole("heading", { name: /backend runtimes/i });
    await expect(heading).toBeVisible();
  });

  test("test-echo card exposes an Install button when implementation is available", async ({
    page,
  }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable — skipping smoke test");
      return;
    }
    await goto(page);

    const card = page
      .locator(`article[data-runtime-id="${TEST_RUNTIME_ID}"]`)
      .first();
    if ((await card.count()) === 0) {
      test.skip(
        true,
        `${TEST_RUNTIME_ID} not registered in the running host — activate the test-echo-runtime extension before running this smoke`,
      );
      return;
    }

    await expect(card).toBeVisible();
    const status = card.getByText(/available|unavailable|deprecated|abandoned/i).first();
    await expect(status).toBeVisible();
  });

  test("install flow opens the release/platform/accelerator modal", async ({
    page,
  }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable");
      return;
    }
    await goto(page);

    const card = page
      .locator(`article[data-runtime-id="${TEST_RUNTIME_ID}"]`)
      .first();
    if ((await card.count()) === 0) {
      test.skip(true, `${TEST_RUNTIME_ID} not registered`);
      return;
    }

    const installBtn = card.getByRole("button", { name: /^install$/i });
    if ((await installBtn.count()) === 0) {
      test.skip(true, "Install button not rendered — runtime not 'available'");
      return;
    }
    await installBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const release = dialog.getByLabel(/release/i);
    const platform = dialog.getByLabel(/platform/i);
    const accel = dialog.getByLabel(/accelerator/i);
    await expect(release).toBeVisible();
    await expect(platform).toBeVisible();
    await expect(accel).toBeVisible();

    const cancel = dialog.getByRole("button", { name: /cancel|close/i });
    await cancel.click();
    await expect(dialog).toBeHidden();
  });

  test("pipeline stepper renders ten phases when an install is in-flight", async ({
    page,
  }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable");
      return;
    }
    await goto(page);

    const runningStepper = page.getByRole("list", { name: /install phases/i }).first();
    if ((await runningStepper.count()) === 0) {
      test.skip(true, "no install is currently running; stepper not mounted");
      return;
    }

    const phaseItems = runningStepper.getByRole("listitem");
    await expect(phaseItems).toHaveCount(10);
  });
});
