# Execution Log

Este arquivo registra o que foi realizado em cada sessão de desenvolvimento. Entradas são append-only: correções podem acrescentar notas, mas sessões anteriores não devem ser reescritas para aparentar um estado diferente do que foi entregue.

## Session 0001 — Repository Foundation

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Criar a estrutura inicial, documentação arquitetural, plano de execução e mecanismos de continuidade.

### Context inspected

- [x] Inspecionada a árvore inicial do repositório.
- [x] Confirmado que o conteúdo inicial estava restrito a `docs/stitch/`.
- [x] Lido integralmente `docs/stitch/datapilot_core/DESIGN.md`.
- [x] Inspecionados títulos, textos de interface e dimensões das telas Stitch disponíveis.
- [x] Preservados todos os artefatos existentes em `docs/stitch/`.

### Completed

- [x] Criada a estrutura de diretórios para desktop, engine, packages, docs, brand, scripts e workflows.
- [x] Criado README principal e READMEs dos subsistemas desktop e engine.
- [x] Documentados conceito do produto, arquitetura, roadmap, riscos e glossário.
- [x] Criado plano de execução faseado com checkboxes e critérios de saída.
- [x] Criado handoff para continuidade entre sessões de IA.
- [x] Criado índice de ADRs e quatro decisões arquiteturais iniciais.
- [x] Documentados conceito de marca e sistema inicial de cores.
- [x] Criado guia para notas detalhadas de sessões.
- [x] Adicionado `.gitignore` inicial para builds, dependências, secrets e dados locais.
- [x] Validada a estrutura e a consistência básica dos documentos criados.

### Files created

- `README.md`
- `.gitignore`
- `apps/desktop/README.md`
- `engine/README.md`
- `docs/product-concept.md`
- `docs/architecture.md`
- `docs/execution-plan.md`
- `docs/execution-log.md`
- `docs/session-handoff.md`
- `docs/roadmap.md`
- `docs/risks.md`
- `docs/glossary.md`
- `docs/adr/README.md`
- `docs/adr/0001-use-monorepo.md`
- `docs/adr/0002-use-electron-with-go-sidecar.md`
- `docs/adr/0003-connector-based-engine.md`
- `docs/adr/0004-staged-changes-before-mutations.md`
- `docs/sessions/README.md`
- `brand/concept.md`
- `brand/colors.md`

### Directories prepared

- `apps/desktop/src/main/`
- `apps/desktop/src/preload/`
- `apps/desktop/src/renderer/`
- `engine/cmd/aratu-engine/`
- `engine/internal/app/`
- `engine/internal/connectors/{postgres,sqlite,mysql,oracle}/`
- `engine/internal/{introspection,querysafe,staged,secrets,store,telemetry}/`
- `packages/{contracts,ui,shared}/`
- `docs/{adr,sessions}/`
- `brand/logo/`
- `scripts/`
- `.github/workflows/`

Empty directories are prepared in the current workspace but will need placeholder or implementation files before Git can track them.

### Decisions made

- Monorepo como unidade de versionamento e release.
- Electron + React + TypeScript para o desktop, com main/preload/renderer isolados.
- Go engine executada como sidecar local supervisionado pelo Electron main.
- PostgreSQL como primeiro conector; SQLite como segundo; MySQL e Oracle posteriores.
- Engine orientada a connectors com capability negotiation.
- Staged changes e revisão antes de mutações de dados.
- SQLite local para metadados e keyring do sistema operacional para secrets.
- `docs/stitch/` como referência visual principal, sem reutilizar seu HTML como código de produção.

### Commands and tools used

- `rg --files`, `find` e `git status --short` para inspeção inicial; o diretório ainda não possui metadados Git.
- `sed`, `rg` e `file` para ler o design system, extrair contexto das telas e verificar imagens Stitch.
- `mkdir -p` para preparar a árvore solicitada.
- `apply_patch` para criar todos os arquivos de texto, preservando o conteúdo existente.
- `find`, `rg` e verificações shell para validar estrutura, conteúdo, links e checkboxes.

