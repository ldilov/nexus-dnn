import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/button";
import {
  newOperationId,
  type EditChain,
  type EditOp,
  type EditOpMode,
} from "../../../services/audio_edit_client";
import * as css from "./edit_chain_panel.css";

export interface EditChainPanelProps {
  chain: EditChain;
  digest?: string | null;
  label?: string;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  readOnly?: boolean;
  onUpsertOp: (op: EditOp) => void;
  onRemoveOp: (opId: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  pendingExecution?: boolean;
  onCopyJson?: () => void;
}

interface AddableOp {
  mode: EditOpMode;
  label: string;
  defaults: () => EditOp;
}

const ADDABLE_OPS: AddableOp[] = [
  {
    mode: "gain",
    label: "Volume (gain)",
    defaults: () => ({ id: newOperationId(), mode: "gain", gain_db: 0 }),
  },
  {
    mode: "eq3",
    label: "3-band EQ",
    defaults: () => ({ id: newOperationId(), mode: "eq3", low_db: 0, mid_db: 0, high_db: 0 }),
  },
  {
    mode: "speed",
    label: "Speed",
    defaults: () => ({ id: newOperationId(), mode: "speed", factor: 1.0 }),
  },
  {
    mode: "pitch_shift",
    label: "Pitch shift",
    defaults: () => ({ id: newOperationId(), mode: "pitch_shift", semitones: 0 }),
  },
  {
    mode: "normalize",
    label: "Normalize (LUFS)",
    defaults: () => ({ id: newOperationId(), mode: "normalize", target_lufs: -16 }),
  },
  {
    mode: "fade_in",
    label: "Fade in",
    defaults: () => ({ id: newOperationId(), mode: "fade_in", duration_ms: 250 }),
  },
  {
    mode: "fade_out",
    label: "Fade out",
    defaults: () => ({ id: newOperationId(), mode: "fade_out", duration_ms: 250 }),
  },
  {
    mode: "silence_strip",
    label: "Silence trim",
    defaults: () => ({ id: newOperationId(), mode: "silence_strip", threshold_db: -40 }),
  },
  {
    mode: "trim",
    label: "Trim",
    defaults: () => ({ id: newOperationId(), mode: "trim", start_ms: 0, end_ms: 1000 }),
  },
  {
    mode: "crop",
    label: "Crop",
    defaults: () => ({ id: newOperationId(), mode: "crop", start_ms: 0, end_ms: 1000 }),
  },
  {
    mode: "mute",
    label: "Mute region",
    defaults: () => ({ id: newOperationId(), mode: "mute", start_ms: 0, end_ms: 100 }),
  },
];

export function EditChainPanel(props: EditChainPanelProps): JSX.Element {
  const {
    chain,
    digest,
    label = "Edit chain",
    collapsed = false,
    onToggleCollapsed,
    readOnly = false,
    onUpsertOp,
    onRemoveOp,
    onUndo,
    onRedo,
    canUndo,
    canRedo,
    pendingExecution,
    onCopyJson,
  } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const builderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDocClick = (ev: MouseEvent) => {
      if (!builderRef.current) return;
      if (!builderRef.current.contains(ev.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  const handleCopyJson = () => {
    const json = JSON.stringify(chain, null, 2);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(json).catch(() => undefined);
    }
    onCopyJson?.();
  };

  const handleAdd = (op: AddableOp) => {
    onUpsertOp(op.defaults());
    setMenuOpen(false);
  };

  if (collapsed) {
    return (
      <div className={css.root}>
        <div className={css.headerRow}>
          <span className={css.headerTitle}>{label}</span>
          <span className={css.collapsedChip}>
            <span>{chain.ops.length} ops</span>
            {digest ? <span>· digest {digest.slice(0, 8)}</span> : null}
            {pendingExecution ? <span>· rendering</span> : null}
          </span>
          {onToggleCollapsed ? (
            <Button variant="ghost" size="sm" onClick={onToggleCollapsed}>
              Expand
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={css.root}>
      <div className={css.headerRow}>
        <span className={css.headerTitle}>{label}</span>
        <div className={css.headerActions}>
          <Button variant="ghost" size="sm" onClick={onUndo} disabled={!canUndo || readOnly}>
            Undo
          </Button>
          <Button variant="ghost" size="sm" onClick={onRedo} disabled={!canRedo || readOnly}>
            Redo
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopyJson}>
            Copy JSON
          </Button>
          {onToggleCollapsed ? (
            <Button variant="ghost" size="sm" onClick={onToggleCollapsed}>
              Collapse
            </Button>
          ) : null}
        </div>
      </div>

      {chain.ops.length === 0 ? (
        <div className={css.list}>
          <div className={css.empty}>No operations · add one below</div>
        </div>
      ) : (
        <ol className={css.list}>
          {chain.ops.map((op) => (
            <li key={op.id} className={css.row}>
              <span className={css.opId}>{shortId(op.id)}</span>
              <span className={css.modeLabel}>{modeLabel(op.mode)}</span>
              <span className={css.params}>{paramsSummary(op)}</span>
              {readOnly ? null : (
                <button
                  type="button"
                  className={css.removeButton}
                  onClick={() => onRemoveOp(op.id)}
                  aria-label={`Remove ${modeLabel(op.mode)}`}
                  title="Remove operation"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ol>
      )}

      {!readOnly ? (
        <div className={css.builderRow} ref={builderRef}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            + Add operation
          </Button>
          {menuOpen ? (
            <div className={css.dropdown} role="menu">
              {ADDABLE_OPS.map((op) => (
                <button
                  key={op.mode}
                  type="button"
                  className={css.dropdownItem}
                  role="menuitem"
                  onClick={() => handleAdd(op)}
                >
                  {op.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={css.summaryFooter}>
        <span>
          {chain.ops.length} {chain.ops.length === 1 ? "op" : "ops"}
          {digest ? ` · digest ${digest.slice(0, 8)}` : ""}
        </span>
        {pendingExecution ? <span>Rendering…</span> : null}
      </div>
    </div>
  );
}

function shortId(id: string): string {
  return id.length > 8 ? id.slice(0, 8) : id;
}

function modeLabel(mode: EditOpMode): string {
  switch (mode) {
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
      const exhaustive: never = mode;
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
