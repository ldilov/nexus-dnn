import { useCallback, useState } from "react";
import { Tabs } from "../../base/tabs";
import { rpc } from "../../../services/ipc_adapter";
import { HOST_CMD_SCHEMA_V1 } from "../../../services/run_events_types";
import type { LatticeCell } from "../../../services/derived/lattice_state";
import * as styles from "./inspector_drawer.css";

type InspectorTab = "tensor" | "kv" | "edit";

export interface InspectorDrawerProps {
  cell: LatticeCell;
  deploymentId: string | null;
  onClose: () => void;
  onPatchApplied?: (reloadRunId: string | undefined) => void;
}

function targetLabel(cell: LatticeCell): string {
  if (!cell.target) return "—";
  switch (cell.target.kind) {
    case "gpu":
      return `gpu:${cell.target.device}`;
    case "cpu":
      return "cpu";
    case "cpu_mmap":
      return "cpu (mmap)";
    case "pinned":
      return "pinned";
    case "mixed":
      return "mixed";
    default:
      return "—";
  }
}

function formatBytes(bytes: number | undefined): string {
  if (bytes === undefined) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KiB", "MiB", "GiB", "TiB"];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(v < 10 ? 2 : 1)} ${units[i]}`;
}

export function InspectorDrawer(props: InspectorDrawerProps) {
  const { cell, deploymentId, onClose, onPatchApplied } = props;
  const [activeTab, setActiveTab] = useState<InspectorTab>("tensor");
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isKvCell = cell.group === "kv_cache";

  const tabs: readonly { id: InspectorTab; label: string }[] = [
    { id: "tensor", label: "Tensor" },
    { id: "kv", label: "KV" },
    { id: "edit", label: "Edit" },
  ];

  const applyPatch = useCallback(
    async (patch: Record<string, unknown>) => {
      if (!deploymentId) {
        setErrorMsg("No deployment bound — cannot patch tuning.");
        return;
      }
      setBusy(true);
      setErrorMsg(null);
      setStatusMsg("applying...");
      try {
        const result = await rpc.runtimeTuning.patch({
          schema: HOST_CMD_SCHEMA_V1,
          deployment_id: deploymentId,
          patch,
          reload_after_apply: true,
        });
        setStatusMsg(
          result.reload_run_id
            ? `applied — reload run ${result.reload_run_id}`
            : "applied",
        );
        onPatchApplied?.(result.reload_run_id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "tuning patch failed";
        setErrorMsg(msg);
        setStatusMsg(null);
      } finally {
        setBusy(false);
      }
    },
    [deploymentId, onPatchApplied],
  );

  const moveToCpu = useCallback((): void => {
    if (cell.layer < 0) {
      setErrorMsg("aux cells cannot be re-targeted");
      return;
    }
    void applyPatch({
      layer_overrides: [{ layer: cell.layer, target: { kind: "cpu" } }],
    });
  }, [applyPatch, cell.layer]);

  const moveToGpu0 = useCallback((): void => {
    if (cell.layer < 0) {
      setErrorMsg("aux cells cannot be re-targeted");
      return;
    }
    void applyPatch({
      layer_overrides: [{ layer: cell.layer, target: { kind: "gpu", device: 0 } }],
    });
  }, [applyPatch, cell.layer]);

  return (
    <aside
      className={styles.drawer}
      role="dialog"
      aria-label={`Cell inspector for ${cell.group}@${cell.layer}`}
    >
      <header className={styles.header}>
        <span className={styles.title}>
          {cell.group} · L{cell.layer >= 0 ? cell.layer.toString().padStart(2, "0") : "AUX"}
        </span>
        <span className={styles.meta}>{cell.phase}</span>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close inspector">
          esc
        </button>
      </header>

      <Tabs
        items={tabs}
        activeId={activeTab}
        onSelect={setActiveTab}
        variant="segmented"
      />

      <div className={styles.body}>
        {activeTab === "tensor" ? (
          <>
            <FieldRow k="tensor" v={cell.tensorName ?? "—"} />
            <FieldRow k="dtype" v={cell.dtype ?? "—"} />
            <FieldRow k="bytes" v={formatBytes(cell.bytes)} />
            <FieldRow k="target" v={targetLabel(cell)} />
            <FieldRow k="device" v={cell.device ?? "—"} />
            <FieldRow k="offset" v={cell.ggufOffset !== undefined ? `0x${cell.ggufOffset.toString(16)}` : "—"} />
            {cell.errorReason ? (
              <FieldRow k="error" v={cell.errorReason} />
            ) : null}
          </>
        ) : null}

        {activeTab === "kv" ? (
          isKvCell ? (
            <>
              <FieldRow k="cache" v={`L${cell.layer >= 0 ? cell.layer : "AUX"} kv`} />
              <FieldRow k="bytes" v={formatBytes(cell.bytes)} />
              <FieldRow k="dtype" v={cell.dtype ?? "—"} />
              <FieldRow k="hit-rate" v="— (live counters arrive once inference begins)" />
              <FieldRow k="seq-count" v="—" />
            </>
          ) : (
            <p className={styles.status}>this cell is not part of the KV cache.</p>
          )
        ) : null}

        {activeTab === "edit" ? (
          <>
            <FieldRow k="layer" v={cell.layer >= 0 ? cell.layer.toString() : "aux"} />
            <FieldRow k="current" v={targetLabel(cell)} />
            <p className={styles.status}>
              moves the entire layer (all groups) to the chosen target and reloads the model.
            </p>
            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={moveToCpu}
                disabled={busy || cell.layer < 0 || cell.target?.kind === "cpu"}
              >
                Move to CPU
              </button>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.actionPrimary}`}
                onClick={moveToGpu0}
                disabled={
                  busy || cell.layer < 0 || (cell.target?.kind === "gpu" && cell.target.device === 0)
                }
              >
                Move to GPU 0
              </button>
            </div>
            {statusMsg ? <p className={styles.status}>{statusMsg}</p> : null}
            {errorMsg ? (
              <p className={`${styles.status} ${styles.statusError}`}>{errorMsg}</p>
            ) : null}
          </>
        ) : null}
      </div>
    </aside>
  );
}

function FieldRow({ k, v }: { k: string; v: string }) {
  return (
    <div className={styles.fieldRow}>
      <span className={styles.fieldKey}>{k}</span>
      <span className={styles.fieldValue}>{v}</span>
    </div>
  );
}
