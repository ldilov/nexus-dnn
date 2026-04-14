CREATE TABLE ext_local_llm_rag_corpora (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    state TEXT NOT NULL DEFAULT 'created',
    chunk_count INTEGER,
    document_count INTEGER,
    embedding_model_id TEXT REFERENCES ext_local_llm_model_installs(id),
    index_manifest_artifact_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_rag_documents (
    id TEXT PRIMARY KEY NOT NULL,
    corpus_id TEXT NOT NULL REFERENCES ext_local_llm_rag_corpora(id),
    source_artifact_id TEXT,
    source_path TEXT,
    normalized_text_artifact_id TEXT,
    metadata_json TEXT,
    chunk_count INTEGER,
    created_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_retrieval_traces (
    id TEXT PRIMARY KEY NOT NULL,
    session_id TEXT REFERENCES ext_local_llm_chat_sessions(id),
    run_id TEXT,
    corpus_id TEXT NOT NULL REFERENCES ext_local_llm_rag_corpora(id),
    query_text TEXT NOT NULL,
    top_k INTEGER NOT NULL,
    trace_artifact_id TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE INDEX ext_local_llm_idx_rag_docs_corpus ON ext_local_llm_rag_documents(corpus_id);
CREATE INDEX ext_local_llm_idx_rag_corpora_state ON ext_local_llm_rag_corpora(state);
CREATE INDEX ext_local_llm_idx_traces_session ON ext_local_llm_retrieval_traces(session_id);
CREATE INDEX ext_local_llm_idx_traces_run ON ext_local_llm_retrieval_traces(run_id);
CREATE INDEX ext_local_llm_idx_traces_corpus ON ext_local_llm_retrieval_traces(corpus_id);
