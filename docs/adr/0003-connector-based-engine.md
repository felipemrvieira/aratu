# ADR 0003 — Use a Connector-Based Engine

**Status:** Accepted  
**Date:** 2026-06-22

## Context

Aratu plans PostgreSQL, SQLite, MySQL, and experimental Oracle support. These databases differ in metadata catalogs, type systems, quoting, pagination, transactions, driver behavior, and SQL syntax. A UI written directly against each driver would duplicate policy and leak dialect assumptions across the application.

## Decision

Organize the Go engine around database-specific connectors that implement normalized capabilities and declare their limitations. The service layer coordinates connector operations, policies, and DTOs; it does not hide meaningful dialect differences.

## Conceptual Interface

```go
type Connector interface {
    Connect(ctx context.Context, profile ConnectionProfile) (Session, error)
    Ping(ctx context.Context, session Session) error
    Introspect(ctx context.Context, session Session, scope Scope) (Catalog, error)
    PreviewRows(ctx context.Context, session Session, request PreviewRequest) (Page, error)
    ExecuteReadOnly(ctx context.Context, session Session, request QueryRequest) (Result, error)
    Capabilities(ctx context.Context, session Session) (Capabilities, error)
    Close(ctx context.Context, session Session) error
}
```

This interface is illustrative, not implementation-ready. Mutation transactions, streaming, cancellation behavior, quoting, error normalization, and capability granularity must be designed from real PostgreSQL use cases before being fixed in code.

## Planned Databases

1. PostgreSQL as the reference and first production-quality connector.
2. SQLite as the second connector and first test of the abstraction.
3. MySQL after MVP/Beta evidence.
4. Oracle as experimental and read-only until distribution and test constraints are resolved.

## Benefits

- Database-specific behavior has an explicit owner.
- The renderer consumes stable domain concepts and capabilities.
- Safety, timeouts, cancellation, and redaction can be applied centrally.
- Integration suites can target each database independently.
- Adding a connector does not require branching throughout the UI.

## Costs and Consequences

- Normalization can become a lowest-common-denominator abstraction.
- Capability negotiation adds contract and UI complexity.
- Every connector needs real database infrastructure and a version matrix.
- Vendor-specific features require typed extensions rather than hidden exceptions.
- Premature interface design may fail when SQLite tests PostgreSQL assumptions.

The implementation must begin with concrete PostgreSQL workflows. Generalize only after a second connector demonstrates which concepts are truly shared.

## Related Proposal

[ADR 0005](0005-capability-based-data-source-connectors.md) proposes extending this decision to heterogeneous sources such as Redis and Solr through composable capabilities. ADR 0003 remains accepted until that proposal is validated and accepted or rejected.
