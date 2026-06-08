CREATE TABLE IF NOT EXISTS ext_svi2_pro__settings (
    id              INTEGER PRIMARY KEY NOT NULL DEFAULT 1
                         CHECK (id = 1),
    settings_json   TEXT NOT NULL,
    updated_at      INTEGER NOT NULL
);

INSERT OR IGNORE INTO ext_svi2_pro__settings (id, settings_json, updated_at)
VALUES (
    1,
    '{"default_preset_id":"svi-canonical","attention_backend":"flash2","fp8_compute":"bf16","blocks_to_swap":40,"interpolate_method":"rife","interpolate_fps":48}',
    0
);
