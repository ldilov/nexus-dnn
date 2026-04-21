import * as css from '../chat.css';

interface Props {
  deploymentLabel: string;
  onAttach: () => void;
  onDismiss: () => void;
  pending?: boolean;
}

export function AttachPrompt({ deploymentLabel, onAttach, onDismiss, pending }: Props) {
  return (
    <div className={css.banner} role="alert" aria-live="polite">
      <span className={css.bannerText}>
        This thread isn&rsquo;t attached to a deployment. Attach to{' '}
        <strong>{deploymentLabel}</strong>?
      </span>
      <button
        type="button"
        className={css.primaryButton}
        onClick={onAttach}
        disabled={pending}
        autoFocus
      >
        Attach
      </button>
      <button
        type="button"
        className={css.ghostButton}
        onClick={onDismiss}
        disabled={pending}
      >
        Keep unbound
      </button>
    </div>
  );
}
