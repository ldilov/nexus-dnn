import { useMemo, useState } from "react";
import useSWR from "swr";
import {
  fetchExtensions,
  fetchWorkflows,
  revealExtensionFolder,
  type Extension,
  type Workflow,
} from "../../../api/client";
import { CatalogShell } from "../../../catalog/catalog_shell";
import { CatalogControls, type StatusKey } from "../../../catalog/catalog_controls";
import {
  filterByExtensionEnablement,
  groupByExtension,
  orphanOf,
  type CatalogGroup,
  type Groupable,
  type WithOrphan,
} from "../../../catalog/catalog_grouping";
import { matchesControls, useCatalogState } from "../../../hooks/use_catalog_state";
import * as sharedStyles from "../../../catalog/catalog.css";
import * as styles from "../../../catalog/recipe_catalog.css";
import * as shellStyles from "../../../catalog/catalog_shell.css";
import * as local from "./workflow_catalog.css";

type WorkflowItem = Workflow & Groupable;

export interface WorkflowCatalogProps {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  resumeWorkflow?: Workflow | null;
  onResume?: () => void;
}

const ALL_STATUS_FILTERS: StatusKey[] = ["stable", "modified", "user"];

const EMPTY_WORKFLOWS: WorkflowItem[] = [];
const EMPTY_EXTENSIONS: Extension[] = [];

