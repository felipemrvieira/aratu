# Technical Roadmap

The roadmap describes product outcomes, not fixed dates. Promotion between levels depends on evidence: tested user flows, documented safety controls, acceptable performance, and packaging viability. The detailed implementation order remains in `docs/execution-plan.md`.

## MVP — Safe PostgreSQL Exploration

**Outcome:** a user can connect to PostgreSQL, understand a database, inspect bounded data, run read-only SQL, stage edits, and review them before an explicit apply.

- PostgreSQL connection with test, timeout, cancellation, and environment classification.
- Schema explorer for schemas, tables, columns, constraints, indexes, and relationships.
- Paginated table view with filters and record detail.
- Monaco-based read-only query flow with visible limits and generated result metadata.
- Staged changes with before/after diff, generated parameterized SQL, risk context, and transactional apply.
- Review Changes experience aligned with `docs/stitch/datapilot_review_changes/`.
- Secure Electron boundary and authenticated Go sidecar lifecycle.
- Baseline automated tests, threat model, local logging, and development documentation.

**MVP is not:** a general SQL IDE, a universal connector platform, cloud collaboration, or autonomous AI execution.

## Beta — Local Workspace and Relationships

**Outcome:** repeated exploration becomes a coherent local workspace across PostgreSQL and SQLite.

- SQLite target-database connector.
- Relationship view built with React Flow.
- Saved views and local query history with retention and redaction rules.
- App-owned SQLite metadata store with versioned migrations.
- OS keyring integration for secrets.
- Basic engine-enforced safety rules and production safeguards.
- Improved accessibility, large-schema performance, diagnostics, packaging, and release feedback.

## Future — Extensible Data Ecosystem

These items require separate discovery and must not expand MVP implicitly:

- MySQL connector.
- Experimental read-only Oracle connector after licensing and distribution research.
- Incremental AI-guided operations for connection analysis, natural-language SQL, explanations, schema insights, integrity checks, PII discovery, safe-view/query suggestions, and safety-policy recommendations.
- Advanced ER diagram analysis and schema analytics.
- Plugin architecture with capability and trust model.
- Team/workspace mode with a defined encryption and authorization model.
- Export/import with streaming, type fidelity, and sensitive-data safeguards.
- Query `EXPLAIN` visualization and performance guidance.
- SQL Server research based on user demand and connector economics.
- Read-only Redis keyspace explorer as a candidate validation of heterogeneous connector capabilities.
- Apache Solr collection, schema, document, query, and facet exploration research.

Supporting multiple source types does not imply federated queries or cross-source joins. Federation, synchronization, and ETL require separate discovery and architecture decisions.

### AI delivery gates

AI capabilities should be introduced independently and evaluated against a non-AI workflow. Each capability requires:

- an explicit description of context sent to a model and where processing occurs;
- consent, redaction, retention, and provider configuration appropriate to sensitive database metadata;
- visible generated SQL or operation details before execution;
- deterministic engine validation after model output;
- no direct mutation path and no bypass of staged changes or production safeguards;
- failure behavior that leaves the core database workflow usable without AI;
- evaluation fixtures for correctness, unsafe suggestions, prompt injection, and dialect mismatch.

## Milestone Gates

Each milestone must demonstrate:

- documented scope and acceptance criteria;
- passing tests proportional to the operational risk;
- no unresolved critical security or data-loss risk;
- measured startup, memory, and large-result behavior;
- updated ADRs, risk register, execution plan, log, and handoff;
- visual consistency with the Stitch direction, with accessibility taking precedence where they conflict.
