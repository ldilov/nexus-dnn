/**
 * Spec 036 / US4 — ordered list of edit-chain operations.
 *
 * Pure presentational. Renders one row per op showing the mode label, a
 * compact parameter summary, and a Remove button. Empty state renders a
 * single muted line. The parent owns the chain state and the removal
 * callback (see FR-022).
 */

import type { EditChain, EditOp } from "../../../services/audio_edit_client";
import * as css from "./edit_chain_list.css";

export interface EditChainListProps {
  chain: EditChain;
  onRemoveOp: (opId: string) => void;
}

export function EditChainList({ chain, onRemoveOp }: EditChainListProps): JSX.Element {
  if (chain.ops.length === 0) {
    return (
      <div className={css.root} data-testid="edit-chain-list-empty">
        <span className={css.empty}>No edits yet</span>
      </div>
    );
  }

  return (
    <ol className={css.root} data-testid="edit-chain-list">
      {chain.ops.map((op, index) => (
        <li key={op.id} className={css.row}>
          <span className={css.positionBadge} aria-hidden="true">
            {index + 1}.
          </span>
          <span className={css.labelGroup}>
            <span className={css.modeLabel}>{modeLabel(op)}</span>
            <span className={css.params}>{paramsSummary(op)}</span>
          </span>
          <button
            type="button"
            className={css.removeButton}
            onClick={() => onRemoveOp(op.id)}
            aria-label={`Remove ${modeLabel(op)} (position ${index + 1})`}
            title="Remove operation"
          >
            ×
          </button>
        </li>
      ))}
    </ol>
  );
}

function modeLabel(op: EditOp): string {
  switch (op.mode) {
    case "trim":
      return "Trim";
    case "crop":
      return "Crop";
    case "normalize":
      return "Normalize";
    case "speed":
      return "Speed";
    case "fade_in":
      return "Fade in";
    case "fade_out":
      return "Fade out";
    case "mute":
      return "Mute";
  }
}

function paramsSummary(op: EditOp): string {
  switch (op.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${formatSeconds(op.start_ms)} → ${formatSeconds(op.end_ms)}`;
    case "normalize":
      return `${op.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `${op.factor.toFixed(2)}×`;
    case "fade_in":
      return `${op.duration_ms} ms in`;
    case "fade_out":
      return `${op.duration_ms} ms out`;
  }
}

function formatSeconds(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "0.00s";
  return `${(ms / 1000).toFixed(2)}s`;
}