### Pending

- Inicializar controle de versão Git, caso desejado para este diretório.
- Decidir e registrar o protocolo Electron ↔ Go, autenticação local e version handshake.
- Inicializar o workspace Electron + Vite + React + TypeScript.
- Inicializar o módulo Go e o healthcheck do sidecar.
- Definir package manager, task runner, versões suportadas e estratégia de testes.
- Tornar diretórios atualmente vazios rastreáveis quando receberem seus primeiros artefatos.

### Notes

Esta sessão focou exclusivamente em fundação, documentação e continuidade. Nenhum runtime, módulo Go, dependência, conector ou funcionalidade de aplicação foi implementado. A próxima sessão deve evitar começar Electron e Go em paralelo antes de decidir o contrato e o lifecycle do sidecar.

## Session 0002 — README Branding

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Incorporar ao README principal a logo adicionada pelo usuário.

### Completed

- [x] Localizada e inspecionada a logo `brand/logo/crab.png`.
- [x] Adicionada a logo ao cabeçalho do README com texto alternativo e tamanho controlado.
- [x] Centralizados o nome e a tagline do projeto no cabeçalho.
- [x] Validado o caminho relativo da imagem usado pelo GitHub.

### Files changed

- `README.md`
- `docs/execution-log.md`

### Asset added outside this session

- `brand/logo/crab.png` — arquivo fornecido pelo usuário e preservado sem alterações.

### Decisions made

- Usar o PNG diretamente no README com largura de 240 px.
- Manter o arquivo na estrutura existente `brand/logo/`, coerente com a documentação inicial.

### Commands and tools used

- `find`, `file` e `identify` para localizar e inspecionar o asset.
- Visual inspection para validar transparência e composição.
- `apply_patch` para atualizar README e execution log.

### Pending

- Definir variantes oficiais da logo para app icon, tamanhos reduzidos, fundos claros e formato vetorial.

## Session 0003 — AI-Guided Product Direction

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Consolidar no README e na documentação as operações guiadas por IA planejadas nos materiais Stitch.

### Context inspected

- [x] Lidos integralmente os 11 arquivos `code.html` existentes em `docs/stitch/` (5.711 linhas).
- [x] Extraído e revisado o texto visível de cada tela para identificar ações, estados, sugestões e controles.
- [x] Mapeadas capacidades de IA em conexão, overview, exploração, queries, histórico, relacionamentos, estrutura de tabelas, safety settings e review changes.

### Completed

- [x] Adicionada ao README a proposta **AI-guided and human-controlled**.
- [x] Documentadas no README as operações guiadas por IA inicialmente planejadas.
- [x] Expandido o conceito do produto com capacidades, limites e fluxo contextual de IA.
- [x] Detalhados no roadmap os gates necessários para entregar IA com segurança.
- [x] Mantida a IA fora da autoridade de execução e das políticas determinísticas da engine.

### Files changed

- `README.md`
- `docs/product-concept.md`
- `docs/roadmap.md`
- `docs/execution-log.md`

### Decisions made

- Posicionar Aratu como uma experiência guiada por IA, mas controlada por humanos.
- Distribuir assistência de forma contextual pelo produto em vez de limitá-la a um chat genérico.
- Tratar resultados de IA como propostas inspecionáveis sujeitas à validação determinística da Go engine.
- Não promover a direção visual do Stitch a compromisso de escopo ou execução autônoma.

### Commands and tools used

- `find` e `wc` para inventariar os HTMLs.
- `rg` para revisar ocorrências e contexto funcional em todos os arquivos.
- `HTML::TreeBuilder` e `HTML::Entities` em Perl para extrair todo o texto visível por tela.
- `sed` para revisar a documentação existente antes da edição.
- `apply_patch` para atualizar README, conceito, roadmap e log.

### Pending

