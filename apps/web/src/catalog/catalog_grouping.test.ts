import { describe, it, expect } from "vitest";
import { groupByExtension, orphanOf } from "./catalog_grouping";
import type { ExtensionDto } from "../api/generated/ExtensionDto";

function ext(id: string, name: string, version = "1.0.0"): ExtensionDto {
  return {
    id,
    name,
    version,
    description: null,
    publisher: null,
    runtime_family: "builtin",
    status: "enabled",
    source: "builtin",
    source_path: `extensions/builtin/${id}`,
    capabilities: [],
    recipe_count: 1,
    ui_contribution_count: 0,
    validation_errors: [],
    installed_at: "2026-04-14T00:00:00Z",
    registry_state: "not_registered",
  };
}

interface Item {
  id: string;
  extension_id: string | null;
}

describe("groupByExtension", () => {
  it("returns an empty array when there are no items", () => {
    expect(groupByExtension([], [])).toEqual([]);
  });

  it("groups items under their extension buckets in manifest order", () => {
    const items: Item[] = [
      { id: "a", extension_id: "ext.a" },
      { id: "b", extension_id: "ext.b" },
      { id: "c", extension_id: "ext.a" },
    ];
    const extensions = [ext("ext.a", "A"), ext("ext.b", "B")];
    const result = groupByExtension(items, extensions);
    expect(result.map((g) => g.key)).toEqual(["ext.a", "ext.b"]);
    const first = result[0];
    const second = result[1];
    if (!first || !second) throw new Error("expected two groups");
    expect(first.items.map((i) => i.id)).toEqual(["a", "c"]);
    expect(second.items.map((i) => i.id)).toEqual(["b"]);
  });

  it("emits a User Workflows bucket for items with no extension_id", () => {
    const items: Item[] = [
      { id: "custom1", extension_id: null },
      { id: "shipped", extension_id: "ext.a" },
    ];
    const extensions = [ext("ext.a", "A")];
    const result = groupByExtension(items, extensions);
    expect(result).toHaveLength(2);
    const [first, second] = result;
    if (!first || !second) throw new Error("expected two groups");
    expect(first.key).toBe("ext.a");
    expect(second.kind).toBe("user");
    expect(second.label).toBe("User Workflows");
    expect(second.items.map((i) => i.id)).toEqual(["custom1"]);
  });

  it("routes orphan-extension items into the User bucket with a missing-source annotation", () => {
    const items: Item[] = [
      { id: "orphan1", extension_id: "uninstalled.ext" },
      { id: "custom1", extension_id: null },
    ];
    const extensions = [ext("ext.a", "A")];
    const result = groupByExtension(items, extensions);
    expect(result).toHaveLength(1);
    const bucket = result[0];
    if (!bucket) throw new Error("expected a bucket");
    expect(bucket.kind).toBe("user");
    expect(bucket.items.map((i) => i.id).sort()).toEqual(["custom1", "orphan1"]);
    const orphan = bucket.items.find((i) => i.id === "orphan1");
    if (!orphan) throw new Error("expected orphan item");
    const annotation = orphanOf(orphan);
    expect(annotation).not.toBeNull();
    expect(annotation?.missingExtensionId).toBe("uninstalled.ext");
    const user = bucket.items.find((i) => i.id === "custom1");
    if (!user) throw new Error("expected user item");
    expect(orphanOf(user)).toBeNull();
  });

  it("suppresses extension groups that have zero items after filtering (caller-filtered)", () => {
    // Empty `items` means no group is emitted — callers filter before calling us.
    const extensions = [ext("ext.a", "A"), ext("ext.b", "B")];
    expect(groupByExtension([], extensions)).toEqual([]);
  });

  it("preserves extension manifest order even when items arrive out of order", () => {
    const items: Item[] = [
      { id: "b1", extension_id: "ext.b" },
      { id: "a1", extension_id: "ext.a" },
    ];
    const extensions = [ext("ext.a", "A"), ext("ext.b", "B")];
    const result = groupByExtension(items, extensions);
    expect(result.map((g) => g.key)).toEqual(["ext.a", "ext.b"]);
  });
});
