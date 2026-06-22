# Architecture

## Overview

Aratu is a local-first desktop system split into a presentation application and a dedicated data engine. The split protects database access from the renderer, gives connector and safety code a clear home, and allows the engine to be tested independently from Electron.

```txt
React Renderer
  ↓ typed, allowlisted calls
Electron Preload API
  ↓ IPC
Electron Main Process
  ↓ authenticated local transport
Go Engine Sidecar
  ↓ connector interface
Database Connectors
  ↓
PostgreSQL / SQLite / MySQL / Oracle
```

SQLite used as Aratu's metadata store is separate from SQLite databases opened through the connector layer.

## Components and Responsibilities

### React renderer

Owns views, navigation, data grids, editor integration, loading/error states, and review interactions. TanStack Query will manage engine-backed server state; Zustand will hold ephemeral UI state. The renderer must not receive raw credentials, spawn processes, access Node APIs, or connect directly to user databases.

### Electron preload

Exposes a narrow, typed, versioned API through `contextBridge`. It validates call shape, maps renderer requests to approved IPC operations, and provides no generic filesystem, process, shell, or unrestricted IPC access.

### Electron main process

Owns windows, application lifecycle, OS integrations, secure credential retrieval, sidecar startup and termination, transport authentication, crash handling, and packaging paths. It is the desktop trust boundary between untrusted web content and local capabilities.

### Go engine sidecar

Runs as a child process managed by Electron. It owns connection sessions, connector capabilities, schema introspection, query classification, execution limits, cancellation, staged mutations, transaction boundaries, normalized errors, local metadata access, and structured diagnostics.

Go is selected for a small distributable runtime, explicit concurrency and cancellation, mature database libraries, and strong isolation of database behavior from UI concerns. Per ADR 0006, the sidecar binds HTTP/JSON only to `127.0.0.1` on an operating-system-assigned port, authenticates Electron main with a per-run token delivered through `stdin`, emits one readiness event through `stdout`, sends logs to `stderr`, and shuts down with the desktop app.

### Connectors

Each connector adapts one database dialect to normalized engine capabilities. PostgreSQL is first, SQLite second, MySQL future, and Oracle experimental/read-only until its driver, distribution, licensing, and test strategy are accepted.

### Local metadata store

An app-owned SQLite database will store connection profiles without secrets, preferences, query history, saved views, staged-change history, and schema cache metadata. Migrations must be versioned. Passwords and tokens belong in the operating-system keyring through the secrets boundary.

## Communication Model

The conceptual request path is:

1. The renderer calls an allowlisted preload method using a shared contract.
2. Preload forwards the request over a named Electron IPC channel.
3. Main adds trusted context where required and calls the local engine client.
4. The engine validates the request, authorization context, connection state, limits, and query policy.
5. A connector performs the database operation with timeout and cancellation.
6. Results return as bounded, normalized DTOs; errors are structured and redact secrets.

Shared payloads are defined with JSON Schema Draft 2020-12 under `packages/contracts`. Electron main assigns request IDs, enforces client timeouts, and translates allowlisted renderer operations into authenticated engine requests. Long operations expose operation IDs for explicit cancellation backed by Go contexts.

Initial result APIs use server-side bounded pagination and enforce payload limits. The renderer must never assume that an entire table can fit in memory. Streaming is deliberately deferred; it requires a later ADR covering backpressure, partial failure, cancellation, and memory limits.

## Architectural Boundaries

- UI code does not import Electron main or engine implementation details.
- Preload exposes capability-specific methods, never a general IPC bridge.
- Electron main manages OS capabilities but does not contain SQL business rules.
- The engine does not contain UI or Electron-specific behavior.
- Connector-specific SQL remains inside connector packages unless represented by an explicit dialect abstraction.
- Shared contracts contain data shapes and versioning, not business logic.
- App metadata and target database data use distinct repositories and credentials.
- AI providers, when introduced, cannot receive schema or row data without explicit policy and user action.

## Local-First Model

The application remains useful without an Aratu account or cloud service. Connections go from the user's machine to the configured database. Metadata persists locally. Telemetry is disabled by default until a transparent opt-in design exists. Features that require remote processing must identify what data leaves the machine and offer a local-only path where feasible.

## Security Strategy

- Electron uses context isolation, sandboxing where compatible, disabled Node integration, a restrictive Content Security Policy, and validated IPC payloads.
- The sidecar accepts only authenticated local calls and must not expose a LAN-accessible service.
- The engine token is generated per run, delivered through child `stdin`, retained only by Electron main and the engine, and never exposed to renderer state or logs.
- Secrets are referenced by opaque identifiers and retrieved from the OS keyring only in trusted layers.
- Logs, errors, history, and telemetry redact credentials, bind values, and sensitive row data by default.
- Connections carry an environment classification such as development, staging, or production.
- Query execution enforces statement class, timeout, row limit, cancellation, and connector capability in the engine.
- Production mutations require stronger policy and explicit confirmation; renderer warnings alone are not controls.
- Dependencies, packaged binaries, and release artifacts require integrity and vulnerability checks.

The broader threat model and concrete renderer IPC schemas remain Phase 1-3 deliverables. Engine transport controls and lifecycle are defined in ADR 0006.

## Connector Strategy

A conceptual connector exposes capabilities rather than promising identical behavior:

```txt
Connector
  Connect / Ping / Close
  ListSchemas / ListTables / DescribeTable
  ListConstraints / ListRelationships / ListIndexes
  PreviewRows / ExecuteReadOnly
  BeginMutationTransaction (when supported and allowed)
  Capabilities / Dialect / NormalizeError
```

Requests and results use normalized domain types while allowing typed vendor extensions. Capability negotiation prevents the UI from offering unavailable actions. Each real connector needs integration tests against supported database versions, including permissions, cancellation, timeouts, and error normalization.

## Staged Changes Strategy

Grid edits do not immediately mutate the database. The renderer produces an intent containing the source identity, primary-key predicate, original value/version evidence, proposed value, and type information. The engine validates and stores a staged set, produces a deterministic diff and parameterized SQL preview, and assesses risk.

Apply occurs in a transaction when supported. Before mutation, the engine revalidates identity and optimistic-concurrency evidence to detect stale rows. A failed set rolls back. Audit history stores safe metadata and outcomes, not secrets or unrestricted sensitive values. Tables without a stable key require restricted behavior or explicit policy.

## Deployment and Lifecycle

Electron packages the platform-specific Go binary as an application resource. Main selects the correct binary, starts it with a constrained environment and ephemeral port, sends the per-run authentication token through `stdin`, validates structured readiness and protocol compatibility, monitors exit, and performs authenticated graceful shutdown. CI must build, test, checksum, and package binaries for every supported OS/architecture combination.

## Future Decisions

- Package manager, monorepo tooling, and supported Node/Go versions.
- JSON Schema code-generation and runtime-validation tooling for TypeScript and Go.
- Backward-compatibility window after more than one protocol version exists.
- Whether measured workloads justify HTTP streaming or a different transport.
- Schema cache invalidation and metadata migration strategy.
- SQL parsing libraries and dialect-aware safety model.
- Supported platforms and code-signing/notarization scope.
- Result streaming, memory budgets, and export architecture.
- Telemetry consent, retention, and redaction policy.
- AI provider boundary and prompt/data governance.
