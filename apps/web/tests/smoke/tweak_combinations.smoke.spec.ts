// Spec 037 / T090 — SC-009 smoke gate.
//
// Walks every accent × density × card combination (3 × 3 × 3 = 27) on the
// Home anchor route. For each combination:
//
// 1. Programmatically writes the tweak settings to localStorage and
//    `body.dataset.*` (faster + more deterministic than driving the
//    TweakPanel UI for 27 iterations).
// 2. Asserts the page root retains its primary section count — i.e. the
//    layout did not collapse, overflow, or hide a section under any
//    combination. This is the SC-009 "no layout breakage" guarantee.
//
// Per the spec carve-out, this is a structural smoke test, NOT a per-
// combination visual baseline (that would be 27 × 3 viewports = 81 PNGs
// with no real signal beyond what SC-001 baselines already cover).

import { test, expect } from "@playwright/test";

type Accent = "primary" | "secondary" | "tertiary";
type Density = "compact" | "cozy" | "spacious";
type CardStyle = "flat" | "glass" | "elevated";

const ACCENTS: ReadonlyArray<Accent> = ["primary", "secondary", "tertiary"];
const DENSITIES: ReadonlyArray<Density> = ["compact", "cozy", "spacious"];
const CARD_STYLES: ReadonlyArray<CardStyle> = ["flat", "glass", "elevated"];

interface Combo {
  accent: Accent;
  density: Density;
  card: CardStyle;
}

function allCombinations(): Combo[] {
  const combos: Combo[] = [];
  for (const accent of ACCENTS) {
    for (const density of DENSITIES) {
      for (const card of CARD_STYLES) {
        combos.push({ accent, density, card });
      }
    }
  }
  return combos;
}

const COMBOS = allCombinations();

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  // Land on Home anchor route once. Subsequent in-test mutations stay
  // on the same page so React reconciliation drives the layout — this
  // is closer to how a real operator toggles the tweak panel.
  await page.goto("/#/", { waitUntil: "networkidle" });
  // Clean slate so prior tests' tweaks don't leak into this one. Done
  // AFTER the first navigation so the cleanup doesn't repeat on
  // in-test page.reload() calls (which would clobber persistence
  // assertions like the "persists across reload" test).
  await page.evaluate(() => {
    try {
      window.localStorage.removeItem("nexus.tweaks.accent");
      window.localStorage.removeItem("nexus.tweaks.density");
      window.localStorage.removeItem("nexus.tweaks.card");
    } catch {
      // private mode / blocked storage — fine, defaults will load.
    }
  });
});

test("home renders 27 tweak combinations without layout breakage", async ({ page }) => {
  // Sanity baseline: capture the section count at default tweaks.
  const baselineSections = await page.locator("main section").count();
  expect(
    baselineSections,
    "Home must render at least one <section> at default tweaks",
  ).toBeGreaterThan(0);

  for (const combo of COMBOS) {
    await page.evaluate((c) => {
      window.localStorage.setItem("nexus.tweaks.accent", c.accent);
      window.localStorage.setItem("nexus.tweaks.density", c.density);
      window.localStorage.setItem("nexus.tweaks.card", c.card);
      document.body.dataset.accent = c.accent;
      document.body.dataset.density = c.density;
      document.body.dataset.card = c.card;
    }, combo);

    // Allow CSS-var propagation to settle (no React re-render needed).
    await page.waitForTimeout(40);

    const accent = await page.evaluate(() => document.body.dataset.accent);
    const density = await page.evaluate(() => document.body.dataset.density);
    const card = await page.evaluate(() => document.body.dataset.card);
    expect(accent).toBe(combo.accent);
    expect(density).toBe(combo.density);
    expect(card).toBe(combo.card);

    const sectionCount = await page.locator("main section").count();
    expect(
      sectionCount,
      `combo accent=${combo.accent} density=${combo.density} card=${combo.card} dropped sections (baseline=${baselineSections}, got=${sectionCount})`,
    ).toBe(baselineSections);

    // Layout root must not have collapsed — measure that <main>
    // produces non-zero height under every combination.
    const mainBox = await page.locator("main").first().boundingBox();
    expect(mainBox).not.toBeNull();
    if (mainBox) {
      expect(
        mainBox.height,
        `combo accent=${combo.accent} density=${combo.density} card=${combo.card} produced collapsed main height ${mainBox.height}px`,
      ).toBeGreaterThan(0);
      expect(
        mainBox.width,
        `combo accent=${combo.accent} density=${combo.density} card=${combo.card} produced collapsed main width ${mainBox.width}px`,
      ).toBeGreaterThan(0);
    }
  }
});

