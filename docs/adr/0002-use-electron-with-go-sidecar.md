# ADR 0002 — Use Electron with a Go Sidecar

**Status:** Accepted  
**Date:** 2026-06-22

## Context

Aratu needs a sophisticated desktop UI, SQL editor, high-density grids, relationship graphs, OS integration, secure credential access, database drivers, cancellation, and cross-platform packaging. Database policies should remain independent from renderer code and should be testable without the UI.

No framework removes packaging and security work. The choice prioritizes UI ecosystem fit, explicit trust boundaries, connector maintainability, and portfolio-level architectural clarity.

## Decision

Use Electron for the desktop shell, React and TypeScript for the renderer, and a Go executable as a local sidecar supervised by Electron main.

The renderer communicates only through an allowlisted preload API. Electron main owns the sidecar lifecycle and talks to it over an authenticated local transport. The Go engine owns database sessions, introspection, query safety, staged changes, transactions, and local metadata services.

The specific HTTP/gRPC-style protocol, endpoint, authentication, version handshake, and recovery behavior remain a required follow-up ADR.

## Alternatives Considered

### Wails + Go

Wails offers tight Go integration and potentially smaller distribution. It was not selected because Electron's frontend ecosystem, process model, mature tooling, and direct compatibility with Monaco, React Flow, shadcn/ui, and common web debugging provide lower UI delivery risk. Wails remains a credible option if Electron packaging or footprint proves unacceptable.

### Tauri + Rust

Tauri can provide smaller binaries and a strong permission model. It adds Rust expertise and a second systems-language direction while the planned connector engine is Go. The reduced runtime footprint does not currently offset team/tooling complexity.

### Electron + Node Only

This has the simplest development topology and the broad npm ecosystem. It would place database drivers, long-running queries, policy enforcement, and UI host concerns in the same runtime family, weakening isolation and making a reusable engine boundary less explicit.

## Why This Option

- The UI stack matches the product's data-heavy interaction requirements.
- Go provides explicit cancellation/concurrency and mature database access.
- Process separation limits renderer and UI-host responsibility.
- The engine can be integration-tested headlessly.
- Connector and safety logic can evolve without coupling to React.
- The architecture visibly demonstrates cross-runtime contract and lifecycle design.

## Risks

- Larger application footprint and Electron security surface.
- Sidecar startup, authentication, compatibility, crash, and shutdown complexity.
- Two build systems and platform-specific packaging.
- Local transport can be exposed if bound or authenticated incorrectly.
- Version skew between desktop, contracts, and packaged engine.

## Consequences

Electron security settings and preload API design become release-critical. The sidecar must be packaged per supported platform, accept only authenticated local communication, redact output, and terminate with the parent. CI must test development and packaged lifecycle behavior, not only each runtime in isolation.
