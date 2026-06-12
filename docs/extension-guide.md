# 🧩 Extension Guide

This is the practical authoring guide for creating new `nexus-dnn` extensions against the current architecture.

## Start With The Boundary

Build your extension as a capability provider, not as a second host.

The host remains responsible for:

- registration and validation
- API mounting
- storage application
- dependency installation
- runtime leases and process policy

## What You Can Add

- operators
- recipes
- layouts and UI contributions
- static web assets and custom elements
- storage migrations
- backend runtime declarations
- extension-specific routes

## Recommended Package Shape

```text
my-extension/
├── manifest.yaml
├── operators/
├── recipes/
├── ui/
├── storage/
├── web/dist/
├── worker/
└── bin/
```

Not every extension needs every directory, but `manifest.yaml` is the non-negotiable entrypoint.

## Manifest Responsibilities

Your manifest should declare only what the host needs to reason about:

- identity and compatibility
- runtime family and entrypoint
- dependency steps
- operators and recipes
- optional UI
- optional storage
- optional backend runtimes

## Current Design Patterns In This Repo

| Pattern | Where to study it |
|---------|-------------------|
| Host-rendered chat/layout surface | `extensions/builtin/local-llm` |
| Custom-element UI bundle | `extensions/builtin/emotion-tts` |
| Host-managed video runtime profiles | `extensions/builtin/nexus-video-ltx23` |
| Large model-artifact dependency graph | `extensions/builtin/svi2-pro` |

## Authoring Rules

1. Prefer declarative contributions over special-case host patches.
2. Assume the host will validate and mount what you declare.
3. Keep extension routes under the generic extension router.
4. Treat storage as namespaced extension data, not shared host schema.
5. If you need inference backends, prefer host-managed runtime declarations and leases.

## UI Guidance

An extension UI can be as light or heavy as needed:

- YAML layouts only
- YAML layouts plus host contributions
- static assets plus custom elements

What stays true in all cases:

- the host serves the assets
- the host decides where they mount
- the host owns the shell around them

## Storage Guidance

Use extension storage only for extension-owned state. Host-owned concepts like workflows, runs, artifacts, and runtime installation state should stay in host domains unless there is a clear extension-local need.

## API Guidance

If you expose routes, think of them as an extension surface behind a host gateway:

```text
/api/v1/extensions/{your-extension-id}/...
```

That lets the platform keep one consistent API and one consistent authority model.

## Before You Build One

Read:

- [extension-internals.md](extension-internals.md)
- [architecture.md](architecture.md)
- [api-reference.md](api-reference.md)

Then inspect one built-in extension that matches the style you want to create.
