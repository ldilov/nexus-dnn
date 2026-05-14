pub struct Migration {
    pub version: u32,
    pub name: &'static str,
    pub sql: &'static str,
}

pub const MIGRATIONS: &[Migration] = &[
    Migration {
        version: 1,
        name: "ltx_video_projects",
        sql: include_str!("../../storage/migrations/001_ltx_video_projects.sql"),
    },
    Migration {
        version: 2,
        name: "ltx_video_runs_segments",
        sql: include_str!("../../storage/migrations/002_ltx_video_runs_segments.sql"),
    },
    Migration {
        version: 3,
        name: "constraints_and_indexes",
        sql: include_str!("../../storage/migrations/003_constraints_and_indexes.sql"),
    },
];
