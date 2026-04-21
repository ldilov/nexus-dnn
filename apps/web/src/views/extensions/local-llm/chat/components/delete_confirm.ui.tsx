import * as css from '../chat.css';

interface Props {
  threadTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  pending?: boolean;
}

export function DeleteConfirm({ threadTitle, onConfirm, onCancel, pending }: Props) {
  return (
    <div
      role="alertdialog"
      aria-labelledby="delete-confirm-title"
      className={css.popoverCard}
      style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <div id="delete-confirm-title" style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>
        Delete &ldquo;{threadTitle}&rdquo; and all its messages?
      </div>
      <div style={{ opacity: 0.7, fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
        This cannot be undone.
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        <button type="button" className={css.ghostButton} onClick={onCancel} disabled={pending}>
          Cancel
        </button>
        <button
          type="button"
          className={css.dangerButton}
          onClick={onConfirm}
          disabled={pending}
          autoFocus
        >
          Delete
        </button>
      </div>
    </div>
  );
}
