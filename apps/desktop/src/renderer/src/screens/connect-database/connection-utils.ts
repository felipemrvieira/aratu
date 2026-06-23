export type DatabaseEngineId =
  | 'postgresql'
  | 'mysql'
  | 'sqlite'
  | 'mongodb'
  | 'sqlserver'
  | 'redis'

export function inferEngineFromConnectionUrl(value: string): DatabaseEngineId | undefined {
  const normalized = value.trim().toLowerCase()

  if (normalized.startsWith('postgres://') || normalized.startsWith('postgresql://')) {
    return 'postgresql'
  }
  if (normalized.startsWith('mysql://')) return 'mysql'
  if (normalized.startsWith('mongodb://') || normalized.startsWith('mongodb+srv://')) {
    return 'mongodb'
  }
  if (normalized.startsWith('redis://') || normalized.startsWith('rediss://')) return 'redis'
  if (normalized.startsWith('sqlite://') || normalized.endsWith('.sqlite')) return 'sqlite'
  if (normalized.startsWith('sqlserver://') || normalized.startsWith('mssql://')) {
    return 'sqlserver'
  }

  return undefined
}