- Definir arquitetura de providers/modelos, execução local versus remota e política de dados para IA.
- Criar threat model específico para prompt injection, vazamento de contexto e SQL inseguro gerado por modelo.
- Priorizar quais capacidades de IA entram após o fluxo determinístico do MVP estar funcional.

## Session 0004 — Heterogeneous Data Source Direction

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Registrar a intenção de conectar e explorar fontes heterogêneas, incluindo Redis e Apache Solr.

### Completed

- [x] Revisada a ADR 0003 contra modelos relacionais, key-value, search e document.
- [x] Criada a ADR 0005 como proposta, sem substituir prematuramente a decisão aceita.
- [x] Registrado um modelo conceitual de connectors orientados a capabilities.
- [x] Documentados workspaces e políticas específicas para Redis e Solr.
- [x] Explicitado que suporte a múltiplas fontes não implica queries federadas ou joins cross-source.
- [x] Adicionados Redis e Solr ao roadmap e ao plano como pesquisas futuras.
- [x] Adicionado risco de falsa uniformidade entre fontes de dados.

### Files created

- `docs/adr/0005-capability-based-data-source-connectors.md`

### Files changed

- `docs/adr/README.md`
- `docs/adr/0003-connector-based-engine.md`
- `docs/roadmap.md`
- `docs/execution-plan.md`
- `docs/risks.md`
- `docs/execution-log.md`

### Decisions made

- Manter ADR 0003 aceita enquanto a extensão heterogênea permanece proposta.
- Considerar Redis read-only como candidato para validar capabilities não relacionais.
- Preservar modelos nativos de Redis e Solr em vez de apresentá-los artificialmente como tabelas SQL.
- Tratar federação, ETL, sincronização e joins cross-source como escopo separado.

### Commands and tools used

- `nl`, `rg` e `sed` para revisar ADR, arquitetura, roadmap, plano e referências Stitch.
- `apply_patch` para criar a proposta e sincronizar a documentação relacionada.

### Pending

- Validar a proposta com um vertical slice PostgreSQL e um protótipo não relacional.
- Definir granularidade, versionamento e representação de capabilities nos contratos.
- Decidir futuramente se a ADR 0005 será aceita, revisada ou rejeitada.

## Session 0005 — Git Repository Publication Preparation

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Preparar a fundação documental para o primeiro commit e publicação no GitHub.

### Completed

- [x] Validada a autenticação GitHub e a disponibilidade do remoto `felipemrvieira/aratu`.
- [x] Revisados o escopo completo, tamanho dos assets e possíveis padrões de secrets.
- [x] Confirmado que o remoto público existe e ainda não possui branch padrão.
- [x] Adicionados placeholders para preservar no Git todos os diretórios arquiteturais vazios.

### Files created

- `.github/workflows/.gitkeep`
- `apps/desktop/src/{main,preload,renderer}/.gitkeep`
- `engine/cmd/aratu-engine/.gitkeep`
- `engine/internal/app/.gitkeep`
- `engine/internal/connectors/{postgres,sqlite,mysql,oracle}/.gitkeep`
- `engine/internal/{introspection,querysafe,staged,secrets,store,telemetry}/.gitkeep`
- `packages/{contracts,ui,shared}/.gitkeep`
- `brand/logo/.gitkeep`
- `scripts/.gitkeep`

### Files changed

- `docs/execution-log.md`

### Decisions made

- Publicar a estrutura vazia com `.gitkeep` até que cada diretório receba seus primeiros artefatos reais.
- Usar `main` como branch inicial do repositório vazio.

### Commands and tools used

- `gh --version`, `gh auth status` e `gh repo view` para validar GitHub e remoto.
- `git ls-remote` para confirmar que o remoto não possui branches.
- `find`, `du` e `rg` para revisar escopo, tamanho e potenciais secrets.
- `apply_patch` para adicionar placeholders rastreáveis e atualizar o log.

### Pending

- Inicializar o repositório Git local, criar o commit inicial e enviar a branch `main`.

