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
