import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { unloadActiveModel } from "../../services/local_llm_chat";
import { useModelLoadState } from "../../hooks/use_model_load_state";
import { dispatchLayoutAction } from "../../layout/action_dispatch";
import * as css from "./model_selector.css";

const MAX_LABEL_CHARS = 40;

function truncate(s: string): string {
  if (s.length <= MAX_LABEL_CHARS) return s;
  return `${s.slice(0, MAX_LABEL_CHARS - 1)}…`;
}

export function ModelSelectorComponent() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [unloading, setUnloading] = useState(false);
  const load = useModelLoadState(threadId);

  useEffect(() => {
    const onSelected = (e: Event) => {
      const ce = e as CustomEvent<{ id?: string }>;
      setThreadId(ce.detail?.id ?? null);
    };
    window.addEventListener("local-llm/thread:selected", onSelected);
    return () =>
      window.removeEventListener("local-llm/thread:selected", onSelected);
  }, []);

  const openPicker = useCallback(() => {
    if (!threadId) return;
    void dispatchLayoutAction("llm.open_model_browser");
  }, [threadId]);

  const handleUnload = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!threadId || unloading) return;
      setUnloading(true);
      try {
        await unloadActiveModel(threadId);
        toast.success("Model unloaded");
        window.dispatchEvent(
          new CustomEvent("local-llm/session.state.changed", {
            detail: { id: threadId, cause: "model_unloaded" },
          }),
        );
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "unload failed");
      } finally {
        setUnloading(false);
      }
    },
    [threadId, unloading],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPicker();
      }
    },
    [openPicker],
  );

  const disabled = !threadId;
  const phase = disabled ? "no_session" : load.phase;
  const isInteractive = !disabled;

  const { statusIcon, mainText, secondaryText, rightSlot } = renderSlots({
    phase,
    label: load.label,
    reason: load.reason,
    onUnload: handleUnload,
    unloading,
  });

  return (
    <div className={css.container}>
      <div
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-disabled={disabled}
        aria-label={mainText}
        title={load.label ?? mainText}
        data-phase={phase}
        className={css.chip}
        onClick={isInteractive ? openPicker : undefined}
        onKeyDown={isInteractive ? onKeyDown : undefined}
      >
        <span className={css.statusSlot}>{statusIcon}</span>
        <span className={css.textBlock}>
          <span className={css.mainLabel}>{mainText}</span>
          {secondaryText && (
            <span className={css.subLabel}>{secondaryText}</span>
          )}
        </span>
        {rightSlot}
      </div>
    </div>
  );
}

type Phase = "no_session" | "idle" | "loading" | "ready" | "failed";

interface SlotArgs {
  phase: Phase;
  label?: string;
  reason?: string;
  unloading: boolean;
  onUnload: (e: React.MouseEvent) => void;
}

interface Slots {
  statusIcon: React.ReactNode;
  mainText: string;
  secondaryText?: string;
  rightSlot: React.ReactNode;
}

function renderSlots(args: SlotArgs): Slots {
  const { phase, label, reason, onUnload, unloading } = args;
  switch (phase) {
    case "no_session":
      return {
        statusIcon: <span className={css.dotIdle} aria-hidden />,
        mainText: "Select a session",
        rightSlot: null,
      };
    case "idle":
      return {
        statusIcon: <span className={css.dotHollow} aria-hidden />,
        mainText: "Choose Model",
        rightSlot: <ChevronIcon />,
      };
    case "loading":
      return {
        statusIcon: <SpinnerIcon />,
        mainText: label ? truncate(label) : "Loading model…",
        secondaryText: "Loading…",
        rightSlot: null,
      };
    case "ready":
      return {
        statusIcon: <span className={css.dotReady} aria-hidden />,
        mainText: label ? truncate(label) : "Model ready",
        rightSlot: (
          <button
            type="button"
            className={css.unloadButton}
            aria-label="Unload model"
            title="Unload model"
            onClick={onUnload}
            disabled={unloading}
          >
            <XIcon />
          </button>
        ),
      };
    case "failed":
      return {
        statusIcon: <span className={css.dotFailed} aria-hidden />,
        mainText: label ? truncate(label) : "Load failed",
        secondaryText: reason ? truncate(reason) : "failed",
        rightSlot: <ChevronIcon />,
      };
  }
}

function ChevronIcon() {
  return (
    <svg
      className={css.icon}
      viewBox="0 0 16 16"
      aria-hidden
      focusable="false"
    >
      <path
        d="M6 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className={css.icon}
      viewBox="0 0 16 16"
      aria-hidden
      focusable="false"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className={`${css.icon} ${css.spinner}`}
      viewBox="0 0 16 16"
      aria-hidden
      focusable="false"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
      <path
        d="M8 2 a6 6 0 0 1 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