## Session 0006 — Electron ↔ Go Protocol Decision

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Registrar o protocolo, autenticação, descoberta, contratos e lifecycle do Go sidecar.

### Completed

- [x] Aceito HTTP/JSON sobre IPv4 loopback como transporte local.
- [x] Aceita porta efêmera com readiness estruturado via `stdout` e logs via `stderr`.
- [x] Aceito token bearer de 256 bits por execução, entregue ao sidecar via `stdin`.
- [x] Aceito JSON Schema Draft 2020-12 como fonte de verdade dos payloads.
- [x] Documentados health/version handshake, error envelope, request IDs, timeouts, cancelamento e graceful shutdown.
- [x] Definida paginação limitada para o protocolo inicial e adiado streaming até existir evidência de necessidade.
- [x] Documentadas falhas de startup, crash, política de restart e proibição de replay automático de mutações.
- [x] Criado guia inicial para `packages/contracts`.

### Files created

- `docs/adr/0006-electron-go-communication-protocol.md`
- `packages/contracts/README.md`

### Files changed

- `docs/adr/README.md`
- `docs/architecture.md`
- `docs/execution-plan.md`
- `docs/session-handoff.md`
- `docs/risks.md`
- `docs/execution-log.md`

### Files removed

- `packages/contracts/.gitkeep` — substituído pelo README real do package.

### Decisions made

- Electron main é o único cliente HTTP da engine; renderer não recebe porta ou token.
- Toda rota, inclusive health e shutdown, exige autenticação.
- JSON Schema define payloads; comportamento HTTP é documentado e testado separadamente.
- OpenAPI não será mantido como segunda fonte de verdade nesta fase.
- Streaming e compatibilidade entre múltiplas versões publicadas exigirão decisões posteriores.

### Commands and tools used

- `nl`, `sed`, `ls` e `git status` para revisar o estado documental e o package de contracts.
- `apply_patch` para criar a ADR e sincronizar arquitetura, plano, riscos, handoff e log.

### Pending

- Criar os primeiros JSON Schemas e escolher geração/validação para TypeScript e Go.
- Inicializar o módulo Go e implementar o vertical slice de bootstrap, readiness e health.
- Definir os métodos IPC/preload específicos antes de conectar o renderer.

## Session 0007 — Initial Protocol Schemas

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Materializar os primeiros payload contracts definidos pela ADR 0006.

### Completed

- [x] Criados schemas Draft 2020-12 para bootstrap input, ready event, health response, engine info e error envelope.
- [x] Definidos `$id`, limites, campos obrigatórios e objetos fechados para cada payload.
- [x] Restrito o token de bootstrap ao formato base64url sem padding de 32 bytes.
- [x] Criados exemplos sintéticos correspondentes, sem secrets ou dados reais.
- [x] Atualizados README de contracts, plano de execução e session handoff.
- [x] Validados JSON, schemas e exemplos com as ferramentas disponíveis no ambiente.

### Files created

- `packages/contracts/schemas/v1/bootstrap-input.schema.json`
- `packages/contracts/schemas/v1/ready-event.schema.json`
- `packages/contracts/schemas/v1/health-response.schema.json`
- `packages/contracts/schemas/v1/engine-info.schema.json`
- `packages/contracts/schemas/v1/error-envelope.schema.json`
- `packages/contracts/examples/v1/bootstrap-input.json`
- `packages/contracts/examples/v1/ready-event.json`
- `packages/contracts/examples/v1/health-response.json`
- `packages/contracts/examples/v1/engine-info.json`
- `packages/contracts/examples/v1/error-envelope.json`

### Files changed

- `packages/contracts/README.md`
- `docs/execution-plan.md`
- `docs/session-handoff.md`
- `docs/execution-log.md`

### Decisions made

- Manter os cinco schemas iniciais autocontidos até a escolha da ferramenta de geração e resolução de references.
- Usar exemplos exclusivamente sintéticos e validá-los contra os schemas correspondentes.
- Não adicionar ainda dependências Node ou Go apenas para validação documental.

