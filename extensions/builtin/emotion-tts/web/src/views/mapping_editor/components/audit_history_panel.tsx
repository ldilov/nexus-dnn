/**
 * Spec 036 / US5 — read-only audit-log timeline beneath the audio-edit panel.
 *
 * Presentational; the parent owns fetching and refresh after Apply / Reset.
 * Renders a reverse-chronological list of edit-chain transitions: timestamp,
 * operation count, truncated chain digest, actor.
 */

import type { AuditEntry } from "../../../services/audio_edit_client";
import * as css from "./audit_history_panel.css";

export interface AuditHistoryPanelProps {
  entries: AuditEntry[];
  loading?: boolean;
  error?: string | null;
}

const DIGEST_PREFIX_CHARS = 8;

export function AuditHistoryPanel(props: AuditHistoryPanelProps): JSX.Element {
  const { entries, loading, error } = props;

  return (
    <div className={css.root} aria-busy={!!loading}>
      {error && (
        <div className={css.errorBanner} role="alert">
          {error}
        </div>
      )}
      {loading && !error && (
        <div className={css.loading} aria-live="polite">
          Loading edit history…
        </div>
      )}
      {!loading && !error && entries.length === 0 && (
        <div className={css.empty}>No edits yet</div>
      )}
      {!loading && !error && entries.length > 0 && (
        <ul className={css.list}>
          {entries.map((entry) => (
            <li key={entry.entry_id} className={css.row}>
              <span className={css.timestamp}>{formatTimestamp(entry.recorded_at)}</span>
              <span className={css.opCount}>
                {entry.operation_count === 0
                  ? "cleared"
                  : `${entry.operation_count} op${entry.operation_count === 1 ? "" : "s"}`}
              </span>
              <span className={css.digest} title={entry.digest_after}>
                {truncateDigest(entry.digest_after)}
              </span>
              <span className={css.actor}>{entry.actor}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function truncateDigest(digest: string): string {
  if (!digest) return "—";
  return `${digest.slice(0, DIGEST_PREFIX_CHARS)}…`;
}

function formatTimestamp(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleString();
}
