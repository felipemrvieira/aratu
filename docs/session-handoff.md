# Session Handoff

## Current Project State

Aratu has completed the repository foundation, documented its initial sidecar protocol, and created the first JSON Schemas and synthetic examples for bootstrap, readiness, health, engine information, and errors. The original Stitch references are preserved. There is no Node workspace, Electron runtime, React application, Go module, local database, or connector implementation yet.

## Selected Direction

- Monorepo with `apps/desktop`, `engine`, `packages`, `docs`, and `brand` boundaries.
- Electron main/preload/renderer split with React and TypeScript.
- Go engine as a supervised local sidecar.
- Typed, narrow renderer-to-main calls and authenticated local main-to-engine transport.
- HTTP/JSON on ephemeral IPv4 loopback, per-run bearer token through `stdin`, readiness through `stdout`, and logs through `stderr`.
- JSON Schema Draft 2020-12 as the source of truth for shared payloads; bounded pagination before streaming.
- PostgreSQL first; SQLite second; MySQL later; Oracle experimental.
- App-owned SQLite metadata store and OS keyring for secrets.
- Staged review before mutations.
- Dark-first visual system guided by `docs/stitch/`.

## Before Starting a New Session

Read these files in order:

1. `README.md`
2. `docs/product-concept.md`
3. `docs/architecture.md`
4. `docs/adr/README.md` and relevant ADRs
5. `docs/execution-plan.md`
6. `docs/risks.md`
7. `docs/execution-log.md` from newest session backward
8. `docs/stitch/datapilot_core/DESIGN.md` and relevant screen assets

Also inspect the worktree before editing. Preserve existing and user-authored changes; do not infer completion from folder names alone.

## Next Recommended Task

Implement one thin vertical protocol slice from the accepted ADR 0006:

1. Initialize the Go module and `cmd/aratu-engine` entrypoint.
2. Choose the minimal Go-side schema validation/generation approach and record its reproducible command.
3. Implement bootstrap through `stdin`, ephemeral loopback binding, authenticated health, structured readiness, `stderr` logging, and graceful shutdown.
4. Add tests for invalid bootstrap, wrong tokens, loopback binding, version mismatch, timeout, and shutdown.

The Electron shell can then be initialized against this tested protocol surface.

Do not attempt a database connector until sidecar lifecycle and contract boundaries are testable.

## How to Continue

1. Choose the smallest unchecked task that advances the current phase or the recommended contract decision.
2. State acceptance criteria and inspect relevant risks and ADRs.
3. Implement a bounded change with tests or verification proportional to risk.
4. Update affected architecture/product documentation in the same change.
5. Check only tasks that are actually complete.
6. Append a new numbered entry to `docs/execution-log.md` and add a detailed session note under `docs/sessions/` when useful.
7. Refresh this handoff so it describes reality, not the original plan.

## Rules for Future Agents

- Update `docs/execution-log.md` after every meaningful change and list created, modified, or removed files.
- Update checkboxes in `docs/execution-plan.md` only after verifying their acceptance criteria.
- Create an ADR for material, durable decisions; supersede ADRs rather than rewriting accepted history.
- Do not implement large features without updating architecture, risks, and handoff.
- Keep database policy in the engine and OS capabilities in Electron main.
- Never expose generic Node, IPC, filesystem, shell, or database access to the renderer.
- Never persist credentials in repository files or the metadata database.
- Prefer a working PostgreSQL vertical slice over speculative multi-database abstractions.
- Preserve local-first and staged-change principles unless an explicit ADR changes them.
- Record commands run and verification outcomes, including failures or tests that could not run.

## Using the Stitch Assets

`docs/stitch/` is the primary visual and conceptual reference. Read the design system plus the HTML and screenshots for the screen being built. Translate the working **DataPilot** label to **Aratu**. Recreate patterns through the project's component system; do not treat generated HTML as production source.

Preserve the established workspace model, information density, tonal dark surfaces, technical typography, connected/environment states, and review-oriented flows. Validate contrast, keyboard navigation, semantics, reduced motion, responsive behavior, and error/loading/empty states even when the reference omits them.