### Commands and tools used

- `jq` para parsing e normalização estrutural dos arquivos JSON.
- `jsonschema` para validação Draft 2020-12 dos exemplos contra seus schemas.
- `apply_patch` para criar schemas, exemplos e sincronizar documentação.

### Pending

- Escolher e fixar tooling reproduzível de geração/validação para Go e TypeScript.
- Inicializar o módulo Go e consumir os schemas no primeiro vertical slice.
- Adicionar schemas de connectors, capabilities, connections e cancellation quando seus endpoints forem implementados.

## Session 0008 — Electron Desktop Foundation

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Inicializar o desktop Electron antes da Go engine, preservando as fronteiras definidas pela arquitetura.

### Completed

- [x] Criado workspace pnpm com comandos raiz para development, typecheck, tests e build.
- [x] Inicializado Electron 42 + electron-vite 5 + Vite 7 + React 19 + TypeScript 6.
- [x] Configurados Tailwind CSS 4 e convenções shadcn/ui com componente Button.
- [x] Criados main, preload, renderer e tipos compartilhados.
- [x] Aplicados context isolation, sandbox, Node integration desabilitada, CSP, permission denial e navigation/window guards.
- [x] Criados IPC channels allowlisted sem bridge genérica e com validação do sender/frame principal.
- [x] Criados `EngineClient` e `MockEngineClient`, sem expor endpoint ou token ao renderer.
- [x] Criado shell dark-first com sidebar, topbar, overview, entities, safety posture e assistência contextual.
- [x] Integrada a logo Aratu como asset do renderer.
- [x] Adicionados dois testes unitários do mock engine client.
- [x] Executados typecheck, testes, build e smoke test do Electron.

### Files created

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `apps/desktop/package.json`
- `apps/desktop/electron.vite.config.ts`
- `apps/desktop/tsconfig.json`
- `apps/desktop/tsconfig.node.json`
- `apps/desktop/tsconfig.web.json`
- `apps/desktop/components.json`
- `apps/desktop/src/shared/desktop-api.ts`
- `apps/desktop/src/main/index.ts`
- `apps/desktop/src/main/engine/engine-client.ts`
- `apps/desktop/src/main/engine/mock-engine-client.ts`
- `apps/desktop/src/main/engine/mock-engine-client.test.ts`
- `apps/desktop/src/preload/index.ts`
- `apps/desktop/src/renderer/index.html`
- `apps/desktop/src/renderer/src/env.d.ts`
- `apps/desktop/src/renderer/src/main.tsx`
- `apps/desktop/src/renderer/src/App.tsx`
- `apps/desktop/src/renderer/src/styles.css`
- `apps/desktop/src/renderer/src/lib/utils.ts`
- `apps/desktop/src/renderer/src/components/ui/button.tsx`
- `apps/desktop/src/renderer/src/assets/crab.png`

### Files changed

- `.gitignore`
- `README.md`
- `apps/desktop/README.md`
- `docs/execution-plan.md`
- `docs/session-handoff.md`
- `docs/execution-log.md`

### Files removed

- `apps/desktop/src/main/.gitkeep`
- `apps/desktop/src/preload/.gitkeep`
- `apps/desktop/src/renderer/.gitkeep`

### Decisions made

- Usar pnpm workspace sem task runner adicional nesta fase.
- Fixar Vite 7 porque electron-vite 5 não declara compatibilidade com Vite 8.
- Manter o mock atrás da mesma interface que receberá o client HTTP real.
- Usar semantic colors Aratu preservando cyan para IA e emerald para success.
- Não adicionar router, TanStack Query, Zustand ou packaging antes de existir um fluxo que os justifique.

### Verification

