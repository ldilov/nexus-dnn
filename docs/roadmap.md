# 🛣️ Roadmap

This roadmap focuses on platform direction, not speculative marketing.

## Guiding Principle

Future work should strengthen the host as the system authority while making extensions easier to build and operate.

## 1. MCP Control

### Goal

Turn MCP-facing capability into a clear host-owned control surface rather than a scattered set of one-off integrations.

### Why it matters

- keeps tool governance centralized
- makes capability exposure auditable
- avoids each extension inventing its own control semantics

### Desired outcome

The host becomes the obvious place to inspect, permit, coordinate, and route MCP-level actions.

## 2. Remote Workers

### Goal

Support worker execution beyond the local machine without abandoning host-owned lifecycle and policy checks.

### Why it matters

- lets heavy workloads move off the desktop
- opens the door to specialized machines and heterogeneous fleets
- keeps UX unified even when compute is not local

### Desired outcome

The host still issues leases, tracks runs, and owns audit trails, while workers may live on remote machines.

## 3. Extensions SDK

### Goal

Make extension authoring a first-class developer product surface.

### Why it matters

- lowers the cost of adding new capability
- reduces accidental complexity in manifests and runtime setup
- makes the boundary contract easier to understand and keep stable

### Desired outcome

An SDK story with scaffolding, stable contracts, and strong examples, instead of requiring each author to reverse-engineer the built-ins.

## What Should Not Happen

- extensions quietly becoming mini-hosts
- runtime control fragmenting by feature area
- storage and lifecycle policy leaking out of the host layer

## Present-Day Foundation

The current repo already contains the right ingredients for this roadmap:

- generic extension routing
- host-managed dependency installation
- backend runtime leases
- extension-local storage namespaces
- multiple first-party extension patterns to learn from

Those should be the base for the next platform iteration, not side systems to route around.
