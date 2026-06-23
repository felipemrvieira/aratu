import { describe, expect, it } from 'vitest'

import { inferEngineFromConnectionUrl } from './connection-utils'

describe('inferEngineFromConnectionUrl', () => {
  it.each([
    ['postgresql://user:secret@localhost:5432/app', 'postgresql'],
    ['mysql://user:secret@localhost:3306/app', 'mysql'],
    ['mongodb+srv://cluster.example/app', 'mongodb'],
    ['rediss://cache.example:6380', 'redis'],
    ['sqlite:///tmp/aratu.sqlite', 'sqlite'],
    ['sqlserver://localhost:1433/app', 'sqlserver']
  ] as const)('maps %s to %s', (value, expected) => {
    expect(inferEngineFromConnectionUrl(value)).toBe(expected)
  })

  it('returns undefined for unsupported or incomplete values', () => {
    expect(inferEngineFromConnectionUrl('example.internal')).toBeUndefined()
    expect(inferEngineFromConnectionUrl('')).toBeUndefined()
  })
})