- `pnpm typecheck` — passed.
- `pnpm test` — 1 file, 2 tests passed.
- `pnpm build` — main, preload e renderer built successfully.
- Electron smoke test — app permaneceu ativo até o timeout, sem falhas de preload, renderer ou IPC.
- O smoke test usou `--no-sandbox --disable-gpu` somente porque o container não possui helper SUID nem VA-API; o código mantém `sandbox: true`.
- Captura visual automatizada não foi possível porque o ambiente não possui ferramenta de screenshot.

### Pending

- Implementar routing/layout de telas e fluxos reais de navegação.
- Inicializar a Go engine e substituir o mock pelo HTTP `EngineClient` autenticado.
- Adicionar TanStack Query e Zustand quando os primeiros fluxos de dados e estado forem implementados.
- Configurar packaging, icons e testes end-to-end em fases posteriores.

## Session 0009 — Linux Sandbox Development Fallback

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Permitir desenvolvimento Electron em Linux com user namespaces bloqueados pelo AppArmor sem enfraquecer a configuração de produção.

### Completed

- [x] Confirmado que `chrome-sandbox` não é root-owned e possui modo `755` dentro de `node_modules`.
- [x] Confirmado `kernel.unprivileged_userns_clone=1` e restrição AppArmor ativa.
- [x] Confirmado que criação de user namespace falha no ambiente atual.
- [x] Consultadas as orientações oficiais do Electron e do electron-vite.
- [x] Adicionado comando explícito `pnpm dev:linux` usando `electron-vite dev --noSandbox`.
- [x] Mantido `pnpm dev` com sandbox e preservado `sandbox: true` no BrowserWindow.
- [x] Separado CSP de development para React Fast Refresh do CSP restritivo usado em builds empacotados.
- [x] Documentado que o fallback é exclusivo para desenvolvimento local.

### Files changed

- `package.json`
- `apps/desktop/package.json`
- `README.md`
- `apps/desktop/README.md`
- `docs/execution-log.md`

### Decisions made

- Não alterar owner ou bit SUID de binários dentro de `node_modules`.
- Não desabilitar sandbox programaticamente no main process.
- Expor a exceção como comando Linux explícito para evitar uso acidental em release.

### Commands and tools used

- `stat`, `sysctl` e `unshare` para diagnosticar SUID sandbox, user namespaces e AppArmor.
- Documentação oficial Electron e electron-vite para confirmar o uso limitado de `--no-sandbox`.
- `apply_patch` para adicionar o comando e atualizar documentação.

### Pending

- Validar builds empacotados com sandbox ativo em ambientes Linux de release suportados.

## Session 0010 — Connect Database Screen

**Date:** 2026-06-22  
**Agent:** Codex  
**Goal:** Implementar a tela inicial de conexão com alta fidelidade ao material `datapilot_connect_your_database_2` do Stitch.

### Context inspected

- [x] Lido integralmente `docs/stitch/datapilot_connect_your_database_2/code.html`.
- [x] Inspecionada em resolução original a screenshot `screen.png` correspondente.
- [x] Comparados layout, espaçamento, cores, tipografia, controles e estados com o renderer existente.

### Completed

- [x] Criado onboarding sem sidebar com header fixo, step indicator, ajuda e demo.
- [x] Criado grid 3×2 para PostgreSQL, MySQL, SQLite, MongoDB, SQL Server e Redis.
- [x] Criados tabs Connection URL e Manual setup.
- [x] Criados campos de nome, ambiente, URL/manual connection e SSL mode.
- [x] Criados visibility control, safety switches e production safeguard alert.
- [x] Criado painel AI Assistant com inferência local de engine a partir da URL.
- [x] Criados estados idle, analyzed e invalid sem simular conexão real.
- [x] Adicionada navegação local entre Connect Database e Overview mockado.
- [x] Empacotadas localmente Geist, Inter e JetBrains Mono para fidelidade offline.
- [x] Adicionados testes de inferência para seis tipos de connection URL e casos inválidos.
- [x] Capturado e inspecionado o renderer real via Chrome DevTools Protocol.

