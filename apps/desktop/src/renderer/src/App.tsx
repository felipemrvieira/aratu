import {
  Activity,
  Bot,
  Boxes,
  ChevronRight,
  CircleHelp,
  Database,
  GitBranch,
  History,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Table2,
  TerminalSquare
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { EngineInfo, EngineStatus } from '../../shared/desktop-api'
import crabLogo from './assets/crab.png'
import { Button } from './components/ui/button'
import { ConnectDatabaseScreen } from './screens/connect-database/ConnectDatabaseScreen'

type AppScreen = 'connect' | 'overview'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Schemas', icon: Database },
  { label: 'Query builder', icon: TerminalSquare },
  { label: 'Relationships', icon: GitBranch },
  { label: 'History', icon: History },
  { label: 'Safety', icon: ShieldCheck }
]

const entities = [
  { name: 'users', domain: 'core auth', columns: 12, rows: '2.4k', relationships: 3 },
  { name: 'orders', domain: 'commerce', columns: 18, rows: '8.9k', relationships: 5 },
  { name: 'payments', domain: 'sensitive', columns: 14, rows: '8.7k', relationships: 4 },
  { name: 'products', domain: 'catalog', columns: 10, rows: '580', relationships: 2 }
]

const metrics: Array<{ label: string; value: string; icon: LucideIcon }> = [
  { label: 'Tables', value: '24', icon: Table2 },
  { label: 'Columns', value: '186', icon: Boxes },
  { label: 'Relationships', value: '12', icon: GitBranch },
  { label: 'Sensitive fields', value: '4', icon: ShieldCheck }
]

function StatusDot({ status }: { status?: EngineStatus['status'] }): React.JSX.Element {
  const color = status === 'ready' ? 'bg-success' : 'bg-warning'
  return <span aria-hidden="true" className={`size-2 rounded-full ${color}`} />
}

