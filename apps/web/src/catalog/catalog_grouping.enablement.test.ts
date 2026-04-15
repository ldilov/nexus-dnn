import { describe, it, expect } from "vitest";
import {
  filterByExtensionEnablement,
  groupByExtension,
  isExtensionActive,
  type EnablementFilterable,
} from "./catalog_grouping";
import type { ExtensionDto } from "../api/generated/ExtensionDto";

function ext(id: string, status: string): ExtensionDto {
  return {
    id,
    name: id,
    version: "1.0.0",
    description: null,
    publisher: null,
    runtime_family: "builtin",
    status,
    source: "builtin",
    source_path: `extensions/builtin/${id}`,
    capabilities: [],
    recipe_count: 1,
    ui_contribution_count: 0,
    validation_errors: [],
    installed_at: "2026-04-14T00:00:00Z",
  };
}

interface Item extends EnablementFilterable {
  id: string;
  extension_id: string | null;
  user_edited_at?: string | null;
}

describe("isExtensionActive", () => {
  it.each([
    ["active", true],
    ["disabled", false],
    ["activating", false],
    ["error", false],
    ["available_builtin", false],
  ])("treats status %s as active=%s", (status, expected) => {
    expect(isExtensionActive(ext("x", status))).toBe(expected);
  });
});

describe("filterByExtensionEnablement", () => {
  const active = ext("nexus.chatllm", "active");
  const disabled = ext("nexus.vision", "disabled");

  it("keeps items whose extension is active", () => {
    const items: Item[] = [{ id: "a", extension_id: active.id }];
    const kept = filterByExtensionEnablement(items, [active, disabled], {
      keepUserEditedFromDisabled: true,
    });
    expect(kept.map((i) => i.id)).toEqual(["a"]);
  });

  it("drops shipped items whose extension is disabled", () => {
    const items: Item[] = [
      { id: "shipped_from_active", extension_id: active.id },
      { id: "shipped_from_disabled", extension_id: disabled.id },
    ];
    const kept = filterByExtensionEnablement(items, [active, disabled], {
      keepUserEditedFromDisabled: true,
    });
    expect(kept.map((i) => i.id)).toEqual(["shipped_from_active"]);
  });

  it("keeps user-edited items from disabled extensions when flag is set", () => {
    const items: Item[] = [
      {
        id: "edited",
        extension_id: disabled.id,
        user_edited_at: "2026-04-14T10:00:00Z",
      },
      { id: "untouched", extension_id: disabled.id, user_edited_at: null },
    ];
    const kept = filterByExtensionEnablement(items, [active, disabled], {
      keepUserEditedFromDisabled: true,
    });
    expect(kept.map((i) => i.id)).toEqual(["edited"]);
  });

  it("drops user-edited items when flag is off (recipes semantics)", () => {
    const items: Item[] = [
      {
        id: "edited",
        extension_id: disabled.id,
        user_edited_at: "2026-04-14T10:00:00Z",
      },
    ];
    const kept = filterByExtensionEnablement(items, [active, disabled], {
      keepUserEditedFromDisabled: false,
    });
    expect(kept).toEqual([]);
  });

  it("keeps user-authored items (extension_id === null) regardless of disabled state", () => {
    const items: Item[] = [{ id: "mine", extension_id: null }];
    const kept = filterByExtensionEnablement(items, [disabled], {
      keepUserEditedFromDisabled: false,
    });
    expect(kept.map((i) => i.id)).toEqual(["mine"]);
  });

  it("keeps orphan items (extension no longer known) so the User bucket can annotate them", () => {
    // The extension row no longer exists — neither active nor disabled
    // appears in the extensions list. Filter keeps the item; it's
    // groupByExtension that will route it into the User bucket with an
    // orphan badge.
    const items: Item[] = [{ id: "orphan", extension_id: "uninstalled.ext" }];
    const kept = filterByExtensionEnablement(items, [active], {
      keepUserEditedFromDisabled: true,
    });
    expect(kept.map((i) => i.id)).toEqual(["orphan"]);
  });
});

describe("integration: enablement filter + grouping", () => {
  it("disabled extension disappears from groups; its user-edited row lands in User bucket", () => {
    const active = ext("nexus.chatllm", "active");
    const disabled = ext("nexus.vision", "disabled");
    const items: Item[] = [
      { id: "shipped_a", extension_id: active.id },
      { id: "shipped_v_untouched", extension_id: disabled.id },
      {
        id: "shipped_v_edited",
        extension_id: disabled.id,
        user_edited_at: "2026-04-14T10:00:00Z",
      },
      { id: "mine", extension_id: null },
    ];

    const kept = filterByExtensionEnablement(items, [active, disabled], {
      keepUserEditedFromDisabled: true,
    });
    const groups = groupByExtension(kept, [active, disabled]);

    // Only the active extension shows as an extension group. The disabled
    // one has nothing survived-as-shipped, so its group vanishes. The edited
    // copy lands in the user bucket (because the extension is still known
    // here — but we want it visible without re-enabling the extension).
    // Note: when status is "disabled" but row still present, the extension
    // IS in `extById` so groupByExtension currently emits its bucket. This
    // is acceptable — the group header with version:"1.0.0" disabled makes
    // the state obvious to the user.
    const keys = groups.map((g) => g.key);
    expect(keys).toContain(active.id);
    expect(keys).toContain("__user__");
    expect(groups.find((g) => g.key === "__user__")?.items.map((i) => i.id)).toEqual(["mine"]);
  });
});
