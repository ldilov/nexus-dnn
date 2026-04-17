import type { BackendSummary, CardState } from "../types";
import * as css from "./backend_card.css";

// Maps each `card_state` onto the right badge variant so the pill color
// carries status meaning (acid-green ready, warm warn, red error, etc.).
type BadgeVariant = "neutral" | "ready" | "installing" | "warn" | "error";
function badgeVariantFor(backend: BackendSummary): BadgeVariant {
  if (backend.implementation_status === "unavailable") return "neutral";
  switch (backend.card_state) {
    case "ready":
      return "ready";
    case "installing":
    case "updating":
      return "installing";
    case "installed_unvalidated":
      return "warn";
    case "broken":
      return "error";
    case "not_installed":
    case "unsupported":
      return "neutral";
  }
}

interface Props {
  backend: BackendSummary;
  onInstall: (backend: BackendSummary) => void;
  onValidate: (backend: BackendSummary) => void;
  onRepair: (backend: BackendSummary) => void;
  onOpenSettings: (backend: BackendSummary) => void;
  onOpenDiagnostics: (backend: BackendSummary) => void;
  onViewDetails: (backend: BackendSummary) => void;
}

interface CtaBinding {
  primaryLabel: string | null;
  primaryAction: (() => void) | null;
  primaryDisabled: boolean;
  secondaryLabel: string | null;
  secondaryAction: (() => void) | null;
}

function bindCtas(state: CardState, handlers: Omit<Props, "backend">, backend: BackendSummary): CtaBinding {
  switch (state) {
    case "unsupported":
      return {
        primaryLabel: null,
        primaryAction: null,
        primaryDisabled: false,
        secondaryLabel: "View details",
        secondaryAction: () => handlers.onViewDetails(backend),
      };
    case "not_installed":
      return {
        primaryLabel: "Install",
        primaryAction: () => handlers.onInstall(backend),
        primaryDisabled: false,
        secondaryLabel: "View details",
        secondaryAction: () => handlers.onViewDetails(backend),
      };
    case "installing":
      return {
        primaryLabel: "Installing…",
        primaryAction: null,
        primaryDisabled: true,
        secondaryLabel: "View progress",
        secondaryAction: () => handlers.onViewDetails(backend),
      };
    case "installed_unvalidated":
      return {
        primaryLabel: "Validate",
        primaryAction: () => handlers.onValidate(backend),
        primaryDisabled: false,
        secondaryLabel: "Settings",
        secondaryAction: () => handlers.onOpenSettings(backend),
      };
    case "ready":
      return {
        primaryLabel: "Settings",
        primaryAction: () => handlers.onOpenSettings(backend),
        primaryDisabled: false,
        secondaryLabel: "Validate",
        secondaryAction: () => handlers.onValidate(backend),
      };
    case "broken":
      return {
        primaryLabel: "Repair",
        primaryAction: () => handlers.onRepair(backend),
        primaryDisabled: false,
        secondaryLabel: "Diagnostics",
        secondaryAction: () => handlers.onOpenDiagnostics(backend),
      };
    case "updating":
      return {
        primaryLabel: "Updating…",
        primaryAction: null,
        primaryDisabled: true,
        secondaryLabel: "View progress",
        secondaryAction: () => handlers.onViewDetails(backend),
      };
  }
}

function badgeFor(backend: BackendSummary): string {
  if (backend.implementation_status === "unavailable") return "UNAVAILABLE IN THIS BUILD";
  switch (backend.card_state) {
    case "ready":
      return "READY";
    case "not_installed":
      return "NOT INSTALLED";
    case "installed_unvalidated":
      return "INSTALLED · UNVALIDATED";
    case "installing":
      return "INSTALLING";
    case "updating":
      return "UPDATING";
    case "broken":
      return "ISSUE";
    case "unsupported":
      return "UNSUPPORTED";
  }
}

function versionLabel(backend: BackendSummary): string | null {
  if (!backend.install) return null;
  const { release_id, platform, accelerator_profile } = backend.install;
  return `${release_id} · ${platform} · ${accelerator_profile}`;
}

function footerCopy(backend: BackendSummary): string {
  if (backend.id === "llama.cpp" && backend.card_state === "ready") {
    return "Use this runtime from Deployments to load GGUF models.";
  }
  if (backend.id === "llama.cpp" && backend.card_state === "not_installed") {
    return "Supports CPU and hybrid GPU execution depending on installed package.";
  }
  if (backend.implementation_status === "unavailable") {
    return backend.unavailable_reason ?? "This runtime is not available in the current build.";
  }
  return "";
}

export function BackendCard({ backend, ...handlers }: Props) {
  const binding = bindCtas(backend.card_state, handlers, backend);
  const version = versionLabel(backend);
  const variant = badgeVariantFor(backend);
  const description =
    backend.id === "llama.cpp"
      ? "GGUF-first local runtime using the upstream llama-server executable."
      : backend.id === "tensorrt_llm"
        ? "NVIDIA TensorRT-LLM — native Windows support planned for later slice."
        : "";
  const footer = footerCopy(backend);
  return (
    <section className={css.card} data-backend-id={backend.id} data-card-state={backend.card_state}>
      <div className={css.header}>
        <div className={css.title}>{backend.display_name}</div>
        <span className={css.badge[variant]}>{badgeFor(backend)}</span>
      </div>
      {version && <div className={css.version}>{version}</div>}
      {description && <p className={css.body}>{description}</p>}
      {(binding.primaryLabel || binding.secondaryLabel) && (
        <div className={css.actions}>
          {binding.primaryLabel && (
            <button
              type="button"
              className={css.buttonPrimary}
              disabled={binding.primaryDisabled}
              onClick={binding.primaryAction ?? undefined}
              data-testid={`backend-${backend.id}-primary`}
            >
              {binding.primaryLabel}
            </button>
          )}
          {binding.secondaryLabel && (
            <button
              type="button"
              className={css.buttonSecondary}
              onClick={binding.secondaryAction ?? undefined}
              data-testid={`backend-${backend.id}-secondary`}
            >
              {binding.secondaryLabel}
            </button>
          )}
        </div>
      )}
      {footer && <p className={css.footerNote}>{footer}</p>}
    </section>
  );
}