### Files created

- `apps/desktop/src/renderer/src/screens/connect-database/ConnectDatabaseScreen.tsx`
- `apps/desktop/src/renderer/src/screens/connect-database/connection-utils.ts`
- `apps/desktop/src/renderer/src/screens/connect-database/connection-utils.test.ts`

### Files changed

- `apps/desktop/src/renderer/src/App.tsx`
- `apps/desktop/src/renderer/src/styles.css`
- `apps/desktop/package.json`
- `apps/desktop/README.md`
- `pnpm-lock.yaml`
- `docs/execution-plan.md`
- `docs/session-handoff.md`
- `docs/execution-log.md`

### Decisions made

- Abrir o app na tela Connect Database e manter Overview como destino mockado.
- Usar indigo Stitch para seleção/onboarding, cyan para IA e emerald para segurança, preservando teal como cor de marca.
- Não afirmar criptografia ou conexão verificada antes da implementação real.
- Não persistir connection URL ou credenciais no protótipo.
- Fazer análise de URL inteiramente local e sem IPC nesta fase.
- Empacotar somente os subsets Latin das fontes variáveis para limitar o bundle.

### Verification

- `pnpm typecheck` — passed.
- `pnpm test` — 2 files, 9 tests passed.
- `pnpm build` — main, preload e renderer built successfully.
- Runtime development — Vite HMR, preload e renderer carregaram sem CSP violations ou exceptions.
- Visual capture — renderer capturado em PNG e comparado com a screenshot Stitch original.

### Pending

- Definir schemas `ConnectionTestRequest` e `ConnectionTestResult`.
- Implementar teste real através do Go engine, main e preload.
- Persistir somente metadata não sensível após integração com OS keyring.
- Substituir navegação local por routing persistente quando o terceiro fluxo de tela for implementado.

## Session 0011 — Desktop Session Closure

**Date:** 2026-06-23  
**Agent:** Codex  
**Goal:** Encerrar a sessão Electron documentando estado, validações, fallback Linux e correção de scroll.

### Completed

- [x] Corrigido o scroll da tela Connect Database sem liberar scroll global no `body`.
- [x] Mantido `body { overflow: hidden; }` para evitar scroll duplo no shell.
- [x] Definida `.connection-page` como área rolável com `height: 100vh` e `overflow-y: auto`.
- [x] Mantido o Overview com scroll próprio no `<main>`.
- [x] Documentados comandos de desenvolvimento, qualidade e fallback Linux no README principal e no README do desktop.
- [x] Atualizado o handoff com o estado real da fundação Electron e a próxima tarefa recomendada.
- [x] Atualizado o plano de execução com itens realmente concluídos nas fases 1, 2, 3 e 5.

### Files changed

- `README.md`
- `apps/desktop/README.md`
- `apps/desktop/src/renderer/src/styles.css`
- `docs/execution-plan.md`
- `docs/session-handoff.md`
- `docs/execution-log.md`

### Decisions made

- A tela Connect Database deve rolar no container da própria tela, não no documento global.
- O fallback `pnpm dev:linux` permanece restrito a desenvolvimento local em ambientes Linux com AppArmor/user namespaces bloqueando o sandbox do Electron.
- O próximo passo técnico deve ser um slice mínimo da Go engine seguindo a ADR 0006, antes de adicionar conectores reais.

### Verification

- `pnpm typecheck` — passed.
- `pnpm test` — 2 files, 9 tests passed.
- `pnpm build` — main, preload e renderer built successfully.

### Commands and tools used

- `rg`, `sed`, `git diff` e `git status` para localizar a causa do bloqueio de scroll e revisar o escopo.
- `apply_patch` para corrigir CSS e atualizar documentação.
- `pnpm typecheck`, `pnpm test` e `pnpm build` para validação.

### Pending

- Inicializar a Go engine com bootstrap, readiness e health autenticado.
- Substituir o mock engine client por um client HTTP real quando o sidecar existir.
