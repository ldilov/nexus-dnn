import type { EditChain, EditOp } from "../../../services/audio_edit_client";
import * as css from "./edit_chain_list.css";
import { Button } from "../../../components/button";

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
          <Button
            variant="ghost"
            size="xs"
            iconOnly
            onClick={() => onRemoveOp(op.id)}
            aria-label={`Remove ${modeLabel(op)} (position ${index + 1})`}
            title="Remove operation"
          >
            ×
          </Button>
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
    case "gain":
      return "Volume";
    case "eq3":
      return "EQ";
    case "pitch_shift":
      return "Pitch";
    case "silence_strip":
      return "Silence trim";
    default: {
      const exhaustive: never = op;
      void exhaustive;
      return "Op";
    }
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
    case "gain":
      return `${op.gain_db >= 0 ? "+" : ""}${op.gain_db.toFixed(1)} dB`;
    case "eq3":
      return `${formatBand(op.low_db)} / ${formatBand(op.mid_db)} / ${formatBand(op.high_db)}`;
    case "pitch_shift":
      return `${op.semitones >= 0 ? "+" : ""}${op.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${op.threshold_db.toFixed(0)} dB`;
    default: {
      const exhaustive: never = op;
      void exhaustive;
      return "—";
    }
  }
}

function formatBand(db: number): string {
  return `${db >= 0 ? "+" : ""}${db.toFixed(0)}`;
}

function formatSeconds(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "0.00s";
  return `${(ms / 1000).toFixed(2)}s`;
}
