# ADR 0001 — Use a Monorepo

**Status:** Accepted  
**Date:** 2026-06-22

## Context

Aratu comprises an Electron application, a Go engine, shared TypeScript packages, cross-process contracts, release automation, and extensive documentation. These parts evolve together and must remain compatible, especially when a desktop build packages a specific sidecar and contract version.

## Decision

Maintain the product in one repository with explicit top-level ownership boundaries:

- `apps/desktop` for Electron main, preload, and renderer;
- `engine` for the Go sidecar;
- `packages/contracts` for cross-process contract sources and generated artifacts;
- `packages/ui` and `packages/shared` for justified TypeScript reuse;
- `docs`, `brand`, and `scripts` for project-wide artifacts.

The monorepo does not imply one language toolchain. Go and TypeScript keep native build and dependency management, coordinated by a thin root workflow selected later.

## Alternatives Considered

### Separate repositories by runtime

Would isolate permissions and release cycles but increases coordination, makes atomic contract changes harder, and obscures which engine binary belongs to a desktop release.

### Desktop-only repository with engine embedded as a submodule

Provides separation but adds submodule friction and still requires external compatibility management.

### Single Electron/Node application

Reduces repository structure but eliminates the selected engine boundary and is addressed separately in ADR 0002.

## Positive Consequences

- Atomic changes across UI, contracts, engine, documentation, and packaging.
- One review surface and one traceable release commit.
- Easier end-to-end testing and contributor onboarding.
- Architectural documentation stays adjacent to implementation.
- Shared CI can verify desktop/engine compatibility.

## Negative Consequences

- CI and local tooling must understand multiple ecosystems.
- Repository growth can increase checkout and pipeline cost.
- Ownership boundaries may erode without dependency rules.
- A root task runner or workspace tool may add complexity.

## Follow-up

Choose package manager and monorepo task orchestration only when the desktop workspace is initialized. Enforce boundaries through imports, build targets, and ownership documentation rather than relying on directory names alone.
