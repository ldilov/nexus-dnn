import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WorkflowCatalog } from "./workflow_catalog";
import type { Workflow } from "../../../api/client";

const apiClient = vi.hoisted(() => ({
  fetchWorkflows: vi.fn(),
  fetchExtensions: vi.fn(),
  revealExtensionFolder: vi.fn(),
}));

vi.mock("../../../api/client", async () => {
  const actual = await vi.importActual<typeof import("../../../api/client")>("../../../api/client");
  return {
    ...actual,
    fetchWorkflows: apiClient.fetchWorkflows,
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

function makeWorkflow(
  id: string,
  overrides: Partial<Workflow> = {},
): Workflow {
  return {
    id,
    title: id,
    name: id,
    version: "1.0.0",
    inputs: [],
    outputs: [],
    nodes: [],
    edges: [],
    stages: [],
    created_at: "2026-04-14T00:00:00Z",
    updated_at: "2026-04-14T00:00:00Z",
    user_edited_at: null,
    extension_id: "nexus.chatllm",
    extension_version: "1.0.0",
    extension_version_first_seen: "2026-04-14T00:00:00Z",
    status: "stable",
    node_count: 0,
    stage_count: 0,
    ...overrides,
  };
}

beforeEach(() => {
  apiClient.fetchWorkflows.mockReset();
  apiClient.fetchExtensions.mockReset();
  apiClient.revealExtensionFolder.mockReset();
  window.sessionStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("<WorkflowCatalog /> state", () => {
  it("renders an extension group for active extensions", async () => {
    apiClient.fetchWorkflows.mockResolvedValueOnce([
      makeWorkflow("local_chat_basic", { title: "Local Chat" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<WorkflowCatalog />);

    await waitFor(() => {
      expect(screen.getByText(/Local Chat/i)).toBeTruthy();
    });
    // Extension header is rendered with the extension name + version chip
    expect(screen.getAllByText("nexus.chatllm")[0]).toBeTruthy();
  });

  it("hides workflows whose contributing extension is disabled", async () => {
    apiClient.fetchWorkflows.mockResolvedValueOnce([
      makeWorkflow("from_active", { title: "From Active" }),
      makeWorkflow("from_disabled", {
        title: "From Disabled",
        extension_id: "nexus.vision",
        extension_version: "1.0.0",
      }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([
      makeExt("nexus.chatllm", "active"),
      makeExt("nexus.vision", "disabled"),
    ]);

    render(<WorkflowCatalog />);

    await waitFor(() => {
      expect(screen.getByText("From Active")).toBeTruthy();
    });
    expect(screen.queryByText("From Disabled")).toBeNull();
  });

  it("keeps user-edited workflows from a disabled extension", async () => {
    apiClient.fetchWorkflows.mockResolvedValueOnce([
      makeWorkflow("from_disabled_edited", {
        title: "Edited Copy",
        extension_id: "nexus.vision",
        extension_version: "1.0.0",
        user_edited_at: "2026-04-14T10:00:00Z",
        status: "modified",
      }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([
      makeExt("nexus.vision", "disabled"),
    ]);

    render(<WorkflowCatalog />);

    await waitFor(() => {
      expect(screen.getByText("Edited Copy")).toBeTruthy();
    });
  });

  it("filters by search query across title, id, and extension name", async () => {
    apiClient.fetchWorkflows.mockResolvedValueOnce([
      makeWorkflow("local_chat_basic", { title: "Local Chat" }),
      makeWorkflow("rag_workflow", { title: "Retrieval Augmented" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    render(<WorkflowCatalog />);

    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
      expect(screen.getByText("Retrieval Augmented")).toBeTruthy();
    });

    const search = screen.getByRole("searchbox", { name: /search catalog/i });
    fireEvent.change(search, { target: { value: "retrieval" } });

    await waitFor(() => {
      expect(screen.queryByText("Local Chat")).toBeNull();
      expect(screen.getByText("Retrieval Augmented")).toBeTruthy();
    });
  });

  it("renders a Resume banner when a workflow is currently loaded", async () => {
    apiClient.fetchWorkflows.mockResolvedValueOnce([makeWorkflow("local_chat_basic")]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    const resume = makeWorkflow("local_chat_basic", { title: "Local Chat" });
    const onResume = vi.fn();

    render(<WorkflowCatalog resumeWorkflow={resume} onResume={onResume} />);

    await waitFor(() => {
      expect(screen.getByText(/Continue editing/i)).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: /resume/i }));
    expect(onResume).toHaveBeenCalledTimes(1);
  });

  it("invokes onSelect with the workflow id on card click", async () => {
    apiClient.fetchWorkflows.mockResolvedValueOnce([
      makeWorkflow("local_chat_basic", { title: "Local Chat" }),
    ]);
    apiClient.fetchExtensions.mockResolvedValueOnce([makeExt("nexus.chatllm")]);

    const onSelect = vi.fn();
    render(<WorkflowCatalog onSelect={onSelect} />);

    await waitFor(() => {
      expect(screen.getByText("Local Chat")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Local Chat"));
    expect(onSelect).toHaveBeenCalledWith("local_chat_basic");
  });

  it("renders a grouped empty state when the API returns nothing", async () => {
    apiClient.fetchWorkflows.mockResolvedValueOnce([]);
    apiClient.fetchExtensions.mockResolvedValueOnce([]);

    render(<WorkflowCatalog />);

    await waitFor(() => {
      expect(screen.getByText(/no workflows available/i)).toBeTruthy();
    });
  });
});
