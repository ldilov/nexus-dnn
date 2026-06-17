use nexus_storage::{Database, ExtensionRecord, RecipeRecord, SqliteDatabase, WorkflowRecord};

async fn fresh_db() -> SqliteDatabase {
    SqliteDatabase::new("sqlite::memory:").await.unwrap()
}

async fn seed_extension(db: &SqliteDatabase, id: &str, version: &str) {
    let ext = ExtensionRecord {
        id: id.into(),
        name: Some(id.into()),
        version: version.into(),
        description: None,
        publisher: None,
        host_api_compat: "1.0.0".into(),
        protocol_compat: "1.0.0".into(),
        runtime_family: "builtin".into(),
        entrypoint: ".".into(),
        capabilities: None,
        status: "enabled".into(),
        directory: "extensions/builtin/fake".into(),
        installed_at: "2026-04-14T00:00:00Z".into(),
        recipe_count: Some(1),
        ui_contribution_count: Some(0),
        validation_errors: None,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: None,
        icon_symbol: None,
        icon_svg: None,
    };
    db.insert_extension(&ext).await.unwrap();
}

fn workflow_with_two_nodes(id: &str, extension_id: &str) -> WorkflowRecord {
    let nodes = serde_json::json!([
        {
            "id": "compose_prompt",
            "operator": "llm.prompt.compose@1.0.0",
            "stage": "generate",
            "inputs": {
                "user_message": { "from": "input:user_prompt" }
            },
            "config": {}
        },
        {
            "id": "chat_turn",
            "operator": "llm.chat.turn@1.0.0",
            "stage": "generate",
            "inputs": {
                "prompt": { "from": "compose_prompt:prompt" }
            },
            "config": {}
        }
    ]);
    let edges = serde_json::json!([
        {
            "source_node": "compose_prompt",
            "source_port": "prompt",
            "target_node": "chat_turn",
            "target_port": "prompt"
        }
    ]);
    WorkflowRecord {
        id: id.into(),
        title: "Local Chat".into(),
        version: "1.0.0".into(),
        inputs: Some(
            serde_json::to_string(&serde_json::json!([
                { "name": "user_prompt", "type": "text/prompt" }
            ]))
            .unwrap(),
        ),
        outputs: Some(
            serde_json::to_string(&serde_json::json!([
                { "name": "assistant_message", "from": "chat_turn:assistant_message" }
            ]))
            .unwrap(),
        ),
        nodes: serde_json::to_string(&nodes).unwrap(),
        edges: serde_json::to_string(&edges).unwrap(),
        stages: Some(
            serde_json::to_string(&serde_json::json!([
                { "id": "generate", "label": "Generate" }
            ]))
            .unwrap(),
        ),
        created_at: "2026-04-14T00:00:00Z".into(),
        updated_at: "2026-04-14T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: Some(extension_id.into()),
        extension_version: Some("1.0.0".into()),
        extension_version_first_seen: Some("2026-04-14T00:00:00Z".into()),
    }
}

