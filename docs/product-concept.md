# Product Concept

## Vision

Aratu is a tool for navigating complex data ecosystems with clarity, safety, and control. It should make the structure and behavior of a database legible without normalizing risky access patterns.

The product is local-first: database access, metadata, policies, and most processing remain on the user's machine. Cloud capabilities, including future AI features, must be additive, explicit, and constrained by data-handling policy.

## Problem

Developers, data engineers, analysts, and technical operators routinely move between schema discovery, record inspection, ad hoc SQL, and data correction. Existing clients can be powerful but often expose dense interfaces, weak environment context, and direct mutation paths with little opportunity to review intent.

Aratu addresses four related problems:

1. Understanding an unfamiliar schema is slow and fragmented.
2. Large tables and relationships are difficult to explore without writing SQL immediately.
3. Production and sensitive environments require more safeguards than development databases.
4. Direct cell edits and destructive SQL provide insufficient preview, context, and recovery.

## Target Audience

- Software engineers investigating application data and incidents.
- Data engineers exploring schemas, relationships, and operational quality.
- Analysts who need a visual path into SQL without losing transparency.
- Database administrators reviewing changes and environment posture.
- Engineering leaders evaluating safe, local data tooling.

## Differentiation

Aratu is not intended to win through the largest list of database features. Its differentiators are:

- exploration-first workflows that connect schema, rows, relationships, and query context;
- staged changes with explicit before/after review before mutations;
- visible environment classification and production safeguards;
- a local engine that centralizes policies instead of trusting presentation code;
- contextual AI guidance across connection, exploration, querying, relationships, and safety without autonomous mutation authority;
- normalized connector contracts while preserving dialect-specific capabilities;
- documented architecture and decision history suitable for long-term evolution.

## Product Principles

1. **Safety is a workflow, not a warning dialog.** Risk must be visible before execution.
2. **Local by default.** Credentials and queried data should not leave the workstation implicitly.
3. **Progressive disclosure.** Common exploration stays direct; advanced detail remains available.
4. **Intent remains inspectable.** Generated SQL, staged diffs, and policy decisions are explainable.
5. **Database truth is authoritative.** Cache and metadata improve experience but do not disguise freshness.
6. **Connector capability is explicit.** Unsupported behavior is never simulated silently.
7. **AI is assistive, optional, and bounded.** Future assistance must not bypass safety or data controls.

## Main User Flows

### Connect and classify

Choose a database engine, enter connection settings, test access, identify the environment, review permissions and safeguards, then save non-secret metadata locally.

### Explore a database

Move from database overview to schemas and tables, inspect columns and constraints, preview paginated rows, filter results, and open a record detail panel without losing navigation context.

### Understand relationships

Visualize foreign keys as a graph, select a relationship for detail, and use it as context for a transparent join query.

### Query safely

Write SQL in a dedicated editor, classify intent, show limits and environment posture, execute read-only statements initially, and retain a local history that redacts sensitive content where required.

### Stage and apply a change

Edit values locally, collect changes into a staged set, compare before and after, inspect generated SQL and risk analysis, confirm safeguards, then apply atomically or roll back.

### Work with AI guidance

Ask questions in natural language or invoke contextual assistance from the current connection, table, record, query, relationship, or safety screen. Aratu can propose SQL and actions, explain its reasoning and relevant schema context, and surface confidence or risk signals. The user remains responsible for accepting a proposal; the engine independently validates every executable request against connector capabilities and safety policy.

## Initially Planned AI Capabilities

The 11 Stitch HTML concepts were reviewed as an initial capability map. They represent product intent, not committed release scope.

### Connection guidance

- Parse a pasted connection URL and infer engine, port, and relevant settings.
- Detect SSL expectations, highlight connection-string risks, and suggest pool configuration.
- Preserve explicit environment selection and production safeguards.

### Query guidance

- Translate plain-language questions into editable SQL.
- Explain generated or historical SQL and expose the originating prompt.
- Suggest useful refinements such as joins, filters, cohorts, and derived metrics.
- Show syntax validity, estimated execution context, AI confidence, read-only classification, and production-safety status as separate signals.

### Schema and data guidance

- Summarize tables and their role in the domain.
- Detect likely PII, sensitive permissions, central entities, and common schema patterns.
- Generate safe views, CRUD query templates, join examples, and ER diagrams for user review.
- Answer contextual questions from a selected record without hiding the underlying query.

### Relationship and integrity guidance

- Explain cardinality and relationship meaning.
- Identify orphan records and integrity anomalies.
- Suggest and run integrity checks only after the user selects the operation and sees its scope.
- Present relationship health and schema insights without conflating heuristic confidence with database truth.

### Safety guidance

- Recommend timeout, row-limit, read-only, masking, audit, and environment policies.
- Analyze recent query patterns for potential risk without automatically changing policy.
- Support staged-change review with visible risk analysis and generated SQL.

### Non-negotiable boundaries

- AI suggestions never bypass the Electron trust boundary or Go engine policy.
- Mutations are not executed from conversational output; they enter the normal query-safety or staged-change workflow.
- Generated SQL stays visible and editable before execution.
- Provider, model, data residency, retention, redaction, and local-model options require explicit design decisions.
- Schema, query, or row context is not sent remotely without clear disclosure and consent.
- Deterministic validation is kept distinct from probabilistic AI confidence.

## Planned Screens

- Connect Database and engine selection.
- Database Overview with entities, health context, and recent activity.
- Schema Explorer and table data grid.
- Table Structure with columns, indexes, constraints, and relationships.
- Record Detail side panel.
- SQL Editor / Smart Query workspace.
- Query History and Saved Views.
- Relationship View with optional analytics.
- Review Changes with diff, risk analysis, generated SQL, and confirmation.
- Safety Settings for environment protection, edit mode, limits, and sensitive data.

## Stitch Reference

`docs/stitch/` is the primary visual and conceptual reference. The current assets use the working name **DataPilot**; product implementation and documentation must translate that identity to **Aratu**, not preserve the old name in shipped UI.

The assets establish a dark-first workspace, 280 px navigation sidebar, dense data grids, optional right-hand detail panels, tonal elevation, Geist/Inter/JetBrains Mono typography, and explicit connected, production, risk, and staged states. They also show contextual AI entry points across every major workflow, including connection analysis, natural-language querying, explanations, schema insights, integrity checks, PII discovery, and safety advice. They guide information architecture and interaction intent, but generated HTML is not production code and should not be copied without accessibility, security, responsiveness, and component-system review.

## The Name Aratu

Aratu refers to a mangrove crab associated with an environment where land, water, roots, and living systems intersect. The metaphor fits a database client: data estates are interconnected ecosystems with hidden paths, dependencies, and changing conditions. Aratu should feel observant, precise, adaptable, and at home navigating that complexity without disturbing it unnecessarily.