export function App(): React.JSX.Element {
  const [screen, setScreen] = useState<AppScreen>('connect')
  const [engineStatus, setEngineStatus] = useState<EngineStatus>()
  const [engineInfo, setEngineInfo] = useState<EngineInfo>()
  const [engineError, setEngineError] = useState(false)

  useEffect(() => {
    let active = true

    Promise.all([window.aratu.engine.getStatus(), window.aratu.engine.getInfo()])
      .then(([status, info]) => {
        if (active) {
          setEngineStatus(status)
          setEngineInfo(info)
        }
      })
      .catch(() => {
        if (active) setEngineError(true)
      })

    return () => {
      active = false
    }
  }, [])

  if (screen === 'connect') {
    return (
      <ConnectDatabaseScreen
        onBack={() => setScreen('overview')}
        onContinue={() => setScreen('overview')}
      />
    )
  }

  return (
    <div className="grid min-h-screen grid-cols-[260px_minmax(0,1fr)] bg-background text-foreground">
      <aside className="flex h-screen flex-col border-r border-border bg-surface-low px-4 py-5">
        <div className="mb-7 flex items-center gap-3 px-2">
          <img alt="Aratu" className="size-10 object-contain" src={crabLogo} />
          <div>
            <div className="font-display text-lg font-semibold tracking-tight">Aratu</div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-ai">AI-guided client</div>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-border bg-surface p-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <StatusDot status="ready" />
            PostgreSQL
          </div>
          <div className="mt-1 pl-4 text-xs text-muted-foreground">Production · mock workspace</div>
        </div>

        <Button className="mb-5 w-full" size="sm">
          <Plus className="size-4" />
          New query
        </Button>

        <nav aria-label="Primary navigation" className="space-y-1">
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                active
                  ? 'border border-primary/20 bg-primary/10 text-primary'
                  : 'border border-transparent text-muted-foreground hover:bg-surface-high hover:text-foreground'
              }`}
              key={label}
              type="button"
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-1 border-t border-border pt-4">
          <button className="sidebar-secondary-action" type="button">
            <CircleHelp className="size-4" /> Help and docs
          </button>
          <button className="sidebar-secondary-action" type="button">
            <Settings className="size-4" /> Settings
          </button>
        </div>
      </aside>

      <main className="h-screen overflow-y-auto">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/85 px-7 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>PostgreSQL</span>
            <ChevronRight className="size-4" />
            <span>public</span>
            <ChevronRight className="size-4" />
            <span className="text-foreground">Overview</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">
              <StatusDot status={engineStatus?.status} />
              {engineError
                ? 'Engine unavailable'
                : engineInfo
                  ? `${engineStatus?.mode} engine · protocol ${engineInfo.protocolVersion}`
                  : 'Checking engine'}
            </div>
            <Button variant="secondary">
              <Sparkles className="size-4 text-ai" /> Ask AI
            </Button>
            <Button aria-label="Search" size="icon" variant="ghost">
              <Search className="size-4" />
            </Button>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] space-y-7 p-7">
          <section className="flex items-start justify-between gap-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Database workspace
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight">Database overview</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Understand structure, relationships and safety posture before touching the data.
              </p>
            </div>
            <Button onClick={() => setScreen('connect')}>
              <Plus className="size-4" /> Connect database
            </Button>
          </section>

          <section aria-label="Database metrics" className="grid grid-cols-4 gap-4">
            {metrics.map(({ label, value, icon: Icon }) => (
              <article className="metric-card" key={label}>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs uppercase tracking-[0.12em]">{label}</span>
                  <Icon className="size-4" />
                </div>
                <div className="mt-3 font-display text-2xl font-semibold">{value}</div>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-[minmax(0,1fr)_340px] gap-5">
            <article className="panel min-w-0">
              <div className="panel-heading">
                <div>
                  <h2 className="font-display text-lg font-semibold">Core entities</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Mock data · connector not initialized</p>
                </div>
                <Button size="sm" variant="ghost">
                  View all tables <ChevronRight className="size-3.5" />
                </Button>
              </div>

              <div className="divide-y divide-border">
                {entities.map((entity) => (
                  <button
                    className="group grid w-full grid-cols-[minmax(0,1fr)_100px_100px_44px] items-center gap-4 px-5 py-4 text-left hover:bg-surface-high/70"
                    key={entity.name}
                    type="button"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-lg bg-surface-high text-primary">
                        <Table2 className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-sm font-medium">{entity.name}</div>
                        <div className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                          {entity.domain}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">{entity.columns}</div>
                      <div className="text-xs text-muted-foreground">columns</div>
                    </div>
                    <div>
                      <div className="text-sm">{entity.rows}</div>
                      <div className="text-xs text-muted-foreground">rows</div>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </article>

            <aside className="space-y-5">
              <article className="panel overflow-hidden border-ai/25">
                <div className="flex items-center gap-2 border-b border-ai/20 bg-ai/5 px-4 py-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-ai/10 text-ai">
                    <Bot className="size-4" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold">Database assistant</h2>
                    <p className="text-xs text-muted-foreground">Guidance requires your approval</p>
                  </div>
                </div>
                <div className="space-y-4 p-4">
                  <p className="text-sm leading-6 text-foreground/90">
                    I found a common commerce structure. The <code>orders</code> entity appears central,
                    linking users and payments.
                  </p>
                  <button className="assistant-action" type="button">
                    Map sensitive PII fields <ChevronRight className="size-4" />
                  </button>
                  <button className="assistant-action" type="button">
                    Explain the orders flow <ChevronRight className="size-4" />
                  </button>
                  <div className="flex gap-2 border-t border-border pt-4">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface-lowest px-3 text-sm text-muted-foreground">
                      <Sparkles className="size-4 text-ai" /> Ask about this database
                    </div>
                    <Button aria-label="Send question" size="icon">
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </article>

              <article className="panel p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold">Safety posture</h2>
                  <span className="rounded-full bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">
                    Protected
                  </span>
                </div>
                <div className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-success" /> Production safeguards enabled
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-primary" /> Read-only role active
                  </div>
                </div>
              </article>
            </aside>
          </section>
        </div>
      </main>
    </div>
  )
}
