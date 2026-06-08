import sqlite3
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]


def _migration_files():
    m = yaml.safe_load((ROOT / "manifest.yaml").read_text())
    return [ROOT / f["path"] for f in m["storage"]["migrations"]["files"]]


def test_migrations_apply_cleanly_from_empty():
    conn = sqlite3.connect(":memory:")
    try:
        for path in _migration_files():
            conn.executescript(path.read_text(encoding="utf-8"))
        tables = {
            row[0]
            for row in conn.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            ).fetchall()
        }
        assert "ext_svi2_pro__render_jobs" in tables
        assert "ext_svi2_pro__settings" in tables
    finally:
        conn.close()


def test_settings_singleton_seeded():
    conn = sqlite3.connect(":memory:")
    try:
        for path in _migration_files():
            conn.executescript(path.read_text(encoding="utf-8"))
        rows = conn.execute("SELECT id, settings_json FROM ext_svi2_pro__settings").fetchall()
        assert len(rows) == 1
        assert rows[0][0] == 1
        assert "svi-canonical" in rows[0][1]
    finally:
        conn.close()


def test_render_job_status_check_constraint():
    conn = sqlite3.connect(":memory:")
    try:
        for path in _migration_files():
            conn.executescript(path.read_text(encoding="utf-8"))
        conn.execute(
            "INSERT INTO ext_svi2_pro__render_jobs (job_id, params_json, status, extension_version, created_at) "
            "VALUES ('j1', '{}', 'running', '0.1.0', 1)"
        )
        try:
            conn.execute(
                "INSERT INTO ext_svi2_pro__render_jobs (job_id, params_json, status, extension_version, created_at) "
                "VALUES ('j2', '{}', 'bogus', '0.1.0', 1)"
            )
            raised = False
        except sqlite3.IntegrityError:
            raised = True
        assert raised
    finally:
        conn.close()
