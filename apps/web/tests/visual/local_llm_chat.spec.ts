import { test, expect, type Page } from "@playwright/test";

// Spec 037 — T059: Visual baseline for the Local LLM chat anchor route
// (`/#/extensions/nexus.local-llm/chat/<threadId>`).
//
// Skip-on-no-data so the spec is safe in CI environments without a seeded
// host backend; the targeted anchor-route screenshot only fires when the
// thread list endpoint returns at least one thread.

const PROBE = "/api/v1/extensions/nexus.local-llm/chat/threads";

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

async function firstThreadId(page: Page): Promise<string | null> {
  try {
    const res = await page.request.get(PROBE);
    if (!res.ok()) return null;
    const body = (await res.json()) as {
      data?: { threads?: Array<{ thread_id?: string; threadId?: string }> };
      threads?: Array<{ thread_id?: string; threadId?: string }>;
    };
    const threads = body.data?.threads ?? body.threads ?? [];
    const first = threads[0];
    if (!first) return null;
    return first.thread_id ?? first.threadId ?? null;
  } catch {
    return null;
  }
}

test("visual: Local LLM chat anchor route at chat baseline", async ({ page }, testInfo) => {
  const viewportName = testInfo.project.name.replace("visual-", "");
  const viewportWidth = Number(viewportName);
  test.skip(viewportWidth !== 1440, "anchor visual baseline runs only at 1440px");

  await applyBaseline(page);
  const threadId = await firstThreadId(page);
  test.skip(!threadId, "host API unreachable or no Local LLM threads seeded");

  await page.goto(`/#/extensions/nexus.local-llm/chat/${threadId}`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(250);

  await expect(page).toHaveScreenshot(`local_llm_chat-1440.png`, {
    fullPage: true,
  });
});
