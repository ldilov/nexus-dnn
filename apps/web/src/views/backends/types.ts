export type CardState =
  | "unsupported"
  | "not_installed"
  | "installing"
  | "installed_unvalidated"
  | "ready"
  | "broken"
  | "updating";

export type PortMode = "auto" | "fixed";
export type AcceleratorProfile = "cpu" | "vulkan" | "cuda12" | "cuda13";

export interface InstallSummary {
  runtime_install_id: string;
  release_id: string;
  platform: string;
  accelerator_profile: AcceleratorProfile;
  installed_at: number;
  validated_at: number | null;
}

export interface BackendSummary {
  id: string;
  display_name: string;
  implementation_status: "available" | "unavailable";
  card_state: CardState;
  install: InstallSummary | null;
  supported_profiles_on_this_machine: string[];
  last_failure_category: string | null;
  unavailable_reason: string | null;
}

export interface BackendListResponse {
  backends: BackendSummary[];
  summary: { installed: number; validated: number; issues: number };
}

export interface BackendDetail extends BackendSummary {}

export interface RuntimeSettings {
  backend: string;
  install_ref: string | null;
  threads: number;
  threads_batch: number;
  default_context: number;
  parallel_requests: number;
  bind_address: string;
  port_mode: PortMode;
  fixed_port: number | null;
  extra_args: string[];
}

export interface ValidationCheck {
  check_id: string;
  ok: boolean;
  message: string;
  duration_ms: number;
}

export interface ValidationReport {
  runtime_install_id: string | null;
  overall_ok: boolean;
  checks: ValidationCheck[];
  failure_category: string | null;
}

export interface DiagnosticRecord {
  category: string;
  title: string;
  explanation: string;
  likely_cause: string;
  suggested_actions: string[];
  technical_details: unknown;
  event_refs: string[];
  created_at: number;
}
