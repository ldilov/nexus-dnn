# nexus-storage

SQLite-backed persistence layer for the Nexus DNN host. Provides the
`Database` trait, its `SqliteDatabase` implementation, and the
`StorageManager` orchestrator for migrations, namespacing, and uninstall
lifecycle.

## Module layout (post spec 014)

```
src/
├── lib.rs
├── database.rs         # Database trait
├── error.rs            # StorageError
├── records.rs          # row record types
├── row_mapping.rs      # sqlx::Row -> record mappers
├── sqlite/
│   ├── mod.rs          # SqliteDatabase struct + impl Database (thin delegates)
│   ├── migrations.rs   # run_migrations + execute_migration_statements helper
│   ├── extensions.rs   # extension table CRUD
│   ├── operators.rs    # operator table CRUD
│   ├── workflows.rs    # workflow + canvas state CRUD
│   ├── runs.rs         # run + node_execution CRUD
│   ├── artifacts.rs    # artifact + lineage CRUD
│   ├── content.rs      # recipes + ui_contributions CRUD
│   ├── namespaces.rs   # namespace + migration_record + object + operation + archive CRUD
│   └── tests.rs        # integration tests
└── manager/
    ├── mod.rs          # StorageManager struct + StorageManagerBuilder
    ├── journal.rs      # journal_start / journal_complete / quarantine threshold
    ├── reservation.rs  # reserve_namespace + update_namespace_policy
    ├── apply.rs        # apply_plan + apply_single_migration + dry-run
    ├── uninstall/
    │   ├── mod.rs      # uninstall_namespace policy dispatcher
    │   ├── retain.rs
    │   ├── drop.rs
    │   └── archive.rs  # uninstall_archive_then_drop with propagated errors
    ├── verify.rs       # verify_namespace
    ├── tests.rs        # main test suite
    └── archive_tests.rs # isolated archive-then-drop test
```

## Recommended construction (StorageManager)

```rust
use std::sync::Arc;
use nexus_storage::{SqliteDatabase, StorageManager};

let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await?);
let manager = StorageManager::builder(db)
    .event_bus(my_bus)
    .data_dir("/var/lib/nexus".into())
    .quarantine_threshold(5)
    .build();
```

The legacy `with_event_bus` / `with_data_dir` / `with_quarantine_threshold`
constructors remain but are `#[deprecated]` — they delegate to the builder.
