import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { RecipeUpgradeBanner } from "./RecipeUpgradeBanner";

const api = vi.hoisted(() => ({
  fetchRecipeUpgradePreview: vi.fn(),
  upgradeRecipe: vi.fn(),
  exportRecipeBundle: vi.fn(),
  importRecipeBundle: vi.fn(),
}));

vi.mock("../../api/client", async () => {
  const actual = await vi.importActual<typeof import("../../api/client")>("../../api/client");
  return { ...actual, ...api };
});

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

function renderBanner(recipeId = "r-1") {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <RecipeUpgradeBanner recipeId={recipeId} />
    </SWRConfig>,
  );
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("RecipeUpgradeBanner", () => {
  it("leads with the risk summary and lists broken bindings for a breaking upgrade", async () => {
    api.fetchRecipeUpgradePreview.mockResolvedValue({
      pinned_version: "v1",
      current_version: "v2",
      is_outdated: true,
      changed_nodes: [],
      broken_bindings: [
        { control_id: "speed", target: "input:speed", reason: "input port no longer declared" },
      ],
      risk: "breaking",
      summary: "broken",
    });

    renderBanner();

    expect(await screen.findByText("Breaking")).toBeTruthy();
    expect(screen.getByText(/input:speed/)).toBeTruthy();

    api.upgradeRecipe.mockResolvedValue({ new_recipe_id: null, broken_bindings: [] });
    fireEvent.click(screen.getByRole("button", { name: /Upgrade \(create a copy\)/i }));
    await waitFor(() => expect(api.upgradeRecipe).toHaveBeenCalledWith("r-1"));
  });

  it("renders nothing when the recipe is safe (pinned == current)", async () => {
    api.fetchRecipeUpgradePreview.mockResolvedValue({
      pinned_version: "v1",
      current_version: "v1",
      is_outdated: false,
      changed_nodes: [],
      broken_bindings: [],
      risk: "safe",
      summary: "healthy",
    });

    const { container } = renderBanner();
    await waitFor(() => expect(api.fetchRecipeUpgradePreview).toHaveBeenCalled());
    expect(container.textContent).toBe("");
  });
});
