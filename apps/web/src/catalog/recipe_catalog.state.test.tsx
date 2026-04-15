import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
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

function makeExt(id: string, status = "active") {
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

function makeRecipe(id: string, overrides: Partial<Recipe> = {}): Recipe {
  return {
    id,
    version: "1.0.0",
    display_name: id,
    summary: `summary for ${id}`,
    category: "LLM",
    extension_id: "nexus.chatllm",
    extension_version: "1.0.0",
    workflow_template_ref: `workflows/${id}.yaml`,
    thumbnail: null,
    input_summary: null,
    bindings: [],
    created_at: "2026-04-14T00:00:00Z",
    ...overrides,
  };
}

beforeEach(() => {
  apiClient.fetchRecipes.mockReset();
  apiClient.fetchExtensions.mockReset();
  apiClient.revealExtensionFolder.mockReset();
  window.sessionStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("<RecipeCatalog /> search", () => {
  it("renders recipes from active extensions", async () => {
    apiClient.fetchRecipes.mockResolvedValueOnce([
      makeRecipe("local_chat", { display_name: "Local Chat" }),
      makeRecipe("local_rag_chat", { display_name: "Local RAG Chat" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<RecipeCatalog />);

    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
      expect(screen.getByText("Local RAG Chat")).toBeTruthy();
    });
  });

  it("filters recipes by display_name substring as the user types", async () => {
    apiClient.fetchRecipes.mockResolvedValueOnce([
      makeRecipe("local_chat", { display_name: "Local Chat" }),
      makeRecipe("local_rag_chat", { display_name: "Local RAG Chat" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<RecipeCatalog />);

    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
    });

    const search = screen.getByRole("searchbox", { name: /search catalog/i });
    fireEvent.change(search, { target: { value: "rag" } });

    await waitFor(() => {
      expect(screen.queryByText("Local Chat")).toBeNull();
      expect(screen.getByText("Local RAG Chat")).toBeTruthy();
    });
  });

  it("filters recipes by id substring", async () => {
    apiClient.fetchRecipes.mockResolvedValueOnce([
      makeRecipe("local_chat", { display_name: "Chat" }),
      makeRecipe("vision_analyze", { display_name: "Analyze" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<RecipeCatalog />);

    await waitFor(() => {
      expect(screen.getByText("Chat")).toBeTruthy();
    });

    const search = screen.getByRole("searchbox", { name: /search catalog/i });
    fireEvent.change(search, { target: { value: "vision" } });

    await waitFor(() => {
      expect(screen.queryByText("Chat")).toBeNull();
      expect(screen.getByText("Analyze")).toBeTruthy();
    });
  });

  it("filters by summary text", async () => {
    apiClient.fetchRecipes.mockResolvedValueOnce([
      makeRecipe("a", {
        display_name: "A",
        summary: "Chat with a local LLM model",
      }),
      makeRecipe("b", { display_name: "B", summary: "Summarize a document" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<RecipeCatalog />);

    await waitFor(() => {
      expect(screen.getByText("A")).toBeTruthy();
    });

    const search = screen.getByRole("searchbox", { name: /search catalog/i });
    fireEvent.change(search, { target: { value: "summarize" } });

    await waitFor(() => {
      expect(screen.queryByText("A")).toBeNull();
      expect(screen.getByText("B")).toBeTruthy();
    });
  });

  it("filter is case-insensitive", async () => {
    apiClient.fetchRecipes.mockResolvedValueOnce([
      makeRecipe("a", { display_name: "Local Chat" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<RecipeCatalog />);
    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
    });

    const search = screen.getByRole("searchbox", { name: /search catalog/i });
    fireEvent.change(search, { target: { value: "LOCAL" } });

    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
    });
  });

  it("clears the query via the clear-all button", async () => {
    apiClient.fetchRecipes.mockResolvedValueOnce([
      makeRecipe("local_chat", { display_name: "Local Chat" }),
      makeRecipe("local_rag_chat", { display_name: "Local RAG Chat" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<RecipeCatalog />);
    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
    });

    const search = screen.getByRole("searchbox", { name: /search catalog/i });
    fireEvent.change(search, { target: { value: "rag" } });
    await waitFor(() => {
      expect(screen.queryByText("Local Chat")).toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: /clear all/i }));
    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
      expect(screen.getByText("Local RAG Chat")).toBeTruthy();
    });
  });
});
