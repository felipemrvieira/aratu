# ADR 0005 — Capability-Based Connectors for Heterogeneous Data Sources

**Status:** Proposed  
**Date:** 2026-06-22

## Context

ADR 0003 establishes a connector-based engine, but its conceptual interface and terminology are centered on relational databases: schemas, tables, rows, SQL queries, quoting, and transactions.

Aratu's broader product direction is to connect to and visually explore heterogeneous data sources, including Redis and Apache Solr, in addition to relational databases. The Stitch connection concepts already include Redis and MongoDB as possible engines. These systems expose different resource and operation models:

- relational databases expose catalogs, schemas, tables, rows, constraints, and SQL;
- Redis exposes logical databases or cluster keyspaces, keys, data structures, TTL, memory usage, streams, and commands;
- Solr exposes collections, cores, schemas, fields, documents, queries, facets, and administrative APIs;
- document databases expose databases, collections, documents, indexes, and aggregation pipelines.

Treating every source as tables and SQL would create misleading abstractions, obscure native capabilities, and weaken source-specific safety controls.

## Proposed Decision

Evolve the connector model established by ADR 0003 into a **capability-based data source connector** model.

A small common connector contract should own discovery and session lifecycle. Optional, composable capability interfaces should represent supported exploration and operation models. The UI must enable workspaces and actions from declared capabilities rather than from connector-name conditionals.

This ADR remains proposed until concrete PostgreSQL and at least one non-relational connector validate the capability boundaries. ADR 0003 remains the accepted decision in the meantime.

## Conceptual Model

```go
type Connector interface {
    Descriptor() ConnectorDescriptor
    Open(ctx context.Context, config ConnectionConfig) (Session, error)
}

type Session interface {
    Ping(ctx context.Context) error
    Capabilities() CapabilitySet
    Close(ctx context.Context) error
}
```

Illustrative optional capabilities:

```go
type ResourceBrowser interface {
    ListNamespaces(ctx context.Context, req NamespaceRequest) (NamespacePage, error)
    ListResources(ctx context.Context, req ResourceRequest) (ResourcePage, error)
    DescribeResource(ctx context.Context, ref ResourceRef) (ResourceDescription, error)
}

type TabularReader interface {
    PreviewRows(ctx context.Context, req RowRequest) (RowPage, error)
}

type KeyValueBrowser interface {
    ScanKeys(ctx context.Context, req KeyScanRequest) (KeyPage, error)
    GetValue(ctx context.Context, ref KeyRef) (Value, error)
}

type SearchBrowser interface {
    Search(ctx context.Context, req SearchRequest) (SearchResult, error)
    Facets(ctx context.Context, req FacetRequest) (FacetResult, error)
}
```

These names and shapes are exploratory. They must not be copied into production code without validation against real drivers, pagination semantics, cancellation, value sizes, cluster behavior, error models, and security requirements.

## Source-Specific Workspaces

Aratu should share connection management, navigation, history, diagnostics, environment classification, and AI entry points while presenting a workspace appropriate to each source:

- **Relational:** schema, table, row, relationship, and SQL explorer.
- **Redis:** keyspace, key type, value, TTL, memory, and bounded scan explorer.
- **Solr:** collection/core, schema, document, query, facet, and index-health explorer.
- **Document:** collection, document, index, and aggregation explorer.

The UI should not label Redis keys as rows or Solr collections as SQL tables merely to reuse an existing screen.

## Safety Implications

Safety policies must also be capability- and source-aware:

- Redis exploration uses bounded `SCAN`-style operations and avoids blocking key enumeration. Destructive and administrative commands such as flush operations are denied by default.
- Solr separates read queries from update, schema, config, collection, and administrative operations.
- Relational sources retain dialect-aware query classification, transaction support, and staged mutations.
- AI-generated operations remain visible and are validated by deterministic, source-specific policy before execution.

Staged changes may not apply uniformly to every source. Each mutation-capable connector must define identity, concurrency, atomicity, preview, rollback, and audit semantics honestly.

## Alternatives Considered

### Force all sources into a relational model

This maximizes UI reuse but misrepresents native concepts, encourages inefficient operations, and creates false guarantees about pagination, transactions, and relationships.

### Build a completely independent engine per source family

This preserves native behavior but duplicates session lifecycle, diagnostics, security plumbing, contracts, packaging, and common UI infrastructure.

### Use one large connector interface with every operation

This appears uniform but produces optional methods, unsupported-operation errors, weak compile-time guarantees, and a lowest-common-denominator design.

## Consequences

### Positive

- Redis, Solr, document stores, and future sources can retain native mental models.
- Capability negotiation becomes a stable basis for conditional UI and policy.
- Common lifecycle and security infrastructure remain reusable.
- A non-relational connector provides a stronger test of the architecture than a second SQL dialect alone.

### Negative

- Contracts and UI composition become more complex.
- Capability granularity can fragment or become difficult to version.
- Shared history, saved views, and AI context need source-aware representations.
- Integration testing requires heterogeneous infrastructure and version matrices.
- Product scope can expand faster than the core PostgreSQL experience matures.

## Scope Boundary

This proposal covers connecting to and exploring different source types. It does **not** imply federated queries, cross-source joins, synchronization, ETL, or a virtual unified database. Those capabilities require separate product discovery and architectural decisions covering consistency, memory, data movement, credentials, and sensitive-data policy.

## Validation Plan

1. Implement the first PostgreSQL vertical slice without prematurely fixing a universal interface.
2. Record which lifecycle, browsing, pagination, and safety concepts are genuinely reusable.
3. Prototype a read-only Redis connector as the first heterogeneous validation candidate.
4. Evaluate Solr after the resource and search capability contracts are understood.
5. Accept, revise, or reject this ADR based on implementation evidence.
