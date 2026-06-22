# Architecture Decision Records

ADRs preserve decisions that materially constrain implementation. They are historical records: once accepted, change status or add a superseding ADR instead of silently rewriting the outcome.

## Status Values

- **Proposed:** under evaluation; implementation must not assume acceptance.
- **Accepted:** current architectural direction.
- **Superseded:** replaced by another ADR, linked explicitly.
- **Deprecated:** retained for history but no longer recommended.

## Index

| ADR | Status | Decision |
| --- | --- | --- |
| [0001](0001-use-monorepo.md) | Accepted | Use a monorepo |
| [0002](0002-use-electron-with-go-sidecar.md) | Accepted | Use Electron with a Go sidecar |
| [0003](0003-connector-based-engine.md) | Accepted | Build the engine around connector capabilities |
| [0004](0004-staged-changes-before-mutations.md) | Accepted | Stage and review changes before mutations |
| [0005](0005-capability-based-data-source-connectors.md) | Proposed | Extend connectors to heterogeneous data sources through capabilities |

## Creating an ADR

Use the next four-digit sequence and a descriptive kebab-case filename. Include date, status, context, decision, alternatives, consequences, risks, and links to superseded records. Add it to this index, the execution log, and the handoff when it changes immediate work.
