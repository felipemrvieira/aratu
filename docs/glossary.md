# Glossary

## Aratu

The product name and mangrove metaphor for navigating interconnected data structures with precision and minimal disruption.

## Local-first

An operating model in which core functionality and user-owned metadata run locally, without requiring a cloud account. Any remote processing is explicit and optional.

## Sidecar

A companion process launched and supervised by the desktop application. In Aratu, the Go engine sidecar owns database access and policy enforcement.

## Connector

A database-specific adapter that implements normalized engine capabilities while declaring dialect-specific behavior and limitations.

## Schema introspection

Reading database metadata to discover schemas, tables, columns, indexes, constraints, types, and relationships without relying on manually supplied models.

## Staged changes

Proposed data mutations collected locally for validation, diff review, SQL preview, risk assessment, and explicit apply rather than immediate execution.

## Query safety

Engine-enforced classification, limits, permissions, environment policies, and review rules that reduce the likelihood and impact of unsafe SQL. It is risk reduction, not a guarantee that arbitrary SQL is harmless.

## Production safeguards

Stricter controls activated for a connection classified as production, such as read-only defaults, shorter limits, stronger confirmation, restricted edit modes, and auditable review.

## Read-only query

A statement accepted by the engine's dialect-aware policy as non-mutating within the configured context. Merely beginning with `SELECT` is insufficient proof for all dialects and functions.

## Metadata store

Aratu's app-owned local SQLite database for profiles, preferences, history, saved views, cache metadata, and safe audit records. It is separate from a user-selected SQLite target database.

## Relationship view

A graph-oriented representation of tables and foreign-key relationships, with inspectable nodes, edges, and optional join-query generation.

## Data ecosystem

The connected set of databases, schemas, tables, relationships, workloads, environments, and human practices that give data its operational context.

## Electron main process

The trusted Node.js process that manages windows, operating-system integration, secrets access, IPC, and the Go sidecar lifecycle.

## Preload

The constrained Electron script that bridges approved typed capabilities from main to the isolated renderer through `contextBridge`.

## Renderer

The React web application displayed inside an Electron window. It owns presentation but receives no unrestricted Node.js or database capability.

## Go engine

The local sidecar that implements connector sessions, introspection, query policies, staged mutations, metadata services, cancellation, and normalized errors.
