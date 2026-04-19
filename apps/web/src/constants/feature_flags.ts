/**
 * Frontend feature flags. Keep the set small and boolean; enable a
 * flag by editing this file (no runtime config surface in v1). Every
 * flag carries a rationale comment so future maintainers know why it
 * exists.
 *
 * Flags are read once at module load; changes require a dev-server
 * restart. This is intentional — feature flags are not a settings
 * surface, they are a way to land forward-compatible code that isn't
 * yet ready for default-on.
 */

export interface FeatureFlags {
  /**
   * Spec 025 — T074 / T093. Adds "Compatible first" as a secondary
   * sort option in the Models Search screen. FR-073 marks this as
   * SHOULD (not MUST), so the default ships off until the underlying
   * heuristic is proven against a wider fixture corpus.
   */
  compatibleFirstSort: boolean;
}

export const FEATURE_FLAGS: FeatureFlags = {
  compatibleFirstSort: true,
};
