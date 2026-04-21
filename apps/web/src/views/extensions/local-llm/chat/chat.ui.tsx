import { useState } from 'react';
import type {
  ChatMessage,
  ChatThread,
  SamplerOverride,
} from '../../../../services/extension_chat';
import * as css from './chat.css';
import { AttachPrompt } from './components/attach_prompt.ui';
import { DeleteConfirm } from './components/delete_confirm.ui';
import { RenameAffordance } from './components/rename_affordance.ui';
import { SamplerAuditPopover } from './components/sampler_audit_popover.ui';
import { SamplerOverridePanel } from './components/sampler_override.ui';

type Pending = {
  send: boolean;
  attach: boolean;
  delete: boolean;
};

export interface ChatUiProps {
  thread: ChatThread;
  messages: ChatMessage[];
  currentDeployment: { id: string; label: string } | null;
  attachDismissed: boolean;
  pending: Pending;
  errorText: string | null;
  onSend: (text: string) => void;
  onRename: (nextTitle: string) => void;
  onDelete: () => void;
  onAttach: () => void;
  onDismissAttachPrompt: () => void;
  onOverrideChange: (next: SamplerOverride | null) => void;
}

export function ChatUi(props: ChatUiProps) {
  const {
    thread,
    messages,
    currentDeployment,
    attachDismissed,
    pending,
    errorText,
    onSend,
    onRename,
    onDelete,
    onAttach,
    onDismissAttachPrompt,
    onOverrideChange,
  } = props;

  const [composer, setComposer] = useState('');
  const [renaming, setRenaming] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [showOverride, setShowOverride] = useState(false);
  const [auditFor, setAuditFor] = useState<{ block: ChatMessage['sampler_effective']; top: number; left: number } | null>(null);

  const canAttach =
    thread.is_unbound && currentDeployment !== null && !attachDismissed;

  const submitSend = () => {
    const text = composer.trim();
    if (!text || pending.send) return;
    onSend(text);
    setComposer('');
  };

  return (
    <div className={css.shell}>
      <header className={css.header}>
        {renaming ? (
          <RenameAffordance
            current={thread.title_resolved}
            onSubmit={(next) => {
              setRenaming(false);
              onRename(next);
            }}
            onCancel={() => setRenaming(false)}
          />
        ) : (
          <h1
            className={css.title}
            onDoubleClick={() => setRenaming(true)}
            title={thread.title_resolved}
          >
            {thread.title_resolved}
          </h1>
        )}
        <div className={css.headerActions}>
          <button
            type="button"
            className={css.ghostButton}
            onClick={() => setShowOverride((v) => !v)}
            aria-expanded={showOverride}
            aria-label="Toggle sampler override"
          >
            Sampler
          </button>
          <button
            type="button"
            className={css.ghostButton}
            onClick={() => setRenaming(true)}
            aria-label="Rename thread"
          >
            Rename
          </button>
          <button
            type="button"
            className={css.dangerButton}
            onClick={() => setConfirmingDelete(true)}
            aria-label="Delete thread"
          >
            Delete
          </button>
        </div>
      </header>

      {canAttach && currentDeployment && (
        <AttachPrompt
          deploymentLabel={currentDeployment.label}
          onAttach={onAttach}
          onDismiss={onDismissAttachPrompt}
          pending={pending.attach}
        />
      )}

      {showOverride && (
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <SamplerOverridePanel override={thread.sampler_override ?? null} onChange={onOverrideChange} />
        </div>
      )}

      <div className={css.messagePane} aria-live="polite">
        {messages.length === 0 ? (
          <div className={css.emptyState}>
            <span>No messages yet.</span>
            <span style={{ fontSize: '0.8125rem' }}>Send a message to begin.</span>
          </div>
        ) : (
          messages.map((m) => {
            const roleClass =
              m.role === 'user'
                ? css.messageUser
                : m.role === 'assistant'
                  ? css.messageAssistant
                  : css.messageSystem;
            return (
              <div
                key={m.message_id}
                className={`${css.message} ${roleClass} ${m.is_partial ? css.messagePartial : ''}`}
              >
                <div className={css.messageMeta}>
                  <span>{m.role}</span>
                  <span>#{m.ordinal}</span>
                  {m.is_partial && <span>• incomplete</span>}
                  {m.role === 'assistant' && m.sampler_effective && (
                    <button
                      type="button"
                      className={css.iconButton}
                      aria-label="Show sampler audit"
                      onClick={(e) => {
                        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                        setAuditFor({
                          block: m.sampler_effective,
                          top: rect.bottom + 4,
                          left: rect.left,
                        });
                      }}
                    >
                      ⓘ
                    </button>
                  )}
                </div>
                <div>{m.content || (m.is_partial ? '(incomplete)' : '')}</div>
              </div>
            );
          })
        )}
      </div>

      <form
        className={css.composer}
        onSubmit={(e) => {
          e.preventDefault();
          submitSend();
        }}
      >
        <textarea
          className={css.composerInput}
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submitSend();
            }
          }}
          placeholder="Send a message…"
          aria-label="Compose message"
          disabled={pending.send}
        />
        <button type="submit" className={css.primaryButton} disabled={pending.send || !composer.trim()}>
          Send
        </button>
      </form>

      {errorText && (
        <div role="alert" style={{ padding: '0.5rem 1rem', color: 'var(--color-danger, #ef4444)', fontSize: '0.875rem' }}>
          {errorText}
        </div>
      )}

      {confirmingDelete && (
        <DeleteConfirm
          threadTitle={thread.title_resolved}
          onConfirm={() => {
            setConfirmingDelete(false);
            onDelete();
          }}
          onCancel={() => setConfirmingDelete(false)}
          pending={pending.delete}
        />
      )}

      {auditFor && auditFor.block && (
        <SamplerAuditPopover
          block={auditFor.block}
          anchorTop={auditFor.top}
          anchorLeft={auditFor.left}
          onClose={() => setAuditFor(null)}
        />
      )}
    </div>
  );
}