export function WorkflowCatalog({
  selectedId,
  onSelect,
  resumeWorkflow,
  onResume,
}: WorkflowCatalogProps) {
  const [revealNotice, setRevealNotice] = useState<string | null>(null);
  const { state: controls, setState: setControls } = useCatalogState("workflows");

  const { data: workflows = EMPTY_WORKFLOWS, error: workflowsError } = useSWR<WorkflowItem[]>(
    "catalog:workflows",
    () => fetchWorkflows().then((w) => w as WorkflowItem[]),
  );
  const { data: extensions = EMPTY_EXTENSIONS, error: extensionsError } = useSWR<Extension[]>(
    "catalog:extensions",
    () => fetchExtensions(),
  );
  const loadError = workflowsError ?? extensionsError;
  const error = loadError
    ? loadError instanceof Error
      ? loadError.message
      : "Failed to load workflows"
    : null;

  const extNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const ext of extensions) {
      map.set(ext.id, ext.name ?? ext.id);
    }
    return map;
  }, [extensions]);

  const enabled = useMemo(
    () =>
      filterByExtensionEnablement(workflows, extensions, {
        keepUserEditedFromDisabled: true,
      }),
    [workflows, extensions],
  );

  const visible = useMemo(
    () =>
      enabled.filter((wf) =>
        matchesControls(wf, controls, (extId) => extNameById.get(extId)),
      ),
    [enabled, controls, extNameById],
  );

  const groups = useMemo(
    () => groupByExtension(visible, extensions),
    [visible, extensions],
  );

  const handleReveal = async (extensionId: string) => {
    try {
      const result = await revealExtensionFolder(extensionId);
      if (!result.revealed && result.path) {
        await navigator.clipboard?.writeText(result.path);
        setRevealNotice(`Path copied to clipboard: ${result.path}`);
      } else {
        setRevealNotice(`Revealed ${extensionId} in file manager`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not open extension folder";
      setRevealNotice(msg);
    }
    window.setTimeout(() => setRevealNotice(null), 4000);
  };

  if (error) return <p className={sharedStyles.errorState}>{error}</p>;

  const anyControlsActive =
    controls.query.length > 0 ||
    controls.statusFilters.size > 0 ||
    controls.extensionFilter !== null;

  return (
    <div>
      <CatalogControls
        state={controls}
        onChange={setControls}
        availableExtensions={extensions}
        availableStatuses={ALL_STATUS_FILTERS}
        placeholder="Search workflows by name, id, or extension…"
        resultCount={visible.length}
        totalCount={enabled.length}
      />
      {resumeWorkflow && onResume ? (
        <div className={`${shellStyles.bannerInfo} ${local.bannerSpaced}`}>
          <button
            type="button"
            onClick={onResume}
            className={`${shellStyles.revealButton} ${local.iconSpaced}`}
          >
            <span
              className={`material-symbols-outlined ${local.iconSm}`}
              aria-hidden="true"
            >
              arrow_forward
            </span>
            Resume
          </button>
          Continue editing <strong>{resumeWorkflow.title ?? resumeWorkflow.id}</strong>
        </div>
      ) : null}
      {revealNotice ? (
        <div className={`${shellStyles.bannerInfo} ${local.bannerSpaced}`}>
          {revealNotice}
        </div>
      ) : null}
      <CatalogShell<WithOrphan<WorkflowItem>>
        groups={groups}
        gridClassName={styles.grid}
        emptyTitle={
          anyControlsActive
            ? `No workflows match "${controls.query}"`
            : "No workflows available"
        }
        emptyHint={
          anyControlsActive
            ? "Clear your search or filters to see every workflow."
            : "Install an extension that ships a workflow, or create your own."
        }
        renderGroupAction={(group) => {
          if (group.kind !== "extension" || !group.extension) return null;
          const extId = group.extension.id;
          return (
            <button
              type="button"
              className={shellStyles.revealButton}
              onClick={() => handleReveal(extId)}
              title="Open extension folder"
            >
              <span
                className={`material-symbols-outlined ${local.iconSm}`}
                aria-hidden="true"
              >
                folder_open
              </span>
              Folder
            </button>
          );
        }}
        renderCard={(wf) => (
          <WorkflowCard
            key={wf.id}
            workflow={wf}
            selected={selectedId === wf.id}
            onSelect={() => onSelect?.(wf.id)}
          />
        )}
      />
    </div>
  );
}

function WorkflowCard({
  workflow,
  selected,
  onSelect,
}: {
  workflow: WithOrphan<WorkflowItem>;
  selected: boolean;
  onSelect: () => void;
}) {
  const label = workflow.title ?? workflow.name ?? workflow.id;
  const cls = [styles.card, selected ? styles.cardFeatured : ""].filter(Boolean).join(" ");
  const statusLabel = (workflow.status ?? "user") as StatusKey;
  const nodeCount = workflow.node_count ?? workflow.nodes?.length ?? 0;
  const stageCount = workflow.stage_count ?? workflow.stages?.length ?? 0;
  const orphan = orphanOf(workflow);
  return (
    <button key={workflow.id} type="button" className={cls} onClick={onSelect}>
      <div className={styles.topRow}>
        <div className={styles.iconBox}>
          <span className={`material-symbols-outlined ${local.iconCard}`}>
            account_tree
          </span>
        </div>
        <span className={styles.categoryBadge}>
          {statusLabel === "modified"
            ? "Modified"
            : statusLabel === "user"
              ? "User"
              : "Stable"}
        </span>
      </div>
      <div className={styles.title}>{label}</div>
      <div className={styles.summary}>{workflow.id}</div>
      {orphan ? (
        <div
          className={`${styles.summary} ${local.warningBadge}`}
          title={`Originally shipped by extension "${orphan.missingExtensionId}" which is no longer installed`}
        >
          ⚠ missing source: {orphan.missingExtensionId}
        </div>
      ) : null}
      <div className={styles.footer}>
        <span className={styles.workflowRef}>
          v{workflow.version ?? "?"} · {nodeCount} node{nodeCount === 1 ? "" : "s"} ·{" "}
          {stageCount} stage{stageCount === 1 ? "" : "s"}
        </span>
        <span className={styles.openHint}>
          {selected ? "Selected" : "Open"}
          <span className={`material-symbols-outlined ${local.iconSm}`}>
            arrow_forward
          </span>
        </span>
      </div>
    </button>
  );
}

export type { CatalogGroup };
