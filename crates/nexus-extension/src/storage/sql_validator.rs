use sqlparser::ast::{
    AlterTableOperation, ColumnDef, ColumnOption, ColumnOptionDef, ObjectType, Statement,
    TableConstraint,
};
use sqlparser::dialect::SQLiteDialect;
use sqlparser::parser::Parser;

const RESERVED_PREFIXES: &[&str] = &[
    "ext_sqlite_",
    "ext_host_",
    "ext_nexus_",
    "ext_core_",
];

#[derive(Debug, Clone)]
pub struct ExtractedObject {
    pub name: String,
    pub object_type: ObjectType,
}

#[derive(Debug, Clone)]
pub struct SqlValidationReport {
    pub statements_checked: usize,
    pub objects: Vec<ExtractedObject>,
    pub errors: Vec<String>,
}

pub fn expand_prefix(sql: &str, effective_prefix: &str) -> String {
    sql.replace("{{prefix}}", effective_prefix)
}

pub fn check_reserved_prefix(effective_prefix: &str) -> Option<String> {
    for reserved in RESERVED_PREFIXES {
        if effective_prefix == *reserved {
            return Some(format!(
                "prefix '{effective_prefix}' is reserved and cannot be used"
            ));
        }
    }
    None
}

pub fn validate_sql(sql: &str, effective_prefix: &str) -> SqlValidationReport {
    let expanded = expand_prefix(sql, effective_prefix);
    let mut report = SqlValidationReport {
        statements_checked: 0,
        objects: Vec::new(),
        errors: Vec::new(),
    };

    if let Some(err) = check_reserved_prefix(effective_prefix) {
        report.errors.push(err);
        return report;
    }

    let statements = match Parser::parse_sql(&SQLiteDialect {}, &expanded) {
        Ok(stmts) => stmts,
        Err(e) => {
            report.errors.push(format!("SQL parse error: {e}"));
            return report;
        }
    };

    for stmt in &statements {
        report.statements_checked += 1;
        validate_statement(stmt, effective_prefix, &mut report);
    }

    report
}

fn validate_statement(
    stmt: &Statement,
    effective_prefix: &str,
    report: &mut SqlValidationReport,
) {
    match stmt {
        Statement::CreateTable(create) => {
            let table_name = object_name_to_string(&create.name);
            validate_prefix(&table_name, effective_prefix, report);
            report.objects.push(ExtractedObject {
                name: table_name,
                object_type: ObjectType::Table,
            });
            validate_fk_constraints(&create.columns, &create.constraints, effective_prefix, report);
        }
        Statement::CreateIndex(create_index) => {
            if let Some(ref index_name) = create_index.name {
                let name = object_name_to_string(index_name);
                validate_prefix(&name, effective_prefix, report);
                validate_index_name(&name, effective_prefix, report);
                report.objects.push(ExtractedObject {
                    name,
                    object_type: ObjectType::Index,
                });
            }
        }
        Statement::AlterTable { operations, .. } => {
            for op in operations {
                match op {
                    AlterTableOperation::AddColumn { .. } => {}
                    other => {
                        report.errors.push(format!(
                            "ALTER TABLE operation not allowed: {other}"
                        ));
                    }
                }
            }
        }
        other => {
            report.errors.push(format!(
                "statement type not allowed: {}",
                statement_type_name(other)
            ));
        }
    }
}

fn validate_prefix(name: &str, effective_prefix: &str, report: &mut SqlValidationReport) {
    if !name.starts_with(effective_prefix) {
        report.errors.push(format!(
            "object name '{name}' does not start with required prefix '{effective_prefix}'"
        ));
    }
}

fn validate_index_name(name: &str, effective_prefix: &str, report: &mut SqlValidationReport) {
    let expected_prefix = format!("{effective_prefix}idx_");
    if !name.starts_with(&expected_prefix) {
        report.errors.push(format!(
            "index name '{name}' must match pattern '{effective_prefix}idx_<name>'"
        ));
        return;
    }

    let suffix = &name[expected_prefix.len()..];
    let pattern = regex_lite::Regex::new(r"^[a-z0-9_]{1,58}$").expect("invalid index regex");
    if !pattern.is_match(suffix) {
        report.errors.push(format!(
            "index name '{name}' suffix '{suffix}' must match [a-z0-9_]{{1,58}}"
        ));
    }
}

