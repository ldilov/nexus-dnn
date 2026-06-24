import { useState, type ReactElement } from "react";
import useSWR from "swr";
import { fetchWorkflowVersion } from "../../api/client";
import { GraphView } from "../workflows/components/canvas/graph_view";
import type { WorkflowVersionDto } from "../../api/generated/WorkflowVersionDto";
import type { Workflow } from "../../api/client";
import * as styles from "./recipe_form.css";

export interface RecipePinnedGraphProps {
  workflowId: string;
  workflowVersion: string;
}

/**
 * Fetches and renders the FROZEN pinned workflow snapshot in read-only GraphView.
 * Guarded by a disclosure toggle — only loaded when the user expands it.
 * Generic by (workflowId, workflowVersion) — no extension-id knowledge.
 * P8 may reuse this component directly; keep it self-contained.
 */
export function RecipePinnedGraph({
  workflowId,
  workflowVersion,
}: RecipePinnedGraphProps): ReactElement {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useSWR(
    open ? ["workflow-version", workflowId, workflowVersion] : null,
    () => fetchWorkflowVersion(workflowId, workflowVersion),
  );

  /** Map the immutable WorkflowVersionDto into the Workflow shape GraphView expects. */
  const workflow: Workflow | null = data ? versionDtoToWorkflow(data) : null;

  return (
    <div className={styles.pinnedGraphRoot}>
      <button
        type="button"
        className={styles.pinnedGraphToggle}
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
      >
        {open ? "▲ Hide pinned graph" : "▼ View pinned graph"}
        <span aria-hidden="true"> (v{workflowVersion})</span>
      </button>

      {open && (
        <div className={styles.graphContainer}>
          {isLoading && <span style={{ padding: "1rem", display: "block" }}>Loading pinned graph…</span>}
          {error && (
            <span style={{ padding: "1rem", display: "block", color: "var(--color-error)" }}>
              Failed to load pinned graph.
            </span>
          )}
          {workflow && (
            <GraphView
              workflow={workflow}
              nodeProgress={{}}
              runId={null}
            />
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Converts a WorkflowVersionDto (append-only frozen record) into the mutable
 * Workflow shape GraphView consumes. The version DTO has a flat `nodes` array
 * and `stages` as `WorkflowStageDefDto[]` (id+label only), so we reconstruct
 * the full stage→nodes grouping. Rendered read-only (no onWorkflowSaved).
 */
function versionDtoToWorkflow(dto: WorkflowVersionDto): Workflow {
  // Group flat nodes into their stage buckets, matching WorkflowStageDto shape.
  const stageMap = new Map<string, { id: string; name: string; label: string; nodes: typeof dto.nodes }>();

  for (const stageDef of dto.stages) {
    stageMap.set(stageDef.id, {
      id: stageDef.id,
      name: stageDef.label,
      label: stageDef.label,
      nodes: [],
    });
  }

  for (const node of dto.nodes) {
    const stageId = node.stage ?? "__default__";
    if (!stageMap.has(stageId)) {
      stageMap.set(stageId, { id: stageId, name: stageId, label: stageId, nodes: [] });
    }
    stageMap.get(stageId)!.nodes.push(node);
  }

  const stages = Array.from(stageMap.values());

  return {
    id: dto.workflow_id,
    title: dto.label ?? dto.version,
    name: dto.label ?? dto.version,
    version: dto.version,
    inputs: dto.inputs,
    outputs: dto.outputs,
    nodes: dto.nodes,
    edges: dto.edges,
    stages,
    created_at: dto.created_at,
    updated_at: dto.created_at,
    user_edited_at: null,
    extension_id: dto.extension_id,
    extension_version: dto.extension_version,
    extension_version_first_seen: null,
    status: "stable",
    node_count: dto.nodes.length,
    stage_count: stages.length,
  } as unknown as Workflow;
}
