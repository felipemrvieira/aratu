# Aratu Desktop

This directory contains the Electron desktop foundation built with electron-vite, React, TypeScript, Tailwind CSS, and shadcn/ui conventions.

- `src/main`: trusted Electron main process, security policy, IPC handlers, and engine clients.
- `src/preload`: narrow, typed API exposed through `contextBridge`.
- `src/renderer`: React shell inspired by the Stitch overview workspace.
- `src/shared`: desktop API types and allowlisted IPC channel names.

## Commands

Run from the repository root:

```bash
pnpm dev
pnpm dev:linux
pnpm typecheck
pnpm test
pnpm build
```

`pnpm dev` starts the electron-vite development process. The renderer opens on a Stitch-derived Connect Database screen, can navigate to the mock Overview, and reads mock engine status through the production-shaped boundary:

```txt
React renderer → preload API → named IPC → Electron main → MockEngineClient
```

The renderer has no Node integration, engine endpoint, bearer token, or generic IPC access. Main enables context isolation, renderer sandboxing, CSP headers, denied permission requests, denied new windows, and cross-origin navigation protection.

### Linux AppArmor fallback

Some Linux distributions allow unprivileged user namespaces at the kernel level but restrict them through AppArmor. Electron then cannot use either the user-namespace sandbox or a root-owned SUID helper from `node_modules`.

Use `pnpm dev:linux` only for local development in that environment. It passes electron-vite's `--noSandbox` option without changing the BrowserWindow security configuration. Do not use it for release validation, packaged applications, or untrusted renderer content. Prefer `pnpm dev` whenever the operating system sandbox is configured correctly.

Development CSP allows the inline React Fast Refresh preamble and localhost HMR connections. Packaged builds remove that script exception and restrict connections to the application origin.

## Current Limitations

- Navigation is currently local state between Connect Database and Overview; no persistent router yet.
- No real Go sidecar lifecycle or HTTP `EngineClient` yet.
- Connection analysis is local and synthetic; no credential persistence or real database test yet.
- No release packaging or platform icons.
- UI content is a visual scaffold derived from `docs/stitch`, not a finished workflow.