fn validate_fk_constraints(
    columns: &[ColumnDef],
    constraints: &[TableConstraint],
    effective_prefix: &str,
    report: &mut SqlValidationReport,
) {
    for col in columns {
        for ColumnOptionDef { option, .. } in &col.options {
            if let ColumnOption::ForeignKey {
                foreign_table, ..
            } = option
            {
                let ref_table = object_name_to_string(foreign_table);
                if !ref_table.starts_with(effective_prefix) {
                    report.errors.push(format!(
                        "FK reference to '{ref_table}' crosses namespace boundary \
                         (must start with '{effective_prefix}')"
                    ));
                }
            }
        }
    }

    for constraint in constraints {
        if let TableConstraint::ForeignKey {
            foreign_table, ..
        } = constraint
        {
            let ref_table = object_name_to_string(foreign_table);
            if !ref_table.starts_with(effective_prefix) {
                report.errors.push(format!(
                    "FK reference to '{ref_table}' crosses namespace boundary \
                     (must start with '{effective_prefix}')"
                ));
            }
        }
    }
}

fn object_name_to_string(name: &sqlparser::ast::ObjectName) -> String {
    name.to_string()
}

fn statement_type_name(stmt: &Statement) -> &'static str {
    match stmt {
        Statement::Drop { .. } => "DROP",
        Statement::Insert(_) => "INSERT",
        Statement::Update { .. } => "UPDATE",
        Statement::Delete(_) => "DELETE",
        Statement::CreateView { .. } => "CREATE VIEW",
        Statement::CreateFunction { .. } => "CREATE FUNCTION",
        Statement::Query(_) => "SELECT",
        _ => "UNSUPPORTED",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const PREFIX: &str = "ext_chat_llama_";

    #[test]
    fn create_table_allowed() {
        let sql = "CREATE TABLE ext_chat_llama_threads (id TEXT PRIMARY KEY);";
        let report = validate_sql(sql, PREFIX);
        assert!(report.errors.is_empty(), "errors: {:?}", report.errors);
        assert_eq!(report.objects.len(), 1);
        assert_eq!(report.objects[0].name, "ext_chat_llama_threads");
    }

    #[test]
    fn create_index_allowed() {
        let sql = "CREATE INDEX ext_chat_llama_idx_threads ON ext_chat_llama_threads (id);";
        let report = validate_sql(sql, PREFIX);
        assert!(report.errors.is_empty(), "errors: {:?}", report.errors);
        assert_eq!(report.objects.len(), 1);
        assert_eq!(report.objects[0].name, "ext_chat_llama_idx_threads");
    }

    #[test]
    fn alter_table_add_column_allowed() {
        let sql = "ALTER TABLE ext_chat_llama_threads ADD COLUMN title TEXT;";
        let report = validate_sql(sql, PREFIX);
        assert!(report.errors.is_empty(), "errors: {:?}", report.errors);
    }

    #[test]
    fn drop_table_rejected() {
        let sql = "DROP TABLE ext_chat_llama_threads;";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors[0].contains("not allowed"));
    }

    #[test]
    fn insert_rejected() {
        let sql = "INSERT INTO ext_chat_llama_threads (id) VALUES ('1');";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors[0].contains("not allowed"));
    }

    #[test]
    fn create_view_rejected() {
        let sql = "CREATE VIEW ext_chat_llama_v AS SELECT 1;";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
    }

    #[test]
    fn prefix_violation_rejected() {
        let sql = "CREATE TABLE wrong_prefix_table (id TEXT PRIMARY KEY);";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("does not start with")));
    }

    #[test]
    fn cross_namespace_fk_rejected() {
        let sql = "CREATE TABLE ext_chat_llama_messages (\
            id TEXT PRIMARY KEY, \
            thread_id TEXT REFERENCES workflows(id)\
        );";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("crosses namespace boundary")));
    }

    #[test]
    fn same_namespace_fk_allowed() {
        let sql = "CREATE TABLE ext_chat_llama_messages (\
            id TEXT PRIMARY KEY, \
            thread_id TEXT REFERENCES ext_chat_llama_threads(id)\
        );";
        let report = validate_sql(sql, PREFIX);
        assert!(report.errors.is_empty(), "errors: {:?}", report.errors);
    }

    #[test]
    fn placeholder_expansion_works() {
        let sql = "CREATE TABLE {{prefix}}items (id TEXT PRIMARY KEY);";
        let report = validate_sql(sql, PREFIX);
        assert!(report.errors.is_empty(), "errors: {:?}", report.errors);
        assert_eq!(report.objects[0].name, "ext_chat_llama_items");
    }

    #[test]
    fn multiple_statements_validated() {
        let sql = "\
            CREATE TABLE ext_chat_llama_t1 (id TEXT PRIMARY KEY);\n\
            CREATE TABLE ext_chat_llama_t2 (id TEXT PRIMARY KEY);\n\
            CREATE INDEX ext_chat_llama_idx_t1 ON ext_chat_llama_t1 (id);\
        ";
        let report = validate_sql(sql, PREFIX);
        assert!(report.errors.is_empty(), "errors: {:?}", report.errors);
        assert_eq!(report.statements_checked, 3);
        assert_eq!(report.objects.len(), 3);
    }

    #[test]
    fn invalid_sql_returns_parse_error() {
        let sql = "NOT VALID SQL AT ALL;";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors[0].contains("parse error"));
    }

    #[test]
    fn table_constraint_fk_cross_namespace_rejected() {
        let sql = "CREATE TABLE ext_chat_llama_messages (\
            id TEXT PRIMARY KEY, \
            thread_id TEXT NOT NULL, \
            FOREIGN KEY (thread_id) REFERENCES workflows(id)\
        );";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("crosses namespace boundary")));
    }

    #[test]
    fn reserved_prefix_ext_sqlite_rejected() {
        let sql = "CREATE TABLE ext_sqlite_items (id TEXT PRIMARY KEY);";
        let report = validate_sql(sql, "ext_sqlite_");
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn reserved_prefix_ext_host_rejected() {
        let report = validate_sql("SELECT 1;", "ext_host_");
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn reserved_prefix_ext_nexus_rejected() {
        let report = validate_sql("SELECT 1;", "ext_nexus_");
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn reserved_prefix_ext_core_rejected() {
        let report = validate_sql("SELECT 1;", "ext_core_");
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("reserved")));
    }

    #[test]
    fn index_name_without_idx_prefix_rejected() {
        let sql = "CREATE INDEX ext_chat_llama_threads_updated ON ext_chat_llama_threads (id);";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("must match pattern")));
    }

    #[test]
    fn index_name_with_valid_idx_prefix_accepted() {
        let sql =
            "CREATE INDEX ext_chat_llama_idx_updated_at ON ext_chat_llama_threads (id);";
        let report = validate_sql(sql, PREFIX);
        assert!(report.errors.is_empty(), "errors: {:?}", report.errors);
    }

    #[test]
    fn index_name_suffix_too_long_rejected() {
        let long_suffix = "a".repeat(59);
        let index_name = format!("ext_chat_llama_idx_{long_suffix}");
        let sql = format!("CREATE INDEX {index_name} ON ext_chat_llama_threads (id);");
        let report = validate_sql(&sql, PREFIX);
        assert!(!report.errors.is_empty());
    }

    #[test]
    fn table_name_missing_prefix_activation_blocked() {
        let sql = "CREATE TABLE my_private_table (id TEXT PRIMARY KEY);";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("does not start with")));
    }

    #[test]
    fn fk_referencing_host_core_table_blocked() {
        let sql = "CREATE TABLE ext_chat_llama_messages (\
            id TEXT PRIMARY KEY, \
            wf_id TEXT REFERENCES workflows(id)\
        );";
        let report = validate_sql(sql, PREFIX);
        assert!(!report.errors.is_empty());
        assert!(report.errors.iter().any(|e| e.contains("crosses namespace boundary")));
    }
}
