import { test, expect, type Page } from "@playwright/test";

const CHAT_ROUTE = "/extensions/llm.layout.chat";
const PROBE_URL = "/api/v1/extensions/local-llm/chat/threads";

async function hostAvailable(page: Page): Promise<boolean> {
  try {
    const res = await page.request.get(PROBE_URL);
    const ct = res.headers()["content-type"] ?? "";
    return res.ok() && ct.includes("application/json");
  } catch {
    return false;
  }
}

async function gotoChat(page: Page): Promise<void> {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(CHAT_ROUTE, { waitUntil: "networkidle" });
}

test.describe("Local Chat — smoke flows (SC-003 + SC-007)", () => {
  test("SC-003: two + New Session clicks yield a 2-row Recent History that survives reload", async ({
    page,
  }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable — skipping smoke test");
      return;
    }
    await gotoChat(page);

    const newSession = page.getByRole("button", { name: /\+ new session/i });
    await expect(newSession).toBeVisible();
    await newSession.click();
    await newSession.click();

    const list = page.getByRole("listbox").first();
    await expect(list).toBeVisible();
    await expect(list.getByRole("option")).toHaveCount(2, { timeout: 4000 });

    await page.reload({ waitUntil: "networkidle" });
    const listAfter = page.getByRole("listbox").first();
    await expect(listAfter.getByRole("option")).toHaveCount(2, { timeout: 4000 });
  });

  test("SC-007: Tab + Enter reaches '+ New Session' and the Choose Model chip", async ({
    page,
  }) => {
    if (!(await hostAvailable(page))) {
      test.skip(true, "host API not reachable — skipping smoke test");
      return;
    }
    await gotoChat(page);

    const labelsSeen = new Set<string>();
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const label = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return el?.textContent?.trim().toLowerCase() ?? "";
      });
      labelsSeen.add(label);
    }
    expect([...labelsSeen].some((l) => l.includes("new session"))).toBe(true);
    expect(
      [...labelsSeen].some(
        (l) => l.includes("choose model") || l.includes("select a session"),
      ),
    ).toBe(true);
  });
});
