-- Migration 020 — Deployments soft delete
-- Adds a nullable deleted_at column to the deployments table so the
-- host can soft-delete a deployment (UI hides it, with a restore window
-- before hard-purge). A NULL value means the row is live.
--
-- Idempotent re-runs are guarded by the migration runner's
-- ignore_duplicate_column flag (set true at the call site).

ALTER TABLE deployments ADD COLUMN deleted_at TEXT;

CREATE INDEX IF NOT EXISTS idx_deployments_deleted_at ON deployments(deleted_at);