test("tweak panel UI drives every accent option through to localStorage", async ({
  page,
}) => {
  // The 27-combo walk above bypasses the UI for speed; this companion
  // exercises the full UI → React → applyTweaksToBody → saveTweakSettings
  // path so a future refactor that breaks any link in that chain (e.g.
  // renaming a localStorage key, dropping a body dataset attribute,
  // breaking the segmented-button click handler) fails this test.
  const trigger = page.getByRole("button", { name: "Tweak panel" });
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByTestId("tweak-panel")).toBeVisible();

  // Drive every accent option through the UI; assert the body dataset
  // AND localStorage both land on the chosen value.
  for (const accent of ["secondary", "tertiary", "primary"] as const) {
    await page.getByTestId(`tweak-accent-${accent}`).click();
    const bodyAccent = await page.evaluate(() => document.body.dataset.accent);
    const storedAccent = await page.evaluate(() =>
      window.localStorage.getItem("nexus.tweaks.accent"),
    );
    expect(bodyAccent, `body dataset for accent=${accent}`).toBe(accent);
    expect(storedAccent, `localStorage for accent=${accent}`).toBe(accent);

    // The active option button must reflect the selection via aria-pressed.
    const activeOption = page.getByTestId(`tweak-accent-${accent}`);
    await expect(activeOption).toHaveAttribute("aria-pressed", "true");
  }

  // The aria-live announcer must surface the latest change.
  const announcer = page.getByTestId("tweak-announcer");
  await expect(announcer).toHaveText(/Accent set to/);

  // Reset returns to defaults via the reset button.
  await page.getByTestId("tweak-reset").click();
  const afterReset = await page.evaluate(() => ({
    accent: document.body.dataset.accent,
    density: document.body.dataset.density,
    card: document.body.dataset.card,
    storedAccent: window.localStorage.getItem("nexus.tweaks.accent"),
  }));
  expect(afterReset.accent).toBe("primary");
  expect(afterReset.density).toBe("cozy");
  expect(afterReset.card).toBe("flat");
  expect(afterReset.storedAccent).toBe("primary");

  // Escape closes the panel and restores focus to the trigger.
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("tweak-panel")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("tweaks persist across reload via localStorage", async ({ page }) => {
  // Drive the UI to a non-default state, reload, assert the new tweaks
  // were rehydrated. This catches storage-key / dataset-key drift that
  // the 27-combo walk cannot.
  await page.getByRole("button", { name: "Tweak panel" }).click();
  await page.getByTestId("tweak-card-glass").click();
  await page.getByTestId("tweak-density-spacious").click();

  await page.reload({ waitUntil: "networkidle" });

  const after = await page.evaluate(() => ({
    card: document.body.dataset.card,
    density: document.body.dataset.density,
    storedCard: window.localStorage.getItem("nexus.tweaks.card"),
    storedDensity: window.localStorage.getItem("nexus.tweaks.density"),
  }));
  expect(after.card).toBe("glass");
  expect(after.density).toBe("spacious");
  expect(after.storedCard).toBe("glass");
  expect(after.storedDensity).toBe("spacious");
});
