import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SWRConfig } from "swr";
import { RecipeCatalog } from "./recipe_catalog";
import type { Recipe } from "../api/client";

const apiClient = vi.hoisted(() => ({
  fetchRecipes: vi.fn(),
  fetchExtensions: vi.fn(),
  revealExtensionFolder: vi.fn(),
}));

vi.mock("../api/client", async () => {
  const actual = await vi.importActual<typeof import("../api/client")>("../api/client");
  return {
    ...actual,
    fetchRecipes: apiClient.fetchRecipes,
    fetchExtensions: apiClient.fetchExtensions,
    revealExtensionFolder: apiClient.revealExtensionFolder,
  };
});

function makeExt(id: string) {
  return {
    id,
    name: id,
    version: "1.0.0",
    description: null,
    publisher: null,
    runtime_family: "builtin",
    status: "active",
    source: "builtin",
    source_path: `extensions/builtin/${id}`,
    capabilities: [],
    recipe_count: 1,
    ui_contribution_count: 0,
    validation_errors: [],
    installed_at: "2026-04-14T00:00:00Z",
  };
}

function makeRecipe(id: string, overrides: Partial<Recipe> = {}): Recipe {
  return {
    id,
    version: "1.0.0",
    display_name: id,
    summary: `summary for ${id}`,
    category: "LLM",
    extension_id: "nexus.demo",
    extension_version: "1.0.0",
    workflow_template_ref: `workflows/${id}.yaml`,
    thumbnail: null,
    input_summary: null,
    bindings: [],
    created_at: "2026-04-14T00:00:00Z",
    workflow_id: null,
    workflow_version: null,
    status: "healthy",
    status_reason: null,
    ...overrides,
  };
}

function renderCatalog() {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <RecipeCatalog />
    </SWRConfig>,
  );
}

afterEach(cleanup);

describe("recipe catalog compat-status badge", () => {
  it("renders an Outdated badge for an outdated recipe", async () => {
    apiClient.fetchExtensions.mockResolvedValue([makeExt("nexus.demo")]);
    apiClient.fetchRecipes.mockResolvedValue([
      makeRecipe("r-out", { status: "outdated", display_name: "Out Of Date" }),
    ]);
    renderCatalog();
    await screen.findByText("Out Of Date");
    expect(screen.getByText("Outdated")).toBeTruthy();
  });

  it("renders a Broken badge for a broken recipe", async () => {
    apiClient.fetchExtensions.mockResolvedValue([makeExt("nexus.demo")]);
    apiClient.fetchRecipes.mockResolvedValue([
      makeRecipe("r-broke", { status: "broken", display_name: "Gone Bad" }),
    ]);
    renderCatalog();
    await screen.findByText("Gone Bad");
    expect(screen.getByText("Broken")).toBeTruthy();
  });

  it("does not flag a chat-id healthy recipe (badge derives from status only)", async () => {
    apiClient.fetchExtensions.mockResolvedValue([makeExt("nexus.demo")]);
    apiClient.fetchRecipes.mockResolvedValue([
      makeRecipe("chatbot", { status: "healthy", display_name: "Chat Bot" }),
    ]);
    renderCatalog();
    await screen.findByText("Chat Bot");
    expect(screen.queryByText("Outdated")).toBeNull();
    expect(screen.queryByText("Broken")).toBeNull();
  });
});
