import { describe, expect, it } from "vitest";
import type { DeploymentSummary, LayoutSummary } from "../../services/api_client";
import {
  buildSearchItems,
  filterSearchItems,
  groupSearchItems,
} from "./search_results";

function deployment(overrides: Partial<DeploymentSummary>): DeploymentSummary {
  return {
    id: "dep-1",
    slug: "my-deploy",
    display_name: "My Deploy",
    state: "live",
    restore_state: "",
    created_from_surface: "",
    current_revision_id: null,
    last_run_id: null,
    last_successful_run_id: null,
    last_failed_run_id: null,
    run_count: 0,
    is_archived: false,
    is_favorite: false,
    created_at: "",
    updated_at: "",
    ...overrides,
  };
}

function layout(overrides: Partial<LayoutSummary>): LayoutSummary {
  return {
    id: "nexus.video.svi2-pro",
    display_name: "SVI2 Pro",
    extension_id: "nexus.video.svi2-pro",
    placement: "main",
    is_default: true,
    ...overrides,
  };
}

describe("buildSearchItems", () => {
  it("maps deployments and extensions to routed items", () => {
    const items = buildSearchItems(
      [deployment({ id: "d1", display_name: "Render Farm" })],
      [layout({ id: "ext.a", display_name: "Editor" })],
    );
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      kind: "deployment",
      label: "Render Farm",
      to: "/deployments/d1",
      state: "live",
    });
    expect(items[1]).toMatchObject({
      kind: "extension",
      label: "Editor",
      to: "/extensions/ext.a",
    });
  });

  it("encodes ids with reserved characters in routes", () => {
    const items = buildSearchItems([], [layout({ id: "a/b id" })]);
    expect(items[0]!.to).toBe("/extensions/a%2Fb%20id");
  });

  it("excludes archived deployments", () => {
    const items = buildSearchItems(
      [deployment({ id: "d1", is_archived: true })],
      [],
    );
    expect(items).toHaveLength(0);
  });

  it("falls back to slug/id when display_name is empty", () => {
    const items = buildSearchItems(
      [deployment({ display_name: "", slug: "slug-only" })],
      [layout({ display_name: "", id: "id-only" })],
    );
    expect(items[0]!.label).toBe("slug-only");
    expect(items[1]!.label).toBe("id-only");
  });
});

describe("filterSearchItems", () => {
  const items = buildSearchItems(
    [
      deployment({ id: "d1", display_name: "Alpha Render", slug: "alpha" }),
      deployment({ id: "d2", display_name: "Beta Pipeline", slug: "beta" }),
    ],
    [layout({ id: "ext.svi", display_name: "SVI2 Pro", extension_id: "nexus.svi" })],
  );

  it("returns the full list for an empty query", () => {
    expect(filterSearchItems(items, "")).toHaveLength(3);
    expect(filterSearchItems(items, "   ")).toHaveLength(3);
  });

  it("is case-insensitive substring match on label", () => {
    const result = filterSearchItems(items, "render");
    expect(result.map((i) => i.label)).toEqual(["Alpha Render"]);
  });

  it("matches on the sublabel (slug / extension_id)", () => {
    expect(filterSearchItems(items, "nexus.svi").map((i) => i.label)).toEqual([
      "SVI2 Pro",
    ]);
  });

  it("ranks prefix matches above mid-string matches", () => {
    const local = buildSearchItems(
      [
        deployment({ id: "d1", display_name: "My Beta", slug: "x" }),
        deployment({ id: "d2", display_name: "Beta Thing", slug: "y" }),
      ],
      [],
    );
    const result = filterSearchItems(local, "beta");
    expect(result.map((i) => i.label)).toEqual(["Beta Thing", "My Beta"]);
  });
});

describe("groupSearchItems", () => {
  it("orders groups deployments-first and drops empty groups", () => {
    const items = buildSearchItems(
      [deployment({ id: "d1" })],
      [layout({ id: "e1" })],
    );
    const groups = groupSearchItems(items);
    expect(groups.map((g) => g.kind)).toEqual(["deployment", "extension"]);
  });

  it("omits a group with no items", () => {
    const groups = groupSearchItems(buildSearchItems([], [layout({ id: "e1" })]));
    expect(groups.map((g) => g.kind)).toEqual(["extension"]);
  });
});
