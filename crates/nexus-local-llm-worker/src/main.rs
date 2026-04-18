use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    nexus_local_llm_worker::run().await
}
