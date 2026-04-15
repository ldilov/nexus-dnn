import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  disableExtension,
  enableExtension,
  fetchExtensions,
  type Extension,
} from "../api/client";
import * as s from "./extensions_gallery.css";

type ActionState = {
  readonly loading: boolean;
  readonly targetId: string | null;
};

const IDLE: ActionState = { loading: false, targetId: null };

type ExtensionsGalleryProps = {
  onExtensionToggled?: () => void;
};

export function ExtensionsGallery({ onExtensionToggled }: ExtensionsGalleryProps = {}) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<ActionState>(IDLE);

  const refresh = useCallback(() => {
    fetchExtensions()
      .then((items) => {
        setExtensions(items);
        setError(null);
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load extensions"),
      );
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setStatus = useCallback(
    (id: string, enable: boolean) => {
      setAction({ loading: true, targetId: id });
      const op = enable ? enableExtension(id) : disableExtension(id);
      op.then(() => {
        refresh();
        onExtensionToggled?.();
      })
        .catch((err: unknown) =>
          setError(err instanceof Error ? err.message : "Failed to update extension"),
        )
        .finally(() => setAction(IDLE));
    },
    [refresh, onExtensionToggled],
  );

  const { builtins, externals } = useMemo(() => {
    const builtins: Extension[] = [];
    const externals: Extension[] = [];
    for (const ext of extensions) {
      if (ext.source === "builtin") builtins.push(ext);
      else externals.push(ext);
    }
    return { builtins, externals };
  }, [extensions]);

  if (error) {
    return <div className={s.errorState}>{error}</div>;
  }

  return (
    <div className={s.root}>
      <ExtensionSection
        label="Built-in Extensions"
        count={builtins.length}
        items={builtins}
        action={action}
        onToggle={setStatus}
        showDelete={false}
      />

      <ExtensionSection
        label="External Extensions"
        count={externals.length}
        items={externals}
        action={action}
        onToggle={setStatus}
        showDelete
        trailing={<InstallDropZone onInstalled={refresh} />}
      />

      {extensions.length === 0 && (
        <div className={s.emptyState}>No extensions loaded</div>
      )}
    </div>
  );
}

type ExtensionSectionProps = {
  label: string;
  count: number;
  items: Extension[];
  action: ActionState;
  onToggle: (id: string, enable: boolean) => void;
  showDelete: boolean;
  trailing?: React.ReactNode;
};

function ExtensionSection({
  label,
  count,
  items,
  action,
  onToggle,
  showDelete,
  trailing,
}: ExtensionSectionProps) {
  return (
    <section className={s.section}>
      <header className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{label}</h2>
        <span className={s.sectionCount}>{count.toString().padStart(2, "0")}</span>
      </header>
      <div className={s.grid}>
        {items.map((ext) => (
          <ExtensionCard
            key={ext.id}
            extension={ext}
            busy={action.loading && action.targetId === ext.id}
            onToggle={onToggle}
            showDelete={showDelete}
          />
        ))}
        {trailing}
      </div>
    </section>
  );
}

type ExtensionCardProps = {
  extension: Extension;
  busy: boolean;
  onToggle: (id: string, enable: boolean) => void;
  showDelete: boolean;
};

function ExtensionCard({ extension, busy, onToggle, showDelete }: ExtensionCardProps) {
  const active = extension.status === "active";
  const invalid = extension.status === "invalid";
  const displayName = extension.name ?? extension.id;
  const initials = displayName
    .replace(/[^a-zA-Z]+/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "·";

  return (
    <article className={`${s.card}${!active ? ` ${s.cardDisabled}` : ""}`}>
      <div className={s.cardHead}>
        <div className={s.iconTile} aria-hidden="true">
          {initials}
        </div>
        <div className={s.headText}>
          <div className={s.titleRow}>
            <span className={s.title}>{displayName}</span>
            <span className={s.sourceChip}>
              {extension.source === "builtin" ? "Core" : "External"}
            </span>
            <StatusPill status={extension.status} />
          </div>
          <span className={s.meta}>
            v{extension.version}
            {extension.publisher ? ` · ${extension.publisher}` : ""}
          </span>
        </div>
      </div>

      {extension.capabilities.length > 0 && (
        <div className={s.capabilityRow}>
          {extension.capabilities.slice(0, 4).map((cap) => (
            <span key={cap} className={s.capability}>
              {cap}
            </span>
          ))}
        </div>
      )}

      <div className={s.metrics}>
        <div>
          <div className={s.metricLabel}>Peak Memory</div>
          <div className={`${s.metricValue} ${s.metricValueMuted}`}>—</div>
        </div>
        <div>
          <div className={s.metricLabel}>Avg Latency</div>
          <div className={`${s.metricValue} ${s.metricValueMuted}`}>—</div>
        </div>
      </div>

      <div className={s.footer}>
        <div className={s.footerActions}>
          <IconButton
            label="Open extension folder"
            onClick={() => {
              /* opens future extension settings; placeholder no-op */
            }}
          >
            <FolderIcon />
          </IconButton>
          {showDelete && (
            <IconButton
              label="Uninstall extension"
              danger
              onClick={() => {
                /* delete handler to be wired when uninstall API lands */
              }}
            >
              <TrashIcon />
            </IconButton>
          )}
        </div>
        <Toggle
          on={active}
          disabled={busy || invalid}
          onToggle={(next) => onToggle(extension.id, next)}
        />
      </div>
    </article>
  );
}

type StatusPillProps = { status: string };

function StatusPill({ status }: StatusPillProps) {
  const dotClass =
    status === "active"
      ? s.statusDotActive
      : status === "invalid"
        ? s.statusDotInvalid
        : s.statusDotDisabled;
  const label =
    status === "active"
      ? "Active"
      : status === "invalid"
        ? "Invalid"
        : status === "disabled"
          ? "Disabled"
          : status;
  return (
    <span className={s.statusPill}>
      <span className={`${s.statusDot} ${dotClass}`} />
      {label}
    </span>
  );
}

type IconButtonProps = {
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

function IconButton({ label, onClick, danger, disabled, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`${s.iconButton}${danger ? ` ${s.iconButtonDanger}` : ""}`}
    >
      {children}
    </button>
  );
}

type ToggleProps = {
  on: boolean;
  disabled?: boolean;
  onToggle: (next: boolean) => void;
};

function Toggle({ on, disabled, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={on ? "Disable extension" : "Enable extension"}
      disabled={disabled}
      onClick={() => onToggle(!on)}
      className={`${s.toggle}${on ? ` ${s.toggleOn}` : ""}`}
    >
      <span className={`${s.toggleKnob}${on ? ` ${s.toggleKnobOn}` : ""}`} />
    </button>
  );
}

type InstallDropZoneProps = {
  onInstalled: () => void;
};

function InstallDropZone({ onInstalled: _onInstalled }: InstallDropZoneProps) {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = useCallback(() => inputRef.current?.click(), []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  }, []);

  const handleDragLeave = useCallback(() => setActive(false), []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
    // Installer API not yet wired; for now we simply acknowledge the drop.
    // _onInstalled() will fire once the upload endpoint is available.
  }, []);

  return (
    <div
      className={`${s.installCard}${active ? ` ${s.installCardActive}` : ""}`}
      role="button"
      tabIndex={0}
      onClick={openPicker}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPicker();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={s.installIcon} aria-hidden="true">
        +
      </div>
      <div className={s.installTitle}>Install New Extension</div>
      <div className={s.installHint}>Drag &amp; drop .nexext file</div>
      <input ref={inputRef} type="file" accept=".nexext,.zip" />
    </div>
  );
}

function FolderIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
