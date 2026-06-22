# Risk Register

Risks are reviewed when their related phase starts and after material design changes. Impact uses **High**, **Medium**, or **Low** relative to user trust, data integrity, delivery, and portfolio credibility.

## R-001 — Go Sidecar Complexity

**Description:** process startup, readiness, authentication, port or socket selection, version compatibility, crashes, and shutdown add distributed-system behavior inside a desktop app.  
**Impact:** High. Failures can make the app unusable or expose a local service.  
**Mitigation:** implement ADR 0006: ephemeral IPv4 loopback HTTP, per-run token through `stdin`, authenticated health, structured readiness and version handshake, bounded restart policy, graceful shutdown, and integration tests in development and packaged builds.

## R-002 — Cross-Platform Packaging

**Description:** Electron resources, Go binaries, permissions, antivirus behavior, code signing, notarization, and architecture differences vary by OS.  
**Impact:** High. A working development build may fail after packaging.  
**Mitigation:** select supported OS/architectures early, build binaries in CI, test packaged artifacts continuously, checksum resources, and document signing and release procedures before public distribution.

## R-003 — Credential Security

**Description:** passwords or tokens may leak through renderer state, config files, command arguments, logs, crash reports, or process inspection.  
**Impact:** High. Compromise can expose production databases.  
**Mitigation:** store secrets in the OS keyring, pass opaque references across UI boundaries, avoid command-line secrets, redact diagnostics, minimize lifetime in memory, and threat-model every credential path.

## R-004 — Destructive Query Execution

**Description:** parsing errors, multi-statement SQL, generated queries, misleading warnings, or direct edits can cause irreversible mutation.  
**Impact:** High. Potential production data loss.  
**Mitigation:** start read-only, enforce policy in the engine, use dialect-aware parsing, fail closed on ambiguity, classify environments, require staged review, parameterize writes, apply transactions and optimistic concurrency, and test adversarial cases.

## R-005 — Oracle Support

**Description:** drivers, native client libraries, licensing, distribution, authentication variants, and test infrastructure can be costly and platform-sensitive.  
**Impact:** Medium to High. It can consume roadmap capacity and complicate releases.  
**Mitigation:** keep Oracle experimental and read-only, isolate it behind capabilities, complete legal/distribution research, and require a reproducible test environment before commitment.

## R-006 — SQL Dialect Differences

**Description:** metadata catalogs, quoting, pagination, parameter syntax, types, transactions, and statement parsing vary by database and version.  
**Impact:** High. Incorrect normalization can return wrong data or weaken safety.  
**Mitigation:** keep dialect logic in connectors, negotiate capabilities, preserve typed vendor extensions, maintain version matrices, and run connector-specific integration suites.

## R-007 — Large Table Performance

**Description:** unbounded queries, wide rows, large values, sorting, filtering, rendering, and graph layouts can exhaust memory or freeze the app.  
**Impact:** High. Poor reliability and possible database load.  
**Mitigation:** enforce server-side limits and pagination, stream with backpressure where justified, virtualize grids, cancel work, truncate/expand large values deliberately, and define measurable memory and latency budgets.

## R-008 — Sensitive Data Leakage

**Description:** row data, schema names, SQL, bind values, history, screenshots, exports, logs, telemetry, or future AI prompts may contain PII or secrets.  
**Impact:** High. Privacy, compliance, and trust failure.  
**Mitigation:** local-first defaults, opt-in remote processing, field-aware redaction, history retention controls, protected exports, no row payloads in logs, and an explicit data-flow/threat model.

## R-009 — Overengineering

**Description:** abstractions for hypothetical connectors, plugins, AI, or collaboration could delay a usable PostgreSQL path.  
**Impact:** Medium. Delivery stalls while complexity grows.  
**Mitigation:** validate abstractions against PostgreSQL first, defer extension points until a second implementation proves them, use milestone gates, and reject work not tied to current acceptance criteria.

## R-010 — Overambitious MVP UI

**Description:** implementing every Stitch screen and advanced interaction before a vertical flow works can spread effort too thin.  
**Impact:** Medium to High. Attractive screens may conceal incomplete core behavior.  
**Mitigation:** deliver connection → schema → table → read query as a thin vertical slice, then staged changes; treat analytics, AI surfaces, and advanced graphs as later scope.

## R-011 — Stale or Conflicting Edits

**Description:** database rows may change after preview but before staged mutations are applied.  
**Impact:** High. A valid-looking review can overwrite concurrent work.  
**Mitigation:** require stable row identity, capture original evidence, use optimistic concurrency predicates or database version fields, revalidate before apply, and surface conflicts without automatic overwrite.

## R-012 — Generated UI Becomes Production Debt

**Description:** Stitch HTML may contain inaccessible, duplicated, or insecure patterns unsuitable for maintained application code.  
**Impact:** Medium. Maintenance and usability degrade.  
**Mitigation:** use Stitch as visual and workflow reference only; rebuild through reviewed components, semantic HTML, keyboard behavior, responsive states, and automated accessibility checks.

## R-013 — False Uniformity Across Data Sources

**Description:** forcing relational databases, Redis, Solr, and document stores into a single table/row/SQL model can hide native behavior, encourage expensive operations, and imply unsupported guarantees about transactions, pagination, identity, or rollback.  
**Impact:** High. Incorrect abstractions can damage performance, weaken safety, and make source-specific features unusable.  
**Mitigation:** use small lifecycle contracts plus composable capabilities; retain source-native workspaces and policies; validate the model with PostgreSQL and a non-relational connector before acceptance; keep federation and cross-source joins outside the connector scope.

## R-014 — Local HTTP Sidecar Exposure

**Description:** another local process may discover the ephemeral engine port, attempt unauthorized requests, exploit overly permissive CORS/host handling, or exhaust request resources.  
**Impact:** High. A compromised local endpoint could expose metadata, execute database operations, or degrade the application.  
**Mitigation:** bind only to `127.0.0.1`; require a per-run 256-bit bearer token on every route; deliver it through `stdin`; disable CORS; validate host, method, content type, schemas, and body limits; enforce deadlines and rate/resource bounds; never expose endpoint details or authorization material to the renderer or logs.

## Review Cadence

- Review relevant risks at the start and end of every phase.
- Add an execution-log note when likelihood, impact, owner, or mitigation changes.
- A critical unresolved data-loss or credential risk blocks release progression.
