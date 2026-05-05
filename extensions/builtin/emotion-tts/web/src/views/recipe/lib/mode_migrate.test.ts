import { describe, expect, it } from "vitest";
import type { VectorPreset } from "../../../services/presets_client";
import { hasContentForMode, migrate } from "./mode_migrate";
import { newEmptyRow } from "./serialise_rows";

const happy: VectorPreset = {
  presetId: "p_happy",
  deploymentId: "d_1",
  presetName: "Happy",
  vector: [0.7, 0, 0, 0, 0, 0, 0, 0.3],
  createdAt: 0,
  updatedAt: 0,
};

describe("hasContentForMode", () => {
  it("quick is empty when script is whitespace", () => {
    expect(hasContentForMode("quick", { script: "  ", rows: [], storyText: "" })).toBe(false);
  });
  it("rows is empty when only the seed row with empty text", () => {
    expect(hasContentForMode("rows", { script: "", rows: [newEmptyRow()], storyText: "" })).toBe(false);
  });
  it("rows has content when any row has text", () => {
    const r = { ...newEmptyRow(), text: "hi" };
    expect(hasContentForMode("rows", { script: "", rows: [r], storyText: "" })).toBe(true);
  });
  it("story is empty when blank", () => {
    expect(hasContentForMode("story", { script: "", rows: [], storyText: "  " })).toBe(false);
  });
});

describe("migrate quick → rows", () => {
  it("splits non-empty lines into rows with empty character", () => {
    const result = migrate(
      "quick",
      "rows",
      { script: "hello\n\nworld\n", rows: [], storyText: "" },
      [],
    );
    expect(result?.rows?.length).toBe(2);
    expect(result?.rows?.[0]?.text).toBe("hello");
    expect(result?.rows?.[0]?.character).toBe("");
    expect(result?.rows?.[1]?.text).toBe("world");
  });
});

describe("migrate quick → story", () => {
  it("pastes script verbatim", () => {
    const result = migrate(
      "quick",
      "story",
      { script: "hello world", rows: [], storyText: "" },
      [],
    );
    expect(result?.storyText).toBe("hello world");
  });
});

describe("migrate rows → quick", () => {
  it("serialises rows back through the existing serialiser", () => {
    const rows = [
      { ...newEmptyRow(), character: "Bob", text: "hi" },
      { ...newEmptyRow(), character: "Alice", text: "there" },
    ];
    const result = migrate("rows", "quick", { script: "", rows, storyText: "" }, []);
    expect(result?.script?.split("\n")).toEqual(["[Bob] hi", "[Alice] there"]);
  });
});

describe("migrate rows → story", () => {
  it("emits @character and /preset commands", () => {
    const rows = [
      { ...newEmptyRow(), character: "Bob", presetId: "p_happy", text: "hi" },
      { ...newEmptyRow(), character: "Alice", text: "there" },
    ];
    const result = migrate("rows", "story", { script: "", rows, storyText: "" }, [happy]);
    expect(result?.storyText).toBe("@Bob /Happy hi\n@Alice there");
  });
  it("falls back to Narrator on blank character", () => {
    const rows = [{ ...newEmptyRow(), text: "untagged" }];
    const result = migrate("rows", "story", { script: "", rows, storyText: "" }, []);
    expect(result?.storyText).toBe("@Narrator untagged");
  });
});

describe("migrate story → quick", () => {
  it("pastes storyText verbatim", () => {
    const result = migrate(
      "story",
      "quick",
      { script: "", rows: [], storyText: "@bob hi" },
      [],
    );
    expect(result?.script).toBe("@bob hi");
  });
});

describe("migrate story → rows", () => {
  it("tokenises story commands into rows", () => {
    const result = migrate(
      "story",
      "rows",
      { script: "", rows: [], storyText: "@bob /happy hi @alice there" },
      [happy],
    );
    expect(result?.rows?.length).toBe(2);
    expect(result?.rows?.[0]?.character).toBe("bob");
    expect(result?.rows?.[0]?.presetId).toBe("p_happy");
    expect(result?.rows?.[0]?.text).toBe("hi");
    expect(result?.rows?.[1]?.character).toBe("alice");
    expect(result?.rows?.[1]?.presetId).toBeNull();
    expect(result?.rows?.[1]?.text).toBe("there");
  });
  it("untagged-leading text becomes Narrator row", () => {
    const result = migrate(
      "story",
      "rows",
      { script: "", rows: [], storyText: "narration first @bob hi" },
      [],
    );
    expect(result?.rows?.[0]?.character).toBe("Narrator");
    expect(result?.rows?.[0]?.text).toBe("narration first");
  });
  it("returns a single empty row when the story is just whitespace", () => {
    const result = migrate(
      "story",
      "rows",
      { script: "", rows: [], storyText: "   " },
      [],
    );
    expect(result?.rows?.length).toBe(1);
    expect(result?.rows?.[0]?.text).toBe("");
  });
});

describe("migrate same-mode is a no-op", () => {
  it("returns null", () => {
    expect(migrate("quick", "quick", { script: "x", rows: [], storyText: "" }, [])).toBeNull();
  });
});
