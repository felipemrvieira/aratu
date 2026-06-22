# Aratu Engine

This directory will contain the local Go sidecar responsible for database connectivity and policies.

- `cmd/aratu-engine`: executable entrypoint.
- `internal/app`: composition and lifecycle.
- `internal/connectors`: database-specific adapters.
- `internal/introspection`: normalized schema discovery.
- `internal/querysafe`: query classification and safeguards.
- `internal/staged`: mutation staging, review, and apply workflow.
- `internal/secrets`: credential-provider boundary.
- `internal/store`: local metadata persistence.
- `internal/telemetry`: structured local diagnostics and opt-in telemetry boundary.

No Go module or executable exists yet. Phase 2 will define module identity, transport, health checks, logging, and shutdown behavior.
