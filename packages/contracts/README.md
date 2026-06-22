# Aratu Contracts

This package will contain the language-neutral contracts shared across Electron main, preload/renderer DTOs where appropriate, and the Go engine.

ADR 0006 selects JSON Schema Draft 2020-12 as the authoritative payload format for Electron main ↔ Go communication.

## Planned Layout

```txt
packages/contracts/
├── schemas/
│   └── v1/
├── examples/
│   └── v1/
├── generated/
│   ├── typescript/
│   └── go/
└── README.md
```

Generated artifacts may move to language-native build directories when tooling is selected. Generated files must identify their source schema and must not be edited manually.

## Initial Schemas

- `BootstrapInput` — implemented in `schemas/v1/bootstrap-input.schema.json`.
- `ReadyEvent` — implemented in `schemas/v1/ready-event.schema.json`.
- `HealthResponse` — implemented in `schemas/v1/health-response.schema.json`.
- `EngineInfo` — implemented in `schemas/v1/engine-info.schema.json`.
- `ErrorEnvelope` — implemented in `schemas/v1/error-envelope.schema.json`.

Planned for later vertical slices:

- `ConnectorDescriptor`
- `CapabilitySet`
- `ConnectionProfile`
- `ConnectionTestRequest`
- `ConnectionTestResult`
- `OperationReference`
- `CancelOperationResult`

Every implemented schema has a matching document under `examples/v1/`. Examples must remain synthetic, contain no real token or connection data, and validate against their corresponding schema.

## Contract Rules

- Use JSON Schema Draft 2020-12.
- Give each public schema a stable `$id`, title, description, bounds, and explicit required fields.
- Close objects by default with `additionalProperties: false`.
- Store examples separately and validate them in CI.
- Document sensitive fields and redaction requirements.
- Generate or mechanically verify TypeScript and Go representations.
- Validate inputs and outputs at trust boundaries.
- Treat protocol behavior, authentication, HTTP methods, status codes, and idempotency as documented and tested contracts in addition to payload schemas.

## Protocol Summary

- HTTP/JSON on `127.0.0.1` using an operating-system-assigned port.
- Readiness discovery through one structured `stdout` event.
- Structured logs through `stderr`.
- Per-run 256-bit bearer token delivered through child-process `stdin`.
- Electron main is the only application client; renderer access is mediated by named preload methods.
- Initial protocol version: `1`.
- Initial result strategy: bounded pagination; streaming requires a later decision.

See `docs/adr/0006-electron-go-communication-protocol.md` for the complete decision and lifecycle.
