import { describe, expect, it } from 'vitest'

import { MockEngineClient } from './mock-engine-client'

describe('MockEngineClient', () => {
  it('reports a ready mock that speaks protocol version 1', async () => {
    const client = new MockEngineClient()

    await expect(client.getStatus()).resolves.toEqual({
      status: 'ready',
      mode: 'mock',
      protocolVersion: '1'
    })
  })

  it('exposes engine identity without credentials or endpoint details', async () => {
    const client = new MockEngineClient()
    const info = await client.getInfo()

    expect(info).toMatchObject({
      name: 'aratu-engine',
      engineVersion: '0.1.0-dev',
      protocolVersion: '1'
    })
    expect(info).not.toHaveProperty('token')
    expect(info).not.toHaveProperty('port')
  })
})
