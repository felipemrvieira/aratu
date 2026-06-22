# Execution Plan

This is the operational checklist for the project. A checked item means the repository contains the corresponding verified artifact; future sessions must not check work that is only proposed. Detailed acceptance criteria should be added before each implementation phase begins.

## Phase 0 — Repository Foundation

- [x] Criar estrutura de pastas.
- [x] Criar documentação inicial.
- [x] Criar README.
- [x] Criar ADRs iniciais.
- [x] Criar plano de execução.
- [x] Criar log de execução.

**Exit criteria:** foundational paths, product and architecture context, roadmap, risk register, ADRs, handoff, and execution history are present and internally consistent.

## Phase 1 — Desktop Shell Foundation

- [ ] Inicializar Electron + Vite + React + TypeScript.
- [ ] Configurar Tailwind CSS.
- [ ] Configurar shadcn/ui.
- [ ] Criar layout base.
- [ ] Criar sidebar.
- [ ] Criar topbar.
- [ ] Criar roteamento interno ou layout de telas.
- [ ] Criar tema dark mode.
- [ ] Criar app shell visual inspirado nos arquivos em `docs/stitch`.

**Exit criteria:** a secure development shell starts reliably, renders the primary layout, and has documented build/test commands and Electron security settings.

## Phase 2 — Go Engine Foundation

- [ ] Inicializar módulo Go.
- [ ] Criar entrypoint `cmd/aratu-engine`.
- [ ] Criar healthcheck local.
- [x] Definir protocolo local HTTP/JSON e lifecycle na ADR 0006.
- [ ] Implementar API local HTTP/JSON autenticada.
- [ ] Criar camada de services.
- [ ] Criar interface de connectors.
- [ ] Criar logs estruturados.
- [ ] Criar graceful shutdown.

**Exit criteria:** the engine builds and tests independently, reports readiness, rejects invalid calls, logs safely, and shuts down predictably.

## Phase 3 — Electron ↔ Go Communication

- [ ] Fazer Electron iniciar o sidecar Go.
- [ ] Criar canal seguro entre UI e Electron main.
- [ ] Criar client interno para chamar engine.
- [ ] Criar healthcheck da engine pela UI.
- [ ] Exibir status da engine na interface.
- [x] Documentar lifecycle do sidecar.

**Exit criteria:** packaged and development builds authenticate to the sidecar, expose only typed preload operations, handle crash/restart states, and cancel outstanding work on shutdown.

## Phase 4 — PostgreSQL Connector

- [ ] Criar modelo de conexão.
- [ ] Testar conexão PostgreSQL.
- [ ] Listar schemas.
- [ ] Listar tabelas.
- [ ] Descrever colunas.
- [ ] Listar constraints.
- [ ] Listar relacionamentos.
- [ ] Buscar preview de linhas com paginação.
- [ ] Executar queries read-only.
- [ ] Adicionar timeouts e cancelamento.

**Exit criteria:** supported PostgreSQL versions and permissions are documented; integration tests cover discovery, bounded reads, cancellation, timeout, and normalized failures.

## Phase 5 — UI Database Exploration

- [ ] Criar tela Connect Database.
- [ ] Criar tela Database Overview.
- [ ] Criar tela Schema Explorer.
- [ ] Criar tela Table Data View.
- [ ] Criar painel de detalhes de registro.
- [ ] Criar filtros básicos.
- [ ] Criar paginação.
- [ ] Criar badges de tipos de dados.

**Exit criteria:** the main Stitch-derived exploration flow works against the PostgreSQL connector with keyboard access, empty/error/loading states, and bounded data fetching.

## Phase 6 — Query Safety

- [ ] Criar classificador básico de queries.
- [ ] Permitir somente SELECT inicialmente.
- [ ] Bloquear DELETE sem WHERE.
- [ ] Bloquear UPDATE sem WHERE.
- [ ] Criar política para ambiente Production.
- [ ] Criar preview de queries perigosas.
- [ ] Documentar regras de segurança.

**Exit criteria:** engine-enforced, dialect-aware policies have adversarial tests; ambiguous statements fail closed and explain the decision without claiming perfect SQL safety.

## Phase 7 — Staged Changes

- [ ] Criar modelo de staged changes.
- [ ] Permitir edição local de células.
- [ ] Criar diff before/after.
- [ ] Criar tela Review Changes.
- [ ] Gerar SQL de preview.
- [ ] Aplicar alterações em transaction.
- [ ] Permitir rollback em caso de erro.
- [ ] Registrar alterações no histórico local.

**Exit criteria:** changes are parameterized, identity-safe, concurrency-aware, reviewable, atomic where supported, and covered by success, conflict, and rollback tests.

## Phase 8 — Local Metadata Store

- [ ] Criar SQLite local interno.
- [ ] Salvar conexões sem credenciais sensíveis.
- [ ] Salvar histórico de queries.
- [ ] Salvar views favoritas.
- [ ] Salvar preferências de UI.
- [ ] Integrar keyring do sistema operacional para secrets.

**Exit criteria:** versioned migrations, backup/recovery behavior, retention rules, secret isolation, and corruption/error handling are documented and tested.

## Phase 9 — Relationship View

- [ ] Criar modelo de relacionamento.
- [ ] Criar visualização com React Flow.
- [ ] Exibir tabelas como nós.
- [ ] Exibir foreign keys como edges.
- [ ] Criar painel de detalhe da relação.
- [ ] Criar ações para gerar join query.

**Exit criteria:** representative large schemas remain usable and accessible; generated joins are visible, editable, and never executed implicitly.

## Phase 10 — Packaging and Release

- [ ] Configurar build da engine por plataforma.
- [ ] Empacotar sidecar junto com Electron.
- [ ] Configurar electron-builder.
- [ ] Criar pipeline de CI.
- [ ] Criar release local.
- [ ] Documentar processo de build.

**Exit criteria:** clean machines can build verified artifacts; packaged apps locate and authenticate the sidecar; signing, checksums, updates, and rollback are documented for supported platforms.

## Phase 11 — Future Connectors

- [ ] SQLite connector.
- [ ] MySQL connector.
- [ ] Oracle experimental read-only connector.
- [ ] SQL Server research.
- [ ] Redis read-only connector research.
- [ ] Apache Solr connector research.
- [ ] Plugin architecture research.

**Exit criteria:** every connector declares capabilities, supported versions, distribution constraints, integration-test coverage, and maturity status.

## Cross-Cutting Work

- [ ] Definir estratégia de testes unitários, integração, UI e end-to-end.
- [ ] Criar threat model e política de dados sensíveis.
- [ ] Definir accessibility baseline e keyboard navigation.
- [ ] Definir observabilidade local, redaction e opt-in de telemetry.
- [ ] Definir budgets de performance para startup, memória e grids.
- [ ] Manter ADRs, riscos, roadmap, handoff e log sincronizados.
