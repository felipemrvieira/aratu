import {
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Cloud,
  Cpu,
  Database,
  Eye,
  EyeOff,
  FolderOpen,
  Link2,
  LockKeyhole,
  Server,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'

import crabLogo from '../../assets/crab.png'
import { Button } from '../../components/ui/button'
import {
  inferEngineFromConnectionUrl,
  type DatabaseEngineId
} from './connection-utils'

type Environment = 'local' | 'staging' | 'production'
type SetupMode = 'url' | 'manual'
type AnalysisState = 'idle' | 'analyzed' | 'invalid'

interface ConnectDatabaseScreenProps {
  onBack: () => void
  onContinue: () => void
}

const engines = [
  { id: 'postgresql', label: 'PostgreSQL', icon: Database },
  { id: 'mysql', label: 'MySQL', icon: Server },
  { id: 'sqlite', label: 'SQLite', icon: FolderOpen },
  { id: 'mongodb', label: 'MongoDB', icon: Cloud },
  { id: 'sqlserver', label: 'SQL Server', icon: Server },
  { id: 'redis', label: 'Redis', icon: Cpu }
] satisfies Array<{
  id: DatabaseEngineId
  label: string
  icon: typeof Database
}>

const environments: Array<{ id: Environment; label: string }> = [
  { id: 'local', label: 'Local' },
  { id: 'staging', label: 'Staging' },
  { id: 'production', label: 'Production' }
]

function SafetySwitch({
  checked,
  description,
  label,
  onChange
}: {
  checked: boolean
  description: string
  label: string
  onChange: (checked: boolean) => void
}): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-xs text-muted-foreground">{description}</div>
      </div>
      <button
        aria-checked={checked}
        aria-label={label}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-selection/70 ${
          checked
            ? 'border-selection bg-selection'
            : 'border-border bg-surface-highest'
        }`}
        onClick={() => onChange(!checked)}
        role="switch"
        type="button"
      >
        <span
          className={`absolute left-1 top-1 size-[18px] rounded-full transition-transform ${
            checked
              ? 'translate-x-5 bg-selection-foreground'
              : 'translate-x-0 bg-muted-foreground'
          }`}
        />
      </button>
    </div>
  )
}

export function ConnectDatabaseScreen({
  onBack,
  onContinue
}: ConnectDatabaseScreenProps): React.JSX.Element {
  const [selectedEngine, setSelectedEngine] = useState<DatabaseEngineId>('postgresql')
  const [setupMode, setSetupMode] = useState<SetupMode>('url')
  const [environment, setEnvironment] = useState<Environment>('production')
  const [connectionName, setConnectionName] = useState('Main Production Cluster')
  const [connectionUrl, setConnectionUrl] = useState(
    'postgresql://admin:demo-password@prod-db.internal:5432/main_app'
  )
  const [showConnectionUrl, setShowConnectionUrl] = useState(false)
  const [sslMode, setSslMode] = useState('require')
  const [readOnly, setReadOnly] = useState(false)
  const [requireConfirmation, setRequireConfirmation] = useState(true)
  const [maskSensitiveFields, setMaskSensitiveFields] = useState(true)
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle')

  const isProduction = environment === 'production'

  function analyzeConnectionString(): void {
    const inferredEngine = inferEngineFromConnectionUrl(connectionUrl)

    if (!inferredEngine) {
      setAnalysisState('invalid')
      return
    }

    setSelectedEngine(inferredEngine)
    setAnalysisState('analyzed')
  }

  function submitConnection(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (setupMode === 'url' && !inferEngineFromConnectionUrl(connectionUrl)) {
      setAnalysisState('invalid')
      return
    }

    onContinue()
  }

  return (
    <div className="connection-page min-h-screen bg-[#111113] text-foreground">
      <div aria-hidden="true" className="connection-ambient-glow" />

      <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-border/70 bg-surface-low/85 px-10 backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <img alt="Aratu" className="size-10 object-contain" src={crabLogo} />
            <span className="font-display text-xl font-bold tracking-tight">Aratu</span>
          </div>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-selection shadow-[0_0_10px_rgba(192,193,255,0.65)]" />
            Step 1 of 3
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            type="button"
          >
            <CircleHelp className="size-[18px]" /> Need help?
          </button>
          <Button className="h-10 bg-surface-highest px-5 text-foreground hover:bg-[#414044]" variant="ghost" onClick={onContinue}>
            Skip and use demo
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1320px] px-8 pb-24 pt-32">
        <div className="mb-9">
          <h1 className="font-display text-[32px] font-semibold tracking-tight">
            New database connection
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Configure your database source to begin analyzing and querying data.
          </p>
        </div>

        <form onSubmit={submitConnection}>
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(310px,1fr)] gap-7">
            <div className="flex min-w-0 flex-col gap-7">
              <section className="connection-glass-panel rounded-xl p-6">
                <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Select database engine
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {engines.map(({ id, label, icon: Icon }) => {
                    const selected = selectedEngine === id

                    return (
                      <button
                        aria-pressed={selected}
                        className={`relative flex min-h-[118px] flex-col items-center justify-center gap-3 rounded-lg border text-sm transition-all ${
                          selected
                            ? 'border-2 border-selection bg-selection/10 text-foreground shadow-[inset_0_0_22px_rgba(192,193,255,0.04)]'
                            : 'border-border bg-surface-low text-muted-foreground hover:border-[#464554] hover:bg-surface-high'
                        }`}
                        key={id}
                        onClick={() => {
                          setSelectedEngine(id)
                          setAnalysisState('idle')
                        }}
                        type="button"
                      >
                        {selected ? (
                          <CheckCircle2 className="absolute right-3 top-3 size-[18px] text-selection" />
                        ) : null}
                        <Icon className={`size-8 ${selected ? 'text-selection' : ''}`} strokeWidth={1.8} />
                        <span className="font-medium">{label}</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="connection-glass-panel overflow-hidden rounded-xl">
                <div className="grid grid-cols-2 border-b border-border bg-surface-low/60">
                  {(['url', 'manual'] as const).map((mode) => (
                    <button
                      className={`relative h-16 text-sm font-medium transition-colors ${
                        setupMode === mode
                          ? 'bg-selection/[0.035] text-selection'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      key={mode}
                      onClick={() => setSetupMode(mode)}
                      type="button"
                    >
                      {mode === 'url' ? 'Connection URL' : 'Manual setup'}
                      {setupMode === mode ? (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-selection" />
                      ) : null}
                    </button>
                  ))}
                </div>

                <div className="space-y-6 p-7">
                  <label className="block">
                    <span className="connection-label">Connection Name</span>
                    <input
                      autoComplete="off"
                      className="connection-input"
                      onChange={(event) => setConnectionName(event.target.value)}
                      required
                      type="text"
                      value={connectionName}
                    />
                  </label>

                  <fieldset>
                    <legend className="connection-label">Environment</legend>
                    <div className="grid grid-cols-3 rounded-lg border border-border bg-surface-highest p-1">
                      {environments.map(({ id, label }) => (
                        <button
                          aria-pressed={environment === id}
                          className={`h-10 rounded-md text-sm transition-all ${
                            environment === id
                              ? 'border border-border bg-surface-lowest text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          key={id}
                          onClick={() => setEnvironment(id)}
                          type="button"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {setupMode === 'url' ? (
                    <label className="block">
                      <span className="connection-label">Database URL</span>
                      <span className="relative block">
                        <Link2 className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
                        <input
                          aria-invalid={analysisState === 'invalid'}
                          autoCapitalize="none"
                          autoComplete="off"
                          className="connection-input pl-12 pr-12 font-mono text-[13px]"
                          onChange={(event) => {
                            setConnectionUrl(event.target.value)
                            setAnalysisState('idle')
                          }}
                          required
                          spellCheck={false}
                          type={showConnectionUrl ? 'text' : 'password'}
                          value={connectionUrl}
                        />
                        <button
                          aria-label={showConnectionUrl ? 'Hide database URL' : 'Show database URL'}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowConnectionUrl((visible) => !visible)}
                          type="button"
                        >
                          {showConnectionUrl ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                      </span>
                      {analysisState === 'invalid' ? (
                        <span className="mt-2 block text-xs text-danger">
                          Enter a supported connection URL before continuing.
                        </span>
                      ) : null}
                    </label>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <label className="col-span-2 block">
                        <span className="connection-label">Host</span>
                        <input className="connection-input" defaultValue="prod-db.internal" required />
                      </label>
                      <label className="block">
                        <span className="connection-label">Port</span>
                        <input className="connection-input" defaultValue="5432" inputMode="numeric" required />
                      </label>
                      <label className="block">
                        <span className="connection-label">Database</span>
                        <input className="connection-input" defaultValue="main_app" required />
                      </label>
                      <label className="block">
                        <span className="connection-label">Username</span>
                        <input autoComplete="username" className="connection-input" defaultValue="admin" required />
                      </label>
                      <label className="block">
                        <span className="connection-label">Password</span>
                        <input autoComplete="new-password" className="connection-input" defaultValue="demo-password" required type="password" />
                      </label>
                    </div>
                  )}

                  <label className="block">
                    <span className="connection-label">SSL Mode</span>
                    <span className="relative block">
                      <select
                        className="connection-input appearance-none pr-12"
                        onChange={(event) => setSslMode(event.target.value)}
                        value={sslMode}
                      >
                        <option value="require">Require (Default)</option>
                        <option value="verify-ca">Verify-CA</option>
                        <option value="verify-full">Verify-Full</option>
                        <option value="disable">Disable</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    </span>
                  </label>

                  <div className="flex items-start gap-3 rounded-lg border border-border/80 bg-surface px-4 py-4">
                    <LockKeyhole className="mt-0.5 size-5 shrink-0 text-success" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      Credentials are not persisted in this prototype. Production storage will use the operating-system keyring.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="flex flex-col gap-7">
              <section className="connection-glass-panel rounded-xl border-l-4 border-l-ai bg-gradient-to-br from-surface-low to-surface">
                <div className="p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-ai/15 text-ai">
                      <Sparkles className="size-[18px]" />
                    </span>
                    <h2 className="font-display text-lg font-semibold">AI Assistant</h2>
                  </div>
                  <p className="mb-6 text-sm leading-6 text-muted-foreground">
                    Paste your database URL and I’ll detect the engine, port, and security settings locally.
                  </p>
                  <Button
                    className="w-full border-ai/60 text-ai hover:border-ai hover:bg-ai/10"
                    onClick={analyzeConnectionString}
                    type="button"
                    variant="secondary"
                  >
                    {analysisState === 'analyzed' ? <Check className="size-4" /> : <Sparkles className="size-4" />}
                    {analysisState === 'analyzed' ? 'Connection string analyzed' : 'Analyze connection string'}
                  </Button>
                </div>
              </section>

              {isProduction ? (
                <section className="flex items-start gap-3 rounded-xl border border-success/40 bg-success/10 p-5">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
                  <div>
                    <h2 className="text-sm font-semibold text-success">Production safeguards enabled</h2>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                      Destructive queries will require staged review and explicit confirmation.
                    </p>
                  </div>
                </section>
              ) : null}

              <section className="connection-glass-panel rounded-xl p-6">
                <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Safety &amp; permissions
                </h2>
                <div className="divide-y divide-border/70">
                  <div className="pb-5">
                    <SafetySwitch
                      checked={readOnly}
                      description="Prevent any write operations"
                      label="Read-only mode"
                      onChange={setReadOnly}
                    />
                  </div>
                  <div className="py-5">
                    <SafetySwitch
                      checked={requireConfirmation}
                      description="For long-running queries"
                      label="Require confirmation"
                      onChange={setRequireConfirmation}
                    />
                  </div>
                  <div className="pt-5">
                    <SafetySwitch
                      checked={maskSensitiveFields}
                      description="Auto-hide PII in results"
                      label="Mask sensitive fields"
                      onChange={setMaskSensitiveFields}
                    />
                  </div>
                </div>
              </section>

              <section className="connection-glass-panel flex items-center gap-3 rounded-xl p-4 text-xs text-muted-foreground">
                <Bot className="size-4 text-ai" />
                AI suggestions remain local mock guidance and never execute a connection.
              </section>
            </aside>
          </div>

          <footer className="mt-10 flex items-center justify-between border-t border-border pt-7">
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm ${
                analysisState === 'invalid'
                  ? 'border-danger/40 bg-danger/10 text-danger'
                  : analysisState === 'analyzed'
                    ? 'border-success/40 bg-success/10 text-success'
                    : 'border-border bg-surface-low text-muted-foreground'
              }`}
            >
              {analysisState === 'analyzed' ? (
                <CheckCircle2 className="size-[18px]" />
              ) : (
                <Database className="size-[18px]" />
              )}
              {analysisState === 'invalid'
                ? 'Connection URL needs attention'
                : analysisState === 'analyzed'
                  ? 'Connection string analyzed locally'
                  : 'Connection details ready for validation'}
            </div>

            <div className="flex items-center gap-5">
              <Button className="px-6" onClick={onBack} variant="ghost">
                Back
              </Button>
              <Button
                className="h-11 bg-selection px-7 text-selection-foreground shadow-[0_0_16px_rgba(192,193,255,0.24)] hover:bg-[#d0d1ff]"
                type="submit"
              >
                Connect database
              </Button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  )
}
