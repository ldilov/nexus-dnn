import { describe, it, expect, beforeEach } from "vitest";
import type { ControlsState } from "../catalog/catalog_controls";
import { matchesControls } from "./use_catalog_state";

function empty(): ControlsState {
  return { query: "", statusFilters: new Set(), extensionFilter: null };
}

interface Item {
  id: string;
  title?: string;
  display_name?: string;
  summary?: string;
  extension_id?: string | null;
  status?: "stable" | "modified" | "user" | null;
}

const lookup = (id: string) =>
  ({ "nexus.chatllm": "Local Chat", "nexus.vision": "Vision Toolkit" } as Record<string, string>)[id];

describe("matchesControls", () => {
  beforeEach(() => {
    // jsdom-backed sessionStorage resets between tests automatically
  });

  it("passes everything when controls are empty", () => {
    const item: Item = { id: "a", title: "Anything", extension_id: "nexus.chatllm" };
    expect(matchesControls(item, empty(), lookup)).toBe(true);
  });

  it("matches substring in title case-insensitively", () => {
    const item: Item = { id: "x", title: "Local Chat", extension_id: "nexus.chatllm" };
    const c: ControlsState = { ...empty(), query: "chat" };
    expect(matchesControls(item, c, lookup)).toBe(true);
  });

  it("matches against extension human name via lookup", () => {
    const item: Item = { id: "x", title: "Opaque", extension_id: "nexus.vision" };
    const c: ControlsState = { ...empty(), query: "vision" };
    expect(matchesControls(item, c, lookup)).toBe(true);
  });

  it("matches against id", () => {
    const item: Item = { id: "local_chat_basic", extension_id: null };
    const c: ControlsState = { ...empty(), query: "basic" };
    expect(matchesControls(item, c, lookup)).toBe(true);
  });

  it("matches against summary/description", () => {
    const item: Item = { id: "x", title: "X", summary: "Chat with a local model", extension_id: null };
    const c: ControlsState = { ...empty(), query: "local model" };
    expect(matchesControls(item, c, lookup)).toBe(true);
  });

  it("rejects items with no text hits", () => {
    const item: Item = { id: "abc", title: "Thing", extension_id: "nexus.chatllm" };
    const c: ControlsState = { ...empty(), query: "nonexistent" };
    expect(matchesControls(item, c, lookup)).toBe(false);
  });

  it("filters by extension id exactly", () => {
    const item: Item = { id: "x", title: "X", extension_id: "nexus.chatllm" };
    const c: ControlsState = { ...empty(), extensionFilter: "nexus.vision" };
    expect(matchesControls(item, c, lookup)).toBe(false);
  });

  it("filters by status membership", () => {
    const modified: Item = { id: "a", title: "A", extension_id: "x", status: "modified" };
    const stable: Item = { id: "b", title: "B", extension_id: "x", status: "stable" };
    const c: ControlsState = {
      ...empty(),
      statusFilters: new Set(["modified"] as const),
    };
    expect(matchesControls(modified, c, lookup)).toBe(true);
    expect(matchesControls(stable, c, lookup)).toBe(false);
  });

  it("composes query + status + extension filters (AND semantics)", () => {
    const item: Item = {
      id: "local_chat_basic",
      title: "Local Chat",
      extension_id: "nexus.chatllm",
      status: "modified",
    };
    const c: ControlsState = {
      query: "local",
      statusFilters: new Set(["modified"] as const),
      extensionFilter: "nexus.chatllm",
    };
    expect(matchesControls(item, c, lookup)).toBe(true);

    // Break any one filter and it must fail.
    expect(matchesControls(item, { ...c, extensionFilter: "other" }, lookup)).toBe(false);
    expect(matchesControls(item, { ...c, query: "no-match" }, lookup)).toBe(false);
    expect(
      matchesControls(item, { ...c, statusFilters: new Set(["stable"] as const) }, lookup),
    ).toBe(false);
  });
});
