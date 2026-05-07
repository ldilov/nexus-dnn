import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetIdb } from "./helper";
import { deleteDraft, getDraft, putDraft } from "../composer_drafts";

const dep = "deployment-1";

describe("composer_drafts IDB store", () => {
  beforeEach(async () => {
    await resetIdb();
  });
  afterEach(async () => {
    await resetIdb();
  });

  it("round-trips a non-empty draft", async () => {
    await putDraft({
      deploymentId: dep,
      threadId: "t-a",
      text: "hello world",
      updatedAt: 1_700_000_000,
    });
    const row = await getDraft(dep, "t-a");
    expect(row?.text).toBe("hello world");
    expect(row?.threadId).toBe("t-a");
  });

  it("returns null when no draft exists", async () => {
    const row = await getDraft(dep, "t-missing");
    expect(row).toBeNull();
  });

  it("deletes the row when an empty-text draft is put", async () => {
    await putDraft({
      deploymentId: dep,
      threadId: "t-a",
      text: "started typing",
      updatedAt: 1_700_000_000,
    });
    await putDraft({
      deploymentId: dep,
      threadId: "t-a",
      text: "",
      updatedAt: 1_700_000_001,
    });
    const row = await getDraft(dep, "t-a");
    expect(row).toBeNull();
  });

  it("isolates drafts per (deployment, thread)", async () => {
    await putDraft({
      deploymentId: dep,
      threadId: "t-a",
      text: "alpha",
      updatedAt: 1,
    });
    await putDraft({
      deploymentId: dep,
      threadId: "t-b",
      text: "beta",
      updatedAt: 1,
    });
    await putDraft({
      deploymentId: "other",
      threadId: "t-a",
      text: "gamma",
      updatedAt: 1,
    });
    expect((await getDraft(dep, "t-a"))?.text).toBe("alpha");
    expect((await getDraft(dep, "t-b"))?.text).toBe("beta");
    expect((await getDraft("other", "t-a"))?.text).toBe("gamma");
  });

  it("deleteDraft is a no-op when no draft exists", async () => {
    await deleteDraft(dep, "t-missing");
    const row = await getDraft(dep, "t-missing");
    expect(row).toBeNull();
  });
});
