use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct StorageContribution {
    pub spec_version: String,
    pub engine: String,
    pub namespace: NamespaceDeclaration,
    pub migrations: MigrationDeclaration,
    pub sql_profile: SqlProfileDeclaration,
    pub uninstall: Option<UninstallDeclaration>,
    pub runtime_access: Option<RuntimeAccessDeclaration>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct NamespaceDeclaration {
    pub alias: String,
    pub prefix_mode: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MigrationDeclaration {
    pub strategy: String,
    pub files: Vec<MigrationFileRef>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MigrationFileRef {
    pub id: String,
    pub path: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct SqlProfileDeclaration {
    pub profile: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct UninstallDeclaration {
    pub policy: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RuntimeAccessDeclaration {
    pub mode: Option<String>,
}
