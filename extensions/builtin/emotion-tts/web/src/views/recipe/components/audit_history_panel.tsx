import { useCallback, useEffect, useMemo, useState } from "react";
import * as css from "./audit_history_panel.css";
import { Button } from "../../../components/button";
import {
  fetchAuditLog,
  type AuditEntry,
} from "../../../services/audio_edit_client";

export type AuditTargetKind = "voice_asset" | "utterance";

export interface AuditTargetOption {
  kind: AuditTargetKind;
  id: string;
  label: string;
}

export interface AuditHistoryPanelProps {
  deploymentId: string;
  targets: readonly AuditTargetOption[];
  onRevertToIdentity?: (target: AuditTargetOption) => Promise<void> | void;
  onRevertToChain?: (
    target: AuditTargetOption,
    chainJson: string,
    entry: AuditEntry,
  ) => Promise<void> | void;
  emptyHint?: string;
}

export function AuditHistoryPanel({
  deploymentId,
  targets,
  onRevertToIdentity,
  onRevertToChain,
  emptyHint,
}: AuditHistoryPanelProps): JSX.Element {
  const [selectedKey, setSelectedKey] = useState<string>(() => keyOf(targets[0]));
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reverting, setReverting] = useState(false);
  const [rowRevertingId, setRowRevertingId] = useState<string | null>(null);

  const selected = useMemo(
    () => targets.find((t) => keyOf(t) === selectedKey) ?? targets[0],
    [targets, selectedKey],
  );

  useEffect(() => {
    if (!targets.length) return;
    if (!targets.some((t) => keyOf(t) === selectedKey)) {
      setSelectedKey(keyOf(targets[0]));
    }
  }, [targets, selectedKey]);

  useEffect(() => {
    if (!selected) {
      setEntries([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchAuditLog(deploymentId, selected.kind, selected.id, 50)
      .then((response) => {
        if (cancelled) return;
        setEntries(response.entries);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "audit fetch failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId, selected]);

  const handleExport = useCallback(() => {
    if (!selected) return;
    const payload = {
      deploymentId,
      targetKind: selected.kind,
      targetId: selected.id,
      targetLabel: selected.label,
      exportedAt: new Date().toISOString(),
      entries,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-${selected.kind}-${selected.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [deploymentId, entries, selected]);

  const handleRevert = useCallback(async () => {
    if (!selected || !onRevertToIdentity) return;
    if (
      !window.confirm(
        `Revert "${selected.label}" to identity (no edits)? This will write a new audit entry.`,
      )
    ) {
      return;
    }
    setReverting(true);
    try {
      await onRevertToIdentity(selected);
      const refreshed = await fetchAuditLog(deploymentId, selected.kind, selected.id, 50);
      setEntries(refreshed.entries);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "revert failed");
    } finally {
      setReverting(false);
    }
  }, [deploymentId, onRevertToIdentity, selected]);

  if (targets.length === 0) {
    return (
      <div className={css.root}>
        <p className={css.empty}>
          {emptyHint ??
            "Audit history surfaces here once a script is parsed and at least one cast member is mapped."}
        </p>
      </div>
    );
  }

  return (
    <div className={css.root}>
      <header className={css.headerRow}>
        <div className={css.targetSelector}>
          <label htmlFor="audit-target-select" className={css.actor}>
            Target
          </label>
          <select
            id="audit-target-select"
            className={css.select}
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
          >
            {targets.map((target) => (
              <option key={keyOf(target)} value={keyOf(target)}>
                {target.kind === "voice_asset" ? "Voice asset" : "Utterance"} · {target.label}
              </option>
            ))}
          </select>
        </div>
        <div className={css.actionRow}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            disabled={entries.length === 0 || loading}
          >
            Export JSON
          </Button>
          {onRevertToIdentity && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void handleRevert()}
              disabled={reverting || !selected}
            >
              {reverting ? "Reverting…" : "Revert to identity"}
            </Button>
          )}
        </div>
      </header>

      {error && <div className={css.errorBanner}>{error}</div>}

      {loading && !error && (
        <div className={css.loading} aria-live="polite">
          Loading edit history…
        </div>
      )}

      {!loading && !error && entries.length === 0 && (
        <p className={css.empty}>
          No edits recorded for this target yet.
          <br />
          <span className={css.emptyHint}>
            Apply a chain in the editor to populate the history.
          </span>
        </p>
      )}

      {!loading && !error && entries.length > 0 && (
        <ul className={css.list}>
          {entries.map((entry) => {
            const canRevert =
              onRevertToChain &&
              selected &&
              !!entry.chain_snapshot_json &&
              entry.operation_count > 0;
            return (
              <li key={entry.entry_id} className={css.row}>
                <span className={css.timestamp}>{formatTimestamp(entry.recorded_at)}</span>
                <span className={css.opCount}>
                  {entry.operation_count === 0
                    ? "cleared"
                    : `${entry.operation_count} ops`}
                </span>
                <span className={css.digest} title={entry.digest_after}>
                  {entry.digest_after.slice(0, 12)}…
                </span>
                <span className={css.actor}>{entry.actor || "—"}</span>
                <span
                  className={css.actionPill}
                  style={{
                    background: `color-mix(in oklab, ${
                      entry.operation_count === 0 ? "var(--error)" : "var(--accent)"
                    } 14%, transparent)`,
                    color:
                      entry.operation_count === 0 ? "var(--error)" : "var(--accent)",
                  }}
                >
                  {entry.digest_before === "" || !entry.digest_before
                    ? "create"
                    : entry.operation_count === 0
                      ? "clear"
                      : "update"}
                </span>
                {canRevert && (
                  <Button
                    variant="ghost"
                    size="xs"
                    disabled={reverting || rowRevertingId !== null}
                    onClick={async () => {
                      if (!selected || !entry.chain_snapshot_json) return;
                      if (rowRevertingId !== null || reverting) return;
                      if (
                        !window.confirm(
                          `Replay this ${entry.operation_count}-op chain on "${selected.label}"? A new audit entry will be written.`,
                        )
                      ) {
                        return;
                      }
                      setRowRevertingId(entry.entry_id);
                      try {
                        await onRevertToChain(selected, entry.chain_snapshot_json, entry);
                        const refreshed = await fetchAuditLog(
                          deploymentId,
                          selected.kind,
                          selected.id,
                          50,
                        );
                        setEntries(refreshed.entries);
                      } catch (err: unknown) {
                        setError(err instanceof Error ? err.message : "revert failed");
                      } finally {
                        setRowRevertingId(null);
                      }
                    }}
                  >
                    {rowRevertingId === entry.entry_id ? "Reverting…" : "Revert →"}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function keyOf(target: AuditTargetOption | undefined): string {
  if (!target) return "";
  return `${target.kind}:${target.id}`;
}

function formatTimestamp(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleString();
}
