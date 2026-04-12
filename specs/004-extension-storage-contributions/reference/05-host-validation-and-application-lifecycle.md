# Host Validation and Application Lifecycle

## 1. Lifecycle summary

The storage contribution lifecycle extends the existing extension lifecycle.

```text
discovered
  -> validating_manifest
  -> validating_storage_static
  -> validating_storage_dry_run
  -> installable
  -> applying_storage
  -> active
```

Failure states:

```text
invalid_storage
quarantined_storage
repair_required
```

## 2. Discovery

On extension discovery, the host reads `manifest.yaml` and checks whether the optional `storage` block is present.

If absent:
- continue with the normal extension flow.

If present:
- include storage validation in the activation pipeline.

## 3. Planning

The host builds a storage plan containing:

- extension id and version
- namespace alias
- effective prefix
- migration file list
- raw and expanded checksums
- expected object inventory
- install action (`new_install`, `upgrade`, `noop`, `repair_only`)

## 4. Validation stages

### Stage A - manifest validation
Verify:
- schema shape
- capability presence
- file paths inside package
- profile support

### Stage B - static SQL validation
Verify:
- statement types
- object names
- prefix compliance
- cross-namespace safety

### Stage C - dry-run validation
Run the migration plan in a temp SQLite DB assembled from:
- current host core migrations
- extension storage metadata tables
- previously applied extension migrations for this namespace

### Stage D - compatibility decision
Decide whether the extension storage is:
- installable
- upgradeable
- blocked
- repairable

## 5. Apply phase

Apply sequence:

1. open host DB transaction
2. reserve namespace if first install
3. record install plan row
4. execute migration file 1
5. record migration row
6. execute migration file 2
7. record migration row
8. update namespace schema version and object inventory
9. commit
10. emit activation-ready event

## 6. Upgrade rules

### Allowed
- append new migration files
- add new tables
- add new indexes
- add new columns with SQLite-safe defaults or nullability

### Forbidden by default
- reordering prior migration ids
- changing contents of already-applied migrations
- changing alias or effective prefix
- destructive schema mutations without a future explicit repair or archival profile

## 7. Disable behavior

Disabling an extension:
- marks the extension inactive for operator execution and UI discovery
- does not drop namespace objects by default
- keeps migration metadata and schema state available for diagnostics and future re-enable

## 8. Re-enable behavior

If extension files and checksums still match recorded state:
- host re-enables without reapplying migrations.

If files drift unexpectedly:
- host blocks activation and marks storage `repair_required`.

## 9. Uninstall behavior

### Policy: `retain`
- remove extension package registration
- preserve namespace objects and metadata
- mark namespace as orphaned or retained

### Policy: `drop_namespace_objects`
- only allowed through an explicit uninstall action
- host drops namespace objects in reverse dependency-safe order
- migration metadata remains for audit unless a hard purge is requested

### Policy: `archive_then_drop`
- export extension tables to a host-defined archive format
- verify archive completion
- drop namespace objects
- retain metadata record and archive location

## 10. Crash recovery

The host shall maintain enough metadata to resume or repair after crashes during:

- plan generation
- namespace reservation
- migration application
- uninstall drop phase

Recommended recovery markers:

- `plan_generated`
- `apply_started`
- `apply_committed`
- `drop_started`
- `drop_committed`

## 11. Quarantine behavior

If storage validation or application repeatedly fails:
- mark extension as quarantined
- suppress activation attempts until manual repair or package replacement
- preserve diagnostic logs and failed plan details
