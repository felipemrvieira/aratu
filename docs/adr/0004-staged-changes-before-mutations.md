# ADR 0004 — Stage Changes Before Mutations

**Status:** Accepted  
**Date:** 2026-06-22

## Context

Direct grid editing is convenient but can conceal generated SQL, affect the wrong row, overwrite concurrent work, or execute against production unintentionally. A confirmation dialog immediately before execution provides little opportunity to understand a multi-row change set.

Aratu's value proposition requires a mutation workflow in which intent remains inspectable and risk controls are enforced outside the renderer.

## Decision

User-initiated data edits are staged before database mutation. Staging captures row identity, original evidence, proposed typed values, connection/environment context, and operation order. The user reviews a before/after diff, risk assessment, and parameterized SQL representation before an explicit apply.

The Go engine validates the staged set and owns execution. It rechecks row identity and concurrency evidence, uses a transaction when supported, and rolls back the set on failure. Production policy may prohibit mutation regardless of UI confirmation.

Raw SQL execution remains a separate flow, but mutating SQL will be disabled initially and must later satisfy engine-enforced classification and review policy.

## Safety Rationale

- Separates exploration and editing from irreversible action.
- Makes affected records and generated operations visible as a set.
- Provides a place for environment, permission, and policy checks.
- Enables optimistic concurrency detection before overwrite.
- Supports transactional apply and a safe outcome history.

Staging reduces risk; it does not guarantee reversibility. External side effects, triggers, non-transactional engines, and concurrent changes must be represented honestly.

## UX Impact

### Positive

- Users can batch related edits and inspect a coherent diff.
- The Review Changes screen communicates production context and risk.
- Generated SQL increases transparency and learning.
- Conflicts can be resolved before partial manual cleanup.

### Negative

- Simple edits require an additional step.
- Stale changes and validation errors need clear resolution flows.
- Users may assume a preview is an exact guarantee if caveats are unclear.

## Technical Impact

- Requires a typed staged-change domain model and lifecycle.
- Stable row identity and original-value/version evidence are mandatory.
- SQL generation must be connector-specific and parameterized.
- Apply needs transaction, ordering, cancellation, conflict, and rollback semantics.
- Local history needs retention and sensitive-data redaction policies.
- UI state must survive navigation without silently persisting secrets.
- Tables without primary or unique keys require restricted or disabled editing.

## Consequences

Mutation features will take longer than direct editable-grid writes, but this complexity is central product behavior rather than optional polish. MVP scope must protect this workflow from being replaced by a shortcut that bypasses the engine.