#[tokio::test]
async fn recipe_references_workflow_with_attributed_nodes() {
    let db = fresh_db().await;
    seed_extension(&db, "nexus.chatllm", "1.0.0").await;

    let wf = workflow_with_two_nodes("local_chat_basic", "nexus.chatllm");
    db.insert_workflow(&wf).await.unwrap();

    let recipe = RecipeRecord {
        id: "local_chat".into(),
        version: "1.0.0".into(),
        display_name: "Local Chat".into(),
        summary: "Chat against a local model".into(),
        category: "LLM".into(),
        extension_id: "nexus.chatllm".into(),
        extension_version: "1.0.0".into(),
        workflow_template_ref: "local_chat_basic".into(),
        thumbnail: None,
        input_summary: None,
        bindings: "[]".into(),
        created_at: "2026-04-14T00:00:00Z".into(),
    };
    db.insert_recipe(&recipe).await.unwrap();

    // 1. Recipe and workflow share the same originating extension.
    let loaded_wf = db.get_workflow("local_chat_basic").await.unwrap();
    assert_eq!(loaded_wf.extension_id.as_deref(), Some("nexus.chatllm"));
    assert_eq!(recipe.extension_id, "nexus.chatllm");

    // 2. Recipe.workflow_template_ref resolves to a real workflow row.
    let pointed_to = db.get_workflow(&recipe.workflow_template_ref).await;
    assert!(
        pointed_to.is_ok(),
        "recipe references a non-existent workflow"
    );

    // 3. Workflow nodes round-trip and carry wiring the recipe depends on.
    let nodes: serde_json::Value = serde_json::from_str(&loaded_wf.nodes).unwrap();
    let array = nodes.as_array().expect("nodes is a json array");
    assert_eq!(array.len(), 2);
    let ids: Vec<&str> = array.iter().map(|n| n["id"].as_str().unwrap()).collect();
    assert!(ids.contains(&"compose_prompt"));
    assert!(ids.contains(&"chat_turn"));

    // 4. Edge preserves the connection compose_prompt.prompt → chat_turn.prompt
    //    which is what makes the recipe's chat turn actually depend on the
    let edges: serde_json::Value = serde_json::from_str(&loaded_wf.edges).unwrap();
    let e = &edges.as_array().unwrap()[0];
    assert_eq!(e["source_node"], "compose_prompt");
    assert_eq!(e["source_port"], "prompt");
    assert_eq!(e["target_node"], "chat_turn");
    assert_eq!(e["target_port"], "prompt");
}

#[tokio::test]
async fn user_edit_preserves_recipe_linkage() {
    let db = fresh_db().await;
    seed_extension(&db, "nexus.chatllm", "1.0.0").await;

    let wf = workflow_with_two_nodes("local_chat_basic", "nexus.chatllm");
    db.insert_workflow(&wf).await.unwrap();

    // User edits the workflow: disconnect chat_turn.prompt (simulating a broken
    // graph) and mark as user-edited. Attribution must survive.
    let mut edited = wf.clone();
    edited.user_edited_at = Some("2026-04-14T10:00:00Z".into());
    edited.nodes = serde_json::to_string(&serde_json::json!([
        {
            "id": "compose_prompt",
            "operator": "llm.prompt.compose@1.0.0",
            "stage": "generate",
            "inputs": {},
            "config": {}
        }
    ]))
    .unwrap();
    edited.edges = "[]".into();
    db.update_workflow(&edited).await.unwrap();

    let after = db.get_workflow("local_chat_basic").await.unwrap();
    assert_eq!(
        after.extension_id.as_deref(),
        Some("nexus.chatllm"),
        "user edit must not drop extension attribution"
    );
    assert!(
        after.user_edited_at.is_some(),
        "user_edited_at must be stamped"
    );

    // Recipe still points at the workflow — the recipe's existence is
    // decoupled from the specific node set.
    let recipe = RecipeRecord {
        id: "local_chat".into(),
        version: "1.0.0".into(),
        display_name: "Local Chat".into(),
        summary: "".into(),
        category: "LLM".into(),
        extension_id: "nexus.chatllm".into(),
        extension_version: "1.0.0".into(),
        workflow_template_ref: "local_chat_basic".into(),
        thumbnail: None,
        input_summary: None,
        bindings: "[]".into(),
        created_at: "2026-04-14T00:00:00Z".into(),
    };
    db.insert_recipe(&recipe).await.unwrap();
    let resolved = db
        .get_workflow(&recipe.workflow_template_ref)
        .await
        .unwrap();
    assert_eq!(resolved.id, "local_chat_basic");
}

#[tokio::test]
async fn uninstalled_extension_leaves_workflow_orphaned_with_attribution_intact() {
    let db = fresh_db().await;
    seed_extension(&db, "nexus.chatllm", "1.0.0").await;

    let wf = workflow_with_two_nodes("local_chat_basic", "nexus.chatllm");
    db.insert_workflow(&wf).await.unwrap();

    // User edits, then extension is "uninstalled" at the policy layer
    // (DB row would remain for integrity — disabled extensions keep their
    let mut edited = wf.clone();
    edited.user_edited_at = Some("2026-04-14T10:00:00Z".into());
    db.update_workflow(&edited).await.unwrap();

    let loaded = db.get_workflow("local_chat_basic").await.unwrap();
    assert_eq!(loaded.extension_id.as_deref(), Some("nexus.chatllm"));
    assert!(loaded.user_edited_at.is_some());
}
