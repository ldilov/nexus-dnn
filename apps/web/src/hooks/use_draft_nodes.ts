import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Workflow } from "../api/client";
import type { OperatorSpecMap } from "./use_operator_specs";

export type NodeMode = "draft" | "live";

export interface DraftNodeState {
  isDraft(nodeId: string): boolean;
  markDraft(nodeId: string): void;
  promote(nodeId: string): void;
  draftIds(): ReadonlySet<string>;
  clear(): void;
}

/**
 * Spec 020 US4 — per-workflow `draft | live` flag.
 *
 * Newly dropped operator nodes start as `draft`. They auto-promote to `live`
 * when every `required: true` input port has at least one incoming edge, or
 * when the user explicitly calls `promote()`. A `live` node never demotes —
 * once validated, it stays validated even if an edge is later removed
 * (FR-Q4-03 — the workflow was functional before the deletion, so the
 * missing edge is a real error, not an incomplete drop).
 *
 * State is frontend-only and clears on workflow switch.
 */
export function useDraftNodes(workflowId: string | null | undefined): DraftNodeState {
  const [modes, setModes] = useState<ReadonlyMap<string, NodeMode>>(new Map());
  const ref = useRef(modes);
  ref.current = modes;

  useEffect(() => {
    setModes(new Map());
  }, [workflowId]);

  const isDraft = useCallback((nodeId: string) => ref.current.get(nodeId) === "draft", []);

  const markDraft = useCallback((nodeId: string) => {
    setModes((prev) => {
      if (prev.get(nodeId) === "draft") return prev;
      const next = new Map(prev);
      next.set(nodeId, "draft");
      return next;
    });
  }, []);

  const promote = useCallback((nodeId: string) => {
    setModes((prev) => {
      const current = prev.get(nodeId);
      if (current !== "draft") return prev;
      const next = new Map(prev);
      next.set(nodeId, "live");
      return next;
    });
  }, []);

  const draftIds = useCallback((): ReadonlySet<string> => {
    const out = new Set<string>();
    for (const [id, mode] of ref.current) {
      if (mode === "draft") out.add(id);
    }
    return out;
  }, []);

  const clear = useCallback(() => setModes(new Map()), []);

  return useMemo(
    () => ({ isDraft, markDraft, promote, draftIds, clear }),
    [isDraft, markDraft, promote, draftIds, clear],
  );
}

/**
 * Returns the ids of draft nodes whose `required: true` input ports are all
 * wired in the current workflow state. Caller iterates and fires
 * `promote(id)` for each — pure function, no React state.
 */
export function computePromotions(
  workflow: Workflow,
  specs: OperatorSpecMap,
  draftIds: ReadonlySet<string>,
): string[] {
  if (draftIds.size === 0) return [];
  const promotions: string[] = [];

  const incomingByNode = new Map<string, Set<string>>();
  for (const e of workflow.edges ?? []) {
    const target = e.target_node;
    if (!target) continue;
    let set = incomingByNode.get(target);
    if (!set) {
      set = new Set();
      incomingByNode.set(target, set);
    }
    set.add(e.target_port);
  }

  for (const stage of workflow.stages ?? []) {
    for (const node of stage.nodes) {
      if (!draftIds.has(node.id)) continue;
      const spec = specs.get(node.operator);
      if (!spec) continue;
      const requiredPorts = spec.inputs
        .filter((p) => p.required === true)
        .map((p) => p.name);
      if (requiredPorts.length === 0) {
        promotions.push(node.id);
        continue;
      }
      const incoming = incomingByNode.get(node.id) ?? new Set<string>();
      const literalsProvided = new Set<string>(
        Object.entries(node.inputs)
          .filter(([, v]) => v && !(v as { from?: unknown }).from)
          .map(([name]) => name),
      );
      const allWired = requiredPorts.every(
        (p) => incoming.has(p) || literalsProvided.has(p),
      );
      if (allWired) promotions.push(node.id);
    }
  }

  return promotions;
}
