mod theme_audit;

use anyhow::Result;

fn main() -> Result<()> {
    let mut args = std::env::args().skip(1);
    match args.next().as_deref() {
        Some("theme-audit") => theme_audit::run(),
        Some(other) => anyhow::bail!("unknown xtask command: {other}"),
        None => anyhow::bail!("missing xtask command"),
    }
}
