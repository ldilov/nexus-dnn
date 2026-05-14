-- Migration 005: stash the most recent VRAM-supervisor breach reason
-- on the run row so the UI's restart badge can show a tooltip with
-- *why* the runner restarted, instead of just *that* it did.
--
-- The runner's outer loop already captures the reason in a local
-- `last_breach_reason: Option<String>` for log correlation; the
-- value just had nowhere to live across the next HTTP poll. Adding
-- a nullable column lets clients render "restart 1/3 — frag_ratio
-- 0.42 exceeded max 0.30" via the existing renderRestartBadge
-- helper's `title=` attribute.
--
-- Nullable + no default: runs that never breached keep this NULL.
-- Runs that completed via transparent restart show the *last*
-- breach reason (first-writer-wins per BreachLatch). Runs that hit
-- the budget-exhausted halt show the breach that pushed them over.

ALTER TABLE ext_nexus_video_ltx23__runs
  ADD COLUMN last_breach_reason TEXT;
