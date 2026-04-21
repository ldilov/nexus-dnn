import type { SamplerBlock } from '../../../../../services/extension_chat';
import * as css from '../chat.css';

interface Props {
  block: SamplerBlock;
  anchorTop: number;
  anchorLeft: number;
  onClose: () => void;
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'number') {
    return Number.isInteger(v) ? String(v) : v.toFixed(4).replace(/\.?0+$/, '');
  }
  return String(v);
}

export function SamplerAuditPopover({ block, anchorTop, anchorLeft, onClose }: Props) {
  const entries = Object.entries(block as unknown as Record<string, unknown>);
  return (
    <div
      className={css.popoverCard}
      role="dialog"
      aria-label="Sampler audit"
      style={{ top: anchorTop, left: anchorLeft }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <strong style={{ fontSize: '0.875rem' }}>Sampler (read-only)</strong>
        <button type="button" className={css.iconButton} onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <table className={css.auditTable}>
        <tbody>
          {entries.map(([k, v]) => (
            <tr key={k}>
              <td className={css.auditCell}>{k}</td>
              <td className={css.auditCell} style={{ textAlign: 'right' }}>
                {formatValue(v)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
