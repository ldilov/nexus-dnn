-- Migration 004: surface Rung 7L's transparent-restart count on the run row.
--
-- Rung 7L's outer driver in runner.rs tracks `restart_attempts: u32`
-- but never persists it — operators couldn't tell whether a 14-minute
-- render hit a clean path or limped through two transparent restarts.
-- Adding the column + a max-cap snapshot makes the UI badge feasible
-- ("rendering · restart 1/3") and gives `/renders/{id}` polling
-- consumers something to display.
--
-- `restart_count` is an additive column with a default of 0; existing
-- rows are zero-valued in place via SQLite's `ALTER TABLE ADD COLUMN`,
-- no rebuild required.

ALTER TABLE ext_nexus_video_ltx23__runs
  ADD COLUMN restart_count INTEGER NOT NULL DEFAULT 0;

-- Cap snapshot so the UI can render "restart 1/3" without separately
-- querying NEXUS_VIDEO_LTX23_VRAM_MAX_RESTARTS. Snapshotted at
-- insert_run time so historical rows display the cap they ran under,
-- not the current env value.
ALTER TABLE ext_nexus_video_ltx23__runs
  ADD COLUMN max_restart_count INTEGER NOT NULL DEFAULT 0;
